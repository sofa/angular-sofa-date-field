'use strict';

describe('sofa.dateFieldController', function () {

    var controller, localeService;

    beforeEach(module('sofa.dateField'));

    beforeEach(inject(function ($controller, $injector) {
        localeService = $injector.get('localeService');
        localeService.setTranslationData({
            sofaDateField: {test: 'hello world'}
        });
        controller = $controller('sofaDateFieldController');
    }));

    it('should get the correct translation', function() {
        expect(controller.ln.test).toEqual('hello world');
    });
});
