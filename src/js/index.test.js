const TreeStore = require('./index.js');

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const res = new TreeStore(items);

describe('TreeStoreTests', () => {
    test('validateGetAll', () => {
        expect(res.getAll()).toEqual(items);
    });
    test('validateGetItem', () => {
        expect(res.getItem(2)).toEqual({ id: 2, parent: 1, type: 'test' });
    });
    test('validateGetChildren', () => {
        expect(res.getChildren(4)).toEqual([{ id: 7, parent: 4, type: null }, { id: 8, parent: 4, type: null }]);
    });
    test('validateGetAllChildren', () => {
        expect(res.getAllChildren(2)).toEqual([{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]);
    });
    test('validateGetAllParents', () => {
        expect(res.getAllParents(7)).toEqual([{"id":4,"parent":2,"type":"test"},{"id":2,"parent":1,"type":"test"},{"id":1,"parent":"root"}]);
    });
})

