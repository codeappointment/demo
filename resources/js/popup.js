// prescription layout
const doctorName = document.getElementById('doctorName');
const specialist = document.getElementById('specialist');
const dialog = document.getElementById('myPopup');;
const qualification = document.getElementById('qualification');;
const affiliation = document.getElementById('affiliation');;
const BMDC = document.getElementById('BMDC');

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

        if (activeElement) {
            activeElement.innerText = val ? val : 'add your name';
        }
        // doctorName.style.color = 'red';
        dialog.close();
    }
}
function cancel(event) {
    if (event.key === 'Escape') {
        dialog.close();
    }
}

// Attach open listeners
specialist.addEventListener('click', () => openModal(specialist, 'Specialist Name'));
doctorName.addEventListener('click', () => openModal(doctorName, 'Doctor Name'));
qualification.addEventListener('click', () => openModal(qualification, 'MBBS/BCS/MD/FCPS...'));
affiliation.addEventListener('click', () => openModal(affiliation, 'Currrent Institution and designation'));
BMDC.addEventListener('click', () => openModal(BMDC, 'BMDC no.'));

// One single, permanent confirm listener
confirmBtn.addEventListener('click', () => {
    const val = inputField.value;

    if (activeElement) {
        if (activeElement === doctorName)
            activeElement.innerText = val ? val : 'add your name';
        else
            activeElement.innerText = val ? val : 'add your speciality';
    }

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
