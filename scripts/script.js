if (store.storeValue !== []) {
    changeArrowToDoShow();
    renderFilterState();
}

function renderItems(storeValue) {
    todoValue.focus();
    let activeState = document.querySelector(`.subFilters .${filter.state}`);
    activeState.classList.add('clearActive');
    let renderArr = [];
    let number = 0;
    let conditionCheckboxTrue;
    let conditionCheckboxFalse;
    filters.classList.add('hide');


    changeArrowToDoHide();
    try {
        if (storeValue.length !== 0) {
            filters.classList.remove('hide');
            changeArrowToDoShow();
            for (let key of storeValue) {
                number += 1;

                if (key.checkBox === true) {
                    conditionCheckboxTrue = 'class="hide"';
                    conditionCheckboxFalse = '';
                } else {
                    conditionCheckboxTrue = '';
                    conditionCheckboxFalse = 'class="hide"';
                }

                let item = `
        <div class="item item${number} id${key.id}">
        
        <form onSubmit="return false;" >

              <input type="text" value="${key.value}" data-${key.id}   class="input${key.id}   hide ">
        </form>
            
            <div class="card shadowDown">
                <div class="checkbox" data-${number}>
           
                <input type="checkbox" id="${key.id}" checked>
                  <label class="label${key.id}" for="checkbox${number}" data-${key.id}>
                  
                       <span ${conditionCheckboxTrue}>
                          <i class="far fa-check-circle"></i>
                       </span>
                       <span ${conditionCheckboxFalse}> 
                         <i class="fas fa-check-circle"></i>
                       </span>
                 </label>
                </div>
                
                 <div class="card-p"  id="card-p${key.id}" data-${key.id}><p>${key.value}</p></div>

                 
                 <div class="card-cross" data-${key.id}>
                    <i class="fa fa-close"></i>
                 </div>
            </div>
        </div>`;
                renderArr.push(item);
            }
        }
    } catch {

    }
    itemsWrapper.innerHTML = renderArr.join('');

    numberItemsShow();
}









