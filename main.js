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
        var result1 = data5[1].filter(function (codeSelected) {
            return codeSelected.country == result2;
        });
        var result1 = result1.reverse();
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
    var result1 = data5[1].filter(function (codeSelected) {
        return codeSelected.name == el;
    });
    mymap.setView([result1[0].lat, result1[0].lng], 13);
    var marker = L.marker([result1[0].lat, result1[0].lng]).addTo(mymap);
    var bounds = mymap.getBounds();
}
function getData2(name) {
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
var routes = [];
var mark = [];
var cities = [];
var assetLayer;
function myFunction() {
    var bounds = mymap.getBounds();
    let url = `https://www.overpass-api.de/api/interpreter?data=[out:json];node[amenity=cafe](${bounds._southWest.lat},${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng});out meta;`;
    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function response(data) {
                    let el = data.elements;
                    el.forEach(sortFunc);
                    function sortFunc(item) {
                        var myIcon = L.icon({
                            iconUrl: 'https://img.icons8.com/clouds/100/000000/bar.png',
                            iconSize: [50, 50],
                            iconAnchor: [22, 94],
                            popupAnchor: [-3, -76],
                        });
                        if (typeof item.tags.phone !== "undefined") {
                            var pop = "<dd>" + item.tags.name + "</dd>" + "<dd>" + item.tags.phone + "</dd>";
                            var pop01 = item.tags.name + " " + item.tags.phone;
                        }
                        else {
                            var pop = "<dd>" + item.tags.name + "</dd>";
                            var pop01 = item.tags.name;
                        }
                        mark.push(L.marker([item.lat, item.lon], { icon: myIcon }).bindPopup(pop));
                        const loc = [item.tags.name, item.lat, item.lon];
                        routes.push(loc);
                        const node = document.createElement("LI");
                        const textnode = document.createTextNode(pop01);
                        node.appendChild(textnode);
                        const node01 = node.cloneNode(true);
                        node01.setAttribute("class", "cafes01");
                        document.getElementById("cafes").appendChild(node01);
                        if (typeof item.tags.phone !== 'undefined') {
                            node.setAttribute("class", "cafes03");
                            document.getElementById("cafes03").appendChild(node);
                        } else {
                            node.setAttribute("class", "cafes02");
                            document.getElementById("cafes02").appendChild(node);
                        }
                    }
                    var myNodelist = document.getElementsByTagName("LI");
                    var i;
                    for (i = 0; i < myNodelist.length; i++) {
                        myNodelist[i].id = i;
                        const domString = `<span id=${i}><i class="arrow up"></i></span>`;
                        const domStringdown = `<span id=${i}><i class="arrow down"></i></span>`;
                        const close01 = `<span id=${i}><i class="close"> x </i></span>`;
                        const rightArrow = `<span id=${i}><i class="arrow right"></i></span>`;
                        myNodelist[i].innerHTML += "   " + domString + " " + i + " " + domStringdown + " " + close01 + " " + rightArrow;
                    }
                    assetLayer = L.layerGroup(mark).addTo(mymap);
                    assetLayer.color = '#e85141';
                });
                const listUl = document.getElementById('cafes');
                listUl.addEventListener("click", (event) => {
                    let li = event.target;
                    let f = li.parentElement.id;
                    li01 = listUl.childNodes[f];
                    if (event.target.className === 'arrow up') {
                        listUl.insertBefore(li01, li01.previousElementSibling);
                        for (i = 0; i < listUl.children.length; i++) {
                            listUl.children[i].children[0].id = i;
                            listUl.children[i].children[1].id = i;
                            listUl.children[i].children[2].id = i;
                        }
                        console.log(listUl);
                    }
                    if (event.target.className === 'arrow down') {
                        listUl.insertBefore(li01.nextElementSibling, li01);
                        for (i = 0; i < listUl.children.length; i++) {
                            listUl.children[i].children[0].id = i;
                            listUl.children[i].children[1].id = i;
                            listUl.children[i].children[2].id = i;
                        }
                    }
                    if (event.target.className === 'arrow right') {
                        document.getElementById("cafes02").appendChild(li01);
                        for (i = 0; i < listUl.children.length; i++) {
                            listUl.children[i].children[0].id = i;
                            listUl.children[i].children[1].id = i;
                            listUl.children[i].children[2].id = i;
                        }
                    }
                    if (event.target.className === 'close') {
                        document.getElementById("cafes03").appendChild(li01);
                        for (i = 0; i < listUl.children.length; i++) {
                            listUl.children[i].children[0].id = i;
                            listUl.children[i].children[1].id = i;
                            listUl.children[i].children[2].id = i;
                        }
                    }
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
function myFunction1() {
    function route01(i) {
        var dir;
        dir = MQ.routing.directions()
            .on('success', function (data) {
                var legs = data.route.legs,
                    html = '',
                    maneuvers,
                    i;
                if (legs && legs.length) {
                    maneuvers = legs[0].maneuvers;
                    for (i = 0; i < maneuvers.length; i++) {
                        html += (i + 1) + '. ';
                        html += maneuvers[i].narrative + '' + '</br>';
                    }
                    L.DomUtil.get('route-narrative').innerHTML = html;
                }
            });
        dir.route({
            locations: [{
                latLng: {
                    lat: routes[i][1],
                    lng: routes[i][2]
                }
            }
                ,
            {
                latLng: {
                    lat: routes[i++][1],
                    lng: routes[i++][2]
                }
            }]
        });
        mymap.addLayer(MQ.routing.routeLayer({
            directions: dir,
            fitBounds: false
        }));
    }
    for (i = 0; i < routes.length - 1; i++) {
        route01(i);
    }
}
