'use strict';
////////////////////////////////////

/**
 * Intercooler.js
 *
 * A javascript library for people who don't don't want to write a lot
 * of javascript.
 *
 */
var Intercooler = Intercooler || (function () {

  //--------------------------------------------------
  // Vars
  //--------------------------------------------------

  // Logging constants
  var _DEBUG = 1;
  var _INFO = 2;
  var _WARN = 3;
  var _ERROR = 4;

  var _remote = $;
  var _logger = null;
  var _loggingLevel = null;
  var _loggingGrep = null;

  //============================================================
  // Utility Methods
  //============================================================

  /*
  CryptoJS v3.1.2
  code.google.com/p/crypto-js
  (c) 2009-2013 by Jeff Mott. All rights reserved.
  code.google.com/p/crypto-js/wiki/License
  */
  var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
  n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
  32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
  2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
  k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
  a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
  f)).finalize(b)}}});var s=p.algo={};return p}(Math);
  (function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
  k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();

  function fp(elt) {
    return CryptoJS.SHA1(elt.html()).toString();
  }

  function log(msg, level) {
    var srcLevel = level || _INFO;
    var targetLevel = _loggingLevel || _ERROR;
    if (_logger && (srcLevel >= targetLevel) && (_loggingGrep == null || _loggingGrep.test(msg))) {
      _logger.log(msg);
    }
  }

  function uuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
  }

  function icSelectorFor(elt) {
    return "[ic-id='" + elt.attr("ic-id") + "']";
  }

  function parseInterval(str) {
    log("POLL: Parsing interval string " + str, _DEBUG);
    if (str == "") {
      return 1000;
    } else if (str.lastIndexOf("ms") == str.length - 2) {
      return parseInt(str.substr(0, str.length - 2));
    } else if (str.lastIndexOf("s") == str.length - 1) {
      return parseInt(str.substr(0, str.length - 1)) * 1000;
    } else {
      return 1000;
    }
  }

  // Taken from https://gist.github.com/kares/956897
  function parseParams(str) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decode = function (str) {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    };
    var params = {}, e;
    if (str) {
      if (str.substr(0, 1) == '?') {
        str = str.substr(1);
      }
      while (e = re.exec(str)) {
        var k = decode(e[1]);
        var v = decode(e[2]);
        if (params[k] !== undefined) {
          if (!$.isArray(params[k])) {
            params[k] = [params[k]];
          }
          params[k].push(v);
        } else {
          params[k] = v;
        }
      }
    }
    return params;
  }

  //============================================================
  // Parameter/Include Processing
  //============================================================
  function processInclude(str) {
    if(str.indexOf('$') == 0) {
      return eval(str).serialize();
    } else {
      if(str.indexOf(":")) {
        var name = str.split(":")[0];
        var val = str.split(":")[1];
        return encodeURIComponent(name) + "=" +encodeURIComponent(eval(val));
      } else {
        return "";
      }
    }
  }

  function processIncludes(str) {
    var returnString = "";
    var strs = str.split(','); //TODO handle commas in jquery selectors
    for (var i = 0, l = strs.length; i < l; i++) {
      returnString += "&" + processInclude(strs[i]);
    }
    return returnString;
  }
  function getParametersForElement(elt) {
    var str = "ic-request=true&" + elt.serialize();
    if(elt.attr('ic-id')) {
      str += "&ic-id=" + elt.attr('ic-id');
    }
    if(elt.attr('ic-last-refresh')) {
      str += "&ic-last-refresh=" + elt.attr('ic-last-refresh');
    }
    if(elt.attr('ic-fingerprint')) {
      str += "&ic-fingerprint=" + elt.attr('ic-fingerprint');
    }
    if(elt.attr('ic-include')) {
      str += processIncludes(elt.attr('ic-include'));
    }
    log("PARAMS: Returning parameters " + str + " for ");
    return str;
  }

  //============================================================
  // Tree Processing
  //============================================================

  function maybeSetIntercoolerInfo(elt) {
    if (!elt.data('ic-id')) {
      var eltFingerPrint = fp(elt);
      var icId = uuid();
      var lastRefresh = new Date().getTime();
      elt.attr('ic-id', icId);
      elt.attr('ic-last-refresh', lastRefresh);
      elt.attr('ic-fingerprint', eltFingerPrint);
    }
  }

  function withSourceAttrs(func) {
    var selectors = ['ic-src', 'ic-style-src', 'ic-attr-src'];
    for (var i = 0, l = selectors.length; i < l; i++) {
      func(selectors[i]);
    }
  }

  function processSources(elt) {
    withSourceAttrs(function (attr) {
      if ($(elt).is("[" + attr + "]")) {
        maybeSetIntercoolerInfo($(elt));
      }
      $(elt).find("[" + attr + "]").each(function () {
        maybeSetIntercoolerInfo($(this));
      });
    });
  }

  function startPolling(elt) {
    var interval = parseInterval(elt.attr('ic-poll'));
    var selector = icSelectorFor(elt);
    log("POLL: Starting poll for element " + selector, _DEBUG);
    var timerId = setInterval(function () {
      var target = $(selector);
      if (target.length == 0) {
        log("POLL: Clearing poll for element " + selector, _DEBUG);
        clearTimeout(timerId);
      } else {
        updateElement(target);
      }
    }, interval);
  }

  function processPolling(elt) {
    if ($(elt).is('[ic-poll]')) {
      maybeSetIntercoolerInfo($(elt));
      startPolling(elt);
    }
    $(elt).find('[ic-poll]').each(function () {
      maybeSetIntercoolerInfo($(this));
      startPolling($(this));
    });
  }

  function refreshDependencies(dest) {
    withSourceAttrs(function (attr) {
      $('[' + attr + ']').each(function () {
        if (dest.indexOf($(this).attr('ic-src')) == 0) {
          updateElement($(this));
        } else if ($(this).attr('ic-deps') && dest.indexOf($(this).attr('ic-deps')) == 0) {
          updateElement($(this));
        }
      });
    });
  }

  function initDestination(elt, target) {
    if (!target) {
      target = elt;
    }
    if ($(elt).is('button')) {
      var destinationStr = $(target).attr('ic-dest');
      $(elt).click(function () {
        _remote.post(destinationStr,
          getParametersForElement(elt),
          function () {
          refreshDependencies(destinationStr);
        })
      });
    } else if ($(elt).is('input')) {
      var destinationStr = $(target).attr('ic-dest');
      $(elt).change(function () {
        _remote.post(destinationStr,
          getParametersForElement(elt),
          function (data) {
          processICResponse(data, target);
          refreshDependencies(destinationStr);
        })
      });
    } else {
      initDestination($(elt).find("input"), target);
    }
  }

  function processDestinations(elt) {
    if ($(elt).is('[ic-dest]')) {
      maybeSetIntercoolerInfo($(elt));
      initDestination(elt);
    }
    $(elt).find('[ic-dest]').each(function () {
      maybeSetIntercoolerInfo($(this));
      initDestination($(this));
    });
  }

  function processNodes(elt) {
    processSources(elt);
    processPolling(elt);
    processDestinations(elt);
  }

  function processICResponse(data, elt) {
    if (data != "") {
      log("IC RESPONSE: Received: " + data, _DEBUG);
      var newElt = $(data);
      maybeSetIntercoolerInfo(newElt);
      if (newElt.attr('ic-fingerprint') != $(elt).attr('ic-fingerprint')) {
        if (elt.attr('ic-transition') == "none") {
          elt.replaceWith(newElt);
          processNodes(newElt);
          log("IC RESPONSE: Replacing " + elt.html() + " with " + elt.html(), _DEBUG);
        } else {
          elt.fadeOut('fast', function () {
            newElt.hide();
            elt.replaceWith(newElt);
            log("IC RESPONSE:  Replacing " + elt.html() + " with " + elt.html(), _DEBUG);
            processNodes(newElt);
            newElt.fadeIn('slow');
          });
        }
      } else {
        newElt.remove();
      }
    }
  }

  function updateElement(element) {
    var elt = element;
    if (elt.attr('ic-src')) {
      _remote.get(elt.attr('ic-src'),
        getParametersForElement(elt),
        function (data) {
        processICResponse(data, elt);
      });
    } else if (elt.attr('ic-style-src')) {
      var styleSrc = elt.attr('ic-style-src').split(":");
      _remote.get(styleSrc[1],
        getParametersForElement(elt),
        function (data) {
        elt.css(styleSrc[0], data);
      });
    } else if (elt.attr('ic-attr-src')) {
      var attrSrc = elt.attr('ic-attr-src').split(":");
      _remote.get(attrSrc[1],
        getParametersForElement(elt),
        function (data) {
        elt.attr(attrSrc[0], data);
      });
    }
  }

  /**
   * Process initial nodes
   */
  $(function () {
    processNodes('body');
  });

  /**
   * Public API
   */
  return {

    /* ===================================================
     * Core API
     * =================================================== */

    refresh: function (elt) {
      updateElement(elt);
      return Intercooler;
    },

    /* ===================================================
     * Mock Testing API
     * =================================================== */
    setRemoteProxy: function (remoteProxy) {
      _remote = {
        get : function(path, params, callback) {
          var returnVal = remoteProxy.get && remoteProxy.get(path, parseParams(params));
          if(returnVal) {
            callback(returnVal);
          }
        },
        post : function(path, params, callback) {
          var returnVal = remoteProxy.post && remoteProxy.post(path, parseParams(params));
          if(returnVal) {
            callback(returnVal);
          }
        }
      };
      return Intercooler;
    },

    /* ===================================================
     * Logging API
     * =================================================== */
    setLogger: function (logger, level, grep) {
      _logger = logger;
      if(level) {
        _loggingLevel = level;
      }
      if(grep) {
        _loggingGrep = grep;
      }
      return Intercooler;
    },
    log: function (msg, level) {
      log(msg, level);
      return Intercooler;
    },
    /* LOGGING LEVELS */
    setLogLevel: function (level) {
      _loggingLevel = level;
      return Intercooler;
    },
    logLevels: {
      DEBUG: _DEBUG,
      INFO: _INFO,
      WARNING: _WARN,
      ERROR: _ERROR
    }
  }
})();