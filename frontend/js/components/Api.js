export class Api {
  constructor() {
    this.baseUrl = "https://matchyourgarden.azurewebsites.net";
  }

  //COMPOSE API URL REQUEST

  #buildRequestUrl(entity, method, props = []) {
    return `${this.baseUrl}/${entity}/${method}/${props.join("/")}`;
  }

  //CHECK FOR THE TYPE OF USER REQUEST

  async getData(entity, method, params = []) {
    try {
      const url = this.#buildRequestUrl(entity, method, params);
      const request = await fetch(url);

      return await request.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getDataByName(entity, method, props) {
    try {
      const url = `${this.baseUrl}/${entity}/${method}/${props}`;
      const request = await fetch(url);
      return await request.json();
    } catch (error) {
      console.log(error);
    }
  }

  async postData(entity, method, data) {
    try {
      const options = {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const url = this.#buildRequestUrl(entity, method);
      const response = await fetch(url, options);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDataById(entity, method, props) {
    try {
      const options = {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
      };

      const url = `${this.baseUrl}/${entity}/${method}/${props}`;
      const request = await fetch(url, options);

      return await request.json();
    } catch (error) {
      console.log(error);
    }
  }

  async updateData() {
    try {
    } catch (error) {}
  }

  async relateData() {
    try {
    } catch (error) {}
  }
}
