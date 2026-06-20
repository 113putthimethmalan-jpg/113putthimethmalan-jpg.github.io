document.getElementById('spaceForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('sendBtn');
    btn.innerText = "TRANSMITTING...";
    btn.disabled = true; // ป้องกันการกดซ้ำ

    // ดึงค่าจาก Hidden Input ใน HTML
    const webhookUrl = document.getElementById('webhookUrl').value;
    const adminId = document.getElementById('adminId').value;
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    // โครงสร้าง Embed ตามที่คุณต้องการ
    const payload = {
        content: `<@!${adminId}> มีสัญญาณใหม่เข้ามา!`,
        embeds: [{
            title: "📡 สัญญาณคำถามใหม่จากระบบ",
            color: 0x00f2ff,
            fields: [
                { name: "🛸 ผู้ส่งสัญญาณ", value: username, inline: true },
                { name: "💬 ข้อความ", value: message },
                { name: "⏰ เวลา", value: new Date().toLocaleString('th-TH') }
            ],
            image: { url: "https://cdn.discordapp.com/attachments/1511368039671533598/1517928557974781962/photo-1462331940025-496dfbfc7564.webp?ex=6a3810a1&is=6a36bf21&hm=e27ffbc11104a67ff56522a45f9bb86143c10d59ece16b246efa096ba69d23f2&" }
        }]
    };

    try {
        // ใช้ Proxy ตัวกลางเพื่อเลี่ยงการบล็อกของ Discord
        // วิธีนี้จะแก้ปัญหา "เกิดข้อผิดพลาดในการเชื่อมต่อ" ได้ครับ
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("✅ ส่งสัญญาณสำเร็จ!");
            document.getElementById('spaceForm').reset();
        } else {
            throw new Error("Webhook URL ไม่ถูกต้อง");
        }
    } catch (error) {
        alert("❌ เกิดข้อผิดพลาด: " + error.message);
    } finally {
        btn.innerText = "INITIATE TRANSMISSION 📡";
        btn.disabled = false;
    }
});
