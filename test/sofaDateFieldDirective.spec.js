'use strict';

describe('sofa.dateFieldDirective', function () {

    var element, $compile, $rootScope, localeService;

    beforeEach(module('sofa.dateField'));

    beforeEach(inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        localeService = $injector.get('localeService');
        localeService.setTranslationData({
            sofaDateField: {day: 'Tag', month: 'Monat', year: 'Jahr'}
        });
    }));

    it('should display the correct localised labels', function () {
        $rootScope.model = {};
        element = $compile('<sofa-date-field ng-model="model"></sofa-date-field>')($rootScope);
        $rootScope.$digest();
        var labels = element.find('label');
        expect(labels[0].innerText.trim()).toEqual('Tag');
        expect(labels[1].innerText.trim()).toEqual('Monat');
        expect(labels[2].innerText.trim()).toEqual('Jahr');
    });

    it('should produce a valid model', function () {
        $rootScope.model = {};
        element = $compile('<sofa-date-field ng-model="model"></sofa-date-field>')($rootScope);
        $rootScope.$digest();
        var inputs = element.find('input');
        angular.element(inputs[0]).val('20').triggerHandler('input');
        angular.element(inputs[1]).val('02').triggerHandler('input');
        angular.element(inputs[2]).val('2015').triggerHandler('input');
        $rootScope.$digest();
        expect($rootScope.model).toEqual('2015-02-20');
    });
});
