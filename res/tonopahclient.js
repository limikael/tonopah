(() => {
  var __defProp = Object.defineProperty;
  var __publicField = (obj, key, value) => {
    if (typeof key !== "symbol")
      key += "";
    if (key in obj)
      return __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value});
    return obj[key] = value;
  };

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
  function s(n2, l4) {
    for (var u4 in l4)
      n2[u4] = l4[u4];
    return n2;
  }
  function a(n2) {
    var l4 = n2.parentNode;
    l4 && l4.removeChild(n2);
  }
  function v(n2, l4, u4) {
    var i4, t3, o4, r3 = arguments, f4 = {};
    for (o4 in l4)
      o4 == "key" ? i4 = l4[o4] : o4 == "ref" ? t3 = l4[o4] : f4[o4] = l4[o4];
    if (arguments.length > 3)
      for (u4 = [u4], o4 = 3; o4 < arguments.length; o4++)
        u4.push(r3[o4]);
    if (u4 != null && (f4.children = u4), typeof n2 == "function" && n2.defaultProps != null)
      for (o4 in n2.defaultProps)
        f4[o4] === void 0 && (f4[o4] = n2.defaultProps[o4]);
    return h(n2, f4, i4, t3, null);
  }
  function h(l4, u4, i4, t3, o4) {
    var r3 = {type: l4, props: u4, key: i4, ref: t3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: o4 == null ? ++n.__v : o4};
    return n.vnode != null && n.vnode(r3), r3;
  }
  function y() {
    return {current: null};
  }
  function p(n2) {
    return n2.children;
  }
  function d(n2, l4) {
    this.props = n2, this.context = l4;
  }
  function _(n2, l4) {
    if (l4 == null)
      return n2.__ ? _(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u4; l4 < n2.__k.length; l4++)
      if ((u4 = n2.__k[l4]) != null && u4.__e != null)
        return u4.__e;
    return typeof n2.type == "function" ? _(n2) : null;
  }
  function w(n2) {
    var l4, u4;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l4 = 0; l4 < n2.__k.length; l4++)
        if ((u4 = n2.__k[l4]) != null && u4.__e != null) {
          n2.__e = n2.__c.base = u4.__e;
          break;
        }
      return w(n2);
    }
  }
  function k(l4) {
    (!l4.__d && (l4.__d = true) && u.push(l4) && !g.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(g);
  }
  function g() {
    for (var n2; g.__r = u.length; )
      n2 = u.sort(function(n3, l4) {
        return n3.__v.__b - l4.__v.__b;
      }), u = [], n2.some(function(n3) {
        var l4, u4, i4, t3, o4, r3;
        n3.__d && (o4 = (t3 = (l4 = n3).__v).__e, (r3 = l4.__P) && (u4 = [], (i4 = s({}, t3)).__v = t3.__v + 1, $(r3, t3, i4, l4.__n, r3.ownerSVGElement !== void 0, t3.__h != null ? [o4] : null, u4, o4 == null ? _(t3) : o4, t3.__h), j(u4, t3), t3.__e != o4 && w(t3)));
      });
  }
  function m(n2, l4, u4, i4, t3, o4, r3, c4, s4, v3) {
    var y4, d4, w4, k4, g4, m3, x4, P3 = i4 && i4.__k || e, C3 = P3.length;
    for (s4 == f && (s4 = r3 != null ? r3[0] : C3 ? _(i4, 0) : null), u4.__k = [], y4 = 0; y4 < l4.length; y4++)
      if ((k4 = u4.__k[y4] = (k4 = l4[y4]) == null || typeof k4 == "boolean" ? null : typeof k4 == "string" || typeof k4 == "number" ? h(null, k4, null, null, k4) : Array.isArray(k4) ? h(p, {children: k4}, null, null, null) : k4.__b > 0 ? h(k4.type, k4.props, k4.key, null, k4.__v) : k4) != null) {
        if (k4.__ = u4, k4.__b = u4.__b + 1, (w4 = P3[y4]) === null || w4 && k4.key == w4.key && k4.type === w4.type)
          P3[y4] = void 0;
        else
          for (d4 = 0; d4 < C3; d4++) {
            if ((w4 = P3[d4]) && k4.key == w4.key && k4.type === w4.type) {
              P3[d4] = void 0;
              break;
            }
            w4 = null;
          }
        $(n2, k4, w4 = w4 || f, t3, o4, r3, c4, s4, v3), g4 = k4.__e, (d4 = k4.ref) && w4.ref != d4 && (x4 || (x4 = []), w4.ref && x4.push(w4.ref, null, k4), x4.push(d4, k4.__c || g4, k4)), g4 != null ? (m3 == null && (m3 = g4), typeof k4.type == "function" && k4.__k != null && k4.__k === w4.__k ? k4.__d = s4 = b(k4, s4, n2) : s4 = A(n2, k4, w4, P3, r3, g4, s4), v3 || u4.type !== "option" ? typeof u4.type == "function" && (u4.__d = s4) : n2.value = "") : s4 && w4.__e == s4 && s4.parentNode != n2 && (s4 = _(w4));
      }
    if (u4.__e = m3, r3 != null && typeof u4.type != "function")
      for (y4 = r3.length; y4--; )
        r3[y4] != null && a(r3[y4]);
    for (y4 = C3; y4--; )
      P3[y4] != null && (typeof u4.type == "function" && P3[y4].__e != null && P3[y4].__e == u4.__d && (u4.__d = _(i4, y4 + 1)), I(P3[y4], P3[y4]));
    if (x4)
      for (y4 = 0; y4 < x4.length; y4++)
        H(x4[y4], x4[++y4], x4[++y4]);
  }
  function b(n2, l4, u4) {
    var i4, t3;
    for (i4 = 0; i4 < n2.__k.length; i4++)
      (t3 = n2.__k[i4]) && (t3.__ = n2, l4 = typeof t3.type == "function" ? b(t3, l4, u4) : A(u4, t3, t3, n2.__k, null, t3.__e, l4));
    return l4;
  }
  function x(n2, l4) {
    return l4 = l4 || [], n2 == null || typeof n2 == "boolean" || (Array.isArray(n2) ? n2.some(function(n3) {
      x(n3, l4);
    }) : l4.push(n2)), l4;
  }
  function A(n2, l4, u4, i4, t3, o4, r3) {
    var f4, e3, c4;
    if (l4.__d !== void 0)
      f4 = l4.__d, l4.__d = void 0;
    else if (t3 == u4 || o4 != r3 || o4.parentNode == null)
      n:
        if (r3 == null || r3.parentNode !== n2)
          n2.appendChild(o4), f4 = null;
        else {
          for (e3 = r3, c4 = 0; (e3 = e3.nextSibling) && c4 < i4.length; c4 += 2)
            if (e3 == o4)
              break n;
          n2.insertBefore(o4, r3), f4 = r3;
        }
    return f4 !== void 0 ? f4 : o4.nextSibling;
  }
  function P(n2, l4, u4, i4, t3) {
    var o4;
    for (o4 in u4)
      o4 === "children" || o4 === "key" || o4 in l4 || z(n2, o4, null, u4[o4], i4);
    for (o4 in l4)
      t3 && typeof l4[o4] != "function" || o4 === "children" || o4 === "key" || o4 === "value" || o4 === "checked" || u4[o4] === l4[o4] || z(n2, o4, l4[o4], u4[o4], i4);
  }
  function C(n2, l4, u4) {
    l4[0] === "-" ? n2.setProperty(l4, u4) : n2[l4] = u4 == null ? "" : typeof u4 != "number" || c.test(l4) ? u4 : u4 + "px";
  }
  function z(n2, l4, u4, i4, t3) {
    var o4, r3, f4;
    if (t3 && l4 == "className" && (l4 = "class"), l4 === "style")
      if (typeof u4 == "string")
        n2.style.cssText = u4;
      else {
        if (typeof i4 == "string" && (n2.style.cssText = i4 = ""), i4)
          for (l4 in i4)
            u4 && l4 in u4 || C(n2.style, l4, "");
        if (u4)
          for (l4 in u4)
            i4 && u4[l4] === i4[l4] || C(n2.style, l4, u4[l4]);
      }
    else
      l4[0] === "o" && l4[1] === "n" ? (o4 = l4 !== (l4 = l4.replace(/Capture$/, "")), (r3 = l4.toLowerCase()) in n2 && (l4 = r3), l4 = l4.slice(2), n2.l || (n2.l = {}), n2.l[l4 + o4] = u4, f4 = o4 ? T : N, u4 ? i4 || n2.addEventListener(l4, f4, o4) : n2.removeEventListener(l4, f4, o4)) : l4 !== "list" && l4 !== "tagName" && l4 !== "form" && l4 !== "type" && l4 !== "size" && l4 !== "download" && l4 !== "href" && l4 !== "contentEditable" && !t3 && l4 in n2 ? n2[l4] = u4 == null ? "" : u4 : typeof u4 != "function" && l4 !== "dangerouslySetInnerHTML" && (l4 !== (l4 = l4.replace(/xlink:?/, "")) ? u4 == null || u4 === false ? n2.removeAttributeNS("http://www.w3.org/1999/xlink", l4.toLowerCase()) : n2.setAttributeNS("http://www.w3.org/1999/xlink", l4.toLowerCase(), u4) : u4 == null || u4 === false && !/^ar/.test(l4) ? n2.removeAttribute(l4) : n2.setAttribute(l4, u4));
  }
  function N(l4) {
    this.l[l4.type + false](n.event ? n.event(l4) : l4);
  }
  function T(l4) {
    this.l[l4.type + true](n.event ? n.event(l4) : l4);
  }
  function $(l4, u4, i4, t3, o4, r3, f4, e3, c4) {
    var a4, v3, h4, y4, _3, w4, k4, g4, b3, x4, A4, P3 = u4.type;
    if (u4.constructor !== void 0)
      return null;
    i4.__h != null && (c4 = i4.__h, e3 = u4.__e = i4.__e, u4.__h = null, r3 = [e3]), (a4 = n.__b) && a4(u4);
    try {
      n:
        if (typeof P3 == "function") {
          if (g4 = u4.props, b3 = (a4 = P3.contextType) && t3[a4.__c], x4 = a4 ? b3 ? b3.props.value : a4.__ : t3, i4.__c ? k4 = (v3 = u4.__c = i4.__c).__ = v3.__E : ("prototype" in P3 && P3.prototype.render ? u4.__c = v3 = new P3(g4, x4) : (u4.__c = v3 = new d(g4, x4), v3.constructor = P3, v3.render = L), b3 && b3.sub(v3), v3.props = g4, v3.state || (v3.state = {}), v3.context = x4, v3.__n = t3, h4 = v3.__d = true, v3.__h = []), v3.__s == null && (v3.__s = v3.state), P3.getDerivedStateFromProps != null && (v3.__s == v3.state && (v3.__s = s({}, v3.__s)), s(v3.__s, P3.getDerivedStateFromProps(g4, v3.__s))), y4 = v3.props, _3 = v3.state, h4)
            P3.getDerivedStateFromProps == null && v3.componentWillMount != null && v3.componentWillMount(), v3.componentDidMount != null && v3.__h.push(v3.componentDidMount);
          else {
            if (P3.getDerivedStateFromProps == null && g4 !== y4 && v3.componentWillReceiveProps != null && v3.componentWillReceiveProps(g4, x4), !v3.__e && v3.shouldComponentUpdate != null && v3.shouldComponentUpdate(g4, v3.__s, x4) === false || u4.__v === i4.__v) {
              v3.props = g4, v3.state = v3.__s, u4.__v !== i4.__v && (v3.__d = false), v3.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, v3.__h.length && f4.push(v3);
              break n;
            }
            v3.componentWillUpdate != null && v3.componentWillUpdate(g4, v3.__s, x4), v3.componentDidUpdate != null && v3.__h.push(function() {
              v3.componentDidUpdate(y4, _3, w4);
            });
          }
          v3.context = x4, v3.props = g4, v3.state = v3.__s, (a4 = n.__r) && a4(u4), v3.__d = false, v3.__v = u4, v3.__P = l4, a4 = v3.render(v3.props, v3.state, v3.context), v3.state = v3.__s, v3.getChildContext != null && (t3 = s(s({}, t3), v3.getChildContext())), h4 || v3.getSnapshotBeforeUpdate == null || (w4 = v3.getSnapshotBeforeUpdate(y4, _3)), A4 = a4 != null && a4.type === p && a4.key == null ? a4.props.children : a4, m(l4, Array.isArray(A4) ? A4 : [A4], u4, i4, t3, o4, r3, f4, e3, c4), v3.base = u4.__e, u4.__h = null, v3.__h.length && f4.push(v3), k4 && (v3.__E = v3.__ = null), v3.__e = false;
        } else
          r3 == null && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = E(i4.__e, u4, i4, t3, o4, r3, f4, c4);
      (a4 = n.diffed) && a4(u4);
    } catch (l5) {
      u4.__v = null, (c4 || r3 != null) && (u4.__e = e3, u4.__h = !!c4, r3[r3.indexOf(e3)] = null), n.__e(l5, u4, i4);
    }
  }
  function j(l4, u4) {
    n.__c && n.__c(u4, l4), l4.some(function(u5) {
      try {
        l4 = u5.__h, u5.__h = [], l4.some(function(n2) {
          n2.call(u5);
        });
      } catch (l5) {
        n.__e(l5, u5.__v);
      }
    });
  }
  function E(n2, l4, u4, i4, t3, o4, r3, c4) {
    var s4, a4, v3, h4, y4, p4 = u4.props, d4 = l4.props;
    if (t3 = l4.type === "svg" || t3, o4 != null) {
      for (s4 = 0; s4 < o4.length; s4++)
        if ((a4 = o4[s4]) != null && ((l4.type === null ? a4.nodeType === 3 : a4.localName === l4.type) || n2 == a4)) {
          n2 = a4, o4[s4] = null;
          break;
        }
    }
    if (n2 == null) {
      if (l4.type === null)
        return document.createTextNode(d4);
      n2 = t3 ? document.createElementNS("http://www.w3.org/2000/svg", l4.type) : document.createElement(l4.type, d4.is && {is: d4.is}), o4 = null, c4 = false;
    }
    if (l4.type === null)
      p4 === d4 || c4 && n2.data === d4 || (n2.data = d4);
    else {
      if (o4 != null && (o4 = e.slice.call(n2.childNodes)), v3 = (p4 = u4.props || f).dangerouslySetInnerHTML, h4 = d4.dangerouslySetInnerHTML, !c4) {
        if (o4 != null)
          for (p4 = {}, y4 = 0; y4 < n2.attributes.length; y4++)
            p4[n2.attributes[y4].name] = n2.attributes[y4].value;
        (h4 || v3) && (h4 && (v3 && h4.__html == v3.__html || h4.__html === n2.innerHTML) || (n2.innerHTML = h4 && h4.__html || ""));
      }
      P(n2, d4, p4, t3, c4), h4 ? l4.__k = [] : (s4 = l4.props.children, m(n2, Array.isArray(s4) ? s4 : [s4], l4, u4, i4, l4.type !== "foreignObject" && t3, o4, r3, f, c4)), c4 || ("value" in d4 && (s4 = d4.value) !== void 0 && (s4 !== n2.value || l4.type === "progress" && !s4) && z(n2, "value", s4, p4.value, false), "checked" in d4 && (s4 = d4.checked) !== void 0 && s4 !== n2.checked && z(n2, "checked", s4, p4.checked, false));
    }
    return n2;
  }
  function H(l4, u4, i4) {
    try {
      typeof l4 == "function" ? l4(u4) : l4.current = u4;
    } catch (l5) {
      n.__e(l5, i4);
    }
  }
  function I(l4, u4, i4) {
    var t3, o4, r3;
    if (n.unmount && n.unmount(l4), (t3 = l4.ref) && (t3.current && t3.current !== l4.__e || H(t3, null, u4)), i4 || typeof l4.type == "function" || (i4 = (o4 = l4.__e) != null), l4.__e = l4.__d = void 0, (t3 = l4.__c) != null) {
      if (t3.componentWillUnmount)
        try {
          t3.componentWillUnmount();
        } catch (l5) {
          n.__e(l5, u4);
        }
      t3.base = t3.__P = null;
    }
    if (t3 = l4.__k)
      for (r3 = 0; r3 < t3.length; r3++)
        t3[r3] && I(t3[r3], u4, i4);
    o4 != null && a(o4);
  }
  function L(n2, l4, u4) {
    return this.constructor(n2, u4);
  }
  function M(l4, u4, i4) {
    var t3, r3, c4;
    n.__ && n.__(l4, u4), r3 = (t3 = i4 === o) ? null : i4 && i4.__k || u4.__k, l4 = v(p, null, [l4]), c4 = [], $(u4, (t3 ? u4 : i4 || u4).__k = l4, r3 || f, f, u4.ownerSVGElement !== void 0, i4 && !t3 ? [i4] : r3 ? null : u4.childNodes.length ? e.slice.call(u4.childNodes) : null, c4, i4 || f, t3), j(c4, l4);
  }
  function O(n2, l4) {
    M(n2, l4, o);
  }
  function S(n2, l4, u4) {
    var i4, t3, o4, r3 = arguments, f4 = s({}, n2.props);
    for (o4 in l4)
      o4 == "key" ? i4 = l4[o4] : o4 == "ref" ? t3 = l4[o4] : f4[o4] = l4[o4];
    if (arguments.length > 3)
      for (u4 = [u4], o4 = 3; o4 < arguments.length; o4++)
        u4.push(r3[o4]);
    return u4 != null && (f4.children = u4), h(n2.type, f4, i4 || n2.key, t3 || n2.ref, null);
  }
  function q(n2, l4) {
    var u4 = {__c: l4 = "__cC" + r++, __: n2, Consumer: function(n3, l5) {
      return n3.children(l5);
    }, Provider: function(n3) {
      var u5, i4;
      return this.getChildContext || (u5 = [], (i4 = {})[l4] = this, this.getChildContext = function() {
        return i4;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && u5.some(k);
      }, this.sub = function(n4) {
        u5.push(n4);
        var l5 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u5.splice(u5.indexOf(n4), 1), l5 && l5.call(n4);
        };
      }), n3.children;
    }};
    return u4.Provider.__ = u4.Consumer.contextType = u4;
  }
  n = {__e: function(n2, l4) {
    for (var u4, i4, t3, o4 = l4.__h; l4 = l4.__; )
      if ((u4 = l4.__c) && !u4.__)
        try {
          if ((i4 = u4.constructor) && i4.getDerivedStateFromError != null && (u4.setState(i4.getDerivedStateFromError(n2)), t3 = u4.__d), u4.componentDidCatch != null && (u4.componentDidCatch(n2), t3 = u4.__d), t3)
            return l4.__h = o4, u4.__E = u4;
        } catch (l5) {
          n2 = l5;
        }
    throw n2;
  }, __v: 0}, l = function(n2) {
    return n2 != null && n2.constructor === void 0;
  }, d.prototype.setState = function(n2, l4) {
    var u4;
    u4 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), typeof n2 == "function" && (n2 = n2(s({}, u4), this.props)), n2 && s(u4, n2), n2 != null && this.__v && (l4 && this.__h.push(l4), k(this));
  }, d.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), k(this));
  }, d.prototype.render = p, u = [], i = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, o = f, r = 0;

  // node_modules/preact/devtools/dist/devtools.module.js
  typeof window != "undefined" && window.__PREACT_DEVTOOLS__ && window.__PREACT_DEVTOOLS__.attachPreact("10.5.10", n, {Fragment: p, Component: d});

  // node_modules/preact/debug/dist/debug.module.js
  var o2 = {};
  function a2(n2) {
    return n2.type === p ? "Fragment" : typeof n2.type == "function" ? n2.type.displayName || n2.type.name : typeof n2.type == "string" ? n2.type : "#text";
  }
  var i2 = [];
  var s2 = [];
  function c2() {
    return i2.length > 0 ? i2[i2.length - 1] : null;
  }
  var l2 = false;
  function u2(n2) {
    return typeof n2.type == "function" && n2.type != p;
  }
  function f2(n2) {
    for (var t3 = [n2], e3 = n2; e3.__o != null; )
      t3.push(e3.__o), e3 = e3.__o;
    return t3.reduce(function(n3, t4) {
      n3 += "  in " + a2(t4);
      var e4 = t4.__source;
      return e4 ? n3 += " (at " + e4.fileName + ":" + e4.lineNumber + ")" : l2 || (l2 = true, console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")), n3 + "\n";
    }, "");
  }
  var p2 = typeof WeakMap == "function";
  var d2 = d.prototype.setState;
  d.prototype.setState = function(n2, t3) {
    return this.__v == null ? this.state == null && console.warn('Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.\n\n' + f2(c2())) : this.__P == null && console.warn(`Can't call "this.setState" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

` + f2(this.__v)), d2.call(this, n2, t3);
  };
  var h2 = d.prototype.forceUpdate;
  function y2(n2) {
    var t3 = n2.props, e3 = a2(n2), o4 = "";
    for (var r3 in t3)
      if (t3.hasOwnProperty(r3) && r3 !== "children") {
        var i4 = t3[r3];
        typeof i4 == "function" && (i4 = "function " + (i4.displayName || i4.name) + "() {}"), i4 = Object(i4) !== i4 || i4.toString ? i4 + "" : Object.prototype.toString.call(i4), o4 += " " + r3 + "=" + JSON.stringify(i4);
      }
    var s4 = t3.children;
    return "<" + e3 + o4 + (s4 && s4.length ? ">..</" + e3 + ">" : " />");
  }
  d.prototype.forceUpdate = function(n2) {
    return this.__v == null ? console.warn('Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.\n\n' + f2(c2())) : this.__P == null && console.warn(`Can't call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

` + f2(this.__v)), h2.call(this, n2);
  }, function() {
    !function() {
      var t4 = n.__b, e4 = n.diffed, o4 = n.__, r4 = n.vnode, a4 = n.__r;
      n.diffed = function(n2) {
        u2(n2) && s2.pop(), i2.pop(), e4 && e4(n2);
      }, n.__b = function(n2) {
        u2(n2) && i2.push(n2), t4 && t4(n2);
      }, n.__ = function(n2, t5) {
        s2 = [], o4 && o4(n2, t5);
      }, n.vnode = function(n2) {
        n2.__o = s2.length > 0 ? s2[s2.length - 1] : null, r4 && r4(n2);
      }, n.__r = function(n2) {
        u2(n2) && s2.push(n2), a4 && a4(n2);
      };
    }();
    var t3 = false, e3 = n.__b, r3 = n.diffed, c4 = n.vnode, l4 = n.__e, d4 = n.__, h4 = n.__h, m3 = p2 ? {useEffect: new WeakMap(), useLayoutEffect: new WeakMap(), lazyPropTypes: new WeakMap()} : null, v3 = [];
    n.__e = function(n2, t4, e4) {
      if (t4 && t4.__c && typeof n2.then == "function") {
        var o4 = n2;
        n2 = new Error("Missing Suspense. The throwing component was: " + a2(t4));
        for (var r4 = t4; r4; r4 = r4.__)
          if (r4.__c && r4.__c.__c) {
            n2 = o4;
            break;
          }
        if (n2 instanceof Error)
          throw n2;
      }
      try {
        l4(n2, t4, e4), typeof n2.then != "function" && setTimeout(function() {
          throw n2;
        });
      } catch (n3) {
        throw n3;
      }
    }, n.__ = function(n2, t4) {
      if (!t4)
        throw new Error("Undefined parent passed to render(), this is the second argument.\nCheck if the element is available in the DOM/has the correct id.");
      var e4;
      switch (t4.nodeType) {
        case 1:
        case 11:
        case 9:
          e4 = true;
          break;
        default:
          e4 = false;
      }
      if (!e4) {
        var o4 = a2(n2);
        throw new Error("Expected a valid HTML node as a second argument to render.	Received " + t4 + " instead: render(<" + o4 + " />, " + t4 + ");");
      }
      d4 && d4(n2, t4);
    }, n.__b = function(n2) {
      var r4 = n2.type, i4 = function n3(t4) {
        return t4 ? typeof t4.type == "function" ? n3(t4.__) : t4 : {};
      }(n2.__);
      if (t3 = true, r4 === void 0)
        throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports" + y2(n2) + "\n\n" + f2(n2));
      if (r4 != null && typeof r4 == "object") {
        if (r4.__k !== void 0 && r4.__e !== void 0)
          throw new Error("Invalid type passed to createElement(): " + r4 + "\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My" + a2(n2) + " = " + y2(r4) + ";\n  let vnode = <My" + a2(n2) + " />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n" + f2(n2));
        throw new Error("Invalid type passed to createElement(): " + (Array.isArray(r4) ? "array" : r4));
      }
      if (r4 !== "thead" && r4 !== "tfoot" && r4 !== "tbody" || i4.type === "table" ? r4 === "tr" && i4.type !== "thead" && i4.type !== "tfoot" && i4.type !== "tbody" && i4.type !== "table" ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent." + y2(n2) + "\n\n" + f2(n2)) : r4 === "td" && i4.type !== "tr" ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + y2(n2) + "\n\n" + f2(n2)) : r4 === "th" && i4.type !== "tr" && console.error("Improper nesting of table. Your <th> should have a <tr>." + y2(n2) + "\n\n" + f2(n2)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + y2(n2) + "\n\n" + f2(n2)), n2.ref !== void 0 && typeof n2.ref != "function" && typeof n2.ref != "object" && !("$$typeof" in n2))
        throw new Error(`Component's "ref" property should be a function, or an object created by createRef(), but got [` + typeof n2.ref + "] instead\n" + y2(n2) + "\n\n" + f2(n2));
      if (typeof n2.type == "string") {
        for (var s4 in n2.props)
          if (s4[0] === "o" && s4[1] === "n" && typeof n2.props[s4] != "function" && n2.props[s4] != null)
            throw new Error(`Component's "` + s4 + '" property should be a function, but got [' + typeof n2.props[s4] + "] instead\n" + y2(n2) + "\n\n" + f2(n2));
      }
      if (typeof n2.type == "function" && n2.type.propTypes) {
        if (n2.type.displayName === "Lazy" && m3 && !m3.lazyPropTypes.has(n2.type)) {
          var c5 = "PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";
          try {
            var l5 = n2.type();
            m3.lazyPropTypes.set(n2.type, true), console.warn(c5 + "Component wrapped in lazy() is " + a2(l5));
          } catch (n3) {
            console.warn(c5 + "We will log the wrapped component's name once it is loaded.");
          }
        }
        var u4 = n2.props;
        n2.type.__f && delete (u4 = function(n3, t4) {
          for (var e4 in t4)
            n3[e4] = t4[e4];
          return n3;
        }({}, u4)).ref, function(n3, t4, e4, r5, a4) {
          Object.keys(n3).forEach(function(e5) {
            var i5;
            try {
              i5 = n3[e5](t4, e5, r5, "prop", null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (n4) {
              i5 = n4;
            }
            !i5 || i5.message in o2 || (o2[i5.message] = true, console.error("Failed prop type: " + i5.message + (a4 && "\n" + a4() || "")));
          });
        }(n2.type.propTypes, u4, 0, a2(n2), function() {
          return f2(n2);
        });
      }
      e3 && e3(n2);
    }, n.__h = function(n2, e4, o4) {
      if (!n2 || !t3)
        throw new Error("Hook can only be invoked from render methods.");
      h4 && h4(n2, e4, o4);
    };
    var b3 = function(n2, t4) {
      return {get: function() {
        var e4 = "get" + n2 + t4;
        v3 && v3.indexOf(e4) < 0 && (v3.push(e4), console.warn("getting vnode." + n2 + " is deprecated, " + t4));
      }, set: function() {
        var e4 = "set" + n2 + t4;
        v3 && v3.indexOf(e4) < 0 && (v3.push(e4), console.warn("setting vnode." + n2 + " is not allowed, " + t4));
      }};
    }, w4 = {nodeName: b3("nodeName", "use vnode.type"), attributes: b3("attributes", "use vnode.props"), children: b3("children", "use vnode.props.children")}, g4 = Object.create({}, w4);
    n.vnode = function(n2) {
      var t4 = n2.props;
      if (n2.type !== null && t4 != null && ("__source" in t4 || "__self" in t4)) {
        var e4 = n2.props = {};
        for (var o4 in t4) {
          var r4 = t4[o4];
          o4 === "__source" ? n2.__source = r4 : o4 === "__self" ? n2.__self = r4 : e4[o4] = r4;
        }
      }
      n2.__proto__ = g4, c4 && c4(n2);
    }, n.diffed = function(n2) {
      if (n2.__k && n2.__k.forEach(function(t4) {
        if (t4 && t4.type === void 0) {
          delete t4.__, delete t4.__b;
          var e5 = Object.keys(t4).join(",");
          throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + e5 + "}.\n\n" + f2(n2));
        }
      }), t3 = false, r3 && r3(n2), n2.__k != null)
        for (var e4 = [], o4 = 0; o4 < n2.__k.length; o4++) {
          var a4 = n2.__k[o4];
          if (a4 && a4.key != null) {
            var i4 = a4.key;
            if (e4.indexOf(i4) !== -1) {
              console.error('Following component has two or more children with the same key attribute: "' + i4 + '". This may cause glitches and misbehavior in rendering process. Component: \n\n' + y2(n2) + "\n\n" + f2(n2));
              break;
            }
            e4.push(i4);
          }
        }
    };
  }();

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var u3;
  var r2;
  var o3 = 0;
  var i3 = [];
  var c3 = n.__b;
  var f3 = n.__r;
  var e2 = n.diffed;
  var a3 = n.__c;
  var v2 = n.unmount;
  function m2(t3, r3) {
    n.__h && n.__h(u3, t3, o3 || r3), o3 = 0;
    var i4 = u3.__H || (u3.__H = {__: [], __h: []});
    return t3 >= i4.__.length && i4.__.push({}), i4.__[t3];
  }
  function l3(n2) {
    return o3 = 1, p3(w2, n2);
  }
  function p3(n2, r3, o4) {
    var i4 = m2(t2++, 2);
    return i4.t = n2, i4.__c || (i4.__ = [o4 ? o4(r3) : w2(void 0, r3), function(n3) {
      var t3 = i4.t(i4.__[0], n3);
      i4.__[0] !== t3 && (i4.__ = [t3, i4.__[1]], i4.__c.setState({}));
    }], i4.__c = u3), i4.__;
  }
  function y3(r3, o4) {
    var i4 = m2(t2++, 3);
    !n.__s && k2(i4.__H, o4) && (i4.__ = r3, i4.__H = o4, u3.__H.__h.push(i4));
  }
  function h3(r3, o4) {
    var i4 = m2(t2++, 4);
    !n.__s && k2(i4.__H, o4) && (i4.__ = r3, i4.__H = o4, u3.__h.push(i4));
  }
  function s3(n2) {
    return o3 = 5, d3(function() {
      return {current: n2};
    }, []);
  }
  function _2(n2, t3, u4) {
    o3 = 6, h3(function() {
      typeof n2 == "function" ? n2(t3()) : n2 && (n2.current = t3());
    }, u4 == null ? u4 : u4.concat(n2));
  }
  function d3(n2, u4) {
    var r3 = m2(t2++, 7);
    return k2(r3.__H, u4) && (r3.__ = n2(), r3.__H = u4, r3.__h = n2), r3.__;
  }
  function A2(n2, t3) {
    return o3 = 8, d3(function() {
      return n2;
    }, t3);
  }
  function F(n2) {
    var r3 = u3.context[n2.__c], o4 = m2(t2++, 9);
    return o4.__c = n2, r3 ? (o4.__ == null && (o4.__ = true, r3.sub(u3)), r3.props.value) : n2.__;
  }
  function T2(t3, u4) {
    n.useDebugValue && n.useDebugValue(u4 ? u4(t3) : t3);
  }
  function x2() {
    i3.forEach(function(t3) {
      if (t3.__P)
        try {
          t3.__H.__h.forEach(g2), t3.__H.__h.forEach(j2), t3.__H.__h = [];
        } catch (u4) {
          t3.__H.__h = [], n.__e(u4, t3.__v);
        }
    }), i3 = [];
  }
  n.__b = function(n2) {
    u3 = null, c3 && c3(n2);
  }, n.__r = function(n2) {
    f3 && f3(n2), t2 = 0;
    var r3 = (u3 = n2.__c).__H;
    r3 && (r3.__h.forEach(g2), r3.__h.forEach(j2), r3.__h = []);
  }, n.diffed = function(t3) {
    e2 && e2(t3);
    var o4 = t3.__c;
    o4 && o4.__H && o4.__H.__h.length && (i3.push(o4) !== 1 && r2 === n.requestAnimationFrame || ((r2 = n.requestAnimationFrame) || function(n2) {
      var t4, u4 = function() {
        clearTimeout(r3), b2 && cancelAnimationFrame(t4), setTimeout(n2);
      }, r3 = setTimeout(u4, 100);
      b2 && (t4 = requestAnimationFrame(u4));
    })(x2)), u3 = void 0;
  }, n.__c = function(t3, u4) {
    u4.some(function(t4) {
      try {
        t4.__h.forEach(g2), t4.__h = t4.__h.filter(function(n2) {
          return !n2.__ || j2(n2);
        });
      } catch (r3) {
        u4.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), u4 = [], n.__e(r3, t4.__v);
      }
    }), a3 && a3(t3, u4);
  }, n.unmount = function(t3) {
    v2 && v2(t3);
    var u4 = t3.__c;
    if (u4 && u4.__H)
      try {
        u4.__H.__.forEach(g2);
      } catch (t4) {
        n.__e(t4, u4.__v);
      }
  };
  var b2 = typeof requestAnimationFrame == "function";
  function g2(n2) {
    var t3 = u3;
    typeof n2.__c == "function" && n2.__c(), u3 = t3;
  }
  function j2(n2) {
    var t3 = u3;
    n2.__c = n2.__(), u3 = t3;
  }
  function k2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, u4) {
      return t4 !== n2[u4];
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
    function o4(o5) {
      if (t3 || (t3 = n2()).then(function(n3) {
        e3 = n3.default || n3;
      }, function(n3) {
        r3 = n3;
      }), r3)
        throw r3;
      if (!e3)
        throw t3;
      return v(e3, o5);
    }
    return o4.displayName = "Lazy", o4.__f = true, o4;
  }
  function D() {
    this.o = null, this.u = null;
  }
  n.__e = function(n2, t3, e3) {
    if (n2.then) {
      for (var r3, o4 = t3; o4 = o4.__; )
        if ((r3 = o4.__c) && r3.__c)
          return t3.__e == null && (t3.__e = e3.__e, t3.__k = e3.__k), r3.__c(n2, t3);
    }
    A3(n2, t3, e3);
  }, (O2.prototype = new d()).__c = function(n2, t3) {
    var e3 = t3.__c, r3 = this;
    r3.t == null && (r3.t = []), r3.t.push(e3);
    var o4 = L2(r3.__v), u4 = false, i4 = function() {
      u4 || (u4 = true, e3.componentWillUnmount = e3.__c, o4 ? o4(f4) : f4());
    };
    e3.__c = e3.componentWillUnmount, e3.componentWillUnmount = function() {
      i4(), e3.__c && e3.__c();
    };
    var f4 = function() {
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
    }, c4 = t3.__h === true;
    r3.__u++ || c4 || r3.setState({__e: r3.__b = r3.__v.__k[0]}), n2.then(i4, i4);
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
    var o4 = t3.__e && v(p, null, n2.fallback);
    return o4 && (o4.__h = null), [v(p, null, t3.__e ? null : n2.children), o4];
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
    return r3[0]++, function(o4) {
      var u4 = function() {
        t3.props.revealOrder ? (r3.push(o4), F2(t3, n2, r3)) : o4();
      };
      e3 ? e3(u4) : u4();
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
      for (var o4 in r3 = {}, e3) {
        var u4 = e3[o4];
        o4 === "defaultValue" && "value" in e3 && e3.value == null ? o4 = "value" : o4 === "download" && u4 === true ? u4 = "" : /ondoubleclick/i.test(o4) ? o4 = "ondblclick" : /^onchange(textarea|input)/i.test(o4 + t3) && !P2(e3.type) ? o4 = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(o4) ? o4 = o4.toLowerCase() : W.test(o4) ? o4 = o4.replace(/[A-Z0-9]/, "-$&").toLowerCase() : u4 === null && (u4 = void 0), r3[o4] = u4;
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
  var compat_module_default = {useState: l3, useReducer: p3, useEffect: y3, useLayoutEffect: h3, useRef: s3, useImperativeHandle: _2, useMemo: d3, useCallback: A2, useContext: F, useDebugValue: T2, version: "16.8.0", Children: k3, render: z2, hydrate: B, unmountComponentAtNode: an, createPortal: j3, createElement: v, createContext: q, createFactory: fn, cloneElement: ln, createRef: y, Fragment: p, isValidElement: cn, findDOMNode: sn, Component: d, PureComponent: E2, memo: g3, forwardRef: x3, unstable_batchedUpdates: hn, StrictMode: p, Suspense: O2, SuspenseList: D, lazy: U, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: K};

  // src/utils/react-shim.js
  var react_shim_default = compat_module_default;

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
  function useLastValueDiff(value) {
    if (!value)
      value = 0;
    let ref = s3({
      value: 0,
      diff: 0
    });
    let diff = ref.current.diff;
    if (value != ref.current.value) {
      diff = value - ref.current.value;
      ref.current.value = value;
      ref.current.diff = diff;
    }
    if (diff < 0)
      diff = 0;
    return diff;
  }
  function useIsValueChanged(value) {
    let ref = s3();
    let change = false;
    if (value != ref.current)
      change = true;
    ref.current = value;
    return change;
  }
  function usePerformanceNow() {
    const frame = s3();
    const [performanceNow, setPerformanceNow] = l3(performance.now());
    function animate() {
      setPerformanceNow(performance.now());
      frame.current = requestAnimationFrame(animate);
    }
    y3(() => {
      frame.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame.current);
    }, []);
    return performanceNow;
  }
  function useSetTimeout(fn2, delay) {
    y3(() => {
      let timeout;
      timeout = setTimeout(() => {
        timeout = null;
        fn2();
      }, delay);
      return () => {
        if (timeout)
          clearTimeout(timeout);
      };
    });
  }
  var ReactUtil_default = {
    If,
    Select
  };

  // src/client/assets/chip0.png
  var chip0_default = "data:image/png;base64,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";

  // src/client/assets/chip1.png
  var chip1_default = "data:image/png;base64,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";

  // src/client/assets/chip2.png
  var chip2_default = "data:image/png;base64,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";

  // src/client/assets/chip3.png
  var chip3_default = "data:image/png;base64,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";

  // src/client/assets/chip4.png
  var chip4_default = "data:image/png;base64,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";

  // src/utils/ArrayUtil.js
  var ArrayUtil = class {
    static maxIndex(a4) {
      if (!a4.length)
        return void 0;
      let maxIndex = 0;
      for (let i4 = 0; i4 < a4.length; i4++)
        if (a4[i4] > a4[maxIndex])
          maxIndex = i4;
      return maxIndex;
    }
    static range(to) {
      let a4 = [];
      for (let i4 = 0; i4 < to; i4++)
        a4.push(i4);
      return a4;
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
    static compareNumbers(a4, b3) {
      return a4 - b3;
    }
  };
  var ArrayUtil_default = ArrayUtil;

  // node_modules/@babel/runtime/helpers/esm/extends.js
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i4 = 1; i4 < arguments.length; i4++) {
        var source = arguments[i4];
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
    var key, i4;
    for (i4 = 0; i4 < sourceKeys.length; i4++) {
      key = sourceKeys[i4];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }

  // node_modules/react-spring/web.js
  var is = {
    arr: Array.isArray,
    obj: (a4) => Object.prototype.toString.call(a4) === "[object Object]",
    fun: (a4) => typeof a4 === "function",
    str: (a4) => typeof a4 === "string",
    num: (a4) => typeof a4 === "number",
    und: (a4) => a4 === void 0,
    nul: (a4) => a4 === null,
    set: (a4) => a4 instanceof Set,
    map: (a4) => a4 instanceof Map,
    equ(a4, b3) {
      if (typeof a4 !== typeof b3)
        return false;
      if (is.str(a4) || is.num(a4))
        return a4 === b3;
      if (is.obj(a4) && is.obj(b3) && Object.keys(a4).length + Object.keys(b3).length === 0)
        return true;
      let i4;
      for (i4 in a4)
        if (!(i4 in b3))
          return false;
      for (i4 in b3)
        if (a4[i4] !== b3[i4])
          return false;
      return is.und(i4) ? a4 === b3 : true;
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
    const _useState = l3(false), f4 = _useState[1];
    const forceUpdate = A2(() => f4((v3) => !v3), []);
    return forceUpdate;
  }
  function withDefault(value, defaultValue) {
    return is.und(value) || is.nul(value) ? defaultValue : value;
  }
  function toArray(a4) {
    return !is.und(a4) ? is.arr(a4) ? a4 : [a4] : [];
  }
  function callProp(obj) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return is.fun(obj) ? obj(...args) : obj;
  }
  function getForwardProps(props) {
    const to = props.to, from = props.from, config2 = props.config, onStart = props.onStart, onRest = props.onRest, onFrame = props.onFrame, children = props.children, reset = props.reset, reverse = props.reverse, force = props.force, immediate = props.immediate, delay = props.delay, attach = props.attach, destroyed = props.destroyed, interpolateTo2 = props.interpolateTo, ref = props.ref, lazy = props.lazy, forward = _objectWithoutPropertiesLoose(props, ["to", "from", "config", "onStart", "onRest", "onFrame", "children", "reset", "reverse", "force", "immediate", "delay", "attach", "destroyed", "interpolateTo", "ref", "lazy"]);
    return forward;
  }
  function interpolateTo(props) {
    const forward = getForwardProps(props);
    if (is.und(forward))
      return _extends({
        to: forward
      }, props);
    const rest = Object.keys(props).reduce((a4, k4) => !is.und(forward[k4]) ? a4 : _extends({}, a4, {
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
      this.attach = () => this.payload.forEach((p4) => p4 instanceof Animated && p4.addChild(this));
      this.detach = () => this.payload.forEach((p4) => p4 instanceof Animated && p4.removeChild(this));
    }
  };
  var AnimatedObject = class extends Animated {
    constructor() {
      super(...arguments);
      this.payload = {};
      this.attach = () => Object.values(this.payload).forEach((s4) => s4 instanceof Animated && s4.addChild(this));
      this.detach = () => Object.values(this.payload).forEach((s4) => s4 instanceof Animated && s4.removeChild(this));
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
      const mounted = s3(true);
      const propsAnimated = s3(null);
      const node = s3(null);
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
      y3(() => () => {
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
        let config2 = controller.configs[configIdx];
        let endOfAnimation, lastTime;
        for (let valIdx = 0; valIdx < config2.animatedValues.length; valIdx++) {
          let animation = config2.animatedValues[valIdx];
          if (animation.done)
            continue;
          let from = config2.fromValues[valIdx];
          let to = config2.toValues[valIdx];
          let position = animation.lastPosition;
          let isAnimated = to instanceof Animated;
          let velocity = Array.isArray(config2.initialVelocity) ? config2.initialVelocity[valIdx] : config2.initialVelocity;
          if (isAnimated)
            to = to.getValue();
          if (config2.immediate) {
            animation.setValue(to);
            animation.done = true;
            continue;
          }
          if (typeof from === "string" || typeof to === "string") {
            animation.setValue(to);
            animation.done = true;
            continue;
          }
          if (config2.duration !== void 0) {
            position = from + config2.easing((time - animation.startTime) / config2.duration) * (to - from);
            endOfAnimation = time >= animation.startTime + config2.duration;
          } else if (config2.decay) {
            position = from + velocity / (1 - 0.998) * (1 - Math.exp(-(1 - 0.998) * (time - animation.startTime)));
            endOfAnimation = Math.abs(animation.lastPosition - position) < 0.1;
            if (endOfAnimation)
              to = position;
          } else {
            lastTime = animation.lastTime !== void 0 ? animation.lastTime : time;
            velocity = animation.lastVelocity !== void 0 ? animation.lastVelocity : config2.initialVelocity;
            if (time > lastTime + 64)
              lastTime = time;
            let numSteps = Math.floor(time - lastTime);
            for (let i4 = 0; i4 < numSteps; ++i4) {
              let force = -config2.tension * (position - to);
              let damping = -config2.friction * velocity;
              let acceleration = (force + damping) / config2.mass;
              velocity = velocity + acceleration * 1 / 1e3;
              position = position + velocity * 1 / 1e3;
            }
            let isOvershooting = config2.clamp && config2.tension !== 0 ? from < to ? position > to : position < to : false;
            let isVelocity = Math.abs(velocity) <= config2.precision;
            let isDisplacement = config2.tension !== 0 ? Math.abs(to - position) <= config2.precision : true;
            endOfAnimation = isOvershooting || isVelocity && isDisplacement;
            animation.lastVelocity = velocity;
            animation.lastTime = time;
          }
          if (isAnimated && !config2.toValues[valIdx].done)
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
          controller.values[config2.name] = config2.interpolation.getValue();
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
    const config2 = range;
    const outputRange = config2.output;
    const inputRange = config2.range || [0, 1];
    const extrapolateLeft = config2.extrapolateLeft || config2.extrapolate || "extend";
    const extrapolateRight = config2.extrapolateRight || config2.extrapolate || "extend";
    const easing = config2.easing || ((t3) => t3);
    return (input) => {
      const range2 = findRange(input, inputRange);
      return interpolate(input, inputRange[range2], inputRange[range2 + 1], outputRange[range2], outputRange[range2 + 1], easing, extrapolateLeft, extrapolateRight, config2.map);
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
    for (var i4 = 1; i4 < inputRange.length - 1; ++i4)
      if (inputRange[i4] >= input)
        break;
    return i4 - 1;
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
  var config = {
    default: {
      tension: 170,
      friction: 26
    },
    gentle: {
      tension: 120,
      friction: 14
    },
    wobbly: {
      tension: 180,
      friction: 12
    },
    stiff: {
      tension: 210,
      friction: 20
    },
    slow: {
      tension: 280,
      friction: 60
    },
    molasses: {
      tension: 280,
      friction: 120
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
          value.forEach((v3, i4) => this.payload[i4].setValue(v3, flush));
        }
      } else {
        this.payload.forEach((p4) => p4.setValue(value, flush));
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
      this.queue = this.queue.sort((a4, b3) => a4.delay - b3.delay);
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
        for (let i4 = 0; i4 < props.to.length; i4++) {
          const index = i4;
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
        queue = queue.then(() => props.to((p4) => {
          const fresh = _extends({}, props, interpolateTo(p4));
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
      let _this$props = this.props, _this$props$from = _this$props.from, from = _this$props$from === void 0 ? {} : _this$props$from, _this$props$to = _this$props.to, to = _this$props$to === void 0 ? {} : _this$props$to, _this$props$config = _this$props.config, config2 = _this$props$config === void 0 ? {} : _this$props$config, reverse = _this$props.reverse, attach = _this$props.attach, reset = _this$props.reset, immediate = _this$props.immediate;
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
        let toConfig = callProp(config2, name);
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
    const mounted = s3(false);
    const ctrl = s3();
    const isFn = is.fun(props);
    const _useMemo = d3(() => {
      if (ctrl.current) {
        ctrl.current.map((c4) => c4.destroy());
        ctrl.current = void 0;
      }
      let ref2;
      return [new Array(length).fill().map((_3, i4) => {
        const ctrl2 = new Controller();
        const newProps = isFn ? callProp(props, i4, ctrl2) : props[i4];
        if (i4 === 0)
          ref2 = newProps.ref;
        ctrl2.update(newProps);
        if (!ref2)
          ctrl2.start();
        return ctrl2;
      }), ref2];
    }, [length]), controllers2 = _useMemo[0], ref = _useMemo[1];
    ctrl.current = controllers2;
    const api = _2(ref, () => ({
      start: () => Promise.all(ctrl.current.map((c4) => new Promise((r3) => c4.start(r3)))),
      stop: (finished) => ctrl.current.forEach((c4) => c4.stop(finished)),
      get controllers() {
        return ctrl.current;
      }
    }));
    const updateCtrl = d3(() => (updateProps) => ctrl.current.map((c4, i4) => {
      c4.update(isFn ? callProp(updateProps, i4, c4) : updateProps[i4]);
      if (!ref)
        c4.start();
    }), [length]);
    y3(() => {
      if (mounted.current) {
        if (!isFn)
          updateCtrl(props);
      } else if (!ref)
        ctrl.current.forEach((c4) => c4.start());
    });
    y3(() => (mounted.current = true, () => ctrl.current.forEach((c4) => c4.destroy())), []);
    const propValues = ctrl.current.map((c4) => c4.getValues());
    return isFn ? [propValues, updateCtrl, (finished) => ctrl.current.forEach((c4) => c4.pause(finished))] : propValues;
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
  function hue2rgb(p4, q3, t3) {
    if (t3 < 0)
      t3 += 1;
    if (t3 > 1)
      t3 -= 1;
    if (t3 < 1 / 6)
      return p4 + (q3 - p4) * 6 * t3;
    if (t3 < 1 / 2)
      return q3;
    if (t3 < 2 / 3)
      return p4 + (q3 - p4) * (2 / 3 - t3) * 6;
    return p4;
  }
  function hslToRgb(h4, s4, l4) {
    const q3 = l4 < 0.5 ? l4 * (1 + s4) : l4 + s4 - l4 * s4;
    const p4 = 2 * l4 - q3;
    const r3 = hue2rgb(p4, q3, h4 + 1 / 3);
    const g4 = hue2rgb(p4, q3, h4);
    const b3 = hue2rgb(p4, q3, h4 - 1 / 3);
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
    let a4 = (int32Color & 255) / 255;
    return `rgba(${r3}, ${g4}, ${b3}, ${a4})`;
  }
  var stringShapeRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
  var colorNamesRegex = new RegExp(`(${Object.keys(colors).join("|")})`, "g");
  var createStringInterpolator = (config2) => {
    const outputRange = config2.output.map((rangeValue) => rangeValue.replace(colorRegex, colorToRgba)).map((rangeValue) => rangeValue.replace(colorNamesRegex, colorToRgba));
    const outputRanges = outputRange[0].match(stringShapeRegex).map(() => []);
    outputRange.forEach((value) => {
      value.match(stringShapeRegex).forEach((number, i4) => outputRanges[i4].push(+number));
    });
    const interpolations = outputRange[0].match(stringShapeRegex).map((_value, i4) => createInterpolator(_extends({}, config2, {
      output: outputRanges[i4]
    })));
    return (input) => {
      let i4 = 0;
      return outputRange[0].replace(stringShapeRegex, () => interpolations[i4++](input)).replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, (_3, p1, p22, p32, p4) => `rgba(${Math.round(p1)}, ${Math.round(p22)}, ${Math.round(p32)}, ${p4})`);
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

  // src/client/view/ChipsView.jsx
  var ChipsView_default = (props) => {
    let denominations = [5e5, 1e5, 25e3, 5e3, 1e3, 500, 100, 25, 5, 1];
    let chipImages = [chip0_default, chip1_default, chip2_default, chip3_default, chip4_default];
    let chipColors = ["#404040", "#008000", "#808000", "#000080", "#ff0000"];
    function ChipStack(props2) {
      let textStyle = {
        top: 12 - props2.height * 5 + "px",
        color: props2.color
      };
      return /* @__PURE__ */ v("div", {
        class: "chips-stack-container",
        style: props2.style
      }, ArrayUtil_default.range(props2.height).map((i4) => {
        let style = {
          top: -i4 * 5 + "px"
        };
        return /* @__PURE__ */ v("img", {
          class: "chips-image",
          src: props2.image,
          style
        });
      }), /* @__PURE__ */ v("div", {
        class: "chips-text",
        style: textStyle
      }, props2.text));
    }
    let stacks = [];
    let pos = 0;
    let value = props.value;
    for (let i4 = 0; i4 < denominations.length; i4++) {
      let denomination = denominations[i4];
      if (value >= denomination) {
        let height = Math.floor(value / denomination);
        value -= height * denomination;
        let text = denomination;
        if (text >= 1e3)
          text = Math.round(text / 1e3) + "K";
        let style = {
          left: pos + "px"
        };
        pos += 40;
        stacks.push(/* @__PURE__ */ v(ChipStack, {
          image: chipImages[i4 % chipImages.length],
          color: chipColors[i4 % chipImages.length],
          text,
          height,
          style
        }));
      }
    }
    let left = -pos / 2;
    if (props.align == "L")
      left = 0;
    if (props.align == "R")
      left = -pos;
    let innerStyle = {
      left: left + "px"
    };
    return /* @__PURE__ */ v(extendedAnimated.div, {
      class: "chips-container",
      style: props.style
    }, /* @__PURE__ */ v("div", {
      class: "chips-container-inner",
      style: innerStyle
    }, stacks));
  };

  // src/utils/ContentScaler.jsx
  function ContentScaler(props) {
    const [windowSize, setWindowSize] = l3({width: 0, height: 0});
    let ref = s3();
    y3(() => {
      function updateSize() {
        setWindowSize({
          width: ref.current.clientWidth,
          height: ref.current.clientHeight
        });
      }
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }, []);
    let useWidth = props.width;
    let useHeight = props.height;
    let orientation = "landscape";
    if (windowSize.height > windowSize.width) {
      useWidth = props.portraitWidth || props.width;
      useHeight = props.portraitHeight || props.height;
      orientation = "portrait";
    }
    let scale;
    if (windowSize.width / useWidth < windowSize.height / useHeight)
      scale = windowSize.width / useWidth;
    else
      scale = windowSize.height / useHeight;
    let scaledWidth = useWidth * scale;
    let scaledHeight = useHeight * scale;
    let posX = (windowSize.width - scaledWidth) / 2;
    let posY = (windowSize.height - scaledHeight) / 2;
    let transform = `translate(${posX}px,${posY}px) scale(${scale})`;
    let innerStyle = {
      width: useWidth + "px",
      height: useHeight + "px",
      transform
    };
    let content = props.children;
    if (!ref.current)
      content = null;
    return /* @__PURE__ */ v(ContentScaler.OrientationContext.Provider, {
      value: orientation
    }, /* @__PURE__ */ v("div", {
      ref,
      class: orientation + " content-scaler-outer"
    }, /* @__PURE__ */ v("div", {
      style: innerStyle,
      class: "content-scaler-inner"
    }, content)));
  }
  ContentScaler.OrientationContext = q();

  // src/client/view/PotView.jsx
  var PotView_default = (props) => {
    let orientation = F(ContentScaler.OrientationContext);
    let potPosition = [480, 315];
    if (orientation == "portrait")
      potPosition = [360, 430];
    let style = {
      left: potPosition[0] + "px",
      top: potPosition[1] + "px"
    };
    let pots = props.state.pots;
    if (!pots)
      pots = [];
    let tot = 0;
    for (let pot of pots)
      tot += pot;
    return /* @__PURE__ */ v("div", {
      class: "pot-container"
    }, /* @__PURE__ */ v(ChipsView_default, {
      style,
      value: tot
    }));
  };

  // src/client/assets/table.png
  var table_default = "data:image/png;base64,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";

  // src/client/assets/seatPlate.png
  var seatPlate_default = "data:image/png;base64,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";

  // src/client/assets/dealerButton.png
  var dealerButton_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAjCAYAAAAJ+yOQAAAL3UlEQVRYhZWYe5BcxXXGf933zmPntU+vVqvdRbtS1oBlxBuCgpHES9gVIVskdsUpKgmVsqFCJRVXSCibCrHshLLLIXEF27hwCjn2H5DCJILIEhaJkZZIAQTGiNVb7Grfq33M7rzn3u6TP+6d0UqWKDFVXX3vTE/319/pc87XR4kIl/pRSunw0b1I04AP2LCvnveOiNhLXnDJYpcKzm1qaopns9kU0ARkPve5+1ZecfnlPelMprW7q7uroaEhfvzE8SFHO9WRkZGx9wffn9yz55VRIA8spjOZRaVUEfA/Clj1YUzWwLW3tzdNT0+33Hjjjf0PPPCnv7tu3bo7elf2rhQUiKqPFxFqbxK+W7GMjY6NHzz4xsAz//rMC3tf++Vga2vbzOzsTBaoXhJYEblgA9zGxsYmoH/Lls/ef/DgO+8Vi2UpFEphC57z+aIUCiXJ5Qpn22JRCvmS5HNFWVwoykK2JNn5gszPF2Tw8LGJ37vv9/8MuKq7u7sDiAL6YjhE5DeZDNmLdnZ2to2Pj/fs2vWLbZ/61K0brbUsHauUCiZQqr7ZGodnGVaoOsMKYw1ohTGWsbGR0Yce+vJfD+zbewCYBMoXY1UvfVFK6aampgTQc9ttGzafOTP3i1tvXbfR9/06IKUUWutz+lqrTakElBa0UogolArMr5SDsqDRdHX1dL344o6fPvnkdx8FVnd2rsgsccxziasxEA6IAyt37vz5dzasv32TsT7WWrRWiLAEyIWPjFIhc7X9S/A/EJQCY+zSP2GsxWJ56803D9xzz50PL1vWcWpqajJ7PqNLkbtAxxNPPPGVjRtv3+QZDyRgCxSowJBcoKnAssHvNdpCcDXI5x8rgWBuUVx3/Q0379q95+mpqcm+dDrzG4yqkAENtPev7tvy9juHvm8FFBqxFuUo1HmTowS11KtDZoLTWGPvHNIAhbUGrXUdcK33jcFYwxv/t//A5s2f+RJwgiVnVIcAE0DPPz75T/8cjcXOshDaTgTEhosJYAIgtXbuGFUHJQK27qWBBW3dksGfRAStFUorbrjh5pu/+c0nHgbaWRLDVWjyzmvWrv27ffv2/4mVs7u31qK0olQq0ZBoQKGwIvieh7UWBKKxWGByVJ2ZGlsCiLUYa+pHRWsHay3GGFKJJJWqV48ARgyFQp7rrl27dX5+fi8wJyLWAWLAyge//OB3N9x+u1Ot+HVTKNfh69u2kSuU2LHjZfr6ehk+fZrn/v0FxienGB0bob+/n2KxyLZvfJ3bNmxAacX27du5+uprMGI4dOgQL+38OadHx5iaOoPrOGz/8U8YGhlj9+5d3HD99WEUCDboRCIs7+j47Z07/2sHsPD444/7Goj29a1as6KzMxpYIjQPFmstgrB587380QN/zO7de3CiMVZ0dXHFlVfS29uHiDDw+n5+57Y7GRjYS9U3LC7m8XwPrBBPJGhubmXdunWsWr0KNxIllc6wceN60pkmjp04GcTPml0FbrllXU/EddYDKaWU1kBiVd+qm+IN8cAxRZacMcH3DNqBRDzB8MgwiYYEs7NZ8rkCWimMtQwePszk1BgDA/vxPA83HsNai+O6NDc1MTw8xIkTJ5mZmaOltY2hoSFeffWXHD58mNWrV9ePQo3NlpY27tn06QeAFkC7QLytrfVyYyy1MChh2HAczcyZaZ5/7nkGB49w1113IFaYmR7Dq36c48fHicViZDIZvvD5z3P86AkOvP46jnZ47bUBPK/ChvXr8TwPMT5nJiYw/auJuA5bt25h7VVr+N6/PMWf/8XDgWOJAiyRSJQV3V1XEwgZ1wW05xt3IbsQemQY3FF4XpWvfvVrlKsV7t50N8mGOMY3fOEPvohXrbJ8+TKSqRRbP7sFLYaP9/fR0pzmmuuuZT67iIjFiuX++/+QYqmM3+5hfJ+HHvwS2lo+cUU/jekkpVKRWCwWOqsEdreG5pa29vm5Ge0S+ub09CRa1aJeQKlWmhWdy+vqRgAnounr6Q42olTg5QQMIIpl7e2A0JTJ1H/vXNYehB8bzpNMhSFI0bViBWIltJ4FBGsthXyeZDLVOT8342qASMS1+WKJo0ePEI3Gwhgp6CCNoFAopYNeFFrpejLRSqOVQhP2S54RQelwcbFoFYQqRU2ghHMH39STgFetMDU5UU/DGrDxWMyCwyuv7CIWi4S7tvWzKTb0dBGsCMaYevQWa4ImNogItR4fpQWpzaOCiIG2CCbUAlJfx1oTxEprmZ+d5IPh01Sr5XHA10D19PDwMWMsQ0PDnDx5gkg0UqddxIAGhaCUDdSNDrenQGlAq1CZCVoHgGrBXYWJvZ7pLYADWMTWok4QUYIEIex86T9w4wmmJiemAauB4pkzM4fj8Ti+UfzwB99DaVBahekMRAyiwtwcMqKURZRFlICywff18UsEa6iMOCdthuNCzm3dQpaF2UleePE/UcIhYLEGsvreoXcPlMtliqUSkVgD3/qHbcRjDWitsVYQqxATXgesrafNpWLoHAFcy/thJrFWsEahRIdmteFmLNYEpvaNoVIq8OwzTzObLVCtVn4GZOvmBmaOHD28N5NK8cHwMMVilW9/6++JRByUBiMWg2CtRowitErgleFitQ1YEbAKwo1ZUzNxcN9RKjC9tTbQk2LxfUOxsMjAqzt59t+ep7vrMvL5xX1AXkSsDv0++/7goe/nCnmU0pwaHmFhMc9jjz1KuZzHGh8xBmN9DDZkRrAWrFWI1QHbNXBhvKuBr2mBQFhYrLEYMRhr8TyPXHaGt/a9yqOPfYPmjy3DcdT0xMTkZEggOtRs+fGx0bdPnTr5v+lkimI+z/HjJ/AN/M0jj/DrX72JsRUq5RK+5+H5Hp4x+NZgjIcxgcoRBGNNwKi1GBOY2jc+vrGByhODZzyqnk8+l2N+eoSXf/Y8f/nI14il0rS1NnP46OAPgBnCu/pS0ZsCrrr33q3/k0wk3Q8+OEVzSzOxWJxIxGFZaxP33beVlav6sQKuE0VHXGpivKbeVWhKVZfrEoaY4BwaY6iUi5hKkaHjR3j6Rz9iYP9bNLV+jObGNFPTZ2ZGR4fvBo6ISLEOMsweLtDSsXz5HTffeMtPo9Eo7777a1b1rWIum6UhHsd1LV0rOvjMPZtY/Vv9NDY1Y9AgGu249ctZ7T4UmNjgGx/jVTHVCoX8PEOnTrLjpZd5be9+ShWfru5uisUFFrIFfOt9cW5udg8wU1Pm51xplVJRoL23t2/zmis/8VQ0GufAG/vp7ukhmUizsLCA1i4KSyoZo++ybq67/lp6V/aSTqeJJ5LEQ2VvxeB5VUrFEtn5GSbHJ3jr7Xd46+CvOD06hm81La0tZNIpjh07iuNGyGQanx0ePrUNGBWRah3XBe7dUaC9o6Nj4yfXrN3uOBGOHT9GbnGBvtWrSCYSLCzmMb6HiKVSqaAUNMRjRKMRXO2gdeA41YpHoVQkXyyQzxXRjkNDPEkikaAhEWdiYozJyQmWtS8nnmjYNTx06q+AU5x3B79gmUUpFdVat1hr+2+66ZanXCeyJru4yNTEONVqhba2Njo6O3HdCOVymWq1SrVawVoDAsYPg7wIjuPgaAetHRxXUSwVmRwfJ5fPEY3FWd7eiW+8H4+Nj3wbGAKK519pL1oLUkq5sVisqVKpdFy2snfTis7uvy0WS6lcLkd2fo58MYdCSKebSGcaaYjFUFrjaB16kmCMR6lUJpdbpFAoUCjkAYjF4jQ2NpJMpBZnZqe+ksvl/5sPqWJcSsEq6rpui+/7HZf19N7R0tr6oLGsLJXylItFCvlFSqUynucR3gdDTXj2oxVEYjEaYgkSyQSRSDRbyOd+ODM785yjnXFjzRwfUmn7UJDngY1rrTPW2pbGxsa+lpa2O5PJ5F2RSOTycrmC53v41UDUWgmkmeM4aMdBKY2gFsvl0iu5XPbFQqE4CEwTpL2L1oA+EsjzwLoE5ZgUkAEyqWSqLZVO94kls6yj/ZOeV01px12cmBh/T6zMzM/PDRLUKLMEoqHMpZb9PirI88DC2epurdIbXfJcq/TWqr21iq/9qNXe/wdzPHIhtB160wAAAABJRU5ErkJggg==";

  // src/client/assets/cardBack.png
  var cardBack_default = "data:image/png;base64,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";

  // src/client/assets/cardFrame.png
  var cardFrame_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAAB6CAYAAADK+s+EAAAC0klEQVR4nO3XwUobURiG4fdM7VREKIgLCWJL8QoOpZfQjQi5ibj0YtwHBnoN2XRnr6FL6SYyLkaEUhGJyZwucga6UNz4dXD4HjgQMpufl5+TSUgp0QkhFMDmP2cDKLCntMASuO9OSqntHoYubgihBHaAfeAQGAHbwFsc+DEt8ADcAjVwAVwCNymlBQA5bgkcAOMY47SqqnnTNKtkz2qaZlVV1TzGOAXGuWOZ8tIWwB4wnkwm530P+5pNJpPzHHiP9ZXKFvA5xjjte7ghyBv8BdgqctzD09PTr//hnhq83PETOW4JjI6Ojkb9jjUMueMIKAvWd8P27u6u3wheQO64TY5bsH7dspfzDii6bfXWCjiqkOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmukOMKOa6Q4wo5rpDjCjmuUBe37XWKgSpYh33oe5CBWQJtkT/cXl9fe3tfQO74G1gUwAKoZ7NZ3e9Yw5A71uS4d8DF2dnZ937HGobc8Rdw9wZYAaurq6u7uq5Hx8fHH/od7/U6OTn5MZvNvgE/gT+klABK4AAYxxinVVXNm6ZZJXtW0zSrqqrmMcYpMAY+AmVKiZBSIoRQABvADrAPHAIj4H3+3h63ZP3jVQMXwCVwAyxTSm1I680FIISwAWzmU+bjPxpPa1m/ECyAe+A+pbTsHv4FXoNlhddRAB8AAAAASUVORK5CYII=";

  // src/client/assets/suitSymbol0.png
  var suitSymbol0_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAABdUlEQVQ4jY2UvUoDQRSFv7uIlaTIA1iFNLuFiKBFGp9ASSX4AII/hYWNICIYUuoLWNhpkUYFK+1tbLLbBSsrixRplT0WmZXNZH9cGBbunPvNOZedNUnUPYlZC/gKpUmZJqilAIJbQb9aJFWuGPaHoBi+h7DhaoGvs6poidka8CJoABi8Czajgoil0RKzRcGVoGHwA6TAKtAr0lfNqA90AAQLBoGmrg4Tsx1fXBgtMesKBparOQhOPTZYD6XRnKPYLHCQFcHN3Ik5mEFTcJ+YLWW9M44Ss7bg0aCduSgC5Rw+AbuhNJmZkWDVoO0AaQbwIwpSB+4IlmeiAUTSneDavNh+RNzggeNIiqF82ANB17x6pnT1s1C6/DugBNQE3gStvJMc6CGUtvI9hfZDaSzYMzcLpvNK3faH4MDvKf0gI+kVOHcOAkHgoEeR9DnXUHdph/Acg9zF7ZXpqu5a4NycuPdIcFGmr3XkXJ3GsF2l+S9o7v/jr19KsUBrRuJhtAAAAABJRU5ErkJggg==";

  // src/client/assets/suitSymbol1.png
  var suitSymbol1_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAABgklEQVQ4jZXUPWsWQRAH8N8ekuIIQcQyhaSQkEosUsjTKIKthYWF6GexUJAgVkGsLGz8AhZW2kYkBAtRUNMZDFoYBF9inrG4XXK5Z0/IwLCz87a7/5nZFBHGKKW0hFW0+BQRL0edI6LKuIptRI8foq36D4KbvK7iWy/Bfk9+cJxEjwY3CRzk9QtWhomawTOnWTxVQaH4tjg9ZhzSxiiovMPmUHmiCCmla7iFKT7ja+1k7GEtpbSMV7gfEbsFmztmMdmv6A4cYlX4Pc7CBL8rQcfh9QbnMYe//8FljEpxJk0Pp+mIU802pLkGb8umFzB1WNHXuKsDn6M3L/JWiggppSe4UTnpKZ5ludU16pD+4GKp2kmsYUdXrY+4l23XsZHly3iB7/iZ5Utl8JveiJzBChZ7uue6ykzyvsVy5vnqrFV+gNuO9sviqG8leB4X8Nhsv2zjJpaGcan/seUxuYJz+Zl7gyotZHA38QbrEbFLb9YybeFDTvDL7FCXtljQtcuPYvgH+Gw/XcVFw40AAAAASUVORK5CYII=";

  // src/client/assets/suitSymbol2.png
  var suitSymbol2_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAABlklEQVQ4jaWTP0tcQRTFf+expLDwI+QLzCvyBdKKJumElGlSpbCwiCApLCXWIsEmiE1iEUIgpEthLFK8QuSthZWFpSwhSLCQPSl2xp0d32YJXnjMn3Pvb87c4ck2KVppTrBueAbMCU6At8FuAPrSA2DNsAzMC06jfqQc1Jf2DC8U11G5FCwFu2mlPe7qvwRP1UIV7GFfWgC+GnqCoQGNkivBAfANeB8Bw3S4oAI+9TymP2IEScUpEcMi8ERjF7d6rH3YyzaussTbMerzSUvjuCEg+F0FO9k8NAwykdxVGcVeW6VZbbeCLx01pbsJmODKsF8VBa8FF/kVu6Loz05tNxOg2r40rOS9yF2V/TMcCzZg9HQTUdufBVsJVlwjf/o/wKtgX3eCYrwBvnfsD7Oa1dr+mYQ7oFaqgn0jeGm4SG5SfpxvB3s3r5v4RTqgz4GPxWs1hsd1vNJUR3nU9gHwIa1jw1dLyEwQgGDDMIjN363to668maBgnwHv4nJzWl5vFii6+gFsBfv8XiCgid/0w/71av8TfwFyc59nvRNW1wAAAABJRU5ErkJggg==";

  // src/client/assets/suitSymbol3.png
  var suitSymbol3_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAABZUlEQVQ4jZWUvUoDQRDHf3MECSmOICLBQlKKlYUIWomNYmkRfAXBxspO8CFErGzURvAJFIuoAUEQfAHFD2wVyzNjcbNmb5O7Sw6GPXZ3fjsf/11UlSIDloFG2b6I8m8H2CrdlRNFZOMSoMArEPtrfT4FKTWAJwMpcF5YghzIONA2wK8HOxoaZJBbzzm041yQV5NJoFMAyYX5kdRLIgntMA+0PwLE2UZGRyIyAaybIrqlmoHExlU34QQ5BsTB5mGAsYhE/yBV/QBuAkhkJ58BJ0E0Fftvq2p6oFejJnBFL/8XoAVsA2vAHvDlrR8ANecvqoqIRKraFZEYWAFqwJ2qPovINXCvqrsiMg/MAJ+qeplJMrxfgTgXvOiqI18Rg0wDD14qp4MOGwgi7d6s1eWdft10gE2gGYLEAE5LLWARmLPMvyHzZtVt7tEac6GqCZABVYEpa++PSaBCT09ODhVSzSXAm2v/HwfZ2t39eNvBAAAAAElFTkSuQmCC";

  // src/data/CardData.js
  var CardData2 = class {
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
      return CardData2.CARD_VALUE_STRINGS[this.value % 13];
    }
    getSuitIndex() {
      return Math.floor(this.value / 13);
    }
    getSuitString() {
      return CardData2.SUIT_STRINGS[this.getSuitIndex()];
    }
    getLongSuitString() {
      return CardData2.LONG_SUIT_STRINGS[this.getSuitIndex()];
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
    static compareValue(a4, b3) {
      if (!(a4 instanceof CardData2) || !(b3 instanceof CardData2))
        throw new Error("Not comparing card data");
      if (a4.getValue() > b3.getValue())
        return 1;
      if (a4.getValue() < b3.getValue())
        return -1;
      return 0;
    }
    static compareCardValue(a4, b3) {
      if (!(a4 instanceof CardData2) || !(b3 instanceof CardData2))
        throw new Error("Not comparing card data");
      if (a4.getCardValue() > b3.getCardValue())
        return 1;
      if (a4.getCardValue() < b3.getCardValue())
        return -1;
      return 0;
    }
    static compareSuitIndex(a4, b3) {
      if (!(a4 instanceof CardData2) || !(b3 instanceof CardData2))
        throw new Error("Not comparing card data");
      if (a4.getSuitIndex() > b3.getSuitIndex())
        return 1;
      if (a4.getSuitIndex() < b3.getSuitIndex())
        return -1;
      return 0;
    }
    static fromString(s4) {
      var i4;
      var cardValue = -1;
      for (i4 = 0; i4 < CardData2.CARD_VALUE_STRINGS.length; i4++) {
        var cand = CardData2.CARD_VALUE_STRINGS[i4];
        if (s4.substring(0, cand.length).toUpperCase() == cand)
          cardValue = i4;
      }
      if (cardValue < 0)
        throw new Error("Not a valid card string: " + s4);
      var suitString = s4.substring(CardData2.CARD_VALUE_STRINGS[cardValue].length);
      var suitIndex = -1;
      for (i4 = 0; i4 < CardData2.SUIT_STRINGS.length; i4++) {
        var cand = CardData2.SUIT_STRINGS[i4];
        if (suitString.toUpperCase() == cand)
          suitIndex = i4;
      }
      if (suitIndex < 0)
        throw new Error("Not a valid card string: " + s4);
      return new CardData2(suitIndex * 13 + cardValue);
    }
  };
  var CardData = CardData2;
  __publicField(CardData, "CARD_VALUE_STRINGS", ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]);
  __publicField(CardData, "SUIT_STRINGS", ["D", "C", "H", "S"]);
  __publicField(CardData, "LONG_SUIT_STRINGS", ["Diamonds", "Clubs", "Hearts", "Spades"]);
  __publicField(CardData, "HIDDEN", -1);
  var CardData_default = CardData;

  // src/client/view/CardView.jsx
  var CardView_default = (props) => {
    let newTournamentTable = useIsValueChanged(props.state.tournamentTableIndex);
    const symbolImages = [
      suitSymbol0_default,
      suitSymbol1_default,
      suitSymbol2_default,
      suitSymbol3_default
    ];
    let staticStyle = {
      overflow: "hidden",
      width: "87px"
    };
    let style = {
      opacity: 1,
      transform: "translate(0px,0px)",
      filter: "brightness(100%) blur(0px)",
      height: "122px",
      immediate: false
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
    if (newTournamentTable)
      style.immediate = true;
    style = useSpring(style);
    function CardContents() {
      if (props.value === void 0)
        return null;
      if (props.value < 0)
        return /* @__PURE__ */ v("img", {
          class: "card-image",
          src: cardBack_default
        });
      let cardData = new CardData_default(props.value);
      let cardTextStyle = {
        color: cardData.getColor()
      };
      return /* @__PURE__ */ v(p, null, /* @__PURE__ */ v("img", {
        class: "card-image",
        src: cardFrame_default
      }), /* @__PURE__ */ v("img", {
        class: "card-symbol-image",
        src: symbolImages[cardData.getSuitIndex()]
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

  // src/client/assets/timerBackground.png
  var timerBackground_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFhklEQVRYha2XX2/TWBqHn2PHbuIkTXCMmpZQJKBQJASCC7jYGyQkxFcZrTp7M/spdm+GajRfhUtu9oYPAAgqGg1piEOaBKd2Hf87exEfTyid3UI50lH+Of495z2vf+d9hZSSsw4hhAaoedrIgExKmZ35nmcBEEKUABOwgFWgnM9SfkkChPn0gACIpJTJuQDyFZcBG2hfv359p9VqPapWq+1KpWKapkmapkRRRBAEked5g+l0+qLb7e4CA2AMhP8rIqcC5MIloAls3rlzZ/fy5csP6vW6BpBlGVJKpJRfvU+SBM/zssFg8HJvb28H+AOYAslpIF8BLK26feXKlZ9u3Ljxs+M4JlAIpWlKHMekaUqapqh7CCFQ12VZxuHhYdTr9Z65rvt7HpGvovEFwJJ459atW7/evXv36fJNoygiDEOiKCoAsmxxP03T0HUdXdfRNA0hBFmWEccx79+/f97r9f4B9E5CnAQwgc729vZv9+7de6q+j+OY4+PjYg6HQ8bjMUEQIKWkXC6zurpKq9WiXC5jGAalUgld1wGIooi9vb3nHz9+/DvQk1JGXwHkq3c2Nzf/+fDhw1/Un+fzOb7vc3R0RLfbZTgckiSnJ7eu6zQaDTY2NqhWq5imSalUQkpJGIa8ffv23+Px+F/ASEVBSCmVuAVsP378+D+tVssUQhBFEZ7n0e/32d/fJwzDU4VPDsMwaLfbOI6DZVkYhkGWZQyHw+jNmzd/A94AgZQyU4aiAc3bt2/v2rZtAiRJgu/79Pt9Xr9+fWZxtWUfPnzg06dPhGFIlmUIIbBt21xbW9tl8XRpShgWJtO+dOnSA5Xpx8fH+L7P/v7+mYVPjtFoRBzHxZbpuo7jOA+Adq6JpsJ/7dq1HcuytOVs73a737TykyMMQ8bjMUmSIKVE0zTq9brWbDZ3AEsIoSlfX200Go/U6hXAcDj8bnE1RqNRYVZCCEqlEtVq9RELSy8AypVKpZ1lWfHsDodD4jg+N0AYhnieV+SBpmnUarU2i6TXVA6UTdM0lXgcx4zH43OLqzGbzdByKSEElUrFJM8BdZqVdF1HRSDLMoIg+GEAvu8XTglgmn9qF+f6svi31AhnGZqmFc6orL34LX9N4jguAAAqlcoPA2g2mxiGUUQgz61kGSAMgiBS4kIILly48MMA1tbWvgAIgiACIgWQAaHv+wMVfk3TcBwHwzDOLV6v12m324V4mqb4vj9gUTVlCsDzPO+FOmKFEBiGgeM45wbY2toqjukkSYjjGM/zXgBHQKblp1LQ7/d3Z7NZlqYpsLDNTqdzrlxotVpcvXoVTdMKf/n8+XPmed4ucLR8GEXAYDQavUySpDCNlZUVNjc3v0tcCMH9+/cRQiCEII5j5vM5ruu+ZFEdFTkAi22Y9nq9nclkEkVRhJQSXddptVpsb29Tq9XOLO44Dk+ePMFxnCL0YRjium40Go12WNSIGeRmIKXMhBAB8Ifrus8qlcovKg8Mw+DixYs4joPruhwcHPylSdXrdW7evMnW1lbxXZqmhR0fHBw8Y1GkBl8UJEthM4GO4zi/dTqdp5VKpXh8NO3PXmQ8HjOZTPA8D1js9fr6Ouvr60XIpZTEcUwQBHiex6tXr55PJpO/LslygKIotW37142NjaeWZbGysvKFkykgZa+lUqn4LIQgTVPm83kh/u7du+eTyeT/F6UnINq1Wu0n27Z/tm3bVNFQIGoq8eUqWB3ng8Eg6vf7z3zfP1tZfgKiaEwajcaubdsPms2mthyN5a1R/UIURUyn08x13ZeHh4ff3picAmLlIG3LsnYsy3pUq9XalmWZyiPyvY583x/MZrMXR0dHqjWbspRwp2p8Z3Nq5Z+Xm9OIhb3+uOb0FJCT7fmyj6jXb2rP/ws6FmAYDqx3JwAAAABJRU5ErkJggg==";

  // src/client/assets/timerWhiteHalf.png
  var timerWhiteHalf_default = "data:image/png;base64,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bG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6Y2Q3OWI4MmQtMmUyNi00YjE5LWFhYzYtOTIyMDlhNDY0OWZiIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmQyY2E3YzIwLWEzOTUtNGEwOC04MjcyLTA2M2I4ZjI0ZjNkZiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjVkMDRlZTg3LTYxNjktNGNhZi1iM2U5LTZkYzU0YzVkODk3MyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iTGludXgiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjExNDg2Nzk5MzEyOTQ4IgogICBHSU1QOlZlcnNpb249IjIuMTAuMjIiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCI+CiAgIDxpcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgPGlwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgIDxpcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgPGlwdGNFeHQ6UmVnaXN0cnlJZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmI3YmFiOThkLTRkNmQtNDcxYy1iNGY1LTM0MTYwYjRlYWJlNSIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChMaW51eCkiCiAgICAgIHN0RXZ0OndoZW49IiswODowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgIDxwbHVzOkltYWdlU3VwcGxpZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZVN1cHBsaWVyPgogICA8cGx1czpJbWFnZUNyZWF0b3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZUNyZWF0b3I+CiAgIDxwbHVzOkNvcHlyaWdodE93bmVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6Q29weXJpZ2h0T3duZXI+CiAgIDxwbHVzOkxpY2Vuc29yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6TGljZW5zb3I+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz77T5cWAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QEYCw0TH9WmIwAAAKRJREFUWMPtlrENwkAMRb8RUnrGoGYJZqCLlHUQezBAlqBNTcMSKMVLkwophyjOPiG/9qTzk+07W0qS5AeADuiBO/AEZs/gAzDxgUfgA3BlAw+BzeDVBda0EyKwNtxUW2BXOLtIOtYucUng7PG6SgInDwEr9MAsaf/1AjOrlQFFl+AVLfCIFhhbmHxxH5GZvSXdWtgB4oZRE+M4fCFpZiVLkr9lAaeiR6xJkelvAAAAAElFTkSuQmCC";

  // src/client/assets/timerRedHalf.png
  var timerRedHalf_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEknpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7VdbsuMoDP1nFbMES0I8lsNLVb2DWf4c2Y4nyX10bk3mr00FZAFC6IiDE9bfvyz8hYeZY4iaS6opbXhijZUbhLIdT9tr2uJe7w+fXXh/0Ierg6EStHK8lnSOv+npMnA0DZLeGSrj7OiPHTWe9suToXNlcY9cnqehehoSPjroNNCObW2plny/hb6Odt52Uo5f8CqWR7c/vGdEbyrWEeYlJBtqFj4cEP9RkAaBULNEdqlCJhHUIuU0hoB8FqftzqvwjMol0Rf6J1AkHfoAxWMw09V+qid90p8Gwx7iu5VlXCs/6NPc8vN2bj+zWYLZOnbXYkJI07mp21Z2CQM7Qi77tISS8VPIeS8VpQRk7wDkcxtbRxlUiQGLUaRJjYzW3g4acDHy4oyWeQAo1xXJXHnIFoBQ9ELGGYhNKcBvAF6Bli9faF+37ssNKlh4EkYywRh5KgSv3lG+NGTmKU+0lStW8Is9CeGGI+c1RgEQslse6R7gW3l+HFcBgrqHuWCDbeuHia505pbnkexACwYq2uOsUZ6nAYQIayucIQECWyJRSrRl5kyEOBbg02Co+NnogIBUecJLjiIJ4BT2tTEn0z6WlQ81OAtAqCTJgAZHClg5sSF/cizIoaaiUVWTZi1atSVJMWlKKScnv5Ylx6w55ZxLrrkVKbFoSSWXEkotrXIVkKPWVHMttdbWsGiD5YbZDQNa69ylx6499dxLr70NpM+IQ0caeZQw6miTp0zwxEwzzzLrbIsWUmnFpSutvMqqqxlSzcSiqSXLVqxau1CjcMD6obyOGt1Q4x0pH5gv1DA155sJcjpRxwyIcSQgnh0BJDQ7ZluhGDk4dI7ZVhmnQhleqoMzyREDgnERq9GF3b/IPeAWYvxPuPENueDQvQO54NB9gdxH3D5BbfptMzYJO0J+DD2om+D4YcAqjUvzS+3lNvx0wh9DbzPUe3XJuHVNlnpCViRAvo0uPKwV4N9tzDHTqmk2W8l6UYoaSAuttsv+IfKhzRtya0zSjltprtGs6VoZmVuXVoMckVQ1h5pssvXZx8xJSnKHuE8VrL3tL7hKX2jDZx1ybJD7EDHVl+yFz+xcfg1BtF7zK9wr1kq7H61NhKRNP6DFJj6kBoK9mgxbhkME8tDe/Oxa7Wvt4QwK1mttl9U//H7Y6hDNWYBasuikwH3V3AEEqKemPCHLNBx97Rb7wnkXnWVR2xPFNNqwcZ9O4bs8O7aKeduwqfHbtAw/yN/Ln7zZcHK87w7v8afhI+It/vhfiLf4s3mw3+HPcUTe4M+rfPRbf77Io90fTHZ22qmJDLfkxCV0UhPOcvOXXkcfPa2eZ1i2Yu8H//yGmr5twyE4fTlzycK6bbZxMFfKpuTMJdWdw+WJa3ZU7PADbYUXeeu3NBV+YOdbmgrbT/j08qvDKCDZqSvmWbUHhGac3AXa8hdQOxvP3qZlMBevcbDP98QVHCyQk9NSMYRygffooKVqWA20NPA9AjIEIwIJzvPkoUdSCu+4HP8Y+r8MGb4bKxjxH1oQO/7rS9bjAAABhWlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw1AUhU9TpSoVBzsUUchQnSyIFXHUKhShQqgVWnUweekfNGlIWlwcBdeCgz+LVQcXZ10dXAVB8AfEzc1J0UVKvC8ptIjxwuN9nHfP4b37AKFRZprVNQFoetVMJeJiJrsqBl7hQxi9GEFMZpYxJ0lJeNbXPXVT3UV5lnffn9Wv5iwG+ETiWWaYVeIN4unNqsF5nzjEirJKfE48btIFiR+5rrj8xrngsMAzQ2Y6NU8cIhYLHax0MCuaGvEUcUTVdMoXMi6rnLc4a+Uaa92TvzCY01eWuU5rGAksYgkSRCiooYQyqojSrpNiIUXncQ//kOOXyKWQqwRGjgVUoEF2/OB/8Hu2Vj426SYF40D3i21/jAKBXaBZt+3vY9tungD+Z+BKb/srDWDmk/R6W4scAQPbwMV1W1P2gMsdIPxkyKbsSH5aQj4PvJ/RN2WBwVugb82dW+scpw9AmmaVvAEODoGxAmWve7y7p3Nu//a05vcDiUZysMMTKHMAAA+LaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6MzZkMjkzOTAtYTRmNC00ZTkxLThkYTMtZjIyMTExNzc5MDE1IgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM1ZmIyYzNjLTI0ODEtNDUyYS04MGNjLWUwOGRmNTY3ZjYzNiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQ3ZDg0NDQ2LWEwNjItNDNlZC1hM2YyLWNjNWRjNTYyNmQ2NSIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iTGludXgiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjExNDg2ODIwMjQ0NTY0IgogICBHSU1QOlZlcnNpb249IjIuMTAuMjIiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCI+CiAgIDxpcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgPGlwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgIDxpcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgPGlwdGNFeHQ6UmVnaXN0cnlJZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU0ZWUzMWRhLTk1NzQtNDc2YS05MTVkLWRjODA1MDE0M2FjZSIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChMaW51eCkiCiAgICAgIHN0RXZ0OndoZW49IiswODowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgIDxwbHVzOkltYWdlU3VwcGxpZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZVN1cHBsaWVyPgogICA8cGx1czpJbWFnZUNyZWF0b3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZUNyZWF0b3I+CiAgIDxwbHVzOkNvcHlyaWdodE93bmVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6Q29weXJpZ2h0T3duZXI+CiAgIDxwbHVzOkxpY2Vuc29yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6TGljZW5zb3I+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5O5r7JAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QEYCw0ort5PBwAAALJJREFUWMPtliEOwkAQRR9NST26J0D3AGt7hmp86yvrwaM5A5YDoDkBl6jDYGl3Q6efhPl6kv8y+2fzweX6d21Shm9QAA1QAxVQBth+A5AnmB+AFtgvuYE8wngH9EBn8QRZxIyZ+SzAe+2dZQizmcC11lcwtYFm6cClAtRr/ANTAJUaoFQDoAZ4qgHuaoCrGuACPGQAAUbgJL2CAGfgqD7DwRIiuhF9KiQhsVX9XCVzuVwvacAWqOw07XwAAAAASUVORK5CYII=";

  // src/client/view/TimerView.jsx
  function linMap(sourceOne, sourceTwo, targetOne, targetTwo, v3) {
    let weigth = (v3 - sourceOne) / (sourceTwo - sourceOne);
    return targetOne + weigth * (targetTwo - targetOne);
  }
  var TimerView_default = (props) => {
    let now2 = usePerformanceNow();
    let finishTime = props.stateTime + props.timeLeft;
    let startTime = finishTime - props.totalTime;
    let frac = 1 - (now2 - startTime) / (finishTime - startTime);
    let bg1Style = {
      transform: "translateX(.25px)"
    };
    let bg2Style = {
      transform: "rotate(180deg) translateX(.25px)"
    };
    let content;
    if (frac <= 0)
      content = null;
    else if (frac < 0.5) {
      let angle = linMap(0.5, 0, -180, 0, frac);
      let coverStyle = {
        transform: `rotate(${angle}deg) translateX(.25px)`
      };
      content = /* @__PURE__ */ v(p, null, /* @__PURE__ */ v("img", {
        src: timerRedHalf_default,
        class: "timer-half-image",
        style: bg1Style
      }), /* @__PURE__ */ v("img", {
        src: timerWhiteHalf_default,
        class: "timer-half-image",
        style: coverStyle
      }));
    } else {
      let angle = linMap(1, 0.5, -180, 0, frac);
      let otherHalfStyle = {
        transform: `rotate(${angle}deg) translateX(.25px)`
      };
      content = /* @__PURE__ */ v(p, null, /* @__PURE__ */ v("img", {
        src: timerRedHalf_default,
        class: "timer-half-image",
        style: bg1Style
      }), /* @__PURE__ */ v("img", {
        src: timerRedHalf_default,
        class: "timer-half-image",
        style: otherHalfStyle
      }));
    }
    return /* @__PURE__ */ v("div", {
      style: props.style,
      class: "timer-container " + props.class
    }, /* @__PURE__ */ v("img", {
      src: timerBackground_default,
      class: "timer-image"
    }), /* @__PURE__ */ v("img", {
      src: timerWhiteHalf_default,
      class: "timer-half-image",
      style: bg1Style
    }), /* @__PURE__ */ v("img", {
      src: timerWhiteHalf_default,
      class: "timer-half-image",
      style: bg2Style
    }), content);
  };

  // src/client/view/CountChipsView.jsx
  var CountChipsView_default = (props) => {
    let newTournamentTable = useIsValueChanged(props.state.tournamentTableIndex);
    let diff = useLastValueDiff(props.value);
    let isChanged = useIsValueChanged(props.value);
    let ref = s3();
    let transform = props.style.transform;
    let fromTransform = "translate(0px,0px)";
    if (props.backward) {
      transform = "translate(0px,0px)";
      fromTransform = props.style.transform;
    }
    let [style, setStyle] = useSpring(() => ({
      left: props.style.left,
      top: props.style.top,
      config: config.slow,
      transform: fromTransform,
      opacity: 0
    }));
    if (ref.current && isChanged && !newTournamentTable) {
      setStyle({
        left: props.style.left,
        top: props.style.top,
        opacity: 1,
        transform: fromTransform,
        immediate: true
      });
      setStyle({
        left: props.style.left,
        top: props.style.top,
        opacity: 0,
        transform,
        immediate: false
      });
    }
    return /* @__PURE__ */ v(ChipsView_default, {
      ref,
      value: diff,
      style,
      class: props.class,
      align: props.align
    });
  };

  // src/utils/Vec.js
  var Vec = class {
    constructor(a4, b3) {
      if (Array.isArray(a4)) {
        this.x = a4[0];
        this.y = a4[1];
      } else if (typeof a4 == "object") {
        this.x = a4.x;
        this.y = a4.y;
      } else {
        this.x = a4;
        this.y = b3;
      }
    }
    sub(v3) {
      return new Vec(this.x - v3.x, this.y - v3.y);
    }
  };
  var Vec_default = Vec;

  // src/client/view/SeatView.jsx
  var SeatView_default = (props) => {
    const orientation = F(ContentScaler.OrientationContext);
    const newTournamentTable = useIsValueChanged(props.state.tournamentTableIndex);
    const containerRef = s3();
    let potPosition = [480, 315];
    let betAlign = "LCRRRRCLLL";
    let seatPositions = [
      [287, 118],
      [483, 112],
      [676, 118],
      [844, 247],
      [817, 413],
      [676, 490],
      [483, 495],
      [287, 490],
      [140, 413],
      [123, 247]
    ];
    let chipsPositions = [
      [225, 150],
      [478, 150],
      [730, 150],
      [778, 196],
      [748, 322],
      [719, 360],
      [481, 360],
      [232, 360],
      [199, 322],
      [181, 200]
    ];
    let dealerButtonPositions = [
      [347, 133],
      [395, 133],
      [574, 133],
      [762, 267],
      [715, 358],
      [574, 434],
      [536, 432],
      [351, 432],
      [193, 362],
      [168, 266]
    ];
    if (orientation == "portrait") {
      potPosition = [360, 430];
      betAlign = "LRRRRRLLLL";
      seatPositions = [
        [265, 120],
        [460, 120],
        [625, 290],
        [625, 460],
        [625, 620],
        [460, 760],
        [265, 760],
        [90, 620],
        [90, 460],
        [90, 290]
      ];
      chipsPositions = [
        [240, 160],
        [480, 160],
        [560, 240],
        [560, 410],
        [560, 570],
        [490, 630],
        [230, 630],
        [150, 570],
        [150, 410],
        [150, 240]
      ];
      dealerButtonPositions = [
        [330, 130],
        [355, 130],
        [525, 305],
        [525, 475],
        [505, 605],
        [355, 715],
        [325, 710],
        [168, 605],
        [150, 475],
        [150, 305]
      ];
    }
    let seatData = props.state.seats[props.seatIndex];
    if (!seatData)
      seatData = {};
    let containerStyle = {
      left: seatPositions[props.seatIndex][0] + "px",
      top: seatPositions[props.seatIndex][1] + "px"
    };
    let dealerPosRel = new Vec_default(dealerButtonPositions[props.seatIndex]).sub(new Vec_default(seatPositions[props.seatIndex]));
    let dealerButtonStyle = {
      left: dealerPosRel.x + "px",
      top: dealerPosRel.y + "px"
    };
    let chipsPosRel = new Vec_default(chipsPositions[props.seatIndex]).sub(new Vec_default(seatPositions[props.seatIndex]));
    let chipsStyle = {
      left: chipsPosRel.x + "px",
      top: chipsPosRel.y + "px"
    };
    let chipsTranslate = new Vec_default(potPosition).sub(chipsPosRel).sub(new Vec_default(seatPositions[props.seatIndex]));
    let potContribStyle = {
      left: chipsPosRel.x + "px",
      top: chipsPosRel.y + "px",
      transform: `translate(${chipsTranslate.x}px,${chipsTranslate.y}px)`
    };
    let cards = seatData.cards;
    if (!cards)
      cards = [];
    let seatPlateStyle = {
      filter: "brightness(100%) blur(0px)"
    };
    if (props.state.highlightCards && props.state.speakerIndex != props.seatIndex)
      seatPlateStyle.filter = "brightness(66%) blur(2px)";
    seatPlateStyle = useSpring(seatPlateStyle);
    let [actionSpring, setActionSpring] = useSpring(() => ({
      t: 1,
      config: {
        duration: 2e3
      }
    }));
    let newAction = useIsValueChanged(seatData.actionCount);
    if (!seatData.action) {
      setActionSpring({t: 1, immediate: true});
    }
    if (seatData.action && newAction && containerRef.current && !newTournamentTable) {
      setActionSpring({t: 0, immediate: true});
      setActionSpring({t: 1, immediate: false});
    }
    let actionStyle = {
      opacity: actionSpring.t.interpolate({
        range: [0, 0.5, 1],
        output: [1, 1, 0]
      })
    };
    let textStyle = {
      opacity: actionSpring.t.interpolate({
        range: [0, 0.5, 1],
        output: [0, 0, 1]
      })
    };
    if (seatData.state == "inactive")
      return null;
    return /* @__PURE__ */ v("div", {
      class: "seat-container",
      style: containerStyle,
      ref: containerRef
    }, /* @__PURE__ */ v("div", {
      class: "seat-card-container"
    }, ArrayUtil_default.range(2).map((index) => {
      let darken = false;
      let highlight = false;
      if (props.state.highlightCards) {
        let hl = props.state.highlightCards;
        if (props.state.speakerIndex == props.seatIndex && hl.seatCards.indexOf(index) >= 0)
          highlight = true;
        else
          darken = true;
      }
      let folded = seatData.state == "gameOver" || seatData.state == "muck";
      return /* @__PURE__ */ v(CardView_default, {
        class: "seat-card",
        value: cards[index],
        darken,
        highlight,
        folded,
        state: props.state
      });
    })), /* @__PURE__ */ v(extendedAnimated.div, {
      class: "seat-plate",
      onClick: props.onClick,
      style: seatPlateStyle
    }, /* @__PURE__ */ v("img", {
      class: "seat-image",
      src: seatPlate_default
    }), /* @__PURE__ */ v(extendedAnimated.div, {
      style: textStyle,
      class: "seat-name-text"
    }, seatData.user), /* @__PURE__ */ v(extendedAnimated.div, {
      style: textStyle,
      class: "seat-chips-text"
    }, seatData.chips), /* @__PURE__ */ v(extendedAnimated.div, {
      style: actionStyle,
      class: "seat-action-text"
    }, seatData.action)), If(props.seatIndex == props.state.speakerIndex && props.state.totalTime, () => /* @__PURE__ */ v(TimerView_default, {
      class: "seat-timer",
      stateTime: props.state.stateTime,
      timeLeft: props.state.timeLeft,
      totalTime: props.state.totalTime
    })), If(props.seatIndex == props.state.dealerIndex, () => /* @__PURE__ */ v("img", {
      class: "seat-dealer-button",
      src: dealerButton_default,
      style: dealerButtonStyle
    })), /* @__PURE__ */ v(ChipsView_default, {
      style: chipsStyle,
      align: betAlign[props.seatIndex],
      value: seatData.bet
    }), /* @__PURE__ */ v(CountChipsView_default, {
      style: potContribStyle,
      align: betAlign[props.seatIndex],
      value: seatData.potContrib,
      state: props.state
    }), /* @__PURE__ */ v(CountChipsView_default, {
      style: potContribStyle,
      align: betAlign[props.seatIndex],
      value: seatData.win,
      backward: true,
      state: props.state
    }));
  };

  // src/client/assets/bigButton.png
  var bigButton_default = "data:image/png;base64,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";

  // src/client/view/ButtonsView.jsx
  var ButtonsView_default = (props) => {
    let buttons = props.state.buttons;
    let [sliderVal, setSliderVal] = l3(0);
    function onSliderChange(e3) {
      setSliderVal(e3.target.value);
    }
    function getButtonValue(index) {
      if (index == 2 && props.state.sliderMax) {
        let minv = Math.log(props.state.buttons[2].value);
        let maxv = Math.log(props.state.sliderMax);
        let scale = maxv - minv;
        return Math.round(Math.exp(minv + scale * sliderVal));
      } else {
        return props.state.buttons[index].value;
      }
    }
    function onButtonClick(index) {
      props.onButtonClick(index, getButtonValue(index));
    }
    let cls = "num-buttons-" + buttons.length;
    return /* @__PURE__ */ v("div", {
      class: `button-container ${cls}`
    }, /* @__PURE__ */ v("div", {
      class: "button-slider-container"
    }, ReactUtil_default.If(props.state.sliderMax, () => /* @__PURE__ */ v("input", {
      type: "range",
      class: "button-slider",
      min: "0",
      max: "1",
      step: "0.001",
      value: sliderVal,
      onchange: onSliderChange
    }))), buttons.map((button, index) => {
      let value = getButtonValue(index);
      if (!value)
        value = null;
      let buttonLabel = button.label;
      if (!buttonLabel)
        buttonLabel = button.action;
      let style = {
        left: `${index * 105}px`
      };
      return /* @__PURE__ */ v("div", {
        class: "button-big-button",
        style,
        onClick: onButtonClick.bind(null, index)
      }, /* @__PURE__ */ v("img", {
        src: bigButton_default
      }), /* @__PURE__ */ v("div", {
        class: "button-text"
      }, buttonLabel), /* @__PURE__ */ v("div", {
        class: "button-value"
      }, value));
    }));
  };

  // src/client/view/DialogView.jsx
  function DialogView(props) {
    let [dialogValue, setDialogValue] = l3(props.state.dialogValue);
    function onInputChange(e3) {
      setDialogValue(e3.target.value);
    }
    function onButtonClick(index) {
      console.log("button click, val=" + dialogValue);
      setDialogValue(null);
      props.onButtonClick(index, dialogValue);
    }
    return /* @__PURE__ */ v(p, null, /* @__PURE__ */ v("div", {
      class: "dialog-cover"
    }), /* @__PURE__ */ v("div", {
      class: "dialog-container"
    }, /* @__PURE__ */ v("div", {
      class: "dialog-text"
    }, props.state.dialogText.split("\n").map((s4) => /* @__PURE__ */ v("p", null, s4)), If(dialogValue !== null, () => /* @__PURE__ */ v("input", {
      type: "text",
      value: dialogValue,
      onChange: onInputChange
    }))), /* @__PURE__ */ v("div", {
      class: "dialog-button-container"
    }, props.state.dialogButtons.map((buttonData, index) => /* @__PURE__ */ v("button", {
      class: "dialog-button",
      onClick: onButtonClick.bind(null, index)
    }, buttonData.label)))));
  }

  // src/client/view/TonopahView.jsx
  function TonopahView(props) {
    let orientation = F(ContentScaler.OrientationContext);
    let newTournamentTable = useIsValueChanged(props.state.tournamentTableIndex);
    let mainRef = s3();
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
    [mainSpring, setMainSpring] = useSpring(() => ({
      opacity: 1,
      config: config.molasses
    }));
    if (newTournamentTable && mainRef.current) {
      setMainSpring({opacity: 0, immediate: true});
      setMainSpring({opacity: 1, immediate: false});
    }
    let communityCardsDist = 91;
    if (orientation == "portrait")
      communityCardsDist = 30;
    return /* @__PURE__ */ v(extendedAnimated.div, {
      style: mainSpring,
      class: "tonopah-table",
      ref: mainRef
    }, /* @__PURE__ */ v("img", {
      src: table_default,
      class: "tonopah-table-image"
    }), /* @__PURE__ */ v("div", {
      class: "table-card-container"
    }, ArrayUtil_default.range(5).map((index) => {
      let darken = false;
      let highlight = false;
      if (props.state.highlightCards) {
        if (props.state.highlightCards.communityCards.indexOf(index) >= 0)
          highlight = true;
        else
          darken = true;
      }
      let style = {
        left: `${index * communityCardsDist}px`
      };
      return /* @__PURE__ */ v(CardView_default, {
        value: communityCards[index],
        style,
        highlight,
        darken,
        state: props.state
      });
    })), /* @__PURE__ */ v(PotView_default, {
      state: props.state
    }), ArrayUtil_default.range(10).map((index) => /* @__PURE__ */ v(SeatView_default, {
      state: props.state,
      seatIndex: index,
      onClick: onSeatClick.bind(null, index),
      key: index
    })), ReactUtil_default.If(props.state.highlightCards, () => /* @__PURE__ */ v("div", {
      class: "table-card-highlight"
    }, props.state.highlightCards.text)), ReactUtil_default.If(props.state.infoText, () => /* @__PURE__ */ v("div", {
      class: "table-info"
    }, props.state.infoText)), ReactUtil_default.If(props.state.buttons && props.state.buttons.length, () => /* @__PURE__ */ v(ButtonsView_default, {
      state: props.state,
      onButtonClick
    })), ReactUtil_default.If(props.state.dialogText, () => /* @__PURE__ */ v(DialogView, {
      state: props.state,
      onButtonClick: onDialogButtonClick
    })));
  }

  // src/client/view/TournamentInfoView.jsx
  function formatMillis(millis) {
    let secs = Math.round(millis / 1e3);
    if (secs < 0)
      secs = 0;
    let s4 = (secs % 60).toString();
    let m3 = (Math.floor(secs / 60) % 60).toString();
    let hr = Math.floor(secs / (60 * 60)).toString();
    if (s4.length < 2)
      s4 = "0" + s4;
    if (m3.length < 2)
      m3 = "0" + m3;
    if (hr == "0")
      hr = "";
    else {
      if (hr.length < 2)
        hr = "0" + hr;
      hr += ":";
    }
    let text = hr + m3 + ":" + s4;
    return text;
  }
  function TournamentInfoView(props) {
    let performanceNow = usePerformanceNow();
    let timeLeftFormatted = "";
    if (props.state.tournamentStartsIn) {
      let startTime = props.state.stateTime + props.state.tournamentStartsIn;
      let timeLeft = startTime - performanceNow;
      timeLeftFormatted = formatMillis(timeLeft);
    }
    let texts = [];
    for (let text of props.state.tournamentTexts)
      texts.push(text.replace("%t", timeLeftFormatted));
    function onButtonClick(action) {
      props.state.send({
        action
      });
    }
    let buttons = props.state.tournamentButtons;
    if (!buttons)
      buttons = [];
    return /* @__PURE__ */ v("div", {
      class: "tournament-info-screen"
    }, /* @__PURE__ */ v("div", {
      class: "tournament-info-screen-inner"
    }, texts.map((text) => /* @__PURE__ */ v("p", null, text)), /* @__PURE__ */ v("div", {
      class: "tournament-info-button-container"
    }, buttons.map((buttonData, index) => /* @__PURE__ */ v("button", {
      class: "dialog-button",
      onClick: onButtonClick.bind(null, buttonData.action)
    }, buttonData.label)))));
  }

  // src/client/app/mockstates.js
  var mockstates_default = {
    "tournamentTable2 3 cards": {
      seats: [
        {
          user: "Kalle",
          chips: 100,
          bet: 123,
          actionCount: 0,
          cards: [3, 4]
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
      pots: [123, 456, 789],
      tournamentTableIndex: 2
    },
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
    "5 cards + message": {
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
      communityCards: [1, 2, 3, 4, 5],
      infoText: "Welcome! Please take a seat at the table and let the game begin!"
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
    full: {
      seats: [{
        user: "Kalle",
        chips: 100,
        bet: 1
      }, {
        user: "Olle",
        chips: 200,
        cards: [23, 34],
        bet: 2
      }, {
        user: "Pelle",
        chips: 300,
        cards: [-1, -1],
        potContrib: 55,
        bet: 3
      }, {
        user: "Lisa",
        chips: 400,
        cards: [2, 3],
        bet: 4
      }, {
        user: "User 5",
        chips: 400,
        cards: [2, 3],
        bet: 5
      }, {
        user: "User 6",
        chips: 400,
        cards: [2, 3],
        bet: 6
      }, {
        user: "User 7",
        chips: 400,
        cards: [2, 3],
        bet: 7
      }, {
        user: "User 8",
        chips: 400,
        cards: [2, 3],
        bet: 8
      }, {
        user: "User 9",
        chips: 400,
        cards: [2, 3],
        bet: 9
      }, {
        user: "User 10",
        chips: 400,
        cards: [2, 3],
        bet: 10
      }],
      communityCards: [0, 1, 2, 3, 4],
      dealerIndex: 7,
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
      }, {
        state: "inactive"
      }, {}, {}, {}, {}, {}],
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
    },
    "tournamentTable1 3 cards": {
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
      pots: [123, 456, 789],
      tournamentTableIndex: 1
    },
    "tournamentTable1 5 cards": {
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
      communityCards: [1, 2, 3, 4, 5],
      pots: [123, 456, 789],
      tournamentTableIndex: 1
    },
    "tournament registration": {
      tournamentState: "registration",
      tournamentStartsIn: 72e5,
      tournamentButtons: [{
        action: "joinTournament",
        label: "Join Tournament"
      }],
      tournamentTexts: [
        "Welcome to the turnament",
        "Tournament starts in: %t",
        "Registered players: 123"
      ]
    },
    "tournament finished": {
      tournamentState: "finished",
      tournamentTexts: [
        "Congratulations!!!",
        "1. Olle - BTC 123",
        "2. Kalle - BTC 12",
        "3. Pelle - BTC 1"
      ]
    }
  };

  // src/client/app/mockreplies.mjs
  function getMockReply(state) {
    if (state.tournamentState == "registration" && state.tournamentButtons[0].action == "joinTournament") {
      return {
        action: "joinTournament"
      };
    }
    if (state.tournamentState == "playing" && state.buttons) {
      if (state.sliderMax)
        return {
          action: "raise",
          value: state.sliderMax
        };
      else
        return {
          action: "call"
        };
    }
  }

  // src/utils/useRemoteState.js
  function useRemoteState(url) {
    let [remoteState, setRemoteState] = l3({
      connected: false,
      send: () => {
        console.log("Warning, can't send, not connected!");
      }
    });
    y3(() => {
      if (!url)
        return;
      let webSocket;
      let reconnectTimeout;
      function connect() {
        console.log("connecting to: " + url);
        webSocket = new window.WebSocket(url);
        reconnectTimeout = null;
        function send(message) {
          webSocket.send(JSON.stringify(message));
        }
        function close() {
          setRemoteState({
            connected: false,
            send: () => {
              console.log("Warning, can't send, not connected!");
            }
          });
          if (reconnectTimeout)
            clearTimeout(reconnectTimeout);
          reconnectTimeout = setTimeout(connect, 5e3);
        }
        webSocket.onclose = close;
        webSocket.onerror = close;
        webSocket.onmessage = (ev) => {
          let state = JSON.parse(ev.data);
          state.send = send;
          state.connected = true;
          state.stateTime = performance.now();
          setRemoteState(state);
        };
      }
      connect();
      return () => {
        console.log("closing...");
        if (webSocket) {
          webSocket.onmessage = null;
          webSocket.close();
          webSocket = null;
        }
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
          reconnectTimeout = null;
        }
      };
    }, []);
    return remoteState;
  }

  // src/client/app/TonopahClient.jsx
  function TonopahClient(props) {
    let [stateIndex, setStateIndex] = l3(12);
    let state = useRemoteState(props.serverUrl);
    let selectContent;
    if (props.mock) {
      let onSelectIndexChange = function(index) {
        setStateIndex(index);
      };
      let selectOptions = [];
      for (let mockState in mockstates_default)
        selectOptions.push({key: mockState});
      state = mockstates_default[selectOptions[stateIndex].key];
      state.connected = true;
      state.stateTime = performance.now();
      state.send = (message) => {
        console.log("sending: " + JSON.stringify(message));
      };
      let selectStyle = {
        position: "absolute",
        top: "10px",
        left: "10px"
      };
      selectContent = /* @__PURE__ */ v(ReactUtil_default.Select, {
        onIndexChange: onSelectIndexChange,
        style: selectStyle,
        labelField: "key",
        options: selectOptions,
        selectedIndex: stateIndex
      });
    }
    let loadingStyle = {
      width: "960px",
      height: "720px",
      background: "#ccc"
    };
    let content = /* @__PURE__ */ v("div", {
      style: loadingStyle
    }, "Loading...");
    if (state.connected) {
      if (props.mockReply) {
        let reply = getMockReply(state);
        if (reply) {
          useSetTimeout(() => {
            state.send(reply);
          }, 1e3 + Math.random() * 2e3);
        }
      }
      if (state.tournamentState == "registration" || state.tournamentState == "finished") {
        content = /* @__PURE__ */ v(TournamentInfoView, {
          state
        });
      } else {
        content = /* @__PURE__ */ v(TonopahView, {
          state
        });
      }
    }
    return /* @__PURE__ */ v(p, null, /* @__PURE__ */ v(ContentScaler, {
      width: 960,
      height: 720,
      portraitWidth: 720,
      portraitHeight: 960
    }, content), selectContent);
  }

  // src/client/tonopahclient.jsx
  for (let el of document.getElementsByClassName("tonopah-client")) {
    let client = /* @__PURE__ */ v(TonopahClient, {
      serverUrl: el.dataset.serverUrl,
      mock: el.dataset.mock,
      mockReply: el.dataset.mockReplies
    });
    M(client, el);
  }
})();
