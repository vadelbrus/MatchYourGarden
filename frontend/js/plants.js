;
import { ApiDataHandler } from "./api.js";

export const generatePlantsList = (plantsData)=> {
    
    const tbody = document.querySelector(".list__body");
    tbody.innerHTML = "";
    plantsData.forEach(plant => {
        
        const tr = document.createElement("tr");
        tr.classList.add("list__row");
        tr.innerHTML = `<td class="list__row-cell list__row-name">${plant.name}</td><td class="list__row-cell list__row-latin">${plant.latinName}</td><td class="list__row-cell list__row-link"><a href="/plant-card.html?id=${plant.id}" class="list__link"></a>details</td>`;
        tbody.appendChild(tr);
               
    });

}

export const getIdFromParams = (value)=> { 
    return new URLSearchParams(window.location.search).get(value);
  }

export const plantHtmlTemplate = (plant) => {
    return `<article class="main__card card">
                <div class="card__title-group">
                    <h2 class="card__title">${plant.name}</h2>
                    <p class="card__info"><span class="card__author"></span><time class="card__date">${plant.dateCreated}</time></p>
                </div>
                <div class="card__labels">
                    <p class="card__label">${plant.latinName}</p>
                    <p class="card__label"></p>
                    <p class="card__label"></p>
                </div>
                <p class="card__description"></p>
            </article>`
}

export const displayPlantInfo = async (url, htmlElement ) => {
    const id = getIdFromParams('id');
    const plant = await getDataFromApi(url, "SEARCHPLANT", null, null, id);
    
    htmlElement.innerHTML = plantHtmlTemplate(plant.data);
    
};

export const getDataFromApi = async (url, method, page, itemsPerPage, id)=> {
    
    return new ApiDataHandler(url, method, page, itemsPerPage, id);
}

export const displayPlants = async (url, skip, count)=> {
    const plants = await getDataFromApi(url, "PLANTS" , skip, count);
    const plantsData = plants.data;
    
    generatePlantsList(plantsData);
    
}
