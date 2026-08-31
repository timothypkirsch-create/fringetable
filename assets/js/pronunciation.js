(()=>{
const entries=[
['ackee','AH-kee','Jamaica / Caribbean','Tropical fruit central to Jamaica’s national dish.'],
['akara','ah-KAH-rah','Yoruba / West Africa','Bean fritters made from peeled black-eyed peas or cowpeas.'],
['alicha','ah-LEE-chah','Ethiopia / Eritrea','A mild, turmeric-forward stew style.'],
['asida','ah-SEE-dah','Sudan / Northeast Africa','A smooth, firm porridge served with savory sauces or stews.'],
['ashak','ah-SHAHK','Afghanistan','Dumplings commonly filled with chives or leeks and served with sauces.'],
['azifa','ah-ZEE-fah','Ethiopia','A tangy lentil salad often served cool.'],
['badrijani nigvzit','bah-dree-JAH-nee neeg-VZEET','Georgia','Eggplant rolls or slices with walnut filling.'],
['banh xeo','bahn SAY-oh','Vietnam','A crisp savory rice-flour crepe.'],
['berbere','BEHR-beh-reh','Ethiopia / Eritrea','A chile-forward spice blend used across Ethiopian and Eritrean cooking.'],
['ceebu jen','CHEH-boo jen','Senegal','Wolof name commonly used for Senegal’s fish-and-rice dish.'],
['chechebsa','cheh-CHEB-sah','Ethiopia','A breakfast of torn flatbread tossed with seasoned fat and spice.'],
['chorba frik','SHOR-bah freek','Algeria / Maghreb','A soup built around green cracked wheat, tomato and aromatics.'],
['dal bhat','dahl baht','Nepal / South Asia','The everyday pairing of lentil soup and rice.'],
['devzira','dev-ZEE-rah','Uzbekistan / Central Asia','A rice variety associated with Uzbek palov.'],
['diri kole ak pwa rouj','dee-REE koh-LAY ak pwah ROOZH','Haiti','Haitian rice cooked with red beans.'],
['doro wat','DOH-roh waht','Ethiopia','A deeply spiced chicken stew often served with injera.'],
['dovga','DOV-gah','Azerbaijan','A yogurt-and-herb soup.'],
['doubles','DUHB-uhlz','Trinidad and Tobago','Curried chickpeas served between two bara breads.'],
['egusi','eh-GOO-see','West Africa','Protein-rich melon seeds used to thicken soups and stews.'],
['ema datshi','EH-mah DAHT-shee','Bhutan','A chile-and-cheese dish central to Bhutanese cooking.'],
['epis','eh-PEES','Haiti','A Haitian seasoning base of herbs, aromatics and peppers.'],
['escovitch','ES-koh-vitch','Jamaica','A Jamaican preparation of fried fish topped with spiced pickled vegetables.'],
['efo riro','EH-foh REE-roh','Yoruba / Nigeria','A richly seasoned leafy-green stew.'],
['firfir','FEER-feer','Ethiopia / Eritrea','Torn bread tossed with sauce or seasoned fat.'],
['fossolia','foh-SOH-lee-ah','Ethiopia / Eritrea','A green-bean and carrot dish often cooked with tomato and aromatics.'],
['ful medames','fool meh-DAH-mes','Sudan / Northeast Africa','Slow-cooked fava beans served with seasonings and garnishes.'],
['gado-gado','GAH-doh GAH-doh','Indonesia','Vegetables, tofu and other components served with peanut sauce.'],
['genfo','GEN-foh','Ethiopia','A thick porridge traditionally shaped around a seasoned center.'],
['ghapama','gah-pah-MAH','Armenia','A festive stuffed pumpkin filled with rice, fruit and nuts.'],
['ghormeh sabzi','GHOOR-meh SAB-zee','Iran / Persia','An herb-rich stew commonly made with beans and meat.'],
['gomen','GOH-men','Ethiopia','Cooked leafy greens, often collards, seasoned with aromatics.'],
['griot','gree-OH','Haiti','Marinated pork cooked until tender and then crisped.'],
['gundruk','GOON-drook','Nepal','Fermented leafy greens used in soups, relishes and side dishes.'],
['gurasa','goo-RAH-sah','Sudan','A soft round flatbread.'],
['harira','hah-REE-rah','Morocco / Maghreb','A tomato-based soup with legumes, herbs and often meat.'],
['hoentay','HEN-tay','Bhutan','Buckwheat dumplings associated with Bhutan’s Haa Valley.'],
['injera','in-JEHR-ah','Ethiopia / Eritrea','A fermented flatbread traditionally made with teff.'],
['jasha maroo','JAH-shah mah-ROO','Bhutan','A light but fiery Bhutanese chicken dish.'],
['jollof','JOL-off','West Africa','A tomato-seasoned rice dish with many national and regional versions.'],
['kanuchi','kah-NOO-chee','Cherokee / Indigenous Americas','A traditional hickory-nut preparation.'],
['kelewele','keh-leh-WEH-leh','Ghana','Spiced fried ripe plantain.'],
['kewa datshi','KEH-wah DAHT-shee','Bhutan','A Bhutanese potato-and-cheese dish.'],
['khao piak sen','kow PEE-ak sen','Laos','A Lao hand-cut noodle soup.'],
['khao soi','kow SOY','Northern Thailand','A curry noodle soup associated with northern Thailand.'],
['khachapuri','khah-chah-POO-ree','Georgia','A family of Georgian cheese-filled breads.'],
['khar','khar','Assam / India','An alkaline preparation distinctive to Assamese cuisine.'],
['khinkali','kheen-KAH-lee','Georgia','Georgian soup dumplings.'],
['kiribath','KEE-ree-baht','Sri Lanka','Coconut milk rice commonly cut into diamonds.'],
['kisra','KEES-rah','Sudan','A thin fermented sorghum flatbread.'],
['kuku sabzi','koo-KOO SAB-zee','Iran / Persia','A dense herb omelet associated especially with Nowruz.'],
['lahpet','lah-PEHT','Myanmar','Fermented tea leaves eaten as a food ingredient.'],
['lahpet thoke','lah-PEHT thohk','Myanmar','A Burmese fermented tea-leaf salad.'],
['lagman','LAHG-mahn','Central Asia','Hand-pulled or cut noodles served with a savory topping or broth.'],
['lablabi','lah-BLAH-bee','Tunisia','A chickpea-and-bread soup seasoned with harissa and cumin.'],
['larb','lahp','Laos','A minced-meat or fish salad seasoned with herbs, lime and toasted rice.'],
['mafe','mah-FEH','Senegal / West Africa','A peanut-based stew.'],
['mangu','mahn-GOO','Dominican Republic','Mashed green plantains.'],
['mayi moulen','mah-YEE moo-LEN','Haiti','Haitian cornmeal porridge, often served savory.'],
['mchadi','MCHAH-dee','Georgia','A simple Georgian corn bread.'],
['misir wot','mee-SEER waht','Ethiopia','A berbere-spiced red lentil stew.'],
['mofongo','moh-FONG-goh','Puerto Rico','Mashed fried green plantain pounded with garlic and seasonings.'],
['mohinga','moh-HEEN-gah','Myanmar','A fish-and-rice-noodle soup widely associated with breakfast.'],
['moi moi','moy moy','Nigeria','A steamed savory bean pudding.'],
['mok pa','mohk pah','Laos','Herbed fish wrapped in banana leaf and steamed.'],
['momo','MOH-moh','Nepal / Himalayas','A filled dumpling found across Himalayan foodways.'],
['nasaump','nah-SAWMP','Wampanoag / Indigenous Americas','A cornmeal porridge documented in Wampanoag food history.'],
['nasi lemak','NAH-see LEH-mahk','Malaysia','Coconut rice served with sambal and accompaniments.'],
['nan gyi thoke','nahn-jee thohk','Myanmar','A Burmese thick-rice-noodle salad.'],
['niter kibbeh','NEE-ter kih-BEH','Ethiopia / Eritrea','Spiced clarified butter.'],
['ohn no khao swe','ohn-noh kow SWEH','Myanmar','A coconut chicken noodle soup.'],
['or lam','aw LAHM','Laos','A Luang Prabang-style stew rich with herbs and vegetables.'],
['palov','pah-LOHV','Uzbekistan / Central Asia','Uzbek rice pilaf cooked with meat, carrots and aromatics.'],
['parippu','pah-REE-poo','Sri Lanka','Lentils; often shorthand for Sri Lankan lentil curry.'],
['pelau','peh-LOW','Trinidad and Tobago','A one-pot rice dish commonly made with browned meat, peas and coconut milk.'],
['pkhali','PKHAH-lee','Georgia','A family of vegetable-and-walnut dishes; also spelled pkhali.'],
['piti','pee-TEE','Azerbaijan','A slow-cooked meat and chickpea stew traditionally made in individual pots.'],
['pikliz','PEEK-leez','Haiti','A spicy Haitian pickled cabbage and vegetable condiment.'],
['piki','PEE-kee','Hopi / Indigenous Americas','A very thin blue-corn bread associated with Hopi foodways.'],
['pol sambol','pohl SAHM-bohl','Sri Lanka','A fresh coconut relish with chile and lime.'],
['qutab','goo-TAHB','Azerbaijan','A thin stuffed flatbread.'],
['rfissa','ruh-FEE-sah','Morocco','A Moroccan dish of chicken, lentils and shredded flatbread.'],
['salata aswad','sah-LAH-tah AHS-wad','Sudan','Sudanese eggplant salad.'],
['samsa','SAHM-sah','Uzbekistan / Central Asia','A baked savory pastry, commonly filled with meat and onion.'],
['sel roti','sel ROH-tee','Nepal','A ring-shaped fried rice bread.'],
['shakshuka','shahk-SHOO-kah','North Africa / Middle East','Eggs cooked in a spiced tomato-and-pepper sauce.'],
['shan noodles','shahn NOO-duhlz','Myanmar','Noodles associated with Shan State, usually served with a savory topping.'],
['shapale','shah-PAH-lay','Tibet / Himalayas','A Tibetan fried meat pie.'],
['shiro wot','SHEE-roh waht','Ethiopia','A smooth stew based on seasoned chickpea or broad-bean flour.'],
['siddu','SID-doo','Himachal Pradesh / India','A steamed yeast-raised wheat bread or bun.'],
['siga tibs','SEE-gah tibs','Ethiopia','Sautéed or grilled beef pieces, often served sizzling.'],
['soto ayam','SOH-toh AH-yahm','Indonesia','An aromatic Indonesian chicken soup.'],
['spas','spahs','Armenia','A tangy yogurt-and-grain soup.'],
['tam mak hoong','tahm mahk HOONG','Laos','Lao green papaya salad.'],
['tamia','tah-MEE-ah','Sudan','A Sudanese falafel-style fritter, often made with broad beans.'],
['thenthuk','TEN-thook','Tibet / Himalayas','A hand-pulled noodle soup.'],
['thiakry','CHAH-kree','Senegal / West Africa','A sweet millet-and-yogurt preparation.'],
['thieboudienne','cheh-boo-JEN','Senegal','French-derived spelling often used for Senegal’s fish-and-rice dish.'],
['tibs','tibs','Ethiopia','Sautéed or grilled pieces of meat.'],
['tikil gomen','TEE-kil GOH-men','Ethiopia','A mild cabbage-and-vegetable dish.'],
['timur','tee-MOOR','Nepal / Himalayas','A citrusy, tingling spice related to Sichuan pepper.'],
['tofu nway','toh-FOO nway','Myanmar','Warm Burmese chickpea tofu served soft and creamy.'],
['waakye','WAH-chay','Ghana','Rice and beans traditionally colored and flavored with sorghum leaves.'],
['yassa','YAH-sah','Senegal / West Africa','A tangy onion-heavy dish commonly made with chicken or fish.'],
['yomari','yoh-MAH-ree','Newar / Nepal','A steamed rice-flour dumpling with a sweet filling.'],
['zaalouk','zah-LOOK','Morocco','A cooked eggplant-and-tomato salad.'],
['zigni','ZEEN-yee','Eritrea','A chile-rich meat stew often served with injera.']
].map(([term,pronunciation,region,definition])=>({term,pronunciation,region,definition}));

const normalize=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const sorted=[...entries].sort((a,b)=>normalize(b.term).length-normalize(a.term).length);
const matchTitle=title=>{
 const n=normalize(title);
 return sorted.find(e=>n.includes(normalize(e.term)))||null;
};
window.FringeTablePronunciations={entries,matchTitle};

function addRecipePronunciation(){
 const page=document.querySelector('.recipe-page');
 if(!page||document.querySelector('.dish-pronunciation'))return;
 const h1=page.querySelector('h1');if(!h1)return;
 const hit=matchTitle(h1.textContent);if(!hit)return;
 const p=document.createElement('p');p.className='dish-pronunciation';
 p.style.cssText='margin:.45rem 0 0;font-size:.95rem;line-height:1.45;color:#5b615d;';
 p.innerHTML=`<strong style="color:#0B2118">Pronounced:</strong> ${hit.pronunciation} <a href="/pronunciation/#${encodeURIComponent(hit.term)}" style="margin-left:.35rem;font-size:.88rem">meaning & usage →</a>`;
 h1.insertAdjacentElement('afterend',p);
}

function renderGlossary(){
 const root=document.querySelector('[data-pronunciation-glossary]');if(!root)return;
 const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 const groups=new Map();
 for(const e of [...entries].sort((a,b)=>a.term.localeCompare(b.term))){const l=e.term[0].toUpperCase();if(!groups.has(l))groups.set(l,[]);groups.get(l).push(e)}
 root.innerHTML=[...groups].map(([letter,items])=>`<section class="pronunciation-letter" id="letter-${letter}"><h2>${letter}</h2><div class="pronunciation-list">${items.map(e=>`<article class="pronunciation-entry" id="${esc(e.term)}"><h3>${esc(e.term)}</h3><p class="pronunciation-say"><strong>Say it:</strong> ${esc(e.pronunciation)}</p><p>${esc(e.definition)}</p><small>${esc(e.region)}</small></article>`).join('')}</div></section>`).join('');
 const q=document.querySelector('[data-pronunciation-search]');
 if(q)q.addEventListener('input',()=>{const term=normalize(q.value);root.querySelectorAll('.pronunciation-entry').forEach(card=>{card.hidden=term&&!normalize(card.textContent).includes(term)});root.querySelectorAll('.pronunciation-letter').forEach(sec=>{sec.hidden=![...sec.querySelectorAll('.pronunciation-entry')].some(x=>!x.hidden)})});
}

document.readyState==='loading'?document.addEventListener('DOMContentLoaded',()=>{addRecipePronunciation();renderGlossary()}):(()=>{addRecipePronunciation();renderGlossary()})();
})();
