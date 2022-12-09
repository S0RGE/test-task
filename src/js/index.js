class TreeStore {
    
    constructor(items) {
        this.items = items;
    }

    getAll() {
        return this.items;
    }

    getItem(id) {
        return this.items.find(item => item.id === id);
    }

    getChildren(id) {
        return this.items.filter(item => item.parent === id);
    }

    getArrayAllChildren(array) {
        const result = [];
        array.forEach(element => {
            const res = this.getChildren(element.id);
            result.push(...res);
        });

        return result;
    }

    getAllChildren(id) {
        const result = []
        let newItems = this.items.filter(item => item.id === id);

        while (this.getArrayAllChildren(newItems).length > 0) {
            const data = this.getArrayAllChildren(newItems);
            newItems = data;
            result.push(...data);
        }
        return result;
    }

    getAllParents(id){
        let item = this.getItem(id);
        const result = [];
        while(item.parent !== 'root'){
            item = this.getItem(item.parent);
            result.push(item);
        }
        return result;
    }
}

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
const ts = new TreeStore(items);

console.log(ts.getAll());
console.log(ts.getItem(2));
console.log(ts.getChildren(2));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));

module.exports = TreeStore