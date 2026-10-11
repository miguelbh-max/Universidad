/* Aparición de bloques al hacer scroll */
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.1});
  els.forEach(function(e){io.observe(e)});
})();
/* Resaltado de sintaxis C++ (ligero) */
(function(){
  var re=/(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])')|(#\s*(?:include|define|if|else|endif|ifdef|ifndef)\b(?:\s+[A-Za-z_]+)?)|\b(class|public|private|protected|const|constexpr|static|void|bool|int|char|uint8_t|uint16_t|uint32_t|unsigned|long|float|double|return|if|else|while|for|switch|case|default|break|enum|struct|virtual|override|true|false|this|nullptr|auto)\b|\b(\d+(?:\.\d+)?)\b|\b([A-Z][A-Z0-9_]+)\b/g;
  var esc=function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')};
  document.querySelectorAll('pre code').forEach(function(el){
    var src=el.textContent,out='',last=0,m;re.lastIndex=0;
    while((m=re.exec(src))){
      out+=esc(src.slice(last,m.index));
      var c=(m[1]||m[2])?'tk-c':m[3]?'tk-s':m[4]?'tk-p':m[5]?'tk-k':m[6]?'tk-n':'tk-K';
      out+='<span class="'+c+'">'+esc(m[0])+'</span>';last=re.lastIndex;
    }
    el.innerHTML=out+esc(src.slice(last));
  });
})();
/* Botones de copiar (un bloque o el sketch completo) */
(function(){
  document.querySelectorAll('.copy,.copyall').forEach(function(b){
    b.dataset.label=b.textContent;
    b.addEventListener('click',function(){
      var text=b.dataset.all
        ? b.dataset.all.split(',').map(function(id){return document.getElementById(id).textContent.trim()}).join('\n\n')
        : b.closest('.code').querySelector('code').textContent;
      var done=function(){b.textContent='¡Copiado!';b.classList.add('done');setTimeout(function(){b.textContent=b.dataset.label;b.classList.remove('done')},1600)};
      if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done);}
      else{var ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();done();}
    });
  });
})();
