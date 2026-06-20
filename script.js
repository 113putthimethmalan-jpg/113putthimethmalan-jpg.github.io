
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

    // จัดฟอร์แมตแบบ Rich Embed ระดับพรีเมียมสำหรับ Discord
    const payload = {
        username: "ศูนย์ควบคุมยาน Apollo-11",
        avatar_url: "https://i.imgur.com/E9z6fzq.png", // รูปโปรไฟล์นักบินอวกาศ
        embeds: [{
            title: "⚡ สัญญาณควันตัมเข้ารหัส: มีข้อความใหม่!",
            description: "ระบบตรวจพบการส่งสัญญาณวิทยุจากพิกัดนิรนามในระบบสุริยะ",
            color: 1942527, // สีน้ำเงินนีออน (Electric Blue)
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
                }
            ],
            // รูปแบนเนอร์อวกาศเนบิวลาขนาดใหญ่สุดสวยใต้โพสต์
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

```
