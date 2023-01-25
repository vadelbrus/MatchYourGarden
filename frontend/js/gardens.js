import { BaseEntity } from "./BaseEntity.js";
import { Api } from "./Api.js";
import { pagination } from "./pagination.js";
import { App } from "./App.js";

const API_URL = "https://matchyourgarden.azurewebsites.net";
const selector =  document.querySelector(".pagination__per-page");
const baseEntity = new BaseEntity(new Api(API_URL));

new App([baseEntity, 'garden', 'getall', [0 , 10]], pagination, selector);