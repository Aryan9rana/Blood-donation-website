document.addEventListener('DOMContentLoaded', function () {
    const buttons= document.querySelectorAll("[data-carousel-button]");
    buttons.forEach(button =>{
        button.addEventListener("click",()=>{
            console.log("clicked")
            const offset=button.dataset.carouselButton === "next" ? 1: -1;
            const slides= button.closest("[data-carousel]").querySelector("[data-slides]"); 
    
            const activeSlide =slides.querySelector("[data-active]");
            let newIndex = [...slides.children]
            .indexOf(activeSlide) + offset;
            if(newIndex<0) newIndex= slides.children.length -1;
            if(newIndex>=slides.children.length) newIndex=0;
            slides.children[newIndex].dataset.active= true;
            delete activeSlide.dataset.active;
        });
    });
    
    window.onscroll = function() {
        stick()
    };
    var navbar=document.querySelector("header");
    var sticky = navbar.offsetTop;
    
    function stick() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
    


  });
  window.onunload = function(){ window.scrollTo(0,0); }
  function scrollToTop() {
    document.documentElement.scrollTop = 0; 
  }
  function openForm() {
    console.log("hi");
    document.getElementById("popup-1").classList.add("active");
  }
  
  function closeForm() {
    console.log("hi close");
    document.getElementById("popup-1").classList.remove("active");
  }

  var closeBtns = document.getElementsByClassName("close-btn");

  for (var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener("click", function() {
      this.parentElement.style.display = 'none';
    });
  }