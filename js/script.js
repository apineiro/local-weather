var tempFah;
var tempCel;

 $(document).ready(function() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       loadWeather(position.coords.latitude + ',' + position.coords.longitude);
     });
   }
   $("#tempunit").click(function () {
     var currentTempUnit = $("#tempunit").text();
     var newTempUnit = currentTempUnit == "C" ? "F" : "C";
     $("#tempunit").text(newTempUnit);
     if (newTempUnit == "F") {
       $("#temp").text(tempFah + " " + String.fromCharCode(176));
     } else {
       tempCel = Math.round(parseInt(tempFah - 32) / 1.8);
       $("#temp").text(tempCel + " " + String.fromCharCode(176));
     }
   });

 });

 function loadWeather(location, woeid) {
 $.simpleWeather({
   location: location,
   woeid: woeid,
   unit: 'f',
   success: function(weather) {
     $("#city").text(weather.city + ", ");
     $("#region").text(weather.region);
     $("#temp").text(weather.temp + " " + String.fromCharCode(176));
     $("#tempunit").text(weather.units.temp);
     $("#current").text(weather.currently);
     var weatherIcon = '<i class="icon-' + weather.code + '"></i> ';
     $("#icon-info").html(weatherIcon);
     tempFah = weather.temp;
   },
   error: function(error) {
     $(".weather-info").html('<p>' + error + '</p>');
   }
 });
}
