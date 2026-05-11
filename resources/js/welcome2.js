
// // popup layout element conts
// const formLabel = document.getElementById('form-label');
// const inputField = document.getElementById('popupInput');
// const confirmBtn = document.getElementById('confirmBtn');
// const dialogue = document.getElementById('myPopup');
// const label = document.getElementById('label');

// // index page element const
// const inputName = document.getElementById('input-name')
// const inputAddress = document.getElementById('input-address')

// // element 
// let activeElement = null;

// function showModalPopUp(element, headerText) {
//     activeElement = element;
//     label.innerText = 'Enter' + headerText;
//     popupInput.value = '';
//     dialogue.showModal();
// }


// inputName.addEventListener('click', () => showModalPopUp(inputName, 'your name'));
// inputAddress.addEventListener('click', () => showModalPopUp(inputAddress, 'your address'));

// confirmBtn.addEventListener('click', () => {

//     const val = inputField.value;

//     if (activeElement) {
//         activeElement.innerText = val ? val : 'add your name';
//     }
//     dialogue.close();

// });

// document.addEventListener('DOMContentLoaded', () => {

//     let brands = window.brands;

//     console.log(brands);

//     document.getElementById('button').innerText =
//         brands.join(', ');

// });

document.getElementById('button').innerText = window.brands[3];



