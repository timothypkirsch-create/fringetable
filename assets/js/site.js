
(()=>{
const cards=[...document.querySelectorAll('.recipe-card')];
const recipeLinks=cards.map(c=>c.querySelector('.card-link')?.getAttribute('href')).filter(Boolean);
const currentPrefix=location.pathname.includes('/recipes/')||location.pathname.includes('/subrecipes/')?'../':'';
function randomRecipe(e){if(e)e.preventDefault(); if(!recipeLinks.length){location.href=currentPrefix+'index.html#recipes';return;} let u=recipeLinks[Math.floor(Math.random()*recipeLinks.length)]; if(currentPrefix && !u.startsWith('../')) u='../'+u; location.href=u;}
document.querySelectorAll('[data-surprise]').forEach(a=>a.addEventListener('click',randomRecipe));
const filters=[...document.querySelectorAll('.filter')];
filters.forEach(b=>b.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter.toLowerCase();cards.forEach(c=>{const hay=(c.dataset.name+' '+c.dataset.region+' '+c.dataset.type).toLowerCase();c.style.display=(f==='all'||hay.includes(f))?'':'none';});}));
const modal=document.querySelector('.modal'), input=document.querySelector('#siteSearch'), results=document.querySelector('.search-results');
document.querySelectorAll('.search-trigger').forEach(b=>b.addEventListener('click',()=>{if(!modal)return;modal.setAttribute('aria-hidden','false');setTimeout(()=>input?.focus(),50)}));
document.querySelectorAll('.close').forEach(b=>b.addEventListener('click',()=>modal?.setAttribute('aria-hidden','true')));
modal?.addEventListener('click',e=>{if(e.target===modal)modal.setAttribute('aria-hidden','true')});
input?.addEventListener('input',()=>{const q=input.value.trim().toLowerCase(); if(!q){results.innerHTML='<p>Start typing a dish or region.</p>';return;} const hits=cards.filter(c=>(c.dataset.name+' '+c.dataset.region+' '+c.textContent).toLowerCase().includes(q)).slice(0,10);results.innerHTML=hits.length?hits.map(c=>{const a=c.querySelector('.card-link'),name=c.querySelector('h3').textContent,origin=c.querySelector('.origin')?.textContent||'';let href=a.getAttribute('href');if(currentPrefix&&!href.startsWith('../'))href='../'+href;return `<a href="${href}"><strong>${name}</strong><br><small>${origin}</small></a>`}).join(''):'<p>No recipes found.</p>';});
const slides=[...document.querySelectorAll('.hero-slide')], dots=[...document.querySelectorAll('.hero-dots button')];let idx=0,timer;
function show(i){if(!slides.length)return;idx=(i+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle('active',j===idx));dots.forEach((d,j)=>d.classList.toggle('active',j===idx));}
dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);clearInterval(timer);timer=setInterval(()=>show(idx+1),6500)})); if(slides.length>1)timer=setInterval(()=>show(idx+1),6500);
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-container nav');menu?.addEventListener('click',()=>{nav?.classList.toggle('open');menu.setAttribute('aria-expanded',nav?.classList.contains('open')?'true':'false')});
})();
