# Een weer app voor Amsterdam 

### De opdracht 
- Data ophalen uit een api en die data in html tonen.
- De website/code moet dynamisch zijn.
- We moeten gebruik maken van modules.
- Met een mirco libary word er getoggled tussen de hoofdpagina en de detailpagina.
- De code visualiseren met een actor en interaction diagram.

### Mijn concept
Mijn concept is om van de komende 3 uur het weer te laten zien van je huidige situatie. Standaard staat het op Amsterdam. Op de hoofdpagina zie je eerst algemene informatie over het weer en je kan door klikken om meer informatie te lezen over het uur. De data word geladen met de api, hier kan je meer over lezen onder het kopje: De api en data.

Ik wil het in teletext stijl vormgeven want dat vind ik een hele leuke stijl. 

#### De hoofdpagina (tot nu toe)
![Schermafbeelding 2020-02-11 om 16 04 44](https://user-images.githubusercontent.com/45541885/74248719-4ca18980-4ce8-11ea-8225-27284c8dd25e.png)

### De structuur
De structuur van mijn site ziet er als vorlgt uit (de structuur kan nog veranderen naarmate ik verder werk aan dit project)

#### Actor diagram
![actorDiagram](https://user-images.githubusercontent.com/45541885/74232384-f5d88780-4cc8-11ea-86b1-265d1f24af53.jpg)

#### Interaction diagram
![interactionDiagram](https://user-images.githubusercontent.com/45541885/74232393-f96c0e80-4cc8-11ea-8e2d-d38c66c2dcdf.jpg)

### Installatie

### De api en data
De api die ik heb gebruikt is darksky: https://darksky.net/dev Deze api haald het weer op van een locatie naar keuze. In de api zit: 
- Het huidige weer.
- het weer voor het hele uur, minuut voor minuut. 
- Het weer per uur voor de hele dag. 
- Het weer van elke dag voor de hele week.
- Weer alerts. 

Verder bevat het ook veel meer informatie dan alleen het temperatuur. En verschilt het per onderwerp welke informatie beschikbaar is. In deze documentatie kan je alles lezen over wat de api bevat https://darksky.net/dev/docs

#### De url voor de api 
De url die je moet gebruiken om de api aan de praat te krijgen ziet er zo uit: 
```
 https://api.darksky.net/forecast/[key]/[latitude],[longitude]
```
De key kan je opvragen op de hun site. Je kan het gratis gebruiken alleen er zit wel een limiet van 1000 calls per dag. Als je jouw key hebt gekregen zet je die in de key in de url. Vervolgens kan je zelf ook een lat en long opzoeken en deze in de url plaatsen. Standaard staat er een locatie uit Amerika. 

#### Van Amikaanse waardes naar Europese waardes
Standaard staan alle waardes in het Amerikaans. Om dit om te zetten naar meters en graden celsius moet je dit kleine stukje achter jouw api link plaatsen en nu komt dus de link er zo uit te zien: 
```
?units=si

https://api.darksky.net/forecast/${key}/${lat},${long}?units=si
```
#### Data die de api ophaald 
Dit is de ruwe data die je krijgt van de api. Je kan tot in de detail alle informatie zien voor elke minuut, uur of dag alleen dat laat ik nu niet zien.

![Schermafbeelding 2020-02-22 om 14 51 52](https://user-images.githubusercontent.com/45541885/75093557-facbef80-5582-11ea-99a5-8c62fec0920d.png)

Wil je toch alle informatie bekijken in de api? Ga dan naar mijn website: https://manoukk.github.io/web-app-from-scratch-1920/ ga naar inspect via je rechtermuis knop en ga dan naar console. Daar kan je onder het kopje "gehele dataset" alles bekijken.

#### Data die ik gebruik
Ik wilde het weer gebruiken van de komende 3 uur. Als eerste heb ik alles gefilterd behalve de uren en heb ik dit verder opgeschoond. Om bij de "echte" uren te komen moest ik ook nog een .then maken die de data eruit pakte. Zoals je in de screenshot kan zien zitten alle uren in data.

```js
   .then(results => {
            console.log("uren", results.hourly);
            return results.hourly;
        })
   .then(results => { 
            return results.data;
        })
```
Nu krijg ik dit als resultaat: 

![Schermafbeelding 2020-02-22 om 14 58 14](https://user-images.githubusercontent.com/45541885/75093624-cc9adf80-5583-11ea-9b23-12a1ed6412f5.png)

Vervolgens heb ik binnen het uur ook de data opgeschoond. Ik wilde namelijk niet alles gebruiken van de dataset. Ook de namen van heb ik af en toe vervangen voor namen die mij logisch leken. Nu heb ik de data waar ik mee wil werken. 

```js
     .then(results => {
            console.log("uren en de data daarvan", results)
            return results.map(results => {
                return {
                    time: convertTimestamp(results.time),
                    summary: results.summary,
                    weatherType: results.precipType,
                    temperature: results.temperature,
                    temperatureFeeling: results.apparentTemperature,
                    wind: results.windSpeed,
                    windGust: results.windGust,
                    airpressure: results.pressure,
                    visibility: results.visibility, 
                    icon: results.icon,
                }
            })
        })
```
![Schermafbeelding 2020-02-22 om 15 08 13](https://user-images.githubusercontent.com/45541885/75093788-2ea81480-5585-11ea-8e71-5fefda994266.png)

Vervolgens wil ik alleen de eerste 3 items van de array gebruiken want dat zijn altijd de aankomende 3 uur. Dit heb ik gedaan door splice te gebruiken. Nu word de array gesplits en return ik alleen nog maar de eerste 3 items.

```js
 .then(results => {
            return results.splice(1, 3);
        })
```

#### Timestamps omzetten naar leesbare tijd
Zoals je misschien al eerder kon zien in de code convert ik de timestamp naar leesbare tijd. Deze code heb ik van Ramon. 
Dat gebeurd alsvolgd met deze fucntion. 

1. Een nieuwe date aanmaken door de timestamp keer 1000 te doen. Uitkomst: Sat Feb 22 2020 15:00:00 GMT+0100 (Midden-Europese standaardtijd)
2. De string omzetten naar een andere vorm string/tijd. Uitkomst: Sat, 22 Feb 2020 14:00:00 GMT
3. Alle woorden splitsen zodat ik de GMT weg kan halen. Uitkomst: ["Mon,", "24", "Feb", "2020", "05:00:00"]

```js
function convertTimestamp(timeStamp){
    const timeString = new Date(timeStamp * 1000);
    const readableTime = timeString.toGMTString();
    
    const splitReadableTime = readableTime.split(' ');
    const lastWord = splitReadableTime.pop();
    const cleanTimeSting = splitReadableTime.join(' ');
    return cleanTimeSting;
};
```

### Features
- [ ] Locatie ophalen van de gebruiker en op basis daarvan het weer tonen
- [ ] Detailpagina tonen zonder overflow hidden
- [ ] ... aanvullen ...

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
