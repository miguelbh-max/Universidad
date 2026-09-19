/* Utilidades compartidas: animación de entrada, ruido reproducible y gráficas */
(function(){
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded',function(){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
});
window.$=function(i){return document.getElementById(i)};
/* Generador pseudoaleatorio con semilla (las gráficas salen siempre iguales) */
window.rnd=function(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
/* Dibuja series en un <svg viewBox="0 0 600 220"> */
window.plot=function(id,S,o){
  var W=600,H=220,p=12,n=S[0].d.length,h='',g,y;
  for(g=0;g<=4;g++){y=p+(H-2*p)*g/4;h+='<line x1="'+p+'" x2="'+(W-p)+'" y1="'+y+'" y2="'+y+'" stroke="#000" stroke-opacity=".15"/>'}
  S.forEach(function(s){
    var d='';
    s.d.forEach(function(v,i){
      var x=p+(W-2*p)*i/(n-1),yy=H-p-(H-2*p)*(v-o.min)/(o.max-o.min);
      d+=(i?'L':'M')+x.toFixed(1)+','+yy.toFixed(1);
    });
    h+='<path d="'+d+'" fill="none" stroke="'+s.c+'" stroke-width="'+(s.w||3)+'"'+(s.k?' stroke-dasharray="'+s.k+'"':'')+' stroke-linejoin="round"/>';
  });
  $(id).innerHTML=h;
};
})();
