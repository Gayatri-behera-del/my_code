// typing animation
const texts = ["Web Developer", "Frontend Developer", "UI Designer"];
let index = 0;
let char = 0;
const typing = document.getElementById("typing");

function typeEffect(){
  if(char < texts[index].length){
    typing.textContent += texts[index].charAt(char);
    char++;
    setTimeout(typeEffect,100);
  }else{
    setTimeout(eraseEffect,1500);
  }
}

function eraseEffect(){
  if(char > 0){
    typing.textContent = texts[index].substring(0,char-1);
    char--;
    setTimeout(eraseEffect,50);
  }else{
    index = (index+1)%texts.length;
    setTimeout(typeEffect,500);
  }
}
typeEffect();

// scroll reveal
const sections = document.querySelectorAll(".section");
window.addEventListener("scroll",()=>{
  sections.forEach(sec=>{
    if(window.scrollY > sec.offsetTop-400){
      sec.classList.add("show");
    }
  });
});

// mobile menu
document.querySelector(".menu-toggle").onclick=()=>{
  document.querySelector(".nav-links").classList.toggle("active");
};