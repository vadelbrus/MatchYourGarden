import { ApiDataHandler } from "./ApiDataHandler.js"
import { ViewPlantsData } from "./ViewPlants.js"
const API_URL = "https://matchyourgarden.azurewebsites.net";
const apiHandler = new ApiDataHandler(API_URL);
const viewPlants = new ViewPlantsData(apiHandler);

const disableButton = (button)=> {
    button.disabled = true;
}

const enableButton = (button)=> {
    button.disabled = false;
}
const setActivePage = (index)=>{
    document.querySelectorAll(".pagination__page").forEach(page => {
        page.classList.remove("pagination__page--active");
        
    });
    
    document.querySelectorAll(".pagination__page").forEach(page => {
        if(index === Number(page.dataset.index)){
            page.classList.add("pagination__page--active");
        }
    });
    
    
}

const checkPages = async (current, factor, totalPages) => {
   
   if(!totalPages) {return}
   if(totalPages < 4) {
    
        const allPages = [0, 1, 2];
        const allPagesHtmlTemplate = allPages.map( (page) => { return `<button class="pagination__page" data-index=${page} aria-label = "Page ${page}">${page + 1}</button>`}).join("");
        
        return `${allPagesHtmlTemplate}`;
   }
   if(totalPages > 3 && current === 0){
        const nextPage = current + 1;
        const sequentPage = current + 2;
        const skipPage = current + 9 < totalPages? current + 9: totalPages - 1;
        const atStartPages = [current, nextPage, sequentPage];
        const atStartPagesHtmlTemplate = atStartPages.map( (page) => { return `<button class="pagination__page" data-index=${page} aria-label = "Page ${page}">${page + 1}</button>`}).join("");
        
        return `${atStartPagesHtmlTemplate}<span class="pagination__dots">...</span><button class="pagination__page" data-index=${skipPage} aria-label = "Page ${skipPage }">${skipPage + 1}</button>`;
    
    }
    
    if(totalPages > 3 && current > 0 && current + factor < totalPages ) {
        
        const prevPage = current - 1;
        const nextPage = current + 1;
        const skipPage = current + 9 < totalPages ? current + 9: totalPages - 1;
        const atStartPages = [prevPage, current, nextPage];
        const atStartPagesHtmlTemplate = atStartPages.map( (page) => { return `<button class="pagination__page" data-index=${page} aria-label = "Page ${page}">${page + 1 }</button>`}).join("");
        setActivePage(current);
        return `${atStartPagesHtmlTemplate}<span class="pagination__dots">...</span><button class="pagination__page" data-index=${skipPage} aria-label = "Page ${skipPage }">${skipPage + 1}</button>`;
    }
    
    if( totalPages > 3 && current + factor >= totalPages) {
        console.log('last');
        const lastPage = totalPages - 1;
        const penultimatePage = lastPage - 1;
        const beforePenultimatePage = lastPage - 2;
        const skipPage = current - 9 <= 0 ? 0 : current - 9 ;
        const atEndPages = [beforePenultimatePage, penultimatePage, lastPage];
        const atEndPagesHtmlTemplate = atEndPages.map( (page) => { return `<button class="pagination__page" data-index=${page} aria-label = "Page ${page}">${page + 1 }</button>`}).join("");
       
        setActivePage(current);
        return `<button class="pagination__page" data-index=${skipPage} aria-label = "Page ${skipPage}">${skipPage + 1}</button><span class="pagination__dots">...</span>${atEndPagesHtmlTemplate}`;
    
    }

}

const handleButtonsState = (index, pages, prev, next, start, last)=> {
    if(index === 0) {
        disableButton(prev);
        disableButton(start);
    } else {
        enableButton(prev)
        enableButton(start)
    }

    if(index === pages -1) {
        disableButton(next);
        disableButton(last);
    } else {
        enableButton(next);
        enableButton(last);
    };
}

export const  pagination = async (type, method, props)=> {

    //CREATE PAGINATION TEMPLATE
    
    const prevBtnTemplate = `<button class="pagination__button pagination__prev-btn" aria-label="Previous page" title="Previous Page">&lt;</button>`;
    const nextBtnTemplate = `<button class="pagination__button pagination__next-btn" aria-label="Next page" title="Next Page">&gt;</button>`;
    const goToFirstPageBtnTemplate = `<button class="pagination__button pagination__start-btn" aria-label="Previous page" title="Previous Page">&lt;&lt;</button>`;
    const paginationInfo = `<div class="pagination__info"><p class="pagination__total-items">Plants: <span class="pagination__items"></span></p></div>`;
    const goToLastPageBtnTemplate = `<button class="pagination__button pagination__last-btn" aria-label="Previous page" title="Previous Page">&gt;&gt;</button>`;
    const paginationContainer = `<div class="pagination__pages"></div>`;
    // const paginationInnerContainer = `<div class="pagination__inner"></div>`;
    const container = document.querySelector(".pagination__container");
    container.innerHTML = `<div class="pagination__inner">${goToFirstPageBtnTemplate}${prevBtnTemplate}${paginationContainer}${nextBtnTemplate}${goToLastPageBtnTemplate}</div>${paginationInfo}`;

    //INITIALIZE currentPage VARIABLE

    let currentPage;
    
    //SELECT DOM ELEMENTS

    const prevBtn = document.querySelector(".pagination__prev-btn");
    const nextBtn = document.querySelector(".pagination__next-btn");
    const goToFirstPageBtn = document.querySelector(".pagination__start-btn");
    const goToLastPageBtn = document.querySelector(".pagination__last-btn");
    const totalItemsInfo = document.querySelector(".pagination__items");
    // const pageStatus = document.querySelector(".pagination__status");
    
    //GET DATA FROM API IMPORTANT TO CALCULATE TOTAL PAGES

    const plantsData = await apiHandler.getRecords(type, method, props);
    const totalItems =  plantsData.totalCount;
    const defaultPage = props[0];
    const perPage = props[1];
    const numberOfPages = Math.ceil( totalItems / perPage);
    
    
    currentPage = currentPage > numberOfPages ? numberOfPages : defaultPage;

    // SET INITIAL PAGINATION 
    const pagesFactor = 2;
    const pagination = document.querySelector(".pagination__pages");
    const paginationPagesTemplate = await checkPages(currentPage, pagesFactor, numberOfPages);
    
    //HANDLE PAGINATION

    pagination.innerHTML = paginationPagesTemplate;
    totalItemsInfo.textContent = totalItems;
    if(currentPage === 0) {handleButtonsState(currentPage, numberOfPages, prevBtn, nextBtn, goToFirstPageBtn, goToLastPageBtn);};
    setActivePage(currentPage);
    // await displayPlants(url, currentPage, itemsPerPage);
    await viewPlants.displayPlants(type, method, props);

    
    
    //ADD LISTENERS

    pagination.addEventListener('click', async (e)=> {
        e.preventDefault();
        
        const pageIndex = Number(e.target.dataset.index);
        if(e.target.tagName === "BUTTON") { currentPage = pageIndex; }

        handleButtonsState(currentPage, numberOfPages, prevBtn, nextBtn, goToFirstPageBtn, goToLastPageBtn);
        
        // await displayPlants(url, currentPage, itemsPerPage);
        await viewPlants.displayPlants(type, method, [currentPage, perPage]);
        pagination.innerHTML = await checkPages(currentPage, pagesFactor, numberOfPages);
        
        setActivePage(currentPage);

    })

    // PREVIOUS/NEXT BUTTONS FUNCTIONALITY

    prevBtn.addEventListener('click', async (e)=> {
        e.preventDefault();
        currentPage = currentPage - 1 < 0  ? currentPage : currentPage - 1;
        handleButtonsState(currentPage, numberOfPages, prevBtn, nextBtn, goToFirstPageBtn, goToLastPageBtn);
        pagination.innerHTML = await checkPages(currentPage, pagesFactor, numberOfPages);
        setActivePage(currentPage);
        
        // await displayPlants(url, currentPage, itemsPerPage);
        await viewPlants.displayPlants(type, method, [currentPage, perPage]);
    })

    nextBtn.addEventListener('click', async (e)=> {
        e.preventDefault();
        currentPage = currentPage + 1 >= numberOfPages - 1 ?  numberOfPages - 1 : currentPage + 1;
        handleButtonsState(currentPage, numberOfPages, prevBtn, nextBtn, goToFirstPageBtn, goToLastPageBtn);
        pagination.innerHTML = await checkPages(currentPage, pagesFactor, numberOfPages);
        setActivePage(currentPage);
        
        await viewPlants.displayPlants(type, method, [currentPage, perPage]);
    })

    // ADD SKIP BUTONS FUNCTIONALITY

    goToFirstPageBtn.addEventListener("click", async (e)=> {
        e.preventDefault();
        currentPage = 0;
        handleButtonsState(currentPage, numberOfPages, prevBtn, nextBtn, goToFirstPageBtn, goToLastPageBtn);
        pagination.innerHTML = await checkPages(currentPage, pagesFactor, numberOfPages);
        setActivePage(currentPage);

        await viewPlants.displayPlants(type, method, [currentPage, perPage]);


    });
    
    goToLastPageBtn.addEventListener("click", async (e)=> {
        e.preventDefault();
        currentPage =  numberOfPages - 1;
        handleButtonsState(currentPage, numberOfPages, prevBtn, nextBtn, goToFirstPageBtn, goToLastPageBtn);
        pagination.innerHTML = await checkPages(currentPage, pagesFactor, numberOfPages);
        setActivePage(currentPage);
        
        await viewPlants.displayPlants(type, method, [currentPage, perPage]);

    })

}

