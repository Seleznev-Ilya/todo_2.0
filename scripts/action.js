function enterToDO() {
    if (todoValue.value.trim() !== '') {

        changeArrowToDoShow();
        store.storeValue = new Item();
        renderItems(store.storeValue);
        renderFilterState();

    }
}


itemsWrapper.addEventListener('dblclick', function (event) {
    let e = event.target;
    if (e.className === 'card-p') {
        emitter.emit('event:swapCardToInput', {event: e});
    }

});

arrow.addEventListener('click', () => {
    emitter.emit('event:selectAllCheckbox');
});


clear.addEventListener('click', () => {
    store.clearSelected();
    renderFilterState();
});

subFilters.addEventListener('click', (event) => {
    let e = event.target;
    if (e.tagName === 'P') {
        for (let key of subFilters.children) {
            key.classList.remove('clearActive');

            switch (e.className) {
                case 'all':
                    filter.state = 'all';
                    renderFilterState();
                    break;
                case 'active':
                    filter.state = 'active';
                    renderFilterState();
                    break;
                case 'completed':
                    filter.state = 'completed';
                    renderFilterState();
                    break;
            }

        }
        e.classList.add('clearActive');
    }
});


itemsWrapper.addEventListener('click', function (event) {
    let e = event.target;
    let target = e.parentNode.parentNode.parentNode.firstElementChild.id;
    let checkBoxImg = document.querySelector(`.label${target}`);

    try {
        for (let key of checkBoxImg.children) {
            key.classList.toggle('hide');
            renderFilterState()
        }
    } catch {
    }
    if (e.parentNode.className === 'card-cross') {
        store.clearItem(`${Object.keys(e.parentNode.dataset)[0]}`);
        renderFilterState()
    }
    console.log(target.trim());
    if (target.trim() !== '') {
        store.switchItemCheckbox(target);
    }
});

function renderFilterState() {


    switch (filter.state) {
        case 'all':
            renderItems(store.storeValue);
            break;
        case 'active':
            let boolean = store.storeValue.filter(item => item.checkBox === false);
            if (boolean.length < 1) {
                itemsWrapper.innerHTML = '';
            } else {
                renderItems(boolean);
            }
            break;
        case 'completed':
            let boolean1 = store.storeValue.filter(item => item.checkBox === true);
            if (boolean1.length < 1) {
                itemsWrapper.innerHTML = '';
            } else {
                renderItems(boolean1);
            }
            break;
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

function numberItemsShow() {
    numItems.innerText = store.getNumberItemsToDo();
}