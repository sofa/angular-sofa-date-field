/**
 * angular-sofa-date-field - v0.1.0 - Tue Feb 24 2015 12:31:20 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
angular.module('sofa.dateField', [
    'sofa-date-field.tpl.html',
    'sofa.localeService'
]);

angular.module('sofa-date-field.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-date-field.tpl.html',
    '<div class="sofa-date-field">\n' +
    '    <label for="{{fieldName}}_day" ng-bind="dateFieldCtrl.ln.day" class="sofa-hidden"></label>\n' +
    '    <input type="text" id="{{fieldName}}_day" ng-model="innerModel.day"\n' +
    '           class="sofa-date-field--day" placeholder="{{dateFieldCtrl.ln.placeholder.day}}"\n' +
    '           sofa-name="fieldName + \'_day\'"\n' +
    '           ng-required="isRequired" ng-pattern="/(^0[1-9]$)|(^[12][0-9]$)|(^3[01])/gm" maxlength="2"/>\n' +
    '    <label for="{{fieldName}}_month" ng-bind="dateFieldCtrl.ln.month" class="sofa-hidden"></label>\n' +
    '    <input type="text" id="{{fieldName}}_month" ng-model="innerModel.month"\n' +
    '           class="sofa-date-field--month" placeholder="{{dateFieldCtrl.ln.placeholder.month}}"\n' +
    '           sofa-name="fieldName + \'_month\'"\n' +
    '           ng-required="isRequired" ng-pattern="/(^0[1-9]$)|(^1[0-2]$)/gm" maxlength="2" />\n' +
    '    <label for="{{fieldName}}_year" ng-bind="dateFieldCtrl.ln.year" class="sofa-hidden"></label>\n' +
    '    <input type="text" id="{{fieldName}}_year" ng-model="innerModel.year"\n' +
    '           class="sofa-date-field--year" placeholder="{{dateFieldCtrl.ln.placeholder.year}}"\n' +
    '           sofa-name="fieldName + \'_year\'"\n' +
    '           ng-required="isRequired" maxlength="4" />\n' +
    '</div>\n' +
    '');
}]);

angular.module('sofa.dateField')
    .controller('sofaDateFieldController', ['localeService', function sofaDateFieldController(localeService) {
        'use strict';
        this.ln = localeService.getTranslation('sofaDateField');
    }]);

angular.module('sofa.dateField')
    .directive('sofaDateField', ['sofaDateFieldService', function (sofaDateFieldService) {

        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                fieldName: '=',
                isRequired: '=',
                model: '=ngModel'
            },
            controller: 'sofaDateFieldController',
            controllerAs: 'dateFieldCtrl',
            bindToController: true,
            require: ['ngModel'],
            templateUrl: 'sofa-date-field.tpl.html',
            link: function (scope, element, attrs, controllers) {

                var modelController = controllers[0];
                // Give it a name so ngModelController can attach the date-field to a given formController
                modelController.$name = scope.fieldName;

                // Create a custom field validation of type "sofa-date"
                // TODO ng1.3: refactor to work with angular.js 1.3+
                modelController.$parsers.unshift(function (viewValue) {
                    if (sofaDateFieldService.getDatRegEx().test(viewValue)) {
                        modelController.$setValidity('sofaDate', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        modelController.$setValidity('sofaDate', false);
                        return undefined;
                    }
                });

                scope.innerModel = {
                    day: '',
                    month: '',
                    year: ''
                };

                scope.$watch('innerModel', function (newVal, oldVal) {
                    if (newVal && newVal !== oldVal) {
                       scope.model = sofaDateFieldService.getUpdatedModel(newVal);
                       sofaDateFieldService.updateModelController(modelController, newVal);
                    }
                }, true);

                scope.$watch('model', function (newVal) {
                    if (newVal && sofaDateFieldService.isSuitableModel(newVal)) {
                        scope.innerModel = sofaDateFieldService.splitModel(newVal);
                    }
                });
            }
        };
    }]);

angular.module('sofa.dateField')
    .factory('sofaDateFieldService', function sofaDateFieldService() {
        'use strict';

        // Matches a full-date string (e.g., "1980-11-27") as in http://tools.ietf.org/html/rfc3339#page-6
        var DATE_REGEXP = /^[1-9][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

        var self = this;

        self.getDatRegEx = function () {
            return DATE_REGEXP;
        };

        self.splitModel = function (model) {
            var segments = model.split('-');

            return {
                day: segments[2],
                month: segments[1],
                year: segments[0]
            };
        };

        self.isSuitableModel = function (model) {
            return model && model.match(DATE_REGEXP);
        };

        self.getDateString = function (model) {
            return model.year + '-' + model.month + '-' + model.day;
        };

        self.getUpdatedModel = function (newModel) {
            return self.getDateString(newModel);
        };

        self.updateModelController = function (controller, newModel) {
            controller.$setViewValue(self.getDateString(newModel));
        };

        return self;
    });
}(angular));
