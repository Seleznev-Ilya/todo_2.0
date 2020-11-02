function enterToDO() {
    if (todoValue.value.trim() !== '') {
        changeArrowToDoShow();
        store.storeValue = new Item();
        renderFilterState();
    }
}

function changeArrowToDoShow() {
    arrow.style.opacity = '1';
    todo.classList.toggle('shadowDown');
}

itemsWrapper.addEventListener('dblclick', function (event) {
    let e = event.target;
    if (e.className === 'card-p') {
        emitter.emit('event:swapCardToInput', {event: e});
    }
});

itemsWrapper.addEventListener('click', function (event) {
    let e = event.target;
    emitter.emit('event:switchItemCheckbox', {event: e});
    emitter.emit('event:checkBoxImgToggle', {event: e});
    emitter.emit('event:clearItem', {event: e});
});

arrow.addEventListener('click', () => {
    emitter.emit('event:selectAllCheckbox');
});

clear.addEventListener('click', () => {
    emitter.emit('event:clearSelected');
});

subFilters.addEventListener('click', (event) => {
    let e = event.target;
    emitter.emit('event:filterAddClass', {event: e});
});

function renderFilterState() {
    switch (filter.state) {
        case 'all':
            renderItems(store.storeValue);
            break;
        case 'active':
            let isAnyCheckFalse = store.storeValue.filter(item => item.checkBox === false);
            if (isAnyCheckFalse.length < 1 && store.storeValue.length) {
                itemsWrapper.innerHTML = '';
                filters.classList.remove('hide');
            } else {
                renderItems(isAnyCheckFalse);
            }
            break;
        case 'completed':
            let isAnyCheckTrue = store.storeValue.filter(item => item.checkBox === true);
            if (isAnyCheckTrue.length < 1 && store.storeValue.length) {
                itemsWrapper.innerHTML = '';
                filters.classList.remove('hide');
            } else {
                renderItems(isAnyCheckTrue);
            }
            break;
    }
}

function changeArrowToDoHide() {
    arrow.style.opacity = '0';
    todo.classList.toggle('shadowDown');
}

function numberItemsShow() {
    numItems.innerText = store.getNumberItemsToDo();
}
