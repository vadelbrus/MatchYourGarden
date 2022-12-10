 export class ApiDataHandler {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
       }

    //COMPOSE API URL REQUEST       
    
    buildRequestUrl(type, req, props, id, data){
       
        if(req === "get") {
            
           return `${this.baseUrl}/${type}/${req}/${id}`;
            }
        if(req === "getall") {
           return `${this.baseUrl}/${type}/${req}/${props.join("/")}`;
            }
        if(req === "create") {
           return `${this.baseUrl}/${type}/${req}`
        }
        
       }

    //CHECK FOR THE TYPE OF USER REQUEST
    
    async handleApiData(type, req, props, id, data){
        const apiUrl = this.buildRequestUrl(type, req, props, id, data);
            
        try {
            if(req === "create") {
               const options = {
                    method: "POST",
                    headers: {"content-Type":"application/json"},
                    body: JSON.stringify(data)
                }
                const response = await fetch(apiUrl, options);
                
                return response.json(); 
                }
                const response = await fetch(apiUrl);
                
                return response.json();
                    
                } catch (error) {
                
                console.log(error);
                }

    }

    //COMMOM METHODS FOR PLANTS AMD GARDENS

        // GET ONE PLANT/GARDEN

    async getRecord(type, method, props, id) {
        return await this.handleApiData(type, method, null, id);
           
        }
        // GET ALL PLANTS/GARDENS
        
     async getRecords(type, method, props){
         return await this.handleApiData(type, method, props, null);
        }
        // CREATE ONE PLANT/GARDEN
     async setNewRecord(type, method, data){
        return await this.handleApiData(type, method, null, null, data)
        }

    }
