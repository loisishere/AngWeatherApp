(function(){
var app = angular.module('weather-app',[]);
    
    //service to handle the GPS http request
app.service('locationService',['$http',function($http){
	//need to get the current location of the user
this.currentLocal = function(){
	return $http.get('http://ip-api.com/json');
}
}]);

//service to handle the weather http request: 4c2158628fdf88ec
    //API
app.service('weatherService',['$http',function($http){
	//need to get the current location of the user
this.weeklyWeather = function(lon, lat,service){
	return $http.get('http://api.wunderground.com/api/4c2158628fdf88ec/'+service+'/q/'+ lat +","+lon+".json");
}
}]);
    
//end of IIFE
})(window.angular);
