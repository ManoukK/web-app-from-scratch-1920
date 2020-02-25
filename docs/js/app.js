//server opstarten in de terminal met hs

import { getData } from './modules/api.js';
import { setNode } from './modules/render.js';
import { setDetailNode } from './modules/render.js';
import { router } from './modules/route.js';

// createNode();

getData()
    .then((results)=> {
        setNode(results);
        setDetailNode(results);
        router();
        calcWeather(results);
        console.log(results);
    });


function calcWeather(results) {
    console.log("hoi dit doet het", results)
    
    // const test = results.reduce((a, b) => (a + b))
    const graden = results.temperature;
    console.log(graden)
    
    const test = graden.reduce(function (accumulator, currentValue){
        return accumulator + currentValue;
    });

    const gem = test / results.length;

    console.log(gem)
    // return gem;
}