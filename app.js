'use strict';
const DATA = window.SOM_DATA;
const $ = id => document.getElementById(id);
const MODES = [
  ['food','🍳','สุ่มอาหาร'], ['budget','💸','สุ่มงบราคา'], ['restaurant','📍','สุ่มร้าน'],
  ['type','🍱','สุ่มประเภทอาหาร'], ['dessert','🍧','สุ่มของหวาน'], ['drink','🧋','สุ่มเครื่องดื่ม'], ['challenge','✨','ชาเลนจ์วันนี้']
];
let mode = 'food', category = 'ทั้งหมด', previous = {}, timer;
const money = n => new Intl.NumberFormat('th-TH', {maximumFractionDigits:2}).format(n);
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const unique = list => [...new Set(list)];
function readFilters() {
  const raw = ['budget','min-price','max-price'].map(id => $(id).value.trim());
  const [budget,min,max] = raw.map(Number);
  let error = '';
  if (raw.some(v => v === '') || [budget,min,max].some(v => !Number.isFinite(v) || v < 0 || v > 10000 || !Number.isInteger(v))) error = 'กรอกงบและช่วงราคาเป็นจำนวนเต็มตั้งแต่ 0–10,000 บาท';
  else if (min > max) error = 'ราคาต่ำสุดต้องไม่มากกว่าราคาสูงสุด';
  return { budget, min, max, search: $('search').value.trim().toLocaleLowerCase('th'), error };
}
function eligible(f) {
  if (f.error) return [];
  return DATA.menus.filter(m => {
    const s = DATA.sources[m.source];
    return m.price <= f.budget && m.price >= f.min && m.price <= f.max && (category === 'ทั้งหมด' || category === m.category)
      && `${m.name} ${s.restaurant} ${s.branch} ${m.type}`.toLocaleLowerCase('th').includes(f.search);
  });
}
function pick(list, key) {
  if (!list.length) return undefined;
  const choices = list.length > 1 ? list.filter(v => v !== previous[key]) : list;
  const value = choices[Math.floor(Math.random() * choices.length)];
  previous[key] = value;
  return value;
}
function card(m, budget) {
  const s = DATA.sources[m.source];
  return `<article class="menu-card" data-category="${m.category}"><div class="card-art" aria-hidden="true"><span>${m.emoji}</span><small>${m.category}</small></div><div class="card-body"><h3>${escapeHTML(m.name)}</h3><p class="restaurant">${escapeHTML(s.restaurant)}</p><p class="branch">⌖ ${escapeHTML(s.branch)}</p><div class="card-price"><strong>฿${money(m.price)}</strong><span>เหลืองบ ฿${money(budget-m.price)}</span></div><div class="card-source"><span>${s.channel}</span><a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="ดูแหล่งราคา ${escapeHTML(m.name)}">ดูราคาอ้างอิง ↗</a></div></div></article>`;
}
function render() {
  const f = readFilters();
  $('validation').hidden = !f.error;
  $('validation').textContent = f.error;
  const items = eligible(f).sort((a,b) => $('sort').value === 'name' ? a.name.localeCompare(b.name,'th') : $('sort').value === 'desc' ? b.price-a.price : a.price-b.price);
  $('count').textContent = f.error ? 'ตรวจตัวเลขก่อนค้นหา' : `เจอ ${items.length} เมนู ในงบ ฿${money(f.budget)} / รายการ`;
  $('menu-grid').innerHTML = items.length ? items.map(m => card(m,f.budget)).join('') : `<div class="empty"><h3>${f.error ? 'ตัวเลขยังไม่ถูกต้อง' : 'ยังไม่มีเมนูที่ตรงกับงบนี้'}</h3><p>${f.error ? 'แก้ไขช่องที่ระบุด้านบน แล้วลองอีกครั้ง' : 'ลองเพิ่มงบ ขยายช่วงราคา หรือล้างตัวกรอง · เมนูในชุดข้อมูลเริ่มต้น 25 บาท'}</p></div>`;
}
function resetResult() {
  clearTimeout(timer); $('roll').disabled = false; $('roll').textContent = '⤨ สุ่มเลย!';
  $('result').innerHTML = '<span class="result-icon">🍽️</span><h3>พร้อมเลือกความอร่อยแล้ว</h3><p>กดสุ่มเพื่อเลือกจากตัวกรองปัจจุบัน</p>';
}
function showResult(icon,title,detail='',extra='') {
  $('result').innerHTML = `<span class="result-icon">${icon}</span><h3>${escapeHTML(title)}</h3><p>${escapeHTML(detail)}</p>${extra}`;
  $('result').classList.remove('pop'); void $('result').offsetWidth; $('result').classList.add('pop');
}
function showMenu(m, prefix='') {
  const s = DATA.sources[m.source];
  showResult(m.emoji, prefix + m.name, `${s.restaurant} · ${s.branch}`, `<div class="price">฿${money(m.price)}</div><p>${s.channel} · ไม่รวมค่าใช้จ่ายเพิ่มเติม</p><a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer">ดูเมนูและราคาอ้างอิง ↗</a>`);
}
function rollBudget() {
  // Independent of the current budget: only validate the bounds for budget mode.
  const low = $('min-price').value.trim(), high = $('max-price').value.trim();
  const min = Number(low), max = Number(high);
  if (low === '' || high === '' || !Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max > 10000 || min > max) {
    showResult('🔎','ตรวจช่วงราคาก่อน','กำหนดช่วงจำนวนเต็ม 0–10,000 บาท และให้ค่าต่ำสุดไม่เกินค่าสูงสุด'); return;
  }
  let n = min + Math.floor(Math.random()*(max-min+1));
  if (max > min && n === previous.budget) n = n === max ? min : n+1;
  previous.budget = n; $('budget').value = n; render();
  showResult('💸',`มื้อนี้มีงบ ${money(n)} บาท`,'อัปเดตรายการที่ซื้อได้ด้านล่างแล้ว · งบนี้ยังไม่รวมค่าใช้จ่ายเพิ่ม');
}
function draw() {
  if (mode === 'budget') { rollBudget(); return; }
  const f = readFilters();
  if (f.error) { showResult('🔎','ตรวจตัวเลขก่อนสุ่ม',f.error); return; }
  let items = eligible(f);
  const desired = {food:'อาหาร',dessert:'ของหวาน',drink:'เครื่องดื่ม',type:'อาหาร'}[mode];
  if (desired) items = items.filter(m => m.category === desired);
  if (!items.length) { showResult('🥣','ยังไม่มีตัวเลือกในโหมดนี้','ลองเพิ่มงบ เปลี่ยนหมวดเป็นทั้งหมด หรือล้างตัวกรอง'); return; }
  if (mode === 'restaurant') {
    const source = pick(unique(items.map(m=>m.source)),mode);
    const s = DATA.sources[source], available = items.filter(m=>m.source===source);
    showResult('📍',s.restaurant,`${s.branch} · มี ${available.length} เมนูตรงตัวกรอง`, `<p>${available.map(m=>`${escapeHTML(m.name)} ฿${money(m.price)}`).join(' · ')}</p><a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer">ดูร้านและราคา ↗</a>`);
  } else if (mode === 'type') {
    const type = pick(unique(items.map(m=>m.type)),mode);
    const m = pick(items.filter(m=>m.type===type),'type-menu');
    showMenu(m,`สาย${type} — `);
  } else if (mode === 'challenge') {
    const challenge = pick(['ลองเมนูที่ไม่เคยสั่ง','ชวนเพื่อนให้ลองเมนูเดียวกัน','ถ่ายรูปมื้อนี้เก็บไว้'],mode);
    const m = pick(items,'challenge-menu');
    showMenu(m); $('result').insertAdjacentHTML('afterbegin',`<p>✨ ${escapeHTML(challenge)}</p>`);
  } else showMenu(pick(items,mode));
}
function selectMode(id) {
  mode = id; resetResult();
  for (const b of $('modes').children) b.setAttribute('aria-pressed',String(b.dataset.mode===mode));
  $('mode-caption').textContent = MODES.find(m=>m[0]===mode)[2];
}
$('modes').innerHTML = MODES.map(([id,icon,label])=>`<button type="button" class="mode" data-mode="${id}" aria-pressed="${id===mode}"><span aria-hidden="true">${icon}</span><b>${label}</b></button>`).join('');
$('modes').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b)selectMode(b.dataset.mode);});
$('categories').innerHTML = ['ทั้งหมด','อาหาร','ของหวาน','เครื่องดื่ม'].map(c=>`<button type="button" class="category" data-category="${c}" aria-pressed="${c===category}">${c}</button>`).join('');
$('categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;for(const el of $('categories').children)el.setAttribute('aria-pressed',String(el===b));resetResult();render();});
$('roll').addEventListener('click',()=>{ $('roll').disabled=true;$('roll').textContent='กำลังเลือกความอร่อย…';timer=setTimeout(()=>{draw();$('roll').disabled=false;$('roll').textContent='⤨ สุ่มใหม่อีกครั้ง';},matchMedia('(prefers-reduced-motion: reduce)').matches?0:350); });
$('random-budget').addEventListener('click',()=>{selectMode('budget');rollBudget();});
$('filters').addEventListener('submit',e=>{e.preventDefault();render();});
$('filters').addEventListener('input',()=>{resetResult();render();});
$('sort').addEventListener('change',render);
for(const b of document.querySelectorAll('[data-budget]')) b.addEventListener('click',()=>{$('budget').value=b.dataset.budget;resetResult();render();});
$('reset').addEventListener('click',()=>{$('filters').reset();category='ทั้งหมด';for(const el of $('categories').children)el.setAttribute('aria-pressed',String(el.dataset.category===category));resetResult();render();});
$('data-count').textContent = `${DATA.menus.length} เมนู · ${Object.keys(DATA.sources).length} ร้าน/สาขา`;
$('source-list').innerHTML = Object.values(DATA.sources).map(s=>`<a class="source-link" href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.restaurant)} ↗<span>${escapeHTML(s.branch)} · ${s.label}</span></a>`).join('');
render();
