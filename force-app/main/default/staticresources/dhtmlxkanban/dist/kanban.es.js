/**
@license

DHTMLX Kanban v.1.6.5 Professional

This software can be used only as part of dhtmlx.com site.
You are not allowed to use it on any other site

(c) XB Software.

**/
const Ke = Symbol(), $a = !1;
var Tr = Array.isArray, Pr = Array.from, ko = Object.defineProperty, ht = Object.getOwnPropertyDescriptor, ei = Object.getOwnPropertyDescriptors, So = Object.prototype, Io = Array.prototype, Tn = Object.getPrototypeOf;
function Kt(n) {
  return typeof n == "function";
}
const De = () => {
};
function Eo(n) {
  return n();
}
function ur(n) {
  for (var e = 0; e < n.length; e++)
    n[e]();
}
const mt = 2, ti = 4, un = 8, Yn = 16, at = 32, fn = 64, zt = 128, Pn = 256, Qe = 512, Bt = 1024, Kn = 2048, ct = 4096, vn = 8192, ni = 16384, Zt = 32768, Do = 65536, ri = 1 << 18, ai = 1 << 19, It = Symbol("$state"), Co = Symbol("");
function ii(n) {
  return n === this.v;
}
function Gn(n, e) {
  return n != n ? e == e : n !== e || n !== null && typeof n == "object" || typeof n == "function";
}
function Rr(n) {
  return !Gn(n, this.v);
}
function Mo(n) {
  throw new Error("effect_in_teardown");
}
function Ao() {
  throw new Error("effect_in_unowned_derived");
}
function To(n) {
  throw new Error("effect_orphan");
}
function Po() {
  throw new Error("effect_update_depth_exceeded");
}
function Ro(n) {
  throw new Error("props_invalid_value");
}
function Lo() {
  throw new Error("state_descriptors_fixed");
}
function Fo() {
  throw new Error("state_prototype_fixed");
}
function Oo() {
  throw new Error("state_unsafe_local_read");
}
function No() {
  throw new Error("state_unsafe_mutation");
}
function Je(n) {
  return {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: n,
    reactions: null,
    equals: ii,
    version: 0
  };
}
function ae(n) {
  return /* @__PURE__ */ Bo(Je(n));
}
// @__NO_SIDE_EFFECTS__
function Lr(n, e = !1) {
  const t = Je(n);
  return e || (t.equals = Rr), Ae !== null && Ae.l !== null && (Ae.l.s ??= []).push(t), t;
}
// @__NO_SIDE_EFFECTS__
function Bo(n) {
  return Ce !== null && Ce.f & mt && (dt === null ? Ko([n]) : dt.push(n)), n;
}
function H(n, e) {
  return Ce !== null && jn() && Ce.f & (mt | Yn) && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (dt === null || !dt.includes(n)) && No(), fr(n, e);
}
function fr(n, e) {
  return n.equals(e) || (n.v = e, n.version = pi(), oi(n, Bt), jn() && pe !== null && pe.f & Qe && !(pe.f & at) && (ze !== null && ze.includes(n) ? (ft(pe, Bt), Jn(pe)) : Et === null ? Go([n]) : Et.push(n))), e;
}
function oi(n, e) {
  var t = n.reactions;
  if (t !== null)
    for (var r = jn(), a = t.length, i = 0; i < a; i++) {
      var s = t[i], l = s.f;
      l & Bt || !r && s === pe || (ft(s, e), l & (Qe | zt) && (l & mt ? oi(
        /** @type {Derived} */
        s,
        Kn
      ) : Jn(
        /** @type {Effect} */
        s
      )));
    }
}
// @__NO_SIDE_EFFECTS__
function B(n) {
  var e = mt | Bt;
  pe === null ? e |= zt : pe.f |= ai;
  const t = {
    children: null,
    ctx: Ae,
    deps: null,
    equals: ii,
    f: e,
    fn: n,
    reactions: null,
    v: (
      /** @type {V} */
      null
    ),
    version: 0,
    parent: pe
  };
  if (Ce !== null && Ce.f & mt) {
    var r = (
      /** @type {Derived} */
      Ce
    );
    (r.children ??= []).push(t);
  }
  return t;
}
// @__NO_SIDE_EFFECTS__
function si(n) {
  const e = /* @__PURE__ */ B(n);
  return e.equals = Rr, e;
}
function li(n) {
  var e = n.children;
  if (e !== null) {
    n.children = null;
    for (var t = 0; t < e.length; t += 1) {
      var r = e[t];
      r.f & mt ? Fr(
        /** @type {Derived} */
        r
      ) : xt(
        /** @type {Effect} */
        r
      );
    }
  }
}
function ci(n) {
  var e, t = pe;
  $e(n.parent);
  try {
    li(n), e = ki(n);
  } finally {
    $e(t);
  }
  return e;
}
function di(n) {
  var e = ci(n), t = (Gt || n.f & zt) && n.deps !== null ? Kn : Qe;
  ft(n, t), n.equals(e) || (n.v = e, n.version = pi());
}
function Fr(n) {
  li(n), sn(n, 0), ft(n, vn), n.v = n.children = n.deps = n.ctx = n.reactions = null;
}
function ui(n) {
  pe === null && Ce === null && To(), Ce !== null && Ce.f & zt && Ao(), zr && Mo();
}
function zo(n, e) {
  var t = e.last;
  t === null ? e.last = e.first = n : (t.next = n, n.prev = t, e.last = n);
}
function Jt(n, e, t, r = !0) {
  var a = (n & fn) !== 0, i = pe, s = {
    ctx: Ae,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: n | Bt,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: a ? null : i,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (t) {
    var l = Vt;
    try {
      ca(!0), Zn(s), s.f |= ni;
    } catch (f) {
      throw xt(s), f;
    } finally {
      ca(l);
    }
  } else e !== null && Jn(s);
  var d = t && s.deps === null && s.first === null && s.nodes_start === null && s.teardown === null && (s.f & ai) === 0;
  if (!d && !a && r && (i !== null && zo(s, i), Ce !== null && Ce.f & mt)) {
    var c = (
      /** @type {Derived} */
      Ce
    );
    (c.children ??= []).push(s);
  }
  return s;
}
function Or(n) {
  const e = Jt(un, null, !1);
  return ft(e, Qe), e.teardown = n, e;
}
function gt(n) {
  ui();
  var e = pe !== null && (pe.f & at) !== 0 && Ae !== null && !Ae.m;
  if (e) {
    var t = (
      /** @type {ComponentContext} */
      Ae
    );
    (t.e ??= []).push({
      fn: n,
      effect: pe,
      reaction: Ce
    });
  } else {
    var r = yt(n);
    return r;
  }
}
function fi(n) {
  return ui(), Vn(n);
}
function Ho(n) {
  const e = Jt(fn, n, !0);
  return () => {
    xt(e);
  };
}
function yt(n) {
  return Jt(ti, n, !1);
}
function Vn(n) {
  return Jt(un, n, !0);
}
function O(n) {
  return Mt(n);
}
function Mt(n, e = 0) {
  return Jt(un | Yn | e, n, !0);
}
function _t(n, e = !0) {
  return Jt(un | at, n, !0, e);
}
function vi(n) {
  var e = n.teardown;
  if (e !== null) {
    const t = zr, r = Ce;
    da(!0), ut(null);
    try {
      e.call(null);
    } finally {
      da(t), ut(r);
    }
  }
}
function hi(n) {
  var e = n.deriveds;
  if (e !== null) {
    n.deriveds = null;
    for (var t = 0; t < e.length; t += 1)
      Fr(e[t]);
  }
}
function mi(n, e = !1) {
  var t = n.first;
  for (n.first = n.last = null; t !== null; ) {
    var r = t.next;
    xt(t, e), t = r;
  }
}
function qo(n) {
  for (var e = n.first; e !== null; ) {
    var t = e.next;
    e.f & at || xt(e), e = t;
  }
}
function xt(n, e = !0) {
  var t = !1;
  if ((e || n.f & ri) && n.nodes_start !== null) {
    for (var r = n.nodes_start, a = n.nodes_end; r !== null; ) {
      var i = r === a ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Qn(r)
      );
      r.remove(), r = i;
    }
    t = !0;
  }
  mi(n, e && !t), hi(n), sn(n, 0), ft(n, vn);
  var s = n.transitions;
  if (s !== null)
    for (const d of s)
      d.stop();
  vi(n);
  var l = n.parent;
  l !== null && l.first !== null && gi(n), n.next = n.prev = n.teardown = n.ctx = n.deps = n.parent = n.fn = n.nodes_start = n.nodes_end = null;
}
function gi(n) {
  var e = n.parent, t = n.prev, r = n.next;
  t !== null && (t.next = r), r !== null && (r.prev = t), e !== null && (e.first === n && (e.first = r), e.last === n && (e.last = t));
}
function an(n, e) {
  var t = [];
  Nr(n, t, !0), _i(t, () => {
    xt(n), e && e();
  });
}
function _i(n, e) {
  var t = n.length;
  if (t > 0) {
    var r = () => --t || e();
    for (var a of n)
      a.out(r);
  } else
    e();
}
function Nr(n, e, t) {
  if (!(n.f & ct)) {
    if (n.f ^= ct, n.transitions !== null)
      for (const s of n.transitions)
        (s.is_global || t) && e.push(s);
    for (var r = n.first; r !== null; ) {
      var a = r.next, i = (r.f & Zt) !== 0 || (r.f & at) !== 0;
      Nr(r, e, i ? t : !1), r = a;
    }
  }
}
function Rn(n) {
  wi(n, !0);
}
function wi(n, e) {
  if (n.f & ct) {
    hn(n) && Zn(n), n.f ^= ct;
    for (var t = n.first; t !== null; ) {
      var r = t.next, a = (t.f & Zt) !== 0 || (t.f & at) !== 0;
      wi(t, a ? e : !1), t = r;
    }
    if (n.transitions !== null)
      for (const i of n.transitions)
        (i.is_global || e) && i.in();
  }
}
let Ln = !1, vr = [];
function yi() {
  Ln = !1;
  const n = vr.slice();
  vr = [], ur(n);
}
function Wn(n) {
  Ln || (Ln = !0, queueMicrotask(yi)), vr.push(n);
}
function Uo() {
  Ln && yi();
}
function Br(n) {
  throw new Error("lifecycle_outside_component");
}
const xi = 0, Yo = 1;
let In = xi, on = !1, Vt = !1, zr = !1;
function ca(n) {
  Vt = n;
}
function da(n) {
  zr = n;
}
let Lt = [], Wt = 0;
let Ce = null;
function ut(n) {
  Ce = n;
}
let pe = null;
function $e(n) {
  pe = n;
}
let dt = null;
function Ko(n) {
  dt = n;
}
let ze = null, Ze = 0, Et = null;
function Go(n) {
  Et = n;
}
let bi = 0, Gt = !1, Ae = null;
function pi() {
  return ++bi;
}
function jn() {
  return Ae !== null && Ae.l === null;
}
function hn(n) {
  var e = n.f;
  if (e & Bt)
    return !0;
  if (e & Kn) {
    var t = n.deps, r = (e & zt) !== 0;
    if (t !== null) {
      var a;
      if (e & Pn) {
        for (a = 0; a < t.length; a++)
          (t[a].reactions ??= []).push(n);
        n.f ^= Pn;
      }
      for (a = 0; a < t.length; a++) {
        var i = t[a];
        if (hn(
          /** @type {Derived} */
          i
        ) && di(
          /** @type {Derived} */
          i
        ), r && pe !== null && !Gt && !i?.reactions?.includes(n) && (i.reactions ??= []).push(n), i.version > n.version)
          return !0;
      }
    }
    r || ft(n, Qe);
  }
  return !1;
}
function Vo(n, e, t) {
  throw n;
}
function ki(n) {
  var e = ze, t = Ze, r = Et, a = Ce, i = Gt, s = dt, l = Ae, d = n.f;
  ze = /** @type {null | Value[]} */
  null, Ze = 0, Et = null, Ce = d & (at | fn) ? null : n, Gt = !Vt && (d & zt) !== 0, dt = null, Ae = n.ctx;
  try {
    var c = (
      /** @type {Function} */
      (0, n.fn)()
    ), f = n.deps;
    if (ze !== null) {
      var u;
      if (sn(n, Ze), f !== null && Ze > 0)
        for (f.length = Ze + ze.length, u = 0; u < ze.length; u++)
          f[Ze + u] = ze[u];
      else
        n.deps = f = ze;
      if (!Gt)
        for (u = Ze; u < f.length; u++)
          (f[u].reactions ??= []).push(n);
    } else f !== null && Ze < f.length && (sn(n, Ze), f.length = Ze);
    return c;
  } finally {
    ze = e, Ze = t, Et = r, Ce = a, Gt = i, dt = s, Ae = l;
  }
}
function Wo(n, e) {
  let t = e.reactions;
  if (t !== null) {
    var r = t.indexOf(n);
    if (r !== -1) {
      var a = t.length - 1;
      a === 0 ? t = e.reactions = null : (t[r] = t[a], t.pop());
    }
  }
  t === null && e.f & mt && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (ze === null || !ze.includes(e)) && (ft(e, Kn), e.f & (zt | Pn) || (e.f ^= Pn), sn(
    /** @type {Derived} **/
    e,
    0
  ));
}
function sn(n, e) {
  var t = n.deps;
  if (t !== null)
    for (var r = e; r < t.length; r++)
      Wo(n, t[r]);
}
function Zn(n) {
  var e = n.f;
  if (!(e & vn)) {
    ft(n, Qe);
    var t = pe;
    pe = n;
    try {
      e & Yn ? qo(n) : mi(n), hi(n), vi(n);
      var r = ki(n);
      n.teardown = typeof r == "function" ? r : null, n.version = bi;
    } catch (a) {
      Vo(
        /** @type {Error} */
        a
      );
    } finally {
      pe = t;
    }
  }
}
function Si() {
  Wt > 1e3 && (Wt = 0, Po()), Wt++;
}
function Ii(n) {
  var e = n.length;
  if (e !== 0) {
    Si();
    var t = Vt;
    Vt = !0;
    try {
      for (var r = 0; r < e; r++) {
        var a = n[r];
        a.f & Qe || (a.f ^= Qe);
        var i = [];
        Ei(a, i), jo(i);
      }
    } finally {
      Vt = t;
    }
  }
}
function jo(n) {
  var e = n.length;
  if (e !== 0)
    for (var t = 0; t < e; t++) {
      var r = n[t];
      !(r.f & (vn | ct)) && hn(r) && (Zn(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? gi(r) : r.fn = null));
    }
}
function Zo() {
  if (on = !1, Wt > 1001)
    return;
  const n = Lt;
  Lt = [], Ii(n), on || (Wt = 0);
}
function Jn(n) {
  In === xi && (on || (on = !0, queueMicrotask(Zo)));
  for (var e = n; e.parent !== null; ) {
    e = e.parent;
    var t = e.f;
    if (t & (fn | at)) {
      if (!(t & Qe)) return;
      e.f ^= Qe;
    }
  }
  Lt.push(e);
}
function Ei(n, e) {
  var t = n.first, r = [];
  e: for (; t !== null; ) {
    var a = t.f, i = (a & at) !== 0, s = i && (a & Qe) !== 0;
    if (!s && !(a & ct))
      if (a & un) {
        i ? t.f ^= Qe : hn(t) && Zn(t);
        var l = t.first;
        if (l !== null) {
          t = l;
          continue;
        }
      } else a & ti && r.push(t);
    var d = t.next;
    if (d === null) {
      let u = t.parent;
      for (; u !== null; ) {
        if (n === u)
          break e;
        var c = u.next;
        if (c !== null) {
          t = c;
          continue e;
        }
        u = u.parent;
      }
    }
    t = d;
  }
  for (var f = 0; f < r.length; f++)
    l = r[f], e.push(l), Ei(l, e);
}
function Di(n) {
  var e = In, t = Lt;
  try {
    Si();
    const a = [];
    In = Yo, Lt = a, on = !1, Ii(t);
    var r = n?.();
    return Uo(), (Lt.length > 0 || a.length > 0) && Di(), Wt = 0, r;
  } finally {
    In = e, Lt = t;
  }
}
async function kt() {
  await Promise.resolve(), Di();
}
function o(n) {
  var e = n.f, t = (e & mt) !== 0;
  if (t && e & vn) {
    var r = ci(
      /** @type {Derived} */
      n
    );
    return Fr(
      /** @type {Derived} */
      n
    ), r;
  }
  if (Ce !== null) {
    dt !== null && dt.includes(n) && Oo();
    var a = Ce.deps;
    ze === null && a !== null && a[Ze] === n ? Ze++ : ze === null ? ze = [n] : ze.push(n), Et !== null && pe !== null && pe.f & Qe && !(pe.f & at) && Et.includes(n) && (ft(pe, Bt), Jn(pe));
  } else if (t && /** @type {Derived} */
  n.deps === null) {
    var i = (
      /** @type {Derived} */
      n
    ), s = i.parent;
    s !== null && !s.deriveds?.includes(i) && (s.deriveds ??= []).push(i);
  }
  return t && (i = /** @type {Derived} */
  n, hn(i) && di(i)), n.v;
}
function Xe(n) {
  return n && o(n);
}
function ke(n) {
  const e = Ce;
  try {
    return Ce = null, n();
  } finally {
    Ce = e;
  }
}
const Jo = -3585;
function ft(n, e) {
  n.f = n.f & Jo | e;
}
function he(n) {
  return (
    /** @type {T} */
    Ci().get(n)
  );
}
function wt(n, e) {
  return Ci().set(n, e), e;
}
function Ci(n) {
  return Ae === null && Br(), Ae.c ??= new Map(Qo(Ae) || void 0);
}
function Qo(n) {
  let e = n.p;
  for (; e !== null; ) {
    const t = e.c;
    if (t !== null)
      return t;
    e = e.p;
  }
  return null;
}
function ne(n, e = !1, t) {
  Ae = {
    p: Ae,
    c: null,
    e: null,
    m: !1,
    s: n,
    x: null,
    l: null
  }, e || (Ae.l = {
    s: null,
    u: null,
    r1: [],
    r2: Je(!1)
  });
}
function re(n) {
  const e = Ae;
  if (e !== null) {
    n !== void 0 && (e.x = n);
    const s = e.e;
    if (s !== null) {
      var t = pe, r = Ce;
      e.e = null;
      try {
        for (var a = 0; a < s.length; a++) {
          var i = s[a];
          $e(i.effect), ut(i.reaction), yt(i.fn);
        }
      } finally {
        $e(t), ut(r);
      }
    }
    Ae = e.p, e.m = !0;
  }
  return n || /** @type {T} */
  {};
}
function Mi(n) {
  if (!(typeof n != "object" || !n || n instanceof EventTarget)) {
    if (It in n)
      hr(n);
    else if (!Array.isArray(n))
      for (let e in n) {
        const t = n[e];
        typeof t == "object" && t && It in t && hr(t);
      }
  }
}
function hr(n, e = /* @__PURE__ */ new Set()) {
  if (typeof n == "object" && n !== null && // We don't want to traverse DOM elements
  !(n instanceof EventTarget) && !e.has(n)) {
    e.add(n), n instanceof Date && n.getTime();
    for (let r in n)
      try {
        hr(n[r], e);
      } catch {
      }
    const t = Tn(n);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const r = ei(t);
      for (let a in r) {
        const i = r[a].get;
        if (i)
          try {
            i.call(n);
          } catch {
          }
      }
    }
  }
}
function Q(n, e = null, t) {
  if (typeof n != "object" || n === null || It in n)
    return n;
  const r = Tn(n);
  if (r !== So && r !== Io)
    return n;
  var a = /* @__PURE__ */ new Map(), i = Tr(n), s = Je(0);
  i && a.set("length", Je(
    /** @type {any[]} */
    n.length
  ));
  var l;
  return new Proxy(
    /** @type {any} */
    n,
    {
      defineProperty(d, c, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && Lo();
        var u = a.get(c);
        return u === void 0 ? (u = Je(f.value), a.set(c, u)) : H(u, Q(f.value, l)), !0;
      },
      deleteProperty(d, c) {
        var f = a.get(c);
        if (f === void 0)
          c in d && a.set(c, Je(Ke));
        else {
          if (i && typeof c == "string") {
            var u = (
              /** @type {Source<number>} */
              a.get("length")
            ), h = Number(c);
            Number.isInteger(h) && h < u.v && H(u, h);
          }
          H(f, Ke), ua(s);
        }
        return !0;
      },
      get(d, c, f) {
        if (c === It)
          return n;
        var u = a.get(c), h = c in d;
        if (u === void 0 && (!h || ht(d, c)?.writable) && (u = Je(Q(h ? d[c] : Ke, l)), a.set(c, u)), u !== void 0) {
          var _ = o(u);
          return _ === Ke ? void 0 : _;
        }
        return Reflect.get(d, c, f);
      },
      getOwnPropertyDescriptor(d, c) {
        var f = Reflect.getOwnPropertyDescriptor(d, c);
        if (f && "value" in f) {
          var u = a.get(c);
          u && (f.value = o(u));
        } else if (f === void 0) {
          var h = a.get(c), _ = h?.v;
          if (h !== void 0 && _ !== Ke)
            return {
              enumerable: !0,
              configurable: !0,
              value: _,
              writable: !0
            };
        }
        return f;
      },
      has(d, c) {
        if (c === It)
          return !0;
        var f = a.get(c), u = f !== void 0 && f.v !== Ke || Reflect.has(d, c);
        if (f !== void 0 || pe !== null && (!u || ht(d, c)?.writable)) {
          f === void 0 && (f = Je(u ? Q(d[c], l) : Ke), a.set(c, f));
          var h = o(f);
          if (h === Ke)
            return !1;
        }
        return u;
      },
      set(d, c, f, u) {
        var h = a.get(c), _ = c in d;
        if (i && c === "length")
          for (var v = f; v < /** @type {Source<number>} */
          h.v; v += 1) {
            var m = a.get(v + "");
            m !== void 0 ? H(m, Ke) : v in d && (m = Je(Ke), a.set(v + "", m));
          }
        h === void 0 ? (!_ || ht(d, c)?.writable) && (h = Je(void 0), H(h, Q(f, l)), a.set(c, h)) : (_ = h.v !== Ke, H(h, Q(f, l)));
        var w = Reflect.getOwnPropertyDescriptor(d, c);
        if (w?.set && w.set.call(u, f), !_) {
          if (i && typeof c == "string") {
            var k = (
              /** @type {Source<number>} */
              a.get("length")
            ), p = Number(c);
            Number.isInteger(p) && p >= k.v && H(k, p + 1);
          }
          ua(s);
        }
        return !0;
      },
      ownKeys(d) {
        o(s);
        var c = Reflect.ownKeys(d).filter((h) => {
          var _ = a.get(h);
          return _ === void 0 || _.v !== Ke;
        });
        for (var [f, u] of a)
          u.v !== Ke && !(f in d) && c.push(f);
        return c;
      },
      setPrototypeOf() {
        Fo();
      }
    }
  );
}
function ua(n, e = 1) {
  H(n, n.v + e);
}
function fa(n) {
  return n !== null && typeof n == "object" && It in n ? n[It] : n;
}
function Xo(n, e) {
  return Object.is(fa(n), fa(e));
}
var Fn, Ai, Ti;
function $o() {
  if (Fn === void 0) {
    Fn = window;
    var n = Element.prototype, e = Node.prototype;
    Ai = ht(e, "firstChild").get, Ti = ht(e, "nextSibling").get, n.__click = void 0, n.__className = "", n.__attributes = null, n.__styles = null, n.__e = void 0, Text.prototype.__t = void 0;
  }
}
function mn(n = "") {
  return document.createTextNode(n);
}
// @__NO_SIDE_EFFECTS__
function ln(n) {
  return Ai.call(n);
}
// @__NO_SIDE_EFFECTS__
function Qn(n) {
  return Ti.call(n);
}
function D(n, e) {
  return /* @__PURE__ */ ln(n);
}
function V(n, e) {
  {
    var t = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ ln(
        /** @type {Node} */
        n
      )
    );
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ Qn(t) : t;
  }
}
function U(n, e = 1, t = !1) {
  let r = n;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Qn(r);
  return r;
}
function es(n) {
  n.textContent = "";
}
let Pi = !1;
const Ri = /* @__PURE__ */ new Set(), mr = /* @__PURE__ */ new Set();
function ts(n, e, t, r) {
  function a(i) {
    if (r.capture || en.call(e, i), !i.cancelBubble) {
      var s = Ce, l = pe;
      ut(null), $e(null);
      try {
        return t.call(this, i);
      } finally {
        ut(s), $e(l);
      }
    }
  }
  return n.startsWith("pointer") || n.startsWith("touch") || n === "wheel" ? Wn(() => {
    e.addEventListener(n, a, r);
  }) : e.addEventListener(n, a, r), a;
}
function He(n, e, t, r, a) {
  var i = { capture: r, passive: a }, s = ts(n, e, t, i);
  (e === document.body || e === window || e === document) && Or(() => {
    e.removeEventListener(n, s, i);
  });
}
function me(n) {
  for (var e = 0; e < n.length; e++)
    Ri.add(n[e]);
  for (var t of mr)
    t(n);
}
function en(n) {
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), r = n.type, a = n.composedPath?.() || [], i = (
    /** @type {null | Element} */
    a[0] || n.target
  ), s = 0, l = n.__root;
  if (l) {
    var d = a.indexOf(l);
    if (d !== -1 && (e === document || e === /** @type {any} */
    window)) {
      n.__root = e;
      return;
    }
    var c = a.indexOf(e);
    if (c === -1)
      return;
    d <= c && (s = d);
  }
  if (i = /** @type {Element} */
  a[s] || n.target, i !== e) {
    ko(n, "currentTarget", {
      configurable: !0,
      get() {
        return i || t;
      }
    });
    var f = Ce, u = pe;
    ut(null), $e(null);
    try {
      for (var h, _ = []; i !== null; ) {
        var v = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var m = i["__" + r];
          if (m !== void 0 && !/** @type {any} */
          i.disabled)
            if (Tr(m)) {
              var [w, ...k] = m;
              w.apply(i, [n, ...k]);
            } else
              m.call(i, n);
        } catch (p) {
          h ? _.push(p) : h = p;
        }
        if (n.cancelBubble || v === e || v === null)
          break;
        i = v;
      }
      if (h) {
        for (let p of _)
          queueMicrotask(() => {
            throw p;
          });
        throw h;
      }
    } finally {
      n.__root = e, delete n.currentTarget, ut(f), $e(u);
    }
  }
}
function Hr(n) {
  var e;
  e = document.head.appendChild(mn());
  try {
    Mt(() => n(e), ri);
  } finally {
  }
}
function Li(n) {
  var e = document.createElement("template");
  return e.innerHTML = n, e.content;
}
function cn(n, e) {
  var t = (
    /** @type {Effect} */
    pe
  );
  t.nodes_start === null && (t.nodes_start = n, t.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function E(n, e) {
  var t = (e & 1) !== 0, r = (e & 2) !== 0, a, i = !n.startsWith("<!>");
  return () => {
    a === void 0 && (a = Li(i ? n : "<!>" + n), t || (a = /** @type {Node} */
    /* @__PURE__ */ ln(a)));
    var s = (
      /** @type {TemplateNode} */
      r ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (t) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ln(s)
      ), d = (
        /** @type {TemplateNode} */
        s.lastChild
      );
      cn(l, d);
    } else
      cn(s, s);
    return s;
  };
}
function Se(n = "") {
  {
    var e = mn(n + "");
    return cn(e, e), e;
  }
}
function $() {
  var n = document.createDocumentFragment(), e = document.createComment(""), t = mn();
  return n.append(e, t), cn(e, t), n;
}
function g(n, e) {
  n !== null && n.before(
    /** @type {Node} */
    e
  );
}
const ns = ["touchstart", "touchmove"];
function rs(n) {
  return ns.includes(n);
}
let gr = !0;
function te(n, e) {
  var t = e == null ? "" : typeof e == "object" ? e + "" : e;
  t !== (n.__t ??= n.nodeValue) && (n.__t = t, n.nodeValue = t == null ? "" : t + "");
}
function dn(n, e) {
  return as(n, e);
}
const qt = /* @__PURE__ */ new Map();
function as(n, { target: e, anchor: t, props: r = {}, events: a, context: i, intro: s = !0 }) {
  $o();
  var l = /* @__PURE__ */ new Set(), d = (u) => {
    for (var h = 0; h < u.length; h++) {
      var _ = u[h];
      if (!l.has(_)) {
        l.add(_);
        var v = rs(_);
        e.addEventListener(_, en, { passive: v });
        var m = qt.get(_);
        m === void 0 ? (document.addEventListener(_, en, { passive: v }), qt.set(_, 1)) : qt.set(_, m + 1);
      }
    }
  };
  d(Pr(Ri)), mr.add(d);
  var c = void 0, f = Ho(() => {
    var u = t ?? e.appendChild(mn());
    return _t(() => {
      if (i) {
        ne({});
        var h = (
          /** @type {ComponentContext} */
          Ae
        );
        h.c = i;
      }
      a && (r.$$events = a), gr = s, c = n(u, r) || {}, gr = !0, i && re();
    }), () => {
      for (var h of l) {
        e.removeEventListener(h, en);
        var _ = (
          /** @type {number} */
          qt.get(h)
        );
        --_ === 0 ? (document.removeEventListener(h, en), qt.delete(h)) : qt.set(h, _);
      }
      mr.delete(d), _r.delete(c), u !== t && u.parentNode?.removeChild(u);
    };
  });
  return _r.set(c, f), c;
}
let _r = /* @__PURE__ */ new WeakMap();
function qr(n) {
  const e = _r.get(n);
  e && e();
}
function P(n, e, t, r = null, a = !1) {
  var i = n, s = null, l = null, d = null, c = a ? Zt : 0;
  Mt(() => {
    d !== (d = !!e()) && (d ? (s ? Rn(s) : s = _t(() => t(i)), l && an(l, () => {
      l = null;
    })) : (l ? Rn(l) : r && (l = _t(() => r(i))), s && an(s, () => {
      s = null;
    })));
  }, c);
}
function Fi(n, e, t) {
  var r = n, a = Ke, i;
  Mt(() => {
    Gn(a, a = e()) && (i && an(i), i = _t(() => t(r)));
  });
}
let ar = null;
function it(n, e) {
  return e;
}
function is(n, e, t, r) {
  for (var a = [], i = e.length, s = 0; s < i; s++)
    Nr(e[s].e, a, !0);
  var l = i > 0 && a.length === 0 && t !== null;
  if (l) {
    var d = (
      /** @type {Element} */
      /** @type {Element} */
      t.parentNode
    );
    es(d), d.append(
      /** @type {Element} */
      t
    ), r.clear(), pt(n, e[0].prev, e[i - 1].next);
  }
  _i(a, () => {
    for (var c = 0; c < i; c++) {
      var f = e[c];
      l || (r.delete(f.k), pt(n, f.prev, f.next)), xt(f.e, !l);
    }
  });
}
function Ie(n, e, t, r, a, i = null) {
  var s = n, l = { flags: e, items: /* @__PURE__ */ new Map(), first: null }, d = (e & 4) !== 0;
  if (d) {
    var c = (
      /** @type {Element} */
      n
    );
    s = c.appendChild(mn());
  }
  var f = null, u = !1;
  Mt(() => {
    var h = t(), _ = Tr(h) ? h : h == null ? [] : Pr(h), v = _.length;
    if (!(u && v === 0)) {
      u = v === 0;
      {
        var m = (
          /** @type {Effect} */
          Ce
        );
        os(_, l, s, a, e, (m.f & ct) !== 0, r);
      }
      i !== null && (v === 0 ? f ? Rn(f) : f = _t(() => i(s)) : f !== null && an(f, () => {
        f = null;
      })), t();
    }
  });
}
function os(n, e, t, r, a, i, s) {
  var l = (a & 8) !== 0, d = (a & 3) !== 0, c = n.length, f = e.items, u = e.first, h = u, _, v = null, m, w = [], k = [], p, x, y, b;
  if (l)
    for (b = 0; b < c; b += 1)
      p = n[b], x = s(p, b), y = f.get(x), y !== void 0 && (y.a?.measure(), (m ??= /* @__PURE__ */ new Set()).add(y));
  for (b = 0; b < c; b += 1) {
    if (p = n[b], x = s(p, b), y = f.get(x), y === void 0) {
      var I = h ? (
        /** @type {TemplateNode} */
        h.e.nodes_start
      ) : t;
      v = ls(
        I,
        e,
        v,
        v === null ? e.first : v.next,
        p,
        x,
        b,
        r,
        a
      ), f.set(x, v), w = [], k = [], h = v.next;
      continue;
    }
    if (d && ss(y, p, b, a), y.e.f & ct && (Rn(y.e), l && (y.a?.unfix(), (m ??= /* @__PURE__ */ new Set()).delete(y))), y !== h) {
      if (_ !== void 0 && _.has(y)) {
        if (w.length < k.length) {
          var A = k[0], M;
          v = A.prev;
          var q = w[0], K = w[w.length - 1];
          for (M = 0; M < w.length; M += 1)
            va(w[M], A, t);
          for (M = 0; M < k.length; M += 1)
            _.delete(k[M]);
          pt(e, q.prev, K.next), pt(e, v, q), pt(e, K, A), h = A, v = K, b -= 1, w = [], k = [];
        } else
          _.delete(y), va(y, h, t), pt(e, y.prev, y.next), pt(e, y, v === null ? e.first : v.next), pt(e, v, y), v = y;
        continue;
      }
      for (w = [], k = []; h !== null && h.k !== x; )
        (i || !(h.e.f & ct)) && (_ ??= /* @__PURE__ */ new Set()).add(h), k.push(h), h = h.next;
      if (h === null)
        continue;
      y = h;
    }
    w.push(y), v = y, h = y.next;
  }
  if (h !== null || _ !== void 0) {
    for (var j = _ === void 0 ? [] : Pr(_); h !== null; )
      (i || !(h.e.f & ct)) && j.push(h), h = h.next;
    var Z = j.length;
    if (Z > 0) {
      var G = a & 4 && c === 0 ? t : null;
      if (l) {
        for (b = 0; b < Z; b += 1)
          j[b].a?.measure();
        for (b = 0; b < Z; b += 1)
          j[b].a?.fix();
      }
      is(e, j, G, f);
    }
  }
  l && Wn(() => {
    if (m !== void 0)
      for (y of m)
        y.a?.apply();
  }), pe.first = e.first && e.first.e, pe.last = v && v.e;
}
function ss(n, e, t, r) {
  r & 1 && fr(n.v, e), r & 2 ? fr(
    /** @type {Value<number>} */
    n.i,
    t
  ) : n.i = t;
}
function ls(n, e, t, r, a, i, s, l, d) {
  var c = ar;
  try {
    var f = (d & 1) !== 0, u = (d & 16) === 0, h = f ? u ? /* @__PURE__ */ Lr(a) : Je(a) : a, _ = d & 2 ? Je(s) : s, v = {
      i: _,
      v: h,
      k: i,
      a: null,
      // @ts-expect-error
      e: null,
      prev: t,
      next: r
    };
    return ar = v, v.e = _t(() => l(n, h, _), Pi), v.e.prev = t && t.e, v.e.next = r && r.e, t === null ? e.first = v : (t.next = v, t.e.next = v.e), r !== null && (r.prev = v, r.e.prev = v.e), v;
  } finally {
    ar = c;
  }
}
function va(n, e, t) {
  for (var r = n.next ? (
    /** @type {TemplateNode} */
    n.next.e.nodes_start
  ) : t, a = e ? (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ) : t, i = (
    /** @type {TemplateNode} */
    n.e.nodes_start
  ); i !== r; ) {
    var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Qn(i)
    );
    a.before(i), i = s;
  }
}
function pt(n, e, t) {
  e === null ? n.first = t : (e.next = t, e.e.next = t && t.e), t !== null && (t.prev = e, t.e.prev = e && e.e);
}
function Xn(n, e, t, r, a) {
  var i = n, s = "", l;
  Mt(() => {
    s !== (s = e() ?? "") && (l !== void 0 && (xt(l), l = void 0), s !== "" && (l = _t(() => {
      var d = s + "", c = Li(d);
      cn(
        /** @type {TemplateNode} */
        /* @__PURE__ */ ln(c),
        /** @type {TemplateNode} */
        c.lastChild
      ), i.before(c);
    })));
  });
}
function Ee(n, e, ...t) {
  var r = n, a = De, i;
  Mt(() => {
    a !== (a = e()) && (i && (xt(i), i = null), i = _t(() => (
      /** @type {SnippetFn} */
      a(r, ...t)
    )));
  }, Zt);
}
function Ct(n, e, t) {
  var r = n, a, i;
  Mt(() => {
    a !== (a = e()) && (i && (an(i), i = null), a && (i = _t(() => t(r, a))));
  }, Zt);
}
function Ne(n, e, t) {
  yt(() => {
    var r = ke(() => e(n, t?.()) || {});
    if (t && r?.update) {
      var a = !1, i = (
        /** @type {any} */
        {}
      );
      Vn(() => {
        var s = t();
        Mi(s), a && Gn(i, s) && (i = s, r.update(s));
      }), a = !0;
    }
    if (r?.destroy)
      return () => (
        /** @type {Function} */
        r.destroy()
      );
  });
}
let ha = !1;
function cs() {
  ha || (ha = !0, document.addEventListener(
    "reset",
    (n) => {
      Promise.resolve().then(() => {
        if (!n.defaultPrevented)
          for (
            const e of
            /**@type {HTMLFormElement} */
            n.target.elements
          )
            e.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function Ht(n, e) {
  var t = n.__attributes ??= {};
  t.value === (t.value = e) || // @ts-expect-error
  // `progress` elements always need their value set when its `0`
  n.value === e && (e !== 0 || n.nodeName !== "PROGRESS") || (n.value = e);
}
function ds(n, e) {
  var t = n.__attributes ??= {};
  t.checked !== (t.checked = e) && (n.checked = e);
}
function J(n, e, t, r) {
  var a = n.__attributes ??= {};
  a[e] !== (a[e] = t) && (e === "style" && "__styles" in n && (n.__styles = {}), e === "loading" && (n[Co] = t), t == null ? n.removeAttribute(e) : typeof t != "string" && us(n).includes(e) ? n[e] = t : n.setAttribute(e, t));
}
var ma = /* @__PURE__ */ new Map();
function us(n) {
  var e = ma.get(n.nodeName);
  if (e) return e;
  ma.set(n.nodeName, e = []);
  for (var t, r = Tn(n), a = Element.prototype; a !== r; ) {
    t = ei(r);
    for (var i in t)
      t[i].set && e.push(i);
    r = Tn(r);
  }
  return e;
}
function ye(n, e) {
  var t = n.__className, r = fs(e);
  (t !== r || Pi) && (e == null ? n.removeAttribute("class") : n.className = r, n.__className = r);
}
function fs(n) {
  return n ?? "";
}
function ve(n, e, t) {
  if (t) {
    if (n.classList.contains(e)) return;
    n.classList.add(e);
  } else {
    if (!n.classList.contains(e)) return;
    n.classList.remove(e);
  }
}
const vs = () => performance.now(), St = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (n) => requestAnimationFrame(n)
  ),
  now: () => vs(),
  tasks: /* @__PURE__ */ new Set()
};
function Oi(n) {
  St.tasks.forEach((e) => {
    e.c(n) || (St.tasks.delete(e), e.f());
  }), St.tasks.size !== 0 && St.tick(Oi);
}
function hs(n) {
  let e;
  return St.tasks.size === 0 && St.tick(Oi), {
    promise: new Promise((t) => {
      St.tasks.add(e = { c: n, f: t });
    }),
    abort() {
      St.tasks.delete(e);
    }
  };
}
function xn(n, e) {
  n.dispatchEvent(new CustomEvent(e));
}
function ms(n) {
  if (n === "float") return "cssFloat";
  if (n === "offset") return "cssOffset";
  if (n.startsWith("--")) return n;
  const e = n.split("-");
  return e.length === 1 ? e[0] : e[0] + e.slice(1).map(
    /** @param {any} word */
    (t) => t[0].toUpperCase() + t.slice(1)
  ).join("");
}
function ga(n) {
  const e = {}, t = n.split(";");
  for (const r of t) {
    const [a, i] = r.split(":");
    if (!a || i === void 0) break;
    const s = ms(a.trim());
    e[s] = i.trim();
  }
  return e;
}
const gs = (n) => n;
function Ur(n, e, t, r) {
  var a = (n & 4) !== 0, i = "both", s, l = e.inert, d, c;
  function f() {
    var m = Ce, w = pe;
    ut(null), $e(null);
    try {
      return s ??= t()(e, r?.() ?? /** @type {P} */
      {}, {
        direction: i
      });
    } finally {
      ut(m), $e(w);
    }
  }
  var u = {
    is_global: a,
    in() {
      e.inert = l, xn(e, "introstart"), d = wr(e, f(), c, 1, () => {
        xn(e, "introend"), d?.abort(), d = s = void 0;
      });
    },
    out(m) {
      e.inert = !0, xn(e, "outrostart"), c = wr(e, f(), d, 0, () => {
        xn(e, "outroend"), m?.();
      });
    },
    stop: () => {
      d?.abort(), c?.abort();
    }
  }, h = (
    /** @type {Effect} */
    pe
  );
  if ((h.transitions ??= []).push(u), gr) {
    var _ = a;
    if (!_) {
      for (var v = (
        /** @type {Effect | null} */
        h.parent
      ); v && v.f & Zt; )
        for (; (v = v.parent) && !(v.f & Yn); )
          ;
      _ = !v || (v.f & ni) !== 0;
    }
    _ && yt(() => {
      ke(() => u.in());
    });
  }
}
function wr(n, e, t, r, a) {
  var i = r === 1;
  if (Kt(e)) {
    var s, l = !1;
    return Wn(() => {
      if (!l) {
        var w = e({ direction: i ? "in" : "out" });
        s = wr(n, w, t, r, a);
      }
    }), {
      abort: () => {
        l = !0, s?.abort();
      },
      deactivate: () => s.deactivate(),
      reset: () => s.reset(),
      t: () => s.t()
    };
  }
  if (t?.deactivate(), !e?.duration)
    return a(), {
      abort: De,
      deactivate: De,
      reset: De,
      t: () => r
    };
  const { delay: d = 0, css: c, tick: f, easing: u = gs } = e;
  var h = [];
  if (i && t === void 0 && (f && f(0, 1), c)) {
    var _ = ga(c(0, 1));
    h.push(_, _);
  }
  var v = () => 1 - r, m = n.animate(h, { duration: d });
  return m.onfinish = () => {
    var w = t?.t() ?? 1 - r;
    t?.abort();
    var k = r - w, p = (
      /** @type {number} */
      e.duration * Math.abs(k)
    ), x = [];
    if (p > 0) {
      if (c)
        for (var y = Math.ceil(p / 16.666666666666668), b = 0; b <= y; b += 1) {
          var I = w + k * u(b / y), A = c(I, 1 - I);
          x.push(ga(A));
        }
      v = () => {
        var M = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          m.currentTime
        );
        return w + k * u(M / p);
      }, f && hs(() => {
        if (m.playState !== "running") return !1;
        var M = v();
        return f(M, 1 - M), !0;
      });
    }
    m = n.animate(x, { duration: p, fill: "forwards" }), m.onfinish = () => {
      v = () => r, f?.(r, 1 - r), a();
    };
  }, {
    abort: () => {
      m && (m.cancel(), m.effect = null, m.onfinish = De);
    },
    deactivate: () => {
      a = De;
    },
    reset: () => {
      r === 0 && f?.(1, 0);
    },
    t: () => v()
  };
}
function Ni(n, e, t, r = t) {
  n.addEventListener(e, t);
  const a = n.__on_r;
  a ? n.__on_r = () => {
    a(), r();
  } : n.__on_r = r, cs();
}
function nn(n, e, t = e) {
  var r = jn();
  Ni(n, "input", () => {
    var a = _a(n) ? wa(n.value) : n.value;
    t(a), r && a !== (a = e()) && (n.value = a ?? "");
  }), Vn(() => {
    var a = e();
    _a(n) && a === wa(n.value) || n.type === "date" && !a && !n.value || a !== n.value && (n.value = a ?? "");
  });
}
function _a(n) {
  var e = n.type;
  return e === "number" || e === "range";
}
function wa(n) {
  return n === "" ? null : +n;
}
function ya(n, e, t) {
  var r = ht(n, e);
  r && r.set && (n[e] = t, Or(() => {
    n[e] = null;
  }));
}
function Bi(n, e, t) {
  if (n.multiple)
    return ys(n, e);
  for (var r of n.options) {
    var a = rn(r);
    if (Xo(a, e)) {
      r.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (n.selectedIndex = -1);
}
function _s(n, e) {
  yt(() => {
    var t = new MutationObserver(() => {
      var r = n.__value;
      Bi(n, r);
    });
    return t.observe(n, {
      // Listen to option element changes
      childList: !0,
      subtree: !0,
      // because of <optgroup>
      // Listen to option element value attribute changes
      // (doesn't get notified of select value changes,
      // because that property is not reflected as an attribute)
      attributes: !0,
      attributeFilter: ["value"]
    }), () => {
      t.disconnect();
    };
  });
}
function ws(n, e, t = e) {
  var r = !0;
  Ni(n, "change", () => {
    var a;
    if (n.multiple)
      a = [].map.call(n.querySelectorAll(":checked"), rn);
    else {
      var i = n.querySelector(":checked");
      a = i && rn(i);
    }
    t(a);
  }), yt(() => {
    var a = e();
    if (Bi(n, a, r), r && a === void 0) {
      var i = n.querySelector(":checked");
      i !== null && (a = rn(i), t(a));
    }
    n.__value = a, r = !1;
  }), _s(n);
}
function ys(n, e) {
  for (var t of n.options)
    t.selected = ~e.indexOf(rn(t));
}
function rn(n) {
  return "__value" in n ? n.__value : n.value;
}
class Yr {
  /** */
  #e = /* @__PURE__ */ new WeakMap();
  /** @type {ResizeObserver | undefined} */
  #t;
  /** @type {ResizeObserverOptions} */
  #n;
  /** @static */
  static entries = /* @__PURE__ */ new WeakMap();
  /** @param {ResizeObserverOptions} options */
  constructor(e) {
    this.#n = e;
  }
  /**
   * @param {Element} element
   * @param {(entry: ResizeObserverEntry) => any} listener
   */
  observe(e, t) {
    var r = this.#e.get(e) || /* @__PURE__ */ new Set();
    return r.add(t), this.#e.set(e, r), this.#r().observe(e, this.#n), () => {
      var a = this.#e.get(e);
      a.delete(t), a.size === 0 && (this.#e.delete(e), this.#t.unobserve(e));
    };
  }
  #r() {
    return this.#t ?? (this.#t = new ResizeObserver(
      /** @param {any} entries */
      (e) => {
        for (var t of e) {
          Yr.entries.set(t.target, t);
          for (var r of this.#e.get(t.target) || [])
            r(t);
        }
      }
    ));
  }
}
var xs = /* @__PURE__ */ new Yr({
  box: "border-box"
});
function bs(n, e, t) {
  var r = xs.observe(n, () => t(n[e]));
  yt(() => (ke(() => t(n[e])), r));
}
function xa(n, e) {
  return n === e || n?.[It] === e;
}
function Te(n = {}, e, t, r) {
  return yt(() => {
    var a, i;
    return Vn(() => {
      a = i, i = [], ke(() => {
        n !== t(...i) && (e(n, ...i), a && xa(t(...a), n) && e(null, ...a));
      });
    }), () => {
      Wn(() => {
        i && xa(t(...i), n) && e(null, ...i);
      });
    };
  }), n;
}
function zi(n = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    Ae
  ), t = e.l.u;
  if (!t) return;
  let r = () => Mi(e.s);
  if (n) {
    let a = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const s = /* @__PURE__ */ B(() => {
      let l = !1;
      const d = e.s;
      for (const c in d)
        d[c] !== i[c] && (i[c] = d[c], l = !0);
      return l && a++, a;
    });
    r = () => o(s);
  }
  t.b.length && fi(() => {
    ba(e, r), ur(t.b);
  }), gt(() => {
    const a = ke(() => t.m.map(Eo));
    return () => {
      for (const i of a)
        typeof i == "function" && i();
    };
  }), t.a.length && gt(() => {
    ba(e, r), ur(t.a);
  });
}
function ba(n, e) {
  if (n.l.s)
    for (const t of n.l.s) o(t);
  e();
}
function vt(n) {
  Ae === null && Br(), Ae.l !== null ? ps(Ae).m.push(n) : gt(() => {
    const e = ke(n);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function Kr(n) {
  Ae === null && Br(), vt(() => () => ke(n));
}
function ps(n) {
  var e = (
    /** @type {ComponentContextLegacy} */
    n.l
  );
  return e.u ??= { a: [], b: [], m: [] };
}
function ks(n, e, t) {
  if (n == null)
    return e(void 0), De;
  const r = ke(
    () => n.subscribe(
      e,
      // @ts-expect-error
      t
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
let tn = !1;
function ce(n, e, t) {
  const r = t[e] ??= {
    store: null,
    source: /* @__PURE__ */ Lr(void 0),
    unsubscribe: De
  };
  if (r.store !== n)
    if (r.unsubscribe(), r.store = n ?? null, n == null)
      r.source.v = void 0, r.unsubscribe = De;
    else {
      var a = !0;
      r.unsubscribe = ks(n, (i) => {
        a ? r.source.v = i : H(r.source, i);
      }), a = !1;
    }
  return o(r.source);
}
function Ss(n, e) {
  return n.set(e), e;
}
function Fe() {
  const n = {};
  return Or(() => {
    for (var e in n)
      n[e].unsubscribe();
  }), n;
}
function rt(n, e, t) {
  return n.set(t), e;
}
function Is() {
  tn = !0;
}
function Es(n) {
  var e = tn;
  try {
    return tn = !1, [n(), tn];
  } finally {
    tn = e;
  }
}
const Ds = {
  get(n, e) {
    if (!n.exclude.includes(e))
      return n.props[e];
  },
  set(n, e) {
    return !1;
  },
  getOwnPropertyDescriptor(n, e) {
    if (!n.exclude.includes(e) && e in n.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: n.props[e]
      };
  },
  has(n, e) {
    return n.exclude.includes(e) ? !1 : e in n.props;
  },
  ownKeys(n) {
    return Reflect.ownKeys(n.props).filter((e) => !n.exclude.includes(e));
  }
};
// @__NO_SIDE_EFFECTS__
function gn(n, e, t) {
  return new Proxy(
    { props: n, exclude: e },
    Ds
  );
}
const Cs = {
  get(n, e) {
    let t = n.props.length;
    for (; t--; ) {
      let r = n.props[t];
      if (Kt(r) && (r = r()), typeof r == "object" && r !== null && e in r) return r[e];
    }
  },
  set(n, e, t) {
    let r = n.props.length;
    for (; r--; ) {
      let a = n.props[r];
      Kt(a) && (a = a());
      const i = ht(a, e);
      if (i && i.set)
        return i.set(t), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(n, e) {
    let t = n.props.length;
    for (; t--; ) {
      let r = n.props[t];
      if (Kt(r) && (r = r()), typeof r == "object" && r !== null && e in r) {
        const a = ht(r, e);
        return a && !a.configurable && (a.configurable = !0), a;
      }
    }
  },
  has(n, e) {
    for (let t of n.props)
      if (Kt(t) && (t = t()), t != null && e in t) return !0;
    return !1;
  },
  ownKeys(n) {
    const e = [];
    for (let t of n.props) {
      Kt(t) && (t = t());
      for (const r in t)
        e.includes(r) || e.push(r);
    }
    return e;
  }
};
function We(...n) {
  return new Proxy({ props: n }, Cs);
}
function pa(n) {
  for (var e = pe, t = pe; e !== null && !(e.f & (at | fn)); )
    e = e.parent;
  try {
    return $e(e), n();
  } finally {
    $e(t);
  }
}
function S(n, e, t, r) {
  var a = (t & 1) !== 0, i = (t & 2) !== 0, s = (t & 8) !== 0, l = (t & 16) !== 0, d = !1, c;
  s ? [c, d] = Es(() => (
    /** @type {V} */
    n[e]
  )) : c = /** @type {V} */
  n[e];
  var f = ht(n, e)?.set, u = (
    /** @type {V} */
    r
  ), h = !0, _ = !1, v = () => (_ = !0, h && (h = !1, l ? u = ke(
    /** @type {() => V} */
    r
  ) : u = /** @type {V} */
  r), u);
  c === void 0 && r !== void 0 && (f && i && Ro(), c = v(), f && f(c));
  var m;
  if (i)
    m = () => {
      var I = (
        /** @type {V} */
        n[e]
      );
      return I === void 0 ? v() : (h = !0, _ = !1, I);
    };
  else {
    var w = pa(
      () => (a ? B : si)(() => (
        /** @type {V} */
        n[e]
      ))
    );
    w.f |= Do, m = () => {
      var I = o(w);
      return I !== void 0 && (u = /** @type {V} */
      void 0), I === void 0 ? u : I;
    };
  }
  if (!(t & 4))
    return m;
  if (f) {
    var k = n.$$legacy;
    return function(I, A) {
      return arguments.length > 0 ? ((!i || !A || k || d) && f(A ? m() : I), I) : m();
    };
  }
  var p = !1, x = !1, y = /* @__PURE__ */ Lr(c), b = pa(
    () => /* @__PURE__ */ B(() => {
      var I = m(), A = o(y);
      return p ? (p = !1, x = !0, A) : (x = !1, y.v = I);
    })
  );
  return a || (b.equals = Rr), function(I, A) {
    if (arguments.length > 0) {
      const M = A ? o(b) : i && s ? Q(I) : I;
      return b.equals(M) || (p = !0, H(y, M), _ && u !== void 0 && (u = M), ke(() => o(b))), I;
    }
    return o(b);
  };
}
const Ms = "5";
typeof window < "u" && (window.__svelte ||= { v: /* @__PURE__ */ new Set() }).v.add(Ms);
const $n = {
  kanban: {
    Save: "Save",
    Close: "Close",
    Delete: "Delete",
    Description: "Description",
    Type: "Type",
    "Start date": "Start date",
    "End date": "End date",
    Files: "Files",
    B: "B",
    KB: "KB",
    MB: "MB",
    GB: "GB",
    TB: "TB",
    PB: "PB",
    EB: "EB",
    "Make cover": "Make cover",
    "Remove cover": "Remove cover",
    Comments: "Comments",
    Links: "Links",
    Result: "Result",
    "No results": "No results",
    Search: "Search",
    "Search in": "Search in",
    "Add new row": "Add new row",
    "Add new column": "Add new column",
    "Add new card...": "Add new card...",
    "Add new card": "Add new card",
    "Edit card": "Edit card",
    Edit: "Edit",
    Everywhere: "Everywhere",
    Label: "Label",
    Status: "Status",
    Color: "Color",
    Date: "Date",
    Priority: "Priority",
    Progress: "Progress",
    Users: "Users",
    Untitled: "Untitled",
    Rename: "Rename",
    "Move up": "Move up",
    "Move down": "Move down",
    "Move left": "Move left",
    "Move right": "Move right",
    Sort: "Sort",
    "Label (a-z)": "Label (a-z)",
    "Label (z-a)": "Label (z-a)",
    "Description (a-z)": "Description (a-z)",
    "Description (z-a)": "Description (z-a)",
    "Add link": "Add link",
    Duplicate: "Duplicate",
    "Duplicate of": "Duplicate of",
    "Relates to": "Relates to",
    "Depends on": "Depends on",
    "Is required for": "Is required for",
    Duplicates: "Duplicates",
    "Is duplicated by": "Is duplicated by",
    "Is parent for": "Is parent for",
    "Is subtask of": "Is subtask of",
    Cancel: "Cancel",
    "Link task": "Link task",
    "Select a relation": "Select a relation",
    "Select a task": "Select a task",
    Send: "Send",
    "Add a comment...": "Add a comment...",
    "Would you like to delete this comment?": "Would you like to delete this comment?",
    "No comments yet": "No comments yet",
    "Would you like to delete this card?": "Would you like to delete this card?"
  }
}, As = {
  kanban: {
    Save: "Speichern",
    Close: "Schließen",
    Delete: "Löschen",
    Description: "Beschreibung",
    Type: "Typ",
    "Start date": "Startdatum",
    "End date": "Enddatum",
    Files: "Dateien",
    B: "B",
    KB: "KB",
    MB: "MB",
    GB: "GB",
    TB: "TB",
    PB: "PB",
    EB: "EB",
    "Make cover": "Als Cover festlegen",
    "Remove cover": "Cover entfernen",
    Comments: "Kommentare",
    Links: "Links",
    Result: "Ergebnis",
    "No results": "Keine Ergebnisse",
    Search: "Suchen",
    "Search in": "Suchen in",
    "Add new row": "Zeile hinzufügen",
    "Add new column": "Spalte hinzufügen",
    "Add new card...": "Karte hinzufügen...",
    "Add new card": "Karte hinzufügen",
    "Edit card": "Karte bearbeiten",
    Edit: "Bearbeiten",
    Everywhere: "Überall",
    Label: "Label",
    Status: "Status",
    Color: "Farbe",
    Date: "Datum",
    Priority: "Priorität",
    Progress: "Fortschritt",
    Users: "Benutzer",
    Untitled: "Unbenannt",
    Rename: "Umbenennen",
    "Move up": "Nach oben verschieben",
    "Move down": "Nach unten verschieben",
    "Move left": "Nach links verschieben",
    "Move right": "Nach rechts verschieben",
    Sort: "Sortieren",
    "Label (a-z)": "Label (A-Z)",
    "Label (z-a)": "Label (Z-A)",
    "Description (a-z)": "Beschreibung (A-Z)",
    "Description (z-a)": "Beschreibung (Z-A)",
    "Would you like to delete this comment?": "Diesen Kommentar wirklich löschen?",
    "Add link": "Link hinzufügen",
    Duplicate: "Duplizieren",
    "Duplicate of": "Duplikat von",
    "Relates to": "Verknüpft mit",
    "Depends on": "Hängt ab von",
    "Is required for": "Voraussetzung für",
    Duplicates: "Duplikate",
    "Is duplicated by": "Wird dupliziert von",
    "Is parent for": "Übergeordnete Aufgabe von",
    "Is subtask of": "Unteraufgabe von",
    Cancel: "Abbrechen",
    "Link task": "Aufgabe verknüpfen",
    "Select a relation": "Beziehung auswählen",
    "Select a task": "Aufgabe auswählen",
    Send: "Senden",
    "Add a comment...": "Kommentar hinzufügen...",
    "No comments yet": "Noch keine Kommentare",
    "Would you like to delete this card?": "Diese Karte wirklich löschen?"
  }
}, Ts = {
  kanban: {
    Save: "保存",
    Close: "关闭",
    Delete: "删除",
    Description: "描述",
    Type: "类型",
    "Start date": "开始日期",
    "End date": "结束日期",
    Files: "文件",
    B: "B",
    KB: "KB",
    MB: "MB",
    GB: "GB",
    TB: "TB",
    PB: "PB",
    EB: "EB",
    "Make cover": "设为封面",
    "Remove cover": "移除封面",
    Comments: "评论",
    Links: "链接",
    Result: "结果",
    "No results": "无结果",
    Search: "搜索",
    "Search in": "搜索位置",
    "Add new row": "添加行",
    "Add new column": "添加列",
    "Add new card...": "添加卡片...",
    "Add new card": "添加卡片",
    "Edit card": "编辑卡片",
    Edit: "编辑",
    Everywhere: "全部",
    Label: "标签",
    Status: "状态",
    Color: "颜色",
    Date: "日期",
    Priority: "优先级",
    Progress: "进度",
    Users: "用户",
    Untitled: "未命名",
    Rename: "重命名",
    "Move up": "上移",
    "Move down": "下移",
    "Move left": "左移",
    "Move right": "右移",
    Sort: "排序",
    "Label (a-z)": "标签 (A-Z)",
    "Label (z-a)": "标签 (Z-A)",
    "Description (a-z)": "描述 (A-Z)",
    "Description (z-a)": "描述 (Z-A)",
    "Would you like to delete this comment?": "确定删除此评论吗？",
    "Add link": "添加链接",
    Duplicate: "复制",
    "Duplicate of": "副本",
    "Relates to": "关联到",
    "Depends on": "依赖于",
    "Is required for": "是…的前置任务",
    Duplicates: "重复",
    "Is duplicated by": "被重复",
    "Is parent for": "父任务",
    "Is subtask of": "子任务",
    Cancel: "取消",
    "Link task": "关联任务",
    "Select a relation": "选择关系",
    "Select a task": "选择任务",
    Send: "发送",
    "Add a comment...": "添加评论...",
    "No comments yet": "暂无评论",
    "Would you like to delete this card?": "确定删除此卡片吗？"
  }
}, Ps = {
  kanban: {
    Save: "Guardar",
    Close: "Cerrar",
    Delete: "Eliminar",
    Description: "Descripción",
    Type: "Tipo",
    "Start date": "Fecha de inicio",
    "End date": "Fecha de finalización",
    Files: "Archivos",
    B: "B",
    KB: "KB",
    MB: "MB",
    GB: "GB",
    TB: "TB",
    PB: "PB",
    EB: "EB",
    "Make cover": "Establecer como portada",
    "Remove cover": "Quitar portada",
    Comments: "Comentarios",
    Links: "Enlaces",
    Result: "Resultado",
    "No results": "Sin resultados",
    Search: "Buscar",
    "Search in": "Buscar en",
    "Add new row": "Añadir fila",
    "Add new column": "Añadir columna",
    "Add new card...": "Añadir tarjeta...",
    "Add new card": "Añadir tarjeta",
    "Edit card": "Editar tarjeta",
    Edit: "Editar",
    Everywhere: "En todas partes",
    Label: "Etiqueta",
    Status: "Estado",
    Color: "Color",
    Date: "Fecha",
    Priority: "Prioridad",
    Progress: "Progreso",
    Users: "Usuarios",
    Untitled: "Sin título",
    Rename: "Renombrar",
    "Move up": "Mover arriba",
    "Move down": "Mover abajo",
    "Move left": "Mover a la izquierda",
    "Move right": "Mover a la derecha",
    Sort: "Ordenar",
    "Label (a-z)": "Etiqueta (A-Z)",
    "Label (z-a)": "Etiqueta (Z-A)",
    "Description (a-z)": "Descripción (A-Z)",
    "Description (z-a)": "Descripción (Z-A)",
    "Would you like to delete this comment?": "¿Quieres eliminar este comentario?",
    "Add link": "Añadir enlace",
    Duplicate: "Duplicar",
    "Duplicate of": "Duplicado de",
    "Relates to": "Relacionado con",
    "Depends on": "Depende de",
    "Is required for": "Es requisito para",
    Duplicates: "Duplicados",
    "Is duplicated by": "Está duplicado por",
    "Is parent for": "Tarea principal de",
    "Is subtask of": "Subtarea de",
    Cancel: "Cancelar",
    "Link task": "Vincular tarea",
    "Select a relation": "Seleccionar relación",
    "Select a task": "Seleccionar tarea",
    Send: "Enviar",
    "Add a comment...": "Añadir comentario...",
    "No comments yet": "Aún no hay comentarios",
    "Would you like to delete this card?": "¿Quieres eliminar esta tarjeta?"
  }
}, Rs = {
  kanban: {
    Save: "Enregistrer",
    Close: "Fermer",
    Delete: "Supprimer",
    Description: "Description",
    Type: "Type",
    "Start date": "Date de début",
    "End date": "Date de fin",
    Files: "Fichiers",
    B: "o",
    KB: "Ko",
    MB: "Mo",
    GB: "Go",
    TB: "To",
    PB: "Po",
    EB: "Eo",
    "Make cover": "Définir comme couverture",
    "Remove cover": "Retirer la couverture",
    Comments: "Commentaires",
    Links: "Liens",
    Result: "Résultat",
    "No results": "Aucun résultat",
    Search: "Rechercher",
    "Search in": "Rechercher dans",
    "Add new row": "Ajouter une ligne",
    "Add new column": "Ajouter une colonne",
    "Add new card...": "Ajouter une carte...",
    "Add new card": "Ajouter une carte",
    "Edit card": "Modifier la carte",
    Edit: "Modifier",
    Everywhere: "Partout",
    Label: "Étiquette",
    Status: "Statut",
    Color: "Couleur",
    Date: "Date",
    Priority: "Priorité",
    Progress: "Avancement",
    Users: "Utilisateurs",
    Untitled: "Sans titre",
    Rename: "Renommer",
    "Move up": "Déplacer vers le haut",
    "Move down": "Déplacer vers le bas",
    "Move left": "Déplacer vers la gauche",
    "Move right": "Déplacer vers la droite",
    Sort: "Trier",
    "Label (a-z)": "Étiquette (A-Z)",
    "Label (z-a)": "Étiquette (Z-A)",
    "Description (a-z)": "Description (A-Z)",
    "Description (z-a)": "Description (Z-A)",
    "Would you like to delete this comment?": "Voulez-vous vraiment supprimer ce commentaire ?",
    "Add link": "Ajouter un lien",
    Duplicate: "Dupliquer",
    "Duplicate of": "Copie de",
    "Relates to": "Lié à",
    "Depends on": "Dépend de",
    "Is required for": "Nécessaire pour",
    Duplicates: "Doublons",
    "Is duplicated by": "Dupliqué par",
    "Is parent for": "Tâche parente de",
    "Is subtask of": "Sous-tâche de",
    Cancel: "Annuler",
    "Link task": "Lier une tâche",
    "Select a relation": "Sélectionner une relation",
    "Select a task": "Sélectionner une tâche",
    Send: "Envoyer",
    "Add a comment...": "Ajouter un commentaire...",
    "No comments yet": "Aucun commentaire pour l’instant",
    "Would you like to delete this card?": "Voulez-vous vraiment supprimer cette carte ?"
  }
}, Ls = {
  kanban: {
    Save: "Salva",
    Close: "Chiudi",
    Delete: "Elimina",
    Description: "Descrizione",
    Type: "Tipo",
    "Start date": "Data di inizio",
    "End date": "Data di fine",
    Files: "File",
    B: "B",
    KB: "KB",
    MB: "MB",
    GB: "GB",
    TB: "TB",
    PB: "PB",
    EB: "EB",
    "Make cover": "Imposta come copertina",
    "Remove cover": "Rimuovi copertina",
    Comments: "Commenti",
    Links: "Collegamenti",
    Result: "Risultato",
    "No results": "Nessun risultato",
    Search: "Cerca",
    "Search in": "Cerca in",
    "Add new row": "Aggiungi riga",
    "Add new column": "Aggiungi colonna",
    "Add new card...": "Aggiungi scheda...",
    "Add new card": "Aggiungi scheda",
    "Edit card": "Modifica scheda",
    Edit: "Modifica",
    Everywhere: "Ovunque",
    Label: "Etichetta",
    Status: "Stato",
    Color: "Colore",
    Date: "Data",
    Priority: "Priorità",
    Progress: "Avanzamento",
    Users: "Utenti",
    Untitled: "Senza titolo",
    Rename: "Rinomina",
    "Move up": "Sposta in alto",
    "Move down": "Sposta in basso",
    "Move left": "Sposta a sinistra",
    "Move right": "Sposta a destra",
    Sort: "Ordina",
    "Label (a-z)": "Etichetta (A-Z)",
    "Label (z-a)": "Etichetta (Z-A)",
    "Description (a-z)": "Descrizione (A-Z)",
    "Description (z-a)": "Descrizione (Z-A)",
    "Would you like to delete this comment?": "Vuoi davvero eliminare questo commento?",
    "Add link": "Aggiungi collegamento",
    Duplicate: "Duplica",
    "Duplicate of": "Duplicato di",
    "Relates to": "Collegato a",
    "Depends on": "Dipende da",
    "Is required for": "Necessario per",
    Duplicates: "Duplicati",
    "Is duplicated by": "Duplicato da",
    "Is parent for": "Attività principale di",
    "Is subtask of": "Sottoattività di",
    Cancel: "Annulla",
    "Link task": "Collega attività",
    "Select a relation": "Seleziona relazione",
    "Select a task": "Seleziona attività",
    Send: "Invia",
    "Add a comment...": "Aggiungi commento...",
    "No comments yet": "Nessun commento",
    "Would you like to delete this card?": "Vuoi davvero eliminare questa scheda?"
  }
}, Fs = {
  kanban: {
    Save: "保存",
    Close: "閉じる",
    Delete: "削除",
    Description: "説明",
    Type: "タイプ",
    "Start date": "開始日",
    "End date": "終了日",
    Files: "ファイル",
    B: "B",
    KB: "KB",
    MB: "MB",
    GB: "GB",
    TB: "TB",
    PB: "PB",
    EB: "EB",
    "Make cover": "カバーに設定",
    "Remove cover": "カバーを削除",
    Comments: "コメント",
    Links: "リンク",
    Result: "結果",
    "No results": "結果がありません",
    Search: "検索",
    "Search in": "検索対象",
    "Add new row": "行を追加",
    "Add new column": "列を追加",
    "Add new card...": "カードを追加...",
    "Add new card": "カードを追加",
    "Edit card": "カードを編集",
    Edit: "編集",
    Everywhere: "すべて",
    Label: "ラベル",
    Status: "ステータス",
    Color: "色",
    Date: "日付",
    Priority: "優先度",
    Progress: "進捗",
    Users: "ユーザー",
    Untitled: "無題",
    Rename: "名前を変更",
    "Move up": "上に移動",
    "Move down": "下に移動",
    "Move left": "左に移動",
    "Move right": "右に移動",
    Sort: "並べ替え",
    "Label (a-z)": "ラベル (A-Z)",
    "Label (z-a)": "ラベル (Z-A)",
    "Description (a-z)": "説明 (A-Z)",
    "Description (z-a)": "説明 (Z-A)",
    "Would you like to delete this comment?": "このコメントを削除しますか？",
    "Add link": "リンクを追加",
    Duplicate: "複製",
    "Duplicate of": "複製元",
    "Relates to": "関連",
    "Depends on": "依存先",
    "Is required for": "に必要",
    Duplicates: "重複",
    "Is duplicated by": "によって複製",
    "Is parent for": "親タスク",
    "Is subtask of": "のサブタスク",
    Cancel: "キャンセル",
    "Link task": "タスクをリンク",
    "Select a relation": "関連を選択",
    "Select a task": "タスクを選択",
    Send: "送信",
    "Add a comment...": "コメントを追加...",
    "No comments yet": "まだコメントがありません",
    "Would you like to delete this card?": "このカードを削除しますか？"
  }
}, Os = {
  kanban: {
    Save: "Salvar",
    Close: "Fechar",
    Delete: "Excluir",
    Description: "Descrição",
    Type: "Tipo",
    "Start date": "Data de início",
    "End date": "Data de término",
    Files: "Arquivos",
    B: "B",
    KB: "KB",
    MB: "MB",
    GB: "GB",
    TB: "TB",
    PB: "PB",
    EB: "EB",
    "Make cover": "Definir como capa",
    "Remove cover": "Remover capa",
    Comments: "Comentários",
    Links: "Links",
    Result: "Resultado",
    "No results": "Nenhum resultado",
    Search: "Pesquisar",
    "Search in": "Pesquisar em",
    "Add new row": "Adicionar nova linha",
    "Add new column": "Adicionar nova coluna",
    "Add new card...": "Adicionar novo cartão...",
    "Add new card": "Adicionar novo cartão",
    "Edit card": "Editar cartão",
    Edit: "Editar",
    Everywhere: "Em todos os lugares",
    Label: "Etiqueta",
    Status: "Status",
    Color: "Cor",
    Date: "Data",
    Priority: "Prioridade",
    Progress: "Progresso",
    Users: "Usuários",
    Untitled: "Sem título",
    Rename: "Renomear",
    "Move up": "Mover para cima",
    "Move down": "Mover para baixo",
    "Move left": "Mover para a esquerda",
    "Move right": "Mover para a direita",
    Sort: "Ordenar",
    "Label (a-z)": "Etiqueta (A-Z)",
    "Label (z-a)": "Etiqueta (Z-A)",
    "Description (a-z)": "Descrição (A-Z)",
    "Description (z-a)": "Descrição (Z-A)",
    "Would you like to delete this comment?": "Deseja excluir este comentário?",
    "Add link": "Adicionar link",
    Duplicate: "Duplicar",
    "Duplicate of": "Duplicado de",
    "Relates to": "Relacionado a",
    "Depends on": "Depende de",
    "Is required for": "É necessário para",
    Duplicates: "Duplicados",
    "Is duplicated by": "É duplicado por",
    "Is parent for": "É pai de",
    "Is subtask of": "É subtarefa de",
    Cancel: "Cancelar",
    "Link task": "Vincular tarefa",
    "Select a relation": "Selecione uma relação",
    "Select a task": "Selecione uma tarefa",
    Send: "Enviar",
    "Add a comment...": "Adicionar comentário...",
    "No comments yet": "Nenhum comentário ainda",
    "Would you like to delete this card?": "Deseja excluir este cartão?"
  }
}, Ns = {
  kanban: {
    Save: "Сохранить",
    Close: "Закрыть",
    Delete: "Удалить",
    Description: "Описание",
    Type: "Тип",
    "Start date": "Дата начала",
    "End date": "Дата окончания",
    Files: "Файлы",
    B: "Б",
    KB: "КБ",
    MB: "МБ",
    GB: "ГБ",
    TB: "ТБ",
    PB: "ПБ",
    EB: "ЭБ",
    "Make cover": "Сделать обложкой",
    "Remove cover": "Убрать обложку",
    Comments: "Комментарии",
    Links: "Ссылки",
    Result: "Результат",
    "No results": "Нет результатов",
    Search: "Поиск",
    "Search in": "Искать в",
    "Add new row": "Добавить ряд",
    "Add new column": "Добавить колонку",
    "Add new card...": "Добавить карточку...",
    "Add new card": "Добавить карточку",
    "Edit card": "Редактировать карточку",
    Edit: "Редактировать",
    Everywhere: "Везде",
    Label: "Название",
    Status: "Статус",
    Color: "Цвет",
    Date: "Дата",
    Priority: "Приоритет",
    Progress: "Прогресс",
    Users: "Пользователи",
    Untitled: "Без названия",
    Rename: "Переименовать",
    "Move up": "Переместить вверх",
    "Move down": "Переместить вниз",
    "Move left": "Переместить влево",
    "Move right": "Переместить вправо",
    Sort: "Сортировать",
    "Label (a-z)": "Название (а-я)",
    "Label (z-a)": "Название (я-а)",
    "Description (a-z)": "Описание (а-я)",
    "Description (z-a)": "Описание (я-а)",
    "Would you like to delete this comment?": "Удалить этот комментарий?",
    "Add link": "Добавить ссылку",
    Duplicate: "Дублировать",
    "Duplicate of": "Дубликат",
    "Relates to": "Связано с",
    "Depends on": "Зависит от",
    "Is required for": "Необходимо для",
    Duplicates: "Дублирует",
    "Is duplicated by": "Дублируется",
    "Is parent for": "Родитель для",
    "Is subtask of": "Подзадача для",
    Cancel: "Отмена",
    "Link task": "Связать задачу",
    "Select a relation": "Выберите связь",
    "Select a task": "Выберите задачу",
    Send: "Отправить",
    "Add a comment...": "Добавить комментарий...",
    "No comments yet": "Комментариев пока нет",
    "Would you like to delete this card?": "Удалить эту задачу?"
  }
}, Bs = "en-US", zs = {
  monthFull: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  dayFull: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hours: "Hours",
  minutes: "Minutes",
  done: "Done",
  clear: "Clear",
  today: "Today",
  am: ["am", "AM"],
  pm: ["pm", "PM"],
  weekStart: 7,
  clockFormat: 24
}, Hs = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, qs = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, er = {
  core: Hs,
  calendar: zs,
  formats: qs,
  lang: Bs
}, Us = "zh-CN", Ys = {
  monthFull: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
  ],
  monthShort: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
  ],
  dayFull: [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ],
  dayShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  hours: "小时",
  minutes: "分钟",
  done: "完成",
  clear: "清除",
  today: "今天",
  am: ["", ""],
  pm: ["", ""],
  weekStart: 7,
  clockFormat: 24
}, Ks = {
  ok: "确定",
  cancel: "取消",
  select: "选择",
  "No data": "没有数据",
  "Rows per page": "每页行数",
  "Total pages": "总页数"
}, Gs = {
  timeFormat: "%H:%i",
  dateFormat: "%Y-%m-%d",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, Vs = {
  core: Ks,
  calendar: Ys,
  formats: Gs,
  lang: Us
}, Ws = "de-DE", js = {
  monthFull: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
  ],
  monthShort: [
    "Jan",
    "Feb",
    "Mrz",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez"
  ],
  dayFull: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
  ],
  dayShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  hours: "Stunden",
  minutes: "Minuten",
  done: "Fertig",
  clear: "Entfernen",
  today: "Heute",
  weekStart: 1,
  clockFormat: 24
}, Zs = {
  ok: "OK",
  cancel: "Abbrechen",
  select: "Auswählen",
  "No data": "Keine Daten",
  "Rows per page": "Zeilen pro Seite",
  "Total pages": "Gesamtseiten"
}, Js = {
  timeFormat: "%H:%i",
  dateFormat: "%d.%m.%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, Qs = {
  core: Zs,
  calendar: js,
  formats: Js,
  lang: Ws
}, Xs = "es-ES", $s = {
  monthFull: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ],
  monthShort: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
  ],
  dayFull: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado"
  ],
  dayShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  hours: "Horas",
  minutes: "Minutos",
  done: "Listo",
  clear: "Reinicio",
  today: "Hoy",
  weekStart: 1,
  clockFormat: 24
}, el = {
  ok: "OK",
  cancel: "Cancelar",
  select: "Seleccionar",
  "No data": "Sin datos",
  "Rows per page": "Filas por página",
  "Total pages": "Total de páginas"
}, tl = {
  timeFormat: "%H:%i",
  dateFormat: "%d/%m/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, nl = {
  core: el,
  calendar: $s,
  formats: tl,
  lang: Xs
}, rl = "fr-FR", al = {
  monthFull: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ],
  monthShort: [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aôu",
    "Sep",
    "Oct",
    "Nov",
    "Déc"
  ],
  dayFull: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ],
  dayShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  hours: "Heures",
  minutes: "Minutes",
  done: "Fini",
  clear: "Effacer",
  today: "Aujourd'hui",
  weekStart: 1,
  clockFormat: 24
}, il = {
  ok: "OK",
  cancel: "Annuler",
  select: "Sélectionner",
  "No data": "Pas de données",
  "Rows per page": "Lignes par page",
  "Total pages": "Nombre total de pages"
}, ol = {
  timeFormat: "%H:%i",
  dateFormat: "%d/%m/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, sl = {
  core: il,
  calendar: al,
  formats: ol,
  lang: rl
}, ll = "it-IT", cl = {
  monthFull: [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre"
  ],
  monthShort: [
    "gen",
    "feb",
    "mar",
    "apr",
    "mag",
    "giu",
    "lug",
    "ago",
    "set",
    "ott",
    "nov",
    "dic"
  ],
  dayFull: [
    "domenica",
    "lunedì",
    "martedì",
    "mercoledì",
    "giovedì",
    "venerdì",
    "sabato"
  ],
  dayShort: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  hours: "Orario",
  minutes: "Minuti",
  done: "Pronto",
  clear: "Pulisci",
  today: "Oggi",
  weekStart: 1,
  clockFormat: 24
}, dl = {
  ok: "OK",
  cancel: "Annullare",
  select: "Seleziona",
  "No data": "Nessun dato",
  "Rows per page": "Righe per pagina",
  "Total pages": "Pagine totali"
}, ul = {
  timeFormat: "%H:%i",
  dateFormat: "%d/%m/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, fl = {
  core: dl,
  calendar: cl,
  formats: ul,
  lang: ll
}, vl = "ja-JP", hl = {
  monthFull: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ],
  monthShort: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ],
  dayFull: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日"
  ],
  dayShort: ["日", "月", "火", "水", "木", "金", "土"],
  hours: "営業時間",
  minutes: "分",
  done: "レディー",
  clear: "削除する",
  today: "今日",
  weekStart: 1,
  clockFormat: 24
}, ml = {
  ok: "OK",
  cancel: "取り消す",
  select: "選択",
  "No data": "データが見つかりませんでした",
  "Rows per page": "1ページあたりの行数",
  "Total pages": "総ページ数"
}, gl = {
  timeFormat: "%H:%i",
  dateFormat: "%Y年%m月%d日",
  monthYearFormat: "%m月%Y年",
  yearFormat: "%Y年"
}, _l = {
  core: ml,
  calendar: hl,
  formats: gl,
  lang: vl
}, wl = "pt-PT", yl = {
  monthFull: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  monthShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ],
  dayFull: [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"
  ],
  dayShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  hours: "Horas",
  minutes: "Minutos",
  done: "Feito",
  clear: "Limpar",
  today: "Hoje",
  weekStart: 1,
  clockFormat: 24
}, xl = {
  ok: "OK",
  cancel: "Cancelar",
  select: "Selecionar",
  "No data": "Sem dados",
  "Rows per page": "Linhas por página",
  "Total pages": "Total de páginas"
}, bl = {
  timeFormat: "%H:%i",
  dateFormat: "%d/%m/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, pl = {
  core: xl,
  calendar: yl,
  formats: bl,
  lang: wl
}, kl = "ru-RU", Sl = {
  monthFull: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Maй",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Oктябрь",
    "Ноябрь",
    "Декабрь"
  ],
  monthShort: [
    "Янв",
    "Фев",
    "Maр",
    "Aпр",
    "Maй",
    "Июн",
    "Июл",
    "Aвг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек"
  ],
  dayFull: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ],
  dayShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  hours: "Часы",
  minutes: "Минуты",
  done: "Гoтовo",
  clear: "Очистить",
  today: "Сегодня",
  weekStart: 1,
  clockFormat: 24
}, Il = {
  ok: "OK",
  cancel: "Отмена",
  select: "Выбрать",
  "No data": "Нет данных",
  "Rows per page": "Строк на странице",
  "Total pages": "Всего страниц"
}, El = {
  timeFormat: "%H:%i",
  dateFormat: "%d.%m.%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, Dl = {
  core: Il,
  calendar: Sl,
  formats: El,
  lang: kl
};
let Hi = (/* @__PURE__ */ new Date()).valueOf();
const Cl = () => Hi++;
function Gr() {
  return "temp://" + Hi++;
}
class Ml {
  constructor(e) {
    this._nextHandler = null, this._dispatch = e, this.exec = this.exec.bind(this);
  }
  async exec(e, t) {
    return this._dispatch(e, t), this._nextHandler && await this._nextHandler.exec(e, t), t;
  }
  setNext(e) {
    return this._nextHandler = e;
  }
}
function qi(n, e = "data-id") {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e))
      return t;
    t = t.parentNode;
  }
  return null;
}
function Al(n, e = "data-id") {
  const t = qi(n, e);
  return t ? Ui(t.getAttribute(e)) : null;
}
function Ui(n) {
  if (typeof n == "string") {
    const e = n * 1;
    if (!isNaN(e)) return e;
  }
  return n;
}
function Tl() {
  return {
    addEvent: function(n, e, t) {
      return n.addEventListener(e, t), () => n.removeEventListener(e, t);
    },
    addGlobalEvent: function(n, e) {
      return document.addEventListener(n, e), () => document.removeEventListener(n, e);
    },
    getTopNode: function() {
      return window.document.body;
    }
  };
}
const Ft = Tl();
function Pl(n) {
  Object.assign(Ft, n);
}
function ka(n, e, t) {
  function r(a) {
    const i = qi(a);
    if (!i) return;
    const s = Ui(i.dataset.id);
    if (typeof e == "function") return e(s, a);
    let l, d = a.target;
    for (; d != i; ) {
      if (l = d.dataset ? d.dataset.action : null, l && e[l]) {
        e[l](s, a);
        return;
      }
      d = d.parentNode;
    }
    e[t] && e[t](s, a);
  }
  Ft.addEvent(n, t, r);
}
function Vr(n, e) {
  ka(n, e, "click"), e.dblclick && ka(n, e.dblclick, "dblclick");
}
function Rl(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    if (n[t] === e) {
      n.splice(t, 1);
      break;
    }
}
let Yi = /* @__PURE__ */ new Date(), On = !1, bn = [];
const Ot = [], Sa = (n) => {
  if (On) {
    On = !1;
    return;
  }
  for (let e = Ot.length - 1; e >= 0; e--) {
    const { node: t, date: r, props: a } = Ot[e];
    if (!(r > Yi) && !t.contains(n.target) && t !== n.target && (a.callback && a.callback(n), a.modal || n.defaultPrevented))
      break;
  }
}, Ll = (n) => {
  Yi = /* @__PURE__ */ new Date(), On = !0;
  for (let e = Ot.length - 1; e >= 0; e--) {
    const { node: t } = Ot[e];
    if (!t.contains(n.target) && t !== n.target) {
      On = !1;
      break;
    }
  }
};
function Fl(n, e) {
  bn.length || (bn = [
    Ft.addGlobalEvent("click", Sa),
    Ft.addGlobalEvent("contextmenu", Sa),
    Ft.addGlobalEvent("mousedown", Ll)
  ]), typeof e != "object" && (e = { callback: e });
  const t = { node: n, date: /* @__PURE__ */ new Date(), props: e };
  return Ot.push(t), {
    destroy() {
      Rl(Ot, t), Ot.length || (bn.forEach((r) => r()), bn = []);
    }
  };
}
let Ia = (/* @__PURE__ */ new Date()).valueOf();
function ot() {
  return Ia += 1, Ia;
}
function Ge(n) {
  return n < 10 ? "0" + n : n.toString();
}
function Ol(n) {
  const e = Ge(n);
  return e.length == 2 ? "0" + e : e;
}
function Ki(n) {
  const e = Math.floor(n / 11) * 11;
  return {
    start: e,
    end: e + 11
  };
}
function Nl(n) {
  let e = n.getDay();
  e === 0 && (e = 7);
  const t = new Date(n.valueOf());
  t.setDate(n.getDate() + (4 - e));
  const r = t.getFullYear(), a = Math.floor(
    (t.getTime() - new Date(r, 0, 1).getTime()) / 864e5
  );
  return 1 + Math.floor(a / 7);
}
const Ea = ["", ""];
function Bl(n, e, t) {
  switch (n) {
    case "%d":
      return Ge(e.getDate());
    case "%m":
      return Ge(e.getMonth() + 1);
    case "%j":
      return e.getDate();
    case "%n":
      return e.getMonth() + 1;
    case "%y":
      return Ge(e.getFullYear() % 100);
    case "%Y":
      return e.getFullYear();
    case "%D":
      return t.dayShort[e.getDay()];
    case "%l":
      return t.dayFull[e.getDay()];
    case "%M":
      return t.monthShort[e.getMonth()];
    case "%F":
      return t.monthFull[e.getMonth()];
    case "%h":
      return Ge((e.getHours() + 11) % 12 + 1);
    case "%g":
      return (e.getHours() + 11) % 12 + 1;
    case "%G":
      return e.getHours();
    case "%H":
      return Ge(e.getHours());
    case "%i":
      return Ge(e.getMinutes());
    case "%a":
      return ((e.getHours() > 11 ? t.pm : t.am) || Ea)[0];
    case "%A":
      return ((e.getHours() > 11 ? t.pm : t.am) || Ea)[1];
    case "%s":
      return Ge(e.getSeconds());
    case "%S":
      return Ol(e.getMilliseconds());
    case "%W":
      return Ge(Nl(e));
    case "%c": {
      let r = e.getFullYear() + "";
      return r += "-" + Ge(e.getMonth() + 1), r += "-" + Ge(e.getDate()), r += "T", r += Ge(e.getHours()), r += ":" + Ge(e.getMinutes()), r += ":" + Ge(e.getSeconds()), r;
    }
    default:
      return n;
  }
}
const zl = /%[a-zA-Z]/g;
function En(n, e) {
  return typeof n == "function" ? n : function(t) {
    return t ? (t.getMonth || (t = new Date(t)), n.replace(
      zl,
      (r) => Bl(r, t, e)
    )) : "";
  };
}
function Da(n) {
  return n && typeof n == "object" && !Array.isArray(n);
}
function yr(n, e) {
  for (const t in e) {
    const r = e[t];
    Da(n[t]) && Da(r) ? n[t] = yr(
      { ...n[t] },
      e[t]
    ) : n[t] = e[t];
  }
  return n;
}
function Gi(n) {
  return {
    getGroup(e) {
      const t = n[e];
      return (r) => t && t[r] || r;
    },
    getRaw() {
      return n;
    },
    extend(e, t) {
      if (!e) return this;
      let r;
      return t ? r = yr({ ...e }, n) : r = yr({ ...n }, e), Gi(r);
    }
  };
}
var Hl = (n, e, t) => e.onchange && e.onchange({ value: t(), input: !0 }), ql = (n, e, t) => e.onchange && e.onchange({ value: t() }), Ul = /* @__PURE__ */ E('<textarea class="wx-textarea svelte-1eba9c5"></textarea>');
function xr(n, e) {
  ne(e, !0);
  let t = S(e, "value", 15, ""), r = S(e, "id", 19, ot), a = S(e, "placeholder", 3, ""), i = S(e, "title", 3, ""), s = S(e, "disabled", 3, !1), l = S(e, "error", 3, !1), d = S(e, "readonly", 3, !1);
  var c = Ul();
  c.__input = [Hl, e, t], c.__change = [ql, e, t], O(() => {
    J(c, "id", r()), c.disabled = s(), J(c, "placeholder", a()), c.readOnly = d(), J(c, "title", i()), ve(c, "wx-error", l());
  }), nn(c, t), g(n, c), re();
}
me(["input", "change"]);
const Yl = (n, e) => {
  e.onclick && e.onclick(n);
};
var Kl = /* @__PURE__ */ E("<i></i>"), Gl = /* @__PURE__ */ E("<button><!> <!></button>");
function Re(n, e) {
  ne(e, !0);
  let t = S(e, "type", 3, ""), r = S(e, "css", 3, ""), a = S(e, "icon", 3, ""), i = S(e, "disabled", 3, !1), s = S(e, "title", 3, ""), l = S(e, "text", 3, ""), d = /* @__PURE__ */ B(() => {
    let h = t() ? t().split(" ").filter((_) => _ !== "").map((_) => "wx-" + _).join(" ") : "";
    return r() + (r() ? " " : "") + h;
  });
  var c = Gl();
  c.__click = [Yl, e];
  var f = D(c);
  P(f, a, (h) => {
    var _ = Kl();
    O(() => ye(_, `${a() ?? ""} svelte-1p0p9h7`)), g(h, _);
  });
  var u = U(f, 2);
  P(
    u,
    () => e.children,
    (h) => {
      var _ = $(), v = V(_);
      Ee(v, () => e.children), g(h, _);
    },
    (h) => {
      var _ = Se();
      O(() => te(_, l())), g(h, _);
    }
  ), O(() => {
    J(c, "title", s()), ye(c, `${`wx-button ${o(d)}` ?? ""} svelte-1p0p9h7`), c.disabled = i(), ve(c, "wx-icon", a() && !e.children);
  }), g(n, c), re();
}
me(["click"]);
function Vl({ target: n }, e, t, r) {
  e(n.checked), t.onchange && t.onchange({
    value: e(),
    inputValue: r()
  });
}
var Wl = /* @__PURE__ */ E('<span class="svelte-101cewd"> </span>'), jl = /* @__PURE__ */ E('<div class="wx-checkbox svelte-101cewd"><input type="checkbox" class="svelte-101cewd"> <label class="svelte-101cewd"><span class="svelte-101cewd"></span> <!></label></div>');
function Zl(n, e) {
  ne(e, !0);
  let t = S(e, "id", 19, ot), r = S(e, "label", 3, ""), a = S(e, "inputValue", 3, ""), i = S(e, "value", 15, !1), s = S(e, "style", 3, ""), l = S(e, "disabled", 3, !1);
  var d = jl(), c = D(d);
  c.__change = [Vl, i, e, a];
  var f = U(c, 2), u = U(D(f), 2);
  P(u, r, (h) => {
    var _ = Wl(), v = D(_);
    O(() => te(v, r())), g(h, _);
  }), O(() => {
    J(d, "style", s()), J(c, "id", t()), c.disabled = l(), ds(c, i()), Ht(c, a()), J(f, "for", t());
  }), g(n, d), re();
}
me(["change"]);
var Jl = /* @__PURE__ */ E("<div><!></div>");
function At(n, e) {
  ne(e, !0);
  let t = S(e, "position", 7, "bottom"), r = S(e, "align", 7, "start"), a = S(e, "autoFit", 3, !0), i = S(e, "oncancel", 3, null), s = S(e, "width", 3, "100%"), l;
  gt(() => {
    if (a()) {
      const u = l.getBoundingClientRect(), h = Ft.getTopNode(l).getBoundingClientRect();
      return u.right >= h.right && r("end"), u.bottom >= h.bottom && t("top"), `${t()}-${r()}`;
    }
  });
  function d(u) {
    i() && i()(u);
  }
  var c = Jl(), f = D(c);
  Ee(f, () => e.children ?? De), Ne(c, (u, h) => Fl(u, h), () => d), Te(c, (u) => l = u, () => l), O(() => {
    ye(c, `wx-dropdown ${`wx-${t()}-${r()}` ?? ""} svelte-1jzzq2v`), J(c, "style", `width:${s() ?? ""}`);
  }), g(n, c), re();
}
function Ql(n, e, t) {
  n.stopPropagation(), e(""), t.onchange && t.onchange({ value: e() });
}
function Xl(n, e, t) {
  if (e()) return !1;
  H(t, !0);
}
var $l = /* @__PURE__ */ E('<i class="wx-clear wxi-close svelte-t9vgru"></i>'), ec = /* @__PURE__ */ E('<div class="wx-color wx-selected svelte-t9vgru"></div>'), tc = /* @__PURE__ */ E('<div class="wx-empty wx-selected svelte-t9vgru"></div>'), nc = (n, e) => e(n, ""), rc = (n, e, t) => e(n, o(t)), ac = /* @__PURE__ */ E('<div class="wx-color svelte-t9vgru"></div>'), ic = /* @__PURE__ */ E('<div class="wx-colors svelte-t9vgru"><div class="wx-empty svelte-t9vgru"></div> <!></div>'), oc = /* @__PURE__ */ E('<div class="wx-colorselect svelte-t9vgru"><input readonly="" class="svelte-t9vgru"> <!> <!> <!></div>');
function sc(n, e) {
  ne(e, !0);
  let r = S(e, "colors", 3, [
    "#00a037",
    "#37a9ef",
    "#f5a623",
    "#ff4c3b",
    "#a0a0a0",
    "#000000",
    "#ffffff"
  ]), a = S(e, "value", 15, ""), i = S(e, "id", 19, ot), s = S(e, "clear", 3, !1), l = S(e, "placeholder", 3, ""), d = S(e, "title", 3, ""), c = S(e, "disabled", 3, !1), f = S(e, "error", 3, !1), u = ae(!1);
  function h(p, x) {
    p.stopPropagation(), a(x), H(u, !1), e.onchange && e.onchange({ value: a() });
  }
  var _ = oc();
  _.__click = [Xl, c, u];
  var v = D(_), m = U(v, 2);
  P(m, () => s() && a() && !c(), (p) => {
    var x = $l();
    x.__click = [Ql, a, e], g(p, x);
  });
  var w = U(m, 2);
  P(
    w,
    a,
    (p) => {
      var x = ec();
      O(() => J(x, "style", `background-color: ${a() || "#00a037"}`)), g(p, x);
    },
    (p) => {
      var x = tc();
      g(p, x);
    }
  );
  var k = U(w, 2);
  P(k, () => o(u), (p) => {
    At(p, {
      oncancel: () => H(u, !1),
      children: (x, y) => {
        var b = ic(), I = D(b);
        I.__click = [nc, h];
        var A = U(I, 2);
        Ie(A, 17, r, it, (M, q) => {
          var K = ac();
          K.__click = [rc, h, q], O(() => J(K, "style", `background-color: ${o(q) ?? ""}`)), g(M, K);
        }), g(x, b);
      },
      $$slots: { default: !0 }
    });
  }), O(() => {
    J(v, "title", d()), Ht(v, a()), J(v, "id", i()), J(v, "placeholder", l()), v.disabled = c(), ve(v, "wx-error", f()), ve(v, "wx-focus", o(u));
  }), g(n, _), re();
}
me(["click"]);
const lc = "en-US", cc = {
  monthFull: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  dayFull: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hours: "Hours",
  minutes: "Minutes",
  done: "Done",
  clear: "Clear",
  today: "Today",
  am: ["am", "AM"],
  pm: ["pm", "PM"],
  weekStart: 0,
  clockFormat: 24
}, dc = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, uc = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, fc = {
  core: dc,
  calendar: cc,
  formats: uc,
  lang: lc
};
function Tt(n, e) {
  ne(e, !0);
  let t = S(e, "words", 3, null), r = S(e, "optional", 3, !1), a = he("wx-i18n");
  a || (a = Gi(fc)), a = a.extend(t(), r()), wt("wx-i18n", a);
  var i = $(), s = V(i);
  Ee(s, () => e.children ?? De), g(n, i), re();
}
me(["keydown", "change"]);
me(["click"]);
function vc() {
  let n = null, e = !1, t, r, a, i;
  const s = (h, _, v, m) => {
    t = h, r = _, a = v, i = m;
  }, l = (h) => {
    n = h, e = n !== null, a(n);
  }, d = (h, _) => {
    const v = h === null ? null : Math.max(0, Math.min(n + h, r.length - 1));
    v !== n && (l(v), t ? c(v, _) : requestAnimationFrame(() => c(v, _)));
  }, c = (h, _) => {
    if (h !== null && t) {
      const v = t.querySelectorAll(".wx-list > .wx-item")[h];
      v && (v.scrollIntoView({ block: "nearest" }), _ && _.preventDefault());
    }
  };
  return { move: (h) => {
    const _ = Al(h), v = r.findIndex((m) => m.id == _);
    v !== n && l(v);
  }, keydown: (h, _) => {
    switch (h.code) {
      case "Enter":
        e ? i() : l(0);
        break;
      case "Space":
        e || l(0);
        break;
      case "Escape":
        a(n = null);
        break;
      case "Tab":
        a(n = null);
        break;
      case "ArrowDown":
        d(e ? 1 : _ || 0, h);
        break;
      case "ArrowUp":
        d(e ? -1 : _ || 0, h);
        break;
    }
  }, init: s, navigate: d };
}
var hc = /* @__PURE__ */ E('<div class="wx-item svelte-fl05h9"><!></div>'), mc = /* @__PURE__ */ E('<div class="wx-no-data svelte-fl05h9"> </div>'), gc = /* @__PURE__ */ E('<div class="wx-list svelte-fl05h9"><!></div>');
function _c(n, e) {
  ne(e, !0);
  let t = S(e, "items", 19, () => []), r = ae(void 0), a = ae(null);
  const i = he("wx-i18n").getGroup("core"), { move: s, keydown: l, init: d, navigate: c } = vc(), f = (_) => {
    _ && _.stopPropagation(), e.onselect && e.onselect({ id: t()[o(a)]?.id });
  };
  gt(() => {
    d(o(r), t(), (_) => H(a, Q(_)), f);
  }), vt(() => {
    e.onready && e.onready({ navigate: c, keydown: l, move: s });
  });
  var u = $(), h = V(u);
  P(h, () => o(a) !== null, (_) => {
    At(_, {
      oncancel: () => c(null),
      children: (v, m) => {
        var w = gc();
        w.__click = f, w.__mousemove = s;
        var k = D(w);
        P(
          k,
          () => t().length,
          (p) => {
            var x = $(), y = V(x);
            Ie(y, 19, t, (b) => b.id, (b, I, A) => {
              var M = hc(), q = D(M);
              P(
                q,
                () => e.children,
                (K) => {
                  var j = $(), Z = V(j);
                  Ee(Z, () => e.children, () => ({ option: o(I) })), g(K, j);
                },
                (K) => {
                  var j = Se();
                  O(() => te(j, o(I).label)), g(K, j);
                }
              ), O(() => {
                J(M, "data-id", o(I).id), ve(M, "wx-focus", o(A) === o(a));
              }), g(b, M);
            }), g(p, x);
          },
          (p) => {
            var x = mc(), y = D(x);
            O(() => te(y, i("No data"))), g(p, x);
          }
        ), Te(w, (p) => H(r, p), () => o(r)), g(v, w);
      },
      $$slots: { default: !0 }
    });
  }), g(n, u), re();
}
me(["click", "mousemove"]);
function Vi(n, e) {
  let t = /* @__PURE__ */ gn(e, ["$$slots", "$$events", "$$legacy"]);
  Tt(n, {
    children: (r, a) => {
      _c(r, We(() => t));
    },
    $$slots: { default: !0 }
  });
}
var wc = /* @__PURE__ */ E('<i class="wx-icon wxi-close svelte-1vqfa1a"></i>'), yc = /* @__PURE__ */ E('<i class="wx-icon wxi-angle-down svelte-1vqfa1a"></i>'), xc = /* @__PURE__ */ E('<div class="wx-combo svelte-1vqfa1a"><input class="svelte-1vqfa1a"> <!> <!></div>');
function br(n, e) {
  ne(e, !0);
  let t = S(e, "value", 15, ""), r = S(e, "id", 19, ot), a = S(e, "options", 19, () => []), i = S(e, "textOptions", 3, null), s = S(e, "textField", 3, "label"), l = S(e, "placeholder", 3, ""), d = S(e, "title", 3, ""), c = S(e, "disabled", 3, !1), f = S(e, "error", 3, !1), u = S(e, "clear", 3, !1), h = ae(!1), _ = ae(""), v = /* @__PURE__ */ B(() => {
    if (o(h)) return o(_);
    if (t() || t() === 0) {
      const C = (i() || a()).find((F) => F.id === t());
      if (C) return C[s()];
    }
    return "";
  }), m = /* @__PURE__ */ B(() => !o(v) || !o(h) ? a() : a().filter((C) => C[s()].toLowerCase().includes(o(v).toLowerCase()))), w, k;
  function p(C) {
    w = C.navigate, k = C.keydown;
  }
  const x = () => o(m).findIndex((C) => C.id === t()), y = () => w(x()), b = (C) => k(C, x());
  function I({ id: C }) {
    M(C, !0);
  }
  function A(C) {
    if (!a().length) return;
    if (C === "" && u()) {
      q();
      return;
    }
    let F = a().find((W) => W[s()] === C);
    F || (F = a().find((W) => W[s()].toLowerCase().includes(C.toLowerCase())));
    const Y = F ? F.id : t() || a()[0].id;
    M(Y, !1);
  }
  function M(C, F) {
    if (C || C === 0) {
      let Y = a().find((W) => W.id === C);
      H(h, !1), F && w(null), Y && t() !== Y.id && (t(Y.id), e.onchange && e.onchange({ value: t() }));
    }
    !Z && F && j.focus();
  }
  function q(C) {
    C && C.stopPropagation(), t(""), H(h, !1), e.onchange && e.onchange({ value: t() });
  }
  function K() {
    H(_, Q(j.value)), H(h, !0), o(m).length ? w(0) : w(null);
  }
  let j, Z;
  function G() {
    Z = !0;
  }
  function R() {
    Z = !1, setTimeout(
      () => {
        Z || A(o(v));
      },
      200
    );
  }
  var T = xc();
  T.__click = y, T.__keydown = b;
  var L = D(T);
  L.__input = K, Te(L, (C) => j = C, () => j);
  var z = U(L, 2);
  P(
    z,
    () => u() && !c() && t(),
    (C) => {
      var F = wc();
      F.__click = q, g(C, F);
    },
    (C) => {
      var F = yc();
      g(C, F);
    }
  );
  var N = U(z, 2);
  P(N, () => !c(), (C) => {
    Vi(C, {
      get items() {
        return o(m);
      },
      onready: p,
      onselect: I,
      children: (Y, W) => {
        let ee = () => W?.().option;
        var ie = $(), de = V(ie);
        P(
          de,
          () => e.children,
          (X) => {
            var oe = $(), le = V(oe);
            Ee(le, () => e.children, () => ({ option: ee() })), g(X, oe);
          },
          (X) => {
            var oe = Se();
            O(() => te(oe, ee()[s()])), g(X, oe);
          }
        ), g(Y, ie);
      },
      $$slots: { default: !0 }
    });
  }), O(() => {
    J(T, "title", d()), J(L, "id", r()), Ht(L, o(v)), L.disabled = c(), J(L, "placeholder", l()), ve(L, "wx-error", f());
  }), He("focus", L, G), He("blur", L, R), g(n, T), re();
}
me(["click", "keydown", "input"]);
const ir = (n, e, t) => e.onchange && e.onchange({ value: t(), input: !0 }), or = (n, e, t) => e.onchange && e.onchange({ value: t() });
function bc(n, e, t) {
  n.stopPropagation(), e(""), t.onchange && t.onchange({ value: e() });
}
var pc = /* @__PURE__ */ E('<input type="password" class="svelte-9z0rem">'), kc = /* @__PURE__ */ E('<input type="number" class="svelte-9z0rem">'), Sc = /* @__PURE__ */ E('<input class="svelte-9z0rem">'), Ic = /* @__PURE__ */ E("<i></i>"), Ec = /* @__PURE__ */ E('<i class="wx-icon wxi-close svelte-9z0rem"></i> <!>', 1), Dc = /* @__PURE__ */ E("<i></i>"), Cc = /* @__PURE__ */ E("<div><!> <!></div>");
function tr(n, e) {
  ne(e, !0);
  let t = S(e, "value", 15, ""), r = S(e, "id", 19, ot), a = S(e, "readonly", 3, !1), i = S(e, "focus", 3, !1), s = S(e, "select", 3, !1), l = S(e, "type", 3, "text"), d = S(e, "placeholder", 3, ""), c = S(e, "disabled", 3, !1), f = S(e, "error", 3, !1), u = S(e, "inputStyle", 3, ""), h = S(e, "title", 3, ""), _ = S(e, "css", 3, ""), v = S(e, "clear", 3, !1), m = /* @__PURE__ */ B(() => e.icon && _().indexOf("wx-icon-left") === -1 ? "wx-icon-right " + _() : _()), w = /* @__PURE__ */ B(() => e.icon && _().indexOf("wx-icon-left") !== -1), k;
  vt(() => {
    setTimeout(
      () => {
        i() && k && k.focus(), s() && k && k.select();
      },
      1
    );
  });
  var p = Cc(), x = D(p);
  P(
    x,
    () => l() == "password",
    (b) => {
      var I = pc();
      I.__input = [ir, e, t], I.__change = [or, e, t], Te(I, (A) => k = A, () => k), O(() => {
        J(I, "id", r()), I.readOnly = a(), I.disabled = c(), J(I, "placeholder", d()), J(I, "style", u()), J(I, "title", h());
      }), nn(I, t), g(b, I);
    },
    (b) => {
      var I = $(), A = V(I);
      P(
        A,
        () => l() == "number",
        (M) => {
          var q = kc();
          q.__input = [ir, e, t], q.__change = [or, e, t], Te(q, (K) => k = K, () => k), O(() => {
            J(q, "id", r()), q.readOnly = a(), q.disabled = c(), J(q, "placeholder", d()), J(q, "style", u()), J(q, "title", h());
          }), nn(q, t), g(M, q);
        },
        (M) => {
          var q = Sc();
          q.__input = [ir, e, t], q.__change = [or, e, t], Te(q, (K) => k = K, () => k), O(() => {
            J(q, "id", r()), q.readOnly = a(), q.disabled = c(), J(q, "placeholder", d()), J(q, "title", h()), J(q, "style", u());
          }), nn(q, t), g(M, q);
        },
        !0
      ), g(b, I);
    }
  );
  var y = U(x, 2);
  P(
    y,
    () => v() && !c() && t(),
    (b) => {
      var I = Ec(), A = V(I);
      A.__click = [bc, t, e];
      var M = U(A, 2);
      P(M, () => o(w), (q) => {
        var K = Ic();
        O(() => ye(K, `wx-icon ${e.icon ?? ""} svelte-9z0rem`)), g(q, K);
      }), g(b, I);
    },
    (b) => {
      var I = $(), A = V(I);
      P(
        A,
        () => e.icon,
        (M) => {
          var q = Dc();
          O(() => ye(q, `wx-icon ${e.icon ?? ""} svelte-9z0rem`)), g(M, q);
        },
        null,
        !0
      ), g(b, I);
    }
  ), O(() => {
    ye(p, `wx-text ${o(m) ?? ""} svelte-9z0rem`), ve(p, "wx-error", f()), ve(p, "wx-disabled", c()), ve(p, "wx-clear", v());
  }), g(n, p), re();
}
me(["input", "change", "click"]);
function Mc(n, e) {
  e.onshift && e.onshift({ diff: 0, type: e.type });
}
var Ac = (n, e) => e.onshift && e.onshift({ diff: -1, type: e.type }), Tc = /* @__PURE__ */ E('<i class="wx-pager wxi-angle-left svelte-wurt7c"></i>'), Pc = /* @__PURE__ */ E('<span class="wx-spacer svelte-wurt7c"></span>'), Rc = (n, e) => e.onshift && e.onshift({ diff: 1, type: e.type }), Lc = /* @__PURE__ */ E('<i class="wx-pager wxi-angle-right svelte-wurt7c"></i>'), Fc = /* @__PURE__ */ E('<span class="wx-spacer svelte-wurt7c"></span>'), Oc = /* @__PURE__ */ E('<div class="wx-header svelte-wurt7c"><!>  <span class="wx-label svelte-wurt7c"> </span> <!></div>');
function Nc(n, e) {
  ne(e, !0);
  const { calendar: t, formats: r } = he("wx-i18n").getRaw(), a = /* @__PURE__ */ B(() => e.date.getFullYear()), i = /* @__PURE__ */ B(() => {
    switch (e.type) {
      case "month":
        return En(r.monthYearFormat, t)(e.date);
      case "year":
        return En(r.yearFormat, t)(e.date);
      case "duodecade": {
        const { start: u, end: h } = Ki(o(a)), _ = En(r.yearFormat, t);
        return `${_(new Date(u, 0, 1))} - ${_(new Date(h, 11, 31))}`;
      }
    }
  });
  var s = Oc(), l = D(s);
  P(
    l,
    () => e.part != "right",
    (u) => {
      var h = Tc();
      h.__click = [Ac, e], g(u, h);
    },
    (u) => {
      var h = Pc();
      g(u, h);
    }
  );
  var d = U(l, 2);
  d.__click = [Mc, e];
  var c = D(d), f = U(d, 2);
  P(
    f,
    () => e.part != "left",
    (u) => {
      var h = Lc();
      h.__click = [Rc, e], g(u, h);
    },
    (u) => {
      var h = Fc();
      g(u, h);
    }
  ), O(() => te(c, o(i))), g(n, s), re();
}
me(["click"]);
var Bc = /* @__PURE__ */ E('<button class="svelte-1f88uh6"><!></button>');
function Wr(n, e) {
  ne(e, !0);
  var t = Bc();
  t.__click = function(...a) {
    e.onclick?.apply(this, a);
  };
  var r = D(t);
  Ee(r, () => e.children ?? De), g(n, t), re();
}
me(["click"]);
var zc = /* @__PURE__ */ E('<div class="wx-weekday svelte-nq9zbf"> </div>'), Hc = /* @__PURE__ */ E("<div> </div>"), qc = /* @__PURE__ */ E('<div><div class="wx-weekdays svelte-nq9zbf"></div> <div class="wx-days svelte-nq9zbf"></div></div>');
function Uc(n, e) {
  ne(e, !0);
  let t = S(e, "part", 3, ""), r = S(e, "markers", 3, null);
  const a = he("wx-i18n").getRaw().calendar, i = (a.weekStart || 7) % 7, s = a.dayShort.slice(i).concat(a.dayShort.slice(0, i)), l = (x, y, b) => new Date(x.getFullYear(), x.getMonth() + (y || 0), x.getDate() + (b || 0));
  let d = t() !== "normal";
  function c(x) {
    const y = x.getDay();
    return y === 0 || y === 6;
  }
  function f() {
    const x = l(e.current, 0, 1 - e.current.getDate());
    return x.setDate(x.getDate() - (x.getDay() - (i - 7)) % 7), x;
  }
  function u() {
    const x = l(e.current, 1, -e.current.getDate());
    return x.setDate(x.getDate() + (6 - x.getDay() + i) % 7), x;
  }
  const h = { click: _ };
  function _(x, y) {
    y.stopPropagation(), e.onchange && e.onchange(new Date(new Date(x))), e.oncancel && e.oncancel();
  }
  const v = /* @__PURE__ */ B(() => t() == "normal" ? [
    e.value ? l(e.value).valueOf() : 0
  ] : e.value ? [
    e.value.start ? l(e.value.start).valueOf() : 0,
    e.value.end ? l(e.value.end).valueOf() : 0
  ] : [0, 0]), m = /* @__PURE__ */ B(() => {
    const x = f(), y = u(), b = e.current.getMonth();
    let I = [];
    for (let A = x; A <= y; A.setDate(A.getDate() + 1)) {
      const M = {
        day: A.getDate(),
        in: A.getMonth() === b,
        date: A.valueOf()
      };
      let q = "";
      if (q += M.in ? "" : " wx-inactive", q += o(v).indexOf(M.date) > -1 ? " wx-selected" : "", d) {
        const K = M.date == o(v)[0], j = M.date == o(v)[1];
        K && !j ? q += " wx-left" : j && !K && (q += " wx-right"), M.date > o(v)[0] && M.date < o(v)[1] && (q += " wx-inrange");
      }
      if (q += c(A) ? " wx-weekend" : "", r()) {
        const K = r()(A);
        K && (q += " " + K);
      }
      I.push({ ...M, css: q });
    }
    return I;
  });
  var w = qc(), k = D(w);
  Ie(k, 21, () => s, it, (x, y) => {
    var b = zc(), I = D(b);
    O(() => te(I, o(y))), g(x, b);
  });
  var p = U(k, 2);
  Ie(p, 21, () => o(m), (x) => x.date, (x, y) => {
    var b = Hc(), I = D(b);
    O(() => {
      ye(b, `wx-day ${o(y).css ?? ""} svelte-nq9zbf`), J(b, "data-id", o(y).date), ve(b, "wx-out", !o(y).in), te(I, o(y).day);
    }), g(x, b);
  }), Ne(p, (x, y) => Vr(x, y), () => h), g(n, w), re();
}
var Yc = /* @__PURE__ */ E('<div class="wx-month svelte-1mekhda"> </div>'), Kc = /* @__PURE__ */ E('<div class="wx-months svelte-1mekhda"></div> <div class="wx-buttons svelte-1mekhda"><!></div>', 1);
function Gc(n, e) {
  ne(e, !0);
  let t = S(e, "value", 15), r = S(e, "current", 15);
  const a = he("wx-i18n").getRaw().calendar, i = a.monthShort, s = /* @__PURE__ */ B(() => r().getMonth()), l = { click: d };
  function d(v, m) {
    (v || v === 0) && (m.stopPropagation(), r().setMonth(v), r(new Date(r())), e.onshift && e.onshift({})), e.part === "normal" && t(new Date(r())), e.oncancel && e.oncancel();
  }
  function c() {
    const v = new Date(Wi(t(), e.part) || r());
    v.setMonth(r().getMonth()), v.setFullYear(r().getFullYear()), e.onchange && e.onchange(v);
  }
  var f = Kc(), u = V(f);
  Ie(u, 21, () => i, it, (v, m, w) => {
    var k = Yc();
    J(k, "data-id", w);
    var p = D(k);
    O(() => {
      ve(k, "wx-current", o(s) === w), te(p, o(m));
    }), g(v, k);
  }), Ne(u, (v, m) => Vr(v, m), () => l);
  var h = U(u, 2), _ = D(h);
  Wr(_, {
    onclick: c,
    children: (v, m) => {
      var w = Se();
      O(() => te(w, a.done)), g(v, w);
    },
    $$slots: { default: !0 }
  }), g(n, f), re();
}
var Vc = /* @__PURE__ */ E('<div class="wx-year svelte-uftkmf"> </div>'), Wc = /* @__PURE__ */ E('<div class="wx-years svelte-uftkmf"></div> <div class="wx-buttons svelte-uftkmf"><!></div>', 1);
function jc(n, e) {
  ne(e, !0);
  const t = he("wx-i18n").getRaw().calendar;
  let r = S(e, "value", 15), a = S(e, "current", 15);
  const i = /* @__PURE__ */ B(() => a().getFullYear()), s = /* @__PURE__ */ B(() => {
    const { start: v, end: m } = Ki(o(i)), w = [];
    for (let k = v; k <= m; k += 1)
      w.push(k);
    return w;
  }), l = { click: d };
  function d(v, m) {
    v && (m.stopPropagation(), a().setFullYear(v), a(new Date(a())), e.onshift && e.onshift({})), e.part === "normal" && r(new Date(a())), e.oncancel && e.oncancel();
  }
  function c() {
    const v = new Date(Wi(r(), e.part) || a());
    v.setFullYear(a().getFullYear()), e.onchange && e.onchange(v);
  }
  var f = Wc(), u = V(f);
  Ie(u, 21, () => o(s), it, (v, m, w) => {
    var k = Vc(), p = D(k);
    O(() => {
      J(k, "data-id", o(m)), ve(k, "wx-current", o(i) == o(m)), ve(k, "wx-prev-decade", w === 0), ve(k, "wx-next-decade", w === 11), te(p, o(m));
    }), g(v, k);
  }), Ne(u, (v, m) => Vr(v, m), () => l);
  var h = U(u, 2), _ = D(h);
  Wr(_, {
    onclick: c,
    children: (v, m) => {
      var w = Se();
      O(() => te(w, t.done)), g(v, w);
    },
    $$slots: { default: !0 }
  }), g(n, f), re();
}
const Ca = {
  month: {
    component: Uc,
    next: Jc,
    prev: Zc
  },
  year: {
    component: Gc,
    next: Xc,
    prev: Qc
  },
  duodecade: {
    component: jc,
    next: ed,
    prev: $c
  }
};
function Zc(n) {
  return n = new Date(n), n.setMonth(n.getMonth() - 1), n;
}
function Jc(n) {
  return n = new Date(n), n.setMonth(n.getMonth() + 1), n;
}
function Qc(n) {
  return n = new Date(n), n.setFullYear(n.getFullYear() - 1), n;
}
function Xc(n) {
  return n = new Date(n), n.setFullYear(n.getFullYear() + 1), n;
}
function $c(n) {
  return n = new Date(n), n.setFullYear(n.getFullYear() - 10), n;
}
function ed(n) {
  return n = new Date(n), n.setFullYear(n.getFullYear() + 10), n;
}
function Wi(n, e) {
  let t;
  if (e === "normal") t = n;
  else {
    const { start: r, end: a } = n;
    e === "left" ? t = r : e == "right" ? t = a : t = r && a;
  }
  return t;
}
var td = /* @__PURE__ */ E('<div class="wx-button-item svelte-avh7y"><!></div>'), nd = /* @__PURE__ */ E('<div class="wx-buttons svelte-avh7y"></div>'), rd = /* @__PURE__ */ E('<div><div class="wx-wrap svelte-avh7y"><!> <div><!> <!></div></div></div>');
function Dn(n, e) {
  ne(e, !0);
  const t = he("wx-i18n").getGroup("calendar");
  let r = S(e, "current", 15), a = S(e, "part", 3, "normal"), i = S(e, "markers", 3, null), s = S(e, "buttons", 19, () => ["clear", "today"]), l = ae("month"), d = /* @__PURE__ */ B(() => Array.isArray(s()) ? s() : s() ? ["clear", "today"] : []);
  function c(b, I) {
    b.preventDefault(), e.onchange && e.onchange({ value: I });
  }
  function f() {
    o(l) === "duodecade" ? H(l, "year") : o(l) === "year" && H(l, "month");
  }
  function u(b) {
    const { diff: I } = b;
    if (I === 0) {
      o(l) === "month" ? H(l, "year") : o(l) === "year" && H(l, "duodecade");
      return;
    }
    if (I) {
      const A = Ca[o(l)];
      r(I > 0 ? A.next(r()) : A.prev(r()));
    }
    e.onshift && e.onshift();
  }
  function h(b) {
    H(l, "month"), e.onchange && e.onchange({ select: !0, value: b });
  }
  function _(b) {
    if (b === "done") return -1;
    if (b === "clear") return null;
    if (b === "today") return /* @__PURE__ */ new Date();
  }
  const v = /* @__PURE__ */ B(() => Ca[o(l)].component);
  var m = rd(), w = D(m), k = D(w);
  Nc(k, {
    get date() {
      return r();
    },
    get part() {
      return a();
    },
    get type() {
      return o(l);
    },
    onshift: u
  });
  var p = U(k, 2), x = D(p);
  Ct(x, () => o(v), (b, I) => {
    I(b, {
      get value() {
        return e.value;
      },
      get current() {
        return r();
      },
      set current(A) {
        r(A);
      },
      get part() {
        return a();
      },
      get markers() {
        return i();
      },
      onchange: h,
      oncancel: f,
      onshift: u
    });
  });
  var y = U(x, 2);
  P(y, () => o(l) === "month" && o(d).length > 0, (b) => {
    var I = nd();
    Ie(I, 21, () => o(d), it, (A, M) => {
      var q = td(), K = D(q);
      Wr(K, {
        onclick: (j) => c(j, _(o(M))),
        children: (j, Z) => {
          var G = Se();
          O(() => te(G, t(o(M)))), g(j, G);
        },
        $$slots: { default: !0 }
      }), g(A, q);
    }), g(b, I);
  }), O(() => ye(m, `wx-calendar ${(a() !== "normal" && a() !== "both" ? "wx-part" : "") ?? ""} svelte-avh7y`)), g(n, m), re();
}
function ad(n, e) {
  ne(e, !0);
  let t = S(e, "value", 15), r = S(e, "current", 15), a = S(e, "markers", 3, null), i = S(e, "buttons", 19, () => ["clear", "today"]);
  function s(d) {
    (!r() || d) && r(t() ? new Date(t()) : /* @__PURE__ */ new Date()), r().setDate(1);
  }
  s(t());
  function l(d) {
    const c = d.value;
    c ? (t(new Date(c)), s(!0)) : t(null), e.onchange && e.onchange({ value: t() });
  }
  Tt(n, {
    children: (d, c) => {
      Dn(d, {
        get value() {
          return t();
        },
        get current() {
          return r();
        },
        set current(f) {
          r(f);
        },
        get markers() {
          return a();
        },
        get buttons() {
          return i();
        },
        onchange: l
      });
    },
    $$slots: { default: !0 }
  }), re();
}
var id = (n, e) => H(e, !0), od = /* @__PURE__ */ E('<div class="wx-datepicker svelte-1k3rk87"><!> <!></div>');
function sd(n, e) {
  ne(e, !0);
  let t = S(e, "value", 15), r = S(e, "id", 19, ot), a = S(e, "disabled", 3, !1), i = S(e, "error", 3, !1), s = S(e, "width", 3, "unset"), l = S(e, "align", 3, "start"), d = S(e, "placeholder", 3, ""), c = S(e, "format", 3, ""), f = S(e, "buttons", 19, () => ["clear", "today"]), u = S(e, "css", 3, ""), h = S(e, "title", 3, ""), _ = S(e, "editable", 3, !1), v = S(e, "clear", 3, !1);
  const { calendar: m, formats: w } = he("wx-i18n").getRaw(), k = c() || w.dateFormat;
  let p = typeof k == "function" ? k : En(k, m), x = ae(void 0);
  function y() {
    H(x, !1);
  }
  function b(Z) {
    const G = Z === t() || Z && t() && Z.valueOf() === t().valueOf() || !Z && !t();
    t(Z), G || e.onchange && e.onchange({ value: t() }), setTimeout(y, 1);
  }
  const I = /* @__PURE__ */ B(() => t() ? p(t()) : "");
  function A({ value: Z, input: G }) {
    if (!_() && !v() || G) return;
    let R = typeof _() == "function" ? _()(Z) : Z ? new Date(Z) : null;
    R = isNaN(R) ? t() || null : R || null, b(R);
  }
  var M = od();
  He("scroll", Fn, y), M.__click = [id, x];
  var q = D(M), K = /* @__PURE__ */ B(() => !_());
  tr(q, {
    get css() {
      return u();
    },
    get title() {
      return h();
    },
    get value() {
      return o(I);
    },
    get id() {
      return r();
    },
    get readonly() {
      return o(K);
    },
    get disabled() {
      return a();
    },
    get error() {
      return i();
    },
    get placeholder() {
      return d();
    },
    oninput: y,
    onchange: A,
    icon: "wxi-calendar",
    inputStyle: "cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);",
    get clear() {
      return v();
    }
  });
  var j = U(q, 2);
  P(j, () => o(x) && !a(), (Z) => {
    var G = /* @__PURE__ */ B(() => !!l());
    At(Z, {
      oncancel: y,
      get width() {
        return s();
      },
      get align() {
        return l();
      },
      get autoFit() {
        return o(G);
      },
      children: (R, T) => {
        ad(R, {
          get buttons() {
            return f();
          },
          get value() {
            return t();
          },
          onchange: (L) => b(L.value)
        });
      },
      $$slots: { default: !0 }
    });
  }), g(n, M), re();
}
me(["click"]);
function ld(n, e) {
  let t = S(e, "value", 15), r = /* @__PURE__ */ gn(e, ["$$slots", "$$events", "$$legacy", "value"]);
  Tt(n, {
    children: (a, i) => {
      sd(a, We(
        {
          get value() {
            return t();
          },
          set value(s) {
            t(s);
          }
        },
        () => r
      ));
    },
    $$slots: { default: !0 }
  });
}
var cd = /* @__PURE__ */ E('<div class="wx-rangecalendar svelte-wlbsu6"><div class="wx-half svelte-wlbsu6"><!></div> <div class="wx-half svelte-wlbsu6"><!></div></div>');
function dd(n, e) {
  ne(e, !0);
  let t = S(e, "start", 15), r = S(e, "end", 15), a = S(e, "months", 3, 2), i = S(e, "markers", 3, null), s = S(e, "buttons", 19, () => ["clear", "today"]);
  function l(m, w, k) {
    const p = new Date(m);
    return p.setMonth(p.getMonth() + w), p;
  }
  let d = ae(void 0), c = ae(void 0);
  fi(() => {
    t(), e.current, ke(() => {
      o(d) || f(t() ? new Date(t()) : e.current || /* @__PURE__ */ new Date());
    });
  });
  function f(m) {
    H(d, Q(m)), o(d).setDate(1), o(d) && H(c, Q(l(o(d), 1)));
  }
  function u(m) {
    H(c, Q(m)), o(c).setDate(1), o(c) && H(d, Q(l(o(c), -1)));
  }
  function h(m) {
    v(m), t() && f(new Date(t()));
  }
  function _(m) {
    v(m), r() && u(new Date(r()));
  }
  function v(m) {
    const w = m.value, k = w === -1;
    k || (m.select ? !t() || r() ? (t(w), r(null)) : t() > w ? (r(t()), t(w)) : r(w) : w ? (t(new Date(w)), r(new Date(w))) : t(r(null))), (k || !s().includes("done")) && e.onchange && e.onchange({ start: t(), end: r() });
  }
  Tt(n, {
    children: (m, w) => {
      var k = $(), p = V(k);
      P(
        p,
        () => a() == 1,
        (x) => {
          var y = /* @__PURE__ */ B(() => ({ start: t(), end: r() }));
          Dn(x, {
            get value() {
              return o(y);
            },
            get current() {
              return o(d);
            },
            set current(b) {
              H(d, Q(b));
            },
            get markers() {
              return i();
            },
            get buttons() {
              return s();
            },
            part: "both",
            onchange: h
          });
        },
        (x) => {
          var y = cd(), b = D(y), I = D(b), A = /* @__PURE__ */ B(() => ({ start: t(), end: r() }));
          Dn(I, {
            get value() {
              return o(A);
            },
            get current() {
              return o(d);
            },
            set current(j) {
              H(d, Q(j));
            },
            get markers() {
              return i();
            },
            buttons: !1,
            part: "left",
            onshift: () => f(o(d)),
            onchange: h
          });
          var M = U(b, 2), q = D(M), K = /* @__PURE__ */ B(() => ({ start: t(), end: r() }));
          Dn(q, {
            get value() {
              return o(K);
            },
            get current() {
              return o(c);
            },
            set current(j) {
              H(c, Q(j));
            },
            get markers() {
              return i();
            },
            get buttons() {
              return s();
            },
            part: "right",
            onshift: () => u(o(c)),
            onchange: _
          }), g(x, y);
        }
      ), g(m, k);
    },
    $$slots: { default: !0 }
  }), re();
}
me(["click"]);
var ud = /* @__PURE__ */ E('<i role="img"><!></i>'), fd = /* @__PURE__ */ E("<i></i>");
function Me(n, e) {
  ne(e, !0);
  let t = S(e, "css", 3, ""), r = S(e, "title", 3, "");
  var a = $(), i = V(a);
  P(
    i,
    () => e.children,
    (s) => {
      var l = ud();
      l.__click = function(...c) {
        e.onclick?.apply(this, c);
      };
      var d = D(l);
      Ee(d, () => e.children), O(() => {
        J(l, "title", r()), ye(l, `wx-icon ${t() ?? ""} svelte-12ezr0r`);
      }), g(s, l);
    },
    (s) => {
      var l = fd();
      l.__click = function(...d) {
        e.onclick?.apply(this, d);
      }, O(() => {
        J(l, "title", r()), ye(l, `wx-icon ${t() ?? ""} svelte-12ezr0r`);
      }), g(s, l);
    }
  ), g(n, a), re();
}
me(["click"]);
var vd = (n, e, t) => e(o(t).id, n), hd = /* @__PURE__ */ E('<i class="wx-icon wxi-close svelte-1xr1yzt"></i>'), md = /* @__PURE__ */ E('<div class="wx-tag svelte-1xr1yzt"><!> <!></div>'), gd = /* @__PURE__ */ E("<!> <!>", 1), _d = /* @__PURE__ */ E('<div class="wx-multicombo svelte-1xr1yzt"><div class="wx-wrapper svelte-1xr1yzt"><div class="wx-tags svelte-1xr1yzt"></div> <div class="wx-select svelte-1xr1yzt"><input type="text" class="svelte-1xr1yzt"> <i class="wx-icon wxi-angle-down svelte-1xr1yzt"></i></div></div> <!></div>');
function wd(n, e) {
  ne(e, !0);
  let t = S(e, "id", 19, ot), r = S(e, "value", 31, () => Q([])), a = S(e, "options", 19, () => []), i = S(e, "textOptions", 3, null), s = S(e, "textField", 3, "label"), l = S(e, "placeholder", 3, ""), d = S(e, "title", 3, ""), c = S(e, "disabled", 3, !1), f = S(e, "error", 3, !1), u = S(e, "checkboxes", 3, !1), h = ae(""), _ = /* @__PURE__ */ B(() => r() ? (i() || a()).filter((T) => r().includes(T.id)) : []), v = /* @__PURE__ */ B(() => {
    const T = a();
    return o(h) ? T.filter((L) => L[s()].toLowerCase().includes(o(h).toLowerCase())) : T;
  }), m = ae(!1), w = ae(void 0), k = null, p = null;
  function x(T) {
    k = T.navigate, p = T.keydown;
  }
  function y() {
    o(v).length ? k(0) : k(null);
  }
  function b(T) {
    const { id: L } = T;
    if (L) {
      let z;
      r() ? r().includes(L) ? z = r().filter((N) => N !== L) : z = [...r(), L] : z = [L], r(z), e.onchange && e.onchange({ value: r() }), o(w).focus();
    }
  }
  function I(T, L) {
    L && L.stopPropagation(), r(r().filter((z) => z !== T)), e.onchange && e.onchange({ value: r() });
  }
  const A = () => r() && r().length ? o(v).findIndex((T) => T.id === r()[0]) : 0;
  function M() {
    c() || (o(w).focus(), k(A()));
  }
  var q = _d();
  q.__click = M, q.__keydown = (T) => p(T, A());
  var K = D(q), j = D(K);
  Ie(j, 21, () => o(_), (T) => T.id, (T, L) => {
    var z = md(), N = D(z);
    P(
      N,
      () => e.children,
      (F) => {
        var Y = $(), W = V(Y);
        Ee(W, () => e.children, () => ({ option: o(L) })), g(F, Y);
      },
      (F) => {
        var Y = Se();
        O(() => te(Y, o(L)[s()])), g(F, Y);
      }
    );
    var C = U(N, 2);
    P(C, () => !c(), (F) => {
      var Y = hd();
      Y.__click = [vd, I, L], g(F, Y);
    }), g(T, z);
  });
  var Z = U(j, 2), G = D(Z);
  G.__input = y, Te(G, (T) => H(w, T), () => o(w));
  var R = U(K, 2);
  P(R, () => !c(), (T) => {
    Vi(T, {
      get items() {
        return o(v);
      },
      onready: x,
      onselect: b,
      children: (z, N) => {
        let C = () => N?.().option;
        var F = gd(), Y = V(F);
        P(Y, u, (ee) => {
          var ie = /* @__PURE__ */ B(() => r() && r().includes(C().id));
          Zl(ee, {
            style: "margin-right: 8px; pointer-events: none;",
            get name() {
              return C().id;
            },
            get value() {
              return o(ie);
            }
          });
        });
        var W = U(Y, 2);
        P(
          W,
          () => e.children,
          (ee) => {
            e.children(ee, () => ({ option: C() }));
          },
          (ee) => {
            var ie = Se();
            O(() => te(ie, C()[s()])), g(ee, ie);
          }
        ), g(z, F);
      },
      $$slots: { default: !0 }
    });
  }), O(() => {
    J(q, "title", d()), ve(q, "wx-error", f()), ve(q, "wx-disabled", c()), ve(q, "wx-not-empty", o(_).length), ve(q, "wx-focus", o(m) && !c()), J(G, "id", t()), J(G, "placeholder", l()), G.disabled = c();
  }), He("focus", G, () => H(m, !0)), He("blur", G, () => H(m, !1)), nn(G, () => o(h), (T) => H(h, T)), g(n, q), re();
}
me(["click", "keydown", "input"]);
me(["input", "click"]);
me(["change"]);
me(["click", "keydown"]);
me(["click"]);
function yd(n, e, t) {
  e(""), t.onchange && t.onchange({ value: e() });
}
function xd(n, e, t) {
  e.onchange && e.onchange({ value: t() });
}
var bd = /* @__PURE__ */ E('<option class="svelte-7lms0u"> </option>'), pd = /* @__PURE__ */ E('<div class="wx-placeholder svelte-7lms0u"> </div>'), kd = /* @__PURE__ */ E('<i class="wx-icon wxi-close svelte-7lms0u"></i>'), Sd = /* @__PURE__ */ E('<i class="wx-icon wxi-angle-down svelte-7lms0u"></i>'), Id = /* @__PURE__ */ E('<div class="wx-select svelte-7lms0u"><select class="svelte-7lms0u"></select> <!> <!></div>');
function ji(n, e) {
  ne(e, !0);
  let t = S(e, "value", 15, ""), r = S(e, "options", 19, () => []), a = S(e, "placeholder", 3, ""), i = S(e, "title", 3, ""), s = S(e, "disabled", 3, !1), l = S(e, "error", 3, !1), d = S(e, "textField", 3, "label"), c = S(e, "clear", 3, !1), f = S(e, "id", 19, ot);
  var u = Id(), h = D(u);
  h.__change = [xd, e, t], Ie(h, 21, r, (m) => m.id, (m, w) => {
    var k = bd(), p = {}, x = D(k);
    O(() => {
      p !== (p = o(w).id) && (k.value = (k.__value = o(w).id) == null ? "" : o(w).id), te(x, o(w)[d()]);
    }), g(m, k);
  });
  var _ = U(h, 2);
  P(_, () => !t() && t() !== 0, (m) => {
    var w = pd(), k = D(w);
    O(() => te(k, a())), g(m, w);
  });
  var v = U(_, 2);
  P(
    v,
    () => c() && !s() && t(),
    (m) => {
      var w = kd();
      w.__click = [yd, t, e], g(m, w);
    },
    (m) => {
      var w = Sd();
      g(m, w);
    }
  ), O(() => {
    J(h, "id", f()), h.disabled = s(), J(h, "title", i()), ve(h, "wx-error", l());
  }), ws(h, t), g(n, u), re();
}
me(["change", "click"]);
function Ed({ target: n }, e, t) {
  e(n.value * 1), t.onchange && t.onchange({ value: e() });
}
var Dd = /* @__PURE__ */ E('<label class="svelte-vxce8u"> </label>'), Cd = /* @__PURE__ */ E('<div class="wx-slider svelte-vxce8u"><!> <div class="svelte-vxce8u"><input type="range" class="svelte-vxce8u"></div></div>');
function Md(n, e) {
  ne(e, !0);
  let t = S(e, "id", 19, ot), r = S(e, "label", 3, ""), a = S(e, "width", 3, ""), i = S(e, "min", 3, 0), s = S(e, "max", 3, 100), l = S(e, "value", 15, 0), d = S(e, "step", 3, 1), c = S(e, "title", 3, ""), f = S(e, "disabled", 3, !1), u = /* @__PURE__ */ B(() => () => f() ? "" : `background: linear-gradient(90deg, var(--wx-slider-primary) 0% ${o(h)}, var(--wx-slider-background) ${o(h)} 100%);`), h = /* @__PURE__ */ B(() => (l() - i()) / (s() - i()) * 100 + "%"), _ = l();
  function v({ target: y }) {
    l(y.value || 0), _ !== l() && (e.onchange && e.onchange({ value: l(), previous: _, input: !0 }), _ = l());
  }
  var m = Cd(), w = D(m);
  P(w, r, (y) => {
    var b = Dd(), I = D(b);
    O(() => {
      J(b, "for", t()), te(I, r());
    }), g(y, b);
  });
  var k = U(w, 2), p = D(k);
  p.__input = v, p.__change = [Ed, l, e];
  const x = /* @__PURE__ */ B(() => o(u)());
  O(() => {
    J(m, "style", a() ? `width: ${a()}` : ""), J(m, "title", c()), J(p, "id", t()), J(p, "min", i()), J(p, "max", s()), J(p, "step", d()), p.disabled = f(), Ht(p, l()), J(p, "style", o(x));
  }), g(n, m), re();
}
me(["input", "change"]);
me(["change"]);
me(["click"]);
me(["click", "input"]);
const Ad = (n) => n;
function jr(n, { delay: e = 0, duration: t = 400, easing: r = Ad } = {}) {
  const a = +getComputedStyle(n).opacity;
  return {
    delay: e,
    duration: t,
    easing: r,
    css: (i) => `opacity: ${i * a}`
  };
}
function Td(n, e) {
  e().remove && e().remove();
}
var Pd = /* @__PURE__ */ E('<div role="status" aria-live="polite"><div class="wx-text svelte-764ko7"> </div> <div class="wx-button svelte-764ko7"><i class="wxi-close svelte-764ko7"></i></div></div>');
function Rd(n, e) {
  ne(e, !0);
  let t = S(e, "notice", 19, () => ({}));
  var r = Pd(), a = D(r), i = D(a), s = U(a, 2), l = D(s);
  l.__click = [Td, t], O(() => {
    ye(r, `wx-notice wx-${(t().type ? t().type : "") ?? ""} svelte-764ko7`), te(i, t().text);
  }), Ur(3, r, () => jr), g(n, r), re();
}
me(["click"]);
var Ld = /* @__PURE__ */ E('<div class="wx-notices svelte-ervf1h"></div>');
function Fd(n, e) {
  let t = S(e, "data", 19, () => []);
  var r = Ld();
  Ie(r, 21, t, (a) => a.id, (a, i) => {
    Rd(a, {
      get notice() {
        return o(i);
      }
    });
  }), g(n, r);
}
function Od(n, e) {
  switch (n.code) {
    case "Enter": {
      const t = n.target.tagName;
      if (t === "TEXTAREA" || t === "BUTTON") return;
      e.onconfirm && e.onconfirm({ ev: n });
      break;
    }
    case "Escape":
      e.oncancel && e.oncancel({ ev: n });
      break;
  }
}
var Nd = /* @__PURE__ */ E('<div class="wx-header svelte-at32q2"> </div>'), Bd = /* @__PURE__ */ E('<div class="wx-button svelte-at32q2"><!></div>'), zd = /* @__PURE__ */ E('<div class="wx-buttons svelte-at32q2"></div>'), Hd = /* @__PURE__ */ E('<div class="wx-modal svelte-at32q2" tabindex="0"><div class="wx-window svelte-at32q2"><!> <div><!></div> <!></div></div>');
function qd(n, e) {
  ne(e, !0);
  const t = he("wx-i18n").getGroup("core"), r = S(e, "title", 3, ""), a = S(e, "buttons", 19, () => ["cancel", "ok"]);
  function i(_, v) {
    const m = { ev: _, button: v };
    v === "cancel" ? e.oncancel && e.oncancel(m) : e.onconfirm && e.onconfirm(m);
  }
  let s;
  vt(() => {
    s.focus();
  });
  var l = Hd();
  l.__keydown = [Od, e];
  var d = D(l), c = D(d);
  P(
    c,
    () => e.header,
    (_) => {
      var v = $(), m = V(v);
      Ee(m, () => e.header), g(_, v);
    },
    (_) => {
      var v = $(), m = V(v);
      P(
        m,
        r,
        (w) => {
          var k = Nd(), p = D(k);
          O(() => te(p, r())), g(w, k);
        },
        null,
        !0
      ), g(_, v);
    }
  );
  var f = U(c, 2), u = D(f);
  Ee(u, () => e.children);
  var h = U(f, 2);
  P(
    h,
    () => e.footer,
    (_) => {
      var v = $(), m = V(v);
      Ee(m, () => e.footer), g(_, v);
    },
    (_) => {
      var v = zd();
      Ie(v, 21, a, it, (m, w) => {
        var k = Bd(), p = D(k), x = /* @__PURE__ */ B(() => `block ${o(w) === "ok" ? "primary" : "secondary"}`);
        Re(p, {
          get type() {
            return o(x);
          },
          onclick: (y) => i(y, o(w)),
          children: (y, b) => {
            var I = Se();
            O(() => te(I, t(o(w)))), g(y, I);
          },
          $$slots: { default: !0 }
        }), g(m, k);
      }), g(_, v);
    }
  ), Te(l, (_) => s = _, () => s), Ur(3, l, () => jr, () => ({ duration: 100 })), g(n, l), re();
}
me(["keydown"]);
function Ud(n, e) {
  let t = /* @__PURE__ */ gn(e, ["$$slots", "$$events", "$$legacy"]);
  Tt(n, {
    children: (r, a) => {
      qd(r, We(() => t));
    },
    $$slots: { default: !0 }
  });
}
var Yd = /* @__PURE__ */ E("<!> <!> <!>", 1);
function Kd(n, e) {
  ne(e, !0);
  let t = ae(null);
  function r(f) {
    return H(t, Q({ ...f })), new Promise((u, h) => {
      o(t).resolve = (_) => {
        H(t, null), u(_);
      }, o(t).reject = (_) => {
        H(t, null), h(_);
      };
    });
  }
  let a = ae(Q([]));
  function i(f) {
    f = { ...f }, f.id = f.id || ot(), f.remove = () => H(a, Q(o(a).filter((u) => u.id !== f.id))), f.expire != -1 && setTimeout(f.remove, f.expire || 5100), H(a, Q([...o(a), f]));
  }
  wt("wx-helpers", { showNotice: i, showModal: r });
  var s = Yd(), l = V(s);
  Ee(l, () => e.children ?? De);
  var d = U(l, 2);
  P(d, () => o(t), (f) => {
    Ud(f, {
      get title() {
        return o(t).title;
      },
      get buttons() {
        return o(t).buttons;
      },
      get onconfirm() {
        return o(t).resolve;
      },
      get oncancel() {
        return o(t).reject;
      },
      children: (u, h) => {
        var _ = Se();
        O(() => te(_, o(t).message)), g(u, _);
      },
      $$slots: { default: !0 }
    });
  });
  var c = U(d, 2);
  Fd(c, {
    get data() {
      return o(a);
    }
  }), g(n, s), re();
}
var Gd = /* @__PURE__ */ E('<label class="svelte-eqvtjk"> </label>'), Vd = /* @__PURE__ */ E("<div><!> <div><!></div></div>");
function je(n, e) {
  ne(e, !0);
  let t = S(e, "label", 3, ""), r = S(e, "position", 3, ""), a = S(e, "width", 3, ""), i = S(e, "error", 3, !1), s = S(e, "type", 3, ""), l = S(e, "required", 3, !1), d = ot();
  var c = Vd(), f = D(c);
  P(f, t, (_) => {
    var v = Gd();
    J(v, "for", d);
    var m = D(v);
    O(() => te(m, t())), g(_, v);
  });
  var u = U(f, 2), h = D(u);
  Ee(h, () => e.children ?? De, () => ({ id: d })), O(() => {
    ye(c, `wx-field wx-${r() ?? ""} svelte-eqvtjk`), J(c, "style", a() ? `width: ${a()}` : ""), ve(c, "wx-error", i()), ve(c, "wx-required", l()), ye(u, `wx-field-control wx-${s() ?? ""} svelte-eqvtjk`);
  }), g(n, c), re();
}
me(["click"]);
var Wd = /* @__PURE__ */ E('<div class="wx-modal svelte-1ki3q24"><div class="wx-window svelte-1ki3q24"><!></div></div>');
function jd(n, e) {
  ne(e, !0);
  var t = Wd(), r = D(t), a = D(r);
  Ee(a, () => e.children ?? De), Ur(3, t, () => jr, () => ({ duration: 100 })), g(n, t), re();
}
var Zd = /* @__PURE__ */ E('<div class="wx-portal svelte-1dixdmq"><div><!></div></div>');
function Zr(n, e) {
  ne(e, !0);
  let t = null, r = S(e, "theme", 15, ""), a = [];
  const i = (f) => {
    a && a.push(f);
  };
  r() === "" && r(he("wx-theme"));
  function s(f) {
    const u = Ft.getTopNode(f);
    for (; f !== u && !f.getAttribute("data-wx-portal-root"); )
      f = f.parentNode;
    return f;
  }
  vt(() => {
    (e.target || s(t)).appendChild(t), a && a.forEach((u) => u());
  }), Kr(() => {
    t && t.parentNode && t.parentNode.removeChild(t);
  });
  var l = Zd(), d = D(l), c = D(d);
  return Ee(c, () => e.children ?? De, () => ({ mount: i })), Te(d, (f) => t = f, () => t), O(() => ye(d, `wx-${r() ?? ""}-theme svelte-1dixdmq`)), g(n, l), re({ mount: i });
}
function Jd(n) {
  var e = $(), t = V(e);
  Xn(
    t,
    () => `<style>
@font-face {
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
src: local(''),
    url('https://cdn.svar.dev/fonts/roboto/regular.woff2') format('woff2'),
    url('https://cdn.svar.dev/fonts/roboto/regular.woff') format('woff');
}
@font-face {
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
src: local(''),
    url('https://cdn.svar.dev/fonts/roboto/500.woff2') format('woff2'),
    url('https://cdn.svar.dev/fonts/roboto/500.woff') format('woff');
}
</style>`
  ), g(n, e);
}
var Qd = /* @__PURE__ */ E('<link rel="preconnect" href="https://cdn.svar.dev" crossorigin=""> <!> <link rel="stylesheet" href="https://cdn.svar.dev/fonts/wxi/wx-icons.css">', 1), Xd = /* @__PURE__ */ E('<div class="wx-material-theme" style="height:100%"><!></div>');
function Ma(n, e) {
  ne(e, !0);
  let t = S(e, "fonts", 3, !0);
  wt("wx-theme", "material");
  var r = $();
  Hr((i) => {
    var s = $(), l = V(s);
    P(l, t, (d) => {
      var c = Qd(), f = U(V(c), 2);
      Jd(f), g(d, c);
    }), g(i, s);
  });
  var a = V(r);
  P(a, () => e.children, (i) => {
    var s = Xd(), l = D(s);
    Ee(l, () => e.children), g(i, s);
  }), g(n, r), re();
}
function Zi(n) {
  var e = $(), t = V(e);
  Xn(
    t,
    () => `<style>
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 500;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/500.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/500.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/regular.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/regular.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/600.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/600.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/700.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/700.woff') format('woff');
}
  </style>`
  ), g(n, e);
}
var $d = /* @__PURE__ */ E('<link rel="preconnect" href="https://cdn.svar.dev" crossorigin=""> <!> <link rel="stylesheet" href="https://cdn.svar.dev/fonts/wxi/wx-icons.css">', 1), eu = /* @__PURE__ */ E('<div class="wx-willow-theme" style="height:100%"><!></div>');
function Aa(n, e) {
  ne(e, !0);
  let t = S(e, "fonts", 3, !0);
  wt("wx-theme", "willow");
  var r = $();
  Hr((i) => {
    var s = $(), l = V(s);
    P(l, t, (d) => {
      var c = $d(), f = U(V(c), 2);
      Zi(f), g(d, c);
    }), g(i, s);
  });
  var a = V(r);
  P(a, () => e.children, (i) => {
    var s = eu(), l = D(s);
    Ee(l, () => e.children), g(i, s);
  }), g(n, r), re();
}
var tu = /* @__PURE__ */ E('<link rel="preconnect" href="https://cdn.svar.dev" crossorigin=""> <!> <link rel="stylesheet" href="https://cdn.svar.dev/fonts/wxi/wx-icons.css">', 1), nu = /* @__PURE__ */ E('<div class="wx-willow-dark-theme" style="height:100%"><!></div>');
function Ta(n, e) {
  ne(e, !0);
  let t = S(e, "fonts", 3, !0);
  wt("wx-theme", "willow-dark");
  var r = $();
  Hr((i) => {
    var s = $(), l = V(s);
    P(l, t, (d) => {
      var c = tu(), f = U(V(c), 2);
      Zi(f), g(d, c);
    }), g(i, s);
  });
  var a = V(r);
  P(a, () => e.children, (i) => {
    var s = nu(), l = D(s);
    Ee(l, () => e.children), g(i, s);
  }), g(n, r), re();
}
var ru = Array.isArray, au = Object.defineProperty;
const sr = () => {
};
function iu(n) {
  for (var e = 0; e < n.length; e++)
    n[e]();
}
let pr = !1, kr = [];
function ou() {
  pr = !1;
  const n = kr.slice();
  kr = [], iu(n);
}
function su(n) {
  pr || (pr = !0, queueMicrotask(ou)), kr.push(n);
}
function lu(n, e) {
  return n != n ? e == e : n !== e || n !== null && typeof n == "object" || typeof n == "function";
}
function cu(n) {
  try {
    return n();
  } finally {
  }
}
function du(n, e, t, r) {
  function a(i) {
    if (r.capture || fu.call(e, i), !i.cancelBubble)
      return cu(() => t.call(this, i));
  }
  return n.startsWith("pointer") || n.startsWith("touch") || n === "wheel" ? su(() => {
    e.addEventListener(n, a, r);
  }) : e.addEventListener(n, a, r), a;
}
function uu(n, e, t, r = {}) {
  var a = du(e, n, t, r);
  return () => {
    n.removeEventListener(e, a, r);
  };
}
function fu(n) {
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), r = n.type, a = n.composedPath?.() || [], i = (
    /** @type {null | Element} */
    a[0] || n.target
  ), s = 0, l = n.__root;
  if (l) {
    var d = a.indexOf(l);
    if (d !== -1 && (e === document || e === /** @type {any} */
    window)) {
      n.__root = e;
      return;
    }
    var c = a.indexOf(e);
    if (c === -1)
      return;
    d <= c && (s = d);
  }
  if (i = /** @type {Element} */
  a[s] || n.target, i !== e) {
    au(n, "currentTarget", {
      configurable: !0,
      get() {
        return i || t;
      }
    });
    try {
      for (var f, u = []; i !== null; ) {
        var h = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var _ = i["__" + r];
          if (_ !== void 0 && !/** @type {any} */
          i.disabled)
            if (ru(_)) {
              var [v, ...m] = _;
              v.apply(i, [n, ...m]);
            } else
              _.call(i, n);
        } catch (w) {
          f ? u.push(w) : f = w;
        }
        if (n.cancelBubble || h === e || h === null)
          break;
        i = h;
      }
      if (f) {
        for (let w of u)
          queueMicrotask(() => {
            throw w;
          });
        throw f;
      }
    } finally {
      n.__root = e, delete n.currentTarget;
    }
  }
}
const Ut = [];
function vu(n, e = sr) {
  let t = null;
  const r = /* @__PURE__ */ new Set();
  function a(l) {
    if (lu(n, l) && (n = l, t)) {
      const d = !Ut.length;
      for (const c of r)
        c[1](), Ut.push(c, n);
      if (d) {
        for (let c = 0; c < Ut.length; c += 2)
          Ut[c][0](Ut[c + 1]);
        Ut.length = 0;
      }
    }
  }
  function i(l) {
    a(l(
      /** @type {T} */
      n
    ));
  }
  function s(l, d = sr) {
    const c = [l, d];
    return r.add(c), r.size === 1 && (t = e(a, i) || sr), l(
      /** @type {T} */
      n
    ), () => {
      r.delete(c), r.size === 0 && t && (t(), t = null);
    };
  }
  return { set: a, update: i, subscribe: s };
}
(/* @__PURE__ */ new Date()).valueOf();
function hu(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t], a = e[t];
    if (!Nn(r, a)) return !1;
  }
  return !0;
}
function Nn(n, e) {
  if (typeof n == "number" || typeof n == "string" || typeof n == "boolean" || n === null) return n === e;
  if (typeof n != typeof e || (n === null || e === null) && n !== e || n instanceof Date && e instanceof Date && n.getTime() !== e.getTime())
    return !1;
  if (typeof n == "object")
    if (Array.isArray(n) && Array.isArray(e)) {
      if (n.length !== e.length) return !1;
      for (let r = n.length - 1; r >= 0; r--)
        if (!Nn(n[r], e[r])) return !1;
      return !0;
    } else
      return hu(n, e);
  return n === e;
}
function Sr(n) {
  if (typeof n != "object" || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map(Sr);
  const e = {};
  for (const t in n)
    e[t] = Sr(n[t]);
  return e;
}
function pn(n, e) {
  return e ? Sr(n) : { ...n };
}
function mu(n, e, t) {
  const r = t && t.deepCopy;
  let a = !1, i = null;
  const s = vu(n), { set: l } = s;
  let d = pn(n, r);
  return s.set = function(c) {
    Nn(d, c) || (d = pn(c, r), l(c));
  }, s.update = function(c) {
    const f = c(pn(d, r));
    Nn(d, f) || (d = pn(f, r), l(f));
  }, s.reset = function(c) {
    a = !1, d = {}, s.set(c);
  }, s.subscribe((c) => {
    a ? c && (!t || !t.debounce ? e(c) : (clearTimeout(i), i = setTimeout(() => e(c), t.debounce))) : a = !0;
  }), s;
}
const gu = {
  addEvent: uu
};
Pl(gu);
const Yt = [];
function Jr(n, e = De) {
  let t = null;
  const r = /* @__PURE__ */ new Set();
  function a(l) {
    if (Gn(n, l) && (n = l, t)) {
      const d = !Yt.length;
      for (const c of r)
        c[1](), Yt.push(c, n);
      if (d) {
        for (let c = 0; c < Yt.length; c += 2)
          Yt[c][0](Yt[c + 1]);
        Yt.length = 0;
      }
    }
  }
  function i(l) {
    a(l(
      /** @type {T} */
      n
    ));
  }
  function s(l, d = De) {
    const c = [l, d];
    return r.add(c), r.size === 1 && (t = e(a, i) || De), l(
      /** @type {T} */
      n
    ), () => {
      r.delete(c), r.size === 0 && t && (t(), t = null);
    };
  }
  return { set: a, update: i, subscribe: s };
}
let Ji = (/* @__PURE__ */ new Date()).valueOf();
const Qr = () => Ji++;
function Qt() {
  return "temp://" + Ji++;
}
const Qi = 2;
class _u {
  constructor(e) {
    e && (this._writable = e.writable, this._async = e.async), this._values = {}, this._state = {};
  }
  setState(e, t = 0) {
    const r = {};
    return this._wrapProperties(e, this._state, this._values, "", r, t), r;
  }
  getState() {
    return this._values;
  }
  getReactive() {
    return this._state;
  }
  _wrapProperties(e, t, r, a, i, s) {
    for (const l in e) {
      const d = t[l], c = r[l], f = e[l];
      if (d && (c === f && typeof f != "object" || f instanceof Date && c instanceof Date && c.getTime() === f.getTime())) continue;
      const u = a + (a ? "." : "") + l;
      d ? (d.__parse(f, u, i, s) && (r[l] = f), s & Qi ? i[u] = d.__trigger : d.__trigger()) : (f && f.__reactive ? t[l] = this._wrapNested(f, f, u, i) : t[l] = this._wrapWritable(f), r[l] = f), i[u] = i[u] || null;
    }
  }
  _wrapNested(e, t, r, a) {
    const i = this._wrapWritable(e);
    return this._wrapProperties(e, i, t, r, a, 0), i.__parse = (s, l, d, c) => (this._wrapProperties(s, i, t, l, d, c), !1), i;
  }
  _wrapWritable(e) {
    const t = [], r = function() {
      for (let a = 0; a < t.length; a++) t[a](e);
    };
    return { subscribe: (a) => (t.push(a), this._async ? setTimeout(a, 1, e) : a(e), () => {
      const i = t.indexOf(a);
      i >= 0 && t.splice(i, 1);
    }), __trigger: () => {
      t.length && (this._async ? setTimeout(r, 1) : r());
    }, __parse: function(a) {
      return e = a, !0;
    } };
  }
}
class wu {
  constructor(e, t, r, a) {
    typeof e == "function" ? this._setter = e : this._setter = e.setState.bind(e), this._routes = t, this._parsers = r, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((i) => {
      i.in.forEach((s) => {
        const l = this._triggers.get(s) || [];
        l.push(i), this._triggers.set(s, l);
      }), i.out.forEach((s) => {
        const l = this._sources.get(s) || {};
        i.in.forEach((d) => l[d] = !0), this._sources.set(s, l);
      });
    }), this._routes.forEach((i) => {
      i.length = Math.max(...i.in.map((s) => Xi(s, this._sources, 1)));
    }), this._bus = a;
  }
  init(e) {
    const t = {};
    for (const r in e) if (this._prev[r] !== e[r]) {
      const a = this._parsers[r];
      t[r] = a ? a(e[r]) : e[r];
    }
    this._prev = this._prev ? { ...this._prev, ...e } : { ...e }, this.setState(t), this._bus && this._bus.exec("init-state", t);
  }
  setStateAsync(e) {
    const t = this._setter(e, Qi);
    return this._async ? Object.assign(this._async.signals, t) : this._async = { signals: t, timer: setTimeout(this._applyState.bind(this), 1) }, t;
  }
  _applyState() {
    const e = this._async;
    if (e) {
      this._async = null, this._triggerUpdates(e.signals, []);
      for (const t in e.signals) {
        const r = e.signals[t];
        r && r();
      }
    }
  }
  setState(e, t = []) {
    const r = this._setter(e);
    return this._triggerUpdates(r, t), r;
  }
  _triggerUpdates(e, t) {
    const r = Object.keys(e), a = !t.length;
    t = t || [];
    for (let i = 0; i < r.length; i++) {
      const s = r[i], l = this._triggers.get(s);
      l && l.forEach((d) => {
        t.indexOf(d) == -1 && t.push(d);
      });
    }
    a && this._execNext(t);
  }
  _execNext(e) {
    for (; e.length; ) {
      e.sort((r, a) => r.length < a.length ? 1 : -1);
      const t = e[e.length - 1];
      e.splice(e.length - 1), t.exec(e);
    }
  }
}
function Xi(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const a = Object.keys(r).map((i) => Xi(i, e, t + 1));
  return Math.max(...a);
}
class Pa {
  constructor() {
    this._nextHandler = null, this._handlers = {}, this._tag = /* @__PURE__ */ new WeakMap(), this.exec = this.exec.bind(this);
  }
  on(e, t, r) {
    let a = this._handlers[e];
    a ? r && r.intercept ? a.unshift(t) : a.push(t) : a = this._handlers[e] = [t], r && r.tag && this._tag.set(t, r.tag);
  }
  intercept(e, t, r) {
    this.on(e, t, { ...r, intercept: !0 });
  }
  detach(e) {
    for (const t in this._handlers) {
      const r = this._handlers[t];
      for (let a = r.length - 1; a >= 0; a--) this._tag.get(r[a]) === e && r.splice(a, 1);
    }
  }
  async exec(e, t) {
    const r = this._handlers[e];
    if (r) for (let a = 0; a < r.length; a++) {
      const i = r[a](t);
      if (i === !1 || i && i.then && await i === !1) return;
    }
    return this._nextHandler && await this._nextHandler.exec(e, t), t;
  }
  setNext(e) {
    return this._nextHandler = e;
  }
}
let Ir;
function yu() {
  if (typeof window > "u") return !0;
  const n = window.location.hostname, e = ["c3Zhci5kZXY=", "cmVhY3Qtd2lkZ2V0cy5jb20=", "c3ZlbHRlLXdpZGdldHMuY29t", "dnVlLXdpZGdldHMuY29t", "YW5ndWxhci13aWRnZXRzLmNvbQ==", "ZGh0bWx4LmNvbQ==", "ZGh0bWx4Y29kZS5jb20=", "d2ViaXhjb2RlLmNvbQ==", "d2ViaXguaW8=", "cmVwbC5jbw==", "Y3NiLmFwcA==", "cmVwbGl0LmRldg=="];
  for (let t = 0; t < e.length; t++) {
    const r = window.atob(e[t]);
    if (r === n || n.endsWith("." + r)) return !0;
  }
  return !1;
}
Ir = yu(), Ir = !0;
function $i() {
  return Ir;
}
function eo() {
  return (/* @__PURE__ */ new Date()).valueOf() > Math.imul(16777215, 1) * 256e3;
}
function xu(n) {
  $i() || setTimeout(function() {
    if (typeof window < "u" && eo()) {
      const e = window.atob("IFlvdXIgdHJpYWwgaGFzIGV4cGlyZWQuIFBsZWFzZSBwdXJjaGFzZSB0aGUgY29tbWVyY2lhbCBsaWNlbnNlIGZvciB0aGUgS2FuYmFuIHdpZGdldCBhdCBodHRwczovL2RodG1seC5jb20="), { columns: t } = n.getState();
      t.forEach((r) => r.label += e), n.setState({ columns: t });
    }
  }, 36e3);
}
const bu = [{ id: 1, color: "#FE6158", label: "High" }, { id: 2, color: "#F1B941", label: "Medium" }, { id: 3, color: "#77D257", label: "Low" }], pu = ["#33B0B4", "#0096FA", "#F1B941"], Cn = { label: { show: !0 }, description: { show: !1 }, progress: { show: !1 }, start_date: { show: !1 }, end_date: { show: !1 }, users: { show: !1 }, priority: { show: !1, values: bu }, color: { show: !1, values: pu }, cover: { show: !1 }, attached: { show: !1 }, menu: { show: !0 } }, to = [{ key: "label", type: "text", label: "Label" }, { key: "description", type: "textarea", label: "Description" }, { type: "combo", label: "Priority", key: "priority", config: { clear: !0 } }, { type: "color", label: "Color", key: "color", config: { clear: !0 } }, { type: "progress", key: "progress", label: "Progress" }, { type: "date", key: "start_date", label: "Start date" }, { type: "date", key: "end_date", label: "End date" }, { type: "multiselect", key: "users", label: "Users" }], Xr = { debounce: 100, autoSave: !0, placement: "sidebar" }, Ue = { kanban: "wx-kanban", toolbar: "wx-kanban-toolbar", editor: "wx-kanban-editor", content: "wx-kanban-content", scrollableContent: "wx-kanban-scrollable-content", search: "wx-kanban-search", vote: "wx-vote-card-button" }, ku = () => [{ by: "label", dir: "asc", text: "Label (a-z)", id: 7 }, { by: "label", dir: "desc", text: "Label (z-a)", id: 8 }, { by: "description", dir: "asc", text: "Description (a-z)", id: 9 }, { by: "description", dir: "desc", text: "Description (z-a)", id: 10 }], Su = (n) => {
  const { readonly: e } = n, t = [{ id: "duplicate-card", icon: "wxi-content-copy", text: "Duplicate" }, { id: "delete-card", icon: "wxi-delete-outline", text: "Delete" }];
  return !e?.select && e?.edit ? [{ id: "set-edit", icon: "wxi-edit-outline", text: "Edit" }, ...t] : t;
}, Iu = ({ columns: n, columnIndex: e }) => [{ id: "add-card", icon: "wxi-plus", text: "Add new card" }, { id: "set-edit", icon: "wxi-edit-outline", text: "Rename" }, { id: "move-column:left", icon: "wxi-arrow-left", text: "Move left", disabled: e <= 0 }, { id: "move-column:right", icon: "wxi-arrow-right", text: "Move right", disabled: e >= n.length - 1 }, { id: "delete-column", icon: "wxi-delete-outline", text: "Delete" }], Eu = ({ rows: n, rowIndex: e }) => [{ id: "set-edit", icon: "wxi-edit-outline", text: "Rename" }, { id: "move-row:up", icon: "wxi-arrow-up", text: "Move up", disabled: e <= 0 }, { id: "move-row:down", icon: "wxi-arrow-down", text: "Move down", disabled: e >= n.length - 1 }, { id: "delete-row", icon: "wxi-delete-outline", text: "Delete" }];
function se(n, e) {
  return !n || !e ? !1 : n == e;
}
function no(n, e) {
  return !!n?.find((t) => se(t, e));
}
function Du(n) {
  return Object.keys(n._cardsMap).reduce((e, t) => e.concat(n._cardsMap[t]), []);
}
function Oe(n, e) {
  return `${n}` + (e ? `:${e}` : "");
}
function ro(n) {
  return n.split(/(?<!temp):(?!\/\/)/);
}
function Bn(n, e, t) {
  return t ? n[e] + ":" + n[t] : n[e];
}
function Cu(n, e, t = { shift: 20 }) {
  let r = null;
  function a() {
    if (e) {
      const i = e.getBoundingClientRect(), s = { x: e.scrollLeft, y: e.scrollTop }, { shift: l } = t;
      n.clientX > i.width + i.left - l && e.scrollTo(s.x + l, s.y), n.clientX < i.left + l && e.scrollTo(s.x - l, s.y), n.clientY > i.height + i.top - l && e.scrollTo(s.x, s.y + l), n.clientY < i.top + l && e.scrollTo(s.x, s.y - l), r = setTimeout(() => {
        a();
      }, 100);
    }
  }
  return a(), () => {
    r && clearTimeout(r);
  };
}
function lr(n) {
  const { shape: e, defaultMenuItems: t, readonly: r } = n, a = { ...e };
  if (a.menu === !1) return { menu: { show: !1, items: () => !1 } };
  if (a.menu ||= {}, a.menu === !0 && (a.menu = { show: !0 }), typeof a.menu == "object") {
    const i = { ...a.menu };
    if (Array.isArray(i.items)) {
      const l = [...i.items];
      i.items = () => l;
    }
    const s = i.items || t;
    i.items = (l) => {
      let d = s({ ...l, readonly: r });
      return d && (d = ao(d)), d;
    }, i.show ??= !0, a.menu = i;
  }
  return a;
}
function ao(n) {
  return n.map((e) => {
    const t = { ...e };
    return t.data && (t.data = ao(t.data)), t;
  });
}
function _n(n, e) {
  const { cards: t, columnKey: r, sort: a } = n;
  if (!a) return t;
  const i = t.reduce((l, d) => (l[d[r]] = l[d[r]] || [], l[d[r]].push(d), l), {}), s = (l, d) => `${typeof d == "function" ? d(l) : l[d]}`;
  return Object.keys(i).forEach((l) => {
    let d;
    "columns" in a ? d = a.columns[l] || {} : d = a, d.by && (e = e || ((c) => {
      const { dir: f } = c, u = c.by;
      return (h, _) => {
        const v = s(h, u), m = s(_, u);
        return f === "desc" ? m.localeCompare(v, void 0, { numeric: !0 }) : v.localeCompare(m, void 0, { numeric: !0 });
      };
    }), i[l].sort(e(d)));
  }), Object.values(i).flat();
}
function Mu(n, e) {
  return (n || to.filter((t) => e[t.key]?.show)).map((t) => {
    const r = e[t.key];
    return r && typeof t.key == "string" && (r.values && !t.values && (t.values = r.values), t.config && (r.config = t.config)), (t.type === "comments" || t.key === "users" && (t.type === "multiselect" || t.type === "combo")) && t.values && t.values.forEach(io), t.id = t.id || Qr(), t;
  });
}
let Au = 0;
function Tu(n) {
  return n.users?.values && n.users.values.forEach(io), n;
}
function io(n) {
  if (!n.id) throw "Please provide user IDs";
  return !n.avatar && !n.avatarColor && (n.avatarColor = ["#00D19A", "#2F77E3", "#FFC975"][Math.floor(Au++ % 3)]), n;
}
function oo(n, e) {
  const { id: t, before: r, columnId: a, rowId: i } = e, s = n.getState(), { _areasMeta: l, cards: d, _cardsMap: c, columns: f, columnKey: u, rowKey: h, sort: _ } = s, v = d.findIndex((b) => se(b.id, t));
  if (v < 0 || !c[Oe(a, i)] || se(t, r)) return;
  const m = d[v];
  if (typeof f.find((b) => se(b.id, a)).limit == "object") {
    const b = Oe(a, i), I = b === Bn(m, u, h);
    if (l[b].noFreeSpace && !I) return;
  } else {
    const b = se(a, m[u]);
    if (l[a].noFreeSpace && !b) return;
  }
  const w = d.splice(v, 1)[0], k = { ...w }, p = c[Bn(k, u, h)] || [], x = p.findIndex((b) => se(b.id, t)) || 0, y = p[x + 1] || {};
  if (w[u] = a, h && i && (w[h] = i), !r) d.push(w);
  else {
    const b = d.findIndex((I) => se(I.id, r));
    d.splice(b, 0, w);
  }
  return n.setState({ cards: _ ? _n({ ...s, cards: d }, n.sortRule) : d }), () => {
    const b = k[u], I = h && k[h];
    n.in.exec("move-card", { id: t, before: y.id, columnId: b, rowId: I, $meta: { skipHistory: !0 } });
  };
}
function Pu(n, e) {
  const t = e.card || {}, r = e.id || t.id || Qt(), a = n.getState(), { columnKey: i, rowKey: s, _areasMeta: l, cards: d, columns: c, rows: f, sort: u } = a, h = e.rowId || s && t[s] || f[0].id;
  h && !e.rowId && (e.rowId = h);
  const _ = e.columnId || t[i] || c[0].id;
  if (typeof c.find((m) => se(m.id, _)).limit == "object") {
    if (l[Oe(_, h)].noFreeSpace) return !1;
  } else if (l[_].noFreeSpace) return !1;
  const v = { [i]: _, id: r, ...t };
  return s && (v[s] = h), d.push(v), n.setState({ cards: u ? _n({ ...a, cards: d }, n.sortRule) : d }), e.before && oo(n, { ...e, id: r }), e.select !== !1 && n.in.exec("select-card", { id: r }), e.card = v, e.id = r, () => {
    n.in.exec("delete-card", { id: r, $meta: { skipHistory: !0 } });
  };
}
function Ru(n, { id: e, card: t, replace: r }) {
  const a = n.getState();
  let i, s = a.cards.map((l) => se(l.id, e) ? (i = { ...l }, r ? { id: e, ...t } : { ...l, ...t }) : l);
  return a.sort && (s = _n({ ...a, cards: s }, n.sortRule)), n.setState({ cards: s }), () => {
    n.in.exec("update-card", { id: e, card: i, replace: !0, $meta: { skipHistory: !0 } });
  };
}
function Lu(n, { id: e, card: t, select: r }) {
  const { cards: a, columnKey: i } = n.getState(), s = a.find((l) => se(l.id, e));
  if (s) {
    const l = { ...s, id: Qt(), ...t || {} };
    n.in.exec("add-card", { columnId: l[i], before: e, card: l, select: r });
  }
}
function Fu(n, { id: e }) {
  const t = n.getState();
  t.selected?.includes(e) && n.in.exec("unselect-card", { id: e });
  const r = t.cards.findIndex((l) => se(l.id, e)), a = t.cards[r], i = t.cards[r + 1]?.id, s = t.cards.filter((l) => !se(l.id, e));
  return n.setState({ cards: s }), () => {
    n.in.exec("add-card", { columnId: a[t.columnKey], before: i, card: a, $meta: { skipHistory: !0, restore: e } });
  };
}
function so(n, { id: e, before: t }) {
  const { columns: r } = n.getState(), a = r.findIndex((l) => se(l.id, e)), i = r[a + 1]?.id, s = r.splice(a, 1)[0];
  if (t) {
    const l = r.findIndex((d) => se(d.id, t));
    r.splice(l, 0, s);
  } else r.push(s);
  return n.setState({ columns: r }), () => {
    n.in.exec("move-column", { id: e, before: i, $meta: { skipHistory: !0 } });
  };
}
function Ou(n, e) {
  const t = e.id || e.column?.id || Qt(), r = n.getState().columns, a = { id: t, label: "Untitled", ...e.column || {} };
  return r.push(a), n.setState({ columns: r }), e.before && so(n, { ...e, id: t }), n.in.exec("scroll", { to: "column", id: t }), e.id = t, e.column = a, () => {
    n.in.exec("delete-column", { id: t, $meta: { skipHistory: !0 } });
  };
}
function Nu(n, e) {
  const t = n.getState();
  let r;
  const a = e.id || e.column?.id, i = t.columns.map((s) => se(s.id, a) ? (r = { ...s }, e.replace ? { id: a, ...e.column } : { ...s, ...e.column }) : s);
  return n.setState({ columns: i }), () => {
    n.in.exec("update-column", { column: r, replace: !0, $meta: { skipHistory: !0 } });
  };
}
function Bu(n, { id: e }) {
  if (e) {
    const t = n.getState(), r = t.columns.findIndex((l) => se(l.id, e)), a = t.columns[r], i = t.columns[r + 1]?.id, s = t.columns.filter((l) => !se(l.id, e));
    return n.setState({ columns: s }), () => {
      n.in.exec("add-column", { column: a, before: i, $meta: { skipHistory: !0, restore: e } });
    };
  }
}
function lo(n, { id: e, before: t }) {
  const { rows: r, rowKey: a } = n.getState();
  if (!a) return;
  const i = r.findIndex((d) => se(d.id, e)), s = r[i + 1]?.id, l = r.splice(i, 1)[0];
  if (t) {
    const d = r.findIndex((c) => se(c.id, t));
    r.splice(d, 0, l);
  } else r.push(l);
  return n.setState({ rows: r }), () => {
    n.in.exec("move-row", { id: e, before: s, $meta: { skipHistory: !0 } });
  };
}
function zu(n, e) {
  const t = n.getState(), r = t.rows, a = e.id || e.row?.id || Qt(), i = { id: a, label: "Untitled", collapsed: !1, ...e.row || {} };
  r.push(i);
  let s = t.rowKey;
  return s || (s = "rowKey", r[0] = { id: "default", label: "Untitled" }, t.cards.map((l) => {
    l[s] = "default";
  })), n.setState({ rows: r, rowKey: s }), e.before && lo(n, { id: a, before: e.before }), n.in.exec("scroll", { to: "row", id: a }), e.id = a, e.row = i, () => {
    n.in.exec("delete-row", { id: a, $meta: { skipHistory: !0 } });
  };
}
function Hu(n, e) {
  const t = n.getState();
  let r;
  const a = e.id || e.row?.id, i = t.rows.map((s) => se(s.id, a) ? (r = { ...s }, e.replace ? { id: a, ...e.row } : { ...s, ...e.row }) : s);
  return n.setState({ rows: i }), () => {
    n.in.exec("update-row", { row: r, replace: !0, $meta: { skipHistory: !0 } });
  };
}
function qu(n, { id: e }) {
  if (e) {
    const t = n.getState(), { rows: r } = t, a = r.findIndex((l) => se(l.id, e)), i = r[a], s = r[a + 1]?.id;
    return r.splice(a, 1), n.setState({ rows: r }), () => {
      n.in.exec("add-row", { row: i, before: s, $meta: { skipHistory: !0, restore: e } });
    };
  }
}
function Uu(n, e) {
  const { source: t } = e, { _cardsMeta: r } = n.getState();
  [...t].forEach((a) => {
    const i = r[a] || {};
    i.dragging = !0, r[a] = i;
  }), n.setState({ _cardsMeta: r });
}
function Yu(n, e) {
  const { rowId: t, columnId: r } = e;
  if (!r) return;
  const { _areasMeta: a, cards: i, columns: s, rowKey: l } = n.getState(), d = i.find((h) => se(h.id, e.source[e.source.length - 1])), c = Oe(r, t), f = s.find((h) => se(h.id, r));
  let u;
  typeof f.limit == "object" ? u = !a[c].noFreeSpace || se(c, Oe(d.column, d[l])) : u = !a[r].noFreeSpace || se(r, d.column), e.dragAllowed = u;
}
function Ku(n, { id: e, columnId: t, rowId: r, before: a, source: i }) {
  if (!t) return;
  const s = { _areasMeta: {} }, { _areasMeta: l, _cardsMeta: d } = n.getState(), c = Oe(t, r);
  if (c && e) {
    const u = l[c], { columnId: h, rowId: _ } = u;
    if (i.length > 1) {
      const v = Qr();
      i.forEach((m) => {
        n.in.exec("move-card", { id: m, columnId: h, rowId: _, before: a, $meta: { batch: v } });
        const w = d[m];
        w && (w.dragging = !1);
      });
    } else {
      n.in.exec("move-card", { id: e, columnId: h, rowId: _, before: a });
      const v = d[e];
      v && (v.dragging = !1);
    }
  }
  s._cardsMeta = d;
  const f = n.getState()._areasMeta;
  Object.keys(f).forEach((u) => {
    s._areasMeta[u] = { ...f[u], height: null };
  }), n.setState(s);
}
function Gu(n, { id: e, groupMode: t, eventSource: r }) {
  const { selected: a, search: i } = n.getState();
  if (e) {
    let s = null;
    if (t) if (s = a ? [...a] : [], s.includes(e)) {
      n.in.exec("unselect-card", { id: e });
      return;
    } else s.push(e);
    else s = [e];
    i && n.in.exec("set-search", { value: null }), n.setState({ selected: s }), s.length > 1 || r === "dnd" ? n.in.exec("set-edit", null) : n.in.exec("set-edit", { cardId: e, eventSource: "select-card" });
  }
}
function Vu(n, { id: e }) {
  const t = n.getState().selected;
  if (t) {
    if (n.in.exec("set-edit", null), !e) {
      n.setState({ selected: null });
      return;
    }
    const r = t.filter((a) => !se(a, e));
    n.setState({ selected: r });
  }
}
function cr(n, e) {
  return `${n}`.toLowerCase().includes(`${e}`.toLowerCase());
}
function Wu(n, e, t) {
  return t ? cr(n[t] || "", e) : cr(n.label || "", e) || cr(n.description || "", e);
}
function ju(n, { value: e, by: t, searchRule: r }) {
  const a = n.getState(), i = e?.trim(), s = a._cardsMeta;
  let l = { value: e, by: t };
  i ? Du(a).map((d) => {
    const c = s[d.id] = s[d.id] || {};
    (r || Wu)(d, i, t) ? (c.found = !0, c.dimmed = !1) : (c.found = !1, c.dimmed = !0);
  }) : (Object.keys(s).forEach((d) => {
    const c = s[d];
    c && (delete c.dimmed, delete c.found);
  }), typeof t > "u" && (l = null)), n.setState({ _cardsMeta: s, search: l });
}
function Zu(n, e) {
  n.setState({ _scroll: e });
}
function Ju(n, e) {
  if (!e) {
    n.setState({ sort: null });
    return;
  }
  const t = n.getState(), r = e.columnId, a = e.by || "label", i = e.dir || "asc", s = e.preserve || !1;
  let l = t.sort || {};
  r ? ("column" in l || (l = { columns: {} }), l.columns[r] = { by: a, dir: i, preserve: s }) : l = { dir: i, by: a, preserve: s };
  const d = _n({ ...t, sort: l }, n.sortRule);
  s ? n.setState({ sort: l, cards: d }) : n.setState({ cards: d });
}
function Qu(n, e) {
  n.setState({ _edit: e });
}
function Xu(n, { id: e, cardId: t, comment: r }) {
  if (t) {
    const a = n.getState(), i = a.currentUser, s = e || r.id || Qt(), l = t || r.cardId;
    if (!l || !i && !r.userId) return;
    const d = a.cards.map((c) => se(c.id, l) ? { ...c, comments: [...c.comments || [], { userId: i, ...r, id: s, cardId: l, date: r.date || /* @__PURE__ */ new Date() }] } : c);
    return n.setState({ cards: d }), () => {
      n.in.exec("delete-comment", { id: s, cardId: l, $meta: { skipHistory: !0 } });
    };
  }
}
function $u(n, { cardId: e, id: t, comment: r }) {
  if (e) {
    const a = n.getState(), i = t || r.id, s = e || r.cardId;
    if (!i || !s) return;
    let l = {};
    const d = a.cards.map((c) => se(c.id, s) ? { ...c, comments: (c.comments || []).map((f) => se(f.id, i) ? (l = { ...f }, { ...f, ...r }) : f) } : c);
    return n.setState({ cards: d }), () => {
      n.in.exec("update-comment", { id: i, cardId: s, comment: l, $meta: { skipHistory: !0 } });
    };
  }
}
function ef(n, { cardId: e, id: t }) {
  if (e) {
    const r = n.getState();
    if (!t || !e) return;
    let a = {};
    const i = r.cards.map((s) => se(s.id, e) ? { ...s, comments: (s.comments || []).filter((l) => se(l.id, t) ? (a = { ...l }, !1) : !0) } : s);
    return n.setState({ cards: i }), () => {
      n.in.exec("add-comment", { id: t, cardId: e, comment: a, $meta: { skipHistory: !0 } });
    };
  }
}
function tf(n, e) {
  const t = n.getState().links, r = e.id || e.link.id || Qt();
  if (t.find((i) => se(r, i.id))) return;
  const a = { ...e.link, id: r };
  return t.push(a), n.setState({ links: t }), e.link = a, e.id = r, () => {
    n.in.exec("delete-link", { id: r, $meta: { skipHistory: !0 } });
  };
}
function nf(n, { id: e }) {
  if (e) {
    const t = n.getState(), r = t.links.find((i) => se(i.id, e)), a = t.links.filter((i) => !se(i.id, e));
    return n.setState({ links: a }), () => {
      n.in.exec("add-link", { id: e, link: r, $meta: { skipHistory: !0, restore: e } });
    };
  }
}
function rf(n, { cardId: e, userId: t }) {
  const r = n.getState(), { currentUser: a } = r;
  if (!e || !a && !t) return;
  const i = r.cards.map((s) => se(s.id, e) ? { ...s, votes: [...s.votes || [], t || a] } : s);
  n.setState({ cards: i });
}
function af(n, { cardId: e, userId: t }) {
  const r = n.getState(), { currentUser: a } = r;
  if (!e || !a && !t) return;
  const i = r.cards.map((s) => se(s.id, e) ? { ...s, votes: (s.votes || []).filter((l) => !se(l, t || a)) } : s);
  n.setState({ cards: i });
}
class of extends _u {
  in;
  out;
  sortRule;
  config;
  _router;
  constructor(e, t) {
    super({ writable: e, async: !1 }), xu(this), this.in = new Pa(), this.out = new Pa(), this.in.setNext(this.out), this.config = { history: !0, ...t || {} }, this._router = new wu(super.setState.bind(this), [{ in: ["cards", "rows", "columns", "columnKey", "rowKey"], out: ["_areasMeta", "_cardsMap"], exec: (a) => {
      const i = this.getState(), { rows: s, columns: l, columnKey: d, rowKey: c, cards: f } = i, u = {}, h = {};
      if (!d) return { _cardsMap: h, _areasMeta: u };
      f.map((_) => {
        const v = Bn(_, d, c);
        h[v] = h[v] || [], h[v]?.push(_);
      }), l.map((_) => {
        h[_.id] = h[_.id] || [], c && s.map((v) => {
          const m = Oe(_.id, v.id);
          u[m] = { columnId: _.id, rowId: v.id, column: _, row: v, cardsCount: 0 }, h[m] = h[m] || [], h[_.id] = h[_.id]?.concat(h[m] || []);
        }), u[_.id] = { columnId: _.id, column: _, cardsCount: 0 };
      }), this._computeLimits({ _areasMeta: u, _cardsMap: h }), this.setState({ _areasMeta: u, _cardsMap: h }, a);
    } }, { in: ["renderType", "scrollType"], out: ["_layout"], exec: (a) => {
      const { renderType: i, scrollType: s } = this.getState(), l = `${s}:${i}`;
      this.setState({ _layout: l }, a);
    } }], {}), this._initStructure();
    const r = this._getHandlers();
    this._setHandlers(r);
  }
  setState(e, t) {
    return this._router.setState(e, t);
  }
  init(e) {
    const { cards: t = [], links: r = [], columns: a = [], rows: i, columnKey: s = "column", rowKey: l = "", sort: d = null, readonly: c = !1, ...f } = e, u = this._normalizeReadonlyConfig(c);
    let h = this._normalizeCards(t);
    const _ = (r || []).map((b) => {
      const I = { ...b };
      return I.masterId && (I.source = I.masterId), I.slaveId && (I.target = I.slaveId), I;
    });
    d && (h = _n({ columnKey: s, sort: d, cards: h }, this.sortRule));
    const v = a.map((b) => ({ ...b })), m = (l && i || [{ id: "" }]).map((b) => ({ ...b })), { cardShape: w, columnShape: k, rowShape: p, editorShape: x } = this._normalizeShapes({ ...e, cards: h, readonly: u }), y = { ...f, cards: h, links: _, columns: v, columnKey: s, rowKey: l, rows: m, cardShape: w, columnShape: k, rowShape: p, editorShape: x, readonly: u };
    this._router.init(y), this.setState({ _edit: null, selected: null });
  }
  undo() {
    const e = this.getState().history, t = e.undo.pop();
    if (t) {
      if (typeof t == "object") t.undo(), e.redo.push({ ev: t.ev, key: t.key });
      else if (typeof t == "number") {
        const r = e.batches[t];
        for (let a = r.length - 1; a >= 0; a--) r[a].undo();
        e.redo.push(t);
      }
    }
    this.setState({ history: e });
  }
  redo() {
    const e = this.getState().history, t = [...e.redo], r = t.pop();
    if (r) {
      if (typeof r == "object") {
        const { ev: a, key: i } = r;
        this.in.exec(i, a), this.setState({ history: { ...e, redo: t } });
      } else if (typeof r == "number") {
        const a = e.batches[r];
        delete e.batches[r], a.forEach((i) => {
          const { ev: s, key: l } = i;
          this.in.exec(l, s);
        }), this.setState({ history: { ...e, redo: t } });
      }
    }
  }
  _setHandlers(e) {
    const t = this.getState().history;
    Object.keys(e).forEach((r) => {
      this.in.on(r, (a) => {
        const i = e[r](this, a), s = a?.$meta;
        this.config.history && i && !s?.skipHistory && (s?.batch ? (t.batches[s.batch] ??= [], t.batches[s.batch].push({ undo: i, key: r, ev: { ...a } }), t.undo.includes(s.batch) || t.undo.push(s.batch)) : t.undo.push({ undo: i, key: r, ev: { ...a } }), t.redo.forEach((l) => {
          typeof l == "string" && delete t.batches[l];
        }), t.redo = [], this.setState({ history: t }));
      });
    });
  }
  _getHandlers() {
    return { "add-card": Pu, "update-card": Ru, "move-card": oo, "duplicate-card": Lu, "delete-card": Fu, "add-column": Ou, "update-column": Nu, "move-column": so, "delete-column": Bu, "add-row": zu, "update-row": Hu, "move-row": lo, "delete-row": qu, "start-drag-card": Uu, "drag-card": Yu, "end-drag-card": Ku, "set-search": ju, "select-card": Gu, "unselect-card": Vu, scroll: Zu, "set-sort": Ju, "set-edit": Qu, "add-comment": Xu, "update-comment": $u, "delete-comment": ef, "add-link": tf, "delete-link": nf, "add-vote": rf, "delete-vote": af, undo: () => this.undo(), redo: () => this.redo() };
  }
  _initStructure() {
    const e = "default", t = "default";
    this.setState({ columnKey: "column", rowKey: "", columns: [], rows: [], cards: [], cardShape: Cn, columnShape: {}, rowShape: {}, editorShape: to, readonly: null, cardHeight: null, scrollType: e, renderType: t, editor: {}, currentUser: null, links: [], history: { undo: [], redo: [], batches: {} }, sort: null, selected: null, search: null, _cardsMap: {}, _cardsMeta: {}, _areasMeta: {}, _scroll: null, _edit: null, _layout: `${e}:${t}` });
  }
  _computeLimits({ _areasMeta: e, _cardsMap: t }) {
    for (const r in e) {
      const a = t[r];
      if (a) {
        const i = e[r];
        i.cardsCount = a.length || 0;
        const s = i.column;
        if (s.limit) {
          let l = 0;
          typeof s.limit == "object" ? i.rowId ? l = s.limit[i.rowId] || 0 : l = Object.keys(s.limit).reduce((d, c) => d + s.limit[c], 0) : l = s.limit, i.totalLimit = l, i.isOverLimit = !!l && i.cardsCount > l, i.noFreeSpace = s.strictLimit && !!l && i.cardsCount >= l;
        }
      }
    }
  }
  _normalizeCards(e) {
    return e.map((t) => {
      const r = t.id || Qr();
      return { ...t, id: r };
    });
  }
  _normalizeShapes(e) {
    const { cardShape: t = Cn, columnShape: r, rowShape: a, readonly: i, editorShape: s } = e;
    let l = { ...t };
    for (const u in t) {
      const h = t[u];
      typeof h == "boolean" && (l[u] = { show: h });
    }
    l = Object.keys(l).reduce((u, h) => {
      const _ = Cn[h];
      return _ ? u[h] = { ..._, ...l[h] } : u[h] = l[h], u;
    }, {}), i && !i.edit && (l.menu = l.menu || {}, l.menu.show = !1), l = Tu(l), l = lr({ readonly: i, shape: l, defaultMenuItems: Su });
    const d = Mu(s, l), c = lr({ shape: r, defaultMenuItems: Iu }), f = lr({ shape: a, defaultMenuItems: Eu });
    return { cardShape: l, columnShape: c, rowShape: f, editorShape: d };
  }
  _normalizeReadonlyConfig(e) {
    let t = { add: !0, dnd: !0, edit: !0, select: !0 };
    return typeof e == "object" ? t = { ...t, ...e } : e === !0 && Object.keys(t).forEach((r) => {
      t[r] = !1;
    }), t;
  }
}
function sf(n, e, t = 5) {
  return Math.abs(e.x - n.x) > t || Math.abs(e.y - n.y) > t;
}
function Er(n, e) {
  return n >= e[0] && n <= e[1];
}
function lf(n, e) {
  const { x: t, y: r } = n, a = Er(t, [e.x, e.right]), i = Er(r, [e.y, e.bottom]);
  return a && i;
}
function Ra(n, e, t) {
  const r = { x: e.x - t.x, y: e.y - t.y };
  return { x: n.x - r.x, y: n.y - r.y };
}
function La(n, e, t = !1) {
  const r = Array.from(n.querySelectorAll("[data-drop-area]")), a = Array.isArray(e) ? e : [e], i = n.querySelector(`[data-drag-item='${a[a.length - 1]}']`)?.offsetHeight || 300, s = {}, l = [], d = r.reduce((c, f) => {
    const u = JSON.parse(JSON.stringify(f.getBoundingClientRect())), h = f.getAttribute("data-drop-area"), _ = Array.from(f.querySelectorAll("[data-drag-item]")), v = [], m = _.reduce((x, y) => {
      const b = JSON.parse(JSON.stringify(y.getBoundingClientRect())), I = y.getAttribute("data-drag-item"), A = x[x.length - 1]?.bottom ?? b.y, M = { ...b, y: A, id: I };
      return s[I] = M, x.push(M), no(a, I) || v.push(I), x;
    }, []), w = v.map((x, y) => ({ ...m[y], id: x }));
    if (!t) {
      const x = f.offsetParent, y = 30;
      f.offsetTop + f.offsetHeight + y >= x.scrollHeight && (u.bottom += i + y, u.height += i + y);
    }
    const k = { ...u, id: h }, p = f.querySelector(".wx-list-wrapper");
    return p && (k.scrollList = { node: p, initialScrollY: p.scrollTop }), l.push(k), c[h] = w, c;
  }, {});
  return { dragItemsCoords: s, dropAreasCoords: l, dropAreaItemsCoords: d };
}
function Fa(n) {
  const e = {};
  if (e.target = n.target, "touches" in n) {
    const t = n.touches[0];
    e.touches = n.touches, e.clientX = t.clientX, e.clientY = t.clientY;
  } else e.clientX = n.clientX, e.clientY = n.clientY;
  return e;
}
function $r(n, e = "data-id") {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
function Dr(n, e = "data-id") {
  const t = $r(n, e);
  return t ? t.getAttribute(e) : null;
}
function zn(n, e = "data-id") {
  const t = $r(n, e);
  return t ? cf(t.getAttribute(e)) : null;
}
function cf(n) {
  if (typeof n == "string") {
    const e = n * 1;
    if (!isNaN(e)) return e;
  }
  return n;
}
function df() {
  return { detect: () => !0, addEvent: function(n, e, t) {
    return n.addEventListener(e, t), () => n.removeEventListener(e, t);
  }, addGlobalEvent: function(n, e) {
    return document.addEventListener(n, e), () => document.removeEventListener(n, e);
  }, getTopNode: function() {
    return window.document.body;
  } };
}
const lt = df();
(/* @__PURE__ */ new Date()).valueOf();
function uf(n, e) {
  if (e.readonly) return;
  let t, r;
  const a = n;
  let i, s, l, d, c, f, u, h, _, v, m, w = null, k = null;
  const p = (z, N) => {
    e.api.exec(z, N), e.onAction && e.onAction(z, N);
  };
  n.querySelector(`[data-kanban-id='${Ue.scrollableContent}']`)?.addEventListener("scroll", () => {
    if (d) {
      const { itemId: z, itemRect: N, itemsId: C } = d;
      d.scroll = { x: i.scrollLeft, y: i.scrollTop };
      const F = La(a, C, !0);
      c = F.dragItemsCoords, u = F.dropAreasCoords, f = F.dropAreaItemsCoords, c[z] = N;
    }
  }, { capture: !0 });
  const { data: x } = e.api.getStores(), y = { duration: 500, timer: null }, b = () => {
    y.callback && (y.timer = setTimeout(y.callback, y.duration));
  }, I = () => {
    y.timer && clearTimeout(y.timer);
  };
  function A(z) {
    if (s && clearTimeout(s), i) {
      const N = i.getBoundingClientRect(), C = { x: i.scrollLeft, y: i.scrollTop }, F = 50;
      z.clientX > N.width + N.left - F && i.scrollTo(C.x + F, C.y), z.clientX < N.left + F && i.scrollTo(C.x - F, C.y), z.clientY > N.height + N.top - F && i.scrollTo(C.x, C.y + F), z.clientY < N.top + F && i.scrollTo(C.x, C.y - F), s = setTimeout(() => {
        A(z);
      }, 100);
    }
  }
  function M(z) {
    const N = {}, C = u.find((Y) => lf(z, Y)), F = C?.id;
    if (F) {
      const [Y, W] = ro(F);
      N.overAreaId = { rowId: W, columnId: Y };
      let ee = z.y;
      C.scrollList && (ee += C.scrollList.node.scrollTop - C.scrollList.initialScrollY);
      const ie = f[F];
      N.before = ie.find((de) => Er(ee, [de.y, de.bottom]))?.id;
    }
    return N;
  }
  function q(z, N, C, F, Y) {
    if (z.touches && z.touches.length > 1) return;
    const W = F.itemId;
    Y?.indexOf(W) === -1 && (p("select-card", { id: W, eventSource: "dnd" }), Y = [W]), l = Ra(N, F, c[W]), j(Y);
    const ee = M(C);
    _ = ee.before, h = ee.overAreaId, m = Y || [W], v = W;
    const { _areasMeta: ie, _layout: de } = x.getState();
    u?.forEach((X) => {
      X.id && (ie[X.id].height = de !== "default:lazy" ? X.height : null);
    }), p("start-drag-card", { id: W, rowId: h.rowId, columnId: h.columnId, before: _, source: m });
  }
  function K(z, N, C, F) {
    const Y = c[F.itemId];
    l = Ra(N, F, Y), t.style.left = l.x + "px", t.style.top = l.y + "px";
    const W = M(C), ee = { id: v, rowId: h.rowId, columnId: h.columnId, before: _, source: m };
    W.overAreaId?.columnId && (ee.rowId !== W.overAreaId?.rowId || ee.columnId !== W.overAreaId?.columnId) && (h = W.overAreaId, ee.rowId = h.rowId, ee.columnId = h.columnId), _ !== W.before && (_ = ee.before = W.before), p("drag-card", ee);
    const ie = Array.from(document.getElementsByClassName("wx-kanban-drop-area"));
    for (const de of ie) {
      const X = de;
      X.style.minHeight = `${c[v].height}px`;
    }
  }
  function j(z) {
    const N = a.closest(".wx-kanban");
    z?.length > 1 && N.style.setProperty("--wx-kanban-dragged-cards-count", JSON.stringify(`${z.length}`)), N.appendChild(t), t.classList.add("wx-dragged-card"), t.style.left = l.x + "px", t.style.top = l.y + "px", lt.getTopNode(N).classList.add("wx-ondrag");
  }
  function Z() {
    const z = a.closest(".wx-kanban");
    t.remove(), lt.getTopNode(z).classList.remove("wx-ondrag"), z.style.removeProperty("--wx-kanban-dragged-cards-count"), t = null;
  }
  function G(z, N, C) {
    const F = C.scroll, Y = { x: N.scrollLeft, y: N.scrollTop };
    return { x: z.clientX + (Y.x - F.x), y: z.clientY + (Y.y - F.y) };
  }
  function R(z) {
    const N = Fa(z);
    if (N.touches && N.touches.length > 1 || "button" in z && z.button !== 0) return;
    const C = $r(N.target, "data-drag-item");
    if (i = a.querySelector(`[data-kanban-id="${Ue.content}"]`), C) {
      const F = zn(C, "data-drag-item"), Y = zn(N.target, "data-drag-item"), W = x.getState().selected, ee = W?.length > 1 ? [...W, F] : [F], ie = La(a, ee);
      c = ie.dragItemsCoords, u = ie.dropAreasCoords, f = ie.dropAreaItemsCoords, t = C.cloneNode(!0), r = "touches" in z ? { up: "touchend", move: "touchmove" } : { up: "mouseup", move: "mousemove" }, "touches" in z ? (y.callback = () => {
        document.addEventListener(r.move, T, { passive: !1 });
      }, b()) : w = lt.addGlobalEvent(r.move, T, N.target), k = lt.addGlobalEvent(r.up, L, N.target), d = { x: N.clientX, y: N.clientY, itemId: F, itemsId: ee, itemRect: c[F], areaId: Y, scroll: { x: i.scrollLeft, y: i.scrollTop } };
    }
  }
  function T(z) {
    z.preventDefault(), z.stopPropagation();
    const N = Fa(z);
    if (A(N), !d) return;
    const C = x.getState(), { selected: F } = C, Y = G(N, i, d), W = { x: N.clientX, y: N.clientY };
    !v && sf(d, W) && q(N, W, Y, d, F), v && K(C, W, Y, d);
  }
  function L() {
    w && w(), k && k(), I(), Z(), s && clearTimeout(s), v && (p("end-drag-card", { id: v, rowId: h.rowId, columnId: h.columnId, before: _, source: m }), v = null), d = null;
  }
  return a.addEventListener("mousedown", R), a.addEventListener("touchstart", R), a.addEventListener("dragstart", (z) => z.preventDefault()), { destroy() {
    a.removeEventListener("mousedown", R), a.removeEventListener("touchstart", R);
  } };
}
function ff(n, e) {
  if (e.readonly) return;
  let t;
  const { api: r } = e, a = (s) => {
    t = s.target;
  };
  r.on("select-card", ({ id: s }) => {
    t || setTimeout(() => {
      r.exec("scroll", { to: "card", id: s });
    }, 100);
  });
  const i = (s) => {
    if (!t || Dr(s.target, "data-ignore-selection")) return;
    const l = zn(t, "data-drag-item"), d = zn(t, "data-kanban-id"), c = s.metaKey || s.ctrlKey, f = s.shiftKey;
    t === s.target && d !== Ue.editor && d !== Ue.vote && vf({ itemId: l, groupMode: c, rangeMode: f, api: r }), t = null;
  };
  return n.addEventListener("mousedown", a), n.addEventListener("mouseup", i), { destroy() {
    n.removeEventListener("mousedown", a), n.removeEventListener("mouseup", i);
  } };
}
function vf(n) {
  const { itemId: e, groupMode: t, rangeMode: r, api: a } = n, { _cardsMap: i, columnKey: s } = a.getState(), { selected: l } = a.getState();
  if (!e && l?.length) {
    a.exec("unselect-card", { id: null });
    return;
  }
  if (r && l?.length) {
    const d = a.getCard(e), c = a.getCard(l[l.length - 1]);
    if (hf(d, c, s)) {
      const f = Object.keys(i).filter((m) => mf(m) === d[s]).reduce((m, w) => {
        const k = i[w];
        return m.concat(k);
      }, []), u = f.findIndex((m) => se(m.id, e)), h = f.findIndex((m) => se(m.id, c?.id)), _ = Math.min(u, h), v = Math.max(u, h);
      f.slice(_, v + 1).forEach((m) => {
        l.indexOf(m.id) === -1 && a.exec("select-card", { id: m.id, groupMode: !0 });
      });
      return;
    }
  }
  a.exec("select-card", { id: e, groupMode: t });
}
function hf(n, e, t) {
  return !n || !e || !t ? !1 : se(n[t], e[t]);
}
function mf(n) {
  return ro(n)[0];
}
function gf(n, e) {
  const { api: t, tick: r = () => new Promise((l) => {
    requestAnimationFrame(() => {
      l();
    });
  }) } = e, a = t.getReactiveState()._scroll, i = { card: "data-drag-item", column: "data-column-header", row: "data-row-header" };
  a?.subscribe((l) => {
    if (l) {
      const { to: d, id: c, options: f } = l;
      s(`[${i[d]}="${c}"]`, f).then((u) => {
        u && t.exec("scroll", null);
      }).catch();
    }
  });
  function s(l, d) {
    return new Promise((c) => {
      r().then(() => {
        const f = n.querySelector(l);
        f && (f.scrollIntoView(d || { behavior: "smooth", block: "nearest", inline: "nearest" }), c(!0)), c(!1);
      });
    });
  }
}
function ea(n) {
  let e = !1;
  function t(d) {
    d.buttons === 1 && (e = !0);
  }
  function r() {
    e = !1, a && a();
  }
  let a = null;
  function i(d) {
    e && (a && a(), a = Cu(d, n));
  }
  function s() {
    a && (a(), a = null), e = !1;
  }
  const l = lt.getTopNode(n);
  return l.addEventListener("mousemove", i), l.addEventListener("mouseup", s), n.addEventListener("mousedown", t), n.addEventListener("mouseover", t), n.addEventListener("mouseleave", r), { destroy: () => {
    l.removeEventListener("mousemove", i), l.removeEventListener("mouseup", s), n.removeEventListener("mousedown", t), n.removeEventListener("mouseover", t), n.removeEventListener("mouseleave", r);
  } };
}
function _f(n, e) {
  if (e.readonly) return;
  const t = e.locale, { api: r } = e, a = e.onAction;
  let i = e.inFocus || !1, s;
  function l(h, _) {
    switch (h) {
      case "delete": {
        const v = r.getState().selected;
        v?.length && (e.confirmDeletion?.() || Promise.resolve()).then(() => {
          v.forEach((m) => {
            r.exec("delete-card", { id: m });
          });
        }).catch(() => {
        });
        break;
      }
      case "ctrl+d":
        _.preventDefault(), r.getState().selected?.forEach((v) => {
          const m = r.getCard(v);
          r.exec("duplicate-card", { id: v, card: { label: `${t("Duplicate of")} ${m?.label}` } });
        });
        break;
      case "ctrl+z":
        _.preventDefault(), r.exec("undo", null);
        break;
      case "ctrl+shift+z":
      case "ctrl+y":
        _.preventDefault(), r.exec("redo", null);
        break;
    }
  }
  function d(h) {
    if (i) {
      const _ = h.ctrlKey || h.metaKey, v = h.shiftKey, m = h.code.replace("Key", "").toLowerCase(), w = `${_ ? "ctrl+" : ""}${v ? "shift+" : ""}${m}`;
      l(w, h), a && a("keydown", { hotkey: w });
    }
  }
  function c(h) {
    const _ = Dr(h.target, "data-wx-widget");
    i = _ === Ue.kanban || _ === Ue.toolbar, s = _, a && a("set-focus", { inFocus: i });
  }
  function f(h) {
    const _ = Dr(h.target, "data-wx-widget");
    s === _ && !i && (i = !0, s = Ue.kanban, a && a("set-focus", { inFocus: i }));
  }
  const u = [lt.addGlobalEvent("keydown", d, n), lt.addGlobalEvent("mousedown", c, n), lt.addGlobalEvent("focusin", c, n), lt.addGlobalEvent("focusout", f, n)];
  return { destroy: () => {
    u.forEach((h) => h());
  } };
}
function Oa(n) {
  switch (n?.toLowerCase()) {
    case "jpg":
    case "jpeg":
    case "gif":
    case "png":
    case "bmp":
    case "tiff":
    case "pcx":
    case "svg":
    case "ico":
      return !0;
    default:
      return !1;
  }
}
class wf {
  _store;
  constructor(e) {
    this._store = e;
  }
  json(e) {
    const t = document.querySelector(".wx-kanban"), { cards: r, links: a, columns: i, rows: s } = this._store.getState(), l = { cards: r, links: a, columns: i };
    s.length > 0 && (l.rows = s), this._save(l, `${e || "kanban-export"}`, "json", t);
  }
  _save(e, t, r, a) {
    const i = document.createElement("a");
    lt.getTopNode(a).appendChild(i), i.style.display = "none";
    const s = JSON.stringify(e), l = new Blob([s], { type: "octet/stream" }), d = window.URL.createObjectURL(l);
    i.href = d, i.download = `${t}.${r}`, i.click(), window.URL.revokeObjectURL(d), i.remove();
  }
}
function yf(n, e) {
  return { exec: n.in.exec.bind(n.in), on: n.out.on.bind(n.in), intercept: n.in.intercept.bind(n.in), detach: n.in.detach.bind(n.in), getState: n.getState.bind(n), getReactiveState: n.getReactive.bind(n), setNext: (t) => e = e.setNext(t), getStores: () => ({ data: n }), getCard: (t) => {
    const { cards: r } = n.getState();
    return r.find((a) => a.id == t);
  }, serialize: () => {
    const { cards: t, links: r, columns: a, rows: i } = n.getState();
    return { cards: t, links: r, columns: a, rows: i };
  }, export: new wf(n), getAreaCards: (t, r) => {
    const a = Oe(t, r);
    return n.getState()._cardsMap[a];
  }, getColumnCards: (t) => n.getState()._cardsMap[t] };
}
var xf = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function bf(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var co = { exports: {} };
(function(n, e) {
  (function(t, r) {
    n.exports = r();
  })(xf, function() {
    var t = {};
    function r() {
      return typeof navigator.userAgentData == "object" && "mobile" in navigator.userAgentData ? navigator.userAgentData.mobile : (m = navigator.userAgent || navigator.vendor || window.opera, /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(m) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(m.slice(0, 4)));
      var m;
    }
    function a() {
      if (r()) {
        var m = window.innerWidth, w = window.innerHeight, k = Math.min(m, w), p = Math.max(m, w);
        return k <= 480 && p <= 896;
      }
      return !1;
    }
    function i() {
      return t.AppRunsOnLegacyTouchDevice == null && (t.AppRunsOnLegacyTouchDevice = !c("(pointer:fine)") && !c("(pointer:coarse)") && !c("-moz-touch-enabled") && ("ontouchstart" in Window || (navigator.maxTouchPoints || 0) > 0 || /touch|android|iphone|ipod|ipad/i.test(navigator.userAgent))), t.AppRunsOnLegacyTouchDevice;
    }
    function s() {
      return t.DevicePointingAccuracy == null && (l(), d() || t.waitingForLoaded || (t.waitingForLoaded = !0, window.addEventListener("DOMContentLoaded", l))), t.DevicePointingAccuracy;
    }
    function l() {
      t.DeviceCanHover = c("(hover:hover)");
      var m = "fine";
      switch (!0) {
        case c("(pointer:none)"):
          m = "none";
          break;
        case c("(pointer:coarse)"):
        case c("-moz-touch-enabled"):
        case i():
          m = "coarse";
      }
      if (t.DevicePointingAccuracy = m, d()) {
        var w = document.body.classList;
        if (m === "none" !== w.contains("noPointer") || m === "fine" !== w.contains("finePointer") || m === "coarse" !== w.contains("coarsePointer")) switch (document.body.classList.remove("noPointer", "finePointer", "coarsePointer"), m) {
          case "none":
            document.body.classList.add("noPointer");
            break;
          case "fine":
            document.body.classList.add("finePointer");
            break;
          case "coarse":
            document.body.classList.add("coarsePointer");
        }
      }
    }
    function d() {
      return document.readyState === "interactive" || document.readyState === "complete";
    }
    function c(m) {
      var w = window.matchMedia || window.webkitMatchmedia || window.mozMatchmedia || window.oMatchmedia;
      return w != null && w(m).matches;
    }
    function f(m, w) {
      return typeof m.item == "function" ? m.item(w) : m[w];
    }
    function u(m, w) {
      for (var k = 0, p = m.length; k < p; k++) if (w.test(f(m, k))) return !0;
      return !1;
    }
    function h(m, w) {
      if (typeof m != "function") throw new Error("handler function expected");
      t.EventHandlerRegistry == null && (t.EventHandlerRegistry = []);
      for (var k = t.EventHandlerRegistry, p = 0, x = k.length; p < x; p++) if (k[p].Handler === m) return void (k[p].onceOnly = w);
      k.push({ Handler: m, onceOnly: w }), k.length === 1 && (t.AccuracyPoller = setInterval(function() {
        var y = s();
        l(), s() !== y && function() {
          t.EventHandlerRegistry == null && (t.EventHandlerRegistry = []);
          for (var b = t.EventHandlerRegistry, I = 0, A = b.length; I < A; I++) {
            var M = b[I], q = M.Handler, K = M.onceOnly;
            try {
              q(s());
            } catch (j) {
              console.warn("PointingAccuracy observation function failed with", j);
            }
            K && _(q);
          }
        }();
      }, 500));
    }
    function _(m) {
      t.EventHandlerRegistry == null && (t.EventHandlerRegistry = []);
      for (var w = t.EventHandlerRegistry, k = 0, p = w.length; k < p; k++) if (w[k].Handler === m) {
        w.splice(k, 1);
        break;
      }
      w.length === 0 && (clearInterval(t.AccuracyPoller), t.AccuracyPoller = void 0);
    }
    var v = { get isMobile() {
      return r();
    }, get isPhone() {
      return a();
    }, get isTablet() {
      return r() && !a();
    }, get isLegacyTouchDevice() {
      return i();
    }, rewriteMediaQueriesOnLegacyTouchDevices: function m() {
      if (!t.MediaQueriesHaveBeenRewritten && i()) if (d()) {
        for (var w = document.styleSheets, k = 0, p = w.length; k < p; k++) for (var x = w[k].cssRules || w[k].rules, y = 0, b = x.length; y < b; y++) {
          var I = x[y];
          if (I.type === CSSRule.MEDIA_RULE && u(I.media, /handheld/i)) {
            var A = I.media;
            A.mediaText = A.mediaText.replace("handheld", "screen");
          }
        }
        var M = document.getElementsByTagName("link");
        for (k = 0, p = M.length; k < p; k++) {
          var q = M[k];
          /handheld/i.test(q.media) && (q.media = q.media.replace("handheld", "screen"));
        }
        t.MediaQueriesHaveBeenRewritten = !0;
      } else window.addEventListener("DOMContentLoaded", m);
    }, get PointingAccuracy() {
      return s();
    }, get canHover() {
      return t.DevicePointingAccuracy == null && (l(), d() || t.waitingForLoaded || (t.waitingForLoaded = !0, window.addEventListener("DOMContentLoaded", l))), t.DeviceCanHover;
    }, onPointingAccuracyChanged: function(m) {
      h(m, !1);
    }, oncePointingAccuracyChanged: function(m) {
      h(m, !0);
    }, offPointingAccuracyChanged: function(m) {
      _(m);
    }, get observesPointingAccuracy() {
      return t.AccuracyPoller != null;
    } };
    return v;
  });
})(co);
var pf = co.exports;
const kf = /* @__PURE__ */ bf(pf);
function nr(n, e) {
  return n.data && (n.data = n.data.map((t) => nr(t, e))), {
    ...n,
    text: e(n.text),
    css: n.disabled ? "disabled" : ""
  };
}
function Sf(n) {
  let e = [];
  n.subscribe((l) => {
    e = l;
  });
  const t = /* @__PURE__ */ new Map(), r = Jr(/* @__PURE__ */ new Map());
  function a(l, d, c) {
    t.set(l, d);
    const f = new ResizeObserver(() => {
      c();
    });
    return f.observe(d), () => {
      f.disconnect();
    };
  }
  function i(l, d, c) {
    const f = typeof c < "u";
    r.update((u) => {
      const h = new Map(u);
      return f ? h.set(l, c) : h.delete(l), h;
    }), r.update((u) => {
      const h = new Map(u);
      for (let _ = d + (f ? 1 : 0); _ < e.length; (_ += 1) - 1) {
        const v = e[_].id, m = t.get(v);
        m && h.set(v, m.offsetLeft);
      }
      return h;
    });
  }
  function s(l, d) {
    t.delete(l), i(l, d);
  }
  wt("column-tracking", {
    register: a,
    unregister: s,
    handleOffsetChange: i,
    get columnOffsets() {
      return r;
    }
  });
}
function uo() {
  return he("column-tracking");
}
function fo(n, e = "data-id") {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e))
      return t;
    t = t.parentNode;
  }
  return null;
}
function vo(n) {
  if (typeof n == "string") {
    const e = n * 1;
    if (!isNaN(e)) return e;
  }
  return n;
}
function If() {
  return {
    detect: () => !0,
    addEvent: function(n, e, t) {
      return n.addEventListener(e, t), () => n.removeEventListener(e, t);
    },
    addGlobalEvent: function(n, e) {
      return document.addEventListener(n, e), () => document.removeEventListener(n, e);
    },
    getTopNode: function() {
      return window.document.body;
    }
  };
}
const Dt = If();
function Ef(n) {
  Object.assign(Dt, n);
}
function Na(n, e, t) {
  function r(a) {
    const i = fo(a);
    if (!i) return;
    const s = vo(i.dataset.id);
    if (typeof e == "function") return e(s, a);
    let l, d = a.target;
    for (; d != i; ) {
      if (l = d.dataset ? d.dataset.action : null, l && e[l]) {
        e[l](s, a);
        return;
      }
      d = d.parentNode;
    }
    e[t] && e[t](s, a);
  }
  Dt.addEvent(n, t, r);
}
function ho(n, e) {
  Na(n, e, "click"), e.dblclick && Na(n, e.dblclick, "dblclick");
}
function Df(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    if (n[t] === e) {
      n.splice(t, 1);
      break;
    }
}
let mo = /* @__PURE__ */ new Date(), Hn = !1, kn = [];
const Nt = [], Ba = (n) => {
  if (Hn) {
    Hn = !1;
    return;
  }
  for (let e = Nt.length - 1; e >= 0; e--) {
    const { node: t, date: r, props: a } = Nt[e];
    if (!(r > mo) && !t.contains(n.target) && t !== n.target && (a.callback && a.callback(n), a.modal || n.defaultPrevented))
      break;
  }
}, Cf = (n) => {
  mo = /* @__PURE__ */ new Date(), Hn = !0;
  for (let e = Nt.length - 1; e >= 0; e--) {
    const { node: t } = Nt[e];
    if (!t.contains(n.target) && t !== n.target) {
      Hn = !1;
      break;
    }
  }
};
function Mf(n, e) {
  kn.length || (kn = [
    Dt.addGlobalEvent("click", Ba, n),
    Dt.addGlobalEvent("contextmenu", Ba, n),
    Dt.addGlobalEvent("mousedown", Cf, n)
  ]), typeof e != "object" && (e = { callback: e });
  const t = { node: n, date: /* @__PURE__ */ new Date(), props: e };
  return Nt.push(t), {
    destroy() {
      Df(Nt, t), Nt.length || (kn.forEach((r) => r()), kn = []);
    }
  };
}
const Af = (n) => n.indexOf("bottom") !== -1, Tf = (n) => n.indexOf("left") !== -1, za = (n) => n.indexOf("right") !== -1, Pf = (n) => n.indexOf("top") !== -1, Ha = (n) => n.indexOf("fit") !== -1, qa = (n) => n.indexOf("overlap") !== -1, Rf = (n) => n.indexOf("center") !== -1;
function Lf(n, e) {
  let t = 0;
  const r = Dt.getTopNode(n);
  for (; n && n !== r; ) {
    const a = getComputedStyle(n).position;
    if ((a === "absolute" || a === "relative" || a === "fixed") && (t = parseInt(getComputedStyle(n).zIndex) || 0), n = n.parentNode, n === e) break;
  }
  return t;
}
let Ye, bt, $t, st;
function Ff(n, e, t = "bottom", r = 0, a = 0) {
  if (!n) return null;
  Ye = r, bt = a, $t = "auto";
  let i = 0, s = 0;
  const l = Of(n), d = qa(t) ? Dt.getTopNode(n) : l;
  if (!l) return null;
  const c = l.getBoundingClientRect(), f = n.getBoundingClientRect(), u = d.getBoundingClientRect();
  if (e) {
    const v = Lf(e, l);
    i = Math.max(v + 1, 20);
  }
  if (e) {
    if (st = e.getBoundingClientRect(), Ha(t) && ($t = st.width + "px"), t !== "point")
      if (Rf(t))
        Ha(t) ? Ye = 0 : (Ye = u.width / 2, s = 1), bt = (u.height - f.height) / 2;
      else {
        const v = qa(t) ? 0 : 1;
        Ye = za(t) ? st.right + v : st.left - v, bt = Af(t) ? st.bottom + 1 : st.top;
      }
  } else st = { left: r, right: r, top: a, bottom: a };
  Tf(t) && (Ye = st.left, s = 2), Pf(t) && (bt = st.top - f.height);
  const h = bt + f.height - u.bottom;
  return h > 0 && (bt -= h), Ye + f.width - u.right > 0 && (za(t) ? s = 2 : Ye = u.right - f.width), s && (Ye = Math.round(Ye - f.width * s / 2)), Ye < 0 && (t !== "left" ? Ye = 0 : Ye = st.right), Ye += d.scrollLeft - c.left, bt += d.scrollTop - c.top, $t = $t || "auto", { x: Ye, y: bt, z: i, width: $t };
}
function Of(n) {
  const e = Dt.getTopNode(n);
  for (n && (n = n.parentElement); n; ) {
    const t = getComputedStyle(n).position;
    if (n === e || t === "relative" || t === "absolute" || t === "fixed")
      return n;
    n = n.parentNode;
  }
  return null;
}
let Ua = (/* @__PURE__ */ new Date()).valueOf();
function wn() {
  return Ua += 1, Ua;
}
function Ve(n) {
  return n < 10 ? "0" + n : n.toString();
}
function Nf(n) {
  const e = Ve(n);
  return e.length == 2 ? "0" + e : e;
}
function Bf(n) {
  let e = n.getDay();
  e === 0 && (e = 7);
  const t = new Date(n.valueOf());
  t.setDate(n.getDate() + (4 - e));
  const r = t.getFullYear(), a = Math.floor(
    (t.getTime() - new Date(r, 0, 1).getTime()) / 864e5
  );
  return 1 + Math.floor(a / 7);
}
const Ya = ["", ""];
function zf(n, e, t) {
  switch (n) {
    case "%d":
      return Ve(e.getDate());
    case "%m":
      return Ve(e.getMonth() + 1);
    case "%j":
      return e.getDate();
    case "%n":
      return e.getMonth() + 1;
    case "%y":
      return Ve(e.getFullYear() % 100);
    case "%Y":
      return e.getFullYear();
    case "%D":
      return t.dayShort[e.getDay()];
    case "%l":
      return t.dayFull[e.getDay()];
    case "%M":
      return t.monthShort[e.getMonth()];
    case "%F":
      return t.monthFull[e.getMonth()];
    case "%h":
      return Ve((e.getHours() + 11) % 12 + 1);
    case "%g":
      return (e.getHours() + 11) % 12 + 1;
    case "%G":
      return e.getHours();
    case "%H":
      return Ve(e.getHours());
    case "%i":
      return Ve(e.getMinutes());
    case "%a":
      return ((e.getHours() > 11 ? t.pm : t.am) || Ya)[0];
    case "%A":
      return ((e.getHours() > 11 ? t.pm : t.am) || Ya)[1];
    case "%s":
      return Ve(e.getSeconds());
    case "%S":
      return Nf(e.getMilliseconds());
    case "%W":
      return Ve(Bf(e));
    case "%c": {
      let r = e.getFullYear() + "";
      return r += "-" + Ve(e.getMonth() + 1), r += "-" + Ve(e.getDate()), r += "T", r += Ve(e.getHours()), r += ":" + Ve(e.getMinutes()), r += ":" + Ve(e.getSeconds()), r;
    }
    default:
      return n;
  }
}
const Hf = /%[a-zA-Z]/g;
function qn(n, e) {
  return typeof n == "function" ? n : function(t) {
    return t ? (t.getMonth || (t = new Date(t)), n.replace(
      Hf,
      (r) => zf(r, t, e)
    )) : "";
  };
}
function Ka(n) {
  return n && typeof n == "object" && !Array.isArray(n);
}
function Cr(n, e) {
  for (const t in e) {
    const r = e[t];
    Ka(n[t]) && Ka(r) ? n[t] = Cr(
      { ...n[t] },
      e[t]
    ) : n[t] = e[t];
  }
  return n;
}
function yn(n) {
  return {
    getGroup(e) {
      const t = n[e];
      return (r) => t && t[r] || r;
    },
    getRaw() {
      return n;
    },
    extend(e, t) {
      if (!e) return this;
      let r;
      return t ? r = Cr({ ...e }, n) : r = Cr({ ...n }, e), yn(r);
    }
  };
}
const ta = {
  detect() {
    return typeof window > "u" ? !1 : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !!window.Sfdc || // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !!window.$A || // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !!window.Aura || "$shadowResolver$" in document.body
    );
  },
  addGlobalEvent: function(n, e, t) {
    const r = ta.getTopNode(t);
    return r.addEventListener(n, e), () => r.removeEventListener(n, e);
  },
  getTopNode: function(n) {
    return n.closest('[data-wx-root="true"]');
  }
};
function go(n, e) {
  return n.map((t) => {
    const r = e(t);
    return t.data && t.data.length && (r.data = go(t.data, e)), r;
  });
}
function _o(n, e) {
  const t = [];
  return n.forEach((r) => {
    if (r.data) {
      const a = _o(r.data, e);
      a.length && t.push({ ...r, data: a });
    } else
      e(r) && t.push(r);
  }), t;
}
let qf = 1;
function Uf(n) {
  return go(n, (e) => ({ ...e, id: e.id || qf++ }));
}
const Yf = {};
function Kf(n) {
  return Yf[n];
}
var Gf = /* @__PURE__ */ E("<i></i>"), Vf = /* @__PURE__ */ E('<span class="wx-value svelte-xfznf6"> </span>'), Wf = /* @__PURE__ */ E('<span class="wx-subtext svelte-xfznf6"> </span>'), jf = /* @__PURE__ */ E('<i class="wx-sub-icon wxi-angle-right svelte-xfznf6"></i>'), Zf = /* @__PURE__ */ E("<div><!> <!> <!> <!></div>");
function Jf(n, e) {
  ne(e, !0);
  let t = S(e, "showSub", 15, !1), r = S(e, "activeItem", 15, null);
  function a() {
    t(e.item.data ? e.item.id : !1), r(this);
  }
  var i = Zf();
  i.__click = function(...f) {
    e.onclick?.apply(this, f);
  };
  var s = D(i);
  P(s, () => e.item.icon, (f) => {
    var u = Gf();
    O(() => ye(u, `wx-icon ${e.item.icon ?? ""} svelte-xfznf6`)), g(f, u);
  });
  var l = U(s, 2);
  P(
    l,
    () => e.item.type,
    (f) => {
      var u = $();
      const h = /* @__PURE__ */ B(() => Kf(e.item.type));
      var _ = V(u);
      Ct(_, () => o(h), (v, m) => {
        m(v, {
          get item() {
            return e.item;
          }
        });
      }), g(f, u);
    },
    (f) => {
      var u = Vf(), h = D(u);
      O(() => te(h, e.item.text)), g(f, u);
    }
  );
  var d = U(l, 2);
  P(d, () => e.item.subtext, (f) => {
    var u = Wf(), h = D(u);
    O(() => te(h, e.item.subtext)), g(f, u);
  });
  var c = U(d, 2);
  P(c, () => e.item.data, (f) => {
    var u = jf();
    g(f, u);
  }), O(() => {
    ye(i, `wx-item ${(e.item.css || "") ?? ""} svelte-xfznf6`), J(i, "data-id", e.item.id);
  }), He("mouseenter", i, a), g(n, i), re();
}
me(["click"]);
var Qf = /* @__PURE__ */ E('<div class="wx-separator svelte-1tqohog"></div>'), Xf = /* @__PURE__ */ E("<!> <!>", 1), $f = /* @__PURE__ */ E('<div data-wx-menu="true"></div>');
function na(n, e) {
  ne(e, !0);
  let t = S(e, "left", 3, 0), r = S(e, "top", 3, 0), a = S(e, "at", 3, "bottom"), i = S(e, "parent", 3, null), s = S(e, "mount", 3, null), l = S(e, "context", 3, null), d = S(e, "css", 3, ""), c = ae(-1e4), f = ae(-1e4), u = ae(20), h = ae(void 0), _ = ae(void 0), v = ae(!1), m = ae(null);
  function w() {
    const b = Ff(o(_), i(), a(), t(), r());
    b && (H(c, Q(b.x)), H(f, Q(b.y)), H(u, Q(b.z)), H(h, Q(b.width)));
  }
  s() && s()(w), vt(w);
  function k() {
    H(v, !1);
  }
  function p() {
    e.onclick && e.onclick({ action: null });
  }
  const x = /* @__PURE__ */ B(() => Uf(e.options));
  gt(() => {
    w(i());
  });
  var y = $f();
  Ie(y, 21, () => o(x), (b) => b.id, (b, I) => {
    var A = Xf(), M = V(A);
    P(
      M,
      () => o(I).type === "separator",
      (K) => {
        var j = Qf();
        g(K, j);
      },
      (K) => {
        Jf(K, {
          get item() {
            return o(I);
          },
          get showSub() {
            return o(v);
          },
          set showSub(j) {
            H(v, Q(j));
          },
          get activeItem() {
            return o(m);
          },
          set activeItem(j) {
            H(m, Q(j));
          },
          onclick: (j) => {
            if (!o(I).data && !j.defaultPrevented) {
              const Z = {
                context: l(),
                action: o(I),
                event: j
              };
              o(I).handler && o(I).handler(Z), e.onclick && e.onclick(Z), j.stopPropagation();
            }
          }
        });
      }
    );
    var q = U(M, 2);
    P(q, () => o(I).data && o(v) === o(I).id, (K) => {
      na(K, {
        get css() {
          return d();
        },
        get options() {
          return o(I).data;
        },
        at: "right-overlap",
        get parent() {
          return o(m);
        },
        get context() {
          return l();
        },
        get onclick() {
          return e.onclick;
        }
      });
    }), g(b, A);
  }), Ne(y, (b, I) => Mf(b, I), () => ({ callback: p, modal: !0 })), Te(y, (b) => H(_, b), () => o(_)), O(() => {
    ye(y, `wx-menu ${d() ?? ""} svelte-1tqohog`), J(y, "style", `position:absolute;top:${o(f) ?? ""}px;left:${o(c) ?? ""}px;width:${o(h) ?? ""};z-index:${o(u) ?? ""}`);
  }), He("mouseleave", y, k), g(n, y), re();
}
var ev = /* @__PURE__ */ E('<span data-menu-ignore="true"><!></span>'), tv = /* @__PURE__ */ E("<!> <!>", 1);
function rr(n, e) {
  ne(e, !0);
  let t = S(e, "at", 3, "bottom"), r = S(e, "resolver", 3, null), a = S(e, "dataKey", 3, "contextId"), i = S(e, "filter", 3, null), s = S(e, "css", 3, "");
  var l = /* @__PURE__ */ B(() => Xe(d) !== null && i() ? _o(e.options, (p) => i()(p, Xe(d))) : e.options), d = ae(null), c = ae(null);
  let f = ae(0), u = ae(0);
  function h(p) {
    H(c, null), e.onclick && e.onclick(p);
  }
  function _(p, x) {
    let y = null;
    for (; p && p.dataset && !y; )
      y = p.dataset[x], p = p.parentNode;
    return y ? vo(y) : null;
  }
  function v(p, x) {
    if (!p) {
      H(c, null);
      return;
    }
    if (p.defaultPrevented) return;
    const y = p.target;
    y && y.dataset && y.dataset.menuIgnore || (H(f, p.clientX + 1), H(u, p.clientY + 1), H(d, Q(typeof x < "u" ? x : _(y, a()))), !(r() && (H(d, Q(r()(Xe(d), p))), !Xe(d))) && (H(c, Q(y)), p.preventDefault()));
  }
  var m = tv(), w = V(m);
  P(w, () => e.children, (p) => {
    var x = ev();
    x.__click = v;
    var y = D(x);
    Ee(y, () => e.children ?? De), g(p, x);
  });
  var k = U(w, 2);
  return P(k, () => Xe(c), (p) => {
    Zr(p, { children: (y, b) => {
      let I = () => b?.().mount;
      var A = $(), M = V(A);
      Fi(M, () => Xe(c), (q) => {
        na(q, {
          get css() {
            return s();
          },
          get at() {
            return t();
          },
          get top() {
            return o(u);
          },
          get left() {
            return o(f);
          },
          get mount() {
            return I();
          },
          get parent() {
            return Xe(c);
          },
          get context() {
            return Xe(d);
          },
          onclick: h,
          get options() {
            return Xe(l);
          }
        });
      }), g(y, A);
    }, $$slots: { default: !0 } });
  }), g(n, m), re({ show: v });
}
me(["click"]);
me(["click"]);
var nv = /* @__PURE__ */ E('<span data-menu-ignore="true"><!></span> <!>', 1);
function rv(n, e) {
  ne(e, !0);
  let t = S(e, "at", 3, "bottom"), r = S(e, "css", 3, "");
  const a = (h) => {
    H(i, Q(h.target)), h.preventDefault();
  };
  var i = ae(null);
  function s(h) {
    H(i, null), e.onclick && e.onclick(h);
  }
  function l(h) {
    let _ = h.target;
    for (; !_.dataset.menuIgnore; )
      H(i, Q(_)), _ = _.parentNode;
  }
  var d = nv(), c = V(d);
  c.__click = l;
  var f = D(c);
  Ee(f, () => e.children ?? De);
  var u = U(c, 2);
  return P(u, () => Xe(i), (h) => {
    Zr(h, { children: (v, m) => {
      let w = () => m?.().mount;
      var k = $(), p = V(k);
      Fi(p, () => Xe(i), (x) => {
        na(x, {
          get css() {
            return r();
          },
          get at() {
            return t();
          },
          get mount() {
            return w();
          },
          get parent() {
            return Xe(i);
          },
          get options() {
            return e.options;
          },
          onclick: s
        });
      }), g(v, k);
    }, $$slots: { default: !0 } });
  }), g(n, d), re({ handler: a });
}
me(["click"]);
me(["contextmenu"]);
var av = /* @__PURE__ */ E('<div class="wx-list-wrapper svelte-jco5m0" data-id="virtual-content"><div class="wx-content svelte-jco5m0"><!></div></div>');
function iv(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(_, "$cardHeight", t), a = () => ce(h, "$rows", t), i = () => ce(u, "$columns", t), s = () => ce(f, "$_cardsMap", t), l = () => ce(v, "$cards", t), d = () => ce(m, "$columnKey", t), c = he("wx-kanban-store"), {
    _cardsMap: f,
    columns: u,
    rows: h,
    cardHeight: _,
    cards: v,
    columnKey: m,
    _scroll: w
  } = c.getReactiveState(), k = 10, p = /* @__PURE__ */ B(() => r() + k), x = /* @__PURE__ */ B(() => o(p) * 2);
  let y = ae(void 0), b = ae(0), I = ae(Q({})), A = ae(0), M = ae(1), q = ae(0), K = ae(0);
  function j() {
    const C = {};
    return H(b, Q(a().reduce(
      (F, Y) => {
        if (Y.collapsed)
          return F;
        const W = i().reduce(
          (ee, ie) => {
            const de = Oe(ie.id, Y.id), X = s()[de].length;
            return X > ee && (ee = X), ee;
          },
          0
        );
        return C[Y.id] = {
          id: Y.id,
          maxCardsCount: W,
          minIndex: F,
          maxIndex: F + W,
          startIndex: 0,
          endIndex: 0,
          visible: !0
        }, F + W;
      },
      0
    ))), G(), H(q, o(A) * o(p)), H(K, (o(b) - o(M)) * o(p)), C;
  }
  async function Z(C) {
    if (o(y).querySelector(`[data-drag-item="${C}"]`))
      return;
    const Y = l().find((X) => se(X.id, C)), W = Bn(Y, d()), ee = s()[W].findIndex((X) => se(X.id, C)), ie = i().findIndex((X) => X.id == W), de = parseFloat(getComputedStyle(o(y)).getPropertyValue("--wx-kanban-column-width")) || 300;
    return ee > -1 ? (await kt(), o(y).scrollTop = ee * o(p), o(y).scrollLeft = de * ie, !0) : !1;
  }
  function G() {
    const C = o(y).scrollTop - o(x), F = Math.floor(C < 0 ? 0 : C / o(p)), Y = F + Math.floor((o(y).offsetHeight + o(x) * 2) / o(p));
    if (Y >= o(b)) {
      H(A, Q(F)), H(M, Q(o(b)));
      return;
    }
    H(A, Q(F)), H(M, Y);
  }
  function R(C, F, Y) {
    const W = {};
    a().forEach((ee) => {
      const ie = C[ee.id] || { ...o(I)[ee.id] }, de = F - ie.minIndex, X = de + (Y - F);
      ie.startIndex = de < 0 ? 0 : de, ie.endIndex = X > ie.maxIndex ? ie.maxIndex : X, ie.visible = de <= ie.maxIndex && X >= 0, ee.collapsed && (ie.visible = !0), W[ee.id] = ie;
    }), H(I, Q(W));
  }
  function T() {
    G();
  }
  gt(() => {
    a(), o(A), o(M), s() && ke(() => {
      const C = j();
      R(C, o(A), o(M));
    });
  }), w.subscribe((C) => {
    o(y) && C?.to === "card" && C.id && Z(C.id).then((F) => {
      F && c.exec("scroll", null);
    });
  });
  var L = av(), z = D(L), N = D(z);
  Ee(N, () => e.children ?? De, () => ({
    startIndex: o(A),
    endIndex: o(M),
    byRow: o(I)
  })), Te(L, (C) => H(y, C), () => o(y)), Ne(L, (C) => ea(C)), O(() => J(z, "style", `padding-top:${o(q) ?? ""}px;padding-bottom:${o(K) ?? ""}px;`)), He("scroll", L, T), g(n, L), re();
}
function ov(n, e) {
  ne(e, !1);
  const t = he("wx-i18n"), r = t.getGroup("kanban");
  return zi(), ya(e, "locale", t), ya(e, "_", r), re({ locale: t, _: r });
}
var sv = /* @__PURE__ */ E('<img class="svelte-4yp8c0">'), lv = /* @__PURE__ */ E("<div><!></div>");
function jt(n, e) {
  ne(e, !0);
  let t = S(e, "data", 19, () => ({ label: "", avatar: "", avatarColor: "" })), r = S(e, "noTransform", 3, !1), a = S(e, "size", 3, "normal");
  const i = /* @__PURE__ */ B(() => t().label.split(" ").map((c) => c[0]).join("")), s = /* @__PURE__ */ B(() => `${t().avatarColor ? `background: ${t().avatarColor};` : ""}`);
  var l = lv(), d = D(l);
  P(
    d,
    () => t().avatar,
    (c) => {
      var f = sv();
      O(() => {
        J(f, "src", t().avatar), J(f, "alt", t().label);
      }), g(c, f);
    },
    (c) => {
      var f = $(), u = V(f);
      P(
        u,
        r,
        (h) => {
          var _ = Se();
          O(() => te(_, t().label)), g(h, _);
        },
        (h) => {
          var _ = Se();
          O(() => te(_, o(i))), g(h, _);
        },
        !0
      ), g(c, f);
    }
  ), O(() => {
    ye(l, `wx-user ${a() ?? ""} svelte-4yp8c0`), J(l, "style", o(s)), ve(l, "wx-transform", !t().avatarColor);
  }), g(n, l), re();
}
var cv = /* @__PURE__ */ E('<div class="wx-menu svelte-gu515o"><!></div>'), dv = /* @__PURE__ */ E('<!> <div class="wx-edit-btns svelte-gu515o"><div class="wx-comment-textarea-btn svelte-gu515o"><!></div> <div class="wx-comment-textarea-btn svelte-gu515o"><!></div></div>', 1), uv = /* @__PURE__ */ E('<pre class="wx-text svelte-gu515o"> </pre>'), fv = /* @__PURE__ */ E('<div class="wx-comment svelte-gu515o"><div class="wx-comment-icon svelte-gu515o"><!></div> <div class="wx-content svelte-gu515o"><div class="wx-comment-header svelte-gu515o"><div class="wx-name svelte-gu515o"> </div> <!></div> <div class="wx-date svelte-gu515o"> </div> <!></div></div>'), vv = /* @__PURE__ */ E('<div class="wx-comment-list svelte-gu515o"></div>'), hv = /* @__PURE__ */ E('<div class="wx-kanban-no-comments svelte-gu515o"> </div>'), mv = /* @__PURE__ */ E('<div class="wx-new-comment-wrapper svelte-gu515o"><div class="wx-new-comment svelte-gu515o"><div class="wx-comment-icon svelte-gu515o"><!></div> <!></div> <div class="wx-comment-textarea-btn svelte-gu515o"><!> <!></div></div>'), gv = /* @__PURE__ */ E('<div class="wx-comments svelte-gu515o"><!> <!> <!></div>');
function wo(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(_, "$selected", t), a = () => ce(h, "$currentUser", t);
  let i = S(e, "comments", 7), s = S(e, "users", 19, () => []), l = S(e, "handleViewChange", 3, null);
  const d = he("wx-kanban-store"), c = he("wx-i18n"), f = c.getGroup("kanban"), { showModal: u } = he("wx-helpers"), { currentUser: h, selected: _ } = d.getReactiveState(), v = /* @__PURE__ */ B(() => r()?.[0]), m = e.shape.config || {}, w = s().reduce(
    (N, C) => (N[C.id] = C, N),
    {}
  ), k = m.format || "%M %d %Y %h:%i", p = qn(k, c.getRaw().calendar);
  let x = ae("");
  function y() {
    o(x) && d.exec("add-comment", {
      id: Gr(),
      cardId: o(v),
      comment: {
        text: o(x),
        date: /* @__PURE__ */ new Date()
      }
    }).then(() => {
      i(d.getCard(o(v)).comments), H(x, "");
    });
  }
  let b = ae(null), I = ae(null);
  function A(N) {
    H(b, Q(N.id)), H(I, Q(N.text));
  }
  function M() {
    o(I) && d.exec("update-comment", {
      cardId: o(v),
      id: o(b),
      comment: { text: o(I) }
    }).then(() => {
      i(d.getCard(o(v)).comments);
    }), q();
  }
  function q() {
    H(b, null), H(I, null);
  }
  function K(N) {
    (m.confirmDeletion ?? !0 ? u({
      message: f("Would you like to delete this comment?")
    }) : Promise.resolve()).then(() => {
      d.exec("delete-comment", { cardId: o(v), id: N }).then(() => {
        i(d.getCard(o(v)).comments);
      });
    }).catch(() => {
    });
  }
  function j(N) {
    const { context: C, action: F } = N;
    if (F)
      switch (F.id) {
        case "edit-comment":
          A(i().find((Y) => Y.id == C));
          break;
        case "delete-comment":
          K(C);
          break;
      }
  }
  let Z = ae(null);
  const G = [
    {
      id: "edit-comment",
      text: f("Edit"),
      icon: "wxi-edit-outline"
    },
    {
      id: "delete-comment",
      text: f("Delete"),
      icon: "wxi-delete-outline"
    }
  ];
  var R = gv(), T = D(R);
  P(
    T,
    () => i().length,
    (N) => {
      var C = vv();
      C.__click = function(...F) {
        o(Z).show?.apply(this, F);
      }, Ie(C, 21, i, (F) => F.id, (F, Y) => {
        var W = fv(), ee = D(W), ie = D(ee);
        jt(ie, {
          size: "small",
          get data() {
            return w[o(Y).userId];
          }
        });
        var de = U(ee, 2), X = D(de), oe = D(X), le = D(oe), fe = U(oe, 2);
        P(fe, () => o(b) !== o(Y).id && se(o(Y).userId, a()), (be) => {
          var xe = cv(), we = D(xe);
          Me(we, { css: "wxi-dots-v" }), O(() => J(xe, "data-menu-id", o(Y).id)), g(be, xe);
        });
        var ge = U(X, 2), ue = D(ge);
        O(() => te(ue, p(o(Y).date)));
        var _e = U(ge, 2);
        P(
          _e,
          () => se(o(b), o(Y).id),
          (be) => {
            var xe = dv(), we = V(xe);
            xr(we, {
              get value() {
                return o(I);
              },
              set value(tt) {
                H(I, Q(tt));
              }
            });
            var Le = U(we, 2), Pe = D(Le), Be = D(Pe);
            Re(Be, {
              type: "secondary",
              onclick: q,
              children: (tt, qe) => {
                var nt = Se();
                O(() => te(nt, f("Cancel"))), g(tt, nt);
              },
              $$slots: { default: !0 }
            });
            var Pt = U(Pe, 2), et = D(Pt);
            Re(et, {
              type: "primary",
              onclick: M,
              children: (tt, qe) => {
                var nt = Se();
                O(() => te(nt, f("Save"))), g(tt, nt);
              },
              $$slots: { default: !0 }
            }), g(be, xe);
          },
          (be) => {
            var xe = $(), we = V(xe);
            P(
              we,
              () => o(Y).html && m.html,
              (Le) => {
                var Pe = $(), Be = V(Pe);
                Xn(Be, () => o(Y).html), g(Le, Pe);
              },
              (Le) => {
                var Pe = uv(), Be = D(Pe);
                O(() => te(Be, o(Y).text)), g(Le, Pe);
              },
              !0
            ), g(be, xe);
          }
        ), O(() => {
          J(W, "data-comment-id", o(Y).id), te(le, w[o(Y).userId].label);
        }), g(F, W);
      }), g(N, C);
    },
    (N) => {
      var C = $(), F = V(C);
      P(
        F,
        () => !a(),
        (Y) => {
          var W = hv(), ee = D(W);
          O(() => te(ee, f("No comments yet"))), g(Y, W);
        },
        null,
        !0
      ), g(N, C);
    }
  );
  var L = U(T, 2);
  Te(
    rr(L, {
      at: "left-bottom",
      options: G,
      resolver: (N) => N,
      dataKey: "menuId",
      onclick: j
    }),
    (N) => H(Z, Q(N)),
    () => o(Z)
  );
  var z = U(L, 2);
  P(z, () => a() && !o(b), (N) => {
    var C = mv(), F = D(C), Y = D(F), W = D(Y);
    jt(W, {
      size: "small",
      get data() {
        return w[a()];
      }
    });
    var ee = U(Y, 2), ie = /* @__PURE__ */ B(() => f("Add a comment..."));
    xr(ee, {
      get value() {
        return o(x);
      },
      set value(fe) {
        H(x, Q(fe));
      },
      get placeholder() {
        return o(ie);
      }
    });
    var de = U(F, 2), X = D(de), oe = /* @__PURE__ */ B(() => !o(x));
    Re(X, {
      get disabled() {
        return o(oe);
      },
      type: "primary",
      onclick: y,
      children: (fe, ge) => {
        var ue = Se();
        O(() => te(ue, f("Send"))), g(fe, ue);
      },
      $$slots: { default: !0 }
    });
    var le = U(X, 2);
    P(le, () => m.placement === "page" && e.placement === "modal", (fe) => {
      Re(fe, {
        type: "secondary",
        onclick: () => l()("main"),
        children: (ge, ue) => {
          var _e = Se();
          O(() => te(_e, f("Back"))), g(ge, _e);
        },
        $$slots: { default: !0 }
      });
    }), g(N, C);
  }), g(n, R), re();
}
me(["click"]);
const _v = "wx-uploader-api", wv = {
  uploader: {
    B: "B",
    KB: "KB",
    MB: "MB",
    GB: "GB",
    TB: "TB",
    PB: "PB",
    EB: "EB",
    "Drop files here or": "Drop files here or",
    "select files": "select files"
  }
};
function Ga(n, e) {
  Array.from(n.target.files).forEach((r) => e(r));
}
var yv = /* @__PURE__ */ E('<input type="file" class="input svelte-15jokro"> <!>', 1), xv = /* @__PURE__ */ E('<div class="dropzone svelte-15jokro"><span> <span class="action svelte-15jokro"> </span></span></div>'), bv = /* @__PURE__ */ E('<div class="label svelte-15jokro"><input type="file" class="input svelte-15jokro"> <!></div>');
function pv(n, e) {
  ne(e, !0);
  let t = S(e, "data", 31, () => Q([])), r = S(e, "ready", 31, () => Q(new Promise(() => ({})))), a = S(e, "accept", 3, ""), i = S(e, "multiple", 3, !0), s = S(e, "folder", 3, !1), l = S(e, "uploadURL", 3, ""), d = S(e, "apiOnly", 3, !1), c = S(e, "disabled", 3, !1), f = ae(void 0), u = ae(void 0), h = 0, _ = {}, v = he("wx-i18n");
  v || (v = yn(wv), wt("wx-i18n", v));
  const m = he("wx-i18n").getGroup("uploader"), w = (G, R) => {
    c() || (R = R || {}, G.addEventListener("dragenter", () => {
      R.dragEnter && R.dragEnter(), M();
    }), G.addEventListener("dragleave", () => {
      R.dragEnter && R.dragLeave(), q();
    }), G.addEventListener("dragover", (T) => T.preventDefault(), !0), G.addEventListener(
      "drop",
      (T) => {
        T.preventDefault(), _ = R, k(T), R.dragEnter && R.dragLeave();
      },
      !0
    ));
  };
  vt(() => {
    o(f).webkitdirectory = s();
  });
  function k(G) {
    Array.from(G.dataTransfer.items).forEach((T) => {
      const L = T.webkitGetAsEntry();
      L && p(L);
    }), H(u, !1), h = 0;
  }
  function p(G, R) {
    R = R || "", G.isFile ? G.file((T) => {
      x(T);
    }) : G.isDirectory && G.createReader().readEntries((L) => {
      L.forEach((z) => {
        p(z, R + z.name + "/");
      });
    });
  }
  function x(G) {
    const R = {
      ..._,
      id: wn(),
      status: "client",
      name: G.name,
      file: G
    };
    R.selected && R.selected(R), e.onchange && e.onchange(R), i() ? t([...t(), R]) : t([R]), b(R), o(f).value = "";
  }
  function y(G) {
    const R = new FormData();
    R.append("upload", G.file);
    const T = { method: "POST", body: R };
    return fetch(l(), T).then((L) => L.json()).then((L) => ({ id: G.id, ...L }), () => ({ id: G.id, status: "error" })).catch((L) => console.log(L));
  }
  function b(G) {
    if (!G) return;
    const R = typeof l() == "function" ? l()(G) : y(G);
    r(R.then((T) => {
      T.status = T.status || "server", A(G.id, T);
    }).catch((T) => {
      A(G.id, { status: "error", error: T });
    }));
  }
  function I() {
    let G = "server";
    for (let R = 0; R < t().length; (R += 1) - 1) {
      if (t()[R].status === "client") return "client";
      t()[R].status === "error" && (G = "error");
    }
    return G;
  }
  function A(G, R) {
    const T = t().findIndex((N) => N.id == G), L = t(t()[T] = { ...t()[T], ...R }, !0), z = { ...L, status: I() };
    L && L.uploaded && L.uploaded(z), e.onupload && e.onupload(z), L.temp && t(t().filter((N) => N.id != G));
  }
  function M() {
    h === 0 && H(u, !0), h += 1;
  }
  function q() {
    h -= 1, h === 0 && H(u, !1);
  }
  function K(G) {
    _ = G || {}, o(f).click();
  }
  wt(_v, { open: K, getState: I, droparea: w });
  var j = $(), Z = V(j);
  return P(
    Z,
    d,
    (G) => {
      var R = yv(), T = V(R);
      T.__change = [Ga, x], Te(T, (z) => H(f, z), () => o(f));
      var L = U(T, 2);
      Ee(L, () => e.children ?? De), O(() => {
        J(T, "accept", a()), T.multiple = i(), T.disabled = c();
      }), g(G, R);
    },
    (G) => {
      var R = bv(), T = D(R);
      T.__change = [Ga, x], Te(T, (z) => H(f, z), () => o(f));
      var L = U(T, 2);
      P(
        L,
        () => e.children,
        (z) => {
          var N = $(), C = V(N);
          Ee(C, () => e.children, () => ({ open: K })), g(z, N);
        },
        (z) => {
          var N = xv(), C = D(N), F = D(C);
          O(() => te(F, `${m("Drop files here or") ?? ""}  `));
          var Y = U(F);
          Y.__click = K;
          var W = D(Y);
          O(() => te(W, m("select files"))), g(z, N);
        }
      ), Ne(R, (z) => w(z)), O(() => {
        ve(R, "active", o(u)), ve(R, "wx-disabled", c()), J(T, "accept", a()), T.multiple = i(), T.disabled = c();
      }), g(G, R);
    }
  ), g(n, j), re({ droparea: w, getState: I, open: K });
}
me(["change", "click"]);
me(["click"]);
var kv = /* @__PURE__ */ E('<div class="wx-thumb svelte-l8op85"></div>'), Sv = /* @__PURE__ */ E('<div class="wx-size"> </div>'), Iv = /* @__PURE__ */ E("<!> <!>", 1), Ev = /* @__PURE__ */ E('<div class="wx-hidden svelte-l8op85"><a class="wx-upload-link svelte-l8op85" target="_blank" rel="noreferrer nofollow noopener"><!></a> <!> <!></div>'), Dv = /* @__PURE__ */ E('<div class="wx-row svelte-l8op85"><div class="wx-file-icon svelte-l8op85"><!></div> <div class="wx-name svelte-l8op85"> </div> <!> <div class="wx-controls svelte-l8op85"><!></div></div>'), Cv = /* @__PURE__ */ E('<div class="wx-layout svelte-l8op85"><div class="wx-header svelte-l8op85"><!></div> <div class="wx-list svelte-l8op85"></div></div>');
function Mv(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(e.data, "$data", t), a = he("wx-i18n").getGroup("kanban"), i = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
  function s() {
    e.data.set([]);
  }
  function l(v) {
    e.data.update((m) => m.filter((w) => w.id !== v));
  }
  function d(v) {
    let m = 0;
    for (; v > 1024; )
      m += 1, v = v / 1024;
    return Math.round(v * 100) / 100 + " " + a(i[m]);
  }
  function c(v) {
    const m = v?.url?.split(".").pop(), w = v?.previewURL?.split(".").pop();
    return Oa(w) || Oa(m);
  }
  function f(v) {
    e.data.update((m) => m.map((w) => {
      if (w.id === v)
        return { ...w, isCover: !0 };
      {
        const k = { ...w };
        return delete k.isCover, k;
      }
    }));
  }
  function u() {
    e.data.update((v) => v.map((m) => {
      const w = { ...m };
      return delete w.isCover, w;
    }));
  }
  var h = $(), _ = V(h);
  P(_, () => r().length, (v) => {
    var m = Cv(), w = D(m), k = D(w);
    Me(k, { css: "wxi-close", onclick: s });
    var p = U(w, 2);
    Ie(p, 5, r, (x) => x.id, (x, y) => {
      var b = Dv(), I = D(b), A = D(I);
      P(
        A,
        () => c(o(y)),
        (G) => {
          var R = kv();
          O(() => J(R, "style", `background-image: url('${(o(y).previewURL || o(y).url) ?? ""}')`)), g(G, R);
        },
        (G) => {
          Me(G, { css: "wxi-paperclip" });
        }
      );
      var M = U(I, 2), q = D(M), K = U(M, 2);
      P(K, () => o(y).size, (G) => {
        var R = Sv(), T = D(R);
        O(() => te(T, d(o(y).size))), g(G, R);
      });
      var j = U(K, 2), Z = D(j);
      P(
        Z,
        () => o(y).status === "client",
        (G) => {
          Me(G, { css: "wxi-loading wx-spin" });
        },
        (G) => {
          var R = $(), T = V(R);
          P(
            T,
            () => o(y).status === "error",
            (L) => {
              var z = Iv(), N = V(z);
              Me(N, { css: "wxi-alert" });
              var C = U(N, 2);
              Me(C, {
                css: "wxi-delete-outline",
                onclick: () => l(o(y).id)
              }), g(L, z);
            },
            (L) => {
              var z = $(), N = V(z);
              P(
                N,
                () => !o(y).status || o(y).status === "server",
                (C) => {
                  var F = Ev(), Y = D(F), W = D(Y);
                  Me(W, { css: "wxi-external" });
                  var ee = U(Y, 2);
                  Me(ee, {
                    css: "wxi-delete-outline",
                    onclick: () => l(o(y).id)
                  });
                  var ie = U(ee, 2);
                  P(ie, () => c(o(y)), (de) => {
                    var X = $(), oe = V(X);
                    P(
                      oe,
                      () => !o(y).isCover,
                      (le) => {
                        Re(le, {
                          onclick: () => f(o(y).id),
                          children: (fe, ge) => {
                            var ue = Se();
                            O(() => te(ue, a("Make cover"))), g(fe, ue);
                          },
                          $$slots: { default: !0 }
                        });
                      },
                      (le) => {
                        Re(le, {
                          onclick: u,
                          children: (fe, ge) => {
                            var ue = Se();
                            O(() => te(ue, a("Remove cover"))), g(fe, ue);
                          },
                          $$slots: { default: !0 }
                        });
                      }
                    ), g(de, X);
                  }), O(() => {
                    J(Y, "href", o(y).url), J(Y, "download", o(y).name);
                  }), g(C, F);
                },
                null,
                !0
              ), g(L, z);
            },
            !0
          ), g(G, R);
        }
      ), O(() => te(q, o(y).name)), g(x, b);
    }), g(v, m);
  }), g(n, h), re();
}
var Av = /* @__PURE__ */ E('<div class="wx-files-control svelte-1vstfbt"><!>  <!></div>');
function Tv(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(a, "$files", t);
  let a = Jr(null);
  const i = e.values.subscribe((u) => {
    a.set(u[e.field.key] || []);
  });
  function s(u) {
    e.values.update((h) => {
      const _ = u.filter((v) => v.status !== "error").map((v) => {
        const m = { ...v };
        return delete m.__root, v.file && (m.size = v.file.size, delete m.file), m;
      });
      return h[e.field.key] = _, h;
    });
  }
  const l = a.subscribe((u) => {
    u.find((h) => h.status === "client") || s(u);
  });
  Kr(() => {
    l(), i();
  });
  var d = Av(), c = D(d);
  Mv(c, { data: a });
  var f = U(c, 2);
  pv(f, We(
    {
      get data() {
        return Is(), r();
      },
      set data(u) {
        Ss(a, Q(u));
      }
    },
    () => e.field
  )), g(n, d), re();
}
function Pv(n, e) {
  H(e, !0);
}
var Rv = /* @__PURE__ */ E('<!> <div class="wx-buttons svelte-d1z2io"><!> <!> <!></div>', 1), Lv = /* @__PURE__ */ E('<div class="wx-layout svelte-d1z2io"><!> <div class="wx-input-icon svelte-d1z2io"><!></div> <!></div>');
function Fv(n, e) {
  ne(e, !0);
  let t = S(e, "start", 15, null), r = S(e, "end", 15, null), a = S(e, "id", 19, wn);
  const i = he("wx-i18n").getGroup("calendar");
  let s = ae(void 0), l = typeof e.format == "function" ? e.format : qn(e.format, i);
  function d(p) {
    p.stopPropagation(), H(s, null);
  }
  function c() {
    const p = /* @__PURE__ */ new Date();
    t(p), r(p);
  }
  function f() {
    t(null), r(null);
  }
  const u = /* @__PURE__ */ B(() => t() ? l(t()) + (r() ? ` - ${l(r())}` : "") : "");
  let h = ae(void 0);
  var _ = Lv();
  He("scroll", Fn, d), _.__click = [Pv, s];
  var v = D(_);
  tr(v, {
    get value() {
      return o(u);
    },
    get id() {
      return a();
    },
    readonly: !0,
    inputStyle: "cursor: pointer; text-overflow: ellipsis; padding-right: 18px;"
  });
  var m = U(v, 2), w = D(m);
  Me(w, { css: "wxi-calendar" });
  var k = U(m, 2);
  P(k, () => o(s), (p) => {
    Zr(p, {
      get target() {
        return o(h);
      },
      children: (x, y) => {
        At(x, {
          oncancel: d,
          width: "unset",
          children: (b, I) => {
            var A = Rv(), M = V(A);
            dd(M, {
              get start() {
                return t();
              },
              set start(G) {
                t(G);
              },
              get end() {
                return r();
              },
              set end(G) {
                r(G);
              },
              buttons: !1
            });
            var q = U(M, 2), K = D(q);
            Re(K, {
              type: "link",
              css: "wx-calendar-btn",
              onclick: f,
              children: (G, R) => {
                var T = Se("Clear");
                g(G, T);
              },
              $$slots: { default: !0 }
            });
            var j = U(K, 2);
            Re(j, {
              type: "link",
              css: " wx-calendar-btn",
              onclick: c,
              children: (G, R) => {
                var T = Se("Today");
                g(G, T);
              },
              $$slots: { default: !0 }
            });
            var Z = U(j, 2);
            Re(Z, {
              type: "primary",
              css: " wx-calendar-btn",
              onclick: d,
              children: (G, R) => {
                var T = Se("Done");
                g(G, T);
              },
              $$slots: { default: !0 }
            }), g(b, A);
          },
          $$slots: { default: !0 }
        });
      },
      $$slots: { default: !0 }
    });
  }), Te(_, (p) => H(h, p), () => o(h)), g(n, _), re();
}
me(["click"]);
function Ov(n, e) {
  ne(e, !0);
  let t = S(e, "start", 15), r = S(e, "end", 15), a = S(e, "id", 19, wn);
  Fv(n, {
    get start() {
      return t();
    },
    set start(i) {
      t(i);
    },
    get end() {
      return r();
    },
    set end(i) {
      r(i);
    },
    get id() {
      return a();
    },
    get format() {
      return e.format;
    }
  }), re();
}
function Nv(n, e) {
  e(n.target.value);
}
var Bv = /* @__PURE__ */ E('<input type="text" class="wx-title svelte-18nf24j">');
function zv(n, e) {
  ne(e, !0);
  let t = S(e, "id", 19, () => String(Cl())), r = S(e, "value", 15, ""), a = S(e, "focus", 3, !1), i = S(e, "placeholder", 3, ""), s = S(e, "readonly", 3, !1), l = S(e, "disabled", 3, !1);
  function d(f) {
    a() && f.focus();
  }
  var c = Bv();
  c.__input = [Nv, r], Ne(c, (f) => d(f)), O(() => {
    J(c, "id", t()), Ht(c, r()), J(c, "placeholder", i()), c.readOnly = s(), c.disabled = l();
  }), g(n, c), re();
}
me(["input"]);
function Hv(n, e) {
  H(e, !0);
}
var qv = (n, e, t) => e(o(t)), Uv = /* @__PURE__ */ E('<div class="wx-link svelte-qfer4l"><div class="wx-link-content"><div class="wx-relates svelte-qfer4l"> </div> <div class="wx-task svelte-qfer4l"> </div></div> <div class="wx-delete-icon svelte-qfer4l"><!></div></div>'), Yv = /* @__PURE__ */ E('<div class="wx-set-link svelte-qfer4l"><div class="wx-combos-wrapper svelte-qfer4l"><div class="wx-relates-combo svelte-qfer4l"><!></div> <div class="wx-tasks-combo svelte-qfer4l"><!></div></div> <div class="wx-btns-wrapper svelte-qfer4l"><div class="wx-cancel-btn"><!></div> <div class="wx-link-btn svelte-qfer4l"><!></div></div></div>'), Kv = /* @__PURE__ */ E('<div><!> <!> <div class="wx-add-link svelte-qfer4l"><!> <span> </span></div></div>');
function Gv(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(d, "$cards", t), a = () => ce(c, "$links", t), i = he("wx-kanban-store"), s = he("wx-i18n").getGroup("kanban"), { showModal: l } = he("wx-helpers"), { cards: d, links: c } = i.getReactiveState(), f = [
    {
      id: 1,
      relation: "relatesTo",
      source: !1,
      label: s("Relates to")
    },
    {
      id: 2,
      relation: "requiredFor",
      source: !0,
      label: s("Is required for")
    },
    {
      id: 3,
      relation: "requiredFor",
      source: !1,
      label: s("Depends on")
    },
    {
      id: 4,
      relation: "duplicate",
      source: !0,
      label: s("Duplicates")
    },
    {
      id: 5,
      relation: "duplicate",
      source: !1,
      label: s("Is duplicated by")
    },
    {
      id: 6,
      relation: "parent",
      source: !0,
      label: s("Is parent for")
    },
    {
      id: 7,
      relation: "parent",
      source: !1,
      label: s("Is subtask of")
    }
  ];
  let u = ae(null);
  const h = /* @__PURE__ */ B(() => f.find((L) => se(L.id, o(u)))?.relation);
  let _ = ae(null), v = ae(!1);
  const m = e.shape.config || {}, w = /* @__PURE__ */ B(() => (r(), a().filter((L) => se(L.source, e.card.id) && i.getCard(L.target) || se(L.target, e.card.id) && i.getCard(L.source)).map((L) => {
    const z = { ...L };
    return z.isSource = se(z.source, e.card.id), z.label = f.find((N) => N.relation === z.relation && (z.relation === "relatesTo" || z.isSource === N.source)).label, z;
  }))), k = /* @__PURE__ */ B(() => {
    if (!o(w)) return !1;
    let L = r().filter((z) => !se(z.id, e.card.id));
    return o(h) && (L = L.filter((z) => !o(w).find((N) => (se(z.id, N.target) && se(N.source, e.card.id) || se(z.id, N.source) && se(N.target, e.card.id)) && N.relation === o(h)))), L;
  });
  function p() {
    H(v, !1), H(_, Q(H(u, "")));
  }
  function x(L) {
    const z = L.isSource ? "target" : "source";
    return i.getCard(L[z]).label;
  }
  function y() {
    if (o(u) && o(_)) {
      const L = f.find((z) => se(z.id, o(u))).source;
      i.exec("add-link", {
        link: {
          source: L ? e.card.id : o(_),
          target: L ? o(_) : e.card.id,
          relation: o(h)
        }
      }), p();
    }
  }
  function b(L) {
    (m.confirmDeletion ?? !0 ? l({
      message: s("Would you like to delete this link?")
    }) : Promise.resolve()).then(() => {
      i.exec("delete-link", { id: L });
    }).catch(() => {
    });
  }
  function I(L) {
    H(u, Q(L.value)), H(_, "");
  }
  function A(L) {
    H(_, Q(L.value));
  }
  function M(L) {
    const z = L.isSource ? "target" : "source";
    i.exec("select-card", { id: L[z] });
  }
  var q = Kv(), K = D(q);
  Ie(K, 17, () => o(w), (L) => L.id, (L, z) => {
    var N = Uv(), C = D(N), F = D(C), Y = D(F), W = U(F, 2);
    W.__click = [qv, M, z];
    var ee = D(W);
    O(() => te(ee, x(o(z))));
    var ie = U(C, 2), de = D(ie);
    Me(de, {
      css: "wxi-delete-outline",
      onclick: () => b(o(z).id)
    }), O(() => te(Y, o(z).label)), g(L, N);
  });
  var j = U(K, 2);
  P(j, () => o(v), (L) => {
    var z = Yv(), N = D(z), C = D(N), F = D(C), Y = /* @__PURE__ */ B(() => s("Select a relation"));
    br(F, {
      options: f,
      get value() {
        return o(u);
      },
      get placeholder() {
        return o(Y);
      },
      onchange: I,
      children: (_e, be) => {
        let xe = () => be?.().option;
        var we = Se();
        O(() => te(we, xe().label)), g(_e, we);
      },
      $$slots: { default: !0 }
    });
    var W = U(C, 2), ee = D(W), ie = /* @__PURE__ */ B(() => s("Select a task")), de = /* @__PURE__ */ B(() => !o(u));
    br(ee, {
      get options() {
        return o(k);
      },
      get value() {
        return o(_);
      },
      get placeholder() {
        return o(ie);
      },
      get disabled() {
        return o(de);
      },
      onchange: A,
      children: (_e, be) => {
        let xe = () => be?.().option;
        var we = Se();
        O(() => te(we, xe().label)), g(_e, we);
      },
      $$slots: { default: !0 }
    });
    var X = U(N, 2), oe = D(X), le = D(oe);
    Re(le, {
      type: "secondary block",
      onclick: p,
      children: (ue, _e) => {
        var be = Se();
        O(() => te(be, s("Cancel"))), g(ue, be);
      },
      $$slots: { default: !0 }
    });
    var fe = U(oe, 2), ge = D(fe);
    Re(ge, {
      type: "primary block",
      onclick: y,
      children: (ue, _e) => {
        var be = Se();
        O(() => te(be, s("Link Task"))), g(ue, be);
      },
      $$slots: { default: !0 }
    }), g(L, z);
  });
  var Z = U(j, 2);
  Z.__click = [Hv, v];
  var G = D(Z);
  Me(G, { css: "wxi-plus" });
  var R = U(G, 2), T = D(R);
  O(() => te(T, s("Add link"))), O(() => ye(q, `wx-links ${e.fieldPlace ?? ""} svelte-qfer4l`)), g(n, q), re();
}
me(["click"]);
var Vv = /* @__PURE__ */ E('<div class="wx-color svelte-1c331lt"></div>'), Wv = /* @__PURE__ */ E('<div class="wx-combo-option svelte-1c331lt"><!> </div>'), jv = /* @__PURE__ */ E('<div class="wx-color svelte-1c331lt"></div>'), Zv = /* @__PURE__ */ E('<div class="wx-multiselect-option svelte-1c331lt"><!> <span class="wx-multiselect-label svelte-1c331lt"> </span></div>'), Jv = /* @__PURE__ */ E('<div class="links svelte-1c331lt"><!></div>'), Qv = /* @__PURE__ */ E("<div><!></div>");
function Va(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(e.values, "$values", t);
  let a = S(e, "fields", 19, () => []), i = S(e, "fieldsPlace", 3, "right");
  const s = he("wx-i18n").getGroup("kanban"), l = e.api.getState().cardShape.users?.values;
  var d = $(), c = V(d);
  Ie(c, 17, a, (f) => f.id, (f, u) => {
    var h = $(), _ = V(h);
    P(
      _,
      () => o(u).type === "text",
      (v) => {
        var m = /* @__PURE__ */ B(() => s(o(u).label));
        je(v, {
          get label() {
            return o(m);
          },
          position: "top",
          children: (k, p) => {
            let x = () => p?.().id;
            tr(k, We(
              {
                get id() {
                  return x();
                },
                get value() {
                  return r()[o(u).key];
                },
                set value(y) {
                  rt(e.values, ke(r)[o(u).key] = y, ke(r));
                },
                focus: !0
              },
              () => o(u).config
            ));
          },
          $$slots: { default: !0 }
        });
      },
      (v) => {
        var m = $(), w = V(m);
        P(
          w,
          () => o(u).type === "title",
          (k) => {
            je(k, { children: (x, y) => {
              let b = () => y?.().id;
              zv(x, We(
                {
                  get id() {
                    return b();
                  },
                  get value() {
                    return r()[o(u).key];
                  },
                  set value(I) {
                    rt(e.values, ke(r)[o(u).key] = I, ke(r));
                  },
                  focus: !0
                },
                () => o(u).config
              ));
            }, $$slots: { default: !0 } });
          },
          (k) => {
            var p = $(), x = V(p);
            P(
              x,
              () => o(u).type === "textarea",
              (y) => {
                var b = /* @__PURE__ */ B(() => s(o(u).label));
                je(y, {
                  get label() {
                    return o(b);
                  },
                  position: "top",
                  children: (A, M) => {
                    let q = () => M?.().id;
                    var K = /* @__PURE__ */ B(() => i() === "right");
                    xr(A, We(
                      {
                        get id() {
                          return q();
                        },
                        get value() {
                          return r()[o(u).key];
                        },
                        set value(j) {
                          rt(e.values, ke(r)[o(u).key] = j, ke(r));
                        }
                      },
                      () => o(u).config,
                      {
                        get resize() {
                          return o(K);
                        }
                      }
                    ));
                  },
                  $$slots: { default: !0 }
                });
              },
              (y) => {
                var b = $(), I = V(b);
                P(
                  I,
                  () => o(u).type === "progress",
                  (A) => {
                    var M = /* @__PURE__ */ B(() => `${s(o(u).label)} ${r()[o(u).key]}%`);
                    je(A, {
                      get label() {
                        return o(M);
                      },
                      position: "top",
                      children: (K, j) => {
                        let Z = () => j?.().id;
                        Md(K, We(
                          {
                            get id() {
                              return Z();
                            },
                            get value() {
                              return r()[o(u).key];
                            },
                            set value(G) {
                              rt(e.values, ke(r)[o(u).key] = G, ke(r));
                            }
                          },
                          () => o(u).config
                        ));
                      },
                      $$slots: { default: !0 }
                    });
                  },
                  (A) => {
                    var M = $(), q = V(M);
                    P(
                      q,
                      () => o(u).type === "combo",
                      (K) => {
                        var j = /* @__PURE__ */ B(() => s(o(u).label));
                        je(K, {
                          get label() {
                            return o(j);
                          },
                          position: "top",
                          children: (G, R) => {
                            let T = () => R?.().id;
                            br(G, We(
                              {
                                get id() {
                                  return T();
                                },
                                get options() {
                                  return o(u).values;
                                },
                                get value() {
                                  return r()[o(u).key];
                                },
                                set value(z) {
                                  rt(e.values, ke(r)[o(u).key] = z, ke(r));
                                }
                              },
                              () => o(u).config,
                              { children: (z, N) => {
                                let C = () => N?.().option;
                                var F = Wv(), Y = D(F);
                                P(
                                  Y,
                                  () => C().color,
                                  (ee) => {
                                    var ie = Vv();
                                    O(() => J(ie, "style", `background:${C().color ?? ""}`)), g(ee, ie);
                                  },
                                  (ee) => {
                                    var ie = $(), de = V(ie);
                                    P(
                                      de,
                                      () => C().avatar || C().avatarColor,
                                      (X) => {
                                        jt(X, {
                                          get data() {
                                            return C();
                                          }
                                        });
                                      },
                                      null,
                                      !0
                                    ), g(ee, ie);
                                  }
                                );
                                var W = U(Y);
                                O(() => te(W, ` ${C().label ?? ""}`)), g(z, F);
                              }, $$slots: { default: !0 } }
                            ));
                          },
                          $$slots: { default: !0 }
                        });
                      },
                      (K) => {
                        var j = $(), Z = V(j);
                        P(
                          Z,
                          () => o(u).type === "select",
                          (G) => {
                            var R = /* @__PURE__ */ B(() => s(o(u).label));
                            je(G, {
                              get label() {
                                return o(R);
                              },
                              position: "top",
                              children: (L, z) => {
                                let N = () => z?.().id;
                                ji(L, We(
                                  {
                                    get id() {
                                      return N();
                                    },
                                    get value() {
                                      return r()[o(u).key];
                                    },
                                    set value(C) {
                                      rt(e.values, ke(r)[o(u).key] = C, ke(r));
                                    },
                                    get options() {
                                      return o(u).values;
                                    }
                                  },
                                  () => o(u).config
                                ));
                              },
                              $$slots: { default: !0 }
                            });
                          },
                          (G) => {
                            var R = $(), T = V(R);
                            P(
                              T,
                              () => o(u).type === "color",
                              (L) => {
                                var z = /* @__PURE__ */ B(() => s(o(u).label));
                                je(L, {
                                  get label() {
                                    return o(z);
                                  },
                                  position: "top",
                                  children: (C, F) => {
                                    let Y = () => F?.().id;
                                    sc(C, We(
                                      {
                                        get id() {
                                          return Y();
                                        },
                                        get value() {
                                          return r()[o(u).key];
                                        },
                                        set value(W) {
                                          rt(e.values, ke(r)[o(u).key] = W, ke(r));
                                        },
                                        get colors() {
                                          return o(u).values;
                                        }
                                      },
                                      () => o(u).config
                                    ));
                                  },
                                  $$slots: { default: !0 }
                                });
                              },
                              (L) => {
                                var z = $(), N = V(z);
                                P(
                                  N,
                                  () => o(u).type === "multiselect",
                                  (C) => {
                                    var F = /* @__PURE__ */ B(() => s(o(u).label));
                                    je(C, {
                                      get label() {
                                        return o(F);
                                      },
                                      position: "top",
                                      children: (Y, W) => {
                                        wd(Y, We(
                                          {
                                            get value() {
                                              return r()[o(u).key];
                                            },
                                            set value(ie) {
                                              rt(e.values, ke(r)[o(u).key] = ie, ke(r));
                                            },
                                            checkboxes: !0,
                                            get options() {
                                              return o(u).values;
                                            }
                                          },
                                          () => o(u).config,
                                          { children: (ie, de) => {
                                            let X = () => de?.().option;
                                            var oe = Zv(), le = D(oe);
                                            P(
                                              le,
                                              () => X().color,
                                              (ue) => {
                                                var _e = jv();
                                                O(() => J(_e, "style", `background:${X().color ?? ""}`)), g(ue, _e);
                                              },
                                              (ue) => {
                                                var _e = $(), be = V(_e);
                                                P(
                                                  be,
                                                  () => X().avatar || X().avatarColor,
                                                  (xe) => {
                                                    jt(xe, {
                                                      get data() {
                                                        return X();
                                                      }
                                                    });
                                                  },
                                                  null,
                                                  !0
                                                ), g(ue, _e);
                                              }
                                            );
                                            var fe = U(le, 2), ge = D(fe);
                                            O(() => te(ge, X().label)), g(ie, oe);
                                          }, $$slots: { default: !0 } }
                                        ));
                                      },
                                      $$slots: { default: !0 }
                                    });
                                  },
                                  (C) => {
                                    var F = $(), Y = V(F);
                                    P(
                                      Y,
                                      () => o(u).type === "date",
                                      (W) => {
                                        var ee = /* @__PURE__ */ B(() => s(o(u).label));
                                        je(W, {
                                          get label() {
                                            return o(ee);
                                          },
                                          position: "top",
                                          children: (de, X) => {
                                            let oe = () => X?.().id;
                                            var le = /* @__PURE__ */ B(() => o(u).format || "%m/%d/%Y");
                                            ld(de, We(
                                              {
                                                get id() {
                                                  return oe();
                                                },
                                                get format() {
                                                  return o(le);
                                                },
                                                get value() {
                                                  return r()[o(u).key];
                                                },
                                                set value(fe) {
                                                  rt(e.values, ke(r)[o(u).key] = fe, ke(r));
                                                }
                                              },
                                              () => o(u).config
                                            ));
                                          },
                                          $$slots: { default: !0 }
                                        });
                                      },
                                      (W) => {
                                        var ee = $(), ie = V(ee);
                                        P(
                                          ie,
                                          () => o(u).type === "dateRange",
                                          (de) => {
                                            var X = /* @__PURE__ */ B(() => s(o(u).label));
                                            je(de, {
                                              get label() {
                                                return o(X);
                                              },
                                              position: "top",
                                              children: (le, fe) => {
                                                let ge = () => fe?.().id;
                                                var ue = /* @__PURE__ */ B(() => o(u).format || "%m/%d/%Y");
                                                Ov(le, {
                                                  get id() {
                                                    return ge();
                                                  },
                                                  get format() {
                                                    return o(ue);
                                                  },
                                                  get start() {
                                                    return r()[o(u).key.start];
                                                  },
                                                  set start(_e) {
                                                    rt(e.values, ke(r)[o(u).key.start] = _e, ke(r));
                                                  },
                                                  get end() {
                                                    return r()[o(u).key.end];
                                                  },
                                                  set end(_e) {
                                                    rt(e.values, ke(r)[o(u).key.end] = _e, ke(r));
                                                  }
                                                });
                                              },
                                              $$slots: { default: !0 }
                                            });
                                          },
                                          (de) => {
                                            var X = $(), oe = V(X);
                                            P(
                                              oe,
                                              () => o(u).type === "files",
                                              (le) => {
                                                var fe = /* @__PURE__ */ B(() => s(o(u).label));
                                                je(le, {
                                                  get label() {
                                                    return o(fe);
                                                  },
                                                  position: "top",
                                                  children: (ge, ue) => {
                                                    Tv(ge, {
                                                      get field() {
                                                        return o(u);
                                                      },
                                                      get values() {
                                                        return e.values;
                                                      }
                                                    });
                                                  },
                                                  $$slots: { default: !0 }
                                                });
                                              },
                                              (le) => {
                                                var fe = $(), ge = V(fe);
                                                P(
                                                  ge,
                                                  () => o(u).type === "links",
                                                  (ue) => {
                                                    var _e = Jv(), be = D(_e), xe = /* @__PURE__ */ B(() => s(o(u).label));
                                                    je(be, {
                                                      get label() {
                                                        return o(xe);
                                                      },
                                                      position: "top",
                                                      children: (we, Le) => {
                                                        var Pe = /* @__PURE__ */ B(() => a().find((Be) => Be.type === "links"));
                                                        Gv(we, {
                                                          get fieldPlace() {
                                                            return i();
                                                          },
                                                          get shape() {
                                                            return o(Pe);
                                                          },
                                                          get card() {
                                                            return e.editCard;
                                                          }
                                                        });
                                                      },
                                                      $$slots: { default: !0 }
                                                    }), g(ue, _e);
                                                  },
                                                  (ue) => {
                                                    var _e = $(), be = V(_e);
                                                    P(
                                                      be,
                                                      () => o(u).type === "comments" && (o(u).values?.length || l?.length),
                                                      (xe) => {
                                                        var we = Qv(), Le = D(we), Pe = /* @__PURE__ */ B(() => s(o(u).label));
                                                        je(Le, {
                                                          get label() {
                                                            return o(Pe);
                                                          },
                                                          position: "top",
                                                          children: (Be, Pt) => {
                                                            var et = $(), tt = V(et);
                                                            P(
                                                              tt,
                                                              () => o(u).config?.placement === "editor",
                                                              (qe) => {
                                                                var nt = /* @__PURE__ */ B(() => o(u).values || l);
                                                                wo(qe, {
                                                                  get comments() {
                                                                    return r()[o(u).key];
                                                                  },
                                                                  get placement() {
                                                                    return e.placement;
                                                                  },
                                                                  get users() {
                                                                    return o(nt);
                                                                  },
                                                                  get shape() {
                                                                    return o(u);
                                                                  }
                                                                });
                                                              },
                                                              (qe) => {
                                                                Re(qe, {
                                                                  type: "primary block",
                                                                  onclick: () => e.handleViewChange("comments"),
                                                                  children: (nt, sa) => {
                                                                    var la = Se();
                                                                    O(() => te(la, `${s("Show comments") ?? ""}
						(${(e.editCard.comments?.length || 0) ?? ""})`)), g(nt, la);
                                                                  },
                                                                  $$slots: { default: !0 }
                                                                });
                                                              }
                                                            ), g(Be, et);
                                                          },
                                                          $$slots: { default: !0 }
                                                        }), O(() => ye(we, `wx-card-comments ${i() ?? ""} svelte-1c331lt`)), g(xe, we);
                                                      },
                                                      null,
                                                      !0
                                                    ), g(ue, _e);
                                                  },
                                                  !0
                                                ), g(le, fe);
                                              },
                                              !0
                                            ), g(de, X);
                                          },
                                          !0
                                        ), g(W, ee);
                                      },
                                      !0
                                    ), g(C, F);
                                  },
                                  !0
                                ), g(L, z);
                              },
                              !0
                            ), g(G, R);
                          },
                          !0
                        ), g(K, j);
                      },
                      !0
                    ), g(A, M);
                  },
                  !0
                ), g(y, b);
              },
              !0
            ), g(k, p);
          },
          !0
        ), g(v, m);
      }
    ), g(f, h);
  }), g(n, d), re();
}
var Xv = /* @__PURE__ */ E('<div class="wx-multiselect-option svelte-1ktufvm"><!> <span class="wx-multiselect-label svelte-1ktufvm"> </span></div>'), $v = /* @__PURE__ */ E('<div class="wx-kanban-voters-list svelte-1ktufvm"></div>'), eh = /* @__PURE__ */ E('<div class="wx-kanban-editor-voting svelte-1ktufvm"><div class="wx-kanban-editor-vote svelte-1ktufvm"><!></div> <!></div>');
function th(n, e) {
  ne(e, !0);
  let t = S(e, "value", 7);
  const r = he("wx-kanban-store");
  let a = ae(!1);
  const i = /* @__PURE__ */ B(() => t()?.includes(e.currentUser)), s = /* @__PURE__ */ B(() => t()?.length && e.users.length ? t().map((h) => e.users.find((_) => _.id == h)) : []);
  function l() {
    o(i) ? (r.exec("delete-vote", { cardId: e.cardId }), t(t().filter((h) => h !== e.currentUser))) : (r.exec("add-vote", { cardId: e.cardId }), t([...t() || [], e.currentUser]));
  }
  var d = eh(), c = D(d), f = D(c);
  Re(f, {
    onclick: l,
    icon: "wxi-like",
    children: (h, _) => {
      var v = Se();
      O(() => te(v, t()?.length || 0)), g(h, v);
    },
    $$slots: { default: !0 }
  });
  var u = U(c, 2);
  P(u, () => o(a) && o(s)?.length, (h) => {
    At(h, {
      width: "230px",
      oncancel: () => H(a, !1),
      align: "end",
      children: (_, v) => {
        var m = $v();
        Ie(m, 21, () => o(s), (w) => w.id, (w, k) => {
          var p = Xv(), x = D(p);
          jt(x, {
            size: "small",
            get data() {
              return o(k);
            }
          });
          var y = U(x, 2), b = D(y);
          O(() => te(b, o(k).label)), g(w, p);
        }), g(_, m);
      },
      $$slots: { default: !0 }
    });
  }), O(() => ve(c, "wx-kanban-editor-voted", o(i))), He("mouseenter", c, () => H(a, !0)), He("mouseleave", c, () => H(a, !1)), g(n, d), re();
}
var nh = /* @__PURE__ */ E('<div class="wx-editor-save-button svelte-br54ec"><!></div>'), rh = /* @__PURE__ */ E("<!> <!>", 1), ah = /* @__PURE__ */ E('<div class="wx-kanban-editor-left svelte-br54ec"><!></div>'), ih = /* @__PURE__ */ E('<div class="wx-editor-manual-save svelte-br54ec"><div class="wx-editor-cancel-button svelte-br54ec"><!></div> <div class="wx-editor-save-button svelte-br54ec"><!></div></div>'), oh = /* @__PURE__ */ E('<div class="wx-kanban-editor-main svelte-br54ec"><!> <div class="wx-kanban-editor-right svelte-br54ec"><!></div></div> <!>', 1), sh = /* @__PURE__ */ E('<div class="wx-editor-controls-wrapper svelte-br54ec"><!> <div><!></div></div> <!>', 1), lh = /* @__PURE__ */ E("<!> <div><!></div>", 1);
function Mr(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(_, "$_edit", t), a = () => ce(h, "$cards", t), i = () => ce(w, "$values", t), s = () => ce(v, "$cardShape", t), l = () => ce(m, "$currentUser", t);
  let d = S(e, "shape", 3, null);
  const c = /* @__PURE__ */ B(() => ({ ...Xr, ...e.config })), f = /* @__PURE__ */ B(() => o(c).placement === "modal"), u = /* @__PURE__ */ B(() => o(c).placement), { cards: h, _edit: _, cardShape: v, currentUser: m } = e.api.getReactiveState(), w = mu(
    k({}),
    // temp solution for svelte error: Cannot do bind:value={undefined} when value has a fallback value
    () => {
      o(c).autoSave && b();
    },
    // svelte-ignore state_referenced_locally
    { debounce: o(c).debounce }
  );
  function k(R) {
    const T = { ...R };
    return d().forEach((L) => {
      typeof T[L.key] > "u" && (L.type === "files" || L.type === "comments" ? T[L.key] = [] : L.type === "date" ? T[L.key] = null : L.type === "progress" ? T[L.key] = 0 : T[L.key] = "");
    }), T;
  }
  let p = ae(void 0);
  e.api.on("start-drag-card", (R) => {
    H(p, Q(R.id));
  }), e.api.on("end-drag-card", () => {
    H(p, null);
  });
  const x = /* @__PURE__ */ B(() => !o(p) && r() && a()?.find((R) => R.id === r()?.cardId));
  gt(() => {
    w.reset(k(o(x)));
  });
  function y() {
    e.api.exec("set-edit", null);
  }
  function b() {
    e.api.exec("update-card", {
      card: { ...i() },
      id: i().id
    });
  }
  function I() {
    b(), o(u) === "modal" && y();
  }
  let A = ae(void 0), M = ae("main");
  function q(R) {
    H(M, Q(R));
  }
  const K = /* @__PURE__ */ B(() => o(u) === "sidebar" ? [] : d().filter((R) => R.modalSection === "left")), j = /* @__PURE__ */ B(() => o(u) === "sidebar" ? [...d()] : d().filter((R) => R.modalSection !== "left")), Z = /* @__PURE__ */ B(() => {
    const R = e.api?.getState().cardShape.users;
    return R?.values?.length ? R.values : [];
  }), G = /* @__PURE__ */ B(() => o(f) && !o(K).length);
  Tt(n, {
    words: { ...er, ...$n },
    optional: !0,
    children: (R, T) => {
      var L = lh(), z = V(L);
      ov(z, {
        get _() {
          return o(A);
        },
        set _(F) {
          H(A, Q(F));
        }
      });
      var N = U(z, 2);
      N.__click = function(...F) {
        e.onclick?.apply(this, F);
      };
      var C = D(N);
      P(C, () => o(A) && o(x), (F) => {
        var Y = sh(), W = V(Y), ee = D(W);
        P(ee, () => o(M) === "main" && !o(c).autoSave && !o(f), (oe) => {
          var le = nh(), fe = D(le);
          Re(fe, {
            type: "primary",
            css: "wx-editor-btn",
            onclick: I,
            children: (ge, ue) => {
              var _e = Se();
              O(() => te(_e, o(A)("Save"))), g(ge, _e);
            },
            $$slots: { default: !0 }
          }), g(oe, le);
        });
        var ie = U(ee, 2), de = D(ie);
        P(
          de,
          () => o(M) === "main",
          (oe) => {
            var le = rh(), fe = V(le);
            P(fe, () => s().votes?.show, (ue) => {
              th(ue, {
                get cardId() {
                  return o(x).id;
                },
                get users() {
                  return o(Z);
                },
                get value() {
                  return i().votes;
                },
                get currentUser() {
                  return l();
                }
              });
            });
            var ge = U(fe, 2);
            Me(ge, { css: "wxi-close", onclick: y }), g(oe, le);
          },
          (oe) => {
            Re(oe, {
              onclick: () => q("main"),
              children: (le, fe) => {
                var ge = Se();
                O(() => te(ge, o(A)("Back"))), g(le, ge);
              },
              $$slots: { default: !0 }
            });
          }
        );
        var X = U(W, 2);
        P(
          X,
          () => o(M) === "main",
          (oe) => {
            var le = oh(), fe = V(le), ge = D(fe);
            P(ge, () => o(f) && o(K).length, (xe) => {
              var we = ah(), Le = D(we);
              Va(Le, {
                get api() {
                  return e.api;
                },
                get fields() {
                  return o(K);
                },
                fieldsPlace: "left",
                get placement() {
                  return o(u);
                },
                values: w,
                get editCard() {
                  return o(x);
                },
                handleViewChange: q
              }), g(xe, we);
            });
            var ue = U(ge, 2), _e = D(ue);
            Va(_e, {
              get api() {
                return e.api;
              },
              get fields() {
                return o(j);
              },
              fieldsPlace: "right",
              get placement() {
                return o(u);
              },
              values: w,
              get editCard() {
                return o(x);
              },
              handleViewChange: q
            });
            var be = U(fe, 2);
            P(be, () => o(f) && o(M) === "main" && !o(c).autoSave, (xe) => {
              var we = ih(), Le = D(we), Pe = D(Le);
              Re(Pe, {
                css: "wx-editor-btn",
                onclick: y,
                children: (et, tt) => {
                  var qe = Se();
                  O(() => te(qe, o(A)("Cancel"))), g(et, qe);
                },
                $$slots: { default: !0 }
              });
              var Be = U(Le, 2), Pt = D(Be);
              Re(Pt, {
                type: "primary",
                css: "wx-editor-btn",
                onclick: I,
                children: (et, tt) => {
                  var qe = Se();
                  O(() => te(qe, o(A)("Save"))), g(et, qe);
                },
                $$slots: { default: !0 }
              }), g(xe, we);
            }), g(oe, le);
          },
          (oe) => {
            var le = $(), fe = V(le);
            P(
              fe,
              () => o(M) === "comments",
              (ge) => {
                var ue = /* @__PURE__ */ B(() => d().find((_e) => _e.type === "comments"));
                wo(ge, {
                  get comments() {
                    return i().comments;
                  },
                  get users() {
                    return o(Z);
                  },
                  get shape() {
                    return o(ue);
                  },
                  get placement() {
                    return o(u);
                  },
                  handleViewChange: q
                });
              },
              null,
              !0
            ), g(oe, le);
          }
        ), O(() => ye(ie, `wx-editor-controls${(o(f) && o(M) === "comments" ? " comments" : "") ?? ""} svelte-br54ec`)), g(F, Y);
      }), O(() => {
        ye(N, `wx-editor ${o(u) ?? ""} ${o(M) ?? ""} svelte-br54ec`), J(N, "data-kanban-id", Ue.editor), J(N, "data-wx-widget", Ue.editor), ve(N, "wx-modal-narrow", o(G)), ve(N, "wx-editor-open", o(x));
      }), g(R, L);
    },
    $$slots: { default: !0 }
  }), re();
}
me(["click"]);
var ch = /* @__PURE__ */ E('<div class="wx-editor-modal svelte-10gkwu4"><!></div>'), dh = /* @__PURE__ */ E('<div class="wx-sidebar svelte-10gkwu4"><!></div>');
function uh(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(l, "$_edit", t), a = () => ce(d, "$editor", t), i = () => ce(c, "$editorShape", t), s = he("wx-kanban-store"), { _edit: l, editor: d, editorShape: c } = s.getReactiveState(), f = /* @__PURE__ */ B(() => s.getCard(r()?.cardId)), u = /* @__PURE__ */ B(() => ({ ...Xr, ...a() }));
  var h = $(), _ = V(h);
  P(
    _,
    () => o(u).placement === "modal",
    (v) => {
      var m = $(), w = V(m);
      P(w, () => o(f), (k) => {
        var p = ch(), x = D(p);
        jd(x, {
          children: (y, b) => {
            Mr(y, {
              api: s,
              get config() {
                return o(u);
              },
              get shape() {
                return i();
              }
            });
          },
          $$slots: { default: !0 }
        }), O(() => J(p, "data-kanban-id", Ue.editor)), g(k, p);
      }), g(v, m);
    },
    (v) => {
      var m = dh(), w = D(m);
      Mr(w, {
        api: s,
        get config() {
          return o(u);
        },
        get shape() {
          return i();
        }
      }), O(() => {
        J(m, "data-kanban-id", Ue.editor), ve(m, "wx-sidebar-open", !!o(f));
      }), g(v, m);
    }
  ), g(n, h), re();
}
var fh = (n, e, t) => e(o(t).id), vh = /* @__PURE__ */ E("<div></div>");
function Wa(n, e) {
  ne(e, !1);
  const t = Fe(), r = () => ce(l, "$columns", t), a = () => ce(i, "$columnOffsets", t), { columnOffsets: i } = uo(), s = he("wx-kanban-store"), { columns: l } = s.getReactiveState();
  function d(u) {
    s.exec("update-column", { id: u, column: { collapsed: !1 } });
  }
  zi();
  var c = $(), f = V(c);
  Ie(f, 1, r, (u) => u.id, (u, h) => {
    var _ = $(), v = V(_);
    P(v, () => o(h).collapsed, (m) => {
      var w = vh();
      const k = /* @__PURE__ */ si(() => `left:${a().get(o(h).id) ?? ""}px;`);
      w.__click = [fh, d, h], O(() => {
        ye(w, `wx-collapsed-column${(o(h).css ? " " + o(h).css : "") ?? ""} svelte-vzvzkt`), J(w, "style", o(k));
      }), g(m, w);
    }), g(u, _);
  }), g(n, c), re();
}
me(["click"]);
var hh = /* @__PURE__ */ E('<input type="text" class="wx-input svelte-9z9yku">'), mh = /* @__PURE__ */ E('<div class="wx-menu svelte-9z9yku"><!></div>'), gh = /* @__PURE__ */ E('<div class="wx-label-icon svelte-9z9yku"><!></div> <div class="wx-label-text svelte-9z9yku"><!></div> <!>', 1), _h = /* @__PURE__ */ E('<div class="wx-content svelte-9z9yku"><!></div>'), wh = /* @__PURE__ */ E("<div><div><!> <div></div></div> <!></div>");
function ja(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(x, "$rowKey", t), a = () => ce(v, "$readonly", t), i = () => ce(m, "$rows", t), s = () => ce(w, "$rowShape", t), l = () => ce(p, "$columns", t), d = () => ce(k, "$_cardsMap", t);
  let c = S(e, "row", 19, () => ({
    id: "default",
    label: "default",
    collapsed: !1
  }));
  const f = he("wx-kanban-store"), u = he("wx-i18n").getGroup("kanban"), { showModal: h } = he("wx-helpers");
  function _() {
    f.exec("update-row", {
      id: c().id,
      row: { collapsed: !c().collapsed }
    });
  }
  const {
    readonly: v,
    rows: m,
    rowShape: w,
    _cardsMap: k,
    columns: p,
    rowKey: x
  } = f.getReactiveState(), y = /* @__PURE__ */ B(() => !!r()), b = /* @__PURE__ */ B(() => a().edit);
  let I = ae(!1), A = null;
  const M = /* @__PURE__ */ B(() => i().findIndex((X) => X.id === c().id));
  function q() {
    o(I) && A?.trim() && f.exec("update-row", { id: c().id, row: { label: A } }), H(I, !1), A = null;
  }
  function K() {
    o(b) && H(I, !0);
  }
  function j(X) {
    A = X.target.value;
  }
  function Z(X) {
    X.charCode === 13 && q();
  }
  function G(X) {
    X.focus();
  }
  function R(X) {
    const oe = X === "up" ? o(M) - 1 : o(M) + 2, le = i()[oe]?.id;
    f.exec("move-row", { id: c().id, before: le });
  }
  function T(X) {
    const oe = X.action;
    if (oe) {
      if (oe.onClick) {
        oe.onClick({ id: oe.id, item: oe, row: c() });
        return;
      }
      switch (oe.id) {
        case "set-edit":
          K();
          break;
        case "delete-row": {
          (s().confirmDeletion ?? !0 ? h({
            message: u("Would you like to delete this row?")
          }) : Promise.resolve()).then(() => {
            f.exec("delete-row", { id: c().id });
          }).catch(() => {
          });
          break;
        }
        case "move-row:up":
          R("up");
          break;
        case "move-row:down":
          R("down");
          break;
      }
    }
  }
  const L = (X, oe, le, fe) => {
    const ge = fe.menu.items({ rows: le, rowIndex: oe, row: X });
    return !ge || !ge.length ? null : ge.map((ue) => nr(ue, u));
  }, z = /* @__PURE__ */ B(() => L(c(), o(M), i(), s())), N = /* @__PURE__ */ B(() => s().menu.show && !!o(z) && o(b) && !o(I));
  function C(X, oe, le, fe) {
    let ge = "wx-row";
    if (X.collapsed && (ge += " wx-collapsed"), X.css && (ge += " " + X.css), oe && oe.css) {
      let ue = [];
      le.forEach((_e) => ue = ue.concat(fe[Oe(_e.id, X.id)])), ge += " " + oe.css(X, ue);
    }
    return ge;
  }
  const F = /* @__PURE__ */ B(() => C(c(), s(), l(), d()));
  var Y = wh(), W = D(Y), ee = D(W);
  P(ee, () => o(y), (X) => {
    var oe = gh(), le = V(oe), fe = D(le), ge = /* @__PURE__ */ B(() => `wxi-angle-${c().collapsed ? "right" : "down"}`);
    Me(fe, {
      get css() {
        return o(ge);
      },
      onclick: _
    });
    var ue = U(le, 2);
    ue.__dblclick = K;
    var _e = D(ue);
    P(
      _e,
      () => o(I),
      (xe) => {
        var we = hh();
        we.__input = j, Ne(we, (Le) => G(Le)), O(() => Ht(we, c().label)), He("keypress", we, Z), He("blur", we, q), g(xe, we);
      },
      (xe) => {
        var we = Se();
        O(() => te(we, c().label)), g(xe, we);
      }
    );
    var be = U(ue, 2);
    P(be, () => o(N), (xe) => {
      rr(xe, {
        get options() {
          return o(z);
        },
        onclick: T,
        children: (we, Le) => {
          var Pe = mh(), Be = D(Pe);
          Me(Be, { css: "wxi-dots-h" }), g(we, Pe);
        },
        $$slots: { default: !0 }
      });
    }), g(X, oe);
  });
  var ie = U(ee, 2), de = U(W, 2);
  P(de, () => !c().collapsed, (X) => {
    var oe = _h(), le = D(oe);
    Ee(le, () => e.children ?? De), g(X, oe);
  }), O(() => {
    ye(Y, `${o(F) ?? ""} svelte-9z9yku`), ve(Y, "wx-collapsed", c().collapsed), ye(W, `wx-label ${(o(y) ? "collapsable" : "") ?? ""} svelte-9z9yku`), J(W, "data-row-header", c().id), ye(ie, `wx-label-line ${(o(y) ? "collapsable" : "") ?? ""} svelte-9z9yku`);
  }), g(n, Y), re();
}
me(["dblclick", "input"]);
var yh = /* @__PURE__ */ E('<div class="wx-label svelte-fhl0ry"> </div>'), xh = /* @__PURE__ */ E('<div class="wx-value svelte-fhl0ry"> </div>'), bh = /* @__PURE__ */ E('<div class="wx-layout svelte-fhl0ry"><!> <div class="wx-wrap svelte-fhl0ry"><div class="wx-progress svelte-fhl0ry"></div> <!></div></div>');
function ph(n, e) {
  let t = S(e, "label", 3, ""), r = S(e, "min", 3, 0), a = S(e, "max", 3, 100), i = S(e, "value", 3, 0), s = S(e, "showValue", 3, !0);
  const l = /* @__PURE__ */ B(() => Math.round((i() - r()) / (a() - r()) * 100) + "%"), d = /* @__PURE__ */ B(() => `background: linear-gradient(90deg, var(--wx-color-primary) 0% ${o(l)}, var(--wx-kanban-progress-inactive-color) ${o(l)} 100%);`);
  var c = bh(), f = D(c);
  P(f, t, (v) => {
    var m = yh(), w = D(m);
    O(() => te(w, t())), g(v, m);
  });
  var u = U(f, 2), h = D(u), _ = U(h, 2);
  P(_, s, (v) => {
    var m = xh(), w = D(m);
    O(() => te(w, o(l))), g(v, m);
  }), O(() => J(h, "style", o(d))), g(n, c);
}
var kh = /* @__PURE__ */ E('<div class="wx-users svelte-fncexv"></div>'), Sh = /* @__PURE__ */ E('<span class="wx-date-value svelte-fncexv"> </span>'), Ih = /* @__PURE__ */ E('<span class="wx-date-value svelte-fncexv"> </span>'), Eh = /* @__PURE__ */ E('<div class="wx-date svelte-fncexv"><!> <!> <!> <!></div>'), Dh = /* @__PURE__ */ E('<span class="wx-item-value svelte-fncexv"> </span>'), Ch = /* @__PURE__ */ E('<div class="wx-votes svelte-fncexv"><!></div>'), Mh = /* @__PURE__ */ E('<span class="wx-item-value svelte-fncexv"> </span>'), Ah = /* @__PURE__ */ E('<div class="wx-comments svelte-fncexv"><!></div>'), Th = /* @__PURE__ */ E('<span class="wx-item-value svelte-fncexv"> </span>'), Ph = /* @__PURE__ */ E('<div class="wx-attached svelte-fncexv"><!></div>'), Rh = /* @__PURE__ */ E('<div class="wx-footer svelte-fncexv"><!> <div class="wx-card-icons svelte-fncexv"><div class="wx-icons-container svelte-fncexv"><!></div> <div class="wx-icons-container svelte-fncexv"><!> <!> <!></div></div></div>');
function Lh(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(o(c), "$currentUser", t), a = he("wx-kanban-store"), i = he("wx-i18n"), s = "%M %d";
  function l(I, A) {
    let M = {};
    const { show: q } = A?.users || {}, K = I.users;
    if (q && K) {
      const z = (Array.isArray(K) ? K : [K]).reduce(
        (F, Y) => {
          const W = A.users.values?.find((ee) => ee.id === Y);
          return W && F.push(W), F;
        },
        []
      );
      let N = z.map((F) => ({ ...F, label: F.label || "" })), C = 2;
      e.cardShape.users.maxCount === !1 ? C = 1 / 0 : e.cardShape.users.maxCount && (C = e.cardShape.users.maxCount), z.length > C && (N = N.splice(0, C), N.push({
        label: `+${z.length - N.length}`,
        id: "$total"
      })), N?.length && (M.users = N);
    }
    const { show: j, format: Z } = A.start_date || {}, { show: G, format: R } = A.end_date || {};
    let { end_date: T, start_date: L } = I;
    return (j || G) && (L && (M.startDate = qn(Z || s, i.getRaw().calendar)(L)), T && (M.endDate = qn(R || s, i.getRaw().calendar)(T))), A?.attached?.show && I.attached?.length && (M.attached = I.attached.length), A.comments?.show && I.comments?.length && (M.comments = I.comments?.length), A.votes?.show && (M.votes = I.votes?.length || 0), M;
  }
  const d = /* @__PURE__ */ B(() => l(e.cardFields, e.cardShape)), c = /* @__PURE__ */ B(() => a?.getReactiveState().currentUser), f = /* @__PURE__ */ B(() => e.cardShape.votes?.clickable);
  function u() {
    if (o(f)) {
      const I = e.cardFields.id;
      e.cardFields.votes?.includes(r()) ? a.exec("delete-vote", { cardId: I }) : a.exec("add-vote", { cardId: I });
    }
  }
  var h = Rh();
  const _ = /* @__PURE__ */ B(() => !!Object.keys(o(d)).length);
  O(() => ve(h, "wx-with-content", o(_)));
  var v = D(h);
  P(v, () => o(d).users, (I) => {
    var A = kh();
    Ie(A, 21, () => o(d).users, (M) => M.id, (M, q) => {
      var K = /* @__PURE__ */ B(() => o(q).id === "$total");
      jt(M, {
        get data() {
          return o(q);
        },
        get noTransform() {
          return o(K);
        }
      });
    }), g(I, A);
  });
  var m = U(v, 2), w = D(m), k = D(w);
  P(k, () => o(d).endDate || o(d).startDate, (I) => {
    var A = Eh(), M = D(A);
    Me(M, { css: "wxi-calendar" });
    var q = U(M, 2);
    P(q, () => o(d).startDate, (Z) => {
      var G = Sh(), R = D(G);
      O(() => te(R, o(d).startDate)), g(Z, G);
    });
    var K = U(q, 2);
    P(K, () => o(d).endDate && o(d).startDate, (Z) => {
      var G = Se("-");
      g(Z, G);
    });
    var j = U(K, 2);
    P(j, () => o(d).endDate, (Z) => {
      var G = Ih(), R = D(G);
      O(() => te(R, o(d).endDate)), g(Z, G);
    }), g(I, A);
  });
  var p = U(w, 2), x = D(p);
  P(x, () => o(d).votes || o(d).votes === 0 && o(f), (I) => {
    var A = Ch();
    const M = /* @__PURE__ */ B(() => e.cardFields.votes?.includes(r()));
    var q = D(A);
    Me(q, {
      css: "wxi-like",
      onclick: u,
      children: (K, j) => {
        var Z = Dh(), G = D(Z);
        O(() => te(G, o(d).votes)), g(K, Z);
      },
      $$slots: { default: !0 }
    }), O(() => {
      J(A, "data-kanban-id", o(f) ? "wx-vote-card-button" : ""), ve(A, "wx-kanban-editor-voted", o(M)), ve(A, "wx-clickable", o(f));
    }), g(I, A);
  });
  var y = U(x, 2);
  P(y, () => o(d).comments, (I) => {
    var A = Ah(), M = D(A);
    Me(M, {
      css: "wxi-message",
      children: (q, K) => {
        var j = Mh(), Z = D(j);
        O(() => te(Z, o(d).comments)), g(q, j);
      },
      $$slots: { default: !0 }
    }), g(I, A);
  });
  var b = U(y, 2);
  P(b, () => o(d).attached, (I) => {
    var A = Ph(), M = D(A);
    Me(M, {
      css: "wxi-paperclip",
      children: (q, K) => {
        var j = Th(), Z = D(j);
        O(() => te(Z, o(d).attached)), g(q, j);
      },
      $$slots: { default: !0 }
    }), g(I, A);
  }), g(n, h), re();
}
var Fh = /* @__PURE__ */ E('<div class="wx-field wx-priority svelte-16qucgr"><span class="wx-priority-label svelte-16qucgr"> </span></div>'), Oh = /* @__PURE__ */ E('<span class="wx-label"> </span>'), Nh = /* @__PURE__ */ E('<div><!> <span class="wx-value"> </span></div>'), Bh = /* @__PURE__ */ E('<div class="wx-card-header svelte-16qucgr"></div>');
function zh(n, e) {
  function t(i, s) {
    let l = [];
    if (s.priority?.show) {
      const c = s.priority.values?.find((f) => f.id === i.priority);
      c && l.push({
        type: "priority",
        value: c.label,
        color: c.color
      });
    }
    const d = s.headerFields;
    if (d) {
      const c = d.reduce(
        (f, u) => (i[u.key] && f.push({
          value: i[u.key],
          label: u.label,
          css: u.css
        }), f),
        []
      );
      c && l.push(...c);
    }
    return l;
  }
  const r = /* @__PURE__ */ B(() => t(e.cardFields, e.cardShape));
  var a = Bh();
  Ie(a, 21, () => o(r), it, (i, s) => {
    var l = $(), d = V(l);
    P(d, () => o(s).value, (c) => {
      var f = $(), u = V(f);
      P(
        u,
        () => o(s).type === "priority",
        (h) => {
          var _ = Fh(), v = D(_), m = D(v);
          O(() => {
            J(_, "style", `background:${o(s).color ?? ""}`), te(m, o(s).value);
          }), g(h, _);
        },
        (h) => {
          var _ = Nh(), v = D(_);
          P(v, () => o(s)?.label, (k) => {
            var p = Oh(), x = D(p);
            O(() => te(x, `${o(s).label ?? ""}:`)), g(k, p);
          });
          var m = U(v, 2), w = D(m);
          O(() => {
            ye(_, `wx-field ${(o(s).css || "") ?? ""} svelte-16qucgr`), te(w, o(s).value);
          }), g(h, _);
        }
      ), g(c, f);
    }), g(i, l);
  }), g(n, a);
}
var Hh = /* @__PURE__ */ E('<div class="wx-color wx-rounded svelte-17mj8o9"></div>'), qh = /* @__PURE__ */ E('<div class="wx-field wx-image svelte-17mj8o9"><img alt="" class="svelte-17mj8o9"></div>'), Uh = /* @__PURE__ */ E("<span> </span>"), Yh = /* @__PURE__ */ E('<div class="wx-menu svelte-17mj8o9" data-ignore-selection="true"><div><!></div></div>'), Kh = /* @__PURE__ */ E('<div class="wx-field wx-description svelte-17mj8o9"> </div>'), Gh = /* @__PURE__ */ E('<div class="wx-field svelte-17mj8o9"><!></div>'), Vh = /* @__PURE__ */ E('<!> <!> <div><!> <div class="wx-body svelte-17mj8o9"><div class="wx-field wx-label svelte-17mj8o9"><!> <!></div> <!> <!></div> <!></div>', 1);
function ra(n, e) {
  ne(e, !0);
  let t = S(e, "menu", 3, !0);
  const r = /* @__PURE__ */ B(() => e.cardFields?.attached?.find((x) => x.isCover)), a = /* @__PURE__ */ B(() => o(r) ? o(r).coverURL || o(r).url : null);
  function i(x, y) {
    let b = "wx-content";
    return x.css && (b += " " + x.css), y.css ? () => b += ` ${y.css(x)}` : () => b;
  }
  const s = /* @__PURE__ */ B(() => i(e.cardFields, e.cardShape)());
  var l = Vh(), d = V(l);
  P(d, () => e.cardShape.color?.show && e.cardFields.color, (x) => {
    var y = Hh();
    O(() => J(y, "style", `background:${e.cardFields.color ?? ""}`)), g(x, y);
  });
  var c = U(d, 2);
  P(c, () => e.cardShape?.cover?.show && o(a), (x) => {
    var y = qh(), b = D(y);
    O(() => {
      ve(y, "wx-rounded", !(e.cardShape.color?.show && e.cardFields.color)), J(b, "src", o(a));
    }), g(x, y);
  });
  var f = U(c, 2), u = D(f);
  zh(u, {
    get cardFields() {
      return e.cardFields;
    },
    get cardShape() {
      return e.cardShape;
    }
  });
  var h = U(u, 2), _ = D(h), v = D(_);
  P(v, () => e.cardShape?.label?.show && e.cardFields.label, (x) => {
    var y = Uh(), b = D(y);
    O(() => te(b, e.cardFields.label)), g(x, y);
  });
  var m = U(v, 2);
  P(m, t, (x) => {
    var y = Yh(), b = D(y), I = D(b);
    Me(I, { css: "wxi-dots-v" }), O(() => J(b, "data-menu-id", e.cardFields.id)), g(x, y);
  });
  var w = U(_, 2);
  P(w, () => e.cardShape?.description?.show && e.cardFields.description, (x) => {
    var y = Kh(), b = D(y);
    O(() => te(b, e.cardFields.description)), g(x, y);
  });
  var k = U(w, 2);
  P(k, () => e.cardShape?.progress?.show && e.cardFields.progress, (x) => {
    var y = Gh(), b = D(y), I = /* @__PURE__ */ B(() => e.cardShape.progress?.config?.min || 0), A = /* @__PURE__ */ B(() => e.cardShape.progress?.config?.max || 100);
    ph(b, {
      get min() {
        return o(I);
      },
      get max() {
        return o(A);
      },
      get value() {
        return e.cardFields.progress;
      }
    }), g(x, y);
  });
  var p = U(h, 2);
  Lh(p, {
    get cardFields() {
      return e.cardFields;
    },
    get cardShape() {
      return e.cardShape;
    }
  }), O(() => {
    ye(f, `${o(s) ?? ""} svelte-17mj8o9`), ve(f, "wx-selected", e.selected), ve(f, "wx-dragging", e.dragging);
  }), g(n, l), re();
}
var Wh = /* @__PURE__ */ E('<div class="wx-card svelte-7hhwxe"><!></div>');
function aa(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(f, "$_cardsMeta", t), a = () => ce(d, "$selected", t), i = () => ce(u, "$cardHeight", t), s = () => ce(c, "$cardShape", t), l = he("wx-kanban-store"), { selected: d, cardShape: c, _cardsMeta: f, cardHeight: u } = l.getReactiveState(), h = /* @__PURE__ */ B(() => r()?.[e.cardFields.id]?.dragging || !1), _ = /* @__PURE__ */ B(() => no(a(), e.cardFields.id) || !1), v = /* @__PURE__ */ B(() => i() ? i() + "px" : "auto"), m = /* @__PURE__ */ B(() => e.cardTemplate);
  var w = Wh(), k = D(w);
  Ct(k, () => o(m), (p, x) => {
    x(p, {
      get cardFields() {
        return e.cardFields;
      },
      get dragging() {
        return o(h);
      },
      get selected() {
        return o(_);
      },
      get cardShape() {
        return s();
      },
      get menu() {
        return e.menu;
      }
    });
  }), O(() => {
    J(w, "data-drag-item", e.cardFields.id), J(w, "style", `height:${o(v) ?? ""};max-height:${o(v) ?? ""};`), J(w, "data-id", e.cardFields.id), ve(w, "wx-hidden", o(h)), ve(w, "wx-selected", o(_)), ve(w, "wx-dimmed", r()?.[e.cardFields.id]?.dimmed);
  }), g(n, w), re();
}
var jh = /* @__PURE__ */ E('<div class="wx-collapsed-label svelte-1betjxn"><div class="wx-label-text svelte-1betjxn"> </div></div>');
function Zh(n, e) {
  ne(e, !0);
  var t = jh(), r = D(t), a = D(r);
  O(() => te(a, e.column.label)), g(n, t), re();
}
var Jh = /* @__PURE__ */ E('<div class="wx-item svelte-1ve5ytw"><!></div>'), Qh = /* @__PURE__ */ E('<div class="wx-virtual-list svelte-1ve5ytw"><div class="wx-content svelte-1ve5ytw"></div> <!></div>');
function Xh(n, e) {
  ne(e, !0);
  let t = Q([]), r = ae(void 0), a = ae(void 0), i = ae(void 0), s = ae(0), l = ae(0), d = ae(0);
  const c = /* @__PURE__ */ B(() => e.items.slice(o(s), o(l)).map((b, I) => ({ index: I + o(s), data: b })));
  let f = ae(0), u = ae(0), h = ae(0);
  async function _(b) {
    if (o(a).querySelector(`[data-id="${b}"]`))
      return;
    const A = e.items.findIndex((M) => M.id === b);
    A > -1 && (o(a).scrollTop = (A + 1) * o(h) - o(d) / 2, w(), b = null);
  }
  async function v(b, I, A) {
    await kt(), t.length = b.length, t.fill(0);
    const { scrollTop: M } = o(a);
    let q = o(f) - M;
    for (let K = o(s); K < b.length; (K += 1) - 1) {
      if (q > I) {
        H(l, Q(K));
        break;
      }
      let j = o(r)[K - o(s)];
      j || (H(l, K + 1), await kt(), j = o(r)[K - o(s)]);
      const Z = j.offsetHeight;
      t[K] = Z, q += Z;
    }
    H(h, Q(Math.round((o(f) + q) / o(l)))), m(o(h)), await kt(), A && _(A);
  }
  function m(b) {
    const I = e.items.length - o(l);
    H(u, I * b);
  }
  async function w() {
    const { scrollTop: b } = o(a);
    o(c).forEach((M, q) => {
      const { index: K } = M;
      t[K] = o(r)[q].offsetHeight;
    });
    let I = 0, A = 0;
    for (; I < e.items.length; ) {
      const M = t[I] || o(h);
      if (A + M > b) {
        H(s, Q(I)), H(f, Q(A));
        break;
      }
      A += M, I += 1;
    }
    for (; I < e.items.length && (A += t[I] || o(h), I += 1, !(A > b + o(d))); )
      ;
    H(l, Q(I)), H(h, Q(Math.round(A / o(l)))), m(o(h));
  }
  async function k() {
    w(), onscroll && onscroll({ start: o(s), end: o(l) });
  }
  vt(() => {
    H(r, Q(o(i).children)), kt().then(() => v(e.items, o(d), e.scrollToId));
  });
  var p = Qh(), x = D(p);
  Ie(x, 21, () => o(c), (b) => b.index, (b, I) => {
    var A = Jh(), M = D(A);
    Ee(M, () => e.children ?? De, () => ({ item: o(I).data })), O(() => {
      J(A, "data-id", o(I).data.id), J(A, "data-index", o(I).index);
    }), g(b, A);
  }), Te(x, (b) => H(i, b), () => o(i));
  var y = U(x, 2);
  Ee(y, () => e.extra ?? De), Te(p, (b) => H(a, b), () => o(a)), yt(() => bs(p, "offsetHeight", (b) => H(d, b))), Ne(p, (b) => ea(b)), O(() => J(x, "style", `padding-top: ${o(f) ?? ""}px; padding-bottom: ${o(u) ?? ""}px;`)), He("scroll", p, k), g(n, p), re();
}
var $h = /* @__PURE__ */ E('<div class="wx-kanban-drop-area svelte-raznc"></div>'), em = /* @__PURE__ */ E("<!> <!>", 1), tm = /* @__PURE__ */ E('<div class="wx-kanban-drop-area svelte-raznc"></div>'), nm = /* @__PURE__ */ E("<div><!></div>"), rm = /* @__PURE__ */ E('<div class="wx-list-wrapper svelte-raznc" data-id="scroll-column"><!></div>');
function am(n, e) {
  ne(e, !0);
  let t = S(e, "cardTemplate", 3, null);
  const r = he("wx-kanban-store"), { _scroll: a } = r.getReactiveState();
  let i = ae(void 0), s = ae(void 0), l = ae(void 0);
  r.on("start-drag-card", (h) => {
    H(s, Q(Oe(h.columnId, h.rowId))), H(i, Q(h.before)), H(l, Q(h.id));
  }), r.on("drag-card", (h) => {
    H(s, Q(h.dragAllowed ? Oe(h.columnId, h.rowId) : null)), H(i, Q(h.before));
  }), r.on("end-drag-card", () => {
    H(s, Q(H(i, Q(H(l, null)))));
  });
  const d = /* @__PURE__ */ B(() => e.cards.filter((h) => !se(o(l), h.id)));
  let c = ae(void 0);
  a.subscribe((h) => {
    h?.to === "card" && h.id && o(d).find((_) => se(_.id, h.id)) && (H(c, Q(h.id)), r.exec("scroll", null));
  });
  var f = $(), u = V(f);
  P(u, () => e.cards, (h) => {
    var _ = rm(), v = D(_);
    Xh(v, {
      get items() {
        return o(d);
      },
      get scrollToId() {
        return o(c);
      },
      children: (k, p) => {
        let x = () => p?.().item;
        var y = em(), b = V(y);
        P(b, () => se(x().id, o(i)) && se(o(s), e.areaId), (q) => {
          var K = $h();
          g(q, K);
        });
        var I = U(b, 2), A = /* @__PURE__ */ B(() => t() || ra), M = /* @__PURE__ */ B(() => e.isMenuVisible?.[x().id]?.visible);
        aa(I, {
          get cardTemplate() {
            return o(A);
          },
          get cardFields() {
            return x();
          },
          get menu() {
            return o(M);
          }
        }), g(k, y);
      },
      extra: (k) => {
        var p = nm(), x = D(p);
        P(x, () => !o(i) && se(o(s), e.areaId), (y) => {
          var b = tm();
          g(y, b);
        }), g(k, p);
      },
      $$slots: { default: !0, extra: !0 }
    }), O(() => ve(_, "wx-not-anchored", o(s))), g(h, _);
  }), g(n, f), re();
}
var im = /* @__PURE__ */ E('<div class="wx-kanban-drop-area svelte-15vp8g6"></div>'), om = /* @__PURE__ */ E("<!> <!>", 1), sm = /* @__PURE__ */ E('<div class="wx-kanban-drop-area svelte-15vp8g6"></div>'), lm = /* @__PURE__ */ E("<!> <!>", 1), cm = /* @__PURE__ */ E('<div class="wx-list-wrapper svelte-15vp8g6"><!></div>');
function dm(n, e) {
  ne(e, !0);
  let t = S(e, "cardTemplate", 3, null);
  const r = he("wx-kanban-store");
  let a = ae(void 0), i = ae(void 0);
  r.on("start-drag-card", (d) => {
    H(i, Q(Oe(d.columnId, d.rowId))), H(a, Q(d.before));
  }), r.on("drag-card", (d) => {
    H(i, Q(d.dragAllowed ? Oe(d.columnId, d.rowId) : null)), H(a, Q(d.before));
  }), r.on("end-drag-card", () => {
    H(i, Q(H(a, null)));
  });
  var s = $(), l = V(s);
  P(l, () => e.cards, (d) => {
    var c = cm(), f = D(c);
    P(f, () => e.cards, (u) => {
      var h = lm(), _ = V(h);
      Ie(_, 17, () => e.cards, (m) => m.id, (m, w) => {
        var k = om(), p = V(k);
        P(p, () => se(o(w).id, o(a)) && se(o(i), e.areaId), (I) => {
          var A = im();
          g(I, A);
        });
        var x = U(p, 2), y = /* @__PURE__ */ B(() => t() || ra), b = /* @__PURE__ */ B(() => e.isMenuVisible?.[o(w).id]?.visible);
        aa(x, {
          get cardTemplate() {
            return o(y);
          },
          get cardFields() {
            return o(w);
          },
          get menu() {
            return o(b);
          }
        }), g(m, k);
      });
      var v = U(_, 2);
      P(v, () => !o(a) && se(o(i), e.areaId), (m) => {
        var w = sm();
        g(m, w);
      }), g(u, h);
    }), Ne(c, (u) => ea(u)), O(() => ve(c, "wx-not-anchored", o(i))), g(d, c);
  }), g(n, s), re();
}
function um(n, e, t, r) {
  e.exec("add-card", {
    columnId: t.column.id,
    rowId: t.row.id,
    card: { label: r("Untitled") }
  });
}
var fm = /* @__PURE__ */ E('<div class="wx-kanban-drop-area svelte-u46fyc"></div>'), vm = /* @__PURE__ */ E("<!> <!>", 1), hm = /* @__PURE__ */ E('<div class="wx-kanban-drop-area svelte-u46fyc"></div>'), mm = /* @__PURE__ */ E("<!> <!>", 1), gm = /* @__PURE__ */ E('<div class="wx-add-card-btn svelte-u46fyc"><!> <span class="wx-add-card-tip svelte-u46fyc"> </span></div>'), _m = /* @__PURE__ */ E('<div class="wx-swimlane-limit svelte-u46fyc"> </div>'), wm = /* @__PURE__ */ E('<!> <div class="wx-controls-wrapper svelte-u46fyc"><!> <!></div>', 1), ym = /* @__PURE__ */ E("<div><!> <!></div>");
function Za(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(_, "$readonly", t), a = () => ce(h, "$_areasMeta", t), i = () => ce(w, "$_cardsMap", t), s = () => ce(v, "$columnShape", t), l = () => ce(m, "$_layout", t);
  let d = S(e, "cardTemplate", 3, null), c = S(e, "virtual", 3, null);
  const f = he("wx-kanban-store"), u = he("wx-i18n").getGroup("kanban"), {
    _areasMeta: h,
    readonly: _,
    columnShape: v,
    _layout: m,
    _cardsMap: w
  } = f.getReactiveState();
  let k = ae(void 0), p = ae(void 0);
  f.on("start-drag-card", (T) => {
    H(p, Q(Oe(T.columnId, T.rowId))), H(k, Q(T.before));
  }), f.on("drag-card", (T) => {
    H(p, Q(T.dragAllowed ? Oe(T.columnId, T.rowId) : null)), H(k, Q(T.before));
  }), f.on("end-drag-card", () => {
    H(p, Q(H(k, null)));
  });
  const x = /* @__PURE__ */ B(() => r().add), y = /* @__PURE__ */ B(() => a()[Oe(e.column.id, e.row.id)]), b = /* @__PURE__ */ B(() => a()[e.column.id]), I = /* @__PURE__ */ B(() => {
    const T = i()[Oe(e.column.id, e.row.id)];
    if (c() && T) {
      let [L, z] = [
        c().startIndex,
        c().endIndex
      ];
      return c().byRow[e.row.id] && ([L, z] = [
        c().byRow[e.row.id].startIndex,
        c().byRow[e.row.id].endIndex
      ]), T.slice(L, z);
    }
    return T;
  }), A = /* @__PURE__ */ B(() => Oe(e.column.id, e.row.id)), M = /* @__PURE__ */ B(() => o(y)?.height), q = /* @__PURE__ */ B(() => o(M) ? `${o(M)}px` : "auto");
  function K(T, L, z, N) {
    let C = "wx-column";
    return L.collapsed && (C += " wx-collapsed"), z && (C += " wx-over-limit"), L.css && (C += " " + L.css), T?.css && (C += " " + T.css(L, N)), C;
  }
  const j = /* @__PURE__ */ B(() => K(s(), e.column, o(y).isOverLimit, i()[e.column.id]));
  var Z = ym(), G = D(Z);
  P(
    G,
    () => !e.column.collapsed,
    (T) => {
      var L = wm(), z = V(L);
      P(
        z,
        () => l() === "column:lazy",
        (Y) => {
          am(Y, {
            get cards() {
              return o(I);
            },
            get cardTemplate() {
              return d();
            },
            get areaId() {
              return o(A);
            },
            get isMenuVisible() {
              return e.isMenuVisible;
            }
          });
        },
        (Y) => {
          var W = $(), ee = V(W);
          P(
            ee,
            () => l() === "column:default",
            (ie) => {
              dm(ie, {
                get cards() {
                  return o(I);
                },
                get cardTemplate() {
                  return d();
                },
                get areaId() {
                  return o(A);
                },
                get isMenuVisible() {
                  return e.isMenuVisible;
                }
              });
            },
            (ie) => {
              var de = mm(), X = V(de);
              P(X, () => o(I), (le) => {
                var fe = $(), ge = V(fe);
                Ie(ge, 17, () => o(I), (ue) => ue.id, (ue, _e) => {
                  var be = vm(), xe = V(be);
                  P(xe, () => se(o(_e).id, o(k)) && se(o(p), o(A)), (Be) => {
                    var Pt = fm();
                    g(Be, Pt);
                  });
                  var we = U(xe, 2), Le = /* @__PURE__ */ B(() => d() || ra), Pe = /* @__PURE__ */ B(() => e.isMenuVisible?.[o(_e).id]?.visible);
                  aa(we, {
                    get cardTemplate() {
                      return o(Le);
                    },
                    get cardFields() {
                      return o(_e);
                    },
                    get menu() {
                      return o(Pe);
                    }
                  }), g(ue, be);
                }), g(le, fe);
              });
              var oe = U(X, 2);
              P(oe, () => !o(k) && se(o(p), o(A)), (le) => {
                var fe = hm();
                g(le, fe);
              }), g(ie, de);
            },
            !0
          ), g(Y, W);
        }
      );
      var N = U(z, 2), C = D(N);
      P(C, () => o(x) && (typeof e.column.limit == "object" ? !o(y).noFreeSpace : !o(b).noFreeSpace), (Y) => {
        var W = gm();
        W.__click = [um, f, e, u];
        var ee = D(W);
        Me(ee, { css: "wxi-plus" });
        var ie = U(ee, 2), de = D(ie);
        O(() => te(de, u("Add new card..."))), g(Y, W);
      });
      var F = U(C, 2);
      P(F, () => o(y).rowId && typeof e.column.limit == "object" && o(y).totalLimit, (Y) => {
        var W = _m(), ee = D(W);
        O(() => te(ee, `${o(y).cardsCount ?? ""}/${o(y).totalLimit ?? ""}`)), g(Y, W);
      }), g(T, L);
    },
    (T) => {
      var L = $(), z = V(L);
      P(
        z,
        () => s().collapsedTemplate,
        (N) => {
          var C = $();
          const F = /* @__PURE__ */ B(() => s().collapsedTemplate);
          var Y = V(C);
          Ct(Y, () => o(F), (W, ee) => {
            ee(W, {
              get column() {
                return e.column;
              },
              get columnState() {
                return o(y);
              }
            });
          }), g(N, C);
        },
        (N) => {
          Zh(N, {
            get column() {
              return e.column;
            },
            get columnState() {
              return o(y);
            }
          });
        },
        !0
      ), g(T, L);
    }
  );
  var R = U(G, 2);
  P(R, () => e.column.overlay, (T) => {
    var L = $(), z = V(L);
    Ct(z, () => e.column.overlay, (N, C) => {
      C(N, {});
    }), g(T, L);
  }), O(() => {
    ye(Z, `${o(j) ?? ""} svelte-u46fyc`), J(Z, "data-drop-area", o(A)), J(Z, "style", `min-height:${o(q) ?? ""};`);
  }), g(n, Z), re();
}
me(["click"]);
var xm = /* @__PURE__ */ E('<div class="wx-label svelte-1dnc12v"> <!></div>'), bm = /* @__PURE__ */ E('<div class="wx-menu svelte-1dnc12v"><!></div>'), pm = /* @__PURE__ */ E('<div class="wx-collapse-icon svelte-1dnc12v"><!></div> <!> <!>', 1);
function km(n, e) {
  ne(e, !0);
  let t = S(e, "renaming", 3, !1), r = S(e, "readonly", 3, !1);
  var a = pm(), i = V(a);
  J(i, "data-action", "collapse");
  var s = D(i), l = /* @__PURE__ */ B(() => e.column.collapsed ? "wxi-angle-right" : "wxi-angle-left");
  Me(s, {
    get css() {
      return o(l);
    }
  });
  var d = U(i, 2);
  P(d, () => !t() && !e.column.collapsed, (f) => {
    var u = xm();
    J(u, "data-action", "rename");
    var h = D(u), _ = U(h);
    P(_, () => e.column.limit, (v) => {
      var m = Se();
      O(() => te(m, `(${e.columnState.cardsCount ?? ""}/${e.columnState.totalLimit ?? ""})`)), g(v, m);
    }), O(() => te(h, `${e.column.label ?? ""} `)), g(f, u);
  });
  var c = U(d, 2);
  P(c, () => e.isMenuVisible && !r() && !t() && !e.column.collapsed, (f) => {
    var u = bm(), h = D(u);
    Me(h, { css: "wxi-dots-h" }), O(() => J(u, "data-menu-id", e.column.id)), g(f, u);
  }), g(n, a), re();
}
var Sm = /* @__PURE__ */ E('<span class="wx-mark svelte-1doi7f4">Trial</span>'), Im = /* @__PURE__ */ E('<input type="text" class="wx-input svelte-1doi7f4">'), Em = /* @__PURE__ */ E("<div><!> <!> <!></div>");
function Dm(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(c, "$_areasMeta", t), a = () => ce(f, "$columnShape", t), i = () => ce(u, "$_cardsMap", t), s = () => ce(h, "$readonly", t);
  let l = S(e, "renaming", 7, !1);
  const d = he("wx-kanban-store"), {
    _areasMeta: c,
    columnShape: f,
    _cardsMap: u,
    readonly: h
  } = d.getReactiveState(), _ = /* @__PURE__ */ B(() => r()[e.column.id]);
  let v = null, m = ae(void 0);
  function w() {
    l() && v?.trim() && d.exec("update-column", {
      id: e.column.id,
      column: { label: v }
    }), l(!1), v = null, e.onaction?.({ action: "close-column-input", data: {} });
  }
  function k(R) {
    v = R.target.value;
  }
  function p(R) {
    R.charCode === 13 && w();
  }
  function x(R) {
    R.focus();
  }
  function y(R, T, L, z) {
    let N = "wx-column";
    return T.collapsed && (N += " wx-collapsed"), L && (N += " wx-over-limit"), T.css && (N += " " + T.css), R?.css && (N += " " + R.css(T, z)), N;
  }
  const b = /* @__PURE__ */ B(() => y(a(), e.column, o(_).isOverLimit, i()[e.column.id])), { register: I, unregister: A, handleOffsetChange: M } = uo();
  function q() {
    M?.(e.column.id, e.index, o(m).offsetLeft);
  }
  vt(() => I(e.column.id, o(m), q)), Kr(() => {
    A(e.column.id, e.index);
  });
  var K = Em(), j = D(K);
  P(
    j,
    () => a().headerTemplate,
    (R) => {
      var T = $();
      const L = /* @__PURE__ */ B(() => a().headerTemplate);
      var z = V(T), N = /* @__PURE__ */ B(() => !s().edit);
      Ct(z, () => o(L), (C, F) => {
        F(C, {
          get column() {
            return e.column;
          },
          get columnState() {
            return o(_);
          },
          get isMenuVisible() {
            return e.isMenuVisible;
          },
          get renaming() {
            return l();
          },
          get readonly() {
            return o(N);
          }
        });
      }), g(R, T);
    },
    (R) => {
      var T = /* @__PURE__ */ B(() => !s().edit);
      km(R, {
        get column() {
          return e.column;
        },
        get columnState() {
          return o(_);
        },
        get isMenuVisible() {
          return e.isMenuVisible;
        },
        get renaming() {
          return l();
        },
        get readonly() {
          return o(T);
        }
      });
    }
  );
  var Z = U(j, 2);
  P(Z, () => !$i(), (R) => {
    var T = Sm();
    const L = /* @__PURE__ */ B(eo);
    O(() => ve(T, "wx-error", o(L))), g(R, T);
  });
  var G = U(Z, 2);
  P(G, l, (R) => {
    var T = Im();
    T.__input = k, Ne(T, (L) => x(L)), O(() => Ht(T, e.column.label)), He("keypress", T, p), He("blur", T, w), g(R, T);
  }), Te(K, (R) => H(m, R), () => o(m)), O(() => {
    ye(K, `${o(b) ?? ""} svelte-1doi7f4`), J(K, "data-id", e.column.id), J(K, "data-column-header", e.column.id);
  }), g(n, K), re();
}
me(["input"]);
var Cm = /* @__PURE__ */ E('<div class="wx-header svelte-1vlv8y5"></div> <!>', 1);
function Ja(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(f, "$columnShape", t), a = () => ce(c, "$readonly", t), i = () => ce(u, "$columns", t), s = he("wx-kanban-store"), l = he("wx-i18n").getGroup("kanban"), { showModal: d } = he("wx-helpers"), { readonly: c, columnShape: f, columns: u } = s.getReactiveState(), h = /* @__PURE__ */ B(() => r().fixedHeaders !== !1), _ = /* @__PURE__ */ B(() => a().add === !1), v = (R, T, L, z) => {
    let N = z.menu.items({ columns: L, columnIndex: T, column: R });
    return !N || !N.length ? null : (o(_) && (N = N.filter((C) => C.id !== "add-card")), N.map((C) => nr(C, l)));
  }, m = /* @__PURE__ */ B(() => {
    const R = {};
    return i().forEach((T, L) => {
      R[T.id] = v(T, L, i(), r());
    }), R;
  });
  function w(R, T) {
    const L = i().findIndex((C) => C.id === R), z = T === "left" ? L - 1 : L + 2, N = i()[z]?.id;
    s.exec("move-column", { id: R, before: N });
  }
  let k = ae(null);
  function p(R) {
    const { action: T, context: L } = R;
    if (T) {
      if (T.onClick) {
        T.onClick({ id: T.id, item: T, column: L });
        return;
      }
      switch (T.id) {
        case "add-card":
          s.exec("add-card", {
            columnId: L.id,
            card: { label: l("Untitled") }
          });
          break;
        case "set-edit":
          a().edit && H(k, Q(L.id));
          break;
        case "delete-column": {
          (r().confirmDeletion ?? !0 ? d({
            message: l("Would you like to delete this column?")
          }) : Promise.resolve()).then(() => {
            s.exec("delete-column", { id: L.id });
          }).catch(() => {
          });
          break;
        }
        case "move-column:left":
          w(L.id, "left");
          break;
        case "move-column:right":
          w(L.id, "right");
          break;
      }
    }
  }
  let x = ae(null), y = ae(Q([]));
  function b(R) {
    return H(y, Q(o(m)[R] || [])), i().find((T) => T.id === R);
  }
  const I = ({ action: R, data: T }) => {
    if (R === "close-column-input") H(k, null);
    else if (R === "expand-column") {
      A(T.id);
      return;
    }
  };
  function A(R) {
    const T = i().find((L) => L.id == R);
    s.exec("update-column", { id: R, column: { collapsed: !T.collapsed } });
  }
  function M(R, T) {
    fo(T.target, "data-action")?.dataset.action !== "rename" || !a().edit || i().find((z) => z.id == R).collapsed || H(k, Q(R));
  }
  const q = {
    dblclick: M,
    collapse: A
  };
  function K(R) {
    return r().menu.show && !!o(m)[R]?.length;
  }
  var j = Cm(), Z = V(j);
  Z.__click = function(...R) {
    o(x).show?.apply(this, R);
  }, Ie(Z, 7, i, (R) => R.id, (R, T, L) => {
    var z = /* @__PURE__ */ B(() => K(o(T).id)), N = /* @__PURE__ */ B(() => o(k) == o(T).id);
    Dm(R, {
      get column() {
        return o(T);
      },
      get isMenuVisible() {
        return o(z);
      },
      get renaming() {
        return o(N);
      },
      get index() {
        return o(L);
      },
      onaction: I
    });
  }), Ne(Z, (R, T) => ho(R, T), () => q);
  var G = U(Z, 2);
  Te(
    rr(G, {
      at: "left-bottom",
      get options() {
        return o(y);
      },
      resolver: b,
      dataKey: "menuId",
      onclick: p
    }),
    (R) => H(x, Q(R)),
    () => o(x)
  ), O(() => ve(Z, "fixed", o(h))), g(n, j), re();
}
me(["click"]);
var Mm = /* @__PURE__ */ E("<!> <!>", 1), Am = /* @__PURE__ */ E("<!> <!>", 1), Tm = /* @__PURE__ */ E("<!> <!>", 1), Pm = /* @__PURE__ */ E("<!> <!>", 1), Rm = /* @__PURE__ */ E('<div class="wx-kanban svelte-3y7ur4"><div class="wx-content-wrapper svelte-3y7ur4"><div class="wx-content svelte-3y7ur4"><!></div></div> <!></div> <!>', 1);
function Lm(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(w, "$cards", t), a = () => ce(m, "$cardShape", t), i = () => ce(v, "$readonly", t), s = () => ce(p, "$_layout", t), l = () => ce(h, "$columns", t), d = () => ce(_, "$rows", t), c = () => ce(k, "$editor", t), f = he("wx-kanban-store"), u = he("wx-i18n").getGroup("kanban");
  let {
    columns: h,
    rows: _,
    readonly: v,
    cardShape: m,
    cards: w,
    editor: k,
    _layout: p
  } = f.getReactiveState();
  const { showModal: x } = he("wx-helpers");
  let y = ae(null), b = ae(Q([]));
  const I = (C, F) => {
    const Y = F.menu.items({ card: C });
    return !Y || !Y.length ? null : Y.map((W) => nr(W, u));
  }, A = /* @__PURE__ */ B(() => r().reduce(
    (C, F) => {
      const Y = I(F, a());
      return C[F.id] = {
        options: Y,
        visible: !!(a().menu.show && Y?.length)
      }, C;
    },
    {}
  ));
  function M(C) {
    const F = r().find((Y) => Y.id == C);
    return F && (f.getState().selected?.length > 1 && f.exec("select-card", { id: parseInt(C) }), H(b, Q(o(A)[F.id].options || []))), F;
  }
  function q(C) {
    const { action: F, context: Y } = C;
    if (F) {
      if (F.onClick) {
        F.onClick({ id: F.id, item: F, card: Y });
        return;
      }
      switch (F.id) {
        case "delete-card": {
          (a().confirmDeletion?.show ?? !0 ? K() : Promise.resolve()).then(() => {
            f.exec("delete-card", { id: Y.id });
          }).catch(() => {
          });
          break;
        }
        case "set-edit":
          f.exec("set-edit", { cardId: Y.id, eventSource: "ui" });
          break;
        case "duplicate-card":
          f.exec("duplicate-card", {
            id: Y.id,
            card: {
              label: `${u("Duplicate of")} ${Y.label}`
            }
          });
          break;
      }
    }
  }
  function K() {
    return x({
      message: u("Would you like to delete this card?")
    });
  }
  Sf(h);
  let j = ae(void 0);
  f.on("start-drag-card", (C) => {
    H(j, Q(C.id));
  }), f.on("end-drag-card", () => {
    H(j, null);
  });
  var Z = Rm(), G = V(Z), R = D(G), T = D(R);
  T.__click = function(...C) {
    o(y).show?.apply(this, C);
  };
  var L = D(T);
  P(
    L,
    () => s() === "default:lazy",
    (C) => {
      iv(C, { children: (Y, W) => {
        let ee = () => W?.().startIndex, ie = () => W?.().endIndex, de = () => W?.().byRow;
        var X = Am(), oe = V(X);
        Ja(oe, {});
        var le = U(oe, 2);
        P(le, () => l().length, (fe) => {
          var ge = Mm(), ue = V(ge);
          Ie(ue, 1, d, (be) => be.id, (be, xe) => {
            var we = $(), Le = V(we);
            P(Le, () => de()[o(xe).id]?.visible, (Pe) => {
              ja(Pe, {
                get row() {
                  return o(xe);
                },
                children: (Be, Pt) => {
                  var et = $(), tt = V(et);
                  Ie(tt, 1, l, (qe) => qe.id, (qe, nt) => {
                    var sa = /* @__PURE__ */ B(() => ({
                      startIndex: ee(),
                      endIndex: ie(),
                      byRow: de()
                    }));
                    Za(qe, {
                      get column() {
                        return o(nt);
                      },
                      get row() {
                        return o(xe);
                      },
                      get virtual() {
                        return o(sa);
                      },
                      get cardTemplate() {
                        return e.cardTemplate;
                      },
                      get isMenuVisible() {
                        return o(A);
                      }
                    });
                  }), g(Be, et);
                },
                $$slots: { default: !0 }
              });
            }), g(be, we);
          });
          var _e = U(ue, 2);
          Wa(_e, {}), g(fe, ge);
        }), g(Y, X);
      }, $$slots: { default: !0 } });
    },
    (C) => {
      var F = Pm(), Y = V(F);
      Ja(Y, {});
      var W = U(Y, 2);
      P(W, () => l().length, (ee) => {
        var ie = Tm(), de = V(ie);
        Ie(de, 1, d, (oe) => oe.id, (oe, le) => {
          ja(oe, {
            get row() {
              return o(le);
            },
            children: (fe, ge) => {
              var ue = $(), _e = V(ue);
              Ie(_e, 1, l, (be) => be.id, (be, xe) => {
                Za(be, {
                  get column() {
                    return o(xe);
                  },
                  get row() {
                    return o(le);
                  },
                  get cardTemplate() {
                    return e.cardTemplate;
                  },
                  get isMenuVisible() {
                    return o(A);
                  }
                });
              }), g(fe, ue);
            },
            $$slots: { default: !0 }
          });
        });
        var X = U(de, 2);
        Wa(X, {}), g(ee, ie);
      }), g(C, F);
    }
  ), Ne(R, (C, F) => ff(C, F), () => ({
    api: f,
    readonly: i().select === !1
  }));
  var z = U(R, 2);
  P(z, () => i().edit && !o(j) && c().show !== !1, (C) => {
    uh(C, {});
  }), Ne(G, (C, F) => uf(C, F), () => ({ api: f, readonly: i().dnd === !1 })), Ne(G, (C, F) => _f(C, F), () => ({
    api: f,
    readonly: i().edit === !1,
    locale: u,
    confirmDeletion: a().confirmDeletion?.show ?? !0 ? K : null
  })), Ne(G, (C, F) => gf(C, F), () => ({ api: f, tick: kt }));
  var N = U(G, 2);
  Te(
    rr(N, {
      at: "left-bottom",
      get options() {
        return o(b);
      },
      resolver: M,
      dataKey: "menuId",
      onclick: q
    }),
    (C) => H(y, Q(C)),
    () => o(y)
  ), O(() => {
    J(G, "data-wx-widget", Ue.kanban), ve(G, "wx-dragged", !!o(j)), ve(G, "wx-touch", kf.isMobile || navigator.maxTouchPoints > 1), J(R, "data-kanban-id", Ue.content), ve(R, "wx-virtual-content", s() === "default:lazy"), J(T, "data-kanban-id", Ue.scrollableContent), ve(T, "wx-virtual-content", s() === "default:lazy"), ve(T, "wx-not-anchored", !!o(j));
  }), g(n, Z), re();
}
me(["click"]);
function Fm(n, e) {
  ne(e, !0);
  let t = S(e, "rows", 3, null), r = S(e, "cardShape", 3, Cn), a = S(e, "columnShape", 3, null), i = S(e, "rowShape", 3, null), s = S(e, "editorShape", 3, null), l = S(e, "readonly", 3, !1), d = S(e, "columnKey", 3, "column"), c = S(e, "rowKey", 3, ""), f = S(e, "scrollType", 3, "default"), u = S(e, "renderType", 3, "default"), h = S(e, "cardHeight", 3, null), _ = S(e, "cardTemplate", 3, null), v = S(e, "editor", 27, () => Q(Xr)), m = S(e, "history", 3, !0), w = S(e, "currentUser", 3, null), k = S(e, "links", 3, null), p = S(e, "dataStore", 15, null), x = S(e, "init", 3, null), y = /* @__PURE__ */ gn(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "columns",
    "rows",
    "cards",
    "cardShape",
    "columnShape",
    "rowShape",
    "editorShape",
    "readonly",
    "columnKey",
    "rowKey",
    "scrollType",
    "renderType",
    "cardHeight",
    "cardTemplate",
    "editor",
    "history",
    "currentUser",
    "links",
    "dataStore",
    "init"
  ]);
  const b = /-/g;
  let I = new Ml((K, j) => {
    const Z = "on" + K.replace(b, "");
    y[Z] && y[Z](j);
  });
  p() || (p(new of((K) => Jr(K), { history: m() })), p().out.setNext(I));
  const A = yf(p(), I);
  wt("wx-kanban-store", A);
  let M = !0;
  const q = () => {
    p().init({
      columnKey: d(),
      rowKey: c(),
      columns: e.columns,
      rows: t(),
      cards: e.cards,
      cardShape: r(),
      columnShape: a(),
      editorShape: s(),
      rowShape: i(),
      readonly: l(),
      cardHeight: h(),
      currentUser: w(),
      links: k(),
      editor: v(),
      scrollType: f(),
      renderType: u(),
      _cardsMap: {},
      _cardsMeta: {}
    }), M && x() && (x()(A), M = !1);
  };
  return q(), gt(q), Tt(n, {
    words: { ...er, ...$n },
    optional: !0,
    children: (K, j) => {
      Kd(K, {
        children: (Z, G) => {
          Lm(Z, {
            get cardTemplate() {
              return _();
            }
          });
        },
        $$slots: { default: !0 }
      });
    },
    $$slots: { default: !0 }
  }), re({ api: A });
}
function Om(n, e) {
  ne(e, !0);
  let t = S(e, "fonts", 3, !0);
  var r = $(), a = V(r);
  P(
    a,
    () => e.children,
    (i) => {
      Ma(i, {
        get fonts() {
          return t();
        },
        children: (s, l) => {
          var d = $(), c = V(d);
          Ee(c, () => e.children ?? De), g(s, d);
        },
        $$slots: { default: !0 }
      });
    },
    (i) => {
      Ma(i, {
        get fonts() {
          return t();
        }
      });
    }
  ), g(n, r), re();
}
function Nm(n, e) {
  ne(e, !0);
  let t = S(e, "fonts", 3, !0);
  var r = $(), a = V(r);
  P(
    a,
    () => e.children,
    (i) => {
      Aa(i, {
        get fonts() {
          return t();
        },
        children: (s, l) => {
          var d = $(), c = V(d);
          Ee(c, () => e.children ?? De), g(s, d);
        },
        $$slots: { default: !0 }
      });
    },
    (i) => {
      Aa(i, {
        get fonts() {
          return t();
        }
      });
    }
  ), g(n, r), re();
}
function Bm(n, e) {
  ne(e, !0);
  let t = S(e, "fonts", 3, !0);
  var r = $(), a = V(r);
  P(
    a,
    () => e.children,
    (i) => {
      Ta(i, {
        get fonts() {
          return t();
        },
        children: (s, l) => {
          var d = $(), c = V(d);
          Ee(c, () => e.children ?? De), g(s, d);
        },
        $$slots: { default: !0 }
      });
    },
    (i) => {
      Ta(i, {
        get fonts() {
          return t();
        }
      });
    }
  ), g(n, r), re();
}
var zm = /* @__PURE__ */ E('<div class="wx-item-inner svelte-yq8s5f"><span class="wx-list-item-text svelte-yq8s5f"> </span></div>'), Hm = /* @__PURE__ */ E('<div class="wx-list-item svelte-yq8s5f"><!></div>'), qm = /* @__PURE__ */ E('<div class="wx-results svelte-yq8s5f"></div>'), Um = /* @__PURE__ */ E('<div class="wx-list-item wx-no-results svelte-yq8s5f"> </div>'), Ym = /* @__PURE__ */ E('<div class="wx-search-popup svelte-yq8s5f"><div class="wx-settings svelte-yq8s5f"><div class="wx-select svelte-yq8s5f"><div class="wx-title svelte-yq8s5f"> </div> <!></div></div> <!></div>'), Km = /* @__PURE__ */ E('<div class="wx-search svelte-yq8s5f"><div class="wx-search-input svelte-yq8s5f"><!></div> <!></div>');
function Gm(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(o(l), "$_cardsMeta", t), a = () => ce(o(d), "$search", t), i = he("wx-i18n").getGroup("kanban");
  let s = S(e, "options", 19, () => [
    { id: null, label: i("Everywhere") },
    { id: "label", label: i("Label") },
    {
      id: "description",
      label: i("Description")
    }
  ]);
  const l = /* @__PURE__ */ B(() => e.api?.getReactiveState()._cardsMeta), d = /* @__PURE__ */ B(() => e.api?.getReactiveState().search), c = /* @__PURE__ */ B(() => {
    if (r()) {
      const M = Object.keys(r()).reduce(
        (q, K) => (r()[K].found && q.push(e.api?.getCard(K)), q),
        []
      );
      if (M.length)
        return M;
    }
    return null;
  });
  function f({ value: M }) {
    M || (M = null);
    const q = s().find((K) => K.id === M);
    e.api?.exec("set-search", {
      value: a()?.value || "",
      by: M,
      searchRule: q?.searchRule
    });
  }
  let u = ae(!1), h = ae(void 0);
  function _(M) {
    o(h).contains(M.target) || (H(u, !1), e.api?.exec("set-search", { value: "", by: a()?.by || null }));
  }
  function v({ value: M, input: q }) {
    a()?.value !== M && (H(u, !!q), e.api?.exec("set-search", { value: M, by: a()?.by || null }));
  }
  function m() {
    H(u, !0);
  }
  function w(M) {
    e.api?.exec("select-card", { id: M }), H(u, !1);
  }
  const k = {
    click: (M) => w(M)
  };
  var p = Km();
  J(p, "tabindex", 1);
  var x = D(p);
  x.__click = m;
  var y = D(x), b = /* @__PURE__ */ B(() => a()?.value || ""), I = /* @__PURE__ */ B(() => i("Search"));
  tr(y, {
    get value() {
      return o(b);
    },
    get placeholder() {
      return o(I);
    },
    clear: !0,
    icon: "wxi-search",
    css: "wx-icon-left",
    onchange: v,
    onfocus: m
  });
  var A = U(x, 2);
  P(A, () => o(u), (M) => {
    At(M, {
      oncancel: _,
      children: (q, K) => {
        var j = Ym(), Z = D(j), G = D(Z), R = D(G), T = D(R);
        O(() => te(T, `${i("Search in") ?? ""}:`));
        var L = U(R, 2), z = /* @__PURE__ */ B(() => a()?.by || null);
        ji(L, {
          get value() {
            return o(z);
          },
          get options() {
            return s();
          },
          onchange: f
        });
        var N = U(Z, 2);
        P(
          N,
          () => o(c),
          (C) => {
            var F = qm();
            Ie(F, 21, () => o(c), it, (Y, W) => {
              var ee = Hm(), ie = D(ee);
              P(
                ie,
                () => e.resultTemplate,
                (de) => {
                  var X = $();
                  const oe = /* @__PURE__ */ B(() => e.resultTemplate);
                  var le = V(X);
                  Ct(le, () => o(oe), (fe, ge) => {
                    ge(fe, {
                      get result() {
                        return o(W);
                      }
                    });
                  }), g(de, X);
                },
                (de) => {
                  var X = zm(), oe = D(X), le = D(oe);
                  O(() => te(le, o(W).label)), g(de, X);
                }
              ), O(() => J(ee, "data-id", o(W).id)), g(Y, ee);
            }), Ne(F, (Y, W) => ho(Y, W), () => k), g(C, F);
          },
          (C) => {
            var F = Um(), Y = D(F);
            O(() => te(Y, i("No results"))), g(C, F);
          }
        ), g(q, j);
      },
      $$slots: { default: !0 }
    });
  }), Te(p, (M) => H(h, M), () => o(h)), O(() => J(p, "data-wx-widget", Ue.search)), g(n, p), re();
}
me(["click"]);
function Vm(n, e) {
  ne(e, !0);
  const t = he("wx-i18n").getGroup("kanban");
  function r() {
    e.api?.exec("add-row", {
      id: Gr(),
      row: { label: t("Untitled") }
    });
  }
  var a = /* @__PURE__ */ B(() => t("Add new row"));
  Me(n, {
    onclick: r,
    get title() {
      return o(a);
    },
    css: "wxi-table-row-plus-after"
  }), re();
}
function Wm(n, e) {
  ne(e, !0);
  const t = he("wx-i18n").getGroup("kanban");
  function r() {
    e.api?.exec("add-column", {
      id: Gr(),
      column: { label: t("Untitled") }
    });
  }
  var a = /* @__PURE__ */ B(() => t("Add new column"));
  Me(n, {
    onclick: r,
    get title() {
      return o(a);
    },
    css: "wxi-table-column-plus-after"
  }), re();
}
var jm = /* @__PURE__ */ E('<div class="wx-preserve svelte-r6cslo"><!> </div>'), Zm = /* @__PURE__ */ E('<div class="wx-control svelte-r6cslo"><!></div>'), Jm = /* @__PURE__ */ E("<!> <!>", 1);
function Qm(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(o(l), "$stateSort", t), a = he("wx-i18n").getGroup("kanban");
  let i = S(e, "options", 3, null);
  const s = /* @__PURE__ */ B(() => (Array.isArray(i()) ? i() : ku()).map((v) => {
    const { id: m, text: w, label: k, dir: p } = v;
    return {
      ...v,
      id: m || wn(),
      text: a(w || k),
      icon: p === "asc" ? "wxi-asc" : "wxi-desc"
    };
  }));
  let l = /* @__PURE__ */ B(() => e.api?.getReactiveState().sort), d = /* @__PURE__ */ B(() => r()?.preserve ? o(s).find((v) => v.by === r().by && v.dir === r().dir) : null);
  function c(v) {
    const m = v?.action;
    if (m) {
      const w = o(s).find((k) => k.id === m.id);
      w && e.api.exec("set-sort", { by: w.by, dir: w.dir });
    }
  }
  function f() {
    e.api.exec("set-sort", null);
  }
  var u = Jm(), h = V(u);
  P(h, () => o(d), (v) => {
    var m = jm(), w = D(m);
    Me(w, { css: "wxi-close", onclick: f });
    var k = U(w);
    O(() => te(k, ` ${o(d).text ?? ""}`)), g(v, m);
  });
  var _ = U(h, 2);
  rv(_, {
    get options() {
      return o(s);
    },
    at: "left-bottom",
    onclick: c,
    children: (v, m) => {
      var w = Zm();
      O(() => J(w, "title", a("Sort")));
      var k = D(w);
      Me(k, { css: "wxi-sort" }), g(v, w);
    },
    $$slots: { default: !0 }
  }), g(n, u), re();
}
function Xm(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(o(s), "$history", t), a = he("wx-i18n").getGroup("kanban");
  function i() {
    e.api.exec("undo");
  }
  const s = /* @__PURE__ */ B(() => e.api?.getReactiveState().history), l = /* @__PURE__ */ B(() => o(s) && r().undo.length > 0);
  var d = /* @__PURE__ */ B(() => a("Undo")), c = /* @__PURE__ */ B(() => `wxi-undo ${o(l) ? "" : "wx-disabled"}`);
  Me(n, {
    onclick: i,
    get title() {
      return o(d);
    },
    get css() {
      return o(c);
    }
  }), re();
}
function $m(n, e) {
  ne(e, !0);
  const t = Fe(), r = () => ce(o(s), "$history", t), a = he("wx-i18n").getGroup("kanban");
  function i() {
    e.api.exec("redo");
  }
  const s = /* @__PURE__ */ B(() => e.api?.getReactiveState().history), l = /* @__PURE__ */ B(() => o(s) && r().redo?.length > 0);
  var d = /* @__PURE__ */ B(() => a("Redo")), c = /* @__PURE__ */ B(() => `wxi-redo ${o(l) ? "" : "wx-disabled"}`);
  Me(n, {
    onclick: i,
    get title() {
      return o(d);
    },
    get css() {
      return o(c);
    }
  }), re();
}
function ia(n, e, t) {
  const r = document.createElement("DIV");
  r.className = "wx-theme", n.appendChild(r);
  let a = window.getComputedStyle(r).getPropertyValue("--wx-theme-name");
  return r.remove(), (e && e !== a || !e && !a && t) && (a && n.classList.remove(`wx-${a}-theme`), a = e || t, n.classList.add(`wx-${a}-theme`)), a;
}
function Ar(n, e) {
  ne(e, !0);
  let t = /* @__PURE__ */ gn(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "template"
  ]), r = /* @__PURE__ */ B(() => typeof e.template == "function" ? e.template({ ...t }) : e.template);
  var a = $(), i = V(a);
  P(i, () => o(r), (s) => {
    var l = $(), d = V(l);
    Xn(d, () => o(r)), g(s, l);
  }), g(n, a), re();
}
const Qa = {
  material: Om,
  willow: Nm,
  "willow-dark": Bm
};
class Hg {
  api;
  export;
  #e = ae();
  get config() {
    return o(this.#e);
  }
  set config(e) {
    H(this.#e, Q(e));
  }
  container;
  _kanban;
  constructor(e, t) {
    this.container = typeof e == "string" ? document.querySelector(e) : e, this.config = t, this._init();
  }
  destructor() {
    qr(this._kanban), this._kanban = this.api = null;
  }
  setConfig(e) {
    this._storeConfig(e), typeof e.history < "u" && console.debug("history cannot be reset at runtime"), typeof e.theme < "u" ? this.setTheme(e.theme) : this.api.getStores().data.init({ ...this.config });
  }
  parse(e) {
    const { cards: t, links: r, columns: a, rows: i } = e;
    (t || r || a || i) && (t && (this.config.cards = t), r && (this.config.links = r), a && (this.config.columns = a), i && (this.config.rows = i));
  }
  serialize() {
    const { cards: e, links: t, columns: r, rows: a } = this.api.getState();
    return { cards: e, links: t, columns: r, rows: a };
  }
  getCard(e) {
    return this.api.getCard(e);
  }
  getAreaCards(e, t) {
    return this.api.getAreaCards(e, t);
  }
  getColumnCards(e) {
    return this.api.getColumnCards(e);
  }
  getSelection() {
    return this.api.getState().selected;
  }
  undo() {
    this.api.exec("undo", null);
  }
  redo() {
    this.api.exec("redo", null);
  }
  addCard(e) {
    this.api.exec("add-card", e);
  }
  updateCard(e) {
    this.api.exec("update-card", e);
  }
  duplicateCard(e) {
    this.api.exec("duplicate-card", e);
  }
  deleteCard(e) {
    this.api.exec("delete-card", e);
  }
  moveCard(e) {
    this.api.exec("move-card", e);
  }
  addColumn(e) {
    this.api.exec("add-column", e);
  }
  updateColumn(e) {
    this.api.exec("update-column", e);
  }
  addRow(e) {
    this.api.exec("add-row", e);
  }
  updateRow(e) {
    this.api.exec("update-row", e);
  }
  moveColumn(e) {
    this.api.exec("move-column", e);
  }
  moveRow(e) {
    this.api.exec("move-row", e);
  }
  deleteColumn(e) {
    this.api.exec("delete-column", e);
  }
  deleteRow(e) {
    this.api.exec("delete-row", e);
  }
  addLink(e) {
    this.api.exec("add-link", e);
  }
  deleteLink(e) {
    this.api.exec("delete-link", e);
  }
  addComment(e) {
    this.api.exec("add-comment", e);
  }
  updateComment(e) {
    this.api.exec("update-comment", e);
  }
  deleteComment(e) {
    this.api.exec("delete-comment", e);
  }
  selectCard(e) {
    this.api.exec("select-card", e);
  }
  unselectCard(e) {
    this.api.exec("unselect-card", e);
  }
  setSearch(e) {
    this.api.exec("set-search", e);
  }
  setSort(e) {
    this.api.exec("set-sort", e);
  }
  setEdit(e) {
    this.api.exec("set-edit", { ...e });
  }
  scroll(e) {
    this.api.exec("scroll", e);
  }
  setLocale(e) {
    this._reset({ locale: e });
  }
  setTheme(e) {
    this._reset({ theme: e });
  }
  _init(e) {
    this._kanban && this.destructor();
    const t = ia(this.container, this.config.theme?.name, "material"), r = /* @__PURE__ */ new Map([
      ["wx-i18n", yn(this.config.locale)],
      ["wx-theme", t]
    ]);
    Qa[t] && dn(Qa[t], {
      target: this.container,
      props: { fonts: this.config.theme?.fonts }
    }), e && (this.config.dataStore = e), this._kanban = dn(Fm, {
      target: this.container,
      props: this.config,
      context: r,
      intro: !1
    }), this.api = this._kanban.api, this.export = this.api.export;
  }
  _reset(e) {
    const t = this.api.getStores().data;
    this._storeConfig(e), this._init(t);
  }
  _storeConfig(e) {
    const t = this.serialize();
    this.config = { ...this.config, ...t, ...e };
  }
}
function qg(n) {
  return new Proxy(Ar, {
    construct(e, [t]) {
      const r = t.props || {};
      return r.template = n, t.props = r, dn(e, t);
    }
  });
}
function eg(n, e) {
  Mr(n, {
    get api() {
      return e.api;
    },
    get config() {
      return e.config;
    },
    get shape() {
      return e.shape;
    }
  });
}
class Ug {
  api;
  config;
  container;
  _component;
  constructor(e, t) {
    this.container = typeof e == "string" ? document.querySelector(e) : e, this.config = t, this._init();
  }
  destructor() {
    qr(this._component), this._component = this.api = null;
  }
  setConfig(e) {
    e && (this.config = { ...this.config, ...e }, this._init());
  }
  /** @version v1.5.7 */
  setLocale(e, t) {
    this.setConfig({ locale: e, api: t });
  }
  _init() {
    this._component && this.destructor();
    const e = /* @__PURE__ */ new Map([
      ["wx-i18n", yn(this.config.locale)],
      [
        "wx-theme",
        ia(this.container, this.config.theme, "material")
      ]
    ]);
    this._component = dn(eg, {
      target: this.container,
      props: this._configToProps(this.config),
      context: e,
      intro: !1
    });
  }
  _configToProps(e) {
    return e;
  }
}
const yo = {};
function tg(n) {
  return yo[n] || n;
}
function Xt(n, e) {
  yo[n] = e;
}
var ng = /* @__PURE__ */ E("<div>&nbsp;</div>");
function xo(n, e) {
  let t = S(e, "menu", 3, !1);
  var r = ng();
  O(() => ye(r, `wx-separator${(t() ? "-menu" : "") ?? ""} svelte-1eu7qav`)), g(n, r);
}
var rg = /* @__PURE__ */ E('<div class="wx-spacer svelte-1mbb7ow"></div>');
function bo(n) {
  var e = rg();
  g(n, e);
}
var ag = /* @__PURE__ */ E("<div><!></div>");
function oa(n, e) {
  ne(e, !0);
  let t = S(e, "item", 19, () => ({})), r = S(e, "menu", 3, !1), a = /* @__PURE__ */ B(() => tg(t().comp || "label"));
  function i() {
    t().handler && t().handler(t()), e.onclick && e.onclick({ item: t() });
  }
  let s = /* @__PURE__ */ B(() => t().key ? e.values[t().key] : void 0);
  function l({ value: u }) {
    t().handler && t().handler(t(), u), e.onchange && e.onchange({ value: u, item: t() });
  }
  const d = /* @__PURE__ */ B(() => r() && t().menuText || t().text);
  var c = $(), f = V(c);
  P(
    f,
    () => t().comp == "spacer",
    (u) => {
      bo(u);
    },
    (u) => {
      var h = $(), _ = V(h);
      P(
        _,
        () => t().comp == "separator",
        (v) => {
          xo(v, {
            get menu() {
              return r();
            }
          });
        },
        (v) => {
          var m = ag();
          const w = /* @__PURE__ */ B(() => o(a));
          var k = D(m);
          Ct(k, () => o(w), (p, x) => {
            x(p, We(
              {
                get value() {
                  return o(s);
                },
                onchange: l,
                onclick: i,
                get text() {
                  return o(d);
                },
                get menu() {
                  return r();
                }
              },
              t
            ));
          }), O(() => {
            ye(m, `wx-tb-element ${(t().css || "") ?? ""} svelte-ptl7r2`), J(m, "data-id", t().id), ve(m, "wx-spacer", t().spacer), ve(m, "wx-menu", r());
          }), g(v, m);
        },
        !0
      ), g(u, h);
    }
  ), g(n, c), re();
}
const ig = (n, e) => H(e, !1);
var og = /* @__PURE__ */ E("<i></i>"), sg = /* @__PURE__ */ E('<div class="wx-label-text"> </div>'), lg = /* @__PURE__ */ E('<i class="wx-label-arrow wxi-angle-down"></i>'), cg = /* @__PURE__ */ E('<div class="wx-drop-group"><!></div>'), dg = /* @__PURE__ */ E('<div class="wx-collapsed svelte-155fw4u"><!> <!> <!></div> <!>', 1), ug = /* @__PURE__ */ E('<div class="wx-label svelte-155fw4u"> </div>'), fg = /* @__PURE__ */ E('<div class="wx-tb-body svelte-155fw4u"></div> <!>', 1), vg = /* @__PURE__ */ E("<div><!></div>");
function Un(n, e) {
  ne(e, !0);
  let t = S(e, "values", 3, null), r = S(e, "menu", 3, !1), a = ae(!0);
  const i = (c) => {
    s(), e.onclick && e.onclick(c);
  }, s = () => H(a, !0);
  var l = vg(), d = D(l);
  P(
    d,
    () => e.item.collapsed && !r(),
    (c) => {
      var f = dg(), u = V(f);
      u.__click = [ig, a];
      var h = D(u);
      P(h, () => e.item.icon, (w) => {
        var k = og();
        O(() => ye(k, `icon ${e.item.icon ?? ""} svelte-155fw4u`)), g(w, k);
      });
      var _ = U(h, 2);
      P(_, () => e.item.text, (w) => {
        var k = sg(), p = D(k);
        O(() => te(p, e.item.text)), g(w, k);
      });
      var v = U(_, 2);
      P(v, () => e.item.text && !e.item.icon, (w) => {
        var k = lg();
        g(w, k);
      });
      var m = U(u, 2);
      P(m, () => !o(a), (w) => {
        At(w, {
          width: "",
          oncancel: s,
          children: (k, p) => {
            var x = cg(), y = D(x), b = /* @__PURE__ */ B(() => ({ ...e.item, text: "", collapsed: !1 }));
            Un(y, {
              get item() {
                return o(b);
              },
              get values() {
                return t();
              },
              get menu() {
                return r();
              },
              get onchange() {
                return e.onchange;
              },
              onclick: i
            }), g(k, x);
          },
          $$slots: { default: !0 }
        });
      }), g(c, f);
    },
    (c) => {
      var f = fg(), u = V(f);
      Ie(u, 21, () => e.item.items, it, (_, v) => {
        var m = $(), w = V(m);
        P(
          w,
          () => o(v).items,
          (k) => {
            Un(k, {
              get item() {
                return o(v);
              },
              get values() {
                return t();
              },
              onclick: i,
              get onchange() {
                return e.onchange;
              }
            });
          },
          (k) => {
            oa(k, {
              get item() {
                return o(v);
              },
              get values() {
                return t();
              },
              onclick: i,
              get onchange() {
                return e.onchange;
              }
            });
          }
        ), g(_, m);
      });
      var h = U(u, 2);
      P(h, () => e.item.text, (_) => {
        var v = ug(), m = D(v);
        O(() => te(m, e.item.text)), g(_, v);
      }), g(c, f);
    }
  ), O(() => {
    ye(l, `wx-tb-group ${(e.item.css || "") ?? ""} svelte-155fw4u`), ve(l, "wx-column", e.item.layout == "column"), ve(l, "wx-group-collapsed", e.item.collapsed && !r());
  }), g(n, l), re();
}
me(["click"]);
var hg = /* @__PURE__ */ E('<div class="wx-drop-menu svelte-7mtmlh"></div>'), mg = /* @__PURE__ */ E('<div data-id="$menu"><!> <!></div>');
function gg(n, e) {
  ne(e, !0);
  let t = S(e, "items", 19, () => []), r = ae(void 0), a = ae(void 0);
  function i() {
    H(r, null);
  }
  function s() {
    H(r, !0);
  }
  function l(u) {
    i(), e.onclick && e.onclick(u);
  }
  var d = mg(), c = D(d);
  Re(c, { icon: "wxi-dots-h", onclick: s });
  var f = U(c, 2);
  P(f, () => o(r), (u) => {
    At(u, {
      get width() {
        return `${e.width ?? ""}px`;
      },
      oncancel: i,
      children: (h, _) => {
        var v = hg();
        Ie(v, 21, t, it, (m, w) => {
          var k = $(), p = V(k);
          P(
            p,
            () => o(w).items,
            (x) => {
              Un(x, {
                get item() {
                  return o(w);
                },
                get values() {
                  return e.values;
                },
                menu: !0,
                onclick: l,
                get onchange() {
                  return e.onchange;
                }
              });
            },
            (x) => {
              oa(x, {
                get item() {
                  return o(w);
                },
                get values() {
                  return e.values;
                },
                menu: !0,
                onclick: l,
                get onchange() {
                  return e.onchange;
                }
              });
            }
          ), g(m, k);
        }), g(h, v);
      },
      $$slots: { default: !0 }
    });
  }), Te(d, (u) => H(a, u), () => o(a)), O(() => ye(d, `wx-menu ${(e.css || "") ?? ""} svelte-7mtmlh`)), g(n, d), re();
}
var _g = /* @__PURE__ */ E("<div><!> <!></div>");
function wg(n, e) {
  ne(e, !0);
  let t = S(e, "items", 31, () => Q([])), r = S(e, "menuCss", 3, ""), a = S(e, "values", 15, null), i = S(e, "overflow", 3, "menu");
  function s(x) {
    a() && (a(a()[x.item.key] = x.value, !0), a(a())), e.onchange && e.onchange(x);
  }
  let l = null, d = -1, c = ae(Q([]));
  function f() {
    if (i() === "wrap") return;
    const x = l.clientWidth;
    if (l.scrollWidth > x) {
      if (i() === "collapse") return h();
      const I = l.children;
      let A = 0;
      for (let M = 0; M < t().length; (M += 1) - 1) {
        if (A += I[M].clientWidth, t()[M].comp == "separator" && (A += 8), A > x - 40) {
          if (d === M) return;
          d = M, H(c, Q([]));
          for (let q = M; q < t().length; (q += 1) - 1)
            o(c).push(t()[q]), I[q].style.visibility = "hidden";
          M > 0 && t()[M - 1].comp == "separator" && (I[M - 1].style.visibility = "hidden");
          break;
        }
        I[M].style.visibility = "";
      }
    } else {
      const I = x - u();
      if (I <= 0) return;
      if (i() === "collapse") return _(I);
      if (o(c).length) {
        d = null;
        const A = l.children;
        for (let M = 0; M < t().length; (M += 1) - 1)
          A[M].style.visibility = "";
        H(c, Q([]));
      }
    }
  }
  function u() {
    const x = l.children;
    let y = 0;
    for (let b = 0; b < t().length; (b += 1) - 1)
      t()[b].comp != "spacer" && (y += x[b].clientWidth, t()[b].comp == "separator" && (y += 8));
    return y;
  }
  function h() {
    for (let x = t().length - 1; x >= 0; (x -= 1) + 1)
      if (t()[x].items && !t()[x].collapsed) {
        t(t()[x].collapsed = !0, !0), t(t()[x].$width = l.children[x].offsetWidth, !0), kt().then(f), t([...t()]);
        return;
      }
  }
  function _(x) {
    for (let y = 0; y < t().length; (y += 1) - 1)
      if (t()[y].collapsed && t()[y].$width) {
        t()[y].$width - l.children[y].offsetWidth < x + 10 && (t(t()[y].collapsed = !1, !0), kt().then(f)), t([...t()]);
        return;
      }
  }
  function v(x) {
    return x.forEach((y) => {
      y.id || (y.id = wn());
    }), x;
  }
  vt(() => {
    const x = new ResizeObserver(() => f());
    return x.observe(l), () => {
      x && x.unobserve(l);
    };
  });
  const m = /* @__PURE__ */ B(() => v(t()));
  var w = _g(), k = D(w);
  Ie(k, 17, () => o(m), it, (x, y) => {
    var b = $(), I = V(b);
    P(
      I,
      () => o(y).items,
      (A) => {
        Un(A, {
          get item() {
            return o(y);
          },
          get values() {
            return a();
          },
          get onclick() {
            return e.onclick;
          },
          onchange: s
        });
      },
      (A) => {
        oa(A, {
          get item() {
            return o(y);
          },
          get values() {
            return a();
          },
          get onclick() {
            return e.onclick;
          },
          onchange: s
        });
      }
    ), g(x, b);
  });
  var p = U(k, 2);
  P(p, () => o(c).length, (x) => {
    gg(x, {
      get items() {
        return o(c);
      },
      get css() {
        return r();
      },
      get values() {
        return a();
      },
      get onclick() {
        return e.onclick;
      },
      onchange: s
    });
  }), Te(w, (x) => l = x, () => l), O(() => {
    ye(w, `wx-toolbar ${e.css ?? ""} svelte-b19ms9`), ve(w, "wx-wrap", i() === "wrap");
  }), g(n, w), re();
}
var yg = /* @__PURE__ */ E('<div class="wx-item svelte-b4dkf1"><i></i> </div>');
function xg(n, e) {
  let t = S(e, "text", 3, "");
  var r = $(), a = V(r);
  P(
    a,
    () => e.menu,
    (i) => {
      var s = yg();
      s.__click = function(...c) {
        e.onclick?.apply(this, c);
      };
      var l = D(s), d = U(l);
      O(() => {
        ye(l, `${e.icon || "wxi-empty"} ${(e.css || "") ?? ""} svelte-b4dkf1`), te(d, ` ${t() ?? ""}`);
      }), g(i, s);
    },
    (i) => {
      Re(i, {
        get icon() {
          return e.icon;
        },
        get type() {
          return e.type;
        },
        get css() {
          return e.css;
        },
        get text() {
          return t();
        },
        get disabled() {
          return e.disabled;
        },
        get onclick() {
          return e.onclick;
        }
      });
    }
  ), g(n, r);
}
me(["click"]);
var bg = /* @__PURE__ */ E('<div class="wx-label svelte-agyr5c"><!></div>'), pg = /* @__PURE__ */ E('<div class="wx-label svelte-agyr5c"> </div>');
function kg(n, e) {
  ne(e, !0);
  var t = $(), r = V(t);
  P(
    r,
    () => e.children,
    (a) => {
      var i = bg(), s = D(i);
      Ee(s, () => e.children), g(a, i);
    },
    (a) => {
      var i = pg(), s = D(i);
      O(() => te(s, e.value || e.text)), g(a, i);
    }
  ), g(n, t), re();
}
var Sg = /* @__PURE__ */ E("<i></i>"), Ig = /* @__PURE__ */ E('<div class="wx-item svelte-ng2v87"><!> </div>');
function Eg(n, e) {
  var t = $(), r = V(t);
  P(
    r,
    () => e.menu,
    (a) => {
      var i = Ig();
      i.__click = function(...d) {
        e.onclick?.apply(this, d);
      };
      var s = D(i);
      P(s, () => e.icon, (d) => {
        var c = Sg();
        O(() => ye(c, `${e.icon ?? ""} ${e.css ?? ""} svelte-ng2v87`)), g(d, c);
      });
      var l = U(s);
      O(() => te(l, ` ${e.text ?? ""}`)), g(a, i);
    },
    (a) => {
      Re(a, {
        get icon() {
          return e.icon;
        },
        get type() {
          return e.type;
        },
        get css() {
          return e.css;
        },
        get title() {
          return e.text;
        },
        get disabled() {
          return e.disabled;
        },
        get onclick() {
          return e.onclick;
        }
      });
    }
  ), g(n, t);
}
me(["click"]);
function Dg(n, e, t) {
  e.onclick && e.onclick({ id: t() });
}
var Cg = /* @__PURE__ */ E("<i></i>"), Mg = /* @__PURE__ */ E("<div><!> </div>");
function Ag(n, e) {
  ne(e, !0);
  let t = S(e, "id", 3, ""), r = S(e, "text", 3, ""), a = S(e, "css", 3, ""), i = S(e, "icon", 3, "");
  var s = Mg();
  s.__click = [Dg, e, t];
  var l = D(s);
  P(l, i, (c) => {
    var f = Cg();
    O(() => ye(f, `${i() ?? ""} svelte-g7c8cw`)), g(c, f);
  });
  var d = U(l);
  O(() => {
    ye(s, `wx-label ${a() ?? ""} svelte-g7c8cw`), te(d, ` ${r() ?? ""}`);
  }), g(n, s), re();
}
me(["click"]);
Xt("button", xg);
Xt("separator", xo);
Xt("spacer", bo);
Xt("label", kg);
Xt("item", Ag);
Xt("icon", Eg);
function Tg(n, e) {
  ne(e, !0), e.items.forEach((t) => {
    t.api = e.api, t.type === "search" ? t.comp = Gm : t.type === "undo" ? t.comp = Xm : t.type === "redo" ? t.comp = $m : t.type === "spacer" ? t.comp = "spacer" : t.type === "sort" ? t.comp = Qm : t.type === "addColumn" ? t.comp = Wm : t.type === "addRow" ? t.comp = Vm : t.type === "template" && t.template ? t.comp = Ar : t && (t.comp = Ar, t.template = t.type);
  }), Tt(n, {
    words: { ...er, ...$n },
    optional: !0,
    children: (t, r) => {
      wg(t, {
        get items() {
          return e.items;
        },
        get onchange() {
          return e.onchange;
        }
      });
    },
    $$slots: { default: !0 }
  }), re();
}
class Yg {
  api;
  config;
  container;
  _toolbar;
  constructor(e, t) {
    this.container = typeof e == "string" ? document.querySelector(e) : e, this.config = t, this._init();
  }
  destructor() {
    qr(this._toolbar), this._toolbar = this.api = null;
  }
  setConfig(e) {
    e && (this.config = { ...this.config, ...e }, this._init());
  }
  /** @version v1.5.7 */
  /** @version v2.0.0 api parameter is deprecated */
  setLocale(e, t) {
    const r = { locale: e };
    t && (r.api = t), this.setConfig(r);
  }
  _init() {
    this._toolbar && this.destructor();
    const e = /* @__PURE__ */ new Map([
      ["wx-i18n", yn(this.config.locale)],
      [
        "wx-theme",
        ia(this.container, this.config.theme, "material")
      ]
    ]);
    this._toolbar = dn(Tg, {
      target: this.container,
      props: this._configToProps(this.config),
      context: e,
      intro: !1
    });
  }
  _configToProps(e) {
    let t = [
      { type: "search" },
      { type: "spacer" },
      { type: "undo" },
      { type: "redo" },
      { type: "sort" },
      { type: "addColumn" },
      { type: "addRow" }
    ];
    return e.items && (t = this._normalizeItems(e.items)), {
      ...e,
      items: t
    };
  }
  _normalizeItems(e) {
    return e.map((t) => typeof t == "string" ? {
      type: t
    } : typeof t == "function" ? {
      type: "template",
      template: t
    } : "template" in t && !t.type ? {
      type: "template",
      template: t.template
    } : t);
  }
}
(/* @__PURE__ */ new Date()).valueOf();
function dr(n) {
  return typeof n == "string" && n.length === 20 && parseInt(n.substr(7)) > 1e12;
}
class Pg {
  constructor() {
    this._nextHandler = null, this._handlers = {}, this._tag = /* @__PURE__ */ new WeakMap(), this.exec = this.exec.bind(this);
  }
  on(e, t, r) {
    let a = this._handlers[e];
    a ? r && r.intercept ? a.unshift(t) : a.push(t) : a = this._handlers[e] = [t], r && r.tag && this._tag.set(t, r.tag);
  }
  intercept(e, t, r) {
    this.on(e, t, { ...r, intercept: !0 });
  }
  detach(e) {
    for (const t in this._handlers) {
      const r = this._handlers[t];
      for (let a = r.length - 1; a >= 0; a--)
        this._tag.get(r[a]) === e && r.splice(a, 1);
    }
  }
  async exec(e, t) {
    const r = this._handlers[e];
    if (r)
      for (let a = 0; a < r.length; a++) {
        const i = r[a](t);
        if (i === !1 || i && i.then && await i === !1)
          return;
      }
    return this._nextHandler && await this._nextHandler.exec(e, t), t;
  }
  setNext(e) {
    return this._nextHandler = e;
  }
}
const Sn = Symbol(), Xa = 0, Rg = 1, Lg = 2;
class Fg {
  constructor() {
    this.reset(!0);
  }
  reset(e = !1) {
    this._awaitAddingQueue = [], this._queue = {}, this._waitPull = {}, this._status = [], e && (this._idPool = {}, this._backId = []);
  }
  resolve(e, t) {
    const r = this._backId[t];
    if (typeof r > "u") return e;
    const a = r[e];
    return typeof a > "u" ? e : a;
  }
  getSync() {
    const e = this._awaitAddingQueue;
    if (!e.length) return Xa;
    for (let t = 0; t < e.length; t++)
      if (!e[t].sent) return Rg;
    return Lg;
  }
  waitSync() {
    return new Promise((e) => {
      this.getSync() === Xa ? e() : this._status.push(e);
    });
  }
  getId(e) {
    return this._idPool[e] || (dr(e) ? null : e);
  }
  waitId(e) {
    return new Promise((t) => {
      const r = this.getId(e);
      r !== null && t(r);
      const a = this._waitPull[e] || [];
      a.push(t), this._waitPull[e] = a;
    });
  }
  add(e, t, r) {
    return new Promise((a, i) => {
      if (r = { ...r, resolve: a, reject: i }, r.debounce) {
        const s = `${e}"/"${t.id}`, l = this._queue[s];
        l && (r.resolve = (d) => {
          l.resolve(d), a(d);
        }, r.reject = (d) => {
          l.reject(d), i();
        }, clearTimeout(l.timer)), this._queue[s] = r, r.timer = setTimeout(() => {
          this.tryExec(e, t, r);
        }, r.debounce);
        return;
      }
      this.tryExec(e, t, r);
    });
  }
  tryExec(e, t, r, a) {
    const i = this.exec(e, t, r, a);
    return i === null ? (a || this._awaitAddingQueue.push({ action: e, data: t, proc: r }), !1) : (i.then(
      (s) => {
        const l = s && s.id && s.id != t.id && dr(t.id);
        if (l && (this._idPool[t.id] = s.id, this._waitPull[t.id] && (this._waitPull[t.id].forEach((d) => d(s.id)), delete this._waitPull[t.id]), r.kind)) {
          let d = this._backId[r.kind];
          d || (d = this._backId[r.kind] = {}), d[s.id] = t.id;
        }
        t.response = s, r.resolve(!0), a && a(), l && this.execQueue();
      },
      (s) => {
        a && a(), r.reject(s);
      }
    ), !0);
  }
  exec(e, t, r, a) {
    const i = this.correctID(t, r.ignoreID ? t.id : null);
    if (i === Sn)
      return null;
    let s;
    try {
      s = r.handler(i, e, t);
    } catch (l) {
      a(), r.reject(l);
    }
    return s;
  }
  correctID(e, t) {
    let r = null;
    for (const a in e) {
      const i = e[a];
      if (typeof i == "object") {
        const s = this.correctID(i, t);
        if (s !== i) {
          if (s === Sn)
            return Sn;
          r === null && (r = { ...e }), r[a] = s;
        }
      } else if (dr(i)) {
        const s = this._idPool[i];
        if (s)
          r === null && (r = { ...e }), r[a] = s;
        else if (!t)
          return Sn;
      }
    }
    return r || e;
  }
  execQueue() {
    this._awaitAddingQueue.forEach((e) => {
      if (!e.sent) {
        const t = () => this._finishQueue(e);
        this.tryExec(e.action, e.data, e.proc, t) && (e.sent = !0);
      }
    });
  }
  _finishQueue(e) {
    if (this._awaitAddingQueue = this._awaitAddingQueue.filter((t) => t !== e), !this._awaitAddingQueue.length && this._status.length) {
      const t = [...this._status];
      this._status = [], t.forEach((r) => r());
    }
  }
}
class Og extends Pg {
  constructor(e, t) {
    super(), this._customHeaders = {}, this._batchQueue = [], this._batchTimeout = null, this._url = e, this._batchUrl = t?.batchURL, this._queue = new Fg();
    const r = this.getHandlers();
    for (const a in r)
      this.on(a, (i) => {
        if (!i.skipProvider)
          return this._queue.add(a, i, r[a]);
      });
  }
  getHandlers() {
    return {};
  }
  setHeaders(e) {
    this._customHeaders = e;
  }
  getQueue() {
    return this._queue;
  }
  async send(e, t, r, a = {}) {
    return this._batchUrl && t !== "GET" ? this.sendBatchRequest(e, t, r, a) : this.sendRequest(e, t, r, a);
  }
  async sendBatchRequest(e, t, r, a) {
    return new Promise((i) => {
      this._batchQueue.push({
        url: e,
        method: t,
        data: r,
        resolve: i
      }), this._batchTimeout && clearTimeout(this._batchTimeout), this._batchTimeout = setTimeout(async () => {
        const s = [...this._batchQueue];
        if (this._batchQueue = [], s.length > 1) {
          const l = s.map((c) => ({
            url: c.url,
            method: c.method,
            data: {
              ...c.data
            }
          })), d = await this.sendRequest(
            this._batchUrl,
            "POST",
            l
          );
          s.forEach((c, f) => c.resolve(d[f]));
        } else {
          const l = await this.sendRequest(
            e,
            t,
            r,
            a
          );
          i(l);
        }
      }, 10);
    });
  }
  toPayload(e) {
    return JSON.stringify(e);
  }
  async sendRequest(e, t, r, a = {}) {
    const i = {
      "Content-Type": "application/json",
      ...a,
      ...this._customHeaders
    }, s = {
      method: t,
      headers: i
    };
    r && (s.body = typeof r == "object" ? this.toPayload(r) : r);
    const l = this._url.charAt(-1) === "/" || e[0] === "/" ? "" : "/";
    return fetch(`${this._url}${l}${e || ""}`, s).then(
      (d) => d.json()
    );
  }
}
const Rt = 1, Mn = 2, An = 3, po = 4, Ng = 5;
class Kg extends Og {
  constructor(e) {
    super(e);
  }
  getHandlers() {
    return {
      "add-card": {
        ignoreID: !0,
        kind: Rt,
        handler: (e) => (e.card = this.prepareCard(e.card), this.send("cards", "POST", e))
      },
      "update-card": {
        debounce: 500,
        handler: (e) => (e.card = this.prepareCard(e.card), this.send(`cards/${e.id}`, "PUT", e))
      },
      "move-card": {
        handler: (e) => this.send(`cards/${e.id}/move`, "PUT", e)
      },
      "delete-card": {
        handler: (e) => this.send(`cards/${e.id}`, "DELETE")
      },
      "add-column": {
        ignoreID: !0,
        kind: An,
        handler: (e) => this.send("columns", "POST", e)
      },
      "update-column": {
        debounce: 500,
        handler: (e) => this.send(`columns/${e.id}`, "PUT", e)
      },
      "move-column": {
        handler: (e) => this.send(`columns/${e.id}/move`, "PUT", e)
      },
      "delete-column": {
        handler: (e) => this.send(`columns/${e.id}`, "DELETE")
      },
      "add-row": {
        ignoreID: !0,
        kind: Mn,
        handler: (e) => this.send("rows", "POST", e)
      },
      "update-row": {
        debounce: 500,
        handler: (e) => this.send(`rows/${e.id}`, "PUT", e)
      },
      "move-row": {
        handler: (e) => this.send(`rows/${e.id}/move`, "PUT", e)
      },
      "delete-row": {
        handler: (e) => this.send(`rows/${e.id}`, "DELETE")
      },
      "add-vote": {
        handler: (e) => this.send(`cards/${e.cardId}/vote`, "POST")
      },
      "delete-vote": {
        handler: (e) => this.send(`cards/${e.cardId}/vote`, "DELETE")
      },
      "add-comment": {
        ignoreID: !0,
        handler: (e) => this.send(
          `cards/${e.cardId}/comments`,
          "POST",
          e.comment
        )
      },
      "update-comment": {
        handler: (e) => this.send(
          `cards/${e.cardId}/comments/${e.id}`,
          "PUT",
          e.comment
        )
      },
      "delete-comment": {
        handler: (e) => this.send(`cards/${e.cardId}/comments/${e.id}`, "DELETE")
      },
      "add-link": {
        ignoreID: !0,
        kind: po,
        handler: (e) => this.send("links", "POST", e)
      },
      "delete-link": {
        handler: (e) => this.send(`links/${e.id}`, "DELETE")
      }
    };
  }
  getCards() {
    return this.send("cards", "GET").then(this.parseCards);
  }
  getColumns() {
    return this.send("columns", "GET");
  }
  getRows() {
    return this.send("rows", "GET");
  }
  getUsers() {
    return this.send("users", "GET");
  }
  getLinks() {
    return this.send("links", "GET");
  }
  getIDResolver() {
    return this.getQueue().resolve.bind(this.getQueue());
  }
  parseCards(e) {
    return e.forEach((t) => (t.end_date && (t.end_date = new Date(t.end_date)), t.start_date && (t.start_date = new Date(t.start_date)), t)), e;
  }
  prepareCard(e) {
    return e ? {
      ...e,
      users: e.users || null
    } : null;
  }
}
function Gg(n, e) {
  function t(v) {
    return "id" in v && (v.id = e(v.id, Rt)), "column" in v && (v.column = e(v.column, An)), "row" in v && (v.row = e(v.row, Mn)), v;
  }
  function r(v) {
    return "id" in v && (v.id = e(v.id, Mn)), v;
  }
  function a(v) {
    return "id" in v && (v.id = e(v.id, An)), v;
  }
  function i(v) {
    return "id" in v && (v.id = e(v.id, po)), "source" in v && (v.source = e(v.source, Rt)), "target" in v && (v.target = e(v.target, Rt)), v;
  }
  function s(v) {
    return "id" in v && (v.id = e(v.id, Ng)), "cardId" in v && (v.cardId = e(v.cardId, Rt)), v;
  }
  function l(v) {
    return v.cardId = e(v.cardId, Rt), v;
  }
  function d(v) {
    const m = t(v.card);
    switch (m.start_date = m.start_date ? new Date(m.start_date) : null, m.end_date = m.end_date ? new Date(m.end_date) : null, v.type) {
      case "add-card":
        n.exec(v.type, {
          skipProvider: !0,
          card: m,
          select: !1
        });
        break;
      case "update-card":
        n.exec("update-card", {
          skipProvider: !0,
          id: m.id,
          card: m
        });
        break;
      case "delete-card":
        n.exec("delete-card", {
          skipProvider: !0,
          id: m.id
        });
        break;
      case "move-card": {
        n.exec("move-card", {
          skipProvider: !0,
          id: m.id,
          rowId: m.row,
          columnId: m.column,
          before: e(v.before, Rt)
        });
        break;
      }
    }
  }
  function c(v) {
    const m = a(v.column);
    switch (v.type) {
      case "add-column":
        n.exec("add-column", {
          skipProvider: !0,
          column: m
        });
        break;
      case "delete-column":
        n.exec("delete-column", {
          skipProvider: !0,
          id: m.id
        });
        break;
      case "update-column":
        n.exec("update-column", {
          skipProvider: !0,
          id: m.id,
          column: m
        });
        break;
      case "move-column":
        n.exec("move-column", {
          skipProvider: !0,
          id: m.id,
          before: e(v.before, An)
        });
    }
  }
  function f(v) {
    const m = r(v.row);
    switch (v.type) {
      case "add-row":
        n.exec("add-row", {
          skipProvider: !0,
          row: m
        });
        break;
      case "delete-row":
        n.exec("delete-row", {
          skipProvider: !0,
          id: m.id
        });
        break;
      case "update-row":
        n.exec("update-row", {
          skipProvider: !0,
          id: m.id,
          row: m
        });
        break;
      case "move-row":
        n.exec("move-row", {
          skipProvider: !0,
          id: m.id,
          before: e(v.before, Mn)
        });
    }
  }
  function u(v) {
    const m = i(v.link);
    switch (v.type) {
      case "add-link":
        n.exec("add-link", {
          skipProvider: !0,
          id: m.id,
          link: m
        });
        break;
      case "delete-link":
        n.exec("delete-link", {
          skipProvider: !0,
          id: m.id
        });
    }
  }
  function h(v) {
    const m = s(v.comment);
    switch (v.type) {
      case "add-comment":
        n.exec("add-comment", {
          skipProvider: !0,
          id: m.id,
          cardId: m.cardId,
          comment: m
        });
        break;
      case "update-comment":
        n.exec("update-comment", {
          skipProvider: !0,
          id: m.id,
          cardId: m.cardId,
          comment: m
        });
        break;
      case "delete-comment":
        n.exec("delete-comment", {
          skipProvider: !0,
          id: m.id,
          cardId: m.cardId
        });
    }
  }
  function _(v) {
    const m = l(v.vote);
    switch (v.type) {
      case "add-vote":
        n.exec("add-vote", {
          skipProvider: !0,
          cardId: m.cardId,
          userId: m.userId
        });
        break;
      case "delete-vote":
        n.exec("delete-vote", {
          skipProvider: !0,
          cardId: m.cardId,
          userId: m.userId
        });
    }
  }
  return {
    cards: d,
    columns: c,
    rows: f,
    links: u,
    comments: h,
    votes: _
  };
}
class Bg {
  constructor(e) {
    const { url: t, token: r } = e;
    this._url = t, this._token = r, this._mode = 1, this._seed = 1, this._queue = [], this.data = {}, this.api = {}, this._events = {};
  }
  headers() {
    return { Accept: "application/json", "Content-Type": "application/json", "Remote-Token": this._token };
  }
  fetch(e, t) {
    const r = { credentials: "include", headers: this.headers() };
    return t && (r.method = "POST", r.body = t), fetch(e, r).then((a) => a.json());
  }
  load(e) {
    return e && (this._url = e), this.fetch(this._url).then((t) => this.parse(t));
  }
  parse(e) {
    const { key: t, websocket: r } = e;
    t && (this._token = e.key);
    for (const a in e.data) this.data[a] = e.data[a];
    for (const a in e.api) {
      const i = this.api[a] = {}, s = e.api[a];
      for (const l in s) i[l] = this._wrapper(a + "." + l);
    }
    return r && this.connect(), this;
  }
  connect() {
    const e = this._socket;
    e && (this._socket = null, e.onclose = function() {
    }, e.close()), this._mode = 2, this._socket = function(t, r, a, i) {
      let s = r;
      s[0] === "/" && (s = document.location.protocol + "//" + document.location.host + r), s = s.replace(/^http(s|):/, "ws$1:");
      const l = s.indexOf("?") != -1 ? "&" : "?";
      s = `${s}${l}token=${a}&ws=1`;
      const d = new WebSocket(s);
      return d.onclose = () => setTimeout(() => t.connect(), 2e3), d.onmessage = (c) => {
        const f = JSON.parse(c.data);
        switch (f.action) {
          case "result":
            t.result(f.body, []);
            break;
          case "event":
            t.fire(f.body.name, f.body.value);
            break;
          case "start":
            i();
            break;
          default:
            t.onError(f.data);
        }
      }, d;
    }(this, this._url, this._token, () => (this._mode = 3, this._send(), this._resubscribe(), this));
  }
  _wrapper(e) {
    return function() {
      const t = [].slice.call(arguments);
      let r = null;
      const a = new Promise((i, s) => {
        r = { data: { id: this._uid(), name: e, args: t }, status: 1, resolve: i, reject: s }, this._queue.push(r);
      });
      return this.onCall(r, a), this._mode === 3 ? this._send(r) : setTimeout(() => this._send(), 1), a;
    }.bind(this);
  }
  _uid() {
    return (this._seed++).toString();
  }
  _send(e) {
    if (this._mode == 2) return void setTimeout(() => this._send(), 100);
    const t = e ? [e] : this._queue.filter((a) => a.status === 1);
    if (!t.length) return;
    const r = t.map((a) => (a.status = 2, a.data));
    this._mode !== 3 ? this.fetch(this._url, JSON.stringify(r)).catch((a) => this.onError(a)).then((a) => this.result(a, r)) : this._socket.send(JSON.stringify({ action: "call", body: r }));
  }
  result(e, t) {
    const r = {};
    if (e) for (let a = 0; a < e.length; a++) r[e[a].id] = e[a];
    else for (let a = 0; a < t.length; a++) r[t[a].id] = { id: t[a].id, error: "Network Error", data: null };
    for (let a = this._queue.length - 1; a >= 0; a--) {
      const i = this._queue[a], s = r[i.data.id];
      s && (this.onResponse(i, s), s.error ? i.reject(s.error) : i.resolve(s.data), this._queue.splice(a, 1));
    }
  }
  on(e, t) {
    const r = this._uid();
    let a = this._events[e];
    const i = !!a;
    return i || (a = this._events[e] = []), a.push({ id: r, handler: t }), i || this._mode != 3 || this._socket.send(JSON.stringify({ action: "subscribe", name: e })), { name: e, id: r };
  }
  _resubscribe() {
    if (this._mode == 3) for (const e in this._events) this._socket.send(JSON.stringify({ action: "subscribe", name: e }));
  }
  detach(e) {
    if (!e) {
      if (this._mode == 3) for (const i in this._events) this._socket.send(JSON.stringify({ action: "unsubscribe", key: i }));
      return void (this._events = {});
    }
    const { id: t, name: r } = e, a = this._events[r];
    if (a) {
      const i = a.filter((s) => s.id != t);
      i.length ? this._events[r] = i : (delete this._events[r], this._mode == 3 && this._socket.send(JSON.stringify({ action: "unsubscribe", name: r })));
    }
  }
  fire(e, t) {
    const r = this._events[e];
    if (r) for (let a = 0; a < r.length; a++) r[a].handler(t);
  }
  onError(e) {
    return null;
  }
  onCall(e, t) {
  }
  onResponse(e, t) {
  }
}
class Vg {
  _remote;
  _ready;
  constructor(e, t) {
    const r = new Bg({
      url: e,
      token: t
    });
    r.fetch = function(a, i) {
      const s = {
        headers: this.headers()
      };
      return i && (s.method = "POST", s.body = i), fetch(a, s).then((l) => l.json());
    }, this._ready = r.load().then((a) => this._remote = a);
  }
  ready() {
    return this._ready;
  }
  on(e, t) {
    this.ready().then((r) => {
      if (typeof e == "string") r.on(e, t);
      else
        for (const a in e)
          r.on(a, e[a]);
    });
  }
}
const Wg = {
  en: { ...er, ...$n },
  de: { ...Qs, ...As },
  cn: { ...Vs, ...Ts },
  es: { ...nl, ...Ps },
  fr: { ...sl, ...Rs },
  it: { ...fl, ...Ls },
  jp: { ..._l, ...Fs },
  pt: { ...pl, ...Os },
  ru: { ...Dl, ...Ns }
};
function zg() {
  Ef(ta);
}
ta.detect() && zg();
export {
  Ug as Editor,
  Hg as Kanban,
  Vg as RemoteEvents,
  Kg as RestDataProvider,
  Yg as Toolbar,
  Cn as defaultCardShape,
  Xr as defaultEditorConfig,
  to as defaultEditorShape,
  zg as enableSalesForce,
  Su as getDefaultCardMenuItems,
  Iu as getDefaultColumnMenuItems,
  Eu as getDefaultRowMenuItems,
  Gg as kanbanUpdates,
  Wg as locales,
  zn as locateID,
  ta as salesForceEnv,
  Gr as tempID,
  qg as template
};
