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
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

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