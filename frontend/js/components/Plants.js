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
    const searchInput = document.querySelector(".main__search ");
    const searchMobile = document.querySelector(".search-mobile");
    // const searchMobileContainer = document.querySelector(".search-mobile__container");
    // const searchMobileResults = document.querySelector(".search-mobile__results");
    const queryInput = document.querySelector(".search-mobile__query");
    
    const searchInputCloseBtn = document.querySelector(".search-mobile__close-btn");
    this.listBody = document.querySelector(".list__body");

    this.listBody.addEventListener("click", async (e) => {
      if (e.target.tagName === "BUTTON") {
        e.preventDefault();
        const id = e.target.dataset.plantId;
        await this.deletePlantFromList(id);
      }
    });

    searchInput.addEventListener("click", (e)=> {
      
      searchMobile.classList.add("search-mobile--active");
      // searchMobile.style.visibility = "visible";
      // searchMobileContainer.classList.add("search-mobile__container--active");
      searchMobile.classList.add("search-mobile--visible");
   
  
    })

    queryInput.addEventListener("keyup", async (e)=> {
      const value = e.target.value;
      
      if(value.length < 3) {
        const searchMobileResults = document.querySelector(".search-mobile__results");
        searchMobileResults.innerHTML = "";
        return;
      }
      await this.searchPlant(value);
    });

    searchInputCloseBtn.addEventListener("click", (e)=> {
      e.preventDefault();
      searchMobile.classList.remove("search-mobile--active");
      setTimeout(()=>{
        searchMobile.classList.remove("search-mobile--visible");        
      }, 225);
      this.clearInputValue(queryInput);
      // queryInput.value = "";
      const searchMobileResults = document.querySelector(".search-mobile__results");
      this.clearResultsList(searchMobileResults);
      // searchMobileResults.innerHTML = "";
      // document.querySelector(".search-mobile").classList.remove("search-mobile--active");
      // searchMobileContainer.classList.remove("search-mobile__container--active");
    })


  }

  clearInputValue(input){
    input.value = "";
  }

  clearResultsList(list){
    list.innerHTML = "";
  }
  
  async searchPlant(value){

    const data = await this.api.getDataByName("Plant", "getallbyname", value);
    const results = await this.render.renderUserSearchResults(data);
    
    const searchMobileResults = document.querySelector(".search-mobile__results");
    searchMobileResults.innerHTML = results;
    
    
    
  }
  async getPlanstData(currentPage, ItemsPerPage) {
    const request = await this.api.getData("plant", "getAll", [
      currentPage,
      ItemsPerPage,
    ]);
    const data = request.data;

    await this.render.renderPlantsList(data, this.listBody);

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

//PRZENIESC SERCHBAR Z GLOWNEJ STRONY DO HEADERA OBOK MENU HAMBURGER JAKO ROzWIJANY SEARCH LUB SEARCH
//GDY W HEADERZE UZYTKOWNIK KLIKA IKONKE LUPY OTWIERA SIE NOWY "MODAL" Z OPCJAMI WYSZUKIWANIA NA CALA STRONE 
// PODOBNIE ZMIENIC ABY TAK SAMO WYGLADALO WYSZUKKIWANIE OGRODOW W ADD NEW PLANT
//wywalic border-radiusy z headera a z kartę do dodawania roslin zrobić na cale okno bez radiusow cos na wzor justjoin.it/more filters