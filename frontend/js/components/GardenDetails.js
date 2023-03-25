import { Api } from "./Api.js";
import { BaseEntity } from "./BaseEntity.js";

export class GardenDetails {
  constructor(value, api, baseEntity) {
    this.value = value;
    this.api = api;
    this.baseEntity = baseEntity;
    this.selector = document.querySelector(".garden-card__section");
  }

  async getGardenDataFromApi() {
    const value = this.baseEntity.getValueFromParams(this.value);
    return await this.api.getData("garden", "get", [value]);
  }

  async renderGardenDetails() {
    const response = await this.getGardenDataFromApi();
    const data = response.data;

    return (this.selector.innerHTML = `<article class="garden-card__card card">
            <div class="card__title-group">
                <h2 class="card__title">${data.name}</h2>
                <p class="card__info"><span class="card__author"></span><time class="card__date">${data.dateCreated}</time></p>
            </div>
            <div class="card__labels">
                <p class="card__label"></p>
                <p class="card__label"></p>
            </div>
            <p class="card__description"></p>
        </article>`);
  }
}

const gardenDetails = new GardenDetails("id", new Api(), new BaseEntity("id"));
gardenDetails.renderGardenDetails();
