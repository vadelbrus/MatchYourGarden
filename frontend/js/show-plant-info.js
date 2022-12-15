import { Api } from "./Api.js";
import { BaseEntity } from "./BaseEntity.js";

const API_URL = "https://matchyourgarden.azurewebsites.net";
const baseEntity = new BaseEntity(new Api(API_URL));
const card = document.querySelector('.page-card__section');

baseEntity.displayDetails(card)

