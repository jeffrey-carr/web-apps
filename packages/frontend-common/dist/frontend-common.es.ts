var Dp = Object.defineProperty;
var kc = (t) => {
  throw TypeError(t);
};
var Rp = (t, e, n) => e in t ? Dp(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var oe = (t, e, n) => Rp(t, typeof e != "symbol" ? e + "" : e, n), Ko = (t, e, n) => e.has(t) || kc("Cannot " + n);
var T = (t, e, n) => (Ko(t, e, "read from private field"), n ? n.call(t) : e.get(t)), ie = (t, e, n) => e.has(t) ? kc("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Rn = (t, e, n, r) => (Ko(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), Ye = (t, e, n) => (Ko(t, e, "access private method"), n);
import { onDestroy as id, onMount as sd } from "svelte";
const Lp = "5";
var td;
typeof window < "u" && ((td = window.__svelte ?? (window.__svelte = {})).v ?? (td.v = /* @__PURE__ */ new Set())).add(Lp);
const Pp = 1, Bp = 2, od = 4, zp = 8, Fp = 16, Vp = 1, Hp = 2, jp = 4, Wp = 8, Up = 16, ld = 1, qp = 2, be = Symbol(), ad = "http://www.w3.org/1999/xhtml", Kp = "http://www.w3.org/2000/svg", Jp = "http://www.w3.org/1998/Math/MathML", $p = "@attach", Gp = !1;
var ma = Array.isArray, Yp = Array.prototype.indexOf, Ir = Array.prototype.includes, ga = Array.from, Xp = Object.defineProperty, Mr = Object.getOwnPropertyDescriptor, Qp = Object.getOwnPropertyDescriptors, Zp = Object.prototype, em = Array.prototype, cd = Object.getPrototypeOf;
function Jr(t) {
  return typeof t == "function";
}
const Pt = () => {
};
function tm(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function ud() {
  var t, e, n = new Promise((r, i) => {
    t = r, e = i;
  });
  return { promise: n, resolve: t, reject: e };
}
function nm(t, e) {
  if (Array.isArray(t))
    return t;
  if (!(Symbol.iterator in t))
    return Array.from(t);
  const n = [];
  for (const r of t)
    if (n.push(r), n.length === e) break;
  return n;
}
const ze = 2, Dr = 4, Co = 8, va = 1 << 24, Lt = 16, Mt = 32, Rr = 64, rm = 128, ht = 512, ke = 1024, De = 2048, Bt = 4096, He = 8192, it = 16384, pr = 32768, _l = 1 << 25, Lr = 65536, Ol = 1 << 17, im = 1 << 18, Mo = 1 << 19, sm = 1 << 20, Rt = 1 << 25, or = 65536, Nl = 1 << 21, bi = 1 << 22, vn = 1 << 23, yn = Symbol("$state"), dd = Symbol("legacy props"), om = Symbol(""), Kt = new class extends Error {
  constructor() {
    super(...arguments);
    oe(this, "name", "StaleReactionError");
    oe(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var nd;
const fd = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((nd = globalThis.document) != null && nd.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function lm() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function am(t, e, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function cm(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function um() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function dm(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function fm() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function hm(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function pm() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function mm() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function gm() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function vm() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function ym() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function hd(t) {
  return t === this.v;
}
function bm(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function pd(t) {
  return !bm(t, this.v);
}
let Ui = !1, km = !1;
function wm() {
  Ui = !0;
}
let Be = null;
function Es(t) {
  Be = t;
}
function Ce(t, e = !1, n) {
  Be = {
    p: Be,
    i: !1,
    c: null,
    e: null,
    s: t,
    x: null,
    r: (
      /** @type {Effect} */
      Y
    ),
    l: Ui && !e ? { s: null, u: null, $: [] } : null
  };
}
function Me(t) {
  var e = (
    /** @type {ComponentContext} */
    Be
  ), n = e.e;
  if (n !== null) {
    e.e = null;
    for (var r of n)
      Od(r);
  }
  return e.i = !0, Be = e.p, /** @type {T} */
  {};
}
function qi() {
  return !Ui || Be !== null && Be.l === null;
}
let jn = [];
function md() {
  var t = jn;
  jn = [], tm(t);
}
function ki(t) {
  if (jn.length === 0 && !oi) {
    var e = jn;
    queueMicrotask(() => {
      e === jn && md();
    });
  }
  jn.push(t);
}
function xm() {
  for (; jn.length > 0; )
    md();
}
function Sm(t) {
  var e = Y;
  if (e === null)
    return J.f |= vn, t;
  if ((e.f & pr) === 0 && (e.f & Dr) === 0)
    throw t;
  Ts(t, e);
}
function Ts(t, e) {
  for (; e !== null; ) {
    if ((e.f & rm) !== 0) {
      if ((e.f & pr) === 0)
        throw t;
      try {
        e.b.error(t);
        return;
      } catch (n) {
        t = n;
      }
    }
    e = e.parent;
  }
  throw t;
}
const Cm = -7169;
function de(t, e) {
  t.f = t.f & Cm | e;
}
function ya(t) {
  (t.f & ht) !== 0 || t.deps === null ? de(t, ke) : de(t, Bt);
}
function gd(t) {
  if (t !== null)
    for (const e of t)
      (e.f & ze) === 0 || (e.f & or) === 0 || (e.f ^= or, gd(
        /** @type {Derived} */
        e.deps
      ));
}
function Mm(t, e, n) {
  (t.f & De) !== 0 ? e.add(t) : (t.f & Bt) !== 0 && n.add(t), gd(t.deps), de(t, ke);
}
let rs = !1;
function Em(t) {
  var e = rs;
  try {
    return rs = !1, [t(), rs];
  } finally {
    rs = e;
  }
}
const Ln = /* @__PURE__ */ new Set();
let W = null, Oe = null, Il = null, oi = !1, Jo = !1, Sr = null, gs = null;
var wc = 0;
let Tm = 1;
var Ar, _r, Gn, Jt, Nt, Vi, Ze, Hi, fn, $t, It, Or, Nr, Yn, he, vs, vd, ys, Dl, bs, Am;
const wo = class wo {
  constructor() {
    ie(this, he);
    oe(this, "id", Tm++);
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    oe(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    oe(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    ie(this, Ar, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    ie(this, _r, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    ie(this, Gn, /* @__PURE__ */ new Set());
    /**
     * Async effects that are currently in flight
     * @type {Map<Effect, number>}
     */
    ie(this, Jt, /* @__PURE__ */ new Map());
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    ie(this, Nt, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    ie(this, Vi, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    ie(this, Ze, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    ie(this, Hi, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    ie(this, fn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    ie(this, $t, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    ie(this, It, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    ie(this, Or, /* @__PURE__ */ new Set());
    oe(this, "is_fork", !1);
    ie(this, Nr, !1);
    /** @type {Set<Batch>} */
    ie(this, Yn, /* @__PURE__ */ new Set());
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    T(this, It).has(e) || T(this, It).set(e, { d: [], m: [] }), T(this, Or).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, n = (r) => this.schedule(r)) {
    var r = T(this, It).get(e);
    if (r) {
      T(this, It).delete(e);
      for (var i of r.d)
        de(i, De), n(i);
      for (i of r.m)
        de(i, Bt), n(i);
    }
    T(this, Or).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, n, r = !1) {
    e.v !== be && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & vn) === 0 && (this.current.set(e, [n, r]), Oe == null || Oe.set(e, n)), this.is_fork || (e.v = n);
  }
  activate() {
    W = this;
  }
  deactivate() {
    W = null, Oe = null;
  }
  flush() {
    try {
      Jo = !0, W = this, Ye(this, he, ys).call(this);
    } finally {
      wc = 0, Il = null, Sr = null, gs = null, Jo = !1, W = null, Oe = null, Qn.clear();
    }
  }
  discard() {
    for (const e of T(this, _r)) e(this);
    T(this, _r).clear(), T(this, Gn).clear(), Ln.delete(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    T(this, Hi).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, n) {
    let r = T(this, Jt).get(n) ?? 0;
    if (T(this, Jt).set(n, r + 1), e) {
      let i = T(this, Nt).get(n) ?? 0;
      T(this, Nt).set(n, i + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(e, n, r) {
    let i = T(this, Jt).get(n) ?? 0;
    if (i === 1 ? T(this, Jt).delete(n) : T(this, Jt).set(n, i - 1), e) {
      let s = T(this, Nt).get(n) ?? 0;
      s === 1 ? T(this, Nt).delete(n) : T(this, Nt).set(n, s - 1);
    }
    T(this, Nr) || r || (Rn(this, Nr, !0), ki(() => {
      Rn(this, Nr, !1), this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, n) {
    for (const r of e)
      T(this, fn).add(r);
    for (const r of n)
      T(this, $t).add(r);
    e.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    T(this, Ar).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    T(this, _r).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(e) {
    T(this, Gn).add(e);
  }
  run_fork_commit_callbacks() {
    for (const e of T(this, Gn)) e(this);
    T(this, Gn).clear();
  }
  settled() {
    return (T(this, Vi) ?? Rn(this, Vi, ud())).promise;
  }
  static ensure() {
    if (W === null) {
      const e = W = new wo();
      Jo || (Ln.add(W), oi || ki(() => {
        W === e && e.flush();
      }));
    }
    return W;
  }
  apply() {
    {
      Oe = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var i;
    if (Il = e, (i = e.b) != null && i.is_pending && (e.f & (Dr | Co | va)) !== 0 && (e.f & pr) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var n = e; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (Sr !== null && n === Y && (J === null || (J.f & ze) === 0))
        return;
      if ((r & (Rr | Mt)) !== 0) {
        if ((r & ke) === 0)
          return;
        n.f ^= ke;
      }
    }
    T(this, Ze).push(n);
  }
};
Ar = new WeakMap(), _r = new WeakMap(), Gn = new WeakMap(), Jt = new WeakMap(), Nt = new WeakMap(), Vi = new WeakMap(), Ze = new WeakMap(), Hi = new WeakMap(), fn = new WeakMap(), $t = new WeakMap(), It = new WeakMap(), Or = new WeakMap(), Nr = new WeakMap(), Yn = new WeakMap(), he = new WeakSet(), vs = function() {
  return this.is_fork || T(this, Nt).size > 0;
}, vd = function() {
  for (const r of T(this, Yn))
    for (const i of T(r, Nt).keys()) {
      for (var e = !1, n = i; n.parent !== null; ) {
        if (T(this, It).has(n)) {
          e = !0;
          break;
        }
        n = n.parent;
      }
      if (!e)
        return !0;
    }
  return !1;
}, ys = function() {
  var l, a;
  if (wc++ > 1e3 && (Ln.delete(this), Om()), !Ye(this, he, vs).call(this)) {
    for (const c of T(this, fn))
      T(this, $t).delete(c), de(c, De), this.schedule(c);
    for (const c of T(this, $t))
      de(c, Bt), this.schedule(c);
  }
  const e = T(this, Ze);
  Rn(this, Ze, []), this.apply();
  var n = Sr = [], r = [], i = gs = [];
  for (const c of e)
    try {
      Ye(this, he, Dl).call(this, c, n, r);
    } catch (u) {
      throw kd(c), u;
    }
  if (W = null, i.length > 0) {
    var s = wo.ensure();
    for (const c of i)
      s.schedule(c);
  }
  if (Sr = null, gs = null, Ye(this, he, vs).call(this) || Ye(this, he, vd).call(this)) {
    Ye(this, he, bs).call(this, r), Ye(this, he, bs).call(this, n);
    for (const [c, u] of T(this, It))
      bd(c, u);
  } else {
    T(this, Jt).size === 0 && Ln.delete(this), T(this, fn).clear(), T(this, $t).clear();
    for (const c of T(this, Ar)) c(this);
    T(this, Ar).clear(), xc(r), xc(n), (l = T(this, Vi)) == null || l.resolve();
  }
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    W
  );
  if (T(this, Ze).length > 0) {
    const c = o ?? (o = this);
    T(c, Ze).push(...T(this, Ze).filter((u) => !T(c, Ze).includes(u)));
  }
  o !== null && (Ln.add(o), Ye(a = o, he, ys).call(a));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Dl = function(e, n, r) {
  e.f ^= ke;
  for (var i = e.first; i !== null; ) {
    var s = i.f, o = (s & (Mt | Rr)) !== 0, l = o && (s & ke) !== 0, a = l || (s & He) !== 0 || T(this, It).has(i);
    if (!a && i.fn !== null) {
      o ? i.f ^= ke : (s & Dr) !== 0 ? n.push(i) : Gi(i) && ((s & Lt) !== 0 && T(this, $t).add(i), Br(i));
      var c = i.first;
      if (c !== null) {
        i = c;
        continue;
      }
    }
    for (; i !== null; ) {
      var u = i.next;
      if (u !== null) {
        i = u;
        break;
      }
      i = i.parent;
    }
  }
}, /**
 * @param {Effect[]} effects
 */
bs = function(e) {
  for (var n = 0; n < e.length; n += 1)
    Mm(e[n], T(this, fn), T(this, $t));
}, Am = function() {
  var u, d, f;
  for (const h of Ln) {
    var e = h.id < this.id, n = [];
    for (const [p, [m, g]] of this.current) {
      if (h.current.has(p)) {
        var r = (
          /** @type {[any, boolean]} */
          h.current.get(p)[0]
        );
        if (e && m !== r)
          h.current.set(p, [m, g]);
        else
          continue;
      }
      n.push(p);
    }
    var i = [...h.current.keys()].filter((p) => !this.current.has(p));
    if (i.length === 0)
      e && h.discard();
    else if (n.length > 0) {
      if (e)
        for (const p of T(this, Or))
          h.unskip_effect(p, (m) => {
            var g;
            (m.f & (Lt | bi)) !== 0 ? h.schedule(m) : Ye(g = h, he, bs).call(g, [m]);
          });
      h.activate();
      var s = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
      for (var l of n)
        yd(l, i, s, o);
      o = /* @__PURE__ */ new Map();
      var a = [...h.current.keys()].filter(
        (p) => this.current.has(p) ? (
          /** @type {[any, boolean]} */
          this.current.get(p)[0] !== p
        ) : !0
      );
      for (const p of T(this, Hi))
        (p.f & (it | He | Ol)) === 0 && ba(p, a, o) && ((p.f & (bi | Lt)) !== 0 ? (de(p, De), h.schedule(p)) : T(h, fn).add(p));
      if (T(h, Ze).length > 0) {
        h.apply();
        for (var c of T(h, Ze))
          Ye(u = h, he, Dl).call(u, c, [], []);
        Rn(h, Ze, []);
      }
      h.deactivate();
    }
  }
  for (const h of Ln)
    T(h, Yn).has(this) && (T(h, Yn).delete(this), T(h, Yn).size === 0 && !Ye(d = h, he, vs).call(d) && (h.activate(), Ye(f = h, he, ys).call(f)));
};
let wi = wo;
function _m(t) {
  var e = oi;
  oi = !0;
  try {
    for (var n; ; ) {
      if (xm(), W === null)
        return (
          /** @type {T} */
          n
        );
      W.flush();
    }
  } finally {
    oi = e;
  }
}
function Om() {
  try {
    fm();
  } catch (t) {
    Ts(t, Il);
  }
}
let bt = null;
function xc(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var r = t[n++];
      if ((r.f & (it | He)) === 0 && Gi(r) && (bt = /* @__PURE__ */ new Set(), Br(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Rd(r), (bt == null ? void 0 : bt.size) > 0)) {
        Qn.clear();
        for (const i of bt) {
          if ((i.f & (it | He)) !== 0) continue;
          const s = [i];
          let o = i.parent;
          for (; o !== null; )
            bt.has(o) && (bt.delete(o), s.push(o)), o = o.parent;
          for (let l = s.length - 1; l >= 0; l--) {
            const a = s[l];
            (a.f & (it | He)) === 0 && Br(a);
          }
        }
        bt.clear();
      }
    }
    bt = null;
  }
}
function yd(t, e, n, r) {
  if (!n.has(t) && (n.add(t), t.reactions !== null))
    for (const i of t.reactions) {
      const s = i.f;
      (s & ze) !== 0 ? yd(
        /** @type {Derived} */
        i,
        e,
        n,
        r
      ) : (s & (bi | Lt)) !== 0 && (s & De) === 0 && ba(i, e, r) && (de(i, De), ka(
        /** @type {Effect} */
        i
      ));
    }
}
function ba(t, e, n) {
  const r = n.get(t);
  if (r !== void 0) return r;
  if (t.deps !== null)
    for (const i of t.deps) {
      if (Ir.call(e, i))
        return !0;
      if ((i.f & ze) !== 0 && ba(
        /** @type {Derived} */
        i,
        e,
        n
      ))
        return n.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return n.set(t, !1), !1;
}
function ka(t) {
  W.schedule(t);
}
function bd(t, e) {
  if (!((t.f & Mt) !== 0 && (t.f & ke) !== 0)) {
    (t.f & De) !== 0 ? e.d.push(t) : (t.f & Bt) !== 0 && e.m.push(t), de(t, ke);
    for (var n = t.first; n !== null; )
      bd(n, e), n = n.next;
  }
}
function kd(t) {
  de(t, ke);
  for (var e = t.first; e !== null; )
    kd(e), e = e.next;
}
function wd(t, e, n, r) {
  const i = qi() ? Eo : wa;
  var s = t.filter((f) => !f.settled);
  if (n.length === 0 && s.length === 0) {
    r(e.map(i));
    return;
  }
  var o = (
    /** @type {Effect} */
    Y
  ), l = Nm(), a = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((f) => f.promise)) : null;
  function c(f) {
    l();
    try {
      r(f);
    } catch (h) {
      (o.f & it) === 0 && Ts(h, o);
    }
    As();
  }
  if (n.length === 0) {
    a.then(() => c(e.map(i)));
    return;
  }
  var u = xd();
  function d() {
    Promise.all(n.map((f) => /* @__PURE__ */ Im(f))).then((f) => c([...e.map(i), ...f])).catch((f) => Ts(f, o)).finally(() => u());
  }
  a ? a.then(() => {
    l(), d(), As();
  }) : d();
}
function Nm() {
  var t = (
    /** @type {Effect} */
    Y
  ), e = J, n = Be, r = (
    /** @type {Batch} */
    W
  );
  return function(s = !0) {
    Cn(t), zt(e), Es(n), s && (t.f & it) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function As(t = !0) {
  Cn(null), zt(null), Es(null), t && (W == null || W.deactivate());
}
function xd() {
  var t = (
    /** @type {Effect} */
    Y
  ), e = (
    /** @type {Boundary} */
    t.b
  ), n = (
    /** @type {Batch} */
    W
  ), r = e.is_rendered();
  return e.update_pending_count(1, n), n.increment(r, t), (i = !1) => {
    e.update_pending_count(-1, n), n.decrement(r, t, i);
  };
}
// @__NO_SIDE_EFFECTS__
function Eo(t) {
  var e = ze | De;
  return Y !== null && (Y.f |= Mo), {
    ctx: Be,
    deps: null,
    effects: null,
    equals: hd,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      be
    ),
    wv: 0,
    parent: Y,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Im(t, e, n) {
  let r = (
    /** @type {Effect | null} */
    Y
  );
  r === null && lm();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = xi(
    /** @type {V} */
    be
  ), o = !J, l = /* @__PURE__ */ new Map();
  return Jm(() => {
    var h;
    var a = (
      /** @type {Effect} */
      Y
    ), c = ud();
    i = c.promise;
    try {
      Promise.resolve(t()).then(c.resolve, c.reject).finally(As);
    } catch (p) {
      c.reject(p), As();
    }
    var u = (
      /** @type {Batch} */
      W
    );
    if (o) {
      if ((a.f & pr) !== 0)
        var d = xd();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        (h = l.get(u)) == null || h.reject(Kt), l.delete(u);
      else {
        for (const p of l.values())
          p.reject(Kt);
        l.clear();
      }
      l.set(u, c);
    }
    const f = (p, m = void 0) => {
      if (d) {
        var g = m === Kt;
        d(g);
      }
      if (!(m === Kt || (a.f & it) !== 0)) {
        if (u.activate(), m)
          s.f |= vn, Si(s, m);
        else {
          (s.f & vn) !== 0 && (s.f ^= vn), Si(s, p);
          for (const [v, y] of l) {
            if (l.delete(v), v === u) break;
            y.reject(Kt);
          }
        }
        u.deactivate();
      }
    };
    c.promise.then(f, (p) => f(null, p || "unknown"));
  }), Ji(() => {
    for (const a of l.values())
      a.reject(Kt);
  }), new Promise((a) => {
    function c(u) {
      function d() {
        u === i ? a(s) : c(i);
      }
      u.then(d, d);
    }
    c(i);
  });
}
// @__NO_SIDE_EFFECTS__
function je(t) {
  const e = /* @__PURE__ */ Eo(t);
  return zd(e), e;
}
// @__NO_SIDE_EFFECTS__
function wa(t) {
  const e = /* @__PURE__ */ Eo(t);
  return e.equals = pd, e;
}
function Dm(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      pt(
        /** @type {Effect} */
        e[n]
      );
  }
}
function xa(t) {
  var e, n = Y, r = t.parent;
  if (!Qt && r !== null && (r.f & (it | He)) !== 0)
    return vm(), t.v;
  Cn(r);
  try {
    t.f &= ~or, Dm(t), e = jd(t);
  } finally {
    Cn(n);
  }
  return e;
}
function Sd(t) {
  var e = xa(t);
  if (!t.equals(e) && (t.wv = Vd(), (!(W != null && W.is_fork) || t.deps === null) && (W !== null ? W.capture(t, e, !0) : t.v = e, t.deps === null))) {
    de(t, ke);
    return;
  }
  Qt || (Oe !== null ? (_d() || W != null && W.is_fork) && Oe.set(t, e) : ya(t));
}
function Rm(t) {
  var e, n;
  if (t.effects !== null)
    for (const r of t.effects)
      (r.teardown || r.ac) && ((e = r.teardown) == null || e.call(r), (n = r.ac) == null || n.abort(Kt), r.teardown = Pt, r.ac = null, Ci(r, 0), Ma(r));
}
function Cd(t) {
  if (t.effects !== null)
    for (const e of t.effects)
      e.teardown && Br(e);
}
let Rl = /* @__PURE__ */ new Set();
const Qn = /* @__PURE__ */ new Map();
let Md = !1;
function xi(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: hd,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function ee(t, e) {
  const n = xi(t);
  return zd(n), n;
}
// @__NO_SIDE_EFFECTS__
function Lm(t, e = !1, n = !0) {
  var i;
  const r = xi(t);
  return e || (r.equals = pd), Ui && n && Be !== null && Be.l !== null && ((i = Be.l).s ?? (i.s = [])).push(r), r;
}
function $(t, e, n = !1) {
  J !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!xt || (J.f & Ol) !== 0) && qi() && (J.f & (ze | Lt | bi | Ol)) !== 0 && (mt === null || !Ir.call(mt, t)) && gm();
  let r = n ? hn(e) : e;
  return Si(t, r, gs);
}
function Si(t, e, n = null) {
  if (!t.equals(e)) {
    Qn.set(t, Qt ? e : t.v);
    var r = wi.ensure();
    if (r.capture(t, e), (t.f & ze) !== 0) {
      const i = (
        /** @type {Derived} */
        t
      );
      (t.f & De) !== 0 && xa(i), Oe === null && ya(i);
    }
    t.wv = Vd(), Ed(t, De, n), qi() && Y !== null && (Y.f & ke) !== 0 && (Y.f & (Mt | Rr)) === 0 && (ut === null ? Gm([t]) : ut.push(t)), !r.is_fork && Rl.size > 0 && !Md && Pm();
  }
  return e;
}
function Pm() {
  Md = !1;
  for (const t of Rl)
    (t.f & ke) !== 0 && de(t, Bt), Gi(t) && Br(t);
  Rl.clear();
}
function $o(t) {
  $(t, t.v + 1);
}
function Ed(t, e, n) {
  var r = t.reactions;
  if (r !== null)
    for (var i = qi(), s = r.length, o = 0; o < s; o++) {
      var l = r[o], a = l.f;
      if (!(!i && l === Y)) {
        var c = (a & De) === 0;
        if (c && de(l, e), (a & ze) !== 0) {
          var u = (
            /** @type {Derived} */
            l
          );
          Oe == null || Oe.delete(u), (a & or) === 0 && (a & ht && (l.f |= or), Ed(u, Bt, n));
        } else if (c) {
          var d = (
            /** @type {Effect} */
            l
          );
          (a & Lt) !== 0 && bt !== null && bt.add(d), n !== null ? n.push(d) : ka(d);
        }
      }
    }
}
function hn(t) {
  if (typeof t != "object" || t === null || yn in t)
    return t;
  const e = cd(t);
  if (e !== Zp && e !== em)
    return t;
  var n = /* @__PURE__ */ new Map(), r = ma(t), i = /* @__PURE__ */ ee(0), s = er, o = (l) => {
    if (er === s)
      return l();
    var a = J, c = er;
    zt(null), Ec(s);
    var u = l();
    return zt(a), Ec(c), u;
  };
  return r && n.set("length", /* @__PURE__ */ ee(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(l, a, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && pm();
        var u = n.get(a);
        return u === void 0 ? o(() => {
          var d = /* @__PURE__ */ ee(c.value);
          return n.set(a, d), d;
        }) : $(u, c.value, !0), !0;
      },
      deleteProperty(l, a) {
        var c = n.get(a);
        if (c === void 0) {
          if (a in l) {
            const u = o(() => /* @__PURE__ */ ee(be));
            n.set(a, u), $o(i);
          }
        } else
          $(c, be), $o(i);
        return !0;
      },
      get(l, a, c) {
        var h;
        if (a === yn)
          return t;
        var u = n.get(a), d = a in l;
        if (u === void 0 && (!d || (h = Mr(l, a)) != null && h.writable) && (u = o(() => {
          var p = hn(d ? l[a] : be), m = /* @__PURE__ */ ee(p);
          return m;
        }), n.set(a, u)), u !== void 0) {
          var f = w(u);
          return f === be ? void 0 : f;
        }
        return Reflect.get(l, a, c);
      },
      getOwnPropertyDescriptor(l, a) {
        var c = Reflect.getOwnPropertyDescriptor(l, a);
        if (c && "value" in c) {
          var u = n.get(a);
          u && (c.value = w(u));
        } else if (c === void 0) {
          var d = n.get(a), f = d == null ? void 0 : d.v;
          if (d !== void 0 && f !== be)
            return {
              enumerable: !0,
              configurable: !0,
              value: f,
              writable: !0
            };
        }
        return c;
      },
      has(l, a) {
        var f;
        if (a === yn)
          return !0;
        var c = n.get(a), u = c !== void 0 && c.v !== be || Reflect.has(l, a);
        if (c !== void 0 || Y !== null && (!u || (f = Mr(l, a)) != null && f.writable)) {
          c === void 0 && (c = o(() => {
            var h = u ? hn(l[a]) : be, p = /* @__PURE__ */ ee(h);
            return p;
          }), n.set(a, c));
          var d = w(c);
          if (d === be)
            return !1;
        }
        return u;
      },
      set(l, a, c, u) {
        var b;
        var d = n.get(a), f = a in l;
        if (r && a === "length")
          for (var h = c; h < /** @type {Source<number>} */
          d.v; h += 1) {
            var p = n.get(h + "");
            p !== void 0 ? $(p, be) : h in l && (p = o(() => /* @__PURE__ */ ee(be)), n.set(h + "", p));
          }
        if (d === void 0)
          (!f || (b = Mr(l, a)) != null && b.writable) && (d = o(() => /* @__PURE__ */ ee(void 0)), $(d, hn(c)), n.set(a, d));
        else {
          f = d.v !== be;
          var m = o(() => hn(c));
          $(d, m);
        }
        var g = Reflect.getOwnPropertyDescriptor(l, a);
        if (g != null && g.set && g.set.call(u, c), !f) {
          if (r && typeof a == "string") {
            var v = (
              /** @type {Source<number>} */
              n.get("length")
            ), y = Number(a);
            Number.isInteger(y) && y >= v.v && $(v, y + 1);
          }
          $o(i);
        }
        return !0;
      },
      ownKeys(l) {
        w(i);
        var a = Reflect.ownKeys(l).filter((d) => {
          var f = n.get(d);
          return f === void 0 || f.v !== be;
        });
        for (var [c, u] of n)
          u.v !== be && !(c in l) && a.push(c);
        return a;
      },
      setPrototypeOf() {
        mm();
      }
    }
  );
}
function Sc(t) {
  try {
    if (t !== null && typeof t == "object" && yn in t)
      return t[yn];
  } catch {
  }
  return t;
}
function Bm(t, e) {
  return Object.is(Sc(t), Sc(e));
}
var zm, Fm, Vm;
function Zn(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function nt(t) {
  return (
    /** @type {TemplateNode | null} */
    Fm.call(t)
  );
}
// @__NO_SIDE_EFFECTS__
function Ki(t) {
  return (
    /** @type {TemplateNode | null} */
    Vm.call(t)
  );
}
function L(t, e) {
  return /* @__PURE__ */ nt(t);
}
function Sn(t, e = !1) {
  {
    var n = /* @__PURE__ */ nt(t);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Ki(n) : n;
  }
}
function G(t, e = 1, n = !1) {
  let r = t;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Ki(r);
  return r;
}
function Hm(t) {
  t.textContent = "";
}
function Td() {
  return !1;
}
function Ad(t, e, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(e ?? ad, t, void 0)
  );
}
function jm(t, e) {
  if (e) {
    const n = document.body;
    t.autofocus = !0, ki(() => {
      document.activeElement === n && t.focus();
    });
  }
}
let Cc = !1;
function Wm() {
  Cc || (Cc = !0, document.addEventListener(
    "reset",
    (t) => {
      Promise.resolve().then(() => {
        var e;
        if (!t.defaultPrevented)
          for (
            const n of
            /**@type {HTMLFormElement} */
            t.target.elements
          )
            (e = n.__on_r) == null || e.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Um(t, e, n, r = !0) {
  r && n();
  for (var i of e)
    t.addEventListener(i, n);
  Ji(() => {
    for (var s of e)
      t.removeEventListener(s, n);
  });
}
function Ur(t) {
  var e = J, n = Y;
  zt(null), Cn(null);
  try {
    return t();
  } finally {
    zt(e), Cn(n);
  }
}
function Sa(t, e, n, r = n) {
  t.addEventListener(e, () => Ur(n));
  const i = t.__on_r;
  i ? t.__on_r = () => {
    i(), r(!0);
  } : t.__on_r = () => r(!0), Wm();
}
function qm(t) {
  Y === null && (J === null && dm(), um()), Qt && cm();
}
function Km(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function Zt(t, e) {
  var n = Y;
  n !== null && (n.f & He) !== 0 && (t |= He);
  var r = {
    ctx: Be,
    deps: null,
    nodes: null,
    f: t | De | ht,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  W == null || W.register_created_effect(r);
  var i = r;
  if ((t & Dr) !== 0)
    Sr !== null ? Sr.push(r) : wi.ensure().schedule(r);
  else if (e !== null) {
    try {
      Br(r);
    } catch (o) {
      throw pt(r), o;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Mo) === 0 && (i = i.first, (t & Lt) !== 0 && (t & Lr) !== 0 && i !== null && (i.f |= Lr));
  }
  if (i !== null && (i.parent = n, n !== null && Km(i, n), J !== null && (J.f & ze) !== 0 && (t & Rr) === 0)) {
    var s = (
      /** @type {Derived} */
      J
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return r;
}
function _d() {
  return J !== null && !xt;
}
function Ji(t) {
  const e = Zt(Co, null);
  return de(e, ke), e.teardown = t, e;
}
function Pr(t) {
  qm();
  var e = (
    /** @type {Effect} */
    Y.f
  ), n = !J && (e & Mt) !== 0 && (e & pr) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      Be
    );
    (r.e ?? (r.e = [])).push(t);
  } else
    return Od(t);
}
function Od(t) {
  return Zt(Dr | sm, t);
}
function $i(t) {
  return Zt(Dr, t);
}
function Jm(t) {
  return Zt(bi | Mo, t);
}
function To(t, e = 0) {
  return Zt(Co | e, t);
}
function V(t, e = [], n = [], r = []) {
  wd(r, e, n, (i) => {
    Zt(Co, () => t(...i.map(w)));
  });
}
function Ca(t, e = 0) {
  var n = Zt(Lt | e, t);
  return n;
}
function Nd(t, e = 0) {
  var n = Zt(va | e, t);
  return n;
}
function lr(t) {
  return Zt(Mt | Mo, t);
}
function Id(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = Qt, r = J;
    Mc(!0), zt(null);
    try {
      e.call(null);
    } finally {
      Mc(n), zt(r);
    }
  }
}
function Ma(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Ur(() => {
      i.abort(Kt);
    });
    var r = n.next;
    (n.f & Rr) !== 0 ? n.parent = null : pt(n, e), n = r;
  }
}
function $m(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & Mt) === 0 && pt(e), e = n;
  }
}
function pt(t, e = !0) {
  var n = !1;
  (e || (t.f & im) !== 0) && t.nodes !== null && t.nodes.end !== null && (Dd(
    t.nodes.start,
    /** @type {TemplateNode} */
    t.nodes.end
  ), n = !0), de(t, _l), Ma(t, e && !n), Ci(t, 0);
  var r = t.nodes && t.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Id(t), t.f ^= _l, t.f |= it;
  var i = t.parent;
  i !== null && i.first !== null && Rd(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes = t.ac = t.b = null;
}
function Dd(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : /* @__PURE__ */ Ki(t);
    t.remove(), t = n;
  }
}
function Rd(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function Ea(t, e, n = !0) {
  var r = [];
  Ld(t, r, !0);
  var i = () => {
    n && pt(t), e && e();
  }, s = r.length;
  if (s > 0) {
    var o = () => --s || i();
    for (var l of r)
      l.out(o);
  } else
    i();
}
function Ld(t, e, n) {
  if ((t.f & He) === 0) {
    t.f ^= He;
    var r = t.nodes && t.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && e.push(l);
    for (var i = t.first; i !== null; ) {
      var s = i.next, o = (i.f & Lr) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & Mt) !== 0 && (t.f & Lt) !== 0;
      Ld(i, e, o ? n : !1), i = s;
    }
  }
}
function Ta(t) {
  Pd(t, !0);
}
function Pd(t, e) {
  if ((t.f & He) !== 0) {
    t.f ^= He, (t.f & ke) === 0 && (de(t, De), wi.ensure().schedule(t));
    for (var n = t.first; n !== null; ) {
      var r = n.next, i = (n.f & Lr) !== 0 || (n.f & Mt) !== 0;
      Pd(n, i ? e : !1), n = r;
    }
    var s = t.nodes && t.nodes.t;
    if (s !== null)
      for (const o of s)
        (o.is_global || e) && o.in();
  }
}
function Bd(t, e) {
  if (t.nodes)
    for (var n = t.nodes.start, r = t.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Ki(n);
      e.append(n), n = i;
    }
}
let ks = !1, Qt = !1;
function Mc(t) {
  Qt = t;
}
let J = null, xt = !1;
function zt(t) {
  J = t;
}
let Y = null;
function Cn(t) {
  Y = t;
}
let mt = null;
function zd(t) {
  J !== null && (mt === null ? mt = [t] : mt.push(t));
}
let Ke = null, Qe = 0, ut = null;
function Gm(t) {
  ut = t;
}
let Fd = 1, Wn = 0, er = Wn;
function Ec(t) {
  er = t;
}
function Vd() {
  return ++Fd;
}
function Gi(t) {
  var e = t.f;
  if ((e & De) !== 0)
    return !0;
  if (e & ze && (t.f &= ~or), (e & Bt) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      t.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (Gi(
        /** @type {Derived} */
        s
      ) && Sd(
        /** @type {Derived} */
        s
      ), s.wv > t.wv)
        return !0;
    }
    (e & ht) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Oe === null && de(t, ke);
  }
  return !1;
}
function Hd(t, e, n = !0) {
  var r = t.reactions;
  if (r !== null && !(mt !== null && Ir.call(mt, t)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & ze) !== 0 ? Hd(
        /** @type {Derived} */
        s,
        e,
        !1
      ) : e === s && (n ? de(s, De) : (s.f & ke) !== 0 && de(s, Bt), ka(
        /** @type {Effect} */
        s
      ));
    }
}
function jd(t) {
  var m;
  var e = Ke, n = Qe, r = ut, i = J, s = mt, o = Be, l = xt, a = er, c = t.f;
  Ke = /** @type {null | Value[]} */
  null, Qe = 0, ut = null, J = (c & (Mt | Rr)) === 0 ? t : null, mt = null, Es(t.ctx), xt = !1, er = ++Wn, t.ac !== null && (Ur(() => {
    t.ac.abort(Kt);
  }), t.ac = null);
  try {
    t.f |= Nl;
    var u = (
      /** @type {Function} */
      t.fn
    ), d = u();
    t.f |= pr;
    var f = t.deps, h = W == null ? void 0 : W.is_fork;
    if (Ke !== null) {
      var p;
      if (h || Ci(t, Qe), f !== null && Qe > 0)
        for (f.length = Qe + Ke.length, p = 0; p < Ke.length; p++)
          f[Qe + p] = Ke[p];
      else
        t.deps = f = Ke;
      if (_d() && (t.f & ht) !== 0)
        for (p = Qe; p < f.length; p++)
          ((m = f[p]).reactions ?? (m.reactions = [])).push(t);
    } else !h && f !== null && Qe < f.length && (Ci(t, Qe), f.length = Qe);
    if (qi() && ut !== null && !xt && f !== null && (t.f & (ze | Bt | De)) === 0)
      for (p = 0; p < /** @type {Source[]} */
      ut.length; p++)
        Hd(
          ut[p],
          /** @type {Effect} */
          t
        );
    if (i !== null && i !== t) {
      if (Wn++, i.deps !== null)
        for (let g = 0; g < n; g += 1)
          i.deps[g].rv = Wn;
      if (e !== null)
        for (const g of e)
          g.rv = Wn;
      ut !== null && (r === null ? r = ut : r.push(.../** @type {Source[]} */
      ut));
    }
    return (t.f & vn) !== 0 && (t.f ^= vn), d;
  } catch (g) {
    return Sm(g);
  } finally {
    t.f ^= Nl, Ke = e, Qe = n, ut = r, J = i, mt = s, Es(o), xt = l, er = a;
  }
}
function Ym(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = Yp.call(n, t);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = e.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (e.f & ze) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Ke === null || !Ir.call(Ke, e))) {
    var s = (
      /** @type {Derived} */
      e
    );
    (s.f & ht) !== 0 && (s.f ^= ht, s.f &= ~or), s.v !== be && ya(s), Rm(s), Ci(s, 0);
  }
}
function Ci(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var r = e; r < n.length; r++)
      Ym(t, n[r]);
}
function Br(t) {
  var e = t.f;
  if ((e & it) === 0) {
    de(t, ke);
    var n = Y, r = ks;
    Y = t, ks = !0;
    try {
      (e & (Lt | va)) !== 0 ? $m(t) : Ma(t), Id(t);
      var i = jd(t);
      t.teardown = typeof i == "function" ? i : null, t.wv = Fd;
      var s;
      Gp && km && (t.f & De) !== 0 && t.deps;
    } finally {
      ks = r, Y = n;
    }
  }
}
async function Xm() {
  await Promise.resolve(), _m();
}
function w(t) {
  var e = t.f, n = (e & ze) !== 0;
  if (J !== null && !xt) {
    var r = Y !== null && (Y.f & it) !== 0;
    if (!r && (mt === null || !Ir.call(mt, t))) {
      var i = J.deps;
      if ((J.f & Nl) !== 0)
        t.rv < Wn && (t.rv = Wn, Ke === null && i !== null && i[Qe] === t ? Qe++ : Ke === null ? Ke = [t] : Ke.push(t));
      else {
        (J.deps ?? (J.deps = [])).push(t);
        var s = t.reactions;
        s === null ? t.reactions = [J] : Ir.call(s, J) || s.push(J);
      }
    }
  }
  if (Qt && Qn.has(t))
    return Qn.get(t);
  if (n) {
    var o = (
      /** @type {Derived} */
      t
    );
    if (Qt) {
      var l = o.v;
      return ((o.f & ke) === 0 && o.reactions !== null || Ud(o)) && (l = xa(o)), Qn.set(o, l), l;
    }
    var a = (o.f & ht) === 0 && !xt && J !== null && (ks || (J.f & ht) !== 0), c = (o.f & pr) === 0;
    Gi(o) && (a && (o.f |= ht), Sd(o)), a && !c && (Cd(o), Wd(o));
  }
  if (Oe != null && Oe.has(t))
    return Oe.get(t);
  if ((t.f & vn) !== 0)
    throw t.v;
  return t.v;
}
function Wd(t) {
  if (t.f |= ht, t.deps !== null)
    for (const e of t.deps)
      (e.reactions ?? (e.reactions = [])).push(t), (e.f & ze) !== 0 && (e.f & ht) === 0 && (Cd(
        /** @type {Derived} */
        e
      ), Wd(
        /** @type {Derived} */
        e
      ));
}
function Ud(t) {
  if (t.v === be) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (Qn.has(e) || (e.f & ze) !== 0 && Ud(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function Ao(t) {
  var e = xt;
  try {
    return xt = !0, t();
  } finally {
    xt = e;
  }
}
const Un = Symbol("events"), Qm = /* @__PURE__ */ new Set(), Zm = /* @__PURE__ */ new Set();
function qd(t, e, n, r = {}) {
  function i(s) {
    if (r.capture || eg.call(e, s), !s.cancelBubble)
      return Ur(() => n == null ? void 0 : n.call(this, s));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? ki(() => {
    e.addEventListener(t, i, r);
  }) : e.addEventListener(t, i, r), i;
}
function $r(t, e, n, r, i) {
  var s = { capture: r, passive: i }, o = qd(t, e, n, s);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Ji(() => {
    e.removeEventListener(t, o, s);
  });
}
function gt(t, e, n) {
  (e[Un] ?? (e[Un] = {}))[t] = n;
}
function _n(t) {
  for (var e = 0; e < t.length; e++)
    Qm.add(t[e]);
  for (var n of Zm)
    n(t);
}
let Tc = null;
function eg(t) {
  var g, v;
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, i = ((g = t.composedPath) == null ? void 0 : g.call(t)) || [], s = (
    /** @type {null | Element} */
    i[0] || t.target
  );
  Tc = t;
  var o = 0, l = Tc === t && t[Un];
  if (l) {
    var a = i.indexOf(l);
    if (a !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t[Un] = e;
      return;
    }
    var c = i.indexOf(e);
    if (c === -1)
      return;
    a <= c && (o = a);
  }
  if (s = /** @type {Element} */
  i[o] || t.target, s !== e) {
    Xp(t, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var u = J, d = Y;
    zt(null), Cn(null);
    try {
      for (var f, h = []; s !== null; ) {
        var p = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var m = (v = s[Un]) == null ? void 0 : v[r];
          m != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === s) && m.call(s, t);
        } catch (y) {
          f ? h.push(y) : f = y;
        }
        if (t.cancelBubble || p === e || p === null)
          break;
        s = p;
      }
      if (f) {
        for (let y of h)
          queueMicrotask(() => {
            throw y;
          });
        throw f;
      }
    } finally {
      t[Un] = e, delete t.currentTarget, zt(u), Cn(d);
    }
  }
}
var rd;
const Go = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((rd = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : rd.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (t) => t
  })
);
function tg(t) {
  return (
    /** @type {string} */
    (Go == null ? void 0 : Go.createHTML(t)) ?? t
  );
}
function Kd(t) {
  var e = Ad("template");
  return e.innerHTML = tg(t.replaceAll("<!>", "<!---->")), e.content;
}
function Mn(t, e) {
  var n = (
    /** @type {Effect} */
    Y
  );
  n.nodes === null && (n.nodes = { start: t, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function z(t, e) {
  var n = (e & ld) !== 0, r = (e & qp) !== 0, i, s = !t.startsWith("<!>");
  return () => {
    i === void 0 && (i = Kd(s ? t : "<!>" + t), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ nt(i)));
    var o = (
      /** @type {TemplateNode} */
      r || zm ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ nt(o)
      ), a = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Mn(l, a);
    } else
      Mn(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function ng(t, e, n = "svg") {
  var r = !t.startsWith("<!>"), i = (e & ld) !== 0, s = `<${n}>${r ? t : "<!>" + t}</${n}>`, o;
  return () => {
    if (!o) {
      var l = (
        /** @type {DocumentFragment} */
        Kd(s)
      ), a = (
        /** @type {Element} */
        /* @__PURE__ */ nt(l)
      );
      if (i)
        for (o = document.createDocumentFragment(); /* @__PURE__ */ nt(a); )
          o.appendChild(
            /** @type {TemplateNode} */
            /* @__PURE__ */ nt(a)
          );
      else
        o = /** @type {Element} */
        /* @__PURE__ */ nt(a);
    }
    var c = (
      /** @type {TemplateNode} */
      o.cloneNode(!0)
    );
    if (i) {
      var u = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ nt(c)
      ), d = (
        /** @type {TemplateNode} */
        c.lastChild
      );
      Mn(u, d);
    } else
      Mn(c, c);
    return c;
  };
}
// @__NO_SIDE_EFFECTS__
function Z(t, e) {
  return /* @__PURE__ */ ng(t, e, "svg");
}
function Mi(t = "") {
  {
    var e = Zn(t + "");
    return Mn(e, e), e;
  }
}
function Aa() {
  var t = document.createDocumentFragment(), e = document.createComment(""), n = Zn();
  return t.append(e, n), Mn(e, n), t;
}
function _(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function rg(t) {
  return t.endsWith("capture") && t !== "gotpointercapture" && t !== "lostpointercapture";
}
const ig = [
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
function sg(t) {
  return ig.includes(t);
}
const og = {
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
function lg(t) {
  return t = t.toLowerCase(), og[t] ?? t;
}
function Re(t, e) {
  var n = e == null ? "" : typeof e == "object" ? `${e}` : e;
  n !== (t.__t ?? (t.__t = t.nodeValue)) && (t.__t = n, t.nodeValue = `${n}`);
}
var kt, Dt, et, Xn, ji, Wi, xo;
class Jd {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, n = !0) {
    /** @type {TemplateNode} */
    oe(this, "anchor");
    /** @type {Map<Batch, Key>} */
    ie(this, kt, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    ie(this, Dt, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    ie(this, et, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    ie(this, Xn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    ie(this, ji, !0);
    /**
     * @param {Batch} batch
     */
    ie(this, Wi, (e) => {
      if (T(this, kt).has(e)) {
        var n = (
          /** @type {Key} */
          T(this, kt).get(e)
        ), r = T(this, Dt).get(n);
        if (r)
          Ta(r), T(this, Xn).delete(n);
        else {
          var i = T(this, et).get(n);
          i && (T(this, Dt).set(n, i.effect), T(this, et).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, o] of T(this, kt)) {
          if (T(this, kt).delete(s), s === e)
            break;
          const l = T(this, et).get(o);
          l && (pt(l.effect), T(this, et).delete(o));
        }
        for (const [s, o] of T(this, Dt)) {
          if (s === n || T(this, Xn).has(s)) continue;
          const l = () => {
            if (Array.from(T(this, kt).values()).includes(s)) {
              var c = document.createDocumentFragment();
              Bd(o, c), c.append(Zn()), T(this, et).set(s, { effect: o, fragment: c });
            } else
              pt(o);
            T(this, Xn).delete(s), T(this, Dt).delete(s);
          };
          T(this, ji) || !r ? (T(this, Xn).add(s), Ea(o, l, !1)) : l();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    ie(this, xo, (e) => {
      T(this, kt).delete(e);
      const n = Array.from(T(this, kt).values());
      for (const [r, i] of T(this, et))
        n.includes(r) || (pt(i.effect), T(this, et).delete(r));
    });
    this.anchor = e, Rn(this, ji, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, n) {
    var r = (
      /** @type {Batch} */
      W
    ), i = Td();
    if (n && !T(this, Dt).has(e) && !T(this, et).has(e))
      if (i) {
        var s = document.createDocumentFragment(), o = Zn();
        s.append(o), T(this, et).set(e, {
          effect: lr(() => n(o)),
          fragment: s
        });
      } else
        T(this, Dt).set(
          e,
          lr(() => n(this.anchor))
        );
    if (T(this, kt).set(r, e), i) {
      for (const [l, a] of T(this, Dt))
        l === e ? r.unskip_effect(a) : r.skip_effect(a);
      for (const [l, a] of T(this, et))
        l === e ? r.unskip_effect(a.effect) : r.skip_effect(a.effect);
      r.oncommit(T(this, Wi)), r.ondiscard(T(this, xo));
    } else
      T(this, Wi).call(this, r);
  }
}
kt = new WeakMap(), Dt = new WeakMap(), et = new WeakMap(), Xn = new WeakMap(), ji = new WeakMap(), Wi = new WeakMap(), xo = new WeakMap();
function Et(t, e, ...n) {
  var r = new Jd(t);
  Ca(() => {
    const i = e() ?? null;
    r.ensure(i, i && ((s) => i(s, ...n)));
  }, Lr);
}
function re(t, e, n = !1) {
  var r = new Jd(t), i = n ? Lr : 0;
  function s(o, l) {
    r.ensure(o, l);
  }
  Ca(() => {
    var o = !1;
    e((l, a = 0) => {
      o = !0, s(a, l);
    }), o || s(-1, null);
  }, i);
}
function ar(t, e) {
  return e;
}
function ag(t, e, n) {
  for (var r = [], i = e.length, s, o = e.length, l = 0; l < i; l++) {
    let d = e[l];
    Ea(
      d,
      () => {
        if (s) {
          if (s.pending.delete(d), s.done.add(d), s.pending.size === 0) {
            var f = (
              /** @type {Set<EachOutroGroup>} */
              t.outrogroups
            );
            Ll(t, ga(s.done)), f.delete(s), f.size === 0 && (t.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var a = r.length === 0 && n !== null;
    if (a) {
      var c = (
        /** @type {Element} */
        n
      ), u = (
        /** @type {Element} */
        c.parentNode
      );
      Hm(u), u.append(c), t.items.clear();
    }
    Ll(t, e, !a);
  } else
    s = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (t.outrogroups ?? (t.outrogroups = /* @__PURE__ */ new Set())).add(s);
}
function Ll(t, e, n = !0) {
  var r;
  if (t.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const o of t.pending.values())
      for (const l of o)
        r.add(
          /** @type {EachItem} */
          t.items.get(l).e
        );
  }
  for (var i = 0; i < e.length; i++) {
    var s = e[i];
    if (r != null && r.has(s)) {
      s.f |= Rt;
      const o = document.createDocumentFragment();
      Bd(s, o);
    } else
      pt(e[i], n);
  }
}
var Ac;
function En(t, e, n, r, i, s = null) {
  var o = t, l = /* @__PURE__ */ new Map(), a = (e & od) !== 0;
  if (a) {
    var c = (
      /** @type {Element} */
      t
    );
    o = c.appendChild(Zn());
  }
  var u = null, d = /* @__PURE__ */ wa(() => {
    var b = n();
    return ma(b) ? b : b == null ? [] : ga(b);
  }), f, h = /* @__PURE__ */ new Map(), p = !0;
  function m(b) {
    (y.effect.f & it) === 0 && (y.pending.delete(b), y.fallback = u, cg(y, f, o, e, r), u !== null && (f.length === 0 ? (u.f & Rt) === 0 ? Ta(u) : (u.f ^= Rt, ti(u, null, o)) : Ea(u, () => {
      u = null;
    })));
  }
  function g(b) {
    y.pending.delete(b);
  }
  var v = Ca(() => {
    f = /** @type {V[]} */
    w(d);
    for (var b = f.length, k = /* @__PURE__ */ new Set(), x = (
      /** @type {Batch} */
      W
    ), C = Td(), S = 0; S < b; S += 1) {
      var O = f[S], R = r(O, S), U = p ? null : l.get(R);
      U ? (U.v && Si(U.v, O), U.i && Si(U.i, S), C && x.unskip_effect(U.e)) : (U = ug(
        l,
        p ? o : Ac ?? (Ac = Zn()),
        O,
        R,
        S,
        i,
        e,
        n
      ), p || (U.e.f |= Rt), l.set(R, U)), k.add(R);
    }
    if (b === 0 && s && !u && (p ? u = lr(() => s(o)) : (u = lr(() => s(Ac ?? (Ac = Zn()))), u.f |= Rt)), b > k.size && am(), !p)
      if (h.set(x, k), C) {
        for (const [ve, ye] of l)
          k.has(ve) || x.skip_effect(ye.e);
        x.oncommit(m), x.ondiscard(g);
      } else
        m(x);
    w(d);
  }), y = { effect: v, items: l, pending: h, outrogroups: null, fallback: u };
  p = !1;
}
function Gr(t) {
  for (; t !== null && (t.f & Mt) === 0; )
    t = t.next;
  return t;
}
function cg(t, e, n, r, i) {
  var U, ve, ye, ue, M, N, Ge, lt, In;
  var s = (r & zp) !== 0, o = e.length, l = t.items, a = Gr(t.effect.first), c, u = null, d, f = [], h = [], p, m, g, v;
  if (s)
    for (v = 0; v < o; v += 1)
      p = e[v], m = i(p, v), g = /** @type {EachItem} */
      l.get(m).e, (g.f & Rt) === 0 && ((ve = (U = g.nodes) == null ? void 0 : U.a) == null || ve.measure(), (d ?? (d = /* @__PURE__ */ new Set())).add(g));
  for (v = 0; v < o; v += 1) {
    if (p = e[v], m = i(p, v), g = /** @type {EachItem} */
    l.get(m).e, t.outrogroups !== null)
      for (const Te of t.outrogroups)
        Te.pending.delete(g), Te.done.delete(g);
    if ((g.f & He) !== 0 && (Ta(g), s && ((ue = (ye = g.nodes) == null ? void 0 : ye.a) == null || ue.unfix(), (d ?? (d = /* @__PURE__ */ new Set())).delete(g))), (g.f & Rt) !== 0)
      if (g.f ^= Rt, g === a)
        ti(g, null, n);
      else {
        var y = u ? u.next : a;
        g === t.effect.last && (t.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), tn(t, u, g), tn(t, g, y), ti(g, y, n), u = g, f = [], h = [], a = Gr(u.next);
        continue;
      }
    if (g !== a) {
      if (c !== void 0 && c.has(g)) {
        if (f.length < h.length) {
          var b = h[0], k;
          u = b.prev;
          var x = f[0], C = f[f.length - 1];
          for (k = 0; k < f.length; k += 1)
            ti(f[k], b, n);
          for (k = 0; k < h.length; k += 1)
            c.delete(h[k]);
          tn(t, x.prev, C.next), tn(t, u, x), tn(t, C, b), a = b, u = C, v -= 1, f = [], h = [];
        } else
          c.delete(g), ti(g, a, n), tn(t, g.prev, g.next), tn(t, g, u === null ? t.effect.first : u.next), tn(t, u, g), u = g;
        continue;
      }
      for (f = [], h = []; a !== null && a !== g; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(a), h.push(a), a = Gr(a.next);
      if (a === null)
        continue;
    }
    (g.f & Rt) === 0 && f.push(g), u = g, a = Gr(g.next);
  }
  if (t.outrogroups !== null) {
    for (const Te of t.outrogroups)
      Te.pending.size === 0 && (Ll(t, ga(Te.done)), (M = t.outrogroups) == null || M.delete(Te));
    t.outrogroups.size === 0 && (t.outrogroups = null);
  }
  if (a !== null || c !== void 0) {
    var S = [];
    if (c !== void 0)
      for (g of c)
        (g.f & He) === 0 && S.push(g);
    for (; a !== null; )
      (a.f & He) === 0 && a !== t.fallback && S.push(a), a = Gr(a.next);
    var O = S.length;
    if (O > 0) {
      var R = (r & od) !== 0 && o === 0 ? n : null;
      if (s) {
        for (v = 0; v < O; v += 1)
          (Ge = (N = S[v].nodes) == null ? void 0 : N.a) == null || Ge.measure();
        for (v = 0; v < O; v += 1)
          (In = (lt = S[v].nodes) == null ? void 0 : lt.a) == null || In.fix();
      }
      ag(t, S, R);
    }
  }
  s && ki(() => {
    var Te, Dn;
    if (d !== void 0)
      for (g of d)
        (Dn = (Te = g.nodes) == null ? void 0 : Te.a) == null || Dn.apply();
  });
}
function ug(t, e, n, r, i, s, o, l) {
  var a = (o & Pp) !== 0 ? (o & Fp) === 0 ? /* @__PURE__ */ Lm(n, !1, !1) : xi(n) : null, c = (o & Bp) !== 0 ? xi(i) : null;
  return {
    v: a,
    i: c,
    e: lr(() => (s(e, a ?? n, c ?? i, l), () => {
      t.delete(r);
    }))
  };
}
function ti(t, e, n) {
  if (t.nodes)
    for (var r = t.nodes.start, i = t.nodes.end, s = e && (e.f & Rt) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : n; r !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Ki(r)
      );
      if (s.before(r), r === i)
        return;
      r = o;
    }
}
function tn(t, e, n) {
  e === null ? t.effect.first = n : e.next = n, n === null ? t.effect.last = e : n.prev = e;
}
function dg(t, e, n = !1, r = !1, i = !1, s = !1) {
  var o = t, l = "";
  if (n)
    var a = (
      /** @type {Element} */
      t
    );
  V(() => {
    var c = (
      /** @type {Effect} */
      Y
    );
    if (l !== (l = e() ?? "")) {
      if (n) {
        c.nodes = null, a.innerHTML = /** @type {string} */
        l, l !== "" && Mn(
          /** @type {TemplateNode} */
          /* @__PURE__ */ nt(a),
          /** @type {TemplateNode} */
          a.lastChild
        );
        return;
      }
      if (c.nodes !== null && (Dd(
        c.nodes.start,
        /** @type {TemplateNode} */
        c.nodes.end
      ), c.nodes = null), l !== "") {
        var u = r ? Kp : i ? Jp : void 0, d = (
          /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */
          Ad(r ? "svg" : i ? "math" : "template", u)
        );
        d.innerHTML = /** @type {any} */
        l;
        var f = r || i ? d : (
          /** @type {HTMLTemplateElement} */
          d.content
        );
        if (Mn(
          /** @type {TemplateNode} */
          /* @__PURE__ */ nt(f),
          /** @type {TemplateNode} */
          f.lastChild
        ), r || i)
          for (; /* @__PURE__ */ nt(f); )
            o.before(
              /** @type {TemplateNode} */
              /* @__PURE__ */ nt(f)
            );
        else
          o.before(f);
      }
    }
  });
}
function fg(t, e) {
  var n = void 0, r;
  Nd(() => {
    n !== (n = e()) && (r && (pt(r), r = null), n && (r = lr(() => {
      $i(() => (
        /** @type {(node: Element) => void} */
        n(t)
      ));
    })));
  });
}
function $d(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var i = t.length;
    for (e = 0; e < i; e++) t[e] && (n = $d(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function ne() {
  for (var t, e, n = 0, r = "", i = arguments.length; n < i; n++) (t = arguments[n]) && (e = $d(t)) && (r && (r += " "), r += e);
  return r;
}
function F(t) {
  return typeof t == "object" ? ne(t) : t ?? "";
}
const _c = [...` 	
\r\f \v\uFEFF`];
function hg(t, e, n) {
  var r = t == null ? "" : "" + t;
  if (e && (r = r ? r + " " + e : e), n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, o = 0; (o = r.indexOf(i, o)) >= 0; ) {
          var l = o + s;
          (o === 0 || _c.includes(r[o - 1])) && (l === r.length || _c.includes(r[l])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(l + 1) : o = l;
        }
  }
  return r === "" ? null : r;
}
function Oc(t, e = !1) {
  var n = e ? " !important;" : ";", r = "";
  for (var i of Object.keys(t)) {
    var s = t[i];
    s != null && s !== "" && (r += " " + i + ": " + s + n);
  }
  return r;
}
function Yo(t) {
  return t[0] !== "-" || t[1] !== "-" ? t.toLowerCase() : t;
}
function pg(t, e) {
  if (e) {
    var n = "", r, i;
    if (Array.isArray(e) ? (r = e[0], i = e[1]) : r = e, t) {
      t = String(t).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var s = !1, o = 0, l = !1, a = [];
      r && a.push(...Object.keys(r).map(Yo)), i && a.push(...Object.keys(i).map(Yo));
      var c = 0, u = -1;
      const m = t.length;
      for (var d = 0; d < m; d++) {
        var f = t[d];
        if (l ? f === "/" && t[d - 1] === "*" && (l = !1) : s ? s === f && (s = !1) : f === "/" && t[d + 1] === "*" ? l = !0 : f === '"' || f === "'" ? s = f : f === "(" ? o++ : f === ")" && o--, !l && s === !1 && o === 0) {
          if (f === ":" && u === -1)
            u = d;
          else if (f === ";" || d === m - 1) {
            if (u !== -1) {
              var h = Yo(t.substring(c, u).trim());
              if (!a.includes(h)) {
                f !== ";" && d++;
                var p = t.substring(c, d).trim();
                n += " " + p + ";";
              }
            }
            c = d + 1, u = -1;
          }
        }
      }
    }
    return r && (n += Oc(r)), i && (n += Oc(i, !0)), n = n.trim(), n === "" ? null : n;
  }
  return t == null ? null : String(t);
}
function D(t, e, n, r, i, s) {
  var o = t.__className;
  if (o !== n || o === void 0) {
    var l = hg(n, r, s);
    l == null ? t.removeAttribute("class") : e ? t.className = l : t.setAttribute("class", l), t.__className = n;
  } else if (s && i !== s)
    for (var a in s) {
      var c = !!s[a];
      (i == null || c !== !!i[a]) && t.classList.toggle(a, c);
    }
  return s;
}
function Xo(t, e = {}, n, r) {
  for (var i in n) {
    var s = n[i];
    e[i] !== s && (n[i] == null ? t.style.removeProperty(i) : t.style.setProperty(i, s, r));
  }
}
function Yi(t, e, n, r) {
  var i = t.__style;
  if (i !== e) {
    var s = pg(e, r);
    s == null ? t.removeAttribute("style") : t.style.cssText = s, t.__style = e;
  } else r && (Array.isArray(r) ? (Xo(t, n == null ? void 0 : n[0], r[0]), Xo(t, n == null ? void 0 : n[1], r[1], "important")) : Xo(t, n, r));
  return r;
}
function _s(t, e, n = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!ma(e))
      return ym();
    for (var r of t.options)
      r.selected = e.includes(li(r));
    return;
  }
  for (r of t.options) {
    var i = li(r);
    if (Bm(i, e)) {
      r.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function Gd(t) {
  var e = new MutationObserver(() => {
    _s(t, t.__value);
  });
  e.observe(t, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Ji(() => {
    e.disconnect();
  });
}
function mg(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet(), i = !0;
  Sa(t, "change", (s) => {
    var o = s ? "[selected]" : ":checked", l;
    if (t.multiple)
      l = [].map.call(t.querySelectorAll(o), li);
    else {
      var a = t.querySelector(o) ?? // will fall back to first non-disabled option if no option is selected
      t.querySelector("option:not([disabled])");
      l = a && li(a);
    }
    n(l), t.__value = l, W !== null && r.add(W);
  }), $i(() => {
    var s = e();
    if (t === document.activeElement) {
      var o = (
        /** @type {Batch} */
        W
      );
      if (r.has(o))
        return;
    }
    if (_s(t, s, i), i && s === void 0) {
      var l = t.querySelector(":checked");
      l !== null && (s = li(l), n(s));
    }
    t.__value = s, i = !1;
  }), Gd(t);
}
function li(t) {
  return "__value" in t ? t.__value : t.value;
}
const Yr = Symbol("class"), Xr = Symbol("style"), Yd = Symbol("is custom element"), Xd = Symbol("is html"), gg = fd ? "option" : "OPTION", vg = fd ? "select" : "SELECT";
function yg(t, e) {
  e ? t.hasAttribute("selected") || t.setAttribute("selected", "") : t.removeAttribute("selected");
}
function tt(t, e, n, r) {
  var i = Qd(t);
  i[e] !== (i[e] = n) && (e === "loading" && (t[om] = n), n == null ? t.removeAttribute(e) : typeof n != "string" && Zd(t).includes(e) ? t[e] = n : t.setAttribute(e, n));
}
function bg(t, e, n, r, i = !1, s = !1) {
  var o = Qd(t), l = o[Yd], a = !o[Xd], c = e || {}, u = t.nodeName === gg;
  for (var d in e)
    d in n || (n[d] = null);
  n.class ? n.class = F(n.class) : n[Yr] && (n.class = null), n[Xr] && (n.style ?? (n.style = null));
  var f = Zd(t);
  for (const b in n) {
    let k = n[b];
    if (u && b === "value" && k == null) {
      t.value = t.__value = "", c[b] = k;
      continue;
    }
    if (b === "class") {
      var h = t.namespaceURI === "http://www.w3.org/1999/xhtml";
      D(t, h, k, r, e == null ? void 0 : e[Yr], n[Yr]), c[b] = k, c[Yr] = n[Yr];
      continue;
    }
    if (b === "style") {
      Yi(t, k, e == null ? void 0 : e[Xr], n[Xr]), c[b] = k, c[Xr] = n[Xr];
      continue;
    }
    var p = c[b];
    if (!(k === p && !(k === void 0 && t.hasAttribute(b)))) {
      c[b] = k;
      var m = b[0] + b[1];
      if (m !== "$$")
        if (m === "on") {
          const x = {}, C = "$$" + b;
          let S = b.slice(2);
          var g = sg(S);
          if (rg(S) && (S = S.slice(0, -7), x.capture = !0), !g && p) {
            if (k != null) continue;
            t.removeEventListener(S, c[C], x), c[C] = null;
          }
          if (g)
            gt(S, t, k), _n([S]);
          else if (k != null) {
            let O = function(R) {
              c[b].call(this, R);
            };
            c[C] = qd(S, t, O, x);
          }
        } else if (b === "style")
          tt(t, b, k);
        else if (b === "autofocus")
          jm(
            /** @type {HTMLElement} */
            t,
            !!k
          );
        else if (!l && (b === "__value" || b === "value" && k != null))
          t.value = t.__value = k;
        else if (b === "selected" && u)
          yg(
            /** @type {HTMLOptionElement} */
            t,
            k
          );
        else {
          var v = b;
          a || (v = lg(v));
          var y = v === "defaultValue" || v === "defaultChecked";
          if (k == null && !l && !y)
            if (o[b] = null, v === "value" || v === "checked") {
              let x = (
                /** @type {HTMLInputElement} */
                t
              );
              const C = e === void 0;
              if (v === "value") {
                let S = x.defaultValue;
                x.removeAttribute(v), x.defaultValue = S, x.value = x.__value = C ? S : null;
              } else {
                let S = x.defaultChecked;
                x.removeAttribute(v), x.defaultChecked = S, x.checked = C ? S : !1;
              }
            } else
              t.removeAttribute(b);
          else y || f.includes(v) && (l || typeof k != "string") ? (t[v] = k, v in o && (o[v] = be)) : typeof k != "function" && tt(t, v, k);
        }
    }
  }
  return c;
}
function Ei(t, e, n = [], r = [], i = [], s, o = !1, l = !1) {
  wd(i, n, r, (a) => {
    var c = void 0, u = {}, d = t.nodeName === vg, f = !1;
    if (Nd(() => {
      var p = e(...a.map(w)), m = bg(
        t,
        c,
        p,
        s,
        o,
        l
      );
      f && d && "value" in p && _s(
        /** @type {HTMLSelectElement} */
        t,
        p.value
      );
      for (let v of Object.getOwnPropertySymbols(u))
        p[v] || pt(u[v]);
      for (let v of Object.getOwnPropertySymbols(p)) {
        var g = p[v];
        v.description === $p && (!c || g !== c[v]) && (u[v] && pt(u[v]), u[v] = lr(() => fg(t, () => g))), m[v] = g;
      }
      c = m;
    }), d) {
      var h = (
        /** @type {HTMLSelectElement} */
        t
      );
      $i(() => {
        _s(
          h,
          /** @type {Record<string | symbol, any>} */
          c.value,
          !0
        ), Gd(h);
      });
    }
    f = !0;
  });
}
function Qd(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    t.__attributes ?? (t.__attributes = {
      [Yd]: t.nodeName.includes("-"),
      [Xd]: t.namespaceURI === ad
    })
  );
}
var Nc = /* @__PURE__ */ new Map();
function Zd(t) {
  var e = t.getAttribute("is") || t.nodeName, n = Nc.get(e);
  if (n) return n;
  Nc.set(e, n = []);
  for (var r, i = t, s = Element.prototype; s !== i; ) {
    r = Qp(i);
    for (var o in r)
      r[o].set && n.push(o);
    i = cd(i);
  }
  return n;
}
function Pl(t, e, n = e) {
  var r = /* @__PURE__ */ new WeakSet();
  Sa(t, "input", async (i) => {
    var s = i ? t.defaultValue : t.value;
    if (s = Qo(t) ? Zo(s) : s, n(s), W !== null && r.add(W), await Xm(), s !== (s = e())) {
      var o = t.selectionStart, l = t.selectionEnd, a = t.value.length;
      if (t.value = s ?? "", l !== null) {
        var c = t.value.length;
        o === l && l === a && c > a ? (t.selectionStart = c, t.selectionEnd = c) : (t.selectionStart = o, t.selectionEnd = Math.min(l, c));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Ao(e) == null && t.value && (n(Qo(t) ? Zo(t.value) : t.value), W !== null && r.add(W)), To(() => {
    var i = e();
    if (t === document.activeElement) {
      var s = (
        /** @type {Batch} */
        W
      );
      if (r.has(s))
        return;
    }
    Qo(t) && i === Zo(t.value) || t.type === "date" && !i && !t.value || i !== t.value && (t.value = i ?? "");
  });
}
function kg(t, e, n = e) {
  Sa(t, "change", (r) => {
    var i = r ? t.defaultChecked : t.checked;
    n(i);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  Ao(e) == null && n(t.checked), To(() => {
    var r = e();
    t.checked = !!r;
  });
}
function Qo(t) {
  var e = t.type;
  return e === "number" || e === "range";
}
function Zo(t) {
  return t === "" ? null : +t;
}
function Ic(t, e) {
  return t === e || (t == null ? void 0 : t[yn]) === e;
}
function Ti(t = {}, e, n, r) {
  var i = (
    /** @type {ComponentContext} */
    Be.r
  ), s = (
    /** @type {Effect} */
    Y
  );
  return $i(() => {
    var o, l;
    return To(() => {
      o = l, l = [], Ao(() => {
        t !== n(...l) && (e(t, ...l), o && Ic(n(...o), t) && e(null, ...o));
      });
    }), () => {
      let a = s;
      for (; a !== i && a.parent !== null && a.parent.f & _l; )
        a = a.parent;
      const c = () => {
        l && Ic(n(...l), t) && e(null, ...l);
      }, u = a.teardown;
      a.teardown = () => {
        c(), u == null || u();
      };
    };
  }), t;
}
function wg(t, e, n = e) {
  var r = t === "x", i = () => Ur(() => {
    s = !0, clearTimeout(o), o = setTimeout(l, 100), n(window[r ? "scrollX" : "scrollY"]);
  });
  addEventListener("scroll", i, {
    passive: !0
  });
  var s = !1, o, l = () => {
    s = !1;
  }, a = !0;
  To(() => {
    var c = e();
    a ? a = !1 : !s && c != null && (s = !0, clearTimeout(o), scrollTo(window.scrollX, c), o = setTimeout(l, 100));
  }), $i(i), Ji(() => {
    removeEventListener("scroll", i);
  });
}
function xg(t, e) {
  Um(window, ["resize"], () => Ur(() => e(window[t])));
}
const Sg = {
  get(t, e) {
    if (!t.exclude.includes(e))
      return t.props[e];
  },
  set(t, e) {
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    if (!t.exclude.includes(e) && e in t.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: t.props[e]
      };
  },
  has(t, e) {
    return t.exclude.includes(e) ? !1 : e in t.props;
  },
  ownKeys(t) {
    return Reflect.ownKeys(t.props).filter((e) => !t.exclude.includes(e));
  }
};
// @__NO_SIDE_EFFECTS__
function Xi(t, e, n) {
  return new Proxy(
    { props: t, exclude: e },
    Sg
  );
}
const Cg = {
  get(t, e) {
    let n = t.props.length;
    for (; n--; ) {
      let r = t.props[n];
      if (Jr(r) && (r = r()), typeof r == "object" && r !== null && e in r) return r[e];
    }
  },
  set(t, e, n) {
    let r = t.props.length;
    for (; r--; ) {
      let i = t.props[r];
      Jr(i) && (i = i());
      const s = Mr(i, e);
      if (s && s.set)
        return s.set(n), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    let n = t.props.length;
    for (; n--; ) {
      let r = t.props[n];
      if (Jr(r) && (r = r()), typeof r == "object" && r !== null && e in r) {
        const i = Mr(r, e);
        return i && !i.configurable && (i.configurable = !0), i;
      }
    }
  },
  has(t, e) {
    if (e === yn || e === dd) return !1;
    for (let n of t.props)
      if (Jr(n) && (n = n()), n != null && e in n) return !0;
    return !1;
  },
  ownKeys(t) {
    const e = [];
    for (let n of t.props)
      if (Jr(n) && (n = n()), !!n) {
        for (const r in n)
          e.includes(r) || e.push(r);
        for (const r of Object.getOwnPropertySymbols(n))
          e.includes(r) || e.push(r);
      }
    return e;
  }
};
function Mg(...t) {
  return new Proxy({ props: t }, Cg);
}
function H(t, e, n, r) {
  var b;
  var i = !Ui || (n & Hp) !== 0, s = (n & Wp) !== 0, o = (n & Up) !== 0, l = (
    /** @type {V} */
    r
  ), a = !0, c = () => (a && (a = !1, l = o ? Ao(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), l);
  let u;
  if (s) {
    var d = yn in t || dd in t;
    u = ((b = Mr(t, e)) == null ? void 0 : b.set) ?? (d && e in t ? (k) => t[e] = k : void 0);
  }
  var f, h = !1;
  s ? [f, h] = Em(() => (
    /** @type {V} */
    t[e]
  )) : f = /** @type {V} */
  t[e], f === void 0 && r !== void 0 && (f = c(), u && (i && hm(), u(f)));
  var p;
  if (i ? p = () => {
    var k = (
      /** @type {V} */
      t[e]
    );
    return k === void 0 ? c() : (a = !0, k);
  } : p = () => {
    var k = (
      /** @type {V} */
      t[e]
    );
    return k !== void 0 && (l = /** @type {V} */
    void 0), k === void 0 ? l : k;
  }, i && (n & jp) === 0)
    return p;
  if (u) {
    var m = t.$$legacy;
    return (
      /** @type {() => V} */
      function(k, x) {
        return arguments.length > 0 ? ((!i || !x || m || h) && u(x ? p() : k), k) : p();
      }
    );
  }
  var g = !1, v = ((n & Vp) !== 0 ? Eo : wa)(() => (g = !1, p()));
  s && w(v);
  var y = (
    /** @type {Effect} */
    Y
  );
  return (
    /** @type {() => V} */
    function(k, x) {
      if (arguments.length > 0) {
        const C = x ? w(v) : i && s ? hn(k) : k;
        return $(v, C), g = !0, l !== void 0 && (l = C), k;
      }
      return Qt && g || (y.f & it) !== 0 ? v.v : w(v);
    }
  );
}
const Eg = "_container_1gts7_1", Tg = "_options_1gts7_5", Ag = "_label_1gts7_9", _g = "_inputWrapper_1gts7_14", Og = "_innerInput_1gts7_18", Ng = "_spinnerContainer_1gts7_22", Ig = "_option_1gts7_5", Dg = "_optionButton_1gts7_45", nn = {
  container: Eg,
  options: Tg,
  label: Ag,
  inputWrapper: _g,
  innerInput: Og,
  spinnerContainer: Ng,
  option: Ig,
  optionButton: Dg
};
var Rg = /* @__PURE__ */ z("<div><!></div>"), Lg = /* @__PURE__ */ z('<li><button type="button"> </button></li>'), Pg = /* @__PURE__ */ z("<ul></ul>"), Bg = /* @__PURE__ */ z('<label for="autocomplete-input"> </label>'), zg = /* @__PURE__ */ z("<div><!> <div><!></div></div>");
function wC(t, e) {
  Ce(e, !0);
  const n = (v) => {
    var y = Aa(), b = Sn(y);
    {
      var k = (C) => {
        var S = Rg(), O = L(S);
        Ns(O, { size: "1.5rem" }), V((R) => D(S, 1, R), [() => F(ne(nn.spinnerContainer))]), _(C, S);
      }, x = (C) => {
        var S = Pg();
        En(S, 21, () => w(c), ar, (O, R) => {
          var U = Lg(), ve = L(U), ye = L(ve);
          V(() => {
            D(U, 1, F(nn.option)), D(ve, 1, F(nn.optionButton)), Re(ye, w(R));
          }), gt("mousedown", ve, () => d(w(R))), _(O, U);
        }), V(() => D(S, 1, F(nn.options))), _(C, S);
      };
      re(b, (C) => {
        o() ? C(k) : C(x, -1);
      });
    }
    _(v, y);
  }, r = (v) => {
    t1(v, Mg(
      {
        get class() {
          return nn.innerInput;
        },
        id: "autocomplete-input"
      },
      () => l,
      {
        get maxlength() {
          return e.maxlength;
        },
        onblur: () => $(a, !1),
        hideErrArea: !0,
        get value() {
          return s();
        },
        set value(y) {
          s(y);
        }
      }
    ));
  };
  let i = H(e, "options", 19, () => []), s = H(e, "value", 15, ""), o = H(e, "loading", 3, !1), l = /* @__PURE__ */ Xi(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "class",
    "label",
    "options",
    "value",
    "maxlength",
    "loading"
  ]), a = /* @__PURE__ */ ee(!1), c = /* @__PURE__ */ je(() => {
    var v;
    return ((v = i()) == null ? void 0 : v.filter((y) => y.toLowerCase().startsWith(s().toLowerCase()))) ?? [];
  }), u = /* @__PURE__ */ je(() => (Object.keys(w(c)).length > 0 || o()) && w(a));
  const d = (v) => {
    s(v), $(a, !1);
  };
  var f = zg(), h = L(f);
  {
    var p = (v) => {
      var y = Bg(), b = L(y);
      V(() => {
        D(y, 1, F(nn.label)), Re(b, e.label);
      }), _(v, y);
    };
    re(h, (v) => {
      e.label && v(p);
    });
  }
  var m = G(h, 2), g = L(m);
  V0(g, {
    get show() {
      return w(u);
    },
    get trigger() {
      return r;
    },
    get content() {
      return n;
    }
  }), V(
    (v) => {
      D(f, 1, v), D(m, 1, F(nn.inputWrapper));
    },
    [() => F(ne(nn.container, e.class))]
  ), gt("focusin", f, () => $(a, !0)), _(t, f), Me();
}
_n(["mousedown", "focusin"]);
const Fg = "_button_184cl_1", Vg = "_sm_184cl_33", Hg = "_md_184cl_39", jg = "_lg_184cl_45", Wg = "_round_184cl_51", Ug = "_box_184cl_54", qg = "_primary_184cl_57", Kg = "_animated_184cl_68", Jg = "_secondary_184cl_76", $g = "_plain_184cl_88", Gg = "_content_184cl_99", Yg = "_hidden_184cl_107", Xg = "_spinnerWrapper_184cl_111", Qg = "_anchor_184cl_121", Xe = {
  button: Fg,
  sm: Vg,
  md: Hg,
  lg: jg,
  round: Wg,
  box: Ug,
  primary: qg,
  animated: Kg,
  secondary: Jg,
  plain: $g,
  content: Gg,
  hidden: Yg,
  spinnerWrapper: Xg,
  anchor: Qg
};
var Zg = /* @__PURE__ */ z("<div><!></div>"), e0 = /* @__PURE__ */ z("<a><span><!></span> <!></a>"), t0 = /* @__PURE__ */ z("<div><!></div>"), n0 = /* @__PURE__ */ z("<button><span><!></span> <!></button>");
function Ai(t, e) {
  Ce(e, !0);
  let n = H(e, "animated", 3, !0), r = H(e, "variant", 3, "primary"), i = H(e, "size", 3, "md"), s = H(e, "shape", 3, "rectangular"), o = /* @__PURE__ */ Xi(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "class",
    "animated",
    "variant",
    "size",
    "shape",
    "disabled",
    "loading",
    "children"
  ]), l = /* @__PURE__ */ je(() => r() === "secondary" || r() === "plain" ? "secondary" : "primary"), a = /* @__PURE__ */ je(() => ne(
    Xe.button,
    Xe[r()],
    Xe[i()],
    Xe[s()],
    {
      [Xe.loading]: e.loading,
      [Xe.animated]: n()
    },
    e.class
  )), c = /* @__PURE__ */ je(() => !!e.href && !e.disabled);
  var u = Aa(), d = Sn(u);
  {
    var f = (p) => {
      var m = e0();
      Ei(m, (k) => ({ class: k, ...o }), [() => ne(Xe.anchor, w(a))]);
      var g = L(m), v = L(g);
      Et(v, () => e.children ?? Pt);
      var y = G(g, 2);
      {
        var b = (k) => {
          var x = Zg(), C = L(x);
          Ns(C, {
            get theme() {
              return w(l);
            },
            size: "1.25rem"
          }), V(() => D(x, 1, F(Xe.spinnerWrapper))), _(k, x);
        };
        re(y, (k) => {
          e.loading && k(b);
        });
      }
      V((k) => D(g, 1, k), [
        () => F(ne(Xe.content, { [Xe.hidden]: e.loading }))
      ]), _(p, m);
    }, h = (p) => {
      var m = n0();
      Ei(m, () => ({
        class: w(a),
        disabled: e.disabled || e.loading,
        ...o
      }));
      var g = L(m), v = L(g);
      Et(v, () => e.children ?? Pt);
      var y = G(g, 2);
      {
        var b = (k) => {
          var x = t0(), C = L(x);
          Ns(C, {
            get theme() {
              return w(l);
            },
            size: "1.25rem"
          }), V(() => D(x, 1, F(Xe.spinnerWrapper))), _(k, x);
        };
        re(y, (k) => {
          e.loading && k(b);
        });
      }
      V((k) => D(g, 1, k), [
        () => F(ne(Xe.content, { [Xe.hidden]: e.loading }))
      ]), _(p, m);
    };
    re(d, (p) => {
      w(c) ? p(f) : p(h, -1);
    });
  }
  _(t, u), Me();
}
const Ae = [];
for (let t = 0; t < 256; ++t)
  Ae.push((t + 256).toString(16).slice(1));
function r0(t, e = 0) {
  return (Ae[t[e + 0]] + Ae[t[e + 1]] + Ae[t[e + 2]] + Ae[t[e + 3]] + "-" + Ae[t[e + 4]] + Ae[t[e + 5]] + "-" + Ae[t[e + 6]] + Ae[t[e + 7]] + "-" + Ae[t[e + 8]] + Ae[t[e + 9]] + "-" + Ae[t[e + 10]] + Ae[t[e + 11]] + Ae[t[e + 12]] + Ae[t[e + 13]] + Ae[t[e + 14]] + Ae[t[e + 15]]).toLowerCase();
}
let el;
const i0 = new Uint8Array(16);
function s0() {
  if (!el) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    el = crypto.getRandomValues.bind(crypto);
  }
  return el(i0);
}
const o0 = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Dc = { randomUUID: o0 };
function l0(t, e, n) {
  var i;
  t = t || {};
  const r = t.random ?? ((i = t.rng) == null ? void 0 : i.call(t)) ?? s0();
  if (r.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, r0(r);
}
function a0(t, e, n) {
  return Dc.randomUUID && !t ? Dc.randomUUID() : l0(t);
}
const Bl = (t, e) => (e == null && (e = t, t = 0), Math.random() * e + t), ef = (t, e) => Math.floor(Bl(t, e)), c0 = (t) => {
  const e = ef(t.length);
  return t[e];
}, u0 = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`, d0 = () => a0(), xC = (t, e) => {
  const n = new ResizeObserver((r) => {
    for (let i of r) {
      const { height: s, width: o } = i.contentRect;
      e(s, o);
    }
  });
  n.observe(t), id(() => {
    n.disconnect();
  });
}, SC = (t) => {
  if (t)
    return t.navigator.language;
}, CC = (t, e = 20) => {
  let n;
  return (...i) => {
    clearTimeout(n), n = setTimeout(() => t(...i), e);
  };
}, MC = (t, e) => new Date(t, e).getDay(), EC = (t, e) => new Date(t, e % 12, 0).getDate(), TC = (t, e, n) => new Date(t, e).toLocaleString(n ?? "en-US", { month: "long" }), AC = (t, e, n, r) => new Date(t, e, n).toLocaleString(r ?? "en-US", { weekday: "long" }), _C = (t, e, n, r, i = !0) => {
  const s = new Date(2025, e, n), o = s.toLocaleDateString(r ?? "en-US", { day: "numeric" }), l = s.toLocaleDateString(r ?? "en-US", { month: "long" }), a = o.endsWith("1") && o !== "11" ? "st" : o.endsWith("2") && o !== "12" ? "nd" : o.endsWith("3") && o !== "13" ? "rd" : "th";
  let c = "";
  return i && (c += `, ${t}`), `${l} ${o}${a}${c}`;
}, OC = (t) => new Date(t).toLocaleDateString(void 0, {
  year: "numeric",
  month: "long",
  day: "numeric"
});
var ai = /* @__PURE__ */ ((t) => (t.GET = "GET", t.POST = "POST", t.PUT = "PUT", t.DELETE = "DELETE", t.PATCH = "PATCH", t))(ai || {});
const f0 = {
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
var _a = /* @__PURE__ */ ((t) => (t.Auth = "Auth", t.Federation = "Federation", t.WebGames = "WebGames", t.RecipeBook = "RecipeBook", t.FatBears = "FatBears", t))(_a || {});
const zl = {
  Auth: {
    friendlyName: "01100001 01110101 01110100 01101000",
    subdomain: "login",
    devPort: "5175"
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
  RecipeBook: {
    friendlyName: "Jean's Recipe Book",
    subdomain: "recipe",
    devPort: "5176"
  },
  FatBears: {
    friendlyName: "Fat Bears Tournament",
    subdomain: "bears",
    devPort: "5177"
  }
}, NC = "app", IC = "goto", DC = "path", RC = (t) => Object.values(_a).includes(t), LC = (t, e) => t === Na ? `https://${e.subdomain}.jeffreycarr.dev` : t === Oa ? `http://${e.subdomain}.lab.test` : `http://${e.subdomain}.jeffreycarr.local:${e.devPort}`;
class _o extends Error {
  constructor(n, r, i) {
    super(r);
    oe(this, "status");
    oe(this, "data");
    this.status = n, this.data = i, Object.setPrototypeOf(this, _o.prototype);
  }
}
const PC = ["info", "warning", "error", "success"], BC = [
  "left-arrow",
  "right-arrow",
  "account",
  "hamburger",
  "trash",
  "trash-fill",
  "stopwatch",
  "stopwatch-fill",
  "heart",
  "heart-fill",
  "plus",
  "funnel",
  "funnel-fill",
  "pencil",
  "pencil-fill",
  "x",
  "x-lg",
  "arrow-bar-left",
  "arrow-bar-right",
  "tag",
  "tag-fill",
  "tags",
  "tags-fill",
  "code",
  "box",
  "enter-right"
];
class zC {
  constructor() {
    oe(this, "items", []);
  }
  push(e) {
    this.items.push(e);
  }
  pop() {
    const e = this.size();
    if (e === 0)
      return null;
    const n = this.items[e - 1];
    return this.items = this.items.slice(0, e - 1), n;
  }
  size() {
    return this.items.length;
  }
}
var h0 = /* @__PURE__ */ ((t) => (t[t.HOUR = 36e5] = "HOUR", t[t.MINUTE = 6e4] = "MINUTE", t[t.SECOND = 1e3] = "SECOND", t))(h0 || {});
const FC = [
  "???",
  "ctrlzilla",
  "wandaconda",
  "eyezac_screamalot",
  "waddle_combs",
  "glitchard_simmons",
  "alien_degeneres"
], p0 = {
  "???": "Unknown",
  ctrlzilla: "Ctrl Zilla",
  wandaconda: "Wanda Conda",
  eyezac_screamalot: "Eyezac Screamalot",
  waddle_combs: "Waddle Combs",
  glitchard_simmons: "Glitchard Simmons",
  alien_degeneres: "Alien Degeneres"
}, m0 = {
  "???": new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/unknown.png"),
  ctrlzilla: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/ctrlzilla.png"),
  wandaconda: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/wandaconda.png"),
  eyezac_screamalot: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/eyezac_screamalot.png"),
  waddle_combs: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/waddle_combs.png"),
  glitchard_simmons: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/glitchard_simmons.png"),
  alien_degeneres: new URL("https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/alien_degeneres.png")
}, VC = ["connection", "error", "warning", "info"], HC = "dev", Oa = "staging", Na = "prod", Oo = async (t, e = {}, n = fetch) => {
  let r = {};
  const i = (e == null ? void 0 : e.body) instanceof FormData;
  (t.method === ai.POST || t.method === ai.PUT || t.method === ai.PATCH) && !i && (r["Content-Type"] = "application/json"), r = { ...r, ...e == null ? void 0 : e.additionalHeaders };
  let s = "";
  if (e != null && e.query) {
    const u = Object.keys((e == null ? void 0 : e.query) ?? {});
    for (let d = 0; d < u.length; d++) {
      const f = u[d];
      s += `${d > 0 ? "&" : ""}${f}=${e.query[f]}`;
    }
  }
  let o = t.path;
  s.length > 0 && (o += `?${s}`);
  let l;
  e != null && e.body && (i ? l = e.body : l = JSON.stringify(e.body));
  let a = "include";
  t.credentials === "none" && (a = "omit");
  let c = await n(o, {
    method: t.method,
    credentials: a,
    headers: r,
    body: l
  });
  if (c.status !== 200) {
    const u = await c.json();
    throw new _o(c.status, u.message, u.data);
  }
  return await c.json();
}, g0 = (t, e) => {
  const n = zl[e];
  return n ? t === Na ? `https://${n.subdomain}.jeffreycarr.dev` : t === Oa ? `http://${n.subdomain}.lab.test` : `http://${n.subdomain}.jeffreycarr.local:${n.devPort}` : "";
}, jC = (t) => t instanceof _o ? t : {
  status: 500,
  message: "Unknown error"
};
class WC {
  constructor(e, n) {
    this.first = e, this.second = n;
  }
  getFirst() {
    return this.first;
  }
  getSecond() {
    return this.second;
  }
  toArray() {
    return [this.first, this.second];
  }
}
const UC = (t) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t), qC = [
  "connected",
  "connecting",
  "reconnecting",
  "disconnected"
], KC = ["connection", "error", "warning", "info"], v0 = 1e3, y0 = 6e4;
class JC {
  constructor(e, n, r, i, s) {
    oe(this, "status", "disconnected");
    oe(this, "eventSource");
    oe(this, "handleErr", (e) => {
      var n;
      if (((n = this.eventSource) == null ? void 0 : n.readyState) === EventSource.CONNECTING) {
        this.updateStatus("reconnecting");
        return;
      }
      this.updateStatus("disconnected"), this.handleMessage(e);
    });
    oe(this, "handleMessage", (e) => {
      const n = e;
      try {
        const r = JSON.parse(n.data);
        this.routeMessage(r);
      } catch (r) {
        this.routeMessage({
          level: "error",
          error: {
            message: "error parsing message from server",
            stackTrack: r
          }
        });
        return;
      }
    });
    this.endpoint = e, this.disconnectEndpoint = n, this.onerror = r, this.onmessage = i, this.onstatuschange = s;
  }
  // Public methos //
  /**
   *  connect connects to the SSE endpoint of the server
   */
  async connect() {
    this.updateStatus("connecting"), await this.connectToServer();
  }
  async reconnect() {
    if (this.status === "connected") return;
    this.updateStatus("reconnecting");
    let e = v0;
    for (; this.status === "reconnecting"; )
      try {
        await this.connectToServer();
      } catch {
        e = Math.min(e * 2, y0), await b0(e);
      }
  }
  async disconnect() {
    await Oo(this.disconnectEndpoint), this.eventSource && (this.eventSource.close(), this.eventSource = void 0), this.updateStatus("disconnected");
  }
  getStatus() {
    return this.status;
  }
  // Private methods //
  async connectToServer() {
    return new Promise((e, n) => {
      const r = new EventSource(this.endpoint.path);
      r.onopen = () => {
        console.log("Connection opened, waiting for server response");
      }, r.onerror = (i) => {
        console.error("Error from BE", i), this.disconnect(), n(i);
      }, r.onmessage = (i) => {
        let s;
        try {
          s = JSON.parse(i.data);
        } catch (o) {
          console.error("Failed to parse server message", o);
          return;
        }
        if (s.level === "connection" && s.data.state !== "disconnected") {
          if (s.data.state === "lobby_closed") {
            n("lobby closed");
            return;
          }
          r.onmessage = this.handleMessage, r.onerror = this.handleErr, this.eventSource = r, this.updateStatus("connected"), e(r);
        }
      };
    });
  }
  routeMessage(e) {
    switch (e.level) {
      case "connection":
        const n = e;
        switch (n.data.state) {
          case "connected":
            this.updateStatus("connected");
            break;
          case "disconnected":
            this.reconnect();
            break;
          case "lobby_closed":
            this.disconnect();
            break;
          default:
            console.error("Unknown connection state from server", n.data);
        }
        return;
      case "error":
        this.onerror(e);
        return;
      default:
        this.onmessage(e);
    }
  }
  updateStatus(e) {
    var n;
    this.status = e, (n = this.onstatuschange) == null || n.call(this, e);
  }
}
const $C = () => "pong!", b0 = (t) => new Promise((e) => setTimeout(e, t)), GC = () => c0([
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
]);
var k0 = /* @__PURE__ */ z('<div class="container svelte-ekcbcs"><canvas class="canvas svelte-ekcbcs"></canvas></div>');
function YC(t, e) {
  Ce(e, !0);
  let n = /* @__PURE__ */ ee(null), r = /* @__PURE__ */ je(() => {
    var v;
    return (v = w(n)) == null ? void 0 : v.getContext("2d");
  });
  const i = 2, s = 5, o = 1, l = 1, a = 2, c = 150, u = (v) => {
    if (!w(n) || v <= 0)
      return [];
    const y = w(n).width;
    return [...Array(v)].map(() => ({
      x: Bl(y),
      y: 0,
      velocity: Bl(l, a),
      sizePx: ef(i, s),
      color: u0()
    }));
  };
  let d = u(c);
  const f = (v) => {
    const y = v;
    return y.y = v.y + o * v.velocity, y;
  }, h = (v, y) => {
    v.beginPath(), v.fillRect(y.x, y.y, y.sizePx, y.sizePx), v.fillStyle = y.color, v.fill();
  }, p = () => {
    if (w(n) == null || !w(r)) {
      requestAnimationFrame(p);
      return;
    }
    w(r).clearRect(0, 0, w(n).width, w(n).height);
    for (const v of d)
      h(w(r), v);
    d = d.map((v) => f(v)), d = d.filter((v) => {
      var y;
      return v.sizePx > 0 && v.y < (((y = w(n)) == null ? void 0 : y.height) ?? 500);
    }), d.push(...u(c - d.length)), requestAnimationFrame(p);
  };
  p();
  var m = k0(), g = L(m);
  Ti(g, (v) => $(n, v), () => w(n)), _(t, m), Me();
}
const w0 = "_container_v7rm0_1", x0 = {
  container: w0
};
var S0 = /* @__PURE__ */ z("<h1> </h1> <div><!></div> <div><!> <!></div>", 1);
function XC(t, e) {
  Ce(e, !0);
  let n = H(e, "open", 15), r = H(e, "title", 3, "Are you sure?"), i = H(e, "acceptText", 3, "Yes"), s = H(e, "declineText", 3, "No"), o = /* @__PURE__ */ ee(!1), l = /* @__PURE__ */ ee(!1);
  const a = async () => {
    var u;
    $(o, !0), await ((u = e.onAccept) == null ? void 0 : u.call(e)), $(o, !1), n(!1);
  }, c = () => {
    var u;
    $(l, !0), (u = e.onDecline) == null || u.call(e), $(l, !1), n(!1);
  };
  tf(t, {
    get class() {
      return x0.container;
    },
    get open() {
      return n();
    },
    set open(u) {
      n(u);
    },
    children: (u, d) => {
      var f = S0(), h = Sn(f), p = L(h), m = G(h, 2), g = L(m);
      Et(g, () => e.children ?? Pt);
      var v = G(m, 2), y = L(v);
      Ai(y, {
        onclick: a,
        get loading() {
          return w(o);
        },
        children: (k, x) => {
          var C = Mi();
          V(() => Re(C, i())), _(k, C);
        },
        $$slots: { default: !0 }
      });
      var b = G(y, 2);
      Ai(b, {
        onclick: c,
        variant: "secondary",
        get loading() {
          return w(l);
        },
        children: (k, x) => {
          var C = Mi();
          V(() => Re(C, s())), _(k, C);
        },
        $$slots: { default: !0 }
      }), V(() => Re(p, r())), _(u, f);
    },
    $$slots: { default: !0 }
  }), Me();
}
var C0 = /* @__PURE__ */ z('<div class="container svelte-1z13fby"><img class="icon svelte-1z13fby"/></div>');
function QC(t, e) {
  Ce(e, !0);
  let n = /* @__PURE__ */ je(() => m0[e.character].href), r = /* @__PURE__ */ je(() => `${p0[e.character]} icon`);
  var i = C0(), s = L(i);
  V(() => {
    tt(s, "src", w(n)), tt(s, "alt", w(r));
  }), _(t, i), Me();
}
const M0 = "_container_14gk5_1", E0 = "_above_14gk5_5", T0 = "_below_14gk5_8", A0 = "_label_14gk5_12", _0 = "_checkbox_14gk5_16", O0 = "_checked_14gk5_32", N0 = "_inverse_14gk5_32", Pn = {
  container: M0,
  above: E0,
  below: T0,
  label: A0,
  checkbox: _0,
  checked: O0,
  inverse: N0
};
var I0 = /* @__PURE__ */ z("<span> </span>"), D0 = /* @__PURE__ */ z("<span> </span>"), R0 = /* @__PURE__ */ z("<div><!> <input/> <!></div>");
function ZC(t, e) {
  Ce(e, !0);
  let n = H(e, "checked", 15, !1), r = H(e, "inverse", 15, !1), i = H(e, "allowInverse", 3, !1), s = H(e, "labelPos", 3, "before"), o = /* @__PURE__ */ Xi(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "class",
    "checked",
    "inverse",
    "allowInverse",
    "label",
    "labelPos"
  ]);
  function l(p) {
    i() && (p.preventDefault(), !n() && !r() ? (n(!0), r(!1)) : n() ? (n(!1), r(!0)) : (n(!1), r(!1)));
  }
  var a = R0(), c = L(a);
  {
    var u = (p) => {
      var m = I0(), g = L(m);
      V(() => {
        D(m, 1, F(Pn.label)), Re(g, e.label);
      }), _(p, m);
    };
    re(c, (p) => {
      e.label && (s() === "before" || s() === "above") && p(u);
    });
  }
  var d = G(c, 2);
  Ei(
    d,
    (p) => ({ class: p, type: "checkbox", onclick: l, ...o }),
    [
      () => ne(Pn.checkbox, e.class, n() && Pn.checked, r() && Pn.inverse)
    ],
    void 0,
    void 0,
    void 0,
    !0
  );
  var f = G(d, 2);
  {
    var h = (p) => {
      var m = D0(), g = L(m);
      V(() => {
        D(m, 1, F(Pn.label)), Re(g, e.label);
      }), _(p, m);
    };
    re(f, (p) => {
      e.label && (s() === "after" || s() === "below") && p(h);
    });
  }
  V((p) => D(a, 1, p), [() => F(ne(Pn.container, Pn[s()]))]), kg(d, n), _(t, a), Me();
}
const L0 = "_wrapper_17fs0_1", P0 = "_content_17fs0_8", B0 = "_flipped_17fs0_18", tl = {
  wrapper: L0,
  content: P0,
  flipped: B0
};
var z0 = /* @__PURE__ */ z("<div><!></div>"), F0 = /* @__PURE__ */ z("<div><!> <!></div>");
function V0(t, e) {
  Ce(e, !0);
  let n = H(e, "show", 15, !1);
  sd(() => {
    const f = (h) => {
      n() && w(r) && !w(r).contains(h.target) && n(!1);
    };
    return document.addEventListener("click", f, !0), () => {
      document.removeEventListener("click", f, !0);
    };
  });
  let r = /* @__PURE__ */ ee(void 0), i = /* @__PURE__ */ ee(void 0), s = /* @__PURE__ */ ee(0), o = /* @__PURE__ */ ee(0), l = /* @__PURE__ */ je(() => {
    if (w(s), w(o), !w(r) || !w(i)) return !1;
    const f = w(r).getBoundingClientRect(), h = w(i).offsetHeight;
    return w(o) - f.bottom < h;
  });
  var a = F0(), c = L(a);
  Et(c, () => e.trigger);
  var u = G(c, 2);
  {
    var d = (f) => {
      var h = z0(), p = L(h);
      Et(p, () => e.content), Ti(h, (m) => $(i, m), () => w(i)), V((m) => D(h, 1, m), [
        () => F(ne(tl.content, { [tl.flipped]: w(l) }))
      ]), _(f, h);
    };
    re(u, (f) => {
      n() && f(d);
    });
  }
  Ti(a, (f) => $(r, f), () => w(r)), V(() => D(a, 1, F(tl.wrapper))), wg("y", () => w(s), (f) => $(s, f, !0)), xg("innerHeight", (f) => $(o, f, !0)), _(t, a), Me();
}
var H0 = /* @__PURE__ */ z('<!> <span class="text svelte-195ldih"><!></span>', 1), j0 = /* @__PURE__ */ z("<a><!></a>"), W0 = /* @__PURE__ */ z("<button><!></button>"), U0 = /* @__PURE__ */ z('<div class="container svelte-195ldih"><!></div>');
function eM(t, e) {
  const n = (c) => {
    var u = H0(), d = Sn(u);
    {
      var f = (m) => {
        Fl(m, {
          get icon() {
            return r();
          }
        });
      };
      re(d, (m) => {
        r() != null && m(f);
      });
    }
    var h = G(d, 2), p = L(h);
    Et(p, () => e.children ?? Pt), _(c, u);
  };
  let r = H(e, "icon", 3, "left-arrow"), i = H(e, "theme", 3, "primary");
  var s = U0(), o = L(s);
  {
    var l = (c) => {
      var u = j0(), d = L(u);
      n(d), V(() => {
        D(u, 1, `button ${i()}`, "svelte-195ldih"), tt(u, "href", e.href);
      }), _(c, u);
    }, a = (c) => {
      var u = W0(), d = L(u);
      n(d), V(() => D(u, 1, `button ${i()}`, "svelte-195ldih")), gt("click", u, function(...f) {
        var h;
        (h = e.onclick) == null || h.apply(this, f);
      }), _(c, u);
    };
    re(o, (c) => {
      e.href ? c(l) : c(a, -1);
    });
  }
  _(t, s);
}
_n(["click"]);
const q0 = "_container_12i67_12", K0 = "_label_12i67_16", J0 = "_input_12i67_21", $0 = "_error_12i67_31", G0 = "_errorArea_12i67_40", Y0 = "_errorMessage_12i67_46", X0 = "_active_12i67_54", Bn = {
  container: q0,
  label: K0,
  input: J0,
  error: $0,
  errorArea: G0,
  errorMessage: Y0,
  active: X0
};
var Q0 = /* @__PURE__ */ z("<label> </label>"), Z0 = /* @__PURE__ */ z("<div><p><!></p></div>"), e1 = /* @__PURE__ */ z("<div><!> <input/> <!></div>");
function t1(t, e) {
  Ce(e, !0);
  let n = H(e, "value", 15), r = H(e, "class", 3, ""), i = H(e, "inputClass", 3, ""), s = H(e, "hideErrArea", 3, !1), o = /* @__PURE__ */ Xi(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "label",
    "validator",
    "message",
    "value",
    "class",
    "inputClass",
    "hideErrArea"
  ]);
  const l = d0();
  let a = /* @__PURE__ */ ee(""), c = /* @__PURE__ */ je(() => w(a).length > 0 || (e.message ?? "").length > 0), u;
  const d = (y) => {
    const b = y.currentTarget;
    b && ($(a, ""), clearTimeout(u), u = setTimeout(
      () => {
        var k;
        $(a, ((k = e.validator) == null ? void 0 : k.call(e, b.value)) ?? "", !0);
      },
      1500
    ));
  };
  var f = e1(), h = L(f);
  {
    var p = (y) => {
      var b = Q0(), k = L(b);
      V(() => {
        tt(b, "for", l), D(b, 1, F(Bn.label)), Re(k, e.label);
      }), _(y, b);
    };
    re(h, (y) => {
      e.label && y(p);
    });
  }
  var m = G(h, 2);
  Ei(
    m,
    (y) => ({ id: l, class: y, ...o, oninput: d }),
    [
      () => ne(Bn.input, { [Bn.error]: w(c) }, i())
    ],
    void 0,
    void 0,
    void 0,
    !0
  );
  var g = G(m, 2);
  {
    var v = (y) => {
      var b = Z0(), k = L(b), x = L(k);
      {
        var C = (O) => {
          var R = Mi();
          V(() => Re(R, e.message)), _(O, R);
        }, S = (O) => {
          var R = Mi();
          V(() => Re(R, w(a))), _(O, R);
        };
        re(x, (O) => {
          e.message && e.message.length > 0 ? O(C) : O(S, -1);
        });
      }
      V(
        (O) => {
          D(b, 1, F(Bn.errorArea)), D(k, 1, O);
        },
        [
          () => F(ne(Bn.errorMessage, { [Bn.active]: w(c) }))
        ]
      ), _(y, b);
    };
    re(g, (y) => {
      s() || y(v);
    });
  }
  V((y) => D(f, 1, y), [() => F(ne(Bn.container, r()))]), Pl(m, n), _(t, f), Me();
}
const n1 = "_container_1kq31_1", r1 = "_open_1kq31_16", i1 = "_background_1kq31_21", s1 = "_contentContainer_1kq31_32", o1 = "_closeButton_1kq31_44", Qr = {
  container: n1,
  open: r1,
  background: i1,
  contentContainer: s1,
  closeButton: o1
};
var l1 = /* @__PURE__ */ z('<div><button aria-label="Close modal"></button> <div><!> <!></div></div>');
function tf(t, e) {
  Ce(e, !0);
  let n = H(e, "open", 15);
  Pr(() => (addEventListener("keydown", r), () => {
    removeEventListener("keydown", r);
  }));
  const r = (u) => {
    u.key === "Escape" && i();
  }, i = () => {
    n(!1);
  };
  var s = l1(), o = L(s), l = G(o, 2), a = L(l);
  Ai(a, {
    get class() {
      return Qr.closeButton;
    },
    onclick: i,
    variant: "secondary",
    children: (u, d) => {
      var f = Mi("✕");
      _(u, f);
    },
    $$slots: { default: !0 }
  });
  var c = G(a, 2);
  Et(c, () => e.children ?? Pt), V(
    (u, d) => {
      D(s, 1, u), D(o, 1, F(Qr.background)), D(l, 1, d);
    },
    [
      () => F(ne(Qr.container, { [Qr.open]: n() })),
      () => F(ne(Qr.contentContainer, e.class))
    ]
  ), gt("click", o, i), _(t, s), Me();
}
_n(["click"]);
const a1 = "_container_tdl75_1", c1 = "_pageContainer_tdl75_15", u1 = "_page_tdl75_15", d1 = "_content_tdl75_34", f1 = "_footer_tdl75_42", h1 = "_pageButton_tdl75_58", zn = {
  container: a1,
  pageContainer: c1,
  page: u1,
  content: d1,
  footer: f1,
  pageButton: h1
};
var p1 = /* @__PURE__ */ z("<div><div><!></div></div>"), m1 = /* @__PURE__ */ z("<div></div>"), g1 = /* @__PURE__ */ z("<div><div><!> <div><!> <!> <!></div></div></div>");
function tM(t, e) {
  Ce(e, !0);
  let n = H(e, "open", 15), r = H(e, "currentPage", 15), i = H(e, "height", 3, "60vh"), s = H(e, "width", 3, "70vw");
  Pr(() => {
    (r() < 0 || r() >= e.numPages) && (console.error(`Page ${r()} is not a valid page number!`), r(0));
  });
  const o = () => {
    e.allowWrapping ? r((r() + 1) % e.numPages) : r(Math.min(e.numPages - 1, r() + 1));
  }, l = () => {
    e.allowWrapping ? (r(r() - 1), r() < 0 && r(e.numPages - 1)) : r(Math.max(0, r() - 1));
  };
  tf(t, {
    get open() {
      return n();
    },
    set open(a) {
      n(a);
    },
    children: (a, c) => {
      var u = g1(), d = L(u), f = L(d);
      En(f, 17, () => ({ length: e.numPages }), ar, (v, y, b) => {
        var k = p1(), x = L(k), C = L(x);
        Et(C, () => e.content, () => b), V(() => {
          D(k, 1, F(zn.page)), D(x, 1, F(zn.content));
        }), _(v, k);
      });
      var h = G(f, 2), p = L(h);
      {
        let v = /* @__PURE__ */ je(() => r() === 0);
        Ai(p, {
          get class() {
            return zn.pageButton;
          },
          onclick: l,
          get disabled() {
            return w(v);
          },
          children: (y, b) => {
            Fl(y, { icon: "left-arrow" });
          },
          $$slots: { default: !0 }
        });
      }
      var m = G(p, 2);
      En(m, 17, () => ({ length: e.numPages }), ar, (v, y, b) => {
        var k = m1();
        V(() => D(k, 1, `dot ${r() === b ? "highlighted" : ""}`)), _(v, k);
      });
      var g = G(m, 2);
      {
        let v = /* @__PURE__ */ je(() => r() === e.numPages - 1);
        Ai(g, {
          get class() {
            return zn.pageButton;
          },
          onclick: o,
          get disabled() {
            return w(v);
          },
          children: (y, b) => {
            Fl(y, { icon: "right-arrow" });
          },
          $$slots: { default: !0 }
        });
      }
      V(() => {
        D(u, 1, F(zn.container)), Yi(u, `--height: ${i()}; --width: ${s()}; --position: ${r()}`), D(d, 1, F(zn.pageContainer)), D(h, 1, F(zn.footer));
      }), _(a, u);
    },
    $$slots: { default: !0 }
  }), Me();
}
const So = class So {
  constructor(e, n, r) {
    oe(this, "durationMs");
    oe(this, "remainingMs");
    oe(this, "targetEndpoint");
    oe(this, "alert");
    oe(this, "update");
    oe(this, "timeoutID");
    this.durationMs = e, this.remainingMs = e, this.alert = n, this.update = r;
  }
  start() {
    this.timeoutID != null || this.remainingMs === 0 || (this.targetEndpoint = Date.now() + this.durationMs, this.tick());
  }
  reset() {
    var e;
    clearTimeout(this.timeoutID), this.timeoutID = void 0, this.targetEndpoint = void 0, this.remainingMs = this.durationMs, (e = this.update) == null || e.call(this, this.remainingMs);
  }
  stop() {
    clearTimeout(this.timeoutID), this.timeoutID = void 0;
  }
  tick() {
    this.timeoutID = setTimeout(() => {
      var e;
      if (this.targetEndpoint) {
        if (this.remainingMs = Math.max(this.targetEndpoint - Date.now(), 0), (e = this.update) == null || e.call(this, this.remainingMs), this.remainingMs === 0) {
          this.stop(), this.alert();
          return;
        }
        this.tick();
      }
    }, So.tickRate);
  }
};
oe(So, "tickRate", 100);
let Os = So;
var v1 = /* @__PURE__ */ z('<p class="title svelte-jp8sqn"> </p>'), y1 = /* @__PURE__ */ z('<div><button class="close-button svelte-jp8sqn">&#10006;</button> <!> <p class="message svelte-jp8sqn"> </p> <div></div></div>');
function nM(t, e) {
  Ce(e, !0);
  let n = H(e, "level", 3, "info"), r = H(e, "duration", 3, 15e3), i = /* @__PURE__ */ ee(!1), s = /* @__PURE__ */ je(() => `container ${n()} ${w(i) ? "transition-out" : ""}`), o = /* @__PURE__ */ ee(100), l = /* @__PURE__ */ ee(void 0);
  const a = () => {
    $(i, !0), $(l, setTimeout(e.close, 201), !0);
  }, c = (v) => {
    $(o, v / r() * 100);
  };
  Pr(() => {
    const v = new Os(r(), a, c);
    return v.start(), () => {
      v.stop(), clearTimeout(w(l));
    };
  });
  var u = y1(), d = L(u), f = G(d, 2);
  {
    var h = (v) => {
      var y = v1(), b = L(y);
      V(() => Re(b, e.title)), _(v, y);
    };
    re(f, (v) => {
      e.title && v(h);
    });
  }
  var p = G(f, 2), m = L(p), g = G(p, 2);
  V(
    (v) => {
      D(u, 1, F(w(s)), "svelte-jp8sqn"), Re(m, e.message), D(g, 1, v, "svelte-jp8sqn"), Yi(g, `width: ${w(o)}%; transition-duration: ${Os.tickRate}ms`);
    },
    [
      () => F(ne("timer", n(), { visible: w(o) > 0 }))
    ]
  ), gt("click", d, a), _(t, u), Me();
}
_n(["click"]);
wm();
var b1 = /* @__PURE__ */ z('<div class="container"></div>');
function rM(t) {
  var e = b1();
  _(t, e);
}
var k1 = /* @__PURE__ */ z('<div class="timer svelte-12pin7g"></div>'), w1 = /* @__PURE__ */ z('<div class="container svelte-12pin7g"><!></div>');
function iM(t, e) {
  Ce(e, !0);
  let n = /* @__PURE__ */ ee(100), r;
  Pr(() => {
    if (!e.until) return;
    const l = () => {
      var f;
      const a = (/* @__PURE__ */ new Date()).getTime(), c = new Date(e.until).getTime(), u = Math.max(0, c - a);
      $(n, u / 5e3 * 100), u <= 0 && (clearInterval(r), $(n, 0), (f = e.onComplete) == null || f.call(e));
    };
    return l(), r = setInterval(l, 50), () => clearInterval(r);
  });
  var i = w1(), s = L(i);
  {
    var o = (l) => {
      var a = k1();
      V(() => Yi(a, `--progress: ${w(n)}%`)), _(l, a);
    };
    re(s, (l) => {
      e.until && l(o);
    });
  }
  _(t, i), Me();
}
var x1 = /* @__PURE__ */ Z('<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"></path>'), S1 = /* @__PURE__ */ Z('<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>'), C1 = /* @__PURE__ */ Z('<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>', 1), M1 = /* @__PURE__ */ Z('<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>'), E1 = /* @__PURE__ */ Z('<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>', 1), T1 = /* @__PURE__ */ Z('<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path>'), A1 = /* @__PURE__ */ Z('<path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z"></path><path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"></path>', 1), _1 = /* @__PURE__ */ Z('<path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0"></path>'), O1 = /* @__PURE__ */ Z('<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>'), N1 = /* @__PURE__ */ Z('<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"></path>'), I1 = /* @__PURE__ */ Z('<path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"></path>'), D1 = /* @__PURE__ */ Z('<path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"></path>'), R1 = /* @__PURE__ */ Z('<path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"></path>'), L1 = /* @__PURE__ */ Z('<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"></path>'), P1 = /* @__PURE__ */ Z('<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"></path>'), B1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path></svg>'), z1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path></svg>'), F1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"></path></svg>'), V1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"></path></svg>'), H1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16"><path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"></path><path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"></path></svg>'), j1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tag-fill" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path></svg>'), W1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16"><path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"></path><path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"></path></svg>'), U1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16"><path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path><path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"></path></svg>'), q1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code" viewBox="0 0 16 16"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8z"></path></svg>'), K1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"></path></svg>'), J1 = /* @__PURE__ */ Z('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"></path><path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"></path></svg>'), $1 = /* @__PURE__ */ Z('<svg fill="currentColor" viewBox="0 0 16 16"><!></svg>');
function Fl(t, e) {
  Ce(e, !0);
  var n = $1(), r = L(n);
  {
    var i = (M) => {
      var N = x1();
      _(M, N);
    }, s = (M) => {
      var N = S1();
      _(M, N);
    }, o = (M) => {
      var N = C1();
      _(M, N);
    }, l = (M) => {
      var N = M1();
      _(M, N);
    }, a = (M) => {
      var N = E1();
      _(M, N);
    }, c = (M) => {
      var N = T1();
      _(M, N);
    }, u = (M) => {
      var N = A1();
      _(M, N);
    }, d = (M) => {
      var N = _1();
      _(M, N);
    }, f = (M) => {
      var N = O1();
      _(M, N);
    }, h = (M) => {
      var N = N1();
      _(M, N);
    }, p = (M) => {
      var N = I1();
      _(M, N);
    }, m = (M) => {
      var N = D1();
      _(M, N);
    }, g = (M) => {
      var N = R1();
      _(M, N);
    }, v = (M) => {
      var N = L1();
      _(M, N);
    }, y = (M) => {
      var N = P1();
      _(M, N);
    }, b = (M) => {
      var N = B1();
      _(M, N);
    }, k = (M) => {
      var N = z1();
      _(M, N);
    }, x = (M) => {
      var N = F1();
      _(M, N);
    }, C = (M) => {
      var N = V1();
      _(M, N);
    }, S = (M) => {
      var N = H1();
      _(M, N);
    }, O = (M) => {
      var N = j1();
      _(M, N);
    }, R = (M) => {
      var N = W1();
      _(M, N);
    }, U = (M) => {
      var N = U1();
      _(M, N);
    }, ve = (M) => {
      var N = q1();
      _(M, N);
    }, ye = (M) => {
      var N = K1();
      _(M, N);
    }, ue = (M) => {
      var N = J1();
      _(M, N);
    };
    re(r, (M) => {
      e.icon === "left-arrow" ? M(i) : e.icon === "right-arrow" ? M(s, 1) : e.icon === "account" ? M(o, 2) : e.icon === "hamburger" ? M(l, 3) : e.icon === "trash" ? M(a, 4) : e.icon === "trash-fill" ? M(c, 5) : e.icon === "stopwatch" ? M(u, 6) : e.icon === "stopwatch-fill" ? M(d, 7) : e.icon === "heart" ? M(f, 8) : e.icon === "heart-fill" ? M(h, 9) : e.icon === "plus" ? M(p, 10) : e.icon === "funnel" ? M(m, 11) : e.icon === "funnel-fill" ? M(g, 12) : e.icon === "pencil" ? M(v, 13) : e.icon === "pencil-fill" ? M(y, 14) : e.icon === "x" ? M(b, 15) : e.icon === "x-lg" ? M(k, 16) : e.icon === "arrow-bar-left" ? M(x, 17) : e.icon === "arrow-bar-right" ? M(C, 18) : e.icon === "tag" ? M(S, 19) : e.icon === "tag-fill" ? M(O, 20) : e.icon === "tags" ? M(R, 21) : e.icon === "tags-fill" ? M(U, 22) : e.icon === "code" ? M(ve, 23) : e.icon === "box" ? M(ye, 24) : e.icon === "enter-right" && M(ue, 25);
    });
  }
  V((M) => D(n, 0, M, "svelte-tk71k6"), [() => F(ne("container", e.class))]), _(t, n), Me();
}
const G1 = "_container_1719g_1", Y1 = "_item_1719g_7", X1 = "_grabHandle_1719g_15", Q1 = "_grabInner_1719g_32", Z1 = "_numberControls_1719g_38", ev = "_numberDisplay_1719g_46", tv = "_arrowButton_1719g_54", Tt = {
  container: G1,
  item: Y1,
  grabHandle: X1,
  grabInner: Q1,
  numberControls: Z1,
  numberDisplay: ev,
  arrowButton: tv
};
var nv = /* @__PURE__ */ z("<button><span></span> <span></span> <span></span></button> <!>", 1), rv = /* @__PURE__ */ z('<div><button type="button" aria-label="Move up"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg></button> <span> </span> <button type="button" aria-label="Move down"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button></div> <!>', 1), iv = /* @__PURE__ */ z("<li><!></li>"), sv = /* @__PURE__ */ z("<ul></ul>");
function sM(t, e) {
  Ce(e, !0);
  let n = H(e, "class", 3, ""), r = H(e, "items", 19, () => []), i = H(e, "interaction", 3, "draggable"), s = /* @__PURE__ */ je(() => i() === "draggable");
  const o = (d) => {
    d.preventDefault();
  }, l = (d) => {
    var f;
    o(d), (f = d.dataTransfer) == null || f.clearData();
  }, a = (d, f) => {
    var h;
    (h = f.dataTransfer) == null || h.setData("text/plain", d.toString());
  }, c = (d, f) => {
    var m, g;
    f.preventDefault();
    const h = (m = f.dataTransfer) == null ? void 0 : m.getData("text/plain");
    if (!h)
      return;
    const p = Number(h);
    isNaN(p) || p < 0 || p > r().length || (g = e.onUpdateOrder) == null || g.call(e, p, d);
  };
  var u = sv();
  En(u, 23, r, (d, f) => e.getKey(d, f), (d, f, h) => {
    var p = iv(), m = L(p);
    {
      var g = (y) => {
        var b = nv(), k = Sn(b), x = L(k), C = G(x, 2), S = G(C, 2), O = G(k, 2);
        Et(O, () => e.template ?? Pt, () => w(f), () => w(h)), V(() => {
          D(k, 1, F(Tt.grabHandle)), D(x, 1, F(Tt.grabInner)), D(C, 1, F(Tt.grabInner)), D(S, 1, F(Tt.grabInner));
        }), _(y, b);
      }, v = (y) => {
        var b = rv(), k = Sn(b), x = L(k), C = G(x, 2), S = L(C), O = G(C, 2), R = G(k, 2);
        Et(R, () => e.template ?? Pt, () => w(f), () => w(h)), V(() => {
          D(k, 1, F(Tt.numberControls)), D(x, 1, F(Tt.arrowButton)), x.disabled = w(h) === 0, D(C, 1, F(Tt.numberDisplay)), Re(S, w(h) + 1), D(O, 1, F(Tt.arrowButton)), O.disabled = w(h) === r().length - 1;
        }), gt("click", x, () => {
          var U;
          return (U = e.onUpdateOrder) == null ? void 0 : U.call(e, w(h), w(h) - 1);
        }), gt("click", O, () => {
          var U;
          return (U = e.onUpdateOrder) == null ? void 0 : U.call(e, w(h), w(h) + 1);
        }), _(y, b);
      };
      re(m, (y) => {
        w(s) ? y(g) : y(v, -1);
      });
    }
    V(() => {
      D(p, 1, F(Tt.item)), tt(p, "draggable", w(s));
    }), $r("dragstart", p, (y) => a(w(h), y)), $r("dragover", p, o), $r("drop", p, (y) => c(w(h), y)), _(d, p);
  }), V((d) => D(u, 1, d), [() => F(ne(Tt.container, n()))]), $r("dragover", u, o), $r("dragleave", u, l), _(t, u), Me();
}
_n(["click"]);
const ov = "_container_u2ysc_1", lv = "_label_u2ysc_5", av = "_selectContainer_u2ysc_10", cv = "_loading_u2ysc_17", uv = "_select_u2ysc_10", Fn = {
  container: ov,
  label: lv,
  selectContainer: av,
  loading: cv,
  select: uv
};
var dv = /* @__PURE__ */ z("<span> </span>"), fv = /* @__PURE__ */ z("<div><!></div>"), hv = /* @__PURE__ */ z("<option> </option>"), pv = /* @__PURE__ */ z("<select></select>"), mv = /* @__PURE__ */ z("<div><!> <!></div>");
function oM(t, e) {
  Ce(e, !0);
  let n = H(e, "options", 27, () => hn([])), r = H(e, "loadingOptions", 3, !1), i = H(e, "class", 3, ""), s = H(e, "selectClass", 3, ""), o = H(e, "value", 15), l = /* @__PURE__ */ Xi(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "label",
    "options",
    "loadingOptions",
    "class",
    "selectClass",
    "value"
  ]);
  var a = mv(), c = L(a);
  {
    var u = (p) => {
      var m = dv(), g = L(m);
      V(() => {
        D(m, 1, F(Fn.label)), Re(g, e.label);
      }), _(p, m);
    };
    re(c, (p) => {
      e.label && p(u);
    });
  }
  var d = G(c, 2);
  {
    var f = (p) => {
      var m = fv(), g = L(m);
      Ns(g, { size: "1.2rem" }), V((v) => D(m, 1, v), [
        () => F(ne(Fn.selectContainer, Fn.loading, s()))
      ]), _(p, m);
    }, h = (p) => {
      var m = pv();
      Ei(m, (g) => ({ class: g, ...l }), [
        () => ne(Fn.selectContainer, Fn.select, s())
      ]), En(m, 21, n, ar, (g, v) => {
        var y = hv(), b = L(y), k = {};
        V(() => {
          D(y, 1, F(Fn.option)), Re(b, w(v).label), k !== (k = w(v).value) && (y.value = (y.__value = w(v).value) ?? "");
        }), _(g, y);
      }), mg(m, o), _(p, m);
    };
    re(d, (p) => {
      r() ? p(f) : p(h, -1);
    });
  }
  V((p) => D(a, 1, p), [() => F(ne(Fn.container, i()))]), _(t, a), Me();
}
var gv = /* @__PURE__ */ z('<span class="label svelte-15g82xt"> </span>'), vv = /* @__PURE__ */ z("<div><span></span> <!></div>");
function Ns(t, e) {
  Ce(e, !0);
  let n = H(e, "theme", 3, "primary");
  var r = vv(), i = L(r), s = G(i, 2);
  {
    var o = (l) => {
      var a = gv(), c = L(a);
      V(() => Re(c, e.label)), _(l, a);
    };
    re(s, (l) => {
      e.label && l(o);
    });
  }
  V(
    (l) => {
      D(r, 1, l, "svelte-15g82xt"), Yi(r, e.size ? `--jeffs-spinner-size: ${e.size};` : void 0), D(i, 1, `spinner ${n()}`, "svelte-15g82xt");
    },
    [() => F(ne("container", e.class))]
  ), _(t, r), Me();
}
var yv = /* @__PURE__ */ z("<button> </button>"), bv = /* @__PURE__ */ z('<div class="container svelte-ot4j4j"><div class="tabs svelte-ot4j4j"></div> <div class="content"><!></div></div>');
function lM(t, e) {
  Ce(e, !0);
  let n = /* @__PURE__ */ ee(0);
  var r = bv(), i = L(r);
  En(i, 21, () => e.items, ar, (l, a, c) => {
    var u = yv(), d = L(u);
    V(() => {
      D(u, 1, `tab ${w(n) === c ? "selected" : ""}`, "svelte-ot4j4j"), Re(d, w(a).title);
    }), gt("click", u, () => $(n, c, !0)), _(l, u);
  });
  var s = G(i, 2), o = L(s);
  Et(o, () => e.items[w(n)].content), _(t, r), Me();
}
_n(["click"]);
function _e(t) {
  this.content = t;
}
_e.prototype = {
  constructor: _e,
  find: function(t) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === t) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(t) {
    var e = this.find(t);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(t, e, n) {
    var r = n && n != t ? this.remove(n) : this, i = r.find(t), s = r.content.slice();
    return i == -1 ? s.push(n || t, e) : (s[i + 1] = e, n && (s[i] = n)), new _e(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(t) {
    var e = this.find(t);
    if (e == -1) return this;
    var n = this.content.slice();
    return n.splice(e, 2), new _e(n);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(t, e) {
    return new _e([t, e].concat(this.remove(t).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(t, e) {
    var n = this.remove(t).content.slice();
    return n.push(t, e), new _e(n);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(t, e, n) {
    var r = this.remove(e), i = r.content.slice(), s = r.find(t);
    return i.splice(s == -1 ? i.length : s, 0, e, n), new _e(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(t) {
    for (var e = 0; e < this.content.length; e += 2)
      t(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(t) {
    return t = _e.from(t), t.size ? new _e(t.content.concat(this.subtract(t).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(t) {
    return t = _e.from(t), t.size ? new _e(this.subtract(t).content.concat(t.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(t) {
    var e = this;
    t = _e.from(t);
    for (var n = 0; n < t.content.length; n += 2)
      e = e.remove(t.content[n]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var t = {};
    return this.forEach(function(e, n) {
      t[e] = n;
    }), t;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
_e.from = function(t) {
  if (t instanceof _e) return t;
  var e = [];
  if (t) for (var n in t) e.push(n, t[n]);
  return new _e(e);
};
function nf(t, e, n) {
  for (let r = 0; ; r++) {
    if (r == t.childCount || r == e.childCount)
      return t.childCount == e.childCount ? null : n;
    let i = t.child(r), s = e.child(r);
    if (i == s) {
      n += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s))
      return n;
    if (i.isText && i.text != s.text) {
      for (let o = 0; i.text[o] == s.text[o]; o++)
        n++;
      return n;
    }
    if (i.content.size || s.content.size) {
      let o = nf(i.content, s.content, n + 1);
      if (o != null)
        return o;
    }
    n += i.nodeSize;
  }
}
function rf(t, e, n, r) {
  for (let i = t.childCount, s = e.childCount; ; ) {
    if (i == 0 || s == 0)
      return i == s ? null : { a: n, b: r };
    let o = t.child(--i), l = e.child(--s), a = o.nodeSize;
    if (o == l) {
      n -= a, r -= a;
      continue;
    }
    if (!o.sameMarkup(l))
      return { a: n, b: r };
    if (o.isText && o.text != l.text) {
      let c = 0, u = Math.min(o.text.length, l.text.length);
      for (; c < u && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, n--, r--;
      return { a: n, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = rf(o.content, l.content, n - 1, r - 1);
      if (c)
        return c;
    }
    n -= a, r -= a;
  }
}
class E {
  /**
  @internal
  */
  constructor(e, n) {
    if (this.content = e, this.size = n || 0, n == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, n, r, i = 0, s) {
    for (let o = 0, l = 0; l < n; o++) {
      let a = this.content[o], c = l + a.nodeSize;
      if (c > e && r(a, i + l, s || null, o) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, n - u), r, i + u);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, n, r, i) {
    let s = "", o = !0;
    return this.nodesBetween(e, n, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, n - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (o ? o = !1 : s += r), s += c;
    }, 0), s;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let n = this.lastChild, r = e.firstChild, i = this.content.slice(), s = 0;
    for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), s = 1); s < e.content.length; s++)
      i.push(e.content[s]);
    return new E(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, n = this.size) {
    if (e == 0 && n == this.size)
      return this;
    let r = [], i = 0;
    if (n > e)
      for (let s = 0, o = 0; o < n; s++) {
        let l = this.content[s], a = o + l.nodeSize;
        a > e && ((o < e || a > n) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, n - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, n - o - 1))), r.push(l), i += l.nodeSize), o = a;
      }
    return new E(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, n) {
    return e == n ? E.empty : e == 0 && n == this.content.length ? this : new E(this.content.slice(e, n));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, n) {
    let r = this.content[e];
    if (r == n)
      return this;
    let i = this.content.slice(), s = this.size + n.nodeSize - r.nodeSize;
    return i[e] = n, new E(i, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new E([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new E(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let n = 0; n < this.content.length; n++)
      if (!this.content[n].eq(e.content[n]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let n = this.content[e];
    if (!n)
      throw new RangeError("Index " + e + " out of range for " + this);
    return n;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let n = 0, r = 0; n < this.content.length; n++) {
      let i = this.content[n];
      e(i, r, n), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, n = 0) {
    return nf(this, e, n);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, n = this.size, r = e.size) {
    return rf(this, e, n, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return is(0, e);
    if (e == this.size)
      return is(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let n = 0, r = 0; ; n++) {
      let i = this.child(n), s = r + i.nodeSize;
      if (s >= e)
        return s == e ? is(n + 1, s) : is(n, r);
      r = s;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      return E.empty;
    if (!Array.isArray(n))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new E(n.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return E.empty;
    let n, r = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      r += s.nodeSize, i && s.isText && e[i - 1].sameMarkup(s) ? (n || (n = e.slice(0, i)), n[n.length - 1] = s.withText(n[n.length - 1].text + s.text)) : n && n.push(s);
    }
    return new E(n || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return E.empty;
    if (e instanceof E)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new E([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
E.empty = new E([], 0);
const nl = { index: 0, offset: 0 };
function is(t, e) {
  return nl.index = t, nl.offset = e, nl;
}
function Is(t, e) {
  if (t === e)
    return !0;
  if (!(t && typeof t == "object") || !(e && typeof e == "object"))
    return !1;
  let n = Array.isArray(t);
  if (Array.isArray(e) != n)
    return !1;
  if (n) {
    if (t.length != e.length)
      return !1;
    for (let r = 0; r < t.length; r++)
      if (!Is(t[r], e[r]))
        return !1;
  } else {
    for (let r in t)
      if (!(r in e) || !Is(t[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in t))
        return !1;
  }
  return !0;
}
let Q = class Vl {
  /**
  @internal
  */
  constructor(e, n) {
    this.type = e, this.attrs = n;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let n, r = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        n || (n = e.slice(0, i));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (n || (n = e.slice(0, i)), n.push(this), r = !0), n && n.push(s);
      }
    }
    return n || (n = e.slice()), r || n.push(this), n;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return e.slice(0, n).concat(e.slice(n + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let n = 0; n < e.length; n++)
      if (this.eq(e[n]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && Is(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let n in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, n) {
    if (!n)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[n.type];
    if (!r)
      throw new RangeError(`There is no mark type ${n.type} in this schema`);
    let i = r.create(n.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, n) {
    if (e == n)
      return !0;
    if (e.length != n.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(n[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return Vl.none;
    if (e instanceof Vl)
      return [e];
    let n = e.slice();
    return n.sort((r, i) => r.type.rank - i.type.rank), n;
  }
};
Q.none = [];
class Ds extends Error {
}
class I {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, n, r) {
    this.content = e, this.openStart = n, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, n) {
    let r = of(this.content, e + this.openStart, n);
    return r && new I(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, n) {
    return new I(sf(this.content, e + this.openStart, n + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      return I.empty;
    let r = n.openStart || 0, i = n.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new I(E.fromJSON(e, n.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, n = !0) {
    let r = 0, i = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (n || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (n || !s.type.spec.isolating); s = s.lastChild)
      i++;
    return new I(e, r, i);
  }
}
I.empty = new I(E.empty, 0, 0);
function sf(t, e, n) {
  let { index: r, offset: i } = t.findIndex(e), s = t.maybeChild(r), { index: o, offset: l } = t.findIndex(n);
  if (i == e || s.isText) {
    if (l != n && !t.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return t.cut(0, e).append(t.cut(n));
  }
  if (r != o)
    throw new RangeError("Removing non-flat range");
  return t.replaceChild(r, s.copy(sf(s.content, e - i - 1, n - i - 1)));
}
function of(t, e, n, r) {
  let { index: i, offset: s } = t.findIndex(e), o = t.maybeChild(i);
  if (s == e || o.isText)
    return r && !r.canReplace(i, i, n) ? null : t.cut(0, e).append(n).append(t.cut(e));
  let l = of(o.content, e - s - 1, n, o);
  return l && t.replaceChild(i, o.copy(l));
}
function kv(t, e, n) {
  if (n.openStart > t.depth)
    throw new Ds("Inserted content deeper than insertion position");
  if (t.depth - n.openStart != e.depth - n.openEnd)
    throw new Ds("Inconsistent open depths");
  return lf(t, e, n, 0);
}
function lf(t, e, n, r) {
  let i = t.index(r), s = t.node(r);
  if (i == e.index(r) && r < t.depth - n.openStart) {
    let o = lf(t, e, n, r + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (n.content.size)
    if (!n.openStart && !n.openEnd && t.depth == r && e.depth == r) {
      let o = t.parent, l = o.content;
      return nr(o, l.cut(0, t.parentOffset).append(n.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: o, end: l } = wv(n, t);
      return nr(s, cf(t, o, l, e, r));
    }
  else return nr(s, Rs(t, e, r));
}
function af(t, e) {
  if (!e.type.compatibleContent(t.type))
    throw new Ds("Cannot join " + e.type.name + " onto " + t.type.name);
}
function Hl(t, e, n) {
  let r = t.node(n);
  return af(r, e.node(n)), r;
}
function tr(t, e) {
  let n = e.length - 1;
  n >= 0 && t.isText && t.sameMarkup(e[n]) ? e[n] = t.withText(e[n].text + t.text) : e.push(t);
}
function ci(t, e, n, r) {
  let i = (e || t).node(n), s = 0, o = e ? e.index(n) : i.childCount;
  t && (s = t.index(n), t.depth > n ? s++ : t.textOffset && (tr(t.nodeAfter, r), s++));
  for (let l = s; l < o; l++)
    tr(i.child(l), r);
  e && e.depth == n && e.textOffset && tr(e.nodeBefore, r);
}
function nr(t, e) {
  return t.type.checkContent(e), t.copy(e);
}
function cf(t, e, n, r, i) {
  let s = t.depth > i && Hl(t, e, i + 1), o = r.depth > i && Hl(n, r, i + 1), l = [];
  return ci(null, t, i, l), s && o && e.index(i) == n.index(i) ? (af(s, o), tr(nr(s, cf(t, e, n, r, i + 1)), l)) : (s && tr(nr(s, Rs(t, e, i + 1)), l), ci(e, n, i, l), o && tr(nr(o, Rs(n, r, i + 1)), l)), ci(r, null, i, l), new E(l);
}
function Rs(t, e, n) {
  let r = [];
  if (ci(null, t, n, r), t.depth > n) {
    let i = Hl(t, e, n + 1);
    tr(nr(i, Rs(t, e, n + 1)), r);
  }
  return ci(e, null, n, r), new E(r);
}
function wv(t, e) {
  let n = e.depth - t.openStart, i = e.node(n).copy(t.content);
  for (let s = n - 1; s >= 0; s--)
    i = e.node(s).copy(E.from(i));
  return {
    start: i.resolveNoCache(t.openStart + n),
    end: i.resolveNoCache(i.content.size - t.openEnd - n)
  };
}
class _i {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.pos = e, this.path = n, this.parentOffset = r, this.depth = n.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, n = this.index(this.depth);
    if (n == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(n);
    return r ? e.child(n).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), n = this.pos - this.path[this.path.length - 1];
    return n ? this.parent.child(e).cut(0, n) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, n) {
    n = this.resolveDepth(n);
    let r = this.path[n * 3], i = n == 0 ? 0 : this.path[n * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      i += r.child(s).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, n = this.index();
    if (e.content.size == 0)
      return Q.none;
    if (this.textOffset)
      return e.child(n).marks;
    let r = e.maybeChild(n - 1), i = e.maybeChild(n);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let s = r.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
    return s;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let n = this.parent.maybeChild(this.index());
    if (!n || !n.isInline)
      return null;
    let r = n.marks, i = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!i || !r[s].isInSet(i.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let n = this.depth; n > 0; n--)
      if (this.start(n) <= e && this.end(n) >= e)
        return n;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, n) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!n || n(this.node(r))))
        return new Ls(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let n = 1; n <= this.depth; n++)
      e += (e ? "/" : "") + this.node(n).type.name + "_" + this.index(n - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, n) {
    if (!(n >= 0 && n <= e.content.size))
      throw new RangeError("Position " + n + " out of range");
    let r = [], i = 0, s = n;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(s), c = s - a;
      if (r.push(o, l, i + a), !c || (o = o.child(l), o.isText))
        break;
      s = c - 1, i += a + 1;
    }
    return new _i(n, r, s);
  }
  /**
  @internal
  */
  static resolveCached(e, n) {
    let r = Rc.get(e);
    if (r)
      for (let s = 0; s < r.elts.length; s++) {
        let o = r.elts[s];
        if (o.pos == n)
          return o;
      }
    else
      Rc.set(e, r = new xv());
    let i = r.elts[r.i] = _i.resolve(e, n);
    return r.i = (r.i + 1) % Sv, i;
  }
}
class xv {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Sv = 12, Rc = /* @__PURE__ */ new WeakMap();
class Ls {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Cv = /* @__PURE__ */ Object.create(null);
class Ct {
  /**
  @internal
  */
  constructor(e, n, r, i = Q.none) {
    this.type = e, this.attrs = n, this.marks = i, this.content = r || E.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, n, r, i = 0) {
    this.content.nodesBetween(e, n, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(e, n, r, i) {
    return this.content.textBetween(e, n, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, n, r) {
    return this.type == e && Is(this.attrs, n || e.defaultAttrs || Cv) && Q.sameSet(this.marks, r || Q.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Ct(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Ct(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, n = this.content.size) {
    return e == 0 && n == this.content.size ? this : this.copy(this.content.cut(e, n));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, n = this.content.size, r = !1) {
    if (e == n)
      return I.empty;
    let i = this.resolve(e), s = this.resolve(n), o = r ? 0 : i.sharedDepth(n), l = i.start(o), c = i.node(o).content.cut(i.pos - l, s.pos - l);
    return new I(c, i.depth - o, s.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, n, r) {
    return kv(this.resolve(e), this.resolve(n), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let n = this; ; ) {
      let { index: r, offset: i } = n.content.findIndex(e);
      if (n = n.maybeChild(r), !n)
        return null;
      if (i == e || n.isText)
        return n;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: n, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(n), index: n, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: n, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(n), index: n, offset: r };
    let i = this.content.child(n - 1);
    return { node: i, index: n - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return _i.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return _i.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, n, r) {
    let i = !1;
    return n > e && this.nodesBetween(e, n, (s) => (r.isInSet(s.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), uf(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let n = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!n)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return n;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, n, r = E.empty, i = 0, s = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, i, s), l = o && o.matchFragment(this.content, n);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < s; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, n, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), o = s && s.matchFragment(this.content, n);
    return o ? o.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = Q.none;
    for (let n = 0; n < this.marks.length; n++) {
      let r = this.marks[n];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!Q.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((n) => n.type.name)}`);
    this.content.forEach((n) => n.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let n in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((n) => n.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, n) {
    if (!n)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (n.marks) {
      if (!Array.isArray(n.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = n.marks.map(e.markFromJSON);
    }
    if (n.type == "text") {
      if (typeof n.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(n.text, r);
    }
    let i = E.fromJSON(e, n.content), s = e.nodeType(n.type).create(n.attrs, i, r);
    return s.type.checkAttrs(s.attrs), s;
  }
}
Ct.prototype.text = void 0;
class Ps extends Ct {
  /**
  @internal
  */
  constructor(e, n, r, i) {
    if (super(e, n, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : uf(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, n) {
    return this.text.slice(e, n);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Ps(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Ps(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, n = this.text.length) {
    return e == 0 && n == this.text.length ? this : this.withText(this.text.slice(e, n));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function uf(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    e = t[n].type.name + "(" + e + ")";
  return e;
}
class cr {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, n) {
    let r = new Mv(e, n);
    if (r.next == null)
      return cr.empty;
    let i = df(r);
    r.next && r.err("Unexpected trailing text");
    let s = Iv(Nv(i));
    return Dv(s, r), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let n = 0; n < this.next.length; n++)
      if (this.next[n].type == e)
        return this.next[n].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, n = 0, r = e.childCount) {
    let i = this;
    for (let s = n; i && s < r; s++)
      i = i.matchType(e.child(s).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: n } = this.next[e];
      if (!(n.isText || n.hasRequiredAttrs()))
        return n;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let n = 0; n < this.next.length; n++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[n].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, n = !1, r = 0) {
    let i = [this];
    function s(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!n || a.validEnd))
        return E.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: d } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(d) == -1) {
          i.push(d);
          let f = s(d, l.concat(u));
          if (f)
            return f;
        }
      }
      return null;
    }
    return s(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let n = this.computeWrapping(e);
    return this.wrapCache.push(e, n), n;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let n = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), s = i.match;
      if (s.matchType(e)) {
        let o = [];
        for (let l = i; l.type; l = l.via)
          o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: l, next: a } = s.next[o];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in n) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), n[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function n(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && n(r.next[i].next);
    }
    return n(this), e.map((r, i) => {
      let s = i + (r.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < r.next.length; o++)
        s += (o ? ", " : "") + r.next[o].type.name + "->" + e.indexOf(r.next[o].next);
      return s;
    }).join(`
`);
  }
}
cr.empty = new cr(!0);
class Mv {
  constructor(e, n) {
    this.string = e, this.nodeTypes = n, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function df(t) {
  let e = [];
  do
    e.push(Ev(t));
  while (t.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Ev(t) {
  let e = [];
  do
    e.push(Tv(t));
  while (t.next && t.next != ")" && t.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Tv(t) {
  let e = Ov(t);
  for (; ; )
    if (t.eat("+"))
      e = { type: "plus", expr: e };
    else if (t.eat("*"))
      e = { type: "star", expr: e };
    else if (t.eat("?"))
      e = { type: "opt", expr: e };
    else if (t.eat("{"))
      e = Av(t, e);
    else
      break;
  return e;
}
function Lc(t) {
  /\D/.test(t.next) && t.err("Expected number, got '" + t.next + "'");
  let e = Number(t.next);
  return t.pos++, e;
}
function Av(t, e) {
  let n = Lc(t), r = n;
  return t.eat(",") && (t.next != "}" ? r = Lc(t) : r = -1), t.eat("}") || t.err("Unclosed braced range"), { type: "range", min: n, max: r, expr: e };
}
function _v(t, e) {
  let n = t.nodeTypes, r = n[e];
  if (r)
    return [r];
  let i = [];
  for (let s in n) {
    let o = n[s];
    o.isInGroup(e) && i.push(o);
  }
  return i.length == 0 && t.err("No node type or group '" + e + "' found"), i;
}
function Ov(t) {
  if (t.eat("(")) {
    let e = df(t);
    return t.eat(")") || t.err("Missing closing paren"), e;
  } else if (/\W/.test(t.next))
    t.err("Unexpected token '" + t.next + "'");
  else {
    let e = _v(t, t.next).map((n) => (t.inline == null ? t.inline = n.isInline : t.inline != n.isInline && t.err("Mixing inline and block content"), { type: "name", value: n }));
    return t.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Nv(t) {
  let e = [[]];
  return i(s(t, 0), n()), e;
  function n() {
    return e.push([]) - 1;
  }
  function r(o, l, a) {
    let c = { term: a, to: l };
    return e[o].push(c), c;
  }
  function i(o, l) {
    o.forEach((a) => a.to = l);
  }
  function s(o, l) {
    if (o.type == "choice")
      return o.exprs.reduce((a, c) => a.concat(s(c, l)), []);
    if (o.type == "seq")
      for (let a = 0; ; a++) {
        let c = s(o.exprs[a], l);
        if (a == o.exprs.length - 1)
          return c;
        i(c, l = n());
      }
    else if (o.type == "star") {
      let a = n();
      return r(l, a), i(s(o.expr, a), a), [r(a)];
    } else if (o.type == "plus") {
      let a = n();
      return i(s(o.expr, l), a), i(s(o.expr, a), a), [r(a)];
    } else {
      if (o.type == "opt")
        return [r(l)].concat(s(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let u = n();
          i(s(o.expr, a), u), a = u;
        }
        if (o.max == -1)
          i(s(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = n();
            r(a, u), i(s(o.expr, a), u), a = u;
          }
        return [r(a)];
      } else {
        if (o.type == "name")
          return [r(l, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function ff(t, e) {
  return e - t;
}
function Pc(t, e) {
  let n = [];
  return r(e), n.sort(ff);
  function r(i) {
    let s = t[i];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    n.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: l, to: a } = s[o];
      !l && n.indexOf(a) == -1 && r(a);
    }
  }
}
function Iv(t) {
  let e = /* @__PURE__ */ Object.create(null);
  return n(Pc(t, 0));
  function n(r) {
    let i = [];
    r.forEach((o) => {
      t[o].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Pc(t, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[r.join(",")] = new cr(r.indexOf(t.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let l = i[o][1].sort(ff);
      s.next.push({ type: i[o][0], next: e[l.join(",")] || n(l) });
    }
    return s;
  }
}
function Dv(t, e) {
  for (let n = 0, r = [t]; n < r.length; n++) {
    let i = r[n], s = !i.validEnd, o = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      o.push(a.name), s && !(a.isText || a.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function hf(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t) {
    let r = t[n];
    if (!r.hasDefault)
      return null;
    e[n] = r.default;
  }
  return e;
}
function pf(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  for (let r in t) {
    let i = e && e[r];
    if (i === void 0) {
      let s = t[r];
      if (s.hasDefault)
        i = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    n[r] = i;
  }
  return n;
}
function mf(t, e, n, r) {
  for (let i in e)
    if (!(i in t))
      throw new RangeError(`Unsupported attribute ${i} for ${n} of type ${i}`);
  for (let i in t) {
    let s = t[i];
    s.validate && s.validate(e[i]);
  }
}
function gf(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      n[r] = new Lv(t, r, e[r]);
  return n;
}
let Bc = class vf {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.name = e, this.schema = n, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = gf(e, r.attrs), this.defaultAttrs = hf(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == cr.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : pf(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, n, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Ct(this, this.computeAttrs(e), E.from(n), Q.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, n, r) {
    return n = E.from(n), this.checkContent(n), new Ct(this, this.computeAttrs(e), n, Q.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, n, r) {
    if (e = this.computeAttrs(e), n = E.from(n), n.size) {
      let o = this.contentMatch.fillBefore(n);
      if (!o)
        return null;
      n = o.append(n);
    }
    let i = this.contentMatch.matchFragment(n), s = i && i.fillBefore(E.empty, !0);
    return s ? new Ct(this, e, n.append(s), Q.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let n = this.contentMatch.matchFragment(e);
    if (!n || !n.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    mf(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let n = 0; n < e.length; n++)
      if (!this.allowsMarkType(e[n].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let n;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? n && n.push(e[r]) : n || (n = e.slice(0, r));
    return n ? n.length ? n : Q.none : e;
  }
  /**
  @internal
  */
  static compile(e, n) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, o) => r[s] = new vf(s, n, o));
    let i = n.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function Rv(t, e, n) {
  let r = n.split("|");
  return (i) => {
    let s = i === null ? "null" : typeof i;
    if (r.indexOf(s) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${t}, got ${s}`);
  };
}
class Lv {
  constructor(e, n, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Rv(e, n, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class No {
  /**
  @internal
  */
  constructor(e, n, r, i) {
    this.name = e, this.rank = n, this.schema = r, this.spec = i, this.attrs = gf(e, i.attrs), this.excluded = null;
    let s = hf(this.attrs);
    this.instance = s ? new Q(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Q(this, pf(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, n) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((s, o) => r[s] = new No(s, i++, n, o)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var n = 0; n < e.length; n++)
      e[n].type == this && (e = e.slice(0, n).concat(e.slice(n + 1)), n--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let n = 0; n < e.length; n++)
      if (e[n].type == this)
        return e[n];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    mf(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class yf {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let n = this.spec = {};
    for (let i in e)
      n[i] = e[i];
    n.nodes = _e.from(e.nodes), n.marks = _e.from(e.marks || {}), this.nodes = Bc.compile(this.spec.nodes, this), this.marks = No.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i], o = s.spec.content || "", l = s.spec.marks;
      if (s.contentMatch = r[o] || (r[o] = cr.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = s;
      }
      s.markSet = l == "_" ? null : l ? zc(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : zc(this, o.split(" "));
    }
    this.nodeFromJSON = (i) => Ct.fromJSON(this, i), this.markFromJSON = (i) => Q.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, n = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Bc) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(n, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, n) {
    let r = this.nodes.text;
    return new Ps(r, r.defaultAttrs, e, Q.setFrom(n));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, n) {
    return typeof e == "string" && (e = this.marks[e]), e.create(n);
  }
  /**
  @internal
  */
  nodeType(e) {
    let n = this.nodes[e];
    if (!n)
      throw new RangeError("Unknown node type: " + e);
    return n;
  }
}
function zc(t, e) {
  let n = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], s = t.marks[i], o = s;
    if (s)
      n.push(s);
    else
      for (let l in t.marks) {
        let a = t.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && n.push(o = a);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return n;
}
function Pv(t) {
  return t.tag != null;
}
function Bv(t) {
  return t.style != null;
}
class bn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, n) {
    this.schema = e, this.rules = n, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    n.forEach((i) => {
      if (Pv(i))
        this.tags.push(i);
      else if (Bv(i)) {
        let s = /[^=]*/.exec(i.style)[0];
        r.indexOf(s) < 0 && r.push(s), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let s = e.nodes[i.node];
      return s.contentMatch.matchType(s);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, n = {}) {
    let r = new Vc(this, n, !1);
    return r.addAll(e, Q.none, n.from, n.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, n = {}) {
    let r = new Vc(this, n, !0);
    return r.addAll(e, Q.none, n.from, n.to), I.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, n, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (Vv(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || n.matchesContext(s.context))) {
        if (s.getAttrs) {
          let o = s.getAttrs(e);
          if (o === !1)
            continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, n, r, i) {
    for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], l = o.style;
      if (!(l.indexOf(e) != 0 || o.context && !r.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != n))) {
        if (o.getAttrs) {
          let a = o.getAttrs(n);
          if (a === !1)
            continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let n = [];
    function r(i) {
      let s = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < n.length; o++) {
        let l = n[o];
        if ((l.priority == null ? 50 : l.priority) < s)
          break;
      }
      n.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let s = e.marks[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = Hc(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in e.nodes) {
      let s = e.nodes[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = Hc(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return n;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new bn(e, bn.schemaRules(e)));
  }
}
const bf = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, zv = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, kf = { ol: !0, ul: !0 }, Oi = 1, jl = 2, ui = 4;
function Fc(t, e, n) {
  return e != null ? (e ? Oi : 0) | (e === "full" ? jl : 0) : t && t.whitespace == "pre" ? Oi | jl : n & ~ui;
}
class ss {
  constructor(e, n, r, i, s, o) {
    this.type = e, this.attrs = n, this.marks = r, this.solid = i, this.options = o, this.content = [], this.activeMarks = Q.none, this.match = s || (o & ui ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let n = this.type.contentMatch.fillBefore(E.from(e));
      if (n)
        this.match = this.type.contentMatch.matchFragment(n);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Oi)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length));
      }
    }
    let n = E.from(this.content);
    return !e && this.match && (n = n.append(this.match.fillBefore(E.empty, !0))), this.type ? this.type.create(this.attrs, n, this.marks) : n;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !bf.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Vc {
  constructor(e, n, r) {
    this.parser = e, this.options = n, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = n.topNode, s, o = Fc(null, n.preserveWhitespace, 0) | (r ? ui : 0);
    i ? s = new ss(i.type, i.attrs, Q.none, !0, n.topMatch || i.type.contentMatch, o) : r ? s = new ss(null, null, Q.none, !0, null, o) : s = new ss(e.schema.topNodeType, null, Q.none, !0, null, o), this.nodes = [s], this.find = n.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, n) {
    e.nodeType == 3 ? this.addTextNode(e, n) : e.nodeType == 1 && this.addElement(e, n);
  }
  addTextNode(e, n) {
    let r = e.nodeValue, i = this.top, s = i.options & jl ? "full" : this.localPreserveWS || (i.options & Oi) > 0, { schema: o } = this.parser;
    if (s === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (s)
        if (s === "full")
          r = r.replace(/\r\n?/g, `
`);
        else if (o.linebreakReplacement && /[\r\n]/.test(r) && this.top.findWrapping(o.linebreakReplacement.create())) {
          let l = r.split(/\r?\n|\r/);
          for (let a = 0; a < l.length; a++)
            a && this.insertNode(o.linebreakReplacement.create(), n, !0), l[a] && this.insertNode(o.text(l[a]), n, !/\S/.test(l[a]));
          r = "";
        } else
          r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let l = i.content[i.content.length - 1], a = e.previousSibling;
        (!l || a && a.nodeName == "BR" || l.isText && /[ \t\r\n\u000c]$/.test(l.text)) && (r = r.slice(1));
      }
      r && this.insertNode(o.text(r), n, !/\S/.test(r)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, n, r) {
    let i = this.localPreserveWS, s = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(), l;
    kf.hasOwnProperty(o) && this.parser.normalizeLists && Fv(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : zv.hasOwnProperty(o))
      this.findInside(e), this.ignoreFallback(e, n);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (bf.hasOwnProperty(o))
        s.content.length && s.content[0].isInline && this.open && (this.open--, s = this.top), c = !0, s.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, n);
        break e;
      }
      let d = a && a.skip ? n : this.readStyles(e, n);
      d && this.addAll(e, d), c && this.sync(s), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, n);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, n) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), n);
  }
  // Called for ignored nodes
  ignoreFallback(e, n) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), n, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, n) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let s = this.parser.matchedStyles[i], o = r.getPropertyValue(s);
        if (o)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(s, o, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? n = n.filter((c) => !a.clearMark(c)) : n = n.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return n;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, n, r, i) {
    let s, o;
    if (n.node)
      if (o = this.parser.schema.nodes[n.node], o.isLeaf)
        this.insertNode(o.create(n.attrs), r, e.nodeName == "BR") || this.leafFallback(e, r);
      else {
        let a = this.enter(o, n.attrs || null, r, n.preserveWhitespace);
        a && (s = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[n.mark];
      r = r.concat(a.create(n.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (n.getContent)
      this.findInside(e), n.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r, !1));
    else {
      let a = e;
      typeof n.contentElement == "string" ? a = e.querySelector(n.contentElement) : typeof n.contentElement == "function" ? a = n.contentElement(e) : n.contentElement && (a = n.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
    }
    s && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, n, r, i) {
    let s = r || 0;
    for (let o = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; o != l; o = o.nextSibling, ++s)
      this.findAtPoint(e, s), this.addDOM(o, n);
    this.findAtPoint(e, s);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, n, r) {
    let i, s;
    for (let o = this.open, l = 0; o >= 0; o--) {
      let a = this.nodes[o], c = a.findWrapping(e);
      if (c && (!i || i.length > c.length + l) && (i = c, s = a, !c.length))
        break;
      if (a.solid) {
        if (r)
          break;
        l += 2;
      }
    }
    if (!i)
      return null;
    this.sync(s);
    for (let o = 0; o < i.length; o++)
      n = this.enterInner(i[o], null, n, !1);
    return n;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, n, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let s = this.textblockFromContext();
      s && (n = this.enterInner(s, null, n));
    }
    let i = this.findPlace(e, n, r);
    if (i) {
      this.closeExtra();
      let s = this.top;
      s.match && (s.match = s.match.matchType(e.type));
      let o = Q.none;
      for (let l of i.concat(e.marks))
        (s.type ? s.type.allowsMarkType(l.type) : jc(l.type, e.type)) && (o = l.addToSet(o));
      return s.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, n, r, i) {
    let s = this.findPlace(e.create(n), r, !1);
    return s && (s = this.enterInner(e, n, r, !0, i)), s;
  }
  // Open a node of the given type
  enterInner(e, n, r, i = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let l = Fc(e, s, o.options);
    o.options & ui && o.content.length == 0 && (l |= ui);
    let a = Q.none;
    return r = r.filter((c) => (o.type ? o.type.allowsMarkType(c.type) : jc(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new ss(e, n, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let n = this.nodes.length - 1;
    if (n > this.open) {
      for (; n > this.open; n--)
        this.nodes[n - 1].content.push(this.nodes[n].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let n = this.open; n >= 0; n--) {
      if (this.nodes[n] == e)
        return this.open = n, !0;
      this.localPreserveWS && (this.nodes[n].options |= Oi);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let n = this.open; n >= 0; n--) {
      let r = this.nodes[n].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      n && e++;
    }
    return e;
  }
  findAtPoint(e, n) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == n && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].pos == null && e.nodeType == 1 && e.contains(this.find[n].node) && (this.find[n].pos = this.currentPos);
  }
  findAround(e, n, r) {
    if (e != n && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && n.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].node == e && (this.find[n].pos = this.currentPos - (e.nodeValue.length - this.find[n].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let n = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), o = (l, a) => {
      for (; l >= 0; l--) {
        let c = n[l];
        if (c == "") {
          if (l == n.length - 1 || l == 0)
            continue;
          for (; a >= s; a--)
            if (o(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= s ? r.node(a - s).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return o(n.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let n = e.depth; n >= 0; n--) {
        let r = e.node(n).contentMatchAt(e.indexAfter(n)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let n in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[n];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function Fv(t) {
  for (let e = t.firstChild, n = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && kf.hasOwnProperty(r) && n ? (n.appendChild(e), e = n) : r == "li" ? n = e : r && (n = null);
  }
}
function Vv(t, e) {
  return (t.matches || t.msMatchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector).call(t, e);
}
function Hc(t) {
  let e = {};
  for (let n in t)
    e[n] = t[n];
  return e;
}
function jc(t, e) {
  let n = e.schema.nodes;
  for (let r in n) {
    let i = n[r];
    if (!i.allowsMarkType(t))
      continue;
    let s = [], o = (l) => {
      s.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || s.indexOf(u) < 0 && o(u))
          return !0;
      }
    };
    if (o(i.contentMatch))
      return !0;
  }
}
class mr {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, n) {
    this.nodes = e, this.marks = n;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, n = {}, r) {
    r || (r = rl(n).createDocumentFragment());
    let i = r, s = [];
    return e.forEach((o) => {
      if (s.length || o.marks.length) {
        let l = 0, a = 0;
        for (; l < s.length && a < o.marks.length; ) {
          let c = o.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(s[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < s.length; )
          i = s.pop()[1];
        for (; a < o.marks.length; ) {
          let c = o.marks[a++], u = this.serializeMark(c, o.isInline, n);
          u && (s.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, n));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, n) {
    let { dom: r, contentDOM: i } = ws(rl(n), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, n, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, n = {}) {
    let r = this.serializeNodeInner(e, n);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(e.marks[i], e.isInline, n);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, n, r = {}) {
    let i = this.marks[e.type.name];
    return i && ws(rl(r), i(e, n), null, e.attrs);
  }
  static renderSpec(e, n, r = null, i) {
    return ws(e, n, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new mr(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let n = Wc(e.nodes);
    return n.text || (n.text = (r) => r.text), n;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Wc(e.marks);
  }
}
function Wc(t) {
  let e = {};
  for (let n in t) {
    let r = t[n].spec.toDOM;
    r && (e[n] = r);
  }
  return e;
}
function rl(t) {
  return t.document || window.document;
}
const Uc = /* @__PURE__ */ new WeakMap();
function Hv(t) {
  let e = Uc.get(t);
  return e === void 0 && Uc.set(t, e = jv(t)), e;
}
function jv(t) {
  let e = null;
  function n(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            n(r[i]);
      else
        for (let i in r)
          n(r[i]);
  }
  return n(t), e;
}
function ws(t, e, n, r) {
  if (typeof e == "string")
    return { dom: t.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], s;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (s = Hv(r)) && s.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = i.indexOf(" ");
  o > 0 && (n = i.slice(0, o), i = i.slice(o + 1));
  let l, a = n ? t.createElementNS(n, i) : t.createElement(i), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let d in c)
      if (c[d] != null) {
        let f = d.indexOf(" ");
        f > 0 ? a.setAttributeNS(d.slice(0, f), d.slice(f + 1), c[d]) : d == "style" && a.style ? a.style.cssText = c[d] : a.setAttribute(d, c[d]);
      }
  }
  for (let d = u; d < e.length; d++) {
    let f = e[d];
    if (f === 0) {
      if (d < e.length - 1 || d > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else {
      let { dom: h, contentDOM: p } = ws(t, f, n, r);
      if (a.appendChild(h), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const wf = 65535, xf = Math.pow(2, 16);
function Wv(t, e) {
  return t + e * xf;
}
function qc(t) {
  return t & wf;
}
function Uv(t) {
  return (t - (t & wf)) / xf;
}
const Sf = 1, Cf = 2, xs = 4, Mf = 8;
class Wl {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.pos = e, this.delInfo = n, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Mf) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Sf | xs)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Cf | xs)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & xs) > 0;
  }
}
class rt {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, n = !1) {
    if (this.ranges = e, this.inverted = n, !e.length && rt.empty)
      return rt.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let n = 0, r = qc(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        n += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + n + Uv(e);
  }
  mapResult(e, n = 1) {
    return this._map(e, n, !1);
  }
  map(e, n = 1) {
    return this._map(e, n, !0);
  }
  /**
  @internal
  */
  _map(e, n, r) {
    let i = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = this.ranges[l + o], d = a + c;
      if (e <= d) {
        let f = c ? e == a ? -1 : e == d ? 1 : n : n, h = a + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (n < 0 ? a : d) ? null : Wv(l / 3, e - a), m = e == a ? Cf : e == d ? Sf : xs;
        return (n < 0 ? e != a : e != d) && (m |= Mf), new Wl(h, m, p);
      }
      i += u - c;
    }
    return r ? e + i : new Wl(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, n) {
    let r = 0, i = qc(n), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + o] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let n = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], l = o - (this.inverted ? s : 0), a = o + (this.inverted ? 0 : s), c = this.ranges[i + n], u = this.ranges[i + r];
      e(l, l + c, a, a + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new rt(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? rt.empty : new rt(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
rt.empty = new rt([]);
class Ni {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, n, r = 0, i = e ? e.length : 0) {
    this.mirror = n, this.from = r, this.to = i, this._maps = e || [], this.ownData = !(e || n);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, n = this.maps.length) {
    return new Ni(this._maps, this.mirror, e, n);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, n) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), n != null && this.setMirror(this._maps.length - 1, n);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let n = 0, r = this._maps.length; n < e._maps.length; n++) {
      let i = e.getMirror(n);
      this.appendMap(e._maps[n], i != null && i < n ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let n = 0; n < this.mirror.length; n++)
        if (this.mirror[n] == e)
          return this.mirror[n + (n % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, n) {
    this.mirror || (this.mirror = []), this.mirror.push(e, n);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let n = e.maps.length - 1, r = this._maps.length + e._maps.length; n >= 0; n--) {
      let i = e.getMirror(n);
      this.appendMap(e._maps[n].invert(), i != null && i > n ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new Ni();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, n = 1) {
    if (this.mirror)
      return this._map(e, n, !0);
    for (let r = this.from; r < this.to; r++)
      e = this._maps[r].map(e, n);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, n = 1) {
    return this._map(e, n, !1);
  }
  /**
  @internal
  */
  _map(e, n, r) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this._maps[s], l = o.mapResult(e, n);
      if (l.recover != null) {
        let a = this.getMirror(s);
        if (a != null && a > s && a < this.to) {
          s = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new Wl(e, i, null);
  }
}
const il = /* @__PURE__ */ Object.create(null);
class Fe {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return rt.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, n) {
    if (!n || !n.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = il[n.stepType];
    if (!r)
      throw new RangeError(`No step type ${n.stepType} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, n) {
    if (e in il)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return il[e] = n, n.prototype.jsonID = e, n;
  }
}
class fe {
  /**
  @internal
  */
  constructor(e, n) {
    this.doc = e, this.failed = n;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new fe(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new fe(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, n, r, i) {
    try {
      return fe.ok(e.replace(n, r, i));
    } catch (s) {
      if (s instanceof Ds)
        return fe.fail(s.message);
      throw s;
    }
  }
}
function Ia(t, e, n) {
  let r = [];
  for (let i = 0; i < t.childCount; i++) {
    let s = t.child(i);
    s.content.size && (s = s.copy(Ia(s.content, e, s))), s.isInline && (s = e(s, n, i)), r.push(s);
  }
  return E.fromArray(r);
}
class pn extends Fe {
  /**
  Create a mark step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), s = new I(Ia(n.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), n.openStart, n.openEnd);
    return fe.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new St(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new pn(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof pn && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new pn(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new pn(n.from, n.to, e.markFromJSON(n.mark));
  }
}
Fe.jsonID("addMark", pn);
class St extends Fe {
  /**
  Create a mark-removing step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = new I(Ia(n.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), n.openStart, n.openEnd);
    return fe.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new pn(this.from, this.to, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deleted && r.deleted || n.pos >= r.pos ? null : new St(n.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof St && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new St(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new St(n.from, n.to, e.markFromJSON(n.mark));
  }
}
Fe.jsonID("removeMark", St);
class mn extends Fe {
  /**
  Create a node mark step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return fe.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.addToSet(n.marks));
    return fe.fromReplace(e, this.pos, this.pos + 1, new I(E.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    if (n) {
      let r = this.mark.addToSet(n.marks);
      if (r.length == n.marks.length) {
        for (let i = 0; i < n.marks.length; i++)
          if (!n.marks[i].isInSet(r))
            return new mn(this.pos, n.marks[i]);
        return new mn(this.pos, this.mark);
      }
    }
    return new ur(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new mn(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new mn(n.pos, e.markFromJSON(n.mark));
  }
}
Fe.jsonID("addNodeMark", mn);
class ur extends Fe {
  /**
  Create a mark-removing step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return fe.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.removeFromSet(n.marks));
    return fe.fromReplace(e, this.pos, this.pos + 1, new I(E.from(r), 0, n.isLeaf ? 0 : 1));
  }
  invert(e) {
    let n = e.nodeAt(this.pos);
    return !n || !this.mark.isInSet(n.marks) ? this : new mn(this.pos, this.mark);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new ur(n.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new ur(n.pos, e.markFromJSON(n.mark));
  }
}
Fe.jsonID("removeNodeMark", ur);
class we extends Fe {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, n, r, i = !1) {
    super(), this.from = e, this.to = n, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && Ul(e, this.from, this.to) ? fe.fail("Structure replace would overwrite content") : fe.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new rt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new we(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return n.deletedAcross && r.deletedAcross ? null : new we(n.pos, Math.max(n.pos, r.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof we) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let n = this.slice.size + e.slice.size == 0 ? I.empty : new I(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new we(this.from, this.to + (e.to - e.from), n, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let n = this.slice.size + e.slice.size == 0 ? I.empty : new I(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new we(e.from, this.to, n, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new we(n.from, n.to, I.fromJSON(e, n.slice), !!n.structure);
  }
}
Fe.jsonID("replace", we);
class xe extends Fe {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, n, r, i, s, o, l = !1) {
    super(), this.from = e, this.to = n, this.gapFrom = r, this.gapTo = i, this.slice = s, this.insert = o, this.structure = l;
  }
  apply(e) {
    if (this.structure && (Ul(e, this.from, this.gapFrom) || Ul(e, this.gapTo, this.to)))
      return fe.fail("Structure gap-replace would overwrite content");
    let n = e.slice(this.gapFrom, this.gapTo);
    if (n.openStart || n.openEnd)
      return fe.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, n.content);
    return r ? fe.fromReplace(e, this.from, this.to, r) : fe.fail("Content does not fit in gap");
  }
  getMap() {
    return new rt([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let n = this.gapTo - this.gapFrom;
    return new xe(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : e.map(this.gapFrom, -1), s = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return n.deletedAcross && r.deletedAcross || i < n.pos || s > r.pos ? null : new xe(n.pos, r.pos, i, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.from != "number" || typeof n.to != "number" || typeof n.gapFrom != "number" || typeof n.gapTo != "number" || typeof n.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new xe(n.from, n.to, n.gapFrom, n.gapTo, I.fromJSON(e, n.slice), n.insert, !!n.structure);
  }
}
Fe.jsonID("replaceAround", xe);
function Ul(t, e, n) {
  let r = t.resolve(e), i = n - e, s = r.depth;
  for (; i > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; )
    s--, i--;
  if (i > 0) {
    let o = r.node(s).maybeChild(r.indexAfter(s));
    for (; i > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, i--;
    }
  }
  return !1;
}
function qv(t, e, n, r) {
  let i = [], s = [], o, l;
  t.doc.nodesBetween(e, n, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, n), p = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(p) || (o && o.to == f && o.mark.eq(d[m]) ? o.to = h : i.push(o = new St(f, h, d[m])));
      l && l.to == f ? l.to = h : s.push(l = new pn(f, h, r));
    }
  }), i.forEach((a) => t.step(a)), s.forEach((a) => t.step(a));
}
function Kv(t, e, n, r) {
  let i = [], s = 0;
  t.doc.nodesBetween(e, n, (o, l) => {
    if (!o.isInline)
      return;
    s++;
    let a = null;
    if (r instanceof No) {
      let c = o.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(o.marks) && (a = [r]) : a = o.marks;
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, n);
      for (let u = 0; u < a.length; u++) {
        let d = a[u], f;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == s - 1 && d.eq(i[h].style) && (f = p);
        }
        f ? (f.to = c, f.step = s) : i.push({ style: d, from: Math.max(l, e), to: c, step: s });
      }
    }
  }), i.forEach((o) => t.step(new St(o.from, o.to, o.style)));
}
function Da(t, e, n, r = n.contentMatch, i = !0) {
  let s = t.doc.nodeAt(e), o = [], l = e + 1;
  for (let a = 0; a < s.childCount; a++) {
    let c = s.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      o.push(new we(l, u, I.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        n.allowsMarkType(c.marks[f].type) || t.step(new St(l, u, c.marks[f]));
      if (i && c.isText && n.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new I(E.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0)), o.push(new we(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(E.empty, !0);
    t.replace(l, l, new I(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--)
    t.step(o[a]);
}
function Jv(t, e, n) {
  return (e == 0 || t.canReplace(e, t.childCount)) && (n == t.childCount || t.canReplace(0, n));
}
function qr(t) {
  let n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
  for (let r = t.depth; ; --r) {
    let i = t.$from.node(r), s = t.$from.index(r), o = t.$to.indexAfter(r);
    if (r < t.depth && i.canReplace(s, o, n))
      return r;
    if (r == 0 || i.type.spec.isolating || !Jv(i, s, o))
      break;
  }
  return null;
}
function $v(t, e, n) {
  let { $from: r, $to: i, depth: s } = e, o = r.before(s + 1), l = i.after(s + 1), a = o, c = l, u = E.empty, d = 0;
  for (let p = s, m = !1; p > n; p--)
    m || r.index(p) > 0 ? (m = !0, u = E.from(r.node(p).copy(u)), d++) : a--;
  let f = E.empty, h = 0;
  for (let p = s, m = !1; p > n; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, f = E.from(i.node(p).copy(f)), h++) : c++;
  t.step(new xe(a, c, o, l, new I(u.append(f), d, h), u.size - d, !0));
}
function Ra(t, e, n = null, r = t) {
  let i = Gv(t, e), s = i && Yv(r, e);
  return s ? i.map(Kc).concat({ type: e, attrs: n }).concat(s.map(Kc)) : null;
}
function Kc(t) {
  return { type: t, attrs: null };
}
function Gv(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, s = n.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let o = s.length ? s[0] : e;
  return n.canReplaceWith(r, i, o) ? s : null;
}
function Yv(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, s = n.child(r), o = e.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(n.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function Xv(t, e, n) {
  let r = E.empty;
  for (let o = n.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = n[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = E.from(n[o].type.create(n[o].attrs, r));
  }
  let i = e.start, s = e.end;
  t.step(new xe(i, s, i, s, new I(r, 0, 0), n.length, !0));
}
function Qv(t, e, n, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = t.steps.length;
  t.doc.nodesBetween(e, n, (o, l) => {
    let a = typeof i == "function" ? i(o) : i;
    if (o.isTextblock && !o.hasMarkup(r, a) && Zv(t.doc, t.mapping.slice(s).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && Tf(t, o, l, s), Da(t, t.mapping.slice(s).map(l, 1), r, void 0, c === null);
      let u = t.mapping.slice(s), d = u.map(l, 1), f = u.map(l + o.nodeSize, 1);
      return t.step(new xe(d, f, d + 1, f - 1, new I(E.from(r.create(a, null, o.marks)), 0, 0), 1, !0)), c === !0 && Ef(t, o, l, s), !1;
    }
  });
}
function Ef(t, e, n, r) {
  e.forEach((i, s) => {
    if (i.isText) {
      let o, l = /\r?\n|\r/g;
      for (; o = l.exec(i.text); ) {
        let a = t.mapping.slice(r).map(n + 1 + s + o.index);
        t.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Tf(t, e, n, r) {
  e.forEach((i, s) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = t.mapping.slice(r).map(n + 1 + s);
      t.replaceWith(o, o + 1, e.type.schema.text(`
`));
    }
  });
}
function Zv(t, e, n) {
  let r = t.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, n);
}
function ey(t, e, n, r, i) {
  let s = t.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  n || (n = s.type);
  let o = n.create(r, null, i || s.marks);
  if (s.isLeaf)
    return t.replaceWith(e, e + s.nodeSize, o);
  if (!n.validContent(s.content))
    throw new RangeError("Invalid content for node type " + n.name);
  t.step(new xe(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new I(E.from(o), 0, 0), 1, !0));
}
function Yt(t, e, n = 1, r) {
  let i = t.resolve(e), s = i.depth - n, o = r && r[r.length - 1] || i.parent;
  if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = n - 2; c > s; c--, u--) {
    let d = i.node(c), f = i.index(c);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(s), a = r && r[0];
  return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type);
}
function ty(t, e, n = 1, r) {
  let i = t.doc.resolve(e), s = E.empty, o = E.empty;
  for (let l = i.depth, a = i.depth - n, c = n - 1; l > a; l--, c--) {
    s = E.from(i.node(l).copy(s));
    let u = r && r[c];
    o = E.from(u ? u.type.create(u.attrs, o) : i.node(l).copy(o));
  }
  t.step(new we(e, e, new I(s.append(o), n, n), !0));
}
function On(t, e) {
  let n = t.resolve(e), r = n.index();
  return Af(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function ny(t, e) {
  e.content.size || t.type.compatibleContent(e.type);
  let n = t.contentMatchAt(t.childCount), { linebreakReplacement: r } = t.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let s = e.child(i), o = s.type == r ? t.type.schema.nodes.text : s.type;
    if (n = n.matchType(o), !n || !t.type.allowsMarks(s.marks))
      return !1;
  }
  return n.validEnd;
}
function Af(t, e) {
  return !!(t && e && !t.isLeaf && ny(t, e));
}
function Io(t, e, n = -1) {
  let r = t.resolve(e);
  for (let i = r.depth; ; i--) {
    let s, o, l = r.index(i);
    if (i == r.depth ? (s = r.nodeBefore, o = r.nodeAfter) : n > 0 ? (s = r.node(i + 1), l++, o = r.node(i).maybeChild(l)) : (s = r.node(i).maybeChild(l - 1), o = r.node(i + 1)), s && !s.isTextblock && Af(s, o) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = n < 0 ? r.before(i) : r.after(i);
  }
}
function ry(t, e, n) {
  let r = null, { linebreakReplacement: i } = t.doc.type.schema, s = t.doc.resolve(e - n), o = s.node().type;
  if (i && o.inlineContent) {
    let u = o.whitespace == "pre", d = !!o.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = t.steps.length;
  if (r === !1) {
    let u = t.doc.resolve(e + n);
    Tf(t, u.node(), u.before(), l);
  }
  o.inlineContent && Da(t, e + n - 1, o, s.node().contentMatchAt(s.index()), r == null);
  let a = t.mapping.slice(l), c = a.map(e - n);
  if (t.step(new we(c, a.map(e + n, -1), I.empty, !0)), r === !0) {
    let u = t.doc.resolve(c);
    Ef(t, u.node(), u.before(), t.steps.length);
  }
  return t;
}
function iy(t, e, n) {
  let r = t.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), n))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.index(i);
      if (r.node(i).canReplaceWith(s, s, n))
        return r.before(i + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.indexAfter(i);
      if (r.node(i).canReplaceWith(s, s, n))
        return r.after(i + 1);
      if (s < r.node(i).childCount)
        return null;
    }
  return null;
}
function _f(t, e, n) {
  let r = t.resolve(e);
  if (!n.content.size)
    return e;
  let i = n.content;
  for (let s = 0; s < n.openStart; s++)
    i = i.firstChild.content;
  for (let s = 1; s <= (n.openStart == 0 && n.size ? 2 : 1); s++)
    for (let o = r.depth; o >= 0; o--) {
      let l = o == r.depth ? 0 : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2 ? -1 : 1, a = r.index(o) + (l > 0 ? 1 : 0), c = r.node(o), u = !1;
      if (s == 1)
        u = c.canReplace(a, a, i);
      else {
        let d = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        u = d && c.canReplaceWith(a, a, d[0]);
      }
      if (u)
        return l == 0 ? r.pos : l < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function Do(t, e, n = e, r = I.empty) {
  if (e == n && !r.size)
    return null;
  let i = t.resolve(e), s = t.resolve(n);
  return Of(i, s, r) ? new we(e, n, r) : new sy(i, s, r).fit();
}
function Of(t, e, n) {
  return !n.openStart && !n.openEnd && t.start() == e.start() && t.parent.canReplace(t.index(), e.index(), n.content);
}
class sy {
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.unplaced = r, this.frontier = [], this.placed = E.empty;
    for (let i = 0; i <= e.depth; i++) {
      let s = e.node(i);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = E.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), n = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let s = this.placed, o = r.depth, l = i.depth;
    for (; o && l && s.childCount == 1; )
      s = s.firstChild.content, o--, l--;
    let a = new I(s, o, l);
    return e > -1 ? new xe(r.pos, e, this.$to.pos, this.$to.end(), a, n) : a.size || r.pos != this.$to.pos ? new we(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let n = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let s = n.firstChild;
      if (n.childCount > 1 && (i = 0), s.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      n = s.content;
    }
    for (let n = 1; n <= 2; n++)
      for (let r = n == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, s = null;
        r ? (s = sl(this.unplaced.content, r - 1).firstChild, i = s.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (n == 1 && (o ? c.matchType(o.type) || (d = c.fillBefore(E.from(o), !1)) : s && a.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, inject: d };
          if (n == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = sl(e, n);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new I(e, n + 1, Math.max(r, i.size + n >= e.size - r ? n + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: n, openEnd: r } = this.unplaced, i = sl(e, n);
    if (i.childCount <= 1 && n > 0) {
      let s = e.size - n <= n + i.size;
      this.unplaced = new I(ni(e, n - 1, 1), n - 1, s ? n - 1 : r);
    } else
      this.unplaced = new I(ni(e, n, 1), n, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: n, parent: r, inject: i, wrap: s }) {
    for (; this.depth > n; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let o = this.unplaced, l = r ? r.content : o.content, a = o.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[n];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), g = d.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (d = g, u.push(Nf(m.mark(f.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = ri(this.placed, n, E.from(u)), this.frontier[n].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = l; m < h; m++) {
      let v = g.lastChild;
      this.frontier.push({ type: v.type, match: v.contentMatchAt(v.childCount) }), g = v.content;
    }
    this.unplaced = p ? e == 0 ? I.empty : new I(ni(o.content, e - 1, 1), e - 1, h < 0 ? o.openEnd : e - 1) : new I(ni(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], n;
    if (!e.type.isTextblock || !ol(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (n = this.findCloseLevel(this.$to)) && n.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let n = Math.min(this.depth, e.depth); n >= 0; n--) {
      let { match: r, type: i } = this.frontier[n], s = n < e.depth && e.end(n + 1) == e.pos + (e.depth - (n + 1)), o = ol(e, n, i, r, s);
      if (o) {
        for (let l = n - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = ol(e, l, c, a, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: n, fit: o, move: s ? e.doc.resolve(e.after(n + 1)) : e };
      }
    }
  }
  close(e) {
    let n = this.findCloseLevel(e);
    if (!n)
      return null;
    for (; this.depth > n.depth; )
      this.closeFrontierNode();
    n.fit.childCount && (this.placed = ri(this.placed, n.depth, n.fit)), e = n.move;
    for (let r = n.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), s = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, n = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = ri(this.placed, this.depth, E.from(e.create(n, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let n = this.frontier.pop().match.fillBefore(E.empty, !0);
    n.childCount && (this.placed = ri(this.placed, this.frontier.length, n));
  }
}
function ni(t, e, n) {
  return e == 0 ? t.cutByIndex(n, t.childCount) : t.replaceChild(0, t.firstChild.copy(ni(t.firstChild.content, e - 1, n)));
}
function ri(t, e, n) {
  return e == 0 ? t.append(n) : t.replaceChild(t.childCount - 1, t.lastChild.copy(ri(t.lastChild.content, e - 1, n)));
}
function sl(t, e) {
  for (let n = 0; n < e; n++)
    t = t.firstChild.content;
  return t;
}
function Nf(t, e, n) {
  if (e <= 0)
    return t;
  let r = t.content;
  return e > 1 && (r = r.replaceChild(0, Nf(r.firstChild, e - 1, r.childCount == 1 ? n - 1 : 0))), e > 0 && (r = t.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(t.type.contentMatch.matchFragment(r).fillBefore(E.empty, !0)))), t.copy(r);
}
function ol(t, e, n, r, i) {
  let s = t.node(e), o = i ? t.indexAfter(e) : t.index(e);
  if (o == s.childCount && !n.compatibleContent(s.type))
    return null;
  let l = r.fillBefore(s.content, !0, o);
  return l && !oy(n, s.content, o) ? l : null;
}
function oy(t, e, n) {
  for (let r = n; r < e.childCount; r++)
    if (!t.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function ly(t) {
  return t.spec.defining || t.spec.definingForContent;
}
function ay(t, e, n, r) {
  if (!r.size)
    return t.deleteRange(e, n);
  let i = t.doc.resolve(e), s = t.doc.resolve(n);
  if (Of(i, s, r))
    return t.step(new we(e, n, r));
  let o = Df(i, t.doc.resolve(n));
  o[o.length - 1] == 0 && o.pop();
  let l = -(i.depth + 1);
  o.unshift(l);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let p = i.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    o.indexOf(f) > -1 ? l = f : i.before(f) == h && o.splice(1, 0, -f);
  }
  let a = o.indexOf(l), c = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let p = f.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = c[f], p = ly(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let m = 0; m < o.length; m++) {
        let g = o[(m + a) % o.length], v = !0;
        g < 0 && (v = !1, g = -g);
        let y = i.node(g - 1), b = i.index(g - 1);
        if (y.canReplaceWith(b, b, p.type, p.marks))
          return t.replace(i.before(g), v ? s.after(g) : n, new I(If(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = t.steps.length;
  for (let f = o.length - 1; f >= 0 && (t.replace(e, n, r), !(t.steps.length > d)); f--) {
    let h = o[f];
    h < 0 || (e = i.before(h), n = s.after(h));
  }
}
function If(t, e, n, r, i) {
  if (e < n) {
    let s = t.firstChild;
    t = t.replaceChild(0, s.copy(If(s.content, e + 1, n, r, s)));
  }
  if (e > r) {
    let s = i.contentMatchAt(0), o = s.fillBefore(t).append(t);
    t = o.append(s.matchFragment(o).fillBefore(E.empty, !0));
  }
  return t;
}
function cy(t, e, n, r) {
  if (!r.isInline && e == n && t.doc.resolve(e).parent.content.size) {
    let i = iy(t.doc, e, r.type);
    i != null && (e = n = i);
  }
  t.replaceRange(e, n, new I(E.from(r), 0, 0));
}
function uy(t, e, n) {
  let r = t.doc.resolve(e), i = t.doc.resolve(n), s = Df(r, i);
  for (let o = 0; o < s.length; o++) {
    let l = s[o], a = o == s.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return t.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return t.delete(r.before(l), i.after(l));
  }
  for (let o = 1; o <= r.depth && o <= i.depth; o++)
    if (e - r.start(o) == r.depth - o && n > r.end(o) && i.end(o) - n != i.depth - o && r.start(o - 1) == i.start(o - 1) && r.node(o - 1).canReplace(r.index(o - 1), i.index(o - 1)))
      return t.delete(r.before(o), n);
  t.delete(e, n);
}
function Df(t, e) {
  let n = [], r = Math.min(t.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let s = t.start(i);
    if (s < t.pos - (t.depth - i) || e.end(i) > e.pos + (e.depth - i) || t.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (s == e.start(i) || i == t.depth && i == e.depth && t.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && n.push(i);
  }
  return n;
}
class Er extends Fe {
  /**
  Construct an attribute step.
  */
  constructor(e, n, r) {
    super(), this.pos = e, this.attr = n, this.value = r;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return fe.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in n.attrs)
      r[s] = n.attrs[s];
    r[this.attr] = this.value;
    let i = n.type.create(r, null, n.marks);
    return fe.fromReplace(e, this.pos, this.pos + 1, new I(E.from(i), 0, n.isLeaf ? 0 : 1));
  }
  getMap() {
    return rt.empty;
  }
  invert(e) {
    return new Er(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let n = e.mapResult(this.pos, 1);
    return n.deletedAfter ? null : new Er(n.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.pos != "number" || typeof n.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Er(n.pos, n.attr, n.value);
  }
}
Fe.jsonID("attr", Er);
class Ii extends Fe {
  /**
  Construct an attribute step.
  */
  constructor(e, n) {
    super(), this.attr = e, this.value = n;
  }
  apply(e) {
    let n = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      n[i] = e.attrs[i];
    n[this.attr] = this.value;
    let r = e.type.create(n, e.content, e.marks);
    return fe.ok(r);
  }
  getMap() {
    return rt.empty;
  }
  invert(e) {
    return new Ii(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, n) {
    if (typeof n.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Ii(n.attr, n.value);
  }
}
Fe.jsonID("docAttr", Ii);
let zr = class extends Error {
};
zr = function t(e) {
  let n = Error.call(this, e);
  return n.__proto__ = t.prototype, n;
};
zr.prototype = Object.create(Error.prototype);
zr.prototype.constructor = zr;
zr.prototype.name = "TransformError";
class Rf {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Ni();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let n = this.maybeStep(e);
    if (n.failed)
      throw new zr(n.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let n = e.apply(this.doc);
    return n.failed || this.addStep(e, n.doc), n;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, n) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = n;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, n = e, r = I.empty) {
    let i = Do(this.doc, e, n, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, n, r) {
    return this.replace(e, n, new I(E.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, n) {
    return this.replace(e, n, I.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, n) {
    return this.replaceWith(e, e, n);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, n, r) {
    return ay(this, e, n, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, n, r) {
    return cy(this, e, n, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, n) {
    return uy(this, e, n), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, n) {
    return $v(this, e, n), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, n = 1) {
    return ry(this, e, n), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, n) {
    return Xv(this, e, n), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, n = e, r, i = null) {
    return Qv(this, e, n, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, n, r = null, i) {
    return ey(this, e, n, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, n, r) {
    return this.step(new Er(e, n, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, n) {
    return this.step(new Ii(e, n)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, n) {
    return this.step(new mn(e, n)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, n) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (n instanceof Q)
      n.isInSet(r.marks) && this.step(new ur(e, n));
    else {
      let i = r.marks, s, o = [];
      for (; s = n.isInSet(i); )
        o.push(new ur(e, s)), i = s.removeFromSet(i);
      for (let l = o.length - 1; l >= 0; l--)
        this.step(o[l]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(e, n = 1, r) {
    return ty(this, e, n, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, n, r) {
    return qv(this, e, n, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, n, r) {
    return Kv(this, e, n, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, n, r) {
    return Da(this, e, n, r), this;
  }
}
const ll = /* @__PURE__ */ Object.create(null);
class K {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, n, r) {
    this.$anchor = e, this.$head = n, this.ranges = r || [new dy(e.min(n), e.max(n))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let n = 0; n < e.length; n++)
      if (e[n].$from.pos != e[n].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, n = I.empty) {
    let r = n.content.lastChild, i = null;
    for (let l = 0; l < n.openEnd; l++)
      i = r, r = r.lastChild;
    let s = e.steps.length, o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l], u = e.mapping.slice(s);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? I.empty : n), l == 0 && Gc(e, s, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, n) {
    let r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: l } = i[s], a = e.mapping.slice(r), c = a.map(o.pos), u = a.map(l.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, n), Gc(e, r, n.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, n, r = !1) {
    let i = e.parent.inlineContent ? new j(e) : br(e.node(0), e.parent, e.pos, e.index(), n, r);
    if (i)
      return i;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o = n < 0 ? br(e.node(0), e.node(s), e.before(s + 1), e.index(s), n, r) : br(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, n, r);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, n = 1) {
    return this.findFrom(e, n) || this.findFrom(e, -n) || new st(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return br(e, e, 0, 0, 1) || new st(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return br(e, e, e.content.size, e.childCount, -1) || new st(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, n) {
    if (!n || !n.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = ll[n.type];
    if (!r)
      throw new RangeError(`No selection type ${n.type} defined`);
    return r.fromJSON(e, n);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, n) {
    if (e in ll)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return ll[e] = n, n.prototype.jsonID = e, n;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return j.between(this.$anchor, this.$head).getBookmark();
  }
}
K.prototype.visible = !0;
class dy {
  /**
  Create a range.
  */
  constructor(e, n) {
    this.$from = e, this.$to = n;
  }
}
let Jc = !1;
function $c(t) {
  !Jc && !t.parent.inlineContent && (Jc = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + t.parent.type.name + ")"));
}
class j extends K {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, n = e) {
    $c(e), $c(n), super(e, n);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, n) {
    let r = e.resolve(n.map(this.head));
    if (!r.parent.inlineContent)
      return K.near(r);
    let i = e.resolve(n.map(this.anchor));
    return new j(i.parent.inlineContent ? i : r, r);
  }
  replace(e, n = I.empty) {
    if (super.replace(e, n), n == I.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof j && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Ro(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number" || typeof n.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new j(e.resolve(n.anchor), e.resolve(n.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, n, r = n) {
    let i = e.resolve(n);
    return new this(i, r == n ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, n, r) {
    let i = e.pos - n.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
      let s = K.findFrom(n, r, !0) || K.findFrom(n, -r, !0);
      if (s)
        n = s.$head;
      else
        return K.near(n, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = n : (e = (K.findFrom(e, -r, !0) || K.findFrom(e, r, !0)).$anchor, e.pos < n.pos != i < 0 && (e = n))), new j(e, n);
  }
}
K.jsonID("text", j);
class Ro {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new Ro(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return j.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class B extends K {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let n = e.nodeAfter, r = e.node(0).resolve(e.pos + n.nodeSize);
    super(e, r), this.node = n;
  }
  map(e, n) {
    let { deleted: r, pos: i } = n.mapResult(this.anchor), s = e.resolve(i);
    return r ? K.near(s) : new B(s);
  }
  content() {
    return new I(E.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof B && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new La(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new B(e.resolve(n.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, n) {
    return new B(e.resolve(n));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
B.prototype.visible = !1;
K.jsonID("node", B);
class La {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: n, pos: r } = e.mapResult(this.anchor);
    return n ? new Ro(r, r) : new La(r);
  }
  resolve(e) {
    let n = e.resolve(this.anchor), r = n.nodeAfter;
    return r && B.isSelectable(r) ? new B(n) : K.near(n);
  }
}
class st extends K {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, n = I.empty) {
    if (n == I.empty) {
      e.delete(0, e.doc.content.size);
      let r = K.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, n);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new st(e);
  }
  map(e) {
    return new st(e);
  }
  eq(e) {
    return e instanceof st;
  }
  getBookmark() {
    return fy;
  }
}
K.jsonID("all", st);
const fy = {
  map() {
    return this;
  },
  resolve(t) {
    return new st(t);
  }
};
function br(t, e, n, r, i, s = !1) {
  if (e.inlineContent)
    return j.create(t, n);
  for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!s && B.isSelectable(l))
        return B.create(t, n - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = br(t, l, n + i, i < 0 ? l.childCount : 0, i, s);
      if (a)
        return a;
    }
    n += l.nodeSize * i;
  }
  return null;
}
function Gc(t, e, n) {
  let r = t.steps.length - 1;
  if (r < e)
    return;
  let i = t.steps[r];
  if (!(i instanceof we || i instanceof xe))
    return;
  let s = t.mapping.maps[r], o;
  s.forEach((l, a, c, u) => {
    o == null && (o = u);
  }), t.setSelection(K.near(t.doc.resolve(o), n));
}
const Yc = 1, ls = 2, Xc = 4;
class hy extends Rf {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Yc) & ~ls, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & Yc) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= ls, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return Q.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & ls) > 0;
  }
  /**
  @internal
  */
  addStep(e, n) {
    super.addStep(e, n), this.updated = this.updated & ~ls, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, n = !0) {
    let r = this.selection;
    return n && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || Q.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, n, r) {
    let i = this.doc.type.schema;
    if (n == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = n), !e)
        return this.deleteRange(n, r);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(n);
        s = r == n ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(n, r, i.text(e, s)), !this.selection.empty && this.selection.to == n + e.length && this.setSelection(K.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, n) {
    return this.meta[typeof e == "string" ? e : e.key] = n, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= Xc, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & Xc) > 0;
  }
}
function Qc(t, e) {
  return !e || !t ? t : t.bind(e);
}
class ii {
  constructor(e, n, r) {
    this.name = e, this.init = Qc(n.init, r), this.apply = Qc(n.apply, r);
  }
}
const py = [
  new ii("doc", {
    init(t) {
      return t.doc || t.schema.topNodeType.createAndFill();
    },
    apply(t) {
      return t.doc;
    }
  }),
  new ii("selection", {
    init(t, e) {
      return t.selection || K.atStart(e.doc);
    },
    apply(t) {
      return t.selection;
    }
  }),
  new ii("storedMarks", {
    init(t) {
      return t.storedMarks || null;
    },
    apply(t, e, n, r) {
      return r.selection.$cursor ? t.storedMarks : null;
    }
  }),
  new ii("scrollToSelection", {
    init() {
      return 0;
    },
    apply(t, e) {
      return t.scrolledIntoView ? e + 1 : e;
    }
  })
];
class al {
  constructor(e, n) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = py.slice(), n && n.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new ii(r.key, r.spec.state, r));
    });
  }
}
class Cr {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, n = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != n) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let n = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = i ? i[o].n : 0, c = i ? i[o].state : this, u = a < n.length && l.spec.appendTransaction.call(l, a ? n.slice(a) : n, c, r);
          if (u && r.filterTransaction(u, o)) {
            if (u.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                i.push(d < o ? { state: r, n: n.length } : { state: this, n: 0 });
            }
            n.push(u), r = r.applyInner(u), s = !0;
          }
          i && (i[o] = { state: r, n: n.length });
        }
      }
      if (!s)
        return { state: r, transactions: n };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let n = new Cr(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      n[s.name] = s.apply(e, this[s.name], this, n);
    }
    return n;
  }
  /**
  Accessor that constructs and returns a new [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new hy(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let n = new al(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new Cr(n);
    for (let i = 0; i < n.fields.length; i++)
      r[n.fields[i].name] = n.fields[i].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let n = new al(this.schema, e.plugins), r = n.fields, i = new Cr(n);
    for (let s = 0; s < r.length; s++) {
      let o = r[s].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : r[s].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let n = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (n.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], s = i.spec.state;
        s && s.toJSON && (n[r] = s.toJSON.call(i, this[i.key]));
      }
    return n;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, n, r) {
    if (!n)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new al(e.schema, e.plugins), s = new Cr(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = Ct.fromJSON(e.schema, n.doc);
      else if (o.name == "selection")
        s.selection = K.fromJSON(s.doc, n.selection);
      else if (o.name == "storedMarks")
        n.storedMarks && (s.storedMarks = n.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(n, l)) {
              s[o.name] = c.fromJSON.call(a, e, n[l], s);
              return;
            }
          }
        s[o.name] = o.init(e, s);
      }
    }), s;
  }
}
function Lf(t, e, n) {
  for (let r in t) {
    let i = t[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = Lf(i, e, {})), n[r] = i;
  }
  return n;
}
class ce {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Lf(e.props, this, this.props), this.key = e.key ? e.key.key : Pf("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const cl = /* @__PURE__ */ Object.create(null);
function Pf(t) {
  return t in cl ? t + "$" + ++cl[t] : (cl[t] = 0, t + "$");
}
class Ee {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = Pf(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Pa = (t, e) => t.selection.empty ? !1 : (e && e(t.tr.deleteSelection().scrollIntoView()), !0);
function Bf(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("backward", t) : n.parentOffset > 0) ? null : n;
}
const zf = (t, e, n) => {
  let r = Bf(t, n);
  if (!r)
    return !1;
  let i = Ba(r);
  if (!i) {
    let o = r.blockRange(), l = o && qr(o);
    return l == null ? !1 : (e && e(t.tr.lift(o, l).scrollIntoView()), !0);
  }
  let s = i.nodeBefore;
  if (Jf(t, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Fr(s, "end") || B.isSelectable(s)))
    for (let o = r.depth; ; o--) {
      let l = Do(t.doc, r.before(o), r.after(o), I.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = t.tr.step(l);
          a.setSelection(Fr(s, "end") ? K.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : B.create(a.doc, i.pos - s.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || r.node(o - 1).childCount > 1)
        break;
    }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, my = (t, e, n) => {
  let r = Bf(t, n);
  if (!r)
    return !1;
  let i = Ba(r);
  return i ? Ff(t, i, e) : !1;
}, gy = (t, e, n) => {
  let r = Hf(t, n);
  if (!r)
    return !1;
  let i = za(r);
  return i ? Ff(t, i, e) : !1;
};
function Ff(t, e, n) {
  let r = e.nodeBefore, i = r, s = e.pos - 1;
  for (; !i.isTextblock; s--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let o = e.nodeAfter, l = o, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = Do(t.doc, s, a, I.empty);
  if (!c || c.from != s || c instanceof we && c.slice.size >= a - s)
    return !1;
  if (n) {
    let u = t.tr.step(c);
    u.setSelection(j.create(u.doc, s)), n(u.scrollIntoView());
  }
  return !0;
}
function Fr(t, e, n = !1) {
  for (let r = t; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (n && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Vf = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)
      return !1;
    s = Ba(r);
  }
  let o = s && s.nodeBefore;
  return !o || !B.isSelectable(o) ? !1 : (e && e(t.tr.setSelection(B.create(t.doc, s.pos - o.nodeSize)).scrollIntoView()), !0);
};
function Ba(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      if (t.index(e) > 0)
        return t.doc.resolve(t.before(e + 1));
      if (t.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Hf(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("forward", t) : n.parentOffset < n.parent.content.size) ? null : n;
}
const jf = (t, e, n) => {
  let r = Hf(t, n);
  if (!r)
    return !1;
  let i = za(r);
  if (!i)
    return !1;
  let s = i.nodeAfter;
  if (Jf(t, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Fr(s, "start") || B.isSelectable(s))) {
    let o = Do(t.doc, r.before(), r.after(), I.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let l = t.tr.step(o);
        l.setSelection(Fr(s, "start") ? K.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : B.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, Wf = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)
      return !1;
    s = za(r);
  }
  let o = s && s.nodeAfter;
  return !o || !B.isSelectable(o) ? !1 : (e && e(t.tr.setSelection(B.create(t.doc, s.pos)).scrollIntoView()), !0);
};
function za(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      let n = t.node(e);
      if (t.index(e) + 1 < n.childCount)
        return t.doc.resolve(t.after(e + 1));
      if (n.type.spec.isolating)
        break;
    }
  return null;
}
const vy = (t, e) => {
  let n = t.selection, r = n instanceof B, i;
  if (r) {
    if (n.node.isTextblock || !On(t.doc, n.from))
      return !1;
    i = n.from;
  } else if (i = Io(t.doc, n.from, -1), i == null)
    return !1;
  if (e) {
    let s = t.tr.join(i);
    r && s.setSelection(B.create(s.doc, i - t.doc.resolve(i).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, yy = (t, e) => {
  let n = t.selection, r;
  if (n instanceof B) {
    if (n.node.isTextblock || !On(t.doc, n.to))
      return !1;
    r = n.to;
  } else if (r = Io(t.doc, n.to, 1), r == null)
    return !1;
  return e && e(t.tr.join(r).scrollIntoView()), !0;
}, by = (t, e) => {
  let { $from: n, $to: r } = t.selection, i = n.blockRange(r), s = i && qr(i);
  return s == null ? !1 : (e && e(t.tr.lift(i, s).scrollIntoView()), !0);
}, Uf = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (e && e(t.tr.insertText(`
`).scrollIntoView()), !0);
};
function Fa(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    let { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
const ky = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  if (!n.parent.type.spec.code || !n.sameParent(r))
    return !1;
  let i = n.node(-1), s = n.indexAfter(-1), o = Fa(i.contentMatchAt(s));
  if (!o || !i.canReplaceWith(s, s, o))
    return !1;
  if (e) {
    let l = n.after(), a = t.tr.replaceWith(l, l, o.createAndFill());
    a.setSelection(K.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, qf = (t, e) => {
  let n = t.selection, { $from: r, $to: i } = n;
  if (n instanceof st || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let s = Fa(i.parent.contentMatchAt(i.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let o = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = t.tr.insert(o, s.createAndFill());
    l.setSelection(j.create(l.doc, o + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Kf = (t, e) => {
  let { $cursor: n } = t.selection;
  if (!n || n.parent.content.size)
    return !1;
  if (n.depth > 1 && n.after() != n.end(-1)) {
    let s = n.before();
    if (Yt(t.doc, s))
      return e && e(t.tr.split(s).scrollIntoView()), !0;
  }
  let r = n.blockRange(), i = r && qr(r);
  return i == null ? !1 : (e && e(t.tr.lift(r, i).scrollIntoView()), !0);
};
function wy(t) {
  return (e, n) => {
    let { $from: r, $to: i } = e.selection;
    if (e.selection instanceof B && e.selection.node.isBlock)
      return !r.parentOffset || !Yt(e.doc, r.pos) ? !1 : (n && n(e.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth)
      return !1;
    let s = [], o, l, a = !1, c = !1;
    for (let h = r.depth; ; h--)
      if (r.node(h).isBlock) {
        a = r.end(h) == r.pos + (r.depth - h), c = r.start(h) == r.pos - (r.depth - h), l = Fa(r.node(h - 1).contentMatchAt(r.indexAfter(h - 1))), s.unshift(a && l ? { type: l } : null), o = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let u = e.tr;
    (e.selection instanceof j || e.selection instanceof st) && u.deleteSelection();
    let d = u.mapping.map(r.pos), f = Yt(u.doc, d, s.length, s);
    if (f || (s[0] = l ? { type: l } : null, f = Yt(u.doc, d, s.length, s)), !f)
      return !1;
    if (u.split(d, s.length, s), !a && c && r.node(o).type != l) {
      let h = u.mapping.map(r.before(o)), p = u.doc.resolve(h);
      l && r.node(o - 1).canReplaceWith(p.index(), p.index() + 1, l) && u.setNodeMarkup(u.mapping.map(r.before(o)), l);
    }
    return n && n(u.scrollIntoView()), !0;
  };
}
const xy = wy(), Sy = (t, e) => {
  let { $from: n, to: r } = t.selection, i, s = n.sharedDepth(r);
  return s == 0 ? !1 : (i = n.before(s), e && e(t.tr.setSelection(B.create(t.doc, i))), !0);
};
function Cy(t, e, n) {
  let r = e.nodeBefore, i = e.nodeAfter, s = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || On(t.doc, e.pos)) ? !1 : (n && n(t.tr.join(e.pos).scrollIntoView()), !0);
}
function Jf(t, e, n, r) {
  let i = e.nodeBefore, s = e.nodeAfter, o, l, a = i.type.spec.isolating || s.type.spec.isolating;
  if (!a && Cy(t, e, n))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (o = (l = i.contentMatchAt(i.childCount)).findWrapping(s.type)) && l.matchType(o[0] || s.type).validEnd) {
    if (n) {
      let h = e.pos + s.nodeSize, p = E.empty;
      for (let v = o.length - 1; v >= 0; v--)
        p = E.from(o[v].create(null, p));
      p = E.from(i.copy(p));
      let m = t.tr.step(new xe(e.pos - 1, h, e.pos, h, new I(p, 1, 0), o.length, !0)), g = m.doc.resolve(h + 2 * o.length);
      g.nodeAfter && g.nodeAfter.type == i.type && On(m.doc, g.pos) && m.join(g.pos), n(m.scrollIntoView());
    }
    return !0;
  }
  let u = s.type.spec.isolating || r > 0 && a ? null : K.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && qr(d);
  if (f != null && f >= e.depth)
    return n && n(t.tr.lift(d, f).scrollIntoView()), !0;
  if (c && Fr(s, "start", !0) && Fr(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let m = s, g = 1;
    for (; !m.isTextblock; m = m.firstChild)
      g++;
    if (h.canReplace(h.childCount, h.childCount, m.content)) {
      if (n) {
        let v = E.empty;
        for (let b = p.length - 1; b >= 0; b--)
          v = E.from(p[b].copy(v));
        let y = t.tr.step(new xe(e.pos - p.length, e.pos + s.nodeSize, e.pos + g, e.pos + s.nodeSize - g, new I(v, p.length, 0), 0, !0));
        n(y.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function $f(t) {
  return function(e, n) {
    let r = e.selection, i = t < 0 ? r.$from : r.$to, s = i.depth;
    for (; i.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return i.node(s).isTextblock ? (n && n(e.tr.setSelection(j.create(e.doc, t < 0 ? i.start(s) : i.end(s)))), !0) : !1;
  };
}
const My = $f(-1), Ey = $f(1);
function Ty(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: s } = n.selection, o = i.blockRange(s), l = o && Ra(o, t, e);
    return l ? (r && r(n.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function Zc(t, e = null) {
  return function(n, r) {
    let i = !1;
    for (let s = 0; s < n.selection.ranges.length && !i; s++) {
      let { $from: { pos: o }, $to: { pos: l } } = n.selection.ranges[s];
      n.doc.nodesBetween(o, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(t, e)))
          if (a.type == t)
            i = !0;
          else {
            let u = n.doc.resolve(c), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, t);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let s = n.tr;
      for (let o = 0; o < n.selection.ranges.length; o++) {
        let { $from: { pos: l }, $to: { pos: a } } = n.selection.ranges[o];
        s.setBlockType(l, a, t, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
function Va(...t) {
  return function(e, n, r) {
    for (let i = 0; i < t.length; i++)
      if (t[i](e, n, r))
        return !0;
    return !1;
  };
}
Va(Pa, zf, Vf);
Va(Pa, jf, Wf);
Va(Uf, qf, Kf, xy);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Ay(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: s } = n.selection, o = i.blockRange(s);
    if (!o)
      return !1;
    let l = r ? n.tr : null;
    return _y(l, o, t, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function _y(t, e, n, r = null) {
  let i = !1, s = e, o = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(n) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = o.resolve(e.start - 2);
    s = new Ls(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new Ls(e.$from, o.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Ra(s, n, r, e);
  return l ? (t && Oy(t, e, l, i, n), !0) : !1;
}
function Oy(t, e, n, r, i) {
  let s = E.empty;
  for (let u = n.length - 1; u >= 0; u--)
    s = E.from(n[u].type.create(n[u].attrs, s));
  t.step(new xe(e.start - (r ? 2 : 0), e.end, e.start, e.end, new I(s, 0, 0), n.length, !0));
  let o = 0;
  for (let u = 0; u < n.length; u++)
    n[u].type == i && (o = u + 1);
  let l = n.length - o, a = e.start + n.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Yt(t.doc, a, l) && (t.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return t;
}
function Ny(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == t);
    return s ? n ? r.node(s.depth - 1).type == t ? Iy(e, n, t, s) : Dy(e, n, s) : !0 : !1;
  };
}
function Iy(t, e, n, r) {
  let i = t.tr, s = r.end, o = r.$to.end(r.depth);
  s < o && (i.step(new xe(s - 1, o, s, o, new I(E.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Ls(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
  const l = qr(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(s, -1) - 1);
  return On(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function Dy(t, e, n) {
  let r = t.tr, i = n.parent;
  for (let h = n.end, p = n.endIndex - 1, m = n.startIndex; p > m; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let s = r.doc.resolve(n.start), o = s.nodeAfter;
  if (r.mapping.map(n.end) != n.start + s.nodeAfter.nodeSize)
    return !1;
  let l = n.startIndex == 0, a = n.endIndex == i.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, o.content.append(a ? E.empty : E.from(i))))
    return !1;
  let d = s.pos, f = d + o.nodeSize;
  return r.step(new xe(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new I((l ? E.empty : E.from(i.copy(E.empty))).append(a ? E.empty : E.from(i.copy(E.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Ry(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == t);
    if (!s)
      return !1;
    let o = s.startIndex;
    if (o == 0)
      return !1;
    let l = s.parent, a = l.child(o - 1);
    if (a.type != t)
      return !1;
    if (n) {
      let c = a.lastChild && a.lastChild.type == l.type, u = E.from(c ? t.create() : null), d = new I(E.from(t.create(null, E.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = s.start, h = s.end;
      n(e.tr.step(new xe(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
const Ne = function(t) {
  for (var e = 0; ; e++)
    if (t = t.previousSibling, !t)
      return e;
}, Vr = function(t) {
  let e = t.assignedSlot || t.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let ql = null;
const qt = function(t, e, n) {
  let r = ql || (ql = document.createRange());
  return r.setEnd(t, n ?? t.nodeValue.length), r.setStart(t, e || 0), r;
}, Ly = function() {
  ql = null;
}, dr = function(t, e, n, r) {
  return n && (eu(t, e, n, r, -1) || eu(t, e, n, r, 1));
}, Py = /^(img|br|input|textarea|hr)$/i;
function eu(t, e, n, r, i) {
  for (var s; ; ) {
    if (t == n && e == r)
      return !0;
    if (e == (i < 0 ? 0 : ft(t))) {
      let o = t.parentNode;
      if (!o || o.nodeType != 1 || Qi(t) || Py.test(t.nodeName) || t.contentEditable == "false")
        return !1;
      e = Ne(t) + (i < 0 ? 0 : 1), t = o;
    } else if (t.nodeType == 1) {
      let o = t.childNodes[e + (i < 0 ? -1 : 0)];
      if (o.nodeType == 1 && o.contentEditable == "false")
        if (!((s = o.pmViewDesc) === null || s === void 0) && s.ignoreForSelection)
          e += i;
        else
          return !1;
      else
        t = o, e = i < 0 ? ft(t) : 0;
    } else
      return !1;
  }
}
function ft(t) {
  return t.nodeType == 3 ? t.nodeValue.length : t.childNodes.length;
}
function By(t, e) {
  for (; ; ) {
    if (t.nodeType == 3 && e)
      return t;
    if (t.nodeType == 1 && e > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[e - 1], e = ft(t);
    } else if (t.parentNode && !Qi(t))
      e = Ne(t), t = t.parentNode;
    else
      return null;
  }
}
function zy(t, e) {
  for (; ; ) {
    if (t.nodeType == 3 && e < t.nodeValue.length)
      return t;
    if (t.nodeType == 1 && e < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[e], e = 0;
    } else if (t.parentNode && !Qi(t))
      e = Ne(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
function Fy(t, e, n) {
  for (let r = e == 0, i = e == ft(t); r || i; ) {
    if (t == n)
      return !0;
    let s = Ne(t);
    if (t = t.parentNode, !t)
      return !1;
    r = r && s == 0, i = i && s == ft(t);
  }
}
function Qi(t) {
  let e;
  for (let n = t; n && !(e = n.pmViewDesc); n = n.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == t || e.contentDOM == t);
}
const Lo = function(t) {
  return t.focusNode && dr(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset);
};
function Hn(t, e) {
  let n = document.createEvent("Event");
  return n.initEvent("keydown", !0, !0), n.keyCode = t, n.key = n.code = e, n;
}
function Vy(t) {
  let e = t.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Hy(t, e, n) {
  if (t.caretPositionFromPoint)
    try {
      let r = t.caretPositionFromPoint(e, n);
      if (r)
        return { node: r.offsetNode, offset: Math.min(ft(r.offsetNode), r.offset) };
    } catch {
    }
  if (t.caretRangeFromPoint) {
    let r = t.caretRangeFromPoint(e, n);
    if (r)
      return { node: r.startContainer, offset: Math.min(ft(r.startContainer), r.startOffset) };
  }
}
const Ft = typeof navigator < "u" ? navigator : null, tu = typeof document < "u" ? document : null, Nn = Ft && Ft.userAgent || "", Kl = /Edge\/(\d+)/.exec(Nn), Gf = /MSIE \d/.exec(Nn), Jl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Nn), $e = !!(Gf || Jl || Kl), kn = Gf ? document.documentMode : Jl ? +Jl[1] : Kl ? +Kl[1] : 0, vt = !$e && /gecko\/(\d+)/i.test(Nn);
vt && +(/Firefox\/(\d+)/.exec(Nn) || [0, 0])[1];
const $l = !$e && /Chrome\/(\d+)/.exec(Nn), Pe = !!$l, Yf = $l ? +$l[1] : 0, We = !$e && !!Ft && /Apple Computer/.test(Ft.vendor), Hr = We && (/Mobile\/\w+/.test(Nn) || !!Ft && Ft.maxTouchPoints > 2), dt = Hr || (Ft ? /Mac/.test(Ft.platform) : !1), jy = Ft ? /Win/.test(Ft.platform) : !1, Gt = /Android \d/.test(Nn), Zi = !!tu && "webkitFontSmoothing" in tu.documentElement.style, Wy = Zi ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Uy(t) {
  let e = t.defaultView && t.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: t.documentElement.clientWidth,
    top: 0,
    bottom: t.documentElement.clientHeight
  };
}
function Ht(t, e) {
  return typeof t == "number" ? t : t[e];
}
function qy(t) {
  let e = t.getBoundingClientRect(), n = e.width / t.offsetWidth || 1, r = e.height / t.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + t.clientWidth * n,
    top: e.top,
    bottom: e.top + t.clientHeight * r
  };
}
function nu(t, e, n) {
  let r = t.someProp("scrollThreshold") || 0, i = t.someProp("scrollMargin") || 5, s = t.dom.ownerDocument;
  for (let o = n || t.dom; o; ) {
    if (o.nodeType != 1) {
      o = Vr(o);
      continue;
    }
    let l = o, a = l == s.body, c = a ? Uy(s) : qy(l), u = 0, d = 0;
    if (e.top < c.top + Ht(r, "top") ? d = -(c.top - e.top + Ht(i, "top")) : e.bottom > c.bottom - Ht(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + Ht(i, "top") - c.top : e.bottom - c.bottom + Ht(i, "bottom")), e.left < c.left + Ht(r, "left") ? u = -(c.left - e.left + Ht(i, "left")) : e.right > c.right - Ht(r, "right") && (u = e.right - c.right + Ht(i, "right")), u || d)
      if (a)
        s.defaultView.scrollBy(u, d);
      else {
        let h = l.scrollLeft, p = l.scrollTop;
        d && (l.scrollTop += d), u && (l.scrollLeft += u);
        let m = l.scrollLeft - h, g = l.scrollTop - p;
        e = { left: e.left - m, top: e.top - g, right: e.right - m, bottom: e.bottom - g };
      }
    let f = a ? "fixed" : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(f))
      break;
    o = f == "absolute" ? o.offsetParent : Vr(o);
  }
}
function Ky(t) {
  let e = t.dom.getBoundingClientRect(), n = Math.max(0, e.top), r, i;
  for (let s = (e.left + e.right) / 2, o = n + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let l = t.root.elementFromPoint(s, o);
    if (!l || l == t.dom || !t.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= n - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Xf(t.dom) };
}
function Xf(t) {
  let e = [], n = t.ownerDocument;
  for (let r = t; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), t != n); r = Vr(r))
    ;
  return e;
}
function Jy({ refDOM: t, refTop: e, stack: n }) {
  let r = t ? t.getBoundingClientRect().top : 0;
  Qf(n, r == 0 ? 0 : r - e);
}
function Qf(t, e) {
  for (let n = 0; n < t.length; n++) {
    let { dom: r, top: i, left: s } = t[n];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let vr = null;
function $y(t) {
  if (t.setActive)
    return t.setActive();
  if (vr)
    return t.focus(vr);
  let e = Xf(t);
  t.focus(vr == null ? {
    get preventScroll() {
      return vr = { preventScroll: !0 }, !0;
    }
  } : void 0), vr || (vr = !1, Qf(e, 0));
}
function Zf(t, e) {
  let n, r = 2e8, i, s = 0, o = e.top, l = e.top, a, c;
  for (let u = t.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = qt(u).getClientRects();
    else
      continue;
    for (let h = 0; h < f.length; h++) {
      let p = f[h];
      if (p.top <= o && p.bottom >= l) {
        o = Math.max(p.bottom, o), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          n = u, r = m, i = m && n.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (s = d + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !n && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = d + 1);
    }
  }
  return !n && a && (n = a, i = c, r = 0), n && n.nodeType == 3 ? Gy(n, i) : !n || r && n.nodeType == 1 ? { node: t, offset: s } : Zf(n, i);
}
function Gy(t, e) {
  let n = t.nodeValue.length, r = document.createRange();
  for (let i = 0; i < n; i++) {
    r.setEnd(t, i + 1), r.setStart(t, i);
    let s = on(r, 1);
    if (s.top != s.bottom && Ha(e, s))
      return { node: t, offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0) };
  }
  return { node: t, offset: 0 };
}
function Ha(t, e) {
  return t.left >= e.left - 1 && t.left <= e.right + 1 && t.top >= e.top - 1 && t.top <= e.bottom + 1;
}
function Yy(t, e) {
  let n = t.parentNode;
  return n && /^li$/i.test(n.nodeName) && e.left < t.getBoundingClientRect().left ? n : t;
}
function Xy(t, e, n) {
  let { node: r, offset: i } = Zf(e, n), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    s = o.left != o.right && n.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return t.docView.posFromDOM(r, i, s);
}
function Qy(t, e, n, r) {
  let i = -1;
  for (let s = e, o = !1; s != t.dom; ) {
    let l = t.docView.nearestDesc(s, !0), a;
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) && (!o && a.left > r.left || a.top > r.top ? i = l.posBefore : (!o && a.right < r.left || a.bottom < r.top) && (i = l.posAfter), o = !0), !l.contentDOM && i < 0 && !l.node.isText))
      return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    s = l.dom.parentNode;
  }
  return i > -1 ? i : t.docView.posFromDOM(e, n, -1);
}
function eh(t, e, n) {
  let r = t.childNodes.length;
  if (r && n.top < n.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - n.top) / (n.bottom - n.top)) - 2)), s = i; ; ) {
      let o = t.childNodes[s];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (Ha(e, c))
            return eh(o, e, c);
        }
      }
      if ((s = (s + 1) % r) == i)
        break;
    }
  return t;
}
function Zy(t, e) {
  let n = t.dom.ownerDocument, r, i = 0, s = Hy(n, e.left, e.top);
  s && ({ node: r, offset: i } = s);
  let o = (t.root.elementFromPoint ? t.root : n).elementFromPoint(e.left, e.top), l;
  if (!o || !t.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = t.dom.getBoundingClientRect();
    if (!Ha(e, c) || (o = eh(t.dom, e, c), !o))
      return null;
  }
  if (We)
    for (let c = o; r && c; c = Vr(c))
      c.draggable && (r = void 0);
  if (o = Yy(o, e), r) {
    if (vt && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], d;
      u.nodeName == "IMG" && (d = u.getBoundingClientRect()).right <= e.left && d.bottom > e.top && i++;
    }
    let c;
    Zi && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == t.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = t.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = Qy(t, r, i, e));
  }
  l == null && (l = Xy(t, o, e));
  let a = t.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function ru(t) {
  return t.top < t.bottom || t.left < t.right;
}
function on(t, e) {
  let n = t.getClientRects();
  if (n.length) {
    let r = n[e < 0 ? 0 : n.length - 1];
    if (ru(r))
      return r;
  }
  return Array.prototype.find.call(n, ru) || t.getBoundingClientRect();
}
const eb = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function th(t, e, n) {
  let { node: r, offset: i, atom: s } = t.docView.domFromPos(e, n < 0 ? -1 : 1), o = Zi || vt;
  if (r.nodeType == 3)
    if (o && (eb.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
      let a = on(qt(r, i, i), n);
      if (vt && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = on(qt(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = on(qt(r, i, i + 1), -1);
          if (u.top != a.top)
            return Zr(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, u = n < 0 ? 1 : -1;
      return n < 0 && !i ? (c++, u = -1) : n >= 0 && i == r.nodeValue.length ? (a--, u = 1) : n < 0 ? a-- : c++, Zr(on(qt(r, a, c), u), u < 0);
    }
  if (!t.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && i && (n < 0 || i == ft(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return ul(a.getBoundingClientRect(), !1);
    }
    if (s == null && i < ft(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return ul(a.getBoundingClientRect(), !0);
    }
    return ul(r.getBoundingClientRect(), n >= 0);
  }
  if (s == null && i && (n < 0 || i == ft(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? qt(a, ft(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return Zr(on(c, 1), !1);
  }
  if (s == null && i < ft(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? qt(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return Zr(on(c, -1), !0);
  }
  return Zr(on(r.nodeType == 3 ? qt(r) : r, -n), n >= 0);
}
function Zr(t, e) {
  if (t.width == 0)
    return t;
  let n = e ? t.left : t.right;
  return { top: t.top, bottom: t.bottom, left: n, right: n };
}
function ul(t, e) {
  if (t.height == 0)
    return t;
  let n = e ? t.top : t.bottom;
  return { top: n, bottom: n, left: t.left, right: t.right };
}
function nh(t, e, n) {
  let r = t.state, i = t.root.activeElement;
  r != e && t.updateState(e), i != t.dom && t.focus();
  try {
    return n();
  } finally {
    r != e && t.updateState(r), i != t.dom && i && i.focus();
  }
}
function tb(t, e, n) {
  let r = e.selection, i = n == "up" ? r.$from : r.$to;
  return nh(t, e, () => {
    let { node: s } = t.docView.domFromPos(i.pos, n == "up" ? -1 : 1);
    for (; ; ) {
      let l = t.docView.nearestDesc(s, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        s = l.contentDOM || l.dom;
        break;
      }
      s = l.dom.parentNode;
    }
    let o = th(t, i.pos, 1);
    for (let l = s.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = qt(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (u.bottom > u.top + 1 && (n == "up" ? o.top - u.top > (u.bottom - o.top) * 2 : u.bottom - o.bottom > (o.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const nb = /[\u0590-\u08ac]/;
function rb(t, e, n) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, s = !i, o = i == r.parent.content.size, l = t.domSelection();
  return l ? !nb.test(r.parent.textContent) || !l.modify ? n == "left" || n == "backward" ? s : o : nh(t, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: d } = t.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", n, "character");
    let h = r.depth ? t.docView.domAfterPos(r.before()) : t.dom, { focusNode: p, focusOffset: m } = t.domSelectionRange(), g = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(u, d), a && (a != u || c != d) && l.extend && l.extend(a, c);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), g;
  }) : r.pos == r.start() || r.pos == r.end();
}
let iu = null, su = null, ou = !1;
function ib(t, e, n) {
  return iu == e && su == n ? ou : (iu = e, su = n, ou = n == "up" || n == "down" ? tb(t, e, n) : rb(t, e, n));
}
const yt = 0, lu = 1, qn = 2, Vt = 3;
class es {
  constructor(e, n, r, i) {
    this.parent = e, this.children = n, this.dom = r, this.contentDOM = i, this.dirty = yt, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, n, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let n = 0; n < this.children.length; n++)
      e += this.children[n].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let n = 0, r = this.posAtStart; ; n++) {
      let i = this.children[n];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, n, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[n - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[n];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = n > Ne(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (n == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (i == null && n == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, n = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let s = this.getDesc(i), o;
      if (s && (!n || s.node))
        if (r && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let n = e.pmViewDesc;
    for (let r = n; r; r = r.parent)
      if (r == this)
        return n;
  }
  posFromDOM(e, n, r) {
    for (let i = e; i; i = i.parentNode) {
      let s = this.getDesc(i);
      if (s)
        return s.localPosFromDOM(e, n, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let n = 0, r = 0; n < this.children.length; n++) {
      let i = this.children[n], s = r + i.size;
      if (r == e && s != r) {
        for (; !i.border && i.children.length; )
          for (let o = 0; o < i.children.length; o++) {
            let l = i.children[o];
            if (l.size) {
              i = l;
              break;
            }
          }
        return i;
      }
      if (e < s)
        return i.descAt(e - r - i.border);
      r = s;
    }
  }
  domFromPos(e, n) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let s = 0; r < this.children.length; r++) {
      let o = this.children[r], l = s + o.size;
      if (l > e || o instanceof ih) {
        i = e - s;
        break;
      }
      s = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, n);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof rh && s.side >= 0; r--)
      ;
    if (n <= 0) {
      let s, o = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, o = !1)
        ;
      return s && n && o && !s.border && !s.domAtom ? s.domFromPos(s.size, n) : { node: this.contentDOM, offset: s ? Ne(s.dom) + 1 : 0 };
    } else {
      let s, o = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, o = !1)
        ;
      return s && o && !s.border && !s.domAtom ? s.domFromPos(0, n) : { node: this.contentDOM, offset: s ? Ne(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, n, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: n, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, s = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l], c = o + a.size;
      if (i == -1 && e <= c) {
        let u = o + a.border;
        if (e >= u && n <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, n, u);
        e = o;
        for (let d = l; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            i = Ne(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > n || l == this.children.length - 1)) {
        n = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            s = Ne(d.dom);
            break;
          }
          n += d.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: n, fromOffset: i, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let n = this.children[e < 0 ? 0 : this.children.length - 1];
    return n.size == 0 || n.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: n, offset: r } = this.domFromPos(e, 0);
    if (n.nodeType != 1 || r == n.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return n.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, n, r, i = !1) {
    let s = Math.min(e, n), o = Math.max(e, n);
    for (let h = 0, p = 0; h < this.children.length; h++) {
      let m = this.children[h], g = p + m.size;
      if (s > p && o < g)
        return m.setSelection(e - p - m.border, n - p - m.border, r, i);
      p = g;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = n == e ? l : this.domFromPos(n, n ? -1 : 1), c = r.root.getSelection(), u = r.domSelectionRange(), d = !1;
    if ((vt || We) && e == n) {
      let { node: h, offset: p } = l;
      if (h.nodeType == 3) {
        if (d = !!(p && h.nodeValue[p - 1] == `
`), d && p == h.nodeValue.length)
          for (let m = h, g; m; m = m.parentNode) {
            if (g = m.nextSibling) {
              g.nodeName == "BR" && (l = a = { node: g.parentNode, offset: Ne(g) + 1 });
              break;
            }
            let v = m.pmViewDesc;
            if (v && v.node && v.node.isBlock)
              break;
          }
      } else {
        let m = h.childNodes[p - 1];
        d = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (vt && u.focusNode && u.focusNode != a.node && u.focusNode.nodeType == 1) {
      let h = u.focusNode.childNodes[u.focusOffset];
      h && h.contentEditable == "false" && (i = !0);
    }
    if (!(i || d && We) && dr(l.node, l.offset, u.anchorNode, u.anchorOffset) && dr(a.node, a.offset, u.focusNode, u.focusOffset))
      return;
    let f = !1;
    if ((c.extend || e == n) && !(d && vt)) {
      c.collapse(l.node, l.offset);
      try {
        e != n && c.extend(a.node, a.offset), f = !0;
      } catch {
      }
    }
    if (!f) {
      if (e > n) {
        let p = l;
        l = a, a = p;
      }
      let h = document.createRange();
      h.setEnd(a.node, a.offset), h.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(h);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, n) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let s = this.children[i], o = r + s.size;
      if (r == o ? e <= o && n >= r : e < o && n > r) {
        let l = r + s.border, a = o - s.border;
        if (e >= l && n <= a) {
          this.dirty = e == r || n == o ? qn : lu, e == l && n == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = Vt : s.markDirty(e - l, n - l);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? qn : Vt;
      }
      r = o;
    }
    this.dirty = qn;
  }
  markParentsDirty() {
    let e = 1;
    for (let n = this.parent; n; n = n.parent, e++) {
      let r = e == 1 ? qn : lu;
      n.dirty < r && (n.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class rh extends es {
  constructor(e, n, r, i) {
    let s, o = n.type.toDOM;
    if (typeof o == "function" && (o = o(r, () => {
      if (!s)
        return i;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !n.type.spec.raw) {
      if (o.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(o), o = l;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = n, this.widget = n, s = this;
  }
  matchesWidget(e) {
    return this.dirty == yt && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let n = this.widget.spec.stopEvent;
    return n ? n(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class sb extends es {
  constructor(e, n, r, i) {
    super(e, [], n, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, n) {
    return e != this.textDOM ? this.posAtStart + (n ? this.size : 0) : this.posAtStart + n;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class fr extends es {
  constructor(e, n, r, i, s) {
    super(e, [], r, i), this.mark = n, this.spec = s;
  }
  static create(e, n, r, i) {
    let s = i.nodeViews[n.type.name], o = s && s(n, i, r);
    return (!o || !o.dom) && (o = mr.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new fr(e, n, o.dom, o.contentDOM || o.dom, o);
  }
  parseRule() {
    return this.dirty & Vt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != Vt && this.mark.eq(e);
  }
  markDirty(e, n) {
    if (super.markDirty(e, n), this.dirty != yt) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = yt;
    }
  }
  slice(e, n, r) {
    let i = fr.create(this.parent, this.mark, !0, r), s = this.children, o = this.size;
    n < o && (s = Yl(s, n, o, r)), e > 0 && (s = Yl(s, 0, e, r));
    for (let l = 0; l < s.length; l++)
      s[l].parent = i;
    return i.children = s, i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class wn extends es {
  constructor(e, n, r, i, s, o, l, a, c) {
    super(e, [], s, o), this.node = n, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, n, r, i, s, o) {
    let l = s.nodeViews[n.type.name], a, c = l && l(n, s, () => {
      if (!a)
        return o;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), u = c && c.dom, d = c && c.contentDOM;
    if (n.isText) {
      if (!u)
        u = document.createTextNode(n.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else u || ({ dom: u, contentDOM: d } = mr.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs));
    !d && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = lh(u, r, n), c ? a = new ob(e, n, r, i, u, d || null, f, c, s, o + 1) : n.isText ? new Po(e, n, r, i, u, f, s) : new wn(e, n, r, i, u, d || null, f, s, o + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let n = this.children.length - 1; n >= 0; n--) {
        let r = this.children[n];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => E.empty);
    }
    return e;
  }
  matchesNode(e, n, r) {
    return this.dirty == yt && e.eq(this.node) && Bs(n, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, n) {
    let r = this.node.inlineContent, i = n, s = e.composing ? this.localCompositionInfo(e, n) : null, o = s && s.pos > -1 ? s : null, l = s && s.pos < 0, a = new ab(this, o && o.node, e);
    db(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !d && a.syncToMarks(u == this.node.childCount ? Q.none : this.node.child(u).marks, r, e), a.placeWidget(c, e, i);
    }, (c, u, d, f) => {
      a.syncToMarks(c.marks, r, e);
      let h;
      a.findNodeMatch(c, u, d, f) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (h = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(c, u, d, h, e) || a.updateNextNode(c, u, d, e, f, i) || a.addNode(c, u, d, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == qn) && (o && this.protectLocalComposition(e, o), sh(this.contentDOM, this.children, e), Hr && fb(this.dom));
  }
  localCompositionInfo(e, n) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof j) || r < n || i > n + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue, l = hb(this.node.content, o, r - n, i - n);
      return l < 0 ? null : { node: s, pos: l, text: o };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: n, pos: r, text: i }) {
    if (this.getDesc(n))
      return;
    let s = n;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new sb(this, s, n, i);
    e.input.compositionNodes.push(o), this.children = Yl(this.children, r, r + i.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, n, r, i) {
    return this.dirty == Vt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, n, r, i), !0);
  }
  updateInner(e, n, r, i) {
    this.updateOuterDeco(n), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = yt;
  }
  updateOuterDeco(e) {
    if (Bs(e, this.outerDeco))
      return;
    let n = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = oh(this.dom, this.nodeDOM, Gl(this.outerDeco, this.node, n), Gl(e, this.node, n)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function au(t, e, n, r, i) {
  lh(r, e, t);
  let s = new wn(void 0, t, e, n, r, r, r, i, 0);
  return s.contentDOM && s.updateChildren(i, 0), s;
}
class Po extends wn {
  constructor(e, n, r, i, s, o, l) {
    super(e, n, r, i, s, null, o, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, n, r, i) {
    return this.dirty == Vt || this.dirty != yt && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(n), (this.dirty != yt || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = yt, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let n = this.nodeDOM; n; n = n.parentNode)
      if (n == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, n, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(n, this.node.text.length) : super.localPosFromDOM(e, n, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, n, r) {
    let i = this.node.cut(e, n), s = document.createTextNode(i.text);
    return new Po(this.parent, i, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, n) {
    super.markDirty(e, n), this.dom != this.nodeDOM && (e == 0 || n == this.nodeDOM.nodeValue.length) && (this.dirty = Vt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class ih extends es {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == yt && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class ob extends wn {
  constructor(e, n, r, i, s, o, l, a, c, u) {
    super(e, n, r, i, s, o, l, c, u), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, n, r, i) {
    if (this.dirty == Vt)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let s = this.spec.update(e, n, r);
      return s && this.updateInner(e, n, r, i), s;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, n, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, n, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, n, r.root) : super.setSelection(e, n, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function sh(t, e, n) {
  let r = t.firstChild, i = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], l = o.dom;
    if (l.parentNode == t) {
      for (; l != r; )
        r = cu(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, t.insertBefore(l, r);
    if (o instanceof fr) {
      let a = r ? r.previousSibling : t.lastChild;
      sh(o.contentDOM, o.children, n), r = a ? a.nextSibling : t.firstChild;
    }
  }
  for (; r; )
    r = cu(r), i = !0;
  i && n.trackWrites == t && (n.trackWrites = null);
}
const di = function(t) {
  t && (this.nodeName = t);
};
di.prototype = /* @__PURE__ */ Object.create(null);
const Kn = [new di()];
function Gl(t, e, n) {
  if (t.length == 0)
    return Kn;
  let r = n ? Kn[0] : new di(), i = [r];
  for (let s = 0; s < t.length; s++) {
    let o = t[s].type.attrs;
    if (o) {
      o.nodeName && i.push(r = new di(o.nodeName));
      for (let l in o) {
        let a = o[l];
        a != null && (n && i.length == 1 && i.push(r = new di(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function oh(t, e, n, r) {
  if (n == Kn && r == Kn)
    return e;
  let i = e;
  for (let s = 0; s < r.length; s++) {
    let o = r[s], l = n[s];
    if (s) {
      let a;
      l && l.nodeName == o.nodeName && i != t && (a = i.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = Kn[0]), i = a;
    }
    lb(i, l || Kn[0], o);
  }
  return i;
}
function lb(t, e, n) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in n) && t.removeAttribute(r);
  for (let r in n)
    r != "class" && r != "style" && r != "nodeName" && n[r] != e[r] && t.setAttribute(r, n[r]);
  if (e.class != n.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = n.class ? n.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && t.classList.remove(r[s]);
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && t.classList.add(i[s]);
    t.classList.length == 0 && t.removeAttribute("class");
  }
  if (e.style != n.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        t.style.removeProperty(i[1]);
    }
    n.style && (t.style.cssText += n.style);
  }
}
function lh(t, e, n) {
  return oh(t, t, Kn, Gl(e, n, t.nodeType != 1));
}
function Bs(t, e) {
  if (t.length != e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (!t[n].type.eq(e[n].type))
      return !1;
  return !0;
}
function cu(t) {
  let e = t.nextSibling;
  return t.parentNode.removeChild(t), e;
}
class ab {
  constructor(e, n, r) {
    this.lock = n, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = cb(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, n) {
    if (e != n) {
      for (let r = e; r < n; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, n - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, n, r) {
    let i = 0, s = this.stack.length >> 1, o = Math.min(s, e.length);
    for (; i < o && (i == s - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < s; )
      this.destroyRest(), this.top.dirty = yt, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = fr.create(this.top, e[s], n, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, n, r, i) {
    let s = -1, o;
    if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, n, r))
      s = this.top.children.indexOf(o, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, n, r) && !this.preMatch.matched.has(c)) {
          s = l;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, n, r, i, s) {
    let o = this.top.children[i];
    return o.dirty == Vt && o.dom == o.contentDOM && (o.dirty = qn), o.update(e, n, r, s) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let n = e.parentNode;
      if (!n)
        return -1;
      if (n == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = n;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, n, r, i, s, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof wn) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != s)
          return !1;
        let u = a.dom, d, f = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != Vt && Bs(n, a.outerDeco));
        if (!f && a.update(e, n, r, i))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(a, e, n, r, i, o)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = d, d.contentDOM && (d.dirty = qn, d.updateChildren(i, o + 1), d.dirty = yt), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, n, r, i, s, o) {
    if (e.dirty || n.isAtom || !e.children.length || !e.node.content.eq(n.content) || !Bs(r, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let l = wn.create(this.top, n, r, i, s, o);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, n, r, i, s) {
    let o = wn.create(this.top, e, n, r, i, s);
    o.contentDOM && o.updateChildren(i, s + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, n, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new rh(this.top, e, n, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], n = this.top;
    for (; e instanceof fr; )
      n = e, e = n.children[n.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof Po) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((We || Pe) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", n), this.addHackNode("BR", this.top));
  }
  addHackNode(e, n) {
    if (n == this.top && this.index < n.children.length && n.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new ih(this.top, [], r, null);
      n != this.top ? n.children.push(i) : n.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function cb(t, e) {
  let n = e, r = n.children.length, i = t.childCount, s = /* @__PURE__ */ new Map(), o = [];
  e: for (; i > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = n.children[r - 1];
        if (c instanceof fr)
          n = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (n == e)
          break e;
        r = n.parent.children.indexOf(n), n = n.parent;
      }
    let a = l.node;
    if (a) {
      if (a != t.child(i - 1))
        break;
      --i, s.set(l, i), o.push(l);
    }
  }
  return { index: i, matched: s, matches: o.reverse() };
}
function ub(t, e) {
  return t.type.side - e.type.side;
}
function db(t, e, n, r) {
  let i = e.locals(t), s = 0;
  if (i.length == 0) {
    for (let c = 0; c < t.childCount; c++) {
      let u = t.child(c);
      r(u, i, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let o = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let u, d;
    for (; o < i.length && i[o].to == s; ) {
      let g = i[o++];
      g.widget && (u ? (d || (d = [u])).push(g) : u = g);
    }
    if (u)
      if (d) {
        d.sort(ub);
        for (let g = 0; g < d.length; g++)
          n(d[g], c, !!a);
      } else
        n(u, c, !!a);
    let f, h;
    if (a)
      h = -1, f = a, a = null;
    else if (c < t.childCount)
      h = c, f = t.child(c++);
    else
      break;
    for (let g = 0; g < l.length; g++)
      l[g].to <= s && l.splice(g--, 1);
    for (; o < i.length && i[o].from <= s && i[o].to > s; )
      l.push(i[o++]);
    let p = s + f.nodeSize;
    if (f.isText) {
      let g = p;
      o < i.length && i[o].from < g && (g = i[o].from);
      for (let v = 0; v < l.length; v++)
        l[v].to < g && (g = l[v].to);
      g < p && (a = f.cut(g - s), f = f.cut(0, g - s), p = g, h = -1);
    } else
      for (; o < i.length && i[o].to < p; )
        o++;
    let m = f.isInline && !f.isLeaf ? l.filter((g) => !g.inline) : l.slice();
    r(f, m, e.forChild(s, f), h), s = p;
  }
}
function fb(t) {
  if (t.nodeName == "UL" || t.nodeName == "OL") {
    let e = t.style.cssText;
    t.style.cssText = e + "; list-style: square !important", window.getComputedStyle(t).listStyle, t.style.cssText = e;
  }
}
function hb(t, e, n, r) {
  for (let i = 0, s = 0; i < t.childCount && s <= r; ) {
    let o = t.child(i++), l = s;
    if (s += o.nodeSize, !o.isText)
      continue;
    let a = o.text;
    for (; i < t.childCount; ) {
      let c = t.child(i++);
      if (s += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (s >= n) {
      if (s >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= n)
        return l + c;
      if (n == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function Yl(t, e, n, r, i) {
  let s = [];
  for (let o = 0, l = 0; o < t.length; o++) {
    let a = t[o], c = l, u = l += a.size;
    c >= n || u <= e ? s.push(a) : (c < e && s.push(a.slice(0, e - c, r)), i && (s.push(i), i = void 0), u > n && s.push(a.slice(n - c, a.size, r)));
  }
  return s;
}
function ja(t, e = null) {
  let n = t.domSelectionRange(), r = t.state.doc;
  if (!n.focusNode)
    return null;
  let i = t.docView.nearestDesc(n.focusNode), s = i && i.size == 0, o = t.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
  if (o < 0)
    return null;
  let l = r.resolve(o), a, c;
  if (Lo(n)) {
    for (a = o; i && !i.node; )
      i = i.parent;
    let d = i.node;
    if (i && d.isAtom && B.isSelectable(d) && i.parent && !(d.isInline && Fy(n.focusNode, n.focusOffset, i.dom))) {
      let f = i.posBefore;
      c = new B(o == f ? l : r.resolve(f));
    }
  } else {
    if (n instanceof t.dom.ownerDocument.defaultView.Selection && n.rangeCount > 1) {
      let d = o, f = o;
      for (let h = 0; h < n.rangeCount; h++) {
        let p = n.getRangeAt(h);
        d = Math.min(d, t.docView.posFromDOM(p.startContainer, p.startOffset, 1)), f = Math.max(f, t.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (d < 0)
        return null;
      [a, o] = f == t.state.selection.anchor ? [f, d] : [d, f], l = r.resolve(o);
    } else
      a = t.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let d = e == "pointer" || t.state.selection.head < l.pos && !s ? 1 : -1;
    c = Wa(t, u, l, d);
  }
  return c;
}
function ah(t) {
  return t.editable ? t.hasFocus() : uh(t) && document.activeElement && document.activeElement.contains(t.dom);
}
function Xt(t, e = !1) {
  let n = t.state.selection;
  if (ch(t, n), !!ah(t)) {
    if (!e && t.input.mouseDown && t.input.mouseDown.allowDefault && Pe) {
      let r = t.domSelectionRange(), i = t.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && dr(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        t.input.mouseDown.delayedSelectionSync = !0, t.domObserver.setCurSelection();
        return;
      }
    }
    if (t.domObserver.disconnectSelection(), t.cursorWrapper)
      mb(t);
    else {
      let { anchor: r, head: i } = n, s, o;
      uu && !(n instanceof j) && (n.$from.parent.inlineContent || (s = du(t, n.from)), !n.empty && !n.$from.parent.inlineContent && (o = du(t, n.to))), t.docView.setSelection(r, i, t, e), uu && (s && fu(s), o && fu(o)), n.visible ? t.dom.classList.remove("ProseMirror-hideselection") : (t.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && pb(t));
    }
    t.domObserver.setCurSelection(), t.domObserver.connectSelection();
  }
}
const uu = We || Pe && Yf < 63;
function du(t, e) {
  let { node: n, offset: r } = t.docView.domFromPos(e, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, s = r ? n.childNodes[r - 1] : null;
  if (We && i && i.contentEditable == "false")
    return dl(i);
  if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (i)
      return dl(i);
    if (s)
      return dl(s);
  }
}
function dl(t) {
  return t.contentEditable = "true", We && t.draggable && (t.draggable = !1, t.wasDraggable = !0), t;
}
function fu(t) {
  t.contentEditable = "false", t.wasDraggable && (t.draggable = !0, t.wasDraggable = null);
}
function pb(t) {
  let e = t.dom.ownerDocument;
  e.removeEventListener("selectionchange", t.input.hideSelectionGuard);
  let n = t.domSelectionRange(), r = n.anchorNode, i = n.anchorOffset;
  e.addEventListener("selectionchange", t.input.hideSelectionGuard = () => {
    (n.anchorNode != r || n.anchorOffset != i) && (e.removeEventListener("selectionchange", t.input.hideSelectionGuard), setTimeout(() => {
      (!ah(t) || t.state.selection.visible) && t.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function mb(t) {
  let e = t.domSelection();
  if (!e)
    return;
  let n = t.cursorWrapper.dom, r = n.nodeName == "IMG";
  r ? e.collapse(n.parentNode, Ne(n) + 1) : e.collapse(n, 0), !r && !t.state.selection.visible && $e && kn <= 11 && (n.disabled = !0, n.disabled = !1);
}
function ch(t, e) {
  if (e instanceof B) {
    let n = t.docView.descAt(e.from);
    n != t.lastSelectedViewDesc && (hu(t), n && n.selectNode(), t.lastSelectedViewDesc = n);
  } else
    hu(t);
}
function hu(t) {
  t.lastSelectedViewDesc && (t.lastSelectedViewDesc.parent && t.lastSelectedViewDesc.deselectNode(), t.lastSelectedViewDesc = void 0);
}
function Wa(t, e, n, r) {
  return t.someProp("createSelectionBetween", (i) => i(t, e, n)) || j.between(e, n, r);
}
function pu(t) {
  return t.editable && !t.hasFocus() ? !1 : uh(t);
}
function uh(t) {
  let e = t.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return t.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (t.editable || t.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function gb(t) {
  let e = t.docView.domFromPos(t.state.selection.anchor, 0), n = t.domSelectionRange();
  return dr(e.node, e.offset, n.anchorNode, n.anchorOffset);
}
function Xl(t, e) {
  let { $anchor: n, $head: r } = t.selection, i = e > 0 ? n.max(r) : n.min(r), s = i.parent.inlineContent ? i.depth ? t.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return s && K.findFrom(s, e);
}
function ln(t, e) {
  return t.dispatch(t.state.tr.setSelection(e).scrollIntoView()), !0;
}
function mu(t, e, n) {
  let r = t.state.selection;
  if (r instanceof j)
    if (n.indexOf("s") > -1) {
      let { $head: i } = r, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let o = t.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return ln(t, new j(r.$anchor, o));
    } else if (r.empty) {
      if (t.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Xl(t.state, e);
        return i && i instanceof B ? ln(t, i) : !1;
      } else if (!(dt && n.indexOf("m") > -1)) {
        let i = r.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
        if (!s || s.isText)
          return !1;
        let l = e < 0 ? i.pos - s.nodeSize : i.pos;
        return s.isAtom || (o = t.docView.descAt(l)) && !o.contentDOM ? B.isSelectable(s) ? ln(t, new B(e < 0 ? t.state.doc.resolve(i.pos - s.nodeSize) : i)) : Zi ? ln(t, new j(t.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof B && r.node.isInline)
      return ln(t, new j(e > 0 ? r.$to : r.$from));
    {
      let i = Xl(t.state, e);
      return i ? ln(t, i) : !1;
    }
  }
}
function zs(t) {
  return t.nodeType == 3 ? t.nodeValue.length : t.childNodes.length;
}
function fi(t, e) {
  let n = t.pmViewDesc;
  return n && n.size == 0 && (e < 0 || t.nextSibling || t.nodeName != "BR");
}
function yr(t, e) {
  return e < 0 ? vb(t) : yb(t);
}
function vb(t) {
  let e = t.domSelectionRange(), n = e.focusNode, r = e.focusOffset;
  if (!n)
    return;
  let i, s, o = !1;
  for (vt && n.nodeType == 1 && r < zs(n) && fi(n.childNodes[r], -1) && (o = !0); ; )
    if (r > 0) {
      if (n.nodeType != 1)
        break;
      {
        let l = n.childNodes[r - 1];
        if (fi(l, -1))
          i = n, s = --r;
        else if (l.nodeType == 3)
          n = l, r = n.nodeValue.length;
        else
          break;
      }
    } else {
      if (dh(n))
        break;
      {
        let l = n.previousSibling;
        for (; l && fi(l, -1); )
          i = n.parentNode, s = Ne(l), l = l.previousSibling;
        if (l)
          n = l, r = zs(n);
        else {
          if (n = n.parentNode, n == t.dom)
            break;
          r = 0;
        }
      }
    }
  o ? Ql(t, n, r) : i && Ql(t, i, s);
}
function yb(t) {
  let e = t.domSelectionRange(), n = e.focusNode, r = e.focusOffset;
  if (!n)
    return;
  let i = zs(n), s, o;
  for (; ; )
    if (r < i) {
      if (n.nodeType != 1)
        break;
      let l = n.childNodes[r];
      if (fi(l, 1))
        s = n, o = ++r;
      else
        break;
    } else {
      if (dh(n))
        break;
      {
        let l = n.nextSibling;
        for (; l && fi(l, 1); )
          s = l.parentNode, o = Ne(l) + 1, l = l.nextSibling;
        if (l)
          n = l, r = 0, i = zs(n);
        else {
          if (n = n.parentNode, n == t.dom)
            break;
          r = i = 0;
        }
      }
    }
  s && Ql(t, s, o);
}
function dh(t) {
  let e = t.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function bb(t, e) {
  for (; t && e == t.childNodes.length && !Qi(t); )
    e = Ne(t) + 1, t = t.parentNode;
  for (; t && e < t.childNodes.length; ) {
    let n = t.childNodes[e];
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && n.contentEditable == "false")
      break;
    t = n, e = 0;
  }
}
function kb(t, e) {
  for (; t && !e && !Qi(t); )
    e = Ne(t), t = t.parentNode;
  for (; t && e; ) {
    let n = t.childNodes[e - 1];
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && n.contentEditable == "false")
      break;
    t = n, e = t.childNodes.length;
  }
}
function Ql(t, e, n) {
  if (e.nodeType != 3) {
    let s, o;
    (o = bb(e, n)) ? (e = o, n = 0) : (s = kb(e, n)) && (e = s, n = s.nodeValue.length);
  }
  let r = t.domSelection();
  if (!r)
    return;
  if (Lo(r)) {
    let s = document.createRange();
    s.setEnd(e, n), s.setStart(e, n), r.removeAllRanges(), r.addRange(s);
  } else r.extend && r.extend(e, n);
  t.domObserver.setCurSelection();
  let { state: i } = t;
  setTimeout(() => {
    t.state == i && Xt(t);
  }, 50);
}
function gu(t, e) {
  let n = t.state.doc.resolve(e);
  if (!(Pe || jy) && n.parent.inlineContent) {
    let i = t.coordsAtPos(e);
    if (e > n.start()) {
      let s = t.coordsAtPos(e - 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left < i.left ? "ltr" : "rtl";
    }
    if (e < n.end()) {
      let s = t.coordsAtPos(e + 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(t.dom).direction == "rtl" ? "rtl" : "ltr";
}
function vu(t, e, n) {
  let r = t.state.selection;
  if (r instanceof j && !r.empty || n.indexOf("s") > -1 || dt && n.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: s } = r;
  if (!i.parent.inlineContent || t.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = Xl(t.state, e);
    if (o && o instanceof B)
      return ln(t, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : s, l = r instanceof st ? K.near(o, e) : K.findFrom(o, e);
    return l ? ln(t, l) : !1;
  }
  return !1;
}
function yu(t, e) {
  if (!(t.state.selection instanceof j))
    return !0;
  let { $head: n, $anchor: r, empty: i } = t.state.selection;
  if (!n.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (t.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !n.textOffset && (e < 0 ? n.nodeBefore : n.nodeAfter);
  if (s && !s.isText) {
    let o = t.state.tr;
    return e < 0 ? o.delete(n.pos - s.nodeSize, n.pos) : o.delete(n.pos, n.pos + s.nodeSize), t.dispatch(o), !0;
  }
  return !1;
}
function bu(t, e, n) {
  t.domObserver.stop(), e.contentEditable = n, t.domObserver.start();
}
function wb(t) {
  if (!We || t.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: n } = t.domSelectionRange();
  if (e && e.nodeType == 1 && n == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    bu(t, r, "true"), setTimeout(() => bu(t, r, "false"), 20);
  }
  return !1;
}
function xb(t) {
  let e = "";
  return t.ctrlKey && (e += "c"), t.metaKey && (e += "m"), t.altKey && (e += "a"), t.shiftKey && (e += "s"), e;
}
function Sb(t, e) {
  let n = e.keyCode, r = xb(e);
  if (n == 8 || dt && n == 72 && r == "c")
    return yu(t, -1) || yr(t, -1);
  if (n == 46 && !e.shiftKey || dt && n == 68 && r == "c")
    return yu(t, 1) || yr(t, 1);
  if (n == 13 || n == 27)
    return !0;
  if (n == 37 || dt && n == 66 && r == "c") {
    let i = n == 37 ? gu(t, t.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return mu(t, i, r) || yr(t, i);
  } else if (n == 39 || dt && n == 70 && r == "c") {
    let i = n == 39 ? gu(t, t.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return mu(t, i, r) || yr(t, i);
  } else {
    if (n == 38 || dt && n == 80 && r == "c")
      return vu(t, -1, r) || yr(t, -1);
    if (n == 40 || dt && n == 78 && r == "c")
      return wb(t) || vu(t, 1, r) || yr(t, 1);
    if (r == (dt ? "m" : "c") && (n == 66 || n == 73 || n == 89 || n == 90))
      return !0;
  }
  return !1;
}
function Ua(t, e) {
  t.someProp("transformCopied", (h) => {
    e = h(e, t);
  });
  let n = [], { content: r, openStart: i, openEnd: s } = e;
  for (; i > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, s--;
    let h = r.firstChild;
    n.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let o = t.someProp("clipboardSerializer") || mr.fromSchema(t.state.schema), l = vh(), a = l.createElement("div");
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = gh[c.nodeName.toLowerCase()]); ) {
    for (let h = u.length - 1; h >= 0; h--) {
      let p = l.createElement(u[h]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), d++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${d ? ` -${d}` : ""} ${JSON.stringify(n)}`);
  let f = t.someProp("clipboardTextSerializer", (h) => h(e, t)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function fh(t, e, n, r, i) {
  let s = i.parent.type.spec.code, o, l;
  if (!n && !e)
    return null;
  let a = !!e && (r || s || !n);
  if (a) {
    if (t.someProp("transformPastedText", (f) => {
      e = f(e, s || r, t);
    }), s)
      return l = new I(E.from(t.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0), t.someProp("transformPasted", (f) => {
        l = f(l, t, !0);
      }), l;
    let d = t.someProp("clipboardTextParser", (f) => f(e, i, r, t));
    if (d)
      l = d;
    else {
      let f = i.marks(), { schema: h } = t.state, p = mr.fromSchema(h);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = o.appendChild(document.createElement("p"));
        m && g.appendChild(p.serializeNode(h.text(m, f)));
      });
    }
  } else
    t.someProp("transformPastedHTML", (d) => {
      n = d(n, t);
    }), o = Tb(n), Zi && Ab(o);
  let c = o && o.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = o.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      o = f;
    }
  if (l || (l = (t.someProp("clipboardParser") || t.someProp("domParser") || bn.fromSchema(t.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !Cb.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = _b(ku(l, +u[1], +u[2]), u[4]);
  else if (l = I.maxOpen(Mb(l.content, i), !0), l.openStart || l.openEnd) {
    let d = 0, f = 0;
    for (let h = l.content.firstChild; d < l.openStart && !h.type.spec.isolating; d++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = ku(l, d, f);
  }
  return t.someProp("transformPasted", (d) => {
    l = d(l, t, a);
  }), l;
}
const Cb = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Mb(t, e) {
  if (t.childCount < 2)
    return t;
  for (let n = e.depth; n >= 0; n--) {
    let i = e.node(n).contentMatchAt(e.index(n)), s, o = [];
    if (t.forEach((l) => {
      if (!o)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return o = null;
      if (c = o.length && s.length && ph(a, s, l, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = mh(o[o.length - 1], s.length));
        let u = hh(l, a);
        o.push(u), i = i.matchType(u.type), s = a;
      }
    }), o)
      return E.from(o);
  }
  return t;
}
function hh(t, e, n = 0) {
  for (let r = e.length - 1; r >= n; r--)
    t = e[r].create(null, E.from(t));
  return t;
}
function ph(t, e, n, r, i) {
  if (i < t.length && i < e.length && t[i] == e[i]) {
    let s = ph(t, e, n, r.lastChild, i + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(i == t.length - 1 ? n.type : t[i + 1]))
      return r.copy(r.content.append(E.from(hh(n, t, i + 1))));
  }
}
function mh(t, e) {
  if (e == 0)
    return t;
  let n = t.content.replaceChild(t.childCount - 1, mh(t.lastChild, e - 1)), r = t.contentMatchAt(t.childCount).fillBefore(E.empty, !0);
  return t.copy(n.append(r));
}
function Zl(t, e, n, r, i, s) {
  let o = e < 0 ? t.firstChild : t.lastChild, l = o.content;
  return t.childCount > 1 && (s = 0), i < r - 1 && (l = Zl(l, e, n, r, i + 1, s)), i >= n && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, s <= i).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(E.empty, !0))), t.replaceChild(e < 0 ? 0 : t.childCount - 1, o.copy(l));
}
function ku(t, e, n) {
  return e < t.openStart && (t = new I(Zl(t.content, -1, e, t.openStart, 0, t.openEnd), e, t.openEnd)), n < t.openEnd && (t = new I(Zl(t.content, 1, n, t.openEnd, 0, 0), t.openStart, n)), t;
}
const gh = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let wu = null;
function vh() {
  return wu || (wu = document.implementation.createHTMLDocument("title"));
}
let fl = null;
function Eb(t) {
  let e = window.trustedTypes;
  return e ? (fl || (fl = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (n) => n })), fl.createHTML(t)) : t;
}
function Tb(t) {
  let e = /^(\s*<meta [^>]*>)*/.exec(t);
  e && (t = t.slice(e[0].length));
  let n = vh().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(t), i;
  if ((i = r && gh[r[1].toLowerCase()]) && (t = i.map((s) => "<" + s + ">").join("") + t + i.map((s) => "</" + s + ">").reverse().join("")), n.innerHTML = Eb(t), i)
    for (let s = 0; s < i.length; s++)
      n = n.querySelector(i[s]) || n;
  return n;
}
function Ab(t) {
  let e = t.querySelectorAll(Pe ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(t.ownerDocument.createTextNode(" "), r);
  }
}
function _b(t, e) {
  if (!t.size)
    return t;
  let n = t.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return t;
  }
  let { content: i, openStart: s, openEnd: o } = t;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = n.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = E.from(a.create(r[l + 1], i)), s++, o++;
  }
  return new I(i, s, o);
}
const Ue = {}, qe = {}, Ob = { touchstart: !0, touchmove: !0 };
class Nb {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function Ib(t) {
  for (let e in Ue) {
    let n = Ue[e];
    t.dom.addEventListener(e, t.input.eventHandlers[e] = (r) => {
      Rb(t, r) && !qa(t, r) && (t.editable || !(r.type in qe)) && n(t, r);
    }, Ob[e] ? { passive: !0 } : void 0);
  }
  We && t.dom.addEventListener("input", () => null), ea(t);
}
function gn(t, e) {
  t.input.lastSelectionOrigin = e, t.input.lastSelectionTime = Date.now();
}
function Db(t) {
  t.domObserver.stop();
  for (let e in t.input.eventHandlers)
    t.dom.removeEventListener(e, t.input.eventHandlers[e]);
  clearTimeout(t.input.composingTimeout), clearTimeout(t.input.lastIOSEnterFallbackTimeout);
}
function ea(t) {
  t.someProp("handleDOMEvents", (e) => {
    for (let n in e)
      t.input.eventHandlers[n] || t.dom.addEventListener(n, t.input.eventHandlers[n] = (r) => qa(t, r));
  });
}
function qa(t, e) {
  return t.someProp("handleDOMEvents", (n) => {
    let r = n[e.type];
    return r ? r(t, e) || e.defaultPrevented : !1;
  });
}
function Rb(t, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let n = e.target; n != t.dom; n = n.parentNode)
    if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function Lb(t, e) {
  !qa(t, e) && Ue[e.type] && (t.editable || !(e.type in qe)) && Ue[e.type](t, e);
}
qe.keydown = (t, e) => {
  let n = e;
  if (t.input.shiftKey = n.keyCode == 16 || n.shiftKey, !bh(t, n) && (t.input.lastKeyCode = n.keyCode, t.input.lastKeyCodeTime = Date.now(), !(Gt && Pe && n.keyCode == 13)))
    if (n.keyCode != 229 && t.domObserver.forceFlush(), Hr && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
      let r = Date.now();
      t.input.lastIOSEnter = r, t.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        t.input.lastIOSEnter == r && (t.someProp("handleKeyDown", (i) => i(t, Hn(13, "Enter"))), t.input.lastIOSEnter = 0);
      }, 200);
    } else t.someProp("handleKeyDown", (r) => r(t, n)) || Sb(t, n) ? n.preventDefault() : gn(t, "key");
};
qe.keyup = (t, e) => {
  e.keyCode == 16 && (t.input.shiftKey = !1);
};
qe.keypress = (t, e) => {
  let n = e;
  if (bh(t, n) || !n.charCode || n.ctrlKey && !n.altKey || dt && n.metaKey)
    return;
  if (t.someProp("handleKeyPress", (i) => i(t, n))) {
    n.preventDefault();
    return;
  }
  let r = t.state.selection;
  if (!(r instanceof j) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(n.charCode), s = () => t.state.tr.insertText(i).scrollIntoView();
    !/[\r\n]/.test(i) && !t.someProp("handleTextInput", (o) => o(t, r.$from.pos, r.$to.pos, i, s)) && t.dispatch(s()), n.preventDefault();
  }
};
function Bo(t) {
  return { left: t.clientX, top: t.clientY };
}
function Pb(t, e) {
  let n = e.x - t.clientX, r = e.y - t.clientY;
  return n * n + r * r < 100;
}
function Ka(t, e, n, r, i) {
  if (r == -1)
    return !1;
  let s = t.state.doc.resolve(r);
  for (let o = s.depth + 1; o > 0; o--)
    if (t.someProp(e, (l) => o > s.depth ? l(t, n, s.nodeAfter, s.before(o), i, !0) : l(t, n, s.node(o), s.before(o), i, !1)))
      return !0;
  return !1;
}
function Tr(t, e, n) {
  if (t.focused || t.focus(), t.state.selection.eq(e))
    return;
  let r = t.state.tr.setSelection(e);
  r.setMeta("pointer", !0), t.dispatch(r);
}
function Bb(t, e) {
  if (e == -1)
    return !1;
  let n = t.state.doc.resolve(e), r = n.nodeAfter;
  return r && r.isAtom && B.isSelectable(r) ? (Tr(t, new B(n)), !0) : !1;
}
function zb(t, e) {
  if (e == -1)
    return !1;
  let n = t.state.selection, r, i;
  n instanceof B && (r = n.node);
  let s = t.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let l = o > s.depth ? s.nodeAfter : s.node(o);
    if (B.isSelectable(l)) {
      r && n.$from.depth > 0 && o >= n.$from.depth && s.before(n.$from.depth + 1) == n.$from.pos ? i = s.before(n.$from.depth) : i = s.before(o);
      break;
    }
  }
  return i != null ? (Tr(t, B.create(t.state.doc, i)), !0) : !1;
}
function Fb(t, e, n, r, i) {
  return Ka(t, "handleClickOn", e, n, r) || t.someProp("handleClick", (s) => s(t, e, r)) || (i ? zb(t, n) : Bb(t, n));
}
function Vb(t, e, n, r) {
  return Ka(t, "handleDoubleClickOn", e, n, r) || t.someProp("handleDoubleClick", (i) => i(t, e, r));
}
function Hb(t, e, n, r) {
  return Ka(t, "handleTripleClickOn", e, n, r) || t.someProp("handleTripleClick", (i) => i(t, e, r)) || jb(t, n, r);
}
function jb(t, e, n) {
  if (n.button != 0)
    return !1;
  let r = t.state.doc;
  if (e == -1)
    return r.inlineContent ? (Tr(t, j.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let s = i.depth + 1; s > 0; s--) {
    let o = s > i.depth ? i.nodeAfter : i.node(s), l = i.before(s);
    if (o.inlineContent)
      Tr(t, j.create(r, l + 1, l + 1 + o.content.size));
    else if (B.isSelectable(o))
      Tr(t, B.create(r, l));
    else
      continue;
    return !0;
  }
}
function Ja(t) {
  return Fs(t);
}
const yh = dt ? "metaKey" : "ctrlKey";
Ue.mousedown = (t, e) => {
  let n = e;
  t.input.shiftKey = n.shiftKey;
  let r = Ja(t), i = Date.now(), s = "singleClick";
  i - t.input.lastClick.time < 500 && Pb(n, t.input.lastClick) && !n[yh] && t.input.lastClick.button == n.button && (t.input.lastClick.type == "singleClick" ? s = "doubleClick" : t.input.lastClick.type == "doubleClick" && (s = "tripleClick")), t.input.lastClick = { time: i, x: n.clientX, y: n.clientY, type: s, button: n.button };
  let o = t.posAtCoords(Bo(n));
  o && (s == "singleClick" ? (t.input.mouseDown && t.input.mouseDown.done(), t.input.mouseDown = new Wb(t, o, n, !!r)) : (s == "doubleClick" ? Vb : Hb)(t, o.pos, o.inside, n) ? n.preventDefault() : gn(t, "pointer"));
};
class Wb {
  constructor(e, n, r, i) {
    this.view = e, this.pos = n, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[yh], this.allowDefault = r.shiftKey;
    let s, o;
    if (n.inside > -1)
      s = e.state.doc.nodeAt(n.inside), o = n.inside;
    else {
      let u = e.state.doc.resolve(n.pos);
      s = u.parent, o = u.depth ? u.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.nodeDOM.nodeType == 1 ? a.nodeDOM : null;
    let { selection: c } = e.state;
    (r.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof B && c.from <= o && c.to > o) && (this.mightDrag = {
      node: s,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && vt && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), gn(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => Xt(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let n = this.pos;
    this.view.state.doc != this.startDoc && (n = this.view.posAtCoords(Bo(e))), this.updateAllowDefault(e), this.allowDefault || !n ? gn(this.view, "pointer") : Fb(this.view, n.pos, n.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    We && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    Pe && !this.view.state.selection.visible && Math.min(Math.abs(n.pos - this.view.state.selection.from), Math.abs(n.pos - this.view.state.selection.to)) <= 2) ? (Tr(this.view, K.near(this.view.state.doc.resolve(n.pos))), e.preventDefault()) : gn(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), gn(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Ue.touchstart = (t) => {
  t.input.lastTouch = Date.now(), Ja(t), gn(t, "pointer");
};
Ue.touchmove = (t) => {
  t.input.lastTouch = Date.now(), gn(t, "pointer");
};
Ue.contextmenu = (t) => Ja(t);
function bh(t, e) {
  return t.composing ? !0 : We && Math.abs(e.timeStamp - t.input.compositionEndedAt) < 500 ? (t.input.compositionEndedAt = -2e8, !0) : !1;
}
const Ub = Gt ? 5e3 : -1;
qe.compositionstart = qe.compositionupdate = (t) => {
  if (!t.composing) {
    t.domObserver.flush();
    let { state: e } = t, n = e.selection.$to;
    if (e.selection instanceof j && (e.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      t.markCursor = t.state.storedMarks || n.marks(), Fs(t, !0), t.markCursor = null;
    else if (Fs(t, !e.selection.empty), vt && e.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
      let r = t.domSelectionRange();
      for (let i = r.focusNode, s = r.focusOffset; i && i.nodeType == 1 && s != 0; ) {
        let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let l = t.domSelection();
          l && l.collapse(o, o.nodeValue.length);
          break;
        } else
          i = o, s = -1;
      }
    }
    t.input.composing = !0;
  }
  kh(t, Ub);
};
qe.compositionend = (t, e) => {
  t.composing && (t.input.composing = !1, t.input.compositionEndedAt = e.timeStamp, t.input.compositionPendingChanges = t.domObserver.pendingRecords().length ? t.input.compositionID : 0, t.input.compositionNode = null, t.input.compositionPendingChanges && Promise.resolve().then(() => t.domObserver.flush()), t.input.compositionID++, kh(t, 20));
};
function kh(t, e) {
  clearTimeout(t.input.composingTimeout), e > -1 && (t.input.composingTimeout = setTimeout(() => Fs(t), e));
}
function wh(t) {
  for (t.composing && (t.input.composing = !1, t.input.compositionEndedAt = Kb()); t.input.compositionNodes.length > 0; )
    t.input.compositionNodes.pop().markParentsDirty();
}
function qb(t) {
  let e = t.domSelectionRange();
  if (!e.focusNode)
    return null;
  let n = By(e.focusNode, e.focusOffset), r = zy(e.focusNode, e.focusOffset);
  if (n && r && n != r) {
    let i = r.pmViewDesc, s = t.domObserver.lastChangedTextNode;
    if (n == s || r == s)
      return s;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (t.input.compositionNode == r) {
      let o = n.pmViewDesc;
      if (!(!o || !o.isText(n.nodeValue)))
        return r;
    }
  }
  return n || r;
}
function Kb() {
  let t = document.createEvent("Event");
  return t.initEvent("event", !0, !0), t.timeStamp;
}
function Fs(t, e = !1) {
  if (!(Gt && t.domObserver.flushingSoon >= 0)) {
    if (t.domObserver.forceFlush(), wh(t), e || t.docView && t.docView.dirty) {
      let n = ja(t), r = t.state.selection;
      return n && !n.eq(r) ? t.dispatch(t.state.tr.setSelection(n)) : (t.markCursor || e) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? t.dispatch(t.state.tr.deleteSelection()) : t.updateState(t.state), !0;
    }
    return !1;
  }
}
function Jb(t, e) {
  if (!t.dom.parentNode)
    return;
  let n = t.dom.parentNode.appendChild(document.createElement("div"));
  n.appendChild(e), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), t.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    n.parentNode && n.parentNode.removeChild(n), t.focus();
  }, 50);
}
const Di = $e && kn < 15 || Hr && Wy < 604;
Ue.copy = qe.cut = (t, e) => {
  let n = e, r = t.state.selection, i = n.type == "cut";
  if (r.empty)
    return;
  let s = Di ? null : n.clipboardData, o = r.content(), { dom: l, text: a } = Ua(t, o);
  s ? (n.preventDefault(), s.clearData(), s.setData("text/html", l.innerHTML), s.setData("text/plain", a)) : Jb(t, l), i && t.dispatch(t.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function $b(t) {
  return t.openStart == 0 && t.openEnd == 0 && t.content.childCount == 1 ? t.content.firstChild : null;
}
function Gb(t, e) {
  if (!t.dom.parentNode)
    return;
  let n = t.input.shiftKey || t.state.selection.$from.parent.type.spec.code, r = t.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
  n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = t.input.shiftKey && t.input.lastKeyCode != 45;
  setTimeout(() => {
    t.focus(), r.parentNode && r.parentNode.removeChild(r), n ? Ri(t, r.value, null, i, e) : Ri(t, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function Ri(t, e, n, r, i) {
  let s = fh(t, e, n, r, t.state.selection.$from);
  if (t.someProp("handlePaste", (a) => a(t, i, s || I.empty)))
    return !0;
  if (!s)
    return !1;
  let o = $b(s), l = o ? t.state.tr.replaceSelectionWith(o, r) : t.state.tr.replaceSelection(s);
  return t.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function xh(t) {
  let e = t.getData("text/plain") || t.getData("Text");
  if (e)
    return e;
  let n = t.getData("text/uri-list");
  return n ? n.replace(/\r?\n/g, " ") : "";
}
qe.paste = (t, e) => {
  let n = e;
  if (t.composing && !Gt)
    return;
  let r = Di ? null : n.clipboardData, i = t.input.shiftKey && t.input.lastKeyCode != 45;
  r && Ri(t, xh(r), r.getData("text/html"), i, n) ? n.preventDefault() : Gb(t, n);
};
class Sh {
  constructor(e, n, r) {
    this.slice = e, this.move = n, this.node = r;
  }
}
const Yb = dt ? "altKey" : "ctrlKey";
function Ch(t, e) {
  let n = t.someProp("dragCopies", (r) => !r(e));
  return n ?? !e[Yb];
}
Ue.dragstart = (t, e) => {
  let n = e, r = t.input.mouseDown;
  if (r && r.done(), !n.dataTransfer)
    return;
  let i = t.state.selection, s = i.empty ? null : t.posAtCoords(Bo(n)), o;
  if (!(s && s.pos >= i.from && s.pos <= (i instanceof B ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      o = B.create(t.state.doc, r.mightDrag.pos);
    else if (n.target && n.target.nodeType == 1) {
      let d = t.docView.nearestDesc(n.target, !0);
      d && d.node.type.spec.draggable && d != t.docView && (o = B.create(t.state.doc, d.posBefore));
    }
  }
  let l = (o || t.state.selection).content(), { dom: a, text: c, slice: u } = Ua(t, l);
  (!n.dataTransfer.files.length || !Pe || Yf > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(Di ? "Text" : "text/html", a.innerHTML), n.dataTransfer.effectAllowed = "copyMove", Di || n.dataTransfer.setData("text/plain", c), t.dragging = new Sh(u, Ch(t, n), o);
};
Ue.dragend = (t) => {
  let e = t.dragging;
  window.setTimeout(() => {
    t.dragging == e && (t.dragging = null);
  }, 50);
};
qe.dragover = qe.dragenter = (t, e) => e.preventDefault();
qe.drop = (t, e) => {
  let n = e, r = t.dragging;
  if (t.dragging = null, !n.dataTransfer)
    return;
  let i = t.posAtCoords(Bo(n));
  if (!i)
    return;
  let s = t.state.doc.resolve(i.pos), o = r && r.slice;
  o ? t.someProp("transformPasted", (p) => {
    o = p(o, t, !1);
  }) : o = fh(t, xh(n.dataTransfer), Di ? null : n.dataTransfer.getData("text/html"), !1, s);
  let l = !!(r && Ch(t, n));
  if (t.someProp("handleDrop", (p) => p(t, n, o || I.empty, l))) {
    n.preventDefault();
    return;
  }
  if (!o)
    return;
  n.preventDefault();
  let a = o ? _f(t.state.doc, s.pos, o) : s.pos;
  a == null && (a = s.pos);
  let c = t.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let u = c.mapping.map(a), d = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1, f = c.doc;
  if (d ? c.replaceRangeWith(u, u, o.content.firstChild) : c.replaceRange(u, u, o), c.doc.eq(f))
    return;
  let h = c.doc.resolve(u);
  if (d && B.isSelectable(o.content.firstChild) && h.nodeAfter && h.nodeAfter.sameMarkup(o.content.firstChild))
    c.setSelection(new B(h));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, g, v, y) => p = y), c.setSelection(Wa(t, h, c.doc.resolve(p)));
  }
  t.focus(), t.dispatch(c.setMeta("uiEvent", "drop"));
};
Ue.focus = (t) => {
  t.input.lastFocus = Date.now(), t.focused || (t.domObserver.stop(), t.dom.classList.add("ProseMirror-focused"), t.domObserver.start(), t.focused = !0, setTimeout(() => {
    t.docView && t.hasFocus() && !t.domObserver.currentSelection.eq(t.domSelectionRange()) && Xt(t);
  }, 20));
};
Ue.blur = (t, e) => {
  let n = e;
  t.focused && (t.domObserver.stop(), t.dom.classList.remove("ProseMirror-focused"), t.domObserver.start(), n.relatedTarget && t.dom.contains(n.relatedTarget) && t.domObserver.currentSelection.clear(), t.focused = !1);
};
Ue.beforeinput = (t, e) => {
  if (Pe && Gt && e.inputType == "deleteContentBackward") {
    t.domObserver.flushSoon();
    let { domChangeCount: r } = t.input;
    setTimeout(() => {
      if (t.input.domChangeCount != r || (t.dom.blur(), t.focus(), t.someProp("handleKeyDown", (s) => s(t, Hn(8, "Backspace")))))
        return;
      let { $cursor: i } = t.state.selection;
      i && i.pos > 0 && t.dispatch(t.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let t in qe)
  Ue[t] = qe[t];
function Li(t, e) {
  if (t == e)
    return !0;
  for (let n in t)
    if (t[n] !== e[n])
      return !1;
  for (let n in e)
    if (!(n in t))
      return !1;
  return !0;
}
class Vs {
  constructor(e, n) {
    this.toDOM = e, this.spec = n || rr, this.side = this.spec.side || 0;
  }
  map(e, n, r, i) {
    let { pos: s, deleted: o } = e.mapResult(n.from + i, this.side < 0 ? -1 : 1);
    return o ? null : new Ve(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Vs && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Li(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class xn {
  constructor(e, n) {
    this.attrs = e, this.spec = n || rr;
  }
  map(e, n, r, i) {
    let s = e.map(n.from + i, this.spec.inclusiveStart ? -1 : 1) - r, o = e.map(n.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= o ? null : new Ve(s, o, this);
  }
  valid(e, n) {
    return n.from < n.to;
  }
  eq(e) {
    return this == e || e instanceof xn && Li(this.attrs, e.attrs) && Li(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof xn;
  }
  destroy() {
  }
}
class $a {
  constructor(e, n) {
    this.attrs = e, this.spec = n || rr;
  }
  map(e, n, r, i) {
    let s = e.mapResult(n.from + i, 1);
    if (s.deleted)
      return null;
    let o = e.mapResult(n.to + i, -1);
    return o.deleted || o.pos <= s.pos ? null : new Ve(s.pos - r, o.pos - r, this);
  }
  valid(e, n) {
    let { index: r, offset: i } = e.content.findIndex(n.from), s;
    return i == n.from && !(s = e.child(r)).isText && i + s.nodeSize == n.to;
  }
  eq(e) {
    return this == e || e instanceof $a && Li(this.attrs, e.attrs) && Li(this.spec, e.spec);
  }
  destroy() {
  }
}
class Ve {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.from = e, this.to = n, this.type = r;
  }
  /**
  @internal
  */
  copy(e, n) {
    return new Ve(e, n, this.type);
  }
  /**
  @internal
  */
  eq(e, n = 0) {
    return this.type.eq(e.type) && this.from + n == e.from && this.to + n == e.to;
  }
  /**
  @internal
  */
  map(e, n, r) {
    return this.type.map(e, this, n, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, n, r) {
    return new Ve(e, e, new Vs(n, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, n, r, i) {
    return new Ve(e, n, new xn(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, n, r, i) {
    return new Ve(e, n, new $a(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof xn;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Vs;
  }
}
const kr = [], rr = {};
class se {
  /**
  @internal
  */
  constructor(e, n) {
    this.local = e.length ? e : kr, this.children = n.length ? n : kr;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, n) {
    return n.length ? Hs(n, e, 0, rr) : Le;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, n, r) {
    let i = [];
    return this.findInner(e ?? 0, n ?? 1e9, i, 0, r), i;
  }
  findInner(e, n, r, i, s) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= n && l.to >= e && (!s || s(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < n && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, n - l, r, i + l, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, n, r) {
    return this == Le || e.maps.length == 0 ? this : this.mapInner(e, n, 0, 0, r || rr);
  }
  /**
  @internal
  */
  mapInner(e, n, r, i, s) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(n, a) ? (o || (o = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec);
    }
    return this.children.length ? Xb(this.children, o || [], e, n, r, i, s) : o ? new se(o.sort(ir), kr) : Le;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, n) {
    return n.length ? this == Le ? se.create(e, n) : this.addInner(e, n, 0) : this;
  }
  addInner(e, n, r) {
    let i, s = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = Eh(n, l, c)) {
        for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
          s += 3;
        i[s] == a ? i[s + 2] = i[s + 2].addInner(l, u, c + 1) : i.splice(s, 0, a, a + l.nodeSize, Hs(u, l, c + 1, rr)), s += 3;
      }
    });
    let o = Mh(s ? Th(n) : n, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new se(o.length ? this.local.concat(o).sort(ir) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == Le ? this : this.removeInner(e, 0);
  }
  removeInner(e, n) {
    let r = this.children, i = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let o, l = r[s] + n, a = r[s + 1] + n;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > l && d.to < a && (e[u] = null, (o || (o = [])).push(d));
      if (!o)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(o, l + 1);
      c != Le ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (i.length) {
      for (let s = 0, o; s < e.length; s++)
        if (o = e[s])
          for (let l = 0; l < i.length; l++)
            i[l].eq(o, n) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new se(i, r) : Le;
  }
  forChild(e, n) {
    if (this == Le)
      return this;
    if (n.isLeaf)
      return se.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let s = e + 1, o = s + n.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > s && a.type instanceof xn) {
        let c = Math.max(s, a.from) - s, u = Math.min(o, a.to) - s;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new se(i.sort(ir), kr);
      return r ? new un([l, r]) : l;
    }
    return r || Le;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof se) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let n = 0; n < this.local.length; n++)
      if (!this.local[n].eq(e.local[n]))
        return !1;
    for (let n = 0; n < this.children.length; n += 3)
      if (this.children[n] != e.children[n] || this.children[n + 1] != e.children[n + 1] || !this.children[n + 2].eq(e.children[n + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return Ga(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == Le)
      return kr;
    if (e.inlineContent || !this.local.some(xn.is))
      return this.local;
    let n = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof xn || n.push(this.local[r]);
    return n;
  }
  forEachSet(e) {
    e(this);
  }
}
se.empty = new se([], []);
se.removeOverlap = Ga;
const Le = se.empty;
class un {
  constructor(e) {
    this.members = e;
  }
  map(e, n) {
    const r = this.members.map((i) => i.map(e, n, rr));
    return un.from(r);
  }
  forChild(e, n) {
    if (n.isLeaf)
      return se.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].forChild(e, n);
      s != Le && (s instanceof un ? r = r.concat(s.members) : r.push(s));
    }
    return un.from(r);
  }
  eq(e) {
    if (!(e instanceof un) || e.members.length != this.members.length)
      return !1;
    for (let n = 0; n < this.members.length; n++)
      if (!this.members[n].eq(e.members[n]))
        return !1;
    return !0;
  }
  locals(e) {
    let n, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].localsInner(e);
      if (s.length)
        if (!n)
          n = s;
        else {
          r && (n = n.slice(), r = !1);
          for (let o = 0; o < s.length; o++)
            n.push(s[o]);
        }
    }
    return n ? Ga(r ? n : n.sort(ir)) : kr;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return Le;
      case 1:
        return e[0];
      default:
        return new un(e.every((n) => n instanceof se) ? e : e.reduce((n, r) => n.concat(r instanceof se ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let n = 0; n < this.members.length; n++)
      this.members[n].forEachSet(e);
  }
}
function Xb(t, e, n, r, i, s, o) {
  let l = t.slice();
  for (let c = 0, u = s; c < n.maps.length; c++) {
    let d = 0;
    n.maps[c].forEach((f, h, p, m) => {
      let g = m - p - (h - f);
      for (let v = 0; v < l.length; v += 3) {
        let y = l[v + 1];
        if (y < 0 || f > y + u - d)
          continue;
        let b = l[v] + u - d;
        h >= b ? l[v + 1] = f <= b ? -2 : -1 : f >= u && g && (l[v] += g, l[v + 1] += g);
      }
      d += g;
    }), u = n.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = n.map(t[c] + s), d = u - i;
      if (d < 0 || d >= r.content.size) {
        a = !0;
        continue;
      }
      let f = n.map(t[c + 1] + s, -1), h = f - i, { index: p, offset: m } = r.content.findIndex(d), g = r.maybeChild(p);
      if (g && m == d && m + g.nodeSize == h) {
        let v = l[c + 2].mapInner(n, g, u + 1, t[c] + s + 1, o);
        v != Le ? (l[c] = d, l[c + 1] = h, l[c + 2] = v) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = Qb(l, t, e, n, i, s, o), u = Hs(c, r, 0, o);
    e = u.local;
    for (let d = 0; d < l.length; d += 3)
      l[d + 1] < 0 && (l.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let h = u.children[d];
      for (; f < l.length && l[f] < h; )
        f += 3;
      l.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new se(e.sort(ir), l);
}
function Mh(t, e) {
  if (!e || !t.length)
    return t;
  let n = [];
  for (let r = 0; r < t.length; r++) {
    let i = t[r];
    n.push(new Ve(i.from + e, i.to + e, i.type));
  }
  return n;
}
function Qb(t, e, n, r, i, s, o) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let d = a.local[u].map(r, i, c);
      d ? n.push(d) : o.onRemove && o.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < t.length; a += 3)
    t[a + 1] == -1 && l(t[a + 2], e[a] + s + 1);
  return n;
}
function Eh(t, e, n) {
  if (e.isLeaf)
    return null;
  let r = n + e.nodeSize, i = null;
  for (let s = 0, o; s < t.length; s++)
    (o = t[s]) && o.from > n && o.to < r && ((i || (i = [])).push(o), t[s] = null);
  return i;
}
function Th(t) {
  let e = [];
  for (let n = 0; n < t.length; n++)
    t[n] != null && e.push(t[n]);
  return e;
}
function Hs(t, e, n, r) {
  let i = [], s = !1;
  e.forEach((l, a) => {
    let c = Eh(t, l, a + n);
    if (c) {
      s = !0;
      let u = Hs(c, l, n + a + 1, r);
      u != Le && i.push(a, a + l.nodeSize, u);
    }
  });
  let o = Mh(s ? Th(t) : t, -n).sort(ir);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) || (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || i.length ? new se(o, i) : Le;
}
function ir(t, e) {
  return t.from - e.from || t.to - e.to;
}
function Ga(t) {
  let e = t;
  for (let n = 0; n < e.length - 1; n++) {
    let r = e[n];
    if (r.from != r.to)
      for (let i = n + 1; i < e.length; i++) {
        let s = e[i];
        if (s.from == r.from) {
          s.to != r.to && (e == t && (e = t.slice()), e[i] = s.copy(s.from, r.to), xu(e, i + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == t && (e = t.slice()), e[n] = r.copy(r.from, s.from), xu(e, i, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function xu(t, e, n) {
  for (; e < t.length && ir(n, t[e]) > 0; )
    e++;
  t.splice(e, 0, n);
}
function hl(t) {
  let e = [];
  return t.someProp("decorations", (n) => {
    let r = n(t.state);
    r && r != Le && e.push(r);
  }), t.cursorWrapper && e.push(se.create(t.state.doc, [t.cursorWrapper.deco])), un.from(e);
}
const Zb = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, ek = $e && kn <= 11;
class tk {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class nk {
  constructor(e, n) {
    this.view = e, this.handleDOMChange = n, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new tk(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      $e && kn <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), ek && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Zb)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let n = 0; n < e.length; n++)
          this.queue.push(e[n]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (pu(this.view)) {
      if (this.suppressingSelectionUpdates)
        return Xt(this.view);
      if ($e && kn <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && dr(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let n = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = Vr(s))
      n.add(s);
    for (let s = e.anchorNode; s; s = Vr(s))
      if (n.has(s)) {
        r = s;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let n = this.pendingRecords();
    n.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && pu(e) && !this.ignoreSelectionChange(r), s = -1, o = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < n.length; u++) {
        let d = this.registerMutation(n[u], a);
        d && (s = s < 0 ? d.from : Math.min(d.from, s), o = o < 0 ? d.to : Math.max(d.to, o), d.typeOver && (l = !0));
      }
    if (vt && a.length) {
      let u = a.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let [d, f] = u;
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      } else {
        let { focusNode: d } = this.currentSelection;
        for (let f of u) {
          let h = f.parentNode;
          h && h.nodeName == "LI" && (!d || sk(e, d) != h) && f.remove();
        }
      }
    }
    let c = null;
    s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && Lo(r) && (c = ja(e)) && c.eq(K.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Xt(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o), rk(e)), this.handleDOMChange(s, o, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || Xt(e), this.currentSelection.set(r));
  }
  registerMutation(e, n) {
    if (n.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let d = e.addedNodes[u];
        n.push(d), d.nodeType == 3 && (this.lastChangedTextNode = d);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, s = e.nextSibling;
      if ($e && kn <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (i = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (s = f);
        }
      let o = i && i.parentNode == e.target ? Ne(i) + 1 : 0, l = r.localPosFromDOM(e.target, o, -1), a = s && s.parentNode == e.target ? Ne(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let Su = /* @__PURE__ */ new WeakMap(), Cu = !1;
function rk(t) {
  if (!Su.has(t) && (Su.set(t, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(t.dom).whiteSpace) !== -1)) {
    if (t.requiresGeckoHackNode = vt, Cu)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Cu = !0;
  }
}
function Mu(t, e) {
  let n = e.startContainer, r = e.startOffset, i = e.endContainer, s = e.endOffset, o = t.domAtPos(t.state.selection.anchor);
  return dr(o.node, o.offset, i, s) && ([n, r, i, s] = [i, s, n, r]), { anchorNode: n, anchorOffset: r, focusNode: i, focusOffset: s };
}
function ik(t, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(t.root)[0];
    if (i)
      return Mu(t, i);
  }
  let n;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), n = i.getTargetRanges()[0];
  }
  return t.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), t.dom.removeEventListener("beforeinput", r, !0), n ? Mu(t, n) : null;
}
function sk(t, e) {
  for (let n = e.parentNode; n && n != t.dom; n = n.parentNode) {
    let r = t.docView.nearestDesc(n, !0);
    if (r && r.node.isBlock)
      return n;
  }
  return null;
}
function ok(t, e, n) {
  let { node: r, fromOffset: i, toOffset: s, from: o, to: l } = t.docView.parseRange(e, n), a = t.domSelectionRange(), c, u = a.anchorNode;
  if (u && t.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: a.anchorOffset }], Lo(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), Pe && t.input.lastKeyCode === 8)
    for (let g = s; g > i; g--) {
      let v = r.childNodes[g - 1], y = v.pmViewDesc;
      if (v.nodeName == "BR" && !y) {
        s = g;
        break;
      }
      if (!y || y.size)
        break;
    }
  let d = t.state.doc, f = t.someProp("domParser") || bn.fromSchema(t.state.schema), h = d.resolve(o), p = null, m = f.parse(r, {
    topNode: h.parent,
    topMatch: h.parent.contentMatchAt(h.index()),
    topOpen: !0,
    from: i,
    to: s,
    preserveWhitespace: h.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: lk,
    context: h
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, v = c[1] && c[1].pos;
    v == null && (v = g), p = { anchor: g + o, head: v + o };
  }
  return { doc: m, sel: p, from: o, to: l };
}
function lk(t) {
  let e = t.pmViewDesc;
  if (e)
    return e.parseRule();
  if (t.nodeName == "BR" && t.parentNode) {
    if (We && /^(ul|ol)$/i.test(t.parentNode.nodeName)) {
      let n = document.createElement("div");
      return n.appendChild(document.createElement("li")), { skip: n };
    } else if (t.parentNode.lastChild == t || We && /^(tr|table)$/i.test(t.parentNode.nodeName))
      return { ignore: !0 };
  } else if (t.nodeName == "IMG" && t.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const ak = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function ck(t, e, n, r, i) {
  let s = t.input.compositionPendingChanges || (t.composing ? t.input.compositionID : 0);
  if (t.input.compositionPendingChanges = 0, e < 0) {
    let S = t.input.lastSelectionTime > Date.now() - 50 ? t.input.lastSelectionOrigin : null, O = ja(t, S);
    if (O && !t.state.selection.eq(O)) {
      if (Pe && Gt && t.input.lastKeyCode === 13 && Date.now() - 100 < t.input.lastKeyCodeTime && t.someProp("handleKeyDown", (U) => U(t, Hn(13, "Enter"))))
        return;
      let R = t.state.tr.setSelection(O);
      S == "pointer" ? R.setMeta("pointer", !0) : S == "key" && R.scrollIntoView(), s && R.setMeta("composition", s), t.dispatch(R);
    }
    return;
  }
  let o = t.state.doc.resolve(e), l = o.sharedDepth(n);
  e = o.before(l + 1), n = t.state.doc.resolve(n).after(l + 1);
  let a = t.state.selection, c = ok(t, e, n), u = t.state.doc, d = u.slice(c.from, c.to), f, h;
  t.input.lastKeyCode === 8 && Date.now() - 100 < t.input.lastKeyCodeTime ? (f = t.state.selection.to, h = "end") : (f = t.state.selection.from, h = "start"), t.input.lastKeyCode = null;
  let p = fk(d.content, c.doc.content, c.from, f, h);
  if (p && t.input.domChangeCount++, (Hr && t.input.lastIOSEnter > Date.now() - 225 || Gt) && i.some((S) => S.nodeType == 1 && !ak.test(S.nodeName)) && (!p || p.endA >= p.endB) && t.someProp("handleKeyDown", (S) => S(t, Hn(13, "Enter")))) {
    t.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof j && !a.empty && a.$head.sameParent(a.$anchor) && !t.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let S = Eu(t, t.state.doc, c.sel);
        if (S && !S.eq(t.state.selection)) {
          let O = t.state.tr.setSelection(S);
          s && O.setMeta("composition", s), t.dispatch(O);
        }
      }
      return;
    }
  t.state.selection.from < t.state.selection.to && p.start == p.endB && t.state.selection instanceof j && (p.start > t.state.selection.from && p.start <= t.state.selection.from + 2 && t.state.selection.from >= c.from ? p.start = t.state.selection.from : p.endA < t.state.selection.to && p.endA >= t.state.selection.to - 2 && t.state.selection.to <= c.to && (p.endB += t.state.selection.to - p.endA, p.endA = t.state.selection.to)), $e && kn <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), g = c.doc.resolveNoCache(p.endB - c.from), v = u.resolve(p.start), y = m.sameParent(g) && m.parent.inlineContent && v.end() >= p.endA;
  if ((Hr && t.input.lastIOSEnter > Date.now() - 225 && (!y || i.some((S) => S.nodeName == "DIV" || S.nodeName == "P")) || !y && m.pos < c.doc.content.size && (!m.sameParent(g) || !m.parent.inlineContent) && m.pos < g.pos && !/\S/.test(c.doc.textBetween(m.pos, g.pos, "", ""))) && t.someProp("handleKeyDown", (S) => S(t, Hn(13, "Enter")))) {
    t.input.lastIOSEnter = 0;
    return;
  }
  if (t.state.selection.anchor > p.start && dk(u, p.start, p.endA, m, g) && t.someProp("handleKeyDown", (S) => S(t, Hn(8, "Backspace")))) {
    Gt && Pe && t.domObserver.suppressSelectionUpdates();
    return;
  }
  Pe && p.endB == p.start && (t.input.lastChromeDelete = Date.now()), Gt && !y && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, g = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    t.someProp("handleKeyDown", function(S) {
      return S(t, Hn(13, "Enter"));
    });
  }, 20));
  let b = p.start, k = p.endA, x = (S) => {
    let O = S || t.state.tr.replace(b, k, c.doc.slice(p.start - c.from, p.endB - c.from));
    if (c.sel) {
      let R = Eu(t, O.doc, c.sel);
      R && !(Pe && t.composing && R.empty && (p.start != p.endB || t.input.lastChromeDelete < Date.now() - 100) && (R.head == b || R.head == O.mapping.map(k) - 1) || $e && R.empty && R.head == b) && O.setSelection(R);
    }
    return s && O.setMeta("composition", s), O.scrollIntoView();
  }, C;
  if (y)
    if (m.pos == g.pos) {
      $e && kn <= 11 && m.parentOffset == 0 && (t.domObserver.suppressSelectionUpdates(), setTimeout(() => Xt(t), 20));
      let S = x(t.state.tr.delete(b, k)), O = u.resolve(p.start).marksAcross(u.resolve(p.endA));
      O && S.ensureMarks(O), t.dispatch(S);
    } else if (
      // Adding or removing a mark
      p.endA == p.endB && (C = uk(m.parent.content.cut(m.parentOffset, g.parentOffset), v.parent.content.cut(v.parentOffset, p.endA - v.start())))
    ) {
      let S = x(t.state.tr);
      C.type == "add" ? S.addMark(b, k, C.mark) : S.removeMark(b, k, C.mark), t.dispatch(S);
    } else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let S = m.parent.textBetween(m.parentOffset, g.parentOffset), O = () => x(t.state.tr.insertText(S, b, k));
      t.someProp("handleTextInput", (R) => R(t, b, k, S, O)) || t.dispatch(O());
    } else
      t.dispatch(x());
  else
    t.dispatch(x());
}
function Eu(t, e, n) {
  return Math.max(n.anchor, n.head) > e.content.size ? null : Wa(t, e.resolve(n.anchor), e.resolve(n.head));
}
function uk(t, e) {
  let n = t.firstChild.marks, r = e.firstChild.marks, i = n, s = r, o, l, a;
  for (let u = 0; u < r.length; u++)
    i = r[u].removeFromSet(i);
  for (let u = 0; u < n.length; u++)
    s = n[u].removeFromSet(s);
  if (i.length == 1 && s.length == 0)
    l = i[0], o = "add", a = (u) => u.mark(l.addToSet(u.marks));
  else if (i.length == 0 && s.length == 1)
    l = s[0], o = "remove", a = (u) => u.mark(l.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(a(e.child(u)));
  if (E.from(c).eq(t))
    return { mark: l, type: o };
}
function dk(t, e, n, r, i) {
  if (
    // The content must have shrunk
    n - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    pl(r, !0, !1) < i.pos
  )
    return !1;
  let s = t.resolve(e);
  if (!r.parent.isTextblock) {
    let l = s.nodeAfter;
    return l != null && n == e + l.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = t.resolve(pl(s, !0, !0));
  return !o.parent.isTextblock || o.pos > n || pl(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function pl(t, e, n) {
  let r = t.depth, i = e ? t.end() : t.pos;
  for (; r > 0 && (e || t.indexAfter(r) == t.node(r).childCount); )
    r--, i++, e = !1;
  if (n) {
    let s = t.node(r).maybeChild(t.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, i++;
  }
  return i;
}
function fk(t, e, n, r, i) {
  let s = t.findDiffStart(e, n);
  if (s == null)
    return null;
  let { a: o, b: l } = t.findDiffEnd(e, n + t.size, n + e.size);
  if (i == "end") {
    let a = Math.max(0, s - Math.min(o, l));
    r -= o + a - s;
  }
  if (o < s && t.size < e.size) {
    let a = r <= s && r >= o ? s - r : 0;
    s -= a, s && s < e.size && Tu(e.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), l = s + (l - o), o = s;
  } else if (l < s) {
    let a = r <= s && r >= l ? s - r : 0;
    s -= a, s && s < t.size && Tu(t.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), o = s + (o - l), l = s;
  }
  return { start: s, endA: o, endB: l };
}
function Tu(t) {
  if (t.length != 2)
    return !1;
  let e = t.charCodeAt(0), n = t.charCodeAt(1);
  return e >= 56320 && e <= 57343 && n >= 55296 && n <= 56319;
}
class Ah {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, n) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Nb(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = n, this.state = n.state, this.directPlugins = n.plugins || [], this.directPlugins.forEach(Iu), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Ou(this), _u(this), this.nodeViews = Nu(this), this.docView = au(this.state.doc, Au(this), hl(this), this.dom, this), this.domObserver = new nk(this, (r, i, s, o) => ck(this, r, i, s, o)), this.domObserver.start(), Ib(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let n in e)
        this._props[n] = e[n];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && ea(this);
    let n = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(Iu), this.directPlugins = e.plugins), this.updateStateInner(e.state, n);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let n = {};
    for (let r in this._props)
      n[r] = this._props[r];
    n.state = this.state;
    for (let r in e)
      n[r] = e[r];
    this.update(n);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, n) {
    var r;
    let i = this.state, s = !1, o = !1;
    e.storedMarks && this.composing && (wh(this), o = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != n.plugins;
    if (l || this._props.plugins != n.plugins || this._props.nodeViews != n.nodeViews) {
      let h = Nu(this);
      pk(h, this.nodeViews) && (this.nodeViews = h, s = !0);
    }
    (l || n.handleDOMEvents != this._props.handleDOMEvents) && ea(this), this.editable = Ou(this), _u(this);
    let a = hl(this), c = Au(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", d = s || !this.docView.matchesNode(e.doc, c, a);
    (d || !e.selection.eq(i.selection)) && (o = !0);
    let f = u == "preserve" && o && this.dom.style.overflowAnchor == null && Ky(this);
    if (o) {
      this.domObserver.stop();
      let h = d && ($e || Pe) && !this.composing && !i.selection.empty && !e.selection.empty && hk(i.selection, e.selection);
      if (d) {
        let p = Pe ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = qb(this)), (s || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = au(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (h = !0);
      }
      h || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && gb(this)) ? Xt(this, h) : (ch(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : f && Jy(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (n) => n(this))) if (this.state.selection instanceof B) {
        let n = this.docView.domAfterPos(this.state.selection.from);
        n.nodeType == 1 && nu(this, n.getBoundingClientRect(), e);
      } else
        nu(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let n = 0; n < this.directPlugins.length; n++) {
        let r = this.directPlugins[n];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let n = 0; n < this.state.plugins.length; n++) {
        let r = this.state.plugins[n];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let n = 0; n < this.pluginViews.length; n++) {
        let r = this.pluginViews[n];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, n) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - n.doc.content.size);
      (s > 0 && this.state.doc.nodeAt(s)) == r.node && (i = s);
    }
    this.dragging = new Sh(e.slice, e.move, i < 0 ? void 0 : B.create(this.state.doc, i));
  }
  someProp(e, n) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = n ? n(r) : r))
      return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (i = n ? n(l) : l))
        return i;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let l = s[o].props[e];
        if (l != null && (i = n ? n(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if ($e) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && $y(this.dom), Xt(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let n = this.dom.parentNode; n; n = n.parentNode)
        if (n.nodeType == 9 || n.nodeType == 11 && n.host)
          return n.getSelection || (Object.getPrototypeOf(n).getSelection = () => n.ownerDocument.getSelection()), this._root = n;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return Zy(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, n = 1) {
    return th(this, e, n);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, n = 0) {
    return this.docView.domFromPos(e, n);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let n = this.docView.descAt(e);
    return n ? n.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, n, r = -1) {
    let i = this.docView.posFromDOM(e, n, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, n) {
    return ib(this, n || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, n) {
    return Ri(this, "", e, !1, n || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, n) {
    return Ri(this, e, null, !0, n || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return Ua(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (Db(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], hl(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Ly());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return Lb(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? We && this.root.nodeType === 11 && Vy(this.dom.ownerDocument) == this.dom && ik(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
Ah.prototype.dispatch = function(t) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, t) : this.updateState(this.state.apply(t));
};
function Au(t) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(t.editable), t.someProp("attributes", (n) => {
    if (typeof n == "function" && (n = n(t.state)), n)
      for (let r in n)
        r == "class" ? e.class += " " + n[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + n[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(n[r]));
  }), e.translate || (e.translate = "no"), [Ve.node(0, t.state.doc.content.size, e)];
}
function _u(t) {
  if (t.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), t.cursorWrapper = { dom: e, deco: Ve.widget(t.state.selection.from, e, { raw: !0, marks: t.markCursor }) };
  } else
    t.cursorWrapper = null;
}
function Ou(t) {
  return !t.someProp("editable", (e) => e(t.state) === !1);
}
function hk(t, e) {
  let n = Math.min(t.$anchor.sharedDepth(t.head), e.$anchor.sharedDepth(e.head));
  return t.$anchor.start(n) != e.$anchor.start(n);
}
function Nu(t) {
  let e = /* @__PURE__ */ Object.create(null);
  function n(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return t.someProp("nodeViews", n), t.someProp("markViews", n), e;
}
function pk(t, e) {
  let n = 0, r = 0;
  for (let i in t) {
    if (t[i] != e[i])
      return !0;
    n++;
  }
  for (let i in e)
    r++;
  return n != r;
}
function Iu(t) {
  if (t.spec.state || t.spec.filterTransaction || t.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var Tn = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, js = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, mk = typeof navigator < "u" && /Mac/.test(navigator.platform), gk = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var Ie = 0; Ie < 10; Ie++) Tn[48 + Ie] = Tn[96 + Ie] = String(Ie);
for (var Ie = 1; Ie <= 24; Ie++) Tn[Ie + 111] = "F" + Ie;
for (var Ie = 65; Ie <= 90; Ie++)
  Tn[Ie] = String.fromCharCode(Ie + 32), js[Ie] = String.fromCharCode(Ie);
for (var ml in Tn) js.hasOwnProperty(ml) || (js[ml] = Tn[ml]);
function vk(t) {
  var e = mk && t.metaKey && t.shiftKey && !t.ctrlKey && !t.altKey || gk && t.shiftKey && t.key && t.key.length == 1 || t.key == "Unidentified", n = !e && t.key || (t.shiftKey ? js : Tn)[t.keyCode] || t.key || "Unidentified";
  return n == "Esc" && (n = "Escape"), n == "Del" && (n = "Delete"), n == "Left" && (n = "ArrowLeft"), n == "Up" && (n = "ArrowUp"), n == "Right" && (n = "ArrowRight"), n == "Down" && (n = "ArrowDown"), n;
}
const yk = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), bk = typeof navigator < "u" && /Win/.test(navigator.platform);
function kk(t) {
  let e = t.split(/-(?!$)/), n = e[e.length - 1];
  n == "Space" && (n = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      yk ? o = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), o && (n = "Meta-" + n), s && (n = "Shift-" + n), n;
}
function wk(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t)
    e[kk(n)] = t[n];
  return e;
}
function gl(t, e, n = !0) {
  return e.altKey && (t = "Alt-" + t), e.ctrlKey && (t = "Ctrl-" + t), e.metaKey && (t = "Meta-" + t), n && e.shiftKey && (t = "Shift-" + t), t;
}
function xk(t) {
  return new ce({ props: { handleKeyDown: _h(t) } });
}
function _h(t) {
  let e = wk(t);
  return function(n, r) {
    let i = vk(r), s, o = e[gl(i, r)];
    if (o && o(n.state, n.dispatch, n))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[gl(i, r, !1)];
        if (l && l(n.state, n.dispatch, n))
          return !0;
      }
      if ((r.altKey || r.metaKey || r.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(bk && r.ctrlKey && r.altKey) && (s = Tn[r.keyCode]) && s != i) {
        let l = e[gl(s, r)];
        if (l && l(n.state, n.dispatch, n))
          return !0;
      }
    }
    return !1;
  };
}
var Sk = Object.defineProperty, Ya = (t, e) => {
  for (var n in e)
    Sk(t, n, { get: e[n], enumerable: !0 });
};
function zo(t) {
  const { state: e, transaction: n } = t;
  let { selection: r } = n, { doc: i } = n, { storedMarks: s } = n;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = n.selection, i = n.doc, s = n.storedMarks, n;
    }
  };
}
var Fo = class {
  constructor(t) {
    this.editor = t.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = t.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: t, editor: e, state: n } = this, { view: r } = e, { tr: i } = n, s = this.buildProps(i);
    return Object.fromEntries(
      Object.entries(t).map(([o, l]) => [o, (...c) => {
        const u = l(...c)(s);
        return !i.getMeta("preventDispatch") && !this.hasCustomState && r.dispatch(i), u;
      }])
    );
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(t, e = !0) {
    const { rawCommands: n, editor: r, state: i } = this, { view: s } = r, o = [], l = !!t, a = t || i.tr, c = () => (!l && e && !a.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(a), o.every((d) => d === !0)), u = {
      ...Object.fromEntries(
        Object.entries(n).map(([d, f]) => [d, (...p) => {
          const m = this.buildProps(a, e), g = f(...p)(m);
          return o.push(g), u;
        }])
      ),
      run: c
    };
    return u;
  }
  createCan(t) {
    const { rawCommands: e, state: n } = this, r = !1, i = t || n.tr, s = this.buildProps(i, r);
    return {
      ...Object.fromEntries(
        Object.entries(e).map(([l, a]) => [l, (...c) => a(...c)({ ...s, dispatch: void 0 })])
      ),
      chain: () => this.createChain(i, r)
    };
  }
  buildProps(t, e = !0) {
    const { rawCommands: n, editor: r, state: i } = this, { view: s } = r, o = {
      tr: t,
      editor: r,
      view: s,
      state: zo({
        state: i,
        transaction: t
      }),
      dispatch: e ? () => {
      } : void 0,
      chain: () => this.createChain(t, e),
      can: () => this.createCan(t),
      get commands() {
        return Object.fromEntries(
          Object.entries(n).map(([l, a]) => [l, (...c) => a(...c)(o)])
        );
      }
    };
    return o;
  }
}, Oh = {};
Ya(Oh, {
  blur: () => Ck,
  clearContent: () => Mk,
  clearNodes: () => Ek,
  command: () => Tk,
  createParagraphNear: () => Ak,
  cut: () => _k,
  deleteCurrentNode: () => Ok,
  deleteNode: () => Nk,
  deleteRange: () => Ik,
  deleteSelection: () => Dk,
  enter: () => Rk,
  exitCode: () => Lk,
  extendMarkRange: () => Pk,
  first: () => Bk,
  focus: () => Fk,
  forEach: () => Vk,
  insertContent: () => Hk,
  insertContentAt: () => Uk,
  joinBackward: () => Jk,
  joinDown: () => Kk,
  joinForward: () => $k,
  joinItemBackward: () => Gk,
  joinItemForward: () => Yk,
  joinTextblockBackward: () => Xk,
  joinTextblockForward: () => Qk,
  joinUp: () => qk,
  keyboardShortcut: () => ew,
  lift: () => tw,
  liftEmptyBlock: () => nw,
  liftListItem: () => rw,
  newlineInCode: () => iw,
  resetAttributes: () => sw,
  scrollIntoView: () => ow,
  selectAll: () => lw,
  selectNodeBackward: () => aw,
  selectNodeForward: () => cw,
  selectParentNode: () => uw,
  selectTextblockEnd: () => dw,
  selectTextblockStart: () => fw,
  setContent: () => hw,
  setMark: () => Nw,
  setMeta: () => Iw,
  setNode: () => Dw,
  setNodeSelection: () => Rw,
  setTextSelection: () => Lw,
  sinkListItem: () => Pw,
  splitBlock: () => Bw,
  splitListItem: () => zw,
  toggleList: () => Fw,
  toggleMark: () => Vw,
  toggleNode: () => Hw,
  toggleWrap: () => jw,
  undoInputRule: () => Ww,
  unsetAllMarks: () => Uw,
  unsetMark: () => qw,
  updateAttributes: () => Kw,
  wrapIn: () => Jw,
  wrapInList: () => $w
});
var Ck = () => ({ editor: t, view: e }) => (requestAnimationFrame(() => {
  var n;
  t.isDestroyed || (e.dom.blur(), (n = window == null ? void 0 : window.getSelection()) == null || n.removeAllRanges());
}), !0), Mk = (t = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: t }), Ek = () => ({ state: t, tr: e, dispatch: n }) => {
  const { selection: r } = e, { ranges: i } = r;
  return n && i.forEach(({ $from: s, $to: o }) => {
    t.doc.nodesBetween(s.pos, o.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h)
        return;
      const p = qr(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, Tk = (t) => (e) => t(e), Ak = () => ({ state: t, dispatch: e }) => qf(t, e), _k = (t, e) => ({ editor: n, tr: r }) => {
  const { state: i } = n, s = i.doc.slice(t.from, t.to);
  r.deleteRange(t.from, t.to);
  const o = r.mapping.map(e);
  return r.insert(o, s.content), r.setSelection(new j(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, Ok = () => ({ tr: t, dispatch: e }) => {
  const { selection: n } = t, r = n.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = t.selection.$anchor;
  for (let s = i.depth; s > 0; s -= 1)
    if (i.node(s).type === r.type) {
      if (e) {
        const l = i.before(s), a = i.after(s);
        t.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
};
function pe(t, e) {
  if (typeof t == "string") {
    if (!e.nodes[t])
      throw Error(`There is no node type named '${t}'. Maybe you forgot to add the extension?`);
    return e.nodes[t];
  }
  return t;
}
var Nk = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const i = pe(t, n.schema), s = e.selection.$anchor;
  for (let o = s.depth; o > 0; o -= 1)
    if (s.node(o).type === i) {
      if (r) {
        const a = s.before(o), c = s.after(o);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Ik = (t) => ({ tr: e, dispatch: n }) => {
  const { from: r, to: i } = t;
  return n && e.delete(r, i), !0;
}, Dk = () => ({ state: t, dispatch: e }) => Pa(t, e), Rk = () => ({ commands: t }) => t.keyboardShortcut("Enter"), Lk = () => ({ state: t, dispatch: e }) => ky(t, e);
function Xa(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}
function Ws(t, e, n = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => n.strict ? e[i] === t[i] : Xa(e[i]) ? e[i].test(t[i]) : e[i] === t[i]) : !0;
}
function Nh(t, e, n = {}) {
  return t.find((r) => r.type === e && Ws(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(n).map((i) => [i, r.attrs[i]])),
    n
  ));
}
function Du(t, e, n = {}) {
  return !!Nh(t, e, n);
}
function Qa(t, e, n) {
  var r;
  if (!t || !e)
    return;
  let i = t.parent.childAfter(t.parentOffset);
  if ((!i.node || !i.node.marks.some((u) => u.type === e)) && (i = t.parent.childBefore(t.parentOffset)), !i.node || !i.node.marks.some((u) => u.type === e) || (n = n || ((r = i.node.marks[0]) == null ? void 0 : r.attrs), !Nh([...i.node.marks], e, n)))
    return;
  let o = i.index, l = t.start() + i.offset, a = o + 1, c = l + i.node.nodeSize;
  for (; o > 0 && Du([...t.parent.child(o - 1).marks], e, n); )
    o -= 1, l -= t.parent.child(o).nodeSize;
  for (; a < t.parent.childCount && Du([...t.parent.child(a).marks], e, n); )
    c += t.parent.child(a).nodeSize, a += 1;
  return {
    from: l,
    to: c
  };
}
function en(t, e) {
  if (typeof t == "string") {
    if (!e.marks[t])
      throw Error(`There is no mark type named '${t}'. Maybe you forgot to add the extension?`);
    return e.marks[t];
  }
  return t;
}
var Pk = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const s = en(t, r.schema), { doc: o, selection: l } = n, { $from: a, from: c, to: u } = l;
  if (i) {
    const d = Qa(a, s, e);
    if (d && d.from <= c && d.to >= u) {
      const f = j.create(o, d.from, d.to);
      n.setSelection(f);
    }
  }
  return !0;
}, Bk = (t) => (e) => {
  const n = typeof t == "function" ? t(e) : t;
  for (let r = 0; r < n.length; r += 1)
    if (n[r](e))
      return !0;
  return !1;
};
function Ih(t) {
  return t instanceof j;
}
function Jn(t = 0, e = 0, n = 0) {
  return Math.min(Math.max(t, e), n);
}
function Dh(t, e = null) {
  if (!e)
    return null;
  const n = K.atStart(t), r = K.atEnd(t);
  if (e === "start" || e === !0)
    return n;
  if (e === "end")
    return r;
  const i = n.from, s = r.to;
  return e === "all" ? j.create(t, Jn(0, i, s), Jn(t.content.size, i, s)) : j.create(t, Jn(e, i, s), Jn(e, i, s));
}
function zk() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function Za() {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || // iPad on iOS 13 detection
  navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
var Fk = (t = null, e = {}) => ({ editor: n, view: r, tr: i, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    (Za() || zk()) && r.dom.focus(), requestAnimationFrame(() => {
      n.isDestroyed || (r.focus(), e != null && e.scrollIntoView && n.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && t === null || t === !1)
    return !0;
  if (s && t === null && !Ih(n.state.selection))
    return o(), !0;
  const l = Dh(i.doc, t) || n.state.selection, a = n.state.selection.eq(l);
  return s && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, Vk = (t, e) => (n) => t.every((r, i) => e(r, { ...n, index: i })), Hk = (t, e) => ({ tr: n, commands: r }) => r.insertContentAt({ from: n.selection.from, to: n.selection.to }, t, e), Rh = (t) => {
  const e = t.childNodes;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const r = e[n];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? t.removeChild(r) : r.nodeType === 1 && Rh(r);
  }
  return t;
};
function as(t) {
  if (typeof window > "u")
    throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${t}</body>`, n = new window.DOMParser().parseFromString(e, "text/html").body;
  return Rh(n);
}
function Pi(t, e, n) {
  if (t instanceof Ct || t instanceof E)
    return t;
  n = {
    slice: !0,
    parseOptions: {},
    ...n
  };
  const r = typeof t == "object" && t !== null, i = typeof t == "string";
  if (r)
    try {
      if (Array.isArray(t) && t.length > 0)
        return E.fromArray(t.map((l) => e.nodeFromJSON(l)));
      const o = e.nodeFromJSON(t);
      return n.errorOnInvalidContent && o.check(), o;
    } catch (s) {
      if (n.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: s });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", t, "Error:", s), Pi("", e, n);
    }
  if (i) {
    if (n.errorOnInvalidContent) {
      let o = !1, l = "";
      const a = new yf({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (c) => (o = !0, l = typeof c == "string" ? c : c.outerHTML, null)
              }
            ]
          }
        })
      });
      if (n.slice ? bn.fromSchema(a).parseSlice(as(t), n.parseOptions) : bn.fromSchema(a).parse(as(t), n.parseOptions), n.errorOnInvalidContent && o)
        throw new Error("[tiptap error]: Invalid HTML content", {
          cause: new Error(`Invalid element found: ${l}`)
        });
    }
    const s = bn.fromSchema(e);
    return n.slice ? s.parseSlice(as(t), n.parseOptions).content : s.parse(as(t), n.parseOptions);
  }
  return Pi("", e, n);
}
function jk(t, e, n) {
  const r = t.steps.length - 1;
  if (r < e)
    return;
  const i = t.steps[r];
  if (!(i instanceof we || i instanceof xe))
    return;
  const s = t.mapping.maps[r];
  let o = 0;
  s.forEach((l, a, c, u) => {
    o === 0 && (o = u);
  }), t.setSelection(K.near(t.doc.resolve(o), n));
}
var Wk = (t) => !("type" in t), Uk = (t, e, n) => ({ tr: r, dispatch: i, editor: s }) => {
  var o;
  if (i) {
    n = {
      parseOptions: s.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...n
    };
    let l;
    const a = (g) => {
      s.emit("contentError", {
        editor: s,
        error: g,
        disableCollaboration: () => {
          "collaboration" in s.storage && typeof s.storage.collaboration == "object" && s.storage.collaboration && (s.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...n.parseOptions
    };
    if (!n.errorOnInvalidContent && !s.options.enableContentCheck && s.options.emitContentError)
      try {
        Pi(e, s.schema, {
          parseOptions: c,
          errorOnInvalidContent: !0
        });
      } catch (g) {
        a(g);
      }
    try {
      l = Pi(e, s.schema, {
        parseOptions: c,
        errorOnInvalidContent: (o = n.errorOnInvalidContent) != null ? o : s.options.enableContentCheck
      });
    } catch (g) {
      return a(g), !1;
    }
    let { from: u, to: d } = typeof t == "number" ? { from: t, to: t } : { from: t.from, to: t.to }, f = !0, h = !0;
    if ((Wk(l) ? l : [l]).forEach((g) => {
      g.check(), f = f ? g.isText && g.marks.length === 0 : !1, h = h ? g.isBlock : !1;
    }), u === d && h) {
      const { parent: g } = r.doc.resolve(u);
      g.isTextblock && !g.type.spec.code && !g.childCount && (u -= 1, d += 1);
    }
    let m;
    if (f) {
      if (Array.isArray(e))
        m = e.map((g) => g.text || "").join("");
      else if (e instanceof E) {
        let g = "";
        e.forEach((v) => {
          v.text && (g += v.text);
        }), m = g;
      } else typeof e == "object" && e && e.text ? m = e.text : m = e;
      r.insertText(m, u, d);
    } else {
      m = l;
      const g = r.doc.resolve(u), v = g.node(), y = g.parentOffset === 0, b = v.isText || v.isTextblock, k = v.content.size > 0;
      y && b && k && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    n.updateSelection && jk(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", { from: u, text: m }), n.applyPasteRules && r.setMeta("applyPasteRules", { from: u, text: m });
  }
  return !0;
}, qk = () => ({ state: t, dispatch: e }) => vy(t, e), Kk = () => ({ state: t, dispatch: e }) => yy(t, e), Jk = () => ({ state: t, dispatch: e }) => zf(t, e), $k = () => ({ state: t, dispatch: e }) => jf(t, e), Gk = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = Io(t.doc, t.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, Yk = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = Io(t.doc, t.selection.$from.pos, 1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, Xk = () => ({ state: t, dispatch: e }) => my(t, e), Qk = () => ({ state: t, dispatch: e }) => gy(t, e);
function Lh() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Zk(t) {
  const e = t.split(/-(?!$)/);
  let n = e[e.length - 1];
  n === "Space" && (n = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      Za() || Lh() ? o = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), s && (n = `Shift-${n}`), n;
}
var ew = (t) => ({ editor: e, view: n, tr: r, dispatch: i }) => {
  const s = Zk(t).split(/-(?!$)/), o = s.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    n.someProp("handleKeyDown", (c) => c(n, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function An(t, e, n = {}) {
  const { from: r, to: i, empty: s } = t.selection, o = e ? pe(e, t.schema) : null, l = [];
  t.doc.nodesBetween(r, i, (d, f) => {
    if (d.isText)
      return;
    const h = Math.max(r, f), p = Math.min(i, f + d.nodeSize);
    l.push({
      node: d,
      from: h,
      to: p
    });
  });
  const a = i - r, c = l.filter((d) => o ? o.name === d.node.type.name : !0).filter((d) => Ws(d.node.attrs, n, { strict: !1 }));
  return s ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= a;
}
var tw = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = pe(t, n.schema);
  return An(n, i, e) ? by(n, r) : !1;
}, nw = () => ({ state: t, dispatch: e }) => Kf(t, e), rw = (t) => ({ state: e, dispatch: n }) => {
  const r = pe(t, e.schema);
  return Ny(r)(e, n);
}, iw = () => ({ state: t, dispatch: e }) => Uf(t, e);
function Vo(t, e) {
  return e.nodes[t] ? "node" : e.marks[t] ? "mark" : null;
}
function Ru(t, e) {
  const n = typeof e == "string" ? [e] : e;
  return Object.keys(t).reduce((r, i) => (n.includes(i) || (r[i] = t[i]), r), {});
}
var sw = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = Vo(
    typeof t == "string" ? t : t.name,
    r.schema
  );
  return l ? (l === "node" && (s = pe(t, r.schema)), l === "mark" && (o = en(t, r.schema)), i && n.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, u) => {
      s && s === c.type && n.setNodeMarkup(u, void 0, Ru(c.attrs, e)), o && c.marks.length && c.marks.forEach((d) => {
        o === d.type && n.addMark(u, u + c.nodeSize, o.create(Ru(d.attrs, e)));
      });
    });
  }), !0) : !1;
}, ow = () => ({ tr: t, dispatch: e }) => (e && t.scrollIntoView(), !0), lw = () => ({ tr: t, dispatch: e }) => {
  if (e) {
    const n = new st(t.doc);
    t.setSelection(n);
  }
  return !0;
}, aw = () => ({ state: t, dispatch: e }) => Vf(t, e), cw = () => ({ state: t, dispatch: e }) => Wf(t, e), uw = () => ({ state: t, dispatch: e }) => Sy(t, e), dw = () => ({ state: t, dispatch: e }) => Ey(t, e), fw = () => ({ state: t, dispatch: e }) => My(t, e);
function ta(t, e, n = {}, r = {}) {
  return Pi(t, e, {
    slice: !1,
    parseOptions: n,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
var hw = (t, { errorOnInvalidContent: e, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: s, dispatch: o, commands: l }) => {
  const { doc: a } = s;
  if (r.preserveWhitespace !== "full") {
    const c = ta(t, i.schema, r, {
      errorOnInvalidContent: e ?? i.options.enableContentCheck
    });
    return o && s.replaceWith(0, a.content.size, c).setMeta("preventUpdate", !n), !0;
  }
  return o && s.setMeta("preventUpdate", !n), l.insertContentAt({ from: 0, to: a.content.size }, t, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function Ph(t, e) {
  const n = en(e, t.schema), { from: r, to: i, empty: s } = t.selection, o = [];
  s ? (t.storedMarks && o.push(...t.storedMarks), o.push(...t.selection.$head.marks())) : t.doc.nodesBetween(r, i, (a) => {
    o.push(...a.marks);
  });
  const l = o.find((a) => a.type.name === n.name);
  return l ? { ...l.attrs } : {};
}
function Bh(t, e) {
  const n = new Rf(t);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      n.step(i);
    });
  }), n;
}
function pw(t) {
  for (let e = 0; e < t.edgeCount; e += 1) {
    const { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
function mw(t, e, n) {
  const r = [];
  return t.nodesBetween(e.from, e.to, (i, s) => {
    n(i) && r.push({
      node: i,
      pos: s
    });
  }), r;
}
function gw(t, e) {
  for (let n = t.depth; n > 0; n -= 1) {
    const r = t.node(n);
    if (e(r))
      return {
        pos: n > 0 ? t.before(n) : 0,
        start: t.start(n),
        depth: n,
        node: r
      };
  }
}
function Ho(t) {
  return (e) => gw(e.$from, t);
}
function P(t, e, n) {
  return t.config[e] === void 0 && t.parent ? P(t.parent, e, n) : typeof t.config[e] == "function" ? t.config[e].bind({
    ...n,
    parent: t.parent ? P(t.parent, e, n) : null
  }) : t.config[e];
}
function ec(t) {
  return t.map((e) => {
    const n = {
      name: e.name,
      options: e.options,
      storage: e.storage
    }, r = P(e, "addExtensions", n);
    return r ? [e, ...ec(r())] : e;
  }).flat(10);
}
function tc(t, e) {
  const n = mr.fromSchema(e).serializeFragment(t), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(n), i.innerHTML;
}
function zh(t) {
  return typeof t == "function";
}
function X(t, e = void 0, ...n) {
  return zh(t) ? e ? t.bind(e)(...n) : t(...n) : t;
}
function vw(t = {}) {
  return Object.keys(t).length === 0 && t.constructor === Object;
}
function Bi(t) {
  const e = t.filter((i) => i.type === "extension"), n = t.filter((i) => i.type === "node"), r = t.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: n,
    markExtensions: r
  };
}
function Fh(t) {
  const e = [], { nodeExtensions: n, markExtensions: r } = Bi(t), i = [...n, ...r], s = {
    default: null,
    validate: void 0,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return t.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage,
      extensions: i
    }, a = P(
      o,
      "addGlobalAttributes",
      l
    );
    if (!a)
      return;
    a().forEach((u) => {
      u.types.forEach((d) => {
        Object.entries(u.attributes).forEach(([f, h]) => {
          e.push({
            type: d,
            name: f,
            attribute: {
              ...s,
              ...h
            }
          });
        });
      });
    });
  }), i.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage
    }, a = P(
      o,
      "addAttributes",
      l
    );
    if (!a)
      return;
    const c = a();
    Object.entries(c).forEach(([u, d]) => {
      const f = {
        ...s,
        ...d
      };
      typeof (f == null ? void 0 : f.default) == "function" && (f.default = f.default()), f != null && f.isRequired && (f == null ? void 0 : f.default) === void 0 && delete f.default, e.push({
        type: o.name,
        name: u,
        attribute: f
      });
    });
  }), e;
}
function me(...t) {
  return t.filter((e) => !!e).reduce((e, n) => {
    const r = { ...e };
    return Object.entries(n).forEach(([i, s]) => {
      if (!r[i]) {
        r[i] = s;
        return;
      }
      if (i === "class") {
        const l = s ? String(s).split(" ") : [], a = r[i] ? r[i].split(" ") : [], c = l.filter((u) => !a.includes(u));
        r[i] = [...a, ...c].join(" ");
      } else if (i === "style") {
        const l = s ? s.split(";").map((u) => u.trim()).filter(Boolean) : [], a = r[i] ? r[i].split(";").map((u) => u.trim()).filter(Boolean) : [], c = /* @__PURE__ */ new Map();
        a.forEach((u) => {
          const [d, f] = u.split(":").map((h) => h.trim());
          c.set(d, f);
        }), l.forEach((u) => {
          const [d, f] = u.split(":").map((h) => h.trim());
          c.set(d, f);
        }), r[i] = Array.from(c.entries()).map(([u, d]) => `${u}: ${d}`).join("; ");
      } else
        r[i] = s;
    }), r;
  }, {});
}
function Us(t, e) {
  return e.filter((n) => n.type === t.type.name).filter((n) => n.attribute.rendered).map((n) => n.attribute.renderHTML ? n.attribute.renderHTML(t.attrs) || {} : {
    [n.name]: t.attrs[n.name]
  }).reduce((n, r) => me(n, r), {});
}
function yw(t) {
  return typeof t != "string" ? t : t.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(t) : t === "true" ? !0 : t === "false" ? !1 : t;
}
function Lu(t, e) {
  return "style" in t ? t : {
    ...t,
    getAttrs: (n) => {
      const r = t.getAttrs ? t.getAttrs(n) : t.attrs;
      if (r === !1)
        return !1;
      const i = e.reduce((s, o) => {
        const l = o.attribute.parseHTML ? o.attribute.parseHTML(n) : yw(n.getAttribute(o.name));
        return l == null ? s : {
          ...s,
          [o.name]: l
        };
      }, {});
      return { ...r, ...i };
    }
  };
}
function Pu(t) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(t).filter(([e, n]) => e === "attrs" && vw(n) ? !1 : n != null)
  );
}
function bw(t, e) {
  var n;
  const r = Fh(t), { nodeExtensions: i, markExtensions: s } = Bi(t), o = (n = i.find((c) => P(c, "topNode"))) == null ? void 0 : n.name, l = Object.fromEntries(
    i.map((c) => {
      const u = r.filter((v) => v.type === c.name), d = {
        name: c.name,
        options: c.options,
        storage: c.storage,
        editor: e
      }, f = t.reduce((v, y) => {
        const b = P(y, "extendNodeSchema", d);
        return {
          ...v,
          ...b ? b(c) : {}
        };
      }, {}), h = Pu({
        ...f,
        content: X(P(c, "content", d)),
        marks: X(P(c, "marks", d)),
        group: X(P(c, "group", d)),
        inline: X(P(c, "inline", d)),
        atom: X(P(c, "atom", d)),
        selectable: X(P(c, "selectable", d)),
        draggable: X(P(c, "draggable", d)),
        code: X(P(c, "code", d)),
        whitespace: X(P(c, "whitespace", d)),
        linebreakReplacement: X(
          P(c, "linebreakReplacement", d)
        ),
        defining: X(P(c, "defining", d)),
        isolating: X(P(c, "isolating", d)),
        attrs: Object.fromEntries(
          u.map((v) => {
            var y, b;
            return [
              v.name,
              { default: (y = v == null ? void 0 : v.attribute) == null ? void 0 : y.default, validate: (b = v == null ? void 0 : v.attribute) == null ? void 0 : b.validate }
            ];
          })
        )
      }), p = X(P(c, "parseHTML", d));
      p && (h.parseDOM = p.map(
        (v) => Lu(v, u)
      ));
      const m = P(c, "renderHTML", d);
      m && (h.toDOM = (v) => m({
        node: v,
        HTMLAttributes: Us(v, u)
      }));
      const g = P(c, "renderText", d);
      return g && (h.toText = g), [c.name, h];
    })
  ), a = Object.fromEntries(
    s.map((c) => {
      const u = r.filter((g) => g.type === c.name), d = {
        name: c.name,
        options: c.options,
        storage: c.storage,
        editor: e
      }, f = t.reduce((g, v) => {
        const y = P(v, "extendMarkSchema", d);
        return {
          ...g,
          ...y ? y(c) : {}
        };
      }, {}), h = Pu({
        ...f,
        inclusive: X(P(c, "inclusive", d)),
        excludes: X(P(c, "excludes", d)),
        group: X(P(c, "group", d)),
        spanning: X(P(c, "spanning", d)),
        code: X(P(c, "code", d)),
        attrs: Object.fromEntries(
          u.map((g) => {
            var v, y;
            return [
              g.name,
              { default: (v = g == null ? void 0 : g.attribute) == null ? void 0 : v.default, validate: (y = g == null ? void 0 : g.attribute) == null ? void 0 : y.validate }
            ];
          })
        )
      }), p = X(P(c, "parseHTML", d));
      p && (h.parseDOM = p.map(
        (g) => Lu(g, u)
      ));
      const m = P(c, "renderHTML", d);
      return m && (h.toDOM = (g) => m({
        mark: g,
        HTMLAttributes: Us(g, u)
      })), [c.name, h];
    })
  );
  return new yf({
    topNode: o,
    nodes: l,
    marks: a
  });
}
function kw(t) {
  const e = t.filter((n, r) => t.indexOf(n) !== r);
  return Array.from(new Set(e));
}
function nc(t) {
  return t.sort((n, r) => {
    const i = P(n, "priority") || 100, s = P(r, "priority") || 100;
    return i > s ? -1 : i < s ? 1 : 0;
  });
}
function Vh(t) {
  const e = nc(ec(t)), n = kw(e.map((r) => r.name));
  return n.length && console.warn(
    `[tiptap warn]: Duplicate extension names found: [${n.map((r) => `'${r}'`).join(", ")}]. This can lead to issues.`
  ), e;
}
function Hh(t, e, n) {
  const { from: r, to: i } = e, { blockSeparator: s = `

`, textSerializers: o = {} } = n || {};
  let l = "";
  return t.nodesBetween(r, i, (a, c, u, d) => {
    var f;
    a.isBlock && c > r && (l += s);
    const h = o == null ? void 0 : o[a.type.name];
    if (h)
      return u && (l += h({
        node: a,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    a.isText && (l += (f = a == null ? void 0 : a.text) == null ? void 0 : f.slice(Math.max(r, c) - c, i - c));
  }), l;
}
function ww(t, e) {
  const n = {
    from: 0,
    to: t.content.size
  };
  return Hh(t, n, e);
}
function jh(t) {
  return Object.fromEntries(
    Object.entries(t.nodes).filter(([, e]) => e.spec.toText).map(([e, n]) => [e, n.spec.toText])
  );
}
function xw(t, e) {
  const n = pe(e, t.schema), { from: r, to: i } = t.selection, s = [];
  t.doc.nodesBetween(r, i, (l) => {
    s.push(l);
  });
  const o = s.reverse().find((l) => l.type.name === n.name);
  return o ? { ...o.attrs } : {};
}
function Wh(t, e) {
  const n = Vo(
    typeof e == "string" ? e : e.name,
    t.schema
  );
  return n === "node" ? xw(t, e) : n === "mark" ? Ph(t, e) : {};
}
function Sw(t, e = JSON.stringify) {
  const n = {};
  return t.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(n, i) ? !1 : n[i] = !0;
  });
}
function Cw(t) {
  const e = Sw(t);
  return e.length === 1 ? e : e.filter((n, r) => !e.filter((s, o) => o !== r).some((s) => n.oldRange.from >= s.oldRange.from && n.oldRange.to <= s.oldRange.to && n.newRange.from >= s.newRange.from && n.newRange.to <= s.newRange.to));
}
function Uh(t) {
  const { mapping: e, steps: n } = t, r = [];
  return e.maps.forEach((i, s) => {
    const o = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        o.push({ from: l, to: a });
      });
    else {
      const { from: l, to: a } = n[s];
      if (l === void 0 || a === void 0)
        return;
      o.push({ from: l, to: a });
    }
    o.forEach(({ from: l, to: a }) => {
      const c = e.slice(s).map(l, -1), u = e.slice(s).map(a), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), Cw(r);
}
function rc(t, e, n) {
  const r = [];
  return t === e ? n.resolve(t).marks().forEach((i) => {
    const s = n.resolve(t), o = Qa(s, i.type);
    o && r.push({
      mark: i,
      ...o
    });
  }) : n.nodesBetween(t, e, (i, s) => {
    !i || (i == null ? void 0 : i.nodeSize) === void 0 || r.push(
      ...i.marks.map((o) => ({
        from: s,
        to: s + i.nodeSize,
        mark: o
      }))
    );
  }), r;
}
var Mw = (t, e, n, r = 20) => {
  const i = t.doc.resolve(n);
  let s = r, o = null;
  for (; s > 0 && o === null; ) {
    const l = i.node(s);
    (l == null ? void 0 : l.type.name) === e ? o = l : s -= 1;
  }
  return [o, s];
};
function vl(t, e) {
  return e.nodes[t] || e.marks[t] || null;
}
function Ss(t, e, n) {
  return Object.fromEntries(
    Object.entries(n).filter(([r]) => {
      const i = t.find((s) => s.type === e && s.name === r);
      return i ? i.attribute.keepOnSplit : !1;
    })
  );
}
var Ew = (t, e = 500) => {
  let n = "";
  const r = t.parentOffset;
  return t.parent.nodesBetween(Math.max(0, r - e), r, (i, s, o, l) => {
    var a, c;
    const u = ((c = (a = i.type.spec).toText) == null ? void 0 : c.call(a, {
      node: i,
      pos: s,
      parent: o,
      index: l
    })) || i.textContent || "%leaf%";
    n += i.isAtom && !i.isText ? u : u.slice(0, Math.max(0, r - s));
  }), n;
};
function na(t, e, n = {}) {
  const { empty: r, ranges: i } = t.selection, s = e ? en(e, t.schema) : null;
  if (r)
    return !!(t.storedMarks || t.selection.$from.marks()).filter((d) => s ? s.name === d.type.name : !0).find((d) => Ws(d.attrs, n, { strict: !1 }));
  let o = 0;
  const l = [];
  if (i.forEach(({ $from: d, $to: f }) => {
    const h = d.pos, p = f.pos;
    t.doc.nodesBetween(h, p, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const v = Math.max(h, g), y = Math.min(p, g + m.nodeSize), b = y - v;
      o += b, l.push(
        ...m.marks.map((k) => ({
          mark: k,
          from: v,
          to: y
        }))
      );
    });
  }), o === 0)
    return !1;
  const a = l.filter((d) => s ? s.name === d.mark.type.name : !0).filter((d) => Ws(d.mark.attrs, n, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = l.filter((d) => s ? d.mark.type !== s && d.mark.type.excludes(s) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= o;
}
function Tw(t, e, n = {}) {
  if (!e)
    return An(t, null, n) || na(t, null, n);
  const r = Vo(e, t.schema);
  return r === "node" ? An(t, e, n) : r === "mark" ? na(t, e, n) : !1;
}
var Aw = (t, e) => {
  const { $from: n, $to: r, $anchor: i } = t.selection;
  if (e) {
    const s = Ho((l) => l.type.name === e)(t.selection);
    if (!s)
      return !1;
    const o = t.doc.resolve(s.pos + 1);
    return i.pos + 1 === o.end();
  }
  return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
}, _w = (t) => {
  const { $from: e, $to: n } = t.selection;
  return !(e.parentOffset > 0 || e.pos !== n.pos);
};
function Bu(t, e) {
  return Array.isArray(e) ? e.some((n) => (typeof n == "string" ? n : n.name) === t.name) : e;
}
function zu(t, e) {
  const { nodeExtensions: n } = Bi(e), r = n.find((o) => o.name === t);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, s = X(P(r, "group", i));
  return typeof s != "string" ? !1 : s.split(" ").includes("list");
}
function jo(t, {
  checkChildren: e = !0,
  ignoreWhitespace: n = !1
} = {}) {
  var r;
  if (n) {
    if (t.type.name === "hardBreak")
      return !0;
    if (t.isText)
      return /^\s*$/m.test((r = t.text) != null ? r : "");
  }
  if (t.isText)
    return !t.text;
  if (t.isAtom || t.isLeaf)
    return !1;
  if (t.content.childCount === 0)
    return !0;
  if (e) {
    let i = !0;
    return t.content.forEach((s) => {
      i !== !1 && (jo(s, { ignoreWhitespace: n, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function qh(t) {
  return t instanceof B;
}
function Ow(t, e, n) {
  var r;
  const { selection: i } = e;
  let s = null;
  if (Ih(i) && (s = i.$cursor), s) {
    const l = (r = t.storedMarks) != null ? r : s.marks();
    return s.parent.type.allowsMarkType(n) && (!!n.isInSet(l) || !l.some((c) => c.type.excludes(n)));
  }
  const { ranges: o } = i;
  return o.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? t.doc.inlineContent && t.doc.type.allowsMarkType(n) : !1;
    return t.doc.nodesBetween(l.pos, a.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(n), p = !!n.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(n));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
var Nw = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: s } = n, { empty: o, ranges: l } = s, a = en(t, r.schema);
  if (i)
    if (o) {
      const c = Ph(r, a);
      n.addStoredMark(
        a.create({
          ...c,
          ...e
        })
      );
    } else
      l.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, h) => {
          const p = Math.max(h, u), m = Math.min(h + f.nodeSize, d);
          f.marks.find((v) => v.type === a) ? f.marks.forEach((v) => {
            a === v.type && n.addMark(
              p,
              m,
              a.create({
                ...v.attrs,
                ...e
              })
            );
          }) : n.addMark(p, m, a.create(e));
        });
      });
  return Ow(r, n, a);
}, Iw = (t, e) => ({ tr: n }) => (n.setMeta(t, e), !0), Dw = (t, e = {}) => ({ state: n, dispatch: r, chain: i }) => {
  const s = pe(t, n.schema);
  let o;
  return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), s.isTextblock ? i().command(({ commands: l }) => Zc(s, { ...o, ...e })(n) ? !0 : l.clearNodes()).command(({ state: l }) => Zc(s, { ...o, ...e })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Rw = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, i = Jn(t, 0, r.content.size), s = B.create(r, i);
    e.setSelection(s);
  }
  return !0;
}, Lw = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, { from: i, to: s } = typeof t == "number" ? { from: t, to: t } : t, o = j.atStart(r).from, l = j.atEnd(r).to, a = Jn(i, o, l), c = Jn(s, o, l), u = j.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, Pw = (t) => ({ state: e, dispatch: n }) => {
  const r = pe(t, e.schema);
  return Ry(r)(e, n);
};
function Fu(t, e) {
  const n = t.storedMarks || t.selection.$to.parentOffset && t.selection.$from.marks();
  if (n) {
    const r = n.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    t.tr.ensureMarks(r);
  }
}
var Bw = ({ keepMarks: t = !0 } = {}) => ({ tr: e, state: n, dispatch: r, editor: i }) => {
  const { selection: s, doc: o } = e, { $from: l, $to: a } = s, c = i.extensionManager.attributes, u = Ss(c, l.node().type.name, l.node().attrs);
  if (s instanceof B && s.node.isBlock)
    return !l.parentOffset || !Yt(o, l.pos) ? !1 : (r && (t && Fu(n, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : pw(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0, p = Yt(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && Yt(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0), r) {
    if (p && (s instanceof j && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), g = e.doc.resolve(m);
      l.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    t && Fu(n, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, zw = (t, e = {}) => ({ tr: n, state: r, dispatch: i, editor: s }) => {
  var o;
  const l = pe(t, r.schema), { $from: a, $to: c } = r.selection, u = r.selection.node;
  if (u && u.isBlock || a.depth < 2 || !a.sameParent(c))
    return !1;
  const d = a.node(-1);
  if (d.type !== l)
    return !1;
  const f = s.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== l || a.index(-2) !== a.node(-2).childCount - 1)
      return !1;
    if (i) {
      let v = E.empty;
      const y = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let O = a.depth - y; O >= a.depth - 3; O -= 1)
        v = E.from(a.node(O).copy(v));
      const b = (
        // eslint-disable-next-line no-nested-ternary
        a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3
      ), k = {
        ...Ss(f, a.node().type.name, a.node().attrs),
        ...e
      }, x = ((o = l.contentMatch.defaultType) == null ? void 0 : o.createAndFill(k)) || void 0;
      v = v.append(E.from(l.createAndFill(null, x) || void 0));
      const C = a.before(a.depth - (y - 1));
      n.replace(C, a.after(-b), new I(v, 4 - y, 0));
      let S = -1;
      n.doc.nodesBetween(C, n.doc.content.size, (O, R) => {
        if (S > -1)
          return !1;
        O.isTextblock && O.content.size === 0 && (S = R + 1);
      }), S > -1 && n.setSelection(j.near(n.doc.resolve(S))), n.scrollIntoView();
    }
    return !0;
  }
  const h = c.pos === a.end() ? d.contentMatchAt(0).defaultType : null, p = {
    ...Ss(f, d.type.name, d.attrs),
    ...e
  }, m = {
    ...Ss(f, a.node().type.name, a.node().attrs),
    ...e
  };
  n.delete(a.pos, c.pos);
  const g = h ? [
    { type: l, attrs: p },
    { type: h, attrs: m }
  ] : [{ type: l, attrs: p }];
  if (!Yt(n.doc, a.pos, 2))
    return !1;
  if (i) {
    const { selection: v, storedMarks: y } = r, { splittableMarks: b } = s.extensionManager, k = y || v.$to.parentOffset && v.$from.marks();
    if (n.split(a.pos, 2, g).scrollIntoView(), !k || !i)
      return !0;
    const x = k.filter((C) => b.includes(C.type.name));
    n.ensureMarks(x);
  }
  return !0;
}, yl = (t, e) => {
  const n = Ho((o) => o.type === e)(t.selection);
  if (!n)
    return !0;
  const r = t.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
  if (r === void 0)
    return !0;
  const i = t.doc.nodeAt(r);
  return n.node.type === (i == null ? void 0 : i.type) && On(t.doc, n.pos) && t.join(n.pos), !0;
}, bl = (t, e) => {
  const n = Ho((o) => o.type === e)(t.selection);
  if (!n)
    return !0;
  const r = t.doc.resolve(n.start).after(n.depth);
  if (r === void 0)
    return !0;
  const i = t.doc.nodeAt(r);
  return n.node.type === (i == null ? void 0 : i.type) && On(t.doc, r) && t.join(r), !0;
}, Fw = (t, e, n, r = {}) => ({ editor: i, tr: s, state: o, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = pe(t, o.schema), p = pe(e, o.schema), { selection: m, storedMarks: g } = o, { $from: v, $to: y } = m, b = v.blockRange(y), k = g || m.$to.parentOffset && m.$from.marks();
  if (!b)
    return !1;
  const x = Ho((C) => zu(C.type.name, d))(m);
  if (b.depth >= 1 && x && b.depth - x.depth <= 1) {
    if (x.node.type === h)
      return c.liftListItem(p);
    if (zu(x.node.type.name, d) && h.validContent(x.node.content) && l)
      return a().command(() => (s.setNodeMarkup(x.pos, h), !0)).command(() => yl(s, h)).command(() => bl(s, h)).run();
  }
  return !n || !k || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => yl(s, h)).command(() => bl(s, h)).run() : a().command(() => {
    const C = u().wrapInList(h, r), S = k.filter((O) => f.includes(O.type.name));
    return s.ensureMarks(S), C ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => yl(s, h)).command(() => bl(s, h)).run();
}, Vw = (t, e = {}, n = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: s = !1 } = n, o = en(t, r.schema);
  return na(r, o, e) ? i.unsetMark(o, { extendEmptyMarkRange: s }) : i.setMark(o, e);
}, Hw = (t, e, n = {}) => ({ state: r, commands: i }) => {
  const s = pe(t, r.schema), o = pe(e, r.schema), l = An(r, s, n);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(o, a) : i.setNode(s, { ...a, ...n });
}, jw = (t, e = {}) => ({ state: n, commands: r }) => {
  const i = pe(t, n.schema);
  return An(n, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Ww = () => ({ state: t, dispatch: e }) => {
  const n = t.plugins;
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r];
    let s;
    if (i.spec.isInputRules && (s = i.getState(t))) {
      if (e) {
        const o = t.tr, l = s.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          o.step(l.steps[a].invert(l.docs[a]));
        if (s.text) {
          const a = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, t.schema.text(s.text, a));
        } else
          o.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, Uw = () => ({ tr: t, dispatch: e }) => {
  const { selection: n } = t, { empty: r, ranges: i } = n;
  return r || e && i.forEach((s) => {
    t.removeMark(s.$from.pos, s.$to.pos);
  }), !0;
}, qw = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  var s;
  const { extendEmptyMarkRange: o = !1 } = e, { selection: l } = n, a = en(t, r.schema), { $from: c, empty: u, ranges: d } = l;
  if (!i)
    return !0;
  if (u && o) {
    let { from: f, to: h } = l;
    const p = (s = c.marks().find((g) => g.type === a)) == null ? void 0 : s.attrs, m = Qa(c, a, p);
    m && (f = m.from, h = m.to), n.removeMark(f, h, a);
  } else
    d.forEach((f) => {
      n.removeMark(f.$from.pos, f.$to.pos, a);
    });
  return n.removeStoredMark(a), !0;
}, Kw = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = Vo(
    typeof t == "string" ? t : t.name,
    r.schema
  );
  return l ? (l === "node" && (s = pe(t, r.schema)), l === "mark" && (o = en(t, r.schema)), i && n.selection.ranges.forEach((a) => {
    const c = a.$from.pos, u = a.$to.pos;
    let d, f, h, p;
    n.selection.empty ? r.doc.nodesBetween(c, u, (m, g) => {
      s && s === m.type && (h = Math.max(g, c), p = Math.min(g + m.nodeSize, u), d = g, f = m);
    }) : r.doc.nodesBetween(c, u, (m, g) => {
      g < c && s && s === m.type && (h = Math.max(g, c), p = Math.min(g + m.nodeSize, u), d = g, f = m), g >= c && g <= u && (s && s === m.type && n.setNodeMarkup(g, void 0, {
        ...m.attrs,
        ...e
      }), o && m.marks.length && m.marks.forEach((v) => {
        if (o === v.type) {
          const y = Math.max(g, c), b = Math.min(g + m.nodeSize, u);
          n.addMark(
            y,
            b,
            o.create({
              ...v.attrs,
              ...e
            })
          );
        }
      }));
    }), f && (d !== void 0 && n.setNodeMarkup(d, void 0, {
      ...f.attrs,
      ...e
    }), o && f.marks.length && f.marks.forEach((m) => {
      o === m.type && n.addMark(
        h,
        p,
        o.create({
          ...m.attrs,
          ...e
        })
      );
    }));
  }), !0) : !1;
}, Jw = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = pe(t, n.schema);
  return Ty(i, e)(n, r);
}, $w = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = pe(t, n.schema);
  return Ay(i, e)(n, r);
}, Gw = class {
  constructor() {
    this.callbacks = {};
  }
  on(t, e) {
    return this.callbacks[t] || (this.callbacks[t] = []), this.callbacks[t].push(e), this;
  }
  emit(t, ...e) {
    const n = this.callbacks[t];
    return n && n.forEach((r) => r.apply(this, e)), this;
  }
  off(t, e) {
    const n = this.callbacks[t];
    return n && (e ? this.callbacks[t] = n.filter((r) => r !== e) : delete this.callbacks[t]), this;
  }
  once(t, e) {
    const n = (...r) => {
      this.off(t, n), e.apply(this, r);
    };
    return this.on(t, n);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}, Wo = class {
  constructor(t) {
    var e;
    this.find = t.find, this.handler = t.handler, this.undoable = (e = t.undoable) != null ? e : !0;
  }
}, Yw = (t, e) => {
  if (Xa(e))
    return e.exec(t);
  const n = e(t);
  if (!n)
    return null;
  const r = [n.text];
  return r.index = n.index, r.input = t, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(n.replaceWith)), r;
};
function cs(t) {
  var e;
  const { editor: n, from: r, to: i, text: s, rules: o, plugin: l } = t, { view: a } = n;
  if (a.composing)
    return !1;
  const c = a.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || (e = c.nodeBefore || c.nodeAfter) != null && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = Ew(c) + s;
  return o.forEach((f) => {
    if (u)
      return;
    const h = Yw(d, f.find);
    if (!h)
      return;
    const p = a.state.tr, m = zo({
      state: a.state,
      transaction: p
    }), g = {
      from: r - (h[0].length - s.length),
      to: i
    }, { commands: v, chain: y, can: b } = new Fo({
      editor: n,
      state: m
    });
    f.handler({
      state: m,
      range: g,
      match: h,
      commands: v,
      chain: y,
      can: b
    }) === null || !p.steps.length || (f.undoable && p.setMeta(l, {
      transform: p,
      from: r,
      to: i,
      text: s
    }), a.dispatch(p), u = !0);
  }), u;
}
function Xw(t) {
  const { editor: e, rules: n } = t, r = new ce({
    state: {
      init() {
        return null;
      },
      apply(i, s, o) {
        const l = i.getMeta(r);
        if (l)
          return l;
        const a = i.getMeta("applyInputRules");
        return !!a && setTimeout(() => {
          let { text: u } = a;
          typeof u == "string" ? u = u : u = tc(E.from(u), o.schema);
          const { from: d } = a, f = d + u.length;
          cs({
            editor: e,
            from: d,
            to: f,
            text: u,
            rules: n,
            plugin: r
          });
        }), i.selectionSet || i.docChanged ? null : s;
      }
    },
    props: {
      handleTextInput(i, s, o, l) {
        return cs({
          editor: e,
          from: s,
          to: o,
          text: l,
          rules: n,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (i) => (setTimeout(() => {
          const { $cursor: s } = i.state.selection;
          s && cs({
            editor: e,
            from: s.pos,
            to: s.pos,
            text: "",
            rules: n,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(i, s) {
        if (s.key !== "Enter")
          return !1;
        const { $cursor: o } = i.state.selection;
        return o ? cs({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: `
`,
          rules: n,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function Qw(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function us(t) {
  return Qw(t) !== "Object" ? !1 : t.constructor === Object && Object.getPrototypeOf(t) === Object.prototype;
}
function Kh(t, e) {
  const n = { ...t };
  return us(t) && us(e) && Object.keys(e).forEach((r) => {
    us(e[r]) && us(t[r]) ? n[r] = Kh(t[r], e[r]) : n[r] = e[r];
  }), n;
}
var ic = class {
  constructor(t = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = {
      name: this.name
    }, this.config = {
      ...this.config,
      ...t
    }, this.name = this.config.name;
  }
  get options() {
    return {
      ...X(
        P(this, "addOptions", {
          name: this.name
        })
      ) || {}
    };
  }
  get storage() {
    return {
      ...X(
        P(this, "addStorage", {
          name: this.name,
          options: this.options
        })
      ) || {}
    };
  }
  configure(t = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Kh(this.options, t)
    });
    return e.name = this.name, e.parent = this.parent, e;
  }
  extend(t = {}) {
    const e = new this.constructor({ ...this.config, ...t });
    return e.parent = this, this.child = e, e.name = "name" in t ? t.name : e.parent.name, e;
  }
}, gr = class Jh extends ic {
  constructor() {
    super(...arguments), this.type = "mark";
  }
  /**
   * Create a new Mark instance
   * @param config - Mark configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new Jh(n);
  }
  static handleExit({ editor: e, mark: n }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const o = i.marks();
      if (!!!o.find((c) => (c == null ? void 0 : c.type.name) === n.name))
        return !1;
      const a = o.find((c) => (c == null ? void 0 : c.type.name) === n.name);
      return a && r.removeStoredMark(a), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
};
function Zw(t) {
  return typeof t == "number";
}
var ex = class {
  constructor(t) {
    this.find = t.find, this.handler = t.handler;
  }
}, tx = (t, e, n) => {
  if (Xa(e))
    return [...t.matchAll(e)];
  const r = e(t, n);
  return r ? r.map((i) => {
    const s = [i.text];
    return s.index = i.index, s.input = t, s.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), s.push(i.replaceWith)), s;
  }) : [];
};
function nx(t) {
  const { editor: e, state: n, from: r, to: i, rule: s, pasteEvent: o, dropEvent: l } = t, { commands: a, chain: c, can: u } = new Fo({
    editor: e,
    state: n
  }), d = [];
  return n.doc.nodesBetween(r, i, (h, p) => {
    var m, g, v, y, b;
    if ((g = (m = h.type) == null ? void 0 : m.spec) != null && g.code || !(h.isText || h.isTextblock || h.isInline))
      return;
    const k = (b = (y = (v = h.content) == null ? void 0 : v.size) != null ? y : h.nodeSize) != null ? b : 0, x = Math.max(r, p), C = Math.min(i, p + k);
    if (x >= C)
      return;
    const S = h.isText ? h.text || "" : h.textBetween(x - p, C - p, void 0, "￼");
    tx(S, s.find, o).forEach((R) => {
      if (R.index === void 0)
        return;
      const U = x + R.index + 1, ve = U + R[0].length, ye = {
        from: n.tr.mapping.map(U),
        to: n.tr.mapping.map(ve)
      }, ue = s.handler({
        state: n,
        range: ye,
        match: R,
        commands: a,
        chain: c,
        can: u,
        pasteEvent: o,
        dropEvent: l
      });
      d.push(ue);
    });
  }), d.every((h) => h !== null);
}
var ds = null, rx = (t) => {
  var e;
  const n = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = n.clipboardData) == null || e.setData("text/html", t), n;
};
function ix(t) {
  const { editor: e, rules: n } = t;
  let r = null, i = !1, s = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l;
  try {
    l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch {
    l = null;
  }
  const a = ({
    state: u,
    from: d,
    to: f,
    rule: h,
    pasteEvt: p
  }) => {
    const m = u.tr, g = zo({
      state: u,
      transaction: m
    });
    if (!(!nx({
      editor: e,
      state: g,
      from: Math.max(d - 1, 0),
      to: f.b - 1,
      rule: h,
      pasteEvent: p,
      dropEvent: l
    }) || !m.steps.length)) {
      try {
        l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch {
        l = null;
      }
      return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
    }
  };
  return n.map((u) => new ce({
    // we register a global drag handler to track the current drag source element
    view(d) {
      const f = (p) => {
        var m;
        r = (m = d.dom.parentElement) != null && m.contains(p.target) ? d.dom.parentElement : null, r && (ds = e);
      }, h = () => {
        ds && (ds = null);
      };
      return window.addEventListener("dragstart", f), window.addEventListener("dragend", h), {
        destroy() {
          window.removeEventListener("dragstart", f), window.removeEventListener("dragend", h);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (d, f) => {
          if (s = r === d.dom.parentElement, l = f, !s) {
            const h = ds;
            h != null && h.isEditable && setTimeout(() => {
              const p = h.state.selection;
              p && h.commands.deleteRange({ from: p.from, to: p.to });
            }, 10);
          }
          return !1;
        },
        paste: (d, f) => {
          var h;
          const p = (h = f.clipboardData) == null ? void 0 : h.getData("text/html");
          return o = f, i = !!(p != null && p.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (d, f, h) => {
      const p = d[0], m = p.getMeta("uiEvent") === "paste" && !i, g = p.getMeta("uiEvent") === "drop" && !s, v = p.getMeta("applyPasteRules"), y = !!v;
      if (!m && !g && !y)
        return;
      if (y) {
        let { text: x } = v;
        typeof x == "string" ? x = x : x = tc(E.from(x), h.schema);
        const { from: C } = v, S = C + x.length, O = rx(x);
        return a({
          rule: u,
          state: h,
          from: C,
          to: { b: S },
          pasteEvt: O
        });
      }
      const b = f.doc.content.findDiffStart(h.doc.content), k = f.doc.content.findDiffEnd(h.doc.content);
      if (!(!Zw(b) || !k || b === k.b))
        return a({
          rule: u,
          state: h,
          from: b,
          to: k,
          pasteEvt: o
        });
    }
  }));
}
var Uo = class {
  constructor(t, e) {
    this.splittableMarks = [], this.editor = e, this.baseExtensions = t, this.extensions = Vh(t), this.schema = bw(this.extensions, e), this.setupExtensions();
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((t, e) => {
      const n = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: vl(e.name, this.schema)
      }, r = P(e, "addCommands", n);
      return r ? {
        ...t,
        ...r()
      } : t;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: t } = this;
    return nc([...this.extensions].reverse()).flatMap((r) => {
      const i = {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: t,
        type: vl(r.name, this.schema)
      }, s = [], o = P(
        r,
        "addKeyboardShortcuts",
        i
      );
      let l = {};
      if (r.type === "mark" && P(r, "exitable", i) && (l.ArrowRight = () => gr.handleExit({ editor: t, mark: r })), o) {
        const f = Object.fromEntries(
          Object.entries(o()).map(([h, p]) => [h, () => p({ editor: t })])
        );
        l = { ...l, ...f };
      }
      const a = xk(l);
      s.push(a);
      const c = P(r, "addInputRules", i);
      if (Bu(r, t.options.enableInputRules) && c) {
        const f = c();
        if (f && f.length) {
          const h = Xw({
            editor: t,
            rules: f
          }), p = Array.isArray(h) ? h : [h];
          s.push(...p);
        }
      }
      const u = P(r, "addPasteRules", i);
      if (Bu(r, t.options.enablePasteRules) && u) {
        const f = u();
        if (f && f.length) {
          const h = ix({ editor: t, rules: f });
          s.push(...h);
        }
      }
      const d = P(
        r,
        "addProseMirrorPlugins",
        i
      );
      if (d) {
        const f = d();
        s.push(...f);
      }
      return s;
    });
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return Fh(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: t } = this, { nodeExtensions: e } = Bi(this.extensions);
    return Object.fromEntries(
      e.filter((n) => !!P(n, "addNodeView")).map((n) => {
        const r = this.attributes.filter((a) => a.type === n.name), i = {
          name: n.name,
          options: n.options,
          storage: this.editor.extensionStorage[n.name],
          editor: t,
          type: pe(n.name, this.schema)
        }, s = P(n, "addNodeView", i);
        if (!s)
          return [];
        const o = s();
        if (!o)
          return [];
        const l = (a, c, u, d, f) => {
          const h = Us(a, r);
          return o({
            // pass-through
            node: a,
            view: c,
            getPos: u,
            decorations: d,
            innerDecorations: f,
            // tiptap-specific
            editor: t,
            extension: n,
            HTMLAttributes: h
          });
        };
        return [n.name, l];
      })
    );
  }
  get markViews() {
    const { editor: t } = this, { markExtensions: e } = Bi(this.extensions);
    return Object.fromEntries(
      e.filter((n) => !!P(n, "addMarkView")).map((n) => {
        const r = this.attributes.filter((l) => l.type === n.name), i = {
          name: n.name,
          options: n.options,
          storage: this.editor.extensionStorage[n.name],
          editor: t,
          type: en(n.name, this.schema)
        }, s = P(n, "addMarkView", i);
        if (!s)
          return [];
        const o = (l, a, c) => {
          const u = Us(l, r);
          return s()({
            // pass-through
            mark: l,
            view: a,
            inline: c,
            // tiptap-specific
            editor: t,
            extension: n,
            HTMLAttributes: u,
            updateAttributes: (d) => {
              yx(l, t, d);
            }
          });
        };
        return [n.name, o];
      })
    );
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    const t = this.extensions;
    this.editor.extensionStorage = Object.fromEntries(
      t.map((e) => [e.name, e.storage])
    ), t.forEach((e) => {
      var n;
      const r = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: vl(e.name, this.schema)
      };
      e.type === "mark" && ((n = X(P(e, "keepOnSplit", r))) == null || n) && this.splittableMarks.push(e.name);
      const i = P(e, "onBeforeCreate", r), s = P(e, "onCreate", r), o = P(e, "onUpdate", r), l = P(
        e,
        "onSelectionUpdate",
        r
      ), a = P(e, "onTransaction", r), c = P(e, "onFocus", r), u = P(e, "onBlur", r), d = P(e, "onDestroy", r);
      i && this.editor.on("beforeCreate", i), s && this.editor.on("create", s), o && this.editor.on("update", o), l && this.editor.on("selectionUpdate", l), a && this.editor.on("transaction", a), c && this.editor.on("focus", c), u && this.editor.on("blur", u), d && this.editor.on("destroy", d);
    });
  }
};
Uo.resolve = Vh;
Uo.sort = nc;
Uo.flatten = ec;
var sx = {};
Ya(sx, {
  ClipboardTextSerializer: () => Gh,
  Commands: () => Yh,
  Delete: () => Xh,
  Drop: () => Qh,
  Editable: () => Zh,
  FocusEvents: () => tp,
  Keymap: () => np,
  Paste: () => rp,
  Tabindex: () => ip,
  focusEventsPluginKey: () => ep
});
var ge = class $h extends ic {
  constructor() {
    super(...arguments), this.type = "extension";
  }
  /**
   * Create a new Extension instance
   * @param config - Extension configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new $h(n);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
}, Gh = ge.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new ce({
        key: new Ee("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: t } = this, { state: e, schema: n } = t, { doc: r, selection: i } = e, { ranges: s } = i, o = Math.min(...s.map((u) => u.$from.pos)), l = Math.max(...s.map((u) => u.$to.pos)), a = jh(n);
            return Hh(r, { from: o, to: l }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: a
            });
          }
        }
      })
    ];
  }
}), Yh = ge.create({
  name: "commands",
  addCommands() {
    return {
      ...Oh
    };
  }
}), Xh = ge.create({
  name: "delete",
  onUpdate({ transaction: t, appendedTransactions: e }) {
    var n, r, i;
    const s = () => {
      var o, l, a, c;
      if ((c = (a = (l = (o = this.editor.options.coreExtensionOptions) == null ? void 0 : o.delete) == null ? void 0 : l.filterTransaction) == null ? void 0 : a.call(l, t)) != null ? c : t.getMeta("y-sync$"))
        return;
      const u = Bh(t.before, [t, ...e]);
      Uh(u).forEach((h) => {
        u.mapping.mapResult(h.oldRange.from).deletedAfter && u.mapping.mapResult(h.oldRange.to).deletedBefore && u.before.nodesBetween(h.oldRange.from, h.oldRange.to, (p, m) => {
          const g = m + p.nodeSize - 2, v = h.oldRange.from <= m && g <= h.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: p,
            from: m,
            to: g,
            newFrom: u.mapping.map(m),
            newTo: u.mapping.map(g),
            deletedRange: h.oldRange,
            newRange: h.newRange,
            partial: !v,
            editor: this.editor,
            transaction: t,
            combinedTransform: u
          });
        });
      });
      const f = u.mapping;
      u.steps.forEach((h, p) => {
        var m, g;
        if (h instanceof St) {
          const v = f.slice(p).map(h.from, -1), y = f.slice(p).map(h.to), b = f.invert().map(v, -1), k = f.invert().map(y), x = (m = u.doc.nodeAt(v - 1)) == null ? void 0 : m.marks.some((S) => S.eq(h.mark)), C = (g = u.doc.nodeAt(y)) == null ? void 0 : g.marks.some((S) => S.eq(h.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: h.mark,
            from: h.from,
            to: h.to,
            deletedRange: {
              from: b,
              to: k
            },
            newRange: {
              from: v,
              to: y
            },
            partial: !!(C || x),
            editor: this.editor,
            transaction: t,
            combinedTransform: u
          });
        }
      });
    };
    (i = (r = (n = this.editor.options.coreExtensionOptions) == null ? void 0 : n.delete) == null ? void 0 : r.async) == null || i ? setTimeout(s, 0) : s();
  }
}), Qh = ge.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new ce({
        key: new Ee("tiptapDrop"),
        props: {
          handleDrop: (t, e, n, r) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: n,
              moved: r
            });
          }
        }
      })
    ];
  }
}), Zh = ge.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new ce({
        key: new Ee("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), ep = new Ee("focusEvents"), tp = ge.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: t } = this;
    return [
      new ce({
        key: ep,
        props: {
          handleDOMEvents: {
            focus: (e, n) => {
              t.isFocused = !0;
              const r = t.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, n) => {
              t.isFocused = !1;
              const r = t.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), np = ge.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const t = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      // maybe convert first text block node to default node
      () => o.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, m = p.parent.type.spec.isolating, g = d.pos - d.parentOffset, v = m && p.parent.childCount === 1 ? g === d.pos : K.atStart(c).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !v || v && d.parent.type.name === "paragraph" ? !1 : o.clearNodes();
      }),
      () => o.deleteSelection(),
      () => o.joinBackward(),
      () => o.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: o }) => [
      () => o.deleteSelection(),
      () => o.deleteCurrentNode(),
      () => o.joinForward(),
      () => o.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: o }) => [
        () => o.newlineInCode(),
        () => o.createParagraphNear(),
        () => o.liftEmptyBlock(),
        () => o.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: t,
      "Mod-Backspace": t,
      "Shift-Backspace": t,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...r
    }, s = {
      ...r,
      "Ctrl-h": t,
      "Alt-Backspace": t,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Za() || Lh() ? s : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new ce({
        key: new Ee("clearDocument"),
        appendTransaction: (t, e, n) => {
          if (t.some((m) => m.getMeta("composition")))
            return;
          const r = t.some((m) => m.docChanged) && !e.doc.eq(n.doc), i = t.some((m) => m.getMeta("preventClearDocument"));
          if (!r || i)
            return;
          const { empty: s, from: o, to: l } = e.selection, a = K.atStart(e.doc).from, c = K.atEnd(e.doc).to;
          if (s || !(o === a && l === c) || !jo(n.doc))
            return;
          const f = n.tr, h = zo({
            state: n,
            transaction: f
          }), { commands: p } = new Fo({
            editor: this.editor,
            state: h
          });
          if (p.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
}), rp = ge.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new ce({
        key: new Ee("tiptapPaste"),
        props: {
          handlePaste: (t, e, n) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: n
            });
          }
        }
      })
    ];
  }
}), ip = ge.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new ce({
        key: new Ee("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
}), ox = class wr {
  constructor(e, n, r = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = n, this.currentNode = i;
  }
  get name() {
    return this.node.type.name;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) != null ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let n = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      n = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: n, to: r }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), n = this.resolvedPos.doc.resolve(e);
    return new wr(n, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new wr(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new wr(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((n, r) => {
      const i = n.isBlock && !n.isTextblock, s = n.isAtom && !n.isText, o = this.pos + r + (s ? 0 : 1);
      if (o < 0 || o > this.resolvedPos.doc.nodeSize - 2)
        return;
      const l = this.resolvedPos.doc.resolve(o);
      if (!i && l.depth <= this.depth)
        return;
      const a = new wr(l, this.editor, i, i ? n : null);
      i && (a.actualDepth = this.depth + 1), e.push(new wr(l, this.editor, i, i ? n : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, n = {}) {
    let r = null, i = this.parent;
    for (; i && !r; ) {
      if (i.node.type.name === e)
        if (Object.keys(n).length > 0) {
          const s = i.node.attrs, o = Object.keys(n);
          for (let l = 0; l < o.length; l += 1) {
            const a = o[l];
            if (s[a] !== n[a])
              break;
          }
        } else
          r = i;
      i = i.parent;
    }
    return r;
  }
  querySelector(e, n = {}) {
    return this.querySelectorAll(e, n, !0)[0] || null;
  }
  querySelectorAll(e, n = {}, r = !1) {
    let i = [];
    if (!this.children || this.children.length === 0)
      return i;
    const s = Object.keys(n);
    return this.children.forEach((o) => {
      r && i.length > 0 || (o.node.type.name === e && s.every((a) => n[a] === o.node.attrs[a]) && i.push(o), !(r && i.length > 0) && (i = i.concat(o.querySelectorAll(e, n, r))));
    }), i;
  }
  setAttribute(e) {
    const { tr: n } = this.editor.state;
    n.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(n);
  }
}, lx = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}`;
function ax(t, e, n) {
  const r = document.querySelector("style[data-tiptap-style]");
  if (r !== null)
    return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute("data-tiptap-style", ""), i.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(i), i;
}
var cx = class extends Gw {
  constructor(t = {}) {
    super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.options = {
      element: typeof document < "u" ? document.createElement("div") : null,
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      emitContentError: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onMount: () => null,
      onUnmount: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: r }) => {
        throw r;
      },
      onPaste: () => null,
      onDrop: () => null,
      onDelete: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(t), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: r, slice: i, moved: s }) => this.options.onDrop(r, i, s)), this.on("paste", ({ event: r, slice: i }) => this.options.onPaste(r, i)), this.on("delete", this.options.onDelete);
    const e = this.createDoc(), n = Dh(e, this.options.autofocus);
    this.editorState = Cr.create({
      doc: e,
      schema: this.schema,
      selection: n || void 0
    }), this.options.element && this.mount(this.options.element);
  }
  /**
   * Attach the editor to the DOM, creating a new editor view.
   */
  mount(t) {
    if (typeof document > "u")
      throw new Error(
        "[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment."
      );
    this.createView(t), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
      this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
   * Remove the editor from the DOM, but still allow remounting at a different point in time
   */
  unmount() {
    if (this.editorView) {
      const t = this.editorView.dom;
      t != null && t.editor && delete t.editor, this.editorView.destroy();
    }
    if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(`.${this.className}`).length)
      try {
        typeof this.css.remove == "function" ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css);
      } catch (t) {
        console.warn("Failed to remove CSS element:", t);
      }
    this.css = null, this.emit("unmount", { editor: this });
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && typeof document < "u" && (this.css = ax(lx, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(t = {}) {
    this.options = {
      ...this.options,
      ...t
    }, !(!this.editorView || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(t, e = !0) {
    this.setOptions({ editable: t }), e && this.emit("update", { editor: this, transaction: this.state.tr, appendedTransactions: [] });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get view() {
    return this.editorView ? this.editorView : new Proxy(
      {
        state: this.editorState,
        updateState: (t) => {
          this.editorState = t;
        },
        dispatch: (t) => {
          this.dispatchTransaction(t);
        },
        // Stub some commonly accessed properties to prevent errors
        composing: !1,
        dragging: null,
        editable: !0,
        isDestroyed: !1
      },
      {
        get: (t, e) => {
          if (this.editorView)
            return this.editorView[e];
          if (e === "state")
            return this.editorState;
          if (e in t)
            return Reflect.get(t, e);
          throw new Error(
            `[tiptap error]: The editor view is not available. Cannot access view['${e}']. The editor may not be mounted yet.`
          );
        }
      }
    );
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.editorView && (this.editorState = this.view.state), this.editorState;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   * @returns The new editor state
   */
  registerPlugin(t, e) {
    const n = zh(e) ? e(t, [...this.state.plugins]) : [...this.state.plugins, t], r = this.state.reconfigure({ plugins: n });
    return this.view.updateState(r), r;
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKeyToRemove The plugins name
   * @returns The new editor state or undefined if the editor is destroyed
   */
  unregisterPlugin(t) {
    if (this.isDestroyed)
      return;
    const e = this.state.plugins;
    let n = e;
    if ([].concat(t).forEach((i) => {
      const s = typeof i == "string" ? `${i}$` : i.key;
      n = n.filter((o) => !o.key.startsWith(s));
    }), e.length === n.length)
      return;
    const r = this.state.reconfigure({
      plugins: n
    });
    return this.view.updateState(r), r;
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var t, e;
    const r = [...this.options.enableCoreExtensions ? [
      Zh,
      Gh.configure({
        blockSeparator: (e = (t = this.options.coreExtensionOptions) == null ? void 0 : t.clipboardTextSerializer) == null ? void 0 : e.blockSeparator
      }),
      Yh,
      tp,
      np,
      ip,
      Qh,
      rp,
      Xh
    ].filter((i) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[i.name] !== !1 : !0) : [], ...this.options.extensions].filter((i) => ["extension", "node", "mark"].includes(i == null ? void 0 : i.type));
    this.extensionManager = new Uo(r, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new Fo({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates the initial document.
   */
  createDoc() {
    let t;
    try {
      t = ta(this.options.content, this.schema, this.options.parseOptions, {
        errorOnInvalidContent: this.options.enableContentCheck
      });
    } catch (e) {
      if (!(e instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(e.message))
        throw e;
      this.emit("contentError", {
        editor: this,
        error: e,
        disableCollaboration: () => {
          "collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((n) => n.name !== "collaboration"), this.createExtensionManager();
        }
      }), t = ta(this.options.content, this.schema, this.options.parseOptions, {
        errorOnInvalidContent: !1
      });
    }
    return t;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView(t) {
    var e;
    this.editorView = new Ah(t, {
      ...this.options.editorProps,
      attributes: {
        // add `role="textbox"` to the editor element
        role: "textbox",
        ...(e = this.options.editorProps) == null ? void 0 : e.attributes
      },
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: this.editorState,
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
    const n = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(n), this.prependClass(), this.injectCSS();
    const r = this.view.dom;
    r.editor = this;
  }
  /**
   * Creates all node and mark views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `${this.className} ${this.view.dom.className}`;
  }
  captureTransaction(t) {
    this.isCapturingTransaction = !0, t(), this.isCapturingTransaction = !1;
    const e = this.capturedTransaction;
    return this.capturedTransaction = null, e;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(t) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = t;
        return;
      }
      t.steps.forEach((c) => {
        var u;
        return (u = this.capturedTransaction) == null ? void 0 : u.step(c);
      });
      return;
    }
    const { state: e, transactions: n } = this.state.applyTransaction(t), r = !this.state.selection.eq(e.selection), i = n.includes(t), s = this.state;
    if (this.emit("beforeTransaction", {
      editor: this,
      transaction: t,
      nextState: e
    }), !i)
      return;
    this.view.updateState(e), this.emit("transaction", {
      editor: this,
      transaction: t,
      appendedTransactions: n.slice(1)
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: t
    });
    const o = n.findLast((c) => c.getMeta("focus") || c.getMeta("blur")), l = o == null ? void 0 : o.getMeta("focus"), a = o == null ? void 0 : o.getMeta("blur");
    l && this.emit("focus", {
      editor: this,
      event: l.event,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      transaction: o
    }), a && this.emit("blur", {
      editor: this,
      event: a.event,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      transaction: o
    }), !(t.getMeta("preventUpdate") || !n.some((c) => c.docChanged) || s.doc.eq(e.doc)) && this.emit("update", {
      editor: this,
      transaction: t,
      appendedTransactions: n.slice(1)
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(t) {
    return Wh(this.state, t);
  }
  isActive(t, e) {
    const n = typeof t == "string" ? t : null, r = typeof t == "string" ? e : t;
    return Tw(this.state, n, r);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return tc(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(t) {
    const { blockSeparator: e = `

`, textSerializers: n = {} } = t || {};
    return ww(this.state.doc, {
      blockSeparator: e,
      textSerializers: {
        ...jh(this.schema),
        ...n
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return jo(this.state.doc);
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    this.emit("destroy"), this.unmount(), this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var t, e;
    return (e = (t = this.editorView) == null ? void 0 : t.isDestroyed) != null ? e : !0;
  }
  $node(t, e) {
    var n;
    return ((n = this.$doc) == null ? void 0 : n.querySelector(t, e)) || null;
  }
  $nodes(t, e) {
    var n;
    return ((n = this.$doc) == null ? void 0 : n.querySelectorAll(t, e)) || null;
  }
  $pos(t) {
    const e = this.state.doc.resolve(t);
    return new ox(e, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function jr(t) {
  return new Wo({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      const i = X(t.getAttributes, void 0, r);
      if (i === !1 || i === null)
        return null;
      const { tr: s } = e, o = r[r.length - 1], l = r[0];
      if (o) {
        const a = l.search(/\S/), c = n.from + l.indexOf(o), u = c + o.length;
        if (rc(n.from, n.to, e.doc).filter((h) => h.mark.type.excluded.find((m) => m === t.type && m !== h.mark.type)).filter((h) => h.to > c).length)
          return null;
        u < n.to && s.delete(u, n.to), c > n.from && s.delete(n.from + a, c);
        const f = n.from + a + o.length;
        s.addMark(n.from + a, f, t.type.create(i || {})), s.removeStoredMark(t.type);
      }
    },
    undoable: t.undoable
  });
}
function ux(t) {
  return new Wo({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      const i = X(t.getAttributes, void 0, r) || {}, { tr: s } = e, o = n.from;
      let l = n.to;
      const a = t.type.create(i);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = o + c;
        u > l ? u = l : l = u + r[1].length;
        const d = r[0][r[0].length - 1];
        s.insertText(d, o + r[0].length - 1), s.replaceWith(u, l, a);
      } else if (r[0]) {
        const c = t.type.isInline ? o : o - 1;
        s.insert(c, t.type.create(i)).delete(s.mapping.map(o), s.mapping.map(l));
      }
      s.scrollIntoView();
    },
    undoable: t.undoable
  });
}
function ra(t) {
  return new Wo({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      const i = e.doc.resolve(n.from), s = X(t.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), t.type))
        return null;
      e.tr.delete(n.from, n.to).setBlockType(n.from, n.from, t.type, s);
    },
    undoable: t.undoable
  });
}
function Wr(t) {
  return new Wo({
    find: t.find,
    handler: ({ state: e, range: n, match: r, chain: i }) => {
      const s = X(t.getAttributes, void 0, r) || {}, o = e.tr.delete(n.from, n.to), a = o.doc.resolve(n.from).blockRange(), c = a && Ra(a, t.type, s);
      if (!c)
        return null;
      if (o.wrap(a, c), t.keepMarks && t.editor) {
        const { selection: d, storedMarks: f } = e, { splittableMarks: h } = t.editor.extensionManager, p = f || d.$to.parentOffset && d.$from.marks();
        if (p) {
          const m = p.filter((g) => h.includes(g.type.name));
          o.ensureMarks(m);
        }
      }
      if (t.keepAttributes) {
        const d = t.type.name === "bulletList" || t.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(d, s).run();
      }
      const u = o.doc.resolve(n.from - 1).nodeBefore;
      u && u.type === t.type && On(o.doc, n.from - 1) && (!t.joinPredicate || t.joinPredicate(r, u)) && o.join(n.from - 1);
    },
    undoable: t.undoable
  });
}
function dx(t, e) {
  const { selection: n } = t, { $from: r } = n;
  if (n instanceof B) {
    const s = r.index();
    return r.parent.canReplaceWith(s, s + 1, e);
  }
  let i = r.depth;
  for (; i >= 0; ) {
    const s = r.index(i);
    if (r.node(i).contentMatchAt(s).matchType(e))
      return !0;
    i -= 1;
  }
  return !1;
}
var fx = {};
Ya(fx, {
  createAtomBlockMarkdownSpec: () => hx,
  createBlockMarkdownSpec: () => px,
  createInlineMarkdownSpec: () => vx,
  parseAttributes: () => sc,
  parseIndentedBlocks: () => ia,
  renderNestedMarkdownContent: () => lc,
  serializeAttributes: () => oc
});
function sc(t) {
  if (!(t != null && t.trim()))
    return {};
  const e = {}, n = [], r = t.replace(/["']([^"']*)["']/g, (c) => (n.push(c), `__QUOTED_${n.length - 1}__`)), i = r.match(/(?:^|\s)\.([a-zA-Z][\w-]*)/g);
  if (i) {
    const c = i.map((u) => u.trim().slice(1));
    e.class = c.join(" ");
  }
  const s = r.match(/(?:^|\s)#([a-zA-Z][\w-]*)/);
  s && (e.id = s[1]);
  const o = /([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g;
  Array.from(r.matchAll(o)).forEach(([, c, u]) => {
    var d;
    const f = parseInt(((d = u.match(/__QUOTED_(\d+)__/)) == null ? void 0 : d[1]) || "0", 10), h = n[f];
    h && (e[c] = h.slice(1, -1));
  });
  const a = r.replace(/(?:^|\s)\.([a-zA-Z][\w-]*)/g, "").replace(/(?:^|\s)#([a-zA-Z][\w-]*)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
  return a && a.split(/\s+/).filter(Boolean).forEach((u) => {
    u.match(/^[a-zA-Z][\w-]*$/) && (e[u] = !0);
  }), e;
}
function oc(t) {
  if (!t || Object.keys(t).length === 0)
    return "";
  const e = [];
  return t.class && String(t.class).split(/\s+/).filter(Boolean).forEach((r) => e.push(`.${r}`)), t.id && e.push(`#${t.id}`), Object.entries(t).forEach(([n, r]) => {
    n === "class" || n === "id" || (r === !0 ? e.push(n) : r !== !1 && r != null && e.push(`${n}="${String(r)}"`));
  }), e.join(" ");
}
function hx(t) {
  const {
    nodeName: e,
    name: n,
    parseAttributes: r = sc,
    serializeAttributes: i = oc,
    defaultAttributes: s = {},
    requiredAttributes: o = [],
    allowedAttributes: l
  } = t, a = n || e, c = (u) => {
    if (!l)
      return u;
    const d = {};
    return l.forEach((f) => {
      f in u && (d[f] = u[f]);
    }), d;
  };
  return {
    parseMarkdown: (u, d) => {
      const f = { ...s, ...u.attributes };
      return d.createNode(e, f, []);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(u) {
        var d;
        const f = new RegExp(`^:::${a}(?:\\s|$)`, "m"), h = (d = u.match(f)) == null ? void 0 : d.index;
        return h !== void 0 ? h : -1;
      },
      tokenize(u, d, f) {
        const h = new RegExp(`^:::${a}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`), p = u.match(h);
        if (!p)
          return;
        const m = p[1] || "", g = r(m);
        if (!o.find((y) => !(y in g)))
          return {
            type: e,
            raw: p[0],
            attributes: g
          };
      }
    },
    renderMarkdown: (u) => {
      const d = c(u.attrs || {}), f = i(d), h = f ? ` {${f}}` : "";
      return `:::${a}${h} :::`;
    }
  };
}
function px(t) {
  const {
    nodeName: e,
    name: n,
    getContent: r,
    parseAttributes: i = sc,
    serializeAttributes: s = oc,
    defaultAttributes: o = {},
    content: l = "block",
    allowedAttributes: a
  } = t, c = n || e, u = (d) => {
    if (!a)
      return d;
    const f = {};
    return a.forEach((h) => {
      h in d && (f[h] = d[h]);
    }), f;
  };
  return {
    parseMarkdown: (d, f) => {
      let h;
      if (r) {
        const m = r(d);
        h = typeof m == "string" ? [{ type: "text", text: m }] : m;
      } else l === "block" ? h = f.parseChildren(d.tokens || []) : h = f.parseInline(d.tokens || []);
      const p = { ...o, ...d.attributes };
      return f.createNode(e, p, h);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(d) {
        var f;
        const h = new RegExp(`^:::${c}`, "m"), p = (f = d.match(h)) == null ? void 0 : f.index;
        return p !== void 0 ? p : -1;
      },
      tokenize(d, f, h) {
        var p;
        const m = new RegExp(`^:::${c}(?:\\s+\\{([^}]*)\\})?\\s*\\n`), g = d.match(m);
        if (!g)
          return;
        const [v, y = ""] = g, b = i(y);
        let k = 1;
        const x = v.length;
        let C = "";
        const S = /^:::([\w-]*)(\s.*)?/gm, O = d.slice(x);
        for (S.lastIndex = 0; ; ) {
          const R = S.exec(O);
          if (R === null)
            break;
          const U = R.index, ve = R[1];
          if (!((p = R[2]) != null && p.endsWith(":::"))) {
            if (ve)
              k += 1;
            else if (k -= 1, k === 0) {
              const ye = O.slice(0, U);
              C = ye.trim();
              const ue = d.slice(0, x + U + R[0].length);
              let M = [];
              if (C)
                if (l === "block")
                  for (M = h.blockTokens(ye), M.forEach((N) => {
                    N.text && (!N.tokens || N.tokens.length === 0) && (N.tokens = h.inlineTokens(N.text));
                  }); M.length > 0; ) {
                    const N = M[M.length - 1];
                    if (N.type === "paragraph" && (!N.text || N.text.trim() === ""))
                      M.pop();
                    else
                      break;
                  }
                else
                  M = h.inlineTokens(C);
              return {
                type: e,
                raw: ue,
                attributes: b,
                content: C,
                tokens: M
              };
            }
          }
        }
      }
    },
    renderMarkdown: (d, f) => {
      const h = u(d.attrs || {}), p = s(h), m = p ? ` {${p}}` : "", g = f.renderChildren(d.content || [], `

`);
      return `:::${c}${m}

${g}

:::`;
    }
  };
}
function mx(t) {
  if (!t.trim())
    return {};
  const e = {}, n = /(\w+)=(?:"([^"]*)"|'([^']*)')/g;
  let r = n.exec(t);
  for (; r !== null; ) {
    const [, i, s, o] = r;
    e[i] = s || o, r = n.exec(t);
  }
  return e;
}
function gx(t) {
  return Object.entries(t).filter(([, e]) => e != null).map(([e, n]) => `${e}="${n}"`).join(" ");
}
function vx(t) {
  const {
    nodeName: e,
    name: n,
    getContent: r,
    parseAttributes: i = mx,
    serializeAttributes: s = gx,
    defaultAttributes: o = {},
    selfClosing: l = !1,
    allowedAttributes: a
  } = t, c = n || e, u = (f) => {
    if (!a)
      return f;
    const h = {};
    return a.forEach((p) => {
      p in f && (h[p] = f[p]);
    }), h;
  }, d = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    parseMarkdown: (f, h) => {
      const p = { ...o, ...f.attributes };
      if (l)
        return h.createNode(e, p);
      const m = r ? r(f) : f.content || "";
      return m ? h.createNode(e, p, [h.createTextNode(m)]) : h.createNode(e, p, []);
    },
    markdownTokenizer: {
      name: e,
      level: "inline",
      start(f) {
        const h = l ? new RegExp(`\\[${d}\\s*[^\\]]*\\]`) : new RegExp(`\\[${d}\\s*[^\\]]*\\][\\s\\S]*?\\[\\/${d}\\]`), p = f.match(h), m = p == null ? void 0 : p.index;
        return m !== void 0 ? m : -1;
      },
      tokenize(f, h, p) {
        const m = l ? new RegExp(`^\\[${d}\\s*([^\\]]*)\\]`) : new RegExp(`^\\[${d}\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/${d}\\]`), g = f.match(m);
        if (!g)
          return;
        let v = "", y = "";
        if (l) {
          const [, k] = g;
          y = k;
        } else {
          const [, k, x] = g;
          y = k, v = x || "";
        }
        const b = i(y.trim());
        return {
          type: e,
          raw: g[0],
          content: v.trim(),
          attributes: b
        };
      }
    },
    renderMarkdown: (f) => {
      let h = "";
      r ? h = r(f) : f.content && f.content.length > 0 && (h = f.content.filter((v) => v.type === "text").map((v) => v.text).join(""));
      const p = u(f.attrs || {}), m = s(p), g = m ? ` ${m}` : "";
      return l ? `[${c}${g}]` : `[${c}${g}]${h}[/${c}]`;
    }
  };
}
function ia(t, e, n) {
  var r, i, s, o;
  const l = t.split(`
`), a = [];
  let c = "", u = 0;
  const d = e.baseIndentSize || 2;
  for (; u < l.length; ) {
    const f = l[u], h = f.match(e.itemPattern);
    if (!h) {
      if (a.length > 0)
        break;
      if (f.trim() === "") {
        u += 1;
        continue;
      } else
        return;
    }
    const p = e.extractItemData(h), { indentLevel: m, mainContent: g } = p;
    c = `${c}${f}
`;
    const v = [g];
    for (u += 1; u < l.length; ) {
      const x = l[u];
      if (x.trim() === "") {
        const S = l.slice(u + 1).findIndex((U) => U.trim() !== "");
        if (S === -1)
          break;
        if ((((i = (r = l[u + 1 + S].match(/^(\s*)/)) == null ? void 0 : r[1]) == null ? void 0 : i.length) || 0) > m) {
          v.push(x), c = `${c}${x}
`, u += 1;
          continue;
        } else
          break;
      }
      if ((((o = (s = x.match(/^(\s*)/)) == null ? void 0 : s[1]) == null ? void 0 : o.length) || 0) > m)
        v.push(x), c = `${c}${x}
`, u += 1;
      else
        break;
    }
    let y;
    const b = v.slice(1);
    if (b.length > 0) {
      const x = b.map((C) => C.slice(m + d)).join(`
`);
      x.trim() && (e.customNestedParser ? y = e.customNestedParser(x) : y = n.blockTokens(x));
    }
    const k = e.createToken(p, y);
    a.push(k);
  }
  if (a.length !== 0)
    return {
      items: a,
      raw: c.trim()
    };
}
function lc(t, e, n, r) {
  if (!t || !Array.isArray(t.content))
    return "";
  const i = typeof n == "function" ? n(r) : n, [s, ...o] = t.content, l = e.renderChildren([s]), a = [`${i}${l}`];
  return o && o.length > 0 && o.forEach((c) => {
    const u = e.renderChildren([c]);
    if (u) {
      const d = u.split(`
`).map((f) => f ? e.indent(f) : "").join(`
`);
      a.push(d);
    }
  }), a.join(`
`);
}
function yx(t, e, n = {}) {
  const { state: r } = e, { doc: i, tr: s } = r, o = t;
  i.descendants((l, a) => {
    const c = s.mapping.map(a), u = s.mapping.map(a) + l.nodeSize;
    let d = null;
    if (l.marks.forEach((h) => {
      if (h !== o)
        return !1;
      d = h;
    }), !d)
      return;
    let f = !1;
    if (Object.keys(n).forEach((h) => {
      n[h] !== d.attrs[h] && (f = !0);
    }), f) {
      const h = t.type.create({
        ...t.attrs,
        ...n
      });
      s.removeMark(c, u, t.type), s.addMark(c, u, h);
    }
  }), s.docChanged && e.view.dispatch(s);
}
var ot = class sp extends ic {
  constructor() {
    super(...arguments), this.type = "node";
  }
  /**
   * Create a new Node instance
   * @param config - Node configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new sp(n);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
};
function hr(t) {
  return new ex({
    find: t.find,
    handler: ({ state: e, range: n, match: r, pasteEvent: i }) => {
      const s = X(t.getAttributes, void 0, r, i);
      if (s === !1 || s === null)
        return null;
      const { tr: o } = e, l = r[r.length - 1], a = r[0];
      let c = n.to;
      if (l) {
        const u = a.search(/\S/), d = n.from + a.indexOf(l), f = d + l.length;
        if (rc(n.from, n.to, e.doc).filter((p) => p.mark.type.excluded.find((g) => g === t.type && g !== p.mark.type)).filter((p) => p.to > d).length)
          return null;
        f < n.to && o.delete(f, n.to), d > n.from && o.delete(n.from + u, d), c = n.from + u + l.length, o.addMark(n.from + u, c, t.type.create(s || {})), o.removeStoredMark(t.type);
      }
    }
  });
}
var qs = (t, e) => {
  if (t === "slot")
    return 0;
  if (t instanceof Function)
    return t(e);
  const { children: n, ...r } = e ?? {};
  if (t === "svg")
    throw new Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
  return [t, r, n];
}, bx = /^\s*>\s$/, kx = ot.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [{ tag: "blockquote" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return /* @__PURE__ */ qs("blockquote", { ...me(this.options.HTMLAttributes, t), children: /* @__PURE__ */ qs("slot", {}) });
  },
  parseMarkdown: (t, e) => e.createNode("blockquote", void 0, e.parseChildren(t.tokens || [])),
  renderMarkdown: (t, e) => {
    if (!t.content)
      return "";
    const n = ">", r = [];
    return t.content.forEach((i) => {
      const l = e.renderChildren([i]).split(`
`).map((a) => a.trim() === "" ? n : `${n} ${a}`);
      r.push(l.join(`
`));
    }), r.join(`
${n}
`);
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: t }) => t.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: t }) => t.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: t }) => t.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      Wr({
        find: bx,
        type: this.type
      })
    ];
  }
}), wx = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, xx = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, Sx = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, Cx = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, Mx = gr.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (t) => t.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (t) => t.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (t) => /^(bold(er)?|[5-9]\d{2,})$/.test(t) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return /* @__PURE__ */ qs("strong", { ...me(this.options.HTMLAttributes, t), children: /* @__PURE__ */ qs("slot", {}) });
  },
  markdownTokenName: "strong",
  parseMarkdown: (t, e) => e.applyMark("bold", e.parseInline(t.tokens || [])),
  renderMarkdown: (t, e) => `**${e.renderChildren(t)}**`,
  addCommands() {
    return {
      setBold: () => ({ commands: t }) => t.setMark(this.name),
      toggleBold: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetBold: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      jr({
        find: wx,
        type: this.type
      }),
      jr({
        find: Sx,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      hr({
        find: xx,
        type: this.type
      }),
      hr({
        find: Cx,
        type: this.type
      })
    ];
  }
}), Ex = /(^|[^`])`([^`]+)`(?!`)$/, Tx = /(^|[^`])`([^`]+)`(?!`)/g, Ax = gr.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [{ tag: "code" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["code", me(this.options.HTMLAttributes, t), 0];
  },
  markdownTokenName: "codespan",
  parseMarkdown: (t, e) => e.applyMark("code", [{ type: "text", text: t.text || "" }]),
  renderMarkdown: (t, e) => t.content ? `\`${e.renderChildren(t.content)}\`` : "",
  addCommands() {
    return {
      setCode: () => ({ commands: t }) => t.setMark(this.name),
      toggleCode: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetCode: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      jr({
        find: Ex,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      hr({
        find: Tx,
        type: this.type
      })
    ];
  }
}), kl = 4, _x = /^```([a-z]+)?[\s\n]$/, Ox = /^~~~([a-z]+)?[\s\n]$/, Nx = ot.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      defaultLanguage: null,
      enableTabIndentation: !1,
      tabSize: kl,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: (t) => {
          var e;
          const { languageClassPrefix: n } = this.options;
          if (!n)
            return null;
          const s = [...((e = t.firstElementChild) == null ? void 0 : e.classList) || []].filter((o) => o.startsWith(n)).map((o) => o.replace(n, ""))[0];
          return s || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: t, HTMLAttributes: e }) {
    return [
      "pre",
      me(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: t.attrs.language ? this.options.languageClassPrefix + t.attrs.language : null
        },
        0
      ]
    ];
  },
  markdownTokenName: "code",
  parseMarkdown: (t, e) => {
    var n;
    return ((n = t.raw) == null ? void 0 : n.startsWith("```")) === !1 && t.codeBlockStyle !== "indented" ? [] : e.createNode(
      "codeBlock",
      { language: t.lang || null },
      t.text ? [e.createTextNode(t.text)] : []
    );
  },
  renderMarkdown: (t, e) => {
    var n;
    let r = "";
    const i = ((n = t.attrs) == null ? void 0 : n.language) || "";
    return t.content ? r = [`\`\`\`${i}`, e.renderChildren(t.content), "```"].join(`
`) : r = `\`\`\`${i}

\`\`\``, r;
  },
  addCommands() {
    return {
      setCodeBlock: (t) => ({ commands: e }) => e.setNode(this.name, t),
      toggleCodeBlock: (t) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", t)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: t, $anchor: e } = this.editor.state.selection, n = e.pos === 1;
        return !t || e.parent.type.name !== this.name ? !1 : n || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // handle tab indentation
      Tab: ({ editor: t }) => {
        var e;
        if (!this.options.enableTabIndentation)
          return !1;
        const n = (e = this.options.tabSize) != null ? e : kl, { state: r } = t, { selection: i } = r, { $from: s, empty: o } = i;
        if (s.parent.type !== this.type)
          return !1;
        const l = " ".repeat(n);
        return o ? t.commands.insertContent(l) : t.commands.command(({ tr: a }) => {
          const { from: c, to: u } = i, h = r.doc.textBetween(c, u, `
`, `
`).split(`
`).map((p) => l + p).join(`
`);
          return a.replaceWith(c, u, r.schema.text(h)), !0;
        });
      },
      // handle shift+tab reverse indentation
      "Shift-Tab": ({ editor: t }) => {
        var e;
        if (!this.options.enableTabIndentation)
          return !1;
        const n = (e = this.options.tabSize) != null ? e : kl, { state: r } = t, { selection: i } = r, { $from: s, empty: o } = i;
        return s.parent.type !== this.type ? !1 : o ? t.commands.command(({ tr: l }) => {
          var a;
          const { pos: c } = s, u = s.start(), d = s.end(), h = r.doc.textBetween(u, d, `
`, `
`).split(`
`);
          let p = 0, m = 0;
          const g = c - u;
          for (let C = 0; C < h.length; C += 1) {
            if (m + h[C].length >= g) {
              p = C;
              break;
            }
            m += h[C].length + 1;
          }
          const y = ((a = h[p].match(/^ */)) == null ? void 0 : a[0]) || "", b = Math.min(y.length, n);
          if (b === 0)
            return !0;
          let k = u;
          for (let C = 0; C < p; C += 1)
            k += h[C].length + 1;
          return l.delete(k, k + b), c - k <= b && l.setSelection(j.create(l.doc, k)), !0;
        }) : t.commands.command(({ tr: l }) => {
          const { from: a, to: c } = i, f = r.doc.textBetween(a, c, `
`, `
`).split(`
`).map((h) => {
            var p;
            const m = ((p = h.match(/^ */)) == null ? void 0 : p[0]) || "", g = Math.min(m.length, n);
            return h.slice(g);
          }).join(`
`);
          return l.replaceWith(a, c, r.schema.text(f)), !0;
        });
      },
      // exit node on triple enter
      Enter: ({ editor: t }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = t, { selection: n } = e, { $from: r, empty: i } = n;
        if (!i || r.parent.type !== this.type)
          return !1;
        const s = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith(`

`);
        return !s || !o ? !1 : t.chain().command(({ tr: l }) => (l.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: t }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = t, { selection: n, doc: r } = e, { $from: i, empty: s } = n;
        if (!s || i.parent.type !== this.type || !(i.parentOffset === i.parent.nodeSize - 2))
          return !1;
        const l = i.after();
        return l === void 0 ? !1 : r.nodeAt(l) ? t.commands.command(({ tr: c }) => (c.setSelection(K.near(r.resolve(l))), !0)) : t.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      ra({
        find: _x,
        type: this.type,
        getAttributes: (t) => ({
          language: t[1]
        })
      }),
      ra({
        find: Ox,
        type: this.type,
        getAttributes: (t) => ({
          language: t[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new ce({
        key: new Ee("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (t, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const n = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), i = r ? JSON.parse(r) : void 0, s = i == null ? void 0 : i.mode;
            if (!n || !s)
              return !1;
            const { tr: o, schema: l } = t.state, a = l.text(n.replace(/\r\n?/g, `
`));
            return o.replaceSelectionWith(this.type.create({ language: s }, a)), o.selection.$from.parent.type !== this.type && o.setSelection(j.near(o.doc.resolve(Math.max(0, o.selection.from - 2)))), o.setMeta("paste", !0), t.dispatch(o), !0;
          }
        }
      })
    ];
  }
}), Ix = ot.create({
  name: "doc",
  topNode: !0,
  content: "block+",
  renderMarkdown: (t, e) => t.content ? e.renderChildren(t.content, `

`) : ""
}), Dx = ot.create({
  name: "hardBreak",
  markdownTokenName: "br",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [{ tag: "br" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["br", me(this.options.HTMLAttributes, t)];
  },
  renderText() {
    return `
`;
  },
  renderMarkdown: () => `  
`,
  parseMarkdown: () => ({
    type: "hardBreak"
  }),
  addCommands() {
    return {
      setHardBreak: () => ({ commands: t, chain: e, state: n, editor: r }) => t.first([
        () => t.exitCode(),
        () => t.command(() => {
          const { selection: i, storedMarks: s } = n;
          if (i.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: o } = this.options, { splittableMarks: l } = r.extensionManager, a = s || i.$to.parentOffset && i.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
            if (u && a && o) {
              const d = a.filter((f) => l.includes(f.type.name));
              c.ensureMarks(d);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), Rx = ot.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((t) => ({
      tag: `h${t}`,
      attrs: { level: t }
    }));
  },
  renderHTML({ node: t, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(t.attrs.level) ? t.attrs.level : this.options.levels[0]}`, me(this.options.HTMLAttributes, e), 0];
  },
  parseMarkdown: (t, e) => e.createNode("heading", { level: t.depth || 1 }, e.parseInline(t.tokens || [])),
  renderMarkdown: (t, e) => {
    var n;
    const r = (n = t.attrs) != null && n.level ? parseInt(t.attrs.level, 10) : 1, i = "#".repeat(r);
    return t.content ? `${i} ${e.renderChildren(t.content)}` : "";
  },
  addCommands() {
    return {
      setHeading: (t) => ({ commands: e }) => this.options.levels.includes(t.level) ? e.setNode(this.name, t) : !1,
      toggleHeading: (t) => ({ commands: e }) => this.options.levels.includes(t.level) ? e.toggleNode(this.name, "paragraph", t) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (t, e) => ({
        ...t,
        [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
      }),
      {}
    );
  },
  addInputRules() {
    return this.options.levels.map((t) => ra({
      find: new RegExp(`^(#{${Math.min(...this.options.levels)},${t}})\\s$`),
      type: this.type,
      getAttributes: {
        level: t
      }
    }));
  }
}), Lx = ot.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {},
      nextNodeType: "paragraph"
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["hr", me(this.options.HTMLAttributes, t)];
  },
  markdownTokenName: "hr",
  parseMarkdown: (t, e) => e.createNode("horizontalRule"),
  renderMarkdown: () => "---",
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: t, state: e }) => {
        if (!dx(e, e.schema.nodes[this.name]))
          return !1;
        const { selection: n } = e, { $to: r } = n, i = t();
        return qh(n) ? i.insertContentAt(r.pos, {
          type: this.name
        }) : i.insertContent({ type: this.name }), i.command(({ state: s, tr: o, dispatch: l }) => {
          if (l) {
            const { $to: a } = o.selection, c = a.end();
            if (a.nodeAfter)
              a.nodeAfter.isTextblock ? o.setSelection(j.create(o.doc, a.pos + 1)) : a.nodeAfter.isBlock ? o.setSelection(B.create(o.doc, a.pos)) : o.setSelection(j.create(o.doc, a.pos));
            else {
              const u = s.schema.nodes[this.options.nextNodeType] || a.parent.type.contentMatch.defaultType, d = u == null ? void 0 : u.create();
              d && (o.insert(c, d), o.setSelection(j.create(o.doc, c + 1)));
            }
            o.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      ux({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), Px = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, Bx = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, zx = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, Fx = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, Vx = gr.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (t) => t.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (t) => t.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["em", me(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: t }) => t.setMark(this.name),
      toggleItalic: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetItalic: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  markdownTokenName: "em",
  parseMarkdown: (t, e) => e.applyMark("italic", e.parseInline(t.tokens || [])),
  renderMarkdown: (t, e) => `*${e.renderChildren(t)}*`,
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      jr({
        find: Px,
        type: this.type
      }),
      jr({
        find: zx,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      hr({
        find: Bx,
        type: this.type
      }),
      hr({
        find: Fx,
        type: this.type
      })
    ];
  }
});
const Hx = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", jx = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", sa = "numeric", oa = "ascii", la = "alpha", hi = "asciinumeric", si = "alphanumeric", aa = "domain", op = "emoji", Wx = "scheme", Ux = "slashscheme", wl = "whitespace";
function qx(t, e) {
  return t in e || (e[t] = []), e[t];
}
function $n(t, e, n) {
  e[sa] && (e[hi] = !0, e[si] = !0), e[oa] && (e[hi] = !0, e[la] = !0), e[hi] && (e[si] = !0), e[la] && (e[si] = !0), e[si] && (e[aa] = !0), e[op] && (e[aa] = !0);
  for (const r in e) {
    const i = qx(r, n);
    i.indexOf(t) < 0 && i.push(t);
  }
}
function Kx(t, e) {
  const n = {};
  for (const r in e)
    e[r].indexOf(t) >= 0 && (n[r] = !0);
  return n;
}
function Je(t = null) {
  this.j = {}, this.jr = [], this.jd = null, this.t = t;
}
Je.groups = {};
Je.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(t) {
    const e = this, n = e.j[t];
    if (n)
      return n;
    for (let r = 0; r < e.jr.length; r++) {
      const i = e.jr[r][0], s = e.jr[r][1];
      if (s && i.test(t))
        return s;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(t, e = !1) {
    return e ? t in this.j : !!this.go(t);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(t, e, n, r) {
    for (let i = 0; i < t.length; i++)
      this.tt(t[i], e, n, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(t, e, n, r) {
    r = r || Je.groups;
    let i;
    return e && e.j ? i = e : (i = new Je(e), n && r && $n(e, n, r)), this.jr.push([t, i]), i;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(t, e, n, r) {
    let i = this;
    const s = t.length;
    if (!s)
      return i;
    for (let o = 0; o < s - 1; o++)
      i = i.tt(t[o]);
    return i.tt(t[s - 1], e, n, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(t, e, n, r) {
    r = r || Je.groups;
    const i = this;
    if (e && e.j)
      return i.j[t] = e, e;
    const s = e;
    let o, l = i.go(t);
    if (l ? (o = new Je(), Object.assign(o.j, l.j), o.jr.push.apply(o.jr, l.jr), o.jd = l.jd, o.t = l.t) : o = new Je(), s) {
      if (r)
        if (o.t && typeof o.t == "string") {
          const a = Object.assign(Kx(o.t, r), n);
          $n(s, a, r);
        } else n && $n(s, n, r);
      o.t = s;
    }
    return i.j[t] = o, o;
  }
};
const q = (t, e, n, r, i) => t.ta(e, n, r, i), le = (t, e, n, r, i) => t.tr(e, n, r, i), Vu = (t, e, n, r, i) => t.ts(e, n, r, i), A = (t, e, n, r, i) => t.tt(e, n, r, i), Ut = "WORD", ca = "UWORD", lp = "ASCIINUMERICAL", ap = "ALPHANUMERICAL", zi = "LOCALHOST", ua = "TLD", da = "UTLD", Cs = "SCHEME", xr = "SLASH_SCHEME", ac = "NUM", fa = "WS", cc = "NL", pi = "OPENBRACE", mi = "CLOSEBRACE", Ks = "OPENBRACKET", Js = "CLOSEBRACKET", $s = "OPENPAREN", Gs = "CLOSEPAREN", Ys = "OPENANGLEBRACKET", Xs = "CLOSEANGLEBRACKET", Qs = "FULLWIDTHLEFTPAREN", Zs = "FULLWIDTHRIGHTPAREN", eo = "LEFTCORNERBRACKET", to = "RIGHTCORNERBRACKET", no = "LEFTWHITECORNERBRACKET", ro = "RIGHTWHITECORNERBRACKET", io = "FULLWIDTHLESSTHAN", so = "FULLWIDTHGREATERTHAN", oo = "AMPERSAND", lo = "APOSTROPHE", ao = "ASTERISK", an = "AT", co = "BACKSLASH", uo = "BACKTICK", fo = "CARET", dn = "COLON", uc = "COMMA", ho = "DOLLAR", At = "DOT", po = "EQUALS", dc = "EXCLAMATION", ct = "HYPHEN", gi = "PERCENT", mo = "PIPE", go = "PLUS", vo = "POUND", vi = "QUERY", fc = "QUOTE", cp = "FULLWIDTHMIDDLEDOT", hc = "SEMI", _t = "SLASH", yi = "TILDE", yo = "UNDERSCORE", up = "EMOJI", bo = "SYM";
var dp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ALPHANUMERICAL: ap,
  AMPERSAND: oo,
  APOSTROPHE: lo,
  ASCIINUMERICAL: lp,
  ASTERISK: ao,
  AT: an,
  BACKSLASH: co,
  BACKTICK: uo,
  CARET: fo,
  CLOSEANGLEBRACKET: Xs,
  CLOSEBRACE: mi,
  CLOSEBRACKET: Js,
  CLOSEPAREN: Gs,
  COLON: dn,
  COMMA: uc,
  DOLLAR: ho,
  DOT: At,
  EMOJI: up,
  EQUALS: po,
  EXCLAMATION: dc,
  FULLWIDTHGREATERTHAN: so,
  FULLWIDTHLEFTPAREN: Qs,
  FULLWIDTHLESSTHAN: io,
  FULLWIDTHMIDDLEDOT: cp,
  FULLWIDTHRIGHTPAREN: Zs,
  HYPHEN: ct,
  LEFTCORNERBRACKET: eo,
  LEFTWHITECORNERBRACKET: no,
  LOCALHOST: zi,
  NL: cc,
  NUM: ac,
  OPENANGLEBRACKET: Ys,
  OPENBRACE: pi,
  OPENBRACKET: Ks,
  OPENPAREN: $s,
  PERCENT: gi,
  PIPE: mo,
  PLUS: go,
  POUND: vo,
  QUERY: vi,
  QUOTE: fc,
  RIGHTCORNERBRACKET: to,
  RIGHTWHITECORNERBRACKET: ro,
  SCHEME: Cs,
  SEMI: hc,
  SLASH: _t,
  SLASH_SCHEME: xr,
  SYM: bo,
  TILDE: yi,
  TLD: ua,
  UNDERSCORE: yo,
  UTLD: da,
  UWORD: ca,
  WORD: Ut,
  WS: fa
});
const jt = /[a-z]/, ei = new RegExp("\\p{L}", "u"), xl = new RegExp("\\p{Emoji}", "u"), Wt = /\d/, Sl = /\s/, Hu = "\r", Cl = `
`, Jx = "️", $x = "‍", Ml = "￼";
let fs = null, hs = null;
function Gx(t = []) {
  const e = {};
  Je.groups = e;
  const n = new Je();
  fs == null && (fs = ju(Hx)), hs == null && (hs = ju(jx)), A(n, "'", lo), A(n, "{", pi), A(n, "}", mi), A(n, "[", Ks), A(n, "]", Js), A(n, "(", $s), A(n, ")", Gs), A(n, "<", Ys), A(n, ">", Xs), A(n, "（", Qs), A(n, "）", Zs), A(n, "「", eo), A(n, "」", to), A(n, "『", no), A(n, "』", ro), A(n, "＜", io), A(n, "＞", so), A(n, "&", oo), A(n, "*", ao), A(n, "@", an), A(n, "`", uo), A(n, "^", fo), A(n, ":", dn), A(n, ",", uc), A(n, "$", ho), A(n, ".", At), A(n, "=", po), A(n, "!", dc), A(n, "-", ct), A(n, "%", gi), A(n, "|", mo), A(n, "+", go), A(n, "#", vo), A(n, "?", vi), A(n, '"', fc), A(n, "/", _t), A(n, ";", hc), A(n, "~", yi), A(n, "_", yo), A(n, "\\", co), A(n, "・", cp);
  const r = le(n, Wt, ac, {
    [sa]: !0
  });
  le(r, Wt, r);
  const i = le(r, jt, lp, {
    [hi]: !0
  }), s = le(r, ei, ap, {
    [si]: !0
  }), o = le(n, jt, Ut, {
    [oa]: !0
  });
  le(o, Wt, i), le(o, jt, o), le(i, Wt, i), le(i, jt, i);
  const l = le(n, ei, ca, {
    [la]: !0
  });
  le(l, jt), le(l, Wt, s), le(l, ei, l), le(s, Wt, s), le(s, jt), le(s, ei, s);
  const a = A(n, Cl, cc, {
    [wl]: !0
  }), c = A(n, Hu, fa, {
    [wl]: !0
  }), u = le(n, Sl, fa, {
    [wl]: !0
  });
  A(n, Ml, u), A(c, Cl, a), A(c, Ml, u), le(c, Sl, u), A(u, Hu), A(u, Cl), le(u, Sl, u), A(u, Ml, u);
  const d = le(n, xl, up, {
    [op]: !0
  });
  A(d, "#"), le(d, xl, d), A(d, Jx, d);
  const f = A(d, $x);
  A(f, "#"), le(f, xl, d);
  const h = [[jt, o], [Wt, i]], p = [[jt, null], [ei, l], [Wt, s]];
  for (let m = 0; m < fs.length; m++)
    rn(n, fs[m], ua, Ut, h);
  for (let m = 0; m < hs.length; m++)
    rn(n, hs[m], da, ca, p);
  $n(ua, {
    tld: !0,
    ascii: !0
  }, e), $n(da, {
    utld: !0,
    alpha: !0
  }, e), rn(n, "file", Cs, Ut, h), rn(n, "mailto", Cs, Ut, h), rn(n, "http", xr, Ut, h), rn(n, "https", xr, Ut, h), rn(n, "ftp", xr, Ut, h), rn(n, "ftps", xr, Ut, h), $n(Cs, {
    scheme: !0,
    ascii: !0
  }, e), $n(xr, {
    slashscheme: !0,
    ascii: !0
  }, e), t = t.sort((m, g) => m[0] > g[0] ? 1 : -1);
  for (let m = 0; m < t.length; m++) {
    const g = t[m][0], y = t[m][1] ? {
      [Wx]: !0
    } : {
      [Ux]: !0
    };
    g.indexOf("-") >= 0 ? y[aa] = !0 : jt.test(g) ? Wt.test(g) ? y[hi] = !0 : y[oa] = !0 : y[sa] = !0, Vu(n, g, g, y);
  }
  return Vu(n, "localhost", zi, {
    ascii: !0
  }), n.jd = new Je(bo), {
    start: n,
    tokens: Object.assign({
      groups: e
    }, dp)
  };
}
function fp(t, e) {
  const n = Yx(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = n.length, i = [];
  let s = 0, o = 0;
  for (; o < r; ) {
    let l = t, a = null, c = 0, u = null, d = -1, f = -1;
    for (; o < r && (a = l.go(n[o])); )
      l = a, l.accepts() ? (d = 0, f = 0, u = l) : d >= 0 && (d += n[o].length, f++), c += n[o].length, s += n[o].length, o++;
    s -= d, o -= f, c -= d, i.push({
      t: u.t,
      // token type/name
      v: e.slice(s - c, s),
      // string value
      s: s - c,
      // start index
      e: s
      // end index (excluding)
    });
  }
  return i;
}
function Yx(t) {
  const e = [], n = t.length;
  let r = 0;
  for (; r < n; ) {
    let i = t.charCodeAt(r), s, o = i < 55296 || i > 56319 || r + 1 === n || (s = t.charCodeAt(r + 1)) < 56320 || s > 57343 ? t[r] : t.slice(r, r + 2);
    e.push(o), r += o.length;
  }
  return e;
}
function rn(t, e, n, r, i) {
  let s;
  const o = e.length;
  for (let l = 0; l < o - 1; l++) {
    const a = e[l];
    t.j[a] ? s = t.j[a] : (s = new Je(r), s.jr = i.slice(), t.j[a] = s), t = s;
  }
  return s = new Je(n), s.jr = i.slice(), t.j[e[o - 1]] = s, s;
}
function ju(t) {
  const e = [], n = [];
  let r = 0, i = "0123456789";
  for (; r < t.length; ) {
    let s = 0;
    for (; i.indexOf(t[r + s]) >= 0; )
      s++;
    if (s > 0) {
      e.push(n.join(""));
      for (let o = parseInt(t.substring(r, r + s), 10); o > 0; o--)
        n.pop();
      r += s;
    } else
      n.push(t[r]), r++;
  }
  return e;
}
const Fi = {
  defaultProtocol: "http",
  events: null,
  format: Wu,
  formatHref: Wu,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function pc(t, e = null) {
  let n = Object.assign({}, Fi);
  t && (n = Object.assign(n, t instanceof pc ? t.o : t));
  const r = n.ignoreTags, i = [];
  for (let s = 0; s < r.length; s++)
    i.push(r[s].toUpperCase());
  this.o = n, e && (this.defaultRender = e), this.ignoreTags = i;
}
pc.prototype = {
  o: Fi,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(t) {
    return t;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(t) {
    return this.get("validate", t.toString(), t);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(t, e, n) {
    const r = e != null;
    let i = this.o[t];
    return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : Fi[t], typeof i == "function" && r && (i = i(e, n))) : typeof i == "function" && r && (i = i(e, n.t, n)), i);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(t, e, n) {
    let r = this.o[t];
    return typeof r == "function" && e != null && (r = r(e, n.t, n)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(t) {
    const e = t.render(this);
    return (this.get("render", null, t) || this.defaultRender)(e, t.t, t);
  }
};
function Wu(t) {
  return t;
}
function hp(t, e) {
  this.t = "token", this.v = t, this.tk = e;
}
hp.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(t) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(t) {
    const e = this.toString(), n = t.get("truncate", e, this), r = t.get("format", e, this);
    return n && r.length > n ? r.substring(0, n) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(t) {
    return t.get("formatHref", this.toHref(t.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(t = Fi.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(t),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(t) {
    return {
      type: this.t,
      value: this.toFormattedString(t),
      isLink: this.isLink,
      href: this.toFormattedHref(t),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(t) {
    return t.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(t) {
    const e = this, n = this.toHref(t.get("defaultProtocol")), r = t.get("formatHref", n, this), i = t.get("tagName", n, e), s = this.toFormattedString(t), o = {}, l = t.get("className", n, e), a = t.get("target", n, e), c = t.get("rel", n, e), u = t.getObj("attributes", n, e), d = t.getObj("events", n, e);
    return o.href = r, l && (o.class = l), a && (o.target = a), c && (o.rel = c), u && Object.assign(o, u), {
      tagName: i,
      attributes: o,
      content: s,
      eventListeners: d
    };
  }
};
function qo(t, e) {
  class n extends hp {
    constructor(i, s) {
      super(i, s), this.t = t;
    }
  }
  for (const r in e)
    n.prototype[r] = e[r];
  return n.t = t, n;
}
const Uu = qo("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), qu = qo("text"), Xx = qo("nl"), ps = qo("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(t = Fi.defaultProtocol) {
    return this.hasProtocol() ? this.v : `${t}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const t = this.tk;
    return t.length >= 2 && t[0].t !== zi && t[1].t === dn;
  }
}), at = (t) => new Je(t);
function Qx({
  groups: t
}) {
  const e = t.domain.concat([oo, ao, an, co, uo, fo, ho, po, ct, ac, gi, mo, go, vo, _t, bo, yi, yo]), n = [lo, dn, uc, At, dc, gi, vi, fc, hc, Ys, Xs, pi, mi, Js, Ks, $s, Gs, Qs, Zs, eo, to, no, ro, io, so], r = [oo, lo, ao, co, uo, fo, ho, po, ct, pi, mi, gi, mo, go, vo, vi, _t, bo, yi, yo], i = at(), s = A(i, yi);
  q(s, r, s), q(s, t.domain, s);
  const o = at(), l = at(), a = at();
  q(i, t.domain, o), q(i, t.scheme, l), q(i, t.slashscheme, a), q(o, r, s), q(o, t.domain, o);
  const c = A(o, an);
  A(s, an, c), A(l, an, c), A(a, an, c);
  const u = A(s, At);
  q(u, r, s), q(u, t.domain, s);
  const d = at();
  q(c, t.domain, d), q(d, t.domain, d);
  const f = A(d, At);
  q(f, t.domain, d);
  const h = at(Uu);
  q(f, t.tld, h), q(f, t.utld, h), A(c, zi, h);
  const p = A(d, ct);
  A(p, ct, p), q(p, t.domain, d), q(h, t.domain, d), A(h, At, f), A(h, ct, p);
  const m = A(h, dn);
  q(m, t.numeric, Uu);
  const g = A(o, ct), v = A(o, At);
  A(g, ct, g), q(g, t.domain, o), q(v, r, s), q(v, t.domain, o);
  const y = at(ps);
  q(v, t.tld, y), q(v, t.utld, y), q(y, t.domain, o), q(y, r, s), A(y, At, v), A(y, ct, g), A(y, an, c);
  const b = A(y, dn), k = at(ps);
  q(b, t.numeric, k);
  const x = at(ps), C = at();
  q(x, e, x), q(x, n, C), q(C, e, x), q(C, n, C), A(y, _t, x), A(k, _t, x);
  const S = A(l, dn), O = A(a, dn), R = A(O, _t), U = A(R, _t);
  q(l, t.domain, o), A(l, At, v), A(l, ct, g), q(a, t.domain, o), A(a, At, v), A(a, ct, g), q(S, t.domain, x), A(S, _t, x), A(S, vi, x), q(U, t.domain, x), q(U, e, x), A(U, _t, x);
  const ve = [
    [pi, mi],
    // {}
    [Ks, Js],
    // []
    [$s, Gs],
    // ()
    [Ys, Xs],
    // <>
    [Qs, Zs],
    // （）
    [eo, to],
    // 「」
    [no, ro],
    // 『』
    [io, so]
    // ＜＞
  ];
  for (let ye = 0; ye < ve.length; ye++) {
    const [ue, M] = ve[ye], N = A(x, ue);
    A(C, ue, N), A(N, M, x);
    const Ge = at(ps);
    q(N, e, Ge);
    const lt = at();
    q(N, n), q(Ge, e, Ge), q(Ge, n, lt), q(lt, e, Ge), q(lt, n, lt), A(Ge, M, x), A(lt, M, x);
  }
  return A(i, zi, y), A(i, cc, Xx), {
    start: i,
    tokens: dp
  };
}
function Zx(t, e, n) {
  let r = n.length, i = 0, s = [], o = [];
  for (; i < r; ) {
    let l = t, a = null, c = null, u = 0, d = null, f = -1;
    for (; i < r && !(a = l.go(n[i].t)); )
      o.push(n[i++]);
    for (; i < r && (c = a || l.go(n[i].t)); )
      a = null, l = c, l.accepts() ? (f = 0, d = l) : f >= 0 && f++, i++, u++;
    if (f < 0)
      i -= u, i < r && (o.push(n[i]), i++);
    else {
      o.length > 0 && (s.push(El(qu, e, o)), o = []), i -= f, u -= f;
      const h = d.t, p = n.slice(i - u, i);
      s.push(El(h, e, p));
    }
  }
  return o.length > 0 && s.push(El(qu, e, o)), s;
}
function El(t, e, n) {
  const r = n[0].s, i = n[n.length - 1].e, s = e.slice(r, i);
  return new t(s, n);
}
const eS = typeof console < "u" && console && console.warn || (() => {
}), tS = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", te = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function nS() {
  return Je.groups = {}, te.scanner = null, te.parser = null, te.tokenQueue = [], te.pluginQueue = [], te.customSchemes = [], te.initialized = !1, te;
}
function Ku(t, e = !1) {
  if (te.initialized && eS(`linkifyjs: already initialized - will not register custom scheme "${t}" ${tS}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(t))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  te.customSchemes.push([t, e]);
}
function rS() {
  te.scanner = Gx(te.customSchemes);
  for (let t = 0; t < te.tokenQueue.length; t++)
    te.tokenQueue[t][1]({
      scanner: te.scanner
    });
  te.parser = Qx(te.scanner.tokens);
  for (let t = 0; t < te.pluginQueue.length; t++)
    te.pluginQueue[t][1]({
      scanner: te.scanner,
      parser: te.parser
    });
  return te.initialized = !0, te;
}
function mc(t) {
  return te.initialized || rS(), Zx(te.parser.start, t, fp(te.scanner.start, t));
}
mc.scan = fp;
function pp(t, e = null, n = null) {
  if (e && typeof e == "object") {
    if (n)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    n = e, e = null;
  }
  const r = new pc(n), i = mc(t), s = [];
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    l.isLink && (!e || l.t === e) && r.check(l) && s.push(l.toFormattedObject(r));
  }
  return s;
}
var gc = "[\0-   ᠎ -\u2029 　]", iS = new RegExp(gc), sS = new RegExp(`${gc}$`), oS = new RegExp(gc, "g");
function lS(t) {
  return t.length === 1 ? t[0].isLink : t.length === 3 && t[1].isLink ? ["()", "[]"].includes(t[0].value + t[2].value) : !1;
}
function aS(t) {
  return new ce({
    key: new Ee("autolink"),
    appendTransaction: (e, n, r) => {
      const i = e.some((c) => c.docChanged) && !n.doc.eq(r.doc), s = e.some((c) => c.getMeta("preventAutolink"));
      if (!i || s)
        return;
      const { tr: o } = r, l = Bh(n.doc, [...e]);
      if (Uh(l).forEach(({ newRange: c }) => {
        const u = mw(r.doc, c, (h) => h.isTextblock);
        let d, f;
        if (u.length > 1)
          d = u[0], f = r.doc.textBetween(
            d.pos,
            d.pos + d.node.nodeSize,
            void 0,
            " "
          );
        else if (u.length) {
          const h = r.doc.textBetween(c.from, c.to, " ", " ");
          if (!sS.test(h))
            return;
          d = u[0], f = r.doc.textBetween(d.pos, c.to, void 0, " ");
        }
        if (d && f) {
          const h = f.split(iS).filter(Boolean);
          if (h.length <= 0)
            return !1;
          const p = h[h.length - 1], m = d.pos + f.lastIndexOf(p);
          if (!p)
            return !1;
          const g = mc(p).map((v) => v.toObject(t.defaultProtocol));
          if (!lS(g))
            return !1;
          g.filter((v) => v.isLink).map((v) => ({
            ...v,
            from: m + v.start + 1,
            to: m + v.end + 1
          })).filter((v) => r.schema.marks.code ? !r.doc.rangeHasMark(v.from, v.to, r.schema.marks.code) : !0).filter((v) => t.validate(v.value)).filter((v) => t.shouldAutoLink(v.value)).forEach((v) => {
            rc(v.from, v.to, r.doc).some((y) => y.mark.type === t.type) || o.addMark(
              v.from,
              v.to,
              t.type.create({
                href: v.href
              })
            );
          });
        }
      }), !!o.steps.length)
        return o;
    }
  });
}
function cS(t) {
  return new ce({
    key: new Ee("handleClickLink"),
    props: {
      handleClick: (e, n, r) => {
        var i, s;
        if (r.button !== 0 || !e.editable)
          return !1;
        let o = null;
        if (r.target instanceof HTMLAnchorElement)
          o = r.target;
        else {
          let u = r.target;
          const d = [];
          for (; u.nodeName !== "DIV"; )
            d.push(u), u = u.parentNode;
          o = d.find((f) => f.nodeName === "A");
        }
        if (!o)
          return !1;
        const l = Wh(e.state, t.type.name), a = (i = o == null ? void 0 : o.href) != null ? i : l.href, c = (s = o == null ? void 0 : o.target) != null ? s : l.target;
        return t.enableClickSelection && t.editor.commands.extendMarkRange(t.type.name), o && a ? (window.open(a, c), !0) : !1;
      }
    }
  });
}
function uS(t) {
  return new ce({
    key: new Ee("handlePasteLink"),
    props: {
      handlePaste: (e, n, r) => {
        const { shouldAutoLink: i } = t, { state: s } = e, { selection: o } = s, { empty: l } = o;
        if (l)
          return !1;
        let a = "";
        r.content.forEach((u) => {
          a += u.textContent;
        });
        const c = pp(a, { defaultProtocol: t.defaultProtocol }).find(
          (u) => u.isLink && u.value === a
        );
        return !a || !c || i !== void 0 && !i(c.href) ? !1 : t.editor.commands.setMark(t.type, {
          href: c.href
        });
      }
    }
  });
}
function Vn(t, e) {
  const n = ["http", "https", "ftp", "ftps", "mailto", "tel", "callto", "sms", "cid", "xmpp"];
  return e && e.forEach((r) => {
    const i = typeof r == "string" ? r : r.scheme;
    i && n.push(i);
  }), !t || t.replace(oS, "").match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `^(?:(?:${n.join("|")}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`,
      "i"
    )
  );
}
var dS = gr.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  exitable: !0,
  onCreate() {
    this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((t) => {
      if (typeof t == "string") {
        Ku(t);
        return;
      }
      Ku(t.scheme, t.optionalSlashes);
    });
  },
  onDestroy() {
    nS();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      enableClickSelection: !1,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      isAllowedUri: (t, e) => !!Vn(t, e.protocols),
      validate: (t) => !!t,
      shouldAutoLink: (t) => !!t
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(t) {
          return t.getAttribute("href");
        }
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[href]",
        getAttrs: (t) => {
          const e = t.getAttribute("href");
          return !e || !this.options.isAllowedUri(e, {
            defaultValidate: (n) => !!Vn(n, this.options.protocols),
            protocols: this.options.protocols,
            defaultProtocol: this.options.defaultProtocol
          }) ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return this.options.isAllowedUri(t.href, {
      defaultValidate: (e) => !!Vn(e, this.options.protocols),
      protocols: this.options.protocols,
      defaultProtocol: this.options.defaultProtocol
    }) ? ["a", me(this.options.HTMLAttributes, t), 0] : ["a", me(this.options.HTMLAttributes, { ...t, href: "" }), 0];
  },
  markdownTokenName: "link",
  parseMarkdown: (t, e) => e.applyMark("link", e.parseInline(t.tokens || []), {
    href: t.href,
    title: t.title || null
  }),
  renderMarkdown: (t, e) => {
    var n;
    const r = ((n = t.attrs) == null ? void 0 : n.href) || "";
    return `[${e.renderChildren(t)}](${r})`;
  },
  addCommands() {
    return {
      setLink: (t) => ({ chain: e }) => {
        const { href: n } = t;
        return this.options.isAllowedUri(n, {
          defaultValidate: (r) => !!Vn(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().setMark(this.name, t).setMeta("preventAutolink", !0).run() : !1;
      },
      toggleLink: (t) => ({ chain: e }) => {
        const { href: n } = t || {};
        return n && !this.options.isAllowedUri(n, {
          defaultValidate: (r) => !!Vn(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? !1 : e().toggleMark(this.name, t, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
      },
      unsetLink: () => ({ chain: t }) => t().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      hr({
        find: (t) => {
          const e = [];
          if (t) {
            const { protocols: n, defaultProtocol: r } = this.options, i = pp(t).filter(
              (s) => s.isLink && this.options.isAllowedUri(s.value, {
                defaultValidate: (o) => !!Vn(o, n),
                protocols: n,
                defaultProtocol: r
              })
            );
            i.length && i.forEach((s) => {
              this.options.shouldAutoLink(s.value) && e.push({
                text: s.value,
                data: {
                  href: s.href
                },
                index: s.start
              });
            });
          }
          return e;
        },
        type: this.type,
        getAttributes: (t) => {
          var e;
          return {
            href: (e = t.data) == null ? void 0 : e.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const t = [], { protocols: e, defaultProtocol: n } = this.options;
    return this.options.autolink && t.push(
      aS({
        type: this.type,
        defaultProtocol: this.options.defaultProtocol,
        validate: (r) => this.options.isAllowedUri(r, {
          defaultValidate: (i) => !!Vn(i, e),
          protocols: e,
          defaultProtocol: n
        }),
        shouldAutoLink: this.options.shouldAutoLink
      })
    ), this.options.openOnClick === !0 && t.push(
      cS({
        type: this.type,
        editor: this.editor,
        enableClickSelection: this.options.enableClickSelection
      })
    ), this.options.linkOnPaste && t.push(
      uS({
        editor: this.editor,
        defaultProtocol: this.options.defaultProtocol,
        type: this.type,
        shouldAutoLink: this.options.shouldAutoLink
      })
    ), t;
  }
}), fS = Object.defineProperty, hS = (t, e) => {
  for (var n in e)
    fS(t, n, { get: e[n], enumerable: !0 });
}, pS = "listItem", Ju = "textStyle", $u = /^\s*([-+*])\s$/, mp = ot.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [{ tag: "ul" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["ul", me(this.options.HTMLAttributes, t), 0];
  },
  markdownTokenName: "list",
  parseMarkdown: (t, e) => t.type !== "list" || t.ordered ? [] : {
    type: "bulletList",
    content: t.items ? e.parseChildren(t.items) : []
  },
  renderMarkdown: (t, e) => t.content ? e.renderChildren(t.content, `
`) : "",
  markdownOptions: {
    indentsContent: !0
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: t, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(pS, this.editor.getAttributes(Ju)).run() : t.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let t = Wr({
      find: $u,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (t = Wr({
      find: $u,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(Ju),
      editor: this.editor
    })), [t];
  }
}), gp = ot.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["li", me(this.options.HTMLAttributes, t), 0];
  },
  markdownTokenName: "list_item",
  parseMarkdown: (t, e) => {
    if (t.type !== "list_item")
      return [];
    let n = [];
    if (t.tokens && t.tokens.length > 0)
      if (t.tokens.some((i) => i.type === "paragraph"))
        n = e.parseChildren(t.tokens);
      else {
        const i = t.tokens[0];
        if (i && i.type === "text" && i.tokens && i.tokens.length > 0) {
          if (n = [
            {
              type: "paragraph",
              content: e.parseInline(i.tokens)
            }
          ], t.tokens.length > 1) {
            const o = t.tokens.slice(1), l = e.parseChildren(o);
            n.push(...l);
          }
        } else
          n = e.parseChildren(t.tokens);
      }
    return n.length === 0 && (n = [
      {
        type: "paragraph",
        content: []
      }
    ]), {
      type: "listItem",
      content: n
    };
  },
  renderMarkdown: (t, e, n) => lc(
    t,
    e,
    (r) => r.parentType === "bulletList" ? "- " : r.parentType === "orderedList" ? `${r.index + 1}. ` : "- ",
    n
  ),
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), mS = {};
hS(mS, {
  findListItemPos: () => ts,
  getNextListDepth: () => vc,
  handleBackspace: () => ha,
  handleDelete: () => pa,
  hasListBefore: () => vp,
  hasListItemAfter: () => gS,
  hasListItemBefore: () => yp,
  listItemHasSubList: () => bp,
  nextListIsDeeper: () => kp,
  nextListIsHigher: () => wp
});
var ts = (t, e) => {
  const { $from: n } = e.selection, r = pe(t, e.schema);
  let i = null, s = n.depth, o = n.pos, l = null;
  for (; s > 0 && l === null; )
    i = n.node(s), i.type === r ? l = s : (s -= 1, o -= 1);
  return l === null ? null : { $pos: e.doc.resolve(o), depth: l };
}, vc = (t, e) => {
  const n = ts(t, e);
  if (!n)
    return !1;
  const [, r] = Mw(e, t, n.$pos.pos + 4);
  return r;
}, vp = (t, e, n) => {
  const { $anchor: r } = t.selection, i = Math.max(0, r.pos - 2), s = t.doc.resolve(i).node();
  return !(!s || !n.includes(s.type.name));
}, yp = (t, e) => {
  var n;
  const { $anchor: r } = e.selection, i = e.doc.resolve(r.pos - 2);
  return !(i.index() === 0 || ((n = i.nodeBefore) == null ? void 0 : n.type.name) !== t);
}, bp = (t, e, n) => {
  if (!n)
    return !1;
  const r = pe(t, e.schema);
  let i = !1;
  return n.descendants((s) => {
    s.type === r && (i = !0);
  }), i;
}, ha = (t, e, n) => {
  if (t.commands.undoInputRule())
    return !0;
  if (t.state.selection.from !== t.state.selection.to)
    return !1;
  if (!An(t.state, e) && vp(t.state, e, n)) {
    const { $anchor: l } = t.state.selection, a = t.state.doc.resolve(l.before() - 1), c = [];
    a.node().descendants((f, h) => {
      f.type.name === e && c.push({ node: f, pos: h });
    });
    const u = c.at(-1);
    if (!u)
      return !1;
    const d = t.state.doc.resolve(a.start() + u.pos + 1);
    return t.chain().cut({ from: l.start() - 1, to: l.end() + 1 }, d.end()).joinForward().run();
  }
  if (!An(t.state, e) || !_w(t.state))
    return !1;
  const r = ts(e, t.state);
  if (!r)
    return !1;
  const s = t.state.doc.resolve(r.$pos.pos - 2).node(r.depth), o = bp(e, t.state, s);
  return yp(e, t.state) && !o ? t.commands.joinItemBackward() : t.chain().liftListItem(e).run();
}, kp = (t, e) => {
  const n = vc(t, e), r = ts(t, e);
  return !r || !n ? !1 : n > r.depth;
}, wp = (t, e) => {
  const n = vc(t, e), r = ts(t, e);
  return !r || !n ? !1 : n < r.depth;
}, pa = (t, e) => {
  if (!An(t.state, e) || !Aw(t.state, e))
    return !1;
  const { selection: n } = t.state, { $from: r, $to: i } = n;
  return !n.empty && r.sameParent(i) ? !1 : kp(e, t.state) ? t.chain().focus(t.state.selection.from + 4).lift(e).joinBackward().run() : wp(e, t.state) ? t.chain().joinForward().joinBackward().run() : t.commands.joinItemForward();
}, gS = (t, e) => {
  var n;
  const { $anchor: r } = e.selection, i = e.doc.resolve(r.pos - r.parentOffset - 2);
  return !(i.index() === i.parent.childCount - 1 || ((n = i.nodeAfter) == null ? void 0 : n.type.name) !== t);
}, xp = ge.create({
  name: "listKeymap",
  addOptions() {
    return {
      listTypes: [
        {
          itemName: "listItem",
          wrapperNames: ["bulletList", "orderedList"]
        },
        {
          itemName: "taskItem",
          wrapperNames: ["taskList"]
        }
      ]
    };
  },
  addKeyboardShortcuts() {
    return {
      Delete: ({ editor: t }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: n }) => {
          t.state.schema.nodes[n] !== void 0 && pa(t, n) && (e = !0);
        }), e;
      },
      "Mod-Delete": ({ editor: t }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: n }) => {
          t.state.schema.nodes[n] !== void 0 && pa(t, n) && (e = !0);
        }), e;
      },
      Backspace: ({ editor: t }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
          t.state.schema.nodes[n] !== void 0 && ha(t, n, r) && (e = !0);
        }), e;
      },
      "Mod-Backspace": ({ editor: t }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
          t.state.schema.nodes[n] !== void 0 && ha(t, n, r) && (e = !0);
        }), e;
      }
    };
  }
}), Gu = /^(\s*)(\d+)\.\s+(.*)$/, vS = /^\s/;
function yS(t) {
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; ) {
    const i = t[n], s = i.match(Gu);
    if (!s)
      break;
    const [, o, l, a] = s, c = o.length;
    let u = a, d = n + 1;
    const f = [i];
    for (; d < t.length; ) {
      const h = t[d];
      if (h.match(Gu))
        break;
      if (h.trim() === "")
        f.push(h), u += `
`, d += 1;
      else if (h.match(vS))
        f.push(h), u += `
${h.slice(c + 2)}`, d += 1;
      else
        break;
    }
    e.push({
      indent: c,
      number: parseInt(l, 10),
      content: u.trim(),
      raw: f.join(`
`)
    }), r = d, n = d;
  }
  return [e, r];
}
function Sp(t, e, n) {
  var r;
  const i = [];
  let s = 0;
  for (; s < t.length; ) {
    const o = t[s];
    if (o.indent === e) {
      const l = o.content.split(`
`), a = ((r = l[0]) == null ? void 0 : r.trim()) || "", c = [];
      a && c.push({
        type: "paragraph",
        raw: a,
        tokens: n.inlineTokens(a)
      });
      const u = l.slice(1).join(`
`).trim();
      if (u) {
        const h = n.blockTokens(u);
        c.push(...h);
      }
      let d = s + 1;
      const f = [];
      for (; d < t.length && t[d].indent > e; )
        f.push(t[d]), d += 1;
      if (f.length > 0) {
        const h = Math.min(...f.map((m) => m.indent)), p = Sp(f, h, n);
        c.push({
          type: "list",
          ordered: !0,
          start: f[0].number,
          items: p,
          raw: f.map((m) => m.raw).join(`
`)
        });
      }
      i.push({
        type: "list_item",
        raw: o.raw,
        tokens: c
      }), s = d;
    } else
      s += 1;
  }
  return i;
}
function bS(t, e) {
  return t.map((n) => {
    if (n.type !== "list_item")
      return e.parseChildren([n])[0];
    const r = [];
    return n.tokens && n.tokens.length > 0 && n.tokens.forEach((i) => {
      if (i.type === "paragraph" || i.type === "list" || i.type === "blockquote" || i.type === "code")
        r.push(...e.parseChildren([i]));
      else if (i.type === "text" && i.tokens) {
        const s = e.parseChildren([i]);
        r.push({
          type: "paragraph",
          content: s
        });
      } else {
        const s = e.parseChildren([i]);
        s.length > 0 && r.push(...s);
      }
    }), {
      type: "listItem",
      content: r
    };
  });
}
var kS = "listItem", Yu = "textStyle", Xu = /^(\d+)\.\s$/, Cp = ot.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (t) => t.hasAttribute("start") ? parseInt(t.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: null,
        parseHTML: (t) => t.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    const { start: e, ...n } = t;
    return e === 1 ? ["ol", me(this.options.HTMLAttributes, n), 0] : ["ol", me(this.options.HTMLAttributes, t), 0];
  },
  markdownTokenName: "list",
  parseMarkdown: (t, e) => {
    if (t.type !== "list" || !t.ordered)
      return [];
    const n = t.start || 1, r = t.items ? bS(t.items, e) : [];
    return n !== 1 ? {
      type: "orderedList",
      attrs: { start: n },
      content: r
    } : {
      type: "orderedList",
      content: r
    };
  },
  renderMarkdown: (t, e) => t.content ? e.renderChildren(t.content, `
`) : "",
  markdownTokenizer: {
    name: "orderedList",
    level: "block",
    start: (t) => {
      const e = t.match(/^(\s*)(\d+)\.\s+/), n = e == null ? void 0 : e.index;
      return n !== void 0 ? n : -1;
    },
    tokenize: (t, e, n) => {
      var r;
      const i = t.split(`
`), [s, o] = yS(i);
      if (s.length === 0)
        return;
      const l = Sp(s, 0, n);
      return l.length === 0 ? void 0 : {
        type: "list",
        ordered: !0,
        start: ((r = s[0]) == null ? void 0 : r.number) || 1,
        items: l,
        raw: i.slice(0, o).join(`
`)
      };
    }
  },
  markdownOptions: {
    indentsContent: !0
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: t, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(kS, this.editor.getAttributes(Yu)).run() : t.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let t = Wr({
      find: Xu,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, n) => n.childCount + n.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (t = Wr({
      find: Xu,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(Yu) }),
      joinPredicate: (e, n) => n.childCount + n.attrs.start === +e[1],
      editor: this.editor
    })), [t];
  }
}), wS = /^\s*(\[([( |x])?\])\s$/, xS = ot.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: !1,
      HTMLAttributes: {},
      taskListTypeName: "taskList",
      a11y: void 0
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: !0,
  addAttributes() {
    return {
      checked: {
        default: !1,
        keepOnSplit: !1,
        parseHTML: (t) => {
          const e = t.getAttribute("data-checked");
          return e === "" || e === "true";
        },
        renderHTML: (t) => ({
          "data-checked": t.checked
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ node: t, HTMLAttributes: e }) {
    return [
      "li",
      me(this.options.HTMLAttributes, e, {
        "data-type": this.name
      }),
      [
        "label",
        [
          "input",
          {
            type: "checkbox",
            checked: t.attrs.checked ? "checked" : null
          }
        ],
        ["span"]
      ],
      ["div", 0]
    ];
  },
  parseMarkdown: (t, e) => {
    const n = [];
    if (t.tokens && t.tokens.length > 0 ? n.push(e.createNode("paragraph", {}, e.parseInline(t.tokens))) : t.text ? n.push(e.createNode("paragraph", {}, [e.createNode("text", { text: t.text })])) : n.push(e.createNode("paragraph", {}, [])), t.nestedTokens && t.nestedTokens.length > 0) {
      const r = e.parseChildren(t.nestedTokens);
      n.push(...r);
    }
    return e.createNode("taskItem", { checked: t.checked || !1 }, n);
  },
  renderMarkdown: (t, e) => {
    var n;
    const i = `- [${(n = t.attrs) != null && n.checked ? "x" : " "}] `;
    return lc(t, e, i);
  },
  addKeyboardShortcuts() {
    const t = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    return this.options.nested ? {
      ...t,
      Tab: () => this.editor.commands.sinkListItem(this.name)
    } : t;
  },
  addNodeView() {
    return ({ node: t, HTMLAttributes: e, getPos: n, editor: r }) => {
      const i = document.createElement("li"), s = document.createElement("label"), o = document.createElement("span"), l = document.createElement("input"), a = document.createElement("div"), c = (u) => {
        var d, f;
        l.ariaLabel = ((f = (d = this.options.a11y) == null ? void 0 : d.checkboxLabel) == null ? void 0 : f.call(d, u, l.checked)) || `Task item checkbox for ${u.textContent || "empty task item"}`;
      };
      return c(t), s.contentEditable = "false", l.type = "checkbox", l.addEventListener("mousedown", (u) => u.preventDefault()), l.addEventListener("change", (u) => {
        if (!r.isEditable && !this.options.onReadOnlyChecked) {
          l.checked = !l.checked;
          return;
        }
        const { checked: d } = u.target;
        r.isEditable && typeof n == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: f }) => {
          const h = n();
          if (typeof h != "number")
            return !1;
          const p = f.doc.nodeAt(h);
          return f.setNodeMarkup(h, void 0, {
            ...p == null ? void 0 : p.attrs,
            checked: d
          }), !0;
        }).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(t, d) || (l.checked = !l.checked));
      }), Object.entries(this.options.HTMLAttributes).forEach(([u, d]) => {
        i.setAttribute(u, d);
      }), i.dataset.checked = t.attrs.checked, l.checked = t.attrs.checked, s.append(l, o), i.append(s, a), Object.entries(e).forEach(([u, d]) => {
        i.setAttribute(u, d);
      }), {
        dom: i,
        contentDOM: a,
        update: (u) => u.type !== this.type ? !1 : (i.dataset.checked = u.attrs.checked, l.checked = u.attrs.checked, c(u), !0)
      };
    };
  },
  addInputRules() {
    return [
      Wr({
        find: wS,
        type: this.type,
        getAttributes: (t) => ({
          checked: t[t.length - 1] === "x"
        })
      })
    ];
  }
}), SS = ot.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["ul", me(this.options.HTMLAttributes, t, { "data-type": this.name }), 0];
  },
  parseMarkdown: (t, e) => e.createNode("taskList", {}, e.parseChildren(t.items || [])),
  renderMarkdown: (t, e) => t.content ? e.renderChildren(t.content, `
`) : "",
  markdownTokenizer: {
    name: "taskList",
    level: "block",
    start(t) {
      var e;
      const n = (e = t.match(/^\s*[-+*]\s+\[([ xX])\]\s+/)) == null ? void 0 : e.index;
      return n !== void 0 ? n : -1;
    },
    tokenize(t, e, n) {
      const r = (s) => {
        const o = ia(
          s,
          {
            itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
            extractItemData: (l) => ({
              indentLevel: l[1].length,
              mainContent: l[4],
              checked: l[3].toLowerCase() === "x"
            }),
            createToken: (l, a) => ({
              type: "taskItem",
              raw: "",
              mainContent: l.mainContent,
              indentLevel: l.indentLevel,
              checked: l.checked,
              text: l.mainContent,
              tokens: n.inlineTokens(l.mainContent),
              nestedTokens: a
            }),
            // Allow recursive nesting
            customNestedParser: r
          },
          n
        );
        return o ? [
          {
            type: "taskList",
            raw: o.raw,
            items: o.items
          }
        ] : n.blockTokens(s);
      }, i = ia(
        t,
        {
          itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
          extractItemData: (s) => ({
            indentLevel: s[1].length,
            mainContent: s[4],
            checked: s[3].toLowerCase() === "x"
          }),
          createToken: (s, o) => ({
            type: "taskItem",
            raw: "",
            mainContent: s.mainContent,
            indentLevel: s.indentLevel,
            checked: s.checked,
            text: s.mainContent,
            tokens: n.inlineTokens(s.mainContent),
            nestedTokens: o
          }),
          // Use the recursive parser for nested content
          customNestedParser: r
        },
        n
      );
      if (i)
        return {
          type: "taskList",
          raw: i.raw,
          items: i.items
        };
    }
  },
  markdownOptions: {
    indentsContent: !0
  },
  addCommands() {
    return {
      toggleTaskList: () => ({ commands: t }) => t.toggleList(this.name, this.options.itemTypeName)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
    };
  }
});
ge.create({
  name: "listKit",
  addExtensions() {
    const t = [];
    return this.options.bulletList !== !1 && t.push(mp.configure(this.options.bulletList)), this.options.listItem !== !1 && t.push(gp.configure(this.options.listItem)), this.options.listKeymap !== !1 && t.push(xp.configure(this.options.listKeymap)), this.options.orderedList !== !1 && t.push(Cp.configure(this.options.orderedList)), this.options.taskItem !== !1 && t.push(xS.configure(this.options.taskItem)), this.options.taskList !== !1 && t.push(SS.configure(this.options.taskList)), t;
  }
});
var CS = ot.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "p" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["p", me(this.options.HTMLAttributes, t), 0];
  },
  parseMarkdown: (t, e) => {
    const n = t.tokens || [];
    return n.length === 1 && n[0].type === "image" ? e.parseChildren([n[0]]) : e.createNode(
      "paragraph",
      void 0,
      // no attributes for paragraph
      e.parseInline(n)
    );
  },
  renderMarkdown: (t, e) => !t || !Array.isArray(t.content) ? "" : e.renderChildren(t.content),
  addCommands() {
    return {
      setParagraph: () => ({ commands: t }) => t.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), MS = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, ES = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, TS = gr.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (t) => t.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["s", me(this.options.HTMLAttributes, t), 0];
  },
  markdownTokenName: "del",
  parseMarkdown: (t, e) => e.applyMark("strike", e.parseInline(t.tokens || [])),
  renderMarkdown: (t, e) => `~~${e.renderChildren(t)}~~`,
  addCommands() {
    return {
      setStrike: () => ({ commands: t }) => t.setMark(this.name),
      toggleStrike: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetStrike: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      jr({
        find: MS,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      hr({
        find: ES,
        type: this.type
      })
    ];
  }
}), AS = ot.create({
  name: "text",
  group: "inline",
  parseMarkdown: (t) => ({
    type: "text",
    text: t.text || ""
  }),
  renderMarkdown: (t) => t.text || ""
}), _S = gr.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (t) => t.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["u", me(this.options.HTMLAttributes, t), 0];
  },
  parseMarkdown(t, e) {
    return e.applyMark(this.name || "underline", e.parseInline(t.tokens || []));
  },
  renderMarkdown(t, e) {
    return `++${e.renderChildren(t)}++`;
  },
  markdownTokenizer: {
    name: "underline",
    level: "inline",
    start(t) {
      return t.indexOf("++");
    },
    tokenize(t, e, n) {
      const i = /^(\+\+)([\s\S]+?)(\+\+)/.exec(t);
      if (!i)
        return;
      const s = i[2].trim();
      return {
        type: "underline",
        raw: i[0],
        text: s,
        tokens: n.inlineTokens(s)
      };
    }
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: t }) => t.setMark(this.name),
      toggleUnderline: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetUnderline: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
});
function OS(t = {}) {
  return new ce({
    view(e) {
      return new NS(e, t);
    }
  });
}
class NS {
  constructor(e, n) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = n.width) !== null && r !== void 0 ? r : 1, this.color = n.color === !1 ? void 0 : n.color || "black", this.class = n.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((i) => {
      let s = (o) => {
        this[i](o);
      };
      return e.dom.addEventListener(i, s), { name: i, handler: s };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: n }) => this.editorView.dom.removeEventListener(e, n));
  }
  update(e, n) {
    this.cursorPos != null && n.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), n = !e.parent.inlineContent, r, i = this.editorView.dom, s = i.getBoundingClientRect(), o = s.width / i.offsetWidth, l = s.height / i.offsetHeight;
    if (n) {
      let d = e.nodeBefore, f = e.nodeAfter;
      if (d || f) {
        let h = this.editorView.nodeDOM(this.cursorPos - (d ? d.nodeSize : 0));
        if (h) {
          let p = h.getBoundingClientRect(), m = d ? p.bottom : p.top;
          d && f && (m = (m + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
          let g = this.width / 2 * l;
          r = { left: p.left, right: p.right, top: m - g, bottom: m + g };
        }
      }
    }
    if (!r) {
      let d = this.editorView.coordsAtPos(this.cursorPos), f = this.width / 2 * o;
      r = { left: d.left - f, right: d.left + f, top: d.top, bottom: d.bottom };
    }
    let a = this.editorView.dom.offsetParent;
    this.element || (this.element = a.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", n), this.element.classList.toggle("prosemirror-dropcursor-inline", !n);
    let c, u;
    if (!a || a == document.body && getComputedStyle(a).position == "static")
      c = -pageXOffset, u = -pageYOffset;
    else {
      let d = a.getBoundingClientRect(), f = d.width / a.offsetWidth, h = d.height / a.offsetHeight;
      c = d.left - a.scrollLeft * f, u = d.top - a.scrollTop * h;
    }
    this.element.style.left = (r.left - c) / o + "px", this.element.style.top = (r.top - u) / l + "px", this.element.style.width = (r.right - r.left) / o + "px", this.element.style.height = (r.bottom - r.top) / l + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let n = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = n && n.inside >= 0 && this.editorView.state.doc.nodeAt(n.inside), i = r && r.type.spec.disableDropCursor, s = typeof i == "function" ? i(this.editorView, n, e) : i;
    if (n && !s) {
      let o = n.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let l = _f(this.editorView.state.doc, o, this.editorView.dragging.slice);
        l != null && (o = l);
      }
      this.setCursor(o), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
  }
}
class ae extends K {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, n) {
    let r = e.resolve(n.map(this.head));
    return ae.valid(r) ? new ae(r) : K.near(r);
  }
  content() {
    return I.empty;
  }
  eq(e) {
    return e instanceof ae && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new ae(e.resolve(n.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new yc(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let n = e.parent;
    if (n.isTextblock || !IS(e) || !DS(e))
      return !1;
    let r = n.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let i = n.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, n, r = !1) {
    e: for (; ; ) {
      if (!r && ae.valid(e))
        return e;
      let i = e.pos, s = null;
      for (let o = e.depth; ; o--) {
        let l = e.node(o);
        if (n > 0 ? e.indexAfter(o) < l.childCount : e.index(o) > 0) {
          s = l.child(n > 0 ? e.indexAfter(o) : e.index(o) - 1);
          break;
        } else if (o == 0)
          return null;
        i += n;
        let a = e.doc.resolve(i);
        if (ae.valid(a))
          return a;
      }
      for (; ; ) {
        let o = n > 0 ? s.firstChild : s.lastChild;
        if (!o) {
          if (s.isAtom && !s.isText && !B.isSelectable(s)) {
            e = e.doc.resolve(i + s.nodeSize * n), r = !1;
            continue e;
          }
          break;
        }
        s = o, i += n;
        let l = e.doc.resolve(i);
        if (ae.valid(l))
          return l;
      }
      return null;
    }
  }
}
ae.prototype.visible = !1;
ae.findFrom = ae.findGapCursorFrom;
K.jsonID("gapcursor", ae);
class yc {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new yc(e.map(this.pos));
  }
  resolve(e) {
    let n = e.resolve(this.pos);
    return ae.valid(n) ? new ae(n) : K.near(n);
  }
}
function Mp(t) {
  return t.isAtom || t.spec.isolating || t.spec.createGapCursor;
}
function IS(t) {
  for (let e = t.depth; e >= 0; e--) {
    let n = t.index(e), r = t.node(e);
    if (n == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(n - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || Mp(i.type))
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function DS(t) {
  for (let e = t.depth; e >= 0; e--) {
    let n = t.indexAfter(e), r = t.node(e);
    if (n == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(n); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || Mp(i.type))
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function RS() {
  return new ce({
    props: {
      decorations: zS,
      createSelectionBetween(t, e, n) {
        return e.pos == n.pos && ae.valid(n) ? new ae(n) : null;
      },
      handleClick: PS,
      handleKeyDown: LS,
      handleDOMEvents: { beforeinput: BS }
    }
  });
}
const LS = _h({
  ArrowLeft: ms("horiz", -1),
  ArrowRight: ms("horiz", 1),
  ArrowUp: ms("vert", -1),
  ArrowDown: ms("vert", 1)
});
function ms(t, e) {
  const n = t == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, s) {
    let o = r.selection, l = e > 0 ? o.$to : o.$from, a = o.empty;
    if (o instanceof j) {
      if (!s.endOfTextblock(n) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = ae.findGapCursorFrom(l, e, a);
    return c ? (i && i(r.tr.setSelection(new ae(c))), !0) : !1;
  };
}
function PS(t, e, n) {
  if (!t || !t.editable)
    return !1;
  let r = t.state.doc.resolve(e);
  if (!ae.valid(r))
    return !1;
  let i = t.posAtCoords({ left: n.clientX, top: n.clientY });
  return i && i.inside > -1 && B.isSelectable(t.state.doc.nodeAt(i.inside)) ? !1 : (t.dispatch(t.state.tr.setSelection(new ae(r))), !0);
}
function BS(t, e) {
  if (e.inputType != "insertCompositionText" || !(t.state.selection instanceof ae))
    return !1;
  let { $from: n } = t.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(t.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = E.empty;
  for (let o = r.length - 1; o >= 0; o--)
    i = E.from(r[o].createAndFill(null, i));
  let s = t.state.tr.replace(n.pos, n.pos, new I(i, 0, 0));
  return s.setSelection(j.near(s.doc.resolve(n.pos + 1))), t.dispatch(s), !1;
}
function zS(t) {
  if (!(t.selection instanceof ae))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", se.create(t.doc, [Ve.widget(t.selection.head, e, { key: "gapcursor" })]);
}
var ko = 200, Se = function() {
};
Se.prototype.append = function(e) {
  return e.length ? (e = Se.from(e), !this.length && e || e.length < ko && this.leafAppend(e) || this.length < ko && e.leafPrepend(this) || this.appendInner(e)) : this;
};
Se.prototype.prepend = function(e) {
  return e.length ? Se.from(e).append(this) : this;
};
Se.prototype.appendInner = function(e) {
  return new FS(this, e);
};
Se.prototype.slice = function(e, n) {
  return e === void 0 && (e = 0), n === void 0 && (n = this.length), e >= n ? Se.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, n));
};
Se.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
Se.prototype.forEach = function(e, n, r) {
  n === void 0 && (n = 0), r === void 0 && (r = this.length), n <= r ? this.forEachInner(e, n, r, 0) : this.forEachInvertedInner(e, n, r, 0);
};
Se.prototype.map = function(e, n, r) {
  n === void 0 && (n = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(s, o) {
    return i.push(e(s, o));
  }, n, r), i;
};
Se.from = function(e) {
  return e instanceof Se ? e : e && e.length ? new Ep(e) : Se.empty;
};
var Ep = /* @__PURE__ */ function(t) {
  function e(r) {
    t.call(this), this.values = r;
  }
  t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
  var n = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, s) {
    return i == 0 && s == this.length ? this : new e(this.values.slice(i, s));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, s, o, l) {
    for (var a = s; a < o; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, s, o, l) {
    for (var a = s - 1; a >= o; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= ko)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= ko)
      return new e(i.flatten().concat(this.values));
  }, n.length.get = function() {
    return this.values.length;
  }, n.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, n), e;
}(Se);
Se.empty = new Ep([]);
var FS = /* @__PURE__ */ function(t) {
  function e(n, r) {
    t.call(this), this.left = n, this.right = r, this.length = n.length + r.length, this.depth = Math.max(n.depth, r.depth) + 1;
  }
  return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(s, l), o) === !1 || s > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, s) - l, o + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(s, l) - l, o + l) === !1 || s < l && this.left.forEachInvertedInner(r, Math.min(i, l), s, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var s = this.left.length;
    return i <= s ? this.left.slice(r, i) : r >= s ? this.right.slice(r - s, i - s) : this.left.slice(r, s).append(this.right.slice(0, i - s));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(Se);
const VS = 500;
class wt {
  constructor(e, n) {
    this.items = e, this.eventCount = n;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, n) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, s;
    n && (i = this.remapping(r, this.items.length), s = i.maps.length);
    let o = e.tr, l, a, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        i || (i = this.remapping(r, f + 1), s = i.maps.length), s--, u.push(d);
        return;
      }
      if (i) {
        u.push(new Ot(d.map));
        let h = d.step.map(i.slice(s)), p;
        h && o.maybeStep(h).doc && (p = o.mapping.maps[o.mapping.maps.length - 1], c.push(new Ot(p, void 0, void 0, c.length + u.length))), s--, p && i.appendMap(p, s);
      } else
        o.maybeStep(d.step);
      if (d.selection)
        return l = i ? d.selection.map(i.slice(s)) : d.selection, a = new wt(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: o, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, n, r, i) {
    let s = [], o = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new Ot(e.mapping.maps[u], d, n), h;
      (h = a && a.merge(f)) && (f = h, u ? s.pop() : l = l.slice(0, l.length - 1)), s.push(f), n && (o++, n = void 0), i || (a = f);
    }
    let c = o - r.depth;
    return c > jS && (l = HS(l, c), o -= c), new wt(l.append(s), o);
  }
  remapping(e, n) {
    let r = new Ni();
    return this.items.forEach((i, s) => {
      let o = i.mirrorOffset != null && s - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, o);
    }, e, n), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new wt(this.items.append(e.map((n) => new Ot(n))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, n) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - n), s = e.mapping, o = e.steps.length, l = this.eventCount;
    this.items.forEach((f) => {
      f.selection && l--;
    }, i);
    let a = n;
    this.items.forEach((f) => {
      let h = s.getMirror(--a);
      if (h == null)
        return;
      o = Math.min(o, h);
      let p = s.maps[h];
      if (f.step) {
        let m = e.steps[h].invert(e.docs[h]), g = f.selection && f.selection.map(s.slice(a + 1, h));
        g && l++, r.push(new Ot(p, m, g));
      } else
        r.push(new Ot(p));
    }, i);
    let c = [];
    for (let f = n; f < o; f++)
      c.push(new Ot(s.maps[f]));
    let u = this.items.slice(0, i).append(c).append(r), d = new wt(u, l);
    return d.emptyItemCount() > VS && (d = d.compress(this.items.length - r.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((n) => {
      n.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let n = this.remapping(0, e), r = n.maps.length, i = [], s = 0;
    return this.items.forEach((o, l) => {
      if (l >= e)
        i.push(o), o.selection && s++;
      else if (o.step) {
        let a = o.step.map(n.slice(r)), c = a && a.getMap();
        if (r--, c && n.appendMap(c, r), a) {
          let u = o.selection && o.selection.map(n.slice(r));
          u && s++;
          let d = new Ot(c.invert(), a, u), f, h = i.length - 1;
          (f = i.length && i[h].merge(d)) ? i[h] = f : i.push(d);
        }
      } else o.map && r--;
    }, this.items.length, 0), new wt(Se.from(i.reverse()), s);
  }
}
wt.empty = new wt(Se.empty, 0);
function HS(t, e) {
  let n;
  return t.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return n = i, !1;
  }), t.slice(n);
}
class Ot {
  constructor(e, n, r, i) {
    this.map = e, this.step = n, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let n = e.step.merge(this.step);
      if (n)
        return new Ot(n.getMap().invert(), n, this.selection);
    }
  }
}
class cn {
  constructor(e, n, r, i, s) {
    this.done = e, this.undone = n, this.prevRanges = r, this.prevTime = i, this.prevComposition = s;
  }
}
const jS = 20;
function WS(t, e, n, r) {
  let i = n.getMeta(sr), s;
  if (i)
    return i.historyState;
  n.getMeta(KS) && (t = new cn(t.done, t.undone, null, 0, -1));
  let o = n.getMeta("appendedTransaction");
  if (n.steps.length == 0)
    return t;
  if (o && o.getMeta(sr))
    return o.getMeta(sr).redo ? new cn(t.done.addTransform(n, void 0, r, Ms(e)), t.undone, Qu(n.mapping.maps), t.prevTime, t.prevComposition) : new cn(t.done, t.undone.addTransform(n, void 0, r, Ms(e)), null, t.prevTime, t.prevComposition);
  if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let l = n.getMeta("composition"), a = t.prevTime == 0 || !o && t.prevComposition != l && (t.prevTime < (n.time || 0) - r.newGroupDelay || !US(n, t.prevRanges)), c = o ? Tl(t.prevRanges, n.mapping) : Qu(n.mapping.maps);
    return new cn(t.done.addTransform(n, a ? e.selection.getBookmark() : void 0, r, Ms(e)), wt.empty, c, n.time, l ?? t.prevComposition);
  } else return (s = n.getMeta("rebased")) ? new cn(t.done.rebased(n, s), t.undone.rebased(n, s), Tl(t.prevRanges, n.mapping), t.prevTime, t.prevComposition) : new cn(t.done.addMaps(n.mapping.maps), t.undone.addMaps(n.mapping.maps), Tl(t.prevRanges, n.mapping), t.prevTime, t.prevComposition);
}
function US(t, e) {
  if (!e)
    return !1;
  if (!t.docChanged)
    return !0;
  let n = !1;
  return t.mapping.maps[0].forEach((r, i) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && i >= e[s] && (n = !0);
  }), n;
}
function Qu(t) {
  let e = [];
  for (let n = t.length - 1; n >= 0 && e.length == 0; n--)
    t[n].forEach((r, i, s, o) => e.push(s, o));
  return e;
}
function Tl(t, e) {
  if (!t)
    return null;
  let n = [];
  for (let r = 0; r < t.length; r += 2) {
    let i = e.map(t[r], 1), s = e.map(t[r + 1], -1);
    i <= s && n.push(i, s);
  }
  return n;
}
function qS(t, e, n) {
  let r = Ms(e), i = sr.get(e).spec.config, s = (n ? t.undone : t.done).popEvent(e, r);
  if (!s)
    return null;
  let o = s.selection.resolve(s.transform.doc), l = (n ? t.done : t.undone).addTransform(s.transform, e.selection.getBookmark(), i, r), a = new cn(n ? l : s.remaining, n ? s.remaining : l, null, 0, -1);
  return s.transform.setSelection(o).setMeta(sr, { redo: n, historyState: a });
}
let Al = !1, Zu = null;
function Ms(t) {
  let e = t.plugins;
  if (Zu != e) {
    Al = !1, Zu = e;
    for (let n = 0; n < e.length; n++)
      if (e[n].spec.historyPreserveItems) {
        Al = !0;
        break;
      }
  }
  return Al;
}
const sr = new Ee("history"), KS = new Ee("closeHistory");
function JS(t = {}) {
  return t = {
    depth: t.depth || 100,
    newGroupDelay: t.newGroupDelay || 500
  }, new ce({
    key: sr,
    state: {
      init() {
        return new cn(wt.empty, wt.empty, null, 0, -1);
      },
      apply(e, n, r) {
        return WS(n, r, e, t);
      }
    },
    config: t,
    props: {
      handleDOMEvents: {
        beforeinput(e, n) {
          let r = n.inputType, i = r == "historyUndo" ? Ap : r == "historyRedo" ? _p : null;
          return i ? (n.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function Tp(t, e) {
  return (n, r) => {
    let i = sr.getState(n);
    if (!i || (t ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let s = qS(i, n, t);
      s && r(e ? s.scrollIntoView() : s);
    }
    return !0;
  };
}
const Ap = Tp(!1, !0), _p = Tp(!0, !0);
ge.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      mode: "textSize",
      textCounter: (t) => t.length,
      wordCounter: (t) => t.split(" ").filter((e) => e !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (t) => {
      const e = (t == null ? void 0 : t.node) || this.editor.state.doc;
      if (((t == null ? void 0 : t.mode) || this.options.mode) === "textSize") {
        const r = e.textBetween(0, e.content.size, void 0, " ");
        return this.options.textCounter(r);
      }
      return e.nodeSize;
    }, this.storage.words = (t) => {
      const e = (t == null ? void 0 : t.node) || this.editor.state.doc, n = e.textBetween(0, e.content.size, " ", " ");
      return this.options.wordCounter(n);
    };
  },
  addProseMirrorPlugins() {
    let t = !1;
    return [
      new ce({
        key: new Ee("characterCount"),
        appendTransaction: (e, n, r) => {
          if (t)
            return;
          const i = this.options.limit;
          if (i == null || i === 0) {
            t = !0;
            return;
          }
          const s = this.storage.characters({ node: r.doc });
          if (s > i) {
            const o = s - i, l = 0, a = o;
            console.warn(
              `[CharacterCount] Initial content exceeded limit of ${i} characters. Content was automatically trimmed.`
            );
            const c = r.tr.deleteRange(l, a);
            return t = !0, c;
          }
          t = !0;
        },
        filterTransaction: (e, n) => {
          const r = this.options.limit;
          if (!e.docChanged || r === 0 || r === null || r === void 0)
            return !0;
          const i = this.storage.characters({ node: n.doc }), s = this.storage.characters({ node: e.doc });
          if (s <= r || i > r && s > r && s <= i)
            return !0;
          if (i > r && s > r && s > i || !e.getMeta("paste"))
            return !1;
          const l = e.selection.$head.pos, a = s - r, c = l - a, u = l;
          return e.deleteRange(c, u), !(this.storage.characters({ node: e.doc }) > r);
        }
      })
    ];
  }
});
var $S = ge.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [OS(this.options)];
  }
});
ge.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new ce({
        key: new Ee("focus"),
        props: {
          decorations: ({ doc: t, selection: e }) => {
            const { isEditable: n, isFocused: r } = this.editor, { anchor: i } = e, s = [];
            if (!n || !r)
              return se.create(t, []);
            let o = 0;
            this.options.mode === "deepest" && t.descendants((a, c) => {
              if (a.isText)
                return;
              if (!(i >= c && i <= c + a.nodeSize - 1))
                return !1;
              o += 1;
            });
            let l = 0;
            return t.descendants((a, c) => {
              if (a.isText || !(i >= c && i <= c + a.nodeSize - 1))
                return !1;
              if (l += 1, this.options.mode === "deepest" && o - l > 0 || this.options.mode === "shallowest" && l > 1)
                return this.options.mode === "deepest";
              s.push(
                Ve.node(c, c + a.nodeSize, {
                  class: this.options.className
                })
              );
            }), se.create(t, s);
          }
        }
      })
    ];
  }
});
var GS = ge.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [RS()];
  },
  extendNodeSchema(t) {
    var e;
    const n = {
      name: t.name,
      options: t.options,
      storage: t.storage
    };
    return {
      allowGapCursor: (e = X(P(t, "allowGapCursor", n))) != null ? e : null
    };
  }
});
ge.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new ce({
        key: new Ee("placeholder"),
        props: {
          decorations: ({ doc: t, selection: e }) => {
            const n = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: r } = e, i = [];
            if (!n)
              return null;
            const s = this.editor.isEmpty;
            return t.descendants((o, l) => {
              const a = r >= l && r <= l + o.nodeSize, c = !o.isLeaf && jo(o);
              if ((a || !this.options.showOnlyCurrent) && c) {
                const u = [this.options.emptyNodeClass];
                s && u.push(this.options.emptyEditorClass);
                const d = Ve.node(l, l + o.nodeSize, {
                  class: u.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: o,
                    pos: l,
                    hasAnchor: a
                  }) : this.options.placeholder
                });
                i.push(d);
              }
              return this.options.includeChildren;
            }), se.create(t, i);
          }
        }
      })
    ];
  }
});
ge.create({
  name: "selection",
  addOptions() {
    return {
      className: "selection"
    };
  },
  addProseMirrorPlugins() {
    const { editor: t, options: e } = this;
    return [
      new ce({
        key: new Ee("selection"),
        props: {
          decorations(n) {
            return n.selection.empty || t.isFocused || !t.isEditable || qh(n.selection) || t.view.dragging ? null : se.create(n.doc, [
              Ve.inline(n.selection.from, n.selection.to, {
                class: e.className
              })
            ]);
          }
        }
      })
    ];
  }
});
function ed({ types: t, node: e }) {
  return e && Array.isArray(t) && t.includes(e.type) || (e == null ? void 0 : e.type) === t;
}
var YS = ge.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: void 0,
      notAfter: []
    };
  },
  addProseMirrorPlugins() {
    var t;
    const e = new Ee(this.name), n = ((t = this.editor.schema.topNodeType.contentMatch.defaultType) == null ? void 0 : t.name) || this.options.node || "paragraph", r = Object.entries(this.editor.schema.nodes).map(([, i]) => i).filter((i) => (this.options.notAfter || []).concat(n).includes(i.name));
    return [
      new ce({
        key: e,
        appendTransaction: (i, s, o) => {
          const { doc: l, tr: a, schema: c } = o, u = e.getState(o), d = l.content.size, f = c.nodes[n];
          if (u)
            return a.insert(d, f.create());
        },
        state: {
          init: (i, s) => {
            const o = s.tr.doc.lastChild;
            return !ed({ node: o, types: r });
          },
          apply: (i, s) => {
            if (!i.docChanged)
              return s;
            const o = i.doc.lastChild;
            return !ed({ node: o, types: r });
          }
        }
      })
    ];
  }
}), XS = ge.create({
  name: "undoRedo",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: t, dispatch: e }) => Ap(t, e),
      redo: () => ({ state: t, dispatch: e }) => _p(t, e)
    };
  },
  addProseMirrorPlugins() {
    return [JS(this.options)];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), QS = ge.create({
  name: "starterKit",
  addExtensions() {
    var t, e, n, r;
    const i = [];
    return this.options.bold !== !1 && i.push(Mx.configure(this.options.bold)), this.options.blockquote !== !1 && i.push(kx.configure(this.options.blockquote)), this.options.bulletList !== !1 && i.push(mp.configure(this.options.bulletList)), this.options.code !== !1 && i.push(Ax.configure(this.options.code)), this.options.codeBlock !== !1 && i.push(Nx.configure(this.options.codeBlock)), this.options.document !== !1 && i.push(Ix.configure(this.options.document)), this.options.dropcursor !== !1 && i.push($S.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && i.push(GS.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && i.push(Dx.configure(this.options.hardBreak)), this.options.heading !== !1 && i.push(Rx.configure(this.options.heading)), this.options.undoRedo !== !1 && i.push(XS.configure(this.options.undoRedo)), this.options.horizontalRule !== !1 && i.push(Lx.configure(this.options.horizontalRule)), this.options.italic !== !1 && i.push(Vx.configure(this.options.italic)), this.options.listItem !== !1 && i.push(gp.configure(this.options.listItem)), this.options.listKeymap !== !1 && i.push(xp.configure((t = this.options) == null ? void 0 : t.listKeymap)), this.options.link !== !1 && i.push(dS.configure((e = this.options) == null ? void 0 : e.link)), this.options.orderedList !== !1 && i.push(Cp.configure(this.options.orderedList)), this.options.paragraph !== !1 && i.push(CS.configure(this.options.paragraph)), this.options.strike !== !1 && i.push(TS.configure(this.options.strike)), this.options.text !== !1 && i.push(AS.configure(this.options.text)), this.options.underline !== !1 && i.push(_S.configure((n = this.options) == null ? void 0 : n.underline)), this.options.trailingNode !== !1 && i.push(YS.configure((r = this.options) == null ? void 0 : r.trailingNode)), i;
  }
}), ZS = QS;
const eC = "_textarea_l54uh_1", tC = "_richWrapper_l54uh_20", nC = "_toolbar_l54uh_25", rC = "_button_l54uh_32", iC = "_active_l54uh_43", sC = "_divider_l54uh_49", oC = "_rich_l54uh_20", sn = {
  textarea: eC,
  richWrapper: tC,
  toolbar: nC,
  button: rC,
  active: iC,
  divider: sC,
  rich: oC
};
var lC = /* @__PURE__ */ z('<button type="button"></button>'), aC = /* @__PURE__ */ z("<span></span>"), cC = /* @__PURE__ */ z("<!> <!>", 1), uC = /* @__PURE__ */ z("<div></div>"), dC = /* @__PURE__ */ z('<textarea hidden=""></textarea>'), fC = /* @__PURE__ */ z("<div><!>  <div></div> <!></div>"), hC = /* @__PURE__ */ z("<textarea></textarea>");
function aM(t, e) {
  Ce(e, !0);
  const n = [
    {
      headingOne: {
        fieldDisplay: "H1",
        cmd: () => w(p).chain().focus().toggleHeading({ level: 1 }).run()
      },
      headingTwo: {
        fieldDisplay: "H2",
        cmd: () => w(p).chain().focus().toggleHeading({ level: 2 }).run()
      },
      paragraph: {
        fieldDisplay: "P",
        cmd: () => w(p).chain().focus().setParagraph().run()
      }
    },
    {
      bold: {
        fieldDisplay: "<b>B</b>",
        cmd: () => w(p).chain().focus().toggleBold().run()
      },
      italic: {
        fieldDisplay: "<i>I</i>",
        cmd: () => w(p).chain().focus().toggleItalic().run()
      },
      strike: {
        fieldDisplay: "<s>S</s>",
        cmd: () => w(p).chain().focus().toggleStrike().run()
      }
    },
    {
      bulletList: {
        fieldDisplay: "Bulleted list",
        cmd: () => w(p).chain().focus().toggleBulletList().run()
      },
      orderedList: {
        fieldDisplay: "Ordered list",
        cmd: () => w(p).chain().focus().toggleOrderedList().run()
      }
    }
  ];
  let r = /* @__PURE__ */ ee(hn({
    headingOne: !1,
    headingTwo: !1,
    paragraph: !0,
    bold: !1,
    italic: !1,
    strike: !1,
    bulletList: !1,
    orderedList: !1,
    blockQuote: !1
  })), i = H(e, "value", 15, ""), s = H(e, "placeholder", 3, ""), o = H(e, "class", 3, ""), l = H(
    e,
    "rich",
    3,
    !1
    // treat as initial mode
  ), a = H(e, "autoExpand", 3, !0), c = H(e, "disabled", 3, !1), u = H(e, "rows", 3, 3), d = H(e, "showToolbar", 3, !0), f = /* @__PURE__ */ ee(null), h = /* @__PURE__ */ ee(null), p = /* @__PURE__ */ ee(null);
  const m = (C) => {
    C.key === "Enter" && C.preventDefault();
  };
  sd(() => {
    if (!(!l() || !w(h)) && ($(
      p,
      new cx({
        element: w(h),
        extensions: [ZS],
        content: i(),
        editorProps: {
          attributes: {
            class: ne(sn.textarea, sn.rich, o()),
            "data-placeholder": s(),
            style: "min-height:5rem;"
          }
        },
        onUpdate: ({ editor: C }) => {
          const S = C.getHTML();
          S !== i() && i(S), g();
        }
      }),
      !0
    ), a())) {
      const C = () => {
        w(h) && (w(h).style.height = "auto", w(h).style.height = w(h).scrollHeight + "px");
      };
      C(), w(p).on("update", C);
    }
  }), id(() => {
    var C;
    (C = w(p)) == null || C.destroy(), $(p, null);
  }), Pr(() => {
    if (!l() || !w(p)) return;
    const C = w(p).getHTML();
    i() !== C && w(p).commands.setContent(i() || "");
  }), Pr(() => {
    !a() || l() || !w(f) || (w(f).style.height = "auto", w(f).style.height = w(f).scrollHeight + "px");
  });
  const g = () => {
    w(p) && $(
      r,
      {
        headingOne: w(p).isActive("heading", { level: 1 }),
        headingTwo: w(p).isActive("heading", { level: 2 }),
        paragraph: w(p).isActive("paragraph"),
        bold: w(p).isActive("bold"),
        italic: w(p).isActive("italic"),
        strike: w(p).isActive("strike"),
        bulletList: w(p).isActive("bulletList"),
        orderedList: w(p).isActive("orderedList"),
        blockQuote: w(p).isActive("blockquote")
      },
      !0
    );
  }, v = (C) => {
    w(p) && (C(), g());
  };
  var y = Aa(), b = Sn(y);
  {
    var k = (C) => {
      var S = fC(), O = L(S);
      {
        var R = (ue) => {
          var M = uC();
          {
            const N = (Ge, lt = Pt, In = Pt) => {
              var Te = lC();
              dg(Te, () => In().fieldDisplay, !0), V((Dn) => D(Te, 1, Dn), [
                () => F(ne(sn.button, { [sn.active]: w(r)[lt()] }))
              ]), gt("click", Te, () => v(In().cmd)), _(Ge, Te);
            };
            En(M, 21, () => n, ar, (Ge, lt, In) => {
              var Te = cC(), Dn = Sn(Te);
              En(Dn, 17, () => Object.entries(w(lt)), ar, (Kr, ns) => {
                var bc = /* @__PURE__ */ je(() => nm(w(ns), 2));
                N(Kr, () => w(bc)[0], () => w(bc)[1]);
              });
              var Np = G(Dn, 2);
              {
                var Ip = (Kr) => {
                  var ns = aC();
                  V(() => D(ns, 1, F(sn.divider))), _(Kr, ns);
                };
                re(Np, (Kr) => {
                  In < n.length - 1 && Kr(Ip);
                });
              }
              _(Ge, Te);
            });
          }
          V(() => D(M, 1, F(sn.toolbar))), _(ue, M);
        };
        re(O, (ue) => {
          d() && w(p) && ue(R);
        });
      }
      var U = G(O, 2);
      Ti(U, (ue) => $(h, ue), () => w(h));
      var ve = G(U, 2);
      {
        var ye = (ue) => {
          var M = dC();
          V(() => {
            tt(M, "name", e.name), tt(M, "id", e.id);
          }), gt("keydown", M, m), Pl(M, i), _(ue, M);
        };
        re(ve, (ue) => {
          e.name && ue(ye);
        });
      }
      V(() => D(S, 1, F(sn.richWrapper))), gt("keydown", U, m), _(C, S);
    }, x = (C) => {
      var S = hC();
      Ti(S, (O) => $(f, O), () => w(f)), V(
        (O) => {
          D(S, 1, O), tt(S, "name", e.name), tt(S, "id", e.id), tt(S, "placeholder", s()), S.disabled = c(), tt(S, "rows", u());
        },
        [() => F(ne(sn.textarea, o()))]
      ), Pl(S, i), _(C, S);
    };
    re(b, (C) => {
      l() ? C(k) : C(x, -1);
    });
  }
  _(t, y), Me();
}
_n(["click", "keydown"]);
const pC = "auth-data", mC = (t) => {
  const e = zl.Auth.subdomain, n = zl.Auth.devPort;
  return t === Na ? `https://${e}.jeffreycarr.dev` : t === Oa ? `http://${e}.lab.test` : `http://${e}.jeffreycarr.local:${n}`;
}, Op = (t) => ({
  path: `${mC(t)}/api/auth/authed-user`,
  method: ai.GET,
  credentials: "required"
}), cM = async (t, e, n, r) => await Oo(
  Op(t),
  {
    query: { app: e },
    additionalHeaders: { cookie: `${pC}=${n}` }
  },
  r
), uM = async (t, e, n) => {
  let r;
  try {
    r = await Oo(Op(t), { query: { app: e } }, n);
  } catch (i) {
    const s = i;
    if (s.status === 400)
      return null;
    throw s;
  }
  return r;
}, dM = async (t) => {
  const e = g0(t, _a.Auth), n = f0.LOGOUT, i = {
    path: `${e}${n.path}`,
    method: n.method,
    credentials: "required"
  };
  try {
    await Oo(i, {
      body: { logoutEverywhere: !0 }
    });
  } catch (s) {
    return s;
  }
};
export {
  NC as APP_QUERY_PARAM,
  pC as AUTH_COOKIE_NAME,
  BC as AVAILABLE_ACTIVE_ICONS,
  _a as App,
  zl as Apps,
  wC as AutocompleteInput,
  KC as AvailableSSELevels,
  qC as AvailableSSEStatuses,
  Ai as Button,
  FC as CHARACTERS,
  QC as CharacterIcon,
  p0 as CharacterToName,
  m0 as CharacterToSrc,
  ZC as Checkbox,
  YC as Confetti,
  XC as ConfirmModal,
  V0 as CustomDropdown,
  eM as ExpandButton,
  IC as GOTO_QUERY_PARAM,
  f0 as GlobalRoutes,
  t1 as Input,
  VC as MESSAGE_LEVELS,
  ai as METHODS,
  tf as Modal,
  tM as MultiPageModal,
  PC as NOTIFICATION_LEVELS,
  nM as Notification,
  rM as NotificationController,
  DC as PATH_QUERY_PARAM,
  iM as RadialTimer,
  Fl as ReactiveIcon,
  sM as RearrangeableList,
  JC as SSEConnection,
  oM as Select,
  _o as ServerError,
  Ns as Spinner,
  zC as Stack,
  h0 as TIME,
  lM as TabbedContent,
  aM as Textarea,
  WC as Tuple,
  cM as backendGetUser,
  LC as buildAppURL,
  CC as debounce,
  HC as devEnvironment,
  OC as epochStringToFriendlyPrintDate,
  _C as friendlyPrintDate,
  GC as generateGreeting,
  ef as generateRandomInt,
  Bl as generateRandomNumber,
  d0 as generateUUID,
  g0 as getAppURL,
  EC as getDaysInMonth,
  jC as getErrorFromServer,
  MC as getFirstDayOfMonth,
  TC as getMonthName,
  c0 as getRandomElement,
  u0 as getRandomHexColor,
  uM as getUser,
  SC as getUserLocale,
  AC as getWeekdayName,
  UC as isUUID,
  RC as isValidApp,
  dM as logout,
  Oo as makeRequest,
  $C as ping,
  Na as prodEnvironment,
  xC as resizeObserver,
  b0 as sleep,
  Oa as stagingEnvironment
};
