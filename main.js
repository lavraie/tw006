// store urls to fetch in an array
const urls = [
    //'https://dog.ceo/api/breeds/list',
    //'https://dog.ceo/api/breeds/image/random',
    'https://restcountries.eu/rest/v2/all',
    //'https://datahub.io/core/world-cities/r/world-cities.json',
    'https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json',
    //'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
];
// use map() to perform a fetch and handle the response for each url
var data5 = [];
async function promiseAll() {
    await Promise.all(urls.map(url =>
        fetch(url)
            .then(parseJSON)
    ))
        .then(data => {
            console.log(data);
            var data2 = data[0].map(({ name, alpha2Code }) => ({
                name, alpha2Code
            }));
            var data3 = data[1].map(({ name, country, lat, lng }) => ({ name, country, lat, lng })
            );
            data4 = [data2, data3]
            getData2(data4);
            // data2.forEach(function (item) {
            //     var option = document.createElement("option");
            //     option.text = item.name.valueOf();
            //     document.getElementById("countrySelect").add(option);
            // });
        })
}
// do something with the data
function parseJSON(response) {
    return response.json();
};
function countrySelected() {
    var el = document.getElementById("countrySelect").value;
    changedCountry(el);
    function changedCountry(el) {
        var result = data5[0].filter((x) => x.name.match(el));
        var result2 = result[0].alpha2Code;
        console.log(result[0].alpha2Code);
        console.log(data5[1]);
        var result1 = data5[1].filter(function (codeSelected) {
            return codeSelected.country == result2;
        });
        var result1 = result1.reverse();
        console.log(result1);
        console.log("changedCountry " + el);
        document.getElementById("citySelect").innerHTML = "";
        result1.forEach(function (item) {
            var option = document.createElement("option");
            option.text = item.name.valueOf();
            document.getElementById("citySelect").add(option);
        });
    };
};
function citySelected() {
    var el = document.getElementById("citySelect").value;
    console.log(el);
    var result1 = data5[1].filter(function (codeSelected) {
        return codeSelected.name == el;
    });
    console.log(result1);
    console.log(result1[0].lat);
    console.log(result1[0].lng);
    mymap.flyTo([result1[0].lat, result1[0].lng], 14);
    // mymap.setZoom(9);
    var marker = L.marker([result1[0].lat, result1[0].lng]).addTo(mymap);
    var bounds = mymap.getBounds();
    console.log(bounds);
}
function getData2(name) {
    console.log(name);
    data5 = name;
    data4[0].forEach(function (item) {
        var option = document.createElement("option");
        option.text = item.name.valueOf();
        document.getElementById("countrySelect").add(option);
    });
}
function getData() {
    promiseAll();
}
getData();

function myFunction() {
    var bounds = mymap.getBounds();
    console.log(bounds);
    console.log(bounds._northEast.lat);
    
        
                
    

    // let url = 'https://www.overpass-api.de/api/interpreter?data=[out:json];node[amenity=restaurant](46.1138,-1.1630,46.1925,-1.1511);out meta;';

            
    let url = `https://www.overpass-api.de/api/interpreter?data=[out:json];node[amenity=restaurant](${bounds._southWest.lat},${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng});out meta;`;


    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    // console.log(data);
                    let el = data.elements;
                    // console.log(el);
                    el.forEach(sortFunc);

                    function sortFunc(item){
                        // console.log(item.lat);
                        var marker = L.marker([item.lat, item.lon]).addTo(mymap);
                        console.log(L);

                    }


                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}