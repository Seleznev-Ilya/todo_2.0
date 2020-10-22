if (localStorage.getItem('store') !== null) {
    changeArrowToDo();
    renderItems(JSON.parse(localStorage.getItem('store')));
}

function renderItems(storeValue) {
    let renderArr = [];

    for (let key of storeValue) {
        console.log(key);
        let item = `
        <div class="item item${counter.up()}">
            <input type="text" value="${key.value}" class="input${counter.up()}">
        </div>`;
        renderArr.push(item);
    }
    itemsWrapper.innerHTML= renderArr.join('')
}





