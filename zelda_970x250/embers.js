window.Embers = (function() {
  var sw, sh;

  var options = {
    fade: false,
    margin: 970,
    emberCount: 150,
    emberSize: 1,
    emberKillDelay: 50,
    zMin: 0.3,
    zMax: 0.7,
    alphaMin: 0.8,
    alphaMax: 1.3,
    rotationSpeed: 0,
    gravity: -150,
    windBegin: 0,
    windForceMin: 1,
    windForceMax: 5,
    windDirection: "",
    windTimeMin: 1,
    windTimeMax: 2
  }

  var windEngine = {
    wind: {
      max: options.windForceMax,
      min: options.windForceMin,
      dir: options.windDirection,
      force: (options.windDirection === "left") ? -options.windBegin : options.windBegin
    },
    nWind: null,
    generateWind: function(){
      switch(windEngine.wind.dir) {
        case "right": windEngine.nWind = Math.random()*(windEngine.wind.max-windEngine.wind.min)+windEngine.wind.min; break;
        case "left": windEngine.nWind = -Math.random()*(windEngine.wind.max-windEngine.wind.min)-windEngine.wind.min; break;
        default: windEngine.nWind = Math.random()*(windEngine.wind.max*2-windEngine.wind.min)-windEngine.wind.min-windEngine.wind.max; break;
      }
      TweenLite.to(windEngine.wind, Math.random()*3+1, {force:windEngine.nWind, delay:Math.random()*(options.windTimeMax-options.windTimeMin)+options.windTimeMin, onComplete:windEngine.generateWind});
    },
    kill: function() {
      TweenLite.killTweensOf(windEngine.wind);
    }
  }

  function EmberParticle() {
    this.x;
    this.y;
    this.alpha;
    this.rotation;
    this.depth;
    this.scaleX;
    this.dom = $('<div class="ember">');
    // this.index = Math.floor(Math.random() * 8) * 12;
    this.dom.css("background-position", this.index + "px 0px");
    $("#embers").append(this.dom);
    return this;
  }

  var e = {
    embersList: [],
    emberAlpha: function(m) {
      var nAlpha = 1;
      if(m.scaleX < 2*options.emberSize) {
        nAlpha = (Math.random()*(options.alphaMax-options.alphaMin)+options.alphaMin);
      } else if(m.scaleX > 2*options.emberSize && m.scaleX < 4*options.emberSize) {
        nAlpha = (Math.random()*(options.alphaMax-options.alphaMin)+options.alphaMin)*0.6;
      } else if(m.scaleX > 4*options.emberSize) {
        nAlpha = (Math.random()*(options.alphaMax-options.alphaMin)+options.alphaMin)*0.4;
      }
      return nAlpha;
    },
    emberX: function(m) {
      e.setEmberX(m);
      m.x = m.x+(Math.random()*80-40+windEngine.wind.force)*(m.scaleX);
      m.rotation = Math.random()*options.rotationSpeed*900;

      TweenLite.to(m.dom, Math.random()*2+2, {alpha:e.emberAlpha(m), x:m.x, rotation:m.rotation, onComplete:e.emberX, onCompleteParams:[m], ease:Quad.easeInOut, overwrite:false});
      // TweenLite.fromTo(m.dom, 0.2, {alpha:1}, {delay:1.3, alpha:0})
      TweenLite.to(m.dom, 0.2, {alpha:1});
    },
    emberY: function(m) {
      e.setEmberY(m);
      m.y = m.y+(Math.random()*(options.gravity/2)+(options.gravity/2))*(m.scaleX)*3;
      TweenLite.to(m.dom, Math.random()*2+2, {y:m.y, onComplete:e.emberY, onCompleteParams:[m], ease:Linear.easeInOut, overwrite:false});
    },
    setEmberX: function(m) {
      if (m.x > sw + options.margin) {
        m.x = Math.random() * -options.margin;
        TweenMax.set(m.dom, {x:m.x});
      } else if (m.x < -options.margin) {
        m.x = sw + Math.random() * options.margin;
        TweenMax.set(m.dom, {x:m.x});
      }
    },
    setEmberY: function(m) {
      if (m.y > sh + options.margin) {
        m.y = Math.random() * -options.margin;
        TweenMax.set(m.dom, {y:m.y});
      } else if (m.y < -options.margin) {
        m.y = sh + Math.random() * options.margin;
        TweenMax.set(m.dom, {y:m.y});
      }
    },
    createEmber: function(i) {
      var m = new EmberParticle();
      m.y = sh + Math.random() * - options.margin *2;
      m.x = sw + Math.random() * (sw / 2 + options.margin) - options.margin * 2;
      m.rotation = Math.random() * 360;
      m.depth = Math.random() * (options.zMax*2-options.zMin) + options.zMin;
      m.depth = parseInt(m.depth*100)/100;
      m.scaleX = m.scaleY = Math.max(0.4, (1/(Math.max(0, m.depth))-0.5)*options.emberSize);

      m.alpha = options.fade ? 0 : e.emberAlpha(m);

      TweenLite.set(m.dom, {x:m.x, y:m.y, z:0.01, scaleX: m.scaleX, scaleY: m.scaleY, alpha: m.alpha});

      e.emberX(m);
      e.emberY(m);

      e.embersList.push(m);
    },
    init: function() {
      if (options.emberCount > 999 ||
          options.emberSize > 10 ||
          options.zMin > options.zMax ||
          options.windForceMin > options.windForceMax ||
          options.alphaMin > options.alphaMax ||
          options.windTimeMin > options.windTimeMax) { return false; }

      for (var i=0; i<options.emberCount; ++i) {
        e.createEmber(i);
      }
      return true;
    },
    killEmber: function(m) {
      TweenLite.killTweensOf(m);
      m.remove();
    },
    embersKilled: function() {
      e.embersList = [];
      windEngine.kill();
    }
  }


  var embers = {
    options: options,
    list: function() {return e.embersList},
    init: function() {
      sw = $('.container').width();
      sh = $('.container').height();
      if (e.init()) windEngine.generateWind();
      return this;
    },
    kill: function() {
      for (var i = 0; i < e.embersList.length; ++i) {
        TweenLite.to(e.embersList[i].dom, options.emberKillDelay, {alpha:0, onComplete:e.killEmber, onCompleteParams:[e.embersList[i].dom]});
      }
      TweenLite.delayedCall(options.emberKillDelay, e.embersKilled);
      return this;
    }
  }
  return embers;
})();