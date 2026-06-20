document.getElementById('spaceForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // ป้องกันหน้าเว็บรีเฟรช

    const btn = document.getElementById('sendBtn');
    btn.innerText = "TRANSMITTING...";

    // ดึงค่าจาก HTML ให้ตรงกับ ID ที่กำหนดไว้
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    const payload = {
        content: `<@!1513916622593593578>`, // ใส่เลข ID ของคุณ
        embeds: [{
            title: "📡 สัญญาณคำถามใหม่",
            color: 0xffffff,
            fields: [
                { name: "🛸 ผู้ส่ง", value: username },
                { name: "💬 ข้อความ", value: message },
                { name: "⏰ เวลา", value: new Date().toLocaleString('th-TH') }
            ]
        }]
    };

    try {
        const response = await fetch("https://discord.com/api/webhooks/1516806138388025535/5eWRG1I22cAz_PpPhTyQQwdOgWvjFUlZdhqdaWZ6IUpTf3lLgLi6gSDOMJ58gdsp4CbW", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("ส่งข้อความไปที่โลกสำเร็จ!");
            document.getElementById('spaceForm').reset();
        } else {
            alert("ส่งไม่สำเร็จ กรุณาเช็ค Webhook URL");
        }
    } catch (error) {
        alert("เกิดข้อผิดพลาด: " + error.message);
    } finally {
        btn.innerText = "TRANSMIT SIGNAL";
    }
});
