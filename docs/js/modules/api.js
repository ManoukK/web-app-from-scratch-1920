// //fake json dankzij Maikel Sleebos
// import {data} from '/temp.js'

// console.log(data);
// getFakeData(data);

// //json bestand?

// export function getFakeData(data) {
//     const promiseFakeData = new Promise(function(resolve, reject) {
//         resolve(data);
//       });

//     //promise van Robin Stut en https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
//     //Alleen de array met de uren terug krijgen
//     promiseFakeData.then(results => {
//         console.log("uren", results.hourly);
//         return results.hourly;
//     })
//     //Geeft de data van de uren terug (nu hoef je minder diep in de array te zitten)
//     .then(results => { 
//         return results.data;
//     })
//     //Data een beetje opschonen en alles wat ik niet vermeld word eruit gefilterd
//     .then(results => {
//         return dataCleaningNames(results)
//     })
//     .then(results => {
//         return filterArray(results)
//     })
//     .then(results => {
//         console.log(results)
//         return results
//     })

//     console.log(promiseFakeData)
//     return promiseFakeData
// };

export async function getData(){
    // cors error opgelost door dit ervoor te zetten https://cors-anywhere.herokuapp.com/
    //bron van Maikel Sleebos 
    const cors = 'https://cors-anywhere.herokuapp.com/';
    const api = 'https://api.darksky.net/forecast/';
    const key = '4607992d79c7de3829e5f5b67a062c8e';
    //lat, long staat op Amsterdam
    const lat = '52.379189';
    const long = '4.899431';
    const units = '?units=si';
    // const url = `${cors}${api}${key}/${lat},${long}${units}`; 
    const url = `${api}${key}/${lat},${long}${units}`; 
    // console.log(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${long}?units=si`)
    
    //lat en long mee kunnen geven aan deze url. Misschien heeft google maps dat wel?
    //dat kan met dit ${name} tussen de `` Het is een soort template 
    
    const data = await fetch(url)
        //data word json
        .then(response => {
            console.log("console doet het")
            return response.json();
        })
        //extra stap om ook nog even in de "ruwe" dat te kunnen kijken. 
        .then(results => {
            console.log("gehele dataset", results);
            return results;
        })
        //Alleen de array met de uren terug krijgen
        .then(results => {
            // console.log("uren", results.hourly);
            return results.hourly;
        })
        //Geeft de data van de uren terug (nu hoef je minder diep in de array te zitten)
        .then(results => { 
            // console.log(results)
            return results.data;
        })
        //Data een beetje opschonen en alles wat ik niet vermeld word eruit gefilterd
        .then(results => {
            // console.log(results)
            return dataCleaningNames(results);
        })
        .then(results => {
            // console.log(results)
            return filterArray(results);
        })
        .then(results => {
            // test(results);
            // setDetailNode(results);
            // console.log(results);
            return results;
        });
        return data;
        // console.log(data)
        // return Promise.all([data])
};

function dataCleaningNames(results){
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
        };
    });
};

//deze function heb ik dankzij Robin Stut
function filterArray(results){
    const newValue =  results.filter((results, index)  => {       
        return index < 3;
    });
    // console.log(newValue);
    return newValue;
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

// export const fakeFetchData  = {
//     0: {
//         time: "Mon, 24 Feb 2020 16:00:00",
//         summary: "Light Rain and Dangerously Windy",
//         weatherType: "rain",
//         temperature: 9.72,
//         temperatureFeeling: 5.35,
//         wind: 12.53,
//         windGust: 21.13,
//         airpressure: 1002.4,
//         visibility: 10.923,
//         icon: "rain",
//     },
//     1: {
//         time: "Mon, 24 Feb 2020 17:00:00",
//         summary: "Light Rain and Windy",
//         weatherType: "rain",
//         temperature: 10.21,
//         temperatureFeeling: 10.21,
//         wind: 11.86,
//         windGust: 20.47,
//         airpressure: 1001.9,
//         visibility: 16.093,
//         icon: "rain",
//     },
//     2: {
//         time: "Mon, 24 Feb 2020 18:00:00",
//         summary: "Possible Light Rain and Windy",
//         weatherType: "rain",
//         temperature: 10.38,
//         temperatureFeeling: 10.38,
//         wind: 11.44,
//         windGust: 19.7,
//         airpressure: 1001.6,
//         visibility: 16.093,
//         icon: "rain",
//     },
// };

// console.log(fakeFetchData)

// wat doe je met lastige klanten?

// function test(results){
//     console.log("wekrt dit?", results)
//     return (results)
// }