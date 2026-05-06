// header left section
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

// OE list items
const oelist = document.getElementById('oeList');
const oeitems = document.querySelectorAll('#oeList li');
const oeinput = document.getElementById('oeinput');
const addoe = document.getElementById('addoe');

// adv list items
const advList = document.getElementById('advList');
const advItems = document.querySelectorAll('#advList li');
const advinput = document.getElementById('advinput');
const addadv = document.getElementById('addadv');


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
    }
});



advList.addEventListener('click', function (e) {
    // Check if the clicked element is a SPAN
    if (e.target.tagName === "SPAN") {
        // Remove the parent <li> element
        e.target.parentElement.remove();
    }
});

addadv.addEventListener('click', () => {

    const newListItem = advinput.value;
    if (advinput.value.trim() === '') return;
    addtoListItems(newListItem, advList, advinput);

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
            addtoListItems(newOEItem, advList, advinput);
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

const addDrug = document.getElementById('addDrug');
const drugList = document.getElementById('rxList');
// const ccitems = document.querySelectorAll('#rx-list li');

addDrug.addEventListener('click', () => {
    const items = document.createElement('li');
    items.textContent = '';
    drugList.append(items);

    let drugName = document.createElement('strong')
    drugName.innerHTML = "Tab Napa 500mg";

    let span = document.createElement('span');
    span.innerHTML = "\u00d7";

    

    let dose = document.createElement('p');
    dose.innerHTML = '1+0+1| continue';
    
    items.appendChild(drugName)
    .appendChild(span);
    items.appendChild(dose);
})
