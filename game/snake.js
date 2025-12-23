const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let box, cols, rows;
let snake = [], direction='RIGHT', food;
let score=0, level=1, speed=150;
let gamePaused=false, game;
let particles=[], glowTrail=[];

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const startScreen = document.getElementById('startScreen');
const info = document.getElementById('info');

const eatSound = document.getElementById('eatSound');
const gameOverSound = document.getElementById('gameOverSound');
const bgMusic = document.getElementById('bgMusic');

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
document.addEventListener('keydown', changeDirection);

// Mobile swipe controls
let touchStartX=0, touchStartY=0;
document.addEventListener('touchstart', e => { touchStartX=e.touches[0].clientX; touchStartY=e.touches[0].clientY; });
document.addEventListener('touchend', e => {
    let dx = e.changedTouches[0].clientX - touchStartX;
    let dy = e.changedTouches[0].clientY - touchStartY;
    if(Math.abs(dx)>Math.abs(dy)){
        if(dx>0 && direction!=='LEFT') direction='RIGHT';
        if(dx<0 && direction!=='RIGHT') direction='LEFT';
    } else{
        if(dy>0 && direction!=='UP') direction='DOWN';
        if(dy<0 && direction!=='DOWN') direction='UP';
    }
});

// Responsive canvas
function resizeCanvas(){
    const minSide = Math.min(window.innerWidth, window.innerHeight)*0.9;
    canvas.width = minSide;
    canvas.height = minSide;
    box = Math.floor(canvas.width/20);
    cols = Math.floor(canvas.width/box);
    rows = Math.floor(canvas.height/box);
    resetGame();
}
window.addEventListener('resize', resizeCanvas);

// Snake & Food
function initSnake(){ snake=[{x:Math.floor(cols/2)*box, y:Math.floor(rows/2)*box}]; direction='RIGHT'; food=generateFood(); }
function generateFood(){
    return { x: Math.floor(Math.random()*cols)*box, y: Math.floor(Math.random()*rows)*box, color:getRandomColor() };
}

// Particle & Glow
function createParticles(x,y,color){ for(let i=0;i<20;i++){ particles.push({x:x+box/2, y:y+box/2, vx:(Math.random()-0.5)*4, vy:(Math.random()-0.5)*4, alpha:1, color:color}); } }
function updateParticles(){ particles.forEach((p,i)=>{ p.x+=p.vx; p.y+=p.vy; p.alpha-=0.03; if(p.alpha<=0) particles.splice(i,1); }); }
function drawParticles(){ particles.forEach(p=>{ ctx.fillStyle=`rgba(${hexToRgb(p.color)},${p.alpha})`; ctx.fillRect(p.x,p.y,4,4); }); }
function addGlow(x,y){ glowTrail.push({x,y,alpha:0.5}); if(glowTrail.length>20) glowTrail.shift(); }
function drawGlow(){ glowTrail.forEach(g=>{ ctx.fillStyle=`rgba(0,255,0,${g.alpha})`; ctx.fillRect(g.x,g.y,box,box); }); }
function hexToRgb(hex){ hex=hex.replace('#',''); let bigint=parseInt(hex,16); let r=(bigint>>16)&255; let g=(bigint>>8)&255; let b=bigint&255; return `${r},${g},${b}`; }

// Game loop
function draw(){
    ctx.fillStyle='#111'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=food.color; ctx.beginPath(); ctx.arc(food.x+box/2,food.y+box/2,box/2,0,Math.PI*2); ctx.fill();
    drawGlow();
    for(let i=0;i<snake.length;i++){ ctx.fillStyle=i===0?'#0f0':`rgb(${50+i*10},${255-i*10},50)`; ctx.fillRect(snake[i].x,snake[i].y,box,box); }

    let headX=snake[0].x, headY=snake[0].y;
    if(direction==='UP') headY-=box; if(direction==='DOWN') headY+=box; if(direction==='LEFT') headX-=box; if(direction==='RIGHT') headX+=box;

    if(headX===food.x && headY===food.y){
        score+=10; eatSound.play(); createParticles(food.x,food.y,food.color); addGlow(headX,headY);
        document.getElementById('score').innerText=score;
        if(score%50===0){ level++; document.getElementById('level').innerText=level; speed=speed>50?speed-10:speed; clearInterval(game); game=setInterval(draw,speed); }
        food=generateFood();
    } else snake.pop();

    snake.unshift({x:headX,y:headY}); addGlow(headX,headY);
    if(headX<0||headX>=canvas.width||headY<0||headY>=canvas.height||checkCollision({x:headX,y:headY},snake.slice(1))) gameOver();
    updateParticles(); drawParticles();
}
function checkCollision(head,array){ return array.some(seg=>seg.x===head.x && seg.y===head.y); }

function startGame(){ startScreen.style.display='none'; canvas.style.display='block'; info.style.display='block'; bgMusic.play(); resizeCanvas(); game=setInterval(draw,speed); }
function togglePause(){ if(gamePaused){ game=setInterval(draw,speed); pauseBtn.innerText="Pause"; bgMusic.play(); gamePaused=false; } else{ clearInterval(game); pauseBtn.innerText="Resume"; bgMusic.pause(); gamePaused=true; } }
function changeDirection(e){ if(e.key==='ArrowUp' && direction!=='DOWN') direction='UP'; if(e.key==='ArrowDown' && direction!=='UP') direction='DOWN'; if(e.key==='ArrowLeft' && direction!=='RIGHT') direction='LEFT'; if(e.key==='ArrowRight' && direction!=='LEFT') direction='RIGHT'; }
function gameOver(){ gameOverSound.play(); bgMusic.pause(); clearInterval(game); alert(`Game Over! Score: ${score}`); resetGame(); }
function resetGame(){ initSnake(); score=0; level=1; speed=150; glowTrail=[]; particles=[]; document.getElementById('score').innerText=score; document.getElementById('level').innerText=level; startScreen.style.display='block'; canvas.style.display='none'; info.style.display='none'; pauseBtn.style.display='none'; pauseBtn.innerText="Pause"; gamePaused=false; }
function getRandomColor(){ const colors=['#ff4d4d','#ffb84d','#4dff88','#4da6ff','#b84dff','#fff14d']; return colors[Math.floor(Math.random()*colors.length)]; }
