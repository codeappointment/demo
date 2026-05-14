

const advinput = document.getElementById('advinput');
const invsuggestionList = document.getElementById('invsuggestionList');
const suggestion = document.getElementById('suggestion');

const workerCode = `
    let investigations = [];
    self.onmessage = function(e) {
        const { type, data } = e.data;
        if (type === 'initialize') { 
            investigations = data; 
        } else if (type === 'search') {
            const query = data.toLowerCase();
            const matches = investigations.filter(b => b.toLowerCase().includes(query));
            self.postMessage(matches);
        }
    };
`;

try {

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.postMessage({
        type: 'initialize',
        data: window.investigations
    });

    worker.onerror = function (error) {
        suggestion.value = error.message
    };
    worker.onmessage = function (e) {
       
        console.log("Worker said:", e.data);

        const matches = e.data;
        invsuggestionList.style.display = 'block';
        invsuggestionList.innerHTML = matches.slice(0, 100)
            .map(i => `<li class = "selectable" id = "selectable">${i}</li>`)
            .join('');
    };

    advinput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (!query) {
            invsuggestionList.style.display = 'none';
            return;
        }
        worker.postMessage({
            type: 'search',
            data: query
        });
    });


} catch (error) {
    suggestion.value = error.message
}
