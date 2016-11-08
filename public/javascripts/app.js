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
				$scope[data._id] = ""
			});
		};
		$scope.addQuestion = function() {
			$scope.create({message:$scope.formContent});
			$scope.formContent = '';
		};
		$scope.getAll = function() {
			return $http.get('/questions').success(function(data) {
				angular.copy(data, $scope.questions);
				for (question in $scope.questions) {
					$scope[question._id] = "";
				};
			});
		};
		$scope.getAll();

		$scope.addAnswer = function(id, answer) {
			return $http.put('/answer/' + id, answer).success(function(data) {
				//need to replace the question with the updated question in questions array
				console.log("after adding answer: " + data);
			});
		};
		$scope.answer = function(id) {
			console.log(id);
			console.log($scope[id]);
			$scope.addAnswer(id,$scope[id]);
			$scope.answerContent = '';
		};
	}]);
