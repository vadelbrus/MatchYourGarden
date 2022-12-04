 export class ApiDataHandler {
    constructor(url, method, skip, count, id){
    this.method = method;
    this.url = url;
    this.skip = skip;
    this.count = count;
    this.id = id;
       
    //RUN SPECIFIC FUNCTION DEPENDING ON USER ACTION 

    if (this.method === "PLANTS") {return this.getAllPlants()}
    if (this.method === "SEARCHPLANT") {return this.getSinglePlant()}
  
    }

    //GET SINGLE PLANT DATA
    async getSinglePlant() {
              
        try {
            const response = await fetch(`${this.url}/Plant/get/${this.id}`);
            
            if(!response.ok) { throw new Error(`Error! status: ${response}`);}
               
            return await response.json();
            }
        catch (err) {
            
            console.log(err)
                  
        }
    
    }

    //GET ALL PLANTS DATA
     async getAllPlants() {
        
        try {
            
            const response = await fetch(`${this.url}/plant/getall/${this.skip}/${this.count}`);
            
            if(!response.ok) { throw new Error(`Error! status: ${response.text}`);}
    
            return await response.json();
                        
        }
        catch (err) {
            
            alert(err.name)
            
        }
    }

}






