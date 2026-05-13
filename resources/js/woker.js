// worker.js

let brands = [];
self.onmessage = function (e) {


    const { type, data } = e.data;

    if (type === 'initialize') {
        brands = data;
        return;
    }

    if (type === 'search') {

        const query = data.toLowerCase();

        if (!query) {
            self.postMessage([]);
            return;
        }

        // Heavy lifting happens here, away from the UI
        const matches = brands.filter(brand =>
            brand.toLowerCase().includes(query)
        );
        self.postMessage(matches);
    }


};