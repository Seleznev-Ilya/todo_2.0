
if (localStorage.getItem('store') !== null) {
    changeArrowToDoShow();
    if (localStorage.getItem('state') === null) {
        renderItems(JSON.parse(localStorage.getItem('store')));
    } else {
        switch (localStorage.getItem('state')) {
            case 'all':
                renderItems(JSON.parse(localStorage.getItem('store')));
                break;
            case 'active':
                let store = JSON.parse(localStorage.getItem('store'));
                let boolean = store.filter(item => item.checked === false);
                renderItems(boolean);
                break;
            case 'completed':
                let store1 = JSON.parse(localStorage.getItem('store'));
                let boolean1 = store1.filter(item => item.checked === true);
                renderItems(boolean1);
                break;
        }
    }

    console.log(localStorage.getItem('state'));
}

function renderItems(storeValue) {

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









