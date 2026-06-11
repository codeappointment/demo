import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { getFirestore, collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs } from "firebase/firestore";

import { app } from './firebaseAuth.js';
import { signInWithGoogle } from './signin.js';
import { map } from "firebase/firestore/pipelines";


const auth = getAuth(app);
const db = getFirestore(app)
let documentReference;
let userID;
let userDataExists = false;
let activeElement = null;

// header left section
const doctorName = document.getElementById('doctorName');
const qualification = document.getElementById('qualification');
const affiliation = document.getElementById('affiliation');
const BMDC = document.getElementById('BMDC');
const patientName = document.getElementById('patientName');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
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
const alertModal = document.getElementById('signinAlert');
const cancel = document.getElementById('cancel');
const signin = document.getElementById('signin');

// template
const saveTemplateBtn = document.getElementById('saveTemplateBtn');
const templateList = document.getElementById('templateList');

// header controller
const divider = document.getElementById('divider');
const hideHeader = document.getElementById('hideHeader');
const prescriptionheader = document.getElementById('header');
const headerHeightIncrease = document.getElementById('increase');
const headerHeightDecrease = document.getElementById('decrease');
const saveSetting = document.getElementById('saveSetting');
let loadedHeaderState = prescriptionheader.style.visibility || '';
let loadedHeaderHeight = divider.style.marginTop || 0;
let newHeaderState = 'visible';
let newHeaderHeight = '0';
let hidden = false;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const doctorName = document.getElementById('doctorName')
        // doctorName.innerText = user.displayName;
        userID = auth.currentUser.email
        documentReference = doc(db, "users", userID);
        getUserDocument(userID);
        savedtemplateList();
        // ...
    } else {
        // User is signed out
        basicText();
    }
});


async function getUserDocument(userID) {
    // 1. Create a reference to the specific document

    try {
        // 2. Fetch the document snapshot
        const documentSnapshot = await getDoc(documentReference);

        // 3. Check if the document exists before reading it
        if (documentSnapshot.exists()) {
            userDataExists = true;
            // console.log("Document data:", documentSnapshot.data());

            // Accessing specific fields:
            const userData = documentSnapshot.data();

            const doctor_name = userData.doctorName;
            if (doctor_name)
                doctorName.innerText = doctor_name;
            else doctorName.innerText = 'Click to add doctor name';

            const doctor_qualification = userData.qualification;
            if (doctor_qualification)
                qualification.innerText = doctor_qualification;
            else qualification.innerText = 'Click to add degrees';


            const doctor_affiliation = userData.affiliation;
            if (doctor_affiliation)
                affiliation.innerText = doctor_affiliation;
            else affiliation.innerText = 'Click to add current job and designation';

            const doctor_bmdc = userData.BMDC;
            if (doctor_bmdc)
                BMDC.innerText = doctor_bmdc;
            else BMDC.innerText = 'Click to add BMDC no.';

            const doctor_speciality = userData.specialist;
            if (doctor_speciality)
                specialist.innerText = doctor_speciality;
            else specialist.innerText = 'Click to add your speciality';

            const hospital_name = userData.hospitalName;
            if (hospital_name)
                hospitalName.innerText = hospital_name;
            else hospitalName.innerText = 'Click to add hospital/chamber name';

            const hospital_address = userData.address;
            if (hospital_address)
                address.innerText = hospital_address;
            else address.innerText = 'Click to add chamber address';

            const chamber_schedule = userData.schedule;
            if (chamber_schedule)
                schedule.innerText = chamber_schedule;
            else schedule.innerText = 'Click to add chamber schedule';

            const contact_no = userData.contact;
            if (contact_no)
                contact.innerText = contact_no;
            else contact.innerText = 'Click to add contact no.';

            loadedHeaderState = userData.headerstate || 'visible';
            loadedHeaderHeight = userData.headerHeight || 0;

            if (loadedHeaderState === 'visible') {
                hidden = true;

            } else {
                hidden = false;
            }
            // hidden boolean value is reversed to mimic click adjust hide button function
            headerHideUnhide();

            divider.style.visibility = loadedHeaderState;
            divider.style.marginTop = loadedHeaderHeight;
            
        } else {
            userDataExists = false;
            console.log("No such document found!");
            basicText();

        }
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}

function getFormattedRxList(rx) {
    const drugList = document.getElementById('rxList');
    Object.keys(rx).forEach(key => {
        const rxArray = rx[key];
        // const htmlOutput = formatRxData(rxArray);
        const items = document.createElement('li');
        // items.textContent = 'some text';
        drugList.append(items);

        const drugName = document.createElement('strong')
        drugName.innerHTML = rxArray[0];

        const span = document.createElement('span');
        span.innerHTML = "\u00d7";

        const dose = document.createElement('div');
        dose.classList.add('kalpurush');
        dose.innerHTML = rxArray[1].replace(/।/g, '|');

        items.appendChild(drugName)
            .appendChild(span);
        items.appendChild(dose);
        drugList.append(items)

        drugList.style.display = 'block'

    });
}
confirmBtn.addEventListener('click', () => {
    createUpdateData
});

// Attach open listeners
specialist.addEventListener('click', () => openModal(specialist, 'Specialist Name'));
doctorName.addEventListener('click', () => openModal(doctorName, 'Doctor Name'));
qualification.addEventListener('click', () => openModal(qualification, 'MBBS/BCS/MD/FCPS...'));
affiliation.addEventListener('click', () => openModal(affiliation, 'Currrent Institution and designation'));
BMDC.addEventListener('click', () => openModal(BMDC, 'BMDC no.'));
patientName.addEventListener('click', () => openModal(patientName, 'Enter Patient name'));
age.addEventListener('click', () => openModal(age, 'Patient age'));
gender.addEventListener('click', () => openModal(gender, 'Male/Female'));

hospitalName.addEventListener('click', () => openModal(hospitalName, 'Chamber Name'));
address.addEventListener('click', () => openModal(address, 'Chamber address'));
schedule.addEventListener('click', () => openModal(schedule, 'Chamber schedule'));
contact.addEventListener('click', () => openModal(contact, 'Contact for appointment'));
saveTemplateBtn.addEventListener('click', () => openModal(saveTemplate, 'a name for this template'));

function basicText() {
    doctorName.innerText = 'Click to add doctor name';

    qualification.innerText = 'Click to add degrees';
    affiliation.innerText = 'Click to add Current job and designation';
    BMDC.innerText = 'Click to add BMDC number';
    specialist.innerText = 'Click to add your Speciality';
    hospitalName.innerText = 'Click to add chamber/hospital name';
    address.innerText = 'Click to add chamber address';
    schedule.innerText = 'Click to add chamber schedule';
    contact.innerText = 'Click to add contact no,';
}

// Helper function to open modal
function openModal(element, labelText) {
    activeElement = element;
    label.innerText = 'Enter ' + labelText;
    if (element.innerText === 'Click to add patient name' ||
        element.innerText === 'Click to add age' ||
        element.innerText === 'Click to add gender' ||
        element.innerText === 'Save Template') {
        inputField.value = '';
    } else {
        inputField.value = activeElement.innerText;
    }


    if (!auth.currentUser) {
        alertModal.showModal();
    } else
        dialog.showModal();
}

signin.addEventListener('click', () => {
    signInWithGoogle();
    alertModal.close();
});

cancel.addEventListener('click', () => {

    alertModal.close();
});

function updateCancelPopUp() {
    const val = inputField.value;

    if (val === '') {
        switch (activeElement) {

            case doctorName: activeElement.innerText = 'Add your name';
                break;
            case qualification: activeElement.innerText = 'Add your basic and postgrad degree';
                break;
            case specialist: activeElement.innerText = 'Add your speciality';
                break;
            case affiliation: activeElement.innerText = 'Add your current work and designation';
                break;
            case BMDC: activeElement.innerText = 'Add your BMDC no.';
                break;
            case patientName: activeElement.innerText = 'Add patient name';
                break;
            case age: activeElement.innerText = 'Add patient age';
                break;
            case hospitalName: activeElement.innerText = 'Add your chamber name';
                break;
            case address: activeElement.innerText = 'Add your chamber address';
                break;
            case schedule: activeElement.innerText = 'Add schedule';
                break;
            case contact: activeElement.innerText = 'Add contact';
                break;
        }
    } else {
        if (activeElement !== saveTemplate) // excluding text update of template button
            activeElement.innerText = val;
        if (auth.currentUser) {
            createUpdateData(activeElement, val);
        }

    }
    dialog.close();
};

confirmBtn.addEventListener('click', updateCancelPopUp);

cancelBtn.addEventListener('click', () => {

    dialog.close();
});


function createUpdateData(field, value) {

    let data;

    if (field === doctorName)
        data = { doctorName: value }
    if (field === qualification)
        data = { qualification: value }
    if (field === affiliation)
        data = { affiliation: value }
    if (field === BMDC)
        data = { BMDC: value }
    if (field === specialist)
        data = { specialist: value }
    if (field === hospitalName)
        data = { hospitalName: value }
    if (field === address)
        data = { address: value }
    if (field === schedule)
        data = { schedule: value }
    if (field === contact)
        data = { contact: value }

    if (userDataExists) {

        if (field !== age && field !== gender && field !== patientName && field !== saveTemplate) {
            // for header content update
            updateDoc(documentReference, data)
                .then(() => {
                    getUserDocument(userID);
                    console.log("Success data update!");
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

        }

    } else {
        // for header content update
        if (field !== age && field !== gender && field !== patientName && field !== saveTemplate)
            setDoc(documentReference, data)
                .then(() => {
                    getUserDocument(userID);
                    console.log("Success data update!");
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
    }
    if (field === saveTemplate) {
        saveTemplate(value)
    }
}

const downloadBtn = document.getElementById('download');
downloadBtn.addEventListener('click', () => {
    sendPrescriptionData();
});

function sendPrescriptionData() {

    const prescriptionReference = doc(db, "users", userID, 'prescription', patientName.innerText + ' ' + age.innerText);

    const ccItems = document.querySelectorAll('#ccList li');

    // 2. Map through them, grabbing only the text before the span
    const ccitemTexts = Array.from(ccItems).map(li => {
        // childNodes[0] gets the initial text node, .trim() cleans up whitespace
        return li.childNodes[0].textContent.trim();
    });

    const oeItems = document.querySelectorAll('#oeList li');
    const oeitemTexts = Array.from(oeItems).map(li => {
        const label = li.childNodes[0].textContent.trim();
        const input = li.querySelector('.oeinput');

        // If there is an input box, grab its value; otherwise just get the label
        const value = input ? input.value.trim() : '';

        return `${label} ${value}`.trim();
    });

    const invitems = document.querySelectorAll('#advList li');

    const invitemTexts = Array.from(invitems)
        .filter(li => {
            // 1. Find the checkbox inside this specific <li>
            const checkbox = li.querySelector('input[type="checkbox"]');

            // 2. Only keep this <li> if the checkbox exists AND is checked
            return checkbox && checkbox.checked;
        })
        .map(li => {
            // 3. Clone the node so we can safely remove the input element 
            // without messing up the actual webpage UI
            const clonedLi = li.cloneNode(true);
            const input = clonedLi.querySelector('input');
            if (input) input.remove(); // Remove the input HTML completely

            // 4. Return just the remaining text ("CBC")
            return clonedLi.textContent.trim();
        });


    const diagnosis = document.getElementById('diagnosis');
    const rxItems = document.querySelectorAll('#rxList li');


    const rxitemTexts = Array.from(rxItems).map(li => {
        const itemObject = {}; // Use a plain object instead of a Map

        for (let i = 0; i < li.children.length; i++) {
            itemObject[i] = li.children[i].textContent;
        }

        return itemObject;
    });

    // Now rxitemTexts is an array of plain objects: [{0: "text", 1: "text"}, {...}]
    // You can safely pass this to setDoc()

    const advItems = document.querySelectorAll('#adviceList li');
    const advItemTexts = Array.from(advItems).map(li => {
        return li.childNodes[0].textContent.trim();
    });
    const prescriptionData = {
        nam: patientName.innerText,
        ages: age.innerText,
        dat: date.innerText,
        cc: ccitemTexts,
        oe: oeitemTexts,
        inv: invitemTexts,
        diag: diagnosis.value,
        rx: rxitemTexts,
        adv: advItemTexts,
    }

    setDoc(prescriptionReference, prescriptionData).then(() => {
        console.log('Prescription submitted!')
    })
}


function saveTemplate(templateName) {

    const prescriptionReference = doc(db, "users", userID, 'template', templateName);

    const invitems = document.querySelectorAll('#advList li');

    const invitemTexts = Array.from(invitems)
        .filter(li => {
            // 1. Find the checkbox inside this specific <li>
            const checkbox = li.querySelector('input[type="checkbox"]');

            // 2. Only keep this <li> if the checkbox exists AND is checked
            return checkbox && checkbox.checked;
        })
        .map(li => {
            // 3. Clone the node so we can safely remove the input element 
            // without messing up the actual webpage UI
            const clonedLi = li.cloneNode(true);
            const input = clonedLi.querySelector('input');
            if (input) input.remove(); // Remove the input HTML completely

            // 4. Return just the remaining text ("CBC")
            return clonedLi.textContent.trim();
        });

    const rxItems = document.querySelectorAll('#rxList li');


    const rxitemTexts = Array.from(rxItems).map(li => {
        const itemObject = {}; // Use a plain object instead of a Map

        for (let i = 0; i < li.children.length; i++) {
            itemObject[i] = li.children[i].textContent;
        }

        return itemObject;
    });

    // Now rxitemTexts is an array of plain objects: [{0: "text", 1: "text"}, {...}]
    // You can safely pass this to setDoc()

    const advItems = document.querySelectorAll('#adviceList li');
    const advItemTexts = Array.from(advItems).map(li => {
        return li.childNodes[0].textContent.trim();
    });
    const prescriptionData = {
        inv: invitemTexts,
        rx: rxitemTexts,
        adv: advItemTexts,
    }

    setDoc(prescriptionReference, prescriptionData).then(() => {
        console.log('Template submitted!')
    })
}


let increased = false;


hideHeader.addEventListener('click', () => {

    headerHideUnhide();

    newHeaderState = prescriptionheader.style.visibility;
    headerStateChangeObserver();
});


headerHeightIncrease.addEventListener('click', () => {

    // 1. Get the current numeric value
    let currentHeight = parseFloat(divider.style.marginTop) || 0;

    // 2. Increment and apply back with the unit
    divider.style.marginTop = `${++currentHeight}mm`;

    newHeaderHeight = divider.style.marginTop || 0;
    headerHeightChangeObserver();
});

headerHeightDecrease.addEventListener('click', () => {

    // 1. Get the current numeric value
    let currentHeight = parseFloat(divider.style.marginTop) || 0;

    // 2. Increment and apply back with the unit
    divider.style.marginTop = `${--currentHeight}mm`;

    newHeaderHeight = divider.style.marginTop || 0;
    headerHeightChangeObserver();
});



function headerStateChangeObserver() {
    const saveSetting = document.getElementById('saveSetting');
    if (loadedHeaderState !== newHeaderState) {
        saveSetting.style.visibility = 'visible'
    } else {
        saveSetting.style.visibility = 'hidden'
    }
    newHeaderState = prescriptionheader.style.visibility;
    // console.log('hidden state: ' + newHeaderState)
}

function headerHeightChangeObserver() {

    if (loadedHeaderHeight !== newHeaderHeight) {
        saveSetting.style.visibility = 'visible'
    } else {
        saveSetting.style.visibility = 'hidden'
    }

    newHeaderHeight = divider.style.marginTop;
    // console.log('height: ' + newHeaderHeight)
}

function headerHideUnhide() {
    if (!hidden) {
        prescriptionheader.style.visibility = 'hidden'
        divider.style.visibility = 'hidden'
        hidden = true;
        hideHeader.innerText = 'Unhide header'
    } else {
        prescriptionheader.style.visibility = 'visible'
        divider.style.visibility = 'visible'
        hidden = false
        hideHeader.innerText = 'Hide header'
    }
}

saveSetting.addEventListener('click', () => {
    if (auth.currentUser) {
        saveSetting.style.visibility = 'hidden'
        const headerData = {
            headerstate: newHeaderState,
            headerHeight: newHeaderHeight
        }

        if (userDataExists)
            updateDoc(documentReference, headerData).then(() => {

                console.log('setting saved');
            });
    } else { alertModal.showModal() }
})


async function savedtemplateList() {

    const querySnapshot = await getDocs(collection(db, "users", userID, "template"));
    querySnapshot.forEach((doc) => {

        const listItems = document.createElement('li');
        const nameChild = document.createElement('div');
        nameChild.classList.add('selectable');
        nameChild.innerHTML = doc.id;
        listItems.appendChild(nameChild);
        templateList.append(listItems);
    });

}

templateList.addEventListener('click', function (e) {
    const documentName = e.target.innerText;
    getTemplate(documentName);

});

async function getTemplate(templateName) {
    const templateReference = doc(db, "users", userID, "template", templateName)

    const documentSnapshot = await getDoc(templateReference);

    if (documentSnapshot.exists()) {
       
        const userData = documentSnapshot.data();
        const rx = userData.rx;
       getFormattedRxList(rx);
    }
}
