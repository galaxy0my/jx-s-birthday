/* ============================================================
   finale.js  ::  通关后的花海祝福（四段式 · 四种特效）
   ============================================================ */

var BLESSINGS = [
  '生日快乐，愿所念皆如愿',
  '愿你眼里有光，心中有爱',
  '岁岁年年，平安喜乐',
  '繁花似锦，未来可期',
  '新的一岁，万事顺意',
  '愿你被这个世界温柔以待',
  'Happy birthday！',
  '愿你如繁花般，热烈而自由',
  '所行皆坦途，所遇皆美好',
  '愿你一生努力，一生被爱'
];

/* ---------- 入口 ---------- */
function showFinale() {
  var stage = document.getElementById('stage');
  stage.innerHTML =
    '<div class="fin-wrap">' +

    /* 第 1 段 */
    '<div id="scene-heart" class="scene">' +
      '<div id="heart-box"></div>' +
      '<div id="danmaku-box"></div>' +
      '<div class="center-card" id="center-card">' +
        '<h1>🌸 生日快乐 🌸</h1>' +
        '<p>每片花瓣都是祝福，随风飘向你</p>' +
        '<button id="btn-galaxy">走进花海 →</button>' +
      '</div>' +
    '</div>' +

    /* 第2段：花海 */
    '<div id="scene-galaxy" class="scene hd">' +
      '<canvas id="galaxy-cv"></canvas>' +
      '<div class="galaxy-tex">' +
        '<div class="en">A FIELD OF FLOWERS, JUST FOR YOU</div>' +
        '<h1>把整个春天都送给你</h1>' +
        '<p>点下面的按钮，换一种花看</p>' +
        '<button id="btn-letter">给你写了一封信</button>' +
        '<button id="btn-letter2">再读一封</button>' +
      '</div>' +
    '</div>' +

    /* 花束 */
    '<div class="cake-stage">' +
      '<div class="cake bouquet">' +
        '<div class="bunch">' +
          '<div class="flower f1"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f2"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f3"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f4"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f5"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f6"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f0"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
        '</div>' +
        '<div class="stems"><i></i><i></i><i></i><i></i><i></i></div>' +
        '<div class="wrap w1"></div>' +
        '<div class="wrap w2"></div>' +
        '<div class="bow"><i class="l"></i><i class="r"></i><i class="knot"></i></div>' +
      '</div>' +
      '<div class="ring r1"></div>' +
      '<div class="ring r2"></div>' +
      '<div class="happy">happy birthday</div>' +
      '<div class="blow">点一下花束，许个愿</div>' +
    '</div>' +

    /* 四种特效切换 */
    '<div class="fx-bar">' +
      '<button class="fx-btn on" data-fx="petal">🌸 落英纷飞</button>' +
      '<button class="fx-btn" data-fx="butterfly">🦋 蝶舞花间</button>' +
      '<button class="fx-btn" data-fx="pollen">✨ 花粉流光</button>' +
      '<button class="fx-btn" data-fx="halo">💗 心形花海</button>' +
    '</div>' +

    /* 第3段：信件一 */
    '<div id="letter-mask" class="letter-mask hd">' +
      '<div class="letter">' +
        '<button class="close">×</button>' +
        '<h3>致 佳鑫小朋友</h3>' +
        '<p>时光荏苒，又是一年繁花盛开。</p>' +
        '<p>那些一起熬过的夜、一起笑到肚子疼的瞬间，都成了心里最柔软的部分。</p>' +
        '<p>愿新的一岁，所遇皆良人，所行皆坦途。</p>' +
        '<p>把过去的遗憾清零，把未来的期待装满。</p>' +
        '<div class="sign">—— 你的好朋友 xyj</div>' +
      '</div>' +
    '</div>' +

    /* 第4段：信件二 */
    '<div id="letter-mask2" class="letter-mask hd">' +
      '<div class="letter">' +
        '<button class="close">×</button>' +
        '<h3>再读一封</h3>' +
        '<p>嘿，又见面啦。</p>' +
        '<p>这一封没有长篇大论，只有一句：谢谢你出现在我的生命里。</p>' +
        '<p>你值得被爱，值得所有美好。</p>' +
        '<p>愿你以后的每一天，都像今天一样，被鲜花和掌声包围。</p>' +
        '<div class="sign">—— 一直挺你的那位</div>' +
      '</div>' +
    '</div>' +

  '</div>';

  buildHeart();
  bindFinaleEvents();
}

/* ============================================
   第1段：花瓣拼成爱心
   ============================================ */
function buildHeart() {
  var box = document.getElementById('heart-box');
  var W = box.offsetWidth || 340;
  var H = box.offsetHeight || 340;
  var cx = W / 2, cy = H / 2 - 10;
  var N = 120;
  var pal = ['#ff9a9e', '#fecfef', '#fbc2eb', '#a6c1ee', '#fdcbf1', '#ffb7c5'];

  for (var i = 0; i < N; i++) {
    var t = (i / N) * Math.PI * 2;
    var x = 16 * Math.pow(Math.sin(t), 3);
    var y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    var card = document.createElement('div');
    card.className = 'heart';
    card.style.background = pal[i % pal.length];
    card.style.left = (cx + x * (W / 38)) + 'px';
    card.style.top = (cy + y * (H / 38)) + 'px';
    card.style.setProperty('--fx', ((Math.random() - .5) * (innerWidth / 2)) + 'px');
    card.style.setProperty('--fy', ((Math.random() - .5) * (innerHeight / 2)) + 'px');
    card.style.animationDelay = (i * 0.012) + 's';
    box.appendChild(card);
  }
  setTimeout(startDanmaku, N * 0.012 * 1000 + 900);
}

/* ---------- 弹幕 ---------- */
function startDanmaku() {
  var box = document.getElementById('danmaku-box');
  var pal = ['#ff9a9e', '#fecfef', '#fbc2eb', '#a6c1ee', '#fdcbf1', '#ffb7c5'];
  var n = 0;
  var timer = setInterval(function () {
    if (n > 90) { clearInterval(timer); return; }
    var d = document.createElement('div');
    d.className = 'dm';
    d.style.background = pal[Math.floor(Math.random() * pal.length)];
    d.style.left = Math.random() * 80 + '%';
    d.style.top = Math.random() * 80 + '%';
    d.style.transform = 'rotate(' + ((Math.random() * 24) - 12) + 'deg) scale(' + (.7 + Math.random() * .6) + ')';
    d.style.animationDelay = (Math.random() * 6) + 's';
    d.innerHTML = '🌸 ' + BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)];
    box.appendChild(d);
    n++;
  }, 90);

  setTimeout(function () {
    var cc = document.getElementById('center-card');
    if (cc) cc.classList.add('show');
  }, 1200);
}

/* ============================================
   第2段：花海 · 四种特效
   ============================================ */
var Galaxy = (function () {
  var cv, ctx, W, H, raf;
  var stars = [], bokeh = [], snow = [], halos = [], meteors = [];
  var BC = ['#ff9a9e', '#fecfef', '#fbc2eb', '#a6c1ee', '#fdcbf1', '#ffb7c5'];
  var mode = 'petal';

  function init() {
    cv = document.getElementById('galaxy-cv');
    if (!cv) return;
    ctx = cv.getContext('2d');
    resize();
    addEventListener('resize', resize);

    stars = []; bokeh = []; snow = []; halos = []; meteors = [];

    /* 微光花蕊（背景点缀） */
    for (var i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: .4 + Math.random() * 1.2,
        a: .2 + Math.random() * .6,
        d: (Math.random() > .5 ? 1 : -1) * (.004 + Math.random() * .01)
      });
    }

    /* 🌸 落英纷飞：旋转花瓣 */
    for (var j = 0; j < 26; j++) {
      bokeh.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 6 + Math.random() * 10,
        a: .35 + Math.random() * .45,
        vx: (Math.random() - .5) * .6,
        vy: .4 + Math.random() * .9,
        rot: Math.random() * 6.28,
        vr: (Math.random() - .5) * .03
      });
    }

    /* 🦋 蝶舞花间：蝴蝶 */
    for (var k = 0; k < 12; k++) {
      snow.push(newButterfly(true));
    }

    /* 💗 心形花海：光环 */
    for (var m = 0; m < 4; m++) {
      halos.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 55 + Math.random() * 55,
        sp: .4 + Math.random() * .15,
        rot: Math.random() * 6.28,
        c: BC[m % BC.length]
      });
    }

    if (raf) cancelAnimationFrame(raf);
    loop();
  }

  function resize() {
    if (!cv) return;
    W = cv.offsetWidth || innerWidth;
    H = cv.offsetHeight || innerHeight;
    cv.width = W; cv.height = H;
  }

  /* 蝴蝶数据结构 */
  function newButterfly(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : -20,
      r: 7 + Math.random() * 6,
      vx: (Math.random() - .5) * 1.2,
      vy: .35 + Math.random() * .55,
      sw: Math.random() * 6.28,
      ss: .06 + Math.random() * .06,   // 扇翅速度
      a: .75 + Math.random() * .25,
      c: BC[Math.floor(Math.random() * BC.length)],
      wob: Math.random() * 6.28
    };
  }

  /* --- 背景微光 --- */
  function drawStars() {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.a += s.d;
      if (s.a > 1 || s.a < .15) s.d = -s.d;
      ctx.globalAlpha = Math.abs(s.a) * .8;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 6.283);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* --- 🌸 落英纷飞 --- */
  function drawBokeh() {
    for (var i = 0; i < bokeh.length; i++) {
      var b = bokeh[i];
      b.x += b.vx; b.y += b.vy; b.rot += b.vr;
      if (b.y > H + 40) { b.y = -40; b.x = Math.random() * W; }
      if (b.x > W + 40) b.x = -40;
      if (b.x < -40) b.x = W + 40;

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.globalAlpha = b.a;
      ctx.fillStyle = BC[i % BC.length];
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(b.r, -b.r * .9, b.r * 1.6, 0);
      ctx.quadraticCurveTo(b.r, b.r * .9, 0, 0);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  /* --- 🦋 蝶舞花间（真·扇翅） --- */
  function drawButterfly() {
    for (var i = 0; i < snow.length; i++) {
      var s = snow[i];
      s.sw += s.ss;
      s.wob += .02;
      s.x += s.vx + Math.sin(s.wob) * .8;
      s.y += s.vy;

      if (s.y > H + 30 || s.x > W + 40 || s.x < -40) {
        snow[i] = newButterfly(false);
        continue;
      }

      /* 翅膀开合度：0~1 之间循环 */
      var flap = Math.abs(Math.sin(s.sw));
      var wingW = s.r * 2 * (.25 + flap * .75);

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = s.a;

      /* 左翅 */
      ctx.save();
      ctx.scale(-1, 1);
      var gl = ctx.createLinearGradient(0, 0, wingW, 0);
      gl.addColorStop(0, s.c);
      gl.addColorStop(1, 'rgba(255,255,255,.55)');
      ctx.fillStyle = gl;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(wingW * .6, -s.r * 1.5, wingW, -s.r * .5);
      ctx.quadraticCurveTo(wingW * .8, s.r * .2, 0, s.r * .5);
      ctx.closePath();
      ctx.fill();
      /* 翅斑 */
      ctx.globalAlpha = s.a * .5;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(wingW * .55, -s.r * .55, s.r * .22, 0, 6.283);
      ctx.fill();
      ctx.restore();

      /* 右翅 */
      ctx.globalAlpha = s.a;
      var gr = ctx.createLinearGradient(0, 0, wingW, 0);
      gr.addColorStop(0, s.c);
      gr.addColorStop(1, 'rgba(255,255,255,.55)');
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(wingW * .6, -s.r * 1.5, wingW, -s.r * .5);
      ctx.quadraticCurveTo(wingW * .8, s.r * .2, 0, s.r * .5);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = s.a * .5;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(wingW * .55, -s.r * .55, s.r * .22, 0, 6.283);
      ctx.fill();

      /* 身体 */
      ctx.globalAlpha = s.a;
      ctx.fillStyle = '#6b4f4f';
      ctx.beginPath();
      ctx.ellipse(0, 0, s.r * .16, s.r * .8, 0, 0, 6.283);
      ctx.fill();

      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  /* --- ✨ 花粉流光 --- */
  function drawMeteors(rate) {
    if (Math.random() < rate) {
      meteors.push({
        x: Math.random() * W,
        y: Math.random() * H * .85,
        len: 80 + Math.random() * 140,
        sp: 5 + Math.random() * 6,
        a: 1
      });
    }
    for (var i = meteors.length - 1; i >= 0; i--) {
      var m = meteors[i];
      var g = ctx.createLinearGradient(m.x, m.y, m.x + m.len, m.y + m.len * .6);
      g.addColorStop(0, 'rgba(255,215,230,.95)');
      g.addColorStop(1, 'transparent');
      ctx.globalAlpha = m.a;
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x + m.len, m.y + m.len * .6);
      ctx.stroke();
      m.x += m.sp; m.y += m.sp * .6; m.a -= .012;
      if (m.a < 0 || m.x > W) meteors.splice(i, 1);
    }
    ctx.globalAlpha = 1;
  }

  /* --- 💗 心形花海 --- */
  function drawHalo() {
    var cx = W / 2, cy = H / 2;
    for (var i = 0; i < halos.length; i++) {
      var h = halos[i];
      h.rot += h.sp * .01;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(h.rot);
      ctx.scale(1, .32);
      var g = ctx.createRadialGradient(0, 0, h.r * .75, 0, 0, h.r);
      g.addColorStop(0, 'transparent');
      g.addColorStop(.7, h.c);
      g.addColorStop(1, 'transparent');
      ctx.globalAlpha = .5;
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, h.r, 0, 6.283); ctx.fill();
      ctx.globalAlpha = .15;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = .6;
      ctx.beginPath(); ctx.arc(0, 0, h.r * .6, 0, 6.283); ctx.stroke();
      ctx.restore();
    }
    /* 中心光球 */
    var core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
    core.addColorStop(0, 'rgba(255,220,235,.9)');
    core.addColorStop(1, 'transparent');
    ctx.globalAlpha = 1;
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(cx, cy, 90, 0, 6.283); ctx.fill();

    /* 飘浮小爱心 */
    for (var k = 0; k < 18; k++) {
      var t = (Date.now() * .0004 + k * .35) % 1;
      var px = cx + Math.sin(k * 2.1 + t * 6) * (60 + k * 8);
      var py = cy + 120 - t * 260;
      var pr = 4 + (k % 4) * 1.6;
      ctx.globalAlpha = (1 - t) * .8;
      ctx.fillStyle = BC[k % BC.length];
      drawHeart(px, py, pr);
    }
    ctx.globalAlpha = 1;
  }

  function drawHeart(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y + r * .3);
    ctx.bezierCurveTo(x, y, x - r, y, x - r, y + r * .3);
    ctx.bezierCurveTo(x - r, y + r * .7, x, y + r, x, y + r * 1.3);
    ctx.bezierCurveTo(x, y + r, x + r, y + r * .7, x + r, y + r * .3);
    ctx.bezierCurveTo(x + r, y, x, y, x, y + r * .3);
    ctx.fill();
  }

  function loop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    drawStars();
    if (mode === 'petal') drawBokeh();
    else if (mode === 'butterfly') drawButterfly();
    else if (mode === 'pollen') drawMeteors(.16);
    else if (mode === 'halo') drawHalo();
    raf = requestAnimationFrame(loop);
  }

  return {
    init: init,
    setMode: function (m) { mode = m; }
  };
})();

function enterGalaxy() {
  document.getElementById('scene-heart').classList.add('hd');
  var g = document.getElementById('scene-galaxy');
  g.classList.remove('hd');
  g.classList.add('galaxy-in');
  Galaxy.init();
}

/* ============================================
   事件绑定
   ============================================ */
function bindFinaleEvents() {
  document.getElementById('btn-galaxy').onclick = enterGalaxy;

  /* 花束点击许愿 */
  var bq = document.querySelector('.bouquet');
  if (bq) {
    bq.onclick = function () {
      if (bq.classList.contains('blowed')) return;
      bq.classList.add('blowed');
      var tip = document.querySelector('.blow');
      if (tip) tip.textContent = '愿望已送达 🌸';
      var r = bq.getBoundingClientRect();
      if (window.Fireworks) {
        Fireworks.burst(r.left + r.width / 2, r.top + r.height / 3);
      }
      setTimeout(function () {
        bq.classList.remove('blowed');
        if (tip) tip.textContent = '点一下花束，许个愿';
      }, 3000);
    };
  }

  /* 信件一 */
  document.getElementById('btn-letter').onclick = function () {
    document.getElementById('letter-mask').classList.remove('hd');
  };
  document.querySelector('#letter-mask .close').onclick = function () {
    document.getElementById('letter-mask').classList.add('hd');
  };
  document.getElementById('letter-mask').onclick = function (e) {
    if (e.target === this) this.classList.add('hd');
  };

  /* 信件二 */
  document.getElementById('btn-letter2').onclick = function () {
    document.getElementById('letter-mask2').classList.remove('hd');
  };
  document.querySelector('#letter-mask2 .close').onclick = function () {
    document.getElementById('letter-mask2').classList.add('hd');
  };
  document.getElementById('letter-mask2').onclick = function (e) {
    if (e.target === this) this.classList.add('hd');
  };

  /* 特效切换 */
  var btns = document.querySelectorAll('.fx-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      for (var j = 0; j < btns.length; j++) btns[j].classList.remove('on');
      this.classList.add('on');
      Galaxy.setMode(this.getAttribute('data-fx'));
    };
  }
}
