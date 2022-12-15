import { BaseEntity } from "./BaseEntity.js";
import { Api } from "./Api.js";
import { pagination } from "./pagination.js";
 
//INITIALIZE CONSTS VARIABLES
const API_URL = "https://matchyourgarden.azurewebsites.net";
const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE = 0;




//INITIAGE init() FUNCTION TO DISPLAY PLANTS LIST AND PAGINATION

async function init(){
    
    //INSTANTIATE ViewPlantsData and ApiDataHandler Classes
    const baseEntity = new BaseEntity(new Api(API_URL));
    
    //RENDER INITIAL PLANT LIST
    baseEntity.displayData("plant", "getall", [DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE ])
    
    //RENDER INITIAL PAGINATION
    await pagination("plant", "getall", [DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE]);
   
    //ADD ITEMS PER PAGE FUNCTIONALITY
    document.querySelector(".pagination__per-page").addEventListener("change", async (e)=> {
            await pagination("plant", "getall", [DEFAULT_PAGE, Number(e.target.value)]);
        });
}

init();   

