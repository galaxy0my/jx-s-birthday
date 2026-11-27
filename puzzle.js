/* ============================================================
   puzzle.js  ::  「圆恙」主题 7 题
   依赖：index.html 中的 #stage 容器、Fireworks 烟花引擎、finale.js
   ============================================================ */

/* ---------- 题库 ---------- */
var QS = [
  {
    lv: "ROUND 01 / 07",
    q: "「圆恙」这两个字，最贴合下面哪一种寓意？",
    o: [
      "圆：圆满周全；恙：疾病忧患 —— 合起来即「愿你圆满，一生无恙」",
      "圆：圆形蛋糕；恙：一种香草 —— 合起来即「香草味的圆形蛋糕」",
      "圆：圆滑世故；恙：平安无事 —— 合起来即「处世圆滑，平安无事」",
      "圆：月圆之夜；恙：思念之情 —— 合起来即「月夜里的思念」"
    ],
    a: 0,
    why: "「恙」在古汉语中指疾病、忧患（如「别来无恙」）。二字连用，取的是「圆满」与「无恙」的祝福之意。"
  },
  {
    lv: "ROUND 02 / 07",
    q: "在古文中，「无恙」一词的本义是：",
    o: [
      "没有忧愁",
      "没有疾病、没有灾祸",
      "没有遗憾",
      "没有分别"
    ],
    a: 1,
    why: "《战国策》有「岁亦无恙耶？」，《说苑》注：「恙，病也。」无恙即无病无灾，是古人见面时的问候语。"
  },
  {
    lv: "ROUND 03 / 07",
    q: "「圆恙」二字若拆解成字形，下面哪项描述是准确的？",
    o: [
      "「圆」是全包围结构，「恙」是上下结构",
      "「圆」是半包围结构，「恙」是左右结构",
      "「圆」是独体字，「恙」是上下结构",
      "「圆」是全包围结构，「恙」是半包围结构"
    ],
    a: 0,
    why: "「圆」为「囗」部全包围结构，内含「员」；「恙」为「羊」在上、「心」在下的上下结构。"
  },
  {
    lv: "ROUND 04 / 07",
    q: "若把「圆恙」写在一封祝福信的结尾，下面哪种落款方式最得体？",
    o: [
      "「此致 圆恙」—— 当作敬语使用",
      "「顺颂 圆恙」—— 当作对收信人的祝愿",
      "「圆恙 敬上」—— 当作署名使用",
      "「圆恙 收」—— 当作收件人姓名"
    ],
    a: 1,
    why: "「顺颂」「即颂」是书信结尾的祝颂语格式，后接对对方的祝愿（如「顺颂时祺」）。"
  },
  {
    lv: "ROUND 05 / 07",
    q: "「恙」字的部首是：",
    o: ["羊", "心", "忄", "疒"],
    a: 1,
    why: "「恙」归「心」部。上部「羊」表音兼表意，下部「心」表其与人内心的忧惧相关。"
  },
  {
    lv: "ROUND 06 / 07",
    q: "下面哪一句，最适合作为「圆恙」主题生日会的开场白？",
    o: [
      "「今天是你的生日，祝你生日快乐，年年有今日。」",
      "「又长一岁，愿你往后余生，所遇皆圆满，所行皆无恙。」",
      "「祝你早日实现财务自由，从此不用上班。」",
      "「生日快乐，蛋糕管够，别客气。」"
    ],
    a: 1,
    why: "只有这一句同时扣住了「圆」与「恙」二字的祝福内核，其余选项虽也是祝福，但未呼应主题。"
  },
  {
    lv: "ROUND 07 / 07",
    q: "最后一题 —— 这场「圆恙」生日会，真正的意义是：",
    o: [
      "考考你的知识储备",
      "把蛋糕吃完",
      "让你知道：有人一直在认真惦记着你",
      "看看你能不能通关"
    ],
    a: 2,
    why: "题目只是引子。真正的答案，在下一关。"
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
    html += '<button class="opt" data-i="' + i + '" onclick="pickOpt(' + i + ')">'
          + String.fromCharCode(65 + i) + '. ' + item.o[i] + '</button>';
  }
  html += '</div>';
  html += '<div class="err" id="opt-err"></div>';
  html += '<div class="cb" id="why-box" style="display:none"></div>';
  html += '<div style="margin-top:18px;font-size:.78em;color:#8b949e;letter-spacing:1px">'
        + 'SCORE: <span id="sc">' + score + '</span> / ' + QS.length
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
  answered = true;

  var item = QS[cur];
  var btns = document.querySelectorAll("#opts .opt");
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
    errBox.textContent = "✗ 答错了，正确答案是 " + String.fromCharCode(65 + item.a) + "。";
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
    msg = "题目不重要，重要的是 —— 有人愿意为你准备这一整套东西。";
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
