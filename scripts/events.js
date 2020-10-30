emitter.on('event:selectAllCheckbox', () => {
    store.selectAllCheckbox();
    renderFilterState();
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