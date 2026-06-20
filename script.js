<script>
    document.getElementById('spaceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const webhookUrl = "YOUR_WEBHOOK_URL_HERE"; 
        const adminId = "1513916622593593578"; // ID ของแอดมินที่ต้องการแท็ก

        const btn = document.getElementById('sendBtn');
        btn.innerText = "กำลังส่งสัญญาณ...";

        // สร้างข้อความเวลาปัจจุบัน
        const now = new Date();
        const dateString = `${now.getDate()} มิถุนายน ${now.getFullYear() + 543} เวลา ${now.getHours()} นาฬิกา ${now.getMinutes()} นาที ${now.getSeconds()} วินาที GMT+7`;

        const payload = {
            // ส่วนแท็กแอดมินด้านบน Embed
            content: `🚨 <@${adminId}> มีสัญญาณคำถามใหม่ถูกส่งเข้ามา!`,
            embeds: [{
                title: "⚡ สัญญาณควันตัมเข้ารหัส: มีข้อความใหม่!",
                description: "ระบบตรวจพบการส่งสัญญาณวิทยุจากพิกัดนิรนามในระบบสุริยะ",
                color: 0x424549, // สีเทาเข้มแบบในภาพ
                fields: [
                    { name: "🛸 ผู้ส่งสัญญาณ", value: document.getElementById('username').value || "Anonymous Astronaut" },
                    { name: "📡 สถานะการเชื่อมต่อ", value: "🟢 เสถียรดี (100%)" },
                    { name: "💬 เนื้อหาคำถามที่ส่งมา", value: document.getElementById('message').value },
                    { name: "⏰ เวลาส่งสัญญาณจริงจากโลก", value: `📅 ${dateString}` }
                ],
                image: { url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Bubble_Nebula.jpg" },
                footer: { 
                    text: "Deep Space Network (DSN) • สถานีรับสัญญาณภาคพื้นดิน | วันนี้ เวลา " + now.getHours() + ":" + now.getMinutes()
                }
            }]
        };

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            alert("ส่งสัญญาณเรียบร้อย!");
        } catch (error) {
            alert("ส่งสัญญาณล้มเหลว!");
        } finally {
            btn.innerText = "Initiate Transmission 📡";
        }
    });
</script>
