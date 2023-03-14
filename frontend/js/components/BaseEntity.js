export class BaseEntity {
  constructor(value) {
    this.value = value;
    // this.selector = selector;
  }

  getValueFromParams() {
    return new URLSearchParams(window.location.search).get(this.value);
  }

  // checkItemsPerPage(){
  //     const selector = document.querySelector(this.selector);
  //     return selector.value;

  // }
}
