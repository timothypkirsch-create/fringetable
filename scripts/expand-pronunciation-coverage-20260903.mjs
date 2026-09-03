import fs from 'node:fs/promises';

const p='assets/js/pronunciation.js';
let js=await fs.readFile(p,'utf8');
const additions=[
['amazigh','ah-mah-ZEEGH','North Africa / Amazigh','Indigenous North African identity and language family represented across the Maghreb.'],
['couscous','KOOS-koos','North Africa','Steamed granules traditionally made from semolina and served across North Africa.'],
['anishinaabe','uh-NISH-ih-NAH-bay','Indigenous Americas','A broad cultural and linguistic identity that includes Ojibwe, Odawa and Potawatomi peoples.'],
['manoomin','mah-NOO-min','Anishinaabe / Indigenous Americas','Wild rice, a culturally important food in Anishinaabe communities.'],
['masor tenga','MAH-sor TENG-ah','Assam / India','An Assamese sour fish curry.'],
['suzme plov','SOOZ-meh plov','Azerbaijan','A style of Azerbaijani rice pilaf in which rice is cooked and drained before finishing.'],
['borani banjan','boh-RAH-nee bahn-JAHN','Afghanistan','Afghan eggplant served with tomato and garlicky yogurt.'],
['amok','ah-MOHK','Cambodia','A Cambodian preparation commonly associated with a steamed, aromatic coconut curry.'],
['banaha','bah-NAH-hah','Choctaw / Chickasaw','A cornmeal-based bread traditionally wrapped and cooked.'],
['dine','dih-NEH','Diné / Indigenous Americas','The name many Navajo people use for themselves.'],
['taa niil','tah-NEEL','Diné / Indigenous Americas','A Diné term associated with blue corn mush.'],
['hamli','HAHM-lee','Eritrea','Cooked greens in Eritrean cuisine.'],
['zebhi hamli','ZEH-bee HAHM-lee','Eritrea','An Eritrean stewed-greens preparation.'],
['laing','LAH-ing','Philippines / Bicol','A Bicolano dish of taro leaves cooked with coconut milk and chile.'],
['chakapuli','chah-kah-POO-lee','Georgia','A tart Georgian spring stew rich with herbs.'],
['chakhokhbili','chah-khohk-BEE-lee','Georgia','A Georgian chicken stew with tomato, onion and herbs.'],
['lobio','LOH-bee-oh','Georgia','Georgian bean dishes, often seasoned with herbs and spices.'],
['gullah geechee','GUH-lah GEE-chee','South Carolina & Georgia Lowcountry','A distinct African American cultural community of the coastal Southeast.'],
['legim','leh-GEEM','Haiti','A Haitian vegetable stew, often made with meat and mashed vegetables.'],
['bun cha','boon chah','Vietnam / Hanoi','Hanoi grilled pork served with rice noodles, herbs and dipping broth.'],
['harcha','HAR-shah','Morocco','A Moroccan semolina griddle bread.'],
['haudenosaunee','hoh-dee-noh-SHOH-nee','Indigenous Americas','The people of the Haudenosaunee Confederacy, also known as the Six Nations.'],
['huzusuki','hoo-zoo-SOO-kee','Hopi / Indigenous Americas','A Hopi blue-corn finger bread.'],
['callaloo','kal-ah-LOO','Caribbean','A Caribbean greens dish whose ingredients vary by island and community.'],
['haak','hahk','Kashmir / South Asia','A Kashmiri preparation of leafy greens.'],
['khao poon','kow POON','Laos','A Lao coconut curry noodle soup.'],
['khao niew','kow NYOW','Laos','Lao sticky rice, a central staple of Lao meals.'],
['benne','BEN-ee','Gullah Geechee / Lowcountry','An older Lowcountry name for sesame with deep West African connections.'],
['taktouka','tak-TOO-kah','Morocco','A cooked Moroccan salad of peppers, tomatoes and spices.'],
['aloo tama bodi','ah-LOO TAH-mah BOH-dee','Nepal','A Nepali curry of potato, bamboo shoots and beans.'],
['ojibwe','oh-JIB-way','Indigenous Americas','An Anishinaabe people with communities across the Great Lakes region and beyond.'],
['ash reshteh','aash resh-TEH','Iran / Persia','A thick Persian noodle-and-herb soup.'],
['atole','ah-TOH-leh','Indigenous Americas / Mexico','A warm corn-based drink or porridge with many regional forms.'],
['posole','poh-SOH-leh','Indigenous Americas / Southwest','A hominy stew with deep Indigenous roots in the Americas.'],
['arroz con gandules','ah-ROHS kohn gahn-DOO-lehs','Puerto Rico','Puerto Rican rice with pigeon peas.'],
['sofkee','SOF-kee','Seminole / Indigenous Americas','A traditional Seminole corn- or rice-based porridge or drink.'],
['laxoox','lah-HOH','Somalia / Horn of Africa','A fermented Somali flatbread related to canjeero.'],
['canjeero','ahn-JEH-roh','Somalia / Horn of Africa','A fermented Somali pancake-like flatbread.'],
['soupe joumou','soop joo-MOO','Haiti','Haitian squash soup strongly associated with Independence Day.'],
['bittara appa','BIT-tah-rah AHP-pah','Sri Lanka','Sri Lankan egg hoppers.'],
['kottu roti','KOT-too ROH-tee','Sri Lanka','Chopped flatbread stir-fried with vegetables, egg and often meat.'],
['ta mia','tah-MEE-ah','Sudan','A Sudanese falafel-style fritter, often made with broad beans.'],
['ojja','OH-jah','Tunisia','A Tunisian tomato-and-pepper dish often cooked with eggs.'],
['manti','MAHN-tee','Central Asia','Steamed filled dumplings found across Central Asia and neighboring regions.'],
['bun rieu cua','boon ree-EW koo-ah','Vietnam','Vietnamese crab-and-tomato rice-noodle soup.']
];
const existing=new Set([...js.matchAll(/\['([^']+)'/g)].map(m=>m[1].toLowerCase()));
const rows=additions.filter(([term])=>!existing.has(term.toLowerCase()));
if(rows.length){
 const block=rows.map(r=>`['${r[0]}','${r[1]}','${r[2]}','${r[3].replace(/'/g,"\\'")}'],`).join('\n')+'\n';
 js=js.replace('const entries=[\n','const entries=[\n'+block);
 await fs.writeFile(p,js);
}
console.log(JSON.stringify({added:rows.length,terms:rows.map(r=>r[0])},null,2));
