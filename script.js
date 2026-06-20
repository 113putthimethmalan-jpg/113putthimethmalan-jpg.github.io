// script.js
const DEFAULT_WEBHOOK_URL = 'วาง URL Webhook ของพี่ที่นี่'; 
const DEFAULT_ADMIN_ROLE_ID = 'วาง ID ยศที่นี่';

const form = document.getElementById('cosmicForm');
const toggleBtn = document.getElementById('toggleSettingsBtn');
const panel = document.getElementById('quickSettingsPanel');

// แสดง/ซ่อน แผงตั้งค่า
toggleBtn.addEventListener('click', () => panel.classList.toggle('hidden'));

// เชื่อมต่อค่าเริ่มต้น
document.getElementById('webhookInput').value = DEFAULT_WEBHOOK_URL;
document.getElementById('roleInput').value = DEFAULT_ADMIN_ROLE_ID;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('cosmicQuestion').value;
    const url = document.getElementById('webhookInput').value;
    const role = document.getElementById('roleInput').value;

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `<@&${role}> สัญญาณใหม่จาก Apollo-11: ${text}`
            })
        });
        alert('ส่งสัญญาณสำเร็จ!');
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
});
