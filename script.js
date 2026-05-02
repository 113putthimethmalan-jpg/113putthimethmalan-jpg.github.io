window.requestAnimationFrame =
    window.__requestAnimationFrame ||
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    (function () {
        return function (callback, element) {
            var lastTime = element ? element.__lastTime : 0;
            if (lastTime === undefined) lastTime = 0;
            var currTime = Date.now();
            var timeToCall = Math.max(1, 33 - (currTime - lastTime));
            var id = window.setTimeout(callback, timeToCall);
            if(element) element.__lastTime = currTime + timeToCall;
            return id;
        };
    })();

window.isDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(((navigator.userAgent || navigator.vendor || window.opera)).toLowerCase()));

var init = function () {
    var mobile = window.isDevice;
    var koef = mobile ? 0.5 : 1;
    var canvas = document.getElementById('heart');
    if (!canvas) return; // ป้องกัน Error ถ้าหา canvas ไม่เจอ

    var ctx = canvas.getContext('2d');
    var width = canvas.width = koef * innerWidth;
    var height = canvas.height = koef * innerHeight;
    var rand = Math.random;

    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, width, height);

    var heartPosition = function (rad) {
        return [Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))];
    };

    var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
        return [dx + pos[0] * sx, dy + pos[1] * sy];
    };

    window.addEventListener('resize', function () {
        width = canvas.width = koef * innerWidth;
        height = canvas.height = koef * innerHeight;
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, width, height);
    });

    var pointsOrigin = [];
    var dr = mobile ? 0.3 : 0.1;
    for (var i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
    for (var i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
    for (var i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
    
    var heartPointsCount = pointsOrigin.length;
    var targetPoints = [];
    var pulse = function (kx, ky) {
        for (var i = 0; i < pointsOrigin.length; i++) {
            targetPoints[i] = [];
            targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
            targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
        }
    };

    var e = [];
    for (var i = 0; i < heartPointsCount; i++) {
        var x = rand() * width;
        var y = rand() * height;
        e[i] = {
            vx: 0,
            vy: 0,
            R: 2,
            speed: rand() + 5,
            q: ~~(rand() * heartPointsCount),
            D: 2 * (rand() - 0.5),
            force: 0.2 * rand() + 0.7,
            f: "hsla(0," + ~~(40 * rand() + 60) + "%," + ~~(40 * rand() + 20) + "%,.3)",
            trace: []
        };
        for (var k = 0; k < (mobile ? 20 : 50); k++) e[i].trace[k] = {x: x, y: y};
    }

    var config = { heartSize: 0.75 };

    var loop = function () {
        var m = Math.pow(Math.sin(Date.now() * 0.001), 2);
        var p = 1 + 0.15 * m; // หัวใจเต้น
        pulse(p, p);

        ctx.fillStyle = "rgba(0,0,0,.1)";
        ctx.fillRect(0, 0, width, height);

        for (var i = 0; i < e.length; i++) {
            var u = e[i];
            var q = targetPoints[u.q];
            var dx = u.trace[0].x - q[0];
            var dy = u.trace[0].y - q[1];
            var length = Math.sqrt(dx * dx + dy * dy);
            
            if (10 > length) {
                if (0.95 < rand()) {
                    u.q = ~~(rand() * heartPointsCount);
                } else {
                    if (0.99 < rand()) u.D *= -1;
                    u.q += u.D;
                    u.q %= heartPointsCount;
                    if (0 > u.q) u.q += heartPointsCount;
                }
            }

            u.vx += (-dx / length) * u.speed;
            u.vy += (-dy / length) * u.speed;
            u.trace[0].x += u.vx;
            u.trace[0].y += u.vy;
            u.vx *= u.force;
            u.vy *= u.force;

            for (var k = 0; k < u.trace.length - 1; ) {
                var T = u.trace[k];
                var N = u.trace[++k];
                N.x -= 0.4 * (N.x - T.x);
                N.y -= 0.4 * (N.y - T.y);
            }

            ctx.fillStyle = u.f;
            for (var k = 0; k < u.trace.length; k++) {
                ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
            }
        }
        window.requestAnimationFrame(loop, canvas);
    };
    loop();
};

// ใช้คำสั่งนี้เพื่อให้แน่ใจว่า HTML โหลดเสร็จก่อนค่อยเริ่มรัน JS
if (document.readyState === 'complete') {
    init();
} else {
    window.addEventListener('load', init);
}
