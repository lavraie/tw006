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
                name,
                alpha2Code
            }));
            var data3 = data[1].map(({ name, country, lat, lng }) => ({ name, country, lat, lng }));
            data4 = [data2, data3]
            getData2(data4);
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
        var result1 = data5[1].filter(function(codeSelected) {
            return codeSelected.country == result2;
        });
        var result1 = result1.reverse();
        document.getElementById("citySelect").innerHTML = "";
        result1.forEach(function(item) {
            var option = document.createElement("option");
            option.text = item.name.valueOf();
            document.getElementById("citySelect").add(option);
        });
    };
};

function citySelected() {
    var el = document.getElementById("citySelect").value;
    var result1 = data5[1].filter(function(codeSelected) {
        return codeSelected.name == el;
    });
    mymap.setView([result1[0].lat, result1[0].lng], 13);
    var marker = L.marker([result1[0].lat, result1[0].lng]).addTo(mymap);
    var bounds = mymap.getBounds();
}

function getData2(name) {
    data5 = name;
    data4[0].forEach(function(item) {
        var option = document.createElement("option");
        option.text = item.name.valueOf();
        document.getElementById("countrySelect").add(option);
    });
}

function getData() {
    promiseAll();
}
getData();
let routes = [];
let mark = [];
let cities = [];
let assetLayer;
let fn01;

function myFunction(amenity) {
    console.log(amenity);
    var bounds = mymap.getBounds();
    let url = `https://www.overpass-api.de/api/interpreter?data=[out:json];node[amenity=${amenity}](${bounds._southWest.lat},${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng});out meta;`;
    fetch(url)
        .then(
            function(response) {
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

                        const listUl = document.getElementsByTagName("LI");
                        var i = listUl.length;
                        if (typeof item.tags.phone !== "undefined") {
                            var pop = "<dd>" + item.tags.name + "</dd>" + "<dd>" + item.tags.phone + "</dd>";
                            var pop01 = item.tags.name + " " + item.tags.phone;
                        } else {
                            var pop = `<dd>  ${item.tags.name} </dd><br><button name="btn02" id=${i} onclick = "fn01(id)" >Delete Marker </button>`;
                            // var pop = `<button type="button" onclick ="(function() { console.log("Hello World"); })()"> btn < /button>`;
                            var pop01 = item.tags.name;
                            fn01 = function btn01(id) {
                                mymap.removeLayer(mark[id]);
                                document.getElementById("cafes03").appendChild(document.getElementById(id).parentElement);

                                // console.log(document.getElementById(id).parentElement);
                            };
                        }

                        let marker;
                        const node = document.createElement("LI");
                        const textnode = document.createTextNode(pop01);
                        node.appendChild(textnode);
                        const node01 = node.cloneNode(true);
                        node01.setAttribute("class", "cafes01");

                        marker = new L.marker([item.lat, item.lon]);
                        marker._id = i;


                        // let btn = document.createElement('button');
                        // btn.type = "button";
                        // btn.innerText = 'Delete Marker';
                        // btn.id = i;


                        // console.log(btn);

                        mark.push(L.marker([item.lat, item.lon], { icon: myIcon }).bindPopup(pop, {
                            maxWidth: 'auto'
                        }));



                        // marker.bindPopup(btn, {
                        //     maxWidth: 'auto'
                        // }).openPopup();

                        const latEl = `<span id=${i} hidden>${item.lat}</span>`;
                        const lonEl = `<span id=${i} hidden>${item.lon}</span>`;
                        const domString = `<span id=${i}><i class="arrow up"></i></span>`;
                        const domStringdown = `<span id=${i}><i class="arrow down"></i></span>`;
                        const close01 = `<span id=${i}><i class="close"> x </i></span>`;
                        const rightArrow = `<span id=${i}><i class="arrow right"></i></span>`;
                        node01.innerHTML += " " + latEl + " " + lonEl + " " + domString + " " + i + " " + domStringdown + " " + close01 + " " + rightArrow;
                        node01.addEventListener("click", (event) => {
                            let li = event.target.parentElement.parentElement;
                            const clName = document.getElementsByClassName("cafes23");
                            const clNameIds = [];
                            for (i = 0; i < clName.length; i++) {
                                clNameIds.push(clName[i].id);
                            }
                            let found = clNameIds.indexOf(li.parentElement.id);
                            if (event.target.className === 'arrow up') {
                                li.parentElement.insertBefore(li, li.previousElementSibling);
                            };
                            if (event.target.className === 'arrow down') {
                                li.parentElement.insertBefore(li.nextElementSibling, li);
                            };
                            if (event.target.className === 'arrow right') {
                                clName[found + 1].appendChild(li);
                            };
                            if (event.target.className === 'close') {
                                // console.log(mark[marker._id]);
                                mymap.removeLayer(mark[marker._id]);
                                document.getElementById("cafes03").appendChild(document.getElementById(marker._id).parentElement);
                                document.getElementById(marker._id).parentElement.getElementsByClassName("close")[0].parentElement.hidden = true;
                                document.getElementById(marker._id).parentElement.getElementsByClassName("arrow right")[0].parentElement.hidden = true;
                            };
                        });
                        document.getElementById("cafes").appendChild(node01);
                    }
                    assetLayer = L.layerGroup(mark).addTo(mymap);
                    // assetLayer.color = '#e85141';
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

function myFunction1() {
    let routes = [];
    let routesEl = document.getElementById("cafes02");
    let routesEl01 = [...routesEl.getElementsByTagName("LI")];
    for (i = 0; i < routesEl01.length; i++) {
        routes.push([routesEl01[i].children[0].textContent, routesEl01[i].children[1].textContent])
    }
    route01();

    function route01() {
        // .on('success', function(data) {
        //     var legs = data.route.legs,
        //         html = '',
        //         maneuvers,
        //         i;
        //     if (legs && legs.length) {
        //         maneuvers = legs[0].maneuvers;
        //         for (i = 0; i < maneuvers.length; i++) {
        //             html += (i + 1) + '. ';
        //             html += maneuvers[i].narrative + '' + '</br>';
        //         }
        //         L.DomUtil.get('route-narrative').innerHTML = html;
        //     }
        // });
        for (i = 0; i < routes.length - 1; i++) {
            console.log(routes);
            console.log(routes.length);
            var dir;
            dir = MQ.routing.directions();
            dir.route({
                locations: [{
                        latLng: {
                            lat: routes[i][0],
                            lng: routes[i][1]
                        }
                    },
                    {
                        latLng: {
                            lat: routes[i + 1][0],
                            lng: routes[i + 1][1]
                        }
                    }
                ],
                options: {
                    // routeType: 'bus'
                    routeType: 'pedestrian'
                }
            });
            let items = ["red", "yellow", "blue", "black", "lightblue"];
            let k = items[Math.floor(Math.random() * items.length)];
            mymap.addLayer(MQ.routing.routeLayer({
                ribbonOptions: { draggable: true, ribbonDisplay: { color: k, opacity: 0.3 } },
                directions: dir,
                fitBounds: false
            }));
        }
    }
}