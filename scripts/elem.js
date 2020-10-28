let todoValue = document.querySelector('#todo-input');
let arrow = document.querySelector('.todo-arrow');
let main = document.querySelector('.main');
let itemsWrapper = document.querySelector('.items-wrapper');
let todo = document.querySelector('.todo');
let filters = document.querySelector('.filters');
let clear = document.querySelector('.clear');
let numItems = document.querySelector('.numItems');
let subFilters = document.querySelector('.subFilters');
// EventEmmiter JS***

// const store = new Store()
// const item = new Item({
//     id, value, checked
// })
//
// const newArr = [item]
//
// store.addItem(key, newArr)

class Store {
    constructor(getStore = []) {
        this.arrStore = getStore;
        this.arrItem = [];
    }

    sync(key = false) {
        if (!key) {
            if (localStorage.getItem('store') !== null) {
                this.arrStore = JSON.parse(localStorage.getItem('store'));
            }
        } else {
            if (this.arrStore.length !== 0) {
                localStorage.setItem('store', JSON.stringify(this.arrStore));
            } else {
                delete localStorage.store;
            }
        }
    }

    getNumberItemsToDo() {
        this.sync();
        return this.arrStore.filter(item => item.checkBox === false).length;
    }

    editedItem(key, itemValue) {
        this.sync();
        this.arrStore[key - 1].value = itemValue;
        if (this.arrStore[key - 1].value === '') {
            this.clearItem(key);
        }
        this.sync(true);
    }


    addItem() {
        this.sync();
        this.arrStore = this.arrStore.concat(this.arrItem);
        this.sync(true);
    }

    clearAll() {
        this.arrStore.length = 0;
        this.sync(true);
    }

    clearItem(key) {
        this.sync();
        this.arrStore.splice(key - 1, 1);
        if (this.arrStore.length === 0) {
            this.clearAll();
        }
        this.sync(true);
    }

    clearSelected() {
        this.sync();
        this.arrStore = this.arrStore.filter(item => item.checkBox === false);
        this.sync(true);
    }

    selectAllCheckbox() {
        this.sync();
        let boolean = this.arrStore.find(item => item.checkBox === false);
        let condition = arrow.children;


        if (boolean) {
            this.arrStore.forEach((item) => {
                if (item.checkBox === false) {
                    item.checkBox = true;
                }
            });

            for (let key of condition) {
                key.classList.toggle('hide');
            }


        } else {
            this.arrStore.forEach((item) => {
                if (item.checkBox === true) {
                    item.checkBox = false;
                }
            });

            for (let key of condition) {
                key.classList.toggle('hide');
            }


        }

        this.sync(true);
    }

    switchItemCheckbox(key) {
        this.sync();
        this.arrStore[key].checkBox = this.arrStore[key].checkBox !== true;
        this.sync(true);
    }

    set storeValue(param) {
        this.arrItem = [param];
        this.addItem();
    };

    get storeValue() {
        return this.arrStore;
    };
}

class Item {
    constructor(value = getValueFromToDo()) {
        this.id = new Date().getTime();
        this.value = value;
        this.checkBox = false;
    }
}

let store = new Store();
store.sync();

function getValueFromToDo() {
    let valueToDo = todoValue.value.trim();
    todoValue.value = '';
    return valueToDo;
}





