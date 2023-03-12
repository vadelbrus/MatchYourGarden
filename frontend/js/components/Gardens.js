import { BaseEntity } from "./BaseEntity.js";
import { Api } from "./Api.js";
import { Render } from "./Render.js";

export class Gardens extends BaseEntity {
  constructor(value, api, render) {
    super(value);
    this.api = api;
    this.render = render;
    this.page = 0;
  }

  async getGardenstData(currentPage, ItemsPerPage) {
    const request = await this.api.getData("garden", "getAll", [
      currentPage,
      ItemsPerPage,
    ]);
    const data = request.data;
    this.render.renderGardensList(data);
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
    const plantCard = document.querySelector(".page-card__section");
    const id = this.getValueFromParams("id");
    const response = await this.api.getData("garden", "get", [id]);
    const data = response.data;
    return await this.render.renderPlantDetails(data, plantCard);
  }
}

const searchParamsValue = "id";
const DEFAULT_PAGE = 0;
const DEFAULT_NUMBER_OF_ITEMS = 10;

const app = new Gardens(searchParamsValue, new Api(), new Render());
app.getGardenstData(DEFAULT_PAGE, DEFAULT_NUMBER_OF_ITEMS);
// document.querySelector(".pagination__per-page").addEventListener('change', ()=> app.showPlantsPerPage())
