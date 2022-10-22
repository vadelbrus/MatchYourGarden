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

export const displayPlants = async (url, skip, count)=> {
    const plants = await getPlants(url, skip, count);
    const plantsData = plants.data;
    console.log(plants)
    const parent = document.querySelector(".pagination__list");
    parent.innerHTML = "";
     
    generatePlantsList(plantsData, parent);
    
    return {
        skip: skip,
        count: count
    }
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

const appendPaginationNumber = (index)=> {
    const numbersContainer = document.querySelector(".pagination__numbers");
    const pageNumber = document.createElement("button");
    pageNumber.classList.add("pagination__number");
    pageNumber.dataset.index = index;
    pageNumber.setAttribute("aria-label", "Page " + index);
    pageNumber.innerText = index + 1;
    numbersContainer.appendChild(pageNumber);

}

const getPaginationNumbers = (numbersPerPage)=> {
    for(let i = 0; i <= numbersPerPage; i++) {
        appendPaginationNumber(i);
    }
}

const setCurrentPage = (pageNumber)=>{
    page = pageNumber;
    return page;

}

export const pagination = async (url, skip, count) => {
    
    // await displayPlants(url, skip, count);
    // const plantsData = await getPlants(url);
     
    // console.log(plantsData)
    // const { page, perPage, totalCount } = plantsData;
    const prevBtn =  document.querySelector(".pagination__prev-btn");
    const nextBtn =  document.querySelector(".pagination__next-btn");
    
    getPaginationNumbers(count);

        const paginationNumbers = document.querySelectorAll(".pagination__number");

        paginationNumbers.forEach(number => {
       
            number.addEventListener('click', async (e) => {
                e.preventDefault();
                const currentPage = e.target.dataset.index;
                await displayPlants(url, currentPage, count);
                
                paginationNumbers.forEach( (number)=> {
                    number.classList.remove("pagination__number--active");
                })

                number.classList.add("pagination__number--active");
            
    })
    })

    // const paginatedList =  document.querySelector(".paginated__list");
    // const pages = Math.ceil(totalCount / perPage);
    // let currentPage;

    
    
    // console.log(pages)
    // console.log(perPage, totalCount);
    // console.log(plantsData)
    
 }