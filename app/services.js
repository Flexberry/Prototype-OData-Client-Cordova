'use strict';

crudtableControllers.factory('dataService', function () {
    return {
        users: [
            {
            'id': 1,
            'name': 'Alex',
            'age': 25,
            'married': true
            },
            {
                'id': 2,
                'name': 'Jon',
                'age': 15,
                'married': false
            },
            {
                'id': 3,
                'name': 'Fred',
                'age': 40,
                'married': true
            }
            ]
    };
})