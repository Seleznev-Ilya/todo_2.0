emitter.on('event:selectAllCheckbox', () => {
    store.selectAllCheckbox();
    renderFilterState();
});
emitter.on('event:clearSelected', () => {
    store.clearSelected();
    renderFilterState();
});
emitter.on('event:filterAddClass', data => {
    if (data.event.tagName === 'P') {
        for (let key of subFilters.children) {
            key.classList.remove('clearActive');

            switch (data.event.className) {
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
        data.event.classList.add('clearActive');
    }
});
emitter.on('event:swapCardToInput', data => {

    let inputItem = document.querySelector(`.input${Object.keys(data.event.dataset)[0]}`);
    let card = document.getElementById(`${data.event.id}`);
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
        store.editedItem(target, inputNewValue);
        inputItem.classList.toggle('hide');
        card.parentNode.classList.toggle('hide');
        renderFilterState();
    }
});
emitter.on('event:switchItemCheckbox', data => {
    let target = data.event.parentNode.parentNode.parentNode.firstElementChild.id;
    if (target.trim() !== '') {
        store.switchItemCheckbox(target);
    }
});
emitter.on('event:checkBoxImgToggle', data => {
    let target = data.event.parentNode.parentNode.parentNode.firstElementChild.id;
    let checkBoxImg = document.querySelector(`.label${target}`);
    if (data.event.parentNode.parentNode.tagName === 'LABEL') {

        for (let key of checkBoxImg.children) {
            key.classList.toggle('hide');

        }
        renderFilterState();
    }
});
emitter.on('event:clearItem', data => {
    if (data.event.parentNode.className === 'card-cross') {
        store.clearItem(`${Object.keys(data.event.parentNode.dataset)[0]}`);
        renderFilterState();
    }
});