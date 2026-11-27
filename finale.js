/* ============================================
   finale.js — 通关后的生日祝福（四段式 + 四种特效）
   ============================================ */

var BLESSINGS = [
  '生日快乐','前程似锦','心想事成','平安喜乐','岁岁平安',
  '新的一岁快乐','万事胜意','好运常在','天天开心','今天也要开心呀',
  '愿你被世界温柔以待','愿你一直闪闪发光','于运常在','心愿达成',
   'Happy birthday!','生日特权卡已到账','愿你新的一岁，所遇皆温柔，所行皆坦途',
   '愿你如星璀璨，如风自由','岁岁皆欢愉','万事皆如意'
];

/* ---------- 入口 ---------- */
function showFinale(){
  var stage = document.getElementById('stage');
  stage.innerHTML =
  '<div class="fin-wrap">'+

    /* 第1、2段 */
    '<div id="scene-heart" class="scene">'+
      '<div id="heart-box"></div>'+
      '<div id="danmaku-box"></div>'+
      '<div id="center-card" class="center-card">'+
        '<h1>生日快乐 <span class="heart-ico">♥</span></h1>'+
        '<p>小寿星祝你天天开心，永远幸福</p>'+
        '<button id="btn-galaxy">请陈殿下进入星河漫游 →</button>'+
      '</div>'+
    '</div>'+

    /* 第3段：星河 */
    '<div id="scene-galaxy" class="scene hd">'+
      '<canvas id="galaxy-cv"></canvas>'+
      '<div class="galaxy-text">'+
        '<div class="en">A LITTLE UNIVERSE, JUST FOR YOU</div>'+
        '<h1>把星河予你</h1>'+
        '<p>希望你天天开心，永远幸福</p>'+
        '<h2>祝你生日快乐</h2>'+
        '<button id="btn-letter">给你的一封信</button>'+
        '<button id="btn-letter2">再读一封</button>'+

      '</div>'+
      '<div class="cake-stage">'+
        '<div class="cake">'+
          '<div class="candle"><i class="flame2"></i></div>'+
          '<div class="tier t1"><i class="cherry"></i></div>'+
          '<div class="tier t2"></div>'+
          '<div class="tier t3"></div>'+
          '<div class="dish"></div>'+
        '</div>'+
        '<div class="ring r1"></div>'+
        '<div class="ring r2"></div>'+
        '<div class="happy">happy birthday</div>'+
        '<div class="blow">许个愿，吹灭蜡烛</div>'+
      '</div>'+
      '<div class="fx-bar">'+
        '<button class="fx-btn on" data-fx="galaxy">✦ 星河</button>'+
        '<button class="fx-btn" data-fx="snow">❄ 小雪</button>'+
        '<button class="fx-btn" data-fx="meteor">☄ 流星雨</button>'+
        '<button class="fx-btn" data-fx="halo">◎ 奇幻光环</button>'+
      '</div>'+
    '</div>'+

    /* 第4段：信件 */
    '<div id="letter-mask" class="letter-mask hd">'+
      '<div class="letter">'+
        '<button class="close">×</button>'+
        '<h3>致小寿星：</h3>'+ 
        '<p>  时光清浅处，一岁一安然。</p>'+
        '<p>  愿您新的一岁，既有烟火气的热饭暖茶，也有藏在日常里的小浪漫，日子过得有滋有味，喜乐无虞。</p>'+
        '<p>  送你一份100%纯情奶糖:成分是真心+思念+快乐，有效期是一生；营养是温馨+幸福+感动。</p>'+
        '<p>  愿你岁岁无忧，一生被爱，永远有敢于奔赴山海的勇气</p>'+
        '<p>  让风捎去我轻轻的祝福，落在你耳边：新的一岁，愿你所遇皆良人，所行皆顺利，把过往的遗憾清零，把未来的期待装满，每一天都有细碎的小惊喜。</p>'+
        
        '<div class="sign">——你的好朋友xyj</div>'+
      '</div>'+
    '</div>'+
         '<div id="letter-mask2" class="letter-mask hd">'+
      '<div class="letter">'+
        '<button class="close2">×</button>'+
        '<h3>嘿嘿，没想到吧，还有一封：</h3>'+
        '<p>  生日快乐呀！新的一岁开始啦，先给你一个大大的拥抱。</p>'+
        '<p>  谢谢你出现在我的生活里。那些一起分享的开心和烦恼，都让平凡的日子变得闪闪发光。</p>'+
        '<p>  谢谢你一直以来的温柔和陪伴。不管遇到什么事，想到你就会觉得很安心。</p>'+
        '<p>  新的一岁，愿你所有的努力都有回报，所有的期待都能如愿，去喜欢的地方，见想见的人，做想做的事。</p>'+
        '<p>  最后，还是想把这句话认真地说给你听：小寿星，祝你天天开心，永远幸福。</p>'+
      
        '<div class="sign">——你的好朋友xyj</div>'+
      '</div>'+
    '</div>'+


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
   第3段：星河 + 四种特效
   ============================================ */
var Galaxy = (function(){
  var cv, ctx, W, H, raf;
  var mode = 'galaxy';
  var stars=[], bokeh=[], meteors=[], snow=[], halos=[];
  var BC = ['#58a6ff','#f778ba','#d29922','#bc8cff','#06d6a0'];

  function init(){
    cv = document.getElementById('galaxy-cv');
    ctx = cv.getContext('2d');
    resize();
    addEventListener('resize', resize);

    stars=[]; bokeh=[]; snow=[]; halos=[];
    for(var i=0;i<160;i++) stars.push({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*1.4+.3, a:Math.random(), s:.008+Math.random()*.02
    });
    for(var j=0;j<26;j++) bokeh.push({
      x:Math.random()*W, y:Math.random()*H,
      r:12+Math.random()*46, c:BC[j%BC.length],
      a:.10+Math.random()*.18, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25
    });
    for(var k=0;k<70;k++) snow.push(newSnow(true));
    for(var m=0;m<4;m++) halos.push({
      r:60+m*55, a:.35-m*.06, sp:.4+m*.15, rot:Math.random()*6.28,
      c:BC[m%BC.length]
    });
    loop();
  }

  function resize(){
    if(!cv) return;
    W = cv.width  = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;
  }

  function newSnow(anywhere){
    return {
      x:Math.random()*W,
      y:anywhere ? Math.random()*H : -10,
      r:1+Math.random()*2.6,
      vy:.5+Math.random()*1.4,
      vx:(Math.random()-.5)*.6,
      sw:Math.random()*6.28,
      ss:.01+Math.random()*.02,
      a:.4+Math.random()*.5
    };
  }

  /* --- 各模式绘制 --- */
  function drawStars(){
    for(var i=0;i<stars.length;i++){
      var s=stars[i];
      s.a+=s.s; if(s.a>1||s.a<.15) s.s*=-1;
      ctx.globalAlpha=Math.abs(s.a);
      ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.283); ctx.fill();
    }
  }
  function drawBokeh(){
    for(var i=0;i<bokeh.length;i++){
      var b=bokeh[i];
      b.x+=b.vx; b.y+=b.vy;
      if(b.x<-60)b.x=W+60; if(b.x>W+60)b.x=-60;
      if(b.y<-60)b.y=H+60; if(b.y>H+60)b.y=-60;
      var gr=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
      gr.addColorStop(0,b.c); gr.addColorStop(1,'transparent');
      ctx.globalAlpha=b.a; ctx.fillStyle=gr;
      ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,6.283); ctx.fill();
    }
  }
  function drawMeteors(rate){
    if(Math.random()<rate) meteors.push({
      x:Math.random()*W*.85, y:Math.random()*H*.45,
      len:80+Math.random()*140, sp:5+Math.random()*6, a:1
    });
    for(var i=meteors.length-1;i>=0;i--){
      var m=meteors[i];
      var gr=ctx.createLinearGradient(m.x,m.y,m.x+m.len,m.y+m.len*.6);
      gr.addColorStop(0,'rgba(255,255,255,.95)');
      gr.addColorStop(.4,'rgba(180,210,255,.5)');
      gr.addColorStop(1,'transparent');
      ctx.globalAlpha=m.a; ctx.strokeStyle=gr; ctx.lineWidth=1.8;
      ctx.beginPath(); ctx.moveTo(m.x,m.y);
      ctx.lineTo(m.x+m.len,m.y+m.len*.6); ctx.stroke();
      m.x+=m.sp; m.y+=m.sp*.6; m.a-=.012;
      if(m.a<=0||m.x>W) meteors.splice(i,1);
    }
  }
  function drawSnow(){
    for(var i=0;i<snow.length;i++){
      var s=snow[i];
      s.sw+=s.ss;
      s.x+=s.vx+Math.sin(s.sw)*.5;
      s.y+=s.vy;
      if(s.y>H+10){ snow[i]=newSnow(false); continue; }
      if(s.x<-10)s.x=W+10; if(s.x>W+10)s.x=-10;
      ctx.globalAlpha=s.a;
      ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.283); ctx.fill();
      // 雪花十字
      if(s.r>2.4){
        ctx.globalAlpha=s.a*.5; ctx.strokeStyle='#fff'; ctx.lineWidth=.6;
        ctx.beginPath();
        ctx.moveTo(s.x-s.r*2,s.y); ctx.lineTo(s.x+s.r*2,s.y);
        ctx.moveTo(s.x,s.y-s.r*2); ctx.lineTo(s.x,s.y+s.r*2);
        ctx.stroke();
      }
    }
  }
  function drawHalos(){
    var cx=W/2, cy=H/2;
    for(var i=0;i<halos.length;i++){
      var h=halos[i];
      h.rot+=h.sp*.01;
      ctx.save();
      ctx.translate(cx,cy);
      ctx.rotate(h.rot);
      ctx.scale(1,.32);                       // 压扁成椭圆
      var gr=ctx.createRadialGradient(0,0,h.r*.75,0,0,h.r);
      gr.addColorStop(0,'transparent');
      gr.addColorStop(.7,h.c);
      gr.addColorStop(1,'transparent');
      ctx.globalAlpha=h.a; ctx.fillStyle=gr;
      ctx.beginPath(); ctx.arc(0,0,h.r,0,6.283); ctx.fill();
      ctx.globalAlpha=h.a+.15;
      ctx.strokeStyle=h.c; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(0,0,h.r,0,6.283); ctx.stroke();
      ctx.restore();
    }
    // 中心光核
    var core=ctx.createRadialGradient(cx,cy,0,cx,cy,90);
    core.addColorStop(0,'rgba(255,240,200,.55)');
    core.addColorStop(1,'transparent');
    ctx.globalAlpha=1; ctx.fillStyle=core;
    ctx.beginPath(); ctx.arc(cx,cy,90,0,6.283); ctx.fill();
  }

  function loop(){
    ctx.clearRect(0,0,W,H);
    drawStars();

    if(mode==='galaxy'){
      drawBokeh();
      drawMeteors(.02);
    }else if(mode==='snow'){
      drawBokeh();
      drawSnow();
    }else if(mode==='meteor'){
      drawBokeh();
      drawMeteors(.16);
    }else if(mode==='halo'){
      drawHalos();
      drawSnow();
    }
    ctx.globalAlpha=1;
    raf=requestAnimationFrame(loop);
  }

  return {
    start:init,
    setMode:function(m){ mode=m; }
  };
})();

function enterGalaxy(){
  document.getElementById('scene-heart').classList.add('hd');
  var g = document.getElementById('scene-galaxy');
  g.classList.remove('hd');
  g.classList.add('galaxy-in');
  Galaxy.start();
}

/* ============================================
   事件绑定
   ============================================ */
function bindFinaleEvents(){
  document.getElementById('btn-galaxy').onclick = enterGalaxy;

  document.getElementById('btn-letter').onclick = function(){
    document.getElementById('letter-mask').classList.remove('hd');
  };
  document.querySelector('#letter-mask .close').onclick = function(){
    document.getElementById('letter-mask').classList.add('hd');
  };
  document.getElementById('letter-mask').onclick = function(e){
    if(e.target.id==='letter-mask')
      document.getElementById('letter-mask').classList.add('hd');
  };

  // 特效切换
  var btns = document.querySelectorAll('.fx-btn');
  for(var i=0;i<btns.length;i++){
    btns[i].onclick = function(){
      for(var j=0;j<btns.length;j++) btns[j].classList.remove('on');
      this.classList.add('on');
      Galaxy.setMode(this.getAttribute('data-fx'));
    };
  }
   
  // 第二封信
  document.getElementById('btn-letter2').onclick = function(){
    document.getElementById('letter-mask2').classList.remove('hd');
  };
  document.querySelector('#letter-mask2 .close2').onclick = function(){
    document.getElementById('letter-mask2').classList.add('hd');
  };
  document.getElementById('letter-mask2').onclick = function(e){
    if(e.target.id==='letter-mask2')
      document.getElementById('letter-mask2').classList.add('hd');
  };

}
