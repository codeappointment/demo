const doctorName = document.getElementById('doctorName');
const specialist = document.getElementById('specialist');
const dialog = document.getElementById('myPopup');
const confirmBtn = document.getElementById('confirmBtn');
const label = document.getElementById('label');
const inputField = document.getElementById('popupInput');

// Track which element is currently being edited
let activeElement = null;

// Helper function to open modal
function openModal(element, labelText) {
    activeElement = element;
    label.innerText = 'Enter ' + labelText;
    inputField.value = ''; // Clear previous input
    dialog.showModal();
}

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

// One single, permanent confirm listener
confirmBtn.addEventListener('click', () => {
    const val = inputField.value;

    if (activeElement) {
        activeElement.innerText = val ? val : 'add your name';
    }

    dialog.close();
});