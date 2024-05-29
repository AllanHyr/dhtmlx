const H = typeof window < "u" ? window : global;
function Ue(e) {
  function h(o) {
    var t = document.createElement("div");
    return (o || "").split(" ").forEach(function(i) {
      t.classList.add(i);
    }), t;
  }
  var a = { rows_container: function() {
    return h("dhx_cal_navbar_rows_container");
  }, row: function() {
    return h("dhx_cal_navbar_row");
  }, view: function(o) {
    var t = h("dhx_cal_tab");
    return t.setAttribute("name", o.view + "_tab"), t.setAttribute("data-tab", o.view), e.config.fix_tab_position && (o.$firstTab ? t.classList.add("dhx_cal_tab_first") : o.$lastTab ? t.classList.add("dhx_cal_tab_last") : o.view !== "week" && t.classList.add("dhx_cal_tab_standalone"), o.$segmentedTab && t.classList.add("dhx_cal_tab_segmented")), t;
  }, date: function() {
    return h("dhx_cal_date");
  }, button: function(o) {
    return h("dhx_cal_nav_button dhx_cal_nav_button_custom dhx_cal_tab");
  }, builtInButton: function(o) {
    return h("dhx_cal_" + o.view + "_button dhx_cal_nav_button");
  }, spacer: function() {
    return h("dhx_cal_line_spacer");
  }, minicalendarButton: function(o) {
    var t = h("dhx_minical_icon");
    return o.click || t.$_eventAttached || e.event(t, "click", function() {
      e.isCalendarVisible() ? e.destroyCalendar() : e.renderCalendar({ position: this, date: e.getState().date, navigation: !0, handler: function(i, s) {
        e.setCurrentView(i), e.destroyCalendar();
      } });
    }), t;
  }, html_element: function(o) {
    return h("dhx_cal_nav_content");
  } };
  function n(o) {
    var t = function(c) {
      var g;
      if (c.view)
        switch (c.view) {
          case "today":
          case "next":
          case "prev":
            g = a.builtInButton;
            break;
          case "date":
            g = a.date;
            break;
          case "spacer":
            g = a.spacer;
            break;
          case "button":
            g = a.button;
            break;
          case "minicalendar":
            g = a.minicalendarButton;
            break;
          default:
            g = a.view;
        }
      else
        c.rows ? g = a.rows_container : c.cols && (g = a.row);
      return g;
    }(o);
    if (t) {
      var i = t(o);
      if (o.css && i.classList.add(o.css), o.width && ((s = o.width) === 1 * s && (s += "px"), i.style.width = s), o.height && ((s = o.height) === 1 * s && (s += "px"), i.style.height = s), o.click && e.event(i, "click", o.click), o.html && (i.innerHTML = o.html), o.align) {
        var s = "";
        o.align == "right" ? s = "flex-end" : o.align == "left" && (s = "flex-start"), i.style.justifyContent = s;
      }
      return i;
    }
  }
  function _(o) {
    return typeof o == "string" && (o = { view: o }), o.view || o.rows || o.cols || (o.view = "button"), o;
  }
  function r(o) {
    var t, i = document.createDocumentFragment();
    t = Array.isArray(o) ? o : [o];
    for (var s = 0; s < t.length; s++) {
      var c, g = _(t[s]);
      g.view === "day" && t[s + 1] && ((c = _(t[s + 1])).view !== "week" && c.view !== "month" || (g.$firstTab = !0, g.$segmentedTab = !0)), g.view === "week" && t[s - 1] && ((c = _(t[s + 1])).view !== "week" && c.view !== "month" || (g.$segmentedTab = !0)), g.view === "month" && t[s - 1] && ((c = _(t[s - 1])).view !== "week" && c.view !== "day" || (g.$lastTab = !0, g.$segmentedTab = !0));
      var y = n(g);
      i.appendChild(y), (g.cols || g.rows) && y.appendChild(r(g.cols || g.rows));
    }
    return i;
  }
  e._init_nav_bar = function(o) {
    var t = this.$container.querySelector(".dhx_cal_navline");
    return t || ((t = document.createElement("div")).className = "dhx_cal_navline dhx_cal_navline_flex", e._update_nav_bar(o, t), t);
  };
  var l = null;
  e._update_nav_bar = function(o, t) {
    if (o) {
      var i = !1, s = o.height || e.xy.nav_height;
      l !== null && l === s || (i = !0), i && (e.xy.nav_height = s), t.innerHTML = "", t.appendChild(r(o)), e.unset_actions(), e._els = [], e.get_elements(), e.set_actions(), t.style.display = s === 0 ? "none" : "", l = s;
    }
  };
}
function Xe(e) {
  function h(r) {
    for (var l = document.body; r && r != l; )
      r = r.parentNode;
    return l == r;
  }
  function a(r) {
    return { w: r.innerWidth || document.documentElement.clientWidth, h: r.innerHeight || document.documentElement.clientHeight };
  }
  function n(r, l) {
    var o, t = a(l);
    r.event(l, "resize", function() {
      clearTimeout(o), o = setTimeout(function() {
        if (h(r.$container) && !r.$destroyed) {
          var i, s, c = a(l);
          s = c, ((i = t).w != s.w || i.h != s.h) && (t = c, _(r));
        }
      }, 150);
    });
  }
  function _(r) {
    !r.$destroyed && r.$root && h(r.$root) && r.callEvent("onSchedulerResize", []) && (r.updateView(), r.callEvent("onAfterSchedulerResize", []));
  }
  (function(r) {
    var l = r.$container;
    window.getComputedStyle(l).getPropertyValue("position") == "static" && (l.style.position = "relative");
    var o = document.createElement("iframe");
    o.className = "scheduler_container_resize_watcher", o.tabIndex = -1, r.config.wai_aria_attributes && (o.setAttribute("role", "none"), o.setAttribute("aria-hidden", !0)), window.Sfdc || window.$A || window.Aura ? function(t) {
      var i = t.$root.offsetHeight, s = t.$root.offsetWidth;
      (function c() {
        t.$destroyed || (t.$root && (t.$root.offsetHeight == i && t.$root.offsetWidth == s || _(t), i = t.$root.offsetHeight, s = t.$root.offsetWidth), setTimeout(c, 200));
      })();
    }(r) : (l.appendChild(o), o.contentWindow ? n(r, o.contentWindow) : (l.removeChild(o), n(r, window)));
  })(e);
}
class We {
  constructor() {
    this._silent_mode = !1, this.listeners = {};
  }
  _silentStart() {
    this._silent_mode = !0;
  }
  _silentEnd() {
    this._silent_mode = !1;
  }
}
const Ke = function(e) {
  let h = {}, a = 0;
  const n = function() {
    let _ = !0;
    for (const r in h) {
      const l = h[r].apply(e, arguments);
      _ = _ && l;
    }
    return _;
  };
  return n.addEvent = function(_, r) {
    if (typeof _ == "function") {
      let l;
      if (r && r.id ? l = r.id : (l = a, a++), r && r.once) {
        const o = _;
        _ = function() {
          o(), n.removeEvent(l);
        };
      }
      return h[l] = _, l;
    }
    return !1;
  }, n.removeEvent = function(_) {
    delete h[_];
  }, n.clear = function() {
    h = {};
  }, n;
};
function we(e) {
  const h = new We();
  e.attachEvent = function(a, n, _) {
    a = "ev_" + a.toLowerCase(), h.listeners[a] || (h.listeners[a] = Ke(this)), _ && _.thisObject && (n = n.bind(_.thisObject));
    let r = a + ":" + h.listeners[a].addEvent(n, _);
    return _ && _.id && (r = _.id), r;
  }, e.attachAll = function(a) {
    this.attachEvent("listen_all", a);
  }, e.callEvent = function(a, n) {
    if (h._silent_mode)
      return !0;
    const _ = "ev_" + a.toLowerCase(), r = h.listeners;
    return r.ev_listen_all && r.ev_listen_all.apply(this, [a].concat(n)), !r[_] || r[_].apply(this, n);
  }, e.checkEvent = function(a) {
    return !!h.listeners["ev_" + a.toLowerCase()];
  }, e.detachEvent = function(a) {
    if (a) {
      let n = h.listeners;
      for (const r in n)
        n[r].removeEvent(a);
      const _ = a.split(":");
      if (n = h.listeners, _.length === 2) {
        const r = _[0], l = _[1];
        n[r] && n[r].removeEvent(l);
      }
    }
  }, e.detachAllEvents = function() {
    for (const a in h.listeners)
      h.listeners[a].clear();
  };
}
const He = { event: function(e, h, a) {
  e.addEventListener ? e.addEventListener(h, a, !1) : e.attachEvent && e.attachEvent("on" + h, a);
}, eventRemove: function(e, h, a) {
  e.removeEventListener ? e.removeEventListener(h, a, !1) : e.detachEvent && e.detachEvent("on" + h, a);
} };
function Ge(e) {
  var h = function() {
    var a = function(n, _) {
      n = n || He.event, _ = _ || He.eventRemove;
      var r = [], l = { attach: function(o, t, i, s) {
        r.push({ element: o, event: t, callback: i, capture: s }), n(o, t, i, s);
      }, detach: function(o, t, i, s) {
        _(o, t, i, s);
        for (var c = 0; c < r.length; c++) {
          var g = r[c];
          g.element === o && g.event === t && g.callback === i && g.capture === s && (r.splice(c, 1), c--);
        }
      }, detachAll: function() {
        for (var o = r.slice(), t = 0; t < o.length; t++) {
          var i = o[t];
          l.detach(i.element, i.event, i.callback, i.capture), l.detach(i.element, i.event, i.callback, void 0), l.detach(i.element, i.event, i.callback, !1), l.detach(i.element, i.event, i.callback, !0);
        }
        r.splice(0, r.length);
      }, extend: function() {
        return a(this.event, this.eventRemove);
      } };
      return l;
    };
    return a();
  }();
  e.event = h.attach, e.eventRemove = h.detach, e._eventRemoveAll = h.detachAll, e._createDomEventScope = h.extend, e._trim = function(a) {
    return (String.prototype.trim || function() {
      return this.replace(/^\s+|\s+$/g, "");
    }).apply(a);
  }, e._isDate = function(a) {
    return !(!a || typeof a != "object") && !!(a.getFullYear && a.getMonth && a.getDate);
  }, e._isObject = function(a) {
    return a && typeof a == "object";
  };
}
var Ze = Date.now();
function Ee(e) {
  return !(!e || typeof e != "object") && !!(e.getFullYear && e.getMonth && e.getDate);
}
const ie = { uid: function() {
  return Ze++;
}, mixin: function(e, h, a) {
  for (var n in h)
    (e[n] === void 0 || a) && (e[n] = h[n]);
  return e;
}, copy: function e(h) {
  var a, n, _;
  if (h && typeof h == "object")
    switch (!0) {
      case Ee(h):
        n = new Date(h);
        break;
      case (_ = h, Array.isArray ? Array.isArray(_) : _ && _.length !== void 0 && _.pop && _.push):
        for (n = new Array(h.length), a = 0; a < h.length; a++)
          n[a] = e(h[a]);
        break;
      case function(r) {
        return r && typeof r == "object" && Function.prototype.toString.call(r.constructor) === "function String() { [native code] }";
      }(h):
        n = new String(h);
        break;
      case function(r) {
        return r && typeof r == "object" && Function.prototype.toString.call(r.constructor) === "function Number() { [native code] }";
      }(h):
        n = new Number(h);
        break;
      case function(r) {
        return r && typeof r == "object" && Function.prototype.toString.call(r.constructor) === "function Boolean() { [native code] }";
      }(h):
        n = new Boolean(h);
        break;
      default:
        for (a in n = {}, h) {
          const r = typeof h[a];
          r === "string" || r === "number" || r === "boolean" ? n[a] = h[a] : Ee(h[a]) ? n[a] = new Date(h[a]) : Object.prototype.hasOwnProperty.apply(h, [a]) && (n[a] = e(h[a]));
        }
    }
  return n || h;
}, defined: function(e) {
  return e !== void 0;
}, isDate: Ee, delay: function(e, h) {
  var a, n = function() {
    n.$cancelTimeout(), n.$pending = !0;
    var _ = Array.prototype.slice.call(arguments);
    a = setTimeout(function() {
      e.apply(this, _), n.$pending = !1;
    }, h);
  };
  return n.$pending = !1, n.$cancelTimeout = function() {
    clearTimeout(a), n.$pending = !1;
  }, n.$execute = function() {
    var _ = Array.prototype.slice.call(arguments);
    e.apply(this, _), n.$cancelTimeout();
  }, n;
} };
function Ve(e) {
  if (!e)
    return "";
  var h = e.className || "";
  return h.baseVal && (h = h.baseVal), h.indexOf || (h = ""), h || "";
}
function Ie(e, h, a) {
  a === void 0 && (a = !0);
  for (var n = e.target || e.srcElement, _ = ""; n; ) {
    if (_ = Ve(n)) {
      var r = _.indexOf(h);
      if (r >= 0) {
        if (!a)
          return n;
        var l = r === 0 || !(_.charAt(r - 1) || "").trim(), o = r + h.length >= _.length || !_.charAt(r + h.length).trim();
        if (l && o)
          return n;
      }
    }
    n = n.parentNode;
  }
  return null;
}
function Qe(e) {
  var h = !1, a = !1;
  if (window.getComputedStyle) {
    var n = window.getComputedStyle(e, null);
    h = n.display, a = n.visibility;
  } else
    e.currentStyle && (h = e.currentStyle.display, a = e.currentStyle.visibility);
  var _ = !1, r = Ie({ target: e }, "dhx_form_repeat", !1);
  return r && (_ = r.style.height == "0px"), _ = _ || !e.offsetHeight, h != "none" && a != "hidden" && !_;
}
function et(e) {
  return !isNaN(e.getAttribute("tabindex")) && 1 * e.getAttribute("tabindex") >= 0;
}
function tt(e) {
  return !{ a: !0, area: !0 }[e.nodeName.loLowerCase()] || !!e.getAttribute("href");
}
function at(e) {
  return !{ input: !0, select: !0, textarea: !0, button: !0, object: !0 }[e.nodeName.toLowerCase()] || !e.hasAttribute("disabled");
}
function Re() {
  return document.head.createShadowRoot || document.head.attachShadow;
}
function $e(e) {
  if (!e || !Re())
    return document.body;
  for (; e.parentNode && (e = e.parentNode); )
    if (e instanceof ShadowRoot)
      return e.host;
  return document.body;
}
const le = { getAbsoluteLeft: function(e) {
  return this.getOffset(e).left;
}, getAbsoluteTop: function(e) {
  return this.getOffset(e).top;
}, getOffsetSum: function(e) {
  for (var h = 0, a = 0; e; )
    h += parseInt(e.offsetTop), a += parseInt(e.offsetLeft), e = e.offsetParent;
  return { top: h, left: a };
}, getOffsetRect: function(e) {
  var h = e.getBoundingClientRect(), a = 0, n = 0;
  if (/Mobi/.test(navigator.userAgent)) {
    var _ = document.createElement("div");
    _.style.position = "absolute", _.style.left = "0px", _.style.top = "0px", _.style.width = "1px", _.style.height = "1px", document.body.appendChild(_);
    var r = _.getBoundingClientRect();
    a = h.top - r.top, n = h.left - r.left, _.parentNode.removeChild(_);
  } else {
    var l = document.body, o = document.documentElement, t = window.pageYOffset || o.scrollTop || l.scrollTop, i = window.pageXOffset || o.scrollLeft || l.scrollLeft, s = o.clientTop || l.clientTop || 0, c = o.clientLeft || l.clientLeft || 0;
    a = h.top + t - s, n = h.left + i - c;
  }
  return { top: Math.round(a), left: Math.round(n) };
}, getOffset: function(e) {
  return e.getBoundingClientRect ? this.getOffsetRect(e) : this.getOffsetSum(e);
}, closest: function(e, h) {
  return e && h ? Se(e, h) : null;
}, insertAfter: function(e, h) {
  h.nextSibling ? h.parentNode.insertBefore(e, h.nextSibling) : h.parentNode.appendChild(e);
}, remove: function(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}, isChildOf: function(e, h) {
  return h.contains(e);
}, getFocusableNodes: function(e) {
  for (var h = e.querySelectorAll(["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"].join(", ")), a = Array.prototype.slice.call(h, 0), n = 0; n < a.length; n++)
    a[n].$position = n;
  for (a.sort(function(r, l) {
    return r.tabIndex === 0 && l.tabIndex !== 0 ? 1 : r.tabIndex !== 0 && l.tabIndex === 0 ? -1 : r.tabIndex === l.tabIndex ? r.$position - l.$position : r.tabIndex < l.tabIndex ? -1 : 1;
  }), n = 0; n < a.length; n++) {
    var _ = a[n];
    (et(_) || at(_) || tt(_)) && Qe(_) || (a.splice(n, 1), n--);
  }
  return a;
}, getClassName: Ve, locateCss: Ie, getRootNode: $e, hasShadowParent: function(e) {
  return !!$e(e);
}, isShadowDomSupported: Re, getActiveElement: function() {
  var e = document.activeElement;
  return e.shadowRoot && (e = e.shadowRoot.activeElement), e === document.body && document.getSelection && (e = document.getSelection().focusNode || document.body), e;
}, getRelativeEventPosition: function(e, h) {
  var a = document.documentElement, n = function(_) {
    var r = 0, l = 0, o = 0, t = 0;
    if (_.getBoundingClientRect) {
      var i = _.getBoundingClientRect(), s = document.body, c = document.documentElement || document.body.parentNode || document.body, g = window.pageYOffset || c.scrollTop || s.scrollTop, y = window.pageXOffset || c.scrollLeft || s.scrollLeft, m = c.clientTop || s.clientTop || 0, u = c.clientLeft || s.clientLeft || 0;
      r = i.top + g - m, l = i.left + y - u, o = document.body.offsetWidth - i.right, t = document.body.offsetHeight - i.bottom;
    } else {
      for (; _; )
        r += parseInt(_.offsetTop, 10), l += parseInt(_.offsetLeft, 10), _ = _.offsetParent;
      o = document.body.offsetWidth - _.offsetWidth - l, t = document.body.offsetHeight - _.offsetHeight - r;
    }
    return { y: Math.round(r), x: Math.round(l), width: _.offsetWidth, height: _.offsetHeight, right: Math.round(o), bottom: Math.round(t) };
  }(h);
  return { x: e.clientX + a.scrollLeft - a.clientLeft - n.x + h.scrollLeft, y: e.clientY + a.scrollTop - a.clientTop - n.y + h.scrollTop };
}, getTargetNode: function(e) {
  var h;
  return e.tagName ? h = e : (h = (e = e || window.event).target || e.srcElement).shadowRoot && e.composedPath && (h = e.composedPath()[0]), h;
}, getNodePosition: function(e) {
  var h = 0, a = 0, n = 0, _ = 0;
  if (e.getBoundingClientRect) {
    var r = e.getBoundingClientRect(), l = document.body, o = document.documentElement || document.body.parentNode || document.body, t = window.pageYOffset || o.scrollTop || l.scrollTop, i = window.pageXOffset || o.scrollLeft || l.scrollLeft, s = o.clientTop || l.clientTop || 0, c = o.clientLeft || l.clientLeft || 0;
    h = r.top + t - s, a = r.left + i - c, n = document.body.offsetWidth - r.right, _ = document.body.offsetHeight - r.bottom;
  } else {
    for (; e; )
      h += parseInt(e.offsetTop, 10), a += parseInt(e.offsetLeft, 10), e = e.offsetParent;
    n = document.body.offsetWidth - e.offsetWidth - a, _ = document.body.offsetHeight - e.offsetHeight - h;
  }
  return { y: Math.round(h), x: Math.round(a), width: e.offsetWidth, height: e.offsetHeight, right: Math.round(n), bottom: Math.round(_) };
} };
var Se;
if (Element.prototype.closest)
  Se = function(e, h) {
    return e.closest(h);
  };
else {
  var nt = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  Se = function(e, h) {
    var a = e;
    do {
      if (nt.call(a, h))
        return a;
      a = a.parentElement || a.parentNode;
    } while (a !== null && a.nodeType === 1);
    return null;
  };
}
var de = typeof window < "u";
const it = { isIE: de && (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0), isOpera: de && navigator.userAgent.indexOf("Opera") >= 0, isChrome: de && navigator.userAgent.indexOf("Chrome") >= 0, isKHTML: de && (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0), isFF: de && navigator.userAgent.indexOf("Firefox") >= 0, isIPad: de && navigator.userAgent.search(/iPad/gi) >= 0, isEdge: de && navigator.userAgent.indexOf("Edge") != -1, isNode: !de || typeof navigator > "u" };
function De(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  var h = "";
  for (var a in e) {
    var n = "";
    e.hasOwnProperty(a) && (n = a + "=" + (n = typeof e[a] == "string" ? encodeURIComponent(e[a]) : typeof e[a] == "number" ? e[a] : encodeURIComponent(JSON.stringify(e[a]))), h.length && (n = "&" + n), h += n);
  }
  return h;
}
function rt(e) {
  var h = function(r, l) {
    for (var o = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);", t = r.match(/%[a-zA-Z]/g), i = 0; i < t.length; i++)
      switch (t[i]) {
        case "%j":
        case "%d":
          o += "set[2]=temp[" + i + "]||1;";
          break;
        case "%n":
        case "%m":
          o += "set[1]=(temp[" + i + "]||1)-1;";
          break;
        case "%y":
          o += "set[0]=temp[" + i + "]*1+(temp[" + i + "]>50?1900:2000);";
          break;
        case "%g":
        case "%G":
        case "%h":
        case "%H":
          o += "set[3]=temp[" + i + "]||0;";
          break;
        case "%i":
          o += "set[4]=temp[" + i + "]||0;";
          break;
        case "%Y":
          o += "set[0]=temp[" + i + "]||0;";
          break;
        case "%a":
        case "%A":
          o += "set[3]=set[3]%12+((temp[" + i + "]||'').toLowerCase()=='am'?0:12);";
          break;
        case "%s":
          o += "set[5]=temp[" + i + "]||0;";
          break;
        case "%M":
          o += "set[1]=this.locale.date.month_short_hash[temp[" + i + "]]||0;";
          break;
        case "%F":
          o += "set[1]=this.locale.date.month_full_hash[temp[" + i + "]]||0;";
      }
    var s = "set[0],set[1],set[2],set[3],set[4],set[5]";
    return l && (s = " Date.UTC(" + s + ")"), new Function("date", "var set=[0,0,1,0,0,0]; " + o + " return new Date(" + s + ");");
  }, a = function(r, l) {
    const o = r.match(/%[a-zA-Z]/g);
    return function(t) {
      for (var i = [0, 0, 1, 0, 0, 0], s = t.match(/[a-zA-Z]+|[0-9]+/g), c = 0; c < o.length; c++)
        switch (o[c]) {
          case "%j":
          case "%d":
            i[2] = s[c] || 1;
            break;
          case "%n":
          case "%m":
            i[1] = (s[c] || 1) - 1;
            break;
          case "%y":
            i[0] = 1 * s[c] + (s[c] > 50 ? 1900 : 2e3);
            break;
          case "%g":
          case "%G":
          case "%h":
          case "%H":
            i[3] = s[c] || 0;
            break;
          case "%i":
            i[4] = s[c] || 0;
            break;
          case "%Y":
            i[0] = s[c] || 0;
            break;
          case "%a":
          case "%A":
            i[3] = i[3] % 12 + ((s[c] || "").toLowerCase() == "am" ? 0 : 12);
            break;
          case "%s":
            i[5] = s[c] || 0;
            break;
          case "%M":
            i[1] = e.locale.date.month_short_hash[s[c]] || 0;
            break;
          case "%F":
            i[1] = e.locale.date.month_full_hash[s[c]] || 0;
        }
      return l ? new Date(Date.UTC(i[0], i[1], i[2], i[3], i[4], i[5])) : new Date(i[0], i[1], i[2], i[3], i[4], i[5]);
    };
  };
  let n;
  function _() {
    var r = !1;
    return e.config.csp === "auto" ? (n === void 0 && (n = function() {
      try {
        new Function("cspEnabled = false;"), n = !1;
      } catch {
        n = !0;
      }
      return n;
    }()), r = n) : r = e.config.csp, r;
  }
  e.date = { init: function() {
    for (var r = e.locale.date.month_short, l = e.locale.date.month_short_hash = {}, o = 0; o < r.length; o++)
      l[r[o]] = o;
    for (r = e.locale.date.month_full, l = e.locale.date.month_full_hash = {}, o = 0; o < r.length; o++)
      l[r[o]] = o;
  }, date_part: function(r) {
    var l = new Date(r);
    return r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0), r.getHours() && (r.getDate() < l.getDate() || r.getMonth() < l.getMonth() || r.getFullYear() < l.getFullYear()) && r.setTime(r.getTime() + 36e5 * (24 - r.getHours())), r;
  }, time_part: function(r) {
    return (r.valueOf() / 1e3 - 60 * r.getTimezoneOffset()) % 86400;
  }, week_start: function(r) {
    var l = r.getDay();
    return e.config.start_on_monday && (l === 0 ? l = 6 : l--), this.date_part(this.add(r, -1 * l, "day"));
  }, month_start: function(r) {
    return r.setDate(1), this.date_part(r);
  }, year_start: function(r) {
    return r.setMonth(0), this.month_start(r);
  }, day_start: function(r) {
    return this.date_part(r);
  }, _add_days: function(r, l) {
    var o = new Date(r.valueOf());
    if (o.setDate(o.getDate() + l), l == Math.round(l) && l > 0) {
      var t = (+o - +r) % 864e5;
      if (t && r.getTimezoneOffset() == o.getTimezoneOffset()) {
        var i = t / 36e5;
        o.setTime(o.getTime() + 60 * (24 - i) * 60 * 1e3);
      }
    }
    return l >= 0 && !r.getHours() && o.getHours() && (o.getDate() < r.getDate() || o.getMonth() < r.getMonth() || o.getFullYear() < r.getFullYear()) && o.setTime(o.getTime() + 36e5 * (24 - o.getHours())), o;
  }, add: function(r, l, o) {
    var t = new Date(r.valueOf());
    switch (o) {
      case "day":
        t = e.date._add_days(t, l);
        break;
      case "week":
        t = e.date._add_days(t, 7 * l);
        break;
      case "month":
        t.setMonth(t.getMonth() + l);
        break;
      case "year":
        t.setYear(t.getFullYear() + l);
        break;
      case "hour":
        t.setTime(t.getTime() + 60 * l * 60 * 1e3);
        break;
      case "minute":
        t.setTime(t.getTime() + 60 * l * 1e3);
        break;
      default:
        return e.date["add_" + o](r, l, o);
    }
    return t;
  }, to_fixed: function(r) {
    return r < 10 ? "0" + r : r;
  }, copy: function(r) {
    return new Date(r.valueOf());
  }, date_to_str: function(r, l) {
    return _() ? function(o, t) {
      return function(i) {
        return o.replace(/%[a-zA-Z]/g, function(s) {
          switch (s) {
            case "%d":
              return t ? e.date.to_fixed(i.getUTCDate()) : e.date.to_fixed(i.getDate());
            case "%m":
              return t ? e.date.to_fixed(i.getUTCMonth() + 1) : e.date.to_fixed(i.getMonth() + 1);
            case "%j":
              return t ? i.getUTCDate() : i.getDate();
            case "%n":
              return t ? i.getUTCMonth() + 1 : i.getMonth() + 1;
            case "%y":
              return t ? e.date.to_fixed(i.getUTCFullYear() % 100) : e.date.to_fixed(i.getFullYear() % 100);
            case "%Y":
              return t ? i.getUTCFullYear() : i.getFullYear();
            case "%D":
              return t ? e.locale.date.day_short[i.getUTCDay()] : e.locale.date.day_short[i.getDay()];
            case "%l":
              return t ? e.locale.date.day_full[i.getUTCDay()] : e.locale.date.day_full[i.getDay()];
            case "%M":
              return t ? e.locale.date.month_short[i.getUTCMonth()] : e.locale.date.month_short[i.getMonth()];
            case "%F":
              return t ? e.locale.date.month_full[i.getUTCMonth()] : e.locale.date.month_full[i.getMonth()];
            case "%h":
              return t ? e.date.to_fixed((i.getUTCHours() + 11) % 12 + 1) : e.date.to_fixed((i.getHours() + 11) % 12 + 1);
            case "%g":
              return t ? (i.getUTCHours() + 11) % 12 + 1 : (i.getHours() + 11) % 12 + 1;
            case "%G":
              return t ? i.getUTCHours() : i.getHours();
            case "%H":
              return t ? e.date.to_fixed(i.getUTCHours()) : e.date.to_fixed(i.getHours());
            case "%i":
              return t ? e.date.to_fixed(i.getUTCMinutes()) : e.date.to_fixed(i.getMinutes());
            case "%a":
              return t ? i.getUTCHours() > 11 ? "pm" : "am" : i.getHours() > 11 ? "pm" : "am";
            case "%A":
              return t ? i.getUTCHours() > 11 ? "PM" : "AM" : i.getHours() > 11 ? "PM" : "AM";
            case "%s":
              return t ? e.date.to_fixed(i.getUTCSeconds()) : e.date.to_fixed(i.getSeconds());
            case "%W":
              return t ? e.date.to_fixed(e.date.getUTCISOWeek(i)) : e.date.to_fixed(e.date.getISOWeek(i));
            default:
              return s;
          }
        });
      };
    }(r, l) : (r = r.replace(/%[a-zA-Z]/g, function(o) {
      switch (o) {
        case "%d":
          return '"+this.date.to_fixed(date.getDate())+"';
        case "%m":
          return '"+this.date.to_fixed((date.getMonth()+1))+"';
        case "%j":
          return '"+date.getDate()+"';
        case "%n":
          return '"+(date.getMonth()+1)+"';
        case "%y":
          return '"+this.date.to_fixed(date.getFullYear()%100)+"';
        case "%Y":
          return '"+date.getFullYear()+"';
        case "%D":
          return '"+this.locale.date.day_short[date.getDay()]+"';
        case "%l":
          return '"+this.locale.date.day_full[date.getDay()]+"';
        case "%M":
          return '"+this.locale.date.month_short[date.getMonth()]+"';
        case "%F":
          return '"+this.locale.date.month_full[date.getMonth()]+"';
        case "%h":
          return '"+this.date.to_fixed((date.getHours()+11)%12+1)+"';
        case "%g":
          return '"+((date.getHours()+11)%12+1)+"';
        case "%G":
          return '"+date.getHours()+"';
        case "%H":
          return '"+this.date.to_fixed(date.getHours())+"';
        case "%i":
          return '"+this.date.to_fixed(date.getMinutes())+"';
        case "%a":
          return '"+(date.getHours()>11?"pm":"am")+"';
        case "%A":
          return '"+(date.getHours()>11?"PM":"AM")+"';
        case "%s":
          return '"+this.date.to_fixed(date.getSeconds())+"';
        case "%W":
          return '"+this.date.to_fixed(this.date.getISOWeek(date))+"';
        default:
          return o;
      }
    }), l && (r = r.replace(/date\.get/g, "date.getUTC")), new Function("date", 'return "' + r + '";').bind(e));
  }, str_to_date: function(r, l, o) {
    var t = _() ? a : h, i = t(r, l), s = /^[0-9]{4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/, c = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4} ?(([0-9]{1,2}:[0-9]{2})(:[0-9]{1,2})?)?$/, g = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/, y = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/, m = t("%Y-%m-%d %H:%i:%s", l), u = t("%m/%d/%Y %H:%i:%s", l), p = t("%d-%m-%Y %H:%i:%s", l);
    return function(d) {
      if (!o && !e.config.parse_exact_format) {
        if (d && d.getISOWeek)
          return new Date(d);
        if (typeof d == "number")
          return new Date(d);
        if (f = d, s.test(String(f)))
          return m(d);
        if (function(v) {
          return c.test(String(v));
        }(d))
          return u(d);
        if (function(v) {
          return g.test(String(v));
        }(d))
          return p(d);
        if (function(v) {
          return y.test(v);
        }(d))
          return new Date(d);
      }
      var f;
      return i.call(e, d);
    };
  }, getISOWeek: function(r) {
    if (!r)
      return !1;
    var l = (r = this.date_part(new Date(r))).getDay();
    l === 0 && (l = 7);
    var o = new Date(r.valueOf());
    o.setDate(r.getDate() + (4 - l));
    var t = o.getFullYear(), i = Math.round((o.getTime() - new Date(t, 0, 1).getTime()) / 864e5);
    return 1 + Math.floor(i / 7);
  }, getUTCISOWeek: function(r) {
    return this.getISOWeek(this.convert_to_utc(r));
  }, convert_to_utc: function(r) {
    return new Date(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate(), r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds());
  } };
}
function Be(e) {
  return (function() {
    var h = {};
    for (var a in this._events) {
      var n = this._events[a];
      n.id.toString().indexOf("#") == -1 && (h[n.id] = n);
    }
    return h;
  }).bind(e);
}
function ot(e) {
  e._loaded = {}, e._load = function(a, n) {
    if (a = a || this._load_url) {
      var _;
      if (a += (a.indexOf("?") == -1 ? "?" : "&") + "timeshift=" + (/* @__PURE__ */ new Date()).getTimezoneOffset(), this.config.prevent_cache && (a += "&uid=" + this.uid()), n = n || this._date, this._load_mode) {
        var r = this.templates.load_format;
        for (n = this.date[this._load_mode + "_start"](new Date(n.valueOf())); n > this._min_date; )
          n = this.date.add(n, -1, this._load_mode);
        _ = n;
        for (var l = !0; _ < this._max_date; )
          _ = this.date.add(_, 1, this._load_mode), this._loaded[r(n)] && l ? n = this.date.add(n, 1, this._load_mode) : l = !1;
        var o = _;
        do
          _ = o, o = this.date.add(_, -1, this._load_mode);
        while (o > n && this._loaded[r(o)]);
        if (_ <= n)
          return !1;
        for (e.ajax.get(a + "&from=" + r(n) + "&to=" + r(_), t); n < _; )
          this._loaded[r(n)] = !0, n = this.date.add(n, 1, this._load_mode);
      } else
        e.ajax.get(a, t);
      return this.callEvent("onXLS", []), this.callEvent("onLoadStart", []), !0;
    }
    function t(i) {
      e.on_load(i), e.callEvent("onLoadEnd", []);
    }
  }, e._parsers = {}, function(a) {
    a._parsers.xml = { canParse: function(n, _) {
      if (_.responseXML && _.responseXML.firstChild)
        return !0;
      try {
        var r = a.ajax.parse(_.responseText), l = a.ajax.xmltop("data", r);
        if (l && l.tagName === "data")
          return !0;
      } catch {
      }
      return !1;
    }, parse: function(n) {
      var _;
      if (n.xmlDoc.responseXML || (n.xmlDoc.responseXML = a.ajax.parse(n.xmlDoc.responseText)), (_ = a.ajax.xmltop("data", n.xmlDoc)).tagName != "data")
        return null;
      var r = _.getAttribute("dhx_security");
      r && (window.dhtmlx && (window.dhtmlx.security_key = r), a.security_key = r);
      for (var l = a.ajax.xpath("//coll_options", n.xmlDoc), o = 0; o < l.length; o++) {
        var t = l[o].getAttribute("for"), i = a.serverList[t];
        i || (a.serverList[t] = i = []), i.splice(0, i.length);
        for (var s = a.ajax.xpath(".//item", l[o]), c = 0; c < s.length; c++) {
          for (var g = s[c].attributes, y = { key: s[c].getAttribute("value"), label: s[c].getAttribute("label") }, m = 0; m < g.length; m++) {
            var u = g[m];
            u.nodeName != "value" && u.nodeName != "label" && (y[u.nodeName] = u.nodeValue);
          }
          i.push(y);
        }
      }
      l.length && a.callEvent("onOptionsLoad", []);
      var p = a.ajax.xpath("//userdata", n.xmlDoc);
      for (o = 0; o < p.length; o++) {
        var d = a._xmlNodeToJSON(p[o]);
        a._userdata[d.name] = d.text;
      }
      var f = [];
      for (_ = a.ajax.xpath("//event", n.xmlDoc), o = 0; o < _.length; o++) {
        var v = f[o] = a._xmlNodeToJSON(_[o]);
        a._init_event(v);
      }
      return f;
    } };
  }(e), function(a) {
    a.json = a._parsers.json = { canParse: function(n) {
      if (n && typeof n == "object")
        return !0;
      if (typeof n == "string")
        try {
          var _ = JSON.parse(n);
          return Object.prototype.toString.call(_) === "[object Object]" || Object.prototype.toString.call(_) === "[object Array]";
        } catch {
          return !1;
        }
      return !1;
    }, parse: function(n) {
      var _ = [];
      typeof n == "string" && (n = JSON.parse(n)), Object.prototype.toString.call(n) === "[object Array]" ? _ = n : n && (n.events ? _ = n.events : n.data && (_ = n.data)), _ = _ || [], n.dhx_security && (window.dhtmlx && (window.dhtmlx.security_key = n.dhx_security), a.security_key = n.dhx_security);
      var r = n && n.collections ? n.collections : {}, l = !1;
      for (var o in r)
        if (r.hasOwnProperty(o)) {
          l = !0;
          var t = r[o], i = a.serverList[o];
          i || (a.serverList[o] = i = []), i.splice(0, i.length);
          for (var s = 0; s < t.length; s++) {
            var c = t[s], g = { key: c.value, label: c.label };
            for (var y in c)
              if (c.hasOwnProperty(y)) {
                if (y == "value" || y == "label")
                  continue;
                g[y] = c[y];
              }
            i.push(g);
          }
        }
      l && a.callEvent("onOptionsLoad", []);
      for (var m = [], u = 0; u < _.length; u++) {
        var p = _[u];
        a._init_event(p), m.push(p);
      }
      return m;
    } };
  }(e), function(a) {
    a.ical = a._parsers.ical = { canParse: function(n) {
      return typeof n == "string" && new RegExp("^BEGIN:VCALENDAR").test(n);
    }, parse: function(n) {
      var _ = n.match(RegExp(this.c_start + "[^\f]*" + this.c_end, ""));
      if (_.length) {
        _[0] = _[0].replace(/[\r\n]+ /g, ""), _[0] = _[0].replace(/[\r\n]+(?=[a-z \t])/g, " "), _[0] = _[0].replace(/;[^:\r\n]*:/g, ":");
        for (var r, l = [], o = RegExp("(?:" + this.e_start + ")([^\f]*?)(?:" + this.e_end + ")", "g"); (r = o.exec(_)) !== null; ) {
          for (var t, i = {}, s = /[^\r\n]+[\r\n]+/g; (t = s.exec(r[1])) !== null; )
            this.parse_param(t.toString(), i);
          i.uid && !i.id && (i.id = i.uid), l.push(i);
        }
        return l;
      }
    }, parse_param: function(n, _) {
      var r = n.indexOf(":");
      if (r != -1) {
        var l = n.substr(0, r).toLowerCase(), o = n.substr(r + 1).replace(/\\,/g, ",").replace(/[\r\n]+$/, "");
        l == "summary" ? l = "text" : l == "dtstart" ? (l = "start_date", o = this.parse_date(o, 0, 0)) : l == "dtend" && (l = "end_date", o = this.parse_date(o, 0, 0)), _[l] = o;
      }
    }, parse_date: function(n, _, r) {
      var l = n.split("T"), o = !1;
      l[1] && (_ = l[1].substr(0, 2), r = l[1].substr(2, 2), o = l[1][6] == "Z");
      var t = l[0].substr(0, 4), i = parseInt(l[0].substr(4, 2), 10) - 1, s = l[0].substr(6, 2);
      return a.config.server_utc || o ? new Date(Date.UTC(t, i, s, _, r)) : new Date(t, i, s, _, r);
    }, c_start: "BEGIN:VCALENDAR", e_start: "BEGIN:VEVENT", e_end: "END:VEVENT", c_end: "END:VCALENDAR" };
  }(e), e.on_load = function(a) {
    var n;
    this.callEvent("onBeforeParse", []);
    var _ = !1, r = !1;
    for (var l in this._parsers) {
      var o = this._parsers[l];
      if (o.canParse(a.xmlDoc.responseText, a.xmlDoc)) {
        try {
          var t = a.xmlDoc.responseText;
          l === "xml" && (t = a), (n = o.parse(t)) || (_ = !0);
        } catch {
          _ = !0;
        }
        r = !0;
        break;
      }
    }
    if (!r)
      if (this._process && this[this._process])
        try {
          n = this[this._process].parse(a.xmlDoc.responseText);
        } catch {
          _ = !0;
        }
      else
        _ = !0;
    (_ || a.xmlDoc.status && a.xmlDoc.status >= 400) && (this.callEvent("onLoadError", [a.xmlDoc]), n = []), this._process_loading(n), this.callEvent("onXLE", []), this.callEvent("onParse", []);
  }, e._process_loading = function(a) {
    this._loading = !0, this._not_render = !0;
    for (var n = 0; n < a.length; n++)
      this.callEvent("onEventLoading", [a[n]]) && this.addEvent(a[n]);
    this._not_render = !1, this._render_wait && this.render_view_data(), this._loading = !1, this._after_call && this._after_call(), this._after_call = null;
  }, e._init_event = function(a) {
    a.text = a.text || a._tagvalue || "", a.start_date = e._init_date(a.start_date), a.end_date = e._init_date(a.end_date);
  }, e._init_date = function(a) {
    return a ? typeof a == "string" ? e._helpers.parseDate(a) : new Date(a) : null;
  };
  const h = Be(e);
  e.serialize = function() {
    const a = [], n = h();
    for (var _ in n) {
      const o = {};
      var r = n[_];
      for (var l in r) {
        if (l.charAt(0) == "$" || l.charAt(0) == "_")
          continue;
        let t;
        const i = r[l];
        t = e.utils.isDate(i) ? e.defined(e.templates.xml_format) ? e.templates.xml_format(i) : e.templates.format_date(i) : i, o[l] = t;
      }
      a.push(o);
    }
    return a;
  }, e.parse = function(a, n) {
    this._process = n, this.on_load({ xmlDoc: { responseText: a } });
  }, e.load = function(a, n) {
    typeof n == "string" && (this._process = n, n = arguments[2]), this._load_url = a, this._after_call = n, this._load(a, this._date);
  }, e.setLoadMode = function(a) {
    a == "all" && (a = ""), this._load_mode = a;
  }, e.serverList = function(a, n) {
    return n ? (this.serverList[a] = n.slice(0), this.serverList[a]) : (this.serverList[a] = this.serverList[a] || [], this.serverList[a]);
  }, e._userdata = {}, e._xmlNodeToJSON = function(a) {
    for (var n = {}, _ = 0; _ < a.attributes.length; _++)
      n[a.attributes[_].name] = a.attributes[_].value;
    for (_ = 0; _ < a.childNodes.length; _++) {
      var r = a.childNodes[_];
      r.nodeType == 1 && (n[r.tagName] = r.firstChild ? r.firstChild.nodeValue : "");
    }
    return n.text || (n.text = a.firstChild ? a.firstChild.nodeValue : ""), n;
  }, e.attachEvent("onXLS", function() {
    var a;
    this.config.show_loading === !0 && ((a = this.config.show_loading = document.createElement("div")).className = "dhx_loading", a.style.left = Math.round((this._x - 128) / 2) + "px", a.style.top = Math.round((this._y - 15) / 2) + "px", this._obj.appendChild(a));
  }), e.attachEvent("onXLE", function() {
    var a = this.config.show_loading;
    a && typeof a == "object" && (a.parentNode && a.parentNode.removeChild(a), this.config.show_loading = !0);
  });
}
function st(e) {
  e._init_touch_events = function() {
    if ((this.config.touch && (navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("Touch") != -1) && !window.MSStream || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && (this.xy.scroll_width = 0, this._mobile = !0), this.config.touch) {
      var h = !0;
      try {
        document.createEvent("TouchEvent");
      } catch {
        h = !1;
      }
      h ? this._touch_events(["touchmove", "touchstart", "touchend"], function(a) {
        return a.touches && a.touches.length > 1 ? null : a.touches[0] ? { target: a.target, pageX: a.touches[0].pageX, pageY: a.touches[0].pageY, clientX: a.touches[0].clientX, clientY: a.touches[0].clientY } : a;
      }, function() {
        return !1;
      }) : window.PointerEvent || window.navigator.pointerEnabled ? this._touch_events(["pointermove", "pointerdown", "pointerup"], function(a) {
        return a.pointerType == "mouse" ? null : a;
      }, function(a) {
        return !a || a.pointerType == "mouse";
      }) : window.navigator.msPointerEnabled && this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function(a) {
        return a.pointerType == a.MSPOINTER_TYPE_MOUSE ? null : a;
      }, function(a) {
        return !a || a.pointerType == a.MSPOINTER_TYPE_MOUSE;
      });
    }
  }, e._touch_events = function(h, a, n) {
    var _, r, l, o, t, i, s = 0;
    function c(y, m, u) {
      e.event(y, m, function(p) {
        return !!e._is_lightbox_open() || (n(p) ? void 0 : u(p));
      }, { passive: !1 });
    }
    function g(y) {
      n(y) || (e._hide_global_tip(), o && (e._on_mouse_up(a(y)), e._temp_touch_block = !1), e._drag_id = null, e._drag_mode = null, e._drag_pos = null, e._pointerDragId = null, clearTimeout(l), o = i = !1, t = !0);
    }
    c(document.body, h[0], function(y) {
      if (!n(y)) {
        var m = a(y);
        if (m) {
          if (o)
            return function(u) {
              if (!n(u)) {
                var p = e.getState().drag_mode, d = !!e.matrix && e.matrix[e._mode], f = e.render_view_data;
                p == "create" && d && (e.render_view_data = function() {
                  for (var v = e.getState().drag_id, x = e.getEvent(v), b = d.y_property, w = e.getEvents(x.start_date, x.end_date), k = 0; k < w.length; k++)
                    w[k][b] != x[b] && (w.splice(k, 1), k--);
                  x._sorder = w.length - 1, x._count = w.length, this.render_data([x], e.getState().mode);
                }), e._on_mouse_move(u), p == "create" && d && (e.render_view_data = f), u.preventDefault && u.preventDefault(), u.cancelBubble = !0;
              }
            }(m), y.preventDefault && y.preventDefault(), y.cancelBubble = !0, e._update_global_tip(), !1;
          r = a(y), i && (r ? (_.target != r.target || Math.abs(_.pageX - r.pageX) > 5 || Math.abs(_.pageY - r.pageY) > 5) && (t = !0, clearTimeout(l)) : t = !0);
        }
      }
    }), c(this._els.dhx_cal_data[0], "touchcancel", g), c(this._els.dhx_cal_data[0], "contextmenu", function(y) {
      if (!n(y))
        return i ? (y && y.preventDefault && y.preventDefault(), y.cancelBubble = !0, !1) : void 0;
    }), c(this._obj, h[1], function(y) {
      var m;
      if (document && document.body && document.body.classList.add("dhx_cal_touch_active"), !n(y))
        if (e._pointerDragId = y.pointerId, o = t = !1, i = !0, m = r = a(y)) {
          var u = /* @__PURE__ */ new Date();
          if (!t && !o && u - s < 250)
            return e._click.dhx_cal_data(m), window.setTimeout(function() {
              e.$destroyed || e._on_dbl_click(m);
            }, 50), y.preventDefault && y.preventDefault(), y.cancelBubble = !0, e._block_next_stop = !0, !1;
          if (s = u, !t && !o && e.config.touch_drag) {
            var p = e._locate_event(document.activeElement), d = e._locate_event(m.target), f = _ ? e._locate_event(_.target) : null;
            if (p && d && p == d && p != f)
              return y.preventDefault && y.preventDefault(), y.cancelBubble = !0, e._ignore_next_click = !1, e._click.dhx_cal_data(m), _ = m, !1;
            l = setTimeout(function() {
              if (!e.$destroyed) {
                o = !0;
                var v = _.target, x = e._getClassName(v);
                v && x.indexOf("dhx_body") != -1 && (v = v.previousSibling), e._on_mouse_down(_, v), e._drag_mode && e._drag_mode != "create" && e.for_rendered(e._drag_id, function(b, w) {
                  b.style.display = "none", e._rendered.splice(w, 1);
                }), e.config.touch_tip && e._show_global_tip(), e.updateEvent(e._drag_id);
              }
            }, e.config.touch_drag), _ = m;
          }
        } else
          t = !0;
    }), c(this._els.dhx_cal_data[0], h[2], function(y) {
      if (document && document.body && document.body.classList.remove("dhx_cal_touch_active"), !n(y))
        return e.config.touch_swipe_dates && !o && function(m, u, p, d) {
          if (!m || !u)
            return !1;
          for (var f = m.target; f && f != e._obj; )
            f = f.parentNode;
          if (f != e._obj || e.matrix && e.matrix[e.getState().mode] && e.matrix[e.getState().mode].scrollable)
            return !1;
          var v = Math.abs(m.pageY - u.pageY), x = Math.abs(m.pageX - u.pageX);
          return v < d && x > p && (!v || x / v > 3) && (m.pageX > u.pageX ? e._click.dhx_cal_next_button() : e._click.dhx_cal_prev_button(), !0);
        }(_, r, 200, 100) && (e._block_next_stop = !0), o && (e._ignore_next_click = !0, setTimeout(function() {
          e._ignore_next_click = !1;
        }, 100)), g(y), e._block_next_stop ? (e._block_next_stop = !1, y.preventDefault && y.preventDefault(), y.cancelBubble = !0, !1) : void 0;
    }), e.event(document.body, h[2], g);
  }, e._show_global_tip = function() {
    e._hide_global_tip();
    var h = e._global_tip = document.createElement("div");
    h.className = "dhx_global_tip", e._update_global_tip(1), document.body.appendChild(h);
  }, e._update_global_tip = function(h) {
    var a = e._global_tip;
    if (a) {
      var n = "";
      if (e._drag_id && !h) {
        var _ = e.getEvent(e._drag_id);
        _ && (n = "<div>" + (_._timed ? e.templates.event_header(_.start_date, _.end_date, _) : e.templates.day_date(_.start_date, _.end_date, _)) + "</div>");
      }
      e._drag_mode == "create" || e._drag_mode == "new-size" ? a.innerHTML = (e.locale.labels.drag_to_create || "Drag to create") + n : a.innerHTML = (e.locale.labels.drag_to_move || "Drag to move") + n;
    }
  }, e._hide_global_tip = function() {
    var h = e._global_tip;
    h && h.parentNode && (h.parentNode.removeChild(h), e._global_tip = 0);
  };
}
function _t(e) {
  var h, a;
  function n() {
    if (e._is_material_skin())
      return !0;
    if (a !== void 0)
      return a;
    var o = document.createElement("div");
    o.style.position = "absolute", o.style.left = "-9999px", o.style.top = "-9999px", o.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_data'><div class='dhx_cal_event'><div class='dhx_body'></div></div><div>", document.body.appendChild(o);
    var t = window.getComputedStyle(o.querySelector(".dhx_body")).getPropertyValue("box-sizing");
    document.body.removeChild(o), (a = t === "border-box") || setTimeout(function() {
      a = void 0;
    }, 1e3);
  }
  function _() {
    if (!e._is_material_skin() && !e._border_box_events()) {
      var o = a;
      a = void 0, h = void 0, o !== n() && e.$container && e.getState().mode && e.setCurrentView();
    }
  }
  function r(o) {
    var t = o.getMinutes();
    return t = t < 10 ? "0" + t : t, "<span class='dhx_scale_h'>" + o.getHours() + "</span><span class='dhx_scale_m'>&nbsp;" + t + "</span>";
  }
  e._addThemeClass = function() {
    document.documentElement.setAttribute("data-scheduler-theme", e.skin);
  }, e._skin_settings = { fix_tab_position: [1, 0], use_select_menu_space: [1, 0], wide_form: [1, 0], hour_size_px: [44, 42], displayed_event_color: ["#ff4a4a", "ffc5ab"], displayed_event_text_color: ["#ffef80", "7e2727"] }, e._skin_xy = { lightbox_additional_height: [90, 50], nav_height: [59, 22], bar_height: [24, 20] }, e._is_material_skin = function() {
    return e.skin ? (e.skin + "").indexOf("material") > -1 : function() {
      if (h === void 0) {
        var o = document.createElement("div");
        o.style.position = "absolute", o.style.left = "-9999px", o.style.top = "-9999px", o.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_scale_placeholder'></div><div>", document.body.appendChild(o);
        var t = window.getComputedStyle(o.querySelector(".dhx_cal_scale_placeholder")).getPropertyValue("position");
        h = t === "absolute", setTimeout(function() {
          h = null, o && o.parentNode && o.parentNode.removeChild(o);
        }, 500);
      }
      return h;
    }();
  }, e._build_skin_info = function() {
    (function() {
      const y = e.$container;
      clearInterval(l), y && (l = setInterval(() => {
        const m = getComputedStyle(y).getPropertyValue("--dhx-scheduler-theme");
        m && m !== e.skin && e.setSkin(m);
      }, 100));
    })();
    const o = getComputedStyle(this.$container), t = o.getPropertyValue("--dhx-scheduler-theme");
    let i, s = !!t, c = {}, g = !1;
    if (s) {
      i = t;
      for (let y in e.xy)
        c[y] = o.getPropertyValue(`--dhx-scheduler-xy-${y}`);
      c.hour_size_px = o.getPropertyValue("--dhx-scheduler-config-hour_size_px"), c.wide_form = o.getPropertyValue("--dhx-scheduler-config-form_wide");
    } else
      i = function() {
        for (var y = document.getElementsByTagName("link"), m = 0; m < y.length; m++) {
          var u = y[m].href.match("dhtmlxscheduler_([a-z]+).css");
          if (u)
            return u[1];
        }
      }(), g = e._is_material_skin();
    if (e._theme_info = { theme: i, cssVarTheme: s, oldMaterialTheme: g, values: c }, e._theme_info.cssVarTheme) {
      const y = this._theme_info.values;
      for (let m in e.xy)
        isNaN(parseInt(y[m])) || (e.xy[m] = parseInt(y[m]));
    }
  }, e.event(window, "DOMContentLoaded", _), e.event(window, "load", _), e._border_box_events = function() {
    return n();
  }, e._configure = function(o, t, i) {
    for (var s in t)
      o[s] === void 0 && (o[s] = t[s][i]);
  }, e.setSkin = function(o) {
    this.skin = o, e._addThemeClass(), e.$container && (this._skin_init(), this.render());
  };
  let l = null;
  e.attachEvent("onDestroy", function() {
    clearInterval(l);
  }), e._skin_init = function() {
    this._build_skin_info(), this.skin || (this.skin = this._theme_info.theme), e._addThemeClass(), e.skin === "flat" ? e.templates.hour_scale = r : e.templates.hour_scale === r && (e.templates.hour_scale = e.date.date_to_str(e.config.hour_date)), e.attachEvent("onTemplatesReady", function() {
      var o = e.date.date_to_str("%d");
      e.templates._old_month_day || (e.templates._old_month_day = e.templates.month_day);
      var t = e.templates._old_month_day;
      e.templates.month_day = function(i) {
        if (this._mode == "month") {
          var s = o(i);
          return i.getDate() == 1 && (s = e.locale.date.month_full[i.getMonth()] + " " + s), +i == +e.date.date_part(this._currentDate()) && (s = e.locale.labels.dhx_cal_today_button + " " + s), s;
        }
        return t.call(this, i);
      }, e.config.fix_tab_position && (e._els.dhx_cal_navline[0].querySelectorAll("[data-tab]").forEach((i) => {
        switch (i.getAttribute("data-tab") || i.getAttribute("name")) {
          case "day":
          case "day_tab":
            i.classList.add("dhx_cal_tab_first"), i.classList.add("dhx_cal_tab_segmented");
            break;
          case "week":
          case "week_tab":
            i.classList.add("dhx_cal_tab_segmented");
            break;
          case "month":
          case "month_tab":
            i.classList.add("dhx_cal_tab_last"), i.classList.add("dhx_cal_tab_segmented");
            break;
          default:
            i.classList.add("dhx_cal_tab_standalone");
        }
      }), function(i) {
        if (e.config.header)
          return;
        const s = Array.from(i.querySelectorAll(".dhx_cal_tab")), c = ["day", "week", "month"].map((y) => s.find((m) => m.getAttribute("data-tab") === y)).filter((y) => y !== void 0);
        let g = s.length > 0 ? s[0] : null;
        c.reverse().forEach((y) => {
          i.insertBefore(y, g), g = y;
        });
      }(e._els.dhx_cal_navline[0]));
    }, { once: !0 });
  };
}
function dt(e, h) {
  this.$scheduler = e, this.$dp = h, this._dataProcessorHandlers = [], this.attach = function() {
    var a = this.$dp, n = this.$scheduler;
    this._dataProcessorHandlers.push(n.attachEvent("onEventAdded", function(_) {
      !this._loading && this._validId(_) && a.setUpdated(_, !0, "inserted");
    })), this._dataProcessorHandlers.push(n.attachEvent("onConfirmedBeforeEventDelete", function(_) {
      if (this._validId(_)) {
        var r = a.getState(_);
        return r == "inserted" || this._new_event ? (a.setUpdated(_, !1), !0) : r != "deleted" && (r == "true_deleted" || (a.setUpdated(_, !0, "deleted"), !1));
      }
    })), this._dataProcessorHandlers.push(n.attachEvent("onEventChanged", function(_) {
      !this._loading && this._validId(_) && a.setUpdated(_, !0, "updated");
    })), this._dataProcessorHandlers.push(n.attachEvent("onClearAll", function() {
      a._in_progress = {}, a._invalid = {}, a.updatedRows = [], a._waitMode = 0;
    })), a.attachEvent("insertCallback", n._update_callback), a.attachEvent("updateCallback", n._update_callback), a.attachEvent("deleteCallback", function(_, r) {
      n.getEvent(r) ? (n.setUserData(r, this.action_param, "true_deleted"), n.deleteEvent(r)) : n._add_rec_marker && n._update_callback(_, r);
    });
  }, this.detach = function() {
    for (var a in this._dataProcessorHandlers) {
      var n = this._dataProcessorHandlers[a];
      this.$scheduler.detachEvent(n);
    }
    this._dataProcessorHandlers = [];
  };
}
function Ne(e) {
  return this.serverProcessor = e, this.action_param = "!nativeeditor_status", this.object = null, this.updatedRows = [], this.autoUpdate = !0, this.updateMode = "cell", this._tMode = "GET", this._headers = null, this._payload = null, this.post_delim = "_", this._waitMode = 0, this._in_progress = {}, this._invalid = {}, this.messages = [], this.styles = { updated: "font-weight:bold;", inserted: "font-weight:bold;", deleted: "text-decoration : line-through;", invalid: "background-color:FFE0E0;", invalid_cell: "border-bottom:2px solid red;", error: "color:red;", clear: "font-weight:normal;text-decoration:none;" }, this.enableUTFencoding(!0), we(this), this;
}
function lt(e) {
  var h = "data-dhxbox", a = null;
  function n(d, f) {
    var v = d.callback;
    m.hide(d.box), a = d.box = null, v && v(f);
  }
  function _(d) {
    if (a) {
      var f = d.which || d.keyCode, v = !1;
      if (u.keyboard) {
        if (f == 13 || f == 32) {
          var x = d.target || d.srcElement;
          le.getClassName(x).indexOf("scheduler_popup_button") > -1 && x.click ? x.click() : (n(a, !0), v = !0);
        }
        f == 27 && (n(a, !1), v = !0);
      }
      return v ? (d.preventDefault && d.preventDefault(), !(d.cancelBubble = !0)) : void 0;
    }
  }
  function r(d) {
    r.cover || (r.cover = document.createElement("div"), e.event(r.cover, "keydown", _), r.cover.className = "dhx_modal_cover", document.body.appendChild(r.cover)), r.cover.style.display = d ? "inline-block" : "none";
  }
  function l(d, f, v) {
    var x = e._waiAria.messageButtonAttrString(d), b = (f || "").toLowerCase().replace(/ /g, "_");
    return `<div ${x} class='scheduler_popup_button dhtmlx_popup_button ${`scheduler_${b}_button dhtmlx_${b}_button`}' data-result='${v}' result='${v}' ><div>${d}</div></div>`;
  }
  function o() {
    for (var d = [].slice.apply(arguments, [0]), f = 0; f < d.length; f++)
      if (d[f])
        return d[f];
  }
  function t(d, f, v) {
    var x = d.tagName ? d : function(k, E, D) {
      var S = document.createElement("div"), N = ie.uid();
      e._waiAria.messageModalAttr(S, N), S.className = " scheduler_modal_box dhtmlx_modal_box scheduler-" + k.type + " dhtmlx-" + k.type, S.setAttribute(h, 1);
      var M = "";
      if (k.width && (S.style.width = k.width), k.height && (S.style.height = k.height), k.title && (M += '<div class="scheduler_popup_title dhtmlx_popup_title">' + k.title + "</div>"), M += '<div class="scheduler_popup_text dhtmlx_popup_text" id="' + N + '"><span>' + (k.content ? "" : k.text) + '</span></div><div  class="scheduler_popup_controls dhtmlx_popup_controls">', E && (M += l(o(k.ok, e.locale.labels.message_ok, "OK"), "ok", !0)), D && (M += l(o(k.cancel, e.locale.labels.message_cancel, "Cancel"), "cancel", !1)), k.buttons)
        for (var A = 0; A < k.buttons.length; A++) {
          var C = k.buttons[A];
          M += typeof C == "object" ? l(C.label, C.css || "scheduler_" + C.label.toLowerCase() + "_button dhtmlx_" + C.label.toLowerCase() + "_button", C.value || A) : l(C, C, A);
        }
      if (M += "</div>", S.innerHTML = M, k.content) {
        var T = k.content;
        typeof T == "string" && (T = document.getElementById(T)), T.style.display == "none" && (T.style.display = ""), S.childNodes[k.title ? 1 : 0].appendChild(T);
      }
      return e.event(S, "click", function(O) {
        var L = O.target || O.srcElement;
        if (L.className || (L = L.parentNode), le.closest(L, ".scheduler_popup_button")) {
          var $ = L.getAttribute("data-result");
          n(k, $ = $ == "true" || $ != "false" && $);
        }
      }), k.box = S, (E || D) && (a = k), S;
    }(d, f, v);
    d.hidden || r(!0), document.body.appendChild(x);
    var b = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - x.offsetWidth) / 2)), w = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - x.offsetHeight) / 2));
    return d.position == "top" ? x.style.top = "-3px" : x.style.top = w + "px", x.style.left = b + "px", e.event(x, "keydown", _), m.focus(x), d.hidden && m.hide(x), e.callEvent("onMessagePopup", [x]), x;
  }
  function i(d) {
    return t(d, !0, !1);
  }
  function s(d) {
    return t(d, !0, !0);
  }
  function c(d) {
    return t(d);
  }
  function g(d, f, v) {
    return typeof d != "object" && (typeof f == "function" && (v = f, f = ""), d = { text: d, type: f, callback: v }), d;
  }
  function y(d, f, v, x) {
    return typeof d != "object" && (d = { text: d, type: f, expire: v, id: x }), d.id = d.id || ie.uid(), d.expire = d.expire || u.expire, d;
  }
  e.event(document, "keydown", _, !0);
  var m = function() {
    var d = g.apply(this, arguments);
    return d.type = d.type || "alert", c(d);
  };
  m.hide = function(d) {
    for (; d && d.getAttribute && !d.getAttribute(h); )
      d = d.parentNode;
    d && (d.parentNode.removeChild(d), r(!1), e.callEvent("onAfterMessagePopup", [d]));
  }, m.focus = function(d) {
    setTimeout(function() {
      var f = le.getFocusableNodes(d);
      f.length && f[0].focus && f[0].focus();
    }, 1);
  };
  var u = function(d, f, v, x) {
    switch ((d = y.apply(this, arguments)).type = d.type || "info", d.type.split("-")[0]) {
      case "alert":
        return i(d);
      case "confirm":
        return s(d);
      case "modalbox":
        return c(d);
      default:
        return function(b) {
          u.area || (u.area = document.createElement("div"), u.area.className = "scheduler_message_area dhtmlx_message_area", u.area.style[u.position] = "5px", document.body.appendChild(u.area)), u.hide(b.id);
          var w = document.createElement("div");
          return w.innerHTML = "<div>" + b.text + "</div>", w.className = "scheduler-info dhtmlx-info scheduler-" + b.type + " dhtmlx-" + b.type, e.event(w, "click", function() {
            u.hide(b.id), b = null;
          }), e._waiAria.messageInfoAttr(w), u.position == "bottom" && u.area.firstChild ? u.area.insertBefore(w, u.area.firstChild) : u.area.appendChild(w), b.expire > 0 && (u.timers[b.id] = window.setTimeout(function() {
            u && u.hide(b.id);
          }, b.expire)), u.pull[b.id] = w, w = null, b.id;
        }(d);
    }
  };
  u.seed = (/* @__PURE__ */ new Date()).valueOf(), u.uid = ie.uid, u.expire = 4e3, u.keyboard = !0, u.position = "top", u.pull = {}, u.timers = {}, u.hideAll = function() {
    for (var d in u.pull)
      u.hide(d);
  }, u.hide = function(d) {
    var f = u.pull[d];
    f && f.parentNode && (window.setTimeout(function() {
      f.parentNode.removeChild(f), f = null;
    }, 2e3), f.className += " hidden", u.timers[d] && window.clearTimeout(u.timers[d]), delete u.pull[d]);
  };
  var p = [];
  return e.attachEvent("onMessagePopup", function(d) {
    p.push(d);
  }), e.attachEvent("onAfterMessagePopup", function(d) {
    for (var f = 0; f < p.length; f++)
      p[f] === d && (p.splice(f, 1), f--);
  }), e.attachEvent("onDestroy", function() {
    r.cover && r.cover.parentNode && r.cover.parentNode.removeChild(r.cover);
    for (var d = 0; d < p.length; d++)
      p[d].parentNode && p[d].parentNode.removeChild(p[d]);
    p = null, u.area && u.area.parentNode && u.area.parentNode.removeChild(u.area), u = null;
  }), { alert: function() {
    var d = g.apply(this, arguments);
    return d.type = d.type || "confirm", i(d);
  }, confirm: function() {
    var d = g.apply(this, arguments);
    return d.type = d.type || "alert", s(d);
  }, message: u, modalbox: m };
}
Ne.prototype = { setTransactionMode: function(e, h) {
  typeof e == "object" ? (this._tMode = e.mode || this._tMode, e.headers !== void 0 && (this._headers = e.headers), e.payload !== void 0 && (this._payload = e.payload), this._tSend = !!h) : (this._tMode = e, this._tSend = h), this._tMode == "REST" && (this._tSend = !1, this._endnm = !0), this._tMode === "JSON" || this._tMode === "REST-JSON" ? (this._tSend = !1, this._endnm = !0, this._serializeAsJson = !0, this._headers = this._headers || {}, this._headers["Content-Type"] = "application/json") : this._headers && !this._headers["Content-Type"] && (this._headers["Content-Type"] = "application/x-www-form-urlencoded"), this._tMode === "CUSTOM" && (this._tSend = !1, this._endnm = !0, this._router = e.router);
}, escape: function(e) {
  return this._utf ? encodeURIComponent(e) : escape(e);
}, enableUTFencoding: function(e) {
  this._utf = !!e;
}, setDataColumns: function(e) {
  this._columns = typeof e == "string" ? e.split(",") : e;
}, getSyncState: function() {
  return !this.updatedRows.length;
}, enableDataNames: function(e) {
  this._endnm = !!e;
}, enablePartialDataSend: function(e) {
  this._changed = !!e;
}, setUpdateMode: function(e, h) {
  this.autoUpdate = e == "cell", this.updateMode = e, this.dnd = h;
}, ignore: function(e, h) {
  this._silent_mode = !0, e.call(h || window), this._silent_mode = !1;
}, setUpdated: function(e, h, a) {
  if (!this._silent_mode) {
    var n = this.findRow(e);
    a = a || "updated";
    var _ = this.$scheduler.getUserData(e, this.action_param);
    _ && a == "updated" && (a = _), h ? (this.set_invalid(e, !1), this.updatedRows[n] = e, this.$scheduler.setUserData(e, this.action_param, a), this._in_progress[e] && (this._in_progress[e] = "wait")) : this.is_invalid(e) || (this.updatedRows.splice(n, 1), this.$scheduler.setUserData(e, this.action_param, "")), this.markRow(e, h, a), h && this.autoUpdate && this.sendData(e);
  }
}, markRow: function(e, h, a) {
  var n = "", _ = this.is_invalid(e);
  if (_ && (n = this.styles[_], h = !0), this.callEvent("onRowMark", [e, h, a, _]) && (n = this.styles[h ? a : "clear"] + n, this.$scheduler[this._methods[0]](e, n), _ && _.details)) {
    n += this.styles[_ + "_cell"];
    for (var r = 0; r < _.details.length; r++)
      _.details[r] && this.$scheduler[this._methods[1]](e, r, n);
  }
}, getActionByState: function(e) {
  return e === "inserted" ? "create" : e === "updated" ? "update" : e === "deleted" ? "delete" : "update";
}, getState: function(e) {
  return this.$scheduler.getUserData(e, this.action_param);
}, is_invalid: function(e) {
  return this._invalid[e];
}, set_invalid: function(e, h, a) {
  a && (h = { value: h, details: a, toString: function() {
    return this.value.toString();
  } }), this._invalid[e] = h;
}, checkBeforeUpdate: function(e) {
  return !0;
}, sendData: function(e) {
  return this.$scheduler.editStop && this.$scheduler.editStop(), e === void 0 || this._tSend ? this.sendAllData() : !this._in_progress[e] && (this.messages = [], !(!this.checkBeforeUpdate(e) && this.callEvent("onValidationError", [e, this.messages])) && void this._beforeSendData(this._getRowData(e), e));
}, _beforeSendData: function(e, h) {
  if (!this.callEvent("onBeforeUpdate", [h, this.getState(h), e]))
    return !1;
  this._sendData(e, h);
}, serialize: function(e, h) {
  if (this._serializeAsJson)
    return this._serializeAsJSON(e);
  if (typeof e == "string")
    return e;
  if (h !== void 0)
    return this.serialize_one(e, "");
  var a = [], n = [];
  for (var _ in e)
    e.hasOwnProperty(_) && (a.push(this.serialize_one(e[_], _ + this.post_delim)), n.push(_));
  return a.push("ids=" + this.escape(n.join(","))), this.$scheduler.security_key && a.push("dhx_security=" + this.$scheduler.security_key), a.join("&");
}, serialize_one: function(e, h) {
  if (typeof e == "string")
    return e;
  var a = [], n = "";
  for (var _ in e)
    if (e.hasOwnProperty(_)) {
      if ((_ == "id" || _ == this.action_param) && this._tMode == "REST")
        continue;
      n = typeof e[_] == "string" || typeof e[_] == "number" ? e[_] : JSON.stringify(e[_]), a.push(this.escape((h || "") + _) + "=" + this.escape(n));
    }
  return a.join("&");
}, _applyPayload: function(e) {
  var h = this.$scheduler.ajax;
  if (this._payload)
    for (var a in this._payload)
      e = e + h.urlSeparator(e) + this.escape(a) + "=" + this.escape(this._payload[a]);
  return e;
}, _sendData: function(e, h) {
  if (e) {
    if (!this.callEvent("onBeforeDataSending", h ? [h, this.getState(h), e] : [null, null, e]))
      return !1;
    h && (this._in_progress[h] = (/* @__PURE__ */ new Date()).valueOf());
    var a = this, n = this.$scheduler.ajax;
    if (this._tMode !== "CUSTOM") {
      var _, r = { callback: function(m) {
        var u = [];
        if (h)
          u.push(h);
        else if (e)
          for (var p in e)
            u.push(p);
        return a.afterUpdate(a, m, u);
      }, headers: a._headers }, l = this.serverProcessor + (this._user ? n.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.$scheduler.getUserData(0, "version")].join("&") : ""), o = this._applyPayload(l);
      switch (this._tMode) {
        case "GET":
          _ = this._cleanupArgumentsBeforeSend(e), r.url = o + n.urlSeparator(o) + this.serialize(_, h), r.method = "GET";
          break;
        case "POST":
          _ = this._cleanupArgumentsBeforeSend(e), r.url = o, r.method = "POST", r.data = this.serialize(_, h);
          break;
        case "JSON":
          _ = {};
          var t = this._cleanupItemBeforeSend(e);
          for (var i in t)
            i !== this.action_param && i !== "id" && i !== "gr_id" && (_[i] = t[i]);
          r.url = o, r.method = "POST", r.data = JSON.stringify({ id: h, action: e[this.action_param], data: _ });
          break;
        case "REST":
        case "REST-JSON":
          switch (o = l.replace(/(&|\?)editing=true/, ""), _ = "", this.getState(h)) {
            case "inserted":
              r.method = "POST", r.data = this.serialize(e, h);
              break;
            case "deleted":
              r.method = "DELETE", o = o + (o.slice(-1) === "/" ? "" : "/") + h;
              break;
            default:
              r.method = "PUT", r.data = this.serialize(e, h), o = o + (o.slice(-1) === "/" ? "" : "/") + h;
          }
          r.url = this._applyPayload(o);
      }
      return this._waitMode++, n.query(r);
    }
    {
      var s = this.getState(h), c = this.getActionByState(s), g = function(u) {
        var p = s;
        if (u && u.responseText && u.setRequestHeader) {
          u.status !== 200 && (p = "error");
          try {
            u = JSON.parse(u.responseText);
          } catch {
          }
        }
        p = p || "updated";
        var d = h, f = h;
        u && (p = u.action || p, d = u.sid || d, f = u.id || u.tid || f), a.afterUpdateCallback(d, f, p, u);
      };
      const m = "event";
      var y;
      if (this._router instanceof Function)
        y = this._router(m, c, e, h);
      else
        switch (s) {
          case "inserted":
            y = this._router[m].create(e);
            break;
          case "deleted":
            y = this._router[m].delete(h);
            break;
          default:
            y = this._router[m].update(e, h);
        }
      if (y) {
        if (!y.then && y.id === void 0 && y.tid === void 0 && y.action === void 0)
          throw new Error("Incorrect router return value. A Promise or a response object is expected");
        y.then ? y.then(g).catch(function(u) {
          u && u.action ? g(u) : g({ action: "error", value: u });
        }) : g(y);
      } else
        g(null);
    }
  }
}, sendAllData: function() {
  if (this.updatedRows.length && this.updateMode !== "off") {
    this.messages = [];
    var e = !0;
    if (this._forEachUpdatedRow(function(h) {
      e = e && this.checkBeforeUpdate(h);
    }), !e && !this.callEvent("onValidationError", ["", this.messages]))
      return !1;
    this._tSend ? this._sendData(this._getAllData()) : this._forEachUpdatedRow(function(h) {
      if (!this._in_progress[h]) {
        if (this.is_invalid(h))
          return;
        this._beforeSendData(this._getRowData(h), h);
      }
    });
  }
}, _getAllData: function(e) {
  var h = {}, a = !1;
  return this._forEachUpdatedRow(function(n) {
    if (!this._in_progress[n] && !this.is_invalid(n)) {
      var _ = this._getRowData(n);
      this.callEvent("onBeforeUpdate", [n, this.getState(n), _]) && (h[n] = _, a = !0, this._in_progress[n] = (/* @__PURE__ */ new Date()).valueOf());
    }
  }), a ? h : null;
}, findRow: function(e) {
  var h = 0;
  for (h = 0; h < this.updatedRows.length && e != this.updatedRows[h]; h++)
    ;
  return h;
}, defineAction: function(e, h) {
  this._uActions || (this._uActions = {}), this._uActions[e] = h;
}, afterUpdateCallback: function(e, h, a, n) {
  if (this.$scheduler) {
    var _ = e, r = a !== "error" && a !== "invalid";
    if (r || this.set_invalid(e, a), this._uActions && this._uActions[a] && !this._uActions[a](n))
      return delete this._in_progress[_];
    this._in_progress[_] !== "wait" && this.setUpdated(e, !1);
    var l = e;
    switch (a) {
      case "inserted":
      case "insert":
        h != e && (this.setUpdated(e, !1), this.$scheduler[this._methods[2]](e, h), e = h);
        break;
      case "delete":
      case "deleted":
        return this.$scheduler.setUserData(e, this.action_param, "true_deleted"), this.$scheduler[this._methods[3]](e, h), delete this._in_progress[_], this.callEvent("onAfterUpdate", [e, a, h, n]);
    }
    this._in_progress[_] !== "wait" ? (r && this.$scheduler.setUserData(e, this.action_param, ""), delete this._in_progress[_]) : (delete this._in_progress[_], this.setUpdated(h, !0, this.$scheduler.getUserData(e, this.action_param))), this.callEvent("onAfterUpdate", [l, a, h, n]);
  }
}, _errorResponse: function(e, h) {
  return this.$scheduler && this.$scheduler.callEvent && this.$scheduler.callEvent("onSaveError", [h, e.xmlDoc]), this.cleanUpdate(h);
}, _setDefaultTransactionMode: function() {
  this.serverProcessor && (this.setTransactionMode("POST", !0), this.serverProcessor += (this.serverProcessor.indexOf("?") !== -1 ? "&" : "?") + "editing=true", this._serverProcessor = this.serverProcessor);
}, afterUpdate: function(e, h, a) {
  var n = this.$scheduler.ajax;
  if (h.xmlDoc.status === 200) {
    var _;
    try {
      _ = JSON.parse(h.xmlDoc.responseText);
    } catch {
      h.xmlDoc.responseText.length || (_ = {});
    }
    if (_) {
      var r = _.action || this.getState(a) || "updated", l = _.sid || a[0], o = _.tid || a[0];
      return e.afterUpdateCallback(l, o, r, _), void e.finalizeUpdate();
    }
    var t = n.xmltop("data", h.xmlDoc);
    if (!t)
      return this._errorResponse(h, a);
    var i = n.xpath("//data/action", t);
    if (!i.length)
      return this._errorResponse(h, a);
    for (var s = 0; s < i.length; s++) {
      var c = i[s];
      r = c.getAttribute("type"), l = c.getAttribute("sid"), o = c.getAttribute("tid"), e.afterUpdateCallback(l, o, r, c);
    }
    e.finalizeUpdate();
  } else
    this._errorResponse(h, a);
}, cleanUpdate: function(e) {
  if (e)
    for (var h = 0; h < e.length; h++)
      delete this._in_progress[e[h]];
}, finalizeUpdate: function() {
  this._waitMode && this._waitMode--, this.callEvent("onAfterUpdateFinish", []), this.updatedRows.length || this.callEvent("onFullSync", []);
}, init: function(e) {
  if (!this._initialized) {
    this.$scheduler = e, this.$scheduler._dp_init && this.$scheduler._dp_init(this), this._setDefaultTransactionMode(), this._methods = this._methods || ["_set_event_text_style", "", "_dp_change_event_id", "_dp_hook_delete"], function(a, n) {
      a._validId = function(_) {
        return !this._is_virtual_event || !this._is_virtual_event(_);
      }, a.setUserData = function(_, r, l) {
        if (_) {
          var o = this.getEvent(_);
          o && (o[r] = l);
        } else
          this._userdata[r] = l;
      }, a.getUserData = function(_, r) {
        if (_) {
          var l = this.getEvent(_);
          return l ? l[r] : null;
        }
        return this._userdata[r];
      }, a._set_event_text_style = function(_, r) {
        if (a.getEvent(_)) {
          this.for_rendered(_, function(o) {
            o.style.cssText += ";" + r;
          });
          var l = this.getEvent(_);
          l._text_style = r, this.event_updated(l);
        }
      }, a._update_callback = function(_, r) {
        var l = a._xmlNodeToJSON(_.firstChild);
        l.rec_type == "none" && (l.rec_pattern = "none"), l.text = l.text || l._tagvalue, l.start_date = a._helpers.parseDate(l.start_date), l.end_date = a._helpers.parseDate(l.end_date), a.addEvent(l), a._add_rec_marker && a.setCurrentView();
      }, a._dp_change_event_id = function(_, r) {
        a.getEvent(_) && a.changeEventId(_, r);
      }, a._dp_hook_delete = function(_, r) {
        if (a.getEvent(_))
          return r && _ != r && (this.getUserData(_, n.action_param) == "true_deleted" && this.setUserData(_, n.action_param, "updated"), this.changeEventId(_, r)), this.deleteEvent(r, !0);
      }, a.setDp = function() {
        this._dp = n;
      }, a.setDp();
    }(this.$scheduler, this);
    var h = new dt(this.$scheduler, this);
    h.attach(), this.attachEvent("onDestroy", function() {
      delete this._getRowData, delete this.$scheduler._dp, delete this.$scheduler._dataprocessor, delete this.$scheduler._set_event_text_style, delete this.$scheduler._dp_change_event_id, delete this.$scheduler._dp_hook_delete, delete this.$scheduler, h.detach();
    }), this.$scheduler.callEvent("onDataProcessorReady", [this]), this._initialized = !0, e._dataprocessor = this;
  }
}, setOnAfterUpdate: function(e) {
  this.attachEvent("onAfterUpdate", e);
}, setOnBeforeUpdateHandler: function(e) {
  this.attachEvent("onBeforeDataSending", e);
}, setAutoUpdate: function(e, h) {
  e = e || 2e3, this._user = h || (/* @__PURE__ */ new Date()).valueOf(), this._need_update = !1, this._update_busy = !1, this.attachEvent("onAfterUpdate", function(_, r, l, o) {
    this.afterAutoUpdate(_, r, l, o);
  }), this.attachEvent("onFullSync", function() {
    this.fullSync();
  });
  var a = this;
  let n = H.setInterval(function() {
    a.loadUpdate();
  }, e);
  this.attachEvent("onDestroy", function() {
    clearInterval(n);
  });
}, afterAutoUpdate: function(e, h, a, n) {
  return h != "collision" || (this._need_update = !0, !1);
}, fullSync: function() {
  return this._need_update && (this._need_update = !1, this.loadUpdate()), !0;
}, getUpdates: function(e, h) {
  var a = this.$scheduler.ajax;
  if (this._update_busy)
    return !1;
  this._update_busy = !0, a.get(e, h);
}, _getXmlNodeValue: function(e) {
  return e.firstChild ? e.firstChild.nodeValue : "";
}, loadUpdate: function() {
  var e = this, h = this.$scheduler.ajax, a = this.$scheduler.getUserData(0, "version"), n = this.serverProcessor + h.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + a].join("&");
  n = n.replace("editing=true&", ""), this.getUpdates(n, function(_) {
    var r = h.xpath("//userdata", _);
    e.$scheduler.setUserData(0, "version", e._getXmlNodeValue(r[0]));
    var l = h.xpath("//update", _);
    if (l.length) {
      e._silent_mode = !0;
      for (var o = 0; o < l.length; o++) {
        var t = l[o].getAttribute("status"), i = l[o].getAttribute("id"), s = l[o].getAttribute("parent");
        switch (t) {
          case "inserted":
            this.callEvent("insertCallback", [l[o], i, s]);
            break;
          case "updated":
            this.callEvent("updateCallback", [l[o], i, s]);
            break;
          case "deleted":
            this.callEvent("deleteCallback", [l[o], i, s]);
        }
      }
      e._silent_mode = !1;
    }
    e._update_busy = !1, e = null;
  });
}, destructor: function() {
  this.callEvent("onDestroy", []), this.detachAllEvents(), this.updatedRows = [], this._in_progress = {}, this._invalid = {}, this._headers = null, this._payload = null, delete this._initialized;
}, url: function(e) {
  this.serverProcessor = this._serverProcessor = e;
}, _serializeAsJSON: function(e) {
  if (typeof e == "string")
    return e;
  var h = this.$scheduler.utils.copy(e);
  return this._tMode === "REST-JSON" && (delete h.id, delete h[this.action_param]), JSON.stringify(h);
}, _cleanupArgumentsBeforeSend: function(e) {
  var h;
  if (e[this.action_param] === void 0)
    for (var a in h = {}, e)
      h[a] = this._cleanupArgumentsBeforeSend(e[a]);
  else
    h = this._cleanupItemBeforeSend(e);
  return h;
}, _cleanupItemBeforeSend: function(e) {
  var h = null;
  return e && (e[this.action_param] === "deleted" ? ((h = {}).id = e.id, h[this.action_param] = e[this.action_param]) : h = e), h;
}, _forEachUpdatedRow: function(e) {
  for (var h = this.updatedRows.slice(), a = 0; a < h.length; a++) {
    var n = h[a];
    this.$scheduler.getUserData(n, this.action_param) && e.call(this, n);
  }
}, _prepareDataItem: function(e) {
  var h = {}, a = this.$scheduler, n = a.utils.copy(e);
  for (var _ in n)
    _.indexOf("_") !== 0 && n[_] && (n[_].getUTCFullYear ? h[_] = a._helpers.formatDate(n[_]) : typeof n[_] == "object" ? h[_] = this._prepareDataItem(n[_]) : n[_] === null ? h[_] = "" : h[_] = n[_]);
  return h[this.action_param] = a.getUserData(e.id, this.action_param), h;
}, _getRowData: function(e) {
  var h = this.$scheduler.getEvent(e);
  return h || (h = { id: e }), this._prepareDataItem(h);
} };
const ct = { date: { month_full: ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"], month_short: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], day_full: ["الأحد", "الأثنين", "ألثلاثاء", "الأربعاء", "ألحميس", "ألجمعة", "السبت"], day_short: ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"] }, labels: { dhx_cal_today_button: "اليوم", day_tab: "يوم", week_tab: "أسبوع", month_tab: "شهر", new_event: "حدث جديد", icon_save: "اخزن", icon_cancel: "الغاء", icon_details: "تفاصيل", icon_edit: "تحرير", icon_delete: "حذف", confirm_closing: "التغييرات سوف تضيع, هل انت متأكد؟", confirm_deleting: "الحدث سيتم حذفها نهائيا ، هل أنت متأكد؟", section_description: "الوصف", section_time: "الفترة الزمنية", full_day: "طوال اليوم", confirm_recurring: "هل تريد تحرير مجموعة كاملة من الأحداث المتكررة؟", section_recurring: "تكرار الحدث", button_recurring: "تعطيل", button_recurring_open: "تمكين", button_edit_series: "تحرير سلسلة", button_edit_occurrence: "تعديل نسخة", grid_tab: "جدول", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute" } }, ht = { date: { month_full: ["Студзень", "Люты", "Сакавік", "Красавік", "Maй", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"], month_short: ["Студз", "Лют", "Сак", "Крас", "Maй", "Чэр", "Ліп", "Жнів", "Вер", "Каст", "Ліст", "Снеж"], day_full: ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"], day_short: ["Нд", "Пн", "Аўт", "Ср", "Чцв", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сёння", day_tab: "Дзень", week_tab: "Тыдзень", month_tab: "Месяц", new_event: "Новая падзея", icon_save: "Захаваць", icon_cancel: "Адмяніць", icon_details: "Дэталі", icon_edit: "Змяніць", icon_delete: "Выдаліць", confirm_closing: "", confirm_deleting: "Падзея будзе выдалена незваротна, працягнуць?", section_description: "Апісанне", section_time: "Перыяд часу", full_day: "Увесь дзень", confirm_recurring: "Вы хочаце змяніць усю серыю паўтаральных падзей?", section_recurring: "Паўтарэнне", button_recurring: "Адключана", button_recurring_open: "Уключана", button_edit_series: "Рэдагаваць серыю", button_edit_occurrence: "Рэдагаваць асобнік", agenda_tab: "Спіс", date: "Дата", description: "Апісанне", year_tab: "Год", week_agenda_tab: "Спіс", grid_tab: "Спic", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Дзень", repeat_radio_week: "Тыдзень", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Кожны", repeat_text_day_count: "дзень", repeat_radio_day_type2: "Кожны працоўны дзень", repeat_week: " Паўтараць кожны", repeat_text_week_count: "тыдзень", repeat_radio_month_type: "Паўтараць", repeat_radio_month_start: "", repeat_text_month_day: " чысла кожнага", repeat_text_month_count: "месяцу", repeat_text_month_count2_before: "кожны ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "дзень", select_year_month: "", repeat_radio_end: "Без даты заканчэння", repeat_text_occurences_count: "паўтораў", repeat_radio_end2: "", repeat_radio_end3: "Да ", month_for_recurring: ["Студзеня", "Лютага", "Сакавіка", "Красавіка", "Мая", "Чэрвеня", "Ліпeня", "Жніўня", "Верасня", "Кастрычніка", "Лістапада", "Снежня"], day_for_recurring: ["Нядзелю", "Панядзелак", "Аўторак", "Сераду", "Чацвер", "Пятніцу", "Суботу"] } }, ut = { date: { month_full: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], month_short: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"], day_full: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"], day_short: ["Dg", "Dl", "Dm", "Dc", "Dj", "Dv", "Ds"] }, labels: { dhx_cal_today_button: "Hui", day_tab: "Dia", week_tab: "Setmana", month_tab: "Mes", new_event: "Nou esdeveniment", icon_save: "Guardar", icon_cancel: "Cancel·lar", icon_details: "Detalls", icon_edit: "Editar", icon_delete: "Esborrar", confirm_closing: "", confirm_deleting: "L'esdeveniment s'esborrarà definitivament, continuar ?", section_description: "Descripció", section_time: "Periode de temps", full_day: "Tot el dia", confirm_recurring: "¿Desitja modificar el conjunt d'esdeveniments repetits?", section_recurring: "Repeteixca l'esdeveniment", button_recurring: "Impedit", button_recurring_open: "Permés", button_edit_series: "Edit sèrie", button_edit_occurrence: "Edita Instància", agenda_tab: "Agenda", date: "Data", description: "Descripció", year_tab: "Any", week_agenda_tab: "Agenda", grid_tab: "Taula", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute" } }, ft = { date: { month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], day_short: ["日", "一", "二", "三", "四", "五", "六"] }, labels: { dhx_cal_today_button: "今天", day_tab: "日", week_tab: "周", month_tab: "月", new_event: "新建日程", icon_save: "保存", icon_cancel: "关闭", icon_details: "详细", icon_edit: "编辑", icon_delete: "删除", confirm_closing: "请确认是否撤销修改!", confirm_deleting: "是否删除日程?", section_description: "描述", section_time: "时间范围", full_day: "整天", confirm_recurring: "请确认是否将日程设为重复模式?", section_recurring: "重复周期", button_recurring: "禁用", button_recurring_open: "启用", button_edit_series: "编辑系列", button_edit_occurrence: "编辑实例", agenda_tab: "议程", date: "日期", description: "说明", year_tab: "今年", week_agenda_tab: "议程", grid_tab: "电网", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "按天", repeat_radio_week: "按周", repeat_radio_month: "按月", repeat_radio_year: "按年", repeat_radio_day_type: "每", repeat_text_day_count: "天", repeat_radio_day_type2: "每个工作日", repeat_week: " 重复 每", repeat_text_week_count: "星期的:", repeat_radio_month_type: "重复", repeat_radio_month_start: "在", repeat_text_month_day: "日 每", repeat_text_month_count: "月", repeat_text_month_count2_before: "每", repeat_text_month_count2_after: "月", repeat_year_label: "在", select_year_day2: "的", repeat_text_year_day: "日", select_year_month: "月", repeat_radio_end: "无结束日期", repeat_text_occurences_count: "次结束", repeat_radio_end2: "重复", repeat_radio_end3: "结束于", month_for_recurring: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], day_for_recurring: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] } }, vt = { date: { month_full: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], month_short: ["Led", "Ún", "Bře", "Dub", "Kvě", "Čer", "Čec", "Srp", "Září", "Říj", "List", "Pro"], day_full: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"], day_short: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Den", week_tab: "Týden", month_tab: "Měsíc", new_event: "Nová událost", icon_save: "Uložit", icon_cancel: "Zpět", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Smazat", confirm_closing: "", confirm_deleting: "Událost bude trvale smazána, opravdu?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Přejete si upravit celou řadu opakovaných událostí?", section_recurring: "Opakování události", button_recurring: "Vypnuto", button_recurring_open: "Zapnuto", button_edit_series: "Edit series", button_edit_occurrence: "Upravit instance", agenda_tab: "Program", date: "Datum", description: "Poznámka", year_tab: "Rok", full_day: "Full day", week_agenda_tab: "Program", grid_tab: "Mřížka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denně", repeat_radio_week: "Týdně", repeat_radio_month: "Měsíčně", repeat_radio_year: "Ročně", repeat_radio_day_type: "každý", repeat_text_day_count: "Den", repeat_radio_day_type2: "pracovní dny", repeat_week: "Opakuje každých", repeat_text_week_count: "Týdnů na:", repeat_radio_month_type: "u každého", repeat_radio_month_start: "na", repeat_text_month_day: "Den každého", repeat_text_month_count: "Měsíc", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "Měsíc", repeat_year_label: "na", select_year_day2: "v", repeat_text_year_day: "Den v", select_year_month: "", repeat_radio_end: "bez data ukončení", repeat_text_occurences_count: "Události", repeat_radio_end2: "po", repeat_radio_end3: "Konec", month_for_recurring: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], day_for_recurring: ["Neděle ", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"] } }, gt = { date: { month_full: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uge", month_tab: "Måned", new_event: "Ny begivenhed", icon_save: "Gem", icon_cancel: "Fortryd", icon_details: "Detaljer", icon_edit: "Tilret", icon_delete: "Slet", confirm_closing: "Dine rettelser vil gå tabt.. Er dy sikker?", confirm_deleting: "Bigivenheden vil blive slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du tilrette hele serien af gentagne begivenheder?", section_recurring: "Gentag begivenhed", button_recurring: "Frakoblet", button_recurring_open: "Tilkoblet", button_edit_series: "Rediger serien", button_edit_occurrence: "Rediger en kopi", agenda_tab: "Dagsorden", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Dagsorden", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ugenlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "På hver arbejdsdag", repeat_week: " Gentager sig hver", repeat_text_week_count: "uge på følgende dage:", repeat_radio_month_type: "Hver den", repeat_radio_month_start: "Den", repeat_text_month_day: " i hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen slutdato", repeat_text_occurences_count: "gentagelse", repeat_radio_end2: "Efter", repeat_radio_end3: "Slut", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, mt = { date: { month_full: [" Januar", " Februar", " März ", " April", " Mai", " Juni", " Juli", " August", " September ", " Oktober", " November ", " Dezember"], month_short: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], day_full: ["Sonntag", "Montag", "Dienstag", " Mittwoch", " Donnerstag", "Freitag", "Samstag"], day_short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"] }, labels: { dhx_cal_today_button: "Heute", day_tab: "Tag", week_tab: "Woche", month_tab: "Monat", new_event: "neuer Eintrag", icon_save: "Speichern", icon_cancel: "Abbrechen", icon_details: "Details", icon_edit: "Ändern", icon_delete: "Löschen", confirm_closing: "", confirm_deleting: "Der Eintrag wird gelöscht", section_description: "Beschreibung", section_time: "Zeitspanne", full_day: "Ganzer Tag", confirm_recurring: "Wollen Sie alle Einträge bearbeiten oder nur diesen einzelnen Eintrag?", section_recurring: "Wiederholung", button_recurring: "Aus", button_recurring_open: "An", button_edit_series: "Bearbeiten Sie die Serie", button_edit_occurrence: "Bearbeiten Sie eine Kopie", agenda_tab: "Agenda", date: "Datum", description: "Beschreibung", year_tab: "Jahre", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Täglich", repeat_radio_week: "Wöchentlich", repeat_radio_month: "Monatlich", repeat_radio_year: "Jährlich", repeat_radio_day_type: "jeden", repeat_text_day_count: "Tag", repeat_radio_day_type2: "an jedem Arbeitstag", repeat_week: " Wiederholt sich jede", repeat_text_week_count: "Woche am:", repeat_radio_month_type: "an jedem", repeat_radio_month_start: "am", repeat_text_month_day: "Tag eines jeden", repeat_text_month_count: "Monats", repeat_text_month_count2_before: "jeden", repeat_text_month_count2_after: "Monats", repeat_year_label: "am", select_year_day2: "im", repeat_text_year_day: "Tag im", select_year_month: "", repeat_radio_end: "kein Enddatum", repeat_text_occurences_count: "Ereignissen", repeat_radio_end3: "Schluß", repeat_radio_end2: "nach", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"] } }, pt = { date: { month_full: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], month_short: ["ΙΑΝ", "ΦΕΒ", "ΜΑΡ", "ΑΠΡ", "ΜΑΙ", "ΙΟΥΝ", "ΙΟΥΛ", "ΑΥΓ", "ΣΕΠ", "ΟΚΤ", "ΝΟΕ", "ΔΕΚ"], day_full: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"], day_short: ["ΚΥ", "ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ"] }, labels: { dhx_cal_today_button: "Σήμερα", day_tab: "Ημέρα", week_tab: "Εβδομάδα", month_tab: "Μήνας", new_event: "Νέο έργο", icon_save: "Αποθήκευση", icon_cancel: "Άκυρο", icon_details: "Λεπτομέρειες", icon_edit: "Επεξεργασία", icon_delete: "Διαγραφή", confirm_closing: "", confirm_deleting: "Το έργο θα διαγραφεί οριστικά. Θέλετε να συνεχίσετε;", section_description: "Περιγραφή", section_time: "Χρονική περίοδος", full_day: "Πλήρης Ημέρα", confirm_recurring: "Θέλετε να επεξεργασθείτε ολόκληρη την ομάδα των επαναλαμβανόμενων έργων;", section_recurring: "Επαναλαμβανόμενο έργο", button_recurring: "Ανενεργό", button_recurring_open: "Ενεργό", button_edit_series: "Επεξεργαστείτε τη σειρά", button_edit_occurrence: "Επεξεργασία ένα αντίγραφο", agenda_tab: "Ημερήσια Διάταξη", date: "Ημερομηνία", description: "Περιγραφή", year_tab: "Έτος", week_agenda_tab: "Ημερήσια Διάταξη", grid_tab: "Πλέγμα", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Ημερησίως", repeat_radio_week: "Εβδομαδιαίως", repeat_radio_month: "Μηνιαίως", repeat_radio_year: "Ετησίως", repeat_radio_day_type: "Κάθε", repeat_text_day_count: "ημέρα", repeat_radio_day_type2: "Κάθε εργάσιμη", repeat_week: " Επανάληψη κάθε", repeat_text_week_count: "εβδομάδα τις επόμενες ημέρες:", repeat_radio_month_type: "Επανάληψη", repeat_radio_month_start: "Την", repeat_text_month_day: "ημέρα κάθε", repeat_text_month_count: "μήνα", repeat_text_month_count2_before: "κάθε", repeat_text_month_count2_after: "μήνα", repeat_year_label: "Την", select_year_day2: "του", repeat_text_year_day: "ημέρα", select_year_month: "μήνα", repeat_radio_end: "Χωρίς ημερομηνία λήξεως", repeat_text_occurences_count: "επαναλήψεις", repeat_radio_end3: "Λήγει την", repeat_radio_end2: "Μετά από", month_for_recurring: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], day_for_recurring: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"] } }, yt = { date: { month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }, labels: { dhx_cal_today_button: "Today", day_tab: "Day", week_tab: "Week", month_tab: "Month", new_event: "New event", icon_save: "Save", icon_cancel: "Cancel", icon_details: "Details", icon_edit: "Edit", icon_delete: "Delete", confirm_closing: "", confirm_deleting: "Event will be deleted permanently, are you sure?", section_description: "Description", section_time: "Time period", full_day: "Full day", confirm_recurring: "Do you want to edit the whole set of repeated events?", section_recurring: "Repeat event", button_recurring: "Disabled", button_recurring_open: "Enabled", button_edit_series: "Edit series", button_edit_occurrence: "Edit occurrence", agenda_tab: "Agenda", date: "Date", description: "Description", year_tab: "Year", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daily", repeat_radio_week: "Weekly", repeat_radio_month: "Monthly", repeat_radio_year: "Yearly", repeat_radio_day_type: "Every", repeat_text_day_count: "day", repeat_radio_day_type2: "Every workday", repeat_week: " Repeat every", repeat_text_week_count: "week next days:", repeat_radio_month_type: "Repeat", repeat_radio_month_start: "On", repeat_text_month_day: "day every", repeat_text_month_count: "month", repeat_text_month_count2_before: "every", repeat_text_month_count2_after: "month", repeat_year_label: "On", select_year_day2: "of", repeat_text_year_day: "day", select_year_month: "month", repeat_radio_end: "No end date", repeat_text_occurences_count: "occurrences", repeat_radio_end2: "After", repeat_radio_end3: "End by", month_for_recurring: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] } }, xt = { date: { month_full: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], month_short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], day_full: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], day_short: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] }, labels: { dhx_cal_today_button: "Hoy", day_tab: "Día", week_tab: "Semana", month_tab: "Mes", new_event: "Nuevo evento", icon_save: "Guardar", icon_cancel: "Cancelar", icon_details: "Detalles", icon_edit: "Editar", icon_delete: "Eliminar", confirm_closing: "", confirm_deleting: "El evento se borrará definitivamente, ¿continuar?", section_description: "Descripción", section_time: "Período", full_day: "Todo el día", confirm_recurring: "¿Desea modificar el conjunto de eventos repetidos?", section_recurring: "Repita el evento", button_recurring: "Impedido", button_recurring_open: "Permitido", button_edit_series: "Editar la serie", button_edit_occurrence: "Editar este evento", agenda_tab: "Día", date: "Fecha", description: "Descripción", year_tab: "Año", week_agenda_tab: "Día", grid_tab: "Reja", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diariamente", repeat_radio_week: "Semanalmente", repeat_radio_month: "Mensualmente", repeat_radio_year: "Anualmente", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia", repeat_radio_day_type2: "Cada jornada de trabajo", repeat_week: " Repetir cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repita", repeat_radio_month_start: "El", repeat_text_month_day: "dia cada ", repeat_text_month_count: "mes", repeat_text_month_count2_before: "cada", repeat_text_month_count2_after: "mes", repeat_year_label: "El", select_year_day2: "del", repeat_text_year_day: "dia", select_year_month: "mes", repeat_radio_end: "Sin fecha de finalización", repeat_text_occurences_count: "ocurrencias", repeat_radio_end3: "Fin", repeat_radio_end2: "Después de", month_for_recurring: ["Enero", "Febrero", "Маrzo", "Аbril", "Mayo", "Junio", "Julio", "Аgosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"], day_for_recurring: ["Domingo", "Lunes", "Martes", "Miércoles", "Jeuves", "Viernes", "Sabado"] } }, bt = { date: { month_full: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], month_short: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou"], day_full: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"], day_short: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"] }, labels: { dhx_cal_today_button: "Tänään", day_tab: "Päivä", week_tab: "Viikko", month_tab: "Kuukausi", new_event: "Uusi tapahtuma", icon_save: "Tallenna", icon_cancel: "Peru", icon_details: "Tiedot", icon_edit: "Muokkaa", icon_delete: "Poista", confirm_closing: "", confirm_deleting: "Haluatko varmasti poistaa tapahtuman?", section_description: "Kuvaus", section_time: "Aikajakso", full_day: "Koko päivä", confirm_recurring: "Haluatko varmasti muokata toistuvan tapahtuman kaikkia jaksoja?", section_recurring: "Toista tapahtuma", button_recurring: "Ei k&auml;yt&ouml;ss&auml;", button_recurring_open: "K&auml;yt&ouml;ss&auml;", button_edit_series: "Muokkaa sarja", button_edit_occurrence: "Muokkaa kopio", agenda_tab: "Esityslista", date: "Päivämäärä", description: "Kuvaus", year_tab: "Vuoden", week_agenda_tab: "Esityslista", grid_tab: "Ritilä", drag_to_create: "Luo uusi vetämällä", drag_to_move: "Siirrä vetämällä", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "P&auml;ivitt&auml;in", repeat_radio_week: "Viikoittain", repeat_radio_month: "Kuukausittain", repeat_radio_year: "Vuosittain", repeat_radio_day_type: "Joka", repeat_text_day_count: "p&auml;iv&auml;", repeat_radio_day_type2: "Joka arkip&auml;iv&auml;", repeat_week: "Toista joka", repeat_text_week_count: "viikko n&auml;in&auml; p&auml;ivin&auml;:", repeat_radio_month_type: "Toista", repeat_radio_month_start: "", repeat_text_month_day: "p&auml;iv&auml;n&auml; joka", repeat_text_month_count: "kuukausi", repeat_text_month_count2_before: "joka", repeat_text_month_count2_after: "kuukausi", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "p&auml;iv&auml;", select_year_month: "kuukausi", repeat_radio_end: "Ei loppumisaikaa", repeat_text_occurences_count: "Toiston j&auml;lkeen", repeat_radio_end3: "Loppuu", repeat_radio_end2: "", month_for_recurring: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], day_for_recurring: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"] } }, wt = { date: { month_full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], month_short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"], day_full: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"], day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"] }, labels: { dhx_cal_today_button: "Aujourd'hui", day_tab: "Jour", week_tab: "Semaine", month_tab: "Mois", new_event: "Nouvel événement", icon_save: "Enregistrer", icon_cancel: "Annuler", icon_details: "Détails", icon_edit: "Modifier", icon_delete: "Effacer", confirm_closing: "", confirm_deleting: "L'événement sera effacé sans appel, êtes-vous sûr ?", section_description: "Description", section_time: "Période", full_day: "Journée complète", confirm_recurring: "Voulez-vous éditer toute une série d'évènements répétés?", section_recurring: "Périodicité", button_recurring: "Désactivé", button_recurring_open: "Activé", button_edit_series: "Modifier la série", button_edit_occurrence: "Modifier une copie", agenda_tab: "Jour", date: "Date", description: "Description", year_tab: "Année", week_agenda_tab: "Jour", grid_tab: "Grille", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidienne", repeat_radio_week: "Hebdomadaire", repeat_radio_month: "Mensuelle", repeat_radio_year: "Annuelle", repeat_radio_day_type: "Chaque", repeat_text_day_count: "jour", repeat_radio_day_type2: "Chaque journée de travail", repeat_week: " Répéter toutes les", repeat_text_week_count: "semaine:", repeat_radio_month_type: "Répéter", repeat_radio_month_start: "Le", repeat_text_month_day: "jour chaque", repeat_text_month_count: "mois", repeat_text_month_count2_before: "chaque", repeat_text_month_count2_after: "mois", repeat_year_label: "Le", select_year_day2: "du", repeat_text_year_day: "jour", select_year_month: "mois", repeat_radio_end: "Pas de date d&quot;achèvement", repeat_text_occurences_count: "occurrences", repeat_radio_end3: "Fin", repeat_radio_end2: "Après", month_for_recurring: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], day_for_recurring: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"] } }, kt = { date: { month_full: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], month_short: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"], day_full: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"], day_short: ["א", "ב", "ג", "ד", "ה", "ו", "ש"] }, labels: { dhx_cal_today_button: "היום", day_tab: "יום", week_tab: "שבוע", month_tab: "חודש", new_event: "ארוע חדש", icon_save: "שמור", icon_cancel: "בטל", icon_details: "פרטים", icon_edit: "ערוך", icon_delete: "מחק", confirm_closing: "", confirm_deleting: "ארוע ימחק סופית.להמשיך?", section_description: "תיאור", section_time: "תקופה", confirm_recurring: "האם ברצונך לשנות כל סדרת ארועים מתמשכים?", section_recurring: "להעתיק ארוע", button_recurring: "לא פעיל", button_recurring_open: "פעיל", full_day: "יום שלם", button_edit_series: "ערוך את הסדרה", button_edit_occurrence: "עריכת עותק", agenda_tab: "סדר יום", date: "תאריך", description: "תיאור", year_tab: "לשנה", week_agenda_tab: "סדר יום", grid_tab: "סורג", drag_to_create: "Drag to create", drag_to_move: "גרור כדי להזיז", message_ok: "OK", message_cancel: "בטל", next: "הבא", prev: "הקודם", year: "שנה", month: "חודש", day: "יום", hour: "שעה", minute: "דקה", repeat_radio_day: "יומי", repeat_radio_week: "שבועי", repeat_radio_month: "חודשי", repeat_radio_year: "שנתי", repeat_radio_day_type: "חזור כל", repeat_text_day_count: "ימים", repeat_radio_day_type2: "חזור כל יום עבודה", repeat_week: " חזור כל", repeat_text_week_count: "שבוע לפי ימים:", repeat_radio_month_type: "חזור כל", repeat_radio_month_start: "כל", repeat_text_month_day: "ימים כל", repeat_text_month_count: "חודשים", repeat_text_month_count2_before: "חזור כל", repeat_text_month_count2_after: "חודש", repeat_year_label: "כל", select_year_day2: "בחודש", repeat_text_year_day: "ימים", select_year_month: "חודש", repeat_radio_end: "לעולם לא מסתיים", repeat_text_occurences_count: "אירועים", repeat_radio_end3: "מסתיים ב", repeat_radio_end2: "אחרי", month_for_recurring: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], day_for_recurring: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"] } }, Et = { date: { month_full: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"], month_short: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Vasárnap", "Hétfõ", "Kedd", "Szerda", "Csütörtök", "Péntek", "szombat"], day_short: ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"] }, labels: { dhx_cal_today_button: "Ma", day_tab: "Nap", week_tab: "Hét", month_tab: "Hónap", new_event: "Új esemény", icon_save: "Mentés", icon_cancel: "Mégse", icon_details: "Részletek", icon_edit: "Szerkesztés", icon_delete: "Törlés", confirm_closing: "", confirm_deleting: "Az esemény törölve lesz, biztosan folytatja?", section_description: "Leírás", section_time: "Idõszak", full_day: "Egesz napos", confirm_recurring: "Biztosan szerkeszteni akarod az összes ismétlõdõ esemény beállítását?", section_recurring: "Esemény ismétlése", button_recurring: "Tiltás", button_recurring_open: "Engedélyezés", button_edit_series: "Edit series", button_edit_occurrence: "Szerkesztés bíróság", agenda_tab: "Napirend", date: "Dátum", description: "Leírás", year_tab: "Év", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute" } }, Dt = { date: { month_full: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"], day_full: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], day_short: ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] }, labels: { dhx_cal_today_button: "Hari Ini", day_tab: "Hari", week_tab: "Minggu", month_tab: "Bulan", new_event: "Acara Baru", icon_save: "Simpan", icon_cancel: "Batal", icon_details: "Detail", icon_edit: "Edit", icon_delete: "Hapus", confirm_closing: "", confirm_deleting: "Acara akan dihapus", section_description: "Keterangan", section_time: "Periode", full_day: "Hari penuh", confirm_recurring: "Apakah acara ini akan berulang?", section_recurring: "Acara Rutin", button_recurring: "Tidak Difungsikan", button_recurring_open: "Difungsikan", button_edit_series: "Mengedit seri", button_edit_occurrence: "Mengedit salinan", agenda_tab: "Agenda", date: "Tanggal", description: "Keterangan", year_tab: "Tahun", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute" } }, St = { date: { month_full: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], month_short: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"], day_full: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"], day_short: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"] }, labels: { dhx_cal_today_button: "Oggi", day_tab: "Giorno", week_tab: "Settimana", month_tab: "Mese", new_event: "Nuovo evento", icon_save: "Salva", icon_cancel: "Chiudi", icon_details: "Dettagli", icon_edit: "Modifica", icon_delete: "Elimina", confirm_closing: "", confirm_deleting: "L'evento sarà eliminato, siete sicuri?", section_description: "Descrizione", section_time: "Periodo di tempo", full_day: "Intera giornata", confirm_recurring: "Vuoi modificare l'intera serie di eventi?", section_recurring: "Ripetere l'evento", button_recurring: "Disattivato", button_recurring_open: "Attivato", button_edit_series: "Modificare la serie", button_edit_occurrence: "Modificare una copia", agenda_tab: "Agenda", date: "Data", description: "Descrizione", year_tab: "Anno", week_agenda_tab: "Agenda", grid_tab: "Griglia", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidiano", repeat_radio_week: "Settimanale", repeat_radio_month: "Mensile", repeat_radio_year: "Annuale", repeat_radio_day_type: "Ogni", repeat_text_day_count: "giorno", repeat_radio_day_type2: "Ogni giornata lavorativa", repeat_week: " Ripetere ogni", repeat_text_week_count: "settimana:", repeat_radio_month_type: "Ripetere", repeat_radio_month_start: "Il", repeat_text_month_day: "giorno ogni", repeat_text_month_count: "mese", repeat_text_month_count2_before: "ogni", repeat_text_month_count2_after: "mese", repeat_year_label: "Il", select_year_day2: "del", repeat_text_year_day: "giorno", select_year_month: "mese", repeat_radio_end: "Senza data finale", repeat_text_occurences_count: "occorenze", repeat_radio_end3: "Fine", repeat_radio_end2: "Dopo", month_for_recurring: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Jiugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], day_for_recurring: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Jovedì", "Venerdì", "Sabato"] } }, Nt = { date: { month_full: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"], day_short: ["日", "月", "火", "水", "木", "金", "土"] }, labels: { dhx_cal_today_button: "今日", day_tab: "日", week_tab: "週", month_tab: "月", new_event: "新イベント", icon_save: "保存", icon_cancel: "キャンセル", icon_details: "詳細", icon_edit: "編集", icon_delete: "削除", confirm_closing: "", confirm_deleting: "イベント完全に削除されます、宜しいですか？", section_description: "デスクリプション", section_time: "期間", confirm_recurring: "繰り返されているイベントを全て編集しますか？", section_recurring: "イベントを繰り返す", button_recurring: "無効", button_recurring_open: "有効", full_day: "終日", button_edit_series: "シリーズを編集します", button_edit_occurrence: "コピーを編集", agenda_tab: "議題は", date: "日付", description: "説明", year_tab: "今年", week_agenda_tab: "議題は", grid_tab: "グリッド", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute" } };
class Mt {
  constructor(h) {
    this._locales = {};
    for (const a in h)
      this._locales[a] = h[a];
  }
  addLocale(h, a) {
    this._locales[h] = a;
  }
  getLocale(h) {
    return this._locales[h];
  }
}
const At = { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Mon", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "I dag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny hendelse", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Rediger", icon_delete: "Slett", confirm_closing: "", confirm_deleting: "Hendelsen vil bli slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du forandre hele dette settet av repeterende hendelser?", section_recurring: "Repeter hendelsen", button_recurring: "Av", button_recurring_open: "På", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ukentlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "Alle hverdager", repeat_week: " Gjentas hver", repeat_text_week_count: "uke på:", repeat_radio_month_type: "På hver", repeat_radio_month_start: "På", repeat_text_month_day: "dag hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "på", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen sluttdato", repeat_text_occurences_count: "forekomst", repeat_radio_end3: "Stop den", repeat_radio_end2: "Etter", month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Sondag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, Ct = { date: { month_full: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"], day_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"] }, labels: { dhx_cal_today_button: "Vandaag", day_tab: "Dag", week_tab: "Week", month_tab: "Maand", new_event: "Nieuw item", icon_save: "Opslaan", icon_cancel: "Annuleren", icon_details: "Details", icon_edit: "Bewerken", icon_delete: "Verwijderen", confirm_closing: "", confirm_deleting: "Item zal permanent worden verwijderd, doorgaan?", section_description: "Beschrijving", section_time: "Tijd periode", full_day: "Hele dag", confirm_recurring: "Wilt u alle terugkerende items bijwerken?", section_recurring: "Item herhalen", button_recurring: "Uit", button_recurring_open: "Aan", button_edit_series: "Bewerk de serie", button_edit_occurrence: "Bewerk een kopie", agenda_tab: "Agenda", date: "Datum", description: "Omschrijving", year_tab: "Jaar", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagelijks", repeat_radio_week: "Wekelijks", repeat_radio_month: "Maandelijks", repeat_radio_year: "Jaarlijks", repeat_radio_day_type: "Elke", repeat_text_day_count: "dag(en)", repeat_radio_day_type2: "Elke werkdag", repeat_week: " Herhaal elke", repeat_text_week_count: "week op de volgende dagen:", repeat_radio_month_type: "Herhaal", repeat_radio_month_start: "Op", repeat_text_month_day: "dag iedere", repeat_text_month_count: "maanden", repeat_text_month_count2_before: "iedere", repeat_text_month_count2_after: "maanden", repeat_year_label: "Op", select_year_day2: "van", repeat_text_year_day: "dag", select_year_month: "maand", repeat_radio_end: "Geen eind datum", repeat_text_occurences_count: "keren", repeat_radio_end3: "Eindigd per", repeat_radio_end2: "Na", month_for_recurring: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], day_for_recurring: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"] } }, Tt = { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Endre", icon_delete: "Slett", confirm_closing: "Endringer blir ikke lagret, er du sikker?", confirm_deleting: "Oppføringen vil bli slettet, er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", full_day: "Full dag", confirm_recurring: "Vil du endre hele settet med repeterende oppføringer?", section_recurring: "Repeterende oppføring", button_recurring: "Ikke aktiv", button_recurring_open: "Aktiv", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute" } }, Ot = { date: { month_full: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"], month_short: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"], day_full: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"], day_short: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"] }, labels: { dhx_cal_today_button: "Dziś", day_tab: "Dzień", week_tab: "Tydzień", month_tab: "Miesiąc", new_event: "Nowe zdarzenie", icon_save: "Zapisz", icon_cancel: "Anuluj", icon_details: "Szczegóły", icon_edit: "Edytuj", icon_delete: "Usuń", confirm_closing: "", confirm_deleting: "Zdarzenie zostanie usunięte na zawsze, kontynuować?", section_description: "Opis", section_time: "Okres czasu", full_day: "Cały dzień", confirm_recurring: "Czy chcesz edytować cały zbiór powtarzających się zdarzeń?", section_recurring: "Powtórz zdarzenie", button_recurring: "Nieaktywne", button_recurring_open: "Aktywne", button_edit_series: "Edytuj serię", button_edit_occurrence: "Edytuj kopię", agenda_tab: "Agenda", date: "Data", description: "Opis", year_tab: "Rok", week_agenda_tab: "Agenda", grid_tab: "Tabela", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Codziennie", repeat_radio_week: "Co tydzie", repeat_radio_month: "Co miesic", repeat_radio_year: "Co rok", repeat_radio_day_type: "Kadego", repeat_text_day_count: "dnia", repeat_radio_day_type2: "Kadego dnia roboczego", repeat_week: " Powtarzaj kadego", repeat_text_week_count: "tygodnia w dni:", repeat_radio_month_type: "Powtrz", repeat_radio_month_start: "W", repeat_text_month_day: "dnia kadego", repeat_text_month_count: "miesica", repeat_text_month_count2_before: "kadego", repeat_text_month_count2_after: "miesica", repeat_year_label: "W", select_year_day2: "miesica", repeat_text_year_day: "dnia miesica", select_year_month: "", repeat_radio_end: "Bez daty kocowej", repeat_text_occurences_count: "wystpieniu/ach", repeat_radio_end3: "Zakocz w", repeat_radio_end2: "Po", month_for_recurring: ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Wrzenia", "Padziernka", "Listopada", "Grudnia"], day_for_recurring: ["Niedziela", "Poniedziaek", "Wtorek", "roda", "Czwartek", "Pitek", "Sobota"] } }, Lt = { date: { month_full: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], month_short: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], day_full: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"], day_short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"] }, labels: { dhx_cal_today_button: "Hoje", day_tab: "Dia", week_tab: "Semana", month_tab: "Mês", new_event: "Novo evento", icon_save: "Salvar", icon_cancel: "Cancelar", icon_details: "Detalhes", icon_edit: "Editar", icon_delete: "Deletar", confirm_closing: "", confirm_deleting: "Tem certeza que deseja excluir?", section_description: "Descrição", section_time: "Período de tempo", full_day: "Dia inteiro", confirm_recurring: "Deseja editar todos esses eventos repetidos?", section_recurring: "Repetir evento", button_recurring: "Desabilitar", button_recurring_open: "Habilitar", button_edit_series: "Editar a série", button_edit_occurrence: "Editar uma cópia", agenda_tab: "Dia", date: "Data", description: "Descrição", year_tab: "Ano", week_agenda_tab: "Dia", grid_tab: "Grade", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diário", repeat_radio_week: "Semanal", repeat_radio_month: "Mensal", repeat_radio_year: "Anual", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia(s)", repeat_radio_day_type2: "Cada trabalho diário", repeat_week: " Repita cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repetir", repeat_radio_month_start: "Em", repeat_text_month_day: "todo dia", repeat_text_month_count: "mês", repeat_text_month_count2_before: "todo", repeat_text_month_count2_after: "mês", repeat_year_label: "Em", select_year_day2: "of", repeat_text_year_day: "dia", select_year_month: "mês", repeat_radio_end: "Sem data final", repeat_text_occurences_count: "ocorrências", repeat_radio_end3: "Fim", repeat_radio_end2: "Depois", month_for_recurring: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], day_for_recurring: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] } }, Ht = { date: { month_full: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "November", "December"], month_short: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"], day_short: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"] }, labels: { dhx_cal_today_button: "Astazi", day_tab: "Zi", week_tab: "Saptamana", month_tab: "Luna", new_event: "Eveniment nou", icon_save: "Salveaza", icon_cancel: "Anuleaza", icon_details: "Detalii", icon_edit: "Editeaza", icon_delete: "Sterge", confirm_closing: "Schimbarile nu vor fi salvate, esti sigur?", confirm_deleting: "Evenimentul va fi sters permanent, esti sigur?", section_description: "Descriere", section_time: "Interval", full_day: "Toata ziua", confirm_recurring: "Vrei sa editezi toata seria de evenimente repetate?", section_recurring: "Repetare", button_recurring: "Dezactivata", button_recurring_open: "Activata", button_edit_series: "Editeaza serie", button_edit_occurrence: "Editeaza doar intrare", agenda_tab: "Agenda", date: "Data", description: "Descriere", year_tab: "An", week_agenda_tab: "Agenda", grid_tab: "Lista", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Zilnic", repeat_radio_week: "Saptamanal", repeat_radio_month: "Lunar", repeat_radio_year: "Anual", repeat_radio_day_type: "La fiecare", repeat_text_day_count: "zi(le)", repeat_radio_day_type2: "Fiecare zi lucratoare", repeat_week: " Repeta la fiecare", repeat_text_week_count: "saptamana in urmatoarele zile:", repeat_radio_month_type: "Repeta in", repeat_radio_month_start: "In a", repeat_text_month_day: "zi la fiecare", repeat_text_month_count: "luni", repeat_text_month_count2_before: "la fiecare", repeat_text_month_count2_after: "luni", repeat_year_label: "In", select_year_day2: "a lunii", repeat_text_year_day: "zi a lunii", select_year_month: "", repeat_radio_end: "Fara data de sfarsit", repeat_text_occurences_count: "evenimente", repeat_radio_end3: "La data", repeat_radio_end2: "Dupa", month_for_recurring: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"], day_for_recurring: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"] } }, $t = { date: { month_full: ["Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь", "Июль", "Август", "Сентябрь", "Oктябрь", "Ноябрь", "Декабрь"], month_short: ["Янв", "Фев", "Maр", "Aпр", "Maй", "Июн", "Июл", "Aвг", "Сен", "Окт", "Ноя", "Дек"], day_full: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сегодня", day_tab: "День", week_tab: "Неделя", month_tab: "Месяц", new_event: "Новое событие", icon_save: "Сохранить", icon_cancel: "Отменить", icon_details: "Детали", icon_edit: "Изменить", icon_delete: "Удалить", confirm_closing: "", confirm_deleting: "Событие будет удалено безвозвратно, продолжить?", section_description: "Описание", section_time: "Период времени", full_day: "Весь день", confirm_recurring: "Вы хотите изменить всю серию повторяющихся событий?", section_recurring: "Повторение", button_recurring: "Отключено", button_recurring_open: "Включено", button_edit_series: "Редактировать серию", button_edit_occurrence: "Редактировать экземпляр", agenda_tab: "Список", date: "Дата", description: "Описание", year_tab: "Год", week_agenda_tab: "Список", grid_tab: "Таблица", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Неделя", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Каждый", repeat_text_day_count: "день", repeat_radio_day_type2: "Каждый рабочий день", repeat_week: " Повторять каждую", repeat_text_week_count: "неделю , в:", repeat_radio_month_type: "Повторять", repeat_radio_month_start: "", repeat_text_month_day: " числа каждый ", repeat_text_month_count: "месяц", repeat_text_month_count2_before: "каждый ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без даты окончания", repeat_text_occurences_count: "повторений", repeat_radio_end3: "До ", repeat_radio_end2: "", month_for_recurring: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"], day_for_recurring: ["Воскресенье", "Понедельник", "Вторник", "Среду", "Четверг", "Пятницу", "Субботу"] } }, zt = { date: { month_full: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"], day_short: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"] }, labels: { dhx_cal_today_button: "Danes", day_tab: "Dan", week_tab: "Teden", month_tab: "Mesec", new_event: "Nov dogodek", icon_save: "Shrani", icon_cancel: "Prekliči", icon_details: "Podrobnosti", icon_edit: "Uredi", icon_delete: "Izbriši", confirm_closing: "", confirm_deleting: "Dogodek bo izbrisan. Želite nadaljevati?", section_description: "Opis", section_time: "Časovni okvir", full_day: "Ves dan", confirm_recurring: "Želite urediti celoten set ponavljajočih dogodkov?", section_recurring: "Ponovi dogodek", button_recurring: "Onemogočeno", button_recurring_open: "Omogočeno", button_edit_series: "Edit series", button_edit_occurrence: "Edit occurrence", agenda_tab: "Zadeva", date: "Datum", description: "Opis", year_tab: "Leto", week_agenda_tab: "Zadeva", grid_tab: "Miza", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute" } }, Pt = { date: { month_full: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sept", "Okt", "Nov", "Dec"], day_full: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"], day_short: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Deň", week_tab: "Týždeň", month_tab: "Mesiac", new_event: "Nová udalosť", icon_save: "Uložiť", icon_cancel: "Späť", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Zmazať", confirm_closing: "Vaše zmeny nebudú uložené. Skutočne?", confirm_deleting: "Udalosť bude natrvalo vymazaná. Skutočne?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Prajete si upraviť celú radu opakovaných udalostí?", section_recurring: "Opakovanie udalosti", button_recurring: "Vypnuté", button_recurring_open: "Zapnuté", button_edit_series: "Upraviť opakovania", button_edit_occurrence: "Upraviť inštancie", agenda_tab: "Program", date: "Dátum", description: "Poznámka", year_tab: "Rok", full_day: "Celý deň", week_agenda_tab: "Program", grid_tab: "Mriežka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denne", repeat_radio_week: "Týždenne", repeat_radio_month: "Mesaène", repeat_radio_year: "Roène", repeat_radio_day_type: "Každý", repeat_text_day_count: "deò", repeat_radio_day_type2: "Každý prac. deò", repeat_week: "Opakova každý", repeat_text_week_count: "týždeò v dòoch:", repeat_radio_month_type: "Opakova", repeat_radio_month_start: "On", repeat_text_month_day: "deò každý", repeat_text_month_count: "mesiac", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "mesiac", repeat_year_label: "On", select_year_day2: "poèas", repeat_text_year_day: "deò", select_year_month: "mesiac", repeat_radio_end: "Bez dátumu ukonèenia", repeat_text_occurences_count: "udalostiach", repeat_radio_end3: "Ukonèi", repeat_radio_end2: "Po", month_for_recurring: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], day_for_recurring: ["Nede¾a", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"] } }, jt = { date: { month_full: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"], day_short: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Vecka", month_tab: "Månad", new_event: "Ny händelse", icon_save: "Spara", icon_cancel: "Ångra", icon_details: "Detaljer", icon_edit: "Ändra", icon_delete: "Ta bort", confirm_closing: "", confirm_deleting: "Är du säker på att du vill ta bort händelsen permanent?", section_description: "Beskrivning", section_time: "Tid", full_day: "Hela dagen", confirm_recurring: "Vill du redigera hela serien med repeterande händelser?", section_recurring: "Upprepa händelse", button_recurring: "Inaktiverat", button_recurring_open: "Aktiverat", button_edit_series: "Redigera serien", button_edit_occurrence: "Redigera en kopia", agenda_tab: "Dagordning", date: "Datum", description: "Beskrivning", year_tab: "År", week_agenda_tab: "Dagordning", grid_tab: "Galler", drag_to_create: "Dra för att skapa ny", drag_to_move: "Dra för att flytta", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagligen", repeat_radio_week: "Veckovis", repeat_radio_month: "Månadsvis", repeat_radio_year: "Årligen", repeat_radio_day_type: "Var", repeat_text_day_count: "dag", repeat_radio_day_type2: "Varje arbetsdag", repeat_week: " Upprepa var", repeat_text_week_count: "vecka dessa dagar:", repeat_radio_month_type: "Upprepa", repeat_radio_month_start: "Den", repeat_text_month_day: "dagen var", repeat_text_month_count: "månad", repeat_text_month_count2_before: "var", repeat_text_month_count2_after: "månad", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "månad", repeat_radio_end: "Inget slutdatum", repeat_text_occurences_count: "upprepningar", repeat_radio_end3: "Sluta efter", repeat_radio_end2: "Efter", month_for_recurring: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], day_for_recurring: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"] } }, Vt = { date: { month_full: ["Ocak", "Þubat", "Mart", "Nisan", "Mayýs", "Haziran", "Temmuz", "Aðustos", "Eylül", "Ekim", "Kasým", "Aralýk"], month_short: ["Oca", "Þub", "Mar", "Nis", "May", "Haz", "Tem", "Aðu", "Eyl", "Eki", "Kas", "Ara"], day_full: ["Pazar", "Pazartes,", "Salý", "Çarþamba", "Perþembe", "Cuma", "Cumartesi"], day_short: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"] }, labels: { dhx_cal_today_button: "Bugün", day_tab: "Gün", week_tab: "Hafta", month_tab: "Ay", new_event: "Uygun", icon_save: "Kaydet", icon_cancel: "Ýptal", icon_details: "Detaylar", icon_edit: "Düzenle", icon_delete: "Sil", confirm_closing: "", confirm_deleting: "Etkinlik silinecek, devam?", section_description: "Açýklama", section_time: "Zaman aralýðý", full_day: "Tam gün", confirm_recurring: "Tüm tekrar eden etkinlikler silinecek, devam?", section_recurring: "Etkinliði tekrarla", button_recurring: "Pasif", button_recurring_open: "Aktif", button_edit_series: "Dizi düzenleme", button_edit_occurrence: "Bir kopyasını düzenleyin", agenda_tab: "Ajanda", date: "Tarih", description: "Açýklama", year_tab: "Yýl", week_agenda_tab: "Ajanda", grid_tab: "Izgara", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute" } }, It = { date: { month_full: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"], month_short: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"], day_full: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"], day_short: ["Нед", "Пон", "Вів", "Сер", "Чет", "Птн", "Суб"] }, labels: { dhx_cal_today_button: "Сьогодні", day_tab: "День", week_tab: "Тиждень", month_tab: "Місяць", new_event: "Нова подія", icon_save: "Зберегти", icon_cancel: "Відміна", icon_details: "Деталі", icon_edit: "Редагувати", icon_delete: "Вилучити", confirm_closing: "", confirm_deleting: "Подія вилучиться назавжди. Ви впевнені?", section_description: "Опис", section_time: "Часовий проміжок", full_day: "Весь день", confirm_recurring: "Хочете редагувати весь перелік повторюваних подій?", section_recurring: "Повторювана подія", button_recurring: "Відключено", button_recurring_open: "Включено", button_edit_series: "Редагувати серію", button_edit_occurrence: "Редагувати примірник", agenda_tab: "Перелік", date: "Дата", description: "Опис", year_tab: "Рік", week_agenda_tab: "Перелік", grid_tab: "Таблиця", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Тиждень", repeat_radio_month: "Місяць", repeat_radio_year: "Рік", repeat_radio_day_type: "Кожний", repeat_text_day_count: "день", repeat_radio_day_type2: "Кожний робочий день", repeat_week: " Повторювати кожен", repeat_text_week_count: "тиждень , по:", repeat_radio_month_type: "Повторювати", repeat_radio_month_start: "", repeat_text_month_day: " числа кожний ", repeat_text_month_count: "місяць", repeat_text_month_count2_before: "кожен ", repeat_text_month_count2_after: "місяць", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без дати закінчення", repeat_text_occurences_count: "повторень", repeat_radio_end3: "До ", repeat_radio_end2: "", month_for_recurring: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"], day_for_recurring: ["Неділям", "Понеділкам", "Вівторкам", "Середам", "Четвергам", "П'ятницям", "Суботам"] } };
class Rt {
  constructor(h, a, n = {}) {
    this.state = { date: /* @__PURE__ */ new Date(), modes: ["days", "months", "years"], currentRange: [], eventDates: [], currentModeIndex: 0, ...n }, this.container = null, this.element = null, this.onStateChangeHandlers = [], this.scheduler = h, this._domEvents = h._createDomEventScope(), this.state = this.getState(), we(this), a && (this.container = a, this.render(this.container)), this.onStateChange((_, r) => {
      this.callEvent("onStateChange", [r, _]);
    });
  }
  getState() {
    return { ...this.state, mode: this.state.modes[this.state.currentModeIndex] };
  }
  setState(h) {
    const a = { ...this.state };
    h.mode && (h.currentModeIndex = this.state.modes.indexOf(h.mode)), this.state = { ...this.state, ...h }, this._notifyStateChange(a, this.state), this.container && this.render(this.container);
  }
  onStateChange(h) {
    return this.onStateChangeHandlers.push(h), () => {
      const a = this.onStateChangeHandlers.indexOf(h);
      a !== -1 && this.onStateChangeHandlers.splice(a, 1);
    };
  }
  _notifyStateChange(h, a) {
    this.onStateChangeHandlers.forEach((n) => n(h, a));
  }
  _adjustDate(h) {
    const { mode: a, date: n } = this.getState(), _ = new Date(n);
    a === "days" ? _.setMonth(n.getMonth() + h) : a === "months" ? _.setFullYear(n.getFullYear() + h) : _.setFullYear(n.getFullYear() + 10 * h), this.setState({ date: _ });
  }
  _toggleMode() {
    const h = (this.state.currentModeIndex + 1) % this.state.modes.length;
    this.setState({ currentModeIndex: h });
  }
  _renderCalendarHeader(h) {
    const { mode: a, date: n } = this.getState(), _ = document.createElement("div");
    _.classList.add("dhx_cal_datepicker_header");
    const r = document.createElement("button");
    r.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_left"), _.appendChild(r);
    const l = document.createElement("div");
    if (l.classList.add("dhx_cal_datepicker_title"), a === "days")
      l.innerText = n.toLocaleString("default", { month: "long" }) + " " + n.getFullYear();
    else if (a === "months")
      l.innerText = n.getFullYear();
    else {
      const t = 10 * Math.floor(n.getFullYear() / 10);
      l.innerText = `${t} - ${t + 9}`;
    }
    this._domEvents.attach(l, "click", this._toggleMode.bind(this)), _.appendChild(l);
    const o = document.createElement("button");
    o.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_right"), _.appendChild(o), h.appendChild(_), this._domEvents.attach(r, "click", this._adjustDate.bind(this, -1)), this._domEvents.attach(o, "click", this._adjustDate.bind(this, 1));
  }
  render(h) {
    this._domEvents.detachAll(), this.container = h || this.container, this.container.innerHTML = "", this.element || (this.element = document.createElement("div"), this.element.classList.add("dhx_cal_datepicker")), this.element.innerHTML = "", this.container.appendChild(this.element), this._renderCalendarHeader(this.element);
    const a = document.createElement("div");
    a.classList.add("dhx_cal_datepicker_data"), this.element.appendChild(a);
    const { mode: n } = this.getState();
    n === "days" ? this._renderDayGrid(a) : n === "months" ? this._renderMonthGrid(a) : this._renderYearGrid(a);
  }
  _renderDayGridHeader(h) {
    const { date: a } = this.getState(), n = this.scheduler;
    let _ = n.date.week_start(new Date(a));
    const r = n.date.add(n.date.week_start(new Date(a)), 1, "week");
    h.classList.add("dhx_cal_datepicker_days");
    const l = n.date.date_to_str("%D");
    for (; _.valueOf() < r.valueOf(); ) {
      const o = l(_), t = document.createElement("div");
      t.setAttribute("data-day", _.getDay()), t.classList.add("dhx_cal_datepicker_dayname"), t.innerText = o, h.appendChild(t), _ = n.date.add(_, 1, "day");
    }
  }
  _weeksBetween(h, a) {
    const n = this.scheduler;
    let _ = 0, r = new Date(h);
    for (; r.valueOf() < a.valueOf(); )
      _ += 1, r = n.date.week_start(n.date.add(r, 1, "week"));
    return _;
  }
  _renderDayGrid(h) {
    const { date: a, currentRange: n, eventDates: _, minWeeks: r } = this.getState();
    let l = n[0], o = n[1];
    const t = _.reduce((f, v) => (f[this.scheduler.date.day_start(new Date(v)).valueOf()] = !0, f), {}), i = document.createElement("div");
    this._renderDayGridHeader(i), h.appendChild(i);
    const s = this.scheduler, c = s.date.week_start(s.date.month_start(new Date(a))), g = s.date.month_start(new Date(a)), y = s.date.add(s.date.month_start(new Date(a)), 1, "month");
    let m = s.date.add(s.date.month_start(new Date(a)), 1, "month");
    m.getDay() !== 0 && (m = s.date.add(s.date.week_start(m), 1, "week"));
    let u = this._weeksBetween(c, m);
    r && u < r && (m = s.date.add(m, r - u, "week"));
    let p = c;
    const d = document.createElement("div");
    for (d.classList.add("dhx_cal_datepicker_days"), this._domEvents.attach(d, "click", (f) => {
      const v = f.target.closest("[data-cell-date]"), x = new Date(v.getAttribute("data-cell-date"));
      this.callEvent("onDateClick", [x, f]);
    }); p.valueOf() < m.valueOf(); ) {
      const f = document.createElement("div");
      f.setAttribute("data-cell-date", s.templates.format_date(p)), f.setAttribute("data-day", p.getDay()), f.innerHTML = p.getDate(), p.valueOf() < g.valueOf() ? f.classList.add("dhx_before") : p.valueOf() >= y.valueOf() && f.classList.add("dhx_after"), p.getDay() !== 0 && p.getDay() !== 6 || f.classList.add("dhx_cal_datepicker_weekend"), l && o && p.valueOf() >= l.valueOf() && p.valueOf() < o.valueOf() && f.classList.add("dhx_cal_datepicker_current"), t[p.valueOf()] && f.classList.add("dhx_cal_datepicker_event"), f.classList.add("dhx_cal_datepicker_date"), d.appendChild(f), p = s.date.add(p, 1, "day");
    }
    h.appendChild(d);
  }
  _renderMonthGrid(h) {
    const { date: a } = this.getState(), n = document.createElement("div");
    n.classList.add("dhx_cal_datepicker_months");
    const _ = [];
    for (let t = 0; t < 12; t++)
      _.push(new Date(a.getFullYear(), t, 1));
    const r = this.scheduler.date.date_to_str("%M");
    _.forEach((t) => {
      const i = document.createElement("div");
      i.classList.add("dhx_cal_datepicker_month"), a.getMonth() === t.getMonth() && i.classList.add("dhx_cal_datepicker_current"), i.setAttribute("data-month", t.getMonth()), i.innerHTML = r(t), this._domEvents.attach(i, "click", () => {
        const s = new Date(t);
        this.setState({ date: s, mode: "days" });
      }), n.appendChild(i);
    }), h.appendChild(n);
    const l = document.createElement("div");
    l.classList.add("dhx_cal_datepicker_done");
    const o = document.createElement("button");
    o.innerText = "Done", o.classList.add("dhx_cal_datepicker_done_btn"), this._domEvents.attach(o, "click", () => {
      this.setState({ mode: "days" });
    }), l.appendChild(o), h.appendChild(l);
  }
  _renderYearGrid(h) {
    const { date: a } = this.getState(), n = 10 * Math.floor(a.getFullYear() / 10), _ = document.createElement("div");
    _.classList.add("dhx_cal_datepicker_years");
    for (let o = n - 1; o <= n + 10; o++) {
      const t = document.createElement("div");
      t.innerText = o, t.classList.add("dhx_cal_datepicker_year"), t.setAttribute("data-year", o), a.getFullYear() === o && t.classList.add("dhx_cal_datepicker_current"), this._domEvents.attach(t, "click", () => {
        this.setState({ date: new Date(o, a.getMonth(), 1), mode: "months" });
      }), _.appendChild(t);
    }
    h.appendChild(_);
    const r = document.createElement("div");
    r.classList.add("dhx_cal_datepicker_done");
    const l = document.createElement("button");
    l.innerText = "Done", l.classList.add("dhx_cal_datepicker_done_btn"), this._domEvents.attach(l, "click", () => {
      this.setState({ mode: "months" });
    }), r.appendChild(l), h.appendChild(r);
  }
  destructor() {
    this.onStateChangeHandlers = [], this.element && (this.element.innerHTML = "", this.element.remove()), this._domEvents.detachAll(), this.callEvent("onDestroy", []), this.detachAllEvents(), this.scheduler = null;
  }
}
function Bt(e) {
  const h = { version: "7.0.4" };
  (function(t) {
    var i = { agenda: "https://docs.dhtmlx.com/scheduler/agenda_view.html", grid: "https://docs.dhtmlx.com/scheduler/grid_view.html", map: "https://docs.dhtmlx.com/scheduler/map_view.html", unit: "https://docs.dhtmlx.com/scheduler/units_view.html", timeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html", week_agenda: "https://docs.dhtmlx.com/scheduler/weekagenda_view.html", year: "https://docs.dhtmlx.com/scheduler/year_view.html", anythingElse: "https://docs.dhtmlx.com/scheduler/views.html" }, s = { agenda: "ext/dhtmlxscheduler_agenda_view.js", grid: "ext/dhtmlxscheduler_grid_view.js", map: "ext/dhtmlxscheduler_map_view.js", unit: "ext/dhtmlxscheduler_units.js", timeline: "ext/dhtmlxscheduler_timeline.js, ext/dhtmlxscheduler_treetimeline.js, ext/dhtmlxscheduler_daytimeline.js", week_agenda: "ext/dhtmlxscheduler_week_agenda.js", year: "ext/dhtmlxscheduler_year_view.js", limit: "ext/dhtmlxscheduler_limit.js" };
    t._commonErrorMessages = { unknownView: function(c) {
      var g = s[c] ? "You're probably missing " + s[c] + "." : "";
      return "`" + c + "` view is not defined. \nPlease check parameters you pass to `scheduler.init` or `scheduler.setCurrentView` in your code and ensure you've imported appropriate extensions. \nRelated docs: " + (i[c] || i.anythingElse) + `
` + (g ? g + `
` : "");
    }, collapsedContainer: function(c) {
      return `Scheduler container height is set to *100%* but the rendered height is zero and the scheduler is not visible. 
Make sure that the container has some initial height or use different units. For example:
<div id='scheduler_here' class='dhx_cal_container' style='width:100%; height:600px;'> 
`;
    } }, t.createTimelineView = function() {
      throw new Error("scheduler.createTimelineView is not implemented. Be sure to add the required extension: " + s.timeline + `
Related docs: ` + i.timeline);
    }, t.createUnitsView = function() {
      throw new Error("scheduler.createUnitsView is not implemented. Be sure to add the required extension: " + s.unit + `
Related docs: ` + i.unit);
    }, t.createGridView = function() {
      throw new Error("scheduler.createGridView is not implemented. Be sure to add the required extension: " + s.grid + `
Related docs: ` + i.grid);
    }, t.addMarkedTimespan = function() {
      throw new Error(`scheduler.addMarkedTimespan is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_limit.js
Related docs: https://docs.dhtmlx.com/scheduler/limits.html`);
    }, t.renderCalendar = function() {
      throw new Error(`scheduler.renderCalendar is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_minical.js
https://docs.dhtmlx.com/scheduler/minicalendar.html`);
    }, t.exportToPNG = function() {
      throw new Error(["scheduler.exportToPNG is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/png.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join(`
`));
    }, t.exportToPDF = function() {
      throw new Error(["scheduler.exportToPDF is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/pdf.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join(`
`));
    };
  })(h), Ge(h), function(t) {
    we(t), Ue(t), t._detachDomEvent = function(u, p, d) {
      u.removeEventListener ? u.removeEventListener(p, d, !1) : u.detachEvent && u.detachEvent("on" + p, d);
    }, t._init_once = function() {
      Xe(t), t._init_once = function() {
      };
    };
    const i = { render: function(u) {
      return t._init_nav_bar(u);
    } }, s = { render: function(u) {
      const p = document.createElement("div");
      return p.className = "dhx_cal_header", p;
    } }, c = { render: function(u) {
      const p = document.createElement("div");
      return p.className = "dhx_cal_data", p;
    } };
    function g(u) {
      return !!(u.querySelector(".dhx_cal_header") && u.querySelector(".dhx_cal_data") && u.querySelector(".dhx_cal_navline"));
    }
    t.init = function(u, p, d) {
      if (!this.$destroyed) {
        if (p = p || t._currentDate(), d = d || "week", this._obj && this.unset_actions(), this._obj = typeof u == "string" ? document.getElementById(u) : u, this.$container = this._obj, this.$root = this._obj, !this.$container.offsetHeight && this.$container.offsetWidth && this.$container.style.height === "100%" && window.console.error(t._commonErrorMessages.collapsedContainer(), this.$container), this.config.wai_aria_attributes && this.config.wai_aria_application_role && this.$container.setAttribute("role", "application"), this.config.header || g(this.$container) || (this.config.header = function(f) {
          const v = ["day", "week", "month"];
          if (f.matrix)
            for (const x in f.matrix)
              v.push(x);
          if (f._props)
            for (const x in f._props)
              v.push(x);
          if (f._grid && f._grid.names)
            for (const x in f._grid.names)
              v.push(x);
          return ["map", "agenda", "week_agenda", "year"].forEach(function(x) {
            f[x + "_view"] && v.push(x);
          }), v.concat(["date"]).concat(["prev", "today", "next"]);
        }(this), window.console.log(["Required DOM elements are missing from the scheduler container and **scheduler.config.header** is not specified.", "Using a default header configuration: ", "scheduler.config.header = " + JSON.stringify(this.config.header, null, 2), "Check this article for the details: https://docs.dhtmlx.com/scheduler/initialization.html"].join(`
`))), this.config.header)
          this.$container.innerHTML = "", this.$container.classList.add("dhx_cal_container"), this.config.header.height && (this.xy.nav_height = this.config.header.height), this.$container.appendChild(i.render(this.config.header)), this.$container.appendChild(s.render()), this.$container.appendChild(c.render());
        else if (!g(this.$container))
          throw new Error(["Required DOM elements are missing from the scheduler container.", "Be sure to either specify them manually in the markup: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviamarkup", "Or to use **scheduler.config.header** setting so they could be created automatically: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviaheaderconfig"].join(`
`));
        this.config.rtl && (this.$container.className += " dhx_cal_container_rtl"), this._skin_init && t._skin_init(), t.date.init(), this._scroll = !0, this._els = [], this.get_elements(), this.init_templates(), this.set_actions(), this._init_once(), this._init_touch_events(), this.set_sizes(), t.callEvent("onSchedulerReady", []), t.$initialized = !0, this.setCurrentView(p, d);
      }
    }, t.xy = { min_event_height: 20, bar_height: 24, scale_width: 50, scroll_width: 18, scale_height: 20, month_scale_height: 20, menu_width: 25, margin_top: 0, margin_left: 0, editor_width: 140, month_head_height: 22, event_header_height: 14 }, t.keys = { edit_save: 13, edit_cancel: 27 }, t.bind = function(u, p) {
      return u.bind ? u.bind(p) : function() {
        return u.apply(p, arguments);
      };
    }, t.set_sizes = function() {
      var u = this._x = this._obj.clientWidth - this.xy.margin_left, p = this._table_view ? 0 : this.xy.scale_width + this.xy.scroll_width, d = this.$container.querySelector(".dhx_cal_scale_placeholder");
      t._is_material_skin() ? (d || ((d = document.createElement("div")).className = "dhx_cal_scale_placeholder", this.$container.insertBefore(d, this._els.dhx_cal_header[0])), d.style.display = "block", this.set_xy(d, u, this.xy.scale_height + 1, 0, this._els.dhx_cal_header[0].offsetTop)) : d && d.parentNode.removeChild(d), this._lightbox && (t.$container.offsetWidth < 1200 || this._setLbPosition(document.querySelector(".dhx_cal_light"))), this._data_width = u - p, this._els.dhx_cal_navline[0].style.width = u + "px";
      const f = this._els.dhx_cal_header[0];
      this.set_xy(f, this._data_width, this.xy.scale_height), f.style.left = "", f.style.right = "", this._table_view ? this.config.rtl ? f.style.right = "-1px" : f.style.left = "-1px" : this.config.rtl ? f.style.right = `${this.xy.scale_width}px` : f.style.left = `${this.xy.scale_width}px`;
    }, t.set_xy = function(u, p, d, f, v) {
      function x(w) {
        let k = w;
        return isNaN(Number(k)) || (k = Math.max(0, k) + "px"), k;
      }
      var b = "left";
      p !== void 0 && (u.style.width = x(p)), d !== void 0 && (u.style.height = x(d)), arguments.length > 3 && (f !== void 0 && (this.config.rtl && (b = "right"), u.style[b] = f + "px"), v !== void 0 && (u.style.top = v + "px"));
    }, t.get_elements = function() {
      const u = this._obj.getElementsByTagName("DIV");
      for (let p = 0; p < u.length; p++) {
        let d = t._getClassName(u[p]);
        const f = u[p].getAttribute("data-tab") || u[p].getAttribute("name") || "";
        d && (d = d.split(" ")[0]), this._els[d] || (this._els[d] = []), this._els[d].push(u[p]);
        let v = t.locale.labels[f + "_tab"] || t.locale.labels[f || d];
        typeof v != "string" && f && !u[p].innerHTML && (v = f.split("_")[0]), v && (this._waiAria.labelAttr(u[p], v), u[p].innerHTML = v);
      }
    };
    const y = t._createDomEventScope();
    function m(u, p) {
      const d = new Date(u), f = (new Date(p).getTime() - d.getTime()) / 864e5;
      return Math.abs(f);
    }
    t.unset_actions = function() {
      y.detachAll();
    }, t.set_actions = function() {
      for (const u in this._els)
        if (this._click[u])
          for (let p = 0; p < this._els[u].length; p++) {
            const d = this._els[u][p], f = this._click[u].bind(d);
            y.attach(d, "click", f);
          }
      y.attach(this._obj, "selectstart", function(u) {
        return u.preventDefault(), !1;
      }), y.attach(this._obj, "mousemove", function(u) {
        t._temp_touch_block || t._on_mouse_move(u);
      }), y.attach(this._obj, "mousedown", function(u) {
        t._ignore_next_click || t._on_mouse_down(u);
      }), y.attach(this._obj, "mouseup", function(u) {
        t._ignore_next_click || t._on_mouse_up(u);
      }), y.attach(this._obj, "dblclick", function(u) {
        t._on_dbl_click(u);
      }), y.attach(this._obj, "contextmenu", function(u) {
        return t.checkEvent("onContextMenu") && u.preventDefault(), t.callEvent("onContextMenu", [t._locate_event(u.target), u]);
      });
    }, t.select = function(u) {
      this._select_id != u && (t._close_not_saved(), this.editStop(!1), this._select_id && this.unselect(), this._select_id = u, this.updateEvent(u), this.callEvent("onEventSelected", [u]));
    }, t.unselect = function(u) {
      if (u && u != this._select_id)
        return;
      const p = this._select_id;
      this._select_id = null, p && this.getEvent(p) && this.updateEvent(p), this.callEvent("onEventUnselected", [p]);
    }, t.getState = function() {
      return { mode: this._mode, date: new Date(this._date), min_date: new Date(this._min_date), max_date: new Date(this._max_date), editor_id: this._edit_id, lightbox_id: this._lightbox_id, new_event: this._new_event, select_id: this._select_id, expanded: this.expanded, drag_id: this._drag_id, drag_mode: this._drag_mode };
    }, t._click = { dhx_cal_data: function(u) {
      if (t._ignore_next_click)
        return u.preventDefault && u.preventDefault(), u.cancelBubble = !0, t._ignore_next_click = !1, !1;
      const p = t._locate_event(u.target);
      if (p) {
        if (!t.callEvent("onClick", [p, u]) || t.config.readonly)
          return;
      } else
        t.callEvent("onEmptyClick", [t.getActionData(u).date, u]);
      if (p && t.config.select) {
        t.select(p);
        const d = u.target.closest(".dhx_menu_icon"), f = t._getClassName(d);
        f.indexOf("_icon") != -1 && t._click.buttons[f.split(" ")[1].replace("icon_", "")](p);
      } else
        t._close_not_saved(), t.getState().select_id && (/* @__PURE__ */ new Date()).valueOf() - (t._new_event || 0) > 500 && t.unselect();
    }, dhx_cal_prev_button: function() {
      t._click.dhx_cal_next_button(0, -1);
    }, dhx_cal_next_button: function(u, p) {
      let d = 1;
      t.config.rtl && (p = -p, d = -d), t.setCurrentView(t.date.add(t.date[t._mode + "_start"](new Date(t._date)), p || d, t._mode));
    }, dhx_cal_today_button: function() {
      t.callEvent("onBeforeTodayDisplayed", []) && t.setCurrentView(t._currentDate());
    }, dhx_cal_tab: function() {
      const u = this.getAttribute("data-tab"), p = this.getAttribute("name"), d = u || p.substring(0, p.search("_tab"));
      t.setCurrentView(t._date, d);
    }, buttons: { delete: function(u) {
      const p = t.locale.labels.confirm_deleting;
      t._dhtmlx_confirm({ message: p, title: t.locale.labels.title_confirm_deleting, callback: function() {
        t.deleteEvent(u);
      }, config: { ok: t.locale.labels.icon_delete } });
    }, edit: function(u) {
      t.edit(u);
    }, save: function(u) {
      t.editStop(!0);
    }, details: function(u) {
      t.showLightbox(u);
    }, form: function(u) {
      t.showLightbox(u);
    }, cancel: function(u) {
      t.editStop(!1);
    } } }, t._dhtmlx_confirm = function({ message: u, title: p, callback: d, config: f }) {
      if (!u)
        return d();
      f = f || {};
      const v = { ...f, text: u };
      p && (v.title = p), d && (v.callback = function(x) {
        x && d();
      }), t.confirm(v);
    }, t.addEventNow = function(u, p, d) {
      let f = {};
      t._isObject(u) && !t._isDate(u) && (f = u, u = null);
      const v = 6e4 * (this.config.event_duration || this.config.time_step);
      u || (u = f.start_date || Math.round(t._currentDate().valueOf() / v) * v);
      let x = new Date(u);
      if (!p) {
        let k = this.config.first_hour;
        k > x.getHours() && (x.setHours(k), u = x.valueOf()), p = u.valueOf() + v;
      }
      let b = new Date(p);
      x.valueOf() == b.valueOf() && b.setTime(b.valueOf() + v), f.start_date = f.start_date || x, f.end_date = f.end_date || b, f.text = f.text || this.locale.labels.new_event, f.id = this._drag_id = f.id || this.uid(), this._drag_mode = "new-size", this._loading = !0;
      const w = this.addEvent(f);
      return this.callEvent("onEventCreated", [this._drag_id, d]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(d), w;
    }, t._on_dbl_click = function(u, p) {
      if (p = p || u.target, this.config.readonly)
        return;
      const d = t._getClassName(p).split(" ")[0];
      switch (d) {
        case "dhx_scale_holder":
        case "dhx_scale_holder_now":
        case "dhx_month_body":
        case "dhx_wa_day_data":
          if (!t.config.dblclick_create)
            break;
          this.addEventNow(this.getActionData(u).date, null, u);
          break;
        case "dhx_cal_event":
        case "dhx_wa_ev_body":
        case "dhx_agenda_line":
        case "dhx_cal_agenda_event_line":
        case "dhx_grid_event":
        case "dhx_cal_event_line":
        case "dhx_cal_event_clear": {
          const f = this._locate_event(p);
          if (!this.callEvent("onDblClick", [f, u]))
            return;
          this.config.details_on_dblclick || this._table_view || !this.getEvent(f)._timed || !this.config.select ? this.showLightbox(f) : this.edit(f);
          break;
        }
        case "dhx_time_block":
        case "dhx_cal_container":
          return;
        default: {
          const f = this["dblclick_" + d];
          if (f)
            f.call(this, u);
          else if (p.parentNode && p != this)
            return t._on_dbl_click(u, p.parentNode);
          break;
        }
      }
    }, t._get_column_index = function(u) {
      let p = 0;
      if (this._cols) {
        let d = 0, f = 0;
        for (; d + this._cols[f] < u && f < this._cols.length; )
          d += this._cols[f], f++;
        if (p = f + (this._cols[f] ? (u - d) / this._cols[f] : 0), this._ignores && p >= this._cols.length)
          for (; p >= 1 && this._ignores[Math.floor(p)]; )
            p--;
      }
      return p;
    }, t._week_indexes_from_pos = function(u) {
      if (this._cols) {
        const p = this._get_column_index(u.x);
        return u.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(p) - 1)), u.y = Math.max(0, Math.ceil(60 * u.y / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step), u;
      }
      return u;
    }, t._mouse_coords = function(u) {
      let p;
      const d = document.body, f = document.documentElement;
      p = this.$env.isIE || !u.pageX && !u.pageY ? { x: u.clientX + (d.scrollLeft || f.scrollLeft || 0) - d.clientLeft, y: u.clientY + (d.scrollTop || f.scrollTop || 0) - d.clientTop } : { x: u.pageX, y: u.pageY }, this.config.rtl && this._colsS ? (p.x = this.$container.querySelector(".dhx_cal_data").offsetWidth - p.x, p.x += this.$domHelpers.getAbsoluteLeft(this._obj), this._mode !== "month" && (p.x -= this.xy.scale_width)) : p.x -= this.$domHelpers.getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width);
      const v = this.$container.querySelector(".dhx_cal_data");
      p.y -= this.$domHelpers.getAbsoluteTop(v) - this._els.dhx_cal_data[0].scrollTop, p.ev = u;
      const x = this["mouse_" + this._mode];
      if (x)
        p = x.call(this, p);
      else if (this._table_view) {
        const b = this._get_column_index(p.x);
        if (!this._cols || !this._colsS)
          return p;
        let w = 0;
        for (w = 1; w < this._colsS.heights.length && !(this._colsS.heights[w] > p.y); w++)
          ;
        p.y = Math.ceil(24 * (Math.max(0, b) + 7 * Math.max(0, w - 1)) * 60 / this.config.time_step), (t._drag_mode || this._mode == "month") && (p.y = 24 * (Math.max(0, Math.ceil(b) - 1) + 7 * Math.max(0, w - 1)) * 60 / this.config.time_step), this._drag_mode == "move" && t._ignores_detected && t.config.preserve_length && (p._ignores = !0, this._drag_event._event_length || (this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, { x_step: 1, x_unit: "day" }))), p.x = 0;
      } else
        p = this._week_indexes_from_pos(p);
      return p.timestamp = +/* @__PURE__ */ new Date(), p;
    }, t._close_not_saved = function() {
      if ((/* @__PURE__ */ new Date()).valueOf() - (t._new_event || 0) > 500 && t._edit_id) {
        const u = t.locale.labels.confirm_closing;
        t._dhtmlx_confirm({ message: u, title: t.locale.labels.title_confirm_closing, callback: function() {
          t.editStop(t.config.positive_closing);
        } }), u && (this._drag_id = this._drag_pos = this._drag_mode = null);
      }
    }, t._correct_shift = function(u, p) {
      return u - 6e4 * (new Date(t._min_date).getTimezoneOffset() - new Date(u).getTimezoneOffset()) * (p ? -1 : 1);
    }, t._is_pos_changed = function(u, p) {
      function d(f, v, x) {
        return Math.abs(f - v) > x;
      }
      return !u || !this._drag_pos || !!(this._drag_pos.has_moved || !this._drag_pos.timestamp || p.timestamp - this._drag_pos.timestamp > 100 || d(u.ev.clientX, p.ev.clientX, 5) || d(u.ev.clientY, p.ev.clientY, 5));
    }, t._correct_drag_start_date = function(u) {
      let p;
      t.matrix && (p = t.matrix[t._mode]), p = p || { x_step: 1, x_unit: "day" }, u = new Date(u);
      let d = 1;
      return (p._start_correction || p._end_correction) && (d = 60 * (p.last_hour || 0) - (60 * u.getHours() + u.getMinutes()) || 1), 1 * u + (t._get_fictional_event_length(u, d, p) - d);
    }, t._correct_drag_end_date = function(u, p) {
      let d;
      t.matrix && (d = t.matrix[t._mode]), d = d || { x_step: 1, x_unit: "day" };
      const f = 1 * u + t._get_fictional_event_length(u, p, d);
      return new Date(1 * f - (t._get_fictional_event_length(f, -1, d, -1) + 1));
    }, t._on_mouse_move = function(u) {
      if (this._drag_mode) {
        var p = this._mouse_coords(u);
        if (this._is_pos_changed(this._drag_pos, p)) {
          var d, f;
          if (this._edit_id != this._drag_id && this._close_not_saved(), !this._drag_mode)
            return;
          var v = null;
          if (this._drag_pos && !this._drag_pos.has_moved && ((v = this._drag_pos).has_moved = !0), this._drag_pos = p, this._drag_pos.has_moved = !0, this._drag_mode == "create") {
            if (v && (p = v), this._close_not_saved(), this.unselect(this._select_id), this._loading = !0, d = this._get_date_from_pos(p).valueOf(), !this._drag_start)
              return this.callEvent("onBeforeEventCreated", [u, this._drag_id]) ? (this._loading = !1, void (this._drag_start = d)) : void (this._loading = !1);
            f = d, this._drag_start;
            var x = new Date(this._drag_start), b = new Date(f);
            this._mode != "day" && this._mode != "week" || x.getHours() != b.getHours() || x.getMinutes() != b.getMinutes() || (b = new Date(this._drag_start + 1e3)), this._drag_id = this.uid(), this.addEvent(x, b, this.locale.labels.new_event, this._drag_id, p.fields), this.callEvent("onEventCreated", [this._drag_id, u]), this._loading = !1, this._drag_mode = "new-size";
          }
          var w, k = this.config.time_step, E = this.getEvent(this._drag_id);
          if (t.matrix && (w = t.matrix[t._mode]), w = w || { x_step: 1, x_unit: "day" }, this._drag_mode == "move")
            d = this._min_date.valueOf() + 6e4 * (p.y * this.config.time_step + 24 * p.x * 60), !p.custom && this._table_view && (d += 1e3 * this.date.time_part(E.start_date)), !this._table_view && this._dragEventBody && this._drag_event._move_event_shift === void 0 && (this._drag_event._move_event_shift = d - E.start_date), this._drag_event._move_event_shift && (d -= this._drag_event._move_event_shift), d = this._correct_shift(d), p._ignores && this.config.preserve_length && this._table_view && w ? (d = t._correct_drag_start_date(d), f = t._correct_drag_end_date(d, this._drag_event._event_length)) : f = E.end_date.valueOf() - (E.start_date.valueOf() - d);
          else {
            if (d = E.start_date.valueOf(), f = E.end_date.valueOf(), this._table_view) {
              var D = this._min_date.valueOf() + p.y * this.config.time_step * 6e4 + (p.custom ? 0 : 864e5);
              if (this._mode == "month")
                if (D = this._correct_shift(D, !1), this._drag_from_start) {
                  var S = 864e5;
                  D <= t.date.date_part(new Date(f + S - 1)).valueOf() && (d = D - S);
                } else
                  f = D;
              else
                this.config.preserve_length ? p.resize_from_start ? d = t._correct_drag_start_date(D) : f = t._correct_drag_end_date(D, 0) : p.resize_from_start ? d = D : f = D;
            } else {
              var N = this.date.date_part(new Date(E.end_date.valueOf() - 1)).valueOf(), M = new Date(N), A = this.config.first_hour, C = 60 / k * (this.config.last_hour - A);
              this.config.time_step = 1;
              var T = this._mouse_coords(u);
              this.config.time_step = k;
              var O = p.y * k * 6e4, L = Math.min(p.y + 1, C) * k * 6e4, $ = 6e4 * T.y;
              f = Math.abs(O - $) > Math.abs(L - $) ? N + L : N + O, f += 6e4 * (new Date(f).getTimezoneOffset() - M.getTimezoneOffset()), this._els.dhx_cal_data[0].style.cursor = "s-resize", this._mode != "week" && this._mode != "day" || (f = this._correct_shift(f));
            }
            if (this._drag_mode == "new-size")
              if (f <= this._drag_start) {
                var z = p.shift || (this._table_view && !p.custom ? 864e5 : 0);
                d = f - (p.shift ? 0 : z), f = this._drag_start + (z || 6e4 * k);
              } else
                d = this._drag_start;
            else
              f <= d && (f = d + 6e4 * k);
          }
          var j = new Date(f - 1), P = new Date(d);
          if (this._drag_mode == "move" && t.config.limit_drag_out && (+P < +t._min_date || +f > +t._max_date)) {
            if (+E.start_date < +t._min_date || +E.end_date > +t._max_date)
              P = new Date(E.start_date), f = new Date(E.end_date);
            else {
              var I = f - P;
              +P < +t._min_date ? (P = new Date(t._min_date), p._ignores && this.config.preserve_length && this._table_view ? (P = new Date(t._correct_drag_start_date(P)), w._start_correction && (P = new Date(P.valueOf() + w._start_correction)), f = new Date(1 * P + this._get_fictional_event_length(P, this._drag_event._event_length, w))) : f = new Date(+P + I)) : (f = new Date(t._max_date), p._ignores && this.config.preserve_length && this._table_view ? (w._end_correction && (f = new Date(f.valueOf() - w._end_correction)), f = new Date(1 * f - this._get_fictional_event_length(f, 0, w, !0)), P = new Date(1 * f - this._get_fictional_event_length(f, this._drag_event._event_length, w, !0)), this._ignores_detected && (P = t.date.add(P, w.x_step, w.x_unit), f = new Date(1 * f - this._get_fictional_event_length(f, 0, w, !0)), f = t.date.add(f, w.x_step, w.x_unit))) : P = new Date(+f - I));
            }
            j = new Date(f - 1);
          }
          if (!this._table_view && this._dragEventBody && !t.config.all_timed && (!t._get_section_view() && p.x != this._get_event_sday({ start_date: new Date(d), end_date: new Date(d) }) || new Date(d).getHours() < this.config.first_hour) && (I = f - P, this._drag_mode == "move" && (S = this._min_date.valueOf() + 24 * p.x * 60 * 6e4, (P = new Date(S)).setHours(this.config.first_hour), f = new Date(P.valueOf() + I), j = new Date(f - 1))), this._table_view || t.config.all_timed || !(!t.getView() && p.x != this._get_event_sday({ start_date: new Date(f), end_date: new Date(f) }) || new Date(f).getHours() >= this.config.last_hour) || (I = f - P, S = this._min_date.valueOf() + 24 * p.x * 60 * 6e4, (f = t.date.date_part(new Date(S))).setHours(this.config.last_hour), j = new Date(f - 1), this._drag_mode == "move" && (P = new Date(+f - I))), this._table_view || j.getDate() == P.getDate() && j.getHours() < this.config.last_hour || t._allow_dnd)
            if (E.start_date = P, E.end_date = new Date(f), this.config.update_render) {
              var Y = t._els.dhx_cal_data[0].scrollTop;
              this.update_view(), t._els.dhx_cal_data[0].scrollTop = Y;
            } else
              this.updateEvent(this._drag_id);
          this._table_view && this.for_rendered(this._drag_id, function(B) {
            B.className += " dhx_in_move dhx_cal_event_drag";
          }), this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, u]);
        }
      } else if (t.checkEvent("onMouseMove")) {
        var W = this._locate_event(u.target || u.srcElement);
        this.callEvent("onMouseMove", [W, u]);
      }
    }, t._on_mouse_down = function(u, p) {
      if (u.button != 2 && !this.config.readonly && !this._drag_mode) {
        p = p || u.target || u.srcElement;
        var d = t._getClassName(p).split(" ")[0];
        switch (this.config.drag_event_body && d == "dhx_body" && p.parentNode && p.parentNode.className.indexOf("dhx_cal_select_menu") === -1 && (d = "dhx_event_move", this._dragEventBody = !0), d) {
          case "dhx_cal_event_line":
          case "dhx_cal_event_clear":
            this._table_view && (this._drag_mode = "move");
            break;
          case "dhx_event_move":
          case "dhx_wa_ev_body":
            this._drag_mode = "move";
            break;
          case "dhx_event_resize":
            this._drag_mode = "resize", t._getClassName(p).indexOf("dhx_event_resize_end") < 0 ? t._drag_from_start = !0 : t._drag_from_start = !1;
            break;
          case "dhx_scale_holder":
          case "dhx_scale_holder_now":
          case "dhx_month_body":
          case "dhx_matrix_cell":
          case "dhx_marked_timespan":
            this._drag_mode = "create";
            break;
          case "":
            if (p.parentNode)
              return t._on_mouse_down(u, p.parentNode);
            break;
          default:
            if ((!t.checkEvent("onMouseDown") || t.callEvent("onMouseDown", [d, u])) && p.parentNode && p != this && d != "dhx_body")
              return t._on_mouse_down(u, p.parentNode);
            this._drag_mode = null, this._drag_id = null;
        }
        if (this._drag_mode) {
          var f = this._locate_event(p);
          if (this.config["drag_" + this._drag_mode] && this.callEvent("onBeforeDrag", [f, this._drag_mode, u])) {
            if (this._drag_id = f, (this._edit_id != this._drag_id || this._edit_id && this._drag_mode == "create") && this._close_not_saved(), !this._drag_mode)
              return;
            this._drag_event = t._lame_clone(this.getEvent(this._drag_id) || {}), this._drag_pos = this._mouse_coords(u);
          } else
            this._drag_mode = this._drag_id = 0;
        }
        this._drag_start = null;
      }
    }, t._get_private_properties = function(u) {
      var p = {};
      for (var d in u)
        d.indexOf("_") === 0 && (p[d] = !0);
      return p;
    }, t._clear_temporary_properties = function(u, p) {
      var d = this._get_private_properties(u), f = this._get_private_properties(p);
      for (var v in f)
        d[v] || delete p[v];
    }, t._on_mouse_up = function(u) {
      if (!u || u.button != 2 || !this._mobile) {
        if (this._drag_mode && this._drag_id) {
          this._els.dhx_cal_data[0].style.cursor = "default";
          var p = this._drag_id, d = this._drag_mode, f = !this._drag_pos || this._drag_pos.has_moved;
          delete this._drag_event._move_event_shift;
          var v = this.getEvent(this._drag_id);
          if (f && (this._drag_event._dhx_changed || !this._drag_event.start_date || v.start_date.valueOf() != this._drag_event.start_date.valueOf() || v.end_date.valueOf() != this._drag_event.end_date.valueOf())) {
            var x = this._drag_mode == "new-size";
            if (this.callEvent("onBeforeEventChanged", [v, u, x, this._drag_event]))
              if (this._drag_id = this._drag_mode = null, x && this.config.edit_on_create) {
                if (this.unselect(), this._new_event = /* @__PURE__ */ new Date(), this._table_view || this.config.details_on_create || !this.config.select || !this.isOneDayEvent(this.getEvent(p)))
                  return t.callEvent("onDragEnd", [p, d, u]), this.showLightbox(p);
                this._drag_pos = !0, this._select_id = this._edit_id = p;
              } else
                this._new_event || this.callEvent(x ? "onEventAdded" : "onEventChanged", [p, this.getEvent(p)]);
            else
              x ? this.deleteEvent(v.id, !0) : (this._drag_event._dhx_changed = !1, this._clear_temporary_properties(v, this._drag_event), t._lame_copy(v, this._drag_event), this.updateEvent(v.id));
          }
          this._drag_pos && (this._drag_pos.has_moved || this._drag_pos === !0) && (this._drag_id = this._drag_mode = null, this.render_view_data()), t.callEvent("onDragEnd", [p, d, u]);
        }
        this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this._drag_event = null, this._drag_from_start = null;
      }
    }, t._trigger_dyn_loading = function() {
      return !(!this._load_mode || !this._load() || (this._render_wait = !0, 0));
    }, t.update_view = function() {
      this._reset_ignores(), this._update_nav_bar(this.config.header, this.$container.querySelector(".dhx_cal_navline"));
      var u = this[this._mode + "_view"];
      if (u ? u.call(this, !0) : this._reset_scale(), this._trigger_dyn_loading())
        return !0;
      this.render_view_data();
    }, t.isViewExists = function(u) {
      return !!(t[u + "_view"] || t.date[u + "_start"] && t.templates[u + "_date"] && t.templates[u + "_scale_date"]);
    }, t._set_aria_buttons_attrs = function() {
      for (var u = ["dhx_cal_next_button", "dhx_cal_prev_button", "dhx_cal_tab", "dhx_cal_today_button"], p = 0; p < u.length; p++)
        for (var d = this._els[u[p]], f = 0; d && f < d.length; f++) {
          var v = d[f].getAttribute("data-tab") || d[f].getAttribute("name"), x = this.locale.labels[u[p]];
          v && (x = this.locale.labels[v + "_tab"] || this.locale.labels[v] || x), u[p] == "dhx_cal_next_button" ? x = this.locale.labels.next : u[p] == "dhx_cal_prev_button" && (x = this.locale.labels.prev), this._waiAria.headerButtonsAttributes(d[f], x || "");
        }
    }, t.updateView = function(u, p) {
      if (!this.$container)
        throw new Error(`The scheduler is not initialized. 
 **scheduler.updateView** or **scheduler.setCurrentView** can be called only after **scheduler.init**`);
      u = u || this._date, p = p || this._mode;
      var d = "dhx_cal_data";
      this.locale.labels.icon_form || (this.locale.labels.icon_form = this.locale.labels.icon_edit);
      var f = this._obj, v = "dhx_scheduler_" + this._mode, x = "dhx_scheduler_" + p;
      this._mode && f.className.indexOf(v) != -1 ? f.className = f.className.replace(v, x) : f.className += " " + x;
      var b, w = "dhx_multi_day", k = !(this._mode != p || !this.config.preserve_scroll) && this._els[d][0].scrollTop;
      this._els[w] && this._els[w][0] && (b = this._els[w][0].scrollTop), this[this._mode + "_view"] && p && this._mode != p && this[this._mode + "_view"](!1), this._close_not_saved(), this._els[w] && (this._els[w][0].parentNode.removeChild(this._els[w][0]), this._els[w] = null), this._mode = p, this._date = u, this._table_view = this._mode == "month", this._dy_shift = 0, this.update_view(), this._set_aria_buttons_attrs();
      var E = this._els.dhx_cal_tab;
      if (E)
        for (var D = 0; D < E.length; D++) {
          var S = E[D];
          S.getAttribute("data-tab") == this._mode || S.getAttribute("name") == this._mode + "_tab" ? (S.classList.add("active"), this._waiAria.headerToggleState(S, !0)) : (S.classList.remove("active"), this._waiAria.headerToggleState(S, !1));
        }
      typeof k == "number" && (this._els[d][0].scrollTop = k), typeof b == "number" && this._els[w] && this._els[w][0] && (this._els[w][0].scrollTop = b);
    }, t.setCurrentView = function(u, p) {
      this.callEvent("onBeforeViewChange", [this._mode, this._date, p || this._mode, u || this._date]) && (this.updateView(u, p), this.callEvent("onViewChange", [this._mode, this._date]));
    }, t.render = function(u, p) {
      t.setCurrentView(u, p);
    }, t._render_x_header = function(u, p, d, f, v) {
      v = v || 0;
      var x = document.createElement("div");
      x.className = "dhx_scale_bar", this.templates[this._mode + "_scalex_class"] && (x.className += " " + this.templates[this._mode + "_scalex_class"](d));
      var b = this._cols[u];
      this._mode == "month" && u === 0 && this.config.left_border && (x.className += " dhx_scale_bar_border", p += 1), this.set_xy(x, b, this.xy.scale_height - 1, p, v);
      var w = this.templates[this._mode + "_scale_date"](d, this._mode);
      x.innerHTML = w, this._waiAria.dayHeaderAttr(x, w), f.appendChild(x);
    }, t._get_columns_num = function(u, p) {
      var d = 7;
      if (!t._table_view) {
        var f = t.date["get_" + t._mode + "_end"];
        f && (p = f(u)), d = Math.round((p.valueOf() - u.valueOf()) / 864e5);
      }
      return d;
    }, t._get_timeunit_start = function() {
      return this.date[this._mode + "_start"](new Date(this._date.valueOf()));
    }, t._get_view_end = function() {
      var u = this._get_timeunit_start(), p = t.date.add(u, 1, this._mode);
      if (!t._table_view) {
        var d = t.date["get_" + t._mode + "_end"];
        d && (p = d(u));
      }
      return p;
    }, t._calc_scale_sizes = function(u, p, d) {
      var f = this.config.rtl, v = u, x = this._get_columns_num(p, d);
      this._process_ignores(p, x, "day", 1);
      for (var b = x - this._ignores_detected, w = 0; w < x; w++)
        this._ignores[w] ? (this._cols[w] = 0, b++) : this._cols[w] = Math.floor(v / (b - w)), v -= this._cols[w], this._colsS[w] = (this._cols[w - 1] || 0) + (this._colsS[w - 1] || (this._table_view ? 0 : f ? this.xy.scroll_width : this.xy.scale_width));
      this._colsS.col_length = x, this._colsS[x] = this._cols[x - 1] + this._colsS[x - 1] || 0;
    }, t._set_scale_col_size = function(u, p, d) {
      var f = this.config;
      this.set_xy(u, p, f.hour_size_px * (f.last_hour - f.first_hour), d + this.xy.scale_width + 1, 0);
    }, t._render_scales = function(u, p) {
      var d = new Date(t._min_date), f = new Date(t._max_date), v = this.date.date_part(t._currentDate()), x = parseInt(u.style.width, 10) - 1, b = new Date(this._min_date), w = this._get_columns_num(d, f);
      this._calc_scale_sizes(x, d, f);
      var k = 0;
      u.innerHTML = "";
      for (var E = 0; E < w; E++) {
        if (this._ignores[E] || this._render_x_header(E, k, b, u), !this._table_view) {
          var D = document.createElement("div"), S = "dhx_scale_holder";
          b.valueOf() == v.valueOf() && (S += " dhx_scale_holder_now"), D.setAttribute("data-column-index", E), this._ignores_detected && this._ignores[E] && (S += " dhx_scale_ignore");
          for (let N = 1 * this.config.first_hour; N < this.config.last_hour; N++) {
            const M = document.createElement("div");
            M.className = "dhx_scale_time_slot dhx_scale_time_slot_hour_start", M.style.height = this.config.hour_size_px / 2 + "px";
            let A = new Date(b.getFullYear(), b.getMonth(), b.getDate(), N, 0);
            M.setAttribute("data-slot-date", this.templates.format_date(A));
            let C = this.templates.time_slot_text(A);
            C && (M.innerHTML = C);
            let T = this.templates.time_slot_class(A);
            T && M.classList.add(T), D.appendChild(M);
            const O = document.createElement("div");
            O.className = "dhx_scale_time_slot", A = new Date(b.getFullYear(), b.getMonth(), b.getDate(), N, 30), O.setAttribute("data-slot-date", this.templates.format_date(A)), O.style.height = this.config.hour_size_px / 2 + "px", C = this.templates.time_slot_text(A), C && (O.innerHTML = C), T = this.templates.time_slot_class(A), T && O.classList.add(T), D.appendChild(O);
          }
          D.className = S + " " + this.templates.week_date_class(b, v), this._waiAria.dayColumnAttr(D, b), this._set_scale_col_size(D, this._cols[E], k), p.appendChild(D), this.callEvent("onScaleAdd", [D, b]);
        }
        k += this._cols[E], b = this.date.add(b, 1, "day"), b = this.date.day_start(b);
      }
    }, t._getNavDateElement = function() {
      return this.$container.querySelector(".dhx_cal_date");
    }, t._reset_scale = function() {
      if (this.templates[this._mode + "_date"]) {
        var u = this._els.dhx_cal_header[0], p = this._els.dhx_cal_data[0], d = this.config;
        u.innerHTML = "", p.innerHTML = "";
        var f, v, x = (d.readonly || !d.drag_resize ? " dhx_resize_denied" : "") + (d.readonly || !d.drag_move ? " dhx_move_denied" : "");
        p.className = "dhx_cal_data" + x, this._scales = {}, this._cols = [], this._colsS = { height: 0 }, this._dy_shift = 0, this.set_sizes();
        var b = this._get_timeunit_start(), w = t._get_view_end();
        f = v = this._table_view ? t.date.week_start(b) : b, this._min_date = f;
        var k = this.templates[this._mode + "_date"](b, w, this._mode), E = this._getNavDateElement();
        if (E && (E.innerHTML = k, this._waiAria.navBarDateAttr(E, k)), this._max_date = w, t._render_scales(u, p), this._table_view)
          this._reset_month_scale(p, b, v);
        else if (this._reset_hours_scale(p, b, v), d.multi_day) {
          var D = "dhx_multi_day";
          this._els[D] && (this._els[D][0].parentNode.removeChild(this._els[D][0]), this._els[D] = null);
          var S = document.createElement("div");
          S.className = D, S.style.visibility = "hidden", S.style.display = "none";
          var N = this._colsS[this._colsS.col_length], M = d.rtl ? this.xy.scale_width : this.xy.scroll_width, A = Math.max(N + M, 0);
          this.set_xy(S, A, 0, 0), p.parentNode.insertBefore(S, p);
          var C = S.cloneNode(!0);
          C.className = D + "_icon", C.style.visibility = "hidden", C.style.display = "none", this.set_xy(C, this.xy.scale_width + 1, 0, 0), S.appendChild(C), this._els[D] = [S, C], t.event(this._els[D][0], "click", this._click.dhx_cal_data);
        }
      }
    }, t._reset_hours_scale = function(u, p, d) {
      var f = document.createElement("div");
      f.className = "dhx_scale_holder";
      for (var v = new Date(1980, 1, 1, this.config.first_hour, 0, 0), x = 1 * this.config.first_hour; x < this.config.last_hour; x++) {
        var b = document.createElement("div");
        b.className = "dhx_scale_hour", b.style.height = this.config.hour_size_px + "px";
        var w = this.xy.scale_width;
        this.config.left_border && (b.className += " dhx_scale_hour_border"), b.style.width = w + "px";
        var k = t.templates.hour_scale(v);
        b.innerHTML = k, this._waiAria.hourScaleAttr(b, k), f.appendChild(b), v = this.date.add(v, 1, "hour");
      }
      u.appendChild(f), this.config.scroll_hour && (u.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour));
    }, t._currentDate = function() {
      return t.config.now_date ? new Date(t.config.now_date) : /* @__PURE__ */ new Date();
    }, t._reset_ignores = function() {
      this._ignores = {}, this._ignores_detected = 0;
    }, t._process_ignores = function(u, p, d, f, v) {
      this._reset_ignores();
      var x = t["ignore_" + this._mode];
      if (x)
        for (var b = new Date(u), w = 0; w < p; w++)
          x(b) && (this._ignores_detected += 1, this._ignores[w] = !0, v && p++), b = t.date.add(b, f, d), t.date[d + "_start"] && (b = t.date[d + "_start"](b));
    }, t._render_month_scale = function(u, p, d, f) {
      var v = t.date.add(p, 1, "month"), x = new Date(d), b = t._currentDate();
      this.date.date_part(b), this.date.date_part(d), f = f || Math.ceil(Math.round((v.valueOf() - d.valueOf()) / 864e5) / 7);
      for (var w = [], k = 0; k <= 7; k++) {
        var E = this._cols[k] || 0;
        isNaN(Number(E)) || (E += "px"), w[k] = E;
      }
      function D(P) {
        var I = t._colsS.height;
        return t._colsS.heights[P + 1] !== void 0 && (I = t._colsS.heights[P + 1] - (t._colsS.heights[P] || 0)), I;
      }
      var S = 0;
      const N = document.createElement("div");
      for (N.classList.add("dhx_cal_month_table"), k = 0; k < f; k++) {
        var M = document.createElement("div");
        M.classList.add("dhx_cal_month_row"), M.style.height = D(k) + "px", N.appendChild(M);
        for (var A = 0; A < 7; A++) {
          var C = document.createElement("div");
          M.appendChild(C);
          var T = "dhx_cal_month_cell";
          d < p ? T += " dhx_before" : d >= v ? T += " dhx_after" : d.valueOf() == b.valueOf() && (T += " dhx_now"), this._ignores_detected && this._ignores[A] && (T += " dhx_scale_ignore"), C.className = T + " " + this.templates.month_date_class(d, b), C.setAttribute("data-cell-date", t.templates.format_date(d));
          var O = "dhx_month_body", L = "dhx_month_head";
          if (A === 0 && this.config.left_border && (O += " dhx_month_body_border", L += " dhx_month_head_border"), this._ignores_detected && this._ignores[A])
            C.appendChild(document.createElement("div")), C.appendChild(document.createElement("div"));
          else {
            C.style.width = w[A], this._waiAria.monthCellAttr(C, d);
            var $ = document.createElement("div");
            $.style.height = t.xy.month_head_height + "px", $.className = L, $.innerHTML = this.templates.month_day(d), C.appendChild($);
            var z = document.createElement("div");
            z.className = O, C.appendChild(z);
          }
          var j = d.getDate();
          (d = this.date.add(d, 1, "day")).getDate() - j > 1 && (d = new Date(d.getFullYear(), d.getMonth(), j + 1, 12, 0));
        }
        t._colsS.heights[k] = S, S += D(k);
      }
      return this._min_date = x, this._max_date = d, u.innerHTML = "", u.appendChild(N), this._scales = {}, u.querySelectorAll("[data-cell-date]").forEach((P) => {
        const I = t.templates.parse_date(P.getAttribute("data-cell-date")), Y = P.querySelector(".dhx_month_body");
        this._scales[+I] = Y, this.callEvent("onScaleAdd", [this._scales[+I], I]);
      }), this._max_date;
    }, t._reset_month_scale = function(u, p, d, f) {
      var v = t.date.add(p, 1, "month"), x = t._currentDate();
      this.date.date_part(x), this.date.date_part(d), f = f || Math.ceil(Math.round((v.valueOf() - d.valueOf()) / 864e5) / 7);
      var b = Math.floor(u.clientHeight / f) - this.xy.month_head_height;
      return this._colsS.height = b + this.xy.month_head_height, this._colsS.heights = [], t._render_month_scale(u, p, d, f);
    }, t.getView = function(u) {
      return u || (u = t.getState().mode), t.matrix && t.matrix[u] ? t.matrix[u] : t._props && t._props[u] ? t._props[u] : null;
    }, t.getLabel = function(u, p) {
      for (var d = this.config.lightbox.sections, f = 0; f < d.length; f++)
        if (d[f].map_to == u) {
          for (var v = d[f].options, x = 0; x < v.length; x++)
            if (v[x].key == p)
              return v[x].label;
        }
      return "";
    }, t.updateCollection = function(u, p) {
      var d = t.serverList(u);
      return !!d && (d.splice(0, d.length), d.push.apply(d, p || []), t.callEvent("onOptionsLoad", []), t.resetLightbox(), t.hideCover(), !0);
    }, t._lame_clone = function(u, p) {
      var d, f, v;
      for (p = p || [], d = 0; d < p.length; d += 2)
        if (u === p[d])
          return p[d + 1];
      if (u && typeof u == "object") {
        for (v = Object.create(u), f = [Array, Date, Number, String, Boolean], d = 0; d < f.length; d++)
          u instanceof f[d] && (v = d ? new f[d](u) : new f[d]());
        for (d in p.push(u, v), u)
          Object.prototype.hasOwnProperty.apply(u, [d]) && (v[d] = t._lame_clone(u[d], p));
      }
      return v || u;
    }, t._lame_copy = function(u, p) {
      for (var d in p)
        p.hasOwnProperty(d) && (u[d] = p[d]);
      return u;
    }, t._get_date_from_pos = function(u) {
      var p = this._min_date.valueOf() + 6e4 * (u.y * this.config.time_step + 24 * (this._table_view ? 0 : u.x) * 60);
      return new Date(this._correct_shift(p));
    }, t.getActionData = function(u) {
      var p = this._mouse_coords(u);
      return { date: this._get_date_from_pos(p), section: p.section };
    }, t._focus = function(u, p) {
      if (u && u.focus)
        if (this._mobile)
          window.setTimeout(function() {
            u.focus();
          }, 10);
        else
          try {
            p && u.select && u.offsetWidth && u.select(), u.focus();
          } catch {
          }
    }, t._get_real_event_length = function(u, p, d) {
      var f, v = p - u, x = this["ignore_" + this._mode], b = 0;
      d.render ? (b = this._get_date_index(d, u), f = this._get_date_index(d, p), u.valueOf() < t.getState().min_date.valueOf() && (b = -m(u, t.getState().min_date)), p.valueOf() > t.getState().max_date.valueOf() && (f += m(p, t.getState().max_date))) : f = Math.round(v / 60 / 60 / 1e3 / 24);
      for (var w = !0; b < f; ) {
        var k = t.date.add(p, -d.x_step, d.x_unit);
        if (x && x(p) && (!w || w && x(k)))
          v -= p - k;
        else {
          let E = 0;
          const D = new Date(Math.max(k.valueOf(), u.valueOf())), S = p, N = new Date(D.getFullYear(), D.getMonth(), D.getDate(), d.first_hour), M = new Date(D.getFullYear(), D.getMonth(), D.getDate(), d.last_hour || 24), A = new Date(p.getFullYear(), p.getMonth(), p.getDate(), d.first_hour), C = new Date(p.getFullYear(), p.getMonth(), p.getDate(), d.last_hour || 24);
          S.valueOf() > C.valueOf() && (E += S - C), S.valueOf() > A.valueOf() ? E += d._start_correction : E += 60 * S.getHours() * 60 * 1e3 + 60 * S.getMinutes() * 1e3, D.valueOf() < M.valueOf() && (E += d._end_correction), D.valueOf() < N.valueOf() && (E += N.valueOf() - D.valueOf()), v -= E, w = !1;
        }
        p = k, f--;
      }
      return v;
    }, t._get_fictional_event_length = function(u, p, d, f) {
      var v = new Date(u), x = f ? -1 : 1;
      if (d._start_correction || d._end_correction) {
        var b;
        b = f ? 60 * v.getHours() + v.getMinutes() - 60 * (d.first_hour || 0) : 60 * (d.last_hour || 0) - (60 * v.getHours() + v.getMinutes());
        var w = 60 * (d.last_hour - d.first_hour), k = Math.ceil((p / 6e4 - b) / w);
        k < 0 && (k = 0), p += k * (1440 - w) * 60 * 1e3;
      }
      var E, D = new Date(1 * u + p * x), S = this["ignore_" + this._mode], N = 0;
      for (d.render ? (N = this._get_date_index(d, v), E = this._get_date_index(d, D)) : E = Math.round(p / 60 / 60 / 1e3 / 24); N * x <= E * x; ) {
        var M = t.date.add(v, d.x_step * x, d.x_unit);
        S && S(v) && (p += (M - v) * x, E += x), v = M, N += x;
      }
      return p;
    }, t._get_section_view = function() {
      return this.getView();
    }, t._get_section_property = function() {
      return this.matrix && this.matrix[this._mode] ? this.matrix[this._mode].y_property : this._props && this._props[this._mode] ? this._props[this._mode].map_to : null;
    }, t._is_initialized = function() {
      var u = this.getState();
      return this._obj && u.date && u.mode;
    }, t._is_lightbox_open = function() {
      var u = this.getState();
      return u.lightbox_id !== null && u.lightbox_id !== void 0;
    };
  }(h), function(t) {
    (function() {
      var i = new RegExp(`<(?:.|
)*?>`, "gm"), s = new RegExp(" +", "gm");
      function c(u) {
        return (u + "").replace(i, " ").replace(s, " ");
      }
      var g = new RegExp("'", "gm");
      function y(u) {
        return (u + "").replace(g, "&#39;");
      }
      for (var m in t._waiAria = { getAttributeString: function(u) {
        var p = [" "];
        for (var d in u)
          if (typeof u[d] != "function" && typeof u[d] != "object") {
            var f = y(c(u[d]));
            p.push(d + "='" + f + "'");
          }
        return p.push(" "), p.join(" ");
      }, setAttributes: function(u, p) {
        for (var d in p)
          u.setAttribute(d, c(p[d]));
        return u;
      }, labelAttr: function(u, p) {
        return this.setAttributes(u, { "aria-label": p });
      }, label: function(u) {
        return t._waiAria.getAttributeString({ "aria-label": u });
      }, hourScaleAttr: function(u, p) {
        this.labelAttr(u, p);
      }, monthCellAttr: function(u, p) {
        this.labelAttr(u, t.templates.day_date(p));
      }, navBarDateAttr: function(u, p) {
        this.labelAttr(u, p);
      }, dayHeaderAttr: function(u, p) {
        this.labelAttr(u, p);
      }, dayColumnAttr: function(u, p) {
        this.dayHeaderAttr(u, t.templates.day_date(p));
      }, headerButtonsAttributes: function(u, p) {
        return this.setAttributes(u, { role: "button", "aria-label": p });
      }, headerToggleState: function(u, p) {
        return this.setAttributes(u, { "aria-pressed": p ? "true" : "false" });
      }, getHeaderCellAttr: function(u) {
        return t._waiAria.getAttributeString({ "aria-label": u });
      }, eventAttr: function(u, p) {
        this._eventCommonAttr(u, p);
      }, _eventCommonAttr: function(u, p) {
        p.setAttribute("aria-label", c(t.templates.event_text(u.start_date, u.end_date, u))), t.config.readonly && p.setAttribute("aria-readonly", !0), u.$dataprocessor_class && p.setAttribute("aria-busy", !0), p.setAttribute("aria-selected", t.getState().select_id == u.id ? "true" : "false");
      }, setEventBarAttr: function(u, p) {
        this._eventCommonAttr(u, p);
      }, _getAttributes: function(u, p) {
        var d = { setAttribute: function(f, v) {
          this[f] = v;
        } };
        return u.apply(this, [p, d]), d;
      }, eventBarAttrString: function(u) {
        return this.getAttributeString(this._getAttributes(this.setEventBarAttr, u));
      }, agendaHeadAttrString: function() {
        return this.getAttributeString({ role: "row" });
      }, agendaHeadDateString: function(u) {
        return this.getAttributeString({ role: "columnheader", "aria-label": u });
      }, agendaHeadDescriptionString: function(u) {
        return this.agendaHeadDateString(u);
      }, agendaDataAttrString: function() {
        return this.getAttributeString({ role: "grid" });
      }, agendaEventAttrString: function(u) {
        var p = this._getAttributes(this._eventCommonAttr, u);
        return p.role = "row", this.getAttributeString(p);
      }, agendaDetailsBtnString: function() {
        return this.getAttributeString({ role: "button", "aria-label": t.locale.labels.icon_details });
      }, gridAttrString: function() {
        return this.getAttributeString({ role: "grid" });
      }, gridRowAttrString: function(u) {
        return this.agendaEventAttrString(u);
      }, gridCellAttrString: function(u, p, d) {
        return this.getAttributeString({ role: "gridcell", "aria-label": [p.label === void 0 ? p.id : p.label, ": ", d] });
      }, mapAttrString: function() {
        return this.gridAttrString();
      }, mapRowAttrString: function(u) {
        return this.gridRowAttrString(u);
      }, mapDetailsBtnString: function() {
        return this.agendaDetailsBtnString();
      }, minicalHeader: function(u, p) {
        this.setAttributes(u, { id: p + "", "aria-live": "assertice", "aria-atomic": "true" });
      }, minicalGrid: function(u, p) {
        this.setAttributes(u, { "aria-labelledby": p + "", role: "grid" });
      }, minicalRow: function(u) {
        this.setAttributes(u, { role: "row" });
      }, minicalDayCell: function(u, p) {
        var d = p.valueOf() < t._max_date.valueOf() && p.valueOf() >= t._min_date.valueOf();
        this.setAttributes(u, { role: "gridcell", "aria-label": t.templates.day_date(p), "aria-selected": d ? "true" : "false" });
      }, minicalHeadCell: function(u) {
        this.setAttributes(u, { role: "columnheader" });
      }, weekAgendaDayCell: function(u, p) {
        var d = u.querySelector(".dhx_wa_scale_bar"), f = u.querySelector(".dhx_wa_day_data"), v = t.uid() + "";
        this.setAttributes(d, { id: v }), this.setAttributes(f, { "aria-labelledby": v });
      }, weekAgendaEvent: function(u, p) {
        this.eventAttr(p, u);
      }, lightboxHiddenAttr: function(u) {
        u.setAttribute("aria-hidden", "true");
      }, lightboxVisibleAttr: function(u) {
        u.setAttribute("aria-hidden", "false");
      }, lightboxSectionButtonAttrString: function(u) {
        return this.getAttributeString({ role: "button", "aria-label": u, tabindex: "0" });
      }, yearHeader: function(u, p) {
        this.setAttributes(u, { id: p + "" });
      }, yearGrid: function(u, p) {
        this.minicalGrid(u, p);
      }, yearHeadCell: function(u) {
        return this.minicalHeadCell(u);
      }, yearRow: function(u) {
        return this.minicalRow(u);
      }, yearDayCell: function(u) {
        this.setAttributes(u, { role: "gridcell" });
      }, lightboxAttr: function(u) {
        u.setAttribute("role", "dialog"), u.setAttribute("aria-hidden", "true"), u.firstChild.setAttribute("role", "heading");
      }, lightboxButtonAttrString: function(u) {
        return this.getAttributeString({ role: "button", "aria-label": t.locale.labels[u], tabindex: "0" });
      }, eventMenuAttrString: function(u) {
        return this.getAttributeString({ role: "button", "aria-label": t.locale.labels[u] });
      }, lightboxHeader: function(u, p) {
        u.setAttribute("aria-label", p);
      }, lightboxSelectAttrString: function(u) {
        var p = "";
        switch (u) {
          case "%Y":
            p = t.locale.labels.year;
            break;
          case "%m":
            p = t.locale.labels.month;
            break;
          case "%d":
            p = t.locale.labels.day;
            break;
          case "%H:%i":
            p = t.locale.labels.hour + " " + t.locale.labels.minute;
        }
        return t._waiAria.getAttributeString({ "aria-label": p });
      }, messageButtonAttrString: function(u) {
        return "tabindex='0' role='button' aria-label='" + u + "'";
      }, messageInfoAttr: function(u) {
        u.setAttribute("role", "alert");
      }, messageModalAttr: function(u, p) {
        u.setAttribute("role", "dialog"), p && u.setAttribute("aria-labelledby", p);
      }, quickInfoAttr: function(u) {
        u.setAttribute("role", "dialog");
      }, quickInfoHeaderAttrString: function() {
        return " role='heading' ";
      }, quickInfoHeader: function(u, p) {
        u.setAttribute("aria-label", p);
      }, quickInfoButtonAttrString: function(u) {
        return t._waiAria.getAttributeString({ role: "button", "aria-label": u, tabindex: "0" });
      }, tooltipAttr: function(u) {
        u.setAttribute("role", "tooltip");
      }, tooltipVisibleAttr: function(u) {
        u.setAttribute("aria-hidden", "false");
      }, tooltipHiddenAttr: function(u) {
        u.setAttribute("aria-hidden", "true");
      } }, t._waiAria)
        t._waiAria[m] = function(u) {
          return function() {
            return t.config.wai_aria_attributes ? u.apply(this, arguments) : " ";
          };
        }(t._waiAria[m]);
    })();
  }(h), h.utils = ie, h.$domHelpers = le, h.utils.dom = le, h.uid = ie.uid, h.mixin = ie.mixin, h.defined = ie.defined, h.assert = function(t) {
    return function(i, s) {
      i || t.config.show_errors && t.callEvent("onError", [s]) !== !1 && (t.message ? t.message({ type: "error", text: s, expire: -1 }) : console.log(s));
    };
  }(h), h.copy = ie.copy, h._createDatePicker = function(t, i) {
    return new Rt(h, t, i);
  }, h._getFocusableNodes = le.getFocusableNodes, h._getClassName = le.getClassName, h._locate_css = le.locateCss;
  const a = lt(h);
  var n, _, r;
  h.utils.mixin(h, a), h.env = h.$env = it, h.Promise = window.Promise, function(t) {
    t.destructor = function() {
      for (var i in t.callEvent("onDestroy", []), this.clearAll(), this.$container && (this.$container.innerHTML = ""), this._eventRemoveAll && this._eventRemoveAll(), this.resetLightbox && this.resetLightbox(), this._dp && this._dp.destructor && this._dp.destructor(), this.detachAllEvents(), this)
        i.indexOf("$") === 0 && delete this[i];
      t.$destroyed = !0;
    };
  }(h), function(t) {
    function i(s, c) {
      var g = { method: s };
      if (c.length === 0)
        throw new Error("Arguments list of query is wrong.");
      if (c.length === 1)
        return typeof c[0] == "string" ? (g.url = c[0], g.async = !0) : (g.url = c[0].url, g.async = c[0].async || !0, g.callback = c[0].callback, g.headers = c[0].headers), c[0].data ? typeof c[0].data != "string" ? g.data = De(c[0].data) : g.data = c[0].data : g.data = "", g;
      switch (g.url = c[0], s) {
        case "GET":
        case "DELETE":
          g.callback = c[1], g.headers = c[2];
          break;
        case "POST":
        case "PUT":
          c[1] ? typeof c[1] != "string" ? g.data = De(c[1]) : g.data = c[1] : g.data = "", g.callback = c[2], g.headers = c[3];
      }
      return g;
    }
    t.Promise = window.Promise, t.ajax = { cache: !0, method: "get", serializeRequestParams: De, parse: function(s) {
      return typeof s != "string" ? s : (s = s.replace(/^[\s]+/, ""), typeof DOMParser > "u" || t.$env.isIE ? window.ActiveXObject !== void 0 && ((c = new window.ActiveXObject("Microsoft.XMLDOM")).async = "false", c.loadXML(s)) : c = new DOMParser().parseFromString(s, "text/xml"), c);
      var c;
    }, xmltop: function(s, c, g) {
      if (c.status === void 0 || c.status < 400) {
        var y = c.responseXML ? c.responseXML || c : this.parse(c.responseText || c);
        if (y && y.documentElement !== null && !y.getElementsByTagName("parsererror").length)
          return y.getElementsByTagName(s)[0];
      }
      return g !== -1 && t.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], g]), document.createElement("DIV");
    }, xpath: function(s, c) {
      if (c.nodeName || (c = c.responseXML || c), t.$env.isIE)
        return c.selectNodes(s) || [];
      for (var g, y = [], m = (c.ownerDocument || c).evaluate(s, c, null, XPathResult.ANY_TYPE, null); g = m.iterateNext(); )
        y.push(g);
      return y;
    }, query: function(s) {
      return this._call(s.method || "GET", s.url, s.data || "", s.async || !0, s.callback, s.headers);
    }, get: function(s, c, g) {
      var y = i("GET", arguments);
      return this.query(y);
    }, getSync: function(s, c) {
      var g = i("GET", arguments);
      return g.async = !1, this.query(g);
    }, put: function(s, c, g, y) {
      var m = i("PUT", arguments);
      return this.query(m);
    }, del: function(s, c, g) {
      var y = i("DELETE", arguments);
      return this.query(y);
    }, post: function(s, c, g, y) {
      arguments.length == 1 ? c = "" : arguments.length == 2 && typeof c == "function" && (g = c, c = "");
      var m = i("POST", arguments);
      return this.query(m);
    }, postSync: function(s, c, g) {
      c = c === null ? "" : String(c);
      var y = i("POST", arguments);
      return y.async = !1, this.query(y);
    }, _call: function(s, c, g, y, m, u) {
      return new t.Promise((function(p, d) {
        var f = typeof XMLHttpRequest === void 0 || t.$env.isIE ? new window.ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest(), v = navigator.userAgent.match(/AppleWebKit/) !== null && navigator.userAgent.match(/Qt/) !== null && navigator.userAgent.match(/Safari/) !== null;
        if (y && f.addEventListener("readystatechange", function() {
          if (f.readyState == 4 || v && f.readyState == 3) {
            if ((f.status != 200 || f.responseText === "") && !t.callEvent("onAjaxError", [f]))
              return;
            setTimeout(function() {
              typeof m == "function" && m.apply(window, [{ xmlDoc: f, filePath: c }]), p(f), typeof m == "function" && (m = null, f = null);
            }, 0);
          }
        }), s != "GET" || this.cache || (c += (c.indexOf("?") >= 0 ? "&" : "?") + "dhxr" + (/* @__PURE__ */ new Date()).getTime() + "=1"), f.open(s, c, y), u)
          for (var x in u)
            f.setRequestHeader(x, u[x]);
        else
          s.toUpperCase() == "POST" || s == "PUT" || s == "DELETE" ? f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") : s == "GET" && (g = null);
        if (f.setRequestHeader("X-Requested-With", "XMLHttpRequest"), f.send(g), !y)
          return { xmlDoc: f, filePath: c };
      }).bind(this));
    }, urlSeparator: function(s) {
      return s.indexOf("?") != -1 ? "&" : "?";
    } }, t.$ajax = t.ajax;
  }(h), rt(h), function(t) {
    t.config = { default_date: "%j %M %Y", month_date: "%F %Y", load_date: "%Y-%m-%d", week_date: "%l", day_date: "%D %j", hour_date: "%H:%i", month_day: "%d", date_format: "%Y-%m-%d %H:%i", api_date: "%d-%m-%Y %H:%i", parse_exact_format: !1, preserve_length: !0, time_step: 5, displayed_event_color: "#ff4a4a", displayed_event_text_color: "#ffef80", wide_form: 0, day_column_padding: 8, use_select_menu_space: !0, fix_tab_position: !0, start_on_monday: !0, first_hour: 0, last_hour: 24, readonly: !1, drag_resize: !0, drag_move: !0, drag_create: !0, drag_event_body: !0, dblclick_create: !0, details_on_dblclick: !0, edit_on_create: !0, details_on_create: !0, header: null, hour_size_px: 44, resize_month_events: !1, resize_month_timed: !1, responsive_lightbox: !1, separate_short_events: !0, rtl: !1, cascade_event_display: !1, cascade_event_count: 4, cascade_event_margin: 30, multi_day: !0, multi_day_height_limit: 200, drag_lightbox: !0, preserve_scroll: !0, select: !0, server_utc: !1, touch: !0, touch_tip: !0, touch_drag: 500, touch_swipe_dates: !1, quick_info_detached: !0, positive_closing: !1, drag_highlight: !0, limit_drag_out: !1, icons_edit: ["icon_save", "icon_cancel"], icons_select: ["icon_details", "icon_edit", "icon_delete"], buttons_left: ["dhx_save_btn", "dhx_cancel_btn"], buttons_right: ["dhx_delete_btn"], lightbox: { sections: [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "time", height: 72, type: "time", map_to: "auto" }] }, highlight_displayed_event: !0, left_border: !1, ajax_error: "alert", delay_render: 0, timeline_swap_resize: !0, wai_aria_attributes: !0, wai_aria_application_role: !0, csp: "auto", event_attribute: "data-event-id", show_errors: !0 }, t.config.buttons_left.$initial = t.config.buttons_left.join(), t.config.buttons_right.$initial = t.config.buttons_right.join(), t._helpers = { parseDate: function(i) {
      return (t.templates.xml_date || t.templates.parse_date)(i);
    }, formatDate: function(i) {
      return (t.templates.xml_format || t.templates.format_date)(i);
    } }, t.templates = {}, t.init_templates = function() {
      var i = t.date.date_to_str, s = t.config;
      (function(c, g) {
        for (var y in g)
          c[y] || (c[y] = g[y]);
      })(t.templates, { day_date: i(s.default_date), month_date: i(s.month_date), week_date: function(c, g) {
        return s.rtl ? t.templates.day_date(t.date.add(g, -1, "day")) + " &ndash; " + t.templates.day_date(c) : t.templates.day_date(c) + " &ndash; " + t.templates.day_date(t.date.add(g, -1, "day"));
      }, day_scale_date: i(s.default_date), time_slot_text: function(c) {
        return "";
      }, time_slot_class: function(c) {
        return "";
      }, month_scale_date: i(s.week_date), week_scale_date: i(s.day_date), hour_scale: i(s.hour_date), time_picker: i(s.hour_date), event_date: i(s.hour_date), month_day: i(s.month_day), load_format: i(s.load_date), format_date: i(s.date_format, s.server_utc), parse_date: t.date.str_to_date(s.date_format, s.server_utc), api_date: t.date.str_to_date(s.api_date, !1, !1), event_header: function(c, g, y) {
        return y._mode === "small" || y._mode === "smallest" ? t.templates.event_date(c) : t.templates.event_date(c) + " - " + t.templates.event_date(g);
      }, event_text: function(c, g, y) {
        return y.text;
      }, event_class: function(c, g, y) {
        return "";
      }, month_date_class: function(c) {
        return "";
      }, week_date_class: function(c) {
        return "";
      }, event_bar_date: function(c, g, y) {
        return t.templates.event_date(c);
      }, event_bar_text: function(c, g, y) {
        return y.text;
      }, month_events_link: function(c, g) {
        return "<a>View more(" + g + " events)</a>";
      }, drag_marker_class: function(c, g, y) {
        return "";
      }, drag_marker_content: function(c, g, y) {
        return "";
      }, tooltip_date_format: t.date.date_to_str("%Y-%m-%d %H:%i"), tooltip_text: function(c, g, y) {
        return "<b>Event:</b> " + y.text + "<br/><b>Start date:</b> " + t.templates.tooltip_date_format(c) + "<br/><b>End date:</b> " + t.templates.tooltip_date_format(g);
      }, calendar_month: i("%F %Y"), calendar_scale_date: i("%D"), calendar_date: i("%d"), calendar_time: i("%d-%m-%Y") }), this.callEvent("onTemplatesReady", []);
    };
  }(h), function(t) {
    t._events = {}, t.clearAll = function() {
      this._events = {}, this._loaded = {}, this._edit_id = null, this._select_id = null, this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this._new_event = null, this.clear_view(), this.callEvent("onClearAll", []);
    }, t.addEvent = function(i, s, c, g, y) {
      if (!arguments.length)
        return this.addEventNow();
      var m = i;
      arguments.length != 1 && ((m = y || {}).start_date = i, m.end_date = s, m.text = c, m.id = g), m.id = m.id || t.uid(), m.text = m.text || "", typeof m.start_date == "string" && (m.start_date = this.templates.api_date(m.start_date)), typeof m.end_date == "string" && (m.end_date = this.templates.api_date(m.end_date));
      var u = 6e4 * (this.config.event_duration || this.config.time_step);
      m.start_date.valueOf() == m.end_date.valueOf() && m.end_date.setTime(m.end_date.valueOf() + u), m.start_date.setMilliseconds(0), m.end_date.setMilliseconds(0), m._timed = this.isOneDayEvent(m);
      var p = !this._events[m.id];
      return this._events[m.id] = m, this.event_updated(m), this._loading || this.callEvent(p ? "onEventAdded" : "onEventChanged", [m.id, m]), m.id;
    }, t.deleteEvent = function(i, s) {
      var c = this._events[i];
      (s || this.callEvent("onBeforeEventDelete", [i, c]) && this.callEvent("onConfirmedBeforeEventDelete", [i, c])) && (c && (t.getState().select_id == i && t.unselect(), delete this._events[i], this.event_updated(c), this._drag_id == c.id && (this._drag_id = null, this._drag_mode = null, this._drag_pos = null)), this.callEvent("onEventDeleted", [i, c]));
    }, t.getEvent = function(i) {
      return this._events[i];
    }, t.setEvent = function(i, s) {
      s.id || (s.id = i), this._events[i] = s;
    }, t.for_rendered = function(i, s) {
      for (var c = this._rendered.length - 1; c >= 0; c--)
        this._rendered[c].getAttribute(this.config.event_attribute) == i && s(this._rendered[c], c);
    }, t.changeEventId = function(i, s) {
      if (i != s) {
        var c = this._events[i];
        c && (c.id = s, this._events[s] = c, delete this._events[i]), this.for_rendered(i, function(g) {
          g.setAttribute("event_id", s), g.setAttribute(t.config.event_attribute, s);
        }), this._select_id == i && (this._select_id = s), this._edit_id == i && (this._edit_id = s), this.callEvent("onEventIdChange", [i, s]);
      }
    }, function() {
      for (var i = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"], s = function(y) {
        return function(m) {
          return t.getEvent(m)[y];
        };
      }, c = function(y) {
        return function(m, u) {
          var p = t.getEvent(m);
          p[y] = u, p._changed = !0, p._timed = this.isOneDayEvent(p), t.event_updated(p, !0);
        };
      }, g = 0; g < i.length; g += 2)
        t["getEvent" + i[g + 1]] = s(i[g]), t["setEvent" + i[g + 1]] = c(i[g]);
    }(), t.event_updated = function(i, s) {
      this.is_visible_events(i) ? this.render_view_data() : this.clear_event(i.id);
    }, t.is_visible_events = function(i) {
      if (!this._min_date || !this._max_date)
        return !1;
      if (i.start_date.valueOf() < this._max_date.valueOf() && this._min_date.valueOf() < i.end_date.valueOf()) {
        var s = i.start_date.getHours(), c = i.end_date.getHours() + i.end_date.getMinutes() / 60, g = this.config.last_hour, y = this.config.first_hour;
        return !(!this._table_view && (c > g || c <= y) && (s >= g || s < y) && !((i.end_date.valueOf() - i.start_date.valueOf()) / 36e5 > 24 - (this.config.last_hour - this.config.first_hour) || s < g && c > y));
      }
      return !1;
    }, t.isOneDayEvent = function(i) {
      var s = new Date(i.end_date.valueOf() - 1);
      return i.start_date.getFullYear() === s.getFullYear() && i.start_date.getMonth() === s.getMonth() && i.start_date.getDate() === s.getDate() && i.end_date.valueOf() - i.start_date.valueOf() < 864e5;
    }, t.get_visible_events = function(i) {
      var s = [];
      for (var c in this._events)
        this.is_visible_events(this._events[c]) && (i && !this._events[c]._timed || this.filter_event(c, this._events[c]) && s.push(this._events[c]));
      return s;
    }, t.filter_event = function(i, s) {
      var c = this["filter_" + this._mode];
      return !c || c(i, s);
    }, t._is_main_area_event = function(i) {
      return !!i._timed;
    }, t.render_view_data = function(i, s) {
      var c = !1;
      if (!i) {
        if (c = !0, this._not_render)
          return void (this._render_wait = !0);
        this._render_wait = !1, this.clear_view(), i = this.get_visible_events(!(this._table_view || this.config.multi_day));
      }
      for (var g = 0, y = i.length; g < y; g++)
        this._recalculate_timed(i[g]);
      if (this.config.multi_day && !this._table_view) {
        var m = [], u = [];
        for (g = 0; g < i.length; g++)
          this._is_main_area_event(i[g]) ? m.push(i[g]) : u.push(i[g]);
        if (!this._els.dhx_multi_day) {
          var p = t._commonErrorMessages.unknownView(this._mode);
          throw new Error(p);
        }
        this._rendered_location = this._els.dhx_multi_day[0], this._table_view = !0, this.render_data(u, s), this._table_view = !1, this._rendered_location = this._els.dhx_cal_data[0], this._table_view = !1, this.render_data(m, s);
      } else {
        var d = document.createDocumentFragment(), f = this._els.dhx_cal_data[0];
        this._rendered_location = d, this.render_data(i, s), f.appendChild(d), this._rendered_location = f;
      }
      c && this.callEvent("onDataRender", []);
    }, t._view_month_day = function(i) {
      var s = t.getActionData(i).date;
      t.callEvent("onViewMoreClick", [s]) && t.setCurrentView(s, "day");
    }, t._render_month_link = function(i) {
      for (var s = this._rendered_location, c = this._lame_clone(i), g = i._sday; g < i._eday; g++) {
        c._sday = g, c._eday = g + 1;
        var y = t.date, m = t._min_date;
        m = y.add(m, c._sweek, "week"), m = y.add(m, c._sday, "day");
        var u = t.getEvents(m, y.add(m, 1, "day")).length, p = this._get_event_bar_pos(c), d = p.x2 - p.x, f = document.createElement("div");
        t.event(f, "click", function(v) {
          t._view_month_day(v);
        }), f.className = "dhx_month_link", f.style.top = p.y + "px", f.style.left = p.x + "px", f.style.width = d + "px", f.innerHTML = t.templates.month_events_link(m, u), this._rendered.push(f), s.appendChild(f);
      }
    }, t._recalculate_timed = function(i) {
      var s;
      i && (s = typeof i != "object" ? this._events[i] : i) && (s._timed = t.isOneDayEvent(s));
    }, t.attachEvent("onEventChanged", t._recalculate_timed), t.attachEvent("onEventAdded", t._recalculate_timed), t.render_data = function(i, s) {
      i = this._pre_render_events(i, s);
      for (var c = {}, g = 0; g < i.length; g++)
        if (this._table_view)
          if (t._mode != "month")
            this.render_event_bar(i[g]);
          else {
            var y = t.config.max_month_events;
            y !== 1 * y || i[g]._sorder < y ? this.render_event_bar(i[g]) : y !== void 0 && i[g]._sorder == y && t._render_month_link(i[g]);
          }
        else {
          var m = i[g], u = t.locate_holder(m._sday);
          if (!u)
            continue;
          c[m._sday] || (c[m._sday] = { real: u, buffer: document.createDocumentFragment(), width: u.clientWidth });
          var p = c[m._sday];
          this.render_event(m, p.buffer, p.width);
        }
      for (var g in c)
        (p = c[g]).real && p.buffer && p.real.appendChild(p.buffer);
    }, t._get_first_visible_cell = function(i) {
      for (var s = 0; s < i.length; s++)
        if ((i[s].className || "").indexOf("dhx_scale_ignore") == -1)
          return i[s];
      return i[0];
    }, t._pre_render_events = function(i, s) {
      var c = this.xy.bar_height, g = this._colsS.heights, y = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], m = this._els.dhx_cal_data[0];
      if (i = this._table_view ? this._pre_render_events_table(i, s) : this._pre_render_events_line(i, s), this._table_view)
        if (s)
          this._colsS.heights = g;
        else {
          var u = m.querySelectorAll(".dhx_cal_month_row");
          if (u.length) {
            for (var p = 0; p < u.length; p++) {
              y[p]++;
              var d = u[p].querySelectorAll(".dhx_cal_month_cell"), f = this._colsS.height - this.xy.month_head_height;
              if (y[p] * c > f) {
                var v = f;
                1 * this.config.max_month_events !== this.config.max_month_events || y[p] <= this.config.max_month_events ? v = y[p] * c : (this.config.max_month_events + 1) * c > f && (v = (this.config.max_month_events + 1) * c), u[p].style.height = v + this.xy.month_head_height + "px";
              }
              y[p] = (y[p - 1] || 0) + t._get_first_visible_cell(d).offsetHeight;
            }
            y.unshift(0);
            const M = this.$container.querySelector(".dhx_cal_data");
            if (M.offsetHeight < M.scrollHeight && !t._colsS.scroll_fix && t.xy.scroll_width) {
              var x = t._colsS, b = x[x.col_length], w = x.heights.slice();
              b -= t.xy.scroll_width || 0, this._calc_scale_sizes(b, this._min_date, this._max_date), t._colsS.heights = w, this.set_xy(this._els.dhx_cal_header[0], b), t._render_scales(this._els.dhx_cal_header[0]), t._render_month_scale(this._els.dhx_cal_data[0], this._get_timeunit_start(), this._min_date), x.scroll_fix = !0;
            }
          } else if (i.length || this._els.dhx_multi_day[0].style.visibility != "visible" || (y[0] = -1), i.length || y[0] == -1) {
            var k = (y[0] + 1) * c + 4, E = k, D = k + "px";
            this.config.multi_day_height_limit && (D = (E = Math.min(k, this.config.multi_day_height_limit)) + "px");
            var S = this._els.dhx_multi_day[0];
            S.style.height = D, S.style.visibility = y[0] == -1 ? "hidden" : "visible", S.style.display = y[0] == -1 ? "none" : "";
            var N = this._els.dhx_multi_day[1];
            N.style.height = D, N.style.visibility = y[0] == -1 ? "hidden" : "visible", N.style.display = y[0] == -1 ? "none" : "", N.className = y[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (y[0] + 1) * c, this.config.multi_day_height_limit && (this._dy_shift = Math.min(this.config.multi_day_height_limit, this._dy_shift)), y[0] = 0, E != k && (S.style.overflowY = "auto", N.style.position = "fixed", N.style.top = "", N.style.left = "");
          }
        }
      return i;
    }, t._get_event_sday = function(i) {
      var s = this.date.day_start(new Date(i.start_date));
      return Math.round((s.valueOf() - this._min_date.valueOf()) / 864e5);
    }, t._get_event_mapped_end_date = function(i) {
      var s = i.end_date;
      if (this.config.separate_short_events) {
        var c = (i.end_date - i.start_date) / 6e4;
        c < this._min_mapped_duration && (s = this.date.add(s, this._min_mapped_duration - c, "minute"));
      }
      return s;
    }, t._pre_render_events_line = function(i, s) {
      i.sort(function(N, M) {
        return N.start_date.valueOf() == M.start_date.valueOf() ? N.id > M.id ? 1 : -1 : N.start_date > M.start_date ? 1 : -1;
      });
      var c = [], g = [];
      this._min_mapped_duration = Math.floor(60 * this.xy.min_event_height / this.config.hour_size_px);
      for (var y = 0; y < i.length; y++) {
        var m = i[y], u = m.start_date, p = m.end_date, d = u.getHours(), f = p.getHours();
        if (m._sday = this._get_event_sday(m), this._ignores[m._sday])
          i.splice(y, 1), y--;
        else {
          if (c[m._sday] || (c[m._sday] = []), !s) {
            m._inner = !1;
            for (var v = c[m._sday]; v.length; ) {
              var x = v[v.length - 1];
              if (!(this._get_event_mapped_end_date(x).valueOf() <= m.start_date.valueOf()))
                break;
              v.splice(v.length - 1, 1);
            }
            for (var b = v.length, w = !1, k = 0; k < v.length; k++)
              if (x = v[k], this._get_event_mapped_end_date(x).valueOf() <= m.start_date.valueOf()) {
                w = !0, m._sorder = x._sorder, b = k, m._inner = !0;
                break;
              }
            if (v.length && (v[v.length - 1]._inner = !0), !w)
              if (v.length)
                if (v.length <= v[v.length - 1]._sorder) {
                  if (v[v.length - 1]._sorder)
                    for (k = 0; k < v.length; k++) {
                      for (var E = !1, D = 0; D < v.length; D++)
                        if (v[D]._sorder == k) {
                          E = !0;
                          break;
                        }
                      if (!E) {
                        m._sorder = k;
                        break;
                      }
                    }
                  else
                    m._sorder = 0;
                  m._inner = !0;
                } else {
                  var S = v[0]._sorder;
                  for (k = 1; k < v.length; k++)
                    v[k]._sorder > S && (S = v[k]._sorder);
                  m._sorder = S + 1, m._inner = !1;
                }
              else
                m._sorder = 0;
            v.splice(b, b == v.length ? 0 : 1, m), v.length > (v.max_count || 0) ? (v.max_count = v.length, m._count = v.length) : m._count = m._count ? m._count : 1;
          }
          (d < this.config.first_hour || f >= this.config.last_hour) && (g.push(m), i[y] = m = this._copy_event(m), d < this.config.first_hour && (m.start_date.setHours(this.config.first_hour), m.start_date.setMinutes(0)), f >= this.config.last_hour && (m.end_date.setMinutes(0), m.end_date.setHours(this.config.last_hour)), m.start_date > m.end_date || d == this.config.last_hour) && (i.splice(y, 1), y--);
        }
      }
      if (!s) {
        for (y = 0; y < i.length; y++)
          i[y]._count = c[i[y]._sday].max_count;
        for (y = 0; y < g.length; y++)
          g[y]._count = c[g[y]._sday].max_count;
      }
      return i;
    }, t._time_order = function(i) {
      i.sort(function(s, c) {
        return s.start_date.valueOf() == c.start_date.valueOf() ? s._timed && !c._timed ? 1 : !s._timed && c._timed ? -1 : s.id > c.id ? 1 : -1 : s.start_date > c.start_date ? 1 : -1;
      });
    }, t._is_any_multiday_cell_visible = function(i, s, c) {
      var g = this._cols.length, y = !1, m = i, u = !0, p = new Date(s);
      for (t.date.day_start(new Date(s)).valueOf() != s.valueOf() && (p = t.date.day_start(p), p = t.date.add(p, 1, "day")); m < p; ) {
        u = !1;
        var d = this.locate_holder_day(m, !1, c) % g;
        if (!this._ignores[d]) {
          y = !0;
          break;
        }
        m = t.date.add(m, 1, "day");
      }
      return u || y;
    }, t._pre_render_events_table = function(i, s) {
      this._time_order(i);
      for (var c, g = [], y = [[], [], [], [], [], [], []], m = this._colsS.heights, u = this._cols.length, p = {}, d = 0; d < i.length; d++) {
        var f = i[d], v = f.id;
        p[v] || (p[v] = { first_chunk: !0, last_chunk: !0 });
        var x = p[v], b = c || f.start_date, w = f.end_date;
        b < this._min_date && (x.first_chunk = !1, b = this._min_date), w > this._max_date && (x.last_chunk = !1, w = this._max_date);
        var k = this.locate_holder_day(b, !1, f);
        if (f._sday = k % u, !this._ignores[f._sday] || !f._timed) {
          var E = this.locate_holder_day(w, !0, f) || u;
          if (f._eday = E % u || u, f._length = E - k, f._sweek = Math.floor((this._correct_shift(b.valueOf(), 1) - this._min_date.valueOf()) / (864e5 * u)), t._is_any_multiday_cell_visible(b, w, f)) {
            var D, S = y[f._sweek];
            for (D = 0; D < S.length && !(S[D]._eday <= f._sday); D++)
              ;
            if (f._sorder && s || (f._sorder = D), f._sday + f._length <= u)
              c = null, g.push(f), S[D] = f, m[f._sweek] = S.length - 1, f._first_chunk = x.first_chunk, f._last_chunk = x.last_chunk;
            else {
              var N = this._copy_event(f);
              N.id = f.id, N._length = u - f._sday, N._eday = u, N._sday = f._sday, N._sweek = f._sweek, N._sorder = f._sorder, N.end_date = this.date.add(b, N._length, "day"), N._first_chunk = x.first_chunk, x.first_chunk && (x.first_chunk = !1), g.push(N), S[D] = N, c = N.end_date, m[f._sweek] = S.length - 1, d--;
            }
          } else
            c = null;
        }
      }
      return g;
    }, t._copy_dummy = function() {
      var i = new Date(this.start_date), s = new Date(this.end_date);
      this.start_date = i, this.end_date = s;
    }, t._copy_event = function(i) {
      return this._copy_dummy.prototype = i, new this._copy_dummy();
    }, t._rendered = [], t.clear_view = function() {
      for (var i = 0; i < this._rendered.length; i++) {
        var s = this._rendered[i];
        s.parentNode && s.parentNode.removeChild(s);
      }
      this._rendered = [];
    }, t.updateEvent = function(i) {
      var s = this.getEvent(i);
      this.clear_event(i), s && this.is_visible_events(s) && this.filter_event(i, s) && (this._table_view || this.config.multi_day || s._timed) && (this.config.update_render ? this.render_view_data() : this.getState().mode != "month" || this.getState().drag_id || this.isOneDayEvent(s) ? this.render_view_data([s], !0) : this.render_view_data());
    }, t.clear_event = function(i) {
      this.for_rendered(i, function(s, c) {
        s.parentNode && s.parentNode.removeChild(s), t._rendered.splice(c, 1);
      });
    }, t._y_from_date = function(i) {
      var s = 60 * i.getHours() + i.getMinutes();
      return Math.round((60 * s * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px);
    }, t._calc_event_y = function(i, s) {
      s = s || 0;
      var c = 60 * i.start_date.getHours() + i.start_date.getMinutes(), g = 60 * i.end_date.getHours() + i.end_date.getMinutes() || 60 * t.config.last_hour;
      return { top: this._y_from_date(i.start_date), height: Math.max(s, (g - c) * this.config.hour_size_px / 60) };
    }, t.render_event = function(i, s, c) {
      var g = t.xy.menu_width, y = this.config.use_select_menu_space ? 0 : g;
      if (!(i._sday < 0)) {
        var m = t.locate_holder(i._sday);
        if (m) {
          s = s || m;
          var u = this._calc_event_y(i, t.xy.min_event_height), p = u.top, d = u.height, f = i._count || 1, v = i._sorder || 0;
          c = c || m.clientWidth, this.config.day_column_padding && (c -= this.config.day_column_padding);
          var x = Math.floor((c - y) / f), b = v * x + (v > 0 ? 2 : 1);
          if (i._inner || (x *= f - v), this.config.cascade_event_display) {
            var w = this.config.cascade_event_count, k = this.config.cascade_event_margin;
            b = v % w * k;
            var E = i._inner ? (f - v - 1) % w * k / 2 : 0;
            x = Math.floor(c - y - b - E);
          }
          i._mode = d < 30 ? "smallest" : d < 42 ? "small" : null;
          var D = this._render_v_bar(i, y + b, p, x, d, i._text_style, t.templates.event_header(i.start_date, i.end_date, i), t.templates.event_text(i.start_date, i.end_date, i));
          if (i._mode === "smallest" ? D.classList.add("dhx_cal_event--xsmall") : i._mode === "small" && D.classList.add("dhx_cal_event--small"), this._waiAria.eventAttr(i, D), this._rendered.push(D), s.appendChild(D), b = b + parseInt(this.config.rtl ? m.style.right : m.style.left, 10) + y, this._edit_id == i.id) {
            D.style.zIndex = 1, x = Math.max(x, t.xy.editor_width), (D = document.createElement("div")).setAttribute("event_id", i.id), D.setAttribute(this.config.event_attribute, i.id), this._waiAria.eventAttr(i, D), D.className = "dhx_cal_event dhx_cal_editor", this.config.rtl && b++, this.set_xy(D, x, d, b, p), i.color && D.style.setProperty("--dhx-scheduler-event-background", i.color);
            var S = t.templates.event_class(i.start_date, i.end_date, i);
            S && (D.className += " " + S);
            var N = document.createElement("div");
            N.style.cssText += "overflow:hidden;height:100%", D.appendChild(N), this._els.dhx_cal_data[0].appendChild(D), this._rendered.push(D), N.innerHTML = "<textarea class='dhx_cal_editor'>" + i.text + "</textarea>", this._editor = N.querySelector("textarea"), t.event(this._editor, "keydown", function(L) {
              if (L.shiftKey)
                return !0;
              var $ = L.keyCode;
              $ == t.keys.edit_save && t.editStop(!0), $ == t.keys.edit_cancel && t.editStop(!1), $ != t.keys.edit_save && $ != t.keys.edit_cancel || L.preventDefault && L.preventDefault();
            }), t.event(this._editor, "selectstart", function(L) {
              return L.cancelBubble = !0, !0;
            }), t._focus(this._editor, !0), this._els.dhx_cal_data[0].scrollLeft = 0;
          }
          if (this.xy.menu_width !== 0 && this._select_id == i.id) {
            this.config.cascade_event_display && this._drag_mode && (D.style.zIndex = 1);
            for (var M, A = this.config["icons_" + (this._edit_id == i.id ? "edit" : "select")], C = "", T = 0; T < A.length; T++) {
              const L = A[T];
              M = this._waiAria.eventMenuAttrString(L), C += `<div class='dhx_menu_icon ${L}' title='${this.locale.labels[L]}' ${M}></div>`;
            }
            var O = this._render_v_bar(i, b - g - 1, p, g, null, "", "<div class='dhx_menu_head'></div>", C, !0);
            i.color && O.style.setProperty("--dhx-scheduler-event-background", i.color), i.textColor && O.style.setProperty("--dhx-scheduler-event-color", i.textColor), this._els.dhx_cal_data[0].appendChild(O), this._rendered.push(O);
          }
          this.config.drag_highlight && this._drag_id == i.id && this.highlightEventPosition(i);
        }
      }
    }, t._render_v_bar = function(i, s, c, g, y, m, u, p, d) {
      var f = document.createElement("div"), v = i.id, x = d ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event", b = t.getState();
      b.drag_id == i.id && (x += " dhx_cal_event_drag"), b.select_id == i.id && (x += " dhx_cal_event_selected");
      var w = t.templates.event_class(i.start_date, i.end_date, i);
      w && (x = x + " " + w), this.config.cascade_event_display && (x += " dhx_cal_event_cascade");
      var k = g, E = '<div event_id="' + v + '" ' + this.config.event_attribute + '="' + v + '" class="' + x + '" style="position:absolute; top:' + c + "px; " + (this.config.rtl ? "right:" : "left:") + s + "px; width:" + k + "px; height:" + y + "px;" + (m || "") + '"></div>';
      f.innerHTML = E;
      var D = f.cloneNode(!0).firstChild;
      if (!d && t.renderEvent(D, i, g, y, u, p))
        return i.color && D.style.setProperty("--dhx-scheduler-event-background", i.color), i.textColor && D.style.setProperty("--dhx-scheduler-event-color", i.textColor), D;
      D = f.firstChild, i.color && D.style.setProperty("--dhx-scheduler-event-background", i.color), i.textColor && D.style.setProperty("--dhx-scheduler-event-color", i.textColor);
      var S = '<div class="dhx_event_move dhx_header" >&nbsp;</div>';
      S += '<div class="dhx_event_move dhx_title">' + u + "</div>", S += '<div class="dhx_body">' + p + "</div>";
      var N = "dhx_event_resize dhx_footer";
      return (d || i._drag_resize === !1) && (N = "dhx_resize_denied " + N), S += '<div class="' + N + '" style=" width:' + (d ? " margin-top:-1px;" : "") + '" ></div>', D.innerHTML = S, D;
    }, t.renderEvent = function() {
      return !1;
    }, t.locate_holder = function(i) {
      return this._mode == "day" ? this._els.dhx_cal_data[0].firstChild : this._els.dhx_cal_data[0].childNodes[i];
    }, t.locate_holder_day = function(i, s) {
      var c = Math.floor((this._correct_shift(i, 1) - this._min_date) / 864e5);
      return s && this.date.time_part(i) && c++, c;
    }, t._get_dnd_order = function(i, s, c) {
      if (!this._drag_event)
        return i;
      this._drag_event._orig_sorder ? i = this._drag_event._orig_sorder : this._drag_event._orig_sorder = i;
      for (var g = s * i; g + s > c; )
        i--, g -= s;
      return Math.max(i, 0);
    }, t._get_event_bar_pos = function(i) {
      var s = this.config.rtl, c = this._colsS, g = c[i._sday], y = c[i._eday];
      s && (g = c[c.col_length] - c[i._eday] + c[0], y = c[c.col_length] - c[i._sday] + c[0]), y == g && (y = c[i._eday + 1]);
      var m = this.xy.bar_height, u = i._sorder;
      if (i.id == this._drag_id) {
        var p = c.heights[i._sweek + 1] - c.heights[i._sweek] - this.xy.month_head_height;
        u = t._get_dnd_order(u, m, p);
      }
      var d = u * m;
      return { x: g, x2: y, y: c.heights[i._sweek] + (c.height ? this.xy.month_scale_height + 2 : 2) + d };
    }, t.render_event_bar = function(i) {
      var s = this._rendered_location, c = this._get_event_bar_pos(i), g = c.y, y = c.x, m = c.x2, u = "";
      if (m) {
        var p = t.config.resize_month_events && this._mode == "month" && (!i._timed || t.config.resize_month_timed), d = document.createElement("div"), f = i.hasOwnProperty("_first_chunk") && i._first_chunk, v = i.hasOwnProperty("_last_chunk") && i._last_chunk, x = p && (i._timed || f), b = p && (i._timed || v), w = !0, k = "dhx_cal_event_clear";
        i._timed && !p || (w = !1, k = "dhx_cal_event_line"), f && (k += " dhx_cal_event_line_start"), v && (k += " dhx_cal_event_line_end"), x && (u += "<div class='dhx_event_resize dhx_event_resize_start'></div>"), b && (u += "<div class='dhx_event_resize dhx_event_resize_end'></div>");
        var E = t.templates.event_class(i.start_date, i.end_date, i);
        E && (k += " " + E);
        var D = i.color ? "--dhx-scheduler-event-background:" + i.color + ";" : "", S = i.textColor ? "--dhx-scheduler-event-color:" + i.textColor + ";" : "", N = ["position:absolute", "top:" + g + "px", "left:" + y + "px", "width:" + (m - y - (w ? 1 : 0)) + "px", "height:" + (this.xy.bar_height - 2) + "px", S, D, i._text_style || ""].join(";"), M = "<div event_id='" + i.id + "' " + this.config.event_attribute + "='" + i.id + "' class='" + k + "' style='" + N + "'" + this._waiAria.eventBarAttrString(i) + ">";
        p && (M += u), t.getState().mode == "month" && (i = t.getEvent(i.id)), i._timed && (M += `<span class='dhx_cal_event_clear_date'>${t.templates.event_bar_date(i.start_date, i.end_date, i)}</span>`), M += "<div class='dhx_cal_event_line_content'>", M += t.templates.event_bar_text(i.start_date, i.end_date, i) + "</div>", M += "</div>", M += "</div>", d.innerHTML = M, this._rendered.push(d.firstChild), s.appendChild(d.firstChild);
      }
    }, t._locate_event = function(i) {
      for (var s = null; i && !s && i.getAttribute; )
        s = i.getAttribute(this.config.event_attribute), i = i.parentNode;
      return s;
    }, t.edit = function(i) {
      this._edit_id != i && (this.editStop(!1, i), this._edit_id = i, this.updateEvent(i));
    }, t.editStop = function(i, s) {
      if (!s || this._edit_id != s) {
        var c = this.getEvent(this._edit_id);
        c && (i && (c.text = this._editor.value), this._edit_id = null, this._editor = null, this.updateEvent(c.id), this._edit_stop_event(c, i));
      }
    }, t._edit_stop_event = function(i, s) {
      this._new_event ? (s ? this.callEvent("onEventAdded", [i.id, i]) : i && this.deleteEvent(i.id, !0), this._new_event = null) : s && this.callEvent("onEventChanged", [i.id, i]);
    }, t.getEvents = function(i, s) {
      var c = [];
      for (var g in this._events) {
        var y = this._events[g];
        y && (!i && !s || y.start_date < s && y.end_date > i) && c.push(y);
      }
      return c;
    }, t.getRenderedEvent = function(i) {
      if (i) {
        for (var s = t._rendered, c = 0; c < s.length; c++) {
          var g = s[c];
          if (g.getAttribute(t.config.event_attribute) == i)
            return g;
        }
        return null;
      }
    }, t.showEvent = function(i, s) {
      i && typeof i == "object" && (s = i.mode, v = i.section, i = i.section);
      var c = typeof i == "number" || typeof i == "string" ? t.getEvent(i) : i;
      if (s = s || t._mode, c && (!this.checkEvent("onBeforeEventDisplay") || this.callEvent("onBeforeEventDisplay", [c, s]))) {
        var g = t.config.scroll_hour;
        t.config.scroll_hour = c.start_date.getHours();
        var y = t.config.preserve_scroll;
        t.config.preserve_scroll = !1;
        var m = c.color, u = c.textColor;
        if (t.config.highlight_displayed_event && (c.color = t.config.displayed_event_color, c.textColor = t.config.displayed_event_text_color), t.setCurrentView(new Date(c.start_date), s), t.config.scroll_hour = g, t.config.preserve_scroll = y, t.matrix && t.matrix[s]) {
          var p = t.getView(), d = p.y_property, f = t.getEvent(c.id);
          if (f) {
            if (!v) {
              var v = f[d];
              Array.isArray(v) ? v = v[0] : typeof v == "string" && t.config.section_delimiter && v.indexOf(t.config.section_delimiter) > -1 && (v = v.split(t.config.section_delimiter)[0]);
            }
            var x = p.getSectionTop(v), b = p.posFromDate(f.start_date), w = t.$container.querySelector(".dhx_timeline_data_wrapper");
            if (b -= (w.offsetWidth - p.dx) / 2, x = x - w.offsetHeight / 2 + p.dy / 2, p._smartRenderingEnabled())
              var k = p.attachEvent("onScroll", function() {
                E(), p.detachEvent(k);
              });
            p.scrollTo({ left: b, top: x }), p._smartRenderingEnabled() || E();
          }
        } else
          E();
        t.callEvent("onAfterEventDisplay", [c, s]);
      }
      function E() {
        c.color = m, c.textColor = u;
      }
    };
  }(h), function(t) {
    t._append_drag_marker = function(i) {
      if (!i.parentNode) {
        var s = t._els.dhx_cal_data[0].lastChild, c = t._getClassName(s);
        c.indexOf("dhx_scale_holder") < 0 && s.previousSibling && (s = s.previousSibling), c = t._getClassName(s), s && c.indexOf("dhx_scale_holder") === 0 && s.appendChild(i);
      }
    }, t._update_marker_position = function(i, s) {
      var c = t._calc_event_y(s, 0);
      i.style.top = c.top + "px", i.style.height = c.height + "px";
    }, t.highlightEventPosition = function(i) {
      var s = document.createElement("div");
      s.setAttribute("event_id", i.id), s.setAttribute(this.config.event_attribute, i.id), this._rendered.push(s), this._update_marker_position(s, i);
      var c = this.templates.drag_marker_class(i.start_date, i.end_date, i), g = this.templates.drag_marker_content(i.start_date, i.end_date, i);
      s.className = "dhx_drag_marker", c && (s.className += " " + c), g && (s.innerHTML = g), this._append_drag_marker(s);
    };
  }(h), ot(h), function(t) {
    function i() {
      const s = t.config.csp === !0, c = !!window.Sfdc || !!window.$A || window.Aura || "$shadowResolver$" in document.body;
      return s || c ? t.$root : document.body;
    }
    t._lightbox_controls = {}, t.formSection = function(s) {
      for (var c = this.config.lightbox.sections, g = 0; g < c.length && c[g].name != s; g++)
        ;
      if (g === c.length)
        return null;
      var y = c[g];
      t._lightbox || t.getLightbox();
      var m = t._lightbox.querySelector(`#${y.id}`), u = m.nextSibling, p = { section: y, header: m, node: u, getValue: function(f) {
        return t.form_blocks[y.type].get_value(u, f || {}, y);
      }, setValue: function(f, v) {
        return t.form_blocks[y.type].set_value(u, f, v || {}, y);
      } }, d = t._lightbox_controls["get_" + y.type + "_control"];
      return d ? d(p) : p;
    }, t._lightbox_controls.get_template_control = function(s) {
      return s.control = s.node, s;
    }, t._lightbox_controls.get_select_control = function(s) {
      return s.control = s.node.getElementsByTagName("select")[0], s;
    }, t._lightbox_controls.get_textarea_control = function(s) {
      return s.control = s.node.getElementsByTagName("textarea")[0], s;
    }, t._lightbox_controls.get_time_control = function(s) {
      return s.control = s.node.getElementsByTagName("select"), s;
    }, t._lightbox_controls.defaults = { template: { height: 30 }, textarea: { height: 200 }, select: { height: 23 }, time: { height: 20 } }, t.form_blocks = { template: { render: function(s) {
      return "<div class='dhx_cal_ltext dhx_cal_template' ></div>";
    }, set_value: function(s, c, g, y) {
      s.innerHTML = c || "";
    }, get_value: function(s, c, g) {
      return s.innerHTML || "";
    }, focus: function(s) {
    } }, textarea: { render: function(s) {
      return `<div class='dhx_cal_ltext'><textarea ${s.placeholder ? `placeholder='${s.placeholder}'` : ""}></textarea></div>`;
    }, set_value: function(s, c, g) {
      t.form_blocks.textarea._get_input(s).value = c || "";
    }, get_value: function(s, c) {
      return t.form_blocks.textarea._get_input(s).value;
    }, focus: function(s) {
      var c = t.form_blocks.textarea._get_input(s);
      t._focus(c, !0);
    }, _get_input: function(s) {
      return s.getElementsByTagName("textarea")[0];
    } }, select: { render: function(s) {
      for (var c = "<div class='dhx_cal_ltext dhx_cal_select'><select style='width:100%;'>", g = 0; g < s.options.length; g++)
        c += "<option value='" + s.options[g].key + "'>" + s.options[g].label + "</option>";
      return c + "</select></div>";
    }, set_value: function(s, c, g, y) {
      var m = s.firstChild;
      !m._dhx_onchange && y.onchange && (t.event(m, "change", y.onchange), m._dhx_onchange = !0), c === void 0 && (c = (m.options[0] || {}).value), m.value = c || "";
    }, get_value: function(s, c) {
      return s.firstChild.value;
    }, focus: function(s) {
      var c = s.firstChild;
      t._focus(c, !0);
    } }, time: { render: function(s) {
      s.time_format || (s.time_format = ["%H:%i", "%d", "%m", "%Y"]), s._time_format_order = {};
      var c = s.time_format, g = t.config, y = t.date.date_part(t._currentDate()), m = 1440, u = 0;
      t.config.limit_time_select && (m = 60 * g.last_hour + 1, u = 60 * g.first_hour, y.setHours(g.first_hour));
      for (var p = "", d = 0; d < c.length; d++) {
        var f = c[d];
        d > 0 && (p += " ");
        var v = "", x = "";
        switch (f) {
          case "%Y":
            var b, w, k;
            v = "dhx_lightbox_year_select", s._time_format_order[3] = d, s.year_range && (isNaN(s.year_range) ? s.year_range.push && (w = s.year_range[0], k = s.year_range[1]) : b = s.year_range), b = b || 10;
            var E = E || Math.floor(b / 2);
            w = w || y.getFullYear() - E, k = k || w + b;
            for (var D = w; D < k; D++)
              x += "<option value='" + D + "'>" + D + "</option>";
            break;
          case "%m":
            for (v = "dhx_lightbox_month_select", s._time_format_order[2] = d, D = 0; D < 12; D++)
              x += "<option value='" + D + "'>" + this.locale.date.month_full[D] + "</option>";
            break;
          case "%d":
            for (v = "dhx_lightbox_day_select", s._time_format_order[1] = d, D = 1; D < 32; D++)
              x += "<option value='" + D + "'>" + D + "</option>";
            break;
          case "%H:%i":
            v = "dhx_lightbox_time_select", s._time_format_order[0] = d, D = u;
            var S = y.getDate();
            for (s._time_values = []; D < m; )
              x += "<option value='" + D + "'>" + this.templates.time_picker(y) + "</option>", s._time_values.push(D), y.setTime(y.valueOf() + 60 * this.config.time_step * 1e3), D = 24 * (y.getDate() != S ? 1 : 0) * 60 + 60 * y.getHours() + y.getMinutes();
        }
        if (x) {
          var N = t._waiAria.lightboxSelectAttrString(f);
          p += "<select class='" + v + "' " + (s.readonly ? "disabled='disabled'" : "") + N + ">" + x + "</select> ";
        }
      }
      return "<div class='dhx_section_time'>" + p + "<span style='font-weight:normal; font-size:10pt;' class='dhx_section_time_spacer'> &nbsp;&ndash;&nbsp; </span>" + p + "</div>";
    }, set_value: function(s, c, g, y) {
      var m, u, p = t.config, d = s.getElementsByTagName("select"), f = y._time_format_order;
      if (p.full_day) {
        if (!s._full_day) {
          var v = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + t.locale.labels.full_day + "&nbsp;</label></input>";
          t.config.wide_form || (v = s.previousSibling.innerHTML + v), s.previousSibling.innerHTML = v, s._full_day = !0;
        }
        var x = s.previousSibling.getElementsByTagName("input")[0];
        x.checked = t.date.time_part(g.start_date) === 0 && t.date.time_part(g.end_date) === 0, d[f[0]].disabled = x.checked, d[f[0] + d.length / 2].disabled = x.checked, x.$_eventAttached || (x.$_eventAttached = !0, t.event(x, "click", function() {
          if (x.checked) {
            var E = {};
            t.form_blocks.time.get_value(s, E, y), m = t.date.date_part(E.start_date), (+(u = t.date.date_part(E.end_date)) == +m || +u >= +m && (g.end_date.getHours() !== 0 || g.end_date.getMinutes() !== 0)) && (u = t.date.add(u, 1, "day"));
          } else
            m = null, u = null;
          d[f[0]].disabled = x.checked, d[f[0] + d.length / 2].disabled = x.checked, k(d, 0, m || g.start_date), k(d, 4, u || g.end_date);
        }));
      }
      if (p.auto_end_date && p.event_duration)
        for (var b = function() {
          p.auto_end_date && p.event_duration && (m = new Date(d[f[3]].value, d[f[2]].value, d[f[1]].value, 0, d[f[0]].value), u = new Date(m.getTime() + 60 * t.config.event_duration * 1e3), k(d, 4, u));
        }, w = 0; w < 4; w++)
          d[w].$_eventAttached || (d[w].$_eventAttached = !0, t.event(d[w], "change", b));
      function k(E, D, S) {
        for (var N = y._time_values, M = 60 * S.getHours() + S.getMinutes(), A = M, C = !1, T = 0; T < N.length; T++) {
          var O = N[T];
          if (O === M) {
            C = !0;
            break;
          }
          O < M && (A = O);
        }
        E[D + f[0]].value = C ? M : A, C || A || (E[D + f[0]].selectedIndex = -1), E[D + f[1]].value = S.getDate(), E[D + f[2]].value = S.getMonth(), E[D + f[3]].value = S.getFullYear();
      }
      k(d, 0, g.start_date), k(d, 4, g.end_date);
    }, get_value: function(s, c, g) {
      var y = s.getElementsByTagName("select"), m = g._time_format_order;
      if (c.start_date = new Date(y[m[3]].value, y[m[2]].value, y[m[1]].value, 0, y[m[0]].value), c.end_date = new Date(y[m[3] + 4].value, y[m[2] + 4].value, y[m[1] + 4].value, 0, y[m[0] + 4].value), !y[m[3]].value || !y[m[3] + 4].value) {
        var u = t.getEvent(t._lightbox_id);
        u && (c.start_date = u.start_date, c.end_date = u.end_date);
      }
      return c.end_date <= c.start_date && (c.end_date = t.date.add(c.start_date, t.config.time_step, "minute")), { start_date: new Date(c.start_date), end_date: new Date(c.end_date) };
    }, focus: function(s) {
      t._focus(s.getElementsByTagName("select")[0]);
    } } }, t._setLbPosition = function(s) {
      s && (s.style.top = Math.max(i().offsetHeight / 2 - s.offsetHeight / 2, 0) + "px", s.style.left = Math.max(i().offsetWidth / 2 - s.offsetWidth / 2, 0) + "px");
    }, t.showCover = function(s) {
      s && (s.style.display = "block", this._setLbPosition(s)), t.config.responsive_lightbox && (document.documentElement.classList.add("dhx_cal_overflow_container"), i().classList.add("dhx_cal_overflow_container")), this.show_cover(), this._cover.style.display = "";
    }, t.showLightbox = function(s) {
      if (s)
        if (this.callEvent("onBeforeLightbox", [s])) {
          this.showCover(c);
          var c = this.getLightbox();
          this._setLbPosition(c), this._fill_lightbox(s, c), this._waiAria.lightboxVisibleAttr(c), this.callEvent("onLightbox", [s]);
        } else
          this._new_event && (this._new_event = null);
    }, t._fill_lightbox = function(s, c) {
      var g = this.getEvent(s), y = c.getElementsByTagName("span"), m = [];
      if (t.templates.lightbox_header) {
        m.push("");
        var u = t.templates.lightbox_header(g.start_date, g.end_date, g);
        m.push(u), y[1].innerHTML = "", y[2].innerHTML = u;
      } else {
        var p = this.templates.event_header(g.start_date, g.end_date, g), d = (this.templates.event_bar_text(g.start_date, g.end_date, g) || "").substr(0, 70);
        m.push(p), m.push(d), y[1].innerHTML = p, y[2].innerHTML = d;
      }
      this._waiAria.lightboxHeader(c, m.join(" "));
      for (var f = this.config.lightbox.sections, v = 0; v < f.length; v++) {
        var x = f[v], b = t._get_lightbox_section_node(x), w = this.form_blocks[x.type], k = g[x.map_to] !== void 0 ? g[x.map_to] : x.default_value;
        w.set_value.call(this, b, k, g, x), f[v].focus && w.focus.call(this, b);
      }
      t._lightbox_id = s;
    }, t._get_lightbox_section_node = function(s) {
      return t._lightbox.querySelector(`#${s.id}`).nextSibling;
    }, t._lightbox_out = function(s) {
      for (var c = this.config.lightbox.sections, g = 0; g < c.length; g++) {
        var y = t._lightbox.querySelector(`#${c[g].id}`);
        y = y && y.nextSibling;
        var m = this.form_blocks[c[g].type].get_value.call(this, y, s, c[g]);
        c[g].map_to != "auto" && (s[c[g].map_to] = m);
      }
      return s;
    }, t._empty_lightbox = function(s) {
      var c = t._lightbox_id, g = this.getEvent(c);
      this._lame_copy(g, s), this.setEvent(g.id, g), this._edit_stop_event(g, !0), this.render_view_data();
    }, t.hide_lightbox = function(s) {
      t.endLightbox(!1, this.getLightbox());
    }, t.hideCover = function(s) {
      s && (s.style.display = "none"), this.hide_cover(), t.config.responsive_lightbox && (document.documentElement.classList.remove("dhx_cal_overflow_container"), i().classList.remove("dhx_cal_overflow_container"));
    }, t.hide_cover = function() {
      this._cover && this._cover.parentNode.removeChild(this._cover), this._cover = null;
    }, t.show_cover = function() {
      this._cover || (this._cover = document.createElement("div"), this._cover.className = "dhx_cal_cover", this._cover.style.display = "none", t.event(this._cover, "mousemove", t._move_while_dnd), t.event(this._cover, "mouseup", t._finish_dnd), i().appendChild(this._cover));
    }, t.save_lightbox = function() {
      var s = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
      this.checkEvent("onEventSave") && !this.callEvent("onEventSave", [this._lightbox_id, s, this._new_event]) || (this._empty_lightbox(s), this.hide_lightbox());
    }, t.startLightbox = function(s, c) {
      this._lightbox_id = s, this._custom_lightbox = !0, this._temp_lightbox = this._lightbox, this._lightbox = c, this.showCover(c);
    }, t.endLightbox = function(s, c) {
      c = c || t.getLightbox();
      var g = t.getEvent(this._lightbox_id);
      g && this._edit_stop_event(g, s), s && t.render_view_data(), this.hideCover(c), this._custom_lightbox && (this._lightbox = this._temp_lightbox, this._custom_lightbox = !1), this._temp_lightbox = this._lightbox_id = null, this._waiAria.lightboxHiddenAttr(c), this.resetLightbox(), this.callEvent("onAfterLightbox", []);
    }, t.resetLightbox = function() {
      t._lightbox && !t._custom_lightbox && t._lightbox.parentNode.removeChild(t._lightbox), t._lightbox = null;
    }, t.cancel_lightbox = function() {
      this._lightbox_id && this.callEvent("onEventCancel", [this._lightbox_id, !!this._new_event]), this.hide_lightbox();
    }, t.hideLightbox = t.cancel_lightbox, t._init_lightbox_events = function() {
      if (this.getLightbox().$_eventAttached)
        return;
      const s = this.getLightbox();
      s.$_eventAttached = !0, t.event(s, "click", function(c) {
        c.target.closest(".dhx_cal_ltitle_close_btn") && t.cancel_lightbox();
        const g = t.$domHelpers.closest(c.target, ".dhx_btn_set");
        if (!g) {
          const u = t.$domHelpers.closest(c.target, ".dhx_custom_button[data-section-index]");
          if (u) {
            const p = Number(u.getAttribute("data-section-index"));
            t.form_blocks[t.config.lightbox.sections[p].type].button_click(t.$domHelpers.closest(u, ".dhx_cal_lsection"), u, c);
          }
          return;
        }
        const y = g ? g.getAttribute("data-action") : null;
        switch (y) {
          case "dhx_save_btn":
          case "save":
            if (t.config.readonly_active)
              return;
            t.save_lightbox();
            break;
          case "dhx_delete_btn":
          case "delete":
            if (t.config.readonly_active)
              return;
            var m = t.locale.labels.confirm_deleting;
            t._dhtmlx_confirm({ message: m, title: t.locale.labels.title_confirm_deleting, callback: function() {
              t.deleteEvent(t._lightbox_id), t._new_event = null, t.hide_lightbox();
            }, config: { ok: t.locale.labels.icon_delete } });
            break;
          case "dhx_cancel_btn":
          case "cancel":
            t.cancel_lightbox();
            break;
          default:
            t.callEvent("onLightboxButton", [y, g, c]);
        }
      }), t.event(s, "keydown", function(c) {
        var g = c || window.event, y = c.target || c.srcElement, m = y.querySelector("[dhx_button]");
        switch (m || (m = y.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")), (c || g).keyCode) {
          case 32:
            if ((c || g).shiftKey)
              return;
            m && m.click && m.click();
            break;
          case t.keys.edit_save:
            if ((c || g).shiftKey)
              return;
            if (m && m.click)
              m.click();
            else {
              if (t.config.readonly_active)
                return;
              t.save_lightbox();
            }
            break;
          case t.keys.edit_cancel:
            t.cancel_lightbox();
        }
      });
    }, t.setLightboxSize = function() {
    }, t._init_dnd_events = function() {
      t.event(i(), "mousemove", t._move_while_dnd), t.event(i(), "mouseup", t._finish_dnd), t._init_dnd_events = function() {
      };
    }, t._move_while_dnd = function(s) {
      if (t._dnd_start_lb) {
        document.dhx_unselectable || (i().classList.add("dhx_unselectable"), document.dhx_unselectable = !0);
        var c = t.getLightbox(), g = [s.pageX, s.pageY];
        c.style.top = t._lb_start[1] + g[1] - t._dnd_start_lb[1] + "px", c.style.left = t._lb_start[0] + g[0] - t._dnd_start_lb[0] + "px";
      }
    }, t._ready_to_dnd = function(s) {
      var c = t.getLightbox();
      t._lb_start = [c.offsetLeft, c.offsetTop], t._dnd_start_lb = [s.pageX, s.pageY];
    }, t._finish_dnd = function() {
      t._lb_start && (t._lb_start = t._dnd_start_lb = !1, i().classList.remove("dhx_unselectable"), document.dhx_unselectable = !1);
    }, t.getLightbox = function() {
      if (!this._lightbox) {
        var s = document.createElement("div");
        s.className = "dhx_cal_light", t.config.wide_form && (s.className += " dhx_cal_light_wide"), t.form_blocks.recurring && (s.className += " dhx_cal_light_rec"), t.config.rtl && (s.className += " dhx_cal_light_rtl"), t.config.responsive_lightbox && (s.className += " dhx_cal_light_responsive"), s.style.visibility = "hidden";
        var c = this._lightbox_template, g = this.config.buttons_left;
        c += "<div class='dhx_cal_lcontrols'>";
        for (var y = 0; y < g.length; y++)
          c += "<div " + this._waiAria.lightboxButtonAttrString(g[y]) + " data-action='" + g[y] + "' class='dhx_btn_set dhx_" + (t.config.rtl ? "right" : "left") + "_btn_set " + g[y] + "_set'><div class='dhx_btn_inner " + g[y] + "'></div><div>" + t.locale.labels[g[y]] + "</div></div>";
        g = this.config.buttons_right;
        var m = t.config.rtl;
        for (y = 0; y < g.length; y++)
          c += "<div class='dhx_cal_lcontrols_push_right'></div>", c += "<div " + this._waiAria.lightboxButtonAttrString(g[y]) + " data-action='" + g[y] + "' class='dhx_btn_set dhx_" + (m ? "left" : "right") + "_btn_set " + g[y] + "_set'><div class='dhx_btn_inner " + g[y] + "'></div><div>" + t.locale.labels[g[y]] + "</div></div>";
        c += "</div>", c += "</div>", s.innerHTML = c, t.config.drag_lightbox && (t.event(s.firstChild, "mousedown", t._ready_to_dnd), t.event(s.firstChild, "selectstart", function(b) {
          return b.preventDefault(), !1;
        }), s.firstChild.style.cursor = "move", t._init_dnd_events()), this._waiAria.lightboxAttr(s), this.show_cover(), this._cover.insertBefore(s, this._cover.firstChild), this._lightbox = s;
        var u = this.config.lightbox.sections;
        for (c = "", y = 0; y < u.length; y++) {
          var p = this.form_blocks[u[y].type];
          if (p) {
            u[y].id = "area_" + this.uid();
            var d = "";
            u[y].button && (d = "<div " + t._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_" + u[y].button]) + " class='dhx_custom_button' data-section-index='" + y + "' index='" + y + "'><div class='dhx_custom_button_" + u[y].button + "'></div><div>" + this.locale.labels["button_" + u[y].button] + "</div></div>"), this.config.wide_form && (c += "<div class='dhx_wrap_section'>");
            var f = this.locale.labels["section_" + u[y].name];
            typeof f != "string" && (f = u[y].name), c += "<div id='" + u[y].id + "' class='dhx_cal_lsection'>" + d + "<label>" + f + "</label></div>" + p.render.call(this, u[y]), c += "</div>";
          }
        }
        var v = s.getElementsByTagName("div");
        for (y = 0; y < v.length; y++) {
          var x = v[y];
          if (t._getClassName(x) == "dhx_cal_larea") {
            x.innerHTML = c;
            break;
          }
        }
        t._bindLightboxLabels(u), this.setLightboxSize(), this._init_lightbox_events(this), s.style.visibility = "visible";
      }
      return this._lightbox;
    }, t._bindLightboxLabels = function(s) {
      for (var c = 0; c < s.length; c++) {
        var g = s[c];
        if (g.id && t._lightbox.querySelector(`#${g.id}`)) {
          for (var y = t._lightbox.querySelector(`#${g.id}`).querySelector("label"), m = t._get_lightbox_section_node(g); m && !m.querySelector; )
            m = m.nextSibling;
          var u = !0;
          if (m) {
            var p = m.querySelector("input, select, textarea");
            p && (g.inputId = p.id || "input_" + t.uid(), p.id || (p.id = g.inputId), y.setAttribute("for", g.inputId), u = !1);
          }
          u && t.form_blocks[g.type].focus && t.event(y, "click", function(d) {
            return function() {
              var f = t.form_blocks[d.type], v = t._get_lightbox_section_node(d);
              f && f.focus && f.focus.call(t, v);
            };
          }(g));
        }
      }
    }, t.attachEvent("onEventIdChange", function(s, c) {
      this._lightbox_id == s && (this._lightbox_id = c);
    }), t._lightbox_template = `<div class='dhx_cal_ltitle'><div class="dhx_cal_ltitle_descr"><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span>
</div>
<div class="dhx_cal_ltitle_controls">
<a class="dhx_cal_ltitle_close_btn scheduler_icon close"></a>
</div></div><div class='dhx_cal_larea'></div>`;
  }(h), st(h), function(t) {
    t.getRootView = function() {
      return { view: { render: function() {
        return { tag: "div", type: 1, attrs: { style: "width:100%;height:100%;" }, hooks: { didInsert: function() {
          t.setCurrentView();
        } }, body: [{ el: this.el, type: 1 }] };
      }, init: function() {
        var i = document.createElement("DIV");
        i.id = "scheduler_" + t.uid(), i.style.width = "100%", i.style.height = "100%", i.classList.add("dhx_cal_container"), i.cmp = "grid", i.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" data-tab="day"></div><div class="dhx_cal_tab" data-tab="week"></div><div class="dhx_cal_tab" data-tab="month"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', t.init(i), this.el = i;
      } }, type: 4 };
    };
  }(h), _t(h), window.jQuery && (n = window.jQuery, _ = 0, r = [], n.fn.dhx_scheduler = function(t) {
    if (typeof t != "string") {
      var i = [];
      return this.each(function() {
        if (this && this.getAttribute)
          if (this.getAttribute("dhxscheduler"))
            i.push(window[this.getAttribute("dhxscheduler")]);
          else {
            var s = "scheduler";
            _ && (s = "scheduler" + (_ + 1), window[s] = Scheduler.getSchedulerInstance());
            var c = window[s];
            for (var g in this.setAttribute("dhxscheduler", s), t)
              g != "data" && (c.config[g] = t[g]);
            this.getElementsByTagName("div").length || (this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', this.className += " dhx_cal_container"), c.init(this, c.config.date, c.config.mode), t.data && c.parse(t.data), i.push(c), _++;
          }
      }), i.length === 1 ? i[0] : i;
    }
    if (r[t])
      return r[t].apply(this, []);
    n.error("Method " + t + " does not exist on jQuery.dhx_scheduler");
  }), function(t) {
    (function() {
      var i = t.setCurrentView, s = t.updateView, c = null, g = null, y = function(p, d) {
        var f = this;
        H.clearTimeout(g), H.clearTimeout(c);
        var v = f._date, x = f._mode;
        u(this, p, d), g = setTimeout(function() {
          t.$destroyed || (f.callEvent("onBeforeViewChange", [x, v, d || f._mode, p || f._date]) ? (s.call(f, p, d), f.callEvent("onViewChange", [f._mode, f._date]), H.clearTimeout(c), g = 0) : u(f, v, x));
        }, t.config.delay_render);
      }, m = function(p, d) {
        var f = this, v = arguments;
        u(this, p, d), H.clearTimeout(c), c = setTimeout(function() {
          t.$destroyed || g || s.apply(f, v);
        }, t.config.delay_render);
      };
      function u(p, d, f) {
        d && (p._date = d), f && (p._mode = f);
      }
      t.attachEvent("onSchedulerReady", function() {
        t.config.delay_render ? (t.setCurrentView = y, t.updateView = m) : (t.setCurrentView = i, t.updateView = s);
      });
    })();
  }(h), function(t) {
    t.createDataProcessor = function(i) {
      var s, c;
      i instanceof Function ? s = i : i.hasOwnProperty("router") ? s = i.router : i.hasOwnProperty("event") && (s = i), c = s ? "CUSTOM" : i.mode || "REST-JSON";
      var g = new Ne(i.url);
      return g.init(t), g.setTransactionMode({ mode: c, router: s }, i.batchUpdate), g;
    }, t.DataProcessor = Ne;
  }(h), function(t) {
    t.attachEvent("onSchedulerReady", function() {
      typeof dhtmlxError < "u" && window.dhtmlxError.catchError("LoadXML", function(i, s, c) {
        var g = c[0].responseText;
        switch (t.config.ajax_error) {
          case "alert":
            H.alert(g);
            break;
          case "console":
            H.console.log(g);
        }
      });
    });
  }(h);
  const l = new Mt({ en: yt, ar: ct, be: ht, ca: ut, cn: ft, cs: vt, da: gt, de: mt, el: pt, es: xt, fi: bt, fr: wt, he: kt, hu: Et, id: Dt, it: St, jp: Nt, nb: At, nl: Ct, no: Tt, pl: Ot, pt: Lt, ro: Ht, ru: $t, si: zt, sk: Pt, sv: jt, tr: Vt, ua: It });
  h.i18n = { addLocale: l.addLocale, setLocale: function(t) {
    if (typeof t == "string") {
      var i = l.getLocale(t);
      i || (i = l.getLocale("en")), h.locale = i;
    } else if (t)
      if (h.locale)
        for (var s in t)
          t[s] && typeof t[s] == "object" ? (h.locale[s] || (h.locale[s] = {}), h.mixin(h.locale[s], t[s], !0)) : h.locale[s] = t[s];
      else
        h.locale = t;
    var c = h.locale.labels;
    c.dhx_save_btn = c.icon_save, c.dhx_cancel_btn = c.icon_cancel, c.dhx_delete_btn = c.icon_delete, h.$container && h.get_elements();
  }, getLocale: l.getLocale }, h.i18n.setLocale("en"), h.ext = {};
  const o = {};
  return h.plugins = function(t) {
    (function(s, c, g) {
      const y = [];
      for (const m in s)
        if (s[m]) {
          const u = m.toLowerCase();
          c[u] && c[u].forEach(function(p) {
            const d = p.toLowerCase();
            s[d] || y.push(d);
          }), y.push(u);
        }
      return y.sort(function(m, u) {
        const p = g[m] || 0, d = g[u] || 0;
        return p > d ? 1 : p < d ? -1 : 0;
      }), y;
    })(t, { treetimeline: ["timeline"], daytimeline: ["timeline"], outerdrag: ["legacy"] }, { legacy: 1, limit: 1, timeline: 2, daytimeline: 3, treetimeline: 3, outerdrag: 6 }).forEach(function(s) {
      if (!o[s]) {
        const c = e.getExtension(s);
        if (!c)
          throw new Error("unknown plugin " + s);
        c(h), o[s] = !0;
      }
    });
  }, h;
}
class qt {
  constructor(h) {
    this._extensions = {};
    for (const a in h)
      this._extensions[a] = h[a];
  }
  addExtension(h, a) {
    this._extensions[h] = a;
  }
  getExtension(h) {
    return this._extensions[h];
  }
}
typeof dhtmlx < "u" && dhtmlx.attaches && (dhtmlx.attaches.attachScheduler = function(e, h, a, n) {
  a = a || '<div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div>';
  var _ = document.createElement("DIV");
  return _.id = "dhxSchedObj_" + this._genStr(12), _.innerHTML = '<div id="' + _.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + a + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>', document.body.appendChild(_.firstChild), this.attachObject(_.id, !1, !0), this.vs[this.av].sched = n, this.vs[this.av].schedId = _.id, n.setSizes = n.updateView, n.destructor = function() {
  }, n.init(_.id, e, h), this.vs[this._viewRestore()].sched;
});
function ze(e) {
  e._inited_multisection_copies || (e.attachEvent("onEventIdChange", function(h, a) {
    var n = this._multisection_copies;
    if (n && n[h] && !n[a]) {
      var _ = n[h];
      delete n[h], n[a] = _;
    }
  }), e._inited_multisection_copies = !0), e._register_copies_array = function(h) {
    for (var a = 0; a < h.length; a++)
      this._register_copy(h[a]);
  }, e._register_copy = function(h) {
    if (this._multisection_copies) {
      this._multisection_copies[h.id] || (this._multisection_copies[h.id] = {});
      var a = h[this._get_section_property()];
      this._multisection_copies[h.id][a] = h;
    }
  }, e._get_copied_event = function(h, a) {
    if (!this._multisection_copies[h])
      return null;
    if (this._multisection_copies[h][a])
      return this._multisection_copies[h][a];
    var n = this._multisection_copies[h];
    if (e._drag_event && e._drag_event._orig_section && n[e._drag_event._orig_section])
      return n[e._drag_event._orig_section];
    var _ = 1 / 0, r = null;
    for (var l in n)
      n[l]._sorder < _ && (r = n[l], _ = n[l]._sorder);
    return r;
  }, e._clear_copied_events = function() {
    this._multisection_copies = {};
  }, e._restore_render_flags = function(h) {
    for (var a = this._get_section_property(), n = 0; n < h.length; n++) {
      var _ = h[n], r = e._get_copied_event(_.id, _[a]);
      if (r)
        for (var l in r)
          l.indexOf("_") === 0 && (_[l] = r[l]);
    }
  };
}
const be = { from_scheduler: null, to_scheduler: null, drag_data: null, drag_placeholder: null, delete_dnd_holder: function() {
  var e = this.drag_placeholder;
  e && (e.parentNode && e.parentNode.removeChild(e), document.body.className = document.body.className.replace(" dhx_no_select", ""), this.drag_placeholder = null);
}, copy_event_node: function(e, h) {
  for (var a = null, n = 0; n < h._rendered.length; n++) {
    var _ = h._rendered[n];
    if (_.getAttribute(h.config.event_attribute) == e.id || _.getAttribute(h.config.event_attribute) == h._drag_id) {
      (a = _.cloneNode(!0)).style.position = a.style.top = a.style.left = "";
      break;
    }
  }
  return a || document.createElement("div");
}, create_dnd_holder: function(e, h) {
  if (this.drag_placeholder)
    return this.drag_placeholder;
  var a = document.createElement("div"), n = h.templates.event_outside(e.start_date, e.end_date, e);
  return n ? a.innerHTML = n : a.appendChild(this.copy_event_node(e, h)), a.className = "dhx_drag_placeholder", a.style.position = "absolute", this.drag_placeholder = a, document.body.appendChild(a), document.body.className += " dhx_no_select", a;
}, move_dnd_holder: function(e) {
  var h = { x: e.clientX, y: e.clientY };
  if (this.create_dnd_holder(this.drag_data.ev, this.from_scheduler), this.drag_placeholder) {
    var a = h.x, n = h.y, _ = document.documentElement, r = document.body, l = this.drag_placeholder;
    l.style.left = 10 + a + (_ && _.scrollLeft || r && r.scrollLeft || 0) - (_.clientLeft || 0) + "px", l.style.top = 10 + n + (_ && _.scrollTop || r && r.scrollTop || 0) - (_.clientTop || 0) + "px";
  }
}, clear_scheduler_dnd: function(e) {
  e._drag_id = e._drag_pos = e._drag_mode = e._drag_event = e._new_event = null;
}, stop_drag: function(e) {
  e && this.clear_scheduler_dnd(e), this.delete_dnd_holder(), this.drag_data = null;
}, inject_into_scheduler: function(e, h, a) {
  e._count = 1, e._sorder = 0, e.event_pid && e.event_pid != "0" && (e.event_pid = null, e.rec_type = e.rec_pattern = "", e.event_length = 0), h._drag_event = e, h._events[e.id] = e, h._drag_id = e.id, h._drag_mode = "move", a && h._on_mouse_move(a);
}, start_dnd: function(e) {
  if (e.config.drag_out) {
    this.from_scheduler = e, this.to_scheduler = e;
    var h = this.drag_data = {};
    h.ev = e._drag_event, h.orig_id = e._drag_event.id;
  }
}, land_into_scheduler: function(e, h) {
  if (!e.config.drag_in)
    return this.move_dnd_holder(h), !1;
  var a = this.drag_data, n = e._lame_clone(a.ev);
  if (e != this.from_scheduler) {
    n.id = e.uid();
    var _ = n.end_date - n.start_date;
    n.start_date = new Date(e.getState().min_date), n.end_date = new Date(n.start_date.valueOf() + _);
  } else
    n.id = this.drag_data.orig_id, n._dhx_changed = !0;
  return this.drag_data.target_id = n.id, !!e.callEvent("onBeforeEventDragIn", [n.id, n, h]) && (this.to_scheduler = e, this.inject_into_scheduler(n, e, h), this.delete_dnd_holder(), e.updateView(), e.callEvent("onEventDragIn", [n.id, n, h]), !0);
}, drag_from_scheduler: function(e, h) {
  if (this.drag_data && e._drag_id && e.config.drag_out) {
    if (!e.callEvent("onBeforeEventDragOut", [e._drag_id, e._drag_event, h]))
      return !1;
    this.to_scheduler == e && (this.to_scheduler = null), this.create_dnd_holder(this.drag_data.ev, e);
    var a = e._drag_id;
    return this.drag_data.target_id = null, delete e._events[a], this.clear_scheduler_dnd(e), e.updateEvent(a), e.callEvent("onEventDragOut", [a, this.drag_data.ev, h]), !0;
  }
  return !1;
}, reset_event: function(e, h) {
  this.inject_into_scheduler(e, h), this.stop_drag(h), h.updateView();
}, move_permanently: function(e, h, a, n) {
  n.callEvent("onEventAdded", [h.id, h]), this.inject_into_scheduler(e, a), this.stop_drag(a), e.event_pid && e.event_pid != "0" ? (a.callEvent("onConfirmedBeforeEventDelete", [e.id]), a.updateEvent(h.event_pid)) : a.deleteEvent(e.id), a.updateView(), n.updateView();
} };
let Me = !1;
const qe = [];
function Fe(e) {
  e.attachEvent("onSchedulerReady", function() {
    (function(h) {
      h.event(document.body, "mousemove", function(a) {
        var n = be, _ = n.target_scheduler;
        if (_)
          if (n.from_scheduler) {
            if (!_._drag_id) {
              var r = n.to_scheduler;
              r && !n.drag_from_scheduler(r, a) || n.land_into_scheduler(_, a);
            }
          } else
            _.getState().drag_mode == "move" && _.config.drag_out && n.start_dnd(_);
        else
          n.from_scheduler && (n.to_scheduler ? n.drag_from_scheduler(n.to_scheduler, a) : n.move_dnd_holder(a));
        n.target_scheduler = null;
      }), h.event(document.body, "mouseup", function(a) {
        var n = be, _ = n.from_scheduler, r = n.to_scheduler;
        if (_)
          if (r && _ == r)
            _.updateEvent(n.drag_data.target_id);
          else if (r && _ !== r) {
            var l = n.drag_data.ev, o = r.getEvent(n.drag_data.target_id);
            _.callEvent("onEventDropOut", [l.id, l, r, a]) ? n.move_permanently(l, o, _, r) : n.reset_event(l, _);
          } else
            l = n.drag_data.ev, _.callEvent("onEventDropOut", [l.id, l, null, a]) && n.reset_event(l, _);
        n.stop_drag(), n.current_scheduler = n.from_scheduler = n.to_scheduler = null;
      });
    })(e), Me = !0;
  }, { once: !0 }), e.attachEvent("onDestroy", function() {
    Me = !1;
    const h = qe.unshift();
    h && Fe(h);
  }, { once: !0 });
}
function Ft(e) {
  (function() {
    var h = [];
    function a() {
      return !!h.length;
    }
    function n(o) {
      setTimeout(function() {
        if (e.$destroyed)
          return !0;
        a() || function(t, i) {
          for (; t && t != i; )
            t = t.parentNode;
          return t == i;
        }(document.activeElement, e.$container) || e.focus();
      }, 1);
    }
    function _(o) {
      var t = (o = o || window.event).currentTarget;
      t == h[h.length - 1] && e.$keyboardNavigation.trapFocus(t, o);
    }
    if (e.attachEvent("onLightbox", function() {
      var o;
      o = e.getLightbox(), e.eventRemove(o, "keydown", _), e.event(o, "keydown", _), h.push(o);
    }), e.attachEvent("onAfterLightbox", function() {
      var o = h.pop();
      o && e.eventRemove(o, "keydown", _), n();
    }), e.attachEvent("onAfterQuickInfo", function() {
      n();
    }), !e._keyNavMessagePopup) {
      e._keyNavMessagePopup = !0;
      var r = null, l = null;
      const o = [];
      e.attachEvent("onMessagePopup", function(t) {
        for (r = document.activeElement, l = r; l && e._getClassName(l).indexOf("dhx_cal_data") < 0; )
          l = l.parentNode;
        l && (l = l.parentNode), e.eventRemove(t, "keydown", _), e.event(t, "keydown", _), o.push(t);
      }), e.attachEvent("onAfterMessagePopup", function() {
        var t = o.pop();
        t && e.eventRemove(t, "keydown", _), setTimeout(function() {
          if (e.$destroyed)
            return !0;
          for (var i = document.activeElement; i && e._getClassName(i).indexOf("dhx_cal_light") < 0; )
            i = i.parentNode;
          i || (r && r.parentNode ? r.focus() : l && l.parentNode && l.focus(), r = null, l = null);
        }, 1);
      });
    }
    e.$keyboardNavigation.isModal = a;
  })();
}
function Yt(e) {
  e._temp_key_scope = function() {
    e.config.key_nav = !0, e.$keyboardNavigation._pasteDate = null, e.$keyboardNavigation._pasteSection = null;
    var h = null, a = {};
    function n(l) {
      l = l || window.event, a.x = l.clientX, a.y = l.clientY;
    }
    function _() {
      for (var l, o, t = document.elementFromPoint(a.x, a.y); t && t != e._obj; )
        t = t.parentNode;
      return l = t == e._obj, o = e.$keyboardNavigation.dispatcher.isEnabled(), l || o;
    }
    function r(l) {
      return e._lame_copy({}, l);
    }
    document.body ? e.event(document.body, "mousemove", n) : e.event(window, "load", function() {
      e.event(document.body, "mousemove", n);
    }), e.attachEvent("onMouseMove", function(l, o) {
      var t = e.getState();
      if (t.mode && t.min_date) {
        var i = e.getActionData(o);
        e.$keyboardNavigation._pasteDate = i.date, e.$keyboardNavigation._pasteSection = i.section;
      }
    }), e._make_pasted_event = function(l) {
      var o = e.$keyboardNavigation._pasteDate, t = e.$keyboardNavigation._pasteSection, i = l.end_date - l.start_date, s = r(l);
      if (function(g) {
        delete g.rec_type, delete g.rec_pattern, delete g.event_pid, delete g.event_length;
      }(s), s.start_date = new Date(o), s.end_date = new Date(s.start_date.valueOf() + i), t) {
        var c = e._get_section_property();
        e.config.multisection ? s[c] = l[c] : s[c] = t;
      }
      return s;
    }, e._do_paste = function(l, o, t) {
      e.callEvent("onBeforeEventPasted", [l, o, t]) !== !1 && (e.addEvent(o), e.callEvent("onEventPasted", [l, o, t]));
    }, e._is_key_nav_active = function() {
      return !(!this._is_initialized() || this._is_lightbox_open() || !this.config.key_nav);
    }, e.event(document, "keydown", function(l) {
      (l.ctrlKey || l.metaKey) && l.keyCode == 86 && e._buffer_event && !e.$keyboardNavigation.dispatcher.isEnabled() && (e.$keyboardNavigation.dispatcher.isActive = _());
    }), e._key_nav_copy_paste = function(l) {
      if (!e._is_key_nav_active())
        return !0;
      if (l.keyCode == 37 || l.keyCode == 39) {
        l.cancelBubble = !0;
        var o = e.date.add(e._date, l.keyCode == 37 ? -1 : 1, e._mode);
        return e.setCurrentView(o), !0;
      }
      var t, i = (t = e.$keyboardNavigation.dispatcher.getActiveNode()) && t.eventId ? t.eventId : e._select_id;
      if ((l.ctrlKey || l.metaKey) && l.keyCode == 67)
        return i && (e._buffer_event = r(e.getEvent(i)), h = !0, e.callEvent("onEventCopied", [e.getEvent(i)])), !0;
      if ((l.ctrlKey || l.metaKey) && l.keyCode == 88 && i) {
        h = !1;
        var s = e._buffer_event = r(e.getEvent(i));
        e.updateEvent(s.id), e.callEvent("onEventCut", [s]);
      }
      if ((l.ctrlKey || l.metaKey) && l.keyCode == 86 && _()) {
        if (s = (s = e._buffer_event ? e.getEvent(e._buffer_event.id) : e._buffer_event) || e._buffer_event) {
          var c = e._make_pasted_event(s);
          h ? (c.id = e.uid(), e._do_paste(h, c, s)) : e.callEvent("onBeforeEventChanged", [c, l, !1, s]) && (e._do_paste(h, c, s), h = !0);
        }
        return !0;
      }
    };
  }, e._temp_key_scope();
}
function Jt(e) {
  e.$keyboardNavigation.attachSchedulerHandlers = function() {
    var h, a = e.$keyboardNavigation.dispatcher, n = function(t) {
      if (e.config.key_nav)
        return a.keyDownHandler(t);
    }, _ = function() {
      a.keepScrollPosition(function() {
        a.focusGlobalNode();
      });
    };
    e.attachEvent("onDataRender", function() {
      e.config.key_nav && a.isEnabled() && !e.getState().editor_id && (clearTimeout(h), h = setTimeout(function() {
        if (e.$destroyed)
          return !0;
        a.isEnabled() || a.enable(), r();
      }));
    });
    var r = function() {
      if (a.isEnabled()) {
        var t = a.getActiveNode();
        t && (t.isValid() || (t = t.fallback()), !t || t instanceof e.$keyboardNavigation.MinicalButton || t instanceof e.$keyboardNavigation.MinicalCell || a.keepScrollPosition(function() {
          t.focus(!0);
        }));
      }
    };
    function l(t) {
      if (!e.config.key_nav)
        return !0;
      const i = e.getView();
      let s = !1;
      if (e.getState().mode === "month")
        s = e.$keyboardNavigation.isChildOf(t.target || t.srcElement, e.$container.querySelector(".dhx_cal_month_table"));
      else if (i && i.layout === "timeline")
        s = e.$keyboardNavigation.isChildOf(t.target || t.srcElement, e.$container.querySelector(".dhx_timeline_data_col"));
      else {
        const y = e.$container.querySelectorAll(".dhx_scale_holder");
        s = Array.from(y).some((m) => m === t.target.parentNode);
      }
      var c, g = e.getActionData(t);
      e._locate_event(t.target || t.srcElement) ? c = new e.$keyboardNavigation.Event(e._locate_event(t.target || t.srcElement)) : s && (c = new e.$keyboardNavigation.TimeSlot(), g.date && s && (c = c.nextSlot(new e.$keyboardNavigation.TimeSlot(g.date, null, g.section)))), c && (a.isEnabled() ? g.date && s && a.delay(function() {
        a.setActiveNode(c);
      }) : a.activeNode = c);
    }
    e.attachEvent("onSchedulerReady", function() {
      var t = e.$container;
      e.eventRemove(document, "keydown", n), e.eventRemove(t, "mousedown", l), e.eventRemove(t, "focus", _), e.config.key_nav ? (e.event(document, "keydown", n), e.event(t, "mousedown", l), e.event(t, "focus", _), t.setAttribute("tabindex", "0")) : t.removeAttribute("tabindex");
    });
    var o = e.updateEvent;
    e.updateEvent = function(t) {
      var i = o.apply(this, arguments);
      if (e.config.key_nav && a.isEnabled() && e.getState().select_id == t) {
        var s = new e.$keyboardNavigation.Event(t);
        e.getState().lightbox_id || function(c) {
          if (e.config.key_nav && a.isEnabled()) {
            var g = c, y = new e.$keyboardNavigation.Event(g.eventId);
            if (!y.isValid()) {
              var m = y.start || g.start, u = y.end || g.end, p = y.section || g.section;
              (y = new e.$keyboardNavigation.TimeSlot(m, u, p)).isValid() || (y = new e.$keyboardNavigation.TimeSlot());
            }
            a.setActiveNode(y);
            var d = a.getActiveNode();
            d && d.getNode && document.activeElement != d.getNode() && a.focusNode(a.getActiveNode());
          }
        }(s);
      }
      return i;
    }, e.attachEvent("onEventDeleted", function(t) {
      return e.config.key_nav && a.isEnabled() && a.getActiveNode().eventId == t && a.setActiveNode(new e.$keyboardNavigation.TimeSlot()), !0;
    }), e.attachEvent("onClearAll", function() {
      if (!e.config.key_nav)
        return !0;
      a.isEnabled() && a.getActiveNode() instanceof e.$keyboardNavigation.Event && a.setActiveNode(new e.$keyboardNavigation.TimeSlot());
    });
  };
}
function Ae(e, h, a) {
  return this.catches || (this.catches = []), this;
}
function Ut(e) {
  let h = null, a = null;
  function n(l) {
    h && clearInterval(h);
    const o = e.matrix[e._mode];
    if (!o)
      return;
    e._schedulerOuter = e.$container.querySelector(".dhx_timeline_data_wrapper"), o.scrollable || (e._schedulerOuter = e.$container.querySelector(".dhx_cal_data"));
    const t = { pageX: l.touches ? l.touches[0].pageX : l.pageX, pageY: l.touches ? l.touches[0].pageY : l.pageY };
    h = setInterval(function() {
      (function(i) {
        if (!e.getState().drag_id)
          return clearInterval(h), void (a = null);
        const s = e.matrix[e._mode];
        if (!s)
          return;
        const c = e._schedulerOuter, g = function(x, b) {
          const w = e.matrix[e._mode], k = {}, E = {};
          let D = b;
          for (k.x = x.touches ? x.touches[0].pageX : x.pageX, k.y = x.touches ? x.touches[0].pageY : x.pageY, E.left = D.offsetLeft + w.dx, E.top = D.offsetTop; D; )
            E.left += D.offsetLeft, E.top += D.offsetTop, D = D.offsetParent;
          return { x: k.x - E.left, y: k.y - E.top };
        }(i, c), y = c.offsetWidth - s.dx, m = c.offsetHeight, u = g.x, p = g.y;
        let d = s.autoscroll || {};
        d === !0 && (d = {}), e._merge(d, { range_x: 200, range_y: 100, speed_x: 20, speed_y: 10 });
        let f = _(u, y, a ? a.x : 0, d.range_x);
        s.scrollable || (f = 0);
        let v = _(p, m, a ? a.y : 0, d.range_y);
        !v && !f || a || (a = { x: u, y: p }, f = 0, v = 0), f *= d.speed_x, v *= d.speed_y, f && v && (Math.abs(f / 5) > Math.abs(v) ? v = 0 : Math.abs(v / 5) > Math.abs(f) && (f = 0)), f || v ? (a.started = !0, function(x, b) {
          const w = e._schedulerOuter;
          b && (w.scrollTop += b), x && (w.scrollLeft += x);
        }(f, v)) : clearInterval(h);
      })(t);
    }, 10);
  }
  function _(l, o, t, i) {
    return l < i && (!a || a.started || l < t) ? -1 : o - l < i && (!a || a.started || l > t) ? 1 : 0;
  }
  e.attachEvent("onDestroy", function() {
    clearInterval(h);
  });
  var r = e.attachEvent("onSchedulerReady", function() {
    e.matrix && (e.event(document.body, "mousemove", n), e.detachEvent(r));
  });
}
Ae.prototype.catchError = function(e, h) {
  this.catches[e] = h;
}, Ae.prototype.throwError = function(e, h, a) {
  return this.catches[e] ? this.catches[e](e, h, a) : this.catches.ALL ? this.catches.ALL(e, h, a) : (global.alert("Error type: " + arguments[0] + `
Description: ` + arguments[1]), null);
};
const Xt = function() {
  var e, h = { minMax: "[0;max]", maxMin: "[max;0]", nMaxMin: "[-max;0]" };
  function a() {
    var r = h.minMax, l = function() {
      var o = document.createElement("div");
      o.style.cssText = "direction: rtl;overflow: auto;width:100px;height: 100px;position:absolute;top: -100500px;left: -100500px;";
      var t = document.createElement("div");
      return t.style.cssText = "width: 100500px;height: 1px;", o.appendChild(t), o;
    }();
    return document.body.appendChild(l), l.scrollLeft > 0 ? r = h.minMax : (l.scrollLeft = -50, r = l.scrollLeft === -50 ? h.nMaxMin : h.maxMin), document.body.removeChild(l), r;
  }
  function n(r, l) {
    var o = _();
    return o === h.nMaxMin ? r ? -r : 0 : o === h.minMax ? l - r : r;
  }
  function _() {
    return e || (e = a()), e;
  }
  return { modes: h, getMode: _, normalizeValue: n, getScrollValue: function(r) {
    var l = getComputedStyle(r).direction;
    if (l && l !== "ltr") {
      var o = r.scrollWidth - r.offsetWidth;
      return n(r.scrollLeft, o);
    }
    return r.scrollLeft;
  }, setScrollValue: function(r, l) {
    var o = getComputedStyle(r).direction;
    if (o && o !== "ltr") {
      var t = n(l, r.scrollWidth - r.offsetWidth);
      r.scrollLeft = t;
    } else
      r.scrollLeft = l;
  } };
};
class Wt {
  constructor(h) {
    this._scheduler = h;
  }
  getNode() {
    const h = this._scheduler;
    return this._tooltipNode || (this._tooltipNode = document.createElement("div"), this._tooltipNode.className = "dhtmlXTooltip scheduler_tooltip tooltip", h._waiAria.tooltipAttr(this._tooltipNode)), h.config.rtl ? this._tooltipNode.classList.add("dhtmlXTooltip_rtl") : this._tooltipNode.classList.remove("dhtmlXTooltip_rtl"), this._tooltipNode;
  }
  setViewport(h) {
    return this._root = h, this;
  }
  show(h, a) {
    const n = this._scheduler, _ = n.$domHelpers, r = document.body, l = this.getNode();
    if (_.isChildOf(l, r) || (this.hide(), r.appendChild(l)), this._isLikeMouseEvent(h)) {
      const o = this._calculateTooltipPosition(h);
      a = o.top, h = o.left;
    }
    return l.style.top = a + "px", l.style.left = h + "px", n._waiAria.tooltipVisibleAttr(l), this;
  }
  hide() {
    const h = this._scheduler, a = this.getNode();
    return a && a.parentNode && a.parentNode.removeChild(a), h._waiAria.tooltipHiddenAttr(a), this;
  }
  setContent(h) {
    return this.getNode().innerHTML = h, this;
  }
  _isLikeMouseEvent(h) {
    return !(!h || typeof h != "object") && "clientX" in h && "clientY" in h;
  }
  _getViewPort() {
    return this._root || document.body;
  }
  _calculateTooltipPosition(h) {
    const a = this._scheduler, n = a.$domHelpers, _ = this._getViewPortSize(), r = this.getNode(), l = { top: 0, left: 0, width: r.offsetWidth, height: r.offsetHeight, bottom: 0, right: 0 }, o = a.config.tooltip_offset_x, t = a.config.tooltip_offset_y, i = document.body, s = n.getRelativeEventPosition(h, i), c = n.getNodePosition(i);
    s.y += c.y, l.top = s.y, l.left = s.x, l.top += t, l.left += o, l.bottom = l.top + l.height, l.right = l.left + l.width;
    const g = window.scrollY + i.scrollTop;
    return l.top < _.top - g ? (l.top = _.top, l.bottom = l.top + l.height) : l.bottom > _.bottom && (l.bottom = _.bottom, l.top = l.bottom - l.height), l.left < _.left ? (l.left = _.left, l.right = _.left + l.width) : l.right > _.right && (l.right = _.right, l.left = l.right - l.width), s.x >= l.left && s.x <= l.right && (l.left = s.x - l.width - o, l.right = l.left + l.width), s.y >= l.top && s.y <= l.bottom && (l.top = s.y - l.height - t, l.bottom = l.top + l.height), l;
  }
  _getViewPortSize() {
    const h = this._scheduler, a = h.$domHelpers, n = this._getViewPort();
    let _, r = n, l = window.scrollY + document.body.scrollTop, o = window.scrollX + document.body.scrollLeft;
    return n === h.$event_data ? (r = h.$event, l = 0, o = 0, _ = a.getNodePosition(h.$event)) : _ = a.getNodePosition(r), { left: _.x + o, top: _.y + l, width: _.width, height: _.height, bottom: _.y + _.height + l, right: _.x + _.width + o };
  }
}
class Kt {
  constructor(h) {
    this._listeners = {}, this.tooltip = new Wt(h), this._scheduler = h, this._domEvents = h._createDomEventScope(), this._initDelayedFunctions();
  }
  destructor() {
    this.tooltip.hide(), this._domEvents.detachAll();
  }
  hideTooltip() {
    this.delayHide();
  }
  attach(h) {
    let a = document.body;
    const n = this._scheduler, _ = n.$domHelpers;
    h.global || (a = n.$root);
    let r = null;
    const l = (o) => {
      const t = _.getTargetNode(o), i = _.closest(t, h.selector);
      if (_.isChildOf(t, this.tooltip.getNode()))
        return;
      const s = () => {
        r = i, h.onmouseenter(o, i);
      };
      r ? i && i === r ? h.onmousemove(o, i) : (h.onmouseleave(o, r), r = null, i && i !== r && s()) : i && s();
    };
    this.detach(h.selector), this._domEvents.attach(a, "mousemove", l), this._listeners[h.selector] = { node: a, handler: l };
  }
  detach(h) {
    const a = this._listeners[h];
    a && this._domEvents.detach(a.node, "mousemove", a.handler);
  }
  tooltipFor(h) {
    const a = (n) => {
      let _ = n;
      return document.createEventObject && !document.createEvent && (_ = document.createEventObject(n)), _;
    };
    this._initDelayedFunctions(), this.attach({ selector: h.selector, global: h.global, onmouseenter: (n, _) => {
      const r = h.html(n, _);
      r && this.delayShow(a(n), r);
    }, onmousemove: (n, _) => {
      const r = h.html(n, _);
      r ? this.delayShow(a(n), r) : (this.delayShow.$cancelTimeout(), this.delayHide());
    }, onmouseleave: () => {
      this.delayShow.$cancelTimeout(), this.delayHide();
    } });
  }
  _initDelayedFunctions() {
    const h = this._scheduler;
    this.delayShow && this.delayShow.$cancelTimeout(), this.delayHide && this.delayHide.$cancelTimeout(), this.tooltip.hide(), this.delayShow = ie.delay((a, n) => {
      h.callEvent("onBeforeTooltip", [a]) === !1 ? this.tooltip.hide() : (this.tooltip.setContent(n), this.tooltip.show(a));
    }, h.config.tooltip_timeout || 1), this.delayHide = ie.delay(() => {
      this.delayShow.$cancelTimeout(), this.tooltip.hide();
    }, h.config.tooltip_hide_timeout || 1);
  }
}
const Gt = { active_links: function(e) {
  e.config.active_link_view = "day", e._active_link_click = function(h) {
    var a = h.target.getAttribute("data-link-date"), n = e.date.str_to_date(e.config.api_date, !1, !0);
    if (a)
      return e.setCurrentView(n(a), e.config.active_link_view), h && h.preventDefault && h.preventDefault(), !1;
  }, e.attachEvent("onTemplatesReady", function() {
    var h = function(n, _) {
      _ = _ || n + "_scale_date", e.templates["_active_links_old_" + _] || (e.templates["_active_links_old_" + _] = e.templates[_]);
      var r = e.templates["_active_links_old_" + _], l = e.date.date_to_str(e.config.api_date);
      e.templates[_] = function(o) {
        return "<a data-link-date='" + l(o) + "' href='#'>" + r(o) + "</a>";
      };
    };
    if (h("week"), h("", "month_day"), this.matrix)
      for (var a in this.matrix)
        h(a);
    this._detachDomEvent(this._obj, "click", e._active_link_click), e.event(this._obj, "click", e._active_link_click);
  });
}, agenda_legacy: function(e) {
  e.date.add_agenda_legacy = function(h) {
    return e.date.add(h, 1, "year");
  }, e.templates.agenda_legacy_time = function(h, a, n) {
    return n._timed ? this.day_date(n.start_date, n.end_date, n) + " " + this.event_date(h) : e.templates.day_date(h) + " &ndash; " + e.templates.day_date(a);
  }, e.templates.agenda_legacy_text = function(h, a, n) {
    return n.text;
  }, e.templates.agenda_legacy_date = function() {
    return "";
  }, e.date.agenda_legacy_start = function() {
    return e.date.date_part(e._currentDate());
  }, e.attachEvent("onTemplatesReady", function() {
    var h = e.dblclick_dhx_cal_data;
    e.dblclick_dhx_cal_data = function() {
      if (this._mode == "agenda_legacy")
        !this.config.readonly && this.config.dblclick_create && this.addEventNow();
      else if (h)
        return h.apply(this, arguments);
    };
    var a = e.render_data;
    e.render_data = function(r) {
      if (this._mode != "agenda_legacy")
        return a.apply(this, arguments);
      _();
    };
    var n = e.render_view_data;
    function _() {
      var r = e.get_visible_events();
      r.sort(function(d, f) {
        return d.start_date > f.start_date ? 1 : -1;
      });
      for (var l, o = "<div class='dhx_agenda_area' " + e._waiAria.agendaDataAttrString() + ">", t = 0; t < r.length; t++) {
        var i = r[t], s = i.color ? "--dhx-scheduler-event-background:" + i.color + ";" : "", c = i.textColor ? "--dhx-scheduler-event-color:" + i.textColor + ";" : "", g = e.templates.event_class(i.start_date, i.end_date, i);
        l = e._waiAria.agendaEventAttrString(i);
        var y = e._waiAria.agendaDetailsBtnString();
        o += "<div " + l + " class='dhx_agenda_line" + (g ? " " + g : "") + "' event_id='" + i.id + "' " + e.config.event_attribute + "='" + i.id + "' style='" + c + s + (i._text_style || "") + "'><div class='dhx_agenda_event_time'>" + (e.config.rtl ? e.templates.agenda_time(i.end_date, i.start_date, i) : e.templates.agenda_time(i.start_date, i.end_date, i)) + "</div>", o += `<div ${y} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`, o += "<span>" + e.templates.agenda_text(i.start_date, i.end_date, i) + "</span></div>";
      }
      o += "<div class='dhx_v_border'></div></div>", e._els.dhx_cal_data[0].innerHTML = o, e._els.dhx_cal_data[0].childNodes[0].scrollTop = e._agendaScrollTop || 0;
      var m = e._els.dhx_cal_data[0].childNodes[0];
      m.childNodes[m.childNodes.length - 1].style.height = m.offsetHeight < e._els.dhx_cal_data[0].offsetHeight ? "100%" : m.offsetHeight + "px";
      var u = e._els.dhx_cal_data[0].firstChild.childNodes, p = e._getNavDateElement();
      for (p && (p.innerHTML = e.templates.agenda_date(e._min_date, e._max_date, e._mode)), e._rendered = [], t = 0; t < u.length - 1; t++)
        e._rendered[t] = u[t];
    }
    e.render_view_data = function() {
      return this._mode == "agenda_legacy" && (e._agendaScrollTop = e._els.dhx_cal_data[0].childNodes[0].scrollTop, e._els.dhx_cal_data[0].childNodes[0].scrollTop = 0), n.apply(this, arguments);
    }, e.agenda_legacy_view = function(r) {
      e._min_date = e.config.agenda_start || e.date.agenda_legacy_start(e._date), e._max_date = e.config.agenda_end || e.date.add_agenda_legacy(e._min_date, 1), function(l) {
        if (l) {
          var o = e.locale.labels, t = e._waiAria.agendaHeadAttrString(), i = e._waiAria.agendaHeadDateString(o.date), s = e._waiAria.agendaHeadDescriptionString(o.description);
          e._els.dhx_cal_header[0].innerHTML = "<div " + t + " class='dhx_agenda_line dhx_agenda_line_header'><div " + i + ">" + o.date + "</div><span class = 'description_header' style='padding-left:25px' " + s + ">" + o.description + "</span></div>", e._table_view = !0, e.set_sizes();
        }
      }(r), r ? (e._cols = null, e._colsS = null, e._table_view = !0, _()) : e._table_view = !1;
    };
  });
}, agenda_view: function(e) {
  e.date.add_agenda = function(_, r) {
    return e.date.add(_, 1 * r, "month");
  }, e.templates.agenda_time = function(_, r, l) {
    return l._timed ? `${this.event_date(_)} - ${this.event_date(r)}` : e.locale.labels.full_day;
  }, e.templates.agenda_text = function(_, r, l) {
    return l.text;
  };
  const h = e.date.date_to_str("%F %j"), a = e.date.date_to_str("%l");
  e.templates.agenda_day = function(_) {
    return `<div class="dhx_agenda_day_date">${h(_)}</div>
		<div class="dhx_agenda_day_dow">${a(_)}</div>`;
  }, e.templates.agenda_date = function(_, r) {
    return e.templates.month_date(e.getState().date);
  }, e.date.agenda_start = function(_) {
    return e.date.month_start(new Date(_));
  };
  let n = 0;
  e.attachEvent("onTemplatesReady", function() {
    var _ = e.dblclick_dhx_cal_data;
    e.dblclick_dhx_cal_data = function() {
      if (this._mode == "agenda")
        !this.config.readonly && this.config.dblclick_create && this.addEventNow();
      else if (_)
        return _.apply(this, arguments);
    };
    var r = e.render_data;
    e.render_data = function(i) {
      if (this._mode != "agenda")
        return r.apply(this, arguments);
      o();
    };
    var l = e.render_view_data;
    function o() {
      const i = e.get_visible_events();
      i.sort(function(p, d) {
        return p.start_date > d.start_date ? 1 : -1;
      });
      const s = {};
      let c = e.getState().min_date;
      const g = e.getState().max_date;
      for (; c.valueOf() < g.valueOf(); )
        s[c.valueOf()] = [], c = e.date.add(c, 1, "day");
      let y = !1;
      if (i.forEach((p) => {
        let d = e.date.day_start(new Date(p.start_date));
        for (; d.valueOf() < p.end_date.valueOf(); )
          s[d.valueOf()] && (s[d.valueOf()].push(p), y = !0), d = e.date.day_start(e.date.add(d, 1, "day"));
      }), y) {
        let p = "";
        for (let d in s)
          p += t(new Date(1 * d), s[d]);
        e._els.dhx_cal_data[0].innerHTML = p;
      } else
        e._els.dhx_cal_data[0].innerHTML = `<div class="dhx_cal_agenda_no_events">${e.locale.labels.agenda_tab}</div>`;
      e._els.dhx_cal_data[0].scrollTop = n;
      let m = e._els.dhx_cal_data[0].querySelectorAll(".dhx_cal_agenda_event_line");
      e._rendered = [];
      for (var u = 0; u < m.length - 1; u++)
        e._rendered[u] = m[u];
    }
    function t(i, s) {
      if (!s.length)
        return "";
      let c = `
<div class="dhx_cal_agenda_day">
	<div class="dhx_cal_agenda_day_header">${e.templates.agenda_day(i)}</div>
	<div class="dhx_cal_agenda_day_events">
`;
      return s.forEach((g) => {
        c += function(y, m) {
          const u = e.templates.agenda_time(m.start_date, m.end_date, m), p = e.getState().select_id, d = e.templates.event_class(m.start_date, m.end_date, m), f = e.templates.agenda_text(m.start_date, m.end_date, m);
          let v = "";
          return (m.color || m.textColor) && (v = ` style="${m.color ? "--dhx-scheduler-event-background:" + m.color + ";" : ""}${m.textColor ? "--dhx-scheduler-event-color:" + m.textColor + ";" : ""}" `), `<div class="dhx_cal_agenda_event_line ${d || ""} ${m.id == p ? "dhx_cal_agenda_event_line_selected" : ""}" ${v} ${e.config.event_attribute}="${m.id}">
	<div class="dhx_cal_agenda_event_line_marker"></div>
	<div class="dhx_cal_agenda_event_line_time">${u}</div>
	<div class="dhx_cal_agenda_event_line_text">${f}</div>
</div>`;
        }(0, g);
      }), c += "</div></div>", c;
    }
    e.render_view_data = function() {
      return this._mode == "agenda" && (n = e._els.dhx_cal_data[0].scrollTop, e._els.dhx_cal_data[0].scrollTop = 0), l.apply(this, arguments);
    }, e.agenda_view = function(i) {
      i ? (e._min_date = e.config.agenda_start || e.date.agenda_start(e._date), e._max_date = e.config.agenda_end || e.date.add_agenda(e._min_date, 1), e._cols = null, e._colsS = null, e._table_view = !0, e._getNavDateElement().innerHTML = e.templates.agenda_date(e._date), o()) : e._table_view = !1;
    };
  });
}, all_timed: function(e) {
  e.config.all_timed = "short", e.config.all_timed_month = !1;
  var h = function(o) {
    return !((o.end_date - o.start_date) / 36e5 >= 24) || e._drag_mode == "resize" && e._drag_id == o.id;
  };
  e._safe_copy = function(o) {
    var t = null, i = e._copy_event(o);
    return o.event_pid && (t = e.getEvent(o.event_pid)), t && t.isPrototypeOf(o) && (delete i.event_length, delete i.event_pid, delete i.rec_pattern, delete i.rec_type), i;
  };
  var a = e._pre_render_events_line, n = e._pre_render_events_table, _ = function(o, t) {
    return this._table_view ? n.call(this, o, t) : a.call(this, o, t);
  };
  e._pre_render_events_line = e._pre_render_events_table = function(o, t) {
    if (!this.config.all_timed || this._table_view && this._mode != "month" || this._mode == "month" && !this.config.all_timed_month)
      return _.call(this, o, t);
    for (var i = 0; i < o.length; i++) {
      var s = o[i];
      if (!s._timed)
        if (this.config.all_timed != "short" || h(s)) {
          var c = this._safe_copy(s);
          s._virtual ? c._first_chunk = !1 : c._first_chunk = !0, c._drag_resize = !1, c._virtual = !0, c.start_date = new Date(c.start_date), u(s) ? (c.end_date = p(c.start_date), this.config.last_hour != 24 && (c.end_date = d(c.start_date, this.config.last_hour))) : c.end_date = new Date(s.end_date);
          var g = !1;
          c.start_date < this._max_date && c.end_date > this._min_date && c.start_date < c.end_date && (o[i] = c, g = !0);
          var y = this._safe_copy(s);
          if (y._virtual = !0, y.end_date = new Date(y.end_date), y.start_date < this._min_date ? y.start_date = d(this._min_date, this.config.first_hour) : y.start_date = d(p(s.start_date), this.config.first_hour), y.start_date < this._max_date && y.start_date < y.end_date) {
            if (!g) {
              o[i--] = y;
              continue;
            }
            o.splice(i + 1, 0, y), y._last_chunk = !1;
          } else
            c._last_chunk = !0, c._drag_resize = !0;
        } else
          this._mode != "month" && o.splice(i--, 1);
    }
    var m = this._drag_mode != "move" && t;
    return _.call(this, o, m);
    function u(f) {
      var v = p(f.start_date);
      return +f.end_date > +v;
    }
    function p(f) {
      var v = e.date.add(f, 1, "day");
      return v = e.date.date_part(v);
    }
    function d(f, v) {
      var x = e.date.date_part(new Date(f));
      return x.setHours(v), x;
    }
  };
  var r = e.get_visible_events;
  e.get_visible_events = function(o) {
    return this.config.all_timed && this.config.multi_day ? r.call(this, !1) : r.call(this, o);
  }, e.attachEvent("onBeforeViewChange", function(o, t, i, s) {
    return e._allow_dnd = i == "day" || i == "week" || e.getView(i), !0;
  }), e._is_main_area_event = function(o) {
    return !!(o._timed || this.config.all_timed === !0 || this.config.all_timed == "short" && h(o));
  };
  var l = e.updateEvent;
  e.updateEvent = function(o) {
    var t, i, s = e.getEvent(o);
    s && (t = e.config.all_timed && !(e.isOneDayEvent(e._events[o]) || e.getState().drag_id)) && (i = e.config.update_render, e.config.update_render = !0), l.apply(e, arguments), s && t && (e.config.update_render = i);
  };
}, collision: function(e) {
  var h, a;
  function n(_) {
    e._get_section_view() && _ && (h = e.getEvent(_)[e._get_section_property()]);
  }
  e.config.collision_limit = 1, e.attachEvent("onBeforeDrag", function(_) {
    return n(_), !0;
  }), e.attachEvent("onBeforeLightbox", function(_) {
    var r = e.getEvent(_);
    return a = [r.start_date, r.end_date], n(_), !0;
  }), e.attachEvent("onEventChanged", function(_) {
    if (!_ || !e.getEvent(_))
      return !0;
    var r = e.getEvent(_);
    if (!e.checkCollision(r)) {
      if (!a)
        return !1;
      r.start_date = a[0], r.end_date = a[1], r._timed = this.isOneDayEvent(r);
    }
    return !0;
  }), e.attachEvent("onBeforeEventChanged", function(_, r, l) {
    return e.checkCollision(_);
  }), e.attachEvent("onEventAdded", function(_, r) {
    e.checkCollision(r) || e.deleteEvent(_);
  }), e.attachEvent("onEventSave", function(_, r, l) {
    if ((r = e._lame_clone(r)).id = _, !r.start_date || !r.end_date) {
      var o = e.getEvent(_);
      r.start_date = new Date(o.start_date), r.end_date = new Date(o.end_date);
    }
    return r.rec_type && e._roll_back_dates(r), e.checkCollision(r);
  }), e._check_sections_collision = function(_, r) {
    var l = e._get_section_property();
    return _[l] == r[l] && _.id != r.id;
  }, e.checkCollision = function(_) {
    var r = [], l = e.config.collision_limit;
    if (_.rec_type)
      for (var o = e.getRecDates(_), t = 0; t < o.length; t++)
        for (var i = e.getEvents(o[t].start_date, o[t].end_date), s = 0; s < i.length; s++)
          (i[s].event_pid || i[s].id) != _.id && r.push(i[s]);
    else {
      r = e.getEvents(_.start_date, _.end_date);
      for (var c = 0; c < r.length; c++) {
        var g = r[c];
        if (g.id == _.id || g.event_length && [g.event_pid, g.event_length].join("#") == _.id) {
          r.splice(c, 1);
          break;
        }
      }
    }
    var y = e._get_section_view(), m = e._get_section_property(), u = !0;
    if (y) {
      var p = 0;
      for (c = 0; c < r.length; c++)
        r[c].id != _.id && this._check_sections_collision(r[c], _) && p++;
      p >= l && (u = !1);
    } else
      r.length >= l && (u = !1);
    if (!u) {
      var d = !e.callEvent("onEventCollision", [_, r]);
      return d || (_[m] = h || _[m]), d;
    }
    return u;
  };
}, container_autoresize: function(e) {
  e.config.container_autoresize = !0, e.config.month_day_min_height = 90, e.config.min_grid_size = 25, e.config.min_map_size = 400;
  var h = e._pre_render_events, a = !0, n = 0, _ = 0;
  e._pre_render_events = function(s, c) {
    if (!e.config.container_autoresize || !a)
      return h.apply(this, arguments);
    var g = this.xy.bar_height, y = this._colsS.heights, m = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], u = this._els.dhx_cal_data[0];
    if (s = this._table_view ? this._pre_render_events_table(s, c) : this._pre_render_events_line(s, c), this._table_view)
      if (c)
        this._colsS.heights = y;
      else {
        var p = u.firstChild;
        const k = p.querySelectorAll(".dhx_cal_month_row");
        if (k) {
          for (var d = 0; d < k.length; d++) {
            if (m[d]++, m[d] * g > this._colsS.height - this.xy.month_head_height) {
              var f = k[d].querySelectorAll(".dhx_cal_month_cell"), v = this._colsS.height - this.xy.month_head_height;
              1 * this.config.max_month_events !== this.config.max_month_events || m[d] <= this.config.max_month_events ? v = m[d] * g : (this.config.max_month_events + 1) * g > this._colsS.height - this.xy.month_head_height && (v = (this.config.max_month_events + 1) * g), k[d].style.height = v + this.xy.month_head_height + "px";
              for (var x = 0; x < f.length; x++)
                f[x].childNodes[1].style.height = v + "px";
              m[d] = (m[d - 1] || 0) + f[0].offsetHeight;
            }
            m[d] = (m[d - 1] || 0) + k[d].querySelectorAll(".dhx_cal_month_cell")[0].offsetHeight;
          }
          m.unshift(0), p.parentNode.offsetHeight < p.parentNode.scrollHeight && p._h_fix;
        } else if (s.length || this._els.dhx_multi_day[0].style.visibility != "visible" || (m[0] = -1), s.length || m[0] == -1) {
          var b = (m[0] + 1) * g + 1;
          _ != b + 1 && (this._obj.style.height = n - _ + b - 1 + "px"), b += "px";
          const E = this._els.dhx_cal_navline[0].offsetHeight, D = this._els.dhx_cal_header[0].offsetHeight;
          u.style.height = this._obj.offsetHeight - E - D - (this.xy.margin_top || 0) + "px";
          var w = this._els.dhx_multi_day[0];
          w.style.height = b, w.style.visibility = m[0] == -1 ? "hidden" : "visible", (w = this._els.dhx_multi_day[1]).style.height = b, w.style.visibility = m[0] == -1 ? "hidden" : "visible", w.style.visibility == "hidden" ? w.style.display = "none" : w.style.display = "", w.className = m[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (m[0] + 1) * g, m[0] = 0;
        }
      }
    return s;
  };
  var r = ["dhx_cal_navline", "dhx_cal_header", "dhx_multi_day", "dhx_cal_data"], l = function(s) {
    n = 0;
    for (var c = 0; c < r.length; c++) {
      var g = r[c], y = e._els[g] ? e._els[g][0] : null, m = 0;
      switch (g) {
        case "dhx_cal_navline":
        case "dhx_cal_header":
          m = y.offsetHeight;
          break;
        case "dhx_multi_day":
          m = y ? y.offsetHeight - 1 : 0, _ = m;
          break;
        case "dhx_cal_data":
          var u = e.getState().mode;
          if (y.childNodes[1] && u != "month") {
            let M = 0;
            for (let A = 0; A < y.childNodes.length; A++)
              y.childNodes[A].offsetHeight > M && (M = y.childNodes[A].offsetHeight);
            m = M;
          } else
            m = Math.max(y.offsetHeight - 1, y.scrollHeight);
          if (u == "month")
            e.config.month_day_min_height && !s && (m = y.querySelectorAll(".dhx_cal_month_row").length * e.config.month_day_min_height), s && (y.style.height = m + "px");
          else if (u == "year")
            m = 190 * e.config.year_y;
          else if (u == "agenda") {
            if (m = 0, y.childNodes && y.childNodes.length)
              for (var p = 0; p < y.childNodes.length; p++)
                m += y.childNodes[p].offsetHeight;
            m + 2 < e.config.min_grid_size ? m = e.config.min_grid_size : m += 2;
          } else if (u == "week_agenda") {
            for (var d, f, v = e.xy.week_agenda_scale_height + e.config.min_grid_size, x = 0; x < y.childNodes.length; x++)
              for (f = y.childNodes[x], p = 0; p < f.childNodes.length; p++) {
                for (var b = 0, w = f.childNodes[p].childNodes[1], k = 0; k < w.childNodes.length; k++)
                  b += w.childNodes[k].offsetHeight;
                d = b + e.xy.week_agenda_scale_height, (d = x != 1 || p != 2 && p != 3 ? d : 2 * d) > v && (v = d);
              }
            m = 3 * v;
          } else if (u == "map") {
            m = 0;
            var E = y.querySelectorAll(".dhx_map_line");
            for (p = 0; p < E.length; p++)
              m += E[p].offsetHeight;
            m + 2 < e.config.min_map_size ? m = e.config.min_map_size : m += 2;
          } else if (e._gridView)
            if (m = 0, y.childNodes[1].childNodes[0].childNodes && y.childNodes[1].childNodes[0].childNodes.length) {
              for (E = y.childNodes[1].childNodes[0].childNodes[0].childNodes, p = 0; p < E.length; p++)
                m += E[p].offsetHeight;
              (m += 2) < e.config.min_grid_size && (m = e.config.min_grid_size);
            } else
              m = e.config.min_grid_size;
          if (e.matrix && e.matrix[u]) {
            if (s)
              m += 0, y.style.height = m + "px";
            else {
              m = 0;
              for (var D = e.matrix[u], S = D.y_unit, N = 0; N < S.length; N++)
                m += D.getSectionHeight(S[N].key);
              e.$container.clientWidth != e.$container.scrollWidth && (m += i());
            }
            m -= 1;
          }
          (u == "day" || u == "week" || e._props && e._props[u]) && (m += 2);
      }
      n += m += 1;
    }
    e._obj.style.height = n + "px", s || e.updateView();
  };
  function o() {
    a = !1, e.callEvent("onAfterSchedulerResize", []), a = !0;
  }
  var t = function() {
    if (!e.config.container_autoresize || !a)
      return !0;
    var s = e.getState().mode;
    if (!s)
      return !0;
    var c = window.requestAnimationFrame || window.setTimeout, g = document.documentElement.scrollTop;
    c(function() {
      !e.$destroyed && e.$initialized && l();
    }), e.matrix && e.matrix[s] || s == "month" ? c(function() {
      !e.$destroyed && e.$initialized && (l(!0), document.documentElement.scrollTop = g, o());
    }, 1) : o();
  };
  function i() {
    var s = document.createElement("div");
    s.style.cssText = "visibility:hidden;position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;height:110px;min-height:100px;overflow-y:scroll;", document.body.appendChild(s);
    var c = s.offsetWidth - s.clientWidth;
    return document.body.removeChild(s), c;
  }
  e.attachEvent("onBeforeViewChange", function() {
    var s = e.config.container_autoresize;
    if (e.xy.$original_scroll_width || (e.xy.$original_scroll_width = e.xy.scroll_width), e.xy.scroll_width = s ? 0 : e.xy.$original_scroll_width, e.matrix)
      for (var c in e.matrix) {
        var g = e.matrix[c];
        g.$original_section_autoheight || (g.$original_section_autoheight = g.section_autoheight), g.section_autoheight = !s && g.$original_section_autoheight;
      }
    return !0;
  }), e.attachEvent("onViewChange", t), e.attachEvent("onXLE", t), e.attachEvent("onEventChanged", t), e.attachEvent("onEventCreated", t), e.attachEvent("onEventAdded", t), e.attachEvent("onEventDeleted", t), e.attachEvent("onAfterSchedulerResize", t), e.attachEvent("onClearAll", t), e.attachEvent("onBeforeExpand", function() {
    return a = !1, !0;
  }), e.attachEvent("onBeforeCollapse", function() {
    return a = !0, !0;
  });
}, cookie: function(e) {
  function h(_) {
    return (_._obj.id || "scheduler") + "_settings";
  }
  var a = !0;
  e.attachEvent("onBeforeViewChange", function(_, r, l, o) {
    if (a && e._get_url_nav) {
      var t = e._get_url_nav();
      (t.date || t.mode || t.event) && (a = !1);
    }
    var i = h(e);
    if (a) {
      a = !1;
      var s = function(g) {
        var y = g + "=";
        if (document.cookie.length > 0) {
          var m = document.cookie.indexOf(y);
          if (m != -1) {
            m += y.length;
            var u = document.cookie.indexOf(";", m);
            return u == -1 && (u = document.cookie.length), document.cookie.substring(m, u);
          }
        }
        return "";
      }(i);
      if (s) {
        e._min_date || (e._min_date = o), (s = unescape(s).split("@"))[0] = this._helpers.parseDate(s[0]);
        var c = this.isViewExists(s[1]) ? s[1] : l;
        return o = isNaN(+s[0]) ? o : s[0], window.setTimeout(function() {
          e.$destroyed || e.setCurrentView(o, c);
        }, 1), !1;
      }
    }
    return !0;
  }), e.attachEvent("onViewChange", function(_, r) {
    var l, o, t = h(e), i = escape(this._helpers.formatDate(r) + "@" + _);
    o = t + "=" + i + ((l = "expires=Sun, 31 Jan 9999 22:00:00 GMT") ? "; " + l : ""), document.cookie = o;
  });
  var n = e._load;
  e._load = function() {
    var _ = arguments;
    if (e._date)
      n.apply(this, _);
    else {
      var r = this;
      window.setTimeout(function() {
        n.apply(r, _);
      }, 1);
    }
  };
}, daytimeline: function(e) {
  ze(e);
  var h = e.createTimelineView;
  e.createTimelineView = function(a) {
    if (a.render == "days") {
      var n = a.name, _ = a.y_property = "timeline-week" + n;
      a.y_unit = [], a.render = "bar", a.days = a.days || 7, h.call(this, a), e.templates[n + "_scalex_class"] = function() {
      }, e.templates[n + "_scaley_class"] = function() {
      }, e.templates[n + "_scale_label"] = function(x, b, w) {
        return e.templates.day_date(b);
      }, e.date[n + "_start"] = function(x) {
        return x = e.date.week_start(x), x = e.date.add(x, a.x_step * a.x_start, a.x_unit);
      }, e.date["add_" + n] = function(x, b) {
        return e.date.add(x, b * a.days, "day");
      };
      var r = e._renderMatrix;
      e._renderMatrix = function(x, b) {
        x && function() {
          var w = new Date(e.getState().date), k = e.date[n + "_start"](w);
          k = e.date.date_part(k);
          var E = [], D = e.matrix[n];
          D.y_unit = E, D.order = {};
          for (var S = 0; S < a.days; S++)
            E.push({ key: +k, label: k }), D.order[D.y_unit[S].key] = S, k = e.date.add(k, 1, "day");
        }(), r.apply(this, arguments);
      };
      var l = e.checkCollision;
      e.checkCollision = function(x) {
        return x[_] && delete (x = function(b) {
          var w = {};
          for (var k in b)
            w[k] = b[k];
          return w;
        }(x))[_], l.apply(e, [x]);
      }, e.attachEvent("onBeforeDrag", function(x, b, w) {
        var k = w.target || w.srcElement, E = e._getClassName(k);
        if (b == "resize")
          E.indexOf("dhx_event_resize_end") < 0 ? e._w_line_drag_from_start = !0 : e._w_line_drag_from_start = !1;
        else if (b == "move" && E.indexOf("no_drag_move") >= 0)
          return !1;
        return !0;
      });
      var o = e["mouse_" + n];
      e["mouse_" + n] = function(x) {
        var b;
        this._drag_event && (b = this._drag_event._move_delta);
        var w = e.matrix[this._mode];
        if (w.scrollable && !x.converted && (x.converted = 1, x.x -= -w._x_scroll, x.y += w._y_scroll), b === void 0 && e._drag_mode == "move") {
          var k = { y: x.y };
          e._resolve_timeline_section(w, k);
          var E = x.x - w.dx, D = new Date(k.section);
          f(e._timeline_drag_date(w, E), D);
          var S = e._drag_event, N = this.getEvent(this._drag_id);
          N && (S._move_delta = (N.start_date - D) / 6e4, this.config.preserve_length && x._ignores && (S._move_delta = this._get_real_event_length(N.start_date, D, w), S._event_length = this._get_real_event_length(N.start_date, N.end_date, w)));
        }
        if (x = o.apply(e, arguments), e._drag_mode && e._drag_mode != "move") {
          var M = null;
          M = e._drag_event && e._drag_event["timeline-week" + n] ? new Date(e._drag_event["timeline-week" + n]) : new Date(x.section), x.y += Math.round((M - e.date.date_part(new Date(e._min_date))) / (6e4 * this.config.time_step)), e._drag_mode == "resize" && (x.resize_from_start = e._w_line_drag_from_start);
        } else if (e._drag_event) {
          var A = Math.floor(Math.abs(x.y / (1440 / e.config.time_step)));
          A *= x.y > 0 ? 1 : -1, x.y = x.y % (1440 / e.config.time_step);
          var C = e.date.date_part(new Date(e._min_date));
          C.valueOf() != new Date(x.section).valueOf() && (x.x = Math.floor((x.section - C) / 864e5), x.x += A);
        }
        return x;
      }, e.attachEvent("onEventCreated", function(x, b) {
        return e._events[x] && delete e._events[x][_], !0;
      }), e.attachEvent("onBeforeEventChanged", function(x, b, w, k) {
        return e._events[x.id] && delete e._events[x.id][_], !0;
      });
      var t = e._update_timeline_section;
      e._update_timeline_section = function(x) {
        var b, w;
        this._mode == n && (b = x.event) && (w = e._get_copied_event(b.id, e.date.day_start(new Date(b.start_date.valueOf())))) && (x.event._sorder = w._sorder, x.event._count = w._count), t.apply(this, arguments), b && w && (w._count = b._count, w._sorder = b._sorder);
      };
      var i = e.render_view_data;
      e.render_view_data = function(x, b) {
        return this._mode == n && x && (x = m(x), e._restore_render_flags(x)), i.apply(e, [x, b]);
      };
      var s = e.get_visible_events;
      e.get_visible_events = function() {
        if (this._mode == n) {
          this._clear_copied_events(), e._max_date = e.date.date_part(e.date.add(e._min_date, a.days, "day"));
          var x = s.apply(e, arguments);
          return x = m(x), e._register_copies_array(x), x;
        }
        return s.apply(e, arguments);
      };
      var c = e.addEventNow;
      e.addEventNow = function(x) {
        if (e.getState().mode == n)
          if (x[_]) {
            var b = new Date(x[_]);
            y(b, x.start_date), y(b, x.end_date);
          } else {
            var w = new Date(x.start_date);
            x[_] = +e.date.date_part(w);
          }
        return c.apply(e, arguments);
      };
      var g = e._render_marked_timespan;
      e._render_marked_timespan = function() {
        if (e._mode != n)
          return g.apply(this, arguments);
      };
    } else
      h.apply(this, arguments);
    function y(x, b) {
      b.setDate(1), b.setFullYear(x.getFullYear()), b.setMonth(x.getMonth()), b.setDate(x.getDate());
    }
    function m(x) {
      for (var b = [], w = 0; w < x.length; w++) {
        var k = p(x[w]);
        if (e.isOneDayEvent(k))
          d(k), b.push(k);
        else {
          for (var E = new Date(Math.min(+k.end_date, +e._max_date)), D = new Date(Math.max(+k.start_date, +e._min_date)), S = []; +D < +E; ) {
            var N = p(k);
            N.start_date = D, N.end_date = new Date(Math.min(+v(N.start_date), +E)), D = v(D), d(N), b.push(N), S.push(N);
          }
          u(S, k);
        }
      }
      return b;
    }
    function u(x, b) {
      for (var w = !1, k = !1, E = 0, D = x.length; E < D; E++) {
        var S = x[E];
        w = +S._w_start_date == +b.start_date, k = +S._w_end_date == +b.end_date, S._no_resize_start = S._no_resize_end = !0, w && (S._no_resize_start = !1), k && (S._no_resize_end = !1);
      }
    }
    function p(x) {
      var b = e.getEvent(x.event_pid);
      return b && b.isPrototypeOf(x) ? (delete (x = e._copy_event(x)).event_length, delete x.event_pid, delete x.rec_pattern, delete x.rec_type) : x = e._lame_clone(x), x;
    }
    function d(x) {
      if (!x._w_start_date || !x._w_end_date) {
        var b = e.date, w = x._w_start_date = new Date(x.start_date), k = x._w_end_date = new Date(x.end_date);
        x[_] = +b.date_part(x.start_date), x._count || (x._count = 1), x._sorder || (x._sorder = 0);
        var E = k - w;
        x.start_date = new Date(e._min_date), f(w, x.start_date), x.end_date = new Date(+x.start_date + E), w.getTimezoneOffset() != k.getTimezoneOffset() && (x.end_date = new Date(x.end_date.valueOf() + 6e4 * (w.getTimezoneOffset() - k.getTimezoneOffset())));
      }
    }
    function f(x, b) {
      b.setMinutes(x.getMinutes()), b.setHours(x.getHours());
    }
    function v(x) {
      var b = e.date.add(x, 1, "day");
      return b = e.date.date_part(b);
    }
  };
}, drag_between: function(e) {
  window.Scheduler && window.Scheduler.plugin && (window.Scheduler._outer_drag = be), qe.push(e), Me || Fe(e), e.config.drag_in = !0, e.config.drag_out = !0, e.templates.event_outside = function(a, n, _) {
  };
  var h = be;
  e.attachEvent("onTemplatesReady", function() {
    e.event(e._obj, "mousemove", function(a) {
      h.target_scheduler = e;
    }), e.event(e._obj, "mouseup", function(a) {
      h.target_scheduler = e;
    });
  });
}, editors: function(e) {
  e.form_blocks.combo = { render: function(h) {
    h.cached_options || (h.cached_options = {});
    var a = "";
    return a += "<div class='" + h.type + "' ></div>";
  }, set_value: function(h, a, n, _) {
    (function() {
      y();
      var g = e.attachEvent("onAfterLightbox", function() {
        y(), e.detachEvent(g);
      });
      function y() {
        if (h._combo && h._combo.DOMParent) {
          var m = h._combo;
          m.unload ? m.unload() : m.destructor && m.destructor(), m.DOMParent = m.DOMelem = null;
        }
      }
    })(), window.dhx_globalImgPath = _.image_path || "/", h._combo = new dhtmlXCombo(h, _.name, h.offsetWidth - 8), _.onchange && h._combo.attachEvent("onChange", _.onchange), _.options_height && h._combo.setOptionHeight(_.options_height);
    var r = h._combo;
    if (r.enableFilteringMode(_.filtering, _.script_path || null, !!_.cache), _.script_path) {
      var l = n[_.map_to];
      l ? _.cached_options[l] ? (r.addOption(l, _.cached_options[l]), r.disable(1), r.selectOption(0), r.disable(0)) : e.ajax.get(_.script_path + "?id=" + l + "&uid=" + e.uid(), function(g) {
        var y, m = g.xmlDoc.responseText;
        try {
          y = JSON.parse(m).options[0].text;
        } catch {
          y = e.ajax.xpath("//option", g.xmlDoc)[0].childNodes[0].nodeValue;
        }
        _.cached_options[l] = y, r.addOption(l, y), r.disable(1), r.selectOption(0), r.disable(0);
      }) : r.setComboValue("");
    } else {
      for (var o = [], t = 0; t < _.options.length; t++) {
        var i = _.options[t], s = [i.key, i.label, i.css];
        o.push(s);
      }
      if (r.addOption(o), n[_.map_to]) {
        var c = r.getIndexByValue(n[_.map_to]);
        r.selectOption(c);
      }
    }
  }, get_value: function(h, a, n) {
    var _ = h._combo.getSelectedValue();
    return n.script_path && (n.cached_options[_] = h._combo.getSelectedText()), _;
  }, focus: function(h) {
  } }, e.form_blocks.radio = { render: function(h) {
    var a = "";
    a += `<div class='dhx_cal_ltext dhx_cal_radio ${h.vertical ? "dhx_cal_radio_vertical" : ""}' style='max-height:${h.height}px;'>`;
    for (var n = 0; n < h.options.length; n++) {
      var _ = e.uid();
      a += "<label class='dhx_cal_radio_item' for='" + _ + "'><input id='" + _ + "' type='radio' name='" + h.name + "' value='" + h.options[n].key + "'><span> " + h.options[n].label + "</span></label>";
    }
    return a += "</div>";
  }, set_value: function(h, a, n, _) {
    for (var r = h.getElementsByTagName("input"), l = 0; l < r.length; l++) {
      r[l].checked = !1;
      var o = n[_.map_to] || a;
      r[l].value == o && (r[l].checked = !0);
    }
  }, get_value: function(h, a, n) {
    for (var _ = h.getElementsByTagName("input"), r = 0; r < _.length; r++)
      if (_[r].checked)
        return _[r].value;
  }, focus: function(h) {
  } }, e.form_blocks.checkbox = { render: function(h) {
    return e.config.wide_form ? '<div class="dhx_cal_wide_checkbox"></div>' : "";
  }, set_value: function(h, a, n, _) {
    h = e._lightbox.querySelector(`#${_.id}`);
    var r = e.uid(), l = _.checked_value !== void 0 ? a == _.checked_value : !!a;
    h.className += " dhx_cal_checkbox";
    var o = "<input id='" + r + "' type='checkbox' value='true' name='" + _.name + "'" + (l ? "checked='true'" : "") + "'>", t = "<label for='" + r + "'>" + (e.locale.labels["section_" + _.name] || _.name) + "</label>";
    if (e.config.wide_form ? (h.innerHTML = t, h.nextSibling.innerHTML = o) : h.innerHTML = o + t, _.handler) {
      var i = h.getElementsByTagName("input")[0];
      if (i.$_eventAttached)
        return;
      i.$_eventAttached = !0, e.event(i, "click", _.handler);
    }
  }, get_value: function(h, a, n) {
    var _ = (h = e._lightbox.querySelector(`#${n.id}`)).getElementsByTagName("input")[0];
    return _ || (_ = h.nextSibling.getElementsByTagName("input")[0]), _.checked ? n.checked_value || !0 : n.unchecked_value || !1;
  }, focus: function(h) {
  } };
}, expand: function(e) {
  e.ext.fullscreen = { toggleIcon: null }, e.expand = function() {
    if (e.callEvent("onBeforeExpand", [])) {
      var h = e._obj;
      do
        h._position = h.style.position || "", h.style.position = "static";
      while ((h = h.parentNode) && h.style);
      (h = e._obj).style.position = "absolute", h._width = h.style.width, h._height = h.style.height, h.style.width = h.style.height = "100%", h.style.top = h.style.left = "0px";
      var a = document.body;
      a.scrollTop = 0, (a = a.parentNode) && (a.scrollTop = 0), document.body._overflow = document.body.style.overflow || "", document.body.style.overflow = "hidden", e._maximize(), e.callEvent("onExpand", []);
    }
  }, e.collapse = function() {
    if (e.callEvent("onBeforeCollapse", [])) {
      var h = e._obj;
      do
        h.style.position = h._position;
      while ((h = h.parentNode) && h.style);
      (h = e._obj).style.width = h._width, h.style.height = h._height, document.body.style.overflow = document.body._overflow, e._maximize(), e.callEvent("onCollapse", []);
    }
  }, e.attachEvent("onTemplatesReady", function() {
    var h = document.createElement("div");
    h.className = "dhx_expand_icon", e.ext.fullscreen.toggleIcon = h, h.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g>
	<line x1="0.5" y1="5" x2="0.5" y2="3.0598e-08" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line y1="0.5" x2="5" y2="0.5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="0.5" y1="11" x2="0.5" y2="16" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line y1="15.5" x2="5" y2="15.5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="11" y1="0.5" x2="16" y2="0.5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="15.5" y1="2.18557e-08" x2="15.5" y2="5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="11" y1="15.5" x2="16" y2="15.5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="15.5" y1="16" x2="15.5" y2="11" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	</g>
	</svg>
	`, e._obj.appendChild(h), e.event(h, "click", function() {
      e.expanded ? e.collapse() : e.expand();
    });
  }), e._maximize = function() {
    this.expanded = !this.expanded, this.expanded ? this.ext.fullscreen.toggleIcon.classList.add("dhx_expand_icon--expanded") : this.ext.fullscreen.toggleIcon.classList.remove("dhx_expand_icon--expanded");
    for (var h = ["left", "top"], a = 0; a < h.length; a++) {
      var n = e["_prev_margin_" + h[a]];
      e.xy["margin_" + h[a]] ? (e["_prev_margin_" + h[a]] = e.xy["margin_" + h[a]], e.xy["margin_" + h[a]] = 0) : n && (e.xy["margin_" + h[a]] = e["_prev_margin_" + h[a]], delete e["_prev_margin_" + h[a]]);
    }
    e.setCurrentView();
  };
}, export_api: function(e) {
  (function() {
    function h(n, _) {
      for (var r in _)
        n[r] || (n[r] = _[r]);
      return n;
    }
    function a(n, _) {
      var r = {};
      return (n = _._els[n]) && n[0] ? (r.x = n[0].scrollWidth, r.y = n[0].scrollHeight) : (r.x = 0, r.y = 0), r;
    }
    window.dhtmlxAjax || (window.dhtmlxAjax = { post: function(n, _, r) {
      return window.dhx4.ajax.post(n, _, r);
    }, get: function(n, _) {
      return window.ajax.get(n, _);
    } }), function(n) {
      function _() {
        var r = n.getState().mode;
        return n.matrix && n.matrix[r] ? n.matrix[r] : null;
      }
      n.exportToPDF = function(r) {
        (r = h(r || {}, { name: "calendar.pdf", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: n.config.rtl })).html = this._export_html(r), r.mode = this.getState().mode, this._send_to_export(r, "pdf");
      }, n.exportToPNG = function(r) {
        (r = h(r || {}, { name: "calendar.png", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: n.config.rtl })).html = this._export_html(r), r.mode = this.getState().mode, this._send_to_export(r, "png");
      }, n.exportToICal = function(r) {
        r = h(r || {}, { name: "calendar.ical", data: this._serialize_plain(null, r) }), this._send_to_export(r, "ical");
      }, n.exportToExcel = function(r) {
        r = h(r || {}, { name: "calendar.xlsx", title: "Events", data: this._serialize_plain(this.templates.xml_format, r), columns: this._serialize_columns() }), this._send_to_export(r, "excel");
      }, n._ajax_to_export = function(r, l, o) {
        delete r.callback;
        var t = r.server || "https://export.dhtmlx.com/scheduler";
        window.dhtmlxAjax.post(t, "type=" + l + "&store=1&data=" + encodeURIComponent(JSON.stringify(r)), function(i) {
          var s = null;
          if (!(i.xmlDoc.status > 400))
            try {
              s = JSON.parse(i.xmlDoc.responseText);
            } catch {
            }
          o(s);
        });
      }, n._plain_export_copy = function(r, l) {
        var o = {};
        for (var t in r)
          o[t] = r[t];
        return o.start_date = l(o.start_date), o.end_date = l(o.end_date), o.$text = this.templates.event_text(r.start_date, r.end_date, r), o;
      }, n._serialize_plain = function(r, l) {
        var o;
        r = r || n.date.date_to_str("%Y%m%dT%H%i%s", !0), o = l && l.start && l.end ? n.getEvents(l.start, l.end) : n.getEvents();
        for (var t = [], i = 0; i < o.length; i++)
          t[i] = this._plain_export_copy(o[i], r);
        return t;
      }, n._serialize_columns = function() {
        return [{ id: "start_date", header: "Start Date", width: 30 }, { id: "end_date", header: "End Date", width: 30 }, { id: "$text", header: "Text", width: 100 }];
      }, n._send_to_export = function(r, l) {
        if (r.version || (r.version = n.version), r.skin || (r.skin = n.skin), r.callback)
          return n._ajax_to_export(r, l, r.callback);
        var o = this._create_hidden_form();
        o.firstChild.action = r.server || "https://export.dhtmlx.com/scheduler", o.firstChild.childNodes[0].value = JSON.stringify(r), o.firstChild.childNodes[1].value = l, o.firstChild.submit();
      }, n._create_hidden_form = function() {
        if (!this._hidden_export_form) {
          var r = this._hidden_export_form = document.createElement("div");
          r.style.display = "none", r.innerHTML = "<form method='POST' target='_blank'><input type='text' name='data'><input type='hidden' name='type' value=''></form>", document.body.appendChild(r);
        }
        return this._hidden_export_form;
      }, n._get_export_size = function(r, l, o, t, i, s, c) {
        t = parseInt(t) / 25.4 || 4;
        var g = { A5: { x: 148, y: 210 }, A4: { x: 210, y: 297 }, A3: { x: 297, y: 420 }, A2: { x: 420, y: 594 }, A1: { x: 594, y: 841 }, A0: { x: 841, y: 1189 } }, y = a("dhx_cal_data", this).x, m = { y: a("dhx_cal_data", this).y + a("dhx_cal_header", this).y + a("dhx_multi_day", this).y };
        return m.x = r === "full" ? y : Math.floor((l === "landscape" ? g[r].y : g[r].x) * t), c && (m.x *= parseFloat(c.x) || 1, m.y *= parseFloat(c.y) || 1), m;
      }, n._export_html = function(r) {
        var l = function() {
          var i = void 0, s = void 0, c = _();
          return c && (s = c.scrollable, i = c.smart_rendering), { nav_height: n.xy.nav_height, scroll_width: n.xy.scroll_width, style_width: n._obj.style.width, style_height: n._obj.style.height, timeline_scrollable: s, timeline_smart_rendering: i };
        }(), o = n._get_export_size(r.format, r.orientation, r.zoom, r.dpi, r.header, r.footer, r.scales), t = "";
        try {
          (function(i, s) {
            n._obj.style.width = i.x + "px", n._obj.style.height = i.y + "px", n.xy.nav_height = 0, n.xy.scroll_width = 0;
            var c = _();
            (s.timeline_scrollable || s.timeline_smart_rendering) && (c.scrollable = !1, c.smart_rendering = !1);
          })(o, l), n.setCurrentView(), t = n._obj.innerHTML;
        } catch (i) {
          console.error(i);
        } finally {
          (function(i) {
            n.xy.scroll_width = i.scroll_width, n.xy.nav_height = i.nav_height, n._obj.style.width = i.style_width, n._obj.style.height = i.style_height;
            var s = _();
            (i.timeline_scrollable || i.timeline_smart_rendering) && (s.scrollable = i.timeline_scrollable, s.smart_rendering = i.timeline_smart_rendering);
          })(l), n.setCurrentView();
        }
        return t;
      };
    }(e);
  })();
}, grid_view: function(e) {
  e._grid = { names: {}, sort_rules: { int: function(h, a, n) {
    return 1 * n(h) < 1 * n(a) ? 1 : -1;
  }, str: function(h, a, n) {
    return n(h) < n(a) ? 1 : -1;
  }, date: function(h, a, n) {
    return new Date(n(h)) < new Date(n(a)) ? 1 : -1;
  } }, _getObjName: function(h) {
    return "grid_" + h;
  }, _getViewName: function(h) {
    return h.replace(/^grid_/, "");
  } }, e.createGridView = function(h) {
    var a = h.name || "grid", n = e._grid._getObjName(a);
    function _(o) {
      return !(o !== void 0 && (1 * o != o || o < 0));
    }
    e._grid.names[a] = a, e.config[a + "_start"] = h.from || /* @__PURE__ */ new Date(0), e.config[a + "_end"] = h.to || new Date(9999, 1, 1), e[n] = h, e[n].defPadding = 8, e[n].columns = e[n].fields, e[n].unit = h.unit || "month", e[n].step = h.step || 1, delete e[n].fields;
    for (var r = e[n].columns, l = 0; l < r.length; l++)
      _(r[l].width) && (r[l].initialWidth = r[l].width), _(r[l].paddingLeft) || delete r[l].paddingLeft, _(r[l].paddingRight) || delete r[l].paddingRight;
    e[n].select = h.select === void 0 || h.select, e.locale.labels[a + "_tab"] === void 0 && (e.locale.labels[a + "_tab"] = e[n].label || e.locale.labels.grid_tab), e[n]._selected_divs = [], e.date[a + "_start"] = function(o) {
      return e.date[h.unit + "_start"] ? e.date[h.unit + "_start"](o) : o;
    }, e.date["add_" + a] = function(o, t) {
      return e.date.add(o, t * e[n].step, e[n].unit);
    }, e.templates[a + "_date"] = function(o, t) {
      return e.config.rtl ? e.templates.day_date(t) + " - " + e.templates.day_date(o) : e.templates.day_date(o) + " - " + e.templates.day_date(t);
    }, e.templates[a + "_full_date"] = function(o, t, i) {
      return e.isOneDayEvent(i) ? this[a + "_single_date"](o) : e.config.rtl ? e.templates.day_date(t) + " &ndash; " + e.templates.day_date(o) : e.templates.day_date(o) + " &ndash; " + e.templates.day_date(t);
    }, e.templates[a + "_single_date"] = function(o) {
      return e.templates.day_date(o) + " " + this.event_date(o);
    }, e.templates[a + "_field"] = function(o, t) {
      return t[o];
    }, e.attachEvent("onTemplatesReady", function() {
      e.attachEvent("onEventSelected", function(i) {
        if (this._mode == a && e[n].select)
          return e._grid.selectEvent(i, a), !1;
      }), e.attachEvent("onEventUnselected", function(i) {
        this._mode == a && e[n].select && e._grid.unselectEvent("", a);
      });
      var o = e.render_data;
      e.render_data = function(i) {
        if (this._mode != a)
          return o.apply(this, arguments);
        e._grid._fill_grid_tab(n);
      };
      var t = e.render_view_data;
      e.render_view_data = function() {
        var i = e._els.dhx_cal_data[0].lastChild;
        return this._mode == a && i && (e._grid._gridScrollTop = i.scrollTop), t.apply(this, arguments);
      };
    }), e[a + "_view"] = function(o) {
      if (e._grid._sort_marker = null, delete e._gridView, e._grid._gridScrollTop = 0, e._rendered = [], e[n]._selected_divs = [], o) {
        var t = null, i = null;
        e[n].paging ? (t = e.date[a + "_start"](new Date(e._date)), i = e.date["add_" + a](t, 1)) : (t = e.config[a + "_start"], i = e.config[a + "_end"]), e._min_date = t, e._max_date = i, e._grid.set_full_view(n);
        var s = "";
        +t > +/* @__PURE__ */ new Date(0) && +i < +new Date(9999, 1, 1) && (s = e.templates[a + "_date"](t, i));
        var c = e._getNavDateElement();
        c && (c.innerHTML = s), e._gridView = n;
      }
    };
  }, e.dblclick_dhx_grid_area = function() {
    !this.config.readonly && this.config.dblclick_create && this.addEventNow();
  }, e._click.dhx_cal_header && (e._old_header_click = e._click.dhx_cal_header), e._click.dhx_cal_header = function(h) {
    if (e._gridView) {
      var a = h || window.event, n = e._grid._get_target_column(a, e._gridView);
      e._grid._toggle_sort_state(e._gridView, n.id), e.clear_view(), e._grid._fill_grid_tab(e._gridView);
    } else if (e._old_header_click)
      return e._old_header_click.apply(this, arguments);
  }, e._grid.selectEvent = function(h, a) {
    if (e.callEvent("onBeforeRowSelect", [h])) {
      var n = e._grid._getObjName(a);
      e.for_rendered(h, function(_) {
        _.classList.add("dhx_grid_event_selected"), e[n]._selected_divs.push(_);
      });
    }
  }, e._grid._unselectDiv = function(h) {
    h.className = h.classList.remove("dhx_grid_event_selected");
  }, e._grid.unselectEvent = function(h, a) {
    var n = e._grid._getObjName(a);
    if (n && e[n]._selected_divs)
      if (h) {
        for (_ = 0; _ < e[n]._selected_divs.length; _++)
          if (e[n]._selected_divs[_].getAttribute(e.config.event_attribute) == h) {
            e._grid._unselectDiv(e[n]._selected_divs[_]), e[n]._selected_divs.slice(_, 1);
            break;
          }
      } else {
        for (var _ = 0; _ < e[n]._selected_divs.length; _++)
          e._grid._unselectDiv(e[n]._selected_divs[_]);
        e[n]._selected_divs = [];
      }
  }, e._grid._get_target_column = function(h, a) {
    var n = h.originalTarget || h.srcElement;
    e._getClassName(n) == "dhx_grid_view_sort" && (n = n.parentNode);
    for (var _ = 0, r = 0; r < n.parentNode.childNodes.length; r++)
      if (n.parentNode.childNodes[r] == n) {
        _ = r;
        break;
      }
    return e[a].columns[_];
  }, e._grid._get_sort_state = function(h) {
    return e[h].sort;
  }, e._grid._toggle_sort_state = function(h, a) {
    var n = this._get_sort_state(h), _ = e[h];
    n && n.column == a ? n.direction = n.direction == "asc" ? "desc" : "asc" : _.sort = { column: a, direction: "desc" };
  }, e._grid._get_sort_value_for_column = function(h) {
    var a = null;
    if (h.template) {
      var n = h.template;
      a = function(r) {
        return n(r.start_date, r.end_date, r);
      };
    } else {
      var _ = h.id;
      _ == "date" && (_ = "start_date"), a = function(r) {
        return r[_];
      };
    }
    return a;
  }, e._grid.draw_sort_marker = function(h, a) {
    if (e._grid._sort_marker && (e._grid._sort_marker.className = e._grid._sort_marker.className.replace(/( )?dhx_grid_sort_(asc|desc)/, ""), e._grid._sort_marker.removeChild(e._grid._sort_marker.lastChild)), a) {
      var n = e._grid._get_column_node(h, a.column);
      n.className += " dhx_grid_sort_" + a.direction, e._grid._sort_marker = n;
      var _ = "<div class='dhx_grid_view_sort' style='left:" + (+n.style.width.replace("px", "") - 15 + n.offsetLeft) + "px'>&nbsp;</div>";
      n.innerHTML += _;
    }
  }, e._grid.sort_grid = function(h) {
    h = h || { direction: "desc", value: function(n) {
      return n.start_date;
    }, rule: e._grid.sort_rules.date };
    var a = e.get_visible_events();
    return a.sort(function(n, _) {
      return h.rule(n, _, h.value);
    }), h.direction == "asc" && (a = a.reverse()), a;
  }, e._grid.set_full_view = function(h) {
    if (h) {
      var a = e._grid._print_grid_header(h);
      e._els.dhx_cal_header[0].innerHTML = a, e._table_view = !0, e.set_sizes();
    }
  }, e._grid._calcPadding = function(h, a) {
    return (h.paddingLeft !== void 0 ? 1 * h.paddingLeft : e[a].defPadding) + (h.paddingRight !== void 0 ? 1 * h.paddingRight : e[a].defPadding);
  }, e._grid._getStyles = function(h, a) {
    for (var n = [], _ = "", r = 0; a[r]; r++)
      switch (_ = a[r] + ":", a[r]) {
        case "text-align":
          h.align && n.push(_ + h.align);
          break;
        case "vertical-align":
          h.valign && n.push(_ + h.valign);
          break;
        case "padding-left":
          h.paddingLeft !== void 0 && n.push(_ + (h.paddingLeft || "0") + "px");
          break;
        case "padding-right":
          h.paddingRight !== void 0 && n.push(_ + (h.paddingRight || "0") + "px");
      }
    return n;
  }, e._grid._get_column_node = function(h, a) {
    for (var n = -1, _ = 0; _ < h.length; _++)
      if (h[_].id == a) {
        n = _;
        break;
      }
    return n < 0 ? null : e._obj.querySelectorAll(".dhx_grid_line > div")[n];
  }, e._grid._get_sort_rule = function(h) {
    var a, n = e[h], _ = this._get_sort_state(h);
    if (_) {
      for (var r, l = 0; l < n.columns.length; l++)
        if (n.columns[l].id == _.column) {
          r = n.columns[l];
          break;
        }
      if (r) {
        var o = e._grid._get_sort_value_for_column(r), t = r.sort;
        typeof t != "function" && (t = e._grid.sort_rules[t] || e._grid.sort_rules.str), a = { direction: _.direction, rule: t, value: o };
      }
    }
    return a;
  }, e._grid._fill_grid_tab = function(h) {
    var a = e[h], n = this._get_sort_state(h), _ = this._get_sort_rule(h);
    _ && e._grid.draw_sort_marker(a.columns, n);
    for (var r = e._grid.sort_grid(_), l = e[h].columns, o = "<div>", t = -1, i = 0; i < l.length; i++)
      t += l[i].width, i < l.length - 1 && (o += "<div class='dhx_grid_v_border' style='" + (e.config.rtl ? "right" : "left") + ":" + t + "px'></div>");
    for (o += "</div>", o += "<div class='dhx_grid_area'><table " + e._waiAria.gridAttrString() + ">", i = 0; i < r.length; i++)
      o += e._grid._print_event_row(r[i], h);
    o += "</table></div>", e._els.dhx_cal_data[0].innerHTML = o, e._els.dhx_cal_data[0].lastChild.scrollTop = e._grid._gridScrollTop || 0;
    var s = e._els.dhx_cal_data[0].getElementsByTagName("tr");
    for (e._rendered = [], i = 0; i < s.length; i++)
      e._rendered[i] = s[i];
  }, e._grid._getCellContent = function(h, a) {
    var n = e.getState().mode;
    return a.template ? a.template(h.start_date, h.end_date, h) : a.id == "date" ? e.templates[n + "_full_date"](h.start_date, h.end_date, h) : a.id == "start_date" || a.id == "end_date" ? e.templates[n + "_single_date"](h[a.id]) : e.templates[n + "_field"](a.id, h);
  }, e._grid._print_event_row = function(h, a) {
    var n = [];
    h.color && n.push("--dhx-scheduler-event-background:" + h.color), h.textColor && n.push("--dhx-scheduler-event-color:" + h.textColor), h._text_style && n.push(h._text_style), e[a].rowHeight && n.push("height:" + e[a].rowHeight + "px");
    var _ = "";
    n.length && (_ = "style='" + n.join(";") + "'");
    var r = e[a].columns, l = e.templates.event_class(h.start_date, h.end_date, h);
    e.getState().select_id == h.id && (l += " dhx_grid_event_selected");
    for (var o = "<tr " + e._waiAria.gridRowAttrString(h) + " class='dhx_grid_event" + (l ? " " + l : "") + "' event_id='" + h.id + "' " + e.config.event_attribute + "='" + h.id + "' " + _ + ">", t = ["text-align", "vertical-align", "padding-left", "padding-right"], i = 0; i < r.length; i++) {
      var s = e._grid._getCellContent(h, r[i]), c = e._waiAria.gridCellAttrString(h, r[i], s), g = e._grid._getStyles(r[i], t), y = r[i].css ? ' class="' + r[i].css + '"' : "";
      o += "<td " + c + " style='width:" + r[i].width + "px;" + g.join(";") + "' " + y + ">" + s + "</td>";
    }
    return o += "<td class='dhx_grid_dummy'></td></tr>";
  }, e._grid._print_grid_header = function(h) {
    for (var a = "<div class='dhx_grid_line'>", n = e[h].columns, _ = [], r = n.length, l = e._obj.clientWidth - 2 * n.length - 20, o = 0; o < n.length; o++) {
      var t = 1 * n[o].initialWidth;
      isNaN(t) || n[o].initialWidth === "" || n[o].initialWidth === null || typeof n[o].initialWidth == "boolean" ? _[o] = null : (r--, l -= t, _[o] = t);
    }
    for (var i = Math.floor(l / r), s = ["text-align", "padding-left", "padding-right"], c = 0; c < n.length; c++) {
      var g = _[c] ? _[c] : i;
      n[c].width = g;
      var y = e._grid._getStyles(n[c], s);
      a += "<div class='dhx_grid_column_label' style='line-height: " + e.xy.scale_height + "px;width:" + n[c].width + "px;" + y.join(";") + "'>" + (n[c].label === void 0 ? n[c].id : n[c].label) + "</div>";
    }
    return a += "</div>";
  };
}, html_templates: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    for (var h = document.body.getElementsByTagName("DIV"), a = 0; a < h.length; a++) {
      var n = h[a].className || "";
      if ((n = n.split(":")).length == 2 && n[0] == "template") {
        var _ = 'return "' + (h[a].innerHTML || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\n\r]+/g, "") + '";';
        _ = unescape(_).replace(/\{event\.([a-z]+)\}/g, function(r, l) {
          return '"+ev.' + l + '+"';
        }), e.templates[n[1]] = Function("start", "end", "ev", _), h[a].style.display = "none";
      }
    }
  });
}, key_nav: function(e) {
  function h(a) {
    var n = { minicalButton: e.$keyboardNavigation.MinicalButton, minicalDate: e.$keyboardNavigation.MinicalCell, scheduler: e.$keyboardNavigation.SchedulerNode, dataArea: e.$keyboardNavigation.DataArea, timeSlot: e.$keyboardNavigation.TimeSlot, event: e.$keyboardNavigation.Event }, _ = {};
    for (var r in n)
      _[r.toLowerCase()] = n[r];
    return _[a = (a + "").toLowerCase()] || n.scheduler;
  }
  e.config.key_nav = !0, e.config.key_nav_step = 30, e.addShortcut = function(a, n, _) {
    var r = h(_);
    r && r.prototype.bind(a, n);
  }, e.getShortcutHandler = function(a, n) {
    var _ = h(n);
    if (_) {
      var r = e.$keyboardNavigation.shortcuts.parse(a);
      if (r.length)
        return _.prototype.findHandler(r[0]);
    }
  }, e.removeShortcut = function(a, n) {
    var _ = h(n);
    _ && _.prototype.unbind(a);
  }, e.focus = function() {
    if (e.config.key_nav) {
      var a = e.$keyboardNavigation.dispatcher;
      a.enable();
      var n = a.getActiveNode();
      !n || n instanceof e.$keyboardNavigation.MinicalButton || n instanceof e.$keyboardNavigation.MinicalCell ? a.setDefaultNode() : a.focusNode(a.getActiveNode());
    }
  }, e.$keyboardNavigation = {}, e._compose = function() {
    for (var a = Array.prototype.slice.call(arguments, 0), n = {}, _ = 0; _ < a.length; _++) {
      var r = a[_];
      for (var l in typeof r == "function" && (r = new r()), r)
        n[l] = r[l];
    }
    return n;
  }, function(a) {
    a.$keyboardNavigation.shortcuts = { createCommand: function() {
      return { modifiers: { shift: !1, alt: !1, ctrl: !1, meta: !1 }, keyCode: null };
    }, parse: function(n) {
      for (var _ = [], r = this.getExpressions(this.trim(n)), l = 0; l < r.length; l++) {
        for (var o = this.getWords(r[l]), t = this.createCommand(), i = 0; i < o.length; i++)
          this.commandKeys[o[i]] ? t.modifiers[o[i]] = !0 : this.specialKeys[o[i]] ? t.keyCode = this.specialKeys[o[i]] : t.keyCode = o[i].charCodeAt(0);
        _.push(t);
      }
      return _;
    }, getCommandFromEvent: function(n) {
      var _ = this.createCommand();
      _.modifiers.shift = !!n.shiftKey, _.modifiers.alt = !!n.altKey, _.modifiers.ctrl = !!n.ctrlKey, _.modifiers.meta = !!n.metaKey, _.keyCode = n.which || n.keyCode, _.keyCode >= 96 && _.keyCode <= 105 && (_.keyCode -= 48);
      var r = String.fromCharCode(_.keyCode);
      return r && (_.keyCode = r.toLowerCase().charCodeAt(0)), _;
    }, getHashFromEvent: function(n) {
      return this.getHash(this.getCommandFromEvent(n));
    }, getHash: function(n) {
      var _ = [];
      for (var r in n.modifiers)
        n.modifiers[r] && _.push(r);
      return _.push(n.keyCode), _.join(this.junctionChar);
    }, getExpressions: function(n) {
      return n.split(this.junctionChar);
    }, getWords: function(n) {
      return n.split(this.combinationChar);
    }, trim: function(n) {
      return n.replace(/\s/g, "");
    }, junctionChar: ",", combinationChar: "+", commandKeys: { shift: 16, alt: 18, ctrl: 17, meta: !0 }, specialKeys: { backspace: 8, tab: 9, enter: 13, esc: 27, space: 32, up: 38, down: 40, left: 37, right: 39, home: 36, end: 35, pageup: 33, pagedown: 34, delete: 46, insert: 45, plus: 107, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123 } };
  }(e), function(a) {
    a.$keyboardNavigation.EventHandler = { _handlers: null, findHandler: function(n) {
      this._handlers || (this._handlers = {});
      var _ = a.$keyboardNavigation.shortcuts.getHash(n);
      return this._handlers[_];
    }, doAction: function(n, _) {
      var r = this.findHandler(n);
      r && (r.call(this, _), _.preventDefault ? _.preventDefault() : _.returnValue = !1);
    }, bind: function(n, _) {
      this._handlers || (this._handlers = {});
      for (var r = a.$keyboardNavigation.shortcuts, l = r.parse(n), o = 0; o < l.length; o++)
        this._handlers[r.getHash(l[o])] = _;
    }, unbind: function(n) {
      for (var _ = a.$keyboardNavigation.shortcuts, r = _.parse(n), l = 0; l < r.length; l++)
        this._handlers[_.getHash(r[l])] && delete this._handlers[_.getHash(r[l])];
    }, bindAll: function(n) {
      for (var _ in n)
        this.bind(_, n[_]);
    }, initKeys: function() {
      this._handlers || (this._handlers = {}), this.keys && this.bindAll(this.keys);
    } };
  }(e), function(a) {
    a.$keyboardNavigation.getFocusableNodes = a._getFocusableNodes, a.$keyboardNavigation.trapFocus = function(n, _) {
      if (_.keyCode != 9)
        return !1;
      for (var r, l = a.$keyboardNavigation.getFocusableNodes(n), o = document.activeElement, t = -1, i = 0; i < l.length; i++)
        if (l[i] == o) {
          t = i;
          break;
        }
      if (_.shiftKey) {
        if (r = l[t <= 0 ? l.length - 1 : t - 1])
          return r.focus(), _.preventDefault(), !0;
      } else if (r = l[t >= l.length - 1 ? 0 : t + 1])
        return r.focus(), _.preventDefault(), !0;
      return !1;
    };
  }(e), function(a) {
    a.$keyboardNavigation.marker = { clear: function() {
      for (var n = a.$container.querySelectorAll(".dhx_focus_slot"), _ = 0; _ < n.length; _++)
        n[_].parentNode.removeChild(n[_]);
    }, createElement: function() {
      var n = document.createElement("div");
      return n.setAttribute("tabindex", -1), n.className = "dhx_focus_slot", n;
    }, renderMultiple: function(n, _, r) {
      for (var l = [], o = new Date(n), t = new Date(Math.min(_.valueOf(), a.date.add(a.date.day_start(new Date(n)), 1, "day").valueOf())); o.valueOf() < _.valueOf(); )
        l = l.concat(r.call(this, o, new Date(Math.min(t.valueOf(), _.valueOf())))), o = a.date.day_start(a.date.add(o, 1, "day")), t = a.date.day_start(a.date.add(o, 1, "day")), t = new Date(Math.min(t.valueOf(), _.valueOf()));
      return l;
    }, render: function(n, _, r) {
      this.clear();
      var l = [], o = a.$keyboardNavigation.TimeSlot.prototype._modes;
      switch (a.$keyboardNavigation.TimeSlot.prototype._getMode()) {
        case o.units:
          l = this.renderVerticalMarker(n, _, r);
          break;
        case o.timeline:
          l = this.renderTimelineMarker(n, _, r);
          break;
        case o.year:
          l = l.concat(this.renderMultiple(n, _, this.renderYearMarker));
          break;
        case o.month:
          l = this.renderMonthMarker(n, _);
          break;
        case o.weekAgenda:
          l = l.concat(this.renderMultiple(n, _, this.renderWeekAgendaMarker));
          break;
        case o.list:
          l = this.renderAgendaMarker(n, _);
          break;
        case o.dayColumns:
          l = l.concat(this.renderMultiple(n, _, this.renderVerticalMarker));
      }
      this.addWaiAriaLabel(l, n, _, r), this.addDataAttributes(l, n, _, r);
      for (var t = l.length - 1; t >= 0; t--)
        if (l[t].offsetWidth)
          return l[t];
      return null;
    }, addDataAttributes: function(n, _, r, l) {
      for (var o = a.date.date_to_str(a.config.api_date), t = o(_), i = o(r), s = 0; s < n.length; s++)
        n[s].setAttribute("data-start-date", t), n[s].setAttribute("data-end-date", i), l && n[s].setAttribute("data-section", l);
    }, addWaiAriaLabel: function(n, _, r, l) {
      var o = "", t = a.getState().mode, i = !1;
      if (o += a.templates.day_date(_), a.date.day_start(new Date(_)).valueOf() != _.valueOf() && (o += " " + a.templates.hour_scale(_), i = !0), a.date.day_start(new Date(_)).valueOf() != a.date.day_start(new Date(r)).valueOf() && (o += " - " + a.templates.day_date(r), (i || a.date.day_start(new Date(r)).valueOf() != r.valueOf()) && (o += " " + a.templates.hour_scale(r))), l) {
        if (a.matrix && a.matrix[t]) {
          const c = a.matrix[t], g = c.y_unit[c.order[l]];
          o += ", " + a.templates[t + "_scale_label"](g.key, g.label, g);
        } else if (a._props && a._props[t]) {
          const c = a._props[t], g = c.options[c.order[l]];
          o += ", " + a.templates[t + "_scale_text"](g.key, g.label, g);
        }
      }
      for (var s = 0; s < n.length; s++)
        a._waiAria.setAttributes(n[s], { "aria-label": o, "aria-live": "polite" });
    }, renderWeekAgendaMarker: function(n, _) {
      for (var r = a.$container.querySelectorAll(".dhx_wa_day_cont .dhx_wa_scale_bar"), l = a.date.week_start(new Date(a.getState().min_date)), o = -1, t = a.date.day_start(new Date(n)), i = 0; i < r.length && (o++, a.date.day_start(new Date(l)).valueOf() != t.valueOf()); i++)
        l = a.date.add(l, 1, "day");
      return o != -1 ? this._wrapDiv(r[o]) : [];
    }, _wrapDiv: function(n) {
      var _ = this.createElement();
      return _.style.top = n.offsetTop + "px", _.style.left = n.offsetLeft + "px", _.style.width = n.offsetWidth + "px", _.style.height = n.offsetHeight + "px", n.appendChild(_), [_];
    }, renderYearMarker: function(n, _) {
      var r = a._get_year_cell(n);
      r.style.position = "relative";
      var l = this.createElement();
      return l.style.top = "0px", l.style.left = "0px", l.style.width = "100%", l.style.height = "100%", r.appendChild(l), [l];
    }, renderAgendaMarker: function(n, _) {
      var r = this.createElement();
      return r.style.height = "1px", r.style.width = "100%", r.style.opacity = 1, r.style.top = "0px", r.style.left = "0px", a.$container.querySelector(".dhx_cal_data").appendChild(r), [r];
    }, renderTimelineMarker: function(n, _, r) {
      var l = a._lame_copy({}, a.matrix[a._mode]), o = l._scales;
      l.round_position = !1;
      var t = [], i = n ? new Date(n) : a._min_date, s = _ ? new Date(_) : a._max_date;
      if (i.valueOf() < a._min_date.valueOf() && (i = new Date(a._min_date)), s.valueOf() > a._max_date.valueOf() && (s = new Date(a._max_date)), !l._trace_x)
        return t;
      for (var c = 0; c < l._trace_x.length && !a._is_column_visible(l._trace_x[c]); c++)
        ;
      if (c == l._trace_x.length)
        return t;
      var g = o[r];
      if (!(i < _ && s > n))
        return t;
      var y = this.createElement();
      let m, u;
      function p(b, w) {
        w.setDate(1), w.setFullYear(b.getFullYear()), w.setMonth(b.getMonth()), w.setDate(b.getDate());
      }
      if (a.getView().days) {
        const b = new Date(n);
        p(a._min_date, b);
        const w = new Date(_);
        p(a._min_date, w), m = a._timeline_getX({ start_date: b }, !1, l), u = a._timeline_getX({ start_date: w }, !1, l);
      } else
        m = a._timeline_getX({ start_date: n }, !1, l), u = a._timeline_getX({ start_date: _ }, !1, l);
      var d = l._section_height[r] - 1 || l.dy - 1, f = 0;
      a._isRender("cell") && (f = g.offsetTop, m += l.dx, u += l.dx, g = a.$container.querySelector(".dhx_cal_data"));
      var v = Math.max(1, u - m - 1);
      let x = "left";
      return a.config.rtl && (x = "right"), y.style.cssText = `height:${d}px; ${x}:${m}px; width:${v}px; top:${f}px;`, g && (g.appendChild(y), t.push(y)), t;
    }, renderMonthCell: function(n) {
      for (var _ = a.$container.querySelectorAll(".dhx_month_head"), r = [], l = 0; l < _.length; l++)
        r.push(_[l].parentNode);
      var o = -1, t = 0, i = -1, s = a.date.week_start(new Date(a.getState().min_date)), c = a.date.day_start(new Date(n));
      for (l = 0; l < r.length && (o++, i == 6 ? (t++, i = 0) : i++, a.date.day_start(new Date(s)).valueOf() != c.valueOf()); l++)
        s = a.date.add(s, 1, "day");
      if (o == -1)
        return [];
      var g = a._colsS[i], y = a._colsS.heights[t], m = this.createElement();
      m.style.top = y + "px", m.style.left = g + "px", m.style.width = a._cols[i] + "px", m.style.height = (a._colsS.heights[t + 1] - y || a._colsS.height) + "px";
      var u = a.$container.querySelector(".dhx_cal_data"), p = u.querySelector(".dhx_cal_month_table");
      return p.nextSibling ? u.insertBefore(m, p.nextSibling) : u.appendChild(m), m;
    }, renderMonthMarker: function(n, _) {
      for (var r = [], l = n; l.valueOf() < _.valueOf(); )
        r.push(this.renderMonthCell(l)), l = a.date.add(l, 1, "day");
      return r;
    }, renderVerticalMarker: function(n, _, r) {
      var l = a.locate_holder_day(n), o = [], t = null, i = a.config;
      if (a._ignores[l])
        return o;
      if (a._props && a._props[a._mode] && r) {
        var s = a._props[a._mode];
        l = s.order[r];
        var c = s.order[r];
        s.days > 1 ? l = a.locate_holder_day(n) + c : (l = c, s.size && l > s.position + s.size && (l = 0));
      }
      if (!(t = a.locate_holder(l)) || t.querySelector(".dhx_scale_hour"))
        return document.createElement("div");
      var g = Math.max(60 * n.getHours() + n.getMinutes(), 60 * i.first_hour), y = Math.min(60 * _.getHours() + _.getMinutes(), 60 * i.last_hour);
      if (!y && a.date.day_start(new Date(_)).valueOf() > a.date.day_start(new Date(n)).valueOf() && (y = 60 * i.last_hour), y <= g)
        return [];
      var m = this.createElement(), u = a.config.hour_size_px * i.last_hour + 1, p = 36e5;
      return m.style.top = Math.round((60 * g * 1e3 - a.config.first_hour * p) * a.config.hour_size_px / p) % u + "px", m.style.lineHeight = m.style.height = Math.max(Math.round(60 * (y - g) * 1e3 * a.config.hour_size_px / p) % u, 1) + "px", m.style.width = "100%", t.appendChild(m), o.push(m), o[0];
    } };
  }(e), function(a) {
    a.$keyboardNavigation.SchedulerNode = function() {
    }, a.$keyboardNavigation.SchedulerNode.prototype = a._compose(a.$keyboardNavigation.EventHandler, { getDefaultNode: function() {
      var n = new a.$keyboardNavigation.TimeSlot();
      return n.isValid() || (n = n.fallback()), n;
    }, _modes: { month: "month", year: "year", dayColumns: "dayColumns", timeline: "timeline", units: "units", weekAgenda: "weekAgenda", list: "list" }, getMode: function() {
      var n = a.getState().mode;
      return a.matrix && a.matrix[n] ? this._modes.timeline : a._props && a._props[n] ? this._modes.units : n == "month" ? this._modes.month : n == "year" ? this._modes.year : n == "week_agenda" ? this._modes.weekAgenda : n == "map" || n == "agenda" || a._grid && a["grid_" + n] ? this._modes.list : this._modes.dayColumns;
    }, focus: function() {
      a.focus();
    }, blur: function() {
    }, disable: function() {
      a.$container.setAttribute("tabindex", "0");
    }, enable: function() {
      a.$container && a.$container.removeAttribute("tabindex");
    }, isEnabled: function() {
      return a.$container.hasAttribute("tabindex");
    }, _compareEvents: function(n, _) {
      return n.start_date.valueOf() == _.start_date.valueOf() ? n.id > _.id ? 1 : -1 : n.start_date.valueOf() > _.start_date.valueOf() ? 1 : -1;
    }, _pickEvent: function(n, _, r, l) {
      var o = a.getState();
      n = new Date(Math.max(o.min_date.valueOf(), n.valueOf())), _ = new Date(Math.min(o.max_date.valueOf(), _.valueOf()));
      var t = a.getEvents(n, _);
      t.sort(this._compareEvents), l && (t = t.reverse());
      for (var i = !!r, s = 0; s < t.length && i; s++)
        t[s].id == r && (i = !1), t.splice(s, 1), s--;
      for (s = 0; s < t.length; s++)
        if (new a.$keyboardNavigation.Event(t[s].id).getNode())
          return t[s];
      return null;
    }, nextEventHandler: function(n) {
      var _ = a.$keyboardNavigation.dispatcher.activeNode, r = n || _ && _.eventId, l = null;
      if (r && a.getEvent(r)) {
        var o = a.getEvent(r);
        l = a.$keyboardNavigation.SchedulerNode.prototype._pickEvent(o.start_date, a.date.add(o.start_date, 1, "year"), o.id, !1);
      }
      if (!l && !n) {
        var t = a.getState();
        l = a.$keyboardNavigation.SchedulerNode.prototype._pickEvent(t.min_date, a.date.add(t.min_date, 1, "year"), null, !1);
      }
      if (l) {
        var i = new a.$keyboardNavigation.Event(l.id);
        i.isValid() ? (_ && _.blur(), a.$keyboardNavigation.dispatcher.setActiveNode(i)) : this.nextEventHandler(l.id);
      }
    }, prevEventHandler: function(n) {
      var _ = a.$keyboardNavigation.dispatcher.activeNode, r = n || _ && _.eventId, l = null;
      if (r && a.getEvent(r)) {
        var o = a.getEvent(r);
        l = a.$keyboardNavigation.SchedulerNode.prototype._pickEvent(a.date.add(o.end_date, -1, "year"), o.end_date, o.id, !0);
      }
      if (!l && !n) {
        var t = a.getState();
        l = a.$keyboardNavigation.SchedulerNode.prototype._pickEvent(a.date.add(t.max_date, -1, "year"), t.max_date, null, !0);
      }
      if (l) {
        var i = new a.$keyboardNavigation.Event(l.id);
        i.isValid() ? (_ && _.blur(), a.$keyboardNavigation.dispatcher.setActiveNode(i)) : this.prevEventHandler(l.id);
      }
    }, keys: { "alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9": function(n) {
      var _ = a.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab"), r = n.key;
      r === void 0 && (r = n.keyCode - 48), _[1 * r - 1] && _[1 * r - 1].click();
    }, "ctrl+left,meta+left": function(n) {
      a._click.dhx_cal_prev_button();
    }, "ctrl+right,meta+right": function(n) {
      a._click.dhx_cal_next_button();
    }, "ctrl+up,meta+up": function(n) {
      a.$container.querySelector(".dhx_cal_data").scrollTop -= 20;
    }, "ctrl+down,meta+down": function(n) {
      a.$container.querySelector(".dhx_cal_data").scrollTop += 20;
    }, e: function() {
      this.nextEventHandler();
    }, home: function() {
      a.setCurrentView(/* @__PURE__ */ new Date());
    }, "shift+e": function() {
      this.prevEventHandler();
    }, "ctrl+enter,meta+enter": function() {
      a.addEventNow({ start_date: new Date(a.getState().date) });
    }, "ctrl+c,meta+c": function(n) {
      a._key_nav_copy_paste(n);
    }, "ctrl+v,meta+v": function(n) {
      a._key_nav_copy_paste(n);
    }, "ctrl+x,meta+x": function(n) {
      a._key_nav_copy_paste(n);
    } } }), a.$keyboardNavigation.SchedulerNode.prototype.bindAll(a.$keyboardNavigation.SchedulerNode.prototype.keys);
  }(e), function(a) {
    a.$keyboardNavigation.KeyNavNode = function() {
    }, a.$keyboardNavigation.KeyNavNode.prototype = a._compose(a.$keyboardNavigation.EventHandler, { isValid: function() {
      return !0;
    }, fallback: function() {
      return null;
    }, moveTo: function(n) {
      a.$keyboardNavigation.dispatcher.setActiveNode(n);
    }, compareTo: function(n) {
      if (!n)
        return !1;
      for (var _ in this) {
        if (!!this[_] != !!n[_])
          return !1;
        var r = !(!this[_] || !this[_].toString), l = !(!n[_] || !n[_].toString);
        if (l != r)
          return !1;
        if (l && r) {
          if (n[_].toString() != this[_].toString())
            return !1;
        } else if (n[_] != this[_])
          return !1;
      }
      return !0;
    }, getNode: function() {
    }, focus: function() {
      var n = this.getNode();
      n && (n.setAttribute("tabindex", "-1"), n.focus && n.focus());
    }, blur: function() {
      var n = this.getNode();
      n && n.setAttribute("tabindex", "-1");
    } });
  }(e), function(a) {
    a.$keyboardNavigation.HeaderCell = function(n) {
      this.index = n || 0;
    }, a.$keyboardNavigation.HeaderCell.prototype = a._compose(a.$keyboardNavigation.KeyNavNode, { getNode: function(n) {
      n = n || this.index || 0;
      var _ = this.getNodes();
      if (_[n])
        return _[n];
    }, getNodes: function(n) {
      n = n || [".dhx_cal_navline .dhx_cal_prev_button", ".dhx_cal_navline .dhx_cal_next_button", ".dhx_cal_navline .dhx_cal_today_button", ".dhx_cal_navline .dhx_cal_tab"].join(", ");
      var _ = Array.prototype.slice.call(a.$container.querySelectorAll(n));
      return _.sort(function(r, l) {
        return r.offsetLeft - l.offsetLeft;
      }), _;
    }, _handlers: null, isValid: function() {
      return !!this.getNode(this.index);
    }, fallback: function() {
      var n = this.getNode(0);
      return n || (n = new a.$keyboardNavigation.TimeSlot()), n;
    }, keys: { left: function() {
      var n = this.index - 1;
      n < 0 && (n = this.getNodes().length - 1), this.moveTo(new a.$keyboardNavigation.HeaderCell(n));
    }, right: function() {
      var n = this.index + 1;
      n >= this.getNodes().length && (n = 0), this.moveTo(new a.$keyboardNavigation.HeaderCell(n));
    }, down: function() {
      this.moveTo(new a.$keyboardNavigation.TimeSlot());
    }, enter: function() {
      var n = this.getNode();
      n && n.click();
    } } }), a.$keyboardNavigation.HeaderCell.prototype.bindAll(a.$keyboardNavigation.HeaderCell.prototype.keys);
  }(e), function(a) {
    a.$keyboardNavigation.Event = function(n) {
      if (this.eventId = null, a.getEvent(n)) {
        var _ = a.getEvent(n);
        this.start = new Date(_.start_date), this.end = new Date(_.end_date), this.section = this._getSection(_), this.eventId = n;
      }
    }, a.$keyboardNavigation.Event.prototype = a._compose(a.$keyboardNavigation.KeyNavNode, { _getNodes: function() {
      return Array.prototype.slice.call(a.$container.querySelectorAll("[" + a.config.event_attribute + "]"));
    }, _modes: a.$keyboardNavigation.SchedulerNode.prototype._modes, getMode: a.$keyboardNavigation.SchedulerNode.prototype.getMode, _handlers: null, isValid: function() {
      return !(!a.getEvent(this.eventId) || !this.getNode());
    }, fallback: function() {
      var n = this._getNodes()[0], _ = null;
      if (n && a._locate_event(n)) {
        var r = a._locate_event(n);
        _ = new a.$keyboardNavigation.Event(r);
      } else
        _ = new a.$keyboardNavigation.TimeSlot();
      return _;
    }, isScrolledIntoView: function(n) {
      var _ = n.getBoundingClientRect(), r = a.$container.querySelector(".dhx_cal_data").getBoundingClientRect();
      return !(_.bottom < r.top || _.top > r.bottom);
    }, getNode: function() {
      var n = "[" + a.config.event_attribute + "='" + this.eventId + "']", _ = a.$keyboardNavigation.dispatcher.getInlineEditor(this.eventId);
      if (_)
        return _;
      if (a.isMultisectionEvent && a.isMultisectionEvent(a.getEvent(this.eventId))) {
        for (var r = a.$container.querySelectorAll(n), l = 0; l < r.length; l++)
          if (this.isScrolledIntoView(r[l]))
            return r[l];
        return r[0];
      }
      return a.$container.querySelector(n);
    }, focus: function() {
      var n = a.getEvent(this.eventId), _ = a.getState();
      (n.start_date.valueOf() > _.max_date.valueOf() || n.end_date.valueOf() <= _.min_date.valueOf()) && a.setCurrentView(n.start_date);
      var r = this.getNode();
      this.isScrolledIntoView(r) ? a.$keyboardNavigation.dispatcher.keepScrollPosition((function() {
        a.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
      }).bind(this)) : a.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      a.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getSection: function(n) {
      var _ = null, r = a.getState().mode;
      return a.matrix && a.matrix[r] ? _ = n[a.matrix[a.getState().mode].y_property] : a._props && a._props[r] && (_ = n[a._props[r].map_to]), _;
    }, _moveToSlot: function(n) {
      var _ = a.getEvent(this.eventId);
      if (_) {
        var r = this._getSection(_), l = new a.$keyboardNavigation.TimeSlot(_.start_date, null, r);
        this.moveTo(l.nextSlot(l, n));
      } else
        this.moveTo(new a.$keyboardNavigation.TimeSlot());
    }, keys: { left: function() {
      this._moveToSlot("left");
    }, right: function() {
      this._moveToSlot("right");
    }, down: function() {
      this.getMode() == this._modes.list ? a.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler() : this._moveToSlot("down");
    }, space: function() {
      var n = this.getNode();
      n && n.click ? n.click() : this.moveTo(new a.$keyboardNavigation.TimeSlot());
    }, up: function() {
      this.getMode() == this._modes.list ? a.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler() : this._moveToSlot("up");
    }, delete: function() {
      a.getEvent(this.eventId) ? a._click.buttons.delete(this.eventId) : this.moveTo(new a.$keyboardNavigation.TimeSlot());
    }, enter: function() {
      a.getEvent(this.eventId) ? a.showLightbox(this.eventId) : this.moveTo(new a.$keyboardNavigation.TimeSlot());
    } } }), a.$keyboardNavigation.Event.prototype.bindAll(a.$keyboardNavigation.Event.prototype.keys);
  }(e), function(a) {
    a.$keyboardNavigation.TimeSlot = function(n, _, r, l) {
      var o = a.getState(), t = a.matrix && a.matrix[o.mode];
      n || (n = this.getDefaultDate()), _ || (_ = t ? a.date.add(n, t.x_step, t.x_unit) : a.date.add(n, a.config.key_nav_step, "minute")), this.section = r || this._getDefaultSection(), this.start_date = new Date(n), this.end_date = new Date(_), this.movingDate = l || null;
    }, a.$keyboardNavigation.TimeSlot.prototype = a._compose(a.$keyboardNavigation.KeyNavNode, { _handlers: null, getDefaultDate: function() {
      var n, _ = a.getState(), r = new Date(_.date);
      r.setSeconds(0), r.setMilliseconds(0);
      var l = /* @__PURE__ */ new Date();
      l.setSeconds(0), l.setMilliseconds(0);
      var o = a.matrix && a.matrix[_.mode], t = !1;
      if (r.valueOf() === l.valueOf() && (t = !0), o)
        t ? (o.x_unit === "day" ? (l.setHours(0), l.setMinutes(0)) : o.x_unit === "hour" && l.setMinutes(0), n = l) : n = a.date[o.name + "_start"](new Date(_.date)), n = this.findVisibleColumn(n);
      else if (n = new Date(a.getState().min_date), t && (n = l), n = this.findVisibleColumn(n), t || n.setHours(a.config.first_hour), !a._table_view) {
        var i = a.$container.querySelector(".dhx_cal_data");
        i.scrollTop && n.setHours(a.config.first_hour + Math.ceil(i.scrollTop / a.config.hour_size_px));
      }
      return n;
    }, clone: function(n) {
      return new a.$keyboardNavigation.TimeSlot(n.start_date, n.end_date, n.section, n.movingDate);
    }, _getMultisectionView: function() {
      var n, _ = a.getState();
      return a._props && a._props[_.mode] ? n = a._props[_.mode] : a.matrix && a.matrix[_.mode] && (n = a.matrix[_.mode]), n;
    }, _getDefaultSection: function() {
      var n = null;
      return this._getMultisectionView() && !n && (n = this._getNextSection()), n;
    }, _getNextSection: function(n, _) {
      var r = this._getMultisectionView(), l = r.order[n], o = l;
      (o = l !== void 0 ? l + _ : r.size && r.position ? r.position : 0) < 0 && (o = 0);
      var t = r.options || r.y_unit;
      return o >= t.length && (o = t.length - 1), t[o] ? t[o].key : null;
    }, isValid: function() {
      var n = a.getState();
      if (this.start_date.valueOf() < n.min_date.valueOf() || this.start_date.valueOf() >= n.max_date.valueOf() || !this.isVisible(this.start_date, this.end_date))
        return !1;
      var _ = this._getMultisectionView();
      return !_ || _.order[this.section] !== void 0;
    }, fallback: function() {
      var n = new a.$keyboardNavigation.TimeSlot();
      return n.isValid() ? n : new a.$keyboardNavigation.DataArea();
    }, getNodes: function() {
      return Array.prototype.slice.call(a.$container.querySelectorAll(".dhx_focus_slot"));
    }, getNode: function() {
      return this.getNodes()[0];
    }, focus: function() {
      this.section && a.getView() && a.getView().smart_rendering && a.getView().scrollTo && !a.$container.querySelector(`[data-section-id="${this.section}"]`) && a.getView().scrollTo({ section: this.section }), a.$keyboardNavigation.marker.render(this.start_date, this.end_date, this.section), a.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this), a.$keyboardNavigation._pasteDate = this.start_date, a.$keyboardNavigation._pasteSection = this.section;
    }, blur: function() {
      a.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this), a.$keyboardNavigation.marker.clear();
    }, _modes: a.$keyboardNavigation.SchedulerNode.prototype._modes, _getMode: a.$keyboardNavigation.SchedulerNode.prototype.getMode, addMonthDate: function(n, _, r) {
      var l;
      switch (_) {
        case "up":
          l = a.date.add(n, -1, "week");
          break;
        case "down":
          l = a.date.add(n, 1, "week");
          break;
        case "left":
          l = a.date.day_start(a.date.add(n, -1, "day")), l = this.findVisibleColumn(l, -1);
          break;
        case "right":
          l = a.date.day_start(a.date.add(n, 1, "day")), l = this.findVisibleColumn(l, 1);
          break;
        default:
          l = a.date.day_start(new Date(n));
      }
      var o = a.getState();
      return (n.valueOf() < o.min_date.valueOf() || !r && n.valueOf() >= o.max_date.valueOf()) && (l = new Date(o.min_date)), l;
    }, nextMonthSlot: function(n, _, r) {
      var l, o;
      return (l = this.addMonthDate(n.start_date, _, r)).setHours(a.config.first_hour), (o = new Date(l)).setHours(a.config.last_hour), { start_date: l, end_date: o };
    }, _alignTimeSlot: function(n, _, r, l) {
      for (var o = new Date(_); o.valueOf() < n.valueOf(); )
        o = a.date.add(o, l, r);
      return o.valueOf() > n.valueOf() && (o = a.date.add(o, -l, r)), o;
    }, nextTimelineSlot: function(n, _, r) {
      var l = a.getState(), o = a.matrix[l.mode], t = this._alignTimeSlot(n.start_date, a.date[o.name + "_start"](new Date(n.start_date)), o.x_unit, o.x_step), i = this._alignTimeSlot(n.end_date, a.date[o.name + "_start"](new Date(n.end_date)), o.x_unit, o.x_step);
      i.valueOf() <= t.valueOf() && (i = a.date.add(t, o.x_step, o.x_unit));
      var s = this.clone(n);
      switch (s.start_date = t, s.end_date = i, s.section = n.section || this._getNextSection(), _) {
        case "up":
          s.section = this._getNextSection(n.section, -1);
          break;
        case "down":
          s.section = this._getNextSection(n.section, 1);
          break;
        case "left":
          s.start_date = this.findVisibleColumn(a.date.add(s.start_date, -o.x_step, o.x_unit), -1), s.end_date = a.date.add(s.start_date, o.x_step, o.x_unit);
          break;
        case "right":
          s.start_date = this.findVisibleColumn(a.date.add(s.start_date, o.x_step, o.x_unit), 1), s.end_date = a.date.add(s.start_date, o.x_step, o.x_unit);
      }
      return (s.start_date.valueOf() < l.min_date.valueOf() || s.start_date.valueOf() >= l.max_date.valueOf()) && (r && s.start_date.valueOf() >= l.max_date.valueOf() ? s.start_date = new Date(l.max_date) : (s.start_date = a.date[l.mode + "_start"](a.date.add(l.date, _ == "left" ? -1 : 1, l.mode)), s.end_date = a.date.add(s.start_date, o.x_step, o.x_unit))), s;
    }, nextUnitsSlot: function(n, _, r) {
      var l = this.clone(n);
      l.section = n.section || this._getNextSection();
      var o = n.section || this._getNextSection(), t = a.getState(), i = a._props[t.mode];
      switch (_) {
        case "left":
          o = this._getNextSection(n.section, -1);
          var s = i.size ? i.size - 1 : i.options.length;
          i.days > 1 && i.order[o] == s - 1 && a.date.add(n.start_date, -1, "day").valueOf() >= t.min_date.valueOf() && (l = this.nextDaySlot(n, _, r));
          break;
        case "right":
          o = this._getNextSection(n.section, 1), i.days > 1 && !i.order[o] && a.date.add(n.start_date, 1, "day").valueOf() < t.max_date.valueOf() && (l = this.nextDaySlot(n, _, r));
          break;
        default:
          l = this.nextDaySlot(n, _, r), o = n.section;
      }
      return l.section = o, l;
    }, _moveDate: function(n, _) {
      var r = this.findVisibleColumn(a.date.add(n, _, "day"), _);
      return r.setHours(n.getHours()), r.setMinutes(n.getMinutes()), r;
    }, isBeforeLastHour: function(n, _) {
      var r = n.getMinutes(), l = n.getHours(), o = a.config.last_hour;
      return l < o || !_ && (o == 24 || l == o) && !r;
    }, isAfterFirstHour: function(n, _) {
      var r = n.getMinutes(), l = n.getHours(), o = a.config.first_hour, t = a.config.last_hour;
      return l >= o || !_ && !r && (!l && t == 24 || l == t);
    }, isInVisibleDayTime: function(n, _) {
      return this.isBeforeLastHour(n, _) && this.isAfterFirstHour(n, _);
    }, nextDaySlot: function(n, _, r) {
      var l, o, t = a.config.key_nav_step, i = this._alignTimeSlot(n.start_date, a.date.day_start(new Date(n.start_date)), "minute", t), s = n.start_date;
      switch (_) {
        case "up":
          if (l = a.date.add(i, -t, "minute"), !this.isInVisibleDayTime(l, !0) && (!r || this.isInVisibleDayTime(s, !0))) {
            var c = !0;
            r && a.date.date_part(new Date(l)).valueOf() != a.date.date_part(new Date(s)).valueOf() && (c = !1), c && (l = this.findVisibleColumn(a.date.add(n.start_date, -1, "day"), -1)), l.setHours(a.config.last_hour), l.setMinutes(0), l = a.date.add(l, -t, "minute");
          }
          o = a.date.add(l, t, "minute");
          break;
        case "down":
          l = a.date.add(i, t, "minute");
          var g = r ? l : a.date.add(l, t, "minute");
          this.isInVisibleDayTime(g, !1) || r && !this.isInVisibleDayTime(s, !1) || (r ? (c = !0, a.date.date_part(new Date(s)).valueOf() == s.valueOf() && (c = !1), c && (l = this.findVisibleColumn(a.date.add(n.start_date, 1, "day"), 1)), l.setHours(a.config.first_hour), l.setMinutes(0), l = a.date.add(l, t, "minute")) : ((l = this.findVisibleColumn(a.date.add(n.start_date, 1, "day"), 1)).setHours(a.config.first_hour), l.setMinutes(0))), o = a.date.add(l, t, "minute");
          break;
        case "left":
          l = this._moveDate(n.start_date, -1), o = this._moveDate(n.end_date, -1);
          break;
        case "right":
          l = this._moveDate(n.start_date, 1), o = this._moveDate(n.end_date, 1);
          break;
        default:
          l = i, o = a.date.add(l, t, "minute");
      }
      return { start_date: l, end_date: o };
    }, nextWeekAgendaSlot: function(n, _) {
      var r, l, o = a.getState();
      switch (_) {
        case "down":
        case "left":
          r = a.date.day_start(a.date.add(n.start_date, -1, "day")), r = this.findVisibleColumn(r, -1);
          break;
        case "up":
        case "right":
          r = a.date.day_start(a.date.add(n.start_date, 1, "day")), r = this.findVisibleColumn(r, 1);
          break;
        default:
          r = a.date.day_start(n.start_date);
      }
      return (n.start_date.valueOf() < o.min_date.valueOf() || n.start_date.valueOf() >= o.max_date.valueOf()) && (r = new Date(o.min_date)), (l = new Date(r)).setHours(a.config.last_hour), { start_date: r, end_date: l };
    }, nextAgendaSlot: function(n, _) {
      return { start_date: n.start_date, end_date: n.end_date };
    }, isDateVisible: function(n) {
      if (!a._ignores_detected)
        return !0;
      var _, r = a.matrix && a.matrix[a.getState().mode];
      return _ = r ? a._get_date_index(r, n) : a.locate_holder_day(n), !a._ignores[_];
    }, findVisibleColumn: function(n, _) {
      var r = n;
      _ = _ || 1;
      for (var l = a.getState(); !this.isDateVisible(r) && (_ > 0 && r.valueOf() <= l.max_date.valueOf() || _ < 0 && r.valueOf() >= l.min_date.valueOf()); )
        r = this.nextDateColumn(r, _);
      return r;
    }, nextDateColumn: function(n, _) {
      _ = _ || 1;
      var r = a.matrix && a.matrix[a.getState().mode];
      return r ? a.date.add(n, _ * r.x_step, r.x_unit) : a.date.day_start(a.date.add(n, _, "day"));
    }, isVisible: function(n, _) {
      if (!a._ignores_detected)
        return !0;
      for (var r = new Date(n); r.valueOf() < _.valueOf(); ) {
        if (this.isDateVisible(r))
          return !0;
        r = this.nextDateColumn(r);
      }
      return !1;
    }, nextSlot: function(n, _, r, l) {
      var o;
      r = r || this._getMode();
      var t = a.$keyboardNavigation.TimeSlot.prototype.clone(n);
      switch (r) {
        case this._modes.units:
          o = this.nextUnitsSlot(t, _, l);
          break;
        case this._modes.timeline:
          o = this.nextTimelineSlot(t, _, l);
          break;
        case this._modes.year:
        case this._modes.month:
          o = this.nextMonthSlot(t, _, l);
          break;
        case this._modes.weekAgenda:
          o = this.nextWeekAgendaSlot(t, _, l);
          break;
        case this._modes.list:
          o = this.nextAgendaSlot(t, _, l);
          break;
        case this._modes.dayColumns:
          o = this.nextDaySlot(t, _, l);
      }
      return o.start_date.valueOf() >= o.end_date.valueOf() && (o = this.nextSlot(o, _, r)), a.$keyboardNavigation.TimeSlot.prototype.clone(o);
    }, extendSlot: function(n, _) {
      var r;
      switch (this._getMode()) {
        case this._modes.units:
          r = _ == "left" || _ == "right" ? this.nextUnitsSlot(n, _) : this.extendUnitsSlot(n, _);
          break;
        case this._modes.timeline:
          r = _ == "down" || _ == "up" ? this.nextTimelineSlot(n, _) : this.extendTimelineSlot(n, _);
          break;
        case this._modes.year:
        case this._modes.month:
          r = this.extendMonthSlot(n, _);
          break;
        case this._modes.dayColumns:
          r = this.extendDaySlot(n, _);
          break;
        case this._modes.weekAgenda:
          r = this.extendWeekAgendaSlot(n, _);
          break;
        default:
          r = n;
      }
      var l = a.getState();
      return r.start_date.valueOf() < l.min_date.valueOf() && (r.start_date = this.findVisibleColumn(l.min_date), r.start_date.setHours(a.config.first_hour)), r.end_date.valueOf() > l.max_date.valueOf() && (r.end_date = this.findVisibleColumn(l.max_date, -1)), a.$keyboardNavigation.TimeSlot.prototype.clone(r);
    }, extendTimelineSlot: function(n, _) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, n, _, "timeline");
    }, extendWeekAgendaSlot: function(n, _) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, n, _, "weekAgenda");
    }, extendGenericSlot: function(n, _, r, l) {
      var o, t = _.movingDate;
      if (t || (t = n[r]), !t || !n[r])
        return _;
      if (!r)
        return a.$keyboardNavigation.TimeSlot.prototype.clone(_);
      (o = this.nextSlot({ start_date: _[t], section: _.section }, r, l, !0)).start_date.valueOf() == _.start_date.valueOf() && (o = this.nextSlot({ start_date: o.start_date, section: o.section }, r, l, !0)), o.movingDate = t;
      var i = this.extendSlotDates(_, o, o.movingDate);
      return i.end_date.valueOf() <= i.start_date.valueOf() && (o.movingDate = o.movingDate == "end_date" ? "start_date" : "end_date"), i = this.extendSlotDates(_, o, o.movingDate), o.start_date = i.start_date, o.end_date = i.end_date, o;
    }, extendSlotDates: function(n, _, r) {
      var l = { start_date: null, end_date: null };
      return r == "start_date" ? (l.start_date = _.start_date, l.end_date = n.end_date) : (l.start_date = n.start_date, l.end_date = _.start_date), l;
    }, extendMonthSlot: function(n, _) {
      return (n = this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, n, _, "month")).start_date.setHours(a.config.first_hour), n.end_date = a.date.add(n.end_date, -1, "day"), n.end_date.setHours(a.config.last_hour), n;
    }, extendUnitsSlot: function(n, _) {
      var r;
      switch (_) {
        case "down":
        case "up":
          r = this.extendDaySlot(n, _);
          break;
        default:
          r = n;
      }
      return r.section = n.section, r;
    }, extendDaySlot: function(n, _) {
      return this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, n, _, "dayColumns");
    }, scrollSlot: function(n) {
      var _ = a.getState(), r = this.nextSlot(this, n);
      (r.start_date.valueOf() < _.min_date.valueOf() || r.start_date.valueOf() >= _.max_date.valueOf()) && a.setCurrentView(new Date(r.start_date)), this.moveTo(r);
    }, keys: { left: function() {
      this.scrollSlot("left");
    }, right: function() {
      this.scrollSlot("right");
    }, down: function() {
      this._getMode() == this._modes.list ? a.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler() : this.scrollSlot("down");
    }, up: function() {
      this._getMode() == this._modes.list ? a.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler() : this.scrollSlot("up");
    }, "shift+down": function() {
      this.moveTo(this.extendSlot(this, "down"));
    }, "shift+up": function() {
      this.moveTo(this.extendSlot(this, "up"));
    }, "shift+right": function() {
      this.moveTo(this.extendSlot(this, "right"));
    }, "shift+left": function() {
      this.moveTo(this.extendSlot(this, "left"));
    }, enter: function() {
      var n = { start_date: new Date(this.start_date), end_date: new Date(this.end_date) }, _ = a.getState().mode;
      a.matrix && a.matrix[_] ? n[a.matrix[a.getState().mode].y_property] = this.section : a._props && a._props[_] && (n[a._props[_].map_to] = this.section), a.addEventNow(n);
    } } }), a.$keyboardNavigation.TimeSlot.prototype.bindAll(a.$keyboardNavigation.TimeSlot.prototype.keys);
  }(e), function(a) {
    a.$keyboardNavigation.MinicalButton = function(n, _) {
      this.container = n, this.index = _ || 0;
    }, a.$keyboardNavigation.MinicalButton.prototype = a._compose(a.$keyboardNavigation.KeyNavNode, { isValid: function() {
      return !!this.container.offsetWidth;
    }, fallback: function() {
      var n = new a.$keyboardNavigation.TimeSlot();
      return n.isValid() ? n : new a.$keyboardNavigation.DataArea();
    }, focus: function() {
      a.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), a.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0"), a.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, getNode: function() {
      return this.index ? this.container.querySelector(".dhx_cal_next_button") : this.container.querySelector(".dhx_cal_prev_button");
    }, keys: { right: function(n) {
      this.moveTo(new a.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, left: function(n) {
      this.moveTo(new a.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, down: function() {
      var n = new a.$keyboardNavigation.MinicalCell(this.container, 0, 0);
      n && !n.isValid() && (n = n.fallback()), this.moveTo(n);
    }, enter: function(n) {
      this.getNode().click();
    } } }), a.$keyboardNavigation.MinicalButton.prototype.bindAll(a.$keyboardNavigation.MinicalButton.prototype.keys);
  }(e), function(a) {
    a.$keyboardNavigation.MinicalCell = function(n, _, r) {
      this.container = n, this.row = _ || 0, this.col = r || 0;
    }, a.$keyboardNavigation.MinicalCell.prototype = a._compose(a.$keyboardNavigation.KeyNavNode, { isValid: function() {
      var n = this._getGrid();
      return !(!n[this.row] || !n[this.row][this.col]);
    }, fallback: function() {
      var n = this.row, _ = this.col, r = this._getGrid();
      r[n] || (n = 0);
      var l = !0;
      if (n > r.length / 2 && (l = !1), !r[n]) {
        var o = new a.$keyboardNavigation.TimeSlot();
        return o.isValid() ? o : new a.$keyboardNavigation.DataArea();
      }
      if (l) {
        for (var t = _; r[n] && t < r[n].length; t++)
          if (r[n][t] || t != r[n].length - 1 || (n++, _ = 0), r[n][t])
            return new a.$keyboardNavigation.MinicalCell(this.container, n, t);
      } else
        for (t = _; r[n] && t < r[n].length; t--)
          if (r[n][t] || t || (_ = r[--n].length - 1), r[n][t])
            return new a.$keyboardNavigation.MinicalCell(this.container, n, t);
      return new a.$keyboardNavigation.MinicalButton(this.container, 0);
    }, focus: function() {
      a.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), a.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0"), a.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getNode: function(n, _) {
      return this.container.querySelector(".dhx_year_body tr:nth-child(" + (n + 1) + ") td:nth-child(" + (_ + 1) + ")");
    }, getNode: function() {
      return this._getNode(this.row, this.col);
    }, _getGrid: function() {
      for (var n = this.container.querySelectorAll(".dhx_year_body tr"), _ = [], r = 0; r < n.length; r++) {
        _[r] = [];
        for (var l = n[r].querySelectorAll("td"), o = 0; o < l.length; o++) {
          var t = l[o], i = !0, s = a._getClassName(t);
          (s.indexOf("dhx_after") > -1 || s.indexOf("dhx_before") > -1 || s.indexOf("dhx_scale_ignore") > -1) && (i = !1), _[r][o] = i;
        }
      }
      return _;
    }, keys: { right: function(n) {
      var _ = this._getGrid(), r = this.row, l = this.col + 1;
      _[r] && _[r][l] || (_[r + 1] ? (r += 1, l = 0) : l = this.col);
      var o = new a.$keyboardNavigation.MinicalCell(this.container, r, l);
      o.isValid() || (o = o.fallback()), this.moveTo(o);
    }, left: function(n) {
      var _ = this._getGrid(), r = this.row, l = this.col - 1;
      _[r] && _[r][l] || (l = _[r - 1] ? _[r -= 1].length - 1 : this.col);
      var o = new a.$keyboardNavigation.MinicalCell(this.container, r, l);
      o.isValid() || (o = o.fallback()), this.moveTo(o);
    }, down: function() {
      var n = this._getGrid(), _ = this.row + 1, r = this.col;
      n[_] && n[_][r] || (_ = this.row);
      var l = new a.$keyboardNavigation.MinicalCell(this.container, _, r);
      l.isValid() || (l = l.fallback()), this.moveTo(l);
    }, up: function() {
      var n = this._getGrid(), _ = this.row - 1, r = this.col;
      if (n[_] && n[_][r]) {
        var l = new a.$keyboardNavigation.MinicalCell(this.container, _, r);
        l.isValid() || (l = l.fallback()), this.moveTo(l);
      } else {
        var o = 0;
        this.col > n[this.row].length / 2 && (o = 1), this.moveTo(new a.$keyboardNavigation.MinicalButton(this.container, o));
      }
    }, enter: function(n) {
      this.getNode().querySelector(".dhx_month_head").click();
    } } }), a.$keyboardNavigation.MinicalCell.prototype.bindAll(a.$keyboardNavigation.MinicalCell.prototype.keys);
  }(e), function(a) {
    a.$keyboardNavigation.DataArea = function(n) {
      this.index = n || 0;
    }, a.$keyboardNavigation.DataArea.prototype = a._compose(a.$keyboardNavigation.KeyNavNode, { getNode: function(n) {
      return a.$container.querySelector(".dhx_cal_data");
    }, _handlers: null, isValid: function() {
      return !0;
    }, fallback: function() {
      return this;
    }, keys: { "up,down,right,left": function() {
      this.moveTo(new a.$keyboardNavigation.TimeSlot());
    } } }), a.$keyboardNavigation.DataArea.prototype.bindAll(a.$keyboardNavigation.DataArea.prototype.keys);
  }(e), Ft(e), function(a) {
    a.$keyboardNavigation.dispatcher = { isActive: !1, activeNode: null, globalNode: new a.$keyboardNavigation.SchedulerNode(), keepScrollPosition: function(n) {
      var _, r, l = a.$container.querySelector(".dhx_timeline_scrollable_data");
      l || (l = a.$container.querySelector(".dhx_cal_data")), l && (_ = l.scrollTop, r = l.scrollLeft), n(), l && (l.scrollTop = _, l.scrollLeft = r);
    }, enable: function() {
      if (a.$container) {
        this.isActive = !0;
        var n = this;
        this.keepScrollPosition(function() {
          n.globalNode.enable(), n.setActiveNode(n.getActiveNode());
        });
      }
    }, disable: function() {
      this.isActive = !1, this.globalNode.disable();
    }, isEnabled: function() {
      return !!this.isActive;
    }, getDefaultNode: function() {
      return this.globalNode.getDefaultNode();
    }, setDefaultNode: function() {
      this.setActiveNode(this.getDefaultNode());
    }, getActiveNode: function() {
      var n = this.activeNode;
      return n && !n.isValid() && (n = n.fallback()), n;
    }, focusGlobalNode: function() {
      this.blurNode(this.globalNode), this.focusNode(this.globalNode);
    }, setActiveNode: function(n) {
      n && n.isValid() && (this.activeNode && this.activeNode.compareTo(n) || this.isEnabled() && (this.blurNode(this.activeNode), this.activeNode = n, this.focusNode(this.activeNode)));
    }, focusNode: function(n) {
      n && n.focus && (n.focus(), n.getNode && document.activeElement != n.getNode() && this.setActiveNode(new a.$keyboardNavigation.DataArea()));
    }, blurNode: function(n) {
      n && n.blur && n.blur();
    }, getInlineEditor: function(n) {
      var _ = a.$container.querySelector(".dhx_cal_editor[" + a.config.event_attribute + "='" + n + "'] textarea");
      return _ && _.offsetWidth ? _ : null;
    }, keyDownHandler: function(n) {
      if (!n.defaultPrevented) {
        var _ = this.getActiveNode();
        if ((!a.$keyboardNavigation.isModal() || _ && _.container && a.utils.dom.locateCss({ target: _.container }, "dhx_minical_popup", !1)) && (!a.getState().editor_id || !this.getInlineEditor(a.getState().editor_id)) && this.isEnabled()) {
          n = n || window.event;
          var r = this.globalNode, l = a.$keyboardNavigation.shortcuts.getCommandFromEvent(n);
          _ ? _.findHandler(l) ? _.doAction(l, n) : r.findHandler(l) && r.doAction(l, n) : this.setDefaultNode();
        }
      }
    }, _timeout: null, delay: function(n, _) {
      clearTimeout(this._timeout), this._timeout = setTimeout(n, _ || 1);
    } };
  }(e), Yt(e), function() {
    Jt(e), function(o) {
      o.$keyboardNavigation._minicalendars = [], o.$keyboardNavigation.isMinical = function(t) {
        for (var i = o.$keyboardNavigation._minicalendars, s = 0; s < i.length; s++)
          if (this.isChildOf(t, i[s]))
            return !0;
        return !1;
      }, o.$keyboardNavigation.isChildOf = function(t, i) {
        for (; t && t !== i; )
          t = t.parentNode;
        return t === i;
      }, o.$keyboardNavigation.patchMinicalendar = function() {
        var t = o.$keyboardNavigation.dispatcher;
        function i(y) {
          var m = y.target;
          t.enable(), t.setActiveNode(new o.$keyboardNavigation.MinicalButton(m, 0));
        }
        function s(y) {
          var m = y.target || y.srcElement, u = o.utils.dom.locateCss(y, "dhx_cal_prev_button", !1), p = o.utils.dom.locateCss(y, "dhx_cal_next_button", !1), d = o.utils.dom.locateCss(y, "dhx_year_body", !1), f = 0, v = 0;
          if (d) {
            for (var x, b, w = m; w && w.tagName.toLowerCase() != "td"; )
              w = w.parentNode;
            if (w && (x = (b = w).parentNode), x && b) {
              for (var k = x.parentNode.querySelectorAll("tr"), E = 0; E < k.length; E++)
                if (k[E] == x) {
                  f = E;
                  break;
                }
              var D = x.querySelectorAll("td");
              for (E = 0; E < D.length; E++)
                if (D[E] == b) {
                  v = E;
                  break;
                }
            }
          }
          var S = y.currentTarget;
          t.delay(function() {
            var N;
            (u || p || d) && (u ? (N = new o.$keyboardNavigation.MinicalButton(S, 0), t.setActiveNode(new o.$keyboardNavigation.MinicalButton(S, 0))) : p ? N = new o.$keyboardNavigation.MinicalButton(S, 1) : d && (N = new o.$keyboardNavigation.MinicalCell(S, f, v)), N && (t.enable(), N.isValid() && (t.activeNode = null, t.setActiveNode(N))));
          });
        }
        if (o.renderCalendar) {
          var c = o.renderCalendar;
          o.renderCalendar = function() {
            var y = c.apply(this, arguments), m = o.$keyboardNavigation._minicalendars;
            o.eventRemove(y, "click", s), o.event(y, "click", s), o.eventRemove(y, "focus", i), o.event(y, "focus", i);
            for (var u = !1, p = 0; p < m.length; p++)
              if (m[p] == y) {
                u = !0;
                break;
              }
            if (u || m.push(y), t.isEnabled()) {
              var d = t.getActiveNode();
              d && d.container == y ? t.focusNode(d) : y.setAttribute("tabindex", "0");
            } else
              y.setAttribute("tabindex", "0");
            return y;
          };
        }
        if (o.destroyCalendar) {
          var g = o.destroyCalendar;
          o.destroyCalendar = function(y, m) {
            y = y || (o._def_count ? o._def_count.firstChild : null);
            var u = g.apply(this, arguments);
            if (!y || !y.parentNode)
              for (var p = o.$keyboardNavigation._minicalendars, d = 0; d < p.length; d++)
                p[d] == y && (o.eventRemove(p[d], "focus", i), p.splice(d, 1), d--);
            return u;
          };
        }
      };
    }(e);
    var a = e.$keyboardNavigation.dispatcher;
    if (e.$keyboardNavigation.attachSchedulerHandlers(), e.renderCalendar)
      e.$keyboardNavigation.patchMinicalendar();
    else
      var n = e.attachEvent("onSchedulerReady", function() {
        e.detachEvent(n), e.$keyboardNavigation.patchMinicalendar();
      });
    function _() {
      if (e.config.key_nav) {
        var o = document.activeElement;
        return !(!o || e.utils.dom.locateCss(o, "dhx_cal_quick_info", !1)) && (e.$keyboardNavigation.isChildOf(o, e.$container) || e.$keyboardNavigation.isMinical(o));
      }
    }
    function r(o) {
      o && !a.isEnabled() ? a.enable() : !o && a.isEnabled() && a.disable();
    }
    const l = setInterval(function() {
      if (e.$container && e.$keyboardNavigation.isChildOf(e.$container, document.body)) {
        var o = _();
        o ? r(o) : !o && a.isEnabled() && setTimeout(function() {
          e.$destroyed || (e.config.key_nav ? r(_()) : e.$container.removeAttribute("tabindex"));
        }, 100);
      }
    }, 500);
    e.attachEvent("onDestroy", function() {
      clearInterval(l);
    });
  }();
}, layer: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    this.layers.sort(function(a, n) {
      return a.zIndex - n.zIndex;
    }), e._dp_init = function(a) {
      a._methods = ["_set_event_text_style", "", "changeEventId", "deleteEvent"], this.attachEvent("onEventAdded", function(n) {
        !this._loading && this.validId(n) && this.getEvent(n) && this.getEvent(n).layer == a.layer && a.setUpdated(n, !0, "inserted");
      }), this.attachEvent("onBeforeEventDelete", function(n) {
        if (this.getEvent(n) && this.getEvent(n).layer == a.layer) {
          if (!this.validId(n))
            return;
          var _ = a.getState(n);
          return _ == "inserted" || this._new_event ? (a.setUpdated(n, !1), !0) : _ != "deleted" && (_ == "true_deleted" || (a.setUpdated(n, !0, "deleted"), !1));
        }
        return !0;
      }), this.attachEvent("onEventChanged", function(n) {
        !this._loading && this.validId(n) && this.getEvent(n) && this.getEvent(n).layer == a.layer && a.setUpdated(n, !0, "updated");
      }), a._getRowData = function(n, _) {
        var r = this.obj.getEvent(n), l = {};
        for (var o in r)
          o.indexOf("_") !== 0 && (r[o] && r[o].getUTCFullYear ? l[o] = this.obj._helpers.formatDate(r[o]) : l[o] = r[o]);
        return l;
      }, a._clearUpdateFlag = function() {
      }, a.attachEvent("insertCallback", e._update_callback), a.attachEvent("updateCallback", e._update_callback), a.attachEvent("deleteCallback", function(n, _) {
        this.obj.setUserData(_, this.action_param, "true_deleted"), this.obj.deleteEvent(_);
      });
    }, function() {
      var a = function(r) {
        if (r === null || typeof r != "object")
          return r;
        var l = new r.constructor();
        for (var o in r)
          l[o] = a(r[o]);
        return l;
      };
      e._dataprocessors = [], e._layers_zindex = {};
      for (var n = 0; n < e.layers.length; n++) {
        if (e.config["lightbox_" + e.layers[n].name] = {}, e.config["lightbox_" + e.layers[n].name].sections = a(e.config.lightbox.sections), e._layers_zindex[e.layers[n].name] = e.config.initial_layer_zindex || 5 + 3 * n, e.layers[n].url) {
          var _ = e.createDataProcessor({ url: e.layers[n].url });
          _.layer = e.layers[n].name, e._dataprocessors.push(_), e._dataprocessors[n].init(e);
        }
        e.layers[n].isDefault && (e.defaultLayer = e.layers[n].name);
      }
    }(), e.showLayer = function(a) {
      this.toggleLayer(a, !0);
    }, e.hideLayer = function(a) {
      this.toggleLayer(a, !1);
    }, e.toggleLayer = function(a, n) {
      var _ = this.getLayer(a);
      _.visible = n !== void 0 ? !!n : !_.visible, this.setCurrentView(this._date, this._mode);
    }, e.getLayer = function(a) {
      var n, _;
      typeof a == "string" && (_ = a), typeof a == "object" && (_ = a.layer);
      for (var r = 0; r < e.layers.length; r++)
        e.layers[r].name == _ && (n = e.layers[r]);
      return n;
    }, e.attachEvent("onBeforeLightbox", function(a) {
      var n = this.getEvent(a);
      return this.config.lightbox.sections = this.config["lightbox_" + n.layer].sections, e.resetLightbox(), !0;
    }), e.attachEvent("onClick", function(a, n) {
      var _ = e.getEvent(a);
      return !e.getLayer(_.layer).noMenu;
    }), e.attachEvent("onEventCollision", function(a, n) {
      var _ = this.getLayer(a);
      if (!_.checkCollision)
        return !1;
      for (var r = 0, l = 0; l < n.length; l++)
        n[l].layer == _.name && n[l].id != a.id && r++;
      return r >= e.config.collision_limit;
    }), e.addEvent = function(a, n, _, r, l) {
      var o = a;
      arguments.length != 1 && ((o = l || {}).start_date = a, o.end_date = n, o.text = _, o.id = r, o.layer = this.defaultLayer), o.id = o.id || e.uid(), o.text = o.text || "", typeof o.start_date == "string" && (o.start_date = this.templates.api_date(o.start_date)), typeof o.end_date == "string" && (o.end_date = this.templates.api_date(o.end_date)), o._timed = this.isOneDayEvent(o);
      var t = !this._events[o.id];
      this._events[o.id] = o, this.event_updated(o), this._loading || this.callEvent(t ? "onEventAdded" : "onEventChanged", [o.id, o]);
    }, this._evs_layer = {};
    for (var h = 0; h < this.layers.length; h++)
      this._evs_layer[this.layers[h].name] = [];
    e.addEventNow = function(a, n, _) {
      var r = {};
      typeof a == "object" && (r = a, a = null);
      var l = 6e4 * (this.config.event_duration || this.config.time_step);
      a || (a = Math.round(e._currentDate().valueOf() / l) * l);
      var o = new Date(a);
      if (!n) {
        var t = this.config.first_hour;
        t > o.getHours() && (o.setHours(t), a = o.valueOf()), n = a + l;
      }
      r.start_date = r.start_date || o, r.end_date = r.end_date || new Date(n), r.text = r.text || this.locale.labels.new_event, r.id = this._drag_id = this.uid(), r.layer = this.defaultLayer, this._drag_mode = "new-size", this._loading = !0, this.addEvent(r), this.callEvent("onEventCreated", [this._drag_id, _]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(_);
    }, e._t_render_view_data = function(a) {
      if (this.config.multi_day && !this._table_view) {
        for (var n = [], _ = [], r = 0; r < a.length; r++)
          a[r]._timed ? n.push(a[r]) : _.push(a[r]);
        this._table_view = !0, this.render_data(_), this._table_view = !1, this.render_data(n);
      } else
        this.render_data(a);
    }, e.render_view_data = function() {
      if (this._not_render)
        this._render_wait = !0;
      else {
        this._render_wait = !1, this.clear_view(), this._evs_layer = {};
        for (var a = 0; a < this.layers.length; a++)
          this._evs_layer[this.layers[a].name] = [];
        var n = this.get_visible_events();
        for (a = 0; a < n.length; a++)
          this._evs_layer[n[a].layer] && this._evs_layer[n[a].layer].push(n[a]);
        if (this._mode == "month") {
          var _ = [];
          for (a = 0; a < this.layers.length; a++)
            this.layers[a].visible && (_ = _.concat(this._evs_layer[this.layers[a].name]));
          this._t_render_view_data(_);
        } else
          for (a = 0; a < this.layers.length; a++)
            if (this.layers[a].visible) {
              var r = this._evs_layer[this.layers[a].name];
              this._t_render_view_data(r);
            }
      }
    }, e._render_v_bar = function(a, n, _, r, l, o, t, i, s) {
      var c = a.id;
      t.indexOf("<div class=") == -1 && (t = e.templates["event_header_" + a.layer] ? e.templates["event_header_" + a.layer](a.start_date, a.end_date, a) : t), i.indexOf("<div class=") == -1 && (i = e.templates["event_text_" + a.layer] ? e.templates["event_text_" + a.layer](a.start_date, a.end_date, a) : i);
      var g = document.createElement("div"), y = "dhx_cal_event", m = e.templates["event_class_" + a.layer] ? e.templates["event_class_" + a.layer](a.start_date, a.end_date, a) : e.templates.event_class(a.start_date, a.end_date, a);
      m && (y = y + " " + m);
      var u = e._border_box_events(), p = r - 2, d = u ? p : r - 4, f = u ? p : r - 6, v = u ? p : r - 14, x = u ? p - 2 : r - 8, b = u ? l - this.xy.event_header_height : l - 30 + 1, w = '<div event_id="' + c + '" ' + e.config.event_attribute + '="' + c + '" class="' + y + '" style="position:absolute; top:' + _ + "px; left:" + n + "px; width:" + d + "px; height:" + l + "px;" + (o || "") + '">';
      return w += '<div class="dhx_header" style=" width:' + f + 'px;" >&nbsp;</div>', w += '<div class="dhx_title">' + t + "</div>", w += '<div class="dhx_body" style=" width:' + v + "px; height:" + b + 'px;">' + i + "</div>", w += '<div class="dhx_footer" style=" width:' + x + "px;" + (s ? " margin-top:-1px;" : "") + '" ></div></div>', g.innerHTML = w, g.style.zIndex = 100, g.firstChild;
    }, e.render_event_bar = function(a) {
      var n = this._els.dhx_cal_data[0], _ = this._colsS[a._sday], r = this._colsS[a._eday];
      r == _ && (r = this._colsS[a._eday + 1]);
      var l = this.xy.bar_height, o = this._colsS.heights[a._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + a._sorder * l, t = document.createElement("div"), i = a._timed ? "dhx_cal_event_clear" : "dhx_cal_event_line", s = e.templates["event_class_" + a.layer] ? e.templates["event_class_" + a.layer](a.start_date, a.end_date, a) : e.templates.event_class(a.start_date, a.end_date, a);
      s && (i = i + " " + s);
      var c = '<div event_id="' + a.id + '" ' + this.config.event_attribute + '="' + a.id + '" class="' + i + '" style="position:absolute; top:' + o + "px; left:" + _ + "px; width:" + (r - _ - 15) + "px;" + (a._text_style || "") + '">';
      a._timed && (c += e.templates["event_bar_date_" + a.layer] ? e.templates["event_bar_date_" + a.layer](a.start_date, a.end_date, a) : e.templates.event_bar_date(a.start_date, a.end_date, a)), c += e.templates["event_bar_text_" + a.layer] ? e.templates["event_bar_text_" + a.layer](a.start_date, a.end_date, a) : e.templates.event_bar_text(a.start_date, a.end_date, a) + "</div>)", c += "</div>", t.innerHTML = c, this._rendered.push(t.firstChild), n.appendChild(t.firstChild);
    }, e.render_event = function(a) {
      var n = e.xy.menu_width;
      if (e.getLayer(a.layer).noMenu && (n = 0), !(a._sday < 0)) {
        var _ = e.locate_holder(a._sday);
        if (_) {
          var r = 60 * a.start_date.getHours() + a.start_date.getMinutes(), l = 60 * a.end_date.getHours() + a.end_date.getMinutes() || 60 * e.config.last_hour, o = Math.round((60 * r * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px) + 1, t = Math.max(e.xy.min_event_height, (l - r) * this.config.hour_size_px / 60) + 1, i = Math.floor((_.clientWidth - n) / a._count), s = a._sorder * i + 1;
          a._inner || (i *= a._count - a._sorder);
          var c = this._render_v_bar(a.id, n + s, o, i, t, a._text_style, e.templates.event_header(a.start_date, a.end_date, a), e.templates.event_text(a.start_date, a.end_date, a));
          if (this._rendered.push(c), _.appendChild(c), s = s + parseInt(_.style.left, 10) + n, o += this._dy_shift, c.style.zIndex = this._layers_zindex[a.layer], this._edit_id == a.id) {
            c.style.zIndex = parseInt(c.style.zIndex) + 1;
            var g = c.style.zIndex;
            i = Math.max(i - 4, e.xy.editor_width), (c = document.createElement("div")).setAttribute("event_id", a.id), c.setAttribute(this.config.event_attribute, a.id), this.set_xy(c, i, t - 20, s, o + 14), c.className = "dhx_cal_editor", c.style.zIndex = g;
            var y = document.createElement("div");
            this.set_xy(y, i - 6, t - 26), y.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;", y.style.zIndex = g, c.appendChild(y), this._els.dhx_cal_data[0].appendChild(c), this._rendered.push(c), y.innerHTML = "<textarea class='dhx_cal_editor'>" + a.text + "</textarea>", this._editor = y.firstChild, this._editor.addEventListener("keypress", function(f) {
              if (f.shiftKey)
                return !0;
              var v = f.keyCode;
              v == e.keys.edit_save && e.editStop(!0), v == e.keys.edit_cancel && e.editStop(!1);
            }), this._editor.addEventListener("selectstart", function(f) {
              return f.cancelBubble = !0, !0;
            }), y.firstChild.focus(), this._els.dhx_cal_data[0].scrollLeft = 0, y.firstChild.select();
          }
          if (this._select_id == a.id) {
            c.style.zIndex = parseInt(c.style.zIndex) + 1;
            for (var m = this.config["icons_" + (this._edit_id == a.id ? "edit" : "select")], u = "", p = 0; p < m.length; p++)
              u += "<div class='dhx_menu_icon " + m[p] + "' title='" + this.locale.labels[m[p]] + "'></div>";
            var d = this._render_v_bar(a.id, s - n + 1, o, n, 20 * m.length + 26, "", "<div class='dhx_menu_head'></div>", u, !0);
            d.style.left = s - n + 1, d.style.zIndex = c.style.zIndex, this._els.dhx_cal_data[0].appendChild(d), this._rendered.push(d);
          }
        }
      }
    }, e.filter_agenda = function(a, n) {
      var _ = e.getLayer(n.layer);
      return _ && _.visible;
    };
  });
}, legacy: function(e) {
  (function() {
    H.dhtmlx || (H.dhtmlx = function(t) {
      for (var i in t)
        h[i] = t[i];
      return h;
    });
    let h = H.dhtmlx;
    function a(t, i, s, c) {
      return this.xmlDoc = "", this.async = s === void 0 || s, this.onloadAction = t || null, this.mainObject = i || null, this.waitCall = null, this.rSeed = c || !1, this;
    }
    function n() {
      return H.dhtmlDragAndDrop ? H.dhtmlDragAndDrop : (this.lastLanding = 0, this.dragNode = 0, this.dragStartNode = 0, this.dragStartObject = 0, this.tempDOMU = null, this.tempDOMM = null, this.waitDrag = 0, H.dhtmlDragAndDrop = this, this);
    }
    h.extend_api = function(t, i, s) {
      var c = H[t];
      c && (H[t] = function(g) {
        var y;
        if (g && typeof g == "object" && !g.tagName) {
          for (var m in y = c.apply(this, i._init ? i._init(g) : arguments), h)
            i[m] && this[i[m]](h[m]);
          for (var m in g)
            i[m] ? this[i[m]](g[m]) : m.indexOf("on") === 0 && this.attachEvent(m, g[m]);
        } else
          y = c.apply(this, arguments);
        return i._patch && i._patch(this), y || this;
      }, H[t].prototype = c.prototype, s && function(g, y) {
        for (var m in y)
          typeof y[m] == "function" && (g[m] = y[m]);
      }(H[t].prototype, s));
    }, H.dhtmlxAjax = { get: function(t, i) {
      var s = new a(!0);
      return s.async = arguments.length < 3, s.waitCall = i, s.loadXML(t), s;
    }, post: function(t, i, s) {
      var c = new a(!0);
      return c.async = arguments.length < 4, c.waitCall = s, c.loadXML(t, !0, i), c;
    }, getSync: function(t) {
      return this.get(t, null, !0);
    }, postSync: function(t, i) {
      return this.post(t, i, null, !0);
    } }, H.dtmlXMLLoaderObject = a, a.count = 0, a.prototype.waitLoadFunction = function(t) {
      var i = !0;
      return this.check = function() {
        if (t && t.onloadAction && (!t.xmlDoc.readyState || t.xmlDoc.readyState == 4)) {
          if (!i)
            return;
          i = !1, a.count++, typeof t.onloadAction == "function" && t.onloadAction(t.mainObject, null, null, null, t), t.waitCall && (t.waitCall.call(this, t), t.waitCall = null);
        }
      }, this.check;
    }, a.prototype.getXMLTopNode = function(t, i) {
      var s;
      if (this.xmlDoc.responseXML) {
        if ((c = this.xmlDoc.responseXML.getElementsByTagName(t)).length === 0 && t.indexOf(":") != -1)
          var c = this.xmlDoc.responseXML.getElementsByTagName(t.split(":")[1]);
        s = c[0];
      } else
        s = this.xmlDoc.documentElement;
      return s ? (this._retry = !1, s) : !this._retry && r ? (this._retry = !0, i = this.xmlDoc, this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/, ""), !0), this.getXMLTopNode(t, i)) : (dhtmlxError.throwError("LoadXML", "Incorrect XML", [i || this.xmlDoc, this.mainObject]), document.createElement("div"));
    }, a.prototype.loadXMLString = function(t, i) {
      if (r)
        this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), this.xmlDoc.async = this.async, this.xmlDoc.onreadystatechange = function() {
        }, this.xmlDoc.loadXML(t);
      else {
        var s = new DOMParser();
        this.xmlDoc = s.parseFromString(t, "text/xml");
      }
      i || (this.onloadAction && this.onloadAction(this.mainObject, null, null, null, this), this.waitCall && (this.waitCall(), this.waitCall = null));
    }, a.prototype.loadXML = function(t, i, s, c) {
      this.rSeed && (t += (t.indexOf("?") != -1 ? "&" : "?") + "a_dhx_rSeed=" + (/* @__PURE__ */ new Date()).valueOf()), this.filePath = t, !r && H.XMLHttpRequest ? this.xmlDoc = new XMLHttpRequest() : this.xmlDoc = new ActiveXObject("Microsoft.XMLHTTP"), this.async && (this.xmlDoc.onreadystatechange = new this.waitLoadFunction(this)), typeof i == "string" ? this.xmlDoc.open(i, t, this.async) : this.xmlDoc.open(i ? "POST" : "GET", t, this.async), c ? (this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 (" + navigator.userAgent + ")"), this.xmlDoc.setRequestHeader("Content-type", "text/xml")) : i && this.xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), this.xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xmlDoc.send(s), this.async || new this.waitLoadFunction(this)();
    }, a.prototype.destructor = function() {
      return this._filterXPath = null, this._getAllNamedChilds = null, this._retry = null, this.async = null, this.rSeed = null, this.filePath = null, this.onloadAction = null, this.mainObject = null, this.xmlDoc = null, this.doXPath = null, this.doXPathOpera = null, this.doXSLTransToObject = null, this.doXSLTransToString = null, this.loadXML = null, this.loadXMLString = null, this.doSerialization = null, this.xmlNodeToJSON = null, this.getXMLTopNode = null, this.setXSLParamValue = null, null;
    }, a.prototype.xmlNodeToJSON = function(t) {
      for (var i = {}, s = 0; s < t.attributes.length; s++)
        i[t.attributes[s].name] = t.attributes[s].value;
      for (i._tagvalue = t.firstChild ? t.firstChild.nodeValue : "", s = 0; s < t.childNodes.length; s++) {
        var c = t.childNodes[s].tagName;
        c && (i[c] || (i[c] = []), i[c].push(this.xmlNodeToJSON(t.childNodes[s])));
      }
      return i;
    }, H.dhtmlDragAndDropObject = n, n.prototype.removeDraggableItem = function(t) {
      t.onmousedown = null, t.dragStarter = null, t.dragLanding = null;
    }, n.prototype.addDraggableItem = function(t, i) {
      t.onmousedown = this.preCreateDragCopy, t.dragStarter = i, this.addDragLanding(t, i);
    }, n.prototype.addDragLanding = function(t, i) {
      t.dragLanding = i;
    }, n.prototype.preCreateDragCopy = function(t) {
      if (!t && !H.event || (t || event).button != 2)
        return H.dhtmlDragAndDrop.waitDrag ? (H.dhtmlDragAndDrop.waitDrag = 0, document.body.onmouseup = H.dhtmlDragAndDrop.tempDOMU, document.body.onmousemove = H.dhtmlDragAndDrop.tempDOMM, !1) : (H.dhtmlDragAndDrop.dragNode && H.dhtmlDragAndDrop.stopDrag(t), H.dhtmlDragAndDrop.waitDrag = 1, H.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup, H.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove, H.dhtmlDragAndDrop.dragStartNode = this, H.dhtmlDragAndDrop.dragStartObject = this.dragStarter, document.body.onmouseup = H.dhtmlDragAndDrop.preCreateDragCopy, document.body.onmousemove = H.dhtmlDragAndDrop.callDrag, H.dhtmlDragAndDrop.downtime = (/* @__PURE__ */ new Date()).valueOf(), !(!t || !t.preventDefault || (t.preventDefault(), 1)));
    }, n.prototype.callDrag = function(t) {
      t || (t = H.event);
      var i = H.dhtmlDragAndDrop;
      if (!((/* @__PURE__ */ new Date()).valueOf() - i.downtime < 100)) {
        if (!i.dragNode) {
          if (!i.waitDrag)
            return i.stopDrag(t, !0);
          if (i.dragNode = i.dragStartObject._createDragNode(i.dragStartNode, t), !i.dragNode)
            return i.stopDrag();
          i.dragNode.onselectstart = function() {
            return !1;
          }, i.gldragNode = i.dragNode, document.body.appendChild(i.dragNode), document.body.onmouseup = i.stopDrag, i.waitDrag = 0, i.dragNode.pWindow = H, i.initFrameRoute();
        }
        if (i.dragNode.parentNode != H.document.body && i.gldragNode) {
          var s = i.gldragNode;
          i.gldragNode.old && (s = i.gldragNode.old), s.parentNode.removeChild(s);
          var c = i.dragNode.pWindow;
          if (s.pWindow && s.pWindow.dhtmlDragAndDrop.lastLanding && s.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(s.pWindow.dhtmlDragAndDrop.lastLanding), r) {
            var g = document.createElement("div");
            g.innerHTML = i.dragNode.outerHTML, i.dragNode = g.childNodes[0];
          } else
            i.dragNode = i.dragNode.cloneNode(!0);
          i.dragNode.pWindow = H, i.gldragNode.old = i.dragNode, document.body.appendChild(i.dragNode), c.dhtmlDragAndDrop.dragNode = i.dragNode;
        }
        var y;
        i.dragNode.style.left = t.clientX + 15 + (i.fx ? -1 * i.fx : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px", i.dragNode.style.top = t.clientY + 3 + (i.fy ? -1 * i.fy : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px", y = t.srcElement ? t.srcElement : t.target, i.checkLanding(y, t);
      }
    }, n.prototype.calculateFramePosition = function(t) {
      if (H.name) {
        for (var i = parent.frames[H.name].frameElement.offsetParent, s = 0, c = 0; i; )
          s += i.offsetLeft, c += i.offsetTop, i = i.offsetParent;
        if (parent.dhtmlDragAndDrop) {
          var g = parent.dhtmlDragAndDrop.calculateFramePosition(1);
          s += 1 * g.split("_")[0], c += 1 * g.split("_")[1];
        }
        if (t)
          return s + "_" + c;
        this.fx = s, this.fy = c;
      }
      return "0_0";
    }, n.prototype.checkLanding = function(t, i) {
      t && t.dragLanding ? (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding), this.lastLanding = t, this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, i.clientX, i.clientY, i), this.lastLanding_scr = r ? i.srcElement : i.target) : t && t.tagName != "BODY" ? this.checkLanding(t.parentNode, i) : (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding, i.clientX, i.clientY, i), this.lastLanding = 0, this._onNotFound && this._onNotFound());
    }, n.prototype.stopDrag = function(t, i) {
      var s = H.dhtmlDragAndDrop;
      if (!i) {
        s.stopFrameRoute();
        var c = s.lastLanding;
        s.lastLanding = null, c && c.dragLanding._drag(s.dragStartNode, s.dragStartObject, c, r ? event.srcElement : t.target);
      }
      s.lastLanding = null, s.dragNode && s.dragNode.parentNode == document.body && s.dragNode.parentNode.removeChild(s.dragNode), s.dragNode = 0, s.gldragNode = 0, s.fx = 0, s.fy = 0, s.dragStartNode = 0, s.dragStartObject = 0, document.body.onmouseup = s.tempDOMU, document.body.onmousemove = s.tempDOMM, s.tempDOMU = null, s.tempDOMM = null, s.waitDrag = 0;
    }, n.prototype.stopFrameRoute = function(t) {
      t && H.dhtmlDragAndDrop.stopDrag(1, 1);
      for (var i = 0; i < H.frames.length; i++)
        try {
          H.frames[i] != t && H.frames[i].dhtmlDragAndDrop && H.frames[i].dhtmlDragAndDrop.stopFrameRoute(H);
        } catch {
        }
      try {
        parent.dhtmlDragAndDrop && parent != H && parent != t && parent.dhtmlDragAndDrop.stopFrameRoute(H);
      } catch {
      }
    }, n.prototype.initFrameRoute = function(t, i) {
      t && (H.dhtmlDragAndDrop.preCreateDragCopy(), H.dhtmlDragAndDrop.dragStartNode = t.dhtmlDragAndDrop.dragStartNode, H.dhtmlDragAndDrop.dragStartObject = t.dhtmlDragAndDrop.dragStartObject, H.dhtmlDragAndDrop.dragNode = t.dhtmlDragAndDrop.dragNode, H.dhtmlDragAndDrop.gldragNode = t.dhtmlDragAndDrop.dragNode, H.document.body.onmouseup = H.dhtmlDragAndDrop.stopDrag, H.waitDrag = 0, !r && i && (!_ || o < 1.8) && H.dhtmlDragAndDrop.calculateFramePosition());
      try {
        parent.dhtmlDragAndDrop && parent != H && parent != t && parent.dhtmlDragAndDrop.initFrameRoute(H);
      } catch {
      }
      for (var s = 0; s < H.frames.length; s++)
        try {
          H.frames[s] != t && H.frames[s].dhtmlDragAndDrop && H.frames[s].dhtmlDragAndDrop.initFrameRoute(H, !t || i ? 1 : 0);
        } catch {
        }
    };
    var _ = !1, r = !1, l = !1, o = !1;
    navigator.userAgent.indexOf("Macintosh"), navigator.userAgent.toLowerCase().indexOf("chrome"), navigator.userAgent.indexOf("Safari") != -1 || navigator.userAgent.indexOf("Konqueror") != -1 ? parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5)) > 525 ? (_ = !0, o = 1.9) : l = !0 : navigator.userAgent.indexOf("Opera") != -1 ? parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3)) : navigator.appName.indexOf("Microsoft") != -1 ? (r = !0, navigator.appVersion.indexOf("MSIE 8.0") == -1 && navigator.appVersion.indexOf("MSIE 9.0") == -1 && navigator.appVersion.indexOf("MSIE 10.0") == -1 || document.compatMode == "BackCompat" || (r = 8)) : navigator.appName == "Netscape" && navigator.userAgent.indexOf("Trident") != -1 ? r = 8 : (_ = !0, o = parseFloat(navigator.userAgent.split("rv:")[1])), a.prototype.doXPath = function(t, i, s, c) {
      if (l || !r && !H.XPathResult)
        return this.doXPathOpera(t, i);
      if (r)
        return i || (i = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), i || dhtmlxError.throwError("LoadXML", "Incorrect XML", [i || this.xmlDoc, this.mainObject]), s && i.setProperty("SelectionNamespaces", "xmlns:xsl='" + s + "'"), c == "single" ? i.selectSingleNode(t) : i.selectNodes(t) || new Array(0);
      var g = i;
      i || (i = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), i || dhtmlxError.throwError("LoadXML", "Incorrect XML", [i || this.xmlDoc, this.mainObject]), i.nodeName.indexOf("document") != -1 ? g = i : (g = i, i = i.ownerDocument);
      var y = XPathResult.ANY_TYPE;
      c == "single" && (y = XPathResult.FIRST_ORDERED_NODE_TYPE);
      var m = [], u = i.evaluate(t, g, function(d) {
        return s;
      }, y, null);
      if (y == XPathResult.FIRST_ORDERED_NODE_TYPE)
        return u.singleNodeValue;
      for (var p = u.iterateNext(); p; )
        m[m.length] = p, p = u.iterateNext();
      return m;
    }, H.dhtmlxError = new Ae(), a.prototype.doXPathOpera = function(t, i) {
      var s = t.replace(/[\/]+/gi, "/").split("/"), c = null, g = 1;
      if (!s.length)
        return [];
      if (s[0] == ".")
        c = [i];
      else {
        if (s[0] !== "")
          return [];
        c = (this.xmlDoc.responseXML || this.xmlDoc).getElementsByTagName(s[g].replace(/\[[^\]]*\]/g, "")), g++;
      }
      for (; g < s.length; g++)
        c = this._getAllNamedChilds(c, s[g]);
      return s[g - 1].indexOf("[") != -1 && (c = this._filterXPath(c, s[g - 1])), c;
    }, a.prototype._filterXPath = function(t, i) {
      for (var s = [], c = (i = i.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, ""), 0); c < t.length; c++)
        t[c].getAttribute(i) && (s[s.length] = t[c]);
      return s;
    }, a.prototype._getAllNamedChilds = function(t, i) {
      var s = [];
      l && (i = i.toUpperCase());
      for (var c = 0; c < t.length; c++)
        for (var g = 0; g < t[c].childNodes.length; g++)
          l ? t[c].childNodes[g].tagName && t[c].childNodes[g].tagName.toUpperCase() == i && (s[s.length] = t[c].childNodes[g]) : t[c].childNodes[g].tagName == i && (s[s.length] = t[c].childNodes[g]);
      return s;
    }, H.dhtmlxEvent === void 0 && (H.dhtmlxEvent = function(t, i, s) {
      t.addEventListener ? t.addEventListener(i, s, !1) : t.attachEvent && t.attachEvent("on" + i, s);
    }), a.prototype.xslDoc = null, a.prototype.setXSLParamValue = function(t, i, s) {
      s || (s = this.xslDoc), s.responseXML && (s = s.responseXML);
      var c = this.doXPath("/xsl:stylesheet/xsl:variable[@name='" + t + "']", s, "http://www.w3.org/1999/XSL/Transform", "single");
      c && (c.firstChild.nodeValue = i);
    }, a.prototype.doXSLTransToObject = function(t, i) {
      var s;
      if (t || (t = this.xslDoc), t.responseXML && (t = t.responseXML), i || (i = this.xmlDoc), i.responseXML && (i = i.responseXML), r) {
        s = new ActiveXObject("Msxml2.DOMDocument.3.0");
        try {
          i.transformNodeToObject(t, s);
        } catch {
          s = i.transformNode(t);
        }
      } else
        this.XSLProcessor || (this.XSLProcessor = new XSLTProcessor(), this.XSLProcessor.importStylesheet(t)), s = this.XSLProcessor.transformToDocument(i);
      return s;
    }, a.prototype.doXSLTransToString = function(t, i) {
      var s = this.doXSLTransToObject(t, i);
      return typeof s == "string" ? s : this.doSerialization(s);
    }, a.prototype.doSerialization = function(t) {
      return t || (t = this.xmlDoc), t.responseXML && (t = t.responseXML), r ? t.xml : new XMLSerializer().serializeToString(t);
    }, H.dhtmlxEventable = function(t) {
      t.attachEvent = function(i, s, c) {
        return this[i = "ev_" + i.toLowerCase()] || (this[i] = new this.eventCatcher(c || this)), i + ":" + this[i].addEvent(s);
      }, t.callEvent = function(i, s) {
        return !this[i = "ev_" + i.toLowerCase()] || this[i].apply(this, s);
      }, t.checkEvent = function(i) {
        return !!this["ev_" + i.toLowerCase()];
      }, t.eventCatcher = function(i) {
        var s = [], c = function() {
          for (var g = !0, y = 0; y < s.length; y++)
            if (s[y]) {
              var m = s[y].apply(i, arguments);
              g = g && m;
            }
          return g;
        };
        return c.addEvent = function(g) {
          if (typeof g != "function")
            throw new Error(`Invalid argument addEvent(${g})`);
          return !!g && s.push(g) - 1;
        }, c.removeEvent = function(g) {
          s[g] = null;
        }, c;
      }, t.detachEvent = function(i) {
        if (i) {
          var s = i.split(":");
          this[s[0]].removeEvent(s[1]);
        }
      }, t.detachAllEvents = function() {
        for (var i in this)
          i.indexOf("ev_") === 0 && (this.detachEvent(i), this[i] = null);
      }, t = null;
    };
  })();
}, limit: function(e) {
  e.config.limit_start = null, e.config.limit_end = null, e.config.limit_view = !1, e.config.check_limits = !0, e.config.mark_now = !0, e.config.display_marked_timespans = !0, e.config.overwrite_marked_timespans = !0, e._temp_limit_scope = function() {
    var h = null, a = "dhx_time_block", n = "default", _ = function(o, t, i) {
      var s = typeof o == "object" ? o : { days: o };
      return s.type = a, s.css = "", t && (i && (s.sections = i), s = function(c, g, y) {
        return g instanceof Date && y instanceof Date ? (c.start_date = g, c.end_date = y) : (c.days = g, c.zones = y), c;
      }(s, o, t)), s;
    };
    e.blockTime = function(o, t, i) {
      var s = _(o, t, i);
      return e.addMarkedTimespan(s);
    }, e.unblockTime = function(o, t, i) {
      var s = _(o, t = t || "fullday", i);
      return e.deleteMarkedTimespan(s);
    }, e.attachEvent("onBeforeViewChange", function(o, t, i, s) {
      function c(g, y) {
        var m = e.config.limit_start, u = e.config.limit_end, p = e.date.add(g, 1, y);
        return g.valueOf() > u.valueOf() || p <= m.valueOf();
      }
      return !e.config.limit_view || !c(s = s || t, i = i || o) || t.valueOf() == s.valueOf() || (setTimeout(function() {
        if (e.$destroyed)
          return !0;
        var g = c(t, i) ? e.config.limit_start : t;
        e.setCurrentView(c(g, i) ? null : g, i);
      }, 1), !1);
    }), e.checkInMarkedTimespan = function(o, t, i) {
      t = t || n;
      for (var s = !0, c = new Date(o.start_date.valueOf()), g = e.date.add(c, 1, "day"), y = e._marked_timespans; c < o.end_date; c = e.date.date_part(g), g = e.date.add(c, 1, "day")) {
        var m = +e.date.date_part(new Date(c)), u = l(o, y, c.getDay(), m, t);
        if (u)
          for (var p = 0; p < u.length; p += 2) {
            var d = e._get_zone_minutes(c), f = o.end_date > g || o.end_date.getDate() != c.getDate() ? 1440 : e._get_zone_minutes(o.end_date), v = u[p], x = u[p + 1];
            if (v < f && x > d && !(s = typeof i == "function" && i(o, d, f, v, x)))
              break;
          }
      }
      return !s;
    };
    var r = e.checkLimitViolation = function(o) {
      if (!o || !e.config.check_limits)
        return !0;
      var t = e, i = t.config, s = [];
      if (o.rec_type)
        for (var c = e.getRecDates(o), g = 0; g < c.length; g++) {
          var y = e._copy_event(o);
          e._lame_copy(y, c[g]), s.push(y);
        }
      else
        s = [o];
      for (var m = !0, u = 0; u < s.length; u++) {
        var p = !0;
        (y = s[u])._timed = e.isOneDayEvent(y), (p = !i.limit_start || !i.limit_end || y.start_date.valueOf() >= i.limit_start.valueOf() && y.end_date.valueOf() <= i.limit_end.valueOf()) && (p = !e.checkInMarkedTimespan(y, a, function(d, f, v, x, b) {
          var w = !0;
          return f <= b && f >= x && ((b == 1440 || v <= b) && (w = !1), d._timed && t._drag_id && t._drag_mode == "new-size" ? (d.start_date.setHours(0), d.start_date.setMinutes(b)) : w = !1), (v >= x && v <= b || f < x && v > b) && (d._timed && t._drag_id && t._drag_mode == "new-size" ? (d.end_date.setHours(0), d.end_date.setMinutes(x)) : w = !1), w;
        })), p || (p = t.checkEvent("onLimitViolation") ? t.callEvent("onLimitViolation", [y.id, y]) : p), m = m && p;
      }
      return m || (t._drag_id = null, t._drag_mode = null), m;
    };
    function l(o, t, i, s, c) {
      var g = e, y = [], m = { _props: "map_to", matrix: "y_property" };
      for (var u in m) {
        var p = m[u];
        if (g[u])
          for (var d in g[u]) {
            var f = g[u][d][p];
            o[f] && (y = g._add_timespan_zones(y, e._get_blocked_zones(t[d], o[f], i, s, c)));
          }
      }
      return y = g._add_timespan_zones(y, e._get_blocked_zones(t, "global", i, s, c));
    }
    e._get_blocked_zones = function(o, t, i, s, c) {
      var g = [];
      if (o && o[t])
        for (var y = o[t], m = this._get_relevant_blocked_zones(i, s, y, c), u = 0; u < m.length; u++)
          g = this._add_timespan_zones(g, m[u].zones);
      return g;
    }, e._get_relevant_blocked_zones = function(o, t, i, s) {
      var c;
      return e.config.overwrite_marked_timespans ? c = i[t] && i[t][s] ? i[t][s] : i[o] && i[o][s] ? i[o][s] : [] : (c = [], i[t] && i[t][s] && (c = c.concat(i[t][s])), i[o] && i[o][s] && (c = c.concat(i[o][s]))), c;
    }, e.attachEvent("onMouseDown", function(o) {
      return o != a;
    }), e.attachEvent("onBeforeDrag", function(o) {
      return !o || r(e.getEvent(o));
    }), e.attachEvent("onClick", function(o, t) {
      return r(e.getEvent(o));
    }), e.attachEvent("onBeforeLightbox", function(o) {
      var t = e.getEvent(o);
      return h = [t.start_date, t.end_date], r(t);
    }), e.attachEvent("onEventSave", function(o, t, i) {
      if (!t.start_date || !t.end_date) {
        var s = e.getEvent(o);
        t.start_date = new Date(s.start_date), t.end_date = new Date(s.end_date);
      }
      if (t.rec_type) {
        var c = e._lame_clone(t);
        return e._roll_back_dates(c), r(c);
      }
      return r(t);
    }), e.attachEvent("onEventAdded", function(o) {
      if (!o)
        return !0;
      var t = e.getEvent(o);
      return !r(t) && e.config.limit_start && e.config.limit_end && (t.start_date < e.config.limit_start && (t.start_date = new Date(e.config.limit_start)), t.start_date.valueOf() >= e.config.limit_end.valueOf() && (t.start_date = this.date.add(e.config.limit_end, -1, "day")), t.end_date < e.config.limit_start && (t.end_date = new Date(e.config.limit_start)), t.end_date.valueOf() >= e.config.limit_end.valueOf() && (t.end_date = this.date.add(e.config.limit_end, -1, "day")), t.start_date.valueOf() >= t.end_date.valueOf() && (t.end_date = this.date.add(t.start_date, this.config.event_duration || this.config.time_step, "minute")), t._timed = this.isOneDayEvent(t)), !0;
    }), e.attachEvent("onEventChanged", function(o) {
      if (!o)
        return !0;
      var t = e.getEvent(o);
      if (!r(t)) {
        if (!h)
          return !1;
        t.start_date = h[0], t.end_date = h[1], t._timed = this.isOneDayEvent(t);
      }
      return !0;
    }), e.attachEvent("onBeforeEventChanged", function(o, t, i) {
      return r(o);
    }), e.attachEvent("onBeforeEventCreated", function(o) {
      var t = e.getActionData(o).date, i = { _timed: !0, start_date: t, end_date: e.date.add(t, e.config.time_step, "minute") };
      return r(i);
    }), e.attachEvent("onViewChange", function() {
      e._mark_now();
    }), e.attachEvent("onAfterSchedulerResize", function() {
      return window.setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e._mark_now();
      }, 1), !0;
    }), e.attachEvent("onTemplatesReady", function() {
      e._mark_now_timer = window.setInterval(function() {
        e._is_initialized() && e._mark_now();
      }, 6e4);
    }), e.attachEvent("onDestroy", function() {
      clearInterval(e._mark_now_timer);
    }), e._mark_now = function(o) {
      var t = "dhx_now_time";
      this._els[t] || (this._els[t] = []);
      var i = e._currentDate(), s = this.config;
      if (e._remove_mark_now(), !o && s.mark_now && i < this._max_date && i > this._min_date && i.getHours() >= s.first_hour && i.getHours() < s.last_hour) {
        var c = this.locate_holder_day(i);
        this._els[t] = e._append_mark_now(c, i);
      }
    }, e._append_mark_now = function(o, t) {
      var i = "dhx_now_time", s = e._get_zone_minutes(t), c = { zones: [s, s + 1], css: i, type: i };
      if (!this._table_view) {
        if (this._props && this._props[this._mode]) {
          var g, y, m = this._props[this._mode], u = m.size || m.options.length;
          m.days > 1 ? (m.size && m.options.length && (o = (m.position + o) / m.options.length * m.size), g = o, y = o + u) : y = (g = 0) + u;
          for (var p = [], d = g; d < y; d++) {
            var f = d;
            c.days = f;
            var v = e._render_marked_timespan(c, null, f)[0];
            p.push(v);
          }
          return p;
        }
        return c.days = o, e._render_marked_timespan(c, null, o);
      }
      if (this._mode == "month")
        return c.days = +e.date.date_part(t), e._render_marked_timespan(c, null, null);
    }, e._remove_mark_now = function() {
      for (var o = "dhx_now_time", t = this._els[o], i = 0; i < t.length; i++) {
        var s = t[i], c = s.parentNode;
        c && c.removeChild(s);
      }
      this._els[o] = [];
    }, e._marked_timespans = { global: {} }, e._get_zone_minutes = function(o) {
      return 60 * o.getHours() + o.getMinutes();
    }, e._prepare_timespan_options = function(o) {
      var t = [], i = [];
      if (o.days == "fullweek" && (o.days = [0, 1, 2, 3, 4, 5, 6]), o.days instanceof Array) {
        for (var s = o.days.slice(), c = 0; c < s.length; c++) {
          var g = e._lame_clone(o);
          g.days = s[c], t.push.apply(t, e._prepare_timespan_options(g));
        }
        return t;
      }
      if (!o || !(o.start_date && o.end_date && o.end_date > o.start_date || o.days !== void 0 && o.zones) && !o.type)
        return t;
      o.zones == "fullday" && (o.zones = [0, 1440]), o.zones && o.invert_zones && (o.zones = e.invertZones(o.zones)), o.id = e.uid(), o.css = o.css || "", o.type = o.type || n;
      var y = o.sections;
      if (y) {
        for (var m in y)
          if (y.hasOwnProperty(m)) {
            var u = y[m];
            for (u instanceof Array || (u = [u]), c = 0; c < u.length; c++)
              (w = e._lame_copy({}, o)).sections = {}, w.sections[m] = u[c], i.push(w);
          }
      } else
        i.push(o);
      for (var p = 0; p < i.length; p++) {
        var d = i[p], f = d.start_date, v = d.end_date;
        if (f && v)
          for (var x = e.date.date_part(new Date(f)), b = e.date.add(x, 1, "day"); x < v; ) {
            var w;
            delete (w = e._lame_copy({}, d)).start_date, delete w.end_date, w.days = x.valueOf();
            var k = f > x ? e._get_zone_minutes(f) : 0, E = v > b || v.getDate() != x.getDate() ? 1440 : e._get_zone_minutes(v);
            w.zones = [k, E], t.push(w), x = b, b = e.date.add(b, 1, "day");
          }
        else
          d.days instanceof Date && (d.days = e.date.date_part(d.days).valueOf()), d.zones = o.zones.slice(), t.push(d);
      }
      return t;
    }, e._get_dates_by_index = function(o, t, i) {
      var s = [];
      t = e.date.date_part(new Date(t || e._min_date)), i = new Date(i || e._max_date);
      for (var c = t.getDay(), g = o - c >= 0 ? o - c : 7 - t.getDay() + o, y = e.date.add(t, g, "day"); y < i; y = e.date.add(y, 1, "week"))
        s.push(y);
      return s;
    }, e._get_css_classes_by_config = function(o) {
      var t = [];
      return o.type == a && (t.push(a), o.css && t.push(a + "_reset")), t.push("dhx_marked_timespan", o.css), t.join(" ");
    }, e._get_block_by_config = function(o) {
      var t = document.createElement("div");
      return o.html && (typeof o.html == "string" ? t.innerHTML = o.html : t.appendChild(o.html)), t;
    }, e._render_marked_timespan = function(o, t, i) {
      var s = [], c = e.config, g = this._min_date, y = this._max_date, m = !1;
      if (!c.display_marked_timespans)
        return s;
      if (!i && i !== 0) {
        if (o.days < 7)
          i = o.days;
        else {
          var u = new Date(o.days);
          if (m = +u, !(+y > +u && +g <= +u))
            return s;
          i = u.getDay();
        }
        var p = g.getDay();
        p > i ? i = 7 - (p - i) : i -= p;
      }
      var d = o.zones, f = e._get_css_classes_by_config(o);
      if (e._table_view && e._mode == "month") {
        var v = [], x = [];
        if (t)
          v.push(t), x.push(i);
        else {
          x = m ? [m] : e._get_dates_by_index(i);
          for (var b = 0; b < x.length; b++)
            v.push(this._scales[x[b]]);
        }
        for (b = 0; b < v.length; b++) {
          t = v[b], i = x[b];
          var w = this.locate_holder_day(i, !1) % this._cols.length;
          if (!this._ignores[w]) {
            var k = e._get_block_by_config(o);
            k.className = f, k.style.top = "0px", k.style.height = "100%";
            for (var E = 0; E < d.length; E += 2) {
              var D = d[b];
              if ((A = d[b + 1]) <= D)
                return [];
              (C = k.cloneNode(!0)).style.left = "0px", C.style.width = "100%", t.appendChild(C), s.push(C);
            }
          }
        }
      } else {
        var S = i;
        if (this._ignores[this.locate_holder_day(i, !1)])
          return s;
        if (this._props && this._props[this._mode] && o.sections && o.sections[this._mode]) {
          var N = this._props[this._mode];
          S = N.order[o.sections[this._mode]];
          var M = N.order[o.sections[this._mode]];
          N.days > 1 ? S = S * (N.size || N.options.length) + M : (S = M, N.size && S > N.position + N.size && (S = 0));
        }
        for (t = t || e.locate_holder(S), b = 0; b < d.length; b += 2) {
          var A, C;
          if (D = Math.max(d[b], 60 * c.first_hour), (A = Math.min(d[b + 1], 60 * c.last_hour)) <= D) {
            if (b + 2 < d.length)
              continue;
            return [];
          }
          (C = e._get_block_by_config(o)).className = f;
          var T = 24 * this.config.hour_size_px + 1, O = 36e5;
          C.style.top = Math.round((60 * D * 1e3 - this.config.first_hour * O) * this.config.hour_size_px / O) % T + "px", C.style.height = Math.max(Math.round(60 * (A - D) * 1e3 * this.config.hour_size_px / O) % T, 1) + "px", t.appendChild(C), s.push(C);
        }
      }
      return s;
    }, e._mark_timespans = function() {
      var o = this._els.dhx_cal_data[0], t = [];
      if (e._table_view && e._mode == "month")
        for (var i in this._scales) {
          var s = /* @__PURE__ */ new Date(+i);
          t.push.apply(t, e._on_scale_add_marker(this._scales[i], s));
        }
      else {
        s = new Date(e._min_date);
        for (var c = 0, g = o.childNodes.length; c < g; c++) {
          var y = o.childNodes[c];
          y.firstChild && e._getClassName(y.firstChild).indexOf("dhx_scale_hour") > -1 || (t.push.apply(t, e._on_scale_add_marker(y, s)), s = e.date.add(s, 1, "day"));
        }
      }
      return t;
    }, e.markTimespan = function(o) {
      if (!this._els)
        throw new Error("`scheduler.markTimespan` can't be used before scheduler initialization. Place `scheduler.markTimespan` call after `scheduler.init`.");
      var t = !1;
      this._els.dhx_cal_data || (e.get_elements(), t = !0);
      var i = e._marked_timespans_ids, s = e._marked_timespans_types, c = e._marked_timespans;
      e.deleteMarkedTimespan(), e.addMarkedTimespan(o);
      var g = e._mark_timespans();
      return t && (e._els = []), e._marked_timespans_ids = i, e._marked_timespans_types = s, e._marked_timespans = c, g;
    }, e.unmarkTimespan = function(o) {
      if (o)
        for (var t = 0; t < o.length; t++) {
          var i = o[t];
          i.parentNode && i.parentNode.removeChild(i);
        }
    }, e._addMarkerTimespanConfig = function(o) {
      var t = "global", i = e._marked_timespans, s = o.id, c = e._marked_timespans_ids;
      c[s] || (c[s] = []);
      var g = o.days, y = o.sections, m = o.type;
      if (o.id = s, y) {
        for (var u in y)
          if (y.hasOwnProperty(u)) {
            i[u] || (i[u] = {});
            var p = y[u], d = i[u];
            d[p] || (d[p] = {}), d[p][g] || (d[p][g] = {}), d[p][g][m] || (d[p][g][m] = [], e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[m] || (e._marked_timespans_types[m] = !0));
            var f = d[p][g][m];
            o._array = f, f.push(o), c[s].push(o);
          }
      } else
        i[t][g] || (i[t][g] = {}), i[t][g][m] || (i[t][g][m] = []), e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[m] || (e._marked_timespans_types[m] = !0), f = i[t][g][m], o._array = f, f.push(o), c[s].push(o);
    }, e._marked_timespans_ids = {}, e.addMarkedTimespan = function(o) {
      var t = e._prepare_timespan_options(o);
      if (t.length) {
        for (var i = t[0].id, s = 0; s < t.length; s++)
          e._addMarkerTimespanConfig(t[s]);
        return i;
      }
    }, e._add_timespan_zones = function(o, t) {
      var i = o.slice();
      if (t = t.slice(), !i.length)
        return t;
      for (var s = 0; s < i.length; s += 2)
        for (var c = i[s], g = i[s + 1], y = s + 2 == i.length, m = 0; m < t.length; m += 2) {
          var u = t[m], p = t[m + 1];
          if (p > g && u <= g || u < c && p >= c)
            i[s] = Math.min(c, u), i[s + 1] = Math.max(g, p), s -= 2;
          else {
            if (!y)
              continue;
            var d = c > u ? 0 : 2;
            i.splice(s + d, 0, u, p);
          }
          t.splice(m--, 2);
          break;
        }
      return i;
    }, e._subtract_timespan_zones = function(o, t) {
      for (var i = o.slice(), s = 0; s < i.length; s += 2)
        for (var c = i[s], g = i[s + 1], y = 0; y < t.length; y += 2) {
          var m = t[y], u = t[y + 1];
          if (u > c && m < g) {
            var p = !1;
            c >= m && g <= u && i.splice(s, 2), c < m && (i.splice(s, 2, c, m), p = !0), g > u && i.splice(p ? s + 2 : s, p ? 0 : 2, u, g), s -= 2;
            break;
          }
        }
      return i;
    }, e.invertZones = function(o) {
      return e._subtract_timespan_zones([0, 1440], o.slice());
    }, e._delete_marked_timespan_by_id = function(o) {
      var t = e._marked_timespans_ids[o];
      if (t) {
        for (var i = 0; i < t.length; i++)
          for (var s = t[i], c = s._array, g = 0; g < c.length; g++)
            if (c[g] == s) {
              c.splice(g, 1);
              break;
            }
      }
    }, e._delete_marked_timespan_by_config = function(o) {
      var t, i = e._marked_timespans, s = o.sections, c = o.days, g = o.type || n;
      if (s) {
        for (var y in s)
          if (s.hasOwnProperty(y) && i[y]) {
            var m = s[y];
            i[y][m] && (t = i[y][m]);
          }
      } else
        t = i.global;
      if (t) {
        if (c !== void 0)
          t[c] && t[c][g] && (e._addMarkerTimespanConfig(o), e._delete_marked_timespans_list(t[c][g], o));
        else
          for (var u in t)
            if (t[u][g]) {
              var p = e._lame_clone(o);
              o.days = u, e._addMarkerTimespanConfig(p), e._delete_marked_timespans_list(t[u][g], o);
            }
      }
    }, e._delete_marked_timespans_list = function(o, t) {
      for (var i = 0; i < o.length; i++) {
        var s = o[i], c = e._subtract_timespan_zones(s.zones, t.zones);
        if (c.length)
          s.zones = c;
        else {
          o.splice(i, 1), i--;
          for (var g = e._marked_timespans_ids[s.id], y = 0; y < g.length; y++)
            if (g[y] == s) {
              g.splice(y, 1);
              break;
            }
        }
      }
    }, e.deleteMarkedTimespan = function(o) {
      if (arguments.length || (e._marked_timespans = { global: {} }, e._marked_timespans_ids = {}, e._marked_timespans_types = {}), typeof o != "object")
        e._delete_marked_timespan_by_id(o);
      else {
        o.start_date && o.end_date || (o.days !== void 0 || o.type || (o.days = "fullweek"), o.zones || (o.zones = "fullday"));
        var t = [];
        if (o.type)
          t.push(o.type);
        else
          for (var i in e._marked_timespans_types)
            t.push(i);
        for (var s = e._prepare_timespan_options(o), c = 0; c < s.length; c++)
          for (var g = s[c], y = 0; y < t.length; y++) {
            var m = e._lame_clone(g);
            m.type = t[y], e._delete_marked_timespan_by_config(m);
          }
      }
    }, e._get_types_to_render = function(o, t) {
      var i = o ? e._lame_copy({}, o) : {};
      for (var s in t || {})
        t.hasOwnProperty(s) && (i[s] = t[s]);
      return i;
    }, e._get_configs_to_render = function(o) {
      var t = [];
      for (var i in o)
        o.hasOwnProperty(i) && t.push.apply(t, o[i]);
      return t;
    }, e._on_scale_add_marker = function(o, t) {
      if (!e._table_view || e._mode == "month") {
        var i = t.getDay(), s = t.valueOf(), c = this._mode, g = e._marked_timespans, y = [], m = [];
        if (this._props && this._props[c]) {
          var u = this._props[c], p = u.options, d = p[e._get_unit_index(u, t)];
          if (u.days > 1) {
            var f = Math.round((t - e._min_date) / 864e5), v = u.size || p.length;
            t = e.date.add(e._min_date, Math.floor(f / v), "day"), t = e.date.date_part(t);
          } else
            t = e.date.date_part(new Date(this._date));
          if (i = t.getDay(), s = t.valueOf(), g[c] && g[c][d.key]) {
            var x = g[c][d.key], b = e._get_types_to_render(x[i], x[s]);
            y.push.apply(y, e._get_configs_to_render(b));
          }
        }
        var w = g.global;
        if (e.config.overwrite_marked_timespans) {
          var k = w[s] || w[i];
          y.push.apply(y, e._get_configs_to_render(k));
        } else
          w[s] && y.push.apply(y, e._get_configs_to_render(w[s])), w[i] && y.push.apply(y, e._get_configs_to_render(w[i]));
        for (var E = 0; E < y.length; E++)
          m.push.apply(m, e._render_marked_timespan(y[E], o, t));
        return m;
      }
    }, e.attachEvent("onScaleAdd", function() {
      e._on_scale_add_marker.apply(e, arguments);
    }), e.dblclick_dhx_marked_timespan = function(o, t) {
      e.callEvent("onScaleDblClick", [e.getActionData(o).date, t, o]), e.config.dblclick_create && e.addEventNow(e.getActionData(o).date, null, o);
    };
  }, e._temp_limit_scope();
}, map_view: function(e) {
  e.ext || (e.ext = {}), e.ext.mapView = { geocoder: null, map: null, points: null, markers: null, infoWindow: null, createMarker: function(h) {
    return new google.maps.Marker(h);
  } }, e.xy.map_date_width = 188, e.xy.map_icon_width = 25, e.xy.map_description_width = 400, e.config.map_resolve_event_location = !0, e.config.map_resolve_user_location = !0, e.config.map_initial_position = new google.maps.LatLng(48.724, 8.215), e.config.map_error_position = new google.maps.LatLng(15, 15), e.config.map_infowindow_max_width = 300, e.config.map_type = google.maps.MapTypeId.ROADMAP, e.config.map_zoom_after_resolve = 15, e.locale.labels.marker_geo_success = "It seems you are here.", e.locale.labels.marker_geo_fail = "Sorry, could not get your current position using geolocation.", e.templates.marker_date = e.date.date_to_str("%Y-%m-%d %H:%i"), e.templates.marker_text = function(h, a, n) {
    return "<div><b>" + n.text + "</b><br/><br/>" + (n.event_location || "") + "<br/><br/>" + e.templates.marker_date(h) + " - " + e.templates.marker_date(a) + "</div>";
  }, e.dblclick_dhx_map_area = function() {
    !this.config.readonly && this.config.dblclick_create && this.addEventNow({ start_date: e._date, end_date: e.date.add(e._date, e.config.time_step, "minute") });
  }, e.templates.map_time = function(h, a, n) {
    return e.config.rtl && !n._timed ? e.templates.day_date(a) + " &ndash; " + e.templates.day_date(h) : n._timed ? this.day_date(n.start_date, n.end_date, n) + " " + this.event_date(h) : e.templates.day_date(h) + " &ndash; " + e.templates.day_date(a);
  }, e.templates.map_text = function(h, a, n) {
    return n.text;
  }, e.date.map_start = function(h) {
    return h;
  }, e.date.add_map = function(h, a, n) {
    return new Date(h.valueOf());
  }, e.templates.map_date = function(h, a, n) {
    return "";
  }, e._latLngUpdate = !1, e.attachEvent("onSchedulerReady", function() {
    e._isMapPositionSet = !1;
    const h = document.createElement("div");
    h.className = "dhx_map", h.id = "dhx_gmap", h.style.display = "none", e._obj.appendChild(h), e._els.dhx_gmap = [], e._els.dhx_gmap.push(h), o("dhx_gmap");
    const a = { zoom: e.config.map_initial_zoom || 10, center: e.config.map_initial_position, mapTypeId: e.config.map_type || google.maps.MapTypeId.ROADMAP }, n = new google.maps.Map(document.getElementById("dhx_gmap"), a);
    n.disableDefaultUI = !1, n.disableDoubleClickZoom = !e.config.readonly, google.maps.event.addListener(n, "dblclick", function(g) {
      const y = e.ext.mapView.geocoder;
      if (!e.config.readonly && e.config.dblclick_create) {
        var m = g.latLng;
        y.geocode({ latLng: m }, function(u, p) {
          p == google.maps.GeocoderStatus.OK && (m = u[0].geometry.location, e.addEventNow({ lat: m.lat(), lng: m.lng(), event_location: u[0].formatted_address, start_date: e._date, end_date: e.date.add(e._date, e.config.time_step, "minute") }));
        });
      }
    });
    var _ = { content: "" };
    e.config.map_infowindow_max_width && (_.maxWidth = e.config.map_infowindow_max_width), e.map = { _points: [], _markers: [], _infowindow: new google.maps.InfoWindow(_), _infowindows_content: [], _initialization_count: -1, _obj: n }, e.ext.mapView.geocoder = new google.maps.Geocoder(), e.ext.mapView.map = n, e.ext.mapView.points = e.map._points, e.ext.mapView.markers = e.map._markers, e.ext.mapView.infoWindow = e.map._infowindow, e.config.map_resolve_user_location && navigator.geolocation && (e._isMapPositionSet || navigator.geolocation.getCurrentPosition(function(g) {
      var y = new google.maps.LatLng(g.coords.latitude, g.coords.longitude);
      n.setCenter(y), n.setZoom(e.config.map_zoom_after_resolve || 10), e.map._infowindow.setContent(e.locale.labels.marker_geo_success), e.map._infowindow.position = n.getCenter(), e.map._infowindow.open(n), e._isMapPositionSet = !0;
    }, function() {
      e.map._infowindow.setContent(e.locale.labels.marker_geo_fail), e.map._infowindow.setPosition(n.getCenter()), e.map._infowindow.open(n), e._isMapPositionSet = !0;
    })), google.maps.event.addListener(n, "resize", function(g) {
      h.style.zIndex = "5", n.setZoom(n.getZoom());
    }), google.maps.event.addListener(n, "tilesloaded", function(g) {
      h.style.zIndex = "5";
    }), h.style.display = "none";
    const r = e.render_data;
    function l() {
      var g = e.get_visible_events();
      g.sort(function(k, E) {
        return k.start_date.valueOf() == E.start_date.valueOf() ? k.id > E.id ? 1 : -1 : k.start_date > E.start_date ? 1 : -1;
      });
      for (var y = "<div " + (v = e._waiAria.mapAttrString()) + " class='dhx_map_area'>", m = 0; m < g.length; m++) {
        var u = g[m], p = u.id == e._selected_event_id ? "dhx_map_line highlight" : "dhx_map_line", d = u.color ? "--dhx-scheduler-event-background:" + u.color + ";" : "", f = u.textColor ? "--dhx-scheduler-event-color:" + u.textColor + ";" : "", v = e._waiAria.mapRowAttrString(u), x = e._waiAria.mapDetailsBtnString();
        y += "<div " + v + " class='" + p + "' event_id='" + u.id + "' " + e.config.event_attribute + "='" + u.id + "' style='" + d + f + (u._text_style || "") + " width: " + (e.xy.map_date_width + e.xy.map_description_width + 2) + "px;'><div class='dhx_map_event_time' style='width: " + e.xy.map_date_width + "px;' >" + e.templates.map_time(u.start_date, u.end_date, u) + "</div>", y += `<div ${x} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`, y += "<div class='line_description' style='width:" + (e.xy.map_description_width - e.xy.map_icon_width) + "px;'>" + e.templates.map_text(u.start_date, u.end_date, u) + "</div></div>";
      }
      y += "<div class='dhx_v_border' style=" + (e.config.rtl ? "'right: " : "'left: ") + (e.xy.map_date_width - 1) + "px;'></div><div class='dhx_v_border_description'></div></div>", e._els.dhx_cal_data[0].scrollTop = 0, e._els.dhx_cal_data[0].innerHTML = y;
      var b = e._els.dhx_cal_data[0].firstChild.childNodes, w = e._getNavDateElement();
      for (w && (w.innerHTML = e.templates[e._mode + "_date"](e._min_date, e._max_date, e._mode)), e._rendered = [], m = 0; m < b.length - 2; m++)
        e._rendered[m] = b[m];
    }
    function o(g) {
      var y = document.getElementById(g);
      const m = e.$container.querySelector(".dhx_cal_navline").offsetHeight;
      var u = e._y - m;
      u < 0 && (u = 0);
      var p = e._x - e.xy.map_date_width - e.xy.map_description_width - 1;
      p < 0 && (p = 0), y.style.height = u + "px", y.style.width = p + "px", y.style.position = "absolute", y.style.top = m + "px", e.config.rtl ? y.style.marginRight = e.xy.map_date_width + e.xy.map_description_width + 1 + "px" : y.style.marginLeft = e.xy.map_date_width + e.xy.map_description_width + 1 + "px", y.style.marginTop = e.xy.nav_height + 2 + "px";
    }
    e.render_data = function(g, y) {
      if (this._mode != "map")
        return r.apply(this, arguments);
      l();
      for (var m = e.get_visible_events(), u = 0; u < m.length; u++)
        e.map._markers[m[u].id] || i(m[u], !1, !1);
    }, e.map_view = function(g) {
      e.map._initialization_count++;
      var y, m = e._els.dhx_gmap[0];
      if (e._min_date = e.config.map_start || e._currentDate(), e._max_date = e.config.map_end || e.date.add(e._currentDate(), 1, "year"), e._table_view = !0, function(d) {
        if (d) {
          var f = e.locale.labels;
          e._els.dhx_cal_header[0].innerHTML = "<div class='dhx_map_head' style='width: " + (e.xy.map_date_width + e.xy.map_description_width + 2) + "px;' ><div class='headline_date' style='width: " + e.xy.map_date_width + "px;'>" + f.date + "</div><div class='headline_description' style='width: " + e.xy.map_description_width + "px;'>" + f.description + "</div></div>", e._table_view = !0, e.set_sizes();
        }
      }(g), g) {
        (function() {
          e._selected_event_id = null, e.map._infowindow.close();
          var d = e.map._markers;
          for (var f in d)
            d.hasOwnProperty(f) && (d[f].setMap(null), delete e.map._markers[f], e.map._infowindows_content[f] && delete e.map._infowindows_content[f]);
        })(), l(), m.style.display = "block", o("dhx_gmap"), y = e.map._obj.getCenter();
        for (var u = e.get_visible_events(), p = 0; p < u.length; p++)
          e.map._markers[u[p].id] || i(u[p]);
      } else
        m.style.display = "none";
      google.maps.event.trigger(e.map._obj, "resize"), e.map._initialization_count === 0 && y && e.map._obj.setCenter(y), e._selected_event_id && t(e._selected_event_id);
    };
    var t = function(g) {
      e.map._obj.setCenter(e.map._points[g]), e.callEvent("onClick", [g]);
    }, i = function(g, y, m) {
      var u = e.config.map_error_position;
      g.lat && g.lng && (u = new google.maps.LatLng(g.lat, g.lng));
      var p = e.templates.marker_text(g.start_date, g.end_date, g);
      e._new_event || (e.map._infowindows_content[g.id] = p, e.map._markers[g.id] && e.map._markers[g.id].setMap(null), e.map._markers[g.id] = e.ext.mapView.createMarker({ position: u, map: e.map._obj }), google.maps.event.addListener(e.map._markers[g.id], "click", function() {
        e.map._infowindow.setContent(e.map._infowindows_content[g.id]), e.map._infowindow.open(e.map._obj, e.map._markers[g.id]), e._selected_event_id = g.id, e.render_data();
      }), e.map._points[g.id] = u, y && e.map._obj.setCenter(e.map._points[g.id]), m && e.callEvent("onClick", [g.id]));
    };
    e.attachEvent("onClick", function(g, y) {
      if (this._mode == "map") {
        e._selected_event_id = g;
        for (var m = 0; m < e._rendered.length; m++)
          e._rendered[m].className = "dhx_map_line", e._rendered[m].getAttribute(e.config.event_attribute) == g && (e._rendered[m].className += " highlight");
        e.map._points[g] && e.map._markers[g] && (e.map._obj.setCenter(e.map._points[g]), google.maps.event.trigger(e.map._markers[g], "click"));
      }
      return !0;
    });
    var s = function(g) {
      const y = e.ext.mapView.geocoder;
      g.event_location && y ? y.geocode({ address: g.event_location, language: e.uid().toString() }, function(m, u) {
        var p = {};
        u != google.maps.GeocoderStatus.OK ? (p = e.callEvent("onLocationError", [g.id])) && p !== !0 || (p = e.config.map_error_position) : p = m[0].geometry.location, g.lat = p.lat(), g.lng = p.lng(), e._selected_event_id = g.id, e._latLngUpdate = !0, e.callEvent("onEventChanged", [g.id, g]), i(g, !0, !0);
      }) : i(g, !0, !0);
    }, c = function(g) {
      const y = e.ext.mapView.geocoder;
      g.event_location && y && y.geocode({ address: g.event_location, language: e.uid().toString() }, function(m, u) {
        var p = {};
        u != google.maps.GeocoderStatus.OK ? (p = e.callEvent("onLocationError", [g.id])) && p !== !0 || (p = e.config.map_error_position) : p = m[0].geometry.location, g.lat = p.lat(), g.lng = p.lng(), e._latLngUpdate = !0, e.callEvent("onEventChanged", [g.id, g]);
      });
    };
    e.attachEvent("onEventChanged", function(g, y) {
      return this._latLngUpdate ? this._latLngUpdate = !1 : (y = e.getEvent(g)).start_date < e._min_date && y.end_date > e._min_date || y.start_date < e._max_date && y.end_date > e._max_date || y.start_date.valueOf() >= e._min_date && y.end_date.valueOf() <= e._max_date ? (e.map._markers[g] && e.map._markers[g].setMap(null), s(y)) : (e._selected_event_id = null, e.map._infowindow.close(), e.map._markers[g] && e.map._markers[g].setMap(null)), !0;
    }), e.attachEvent("onEventIdChange", function(g, y) {
      var m = e.getEvent(y);
      return (m.start_date < e._min_date && m.end_date > e._min_date || m.start_date < e._max_date && m.end_date > e._max_date || m.start_date.valueOf() >= e._min_date && m.end_date.valueOf() <= e._max_date) && (e.map._markers[g] && (e.map._markers[g].setMap(null), delete e.map._markers[g]), e.map._infowindows_content[g] && delete e.map._infowindows_content[g], s(m)), !0;
    }), e.attachEvent("onEventAdded", function(g, y) {
      return e._dataprocessor || (y.start_date < e._min_date && y.end_date > e._min_date || y.start_date < e._max_date && y.end_date > e._max_date || y.start_date.valueOf() >= e._min_date && y.end_date.valueOf() <= e._max_date) && (e.map._markers[g] && e.map._markers[g].setMap(null), s(y)), !0;
    }), e.attachEvent("onBeforeEventDelete", function(g, y) {
      return e.map._markers[g] && e.map._markers[g].setMap(null), e._selected_event_id = null, e.map._infowindow.close(), !0;
    }), e._event_resolve_delay = 1500, e.attachEvent("onEventLoading", function(g) {
      return e.config.map_resolve_event_location && g.event_location && !g.lat && !g.lng && (e._event_resolve_delay += 1500, function(y, m, u, p) {
        setTimeout(function() {
          if (e.$destroyed)
            return !0;
          var d = y.apply(m, u);
          return y = m = u = null, d;
        }, p || 1);
      }(c, this, [g], e._event_resolve_delay)), !0;
    }), e.attachEvent("onEventCancel", function(g, y) {
      return y && (e.map._markers[g] && e.map._markers[g].setMap(null), e.map._infowindow.close()), !0;
    });
  });
}, minical: function(e) {
  const h = e._createDomEventScope();
  e.config.minicalendar = { mark_events: !0 }, e._synced_minicalendars = [], e.renderCalendar = function(a, n, _) {
    var r = null, l = a.date || e._currentDate();
    if (typeof l == "string" && (l = this.templates.api_date(l)), n)
      r = this._render_calendar(n.parentNode, l, a, n), e.unmarkCalendar(r);
    else {
      var o = a.container, t = a.position;
      if (typeof o == "string" && (o = document.getElementById(o)), typeof t == "string" && (t = document.getElementById(t)), t && t.left === void 0 && t.right === void 0) {
        var i = e.$domHelpers.getOffset(t);
        t = { top: i.top + t.offsetHeight, left: i.left };
      }
      o || (o = e._get_def_cont(t)), (r = this._render_calendar(o, l, a)).$_eventAttached || (r.$_eventAttached = !0, h.attach(r, "click", (function(f) {
        var v = f.target || f.srcElement, x = e.$domHelpers;
        if (x.closest(v, ".dhx_month_head") && !x.closest(v, ".dhx_after") && !x.closest(v, ".dhx_before")) {
          var b = x.closest(v, "[data-cell-date]").getAttribute("data-cell-date"), w = e.templates.parse_date(b);
          e.unmarkCalendar(this), e.markCalendar(this, w, "dhx_calendar_click"), this._last_date = w, this.conf.handler && this.conf.handler.call(e, w, this);
        }
      }).bind(r)));
    }
    if (e.config.minicalendar.mark_events)
      for (var s = e.date.month_start(l), c = e.date.add(s, 1, "month"), g = this.getEvents(s, c), y = this["filter_" + this._mode], m = {}, u = 0; u < g.length; u++) {
        var p = g[u];
        if (!y || y(p.id, p)) {
          var d = p.start_date;
          for (d.valueOf() < s.valueOf() && (d = s), d = e.date.date_part(new Date(d.valueOf())); d < p.end_date && (m[+d] || (m[+d] = !0, this.markCalendar(r, d, "dhx_year_event")), !((d = this.date.add(d, 1, "day")).valueOf() >= c.valueOf())); )
            ;
        }
      }
    return this._markCalendarCurrentDate(r), r.conf = a, a.sync && !_ && this._synced_minicalendars.push(r), r.conf._on_xle_handler || (r.conf._on_xle_handler = e.attachEvent("onXLE", function() {
      e.updateCalendar(r, r.conf.date);
    })), this.config.wai_aria_attributes && this.config.wai_aria_application_role && r.setAttribute("role", "application"), r;
  }, e._get_def_cont = function(a) {
    return this._def_count || (this._def_count = document.createElement("div"), this._def_count.className = "dhx_minical_popup", e.event(this._def_count, "click", function(n) {
      n.cancelBubble = !0;
    }), document.body.appendChild(this._def_count)), a.left && (this._def_count.style.left = a.left + "px"), a.right && (this._def_count.style.right = a.right + "px"), a.top && (this._def_count.style.top = a.top + "px"), a.bottom && (this._def_count.style.bottom = a.bottom + "px"), this._def_count._created = /* @__PURE__ */ new Date(), this._def_count;
  }, e._locateCalendar = function(a, n) {
    if (typeof n == "string" && (n = e.templates.api_date(n)), +n > +a._max_date || +n < +a._min_date)
      return null;
    for (var _ = a.querySelector(".dhx_year_body").childNodes[0], r = 0, l = new Date(a._min_date); +this.date.add(l, 1, "week") <= +n; )
      l = this.date.add(l, 1, "week"), r++;
    var o = e.config.start_on_monday, t = (n.getDay() || (o ? 7 : 0)) - (o ? 1 : 0);
    const i = _.querySelector(`.dhx_cal_month_row:nth-child(${r + 1}) .dhx_cal_month_cell:nth-child(${t + 1})`);
    return i ? i.firstChild : null;
  }, e.markCalendar = function(a, n, _) {
    var r = this._locateCalendar(a, n);
    r && (r.className += " " + _);
  }, e.unmarkCalendar = function(a, n, _) {
    if (_ = _ || "dhx_calendar_click", n = n || a._last_date) {
      var r = this._locateCalendar(a, n);
      r && (r.className = (r.className || "").replace(RegExp(_, "g")));
    }
  }, e._week_template = function(a) {
    for (var n = a || 250, _ = 0, r = document.createElement("div"), l = this.date.week_start(e._currentDate()), o = 0; o < 7; o++)
      this._cols[o] = Math.floor(n / (7 - o)), this._render_x_header(o, _, l, r), l = this.date.add(l, 1, "day"), n -= this._cols[o], _ += this._cols[o];
    return r.lastChild.className += " dhx_scale_bar_last", r;
  }, e.updateCalendar = function(a, n) {
    a.conf.date = n, this.renderCalendar(a.conf, a, !0);
  }, e._mini_cal_arrows = ["&nbsp;", "&nbsp;"], e._render_calendar = function(a, n, _, r) {
    var l = e.templates, o = this._cols;
    this._cols = [];
    var t = this._mode;
    this._mode = "calendar";
    var i = this._colsS;
    this._colsS = { height: 0 };
    var s = new Date(this._min_date), c = new Date(this._max_date), g = new Date(e._date), y = l.month_day, m = this._ignores_detected;
    this._ignores_detected = 0, l.month_day = l.calendar_date, n = this.date.month_start(n);
    var u, p = this._week_template(a.offsetWidth - 1 - this.config.minicalendar.padding);
    r ? u = r : (u = document.createElement("div")).className = "dhx_cal_container dhx_mini_calendar", u.setAttribute("date", this._helpers.formatDate(n)), u.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid" + (e.config.rtl ? " dhx_grid_rtl'>" : "'>") + "<div class='dhx_year_week'>" + (p ? p.innerHTML : "") + "</div><div class='dhx_year_body'></div></div>";
    var d = u.querySelector(".dhx_year_month"), f = u.querySelector(".dhx_year_week"), v = u.querySelector(".dhx_year_body");
    if (d.innerHTML = this.templates.calendar_month(n), _.navigation)
      for (var x = function($, z) {
        var j = e.date.add($._date, z, "month");
        e.updateCalendar($, j), e._date.getMonth() == $._date.getMonth() && e._date.getFullYear() == $._date.getFullYear() && e._markCalendarCurrentDate($);
      }, b = ["dhx_cal_prev_button", "dhx_cal_next_button"], w = ["left:1px;top:4px;position:absolute;", "left:auto; right:1px;top:4px;position:absolute;"], k = [-1, 1], E = function($) {
        return function() {
          if (_.sync)
            for (var z = e._synced_minicalendars, j = 0; j < z.length; j++)
              x(z[j], $);
          else
            e.config.rtl && ($ = -$), x(u, $);
        };
      }, D = [e.locale.labels.prev, e.locale.labels.next], S = 0; S < 2; S++) {
        var N = document.createElement("div");
        N.className = b[S], e._waiAria.headerButtonsAttributes(N, D[S]), N.style.cssText = w[S], N.innerHTML = this._mini_cal_arrows[S], d.appendChild(N), h.attach(N, "click", E(k[S]));
      }
    u._date = new Date(n), u.week_start = (n.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;
    var M = u._min_date = this.date.week_start(n);
    u._max_date = this.date.add(u._min_date, 6, "week"), this._reset_month_scale(v, n, M, 6), r || a.appendChild(u), f.style.height = f.childNodes[0].offsetHeight - 1 + "px";
    var A = e.uid();
    e._waiAria.minicalHeader(d, A), e._waiAria.minicalGrid(u.querySelector(".dhx_year_grid"), A), e._waiAria.minicalRow(f);
    for (var C = f.querySelectorAll(".dhx_scale_bar"), T = 0; T < C.length; T++)
      e._waiAria.minicalHeadCell(C[T]);
    var O = v.querySelectorAll(".dhx_cal_month_cell"), L = new Date(M);
    for (T = 0; T < O.length; T++)
      e._waiAria.minicalDayCell(O[T], new Date(L)), L = e.date.add(L, 1, "day");
    return e._waiAria.minicalHeader(d, A), this._cols = o, this._mode = t, this._colsS = i, this._min_date = s, this._max_date = c, e._date = g, l.month_day = y, this._ignores_detected = m, u;
  }, e.destroyCalendar = function(a, n) {
    !a && this._def_count && this._def_count.firstChild && (n || (/* @__PURE__ */ new Date()).valueOf() - this._def_count._created.valueOf() > 500) && (a = this._def_count.firstChild), a && (h.detachAll(), a.innerHTML = "", a.parentNode && a.parentNode.removeChild(a), this._def_count && (this._def_count.style.top = "-1000px"), a.conf && a.conf._on_xle_handler && e.detachEvent(a.conf._on_xle_handler));
  }, e.isCalendarVisible = function() {
    return !!(this._def_count && parseInt(this._def_count.style.top, 10) > 0) && this._def_count;
  }, e.attachEvent("onTemplatesReady", function() {
    e.event(document.body, "click", function() {
      e.destroyCalendar();
    });
  }, { once: !0 }), e.form_blocks.calendar_time = { render: function(a) {
    var n = "<span class='dhx_minical_input_wrapper'><input class='dhx_readonly dhx_minical_input' type='text' readonly='true'></span>", _ = e.config, r = this.date.date_part(e._currentDate()), l = 1440, o = 0;
    _.limit_time_select && (o = 60 * _.first_hour, l = 60 * _.last_hour + 1), r.setHours(o / 60), a._time_values = [], n += " <select class='dhx_lightbox_time_select'>";
    for (var t = o; t < l; t += 1 * this.config.time_step)
      n += "<option value='" + t + "'>" + this.templates.time_picker(r) + "</option>", a._time_values.push(t), r = this.date.add(r, this.config.time_step, "minute");
    return "<div class='dhx_section_time dhx_lightbox_minical'>" + (n += "</select>") + "<span class='dhx_lightbox_minical_spacer'> &nbsp;&ndash;&nbsp; </span>" + n + "</div>";
  }, set_value: function(a, n, _, r) {
    var l, o, t = a.getElementsByTagName("input"), i = a.getElementsByTagName("select"), s = function(d, f, v) {
      e.event(d, "click", function() {
        e.destroyCalendar(null, !0), e.renderCalendar({ position: d, date: new Date(this._date), navigation: !0, handler: function(x) {
          d.value = e.templates.calendar_time(x), d._date = new Date(x), e.destroyCalendar(), e.config.event_duration && e.config.auto_end_date && v === 0 && m();
        } });
      });
    };
    if (e.config.full_day) {
      if (!a._full_day) {
        var c = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + e.locale.labels.full_day + "&nbsp;</label></input>";
        e.config.wide_form || (c = a.previousSibling.innerHTML + c), a.previousSibling.innerHTML = c, a._full_day = !0;
      }
      var g = a.previousSibling.getElementsByTagName("input")[0], y = e.date.time_part(_.start_date) === 0 && e.date.time_part(_.end_date) === 0;
      g.checked = y, i[0].disabled = g.checked, i[1].disabled = g.checked, g.$_eventAttached || (g.$_eventAttached = !0, e.event(g, "click", function() {
        if (g.checked === !0) {
          var d = {};
          e.form_blocks.calendar_time.get_value(a, d), l = e.date.date_part(d.start_date), (+(o = e.date.date_part(d.end_date)) == +l || +o >= +l && (_.end_date.getHours() !== 0 || _.end_date.getMinutes() !== 0)) && (o = e.date.add(o, 1, "day"));
        }
        var f = l || _.start_date, v = o || _.end_date;
        u(t[0], f), u(t[1], v), i[0].value = 60 * f.getHours() + f.getMinutes(), i[1].value = 60 * v.getHours() + v.getMinutes(), i[0].disabled = g.checked, i[1].disabled = g.checked;
      }));
    }
    if (e.config.event_duration && e.config.auto_end_date) {
      var m = function() {
        e.config.auto_end_date && e.config.event_duration && (l = e.date.add(t[0]._date, i[0].value, "minute"), o = new Date(l.getTime() + 60 * e.config.event_duration * 1e3), t[1].value = e.templates.calendar_time(o), t[1]._date = e.date.date_part(new Date(o)), i[1].value = 60 * o.getHours() + o.getMinutes());
      };
      i[0].$_eventAttached || i[0].addEventListener("change", m);
    }
    function u(d, f, v) {
      s(d, f, v), d.value = e.templates.calendar_time(f), d._date = e.date.date_part(new Date(f));
    }
    function p(d) {
      for (var f = r._time_values, v = 60 * d.getHours() + d.getMinutes(), x = v, b = !1, w = 0; w < f.length; w++) {
        var k = f[w];
        if (k === v) {
          b = !0;
          break;
        }
        k < v && (x = k);
      }
      return b || x ? b ? v : x : -1;
    }
    u(t[0], _.start_date, 0), u(t[1], _.end_date, 1), s = function() {
    }, i[0].value = p(_.start_date), i[1].value = p(_.end_date);
  }, get_value: function(a, n) {
    var _ = a.getElementsByTagName("input"), r = a.getElementsByTagName("select");
    return n.start_date = e.date.add(_[0]._date, r[0].value, "minute"), n.end_date = e.date.add(_[1]._date, r[1].value, "minute"), n.end_date <= n.start_date && (n.end_date = e.date.add(n.start_date, e.config.time_step, "minute")), { start_date: new Date(n.start_date), end_date: new Date(n.end_date) };
  }, focus: function(a) {
  } }, e.linkCalendar = function(a, n) {
    var _ = function() {
      var r = e._date, l = new Date(r.valueOf());
      return n && (l = n(l)), l.setDate(1), e.updateCalendar(a, l), !0;
    };
    e.attachEvent("onViewChange", _), e.attachEvent("onXLE", _), e.attachEvent("onEventAdded", _), e.attachEvent("onEventChanged", _), e.attachEvent("onEventDeleted", _), _();
  }, e._markCalendarCurrentDate = function(a) {
    var n = e.getState(), _ = n.min_date, r = n.max_date, l = n.mode, o = e.date.month_start(new Date(a._date)), t = e.date.add(o, 1, "month");
    if (!({ month: !0, year: !0, agenda: !0, grid: !0 }[l] || _.valueOf() <= o.valueOf() && r.valueOf() >= t.valueOf()))
      for (var i = _; i.valueOf() < r.valueOf(); )
        o.valueOf() <= i.valueOf() && t > i && e.markCalendar(a, i, "dhx_calendar_click"), i = e.date.add(i, 1, "day");
  }, e.attachEvent("onEventCancel", function() {
    e.destroyCalendar(null, !0);
  }), e.attachEvent("onDestroy", function() {
    e.destroyCalendar();
  });
}, monthheight: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    e.xy.scroll_width = 0;
    var h = e.render_view_data;
    e.render_view_data = function() {
      var n = this._els.dhx_cal_data[0];
      n.firstChild._h_fix = !0, h.apply(e, arguments);
      var _ = parseInt(n.style.height);
      n.style.height = "1px", n.style.height = n.scrollHeight + "px", this._obj.style.height = this._obj.clientHeight + n.scrollHeight - _ + "px";
    };
    var a = e._reset_month_scale;
    e._reset_month_scale = function(n, _, r, l) {
      var o = { clientHeight: 100 };
      a.apply(e, [o, _, r, l]), n.innerHTML = o.innerHTML;
    };
  });
}, multisection: function(e) {
  e.config.multisection = !0, e.config.multisection_shift_all = !0, e.config.section_delimiter = ",", e.attachEvent("onSchedulerReady", function() {
    ze(e);
    var h = e._update_unit_section;
    e._update_unit_section = function(o) {
      return e._update_sections(o, h);
    };
    var a = e._update_timeline_section;
    e._update_timeline_section = function(o) {
      return e._update_sections(o, a);
    }, e.isMultisectionEvent = function(o) {
      return !(!o || !this._get_multisection_view()) && this._get_event_sections(o).length > 1;
    }, e._get_event_sections = function(o) {
      var t = o[this._get_section_property()] || "";
      return this._parse_event_sections(t);
    }, e._parse_event_sections = function(o) {
      return o instanceof Array ? o : o.toString().split(e.config.section_delimiter);
    }, e._clear_copied_events(), e._split_events = function(o) {
      var t = [], i = this._get_multisection_view(), s = this._get_section_property();
      if (i)
        for (var c = 0; c < o.length; c++) {
          var g = this._get_event_sections(o[c]);
          if (g.length > 1) {
            for (var y = 0; y < g.length; y++)
              if (i.order[g[y]] !== void 0) {
                var m = e._copy_event(o[c]);
                m[s] = g[y], t.push(m);
              }
          } else
            t.push(o[c]);
        }
      else
        t = o;
      return t;
    }, e._get_multisection_view = function() {
      return !!this.config.multisection && e._get_section_view();
    };
    var n = e.get_visible_events;
    e.get_visible_events = function(o) {
      this._clear_copied_events();
      var t = n.apply(this, arguments);
      if (this._get_multisection_view()) {
        t = this._split_events(t);
        for (var i = 0; i < t.length; i++)
          this.is_visible_events(t[i]) || (t.splice(i, 1), i--);
        this._register_copies_array(t);
      }
      return t;
    }, e._rendered_events = {};
    var _ = e.render_view_data;
    e.render_view_data = function(o, t) {
      return this._get_multisection_view() && o && (o = this._split_events(o), this._restore_render_flags(o)), _.apply(this, [o, t]);
    }, e._update_sections = function(o, t) {
      var i = o.view, s = o.event, c = o.pos;
      if (e.isMultisectionEvent(s)) {
        if (e._drag_event._orig_section || (e._drag_event._orig_section = c.section), e._drag_event._orig_section != c.section) {
          var g = i.order[c.section] - i.order[e._drag_event._orig_section];
          if (g) {
            var y = this._get_event_sections(s), m = [], u = !0;
            if (e.config.multisection_shift_all)
              for (var p = 0; p < y.length; p++) {
                if ((d = e._shift_sections(i, y[p], g)) === null) {
                  m = y, u = !1;
                  break;
                }
                m[p] = d;
              }
            else
              for (p = 0; p < y.length; p++) {
                if (y[p] == c.section) {
                  m = y, u = !1;
                  break;
                }
                if (y[p] == e._drag_event._orig_section) {
                  var d;
                  if ((d = e._shift_sections(i, y[p], g)) === null) {
                    m = y, u = !1;
                    break;
                  }
                  m[p] = d;
                } else
                  m[p] = y[p];
              }
            u && (e._drag_event._orig_section = c.section), s[e._get_section_property()] = m.join(e.config.section_delimiter);
          }
        }
      } else
        t.apply(e, [o]);
    }, e._shift_sections = function(o, t, i) {
      for (var s = null, c = o.y_unit || o.options, g = 0; g < c.length; g++)
        if (c[g].key == t) {
          s = g;
          break;
        }
      var y = c[s + i];
      return y ? y.key : null;
    };
    var r = e._get_blocked_zones;
    e._get_blocked_zones = function(o, t, i, s, c) {
      if (t && this.config.multisection) {
        t = this._parse_event_sections(t);
        for (var g = [], y = 0; y < t.length; y++)
          g = g.concat(r.apply(this, [o, t[y], i, s, c]));
        return g;
      }
      return r.apply(this, arguments);
    };
    var l = e._check_sections_collision;
    e._check_sections_collision = function(o, t) {
      if (this.config.multisection && this._get_section_view()) {
        o = this._split_events([o]), t = this._split_events([t]);
        for (var i = !1, s = 0, c = o.length; s < c && !i; s++)
          for (var g = 0, y = t.length; g < y; g++)
            if (l.apply(this, [o[s], t[g]])) {
              i = !0;
              break;
            }
        return i;
      }
      return l.apply(this, arguments);
    };
  });
}, multiselect: function(e) {
  e.form_blocks.multiselect = { render: function(h) {
    var a = "dhx_multi_select_control dhx_multi_select_" + h.name;
    h.vertical && (a += " dhx_multi_select_control_vertical");
    for (var n = "<div class='" + a + "' style='overflow: auto; max-height: " + h.height + "px; position: relative;' >", _ = 0; _ < h.options.length; _++)
      n += "<label><input type='checkbox' value='" + h.options[_].key + "'/>" + h.options[_].label + "</label>";
    return n += "</div>";
  }, set_value: function(h, a, n, _) {
    for (var r = h.getElementsByTagName("input"), l = 0; l < r.length; l++)
      r[l].checked = !1;
    function o(g) {
      for (var y = h.getElementsByTagName("input"), m = 0; m < y.length; m++)
        y[m].checked = !!g[y[m].value];
    }
    var t = {};
    if (n[_.map_to]) {
      var i = (n[_.map_to] + "").split(_.delimiter || e.config.section_delimiter || ",");
      for (l = 0; l < i.length; l++)
        t[i[l]] = !0;
      o(t);
    } else {
      if (e._new_event || !_.script_url)
        return;
      var s = document.createElement("div");
      s.className = "dhx_loading", s.style.cssText = "position: absolute; top: 40%; left: 40%;", h.appendChild(s);
      var c = [_.script_url, _.script_url.indexOf("?") == -1 ? "?" : "&", "dhx_crosslink_" + _.map_to + "=" + n.id + "&uid=" + e.uid()].join("");
      e.ajax.get(c, function(g) {
        var y = function(m, u) {
          try {
            for (var p = JSON.parse(m.xmlDoc.responseText), d = {}, f = 0; f < p.length; f++) {
              var v = p[f];
              d[v.value || v.key || v.id] = !0;
            }
            return d;
          } catch {
            return null;
          }
        }(g);
        y || (y = function(m, u) {
          for (var p = e.ajax.xpath("//data/item", m.xmlDoc), d = {}, f = 0; f < p.length; f++)
            d[p[f].getAttribute(u.map_to)] = !0;
          return d;
        }(g, _)), o(y), h.removeChild(s);
      });
    }
  }, get_value: function(h, a, n) {
    for (var _ = [], r = h.getElementsByTagName("input"), l = 0; l < r.length; l++)
      r[l].checked && _.push(r[l].value);
    return _.join(n.delimiter || e.config.section_delimiter || ",");
  }, focus: function(h) {
  } };
}, multisource: function(e) {
  var h = e._load;
  e._load = function(a, n) {
    if (typeof (a = a || this._load_url) == "object")
      for (var _ = function(l) {
        var o = function() {
        };
        return o.prototype = l, o;
      }(this._loaded), r = 0; r < a.length; r++)
        this._loaded = new _(), h.call(this, a[r], n);
    else
      h.apply(this, arguments);
  };
}, mvc: function(e) {
  var h, a = { use_id: !1 };
  function n(l) {
    var o = {};
    for (var t in l)
      t.indexOf("_") !== 0 && (o[t] = l[t]);
    return a.use_id || delete o.id, o;
  }
  function _(l) {
    l._not_render = !1, l._render_wait && l.render_view_data(), l._loading = !1, l.callEvent("onXLE", []);
  }
  function r(l) {
    return a.use_id ? l.id : l.cid;
  }
  e.backbone = function(l, o) {
    o && (a = o), l.bind("change", function(s, c) {
      var g = r(s), y = e._events[g] = s.toJSON();
      y.id = g, e._init_event(y), clearTimeout(h), h = setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.updateView();
      }, 1);
    }), l.bind("remove", function(s, c) {
      var g = r(s);
      e._events[g] && e.deleteEvent(g);
    });
    var t = [];
    function i() {
      if (e.$destroyed)
        return !0;
      t.length && (e.parse(t, "json"), t = []);
    }
    l.bind("add", function(s, c) {
      var g = r(s);
      if (!e._events[g]) {
        var y = s.toJSON();
        y.id = g, e._init_event(y), t.push(y), t.length == 1 && setTimeout(i, 1);
      }
    }), l.bind("request", function(s) {
      var c;
      s instanceof Backbone.Collection && ((c = e)._loading = !0, c._not_render = !0, c.callEvent("onXLS", []));
    }), l.bind("sync", function(s) {
      s instanceof Backbone.Collection && _(e);
    }), l.bind("error", function(s) {
      s instanceof Backbone.Collection && _(e);
    }), e.attachEvent("onEventCreated", function(s) {
      var c = new l.model(e.getEvent(s));
      return e._events[s] = c.toJSON(), e._events[s].id = s, !0;
    }), e.attachEvent("onEventAdded", function(s) {
      if (!l.get(s)) {
        var c = n(e.getEvent(s)), g = new l.model(c), y = r(g);
        y != s && this.changeEventId(s, y), l.add(g), l.trigger("scheduler:add", g);
      }
      return !0;
    }), e.attachEvent("onEventChanged", function(s) {
      var c = l.get(s), g = n(e.getEvent(s));
      return c.set(g), l.trigger("scheduler:change", c), !0;
    }), e.attachEvent("onEventDeleted", function(s) {
      var c = l.get(s);
      return c && (l.trigger("scheduler:remove", c), l.remove(s)), !0;
    });
  };
}, outerdrag: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    var h, a = new dhtmlDragAndDropObject(), n = a.stopDrag;
    function _(r, l, o, t) {
      if (!e.checkEvent("onBeforeExternalDragIn") || e.callEvent("onBeforeExternalDragIn", [r, l, o, t, h])) {
        var i = e.attachEvent("onEventCreated", function(m) {
          e.callEvent("onExternalDragIn", [m, r, h]) || (this._drag_mode = this._drag_id = null, this.deleteEvent(m));
        }), s = e.getActionData(h), c = { start_date: new Date(s.date) };
        if (e.matrix && e.matrix[e._mode]) {
          var g = e.matrix[e._mode];
          c[g.y_property] = s.section;
          var y = e._locate_cell_timeline(h);
          c.start_date = g._trace_x[y.x], c.end_date = e.date.add(c.start_date, g.x_step, g.x_unit);
        }
        e._props && e._props[e._mode] && (c[e._props[e._mode].map_to] = s.section), e.addEventNow(c), e.detachEvent(i);
      }
    }
    a.stopDrag = function(r) {
      return h = r, n.apply(this, arguments);
    }, a.addDragLanding(e._els.dhx_cal_data[0], { _drag: function(r, l, o, t) {
      _(r, l, o, t);
    }, _dragIn: function(r, l) {
      return r;
    }, _dragOut: function(r) {
      return this;
    } }), dhtmlx.DragControl && dhtmlx.DragControl.addDrop(e._els.dhx_cal_data[0], { onDrop: function(r, l, o, t) {
      var i = dhtmlx.DragControl.getMaster(r);
      h = t, _(r, i, l, t.target || t.srcElement);
    }, onDragIn: function(r, l, o) {
      return l;
    } }, !0);
  });
}, pdf: function(e) {
  var h, a, n = new RegExp("<[^>]*>", "g"), _ = new RegExp("<br[^>]*>", "g");
  function r(b) {
    return b.replace(_, `
`).replace(n, "");
  }
  function l(b, w) {
    b = parseFloat(b), w = parseFloat(w), isNaN(w) || (b -= w);
    var k = t(b);
    return b = b - k.width + k.cols * h, isNaN(b) ? "auto" : 100 * b / h;
  }
  function o(b, w, k) {
    b = parseFloat(b), w = parseFloat(w), !isNaN(w) && k && (b -= w);
    var E = t(b);
    return b = b - E.width + E.cols * h, isNaN(b) ? "auto" : 100 * b / (h - (isNaN(w) ? 0 : w));
  }
  function t(b) {
    for (var w = 0, k = e._els.dhx_cal_header[0].childNodes, E = k[1] ? k[1].childNodes : k[0].childNodes, D = 0; D < E.length; D++) {
      var S = E[D].style ? E[D] : E[D].parentNode, N = parseFloat(S.style.width);
      if (!(b > N))
        break;
      b -= N + 1, w += N + 1;
    }
    return { width: w, cols: D };
  }
  function i(b) {
    return b = parseFloat(b), isNaN(b) ? "auto" : 100 * b / a;
  }
  function s(b, w) {
    return (window.getComputedStyle ? window.getComputedStyle(b, null)[w] : b.currentStyle ? b.currentStyle[w] : null) || "";
  }
  function c(b, w) {
    for (var k = parseInt(b.style.left, 10), E = 0; E < e._cols.length; E++)
      if ((k -= e._cols[E]) < 0)
        return E;
    return w;
  }
  function g(b, w) {
    for (var k = parseInt(b.style.top, 10), E = 0; E < e._colsS.heights.length; E++)
      if (e._colsS.heights[E] > k)
        return E;
    return w;
  }
  function y(b) {
    return b ? "</" + b + ">" : "";
  }
  function m(b, w, k, E) {
    var D = "<" + b + " profile='" + w + "'";
    return k && (D += " header='" + k + "'"), E && (D += " footer='" + E + "'"), D += ">";
  }
  function u() {
    var b = "", w = e._mode;
    if (e.matrix && e.matrix[e._mode] && (w = e.matrix[e._mode].render == "cell" ? "matrix" : "timeline"), b += "<scale mode='" + w + "' today='" + e._els.dhx_cal_date[0].innerHTML + "'>", e._mode == "week_agenda")
      for (var k = e._els.dhx_cal_data[0].getElementsByTagName("DIV"), E = 0; E < k.length; E++)
        k[E].className == "dhx_wa_scale_bar" && (b += "<column>" + r(k[E].innerHTML) + "</column>");
    else if (e._mode == "agenda" || e._mode == "map")
      b += "<column>" + r((k = e._els.dhx_cal_header[0].childNodes[0].childNodes)[0].innerHTML) + "</column><column>" + r(k[1].innerHTML) + "</column>";
    else if (e._mode == "year")
      for (k = e._els.dhx_cal_data[0].childNodes, E = 0; E < k.length; E++)
        b += "<month label='" + r(k[E].querySelector(".dhx_year_month").innerHTML) + "'>", b += d(k[E].querySelector(".dhx_year_week").childNodes), b += p(k[E].querySelector(".dhx_year_body")), b += "</month>";
    else {
      b += "<x>", b += d(k = e._els.dhx_cal_header[0].childNodes), b += "</x>";
      var D = e._els.dhx_cal_data[0];
      if (e.matrix && e.matrix[e._mode]) {
        for (b += "<y>", E = 0; E < D.firstChild.rows.length; E++)
          b += "<row><![CDATA[" + r(D.firstChild.rows[E].cells[0].innerHTML) + "]]></row>";
        b += "</y>", a = D.firstChild.rows[0].cells[0].offsetHeight;
      } else if (D.firstChild.tagName == "TABLE")
        b += p(D);
      else {
        for (D = D.childNodes[D.childNodes.length - 1]; D.className.indexOf("dhx_scale_holder") == -1; )
          D = D.previousSibling;
        for (D = D.childNodes, b += "<y>", E = 0; E < D.length; E++)
          b += `
<row><![CDATA[` + r(D[E].innerHTML) + "]]></row>";
        b += "</y>", a = D[0].offsetHeight;
      }
    }
    return b += "</scale>";
  }
  function p(b) {
    for (var w = "", k = b.querySelectorAll("tr"), E = 0; E < k.length; E++) {
      for (var D = [], S = k[E].querySelectorAll("td"), N = 0; N < S.length; N++)
        D.push(S[N].querySelector(".dhx_month_head").innerHTML);
      w += `
<row height='` + S[0].offsetHeight + "'><![CDATA[" + r(D.join("|")) + "]]></row>", a = S[0].offsetHeight;
    }
    return w;
  }
  function d(b) {
    var w, k = "";
    e.matrix && e.matrix[e._mode] && (e.matrix[e._mode].second_scale && (w = b[1].childNodes), b = b[0].childNodes);
    for (var E = 0; E < b.length; E++)
      k += `
<column><![CDATA[` + r(b[E].innerHTML) + "]]></column>";
    if (h = b[0].offsetWidth, w) {
      var D = 0, S = b[0].offsetWidth, N = 1;
      for (E = 0; E < w.length; E++)
        k += `
<column second_scale='` + N + "'><![CDATA[" + r(w[E].innerHTML) + "]]></column>", (D += w[E].offsetWidth) >= S && (S += b[N] ? b[N].offsetWidth : 0, N++), h = w[0].offsetWidth;
    }
    return k;
  }
  function f(b) {
    var w = "", k = e._rendered, E = e.matrix && e.matrix[e._mode];
    if (e._mode == "agenda" || e._mode == "map")
      for (var D = 0; D < k.length; D++)
        w += "<event><head><![CDATA[" + r(k[D].childNodes[0].innerHTML) + "]]></head><body><![CDATA[" + r(k[D].childNodes[2].innerHTML) + "]]></body></event>";
    else if (e._mode == "week_agenda")
      for (D = 0; D < k.length; D++)
        w += "<event day='" + k[D].parentNode.getAttribute("day") + "'><body>" + r(k[D].innerHTML) + "</body></event>";
    else if (e._mode == "year")
      for (k = e.get_visible_events(), D = 0; D < k.length; D++) {
        var S = k[D].start_date;
        for (S.valueOf() < e._min_date.valueOf() && (S = e._min_date); S < k[D].end_date; ) {
          var N = S.getMonth() + 12 * (S.getFullYear() - e._min_date.getFullYear()) - e.week_starts._month, M = e.week_starts[N] + S.getDate() - 1, A = b ? s(e._get_year_cell(S), "color") : "", C = b ? s(e._get_year_cell(S), "backgroundColor") : "";
          if (w += "<event day='" + M % 7 + "' week='" + Math.floor(M / 7) + "' month='" + N + "' backgroundColor='" + C + "' color='" + A + "'></event>", (S = e.date.add(S, 1, "day")).valueOf() >= e._max_date.valueOf())
            break;
        }
      }
    else if (E && E.render == "cell")
      for (k = e._els.dhx_cal_data[0].getElementsByTagName("TD"), D = 0; D < k.length; D++)
        A = b ? s(k[D], "color") : "", w += `
<event><body backgroundColor='` + (C = b ? s(k[D], "backgroundColor") : "") + "' color='" + A + "'><![CDATA[" + r(k[D].innerHTML) + "]]></body></event>";
    else
      for (D = 0; D < k.length; D++) {
        var T, O;
        if (e.matrix && e.matrix[e._mode])
          T = l(k[D].style.left), O = l(k[D].offsetWidth) - 1;
        else {
          var L = e.config.use_select_menu_space ? 0 : 26;
          T = o(k[D].style.left, L, !0), O = o(k[D].style.width, L) - 1;
        }
        if (!isNaN(1 * O)) {
          var $ = i(k[D].style.top), z = i(k[D].style.height), j = k[D].className.split(" ")[0].replace("dhx_cal_", "");
          if (j !== "dhx_tooltip_line") {
            var P = e.getEvent(k[D].getAttribute(e.config.event_attribute));
            if (P) {
              M = P._sday;
              var I = P._sweek, Y = P._length || 0;
              if (e._mode == "month")
                z = parseInt(k[D].offsetHeight, 10), $ = parseInt(k[D].style.top, 10) - e.xy.month_head_height, M = c(k[D], M), I = g(k[D], I);
              else if (e.matrix && e.matrix[e._mode]) {
                M = 0, I = k[D].parentNode.parentNode.parentNode.rowIndex;
                var W = a;
                a = k[D].parentNode.offsetHeight, $ = i(k[D].style.top), $ -= 0.2 * $, a = W;
              } else {
                if (k[D].parentNode == e._els.dhx_cal_data[0])
                  continue;
                var B = e._els.dhx_cal_data[0].childNodes[0], R = parseFloat(B.className.indexOf("dhx_scale_holder") != -1 ? B.style.left : 0);
                T += l(k[D].parentNode.style.left, R);
              }
              w += `
<event week='` + I + "' day='" + M + "' type='" + j + "' x='" + T + "' y='" + $ + "' width='" + O + "' height='" + z + "' len='" + Y + "'>", j == "event" ? (w += "<header><![CDATA[" + r(k[D].childNodes[1].innerHTML) + "]]></header>", A = b ? s(k[D].childNodes[2], "color") : "", w += "<body backgroundColor='" + (C = b ? s(k[D].childNodes[2], "backgroundColor") : "") + "' color='" + A + "'><![CDATA[" + r(k[D].childNodes[2].innerHTML) + "]]></body>") : (A = b ? s(k[D], "color") : "", w += "<body backgroundColor='" + (C = b ? s(k[D], "backgroundColor") : "") + "' color='" + A + "'><![CDATA[" + r(k[D].innerHTML) + "]]></body>"), w += "</event>";
            }
          }
        }
      }
    return w;
  }
  function v(b, w, k, E, D, S) {
    var N = !1;
    E == "fullcolor" && (N = !0, E = "color"), E = E || "color";
    var M, A = "";
    if (b) {
      var C = e._date, T = e._mode;
      w = e.date[k + "_start"](w), w = e.date["get_" + k + "_end"] ? e.date["get_" + k + "_end"](w) : e.date.add(w, 1, k), A = m("pages", E, D, S);
      for (var O = new Date(b); +O < +w; O = this.date.add(O, 1, k))
        this.setCurrentView(O, k), A += ((M = "page") ? "<" + M + ">" : "") + u().replace("–", "-") + f(N) + y("page");
      A += y("pages"), this.setCurrentView(C, T);
    } else
      A = m("data", E, D, S) + u().replace("–", "-") + f(N) + y("data");
    return A;
  }
  function x(b, w, k, E, D, S, N) {
    (function(M, A) {
      var C = e.uid(), T = document.createElement("div");
      T.style.display = "none", document.body.appendChild(T), T.innerHTML = '<form id="' + C + '" method="post" target="_blank" action="' + A + '" accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><input type="hidden" name="mycoolxmlbody"/> </form>', document.getElementById(C).firstChild.value = encodeURIComponent(M), document.getElementById(C).submit(), T.parentNode.removeChild(T);
    })(typeof D == "object" ? function(M) {
      for (var A = "<data>", C = 0; C < M.length; C++)
        A += M[C].source.getPDFData(M[C].start, M[C].end, M[C].view, M[C].mode, M[C].header, M[C].footer);
      return A += "</data>", A;
    }(D) : v.apply(this, [b, w, k, D, S, N]), E);
  }
  e.getPDFData = v, e.toPDF = function(b, w, k, E) {
    return x.apply(this, [null, null, null, b, w, k, E]);
  }, e.toPDFRange = function(b, w, k, E, D, S, N) {
    return typeof b == "string" && (b = e.templates.api_date(b), w = e.templates.api_date(w)), x.apply(this, arguments);
  };
}, quick_info: function(e) {
  e.config.icons_select = ["icon_form", "icon_delete"], e.config.details_on_create = !0, e.config.show_quick_info = !0, e.xy.menu_width = 0, e.attachEvent("onClick", function(h) {
    if (e.config.show_quick_info)
      return e.showQuickInfo(h), !0;
  }), function() {
    for (var h = ["onEmptyClick", "onViewChange", "onLightbox", "onBeforeEventDelete", "onBeforeDrag"], a = function() {
      return e.hideQuickInfo(!0), !0;
    }, n = 0; n < h.length; n++)
      e.attachEvent(h[n], a);
  }(), e.templates.quick_info_title = function(h, a, n) {
    return n.text.substr(0, 50);
  }, e.templates.quick_info_content = function(h, a, n) {
    return n.details || "";
  }, e.templates.quick_info_date = function(h, a, n) {
    return e.isOneDayEvent(n) && e.config.rtl ? e.templates.day_date(h, a, n) + " " + e.templates.event_header(a, h, n) : e.isOneDayEvent(n) ? e.templates.day_date(h, a, n) + " " + e.templates.event_header(h, a, n) : e.config.rtl ? e.templates.week_date(a, h, n) : e.templates.week_date(h, a, n);
  }, e.showQuickInfo = function(h) {
    if (h != this._quick_info_box_id && (this.hideQuickInfo(!0), this.callEvent("onBeforeQuickInfo", [h]) !== !1)) {
      var a = this._get_event_counter_part(h);
      a && (this._quick_info_box = this._init_quick_info(a), this._fill_quick_data(h), this._show_quick_info(a), this.callEvent("onQuickInfo", [h]));
    }
  }, function() {
    function h(a) {
      a = a || "";
      var n, _ = parseFloat(a), r = a.match(/m?s/);
      switch (r && (r = r[0]), r) {
        case "s":
          n = 1e3 * _;
          break;
        case "ms":
          n = _;
          break;
        default:
          n = 0;
      }
      return n;
    }
    e.hideQuickInfo = function(a) {
      var n = this._quick_info_box, _ = this._quick_info_box_id;
      if (this._quick_info_box_id = 0, n && n.parentNode) {
        var r = n.offsetWidth;
        if (e.config.quick_info_detached)
          return this.callEvent("onAfterQuickInfo", [_]), n.parentNode.removeChild(n);
        if (n.style.right == "auto" ? n.style.left = -r + "px" : n.style.right = -r + "px", a)
          n.parentNode.removeChild(n);
        else {
          var l;
          window.getComputedStyle ? l = window.getComputedStyle(n, null) : n.currentStyle && (l = n.currentStyle);
          var o = h(l["transition-delay"]) + h(l["transition-duration"]);
          setTimeout(function() {
            n.parentNode && n.parentNode.removeChild(n);
          }, o);
        }
        this.callEvent("onAfterQuickInfo", [_]);
      }
    };
  }(), e.event(window, "keydown", function(h) {
    h.keyCode == 27 && e.hideQuickInfo();
  }), e._show_quick_info = function(h) {
    var a = e._quick_info_box;
    e._obj.appendChild(a);
    var n = a.offsetWidth, _ = a.offsetHeight;
    if (e.config.quick_info_detached) {
      var r = h.left - h.dx * (n - h.width);
      e.getView() && e.getView()._x_scroll && (e.config.rtl ? r += e.getView()._x_scroll : r -= e.getView()._x_scroll), r + n > window.innerWidth && (r = window.innerWidth - n), r = Math.max(0, r), a.style.left = r + "px", a.style.top = h.top - (h.dy ? _ : -h.height) + "px";
    } else {
      const l = e.$container.querySelector(".dhx_cal_data").offsetTop;
      a.style.top = l + 20 + "px", h.dx == 1 ? (a.style.right = "auto", a.style.left = -n + "px", setTimeout(function() {
        a.style.left = "-10px";
      }, 1)) : (a.style.left = "auto", a.style.right = -n + "px", setTimeout(function() {
        a.style.right = "-10px";
      }, 1)), a.className = a.className.replace(" dhx_qi_left", "").replace(" dhx_qi_right", "") + " dhx_qi_" + (h.dx == 1 ? "left" : "right");
    }
  }, e.attachEvent("onTemplatesReady", function() {
    if (e.hideQuickInfo(), this._quick_info_box) {
      var h = this._quick_info_box;
      h.parentNode && h.parentNode.removeChild(h), this._quick_info_box = null;
    }
  }), e._quick_info_onscroll_handler = function(h) {
    e.hideQuickInfo();
  }, e._init_quick_info = function() {
    if (!this._quick_info_box) {
      var h = this._quick_info_box = document.createElement("div");
      this._waiAria.quickInfoAttr(h), h.className = "dhx_cal_quick_info", e.$testmode && (h.className += " dhx_no_animate"), e.config.rtl && (h.className += " dhx_quick_info_rtl");
      var a = `
		<div class="dhx_cal_qi_tcontrols">
			<a class="dhx_cal_qi_close_btn scheduler_icon close"></a>
		</div>
		<div class="dhx_cal_qi_title" ${this._waiAria.quickInfoHeaderAttrString()}>
				
				<div class="dhx_cal_qi_tcontent"></div>
				<div class="dhx_cal_qi_tdate"></div>
			</div>
			<div class="dhx_cal_qi_content"></div>`;
      a += '<div class="dhx_cal_qi_controls">';
      for (var n = e.config.icons_select, _ = 0; _ < n.length; _++)
        a += `<div ${this._waiAria.quickInfoButtonAttrString(this.locale.labels[n[_]])} class="dhx_qi_big_icon ${n[_]}" title="${e.locale.labels[n[_]]}">
				<div class='dhx_menu_icon ${n[_]}'></div><div>${e.locale.labels[n[_]]}</div></div>`;
      a += "</div>", h.innerHTML = a, e.event(h, "click", function(r) {
        e._qi_button_click(r.target || r.srcElement);
      }), e.config.quick_info_detached && (e._detachDomEvent(e._els.dhx_cal_data[0], "scroll", e._quick_info_onscroll_handler), e.event(e._els.dhx_cal_data[0], "scroll", e._quick_info_onscroll_handler));
    }
    return this._quick_info_box;
  }, e._qi_button_click = function(h) {
    var a = e._quick_info_box;
    if (h && h != a)
      if (h.closest(".dhx_cal_qi_close_btn"))
        e.hideQuickInfo();
      else {
        var n = e._getClassName(h);
        if (n.indexOf("_icon") != -1) {
          var _ = e._quick_info_box_id;
          e._click.buttons[n.split(" ")[1].replace("icon_", "")](_);
        } else
          e._qi_button_click(h.parentNode);
      }
  }, e._get_event_counter_part = function(h) {
    for (var a = e.getRenderedEvent(h), n = 0, _ = 0, r = a; r && r != e._obj; )
      n += r.offsetLeft, _ += r.offsetTop - r.scrollTop, r = r.offsetParent;
    return r ? { left: n, top: _, dx: n + a.offsetWidth / 2 > e._x / 2 ? 1 : 0, dy: _ + a.offsetHeight / 2 > e._y / 2 ? 1 : 0, width: a.offsetWidth, height: a.offsetHeight } : 0;
  }, e._fill_quick_data = function(h) {
    var a = e.getEvent(h), n = e._quick_info_box;
    e._quick_info_box_id = h;
    var _ = { content: e.templates.quick_info_title(a.start_date, a.end_date, a), date: e.templates.quick_info_date(a.start_date, a.end_date, a) };
    n.querySelector(".dhx_cal_qi_tcontent").innerHTML = `<span>${_.content}</span>`, n.querySelector(".dhx_cal_qi_tdate").innerHTML = _.date, e._waiAria.quickInfoHeader(n, [_.content, _.date].join(" "));
    var r = n.querySelector(".dhx_cal_qi_content");
    const l = e.templates.quick_info_content(a.start_date, a.end_date, a);
    l ? (r.classList.remove("dhx_hidden"), r.innerHTML = l) : r.classList.add("dhx_hidden");
  };
}, readonly: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    var h;
    e.form_blocks.recurring && (h = e.form_blocks.recurring.set_value);
    var a = e.config.buttons_left.slice(), n = e.config.buttons_right.slice();
    function _(o, t, i, s) {
      for (var c = t.getElementsByTagName(o), g = i.getElementsByTagName(o), y = g.length - 1; y >= 0; y--)
        if (i = g[y], s) {
          var m = document.createElement("span");
          m.className = "dhx_text_disabled", m.innerHTML = s(c[y]), i.parentNode.insertBefore(m, i), i.parentNode.removeChild(i);
        } else
          i.disabled = !0, t.checked && (i.checked = !0);
    }
    e.attachEvent("onBeforeLightbox", function(o) {
      this.config.readonly_form || this.getEvent(o).readonly ? this.config.readonly_active = !0 : (this.config.readonly_active = !1, e.config.buttons_left = a.slice(), e.config.buttons_right = n.slice(), e.form_blocks.recurring && (e.form_blocks.recurring.set_value = h));
      var t = this.config.lightbox.sections;
      if (this.config.readonly_active) {
        for (var i = 0; i < t.length; i++)
          t[i].type == "recurring" && this.config.readonly_active && e.form_blocks.recurring && (e.form_blocks.recurring.set_value = function(d, f, v) {
            var x = e.$domHelpers.closest(d, ".dhx_wrap_section"), b = "none";
            x.querySelector(".dhx_cal_lsection").display = b, x.querySelector(".dhx_form_repeat").display = b, x.style.display = b, e.setLightboxSize();
          });
        var s = ["dhx_delete_btn", "dhx_save_btn"], c = [e.config.buttons_left, e.config.buttons_right];
        for (i = 0; i < s.length; i++)
          for (var g = s[i], y = 0; y < c.length; y++) {
            for (var m = c[y], u = -1, p = 0; p < m.length; p++)
              if (m[p] == g) {
                u = p;
                break;
              }
            u != -1 && m.splice(u, 1);
          }
      }
      return this.resetLightbox(), !0;
    });
    var r = e._fill_lightbox;
    e._fill_lightbox = function() {
      var o = this.getLightbox();
      this.config.readonly_active && (o.style.visibility = "hidden", o.style.display = "block");
      var t = r.apply(this, arguments);
      if (this.config.readonly_active && (o.style.visibility = "", o.style.display = "none"), this.config.readonly_active) {
        var i = this.getLightbox(), s = this._lightbox_r = i.cloneNode(!0);
        s.id = e.uid(), s.className += " dhx_cal_light_readonly", _("textarea", i, s, function(c) {
          return c.value;
        }), _("input", i, s, !1), _("select", i, s, function(c) {
          return c.options.length ? c.options[Math.max(c.selectedIndex || 0, 0)].text : "";
        }), i.parentNode.insertBefore(s, i), this.showCover(s), e._lightbox && e._lightbox.parentNode.removeChild(e._lightbox), this._lightbox = s, e.config.drag_lightbox && e.event(s.firstChild, "mousedown", e._ready_to_dnd), e._init_lightbox_events(), this.setLightboxSize();
      }
      return t;
    };
    var l = e.hide_lightbox;
    e.hide_lightbox = function() {
      return this._lightbox_r && (this._lightbox_r.parentNode.removeChild(this._lightbox_r), this._lightbox_r = this._lightbox = null), l.apply(this, arguments);
    };
  });
}, recurring: function(e) {
  function h() {
    var r = e.formSection("recurring");
    if (r || (r = a("recurring")), !r)
      throw new Error(["Can't locate the Recurring form section.", "Make sure that you have the recurring control on the lightbox configuration https://docs.dhtmlx.com/scheduler/recurring_events.html#recurringlightbox ", 'and that the recurring control has name "recurring":', "", "scheduler.config.lightbox.sections = [", '	{name:"recurring", ... }', "];"].join(`
`));
    return r;
  }
  function a(r) {
    for (var l = 0; l < e.config.lightbox.sections.length; l++) {
      var o = e.config.lightbox.sections[l];
      if (o.type === r)
        return e.formSection(o.name);
    }
    return null;
  }
  function n(r) {
    return new Date(r.getFullYear(), r.getMonth(), r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds(), 0);
  }
  var _;
  e.config.occurrence_timestamp_in_utc = !1, e.config.recurring_workdays = [1, 2, 3, 4, 5], e.form_blocks.recurring = { _get_node: function(r) {
    if (typeof r == "string") {
      let l = e._lightbox.querySelector(`#${r}`);
      l || (l = document.getElementById(r)), r = l;
    }
    return r.style.display == "none" && (r.style.display = ""), r;
  }, _outer_html: function(r) {
    return r.outerHTML || (l = r, (t = document.createElement("div")).appendChild(l.cloneNode(!0)), o = t.innerHTML, t = null, o);
    var l, o, t;
  }, render: function(r) {
    if (r.form) {
      var l = e.form_blocks.recurring, o = l._get_node(r.form), t = l._outer_html(o);
      return o.style.display = "none", t;
    }
    var i = e.locale.labels;
    return '<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />' + i.repeat_radio_day + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>' + i.repeat_radio_week + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />' + i.repeat_radio_month + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />' + i.repeat_radio_year + '</label></div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>' + i.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />' + i.repeat_text_day_count + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>' + i.repeat_radio_day_type2 + '</label></div> </div> <div style="display:none;" id="dhx_repeat_week"><div><label>' + i.repeat_week + '<input class="dhx_repeat_text" type="text" name="week_count" value="1" /></label><span>' + i.repeat_text_week_count + '</span></div>  <table class="dhx_repeat_days"> <tr> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />' + i.day_for_recurring[1] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />' + i.day_for_recurring[4] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />' + i.day_for_recurring[2] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />' + i.day_for_recurring[5] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />' + i.day_for_recurring[3] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />' + i.day_for_recurring[6] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />' + i.day_for_recurring[0] + '</label></div> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>' + i.repeat_radio_month_type + '</label><label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />' + i.repeat_text_month_day + '</label><label><input class="dhx_repeat_text" type="text" name="month_count" value="1" />' + i.repeat_text_month_count + '</label></div> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>' + i.repeat_radio_month_start + '</label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><label><select name="month_day2">	<option value="1" selected >' + e.locale.date.day_full[1] + '<option value="2">' + e.locale.date.day_full[2] + '<option value="3">' + e.locale.date.day_full[3] + '<option value="4">' + e.locale.date.day_full[4] + '<option value="5">' + e.locale.date.day_full[5] + '<option value="6">' + e.locale.date.day_full[6] + '<option value="0">' + e.locale.date.day_full[0] + "</select>" + i.repeat_text_month_count2_before + '</label><label><input class="dhx_repeat_text" type="text" name="month_count2" value="1" />' + i.repeat_text_month_count2_after + '</label></div> </div> <div style="display:none;" id="dhx_repeat_year"> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>' + i.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />' + i.repeat_text_year_day + '</label><label><select name="year_month"><option value="0" selected >' + i.month_for_recurring[0] + '<option value="1">' + i.month_for_recurring[1] + '<option value="2">' + i.month_for_recurring[2] + '<option value="3">' + i.month_for_recurring[3] + '<option value="4">' + i.month_for_recurring[4] + '<option value="5">' + i.month_for_recurring[5] + '<option value="6">' + i.month_for_recurring[6] + '<option value="7">' + i.month_for_recurring[7] + '<option value="8">' + i.month_for_recurring[8] + '<option value="9">' + i.month_for_recurring[9] + '<option value="10">' + i.month_for_recurring[10] + '<option value="11">' + i.month_for_recurring[11] + "</select>" + i.select_year_month + '</label></div> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>' + i.repeat_year_label + '</label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >' + e.locale.date.day_full[1] + '<option value="2">' + e.locale.date.day_full[2] + '<option value="3">' + e.locale.date.day_full[3] + '<option value="4">' + e.locale.date.day_full[4] + '<option value="5">' + e.locale.date.day_full[5] + '<option value="6">' + e.locale.date.day_full[6] + '<option value="7">' + e.locale.date.day_full[0] + "</select>" + i.select_year_day2 + '<select name="year_month2"><option value="0" selected >' + i.month_for_recurring[0] + '<option value="1">' + i.month_for_recurring[1] + '<option value="2">' + i.month_for_recurring[2] + '<option value="3">' + i.month_for_recurring[3] + '<option value="4">' + i.month_for_recurring[4] + '<option value="5">' + i.month_for_recurring[5] + '<option value="6">' + i.month_for_recurring[6] + '<option value="7">' + i.month_for_recurring[7] + '<option value="8">' + i.month_for_recurring[8] + '<option value="9">' + i.month_for_recurring[9] + '<option value="10">' + i.month_for_recurring[10] + '<option value="11">' + i.month_for_recurring[11] + '</select></div> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <div><label><input class="dhx_repeat_radio" type="radio" name="end" checked/>' + i.repeat_radio_end + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + i.repeat_radio_end2 + '</label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />' + i.repeat_text_occurences_count + '</div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + i.repeat_radio_end3 + '</label><input class="dhx_repeat_date" type="text" name="date_of_end" value="' + e.config.repeat_date_of_end + '" /></div> </div> </form> </div> </div>';
  }, _ds: {}, _get_form_node: function(r, l, o) {
    var t = r[l];
    if (!t)
      return null;
    if (t.nodeName)
      return t;
    if (t.length) {
      for (var i = 0; i < t.length; i++)
        if (t[i].value == o)
          return t[i];
    }
  }, _get_node_value: function(r, l, o) {
    var t = r[l];
    if (!t)
      return "";
    if (t.length) {
      if (o) {
        for (var i = [], s = 0; s < t.length; s++)
          t[s].checked && i.push(t[s].value);
        return i;
      }
      for (s = 0; s < t.length; s++)
        if (t[s].checked)
          return t[s].value;
    }
    return t.value ? o ? [t.value] : t.value : void 0;
  }, _get_node_numeric_value: function(r, l) {
    return 1 * e.form_blocks.recurring._get_node_value(r, l) || 0;
  }, _set_node_value: function(r, l, o) {
    var t = r[l];
    if (t) {
      if (t.name == l)
        t.value = o;
      else if (t.length)
        for (var i = typeof o == "object", s = 0; s < t.length; s++)
          (i || t[s].value == o) && (t[s].checked = i ? !!o[t[s].value] : !!o);
    }
  }, _init_set_value: function(r, l, o) {
    var t = e.form_blocks.recurring, i = t._get_node_value, s = t._set_node_value;
    e.form_blocks.recurring._ds = { start: o.start_date, end: o._end_date };
    var c = e.date.str_to_date(e.config.repeat_date, !1, !0), g = e.date.date_to_str(e.config.repeat_date), y = r.getElementsByTagName("FORM")[0], m = {};
    function u(E) {
      for (var D = 0; D < E.length; D++) {
        var S = E[D];
        if (S.name)
          if (m[S.name])
            if (m[S.name].nodeType) {
              var N = m[S.name];
              m[S.name] = [N, S];
            } else
              m[S.name].push(S);
          else
            m[S.name] = S;
      }
    }
    if (u(y.getElementsByTagName("INPUT")), u(y.getElementsByTagName("SELECT")), !e.config.repeat_date_of_end) {
      var p = e.date.date_to_str(e.config.repeat_date);
      e.config.repeat_date_of_end = p(e.date.add(e._currentDate(), 30, "day"));
    }
    s(m, "date_of_end", e.config.repeat_date_of_end);
    var d = function(E) {
      return e._lightbox.querySelector(`#${E}`) || { style: {} };
    };
    function f() {
      d("dhx_repeat_day").style.display = "none", d("dhx_repeat_week").style.display = "none", d("dhx_repeat_month").style.display = "none", d("dhx_repeat_year").style.display = "none", d("dhx_repeat_" + this.value).style.display = "", e.setLightboxSize();
    }
    function v(E, D) {
      var S = E.end;
      if (S.length)
        if (S[0].value && S[0].value != "on")
          for (var N = 0; N < S.length; N++)
            S[N].value == D && (S[N].checked = !0);
        else {
          var M = 0;
          switch (D) {
            case "no":
              M = 0;
              break;
            case "date_of_end":
              M = 2;
              break;
            default:
              M = 1;
          }
          S[M].checked = !0;
        }
      else
        S.value = D;
    }
    e.form_blocks.recurring._get_repeat_code = function(E) {
      var D = [i(m, "repeat")];
      for (x[D[0]](D, E); D.length < 5; )
        D.push("");
      var S = "", N = function(M) {
        var A = M.end;
        if (A.length) {
          for (var C = 0; C < A.length; C++)
            if (A[C].checked)
              return A[C].value && A[C].value != "on" ? A[C].value : C ? C == 2 ? "date_of_end" : "occurences_count" : "no";
        } else if (A.value)
          return A.value;
        return "no";
      }(m);
      return N == "no" ? (E.end = new Date(9999, 1, 1), S = "no") : N == "date_of_end" ? E.end = function(M) {
        var A = c(M);
        return e.config.include_end_by && (A = e.date.add(A, 1, "day")), A;
      }(i(m, "date_of_end")) : (e.transpose_type(D.join("_")), S = Math.max(1, i(m, "occurences_count")), E.end = e.date["add_" + D.join("_")](new Date(E.start), S + 0, { start_date: E.start }) || E.start), D.join("_") + "#" + S;
    };
    var x = { month: function(E, D) {
      var S = e.form_blocks.recurring._get_node_value, N = e.form_blocks.recurring._get_node_numeric_value;
      S(m, "month_type") == "d" ? (E.push(Math.max(1, N(m, "month_count"))), D.start.setDate(S(m, "month_day"))) : (E.push(Math.max(1, N(m, "month_count2"))), E.push(S(m, "month_day2")), E.push(Math.max(1, N(m, "month_week2"))), e.config.repeat_precise || D.start.setDate(1)), D._start = !0;
    }, week: function(E, D) {
      var S = e.form_blocks.recurring._get_node_value, N = e.form_blocks.recurring._get_node_numeric_value;
      E.push(Math.max(1, N(m, "week_count"))), E.push(""), E.push("");
      for (var M = [], A = S(m, "week_day", !0), C = D.start.getDay(), T = !1, O = 0; O < A.length; O++)
        M.push(A[O]), T = T || A[O] == C;
      M.length || (M.push(C), T = !0), M.sort(), e.config.repeat_precise ? T || (e.transpose_day_week(D.start, M, 1, 7), D._start = !0) : (D.start = e.date.week_start(D.start), D._start = !0), E.push(M.join(","));
    }, day: function(E) {
      var D = e.form_blocks.recurring._get_node_value, S = e.form_blocks.recurring._get_node_numeric_value;
      D(m, "day_type") == "d" ? E.push(Math.max(1, S(m, "day_count"))) : (E.push("week"), E.push(1), E.push(""), E.push(""), E.push(e.config.recurring_workdays.join(",")), E.splice(0, 1));
    }, year: function(E, D) {
      var S = e.form_blocks.recurring._get_node_value;
      S(m, "year_type") == "d" ? (E.push("1"), D.start.setMonth(0), D.start.setDate(S(m, "year_day")), D.start.setMonth(S(m, "year_month"))) : (E.push("1"), E.push(S(m, "year_day2")), E.push(S(m, "year_week2")), D.start.setDate(1), D.start.setMonth(S(m, "year_month2"))), D._start = !0;
    } }, b = { week: function(E, D) {
      var S = e.form_blocks.recurring._set_node_value;
      S(m, "week_count", E[1]);
      for (var N = E[4].split(","), M = {}, A = 0; A < N.length; A++)
        M[N[A]] = !0;
      S(m, "week_day", M);
    }, month: function(E, D) {
      var S = e.form_blocks.recurring._set_node_value;
      E[2] === "" ? (S(m, "month_type", "d"), S(m, "month_count", E[1]), S(m, "month_day", D.start.getDate())) : (S(m, "month_type", "w"), S(m, "month_count2", E[1]), S(m, "month_week2", E[3]), S(m, "month_day2", E[2]));
    }, day: function(E, D) {
      var S = e.form_blocks.recurring._set_node_value;
      S(m, "day_type", "d"), S(m, "day_count", E[1]);
    }, year: function(E, D) {
      var S = e.form_blocks.recurring._set_node_value;
      E[2] === "" ? (S(m, "year_type", "d"), S(m, "year_day", D.start.getDate()), S(m, "year_month", D.start.getMonth())) : (S(m, "year_type", "w"), S(m, "year_week2", E[3]), S(m, "year_day2", E[2]), S(m, "year_month2", D.start.getMonth()));
    } };
    e.form_blocks.recurring._set_repeat_code = function(E, D) {
      var S = e.form_blocks.recurring._set_node_value, N = E.split("#");
      switch (E = N[0].split("_"), b[E[0]](E, D), N[1]) {
        case "no":
          v(m, "no");
          break;
        case "":
          v(m, "date_of_end");
          var M = D.end;
          e.config.include_end_by && (M = e.date.add(M, -1, "day")), S(m, "date_of_end", g(M));
          break;
        default:
          v(m, "occurences_count"), S(m, "occurences_count", N[1]);
      }
      S(m, "repeat", E[0]);
      var A = e.form_blocks.recurring._get_form_node(m, "repeat", E[0]);
      A.nodeName == "SELECT" ? (A.dispatchEvent(new Event("change")), A.dispatchEvent(new MouseEvent("click"))) : A.dispatchEvent(new MouseEvent("click"));
    };
    for (var w = 0; w < y.elements.length; w++) {
      var k = y.elements[w];
      k.name === "repeat" && (k.nodeName != "SELECT" || k.$_eventAttached ? k.$_eventAttached || (k.$_eventAttached = !0, k.addEventListener("click", f)) : (k.$_eventAttached = !0, k.addEventListener("change", f)));
    }
    e._lightbox._rec_init_done = !0;
  }, set_value: function(r, l, o) {
    var t = e.form_blocks.recurring;
    e._lightbox._rec_init_done || t._init_set_value(r, l, o), r.open = !o.rec_type, r.blocked = this._is_modified_occurence(o);
    var i = t._ds;
    i.start = o.start_date, i.end = o._end_date, t._toggle_block(), l && t._set_repeat_code(l, i);
  }, get_value: function(r, l) {
    if (r.open) {
      var o = e.form_blocks.recurring._ds, t = {};
      (function() {
        var i = e.formSection("time");
        if (i || (i = a("time")), i || (i = a("calendar_time")), !i)
          throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", 'In the latter case, make sure the control is named "time":', "", "scheduler.config.lightbox.sections = [", '{name:"time", height:72, type:"YOU CONTROL", map_to:"auto" }];'].join(`
`));
        return i;
      })().getValue(t), o.start = t.start_date, l.rec_type = e.form_blocks.recurring._get_repeat_code(o), o._start ? (l.start_date = new Date(o.start), l._start_date = new Date(o.start), o._start = !1) : l._start_date = null, l._end_date = o.end, l.rec_pattern = l.rec_type.split("#")[0];
    } else
      l.rec_type = l.rec_pattern = "", l._end_date = l.end_date;
    return l.rec_type;
  }, _get_button: function() {
    return h().header.firstChild.firstChild;
  }, _get_form: function() {
    return h().node;
  }, open: function() {
    var r = e.form_blocks.recurring;
    r._get_form().open || r._toggle_block();
  }, close: function() {
    var r = e.form_blocks.recurring;
    r._get_form().open && r._toggle_block();
  }, _toggle_block: function() {
    var r = e.form_blocks.recurring, l = r._get_form(), o = r._get_button();
    l.open || l.blocked ? (l.style.height = "0px", o && (o.style.backgroundPosition = "-5px 20px", o.nextSibling.innerHTML = e.locale.labels.button_recurring)) : (l.style.height = "auto", o && (o.style.backgroundPosition = "-5px 0px", o.nextSibling.innerHTML = e.locale.labels.button_recurring_open)), l.open = !l.open, e.setLightboxSize();
  }, focus: function(r) {
  }, button_click: function(r, l, o) {
    e.form_blocks.recurring._get_form().blocked || e.form_blocks.recurring._toggle_block();
  } }, e._rec_markers = {}, e._rec_markers_pull = {}, e._add_rec_marker = function(r, l) {
    r._pid_time = l, this._rec_markers[r.id] = r, this._rec_markers_pull[r.event_pid] || (this._rec_markers_pull[r.event_pid] = {}), this._rec_markers_pull[r.event_pid][l] = r;
  }, e._get_rec_marker = function(r, l) {
    var o = this._rec_markers_pull[l];
    return o ? o[r] : null;
  }, e._get_rec_markers = function(r) {
    return this._rec_markers_pull[r] || [];
  }, e._rec_temp = [], _ = e.addEvent, e.addEvent = function(r, l, o, t, i) {
    var s = _.apply(this, arguments);
    if (s && e.getEvent(s)) {
      var c = e.getEvent(s);
      c.start_date && (c.start_date = n(c.start_date)), c.end_date && (c.end_date = n(c.end_date)), this._is_modified_occurence(c) && e._add_rec_marker(c, 1e3 * c.event_length), c.rec_type && (c.rec_pattern = c.rec_type.split("#")[0]);
    }
    return s;
  }, e.attachEvent("onEventIdChange", function(r, l) {
    if (!this._ignore_call) {
      this._ignore_call = !0, e._rec_markers[r] && (e._rec_markers[l] = e._rec_markers[r], delete e._rec_markers[r]), e._rec_markers_pull[r] && (e._rec_markers_pull[l] = e._rec_markers_pull[r], delete e._rec_markers_pull[r]);
      for (var o = 0; o < this._rec_temp.length; o++)
        (t = this._rec_temp[o]).event_pid == r && (t.event_pid = l, this.changeEventId(t.id, l + "#" + t.id.split("#")[1]));
      for (var o in this._rec_markers) {
        var t;
        (t = this._rec_markers[o]).event_pid == r && (t.event_pid = l, t._pid_changed = !0);
      }
      var i = e._rec_markers[l];
      i && i._pid_changed && (delete i._pid_changed, setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.callEvent("onEventChanged", [l, e.getEvent(l)]);
      }, 1)), delete this._ignore_call;
    }
  }), e.attachEvent("onConfirmedBeforeEventDelete", function(r) {
    var l = this.getEvent(r);
    if (this._is_virtual_event(r) || this._is_modified_occurence(l) && l.rec_type && l.rec_type != "none") {
      r = r.split("#");
      var o = this.uid(), t = r[1] ? r[1] : Math.round(l._pid_time / 1e3), i = this._copy_event(l);
      i.id = o, i.event_pid = l.event_pid || r[0];
      var s = t;
      i.event_length = s, i.rec_type = i.rec_pattern = "none", this.addEvent(i), this._add_rec_marker(i, 1e3 * s);
    } else {
      l.rec_type && this._lightbox_id && this._roll_back_dates(l);
      var c = this._get_rec_markers(r);
      for (var g in c)
        c.hasOwnProperty(g) && (r = c[g].id, this.getEvent(r) && this.deleteEvent(r, !0));
    }
    return !0;
  }), e.attachEvent("onEventDeleted", function(r, l) {
    !this._is_virtual_event(r) && this._is_modified_occurence(l) && (e._events[r] || (l.rec_type = l.rec_pattern = "none", this.setEvent(r, l)));
  }), e.attachEvent("onEventChanged", function(r, l) {
    if (this._loading)
      return !0;
    var o = this.getEvent(r);
    if (this._is_virtual_event(r)) {
      r = r.split("#");
      var t = this.uid();
      this._not_render = !0;
      var i = this._copy_event(l);
      i.id = t, i.event_pid = r[0];
      var s = r[1];
      i.event_length = s, i.rec_type = i.rec_pattern = "", this._add_rec_marker(i, 1e3 * s), this.addEvent(i), this._not_render = !1;
    } else {
      o.start_date && (o.start_date = n(o.start_date)), o.end_date && (o.end_date = n(o.end_date)), o.rec_type && this._lightbox_id && this._roll_back_dates(o);
      var c = this._get_rec_markers(r);
      for (var g in c)
        c.hasOwnProperty(g) && (delete this._rec_markers[c[g].id], this.deleteEvent(c[g].id, !0));
      delete this._rec_markers_pull[r];
      for (var y = !1, m = 0; m < this._rendered.length; m++)
        this._rendered[m].getAttribute(this.config.event_attribute) == r && (y = !0);
      y || (this._select_id = null);
    }
    return !0;
  }), e.attachEvent("onEventAdded", function(r) {
    if (!this._loading) {
      var l = this.getEvent(r);
      l.rec_type && !l.event_length && this._roll_back_dates(l);
    }
    return !0;
  }), e.attachEvent("onEventSave", function(r, l, o) {
    return this.getEvent(r).rec_type || !l.rec_type || this._is_virtual_event(r) || (this._select_id = null), !0;
  }), e.attachEvent("onEventCreated", function(r) {
    var l = this.getEvent(r);
    return l.rec_type || (l.rec_type = l.rec_pattern = l.event_length = l.event_pid = ""), !0;
  }), e.attachEvent("onEventCancel", function(r) {
    var l = this.getEvent(r);
    l.rec_type && (this._roll_back_dates(l), this.render_view_data());
  }), e._roll_back_dates = function(r) {
    r.start_date && (r.start_date = n(r.start_date)), r.end_date && (r.end_date = n(r.end_date)), r.event_length = Math.round((r.end_date.valueOf() - r.start_date.valueOf()) / 1e3), r.end_date = r._end_date, r._start_date && (r.start_date.setMonth(0), r.start_date.setDate(r._start_date.getDate()), r.start_date.setMonth(r._start_date.getMonth()), r.start_date.setFullYear(r._start_date.getFullYear()));
  }, e._is_virtual_event = function(r) {
    return r.toString().indexOf("#") != -1;
  }, e._is_modified_occurence = function(r) {
    return r.event_pid && r.event_pid != "0";
  }, e.showLightbox_rec = e.showLightbox, e.showLightbox = function(r) {
    var l = this.locale, o = e.config.lightbox_recurring, t = this.getEvent(r), i = t.event_pid, s = this._is_virtual_event(r);
    s && (i = r.split("#")[0]);
    var c = function(y) {
      var m = e.getEvent(y);
      return m._end_date = m.end_date, m.end_date = new Date(m.start_date.valueOf() + 1e3 * m.event_length), e.showLightbox_rec(y);
    };
    if ((i || 1 * i == 0) && t.rec_type)
      return c(r);
    if (!i || i === "0" || !l.labels.confirm_recurring || o == "instance" || o == "series" && !s)
      return this.showLightbox_rec(r);
    if (o == "ask") {
      var g = this;
      e.modalbox({ text: l.labels.confirm_recurring, title: l.labels.title_confirm_recurring, width: "500px", position: "middle", buttons: [l.labels.button_edit_series, l.labels.button_edit_occurrence, l.labels.icon_cancel], callback: function(y) {
        switch (+y) {
          case 0:
            return c(i);
          case 1:
            return g.showLightbox_rec(r);
          case 2:
            return;
        }
      } });
    } else
      c(i);
  }, e.get_visible_events_rec = e.get_visible_events, e.get_visible_events = function(r) {
    for (var l = 0; l < this._rec_temp.length; l++)
      delete this._events[this._rec_temp[l].id];
    this._rec_temp = [];
    var o = this.get_visible_events_rec(r), t = [];
    for (l = 0; l < o.length; l++)
      o[l].rec_type ? o[l].rec_pattern != "none" && this.repeat_date(o[l], t) : t.push(o[l]);
    return t;
  }, function() {
    var r = e.isOneDayEvent;
    e.isOneDayEvent = function(o) {
      return !!o.rec_type || r.call(this, o);
    };
    var l = e.updateEvent;
    e.updateEvent = function(o) {
      var t = e.getEvent(o);
      t && t.rec_type && (t.rec_pattern = (t.rec_type || "").split("#")[0]), t && t.rec_type && !this._is_virtual_event(o) ? e.update_view() : l.call(this, o);
    };
  }(), e.transponse_size = { day: 1, week: 7, month: 1, year: 12 }, e.date.day_week = function(r, l, o) {
    r.setDate(1);
    var t = e.date.month_start(new Date(r)), i = 1 * l + (o = 7 * (o - 1)) - r.getDay() + 1;
    r.setDate(i <= o ? i + 7 : i);
    var s = e.date.month_start(new Date(r));
    return t.valueOf() === s.valueOf();
  }, e.transpose_day_week = function(r, l, o, t, i) {
    for (var s = (r.getDay() || (e.config.start_on_monday ? 7 : 0)) - o, c = 0; c < l.length; c++)
      if (l[c] > s)
        return r.setDate(r.getDate() + 1 * l[c] - s - (t ? o : i));
    this.transpose_day_week(r, l, o + t, null, o);
  }, e.transpose_type = function(r) {
    var l = "transpose_" + r;
    if (!this.date[l]) {
      var o = r.split("_"), t = "add_" + r, i = this.transponse_size[o[0]] * o[1];
      if (o[0] == "day" || o[0] == "week") {
        var s = null;
        if (o[4] && (s = o[4].split(","), e.config.start_on_monday)) {
          for (var c = 0; c < s.length; c++)
            s[c] = 1 * s[c] || 7;
          s.sort();
        }
        this.date[l] = function(g, y) {
          var m = Math.floor((y.valueOf() - g.valueOf()) / (864e5 * i));
          return m > 0 && g.setDate(g.getDate() + m * i), s && e.transpose_day_week(g, s, 1, i), g;
        }, this.date[t] = function(g, y) {
          var m = new Date(g.valueOf());
          if (s)
            for (var u = 0; u < y; u++)
              e.transpose_day_week(m, s, 0, i);
          else
            m.setDate(m.getDate() + y * i);
          return m;
        };
      } else
        o[0] != "month" && o[0] != "year" || (this.date[l] = function(g, y, m) {
          var u = Math.ceil((12 * y.getFullYear() + 1 * y.getMonth() + 1 - (12 * g.getFullYear() + 1 * g.getMonth() + 1)) / i - 1);
          return u >= 0 && (g.setDate(1), g.setMonth(g.getMonth() + u * i)), e.date[t](g, 0, m);
        }, this.date[t] = function(g, y, m, u) {
          if (u ? u++ : u = 1, u > 12)
            return null;
          var p = new Date(g.valueOf());
          p.setDate(1), p.setMonth(p.getMonth() + y * i);
          var d = p.getMonth(), f = p.getFullYear();
          p.setDate(m.start_date.getDate()), o[3] && e.date.day_week(p, o[2], o[3]);
          var v = e.config.recurring_overflow_instances;
          return p.getMonth() != d && v != "none" && (p = v === "lastDay" ? new Date(f, d + 1, 0, p.getHours(), p.getMinutes(), p.getSeconds(), p.getMilliseconds()) : e.date[t](new Date(f, d + 1, 0), y || 1, m, u)), p;
        });
    }
  }, e.repeat_date = function(r, l, o, t, i, s) {
    t = t || this._min_date, i = i || this._max_date;
    var c = s || -1, g = new Date(r.start_date.valueOf()), y = g.getHours(), m = 0;
    for (!r.rec_pattern && r.rec_type && (r.rec_pattern = r.rec_type.split("#")[0]), this.transpose_type(r.rec_pattern), g = e.date["transpose_" + r.rec_pattern](g, t, r); g && (g < r.start_date || e._fix_daylight_saving_date(g, t, r, g, new Date(g.valueOf() + 1e3 * r.event_length)).valueOf() <= t.valueOf() || g.valueOf() + 1e3 * r.event_length <= t.valueOf()); )
      g = this.date["add_" + r.rec_pattern](g, 1, r);
    for (; g && g < i && g < r.end_date && (c < 0 || m < c); ) {
      g.setHours(y);
      var u = e.config.occurrence_timestamp_in_utc ? Date.UTC(g.getFullYear(), g.getMonth(), g.getDate(), g.getHours(), g.getMinutes(), g.getSeconds()) : g.valueOf(), p = this._get_rec_marker(u, r.id);
      if (p)
        o && (p.rec_type != "none" && m++, l.push(p));
      else {
        var d = new Date(g.valueOf() + 1e3 * r.event_length), f = this._copy_event(r);
        if (f.text = r.text, f.start_date = g, f.event_pid = r.id, f.id = r.id + "#" + Math.round(u / 1e3), f.end_date = d, f.end_date = e._fix_daylight_saving_date(f.start_date, f.end_date, r, g, f.end_date), f._timed = this.isOneDayEvent(f), !f._timed && !this._table_view && !this.config.multi_day)
          return;
        l.push(f), o || (this._events[f.id] = f, this._rec_temp.push(f)), m++;
      }
      g = this.date["add_" + r.rec_pattern](g, 1, r);
    }
  }, e._fix_daylight_saving_date = function(r, l, o, t, i) {
    var s = r.getTimezoneOffset() - l.getTimezoneOffset();
    return s ? s > 0 ? new Date(t.valueOf() + 1e3 * o.event_length - 60 * s * 1e3) : new Date(l.valueOf() - 60 * s * 1e3) : new Date(i.valueOf());
  }, e.getRecDates = function(r, l) {
    var o = typeof r == "object" ? r : e.getEvent(r), t = [];
    if (l = l || 100, !o.rec_type)
      return [{ start_date: o.start_date, end_date: o.end_date }];
    if (o.rec_type == "none")
      return [];
    e.repeat_date(o, t, !0, o.start_date, o.end_date, l);
    for (var i = [], s = 0; s < t.length; s++)
      t[s].rec_type != "none" && i.push({ start_date: t[s].start_date, end_date: t[s].end_date });
    return i;
  }, e.getEvents = function(r, l) {
    var o = [];
    for (var t in this._events) {
      var i = this._events[t];
      if (i && i.start_date < l && i.end_date > r)
        if (i.rec_pattern) {
          if (i.rec_pattern == "none")
            continue;
          var s = [];
          this.repeat_date(i, s, !0, r, l);
          for (var c = 0; c < s.length; c++)
            !s[c].rec_pattern && s[c].start_date < l && s[c].end_date > r && !this._rec_markers[s[c].id] && o.push(s[c]);
        } else
          this._is_virtual_event(i.id) || o.push(i);
    }
    return o;
  }, e.config.repeat_date = "%m.%d.%Y", e.config.lightbox.sections = [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "recurring", type: "recurring", map_to: "rec_type", button: "recurring" }, { name: "time", height: 72, type: "time", map_to: "auto" }], e._copy_dummy = function(r) {
    var l = new Date(this.start_date), o = new Date(this.end_date);
    this.start_date = l, this.end_date = o, this.event_length = this.event_pid = this.rec_pattern = this.rec_type = null;
  }, e.config.include_end_by = !1, e.config.lightbox_recurring = "ask", e.attachEvent("onClearAll", function() {
    e._rec_markers = {}, e._rec_markers_pull = {}, e._rec_temp = [];
  });
}, serialize: function(e) {
  const h = Be(e);
  e.data_attributes = function() {
    var a = [], n = e._helpers.formatDate, _ = h();
    for (var r in _) {
      var l = _[r];
      for (var o in l)
        o.substr(0, 1) != "_" && a.push([o, o == "start_date" || o == "end_date" ? n : null]);
      break;
    }
    return a;
  }, e.toXML = function(a) {
    var n = [], _ = this.data_attributes(), r = h();
    for (var l in r) {
      var o = r[l];
      n.push("<event>");
      for (var t = 0; t < _.length; t++)
        n.push("<" + _[t][0] + "><![CDATA[" + (_[t][1] ? _[t][1](o[_[t][0]]) : o[_[t][0]]) + "]]></" + _[t][0] + ">");
      n.push("</event>");
    }
    return (a || "") + "<data>" + n.join(`
`) + "</data>";
  }, e._serialize_json_value = function(a) {
    return a === null || typeof a == "boolean" ? a = "" + a : (a || a === 0 || (a = ""), a = '"' + a.toString().replace(/\n/g, "").replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'), a;
  }, e.toJSON = function() {
    return JSON.stringify(this.serialize());
  }, e.toICal = function(a) {
    var n = e.date.date_to_str("%Y%m%dT%H%i%s"), _ = e.date.date_to_str("%Y%m%d"), r = [], l = h();
    for (var o in l) {
      var t = l[o];
      r.push("BEGIN:VEVENT"), t._timed && (t.start_date.getHours() || t.start_date.getMinutes()) ? r.push("DTSTART:" + n(t.start_date)) : r.push("DTSTART:" + _(t.start_date)), t._timed && (t.end_date.getHours() || t.end_date.getMinutes()) ? r.push("DTEND:" + n(t.end_date)) : r.push("DTEND:" + _(t.end_date)), r.push("SUMMARY:" + t.text), r.push("END:VEVENT");
    }
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
DESCRIPTION:` + (a || "") + `
` + r.join(`
`) + `
END:VCALENDAR`;
  };
}, timeline: function(e) {
  function h() {
    var a = document.createElement("p");
    a.style.width = "100%", a.style.height = "200px";
    var n = document.createElement("div");
    n.style.position = "absolute", n.style.top = "0px", n.style.left = "0px", n.style.visibility = "hidden", n.style.width = "200px", n.style.height = "150px", n.style.overflow = "hidden", n.appendChild(a), document.body.appendChild(n);
    var _ = a.offsetWidth;
    n.style.overflow = "scroll";
    var r = a.offsetWidth;
    return _ == r && (r = n.clientWidth), document.body.removeChild(n), _ - r;
  }
  e.ext.timeline = { renderCells: function(a, n, _) {
    if (!a || !a.length)
      return;
    const r = [];
    for (let l = 0; l < a.length; l++) {
      const o = a[l];
      let t = "";
      o.$width && (t = "width:" + o.$width + "px;");
      let i = _;
      o.css && (i += " " + o.css), l === 0 && (i += " " + _ + "_first"), l === a.length - 1 && (i += " " + _ + "_last");
      const s = n(o) || "";
      r.push(`<div class='${i}' style='${t}'><div class='dhx_timeline_label_content_wrapper'>${s}</div></div>`);
    }
    return r.join("");
  }, renderHeading: function() {
    return this.renderCells(this.columns, function(a) {
      return a.label;
    }, "dhx_timeline_label_column dhx_timeline_label_column_header");
  }, renderColumns: function(a) {
    return this.renderCells(this.columns, function(n) {
      return n.template && n.template.call(self, a) || "";
    }, "dhx_timeline_label_column");
  }, scrollTo: function(a) {
    if (a) {
      var n;
      n = a.date ? a.date : a.left ? a.left : a;
      var _, r = -1;
      if (a.section ? r = this.getSectionTop(a.section) : a.top && (r = a.top), _ = typeof n == "number" ? n : this.posFromDate(n), e.config.rtl) {
        var l = +e.$container.querySelector(".dhx_timeline_label_wrapper").style.height.replace("px", ""), o = this._section_height[this.y_unit.length] + this._label_rows[this._label_rows.length - 1].top;
        this.scrollHelper.getMode() == this.scrollHelper.modes.minMax && (o > l || this.render == "tree") && (_ -= h());
      }
      var t = e.$container.querySelector(".dhx_timeline_data_wrapper");
      this.scrollable || (t = e.$container.querySelector(".dhx_cal_data")), this.scrollable && this.scrollHelper.setScrollValue(t, _), r > 0 && (t.scrollTop = r);
    }
  }, getScrollPosition: function() {
    return { left: this._x_scroll || 0, top: this._y_scroll || 0 };
  }, posFromDate: function(a) {
    return e._timeline_getX({ start_date: a }, !1, this) - 1;
  }, dateFromPos: function(a) {
    return e._timeline_drag_date(this, a);
  }, sectionFromPos: function(a) {
    var n = { y: a };
    return e._resolve_timeline_section(this, n), n.section;
  }, resolvePosition: function(a) {
    var n = { date: null, section: null };
    return a.left && (n.date = this.dateFromPos(a.left)), a.top && (n.section = this.sectionFromPos(a.top)), n;
  }, getSectionHeight: function(a) {
    return this._section_height[a];
  }, getSectionTop: function(a) {
    return this._rowStats[a].top;
  }, getEventTop: function(a) {
    var n = this.getEventHeight(a), _ = a._sorder || 0, r = 1 + _ * (n - 3) + (_ ? 2 * _ : 0);
    return e.config.cascade_event_display && (r = 1 + _ * e.config.cascade_event_margin + (_ ? 2 * _ : 0)), r;
  }, getEventHeight: function(a) {
    var n = this, _ = a[n.y_property], r = n.event_dy;
    return n.event_dy == "full" && (r = n.section_autoheight ? n.getSectionHeight(_) - 6 : n.dy - 3), n.resize_events && (r = Math.max(Math.floor(r / (a._count || 1)), n.event_min_dy)), r;
  } }, e._temp_matrix_scope = function() {
    function a(d, f) {
      if (f = f || [], d.children)
        for (var v = 0; v < d.children.length; v++)
          f.push(d.children[v].key), a(d.children[v], f);
      return f;
    }
    function n(d, f) {
      var v = f.order[d];
      return v === void 0 && (v = "$_" + d), v;
    }
    function _(d, f) {
      if (f[d.key] = d, d.children)
        for (var v = 0; v < d.children.length; v++)
          _(d.children[v], f);
    }
    function r(d, f) {
      for (var v, x = [], b = 0; b < f.y_unit.length; b++)
        x[b] = [];
      x[v] || (x[v] = []);
      var w = function(L) {
        for (var $ = {}, z = L.y_unit_original || L.y_unit, j = 0; j < z.length; j++)
          _(z[j], $);
        return $;
      }(f), k = f.render == "tree";
      function E(L, $, z, j) {
        L[$] || (L[$] = []);
        for (var P = z; P <= j; P++)
          L[$][P] || (L[$][P] = []), L[$][P].push(S);
      }
      k && (x.$tree = {});
      var D = f.y_property;
      for (b = 0; b < d.length; b++) {
        var S = d[b], N = S[D];
        v = n(N, f);
        var M = e._get_date_index(f, S.start_date), A = e._get_date_index(f, S.end_date);
        S.end_date.valueOf() == f._trace_x[A].valueOf() && (A -= 1), x[v] || (x[v] = []), E(x, v, M, A);
        var C = w[N];
        if (k && C && C.$parent)
          for (var T = {}; C.$parent; ) {
            if (T[C.key])
              throw new Error("Invalid sections tree. Section `{key:'" + C.key + "', label:'" + C.label + "'}` has the same key as one of its parents. Make sure all sections have unique keys");
            T[C.key] = !0;
            var O = w[C.$parent];
            E(x.$tree, O.key, M, A), C = O;
          }
      }
      return x;
    }
    e.matrix = {}, e._merge = function(d, f) {
      for (var v in f)
        d[v] === void 0 && (d[v] = f[v]);
    }, e.createTimelineView = function(d) {
      e._merge(d, { scrollHelper: Xt(), column_width: 100, autoscroll: { range_x: 200, range_y: 100, speed_x: 20, speed_y: 10 }, _is_new_view: !0, _section_autowidth: !0, _x_scroll: 0, _y_scroll: 0, _h_cols: {}, _label_rows: [], section_autoheight: !0, layout: "timeline", name: "matrix", x: "time", y: "time", x_step: 1, x_unit: "hour", y_unit: "day", y_step: 1, x_start: 0, x_size: 24, y_start: 0, y_size: 7, render: "cell", dx: 200, dy: 50, event_dy: e.xy.bar_height, event_min_dy: e.xy.bar_height, resize_events: !0, fit_events: !0, fit_events_offset: 0, show_unassigned: !1, second_scale: !1, round_position: !1, _logic: function(v, x, b) {
        var w = {};
        return e.checkEvent("onBeforeSectionRender") && (w = e.callEvent("onBeforeSectionRender", [v, x, b])), w;
      } }), d._original_x_start = d.x_start, d.x_unit != "day" && (d.first_hour = d.last_hour = 0), d._start_correction = d.first_hour ? 60 * d.first_hour * 60 * 1e3 : 0, d._end_correction = d.last_hour ? 60 * (24 - d.last_hour) * 60 * 1e3 : 0, e.checkEvent("onTimelineCreated") && e.callEvent("onTimelineCreated", [d]), we(d), e.attachEvent("onDestroy", function() {
        d.detachAllEvents();
      });
      var f = e.render_data;
      e.render_data = function(v, x) {
        if (this._mode != d.name)
          return f.apply(this, arguments);
        if (x && !d.show_unassigned && d.render != "cell")
          for (var b = 0; b < v.length; b++)
            this.clear_event(v[b]), this.render_timeline_event.call(this.matrix[this._mode], v[b], !0);
        else
          e._renderMatrix.call(d, !0, !0);
      }, e.matrix[d.name] = d, e.templates[d.name + "_cell_value"] = function(v) {
        return v ? v.length : "";
      }, e.templates[d.name + "_cell_class"] = function(v) {
        return "";
      }, e.templates[d.name + "_scalex_class"] = function(v) {
        return "";
      }, e.templates[d.name + "_second_scalex_class"] = function(v) {
        return "";
      }, e.templates[d.name + "_row_class"] = function(v, x) {
        return x.folder_events_available && v.children ? "folder" : "";
      }, e.templates[d.name + "_scaley_class"] = function(v, x, b) {
        return "";
      }, d.attachEvent("onBeforeRender", function() {
        return d.columns && d.columns.length && function(v, x) {
          var b = x.dx, w = 0, k = [];
          v.forEach(function(N) {
            N.width ? (w += N.width, N.$width = N.width) : k.push(N);
          });
          var E = !1, D = b - w;
          (D < 0 || k.length === 0) && (E = !0);
          var S = k.length;
          k.forEach(function(N) {
            N.$width = Math.max(Math.floor(D / S), 20), D -= N.$width, w += N.$width, S--;
          }), E && (x.dx = w);
        }(d.columns, d), !0;
      }), d.renderColumns = d.renderColumns || e.ext.timeline.renderColumns.bind(d), d.renderHeading = d.renderHeading || e.ext.timeline.renderHeading.bind(d), d.renderCells = d.renderCells || e.ext.timeline.renderCells.bind(d), e.templates[d.name + "_scale_label"] = function(v, x, b) {
        return d.columns && d.columns.length ? d.renderColumns(b) : x;
      }, e.templates[d.name + "_scale_header"] = function(v) {
        return d.columns ? v.renderHeading(v) : e.locale.labels[d.name + "_scale_header"] || "";
      }, e.templates[d.name + "_tooltip"] = function(v, x, b) {
        return b.text;
      }, e.templates[d.name + "_date"] = function(v, x) {
        return v.getDay() == x.getDay() && x - v < 864e5 || +v == +e.date.date_part(new Date(x)) || +e.date.add(v, 1, "day") == +x && x.getHours() === 0 && x.getMinutes() === 0 ? e.templates.day_date(v) : v.getDay() != x.getDay() && x - v < 864e5 ? e.templates.day_date(v) + " &ndash; " + e.templates.day_date(x) : e.templates.week_date(v, x);
      }, e.templates[d.name + "_scale_date"] = e.date.date_to_str(d.x_date || e.config.hour_date), e.templates[d.name + "_second_scale_date"] = e.date.date_to_str(d.second_scale && d.second_scale.x_date ? d.second_scale.x_date : e.config.hour_date), e.date["add_" + d.name + "_private"] = function(v, x) {
        var b = x, w = d.x_unit;
        if (d.x_unit == "minute" || d.x_unit == "hour") {
          var k = b;
          d.x_unit == "hour" && (k *= 60), k % 1440 || (b = k / 1440, w = "day");
        }
        return e.date.add(v, b, w);
      }, e.date["add_" + d.name] = function(v, x, b) {
        var w = e.date["add_" + d.name + "_private"](v, (d.x_length || d.x_size) * d.x_step * x);
        if (d.x_unit == "minute" || d.x_unit == "hour") {
          var k = d.x_length || d.x_size, E = d.x_unit == "hour" ? 60 * d.x_step : d.x_step;
          if (E * k % 1440)
            if (+e.date.date_part(new Date(v)) == +e.date.date_part(new Date(w)))
              d.x_start += x * k;
            else {
              var D = 1440 / (k * E) - 1, S = Math.round(D * k);
              d.x_start = x > 0 ? d.x_start - S : S + d.x_start;
            }
        }
        return w;
      }, e.date[d.name + "_start"] = function(v) {
        var x = (e.date[d.x_unit + "_start"] || e.date.day_start).call(e.date, v), b = x.getTimezoneOffset(), w = (x = e.date.add(x, d.x_step * d.x_start, d.x_unit)).getTimezoneOffset();
        return b != w && x.setTime(x.getTime() + 6e4 * (w - b)), x;
      }, d._smartRenderingEnabled = function() {
        var v = null;
        (this.scrollable || this.smart_rendering) && (v = e._timeline_smart_render.getViewPort(this.scrollHelper, this._sch_height));
        var x = !!v;
        return !!(this.scrollable ? this.smart_rendering !== !1 && x : this.smart_rendering && x);
      }, d.scrollTo = d.scrollTo || e.ext.timeline.scrollTo.bind(d), d.getScrollPosition = d.getScrollPosition || e.ext.timeline.getScrollPosition.bind(d), d.posFromDate = d.posFromDate || e.ext.timeline.posFromDate.bind(d), d.dateFromPos = d.dateFromPos || e.ext.timeline.dateFromPos.bind(d), d.sectionFromPos = d.sectionFromPos || e.ext.timeline.sectionFromPos.bind(d), d.resolvePosition = d.resolvePosition || e.ext.timeline.resolvePosition.bind(d), d.getSectionHeight = d.getSectionHeight || e.ext.timeline.getSectionHeight.bind(d), d.getSectionTop = d.getSectionTop || e.ext.timeline.getSectionTop.bind(d), d.getEventTop = d.getEventTop || e.ext.timeline.getEventTop.bind(d), d.getEventHeight = d.getEventHeight || e.ext.timeline.getEventHeight.bind(d), d.selectEvents = e.bind(function(v) {
        var x = v.section, b = v.date, w = v.selectNested;
        return b ? function(k, E, D, S) {
          var N = e._timeline_smart_render.getPreparedEvents(S), M = [], A = [], C = S.order[k], T = S.y_unit[C];
          if (!T)
            return [];
          var O = e._get_date_index(S, E);
          return N.$matrix ? (M = N.$matrix[C][O] || [], D && N.$matrix.$tree && N.$matrix.$tree[T.key] && (A = N.$matrix.$tree[T.key][O] || []), M.concat(A)) : N[C] || [];
        }(x, b, w, this) : x ? function(k, E, D) {
          var S = e._timeline_smart_render.getPreparedEvents(D), N = D.order[k], M = D.y_unit[N];
          if (!M)
            return [];
          var A = [k];
          E && a(M, A);
          for (var C = [], T = 0; T < A.length; T++)
            if ((N = D.order[A[T]]) !== void 0 && S[N])
              C = C.concat(S[N]);
            else if (S.undefined)
              for (var O = 0; O < S.undefined.length; O++) {
                var L = S.undefined[O];
                L[D.y_property] == A[T] && C.push(L);
              }
          return C;
        }(x, w, this) : void 0;
      }, d), d.setRange = e.bind(function(v, x) {
        var b = e.date[this.name + "_start"](new Date(v)), w = function(k, E, D) {
          for (var S = 0, N = e.date[D.name + "_start"](new Date(k)), M = D.x_step, A = D.x_unit; N < E; )
            S++, N = e.date.add(N, M, A);
          return S;
        }(v, x, this);
        this.x_size = w, e.setCurrentView(b, this.name);
      }, d), e.callEvent("onOptionsLoad", [d]), e[d.name + "_view"] = function(v) {
        v ? e._set_timeline_dates(d) : e._renderMatrix.apply(d, arguments);
      }, e["mouse_" + d.name] = function(v) {
        var x = this._drag_event;
        if (this._drag_id && (x = this.getEvent(this._drag_id)), d.scrollable && !v.converted) {
          if (v.converted = 1, v.x += -d.dx + d._x_scroll, e.config.rtl) {
            var b = +e.$container.querySelector(".dhx_timeline_label_wrapper").style.height.replace("px", ""), w = d._section_height[d.y_unit.length] + d._label_rows[d._label_rows.length - 1].top;
            v.x += e.xy.scale_width, d.scrollHelper.getMode() == d.scrollHelper.modes.minMax && (w > b || d.render == "tree") && (v.x += h());
          }
          v.y += d._y_scroll;
        } else
          e.config.rtl ? v.x -= d.dx - e.xy.scale_width : v.x -= d.dx;
        var k = e._timeline_drag_date(d, v.x);
        if (v.x = 0, v.force_redraw = !0, v.custom = !0, this._drag_mode == "move" && this._drag_id && this._drag_event) {
          x = this.getEvent(this._drag_id);
          var E = this._drag_event;
          if (v._ignores = this._ignores_detected || d._start_correction || d._end_correction, E._move_delta === void 0 && (E._move_delta = (x.start_date - k) / 6e4, this.config.preserve_length && v._ignores && (E._move_delta = this._get_real_event_length(x.start_date, k, d), E._event_length = this._get_real_event_length(x.start_date, x.end_date, d))), this.config.preserve_length && v._ignores) {
            var D = this._get_fictional_event_length(k, E._move_delta, d, !0);
            k = new Date(k - D);
          } else
            k = e.date.add(k, E._move_delta, "minute");
        }
        if (this._drag_mode == "resize" && x && (this.config.timeline_swap_resize && this._drag_id && (this._drag_from_start && +k > +x.end_date ? this._drag_from_start = !1 : !this._drag_from_start && +k < +x.start_date && (this._drag_from_start = !0)), v.resize_from_start = this._drag_from_start, !this.config.timeline_swap_resize && this._drag_id && this._drag_from_start && +k >= +e.date.add(x.end_date, -e.config.time_step, "minute") && (k = e.date.add(x.end_date, -e.config.time_step, "minute"))), d.round_position)
          switch (this._drag_mode) {
            case "move":
              this.config.preserve_length || (k = e._timeline_get_rounded_date.call(d, k, !1), d.x_unit == "day" && (v.custom = !1));
              break;
            case "resize":
              this._drag_event && (this._drag_event._resize_from_start !== null && this._drag_event._resize_from_start !== void 0 || (this._drag_event._resize_from_start = v.resize_from_start), v.resize_from_start = this._drag_event._resize_from_start, k = e._timeline_get_rounded_date.call(d, k, !this._drag_event._resize_from_start));
          }
        this._resolve_timeline_section(d, v), v.section && this._update_timeline_section({ pos: v, event: this.getEvent(this._drag_id), view: d }), v.y = Math.round((this._correct_shift(k, 1) - this._min_date) / (6e4 * this.config.time_step)), v.shift = this.config.time_step, d.round_position && this._drag_mode == "new-size" && k <= this._drag_start && (v.shift = e.date.add(this._drag_start, d.x_step, d.x_unit) - this._drag_start);
        var S = this._is_pos_changed(this._drag_pos, v);
        return this._drag_pos && S && (this._drag_event._dhx_changed = !0), S || this._drag_pos.has_moved || (v.force_redraw = !1), v;
      };
    }, e._prepare_timeline_events = function(d) {
      var f = [];
      if (d.render == "cell")
        f = e._timeline_trace_events.call(d);
      else {
        for (var v = e.get_visible_events(), x = d.order, b = 0; b < v.length; b++) {
          var w = v[b], k = w[d.y_property], E = d.order[k];
          if (d.show_unassigned && !k) {
            for (var D in x)
              if (x.hasOwnProperty(D)) {
                f[E = x[D]] || (f[E] = []);
                var S = e._lame_copy({}, w);
                S[d.y_property] = D, f[E].push(S);
                break;
              }
          } else
            f[E] || (f[E] = []), f[E].push(w);
        }
        f.$matrix = e._timeline_trace_events.call(d);
      }
      return f;
    }, e._populate_timeline_rendered = function(d) {
      e._rendered = [];
      const f = d.querySelector(".dhx_timeline_data_col"), v = Array.prototype.slice.call(f.children);
      e._timeline_smart_render && e._timeline_smart_render._rendered_events_cache && (e._timeline_smart_render._rendered_events_cache = []), v.forEach(function(x) {
        const b = Number(x.getAttribute("data-section-index"));
        Array.prototype.slice.call(x.children).forEach(function(w) {
          const k = w.getAttribute(e.config.event_attribute);
          if (k && (e._rendered.push(w), e._timeline_smart_render && e._timeline_smart_render._rendered_events_cache)) {
            const E = e._timeline_smart_render._rendered_events_cache;
            E[b] || (E[b] = []), E[b].push(k);
          }
        });
      });
    }, e.render_timeline_event = function(d, f) {
      var v = d[this.y_property];
      if (!v)
        return "";
      var x = d._sorder, b = e._timeline_getX(d, !1, this), w = e._timeline_getX(d, !0, this), k = e._get_timeline_event_height ? e._get_timeline_event_height(d, this) : this.getEventHeight(d), E = k - 2;
      d._inner || this.event_dy != "full" || (E = (E + 1) * (d._count - x) - 2);
      var D = e._get_timeline_event_y ? e._get_timeline_event_y(d._sorder, k) : this.getEventTop(d), S = k + D + 2;
      (!this._events_height[v] || this._events_height[v] < S) && (this._events_height[v] = S);
      var N = e.templates.event_class(d.start_date, d.end_date, d);
      N = "dhx_cal_event_line " + (N || ""), e.getState().select_id == d.id && (N += " dhx_cal_event_selected"), d._no_drag_move && (N += " no_drag_move");
      var M = d.color ? "--dhx-scheduler-event-background:" + d.color + ";" : "", A = d.textColor ? "--dhx-scheduler-event-color:" + d.textColor + ";" : "", C = e.templates.event_bar_text(d.start_date, d.end_date, d);
      const T = Math.max(0, w - b);
      T < 70 && (N += " dhx_cal_event--small"), T < 40 && (N += " dhx_cal_event--xsmall");
      var O = "<div " + e._waiAria.eventBarAttrString(d) + " event_id='" + d.id + "' " + e.config.event_attribute + "='" + d.id + "' class='" + N + "' style='" + M + A + "position:absolute; top:" + D + "px; height: " + E + "px; " + (e.config.rtl ? "right:" : "left:") + b + "px; width:" + T + "px;" + (d._text_style || "") + "'>";
      if (e.config.drag_resize && !e.config.readonly) {
        var L = "dhx_event_resize", $ = E + 1, z = "<div class='" + L + " " + L + "_start' style='height: " + $ + "px;'></div>", j = "<div class='" + L + " " + L + "_end' style='height: " + $ + "px;'></div>";
        O += (d._no_resize_start ? "" : z) + (d._no_resize_end ? "" : j);
      }
      if (O += C + "</div>", !f)
        return O;
      var P = document.createElement("div");
      P.innerHTML = O;
      var I = this._scales[v];
      I && (e._rendered.push(P.firstChild), I.appendChild(P.firstChild));
    };
    var l = function(d) {
      return String(d).replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    };
    function o(d) {
      return d.height && !isNaN(Number(d.height));
    }
    function t(d) {
      return e._helpers.formatDate(d);
    }
    function i(d, f) {
      var v = d.querySelector(".dhx_timeline_data_wrapper");
      return f.scrollable || (v = e.$container.querySelector(".dhx_cal_data")), v;
    }
    function s() {
      return e.$container.querySelector(".dhx_cal_data .dhx_timeline_label_col");
    }
    e._timeline_trace_events = function() {
      return r(e.get_visible_events(), this);
    }, e._timeline_getX = function(d, f, v) {
      var x = 0, b = v._step, w = v.round_position, k = 0, E = f ? d.end_date : d.start_date;
      E.valueOf() > e._max_date.valueOf() && (E = e._max_date);
      var D = E - e._min_date_timeline;
      if (D > 0) {
        var S = e._get_date_index(v, E);
        e._ignores[S] && (w = !0);
        for (var N = 0; N < S; N++)
          x += e._cols[N];
        var M = e._timeline_get_rounded_date.apply(v, [E, !1]);
        w ? +E > +M && f && (k = e._cols[S]) : (D = E - M, v.first_hour || v.last_hour ? ((D -= v._start_correction) < 0 && (D = 0), (k = Math.round(D / b)) > e._cols[S] && (k = e._cols[S])) : k = Math.round(D / b));
      }
      return x += f && (D === 0 || w) ? k - 1 : k;
    }, e._timeline_get_rounded_date = function(d, f) {
      var v = e._get_date_index(this, d), x = this._trace_x[v];
      return f && +d != +this._trace_x[v] && (x = this._trace_x[v + 1] ? this._trace_x[v + 1] : e.date.add(this._trace_x[v], this.x_step, this.x_unit)), new Date(x);
    }, e._timeline_skip_ignored = function(d) {
      if (e._ignores_detected)
        for (var f, v, x, b, w = 0; w < d.length; w++) {
          for (b = d[w], x = !1, f = e._get_date_index(this, b.start_date), v = e._get_date_index(this, b.end_date); f < v; ) {
            if (!e._ignores[f]) {
              x = !0;
              break;
            }
            f++;
          }
          x || f != v || e._ignores[v] || +b.end_date > +this._trace_x[v] && (x = !0), x || (d.splice(w, 1), w--);
        }
    }, e._timeline_calculate_event_positions = function(d) {
      if (d && this.render != "cell") {
        e._timeline_skip_ignored.call(this, d), d.sort(this.sort || function($, z) {
          return $.start_date.valueOf() == z.start_date.valueOf() ? $.id > z.id ? 1 : -1 : $.start_date > z.start_date ? 1 : -1;
        });
        for (var f = [], v = d.length, x = -1, b = null, w = 0; w < v; w++) {
          var k = d[w];
          k._inner = !1;
          for (var E = this.round_position ? e._timeline_get_rounded_date.apply(this, [k.start_date, !1]) : k.start_date; f.length && f[f.length - 1].end_date.valueOf() <= E.valueOf(); )
            f.splice(f.length - 1, 1);
          for (var D = !1, S = 0; S < f.length; S++) {
            var N = f[S];
            if (N.end_date.valueOf() <= E.valueOf()) {
              D = !0, k._sorder = N._sorder, f.splice(S, 1), k._inner = !0;
              break;
            }
          }
          if (f.length && (f[f.length - 1]._inner = !0), !D)
            if (f.length)
              if (f.length <= f[f.length - 1]._sorder) {
                if (f[f.length - 1]._sorder)
                  for (var M = 0; M < f.length; M++) {
                    for (var A = !1, C = 0; C < f.length; C++)
                      if (f[C]._sorder == M) {
                        A = !0;
                        break;
                      }
                    if (!A) {
                      k._sorder = M;
                      break;
                    }
                  }
                else
                  k._sorder = 0;
                k._inner = !0;
              } else {
                for (var T = f[0]._sorder, O = 1; O < f.length; O++)
                  f[O]._sorder > T && (T = f[O]._sorder);
                k._sorder = T + 1, x < k._sorder && (x = k._sorder, b = k), k._inner = !1;
              }
            else
              k._sorder = 0;
          f.push(k), f.length > (f.max_count || 0) ? (f.max_count = f.length, k._count = f.length) : k._count = k._count ? k._count : 1;
        }
        for (var L = 0; L < d.length; L++)
          d[L]._count = f.max_count, e._register_copy && e._register_copy(d[L]);
        (b || d[0]) && e.render_timeline_event.call(this, b || d[0], !1);
      }
    }, e._timeline_get_events_html = function(d) {
      var f = "";
      if (d && this.render != "cell")
        for (var v = 0; v < d.length; v++)
          f += e.render_timeline_event.call(this, d[v], !1);
      return f;
    }, e._timeline_update_events_html = function(d) {
      var f = "";
      if (d && this.render != "cell") {
        var v = e.getView(), x = {};
        d.forEach(function(w) {
          var k, E;
          x[k = w.id, E = w[v.y_property], k + "_" + E] = !0;
        });
        for (var b = 0; b < d.length; b++)
          f += e.render_timeline_event.call(this, d[b], !1);
      }
      return f;
    }, e._timeline_get_block_stats = function(d, f) {
      var v = {};
      return f._sch_height = d.offsetHeight, v.style_data_wrapper = (e.config.rtl ? "padding-right:" : "padding-left:") + f.dx + "px;", v.style_label_wrapper = "width: " + f.dx + "px;", f.scrollable ? (v.style_data_wrapper += "height:" + (f._sch_height - 1) + "px;", f.html_scroll_width === void 0 && (f.html_scroll_width = h()), f._section_autowidth ? f.custom_scroll_width = 0 : f.custom_scroll_width = f.html_scroll_width, v.style_label_wrapper += "height:" + (f._sch_height - 1 - f.custom_scroll_width) + "px;") : (v.style_data_wrapper += "height:" + (f._sch_height - 1) + "px;", v.style_label_wrapper += "height:" + (f._sch_height - 1) + "px;overflow:visible;"), v;
    }, e._timeline_get_cur_row_stats = function(d, f) {
      var v = d.y_unit[f], x = d._logic(d.render, v, d);
      if (e._merge(x, { height: d.dy }), d.section_autoheight && !o(v)) {
        var b = function(E, D) {
          var S = 0, N = E.y_unit.length, M = 0;
          return E.y_unit.forEach(function(A) {
            o(A) && (S += Number(A.height), M += Number(A.height), N--);
          }), { totalHeight: S += N * D, rowsWithDefaultHeight: N, totalCustomHeight: M };
        }(d, x.height), w = d.scrollable ? d._sch_height - e.xy.scroll_width : d._sch_height;
        b.totalHeight < w && b.rowsWithDefaultHeight > 0 && (x.height = Math.max(x.height, Math.floor((w - 1 - b.totalCustomHeight) / b.rowsWithDefaultHeight)));
      }
      if (o(v) && (x.height = Number(v.height)), d._section_height[v.key] = x.height, !x.td_className) {
        x.td_className = "dhx_matrix_scell";
        var k = e.templates[d.name + "_scaley_class"](d.y_unit[f].key, d.y_unit[f].label, d.y_unit[f]);
        k && (x.td_className += " " + k), d.columns && (x.td_className += " dhx_matrix_scell_columns");
      }
      return x.td_content || (x.td_content = e.templates[d.name + "_scale_label"](d.y_unit[f].key, d.y_unit[f].label, d.y_unit[f])), e._merge(x, { tr_className: "", style_height: "height:" + x.height + "px;", style_width: "width:" + d.dx + "px;", summ_width: "width:" + d._summ + "px;", table_className: "" }), x;
    }, e._timeline_get_fit_events_stats = function(d, f, v) {
      if (d.fit_events) {
        var x = d._events_height[d.y_unit[f].key] || 0;
        d.fit_events_offset && (x += d.fit_events_offset), v.height = x > v.height ? x : v.height, v.style_height = "height:" + v.height + "px;", v.style_line_height = "line-height:" + (v.height - 1) + "px;", d._section_height[d.y_unit[f].key] = v.height;
      }
      return v.style_height = "height:" + v.height + "px;", v.style_line_height = "line-height:" + (v.height - 1) + "px;", d._section_height[d.y_unit[f].key] = v.height, v;
    }, e._timeline_set_scroll_pos = function(d, f) {
      var v = d.querySelector(".dhx_timeline_data_wrapper");
      v.scrollTop = f._y_scroll || 0, f.scrollHelper.setScrollValue(v, f._x_scroll || 0), f.scrollHelper.getMode() != f.scrollHelper.modes.maxMin && v.scrollLeft == f._summ - v.offsetWidth + f.dx && (v.scrollLeft += h());
    }, e._timeline_save_scroll_pos = function(d, f, v, x) {
      d._y_scroll = f || 0, d._x_scroll = v || 0;
    }, e._timeline_get_html_for_cell_data_row = function(d, f, v, x, b) {
      var w = "";
      return b.template && (w += " " + (b.template(b.section, b.view) || "")), "<div class='dhx_timeline_data_row" + w + "' data-section-id='" + l(x) + "' data-section-index='" + d + "' style='" + f.summ_width + f.style_height + " position:absolute; top:" + v + "px;'>";
    }, e._timeline_get_html_for_cell_ignores = function(d) {
      return '<div class="dhx_matrix_cell dhx_timeline_data_cell" style="' + d.style_height + d.style_line_height + ';display:none"></div>';
    }, e._timeline_get_html_for_cell = function(d, f, v, x, b, w) {
      var k = v._trace_x[d], E = v.y_unit[f], D = e._cols[d], S = t(k), N = e.templates[v.name + "_cell_value"](x, k, E);
      return "<div data-col-id='" + d + "' data-col-date='" + S + "' class='dhx_matrix_cell dhx_timeline_data_cell " + e.templates[v.name + "_cell_class"](x, k, E) + "' style='width:" + D + "px;" + b.style_height + b.style_line_height + (e.config.rtl ? " right:" : "  left:") + w + "px;'><div style='width:auto'>" + N + "</div></div>";
    }, e._timeline_get_html_for_bar_matrix_line = function(d, f, v, x) {
      return "<div style='" + f.summ_width + " " + f.style_height + " position:absolute; top:" + v + "px;' data-section-id='" + l(x) + "' data-section-index='" + d + "' class='dhx_matrix_line'>";
    }, e._timeline_get_html_for_bar_data_row = function(d, f) {
      var v = d.table_className;
      return f.template && (v += " " + (f.template(f.section, f.view) || "")), "<div class='dhx_timeline_data_row " + v + "' style='" + d.summ_width + " " + d.style_height + "' >";
    }, e._timeline_get_html_for_bar_ignores = function() {
      return "";
    }, e._timeline_get_html_for_bar = function(d, f, v, x, b, w) {
      var k = t(v._trace_x[d]), E = v.y_unit[f], D = "";
      v.cell_template && (D = e.templates[v.name + "_cell_value"](x, v._trace_x[d], E, w));
      var S = "line-height:" + v._section_height[E.key] + "px;";
      let N = "";
      return D && (N = "<div style='width:auto; height:100%;position:relative;" + S + "'>" + D + "</div>"), "<div class='dhx_matrix_cell dhx_timeline_data_cell " + e.templates[v.name + "_cell_class"](x, v._trace_x[d], E, w) + "' style='width:" + e._cols[d] + "px; " + (e.config.rtl ? "right:" : "left:") + b + "px;'  data-col-id='" + d + "' data-col-date='" + k + "' >" + N + "</div>";
    }, e._timeline_render_scale_header = function(d, f) {
      var v = e.$container.querySelector(".dhx_timeline_scale_header");
      if (v && v.remove(), !f)
        return;
      v = document.createElement("div");
      var x = "dhx_timeline_scale_header";
      d.second_scale && (x += " dhx_timeline_second_scale");
      var b = e.xy.scale_height;
      v.className = x, v.style.cssText = ["width:" + d.dx + "px", "height:" + b + "px", "line-height:" + b + "px", "top:0px", e.config.rtl ? "right:0px" : "left:0px"].join(";"), v.innerHTML = e.templates[d.name + "_scale_header"](d);
      const w = e.$container.querySelector(".dhx_cal_header");
      v.style.top = `${w.offsetTop}px`, v.style.height = `${w.offsetHeight}px`, e.$container.appendChild(v);
    }, e._timeline_y_scale = function(d) {
      var f = e._timeline_get_block_stats(d, this), v = this.scrollable ? " dhx_timeline_scrollable_data" : "", x = "<div class='dhx_timeline_table_wrapper'>", b = "<div class='dhx_timeline_label_wrapper' style='" + f.style_label_wrapper + "'><div class='dhx_timeline_label_col'>", w = "<div class='dhx_timeline_data_wrapper" + v + "' style='" + f.style_data_wrapper + "'><div class='dhx_timeline_data_col'>";
      e._load_mode && e._load(), e._timeline_smart_render.clearPreparedEventsCache(k);
      var k = e._timeline_smart_render.getPreparedEvents(this);
      e._timeline_smart_render.cachePreparedEvents(k);
      for (var E = 0, D = 0; D < e._cols.length; D++)
        E += e._cols[D];
      var S = /* @__PURE__ */ new Date(), N = e._cols.length - e._ignores_detected;
      S = (e.date.add(S, this.x_step * N, this.x_unit) - S - (this._start_correction + this._end_correction) * N) / E, this._step = S, this._summ = E;
      var M = e._colsS.heights = [], A = [];
      this._render_stats = A, this._events_height = {}, this._section_height = {}, this._label_rows = [];
      var C = !1, T = null;
      (this.scrollable || this.smart_rendering) && (T = e._timeline_smart_render.getViewPort(this.scrollHelper, this._sch_height)), e._timeline_smart_render._rendered_labels_cache = [], e._timeline_smart_render._rendered_events_cache = [];
      var O = !!T, L = this._smartRenderingEnabled(), $ = function(q, V) {
        for (var ge = [], J = {}, ne = 0, G = 0; G < q.y_unit.length; G++) {
          e._timeline_calculate_event_positions.call(q, V[G]);
          var re = e._timeline_get_cur_row_stats(q, G);
          (re = e._timeline_get_fit_events_stats(q, G, re)).top = ne, ge.push(re), J[q.y_unit[G].key] = re, ne += re.height;
        }
        return { totalHeight: ne, rowStats: ge, rowStatsByKey: J };
      }(this, k);
      T && $.totalHeight < T.scrollTop && (T.scrollTop = Math.max(0, $.totalHeight - T.height)), this._rowStats = $.rowStatsByKey;
      for (var z = 0; z < this.y_unit.length; z++) {
        var j = $.rowStats[z], P = this.y_unit[z], I = j.top, Y = "<div class='dhx_timeline_label_row " + j.tr_className + "' style='top:" + I + "px;" + j.style_height + j.style_line_height + "'data-row-index='" + z + "' data-row-id='" + l(P.key) + "'><div class='" + j.td_className + "' style='" + j.style_width + " height:" + j.height + "px;' " + e._waiAria.label(j.td_content) + ">" + j.td_content + "</div></div>";
        if (L && this._label_rows.push({ div: Y, top: I, section: P }), L && (e._timeline_smart_render.isInYViewPort({ top: I, bottom: I + j.height }, T) || (C = !0)), C)
          C = !1;
        else {
          b += Y, L && e._timeline_smart_render._rendered_labels_cache.push(z);
          var W = { view: this, section: P, template: e.templates[this.name + "_row_class"] }, B = 0;
          if (this.render == "cell") {
            w += e._timeline_get_html_for_cell_data_row(z, j, j.top, P.key, W);
            for (var R = 0; R < e._cols.length; R++)
              e._ignores[R] && !L ? w += e._timeline_get_html_for_cell_ignores(j) : L && O ? e._timeline_smart_render.isInXViewPort({ left: B, right: B + e._cols[R] }, T) && (w += e._timeline_get_html_for_cell(R, z, this, k[z][R], j, B)) : w += e._timeline_get_html_for_cell(R, z, this, k[z][R], j, B), B += e._cols[R];
            w += "</div>";
          } else {
            w += e._timeline_get_html_for_bar_matrix_line(z, j, j.top, P.key);
            var K = k[z];
            for (L && O && (K = e._timeline_smart_render.getVisibleEventsForRow(this, T, k, z)), w += e._timeline_get_events_html.call(this, K), w += e._timeline_get_html_for_bar_data_row(j, W), R = 0; R < e._cols.length; R++)
              e._ignores[R] ? w += e._timeline_get_html_for_bar_ignores() : L && O ? e._timeline_smart_render.isInXViewPort({ left: B, right: B + e._cols[R] }, T) && (w += e._timeline_get_html_for_bar(R, z, this, k[z], B)) : w += e._timeline_get_html_for_bar(R, z, this, k[z], B), B += e._cols[R];
            w += "</div></div>";
          }
        }
        j.sectionKey = P.key, A.push(j);
      }
      x += b + "</div></div>", x += w + "</div></div>", x += "</div>", this._matrix = k, d.innerHTML = x, L && e._timeline_smart_render && (e._timeline_smart_render._rendered_events_cache = []), e._populate_timeline_rendered(d);
      const fe = d.querySelectorAll("[data-section-id]"), ve = {};
      fe.forEach(function(q) {
        ve[q.getAttribute("data-section-id")] = q;
      }), this._divBySectionId = ve, L && (e.$container.querySelector(".dhx_timeline_data_col").style.height = $.totalHeight + "px"), this._scales = {}, D = 0;
      for (var ye = A.length; D < ye; D++) {
        M.push(A[D].height);
        var oe = A[D].sectionKey;
        e._timeline_finalize_section_add(this, oe, this._divBySectionId[oe]);
      }
      (L || this.scrollable) && function(q, V, ge) {
        V._is_ev_creating = !1;
        var J = i(q, V), ne = e._els.dhx_cal_header[0], G = q.querySelector(".dhx_timeline_label_wrapper");
        if (G && !G.$eventsAttached) {
          G.$eventsAttached = !0;
          var re = { pageX: 0, pageY: 0 };
          e.event(G, "touchstart", function(Z) {
            var ae = Z;
            Z.touches && (ae = Z.touches[0]), re = { pageX: ae.pageX, pageY: ae.pageY };
          }, { passive: !1 }), e.event(G, "touchmove", function(Z) {
            var ae = Z;
            Z.touches && (ae = Z.touches[0]);
            var me = re.pageY - ae.pageY;
            re = { pageX: ae.pageX, pageY: ae.pageY }, me && (J.scrollTop += me), Z && Z.preventDefault && Z.preventDefault();
          }, { passive: !1 });
        }
        if (!J.$eventsAttached) {
          let me = function(F) {
            let U = !0;
            var Q = e.env.isFF, X = Q ? F.deltaX : F.wheelDeltaX, ee = Q ? F.deltaY : F.wheelDelta, te = -20;
            Q && (te = F.deltaMode !== 0 ? -40 : -10);
            var ce = 1, he = 1, pe = Q ? X * te * ce : 2 * X * ce, se = Q ? ee * te * he : ee * he;
            if (pe && Math.abs(pe) > Math.abs(se)) {
              var ue = pe / -40;
              J.scrollLeft += 30 * ue, J.scrollLeft === Z && (U = !1);
            } else
              ue = se / -40, se === void 0 && (ue = F.detail), J.scrollTop += 30 * ue, J.scrollTop === ae && (U = !1);
            if (U)
              return F.preventDefault(), F.cancelBubble = !0, !1;
          }, Z, ae;
          J.$eventsAttached = !0, e.event(J, "mousewheel", me, { passive: !1 }), e.event(G, "mousewheel", me, { passive: !1 }), e.event(J, "scroll", function(F) {
            if (e.getState().mode === V.name) {
              var U = i(q, V);
              F.preventDefault();
              var Q = U.scrollTop, X = V.scrollHelper.getScrollValue(U);
              Z = X, ae = Q;
              var ee = V._summ - e.$container.querySelector(".dhx_cal_data").offsetWidth + V.dx + V.custom_scroll_width, te = e._timeline_smart_render.getViewPort(V.scrollHelper, 0, X, Q), ce = s();
              if (V.scrollable && (ce.style.top = -Q + "px"), V.smart_rendering !== !1) {
                if ((X !== V._x_scroll || V._is_ev_creating) && (V.second_scale ? e._timeline_smart_render.updateHeader(V, te, ne.children[1]) : e._timeline_smart_render.updateHeader(V, te, ne.children[0])), e.config.rtl) {
                  var he = +e.$container.querySelector(".dhx_timeline_label_wrapper").style.height.replace("px", ""), pe = V._section_height[V.y_unit.length] + V._label_rows[V._label_rows.length - 1].top;
                  V.scrollHelper.getMode() == V.scrollHelper.modes.minMax && (pe > he || V.render == "tree") ? ne.style.right = -1 - X - h() + "px" : ne.style.right = -1 - X + "px", ne.style.left = "unset";
                } else
                  ne.style.left = -1 - X + "px";
                if ((V._options_changed || Q !== V._y_scroll || V._is_ev_creating) && e._timeline_smart_render.updateLabels(V, te, ce), V._is_ev_creating = !1, e._timeline_smart_render.updateGridCols(V, te), e._timeline_smart_render.updateGridRows(V, te), V.render != "cell") {
                  if (cancelAnimationFrame(void 0), V.name !== e.getState().mode)
                    return;
                  e._timeline_smart_render.updateEvents(V, te);
                }
                var se, ue = 0;
                V._scales = {}, se = V.render === "cell" ? U.querySelectorAll(".dhx_timeline_data_col .dhx_timeline_data_row") : U.querySelectorAll(".dhx_timeline_data_col .dhx_matrix_line");
                for (var Je = V._render_stats, _e = 0, ke = se.length; _e < ke; _e++) {
                  var Ce = se[_e].getAttribute("data-section-id"), Te = V.order[Ce];
                  ge[Te] = Je[Te].height, V._scales[Ce] = se[_e];
                }
                for (_e = 0, ke = ge.length; _e < ke; _e++)
                  ue += ge[_e];
                e.$container.querySelector(".dhx_timeline_data_col").style.height = ue + "px";
                var Oe = Q, Le = X;
                e._timeline_save_scroll_pos(V, Oe, Le, ee), V.callEvent("onScroll", [Le, Oe]), V._is_new_view = !1;
              }
            }
          }, { passive: !1 });
          var xe = { pageX: 0, pageY: 0 };
          e.event(J, "touchstart", function(F) {
            var U = F;
            F.touches && (U = F.touches[0]), xe = { pageX: U.pageX, pageY: U.pageY };
          }, { passive: !1 }), e.event(J, "touchmove", function(F) {
            var U = F;
            F.touches && (U = F.touches[0]);
            var Q = s(), X = xe.pageX - U.pageX, ee = xe.pageY - U.pageY;
            if (xe = { pageX: U.pageX, pageY: U.pageY }, (X || ee) && !e.getState().drag_id) {
              var te = Math.abs(X), ce = Math.abs(ee), he = Math.sqrt(X * X + ee * ee);
              te / he < 0.42 ? X = 0 : ce / he < 0.42 && (ee = 0), V.scrollHelper.setScrollValue(J, V.scrollHelper.getScrollValue(J) + X), J.scrollTop += ee, V.scrollable && ee && (Q.style.top = -J.scrollTop + "px");
            }
            return F && F.preventDefault && F.preventDefault(), !1;
          }, { passive: !1 });
        }
        V.scroll_position && V._is_new_view ? V.scrollTo(V.scroll_position) : e._timeline_set_scroll_pos(q, V), V._is_ev_creating = !0;
      }(d, this, M);
    }, e._timeline_finalize_section_add = function(d, f, v) {
      v && (d._scales[f] = v, e.callEvent("onScaleAdd", [v, f]));
    }, e.attachEvent("onBeforeViewChange", function(d, f, v, x) {
      if (e.matrix[v]) {
        var b = e.matrix[v];
        if (b.scrollable) {
          if (b.render == "tree" && d === v && f === x)
            return !0;
          b._x_scroll = b._y_scroll = 0, e.$container.querySelector(".dhx_timeline_scrollable_data") && e._timeline_set_scroll_pos(e._els.dhx_cal_data[0], b);
        }
      }
      return !0;
    }), e._timeline_x_dates = function(d) {
      var f = e._min_date, v = e._max_date;
      e._process_ignores(f, this.x_size, this.x_unit, this.x_step, d), e.date[this.x_unit + "_start"] && (f = e.date[this.x_unit + "_start"](f));
      for (var x = 0, b = 0; +f < +v; )
        if (this._trace_x[b] = new Date(f), this.x_unit == "month" && e.date[this.x_unit + "_start"] && (f = e.date[this.x_unit + "_start"](new Date(f))), f = e.date.add(f, this.x_step, this.x_unit), e.date[this.x_unit + "_start"] && (f = e.date[this.x_unit + "_start"](f)), e._ignores[b] || x++, b++, d) {
          if (x < this.x_size && !(+f < +v))
            v = e.date["add_" + this.name + "_private"](v, (this.x_length || this.x_size) * this.x_step);
          else if (x >= this.x_size) {
            e._max_date = f;
            break;
          }
        }
      return { total: b, displayed: x };
    }, e._timeline_x_scale = function(d) {
      var f = e._x - this.dx - e.xy.scroll_width, v = e._min_date, x = e.xy.scale_height, b = this._header_resized || e.xy.scale_height;
      e._cols = [], e._colsS = { height: 0 }, this._trace_x = [];
      var w = e.config.preserve_scale_length, k = e._timeline_x_dates.call(this, w);
      if (this.scrollable && this.column_width > 0) {
        var E = this.column_width * k.displayed;
        E > f && (f = E, this._section_autowidth = !1);
      }
      var D = [this.dx];
      e._els.dhx_cal_header[0].style.width = D[0] + f + 1 + "px", v = e._min_date_timeline = e._min_date;
      for (var S = k.displayed, N = k.total, M = 0; M < N; M++)
        e._ignores[M] ? (e._cols[M] = 0, S++) : e._cols[M] = Math.floor(f / (S - M)), f -= e._cols[M], D[M + 1] = D[M] + e._cols[M];
      if (d.innerHTML = "<div></div>", this.second_scale) {
        for (var A = this.second_scale.x_unit, C = [this._trace_x[0]], T = [], O = [this.dx, this.dx], L = 0, $ = 0; $ < this._trace_x.length; $++) {
          var z = this._trace_x[$];
          e._timeline_is_new_interval(A, z, C[L]) && (C[++L] = z, O[L + 1] = O[L]);
          var j = L + 1;
          T[L] = e._cols[$] + (T[L] || 0), O[j] += e._cols[$];
        }
        d.innerHTML = "<div></div><div></div>";
        var P = d.firstChild;
        P.style.height = b + "px";
        var I = d.lastChild;
        I.style.position = "relative", I.className = "dhx_bottom_scale_container";
        for (var Y = 0; Y < C.length; Y++) {
          var W = C[Y], B = e.templates[this.name + "_second_scalex_class"](W), R = document.createElement("div");
          R.className = "dhx_scale_bar dhx_second_scale_bar" + (B ? " " + B : ""), e.set_xy(R, T[Y], b, O[Y], 0), R.innerHTML = e.templates[this.name + "_second_scale_date"](W), P.appendChild(R);
        }
      }
      e.xy.scale_height = b, d = d.lastChild, this._h_cols = {};
      for (var K = 0; K < this._trace_x.length; K++)
        if (!e._ignores[K]) {
          v = this._trace_x[K], e._render_x_header(K, D[K], v, d);
          var fe = e.templates[this.name + "_scalex_class"](v);
          fe && (d.lastChild.className += " " + fe), d.lastChild.setAttribute("data-col-id", K), d.lastChild.setAttribute("data-col-date", t(v));
          var ve = d.lastChild.cloneNode(!0);
          this._h_cols[K] = { div: ve, left: D[K] };
        }
      e.xy.scale_height = x;
      var ye = this._trace_x;
      d.$_clickEventsAttached || (d.$_clickEventsAttached = !0, e.event(d, "click", function(oe) {
        var q = e._timeline_locate_hcell(oe);
        q && e.callEvent("onXScaleClick", [q.x, ye[q.x], oe]);
      }), e.event(d, "dblclick", function(oe) {
        var q = e._timeline_locate_hcell(oe);
        q && e.callEvent("onXScaleDblClick", [q.x, ye[q.x], oe]);
      }));
    }, e._timeline_is_new_interval = function(d, f, v) {
      switch (d) {
        case "hour":
          return f.getHours() != v.getHours() || e._timeline_is_new_interval("day", f, v);
        case "day":
          return !(f.getDate() == v.getDate() && f.getMonth() == v.getMonth() && f.getFullYear() == v.getFullYear());
        case "week":
          return e.date.week_start(new Date(f)).valueOf() != e.date.week_start(new Date(v)).valueOf();
        case "month":
          return !(f.getMonth() == v.getMonth() && f.getFullYear() == v.getFullYear());
        case "year":
          return f.getFullYear() != v.getFullYear();
        default:
          return !1;
      }
    }, e._timeline_reset_scale_height = function(d) {
      if (this._header_resized && (!d || this.second_scale)) {
        e.xy.scale_height /= 2, this._header_resized = !1;
        var f = e._els.dhx_cal_header[0];
        f.className = f.className.replace(/ dhx_second_cal_header/gi, "");
      }
    }, e._timeline_set_full_view = function(d) {
      if (e._timeline_reset_scale_height.call(this, d), d) {
        this.second_scale && !this._header_resized && (this._header_resized = e.xy.scale_height, e.xy.scale_height *= 2, e._els.dhx_cal_header[0].className += " dhx_second_cal_header"), e.set_sizes(), e._init_matrix_tooltip();
        var f = e._min_date;
        if (e._timeline_x_scale.call(this, e._els.dhx_cal_header[0]), e.$container.querySelector(".dhx_timeline_scrollable_data")) {
          var v = e._timeline_smart_render.getViewPort(this.scrollHelper), x = e._timeline_smart_render.getVisibleHeader(this, v);
          x && (this.second_scale ? e._els.dhx_cal_header[0].children[1].innerHTML = x : e._els.dhx_cal_header[0].children[0].innerHTML = x);
        }
        e._timeline_y_scale.call(this, e._els.dhx_cal_data[0]), e._min_date = f;
        var b = e._getNavDateElement();
        b && (b.innerHTML = e.templates[this.name + "_date"](e._min_date, e._max_date)), e._mark_now && e._mark_now(), e._timeline_reset_scale_height.call(this, d);
      }
      e._timeline_render_scale_header(this, d), e._timeline_hideToolTip();
    }, e._timeline_hideToolTip = function() {
      e._tooltip && (e._tooltip.style.display = "none", e._tooltip.date = "");
    }, e._timeline_showToolTip = function(d, f, v) {
      if (d.render == "cell") {
        var x = f.x + "_" + f.y, b = d._matrix[f.y][f.x];
        if (!b)
          return e._timeline_hideToolTip();
        if (b.sort(function(N, M) {
          return N.start_date > M.start_date ? 1 : -1;
        }), e._tooltip) {
          if (e._tooltip.date == x)
            return;
          e._tooltip.innerHTML = "";
        } else {
          var w = e._tooltip = document.createElement("div");
          w.className = "dhx_year_tooltip", e.config.rtl && (w.className += " dhx_tooltip_rtl"), document.body.appendChild(w), e.event(w, "click", e._click.dhx_cal_data);
        }
        for (var k = "", E = 0; E < b.length; E++) {
          var D = b[E].color ? "--dhx-scheduler-event-color:" + b[E].color + ";" : "", S = b[E].textColor ? "--dhx-scheduler-event-background:" + b[E].textColor + ";" : "";
          k += "<div class='dhx_tooltip_line' event_id='" + b[E].id + "' " + e.config.event_attribute + "='" + b[E].id + "' style='" + D + S + "'>", k += "<div class='dhx_tooltip_date'>" + (b[E]._timed ? e.templates.event_date(b[E].start_date) : "") + "</div>", k += "<div class='dhx_event_icon icon_details'>&nbsp;</div>", k += e.templates[d.name + "_tooltip"](b[E].start_date, b[E].end_date, b[E]) + "</div>";
        }
        e._tooltip.style.display = "", e._tooltip.style.top = "0px", e.config.rtl && v.left - e._tooltip.offsetWidth >= 0 || document.body.offsetWidth - f.src.offsetWidth - v.left - e._tooltip.offsetWidth < 0 ? e._tooltip.style.left = v.left - e._tooltip.offsetWidth + "px" : e._tooltip.style.left = v.left + f.src.offsetWidth + "px", e._tooltip.date = x, e._tooltip.innerHTML = k, document.body.offsetHeight - v.top - e._tooltip.offsetHeight < 0 ? e._tooltip.style.top = v.top - e._tooltip.offsetHeight + f.src.offsetHeight + "px" : e._tooltip.style.top = v.top + "px";
      }
    }, e._matrix_tooltip_handler = function(d) {
      var f = e.matrix[e._mode];
      if (f && f.render == "cell") {
        if (f) {
          var v = e._locate_cell_timeline(d);
          if (v)
            return e._timeline_showToolTip(f, v, e.$domHelpers.getOffset(v.src));
        }
        e._timeline_hideToolTip();
      }
    }, e._init_matrix_tooltip = function() {
      e._detachDomEvent(e._els.dhx_cal_data[0], "mouseover", e._matrix_tooltip_handler), e.event(e._els.dhx_cal_data[0], "mouseover", e._matrix_tooltip_handler);
    }, e._set_timeline_dates = function(d) {
      e._min_date = e.date[d.name + "_start"](new Date(e._date)), e._max_date = e.date["add_" + d.name + "_private"](e._min_date, d.x_size * d.x_step), e.date[d.x_unit + "_start"] && (e._max_date = e.date[d.x_unit + "_start"](e._max_date)), e._table_view = !0;
    }, e._renderMatrix = function(d, f) {
      this.callEvent("onBeforeRender", []), f || (e._els.dhx_cal_data[0].scrollTop = 0), e._set_timeline_dates(this), e._timeline_set_full_view.call(this, d);
    }, e._timeline_html_index = function(d) {
      for (var f = d.parentNode.childNodes, v = -1, x = 0; x < f.length; x++)
        if (f[x] == d) {
          v = x;
          break;
        }
      var b = v;
      if (e._ignores_detected)
        for (var w in e._ignores)
          e._ignores[w] && 1 * w <= b && b++;
      return b;
    }, e._timeline_locate_hcell = function(d) {
      for (var f = d.target ? d.target : d.srcElement; f && f.tagName != "DIV"; )
        f = f.parentNode;
      if (f && f.tagName == "DIV" && e._getClassName(f).split(" ")[0] == "dhx_scale_bar")
        return { x: e._timeline_html_index(f), y: -1, src: f, scale: !0 };
    }, e._locate_cell_timeline = function(d) {
      for (var f = d.target ? d.target : d.srcElement, v = {}, x = e.matrix[e._mode], b = e.getActionData(d), w = e._ignores, k = 0, E = 0; E < x._trace_x.length - 1 && !(+b.date < x._trace_x[E + 1]); E++)
        w[E] || k++;
      v.x = k === 0 ? 0 : E, v.y = x.order[b.section];
      var D = 0;
      if (x.scrollable && x.render === "cell") {
        if (!x._scales[b.section] || !x._scales[b.section].querySelector(".dhx_matrix_cell"))
          return;
        var S = x._scales[b.section].querySelector(".dhx_matrix_cell");
        if (!S)
          return;
        var N = S.offsetLeft;
        if (N > 0) {
          for (var M = e._timeline_drag_date(x, N), A = 0; A < x._trace_x.length - 1 && !(+M < x._trace_x[A + 1]); A++)
            ;
          D = A;
        }
      }
      v.src = x._scales[b.section] ? x._scales[b.section].querySelectorAll(".dhx_matrix_cell")[E - D] : null;
      var C, T, O = !1, L = (C = f, T = ".dhx_matrix_scell", e.$domHelpers.closest(C, T));
      return L && (f = L, O = !0), O ? (v.x = -1, v.src = f, v.scale = !0) : v.x = E, v;
    };
    var c = e._click.dhx_cal_data;
    e._click.dhx_marked_timespan = e._click.dhx_cal_data = function(d) {
      var f = c.apply(this, arguments), v = e.matrix[e._mode];
      if (v) {
        var x = e._locate_cell_timeline(d);
        x && (x.scale ? e.callEvent("onYScaleClick", [x.y, v.y_unit[x.y], d]) : (e.callEvent("onCellClick", [x.x, x.y, v._trace_x[x.x], (v._matrix[x.y] || {})[x.x] || [], d]), e._timeline_set_scroll_pos(e._els.dhx_cal_data[0], v)));
      }
      return f;
    }, e.dblclick_dhx_matrix_cell = function(d) {
      var f = e.matrix[e._mode];
      if (f) {
        var v = e._locate_cell_timeline(d);
        v && (v.scale ? e.callEvent("onYScaleDblClick", [v.y, f.y_unit[v.y], d]) : e.callEvent("onCellDblClick", [v.x, v.y, f._trace_x[v.x], (f._matrix[v.y] || {})[v.x] || [], d]));
      }
    };
    var g = e.dblclick_dhx_marked_timespan || function() {
    };
    e.dblclick_dhx_marked_timespan = function(d) {
      return e.matrix[e._mode] ? e.dblclick_dhx_matrix_cell(d) : g.apply(this, arguments);
    }, e.dblclick_dhx_matrix_scell = function(d) {
      return e.dblclick_dhx_matrix_cell(d);
    }, e._isRender = function(d) {
      return e.matrix[e._mode] && e.matrix[e._mode].render == d;
    }, e.attachEvent("onCellDblClick", function(d, f, v, x, b) {
      if (!this.config.readonly && (b.type != "dblclick" || this.config.dblclick_create)) {
        var w = e.matrix[e._mode], k = {};
        k.start_date = w._trace_x[d], k.end_date = w._trace_x[d + 1] ? w._trace_x[d + 1] : e.date.add(w._trace_x[d], w.x_step, w.x_unit), w._start_correction && (k.start_date = new Date(1 * k.start_date + w._start_correction)), w._end_correction && (k.end_date = new Date(k.end_date - w._end_correction)), k[w.y_property] = w.y_unit[f].key, e.addEventNow(k, null, b);
      }
    }), e.attachEvent("onBeforeDrag", function(d, f, v) {
      return !e._isRender("cell");
    }), e.attachEvent("onEventChanged", function(d, f) {
      f._timed = this.isOneDayEvent(f);
    }), e.attachEvent("onBeforeEventChanged", function(d, f, v, x) {
      return d && (d._move_delta = void 0), x && (x._move_delta = void 0), !0;
    }), e._is_column_visible = function(d) {
      var f = e.matrix[e._mode], v = e._get_date_index(f, d);
      return !e._ignores[v];
    };
    var y = e._render_marked_timespan;
    e._render_marked_timespan = function(d, f, v, x, b) {
      if (!e.config.display_marked_timespans)
        return [];
      if (e.matrix && e.matrix[e._mode]) {
        if (e._isRender("cell"))
          return;
        var w = e._lame_copy({}, e.matrix[e._mode]);
        w.round_position = !1;
        var k = [], E = [], D = [], S = d.sections ? d.sections.units || d.sections.timeline : null;
        if (v)
          D = [f], E = [v];
        else {
          var N = w.order;
          if (S)
            N.hasOwnProperty(S) && (E.push(S), D.push(w._scales[S]));
          else if (w._scales)
            for (var M in N)
              N.hasOwnProperty(M) && w._scales[M] && (E.push(M), D.push(w._scales[M]));
        }
        if (x = x ? new Date(x) : e._min_date, b = b ? new Date(b) : e._max_date, x.valueOf() < e._min_date.valueOf() && (x = new Date(e._min_date)), b.valueOf() > e._max_date.valueOf() && (b = new Date(e._max_date)), !w._trace_x)
          return;
        for (var A = 0; A < w._trace_x.length && !e._is_column_visible(w._trace_x[A]); A++)
          ;
        if (A == w._trace_x.length)
          return;
        var C = [];
        if (d.days > 6) {
          var T = new Date(d.days);
          e.date.date_part(new Date(x)) <= +T && +b >= +T && C.push(T);
        } else
          C.push.apply(C, e._get_dates_by_index(d.days));
        for (var O = d.zones, L = e._get_css_classes_by_config(d), $ = 0; $ < E.length; $++)
          for (f = D[$], v = E[$], A = 0; A < C.length; A++)
            for (var z = C[A], j = 0; j < O.length; j += 2) {
              var P = O[j], I = O[j + 1], Y = new Date(+z + 60 * P * 1e3), W = new Date(+z + 60 * I * 1e3);
              if (Y = new Date(Y.valueOf() + 1e3 * (Y.getTimezoneOffset() - z.getTimezoneOffset()) * 60), x < (W = new Date(W.valueOf() + 1e3 * (W.getTimezoneOffset() - z.getTimezoneOffset()) * 60)) && b > Y) {
                var B = e._get_block_by_config(d);
                B.className = L;
                var R = e._timeline_getX({ start_date: Y }, !1, w) - 1, K = e._timeline_getX({ start_date: W }, !1, w) - 1, fe = Math.max(1, K - R - 1), ve = w._section_height[v] - 1 || w.dy - 1;
                B.style.cssText = "height: " + ve + "px; " + (e.config.rtl ? "right: " : "left: ") + R + "px; width: " + fe + "px; top: 0;", f.insertBefore(B, f.firstChild), k.push(B);
              }
            }
        return k;
      }
      return y.apply(e, [d, f, v]);
    };
    var m = e._append_mark_now;
    e._append_mark_now = function(d, f) {
      if (e.matrix && e.matrix[e._mode]) {
        var v = e._currentDate(), x = e._get_zone_minutes(v), b = { days: +e.date.date_part(v), zones: [x, x + 1], css: "dhx_matrix_now_time", type: "dhx_now_time" };
        return e._render_marked_timespan(b);
      }
      return m.apply(e, [d, f]);
    };
    var u = e._mark_timespans;
    e._mark_timespans = function() {
      if (e.matrix && e.matrix[e.getState().mode]) {
        for (var d = [], f = e.matrix[e.getState().mode], v = f.y_unit, x = 0; x < v.length; x++) {
          var b = v[x].key, w = f._scales[b], k = e._on_scale_add_marker(w, b);
          d.push.apply(d, k);
        }
        return d;
      }
      return u.apply(this, arguments);
    };
    var p = e._on_scale_add_marker;
    e._on_scale_add_marker = function(d, f) {
      if (e.matrix && e.matrix[e._mode]) {
        var v = [], x = e._marked_timespans;
        if (x && e.matrix && e.matrix[e._mode])
          for (var b = e._mode, w = e._min_date, k = e._max_date, E = x.global, D = e.date.date_part(new Date(w)); D < k; D = e.date.add(D, 1, "day")) {
            var S = +D, N = D.getDay(), M = [];
            if (e.config.overwrite_marked_timespans) {
              var A = E[S] || E[N];
              M.push.apply(M, e._get_configs_to_render(A));
            } else
              E[S] && M.push.apply(M, e._get_configs_to_render(E[S])), E[N] && M.push.apply(M, e._get_configs_to_render(E[N]));
            if (x[b] && x[b][f]) {
              var C = [], T = e._get_types_to_render(x[b][f][N], x[b][f][S]);
              C.push.apply(C, e._get_configs_to_render(T)), e.config.overwrite_marked_timespans ? C.length && (M = C) : M = M.concat(C);
            }
            for (var O = 0; O < M.length; O++) {
              var L = M[O], $ = L.days;
              $ < 7 ? ($ = S, v.push.apply(v, e._render_marked_timespan(L, d, f, D, e.date.add(D, 1, "day"))), $ = N) : v.push.apply(v, e._render_marked_timespan(L, d, f, D, e.date.add(D, 1, "day")));
            }
          }
        return v;
      }
      return p.apply(this, arguments);
    }, e._resolve_timeline_section = function(d, f) {
      for (var v = 0, x = 0; v < this._colsS.heights.length && !((x += this._colsS.heights[v]) > f.y); v++)
        ;
      d.y_unit[v] || (v = d.y_unit.length - 1), this._drag_event && !this._drag_event._orig_section && (this._drag_event._orig_section = d.y_unit[v].key), f.fields = {}, v >= 0 && d.y_unit[v] && (f.section = f.fields[d.y_property] = d.y_unit[v].key);
    }, e._update_timeline_section = function(d) {
      var f = d.view, v = d.event, x = d.pos;
      if (v) {
        if (v[f.y_property] != x.section) {
          var b = this._get_timeline_event_height ? this._get_timeline_event_height(v, f) : f.getEventHeight(v);
          v._sorder = this._get_dnd_order(v._sorder, b, f.getSectionHeight(x.section));
        }
        v[f.y_property] = x.section;
      }
    }, e._get_date_index = function(d, f) {
      for (var v = d._trace_x, x = 0, b = v.length - 1, w = f.valueOf(); b - x > 3; ) {
        var k = x + Math.floor((b - x) / 2);
        v[k].valueOf() > w ? b = k : x = k;
      }
      for (var E = x; E <= b && +f >= +v[E + 1]; )
        E++;
      return E;
    }, e._timeline_drag_date = function(d, f) {
      var v = d, x = f;
      if (!v._trace_x.length)
        return new Date(e.getState().date);
      for (var b, w, k, E = 0, D = 0; D <= this._cols.length - 1; D++)
        if ((E += w = this._cols[D]) > x) {
          b = (b = (x - (E - w)) / w) < 0 ? 0 : b;
          break;
        }
      if (v.round_position) {
        var S = 1, N = e.getState().drag_mode;
        N && N != "move" && N != "create" && (S = 0.5), b >= S && D++, b = 0;
      }
      if (D === 0 && this._ignores[0])
        for (D = 1, b = 0; this._ignores[D]; )
          D++;
      else if (D == this._cols.length && this._ignores[D - 1]) {
        for (D = this._cols.length - 1, b = 0; this._ignores[D]; )
          D--;
        D++;
      }
      if (D >= v._trace_x.length)
        k = e.date.add(v._trace_x[v._trace_x.length - 1], v.x_step, v.x_unit), v._end_correction && (k = new Date(k - v._end_correction));
      else {
        var M = b * w * v._step + v._start_correction;
        k = new Date(+v._trace_x[D] + M);
      }
      return k;
    }, e.attachEvent("onBeforeTodayDisplayed", function() {
      for (var d in e.matrix) {
        var f = e.matrix[d];
        f.x_start = f._original_x_start;
      }
      return !0;
    }), e.attachEvent("onOptionsLoad", function() {
      for (var d in e.matrix) {
        var f = e.matrix[d];
        for (f.order = {}, e.callEvent("onOptionsLoadStart", []), d = 0; d < f.y_unit.length; d++)
          f.order[f.y_unit[d].key] = d;
        e.callEvent("onOptionsLoadFinal", []), e._date && f.name == e._mode && (f._options_changed = !0, e.setCurrentView(e._date, e._mode), setTimeout(function() {
          f._options_changed = !1;
        }));
      }
    }), e.attachEvent("onEventIdChange", function() {
      var d = e.getView();
      d && e.matrix[d.name] && e._timeline_smart_render && (e._timeline_smart_render.clearPreparedEventsCache(), e._timeline_smart_render.getPreparedEvents(d));
    }), e.attachEvent("onBeforeDrag", function(d, f, v) {
      if (f == "resize") {
        var x = v.target || v.srcElement;
        e._getClassName(x).indexOf("dhx_event_resize_end") < 0 ? e._drag_from_start = !0 : e._drag_from_start = !1;
      }
      return !0;
    }), Ut(e), function(d) {
      function f(v, x) {
        for (let b = 0; b < v.length; b++)
          if (v[b].id == x)
            return !0;
        return !1;
      }
      d._timeline_smart_render = { _prepared_events_cache: null, _rendered_events_cache: [], _rendered_header_cache: [], _rendered_labels_cache: [], _rows_to_delete: [], _rows_to_add: [], _cols_to_delete: [], _cols_to_add: [], getViewPort: function(v, x, b, w) {
        var k = d.$container.querySelector(".dhx_cal_data"), E = k.getBoundingClientRect(), D = d.$container.querySelector(".dhx_timeline_scrollable_data");
        D && b === void 0 && (b = v.getScrollValue(D)), w === void 0 && (w = D ? D.scrollTop : k.scrollTop);
        var S = {};
        for (var N in E)
          S[N] = E[N];
        return S.scrollLeft = b || 0, S.scrollTop = w || 0, x && (E.height = x), S;
      }, isInXViewPort: function(v, x) {
        var b = x.scrollLeft, w = x.width + x.scrollLeft;
        return v.left < w + 100 && v.right > b - 100;
      }, isInYViewPort: function(v, x) {
        var b = x.scrollTop, w = x.height + x.scrollTop;
        return v.top < w + 80 && v.bottom > b - 80;
      }, getVisibleHeader: function(v, x) {
        var b = "";
        for (var w in this._rendered_header_cache = [], v._h_cols) {
          var k = v._h_cols[w];
          this.isInXViewPort({ left: k.left, right: k.left + d._cols[w] }, x) && (b += k.div.outerHTML, this._rendered_header_cache.push(k.div.getAttribute("data-col-id")));
        }
        return b;
      }, updateHeader: function(v, x, b) {
        this._cols_to_delete = [], this._cols_to_add = [];
        for (var w = d.$container.querySelectorAll(".dhx_cal_header > div"), k = w[w.length - 1].querySelectorAll(".dhx_scale_bar"), E = [], D = 0; D < k.length; D++)
          E.push(k[D].getAttribute("data-col-id"));
        if (this.getVisibleHeader(v, x)) {
          for (var S = this._rendered_header_cache.slice(), N = [], M = (D = 0, E.length); D < M; D++) {
            var A = S.indexOf(E[D]);
            A > -1 ? S.splice(A, 1) : N.push(E[D]);
          }
          N.length && (this._cols_to_delete = N.slice(), this._deleteHeaderCells(N, v, b)), S.length && (this._cols_to_add = S.slice(), this._addHeaderCells(S, v, b));
        }
      }, _deleteHeaderCells: function(v, x, b) {
        for (var w = 0; w < v.length; w++) {
          var k = b.querySelector('[data-col-id="' + v[w] + '"]');
          k && b.removeChild(k);
        }
      }, _addHeaderCells: function(v, x, b) {
        for (var w = "", k = 0; k < v.length; k++)
          w += x._h_cols[v[k]].div.outerHTML;
        const E = document.createElement("template");
        E.innerHTML = w, b.appendChild(E.content);
      }, getVisibleLabels: function(v, x) {
        if (v._label_rows.length) {
          var b = "";
          this._rendered_labels_cache = [];
          for (var w = 0; w < v._label_rows.length; w++)
            this.isInYViewPort({ top: v._label_rows[w].top, bottom: v._label_rows[w].top + v._section_height[v.y_unit[w].key] }, x) && (b += v._label_rows[w].div, this._rendered_labels_cache.push(w));
          return b;
        }
      }, updateLabels: function(v, x, b) {
        this._rows_to_delete = [], this._rows_to_add = [];
        let w = [];
        if (d.$container.querySelectorAll(".dhx_timeline_label_row").forEach((M) => {
          w.push(Number(M.getAttribute("data-row-index")));
        }), w.length || (this.getVisibleLabels(v, x), w = this._rendered_labels_cache.slice()), this.getVisibleLabels(v, x)) {
          for (var k = this._rendered_labels_cache.slice(), E = [], D = 0, S = w.length; D < S; D++) {
            var N = k.indexOf(w[D]);
            N > -1 ? k.splice(N, 1) : E.push(w[D]);
          }
          E.length && (this._rows_to_delete = E.slice(), this._deleteLabelCells(E, v, b)), k.length && (this._rows_to_add = k.slice(), this._addLabelCells(k, v, b));
        }
      }, _deleteLabelCells: function(v, x, b) {
        for (var w = 0; w < v.length; w++) {
          var k = b.querySelector('[data-row-index="' + v[w] + '"]');
          k && b.removeChild(k);
        }
      }, _addLabelCells: function(v, x, b) {
        for (var w = "", k = 0; k < v.length; k++)
          w += x._label_rows[v[k]].div;
        const E = document.createElement("template");
        E.innerHTML = w, b.appendChild(E.content);
      }, clearPreparedEventsCache: function() {
        this.cachePreparedEvents(null);
      }, cachePreparedEvents: function(v) {
        this._prepared_events_cache = v, this._prepared_events_coordinate_cache = v;
      }, getPreparedEvents: function(v) {
        var x;
        if (this._prepared_events_cache) {
          if (x = this._prepared_events_cache, d.getState().drag_id) {
            const b = d.getState().drag_id;
            let w = !1, k = !1;
            x.forEach((E, D) => {
              if (w)
                return;
              const S = v.y_unit[D];
              for (let N = 0; N < E.length; N++) {
                const M = E[N];
                if (M.id == b && M[v.y_property] !== S) {
                  k = !0, E.splice(N, 1), N--;
                  const A = v.order[M[v.y_property]];
                  x[A] != E && x[A] && !f(x[A], M.id) && x[A].push(M);
                }
              }
              k && (w = !0);
            });
          }
        } else
          (x = d._prepare_timeline_events(v)).$coordinates = {}, this.cachePreparedEvents(x);
        return x;
      }, updateEvents: function(v, x) {
        var b = this.getPreparedEvents(v), w = this._rendered_events_cache.slice();
        if (this._rendered_events_cache = [], !d.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col"))
          return;
        const k = [];
        for (var E = 0; E < this._rendered_labels_cache.length; E++) {
          var D = this._rendered_labels_cache[E], S = [];
          const L = v.y_unit[D].key;
          var N = w[D] ? w[D].slice() : [];
          d._timeline_calculate_event_positions.call(v, b[D]);
          for (var M = d._timeline_smart_render.getVisibleEventsForRow(v, x, b, D), A = 0, C = M.length; A < C; A++) {
            var T = N.indexOf(String(M[A].id));
            if (T > -1)
              if (d.getState().drag_id == M[A].id)
                for (let z = 0; z < N.length; z++)
                  N[z] == M[A].id && (N.splice(z, 1), z--);
              else
                N.splice(T, 1);
            else
              S.push(M[A]);
          }
          var O = v._divBySectionId[L];
          if (!O)
            continue;
          N.length && this._deleteEvents(N, v, O);
          const $ = { DOMParent: O, buffer: document.createElement("template") };
          k.push($), S.length && this._addEvents(S, v, $.buffer, D);
        }
        k.forEach(function(L) {
          L.DOMParent.appendChild(L.buffer.content);
        }), d._populate_timeline_rendered(d.$container), v._matrix = b;
      }, _deleteEvents: function(v, x, b) {
        for (var w = 0; w < v.length; w++) {
          const E = "[" + d.config.event_attribute + '="' + v[w] + '"]';
          var k = b.querySelector(E);
          if (k)
            if (k.classList.contains("dhx_in_move")) {
              const D = b.querySelectorAll(E);
              for (let S = 0; S < D.length; S++)
                D[S].classList.contains("dhx_in_move") || D[S].remove();
            } else
              k.remove();
        }
      }, _addEvents: function(v, x, b, w) {
        var k = d._timeline_update_events_html.call(x, v);
        b.innerHTML = k;
      }, getVisibleEventsForRow: function(v, x, b, w) {
        var k = [];
        if (v.render == "cell")
          k = b;
        else {
          var E = b[w];
          if (E)
            for (var D = 0, S = E.length; D < S; D++) {
              var N, M, A = E[D], C = w + "_" + A.id;
              b.$coordinates && b.$coordinates[C] ? (N = b.$coordinates[C].xStart, M = b.$coordinates[C].xEnd) : (N = d._timeline_getX(A, !1, v), M = d._timeline_getX(A, !0, v), b.$coordinates && (b.$coordinates[C] = { xStart: N, xEnd: M })), d._timeline_smart_render.isInXViewPort({ left: N, right: M }, x) && (k.push(A), this._rendered_events_cache[w] || (this._rendered_events_cache[w] = []), this._rendered_events_cache[w].push(String(A.id)));
            }
        }
        return k;
      }, getVisibleRowCellsHTML: function(v, x, b, w, k) {
        for (var E, D = "", S = this._rendered_header_cache, N = 0; N < S.length; N++) {
          var M = S[N];
          E = v._h_cols[M].left - v.dx, d._ignores[M] ? v.render == "cell" ? D += d._timeline_get_html_for_cell_ignores(b) : D += d._timeline_get_html_for_bar_ignores() : v.render == "cell" ? D += d._timeline_get_html_for_cell(M, k, v, w[k][M], b, E) : D += d._timeline_get_html_for_bar(M, k, v, w[k], E);
        }
        return D;
      }, getVisibleTimelineRowsHTML: function(v, x, b, w) {
        var k = "", E = d._timeline_get_cur_row_stats(v, w);
        E = d._timeline_get_fit_events_stats(v, w, E);
        var D = v._label_rows[w], S = d.templates[v.name + "_row_class"], N = { view: v, section: D.section, template: S };
        return v.render == "cell" ? (k += d._timeline_get_html_for_cell_data_row(w, E, D.top, D.section.key, N), k += this.getVisibleRowCellsHTML(v, x, E, b, w), k += "</div>") : (k += d._timeline_get_html_for_bar_matrix_line(w, E, D.top, D.section.key, N), k += d._timeline_get_html_for_bar_data_row(E, N), k += this.getVisibleRowCellsHTML(v, x, E, b, w), k += "</div></div>"), k;
      }, updateGridRows: function(v, x) {
        this._rows_to_delete.length && this._deleteGridRows(this._rows_to_delete, v), this._rows_to_add.length && this._addGridRows(this._rows_to_add, v, x);
      }, _deleteGridRows: function(v, x) {
        if (d.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col")) {
          for (var b = 0; b < v.length; b++) {
            const w = x.y_unit[v[b]] ? x.y_unit[v[b]].key : null;
            x._divBySectionId[w] && (x._divBySectionId[w].remove(), delete x._divBySectionId[w]);
          }
          this._rows_to_delete = [];
        }
      }, _addGridRows: function(v, x, b) {
        if (!(S = d.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col")))
          return;
        for (var w = this.getPreparedEvents(x), k = "", E = 0; E < v.length; E++)
          k += this.getVisibleTimelineRowsHTML(x, b, w, v[E]);
        const D = document.createElement("template");
        D.innerHTML = k, S.appendChild(D.content);
        var S = d.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col");
        x._divBySectionId = {};
        for (let M = 0, A = S.children.length; M < A; M++) {
          var N = S.children[M];
          N.hasAttribute("data-section-id") && (x._divBySectionId[N.getAttribute("data-section-id")] = N);
        }
        for (E = 0; E < v.length; E++) {
          const M = x.y_unit[v[E]] ? x.y_unit[v[E]].key : null;
          d._timeline_finalize_section_add(x, x.y_unit[v[E]].key, x._divBySectionId[M]);
        }
        d._mark_now && d._mark_now(), this._rows_to_add = [];
      }, updateGridCols: function(v, x) {
        for (var b = this._rendered_header_cache, w = {}, k = 0; k < b.length; k++)
          w[b[k]] = !0;
        d.$container.querySelectorAll(".dhx_timeline_data_row").forEach((function(E) {
          const D = E.querySelectorAll("[data-col-id]"), S = Array.prototype.reduce.call(D, function(C, T) {
            return C[T.dataset.colId] = T, C;
          }, {});
          var N = [], M = [];
          for (var A in S)
            w[A] || N.push(S[A]);
          for (var A in w)
            S[A] || M.push(A);
          N.forEach(function(C) {
            C.remove();
          }), M.length && this._addGridCols(E, M, v, x);
        }).bind(this));
      }, _addGridCols: function(v, x, b, w) {
        if (d.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col"))
          for (var k = this.getPreparedEvents(b), E = 0; E < this._rendered_labels_cache.length; E++) {
            var D = this._rendered_labels_cache[E], S = "", N = d._timeline_get_cur_row_stats(b, D);
            N = d._timeline_get_fit_events_stats(b, D, N);
            var M = v;
            if (M) {
              for (var A = 0; A < x.length; A++)
                if (!M.querySelector('[data-col-id="' + x[A] + '"]')) {
                  var C = this.getVisibleGridCell(b, w, N, k, D, x[A]);
                  C && (S += C);
                }
              const T = document.createElement("template");
              T.innerHTML = S, M.appendChild(T.content);
            }
          }
      }, getVisibleGridCell: function(v, x, b, w, k, E) {
        if (v._h_cols[E]) {
          var D = "", S = v._h_cols[E].left - v.dx;
          return v.render == "cell" ? d._ignores[E] || (D += d._timeline_get_html_for_cell(E, k, v, w[k][E], b, S)) : d._ignores[E] || (D += d._timeline_get_html_for_bar(E, k, v, w[k], S)), D;
        }
      } }, d.attachEvent("onClearAll", function() {
        d._timeline_smart_render._prepared_events_cache = null, d._timeline_smart_render._rendered_events_cache = [];
      });
    }(e);
  }, e._temp_matrix_scope();
}, tooltip: function(e) {
  e.config.tooltip_timeout = 30, e.config.tooltip_offset_y = 20, e.config.tooltip_offset_x = 10, e.config.tooltip_hide_timeout = 30;
  const h = new Kt(e);
  e.ext.tooltips = h, e.attachEvent("onSchedulerReady", function() {
    h.tooltipFor({ selector: "[" + e.config.event_attribute + "]", html: (a) => {
      if (e._mobile && !e.config.touch_tooltip)
        return;
      const n = e._locate_event(a.target);
      if (e.getEvent(n)) {
        const _ = e.getEvent(n);
        return e.templates.tooltip_text(_.start_date, _.end_date, _);
      }
      return null;
    }, global: !1 });
  }), e.attachEvent("onDestroy", function() {
    h.destructor();
  }), e.attachEvent("onLightbox", function() {
    h.hideTooltip();
  }), e.attachEvent("onBeforeDrag", function() {
    return h.hideTooltip(), !0;
  }), e.attachEvent("onEventDeleted", function() {
    return h.hideTooltip(), !0;
  });
}, treetimeline: function(e) {
  var h;
  e.attachEvent("onTimelineCreated", function(a) {
    a.render == "tree" && (a.y_unit_original = a.y_unit, a.y_unit = e._getArrayToDisplay(a.y_unit_original), e.attachEvent("onOptionsLoadStart", function() {
      a.y_unit = e._getArrayToDisplay(a.y_unit_original);
    }), e.form_blocks[a.name] = { render: function(n) {
      return "<div class='dhx_section_timeline' style='overflow: hidden;'></div>";
    }, set_value: function(n, _, r, l) {
      var o = e._getArrayForSelect(e.matrix[l.type].y_unit_original, l.type);
      n.innerHTML = "";
      var t = document.createElement("select");
      n.appendChild(t);
      var i = n.getElementsByTagName("select")[0];
      !i._dhx_onchange && l.onchange && (i.addEventListener("change", l.onchange), i._dhx_onchange = !0);
      for (var s = 0; s < o.length; s++) {
        var c = document.createElement("option");
        c.value = o[s].key, c.value == r[e.matrix[l.type].y_property] && (c.selected = !0), c.innerHTML = o[s].label, i.appendChild(c);
      }
    }, get_value: function(n, _, r) {
      return n.firstChild.value;
    }, focus: function(n) {
    } });
  }), e.attachEvent("onBeforeSectionRender", function(a, n, _) {
    var r, l, o, t, i, s, c = {};
    return a == "tree" && (t = "dhx_matrix_scell dhx_treetimeline", n.children ? (r = _.folder_dy || _.dy, _.folder_dy && !_.section_autoheight && (o = "height:" + _.folder_dy + "px;"), l = "dhx_row_folder", t += " folder", n.open ? t += " opened" : t += " closed", i = "<div class='dhx_scell_expand'></div>", s = _.folder_events_available ? "dhx_data_table folder_events" : "dhx_data_table folder") : (r = _.dy, l = "dhx_row_item", t += " item", i = "", s = "dhx_data_table"), _.columns && (t += " dhx_matrix_scell_columns"), c = { height: r, style_height: o, tr_className: l, td_className: t += e.templates[_.name + "_scaley_class"](n.key, n.label, n) ? " " + e.templates[_.name + "_scaley_class"](n.key, n.label, n) : "", td_content: _.columns && _.columns.length ? "<div class='dhx_scell_name'><div class='dhx_scell_level dhx_scell_level" + n.level + "'>" + i + "</div>" + (e.templates[_.name + "_scale_label"](n.key, n.label, n) || n.label) + "</div>" : "<div class='dhx_scell_level" + n.level + "'>" + i + "<div class='dhx_scell_name'>" + (e.templates[_.name + "_scale_label"](n.key, n.label, n) || n.label) + "</div></div>", table_className: s }), c;
  }), e.attachEvent("onBeforeEventChanged", function(a, n, _) {
    if (e._isRender("tree"))
      for (var r = e._get_event_sections ? e._get_event_sections(a) : [a[e.matrix[e._mode].y_property]], l = 0; l < r.length; l++) {
        var o = e.getSection(r[l]);
        if (o && o.children && !e.matrix[e._mode].folder_events_available)
          return _ || (a[e.matrix[e._mode].y_property] = h), !1;
      }
    return !0;
  }), e.attachEvent("onBeforeDrag", function(a, n, _) {
    if (e._isRender("tree")) {
      var r, l = e._locate_cell_timeline(_);
      if (l && (r = e.matrix[e._mode].y_unit[l.y].key, e.matrix[e._mode].y_unit[l.y].children && !e.matrix[e._mode].folder_events_available))
        return !1;
      var o = e.getEvent(a), t = e.matrix[e._mode].y_property;
      h = o && o[t] ? o[t] : r;
    }
    return !0;
  }), e._getArrayToDisplay = function(a) {
    var n = [], _ = function(r, l, o, t) {
      for (var i = l || 0, s = 0; s < r.length; s++) {
        var c = r[s];
        c.level = i, c.$parent = o || null, c.children && c.key === void 0 && (c.key = e.uid()), t || n.push(c), c.children && _(c.children, i + 1, c.key, t || !c.open);
      }
    };
    return _(a), n;
  }, e._getArrayForSelect = function(a, n) {
    var _ = [], r = function(l) {
      for (var o = 0; o < l.length; o++)
        e.matrix[n].folder_events_available ? _.push(l[o]) : l[o].children || _.push(l[o]), l[o].children && r(l[o].children);
    };
    return r(a), _;
  }, e._toggleFolderDisplay = function(a, n, _) {
    var r = function(o, t, i, s) {
      for (var c = 0; c < t.length && (t[c].key != o && !s || !t[c].children || (t[c].open = i !== void 0 ? i : !t[c].open, s)); c++)
        t[c].children && r(o, t[c].children, i, s);
    }, l = e.getSection(a);
    n !== void 0 || _ || (n = !l.open), e.callEvent("onBeforeFolderToggle", [l, n, _]) && (r(a, e.matrix[e._mode].y_unit_original, n, _), e.matrix[e._mode].y_unit = e._getArrayToDisplay(e.matrix[e._mode].y_unit_original), e.callEvent("onOptionsLoad", []), e.callEvent("onAfterFolderToggle", [l, n, _]));
  }, e.attachEvent("onCellClick", function(a, n, _, r, l) {
    e._isRender("tree") && (e.matrix[e._mode].folder_events_available || e.matrix[e._mode].y_unit[n] !== void 0 && e.matrix[e._mode].y_unit[n].children && e._toggleFolderDisplay(e.matrix[e._mode].y_unit[n].key));
  }), e.attachEvent("onYScaleClick", function(a, n, _) {
    e._isRender("tree") && n.children && e._toggleFolderDisplay(n.key);
  }), e.getSection = function(a) {
    if (e._isRender("tree")) {
      var n, _ = function(r, l) {
        for (var o = 0; o < l.length; o++)
          l[o].key == r && (n = l[o]), l[o].children && _(r, l[o].children);
      };
      return _(a, e.matrix[e._mode].y_unit_original), n || null;
    }
  }, e.deleteSection = function(a) {
    if (e._isRender("tree")) {
      var n = !1, _ = function(r, l) {
        for (var o = 0; o < l.length && (l[o].key == r && (l.splice(o, 1), n = !0), !n); o++)
          l[o].children && _(r, l[o].children);
      };
      return _(a, e.matrix[e._mode].y_unit_original), e.matrix[e._mode].y_unit = e._getArrayToDisplay(e.matrix[e._mode].y_unit_original), e.callEvent("onOptionsLoad", []), n;
    }
  }, e.deleteAllSections = function() {
    e._isRender("tree") && (e.matrix[e._mode].y_unit_original = [], e.matrix[e._mode].y_unit = e._getArrayToDisplay(e.matrix[e._mode].y_unit_original), e.callEvent("onOptionsLoad", []));
  }, e.addSection = function(a, n) {
    if (e._isRender("tree")) {
      var _ = !1, r = function(l, o, t) {
        if (n)
          for (var i = 0; i < t.length && (t[i].key == o && t[i].children && (t[i].children.push(l), _ = !0), !_); i++)
            t[i].children && r(l, o, t[i].children);
        else
          t.push(l), _ = !0;
      };
      return r(a, n, e.matrix[e._mode].y_unit_original), e.matrix[e._mode].y_unit = e._getArrayToDisplay(e.matrix[e._mode].y_unit_original), e.callEvent("onOptionsLoad", []), _;
    }
  }, e.openAllSections = function() {
    e._isRender("tree") && e._toggleFolderDisplay(1, !0, !0);
  }, e.closeAllSections = function() {
    e._isRender("tree") && e._toggleFolderDisplay(1, !1, !0);
  }, e.openSection = function(a) {
    e._isRender("tree") && e._toggleFolderDisplay(a, !0);
  }, e.closeSection = function(a) {
    e._isRender("tree") && e._toggleFolderDisplay(a, !1);
  };
}, units: function(e) {
  e._props = {}, e.createUnitsView = function(h, a, n, _, r, l, o) {
    function t(c) {
      return Math.round((e._correct_shift(+c, 1) - +e._min_date) / 864e5);
    }
    typeof h == "object" && (n = h.list, a = h.property, _ = h.size || 0, r = h.step || 1, l = h.skip_incorrect, o = h.days || 1, h = h.name), e._props[h] = { map_to: a, options: n, step: r, position: 0, days: o }, _ > e._props[h].options.length && (e._props[h]._original_size = _, _ = 0), e._props[h].size = _, e._props[h].skip_incorrect = l || !1, e.date[h + "_start"] = e.date.day_start, e.templates[h + "_date"] = function(c, g) {
      return e._props[h].days > 1 ? e.templates.week_date(c, g) : e.templates.day_date(c);
    }, e._get_unit_index = function(c, g) {
      var y = c.position || 0, m = t(g), u = c.size || c.options.length;
      return m >= u && (m %= u), y + m;
    }, e.templates[h + "_scale_text"] = function(c, g, y) {
      return y.css ? "<span class='" + y.css + "'>" + g + "</span>" : g;
    }, e.templates[h + "_scale_date"] = function(c) {
      var g = e._props[h], y = g.options;
      if (!y.length)
        return "";
      var m = y[e._get_unit_index(g, c)], u = t(c), p = g.size || g.options.length, d = e.date.add(e.getState().min_date, Math.floor(u / p), "day");
      return e.templates[h + "_scale_text"](m.key, m.label, m, d);
    }, e.templates[h + "_second_scale_date"] = function(c) {
      return e.templates.week_scale_date(c);
    }, e.date["add_" + h] = function(c, g) {
      return e.date.add(c, g * e._props[h].days, "day");
    }, e.date["get_" + h + "_end"] = function(c) {
      return e.date.add(c, (e._props[h].size || e._props[h].options.length) * e._props[h].days, "day");
    }, e.attachEvent("onOptionsLoad", function() {
      for (var c = e._props[h], g = c.order = {}, y = c.options, m = 0; m < y.length; m++)
        g[y[m].key] = m;
      c._original_size && c.size === 0 && (c.size = c._original_size, delete c._original_size), c.size > y.length ? (c._original_size = c.size, c.position = 0, c.size = 0) : c.size = c._original_size || c.size, e._date && e._mode == h && e.setCurrentView(e._date, e._mode);
    }), e["mouse_" + h] = function(c) {
      var g = e._props[this._mode];
      if (g) {
        if (c = this._week_indexes_from_pos(c), this._drag_event || (this._drag_event = {}), this._drag_id && this._drag_mode && (this._drag_event._dhx_changed = !0), this._drag_mode && this._drag_mode == "new-size") {
          var y = e._get_event_sday(e._events[e._drag_id]);
          Math.floor(c.x / g.options.length) != Math.floor(y / g.options.length) && (c.x = y);
        }
        var m = g.size || g.options.length, u = c.x % m, p = Math.min(u + g.position, g.options.length - 1);
        c.section = (g.options[p] || {}).key, c.x = Math.floor(c.x / m);
        var d = this.getEvent(this._drag_id);
        this._update_unit_section({ view: g, event: d, pos: c });
      }
      return c.force_redraw = !0, c;
    };
    var i = !1;
    function s() {
      i && (e.xy.scale_height /= 2, i = !1);
    }
    e[h + "_view"] = function(c) {
      var g = e._props[e._mode];
      c ? (g && g.days > 1 ? i || (i = e.xy.scale_height, e.xy.scale_height = 2 * e.xy.scale_height) : s(), e._reset_scale()) : s();
    }, e.callEvent("onOptionsLoad", []);
  }, e._update_unit_section = function(h) {
    var a = h.view, n = h.event, _ = h.pos;
    n && (n[a.map_to] = _.section);
  }, e.scrollUnit = function(h) {
    var a = e._props[this._mode];
    a && (a.position = Math.min(Math.max(0, a.position + h), a.options.length - a.size), this.setCurrentView());
  }, function() {
    var h = function(m) {
      var u = e._props[e._mode];
      if (u && u.order && u.skip_incorrect) {
        for (var p = [], d = 0; d < m.length; d++)
          u.order[m[d][u.map_to]] !== void 0 && p.push(m[d]);
        m.splice(0, m.length), m.push.apply(m, p);
      }
      return m;
    }, a = e._pre_render_events_table;
    e._pre_render_events_table = function(m, u) {
      return m = h(m), a.apply(this, [m, u]);
    };
    var n = e._pre_render_events_line;
    e._pre_render_events_line = function(m, u) {
      return m = h(m), n.apply(this, [m, u]);
    };
    var _ = function(m, u) {
      if (m && m.order[u[m.map_to]] === void 0) {
        var p = e, d = Math.floor((u.end_date - p._min_date) / 864e5);
        return m.options.length && (u[m.map_to] = m.options[Math.min(d + m.position, m.options.length - 1)].key), !0;
      }
    }, r = e.is_visible_events;
    e.is_visible_events = function(m) {
      var u = r.apply(this, arguments);
      if (u) {
        var p = e._props[this._mode];
        if (p && p.size) {
          var d = p.order[m[p.map_to]];
          if (d < p.position || d >= p.size + p.position)
            return !1;
        }
      }
      return u;
    };
    var l = e._process_ignores;
    e._process_ignores = function(m, u, p, d, f) {
      if (e._props[this._mode]) {
        this._ignores = {}, this._ignores_detected = 0;
        var v = e["ignore_" + this._mode];
        if (v) {
          var x = e._props && e._props[this._mode] ? e._props[this._mode].size || e._props[this._mode].options.length : 1;
          u /= x;
          for (var b = new Date(m), w = 0; w < u; w++) {
            if (v(b))
              for (var k = (w + 1) * x, E = w * x; E < k; E++)
                this._ignores_detected += 1, this._ignores[E] = !0, f && u++;
            b = e.date.add(b, d, p), e.date[p + "_start"] && (b = e.date[p + "_start"](b));
          }
        }
      } else
        l.call(this, m, u, p, d, f);
    };
    var o = e._reset_scale;
    e._reset_scale = function() {
      var m = e._props[this._mode];
      m && (m.size && m.position && m.size + m.position > m.options.length ? m.position = Math.max(0, m.options.length - m.size) : m.size || (m.position = 0));
      var u = o.apply(this, arguments);
      if (m) {
        this._max_date = this.date.add(this._min_date, m.days, "day");
        for (var p = this._els.dhx_cal_data[0].childNodes, d = 0; d < p.length; d++)
          p[d].classList.remove("dhx_scale_holder_now");
        var f = this._currentDate();
        if (f.valueOf() >= this._min_date && f.valueOf() < this._max_date) {
          var v = Math.floor((f - e._min_date) / 864e5), x = m.size || m.options.length, b = v * x, w = b + x;
          for (d = b; d < w; d++)
            p[d] && p[d].classList.add("dhx_scale_holder_now");
        }
        if (m.size && m.size < m.options.length) {
          var k = this._els.dhx_cal_header[0], E = document.createElement("div");
          m.position && (this._waiAria.headerButtonsAttributes(E, ""), e.config.rtl ? (E.className = "dhx_cal_next_button", E.style.cssText = "left:auto;margin-top:1px;right:0px;position:absolute;") : (E.className = "dhx_cal_prev_button", E.style.cssText = "left:1px;margin-top:1px;position:absolute;"), k.firstChild.appendChild(E), E.addEventListener("click", function(D) {
            e.scrollUnit(-1 * m.step), D.preventDefault();
          })), m.position + m.size < m.options.length && (this._waiAria.headerButtonsAttributes(E, ""), E = document.createElement("div"), e.config.rtl ? (E.className = "dhx_cal_prev_button", E.style.cssText = "left:1px;margin-top:1px;position:absolute;") : (E.className = "dhx_cal_next_button", E.style.cssText = "left:auto;margin-top:1px;right:0px;position:absolute;"), k.lastChild.appendChild(E), E.addEventListener("click", function() {
            e.scrollUnit(m.step);
          }));
        }
      }
      return u;
    };
    var t = e._get_view_end;
    e._get_view_end = function() {
      var m = e._props[this._mode];
      if (m && m.days > 1) {
        var u = this._get_timeunit_start();
        return e.date.add(u, m.days, "day");
      }
      return t.apply(this, arguments);
    };
    var i = e._render_x_header;
    e._render_x_header = function(m, u, p, d) {
      var f = e._props[this._mode];
      if (!f || f.days <= 1)
        return i.apply(this, arguments);
      if (f.days > 1) {
        var v = d.querySelector(".dhx_second_cal_header");
        v || ((v = document.createElement("div")).className = "dhx_second_cal_header", d.appendChild(v));
        var x = e.xy.scale_height;
        e.xy.scale_height = Math.ceil(x / 2), i.call(this, m, u, p, v, Math.ceil(e.xy.scale_height));
        var b = f.size || f.options.length;
        if ((m + 1) % b == 0) {
          var w = document.createElement("div");
          w.className = "dhx_scale_bar dhx_second_scale_bar";
          var k = this.date.add(this._min_date, Math.floor(m / b), "day");
          this.templates[this._mode + "_second_scalex_class"] && (w.className += " " + this.templates[this._mode + "_second_scalex_class"](new Date(k)));
          var E, D = this._cols[m] * b;
          E = b > 1 && this.config.rtl ? this._colsS[m - (b - 1)] - this.xy.scroll_width - 2 : b > 1 ? this._colsS[m - (b - 1)] - this.xy.scale_width - 2 : u, this.set_xy(w, D, this.xy.scale_height, E, 0), w.innerHTML = this.templates[this._mode + "_second_scale_date"](new Date(k), this._mode), v.appendChild(w);
        }
        e.xy.scale_height = x;
      }
    };
    var s = e._get_event_sday;
    e._get_event_sday = function(m) {
      var u = e._props[this._mode];
      return u ? u.days <= 1 ? (_(u, m), this._get_section_sday(m[u.map_to])) : Math.floor((m.end_date.valueOf() - 1 - 60 * m.end_date.getTimezoneOffset() * 1e3 - (e._min_date.valueOf() - 60 * e._min_date.getTimezoneOffset() * 1e3)) / 864e5) * (u.size || u.options.length) + u.order[m[u.map_to]] - u.position : s.call(this, m);
    }, e._get_section_sday = function(m) {
      var u = e._props[this._mode];
      return u.order[m] - u.position;
    };
    var c = e.locate_holder_day;
    e.locate_holder_day = function(m, u, p) {
      var d, f = e._props[this._mode];
      return f ? (p ? _(f, p) : (p = { start_date: m, end_date: m }, d = 0), f.days <= 1 ? 1 * (d === void 0 ? f.order[p[f.map_to]] : d) + (u ? 1 : 0) - f.position : Math.floor((p.start_date.valueOf() - e._min_date.valueOf()) / 864e5) * (f.size || f.options.length) + 1 * (d === void 0 ? f.order[p[f.map_to]] : d) + (u ? 1 : 0) - f.position) : c.apply(this, arguments);
    };
    var g = e._time_order;
    e._time_order = function(m) {
      var u = e._props[this._mode];
      u ? m.sort(function(p, d) {
        return u.order[p[u.map_to]] > u.order[d[u.map_to]] ? 1 : -1;
      }) : g.apply(this, arguments);
    };
    var y = e._pre_render_events_table;
    e._pre_render_events_table = function(m, u) {
      var p = e._props[this._mode];
      if (p && p.days > 1) {
        for (var d, f = {}, v = 0; v < m.length; v++) {
          var x = m[v];
          if (e.isOneDayEvent(m[v]))
            f[k = +e.date.date_part(new Date(x.start_date))] || (f[k] = []), f[k].push(x);
          else {
            var b = new Date(Math.min(+x.end_date, +this._max_date)), w = new Date(Math.max(+x.start_date, +this._min_date));
            for (w = e.date.day_start(w), m.splice(v, 1), v--; +w < +b; ) {
              var k, E = this._copy_event(x);
              E.start_date = w, E.end_date = A(E.start_date), w = e.date.add(w, 1, "day"), f[k = +e.date.date_part(new Date(w))] || (f[k] = []), f[k].push(E);
            }
          }
        }
        m = [];
        for (var v in f) {
          var D = y.apply(this, [f[v], u]), S = this._colsS.heights;
          (!d || S[0] > d[0]) && (d = S.slice()), m.push.apply(m, D);
        }
        var N = this._colsS.heights;
        for (N.splice(0, N.length), N.push.apply(N, d), v = 0; v < m.length; v++)
          if (this._ignores[m[v]._sday])
            m.splice(v, 1), v--;
          else {
            var M = m[v];
            M._first_chunk = M._last_chunk = !1, this.getEvent(M.id)._sorder = M._sorder;
          }
        m.sort(function(C, T) {
          return C.start_date.valueOf() == T.start_date.valueOf() ? C.id > T.id ? 1 : -1 : C.start_date > T.start_date ? 1 : -1;
        });
      } else
        m = y.apply(this, [m, u]);
      function A(C) {
        var T = e.date.add(C, 1, "day");
        return T = e.date.date_part(T);
      }
      return m;
    }, e.attachEvent("onEventAdded", function(m, u) {
      if (this._loading)
        return !0;
      for (var p in e._props) {
        var d = e._props[p];
        u[d.map_to] === void 0 && d.options[0] && (u[d.map_to] = d.options[0].key);
      }
      return !0;
    }), e.attachEvent("onEventCreated", function(m, u) {
      var p = e._props[this._mode];
      if (p && u) {
        var d = this.getEvent(m);
        _(p, d);
        var f = this._mouse_coords(u);
        this._update_unit_section({ view: p, event: d, pos: f }), this.event_updated(d);
      }
      return !0;
    });
  }();
}, url: function(e) {
  e._get_url_nav = function() {
    for (var h = {}, a = (document.location.hash || "").replace("#", "").split(","), n = 0; n < a.length; n++) {
      var _ = a[n].split("=");
      _.length == 2 && (h[_[0]] = _[1]);
    }
    return h;
  }, e.attachEvent("onTemplatesReady", function() {
    var h = !0, a = e.date.str_to_date("%Y-%m-%d"), n = e.date.date_to_str("%Y-%m-%d"), _ = e._get_url_nav().event || null;
    function r(l) {
      if (e.$destroyed)
        return !0;
      _ = l, e.getEvent(l) && e.showEvent(l);
    }
    e.attachEvent("onAfterEventDisplay", function(l) {
      return _ = null, !0;
    }), e.attachEvent("onBeforeViewChange", function(l, o, t, i) {
      if (h) {
        h = !1;
        var s = e._get_url_nav();
        if (s.event)
          try {
            if (e.getEvent(s.event))
              return setTimeout(function() {
                r(s.event);
              }), !1;
            var c = e.attachEvent("onXLE", function() {
              setTimeout(function() {
                r(s.event);
              }), e.detachEvent(c);
            });
          } catch {
          }
        if (s.date || s.mode) {
          try {
            this.setCurrentView(s.date ? a(s.date) : null, s.mode || null);
          } catch {
            this.setCurrentView(s.date ? a(s.date) : null, t);
          }
          return !1;
        }
      }
      var g = ["date=" + n(i || o), "mode=" + (t || l)];
      _ && g.push("event=" + _);
      var y = "#" + g.join(",");
      return document.location.hash = y, !0;
    });
  });
}, week_agenda: function(e) {
  var h;
  e._wa = {}, e.xy.week_agenda_scale_height = 20, e.templates.week_agenda_event_text = function(a, n, _, r) {
    return e.templates.event_date(a) + " " + _.text;
  }, e.date.week_agenda_start = e.date.week_start, e.date.week_agenda_end = function(a) {
    return e.date.add(a, 7, "day");
  }, e.date.add_week_agenda = function(a, n) {
    return e.date.add(a, 7 * n, "day");
  }, e.attachEvent("onSchedulerReady", function() {
    var a = e.templates;
    a.week_agenda_date || (a.week_agenda_date = a.week_date);
  }), h = e.date.date_to_str("%l, %F %d"), e.templates.week_agenda_scale_date = function(a) {
    return h(a);
  }, e.attachEvent("onTemplatesReady", function() {
    var a = e.render_data;
    function n(_) {
      return `<div class='dhx_wa_day_cont'>
	<div class='dhx_wa_scale_bar'></div>
	<div class='dhx_wa_day_data' data-day='${_}'></div>
</div>`;
    }
    e.render_data = function(_) {
      if (this._mode != "week_agenda")
        return a.apply(this, arguments);
      e.week_agenda_view(!0);
    }, e.week_agenda_view = function(_) {
      e._min_date = e.date.week_start(e._date), e._max_date = e.date.add(e._min_date, 1, "week"), e.set_sizes(), _ ? (e._table_view = e._allow_dnd = !0, e.$container.querySelector(".dhx_cal_header").style.display = "none", e._els.dhx_cal_date[0].innerHTML = "", function() {
        e._els.dhx_cal_data[0].innerHTML = "", e._rendered = [];
        var r = `<div class="dhx_week_agenda_wrapper">
<div class='dhx_wa_column'>
	${n(0)}
	${n(1)}
	${n(2)}
</div>
<div class='dhx_wa_column'>
	${n(3)}
	${n(4)}
	${n(5)}
	${n(6)}
</div>
</div>`, l = e._getNavDateElement();
        l && (l.innerHTML = e.templates[e._mode + "_date"](e._min_date, e._max_date, e._mode)), e._els.dhx_cal_data[0].innerHTML = r;
        const o = e.$container.querySelectorAll(".dhx_wa_day_cont");
        e._wa._selected_divs = [];
        for (var t = e.get_visible_events(), i = e.date.week_start(e._date), s = e.date.add(i, 1, "day"), c = 0; c < 7; c++) {
          o[c]._date = i, o[c].setAttribute("data-date", e.templates.format_date(i)), e._waiAria.weekAgendaDayCell(o[c], i);
          var g = o[c].querySelector(".dhx_wa_scale_bar"), y = o[c].querySelector(".dhx_wa_day_data");
          g.innerHTML = e.templates.week_agenda_scale_date(i);
          for (var m = [], u = 0; u < t.length; u++) {
            var p = t[u];
            p.start_date < s && p.end_date > i && m.push(p);
          }
          m.sort(function(w, k) {
            return w.start_date.valueOf() == k.start_date.valueOf() ? w.id > k.id ? 1 : -1 : w.start_date > k.start_date ? 1 : -1;
          });
          for (var d = 0; d < m.length; d++) {
            var f = m[d], v = document.createElement("div");
            e._rendered.push(v);
            var x = e.templates.event_class(f.start_date, f.end_date, f);
            v.classList.add("dhx_wa_ev_body"), x && v.classList.add(x), e.config.rtl && v.classList.add("dhx_wa_ev_body_rtl"), f._text_style && (v.style.cssText = f._text_style), f.color && v.style.setProperty("--dhx-scheduler-event-background", f.color), f.textColor && v.style.setProperty("--dhx-scheduler-event-color", f.textColor), e._select_id && f.id == e._select_id && (e.config.week_agenda_select || e.config.week_agenda_select === void 0) && (v.classList.add("dhx_cal_event_selected"), e._wa._selected_divs.push(v));
            var b = "";
            f._timed || (b = "middle", f.start_date.valueOf() >= i.valueOf() && f.start_date.valueOf() <= s.valueOf() && (b = "start"), f.end_date.valueOf() >= i.valueOf() && f.end_date.valueOf() <= s.valueOf() && (b = "end")), v.innerHTML = e.templates.week_agenda_event_text(f.start_date, f.end_date, f, i, b), v.setAttribute("event_id", f.id), v.setAttribute(e.config.event_attribute, f.id), e._waiAria.weekAgendaEvent(v, f), y.appendChild(v);
          }
          i = e.date.add(i, 1, "day"), s = e.date.add(s, 1, "day");
        }
      }()) : (e._table_view = e._allow_dnd = !1, e.$container.querySelector(".dhx_cal_header").style.display = "");
    }, e.mouse_week_agenda = function(_) {
      var r = _.ev;
      const l = _.ev.target.closest(".dhx_wa_day_cont");
      let o;
      if (l && (o = l._date), !o)
        return _;
      _.x = 0;
      var t = o.valueOf() - e._min_date.valueOf();
      if (_.y = Math.ceil(t / 6e4 / this.config.time_step), this._drag_mode == "move" && this._drag_pos && this._is_pos_changed(this._drag_pos, _)) {
        var i;
        this._drag_event._dhx_changed = !0, this._select_id = this._drag_id;
        for (var s = 0; s < e._rendered.length; s++)
          e._drag_id == this._rendered[s].getAttribute(this.config.event_attribute) && (i = this._rendered[s]);
        if (!e._wa._dnd) {
          var c = i.cloneNode(!0);
          this._wa._dnd = c, c.className = i.className, c.id = "dhx_wa_dnd", c.className += " dhx_wa_dnd", document.body.appendChild(c);
        }
        var g = document.getElementById("dhx_wa_dnd");
        g.style.top = (r.pageY || r.clientY) + 20 + "px", g.style.left = (r.pageX || r.clientX) + 20 + "px";
      }
      return _;
    }, e.attachEvent("onBeforeEventChanged", function(_, r, l) {
      if (this._mode == "week_agenda" && this._drag_mode == "move") {
        var o = document.getElementById("dhx_wa_dnd");
        o.parentNode.removeChild(o), e._wa._dnd = !1;
      }
      return !0;
    }), e.attachEvent("onEventSave", function(_, r, l) {
      return l && this._mode == "week_agenda" && (this._select_id = _), !0;
    }), e._wa._selected_divs = [], e.attachEvent("onClick", function(_, r) {
      if (this._mode == "week_agenda" && (e.config.week_agenda_select || e.config.week_agenda_select === void 0)) {
        if (e._wa._selected_divs)
          for (var l = 0; l < this._wa._selected_divs.length; l++) {
            var o = this._wa._selected_divs[l];
            o.className = o.className.replace(/ dhx_cal_event_selected/, "");
          }
        return this.for_rendered(_, function(t) {
          t.className += " dhx_cal_event_selected", e._wa._selected_divs.push(t);
        }), e._select_id = _, !1;
      }
      return !0;
    });
  });
}, wp: function(e) {
  e.attachEvent("onLightBox", function() {
    if (this._cover)
      try {
        this._cover.style.height = this.expanded ? "100%" : (document.body.parentNode || document.body).scrollHeight + "px";
      } catch {
      }
  }), e.form_blocks.select.set_value = function(h, a, n) {
    a !== void 0 && a !== "" || (a = (h.firstChild.options[0] || {}).value), h.firstChild.value = a || "";
  };
}, year_view: function(e) {
  e.templates.year_date = function(o) {
    return e.date.date_to_str(e.locale.labels.year_tab + " %Y")(o);
  }, e.templates.year_month = e.date.date_to_str("%F"), e.templates.year_scale_date = e.date.date_to_str("%D"), e.templates.year_tooltip = function(o, t, i) {
    return i.text;
  };
  const h = function() {
    return e._mode == "year";
  }, a = function(o) {
    var t = e.$domHelpers.closest(o, "[data-cell-date]");
    return t && t.hasAttribute("data-cell-date") ? e.templates.parse_date(t.getAttribute("data-cell-date")) : null;
  };
  e.dblclick_dhx_month_head = function(o) {
    if (h()) {
      const t = o.target;
      if (e.$domHelpers.closest(t, ".dhx_before") || e.$domHelpers.closest(t, ".dhx_after"))
        return !1;
      const i = a(t);
      if (i) {
        const s = i, c = this.date.add(s, 1, "day");
        !this.config.readonly && this.config.dblclick_create && this.addEventNow(s.valueOf(), c.valueOf(), o);
      }
    }
  }, e.attachEvent("onEventIdChange", function() {
    h() && this.year_view(!0);
  });
  var n = e.render_data;
  e.render_data = function(o) {
    if (!h())
      return n.apply(this, arguments);
    for (var t = 0; t < o.length; t++)
      this._year_render_event(o[t]);
  };
  var _ = e.clear_view;
  e.clear_view = function() {
    if (!h())
      return _.apply(this, arguments);
    var o = e._year_marked_cells;
    for (var t in o)
      o.hasOwnProperty(t) && o[t].classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
    e._year_marked_cells = {};
  }, e._hideToolTip = function() {
    this._tooltip && (this._tooltip.style.display = "none", this._tooltip.date = new Date(9999, 1, 1));
  }, e._showToolTip = function(o, t, i, s) {
    if (this._tooltip) {
      if (this._tooltip.date.valueOf() == o.valueOf())
        return;
      this._tooltip.innerHTML = "";
    } else {
      var c = this._tooltip = document.createElement("div");
      c.className = "dhx_year_tooltip", this.config.rtl && (c.className += " dhx_tooltip_rtl"), document.body.appendChild(c), c.addEventListener("click", e._click.dhx_cal_data), c.addEventListener("click", function(f) {
        if (f.target.closest(`[${e.config.event_attribute}]`)) {
          const v = f.target.closest(`[${e.config.event_attribute}]`).getAttribute(e.config.event_attribute);
          e.showLightbox(v);
        }
      });
    }
    for (var g = this.getEvents(o, this.date.add(o, 1, "day")), y = "", m = 0; m < g.length; m++) {
      var u = g[m];
      if (this.filter_event(u.id, u)) {
        var p = u.color ? "--dhx-scheduler-event-background:" + u.color + ";" : "", d = u.textColor ? "--dhx-scheduler-event-color:" + u.textColor + ";" : "";
        y += "<div class='dhx_tooltip_line' style='" + p + d + "' event_id='" + g[m].id + "' " + this.config.event_attribute + "='" + g[m].id + "'>", y += "<div class='dhx_tooltip_date' style='" + p + d + "'>" + (g[m]._timed ? this.templates.event_date(g[m].start_date) : "") + "</div>", y += "<div class='dhx_event_icon icon_details'>&nbsp;</div>", y += this.templates.year_tooltip(g[m].start_date, g[m].end_date, g[m]) + "</div>";
      }
    }
    this._tooltip.style.display = "", this._tooltip.style.top = "0px", document.body.offsetWidth - t.left - this._tooltip.offsetWidth < 0 ? this._tooltip.style.left = t.left - this._tooltip.offsetWidth + "px" : this._tooltip.style.left = t.left + s.offsetWidth + "px", this._tooltip.date = o, this._tooltip.innerHTML = y, document.body.offsetHeight - t.top - this._tooltip.offsetHeight < 0 ? this._tooltip.style.top = t.top - this._tooltip.offsetHeight + s.offsetHeight + "px" : this._tooltip.style.top = t.top + "px";
  }, e._year_view_tooltip_handler = function(o) {
    if (h()) {
      var t = o.target || o.srcElement;
      t.tagName.toLowerCase() == "a" && (t = t.parentNode), e._getClassName(t).indexOf("dhx_year_event") != -1 ? e._showToolTip(e.templates.parse_date(t.getAttribute("data-year-date")), e.$domHelpers.getOffset(t), o, t) : e._hideToolTip();
    }
  }, e._init_year_tooltip = function() {
    e._detachDomEvent(e._els.dhx_cal_data[0], "mouseover", e._year_view_tooltip_handler), e.event(e._els.dhx_cal_data[0], "mouseover", e._year_view_tooltip_handler);
  }, e._get_year_cell = function(o) {
    for (var t = e.templates.format_date(o), i = this.$root.querySelectorAll(`.dhx_cal_data .dhx_cal_datepicker_date[data-cell-date="${t}"]`), s = 0; s < i.length; s++)
      if (!e.$domHelpers.closest(i[s], ".dhx_after, .dhx_before"))
        return i[s];
    return null;
  }, e._year_marked_cells = {}, e._mark_year_date = function(o, t) {
    var i = e.templates.format_date(o), s = this._get_year_cell(o);
    if (s) {
      var c = this.templates.event_class(t.start_date, t.end_date, t);
      e._year_marked_cells[i] || (s.classList.add("dhx_year_event", "dhx_cal_datepicker_event"), s.setAttribute("data-year-date", i), s.setAttribute("date", i), e._year_marked_cells[i] = s), c && s.classList.add(c);
    }
  }, e._unmark_year_date = function(o) {
    var t = this._get_year_cell(o);
    t && t.classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
  }, e._year_render_event = function(o) {
    var t = o.start_date;
    for (t = t.valueOf() < this._min_date.valueOf() ? this._min_date : this.date.date_part(new Date(t)); t < o.end_date; )
      if (this._mark_year_date(t, o), (t = this.date.add(t, 1, "day")).valueOf() >= this._max_date.valueOf())
        return;
  }, e.year_view = function(o) {
    if (e.set_sizes(), e._table_view = o, !this._load_mode || !this._load())
      if (o) {
        if (e._init_year_tooltip(), e._reset_year_scale(), e._load_mode && e._load())
          return void (e._render_wait = !0);
        e.render_view_data();
      } else
        e._hideToolTip();
  }, e._reset_year_scale = function() {
    this._cols = [], this._colsS = {};
    var o = [], t = this._els.dhx_cal_data[0], i = this.config;
    t.scrollTop = 0, t.innerHTML = "", Math.floor((parseInt(t.style.height) - e.xy.year_top) / i.year_y);
    var s = document.createElement("div"), c = this.date.week_start(e._currentDate());
    this._process_ignores(c, 7, "day", 1);
    for (var g = 0; g < 7; g++)
      this._ignores && this._ignores[g] || (this._cols[g] = "var(--dhx-scheduler-datepicker-cell-size)", this._render_x_header(g, 0, c, s)), c = this.date.add(c, 1, "day");
    for (s.lastChild.className += " dhx_scale_bar_last", g = 0; g < s.childNodes.length; g++)
      this._waiAria.yearHeadCell(s.childNodes[g]);
    var y = this.date[this._mode + "_start"](this.date.copy(this._date)), m = y, u = null;
    const p = document.createElement("div");
    for (p.classList.add("dhx_year_wrapper"), g = 0; g < i.year_y; g++)
      for (var d = 0; d < i.year_x; d++) {
        (u = document.createElement("div")).className = "dhx_year_box", u.setAttribute("date", this._helpers.formatDate(y)), u.setAttribute("data-month-date", this._helpers.formatDate(y)), u.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid'><div class='dhx_year_week'>" + s.innerHTML + "</div><div class='dhx_year_body'></div></div>";
        var f = u.querySelector(".dhx_year_month"), v = u.querySelector(".dhx_year_grid"), x = u.querySelector(".dhx_year_body"), b = e.uid();
        this._waiAria.yearHeader(f, b), this._waiAria.yearGrid(v, b), f.innerHTML = this.templates.year_month(y);
        var w = this.date.week_start(y);
        this._reset_month_scale(x, y, w, 6);
        for (var k = x.querySelectorAll("td"), E = 0; E < k.length; E++)
          this._waiAria.yearDayCell(k[E]);
        p.appendChild(u), o[g * i.year_x + d] = (y.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7, y = this.date.add(y, 1, "month");
      }
    t.appendChild(p);
    var D = this._getNavDateElement();
    D && (D.innerHTML = this.templates[this._mode + "_date"](m, y, this._mode)), this.week_starts = o, o._month = m.getMonth(), this._min_date = m, this._max_date = y;
  }, e._reset_year_scale = function() {
    var o = this._els.dhx_cal_data[0];
    o.scrollTop = 0, o.innerHTML = "";
    let t = this.date.year_start(new Date(this._date));
    this._min_date = this.date.week_start(new Date(t));
    const i = document.createElement("div");
    i.classList.add("dhx_year_wrapper");
    let s = t;
    for (let y = 0; y < 12; y++) {
      let m = document.createElement("div");
      m.className = "dhx_year_box", m.setAttribute("date", this._helpers.formatDate(s)), m.setAttribute("data-month-date", this._helpers.formatDate(s)), m.innerHTML = `<div class='dhx_year_month'>${this.templates.year_month(s)}</div>
			<div class='dhx_year_grid'></div>`;
      const u = m.querySelector(".dhx_year_grid"), p = e._createDatePicker(null, { date: s, minWeeks: 6 });
      p._renderDayGrid(u), p.destructor(), i.appendChild(m), s = this.date.add(s, 1, "month");
    }
    o.appendChild(i);
    let c = this.date.add(t, 1, "year");
    c.valueOf() != this.date.week_start(new Date(c)).valueOf() && (c = this.date.week_start(new Date(c)), c = this.date.add(c, 1, "week")), this._max_date = c;
    var g = this._getNavDateElement();
    g && (g.innerHTML = this.templates[this._mode + "_date"](t, c, this._mode));
  };
  var r = e.getActionData;
  e.getActionData = function(o) {
    return h() ? { date: a(o.target), section: null } : r.apply(e, arguments);
  };
  var l = e._locate_event;
  e._locate_event = function(o) {
    var t = l.apply(e, arguments);
    if (!t) {
      var i = a(o);
      if (!i)
        return null;
      var s = e.getEvents(i, e.date.add(i, 1, "day"));
      if (!s.length)
        return null;
      t = s[0].id;
    }
    return t;
  }, e.attachEvent("onDestroy", function() {
    e._hideToolTip();
  });
} }, Ye = new class {
  constructor(e) {
    this._seed = 0, this._schedulerPlugins = [], this._bundledExtensions = e, this._extensionsManager = new qt(e);
  }
  plugin(e) {
    this._schedulerPlugins.push(e), H.scheduler && e(H.scheduler);
  }
  getSchedulerInstance(e) {
    for (var h = Bt(this._extensionsManager), a = 0; a < this._schedulerPlugins.length; a++)
      this._schedulerPlugins[a](h);
    return h._internal_id = this._seed++, this.$syncFactory && this.$syncFactory(h), e && this._initFromConfig(h, e), h;
  }
  _initFromConfig(e, h) {
    if (h.plugins && e.plugins(h.plugins), h.config && e.mixin(e.config, h.config, !0), h.templates && e.attachEvent("onTemplatesReady", function() {
      e.mixin(e.templates, h.templates, !0);
    }, { once: !0 }), h.events)
      for (const a in h.events)
        e.attachEvent(a, h.events[a]);
    h.locale && e.i18n.setLocale(h.locale), Array.isArray(h.calendars) && h.calendars.forEach(function(a) {
      e.addCalendar(a);
    }), h.container ? e.init(h.container) : e.init(), h.data && (typeof h.data == "string" ? e.load(h.data) : e.parse(h.data));
  }
}(Gt), Pe = Ye.getSchedulerInstance(), je = Ye;
window.scheduler = Pe, window.Scheduler = je, window.$dhx || (window.$dhx = {}), window.$dhx.scheduler = Pe, window.$dhx.Scheduler = je;
export {
  je as Scheduler,
  Pe as scheduler
};