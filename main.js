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
            var data2 = data[0].map(({ name, alpha2Code }) => ({
                name, alpha2Code
            }));
            var data3 = data[1].map(({ name, country }) => ({ name, country })
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
    console.log(el);
};
function changedCountry() {
    //var result = data3.filter((x) => x.name.match(el));
    //console.log(result);
console.log("data4 " + el);

};

function getData() {
    promiseAll();
}
getData();
function getData2(name) {
    console.log("data4");
    console.log(name);
    data4[0].forEach(function (item) {
        var option = document.createElement("option");
        option.text = item.name.valueOf();
        document.getElementById("countrySelect").add(option);
    });

    

}