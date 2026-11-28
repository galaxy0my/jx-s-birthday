/* ============================================================
   finale.js  ::  通关后祝福（第1段不变 · 花饰蛋糕 · 四种特效）
   ============================================================ */

var BLESSINGS = [
  '生日快乐', '好运常在', '岁岁皆欢愉', '万事胜意', '前程似锦',
  '愿你一直闪闪发光', '愿你如星璀璨，如风自由', '今天也要开心呀',
  '愿你新的一岁，所遇皆温柔，所行皆坦途', '愿你被世界温柔以待',
  '平安喜乐', '心愿达成', '天天开心', '岁岁平安', 'Happy birthday'
];

/* ---------- 入口 ---------- */
function showFinale() {
  var stage = document.getElementById('stage');
  stage.innerHTML =
    '<div class="fin-wrap">' +

    /* ===== 第1段：爱心弹幕（原样保留） ===== */
    '<div id="scene-heart" class="scene">' +
      '<div id="heart-box"></div>' +
      '<div id="danmaku-box"></div>' +
      '<div class="center-card" id="center-card">' +
        '<h1>生日快乐 ❤</h1>' +
        '<p>小寿星祝你天天开心，永远幸福</p>' +
        '<button id="btn-galaxy">请佳鑫殿下进入星河漫游 →</button>' +
      '</div>' +
    '</div>' +

    /* ===== 第2段：花海 ===== */
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

    /* ===== 花饰蛋糕 ===== */
    '<div class="cake-stage hd">' +
      '<div class="cake flower-cake">' +
        '<div class="candle"><i class="flame petal-flame"></i></div>' +
        '<div class="tier t1">' +
          '<i class="cherry"></i>' +
          '<i class="mini-flower mf1"></i>' +
          '<i class="mini-flower mf2"></i>' +
          '<i class="mini-flower mf3"></i>' +
          '<i class="leaf lf1"></i>' +
          '<i class="leaf lf2"></i>' +
        '</div>' +
        '<div class="tier t2">' +
          '<i class="petal-edge e1"></i><i class="petal-edge e2"></i>' +
          '<i class="petal-edge e3"></i><i class="petal-edge e4"></i>' +
          '<i class="petal-edge e5"></i><i class="petal-edge e6"></i>' +
          '<i class="petal-edge e7"></i><i class="petal-edge e8"></i>' +
        '</div>' +
        '<div class="tier t3">' +
          '<i class="vine"></i>' +
          '<i class="mini-flower mf4"></i>' +
          '<i class="mini-flower mf5"></i>' +
          '<i class="leaf lf3"></i>' +
          '<i class="leaf lf4"></i>' +
        '</div>' +
        '<div class="dish"></div>' +
      '</div>' +
      '<div class="ring r1"></div>' +
      '<div class="ring r2"></div>' +
      '<div class="happy">happy birthday</div>' +
      '<div class="blow">点一下蜡烛，许个愿</div>' +
    '</div>' +

    /* ===== 四种特效 ===== */
    '<div class="fx-bar hd">' +
      '<button class="fx-btn on" data-fx="petal">🌸 落英纷飞</button>' +
      '<button class="fx-btn" data-fx="butterfly">🦋 蝶舞花间</button>' +
      '<button class="fx-btn" data-fx="pollen">✨ 花粉流光</button>' +
      '<button class="fx-btn" data-fx="halo">💗 心形花海</button>' +
    '</div>' +

    /* ===== 信件一 ===== */
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

    /* ===== 信件二 ===== */
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
   第1段：卡片汇聚成爱心
   ============================================ */
function buildHeart(){
  var box = document.getElementById('heart-box');
  var W = box.offsetWidth || 340;
  var H = box.offsetHeight || 340;
  var cx = W/2, cy = H/2 - 10;
  var N = 120;
  var pal = ['#ffd6e0','#ffe9c7','#d6f5e3','#d6e9ff','#e8d6ff','#fff3c4'];

  for(var i=0;i<N;i++){
    var t = (i/N) * Math.PI * 2;
    var x = 16*Math.pow(Math.sin(t),3);
    var y = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));
    var card = document.createElement('div');
    card.className = 'hcard';
    card.style.background = pal[i % pal.length];
    card.style.left = (cx + x*(W/38)) + 'px';
    card.style.top  = (cy + y*(H/38)) + 'px';
    card.style.setProperty('--fx', ((Math.random()>.5?1:-1)*(innerWidth/2+200))+'px');
    card.style.setProperty('--fy', ((Math.random()>.5?1:-1)*(innerHeight/2+200))+'px');
    card.style.animationDelay = (i*0.012)+'s';
    box.appendChild(card);
  }
  setTimeout(startDanmaku, N*0.012*1000 + 900);
}

/* ============================================
   第2段：祝福弹幕
   ============================================ */
function startDanmaku(){
  var box = document.getElementById('danmaku-box');
  var pal = ['#ffd6e0','#ffe9c7','#d6f5e3','#d6e9ff','#e8d6ff','#fff3c4','#ffe0f0'];
  var n = 0;
  var timer = setInterval(function(){
    if(n > 90){ clearInterval(timer); return; }
    var d = document.createElement('div');
    d.className = 'dm-card';
    d.style.background = pal[Math.floor(Math.random()*pal.length)];
    d.style.left = Math.random()*88+'%';
    d.style.top  = Math.random()*88+'%';
    d.style.transform = 'rotate('+(Math.random()*24-12)+'deg) scale('+(.7+Math.random()*.6)+')';
    d.style.animationDelay = (Math.random()*.6)+'s';
    d.innerHTML = Math.random()>.6
      ? '<span class="dm-heart">♥</span>'+BLESSINGS[Math.floor(Math.random()*BLESSINGS.length)]
      : BLESSINGS[Math.floor(Math.random()*BLESSINGS.length)];
    box.appendChild(d);
    n++;
  }, 90);

  setTimeout(function(){
    document.getElementById('center-card').classList.add('show');
  }, 1200);
}

/* ============================================
   第2段：花海 · 四种特效
   ============================================ */
var Galaxy = (function () {
  var cv, ctx, W, H, raf;
  var stars = [], bokeh = [], butterflies = [], halos = [], meteors = [];
  var BC = ['#ff9a9e', '#fecfef', '#fbc2eb', '#a6c1ee', '#fdcbf1', '#ffb7c5'];
  var mode = 'petal';

  function init() {
    cv = document.getElementById('galaxy-cv');
    if (!cv) return;
    ctx = cv.getContext('2d');
    resize();
    addEventListener('resize', resize);

    stars = []; bokeh = []; butterflies = []; halos = []; meteors = [];

    for (var i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: .4 + Math.random() * 1.2,
        a: .2 + Math.random() * .6,
        d: (Math.random() > .5 ? 1 : -1) * (.004 + Math.random() * .01)
      });
    }
    for (var j = 0; j < 26; j++) {
      bokeh.push({
        x: Math.random() * W, y: Math.random() * H,
        r: 6 + Math.random() * 10,
        a: .35 + Math.random() * .45,
        vx: (Math.random() - .5) * .6,
        vy: .4 + Math.random() * .9,
        rot: Math.random() * 6.28,
        vr: (Math.random() - .5) * .03
      });
    }
    for (var k = 0; k < 12; k++) butterflies.push(newButterfly(true));
    for (var m = 0; m < 4; m++) {
      halos.push({
        x: Math.random() * W, y: Math.random() * H,
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

  function newButterfly(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : -20,
      r: 7 + Math.random() * 6,
      vx: (Math.random() - .5) * 1.2,
      vy: .35 + Math.random() * .55,
      sw: Math.random() * 6.28,
      ss: .06 + Math.random() * .06,
      a: .75 + Math.random() * .25,
      c: BC[Math.floor(Math.random() * BC.length)],
      wob: Math.random() * 6.28
    };
  }

  function drawStars() {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.a += s.d;
      if (s.a > 1 || s.a < .15) s.d = -s.d;
      ctx.globalAlpha = Math.abs(s.a) * .8;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* 🌸 落英纷飞 */
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

  /* 🦋 蝶舞花间 */
  function drawButterfly() {
    for (var i = 0; i < butterflies.length; i++) {
      var s = butterflies[i];
      s.sw += s.ss; s.wob += .02;
      s.x += s.vx + Math.sin(s.wob) * .8;
      s.y += s.vy;
      if (s.y > H + 30 || s.x > W + 40 || s.x < -40) {
        butterflies[i] = newButterfly(false);
        continue;
      }
      var flap = Math.abs(Math.sin(s.sw));
      var wingW = s.r * 2 * (.25 + flap * .75);

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = s.a;

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
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha = s.a * .5;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(wingW * .55, -s.r * .55, s.r * .22, 0, 6.283); ctx.fill();
      ctx.restore();

      ctx.globalAlpha = s.a;
      var gr = ctx.createLinearGradient(0, 0, wingW, 0);
      gr.addColorStop(0, s.c);
      gr.addColorStop(1, 'rgba(255,255,255,.55)');
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(wingW * .6, -s.r * 1.5, wingW, -s.r * .5);
      ctx.quadraticCurveTo(wingW * .8, s.r * .2, 0, s.r * .5);
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha = s.a * .5;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(wingW * .55, -s.r * .55, s.r * .22, 0, 6.283); ctx.fill();

      ctx.globalAlpha = s.a;
      ctx.fillStyle = '#6b4f4f';
      ctx.beginPath();
      ctx.ellipse(0, 0, s.r * .16, s.r * .8, 0, 0, 6.283);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  /* ✨ 花粉流光 */
  function drawMeteors(rate) {
    if (Math.random() < rate) {
      meteors.push({
        x: Math.random() * W, y: Math.random() * H * .85,
        len: 80 + Math.random() * 140,
        sp: 5 + Math.random() * 6, a: 1
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

  /* 💗 心形花海 */
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
    var core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
    core.addColorStop(0, 'rgba(255,220,235,.9)');
    core.addColorStop(1, 'transparent');
    ctx.globalAlpha = 1;
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(cx, cy, 90, 0, 6.283); ctx.fill();

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
/* ============================================
   事件绑定
   ============================================ */
function bindFinaleEvents() {
  /* 工具函数：安全绑定 */
  function on(id, fn) {
    var el = document.getElementById(id);
    if (el) { el.onclick = fn; }
    else { console.warn('元素不存在: #' + id); }
  }
  function onQ(sel, fn) {
    var el = document.querySelector(sel);
    if (el) { el.onclick = fn; }
    else { console.warn('元素不存在: ' + sel); }
  }

  /* 进入花海 */
  on('btn-galaxy', enterGalaxy);

  /* 蜡烛点击许愿 */
  onQ('.candle', function () {
    var cake = document.querySelector('.flower-cake');
    if (!cake || cake.classList.contains('blowed')) return;
    cake.classList.add('blowed');
    var tip = document.querySelector('.blow');
    if (tip) tip.textContent = '愿望已送达 🌸';
    var mfs = cake.querySelectorAll('.mini-flower');
    for (var i = 0; i < mfs.length; i++) {
      mfs[i].style.setProperty('--sx', ((Math.random() - .5) * 120) + 'px');
    }
    if (window.Fireworks) {
      var r = cake.getBoundingClientRect();
      Fireworks.burst(r.left + r.width / 2, r.top + r.height / 3);
    }
    setTimeout(function () {
      cake.classList.remove('blowed');
      if (tip) tip.textContent = '点一下蜡烛，许个愿';
    }, 3000);
  });

  /* 第一封信：打开 */
  on('btn-letter', function () {
    var m = document.getElementById('letter-mask');
    if (m) m.classList.remove('hd');
  });

  /* 第二封信：打开 */
  on('btn-letter2', function () {
    var m = document.getElementById('letter-mask2');
    if (m) m.classList.remove('hd');
  });

  /* 关闭信件：点 × 或点遮罩空白处 */
  document.querySelectorAll('.letter-mask').forEach(function (m) {
    m.addEventListener('click', function (e) {
      if (e.target === m || e.target.classList.contains('close')) {
        m.classList.add('hd');
      }
    });
  });

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
