// ==========================================
// 🔧 ระบบ Apollo-11 หลังบ้าน (เชื่อมโยงข้อมูลจริงของกัปตันแล้ว)
// ==========================================
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1516806138388025535/5eWRG1I22cAz_PpPhTyQQwd0gWvjFU1ZdhqdaWZ6IUpTf31LgLi6gSDOMJ58gdsp4CbW'; 
const ADMIN_ROLE_ID = '1513916622593593578'; 

// ผูกตัวแปรเข้ากับแท็กใน HTML
const cosmicQuestion = document.getElementById('cosmicQuestion');
const previewQuestion = document.getElementById('previewQuestion');
const cosmicForm = document.getElementById('cosmicForm');
const launchBtn = document.getElementById('launchBtn');

// ระบบพิมพ์แล้วข้อความพรีวิวฝั่งขวาอัปเดตสดๆ ทันที (Live Sync)
cosmicQuestion.addEventListener('input', (e) => {
    const text = e.target.value.trim();
    previewQuestion.textContent = text ? `> ${text}` : '> ';
});

// ระบบดักจับการกดส่งฟอร์มเพื่อส่งข้อมูลไปหา Discord
cosmicForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บรีเฟรชตัวเอง

    const questionText = cosmicQuestion.value.trim();
    if (!questionText) return;

    // ล็อคปุ่มส่งชั่วคราวเพื่อป้องกันการกดเบิ้ล
    launchBtn.disabled = true;
    launchBtn.textContent = 'กำลังส่งสัญญาณ...';

    // จัดรูปแบบเวลาของประเทศไทย
    const localTimeFormatted = new Date().toLocaleString('th-TH');

    // ตรวจสอบและสร้างโครงสร้างแท็กแอดมิน (<@&ตามด้วยไอดีตัวเลขยศ>)
    const mentionTag = (ADMIN_ROLE_ID && ADMIN_ROLE_ID.trim() !== '') 
        ? `<@&${ADMIN_ROLE_ID.trim()}>` 
        : '@Admin';

    // โครงสร้าง Payload ที่จะส่งเข้า Discord
    const payload = {
        username: "ศูนย์ควบคุมยาน Apollo-11",
        avatar_url: "https://i.imgur.com/E9z6fzq.png",
        content: `🚨 ${mentionTag} มีสัญญาณคำถามใหม่ถูกส่งเข้ามา!`,
        embeds: [{
            title: "⚡ สัญญาณควันตัมเข้ารหัส: มีข้อความใหม่!",
            description: "ระบบตรวจพบการส่งสัญญาณวิทยุจากพิกัดนิรนามในระบบสุริยะ",
            color: 1942527, 
            fields: [
                { name: "🛸 ผู้ส่งสัญญาณ", value: "Anonymous Astronaut", inline: true },
                { name: "📡 สถานะการเชื่อมต่อ", value: "🟢 เสถียรดี (100%)", inline: true },
                { name: "💬 เนื้อหาคำถามที่ส่งมา", value: `>>> ${questionText}`, inline: false },
                { name: "⏰ เวลาส่งสัญญาณจริง", value: `📅 ${localTimeFormatted}`, inline: false }
            ]
        }]
    };

    try {
        // ยิงข้อมูลตรงหา Discord Webhook
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            mode: 'no-cors' // แก้ปัญหาบราวเซอร์บล็อกเรื่องความปลอดภัย (CORS)
        });

        alert('ส่งสัญญาณสำเร็จ! ข้อความถูกส่งเข้า Discord เรียบร้อยแล้ว');
        cosmicQuestion.value = ''; // ล้างช่องพิมพ์
        previewQuestion.textContent = '> '; // ล้างหน้าพรีวิว
    } catch (error) {
        console.error(error);
        alert('เกิดข้อผิดพลาด: ไม่สามารถส่งสัญญาณได้');
    } finally {
        // ปลดล็อคปุ่มให้กลับมาใช้งานได้ปกติ
        launchBtn.disabled = false;
        launchBtn.textContent = 'ยิงสัญญาณวิทยุ 🛰️';
    }
});

