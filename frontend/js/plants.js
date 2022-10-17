export const getPlant = async (plantId) => {
    
    const PLANT_URL = `https://matchyourgarden.azurewebsites.net/Plant/get/${plantId}`;
    
    try {
        const response = await fetch(PLANT_URL);
        
        
        
        if(!response.ok) {
           
            
            throw new Error(`Error! status: ${response.text}`);
        }

        const data = await response.json();
        
        console.log(data)
        return data
        
        
    }
    catch (err) {
        
        alert(err.name)
        
    }

}

export const getPlants = async (url, skip, count) => {
    try {
        const response = await fetch(`${url}/plant/getall/${skip}/${count}`);
        
        
        if(!response.ok) {
           
            
            throw new Error(`Error! status: ${response.text}`);
        }

        const data = await response.json();
        // console.log(data)
        
        return data
        
        
    }
    catch (err) {
        
        alert(err.name)
        
    }

}

// export const generatePlantsTable = (plantsData, parentElement)=> {
//     let table = '<table class="section__plants-table plants-table">';
//     table +='<thead class="plants-table__head"><tr class="plants-table__row"><th class="plants-table__header">Name</th><th class="plants-table__header">Latin Name</th></tr></thead><tbody class="plants-table__body">';
//     plantsData.forEach((plantsData) => {
//         table+=`<tr class="plants-table__row">                    
//                     <td class="plants-table__cell">${plantsData.name}</td>
//                     <td class="plants-table__cell">${plantsData.latinName}</td>
//                     <td class="plants-table__cell"><a plants-table__link-wrapper><a plants-table__link>details</a></a></td>
//             </tr>`;
//     });

//     table+= '</tbody></table>';
//     parentElement.innerHTML = table;


    
// }

export const generatePlantsList = (plantsData, parentElement)=> {
    const ul = document.createElement('ul');
    ul.classList.add('section__plants-list', 'plants-list');
    plantsData.forEach((plantsData) => {
        const li = document.createElement('li');
        li.classList.add('plants-list__item')
        li.innerHTML = `
        <span class="plants-list__name">${plantsData.name}</span>
        <span class="plants-list__latin-name">${plantsData.latinName}</span>
        <a href="/plant-card.html?id=${plantsData.id}" class="plants-list__link">Details</a>`;
        ul.appendChild(li);
    });
    
    parentElement.appendChild(ul);


    
}

export const displayPlants = async (url)=> {
    const plants = await getPlants(url, 0, 10);
    const plantsData = plants.data;
    const parent = document.querySelector(".main__section");
     
    generatePlantsList(plantsData, parent);
    
  }

  export const getIdFromParams = (value)=> {
    
    return new URLSearchParams(window.location.search).get(value);
  }

  export const displayPlantInfo = async (htmlElement) => {
    const id = getIdFromParams('id');
    const plant = await getPlant(id);
    const plantData = plant.data;
    
    return htmlElement.innerHTML = `<article class="main__card card">
        <div class="card__title-group">
            <h2 class="card__title">${plantData.name}</h2>
            <p class="card__info"><span class="card__author"></span><time class="card__date">${plantData.dateCreated}</time></p>
        </div>
        <div class="card__labels">
            <p class="card__label">${plantData.latinName}</p>
            <p class="card__label"></p>
            <p class="card__label"></p>
        </div>
        <p class="card__description"></p>
    </article>`
 
 };