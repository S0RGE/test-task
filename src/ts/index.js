"use strict";
exports.__esModule = true;
var TreeStore = /** @class */ (function () {
    function TreeStore(items) {
        this.items = items;
    }
    TreeStore.prototype.getAll = function () {
        return this.items;
    };
    TreeStore.prototype.getItem = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    TreeStore.prototype.getChildren = function (id) {
        return this.items.filter(function (item) { return item.parent === id; });
    };
    TreeStore.prototype.getArrayAllChildren = function (array) {
        var _this = this;
        var result = [];
        array.forEach(function (element) {
            var res = _this.getChildren(element.id);
            result.push.apply(result, res);
        });
        return result;
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var result = [];
        var newItems = this.items.filter(function (item) { return item.id === id; });
        while (this.getArrayAllChildren(newItems).length > 0) {
            var data = this.getArrayAllChildren(newItems);
            newItems = data;
            result.push.apply(result, data);
        }
        return result;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var item = this.getItem(id);
        var result = [];
        if (item === undefined)
            return [];
        while (item.parent !== 'root') {
            item = this.getItem(item.parent);
            if (item === undefined)
                break;
            result.push(item);
        }
        return result;
    };
    return TreeStore;
}());
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
//const ts: TreeStore = new TreeStore(items);
// console.log(ts.getAll());
// console.log(ts.getItem(2));
// console.log(ts.getChildren(2));
// console.log(ts.getAllChildren(2));
// console.log(ts.getAllParents(7));
