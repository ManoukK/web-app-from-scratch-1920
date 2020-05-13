# Een weer app voor Amsterdam 

### Inhoudsopgave
* [De opdracht](#De-opdracht)
* [Mijn concept](#Mijn-concept)
   * [De hoofdpagina](#De-hoofdpagina-(tot-nu-toe))
* [De structuur](#De-structuur)
   * [Actor diagram](#Actor-diagram)
   * [Interaction diagram](#Interaction-diagram)
* [Installatie](#Installatie)
   * [Routie](#Routie)
* [De api en data](#De-api-en-data)
   * [De url voor de api](#De-url-voor-de-api)
   * [Van Amerikaanse waardes naar Europese waardes](#Van-Amerikaanse-waardes-naar-Europese-waardes)
   * [Data die de api ophaald](#Data-die-de-api-ophaald)
   * [Data die ik gebruik](#Data-die-ik-gebruik)
   * [Timestamps omzetten naar leesbare tijd](#Timestamps-omzetten-naar-leesbare-tijd)
* [Features](#Features)
* [Bronnenlijst](#Bronnenlijst)
* [Credits](#Credits)
* [Aanvulling](#Aanvulling)

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
![newActorDiagram2](https://user-images.githubusercontent.com/45541885/75348378-fd8c5480-58a2-11ea-9105-bdc079053e21.jpg)

#### Interaction diagram
![newInteractionDiagram](https://user-images.githubusercontent.com/45541885/75348384-02510880-58a3-11ea-8469-985c5578a450.jpg)

### Installatie
Om Dit project zelf ook te kunnen gebruiken kan je mijn repository forken rechts boven. Daar kan je het ook eventueel downloaden. Verder heb je de api, darksky, nodig. Hieronder leg ik uit hoe je daar gebruik van kan maken. Zorg er wel voor dat je jouw eigen key gebruikt. 

Verder maar ik ook gebruik van cors. Dit is een api die een omleiding maakt naar de api, darksky. Voor mij is dit nodig omdat ik anders een cors error krijg en ik de api niet kan gebruiken. Kijk ook of je dit nodig heb. Zo ja dan kan je gewoon deze link voor jouw api link plaatsen. 

Cors link die ik heb gebruikt: https://cors-anywhere.herokuapp.com/

Zo komt de api link er nu uit te zien: https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${long} 

#### Routie 
Voor de navigatie maak ik gebruik van Routie. Als je dat ook wilt gebruiken zet je de script boven aan in de body van je html 
```html
<script src="libary/routie.js"></script>
```

Op deze manier kan er nu getoggled worden tussen hoofd en detail pagina's. De javascript code hiervoor kan je vinden in de module onder route.

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

#### Van Amerikaanse waardes naar Europese waardes
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
4. Het laatste woord (GMT) scheiden van de rest. Uitkomst: GMT
5. Alle woorden weer samenvoegen tot een zin/string. Uitkomst: Sat, 22 Feb 2020 14:00:00

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
- [x] Detailpagina tonen zonder overflow hidden
- [ ] gebruik maken van een template om data te tonen op de site
- [ ] Hele getallen tonen
- [ ] URL api gebruiken om een nog nettere url te maken

### Bronnenlijst
- Api: https://darksky.net/dev
- Routie: https://github.com/cmda-minor-web/web-app-from-scratch-1920/tree/master/examples/routing-fetching-templating
- CORS error oplossing: Maikel Sleebos deelde het in Slack, https://cors-anywhere.herokuapp.com/
- Time converter: Ramon Meijers deelde het met mij in de les
- Time converter met een mooie string: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Date
- Time converter string zonder GMT: https://stackoverflow.com/questions/9323182/how-to-remove-the-last-word-in-the-string-using-javascript
- Class toggle voor Routie: https://github.com/cmda-minor-web/web-app-from-scratch-1920/tree/master/examples/routing-fetching-templating
- Data in de html krijgen: Ramon Meijers hielp mij hiermee in de les

### Credits
- Ramon Meijers, hij hielp me met data laden in html en heeft me geholpen met timestamps omzetten naar leesbare tijd. 
- Maikel Sleebos, dankzij hem heb ik de cors error niet meer. 
- Joost Faber, hij heeft mij geholpen met de promise die vervelend ging doen zodra ik alles in modules ging plaatsen. 
- Robin Stut, hij heeft me geholpen met een filter functie waarbij ik de eerste 3 items uit de array terug krijg. 

### Aanvulling
In mijn code maakte ik eerst gebruik van routie met id’s die ik in de route elke keer los aansprak. Dat zag er zo uit: 

```js
export function router(){
   routie ({
       'route0': function() {
           classToggle('route0');
           console.log('Je hebt op card 1 geklikt!');
       },
       'route1': function() {
           classToggle('route1');
           console.log('Je hebt op card 2 geklikt!');
       },
       'route2': function() {
           classToggle('route2');
           console.log('Je hebt op card 3 geklikt!');
       },
   });
};
```

Dit is eigenlijk helemaal geen handige manier, vooral als je meer id’s erbij krijgt. Elke id doet hier bij mij ook hetzelfde. Een class togglen. Met de nieuwe code lukt dit met veel minder regels.

```js
export function router(){
   routie ({
       ':id': function(id) {
           classToggle(id);
       }
   });
};
```

Nu word elke id aangesproken en daarin wordt de class getoggled zoals ik hierboven ook had geschreven alleen dan veel langer. De juiste id kan ik doorgeven aan de classToggle function en zo kan ik de juiste elementen verstoppen of laten zien. Hierdoor word de code een stuk dynamischer. 

De id’s in html zijn niet de id’s die je kent maar je geeft id’s voor routie met data-route. Dat zou er bij mij dan zo uit zien alleen omdat ik de sections aanmaak in javascript zie je dit niet zo in mijn html code staan.

```html
 <section data-route="route1">
```

Een project waar ik routie nog meer voor heb gebruikt is project 1 van de OBA: https://github.com/ManoukK/project-1-1920 In de readme staat ook wat informatie over hoe ik dit heb aan gepakt en in dit project zorg ik ook voor dat de html elmeenten pas worden aangemaakt met javascript zodra er een routie word geactiveerd. Dit is iets netter dan hoe ik het met dit project heb opgelost. 
