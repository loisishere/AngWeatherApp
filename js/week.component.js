(function(angular){
var app = angular.module('weather-app');
//the controller function
function weeklyWeatherCtrl($http,weatherService,locationService){
    console.log(weatherService.today);
    var self = this;
    
    self.weekly = [];
locationService.currentLocal().then(function(res){	weatherService.weeklyWeather(res.data.lon,res.data.lat,"forecast").then(function(data){
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