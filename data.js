// ===== 学习监督数据仓库（自动化每晚23:00读写，工作台.html / dashboard.html 渲染）=====
// days[]: {date,dow,week,plan:[],q:{study,mistakes,bonus,virtue},cats:{study,bonus,virtue},score,note}
// researchPlan: 日期 → {time, items:[{t,tag}], focus}  tag ∈ 精读/泛读/代码/输出/汇报/其他
const DATA = {
  meta: { name: "", version: 4, updated: "2026-08-30", workbench: "工作台.html", dashboard: "dashboard.html" },
  anchors: {
    semester: "2026-2027 大二上（8.31开始上课）",
    gpaTarget: "期末加权≥91 → 累计绩点≥3.71（大二末3.80）",
    courseFloor: "每门≥80底线；数理类≥85；强项课93+",
    semesterGoals: ["蓝桥杯报名(10月下旬)+每日刷题", "12月CET-6首考500+", "科研: 9.10首汇报, 之后每周精读1篇+泛读2篇"],
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
    "2026-08-30": { time: "建议9:30-12:00 + 14:00-16:00", focus: "CV全景 + 环境搭建", items: [
      { t: "精读《A Survey of the Recent Architectures of Deep CNNs》(AI Review 2022)", tag: "精读" },
      { t: "30min速读 ResNet (CVPR16)，搞懂残差连接", tag: "泛读" },
      { t: "输出「CV领域地图」笔记≥600字（分支+模型时间线手绘）", tag: "输出" },
      { t: "装Anaconda+PyTorch+CUDA，torch.cuda.is_available()=True", tag: "代码" },
      { t: "〔顺延〕整理两个社会实践项目的结项成果", tag: "其他" },
      { t: "〔顺延〕班委竞选PPT×2版（班长版+生活委员版）", tag: "其他" },
      { t: "〔顺延〕数媒大赛「官渡之战」继续推进", tag: "其他" },
      { t: "〔顺延〕数媒大赛：和黄想一起出点子", tag: "其他" },
      { t: "〔顺延〕大创分工：初步规划", tag: "其他" },
    ]},
    "2026-08-31": { time: "开学第一天，只排2h", focus: "ViT新范式", items: [
      { t: "精读《An Image is Worth 16x16 Words》(ViT, ICLR 2021)", tag: "精读" },
      { t: "输出 ViT vs CNN 对比笔记≥500字", tag: "输出" },
      { t: "软工导论/共同体/概率论第一课，记录各课考核方式", tag: "其他" },
      { t: "（晚软编实践课）", tag: "其他" },
    ]},
    "2026-09-01": { time: "建议19:00-21:00", focus: "第一个代码里程碑", items: [
      { t: "跑通 CIFAR-10+ResNet18 训练demo（里程碑M1），截图训练曲线", tag: "代码" },
      { t: "泛读 ConvNeXt (CVPR 2022)，输出200字笔记", tag: "泛读" },
      { t: "LeetCode 3题", tag: "其他" },
    ]},
    "2026-09-02": { time: "上午空档+晚19:00-21:00", focus: "动作识别路线图", items: [
      { t: "精读《Multimodal vision-based HAR: a comprehensive review》(AI Review 2024)", tag: "精读" },
      { t: "输出动作识别技术路线图笔记≥500字", tag: "输出" },
    ]},
    "2026-09-03": { time: "建议19:00-21:00", focus: "掩码视频建模", items: [
      { t: "精读 VideoMAE (NeurIPS 2022)", tag: "精读" },
      { t: "输出方法拆解笔记≥500字（tube masking为什么省算力）", tag: "输出" },
    ]},
    "2026-09-04": { time: "建议19:00-21:00", focus: "进入导师方向：talking head", items: [
      { t: "精读 SadTalker (CVPR 2023)", tag: "精读" },
      { t: "泛读 LivePortrait (2024, arXiv:2407.03168)", tag: "泛读" },
      { t: "输出 talking-head pipeline 笔记≥500字", tag: "输出" },
    ]},
    "2026-09-05": { time: "周六3h", focus: "数字人前沿扫描 + 启动汇报", items: [
      { t: "泛读 GaussianAvatars (CVPR 2024, arXiv:2312.02069)", tag: "泛读" },
      { t: "泛读 VASA-1 (NeurIPS 2024, arXiv:2404.10667)，选读Teller(CVPR 2025)", tag: "泛读" },
      { t: "输出数字人三条路线趋势清单 + 汇报PPT大纲v1", tag: "输出" },
    ]},
    "2026-09-06": { time: "周日3h", focus: "代码里程碑M2 + PPT", items: [
      { t: "跑通 MediaPipe 实时姿态/动作demo（M2），录屏", tag: "代码" },
      { t: "PPT v0.5：领域地图/演进/动作识别", tag: "汇报" },
    ]},
    "2026-09-07": { time: "1.5h", focus: "PPT完成 + 首次周报", items: [
      { t: "PPT v1 全部页完成（含数字人趋势页）", tag: "汇报" },
      { t: "给导师发简短周报邮件（本周读了什么+1个疑问）", tag: "汇报" },
      { t: "论文笔记归档进 GitHub cv-onboarding 仓库", tag: "其他" },
    ]},
    "2026-09-08": { time: "1.5h", focus: "定稿", items: [
      { t: "PPT定稿", tag: "汇报" },
      { t: "demo演示流程自查，录屏备份防现场翻车", tag: "汇报" },
    ]},
    "2026-09-09": { time: "傍晚1h", focus: "彩排", items: [
      { t: "预约/确认导师明天时间", tag: "汇报" },
      { t: "计时彩排≤15min，按彩排修改", tag: "汇报" },
      { t: "准备3个请教问题写进PPT末页", tag: "汇报" },
    ]},
    "2026-09-10": { time: "汇报日", focus: "第一次组内汇报", items: [
      { t: "带齐：PPT+demo（含录屏备份）+论文清单+3个问题", tag: "汇报" },
      { t: "汇报后记录老师反馈，列入下周计划", tag: "其他" },
    ]},
  },
};
