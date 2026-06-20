// เอฟเฟกต์ดาวตก
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
function drawStars() {
    ctx.fillStyle = "white";
    for(let i=0; i<100; i++) ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1, 1);
}
drawStars();

// การส่งข้อมูล
document.getElementById('spaceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('sendBtn');
    const now = new Date();
    const dateStr = `${now.getDate()} มิถุนายน ${now.getFullYear()+543} เวลา ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} GMT+7`;

    btn.innerText = "TRANSMITTING...";
    
    const payload = {
        content: `🚨 <1513916622593593578> มีสัญญาณคำถามใหม่ถูกส่งเข้ามา!`,
        embeds: [{
            title: "⚡ สัญญาณควันตัมเข้ารหัส: มีข้อความใหม่!",
            description: "ระบบตรวจพบการส่งสัญญาณวิทยุจากพิกัดนิรนามในระบบสุริยะ",
            color: 0x2b2d31,
            fields: [
                { name: "🛸 ผู้ส่งสัญญาณ", value: document.getElementById('username').value },
                { name: "📡 สถานะการเชื่อมต่อ", value: "🟢 เสถียรดี (100%)" },
                { name: "💬 เนื้อหาคำถามที่ส่งมา", value: document.getElementById('message').value },
                { name: "⏰ เวลาส่งสัญญาณจริงจากโลก", value: `📅 ${dateStr}` }
            ],
            image: { url: "https://cdn.discordapp.com/attachments/1511368039671533598/1517928557974781962/photo-1462331940025-496dfbfc7564.webp?ex=6a3810a1&is=6a36bf21&hm=e27ffbc11104a67ff56522a45f9bb86143c10d59ece16b246efa096ba69d23f2&" },
            footer: { text: "Deep Space Network (DSN) • สถานีรับสัญญาณภาคพื้นดิน" }
        }]
    };

    await fetch("https://discord.com/api/webhooks/1516806138388025535/5eWRG1I22cAz_PpPhTyQQwdOgWvjFUlZdhqdaWZ6IUpTf3lLgLi6gSDOMJ58gdsp4CbW", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    alert("ส่งข้อความไปที่โลกสำเร็จ!");
    btn.innerText = "INITIATE TRANSMISSION 📡";
});
