var e=document.getElementById(`adviceInput`),t=document.getElementById(`adviceSiggestionList`),n=`
    let doses = [];
    self.onmessage = function(e) {
        const { type, data } = e.data;
        if (type === 'initialize') { 
            advices = data; 
        } else if (type === 'search') {
            self.postMessage(advices);
        }
    };
`;try{let r=new Blob([n],{type:`application/javascript`}),i=new Worker(URL.createObjectURL(r));i.postMessage({type:`initialize`,data:window.advices}),i.onmessage=function(e){console.log(`Worker said:`,e.data);let n=e.data;t.style.display=`block`,t.innerHTML=n.slice(0,100).map(e=>`<li class = "selectable" id = "selectable">${e}</li>`).join(``)},e.addEventListener(`input`,e=>{let n=e.target.value.trim();if(!n){t.style.display=`none`;return}i.postMessage({type:`search`,data:n})})}catch{}