

const doseInput = document.getElementById('dose');
const dosesList = document.getElementById('dosesList');

const workerCode = `
    let doses = [];
    self.onmessage = function(e) {
        const { type, data } = e.data;
        if (type === 'initialize') { 
            doses = data; 
        } else if (type === 'search') {
            self.postMessage(doses);
        }
    };
`;

try {

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.postMessage({
        type: 'initialize',
        data: window.doses
    });

    worker.onmessage = function (e) {
       
        console.log("Worker said:", e.data);

        const matches = e.data;
        dosesList.style.display = 'block';
        dosesList.innerHTML = matches.slice(0, 100)
            .map(i => `<li class = "selectable" id = "selectable">${i}</li>`)
            .join('');
    };

    doseInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (!query) {
            dosesList.style.display = 'none';
            return;
        }
        worker.postMessage({
            type: 'search',
            data: query
        });
    });


} catch (error) {
    // 
}
