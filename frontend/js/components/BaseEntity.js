export class BaseEntity {
  constructor(value) {
    this.value = value;
  }

  getValueFromParams() {
    return new URLSearchParams(window.location.search).get(this.value);
  }


}
