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
          var k3 = Math.floor(Math.random() * n2);
          n2--;
          var temp = arr[n2];
          arr[n2] = arr[k3];
          arr[k3] = temp;
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
    var y2, d3, w3, k3, g3, m3, x2, P2 = i3 && i3.__k || e, C2 = P2.length;
    for (s3 == f && (s3 = r3 != null ? r3[0] : C2 ? _(i3, 0) : null), u3.__k = [], y2 = 0; y2 < l3.length; y2++)
      if ((k3 = u3.__k[y2] = (k3 = l3[y2]) == null || typeof k3 == "boolean" ? null : typeof k3 == "string" || typeof k3 == "number" ? h(null, k3, null, null, k3) : Array.isArray(k3) ? h(p, {children: k3}, null, null, null) : k3.__b > 0 ? h(k3.type, k3.props, k3.key, null, k3.__v) : k3) != null) {
        if (k3.__ = u3, k3.__b = u3.__b + 1, (w3 = P2[y2]) === null || w3 && k3.key == w3.key && k3.type === w3.type)
          P2[y2] = void 0;
        else
          for (d3 = 0; d3 < C2; d3++) {
            if ((w3 = P2[d3]) && k3.key == w3.key && k3.type === w3.type) {
              P2[d3] = void 0;
              break;
            }
            w3 = null;
          }
        $(n2, k3, w3 = w3 || f, t3, o3, r3, c3, s3, v3), g3 = k3.__e, (d3 = k3.ref) && w3.ref != d3 && (x2 || (x2 = []), w3.ref && x2.push(w3.ref, null, k3), x2.push(d3, k3.__c || g3, k3)), g3 != null ? (m3 == null && (m3 = g3), typeof k3.type == "function" && k3.__k != null && k3.__k === w3.__k ? k3.__d = s3 = b(k3, s3, n2) : s3 = A(n2, k3, w3, P2, r3, g3, s3), v3 || u3.type !== "option" ? typeof u3.type == "function" && (u3.__d = s3) : n2.value = "") : s3 && w3.__e == s3 && s3.parentNode != n2 && (s3 = _(w3));
      }
    if (u3.__e = m3, r3 != null && typeof u3.type != "function")
      for (y2 = r3.length; y2--; )
        r3[y2] != null && a(r3[y2]);
    for (y2 = C2; y2--; )
      P2[y2] != null && (typeof u3.type == "function" && P2[y2].__e != null && P2[y2].__e == u3.__d && (u3.__d = _(i3, y2 + 1)), I(P2[y2], P2[y2]));
    if (x2)
      for (y2 = 0; y2 < x2.length; y2++)
        H(x2[y2], x2[++y2], x2[++y2]);
  }
  function b(n2, l3, u3) {
    var i3, t3;
    for (i3 = 0; i3 < n2.__k.length; i3++)
      (t3 = n2.__k[i3]) && (t3.__ = n2, l3 = typeof t3.type == "function" ? b(t3, l3, u3) : A(u3, t3, t3, n2.__k, null, t3.__e, l3));
    return l3;
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
    var a3, v3, h2, y2, _2, w3, k3, g3, b3, x2, A2, P2 = u3.type;
    if (u3.constructor !== void 0)
      return null;
    i3.__h != null && (c3 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, r3 = [e3]), (a3 = n.__b) && a3(u3);
    try {
      n:
        if (typeof P2 == "function") {
          if (g3 = u3.props, b3 = (a3 = P2.contextType) && t3[a3.__c], x2 = a3 ? b3 ? b3.props.value : a3.__ : t3, i3.__c ? k3 = (v3 = u3.__c = i3.__c).__ = v3.__E : ("prototype" in P2 && P2.prototype.render ? u3.__c = v3 = new P2(g3, x2) : (u3.__c = v3 = new d(g3, x2), v3.constructor = P2, v3.render = L), b3 && b3.sub(v3), v3.props = g3, v3.state || (v3.state = {}), v3.context = x2, v3.__n = t3, h2 = v3.__d = true, v3.__h = []), v3.__s == null && (v3.__s = v3.state), P2.getDerivedStateFromProps != null && (v3.__s == v3.state && (v3.__s = s({}, v3.__s)), s(v3.__s, P2.getDerivedStateFromProps(g3, v3.__s))), y2 = v3.props, _2 = v3.state, h2)
            P2.getDerivedStateFromProps == null && v3.componentWillMount != null && v3.componentWillMount(), v3.componentDidMount != null && v3.__h.push(v3.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && g3 !== y2 && v3.componentWillReceiveProps != null && v3.componentWillReceiveProps(g3, x2), !v3.__e && v3.shouldComponentUpdate != null && v3.shouldComponentUpdate(g3, v3.__s, x2) === false || u3.__v === i3.__v) {
              v3.props = g3, v3.state = v3.__s, u3.__v !== i3.__v && (v3.__d = false), v3.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, v3.__h.length && f3.push(v3);
              break n;
            }
            v3.componentWillUpdate != null && v3.componentWillUpdate(g3, v3.__s, x2), v3.componentDidUpdate != null && v3.__h.push(function() {
              v3.componentDidUpdate(y2, _2, w3);
            });
          }
          v3.context = x2, v3.props = g3, v3.state = v3.__s, (a3 = n.__r) && a3(u3), v3.__d = false, v3.__v = u3, v3.__P = l3, a3 = v3.render(v3.props, v3.state, v3.context), v3.state = v3.__s, v3.getChildContext != null && (t3 = s(s({}, t3), v3.getChildContext())), h2 || v3.getSnapshotBeforeUpdate == null || (w3 = v3.getSnapshotBeforeUpdate(y2, _2)), A2 = a3 != null && a3.type === p && a3.key == null ? a3.props.children : a3, m(l3, Array.isArray(A2) ? A2 : [A2], u3, i3, t3, o3, r3, f3, e3, c3), v3.base = u3.__e, u3.__h = null, v3.__h.length && f3.push(v3), k3 && (v3.__E = v3.__ = null), v3.__e = false;
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
    var s3, a3, v3, h2, y2, p3 = u3.props, d3 = l3.props;
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
      if (o3 != null && (o3 = e.slice.call(n2.childNodes)), v3 = (p3 = u3.props || f).dangerouslySetInnerHTML, h2 = d3.dangerouslySetInnerHTML, !c3) {
        if (o3 != null)
          for (p3 = {}, y2 = 0; y2 < n2.attributes.length; y2++)
            p3[n2.attributes[y2].name] = n2.attributes[y2].value;
        (h2 || v3) && (h2 && (v3 && h2.__html == v3.__html || h2.__html === n2.innerHTML) || (n2.innerHTML = h2 && h2.__html || ""));
      }
      P(n2, d3, p3, t3, c3), h2 ? l3.__k = [] : (s3 = l3.props.children, m(n2, Array.isArray(s3) ? s3 : [s3], l3, u3, i3, l3.type !== "foreignObject" && t3, o3, r3, f, c3)), c3 || ("value" in d3 && (s3 = d3.value) !== void 0 && (s3 !== n2.value || l3.type === "progress" && !s3) && z(n2, "value", s3, p3.value, false), "checked" in d3 && (s3 = d3.checked) !== void 0 && s3 !== n2.checked && z(n2, "checked", s3, p3.checked, false));
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
    return /* @__PURE__ */ v("div", {
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
  function y(r3, o3) {
    var i3 = m2(t2++, 3);
    !n.__s && k2(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u2.__H.__h.push(i3));
  }
  function s2(n2) {
    return o2 = 5, d2(function() {
      return {current: n2};
    }, []);
  }
  function d2(n2, u3) {
    var r3 = m2(t2++, 7);
    return k2(r3.__H, u3) && (r3.__ = n2(), r3.__H = u3, r3.__h = n2), r3.__;
  }
  function x() {
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
    })(x)), u2 = void 0;
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

  // src/utils/ContentScaler.jsx
  var ContentScaler_default = ({children, ...props}) => {
    const [elWidth, setElWidth] = l2(0);
    const [elHeight, setElHeight] = l2(0);
    let ref = s2();
    y(() => {
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

  // src/client/app/TonopahClient.jsx
  function TonopahClient(props) {
    let state, send, status;
    if (props.mock) {
      state = mockstates_default["3 cards + pot"];
      status = {connected: true};
    }
    let loadingStyle = {
      width: "960px",
      height: "720px",
      background: "#080"
    };
    let content = /* @__PURE__ */ v("div", {
      style: loadingStyle
    }, "Loading...");
    if (status.connected)
      content = /* @__PURE__ */ v(TonopahView, {
        state,
        assetUrl: props.assetUrl
      });
    return /* @__PURE__ */ v(ContentScaler_default, {
      width: 960,
      height: 720
    }, content);
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
