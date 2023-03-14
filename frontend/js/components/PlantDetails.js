import { Api } from "./Api.js";
import { BaseEntity } from "./BaseEntity.js";

export class PlantDetails {
  constructor(value, api, baseEntity) {
    this.value = value;
    this.api = api;
    this.baseEntity = baseEntity;
    this.selector = document.querySelector(".page-card__section");
  }

  async getPlantDataFromApi() {
    const value = this.baseEntity.getValueFromParams(this.value);
    return await this.api.getData("plant", "get", [value]);
  }

  async renderPlantDetails() {
    const response = await this.getPlantDataFromApi();
    const data = response.data;

    return (this.selector.innerHTML = `<article class="main__card card">
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
        </article>`);
  }
}

const plantDetails = new PlantDetails("id", new Api(), new BaseEntity("id"));
plantDetails.renderPlantDetails();
