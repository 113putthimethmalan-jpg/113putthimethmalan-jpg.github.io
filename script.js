// ===================================================
// 🔧 ตั้งค่าข้อมูลส่วนตัว (Webhook และ ID ยศแอดมิน)
// ===================================================
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1516806138388025535/5eWRG1I22cAz_PpPhTyQQwdOgWvjFUlZdhqdaWZ6IUpTf3lLgLi6gSDOMJ58gdsp4CbW'; 
const ADMIN_ROLE_ID = '1513916622593593578'; // ไอดีตัวเลขยศจาก Discord

// ดึงองค์ประกอบที่จำเป็นในระบบ
const cosmicQuestion = document.getElementById('cosmicQuestion');
const previewQuestion = document.getElementById('previewQuestion');
const discordTime = document.getElementById('discordTime');
const discordFooterTime = document.getElementById('discordFooterTime');

const cosmicForm = document.getElementById('cosmicForm');
const launchBtn = document.getElementById('launchBtn');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');

const notificationModal = document.getElementById('notificationModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// ⏰ ฟังก์ชันตั้งเวลาปัจจุบันให้ตรงกับเวลาโลกจริงบนหน้าพรีวิว Discord
function updateDiscordTime() {
    const now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    
    discordTime.textContent = `วันนี้ เวลา ${hours}:${minutes} น.`;
    
    discordFooterTime.innerHTML = `
        <img src="https://i.imgur.com/E9z6fzq.png" class="w-4 h-4 rounded-full">
        <span>Deep Space Network (DSN) • วันนี้ เวลา ${hours}:${minutes} น.</span>
    `;
}
updateDiscordTime();

// 🔮 ระบบ Live Preview ซิงค์ข้อความลงกรอบแบบมีสัญลักษณ์เครื่องหมายโควต (>)
cosmicQuestion.addEventListener('input', (e) => {
    const text = e.target.value.trim();
    if (text) {
        previewQuestion.textContent = `> ${text}`;
    } else {
        previewQuestion.textContent = '> มนุษย์ต่างดาวที่ดาวอังคารเขากินส้มตำเป็นอาหารเย็นไหมครับ?';
    }
});

function showModal(title, body, icon = '✨') {
    modalIcon.textContent = icon;
    modalTitle.textContent = title;
    modalBody.textContent = body;
    notificationModal.classList.remove('hidden');
    setTimeout(() => { notificationModal.classList.remove('opacity-0'); }, 10);
}

function closeModal() {
    notificationModal.classList.add('opacity-0');
    setTimeout(() => { notificationModal.classList.add('hidden'); }, 300);
}

// 🚀 ระบบดักจับฟอร์มเพื่อส่งข้อมูลจริงเข้า Discord Webhook พร้อมแท็กแจ้งเตือน
cosmicForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const questionText = cosmicQuestion.value.trim();
    if (!questionText) return;

    // ตรวจสอบความพร้อมของ Webhook แบบกระชับ
    if (!WEBHOOK_URL || WEBHOOK_URL.trim() === '') {
        showModal('ระบบไม่พร้อม!', 'กรุณาตรวจสอบการใส่ลิงก์ Webhook ในไฟล์สคริปต์', '⚠️');
        return;
    }

    launchBtn.disabled = true;
    btnText.textContent = 'กำลังส่งสัญญาณ...';
    btnIcon.className = 'fa-solid fa-spinner animate-spin text-cyan-400';

    const localTimeFormatted = new Date().toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });

    // 🚨 ฟอร์แมตโครงสร้างแท็กยศแอดมิน (<@&ไอดีแอดมิน>) ถ้าไม่มีให้ใส่ @everyone หรือ @here แทนได้ครับ
    const mentionTag = (ADMIN_ROLE_ID && ADMIN_ROLE_ID.trim() !== '') 
        ? `<@&${ADMIN_ROLE_ID.trim()}>` 
        : '@here';

    const payload = {
        username: "ศูนย์ควบคุมยาน Apollo-11",
        avatar_url: "https://i.imgur.com/E9z6fzq.png",
        content: `🚨 ${mentionTag} มีสัญญาณคำถามใหม่ถูกส่งเข้ามา!`, 
        embeds: [{
            title: "⚡ สัญญาณควันตัมเข้ารหัส: มีข้อความใหม่!",
            description: "ระบบตรวจพบการส่งสัญญาณวิทยุจากพิกัดนิรนามในระบบสุริยะ",
            color: 1942527, 
            fields: [
                {
                    name: "🛸 ผู้ส่งสัญญาณ",
                    value: "```yaml\nAnonymous Astronaut\n```",
                    inline: true
                },
                {
                    name: "📡 สถานะการเชื่อมต่อ",
                    value: "🟢 เสถียรดี (100%)",
                    inline: true
                },
                {
                    name: "💬 เนื้อหาคำถามที่ส่งมา",
                    value: `>>> ${questionText}`, 
                    inline: false
                },
                {
                    name: "⏰ เวลาส่งสัญญาณจริงจากโลก",
                    value: `📅 ${localTimeFormatted}`,
                    inline: false
                }
            ],
            image: {
                url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop"
            },
            footer: {
                text: "Deep Space Network (DSN) • สถานีรับสัญญาณภาคพื้นดิน",
                icon_url: "https://i.imgur.com/E9z6fzq.png"
            },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showModal('ส่งสัญญาณสำเร็จ!', 'สัญญาณคำถามถูกแท็กส่งถึงแอดมินบน Discord เรียบร้อยแล้ว', '🛰️');
            cosmicQuestion.value = '';
            previewQuestion.textContent = '> มนุษย์ต่างดาวที่ดาวอังคารเขากินส้มตำเป็นอาหารเย็นไหมครับ?';
            updateDiscordTime();
        } else {
            showModal('ส่งสัญญาณล้มเหลว', `เกิดข้อผิดพลาดจาก Discord (โค้ด: ${response.status})`, '💥');
        }
    } catch (error) {
        console.error(error);
        showModal('สัญญาณขาดหาย', 'ไม่สามารถเชื่อมต่อระบบอินเทอร์เน็ตเพื่อส่งข้อมูลได้', '☄️');
    } finally {
        launchBtn.disabled = false;
        btnText.textContent = 'ยิงสัญญาณวิทยุ 🛰️';
        btnIcon.className = 'fa-solid fa-paper-plane';
    }
});
