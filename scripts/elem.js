let todoValue = document.querySelector('#todo-input');
let arrow = document.querySelector('.todo-arrow');
let main = document.querySelector('.main');
let itemsWrapper = document.querySelector('.items-wrapper');
let todo = document.querySelector('.todo');
let filters = document.querySelector('.filters');
let clear = document.querySelector('.clear');
let numItems = document.querySelector('.numItems');
let subFilters = document.querySelector('.subFilters');

/*// EventEmmiter JS***

// const store = new Store()
// const item = new Item({
//     id, value, checked
// })
//
// const newArr = [item]
//
// store.addItem(key, newArr)*/

class Store {
    constructor(getStore = []) {
        this.arrStore = getStore;
        this.arrItem = [];
    }

    sync(key = false) {
        if (!key) {
            if (localStorage.getItem(Store.local) !== null) {
                this.arrStore = JSON.parse(localStorage.getItem(Store.local));
            }
        } else {
            if (this.arrStore.length !== 0) {
                localStorage.setItem(Store.local, JSON.stringify(this.arrStore));
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
        try {
            for (let keyIn of this.arrStore) {
                if (keyIn.id === +key) {

                    keyIn.value = itemValue;
                    if (keyIn.value === '') {
                        this.clearItem(key);
                    }
                }
            }

        } catch {
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
        console.log(+key);

        for (let keyIn in this.arrStore) {
            if (this.arrStore[keyIn].id === +key) {
                this.arrStore.splice(keyIn, 1);
                if (this.arrStore.length === 0) {
                    this.clearAll();
                }
            }
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
        let isAnyCheckFalse = this.arrStore.find(item => item.checkBox === false);
        let condition = arrow.children;

        if (isAnyCheckFalse) {
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
        for (let keyIn of this.arrStore) {
            if (keyIn.id === +key) {
                keyIn.checkBox = keyIn.checkBox !== true;
            }
        }
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

Store.local = 'store';

class Filter {
    constructor(getStore = 'all') {
        this._state = getStore;
    }

    sync(isState = true) {

        if (localStorage.getItem(Filter.local) !== null) {

            if (isState) {
                this._state = JSON.parse(localStorage.getItem(Filter.local));
            } else {
                localStorage.setItem(Filter.local, JSON.stringify(this._state));
            }

        } else {
            localStorage.setItem(Filter.local, JSON.stringify(this._state));
        }

    }

    set state(param) {
        this._state = param;
        filter.sync(false);
    };

    get state() {
        return this._state;
    };
}

Filter.local = 'filter';

class Item {
    constructor(value = getValueFromToDo()) {
        this.id = new Date().getTime();
        this.value = value;
        this.checkBox = false;
    }
}

let store = new Store();
store.sync();

let filter = new Filter();
filter.sync();

class EventEmitter {
    constructor() {
        this.events = {};
    }

    emit(eventName, data) {
        const event = this.events[eventName];
        if (event) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }

    on(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        }
    }
}

let emitter = new EventEmitter();

function getValueFromToDo() {
    let valueToDo = todoValue.value.trim();
    todoValue.value = '';
    return valueToDo;
}





