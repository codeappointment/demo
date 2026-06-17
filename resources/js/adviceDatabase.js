const adviceInput = document.getElementById('adviceInput');
const adviceSiggestionList = document.getElementById('adviceSiggestionList');

const workerCode = `
    let doses = [];
    self.onmessage = function(e) {
        const { type, data } = e.data;
        if (type === 'initialize') { 
            advices = data; 
        } else if (type === 'search') {
            self.postMessage(advices);
        }
    };
`;

try {

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.postMessage({
        type: 'initialize',
        data: window.advices
    });

    worker.onmessage = function (e) {
       
        const matches = e.data;
        adviceSiggestionList.style.display = 'block';
        adviceSiggestionList.innerHTML = matches.slice(0, 100)
            .map(i => `<li class = "selectable" id = "selectable">${i}</li>`)
            .join('');
    };

    adviceInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (!query) {
            adviceSiggestionList.style.display = 'none';
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
