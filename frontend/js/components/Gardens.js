// import { BaseEntity } from "./BaseEntity.js";
// import { Api } from "./Api.js";
// import { Render } from "./Render.js";

// export class Gardens extends BaseEntity {
//   constructor(value, api, render) {
//     super(value);
//     this.api = api;
//     this.render = render;
//     this.page = 0;
//     this.tableBody = document.querySelector(".table-content__body");
//   }

//   async getGardenstData(currentPage, ItemsPerPage) {
//     const request = await this.api.getData("garden", "getAll", [
//       currentPage,
//       ItemsPerPage,
//     ]);
//     const data = request.data;
//     this.render.renderGardensList(data);
//   }

//   checkItemsPerPage() {
//     const selector = document.querySelector(".pagination__per-page");
//     return selector.value;
//   }

//   async showGardensPerPage() {
//     const value = this.checkItemsPerPage();
//     return await this.getGardenstData(this.page, value);
//   }

//   async showGardensDetails() {
//     const plantCard = document.querySelector(".page-card__section");
//     const id = this.getValueFromParams("id");
//     const response = await this.api.getData("garden", "get", [id]);
//     const data = response.data;
//     return await this.render.renderPlantDetails(data, plantCard);
//   }
// }

// const searchParamsValue = "id";
// const DEFAULT_PAGE = 0;
// const DEFAULT_NUMBER_OF_ITEMS = 10;

// const app = new Gardens(searchParamsValue, new Api(), new Render());
// app.getGardenstData(DEFAULT_PAGE, DEFAULT_NUMBER_OF_ITEMS);
// // document.querySelector(".pagination__per-page").addEventListener('change', ()=> app.showPlantsPerPage())


import { BaseEntity } from "./BaseEntity.js";
import { Api } from "./Api.js";
import { Render } from "./Render.js";

export class Gardens extends BaseEntity {
  constructor(value, api, render) {
    super(value);
    this.api = api;
    this.render = render;
    this.page = 0;
    // this.plants = [];
    this.searchInput = document.querySelector(".main__search-box");
    this.searchModal = document.querySelector(".search-modal");
    this.searchModalResults = document.querySelector(".search-modal__results");
    this.queryInput = document.querySelector(".search-modal__query");
    this.searchBox = document.querySelector(".gardens-main__search");
    this.searchInputCloseBtn = document.querySelector(".search-modal__close-btn");
    this.tableBody = document.querySelector(".table-content__body");

    this.tableBody.addEventListener("click", async (e) => {
      if (e.target.tagName === "BUTTON") {
        e.preventDefault();
        const id = e.target.dataset.plantId;
        await this.deleteGardenFromList(id);
      }
    });

    this.searchBox.addEventListener("click", (e)=> {
      
      this.searchModal.classList.add("search-modal--active");
      this.searchModal.classList.add("search-modal--visible");
   
  
    })

    this.queryInput.addEventListener("keyup", async (e)=> {
      const value = e.target.value;
            
      if(value.length < 3) {
        this.searchModalResults.classList.remove("search-modal__results--active");
        this.searchModalResults.innerHTML = "";
        return;
      }
      this.searchModalResults.classList.add("search-modal__results--active");
      await this.searchGarden(value);
    });

    this.searchInputCloseBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      this.searchModal.classList.remove("search-modal--active");
     
      setTimeout(()=>{
        this.searchModal.classList.remove("search-modal--visible");        
      }, 225);
      
      this.clearInputValue(this.queryInput);
      this.clearResultsList(this.searchModalResults);
      
    })


  }

  clearInputValue(input){
    
    input.value = "";
  }

  clearResultsList(resultsList){
    
    resultsList.innerHTML = "";
  }
  
  async searchGarden(value){

    const data = await this.api.getDataByName("Garden", "getallbyname", value);
    const results = await this.render.renderUserSearchResults(data, "garden");
    this.searchModalResults.innerHTML = results;

  }
  async getGardensData(currentPage, ItemsPerPage) {
    const request = await this.api.getData("garden", "getAll", [
      currentPage,
      ItemsPerPage,
    ]);
    const data = request.data;

    await this.render.renderGardensList(data, this.tableBody);

    return data;
  }

  checkItemsPerPage() {
    const selector = document.querySelector(".pagination__per-page");
    return selector.value;
  }

  async showGardensPerPage() {
    const value = this.checkItemsPerPage();
    return await this.getGardenstData(this.page, value);
  }

  async showGardensDetails() {
    const id = this.getValueFromParams("id");
    const response = await this.api.getData("garden", "get", [id]);
    const data = response.data;
    return await this.render.renderPlantDetails(data, gardenCard);
  }

  async deleteGardenFromList(id) {
    await this.api.deleteDataById("garden", "delete", [id]);
    await this.getGardensData(0, 10);
  }

}

const searchParamsValue = "id";
const DEFAULT_PAGE = 0;
const DEFAULT_NUMBER_OF_ITEMS = 10;

const app = new Gardens(searchParamsValue, new Api(), new Render());
app.getGardensData(DEFAULT_PAGE, DEFAULT_NUMBER_OF_ITEMS);
// document.querySelector(".pagination__per-page").addEventListener('change', ()=> app.showPlantsPerPage())
