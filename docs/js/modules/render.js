//basis code van Ramon: https://github.com/Ramon96/web-app-from-scratch-1920
// zelf aangepast: 
export function setNode(results){
    console.log("hooooi", results)
    const mainElement = document.getElementById('weatherCards');
    results.forEach((result, index) => {
        const sectionElement = createNode("article", "class", "active", result);
        sectionElement.append(
            createNode("h2", "id", "title", result.time),
            createNode("p", "id", "summary", result.summary, "The weather is"),
            createNode("p", "id", "temperature", result.temperature, "It is", "degrees outside"),
            createNode("p", "id", "wind", result.wind, "The wind outside is", "km/h"),
            createNode("a", "href", "#route" + index, "More information >"),
            );
        mainElement.append(sectionElement);
    });
    // route fixen dynamisch
};

export function setDetailNode(results, index){
    console.log(results)
    const mainElement = document.getElementById('detailWeatherCards');
    results.forEach((result, index) => {
        const sectionElement = createNode("article", "data-route", "route" + index, result);
        sectionElement.append(
            createNode("h2", "id", "time", result.time),
            createNode("p", "id", "summary", result.summary, "The weather is"),
            createNode("p", "id", "type", result.weatherType, "The weather type is"),
            createNode("p", "id", "temperature", result.temperature, "The temperature outside is", "degrees"),
            createNode("p", "id", "temperatureFeeling", result.temperatureFeeling, "It feels like", "degrees outside"),
            createNode("p", "id", "wind", result.wind, "The wind outside is", "km/h"),
            createNode("p", "id", "windGust", result.windGust, "The gusts of wind outside are", "km/h"),
            createNode("p", "id", "visibility", result.visibility, "You can see", "km in the distance"),
            createNode("p", "id", "airpressure", result.airpressure, "The air pressure is", "hPa"),
            createNode("a", "href", "", "back to top >"),
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