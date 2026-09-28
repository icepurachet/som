/* เพิ่ม/แก้เมนูใน menus; ราคาเป็นบาทต่อรายการ ไม่รวมค่าส่งและตัวเลือกเพิ่ม */
window.SOM_DATA = {
  checkedAt: '2026-09-29',
  sources: {
    goang: { restaurant: 'โกอ่างข้าวมันไก่ประตูน้ำ', branch: 'โชคชัย 4 · วังทองหลาง', label: 'เมนูบน Wongnai', url: 'https://www.wongnai.com/restaurants/277252kT-โกอ่างข้าวมันไก่ประตูน้ำ-โชคชัย-4-chok-chai-4/menu?menuGroupId=items', channel: 'ราคาเมนูบน Wongnai' },
    siam: { restaurant: 'ครัวสยาม', branch: 'สาทร', label: 'Wongnai × LINE MAN', url: 'https://www.wongnai.com/delivery/businesses/547285GC/order', channel: 'ราคาเดลิเวอรี' },
    tea: { restaurant: 'ชาตรามือ', branch: 'วิคตอเรีย การ์เด้นส์ · เพชรเกษม', label: 'เมนูบน Wongnai', url: 'https://www.wongnai.com/restaurants/207895jl-ชาตรามือ/menu', channel: 'ราคาเมนูบน Wongnai' },
    toast: { restaurant: 'อ้วนนมสด ขนมปังปิ้ง', branch: 'ดอนเมือง', label: 'Wongnai × LINE MAN', url: 'https://www.wongnai.com/delivery/businesses/364668ay/order', channel: 'ราคาเดลิเวอรี' }
  },
  menus: [
    { id:'g1', name:'ข้าวมันไก่ ธรรมดา', price:65, source:'goang', category:'อาหาร', type:'ข้าวมันไก่', emoji:'🍚' },
    { id:'g2', name:'ข้าวมันไก่ พิเศษ', price:95, source:'goang', category:'อาหาร', type:'ข้าวมันไก่', emoji:'🍗' },
    { id:'g3', name:'มะระตุ๋นซี่โครงหมู', price:75, source:'goang', category:'อาหาร', type:'ซุป / กับข้าว', emoji:'🥣' },
    { id:'g4', name:'ไก่ตอน จานใหญ่', price:180, source:'goang', category:'อาหาร', type:'ซุป / กับข้าว', emoji:'🍗' },
    { id:'s1', name:'ข้าวราดกะเพราหมู', price:70, source:'siam', category:'อาหาร', type:'กะเพรา', emoji:'🌶️' },
    { id:'s2', name:'ข้าวราดกะเพราไก่', price:70, source:'siam', category:'อาหาร', type:'กะเพรา', emoji:'🌶️' },
    { id:'s3', name:'ข้าวราดกะเพราหมูกรอบ', price:80, source:'siam', category:'อาหาร', type:'กะเพรา', emoji:'🍛' },
    { id:'s4', name:'ไข่เยี่ยวม้ากะเพรากรอบ ราดข้าว', price:80, source:'siam', category:'อาหาร', type:'กะเพรา', emoji:'🍳' },
    { id:'s5', name:'ข้าวผัดหมูกรอบ', price:80, source:'siam', category:'อาหาร', type:'ข้าวผัด', emoji:'🍚' },
    { id:'s6', name:'ข้าวผัดคะน้าปลาเค็ม', price:79, source:'siam', category:'อาหาร', type:'ข้าวผัด', emoji:'🥬' },
    { id:'s7', name:'ข้าวผัดปลาทู', price:80, source:'siam', category:'อาหาร', type:'ข้าวผัด', emoji:'🐟' },
    { id:'s8', name:'ข้าวผัดปลาสลิด', price:80, source:'siam', category:'อาหาร', type:'ข้าวผัด', emoji:'🍚' },
    { id:'t1', name:'โฮจิฉะลาเต้', price:55, source:'tea', category:'เครื่องดื่ม', type:'ชา', emoji:'🧋' },
    { id:'t2', name:'ชามะลิเย็น', price:50, source:'tea', category:'เครื่องดื่ม', type:'ชา', emoji:'🍵' },
    { id:'t3', name:'ชานมอัสสัม', price:50, source:'tea', category:'เครื่องดื่ม', type:'ชา', emoji:'🧋' },
    { id:'t4', name:'ชานมโฮจิฉะ', price:50, source:'tea', category:'เครื่องดื่ม', type:'ชา', emoji:'🧋' },
    { id:'o1', name:'ปังเย็น', price:65, source:'toast', category:'ของหวาน', type:'ปังเย็น', emoji:'🍧' },
    { id:'o2', name:'ปังเย็นนมสดภูเขาไฟ', price:80, source:'toast', category:'ของหวาน', type:'ปังเย็น', emoji:'🍧' },
    { id:'o3', name:'ก้อนเนยน้ำตาลครีมข้าวโพด', price:50, source:'toast', category:'ของหวาน', type:'ขนมปัง', emoji:'🍞' },
    { id:'o4', name:'แผ่นเนยน้ำตาลครีมข้าวโพด', price:45, source:'toast', category:'ของหวาน', type:'ขนมปัง', emoji:'🍞' },
    { id:'o5', name:'น้ำส้ม 250ml', price:45, source:'toast', category:'เครื่องดื่ม', type:'น้ำผลไม้', emoji:'🍊' },
    { id:'o6', name:'นมสดสีขาว', price:45, source:'toast', category:'เครื่องดื่ม', type:'นม', emoji:'🥛' },
    { id:'o7', name:'โกโก้นมสด', price:55, source:'toast', category:'เครื่องดื่ม', type:'นม', emoji:'☕' },
    { id:'o8', name:'ชาจีนอบดอกมะลิ ร้อน', price:25, source:'toast', category:'เครื่องดื่ม', type:'ชา', emoji:'🍵' }
  ]
};
