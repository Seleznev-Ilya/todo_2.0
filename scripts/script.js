if (localStorage.getItem('store') !== null) {
    changeArrowToDoShow();
    renderItems(JSON.parse(localStorage.getItem('store')));
}

function renderItems(storeValue) {
    let renderArr = [];
    let number = 0;
    let conditionCheckboxTrue;
    let conditionCheckboxFalse;
    for (let key of storeValue) {
        number += 1;
        if (key.checked === true) {
            conditionCheckboxTrue = 'class="hide"';
            conditionCheckboxFalse = '';
        } else {
            conditionCheckboxTrue = '';
            conditionCheckboxFalse = 'class="hide"';
        }
        let item = `
        <div class="item item${number}">
            <input type="text" value="${key.value}" class="input${number} hide">
            
            <div class="card shadowDown">
                <div class="checkbox" data-${number}>
           
                <input type="checkbox" id="checkbox${number}" checked>
                  <label class="${number}" for="checkbox${number}">
                  
                       <span ${conditionCheckboxTrue}>
                          <i class="far fa-check-circle"></i>
                       </span>
                       <span ${conditionCheckboxFalse}> 
                         <i class="fas fa-check-circle"></i>
                       </span>
                 </label>
                </div>
                
                 <div class="card-p"><p>${key.value}</p></div>
                 
                 <div class="card-cross" data-${number}>
                    <i class="fa fa-close"></i>
                 </div>
            </div>
        </div>`;
        renderArr.push(item);
    }
    let filtersItems = `
        <div class="filters">
             <p><span class="numItems">0</span> items left</p> 
             <div class="subFilters">
                <div>
                    <p>All</p>
                </div>
                <div>
                    <p>Active</p>
                </div>
                <div>
                    <p>Completed</p>
                </div>
             </div> 
             <p>Clear completed</p>     
        </div>
    `;
    renderArr.push(filtersItems);
    itemsWrapper.innerHTML = renderArr.join('')
}





