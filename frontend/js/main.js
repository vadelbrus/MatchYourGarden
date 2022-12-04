import { displayPlants, getDataFromApi } from "./plants.js";
import { pagination } from "./pagination.js";

//INITIALIZE CONSTS VARIABLES
const API_URL = "https://matchyourgarden.azurewebsites.net";
const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE = 0;

//INITIAGE init() FUNCTION TO DISPLAY PLANTS LIST AND PAGINATION

async function init(){

    //ITEMS PER PAGE BUTTON FUNCTIONALITY (pagination__per-page)   
    document.querySelector(".pagination__per-page").addEventListener("change", async (e)=> {
         await pagination(API_URL, "PLANTS", DEFAULT_PAGE, e.target.value);
    });

    //RENDER PLANTS LIST AND PAGINATION

    await displayPlants(API_URL, DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE);
    await pagination(API_URL, "PLANTS", DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE);

    //ADD SEARCH BUTTON FUNCTIONALITY
    document.querySelector(".search-box__button").addEventListener('click', async (e)=> {
        e.preventDefault();
        let inputValue = document.querySelector(".search-box__text").value;
        const plant = await getDataFromApi(API_URL, "SEARCHPLANT", null, null, inputValue);
        console.log(plant)
        inputValue = "";
        
    })
}

init();
