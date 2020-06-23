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

function fn01() {
    console.log("fn01");
    // console.log(e1);
    // console.log(h);
    // mymap.removeLayer(e1);
}

function myFunction(amenity) {
    console.log(amenity);
    // amenity = amenity;
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
                        let iconU;
                        if (amenity == "cafe") {
                            iconU = 'https://img.icons8.com/clouds/100/000000/cafe.png';
                        }
                        if (amenity == "restaurant") {
                            iconU = 'https://img.icons8.com/clouds/100/000000/restaurant.png';
                        }
                        if (amenity == "cinema") {
                            iconU = 'https://img.icons8.com/clouds/100/000000/starred-ticket.png';
                        }
                        var myIcon = L.icon({
                            iconUrl: iconU,
                            iconSize: [50, 50],
                            iconAnchor: [22, 94],
                            popupAnchor: [-3, -76],
                        });
                        const listUl = document.getElementsByTagName("LI");
                        var i = listUl.length;

                        let pop02;
                        fn02 = function btn02(id39, id40, id41, id42) {
                            document.getElementById("cafes02").insertAdjacentHTML('beforeend', `<div id="two">${id39} ${id40} </div><span id="lat" hidden>${id41}</span></div><span id="lon" hidden>${id42}</span>`);
                            console.log(document.getElementById("cafes02"));
                            // <span id=${i}><i class="arrow up"></i></span>


                        };
                        let marker;
                        // const node = document.createElement("LI");
                        // const textnode = document.createTextNode(pop01);
                        // node.appendChild(textnode);
                        // const node01 = node.cloneNode(true);
                        // node01.setAttribute("class", "cafes01");
                        marker = new L.marker([item.lat, item.lon]);
                        marker._id = i;
                        let _markerOnClick = function(e) {
                            let itTag = item.tags.name;
                            let targetInnerHTML = e.target._popup._contentNode;
                            targetInnerHTML.innerHTML = "";
                            let id01 = e.target._leaflet_id;
                            let fil01 = mark.find(el => el._leaflet_id == id01);
                            let fil02 = mark.indexOf(fil01);
                            let html01 = `<button name="btn02" id=${fil02} onclick='(function(){ mymap.removeLayer(mark[${fil02}]); })();'>Delete Marker 123 </button><br><br><dt>${itTag}</dt><br><button name="btn03" id=${i} onclick = "fn02('${amenity}', '${itTag}', '${item.lat}', '${item.lon}')" >Add to route</button>`;
                            if (targetInnerHTML.innerHTML == "") {
                                targetInnerHTML.innerHTML = html01;
                            }

                        };
                        mark.push(L.marker([item.lat, item.lon], {
                            icon: myIcon,
                            title: item.tags.name,
                            amenity: amenity
                        }).bindPopup(pop02, {
                            maxWidth: 'auto'
                        }).addEventListener('click', _markerOnClick));

                        const latEl = `<span id=${i} hidden>${item.lat}</span>`;
                        const lonEl = `<span id=${i} hidden>${item.lon}</span>`;
                        const domString = `<span id=${i}><i class="arrow up"></i></span>`;
                        const domStringdown = `<span id=${i}><i class="arrow down"></i></span>`;
                        const close01 = `<span id=${i}><i class="close"> x </i></span>`;
                        const rightArrow = `<span id=${i}><i class="arrow right"></i></span>`;
                        // node01.innerHTML += " " + latEl + " " + lonEl + " " + domString + " " + i + " " + domStringdown + " " + close01 + " " + rightArrow;
                        // node01.addEventListener("click", (event) => {
                        //     let li = event.target.parentElement.parentElement;
                        //     const clName = document.getElementsByClassName("cafes23");
                        //     const clNameIds = [];
                        //     for (i = 0; i < clName.length; i++) {
                        //         clNameIds.push(clName[i].id);
                        //     }
                        //     let found = clNameIds.indexOf(li.parentElement.id);
                        //     if (event.target.className === 'arrow up') {
                        //         li.parentElement.insertBefore(li, li.previousElementSibling);
                        //     };
                        //     if (event.target.className === 'arrow down') {
                        //         li.parentElement.insertBefore(li.nextElementSibling, li);
                        //     };
                        //     if (event.target.className === 'arrow right') {
                        //         clName[found + 1].appendChild(li);
                        //     };
                        //     if (event.target.className === 'close') {
                        //         console.log("mark[marker._id]");
                        //         console.log(mark[marker._id]);
                        //         mymap.removeLayer(mark[marker._id]);


                        ;
                    }
                    assetLayer = L.layerGroup(mark).addTo(mymap);
                    console.log(mark);
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

function myFunction2(valueToClear) {
    const result = mark.filter(e => e.options.amenity == valueToClear);
    result.forEach(myFunction);

    function myFunction(item, index) {
        mymap.removeLayer(result[index]);
        const indexOfMark = mark.indexOf(item);
        console.log(indexOfMark);
        mark.splice(indexOfMark, 1);
    }
    console.log("mark");
    console.log(mark);
}

function myFunction11() {
    console.log(i);
    i += 1;
}
// let i = 0;
// let n = 0;
// let dir;

function myFunction1() {

    let routes = [];
    let routesEl = document.getElementById("cafes02");
    let routesEl01 = [...routesEl.getElementsByTagName("SPAN")];
    // console.log("routesEl");
    // console.log(routesEl);
    // console.log("routesEl01");
    // console.log(routesEl01);
    for (n = 0; n <= routesEl01.length - 1; n += 2) {
        // routes.push([routesEl01[n].innerText, routesEl01[n + 1].innerText]);
        routes.push({ latLng: { lat: routesEl01[n].innerText, lng: routesEl01[n + 1].innerText } });
        // console.log("routes");
        // console.log(routes);
    }
    console.log("routes");
    console.log(routes);
    // console.log(routes.length);


    L.DomUtil.get('route-narrative').innerHTML = '';
    dir = MQ.routing.directions()
        .on('success', function(data) {
            let legs = data.route.legs,
                maneuvers01 = [],
                html = '',
                i;

            console.log("onsuccess");
            console.log(legs);

            //     html = '',
            //     i;
            // console.log("legs");
            // console.log(legs);
            // console.log("legs.length");
            // console.log(legs.length);
            // let k = legs.length;

            if (legs && legs.length) {
                for (i = 0; i < legs.length; i++) {
                    legs[i].maneuvers.forEach(element => maneuvers01.push(element));
                    console.log("maneuvers01");
                    console.log(maneuvers01);
                    //         // maneuvers.push(legs[i].maneuvers);


                }
            }
            //     console.log("k");
            //     console.log(k);
            //     // console.log("legs.length");
            // console.log(legs.length);
            // console.log("legs[i]");
            // console.log(legs[i]);
            // maneuvers = legs[i].maneuvers;
            // console.log("maneuvers");
            // console.log(maneuvers);

            for (i = 0; i < maneuvers01.length; i++) {
                html += (i + 1) + '. ';
                html += maneuvers01[i].narrative + '';
                html += '<br>';
            }
            // L.DomUtil.get('cafes03').innerHTML += ' ' + data.route.legs[0].distance + ' km';
            L.DomUtil.get('route-narrative').insertAdjacentHTML('beforeend', html);
            // }
            // }
            // 
        });


    // locations01 = [];
    // for (n = 0; n < routes.length; n += 2) {
    //     locations01.push({
    //         latLng: {
    //             lat: routes[n][0],
    //             lng: routes[n][1]
    //         }
    //     }, {
    //         latLng: {
    //             lat: routes[n + 1][0],
    //             lng: routes[n + 1][1]
    //         }
    //     });

    // };
    // console.log("locations01");
    // console.log(locations01);
    dir.route({
        locations: routes,

        options: {
            // routeType: 'bus'
            routeType: 'pedestrian'
        }
    });

    mymap.addLayer(MQ.routing.routeLayer({
        directions: dir,
        fitBounds: false
    }));

    // let items = ["red", "yellow", "blue", "black", "darkblue", "brown", "violet"];
    // let k = items[Math.floor(Math.random() * items.length)];

    // mymap.addLayer(MQ.routing.routeLayer({
    //     ribbonOptions: { draggable: true, ribbonDisplay: { color: 'red', opacity: 0.3 } },
    //     directions: dir,
    //     fitBounds: false
    // }));




}