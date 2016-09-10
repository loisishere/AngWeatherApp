(function(angular){
var app = angular.module('weather-app');

//service to handle the GPS http request
app.service('weeklyLocationService',['$http',function($http){
	//need to get the current location of the user
this.currentLocal = function(){
	return $http.get('http://ip-api.com/json');
}
}]);

//service to handle the weather http request: 4c2158628fdf88ec
    //API
app.service('weeklyWeatherService',['$http',function($http){
	//need to get the current location of the user
this.weeklyWeather = function(lon, lat){
	return $http.get('http://api.wunderground.com/api/4c2158628fdf88ec/forecast/q/'+ lat +","+lon+".json");
}
}]);

//the controller function
function weeklyWeatherCtrl($http,weeklyWeatherService,weeklyLocationService){
    self.weekly = [];
weeklyLocationService.currentLocal().then(function(res){	weeklyWeatherService.weeklyWeather(res.data.lon,res.data.lat).then(function(data){
self.weekly = data.data.forecast.simpleforecast.forecastday;
console.log(self.weekly[1].date.day);
});
	//end of location promise
});
};

//component to handle the current weather
app.component('weeklyWeather',{
	templateUrl: './week.component.html',
	controller: weeklyWeatherCtrl,
	controllerAs: 'weekCtrl'
})
})(window.angular);