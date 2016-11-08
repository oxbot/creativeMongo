angular.module('app', [])

.controller('questions', [
	'$scope', '$http',
	 function($scope, $http) {
		$scope.questions = ["a question",
				"another questions",
				"final questions"
			];
		$scope.create = function(question) {
			return $http.post('/question', question).success(function(data){
				$scope.questions.push(data);
			});
		};
		$scope.addQuestion = function() {
			$scope.create({message:$scope.formContent});
			$scope.formContent = '';
		};
		$scope.getAll = function() {
			return $http.get('/questions').success(function(data) {
				angular.copy(data, $scope.questions);
			});
		};
		$scope.getAll();

		$scope.addAnswer = function(id, answer) {
			console.log(answer + "here")
			return $http.put('/answer/' + id, answer).success(function(data) {
				//need to replace the question with the updated question in questions array
				console.log(data);
			});
		};
		$scope.answer = function(id) {
			console.log(id);
			//did this because ng-model wasn't working out for me
			console.log(document.getElementById(id).value);
			$scope.addAnswer(id,{info: document.getElementById(id).value});
			document.getElementById(id).value = "";
		};
	}]);
