(() => {
  const registry = window.StudioSignatureRegistry;
  const required = ["id","status","version","person","role","signature"];
  const safeClass = value => String(value || "").toLowerCase().replace(/[^a-z0-9-]/g, "");
  function validate(data){
    const errors=[];
    required.forEach(key=>{if(!data?.[key]) errors.push(`Pflichtfeld fehlt: ${key}`)});
    if(!registry.statuses.has(data?.status)) errors.push("Ungültiger Status");
    if(!data?.person?.publicName?.ja && !data?.person?.publicName?.latin) errors.push("Öffentlicher Name fehlt");
    if(!registry.presets.has(data?.signature?.preset)) errors.push("Unbekanntes Preset");
    if(!registry.symbols.has(data?.signature?.symbol?.primary)) errors.push("Unbekanntes Hauptsymbol");
    if(!registry.movements.has(data?.signature?.animation?.movement)) errors.push("Ungültige Bewegungsanimation");
    return errors;
  }
  function layer(type, extra=""){const el=document.createElement("span");el.className=`signature-layer signature-layer--${type} ${extra}`.trim();el.setAttribute("aria-hidden","true");return el}
  function render(host,data){
    const errors=validate(data); if(errors.length) throw new Error(errors.join("; "));
    host.classList.add("signature-host",`signature-preset--${safeClass(data.signature.preset)}`);
    host.dataset.signatureId=data.id; host.dataset.signatureVersion=data.version;
    host.style.setProperty("--sig-primary",data.signature.colors?.primary||"#e7e4dc");
    host.style.setProperty("--sig-secondary",data.signature.colors?.secondary||"#9bb9d7");
    host.style.setProperty("--sig-accent",data.signature.colors?.accent||"#e6cc8f");
    host.style.setProperty("--sig-glow",data.signature.colors?.glow||"rgba(155,185,215,.30)");
    host.setAttribute("role","img"); host.setAttribute("aria-label",data.accessibility?.label||`Creative Signature von ${data.person.publicName.latin||data.person.publicName.ja}`);
    const bg=layer("background","sig-background--night");
    const atmosphere=layer("atmosphere",`sig-atmosphere--${safeClass(data.signature.effects?.atmosphere||"moon-haze")}`);
    const particles=layer("particles",`sig-particles--${safeClass(data.signature.effects?.particles||"")}`); for(let i=0;i<3;i++)particles.append(layer("particle","sig-particle"));
    const glow=layer("glow",`sig-glow--${safeClass(data.signature.effects?.glow||"")} sig-light--${safeClass(data.signature.animation?.light||"")}`);
    const symbol=layer("symbol",`sig-symbol--${safeClass(data.signature.symbol.primary)} sig-motion--${safeClass(data.signature.animation.movement)}`);
    symbol.innerHTML='<span class="sig-crescent sig-crescent--left"></span><span class="sig-crescent sig-crescent--right"></span>';
    const secondary=layer("secondary"); (data.signature.symbol.secondary||[]).slice(0,2).forEach(()=>secondary.append(layer("secondary-star","sig-secondary-star")));
    const name=layer("name"); name.removeAttribute("aria-hidden"); const wrapper=document.createElement("span");wrapper.className="signature-public-name";wrapper.innerHTML=`<strong lang="ja"></strong><small></small>`;wrapper.querySelector("strong").textContent=data.person.publicName.ja||data.person.publicName.latin;wrapper.querySelector("small").textContent=data.person.publicName.latin||"";name.append(wrapper);
    const interaction=layer("interaction");
    host.classList.add(`sig-transition--${safeClass(data.signature.animation?.transition||"")}`,`sig-interaction--${safeClass(data.signature.animation?.interaction||"")}`);
    host.replaceChildren(bg,atmosphere,particles,glow,symbol,secondary,name,interaction);
  }
  window.StudioCreativeSignatures={validate,render};
})();
