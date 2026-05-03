// prescription layout
const doctorName = document.getElementById('doctorName');
const specialist = document.getElementById('specialist');
const dialog = document.getElementById('myPopup');
const qualification = document.getElementById('qualification');
const affiliation = document.getElementById('affiliation');
const BMDC = document.getElementById('BMDC');
const patientName = document.getElementById('patientName');
const age = document.getElementById('age');
const date = document.getElementById('date');

// popup layout
const confirmBtn = document.getElementById('confirmBtn');
const label = document.getElementById('label');
const inputField = document.getElementById('popupInput');
const cancelBtn = document.getElementById('cancelButn');

// Track which element is currently being edited
let activeElement = null;


document.addEventListener('keydown', confirm);
document.addEventListener('keydown', cancel);

function confirm(event) {
    if (event.key === 'Enter') {
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
            }
        } else activeElement.innerText = val;
        dialog.close();
    }
}

function cancel(event) {
    if (event.key === 'Escape') {
        dialog.close();
    }
}

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

// One single, permanent confirm listener
confirmBtn.addEventListener('click', () => {
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
        }
    } else activeElement.innerText = val;
    dialog.close();
});

cancelBtn.addEventListener('click', () => {

    dialog.close();
});

// Helper function to open modal
function openModal(element, labelText) {
    activeElement = element;
    label.innerText = 'Enter ' + labelText;
    inputField.value = ''; // Clear previous input
    dialog.showModal();
}
