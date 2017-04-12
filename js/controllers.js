var app = angular.module('ssisapp.controllers', [])

app.controller('MenuCtrl', function($scope, MenuList, $translate) {	
	$scope.$on('user:updated', function(event,data) {
            $scope.datalogin = JSON.parse(window.localStorage.getItem('ssisapp-au'));
        });
	$scope.datalogin = JSON.parse(window.localStorage.getItem('ssisapp-au'));
	$scope.newEmail = { userEmail: '' };
	$scope.showLogin = function () {
		$state.go("app.auth");
	}
	$scope.setEmail = function () {
		$scope.datalogin.userEmail = $scope.newEmail.userEmail;
	}
	$scope.mainmenu = MenuList.getAllMenu();

	// Active INK Effect
	//ionic.material.ink.displayEffect();
})
app.controller('DashListCtrl', function($scope, $stateParams, $timeout, MenuList, $translate) {
	$scope.data = MenuList.getMenuById($stateParams.id);

    // setTimeout(function() {
    //     ionic.material.motion.ripple();
    // }, 500);

    // Active INK Effect
    //ionic.material.ink.displayEffect();
})
app.controller('FeedbackCtrl', function($scope, $ionicPopup, $translate) {
    $scope.feedback = function(feedbackOption) {
        $scope.feedbackdata = {};

        // An elaborate, custom popup
        var feedbackPopup = $ionicPopup.show({
            template: '<textarea autocomplete="off" class="form-control" rows="5" required placeholder="" ng-model="feedbackdata.content"></textarea>',
            title: feedbackOption,
            subTitle: 'Content',
            scope: $scope,
            buttons: [{
                text: 'Cancel'
            }, {
                text: '<b>Send</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.feedbackdata.content) {
                        e.preventDefault();
                    } else {
                        return $scope.feedbackdata.content;
                    }
                }
            }]
        });

        feedbackPopup.then(function(res) {
            console.log(feedbackOption, res);
        });
    }

    // Active INK Effect
    //ionic.material.ink.displayEffect();
})
;