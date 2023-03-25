export class Render {
  constructor() {}

  async renderPlantsList(data, element) {
    
    element.innerHTML = "";
    
    await data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.classList.add("table-content__row");
      tr.innerHTML = `
            <td class="table-content__row-cell table-content__row-name">${item.name}</td>
            <td class="table-content__row-cell table-content__row-latin">${item.latinName}</td>
            <td class="table-content__row-cell table-content__row-link">
                <a href="/plant-card.html?id=${item.id}" class="table-content__link">details</a></td>
            <td class="table-content__delete-cell">
                <button class="table-content__delete-btn" data-plant-id=${item.id}>X</button>
            </td>`;
      element.appendChild(tr);
    });
  };

  async renderUserSearchResults(data, type){
    
    const resultHtml =  data.data.map(element => {
      
      return `<li class="search-modal__result">
      <a class="search-modal__result-link"
      href="${type}-card.html?id=${element.id}"
      
      >
      ${element.name.charAt(0).toUpperCase() + element.name.slice(1)}
      </a></li>`;})
      .join('');

      return resultHtml;
   
  }

  async renderGardensList(data, element) {
    
    element.innerHTML = "";

    await data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.classList.add("table-content__row");
      tr.innerHTML = `
      <td class="table-content__row-cell table-content__row-name">${item.name}</td>
      <td class="table-content__row-cell table-content__row-latin">${item.latinName}</td>
      <td class="table-content__row-cell table-content__row-link">
          <a href="/garden-card.html?id=${item.id}" class="table-content__link">details</a></td>
      `;
      element.appendChild(tr);
    });
  }



}
