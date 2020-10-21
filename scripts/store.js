let todoValue = document.querySelector('#todo-input');
let arrow = document.querySelector('.todo-arrow');
let itemsWrapper = document.querySelector('.items-wrapper');

function getStoreValue() {
    if (localStorage.getItem('store') === null) {
        setStoreArr();
        return JSON.parse(localStorage.getItem('store'));
    } else {
        concatNewAndOldStoreArr();// run func (new  + ald ) *************** set apart of getStoreValue
        return JSON.parse(localStorage.getItem('store'));
    }
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

        function Item(value) { //todo: create new obj
            this.value = value;
            this.checked = false;
        }

        return new Item(getValueFromToDo());//value, id, condition item (def)
    }

    newArr.push(returnNewItem());  //todo: add obj into array
    //todo: concatenation here old and new
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
