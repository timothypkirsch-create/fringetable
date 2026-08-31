import fs from 'node:fs/promises';

const cards=[
  {name:'Jamaican Brown Stew Chicken',region:'Jamaica / Caribbean',slug:'jamaican-brown-stew-chicken',group:'caribbean-lowcountry',type:'Main / Stew',time:'1 hr 45 min',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Brown%20Stew%20Chicken%20at%20Island%20Taste.jpg?width=1400',summary:'Jamaican brown stew chicken: deeply browned chicken simmered with thyme, scallion, Scotch bonnet, sweet pepper and a glossy savory gravy.',story:'Brown stew chicken is a Jamaican home-cooking staple built around seasoning, browning and a gentle covered simmer. Jamaican sources connect it to Sunday meals and describe family-to-family variation in browning sauce, tomato, vegetables and heat.',shop:[{label:'Jamaican browning sauce',url:'https://www.amazon.com/s?k=Jamaican%20browning%20sauce'}]},
  {name:'Georgian Chakhokhbili',region:'Georgia / Caucasus',slug:'georgian-chakhokhbili',group:'caucasus-central-west-asia',type:'Main / Stew',time:'1 hr 20 min',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Chakhokhbili%20Closeup.jpg?width=1400',summary:'Georgian chakhokhbili: chicken slowly cooked in its own juices with onions, ripe tomato, garlic, coriander and fresh herbs until glossy and intensely aromatic.',story:"Georgia's national tourism authority describes chakhokhbili as a dish once associated with pheasant and now most often made with chicken. Its defining method is to render and cook the bird first, then build the tomato-onion-herb sauce around those concentrated juices.",shop:[]},
  {name:'Hanoi Bún Chả',region:'Hanoi / Vietnam',slug:'hanoi-bun-cha',group:'southeast-asia',type:'Main / Noodles',time:'1 hr 30 min',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Bun-cha-hanoi.jpg?width=1400',summary:'Hanoi bún chả: smoky grilled pork patties and pork belly served with rice vermicelli, herbs and a warm sweet-sour fish-sauce dipping broth.',story:"Vietnam's tourism authorities identify bún chả as a signature Hanoi dish, traditionally associated with lunch. The dish is served in components so diners can combine grilled pork, noodles, herbs and dipping broth bite by bite.",shop:[{label:'Vietnamese fish sauce',url:'https://www.amazon.com/s?k=Vietnamese%20fish%20sauce'},{label:'rice vermicelli bun noodles',url:'https://www.amazon.com/s?k=Vietnamese%20rice%20vermicelli%20bun'}]}
];

let core=await fs.readFile('assets/js/site-core.js','utf8');
const restored=[];
for(const card of cards){
  if(core.includes(`"slug":"${card.slug}"`)||core.includes(`slug:'${card.slug}'`))continue;
  core=core.replace('const catalog=[','const catalog=['+JSON.stringify(card)+',');
  restored.push(card.slug);
}
await fs.writeFile('assets/js/site-core.js',core);
console.log(`restored-catalog-cards: ${restored.length}`);
if(restored.length)console.log(restored.join(', '));
