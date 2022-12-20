export class App {
    constructor([entity, type, method, params], pagination, selector ){

        //Initiate variables
        this.entity = entity;
        this.type= type;
        this.method = method;
        this.params = params;
        this.pagination = pagination;
        this.selector = selector;

        //Initiate default view
        this.entity.displayData(this.type, this.method, this.params);
        this.pagination(this.type, this.method, this.params);
        this.handlePerPage(this.selector);
    }
    
    //Add items per page functionality
    async handlePerPage() {
        return this.selector.addEventListener("change", async (e)=> {
            await this.pagination(this.type, this.method, [0, Number(e.target.value)]);
        });
    }
}
