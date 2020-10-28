// EventEmmiter JS***

// const store = new Store()
// const item = new Item({
//     id, value, checked
// })
//
// const newArr = [item]
//
// store.addItem(key, newArr)

// class Store {
//     constructor(param) {
//         this.arr = [];
//     }
//
//     testClass(){
//         let arr = this.arr;
//         arr.push(param);
//         console.log(arr);
//         return arr;
//     }
// }
//
//
// class Item {
//     constructor(param) {
//         this.id = param.id;
//         this.value = param.value;
//         this.checkBox = param.checkBox;
//     }
//
//     static createArrWithNewItem(state) {
//         let newArr = [];
//         let newItem =  new this({
//             id: new Date().getTime(),
//             value: getValueFromToDo(), // todo get input's value
//             checkBox: false,
//         });
//         newArr.push(newItem);
//         if (state) {
//             let arrStore = JSON.parse(localStorage.getItem('store'));
//             return arrStore.concat(newArr);
//         } else {
//             return newArr;
//         }
//     }
//
// }
//
//
// function setStoreArr() { //set array in localStore
//     let arrayStoreList = JSON.stringify( Item.createArrWithNewItem(false));
//     localStorage.setItem('store', arrayStoreList);  //log to store
// }
//
// function concatNewAndOldStoreArr() { //concatenation Old array from localStore with new item
//     let arrayStoreList = JSON.stringify( Item.createArrWithNewItem(true));
//     localStorage.setItem('store', arrayStoreList);  //log to store
// }
//
// // let store = new Store( Item.createArrWithNewItem(true));
// console.log(Item.createArrWithNewItem(false));