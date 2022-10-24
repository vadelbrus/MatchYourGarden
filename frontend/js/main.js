import { getPlant, displayPlants, pagination} from "./plants.js";



const api_url = "https://matchyourgarden.azurewebsites.net";

const DEFAULT_PAGE = 0;
const DEFAULT_ITEMS_PER_PAGE = 10;

async function init(){
    const plantsServersettings = await displayPlants(api_url, DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE);
    console.log(plantsServersettings)
    await pagination(api_url, plantsServersettings.skip, plantsServersettings.count);
    
    document.querySelector(".search-box__button").addEventListener('click', async (e)=> {
        e.preventDefault();
        const input = document.querySelector(".search-box__text");
        const inputValue = input.value;
        console.log(input)
        const plant = await getPlant(inputValue);
        input.value = "";

        
        
        
    })

   

}

init();