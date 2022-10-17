import { getPlant, displayPlants} from "./plants.js";


const api_url = "https://matchyourgarden.azurewebsites.net";


async function init(){
    await displayPlants(api_url)
    
    document.querySelector(".search-box__button").addEventListener('click', async (e)=> {
        e.preventDefault();
        const input = document.querySelector(".search-box__text");
        const inputValue = input.value;
        console.log(input)
        const plant = await getPlant(inputValue);
        input.value = "";

        console.log(plant)
        
    })

   

}

init();