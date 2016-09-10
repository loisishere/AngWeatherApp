(function(angular){
var app = angular.module('weather-app');

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
this.currentWeather = function(lon, lat){
	return $http.get('http://api.wunderground.com/api/4c2158628fdf88ec/conditions/q/'+ lat +","+lon+".json");
}
}]);

//the controller function
function currentWeatherCtrl($http,weatherService,locationService){
	var self = this;
    self.location={};
    self.weather ={};
    self.today = new Date();
locationService.currentLocal().then(function(res){
	self.location = {"city":res.data.city, "state":res.data.region,"zip":res.data.zip,"country":res.data.conntryCode};
	weatherService.currentWeather(res.data.lon,res.data.lat).then(function(data){

        self.weather={
            "fahrenheit":{
                "temp":data.data.current_observation.temp_f,
            "feels":data.data.current_observation.feelslike_f
            },
            "celcius":{
                "temp":data.data.current_observation.temp_c,
            "feels":data.data.current_observation.feelslike_c
            },
            "weather":data.data.current_observation.weather,
            "icon": data.data.current_observation.icon_url
        }
//end of weather promise
});
	//end of location promise
});
};

//component to handle the current weather
app.component('currentWeather',{
	templateUrl: './current.component.html',
	controller: currentWeatherCtrl,
	controllerAs: 'currCtrl'
})
})(window.angular);