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
    switchCheckbox(e);
    deleteItem(e);
});

function switchCheckbox(e) {
    try {
        let condition = e.parentNode.firstElementChild.nextElementSibling.children;
        if (e.parentNode.className === "checkbox") {
            for (let key of condition) {
                key.classList.toggle('hide');
            }
        }
    } catch {
    }
    numberItemsShow();
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

itemsWrapper.addEventListener('dblclick', function (event) {
    let e = event.target;
    if (e.className === 'card-p') {
        swapCardToInput(e);
    }
});

function swapCardToInput(e) {
    let inputItem = document.querySelector(`.${Object.keys(e.dataset)[0]}`);
    let card = document.getElementById(`${e.id}`);

    inputItem.classList.toggle('hide');
    inputItem.focus();
    card.parentNode.classList.toggle('hide');

    inputItem.addEventListener('keydown', function (event) {
        if (event.code === 'Enter') {
            inputItem.onblur();
        }
    });

    inputItem.onblur = function () {

        let target = inputItem.className.slice(inputItem.className.lastIndexOf('t') + 1);
        let inputNewValue = inputItem.value;

        localStorage.setItem('store', JSON.stringify(editItem(target, inputNewValue)));
        renderItems(JSON.parse(localStorage.getItem('store')));

        inputItem.classList.toggle('hide');
        card.parentNode.classList.toggle('hide');
    }
}

arrow.addEventListener('click', () => {
    localStorage.setItem('store', JSON.stringify(selectAllItems()));
    renderItems(JSON.parse(localStorage.getItem('store')));
});

clear.addEventListener('click', () => {
    if (clearAllCompleted().length !== 0) {
        localStorage.setItem('store', JSON.stringify(clearAllCompleted()));
        renderItems(JSON.parse(localStorage.getItem('store')));
    } else {
        delete localStorage.store;
        renderItems(JSON.parse(localStorage.getItem('store')));
    }

});

subFilters.addEventListener('click', (event) => {
    let e = event.target;
    console.log(subFilters.children );
    if (e.tagName === 'P'){
        for (let key of subFilters.children){
            key.classList.remove('clearActive');
        }

    e.classList.add('clearActive');
    }
});
