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


function enterToDO() {
    if (getValueFromToDo().trim() !== ''){
        getStoreValue();
        chengArrowToDo();
        renderItems();
    }


}

function chengArrowToDo() {
    arrow.style.opacity = 1;
    arrow.style.cursor = 'pointer';
}

