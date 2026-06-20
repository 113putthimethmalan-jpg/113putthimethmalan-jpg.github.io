document.getElementById('spaceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // ตั้งค่าตัวแปร
    const hook = "YOUR_WEBHOOK_URL_HERE"; 
    const adminId = "YOUR_ADMIN_ID_HERE";
    const btn = e.target.querySelector('button');
    
    // เปลี่ยนสถานะปุ่มตอนกำลังส่ง
    btn.innerText = "TRANSMITTING...";
    btn.disabled = true;

    const payload = {
        content: `<@${adminId}> **[INCOMING QUANTUM SIGNAL]**`,
        embeds: [{
            title: "🛰️ DSN RECEIVER: NEW DATA PACKET",
            description: "Deep Space Network has intercepted a transmission.",
            color: 0x00f2ff,
            fields: [
                { name: "🛸 Source", value: document.getElementById('username').value, inline: true },
                { name: "⚡ Status", value: "STABLE (100%)", inline: true },
                { name: "💬 Content", value: `> ${document.getElementById('message').value}` }
            ],
            image: { url: "https://images.nasa.gov/details-PIA23624/PIA23624~orig.jpg" },
            footer: { text: "Apollo-11 Operations" }
        }]
    };

    try {
        await fetch(hook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        alert("Success: Message reached the Command Center!");
    } catch (err) {
        alert("Error: Signal failed to transmit.");
    } finally {
        btn.innerText = "INITIATE TRANSMISSION 📡";
        btn.disabled = false;
    }
});
