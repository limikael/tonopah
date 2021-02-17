(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", {value: module, enumerable: true})), module);
  };
  var __publicField = (obj, key, value) => {
    if (typeof key !== "symbol")
      key += "";
    if (key in obj)
      return __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value});
    return obj[key] = value;
  };

  // src/data/CardData.js
  var require_CardData = __commonJS((exports, module) => {
    var CardData3 = class {
      constructor(value) {
        this.value = value;
      }
      isShown() {
        return this.value >= 0;
      }
      getCardValue() {
        return this.value % 13;
      }
      getCardValueString() {
        return CardData3.CARD_VALUE_STRINGS[this.value % 13];
      }
      getSuitIndex() {
        return Math.floor(this.value / 13);
      }
      getSuitString() {
        return CardData3.SUIT_STRINGS[this.getSuitIndex()];
      }
      getLongSuitString() {
        return CardData3.LONG_SUIT_STRINGS[this.getSuitIndex()];
      }
      getColor() {
        if (this.getSuitIndex() % 2 != 0)
          return "#000000";
        else
          return "#ff0000";
      }
      toString() {
        if (this.value < 0)
          return "XX";
        return this.getCardValueString() + this.getSuitString();
      }
      getValue() {
        return this.value;
      }
      static compareValue(a3, b3) {
        if (!(a3 instanceof CardData3) || !(b3 instanceof CardData3))
          throw new Error("Not comparing card data");
        if (a3.getValue() > b3.getValue())
          return 1;
        if (a3.getValue() < b3.getValue())
          return -1;
        return 0;
      }
      static compareCardValue(a3, b3) {
        if (!(a3 instanceof CardData3) || !(b3 instanceof CardData3))
          throw new Error("Not comparing card data");
        if (a3.getCardValue() > b3.getCardValue())
          return 1;
        if (a3.getCardValue() < b3.getCardValue())
          return -1;
        return 0;
      }
      static compareSuitIndex(a3, b3) {
        if (!(a3 instanceof CardData3) || !(b3 instanceof CardData3))
          throw new Error("Not comparing card data");
        if (a3.getSuitIndex() > b3.getSuitIndex())
          return 1;
        if (a3.getSuitIndex() < b3.getSuitIndex())
          return -1;
        return 0;
      }
      static fromString(s3) {
        var i3;
        var cardValue = -1;
        for (i3 = 0; i3 < CardData3.CARD_VALUE_STRINGS.length; i3++) {
          var cand = CardData3.CARD_VALUE_STRINGS[i3];
          if (s3.substring(0, cand.length).toUpperCase() == cand)
            cardValue = i3;
        }
        if (cardValue < 0)
          throw new Error("Not a valid card string: " + s3);
        var suitString = s3.substring(CardData3.CARD_VALUE_STRINGS[cardValue].length);
        var suitIndex = -1;
        for (i3 = 0; i3 < CardData3.SUIT_STRINGS.length; i3++) {
          var cand = CardData3.SUIT_STRINGS[i3];
          if (suitString.toUpperCase() == cand)
            suitIndex = i3;
        }
        if (suitIndex < 0)
          throw new Error("Not a valid card string: " + s3);
        return new CardData3(suitIndex * 13 + cardValue);
      }
    };
    var CardData2 = CardData3;
    __publicField(CardData2, "CARD_VALUE_STRINGS", ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]);
    __publicField(CardData2, "SUIT_STRINGS", ["D", "C", "H", "S"]);
    __publicField(CardData2, "LONG_SUIT_STRINGS", ["Diamonds", "Clubs", "Hearts", "Spades"]);
    __publicField(CardData2, "HIDDEN", -1);
    module.exports = CardData2;
  });

  // src/utils/ArrayUtil.js
  var require_ArrayUtil = __commonJS((exports, module) => {
    var ArrayUtil2 = class {
      static range(to) {
        let a3 = [];
        for (let i3 = 0; i3 < to; i3++)
          a3.push(i3);
        return a3;
      }
      static remove(array, element) {
        var index = array.indexOf(element);
        if (index >= 0)
          array.splice(index, 1);
      }
      static shuffle(arr) {
        var n2 = arr.length;
        while (n2 > 0) {
          var k4 = Math.floor(Math.random() * n2);
          n2--;
          var temp = arr[n2];
          arr[n2] = arr[k4];
          arr[k4] = temp;
        }
        return arr;
      }
      static compareNumbers(a3, b3) {
        return a3 - b3;
      }
    };
    module.exports = ArrayUtil2;
  });

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var o;
  var r;
  var f = {};
  var e = [];
  var c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function s(n2, l3) {
    for (var u3 in l3)
      n2[u3] = l3[u3];
    return n2;
  }
  function a(n2) {
    var l3 = n2.parentNode;
    l3 && l3.removeChild(n2);
  }
  function v(n2, l3, u3) {
    var i3, t3, o3, r3 = arguments, f3 = {};
    for (o3 in l3)
      o3 == "key" ? i3 = l3[o3] : o3 == "ref" ? t3 = l3[o3] : f3[o3] = l3[o3];
    if (arguments.length > 3)
      for (u3 = [u3], o3 = 3; o3 < arguments.length; o3++)
        u3.push(r3[o3]);
    if (u3 != null && (f3.children = u3), typeof n2 == "function" && n2.defaultProps != null)
      for (o3 in n2.defaultProps)
        f3[o3] === void 0 && (f3[o3] = n2.defaultProps[o3]);
    return h(n2, f3, i3, t3, null);
  }
  function h(l3, u3, i3, t3, o3) {
    var r3 = {type: l3, props: u3, key: i3, ref: t3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: o3 == null ? ++n.__v : o3};
    return n.vnode != null && n.vnode(r3), r3;
  }
  function y() {
    return {current: null};
  }
  function p(n2) {
    return n2.children;
  }
  function d(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function _(n2, l3) {
    if (l3 == null)
      return n2.__ ? _(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++)
      if ((u3 = n2.__k[l3]) != null && u3.__e != null)
        return u3.__e;
    return typeof n2.type == "function" ? _(n2) : null;
  }
  function w(n2) {
    var l3, u3;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
        if ((u3 = n2.__k[l3]) != null && u3.__e != null) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return w(n2);
    }
  }
  function k(l3) {
    (!l3.__d && (l3.__d = true) && u.push(l3) && !g.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(g);
  }
  function g() {
    for (var n2; g.__r = u.length; )
      n2 = u.sort(function(n3, l3) {
        return n3.__v.__b - l3.__v.__b;
      }), u = [], n2.some(function(n3) {
        var l3, u3, i3, t3, o3, r3;
        n3.__d && (o3 = (t3 = (l3 = n3).__v).__e, (r3 = l3.__P) && (u3 = [], (i3 = s({}, t3)).__v = t3.__v + 1, $(r3, t3, i3, l3.__n, r3.ownerSVGElement !== void 0, t3.__h != null ? [o3] : null, u3, o3 == null ? _(t3) : o3, t3.__h), j(u3, t3), t3.__e != o3 && w(t3)));
      });
  }
  function m(n2, l3, u3, i3, t3, o3, r3, c3, s3, v3) {
    var y3, d3, w4, k4, g4, m3, x4, P3 = i3 && i3.__k || e, C3 = P3.length;
    for (s3 == f && (s3 = r3 != null ? r3[0] : C3 ? _(i3, 0) : null), u3.__k = [], y3 = 0; y3 < l3.length; y3++)
      if ((k4 = u3.__k[y3] = (k4 = l3[y3]) == null || typeof k4 == "boolean" ? null : typeof k4 == "string" || typeof k4 == "number" ? h(null, k4, null, null, k4) : Array.isArray(k4) ? h(p, {children: k4}, null, null, null) : k4.__b > 0 ? h(k4.type, k4.props, k4.key, null, k4.__v) : k4) != null) {
        if (k4.__ = u3, k4.__b = u3.__b + 1, (w4 = P3[y3]) === null || w4 && k4.key == w4.key && k4.type === w4.type)
          P3[y3] = void 0;
        else
          for (d3 = 0; d3 < C3; d3++) {
            if ((w4 = P3[d3]) && k4.key == w4.key && k4.type === w4.type) {
              P3[d3] = void 0;
              break;
            }
            w4 = null;
          }
        $(n2, k4, w4 = w4 || f, t3, o3, r3, c3, s3, v3), g4 = k4.__e, (d3 = k4.ref) && w4.ref != d3 && (x4 || (x4 = []), w4.ref && x4.push(w4.ref, null, k4), x4.push(d3, k4.__c || g4, k4)), g4 != null ? (m3 == null && (m3 = g4), typeof k4.type == "function" && k4.__k != null && k4.__k === w4.__k ? k4.__d = s3 = b(k4, s3, n2) : s3 = A(n2, k4, w4, P3, r3, g4, s3), v3 || u3.type !== "option" ? typeof u3.type == "function" && (u3.__d = s3) : n2.value = "") : s3 && w4.__e == s3 && s3.parentNode != n2 && (s3 = _(w4));
      }
    if (u3.__e = m3, r3 != null && typeof u3.type != "function")
      for (y3 = r3.length; y3--; )
        r3[y3] != null && a(r3[y3]);
    for (y3 = C3; y3--; )
      P3[y3] != null && (typeof u3.type == "function" && P3[y3].__e != null && P3[y3].__e == u3.__d && (u3.__d = _(i3, y3 + 1)), I(P3[y3], P3[y3]));
    if (x4)
      for (y3 = 0; y3 < x4.length; y3++)
        H(x4[y3], x4[++y3], x4[++y3]);
  }
  function b(n2, l3, u3) {
    var i3, t3;
    for (i3 = 0; i3 < n2.__k.length; i3++)
      (t3 = n2.__k[i3]) && (t3.__ = n2, l3 = typeof t3.type == "function" ? b(t3, l3, u3) : A(u3, t3, t3, n2.__k, null, t3.__e, l3));
    return l3;
  }
  function x(n2, l3) {
    return l3 = l3 || [], n2 == null || typeof n2 == "boolean" || (Array.isArray(n2) ? n2.some(function(n3) {
      x(n3, l3);
    }) : l3.push(n2)), l3;
  }
  function A(n2, l3, u3, i3, t3, o3, r3) {
    var f3, e3, c3;
    if (l3.__d !== void 0)
      f3 = l3.__d, l3.__d = void 0;
    else if (t3 == u3 || o3 != r3 || o3.parentNode == null)
      n:
        if (r3 == null || r3.parentNode !== n2)
          n2.appendChild(o3), f3 = null;
        else {
          for (e3 = r3, c3 = 0; (e3 = e3.nextSibling) && c3 < i3.length; c3 += 2)
            if (e3 == o3)
              break n;
          n2.insertBefore(o3, r3), f3 = r3;
        }
    return f3 !== void 0 ? f3 : o3.nextSibling;
  }
  function P(n2, l3, u3, i3, t3) {
    var o3;
    for (o3 in u3)
      o3 === "children" || o3 === "key" || o3 in l3 || z(n2, o3, null, u3[o3], i3);
    for (o3 in l3)
      t3 && typeof l3[o3] != "function" || o3 === "children" || o3 === "key" || o3 === "value" || o3 === "checked" || u3[o3] === l3[o3] || z(n2, o3, l3[o3], u3[o3], i3);
  }
  function C(n2, l3, u3) {
    l3[0] === "-" ? n2.setProperty(l3, u3) : n2[l3] = u3 == null ? "" : typeof u3 != "number" || c.test(l3) ? u3 : u3 + "px";
  }
  function z(n2, l3, u3, i3, t3) {
    var o3, r3, f3;
    if (t3 && l3 == "className" && (l3 = "class"), l3 === "style")
      if (typeof u3 == "string")
        n2.style.cssText = u3;
      else {
        if (typeof i3 == "string" && (n2.style.cssText = i3 = ""), i3)
          for (l3 in i3)
            u3 && l3 in u3 || C(n2.style, l3, "");
        if (u3)
          for (l3 in u3)
            i3 && u3[l3] === i3[l3] || C(n2.style, l3, u3[l3]);
      }
    else
      l3[0] === "o" && l3[1] === "n" ? (o3 = l3 !== (l3 = l3.replace(/Capture$/, "")), (r3 = l3.toLowerCase()) in n2 && (l3 = r3), l3 = l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u3, f3 = o3 ? T : N, u3 ? i3 || n2.addEventListener(l3, f3, o3) : n2.removeEventListener(l3, f3, o3)) : l3 !== "list" && l3 !== "tagName" && l3 !== "form" && l3 !== "type" && l3 !== "size" && l3 !== "download" && l3 !== "href" && l3 !== "contentEditable" && !t3 && l3 in n2 ? n2[l3] = u3 == null ? "" : u3 : typeof u3 != "function" && l3 !== "dangerouslySetInnerHTML" && (l3 !== (l3 = l3.replace(/xlink:?/, "")) ? u3 == null || u3 === false ? n2.removeAttributeNS("http://www.w3.org/1999/xlink", l3.toLowerCase()) : n2.setAttributeNS("http://www.w3.org/1999/xlink", l3.toLowerCase(), u3) : u3 == null || u3 === false && !/^ar/.test(l3) ? n2.removeAttribute(l3) : n2.setAttribute(l3, u3));
  }
  function N(l3) {
    this.l[l3.type + false](n.event ? n.event(l3) : l3);
  }
  function T(l3) {
    this.l[l3.type + true](n.event ? n.event(l3) : l3);
  }
  function $(l3, u3, i3, t3, o3, r3, f3, e3, c3) {
    var a3, v3, h3, y3, _3, w4, k4, g4, b3, x4, A4, P3 = u3.type;
    if (u3.constructor !== void 0)
      return null;
    i3.__h != null && (c3 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, r3 = [e3]), (a3 = n.__b) && a3(u3);
    try {
      n:
        if (typeof P3 == "function") {
          if (g4 = u3.props, b3 = (a3 = P3.contextType) && t3[a3.__c], x4 = a3 ? b3 ? b3.props.value : a3.__ : t3, i3.__c ? k4 = (v3 = u3.__c = i3.__c).__ = v3.__E : ("prototype" in P3 && P3.prototype.render ? u3.__c = v3 = new P3(g4, x4) : (u3.__c = v3 = new d(g4, x4), v3.constructor = P3, v3.render = L), b3 && b3.sub(v3), v3.props = g4, v3.state || (v3.state = {}), v3.context = x4, v3.__n = t3, h3 = v3.__d = true, v3.__h = []), v3.__s == null && (v3.__s = v3.state), P3.getDerivedStateFromProps != null && (v3.__s == v3.state && (v3.__s = s({}, v3.__s)), s(v3.__s, P3.getDerivedStateFromProps(g4, v3.__s))), y3 = v3.props, _3 = v3.state, h3)
            P3.getDerivedStateFromProps == null && v3.componentWillMount != null && v3.componentWillMount(), v3.componentDidMount != null && v3.__h.push(v3.componentDidMount);
          else {
            if (P3.getDerivedStateFromProps == null && g4 !== y3 && v3.componentWillReceiveProps != null && v3.componentWillReceiveProps(g4, x4), !v3.__e && v3.shouldComponentUpdate != null && v3.shouldComponentUpdate(g4, v3.__s, x4) === false || u3.__v === i3.__v) {
              v3.props = g4, v3.state = v3.__s, u3.__v !== i3.__v && (v3.__d = false), v3.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, v3.__h.length && f3.push(v3);
              break n;
            }
            v3.componentWillUpdate != null && v3.componentWillUpdate(g4, v3.__s, x4), v3.componentDidUpdate != null && v3.__h.push(function() {
              v3.componentDidUpdate(y3, _3, w4);
            });
          }
          v3.context = x4, v3.props = g4, v3.state = v3.__s, (a3 = n.__r) && a3(u3), v3.__d = false, v3.__v = u3, v3.__P = l3, a3 = v3.render(v3.props, v3.state, v3.context), v3.state = v3.__s, v3.getChildContext != null && (t3 = s(s({}, t3), v3.getChildContext())), h3 || v3.getSnapshotBeforeUpdate == null || (w4 = v3.getSnapshotBeforeUpdate(y3, _3)), A4 = a3 != null && a3.type === p && a3.key == null ? a3.props.children : a3, m(l3, Array.isArray(A4) ? A4 : [A4], u3, i3, t3, o3, r3, f3, e3, c3), v3.base = u3.__e, u3.__h = null, v3.__h.length && f3.push(v3), k4 && (v3.__E = v3.__ = null), v3.__e = false;
        } else
          r3 == null && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = E(i3.__e, u3, i3, t3, o3, r3, f3, c3);
      (a3 = n.diffed) && a3(u3);
    } catch (l4) {
      u3.__v = null, (c3 || r3 != null) && (u3.__e = e3, u3.__h = !!c3, r3[r3.indexOf(e3)] = null), n.__e(l4, u3, i3);
    }
  }
  function j(l3, u3) {
    n.__c && n.__c(u3, l3), l3.some(function(u4) {
      try {
        l3 = u4.__h, u4.__h = [], l3.some(function(n2) {
          n2.call(u4);
        });
      } catch (l4) {
        n.__e(l4, u4.__v);
      }
    });
  }
  function E(n2, l3, u3, i3, t3, o3, r3, c3) {
    var s3, a3, v3, h3, y3, p3 = u3.props, d3 = l3.props;
    if (t3 = l3.type === "svg" || t3, o3 != null) {
      for (s3 = 0; s3 < o3.length; s3++)
        if ((a3 = o3[s3]) != null && ((l3.type === null ? a3.nodeType === 3 : a3.localName === l3.type) || n2 == a3)) {
          n2 = a3, o3[s3] = null;
          break;
        }
    }
    if (n2 == null) {
      if (l3.type === null)
        return document.createTextNode(d3);
      n2 = t3 ? document.createElementNS("http://www.w3.org/2000/svg", l3.type) : document.createElement(l3.type, d3.is && {is: d3.is}), o3 = null, c3 = false;
    }
    if (l3.type === null)
      p3 === d3 || c3 && n2.data === d3 || (n2.data = d3);
    else {
      if (o3 != null && (o3 = e.slice.call(n2.childNodes)), v3 = (p3 = u3.props || f).dangerouslySetInnerHTML, h3 = d3.dangerouslySetInnerHTML, !c3) {
        if (o3 != null)
          for (p3 = {}, y3 = 0; y3 < n2.attributes.length; y3++)
            p3[n2.attributes[y3].name] = n2.attributes[y3].value;
        (h3 || v3) && (h3 && (v3 && h3.__html == v3.__html || h3.__html === n2.innerHTML) || (n2.innerHTML = h3 && h3.__html || ""));
      }
      P(n2, d3, p3, t3, c3), h3 ? l3.__k = [] : (s3 = l3.props.children, m(n2, Array.isArray(s3) ? s3 : [s3], l3, u3, i3, l3.type !== "foreignObject" && t3, o3, r3, f, c3)), c3 || ("value" in d3 && (s3 = d3.value) !== void 0 && (s3 !== n2.value || l3.type === "progress" && !s3) && z(n2, "value", s3, p3.value, false), "checked" in d3 && (s3 = d3.checked) !== void 0 && s3 !== n2.checked && z(n2, "checked", s3, p3.checked, false));
    }
    return n2;
  }
  function H(l3, u3, i3) {
    try {
      typeof l3 == "function" ? l3(u3) : l3.current = u3;
    } catch (l4) {
      n.__e(l4, i3);
    }
  }
  function I(l3, u3, i3) {
    var t3, o3, r3;
    if (n.unmount && n.unmount(l3), (t3 = l3.ref) && (t3.current && t3.current !== l3.__e || H(t3, null, u3)), i3 || typeof l3.type == "function" || (i3 = (o3 = l3.__e) != null), l3.__e = l3.__d = void 0, (t3 = l3.__c) != null) {
      if (t3.componentWillUnmount)
        try {
          t3.componentWillUnmount();
        } catch (l4) {
          n.__e(l4, u3);
        }
      t3.base = t3.__P = null;
    }
    if (t3 = l3.__k)
      for (r3 = 0; r3 < t3.length; r3++)
        t3[r3] && I(t3[r3], u3, i3);
    o3 != null && a(o3);
  }
  function L(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function M(l3, u3, i3) {
    var t3, r3, c3;
    n.__ && n.__(l3, u3), r3 = (t3 = i3 === o) ? null : i3 && i3.__k || u3.__k, l3 = v(p, null, [l3]), c3 = [], $(u3, (t3 ? u3 : i3 || u3).__k = l3, r3 || f, f, u3.ownerSVGElement !== void 0, i3 && !t3 ? [i3] : r3 ? null : u3.childNodes.length ? e.slice.call(u3.childNodes) : null, c3, i3 || f, t3), j(c3, l3);
  }
  function O(n2, l3) {
    M(n2, l3, o);
  }
  function S(n2, l3, u3) {
    var i3, t3, o3, r3 = arguments, f3 = s({}, n2.props);
    for (o3 in l3)
      o3 == "key" ? i3 = l3[o3] : o3 == "ref" ? t3 = l3[o3] : f3[o3] = l3[o3];
    if (arguments.length > 3)
      for (u3 = [u3], o3 = 3; o3 < arguments.length; o3++)
        u3.push(r3[o3]);
    return u3 != null && (f3.children = u3), h(n2.type, f3, i3 || n2.key, t3 || n2.ref, null);
  }
  function q(n2, l3) {
    var u3 = {__c: l3 = "__cC" + r++, __: n2, Consumer: function(n3, l4) {
      return n3.children(l4);
    }, Provider: function(n3) {
      var u4, i3;
      return this.getChildContext || (u4 = [], (i3 = {})[l3] = this, this.getChildContext = function() {
        return i3;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && u4.some(k);
      }, this.sub = function(n4) {
        u4.push(n4);
        var l4 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u4.splice(u4.indexOf(n4), 1), l4 && l4.call(n4);
        };
      }), n3.children;
    }};
    return u3.Provider.__ = u3.Consumer.contextType = u3;
  }
  n = {__e: function(n2, l3) {
    for (var u3, i3, t3, o3 = l3.__h; l3 = l3.__; )
      if ((u3 = l3.__c) && !u3.__)
        try {
          if ((i3 = u3.constructor) && i3.getDerivedStateFromError != null && (u3.setState(i3.getDerivedStateFromError(n2)), t3 = u3.__d), u3.componentDidCatch != null && (u3.componentDidCatch(n2), t3 = u3.__d), t3)
            return l3.__h = o3, u3.__E = u3;
        } catch (l4) {
          n2 = l4;
        }
    throw n2;
  }, __v: 0}, l = function(n2) {
    return n2 != null && n2.constructor === void 0;
  }, d.prototype.setState = function(n2, l3) {
    var u3;
    u3 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), typeof n2 == "function" && (n2 = n2(s({}, u3), this.props)), n2 && s(u3, n2), n2 != null && this.__v && (l3 && this.__h.push(l3), k(this));
  }, d.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), k(this));
  }, d.prototype.render = p, u = [], i = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, o = f, r = 0;

  // node_modules/@babel/runtime/helpers/esm/extends.js
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i3 = 1; i3 < arguments.length; i3++) {
        var source = arguments[i3];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  // node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i3;
    for (i3 = 0; i3 < sourceKeys.length; i3++) {
      key = sourceKeys[i3];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var u2;
  var r2;
  var o2 = 0;
  var i2 = [];
  var c2 = n.__b;
  var f2 = n.__r;
  var e2 = n.diffed;
  var a2 = n.__c;
  var v2 = n.unmount;
  function m2(t3, r3) {
    n.__h && n.__h(u2, t3, o2 || r3), o2 = 0;
    var i3 = u2.__H || (u2.__H = {__: [], __h: []});
    return t3 >= i3.__.length && i3.__.push({}), i3.__[t3];
  }
  function l2(n2) {
    return o2 = 1, p2(w2, n2);
  }
  function p2(n2, r3, o3) {
    var i3 = m2(t2++, 2);
    return i3.t = n2, i3.__c || (i3.__ = [o3 ? o3(r3) : w2(void 0, r3), function(n3) {
      var t3 = i3.t(i3.__[0], n3);
      i3.__[0] !== t3 && (i3.__ = [t3, i3.__[1]], i3.__c.setState({}));
    }], i3.__c = u2), i3.__;
  }
  function y2(r3, o3) {
    var i3 = m2(t2++, 3);
    !n.__s && k2(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u2.__H.__h.push(i3));
  }
  function h2(r3, o3) {
    var i3 = m2(t2++, 4);
    !n.__s && k2(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u2.__h.push(i3));
  }
  function s2(n2) {
    return o2 = 5, d2(function() {
      return {current: n2};
    }, []);
  }
  function _2(n2, t3, u3) {
    o2 = 6, h2(function() {
      typeof n2 == "function" ? n2(t3()) : n2 && (n2.current = t3());
    }, u3 == null ? u3 : u3.concat(n2));
  }
  function d2(n2, u3) {
    var r3 = m2(t2++, 7);
    return k2(r3.__H, u3) && (r3.__ = n2(), r3.__H = u3, r3.__h = n2), r3.__;
  }
  function A2(n2, t3) {
    return o2 = 8, d2(function() {
      return n2;
    }, t3);
  }
  function F(n2) {
    var r3 = u2.context[n2.__c], o3 = m2(t2++, 9);
    return o3.__c = n2, r3 ? (o3.__ == null && (o3.__ = true, r3.sub(u2)), r3.props.value) : n2.__;
  }
  function T2(t3, u3) {
    n.useDebugValue && n.useDebugValue(u3 ? u3(t3) : t3);
  }
  function x2() {
    i2.forEach(function(t3) {
      if (t3.__P)
        try {
          t3.__H.__h.forEach(g2), t3.__H.__h.forEach(j2), t3.__H.__h = [];
        } catch (u3) {
          t3.__H.__h = [], n.__e(u3, t3.__v);
        }
    }), i2 = [];
  }
  n.__b = function(n2) {
    u2 = null, c2 && c2(n2);
  }, n.__r = function(n2) {
    f2 && f2(n2), t2 = 0;
    var r3 = (u2 = n2.__c).__H;
    r3 && (r3.__h.forEach(g2), r3.__h.forEach(j2), r3.__h = []);
  }, n.diffed = function(t3) {
    e2 && e2(t3);
    var o3 = t3.__c;
    o3 && o3.__H && o3.__H.__h.length && (i2.push(o3) !== 1 && r2 === n.requestAnimationFrame || ((r2 = n.requestAnimationFrame) || function(n2) {
      var t4, u3 = function() {
        clearTimeout(r3), b2 && cancelAnimationFrame(t4), setTimeout(n2);
      }, r3 = setTimeout(u3, 100);
      b2 && (t4 = requestAnimationFrame(u3));
    })(x2)), u2 = void 0;
  }, n.__c = function(t3, u3) {
    u3.some(function(t4) {
      try {
        t4.__h.forEach(g2), t4.__h = t4.__h.filter(function(n2) {
          return !n2.__ || j2(n2);
        });
      } catch (r3) {
        u3.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), u3 = [], n.__e(r3, t4.__v);
      }
    }), a2 && a2(t3, u3);
  }, n.unmount = function(t3) {
    v2 && v2(t3);
    var u3 = t3.__c;
    if (u3 && u3.__H)
      try {
        u3.__H.__.forEach(g2);
      } catch (t4) {
        n.__e(t4, u3.__v);
      }
  };
  var b2 = typeof requestAnimationFrame == "function";
  function g2(n2) {
    var t3 = u2;
    typeof n2.__c == "function" && n2.__c(), u2 = t3;
  }
  function j2(n2) {
    var t3 = u2;
    n2.__c = n2.__(), u2 = t3;
  }
  function k2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, u3) {
      return t4 !== n2[u3];
    });
  }
  function w2(n2, t3) {
    return typeof t3 == "function" ? t3(n2) : t3;
  }

  // node_modules/preact/compat/dist/compat.module.js
  function C2(n2, t3) {
    for (var e3 in t3)
      n2[e3] = t3[e3];
    return n2;
  }
  function S2(n2, t3) {
    for (var e3 in n2)
      if (e3 !== "__source" && !(e3 in t3))
        return true;
    for (var r3 in t3)
      if (r3 !== "__source" && n2[r3] !== t3[r3])
        return true;
    return false;
  }
  function E2(n2) {
    this.props = n2;
  }
  function g3(n2, t3) {
    function e3(n3) {
      var e4 = this.props.ref, r4 = e4 == n3.ref;
      return !r4 && e4 && (e4.call ? e4(null) : e4.current = null), t3 ? !t3(this.props, n3) || !r4 : S2(this.props, n3);
    }
    function r3(t4) {
      return this.shouldComponentUpdate = e3, v(n2, t4);
    }
    return r3.displayName = "Memo(" + (n2.displayName || n2.name) + ")", r3.prototype.isReactComponent = true, r3.__f = true, r3;
  }
  (E2.prototype = new d()).isPureReactComponent = true, E2.prototype.shouldComponentUpdate = function(n2, t3) {
    return S2(this.props, n2) || S2(this.state, t3);
  };
  var w3 = n.__b;
  n.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), w3 && w3(n2);
  };
  var R = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  function x3(n2) {
    function t3(t4, e3) {
      var r3 = C2({}, t4);
      return delete r3.ref, n2(r3, (e3 = t4.ref || e3) && (typeof e3 != "object" || "current" in e3) ? e3 : null);
    }
    return t3.$$typeof = R, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t3;
  }
  var N2 = function(n2, t3) {
    return n2 == null ? null : x(x(n2).map(t3));
  };
  var k3 = {map: N2, forEach: N2, count: function(n2) {
    return n2 ? x(n2).length : 0;
  }, only: function(n2) {
    var t3 = x(n2);
    if (t3.length !== 1)
      throw "Children.only";
    return t3[0];
  }, toArray: x};
  var A3 = n.__e;
  function O2() {
    this.__u = 0, this.t = null, this.__b = null;
  }
  function L2(n2) {
    var t3 = n2.__.__c;
    return t3 && t3.__e && t3.__e(n2);
  }
  function U(n2) {
    var t3, e3, r3;
    function o3(o4) {
      if (t3 || (t3 = n2()).then(function(n3) {
        e3 = n3.default || n3;
      }, function(n3) {
        r3 = n3;
      }), r3)
        throw r3;
      if (!e3)
        throw t3;
      return v(e3, o4);
    }
    return o3.displayName = "Lazy", o3.__f = true, o3;
  }
  function D() {
    this.o = null, this.u = null;
  }
  n.__e = function(n2, t3, e3) {
    if (n2.then) {
      for (var r3, o3 = t3; o3 = o3.__; )
        if ((r3 = o3.__c) && r3.__c)
          return t3.__e == null && (t3.__e = e3.__e, t3.__k = e3.__k), r3.__c(n2, t3);
    }
    A3(n2, t3, e3);
  }, (O2.prototype = new d()).__c = function(n2, t3) {
    var e3 = t3.__c, r3 = this;
    r3.t == null && (r3.t = []), r3.t.push(e3);
    var o3 = L2(r3.__v), u3 = false, i3 = function() {
      u3 || (u3 = true, e3.componentWillUnmount = e3.__c, o3 ? o3(f3) : f3());
    };
    e3.__c = e3.componentWillUnmount, e3.componentWillUnmount = function() {
      i3(), e3.__c && e3.__c();
    };
    var f3 = function() {
      if (!--r3.__u) {
        if (r3.state.__e) {
          var n3 = r3.state.__e;
          r3.__v.__k[0] = function n4(t5, e4, r4) {
            return t5 && (t5.__v = null, t5.__k = t5.__k && t5.__k.map(function(t6) {
              return n4(t6, e4, r4);
            }), t5.__c && t5.__c.__P === e4 && (t5.__e && r4.insertBefore(t5.__e, t5.__d), t5.__c.__e = true, t5.__c.__P = r4)), t5;
          }(n3, n3.__c.__P, n3.__c.__O);
        }
        var t4;
        for (r3.setState({__e: r3.__b = null}); t4 = r3.t.pop(); )
          t4.forceUpdate();
      }
    }, c3 = t3.__h === true;
    r3.__u++ || c3 || r3.setState({__e: r3.__b = r3.__v.__k[0]}), n2.then(i3, i3);
  }, O2.prototype.componentWillUnmount = function() {
    this.t = [];
  }, O2.prototype.render = function(n2, t3) {
    if (this.__b) {
      if (this.__v.__k) {
        var e3 = document.createElement("div"), r3 = this.__v.__k[0].__c;
        this.__v.__k[0] = function n3(t4, e4, r4) {
          return t4 && (t4.__c && t4.__c.__H && (t4.__c.__H.__.forEach(function(n4) {
            typeof n4.__c == "function" && n4.__c();
          }), t4.__c.__H = null), (t4 = C2({}, t4)).__c != null && (t4.__c.__P === r4 && (t4.__c.__P = e4), t4.__c = null), t4.__k = t4.__k && t4.__k.map(function(t5) {
            return n3(t5, e4, r4);
          })), t4;
        }(this.__b, e3, r3.__O = r3.__P);
      }
      this.__b = null;
    }
    var o3 = t3.__e && v(p, null, n2.fallback);
    return o3 && (o3.__h = null), [v(p, null, t3.__e ? null : n2.children), o3];
  };
  var F2 = function(n2, t3, e3) {
    if (++e3[1] === e3[0] && n2.u.delete(t3), n2.props.revealOrder && (n2.props.revealOrder[0] !== "t" || !n2.u.size))
      for (e3 = n2.o; e3; ) {
        for (; e3.length > 3; )
          e3.pop()();
        if (e3[1] < e3[0])
          break;
        n2.o = e3 = e3[2];
      }
  };
  function M2(n2) {
    return this.getChildContext = function() {
      return n2.context;
    }, n2.children;
  }
  function T3(n2) {
    var t3 = this, e3 = n2.i;
    t3.componentWillUnmount = function() {
      M(null, t3.l), t3.l = null, t3.i = null;
    }, t3.i && t3.i !== e3 && t3.componentWillUnmount(), n2.__v ? (t3.l || (t3.i = e3, t3.l = {nodeType: 1, parentNode: e3, childNodes: [], appendChild: function(n3) {
      this.childNodes.push(n3), t3.i.appendChild(n3);
    }, insertBefore: function(n3, e4) {
      this.childNodes.push(n3), t3.i.appendChild(n3);
    }, removeChild: function(n3) {
      this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), t3.i.removeChild(n3);
    }}), M(v(M2, {context: t3.context}, n2.__v), t3.l)) : t3.l && t3.componentWillUnmount();
  }
  function j3(n2, t3) {
    return v(T3, {__v: n2, i: t3});
  }
  (D.prototype = new d()).__e = function(n2) {
    var t3 = this, e3 = L2(t3.__v), r3 = t3.u.get(n2);
    return r3[0]++, function(o3) {
      var u3 = function() {
        t3.props.revealOrder ? (r3.push(o3), F2(t3, n2, r3)) : o3();
      };
      e3 ? e3(u3) : u3();
    };
  }, D.prototype.render = function(n2) {
    this.o = null, this.u = new Map();
    var t3 = x(n2.children);
    n2.revealOrder && n2.revealOrder[0] === "b" && t3.reverse();
    for (var e3 = t3.length; e3--; )
      this.u.set(t3[e3], this.o = [1, 0, this.o]);
    return n2.children;
  }, D.prototype.componentDidUpdate = D.prototype.componentDidMount = function() {
    var n2 = this;
    this.u.forEach(function(t3, e3) {
      F2(n2, e3, t3);
    });
  };
  var I2 = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.element") || 60103;
  var W = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
  var P2 = function(n2) {
    return (typeof Symbol != "undefined" && typeof Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(n2);
  };
  function z2(n2, t3, e3) {
    return t3.__k == null && (t3.textContent = ""), M(n2, t3), typeof e3 == "function" && e3(), n2 ? n2.__c : null;
  }
  function B(n2, t3, e3) {
    return O(n2, t3), typeof e3 == "function" && e3(), n2 ? n2.__c : null;
  }
  d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n2) {
    Object.defineProperty(d.prototype, n2, {configurable: true, get: function() {
      return this["UNSAFE_" + n2];
    }, set: function(t3) {
      Object.defineProperty(this, n2, {configurable: true, writable: true, value: t3});
    }});
  });
  var V = n.event;
  function H2() {
  }
  function Z() {
    return this.cancelBubble;
  }
  function Y() {
    return this.defaultPrevented;
  }
  n.event = function(n2) {
    return V && (n2 = V(n2)), n2.persist = H2, n2.isPropagationStopped = Z, n2.isDefaultPrevented = Y, n2.nativeEvent = n2;
  };
  var $2;
  var q2 = {configurable: true, get: function() {
    return this.class;
  }};
  var G = n.vnode;
  n.vnode = function(n2) {
    var t3 = n2.type, e3 = n2.props, r3 = e3;
    if (typeof t3 == "string") {
      for (var o3 in r3 = {}, e3) {
        var u3 = e3[o3];
        o3 === "defaultValue" && "value" in e3 && e3.value == null ? o3 = "value" : o3 === "download" && u3 === true ? u3 = "" : /ondoubleclick/i.test(o3) ? o3 = "ondblclick" : /^onchange(textarea|input)/i.test(o3 + t3) && !P2(e3.type) ? o3 = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(o3) ? o3 = o3.toLowerCase() : W.test(o3) ? o3 = o3.replace(/[A-Z0-9]/, "-$&").toLowerCase() : u3 === null && (u3 = void 0), r3[o3] = u3;
      }
      t3 == "select" && r3.multiple && Array.isArray(r3.value) && (r3.value = x(e3.children).forEach(function(n3) {
        n3.props.selected = r3.value.indexOf(n3.props.value) != -1;
      })), t3 == "select" && r3.defaultValue != null && (r3.value = x(e3.children).forEach(function(n3) {
        n3.props.selected = r3.multiple ? r3.defaultValue.indexOf(n3.props.value) != -1 : r3.defaultValue == n3.props.value;
      })), n2.props = r3;
    }
    t3 && e3.class != e3.className && (q2.enumerable = "className" in e3, e3.className != null && (r3.class = e3.className), Object.defineProperty(r3, "className", q2)), n2.$$typeof = I2, G && G(n2);
  };
  var J = n.__r;
  n.__r = function(n2) {
    J && J(n2), $2 = n2.__c;
  };
  var K = {ReactCurrentDispatcher: {current: {readContext: function(n2) {
    return $2.__n[n2.__c].props.value;
  }}}};
  var on = typeof performance == "object" && typeof performance.now == "function" ? performance.now.bind(performance) : function() {
    return Date.now();
  };
  function fn(n2) {
    return v.bind(null, n2);
  }
  function cn(n2) {
    return !!n2 && n2.$$typeof === I2;
  }
  function ln(n2) {
    return cn(n2) ? S.apply(null, arguments) : n2;
  }
  function an(n2) {
    return !!n2.__k && (M(null, n2), true);
  }
  function sn(n2) {
    return n2 && (n2.base || n2.nodeType === 1 && n2) || null;
  }
  var hn = function(n2, t3) {
    return n2(t3);
  };
  var compat_module_default = {useState: l2, useReducer: p2, useEffect: y2, useLayoutEffect: h2, useRef: s2, useImperativeHandle: _2, useMemo: d2, useCallback: A2, useContext: F, useDebugValue: T2, version: "16.8.0", Children: k3, render: z2, hydrate: B, unmountComponentAtNode: an, createPortal: j3, createElement: v, createContext: q, createFactory: fn, cloneElement: ln, createRef: y, Fragment: p, isValidElement: cn, findDOMNode: sn, Component: d, PureComponent: E2, memo: g3, forwardRef: x3, unstable_batchedUpdates: hn, StrictMode: p, Suspense: O2, SuspenseList: D, lazy: U, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: K};

  // src/utils/react-shim.js
  var react_shim_default = compat_module_default;

  // node_modules/react-spring/web.js
  var is = {
    arr: Array.isArray,
    obj: (a3) => Object.prototype.toString.call(a3) === "[object Object]",
    fun: (a3) => typeof a3 === "function",
    str: (a3) => typeof a3 === "string",
    num: (a3) => typeof a3 === "number",
    und: (a3) => a3 === void 0,
    nul: (a3) => a3 === null,
    set: (a3) => a3 instanceof Set,
    map: (a3) => a3 instanceof Map,
    equ(a3, b3) {
      if (typeof a3 !== typeof b3)
        return false;
      if (is.str(a3) || is.num(a3))
        return a3 === b3;
      if (is.obj(a3) && is.obj(b3) && Object.keys(a3).length + Object.keys(b3).length === 0)
        return true;
      let i3;
      for (i3 in a3)
        if (!(i3 in b3))
          return false;
      for (i3 in b3)
        if (a3[i3] !== b3[i3])
          return false;
      return is.und(i3) ? a3 === b3 : true;
    }
  };
  function merge(target, lowercase) {
    if (lowercase === void 0) {
      lowercase = true;
    }
    return (object) => (is.arr(object) ? object : Object.keys(object)).reduce((acc, element) => {
      const key = lowercase ? element[0].toLowerCase() + element.substring(1) : element;
      acc[key] = target(key);
      return acc;
    }, target);
  }
  function useForceUpdate() {
    const _useState = l2(false), f3 = _useState[1];
    const forceUpdate = A2(() => f3((v3) => !v3), []);
    return forceUpdate;
  }
  function withDefault(value, defaultValue) {
    return is.und(value) || is.nul(value) ? defaultValue : value;
  }
  function toArray(a3) {
    return !is.und(a3) ? is.arr(a3) ? a3 : [a3] : [];
  }
  function callProp(obj) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return is.fun(obj) ? obj(...args) : obj;
  }
  function getForwardProps(props) {
    const to = props.to, from = props.from, config = props.config, onStart = props.onStart, onRest = props.onRest, onFrame = props.onFrame, children = props.children, reset = props.reset, reverse = props.reverse, force = props.force, immediate = props.immediate, delay = props.delay, attach = props.attach, destroyed = props.destroyed, interpolateTo2 = props.interpolateTo, ref = props.ref, lazy = props.lazy, forward = _objectWithoutPropertiesLoose(props, ["to", "from", "config", "onStart", "onRest", "onFrame", "children", "reset", "reverse", "force", "immediate", "delay", "attach", "destroyed", "interpolateTo", "ref", "lazy"]);
    return forward;
  }
  function interpolateTo(props) {
    const forward = getForwardProps(props);
    if (is.und(forward))
      return _extends({
        to: forward
      }, props);
    const rest = Object.keys(props).reduce((a3, k4) => !is.und(forward[k4]) ? a3 : _extends({}, a3, {
      [k4]: props[k4]
    }), {});
    return _extends({
      to: forward
    }, rest);
  }
  function handleRef(ref, forward) {
    if (forward) {
      if (is.fun(forward))
        forward(ref);
      else if (is.obj(forward)) {
        forward.current = ref;
      }
    }
    return ref;
  }
  var Animated = class {
    constructor() {
      this.payload = void 0;
      this.children = [];
    }
    getAnimatedValue() {
      return this.getValue();
    }
    getPayload() {
      return this.payload || this;
    }
    attach() {
    }
    detach() {
    }
    getChildren() {
      return this.children;
    }
    addChild(child) {
      if (this.children.length === 0)
        this.attach();
      this.children.push(child);
    }
    removeChild(child) {
      const index = this.children.indexOf(child);
      this.children.splice(index, 1);
      if (this.children.length === 0)
        this.detach();
    }
  };
  var AnimatedArray = class extends Animated {
    constructor() {
      super(...arguments);
      this.payload = [];
      this.attach = () => this.payload.forEach((p3) => p3 instanceof Animated && p3.addChild(this));
      this.detach = () => this.payload.forEach((p3) => p3 instanceof Animated && p3.removeChild(this));
    }
  };
  var AnimatedObject = class extends Animated {
    constructor() {
      super(...arguments);
      this.payload = {};
      this.attach = () => Object.values(this.payload).forEach((s3) => s3 instanceof Animated && s3.addChild(this));
      this.detach = () => Object.values(this.payload).forEach((s3) => s3 instanceof Animated && s3.removeChild(this));
    }
    getValue(animated) {
      if (animated === void 0) {
        animated = false;
      }
      const payload = {};
      for (const key in this.payload) {
        const value = this.payload[key];
        if (animated && !(value instanceof Animated))
          continue;
        payload[key] = value instanceof Animated ? value[animated ? "getAnimatedValue" : "getValue"]() : value;
      }
      return payload;
    }
    getAnimatedValue() {
      return this.getValue(true);
    }
  };
  var applyAnimatedValues;
  function injectApplyAnimatedValues(fn2, transform) {
    applyAnimatedValues = {
      fn: fn2,
      transform
    };
  }
  var colorNames;
  function injectColorNames(names) {
    colorNames = names;
  }
  var requestFrame = (cb) => typeof window !== "undefined" ? window.requestAnimationFrame(cb) : -1;
  var interpolation;
  function injectStringInterpolator(fn2) {
    interpolation = fn2;
  }
  var now = () => Date.now();
  var defaultElement;
  function injectDefaultElement(el) {
    defaultElement = el;
  }
  var animatedApi = (node) => node.current;
  var createAnimatedStyle;
  function injectCreateAnimatedStyle(factory) {
    createAnimatedStyle = factory;
  }
  var manualFrameloop;
  var AnimatedProps = class extends AnimatedObject {
    constructor(props, callback) {
      super();
      this.update = void 0;
      this.payload = !props.style ? props : _extends({}, props, {
        style: createAnimatedStyle(props.style)
      });
      this.update = callback;
      this.attach();
    }
  };
  var isFunctionComponent = (val) => is.fun(val) && !(val.prototype instanceof react_shim_default.Component);
  var createAnimatedComponent = (Component) => {
    const AnimatedComponent = x3((props, ref) => {
      const forceUpdate = useForceUpdate();
      const mounted = s2(true);
      const propsAnimated = s2(null);
      const node = s2(null);
      const attachProps = A2((props2) => {
        const oldPropsAnimated = propsAnimated.current;
        const callback = () => {
          let didUpdate = false;
          if (node.current) {
            didUpdate = applyAnimatedValues.fn(node.current, propsAnimated.current.getAnimatedValue());
          }
          if (!node.current || didUpdate === false) {
            forceUpdate();
          }
        };
        propsAnimated.current = new AnimatedProps(props2, callback);
        oldPropsAnimated && oldPropsAnimated.detach();
      }, []);
      y2(() => () => {
        mounted.current = false;
        propsAnimated.current && propsAnimated.current.detach();
      }, []);
      _2(ref, () => animatedApi(node, mounted, forceUpdate));
      attachProps(props);
      const _getValue = propsAnimated.current.getValue(), scrollTop = _getValue.scrollTop, scrollLeft = _getValue.scrollLeft, animatedProps = _objectWithoutPropertiesLoose(_getValue, ["scrollTop", "scrollLeft"]);
      const refFn = isFunctionComponent(Component) ? void 0 : (childRef) => node.current = handleRef(childRef, ref);
      return react_shim_default.createElement(Component, _extends({}, animatedProps, {
        ref: refFn
      }));
    });
    return AnimatedComponent;
  };
  var active = false;
  var controllers = new Set();
  var update = () => {
    if (!active)
      return false;
    let time = now();
    for (let controller of controllers) {
      let isActive = false;
      for (let configIdx = 0; configIdx < controller.configs.length; configIdx++) {
        let config = controller.configs[configIdx];
        let endOfAnimation, lastTime;
        for (let valIdx = 0; valIdx < config.animatedValues.length; valIdx++) {
          let animation = config.animatedValues[valIdx];
          if (animation.done)
            continue;
          let from = config.fromValues[valIdx];
          let to = config.toValues[valIdx];
          let position = animation.lastPosition;
          let isAnimated = to instanceof Animated;
          let velocity = Array.isArray(config.initialVelocity) ? config.initialVelocity[valIdx] : config.initialVelocity;
          if (isAnimated)
            to = to.getValue();
          if (config.immediate) {
            animation.setValue(to);
            animation.done = true;
            continue;
          }
          if (typeof from === "string" || typeof to === "string") {
            animation.setValue(to);
            animation.done = true;
            continue;
          }
          if (config.duration !== void 0) {
            position = from + config.easing((time - animation.startTime) / config.duration) * (to - from);
            endOfAnimation = time >= animation.startTime + config.duration;
          } else if (config.decay) {
            position = from + velocity / (1 - 0.998) * (1 - Math.exp(-(1 - 0.998) * (time - animation.startTime)));
            endOfAnimation = Math.abs(animation.lastPosition - position) < 0.1;
            if (endOfAnimation)
              to = position;
          } else {
            lastTime = animation.lastTime !== void 0 ? animation.lastTime : time;
            velocity = animation.lastVelocity !== void 0 ? animation.lastVelocity : config.initialVelocity;
            if (time > lastTime + 64)
              lastTime = time;
            let numSteps = Math.floor(time - lastTime);
            for (let i3 = 0; i3 < numSteps; ++i3) {
              let force = -config.tension * (position - to);
              let damping = -config.friction * velocity;
              let acceleration = (force + damping) / config.mass;
              velocity = velocity + acceleration * 1 / 1e3;
              position = position + velocity * 1 / 1e3;
            }
            let isOvershooting = config.clamp && config.tension !== 0 ? from < to ? position > to : position < to : false;
            let isVelocity = Math.abs(velocity) <= config.precision;
            let isDisplacement = config.tension !== 0 ? Math.abs(to - position) <= config.precision : true;
            endOfAnimation = isOvershooting || isVelocity && isDisplacement;
            animation.lastVelocity = velocity;
            animation.lastTime = time;
          }
          if (isAnimated && !config.toValues[valIdx].done)
            endOfAnimation = false;
          if (endOfAnimation) {
            if (animation.value !== to)
              position = to;
            animation.done = true;
          } else
            isActive = true;
          animation.setValue(position);
          animation.lastPosition = position;
        }
        if (controller.props.onFrame)
          controller.values[config.name] = config.interpolation.getValue();
      }
      if (controller.props.onFrame)
        controller.props.onFrame(controller.values);
      if (!isActive) {
        controllers.delete(controller);
        controller.stop(true);
      }
    }
    if (controllers.size) {
      if (manualFrameloop)
        manualFrameloop();
      else
        requestFrame(update);
    } else {
      active = false;
    }
    return active;
  };
  var start = (controller) => {
    if (!controllers.has(controller))
      controllers.add(controller);
    if (!active) {
      active = true;
      if (manualFrameloop)
        requestFrame(manualFrameloop);
      else
        requestFrame(update);
    }
  };
  var stop = (controller) => {
    if (controllers.has(controller))
      controllers.delete(controller);
  };
  function createInterpolator(range, output, extrapolate) {
    if (typeof range === "function") {
      return range;
    }
    if (Array.isArray(range)) {
      return createInterpolator({
        range,
        output,
        extrapolate
      });
    }
    if (interpolation && typeof range.output[0] === "string") {
      return interpolation(range);
    }
    const config = range;
    const outputRange = config.output;
    const inputRange = config.range || [0, 1];
    const extrapolateLeft = config.extrapolateLeft || config.extrapolate || "extend";
    const extrapolateRight = config.extrapolateRight || config.extrapolate || "extend";
    const easing = config.easing || ((t3) => t3);
    return (input) => {
      const range2 = findRange(input, inputRange);
      return interpolate(input, inputRange[range2], inputRange[range2 + 1], outputRange[range2], outputRange[range2 + 1], easing, extrapolateLeft, extrapolateRight, config.map);
    };
  }
  function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
    let result = map ? map(input) : input;
    if (result < inputMin) {
      if (extrapolateLeft === "identity")
        return result;
      else if (extrapolateLeft === "clamp")
        result = inputMin;
    }
    if (result > inputMax) {
      if (extrapolateRight === "identity")
        return result;
      else if (extrapolateRight === "clamp")
        result = inputMax;
    }
    if (outputMin === outputMax)
      return outputMin;
    if (inputMin === inputMax)
      return input <= inputMin ? outputMin : outputMax;
    if (inputMin === -Infinity)
      result = -result;
    else if (inputMax === Infinity)
      result = result - inputMin;
    else
      result = (result - inputMin) / (inputMax - inputMin);
    result = easing(result);
    if (outputMin === -Infinity)
      result = -result;
    else if (outputMax === Infinity)
      result = result + outputMin;
    else
      result = result * (outputMax - outputMin) + outputMin;
    return result;
  }
  function findRange(input, inputRange) {
    for (var i3 = 1; i3 < inputRange.length - 1; ++i3)
      if (inputRange[i3] >= input)
        break;
    return i3 - 1;
  }
  var AnimatedInterpolation = class extends AnimatedArray {
    constructor(parents, range, output, extrapolate) {
      super();
      this.calc = void 0;
      this.payload = parents instanceof AnimatedArray && !(parents instanceof AnimatedInterpolation) ? parents.getPayload() : Array.isArray(parents) ? parents : [parents];
      this.calc = createInterpolator(range, output, extrapolate);
    }
    getValue() {
      return this.calc(...this.payload.map((value) => value.getValue()));
    }
    updateConfig(range, output, extrapolate) {
      this.calc = createInterpolator(range, output, extrapolate);
    }
    interpolate(range, output, extrapolate) {
      return new AnimatedInterpolation(this, range, output, extrapolate);
    }
  };
  function addAnimatedStyles(node, styles) {
    if ("update" in node) {
      styles.add(node);
    } else {
      node.getChildren().forEach((child) => addAnimatedStyles(child, styles));
    }
  }
  var AnimatedValue = class extends Animated {
    constructor(_value) {
      var _this;
      super();
      _this = this;
      this.animatedStyles = new Set();
      this.value = void 0;
      this.startPosition = void 0;
      this.lastPosition = void 0;
      this.lastVelocity = void 0;
      this.startTime = void 0;
      this.lastTime = void 0;
      this.done = false;
      this.setValue = function(value, flush) {
        if (flush === void 0) {
          flush = true;
        }
        _this.value = value;
        if (flush)
          _this.flush();
      };
      this.value = _value;
      this.startPosition = _value;
      this.lastPosition = _value;
    }
    flush() {
      if (this.animatedStyles.size === 0) {
        addAnimatedStyles(this, this.animatedStyles);
      }
      this.animatedStyles.forEach((animatedStyle) => animatedStyle.update());
    }
    clearStyles() {
      this.animatedStyles.clear();
    }
    getValue() {
      return this.value;
    }
    interpolate(range, output, extrapolate) {
      return new AnimatedInterpolation(this, range, output, extrapolate);
    }
  };
  var AnimatedValueArray = class extends AnimatedArray {
    constructor(values) {
      super();
      this.payload = values.map((n2) => new AnimatedValue(n2));
    }
    setValue(value, flush) {
      if (flush === void 0) {
        flush = true;
      }
      if (Array.isArray(value)) {
        if (value.length === this.payload.length) {
          value.forEach((v3, i3) => this.payload[i3].setValue(v3, flush));
        }
      } else {
        this.payload.forEach((p3) => p3.setValue(value, flush));
      }
    }
    getValue() {
      return this.payload.map((v3) => v3.getValue());
    }
    interpolate(range, output) {
      return new AnimatedInterpolation(this, range, output);
    }
  };
  var G2 = 0;
  var Controller = class {
    constructor() {
      this.id = void 0;
      this.idle = true;
      this.hasChanged = false;
      this.guid = 0;
      this.local = 0;
      this.props = {};
      this.merged = {};
      this.animations = {};
      this.interpolations = {};
      this.values = {};
      this.configs = [];
      this.listeners = [];
      this.queue = [];
      this.localQueue = void 0;
      this.getValues = () => this.interpolations;
      this.id = G2++;
    }
    update(args) {
      if (!args)
        return this;
      const _ref = interpolateTo(args), _ref$delay = _ref.delay, delay = _ref$delay === void 0 ? 0 : _ref$delay, to = _ref.to, props = _objectWithoutPropertiesLoose(_ref, ["delay", "to"]);
      if (is.arr(to) || is.fun(to)) {
        this.queue.push(_extends({}, props, {
          delay,
          to
        }));
      } else if (to) {
        let ops = {};
        Object.entries(to).forEach((_ref2) => {
          let k4 = _ref2[0], v3 = _ref2[1];
          const entry = _extends({
            to: {
              [k4]: v3
            },
            delay: callProp(delay, k4)
          }, props);
          const previous = ops[entry.delay] && ops[entry.delay].to;
          ops[entry.delay] = _extends({}, ops[entry.delay], entry, {
            to: _extends({}, previous, entry.to)
          });
        });
        this.queue = Object.values(ops);
      }
      this.queue = this.queue.sort((a3, b3) => a3.delay - b3.delay);
      this.diff(props);
      return this;
    }
    start(onEnd) {
      if (this.queue.length) {
        this.idle = false;
        if (this.localQueue) {
          this.localQueue.forEach((_ref3) => {
            let _ref3$from = _ref3.from, from = _ref3$from === void 0 ? {} : _ref3$from, _ref3$to = _ref3.to, to = _ref3$to === void 0 ? {} : _ref3$to;
            if (is.obj(from))
              this.merged = _extends({}, from, this.merged);
            if (is.obj(to))
              this.merged = _extends({}, this.merged, to);
          });
        }
        const local = this.local = ++this.guid;
        const queue = this.localQueue = this.queue;
        this.queue = [];
        queue.forEach((_ref4, index) => {
          let delay = _ref4.delay, props = _objectWithoutPropertiesLoose(_ref4, ["delay"]);
          const cb = (finished) => {
            if (index === queue.length - 1 && local === this.guid && finished) {
              this.idle = true;
              if (this.props.onRest)
                this.props.onRest(this.merged);
            }
            if (onEnd)
              onEnd();
          };
          let async = is.arr(props.to) || is.fun(props.to);
          if (delay) {
            setTimeout(() => {
              if (local === this.guid) {
                if (async)
                  this.runAsync(props, cb);
                else
                  this.diff(props).start(cb);
              }
            }, delay);
          } else if (async)
            this.runAsync(props, cb);
          else
            this.diff(props).start(cb);
        });
      } else {
        if (is.fun(onEnd))
          this.listeners.push(onEnd);
        if (this.props.onStart)
          this.props.onStart();
        start(this);
      }
      return this;
    }
    stop(finished) {
      this.listeners.forEach((onEnd) => onEnd(finished));
      this.listeners = [];
      return this;
    }
    pause(finished) {
      this.stop(true);
      if (finished)
        stop(this);
      return this;
    }
    runAsync(_ref5, onEnd) {
      var _this = this;
      let delay = _ref5.delay, props = _objectWithoutPropertiesLoose(_ref5, ["delay"]);
      const local = this.local;
      let queue = Promise.resolve(void 0);
      if (is.arr(props.to)) {
        for (let i3 = 0; i3 < props.to.length; i3++) {
          const index = i3;
          const fresh = _extends({}, props, interpolateTo(props.to[index]));
          if (is.arr(fresh.config))
            fresh.config = fresh.config[index];
          queue = queue.then(() => {
            if (local === this.guid)
              return new Promise((r3) => this.diff(fresh).start(r3));
          });
        }
      } else if (is.fun(props.to)) {
        let index = 0;
        let last;
        queue = queue.then(() => props.to((p3) => {
          const fresh = _extends({}, props, interpolateTo(p3));
          if (is.arr(fresh.config))
            fresh.config = fresh.config[index];
          index++;
          if (local === this.guid)
            return last = new Promise((r3) => this.diff(fresh).start(r3));
          return;
        }, function(finished) {
          if (finished === void 0) {
            finished = true;
          }
          return _this.stop(finished);
        }).then(() => last));
      }
      queue.then(onEnd);
    }
    diff(props) {
      this.props = _extends({}, this.props, props);
      let _this$props = this.props, _this$props$from = _this$props.from, from = _this$props$from === void 0 ? {} : _this$props$from, _this$props$to = _this$props.to, to = _this$props$to === void 0 ? {} : _this$props$to, _this$props$config = _this$props.config, config = _this$props$config === void 0 ? {} : _this$props$config, reverse = _this$props.reverse, attach = _this$props.attach, reset = _this$props.reset, immediate = _this$props.immediate;
      if (reverse) {
        var _ref6 = [to, from];
        from = _ref6[0];
        to = _ref6[1];
      }
      this.merged = _extends({}, from, this.merged, to);
      this.hasChanged = false;
      let target = attach && attach(this);
      this.animations = Object.entries(this.merged).reduce((acc, _ref7) => {
        let name = _ref7[0], value = _ref7[1];
        let entry = acc[name] || {};
        const isNumber = is.num(value);
        const isString = is.str(value) && !value.startsWith("#") && !/\d/.test(value) && !colorNames[value];
        const isArray = is.arr(value);
        const isInterpolation = !isNumber && !isArray && !isString;
        let fromValue = !is.und(from[name]) ? from[name] : value;
        let toValue = isNumber || isArray ? value : isString ? value : 1;
        let toConfig = callProp(config, name);
        if (target)
          toValue = target.animations[name].parent;
        let parent = entry.parent, interpolation$$1 = entry.interpolation, toValues = toArray(target ? toValue.getPayload() : toValue), animatedValues;
        let newValue = value;
        if (isInterpolation)
          newValue = interpolation({
            range: [0, 1],
            output: [value, value]
          })(1);
        let currentValue = interpolation$$1 && interpolation$$1.getValue();
        const isFirst = is.und(parent);
        const isActive = !isFirst && entry.animatedValues.some((v3) => !v3.done);
        const currentValueDiffersFromGoal = !is.equ(newValue, currentValue);
        const hasNewGoal = !is.equ(newValue, entry.previous);
        const hasNewConfig = !is.equ(toConfig, entry.config);
        if (reset || hasNewGoal && currentValueDiffersFromGoal || hasNewConfig) {
          if (isNumber || isString)
            parent = interpolation$$1 = entry.parent || new AnimatedValue(fromValue);
          else if (isArray)
            parent = interpolation$$1 = entry.parent || new AnimatedValueArray(fromValue);
          else if (isInterpolation) {
            let prev = entry.interpolation && entry.interpolation.calc(entry.parent.value);
            prev = prev !== void 0 && !reset ? prev : fromValue;
            if (entry.parent) {
              parent = entry.parent;
              parent.setValue(0, false);
            } else
              parent = new AnimatedValue(0);
            const range = {
              output: [prev, value]
            };
            if (entry.interpolation) {
              interpolation$$1 = entry.interpolation;
              entry.interpolation.updateConfig(range);
            } else
              interpolation$$1 = parent.interpolate(range);
          }
          toValues = toArray(target ? toValue.getPayload() : toValue);
          animatedValues = toArray(parent.getPayload());
          if (reset && !isInterpolation)
            parent.setValue(fromValue, false);
          this.hasChanged = true;
          animatedValues.forEach((value2) => {
            value2.startPosition = value2.value;
            value2.lastPosition = value2.value;
            value2.lastVelocity = isActive ? value2.lastVelocity : void 0;
            value2.lastTime = isActive ? value2.lastTime : void 0;
            value2.startTime = now();
            value2.done = false;
            value2.animatedStyles.clear();
          });
          if (callProp(immediate, name)) {
            parent.setValue(isInterpolation ? toValue : value, false);
          }
          return _extends({}, acc, {
            [name]: _extends({}, entry, {
              name,
              parent,
              interpolation: interpolation$$1,
              animatedValues,
              toValues,
              previous: newValue,
              config: toConfig,
              fromValues: toArray(parent.getValue()),
              immediate: callProp(immediate, name),
              initialVelocity: withDefault(toConfig.velocity, 0),
              clamp: withDefault(toConfig.clamp, false),
              precision: withDefault(toConfig.precision, 0.01),
              tension: withDefault(toConfig.tension, 170),
              friction: withDefault(toConfig.friction, 26),
              mass: withDefault(toConfig.mass, 1),
              duration: toConfig.duration,
              easing: withDefault(toConfig.easing, (t3) => t3),
              decay: toConfig.decay
            })
          });
        } else {
          if (!currentValueDiffersFromGoal) {
            if (isInterpolation) {
              parent.setValue(1, false);
              interpolation$$1.updateConfig({
                output: [newValue, newValue]
              });
            }
            parent.done = true;
            this.hasChanged = true;
            return _extends({}, acc, {
              [name]: _extends({}, acc[name], {
                previous: newValue
              })
            });
          }
          return acc;
        }
      }, this.animations);
      if (this.hasChanged) {
        this.configs = Object.values(this.animations);
        this.values = {};
        this.interpolations = {};
        for (let key in this.animations) {
          this.interpolations[key] = this.animations[key].interpolation;
          this.values[key] = this.animations[key].interpolation.getValue();
        }
      }
      return this;
    }
    destroy() {
      this.stop();
      this.props = {};
      this.merged = {};
      this.animations = {};
      this.interpolations = {};
      this.values = {};
      this.configs = [];
      this.local = 0;
    }
  };
  var useSprings = (length, props) => {
    const mounted = s2(false);
    const ctrl = s2();
    const isFn = is.fun(props);
    const _useMemo = d2(() => {
      if (ctrl.current) {
        ctrl.current.map((c3) => c3.destroy());
        ctrl.current = void 0;
      }
      let ref2;
      return [new Array(length).fill().map((_3, i3) => {
        const ctrl2 = new Controller();
        const newProps = isFn ? callProp(props, i3, ctrl2) : props[i3];
        if (i3 === 0)
          ref2 = newProps.ref;
        ctrl2.update(newProps);
        if (!ref2)
          ctrl2.start();
        return ctrl2;
      }), ref2];
    }, [length]), controllers2 = _useMemo[0], ref = _useMemo[1];
    ctrl.current = controllers2;
    const api = _2(ref, () => ({
      start: () => Promise.all(ctrl.current.map((c3) => new Promise((r3) => c3.start(r3)))),
      stop: (finished) => ctrl.current.forEach((c3) => c3.stop(finished)),
      get controllers() {
        return ctrl.current;
      }
    }));
    const updateCtrl = d2(() => (updateProps) => ctrl.current.map((c3, i3) => {
      c3.update(isFn ? callProp(updateProps, i3, c3) : updateProps[i3]);
      if (!ref)
        c3.start();
    }), [length]);
    y2(() => {
      if (mounted.current) {
        if (!isFn)
          updateCtrl(props);
      } else if (!ref)
        ctrl.current.forEach((c3) => c3.start());
    });
    y2(() => (mounted.current = true, () => ctrl.current.forEach((c3) => c3.destroy())), []);
    const propValues = ctrl.current.map((c3) => c3.getValues());
    return isFn ? [propValues, updateCtrl, (finished) => ctrl.current.forEach((c3) => c3.pause(finished))] : propValues;
  };
  var useSpring = (props) => {
    const isFn = is.fun(props);
    const _useSprings = useSprings(1, isFn ? props : [props]), result = _useSprings[0], set = _useSprings[1], pause = _useSprings[2];
    return isFn ? [result[0], set, pause] : result;
  };
  var AnimatedStyle = class extends AnimatedObject {
    constructor(style) {
      if (style === void 0) {
        style = {};
      }
      super();
      if (style.transform && !(style.transform instanceof Animated)) {
        style = applyAnimatedValues.transform(style);
      }
      this.payload = style;
    }
  };
  var colors = {
    transparent: 0,
    aliceblue: 4042850303,
    antiquewhite: 4209760255,
    aqua: 16777215,
    aquamarine: 2147472639,
    azure: 4043309055,
    beige: 4126530815,
    bisque: 4293182719,
    black: 255,
    blanchedalmond: 4293643775,
    blue: 65535,
    blueviolet: 2318131967,
    brown: 2771004159,
    burlywood: 3736635391,
    burntsienna: 3934150143,
    cadetblue: 1604231423,
    chartreuse: 2147418367,
    chocolate: 3530104575,
    coral: 4286533887,
    cornflowerblue: 1687547391,
    cornsilk: 4294499583,
    crimson: 3692313855,
    cyan: 16777215,
    darkblue: 35839,
    darkcyan: 9145343,
    darkgoldenrod: 3095792639,
    darkgray: 2846468607,
    darkgreen: 6553855,
    darkgrey: 2846468607,
    darkkhaki: 3182914559,
    darkmagenta: 2332068863,
    darkolivegreen: 1433087999,
    darkorange: 4287365375,
    darkorchid: 2570243327,
    darkred: 2332033279,
    darksalmon: 3918953215,
    darkseagreen: 2411499519,
    darkslateblue: 1211993087,
    darkslategray: 793726975,
    darkslategrey: 793726975,
    darkturquoise: 13554175,
    darkviolet: 2483082239,
    deeppink: 4279538687,
    deepskyblue: 12582911,
    dimgray: 1768516095,
    dimgrey: 1768516095,
    dodgerblue: 512819199,
    firebrick: 2988581631,
    floralwhite: 4294635775,
    forestgreen: 579543807,
    fuchsia: 4278255615,
    gainsboro: 3705462015,
    ghostwhite: 4177068031,
    gold: 4292280575,
    goldenrod: 3668254975,
    gray: 2155905279,
    green: 8388863,
    greenyellow: 2919182335,
    grey: 2155905279,
    honeydew: 4043305215,
    hotpink: 4285117695,
    indianred: 3445382399,
    indigo: 1258324735,
    ivory: 4294963455,
    khaki: 4041641215,
    lavender: 3873897215,
    lavenderblush: 4293981695,
    lawngreen: 2096890111,
    lemonchiffon: 4294626815,
    lightblue: 2916673279,
    lightcoral: 4034953471,
    lightcyan: 3774873599,
    lightgoldenrodyellow: 4210742015,
    lightgray: 3553874943,
    lightgreen: 2431553791,
    lightgrey: 3553874943,
    lightpink: 4290167295,
    lightsalmon: 4288707327,
    lightseagreen: 548580095,
    lightskyblue: 2278488831,
    lightslategray: 2005441023,
    lightslategrey: 2005441023,
    lightsteelblue: 2965692159,
    lightyellow: 4294959359,
    lime: 16711935,
    limegreen: 852308735,
    linen: 4210091775,
    magenta: 4278255615,
    maroon: 2147483903,
    mediumaquamarine: 1724754687,
    mediumblue: 52735,
    mediumorchid: 3126187007,
    mediumpurple: 2473647103,
    mediumseagreen: 1018393087,
    mediumslateblue: 2070474495,
    mediumspringgreen: 16423679,
    mediumturquoise: 1221709055,
    mediumvioletred: 3340076543,
    midnightblue: 421097727,
    mintcream: 4127193855,
    mistyrose: 4293190143,
    moccasin: 4293178879,
    navajowhite: 4292783615,
    navy: 33023,
    oldlace: 4260751103,
    olive: 2155872511,
    olivedrab: 1804477439,
    orange: 4289003775,
    orangered: 4282712319,
    orchid: 3664828159,
    palegoldenrod: 4008225535,
    palegreen: 2566625535,
    paleturquoise: 2951671551,
    palevioletred: 3681588223,
    papayawhip: 4293907967,
    peachpuff: 4292524543,
    peru: 3448061951,
    pink: 4290825215,
    plum: 3718307327,
    powderblue: 2967529215,
    purple: 2147516671,
    rebeccapurple: 1714657791,
    red: 4278190335,
    rosybrown: 3163525119,
    royalblue: 1097458175,
    saddlebrown: 2336560127,
    salmon: 4202722047,
    sandybrown: 4104413439,
    seagreen: 780883967,
    seashell: 4294307583,
    sienna: 2689740287,
    silver: 3233857791,
    skyblue: 2278484991,
    slateblue: 1784335871,
    slategray: 1887473919,
    slategrey: 1887473919,
    snow: 4294638335,
    springgreen: 16744447,
    steelblue: 1182971135,
    tan: 3535047935,
    teal: 8421631,
    thistle: 3636451583,
    tomato: 4284696575,
    turquoise: 1088475391,
    violet: 4001558271,
    wheat: 4125012991,
    white: 4294967295,
    whitesmoke: 4126537215,
    yellow: 4294902015,
    yellowgreen: 2597139199
  };
  var NUMBER = "[-+]?\\d*\\.?\\d+";
  var PERCENTAGE = NUMBER + "%";
  function call() {
    for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
      parts[_key] = arguments[_key];
    }
    return "\\(\\s*(" + parts.join(")\\s*,\\s*(") + ")\\s*\\)";
  }
  var rgb = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
  var rgba = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
  var hsl = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
  var hsla = new RegExp("hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
  var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
  var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
  var hex6 = /^#([0-9a-fA-F]{6})$/;
  var hex8 = /^#([0-9a-fA-F]{8})$/;
  function normalizeColor(color) {
    let match;
    if (typeof color === "number") {
      return color >>> 0 === color && color >= 0 && color <= 4294967295 ? color : null;
    }
    if (match = hex6.exec(color))
      return parseInt(match[1] + "ff", 16) >>> 0;
    if (colors.hasOwnProperty(color))
      return colors[color];
    if (match = rgb.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 255) >>> 0;
    }
    if (match = rgba.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
    }
    if (match = hex3.exec(color)) {
      return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + "ff", 16) >>> 0;
    }
    if (match = hex8.exec(color))
      return parseInt(match[1], 16) >>> 0;
    if (match = hex4.exec(color)) {
      return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
    }
    if (match = hsl.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> 0;
    }
    if (match = hsla.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
    }
    return null;
  }
  function hue2rgb(p3, q3, t3) {
    if (t3 < 0)
      t3 += 1;
    if (t3 > 1)
      t3 -= 1;
    if (t3 < 1 / 6)
      return p3 + (q3 - p3) * 6 * t3;
    if (t3 < 1 / 2)
      return q3;
    if (t3 < 2 / 3)
      return p3 + (q3 - p3) * (2 / 3 - t3) * 6;
    return p3;
  }
  function hslToRgb(h3, s3, l3) {
    const q3 = l3 < 0.5 ? l3 * (1 + s3) : l3 + s3 - l3 * s3;
    const p3 = 2 * l3 - q3;
    const r3 = hue2rgb(p3, q3, h3 + 1 / 3);
    const g4 = hue2rgb(p3, q3, h3);
    const b3 = hue2rgb(p3, q3, h3 - 1 / 3);
    return Math.round(r3 * 255) << 24 | Math.round(g4 * 255) << 16 | Math.round(b3 * 255) << 8;
  }
  function parse255(str) {
    const int = parseInt(str, 10);
    if (int < 0)
      return 0;
    if (int > 255)
      return 255;
    return int;
  }
  function parse360(str) {
    const int = parseFloat(str);
    return (int % 360 + 360) % 360 / 360;
  }
  function parse1(str) {
    const num = parseFloat(str);
    if (num < 0)
      return 0;
    if (num > 1)
      return 255;
    return Math.round(num * 255);
  }
  function parsePercentage(str) {
    const int = parseFloat(str);
    if (int < 0)
      return 0;
    if (int > 100)
      return 1;
    return int / 100;
  }
  function colorToRgba(input) {
    let int32Color = normalizeColor(input);
    if (int32Color === null)
      return input;
    int32Color = int32Color || 0;
    let r3 = (int32Color & 4278190080) >>> 24;
    let g4 = (int32Color & 16711680) >>> 16;
    let b3 = (int32Color & 65280) >>> 8;
    let a3 = (int32Color & 255) / 255;
    return `rgba(${r3}, ${g4}, ${b3}, ${a3})`;
  }
  var stringShapeRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
  var colorNamesRegex = new RegExp(`(${Object.keys(colors).join("|")})`, "g");
  var createStringInterpolator = (config) => {
    const outputRange = config.output.map((rangeValue) => rangeValue.replace(colorRegex, colorToRgba)).map((rangeValue) => rangeValue.replace(colorNamesRegex, colorToRgba));
    const outputRanges = outputRange[0].match(stringShapeRegex).map(() => []);
    outputRange.forEach((value) => {
      value.match(stringShapeRegex).forEach((number, i3) => outputRanges[i3].push(+number));
    });
    const interpolations = outputRange[0].match(stringShapeRegex).map((_value, i3) => createInterpolator(_extends({}, config, {
      output: outputRanges[i3]
    })));
    return (input) => {
      let i3 = 0;
      return outputRange[0].replace(stringShapeRegex, () => interpolations[i3++](input)).replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, (_3, p1, p22, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p22)}, ${Math.round(p3)}, ${p4})`);
    };
  };
  var isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  };
  var prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1);
  var prefixes = ["Webkit", "Ms", "Moz", "O"];
  isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
    prefixes.forEach((prefix) => acc[prefixKey(prefix, prop)] = acc[prop]);
    return acc;
  }, isUnitlessNumber);
  function dangerousStyleValue(name, value, isCustomProperty) {
    if (value == null || typeof value === "boolean" || value === "")
      return "";
    if (!isCustomProperty && typeof value === "number" && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]))
      return value + "px";
    return ("" + value).trim();
  }
  var attributeCache = {};
  injectCreateAnimatedStyle((style) => new AnimatedStyle(style));
  injectDefaultElement("div");
  injectStringInterpolator(createStringInterpolator);
  injectColorNames(colors);
  injectApplyAnimatedValues((instance, props) => {
    if (instance.nodeType && instance.setAttribute !== void 0) {
      const style = props.style, children = props.children, scrollTop = props.scrollTop, scrollLeft = props.scrollLeft, attributes = _objectWithoutPropertiesLoose(props, ["style", "children", "scrollTop", "scrollLeft"]);
      const filter = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
      if (scrollTop !== void 0)
        instance.scrollTop = scrollTop;
      if (scrollLeft !== void 0)
        instance.scrollLeft = scrollLeft;
      if (children !== void 0)
        instance.textContent = children;
      for (let styleName in style) {
        if (!style.hasOwnProperty(styleName))
          continue;
        var isCustomProperty = styleName.indexOf("--") === 0;
        var styleValue = dangerousStyleValue(styleName, style[styleName], isCustomProperty);
        if (styleName === "float")
          styleName = "cssFloat";
        if (isCustomProperty)
          instance.style.setProperty(styleName, styleValue);
        else
          instance.style[styleName] = styleValue;
      }
      for (let name in attributes) {
        const dashCase = filter ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, (n2) => "-" + n2.toLowerCase()));
        if (typeof instance.getAttribute(dashCase) !== "undefined")
          instance.setAttribute(dashCase, attributes[name]);
      }
      return;
    } else
      return false;
  }, (style) => style);
  var domElements = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
    "circle",
    "clipPath",
    "defs",
    "ellipse",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "mask",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "text",
    "tspan"
  ];
  var apply = merge(createAnimatedComponent, false);
  var extendedAnimated = apply(domElements);

  // src/client/view/CardView.jsx
  var import_CardData = __toModule(require_CardData());
  var CardView_default = (props) => {
    const symbolImages = [
      "suitSymbol0.png",
      "suitSymbol1.png",
      "suitSymbol2.png",
      "suitSymbol3.png"
    ];
    let staticStyle = {
      overflow: "hidden",
      width: "87px"
    };
    let style = {
      opacity: 1,
      transform: "translate(0px,0px)",
      filter: "brightness(100%) blur(0px)",
      height: "122px"
    };
    if (props.value === void 0) {
      style.opacity = 0;
      style.transform = "translate(0px,-50px)";
    } else if (props.folded) {
      style.transform = "translate(0px,75px)";
      style.height = "0px";
    } else if (props.darken) {
      style.filter = "brightness(66%) blur(2px)";
    } else if (props.highlight) {
      style.transform = "translate(0px,-10px)";
    }
    style = useSpring(style);
    function CardContents() {
      if (props.value === void 0)
        return null;
      if (props.value < 0)
        return /* @__PURE__ */ v("img", {
          class: "card-image",
          src: props.assetUrl + "/cardBack.png"
        });
      let cardData = new import_CardData.default(props.value);
      let cardTextStyle = {
        color: cardData.getColor()
      };
      return /* @__PURE__ */ v(p, null, /* @__PURE__ */ v("img", {
        class: "card-image",
        src: props.assetUrl + "/cardFrame.png"
      }), /* @__PURE__ */ v("img", {
        class: "card-symbol-image",
        src: props.assetUrl + symbolImages[cardData.getSuitIndex()]
      }), /* @__PURE__ */ v("div", {
        class: "card-symbol-text",
        style: cardTextStyle
      }, cardData.getCardValueString()));
    }
    return /* @__PURE__ */ v(extendedAnimated.div, {
      class: props.class + " card",
      style: {...style, ...staticStyle, ...props.style}
    }, /* @__PURE__ */ v(CardContents, null));
  };

  // src/client/view/TonopahView.jsx
  var import_ArrayUtil = __toModule(require_ArrayUtil());
  function TonopahView(props) {
    function onSeatClick(index) {
      props.state.send({
        action: "seatJoin",
        seatIndex: index
      });
    }
    function onButtonClick(index, value) {
      props.state.send({
        action: props.state.buttons[index].action,
        value
      });
    }
    function onDialogButtonClick(index, value) {
      props.state.send({
        action: props.state.dialogButtons[index].action,
        value
      });
    }
    let communityCards = props.state.communityCards;
    if (!communityCards)
      communityCards = [];
    return /* @__PURE__ */ v("div", {
      class: "tonopah-table"
    }, /* @__PURE__ */ v("img", {
      src: props.assetUrl + "/table.png",
      class: "tonopah-table-image"
    }), /* @__PURE__ */ v("div", {
      class: "table-card-container"
    }, import_ArrayUtil.default.range(5).map((index) => {
      let darken = false;
      let highlight = false;
      if (props.state.highlightCards) {
        if (props.state.highlightCards.communityCards.indexOf(index) >= 0)
          highlight = true;
        else
          darken = true;
      }
      let style = {
        left: `${index * 91}px`
      };
      return /* @__PURE__ */ v(CardView_default, {
        value: communityCards[index],
        style,
        highlight,
        darken,
        assetUrl: props.assetUrl
      });
    })));
  }

  // src/utils/ContentScaler.jsx
  var ContentScaler_default = ({children, ...props}) => {
    const [elWidth, setElWidth] = l2(0);
    const [elHeight, setElHeight] = l2(0);
    let ref = s2();
    y2(() => {
      setElWidth(ref.current.clientWidth);
      setElHeight(ref.current.clientHeight);
      function onResize() {
        setElWidth(ref.current.clientWidth);
        setElHeight(ref.current.clientHeight);
      }
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
      };
    });
    let scale;
    if (elWidth / props.width < elHeight / props.height)
      scale = elWidth / props.width;
    else
      scale = elHeight / props.height;
    let scaledWidth = props.width * scale;
    let scaledHeight = props.height * scale;
    let posX = (elWidth - scaledWidth) / 2;
    let posY = (elHeight - scaledHeight) / 2;
    let transform = `translate(${posX}px,${posY}px) scale(${scale})`;
    let innerStyle = {
      width: props.width + "px",
      height: props.height + "px",
      transform
    };
    return /* @__PURE__ */ v("div", {
      ref,
      class: "content-scaler-outer"
    }, /* @__PURE__ */ v("div", {
      style: innerStyle,
      class: "content-scaler-inner"
    }, children));
  };

  // src/client/app/mockstates.js
  var mockstates_default = {
    "3 cards + pot": {
      seats: [
        {
          user: "Kalle",
          chips: 100,
          bet: 123,
          actionCount: 0
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      communityCards: [1, 2, 3],
      pots: [123, 456, 789]
    },
    "3 cards + action 1": {
      seats: [
        {
          user: "Kalle",
          chips: 100,
          bet: 123,
          action: "raise",
          actionCount: 1
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      communityCards: [1, 2, 3],
      pots: [123, 456, 789]
    },
    "3 cards + action 2": {
      seats: [
        {
          user: "Kalle",
          chips: 100,
          bet: 123,
          action: "call",
          actionCount: 2
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      communityCards: [1, 2, 3],
      pots: [123, 456, 789]
    },
    "pot contrib 0": {
      seats: [{}, {}, {}, {}, {}, {}, {}, {
        user: "Kalle",
        chips: 100,
        bet: 17,
        potContrib: 0
      }, {potContrib: 0}, {potContrib: 0}],
      pots: [0]
    },
    "pot contrib 13": {
      seats: [{}, {}, {}, {}, {}, {}, {}, {
        user: "Kalle",
        chips: 100,
        potContrib: 13,
        bet: 4
      }, {potContrib: 0}, {potContrib: 0}],
      pots: [13]
    },
    "pot contrib 17": {
      seats: [{}, {}, {}, {}, {}, {}, {}, {
        user: "Kalle",
        chips: 100,
        potContrib: 17,
        bet: 0
      }, {potContrib: 0}, {potContrib: 0}],
      pots: [17]
    },
    "win 17": {
      seats: [{}, {}, {}, {}, {}, {}, {}, {
        user: "Kalle",
        chips: 100,
        potContrib: 0,
        bet: 0,
        win: 17
      }, {potContrib: 0}, {potContrib: 0}],
      pots: [0]
    },
    "5 cards": {
      seats: [
        {
          user: "Kalle",
          chips: 100,
          bet: 123
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      communityCards: [1, 2, 3, 4, 5]
    },
    "no cards": {
      seats: [
        {
          user: "Kalle",
          chips: 100,
          bet: 123
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      communityCards: [],
      buttons: [{
        action: "fold"
      }, {
        action: "call"
      }, {
        action: "raise",
        value: 123
      }]
    },
    "no cards 2 buttons": {
      seats: [
        {
          user: "Kalle",
          chips: 100,
          bet: 123
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      communityCards: [],
      buttons: [{
        action: "fold"
      }, {
        action: "call"
      }]
    },
    players_and_cards: {
      seats: [{
        user: "Kalle",
        chips: 100,
        bet: 123
      }, {
        user: "Olle",
        chips: 200,
        cards: [23, 34],
        bet: 5
      }, {
        user: "Pelle",
        chips: 300,
        cards: [-1, -1],
        potContrib: 55
      }, {
        user: "Lisa",
        chips: 400,
        cards: [2, 3]
      }, {}, {}, {}, {}, {}, {}],
      communityCards: [0, 1, 2, 3, 4],
      dealerIndex: 3,
      buttons: [{
        action: "fold"
      }, {
        action: "call"
      }, {
        action: "raise",
        value: 123
      }],
      sliderMax: 500,
      pots: [7, 13, 17],
      highlightCards: null,
      timeLeft: 15e3,
      totalTime: 3e4,
      speakerIndex: 2
    },
    folded: {
      seats: [{
        user: "Kalle",
        chips: 100,
        bet: 123
      }, {
        user: "Olle",
        chips: 200,
        cards: [23, 34],
        bet: 5
      }, {
        user: "Pelle",
        chips: 300,
        cards: [-1, -1],
        potContrib: 55
      }, {
        user: "Lisa",
        chips: 400,
        cards: [2, 3],
        state: "gameOver"
      }, {}, {}, {}, {}, {}, {}],
      communityCards: [0, 1, 2, 3, 4],
      dealerIndex: 3,
      buttons: [{
        action: "fold"
      }, {
        action: "call"
      }, {
        action: "raise",
        value: 123
      }],
      sliderMax: 500,
      pots: [7, 13, 17],
      highlightCards: null,
      timeLeft: 15e3,
      totalTime: 3e4,
      speakerIndex: 2
    },
    highlight_cards: {
      seats: [{
        user: "Kalle",
        chips: 100,
        bet: 123
      }, {
        user: "Olle",
        chips: 200,
        cards: [23, 34],
        bet: 5
      }, {
        user: "Pelle",
        chips: 300,
        cards: [-1, -1],
        potContrib: 55
      }, {
        user: "Lisa",
        chips: 400,
        cards: [2, 3]
      }, {}, {}, {}, {}, {}, {}],
      communityCards: [0, 1, 2, 3, 4],
      dealerIndex: 3,
      buttons: [{
        action: "fold"
      }, {
        action: "call"
      }, {
        action: "raise",
        value: 123
      }],
      sliderMax: 500,
      pots: [7, 13, 17],
      highlightCards: {
        communityCards: [0, 1],
        seatCards: [0],
        text: "three of a kind"
      },
      speakerIndex: 1
    },
    dialog: {
      seats: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      dialogText: "Maximum sit in is 1000. Minimum is 10.\nHow much do you want to bring to the table?",
      dialogValue: 100,
      dialogButtons: [{
        action: "cancel",
        label: "cancel"
      }, {
        action: "sitIn",
        label: "sit in"
      }]
    }
  };

  // src/utils/ReactUtil.jsx
  var Select = class {
    onChange = (e3) => {
      if (this.props.onChange)
        this.props.onChange(JSON.parse(e3.target.value));
      if (this.props.onIndexChange)
        this.props.onIndexChange(e3.target.selectedIndex);
    };
    render() {
      let props = this.props;
      if (!props.labelField)
        props.labelField = "label";
      if (!props.options)
        props.options = [];
      return /* @__PURE__ */ v("select", {
        class: props.class,
        style: props.style,
        onChange: this.onChange,
        key: props.key
      }, props.options.map((option, index) => {
        let selected = false;
        if (props.hasOwnProperty("selectedIndex") && index === props.selectedIndex)
          selected = true;
        if (props.hasOwnProperty("selected") && option.key === props.selected)
          selected = true;
        let key = option.key;
        if (props.hasOwnProperty("optionKeyPrefix"))
          key = props.keyPrefix + key;
        return /* @__PURE__ */ v("option", {
          key,
          value: JSON.stringify(option.key),
          selected,
          class: option.class
        }, option[props.labelField]);
      }));
    }
  };
  function If(cond, func) {
    if (cond)
      return func();
  }
  var ReactUtil_default = {
    If,
    Select
  };

  // src/client/app/TonopahClient.jsx
  function TonopahClient(props) {
    let [stateIndex, setStateIndex] = l2(0);
    let state, send, connected;
    let selectContent;
    if (props.mock) {
      let onSelectIndexChange = function(index) {
        setStateIndex(index);
      };
      let selectOptions = [];
      for (let mockState in mockstates_default)
        selectOptions.push({key: mockState});
      state = mockstates_default[selectOptions[stateIndex].key];
      connected = true;
      let selectStyle = {
        position: "absolute",
        top: "10px",
        left: "10px"
      };
      selectContent = /* @__PURE__ */ v(ReactUtil_default.Select, {
        onIndexChange: onSelectIndexChange,
        style: selectStyle,
        labelField: "key",
        options: selectOptions
      });
    }
    let loadingStyle = {
      width: "960px",
      height: "720px",
      background: "#080"
    };
    let content = /* @__PURE__ */ v("div", {
      style: loadingStyle
    }, "Loading...");
    if (connected)
      content = /* @__PURE__ */ v(TonopahView, {
        state,
        assetUrl: props.assetUrl
      });
    return /* @__PURE__ */ v(p, null, /* @__PURE__ */ v(ContentScaler_default, {
      width: 960,
      height: 720
    }, content), selectContent);
  }

  // src/client/tonopahclient.jsx
  for (let el of document.getElementsByClassName("tonopah-client")) {
    let client = /* @__PURE__ */ v(TonopahClient, {
      serverUrl: el.dataset.serverUrl,
      assetUrl: el.dataset.assetUrl,
      mock: el.dataset.mock
    });
    M(client, el);
  }
})();
