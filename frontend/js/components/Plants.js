import { BaseEntity } from "./BaseEntity.js";
import { Api } from "./Api.js";
import { Render } from "./Render.js";

export class Plants extends BaseEntity {
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
    this.searchBox = document.querySelector(".plants-main__search");
    this.searchInputCloseBtn = document.querySelector(".search-modal__close-btn");
    this.tableBody = document.querySelector(".table-content__body");

    this.tableBody.addEventListener("click", async (e) => {
      if (e.target.tagName === "BUTTON") {
        e.preventDefault();
        const id = e.target.dataset.plantId;
        await this.deletePlantFromList(id);
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
      await this.searchPlant(value);
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
  
  async searchPlant(value){

    const data = await this.api.getDataByName("Plant", "getallbyname", value);
    const results = await this.render.renderUserSearchResults(data);
    this.searchModalResults.innerHTML = results;

  }
  async getPlanstData(currentPage, ItemsPerPage) {
    const request = await this.api.getData("plant", "getAll", [
      currentPage,
      ItemsPerPage,
    ]);
    const data = request.data;

    await this.render.renderPlantsList(data, this.tableBody);

    return data;
  }

  checkItemsPerPage() {
    const selector = document.querySelector(".pagination__per-page");
    return selector.value;
  }

  async showPlantsPerPage() {
    const value = this.checkItemsPerPage();
    return await this.getPlanstData(this.page, value);
  }

  async showPlantsDetails() {
    const plantCard = document.querySelector(".page-card__section");
    const id = this.getValueFromParams("id");
    const response = await this.api.getData("plant", "get", [id]);
    const data = response.data;
    return await this.render.renderPlantDetails(data, plantCard);
  }

  async deletePlantFromList(id) {
    await this.api.deleteDataById("plant", "delete", [id]);
    await this.getPlanstData(0, 10);
  }

}

const searchParamsValue = "id";
const DEFAULT_PAGE = 0;
const DEFAULT_NUMBER_OF_ITEMS = 10;

const app = new Plants(searchParamsValue, new Api(), new Render());
app.getPlanstData(DEFAULT_PAGE, DEFAULT_NUMBER_OF_ITEMS);
// document.querySelector(".pagination__per-page").addEventListener('change', ()=> app.showPlantsPerPage())
