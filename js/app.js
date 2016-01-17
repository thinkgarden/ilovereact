window.onload=function () {
  animateLogo();
  animateRobot();
  updateSliderControl();
  addSmoothScrolling();
  addScrollBling();
}

window.onscroll=function(){
  updateSliderControl();
}


function updateSliderControl(){
  // 获得所有的 slider 链接
  var links = document.querySelectorAll("#slider-control a");
  for(var i = 0; i < links.length; i++) {
    var link = links[i];
    // console.log(link.getAttribute("href"));
    var id = link.getAttribute("href");
    var section = document.querySelector(id);
    var height = (section.offsetHeight) / 2;
    var sectionTop = section.offsetTop;
    // console.log(sectionTop);
    var sectionBottom = sectionTop + height;
    // console.log(sectionBottom);
    if(window.scrollY >= (sectionTop -height) && window.scrollY < sectionBottom) {
      link.className = "active";
    } else {
      link.className = "";
    }
  }
}

function animateRobot() {
  var t = new TimelineMax({yoyo: true, repeat: -1});
  t.to("#android-robot",1,{rotation: "-50deg"}).to("#android-robot",0.5,{rotation: "-40deg"});
}

function animateLogo() {
  TweenMax.fromTo("#react-logo",2, {
    // from
    css: {
      y: "-25px",
    }
  },{
    // to
    css: {
      y: "25px",
    },
    // 永久重复动画的选项
    repeat: -1,
    // 反转、重新运行动画的选项
    yoyo: true,
    // 改变 easing 类型
    ease: Power2.easeInOut,
  }
);
}

function scrollToElement(element){
  var topOfElement = element.offsetTop;
  TweenMax.to(window,1,{
    scrollTo: {
      y: topOfElement,
    },
    ease: Power2.easeInOut,
  });
}

function addSmoothScrolling(){
  var links = document.querySelectorAll("#slider-control a");
  for (var i = links.length - 1; i >= 0; i--) {
    // BUG 警告！使用闭包或者 ES6 `let` 修复。
   (function(i){
    var link = links[i];
    link.addEventListener("click",function(e){
      // You need to cancel the link's default behaviour.
      e.preventDefault();
      var id = link.getAttribute("href");
      var element = document.querySelector(id)
      scrollToElement(element);
    },false)
   }) (i);
  };
}

function addScrollBling(){
  var controller = new ScrollMagic.Controller();
  var scene1 = new ScrollMagic.Scene({
    triggerElement: "#touch" ,
    triggerHook: "onEnter",
    duration: "100%"
  })
  .setTween("#native .fade-overlay", 1, {opacity:1})
  // .addIndicators({name: "1 (opacity: 1)"})
  .addTo(controller);

  var scene2 = new ScrollMagic.Scene({
      triggerElement: "#native" ,
      triggerHook: "onLeave",
      duration: "100%" })
      .setTween("#iphone-overlay", 1, {width: "50%", y: 0})
      // .addIndicators({name: "2 (y: 0)"})
      .addTo(controller);

  var scene3 = new ScrollMagic.Scene({
      triggerElement: "#touch" ,
      triggerHook: "onLeave",
      duration: "100%"})
      .setPin("#iphone-overlay")
      // .addIndicators({name: "3 (pin iphone)"})
      .addTo(controller);
}

