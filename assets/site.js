/* 모든 페이지가 공유하는 스크립트.
   페이지 전용 동작(아카이브 팝업, 배경 영상 등)은 해당 HTML에 인라인으로 둔다. */

/* 등장 모션 */
(function(){
  var items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  if(!('IntersectionObserver' in window) ||
     window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    items.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },{ threshold:.12, rootMargin:'0px 0px -8% 0px' });
  items.forEach(function(el){ io.observe(el); });
})();

/* 목차 스크롤 추적 */
(function(){
  var links = [].slice.call(document.querySelectorAll('#tocList a'));
  if(!links.length) return;
  var items = links.map(function(a){
    return { link:a, el:document.querySelector(a.getAttribute('href')), top:0 };
  }).filter(function(x){ return x.el; });
  if(!items.length) return;

  /* 위치는 로드/리사이즈 때만 계산 — 스크롤 중에는 레이아웃을 읽지 않음 */
  function measure(){
    var y = window.pageYOffset;
    for(var i=0;i<items.length;i++){
      items[i].top = items[i].el.getBoundingClientRect().top + y;
    }
  }
  function update(){
    var line = window.pageYOffset + 120;      // 상단바 아래 기준선
    var active = items[0];
    for(var i=0;i<items.length;i++){
      if(items[i].top <= line) active = items[i];
    }
    if(window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4){
      active = items[items.length-1];         // 문서 끝에서는 마지막 항목
    }
    for(var j=0;j<items.length;j++){
      items[j].link.classList.toggle('on', items[j] === active);
    }
  }
  function remeasure(){ measure(); update(); }

  window.addEventListener('scroll', update, { passive:true });
  window.addEventListener('resize', remeasure);
  window.addEventListener('load', remeasure);
  document.addEventListener('loadedmetadata', remeasure, true);
  remeasure();
})();
