 export class Api {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
       }

    //COMPOSE API URL REQUEST       
    
    #buildRequestUrl(entity, method, props=[]){
   
        return `${this.baseUrl}/${entity}/${method}/${props.join("/")}`;
        
       }

    //CHECK FOR THE TYPE OF USER REQUEST
       
    async getData(entity, method, params){
        const url = this.#buildRequestUrl(entity, method, params);
        const request = await fetch(url);
        return await request.json();

    }

    async postData(entity, method, data){
        const options = {
            method: "POST",
            headers: {"content-Type":"application/json"},
            body: JSON.stringify(data)
        };

        const url = this.#buildRequestUrl(entity, method);

        const response = await fetch(url, options);
                
        return response.json(); 


    }

    async deleteData(){

    }

    async updateData(){

    }


    //COMMOM METHODS FOR PLANTS AMD GARDENS

    // GET PLANT(S)/GARDEN(S)

    async getApiData(type, method, props) {
        return await this.getData(type, method, props);
           
        }
        
    // CREATE ONE PLANT/GARDEN
     async postApiData(type, method, data){
        return await this.postData(type, method, data)
        }
        
    // UPDATE ONE PLANT/GARDEN
    async updateApiData(type, method, data){
        return await this.updateData(type, method, data)
       }

    // DELETE ONE PLANT/GARDEN
    async deleteApiData(type, method, data){
        return await this.deleteData(type, method, data)
       }

    }
