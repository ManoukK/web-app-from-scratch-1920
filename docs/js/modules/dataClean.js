// import { getData } from './modules/api.js';

export function dataCleaningNames(results){
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
export function filterArray(results){
    const newValue =  results.filter((results, index)  => {       
        return index < 3;
    });
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