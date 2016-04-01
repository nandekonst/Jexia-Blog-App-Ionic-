var App = angular.module("BlogFeed", ["ionic"]);

App.controller("AppCtrl", ["$scope","getData", "$log", AppCtrl]);
App.service("getData", ["$http", "$log", getData]);


function AppCtrl($scope, getData, $log){
	$scope.posts =[];

	$scope.refresh = function(){
		getData.getBlog($scope);
	}


}

function getData($http, $log){
	
	this.getBlog = function($scope){
		
		var JexiaClient = window.jexiaClientBrowser.JexiaClient;

		var client = new JexiaClient({
			appId: '97bf9520-e9d1-11e5-9c1d-337c49e0a8d3',
			appKey: '4520c79f162cdaa8bc2f8367d7dbffec',
			appSecret: '7acf5d40cfd3ebd30e7323b4185c950284f15dd4ec7c163b'
			}).then( function(app) {
			// you can start interacting with your app
			var posts = app.dataset('posts');
			
			posts.list().then(function(posts){
			
					//posts array
					console.log(JSON.stringify(posts));
					$scope.posts = posts;
			});
			
			posts.subscribe("*", function(message) {
			// Realtime!
			console.log(message);
			})
			
			$scope.$broadcast("scroll.refreshComplete");
			
			
			
		});
		
		
		
		
		
		
	
	
	};
	
	
	
}