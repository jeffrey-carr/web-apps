const Ct = "5";
var ft;
typeof window < "u" && ((ft = window.__svelte ?? (window.__svelte = {})).v ?? (ft.v = /* @__PURE__ */ new Set())).add(Ct);
const kt = 2, Q = !1;
var bt = Array.prototype.indexOf;
const st = () => {
}, x = 2, At = 4, at = 8, it = 16, b = 32, U = 64, I = 128, w = 256, O = 512, m = 1024, k = 2048, A = 4096, ot = 8192, L = 16384, Dt = 32768, yt = 65536, Rt = 1 << 19, _t = 1 << 20, H = 1 << 21;
function St() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
let It = !1;
var Ot, Mt, qt;
// @__NO_SIDE_EFFECTS__
function vt(t) {
  return Mt.call(t);
}
// @__NO_SIDE_EFFECTS__
function Bt(t) {
  return qt.call(t);
}
function X(t, n) {
  return /* @__PURE__ */ vt(t);
}
function Ut(t) {
  return t === this.v;
}
// @__NO_SIDE_EFFECTS__
function ct(t) {
  var n = x | k, r = o !== null && (o.f & x) !== 0 ? (
    /** @type {Derived} */
    o
  ) : null;
  return h === null || r !== null && (r.f & w) !== 0 ? n |= w : h.f |= _t, {
    ctx: y,
    deps: null,
    effects: null,
    equals: Ut,
    f: n,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: r ?? h
  };
}
// @__NO_SIDE_EFFECTS__
function Z(t) {
  const n = /* @__PURE__ */ ct(t);
  return Kt(n), n;
}
function pt(t) {
  var n = t.effects;
  if (n !== null) {
    t.effects = null;
    for (var r = 0; r < n.length; r += 1)
      D(
        /** @type {Effect} */
        n[r]
      );
  }
}
function Lt(t) {
  for (var n = t.parent; n !== null; ) {
    if ((n.f & x) === 0)
      return (
        /** @type {Effect} */
        n
      );
    n = n.parent;
  }
  return null;
}
function Pt(t) {
  var n, r = h;
  nt(Lt(t));
  try {
    pt(t), n = Ft(t);
  } finally {
    nt(r);
  }
  return n;
}
function ht(t) {
  var n = Pt(t), r = (g || (t.f & w) !== 0) && t.deps !== null ? A : m;
  F(t, r), t.equals(n) || (t.v = n, t.wv = Wt());
}
function Yt(t, n) {
  var r = n.last;
  r === null ? n.last = n.first = t : (r.next = t, t.prev = r, n.last = t);
}
function Et(t, n, r, l = !0) {
  var e = h, u = {
    ctx: y,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | k,
    first: null,
    fn: n,
    last: null,
    next: null,
    parent: e,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  try {
    G(u), u.f |= Dt;
  } catch (a) {
    throw D(u), a;
  }
  var s = u.deps === null && u.first === null && u.nodes_start === null && u.teardown === null && (u.f & (_t | I)) === 0;
  if (!s && l && (e !== null && Yt(u, e), o !== null && (o.f & x) !== 0)) {
    var f = (
      /** @type {Derived} */
      o
    );
    (f.effects ?? (f.effects = [])).push(u);
  }
  return u;
}
function zt(t, n = [], r = ct) {
  const l = n.map(r);
  return wt(() => t(...l.map(j)));
}
function wt(t, n = 0) {
  return Et(at | it | n, t);
}
function Ht(t, n = !0) {
  return Et(at | b, t, !0, n);
}
function dt(t) {
  var n = t.teardown;
  if (n !== null) {
    const r = W, l = o;
    $(!0), tt(null);
    try {
      n.call(null);
    } finally {
      $(r), tt(l);
    }
  }
}
function gt(t, n = !1) {
  var r = t.first;
  for (t.first = t.last = null; r !== null; ) {
    var l = r.next;
    (r.f & U) !== 0 ? r.parent = null : D(r, n), r = l;
  }
}
function Vt(t) {
  for (var n = t.first; n !== null; ) {
    var r = n.next;
    (n.f & b) === 0 && D(n), n = r;
  }
}
function D(t, n = !0) {
  var r = !1;
  (n || (t.f & Rt) !== 0) && t.nodes_start !== null && (jt(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end
  ), r = !0), gt(t, n && !r), B(t, 0), F(t, L);
  var l = t.transitions;
  if (l !== null)
    for (const u of l)
      u.stop();
  dt(t);
  var e = t.parent;
  e !== null && e.first !== null && xt(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = null;
}
function jt(t, n) {
  for (; t !== null; ) {
    var r = t === n ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Bt(t)
    );
    t.remove(), t = r;
  }
}
function xt(t) {
  var n = t.parent, r = t.prev, l = t.next;
  r !== null && (r.next = l), l !== null && (l.prev = r), n !== null && (n.first === t && (n.first = l), n.last === t && (n.last = r));
}
let R = !1, V = !1, M = null, T = !1, W = !1;
function $(t) {
  W = t;
}
let S = [];
let o = null, C = !1;
function tt(t) {
  o = t;
}
let h = null;
function nt(t) {
  h = t;
}
let E = null;
function Kt(t) {
  o !== null && o.f & H && (E === null ? E = [t] : E.push(t));
}
let _ = null, p = 0, d = null, mt = 1, q = 0, g = !1;
function Wt() {
  return ++mt;
}
function P(t) {
  var i;
  var n = t.f;
  if ((n & k) !== 0)
    return !0;
  if ((n & A) !== 0) {
    var r = t.deps, l = (n & w) !== 0;
    if (r !== null) {
      var e, u, s = (n & O) !== 0, f = l && h !== null && !g, a = r.length;
      if (s || f) {
        var v = (
          /** @type {Derived} */
          t
        ), N = v.parent;
        for (e = 0; e < a; e++)
          u = r[e], (s || !((i = u == null ? void 0 : u.reactions) != null && i.includes(v))) && (u.reactions ?? (u.reactions = [])).push(v);
        s && (v.f ^= O), f && N !== null && (N.f & w) === 0 && (v.f ^= w);
      }
      for (e = 0; e < a; e++)
        if (u = r[e], P(
          /** @type {Derived} */
          u
        ) && ht(
          /** @type {Derived} */
          u
        ), u.wv > t.wv)
          return !0;
    }
    (!l || h !== null && !g) && F(t, m);
  }
  return !1;
}
function Gt(t, n) {
  for (var r = n; r !== null; ) {
    if ((r.f & I) !== 0)
      try {
        r.fn(t);
        return;
      } catch {
        r.f ^= I;
      }
    r = r.parent;
  }
  throw R = !1, t;
}
function rt(t) {
  return (t.f & L) === 0 && (t.parent === null || (t.parent.f & I) === 0);
}
function Y(t, n, r, l) {
  if (R) {
    if (r === null && (R = !1), rt(n))
      throw t;
    return;
  }
  if (r !== null && (R = !0), Gt(t, n), rt(n))
    throw t;
}
function Tt(t, n, r = !0) {
  var l = t.reactions;
  if (l !== null)
    for (var e = 0; e < l.length; e++) {
      var u = l[e];
      E != null && E.includes(t) || ((u.f & x) !== 0 ? Tt(
        /** @type {Derived} */
        u,
        n,
        !1
      ) : n === u && (r ? F(u, k) : (u.f & m) !== 0 && F(u, A), $t(
        /** @type {Effect} */
        u
      )));
    }
}
function Ft(t) {
  var J;
  var n = _, r = p, l = d, e = o, u = g, s = E, f = y, a = C, v = t.f;
  _ = /** @type {null | Value[]} */
  null, p = 0, d = null, g = (v & w) !== 0 && (C || !T || o === null), o = (v & (b | U)) === 0 ? t : null, E = null, lt(t.ctx), C = !1, q++, t.f |= H;
  try {
    var N = (
      /** @type {Function} */
      (0, t.fn)()
    ), i = t.deps;
    if (_ !== null) {
      var c;
      if (B(t, p), i !== null && p > 0)
        for (i.length = p + _.length, c = 0; c < _.length; c++)
          i[p + c] = _[c];
      else
        t.deps = i = _;
      if (!g)
        for (c = p; c < i.length; c++)
          ((J = i[c]).reactions ?? (J.reactions = [])).push(t);
    } else i !== null && p < i.length && (B(t, p), i.length = p);
    if (rn() && d !== null && !C && i !== null && (t.f & (x | A | k)) === 0)
      for (c = 0; c < /** @type {Source[]} */
      d.length; c++)
        Tt(
          d[c],
          /** @type {Effect} */
          t
        );
    return e !== null && e !== t && (q++, d !== null && (l === null ? l = d : l.push(.../** @type {Source[]} */
    d))), N;
  } finally {
    _ = n, p = r, d = l, o = e, g = u, E = s, lt(f), C = a, t.f ^= H;
  }
}
function Jt(t, n) {
  let r = n.reactions;
  if (r !== null) {
    var l = bt.call(r, t);
    if (l !== -1) {
      var e = r.length - 1;
      e === 0 ? r = n.reactions = null : (r[l] = r[e], r.pop());
    }
  }
  r === null && (n.f & x) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (_ === null || !_.includes(n)) && (F(n, A), (n.f & (w | O)) === 0 && (n.f ^= O), pt(
    /** @type {Derived} **/
    n
  ), B(
    /** @type {Derived} **/
    n,
    0
  ));
}
function B(t, n) {
  var r = t.deps;
  if (r !== null)
    for (var l = n; l < r.length; l++)
      Jt(t, r[l]);
}
function G(t) {
  var n = t.f;
  if ((n & L) === 0) {
    F(t, m);
    var r = h, l = y, e = T;
    h = t, T = !0;
    try {
      (n & it) !== 0 ? Vt(t) : gt(t), dt(t);
      var u = Ft(t);
      t.teardown = typeof u == "function" ? u : null, t.wv = mt;
      var s = t.deps, f;
      Q && It && t.f & k;
    } catch (a) {
      Y(a, t, r, l || t.ctx);
    } finally {
      T = e, h = r;
    }
  }
}
function Qt() {
  try {
    St();
  } catch (t) {
    if (M !== null)
      Y(t, M, null);
    else
      throw t;
  }
}
function Xt() {
  var t = T;
  try {
    var n = 0;
    for (T = !0; S.length > 0; ) {
      n++ > 1e3 && Qt();
      var r = S, l = r.length;
      S = [];
      for (var e = 0; e < l; e++) {
        var u = tn(r[e]);
        Zt(u);
      }
      K.clear();
    }
  } finally {
    V = !1, T = t, M = null;
  }
}
function Zt(t) {
  var n = t.length;
  if (n !== 0)
    for (var r = 0; r < n; r++) {
      var l = t[r];
      if ((l.f & (L | ot)) === 0)
        try {
          P(l) && (G(l), l.deps === null && l.first === null && l.nodes_start === null && (l.teardown === null ? xt(l) : l.fn = null));
        } catch (e) {
          Y(e, l, null, l.ctx);
        }
    }
}
function $t(t) {
  V || (V = !0, queueMicrotask(Xt));
  for (var n = M = t; n.parent !== null; ) {
    n = n.parent;
    var r = n.f;
    if ((r & (U | b)) !== 0) {
      if ((r & m) === 0) return;
      n.f ^= m;
    }
  }
  S.push(n);
}
function tn(t) {
  for (var n = [], r = t; r !== null; ) {
    var l = r.f, e = (l & (b | U)) !== 0, u = e && (l & m) !== 0;
    if (!u && (l & ot) === 0) {
      if ((l & At) !== 0)
        n.push(r);
      else if (e)
        r.f ^= m;
      else
        try {
          P(r) && G(r);
        } catch (a) {
          Y(a, r, null, r.ctx);
        }
      var s = r.first;
      if (s !== null) {
        r = s;
        continue;
      }
    }
    var f = r.parent;
    for (r = r.next; r === null && f !== null; )
      r = f.next, f = f.parent;
  }
  return n;
}
function j(t) {
  var n = t.f, r = (n & x) !== 0;
  if (o !== null && !C) {
    if (!(E != null && E.includes(t))) {
      var l = o.deps;
      t.rv < q && (t.rv = q, _ === null && l !== null && l[p] === t ? p++ : _ === null ? _ = [t] : (!g || !_.includes(t)) && _.push(t));
    }
  } else if (r && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var e = (
      /** @type {Derived} */
      t
    ), u = e.parent;
    u !== null && (u.f & w) === 0 && (e.f ^= w);
  }
  return r && (e = /** @type {Derived} */
  t, P(e) && ht(e)), W && K.has(t) ? K.get(t) : t.v;
}
const nn = -7169;
function F(t, n) {
  t.f = t.f & nn | n;
}
const K = /* @__PURE__ */ new Map();
let y = null;
function lt(t) {
  y = t;
}
function rn() {
  return !0;
}
const ln = /* @__PURE__ */ new Set(), en = /* @__PURE__ */ new Set();
function un(t) {
  for (var n = 0; n < t.length; n++)
    ln.add(t[n]);
  for (var r of en)
    r(t);
}
function fn(t) {
  var n = document.createElement("template");
  return n.innerHTML = t, n.content;
}
function sn(t, n) {
  var r = (
    /** @type {Effect} */
    h
  );
  r.nodes_start === null && (r.nodes_start = t, r.nodes_end = n);
}
// @__NO_SIDE_EFFECTS__
function an(t, n) {
  var r = (n & kt) !== 0, l, e = !t.startsWith("<!>");
  return () => {
    l === void 0 && (l = fn(e ? t : "<!>" + t), l = /** @type {Node} */
    /* @__PURE__ */ vt(l));
    var u = (
      /** @type {TemplateNode} */
      r || Ot ? document.importNode(l, !0) : l.cloneNode(!0)
    );
    return sn(u, u), u;
  };
}
function on(t, n) {
  t !== null && t.before(
    /** @type {Node} */
    n
  );
}
function _n(t, n, ...r) {
  var l = t, e = st, u;
  wt(() => {
    e !== (e = n()) && (u && (D(u), u = null), u = Ht(() => (
      /** @type {SnippetFn} */
      e(l, ...r)
    )));
  }, yt);
}
function Nt(t) {
  var n, r, l = "";
  if (typeof t == "string" || typeof t == "number") l += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var e = t.length;
    for (n = 0; n < e; n++) t[n] && (r = Nt(t[n])) && (l && (l += " "), l += r);
  } else for (r in t) t[r] && (l && (l += " "), l += r);
  return l;
}
function vn() {
  for (var t, n, r = 0, l = "", e = arguments.length; r < e; r++) (t = arguments[r]) && (n = Nt(t)) && (l && (l += " "), l += n);
  return l;
}
function et(t) {
  return typeof t == "object" ? vn(t) : t ?? "";
}
function cn(t, n, r) {
  var l = t == null ? "" : "" + t;
  return l = l ? l + " " + n : n, l === "" ? null : l;
}
function ut(t, n, r, l, e, u) {
  var s = t.__className;
  if (s !== r || s === void 0) {
    var f = cn(r, l);
    f == null ? t.removeAttribute("class") : t.className = f, t.__className = r;
  }
  return u;
}
function z(t, n, r, l) {
  var e;
  e = /** @type {V} */
  t[n];
  var u = (
    /** @type {V} */
    l
  ), s = !0, f = () => (s && (s = !1, u = /** @type {V} */
  l), u);
  e === void 0 && l !== void 0 && (e = f());
  var a;
  return a = () => {
    var v = (
      /** @type {V} */
      t[n]
    );
    return v === void 0 ? f() : (s = !0, v);
  }, a;
}
var pn = /* @__PURE__ */ an('<div><button><!></button> <div class="background-droplet"></div></div>');
function hn(t, n) {
  let r = z(n, "type", 3, "primary"), l = z(n, "size", 3, "fill"), e = z(n, "shape", 3, "rectangular"), u = /* @__PURE__ */ Z(() => `container ${l()} ${r()}`), s = /* @__PURE__ */ Z(() => `button ${r()} ${e()}`);
  var f = pn(), a = X(f);
  a.__click = function(...N) {
    var i;
    (i = n.onclick) == null || i.apply(this, N);
  };
  var v = X(a);
  _n(v, () => n.children ?? st), zt(() => {
    ut(f, 1, et(j(u)), "svelte-1n761iz"), ut(a, 1, et(j(s)), "svelte-1n761iz");
  }), on(t, f);
}
un(["click"]);
const En = () => "pong!";
export {
  hn as Button,
  En as ping
};
