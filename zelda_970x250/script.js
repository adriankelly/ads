var autoVideoDiv, myVideo, isMobile = false, isTablet = false, myTween;


ready(InitHandler);

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function LearnMoreExitHandler(e) {
  Enabler.exit('ClickTag1');
}

function BuyNowExitHandler(e) {
  Enabler.exit('ClickTag2');
}

function kill() {

  TweenMax.killAll();
}

function DateSwitch() {
  var nowTime = +new Date();
  //pass in release date
  var releaseTime = +new Date(2015,9,23);
  if (releaseTime - nowTime < 0) {

    //display none preorder div
    document.querySelector('.preorder').style.display = 'none';
    document.querySelector('.release_date').style.display = 'none';
  } else {

    document.querySelector('.buynow').style.display = 'none';
    document.querySelector('.outnow').style.display = 'none';
    //display none out now div
  }
}

function InitHandler() {

  Embers.init();
  DateSwitch();  //use this if there's a date in the creative
  AutoPlayVideoSetup();
  document.getElementById('exit1').addEventListener('click', LearnMoreExitHandler, false);
  document.getElementById('exit2').addEventListener('click', BuyNowExitHandler, false);

  var timeline = new TimelineMax();
  var beamTimeline = new TimelineMax();
  var raysTimeline = new TimelineMax();

  raysTimeline.stop();

  beamTimeline.append([
    TweenMax.from('#container', 0.1, {alpha:0}),
    TweenMax.to('.beamhaze', 2, {y:'70', yoyo:true, repeat:-1, ease:Linear.easeNone}),
    TweenMax.allTo(['.beams1', '.beams2', '.beams3', '.beams4'], 0.7, {y:'70', yoyo: true, repeat:-1, ease:Linear.easeNone}, 0.3)
    ]);

  raysTimeline.append([
    TweenMax.to('#large_rays', 4, {scale: 1.5, rotation: 180, z:0.1, ease: Linear.easeNone}),
    TweenMax.to('#small_rays', 4, {scale: 1.5, rotation: -180, z:0.1, ease: Linear.easeNone}),
    TweenMax.to('#inner_ring', 4, {delay: 2, scale: 3, alpha: 0, z:0.1, ease: Linear.easeNone}),
    TweenMax.to('#outer_ring', 2, {scale: 4, alpha: 0, z:0.1, ease: Linear.easeNone}),
    ]);

  timeline.append([
    TweenMax.from('.text1', 0.5, {scale:0, alpha:0})
    ]);

  timeline.append([
    TweenMax.to('.text1', 2.5, {scale:1.2, ease:Linear.easeNone}),
    TweenMax.to('.text1', 0.5, {alpha:0, delay:2})
    ]);
  timeline.append([
    TweenMax.to('.pegi', 0.5, {alpha:0}),
    TweenMax.from('.triforcecontainer', 4.1, {scale:0, alpha:0, ease:Linear.easeNone}),
    TweenMax.to('.triforceblack', 1.5, {delay:1.5, alpha:0}),
    TweenMax.fromTo('.triforceglow', 0.8, {alpha:0.4, scale:0}, {ease: Expo.easeIn, delay:3, alpha:1, scale:1.2}),
    TweenMax.from('.flash', 0.3, {delay:3.8, alpha:0, yoyo:true, repeat:1}),
    TweenMax.from('.scrollbg', 1, {delay:3.6, alpha:0}),
    TweenMax.from('.zeldalogo', 0.01, {delay:4.1, alpha:0}),
    TweenMax.to('.triforceglow', 0.01, {delay:4.1, alpha:0}),
    TweenMax.to('.triforcecontainer', 0.01, {delay:4.1, x:'-=85', y:'2'}),
    TweenMax.to(['.triforce', '.beamcontainer', '#embers'], 0.01, {delay:3.9, alpha:0}),
    TweenMax.from('.ringscontainer', 0.5, {delay:4.1, alpha:0, onStart:function(){
      raysTimeline.play();
    }}),
    TweenMax.fromTo('.scrollbg', 4, {y:-100}, {delay:3.6, y:'+=100'}),
    ]);

  timeline.append([
    TweenMax.to('.flash', 0.3, {alpha:1})
    ]);
//886 129
timeline.append([
  TweenMax.to('.endframecontainer', 0.01, {alpha:1, onStart:function(){
    myTween.play();
    Embers.kill();
  }}),
  TweenMax.to('.flash', 0.3, {alpha:0}),
  TweenMax.to('.ringscontainer', 0.5, {alpha:0}),
  TweenMax.from(['#hero_rays1', '#hero_rays2'], 0.5, {delay: 3.25, alpha:0}),
  TweenMax.from('#hero_rays1', 11, {delay: 2.1, rotation: 360, transformOrigin:'890px 240px', ease: Linear.easeNone}),
  TweenMax.from('#hero_rays2', 11, {delay: 2.1, rotation: -360, transformOrigin:'890px 240px', ease: Linear.easeNone}),

  TweenMax.staggerFrom(['#text_powers', '#text_triple_power', '#text_currents', '#text_hearts'], 1, {alpha: 0, scale: 0.5, transformOrigin:'810px 125px', z:0.1, ease: Expo.easeOut}, 3),
  TweenMax.allFromTo(['#hero4_glow', '#hero5_glow', '#hero6_glow'], 1, {scale:0}, {delay: 3.25, transformOrigin: '886px 129px', scale:1.4}, 3),
  TweenMax.allTo(['#hero4_glow', '#hero5_glow', '#hero6_glow'], 0.3, {delay:3.85, alpha:0}, 3),
  TweenMax.allFrom(['#hero4','#hero5', '#hero6'], 0.01, {delay:3.85, alpha:0}, 3),
  TweenMax.allTo(['#hero4','#hero5', '#hero6'], 0.4, {delay:5.5, alpha:0}, 3),
  TweenMax.staggerTo(['#text_powers', '#text_triple_power', '#text_currents', '#text_hearts'], 1, {delay: 2.5, alpha: 0, z:0.1, ease: Linear.easeNone}, 3),
  TweenMax.to(['#hero_rays1', '#hero_rays2'], 1, {delay: 12, alpha: 0, z:0.1, ease: Linear.easeNone}),

// End Characters


    TweenMax.allFrom(['#end_rays1', '#end_rays2'], 1, {delay: 12, scale:0,  alpha:0}),
    TweenMax.from('#end_rays1', 4, {delay: 11.5, rotation: 240, transformOrigin:'890px 240px', ease: Linear.easeNone}),
    TweenMax.from('#end_rays2', 4, {delay: 11.5, rotation: -240, transformOrigin:'890px 240px', ease: Linear.easeNone}),
    TweenMax.to('.end_ringscontainer', 2, {delay: 13, alpha: 1}),
    TweenMax.to('#end_inner_ring', 4, {delay: 14, scale: 3, alpha: 0, z:0.1, ease: Linear.easeNone}),
    TweenMax.to('#end_outer_ring', 2, {delay: 13, scale: 4, alpha: 0, z:0.1, ease: Linear.easeNone}),

    TweenMax.fromTo('#end_characters_glow', 1, {scale:0}, {delay: 12.6, transformOrigin: '810px 125px', scale:1.4}),
    TweenMax.to('#end_characters_glow', 0.3, {delay:13, alpha:0}),


    TweenMax.from('.end_characters', 1, {delay: 13, alpha: 0, scale: 0.5, transformOrigin:'810px 125px', z:0.1, ease: Expo.easeOut})

  ]);


}

function AutoPlayVideoSetup() {
  myVideo = new CandyAutoplay('video_converted.txt', document.getElementById('video'), false, true, 15, function cb(tween){
    myTween = tween;
  });
}







