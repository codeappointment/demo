// header left section
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const doctorName = document.getElementById('doctorName');
const qualification = document.getElementById('qualification');
const affiliation = document.getElementById('affiliation');
const BMDC = document.getElementById('BMDC');
const patientName = document.getElementById('patientName');
const age = document.getElementById('age');
const date = document.getElementById('date');

// header center section 

const specialist = document.getElementById('specialist');

// header right section
const hospitalName = document.getElementById('hospitalName');
const address = document.getElementById('address');
const schedule = document.getElementById('schedule');
const contact = document.getElementById('contact');

// popup layout
const dialog = document.getElementById('myPopup');
const confirmBtn = document.getElementById('confirmBtn');
const label = document.getElementById('label');
const inputField = document.getElementById('popupInput');
const cancelBtn = document.getElementById('cancelButn');

// CC list items
const cclist = document.getElementById('ccList');
const ccitems = document.querySelectorAll('#ccList li');
const ccinput = document.getElementById('ccinput');
const addcc = document.getElementById('addcc');
const ccsuggestionList = document.getElementById('ccsuggestionList');

// OE list items
const oelist = document.getElementById('oeList');
const oeitems = document.querySelectorAll('#oeList li');
const oeinput = document.getElementById('oeinput');
const addoe = document.getElementById('addoe');

// adv list items
const investigationList = document.getElementById('advList');
const advItems = document.querySelectorAll('#advList li');
const advinput = document.getElementById('advinput');
const addadv = document.getElementById('addadv');
const invsuggestionList = document.getElementById('invsuggestionList');


// drugInput:ayout items

const addDrug = document.getElementById('addDrug'); // button
const drugList = document.getElementById('rxList');
const drugNameInput = document.getElementById('drugName'); // 
const doses = document.getElementById('dose');
const duration = document.getElementById('duration');
const dayWeekMonth = document.getElementById('dayWeekMonth');
const mealRelation = document.getElementById('mealRelation');
const suggestion = document.getElementById('suggestion');
const drugSuggestionList = document.getElementById('suggestionList');
const dosesList = document.getElementById('dosesList');
const alertText = document.getElementById('alert');

// advice list layout items
const adviceList = document.getElementById('adviceList');
const adviceInput = document.getElementById('adviceInput');
const adviceSiggestionList = document.getElementById('adviceSiggestionList');
const addAdvice = document.getElementById('addAdvice')
// Track which element is currently being edited
let activeElement = null;


document.addEventListener('keydown', confirm);
document.addEventListener('keydown', cancel);

const currentDate = new Date();
date.innerText = currentDate.toLocaleDateString('en-GB');

// Attach open listeners
specialist.addEventListener('click', () => openModal(specialist, 'Specialist Name'));
doctorName.addEventListener('click', () => openModal(doctorName, 'Doctor Name'));
qualification.addEventListener('click', () => openModal(qualification, 'MBBS/BCS/MD/FCPS...'));
affiliation.addEventListener('click', () => openModal(affiliation, 'Currrent Institution and designation'));
BMDC.addEventListener('click', () => openModal(BMDC, 'BMDC no.'));
patientName.addEventListener('click', () => openModal(patientName, 'Enter Patient name'));
age.addEventListener('click', () => openModal(age, 'Patient age'));

hospitalName.addEventListener('click', () => openModal(hospitalName, 'Chamber Name'));
address.addEventListener('click', () => openModal(address, 'Chamber address'));
schedule.addEventListener('click', () => openModal(schedule, 'Chamber schedule'));
contact.addEventListener('click', () => openModal(contact, 'Contact for appointment'));


addcc.addEventListener('click', () => {

    const newListItem = ccinput.value;
    if (ccinput.value.trim() === '') return;
    addtoListItems(newListItem, cclist, ccinput);

});

cclist.addEventListener('click', function (e) {
    // Check if the clicked element is a SPAN
    if (e.target.tagName === "SPAN") {
        // Remove the parent <li> element
        e.target.parentElement.remove();
    }
});


addoe.addEventListener('click', () => {

    const newListItem = oeinput.value;
    if (oeinput.value.trim() === '') return;
    addtoListItems(newListItem, oelist, oeinput);

});

oelist.addEventListener('click', function (e) {
    // Check if the clicked element is a SPAN
    if (e.target.tagName === "SPAN") {
        // Remove the parent <li> element
        e.target.parentElement.remove();
        e.target.childElement.remove();
    }
});

addadv.addEventListener('click', () => {

    const newListItem = advinput.value;
    if (advinput.value.trim() === '') return;
    addCheckBox(newListItem, investigationList, advinput);

});

investigationList.addEventListener('click', function (e) {
    // Check if the clicked element is a SPAN
    if (e.target.tagName === "SPAN") {
        // Remove the parent <li> element
        e.target.parentElement.remove();
    }
});

if (drugList.children.length === 0) drugList.style.display = 'none'

mealRelation.addEventListener('click', () => {
    alertText.style.display = 'none';
});

dayWeekMonth.addEventListener('change', () => {
    // If the user selects anything other than the default/empty value
    if (dayWeekMonth.value !== "select") {
        alertText.style.display = "none";
    }
});


const enToBn = (number) => {
    return number.toString().replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[d]);
};

for (let i = 1; i <= 30; i++) {
    const option = document.createElement('option');

    option.value = enToBn(i);
    option.textContent = enToBn(i);

    duration.appendChild(option);
}

addDrug.addEventListener('click', () => {
    const items = document.createElement('li');
    // items.textContent = 'some text';
    drugList.append(items);

    const drugName = document.createElement('strong')
    drugName.innerHTML = drugNameInput.value;

    const span = document.createElement('span');
    span.innerHTML = "\u00d7";

    // const form = document.getElementById('mealRelation');
    const data = new FormData(mealRelation);
    const mealStatus = data.get('mealTime');

    let suggest;

    let durationValue = duration.value;
    if (suggestion.value !== '') suggest = " (" + suggestion.value + ")";
    else suggest = '';

    if (dayWeekMonth.value === 'চলবে') {
        durationValue = '-';
    }
    const dose = document.createElement('div');
    dose.classList.add('kalpurush');
    dose.innerHTML = doses.value +
        " | " +
        mealStatus +
        " | " +
        durationValue +
        " " +
        dayWeekMonth.value +

        suggest;


    if (drugNameInput.value.trim() === '' ||
        doses.value.trim() === '' ||
        duration.value.trim() === '' ||
        dayWeekMonth.value === 'select' ||
        !data.has('mealTime')) {
        // alert("Please fill all fields!");
        alertText.style.display = "block";
        return; // This STOPS the function right here
    }



    items.appendChild(drugName)
        .appendChild(span);
    items.appendChild(dose);
    drugList.append(items)

    drugList.style.display = 'block'

    drugNameInput.value = "";
    doses.value = "";
    duration.value = "১";
    suggestion.value = "";
    mealRelation.reset();
    dayWeekMonth.selectedIndex = 0;

    // else drugName.innerText = 'Add drug na'
});

drugNameInput.addEventListener('input', function () {
    const alert = document.getElementById('alert');
    if (this.value.trim() !== '')
        alert.style.display = "none";
    if (input.value.trim() !== '') {
        list.style.display = 'block';
    } else {
        list.style.display = 'none';
    }
});

drugSuggestionList.addEventListener('click', function (e) {
    drugNameInput.value = e.target.innerHTML;
    drugSuggestionList.style.display = 'none'
});

ccsuggestionList.addEventListener('click', function (e) {
    ccinput.value = e.target.innerHTML;
    ccsuggestionList.style.display = 'none'
});

invsuggestionList.addEventListener('click', function (e) {
    addadv.value = ''
    invsuggestionList.style.display = 'none'
    addCheckBox(e.target.innerHTML, investigationList, advinput);
});


dosesList.addEventListener('click', function (e) {

    dosesList.style.display = 'none'
    doses.value = e.target.innerHTML;
});

doses.addEventListener('input', function () {
    const alert = document.getElementById('alert');
    if (this.value.trim() !== '')
        alert.style.display = "none";
});
duration.addEventListener('input', function () {
    const alert = document.getElementById('alert');
    if (this.value.trim() !== '')
        alert.style.display = "none";
});

// const drugList = getElementById('rxList');s
drugList.addEventListener('click', function (e) {
    // Check if the clicked element is a SPAN
    if (e.target.tagName === "SPAN") {
        // Remove the parent <li> element
        e.target.closest('li').remove();
        if (drugList.children.length === 0) {
            drugList.style.display = 'none';
        }
    }
});

adviceList.addEventListener('click', function (e) {
    if (e.target.tagName === "SPAN") {
        // Remove the parent <li> element
        e.target.closest('li').remove();
        if (adviceList.children.length === 0) {
            adviceList.style.display = 'none';
        }
    }
});

adviceSiggestionList.addEventListener('click', function (e) {
    adviceInput.value = e.target.innerHTML;
    adviceSiggestionList.style.display = 'none'
});

addAdvice.addEventListener('click', function (e) {
    const newAdviceItem = adviceInput.value;
    adviceList.style.display = 'block'
    addtoListItems(newAdviceItem, adviceList, adviceInput);
});

// One single, permanent confirm listener
confirmBtn.addEventListener('click', updateCancelPopUp);

cancelBtn.addEventListener('click', () => {

    dialog.close();
});


function confirm(event) {
    if (event.key === 'Enter') {
        if (dialog.open) {
            updateCancelPopUp();
        }

        if (ccinput.value.trim() !== '') {
            const newCCItem = ccinput.value;
            addtoListItems(newCCItem, cclist, ccinput);
        }
        if (oeinput.value.trim() !== '') {
            const newOEItem = oeinput.value;
            addtoListItems(newOEItem, oelist, oeinput);
        }
        if (advinput.value.trim() !== '') {
            const newOEItem = advinput.value;
            addCheckBox(newOEItem, investigationList, advinput);
            invsuggestionList.style.display = 'none'
        }
        if (doses.value.trim() !== '') {
            dosesList.style.display = 'none'
        }
        if (drugNameInput.value.trim() !== '') {
            drugSuggestionList.style.display = 'none'
        }
        if (adviceInput.value.trim() !== '') {
            const newAdviceItem = adviceInput.value;
            adviceList.style.display = 'block'
            addtoListItems(newAdviceItem, adviceList, adviceInput);
        }
    }

}

function cancel(event) {
    if (event.key === 'Escape') {
        dialog.close();
    }
}


// Helper function to open modal
function openModal(element, labelText) {
    activeElement = element;
    label.innerText = 'Enter ' + labelText;
    inputField.value = activeElement.innerText; // Clear previous input
    dialog.showModal();
}

function updateCancelPopUp() {
    const val = inputField.value;

    if (val === '') {
        switch (activeElement) {

            case doctorName: activeElement.innerText = 'add your name';
                break;
            case qualification: activeElement.innerText = 'add your basic and postgrad degree';
                break;
            case specialist: activeElement.innerText = 'add your speciality';
                break;
            case affiliation: activeElement.innerText = 'add your current work and designation';
                break;
            case BMDC: activeElement.innerText = 'add your BMDC no.';
                break;
            case patientName: activeElement.innerText = 'add patient name';
                break;
            case age: activeElement.innerText = 'add patient age';
                break;
            case hospitalName: activeElement.innerText = 'add your chamber name';
                break;
            case address: activeElement.innerText = 'add your chamber address';
                break;
            case schedule: activeElement.innerText = 'add schedule';
                break;
            case contact: activeElement.innerText = 'add contact';
                break;
            case addcc: activeElement.innerText = 'add cc';
                break;
        }
    } else activeElement.innerText = val;
    dialog.close();
};

function addtoListItems(eliment, targetList, targetInput) {
    const items = document.createElement('li');
    items.textContent = eliment;
    targetList.append(items);
    let span = document.createElement('span')
    span.innerHTML = "\u00d7"
    items.appendChild(span);
    targetInput.value = '';
    ccsuggestionList.style.display = 'none'
    invsuggestionList.style.display = 'none'
}

function addCheckBox(eliment, targetList, targetInput) {
    const items = document.createElement('li');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.textContent = eliment;
    items.appendChild(checkbox);
    items.append(` ${eliment}`);
    targetList.prepend(items); // join at top of list
    invsuggestionList.style.display = 'none'
    targetInput.value = '';
}

const temp = document.getElementById('temp');
temp.addEventListener('click', () => {

    const text = temp.innerText + '  ℉';
    temp.value = text;
});

const bp = document.getElementById('bp');
bp.addEventListener('click', () => {

    const text = bp.innerText + '  mmHg';
    bp.value = text;
});

const download = document.getElementById('download');
