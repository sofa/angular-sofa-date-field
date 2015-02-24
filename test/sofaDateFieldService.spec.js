'use strict';

describe('sofa.dateFieldService', function () {

    var dateFieldService;

    beforeEach(module('sofa.dateField'));

    beforeEach(inject(function ($injector) {
        dateFieldService = $injector.get('sofaDateFieldService');
    }));

    it('should be defined', function () {
        expect(dateFieldService).toBeDefined();
        expect(dateFieldService.getDatRegEx).toBeDefined();
    });

    it('should split a date by -', function () {
        var splitted = dateFieldService.splitModel('2015-12-28');
        expect(splitted.day).toEqual('28');
        expect(splitted.month).toEqual('12');
        expect(splitted.year).toEqual('2015');
    });

    it('should transform the internal date model to a string', function () {
        var model = {day: '15', month: '09', year: '2014'};
        expect(dateFieldService.getDateString(model)).toEqual('2014-09-15');
    });

    it('should determine if a string is a valid model', function () {
        var validModel ='2015-12-28',
            invalidModel = '28.12.2015';

        expect(dateFieldService.isSuitableModel(validModel)).toBeTruthy();
        expect(dateFieldService.isSuitableModel(invalidModel)).toBeFalsy();

    });

    it('should return a update model as a string', function () {
        var newModel = {day: '15', month: '09', year: '2014'};
        expect(dateFieldService.getUpdatedModel(newModel)).toEqual('2014-09-15');
    });

    it('should update the controller\'s viewValue', function() {
        var controller = {$setViewValue: function() {}},
            newModel = {day: '15', month: '09', year: '2014'};
        spyOn(controller, '$setViewValue');
        dateFieldService.updateModelController(controller, newModel);
        expect(controller.$setViewValue).toHaveBeenCalled();
    });
});
