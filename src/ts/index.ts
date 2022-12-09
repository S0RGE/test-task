export {}

type ID = number | string;

interface vertex {
    id: ID;
    parent: ID;
    type?: string | null;
}

interface ITreeStore {
    items: Array<vertex>,
    getAll(): Array<vertex> | [],
    getItem(id: ID): vertex | undefined,
    getChildren(id: ID): Array<vertex> | [],
    getAllChildren(id: ID): Array<vertex>,
    getAllParents(id: ID): Array<vertex>
}

class TreeStore implements ITreeStore {
    items: Array<vertex>;
    constructor(items: Array<vertex>) {
        this.items = items;
    }

    getAll(): Array<vertex> {
        return this.items;
    }

    getItem(id: ID): vertex | undefined {
        return this.items.find(item => item.id === id);
    }

    getChildren(id: ID): Array<vertex> | [] {
        return this.items.filter(item => item.parent === id);
    }

    getArrayAllChildren(array: Array<vertex>) : Array<vertex> {
        let result: Array<vertex> = [];
        array.forEach(element => {
            const res: Array<vertex> = this.getChildren(element.id);
            result.push(...res);
        });

        return result;
    }

    getAllChildren(id: ID): Array<vertex> {
        const result: Array<vertex> = []
        let newItems = this.items.filter(item => item.id === id);

        while (this.getArrayAllChildren(newItems).length > 0) {
            const data = this.getArrayAllChildren(newItems);
            newItems = data;
            result.push(...data);
        }
        return result;
    }

    getAllParents(id: ID): Array<vertex> {
        let item= this.getItem(id);
        const result: Array<vertex> = [];
        if(item === undefined) return [];
        while (item.parent !== 'root') {
            item = this.getItem(item.parent);
            if(item === undefined) break;
            result.push(item);
        }
        return result;
    }
}

const items: Array<vertex> = [
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