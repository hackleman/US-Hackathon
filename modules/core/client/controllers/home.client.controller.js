'use strict';

angular.module('core').controller('HomeController', ['$scope', '$interval', 'Authentication', 'HackathonEvent',
  function ($scope, $interval, Authentication, HackathonEvent) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.init = function() {
      HackathonEvent.query({}, function(events) {
        $scope.events = events;
        $interval($scope.calcEventTime, 1000);
      });
    };

    $scope.calcEventTime = function() {
      var now = new Date();
      var timeLeft, timeTill;
      var days, hours, minutes, seconds;

      for (var i = 0; i < $scope.events.length; i++) {
        var startDate = new Date($scope.events[i].start);
        var endDate = new Date($scope.events[i].end);

        // Event has concluded
        if (endDate < now) {
          continue;
        }

        $scope.activeEvent = $scope.events[i];

        // Event is in progress
        if (startDate < now) {
          $scope.activeEvent.inProgress = true;
          timeLeft = parseInt((endDate - now) / 1000); // Time left in seconds
          hours = parseInt(timeLeft / (60*60));
          minutes = parseInt((timeLeft - hours * 60 * 60) / 60);
          seconds = timeLeft - hours * 60 * 60 - minutes * 60;
          $scope.activeEvent.timer = hours + ':' + minutes + ':' + seconds;
        } else {
          $scope.activeEvent.inProgress = false;
          timeTill = parseInt((startDate - now) / 1000); // Time till in seconds
          days = parseInt(timeTill / (24 * 60 * 60));
          hours = parseInt((timeTill - days * 24 * 60 * 60) / 60 / 60);
          minutes = parseInt((timeTill - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
          $scope.activeEvent.timer = days + ' days, ' + hours + ' hours, ' + minutes + ' minutes';
        }
        break;
      }
    };
  }
]);
