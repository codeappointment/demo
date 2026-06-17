
// header left section
const patientName = document.getElementById('patientName');
const age = document.getElementById('age');
const date = document.getElementById('date');

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


// drugInput layout items

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
const addAdvice = document.getElementById('addAdvice');

//edit drug  popup
const drugEdit = document.getElementById('drugEdit');
const cancelEdit = document.getElementById('cancelEdit');
const confirmEdit = document.getElementById('confirmEdit');
const editlabel = document.getElementById('editlabel');
const editInput = document.getElementById('editInput');
const drugEditSection = document.getElementById('drugEditSection');
const durationEdit = document.getElementById('durationEdit');
const editDayWeekMonth = document.getElementById('editDayWeekMonth');
const editMealRelation = document.getElementById('editMealRelation');
const editSuggestion = document.getElementById('editSuggestion')

document.addEventListener('keydown', confirm);
document.addEventListener('keydown', cancel);

const currentDate = new Date();
date.innerText = currentDate.toLocaleDateString('en-GB');

ccinput.addEventListener('input', () => {

    if (ccinput.value !== '') {
        addcc.style.background = '#5ccf6b'
        addcc.innerText = '\u2794'

    } else {
        resetActiveBtn(addcc);
    }

});

oeinput.addEventListener('input', () => {

    if (oeinput.value !== '') {
        addoe.style.background = '#5ccf6b'
        addoe.innerText = '\u2794'
    } else {
        resetActiveBtn(addoe)
    }

});

advinput.addEventListener('input', () => {

    if (advinput.value !== '') {
        addadv.style.background = '#5ccf6b'
        addadv.innerText = '\u2794'
    } else {
        resetActiveBtn(addadv)
    }

});

addcc.addEventListener('click', () => {

    const newListItem = ccinput.value;
    if (ccinput.value.trim() === '') return;
    addtoListItems(newListItem, cclist, ccinput);
    resetActiveBtn(addcc)
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
    resetActiveBtn(addoe)
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
    resetActiveBtn(addadv)
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
    if (suggestion.value !== '') suggest = " | " + suggestion.value;
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
});

drugSuggestionList.addEventListener('click', function (e) {
    drugNameInput.value = e.target.innerHTML;
    drugSuggestionList.style.display = 'none'
});

editsuggestionList.addEventListener('click', function (e) {
    editInput.value = e.target.innerHTML;
    editsuggestionList.style.display = 'none'
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

// const drugList = getElementById('rxList');
let targetElement;
drugList.addEventListener('click', function (e) {
    // Check if the clicked element is a SPAN
    if (e.target.tagName === "SPAN") {
        // Remove the parent <li> element
        e.target.closest('li').remove();
        if (drugList.children.length === 0) {
            drugList.style.display = 'none';
        }
    }

    if (e.target.tagName === "STRONG") {
        editlabel.innerText = 'Edit drug'
        editInput.value = e.target.innerText.replace(/×/g, '').trim();
        targetElement = e.target
        drugEdit.showModal();
        drugNameInput.value = ''
        drugEditSection.style.display = 'none'
    }

    if (e.target.tagName === "DIV") {
        editlabel.innerText = 'Edit dose'
        editInput.value = e.target.innerText
        targetElement = e.target
        drugEdit.showModal();
        drugNameInput.value = '' // to clear druginput layout drugname input
        drugEditSection.style.display = 'block'
        const newInput = editInput.value;
        const stringPart = newInput.split('|').map(item => item.trim());
        editInput.value = stringPart[0] // 1+0+1
        durationEdit.value = stringPart[2].slice(0, 2).trim() // ৭ দিন
        editDayWeekMonth.value = stringPart[2].slice(2).trim() // দিন মাস চলবে 

        if (stringPart[1] === "খাবার আগে") document.getElementById('editbm').checked = true
        else document.getElementById('editam').checked = true

        editSuggestion.value = stringPart[3] || '' // জ্বর থাকলে

        for (let i = 1; i <= 30; i++) {
            const option = document.createElement('option');

            option.value = enToBn(i);
            option.textContent = enToBn(i);

            durationEdit.appendChild(option)
        }
    }

});

cancelEdit.addEventListener('click', () => {
    drugEdit.close();
});
confirmEdit.addEventListener('click', () => {
    const newInput = editInput.value;

    if (targetElement.tagName === "STRONG")
        targetElement.innerHTML = newInput + '<span>×</span>'
    else {
        const stringPart = newInput.split('|').map(item => item.trim());
        console.log(stringPart[0])
        targetElement.innerHTML = newInput

        // getting form data

        const data = new FormData(editMealRelation);
        const editmealStatus = data.get('editmealTime');

        let suggest;

        let durationValue = durationEdit.value;
        if (editSuggestion.value !== '') suggest = " | " + editSuggestion.value;
        else suggest = '';

        if (editDayWeekMonth.value === 'চলবে') {
            durationValue = '-';
        }

        const dose = document.createElement('div');
        dose.classList.add('kalpurush');
        dose.innerHTML = editInput.value +
            " | " +
            editmealStatus +
            " | " +
            durationValue +
            " " +
            editDayWeekMonth.value +

            suggest;

        targetElement.innerHTML = dose.innerText
    }


    drugEdit.close();
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



function confirm(event) {
    if (event.key === 'Enter') {
        addcc.style.background = '#d1d1d1'
        addoe.style.background = '#d1d1d1'
        addadv.style.background = '#d1d1d1'
        resetActiveBtn(addcc)
        resetActiveBtn(addoe)
        resetActiveBtn(addadv)
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

function resetActiveBtn(button) {
    button.style.background = '#d1d1d1'
    button.innerText = '+'
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

// print pdf 

// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';

// html2canvas(document.querySelector("#prescription")).then(canvas => {
//     document.body.appendChild(canvas);
// });

// const pdf = new jsPDF('p', 'mm', 'a4'); // Explicitly defining A4 layout
// const download = document.getElementById('download');
// const page = document.getElementById('page');


const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
);
const downloadBtn = document.getElementById('download');
const element = document.getElementById('page');

mobileDownload();
function mobileDownload() {
    document.addEventListener('DOMContentLoaded', () => {

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                mobileDesktopView();

                togglePrint();
                // 1. Visual feedback (Optional: Change button text while processing)
                downloadBtn.innerText = "Generating PDF...";
                downloadBtn.disabled = true;

                // 2. Options for high-quality rendering
                const options = {
                    scale: 2,             // Sharpens text and images (retina quality)
                    useCORS: true,        // Allows loading external assets/images if any
                    logging: false        // Turns off console spam
                };

                // 3. Render HTML to Canvas
                html2canvas(element, options).then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');

                    // 4. Initialize jsPDF (A4 Portrait, measurements in millimeters)
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF('p', 'mm', 'a4');

                    // A4 dimensions
                    const pdfWidth = 210;
                    const pdfHeight = 297;

                    // Calculate responsive height keeping aspect ratio intact
                    const imgWidth = pdfWidth;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    // 5. Add image to PDF and trigger save
                    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                    const patientName = document.getElementById('patientName');
                    const age = document.getElementById('age');
                    const pdfName = patientName.innerText + ' ' + age.innerText;
                    pdf.save(pdfName + '.pdf');

                    // 6. Restore button state
                    downloadBtn.innerText = "Download Prescription PDF";
                    downloadBtn.disabled = false;
                    window.location.reload();
                }).catch((error) => {
                    console.error("PDF generation failed:", error);
                    downloadBtn.innerText = "Download Failed";
                    downloadBtn.disabled = false;
                });
            });
        }
    });
}

function togglePrint() {
    // download.style.display = 'none'

    ccinput.style.display = 'none'
    cclist.style.background = 'none'
    addcc.style.display = 'none'

    oeinput.style.display = 'none'
    oelist.style.background = 'none'
    addoe.style.display = 'none'

    advinput.style.display = 'none'
    addadv.style.display = 'none'
    adviceList.style.background = 'none'

    adviceInput.style.display = 'none'
    addAdvice.style.display = 'none'
    investigationList.style.background = 'none'

    const additionalHeader = document.getElementById('additionalHeader')
    additionalHeader.style.background = 'none'
    additionalHeader.style.border = 'none'

    addDrug.style.display = 'none'
    const durgInputLayout = document.getElementById('durgInputLayout')
    durgInputLayout.style.display = 'none'
    const rxList = document.getElementById('rxList')
    rxList.style.background = 'none'
    adviceSiggestionList.style.background = 'none'

    // Get all span elements on the page
    const spans = document.querySelectorAll('span');

    spans.forEach(span => {
        // Check if the text inside matches the '×' close symbol
        if (span.textContent === '×') {
            span.style.display = 'none';
        }
    });

    const inputs = document.querySelectorAll('input');

    // Example: Hide all checkboxes
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.display = 'none';
        } else {
            input.style.border = 'none';
        }
    });


    const checkboxs = document.querySelectorAll('input');

    checkboxs.forEach(input => {
        const listItem = input.closest('li');

        if (input.type === 'checkbox') {
            // If it's a checkbox and it is NOT checked, hide the entire li
            if (!input.checked) {
                listItem.style.display = 'none';
            } else {
                input.style.display = 'none'
            }
        }
    });
}

// prevent cltr+P
window.addEventListener('keydown', function (e) {
    // Check if 'P' key is pressed
    const isPKey = e.key === 'p' || e.key === 'P' || e.keyCode === 80;

    // Detect Ctrl (Windows) or Cmd (Mac)
    const isControlKey = e.ctrlKey || e.metaKey;

    if (isControlKey && isPKey) {
        // 1. Stop the browser's default print dialog from opening
        e.preventDefault();

        // 2. Trigger your custom print action/button click
        // triggerCustomPrint(); 
    }
});

// force mobile to load desktop view
function mobileDesktopView() {
    let viewport = document.querySelector('meta[name="viewport"]');

    // 2. If it doesn't exist, create one
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
    }

    // 3. Set the content to match how mobile browsers render desktop sites
    // We set a fixed desktop width and allow user zooming.
    viewport.setAttribute('content', 'width=1024, initial-scale=0.25, minimum-scale=0.25, maximum-scale=5.0, user-scalable=yes');
}
// Force reload a script on every page load via JavaScript
const script = document.createElement('script');
script.src = "/resources/js/app.js?v=" + new Date().getTime(); // Appends unique timestamp
document.head.appendChild(script);
window.addEventListener("pageshow", function (event) {
    // If the page was loaded from the browser history/cache cache, force a hard reload
    if (event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2)) {
        window.location.reload();
    }
});

document.addEventListener('click', function (event) {
    // Check if the clicked element is inside the search container
    const isDrugSearched = drugNameInput.contains(event.target);
    const isCcSearched = ccinput.contains(event.target);
    const isOeInput = oeinput.contains(event.target);
    const isAdvSearched = advinput.contains(event.target);
    const isAdviceSearched = adviceInput.contains(event.target);
    const isDoseSearched = doses.contains(event.target);

    if (!isDrugSearched) {
        // Clicked outside! Hide the list
        drugSuggestionList.style.display = 'none';
    }
    if (!isCcSearched) {
        // Clicked outside! Hide the list
        ccsuggestionList.style.display = 'none';
    }
    if (!isOeInput) {
        // Clicked outside! Hide the list
        // oeSuggestionList.style.display = 'none';
    }
    if (!isAdvSearched) {
        // Clicked outside! Hide the list
        invsuggestionList.style.display = 'none';
    }
    if (!isAdviceSearched) {
        // Clicked outside! Hide the list
        adviceSiggestionList.style.display = 'none';
    }
    if (!isDoseSearched) {
        // Clicked outside! Hide the list
        dosesList.style.display = 'none';
    }
});

