angular.module('sofa.dateField')
    .controller('sofaDateFieldController', ['localeService', function sofaDateFieldController(localeService) {
        'use strict';
        this.ln = localeService.getTranslation('sofaDateField');
    }]);
