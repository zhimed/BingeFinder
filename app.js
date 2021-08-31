const form = document.querySelector("#searchForm");
const baseURL = "https://api.tvmaze.com/search/shows?q=";
const showsHolder  = document.querySelector('#shows');
// const map = new Map();


form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    //remove previous children of shows div
    while (showsHolder.firstChild) {
        showsHolder.removeChild(showsHolder.firstChild);
    }

    const searchTerm = form.elements.query.value;
    const results = await axios.get(baseURL+searchTerm);
    for(let show of results.data){
        if(show.show.image){            
            const div = document.createElement('div');
            const img = document.createElement('IMG');
            // const h  = document.createElement('h1');

            // h.textContent  = show.show.name;
            img.src = show.show.image.medium;
            const id = show.show.id;

            // map.set(id,show.show);
            // div.appendChild(h);
            // div.appendChild(img);
            // div.classList.add("show");
            // showsHolder.appendChild(div);
            img.classList.add("image");
            showsHolder.appendChild(img);
        }
    }
})

// showsHolder.addEventListener('click',(e)=>{
//     if(e.target && e.target.nodeName == 'IMG'){
//         console.log(map.get(139).image.medium);
//         console.log("Image clicked")
//     }
// })
