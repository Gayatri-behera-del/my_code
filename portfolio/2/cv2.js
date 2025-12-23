/* ================= Horizontal Drag & Mouse Wheel ================= */
const track=document.querySelector('.track');
let isDown=false,startX,scrollLeft;

track.addEventListener('mousedown', e=>{
  isDown=true;
  startX=e.pageX;
  scrollLeft=track.scrollLeft;
});
window.addEventListener('mouseup',()=>isDown=false);
window.addEventListener('mousemove', e=>{
  if(!isDown) return;
  const walk=(e.pageX-startX)*1.5;
  track.scrollLeft=scrollLeft-walk;
});

// Mouse wheel horizontal scroll
track.addEventListener('wheel', e=>{
  e.preventDefault();
  track.scrollLeft += e.deltaY*1.5;
});

/* ================= 3D Tilt & Magnetic Hover ================= */
document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r=card.getBoundingClientRect();
    const x=e.clientX - r.left;
    const y=e.clientY - r.top;
    const rx=-(y - r.height/2)/12;
    const ry=(x - r.width/2)/12;
    card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
    card.classList.add('hovered');
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform='rotateX(0) rotateY(0) scale(1)';
    card.classList.remove('hovered');
  });

  // Popup
  card.addEventListener('click', ()=>{
    popup.style.display='flex';
    popupTitle.innerText=card.dataset.title;
    popupDesc.innerText=card.dataset.desc;
  });
});

/* ================= Popup ================= */
const popup=document.getElementById('popup');
const popupTitle=document.getElementById('popupTitle');
const popupDesc=document.getElementById('popupDesc');
document.querySelector('.close').onclick=()=>{popup.style.display='none';};

/* ================= Mobile Swipe ================= */
let touchStartX=0;
track.addEventListener('touchstart', e=>{touchStartX=e.touches[0].clientX;});
track.addEventListener('touchmove', e=>{
  let touchEndX=e.touches[0].clientX;
  track.scrollLeft += (touchStartX - touchEndX)*1.5;
  touchStartX=touchEndX;
});

/* ================= Particles ================= */
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
canvas.width=innerWidth;
canvas.height=innerHeight;

let particles=[];
for(let i=0;i<150;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    vx:(Math.random()-0.5),
    vy:(Math.random()-0.5),
    r:Math.random()*2+1
  });
}

// Particle mouse interaction
let mouse={x:null,y:null};
window.addEventListener('mousemove', e=>{mouse.x=e.clientX; mouse.y=e.clientY;});

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width)p.vx*=-1;
    if(p.y<0||p.y>canvas.height)p.vy*=-1;

    if(mouse.x && mouse.y){
      let dx=p.x-mouse.x;
      let dy=p.y-mouse.y;
      let dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        let angle=Math.atan2(dy,dx);
        let force=(120-dist)/10;
        p.vx+=Math.cos(angle)*force*0.02;
        p.vy+=Math.sin(angle)*force*0.02;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(0,255,255,0.5)';
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
window.onresize=()=>{canvas.width=innerWidth; canvas.height=innerHeight;};

/* ================= Infinite Loop Cards ================= */
function loopCards(){
  const first = track.firstElementChild;
  const last = track.lastElementChild;
  if(track.scrollLeft + track.offsetWidth >= track.scrollWidth-5){
    track.appendChild(first);
    track.scrollLeft -= first.offsetWidth + 40;
  }
  if(track.scrollLeft <=0){
    track.insertBefore(last, track.firstChild);
    track.scrollLeft += last.offsetWidth + 40;
  }
  requestAnimationFrame(loopCards);
}
loopCards();