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

 	$scope.done = function done () {
 		let userName = document.getElementById('name').value;
 		let email = document.getElementById('email').value;
 		let phone = document.getElementById('phone').value;

 		$http({
 			method: 'POST',
 			url: 'http://localhost:8000/user',
 			data: { 
 				name: userName,
 				email: email,
 				phone: phone
 			}
 		}).then(function successCallback(response) {
 			$scope.usernameText = response.data.message;
 			$http({
 				method: 'GET',
 				url: 'http://localhost:8000/user'
 			}).then(function successCallback(response) {
 				console.log(response.data.message);
 				$scope.result = response.data.message;
 			}, function errorCallback() {    
 				console.log('Failure');
 			});
 		}, function errorCallback() {    
 			console.log('Failure');
 		});
 		
 	};
 });
