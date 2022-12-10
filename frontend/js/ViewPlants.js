
export class ViewPlantsData {
    
    constructor(api) {
    this.api = api;
       
    }
    
    async getPlantList(data){
        
        const tbody = document.querySelector(".list__body");
        tbody.innerHTML = "";
        await data.forEach(item => {
            
            const tr = document.createElement("tr");
            tr.classList.add("list__row");
            tr.innerHTML = `<td class="list__row-cell list__row-name">${item.name}</td><td class="list__row-cell list__row-latin">${item.latinName}</td><td class="list__row-cell list__row-link"><a href="/plant-card.html?id=${item.id}" class="list__link"></a>details</td>`;
            tbody.appendChild(tr);
                   
        });
    }
    
    getIdFromParams(value) { 
        return new URLSearchParams(window.location.search).get(value);
      }

    getPlantHtmlTemplate(plant) {
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

   
      
    async displayPlants(type, method, props) {
        const plants = await this.api.getRecords(type, method, props);
        const plantsData = plants.data;
        this.getPlantList(plantsData);
        
    }

     displayPlantInfo = async (htmlElement) => {
        const id = this.getIdFromParams('id');
        const plant = await this.api.getRecord("plant", "get", null, id);
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


}
