'use strict';

describe('sofa.dateFieldService', function () {

    var element, $compile, $rootScope, dateFieldService;

    beforeEach(module('sofa.dateField'));

    beforeEach(inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        dateFieldService = $injector.get('sofaDateFieldService');
    }));

    it('should pre defined', function () {

        element = $compile('<div><span sofa-template-code>Hello</span></div>')($rootScope);
        $rootScope.$digest();
    });
});
