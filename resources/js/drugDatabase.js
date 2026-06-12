

const drugNameInput = document.getElementById('drugName');
const editInput = document.getElementById('editInput');
const suggestionList = document.getElementById('suggestionList');
const editsuggestionList = document.getElementById('editsuggestionList');

const workerCode = `
    let brands = [];
    self.onmessage = function(e) {
        const { type, data } = e.data;
        if (type === 'initialize') { 
            brands = data; 
        } else if (type === 'search') {
            const query = data.toLowerCase();
            const matches = brands.filter(b => b.toLowerCase().includes(' '+query));
            self.postMessage(matches);
        }
    };
`;

try {

    const blob = new Blob([workerCode], { type: 'application/javascript' });

    const worker = new Worker(URL.createObjectURL(blob));
    worker.postMessage({
        type: 'initialize',
        data: window.brands
    });

    worker.onmessage = function (e) {
        console.log("Worker said:", e.data);

        const matches = e.data;
        if (drugNameInput.value !== '') {
            suggestionList.style.display = 'block';
            suggestionList.innerHTML = matches.slice(0, 100)
                .map(i => `<li class = "selectable" id = "selectable">${i}</li>`)
                .join('');
        } else {
            editsuggestionList.style.display = 'block';
            editsuggestionList.innerHTML = matches.slice(0, 100)
                .map(i => `<li class = "selectable" id = "selectable">${i}</li>`)
                .join('');
        }
    };

    drugNameInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (!query) {
            suggestionList.style.display = 'none';
            return;
        }
        worker.postMessage({
            type: 'search',
            data: query
        });
    });

    editInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (!query) {
            editsuggestionList.style.display = 'none';
            return;
        }
        worker.postMessage({
            type: 'search',
            data: query
        });
    });


} catch (error) {
    alertText.innerText = error
}
