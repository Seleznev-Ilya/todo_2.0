function Counter() {
    let count = 0;

    this.up = function() {
        return ++count;
    };
    this.down = function() {
        return --count;
    };
}
let counter = new Counter();
// counter.up()
// counter.down()
let storeValue;

function enterToDO() {
    if (todoValue.value.trim() !== ''){
        storeValue = null;
        storeValue = getStoreValue().slice(0);
        changeArrowToDo();
        renderItems(storeValue);
    }
}
if (localStorage.getItem('store') !== null){

    storeValue = getStoreValue().slice(0);
    console.log(storeValue);
    // renderItems(storeValue);
}
function changeArrowToDo() {
    arrow.style.opacity = '1';
    arrow.style.cursor = 'pointer';
}

