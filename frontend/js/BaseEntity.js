
export class BaseEntity {
    
    constructor(api) {
    this.api = api;
       
    }
    
    async getDataList(data){
        
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

    getHtmlTemplate(data) {
        return `<article class="main__card card">
                    <div class="card__title-group">
                        <h2 class="card__title">${data.name}</h2>
                        <p class="card__info"><span class="card__author"></span><time class="card__date">${data.dateCreated}</time></p>
                    </div>
                    <div class="card__labels">
                        <p class="card__label">${data.latinName}</p>
                        <p class="card__label"></p>
                        <p class="card__label"></p>
                    </div>
                    <p class="card__description"></p>
                </article>`
    }

   
      
    async displayData(type, method, props) {
        const response = await this.api.getApiData(type, method, props);
        const data = response.data;
        this.getDataList(data);
        
    }

     displayDetails = async (element) => {
        const id = this.getIdFromParams('id');
        const response = await this.api.getApiData("plant", "get", [id]);
        const data = response.data;
        
        return element.innerHTML = `<article class="main__card card">
            <div class="card__title-group">
                <h2 class="card__title">${data.name}</h2>
                <p class="card__info"><span class="card__author"></span><time class="card__date">${data.dateCreated}</time></p>
            </div>
            <div class="card__labels">
                <p class="card__label">${data.latinName}</p>
                <p class="card__label"></p>
                <p class="card__label"></p>
            </div>
            <p class="card__description"></p>
        </article>`
     
     };


}
