// Get all dropdowns from document
const dropdowns = document.querySelectorAll('.dropdown')

// Loop through all dropdown elements
dropdowns.forEach(dropdown => {
    // Get inner elements from each dropdown
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    // add a click event to the select element
    select.addEventListener('click', () => {
        // add the clicked select styles to the select element
        select.classList.toggle('select-clicked');
        // add the rotate styles to the caret element
        caret.classList.toggle('caret-rotate');
        // add the open styles to the menu element
        menu.classList.toggle('menu-open');
    });

    // loop through all option elements
    options.forEach(option => {
        // add a click evn to the option element
        option.addEventListener('click', () => {
            // change selected inner text to clicked option inner text
            selected.innerText = option.innerText;
            // add the clicked select styles to the selct element
            select.classList.remove('select-clicked');
            // add the rotate styles to the caret element
            caret.classList.remove('caret-rotate');
            // add the open styles to the menu element
            menu.classList.remove('menu-open');
            // remove active class from all option elements
            options.forEach(option => {
                option.classList.remove('active');
            });
            // add active class to clicked option element
            option.classList.add('active');
        });
    });
    
    closeBtn.forEach(cBtn => {
        cBtn.addEventListener("click" , ()=>{
            // change selected inner text to clicked option inner text
            selected.innerText = option.innerText;
            // add the clicked select styles to the selct element
            select.classList.remove('select-clicked');
            // add the rotate styles to the caret element
            caret.classList.remove('caret-rotate');
            // add the open styles to the menu element
            menu.classList.remove('menu-open');
            // remove active class from all option elements
            
        });
    });
});

