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
    // mymap.flyTo([result1[0].lat, result1[0].lng], 14);
    mymap.setView([result1[0].lat, result1[0].lng], 13);
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
var routes = [];
var mark = [];
var cities = [];
var assetLayer;
function myFunction() {
    var bounds = mymap.getBounds();
    console.log(bounds);
    console.log(bounds._northEast.lat);
    // let url = 'https://www.overpass-api.de/api/interpreter?data=[out:json];node[amenity=restaurant](46.1138,-1.1630,46.1925,-1.1511);out meta;';
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
                    // console.log(data);
                    let el = data.elements;
                    // console.log(el);
                    el.forEach(sortFunc);
                    function sortFunc(item) {
                        var myIcon = L.icon({
                            iconUrl: 'https://img.icons8.com/clouds/100/000000/bar.png',
                            iconSize: [50, 50],
                            iconAnchor: [22, 94],
                            popupAnchor: [-3, -76],
                            // shadowUrl: 'my-icon-shadow.png',
                            // shadowSize: [68, 95],
                            // shadowAnchor: [22, 94]
                        });
                        console.log(item);
                        var pop = "<dd>" + item.tags.name + "</dd>" + "<dd>" + item.tags.phone + "</dd>";
                        mark.push(L.marker([item.lat, item.lon], { icon: myIcon }).bindPopup(pop));
                        var loc = [item.tags.name, item.lat, item.lon];
                        // console.log(loc);
                        routes.push(loc);
                        // console.log(routes);
                        // console.log(marker);
                        // L.DomUtil.get('cafes').append = pop;
                        var pop01 = item.tags.name + " " + item.tags.phone;
                        var pop02 = pop01;
                        var node = document.createElement("LI");
                        node.setAttribute("class", "foo");
                        var node01 = document.createElement("LI");
                        node01.setAttribute("class", "foo");
                        // Create a <li> node
                        // Create a <li> node
                        var textnode = document.createTextNode(pop01);
                        var textnode01 = document.createTextNode(pop02);         // Create a text node
                        // Create a text node
                        node.appendChild(textnode);
                        node01.appendChild(textnode01);
                        document.getElementById("cafes").appendChild(node01);     // Append <li> to <ul> with id="myList"
                        if (typeof item.tags.phone !== 'undefined') {
                            // the variable is defined
                            document.getElementById("cafes03").appendChild(node);     // Append <li> to <ul> with id="myList"
                        } else
                            document.getElementById("cafes02").appendChild(node);     // Append <li> to <ul> with id="myList"
                        // Append the text to <li>
                    }
                    var myNodelist = document.getElementsByTagName("LI");
                    var i;
                    for (i = 0; i < myNodelist.length; i++) {
                        const span = document.createElement("SPAN");
                        // var txt = document.createTextNode("\u00D7");
                        const txt = document.createTextNode(" x ");
                        /* <i class="arrow up"></i> */
                        const span01 = document.createElement("SPAN");
                        span.className = "close";
                        myNodelist[i].id = i;
                        span.appendChild(txt);
                        // myNodelist[i].appendChild(span);
                        const domString = `<span id=${i}><i class="arrow up"></i></span>`;
                        const domStringdown = `<span id=${i}><i class="arrow down"></i></span>`;
                        const close01 = `<span id=${i}><i class="close"> x </i></span>`;
                        const rightSpan = document.createElement("SPAN");
                        const rightArrow = `<span id=${i}><i class="arrow right"></i></span>`;
                        myNodelist[i].innerHTML += "   " + domString + " " + i + " " + domStringdown + " " + close01 + " " + rightArrow;
                    }
                    var close = document.getElementsByClassName("close");
                    var i;
                    for (i = 0; i < close.length; i++) {
                        close[i].onclick = function () {
                            const div = this.parentElement;
                            console.log(this.parentElement);
                            div.parentNode.removeChild(div);
                            // div.style.display = "none";
                        }
                    }
                    var x = document.getElementsByTagName("LI");
                    var f;
                    for (f = 0; f < x.length; f++) {
                        x[f].addEventListener("click", function () {
                            // console.log("li clicked");
                        });
                    }
                    assetLayer = L.layerGroup(mark).addTo(mymap);
                    console.log(mark);
                    // L.control.layers(null, mark).addTo(mymap);
                    // console.log(L.layerGroup);
                    // myFunction1(assetLayer);
                    console.log(assetLayer._leaflet_id);
                    console.log(assetLayer);
                    assetLayer.color = '#e85141';
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
function myFunction1() {
    function route01(i) {
        // console.log(routes);
        // console.log(routes[0][1]);

        // var marker = L.marker([51.5, -0.09]).addTo(mymap);
        // var marker1 = L.marker([51.5, -0.091]).addTo(mymap);
        var dir;
        // map = L.map('mapid', {
        //     layers: MQ.mapLayer(),
        // });
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
    for (i = 0; i < routes.length-1; i++) {

    route01(i);
    }
    // console.log(mark);
    // mymap.removeLayer(assetLayer);
    // assetLayer.clearLayers();
    // let list = document.getElementsByClassName("cafes23");     // Append <li> to <ul> with id="myList"
    // document.getElementById("cafes02").innerHTML = "";     // Append <li> to <ul> with id="myList"
    // document.getElementById("cafes03").innerHTML = "";     // Append <li> to <ul> with id="myList"
    // let i;
    // for (i = 0; i < list.length; i++) {
    //     while (list[i].hasChildNodes()) {
    //         list[i].removeChild(list[i].firstChild);
    //     }
    // }
    // var getel = document.querySelectorAll("#cafes, #cafes02, #cafes03");
    // var i;
    // for(i=0; i<getel.length; i++){
    // getel[i].innerHTML="";
    // }
    function arrows() {
        const listUl = document.getElementById('cafes');
        console.log(listUl);
        listUl.addEventListener("click", (event) => {
            let li = event.target;
            let f = li.parentElement.id;
            console.log(f);
            console.log(li.parentElement);
            console.log(listUl.children.length);
            // console.log(li.parentElement.id);
            // console.log(li.parentElement.childNodes);
            // console.log(listUl.childNodes[f]);
            li01 = listUl.childNodes[f];
            if (event.target.className === 'arrow up') {
                // console.log(listUl.childNodes[f]);
                // listUl.insertBefore(li01, listUl.firstChild);
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
                console.log(li01);
                for (i = 0; i < listUl.children.length; i++) {
                    listUl.children[i].children[0].id = i;
                    listUl.children[i].children[1].id = i;
                    listUl.children[i].children[2].id = i;
                }
                console.log(listUl);
            }
            if (event.target.className === 'arrow right') {
                var node = document.createElement("LI");
                document.getElementById("cafes02").appendChild(li01);     // Append <li> to <ul> with id="myList"
                for (i = 0; i < listUl.children.length; i++) {
                    listUl.children[i].children[0].id = i;
                    listUl.children[i].children[1].id = i;
                    listUl.children[i].children[2].id = i;
                }
                console.log(listUl);
                //    document.getElementById('cafes02').appendChild(li01);
            }
        });
    }
    arrows();
}
