// เอา URL เว็บฮุกจริงของคุณมาแปะแทนที่ลิงก์ทดสอบตรงนี้ได้เลยครับ 🚀
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1516806138388025535/5eWRG1I22cAz_PpPhTyQQwdOgWvjFUlZdhqdaWZ6IUpTf3lLgLi6gSDOMJ58gdsp4CbW'; 

document.getElementById('spaceForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const questionInput = document.getElementById('questionInput');
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    const questionText = questionInput.value.trim();

    if (!questionText) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'กำลังยิงสัญญาณ... 📡';
    statusMessage.className = 'hidden';

    // จัดฟอร์แมตแบบ Embed สวยๆ สำหรับส่งเข้า Discord
    const payload = {
        username: "Space Station Bot",
        avatar_url: "https://i.imgur.com/E9z6fzq.png",
        content: `🌌 **มีสัญญาณคำถามใหม่จากอวกาศ!**`,
        embeds: [{
            title: "🛸 ข้อมูลการติดต่อ",
            color: 4415487,
            fields: [
                { name: "คำถาม", value: questionText },
                { name: "เวลาส่งจากโลก", value: new Date().toLocaleString('th-TH') }
            ]
        }]
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            statusMessage.textContent = 'ส่งสัญญาณสำเร็จ! คำถามเดินทางสู่ความมืดมิดแล้ว ✨';
            statusMessage.className = 'success';
            questionInput.value = ''; 
        } else {
            statusMessage.textContent = 'สัญญาณขาดหาย! กรุณาลองใหม่อีกครั้ง ☄️';
            statusMessage.className = 'error';
        }
    } catch (error) {
        statusMessage.textContent = 'เกิดข้อผิดพลาดในการเชื่อมต่อกับสถานีอวกาศ 🛸';
        statusMessage.className = 'error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'ส่งสัญญาณ 🛰️';
    }
});
