let url = 'https://www.overpass-api.de/api/interpreter?data=[out:json];node[amenity=restaurant](46.1138,-1.1630,46.1925,-1.1511);out meta;';

fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  //réussi 2