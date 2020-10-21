if (localStorage.getItem('store') !== null){
    enterToDO();
}
function renderItems(){
    itemsWrapper.innerHTML= `
<div class="item item${counter.up()}">
    <input type="text" value="test value here" class="item${counter.up()}input">
</div>`;
}




