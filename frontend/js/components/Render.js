export class Render {
  constructor(api) {
    // this.listBody = document.querySelector(".list__body");
  }

  async renderPlantsList(data, element) {
    // const listBody = document.querySelector(".list__body");
    element.innerHTML = "";
    console.log(data);

    await data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.classList.add("list__row");
      tr.innerHTML = `
            <td class="list__row-cell list__row-name">${item.name}</td>
            <td class="list__row-cell list__row-latin">${item.latinName}</td>
            <td class="list__row-cell list__row-link">
                <a href="/plant-card.html?id=${item.id}" class="list__link">details</a></td>
            <td class="list__delete-cell">
                <button class="list__delete-btn" data-plant-id=${item.id}>X</button>
            </td>`;
      element.appendChild(tr);
    });
  };

  async renderUserSearchResults(data){
    
    const resultHtml =  data.data.map(element => {
      
      return `
      <a class="form__prompt-field"
      href="/plant-card.html?id=${element.id}"
      
      >
      ${element.name}
      </a>`;})
      .join('');

      return resultHtml;
   
  }

  async renderGardensList(data) {
    // const listBody = document.querySelector(".list__body");
    this.listBody.innerHTML = "";

    await data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.classList.add("list__row");
      tr.innerHTML = `<td class="list__row-cell list__row-name">${item.name}</td><td class="list__row-cell list__row-link"><a href="/garden-card.html?id=${item.id}" class="list__link"></a>details</td>`;
      this.listBody.appendChild(tr);
    });
  }

  //      async renderPlantDetails(data, element){
  //         return element.innerHTML = `<article class="main__card card">
  //         <div class="card__title-group">
  //             <h2 class="card__title">${data.name}</h2>
  //             <p class="card__info"><span class="card__author"></span><time class="card__date">${data.dateCreated}</time></p>
  //         </div>
  //         <div class="card__labels">
  //             <p class="card__label">${data.latinName}</p>
  //             <p class="card__label"></p>
  //             <p class="card__label"></p>
  //         </div>
  //         <p class="card__description"></p>
  //     </article>`

  //  }

  // //  async renderGardensDetails(data, element){
  // //     return element.innerHTML = `<article class="main__card card">
  // //     <div class="card__title-group">
  // //         <h2 class="card__title">${data.name}</h2>
  // //         <p class="card__info"><span class="card__author"></span><time class="card__date">${data.dateCreated}</time></p>
  // //     </div>
  // //     <div class="card__labels">
  // //         <p class="card__label"></p>
  // //         <p class="card__label"></p>
  // //     </div>
  // //     <p class="card__description"></p>
  // // </article>`

  // }
}
