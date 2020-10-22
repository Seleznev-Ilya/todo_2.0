function Counter() {
    let count = 0;

    this.up = function () {
        return ++count;
    };
    this.down = function () {
        return --count;
    };
}

let counter = new Counter();

function enterToDO() {
    if (todoValue.value.trim() !== '') {

        changeArrowToDoShow();

        if (localStorage.getItem('store') !== null) {
            renderItems(setStoreValue());
        } else {
            renderItems(getStoreValue());
        }
    }
}

function changeArrowToDoShow() {
    arrow.style.opacity = '1';
    todo.classList.toggle('shadowDown');
}

function changeArrowToDoHide() {
    arrow.style.opacity = '0';
    todo.classList.toggle('shadowDown');
}

itemsWrapper.addEventListener('click', function (event) {
    let e = event.target;
    let target = e.parentNode.firstElementChild.id.slice(e.parentNode.firstElementChild.id.lastIndexOf('x') + 1);
    if (target.trim() !== '') {
        localStorage.setItem('store', JSON.stringify(changeChecked(target)));
    }
    // console.log(e);
    switchCheckbox(e);
    deleteItem(e);

});

function switchCheckbox(e) {
    try {
        let condition = e.parentNode.firstElementChild.nextElementSibling.children;
        console.log(e.parentNode);
        if (e.parentNode.className === "checkbox") {
            for (let key of condition) {
                key.classList.toggle('hide');
            }
        }
    } catch {}
}

function deleteItem(e) {
    if (e.parentNode.className === "card-cross") {
        if (deleteItemFromStore(Object.keys(e.parentNode.dataset)[0]).length < 1) {
            delete localStorage.store;
            itemsWrapper.innerHTML = '';
            changeArrowToDoHide();
        } else {
            localStorage.setItem('store', JSON.stringify(deleteItemFromStore(Object.keys(e.parentNode.dataset)[0])));
        }
        renderItems(JSON.parse(localStorage.getItem('store')));
    }
}