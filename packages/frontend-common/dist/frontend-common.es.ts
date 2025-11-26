var zn = Object.defineProperty;
var Fn = (e, t, n) => t in e ? zn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var $ = (e, t, n) => Fn(e, typeof t != "symbol" ? t + "" : t, n);
import { onDestroy as Qt } from "svelte";
const Hn = "5";
var Jt;
typeof window < "u" && ((Jt = window.__svelte ?? (window.__svelte = {})).v ?? (Jt.v = /* @__PURE__ */ new Set())).add(Hn);
const At = 1, Tt = 2, $t = 4, jn = 8, Vn = 16, Gn = 1, Wn = 2, Bn = 4, Yn = 8, Kn = 16, en = 1, Xn = 2, q = Symbol(), Zn = "http://www.w3.org/1999/xhtml", zt = !1;
var Pt = Array.isArray, Jn = Array.prototype.indexOf, tn = Array.from, Qn = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, $n = Object.getOwnPropertyDescriptors, er = Object.prototype, tr = Array.prototype, nn = Object.getPrototypeOf;
const Ke = () => {
};
function nr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
const Y = 2, rn = 4, Xe = 8, St = 16, ne = 32, Te = 64, Ue = 128, j = 256, xe = 512, F = 1024, J = 2048, fe = 4096, te = 8192, Ze = 16384, rr = 32768, Je = 65536, ir = 1 << 17, ar = 1 << 19, an = 1 << 20, vt = 1 << 21, me = Symbol("$state"), lr = Symbol("legacy props"), ur = Symbol("");
function or(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function sr() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function fr(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function cr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function vr(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function dr() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function hr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function _r() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let gr = !1, Pe = !1, br = !1;
function mr() {
  Pe = !0;
}
function oe(e) {
  if (typeof e != "object" || e === null || me in e)
    return e;
  const t = nn(e);
  if (t !== er && t !== tr)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Pt(e), a = /* @__PURE__ */ L(0), i = S, l = (o) => {
    var u = S;
    Q(i);
    var s = o();
    return Q(u), s;
  };
  return r && n.set("length", /* @__PURE__ */ L(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(o, u, s) {
        (!("value" in s) || s.configurable === !1 || s.enumerable === !1 || s.writable === !1) && dr();
        var f = n.get(u);
        return f === void 0 ? (f = l(() => /* @__PURE__ */ L(s.value)), n.set(u, f)) : N(
          f,
          l(() => oe(s.value))
        ), !0;
      },
      deleteProperty(o, u) {
        var s = n.get(u);
        if (s === void 0)
          u in o && (n.set(
            u,
            l(() => /* @__PURE__ */ L(q))
          ), lt(a));
        else {
          if (r && typeof u == "string") {
            var f = (
              /** @type {Source<number>} */
              n.get("length")
            ), v = Number(u);
            Number.isInteger(v) && v < f.v && N(f, v);
          }
          N(s, q), lt(a);
        }
        return !0;
      },
      get(o, u, s) {
        var d;
        if (u === me)
          return e;
        var f = n.get(u), v = u in o;
        if (f === void 0 && (!v || (d = Ne(o, u)) != null && d.writable) && (f = l(() => /* @__PURE__ */ L(oe(v ? o[u] : q))), n.set(u, f)), f !== void 0) {
          var c = w(f);
          return c === q ? void 0 : c;
        }
        return Reflect.get(o, u, s);
      },
      getOwnPropertyDescriptor(o, u) {
        var s = Reflect.getOwnPropertyDescriptor(o, u);
        if (s && "value" in s) {
          var f = n.get(u);
          f && (s.value = w(f));
        } else if (s === void 0) {
          var v = n.get(u), c = v == null ? void 0 : v.v;
          if (v !== void 0 && c !== q)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return s;
      },
      has(o, u) {
        var c;
        if (u === me)
          return !0;
        var s = n.get(u), f = s !== void 0 && s.v !== q || Reflect.has(o, u);
        if (s !== void 0 || I !== null && (!f || (c = Ne(o, u)) != null && c.writable)) {
          s === void 0 && (s = l(() => /* @__PURE__ */ L(f ? oe(o[u]) : q)), n.set(u, s));
          var v = w(s);
          if (v === q)
            return !1;
        }
        return f;
      },
      set(o, u, s, f) {
        var _;
        var v = n.get(u), c = u in o;
        if (r && u === "length")
          for (var d = s; d < /** @type {Source<number>} */
          v.v; d += 1) {
            var h = n.get(d + "");
            h !== void 0 ? N(h, q) : d in o && (h = l(() => /* @__PURE__ */ L(q)), n.set(d + "", h));
          }
        v === void 0 ? (!c || (_ = Ne(o, u)) != null && _.writable) && (v = l(() => /* @__PURE__ */ L(void 0)), N(
          v,
          l(() => oe(s))
        ), n.set(u, v)) : (c = v.v !== q, N(
          v,
          l(() => oe(s))
        ));
        var y = Reflect.getOwnPropertyDescriptor(o, u);
        if (y != null && y.set && y.set.call(f, s), !c) {
          if (r && typeof u == "string") {
            var p = (
              /** @type {Source<number>} */
              n.get("length")
            ), g = Number(u);
            Number.isInteger(g) && g >= p.v && N(p, g + 1);
          }
          lt(a);
        }
        return !0;
      },
      ownKeys(o) {
        w(a);
        var u = Reflect.ownKeys(o).filter((v) => {
          var c = n.get(v);
          return c === void 0 || c.v !== q;
        });
        for (var [s, f] of n)
          f.v !== q && !(s in o) && u.push(s);
        return u;
      },
      setPrototypeOf() {
        hr();
      }
    }
  );
}
function lt(e, t = 1) {
  N(e, e.v + t);
}
var pr, wr, yr;
function It(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function ee(e) {
  return wr.call(e);
}
// @__NO_SIDE_EFFECTS__
function Qe(e) {
  return yr.call(e);
}
function P(e, t) {
  return /* @__PURE__ */ ee(e);
}
function ln(e, t) {
  {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ ee(
        /** @type {Node} */
        e
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Qe(n) : n;
  }
}
function G(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Qe(r);
  return r;
}
function Er(e) {
  e.textContent = "";
}
function un(e) {
  return e === this.v;
}
function Ar(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Ct(e) {
  return !Ar(e, this.v);
}
// @__NO_SIDE_EFFECTS__
function pe(e) {
  var t = Y | J, n = S !== null && (S.f & Y) !== 0 ? (
    /** @type {Derived} */
    S
  ) : null;
  return I === null || n !== null && (n.f & j) !== 0 ? t |= j : I.f |= an, {
    ctx: D,
    deps: null,
    effects: null,
    equals: un,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: n ?? I
  };
}
// @__NO_SIDE_EFFECTS__
function W(e) {
  const t = /* @__PURE__ */ pe(e);
  return mn(t), t;
}
// @__NO_SIDE_EFFECTS__
function on(e) {
  const t = /* @__PURE__ */ pe(e);
  return t.equals = Ct, t;
}
function sn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      ce(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Tr(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & Y) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function fn(e) {
  var t, n = I;
  ue(Tr(e));
  try {
    sn(e), t = En(e);
  } finally {
    ue(n);
  }
  return t;
}
function cn(e) {
  var t = fn(e), n = (le || (e.f & j) !== 0) && e.deps !== null ? fe : F;
  K(e, n), e.equals(t) || (e.v = t, e.wv = wn());
}
function Pr(e) {
  I === null && S === null && fr(), S !== null && (S.f & j) !== 0 && I === null && sr(), Ie && or();
}
function Sr(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Se(e, t, n, r = !0) {
  var a = I, i = {
    ctx: D,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | J,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: a,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (n)
    try {
      Mt(i), i.f |= rr;
    } catch (u) {
      throw ce(i), u;
    }
  else t !== null && nt(i);
  var l = n && i.deps === null && i.first === null && i.nodes_start === null && i.teardown === null && (i.f & (an | Ue)) === 0;
  if (!l && r && (a !== null && Sr(i, a), S !== null && (S.f & Y) !== 0)) {
    var o = (
      /** @type {Derived} */
      S
    );
    (o.effects ?? (o.effects = [])).push(i);
  }
  return i;
}
function Ir(e) {
  const t = Se(Xe, null, !1);
  return K(t, F), t.teardown = e, t;
}
function Rt(e) {
  Pr();
  var t = I !== null && (I.f & ne) !== 0 && D !== null && !D.m;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      D
    );
    (n.e ?? (n.e = [])).push({
      fn: e,
      effect: I,
      reaction: S
    });
  } else {
    var r = kt(e);
    return r;
  }
}
function kt(e) {
  return Se(rn, e, !1);
}
function vn(e) {
  return Se(Xe, e, !0);
}
function U(e, t = [], n = pe) {
  const r = t.map(n);
  return $e(() => e(...r.map(w)));
}
function $e(e, t = 0) {
  return Se(Xe | St | t, e, !0);
}
function we(e, t = !0) {
  return Se(Xe | ne, e, !0, t);
}
function dn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Ie, r = S;
    Ft(!0), Q(null);
    try {
      t.call(null);
    } finally {
      Ft(n), Q(r);
    }
  }
}
function hn(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    var r = n.next;
    (n.f & Te) !== 0 ? n.parent = null : ce(n, t), n = r;
  }
}
function Cr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & ne) === 0 && ce(t), t = n;
  }
}
function ce(e, t = !0) {
  var n = !1;
  (t || (e.f & ar) !== 0) && e.nodes_start !== null && (Rr(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), n = !0), hn(e, t && !n), je(e, 0), K(e, Ze);
  var r = e.transitions;
  if (r !== null)
    for (const i of r)
      i.stop();
  dn(e);
  var a = e.parent;
  a !== null && a.first !== null && _n(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = null;
}
function Rr(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Qe(e)
    );
    e.remove(), e = n;
  }
}
function _n(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function dt(e, t) {
  var n = [];
  Dt(e, n, !0), gn(n, () => {
    ce(e), t && t();
  });
}
function gn(e, t) {
  var n = e.length;
  if (n > 0) {
    var r = () => --n || t();
    for (var a of e)
      a.out(r);
  } else
    t();
}
function Dt(e, t, n) {
  if ((e.f & te) === 0) {
    if (e.f ^= te, e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || n) && t.push(l);
    for (var r = e.first; r !== null; ) {
      var a = r.next, i = (r.f & Je) !== 0 || (r.f & ne) !== 0;
      Dt(r, t, i ? n : !1), r = a;
    }
  }
}
function qe(e) {
  bn(e, !0);
}
function bn(e, t) {
  if ((e.f & te) !== 0) {
    e.f ^= te, (e.f & F) === 0 && (e.f ^= F), Ce(e) && (K(e, J), nt(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, a = (n.f & Je) !== 0 || (n.f & ne) !== 0;
      bn(n, a ? t : !1), n = r;
    }
    if (e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || t) && i.in();
  }
}
let ze = [];
function kr() {
  var e = ze;
  ze = [], nr(e);
}
function et(e) {
  ze.length === 0 && queueMicrotask(kr), ze.push(e);
}
let Oe = !1, ht = !1, Fe = null, se = !1, Ie = !1;
function Ft(e) {
  Ie = e;
}
let Le = [];
let S = null, X = !1;
function Q(e) {
  S = e;
}
let I = null;
function ue(e) {
  I = e;
}
let x = null;
function mn(e) {
  S !== null && S.f & vt && (x === null ? x = [e] : x.push(e));
}
let O = null, H = 0, V = null;
function Dr(e) {
  V = e;
}
let pn = 1, He = 0, le = !1;
function wn() {
  return ++pn;
}
function Ce(e) {
  var v;
  var t = e.f;
  if ((t & J) !== 0)
    return !0;
  if ((t & fe) !== 0) {
    var n = e.deps, r = (t & j) !== 0;
    if (n !== null) {
      var a, i, l = (t & xe) !== 0, o = r && I !== null && !le, u = n.length;
      if (l || o) {
        var s = (
          /** @type {Derived} */
          e
        ), f = s.parent;
        for (a = 0; a < u; a++)
          i = n[a], (l || !((v = i == null ? void 0 : i.reactions) != null && v.includes(s))) && (i.reactions ?? (i.reactions = [])).push(s);
        l && (s.f ^= xe), o && f !== null && (f.f & j) === 0 && (s.f ^= j);
      }
      for (a = 0; a < u; a++)
        if (i = n[a], Ce(
          /** @type {Derived} */
          i
        ) && cn(
          /** @type {Derived} */
          i
        ), i.wv > e.wv)
          return !0;
    }
    (!r || I !== null && !le) && K(e, F);
  }
  return !1;
}
function Mr(e, t) {
  for (var n = t; n !== null; ) {
    if ((n.f & Ue) !== 0)
      try {
        n.fn(e);
        return;
      } catch {
        n.f ^= Ue;
      }
    n = n.parent;
  }
  throw Oe = !1, e;
}
function Ht(e) {
  return (e.f & Ze) === 0 && (e.parent === null || (e.parent.f & Ue) === 0);
}
function tt(e, t, n, r) {
  if (Oe) {
    if (n === null && (Oe = !1), Ht(t))
      throw e;
    return;
  }
  if (n !== null && (Oe = !0), Mr(e, t), Ht(t))
    throw e;
}
function yn(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null)
    for (var a = 0; a < r.length; a++) {
      var i = r[a];
      x != null && x.includes(e) || ((i.f & Y) !== 0 ? yn(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? K(i, J) : (i.f & F) !== 0 && K(i, fe), nt(
        /** @type {Effect} */
        i
      )));
    }
}
function En(e) {
  var d;
  var t = O, n = H, r = V, a = S, i = le, l = x, o = D, u = X, s = e.f;
  O = /** @type {null | Value[]} */
  null, H = 0, V = null, le = (s & j) !== 0 && (X || !se || S === null), S = (s & (ne | Te)) === 0 ? e : null, x = null, jt(e.ctx), X = !1, He++, e.f |= vt;
  try {
    var f = (
      /** @type {Function} */
      (0, e.fn)()
    ), v = e.deps;
    if (O !== null) {
      var c;
      if (je(e, H), v !== null && H > 0)
        for (v.length = H + O.length, c = 0; c < O.length; c++)
          v[H + c] = O[c];
      else
        e.deps = v = O;
      if (!le)
        for (c = H; c < v.length; c++)
          ((d = v[c]).reactions ?? (d.reactions = [])).push(e);
    } else v !== null && H < v.length && (je(e, H), v.length = H);
    if (Re() && V !== null && !X && v !== null && (e.f & (Y | fe | J)) === 0)
      for (c = 0; c < /** @type {Source[]} */
      V.length; c++)
        yn(
          V[c],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (He++, V !== null && (r === null ? r = V : r.push(.../** @type {Source[]} */
    V))), f;
  } finally {
    O = t, H = n, V = r, S = a, le = i, x = l, jt(o), X = u, e.f ^= vt;
  }
}
function Nr(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Jn.call(n, e);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = t.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  n === null && (t.f & Y) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (O === null || !O.includes(t)) && (K(t, fe), (t.f & (j | xe)) === 0 && (t.f ^= xe), sn(
    /** @type {Derived} **/
    t
  ), je(
    /** @type {Derived} **/
    t,
    0
  ));
}
function je(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Nr(e, n[r]);
}
function Mt(e) {
  var t = e.f;
  if ((t & Ze) === 0) {
    K(e, F);
    var n = I, r = D, a = se;
    I = e, se = !0;
    try {
      (t & St) !== 0 ? Cr(e) : hn(e), dn(e);
      var i = En(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = pn;
      var l = e.deps, o;
      zt && br && e.f & J;
    } catch (u) {
      tt(u, e, n, r || e.ctx);
    } finally {
      se = a, I = n;
    }
  }
}
function Or() {
  try {
    cr();
  } catch (e) {
    if (Fe !== null)
      tt(e, Fe, null);
    else
      throw e;
  }
}
function Lr() {
  var e = se;
  try {
    var t = 0;
    for (se = !0; Le.length > 0; ) {
      t++ > 1e3 && Or();
      var n = Le, r = n.length;
      Le = [];
      for (var a = 0; a < r; a++) {
        var i = xr(n[a]);
        Ur(i);
      }
      ye.clear();
    }
  } finally {
    ht = !1, se = e, Fe = null;
  }
}
function Ur(e) {
  var t = e.length;
  if (t !== 0)
    for (var n = 0; n < t; n++) {
      var r = e[n];
      if ((r.f & (Ze | te)) === 0)
        try {
          Ce(r) && (Mt(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? _n(r) : r.fn = null));
        } catch (a) {
          tt(a, r, null, r.ctx);
        }
    }
}
function nt(e) {
  ht || (ht = !0, queueMicrotask(Lr));
  for (var t = Fe = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if ((n & (Te | ne)) !== 0) {
      if ((n & F) === 0) return;
      t.f ^= F;
    }
  }
  Le.push(t);
}
function xr(e) {
  for (var t = [], n = e; n !== null; ) {
    var r = n.f, a = (r & (ne | Te)) !== 0, i = a && (r & F) !== 0;
    if (!i && (r & te) === 0) {
      if ((r & rn) !== 0)
        t.push(n);
      else if (a)
        n.f ^= F;
      else
        try {
          Ce(n) && Mt(n);
        } catch (u) {
          tt(u, n, null, n.ctx);
        }
      var l = n.first;
      if (l !== null) {
        n = l;
        continue;
      }
    }
    var o = n.parent;
    for (n = n.next; n === null && o !== null; )
      n = o.next, o = o.parent;
  }
  return t;
}
function w(e) {
  var t = e.f, n = (t & Y) !== 0;
  if (S !== null && !X) {
    if (!(x != null && x.includes(e))) {
      var r = S.deps;
      e.rv < He && (e.rv = He, O === null && r !== null && r[H] === e ? H++ : O === null ? O = [e] : (!le || !O.includes(e)) && O.push(e));
    }
  } else if (n && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var a = (
      /** @type {Derived} */
      e
    ), i = a.parent;
    i !== null && (i.f & j) === 0 && (a.f ^= j);
  }
  return n && (a = /** @type {Derived} */
  e, Ce(a) && cn(a)), Ie && ye.has(e) ? ye.get(e) : e.v;
}
function Ve(e) {
  var t = X;
  try {
    return X = !0, e();
  } finally {
    X = t;
  }
}
const qr = -7169;
function K(e, t) {
  e.f = e.f & qr | t;
}
const ye = /* @__PURE__ */ new Map();
function Ee(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: un,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function L(e, t) {
  const n = Ee(e);
  return mn(n), n;
}
// @__NO_SIDE_EFFECTS__
function An(e, t = !1) {
  var r;
  const n = Ee(e);
  return t || (n.equals = Ct), Pe && D !== null && D.l !== null && ((r = D.l).s ?? (r.s = [])).push(n), n;
}
function N(e, t, n = !1) {
  S !== null && !X && Re() && (S.f & (Y | St)) !== 0 && !(x != null && x.includes(e)) && _r();
  let r = n ? oe(t) : t;
  return _t(e, r);
}
function _t(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    Ie ? ye.set(e, t) : ye.set(e, n), e.v = t, (e.f & Y) !== 0 && ((e.f & J) !== 0 && fn(
      /** @type {Derived} */
      e
    ), K(e, (e.f & j) === 0 ? F : fe)), e.wv = wn(), Tn(e, J), Re() && I !== null && (I.f & F) !== 0 && (I.f & (ne | Te)) === 0 && (V === null ? Dr([e]) : V.push(e));
  }
  return t;
}
function Tn(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = Re(), a = n.length, i = 0; i < a; i++) {
      var l = n[i], o = l.f;
      (o & J) === 0 && (!r && l === I || (K(l, t), (o & (F | j)) !== 0 && ((o & Y) !== 0 ? Tn(
        /** @type {Derived} */
        l,
        fe
      ) : nt(
        /** @type {Effect} */
        l
      ))));
    }
}
let D = null;
function jt(e) {
  D = e;
}
function re(e, t = !1, n) {
  var r = D = {
    p: D,
    c: null,
    d: !1,
    e: null,
    m: !1,
    s: e,
    x: null,
    l: null
  };
  Pe && !t && (D.l = {
    s: null,
    u: null,
    r1: [],
    r2: Ee(!1)
  }), Ir(() => {
    r.d = !0;
  });
}
function ie(e) {
  const t = D;
  if (t !== null) {
    const l = t.e;
    if (l !== null) {
      var n = I, r = S;
      t.e = null;
      try {
        for (var a = 0; a < l.length; a++) {
          var i = l[a];
          ue(i.effect), Q(i.reaction), kt(i.fn);
        }
      } finally {
        ue(n), Q(r);
      }
    }
    D = t.p, t.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function Re() {
  return !Pe || D !== null && D.l === null;
}
function zr(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const Fr = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
];
function Hr(e) {
  return Fr.includes(e);
}
const jr = {
  // no `class: 'className'` because we handle that separately
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback"
};
function Vr(e) {
  return e = e.toLowerCase(), jr[e] ?? e;
}
function Gr(e, t) {
  if (t) {
    const n = document.body;
    e.autofocus = !0, et(() => {
      document.activeElement === n && e.focus();
    });
  }
}
let Vt = !1;
function Wr() {
  Vt || (Vt = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        var t;
        if (!e.defaultPrevented)
          for (
            const n of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            (t = n.__on_r) == null || t.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function Pn(e) {
  var t = S, n = I;
  Q(null), ue(null);
  try {
    return e();
  } finally {
    Q(t), ue(n);
  }
}
function Br(e, t, n, r = n) {
  e.addEventListener(t, () => Pn(n));
  const a = e.__on_r;
  a ? e.__on_r = () => {
    a(), r(!0);
  } : e.__on_r = () => r(!0), Wr();
}
const Yr = /* @__PURE__ */ new Set(), Kr = /* @__PURE__ */ new Set();
function Xr(e, t, n, r = {}) {
  function a(i) {
    if (r.capture || Zr.call(t, i), !i.cancelBubble)
      return Pn(() => n == null ? void 0 : n.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? et(() => {
    t.addEventListener(e, a, r);
  }) : t.addEventListener(e, a, r), a;
}
function ve(e) {
  for (var t = 0; t < e.length; t++)
    Yr.add(e[t]);
  for (var n of Kr)
    n(e);
}
function Zr(e) {
  var _;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, a = ((_ = e.composedPath) == null ? void 0 : _.call(e)) || [], i = (
    /** @type {null | Element} */
    a[0] || e.target
  ), l = 0, o = e.__root;
  if (o) {
    var u = a.indexOf(o);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var s = a.indexOf(t);
    if (s === -1)
      return;
    u <= s && (l = u);
  }
  if (i = /** @type {Element} */
  a[l] || e.target, i !== t) {
    Qn(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var f = S, v = I;
    Q(null), ue(null);
    try {
      for (var c, d = []; i !== null; ) {
        var h = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var y = i["__" + r];
          if (y != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i))
            if (Pt(y)) {
              var [p, ...g] = y;
              p.apply(i, [e, ...g]);
            } else
              y.call(i, e);
        } catch (b) {
          c ? d.push(b) : c = b;
        }
        if (e.cancelBubble || h === t || h === null)
          break;
        i = h;
      }
      if (c) {
        for (let b of d)
          queueMicrotask(() => {
            throw b;
          });
        throw c;
      }
    } finally {
      e.__root = t, delete e.currentTarget, Q(f), ue(v);
    }
  }
}
function Sn(e) {
  var t = document.createElement("template");
  return t.innerHTML = e, t.content;
}
function he(e, t) {
  var n = (
    /** @type {Effect} */
    I
  );
  n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function k(e, t) {
  var n = (t & en) !== 0, r = (t & Xn) !== 0, a, i = !e.startsWith("<!>");
  return () => {
    a === void 0 && (a = Sn(i ? e : "<!>" + e), n || (a = /** @type {Node} */
    /* @__PURE__ */ ee(a)));
    var l = (
      /** @type {TemplateNode} */
      r || pr ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (n) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ee(l)
      ), u = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      he(o, u);
    } else
      he(l, l);
    return l;
  };
}
// @__NO_SIDE_EFFECTS__
function ke(e, t, n = "svg") {
  var r = !e.startsWith("<!>"), a = (t & en) !== 0, i = `<${n}>${r ? e : "<!>" + e}</${n}>`, l;
  return () => {
    if (!l) {
      var o = (
        /** @type {DocumentFragment} */
        Sn(i)
      ), u = (
        /** @type {Element} */
        /* @__PURE__ */ ee(o)
      );
      if (a)
        for (l = document.createDocumentFragment(); /* @__PURE__ */ ee(u); )
          l.appendChild(
            /** @type {Node} */
            /* @__PURE__ */ ee(u)
          );
      else
        l = /** @type {Element} */
        /* @__PURE__ */ ee(u);
    }
    var s = (
      /** @type {TemplateNode} */
      l.cloneNode(!0)
    );
    if (a) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ee(s)
      ), v = (
        /** @type {TemplateNode} */
        s.lastChild
      );
      he(f, v);
    } else
      he(s, s);
    return s;
  };
}
function gt(e = "") {
  {
    var t = It(e + "");
    return he(t, t), t;
  }
}
function Jr() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = It();
  return e.append(t, n), he(t, n), e;
}
function A(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function Ae(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = n + "");
}
function Z(e, t, [n, r] = [0, 0]) {
  var a = e, i = null, l = null, o = q, u = n > 0 ? Je : 0, s = !1;
  const f = (c, d = !0) => {
    s = !0, v(d, c);
  }, v = (c, d) => {
    o !== (o = c) && (o ? (i ? qe(i) : d && (i = we(() => d(a))), l && dt(l, () => {
      l = null;
    })) : (l ? qe(l) : d && (l = we(() => d(a, [n + 1, r]))), i && dt(i, () => {
      i = null;
    })));
  };
  $e(() => {
    s = !1, t(f), s || v(null, null);
  }, u);
}
function bt(e, t) {
  return t;
}
function Qr(e, t, n, r) {
  for (var a = [], i = t.length, l = 0; l < i; l++)
    Dt(t[l].e, a, !0);
  var o = i > 0 && a.length === 0 && n !== null;
  if (o) {
    var u = (
      /** @type {Element} */
      /** @type {Element} */
      n.parentNode
    );
    Er(u), u.append(
      /** @type {Element} */
      n
    ), r.clear(), ae(e, t[0].prev, t[i - 1].next);
  }
  gn(a, () => {
    for (var s = 0; s < i; s++) {
      var f = t[s];
      o || (r.delete(f.k), ae(e, f.prev, f.next)), ce(f.e, !o);
    }
  });
}
function mt(e, t, n, r, a, i = null) {
  var l = e, o = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, u = (t & $t) !== 0;
  if (u) {
    var s = (
      /** @type {Element} */
      e
    );
    l = s.appendChild(It());
  }
  var f = null, v = !1, c = /* @__PURE__ */ on(() => {
    var d = n();
    return Pt(d) ? d : d == null ? [] : tn(d);
  });
  $e(() => {
    var d = w(c), h = d.length;
    v && h === 0 || (v = h === 0, $r(d, o, l, a, t, r, n), i !== null && (h === 0 ? f ? qe(f) : f = we(() => i(l)) : f !== null && dt(f, () => {
      f = null;
    })), w(c));
  });
}
function $r(e, t, n, r, a, i, l) {
  var Ot, Lt, Ut, xt;
  var o = (a & jn) !== 0, u = (a & (At | Tt)) !== 0, s = e.length, f = t.items, v = t.first, c = v, d, h = null, y, p = [], g = [], _, b, m, E;
  if (o)
    for (E = 0; E < s; E += 1)
      _ = e[E], b = i(_, E), m = f.get(b), m !== void 0 && ((Ot = m.a) == null || Ot.measure(), (y ?? (y = /* @__PURE__ */ new Set())).add(m));
  for (E = 0; E < s; E += 1) {
    if (_ = e[E], b = i(_, E), m = f.get(b), m === void 0) {
      var C = c ? (
        /** @type {TemplateNode} */
        c.e.nodes_start
      ) : n;
      h = ti(
        C,
        t,
        h,
        h === null ? t.first : h.next,
        _,
        b,
        E,
        r,
        a,
        l
      ), f.set(b, h), p = [], g = [], c = h.next;
      continue;
    }
    if (u && ei(m, _, E, a), (m.e.f & te) !== 0 && (qe(m.e), o && ((Lt = m.a) == null || Lt.unfix(), (y ?? (y = /* @__PURE__ */ new Set())).delete(m))), m !== c) {
      if (d !== void 0 && d.has(m)) {
        if (p.length < g.length) {
          var T = g[0], R;
          h = T.prev;
          var de = p[0], it = p[p.length - 1];
          for (R = 0; R < p.length; R += 1)
            Gt(p[R], T, n);
          for (R = 0; R < g.length; R += 1)
            d.delete(g[R]);
          ae(t, de.prev, it.next), ae(t, h, de), ae(t, it, T), c = T, h = it, E -= 1, p = [], g = [];
        } else
          d.delete(m), Gt(m, c, n), ae(t, m.prev, m.next), ae(t, m, h === null ? t.first : h.next), ae(t, h, m), h = m;
        continue;
      }
      for (p = [], g = []; c !== null && c.k !== b; )
        (c.e.f & te) === 0 && (d ?? (d = /* @__PURE__ */ new Set())).add(c), g.push(c), c = c.next;
      if (c === null)
        continue;
      m = c;
    }
    p.push(m), h = m, c = m.next;
  }
  if (c !== null || d !== void 0) {
    for (var ge = d === void 0 ? [] : tn(d); c !== null; )
      (c.e.f & te) === 0 && ge.push(c), c = c.next;
    var at = ge.length;
    if (at > 0) {
      var qn = (a & $t) !== 0 && s === 0 ? n : null;
      if (o) {
        for (E = 0; E < at; E += 1)
          (Ut = ge[E].a) == null || Ut.measure();
        for (E = 0; E < at; E += 1)
          (xt = ge[E].a) == null || xt.fix();
      }
      Qr(t, ge, qn, f);
    }
  }
  o && et(() => {
    var qt;
    if (y !== void 0)
      for (m of y)
        (qt = m.a) == null || qt.apply();
  }), I.first = t.first && t.first.e, I.last = h && h.e;
}
function ei(e, t, n, r) {
  (r & At) !== 0 && _t(e.v, t), (r & Tt) !== 0 ? _t(
    /** @type {Value<number>} */
    e.i,
    n
  ) : e.i = n;
}
function ti(e, t, n, r, a, i, l, o, u, s) {
  var f = (u & At) !== 0, v = (u & Vn) === 0, c = f ? v ? /* @__PURE__ */ An(a) : Ee(a) : a, d = (u & Tt) === 0 ? l : Ee(l), h = {
    i: d,
    v: c,
    k: i,
    a: null,
    // @ts-expect-error
    e: null,
    prev: n,
    next: r
  };
  try {
    return h.e = we(() => o(e, c, d, s), gr), h.e.prev = n && n.e, h.e.next = r && r.e, n === null ? t.first = h : (n.next = h, n.e.next = h.e), r !== null && (r.prev = h, r.e.prev = h.e), h;
  } finally {
  }
}
function Gt(e, t, n) {
  for (var r = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : n, a = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : n, i = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); i !== r; ) {
    var l = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Qe(i)
    );
    a.before(i), i = l;
  }
}
function ae(e, t, n) {
  t === null ? e.first = n : (t.next = n, t.e.next = n && n.e), n !== null && (n.prev = t, n.e.prev = t && t.e);
}
function _e(e, t, ...n) {
  var r = e, a = Ke, i;
  $e(() => {
    a !== (a = t()) && (i && (ce(i), i = null), i = we(() => (
      /** @type {SnippetFn} */
      a(r, ...n)
    )));
  }, Je);
}
function In(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (n = In(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function ni() {
  for (var e, t, n = 0, r = "", a = arguments.length; n < a; n++) (e = arguments[n]) && (t = In(e)) && (r && (r += " "), r += t);
  return r;
}
function Ge(e) {
  return typeof e == "object" ? ni(e) : e ?? "";
}
const Wt = [...` 	
\r\f \v\uFEFF`];
function ri(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (t && (r = r ? r + " " + t : t), n) {
    for (var a in n)
      if (n[a])
        r = r ? r + " " + a : a;
      else if (r.length)
        for (var i = a.length, l = 0; (l = r.indexOf(a, l)) >= 0; ) {
          var o = l + i;
          (l === 0 || Wt.includes(r[l - 1])) && (o === r.length || Wt.includes(r[o])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(o + 1) : l = o;
        }
  }
  return r === "" ? null : r;
}
function Bt(e, t = !1) {
  var n = t ? " !important;" : ";", r = "";
  for (var a in e) {
    var i = e[a];
    i != null && i !== "" && (r += " " + a + ": " + i + n);
  }
  return r;
}
function ut(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function ii(e, t) {
  if (t) {
    var n = "", r, a;
    if (Array.isArray(t) ? (r = t[0], a = t[1]) : r = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var i = !1, l = 0, o = !1, u = [];
      r && u.push(...Object.keys(r).map(ut)), a && u.push(...Object.keys(a).map(ut));
      var s = 0, f = -1;
      const y = e.length;
      for (var v = 0; v < y; v++) {
        var c = e[v];
        if (o ? c === "/" && e[v - 1] === "*" && (o = !1) : i ? i === c && (i = !1) : c === "/" && e[v + 1] === "*" ? o = !0 : c === '"' || c === "'" ? i = c : c === "(" ? l++ : c === ")" && l--, !o && i === !1 && l === 0) {
          if (c === ":" && f === -1)
            f = v;
          else if (c === ";" || v === y - 1) {
            if (f !== -1) {
              var d = ut(e.substring(s, f).trim());
              if (!u.includes(d)) {
                c !== ";" && v++;
                var h = e.substring(s, v).trim();
                n += " " + h + ";";
              }
            }
            s = v + 1, f = -1;
          }
        }
      }
    }
    return r && (n += Bt(r)), a && (n += Bt(a, !0)), n = n.trim(), n === "" ? null : n;
  }
  return e == null ? null : String(e);
}
function B(e, t, n, r, a, i) {
  var l = e.__className;
  if (l !== n || l === void 0) {
    var o = ri(n, r, i);
    o == null ? e.removeAttribute("class") : t ? e.className = o : e.setAttribute("class", o), e.__className = n;
  } else if (i && a !== i)
    for (var u in i) {
      var s = !!i[u];
      (a == null || s !== !!a[u]) && e.classList.toggle(u, s);
    }
  return i;
}
function ot(e, t = {}, n, r) {
  for (var a in n) {
    var i = n[a];
    t[a] !== i && (n[a] == null ? e.style.removeProperty(a) : e.style.setProperty(a, i, r));
  }
}
function rt(e, t, n, r) {
  var a = e.__style;
  if (a !== t) {
    var i = ii(t, r);
    i == null ? e.removeAttribute("style") : e.style.cssText = i, e.__style = t;
  } else r && (Array.isArray(r) ? (ot(e, n == null ? void 0 : n[0], r[0]), ot(e, n == null ? void 0 : n[1], r[1], "important")) : ot(e, n, r));
  return r;
}
const De = Symbol("class"), be = Symbol("style"), Cn = Symbol("is custom element"), Rn = Symbol("is html");
function ai(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function We(e, t, n, r) {
  var a = kn(e);
  a[t] !== (a[t] = n) && (t === "loading" && (e[ur] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Dn(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function li(e, t, n, r, a = !1) {
  var i = kn(e), l = i[Cn], o = !i[Rn], u = t || {}, s = e.tagName === "OPTION";
  for (var f in t)
    f in n || (n[f] = null);
  n.class ? n.class = Ge(n.class) : n.class = null, n[be] && (n.style ?? (n.style = null));
  var v = Dn(e);
  for (const _ in n) {
    let b = n[_];
    if (s && _ === "value" && b == null) {
      e.value = e.__value = "", u[_] = b;
      continue;
    }
    if (_ === "class") {
      var c = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      B(e, c, b, r, t == null ? void 0 : t[De], n[De]), u[_] = b, u[De] = n[De];
      continue;
    }
    if (_ === "style") {
      rt(e, b, t == null ? void 0 : t[be], n[be]), u[_] = b, u[be] = n[be];
      continue;
    }
    var d = u[_];
    if (b !== d) {
      u[_] = b;
      var h = _[0] + _[1];
      if (h !== "$$")
        if (h === "on") {
          const m = {}, E = "$$" + _;
          let C = _.slice(2);
          var y = Hr(C);
          if (zr(C) && (C = C.slice(0, -7), m.capture = !0), !y && d) {
            if (b != null) continue;
            e.removeEventListener(C, u[E], m), u[E] = null;
          }
          if (b != null)
            if (y)
              e[`__${C}`] = b, ve([C]);
            else {
              let T = function(R) {
                u[_].call(this, R);
              };
              u[E] = Xr(C, e, T, m);
            }
          else y && (e[`__${C}`] = void 0);
        } else if (_ === "style")
          We(e, _, b);
        else if (_ === "autofocus")
          Gr(
            /** @type {HTMLElement} */
            e,
            !!b
          );
        else if (!l && (_ === "__value" || _ === "value" && b != null))
          e.value = e.__value = b;
        else if (_ === "selected" && s)
          ai(
            /** @type {HTMLOptionElement} */
            e,
            b
          );
        else {
          var p = _;
          o || (p = Vr(p));
          var g = p === "defaultValue" || p === "defaultChecked";
          if (b == null && !l && !g)
            if (i[_] = null, p === "value" || p === "checked") {
              let m = (
                /** @type {HTMLInputElement} */
                e
              );
              const E = t === void 0;
              if (p === "value") {
                let C = m.defaultValue;
                m.removeAttribute(p), m.defaultValue = C, m.value = m.__value = E ? C : null;
              } else {
                let C = m.defaultChecked;
                m.removeAttribute(p), m.defaultChecked = C, m.checked = E ? C : !1;
              }
            } else
              e.removeAttribute(_);
          else g || v.includes(p) && (l || typeof b != "string") ? e[p] = b : typeof b != "function" && We(e, p, b);
        }
    }
  }
  return u;
}
function kn(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [Cn]: e.nodeName.includes("-"),
      [Rn]: e.namespaceURI === Zn
    })
  );
}
var Yt = /* @__PURE__ */ new Map();
function Dn(e) {
  var t = Yt.get(e.nodeName);
  if (t) return t;
  Yt.set(e.nodeName, t = []);
  for (var n, r = e, a = Element.prototype; a !== r; ) {
    n = $n(r);
    for (var i in n)
      n[i].set && t.push(i);
    r = nn(r);
  }
  return t;
}
function ui(e, t, n = t) {
  var r = Re();
  Br(e, "input", (a) => {
    var i = a ? e.defaultValue : e.value;
    if (i = st(e) ? ft(i) : i, n(i), r && i !== (i = t())) {
      var l = e.selectionStart, o = e.selectionEnd;
      e.value = i ?? "", o !== null && (e.selectionStart = l, e.selectionEnd = Math.min(o, e.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Ve(t) == null && e.value && n(st(e) ? ft(e.value) : e.value), vn(() => {
    var a = t();
    st(e) && a === ft(e.value) || e.type === "date" && !a && !e.value || a !== e.value && (e.value = a ?? "");
  });
}
function st(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function ft(e) {
  return e === "" ? null : +e;
}
function Kt(e, t) {
  return e === t || (e == null ? void 0 : e[me]) === t;
}
function oi(e = {}, t, n, r) {
  return kt(() => {
    var a, i;
    return vn(() => {
      a = i, i = [], Ve(() => {
        e !== n(...i) && (t(e, ...i), a && Kt(n(...a), e) && t(null, ...a));
      });
    }), () => {
      et(() => {
        i && Kt(n(...i), e) && t(null, ...i);
      });
    };
  }), e;
}
let Me = !1;
function si(e) {
  var t = Me;
  try {
    return Me = !1, [e(), Me];
  } finally {
    Me = t;
  }
}
const fi = {
  get(e, t) {
    if (!e.exclude.includes(t))
      return e.props[t];
  },
  set(e, t) {
    return !1;
  },
  getOwnPropertyDescriptor(e, t) {
    if (!e.exclude.includes(t) && t in e.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: e.props[t]
      };
  },
  has(e, t) {
    return e.exclude.includes(t) ? !1 : t in e.props;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
  }
};
// @__NO_SIDE_EFFECTS__
function ci(e, t, n) {
  return new Proxy(
    { props: e, exclude: t },
    fi
  );
}
function Xt(e) {
  var t;
  return ((t = e.ctx) == null ? void 0 : t.d) ?? !1;
}
function z(e, t, n, r) {
  var C;
  var a = (n & Gn) !== 0, i = !Pe || (n & Wn) !== 0, l = (n & Yn) !== 0, o = (n & Kn) !== 0, u = !1, s;
  l ? [s, u] = si(() => (
    /** @type {V} */
    e[t]
  )) : s = /** @type {V} */
  e[t];
  var f = me in e || lr in e, v = l && (((C = Ne(e, t)) == null ? void 0 : C.set) ?? (f && t in e && ((T) => e[t] = T))) || void 0, c = (
    /** @type {V} */
    r
  ), d = !0, h = !1, y = () => (h = !0, d && (d = !1, o ? c = Ve(
    /** @type {() => V} */
    r
  ) : c = /** @type {V} */
  r), c);
  s === void 0 && r !== void 0 && (v && i && vr(), s = y(), v && v(s));
  var p;
  if (i)
    p = () => {
      var T = (
        /** @type {V} */
        e[t]
      );
      return T === void 0 ? y() : (d = !0, h = !1, T);
    };
  else {
    var g = (a ? pe : on)(
      () => (
        /** @type {V} */
        e[t]
      )
    );
    g.f |= ir, p = () => {
      var T = w(g);
      return T !== void 0 && (c = /** @type {V} */
      void 0), T === void 0 ? c : T;
    };
  }
  if ((n & Bn) === 0)
    return p;
  if (v) {
    var _ = e.$$legacy;
    return function(T, R) {
      return arguments.length > 0 ? ((!i || !R || _ || u) && v(R ? p() : T), T) : p();
    };
  }
  var b = !1, m = /* @__PURE__ */ An(s), E = /* @__PURE__ */ pe(() => {
    var T = p(), R = w(m);
    return b ? (b = !1, R) : m.v = T;
  });
  return l && w(E), a || (E.equals = Ct), function(T, R) {
    if (arguments.length > 0) {
      const de = R ? w(E) : i && l ? oe(T) : T;
      if (!E.equals(de)) {
        if (b = !0, N(m, de), h && c !== void 0 && (c = de), Xt(E))
          return T;
        Ve(() => w(E));
      }
      return T;
    }
    return Xt(E) ? E.v : w(E);
  };
}
var vi = /* @__PURE__ */ k("<div><button><!></button></div>");
function pt(e, t) {
  let n = z(t, "type", 3, "primary"), r = z(t, "size", 3, "fill"), a = z(t, "shape", 3, "rectangular"), i = /* @__PURE__ */ W(() => `container ${r()} ${n()}${t.class ? ` ${t.class}` : ""}`), l = /* @__PURE__ */ W(() => `${n() === "primary" ? "secondary" : "primary"}`), o = /* @__PURE__ */ W(() => `button ${n()} ${a()} ${t.loading ? "loading" : ""}`);
  var u = vi(), s = P(u);
  s.__click = function(...d) {
    var h;
    (h = t.onclick) == null || h.apply(this, d);
  };
  var f = P(s);
  {
    var v = (d) => {
      Bi(d, {
        get theme() {
          return w(l);
        }
      });
    }, c = (d) => {
      var h = Jr(), y = ln(h);
      _e(y, () => t.children ?? Ke), A(d, h);
    };
    Z(f, (d) => {
      t.loading ? d(v) : d(c, !1);
    });
  }
  U(() => {
    B(u, 1, Ge(w(i)), "svelte-9axebd"), B(s, 1, Ge(w(o)), "svelte-9axebd"), s.disabled = t.disabled || t.loading;
  }), A(e, u);
}
ve(["click"]);
const M = [];
for (let e = 0; e < 256; ++e)
  M.push((e + 256).toString(16).slice(1));
function di(e, t = 0) {
  return (M[e[t + 0]] + M[e[t + 1]] + M[e[t + 2]] + M[e[t + 3]] + "-" + M[e[t + 4]] + M[e[t + 5]] + "-" + M[e[t + 6]] + M[e[t + 7]] + "-" + M[e[t + 8]] + M[e[t + 9]] + "-" + M[e[t + 10]] + M[e[t + 11]] + M[e[t + 12]] + M[e[t + 13]] + M[e[t + 14]] + M[e[t + 15]]).toLowerCase();
}
let ct;
const hi = new Uint8Array(16);
function _i() {
  if (!ct) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    ct = crypto.getRandomValues.bind(crypto);
  }
  return ct(hi);
}
const gi = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Zt = { randomUUID: gi };
function bi(e, t, n) {
  var a;
  e = e || {};
  const r = e.random ?? ((a = e.rng) == null ? void 0 : a.call(e)) ?? _i();
  if (r.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, di(r);
}
function mi(e, t, n) {
  return Zt.randomUUID ? Zt.randomUUID() : bi(e);
}
const $i = (e, t) => {
  const n = new ResizeObserver((r) => {
    for (let a of r) {
      const { height: i, width: l } = a.contentRect;
      t(i, l);
    }
  });
  n.observe(e), Qt(() => {
    n.disconnect();
  });
}, ea = (e) => {
  if (e)
    return e.navigator.language;
}, ta = (e, t) => new Date(e, t).getDay(), na = (e, t) => new Date(e, t % 12, 0).getDate(), ra = (e, t, n) => new Date(e, t).toLocaleString(n ?? "en-US", { month: "long" }), ia = (e, t, n, r) => new Date(e, t, n).toLocaleString(r ?? "en-US", { weekday: "long" }), aa = (e, t, n, r, a = !0) => {
  const i = new Date(2025, t, n), l = i.toLocaleDateString(r ?? "en-US", { day: "numeric" }), o = i.toLocaleDateString(r ?? "en-US", { month: "long" }), u = l.endsWith("1") && l !== "11" ? "st" : l.endsWith("2") && l !== "12" ? "nd" : l.endsWith("3") && l !== "13" ? "rd" : "th";
  let s = "";
  return a && (s += `, ${e}`), `${o} ${l}${u}${s}`;
};
var Nt = /* @__PURE__ */ ((e) => (e.GET = "GET", e.POST = "POST", e.PUT = "PUT", e))(Nt || {});
const la = {
  AUTH: {
    path: "/api/auth/authed-user",
    method: "GET"
    /* GET */
  },
  LOGOUT: {
    path: "/api/auth/logout",
    method: "POST"
    /* POST */
  }
};
class ua {
  constructor() {
    $(this, "items", []);
  }
  push(t) {
    this.items.push(t);
  }
  pop() {
    const t = this.size();
    if (t === 0)
      return null;
    const n = this.items[t - 1];
    return this.items = this.items.slice(0, t - 1), n;
  }
  size() {
    return this.items.length;
  }
}
const oa = ["info", "warning", "error", "success"], sa = [
  "???",
  "ctrlzilla",
  "wandaconda",
  "eyezac_screamalot",
  "waddle_combs",
  "glitchard_simmons",
  "alien_degeneres"
], pi = {
  "???": "Unknown",
  ctrlzilla: "Ctrl Zilla",
  wandaconda: "Wanda Conda",
  eyezac_screamalot: "Eyezac Screamalot",
  waddle_combs: "Waddle Combs",
  glitchard_simmons: "Glitchard Simmons",
  alien_degeneres: "Alien Degeneres"
}, wi = {
  "???": new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/unknown.png"),
  ctrlzilla: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/ctrlzilla.png"),
  wandaconda: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/wandaconda.png"),
  eyezac_screamalot: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/eyezac_screamalot.png"),
  waddle_combs: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/waddle_combs.png"),
  glitchard_simmons: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/glitchard_simmons.png"),
  alien_degeneres: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/alien_degeneres.png")
};
var Mn = /* @__PURE__ */ ((e) => (e.Auth = "Auth", e.Federation = "Federation", e.WebGames = "WebGames", e.Calendar = "Calendar", e))(Mn || {});
const wt = {
  Auth: {
    friendlyName: "01100001 01110101 01110100 01101000",
    subdomain: "login",
    devPort: "9999"
  },
  Federation: {
    friendlyName: "The Jeffiverse Portal",
    subdomain: "login",
    devPort: "5175"
  },
  WebGames: {
    friendlyName: "Jeff's Web Games",
    subdomain: "games",
    devPort: "5173"
  },
  Calendar: {
    friendlyName: "Jeff's Calendar Creator",
    subdomain: "calendar",
    devPort: "5173"
  }
}, fa = "app", ca = "path", va = (e) => Object.values(Mn).includes(e), da = "dev", Nn = "prod", On = async (e, t, n) => {
  let r = {};
  e.method === Nt.POST && (r["Content-Type"] = "application/json"), r = { ...r, ...t == null ? void 0 : t.additionalHeaders };
  let a = "";
  if (t != null && t.query) {
    const u = Object.keys((t == null ? void 0 : t.query) ?? {});
    for (let s = 0; s < u.length; s++) {
      const f = u[s];
      a += `${s > 0 ? "&" : ""}${f}=${t.query[f]}`;
    }
  }
  let i = e.path;
  a.length > 0 && (i += `?${a}`);
  let l;
  t != null && t.body && (l = JSON.stringify(t.body));
  let o = "include";
  return e.credentials === "none" && (o = "omit"), n ? n(i, {
    method: e.method,
    credentials: o,
    headers: r,
    body: l
  }) : fetch(i, {
    method: e.method,
    credentials: o,
    headers: r,
    body: l
  });
}, ha = (e, t) => {
  const n = wt[t];
  return n ? e === Nn ? `https://${n.subdomain}.jeffreycarr.dev` : `http://${n.subdomain}.jeffreycarr.local:${n.devPort}` : "";
}, _a = () => "pong!", ga = (e) => new Promise((t) => setTimeout(t, e)), yt = (e, t) => (t == null && (t = e, e = 0), Math.random() * t + e), Ln = (e, t) => Math.floor(yt(e, t)), yi = (e) => {
  const t = Ln(e.length);
  return e[t];
}, Ei = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`, ba = () => yi([
  "Hello",
  "Hi",
  "Hey",
  "Yo",
  "Sup",
  "Howdy",
  "Ahoy",
  "Greetings",
  "Welcome",
  "Hola",
  "Aloha",
  "Salutations",
  "Hiya",
  "G'day",
  "Heya",
  "Heyo",
  "Yello"
]), ma = () => mi();
var Ai = /* @__PURE__ */ k('<div class="container svelte-1yz8bgp"><canvas class="canvas svelte-1yz8bgp"></canvas></div>');
function pa(e, t) {
  re(t, !0);
  let n = /* @__PURE__ */ L(null), r = /* @__PURE__ */ W(() => {
    var g;
    return (g = w(n)) == null ? void 0 : g.getContext("2d");
  });
  const a = 2, i = 5, l = 1, o = 1, u = 2, s = 150, f = (g) => {
    if (!w(n) || g <= 0)
      return [];
    const _ = w(n).width;
    return [...Array(g)].map(() => ({
      x: yt(_),
      y: 0,
      velocity: yt(o, u),
      sizePx: Ln(a, i),
      color: Ei()
    }));
  };
  let v = f(s);
  const c = (g) => {
    const _ = g;
    return _.y = g.y + l * g.velocity, _;
  }, d = (g, _) => {
    g.beginPath(), g.fillRect(_.x, _.y, _.sizePx, _.sizePx), g.fillStyle = _.color, g.fill();
  }, h = () => {
    if (w(n) == null || !w(r)) {
      requestAnimationFrame(h);
      return;
    }
    w(r).clearRect(0, 0, w(n).width, w(n).height);
    for (const g of v)
      d(w(r), g);
    v = v.map((g) => c(g)), v.length, v = v.filter((g) => {
      var _;
      return g.sizePx > 0 && g.y < (((_ = w(n)) == null ? void 0 : _.height) ?? 500);
    }), v.push(...f(s - v.length)), requestAnimationFrame(h);
  };
  h();
  var y = Ai(), p = P(y);
  oi(p, (g) => N(n, g), () => w(n)), A(e, y), ie();
}
var Ti = /* @__PURE__ */ k('<div class="container svelte-7fbptt"><img class="icon svelte-7fbptt"></div>');
function wa(e, t) {
  re(t, !0);
  let n = /* @__PURE__ */ W(() => wi[t.character].href), r = /* @__PURE__ */ W(() => `${pi[t.character]} icon`);
  var a = Ti(), i = P(a);
  U(() => {
    We(i, "src", w(n)), We(i, "alt", w(r));
  }), A(e, a), ie();
}
var Pi = /* @__PURE__ */ k('<div class="container svelte-bahb1u"><button><!> <span class="text svelte-bahb1u"><!></span></button></div>');
function ya(e, t) {
  let n = z(t, "icon", 3, "left-arrow"), r = z(t, "theme", 3, "primary");
  var a = Pi(), i = P(a);
  i.__click = function(...f) {
    var v;
    (v = t.onclick) == null || v.apply(this, f);
  };
  var l = P(i);
  {
    var o = (f) => {
      Et(f, {
        get icon() {
          return n();
        }
      });
    };
    Z(l, (f) => {
      n() != null && f(o);
    });
  }
  var u = G(l, 2), s = P(u);
  _e(s, () => t.children ?? Ke), U(() => B(i, 1, `button ${r()}`, "svelte-bahb1u")), A(e, a);
}
ve(["click"]);
var Si = /* @__PURE__ */ k('<p class="error-message svelte-bmwigf"><!></p>'), Ii = /* @__PURE__ */ k('<div class="container"><input> <!></div>');
function Ea(e, t) {
  re(t, !0);
  let n = z(t, "value", 15), r = /* @__PURE__ */ ci(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "validator",
    "message",
    "value"
  ]), a = /* @__PURE__ */ L(""), i = /* @__PURE__ */ W(() => {
    var d;
    return w(a).length > 0 || ((d = t.message) == null ? void 0 : d.length) > 0;
  }), l = /* @__PURE__ */ W(() => `input ${w(i) ? "error" : ""}`);
  const o = (d) => {
    var y;
    const h = d.currentTarget;
    h && N(a, ((y = t.validator) == null ? void 0 : y.call(t, h.value)) ?? "", !0);
  };
  var u = Ii(), s = P(u);
  let f;
  var v = G(s, 2);
  {
    var c = (d) => {
      var h = Si(), y = P(h);
      {
        var p = (_) => {
          var b = gt();
          U(() => Ae(b, t.message)), A(_, b);
        }, g = (_) => {
          var b = gt();
          U(() => Ae(b, w(a))), A(_, b);
        };
        Z(y, (_) => {
          var b;
          ((b = t.message) == null ? void 0 : b.length) > 0 ? _(p) : _(g, !1);
        });
      }
      A(d, h);
    };
    Z(v, (d) => {
      w(i) && d(c);
    });
  }
  U(() => f = li(
    s,
    f,
    {
      class: w(l),
      ...r,
      oninput: o
    },
    "svelte-bmwigf"
  )), ui(s, n), A(e, u), ie();
}
var Ci = /* @__PURE__ */ k('<div><button class="background svelte-1eu1fe8" aria-label="Close modal"></button> <div class="content-container svelte-1eu1fe8"><div class="close-button svelte-1eu1fe8"><!></div> <!></div></div>');
function Ri(e, t) {
  re(t, !0);
  let n = z(t, "open", 15);
  Rt(() => (addEventListener("keydown", r), () => {
    removeEventListener("keydown", r);
  }));
  const r = (v) => {
    v.key === "Escape" && a();
  }, a = () => {
    n(!1);
  };
  var i = Ci(), l = P(i);
  l.__click = a;
  var o = G(l, 2), u = P(o), s = P(u);
  pt(s, {
    onclick: a,
    size: "fill",
    children: (v, c) => {
      var d = gt("X");
      A(v, d);
    },
    $$slots: { default: !0 }
  });
  var f = G(u, 2);
  _e(f, () => t.children ?? Ke), U(() => B(i, 1, `container ${n() ? "open" : ""}`, "svelte-1eu1fe8")), A(e, i), ie();
}
ve(["click"]);
var ki = /* @__PURE__ */ k('<div class="page svelte-eomzmq"><div class="content svelte-eomzmq"><!></div></div>'), Di = /* @__PURE__ */ k("<div></div>"), Mi = /* @__PURE__ */ k('<div class="container svelte-eomzmq"><div class="page-container svelte-eomzmq"><!> <div class="footer svelte-eomzmq"><!> <!> <!></div></div></div>');
function Aa(e, t) {
  re(t, !0);
  let n = z(t, "open", 15), r = z(t, "currentPage", 15), a = z(t, "height", 3, "60vh"), i = z(t, "width", 3, "70vw");
  Rt(() => {
    (r() < 0 || r() >= t.numPages) && (console.error(`Page ${r()} is not a valid page number!`), r(0));
  });
  const l = () => {
    t.allowWrapping ? r((r() + 1) % t.numPages) : r(Math.min(t.numPages - 1, r() + 1));
  }, o = () => {
    t.allowWrapping ? (r(r() - 1), r() < 0 && r(t.numPages - 1)) : r(Math.max(0, r() - 1));
  };
  Ri(e, {
    get open() {
      return n();
    },
    set open(u) {
      n(u);
    },
    children: (u, s) => {
      var f = Mi(), v = P(f), c = P(v);
      mt(c, 17, () => ({ length: t.numPages }), bt, (b, m, E) => {
        var C = ki(), T = P(C), R = P(T);
        _e(R, () => t.content, () => E), A(b, C);
      });
      var d = G(c, 2), h = P(d);
      const y = /* @__PURE__ */ W(() => r() === 0);
      pt(h, {
        size: "small",
        onclick: o,
        get disabled() {
          return w(y);
        },
        children: (b, m) => {
          Et(b, { icon: "left-arrow" });
        },
        $$slots: { default: !0 }
      });
      var p = G(h, 2);
      mt(p, 17, () => ({ length: t.numPages }), bt, (b, m, E) => {
        var C = Di();
        U(() => B(C, 1, `dot ${r() === E ? "highlighted" : ""}`, "svelte-eomzmq")), A(b, C);
      });
      var g = G(p, 2);
      const _ = /* @__PURE__ */ W(() => r() === t.numPages - 1);
      pt(g, {
        size: "small",
        onclick: l,
        get disabled() {
          return w(_);
        },
        children: (b, m) => {
          Et(b, { icon: "right-arrow" });
        },
        $$slots: { default: !0 }
      }), U(() => rt(f, `--height: ${a()}; --width: ${i()}; --position: ${r()}`)), A(u, f);
    },
    $$slots: { default: !0 }
  }), ie();
}
const Ye = class Ye {
  constructor(t, n, r) {
    $(this, "durationMs");
    $(this, "remainingMs");
    $(this, "targetEndpoint");
    $(this, "alert");
    $(this, "update");
    $(this, "timeoutID");
    this.durationMs = t, this.remainingMs = t, this.alert = n, this.update = r;
  }
  start() {
    this.timeoutID != null || this.remainingMs === 0 || (this.targetEndpoint = Date.now() + this.durationMs, this.tick());
  }
  reset() {
    var t;
    clearTimeout(this.timeoutID), this.timeoutID = void 0, this.targetEndpoint = void 0, this.remainingMs = this.durationMs, (t = this.update) == null || t.call(this, this.remainingMs);
  }
  stop() {
    clearTimeout(this.timeoutID), this.timeoutID = void 0;
  }
  tick() {
    this.timeoutID = setTimeout(() => {
      var t;
      if (this.targetEndpoint) {
        if (this.remainingMs = Math.max(this.targetEndpoint - Date.now(), 0), (t = this.update) == null || t.call(this, this.remainingMs), this.remainingMs === 0) {
          this.stop(), this.alert();
          return;
        }
        this.tick();
      }
    }, Ye.tickRate);
  }
};
$(Ye, "tickRate", 100);
let Be = Ye;
var Ni = /* @__PURE__ */ k('<p class="title svelte-12hdnlf"> </p>'), Oi = /* @__PURE__ */ k('<div><button class="close-button svelte-12hdnlf">&#10006;</button> <!> <p class="message svelte-12hdnlf"> </p> <div></div></div>');
function Ta(e, t) {
  re(t, !0);
  let n = z(t, "duration", 3, 15e3), r = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ W(() => `container ${t.level} ${w(r) ? "transition-out" : ""}`), i = /* @__PURE__ */ L(100), l = /* @__PURE__ */ L(void 0);
  const o = () => {
    N(r, !0), N(l, setTimeout(t.close, 1e3), !0);
  }, u = (g) => {
    N(i, g / n() * 100);
  };
  let s = new Be(n(), o, u);
  s.start(), Qt(() => {
    s.stop(), clearTimeout(w(l));
  });
  var f = Oi(), v = P(f);
  v.__click = o;
  var c = G(v, 2);
  {
    var d = (g) => {
      var _ = Ni(), b = P(_);
      U(() => Ae(b, t.title)), A(g, _);
    };
    Z(c, (g) => {
      t.title && g(d);
    });
  }
  var h = G(c, 2), y = P(h), p = G(h, 2);
  U(() => {
    B(f, 1, Ge(w(a)), "svelte-12hdnlf"), Ae(y, t.message), B(p, 1, `timer ${w(i) > 0 ? "visible" : ""} ${t.level}`, "svelte-12hdnlf"), rt(p, `width: ${w(i)}%; transition-duration: ${Be.tickRate}ms`);
  }), A(e, f), ie();
}
ve(["click"]);
mr();
var Li = /* @__PURE__ */ k('<div class="container"></div>');
function Pa(e) {
  var t = Li();
  A(e, t);
}
var Ui = /* @__PURE__ */ k('<div class="timer svelte-j9s6cv"></div>'), xi = /* @__PURE__ */ k('<div class="container svelte-j9s6cv"><!></div>');
function Sa(e, t) {
  re(t, !0);
  let n = /* @__PURE__ */ L(100), r;
  Rt(() => {
    if (!t.until) return;
    const o = () => {
      const u = (/* @__PURE__ */ new Date()).getTime(), s = new Date(t.until).getTime(), f = Math.max(0, s - u);
      N(n, f / 5e3 * 100), f <= 0 && (clearInterval(r), N(n, 0));
    };
    return o(), r = setInterval(o, 50), () => clearInterval(r);
  });
  var a = xi(), i = P(a);
  {
    var l = (o) => {
      var u = Ui();
      U(() => rt(u, `--progress: ${w(n)}%`)), A(o, u);
    };
    Z(i, (o) => {
      t.until && o(l);
    });
  }
  A(e, a), ie();
}
var qi = /* @__PURE__ */ ke('<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"></path>'), zi = /* @__PURE__ */ ke('<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>'), Fi = /* @__PURE__ */ ke('<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>', 1), Hi = /* @__PURE__ */ ke('<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>'), ji = /* @__PURE__ */ ke('<svg class="container svelte-1uo3blq" fill="currentColor" viewBox="0 0 16 16"><!></svg>');
function Et(e, t) {
  var n = ji(), r = P(n);
  {
    var a = (l) => {
      var o = qi();
      A(l, o);
    }, i = (l, o) => {
      {
        var u = (f) => {
          var v = zi();
          A(f, v);
        }, s = (f, v) => {
          {
            var c = (h) => {
              var y = Fi();
              A(h, y);
            }, d = (h, y) => {
              {
                var p = (g) => {
                  var _ = Hi();
                  A(g, _);
                };
                Z(
                  h,
                  (g) => {
                    t.icon === "hamburger" && g(p);
                  },
                  y
                );
              }
            };
            Z(
              f,
              (h) => {
                t.icon === "account" ? h(c) : h(d, !1);
              },
              v
            );
          }
        };
        Z(
          l,
          (f) => {
            t.icon === "right-arrow" ? f(u) : f(s, !1);
          },
          o
        );
      }
    };
    Z(r, (l) => {
      t.icon === "left-arrow" ? l(a) : l(i, !1);
    });
  }
  A(e, n);
}
const Vi = (e, t) => {
  t(!1);
};
var Gi = /* @__PURE__ */ k('<div class="sidebar-container svelte-1l8lrat"><div><!></div></div>  <div aria-label="Close sidebar"></div>', 1);
function Ia(e, t) {
  re(t, !0);
  let n = z(t, "open", 15), r = /* @__PURE__ */ W(() => n() ? "open" : "");
  var a = Gi(), i = ln(a), l = P(i), o = P(l);
  _e(o, () => t.children);
  var u = G(i, 2);
  u.__click = [Vi, n], U(() => {
    B(l, 1, `sidebar ${w(r)}`, "svelte-1l8lrat"), B(u, 1, `overlay ${w(r)}`, "svelte-1l8lrat");
  }), A(e, a), ie();
}
ve(["click"]);
var Wi = /* @__PURE__ */ k("<span></span>");
function Bi(e, t) {
  let n = z(t, "theme", 3, "primary");
  var r = Wi();
  U(() => B(r, 1, `spinner ${n()}`, "svelte-mrl5rx")), A(e, r);
}
var Yi = /* @__PURE__ */ k("<button> </button>"), Ki = /* @__PURE__ */ k('<div class="container svelte-1dkt1gc"><div class="tabs svelte-1dkt1gc"></div> <div class="content"><!></div></div>');
function Ca(e, t) {
  re(t, !0);
  let n = /* @__PURE__ */ L(0);
  var r = Ki(), a = P(r);
  mt(a, 21, () => t.items, bt, (o, u, s) => {
    var f = Yi();
    f.__click = () => N(n, s, !0);
    var v = P(f);
    U(() => {
      B(f, 1, `tab ${w(n) === s ? "selected" : ""}`, "svelte-1dkt1gc"), Ae(v, w(u).title);
    }), A(o, f);
  });
  var i = G(a, 2), l = P(i);
  _e(l, () => t.items[w(n)].content), A(e, r), ie();
}
ve(["click"]);
const Xi = "auth-data", Zi = (e) => {
  const t = wt.Auth.subdomain, n = wt.Auth.devPort;
  return e !== Nn ? `http://${t}.jeffreycarr.local:${n}` : `https://${t}.jeffreycarr.dev`;
}, Un = (e) => ({
  path: `${Zi(e)}/api/auth/authed-user`,
  method: Nt.GET,
  credentials: "required"
}), xn = async (e) => e.status !== 200 ? null : await e.json(), Ra = async (e, t, n, r) => {
  const a = await On(
    Un(e),
    {
      query: { app: t },
      additionalHeaders: { cookie: `${Xi}=${n}` }
    },
    r
  );
  return console.log(a), xn(a);
}, ka = async (e, t, n) => {
  const r = await On(
    Un(e),
    { query: { app: t } },
    n
  );
  return xn(r);
};
export {
  fa as APP_QUERY_PARAM,
  Xi as AUTH_COOKIE_NAME,
  Mn as App,
  wt as Apps,
  pt as Button,
  sa as CHARACTERS,
  wa as CharacterIcon,
  pi as CharacterToName,
  wi as CharacterToSrc,
  pa as Confetti,
  ya as ExpandButton,
  la as GlobalRoutes,
  Ea as Input,
  Nt as METHODS,
  Ri as Modal,
  Aa as MultiPageModal,
  oa as NOTIFICATION_LEVELS,
  Ta as Notification,
  Pa as NotificationController,
  ca as PATH_QUERY_PARAM,
  Sa as RadialTimer,
  Et as ReactiveIcon,
  Ia as Sidebar,
  Bi as Spinner,
  ua as Stack,
  Ca as TabbedContent,
  Ra as backendGetUser,
  da as devEnvironment,
  aa as friendlyPrintDate,
  ba as generateGreeting,
  Ln as generateRandomInt,
  yt as generateRandomNumber,
  ma as generateUUID,
  ha as getAppURL,
  na as getDaysInMonth,
  ta as getFirstDayOfMonth,
  ra as getMonthName,
  yi as getRandomElement,
  Ei as getRandomHexColor,
  ka as getUser,
  ea as getUserLocale,
  ia as getWeekdayName,
  va as isValidApp,
  On as makeRequest,
  _a as ping,
  Nn as prodEnvironment,
  $i as resizeObserver,
  ga as sleep
};
