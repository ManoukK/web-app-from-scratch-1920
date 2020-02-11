//server opstarten in de terminal met hs

getData();


//module api
function getData(){
    // cors error opgelost door dit ervoor te zetten https://cors-anywhere.herokuapp.com/
    //bron van Maikel Sleebos 
    const cors = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://api.darksky.net/forecast/';
    const key = '4607992d79c7de3829e5f5b67a062c8e';
    //lat, long staat op Amsterdam
    const lat = '52.379189';
    const long = '4.899431';
    const units = '?units=si';
    // console.log(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${long}?units=si`)
    
    //lat en long mee kunnen geven aan deze url. Misschien heeft google maps dat wel?
    //dat kan met dit ${name} tussen de `` Het is een soort template 

    // const jsonInHtml = document.querySelector('.test');

    fetch (`${cors}${url}${key}/${lat},${long}${units}`)
        //data word json
        .then(response => {
            return response.json();
        })
        //extra stap om ook nog even in de "ruwe" dat te kunnen kijken. 
        .then(results => {
            console.log("gehele dataset", results);
            return results;
        })
        //Alleen de array met de uren terug krijgen
        .then(results => {
            console.log("uren", results.hourly);
            return results.hourly;
        })
        //Geeft de data van de uren terug (nu hoef je minder diep in de array te zitten)
        .then(results => { 
            return results.data;
        })
        //Data een beetje opschonen en alles wat ik niet vermeld word eruit gefilterd
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
        .then(results => {
            return results.splice(1, 3);
        })
        .then(results => {
            console.log("voor dat het in de fucntion gata", results);
            setNode(results);
            setDetailNode(results);
        })
};

function convertTimestamp(timeStamp){
    //code regel van Ramon gekregen
    const timeString = new Date(timeStamp * 1000);
    //https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Date
    //verschillende type tijden
    const readableTime = timeString.toGMTString();
    //https://stackoverflow.com/questions/9323182/how-to-remove-the-last-word-in-the-string-using-javascript
    //laatste woord verwijderen van de timestring
    const splitReadableTime = readableTime.split(' ');
    const lastWord = splitReadableTime.pop();
    const cleanTimeSting = splitReadableTime.join(' ');
    return cleanTimeSting;
};

//module render
//basis code van Ramon: https://github.com/Ramon96/web-app-from-scratch-1920
// zelf aangepast: 
function setNode(results){
    const mainElement = document.getElementById('weatherCards');
    results.forEach((result,index) => {
        const sectionElement = createNode("article", "oneWeatherCard", result);
        sectionElement.append(
            createNode("h2", "id", "title", result.time),
            createNode("p", "id", "summary", result.summary, "The weather is"),
            createNode("p", "id", "temperature", result.temperature, "The temperature outside is", "degrees"),
            createNode("p", "id", "wind", result.wind, "The wind outside is", "km/h"),
            createNode("a", "href", "#route" + index, "More information >"),
            );
        mainElement.append(sectionElement);
    });
};

function createNode(elementTagName, atrributeType, atrributeName, content, contentText1="", contentText2=""){
    const element = document.createElement(elementTagName);
    element.setAttribute(atrributeType, atrributeName);
    element.textContent = contentText1 + " " + content + " " + contentText2;
    return element
};

//module renderDetail
function setDetailNode(results, index){
    const mainElement = document.getElementById('detailWeatherCards');
    results.forEach((result, index) => {
        const sectionElement = createDetailNode("article", "oneDetailWeatherCard", result);
        sectionElement.append(
            createDetailNode("h2", "id", "route" + index, result.time),
            createDetailNode("p", "id", "summary", result.summary, "The weather is"),
            createDetailNode("p", "id", "type", result.weatherType, "The weather type is"),
            createDetailNode("p", "id", "temperature", result.temperature, "The temperature outside is", "degrees"),
            createDetailNode("p", "id", "temperatureFeeling", result.temperatureFeeling, "It feels like", "degrees outside"),
            createDetailNode("p", "id", "wind", result.wind, "The wind outside is", "km/h"),
            createDetailNode("p", "id", "windGust", result.windGust, "The gusts of wind outside are", "km/h"),
            createDetailNode("p", "id", "visibility", result.visibility, "You can see", "km in the distance"),
            createDetailNode("p", "id", "airpressure", result.airpressure, "The air pressure is", "hPa"),
            createDetailNode("a", "href", "#top", "back to top >"),
            );
        mainElement.append(sectionElement);
    });
};

function createDetailNode(elementTagName, atrributeType, atrributeName, content, contentText1="", contentText2=""){
    const element = document.createElement(elementTagName);
    element.setAttribute(atrributeType, atrributeName);
    element.textContent = contentText1 + " " + content + " " + contentText2;
    return element;
};

//module router
routie ({
    'route0': function() {
      console.log('root');
    },
    'route1': function() {
      console.log('alert');
    }
  });
  