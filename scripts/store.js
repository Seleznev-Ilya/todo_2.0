let todoValue = document.querySelector('#todo-input');
let arrow = document.querySelector('.todo-arrow');
let main = document.querySelector('.main');
let itemsWrapper = document.querySelector('.items-wrapper');
let todo = document.querySelector('.todo');
let filters = document.querySelector('.filters');
let clear = document.querySelector('.clear');
let numItems = document.querySelector('.numItems');



function getStoreValue() { //get and add first new one item
    setStoreArr();
    return JSON.parse(localStorage.getItem('store'));
}

function setStoreValue() { // set and get new store
    concatNewAndOldStoreArr();// run func (new  + ald ) *************** set apart of getStoreValue
    return JSON.parse(localStorage.getItem('store'));
}


function setStoreArr() { //set array in localStore
    let arrayStoreList = JSON.stringify(createArrWithNewItem(false));
    localStorage.setItem('store', arrayStoreList);  //log to store
}

function concatNewAndOldStoreArr() { //concatenation Old array from localStore with new item
    let arrayStoreList = JSON.stringify(createArrWithNewItem(true));
    localStorage.setItem('store', arrayStoreList);  //log to store
}


function createArrWithNewItem(state) {// create new array or concat (new + ald ) depending on STATE then return array store
    let newArr = [];

    function returnNewItem() {

        function Item(value) { // create new obj
            // this.id = new Date().getTime();
            this.value = value;
            this.checked = false;
        }

        return new Item(getValueFromToDo());//value, id, condition item (def)
    }

    newArr.push(returnNewItem());  //add obj into array
    // concatenation here old and new
    if (state) {
        let arrStore = JSON.parse(localStorage.getItem('store'));
        return arrStore.concat(newArr);
    } else {
        return newArr;
    }
}

function getValueFromToDo() {
    let valueToDo = todoValue.value.trim();
    todoValue.value = '';
    return valueToDo;
}

// CHANGE STORE by interface


function changeChecked(state) {
    let store = JSON.parse(localStorage.getItem('store'));
    if (store[state - 1].checked === true) {
        store[state - 1].checked = false;
    } else {
        store[state - 1].checked = true;
    }
    return store;
}

function deleteItemFromStore(state) {
    let store = JSON.parse(localStorage.getItem('store'));
    store.splice(state - 1, 1);
    return store;
}

function editItem(state, value) {
    let store = JSON.parse(localStorage.getItem('store'));
    console.log(state, value);
    if (value.trim() !== '') {
        store[state - 1].value = value;
        return store;
    } else {
        return deleteItemFromStore(state);
    }
}

function selectAllItems() {
    let store = JSON.parse(localStorage.getItem('store'));
    let boolean = store.find(item => item.checked === false);
    if (boolean) {
        store.forEach((item) => {
            if (item.checked === false){
                item.checked = true;
            }
        })
    } else {
        store.forEach((item) => {
            if (item.checked === true){
                item.checked = false;
            }
        })
    }

    return store;
}
function numberItemsShow(){
    numItems.innerText = searchNumberOfItems(false);
}
function clearAllCompleted(){
    return searchNumberOfItems(true)
}
function searchNumberOfItems(state){
    let store = JSON.parse(localStorage.getItem('store'));
    if (state){
        let boolean = store.filter(item => item.checked === false);
        return boolean;
    } else {
        try {
            let boolean = store.filter(item => item.checked === false);
            return boolean.length;
        } catch {

        }
    }


}

