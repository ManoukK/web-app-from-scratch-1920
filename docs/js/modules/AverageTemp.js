//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
export function mapWeather(results) {
    const temperatureData = results.map(results => {
        const graden = results.temperature;
        console.log("alle temperaturen die in de array komen te staan", graden);
        return graden;
    });

    console.log("array met temperatuur voor de komende 3 uur", temperatureData);
    calcWeather(temperatureData);
};

function calcWeather(temperatureData){
    const totalTemperature = temperatureData.reduce(function (accumulator, currentValue){
        console.log("accumulator", accumulator);
        console.log("currentValue", currentValue)
        return accumulator + currentValue;
    });

    console.log("Alle temperaturen bij elkaar opgeteld", totalTemperature)

    const averageTemperature = totalTemperature / temperatureData.length;
    const averageTemperatureRoundedDown = Math.round(averageTemperature);

    console.log("gemiddelde temperatuur", averageTemperature);
    console.log("gemiddelde temperatuur met math.round", averageTemperatureRoundedDown);
};