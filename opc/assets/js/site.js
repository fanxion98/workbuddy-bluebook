/* 超级个体 — 共享站点脚本：导航/页脚注入 + 页面交互 */
(function(){
  const NAV=[
    ["index.html","首页"],["theory.html","理论体系"],["map.html","能力地图"],
    ["cases.html","实操案例"],["showcase.html","超级个体"],["opc.html","全国OPC社区"],
    ["skills.html","技能箱"],["library.html","书库"],["roadmap.html","成长路线"],["about.html","关于"]
  ];
  const cur=location.pathname.split("/").pop()||"index.html";
  const BASE=(location.pathname.split("/").filter(Boolean).length>2)?"../":"";

  const navEl=document.getElementById("site-nav");
  if(navEl){
    const links=NAV.map(([u,t])=>`<a href="${BASE}${u}" class="${u===cur?'active':''}">${t}</a>`).join("");
    navEl.innerHTML=`<div class="nav-inner">
      <a class="brand" href="${BASE}index.html">超级OPC一人公司秘籍</a>
      <nav class="nav-links">${links}</nav>
      <span id="authSlot" class="auth-slot"></span>
      <button class="nav-toggle" aria-label="菜单">菜单</button>
    </div>`;
    navEl.querySelector(".nav-toggle").addEventListener("click",()=>{
      navEl.querySelector(".nav-links").classList.toggle("open");
    });
  }

  const footEl=document.getElementById("site-footer");
  if(footEl){
    footEl.innerHTML=`<div style="padding:40px 20px 60px;border-top:1px solid var(--line);margin-top:40px;">
      <div style="max-width:800px;margin:0 auto;display:flex;align-items:center;gap:40px;flex-wrap:wrap;justify-content:center;">
        <div style="text-align:center;flex-shrink:0;">
          <img src="${BASE}assets/images/wechat-qr.jpg" alt="微信二维码" style="width:180px;height:auto;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <p style="margin-top:12px;color:var(--muted);font-size:13px;">扫码添加微信好友</p>
        </div>
        <div style="flex:1;min-width:260px;">
          <h3 style="font-family:var(--serif);font-size:22px;color:var(--ink);margin:0 0 12px;">AI 创业者・单人商业</h3>
          <p style="color:var(--muted);font-size:15px;line-height:1.7;margin:0;">一个人就是一套可增长的商业系统。这里是 AI 创业者的实战阵地 —— 认知、工具、案例与落地路径，帮你把技术专长变成可变现的 SaaS 业务。</p>
        </div>
      </div>
    </div>`;
  }
})();
