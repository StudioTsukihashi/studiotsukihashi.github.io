document.addEventListener("DOMContentLoaded", async () => {
  const hosts=[...document.querySelectorAll("[data-signature]")];
  await Promise.all(hosts.map(async host=>{
    const id=host.dataset.signature; const base=host.dataset.signatureBase||"../assets/signatures";
    try { const response=await fetch(`${base}/data/${encodeURIComponent(id)}.json`,{cache:"no-cache"}); if(!response.ok) throw new Error(`HTTP ${response.status}`); const data=await response.json(); window.StudioCreativeSignatures.render(host,data); }
    catch(error){ console.error(`Creative Signature '${id}' konnte nicht geladen werden.`,error); host.classList.add("signature-host"); host.innerHTML='<span class="signature-fallback">Creative Signature</span>'; }
  }));
});
