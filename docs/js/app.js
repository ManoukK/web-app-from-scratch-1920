//server opstarten in de terminal met hs

getData();
test();

function getData(){
    // cors error opgelost door dit ervoor te zetten https://cors-anywhere.herokuapp.com/
    //bron van Maikel Sleebos 
    const cors = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://api.darksky.net/forecast/'
    const key = '4607992d79c7de3829e5f5b67a062c8e'
    //lat, long staat op Amsterdam
    const lat = '52.379189'
    const long = '4.899431'
    const units = '?units=si'
    // console.log(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${long}?units=si`)
    
    //lat en long mee kunnen geven aan deze url. Misschien heeft google maps dat wel?
    //dat kan met dit ${name} tussen de `` Het is een soort template 

    // const jsonInHtml = document.querySelector('.test');

    fetch (`${cors}${url}${key}/${lat},${long}${units}`)
        //data word json
        .then(response => {
            return response.json()
        })
        //extra stap om ook nog even in de "ruwe" dat te kunnen kijken. 
        .then(results => {
            console.log("gehele dataset", results)
            return results
        })
        //Alleen de array met de uren terug krijgen
        .then(results => {
            console.log("uren", results.hourly)
            return results.hourly
        })
        //Geeft de data van de uren terug (nu hoef je minder diep in de array te zitten)
        .then(results => {
            return results.data
        })
        //Data een beetje opschonen en alles wat ik niet vermeld word eruit gefilterd
        .then(results => {
            console.log("uren en de data daarvan", results)
            return results.map(results => {
                return {
                    time: results.time,
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
            test(results)
        })
};
//1580828400

function test(results) {
    console.log("hoi", results);
    // // document.getElementsByTagName("h1")[0].innerHTML = results[0].summary + " " + results[0].weatherType;
    // document.getElementById("summary").textContent = results.summary;
    // document.getElementById("temperature").textContent = results.temperature;

    console.log("hallo?");
    
    // //https://stackoverflow.com/questions/5886144/create-divs-from-array-elements
    // const fruitsList = document.getElementById('weatherCard');
    // const p = document.createElement('p');

    // results.forEach(function (result, index) {
    //     const clone = p.cloneNode();
    //     clone.textContent = index + ': ' + result.summary;
    //     fruitsList.appendChild(clone);
    // });

    const sectionList = document.getElementById('weatherCards');
    const section = document.createElement('section');

    results.forEach(function (result, index) {
        const clone = section.cloneNode(true);
        sectionList.appendChild(clone);
    });

    const makePElement = document.getElementsByName('section');
    const p = document.createElement('p');
    
    // results.forEach(function (result, index) {
    //     const clone2 = p.cloneNode(true);
    //     clone2.textContent = result.summary;
    //     makePElement.appendChild(clone2);
    // });

    console.log(makePElement);



    // document.getElementById("time").textContent = results[0].time;
    // const unixtimestamp = document.getElementById('time').textContent;
    // console.log("unixtimestamp", unixtimestamp);
    // // Months array
    // const months_arr = ['januari',
    //                     'febuari',
    //                     'maart',
    //                     'april',
    //                     'mei',
    //                     'juni',
    //                     'juli',
    //                     'augustus',
    //                     'september',
    //                     'oktober',
    //                     'november',
    //                     'december'];
    // // Convert timestamp to milliseconds
    // const date = new Date(unixtimestamp*1000);
    // // Month
    // var month = months_arr[date.getMonth()];
    // // Day
    // var day = date.getDate();
    // // Hours
    // var hours = date.getHours();
    // // Minutes
    // var minutes = "0" + date.getMinutes();
    // // Seconds
    // var seconds = "0" + date.getSeconds();
    // // Display date time in MM-dd-yyyy h:m:s format
    // var convdataTime = day+' '+month+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    // document.getElementById('datetime').textContent = convdataTime;
    // console.log("convdataTime", convdataTime);
}