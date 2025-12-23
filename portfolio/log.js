const bulb = document.querySelector(".bulb");
const inputs = document.querySelectorAll("input");
const loginBtn = document.getElementById("loginBtn");
const loader = document.getElementById("loader");
const themeBtn = document.getElementById("themeBtn");
const body = document.body;

/* FOCUS LIGHT */
inputs.forEach(i=>{
  i.addEventListener("focus",()=>{
    bulb.classList.add("on");
    bulb.classList.remove("sleep");
  });
  i.addEventListener("blur",()=>{
    bulb.classList.add("sleep");
    bulb.classList.remove("on");
  });
});

/* EYES MOVE */
let dir=true;
setInterval(()=>{
  if(!bulb.classList.contains("sleep")){
    bulb.classList.toggle("look-left",dir);
    bulb.classList.toggle("look-right",!dir);
    dir=!dir;
  }
},600);

/* LOGIN LOGIC */
loginBtn.onclick=()=>{
  loader.style.display="block";
  bulb.classList.remove("sad","happy");

  setTimeout(()=>{
    loader.style.display="none";

    const user=document.getElementById("user").value;
    const pass=document.getElementById("pass").value;

    if(user==="admin" && pass==="1234"){
      bulb.classList.add("happy","on");
    }else{
      bulb.classList.add("sad");
    }
  },1500);
};

/* THEME */
themeBtn.onclick=()=>{
  body.classList.toggle("day");
  body.classList.toggle("night");
  themeBtn.textContent=
    body.classList.contains("day")?"☀":"🌙";
};
