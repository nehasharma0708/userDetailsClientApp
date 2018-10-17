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
 	 	$http({
 			method: 'POST',
 			url: 'http://localhost:8000/user',
 			data: { 
 				name: userName
 			},
 			headers: {
 				'Content-Type': 'application/json'
 			}
 		}).then(function successCallback(response) {
 			console.log('success');
 			$scope.usernameText = response.data.message;
 		}, function errorCallback() {    
 			console.log('Failure');
 		});
 	};
 });
