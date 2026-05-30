var e=document.getElementById(`drugName`),t=document.getElementById(`suggestionList`),n=`
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
`;try{let r=new Blob([n],{type:`application/javascript`}),i=new Worker(URL.createObjectURL(r));i.postMessage({type:`initialize`,data:window.brands}),i.onmessage=function(e){console.log(`Worker said:`,e.data);let n=e.data;t.style.display=`block`,t.innerHTML=n.slice(0,100).map(e=>`<li class = "selectable" id = "selectable">${e}</li>`).join(``)},e.addEventListener(`input`,e=>{let n=e.target.value.trim();if(!n){t.style.display=`none`;return}i.postMessage({type:`search`,data:n})})}catch(e){alertText.innerText=e}