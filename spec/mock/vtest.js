(() => {
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
    var y4, d4, w4, k3, g3, m3, x3, P3 = i4 && i4.__k || e, C3 = P3.length;
    for (s4 == f && (s4 = r3 != null ? r3[0] : C3 ? _(i4, 0) : null), u4.__k = [], y4 = 0; y4 < l4.length; y4++)
      if ((k3 = u4.__k[y4] = (k3 = l4[y4]) == null || typeof k3 == "boolean" ? null : typeof k3 == "string" || typeof k3 == "number" ? h(null, k3, null, null, k3) : Array.isArray(k3) ? h(p, {children: k3}, null, null, null) : k3.__b > 0 ? h(k3.type, k3.props, k3.key, null, k3.__v) : k3) != null) {
        if (k3.__ = u4, k3.__b = u4.__b + 1, (w4 = P3[y4]) === null || w4 && k3.key == w4.key && k3.type === w4.type)
          P3[y4] = void 0;
        else
          for (d4 = 0; d4 < C3; d4++) {
            if ((w4 = P3[d4]) && k3.key == w4.key && k3.type === w4.type) {
              P3[d4] = void 0;
              break;
            }
            w4 = null;
          }
        $(n2, k3, w4 = w4 || f, t3, o4, r3, c4, s4, v3), g3 = k3.__e, (d4 = k3.ref) && w4.ref != d4 && (x3 || (x3 = []), w4.ref && x3.push(w4.ref, null, k3), x3.push(d4, k3.__c || g3, k3)), g3 != null ? (m3 == null && (m3 = g3), typeof k3.type == "function" && k3.__k != null && k3.__k === w4.__k ? k3.__d = s4 = b(k3, s4, n2) : s4 = A(n2, k3, w4, P3, r3, g3, s4), v3 || u4.type !== "option" ? typeof u4.type == "function" && (u4.__d = s4) : n2.value = "") : s4 && w4.__e == s4 && s4.parentNode != n2 && (s4 = _(w4));
      }
    if (u4.__e = m3, r3 != null && typeof u4.type != "function")
      for (y4 = r3.length; y4--; )
        r3[y4] != null && a(r3[y4]);
    for (y4 = C3; y4--; )
      P3[y4] != null && (typeof u4.type == "function" && P3[y4].__e != null && P3[y4].__e == u4.__d && (u4.__d = _(i4, y4 + 1)), I(P3[y4], P3[y4]));
    if (x3)
      for (y4 = 0; y4 < x3.length; y4++)
        H(x3[y4], x3[++y4], x3[++y4]);
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
    var a4, v3, h4, y4, _3, w4, k3, g3, b3, x3, A4, P3 = u4.type;
    if (u4.constructor !== void 0)
      return null;
    i4.__h != null && (c4 = i4.__h, e3 = u4.__e = i4.__e, u4.__h = null, r3 = [e3]), (a4 = n.__b) && a4(u4);
    try {
      n:
        if (typeof P3 == "function") {
          if (g3 = u4.props, b3 = (a4 = P3.contextType) && t3[a4.__c], x3 = a4 ? b3 ? b3.props.value : a4.__ : t3, i4.__c ? k3 = (v3 = u4.__c = i4.__c).__ = v3.__E : ("prototype" in P3 && P3.prototype.render ? u4.__c = v3 = new P3(g3, x3) : (u4.__c = v3 = new d(g3, x3), v3.constructor = P3, v3.render = L), b3 && b3.sub(v3), v3.props = g3, v3.state || (v3.state = {}), v3.context = x3, v3.__n = t3, h4 = v3.__d = true, v3.__h = []), v3.__s == null && (v3.__s = v3.state), P3.getDerivedStateFromProps != null && (v3.__s == v3.state && (v3.__s = s({}, v3.__s)), s(v3.__s, P3.getDerivedStateFromProps(g3, v3.__s))), y4 = v3.props, _3 = v3.state, h4)
            P3.getDerivedStateFromProps == null && v3.componentWillMount != null && v3.componentWillMount(), v3.componentDidMount != null && v3.__h.push(v3.componentDidMount);
          else {
            if (P3.getDerivedStateFromProps == null && g3 !== y4 && v3.componentWillReceiveProps != null && v3.componentWillReceiveProps(g3, x3), !v3.__e && v3.shouldComponentUpdate != null && v3.shouldComponentUpdate(g3, v3.__s, x3) === false || u4.__v === i4.__v) {
              v3.props = g3, v3.state = v3.__s, u4.__v !== i4.__v && (v3.__d = false), v3.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, v3.__h.length && f4.push(v3);
              break n;
            }
            v3.componentWillUpdate != null && v3.componentWillUpdate(g3, v3.__s, x3), v3.componentDidUpdate != null && v3.__h.push(function() {
              v3.componentDidUpdate(y4, _3, w4);
            });
          }
          v3.context = x3, v3.props = g3, v3.state = v3.__s, (a4 = n.__r) && a4(u4), v3.__d = false, v3.__v = u4, v3.__P = l4, a4 = v3.render(v3.props, v3.state, v3.context), v3.state = v3.__s, v3.getChildContext != null && (t3 = s(s({}, t3), v3.getChildContext())), h4 || v3.getSnapshotBeforeUpdate == null || (w4 = v3.getSnapshotBeforeUpdate(y4, _3)), A4 = a4 != null && a4.type === p && a4.key == null ? a4.props.children : a4, m(l4, Array.isArray(A4) ? A4 : [A4], u4, i4, t3, o4, r3, f4, e3, c4), v3.base = u4.__e, u4.__h = null, v3.__h.length && f4.push(v3), k3 && (v3.__E = v3.__ = null), v3.__e = false;
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
  function y(n2) {
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
        throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports" + y(n2) + "\n\n" + f2(n2));
      if (r4 != null && typeof r4 == "object") {
        if (r4.__k !== void 0 && r4.__e !== void 0)
          throw new Error("Invalid type passed to createElement(): " + r4 + "\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My" + a2(n2) + " = " + y(r4) + ";\n  let vnode = <My" + a2(n2) + " />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n" + f2(n2));
        throw new Error("Invalid type passed to createElement(): " + (Array.isArray(r4) ? "array" : r4));
      }
      if (r4 !== "thead" && r4 !== "tfoot" && r4 !== "tbody" || i4.type === "table" ? r4 === "tr" && i4.type !== "thead" && i4.type !== "tfoot" && i4.type !== "tbody" && i4.type !== "table" ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent." + y(n2) + "\n\n" + f2(n2)) : r4 === "td" && i4.type !== "tr" ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + y(n2) + "\n\n" + f2(n2)) : r4 === "th" && i4.type !== "tr" && console.error("Improper nesting of table. Your <th> should have a <tr>." + y(n2) + "\n\n" + f2(n2)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + y(n2) + "\n\n" + f2(n2)), n2.ref !== void 0 && typeof n2.ref != "function" && typeof n2.ref != "object" && !("$$typeof" in n2))
        throw new Error(`Component's "ref" property should be a function, or an object created by createRef(), but got [` + typeof n2.ref + "] instead\n" + y(n2) + "\n\n" + f2(n2));
      if (typeof n2.type == "string") {
        for (var s4 in n2.props)
          if (s4[0] === "o" && s4[1] === "n" && typeof n2.props[s4] != "function" && n2.props[s4] != null)
            throw new Error(`Component's "` + s4 + '" property should be a function, but got [' + typeof n2.props[s4] + "] instead\n" + y(n2) + "\n\n" + f2(n2));
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
    }, w4 = {nodeName: b3("nodeName", "use vnode.type"), attributes: b3("attributes", "use vnode.props"), children: b3("children", "use vnode.props.children")}, g3 = Object.create({}, w4);
    n.vnode = function(n2) {
      var t4 = n2.props;
      if (n2.type !== null && t4 != null && ("__source" in t4 || "__self" in t4)) {
        var e4 = n2.props = {};
        for (var o4 in t4) {
          var r4 = t4[o4];
          o4 === "__source" ? n2.__source = r4 : o4 === "__self" ? n2.__self = r4 : e4[o4] = r4;
        }
      }
      n2.__proto__ = g3, c4 && c4(n2);
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
              console.error('Following component has two or more children with the same key attribute: "' + i4 + '". This may cause glitches and misbehavior in rendering process. Component: \n\n' + y(n2) + "\n\n" + f2(n2));
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
  function y2(r3, o4) {
    var i4 = m2(t2++, 3);
    !n.__s && k2(i4.__H, o4) && (i4.__ = r3, i4.__H = o4, u3.__H.__h.push(i4));
  }
  function s3(n2) {
    return o3 = 5, d3(function() {
      return {current: n2};
    }, []);
  }
  function d3(n2, u4) {
    var r3 = m2(t2++, 7);
    return k2(r3.__H, u4) && (r3.__ = n2(), r3.__H = u4, r3.__h = n2), r3.__;
  }
  function F(n2) {
    var r3 = u3.context[n2.__c], o4 = m2(t2++, 9);
    return o4.__c = n2, r3 ? (o4.__ == null && (o4.__ = true, r3.sub(u3)), r3.props.value) : n2.__;
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
  (E2.prototype = new d()).isPureReactComponent = true, E2.prototype.shouldComponentUpdate = function(n2, t3) {
    return S2(this.props, n2) || S2(this.state, t3);
  };
  var w3 = n.__b;
  n.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), w3 && w3(n2);
  };
  var R = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  var A3 = n.__e;
  function O2() {
    this.__u = 0, this.t = null, this.__b = null;
  }
  function L2(n2) {
    var t3 = n2.__.__c;
    return t3 && t3.__e && t3.__e(n2);
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
  var on = typeof performance == "object" && typeof performance.now == "function" ? performance.now.bind(performance) : function() {
    return Date.now();
  };

  // src/utils/ContentScaler.jsx
  function ContentScaler(props) {
    const [windowSize, setWindowSize] = l3({width: 0, height: 0});
    let ref = s3();
    y2(() => {
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

  // spec/client/ContentScalerTest.jsx
  function MyContent(props) {
    let orientation = F(ContentScaler.OrientationContext);
    console.log("rendeing content: " + orientation);
    return /* @__PURE__ */ v("div", {
      class: "mycontent"
    }, "hello: ", orientation);
  }
  function ContentScalerTest(props) {
    let content = /* @__PURE__ */ v(MyContent, null);
    return /* @__PURE__ */ v(ContentScaler, {
      width: "640",
      height: "480",
      portraitWidth: "480",
      portraitHeight: "640"
    }, content);
  }

  // spec/client/vtest.jsx
  for (let el of document.getElementsByClassName("content-scaler-test")) {
    M(/* @__PURE__ */ v(ContentScalerTest, null), el);
  }
})();
