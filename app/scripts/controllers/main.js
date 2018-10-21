'use strict';

/**
 * @ngdoc function
 * @name userDetailsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the userDetailsApp
 */
 angular.module('userDetailsApp')
 .controller('MainCtrl', function ($scope, $http) {
 	this.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	$scope.replyBtnClicked = [];

	$scope.replyBtn=function($index) {
        $scope.replyBtnClicked[$index]=true;
    };

 	$scope.done = function done () {
 		$scope.replyBtnClicked = [];
 		$scope.resComments	= [];
 		let userName = document.getElementById('name').value;
 		let cmtName = document.getElementById('cmtName').value;

 		$http({
 			method: 'POST',
 			url: 'http://localhost:8000/user',
 			data: { 
 				name: userName,
 				date : new Date(),
 				cmtName : cmtName
 			}
 		}).then(function successCallback(response) {
 			$scope.userText = response.data.message;

 			$http({
 				method: 'GET',
 				url: 'http://localhost:8000/user'
 			}).then(function successCallback(response) {
 				console.log(response.data.message);
 				$scope.resultArray = response.data.message;
 			}, function errorCallback() {    
 				console.log('Failure');
 			});
 		}, function errorCallback() {    
 			console.log('Failure');
 		});

 		let city = document.getElementById('city').value;
 		if(city) {

 			// Fetching location (latitude, longitude)
 			var geocoder =  new google.maps.Geocoder();
 			geocoder.geocode( { 'address': city}, function(results, status) {
 				if (status === google.maps.GeocoderStatus.OK) {
 					console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng()); 
 					$scope.cityName = city;
 					$scope.latlng = `${results[0].geometry.location.lat().toFixed(3)} , ${results[0].geometry.location.lng().toFixed(3)}`;
 				 	$scope.error = "";
 				 			// Fetching current temperature 
 				 			let apiKey = 'd98bc0c2daad0e5dea24bbb5948456de';
 				 			$http({
 				 				method: 'GET',
 				 				url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
 				 			}).then(function successCallback(response) {
 				 				console.log(response.data.main.temp);
 								let temperature = response.data.main.temp; // temp in Kelvin
 								// convert to Celsius
 								$scope.temperature = (temperature-273).toFixed(1) + ' Celsius';
 								}, function errorCallback() {    
 									console.log('Failure');
 								});
 				 } else {
 				 	console.log("Something got wrong " + status);
 				 	$scope.error = "City not found. Please try again";
 				 	$scope.cityName = "";
 				 	$scope.latlng = "";
 				 	$scope.temperature = "";
 				 }
 			});

 		}
 	};
 });
