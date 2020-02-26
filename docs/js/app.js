//server opstarten in de terminal met hs

import { getData } from './modules/api.js';
import { setNode } from './modules/render.js';
import { setDetailNode } from './modules/render.js';
import { router } from './modules/route.js';
import { mapWeather } from './modules/AverageTemp.js';
import { loading } from './modules/loadingState.js';
// createNode();


loading.Show("loading");

getData()
    .then((results)=> {
        loading.Hide("loading");
        setNode(results);
        setDetailNode(results);
        router();
        mapWeather(results);
        console.log(results);
    });

// //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// function calcWeather(results) {
//     const temperatureData = results.map(results => {
//         const graden = results.temperature;
//         console.log(graden);

//         return graden;
//     });

//     console.log(temperatureData);

//     const totalTemperature = temperatureData.reduce(function (accumulator, currentValue){
//         return accumulator + currentValue;
//     });

//     console.log(totalTemperature)

//     const averageTemperature = totalTemperature / results.length;
//     const averageTemperatureRoundedDown = Math.round(averageTemperature);

//     console.log(averageTemperature);
//     console.log(averageTemperatureRoundedDown);
// };