// ===== 学习监督数据仓库（自动化每晚23:00读写，工作台.html / dashboard.html 渲染）=====
// days[]: {date,dow,week,plan:[],q:{study,mistakes,bonus,virtue},cats:{study,bonus,virtue},score,note}
// researchPlan: 日期 → {time, items:[{t,tag}], focus}  tag ∈ 精读/泛读/代码/输出/汇报/其他
const DATA = {
  meta: { name: "", version: 4, updated: "2026-08-30", workbench: "工作台.html", dashboard: "dashboard.html" },
  anchors: {
    semester: "2026-2027 大二上（8.31开始上课）",
    gpaTarget: "期末加权≥91 → 累计绩点≥3.71（大二末3.80）",
    courseFloor: "每门≥80底线；数理类≥85；强项课93+",
    semesterGoals: ["蓝桥杯报名(10月下旬)+每日刷题", "12月CET-6首考500+", "科研: 9.10首汇报(8页8-10分钟), 之后每周1深读+2扫描+双周简报, 证据卡10分制"],
  },
  report: { title: "CV方向初识 · 第一次组内汇报", date: "2026-09-10" },
  streak: { current: 0, best: 0 },
  days: [
    { date: "2026-08-29", dow: "六", week: 202635, plan: ["整理两个社会实践项目的结项成果", "班委竞选PPT×2版（班长版+生活委员版）", "数媒大赛「官渡之战」继续推进", "数媒大赛：和黄想一起出点子", "大创分工：初步规划"], q: { study: "未做", mistakes: "—", bonus: "五项全部未做", virtue: "—" }, cats: { study: 0, bonus: 0, virtue: 0 }, score: 0, note: "用户主动申报全部未做，全天未执行，已顺延" },
  ],
  weeklyReviews: [],
  weekPlans: {
    "2026-08-24": {
      sat: ["整理两个社会实践项目的结项成果", "班委竞选PPT×2版（班长版+生活委员版）", "数媒大赛「官渡之战」继续推进", "数媒大赛：和黄想一起出点子", "大创分工：初步规划"],
      sun: [],
    },
    "2026-08-31": {
      mon: ["报到注册+领教材，加各课程群", "班长竞选：交材料/演讲", "（晚软编实践课到21:25，课后休息）"],
      tue: ["LeetCode 3题", "背六级单词30min，确认CET-6报名时间", "概率论跟课+当天作业"],
      wed: ["LeetCode 3题", "上午空档：整理本周论文笔记+准备周报素材", "锻炼30min"],
      thu: ["LeetCode 3题", "概率论作业+数理错题", "数字逻辑/前端课后整理"],
      fri: ["LeetCode 3题（周累计≥12）", "本周课程作业全清", "下午空档：科研代码里程碑收尾"],
      sat: ["上午：概率论专项2.5h", "下午：科研PPT/论文", "锻炼30min"],
      sun: ["上午：志愿活动或学生工作", "下午：预习周一课程+错题本", "晚：23:00验收周复盘，确认下周计划"],
    },
  },
  researchPlan: {
    "2026-08-30": { time: "建议9:30-12:00 + 14:00-16:00（标准3h，上限4h）", focus: "M0 环境卡日", items: [
      { t: "搭建 conda/venv + PyTorch + Git，跑通 torchvision smoke test", tag: "代码" },
      { t: "速读 ResNet (CVPR16) 动机与残差块，能画出残差连接", tag: "泛读" },
      { t: "输出 M0 环境卡：版本/设备/最小前向结果/仓库首个commit", tag: "输出" },
      { t: "基础45min：B站「跟李沐学AI」看 2.1 数据操作 视频(1.25x,关弹幕) → 回 zh.d2l.ai 书2.1 手敲代码", tag: "基础" },
      { t: "〔顺延〕整理两个社会实践项目的结项成果", tag: "其他" },
      { t: "〔顺延〕班委竞选PPT×2版（班长版+生活委员版）", tag: "其他" },
      { t: "〔顺延〕数媒大赛「官渡之战」继续推进", tag: "其他" },
      { t: "〔顺延〕数媒大赛：和黄想一起出点子", tag: "其他" },
      { t: "〔顺延〕大创分工：初步规划", tag: "其他" },
      { t: "置入课表（把本学期课表录进工作台/日程）", tag: "其他" },
      { t: "研究选课：查可选课程与时间冲突，列好备选顺序（明早10:00选课）", tag: "其他" },
      { t: "新闻稿投稿", tag: "其他" },
    ]},
    "2026-08-31": { time: "开学第一天，标准3h", focus: "机制读ViT + 训练框架", items: [
      { t: "机制读 ViT (ICLR 2021)：patch/token/attention 输入输出，读模型图与公式1", tag: "精读" },
      { t: "搭 CIFAR-10 小CNN vs ResNet18 共同训练框架", tag: "代码" },
      { t: "输出一页实验协议：数据划分/seed/epoch/指标/唯一变量", tag: "输出" },
      { t: "基础45min：d2l 数据操作练习 + 与 NumPy 对照；手推图片张量 N×C×H×W", tag: "基础" },
      { t: "软工导论/共同体/概率论第一课，记录各课考核方式", tag: "其他" },
      { t: "8:30 在 youthpartner.voc.com.cn/pc/topic/detail/1043 投稿（时间硬！提前写好）", tag: "其他" },
      { t: "10:00 抢课（时间硬！提前登好选课系统、备好志愿顺序）", tag: "其他" },
      { t: "（晚软编实践课）", tag: "其他" },
    ]},
    "2026-09-01": { time: "19:00-22:00", focus: "实验日 M1", items: [
      { t: "完成 M1 分类对照：小CNN vs ResNet18，固定seed，曲线+混淆矩阵+3个错误样本", tag: "代码" },
      { t: "输出实验卡 M1（同条件可重跑/结果表/错误案例，不追高精度）", tag: "输出" },
      { t: "基础45min：Exercism Python 3题（列表/字典/函数）", tag: "基础" },
      { t: "LeetCode 3题（竞赛线启动：STL/排序/前缀和/双指针/二分）", tag: "其他" },
    ]},
    "2026-09-02": { time: "论文日 19:00-22:00", focus: "深读导师主线", items: [
      { t: "深读 Dynamic Interaction Dilation (TMM 2024)：交互点击如何影响人体解析", tag: "精读" },
      { t: "输出论文证据卡 P1（10分制≥7分：输入/交互循环/DD-Module/AIE-Block/指标）", tag: "输出" },
      { t: "基础45min：d2l 2.3 线性代数——矩阵运算/范数，联系张量形状", tag: "基础" },
    ]},
    "2026-09-03": { time: "19:00-22:00", focus: "视频理解机制", items: [
      { t: "深读 VideoMAE V2（难则 VideoMAE）：时序采样/tube masking/预训练微调", tag: "精读" },
      { t: "准备视频推理环境；输出视频模型机制图（clip采样→logits张量流）+3个算力风险", tag: "输出" },
      { t: "基础45min：Kaggle Learn Python 短课一节 + Matplotlib 画一张曲线预习", tag: "基础" },
    ]},
    "2026-09-04": { time: "19:00-22:00", focus: "实验日 M2", items: [
      { t: "完成 M2：预训练 R3D-18/SlowFast 推理3-5个短视频；改采样间隔或clip长度", tag: "代码" },
      { t: "输出实验卡 M2：top-k/两组采样设置/失败案例（明确是推理实验）", tag: "输出" },
      { t: "基础45min：PyTorch Learn the Basics — Tensors + Autograd 前两节", tag: "基础" },
      { t: "竞赛：专题45min + 3题105min + 错题30min", tag: "其他" },
    ]},
    "2026-09-05": { time: "周六长块 3h", focus: "深读 ContextBLIP", items: [
      { t: "深读 ContextBLIP (ACL Findings 2024)：intra/inter-context alignment", tag: "精读" },
      { t: "浏览官方仓库估算复现成本（不重训练）；输出论文证据卡 P2", tag: "输出" },
      { t: "基础45min：Exercism Python 3题（类/文件读写/模块）", tag: "基础" },
    ]},
    "2026-09-06": { time: "周日 复盘+实验", items: [
      { t: "机制读 CLIP + 深读 CAPT 或 Spotlighter", tag: "精读" },
      { t: "20张小样本 prompt 敏感性实验；输出实验卡 M3（≥3套prompt/混淆对/零样本预测表）", tag: "代码" },
      { t: "基础45min：d2l 3.1-3.2 线性回归——损失函数与梯度（W2开始）", tag: "基础" },
      { t: "周复盘45min + 下周设计30min", tag: "其他" },
    ]},
    "2026-09-07": { time: "开学周一", items: [
      { t: "结构化扫描 SinColor (TIP 2026) 与最新交互分割论文", tag: "泛读" },
      { t: "整理高老师四条公开研究线，选汇报重点一篇；输出方向矩阵 v1", tag: "输出" },
      { t: "基础45min：d2l 3.3 从零实现线性回归，跑通一个epoch", tag: "基础" },
      { t: "（Python/PyTorch 地基60min + 日志30min）", tag: "其他" },
    ]},
    "2026-09-08": { time: "19:00-22:00", focus: "汇报材料日", items: [
      { t: "做8页PPT（每页一个结论式标题）；整理仓库README；M1/M2/M3只保留最可信两项", tag: "汇报" },
      { t: "输出 PPT v1 + demo录屏备份", tag: "输出" },
      { t: "基础45min：PyTorch basics — Autograd 走完整流程，能解释 requires_grad", tag: "基础" },
    ]},
    "2026-09-09": { time: "傍晚+晚", focus: "彩排日", items: [
      { t: "两次计时彩排（≤10分钟）；「老师追问清单」自测；向老师确认汇报时间", tag: "汇报" },
      { t: "基础15min：W1-W2 概念卡快速复习（张量形状/损失/梯度）", tag: "基础" },
      { t: "输出 PPT v2 + 问答卡", tag: "输出" },
    ]},
    "2026-09-10": { time: "汇报日", focus: "首次汇报", items: [
      { t: "完成首次汇报（8页、8-10分钟）；现场记录老师的方向/任务/代码/算力/汇报节奏建议", tag: "汇报" },
      { t: "会后2小时内把反馈转成 继续/停止/待确认 三栏；输出导师反馈记录", tag: "其他" },
    ]},
  },
};
