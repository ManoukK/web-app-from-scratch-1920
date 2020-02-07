//server opstarten in de terminal met hs

getData();
// test();


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
                    wind: results.windSpeed,
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
            setTeperaturNode(results);
        })
};

function convertTimestamp(timeStamp){
    // const covertTimeStamp = new Date(timeStamp - 10800 * 1000);
    const covertTimeStamp = new Date(timeStamp * 1000);
    //https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Date
    //verschillende type tijden
    // console.log(covertTimeStamp.toGMTString());
    // console.log(covertTimeStamp.toLocaleDateString());
    // console.log(covertTimeStamp.toDateString());
    return covertTimeStamp.toDateString();
};

//1580828400

// function makeHtmlElements(results) {
//     console.log("hoi", results);
//     // // document.getElementsByTagName("h1")[0].innerHTML = results[0].summary + " " + results[0].weatherType;
//     // document.getElementById("summary").textContent = results.summary;
//     // document.getElementById("temperature").textContent = results.temperature;
    
//     // //https://stackoverflow.com/questions/5886144/create-divs-from-array-elements
//     // const fruitsList = document.getElementById('weatherCard');
//     // const p = document.createElement('p');

//     // results.forEach(function (result, index) {
//     //     const clone = p.cloneNode();
//     //     clone.textContent = index + ': ' + result.summary;
//     //     fruitsList.appendChild(clone);
//     // });

//     // const sectionList = document.getElementById('weatherCards');
//     // const section = document.createElement('section');

//     // results.forEach(function (result, index) {
//     //     const sectionList = document.getElementById('weatherCards');
//     //     const section = document.createElement('section');
//     //     const clone = section.cloneNode(true);
//     //     // clone.textContent = result.summary + ' ' + result.weatherType + ' ' + result.temperature;
//     //     sectionList.appendChild(clone);
//     // });

//     // results.forEach(function (result, index) {
//     //     const sectionList = document.getElementsByTagName('section');
//     //     const p = document.createElement('p');
//     //     const clone = p.cloneNode(true);
//     //     clone.textContent = result.summary;
//     //     sectionList.appendChild(clone);
//     // });
// }


//code van Ramon: https://github.com/Ramon96/web-app-from-scratch-1920
function setTeperaturNode(results){
    const mainElement = document.getElementById('weatherCards');
    results.forEach(result => {
        createTemperatureNode(result.time, "p", mainElement);
    });
};

function createTemperatureNode(content, elementTagName, parentElement){
    const element = document.createElement(elementTagName);
    element.textContent = content + ' graden celsius';
    parentElement.append(element);
};

