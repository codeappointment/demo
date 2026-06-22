import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { getFirestore, collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";

import { app } from './firebaseAuth.js';
import { signInWithGoogle } from './signin.js';
import { map } from "firebase/firestore/pipelines";


const auth = getAuth(app);
const db = getFirestore(app)
let documentReference;
let userID;
let userDataExists = false;
let activeElement = null;
let forgotPassClicked = false;

// signin
const signinBtn = document.getElementById('signinBtn');

// header left section
const doctorName = document.getElementById('doctorName');
const qualification = document.getElementById('qualification');
const affiliation = document.getElementById('affiliation');
const BMDC = document.getElementById('BMDC');

// patient section
const patientName = document.getElementById('patientName');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
const date = document.getElementById('date');
const phone = document.getElementById('phone')

// header center section 

const specialist = document.getElementById('specialist');

// header right section
const hospitalName = document.getElementById('hospitalName');
const address = document.getElementById('address');
const schedule = document.getElementById('schedule');
const contact = document.getElementById('contact');

// edit item popup layout
const dialog = document.getElementById('myPopup');
const confirmBtn = document.getElementById('confirmBtn');
const label = document.getElementById('label');
const inputField = document.getElementById('popupInput');
const cancelBtn = document.getElementById('cancelButn');
const alertModal = document.getElementById('signinAlert');

// mail pass signup ui popup
const emailPassModal = document.getElementById('loginContainer');
const signinTab = document.getElementById('signinTab');
const signupTab = document.getElementById('signupTab');
const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');
const passConfirmInput = document.getElementById('passConfirmInput');
const passAlert = document.getElementById('passAlert');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const googleSigninBtn = document.getElementById('googleSigninBtn')
const closeModalBtn = document.getElementById('closeModalBtn')
const forgotPass = document.getElementById('forgotPass')

// signin alert popup
const alertLabel = document.getElementById('label');
const cancel = document.getElementById('cancel');
const signin = document.getElementById('signin');

// email verify reload popup
const verifyReloadModal = document.getElementById('verifyReloadModal');
const reloadText = document.getElementById('reloadText');
const reload = document.getElementById('reload');
const deleteUserBtn = document.getElementById('delete')

// druglist
const drugList = document.getElementById('rxList');

// template
const saveTemplateBtn = document.getElementById('saveTemplateBtn');
const templateList = document.getElementById('templateList');

// loading dialogue
const loadingContainer = document.getElementById('loadingContainer');
const loadingText = document.getElementById('loadingText');

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
let isSignUp = false;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // authenticateFromEmail()
        const doctorName = document.getElementById('doctorName')
        // doctorName.innerText = user.displayName;
        userID = auth.currentUser.email
        documentReference = doc(db, "users", userID);

        if (user.emailVerified) {
            getUserDocument(userID);
            getSavedtemplateList();
            signinBtn.innerText = 'Sign out'
            signinBtn.style.background = 'red'
        } else {
            if (!isSignUp) // if not checked, createUser() calls onAuthStateChanged and popup funcion changes
                emailVerifyPopUp(userID) // only to invoke when user did not verify mail and accidentally reloads page
        }

    } else {
        // User is signed out
        basicText();
        signinBtn.innerText = 'Sign in'
        signinBtn.style.background = '#00900c'
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
            // console.log("No such document found!");
            basicText();

        }
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}

function getFormattedRxList(rx) {

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
        dose.innerHTML = rxArray[1];

        items.appendChild(drugName)
            .appendChild(span);
        items.appendChild(dose);
        drugList.append(items)

        drugList.style.display = 'block'

    });
}

async function getformattedInvestigationList(inv) {
    const investigationList = document.getElementById('advList');
    Object.keys(inv).forEach(key => {
        const invArray = inv[key];
        // const htmlOutput = formatRxData(rxArray);
        const items = document.createElement('li');
        // items.textContent = 'some text';
        investigationList.append(items);

        // add check box
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.textContent = invArray;
        items.appendChild(checkbox);

        items.append(invArray);
        investigationList.prepend(items);

    });
}

async function getformattedAdviceList(adv) {
    const adviceList = document.getElementById('adviceList');
    Object.keys(adv).forEach(key => {
        const advArray = adv[key];
        // const htmlOutput = formatRxData(rxArray);
        const items = document.createElement('li');
        // items.textContent = 'some text';
        adviceList.append(items);

        const span = document.createElement('span');
        span.innerHTML = "\u00d7";

        items.append(advArray);
        items.append(span);
        adviceList.prepend(items);

        adviceList.style.display = 'block'
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
saveTemplateBtn.addEventListener('click', () => openModal(saveTemplateBtn, 'a name for this template'));

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

// top sign in
signinBtn.addEventListener('click', () => {


    if (!auth.currentUser) {
        // signInWithGoogle();
        emailPassModal.showModal();
    } else {
        auth.signOut()
        window.location.reload()
    }

});

// signin popup
signin.addEventListener('click', () => {
    // signInWithGoogle();
    emailPassModal.showModal()
    alertModal.close();
});


// signin popup
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
        if (activeElement !== saveTemplateBtn) // excluding text update of template button
            activeElement.innerText = val;
        if (auth.currentUser) {
            if (activeElement !== saveTemplateBtn) // exclude for updatDoc function call
                createUpdateData(activeElement, val);
            else saveTemplate(val)
        }

    }

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
        dialog.close();

        if (field !== age && field !== gender && field !== patientName && field !== saveTemplateBtn) {
            // for header content update
            loadingMsg('Submitting data...')
            updateDoc(documentReference, data)
                .then(() => {
                    loadingContainer.close();
                    getUserDocument(userID);
                    showSuccessToast('Data update success !')
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

        }

    } else {
        dialog.close();

        // for header content update
        if (field !== age && field !== gender && field !== patientName && field !== saveTemplateBtn) {
            loadingMsg('Submitting data...')
            setDoc(documentReference, data)
                .then(() => {
                    loadingContainer.close();
                    getUserDocument(userID);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    }

}

const downloadBtn = document.getElementById('download');
downloadBtn.addEventListener('click', () => {
    const phoneNumber = phone.value;
    if (phoneNumber !== '') {
        sendPrescriptionData(phoneNumber);
    } else {
        phone.classList.add('has-error')
    }

});

phone.addEventListener('input', () => {
    phone.classList.remove('has-error')
})

function sendPrescriptionData(phoneNumber) {

    const prescriptionReference = doc(db, 'prescription', phoneNumber);

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
        docID: userID,
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
        // console.log('Prescription submitted!')
    })
}


function saveTemplate(templateName) {

    loadingMsg('Saving template...')
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
            itemObject[i] = li.children[i].textContent.replace(/×/g, '');
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

    dialog.close();
    setDoc(prescriptionReference, prescriptionData).then(() => {
        loadingContainer.close()
        getSavedtemplateList(userID);
        showSuccessToast('Template saved !')
    });
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

                // console.log('setting saved');
            });
    } else { alertModal.showModal() }
})


async function getSavedtemplateList() {

    const querySnapshot = await getDocs(collection(db, "users", userID, "template"));
    const savedHolder = document.getElementById('savedHolder');

    templateList.innerHTML = '';
    if (!querySnapshot.empty) {

        savedHolder.style.visibility = 'visible'
        querySnapshot.forEach((doc) => {

            const listItems = document.createElement('li');
            const nameChild = document.createElement('div');
            const span = document.createElement('span');
            span.innerHTML = " \u00d7";
            nameChild.classList.add('selectable');
            nameChild.innerHTML = doc.id;
            listItems.appendChild(nameChild)
                .appendChild(span);
            templateList.append(listItems);
        });
    } else {
        savedHolder.style.visibility = 'hidden'
        // console.log('empty')
    }
}

templateList.addEventListener('click', function (e) {
    const li = e.target.closest('li');
    const documentName = li.textContent.replace(/×/g, '').trim(); // if not replaced, takes × as part of document name
    if (e.target.tagName !== "SPAN") {

        getTemplateData(documentName);
    } else {

        deleteAlert(documentName);
    }

});

function deleteAlert(documentName) {
    const deleteAlert = document.getElementById('deleteAlert');
    const labelText = document.getElementById('labelText');
    const cancelDel = document.getElementById('cancelDel');
    const deleteBtn = document.getElementById('deleteBtn');

    const boldElement = document.createElement('strong')
    boldElement.innerText = documentName;
    labelText.innerHTML = 'Delete template <strong>' + documentName + '</strong>?';
    deleteAlert.showModal();

    deleteBtn.onclick = () => {
        deleteAlert.close();
        removeTemplate(documentName);
    };
    cancelDel.onclick = () => {
        deleteAlert.close();
    };

}

async function removeTemplate(templateName) {
    const templateReference = doc(db, "users", userID, "template", templateName);
    loadingMsg('Deleting template...')
    deleteDoc(templateReference)
        .then(() => {
            loadingContainer.close()
            getSavedtemplateList();
            // console.log('deleted');
            showSuccessToast('Template deleted !');
        });
}

async function getTemplateData(templateName) {
    loadingMsg('Loading template...');
    const templateReference = doc(db, "users", userID, "template", templateName)

    const documentSnapshot = await getDoc(templateReference);

    if (documentSnapshot.exists()) {

        const userData = documentSnapshot.data();
        const rx = userData.rx;
        const inv = userData.inv;
        const adv = userData.adv;
        getFormattedRxList(rx);
        getformattedInvestigationList(inv);
        getformattedAdviceList(adv);
        loadingContainer.close();
    } else {

    }
}

function showSuccessToast(message) {
    const container = document.getElementById('toast-container');

    // Create toast element
    const toast = document.createElement('div');
    if (message.includes('delete')) toast.style.background = "red"
    toast.className = 'toast';
    toast.innerText = message;

    // Append to container
    container.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        // Wait for the slide-out animation to finish before removing from DOM
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function showLoadingToast(message) {
    const container = document.getElementById('toast-container');

    // Create toast element
    const toast = document.createElement('div');
    if (message.includes('delete')) toast.style.background = "red"
    toast.className = 'toast';
    toast.innerText = message;

    // Append to container
    container.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        // Wait for the slide-out animation to finish before removing from DOM
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function loadingMsg(message) {
    loadingText.innerHTML = '<strong>' + message + '</strong>'
    loadingContainer.showModal();
}

// firebase email pass function

signinTab.onclick = () => {
    passConfirmInput.style.visibility = 'hidden'
    btnText.innerText = 'Sign in'
    signinTab.classList.add('active')
    signupTab.classList.remove('active')
    document.getElementById('headerText').innerText = 'Sign in'
    isSignUp = false;
};

signupTab.onclick = () => {
    passConfirmInput.style.visibility = 'visible'
    btnText.innerText = 'Submit'
    signupTab.classList.add('active')
    signinTab.classList.remove('active')
    document.getElementById('headerText').innerText = 'Sign Up'
    isSignUp = true
};

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
    }
});

submitBtn.onclick = () => {
    getCredentials()

    // createUsers or login from sign in credential
}

passConfirmInput.addEventListener('input', function () {
    passAlert.style.visibility = 'hidden'
    passConfirmInput.style.background = '#ececec'
});

passInput.addEventListener('input', function () {
    passAlert.style.visibility = 'hidden'
    passInput.style.background = '#ececec'
});

emailInput.addEventListener('input', function () {
    passAlert.style.visibility = 'hidden'
    emailInput.style.background = '#ececec'
});

googleSigninBtn.onclick = () => {
    signInWithGoogle()
    emailPassModal.close()
}

closeModalBtn.onclick = () => {
    emailPassModal.close();
    emailPassModalReset()
}
forgotPass.onclick = () => {
    forgotPassClicked = true;
    passInput.style.display = 'none'
    passConfirmInput.style.display = 'none'
    googleSigninBtn.style.display = 'none'
    signinTab.style.display = 'none'
    signupTab.style.display = 'none'
    document.getElementById('divider').style.display = 'none'
    document.getElementById('headerText').innerText = 'Enter your email'
    forgotPass.style.display = 'none'
    btnText.innerText = 'Send password reset link';
    if (forgotPassClicked) // this will prevent sending pass reset mail when try to login
        submitBtn.onclick = () => {
            submitBtn.classList.add('loading')
            const emailForPassReset = emailInput.value
            const validEmail = validateEmail(emailForPassReset)
            if (validEmail) {
                forgotPassClicked = false;
                sendPasswordResetEmail(auth, emailForPassReset)
                    .then(() => {
                        submitBtn.classList.remove('loading')
                        emailPassModalReset()
                        emailPassModal.close()
                        verifyReloadModal.showModal()
                        reloadText.innerHTML = 'An email with reset link hase been sent to <b>' + emailForPassReset + '</b>. Open <b>SPAM</b> folder of your email'
                        deleteUserBtn.style.display = 'none'
                        reload.innerText = 'OK'
                        reload.onclick = () => {
                            window.location.reload()
                        }
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage)
                        // ..
                    });
            } else {
                emailInput.style.backgroundColor = '#ffb5b5'
            }
        }
}

function emailPassModalReset() {
    emailInput.style.background = '#ececec'
    passInput.style.background = '#ececec'
    passConfirmInput.style.background = '#ececec'
    emailInput.value = ''
    passInput.value = ''
    passConfirmInput.value = ''
    passInput.style.display = 'block'
    passConfirmInput.style.display = 'block'
    googleSigninBtn.style.display = 'block'
    signinTab.style.display = 'block'
    signupTab.style.display = 'block'
    document.getElementById('divider').style.display = 'block'
    forgotPass.style.display = 'block'
    if (isSignUp) {
        document.getElementById('headerText').innerText = 'Sign Up'
        btnText.innerText = 'Submit'
    } else {
        document.getElementById('headerText').innerText = 'Sign in'
        btnText.innerText = 'Sign in'
    }
    passAlert.style.visibility = 'hidden'

}

function validateEmail(email) {
    // Standard regular expression pattern for emails
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Returns true if the email matches the pattern, false if it doesn't
    return emailPattern.test(email);
}

// sign in with email paas or google sign in 
async function getCredentials() {

    const userEmail = emailInput.value;
    const userPass = passInput.value;
    const userPassConfirm = passConfirmInput.value;

    if (isSignUp) {

        // match confirm password
        const validEmail = validateEmail(emailInput.value);
        if (!validEmail) {
            emailInput.style.background = '#facaca'
            passAlert.innerText = 'Enter valid Email'
            passAlert.style.visibility = 'visible'
        } else if (emailInput.value !== '' && passInput.value !== '' && passConfirmInput.value !== '') {
            if (userPass !== userPassConfirm) {
                passConfirmInput.style.background = '#facaca'
                passAlert.style.visibility = 'visible'
                submitBtn.classList.remove('loading');
                btnText.innerText = "Submit";
            } else {
                // create new user
                submitBtn.classList.add('loading');

                // 2. Change the text to show active progress
                btnText.innerText = "Signing In...";
                createUser(userEmail, userPass)
            }
        } else {
            if (emailInput.value === '') emailInput.style.background = '#facaca'
            if (passInput.value === '') passInput.style.background = '#facaca'
            if (passConfirmInput.value === '') passConfirmInput.style.background = '#facaca'
        }
    } else {

        // login with existing user
        const validEmail = validateEmail(emailInput.value);
        if (!validEmail) {
            emailInput.style.background = '#facaca'
            passAlert.innerText = 'Enter valid Email'
            passAlert.style.visibility = 'visible'
        } else if (emailInput.value !== '' && passInput.value !== '') {
            submitBtn.classList.add('loading');

            // 2. Change the text to show active progress
            btnText.innerText = "Signing In...";
            loginUser(userEmail, userPass)
        } else {
            if (emailInput.value === '') emailInput.style.background = '#facaca'
            if (passInput.value === '') passInput.style.background = '#facaca'
        }

    }

}

async function createUser(email, password) {

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            // console.log(user.email)

            emailPassModal.close();
            verifyReloadModal.showModal();
            reloadText.innerHTML = 'An email with verification link has been sent to <b>' + user.email + '</b>. ' + ' Check <b>SPAM</b> folder. Click the verification link. After verification success, reload this page.'

            sendEmailVerification(auth.currentUser)
                .then(() => {

                    deleteUserBtn.onclick = () => {
                        deleteUserBtn.classList.add('loading')
                        deleteUser(auth.currentUser)

                            .then(() => {
                                deleteUserBtn.classList.remove('loading')
                                verifyReloadModal.close()
                                window.location.reload()
                            })
                            .catch((error) => {
                                deleteUserBtn.classList.remove('loading')
                                auth.signOut()
                                verifyReloadModal.close()
                                console.error("Error deleting user:", error.message);
                            });
                    }
                    reload.onclick = () => {
                        reload.classList.add('loading')
                        user.reload().then(() => {
                            if (user.emailVerified) {
                                reload.classList.remove('loading')
                                verifyReloadModal.close();
                                getUserDocument(userID);
                                getSavedtemplateList();
                                signinBtn.innerText = 'Sign out'
                                signinBtn.style.background = 'red'
                            } else {
                                reloadText.innerText = 'You haven\'t clicked the verification link sent to your email spam!'
                                reloadText.style.color = 'red'
                                reload.classList.remove('loading')
                            }
                        })

                    }
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            passAlert.style.visibility = 'visible'
            passAlert.innerText = errorMessage
            submitBtn.classList.remove('loading')
            btnText.innerText = 'Submit'
        });
}

function emailVerifyPopUp(email) {
    verifyReloadModal.showModal();
    reloadText.innerHTML = '<b>' + email + '</b>' + ' is not verified'
    reload.innerText = 'Send verification email'

    deleteUserBtn.onclick = () => {
        deleteUserBtn.classList.add('loading')
        deleteUser(auth.currentUser)

            .then(() => {
                deleteUserBtn.classList.remove('loading')
                verifyReloadModal.close()
                window.location.reload()
            })
            .catch((error) => {
                deleteUserBtn.classList.remove('loading')
                auth.signOut()
                verifyReloadModal.close()
            });
    }
    reload.onclick = () => {
        reload.classList.add('loading')
        sendEmailVerification(auth.currentUser)
            .then(() => {
                reload.innerText = 'Reload page'
                reloadText.innerHTML = 'An email with verification link has been sent to <b>' + auth.currentUser.email + '</b>. Open <b>SPAM</b> forlder. Click the verification link. After verification success, reload this page.'
                reload.classList.remove('loading')
                reload.onclick = () => {
                    reload.classList.add('loading')
                    auth.currentUser.reload().then(() => {
                        if (auth.currentUser.emailVerified) {
                            reload.classList.remove('loading')
                            verifyReloadModal.close();
                            getUserDocument(userID);
                            getSavedtemplateList();
                            signinBtn.innerText = 'Sign out'
                            signinBtn.style.background = 'red'
                        } else {
                            reloadText.innerText = 'You haven\'t clicked the verification link sent to your email spam!'
                            reloadText.style.color = 'red'
                            reload.classList.remove('loading')
                        }
                    })
                }
            })
    }
}

async function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            // console.log(user.email)
            emailPassModal.close()
            getUserDocument()
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            passAlert.style.visibility = 'visible'
            passAlert.innerText = 'Email or password did not match'
            submitBtn.classList.remove('loading')
            btnText.innerText = 'Sign in'
        });
}

