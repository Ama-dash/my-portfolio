// Project modals
function openModal(id){ document.getElementById(id).style.display="block"; }
function closeModal(id){ document.getElementById(id).style.display="none"; }
window.onclick=function(e){ document.querySelectorAll('.modal').forEach(modal=>{ if(e.target==modal){ modal.style.display="none"; } }); }

// Scroll-triggered animations
const faders=document.querySelectorAll('.fade-up');
const appearOptions={threshold:0.2, rootMargin:"0px 0px -50px 0px"};
const appearOnScroll=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('show'); observer.unobserve(entry.target); } });
}, appearOptions);
faders.forEach(fader=>{ appearOnScroll.observe(fader); });

// Particle effect for hero
const canvas=document.getElementById('hero-canvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particlesArray=[];
class Particle{ constructor(){ this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.size=Math.random()*3+1; this.speedX=Math.random()*1-0.5; this.speedY=Math.random()*1-0.5; } update(){ this.x+=this.speedX; this.y+=this.speedY; if(this.x>canvas.width)this.x=0;if(this.x<0)this.x=canvas.width;if(this.y>canvas.height)this.y=0;if(this.y<0)this.y=canvas.height;} draw(){ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill();}}
function init(){particlesArray=[]; for(let i=0;i<100;i++){particlesArray.push(new Particle());}}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height); particlesArray.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animate);}
init(); animate();
window.addEventListener('resize',function(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; init(); });

// Typing effect in hero
const typedText = document.getElementById('typed-text');
const phrases = ["Aspiring Cloud Engineer","AWS Enthusiast","Problem Solver"];
let i = 0, j = 0, currentPhrase = [], isDeleting=false;
function type(){
    if(i>=phrases.length)i=0;
    let fullText=phrases[i];
    if(isDeleting){ currentPhrase=fullText.substring(0,j--); }
    else{ currentPhrase=fullText.substring(0,j++); }
    typedText.textContent=currentPhrase;
    if(!isDeleting && j===fullText.length){ isDeleting=true; setTimeout(type,1000); return; }
    if(isDeleting && j===0){ isDeleting=false; i++; setTimeout(type,500); return; }
    setTimeout(type, isDeleting?50:100);
}
type();

// Animated Skill Bars on scroll
const skillFills=document.querySelectorAll('.skill-fill');
window.addEventListener('scroll',()=>{
    skillFills.forEach(fill=>{
        const parent=fill.closest('.skill-card');
        const rect=parent.getBoundingClientRect();
        if(rect.top<window.innerHeight-100){ fill.style.width=fill.dataset.skill; }
    });
});

// Scroll Progress Bar
const progressBar=document.getElementById('progress-bar');
window.addEventListener('scroll',()=>{ const scrollTop=document.documentElement.scrollTop; const height=document.documentElement.scrollHeight-window.innerHeight; const scrollPercent=(scrollTop/height)*100; progressBar.style.width=scrollPercent+'%'; });

// Dark Mode Toggle
function toggleDarkMode(){
    document.body.classList.toggle('dark');
}

// Floating Shapes for all sections
const floatingCanvases = document.querySelectorAll('.floating-canvas');
floatingCanvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let shapes = [];
    class Shape {
        constructor(){ this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.size=Math.random()*5+2; this.speedX=Math.random()*1-0.5; this.speedY=Math.random()*1-0.5; }
        update(){ this.x+=this.speedX; this.y+=this.speedY; if(this.x>canvas.width)this.x=0;if(this.x<0)this.x=canvas.width;if(this.y>canvas.height)this.y=0;if(this.y<0)this.y=canvas.height; }
        draw(){ ctx.fillStyle='rgba(0,170,255,0.5)'; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
    }
    function initShapes(){ shapes=[]; for(let i=0;i<50;i++){ shapes.push(new Shape()); } }
    function animateShapes(){ ctx.clearRect(0,0,canvas.width,canvas.height); shapes.forEach(s=>{s.update(); s.draw();}); requestAnimationFrame(animateShapes); }
    initShapes(); animateShapes();
    window.addEventListener('resize',()=>{ canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; initShapes(); });
});
