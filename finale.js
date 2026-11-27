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
      '<div class="center-card">' +
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
    '<div class="cake-stage">' +
      '<div class="cake bouquet">' +
        /* 花头：中心一朵 + 周围六朵 */
        '<div class="bunch">' +
          '<div class="flower f1"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f2"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f3"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f4"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f5"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f6"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
          '<div class="flower f0"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="core"></i></div>' +
        '</div>' +
        /* 花茎 */
        '<div class="stems"><i></i><i></i><i></i><i></i><i></i></div>' +
        /* 包装纸 */
        '<div class="wrap w1"></div>' +
        '<div class="wrap w2"></div>' +
        /* 蝴蝶结 */
        '<div class="bow"><i class="l"></i><i class="r"></i><i class="knot"></i></div>' +
      '</div>' +
      '<div class="ring r1"></div>' +
      '<div class="ring r2"></div>' +
      '<div class="happy">happy birthday</div>' +
      '<div class="blow">点一下花束，许个愿</div>' +
    '</div>' +


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
    document.getElementById('center-card').classList.add('show');
  }, 1200);
}

/* ============================================
   第2段：花海 · 四种特效
   ============================================ */
var Galaxy = (function () {
  var cv, ctx, W, H, raf;
  var stars = [], bokeh = [], snow = [], halos = [];
  var BC = ['#ff9a9e', '#fecfef', '#fbc2eb', '#a6c1ee', '#fdcbf1', '#ffb7c5'];
  var mode = '';

  function init() {
    cv = document.getElementById('galaxy-cv');
    ctx = cv.getContext('2d');
    resize();
    addEventListener('resize', resize);

    stars = []; bokeh = []; snow = []; halos = [];

    /* 花瓣 */
    for (var j = 0; j < 26; j++) {
      bokeh.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1 + Math.random() * 3,
        a: .1 + Math.random() * .3,
        vx: (Math.random() - .5) * .25,
        vy: .2 + Math.random() * .5,
        rot: Math.random() * 6.28,
        vr: (Math.random() - .5) * .02
      });
    }
    /* 蝴蝶 */
    for (var k = 0; k < 14; k++) {
      snow.push(newSnow(true));
    }
    /* 光晕 */
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
    loop();
  }

  function resize() {
    if (!cv) return;
    W = cv.offsetWidth;
    H = cv.offsetHeight;
    cv.width = W; cv.height = H;
  }

  function newSnow(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : -10,
      r: 2 + Math.random() * 2.6,
      vx: .5 + Math.random() * 1.4,
      vy: (Math.random() - .5) * .6,
      sw: Math.random() * 6.28,
      ss: .01 + Math.random() * .02,
      a: .4 + Math.random() * .5
    };
  }

  /* --- 落英纷飞 --- */
  function drawStars() {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.a += s.d; if (s.a > 1 || s.a < .15) s.d = -s.d;
      ctx.globalAlpha = Math.abs(s.a);
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
    }
  }

  /* --- 蝶舞花间（花瓣旋转飘落） --- */
  function drawBokeh() {
    for (var i = 0; i < bokeh.length; i++) {
      var b = bokeh[i];
      b.x += b.vx; b.y += b.vy; b.rot += b.vr;
      if (b.y > H + 60) { b.y = -60; b.x = Math.random() * W; }
      if (b.x > W + 60) b.x = -60;
      if (b.x < -60) b.x = W + 60;

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.globalAlpha = b.a;
      ctx.fillStyle = BC[i % BC.length];
      /* 花瓣形状 */
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(b.r * 2, -b.r * 1.5, b.r * 3, 0);
      ctx.quadraticCurveTo(b.r * 2, b.r * 1.5, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  /* --- 花粉流光 --- */
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
      var gr = ctx.createLinearGradient(m.x, m.y, m.x + m.len, m.y + m.len * .6);
      gr.addColorStop(0, 'rgba(255,215,230,.95)');
      gr.addColorStop(1, 'transparent');
      ctx.globalAlpha = m.a;
      ctx.strokeStyle = gr;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x + m.len, m.y + m.len * .6);
      ctx.stroke();
      m.x += m.sp; m.y += m.sp * .6; m.a -= .012;
      if (m.a < 0 || m.x > W) meteors.splice(i, 1);
    }
  }
  var meteors = [];

  /* --- 心形花海 --- */
  function drawSnow() {
    for (var i = 0; i < snow.length; i++) {
      var s = snow[i];
      s.sw += s.ss;
      s.x += s.vx;
      s.y += s.vy + Math.sin(s.sw) * .5;
      s.y += s.vy;
      if (s.y > H + 10) { snow[i] = newSnow(false); continue; }
      if (s.x > W + 10) s.x = -10;
      if (s.x < -10) s.x = W + 10;

      ctx.globalAlpha = s.a;
      ctx.fillStyle = '#ff9a9e';
      ctx.beginPath();
      /* 小爱心 */
      var r = s.r;
      ctx.moveTo(s.x, s.y + r * .3);
      ctx.bezierCurveTo(s.x, s.y, s.x - r, s.y, s.x - r, s.y + r * .3);
      ctx.bezierCurveTo(s.x - r, s.y + r * .7, s.x, s.y + r, s.x, s.y + r * 1.3);
      ctx.bezierCurveTo(s.x, s.y + r, s.x + r, s.y + r * .7, s.x + r, s.y + r * .3);
      ctx.bezierCurveTo(s.x + r, s.y, s.x, s.y, s.x, s.y + r * .3);
      ctx.fill();
    }
  }

  function drawHalo() {
    var cx = W / 2, cy = H / 2;
    for (var i = 0; i < halos.length; i++) {
      var h = halos[i];
      h.rot += h.sp * .01;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(h.rot);
      ctx.scale(1, .32);
      var gr = ctx.createRadialGradient(0, 0, h.r * .75, 0, 0, h.r);
      gr.addColorStop(0, 'transparent');
      gr.addColorStop(.7, h.c);
      gr.addColorStop(1, 'transparent');
      ctx.globalAlpha = .5;
      ctx.fillStyle = gr;
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
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawStars();
    if (mode === 'petal') drawBokeh();
    else if (mode === 'butterfly') drawSnow(.02);
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

  /* 信件 */
  document.getElementById('btn-letter').onclick = function () {
    document.getElementById('letter-mask').classList.remove('hd');
  };
  document.querySelector('#letter-mask .close').onclick = function () {
    document.getElementById('letter-mask').classList.add('hd');
  };
  document.getElementById('letter-mask').onclick = function (e) {
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

  /* 第二封信 */
  document.getElementById('btn-letter2').onclick = function () {
    document.getElementById('letter-mask2').classList.remove('hd');
  };
  document.querySelector('#letter-mask2 .close').onclick = function () {
    document.getElementById('letter-mask2').classList.add('hd');
  };
  document.getElementById('letter-mask2').onclick = function (e) {
    if (e.target === this) this.classList.add('hd');
  };
}
