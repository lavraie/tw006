const urls = [
    'https://restcountries.eu/rest/v2/all',
    //'https://datahub.io/core/world-cities/r/world-cities.json',
    'https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json',
    //'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
];

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
    L.marker(mymap._initialCenter).addTo(mymap);
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

function myFunction(amenity) {
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
                        });
                        const listUl = document.getElementsByTagName("LI");
                        var i = listUl.length;
                        let pop02;
                        fn02 = function(id39, id40, id41, id42, id43) {
                            document.getElementById("cafes02").insertAdjacentHTML('beforeend', `<div lat=${id41} lon=${id42} id=${id43} >${id39} ${id40}<span onClick="fn03()" >&ensp;<i class="arrow up"></i></span><span onClick="fn04()" >&ensp;<i class="arrow down"></i></span><span id=${id43} onClick="fn05()">&ensp;<i class="close">x</i></span></div>`);
                        };
                        fn03 = function() {
                            li02 = event.srcElement.parentElement.parentElement;
                            li02.parentElement.insertBefore(li02, li02.previousElementSibling);
                        }
                        fn04 = function() {
                                li02 = event.srcElement.parentElement.parentElement;
                                li02.parentElement.insertBefore(li02.nextElementSibling, li02);
                            }
                            // &ensp;<span id=${id43} onClick="fn05(this.id)" class="close"><i>X</i></span> 
                        fn05 = function(id) {
                            li02 = event.srcElement.parentElement.parentElement;
                            li02.parentNode.removeChild(li02);
                            // if (id != null) {
                            //     console.log(id);
                            //     const result = mark.find(e => e._leaflet_id == id);
                            //     mymap.removeLayer(mark[mark.indexOf(result)]);
                            //     console.log(mark);
                            //     mark.splice(mark.indexOf(result), 1);
                            //     console.log(mark);
                            // }
                        }
                        fn06 = function(id, ld) {
                            let routesEl = document.getElementById("cafes02");
                            let routesEl01 = [...routesEl.getElementsByTagName("DIV")];
                            let l01 = routesEl01.find(element => element.id == id);
                            if (l01) {
                                l01.parentNode.removeChild(l01);
                            }
                            mymap.removeLayer(mark[ld]);
                            mark.splice(ld, 1);
                        }
                        let marker;
                        marker = new L.marker([item.lat, item.lon]);
                        marker._id = i;
                        let _markerOnClick = function(e) {
                            let itTag = item.tags.name;
                            let targetInnerHTML = e.target._popup._contentNode;
                            targetInnerHTML.innerHTML = "";
                            let id01 = e.target._leaflet_id;
                            let fil01 = mark.find(el => el._leaflet_id == id01);
                            let fil02 = mark.indexOf(fil01);
                            let html01 = `<button name="btn02"   onclick="fn06('${id01}','${fil02}')">Delete Marker</button><br><br><dt>${itTag}</dt><br><button name="btn03" onclick = "fn02('${amenity}', '${itTag}', '${item.lat}', '${item.lon}', '${id01}')" >Add to route</button>`;
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
                        // .bindLabel('A sweet static label!', { noHide: true });
                        // .bindTooltip(item.tags.name, {
                        //     permanent: true,
                        //     direction: 'bottom'
                        // })

                    }
                    assetLayer = L.layerGroup(mark).addTo(mymap);
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
        mark.splice(indexOfMark, 1);
    }
}

function myFunction1() {
    let dist = 0;
    let routes = [];
    let routesEl = document.getElementById("cafes02");
    let routesEl01 = [...routesEl.getElementsByTagName("DIV")];
    for (n = 0; n <= routesEl01.length - 1; n++) {
        routes.push({ latLng: { lat: routesEl01[n].attributes.lat.nodeValue, lng: routesEl01[n].attributes.lon.nodeValue } });
    }
    L.DomUtil.get('route-narrative').innerHTML = '';
    dir = MQ.routing.directions()
        .on('success', function(data) {
            let legs = data.route.legs,
                maneuvers01 = [],
                html = '',
                i;
            if (legs && legs.length) {
                for (i = 0; i < legs.length; i++) {
                    legs[i].maneuvers.forEach(element => maneuvers01.push(element));
                }
            }
            for (i = 0; i < maneuvers01.length; i++) {
                html += (i + 1) + '. ';
                html += maneuvers01[i].narrative + ' ';
                html += maneuvers01[i].distance * 1000 + 'm';
                html += '<br>';
                dist += maneuvers01[i].distance * 1000;
            }
            L.DomUtil.get('cafes03').innerHTML = 'Distance: ' + dist + 'm';
            L.DomUtil.get('route-narrative').insertAdjacentHTML('beforeend', html);
        });
    dir.route({
        locations: routes,
        options: {
            // routeType: 'bus'
            routeType: 'pedestrian'
        }
    });
    let items = ["red", "yellow", "blue", "black", "darkblue", "brown", "violet"];
    let k = items[Math.floor(Math.random() * items.length)];
    (MQ.routing.routeLayer({
        ribbonOptions: { draggable: false, ribbonDisplay: { color: k, opacity: 0.3 } },
        directions: dir,
        fitBounds: false
    })).addTo(cities);

    mymap.addLayer(cities);

}