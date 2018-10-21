'use strict';

/**
 * @ngdoc function
 * @name userDetailsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the userDetailsApp
 */
 angular.module('userDetailsApp')
 .controller('CommentCtrl', function ($scope, $http) {
 	$scope.commentsArray = [];
 	$scope.newComments = [];
 	var arePreviousCommentsPresent = true;
 	$scope.btn_add = function ($index) {

 		if($scope.resultArray[$index].resComments !== undefined && arePreviousCommentsPresent === true) {
 			arePreviousCommentsPresent = false;
 			for (var i = 0; i < $scope.resultArray[$index].resComments.length; i++) {
 				$scope.commentsArray.push({
 					comment : $scope.resultArray[$index].resComments[i].comment,
 					commentUser : $scope.resultArray[$index].resComments[i].commentUser, 
 					newDate : $scope.resultArray[$index].resComments[i].newDate,
 				}) ;
 			}
 		}
 		if ($scope.txtcomment2) {
 			if($scope.resultArray[$index].resComments === undefined) {
 				$scope.newComments.push({
 					comment : $scope.txtcomment2,
 					commentUser : $scope.name, 
 					newDate : new Date()
 				});
 			} else {
 				$scope.commentsArray.push({
 					comment : $scope.txtcomment2,
 					commentUser : $scope.name, 
 					newDate : new Date()
 				});
 			}	
 			$http({
 				method: 'PUT',
 				url: 'http://localhost:8000/user',
 				data: { 
 					name: $scope.resultArray[$index].username,
 					cmtName : $scope.resultArray[$index].cmtName,
 					date : $scope.resultArray[$index].date,
 					resComments : ($scope.resultArray[$index].resComments === undefined) ? $scope.newComments : $scope.commentsArray
 				}
 			}).then(function successCallback(response) {
 				console.log("response.data.resComments", response.data.resComments);
 				$scope.txtcomment2 = "";
 				$scope.comments = [];
 				var temp = [];
 				if($scope.resultArray[$index].resComments === undefined) {
 					temp = response.data.resComments;
 				} else {
 				//if (response.data.resComments)
 				for( var i=response.data.resComments.length - 1; i>=0; i--){
 					for( var j=0; j<$scope.resultArray[$index].resComments.length; j++){
 	    				if(response.data.resComments[i] && (response.data.resComments[i].comment === $scope.resultArray[$index].resComments[j].comment)){
    						response.data.resComments.splice(i, 1);
    					}	
    				}
				}
				temp = response.data.resComments;
 			}
 			for (var k = 0; k < temp.length; k++) {
 				$scope.comments.push({
 					comment : temp[k].comment,
 					commentUser : temp[k].commentUser, 
 					newDate : temp[k].newDate,
 				}) ;
 			}
 			console.log("$scope.comments", $scope.comments);
 		}, function errorCallback() {    
 			console.log('Failure');
 			$scope.txtcomment2 = "";

 		});
 		} 

 	};
 });
