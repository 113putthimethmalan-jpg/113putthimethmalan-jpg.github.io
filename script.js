let playerHP = 100;
let enemyHP = 100;
const logEl = document.getElementById('log');
const enemySprite = document.getElementById('enemy-sprite');

function updateUI() {
    document.getElementById('p-hp').innerText = playerHP;
    document.getElementById('e-hp').innerText = enemyHP;
}

function attack() {
    if (enemyHP <= 0) return;
    
    let dmg = Math.floor(Math.random() * 15) + 5;
    enemyHP -= dmg;
    
    // เอฟเฟกต์ศัตรูสั่น
    enemySprite.classList.add('shake');
    setTimeout(() => enemySprite.classList.remove('shake'), 500);

    logEl.innerText = `คุณจิ้มตามัน! ศัตรูเลือดลด ${dmg}`;
    
    if (enemyHP <= 0) {
        enemyHP = 0;
        logEl.innerText = "ศัตรูสลบคาที่! คุณชนะ!";
    } else {
        setTimeout(enemyTurn, 1000); // ศัตรูตีกลับ
    }
    updateUI();
}

function enemyTurn() {
    let dmg = Math.floor(Math.random() * 10) + 2;
    playerHP -= dmg;
    logEl.innerText = `ศัตรูพ่นน้ำลายใส่! คุณเลือดลด ${dmg}`;
    
    if (playerHP <= 0) {
        playerHP = 0;
        logEl.innerText = "คุณแพ้แล้ว ไปนอนไป๊!";
    }
    updateUI();
}

function heal() {
    let recovery = 20;
    playerHP += recovery;
    if (playerHP > 100) playerHP = 100;
    logEl.innerText = "คุณกินมาม่าเข้าไป... รู้สึกอิ่ม (HP +20)";
    updateUI();
    setTimeout(enemyTurn, 1000);
}
