/**
 * Created by suraj on 28/7/16.
 */
DEBUG = true;
var app = angular.module("tib", ['ngCookies', 'ui.router']);
app.controller('terminal', ['$scope', function ($scope) {
    $scope.promptText = "terminal@browser:~$";
    $scope.command = "";
    $scope.commandRight = "";

    $scope.history = [];
    $scope.allCommands = [{
        command: "help",
        description: "shows list of all commands and their usage"
    },
        {}];
    var k;
    $('.terminal-body').click(function (e) {
        e.stopPropagation();
        $scope.terminalActive = true;
        $scope.$apply();
    });

    $('body').click(function (e) {
        e.stopPropagation();
        $scope.terminalActive = false;
        $scope.$apply();
    });

    $(document).keyup(function (e) {
        DEBUG && console.log(e.keyCode + " " + e.key);
        DEBUG && console.log($scope.terminalActive);
        if ($scope.terminalActive) {
            k = e.keyCode;
            switch (true) {
                case (k == 8) :
                {
                    $scope.command = $scope.command.slice(0, -1);
                    $scope.$apply();
                    break;
                }
                case (k == 46):
                {
                    if ($scope.commandRight != "") {
                        $scope.commandRight = $scope.commandRight.slice(1, $scope.commandRight.length);
                        $scope.$apply();
                    }
                    break;
                }
                case (k == 13) :
                {
                    $scope.executeCommand();
                    break;
                }
                case (k == 32):
                {
                    $scope.command += " ";
                    $scope.$apply();
                    break;
                }
                case ((k >= 65 && k <= 90) || (k >= 48 && k <= 57) || (k >= 96 && k <= 105)):
                {
                    $scope.command += e.key;
                    $scope.$apply();
                    break;
                }
                case (k == 37):
                {
                    if ($scope.command != "") {
                        $scope.commandRight = $scope.command[$scope.command.length - 1] + $scope.commandRight;
                        $scope.command = $scope.command.slice(0, -1);
                        $scope.$apply();
                    }
                    break;
                }
                case (k == 39):
                {
                    if ($scope.commandRight != "") {
                        $scope.command = $scope.command + $scope.commandRight[0];
                        $scope.commandRight = $scope.commandRight.slice(1, $scope.commandRight.length);
                        $scope.$apply();
                    }
                    break;
                }
                default:
                {
                    break;
                }
            }
        }
    });

    $scope.executeCommand = function () {
        DEBUG && console.log($scope.command);
    }

}]);