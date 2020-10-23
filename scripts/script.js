if (localStorage.getItem('store') !== null) {
    changeArrowToDoShow();
    renderItems(JSON.parse(localStorage.getItem('store')));
}

function renderItems(storeValue) {

    let renderArr = [];
    let number = 0;
    let conditionCheckboxTrue;
    let conditionCheckboxFalse;
    filters.classList.add('hide');
    try {
        if (storeValue.length !== 0) {
            filters.classList.remove('hide');
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
        
        <form onSubmit="return false;" >
              <input type="text" value="${key.value}" class="input${number} hide ">
        </form>
            
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
                
                 <div class="card-p"  id="card-p${number}" data-input${number}><p>${key.value}</p></div>
                 
                 <div class="card-cross" data-${number}>
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







