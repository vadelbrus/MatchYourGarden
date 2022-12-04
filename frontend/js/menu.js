const hamburgerBtn = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const navInner = document.querySelector(".nav__inner");
const page = document.querySelector(".page");

export const handleMenu = (btn, nav, page, wrapper) => {
    
    btn.addEventListener("click", (e)=> {
        e.preventDefault();
        btn.classList.toggle("hamburger--is-active");
        nav.classList.toggle("nav--is-active");
        page.classList.toggle("page--hidden");
    
    });

    wrapper.onclick = (e)=> {
        if(e.target.classList !="nav__list") {
        
        btn.classList.remove("hamburger--is-active");
        nav.classList.remove("nav--is-active");
        page.classList.remove("page--hidden");
        }
    }

    
}

handleMenu(hamburgerBtn, nav, page, navInner )



