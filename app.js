const form = document.querySelector("#searchForm");
const baseURL = "https://api.tvmaze.com/search/shows?q=";
const genURL = "https://api.tvmaze.com/shows";
const showsHolder  = document.querySelector('#shows');

// get the search term for the url (if available)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('search');


const populateShows = async(searchTerm)=>{
    //remove previous children of shows div
    while (showsHolder.firstChild) {
        showsHolder.removeChild(showsHolder.firstChild);
    }

    const results = await axios.get(baseURL+searchTerm);

    //iterates through shows and creates a poster image for each 
    //that is added to the page
    for(let show of results.data){
        if(show.show.image){            
            const div = document.createElement('div');
            const img = document.createElement('IMG');
 
            img.src = show.show.image.original;
            const id = show.show.id;
            img.id = id.toString();

            img.classList.add("image");
            showsHolder.appendChild(img);
        }
    }
}


//when site is visited random set of shows will be generated and displayed on site

const onStart = async()=>{
        const results = await axios.get(genURL);
        for(let show of results.data){
            if(show.image){            
                const div = document.createElement('div');
                const img = document.createElement('IMG');
            
                img.src = show.image.original;
                const id = show.id;
                img.id = id.toString();

                img.classList.add("image");
                showsHolder.appendChild(img);
            }
        }
    
}



form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const searchTerm = form.elements.query.value;

    //if user submits empty string, do nothing
    if(searchTerm.length == 0){
        return;
    }

    //populate page with search results
    populateShows(searchTerm);
})

//adds event listener for every image, and launches details page for show when poster is clicked
showsHolder.addEventListener('click',(e)=>{
    if(e.target && e.target.nodeName == 'IMG'){
        //launch show.html with the right api endpoint
        window.open("show.html?id="+e.target.id.toString(),"_self");
    }
})


//if there is a search parameter in the url, we will populate the page with the search results
if(search != null){
    populateShows(search);
    
}
//else we populate with random set of shows
else{

    onStart();
}


