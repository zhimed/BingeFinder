// get the id of the current show
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
// console.log(id);

//form together url for appropriate api endpoint
const baseURL = "https://api.tvmaze.com/shows/" + id;
const seasonsUrl = "https://api.tvmaze.com/shows/" + id + "/seasons";
const castURL = "https://api.tvmaze.com/shows/" + id +"/cast";


const poster = document.querySelector('.poster');
const title = document.querySelector('#title');
const genre = document.querySelector('#genre');
const rating = document.querySelector('#rating');
const language = document.querySelector('#language');
const plot = document.querySelector('#plot');

//adds all the details of the show to the page
const populateShow = async ()=>{
    const results = await axios.get(baseURL);
    const numSeasons = await getSeasons();
    const span = document.createElement('span');
    const tabTitle = document.querySelector('title');

    tabTitle.textContent = results.data.name;
    poster.src = results.data.image.original;
    title.textContent = results.data.name;

    if(numSeasons > 1){
        span.textContent = "  (" + numSeasons.toString() + " seasons)";
    }else{
        span.textContent = "  (" + numSeasons.toString() + " season)";
    }

    span.classList.add("seasons");

    //adds number of seasons next to the title of the show
    title.appendChild(span);

    // creating buttons for all the genres
    for(let nextGenre of results.data.genres){
        const btn = document.createElement('button');
        btn.textContent = nextGenre;
        btn.classList.add('genreBtn');
        genre.appendChild(btn);
    }

    const ratingBtn = document.createElement('button');

    //creating button for rating if the api endpoint has that info
    if(results.data.rating.average){
        ratingBtn.textContent = results.data.rating.average;
    }else{
        ratingBtn.textContent = "Not Available";
    }

    //creating button for language of show
    const langBtn = document.createElement('button');
    langBtn.textContent = results.data.language;

    ratingBtn.classList.add('genreBtn');
    langBtn.classList.add('genreBtn');

    rating.append(ratingBtn);
    language.append(langBtn);

    plot.innerHTML += results.data.summary;
}


const cast = document.querySelector(".cast");

//adds all the cast members of the given show
const populateCast = async ()=>{
    const results = await axios.get(castURL);

    for(let member of results.data){
        const div = document.createElement('div');
        const img = document.createElement('IMG');
        const name = document.createElement('p');
        const character = document.createElement('p');

        img.src = member.person.image.original;
        name.textContent = member.person.name;

        let r = splitCastRoles(member.character.name);
        character.innerHTML = r;

        img.classList.add("castPic");
        name.classList.add("castName");
        character.classList.add("castCharacter");

        div.appendChild(img);        
        div.appendChild(character);
        div.appendChild(name);
        div.classList.add("castMember")
        cast.appendChild(div);
    }
}

//gets number of seasons for show
const getSeasons = async ()=>{
    const results = await axios.get(seasonsUrl);
    return  results.data.length;
}


//function for formatting purposes for the different roles of each character
const splitCastRoles = (s)=>{
    let res = "";
    for(let i = 0; i < s.length; i++){
        res += s[i];
        if(s[i] == '/'){
            res += '<br/>';
        }
    }
    return res;
}

populateShow();
populateCast();

const form = document.querySelector("#searchForm");

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const searchTerm = form.elements.query.value;

    if(searchTerm.length == 0){
        return;
    }

    //call original html file and send searchterm as parameter
    window.open("index.html?search="+searchTerm,"_self");

})
