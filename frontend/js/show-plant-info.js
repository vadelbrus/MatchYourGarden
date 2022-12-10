import { ApiDataHandler } from "./ApiDataHandler.js";
import { ViewPlantsData } from "./ViewPlants.js";

const API_URL = "https://matchyourgarden.azurewebsites.net";
const renderPlants = new ViewPlantsData(new ApiDataHandler(API_URL));
const card = document.querySelector('.page-card__section');

renderPlants.displayPlantInfo(card)

