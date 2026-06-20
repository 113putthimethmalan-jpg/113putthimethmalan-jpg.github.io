document.getElementById('spaceForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // ป้องกันหน้าเว็บรีเฟรช

    const btn = document.getElementById('sendBtn');
    btn.innerText = "TRANSMITTING...";

    // 1. ดึงค่าจากช่อง Input ของคุณ (ตรวจสอบให้ตรงกับ ID ใน HTML)
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    
    // 2. ใส่ข้อมูล Webhook และ ID ตรงนี้ (หรือดึงจาก Hidden Input)
    const webhookUrl = "ใส่_WEBHOOK_URL_ของคุณที่นี่";
    const adminId = "ใส่_USER_ID_ของคุณที่นี่";

    const payload = {
        content: `<@!${adminId}> มีสัญญาณใหม่เข้ามา!`,
        embeds: [{
            title: "📡 สัญญาณคำถามใหม่จากระบบ",
            color: 0x00f2ff, // สีฟ้าเท่ๆ
            fields: [
                { name: "🛸 ผู้ส่งสัญญาณ", value: username || "Anonymous", inline: true },
                { name: "💬 ข้อความ", value: message },
                { name: "⏰ เวลา", value: new Date().toLocaleString('th-TH') }
            ],
            image: { url: "https://cdn.discordapp.com/attachments/1511368039671533598/1517928557974781962/photo-1462331940025-496dfbfc7564.webp?ex=6a3810a1&is=6a36bf21&hm=e27ffbc11104a67ff56522a45f9bb86143c10d59ece16b246efa096ba69d23f2&" }
        }]
    };

    try {
        // 3. ใช้ Proxy เพื่อข้ามการบล็อกของ Discord
        const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(webhookUrl);
        
        const response = await fetch(proxyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("✅ ส่งสัญญาณสำเร็จ!");
            document.getElementById('spaceForm').reset();
        } else {
            alert("❌ ส่งไม่สำเร็จ: เช็ค URL Webhook อีกครั้ง");
        }
    } catch (error) {
        console.error(error);
        alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
        btn.innerText = "INITIATE TRANSMISSION 📡";
    }
});
