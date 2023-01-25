 export class Api {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
       }

    //COMPOSE API URL REQUEST       
    
    #buildRequestUrl(entity, method, props=[]){
   
        return `${this.baseUrl}/${entity}/${method}/${props.join("/")}`;
        
       }

    //CHECK FOR THE TYPE OF USER REQUEST
       
    async getData(entity, method, params=[]){
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


    }
