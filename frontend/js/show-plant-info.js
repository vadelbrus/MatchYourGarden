import { displayPlantInfo } from "./plants.js";


const API_URL = "https://matchyourgarden.azurewebsites.net";
const card = document.querySelector('.page-card__section');

displayPlantInfo(API_URL, card)



