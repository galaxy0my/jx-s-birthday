/* ============================================================
   puzzle.js  ::  「圆恙」主题 7 题
   依赖：index.html 中的 #stage 容器、Fireworks 烟花引擎、finale.js
   ============================================================ */

/* ---------- 题库 ---------- */
var QS = [
  {
    lv: "ROUND 01 / 07",
    q: "圆子和无恙的粉丝给她们取的组合名\"圆恙\"，谐音是：",
    o: [
      "A. 圆满安康",
      "B. 源远流长",
      "C. 平安无恙",
      "D. 圆圆满满"
    ],
    a: 0,
    why: "正确答案是 A：圆满安康。"
  },
  {
    lv: "ROUND 02 / 07",
    q: "圆子和无恙的粉丝给她们取的组合名\"圆恙\"，谐音是：",
    o: [
      "A. 汤圆 和 小羊",
      "B. 甜甜圈 和 羊仔仔",
      "C. 圆宝 和 恙恙",
      "D. 糯米团 和 咩咩"
    ],
    a: 1,
    why: "正确答案是 B：甜甜圈 和 羊仔仔。"
  },
  {
    lv: "ROUND 03 / 07",
    q: "在《吉时已到》中，尔尔被困在S级恐怖副本中，化身昆曲NPC杜丽娘。她究竟经历了多少次循环，才最终等来了爱人慕辞完成通关、故人归来？",
    o: [
      "A. 999次",
      "B. 1000次",
      "C. 1001次",
      "D. 1003次"
    ],
    a: 2,
    why: "正确答案是 C：1001次。"
  },
  {
    lv: "ROUND 04 / 07",
    q: "《闪耀暖暖》与国家京剧院联动时，推出了以《杨门女将》中穆桂英为原型的定制套装。这套戏服的名字是：",
    o: [
      "A. 辞凤阙",
      "B. 书香英华",
      "C. 月照关山",
      "D. 飞鱼承志"
    ],
    a: 2,
    why: "正确答案是 C：月照关山。"
  },
  {
    lv: "ROUND 05 / 07",
    q: "《吉时已到》中昆曲《牡丹亭》的元素贯穿始终，尔尔在副本中更是将曲子唱得字字泣血。为了这部无投资、纯手搓的自制电影，圆子专门抽时间学习了多长时间的传统戏曲？",
    o: [
      "A. 半年越剧",
      "B. 两年昆曲",
      "C. 一年京剧",
      "D. 三年黄梅戏"
    ],
    a: 1,
    why: "正确答案是 B：两年昆曲。"
  },
  {
    lv: "ROUND 06 / 07",
    q: "尔尔被困在《牡丹亭·喜宴》副本中，孤身守着戏台和旧婚约，岁岁等一人。直到第1001次吉时，真正的玄鸟小队全员归来，打破了轮回的宿命。帮助他们重置时间、再次进入副本的关键道具是什么？",
    o: [
      "A. 盗火者的计时器",
      "B. 杜丽娘的折扇",
      "C. 玄鸟的羽毛",
      "D. 忘川的彼岸花"
    ],
    a: 0,
    why: "正确答案是 A：盗火者的计时器。"
  },
  {
    lv: "ROUND 07 / 07",
    q: "《闪耀暖暖》在文化传播上一直非常硬核。除了与国家京剧院、山东博物馆的联动外，还与南京云锦研究所合作，耗时半年以上打造了一套传递“天衣无缝、灿若云霞”工艺美学的实体套装。这套套装的名字是：",
    o: [
      "A. 月照关山",
      "B. 书香英华",
      "C. 云锦端仪",
      "D. 煌煌照重渊"
    ],
    a: 2,
    why: "正确答案是 C：云锦端仪。"
  }
];

/* ---------- 状态 ---------- */
var cur = 0, score = 0, answered = false;

/* ---------- 渲染 ---------- */
function renderPuzzle(n) {
  cur = (typeof n === "number") ? n : cur;
  answered = false;
  var stage = document.getElementById("stage");
  if (!stage) return;

  /* 结算页 */
  if (cur >= QS.length) { renderResult(); return; }

  var item = QS[cur];
  var pct = Math.round((cur / QS.length) * 100);

  var html = "";
  html += '<div class="lv-tag">' + item.lv + '</div>';
  html += '<div class="q"><b>' + item.q + '</b></div>';
  html += '<div id="opts">';
      for (var i = 0; i < item.o.length; i++) {
      html += '<button class="opt" data-i="' + i + '" onclick="pickOpt(' + 
              + item.o[i] + '</button>';
    }

  html += '</div>';
  html += '<div class="err" id="opt-err"></div>';
  html += '<div class="cb" id="why-box" style="display:none"></div>';
  html += '<div style="margin-top:18px;font-size:.78em;color:#8b949e;letter-spacing:.1em">'          + 'SCORE: <span id="sc">' + score + '</span> / ' + QS.length
       + ' &nbsp;&nbsp; PROGRESS: ' + pct + '%'
       + '</div>';

        + ' &nbsp;|&nbsp; PROGRESS: ' + pct + '%'
        + '</div>';
  html += '<div style="height:4px;border-radius:2px;background:rgba(255,255,255,.08);margin-top:8px;overflow:hidden">'
        + '<div id="bar" style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#238636,#3fb950);transition:width .5s"></div>'
        + '</div>';

  stage.innerHTML = html;
}

/* ---------- 作答 ---------- */
function pickOpt(i) {
  if (answered) return;
  

  var item = QS[cur];
  var btns = document.querySelectorAll("#opts .opt");
  if (!btns.length) { console.warn("选项没渲染出来"); return; }
  if (!btns[item.a]) { console.warn("正确答案索引越界", item.a); return; }
  answered = true;

  var errBox = document.getElementById("opt-err");
  var whyBox = document.getElementById("why-box");

  /* 标出正确项 */
  btns[item.a].style.background = "linear-gradient(135deg,#238636,#2ea043)";
  btns[item.a].style.borderColor = "#3fb950";
  btns[item.a].style.color = "#fff";

  if (i === item.a) {
    score++;
    document.getElementById("sc").textContent = score;
    if (window.Fireworks) {
      Fireworks.burst(innerWidth / 2, innerHeight * 0.35);
    }
  } else {
    btns[i].style.background = "rgba(248,81,73,.18)";
    btns[i].style.borderColor = "#f85149";
    btns[i].style.color = "#f85149";
    errBox.style.display = "block";
    errBox.textContent = "✗ 答错了，正确答案是 " + item.o[item.a].substring(0, 1) + "。";
  }

  whyBox.style.display = "block";
  whyBox.innerHTML = "<b>解析：</b>" + item.why;

  /* 下一题按钮 */
  var next = document.createElement("button");
  next.textContent = (cur + 1 >= QS.length) ? "查看结算 »" : "下一题 »";
  next.onclick = function () { renderPuzzle(cur + 1); };
  document.getElementById("stage").appendChild(next);
}

/* ---------- 结算 ---------- */
function renderResult() {
  var stage = document.getElementById("stage");
  var total = QS.length;
  var grade, msg;

  if (score === total) {
    grade = "S 级 · 骨灰级圆恙粉";
    msg = "七题全对。看来「圆恙」这两个字的分量，你早就懂了。";
  } else if (score >= 5) {
    grade = "A 级 · 资深观察者";
    msg = "差一点点就满分。不过没关系，真正重要的那题，你肯定答对了。";
  } else if (score >= 3) {
    grade = "B 级 · 合格参与者";
    msg = "分数不高，但你愿意一路答到这里，这就够了。";
  } else {
    grade = "C 级 · 重在参与";
    msg = "题目不重要，重要的是 —— 有人一直在认真惦记着你。";
  }

  var html = "";
  html += '<div class="lv-tag">FINAL RESULT</div>';
  html += '<div class="q"><b>答题完毕</b></div>';
  html += '<div class="cb">';
  html += '得分：<b style="color:#3fb950;font-size:1.4em">' + score + '</b> / ' + total + '<br>';
  html += '评级：' + grade + '<br><br>';
  html += msg;
  html += '</div>';
  html += '<div class="q" style="color:#8b949e;font-size:.9em">';
  html += '愿你也如「圆恙」二字 —— 圆满，无恙。';
  html += '</div>';
  html += '<button onclick="goFinale()">进入惊喜环节 ✦</button>';
  html += '<button class="fx-btn" style="width:100%;margin-top:10px" onclick="restartQuiz()">重新作答</button>';

  stage.innerHTML = html;

  if (window.Fireworks) {
    for (var k = 0; k < 3; k++) {
      (function (d) {
        setTimeout(function () {
          Fireworks.burst(Math.random() * innerWidth, innerHeight * (0.2 + Math.random() * 0.3));
        }, d);
      })(k * 350);
    }
  }
}

/* ---------- 重开 ---------- */
function restartQuiz() {
  score = 0;
  renderPuzzle(0);
}

/* ---------- 接入 finale.js ---------- */
/* finale.js 里的启动函数名若与下面不同，请把真实函数名填进数组第一位 */
var FINALE_NAMES = ["renderFinale", "startFinale", "showFinale", "enterFinale", "finale", "playFinale", "beginFinale"];

function goFinale() {
  for (var i = 0; i < FINALE_NAMES.length; i++) {
    var fn = window[FINALE_NAMES[i]];
    if (typeof fn === "function") { fn(); return; }
  }
  alert("未找到祝福环节的启动函数。\n请在 puzzle.js 底部的 FINALE_NAMES 数组里，把 finale.js 中真实的函数名填到第一位。");
}
