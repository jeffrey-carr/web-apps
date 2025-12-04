var zn = Object.defineProperty;
var Fn = (e, t, n) => t in e ? zn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var B = (e, t, n) => Fn(e, typeof t != "symbol" ? t + "" : t, n);
import { onDestroy as tn } from "svelte";
const Hn = "5";
var en;
typeof window < "u" && ((en = window.__svelte ?? (window.__svelte = {})).v ?? (en.v = /* @__PURE__ */ new Set())).add(Hn);
const Pt = 1, St = 2, nn = 4, jn = 8, Vn = 16, Gn = 1, Wn = 2, Bn = 4, Yn = 8, Kn = 16, Xn = 1, Zn = 2, z = Symbol(), Jn = "http://www.w3.org/1999/xhtml", jt = !1;
var It = Array.isArray, Qn = Array.prototype.indexOf, rn = Array.from, $n = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, er = Object.getOwnPropertyDescriptors, tr = Object.prototype, nr = Array.prototype, an = Object.getPrototypeOf;
const Ze = () => {
};
function rr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
const Y = 2, ln = 4, Je = 8, Ct = 16, te = 32, Se = 64, ze = 128, V = 256, Fe = 512, H = 1024, Q = 2048, ve = 4096, ee = 8192, Qe = 16384, ir = 32768, $e = 65536, ar = 1 << 17, lr = 1 << 19, un = 1 << 20, _t = 1 << 21, pe = Symbol("$state"), ur = Symbol("legacy props"), or = Symbol("");
function sr(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function fr() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function cr(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function vr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function dr(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function _r() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function hr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function gr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let br = !1, Ie = !1, mr = !1;
function wr() {
  Ie = !0;
}
function fe(e) {
  if (typeof e != "object" || e === null || pe in e)
    return e;
  const t = an(e);
  if (t !== tr && t !== nr)
    return e;
  var n = /* @__PURE__ */ new Map(), r = It(e), a = /* @__PURE__ */ L(0), i = I, l = (s) => {
    var u = I;
    $(i);
    var o = s();
    return $(u), o;
  };
  return r && n.set("length", /* @__PURE__ */ L(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(s, u, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && _r();
        var f = n.get(u);
        return f === void 0 ? (f = l(() => /* @__PURE__ */ L(o.value)), n.set(u, f)) : k(
          f,
          l(() => fe(o.value))
        ), !0;
      },
      deleteProperty(s, u) {
        var o = n.get(u);
        if (o === void 0)
          u in s && (n.set(
            u,
            l(() => /* @__PURE__ */ L(z))
          ), ot(a));
        else {
          if (r && typeof u == "string") {
            var f = (
              /** @type {Source<number>} */
              n.get("length")
            ), c = Number(u);
            Number.isInteger(c) && c < f.v && k(f, c);
          }
          k(o, z), ot(a);
        }
        return !0;
      },
      get(s, u, o) {
        var _;
        if (u === pe)
          return e;
        var f = n.get(u), c = u in s;
        if (f === void 0 && (!c || (_ = Le(s, u)) != null && _.writable) && (f = l(() => /* @__PURE__ */ L(fe(c ? s[u] : z))), n.set(u, f)), f !== void 0) {
          var v = y(f);
          return v === z ? void 0 : v;
        }
        return Reflect.get(s, u, o);
      },
      getOwnPropertyDescriptor(s, u) {
        var o = Reflect.getOwnPropertyDescriptor(s, u);
        if (o && "value" in o) {
          var f = n.get(u);
          f && (o.value = y(f));
        } else if (o === void 0) {
          var c = n.get(u), v = c == null ? void 0 : c.v;
          if (c !== void 0 && v !== z)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return o;
      },
      has(s, u) {
        var v;
        if (u === pe)
          return !0;
        var o = n.get(u), f = o !== void 0 && o.v !== z || Reflect.has(s, u);
        if (o !== void 0 || C !== null && (!f || (v = Le(s, u)) != null && v.writable)) {
          o === void 0 && (o = l(() => /* @__PURE__ */ L(f ? fe(s[u]) : z)), n.set(u, o));
          var c = y(o);
          if (c === z)
            return !1;
        }
        return f;
      },
      set(s, u, o, f) {
        var g;
        var c = n.get(u), v = u in s;
        if (r && u === "length")
          for (var _ = o; _ < /** @type {Source<number>} */
          c.v; _ += 1) {
            var d = n.get(_ + "");
            d !== void 0 ? k(d, z) : _ in s && (d = l(() => /* @__PURE__ */ L(z)), n.set(_ + "", d));
          }
        c === void 0 ? (!v || (g = Le(s, u)) != null && g.writable) && (c = l(() => /* @__PURE__ */ L(void 0)), k(
          c,
          l(() => fe(o))
        ), n.set(u, c)) : (v = c.v !== z, k(
          c,
          l(() => fe(o))
        ));
        var E = Reflect.getOwnPropertyDescriptor(s, u);
        if (E != null && E.set && E.set.call(f, o), !v) {
          if (r && typeof u == "string") {
            var p = (
              /** @type {Source<number>} */
              n.get("length")
            ), b = Number(u);
            Number.isInteger(b) && b >= p.v && k(p, b + 1);
          }
          ot(a);
        }
        return !0;
      },
      ownKeys(s) {
        y(a);
        var u = Reflect.ownKeys(s).filter((c) => {
          var v = n.get(c);
          return v === void 0 || v.v !== z;
        });
        for (var [o, f] of n)
          f.v !== z && !(o in s) && u.push(o);
        return u;
      },
      setPrototypeOf() {
        hr();
      }
    }
  );
}
function ot(e, t = 1) {
  k(e, e.v + t);
}
var pr, yr, Er;
function Rt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function re(e) {
  return yr.call(e);
}
// @__NO_SIDE_EFFECTS__
function et(e) {
  return Er.call(e);
}
function P(e, t) {
  return /* @__PURE__ */ re(e);
}
function Ar(e, t) {
  {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ re(
        /** @type {Node} */
        e
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ et(n) : n;
  }
}
function W(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ et(r);
  return r;
}
function Tr(e) {
  e.textContent = "";
}
function on(e) {
  return e === this.v;
}
function Pr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function kt(e) {
  return !Pr(e, this.v);
}
// @__NO_SIDE_EFFECTS__
function ye(e) {
  var t = Y | Q, n = I !== null && (I.f & Y) !== 0 ? (
    /** @type {Derived} */
    I
  ) : null;
  return C === null || n !== null && (n.f & V) !== 0 ? t |= V : C.f |= un, {
    ctx: D,
    deps: null,
    effects: null,
    equals: on,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: n ?? C
  };
}
// @__NO_SIDE_EFFECTS__
function J(e) {
  const t = /* @__PURE__ */ ye(e);
  return wn(t), t;
}
// @__NO_SIDE_EFFECTS__
function sn(e) {
  const t = /* @__PURE__ */ ye(e);
  return t.equals = kt, t;
}
function fn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      de(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Sr(e) {
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
function cn(e) {
  var t, n = C;
  le(Sr(e));
  try {
    fn(e), t = An(e);
  } finally {
    le(n);
  }
  return t;
}
function vn(e) {
  var t = cn(e), n = (ie || (e.f & V) !== 0) && e.deps !== null ? ve : H;
  K(e, n), e.equals(t) || (e.v = t, e.wv = yn());
}
function Ir(e) {
  C === null && I === null && cr(), I !== null && (I.f & V) !== 0 && C === null && fr(), Re && sr();
}
function Cr(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Ce(e, t, n, r = !0) {
  var a = C, i = {
    ctx: D,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | Q,
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
      Nt(i), i.f |= ir;
    } catch (u) {
      throw de(i), u;
    }
  else t !== null && it(i);
  var l = n && i.deps === null && i.first === null && i.nodes_start === null && i.teardown === null && (i.f & (un | ze)) === 0;
  if (!l && r && (a !== null && Cr(i, a), I !== null && (I.f & Y) !== 0)) {
    var s = (
      /** @type {Derived} */
      I
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return i;
}
function Rr(e) {
  const t = Ce(Je, null, !1);
  return K(t, H), t.teardown = e, t;
}
function Dt(e) {
  Ir();
  var t = C !== null && (C.f & te) !== 0 && D !== null && !D.m;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      D
    );
    (n.e ?? (n.e = [])).push({
      fn: e,
      effect: C,
      reaction: I
    });
  } else {
    var r = Mt(e);
    return r;
  }
}
function Mt(e) {
  return Ce(ln, e, !1);
}
function dn(e) {
  return Ce(Je, e, !0);
}
function U(e, t = [], n = ye) {
  const r = t.map(n);
  return tt(() => e(...r.map(y)));
}
function tt(e, t = 0) {
  return Ce(Je | Ct | t, e, !0);
}
function Ee(e, t = !0) {
  return Ce(Je | te, e, !0, t);
}
function _n(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Re, r = I;
    Vt(!0), $(null);
    try {
      t.call(null);
    } finally {
      Vt(n), $(r);
    }
  }
}
function hn(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    var r = n.next;
    (n.f & Se) !== 0 ? n.parent = null : de(n, t), n = r;
  }
}
function kr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & te) === 0 && de(t), t = n;
  }
}
function de(e, t = !0) {
  var n = !1;
  (t || (e.f & lr) !== 0) && e.nodes_start !== null && (Dr(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), n = !0), hn(e, t && !n), We(e, 0), K(e, Qe);
  var r = e.transitions;
  if (r !== null)
    for (const i of r)
      i.stop();
  _n(e);
  var a = e.parent;
  a !== null && a.first !== null && gn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = null;
}
function Dr(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ et(e)
    );
    e.remove(), e = n;
  }
}
function gn(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function ht(e, t) {
  var n = [];
  Ot(e, n, !0), bn(n, () => {
    de(e), t && t();
  });
}
function bn(e, t) {
  var n = e.length;
  if (n > 0) {
    var r = () => --n || t();
    for (var a of e)
      a.out(r);
  } else
    t();
}
function Ot(e, t, n) {
  if ((e.f & ee) === 0) {
    if (e.f ^= ee, e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || n) && t.push(l);
    for (var r = e.first; r !== null; ) {
      var a = r.next, i = (r.f & $e) !== 0 || (r.f & te) !== 0;
      Ot(r, t, i ? n : !1), r = a;
    }
  }
}
function He(e) {
  mn(e, !0);
}
function mn(e, t) {
  if ((e.f & ee) !== 0) {
    e.f ^= ee, (e.f & H) === 0 && (e.f ^= H), ke(e) && (K(e, Q), it(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, a = (n.f & $e) !== 0 || (n.f & te) !== 0;
      mn(n, a ? t : !1), n = r;
    }
    if (e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || t) && i.in();
  }
}
let je = [];
function Mr() {
  var e = je;
  je = [], rr(e);
}
function nt(e) {
  je.length === 0 && queueMicrotask(Mr), je.push(e);
}
let Ue = !1, gt = !1, Ve = null, ce = !1, Re = !1;
function Vt(e) {
  Re = e;
}
let xe = [];
let I = null, X = !1;
function $(e) {
  I = e;
}
let C = null;
function le(e) {
  C = e;
}
let q = null;
function wn(e) {
  I !== null && I.f & _t && (q === null ? q = [e] : q.push(e));
}
let N = null, j = 0, G = null;
function Or(e) {
  G = e;
}
let pn = 1, Ge = 0, ie = !1;
function yn() {
  return ++pn;
}
function ke(e) {
  var c;
  var t = e.f;
  if ((t & Q) !== 0)
    return !0;
  if ((t & ve) !== 0) {
    var n = e.deps, r = (t & V) !== 0;
    if (n !== null) {
      var a, i, l = (t & Fe) !== 0, s = r && C !== null && !ie, u = n.length;
      if (l || s) {
        var o = (
          /** @type {Derived} */
          e
        ), f = o.parent;
        for (a = 0; a < u; a++)
          i = n[a], (l || !((c = i == null ? void 0 : i.reactions) != null && c.includes(o))) && (i.reactions ?? (i.reactions = [])).push(o);
        l && (o.f ^= Fe), s && f !== null && (f.f & V) === 0 && (o.f ^= V);
      }
      for (a = 0; a < u; a++)
        if (i = n[a], ke(
          /** @type {Derived} */
          i
        ) && vn(
          /** @type {Derived} */
          i
        ), i.wv > e.wv)
          return !0;
    }
    (!r || C !== null && !ie) && K(e, H);
  }
  return !1;
}
function Nr(e, t) {
  for (var n = t; n !== null; ) {
    if ((n.f & ze) !== 0)
      try {
        n.fn(e);
        return;
      } catch {
        n.f ^= ze;
      }
    n = n.parent;
  }
  throw Ue = !1, e;
}
function Gt(e) {
  return (e.f & Qe) === 0 && (e.parent === null || (e.parent.f & ze) === 0);
}
function rt(e, t, n, r) {
  if (Ue) {
    if (n === null && (Ue = !1), Gt(t))
      throw e;
    return;
  }
  if (n !== null && (Ue = !0), Nr(e, t), Gt(t))
    throw e;
}
function En(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null)
    for (var a = 0; a < r.length; a++) {
      var i = r[a];
      q != null && q.includes(e) || ((i.f & Y) !== 0 ? En(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? K(i, Q) : (i.f & H) !== 0 && K(i, ve), it(
        /** @type {Effect} */
        i
      )));
    }
}
function An(e) {
  var _;
  var t = N, n = j, r = G, a = I, i = ie, l = q, s = D, u = X, o = e.f;
  N = /** @type {null | Value[]} */
  null, j = 0, G = null, ie = (o & V) !== 0 && (X || !ce || I === null), I = (o & (te | Se)) === 0 ? e : null, q = null, Wt(e.ctx), X = !1, Ge++, e.f |= _t;
  try {
    var f = (
      /** @type {Function} */
      (0, e.fn)()
    ), c = e.deps;
    if (N !== null) {
      var v;
      if (We(e, j), c !== null && j > 0)
        for (c.length = j + N.length, v = 0; v < N.length; v++)
          c[j + v] = N[v];
      else
        e.deps = c = N;
      if (!ie)
        for (v = j; v < c.length; v++)
          ((_ = c[v]).reactions ?? (_.reactions = [])).push(e);
    } else c !== null && j < c.length && (We(e, j), c.length = j);
    if (De() && G !== null && !X && c !== null && (e.f & (Y | ve | Q)) === 0)
      for (v = 0; v < /** @type {Source[]} */
      G.length; v++)
        En(
          G[v],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (Ge++, G !== null && (r === null ? r = G : r.push(.../** @type {Source[]} */
    G))), f;
  } finally {
    N = t, j = n, G = r, I = a, ie = i, q = l, Wt(s), X = u, e.f ^= _t;
  }
}
function Lr(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Qn.call(n, e);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = t.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  n === null && (t.f & Y) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (N === null || !N.includes(t)) && (K(t, ve), (t.f & (V | Fe)) === 0 && (t.f ^= Fe), fn(
    /** @type {Derived} **/
    t
  ), We(
    /** @type {Derived} **/
    t,
    0
  ));
}
function We(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Lr(e, n[r]);
}
function Nt(e) {
  var t = e.f;
  if ((t & Qe) === 0) {
    K(e, H);
    var n = C, r = D, a = ce;
    C = e, ce = !0;
    try {
      (t & Ct) !== 0 ? kr(e) : hn(e), _n(e);
      var i = An(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = pn;
      var l = e.deps, s;
      jt && mr && e.f & Q;
    } catch (u) {
      rt(u, e, n, r || e.ctx);
    } finally {
      ce = a, C = n;
    }
  }
}
function Ur() {
  try {
    vr();
  } catch (e) {
    if (Ve !== null)
      rt(e, Ve, null);
    else
      throw e;
  }
}
function xr() {
  var e = ce;
  try {
    var t = 0;
    for (ce = !0; xe.length > 0; ) {
      t++ > 1e3 && Ur();
      var n = xe, r = n.length;
      xe = [];
      for (var a = 0; a < r; a++) {
        var i = zr(n[a]);
        qr(i);
      }
      Ae.clear();
    }
  } finally {
    gt = !1, ce = e, Ve = null;
  }
}
function qr(e) {
  var t = e.length;
  if (t !== 0)
    for (var n = 0; n < t; n++) {
      var r = e[n];
      if ((r.f & (Qe | ee)) === 0)
        try {
          ke(r) && (Nt(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? gn(r) : r.fn = null));
        } catch (a) {
          rt(a, r, null, r.ctx);
        }
    }
}
function it(e) {
  gt || (gt = !0, queueMicrotask(xr));
  for (var t = Ve = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if ((n & (Se | te)) !== 0) {
      if ((n & H) === 0) return;
      t.f ^= H;
    }
  }
  xe.push(t);
}
function zr(e) {
  for (var t = [], n = e; n !== null; ) {
    var r = n.f, a = (r & (te | Se)) !== 0, i = a && (r & H) !== 0;
    if (!i && (r & ee) === 0) {
      if ((r & ln) !== 0)
        t.push(n);
      else if (a)
        n.f ^= H;
      else
        try {
          ke(n) && Nt(n);
        } catch (u) {
          rt(u, n, null, n.ctx);
        }
      var l = n.first;
      if (l !== null) {
        n = l;
        continue;
      }
    }
    var s = n.parent;
    for (n = n.next; n === null && s !== null; )
      n = s.next, s = s.parent;
  }
  return t;
}
function y(e) {
  var t = e.f, n = (t & Y) !== 0;
  if (I !== null && !X) {
    if (!(q != null && q.includes(e))) {
      var r = I.deps;
      e.rv < Ge && (e.rv = Ge, N === null && r !== null && r[j] === e ? j++ : N === null ? N = [e] : (!ie || !N.includes(e)) && N.push(e));
    }
  } else if (n && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var a = (
      /** @type {Derived} */
      e
    ), i = a.parent;
    i !== null && (i.f & V) === 0 && (a.f ^= V);
  }
  return n && (a = /** @type {Derived} */
  e, ke(a) && vn(a)), Re && Ae.has(e) ? Ae.get(e) : e.v;
}
function Be(e) {
  var t = X;
  try {
    return X = !0, e();
  } finally {
    X = t;
  }
}
const Fr = -7169;
function K(e, t) {
  e.f = e.f & Fr | t;
}
const Ae = /* @__PURE__ */ new Map();
function Te(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: on,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function L(e, t) {
  const n = Te(e);
  return wn(n), n;
}
// @__NO_SIDE_EFFECTS__
function Tn(e, t = !1) {
  var r;
  const n = Te(e);
  return t || (n.equals = kt), Ie && D !== null && D.l !== null && ((r = D.l).s ?? (r.s = [])).push(n), n;
}
function k(e, t, n = !1) {
  I !== null && !X && De() && (I.f & (Y | Ct)) !== 0 && !(q != null && q.includes(e)) && gr();
  let r = n ? fe(t) : t;
  return bt(e, r);
}
function bt(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    Re ? Ae.set(e, t) : Ae.set(e, n), e.v = t, (e.f & Y) !== 0 && ((e.f & Q) !== 0 && cn(
      /** @type {Derived} */
      e
    ), K(e, (e.f & V) === 0 ? H : ve)), e.wv = yn(), Pn(e, Q), De() && C !== null && (C.f & H) !== 0 && (C.f & (te | Se)) === 0 && (G === null ? Or([e]) : G.push(e));
  }
  return t;
}
function Pn(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = De(), a = n.length, i = 0; i < a; i++) {
      var l = n[i], s = l.f;
      (s & Q) === 0 && (!r && l === C || (K(l, t), (s & (H | V)) !== 0 && ((s & Y) !== 0 ? Pn(
        /** @type {Derived} */
        l,
        ve
      ) : it(
        /** @type {Effect} */
        l
      ))));
    }
}
let D = null;
function Wt(e) {
  D = e;
}
function ue(e, t = !1, n) {
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
  Ie && !t && (D.l = {
    s: null,
    u: null,
    r1: [],
    r2: Te(!1)
  }), Rr(() => {
    r.d = !0;
  });
}
function oe(e) {
  const t = D;
  if (t !== null) {
    const l = t.e;
    if (l !== null) {
      var n = C, r = I;
      t.e = null;
      try {
        for (var a = 0; a < l.length; a++) {
          var i = l[a];
          le(i.effect), $(i.reaction), Mt(i.fn);
        }
      } finally {
        le(n), $(r);
      }
    }
    D = t.p, t.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function De() {
  return !Ie || D !== null && D.l === null;
}
function Hr(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const jr = [
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
function Vr(e) {
  return jr.includes(e);
}
const Gr = {
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
function Wr(e) {
  return e = e.toLowerCase(), Gr[e] ?? e;
}
function Br(e, t) {
  if (t) {
    const n = document.body;
    e.autofocus = !0, nt(() => {
      document.activeElement === n && e.focus();
    });
  }
}
let Bt = !1;
function Yr() {
  Bt || (Bt = !0, document.addEventListener(
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
function Sn(e) {
  var t = I, n = C;
  $(null), le(null);
  try {
    return e();
  } finally {
    $(t), le(n);
  }
}
function Kr(e, t, n, r = n) {
  e.addEventListener(t, () => Sn(n));
  const a = e.__on_r;
  a ? e.__on_r = () => {
    a(), r(!0);
  } : e.__on_r = () => r(!0), Yr();
}
const Xr = /* @__PURE__ */ new Set(), Zr = /* @__PURE__ */ new Set();
function Jr(e, t, n, r = {}) {
  function a(i) {
    if (r.capture || Qr.call(t, i), !i.cancelBubble)
      return Sn(() => n == null ? void 0 : n.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? nt(() => {
    t.addEventListener(e, a, r);
  }) : t.addEventListener(e, a, r), a;
}
function ge(e) {
  for (var t = 0; t < e.length; t++)
    Xr.add(e[t]);
  for (var n of Zr)
    n(e);
}
function Qr(e) {
  var g;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, a = ((g = e.composedPath) == null ? void 0 : g.call(e)) || [], i = (
    /** @type {null | Element} */
    a[0] || e.target
  ), l = 0, s = e.__root;
  if (s) {
    var u = a.indexOf(s);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var o = a.indexOf(t);
    if (o === -1)
      return;
    u <= o && (l = u);
  }
  if (i = /** @type {Element} */
  a[l] || e.target, i !== t) {
    $n(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var f = I, c = C;
    $(null), le(null);
    try {
      for (var v, _ = []; i !== null; ) {
        var d = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var E = i["__" + r];
          if (E != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i))
            if (It(E)) {
              var [p, ...b] = E;
              p.apply(i, [e, ...b]);
            } else
              E.call(i, e);
        } catch (w) {
          v ? _.push(w) : v = w;
        }
        if (e.cancelBubble || d === t || d === null)
          break;
        i = d;
      }
      if (v) {
        for (let w of _)
          queueMicrotask(() => {
            throw w;
          });
        throw v;
      }
    } finally {
      e.__root = t, delete e.currentTarget, $(f), le(c);
    }
  }
}
function In(e) {
  var t = document.createElement("template");
  return t.innerHTML = e, t.content;
}
function Pe(e, t) {
  var n = (
    /** @type {Effect} */
    C
  );
  n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function M(e, t) {
  var n = (t & Zn) !== 0, r, a = !e.startsWith("<!>");
  return () => {
    r === void 0 && (r = In(a ? e : "<!>" + e), r = /** @type {Node} */
    /* @__PURE__ */ re(r));
    var i = (
      /** @type {TemplateNode} */
      n || pr ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    return Pe(i, i), i;
  };
}
// @__NO_SIDE_EFFECTS__
function Me(e, t, n = "svg") {
  var r = !e.startsWith("<!>"), a = (t & Xn) !== 0, i = `<${n}>${r ? e : "<!>" + e}</${n}>`, l;
  return () => {
    if (!l) {
      var s = (
        /** @type {DocumentFragment} */
        In(i)
      ), u = (
        /** @type {Element} */
        /* @__PURE__ */ re(s)
      );
      if (a)
        for (l = document.createDocumentFragment(); /* @__PURE__ */ re(u); )
          l.appendChild(
            /** @type {Node} */
            /* @__PURE__ */ re(u)
          );
      else
        l = /** @type {Element} */
        /* @__PURE__ */ re(u);
    }
    var o = (
      /** @type {TemplateNode} */
      l.cloneNode(!0)
    );
    if (a) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ re(o)
      ), c = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Pe(f, c);
    } else
      Pe(o, o);
    return o;
  };
}
function mt(e = "") {
  {
    var t = Rt(e + "");
    return Pe(t, t), t;
  }
}
function $r() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = Rt();
  return e.append(t, n), Pe(t, n), e;
}
function S(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function he(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = n + "");
}
function Z(e, t, [n, r] = [0, 0]) {
  var a = e, i = null, l = null, s = z, u = n > 0 ? $e : 0, o = !1;
  const f = (v, _ = !0) => {
    o = !0, c(_, v);
  }, c = (v, _) => {
    s !== (s = v) && (s ? (i ? He(i) : _ && (i = Ee(() => _(a))), l && ht(l, () => {
      l = null;
    })) : (l ? He(l) : _ && (l = Ee(() => _(a, [n + 1, r]))), i && ht(i, () => {
      i = null;
    })));
  };
  tt(() => {
    o = !1, t(f), o || c(null, null);
  }, u);
}
function wt(e, t) {
  return t;
}
function ei(e, t, n, r) {
  for (var a = [], i = t.length, l = 0; l < i; l++)
    Ot(t[l].e, a, !0);
  var s = i > 0 && a.length === 0 && n !== null;
  if (s) {
    var u = (
      /** @type {Element} */
      /** @type {Element} */
      n.parentNode
    );
    Tr(u), u.append(
      /** @type {Element} */
      n
    ), r.clear(), ne(e, t[0].prev, t[i - 1].next);
  }
  bn(a, () => {
    for (var o = 0; o < i; o++) {
      var f = t[o];
      s || (r.delete(f.k), ne(e, f.prev, f.next)), de(f.e, !s);
    }
  });
}
function pt(e, t, n, r, a, i = null) {
  var l = e, s = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, u = (t & nn) !== 0;
  if (u) {
    var o = (
      /** @type {Element} */
      e
    );
    l = o.appendChild(Rt());
  }
  var f = null, c = !1, v = /* @__PURE__ */ sn(() => {
    var _ = n();
    return It(_) ? _ : _ == null ? [] : rn(_);
  });
  tt(() => {
    var _ = y(v), d = _.length;
    c && d === 0 || (c = d === 0, ti(_, s, l, a, t, r, n), i !== null && (d === 0 ? f ? He(f) : f = Ee(() => i(l)) : f !== null && ht(f, () => {
      f = null;
    })), y(v));
  });
}
function ti(e, t, n, r, a, i, l) {
  var xt, qt, zt, Ft;
  var s = (a & jn) !== 0, u = (a & (Pt | St)) !== 0, o = e.length, f = t.items, c = t.first, v = c, _, d = null, E, p = [], b = [], g, w, h, m;
  if (s)
    for (m = 0; m < o; m += 1)
      g = e[m], w = i(g, m), h = f.get(w), h !== void 0 && ((xt = h.a) == null || xt.measure(), (E ?? (E = /* @__PURE__ */ new Set())).add(h));
  for (m = 0; m < o; m += 1) {
    if (g = e[m], w = i(g, m), h = f.get(w), h === void 0) {
      var A = v ? (
        /** @type {TemplateNode} */
        v.e.nodes_start
      ) : n;
      d = ri(
        A,
        t,
        d,
        d === null ? t.first : d.next,
        g,
        w,
        m,
        r,
        a,
        l
      ), f.set(w, d), p = [], b = [], v = d.next;
      continue;
    }
    if (u && ni(h, g, m, a), (h.e.f & ee) !== 0 && (He(h.e), s && ((qt = h.a) == null || qt.unfix(), (E ?? (E = /* @__PURE__ */ new Set())).delete(h))), h !== v) {
      if (_ !== void 0 && _.has(h)) {
        if (p.length < b.length) {
          var T = b[0], R;
          d = T.prev;
          var _e = p[0], lt = p[p.length - 1];
          for (R = 0; R < p.length; R += 1)
            Yt(p[R], T, n);
          for (R = 0; R < b.length; R += 1)
            _.delete(b[R]);
          ne(t, _e.prev, lt.next), ne(t, d, _e), ne(t, lt, T), v = T, d = lt, m -= 1, p = [], b = [];
        } else
          _.delete(h), Yt(h, v, n), ne(t, h.prev, h.next), ne(t, h, d === null ? t.first : d.next), ne(t, d, h), d = h;
        continue;
      }
      for (p = [], b = []; v !== null && v.k !== w; )
        (v.e.f & ee) === 0 && (_ ?? (_ = /* @__PURE__ */ new Set())).add(v), b.push(v), v = v.next;
      if (v === null)
        continue;
      h = v;
    }
    p.push(h), d = h, v = h.next;
  }
  if (v !== null || _ !== void 0) {
    for (var be = _ === void 0 ? [] : rn(_); v !== null; )
      (v.e.f & ee) === 0 && be.push(v), v = v.next;
    var ut = be.length;
    if (ut > 0) {
      var qn = (a & nn) !== 0 && o === 0 ? n : null;
      if (s) {
        for (m = 0; m < ut; m += 1)
          (zt = be[m].a) == null || zt.measure();
        for (m = 0; m < ut; m += 1)
          (Ft = be[m].a) == null || Ft.fix();
      }
      ei(t, be, qn, f);
    }
  }
  s && nt(() => {
    var Ht;
    if (E !== void 0)
      for (h of E)
        (Ht = h.a) == null || Ht.apply();
  }), C.first = t.first && t.first.e, C.last = d && d.e;
}
function ni(e, t, n, r) {
  (r & Pt) !== 0 && bt(e.v, t), (r & St) !== 0 ? bt(
    /** @type {Value<number>} */
    e.i,
    n
  ) : e.i = n;
}
function ri(e, t, n, r, a, i, l, s, u, o) {
  var f = (u & Pt) !== 0, c = (u & Vn) === 0, v = f ? c ? /* @__PURE__ */ Tn(a) : Te(a) : a, _ = (u & St) === 0 ? l : Te(l), d = {
    i: _,
    v,
    k: i,
    a: null,
    // @ts-expect-error
    e: null,
    prev: n,
    next: r
  };
  try {
    return d.e = Ee(() => s(e, v, _, o), br), d.e.prev = n && n.e, d.e.next = r && r.e, n === null ? t.first = d : (n.next = d, n.e.next = d.e), r !== null && (r.prev = d, r.e.prev = d.e), d;
  } finally {
  }
}
function Yt(e, t, n) {
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
      /* @__PURE__ */ et(i)
    );
    a.before(i), i = l;
  }
}
function ne(e, t, n) {
  t === null ? e.first = n : (t.next = n, t.e.next = n && n.e), n !== null && (n.prev = t, n.e.prev = t && t.e);
}
function Oe(e, t, ...n) {
  var r = e, a = Ze, i;
  tt(() => {
    a !== (a = t()) && (i && (de(i), i = null), i = Ee(() => (
      /** @type {SnippetFn} */
      a(r, ...n)
    )));
  }, $e);
}
function Cn(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (n = Cn(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function qe() {
  for (var e, t, n = 0, r = "", a = arguments.length; n < a; n++) (e = arguments[n]) && (t = Cn(e)) && (r && (r += " "), r += t);
  return r;
}
function ae(e) {
  return typeof e == "object" ? qe(e) : e ?? "";
}
const Kt = [...` 	
\r\f \v\uFEFF`];
function ii(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (t && (r = r ? r + " " + t : t), n) {
    for (var a in n)
      if (n[a])
        r = r ? r + " " + a : a;
      else if (r.length)
        for (var i = a.length, l = 0; (l = r.indexOf(a, l)) >= 0; ) {
          var s = l + i;
          (l === 0 || Kt.includes(r[l - 1])) && (s === r.length || Kt.includes(r[s])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(s + 1) : l = s;
        }
  }
  return r === "" ? null : r;
}
function Xt(e, t = !1) {
  var n = t ? " !important;" : ";", r = "";
  for (var a in e) {
    var i = e[a];
    i != null && i !== "" && (r += " " + a + ": " + i + n);
  }
  return r;
}
function st(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function ai(e, t) {
  if (t) {
    var n = "", r, a;
    if (Array.isArray(t) ? (r = t[0], a = t[1]) : r = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var i = !1, l = 0, s = !1, u = [];
      r && u.push(...Object.keys(r).map(st)), a && u.push(...Object.keys(a).map(st));
      var o = 0, f = -1;
      const E = e.length;
      for (var c = 0; c < E; c++) {
        var v = e[c];
        if (s ? v === "/" && e[c - 1] === "*" && (s = !1) : i ? i === v && (i = !1) : v === "/" && e[c + 1] === "*" ? s = !0 : v === '"' || v === "'" ? i = v : v === "(" ? l++ : v === ")" && l--, !s && i === !1 && l === 0) {
          if (v === ":" && f === -1)
            f = c;
          else if (v === ";" || c === E - 1) {
            if (f !== -1) {
              var _ = st(e.substring(o, f).trim());
              if (!u.includes(_)) {
                v !== ";" && c++;
                var d = e.substring(o, c).trim();
                n += " " + d + ";";
              }
            }
            o = c + 1, f = -1;
          }
        }
      }
    }
    return r && (n += Xt(r)), a && (n += Xt(a, !0)), n = n.trim(), n === "" ? null : n;
  }
  return e == null ? null : String(e);
}
function F(e, t, n, r, a, i) {
  var l = e.__className;
  if (l !== n || l === void 0) {
    var s = ii(n, r, i);
    s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s), e.__className = n;
  } else if (i && a !== i)
    for (var u in i) {
      var o = !!i[u];
      (a == null || o !== !!a[u]) && e.classList.toggle(u, o);
    }
  return i;
}
function ft(e, t = {}, n, r) {
  for (var a in n) {
    var i = n[a];
    t[a] !== i && (n[a] == null ? e.style.removeProperty(a) : e.style.setProperty(a, i, r));
  }
}
function at(e, t, n, r) {
  var a = e.__style;
  if (a !== t) {
    var i = ai(t, r);
    i == null ? e.removeAttribute("style") : e.style.cssText = i, e.__style = t;
  } else r && (Array.isArray(r) ? (ft(e, n == null ? void 0 : n[0], r[0]), ft(e, n == null ? void 0 : n[1], r[1], "important")) : ft(e, n, r));
  return r;
}
const me = Symbol("class"), we = Symbol("style"), Rn = Symbol("is custom element"), kn = Symbol("is html");
function li(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Ye(e, t, n, r) {
  var a = Dn(e);
  a[t] !== (a[t] = n) && (t === "loading" && (e[or] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Mn(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ui(e, t, n, r, a = !1) {
  var i = Dn(e), l = i[Rn], s = !i[kn], u = t || {}, o = e.tagName === "OPTION";
  for (var f in t)
    f in n || (n[f] = null);
  n.class ? n.class = ae(n.class) : n[me] && (n.class = null), n[we] && (n.style ?? (n.style = null));
  var c = Mn(e);
  for (const g in n) {
    let w = n[g];
    if (o && g === "value" && w == null) {
      e.value = e.__value = "", u[g] = w;
      continue;
    }
    if (g === "class") {
      var v = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      F(e, v, w, r, t == null ? void 0 : t[me], n[me]), u[g] = w, u[me] = n[me];
      continue;
    }
    if (g === "style") {
      at(e, w, t == null ? void 0 : t[we], n[we]), u[g] = w, u[we] = n[we];
      continue;
    }
    var _ = u[g];
    if (w !== _) {
      u[g] = w;
      var d = g[0] + g[1];
      if (d !== "$$")
        if (d === "on") {
          const h = {}, m = "$$" + g;
          let A = g.slice(2);
          var E = Vr(A);
          if (Hr(A) && (A = A.slice(0, -7), h.capture = !0), !E && _) {
            if (w != null) continue;
            e.removeEventListener(A, u[m], h), u[m] = null;
          }
          if (w != null)
            if (E)
              e[`__${A}`] = w, ge([A]);
            else {
              let T = function(R) {
                u[g].call(this, R);
              };
              u[m] = Jr(A, e, T, h);
            }
          else E && (e[`__${A}`] = void 0);
        } else if (g === "style")
          Ye(e, g, w);
        else if (g === "autofocus")
          Br(
            /** @type {HTMLElement} */
            e,
            !!w
          );
        else if (!l && (g === "__value" || g === "value" && w != null))
          e.value = e.__value = w;
        else if (g === "selected" && o)
          li(
            /** @type {HTMLOptionElement} */
            e,
            w
          );
        else {
          var p = g;
          s || (p = Wr(p));
          var b = p === "defaultValue" || p === "defaultChecked";
          if (w == null && !l && !b)
            if (i[g] = null, p === "value" || p === "checked") {
              let h = (
                /** @type {HTMLInputElement} */
                e
              );
              const m = t === void 0;
              if (p === "value") {
                let A = h.defaultValue;
                h.removeAttribute(p), h.defaultValue = A, h.value = h.__value = m ? A : null;
              } else {
                let A = h.defaultChecked;
                h.removeAttribute(p), h.defaultChecked = A, h.checked = m ? A : !1;
              }
            } else
              e.removeAttribute(g);
          else b || c.includes(p) && (l || typeof w != "string") ? e[p] = w : typeof w != "function" && Ye(e, p, w);
        }
    }
  }
  return u;
}
function Dn(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [Rn]: e.nodeName.includes("-"),
      [kn]: e.namespaceURI === Jn
    })
  );
}
var Zt = /* @__PURE__ */ new Map();
function Mn(e) {
  var t = Zt.get(e.nodeName);
  if (t) return t;
  Zt.set(e.nodeName, t = []);
  for (var n, r = e, a = Element.prototype; a !== r; ) {
    n = er(r);
    for (var i in n)
      n[i].set && t.push(i);
    r = an(r);
  }
  return t;
}
function oi(e, t, n = t) {
  var r = De();
  Kr(e, "input", (a) => {
    var i = a ? e.defaultValue : e.value;
    if (i = ct(e) ? vt(i) : i, n(i), r && i !== (i = t())) {
      var l = e.selectionStart, s = e.selectionEnd;
      e.value = i ?? "", s !== null && (e.selectionStart = l, e.selectionEnd = Math.min(s, e.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Be(t) == null && e.value && n(ct(e) ? vt(e.value) : e.value), dn(() => {
    var a = t();
    ct(e) && a === vt(e.value) || e.type === "date" && !a && !e.value || a !== e.value && (e.value = a ?? "");
  });
}
function ct(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function vt(e) {
  return e === "" ? null : +e;
}
function Jt(e, t) {
  return e === t || (e == null ? void 0 : e[pe]) === t;
}
function si(e = {}, t, n, r) {
  return Mt(() => {
    var a, i;
    return dn(() => {
      a = i, i = [], Be(() => {
        e !== n(...i) && (t(e, ...i), a && Jt(n(...a), e) && t(null, ...a));
      });
    }), () => {
      nt(() => {
        i && Jt(n(...i), e) && t(null, ...i);
      });
    };
  }), e;
}
let Ne = !1;
function fi(e) {
  var t = Ne;
  try {
    return Ne = !1, [e(), Ne];
  } finally {
    Ne = t;
  }
}
const ci = {
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
function vi(e, t, n) {
  return new Proxy(
    { props: e, exclude: t },
    ci
  );
}
function Qt(e) {
  var t;
  return ((t = e.ctx) == null ? void 0 : t.d) ?? !1;
}
function x(e, t, n, r) {
  var A;
  var a = (n & Gn) !== 0, i = !Ie || (n & Wn) !== 0, l = (n & Yn) !== 0, s = (n & Kn) !== 0, u = !1, o;
  l ? [o, u] = fi(() => (
    /** @type {V} */
    e[t]
  )) : o = /** @type {V} */
  e[t];
  var f = pe in e || ur in e, c = l && (((A = Le(e, t)) == null ? void 0 : A.set) ?? (f && t in e && ((T) => e[t] = T))) || void 0, v = (
    /** @type {V} */
    r
  ), _ = !0, d = !1, E = () => (d = !0, _ && (_ = !1, s ? v = Be(
    /** @type {() => V} */
    r
  ) : v = /** @type {V} */
  r), v);
  o === void 0 && r !== void 0 && (c && i && dr(), o = E(), c && c(o));
  var p;
  if (i)
    p = () => {
      var T = (
        /** @type {V} */
        e[t]
      );
      return T === void 0 ? E() : (_ = !0, d = !1, T);
    };
  else {
    var b = (a ? ye : sn)(
      () => (
        /** @type {V} */
        e[t]
      )
    );
    b.f |= ar, p = () => {
      var T = y(b);
      return T !== void 0 && (v = /** @type {V} */
      void 0), T === void 0 ? v : T;
    };
  }
  if ((n & Bn) === 0)
    return p;
  if (c) {
    var g = e.$$legacy;
    return function(T, R) {
      return arguments.length > 0 ? ((!i || !R || g || u) && c(R ? p() : T), T) : p();
    };
  }
  var w = !1, h = /* @__PURE__ */ Tn(o), m = /* @__PURE__ */ ye(() => {
    var T = p(), R = y(h);
    return w ? (w = !1, R) : h.v = T;
  });
  return l && y(m), a || (m.equals = kt), function(T, R) {
    if (arguments.length > 0) {
      const _e = R ? y(m) : i && l ? fe(T) : T;
      if (!m.equals(_e)) {
        if (w = !0, k(h, _e), d && v !== void 0 && (v = _e), Qt(m))
          return T;
        Be(() => y(m));
      }
      return T;
    }
    return Qt(m) ? m.v : y(m);
  };
}
var di = /* @__PURE__ */ M("<div><button><!></button></div>");
function yt(e, t) {
  let n = x(t, "type", 3, "primary"), r = x(t, "size", 3, "fill"), a = x(t, "shape", 3, "rectangular"), i = /* @__PURE__ */ J(() => `container ${r()} ${n()}${t.class ? ` ${t.class}` : ""}`), l = /* @__PURE__ */ J(() => `${n() === "primary" ? "secondary" : "primary"}`), s = /* @__PURE__ */ J(() => `button ${n()} ${a()} ${t.loading ? "loading" : ""}`);
  var u = di(), o = P(u);
  o.__click = function(..._) {
    var d;
    (d = t.onclick) == null || d.apply(this, _);
  };
  var f = P(o);
  {
    var c = (_) => {
      Qi(_, {
        get theme() {
          return y(l);
        }
      });
    }, v = (_) => {
      var d = $r(), E = Ar(d);
      Oe(E, () => t.children ?? Ze), S(_, d);
    };
    Z(f, (_) => {
      t.loading ? _(c) : _(v, !1);
    });
  }
  U(() => {
    F(u, 1, ae(y(i)), "svelte-9axebd"), F(o, 1, ae(y(s)), "svelte-9axebd"), o.disabled = t.disabled || t.loading;
  }), S(e, u);
}
ge(["click"]);
const O = [];
for (let e = 0; e < 256; ++e)
  O.push((e + 256).toString(16).slice(1));
function _i(e, t = 0) {
  return (O[e[t + 0]] + O[e[t + 1]] + O[e[t + 2]] + O[e[t + 3]] + "-" + O[e[t + 4]] + O[e[t + 5]] + "-" + O[e[t + 6]] + O[e[t + 7]] + "-" + O[e[t + 8]] + O[e[t + 9]] + "-" + O[e[t + 10]] + O[e[t + 11]] + O[e[t + 12]] + O[e[t + 13]] + O[e[t + 14]] + O[e[t + 15]]).toLowerCase();
}
let dt;
const hi = new Uint8Array(16);
function gi() {
  if (!dt) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    dt = crypto.getRandomValues.bind(crypto);
  }
  return dt(hi);
}
const bi = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), $t = { randomUUID: bi };
function mi(e, t, n) {
  var a;
  e = e || {};
  const r = e.random ?? ((a = e.rng) == null ? void 0 : a.call(e)) ?? gi();
  if (r.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, _i(r);
}
function wi(e, t, n) {
  return $t.randomUUID ? $t.randomUUID() : mi(e);
}
const aa = (e, t) => {
  const n = new ResizeObserver((r) => {
    for (let a of r) {
      const { height: i, width: l } = a.contentRect;
      t(i, l);
    }
  });
  n.observe(e), tn(() => {
    n.disconnect();
  });
}, la = (e) => {
  if (e)
    return e.navigator.language;
}, ua = (e, t) => new Date(e, t).getDay(), oa = (e, t) => new Date(e, t % 12, 0).getDate(), sa = (e, t, n) => new Date(e, t).toLocaleString(n ?? "en-US", { month: "long" }), fa = (e, t, n, r) => new Date(e, t, n).toLocaleString(r ?? "en-US", { weekday: "long" }), ca = (e, t, n, r, a = !0) => {
  const i = new Date(2025, t, n), l = i.toLocaleDateString(r ?? "en-US", { day: "numeric" }), s = i.toLocaleDateString(r ?? "en-US", { month: "long" }), u = l.endsWith("1") && l !== "11" ? "st" : l.endsWith("2") && l !== "12" ? "nd" : l.endsWith("3") && l !== "13" ? "rd" : "th";
  let o = "";
  return a && (o += `, ${e}`), `${s} ${l}${u}${o}`;
};
var Lt = /* @__PURE__ */ ((e) => (e.GET = "GET", e.POST = "POST", e.PUT = "PUT", e))(Lt || {});
const va = {
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
class Ut extends Error {
  constructor(n, r, a) {
    super(r);
    B(this, "status");
    B(this, "data");
    this.status = n, this.data = a, Object.setPrototypeOf(this, Ut.prototype);
  }
}
const da = ["info", "warning", "error", "success"];
class _a {
  constructor() {
    B(this, "items", []);
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
const ha = [
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
}, yi = {
  "???": new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/unknown.png"),
  ctrlzilla: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/ctrlzilla.png"),
  wandaconda: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/wandaconda.png"),
  eyezac_screamalot: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/eyezac_screamalot.png"),
  waddle_combs: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/waddle_combs.png"),
  glitchard_simmons: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/glitchard_simmons.png"),
  alien_degeneres: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/alien_degeneres.png")
};
var On = /* @__PURE__ */ ((e) => (e.Auth = "Auth", e.Federation = "Federation", e.WebGames = "WebGames", e.Calendar = "Calendar", e))(On || {});
const Et = {
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
}, ga = "app", ba = "path", ma = (e) => Object.values(On).includes(e), wa = "dev", Nn = "prod", Ln = async (e, t = {}, n = fetch) => {
  let r = {};
  e.method === Lt.POST && (r["Content-Type"] = "application/json"), r = { ...r, ...t == null ? void 0 : t.additionalHeaders };
  let a = "";
  if (t != null && t.query) {
    const o = Object.keys((t == null ? void 0 : t.query) ?? {});
    for (let f = 0; f < o.length; f++) {
      const c = o[f];
      a += `${f > 0 ? "&" : ""}${c}=${t.query[c]}`;
    }
  }
  let i = e.path;
  a.length > 0 && (i += `?${a}`);
  let l;
  t != null && t.body && (l = JSON.stringify(t.body));
  let s = "include";
  e.credentials === "none" && (s = "omit");
  let u = await n(i, {
    method: e.method,
    credentials: s,
    headers: r,
    body: l
  });
  if (u.status !== 200) {
    const o = await u.json();
    throw new Ut(u.status, o.message, o.data);
  }
  return await u.json();
}, pa = (e, t) => {
  const n = Et[t];
  return n ? e === Nn ? `https://${n.subdomain}.jeffreycarr.dev` : `http://${n.subdomain}.jeffreycarr.local:${n.devPort}` : "";
}, ya = () => "pong!", Ea = (e) => new Promise((t) => setTimeout(t, e)), At = (e, t) => (t == null && (t = e, e = 0), Math.random() * t + e), Un = (e, t) => Math.floor(At(e, t)), Ei = (e) => {
  const t = Un(e.length);
  return e[t];
}, Ai = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`, Aa = () => Ei([
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
]), Ta = () => wi();
var Ti = /* @__PURE__ */ M('<div class="container svelte-1yz8bgp"><canvas class="canvas svelte-1yz8bgp"></canvas></div>');
function Pa(e, t) {
  ue(t, !0);
  let n = /* @__PURE__ */ L(null), r = /* @__PURE__ */ J(() => {
    var b;
    return (b = y(n)) == null ? void 0 : b.getContext("2d");
  });
  const a = 2, i = 5, l = 1, s = 1, u = 2, o = 150, f = (b) => {
    if (!y(n) || b <= 0)
      return [];
    const g = y(n).width;
    return [...Array(b)].map(() => ({
      x: At(g),
      y: 0,
      velocity: At(s, u),
      sizePx: Un(a, i),
      color: Ai()
    }));
  };
  let c = f(o);
  const v = (b) => {
    const g = b;
    return g.y = b.y + l * b.velocity, g;
  }, _ = (b, g) => {
    b.beginPath(), b.fillRect(g.x, g.y, g.sizePx, g.sizePx), b.fillStyle = g.color, b.fill();
  }, d = () => {
    if (y(n) == null || !y(r)) {
      requestAnimationFrame(d);
      return;
    }
    y(r).clearRect(0, 0, y(n).width, y(n).height);
    for (const b of c)
      _(y(r), b);
    c = c.map((b) => v(b)), c.length, c = c.filter((b) => {
      var g;
      return b.sizePx > 0 && b.y < (((g = y(n)) == null ? void 0 : g.height) ?? 500);
    }), c.push(...f(o - c.length)), requestAnimationFrame(d);
  };
  d();
  var E = Ti(), p = P(E);
  si(p, (b) => k(n, b), () => y(n)), S(e, E), oe();
}
var Pi = /* @__PURE__ */ M('<div class="container svelte-7fbptt"><img class="icon svelte-7fbptt"></div>');
function Sa(e, t) {
  ue(t, !0);
  let n = /* @__PURE__ */ J(() => yi[t.character].href), r = /* @__PURE__ */ J(() => `${pi[t.character]} icon`);
  var a = Pi(), i = P(a);
  U(() => {
    Ye(i, "src", y(n)), Ye(i, "alt", y(r));
  }), S(e, a), oe();
}
var Si = /* @__PURE__ */ M('<div class="container svelte-bahb1u"><button><!> <span class="text svelte-bahb1u"><!></span></button></div>');
function Ia(e, t) {
  let n = x(t, "icon", 3, "left-arrow"), r = x(t, "theme", 3, "primary");
  var a = Si(), i = P(a);
  i.__click = function(...f) {
    var c;
    (c = t.onclick) == null || c.apply(this, f);
  };
  var l = P(i);
  {
    var s = (f) => {
      Tt(f, {
        get icon() {
          return n();
        }
      });
    };
    Z(l, (f) => {
      n() != null && f(s);
    });
  }
  var u = W(l, 2), o = P(u);
  Oe(o, () => t.children ?? Ze), U(() => F(i, 1, `button ${r()}`, "svelte-bahb1u")), S(e, a);
}
ge(["click"]);
const Ii = "_container_1bfil_11", Ci = "_label_1bfil_15", Ri = "_input_1bfil_20", ki = "_error_1bfil_28", Di = "_errorArea_1bfil_37", Mi = "_errorMessage_1bfil_43", Oi = "_active_1bfil_51", se = {
  container: Ii,
  label: Ci,
  input: Ri,
  error: ki,
  errorArea: Di,
  errorMessage: Mi,
  active: Oi
};
var Ni = /* @__PURE__ */ M('<label for="input"> </label>'), Li = /* @__PURE__ */ M("<div><!> <input> <div><p><!></p></div></div>");
function Ca(e, t) {
  ue(t, !0);
  let n = x(t, "value", 15), r = x(t, "class", 3, ""), a = x(t, "inputClass", 3, ""), i = /* @__PURE__ */ vi(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "label",
    "validator",
    "message",
    "value",
    "class",
    "inputClass"
  ]), l = /* @__PURE__ */ L(""), s = /* @__PURE__ */ J(() => y(l).length > 0 || (t.message ?? "").length > 0), u;
  const o = (h) => {
    const m = h.currentTarget;
    m && (k(l, ""), clearTimeout(u), u = setTimeout(
      () => {
        var A;
        k(l, ((A = t.validator) == null ? void 0 : A.call(t, m.value)) ?? "", !0);
      },
      1500
    ));
  };
  var f = Li(), c = P(f);
  {
    var v = (h) => {
      var m = Ni(), A = P(m);
      U(() => {
        F(m, 1, ae(se.label)), he(A, t.label);
      }), S(h, m);
    };
    Z(c, (h) => {
      t.label && h(v);
    });
  }
  var _ = W(c, 2);
  let d;
  var E = W(_, 2), p = P(E), b = P(p);
  {
    var g = (h) => {
      var m = mt();
      U(() => he(m, t.message)), S(h, m);
    }, w = (h) => {
      var m = mt();
      U(() => he(m, y(l))), S(h, m);
    };
    Z(b, (h) => {
      t.message && t.message.length > 0 ? h(g) : h(w, !1);
    });
  }
  U(
    (h, m, A) => {
      F(f, 1, h), d = ui(_, d, {
        id: "input",
        class: m,
        ...i,
        oninput: o
      }), F(E, 1, ae(se.errorArea)), F(p, 1, A);
    },
    [
      () => ae(qe(se.container, r())),
      () => qe(se.input, { [se.error]: y(s) }, a()),
      () => ae(qe(se.errorMessage, { [se.active]: y(s) }))
    ]
  ), oi(_, n), S(e, f), oe();
}
var Ui = /* @__PURE__ */ M('<div><button class="background svelte-1eu1fe8" aria-label="Close modal"></button> <div class="content-container svelte-1eu1fe8"><div class="close-button svelte-1eu1fe8"><!></div> <!></div></div>');
function xi(e, t) {
  ue(t, !0);
  let n = x(t, "open", 15);
  Dt(() => (addEventListener("keydown", r), () => {
    removeEventListener("keydown", r);
  }));
  const r = (c) => {
    c.key === "Escape" && a();
  }, a = () => {
    n(!1);
  };
  var i = Ui(), l = P(i);
  l.__click = a;
  var s = W(l, 2), u = P(s), o = P(u);
  yt(o, {
    onclick: a,
    size: "fill",
    children: (c, v) => {
      var _ = mt("X");
      S(c, _);
    },
    $$slots: { default: !0 }
  });
  var f = W(u, 2);
  Oe(f, () => t.children ?? Ze), U(() => F(i, 1, `container ${n() ? "open" : ""}`, "svelte-1eu1fe8")), S(e, i), oe();
}
ge(["click"]);
var qi = /* @__PURE__ */ M('<div class="page svelte-eomzmq"><div class="content svelte-eomzmq"><!></div></div>'), zi = /* @__PURE__ */ M("<div></div>"), Fi = /* @__PURE__ */ M('<div class="container svelte-eomzmq"><div class="page-container svelte-eomzmq"><!> <div class="footer svelte-eomzmq"><!> <!> <!></div></div></div>');
function Ra(e, t) {
  ue(t, !0);
  let n = x(t, "open", 15), r = x(t, "currentPage", 15), a = x(t, "height", 3, "60vh"), i = x(t, "width", 3, "70vw");
  Dt(() => {
    (r() < 0 || r() >= t.numPages) && (console.error(`Page ${r()} is not a valid page number!`), r(0));
  });
  const l = () => {
    t.allowWrapping ? r((r() + 1) % t.numPages) : r(Math.min(t.numPages - 1, r() + 1));
  }, s = () => {
    t.allowWrapping ? (r(r() - 1), r() < 0 && r(t.numPages - 1)) : r(Math.max(0, r() - 1));
  };
  xi(e, {
    get open() {
      return n();
    },
    set open(u) {
      n(u);
    },
    children: (u, o) => {
      var f = Fi(), c = P(f), v = P(c);
      pt(v, 17, () => ({ length: t.numPages }), wt, (w, h, m) => {
        var A = qi(), T = P(A), R = P(T);
        Oe(R, () => t.content, () => m), S(w, A);
      });
      var _ = W(v, 2), d = P(_);
      const E = /* @__PURE__ */ J(() => r() === 0);
      yt(d, {
        size: "small",
        onclick: s,
        get disabled() {
          return y(E);
        },
        children: (w, h) => {
          Tt(w, { icon: "left-arrow" });
        },
        $$slots: { default: !0 }
      });
      var p = W(d, 2);
      pt(p, 17, () => ({ length: t.numPages }), wt, (w, h, m) => {
        var A = zi();
        U(() => F(A, 1, `dot ${r() === m ? "highlighted" : ""}`, "svelte-eomzmq")), S(w, A);
      });
      var b = W(p, 2);
      const g = /* @__PURE__ */ J(() => r() === t.numPages - 1);
      yt(b, {
        size: "small",
        onclick: l,
        get disabled() {
          return y(g);
        },
        children: (w, h) => {
          Tt(w, { icon: "right-arrow" });
        },
        $$slots: { default: !0 }
      }), U(() => at(f, `--height: ${a()}; --width: ${i()}; --position: ${r()}`)), S(u, f);
    },
    $$slots: { default: !0 }
  }), oe();
}
const Xe = class Xe {
  constructor(t, n, r) {
    B(this, "durationMs");
    B(this, "remainingMs");
    B(this, "targetEndpoint");
    B(this, "alert");
    B(this, "update");
    B(this, "timeoutID");
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
    }, Xe.tickRate);
  }
};
B(Xe, "tickRate", 100);
let Ke = Xe;
var Hi = /* @__PURE__ */ M('<p class="title svelte-12hdnlf"> </p>'), ji = /* @__PURE__ */ M('<div><button class="close-button svelte-12hdnlf">&#10006;</button> <!> <p class="message svelte-12hdnlf"> </p> <div></div></div>');
function ka(e, t) {
  ue(t, !0);
  let n = x(t, "duration", 3, 15e3), r = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ J(() => `container ${t.level} ${y(r) ? "transition-out" : ""}`), i = /* @__PURE__ */ L(100), l = /* @__PURE__ */ L(void 0);
  const s = () => {
    k(r, !0), k(l, setTimeout(t.close, 1e3), !0);
  }, u = (b) => {
    k(i, b / n() * 100);
  };
  let o = new Ke(n(), s, u);
  o.start(), tn(() => {
    o.stop(), clearTimeout(y(l));
  });
  var f = ji(), c = P(f);
  c.__click = s;
  var v = W(c, 2);
  {
    var _ = (b) => {
      var g = Hi(), w = P(g);
      U(() => he(w, t.title)), S(b, g);
    };
    Z(v, (b) => {
      t.title && b(_);
    });
  }
  var d = W(v, 2), E = P(d), p = W(d, 2);
  U(() => {
    F(f, 1, ae(y(a)), "svelte-12hdnlf"), he(E, t.message), F(p, 1, `timer ${y(i) > 0 ? "visible" : ""} ${t.level}`, "svelte-12hdnlf"), at(p, `width: ${y(i)}%; transition-duration: ${Ke.tickRate}ms`);
  }), S(e, f), oe();
}
ge(["click"]);
wr();
var Vi = /* @__PURE__ */ M('<div class="container"></div>');
function Da(e) {
  var t = Vi();
  S(e, t);
}
var Gi = /* @__PURE__ */ M('<div class="timer svelte-j9s6cv"></div>'), Wi = /* @__PURE__ */ M('<div class="container svelte-j9s6cv"><!></div>');
function Ma(e, t) {
  ue(t, !0);
  let n = /* @__PURE__ */ L(100), r;
  Dt(() => {
    if (!t.until) return;
    const s = () => {
      const u = (/* @__PURE__ */ new Date()).getTime(), o = new Date(t.until).getTime(), f = Math.max(0, o - u);
      k(n, f / 5e3 * 100), f <= 0 && (clearInterval(r), k(n, 0));
    };
    return s(), r = setInterval(s, 50), () => clearInterval(r);
  });
  var a = Wi(), i = P(a);
  {
    var l = (s) => {
      var u = Gi();
      U(() => at(u, `--progress: ${y(n)}%`)), S(s, u);
    };
    Z(i, (s) => {
      t.until && s(l);
    });
  }
  S(e, a), oe();
}
var Bi = /* @__PURE__ */ Me('<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"></path>'), Yi = /* @__PURE__ */ Me('<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>'), Ki = /* @__PURE__ */ Me('<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>', 1), Xi = /* @__PURE__ */ Me('<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>'), Zi = /* @__PURE__ */ Me('<svg class="container svelte-1uo3blq" fill="currentColor" viewBox="0 0 16 16"><!></svg>');
function Tt(e, t) {
  var n = Zi(), r = P(n);
  {
    var a = (l) => {
      var s = Bi();
      S(l, s);
    }, i = (l, s) => {
      {
        var u = (f) => {
          var c = Yi();
          S(f, c);
        }, o = (f, c) => {
          {
            var v = (d) => {
              var E = Ki();
              S(d, E);
            }, _ = (d, E) => {
              {
                var p = (b) => {
                  var g = Xi();
                  S(b, g);
                };
                Z(
                  d,
                  (b) => {
                    t.icon === "hamburger" && b(p);
                  },
                  E
                );
              }
            };
            Z(
              f,
              (d) => {
                t.icon === "account" ? d(v) : d(_, !1);
              },
              c
            );
          }
        };
        Z(
          l,
          (f) => {
            t.icon === "right-arrow" ? f(u) : f(o, !1);
          },
          s
        );
      }
    };
    Z(r, (l) => {
      t.icon === "left-arrow" ? l(a) : l(i, !1);
    });
  }
  S(e, n);
}
var Ji = /* @__PURE__ */ M("<span></span>");
function Qi(e, t) {
  let n = x(t, "theme", 3, "primary");
  var r = Ji();
  U(() => F(r, 1, `spinner ${n()}`, "svelte-mrl5rx")), S(e, r);
}
var $i = /* @__PURE__ */ M("<button> </button>"), ea = /* @__PURE__ */ M('<div class="container svelte-1dkt1gc"><div class="tabs svelte-1dkt1gc"></div> <div class="content"><!></div></div>');
function Oa(e, t) {
  ue(t, !0);
  let n = /* @__PURE__ */ L(0);
  var r = ea(), a = P(r);
  pt(a, 21, () => t.items, wt, (s, u, o) => {
    var f = $i();
    f.__click = () => k(n, o, !0);
    var c = P(f);
    U(() => {
      F(f, 1, `tab ${y(n) === o ? "selected" : ""}`, "svelte-1dkt1gc"), he(c, y(u).title);
    }), S(s, f);
  });
  var i = W(a, 2), l = P(i);
  Oe(l, () => t.items[y(n)].content), S(e, r), oe();
}
ge(["click"]);
const ta = "auth-data", na = (e) => {
  const t = Et.Auth.subdomain, n = Et.Auth.devPort;
  return e !== Nn ? `http://${t}.jeffreycarr.local:${n}` : `https://${t}.jeffreycarr.dev`;
}, xn = (e) => ({
  path: `${na(e)}/api/auth/authed-user`,
  method: Lt.GET,
  credentials: "required"
}), Na = async (e, t, n, r) => await Ln(
  xn(e),
  {
    query: { app: t },
    additionalHeaders: { cookie: `${ta}=${n}` }
  },
  r
), La = async (e, t, n) => await Ln(
  xn(e),
  { query: { app: t } },
  n
);
export {
  ga as APP_QUERY_PARAM,
  ta as AUTH_COOKIE_NAME,
  On as App,
  Et as Apps,
  yt as Button,
  ha as CHARACTERS,
  Sa as CharacterIcon,
  pi as CharacterToName,
  yi as CharacterToSrc,
  Pa as Confetti,
  Ia as ExpandButton,
  va as GlobalRoutes,
  Ca as Input,
  Lt as METHODS,
  xi as Modal,
  Ra as MultiPageModal,
  da as NOTIFICATION_LEVELS,
  ka as Notification,
  Da as NotificationController,
  ba as PATH_QUERY_PARAM,
  Ma as RadialTimer,
  Tt as ReactiveIcon,
  Ut as ServerError,
  Qi as Spinner,
  _a as Stack,
  Oa as TabbedContent,
  Na as backendGetUser,
  wa as devEnvironment,
  ca as friendlyPrintDate,
  Aa as generateGreeting,
  Un as generateRandomInt,
  At as generateRandomNumber,
  Ta as generateUUID,
  pa as getAppURL,
  oa as getDaysInMonth,
  ua as getFirstDayOfMonth,
  sa as getMonthName,
  Ei as getRandomElement,
  Ai as getRandomHexColor,
  La as getUser,
  la as getUserLocale,
  fa as getWeekdayName,
  ma as isValidApp,
  Ln as makeRequest,
  ya as ping,
  Nn as prodEnvironment,
  aa as resizeObserver,
  Ea as sleep
};
