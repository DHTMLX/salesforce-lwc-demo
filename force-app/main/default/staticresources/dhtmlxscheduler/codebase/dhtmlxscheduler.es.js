/** @license

dhtmlxScheduler v.7.2.8 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get a proprietary license. Usage without proper license is prohibited.

(c) XB Software Ltd.

*/
const I = typeof window < "u" ? window : global;
function fa(e) {
  let i = [], t = !1, a = null, s = null;
  function n() {
    return e.config.drag_highlight && e.markTimespan;
  }
  function _(o) {
    const c = e.getView(o);
    return c ? c.layout : o;
  }
  function d(o) {
    const { event: c, layout: h, viewName: y, sectionId: b, eventNode: p } = o;
    (function(l, f) {
      switch (f) {
        case "month":
          l.style.top = "", l.style.left = "";
          break;
        case "timeline":
          l.style.left = "", l.style.marginLeft = "1px";
          break;
        default:
          l.style.top = "";
      }
    })(p, h);
    const u = {};
    let m = { start_date: c.start_date, end_date: c.end_date, css: "dhx_scheduler_dnd_marker", html: p };
    if (h == "timeline") {
      const l = e.getView(y);
      if (l.round_position) {
        const f = e._get_date_index(l, c.start_date), g = l._trace_x[f];
        m.start_date = g;
      }
    }
    return h != "timeline" && h != "month" || (m = { ...m, end_date: e.date.add(c.start_date, 1, "minute") }), b && (u[y] = b, m.sections = u), m;
  }
  function r(o) {
    const { layout: c } = o;
    let h;
    switch (c) {
      case "month":
        h = function(y) {
          let b = [];
          const { event: p, layout: u, viewName: m, sectionId: l } = y, f = [];
          let g = new Date(p.start_date);
          for (; g.valueOf() < p.end_date.valueOf(); ) {
            let w = { start_date: g };
            f.push(w), g = e.date.week_start(e.date.add(g, 1, "week"));
          }
          let x = e.$container.querySelectorAll(`[${e.config.event_attribute}='${p.id}']`);
          for (let w = 0; w < x.length; w++) {
            const E = { event: f[w], layout: u, viewName: m, sectionId: l, eventNode: x[w].cloneNode(!0) };
            b.push(d(E));
          }
          return b;
        }(o);
        break;
      case "timeline":
      case "units":
        h = function(y) {
          let b = [];
          const { event: p, layout: u, viewName: m, eventNode: l } = y;
          let f = function(g) {
            const x = e.getView(g);
            return x.y_property ? x.y_property : x.map_to ? x.map_to : void 0;
          }(m);
          if (f) {
            const g = String(p[f]).split(e.config.section_delimiter).map((w) => String(w)), x = [];
            for (let w = 0; w < g.length; w++) {
              x[w] = l.cloneNode(!0);
              const E = { event: p, layout: u, viewName: m, sectionId: g[w], eventNode: x[w] };
              b.push(d(E));
            }
          }
          return b;
        }(o);
        break;
      default:
        h = function(y) {
          const { event: b, layout: p, viewName: u, sectionId: m } = y;
          let l = [], f = e.$container.querySelectorAll(`[${e.config.event_attribute}='${b.id}']:not(.dhx_cal_select_menu):not(.dhx_drag_marker)`);
          if (f)
            for (let g = 0; g < f.length; g++) {
              let x = f[g].cloneNode(!0);
              const w = { event: { start_date: /* @__PURE__ */ new Date(+x.getAttribute("data-bar-start")), end_date: /* @__PURE__ */ new Date(+x.getAttribute("data-bar-end")) }, layout: p, viewName: u, sectionId: m, eventNode: x };
              l.push(d(w));
            }
          return l;
        }(o);
    }
    h.forEach((y) => {
      i.push(e.markTimespan(y));
    });
  }
  e.attachEvent("onBeforeDrag", function(o, c, h) {
    return n() && (t = !0, s = e.getEvent(o), a = h.target.closest(`[${e.config.event_attribute}]`), _(e.getState().mode) == "units" && e.config.cascade_event_display && (e.unselect(o), a = h.target.closest(`[${e.config.event_attribute}]`))), !0;
  }), e.attachEvent("onEventDrag", function(o, c, h) {
    if (t && n()) {
      t = !1;
      const y = e.getState().mode, b = _(y), p = e.getActionData(h).section;
      s && r({ event: s, layout: b, viewName: y, sectionId: p, eventNode: a });
    }
  }), e.attachEvent("onDragEnd", function(o, c, h) {
    for (let y = 0; y < i.length; y++)
      e.unmarkTimespan(i[y]);
    i = [], a = null, s = null;
  });
}
function pa(e) {
  e.config.mark_now = !0, e.config.display_marked_timespans = !0, e.config.overwrite_marked_timespans = !0;
  var i = "dhx_time_block", t = "default", a = function(n, _, d) {
    var r = typeof n == "object" ? n : { days: n };
    return r.type = i, r.css = "", _ && (d && (r.sections = d), r = function(o, c, h) {
      return c instanceof Date && h instanceof Date ? (o.start_date = c, o.end_date = h) : (o.days = c, o.zones = h), o;
    }(r, n, _)), r;
  };
  function s(n, _, d, r, o) {
    var c = e, h = [], y = { _props: "map_to", matrix: "y_property" };
    for (var b in y) {
      var p = y[b];
      if (c[b])
        for (var u in c[b]) {
          var m = c[b][u][p];
          n[m] && (h = c._add_timespan_zones(h, e._get_blocked_zones(_[u], n[m], d, r, o)));
        }
    }
    return h = c._add_timespan_zones(h, e._get_blocked_zones(_, "global", d, r, o));
  }
  e.blockTime = function(n, _, d) {
    var r = a(n, _, d);
    return e.addMarkedTimespan(r);
  }, e.unblockTime = function(n, _, d) {
    var r = a(n, _ = _ || "fullday", d);
    return e.deleteMarkedTimespan(r);
  }, e.checkInMarkedTimespan = function(n, _, d) {
    _ = _ || t;
    for (var r = !0, o = new Date(n.start_date.valueOf()), c = e.date.add(o, 1, "day"), h = e._marked_timespans; o < n.end_date; o = e.date.date_part(c), c = e.date.add(o, 1, "day")) {
      var y = +e.date.date_part(new Date(o)), b = s(n, h, o.getDay(), y, _);
      if (b)
        for (var p = 0; p < b.length; p += 2) {
          var u = e._get_zone_minutes(o), m = n.end_date > c || n.end_date.getDate() != o.getDate() ? 1440 : e._get_zone_minutes(n.end_date), l = b[p], f = b[p + 1];
          if (l < m && f > u && !(r = typeof d == "function" && d(n, u, m, l, f)))
            break;
        }
    }
    return !r;
  }, e.checkLimitViolation = function(n) {
    if (!n || !e.config.check_limits)
      return !0;
    var _ = e, d = _.config, r = [];
    if (n.rec_type && n._end_date || n.rrule) {
      const b = n._end_date || n.end_date;
      return !d.limit_start || !d.limit_end || b.valueOf() >= d.limit_start.valueOf() && n.start_date.valueOf() <= d.limit_end.valueOf();
    }
    r = [n];
    for (var o = !0, c = 0; c < r.length; c++) {
      var h = !0, y = r[c];
      y._timed = e.isOneDayEvent(y), (h = !d.limit_start || !d.limit_end || y.start_date.valueOf() >= d.limit_start.valueOf() && y.end_date.valueOf() <= d.limit_end.valueOf()) && (h = !e.checkInMarkedTimespan(y, i, function(b, p, u, m, l) {
        var f = !0;
        return p <= l && p >= m && ((l == 1440 || u <= l) && (f = !1), b._timed && _._drag_id && _._drag_mode == "new-size" ? (b.start_date.setHours(0), b.start_date.setMinutes(l)) : f = !1), (u >= m && u <= l || p < m && u > l) && (b._timed && _._drag_id && _._drag_mode == "new-size" ? (b.end_date.setHours(0), b.end_date.setMinutes(m)) : f = !1), f;
      })), h || (h = _.checkEvent("onLimitViolation") ? _.callEvent("onLimitViolation", [y.id, y]) : h), o = o && h;
    }
    return o || (_._drag_id = null, _._drag_mode = null), o;
  }, e._get_blocked_zones = function(n, _, d, r, o) {
    var c = [];
    if (n && n[_])
      for (var h = n[_], y = this._get_relevant_blocked_zones(d, r, h, o), b = 0; b < y.length; b++)
        c = this._add_timespan_zones(c, y[b].zones);
    return c;
  }, e._get_relevant_blocked_zones = function(n, _, d, r) {
    var o;
    return e.config.overwrite_marked_timespans ? o = d[_] && d[_][r] ? d[_][r] : d[n] && d[n][r] ? d[n][r] : [] : (o = [], d[_] && d[_][r] && (o = o.concat(d[_][r])), d[n] && d[n][r] && (o = o.concat(d[n][r]))), o;
  }, e._mark_now = function(n) {
    var _ = "dhx_now_time";
    this._els[_] || (this._els[_] = []);
    var d = e._currentDate(), r = this.config;
    if (e._remove_mark_now(), !n && r.mark_now && d < this._max_date && d > this._min_date && d.getHours() >= r.first_hour && d.getHours() < r.last_hour) {
      var o = this.locate_holder_day(d);
      this._els[_] = e._append_mark_now(o, d);
    }
  }, e._append_mark_now = function(n, _) {
    var d = "dhx_now_time", r = e._get_zone_minutes(_), o = { zones: [r, r + 1], css: d, type: d };
    if (!this._table_view) {
      if (this._props && this._props[this._mode]) {
        var c, h, y = this._props[this._mode], b = y.size || y.options.length;
        y.days > 1 ? (y.size && y.options.length && (n = (y.position + n) / y.options.length * y.size), c = n, h = n + b) : h = (c = 0) + b;
        for (var p = [], u = c; u < h; u++) {
          var m = u;
          o.days = m;
          var l = e._render_marked_timespan(o, null, m)[0];
          p.push(l);
        }
        return p;
      }
      return o.days = n, e._render_marked_timespan(o, null, n);
    }
    if (this._mode == "month")
      return o.days = +e.date.date_part(_), e._render_marked_timespan(o, null, null);
  }, e._remove_mark_now = function() {
    for (var n = "dhx_now_time", _ = this._els[n], d = 0; d < _.length; d++) {
      var r = _[d], o = r.parentNode;
      o && o.removeChild(r);
    }
    this._els[n] = [];
  }, e._marked_timespans = { global: {} }, e._get_zone_minutes = function(n) {
    return 60 * n.getHours() + n.getMinutes();
  }, e._prepare_timespan_options = function(n) {
    var _ = [], d = [];
    if (n.days == "fullweek" && (n.days = [0, 1, 2, 3, 4, 5, 6]), n.days instanceof Array) {
      for (var r = n.days.slice(), o = 0; o < r.length; o++) {
        var c = e._lame_clone(n);
        c.days = r[o], _.push.apply(_, e._prepare_timespan_options(c));
      }
      return _;
    }
    if (!n || !(n.start_date && n.end_date && n.end_date > n.start_date || n.days !== void 0 && n.zones) && !n.type)
      return _;
    n.zones == "fullday" && (n.zones = [0, 1440]), n.zones && n.invert_zones && (n.zones = e.invertZones(n.zones)), n.id = e.uid(), n.css = n.css || "", n.type = n.type || t;
    var h = n.sections;
    if (h) {
      for (var y in h)
        if (h.hasOwnProperty(y)) {
          var b = h[y];
          for (b instanceof Array || (b = [b]), o = 0; o < b.length; o++)
            (x = e._lame_copy({}, n)).sections = {}, x.sections[y] = b[o], d.push(x);
        }
    } else
      d.push(n);
    for (var p = 0; p < d.length; p++) {
      var u = d[p], m = u.start_date, l = u.end_date;
      if (m && l)
        for (var f = e.date.date_part(new Date(m)), g = e.date.add(f, 1, "day"); f < l; ) {
          var x;
          delete (x = e._lame_copy({}, u)).start_date, delete x.end_date, x.days = f.valueOf();
          var w = m > f ? e._get_zone_minutes(m) : 0, E = l > g || l.getDate() != f.getDate() ? 1440 : e._get_zone_minutes(l);
          x.zones = [w, E], _.push(x), f = g, g = e.date.add(g, 1, "day");
        }
      else
        u.days instanceof Date && (u.days = e.date.date_part(u.days).valueOf()), u.zones = n.zones.slice(), _.push(u);
    }
    return _;
  }, e._get_dates_by_index = function(n, _, d) {
    var r = [];
    _ = e.date.date_part(new Date(_ || e._min_date)), d = new Date(d || e._max_date);
    for (var o = _.getDay(), c = n - o >= 0 ? n - o : 7 - _.getDay() + n, h = e.date.add(_, c, "day"); h < d; h = e.date.add(h, 1, "week"))
      r.push(h);
    return r;
  }, e._get_css_classes_by_config = function(n) {
    var _ = [];
    return n.type == i && (_.push(i), n.css && _.push(i + "_reset")), _.push("dhx_marked_timespan", n.css), _.join(" ");
  }, e._get_block_by_config = function(n) {
    var _ = document.createElement("div");
    if (n.html) {
      let d = n.html;
      typeof d == "function" && (d = d(n)), typeof d == "string" ? _.innerHTML = n.html : e.config.external_render && e.config.external_render.isElement(d) ? e.config.external_render.renderElement(d, _) : _.appendChild(d);
    }
    return _;
  }, e._render_marked_timespan = function(n, _, d) {
    var r = [], o = e.config, c = this._min_date, h = this._max_date, y = !1;
    if (!o.display_marked_timespans)
      return r;
    if (!d && d !== 0) {
      if (n.days < 7)
        d = n.days;
      else {
        var b = new Date(n.days);
        if (y = +b, !(+h > +b && +c <= +b))
          return r;
        d = b.getDay();
      }
      var p = c.getDay();
      p > d ? d = 7 - (p - d) : d -= p;
    }
    var u = n.zones, m = e._get_css_classes_by_config(n);
    if (e._table_view && e._mode == "month") {
      var l = [], f = [];
      if (_)
        l.push(_), f.push(d);
      else {
        f = y ? [y] : e._get_dates_by_index(d);
        for (var g = 0; g < f.length; g++)
          l.push(this._scales[f[g]]);
      }
      for (g = 0; g < l.length; g++) {
        _ = l[g], d = f[g];
        var x = this.locate_holder_day(d, !1) % this._cols.length;
        if (!this._ignores[x]) {
          var w = e._get_block_by_config(n);
          w.className = m, w.style.top = "0px", w.style.height = "100%";
          for (var E = 0; E < u.length; E += 2) {
            var k = u[g];
            if ((M = u[g + 1]) <= k)
              return [];
            (N = w.cloneNode(!0)).style.left = "0px", N.style.width = "100%", _.appendChild(N), r.push(N);
          }
        }
      }
    } else {
      var S = d;
      if (this._ignores[this.locate_holder_day(d, !1)])
        return r;
      if (this._props && this._props[this._mode] && n.sections && n.sections[this._mode]) {
        var v = this._props[this._mode];
        S = v.order[n.sections[this._mode]];
        var D = v.order[n.sections[this._mode]];
        v.days > 1 ? S = S * (v.size || v.options.length) + D : (S = D, v.size && S > v.position + v.size && (S = 0));
      }
      for (_ = _ || e.locate_holder(S), g = 0; g < u.length; g += 2) {
        var M, N;
        if (k = Math.max(u[g], 60 * o.first_hour), (M = Math.min(u[g + 1], 60 * o.last_hour)) <= k) {
          if (g + 2 < u.length)
            continue;
          return [];
        }
        (N = e._get_block_by_config(n)).className = m;
        var T = 24 * this.config.hour_size_px + 1, A = 36e5;
        N.style.top = Math.round((60 * k * 1e3 - this.config.first_hour * A) * this.config.hour_size_px / A) % T + "px", N.style.height = Math.max(Math.round(60 * (M - k) * 1e3 * this.config.hour_size_px / A) % T, 1) + "px", _.appendChild(N), r.push(N);
      }
    }
    return r;
  }, e._mark_timespans = function() {
    var n = this._els.dhx_cal_data[0], _ = [];
    if (e._table_view && e._mode == "month")
      for (var d in this._scales) {
        var r = /* @__PURE__ */ new Date(+d);
        _.push.apply(_, e._on_scale_add_marker(this._scales[d], r));
      }
    else {
      r = new Date(e._min_date);
      for (var o = 0, c = n.childNodes.length; o < c; o++) {
        var h = n.childNodes[o];
        h.firstChild && e._getClassName(h.firstChild).indexOf("dhx_scale_hour") > -1 || (_.push.apply(_, e._on_scale_add_marker(h, r)), r = e.date.add(r, 1, "day"));
      }
    }
    return _;
  }, e.markTimespan = function(n) {
    if (!this._els)
      throw new Error("`scheduler.markTimespan` can't be used before scheduler initialization. Place `scheduler.markTimespan` call after `scheduler.init`.");
    var _ = !1;
    this._els.dhx_cal_data || (e.get_elements(), _ = !0);
    var d = e._marked_timespans_ids, r = e._marked_timespans_types, o = e._marked_timespans;
    e.deleteMarkedTimespan(), e.addMarkedTimespan(n);
    var c = e._mark_timespans();
    return _ && (e._els = []), e._marked_timespans_ids = d, e._marked_timespans_types = r, e._marked_timespans = o, c;
  }, e.unmarkTimespan = function(n) {
    if (n)
      for (var _ = 0; _ < n.length; _++) {
        var d = n[_];
        d.parentNode && d.parentNode.removeChild(d);
      }
  }, e._addMarkerTimespanConfig = function(n) {
    var _ = "global", d = e._marked_timespans, r = n.id, o = e._marked_timespans_ids;
    o[r] || (o[r] = []);
    var c = n.days, h = n.sections, y = n.type;
    if (n.id = r, h) {
      for (var b in h)
        if (h.hasOwnProperty(b)) {
          d[b] || (d[b] = {});
          var p = h[b], u = d[b];
          u[p] || (u[p] = {}), u[p][c] || (u[p][c] = {}), u[p][c][y] || (u[p][c][y] = [], e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[y] || (e._marked_timespans_types[y] = !0));
          var m = u[p][c][y];
          n._array = m, m.push(n), o[r].push(n);
        }
    } else
      d[_][c] || (d[_][c] = {}), d[_][c][y] || (d[_][c][y] = []), e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[y] || (e._marked_timespans_types[y] = !0), m = d[_][c][y], n._array = m, m.push(n), o[r].push(n);
  }, e._marked_timespans_ids = {}, e.addMarkedTimespan = function(n) {
    var _ = e._prepare_timespan_options(n);
    if (_.length) {
      for (var d = _[0].id, r = 0; r < _.length; r++)
        e._addMarkerTimespanConfig(_[r]);
      return d;
    }
  }, e._add_timespan_zones = function(n, _) {
    var d = n.slice();
    if (_ = _.slice(), !d.length)
      return _;
    for (var r = 0; r < d.length; r += 2)
      for (var o = d[r], c = d[r + 1], h = r + 2 == d.length, y = 0; y < _.length; y += 2) {
        var b = _[y], p = _[y + 1];
        if (p > c && b <= c || b < o && p >= o)
          d[r] = Math.min(o, b), d[r + 1] = Math.max(c, p), r -= 2;
        else {
          if (!h)
            continue;
          var u = o > b ? 0 : 2;
          d.splice(r + u, 0, b, p);
        }
        _.splice(y--, 2);
        break;
      }
    return d;
  }, e._subtract_timespan_zones = function(n, _) {
    for (var d = n.slice(), r = 0; r < d.length; r += 2)
      for (var o = d[r], c = d[r + 1], h = 0; h < _.length; h += 2) {
        var y = _[h], b = _[h + 1];
        if (b > o && y < c) {
          var p = !1;
          o >= y && c <= b && d.splice(r, 2), o < y && (d.splice(r, 2, o, y), p = !0), c > b && d.splice(p ? r + 2 : r, p ? 0 : 2, b, c), r -= 2;
          break;
        }
      }
    return d;
  }, e.invertZones = function(n) {
    return e._subtract_timespan_zones([0, 1440], n.slice());
  }, e._delete_marked_timespan_by_id = function(n) {
    var _ = e._marked_timespans_ids[n];
    if (_) {
      for (var d = 0; d < _.length; d++)
        for (var r = _[d], o = r._array, c = 0; c < o.length; c++)
          if (o[c] == r) {
            o.splice(c, 1);
            break;
          }
    }
  }, e._delete_marked_timespan_by_config = function(n) {
    var _, d = e._marked_timespans, r = n.sections, o = n.days, c = n.type || t;
    if (r) {
      for (var h in r)
        if (r.hasOwnProperty(h) && d[h]) {
          var y = r[h];
          d[h][y] && (_ = d[h][y]);
        }
    } else
      _ = d.global;
    if (_) {
      if (o !== void 0)
        _[o] && _[o][c] && (e._addMarkerTimespanConfig(n), e._delete_marked_timespans_list(_[o][c], n));
      else
        for (var b in _)
          if (_[b][c]) {
            var p = e._lame_clone(n);
            n.days = b, e._addMarkerTimespanConfig(p), e._delete_marked_timespans_list(_[b][c], n);
          }
    }
  }, e._delete_marked_timespans_list = function(n, _) {
    for (var d = 0; d < n.length; d++) {
      var r = n[d], o = e._subtract_timespan_zones(r.zones, _.zones);
      if (o.length)
        r.zones = o;
      else {
        n.splice(d, 1), d--;
        for (var c = e._marked_timespans_ids[r.id], h = 0; h < c.length; h++)
          if (c[h] == r) {
            c.splice(h, 1);
            break;
          }
      }
    }
  }, e.deleteMarkedTimespan = function(n) {
    if (arguments.length || (e._marked_timespans = { global: {} }, e._marked_timespans_ids = {}, e._marked_timespans_types = {}), typeof n != "object")
      e._delete_marked_timespan_by_id(n);
    else {
      n.start_date && n.end_date || (n.days !== void 0 || n.type || (n.days = "fullweek"), n.zones || (n.zones = "fullday"));
      var _ = [];
      if (n.type)
        _.push(n.type);
      else
        for (var d in e._marked_timespans_types)
          _.push(d);
      for (var r = e._prepare_timespan_options(n), o = 0; o < r.length; o++)
        for (var c = r[o], h = 0; h < _.length; h++) {
          var y = e._lame_clone(c);
          y.type = _[h], e._delete_marked_timespan_by_config(y);
        }
    }
  }, e._get_types_to_render = function(n, _) {
    var d = n ? e._lame_copy({}, n) : {};
    for (var r in _ || {})
      _.hasOwnProperty(r) && (d[r] = _[r]);
    return d;
  }, e._get_configs_to_render = function(n) {
    var _ = [];
    for (var d in n)
      n.hasOwnProperty(d) && _.push.apply(_, n[d]);
    return _;
  }, e._on_scale_add_marker = function(n, _) {
    if (!e._table_view || e._mode == "month") {
      var d = _.getDay(), r = _.valueOf(), o = this._mode, c = e._marked_timespans, h = [], y = [];
      if (this._props && this._props[o]) {
        var b = this._props[o], p = b.options, u = p[e._get_unit_index(b, _)];
        if (b.days > 1) {
          var m = Math.round((_ - e._min_date) / 864e5), l = b.size || p.length;
          _ = e.date.add(e._min_date, Math.floor(m / l), "day"), _ = e.date.date_part(_);
        } else
          _ = e.date.date_part(new Date(this._date));
        if (d = _.getDay(), r = _.valueOf(), c[o] && c[o][u.key]) {
          var f = c[o][u.key], g = e._get_types_to_render(f[d], f[r]);
          h.push.apply(h, e._get_configs_to_render(g));
        }
      }
      var x = c.global;
      if (e.config.overwrite_marked_timespans) {
        var w = x[r] || x[d];
        h.push.apply(h, e._get_configs_to_render(w));
      } else
        x[r] && h.push.apply(h, e._get_configs_to_render(x[r])), x[d] && h.push.apply(h, e._get_configs_to_render(x[d]));
      for (var E = 0; E < h.length; E++)
        y.push.apply(y, e._render_marked_timespan(h[E], n, _));
      return y;
    }
  }, e.attachEvent("onScaleAdd", function() {
    e._on_scale_add_marker.apply(e, arguments);
  }), e.dblclick_dhx_marked_timespan = function(n, _) {
    e.callEvent("onScaleDblClick", [e.getActionData(n).date, _, n]), e.config.dblclick_create && e.addEventNow(e.getActionData(n).date, null, n);
  };
}
function ga(e) {
  var i = {}, t = !1;
  function a(r, o) {
    o = typeof o == "function" ? o : function() {
    }, i[r] || (i[r] = this[r], this[r] = o);
  }
  function s(r) {
    i[r] && (this[r] = i[r], i[r] = null);
  }
  function n(r) {
    for (var o in r)
      a.call(this, o, r[o]);
  }
  function _() {
    for (var r in i)
      s.call(this, r);
  }
  function d(r) {
    try {
      r();
    } catch (o) {
      window.console.error(o);
    }
  }
  return e.$stateProvider.registerProvider("batchUpdate", function() {
    return { batch_update: t };
  }, !1), function(r, o) {
    if (t)
      return void d(r);
    var c, h = this._dp && this._dp.updateMode != "off";
    h && (c = this._dp.updateMode, this._dp.setUpdateMode("off"));
    const y = { setModeDate: { date: null, mode: null }, needRender: !1, needUpdateView: !1, repaintEvents: {} }, b = (u, m) => {
      u && (y.setModeDate.date = u), m && (y.setModeDate.mode = m);
    };
    var p = { render: (u, m) => {
      y.needRender = !0, b(u, m);
    }, setCurrentView: (u, m) => {
      y.needRender = !0, b(u, m);
    }, updateView: (u, m) => {
      y.needUpdateView = !0, b(u, m);
    }, render_data: () => y.needRender = !0, render_view_data: (u) => {
      u && u.length ? u.forEach((m) => y.repaintEvents[m.id] = !0) : y.needRender = !0;
    } };
    if (n.call(this, p), t = !0, this.callEvent("onBeforeBatchUpdate", []), d(r), this.callEvent("onAfterBatchUpdate", []), _.call(this), t = !1, !o)
      if (y.needRender)
        e.render(y.setModeDate.date, y.setModeDate.mode);
      else if (y.needUpdateView)
        e.updateView(y.setModeDate.date, y.setModeDate.mode);
      else
        for (const u in y.repaintEvents)
          e.updateEvent(u);
    h && (this._dp.setUpdateMode(c), this._dp.sendData());
  };
}
class ma {
  constructor(i) {
    const { url: t, token: a } = i;
    this._url = t, this._token = a, this._mode = 1, this._seed = 1, this._queue = [], this.data = {}, this.api = {}, this._events = {};
  }
  headers() {
    return { Accept: "application/json", "Content-Type": "application/json", "Remote-Token": this._token };
  }
  fetch(i, t) {
    const a = { credentials: "include", headers: this.headers() };
    return t && (a.method = "POST", a.body = t), fetch(i, a).then((s) => s.json());
  }
  load(i) {
    return i && (this._url = i), this.fetch(this._url).then((t) => this.parse(t));
  }
  parse(i) {
    const { key: t, websocket: a } = i;
    t && (this._token = i.key);
    for (const s in i.data)
      this.data[s] = i.data[s];
    for (const s in i.api) {
      const n = this.api[s] = {}, _ = i.api[s];
      for (const d in _)
        n[d] = this._wrapper(s + "." + d);
    }
    return a && this.connect(), this;
  }
  connect() {
    const i = this._socket;
    i && (this._socket = null, i.onclose = function() {
    }, i.close()), this._mode = 2, this._socket = function(t, a, s, n) {
      let _ = a;
      _[0] === "/" && (_ = document.location.protocol + "//" + document.location.host + a), _ = _.replace(/^http(s|):/, "ws$1:");
      const d = _.indexOf("?") != -1 ? "&" : "?";
      _ = `${_}${d}token=${s}&ws=1`;
      const r = new WebSocket(_);
      return r.onclose = () => setTimeout(() => t.connect(), 2e3), r.onmessage = (o) => {
        const c = JSON.parse(o.data);
        switch (c.action) {
          case "result":
            t.result(c.body, []);
            break;
          case "event":
            t.fire(c.body.name, c.body.value);
            break;
          case "start":
            n();
            break;
          default:
            t.onError(c.data);
        }
      }, r;
    }(this, this._url, this._token, () => (this._mode = 3, this._send(), this._resubscribe(), this));
  }
  _wrapper(i) {
    return (function() {
      const t = [].slice.call(arguments);
      let a = null;
      const s = new Promise((n, _) => {
        a = { data: { id: this._uid(), name: i, args: t }, status: 1, resolve: n, reject: _ }, this._queue.push(a);
      });
      return this.onCall(a, s), this._mode === 3 ? this._send(a) : setTimeout(() => this._send(), 1), s;
    }).bind(this);
  }
  _uid() {
    return (this._seed++).toString();
  }
  _send(i) {
    if (this._mode == 2)
      return void setTimeout(() => this._send(), 100);
    const t = i ? [i] : this._queue.filter((s) => s.status === 1);
    if (!t.length)
      return;
    const a = t.map((s) => (s.status = 2, s.data));
    this._mode !== 3 ? this.fetch(this._url, JSON.stringify(a)).catch((s) => this.onError(s)).then((s) => this.result(s, a)) : this._socket.send(JSON.stringify({ action: "call", body: a }));
  }
  result(i, t) {
    const a = {};
    if (i)
      for (let s = 0; s < i.length; s++)
        a[i[s].id] = i[s];
    else
      for (let s = 0; s < t.length; s++)
        a[t[s].id] = { id: t[s].id, error: "Network Error", data: null };
    for (let s = this._queue.length - 1; s >= 0; s--) {
      const n = this._queue[s], _ = a[n.data.id];
      _ && (this.onResponse(n, _), _.error ? n.reject(_.error) : n.resolve(_.data), this._queue.splice(s, 1));
    }
  }
  on(i, t) {
    const a = this._uid();
    let s = this._events[i];
    const n = !!s;
    return n || (s = this._events[i] = []), s.push({ id: a, handler: t }), n || this._mode != 3 || this._socket.send(JSON.stringify({ action: "subscribe", name: i })), { name: i, id: a };
  }
  _resubscribe() {
    if (this._mode == 3)
      for (const i in this._events)
        this._socket.send(JSON.stringify({ action: "subscribe", name: i }));
  }
  detach(i) {
    if (!i) {
      if (this._mode == 3)
        for (const n in this._events)
          this._socket.send(JSON.stringify({ action: "unsubscribe", key: n }));
      return void (this._events = {});
    }
    const { id: t, name: a } = i, s = this._events[a];
    if (s) {
      const n = s.filter((_) => _.id != t);
      n.length ? this._events[a] = n : (delete this._events[a], this._mode == 3 && this._socket.send(JSON.stringify({ action: "unsubscribe", name: a })));
    }
  }
  fire(i, t) {
    const a = this._events[i];
    if (a)
      for (let s = 0; s < a.length; s++)
        a[s].handler(t);
  }
  onError(i) {
    return null;
  }
  onCall(i, t) {
  }
  onResponse(i, t) {
  }
}
class va {
  constructor(i, t) {
    const a = new ma({ url: i, token: t });
    a.fetch = function(s, n) {
      const _ = { headers: this.headers() };
      return n && (_.method = "POST", _.body = n), fetch(s, _).then((d) => d.json());
    }, this._ready = a.load().then((s) => this._remote = s);
  }
  ready() {
    return this._ready;
  }
  on(i, t) {
    this.ready().then((a) => {
      if (typeof i == "string")
        a.on(i, t);
      else
        for (const s in i)
          a.on(s, i[s]);
    });
  }
}
function ya(e) {
  function i(a, s) {
    switch (a) {
      case "add-event":
        (function(n) {
          if (e.getEvent(n.id))
            return void console.warn(`Event with ID ${n.id} already exists. Skipping add.`);
          n.start_date = e.templates.parse_date(n.start_date), n.end_date = e.templates.parse_date(n.end_date), n.original_start && (n.original_start = e.templates.parse_date(n.original_start)), t(() => {
            e.addEvent(n);
          });
        })(s);
        break;
      case "update-event":
        (function(n) {
          const _ = n.id;
          if (!e.getEvent(_))
            return void console.warn(`Event with ID ${_} does not exist. Skipping update.`);
          const d = e.getEvent(_);
          t(() => {
            for (let r in n)
              r !== "start_date" && r !== "end_date" && (d[r] = n[r]);
            d.start_date = e.templates.parse_date(n.start_date), d.end_date = e.templates.parse_date(n.end_date), n.original_start && (n.original_start = e.templates.parse_date(n.original_start)), e.callEvent("onEventChanged", [_, d]), e.updateEvent(_), _ !== n.id && e.changeEventId(_, n.id);
          });
        })(s);
        break;
      case "delete-event":
        (function(n) {
          const _ = n.id;
          if (!e.getEvent(_))
            return void ((n.event_pid || n.recurring_event_id) && t(() => {
              e.addEvent(n);
            }));
          t(() => {
            const d = e.getEvent(_);
            if (d) {
              if (d.rec_type || d.rrule) {
                e._roll_back_dates(d);
                const r = e._get_rec_markers(_);
                for (const o in r)
                  e.getEvent(o) && e.deleteEvent(o, !0);
              }
              if (e.getState().lightbox_id == _ && (this._new_event = this._lightbox_id, n.id = this._lightbox_id, this._events[this._lightbox_id] = n, e.callEvent("onLiveUpdateCollision", [_, null, "delete", n]) === !1))
                return void e.endLightbox(!1, e._lightbox);
              e.deleteEvent(_, !0);
            }
          });
        })(s);
    }
  }
  function t(a) {
    e._dp ? e._dp.ignore(a) : a();
  }
  return { events: function(a) {
    if (!a || !a.event || !a.event.id)
      return void console.error("Invalid message format:", a);
    const { type: s, event: n } = a;
    if (!e._dp || !e._dp._in_progress[n.id]) {
      if (s === "add-event") {
        for (const _ in e._dp._in_progress)
          if (e._dp.getState(_) === "inserted")
            return void e._dp.attachEvent("onFullSync", function() {
              e.getEvent(n.id) || i(s, n);
            }, { once: !0 });
      }
      i(s, n);
    }
  } };
}
function ba(e) {
  (function(i) {
    const t = {};
    i.attachEvent("onConfirmedBeforeEventDelete", function(a) {
      return t[a] = !0, !0;
    }), i.attachEvent("onEventDeleted", function(a, s) {
      if (!t[a])
        return;
      delete t[a];
      let n = i.copy(s);
      i.config.undo_deleted && !i.getState().new_event && i.message({ text: `<div class="dhx_info_message">
                            <span class="undo_popup_text">Event deleted</span>
                            <button class="undo_button" data-deleted-event-id="${s.id}">Undo</button>
                        </div>`, expire: 1e4, type: "popup_after_delete", callback: function(_) {
        _.target.closest(`[data-deleted-event-id="${s.id}"]`) && (n.rrule && n.duration && (n.end_date = new Date(n.start_date.valueOf() + 1e3 * n.duration), i.addEvent(n)), i.addEvent(n), i.render());
      } });
    });
  })(e), fa(e), pa(e), function(i) {
    i.batchUpdate = ga(i);
  }(e), function(i) {
    i.ext || (i.ext = {}), i.ext.liveUpdates = { RemoteEvents: va, remoteUpdates: ya(i) };
  }(e);
}
var xa = Date.now();
function it(e) {
  return !(!e || typeof e != "object") && !!(e.getFullYear && e.getMonth && e.getDate);
}
const ve = { uid: function() {
  return xa++;
}, mixin: function(e, i, t) {
  for (var a in i)
    (e[a] === void 0 || t) && (e[a] = i[a]);
  return e;
}, copy: function e(i) {
  var t, a, s;
  if (i && typeof i == "object")
    switch (!0) {
      case it(i):
        a = new Date(i);
        break;
      case (s = i, Array.isArray ? Array.isArray(s) : s && s.length !== void 0 && s.pop && s.push):
        for (a = new Array(i.length), t = 0; t < i.length; t++)
          a[t] = e(i[t]);
        break;
      case function(n) {
        return n && typeof n == "object" && Function.prototype.toString.call(n.constructor) === "function String() { [native code] }";
      }(i):
        a = new String(i);
        break;
      case function(n) {
        return n && typeof n == "object" && Function.prototype.toString.call(n.constructor) === "function Number() { [native code] }";
      }(i):
        a = new Number(i);
        break;
      case function(n) {
        return n && typeof n == "object" && Function.prototype.toString.call(n.constructor) === "function Boolean() { [native code] }";
      }(i):
        a = new Boolean(i);
        break;
      default:
        for (t in a = {}, i) {
          const n = typeof i[t];
          n === "string" || n === "number" || n === "boolean" ? a[t] = i[t] : it(i[t]) ? a[t] = new Date(i[t]) : Object.prototype.hasOwnProperty.apply(i, [t]) && (a[t] = e(i[t]));
        }
    }
  return a || i;
}, defined: function(e) {
  return e !== void 0;
}, isDate: it, delay: function(e, i) {
  var t, a = function() {
    a.$cancelTimeout(), a.$pending = !0;
    var s = Array.prototype.slice.call(arguments);
    t = setTimeout(function() {
      e.apply(this, s), a.$pending = !1;
    }, i);
  };
  return a.$pending = !1, a.$cancelTimeout = function() {
    clearTimeout(t), a.$pending = !1;
  }, a.$execute = function() {
    var s = Array.prototype.slice.call(arguments);
    e.apply(this, s), a.$cancelTimeout();
  }, a;
} };
function wa(e) {
  function i(p) {
    var u = document.createElement("div");
    return (p || "").split(" ").forEach(function(m) {
      u.classList.add(m);
    }), u;
  }
  var t = function() {
    return i("dhx_cal_navbar_rows_container");
  }, a = function() {
    return i("dhx_cal_navbar_row");
  }, s = function(p) {
    var u = i("dhx_cal_tab");
    return u.setAttribute("name", p.view + "_tab"), u.setAttribute("data-tab", p.view), e.config.fix_tab_position && (p.$firstTab ? u.classList.add("dhx_cal_tab_first") : p.$lastTab ? u.classList.add("dhx_cal_tab_last") : p.view !== "week" && u.classList.add("dhx_cal_tab_standalone"), p.$segmentedTab && u.classList.add("dhx_cal_tab_segmented")), u;
  }, n = function() {
    return i("dhx_cal_date");
  }, _ = function(p) {
    return i("dhx_cal_nav_button dhx_cal_nav_button_custom dhx_cal_tab");
  }, d = function(p) {
    return i("dhx_cal_" + p.view + "_button dhx_cal_nav_button");
  }, r = function() {
    return i("dhx_cal_line_spacer");
  }, o = function(p) {
    var u = i("dhx_minical_icon");
    return p.click || u.$_eventAttached || e.event(u, "click", function() {
      e.isCalendarVisible() ? e.destroyCalendar() : e.renderCalendar({ position: this, date: e.getState().date, navigation: !0, handler: function(m, l) {
        e.setCurrentView(m), e.destroyCalendar();
      } });
    }), u;
  };
  function c(p) {
    var u = function(f) {
      var g;
      if (f.view)
        switch (f.view) {
          case "today":
          case "next":
          case "prev":
            g = d;
            break;
          case "date":
            g = n;
            break;
          case "spacer":
            g = r;
            break;
          case "button":
            g = _;
            break;
          case "minicalendar":
            g = o;
            break;
          default:
            g = s;
        }
      else
        f.rows ? g = t : f.cols && (g = a);
      return g;
    }(p);
    if (u) {
      var m = u(p);
      if (p.css && m.classList.add(p.css), p.width && ((l = p.width) === 1 * l && (l += "px"), m.style.width = l), p.height && ((l = p.height) === 1 * l && (l += "px"), m.style.height = l), p.click && e.event(m, "click", p.click), p.html && (m.innerHTML = p.html), p.align) {
        var l = "";
        p.align == "right" ? l = "flex-end" : p.align == "left" && (l = "flex-start"), m.style.justifyContent = l;
      }
      return m;
    }
  }
  function h(p) {
    return typeof p == "string" && (p = { view: p }), p.view || p.rows || p.cols || (p.view = "button"), p;
  }
  function y(p) {
    var u, m = document.createDocumentFragment();
    u = Array.isArray(p) ? p : [p];
    for (var l = 0; l < u.length; l++) {
      var f, g = h(u[l]);
      g.view === "day" && u[l + 1] && ((f = h(u[l + 1])).view !== "week" && f.view !== "month" || (g.$firstTab = !0, g.$segmentedTab = !0)), g.view === "week" && u[l - 1] && ((f = h(u[l + 1])).view !== "week" && f.view !== "month" || (g.$segmentedTab = !0)), g.view === "month" && u[l - 1] && ((f = h(u[l - 1])).view !== "week" && f.view !== "day" || (g.$lastTab = !0, g.$segmentedTab = !0));
      var x = c(g);
      m.appendChild(x), (g.cols || g.rows) && x.appendChild(y(g.cols || g.rows));
    }
    return m;
  }
  e._init_nav_bar = function(p) {
    var u = this.$container.querySelector(".dhx_cal_navline");
    return u || ((u = document.createElement("div")).className = "dhx_cal_navline dhx_cal_navline_flex", e._update_nav_bar(p, u), u);
  };
  var b = null;
  e._update_nav_bar = function(p, u) {
    if (p) {
      var m = !1, l = p.height || e.xy.nav_height;
      b !== null && b === l || (m = !0), m && (e.xy.nav_height = l), u.innerHTML = "", u.appendChild(y(p)), e.unset_actions(), e._els = [], e.get_elements(), e.set_actions(), u.style.display = l === 0 ? "none" : "", b = l;
    }
  };
}
function ka(e) {
  function i(n) {
    return n.isConnected !== void 0 ? n.isConnected : document.body.contains(n);
  }
  function t(n) {
    return { w: n.innerWidth || document.documentElement.clientWidth, h: n.innerHeight || document.documentElement.clientHeight };
  }
  function a(n, _) {
    var d, r = t(_);
    n.event(_, "resize", function() {
      clearTimeout(d), d = setTimeout(function() {
        if (i(n.$container) && !n.$destroyed) {
          var o, c, h = t(_);
          c = h, ((o = r).w != c.w || o.h != c.h) && (r = h, s(n));
        }
      }, 150);
    });
  }
  function s(n) {
    n.$initialized && !n.$destroyed && n.$root && i(n.$root) && n.callEvent("onSchedulerResize", []) && (n.updateView(), n.callEvent("onAfterSchedulerResize", []));
  }
  (function(n) {
    var _ = n.$container;
    if (window.getComputedStyle(_).getPropertyValue("position") == "static" && (_.style.position = "relative"), window.ResizeObserver) {
      let r = !0;
      const o = new ResizeObserver(function(c) {
        r ? r = !1 : s(n);
      });
      o.observe(_), n.attachEvent("onDestroy", function() {
        o.unobserve(_);
      });
    } else {
      var d = document.createElement("iframe");
      d.className = "scheduler_container_resize_watcher", d.tabIndex = -1, n.config.wai_aria_attributes && (d.setAttribute("role", "none"), d.setAttribute("aria-hidden", !0)), window.Sfdc || window.$A || window.Aura ? function(r) {
        var o = r.$root.offsetHeight, c = r.$root.offsetWidth;
        (function h() {
          r.$destroyed || (r.$root && (r.$root.offsetHeight == o && r.$root.offsetWidth == c || s(r), o = r.$root.offsetHeight, c = r.$root.offsetWidth), setTimeout(h, 200));
        })();
      }(n) : (_.appendChild(d), d.contentWindow ? a(n, d.contentWindow) : (_.removeChild(d), a(n, window)));
    }
  })(e);
}
class Ea {
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
function nt(e) {
  const i = new Ea();
  e.attachEvent = function(t, a, s) {
    t = "ev_" + t.toLowerCase(), i.listeners[t] || (i.listeners[t] = function(_) {
      let d = {}, r = 0;
      const o = function() {
        let c = !0;
        for (const h in d) {
          const y = d[h].apply(_, arguments);
          c = c && y;
        }
        return c;
      };
      return o.addEvent = function(c, h) {
        if (typeof c == "function") {
          let y;
          if (h && h.id ? y = h.id : (y = r, r++), h && h.once) {
            const b = c;
            c = function() {
              b(), o.removeEvent(y);
            };
          }
          return d[y] = c, y;
        }
        return !1;
      }, o.removeEvent = function(c) {
        delete d[c];
      }, o.clear = function() {
        d = {};
      }, o;
    }(this)), s && s.thisObject && (a = a.bind(s.thisObject));
    let n = t + ":" + i.listeners[t].addEvent(a, s);
    return s && s.id && (n = s.id), n;
  }, e.attachAll = function(t) {
    this.attachEvent("listen_all", t);
  }, e.callEvent = function(t, a) {
    if (i._silent_mode)
      return !0;
    const s = "ev_" + t.toLowerCase(), n = i.listeners;
    return n.ev_listen_all && n.ev_listen_all.apply(this, [t].concat(a)), !n[s] || n[s].apply(this, a);
  }, e.checkEvent = function(t) {
    return !!i.listeners["ev_" + t.toLowerCase()];
  }, e.detachEvent = function(t) {
    if (t) {
      let a = i.listeners;
      for (const n in a)
        a[n].removeEvent(t);
      const s = t.split(":");
      if (a = i.listeners, s.length === 2) {
        const n = s[0], _ = s[1];
        a[n] && a[n].removeEvent(_);
      }
    }
  }, e.detachAllEvents = function() {
    for (const t in i.listeners)
      i.listeners[t].clear();
  };
}
const At = { event: function(e, i, t) {
  e.addEventListener ? e.addEventListener(i, t, !1) : e.attachEvent && e.attachEvent("on" + i, t);
}, eventRemove: function(e, i, t) {
  e.removeEventListener ? e.removeEventListener(i, t, !1) : e.detachEvent && e.detachEvent("on" + i, t);
} };
function Da(e) {
  var i = function() {
    var t = function(a, s) {
      a = a || At.event, s = s || At.eventRemove;
      var n = [], _ = { attach: function(d, r, o, c) {
        n.push({ element: d, event: r, callback: o, capture: c }), a(d, r, o, c);
      }, detach: function(d, r, o, c) {
        s(d, r, o, c);
        for (var h = 0; h < n.length; h++) {
          var y = n[h];
          y.element === d && y.event === r && y.callback === o && y.capture === c && (n.splice(h, 1), h--);
        }
      }, detachAll: function() {
        for (var d = n.slice(), r = 0; r < d.length; r++) {
          var o = d[r];
          _.detach(o.element, o.event, o.callback, o.capture), _.detach(o.element, o.event, o.callback, void 0), _.detach(o.element, o.event, o.callback, !1), _.detach(o.element, o.event, o.callback, !0);
        }
        n.splice(0, n.length);
      }, extend: function() {
        return t(this.event, this.eventRemove);
      } };
      return _;
    };
    return t();
  }();
  e.event = i.attach, e.eventRemove = i.detach, e._eventRemoveAll = i.detachAll, e._createDomEventScope = i.extend, e._trim = function(t) {
    return (String.prototype.trim || function() {
      return this.replace(/^\s+|\s+$/g, "");
    }).apply(t);
  }, e._isDate = function(t) {
    return !(!t || typeof t != "object") && !!(t.getFullYear && t.getMonth && t.getDate);
  }, e._isObject = function(t) {
    return t && typeof t == "object";
  };
}
function Gt(e) {
  if (!e)
    return "";
  var i = e.className || "";
  return i.baseVal && (i = i.baseVal), i.indexOf || (i = ""), i || "";
}
function Zt(e, i, t) {
  t === void 0 && (t = !0);
  for (var a = e.target || e.srcElement, s = ""; a; ) {
    if (s = Gt(a)) {
      var n = s.indexOf(i);
      if (n >= 0) {
        if (!t)
          return a;
        var _ = n === 0 || !(s.charAt(n - 1) || "").trim(), d = n + i.length >= s.length || !s.charAt(n + i.length).trim();
        if (_ && d)
          return a;
      }
    }
    a = a.parentNode;
  }
  return null;
}
function Sa(e) {
  var i = !1, t = !1;
  if (window.getComputedStyle) {
    var a = window.getComputedStyle(e, null);
    i = a.display, t = a.visibility;
  } else
    e.currentStyle && (i = e.currentStyle.display, t = e.currentStyle.visibility);
  var s = !1, n = Zt({ target: e }, "dhx_form_repeat", !1);
  return n && (s = n.style.height == "0px"), s = s || !e.offsetHeight, i != "none" && t != "hidden" && !s;
}
function Ma(e) {
  return !isNaN(e.getAttribute("tabindex")) && 1 * e.getAttribute("tabindex") >= 0;
}
function Na(e) {
  return !{ a: !0, area: !0 }[e.nodeName.loLowerCase()] || !!e.getAttribute("href");
}
function Ta(e) {
  return !{ input: !0, select: !0, textarea: !0, button: !0, object: !0 }[e.nodeName.toLowerCase()] || !e.hasAttribute("disabled");
}
function Qt() {
  return document.head.createShadowRoot || document.head.attachShadow;
}
function Ct(e) {
  if (!e || !Qt())
    return document.body;
  for (; e.parentNode && (e = e.parentNode); )
    if (e instanceof ShadowRoot)
      return e.host;
  return document.body;
}
const Ce = { getAbsoluteLeft: function(e) {
  return this.getOffset(e).left;
}, getAbsoluteTop: function(e) {
  return this.getOffset(e).top;
}, getOffsetSum: function(e) {
  for (var i = 0, t = 0; e; )
    i += parseInt(e.offsetTop), t += parseInt(e.offsetLeft), e = e.offsetParent;
  return { top: i, left: t };
}, getOffsetRect: function(e) {
  var i = e.getBoundingClientRect(), t = 0, a = 0;
  if (/Mobi/.test(navigator.userAgent)) {
    var s = document.createElement("div");
    s.style.position = "absolute", s.style.left = "0px", s.style.top = "0px", s.style.width = "1px", s.style.height = "1px", document.body.appendChild(s);
    var n = s.getBoundingClientRect();
    t = i.top - n.top, a = i.left - n.left, s.parentNode.removeChild(s);
  } else {
    var _ = document.body, d = document.documentElement, r = window.pageYOffset || d.scrollTop || _.scrollTop, o = window.pageXOffset || d.scrollLeft || _.scrollLeft, c = d.clientTop || _.clientTop || 0, h = d.clientLeft || _.clientLeft || 0;
    t = i.top + r - c, a = i.left + o - h;
  }
  return { top: Math.round(t), left: Math.round(a) };
}, getOffset: function(e) {
  return e.getBoundingClientRect ? this.getOffsetRect(e) : this.getOffsetSum(e);
}, closest: function(e, i) {
  return e && i ? lt(e, i) : null;
}, insertAfter: function(e, i) {
  i.nextSibling ? i.parentNode.insertBefore(e, i.nextSibling) : i.parentNode.appendChild(e);
}, remove: function(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}, isChildOf: function(e, i) {
  return i.contains(e);
}, getFocusableNodes: function(e) {
  for (var i = e.querySelectorAll(["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"].join(", ")), t = Array.prototype.slice.call(i, 0), a = 0; a < t.length; a++)
    t[a].$position = a;
  for (t.sort(function(n, _) {
    return n.tabIndex === 0 && _.tabIndex !== 0 ? 1 : n.tabIndex !== 0 && _.tabIndex === 0 ? -1 : n.tabIndex === _.tabIndex ? n.$position - _.$position : n.tabIndex < _.tabIndex ? -1 : 1;
  }), a = 0; a < t.length; a++) {
    var s = t[a];
    (Ma(s) || Ta(s) || Na(s)) && Sa(s) || (t.splice(a, 1), a--);
  }
  return t;
}, getClassName: Gt, locateCss: Zt, getRootNode: Ct, hasShadowParent: function(e) {
  return !!Ct(e);
}, isShadowDomSupported: Qt, getActiveElement: function() {
  var e = document.activeElement;
  return e.shadowRoot && (e = e.shadowRoot.activeElement), e === document.body && document.getSelection && (e = document.getSelection().focusNode || document.body), e;
}, getRelativeEventPosition: function(e, i) {
  var t = document.documentElement, a = function(s) {
    var n = 0, _ = 0, d = 0, r = 0;
    if (s.getBoundingClientRect) {
      var o = s.getBoundingClientRect(), c = document.body, h = document.documentElement || document.body.parentNode || document.body, y = window.pageYOffset || h.scrollTop || c.scrollTop, b = window.pageXOffset || h.scrollLeft || c.scrollLeft, p = h.clientTop || c.clientTop || 0, u = h.clientLeft || c.clientLeft || 0;
      n = o.top + y - p, _ = o.left + b - u, d = document.body.offsetWidth - o.right, r = document.body.offsetHeight - o.bottom;
    } else {
      for (; s; )
        n += parseInt(s.offsetTop, 10), _ += parseInt(s.offsetLeft, 10), s = s.offsetParent;
      d = document.body.offsetWidth - s.offsetWidth - _, r = document.body.offsetHeight - s.offsetHeight - n;
    }
    return { y: Math.round(n), x: Math.round(_), width: s.offsetWidth, height: s.offsetHeight, right: Math.round(d), bottom: Math.round(r) };
  }(i);
  return { x: e.clientX - t.clientLeft - a.x + i.scrollLeft, y: e.clientY - t.clientTop - a.y + i.scrollTop };
}, getTargetNode: function(e) {
  var i;
  return e.tagName ? i = e : (i = (e = e || window.event).target || e.srcElement).shadowRoot && e.composedPath && (i = e.composedPath()[0]), i;
}, getNodePosition: function(e) {
  var i = 0, t = 0, a = 0, s = 0;
  if (e.getBoundingClientRect) {
    var n = e.getBoundingClientRect(), _ = document.body, d = document.documentElement || document.body.parentNode || document.body, r = window.pageYOffset || d.scrollTop || _.scrollTop, o = window.pageXOffset || d.scrollLeft || _.scrollLeft, c = d.clientTop || _.clientTop || 0, h = d.clientLeft || _.clientLeft || 0;
    i = n.top + r - c, t = n.left + o - h, a = document.body.offsetWidth - n.right, s = document.body.offsetHeight - n.bottom;
  } else {
    for (; e; )
      i += parseInt(e.offsetTop, 10), t += parseInt(e.offsetLeft, 10), e = e.offsetParent;
    a = document.body.offsetWidth - e.offsetWidth - t, s = document.body.offsetHeight - e.offsetHeight - i;
  }
  return { y: Math.round(i), x: Math.round(t), width: e.offsetWidth, height: e.offsetHeight, right: Math.round(a), bottom: Math.round(s) };
} };
var lt;
if (Element.prototype.closest)
  lt = function(e, i) {
    return e.closest(i);
  };
else {
  var Aa = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  lt = function(e, i) {
    var t = e;
    do {
      if (Aa.call(t, i))
        return t;
      t = t.parentElement || t.parentNode;
    } while (t !== null && t.nodeType === 1);
    return null;
  };
}
var Ae = typeof window < "u";
const Ca = { isIE: Ae && (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0), isOpera: Ae && navigator.userAgent.indexOf("Opera") >= 0, isChrome: Ae && navigator.userAgent.indexOf("Chrome") >= 0, isKHTML: Ae && (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0), isFF: Ae && navigator.userAgent.indexOf("Firefox") >= 0, isIPad: Ae && navigator.userAgent.search(/iPad/gi) >= 0, isEdge: Ae && navigator.userAgent.indexOf("Edge") != -1, isNode: !Ae || typeof navigator > "u" };
function ot(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  var i = "";
  for (var t in e) {
    var a = "";
    e.hasOwnProperty(t) && (a = t + "=" + (a = typeof e[t] == "string" ? encodeURIComponent(e[t]) : typeof e[t] == "number" ? e[t] : encodeURIComponent(JSON.stringify(e[t]))), i.length && (a = "&" + a), i += a);
  }
  return i;
}
function Oa(e) {
  var i = function(n, _) {
    for (var d = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);", r = n.match(/%[a-zA-Z]/g), o = 0; o < r.length; o++)
      switch (r[o]) {
        case "%j":
        case "%d":
          d += "set[2]=temp[" + o + "]||1;";
          break;
        case "%n":
        case "%m":
          d += "set[1]=(temp[" + o + "]||1)-1;";
          break;
        case "%y":
          d += "set[0]=temp[" + o + "]*1+(temp[" + o + "]>50?1900:2000);";
          break;
        case "%g":
        case "%G":
        case "%h":
        case "%H":
          d += "set[3]=temp[" + o + "]||0;";
          break;
        case "%i":
          d += "set[4]=temp[" + o + "]||0;";
          break;
        case "%Y":
          d += "set[0]=temp[" + o + "]||0;";
          break;
        case "%a":
        case "%A":
          d += "set[3]=set[3]%12+((temp[" + o + "]||'').toLowerCase()=='am'?0:12);";
          break;
        case "%s":
          d += "set[5]=temp[" + o + "]||0;";
          break;
        case "%M":
          d += "set[1]=this.locale.date.month_short_hash[temp[" + o + "]]||0;";
          break;
        case "%F":
          d += "set[1]=this.locale.date.month_full_hash[temp[" + o + "]]||0;";
      }
    var c = "set[0],set[1],set[2],set[3],set[4],set[5]";
    return _ && (c = " Date.UTC(" + c + ")"), new Function("date", "var set=[0,0,1,0,0,0]; " + d + " return new Date(" + c + ");");
  }, t = function(n, _) {
    const d = n.match(/%[a-zA-Z]/g);
    return function(r) {
      for (var o = [0, 0, 1, 0, 0, 0], c = r.match(/[a-zA-Z]+|[0-9]+/g), h = 0; h < d.length; h++)
        switch (d[h]) {
          case "%j":
          case "%d":
            o[2] = c[h] || 1;
            break;
          case "%n":
          case "%m":
            o[1] = (c[h] || 1) - 1;
            break;
          case "%y":
            o[0] = 1 * c[h] + (c[h] > 50 ? 1900 : 2e3);
            break;
          case "%g":
          case "%G":
          case "%h":
          case "%H":
            o[3] = c[h] || 0;
            break;
          case "%i":
            o[4] = c[h] || 0;
            break;
          case "%Y":
            o[0] = c[h] || 0;
            break;
          case "%a":
          case "%A":
            o[3] = o[3] % 12 + ((c[h] || "").toLowerCase() == "am" ? 0 : 12);
            break;
          case "%s":
            o[5] = c[h] || 0;
            break;
          case "%M":
            o[1] = e.locale.date.month_short_hash[c[h]] || 0;
            break;
          case "%F":
            o[1] = e.locale.date.month_full_hash[c[h]] || 0;
        }
      return _ ? new Date(Date.UTC(o[0], o[1], o[2], o[3], o[4], o[5])) : new Date(o[0], o[1], o[2], o[3], o[4], o[5]);
    };
  };
  let a;
  function s() {
    var n = !1;
    return e.config.csp === "auto" ? (a === void 0 && (a = function() {
      try {
        new Function("cspEnabled = false;"), a = !1;
      } catch {
        a = !0;
      }
      return a;
    }()), n = a) : n = e.config.csp, n;
  }
  e.date = { init: function() {
    for (var n = e.locale.date.month_short, _ = e.locale.date.month_short_hash = {}, d = 0; d < n.length; d++)
      _[n[d]] = d;
    for (n = e.locale.date.month_full, _ = e.locale.date.month_full_hash = {}, d = 0; d < n.length; d++)
      _[n[d]] = d;
  }, date_part: function(n) {
    const _ = new Date(n);
    var d = new Date(_);
    return _.setHours(0), _.setMinutes(0), _.setSeconds(0), _.setMilliseconds(0), _.getHours() && (_.getDate() < d.getDate() || _.getMonth() < d.getMonth() || _.getFullYear() < d.getFullYear()) && _.setTime(_.getTime() + 36e5 * (24 - _.getHours())), _;
  }, time_part: function(n) {
    return (n.valueOf() / 1e3 - 60 * n.getTimezoneOffset()) % 86400;
  }, week_start: function(n) {
    var _ = n.getDay();
    return e.config.start_on_monday && (_ === 0 ? _ = 6 : _--), this.date_part(this.add(n, -1 * _, "day"));
  }, month_start: function(n) {
    const _ = new Date(n);
    return _.setDate(1), this.date_part(_);
  }, year_start: function(n) {
    const _ = new Date(n);
    return _.setMonth(0), this.month_start(_);
  }, day_start: function(n) {
    const _ = new Date(n);
    return this.date_part(_);
  }, _add_days: function(n, _) {
    var d = new Date(n.valueOf());
    if (d.setDate(d.getDate() + _), _ == Math.round(_) && _ > 0) {
      var r = (+d - +n) % 864e5;
      if (r && n.getTimezoneOffset() == d.getTimezoneOffset()) {
        var o = r / 36e5;
        d.setTime(d.getTime() + 60 * (24 - o) * 60 * 1e3);
      }
    }
    return _ >= 0 && !n.getHours() && d.getHours() && (d.getDate() < n.getDate() || d.getMonth() < n.getMonth() || d.getFullYear() < n.getFullYear()) && d.setTime(d.getTime() + 36e5 * (24 - d.getHours())), d;
  }, add: function(n, _, d) {
    var r = new Date(n.valueOf());
    switch (d) {
      case "day":
        r = e.date._add_days(r, _);
        break;
      case "week":
        r = e.date._add_days(r, 7 * _);
        break;
      case "month":
        r.setMonth(r.getMonth() + _);
        break;
      case "year":
        r.setYear(r.getFullYear() + _);
        break;
      case "hour":
        r.setTime(r.getTime() + 60 * _ * 60 * 1e3);
        break;
      case "minute":
        r.setTime(r.getTime() + 60 * _ * 1e3);
        break;
      default:
        return e.date["add_" + d](n, _, d);
    }
    return r;
  }, to_fixed: function(n) {
    return n < 10 ? "0" + n : n;
  }, copy: function(n) {
    return new Date(n.valueOf());
  }, date_to_str: function(n, _) {
    return s() ? function(d, r) {
      return function(o) {
        return d.replace(/%[a-zA-Z]/g, function(c) {
          switch (c) {
            case "%d":
              return r ? e.date.to_fixed(o.getUTCDate()) : e.date.to_fixed(o.getDate());
            case "%m":
              return r ? e.date.to_fixed(o.getUTCMonth() + 1) : e.date.to_fixed(o.getMonth() + 1);
            case "%j":
              return r ? o.getUTCDate() : o.getDate();
            case "%n":
              return r ? o.getUTCMonth() + 1 : o.getMonth() + 1;
            case "%y":
              return r ? e.date.to_fixed(o.getUTCFullYear() % 100) : e.date.to_fixed(o.getFullYear() % 100);
            case "%Y":
              return r ? o.getUTCFullYear() : o.getFullYear();
            case "%D":
              return r ? e.locale.date.day_short[o.getUTCDay()] : e.locale.date.day_short[o.getDay()];
            case "%l":
              return r ? e.locale.date.day_full[o.getUTCDay()] : e.locale.date.day_full[o.getDay()];
            case "%M":
              return r ? e.locale.date.month_short[o.getUTCMonth()] : e.locale.date.month_short[o.getMonth()];
            case "%F":
              return r ? e.locale.date.month_full[o.getUTCMonth()] : e.locale.date.month_full[o.getMonth()];
            case "%h":
              return r ? e.date.to_fixed((o.getUTCHours() + 11) % 12 + 1) : e.date.to_fixed((o.getHours() + 11) % 12 + 1);
            case "%g":
              return r ? (o.getUTCHours() + 11) % 12 + 1 : (o.getHours() + 11) % 12 + 1;
            case "%G":
              return r ? o.getUTCHours() : o.getHours();
            case "%H":
              return r ? e.date.to_fixed(o.getUTCHours()) : e.date.to_fixed(o.getHours());
            case "%i":
              return r ? e.date.to_fixed(o.getUTCMinutes()) : e.date.to_fixed(o.getMinutes());
            case "%a":
              return r ? o.getUTCHours() > 11 ? "pm" : "am" : o.getHours() > 11 ? "pm" : "am";
            case "%A":
              return r ? o.getUTCHours() > 11 ? "PM" : "AM" : o.getHours() > 11 ? "PM" : "AM";
            case "%s":
              return r ? e.date.to_fixed(o.getUTCSeconds()) : e.date.to_fixed(o.getSeconds());
            case "%W":
              return r ? e.date.to_fixed(e.date.getUTCISOWeek(o)) : e.date.to_fixed(e.date.getISOWeek(o));
            default:
              return c;
          }
        });
      };
    }(n, _) : (n = n.replace(/%[a-zA-Z]/g, function(d) {
      switch (d) {
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
          return d;
      }
    }), _ && (n = n.replace(/date\.get/g, "date.getUTC")), new Function("date", 'return "' + n + '";').bind(e));
  }, str_to_date: function(n, _, d) {
    var r = s() ? t : i, o = r(n, _), c = /^[0-9]{4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/, h = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4} ?(([0-9]{1,2}:[0-9]{2})(:[0-9]{1,2})?)?$/, y = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/, b = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/, p = r("%Y-%m-%d %H:%i:%s", _), u = r("%m/%d/%Y %H:%i:%s", _), m = r("%d-%m-%Y %H:%i:%s", _);
    return function(l) {
      if (!d && !e.config.parse_exact_format) {
        if (l && l.getISOWeek)
          return new Date(l);
        if (typeof l == "number")
          return new Date(l);
        if (f = l, c.test(String(f)))
          return p(l);
        if (function(g) {
          return h.test(String(g));
        }(l))
          return u(l);
        if (function(g) {
          return y.test(String(g));
        }(l))
          return m(l);
        if (function(g) {
          return b.test(g);
        }(l))
          return new Date(l);
      }
      var f;
      return o.call(e, l);
    };
  }, getISOWeek: function(n) {
    if (!n)
      return !1;
    var _ = (n = this.date_part(new Date(n))).getDay();
    _ === 0 && (_ = 7);
    var d = new Date(n.valueOf());
    d.setDate(n.getDate() + (4 - _));
    var r = d.getFullYear(), o = Math.round((d.getTime() - new Date(r, 0, 1).getTime()) / 864e5);
    return 1 + Math.floor(o / 7);
  }, getUTCISOWeek: function(n) {
    return this.getISOWeek(this.convert_to_utc(n));
  }, convert_to_utc: function(n) {
    return new Date(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds());
  } };
}
function ea(e) {
  return (function() {
    var i = {};
    for (var t in this._events) {
      var a = this._events[t];
      a.id.toString().indexOf("#") == -1 && (i[a.id] = a);
    }
    return i;
  }).bind(e);
}
function La(e) {
  e._loaded = {}, e._load = function(t, a) {
    if (t = t || this._load_url) {
      var s;
      if (t += (t.indexOf("?") == -1 ? "?" : "&") + "timeshift=" + (/* @__PURE__ */ new Date()).getTimezoneOffset(), this.config.prevent_cache && (t += "&uid=" + this.uid()), a = a || this._date, this._load_mode) {
        var n = this.templates.load_format;
        for (a = this.date[this._load_mode + "_start"](new Date(a.valueOf())); a > this._min_date; )
          a = this.date.add(a, -1, this._load_mode);
        s = a;
        for (var _ = !0; s < this._max_date; )
          s = this.date.add(s, 1, this._load_mode), this._loaded[n(a)] && _ ? a = this.date.add(a, 1, this._load_mode) : _ = !1;
        var d = s;
        do
          s = d, d = this.date.add(s, -1, this._load_mode);
        while (d > a && this._loaded[n(d)]);
        if (s <= a)
          return !1;
        for (e.ajax.get(t + "&from=" + n(a) + "&to=" + n(s), r); a < s; )
          this._loaded[n(a)] = !0, a = this.date.add(a, 1, this._load_mode);
      } else
        e.ajax.get(t, r);
      return this.callEvent("onXLS", []), this.callEvent("onLoadStart", []), !0;
    }
    function r(o) {
      e.on_load(o), e.callEvent("onLoadEnd", []);
    }
  }, e._parsers = {}, function(t) {
    t._parsers.xml = { canParse: function(a, s) {
      if (s.responseXML && s.responseXML.firstChild)
        return !0;
      try {
        var n = t.ajax.parse(s.responseText), _ = t.ajax.xmltop("data", n);
        if (_ && _.tagName === "data")
          return !0;
      } catch {
      }
      return !1;
    }, parse: function(a) {
      var s;
      if (a.xmlDoc.responseXML || (a.xmlDoc.responseXML = t.ajax.parse(a.xmlDoc.responseText)), (s = t.ajax.xmltop("data", a.xmlDoc)).tagName != "data")
        return null;
      var n = s.getAttribute("dhx_security");
      n && (window.dhtmlx && (window.dhtmlx.security_key = n), t.security_key = n);
      for (var _ = t.ajax.xpath("//coll_options", a.xmlDoc), d = 0; d < _.length; d++) {
        var r = _[d].getAttribute("for"), o = t.serverList[r];
        o || (t.serverList[r] = o = []), o.splice(0, o.length);
        for (var c = t.ajax.xpath(".//item", _[d]), h = 0; h < c.length; h++) {
          for (var y = c[h].attributes, b = { key: c[h].getAttribute("value"), label: c[h].getAttribute("label") }, p = 0; p < y.length; p++) {
            var u = y[p];
            u.nodeName != "value" && u.nodeName != "label" && (b[u.nodeName] = u.nodeValue);
          }
          o.push(b);
        }
      }
      _.length && t.callEvent("onOptionsLoad", []);
      var m = t.ajax.xpath("//userdata", a.xmlDoc);
      for (d = 0; d < m.length; d++) {
        var l = t._xmlNodeToJSON(m[d]);
        t._userdata[l.name] = l.text;
      }
      var f = [];
      for (s = t.ajax.xpath("//event", a.xmlDoc), d = 0; d < s.length; d++) {
        var g = f[d] = t._xmlNodeToJSON(s[d]);
        t._init_event(g);
      }
      return f;
    } };
  }(e), function(t) {
    t.json = t._parsers.json = { canParse: function(a) {
      if (a && typeof a == "object")
        return !0;
      if (typeof a == "string")
        try {
          var s = JSON.parse(a);
          return Object.prototype.toString.call(s) === "[object Object]" || Object.prototype.toString.call(s) === "[object Array]";
        } catch {
          return !1;
        }
      return !1;
    }, parse: function(a) {
      var s = [];
      typeof a == "string" && (a = JSON.parse(a)), Object.prototype.toString.call(a) === "[object Array]" ? s = a : a && (a.events ? s = a.events : a.data && (s = a.data)), s = s || [], a.dhx_security && (window.dhtmlx && (window.dhtmlx.security_key = a.dhx_security), t.security_key = a.dhx_security);
      var n = a && a.collections ? a.collections : {}, _ = !1;
      for (var d in n)
        if (n.hasOwnProperty(d)) {
          _ = !0;
          var r = n[d], o = t.serverList[d];
          o || (t.serverList[d] = o = []), o.splice(0, o.length);
          for (var c = 0; c < r.length; c++) {
            var h = r[c], y = { key: h.value, label: h.label };
            for (var b in h)
              if (h.hasOwnProperty(b)) {
                if (b == "value" || b == "label")
                  continue;
                y[b] = h[b];
              }
            o.push(y);
          }
        }
      _ && t.callEvent("onOptionsLoad", []);
      for (var p = [], u = 0; u < s.length; u++) {
        var m = s[u];
        t._init_event(m), p.push(m);
      }
      return p;
    } };
  }(e), function(t) {
    t.ical = t._parsers.ical = { canParse: function(a) {
      return typeof a == "string" && new RegExp("^BEGIN:VCALENDAR").test(a);
    }, parse: function(a) {
      var s = a.match(RegExp(this.c_start + "[^\f]*" + this.c_end, ""));
      if (s.length) {
        s[0] = s[0].replace(/[\r\n]+ /g, ""), s[0] = s[0].replace(/[\r\n]+(?=[a-z \t])/g, " "), s[0] = s[0].replace(/;[^:\r\n]*:/g, ":");
        for (var n, _ = [], d = RegExp("(?:" + this.e_start + ")([^\f]*?)(?:" + this.e_end + ")", "g"); (n = d.exec(s)) !== null; ) {
          for (var r, o = {}, c = /[^\r\n]+[\r\n]+/g; (r = c.exec(n[1])) !== null; )
            this.parse_param(r.toString(), o);
          o.uid && !o.id && (o.id = o.uid), _.push(o);
        }
        return _;
      }
    }, parse_param: function(a, s) {
      var n = a.indexOf(":");
      if (n != -1) {
        var _ = a.substr(0, n).toLowerCase(), d = a.substr(n + 1).replace(/\\,/g, ",").replace(/[\r\n]+$/, "");
        _ == "summary" ? _ = "text" : _ == "dtstart" ? (_ = "start_date", d = this.parse_date(d, 0, 0)) : _ == "dtend" && (_ = "end_date", d = this.parse_date(d, 0, 0)), s[_] = d;
      }
    }, parse_date: function(a, s, n) {
      var _ = a.split("T"), d = !1;
      _[1] && (s = _[1].substr(0, 2), n = _[1].substr(2, 2), d = _[1][6] == "Z");
      var r = _[0].substr(0, 4), o = parseInt(_[0].substr(4, 2), 10) - 1, c = _[0].substr(6, 2);
      return t.config.server_utc || d ? new Date(Date.UTC(r, o, c, s, n)) : new Date(r, o, c, s, n);
    }, c_start: "BEGIN:VCALENDAR", e_start: "BEGIN:VEVENT", e_end: "END:VEVENT", c_end: "END:VCALENDAR" };
  }(e), e.on_load = function(t) {
    var a;
    this.callEvent("onBeforeParse", []);
    var s = !1, n = !1;
    for (var _ in this._parsers) {
      var d = this._parsers[_];
      if (d.canParse(t.xmlDoc.responseText, t.xmlDoc)) {
        try {
          var r = t.xmlDoc.responseText;
          _ === "xml" && (r = t), (a = d.parse(r)) || (s = !0);
        } catch {
          s = !0;
        }
        n = !0;
        break;
      }
    }
    if (!n)
      if (this._process && this[this._process])
        try {
          a = this[this._process].parse(t.xmlDoc.responseText);
        } catch {
          s = !0;
        }
      else
        s = !0;
    (s || t.xmlDoc.status && t.xmlDoc.status >= 400) && (this.callEvent("onLoadError", [t.xmlDoc]), a = []), this._process_loading(a), this.callEvent("onXLE", []), this.callEvent("onParse", []);
  }, e._process_loading = function(t) {
    this._loading = !0, this._not_render = !0;
    for (var a = 0; a < t.length; a++)
      this.callEvent("onEventLoading", [t[a]]) && this.addEvent(t[a]);
    this._not_render = !1, this._render_wait && this.render_view_data(), this._loading = !1, this._after_call && this._after_call(), this._after_call = null;
  }, e._init_event = function(t) {
    t.text = t.text || t._tagvalue || "", t.start_date = e._init_date(t.start_date), t.end_date = e._init_date(t.end_date);
  }, e._init_date = function(t) {
    return t ? typeof t == "string" ? e._helpers.parseDate(t) : new Date(t) : null;
  };
  const i = ea(e);
  e.serialize = function() {
    const t = [], a = i();
    for (var s in a) {
      const d = {};
      var n = a[s];
      for (var _ in n) {
        if (_.charAt(0) == "$" || _.charAt(0) == "_")
          continue;
        let r;
        const o = n[_];
        r = e.utils.isDate(o) ? e.defined(e.templates.xml_format) ? e.templates.xml_format(o) : e.templates.format_date(o) : o, d[_] = r;
      }
      t.push(d);
    }
    return t;
  }, e.parse = function(t, a) {
    this._process = a, this.on_load({ xmlDoc: { responseText: t } });
  }, e.load = function(t, a) {
    typeof a == "string" && (this._process = a, a = arguments[2]), this._load_url = t, this._after_call = a, this._load(t, this._date);
  }, e.setLoadMode = function(t) {
    t == "all" && (t = ""), this._load_mode = t;
  }, e.serverList = function(t, a) {
    return a ? (this.serverList[t] = a.slice(0), this.serverList[t]) : (this.serverList[t] = this.serverList[t] || [], this.serverList[t]);
  }, e._userdata = {}, e._xmlNodeToJSON = function(t) {
    for (var a = {}, s = 0; s < t.attributes.length; s++)
      a[t.attributes[s].name] = t.attributes[s].value;
    for (s = 0; s < t.childNodes.length; s++) {
      var n = t.childNodes[s];
      n.nodeType == 1 && (a[n.tagName] = n.firstChild ? n.firstChild.nodeValue : "");
    }
    return a.text || (a.text = t.firstChild ? t.firstChild.nodeValue : ""), a;
  }, e.attachEvent("onXLS", function() {
    var t;
    this.config.show_loading === !0 && ((t = this.config.show_loading = document.createElement("div")).className = "dhx_loading", t.style.left = Math.round((this._x - 128) / 2) + "px", t.style.top = Math.round((this._y - 15) / 2) + "px", this._obj.appendChild(t));
  }), e.attachEvent("onXLE", function() {
    var t = this.config.show_loading;
    t && typeof t == "object" && (t.parentNode && t.parentNode.removeChild(t), this.config.show_loading = !0);
  });
}
function $a(e) {
  function i() {
    const t = e.config.csp === !0, a = !!window.Sfdc || !!window.$A || window.Aura || "$shadowResolver$" in document.body;
    return t || a ? e.$root : document.body;
  }
  e._lightbox_controls = {}, e.formSection = function(t) {
    for (var a = this.config.lightbox.sections, s = 0; s < a.length && a[s].name != t; s++)
      ;
    if (s === a.length)
      return null;
    var n = a[s];
    e._lightbox || e.getLightbox();
    var _ = e._lightbox.querySelector(`#${n.id}`), d = _.nextSibling, r = { section: n, header: _, node: d, getValue: function(c) {
      return e.form_blocks[n.type].get_value(d, c || {}, n);
    }, setValue: function(c, h) {
      return e.form_blocks[n.type].set_value(d, c, h || {}, n);
    } }, o = e._lightbox_controls["get_" + n.type + "_control"];
    return o ? o(r) : r;
  }, e._lightbox_controls.get_template_control = function(t) {
    return t.control = t.node, t;
  }, e._lightbox_controls.get_select_control = function(t) {
    return t.control = t.node.getElementsByTagName("select")[0], t;
  }, e._lightbox_controls.get_textarea_control = function(t) {
    return t.control = t.node.getElementsByTagName("textarea")[0], t;
  }, e._lightbox_controls.get_time_control = function(t) {
    return t.control = t.node.getElementsByTagName("select"), t;
  }, e._lightbox_controls.defaults = { template: { height: 30 }, textarea: { height: 200 }, select: { height: 23 }, time: { height: 20 } }, e.form_blocks = { template: { render: function(t) {
    return `<div class='dhx_cal_ltext dhx_cal_template' ${t.height ? `style='height:${t.height}px;'` : ""}></div>`;
  }, set_value: function(t, a, s, n) {
    t.innerHTML = a || "";
  }, get_value: function(t, a, s) {
    return t.innerHTML || "";
  }, focus: function(t) {
  } }, textarea: { render: function(t) {
    return `<div class='dhx_cal_ltext' ${t.height ? `style='height:${t.height}px;'` : ""}><textarea ${t.placeholder ? `placeholder='${t.placeholder}'` : ""}></textarea></div>`;
  }, set_value: function(t, a, s) {
    e.form_blocks.textarea._get_input(t).value = a || "";
  }, get_value: function(t, a) {
    return e.form_blocks.textarea._get_input(t).value;
  }, focus: function(t) {
    var a = e.form_blocks.textarea._get_input(t);
    e._focus(a, !0);
  }, _get_input: function(t) {
    return t.getElementsByTagName("textarea")[0];
  } }, select: { render: function(t) {
    for (var a = `<div class='dhx_cal_ltext dhx_cal_select' ${t.height ? `style='height:${t.height}px;'` : ""}><select style='width:100%;'>`, s = 0; s < t.options.length; s++)
      a += "<option value='" + t.options[s].key + "'>" + t.options[s].label + "</option>";
    return a += "</select></div>";
  }, set_value: function(t, a, s, n) {
    var _ = t.firstChild;
    !_._dhx_onchange && n.onchange && (e.event(_, "change", n.onchange), _._dhx_onchange = !0), a === void 0 && (a = (_.options[0] || {}).value), _.value = a || "";
  }, get_value: function(t, a) {
    return t.firstChild.value;
  }, focus: function(t) {
    var a = t.firstChild;
    e._focus(a, !0);
  } }, time: { render: function(t) {
    t.time_format || (t.time_format = ["%H:%i", "%d", "%m", "%Y"]), t._time_format_order = {};
    var a = t.time_format, s = e.config, n = e.date.date_part(e._currentDate()), _ = 1440, d = 0;
    e.config.limit_time_select && (_ = 60 * s.last_hour + 1, d = 60 * s.first_hour, n.setHours(s.first_hour));
    for (var r = "", o = 0; o < a.length; o++) {
      var c = a[o];
      o > 0 && (r += " ");
      var h = "", y = "";
      switch (c) {
        case "%Y":
          var b, p, u;
          h = "dhx_lightbox_year_select", t._time_format_order[3] = o, t.year_range && (isNaN(t.year_range) ? t.year_range.push && (p = t.year_range[0], u = t.year_range[1]) : b = t.year_range), b = b || 10;
          var m = m || Math.floor(b / 2);
          p = p || n.getFullYear() - m, u = u || p + b;
          for (var l = p; l < u; l++)
            y += "<option value='" + l + "'>" + l + "</option>";
          break;
        case "%m":
          for (h = "dhx_lightbox_month_select", t._time_format_order[2] = o, l = 0; l < 12; l++)
            y += "<option value='" + l + "'>" + this.locale.date.month_full[l] + "</option>";
          break;
        case "%d":
          for (h = "dhx_lightbox_day_select", t._time_format_order[1] = o, l = 1; l < 32; l++)
            y += "<option value='" + l + "'>" + l + "</option>";
          break;
        case "%H:%i":
          h = "dhx_lightbox_time_select", t._time_format_order[0] = o, l = d;
          var f = n.getDate();
          for (t._time_values = []; l < _; )
            y += "<option value='" + l + "'>" + this.templates.time_picker(n) + "</option>", t._time_values.push(l), n.setTime(n.valueOf() + 60 * this.config.time_step * 1e3), l = 24 * (n.getDate() != f ? 1 : 0) * 60 + 60 * n.getHours() + n.getMinutes();
      }
      if (y) {
        var g = e._waiAria.lightboxSelectAttrString(c);
        r += "<select class='" + h + "' " + (t.readonly ? "disabled='disabled'" : "") + g + ">" + y + "</select> ";
      }
    }
    return `<div class='dhx_section_time' ${t.height ? `style='height:${t.height}px;'` : ""}>${r}<span style='font-weight:normal; font-size:10pt;' class='dhx_section_time_spacer'> &nbsp;&ndash;&nbsp; </span>${r}</div>`;
  }, set_value: function(t, a, s, n) {
    var _, d, r = e.config, o = t.getElementsByTagName("select"), c = n._time_format_order;
    if (r.full_day) {
      if (!t._full_day) {
        var h = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + e.locale.labels.full_day + "&nbsp;</label></input>";
        e.config.wide_form || (h = t.previousSibling.innerHTML + h), t.previousSibling.innerHTML = h, t._full_day = !0;
      }
      var y = t.previousSibling.getElementsByTagName("input")[0];
      y.checked = e.date.time_part(s.start_date) === 0 && e.date.time_part(s.end_date) === 0, o[c[0]].disabled = y.checked, o[c[0] + o.length / 2].disabled = y.checked, y.$_eventAttached || (y.$_eventAttached = !0, e.event(y, "click", function() {
        if (y.checked) {
          var m = {};
          e.form_blocks.time.get_value(t, m, n), _ = e.date.date_part(m.start_date), (+(d = e.date.date_part(m.end_date)) == +_ || +d >= +_ && (s.end_date.getHours() !== 0 || s.end_date.getMinutes() !== 0)) && (d = e.date.add(d, 1, "day"));
        } else
          _ = null, d = null;
        o[c[0]].disabled = y.checked, o[c[0] + o.length / 2].disabled = y.checked, u(o, 0, _ || s.start_date), u(o, 4, d || s.end_date);
      }));
    }
    if (r.auto_end_date && r.event_duration)
      for (var b = function() {
        r.auto_end_date && r.event_duration && (_ = new Date(o[c[3]].value, o[c[2]].value, o[c[1]].value, 0, o[c[0]].value), d = new Date(_.getTime() + 60 * e.config.event_duration * 1e3), u(o, 4, d));
      }, p = 0; p < 4; p++)
        o[p].$_eventAttached || (o[p].$_eventAttached = !0, e.event(o[p], "change", b));
    function u(m, l, f) {
      for (var g = n._time_values, x = 60 * f.getHours() + f.getMinutes(), w = x, E = !1, k = 0; k < g.length; k++) {
        var S = g[k];
        if (S === x) {
          E = !0;
          break;
        }
        S < x && (w = S);
      }
      m[l + c[0]].value = E ? x : w, E || w || (m[l + c[0]].selectedIndex = -1), m[l + c[1]].value = f.getDate(), m[l + c[2]].value = f.getMonth(), m[l + c[3]].value = f.getFullYear();
    }
    u(o, 0, s.start_date), u(o, 4, s.end_date);
  }, get_value: function(t, a, s) {
    var n = t.getElementsByTagName("select"), _ = s._time_format_order;
    if (a.start_date = new Date(n[_[3]].value, n[_[2]].value, n[_[1]].value, 0, n[_[0]].value), a.end_date = new Date(n[_[3] + 4].value, n[_[2] + 4].value, n[_[1] + 4].value, 0, n[_[0] + 4].value), !n[_[3]].value || !n[_[3] + 4].value) {
      var d = e.getEvent(e._lightbox_id);
      d && (a.start_date = d.start_date, a.end_date = d.end_date);
    }
    return a.end_date <= a.start_date && (a.end_date = e.date.add(a.start_date, e.config.time_step, "minute")), { start_date: new Date(a.start_date), end_date: new Date(a.end_date) };
  }, focus: function(t) {
    e._focus(t.getElementsByTagName("select")[0]);
  } } }, e._setLbPosition = function(t) {
    t && (t.style.top = Math.max(i().offsetHeight / 2 - t.offsetHeight / 2, 0) + "px", t.style.left = Math.max(i().offsetWidth / 2 - t.offsetWidth / 2, 0) + "px");
  }, e.showCover = function(t) {
    t && (t.style.display = "block", this._setLbPosition(t)), e.config.responsive_lightbox && (document.documentElement.classList.add("dhx_cal_overflow_container"), i().classList.add("dhx_cal_overflow_container")), this.show_cover(), this._cover.style.display = "";
  }, e.showLightbox = function(t) {
    if (t)
      if (this.callEvent("onBeforeLightbox", [t])) {
        this.showCover(a);
        var a = this.getLightbox();
        this._setLbPosition(a), this._fill_lightbox(t, a), this._waiAria.lightboxVisibleAttr(a), this.callEvent("onLightbox", [t]);
      } else
        this._new_event && (this._new_event = null, e.getEvent(t) && delete e.getEvent(t).$new);
  }, e._fill_lightbox = function(t, a) {
    var s = this.getEvent(t), n = a.getElementsByTagName("span"), _ = [];
    if (e.templates.lightbox_header) {
      _.push("");
      var d = e.templates.lightbox_header(s.start_date, s.end_date, s);
      _.push(d), n[1].innerHTML = "", n[2].innerHTML = d;
    } else {
      var r = this.templates.event_header(s.start_date, s.end_date, s), o = (this.templates.event_bar_text(s.start_date, s.end_date, s) || "").substr(0, 70);
      _.push(r), _.push(o), n[1].innerHTML = r, n[2].innerHTML = o;
    }
    this._waiAria.lightboxHeader(a, _.join(" "));
    for (var c = this.config.lightbox.sections, h = 0; h < c.length; h++) {
      var y = c[h], b = e._get_lightbox_section_node(y), p = this.form_blocks[y.type], u = s[y.map_to] !== void 0 ? s[y.map_to] : y.default_value;
      p.set_value.call(this, b, u, s, y), c[h].focus && p.focus.call(this, b);
    }
    e._lightbox_id = t;
  }, e._get_lightbox_section_node = function(t) {
    return e._lightbox.querySelector(`#${t.id}`).nextSibling;
  }, e._lightbox_out = function(t) {
    for (var a = this.config.lightbox.sections, s = 0; s < a.length; s++) {
      var n = e._lightbox.querySelector(`#${a[s].id}`);
      n = n && n.nextSibling;
      var _ = this.form_blocks[a[s].type].get_value.call(this, n, t, a[s]);
      a[s].map_to != "auto" && (t[a[s].map_to] = _);
    }
    return t;
  }, e._empty_lightbox = function(t) {
    var a = e._lightbox_id, s = this.getEvent(a);
    this._lame_copy(s, t), this.setEvent(s.id, s), this._edit_stop_event(s, !0), this.render_view_data();
  }, e.hide_lightbox = function(t) {
    e.endLightbox(!1, this.getLightbox());
  }, e.hideCover = function(t) {
    t && (t.style.display = "none"), this.hide_cover(), e.config.responsive_lightbox && (document.documentElement.classList.remove("dhx_cal_overflow_container"), i().classList.remove("dhx_cal_overflow_container"));
  }, e.hide_cover = function() {
    this._cover && this._cover.parentNode.removeChild(this._cover), this._cover = null;
  }, e.show_cover = function() {
    this._cover || (this._cover = document.createElement("div"), this._cover.className = "dhx_cal_cover", this._cover.style.display = "none", e.event(this._cover, "mousemove", e._move_while_dnd), e.event(this._cover, "mouseup", e._finish_dnd), i().appendChild(this._cover));
  }, e.save_lightbox = function() {
    var t = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
    this.checkEvent("onEventSave") && !this.callEvent("onEventSave", [this._lightbox_id, t, this._new_event]) || (this._empty_lightbox(t), this.hide_lightbox());
  }, e.startLightbox = function(t, a) {
    this._lightbox_id = t, this._custom_lightbox = !0, this._temp_lightbox = this._lightbox, this._lightbox = a, this.showCover(a);
  }, e.endLightbox = function(t, a) {
    a = a || e.getLightbox();
    var s = e.getEvent(this._lightbox_id);
    s && this._edit_stop_event(s, t), t && e.render_view_data(), this.hideCover(a), this._custom_lightbox && (this._lightbox = this._temp_lightbox, this._custom_lightbox = !1), this._temp_lightbox = this._lightbox_id = null, this._waiAria.lightboxHiddenAttr(a), this.resetLightbox(), this.callEvent("onAfterLightbox", []);
  }, e.resetLightbox = function() {
    e._lightbox && !e._custom_lightbox && e._lightbox.parentNode.removeChild(e._lightbox), e._lightbox = null;
  }, e.cancel_lightbox = function() {
    this._lightbox_id && this.callEvent("onEventCancel", [this._lightbox_id, !!this._new_event]), this.hide_lightbox();
  }, e.hideLightbox = e.cancel_lightbox, e._delete_event_confirm = function({ event: t, message: a, title: s, callback: n, ok: _ }) {
    e._dhtmlx_confirm({ message: a, title: s, callback: n, ok: _ });
  }, e._init_lightbox_events = function() {
    if (this.getLightbox().$_eventAttached)
      return;
    const t = this.getLightbox();
    t.$_eventAttached = !0, e.event(t, "click", function(a) {
      a.target.closest(".dhx_cal_ltitle_close_btn") && e.cancel_lightbox();
      const s = e.$domHelpers.closest(a.target, ".dhx_btn_set");
      if (!s) {
        const d = e.$domHelpers.closest(a.target, ".dhx_custom_button[data-section-index]");
        if (d) {
          const r = Number(d.getAttribute("data-section-index"));
          e.form_blocks[e.config.lightbox.sections[r].type].button_click(e.$domHelpers.closest(d, ".dhx_cal_lsection"), d, a);
        }
        return;
      }
      const n = s ? s.getAttribute("data-action") : null;
      switch (n) {
        case "dhx_save_btn":
        case "save":
          if (e.config.readonly_active)
            return;
          e.save_lightbox();
          break;
        case "dhx_delete_btn":
        case "delete":
          if (e.config.readonly_active)
            return;
          var _ = e.locale.labels.confirm_deleting;
          e._delete_event_confirm({ event: e.getEvent(e._lightbox_id), message: _, title: e.locale.labels.title_confirm_deleting, callback: function() {
            let d = e.getEvent(e._lightbox_id);
            d._thisAndFollowing ? (d._removeFollowing = !0, e.callEvent("onEventSave", [d.id, d, e._new_event])) : e.deleteEvent(e._lightbox_id), e._new_event = null, delete d.$new, e.hide_lightbox();
          }, config: { ok: e.locale.labels.icon_delete } });
          break;
        case "dhx_cancel_btn":
        case "cancel":
          e.cancel_lightbox();
          break;
        default:
          e.callEvent("onLightboxButton", [n, s, a]);
      }
    }), e.event(t, "keydown", function(a) {
      var s = a || window.event, n = a.target || a.srcElement, _ = n.querySelector("[dhx_button]");
      switch (_ || (_ = n.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")), (a || s).keyCode) {
        case 32:
          if ((a || s).shiftKey)
            return;
          _ && _.click && _.click();
          break;
        case e.keys.edit_save:
          if ((a || s).shiftKey)
            return;
          if (_ && _.click)
            _.click();
          else {
            if (e.config.readonly_active)
              return;
            e.save_lightbox();
          }
          break;
        case e.keys.edit_cancel:
          e.cancel_lightbox();
      }
    }), e.event(t, "click", function(a) {
      if (a.target.closest(".dhx_lightbox_day_select") || a.target.closest(".dhx_lightbox_month_select")) {
        const s = t.querySelectorAll(".dhx_lightbox_month_select"), n = t.querySelectorAll(".dhx_lightbox_day_select"), _ = t.querySelectorAll(".dhx_lightbox_year_select");
        s.length && n.length && _ && s.forEach((d, r) => {
          const o = n[r], c = parseInt(d.value, 10);
          let h = parseInt(_[r].value, 10);
          h || (h = new Date(e.getState().date).getFullYear());
          const y = function(u, m) {
            return new Date(u, m + 1, 0).getDate();
          }(h, c), b = y || 31;
          let p = o.value;
          o.innerHTML = "";
          for (let u = 1; u <= b; u++) {
            const m = document.createElement("option");
            m.value = u, m.textContent = u, o.appendChild(m);
          }
          o.value = Math.min(p, b);
        });
      }
    });
  }, e.setLightboxSize = function() {
  }, e._init_dnd_events = function() {
    e.event(i(), "mousemove", e._move_while_dnd), e.event(i(), "mouseup", e._finish_dnd), e._init_dnd_events = function() {
    };
  }, e._move_while_dnd = function(t) {
    if (e._dnd_start_lb) {
      document.dhx_unselectable || (i().classList.add("dhx_unselectable"), document.dhx_unselectable = !0);
      var a = e.getLightbox(), s = [t.pageX, t.pageY];
      a.style.top = e._lb_start[1] + s[1] - e._dnd_start_lb[1] + "px", a.style.left = e._lb_start[0] + s[0] - e._dnd_start_lb[0] + "px";
    }
  }, e._ready_to_dnd = function(t) {
    var a = e.getLightbox();
    e._lb_start = [a.offsetLeft, a.offsetTop], e._dnd_start_lb = [t.pageX, t.pageY];
  }, e._finish_dnd = function() {
    e._lb_start && (e._lb_start = e._dnd_start_lb = !1, i().classList.remove("dhx_unselectable"), document.dhx_unselectable = !1);
  }, e.getLightbox = function() {
    if (!this._lightbox) {
      var t = document.createElement("div");
      t.className = "dhx_cal_light", e.config.wide_form && (t.className += " dhx_cal_light_wide"), e.form_blocks.recurring && (t.className += " dhx_cal_light_rec"), e.config.rtl && (t.className += " dhx_cal_light_rtl"), e.config.responsive_lightbox && (t.className += " dhx_cal_light_responsive"), t.style.visibility = "hidden";
      var a = this._lightbox_template, s = this.config.buttons_right;
      a += "<div class='dhx_cal_lcontrols'>";
      for (var n = 0; n < s.length; n++)
        a += "<div " + this._waiAria.lightboxButtonAttrString(s[n]) + " data-action='" + s[n] + "' class='dhx_btn_set dhx_" + (e.config.rtl ? "right" : "left") + "_btn_set " + s[n] + "_set'><div class='dhx_btn_inner " + s[n] + "'></div><div>" + e.locale.labels[s[n]] + "</div></div>";
      s = this.config.buttons_left;
      var _ = e.config.rtl;
      for (n = 0; n < s.length; n++)
        a += "<div class='dhx_cal_lcontrols_push_right'></div>", a += "<div " + this._waiAria.lightboxButtonAttrString(s[n]) + " data-action='" + s[n] + "' class='dhx_btn_set dhx_" + (_ ? "left" : "right") + "_btn_set " + s[n] + "_set'><div class='dhx_btn_inner " + s[n] + "'></div><div>" + e.locale.labels[s[n]] + "</div></div>";
      a += "</div>", a += "</div>", t.innerHTML = a, e.config.drag_lightbox && (e.event(t.firstChild, "mousedown", e._ready_to_dnd), e.event(t.firstChild, "selectstart", function(b) {
        return b.preventDefault(), !1;
      }), t.firstChild.style.cursor = "move", e._init_dnd_events()), this._waiAria.lightboxAttr(t), this.show_cover(), this._cover.insertBefore(t, this._cover.firstChild), this._lightbox = t;
      var d = this.config.lightbox.sections;
      for (a = "", n = 0; n < d.length; n++) {
        var r = this.form_blocks[d[n].type];
        if (r) {
          d[n].id = "area_" + this.uid();
          var o = "";
          d[n].button && (o = "<div " + e._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_" + d[n].button]) + " class='dhx_custom_button' data-section-index='" + n + "' index='" + n + "'><div class='dhx_custom_button_" + d[n].button + "'></div><div>" + this.locale.labels["button_" + d[n].button] + "</div></div>"), this.config.wide_form && (a += "<div class='dhx_wrap_section'>");
          var c = this.locale.labels["section_" + d[n].name];
          typeof c != "string" && (c = d[n].name), a += "<div id='" + d[n].id + "' class='dhx_cal_lsection dhx_cal_lsection_" + d[n].name + "'>" + o + "<label>" + c + "</label></div>" + r.render.call(this, d[n]), a += "</div>";
        }
      }
      var h = t.getElementsByTagName("div");
      for (n = 0; n < h.length; n++) {
        var y = h[n];
        if (e._getClassName(y) == "dhx_cal_larea") {
          y.innerHTML = a;
          break;
        }
      }
      e._bindLightboxLabels(d), this.setLightboxSize(), this._init_lightbox_events(this), t.style.visibility = "visible";
    }
    return this._lightbox;
  }, e._bindLightboxLabels = function(t) {
    for (var a = 0; a < t.length; a++) {
      var s = t[a];
      if (s.id && e._lightbox.querySelector(`#${s.id}`)) {
        for (var n = e._lightbox.querySelector(`#${s.id}`).querySelector("label"), _ = e._get_lightbox_section_node(s); _ && !_.querySelector; )
          _ = _.nextSibling;
        var d = !0;
        if (_) {
          var r = _.querySelector("input, select, textarea");
          r && (s.inputId = r.id || "input_" + e.uid(), r.id || (r.id = s.inputId), n.setAttribute("for", s.inputId), d = !1);
        }
        d && e.form_blocks[s.type].focus && e.event(n, "click", function(o) {
          return function() {
            var c = e.form_blocks[o.type], h = e._get_lightbox_section_node(o);
            c && c.focus && c.focus.call(e, h);
          };
        }(s));
      }
    }
  }, e.attachEvent("onEventIdChange", function(t, a) {
    this._lightbox_id == t && (this._lightbox_id = a);
  }), e._lightbox_template = `<div class='dhx_cal_ltitle'><div class="dhx_cal_ltitle_descr"><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span>
</div>
<div class="dhx_cal_ltitle_controls">
<a class="dhx_cal_ltitle_close_btn scheduler_icon close"></a>
</div></div><div class='dhx_cal_larea'></div>`;
}
function Ha(e) {
  e._init_touch_events = function() {
    if ((this.config.touch && (navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("Touch") != -1) && !window.MSStream || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && (this.xy.scroll_width = 0, this._mobile = !0), this.config.touch) {
      var i = !0;
      try {
        document.createEvent("TouchEvent");
      } catch {
        i = !1;
      }
      i ? this._touch_events(["touchmove", "touchstart", "touchend"], function(t) {
        return t.touches && t.touches.length > 1 ? null : t.touches[0] ? { target: t.target, pageX: t.touches[0].pageX, pageY: t.touches[0].pageY, clientX: t.touches[0].clientX, clientY: t.touches[0].clientY } : t;
      }, function() {
        return !1;
      }) : window.PointerEvent || window.navigator.pointerEnabled ? this._touch_events(["pointermove", "pointerdown", "pointerup"], function(t) {
        return t.pointerType == "mouse" ? null : t;
      }, function(t) {
        return !t || t.pointerType == "mouse";
      }) : window.navigator.msPointerEnabled && this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function(t) {
        return t.pointerType == t.MSPOINTER_TYPE_MOUSE ? null : t;
      }, function(t) {
        return !t || t.pointerType == t.MSPOINTER_TYPE_MOUSE;
      });
    }
  }, e._touch_events = function(i, t, a) {
    var s, n, _, d, r, o, c = 0;
    function h(b, p, u) {
      e.event(b, p, function(m) {
        return !!e._is_lightbox_open() || (a(m) ? void 0 : u(m));
      }, { passive: !1 });
    }
    function y(b) {
      a(b) || (e._hide_global_tip(), d && (e._on_mouse_up(t(b)), e._temp_touch_block = !1), e._drag_id = null, e._drag_mode = null, e._drag_pos = null, e._pointerDragId = null, clearTimeout(_), d = o = !1, r = !0);
    }
    h(document.body, i[0], function(b) {
      if (!a(b)) {
        var p = t(b);
        if (p) {
          if (d)
            return function(u) {
              if (!a(u)) {
                var m = e.getState().drag_mode, l = !!e.matrix && e.matrix[e._mode], f = e.render_view_data;
                m == "create" && l && (e.render_view_data = function() {
                  for (var g = e.getState().drag_id, x = e.getEvent(g), w = l.y_property, E = e.getEvents(x.start_date, x.end_date), k = 0; k < E.length; k++)
                    E[k][w] != x[w] && (E.splice(k, 1), k--);
                  x._sorder = E.length - 1, x._count = E.length, this.render_data([x], e.getState().mode);
                }), e._on_mouse_move(u), m == "create" && l && (e.render_view_data = f), u.preventDefault && u.preventDefault(), u.cancelBubble = !0;
              }
            }(p), b.preventDefault && b.preventDefault(), b.cancelBubble = !0, e._update_global_tip(), !1;
          n = t(b), o && (n ? (s.target != n.target || Math.abs(s.pageX - n.pageX) > 5 || Math.abs(s.pageY - n.pageY) > 5) && (r = !0, clearTimeout(_)) : r = !0);
        }
      }
    }), h(this._els.dhx_cal_data[0], "touchcancel", y), h(this._els.dhx_cal_data[0], "contextmenu", function(b) {
      if (!a(b))
        return o ? (b && b.preventDefault && b.preventDefault(), b.cancelBubble = !0, !1) : void 0;
    }), h(this._obj, i[1], function(b) {
      var p;
      if (document && document.body && document.body.classList.add("dhx_cal_touch_active"), !a(b))
        if (e._pointerDragId = b.pointerId, d = r = !1, o = !0, p = n = t(b)) {
          var u = /* @__PURE__ */ new Date();
          if (!r && !d && u - c < 250)
            return e._click.dhx_cal_data(p), window.setTimeout(function() {
              e.$destroyed || e._on_dbl_click(p);
            }, 50), b.preventDefault && b.preventDefault(), b.cancelBubble = !0, e._block_next_stop = !0, !1;
          if (c = u, !r && !d && e.config.touch_drag) {
            var m = e._locate_event(document.activeElement), l = e._locate_event(p.target), f = s ? e._locate_event(s.target) : null;
            if (m && l && m == l && m != f)
              return b.preventDefault && b.preventDefault(), b.cancelBubble = !0, e._ignore_next_click = !1, e._click.dhx_cal_data(p), s = p, !1;
            _ = setTimeout(function() {
              if (!e.$destroyed) {
                d = !0;
                var g = s.target, x = e._getClassName(g);
                g && x.indexOf("dhx_body") != -1 && (g = g.previousSibling), e._on_mouse_down(s, g), e._drag_mode && e._drag_mode != "create" && e.for_rendered(e._drag_id, function(w, E) {
                  w.style.display = "none", e._rendered.splice(E, 1);
                }), e.config.touch_tip && e._show_global_tip(), e.updateEvent(e._drag_id);
              }
            }, e.config.touch_drag), s = p;
          }
        } else
          r = !0;
    }), h(this._els.dhx_cal_data[0], i[2], function(b) {
      if (document && document.body && document.body.classList.remove("dhx_cal_touch_active"), !a(b))
        return e.config.touch_swipe_dates && !d && function(p, u, m, l) {
          if (!p || !u)
            return !1;
          for (var f = p.target; f && f != e._obj; )
            f = f.parentNode;
          if (f != e._obj || e.matrix && e.matrix[e.getState().mode] && e.matrix[e.getState().mode].scrollable)
            return !1;
          var g = Math.abs(p.pageY - u.pageY), x = Math.abs(p.pageX - u.pageX);
          return g < l && x > m && (!g || x / g > 3) && (p.pageX > u.pageX ? e._click.dhx_cal_next_button() : e._click.dhx_cal_prev_button(), !0);
        }(s, n, 200, 100) && (e._block_next_stop = !0), d && (e._ignore_next_click = !0, setTimeout(function() {
          e._ignore_next_click = !1;
        }, 100)), y(b), e._block_next_stop ? (e._block_next_stop = !1, b.preventDefault && b.preventDefault(), b.cancelBubble = !0, !1) : void 0;
    }), e.event(document.body, i[2], y);
  }, e._show_global_tip = function() {
    e._hide_global_tip();
    var i = e._global_tip = document.createElement("div");
    i.className = "dhx_global_tip", e._update_global_tip(1), document.body.appendChild(i);
  }, e._update_global_tip = function(i) {
    var t = e._global_tip;
    if (t) {
      var a = "";
      if (e._drag_id && !i) {
        var s = e.getEvent(e._drag_id);
        s && (a = "<div>" + (s._timed ? e.templates.event_header(s.start_date, s.end_date, s) : e.templates.day_date(s.start_date, s.end_date, s)) + "</div>");
      }
      e._drag_mode == "create" || e._drag_mode == "new-size" ? t.innerHTML = (e.locale.labels.drag_to_create || "Drag to create") + a : t.innerHTML = (e.locale.labels.drag_to_move || "Drag to move") + a;
    }
  }, e._hide_global_tip = function() {
    var i = e._global_tip;
    i && i.parentNode && (i.parentNode.removeChild(i), e._global_tip = 0);
  };
}
function za(e) {
  var i, t;
  function a() {
    if (e._is_material_skin())
      return !0;
    if (t !== void 0)
      return t;
    var d = document.createElement("div");
    d.style.position = "absolute", d.style.left = "-9999px", d.style.top = "-9999px", d.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_data'><div class='dhx_cal_event'><div class='dhx_body'></div></div><div>", document.body.appendChild(d);
    var r = window.getComputedStyle(d.querySelector(".dhx_body")).getPropertyValue("box-sizing");
    document.body.removeChild(d), (t = r === "border-box") || setTimeout(function() {
      t = void 0;
    }, 1e3);
  }
  function s() {
    if (!e._is_material_skin() && !e._border_box_events()) {
      var d = t;
      t = void 0, i = void 0, d !== a() && e.$container && e.getState().mode && e.setCurrentView();
    }
  }
  function n(d) {
    var r = d.getMinutes();
    return r = r < 10 ? "0" + r : r, "<span class='dhx_scale_h'>" + d.getHours() + "</span><span class='dhx_scale_m'>&nbsp;" + r + "</span>";
  }
  e._addThemeClass = function() {
    document.documentElement.setAttribute("data-scheduler-theme", e.skin);
  }, e._skin_settings = { fix_tab_position: [1, 0], use_select_menu_space: [1, 0], wide_form: [1, 0], hour_size_px: [44, 42], displayed_event_color: ["#ff4a4a", "ffc5ab"], displayed_event_text_color: ["#ffef80", "7e2727"] }, e._skin_xy = { lightbox_additional_height: [90, 50], nav_height: [59, 22], bar_height: [24, 20] }, e._is_material_skin = function() {
    return e.skin ? (e.skin + "").indexOf("material") > -1 : function() {
      if (i === void 0) {
        var d = document.createElement("div");
        d.style.position = "absolute", d.style.left = "-9999px", d.style.top = "-9999px", d.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_scale_placeholder'></div><div>", document.body.appendChild(d);
        var r = window.getComputedStyle(d.querySelector(".dhx_cal_scale_placeholder")).getPropertyValue("position");
        i = r === "absolute", setTimeout(function() {
          i = null, d && d.parentNode && d.parentNode.removeChild(d);
        }, 500);
      }
      return i;
    }();
  }, e._build_skin_info = function() {
    (function() {
      const b = e.$container;
      clearInterval(_), b && (_ = setInterval(() => {
        const p = getComputedStyle(b).getPropertyValue("--dhx-scheduler-theme");
        p && p !== e.skin && e.setSkin(p);
      }, 100));
    })();
    const d = getComputedStyle(this.$container), r = d.getPropertyValue("--dhx-scheduler-theme");
    let o, c = !!r, h = {}, y = !1;
    if (c) {
      o = r;
      for (let b in e.xy)
        h[b] = d.getPropertyValue(`--dhx-scheduler-xy-${b}`);
      h.hour_size_px = d.getPropertyValue("--dhx-scheduler-config-hour_size_px"), h.wide_form = d.getPropertyValue("--dhx-scheduler-config-form_wide");
    } else
      o = function() {
        for (var b = document.getElementsByTagName("link"), p = 0; p < b.length; p++) {
          var u = b[p].href.match("dhtmlxscheduler_([a-z]+).css");
          if (u)
            return u[1];
        }
      }(), y = e._is_material_skin();
    if (e._theme_info = { theme: o, cssVarTheme: c, oldMaterialTheme: y, values: h }, e._theme_info.cssVarTheme) {
      const b = this._theme_info.values;
      for (let p in e.xy)
        isNaN(parseInt(b[p])) || (e.xy[p] = parseInt(b[p]));
    }
  }, e.event(window, "DOMContentLoaded", s), e.event(window, "load", s), e._border_box_events = function() {
    return a();
  }, e._configure = function(d, r, o) {
    for (var c in r)
      d[c] === void 0 && (d[c] = r[c][o]);
  }, e.setSkin = function(d) {
    this.skin = d, e._addThemeClass(), e.$container && (this._skin_init(), this.render());
  };
  let _ = null;
  e.attachEvent("onDestroy", function() {
    clearInterval(_);
  }), e._skin_init = function() {
    this._build_skin_info(), this.skin || (this.skin = this._theme_info.theme), e._addThemeClass(), e.skin === "flat" ? e.templates.hour_scale = n : e.templates.hour_scale === n && (e.templates.hour_scale = e.date.date_to_str(e.config.hour_date)), e.attachEvent("onTemplatesReady", function() {
      var d = e.date.date_to_str("%d");
      e.templates._old_month_day || (e.templates._old_month_day = e.templates.month_day);
      var r = e.templates._old_month_day;
      e.templates.month_day = function(o) {
        if (this._mode == "month") {
          var c = d(o);
          return o.getDate() == 1 && (c = e.locale.date.month_full[o.getMonth()] + " " + c), +o == +e.date.date_part(this._currentDate()) && (c = e.locale.labels.dhx_cal_today_button + " " + c), c;
        }
        return r.call(this, o);
      }, e.config.fix_tab_position && (e._els.dhx_cal_navline[0].querySelectorAll("[data-tab]").forEach((o) => {
        switch (o.getAttribute("data-tab") || o.getAttribute("name")) {
          case "day":
          case "day_tab":
            o.classList.add("dhx_cal_tab_first"), o.classList.add("dhx_cal_tab_segmented");
            break;
          case "week":
          case "week_tab":
            o.classList.add("dhx_cal_tab_segmented");
            break;
          case "month":
          case "month_tab":
            o.classList.add("dhx_cal_tab_last"), o.classList.add("dhx_cal_tab_segmented");
            break;
          default:
            o.classList.add("dhx_cal_tab_standalone");
        }
      }), function(o) {
        if (e.config.header)
          return;
        const c = Array.from(o.querySelectorAll(".dhx_cal_tab")), h = ["day", "week", "month"].map((b) => c.find((p) => p.getAttribute("data-tab") === b)).filter((b) => b !== void 0);
        let y = c.length > 0 ? c[0] : null;
        h.reverse().forEach((b) => {
          o.insertBefore(b, y), y = b;
        });
      }(e._els.dhx_cal_navline[0]));
    }, { once: !0 });
  };
}
function qa(e, i) {
  this.$scheduler = e, this.$dp = i, this._dataProcessorHandlers = [], this.attach = function() {
    var t = this.$dp, a = this.$scheduler;
    this._dataProcessorHandlers.push(a.attachEvent("onEventAdded", function(s) {
      !this._loading && this._validId(s) && t.setUpdated(s, !0, "inserted");
    })), this._dataProcessorHandlers.push(a.attachEvent("onConfirmedBeforeEventDelete", function(s) {
      if (this._validId(s)) {
        var n = t.getState(s);
        return n == "inserted" || this._new_event ? (t.setUpdated(s, !1), !0) : n != "deleted" && (n == "true_deleted" || (t.setUpdated(s, !0, "deleted"), !1));
      }
    })), this._dataProcessorHandlers.push(a.attachEvent("onEventChanged", function(s) {
      !this._loading && this._validId(s) && t.setUpdated(s, !0, "updated");
    })), this._dataProcessorHandlers.push(a.attachEvent("onClearAll", function() {
      t._in_progress = {}, t._invalid = {}, t.updatedRows = [], t._waitMode = 0;
    })), t.attachEvent("insertCallback", a._update_callback), t.attachEvent("updateCallback", a._update_callback), t.attachEvent("deleteCallback", function(s, n) {
      a.getEvent(n) ? (a.setUserData(n, this.action_param, "true_deleted"), a.deleteEvent(n)) : a._add_rec_marker && a._update_callback(s, n);
    });
  }, this.detach = function() {
    for (var t in this._dataProcessorHandlers) {
      var a = this._dataProcessorHandlers[t];
      this.$scheduler.detachEvent(a);
    }
    this._dataProcessorHandlers = [];
  };
}
function ct(e) {
  return this.serverProcessor = e, this.action_param = "!nativeeditor_status", this.object = null, this.updatedRows = [], this.autoUpdate = !0, this.updateMode = "cell", this._tMode = "GET", this._headers = null, this._payload = null, this.post_delim = "_", this._waitMode = 0, this._in_progress = {}, this._invalid = {}, this.messages = [], this.styles = { updated: "font-weight:bold;", inserted: "font-weight:bold;", deleted: "text-decoration : line-through;", invalid: "background-color:FFE0E0;", invalid_cell: "border-bottom:2px solid red;", error: "color:red;", clear: "font-weight:normal;text-decoration:none;" }, this.enableUTFencoding(!0), nt(this), this;
}
function Pa(e) {
  var i = "data-dhxbox", t = null;
  function a(l, f, g) {
    var x = l.callback;
    x && x(f, g), p.hide(l.box), t = l.box = null;
  }
  function s(l) {
    if (t) {
      var f = l.which || l.keyCode, g = !1;
      if (u.keyboard) {
        if (f == 13 || f == 32) {
          var x = l.target || l.srcElement;
          Ce.getClassName(x).indexOf("scheduler_popup_button") > -1 && x.click ? x.click() : (a(t, !0), g = !0);
        }
        f == 27 && (a(t, !1), g = !0);
      }
      return g ? (l.preventDefault && l.preventDefault(), !(l.cancelBubble = !0)) : void 0;
    }
  }
  function n(l) {
    n.cover || (n.cover = document.createElement("div"), e.event(n.cover, "keydown", s), n.cover.className = "dhx_modal_cover", document.body.appendChild(n.cover)), n.cover.style.display = l ? "inline-block" : "none";
  }
  function _(l, f, g) {
    var x = e._waiAria.messageButtonAttrString(l), w = (f || "").toLowerCase().replace(/ /g, "_");
    return `<div ${x} class='scheduler_popup_button dhtmlx_popup_button ${`scheduler_${w}_button dhtmlx_${w}_button`}' data-result='${g}' result='${g}' ><div>${l}</div></div>`;
  }
  function d() {
    for (var l = [].slice.apply(arguments, [0]), f = 0; f < l.length; f++)
      if (l[f])
        return l[f];
  }
  function r(l, f, g) {
    var x = l.tagName ? l : function(k, S, v) {
      var D = document.createElement("div"), M = ve.uid();
      e._waiAria.messageModalAttr(D, M), D.className = " scheduler_modal_box dhtmlx_modal_box scheduler-" + k.type + " dhtmlx-" + k.type, D.setAttribute(i, 1);
      var N = "";
      if (k.width && (D.style.width = k.width), k.height && (D.style.height = k.height), k.title && (N += '<div class="scheduler_popup_title dhtmlx_popup_title">' + k.title + "</div>"), N += '<div class="scheduler_popup_text dhtmlx_popup_text" id="' + M + '"><span>' + (k.content ? "" : k.text) + '</span></div><div  class="scheduler_popup_controls dhtmlx_popup_controls">', S && (N += _(d(k.ok, e.locale.labels.message_ok, "OK"), "ok", !0)), v && (N += _(d(k.cancel, e.locale.labels.message_cancel, "Cancel"), "cancel", !1)), k.buttons)
        for (var T = 0; T < k.buttons.length; T++) {
          var A = k.buttons[T];
          N += typeof A == "object" ? _(A.label, A.css || "scheduler_" + A.label.toLowerCase() + "_button dhtmlx_" + A.label.toLowerCase() + "_button", A.value || T) : _(A, A, T);
        }
      if (N += "</div>", D.innerHTML = N, k.content) {
        var C = k.content;
        typeof C == "string" && (C = document.getElementById(C)), C.style.display == "none" && (C.style.display = ""), D.childNodes[k.title ? 1 : 0].appendChild(C);
      }
      return e.event(D, "click", function(O) {
        var H = O.target || O.srcElement;
        if (H.className || (H = H.parentNode), Ce.closest(H, ".scheduler_popup_button")) {
          var z = H.getAttribute("data-result");
          a(k, z = z == "true" || z != "false" && z, O);
        }
      }), k.box = D, (S || v) && (t = k), D;
    }(l, f, g);
    l.hidden || n(!0), document.body.appendChild(x);
    var w = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - x.offsetWidth) / 2)), E = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - x.offsetHeight) / 2));
    return l.position == "top" ? x.style.top = "-3px" : x.style.top = E + "px", x.style.left = w + "px", e.event(x, "keydown", s), p.focus(x), l.hidden && p.hide(x), e.callEvent("onMessagePopup", [x]), x;
  }
  function o(l) {
    return r(l, !0, !1);
  }
  function c(l) {
    return r(l, !0, !0);
  }
  function h(l) {
    return r(l);
  }
  function y(l, f, g) {
    return typeof l != "object" && (typeof f == "function" && (g = f, f = ""), l = { text: l, type: f, callback: g }), l;
  }
  function b(l, f, g, x, w) {
    return typeof l != "object" && (l = { text: l, type: f, expire: g, id: x, callback: w }), l.id = l.id || ve.uid(), l.expire = l.expire || u.expire, l;
  }
  e.event(document, "keydown", s, !0);
  var p = function() {
    var l = y.apply(this, arguments);
    return l.type = l.type || "alert", h(l);
  };
  p.hide = function(l) {
    for (; l && l.getAttribute && !l.getAttribute(i); )
      l = l.parentNode;
    l && (l.parentNode.removeChild(l), n(!1), e.callEvent("onAfterMessagePopup", [l]));
  }, p.focus = function(l) {
    setTimeout(function() {
      var f = Ce.getFocusableNodes(l);
      f.length && f[0].focus && f[0].focus();
    }, 1);
  };
  var u = function(l, f, g, x) {
    switch ((l = b.apply(this, arguments)).type = l.type || "info", l.type.split("-")[0]) {
      case "alert":
        return o(l);
      case "confirm":
        return c(l);
      case "modalbox":
        return h(l);
      default:
        return function(w) {
          u.area || (u.area = document.createElement("div"), u.area.className = "scheduler_message_area dhtmlx_message_area", u.area.style[u.position] = "5px", document.body.appendChild(u.area)), u.hide(w.id);
          var E = document.createElement("div");
          return E.innerHTML = "<div>" + w.text + "</div>", E.className = "scheduler-info dhtmlx-info scheduler-" + w.type + " dhtmlx-" + w.type, e.event(E, "click", function(k) {
            w.callback && w.callback.call(this, k), u.hide(w.id), w = null;
          }), e._waiAria.messageInfoAttr(E), u.position == "bottom" && u.area.firstChild ? u.area.insertBefore(E, u.area.firstChild) : u.area.appendChild(E), w.expire > 0 && (u.timers[w.id] = window.setTimeout(function() {
            u && u.hide(w.id);
          }, w.expire)), u.pull[w.id] = E, E = null, w.id;
        }(l);
    }
  };
  u.seed = (/* @__PURE__ */ new Date()).valueOf(), u.uid = ve.uid, u.expire = 4e3, u.keyboard = !0, u.position = "top", u.pull = {}, u.timers = {}, u.hideAll = function() {
    for (var l in u.pull)
      u.hide(l);
  }, u.hide = function(l) {
    var f = u.pull[l];
    f && f.parentNode && (window.setTimeout(function() {
      f.parentNode.removeChild(f), f = null;
    }, 2e3), f.className += " hidden", u.timers[l] && window.clearTimeout(u.timers[l]), delete u.pull[l]);
  };
  var m = [];
  return e.attachEvent("onMessagePopup", function(l) {
    m.push(l);
  }), e.attachEvent("onAfterMessagePopup", function(l) {
    for (var f = 0; f < m.length; f++)
      m[f] === l && (m.splice(f, 1), f--);
  }), e.attachEvent("onDestroy", function() {
    n.cover && n.cover.parentNode && n.cover.parentNode.removeChild(n.cover);
    for (var l = 0; l < m.length; l++)
      m[l].parentNode && m[l].parentNode.removeChild(m[l]);
    m = null, u.area && u.area.parentNode && u.area.parentNode.removeChild(u.area), u = null;
  }), { alert: function() {
    var l = y.apply(this, arguments);
    return l.type = l.type || "confirm", o(l);
  }, confirm: function() {
    var l = y.apply(this, arguments);
    return l.type = l.type || "alert", c(l);
  }, message: u, modalbox: p };
}
ct.prototype = { setTransactionMode: function(e, i) {
  typeof e == "object" ? (this._tMode = e.mode || this._tMode, e.headers !== void 0 && (this._headers = e.headers), e.payload !== void 0 && (this._payload = e.payload), this._tSend = !!i) : (this._tMode = e, this._tSend = i), this._tMode == "REST" && (this._tSend = !1, this._endnm = !0), this._tMode === "JSON" || this._tMode === "REST-JSON" ? (this._tSend = !1, this._endnm = !0, this._serializeAsJson = !0, this._headers = this._headers || {}, this._headers["Content-Type"] = "application/json") : this._headers && !this._headers["Content-Type"] && (this._headers["Content-Type"] = "application/x-www-form-urlencoded"), this._tMode === "CUSTOM" && (this._tSend = !1, this._endnm = !0, this._router = e.router);
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
}, setUpdateMode: function(e, i) {
  this.autoUpdate = e == "cell", this.updateMode = e, this.dnd = i;
}, ignore: function(e, i) {
  this._silent_mode = !0, e.call(i || window), this._silent_mode = !1;
}, setUpdated: function(e, i, t) {
  if (!this._silent_mode) {
    var a = this.findRow(e);
    t = t || "updated";
    var s = this.$scheduler.getUserData(e, this.action_param);
    s && t == "updated" && (t = s), i ? (this.set_invalid(e, !1), this.updatedRows[a] = e, this.$scheduler.setUserData(e, this.action_param, t), this._in_progress[e] && (this._in_progress[e] = "wait")) : this.is_invalid(e) || (this.updatedRows.splice(a, 1), this.$scheduler.setUserData(e, this.action_param, "")), this.markRow(e, i, t), i && this.autoUpdate && this.sendData(e);
  }
}, markRow: function(e, i, t) {
  var a = "", s = this.is_invalid(e);
  if (s && (a = this.styles[s], i = !0), this.callEvent("onRowMark", [e, i, t, s]) && (a = this.styles[i ? t : "clear"] + a, this.$scheduler[this._methods[0]](e, a), s && s.details)) {
    a += this.styles[s + "_cell"];
    for (var n = 0; n < s.details.length; n++)
      s.details[n] && this.$scheduler[this._methods[1]](e, n, a);
  }
}, getActionByState: function(e) {
  return e === "inserted" ? "create" : e === "updated" ? "update" : e === "deleted" ? "delete" : "update";
}, getState: function(e) {
  return this.$scheduler.getUserData(e, this.action_param);
}, is_invalid: function(e) {
  return this._invalid[e];
}, set_invalid: function(e, i, t) {
  t && (i = { value: i, details: t, toString: function() {
    return this.value.toString();
  } }), this._invalid[e] = i;
}, checkBeforeUpdate: function(e) {
  return !0;
}, sendData: function(e) {
  return this.$scheduler.editStop && this.$scheduler.editStop(), e === void 0 || this._tSend ? this.sendAllData() : !this._in_progress[e] && (this.messages = [], !(!this.checkBeforeUpdate(e) && this.callEvent("onValidationError", [e, this.messages])) && void this._beforeSendData(this._getRowData(e), e));
}, _beforeSendData: function(e, i) {
  if (!this.callEvent("onBeforeUpdate", [i, this.getState(i), e]))
    return !1;
  this._sendData(e, i);
}, serialize: function(e, i) {
  if (this._serializeAsJson)
    return this._serializeAsJSON(e);
  if (typeof e == "string")
    return e;
  if (i !== void 0)
    return this.serialize_one(e, "");
  var t = [], a = [];
  for (var s in e)
    e.hasOwnProperty(s) && (t.push(this.serialize_one(e[s], s + this.post_delim)), a.push(s));
  return t.push("ids=" + this.escape(a.join(","))), this.$scheduler.security_key && t.push("dhx_security=" + this.$scheduler.security_key), t.join("&");
}, serialize_one: function(e, i) {
  if (typeof e == "string")
    return e;
  var t = [], a = "";
  for (var s in e)
    if (e.hasOwnProperty(s)) {
      if ((s == "id" || s == this.action_param) && this._tMode == "REST")
        continue;
      a = typeof e[s] == "string" || typeof e[s] == "number" ? e[s] : JSON.stringify(e[s]), t.push(this.escape((i || "") + s) + "=" + this.escape(a));
    }
  return t.join("&");
}, _applyPayload: function(e) {
  var i = this.$scheduler.ajax;
  if (this._payload)
    for (var t in this._payload)
      e = e + i.urlSeparator(e) + this.escape(t) + "=" + this.escape(this._payload[t]);
  return e;
}, _sendData: function(e, i) {
  if (e) {
    if (!this.callEvent("onBeforeDataSending", i ? [i, this.getState(i), e] : [null, null, e]))
      return !1;
    i && (this._in_progress[i] = (/* @__PURE__ */ new Date()).valueOf());
    var t = this, a = this.$scheduler.ajax;
    if (this._tMode !== "CUSTOM") {
      var s, n = { callback: function(p) {
        var u = [];
        if (i)
          u.push(i);
        else if (e)
          for (var m in e)
            u.push(m);
        return t.afterUpdate(t, p, u);
      }, headers: t._headers }, _ = this.serverProcessor + (this._user ? a.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.$scheduler.getUserData(0, "version")].join("&") : ""), d = this._applyPayload(_);
      switch (this._tMode) {
        case "GET":
          s = this._cleanupArgumentsBeforeSend(e), n.url = d + a.urlSeparator(d) + this.serialize(s, i), n.method = "GET";
          break;
        case "POST":
          s = this._cleanupArgumentsBeforeSend(e), n.url = d, n.method = "POST", n.data = this.serialize(s, i);
          break;
        case "JSON":
          s = {};
          var r = this._cleanupItemBeforeSend(e);
          for (var o in r)
            o !== this.action_param && o !== "id" && o !== "gr_id" && (s[o] = r[o]);
          n.url = d, n.method = "POST", n.data = JSON.stringify({ id: i, action: e[this.action_param], data: s });
          break;
        case "REST":
        case "REST-JSON":
          switch (d = _.replace(/(&|\?)editing=true/, ""), s = "", this.getState(i)) {
            case "inserted":
              n.method = "POST", n.data = this.serialize(e, i);
              break;
            case "deleted":
              n.method = "DELETE", d = d + (d.slice(-1) === "/" ? "" : "/") + i;
              break;
            default:
              n.method = "PUT", n.data = this.serialize(e, i), d = d + (d.slice(-1) === "/" ? "" : "/") + i;
          }
          n.url = this._applyPayload(d);
      }
      return this._waitMode++, a.query(n);
    }
    {
      var c = this.getState(i), h = this.getActionByState(c);
      delete e[this.action_param];
      var y = function(u) {
        var m = c;
        if (u && u.responseText && u.setRequestHeader) {
          u.status !== 200 && (m = "error");
          try {
            u = JSON.parse(u.responseText);
          } catch {
          }
        }
        m = m || "updated";
        var l = i, f = i;
        u && (m = u.action || m, l = u.sid || l, f = u.id || u.tid || f), t.afterUpdateCallback(l, f, m, u);
      };
      const p = "event";
      var b;
      if (this._router instanceof Function)
        b = this._router(p, h, e, i);
      else
        switch (c) {
          case "inserted":
            b = this._router[p].create(e);
            break;
          case "deleted":
            b = this._router[p].delete(i);
            break;
          default:
            b = this._router[p].update(e, i);
        }
      if (b) {
        if (!b.then && b.id === void 0 && b.tid === void 0 && b.action === void 0)
          throw new Error("Incorrect router return value. A Promise or a response object is expected");
        b.then ? b.then(y).catch(function(u) {
          u && u.action ? y(u) : y({ action: "error", value: u });
        }) : y(b);
      } else
        y(null);
    }
  }
}, sendAllData: function() {
  if (this.updatedRows.length && this.updateMode !== "off") {
    this.messages = [];
    var e = !0;
    if (this._forEachUpdatedRow(function(i) {
      e = e && this.checkBeforeUpdate(i);
    }), !e && !this.callEvent("onValidationError", ["", this.messages]))
      return !1;
    this._tSend ? this._sendData(this._getAllData()) : this._forEachUpdatedRow(function(i) {
      if (!this._in_progress[i]) {
        if (this.is_invalid(i))
          return;
        this._beforeSendData(this._getRowData(i), i);
      }
    });
  }
}, _getAllData: function(e) {
  var i = {}, t = !1;
  return this._forEachUpdatedRow(function(a) {
    if (!this._in_progress[a] && !this.is_invalid(a)) {
      var s = this._getRowData(a);
      this.callEvent("onBeforeUpdate", [a, this.getState(a), s]) && (i[a] = s, t = !0, this._in_progress[a] = (/* @__PURE__ */ new Date()).valueOf());
    }
  }), t ? i : null;
}, findRow: function(e) {
  var i = 0;
  for (i = 0; i < this.updatedRows.length && e != this.updatedRows[i]; i++)
    ;
  return i;
}, defineAction: function(e, i) {
  this._uActions || (this._uActions = {}), this._uActions[e] = i;
}, afterUpdateCallback: function(e, i, t, a) {
  if (this.$scheduler) {
    var s = e, n = t !== "error" && t !== "invalid";
    if (n || this.set_invalid(e, t), this._uActions && this._uActions[t] && !this._uActions[t](a))
      return delete this._in_progress[s];
    this._in_progress[s] !== "wait" && this.setUpdated(e, !1);
    var _ = e;
    switch (t) {
      case "inserted":
      case "insert":
        i != e && (this.setUpdated(e, !1), this.$scheduler[this._methods[2]](e, i), e = i);
        break;
      case "delete":
      case "deleted":
        return this.$scheduler.setUserData(e, this.action_param, "true_deleted"), this.$scheduler[this._methods[3]](e, i), delete this._in_progress[s], this.callEvent("onAfterUpdate", [e, t, i, a]);
    }
    this._in_progress[s] !== "wait" ? (n && this.$scheduler.setUserData(e, this.action_param, ""), delete this._in_progress[s]) : (delete this._in_progress[s], this.setUpdated(i, !0, this.$scheduler.getUserData(e, this.action_param))), this.callEvent("onAfterUpdate", [_, t, i, a]);
  }
}, _errorResponse: function(e, i) {
  return this.$scheduler && this.$scheduler.callEvent && this.$scheduler.callEvent("onSaveError", [i, e.xmlDoc]), this.cleanUpdate(i);
}, _setDefaultTransactionMode: function() {
  this.serverProcessor && (this.setTransactionMode("POST", !0), this.serverProcessor += (this.serverProcessor.indexOf("?") !== -1 ? "&" : "?") + "editing=true", this._serverProcessor = this.serverProcessor);
}, afterUpdate: function(e, i, t) {
  var a = this.$scheduler.ajax;
  if (i.xmlDoc.status === 200) {
    var s;
    try {
      s = JSON.parse(i.xmlDoc.responseText);
    } catch {
      i.xmlDoc.responseText.length || (s = {});
    }
    if (s) {
      var n = s.action || this.getState(t) || "updated", _ = s.sid || t[0], d = s.tid || t[0];
      return e.afterUpdateCallback(_, d, n, s), void e.finalizeUpdate();
    }
    var r = a.xmltop("data", i.xmlDoc);
    if (!r)
      return this._errorResponse(i, t);
    var o = a.xpath("//data/action", r);
    if (!o.length)
      return this._errorResponse(i, t);
    for (var c = 0; c < o.length; c++) {
      var h = o[c];
      n = h.getAttribute("type"), _ = h.getAttribute("sid"), d = h.getAttribute("tid"), e.afterUpdateCallback(_, d, n, h);
    }
    e.finalizeUpdate();
  } else
    this._errorResponse(i, t);
}, cleanUpdate: function(e) {
  if (e)
    for (var i = 0; i < e.length; i++)
      delete this._in_progress[e[i]];
}, finalizeUpdate: function() {
  this._waitMode && this._waitMode--, this.callEvent("onAfterUpdateFinish", []), this.updatedRows.length || this.callEvent("onFullSync", []);
}, init: function(e) {
  if (!this._initialized) {
    this.$scheduler = e, this.$scheduler._dp_init && this.$scheduler._dp_init(this), this._setDefaultTransactionMode(), this._methods = this._methods || ["_set_event_text_style", "", "_dp_change_event_id", "_dp_hook_delete"], function(t, a) {
      t._validId = function(s) {
        return !this._is_virtual_event || !this._is_virtual_event(s);
      }, t.setUserData = function(s, n, _) {
        if (s) {
          var d = this.getEvent(s);
          d && (d[n] = _);
        } else
          this._userdata[n] = _;
      }, t.getUserData = function(s, n) {
        if (s) {
          var _ = this.getEvent(s);
          return _ ? _[n] : null;
        }
        return this._userdata[n];
      }, t._set_event_text_style = function(s, n) {
        if (t.getEvent(s)) {
          this.for_rendered(s, function(d) {
            d.style.cssText += ";" + n;
          });
          var _ = this.getEvent(s);
          _._text_style = n, this.event_updated(_);
        }
      }, t._update_callback = function(s, n) {
        var _ = t._xmlNodeToJSON(s.firstChild);
        _.rec_type == "none" && (_.rec_pattern = "none"), _.text = _.text || _._tagvalue, _.start_date = t._helpers.parseDate(_.start_date), _.end_date = t._helpers.parseDate(_.end_date), t.addEvent(_), t._add_rec_marker && t.setCurrentView();
      }, t._dp_change_event_id = function(s, n) {
        t.getEvent(s) && t.changeEventId(s, n);
      }, t._dp_hook_delete = function(s, n) {
        if (t.getEvent(s))
          return n && s != n && (this.getUserData(s, a.action_param) == "true_deleted" && this.setUserData(s, a.action_param, "updated"), this.changeEventId(s, n)), this.deleteEvent(n, !0);
      }, t.setDp = function() {
        this._dp = a;
      }, t.setDp();
    }(this.$scheduler, this);
    var i = new qa(this.$scheduler, this);
    i.attach(), this.attachEvent("onDestroy", function() {
      delete this._getRowData, delete this.$scheduler._dp, delete this.$scheduler._dataprocessor, delete this.$scheduler._set_event_text_style, delete this.$scheduler._dp_change_event_id, delete this.$scheduler._dp_hook_delete, delete this.$scheduler, i.detach();
    }), this.$scheduler.callEvent("onDataProcessorReady", [this]), this._initialized = !0, e._dataprocessor = this;
  }
}, setOnAfterUpdate: function(e) {
  this.attachEvent("onAfterUpdate", e);
}, setOnBeforeUpdateHandler: function(e) {
  this.attachEvent("onBeforeDataSending", e);
}, setAutoUpdate: function(e, i) {
  e = e || 2e3, this._user = i || (/* @__PURE__ */ new Date()).valueOf(), this._need_update = !1, this._update_busy = !1, this.attachEvent("onAfterUpdate", function(s, n, _, d) {
    this.afterAutoUpdate(s, n, _, d);
  }), this.attachEvent("onFullSync", function() {
    this.fullSync();
  });
  var t = this;
  let a = I.setInterval(function() {
    t.loadUpdate();
  }, e);
  this.attachEvent("onDestroy", function() {
    clearInterval(a);
  });
}, afterAutoUpdate: function(e, i, t, a) {
  return i != "collision" || (this._need_update = !0, !1);
}, fullSync: function() {
  return this._need_update && (this._need_update = !1, this.loadUpdate()), !0;
}, getUpdates: function(e, i) {
  var t = this.$scheduler.ajax;
  if (this._update_busy)
    return !1;
  this._update_busy = !0, t.get(e, i);
}, _getXmlNodeValue: function(e) {
  return e.firstChild ? e.firstChild.nodeValue : "";
}, loadUpdate: function() {
  var e = this, i = this.$scheduler.ajax, t = this.$scheduler.getUserData(0, "version"), a = this.serverProcessor + i.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + t].join("&");
  a = a.replace("editing=true&", ""), this.getUpdates(a, function(s) {
    var n = i.xpath("//userdata", s);
    e.$scheduler.setUserData(0, "version", e._getXmlNodeValue(n[0]));
    var _ = i.xpath("//update", s);
    if (_.length) {
      e._silent_mode = !0;
      for (var d = 0; d < _.length; d++) {
        var r = _[d].getAttribute("status"), o = _[d].getAttribute("id"), c = _[d].getAttribute("parent");
        switch (r) {
          case "inserted":
            this.callEvent("insertCallback", [_[d], o, c]);
            break;
          case "updated":
            this.callEvent("updateCallback", [_[d], o, c]);
            break;
          case "deleted":
            this.callEvent("deleteCallback", [_[d], o, c]);
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
  var i = this.$scheduler.utils.copy(e);
  return this._tMode === "REST-JSON" && (delete i.id, delete i[this.action_param]), JSON.stringify(i);
}, _cleanupArgumentsBeforeSend: function(e) {
  var i;
  if (e[this.action_param] === void 0)
    for (var t in i = {}, e)
      i[t] = this._cleanupArgumentsBeforeSend(e[t]);
  else
    i = this._cleanupItemBeforeSend(e);
  return i;
}, _cleanupItemBeforeSend: function(e) {
  var i = null;
  return e && (e[this.action_param] === "deleted" ? ((i = {}).id = e.id, i[this.action_param] = e[this.action_param]) : i = e), i;
}, _forEachUpdatedRow: function(e) {
  for (var i = this.updatedRows.slice(), t = 0; t < i.length; t++) {
    var a = i[t];
    this.$scheduler.getUserData(a, this.action_param) && e.call(this, a);
  }
}, _prepareItemForJson(e) {
  const i = {}, t = this.$scheduler, a = t.utils.copy(e);
  for (let s in a) {
    let n = a[s];
    s.indexOf("_") !== 0 && (n ? n.getUTCFullYear ? i[s] = t._helpers.formatDate(n) : i[s] = typeof n == "object" ? this._prepareItemForJson(n) : n : n !== void 0 && (i[s] = n));
  }
  return i[this.action_param] = t.getUserData(e.id, this.action_param), i;
}, _prepareItemForForm(e) {
  const i = {}, t = this.$scheduler, a = t.utils.copy(e);
  for (var s in a) {
    let n = a[s];
    s.indexOf("_") !== 0 && (n ? n.getUTCFullYear ? i[s] = t._helpers.formatDate(n) : i[s] = typeof n == "object" ? this._prepareItemForForm(n) : n : i[s] = "");
  }
  return i[this.action_param] = t.getUserData(e.id, this.action_param), i;
}, _prepareDataItem: function(e) {
  return this._serializeAsJson ? this._prepareItemForJson(e) : this._prepareItemForForm(e);
}, _getRowData: function(e) {
  var i = this.$scheduler.getEvent(e);
  return i || (i = { id: e }), this._prepareDataItem(i);
} };
class Ra {
  constructor(i) {
    this._locales = {};
    for (const t in i)
      this._locales[t] = i[t];
  }
  addLocale(i, t) {
    this._locales[i] = t;
  }
  getLocale(i) {
    return this._locales[i];
  }
}
const ja = Object.freeze(Object.defineProperty({ __proto__: null, ar: { date: { month_full: ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"], month_short: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], day_full: ["الأحد", "الأثنين", "ألثلاثاء", "الأربعاء", "ألحميس", "ألجمعة", "السبت"], day_short: ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"] }, labels: { dhx_cal_today_button: "اليوم", day_tab: "يوم", week_tab: "أسبوع", month_tab: "شهر", new_event: "حدث جديد", icon_save: "اخزن", icon_cancel: "الغاء", icon_details: "تفاصيل", icon_edit: "تحرير", icon_delete: "حذف", confirm_closing: "التغييرات سوف تضيع, هل انت متأكد؟", confirm_deleting: "الحدث سيتم حذفها نهائيا ، هل أنت متأكد؟", section_description: "الوصف", section_time: "الفترة الزمنية", full_day: "طوال اليوم", confirm_recurring: "هل تريد تحرير مجموعة كاملة من الأحداث المتكررة؟", section_recurring: "تكرار الحدث", button_recurring: "تعطيل", button_recurring_open: "تمكين", button_edit_series: "تحرير سلسلة", button_edit_occurrence: "تعديل نسخة", button_edit_occurrence_and_following: "This and following events", grid_tab: "جدول", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "يومي", repeat_radio_week: "أسبوعي", repeat_radio_month: "شهري", repeat_radio_year: "سنوي", repeat_radio_day_type: "كل", repeat_text_day_count: "يوم", repeat_radio_day_type2: "كل يوم عمل", repeat_week: " تكرار كل", repeat_text_week_count: "أسبوع في الأيام التالية:", repeat_radio_month_type: "تكرار", repeat_radio_month_start: "في", repeat_text_month_day: "يوم كل", repeat_text_month_count: "شهر", repeat_text_month_count2_before: "كل", repeat_text_month_count2_after: "شهر", repeat_year_label: "في", select_year_day2: "من", repeat_text_year_day: "يوم", select_year_month: "شهر", repeat_radio_end: "بدون تاريخ انتهاء", repeat_text_occurrences_count: "تكرارات", repeat_radio_end2: "بعد", repeat_radio_end3: "ينتهي في", repeat_never: "أبداً", repeat_daily: "كل يوم", repeat_workdays: "كل يوم عمل", repeat_weekly: "كل أسبوع", repeat_monthly: "كل شهر", repeat_yearly: "كل سنة", repeat_custom: "تخصيص", repeat_freq_day: "يوم", repeat_freq_week: "أسبوع", repeat_freq_month: "شهر", repeat_freq_year: "سنة", repeat_on_date: "في التاريخ", repeat_ends: "ينتهي", month_for_recurring: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], day_for_recurring: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] } }, be: { date: { month_full: ["Студзень", "Люты", "Сакавік", "Красавік", "Maй", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"], month_short: ["Студз", "Лют", "Сак", "Крас", "Maй", "Чэр", "Ліп", "Жнів", "Вер", "Каст", "Ліст", "Снеж"], day_full: ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"], day_short: ["Нд", "Пн", "Аўт", "Ср", "Чцв", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сёння", day_tab: "Дзень", week_tab: "Тыдзень", month_tab: "Месяц", new_event: "Новая падзея", icon_save: "Захаваць", icon_cancel: "Адмяніць", icon_details: "Дэталі", icon_edit: "Змяніць", icon_delete: "Выдаліць", confirm_closing: "", confirm_deleting: "Падзея будзе выдалена незваротна, працягнуць?", section_description: "Апісанне", section_time: "Перыяд часу", full_day: "Увесь дзень", confirm_recurring: "Вы хочаце змяніць усю серыю паўтаральных падзей?", section_recurring: "Паўтарэнне", button_recurring: "Адключана", button_recurring_open: "Уключана", button_edit_series: "Рэдагаваць серыю", button_edit_occurrence: "Рэдагаваць асобнік", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Спіс", date: "Дата", description: "Апісанне", year_tab: "Год", week_agenda_tab: "Спіс", grid_tab: "Спic", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Дзень", repeat_radio_week: "Тыдзень", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Кожны", repeat_text_day_count: "дзень", repeat_radio_day_type2: "Кожны працоўны дзень", repeat_week: " Паўтараць кожны", repeat_text_week_count: "тыдзень", repeat_radio_month_type: "Паўтараць", repeat_radio_month_start: "", repeat_text_month_day: " чысла кожнага", repeat_text_month_count: "месяцу", repeat_text_month_count2_before: "кожны ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "дзень", select_year_month: "", repeat_radio_end: "Без даты заканчэння", repeat_text_occurrences_count: "паўтораў", repeat_radio_end2: "", repeat_radio_end3: "Да ", repeat_never: "Ніколі", repeat_daily: "Кожны дзень", repeat_workdays: "Кожны працоўны дзень", repeat_weekly: "Кожны тыдзень", repeat_monthly: "Кожны месяц", repeat_yearly: "Кожны год", repeat_custom: "Наладжвальны", repeat_freq_day: "Дзень", repeat_freq_week: "Тыдзень", repeat_freq_month: "Месяц", repeat_freq_year: "Год", repeat_on_date: "На дату", repeat_ends: "Заканчваецца", month_for_recurring: ["Студзеня", "Лютага", "Сакавіка", "Красавіка", "Мая", "Чэрвеня", "Ліпeня", "Жніўня", "Верасня", "Кастрычніка", "Лістапада", "Снежня"], day_for_recurring: ["Нядзелю", "Панядзелак", "Аўторак", "Сераду", "Чацвер", "Пятніцу", "Суботу"] } }, ca: { date: { month_full: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], month_short: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"], day_full: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"], day_short: ["Dg", "Dl", "Dm", "Dc", "Dj", "Dv", "Ds"] }, labels: { dhx_cal_today_button: "Hui", day_tab: "Dia", week_tab: "Setmana", month_tab: "Mes", new_event: "Nou esdeveniment", icon_save: "Guardar", icon_cancel: "Cancel·lar", icon_details: "Detalls", icon_edit: "Editar", icon_delete: "Esborrar", confirm_closing: "", confirm_deleting: "L'esdeveniment s'esborrarà definitivament, continuar ?", section_description: "Descripció", section_time: "Periode de temps", full_day: "Tot el dia", confirm_recurring: "¿Desitja modificar el conjunt d'esdeveniments repetits?", section_recurring: "Repeteixca l'esdeveniment", button_recurring: "Impedit", button_recurring_open: "Permés", button_edit_series: "Edit sèrie", button_edit_occurrence: "Edita Instància", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Descripció", year_tab: "Any", week_agenda_tab: "Agenda", grid_tab: "Taula", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diari", repeat_radio_week: "Setmanal", repeat_radio_month: "Mensual", repeat_radio_year: "Anual", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia", repeat_radio_day_type2: "Cada dia laborable", repeat_week: " Repetir cada", repeat_text_week_count: "setmana els dies següents:", repeat_radio_month_type: "Repetir", repeat_radio_month_start: "El", repeat_text_month_day: "dia cada", repeat_text_month_count: "mes", repeat_text_month_count2_before: "cada", repeat_text_month_count2_after: "mes", repeat_year_label: "El", select_year_day2: "de", repeat_text_year_day: "dia", select_year_month: "mes", repeat_radio_end: "Sense data de finalització", repeat_text_occurrences_count: "ocurrències", repeat_radio_end2: "Després", repeat_radio_end3: "Finalitzar el", repeat_never: "Mai", repeat_daily: "Cada dia", repeat_workdays: "Cada dia laborable", repeat_weekly: "Cada setmana", repeat_monthly: "Cada mes", repeat_yearly: "Cada any", repeat_custom: "Personalitzat", repeat_freq_day: "Dia", repeat_freq_week: "Setmana", repeat_freq_month: "Mes", repeat_freq_year: "Any", repeat_on_date: "En la data", repeat_ends: "Finalitza", month_for_recurring: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], day_for_recurring: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"] } }, cn: { date: { month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], day_short: ["日", "一", "二", "三", "四", "五", "六"] }, labels: { dhx_cal_today_button: "今天", day_tab: "日", week_tab: "周", month_tab: "月", new_event: "新建日程", icon_save: "保存", icon_cancel: "关闭", icon_details: "详细", icon_edit: "编辑", icon_delete: "删除", confirm_closing: "请确认是否撤销修改!", confirm_deleting: "是否删除日程?", section_description: "描述", section_time: "时间范围", full_day: "整天", confirm_recurring: "请确认是否将日程设为重复模式?", section_recurring: "重复周期", button_recurring: "禁用", button_recurring_open: "启用", button_edit_series: "编辑系列", button_edit_occurrence: "编辑实例", button_edit_occurrence_and_following: "This and following events", agenda_tab: "议程", date: "日期", description: "说明", year_tab: "今年", week_agenda_tab: "议程", grid_tab: "电网", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "按天", repeat_radio_week: "按周", repeat_radio_month: "按月", repeat_radio_year: "按年", repeat_radio_day_type: "每", repeat_text_day_count: "天", repeat_radio_day_type2: "每个工作日", repeat_week: " 重复 每", repeat_text_week_count: "星期的:", repeat_radio_month_type: "重复", repeat_radio_month_start: "在", repeat_text_month_day: "日 每", repeat_text_month_count: "月", repeat_text_month_count2_before: "每", repeat_text_month_count2_after: "月", repeat_year_label: "在", select_year_day2: "的", repeat_text_year_day: "日", select_year_month: "月", repeat_radio_end: "无结束日期", repeat_text_occurrences_count: "次结束", repeat_radio_end2: "重复", repeat_radio_end3: "结束于", repeat_never: "从不", repeat_daily: "每天", repeat_workdays: "每个工作日", repeat_weekly: "每周", repeat_monthly: "每月", repeat_yearly: "每年", repeat_custom: "自定义", repeat_freq_day: "天", repeat_freq_week: "周", repeat_freq_month: "月", repeat_freq_year: "年", repeat_on_date: "在日期", repeat_ends: "结束", month_for_recurring: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], day_for_recurring: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] } }, cs: { date: { month_full: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], month_short: ["Led", "Ún", "Bře", "Dub", "Kvě", "Čer", "Čec", "Srp", "Září", "Říj", "List", "Pro"], day_full: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"], day_short: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Den", week_tab: "Týden", month_tab: "Měsíc", new_event: "Nová událost", icon_save: "Uložit", icon_cancel: "Zpět", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Smazat", confirm_closing: "", confirm_deleting: "Událost bude trvale smazána, opravdu?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Přejete si upravit celou řadu opakovaných událostí?", section_recurring: "Opakování události", button_recurring: "Vypnuto", button_recurring_open: "Zapnuto", button_edit_series: "Edit series", button_edit_occurrence: "Upravit instance", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Program", date: "Datum", description: "Poznámka", year_tab: "Rok", full_day: "Full day", week_agenda_tab: "Program", grid_tab: "Mřížka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denně", repeat_radio_week: "Týdně", repeat_radio_month: "Měsíčně", repeat_radio_year: "Ročně", repeat_radio_day_type: "každý", repeat_text_day_count: "Den", repeat_radio_day_type2: "pracovní dny", repeat_week: "Opakuje každých", repeat_text_week_count: "Týdnů na:", repeat_radio_month_type: "u každého", repeat_radio_month_start: "na", repeat_text_month_day: "Den každého", repeat_text_month_count: "Měsíc", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "Měsíc", repeat_year_label: "na", select_year_day2: "v", repeat_text_year_day: "Den v", select_year_month: "", repeat_radio_end: "bez data ukončení", repeat_text_occurrences_count: "Události", repeat_radio_end2: "po", repeat_radio_end3: "Konec", repeat_never: "Nikdy", repeat_daily: "Každý den", repeat_workdays: "Každý pracovní den", repeat_weekly: "Každý týden", repeat_monthly: "Každý měsíc", repeat_yearly: "Každý rok", repeat_custom: "Vlastní", repeat_freq_day: "Den", repeat_freq_week: "Týden", repeat_freq_month: "Měsíc", repeat_freq_year: "Rok", repeat_on_date: "Na datum", repeat_ends: "Končí", month_for_recurring: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], day_for_recurring: ["Neděle ", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"] } }, da: { date: { month_full: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uge", month_tab: "Måned", new_event: "Ny begivenhed", icon_save: "Gem", icon_cancel: "Fortryd", icon_details: "Detaljer", icon_edit: "Tilret", icon_delete: "Slet", confirm_closing: "Dine rettelser vil gå tabt.. Er dy sikker?", confirm_deleting: "Bigivenheden vil blive slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du tilrette hele serien af gentagne begivenheder?", section_recurring: "Gentag begivenhed", button_recurring: "Frakoblet", button_recurring_open: "Tilkoblet", button_edit_series: "Rediger serien", button_edit_occurrence: "Rediger en kopi", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Dagsorden", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Dagsorden", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ugenlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "På hver arbejdsdag", repeat_week: " Gentager sig hver", repeat_text_week_count: "uge på følgende dage:", repeat_radio_month_type: "Hver den", repeat_radio_month_start: "Den", repeat_text_month_day: " i hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen slutdato", repeat_text_occurrences_count: "gentagelse", repeat_radio_end2: "Efter", repeat_radio_end3: "Slut", repeat_never: "Aldrig", repeat_daily: "Hver dag", repeat_workdays: "Hver hverdag", repeat_weekly: "Hver uge", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Brugerdefineret", repeat_freq_day: "Dag", repeat_freq_week: "Uge", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, de: { date: { month_full: [" Januar", " Februar", " März ", " April", " Mai", " Juni", " Juli", " August", " September ", " Oktober", " November ", " Dezember"], month_short: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], day_full: ["Sonntag", "Montag", "Dienstag", " Mittwoch", " Donnerstag", "Freitag", "Samstag"], day_short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"] }, labels: { dhx_cal_today_button: "Heute", day_tab: "Tag", week_tab: "Woche", month_tab: "Monat", new_event: "neuer Eintrag", icon_save: "Speichern", icon_cancel: "Abbrechen", icon_details: "Details", icon_edit: "Ändern", icon_delete: "Löschen", confirm_closing: "", confirm_deleting: "Der Eintrag wird gelöscht", section_description: "Beschreibung", section_time: "Zeitspanne", full_day: "Ganzer Tag", confirm_recurring: "Wollen Sie alle Einträge bearbeiten oder nur diesen einzelnen Eintrag?", section_recurring: "Wiederholung", button_recurring: "Aus", button_recurring_open: "An", button_edit_series: "Bearbeiten Sie die Serie", button_edit_occurrence: "Bearbeiten Sie eine Kopie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Datum", description: "Beschreibung", year_tab: "Jahre", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Täglich", repeat_radio_week: "Wöchentlich", repeat_radio_month: "Monatlich", repeat_radio_year: "Jährlich", repeat_radio_day_type: "jeden", repeat_text_day_count: "Tag", repeat_radio_day_type2: "an jedem Arbeitstag", repeat_week: " Wiederholt sich jede", repeat_text_week_count: "Woche am:", repeat_radio_month_type: "an jedem", repeat_radio_month_start: "am", repeat_text_month_day: "Tag eines jeden", repeat_text_month_count: "Monats", repeat_text_month_count2_before: "jeden", repeat_text_month_count2_after: "Monats", repeat_year_label: "am", select_year_day2: "im", repeat_text_year_day: "Tag im", select_year_month: "", repeat_radio_end: "kein Enddatum", repeat_text_occurrences_count: "Ereignissen", repeat_radio_end3: "Schluß", repeat_radio_end2: "nach", repeat_never: "Nie", repeat_daily: "Jeden Tag", repeat_workdays: "Jeden Werktag", repeat_weekly: "Jede Woche", repeat_monthly: "Jeden Monat", repeat_yearly: "Jedes Jahr", repeat_custom: "Benutzerdefiniert", repeat_freq_day: "Tag", repeat_freq_week: "Woche", repeat_freq_month: "Monat", repeat_freq_year: "Jahr", repeat_on_date: "Am Datum", repeat_ends: "Endet", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"] } }, el: { date: { month_full: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], month_short: ["ΙΑΝ", "ΦΕΒ", "ΜΑΡ", "ΑΠΡ", "ΜΑΙ", "ΙΟΥΝ", "ΙΟΥΛ", "ΑΥΓ", "ΣΕΠ", "ΟΚΤ", "ΝΟΕ", "ΔΕΚ"], day_full: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"], day_short: ["ΚΥ", "ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ"] }, labels: { dhx_cal_today_button: "Σήμερα", day_tab: "Ημέρα", week_tab: "Εβδομάδα", month_tab: "Μήνας", new_event: "Νέο έργο", icon_save: "Αποθήκευση", icon_cancel: "Άκυρο", icon_details: "Λεπτομέρειες", icon_edit: "Επεξεργασία", icon_delete: "Διαγραφή", confirm_closing: "", confirm_deleting: "Το έργο θα διαγραφεί οριστικά. Θέλετε να συνεχίσετε;", section_description: "Περιγραφή", section_time: "Χρονική περίοδος", full_day: "Πλήρης Ημέρα", confirm_recurring: "Θέλετε να επεξεργασθείτε ολόκληρη την ομάδα των επαναλαμβανόμενων έργων;", section_recurring: "Επαναλαμβανόμενο έργο", button_recurring: "Ανενεργό", button_recurring_open: "Ενεργό", button_edit_series: "Επεξεργαστείτε τη σειρά", button_edit_occurrence: "Επεξεργασία ένα αντίγραφο", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Ημερήσια Διάταξη", date: "Ημερομηνία", description: "Περιγραφή", year_tab: "Έτος", week_agenda_tab: "Ημερήσια Διάταξη", grid_tab: "Πλέγμα", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Ημερησίως", repeat_radio_week: "Εβδομαδιαίως", repeat_radio_month: "Μηνιαίως", repeat_radio_year: "Ετησίως", repeat_radio_day_type: "Κάθε", repeat_text_day_count: "ημέρα", repeat_radio_day_type2: "Κάθε εργάσιμη", repeat_week: " Επανάληψη κάθε", repeat_text_week_count: "εβδομάδα τις επόμενες ημέρες:", repeat_radio_month_type: "Επανάληψη", repeat_radio_month_start: "Την", repeat_text_month_day: "ημέρα κάθε", repeat_text_month_count: "μήνα", repeat_text_month_count2_before: "κάθε", repeat_text_month_count2_after: "μήνα", repeat_year_label: "Την", select_year_day2: "του", repeat_text_year_day: "ημέρα", select_year_month: "μήνα", repeat_radio_end: "Χωρίς ημερομηνία λήξεως", repeat_text_occurrences_count: "επαναλήψεις", repeat_radio_end3: "Λήγει την", repeat_radio_end2: "Μετά από", repeat_never: "Ποτέ", repeat_daily: "Κάθε μέρα", repeat_workdays: "Κάθε εργάσιμη μέρα", repeat_weekly: "Κάθε εβδομάδα", repeat_monthly: "Κάθε μήνα", repeat_yearly: "Κάθε χρόνο", repeat_custom: "Προσαρμοσμένο", repeat_freq_day: "Ημέρα", repeat_freq_week: "Εβδομάδα", repeat_freq_month: "Μήνας", repeat_freq_year: "Χρόνος", repeat_on_date: "Σε ημερομηνία", repeat_ends: "Λήγει", month_for_recurring: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], day_for_recurring: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"] } }, en: { date: { month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }, labels: { dhx_cal_today_button: "Today", day_tab: "Day", week_tab: "Week", month_tab: "Month", new_event: "New event", icon_save: "Save", icon_cancel: "Cancel", icon_details: "Details", icon_edit: "Edit", icon_delete: "Delete", confirm_closing: "", confirm_deleting: "Event will be deleted permanently, are you sure?", section_description: "Description", section_time: "Time period", full_day: "Full day", confirm_recurring: "Edit recurring event", section_recurring: "Repeat event", button_recurring: "Disabled", button_recurring_open: "Enabled", button_edit_series: "All events", button_edit_occurrence: "This event", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Date", description: "Description", year_tab: "Year", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daily", repeat_radio_week: "Weekly", repeat_radio_month: "Monthly", repeat_radio_year: "Yearly", repeat_radio_day_type: "Every", repeat_text_day_count: "day", repeat_radio_day_type2: "Every workday", repeat_week: " Repeat every", repeat_text_week_count: "week next days:", repeat_radio_month_type: "Repeat", repeat_radio_month_start: "On", repeat_text_month_day: "day every", repeat_text_month_count: "month", repeat_text_month_count2_before: "every", repeat_text_month_count2_after: "month", repeat_year_label: "On", select_year_day2: "of", repeat_text_year_day: "day", select_year_month: "month", repeat_radio_end: "No end date", repeat_text_occurrences_count: "occurrences", repeat_radio_end2: "After", repeat_radio_end3: "End by", repeat_never: "Never", repeat_daily: "Every day", repeat_workdays: "Every weekday", repeat_weekly: "Every week", repeat_monthly: "Every month", repeat_yearly: "Every year", repeat_custom: "Custom", repeat_freq_day: "Day", repeat_freq_week: "Week", repeat_freq_month: "Month", repeat_freq_year: "Year", repeat_on_date: "On date", repeat_ends: "Ends", month_for_recurring: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] } }, es: { date: { month_full: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], month_short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], day_full: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], day_short: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] }, labels: { dhx_cal_today_button: "Hoy", day_tab: "Día", week_tab: "Semana", month_tab: "Mes", new_event: "Nuevo evento", icon_save: "Guardar", icon_cancel: "Cancelar", icon_details: "Detalles", icon_edit: "Editar", icon_delete: "Eliminar", confirm_closing: "", confirm_deleting: "El evento se borrará definitivamente, ¿continuar?", section_description: "Descripción", section_time: "Período", full_day: "Todo el día", confirm_recurring: "¿Desea modificar el conjunto de eventos repetidos?", section_recurring: "Repita el evento", button_recurring: "Impedido", button_recurring_open: "Permitido", button_edit_series: "Editar la serie", button_edit_occurrence: "Editar este evento", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Día", date: "Fecha", description: "Descripción", year_tab: "Año", week_agenda_tab: "Día", grid_tab: "Reja", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diariamente", repeat_radio_week: "Semanalmente", repeat_radio_month: "Mensualmente", repeat_radio_year: "Anualmente", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia", repeat_radio_day_type2: "Cada jornada de trabajo", repeat_week: " Repetir cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repita", repeat_radio_month_start: "El", repeat_text_month_day: "dia cada ", repeat_text_month_count: "mes", repeat_text_month_count2_before: "cada", repeat_text_month_count2_after: "mes", repeat_year_label: "El", select_year_day2: "del", repeat_text_year_day: "dia", select_year_month: "mes", repeat_radio_end: "Sin fecha de finalización", repeat_text_occurrences_count: "ocurrencias", repeat_radio_end3: "Fin", repeat_radio_end2: "Después de", repeat_never: "Nunca", repeat_daily: "Cada día", repeat_workdays: "Cada día laborable", repeat_weekly: "Cada semana", repeat_monthly: "Cada mes", repeat_yearly: "Cada año", repeat_custom: "Personalizado", repeat_freq_day: "Día", repeat_freq_week: "Semana", repeat_freq_month: "Mes", repeat_freq_year: "Año", repeat_on_date: "En la fecha", repeat_ends: "Termina", month_for_recurring: ["Enero", "Febrero", "Маrzo", "Аbril", "Mayo", "Junio", "Julio", "Аgosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"], day_for_recurring: ["Domingo", "Lunes", "Martes", "Miércoles", "Jeuves", "Viernes", "Sabado"] } }, fi: { date: { month_full: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], month_short: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou"], day_full: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"], day_short: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"] }, labels: { dhx_cal_today_button: "Tänään", day_tab: "Päivä", week_tab: "Viikko", month_tab: "Kuukausi", new_event: "Uusi tapahtuma", icon_save: "Tallenna", icon_cancel: "Peru", icon_details: "Tiedot", icon_edit: "Muokkaa", icon_delete: "Poista", confirm_closing: "", confirm_deleting: "Haluatko varmasti poistaa tapahtuman?", section_description: "Kuvaus", section_time: "Aikajakso", full_day: "Koko päivä", confirm_recurring: "Haluatko varmasti muokata toistuvan tapahtuman kaikkia jaksoja?", section_recurring: "Toista tapahtuma", button_recurring: "Ei k&auml;yt&ouml;ss&auml;", button_recurring_open: "K&auml;yt&ouml;ss&auml;", button_edit_series: "Muokkaa sarja", button_edit_occurrence: "Muokkaa kopio", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Esityslista", date: "Päivämäärä", description: "Kuvaus", year_tab: "Vuoden", week_agenda_tab: "Esityslista", grid_tab: "Ritilä", drag_to_create: "Luo uusi vetämällä", drag_to_move: "Siirrä vetämällä", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "P&auml;ivitt&auml;in", repeat_radio_week: "Viikoittain", repeat_radio_month: "Kuukausittain", repeat_radio_year: "Vuosittain", repeat_radio_day_type: "Joka", repeat_text_day_count: "p&auml;iv&auml;", repeat_radio_day_type2: "Joka arkip&auml;iv&auml;", repeat_week: "Toista joka", repeat_text_week_count: "viikko n&auml;in&auml; p&auml;ivin&auml;:", repeat_radio_month_type: "Toista", repeat_radio_month_start: "", repeat_text_month_day: "p&auml;iv&auml;n&auml; joka", repeat_text_month_count: "kuukausi", repeat_text_month_count2_before: "joka", repeat_text_month_count2_after: "kuukausi", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "p&auml;iv&auml;", select_year_month: "kuukausi", repeat_radio_end: "Ei loppumisaikaa", repeat_text_occurrences_count: "Toiston j&auml;lkeen", repeat_radio_end3: "Loppuu", repeat_radio_end2: "", repeat_never: "Ei koskaan", repeat_daily: "Joka päivä", repeat_workdays: "Joka arkipäivä", repeat_weekly: "Joka viikko", repeat_monthly: "Joka kuukausi", repeat_yearly: "Joka vuosi", repeat_custom: "Mukautettu", repeat_freq_day: "Päivä", repeat_freq_week: "Viikko", repeat_freq_month: "Kuukausi", repeat_freq_year: "Vuosi", repeat_on_date: "Tiettynä päivänä", repeat_ends: "Päättyy", month_for_recurring: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], day_for_recurring: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"] } }, fr: { date: { month_full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], month_short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"], day_full: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"], day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"] }, labels: { dhx_cal_today_button: "Aujourd'hui", day_tab: "Jour", week_tab: "Semaine", month_tab: "Mois", new_event: "Nouvel événement", icon_save: "Enregistrer", icon_cancel: "Annuler", icon_details: "Détails", icon_edit: "Modifier", icon_delete: "Effacer", confirm_closing: "", confirm_deleting: "L'événement sera effacé sans appel, êtes-vous sûr ?", section_description: "Description", section_time: "Période", full_day: "Journée complète", confirm_recurring: "Voulez-vous éditer toute une série d'évènements répétés?", section_recurring: "Périodicité", button_recurring: "Désactivé", button_recurring_open: "Activé", button_edit_series: "Modifier la série", button_edit_occurrence: "Modifier une copie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Jour", date: "Date", description: "Description", year_tab: "Année", week_agenda_tab: "Jour", grid_tab: "Grille", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidienne", repeat_radio_week: "Hebdomadaire", repeat_radio_month: "Mensuelle", repeat_radio_year: "Annuelle", repeat_radio_day_type: "Chaque", repeat_text_day_count: "jour", repeat_radio_day_type2: "Chaque journée de travail", repeat_week: " Répéter toutes les", repeat_text_week_count: "semaine:", repeat_radio_month_type: "Répéter", repeat_radio_month_start: "Le", repeat_text_month_day: "jour chaque", repeat_text_month_count: "mois", repeat_text_month_count2_before: "chaque", repeat_text_month_count2_after: "mois", repeat_year_label: "Le", select_year_day2: "du", repeat_text_year_day: "jour", select_year_month: "mois", repeat_radio_end: "Pas de date d&quot;achèvement", repeat_text_occurrences_count: "occurrences", repeat_radio_end3: "Fin", repeat_radio_end2: "Après", repeat_never: "Jamais", repeat_daily: "Chaque jour", repeat_workdays: "Chaque jour ouvrable", repeat_weekly: "Chaque semaine", repeat_monthly: "Chaque mois", repeat_yearly: "Chaque année", repeat_custom: "Personnalisé", repeat_freq_day: "Jour", repeat_freq_week: "Semaine", repeat_freq_month: "Mois", repeat_freq_year: "Année", repeat_on_date: "À la date", repeat_ends: "Se termine", month_for_recurring: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], day_for_recurring: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"] } }, he: { date: { month_full: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], month_short: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"], day_full: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"], day_short: ["א", "ב", "ג", "ד", "ה", "ו", "ש"] }, labels: { dhx_cal_today_button: "היום", day_tab: "יום", week_tab: "שבוע", month_tab: "חודש", new_event: "ארוע חדש", icon_save: "שמור", icon_cancel: "בטל", icon_details: "פרטים", icon_edit: "ערוך", icon_delete: "מחק", confirm_closing: "", confirm_deleting: "ארוע ימחק סופית.להמשיך?", section_description: "תיאור", section_time: "תקופה", confirm_recurring: "האם ברצונך לשנות כל סדרת ארועים מתמשכים?", section_recurring: "להעתיק ארוע", button_recurring: "לא פעיל", button_recurring_open: "פעיל", full_day: "יום שלם", button_edit_series: "ערוך את הסדרה", button_edit_occurrence: "עריכת עותק", button_edit_occurrence_and_following: "This and following events", agenda_tab: "סדר יום", date: "תאריך", description: "תיאור", year_tab: "לשנה", week_agenda_tab: "סדר יום", grid_tab: "סורג", drag_to_create: "Drag to create", drag_to_move: "גרור כדי להזיז", message_ok: "OK", message_cancel: "בטל", next: "הבא", prev: "הקודם", year: "שנה", month: "חודש", day: "יום", hour: "שעה", minute: "דקה", repeat_radio_day: "יומי", repeat_radio_week: "שבועי", repeat_radio_month: "חודשי", repeat_radio_year: "שנתי", repeat_radio_day_type: "חזור כל", repeat_text_day_count: "ימים", repeat_radio_day_type2: "חזור כל יום עבודה", repeat_week: " חזור כל", repeat_text_week_count: "שבוע לפי ימים:", repeat_radio_month_type: "חזור כל", repeat_radio_month_start: "כל", repeat_text_month_day: "ימים כל", repeat_text_month_count: "חודשים", repeat_text_month_count2_before: "חזור כל", repeat_text_month_count2_after: "חודש", repeat_year_label: "כל", select_year_day2: "בחודש", repeat_text_year_day: "ימים", select_year_month: "חודש", repeat_radio_end: "לעולם לא מסתיים", repeat_text_occurrences_count: "אירועים", repeat_radio_end3: "מסתיים ב", repeat_radio_end2: "אחרי", repeat_never: "אף פעם", repeat_daily: "כל יום", repeat_workdays: "כל יום עבודה", repeat_weekly: "כל שבוע", repeat_monthly: "כל חודש", repeat_yearly: "כל שנה", repeat_custom: "מותאם אישית", repeat_freq_day: "יום", repeat_freq_week: "שבוע", repeat_freq_month: "חודש", repeat_freq_year: "שנה", repeat_on_date: "בתאריך", repeat_ends: "מסתיים", month_for_recurring: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], day_for_recurring: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"] } }, hu: { date: { month_full: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"], month_short: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Vasárnap", "Hétfõ", "Kedd", "Szerda", "Csütörtök", "Péntek", "szombat"], day_short: ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"] }, labels: { dhx_cal_today_button: "Ma", day_tab: "Nap", week_tab: "Hét", month_tab: "Hónap", new_event: "Új esemény", icon_save: "Mentés", icon_cancel: "Mégse", icon_details: "Részletek", icon_edit: "Szerkesztés", icon_delete: "Törlés", confirm_closing: "", confirm_deleting: "Az esemény törölve lesz, biztosan folytatja?", section_description: "Leírás", section_time: "Idõszak", full_day: "Egesz napos", confirm_recurring: "Biztosan szerkeszteni akarod az összes ismétlõdõ esemény beállítását?", section_recurring: "Esemény ismétlése", button_recurring: "Tiltás", button_recurring_open: "Engedélyezés", button_edit_series: "Edit series", button_edit_occurrence: "Szerkesztés bíróság", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Napirend", date: "Dátum", description: "Leírás", year_tab: "Év", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Napi", repeat_radio_week: "Heti", repeat_radio_month: "Havi", repeat_radio_year: "Éves", repeat_radio_day_type: "Minden", repeat_text_day_count: "nap", repeat_radio_day_type2: "Minden munkanap", repeat_week: " Ismételje meg minden", repeat_text_week_count: "héten a következő napokon:", repeat_radio_month_type: "Ismétlés", repeat_radio_month_start: "Ekkor", repeat_text_month_day: "nap minden", repeat_text_month_count: "hónapban", repeat_text_month_count2_before: "minden", repeat_text_month_count2_after: "hónapban", repeat_year_label: "Ekkor", select_year_day2: "-án/-én", repeat_text_year_day: "nap", select_year_month: "hónap", repeat_radio_end: "Nincs befejezési dátum", repeat_text_occurrences_count: "esemény", repeat_radio_end2: "Után", repeat_radio_end3: "Befejező dátum", repeat_never: "Soha", repeat_daily: "Minden nap", repeat_workdays: "Minden munkanap", repeat_weekly: "Minden héten", repeat_monthly: "Minden hónapban", repeat_yearly: "Minden évben", repeat_custom: "Egyedi", repeat_freq_day: "Nap", repeat_freq_week: "Hét", repeat_freq_month: "Hónap", repeat_freq_year: "Év", repeat_on_date: "Dátum szerint", repeat_ends: "Befejeződik", month_for_recurring: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"], day_for_recurring: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"] } }, id: { date: { month_full: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"], day_full: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], day_short: ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] }, labels: { dhx_cal_today_button: "Hari Ini", day_tab: "Hari", week_tab: "Minggu", month_tab: "Bulan", new_event: "Acara Baru", icon_save: "Simpan", icon_cancel: "Batal", icon_details: "Detail", icon_edit: "Edit", icon_delete: "Hapus", confirm_closing: "", confirm_deleting: "Acara akan dihapus", section_description: "Keterangan", section_time: "Periode", full_day: "Hari penuh", confirm_recurring: "Apakah acara ini akan berulang?", section_recurring: "Acara Rutin", button_recurring: "Tidak Difungsikan", button_recurring_open: "Difungsikan", button_edit_series: "Mengedit seri", button_edit_occurrence: "Mengedit salinan", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Tanggal", description: "Keterangan", year_tab: "Tahun", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Harian", repeat_radio_week: "Mingguan", repeat_radio_month: "Bulanan", repeat_radio_year: "Tahunan", repeat_radio_day_type: "Setiap", repeat_text_day_count: "hari", repeat_radio_day_type2: "Setiap hari kerja", repeat_week: " Ulangi setiap", repeat_text_week_count: "minggu pada hari berikut:", repeat_radio_month_type: "Ulangi", repeat_radio_month_start: "Pada", repeat_text_month_day: "hari setiap", repeat_text_month_count: "bulan", repeat_text_month_count2_before: "setiap", repeat_text_month_count2_after: "bulan", repeat_year_label: "Pada", select_year_day2: "dari", repeat_text_year_day: "hari", select_year_month: "bulan", repeat_radio_end: "Tanpa tanggal akhir", repeat_text_occurrences_count: "kejadian", repeat_radio_end2: "Setelah", repeat_radio_end3: "Berakhir pada", repeat_never: "Tidak pernah", repeat_daily: "Setiap hari", repeat_workdays: "Setiap hari kerja", repeat_weekly: "Setiap minggu", repeat_monthly: "Setiap bulan", repeat_yearly: "Setiap tahun", repeat_custom: "Kustom", repeat_freq_day: "Hari", repeat_freq_week: "Minggu", repeat_freq_month: "Bulan", repeat_freq_year: "Tahun", repeat_on_date: "Pada tanggal", repeat_ends: "Berakhir", month_for_recurring: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] } }, it: { date: { month_full: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], month_short: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"], day_full: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"], day_short: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"] }, labels: { dhx_cal_today_button: "Oggi", day_tab: "Giorno", week_tab: "Settimana", month_tab: "Mese", new_event: "Nuovo evento", icon_save: "Salva", icon_cancel: "Chiudi", icon_details: "Dettagli", icon_edit: "Modifica", icon_delete: "Elimina", confirm_closing: "", confirm_deleting: "L'evento sarà eliminato, siete sicuri?", section_description: "Descrizione", section_time: "Periodo di tempo", full_day: "Intera giornata", confirm_recurring: "Vuoi modificare l'intera serie di eventi?", section_recurring: "Ripetere l'evento", button_recurring: "Disattivato", button_recurring_open: "Attivato", button_edit_series: "Modificare la serie", button_edit_occurrence: "Modificare una copia", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Descrizione", year_tab: "Anno", week_agenda_tab: "Agenda", grid_tab: "Griglia", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidiano", repeat_radio_week: "Settimanale", repeat_radio_month: "Mensile", repeat_radio_year: "Annuale", repeat_radio_day_type: "Ogni", repeat_text_day_count: "giorno", repeat_radio_day_type2: "Ogni giornata lavorativa", repeat_week: " Ripetere ogni", repeat_text_week_count: "settimana:", repeat_radio_month_type: "Ripetere", repeat_radio_month_start: "Il", repeat_text_month_day: "giorno ogni", repeat_text_month_count: "mese", repeat_text_month_count2_before: "ogni", repeat_text_month_count2_after: "mese", repeat_year_label: "Il", select_year_day2: "del", repeat_text_year_day: "giorno", select_year_month: "mese", repeat_radio_end: "Senza data finale", repeat_text_occurrences_count: "occorenze", repeat_radio_end3: "Fine", repeat_radio_end2: "Dopo", repeat_never: "Mai", repeat_daily: "Ogni giorno", repeat_workdays: "Ogni giorno feriale", repeat_weekly: "Ogni settimana", repeat_monthly: "Ogni mese", repeat_yearly: "Ogni anno", repeat_custom: "Personalizzato", repeat_freq_day: "Giorno", repeat_freq_week: "Settimana", repeat_freq_month: "Mese", repeat_freq_year: "Anno", repeat_on_date: "Alla data", repeat_ends: "Finisce", month_for_recurring: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Jiugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], day_for_recurring: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Jovedì", "Venerdì", "Sabato"] } }, jp: { date: { month_full: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"], day_short: ["日", "月", "火", "水", "木", "金", "土"] }, labels: { dhx_cal_today_button: "今日", day_tab: "日", week_tab: "週", month_tab: "月", new_event: "新イベント", icon_save: "保存", icon_cancel: "キャンセル", icon_details: "詳細", icon_edit: "編集", icon_delete: "削除", confirm_closing: "", confirm_deleting: "イベント完全に削除されます、宜しいですか？", section_description: "デスクリプション", section_time: "期間", confirm_recurring: "繰り返されているイベントを全て編集しますか？", section_recurring: "イベントを繰り返す", button_recurring: "無効", button_recurring_open: "有効", full_day: "終日", button_edit_series: "シリーズを編集します", button_edit_occurrence: "コピーを編集", button_edit_occurrence_and_following: "This and following events", agenda_tab: "議題は", date: "日付", description: "説明", year_tab: "今年", week_agenda_tab: "議題は", grid_tab: "グリッド", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "毎日", repeat_radio_week: "毎週", repeat_radio_month: "毎月", repeat_radio_year: "毎年", repeat_radio_day_type: "毎", repeat_text_day_count: "日", repeat_radio_day_type2: "毎営業日", repeat_week: " 繰り返し毎", repeat_text_week_count: "週 次の日:", repeat_radio_month_type: "繰り返し", repeat_radio_month_start: "オン", repeat_text_month_day: "日毎", repeat_text_month_count: "月", repeat_text_month_count2_before: "毎", repeat_text_month_count2_after: "月", repeat_year_label: "オン", select_year_day2: "の", repeat_text_year_day: "日", select_year_month: "月", repeat_radio_end: "終了日なし", repeat_text_occurrences_count: "回数", repeat_radio_end2: "後", repeat_radio_end3: "終了日まで", repeat_never: "決して", repeat_daily: "毎日", repeat_workdays: "毎営業日", repeat_weekly: "毎週", repeat_monthly: "毎月", repeat_yearly: "毎年", repeat_custom: "カスタム", repeat_freq_day: "日", repeat_freq_week: "週", repeat_freq_month: "月", repeat_freq_year: "年", repeat_on_date: "日にち", repeat_ends: "終了", month_for_recurring: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_for_recurring: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"] } }, nb: { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Mon", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "I dag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny hendelse", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Rediger", icon_delete: "Slett", confirm_closing: "", confirm_deleting: "Hendelsen vil bli slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du forandre hele dette settet av repeterende hendelser?", section_recurring: "Repeter hendelsen", button_recurring: "Av", button_recurring_open: "På", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ukentlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "Alle hverdager", repeat_week: " Gjentas hver", repeat_text_week_count: "uke på:", repeat_radio_month_type: "På hver", repeat_radio_month_start: "På", repeat_text_month_day: "dag hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "på", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen sluttdato", repeat_text_occurrences_count: "forekomst", repeat_radio_end3: "Stop den", repeat_radio_end2: "Etter", repeat_never: "Aldri", repeat_daily: "Hver dag", repeat_workdays: "Hver ukedag", repeat_weekly: "Hver uke", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Tilpasset", repeat_freq_day: "Dag", repeat_freq_week: "Uke", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Sondag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, nl: { date: { month_full: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"], day_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"] }, labels: { dhx_cal_today_button: "Vandaag", day_tab: "Dag", week_tab: "Week", month_tab: "Maand", new_event: "Nieuw item", icon_save: "Opslaan", icon_cancel: "Annuleren", icon_details: "Details", icon_edit: "Bewerken", icon_delete: "Verwijderen", confirm_closing: "", confirm_deleting: "Item zal permanent worden verwijderd, doorgaan?", section_description: "Beschrijving", section_time: "Tijd periode", full_day: "Hele dag", confirm_recurring: "Wilt u alle terugkerende items bijwerken?", section_recurring: "Item herhalen", button_recurring: "Uit", button_recurring_open: "Aan", button_edit_series: "Bewerk de serie", button_edit_occurrence: "Bewerk een kopie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Datum", description: "Omschrijving", year_tab: "Jaar", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagelijks", repeat_radio_week: "Wekelijks", repeat_radio_month: "Maandelijks", repeat_radio_year: "Jaarlijks", repeat_radio_day_type: "Elke", repeat_text_day_count: "dag(en)", repeat_radio_day_type2: "Elke werkdag", repeat_week: " Herhaal elke", repeat_text_week_count: "week op de volgende dagen:", repeat_radio_month_type: "Herhaal", repeat_radio_month_start: "Op", repeat_text_month_day: "dag iedere", repeat_text_month_count: "maanden", repeat_text_month_count2_before: "iedere", repeat_text_month_count2_after: "maanden", repeat_year_label: "Op", select_year_day2: "van", repeat_text_year_day: "dag", select_year_month: "maand", repeat_radio_end: "Geen eind datum", repeat_text_occurrences_count: "keren", repeat_radio_end3: "Eindigd per", repeat_radio_end2: "Na", repeat_never: "Nooit", repeat_daily: "Elke dag", repeat_workdays: "Elke werkdag", repeat_weekly: "Elke week", repeat_monthly: "Elke maand", repeat_yearly: "Elk jaar", repeat_custom: "Aangepast", repeat_freq_day: "Dag", repeat_freq_week: "Week", repeat_freq_month: "Maand", repeat_freq_year: "Jaar", repeat_on_date: "Op datum", repeat_ends: "Eindigt", month_for_recurring: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], day_for_recurring: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"] } }, no: { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Endre", icon_delete: "Slett", confirm_closing: "Endringer blir ikke lagret, er du sikker?", confirm_deleting: "Oppføringen vil bli slettet, er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", full_day: "Full dag", confirm_recurring: "Vil du endre hele settet med repeterende oppføringer?", section_recurring: "Repeterende oppføring", button_recurring: "Ikke aktiv", button_recurring_open: "Aktiv", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ukentlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "Hver arbeidsdag", repeat_week: " Gjenta hver", repeat_text_week_count: "uke neste dager:", repeat_radio_month_type: "Gjenta", repeat_radio_month_start: "På", repeat_text_month_day: "dag hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "På", select_year_day2: "av", repeat_text_year_day: "dag", select_year_month: "måned", repeat_radio_end: "Ingen sluttdato", repeat_text_occurrences_count: "forekomster", repeat_radio_end2: "Etter", repeat_radio_end3: "Slutt innen", repeat_never: "Aldri", repeat_daily: "Hver dag", repeat_workdays: "Hver ukedag", repeat_weekly: "Hver uke", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Tilpasset", repeat_freq_day: "Dag", repeat_freq_week: "Uke", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, pl: { date: { month_full: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"], month_short: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"], day_full: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"], day_short: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"] }, labels: { dhx_cal_today_button: "Dziś", day_tab: "Dzień", week_tab: "Tydzień", month_tab: "Miesiąc", new_event: "Nowe zdarzenie", icon_save: "Zapisz", icon_cancel: "Anuluj", icon_details: "Szczegóły", icon_edit: "Edytuj", icon_delete: "Usuń", confirm_closing: "", confirm_deleting: "Zdarzenie zostanie usunięte na zawsze, kontynuować?", section_description: "Opis", section_time: "Okres czasu", full_day: "Cały dzień", confirm_recurring: "Czy chcesz edytować cały zbiór powtarzających się zdarzeń?", section_recurring: "Powtórz zdarzenie", button_recurring: "Nieaktywne", button_recurring_open: "Aktywne", button_edit_series: "Edytuj serię", button_edit_occurrence: "Edytuj kopię", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Opis", year_tab: "Rok", week_agenda_tab: "Agenda", grid_tab: "Tabela", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Codziennie", repeat_radio_week: "Co tydzie", repeat_radio_month: "Co miesic", repeat_radio_year: "Co rok", repeat_radio_day_type: "Kadego", repeat_text_day_count: "dnia", repeat_radio_day_type2: "Kadego dnia roboczego", repeat_week: " Powtarzaj kadego", repeat_text_week_count: "tygodnia w dni:", repeat_radio_month_type: "Powtrz", repeat_radio_month_start: "W", repeat_text_month_day: "dnia kadego", repeat_text_month_count: "miesica", repeat_text_month_count2_before: "kadego", repeat_text_month_count2_after: "miesica", repeat_year_label: "W", select_year_day2: "miesica", repeat_text_year_day: "dnia miesica", select_year_month: "", repeat_radio_end: "Bez daty kocowej", repeat_text_occurrences_count: "wystpieniu/ach", repeat_radio_end3: "Zakocz w", repeat_radio_end2: "Po", repeat_never: "Nigdy", repeat_daily: "Codziennie", repeat_workdays: "Każdy dzień roboczy", repeat_weekly: "Co tydzień", repeat_monthly: "Co miesiąc", repeat_yearly: "Co rok", repeat_custom: "Niestandardowy", repeat_freq_day: "Dzień", repeat_freq_week: "Tydzień", repeat_freq_month: "Miesiąc", repeat_freq_year: "Rok", repeat_on_date: "W dniu", repeat_ends: "Kończy się", month_for_recurring: ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Wrzenia", "Padziernka", "Listopada", "Grudnia"], day_for_recurring: ["Niedziela", "Poniedziaek", "Wtorek", "roda", "Czwartek", "Pitek", "Sobota"] } }, pt: { date: { month_full: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], month_short: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], day_full: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"], day_short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"] }, labels: { dhx_cal_today_button: "Hoje", day_tab: "Dia", week_tab: "Semana", month_tab: "Mês", new_event: "Novo evento", icon_save: "Salvar", icon_cancel: "Cancelar", icon_details: "Detalhes", icon_edit: "Editar", icon_delete: "Deletar", confirm_closing: "", confirm_deleting: "Tem certeza que deseja excluir?", section_description: "Descrição", section_time: "Período de tempo", full_day: "Dia inteiro", confirm_recurring: "Deseja editar todos esses eventos repetidos?", section_recurring: "Repetir evento", button_recurring: "Desabilitar", button_recurring_open: "Habilitar", button_edit_series: "Editar a série", button_edit_occurrence: "Editar uma cópia", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Dia", date: "Data", description: "Descrição", year_tab: "Ano", week_agenda_tab: "Dia", grid_tab: "Grade", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diário", repeat_radio_week: "Semanal", repeat_radio_month: "Mensal", repeat_radio_year: "Anual", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia(s)", repeat_radio_day_type2: "Cada trabalho diário", repeat_week: " Repita cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repetir", repeat_radio_month_start: "Em", repeat_text_month_day: "todo dia", repeat_text_month_count: "mês", repeat_text_month_count2_before: "todo", repeat_text_month_count2_after: "mês", repeat_year_label: "Em", select_year_day2: "of", repeat_text_year_day: "dia", select_year_month: "mês", repeat_radio_end: "Sem data final", repeat_text_occurrences_count: "ocorrências", repeat_radio_end3: "Fim", repeat_radio_end2: "Depois", repeat_never: "Nunca", repeat_daily: "Todos os dias", repeat_workdays: "Todos os dias úteis", repeat_weekly: "Toda semana", repeat_monthly: "Todo mês", repeat_yearly: "Todo ano", repeat_custom: "Personalizado", repeat_freq_day: "Dia", repeat_freq_week: "Semana", repeat_freq_month: "Mês", repeat_freq_year: "Ano", repeat_on_date: "Na data", repeat_ends: "Termina", month_for_recurring: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], day_for_recurring: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] } }, ro: { date: { month_full: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "November", "December"], month_short: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"], day_short: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"] }, labels: { dhx_cal_today_button: "Astazi", day_tab: "Zi", week_tab: "Saptamana", month_tab: "Luna", new_event: "Eveniment nou", icon_save: "Salveaza", icon_cancel: "Anuleaza", icon_details: "Detalii", icon_edit: "Editeaza", icon_delete: "Sterge", confirm_closing: "Schimbarile nu vor fi salvate, esti sigur?", confirm_deleting: "Evenimentul va fi sters permanent, esti sigur?", section_description: "Descriere", section_time: "Interval", full_day: "Toata ziua", confirm_recurring: "Vrei sa editezi toata seria de evenimente repetate?", section_recurring: "Repetare", button_recurring: "Dezactivata", button_recurring_open: "Activata", button_edit_series: "Editeaza serie", button_edit_occurrence: "Editeaza doar intrare", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Descriere", year_tab: "An", week_agenda_tab: "Agenda", grid_tab: "Lista", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Zilnic", repeat_radio_week: "Saptamanal", repeat_radio_month: "Lunar", repeat_radio_year: "Anual", repeat_radio_day_type: "La fiecare", repeat_text_day_count: "zi(le)", repeat_radio_day_type2: "Fiecare zi lucratoare", repeat_week: " Repeta la fiecare", repeat_text_week_count: "saptamana in urmatoarele zile:", repeat_radio_month_type: "Repeta in", repeat_radio_month_start: "In a", repeat_text_month_day: "zi la fiecare", repeat_text_month_count: "luni", repeat_text_month_count2_before: "la fiecare", repeat_text_month_count2_after: "luni", repeat_year_label: "In", select_year_day2: "a lunii", repeat_text_year_day: "zi a lunii", select_year_month: "", repeat_radio_end: "Fara data de sfarsit", repeat_text_occurrences_count: "evenimente", repeat_radio_end3: "La data", repeat_radio_end2: "Dupa", repeat_never: "Niciodată", repeat_daily: "În fiecare zi", repeat_workdays: "În fiecare zi lucrătoare", repeat_weekly: "În fiecare săptămână", repeat_monthly: "În fiecare lună", repeat_yearly: "În fiecare an", repeat_custom: "Personalizat", repeat_freq_day: "Zi", repeat_freq_week: "Săptămână", repeat_freq_month: "Lună", repeat_freq_year: "An", repeat_on_date: "La data", repeat_ends: "Se termină", month_for_recurring: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"], day_for_recurring: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"] } }, ru: { date: { month_full: ["Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь", "Июль", "Август", "Сентябрь", "Oктябрь", "Ноябрь", "Декабрь"], month_short: ["Янв", "Фев", "Maр", "Aпр", "Maй", "Июн", "Июл", "Aвг", "Сен", "Окт", "Ноя", "Дек"], day_full: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сегодня", day_tab: "День", week_tab: "Неделя", month_tab: "Месяц", new_event: "Новое событие", icon_save: "Сохранить", icon_cancel: "Отменить", icon_details: "Детали", icon_edit: "Изменить", icon_delete: "Удалить", confirm_closing: "", confirm_deleting: "Событие будет удалено безвозвратно, продолжить?", section_description: "Описание", section_time: "Период времени", full_day: "Весь день", confirm_recurring: "Вы хотите изменить всю серию повторяющихся событий?", section_recurring: "Повторение", button_recurring: "Отключено", button_recurring_open: "Включено", button_edit_series: "Редактировать серию", button_edit_occurrence: "Редактировать экземпляр", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Список", date: "Дата", description: "Описание", year_tab: "Год", week_agenda_tab: "Список", grid_tab: "Таблица", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Неделя", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Каждый", repeat_text_day_count: "день", repeat_radio_day_type2: "Каждый рабочий день", repeat_week: " Повторять каждую", repeat_text_week_count: "неделю , в:", repeat_radio_month_type: "Повторять", repeat_radio_month_start: "", repeat_text_month_day: " числа каждый ", repeat_text_month_count: "месяц", repeat_text_month_count2_before: "каждый ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без даты окончания", repeat_text_occurrences_count: "повторений", repeat_radio_end3: "До ", repeat_radio_end2: "", repeat_never: "Никогда", repeat_daily: "Каждый день", repeat_workdays: "Каждый будний день", repeat_weekly: "Каждую неделю", repeat_monthly: "Каждый месяц", repeat_yearly: "Каждый год", repeat_custom: "Настроить", repeat_freq_day: "День", repeat_freq_week: "Неделя", repeat_freq_month: "Месяц", repeat_freq_year: "Год", repeat_on_date: "В дату", repeat_ends: "Заканчивается", month_for_recurring: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"], day_for_recurring: ["Воскресенье", "Понедельник", "Вторник", "Среду", "Четверг", "Пятницу", "Субботу"] } }, si: { date: { month_full: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"], day_short: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"] }, labels: { dhx_cal_today_button: "Danes", day_tab: "Dan", week_tab: "Teden", month_tab: "Mesec", new_event: "Nov dogodek", icon_save: "Shrani", icon_cancel: "Prekliči", icon_details: "Podrobnosti", icon_edit: "Uredi", icon_delete: "Izbriši", confirm_closing: "", confirm_deleting: "Dogodek bo izbrisan. Želite nadaljevati?", section_description: "Opis", section_time: "Časovni okvir", full_day: "Ves dan", confirm_recurring: "Želite urediti celoten set ponavljajočih dogodkov?", section_recurring: "Ponovi dogodek", button_recurring: "Onemogočeno", button_recurring_open: "Omogočeno", button_edit_series: "Edit series", button_edit_occurrence: "Edit occurrence", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Zadeva", date: "Datum", description: "Opis", year_tab: "Leto", week_agenda_tab: "Zadeva", grid_tab: "Miza", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dnevno", repeat_radio_week: "Tedensko", repeat_radio_month: "Mesečno", repeat_radio_year: "Letno", repeat_radio_day_type: "Vsak", repeat_text_day_count: "dan", repeat_radio_day_type2: "Vsak delovni dan", repeat_week: " Ponavljaj vsak", repeat_text_week_count: "teden na naslednje dni:", repeat_radio_month_type: "Ponavljaj", repeat_radio_month_start: "Na", repeat_text_month_day: "dan vsak", repeat_text_month_count: "mesec", repeat_text_month_count2_before: "vsak", repeat_text_month_count2_after: "mesec", repeat_year_label: "Na", select_year_day2: "od", repeat_text_year_day: "dan", select_year_month: "mesec", repeat_radio_end: "Brez končnega datuma", repeat_text_occurrences_count: "pojavitve", repeat_radio_end2: "Po", repeat_radio_end3: "Končaj do", repeat_never: "Nikoli", repeat_daily: "Vsak dan", repeat_workdays: "Vsak delovni dan", repeat_weekly: "Vsak teden", repeat_monthly: "Vsak mesec", repeat_yearly: "Vsako leto", repeat_custom: "Po meri", repeat_freq_day: "Dan", repeat_freq_week: "Teden", repeat_freq_month: "Mesec", repeat_freq_year: "Leto", repeat_on_date: "Na datum", repeat_ends: "Konča se", month_for_recurring: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], day_for_recurring: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"] } }, sk: { date: { month_full: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sept", "Okt", "Nov", "Dec"], day_full: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"], day_short: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Deň", week_tab: "Týždeň", month_tab: "Mesiac", new_event: "Nová udalosť", icon_save: "Uložiť", icon_cancel: "Späť", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Zmazať", confirm_closing: "Vaše zmeny nebudú uložené. Skutočne?", confirm_deleting: "Udalosť bude natrvalo vymazaná. Skutočne?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Prajete si upraviť celú radu opakovaných udalostí?", section_recurring: "Opakovanie udalosti", button_recurring: "Vypnuté", button_recurring_open: "Zapnuté", button_edit_series: "Upraviť opakovania", button_edit_occurrence: "Upraviť inštancie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Program", date: "Dátum", description: "Poznámka", year_tab: "Rok", full_day: "Celý deň", week_agenda_tab: "Program", grid_tab: "Mriežka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denne", repeat_radio_week: "Týždenne", repeat_radio_month: "Mesaène", repeat_radio_year: "Roène", repeat_radio_day_type: "Každý", repeat_text_day_count: "deò", repeat_radio_day_type2: "Každý prac. deò", repeat_week: "Opakova každý", repeat_text_week_count: "týždeò v dòoch:", repeat_radio_month_type: "Opakova", repeat_radio_month_start: "On", repeat_text_month_day: "deò každý", repeat_text_month_count: "mesiac", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "mesiac", repeat_year_label: "On", select_year_day2: "poèas", repeat_text_year_day: "deò", select_year_month: "mesiac", repeat_radio_end: "Bez dátumu ukonèenia", repeat_text_occurrences_count: "udalostiach", repeat_radio_end3: "Ukonèi", repeat_radio_end2: "Po", repeat_never: "Nikdy", repeat_daily: "Každý deň", repeat_workdays: "Každý pracovný deň", repeat_weekly: "Každý týždeň", repeat_monthly: "Každý mesiac", repeat_yearly: "Každý rok", repeat_custom: "Vlastné", repeat_freq_day: "Deň", repeat_freq_week: "Týždeň", repeat_freq_month: "Mesiac", repeat_freq_year: "Rok", repeat_on_date: "Na dátum", repeat_ends: "Koniec", month_for_recurring: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], day_for_recurring: ["Nede¾a", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"] } }, sv: { date: { month_full: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"], day_short: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Vecka", month_tab: "Månad", new_event: "Ny händelse", icon_save: "Spara", icon_cancel: "Ångra", icon_details: "Detaljer", icon_edit: "Ändra", icon_delete: "Ta bort", confirm_closing: "", confirm_deleting: "Är du säker på att du vill ta bort händelsen permanent?", section_description: "Beskrivning", section_time: "Tid", full_day: "Hela dagen", confirm_recurring: "Vill du redigera hela serien med repeterande händelser?", section_recurring: "Upprepa händelse", button_recurring: "Inaktiverat", button_recurring_open: "Aktiverat", button_edit_series: "Redigera serien", button_edit_occurrence: "Redigera en kopia", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Dagordning", date: "Datum", description: "Beskrivning", year_tab: "År", week_agenda_tab: "Dagordning", grid_tab: "Galler", drag_to_create: "Dra för att skapa ny", drag_to_move: "Dra för att flytta", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagligen", repeat_radio_week: "Veckovis", repeat_radio_month: "Månadsvis", repeat_radio_year: "Årligen", repeat_radio_day_type: "Var", repeat_text_day_count: "dag", repeat_radio_day_type2: "Varje arbetsdag", repeat_week: " Upprepa var", repeat_text_week_count: "vecka dessa dagar:", repeat_radio_month_type: "Upprepa", repeat_radio_month_start: "Den", repeat_text_month_day: "dagen var", repeat_text_month_count: "månad", repeat_text_month_count2_before: "var", repeat_text_month_count2_after: "månad", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "månad", repeat_radio_end: "Inget slutdatum", repeat_text_occurrences_count: "upprepningar", repeat_radio_end3: "Sluta efter", repeat_radio_end2: "Efter", repeat_never: "Aldrig", repeat_daily: "Varje dag", repeat_workdays: "Varje vardag", repeat_weekly: "Varje vecka", repeat_monthly: "Varje månad", repeat_yearly: "Varje år", repeat_custom: "Anpassad", repeat_freq_day: "Dag", repeat_freq_week: "Vecka", repeat_freq_month: "Månad", repeat_freq_year: "År", repeat_on_date: "På datum", repeat_ends: "Slutar", month_for_recurring: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], day_for_recurring: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"] } }, tr: { date: { month_full: ["Ocak", "Þubat", "Mart", "Nisan", "Mayýs", "Haziran", "Temmuz", "Aðustos", "Eylül", "Ekim", "Kasým", "Aralýk"], month_short: ["Oca", "Þub", "Mar", "Nis", "May", "Haz", "Tem", "Aðu", "Eyl", "Eki", "Kas", "Ara"], day_full: ["Pazar", "Pazartes,", "Salý", "Çarþamba", "Perþembe", "Cuma", "Cumartesi"], day_short: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"] }, labels: { dhx_cal_today_button: "Bugün", day_tab: "Gün", week_tab: "Hafta", month_tab: "Ay", new_event: "Uygun", icon_save: "Kaydet", icon_cancel: "Ýptal", icon_details: "Detaylar", icon_edit: "Düzenle", icon_delete: "Sil", confirm_closing: "", confirm_deleting: "Etkinlik silinecek, devam?", section_description: "Açýklama", section_time: "Zaman aralýðý", full_day: "Tam gün", confirm_recurring: "Tüm tekrar eden etkinlikler silinecek, devam?", section_recurring: "Etkinliði tekrarla", button_recurring: "Pasif", button_recurring_open: "Aktif", button_edit_series: "Dizi düzenleme", button_edit_occurrence: "Bir kopyasını düzenleyin", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Ajanda", date: "Tarih", description: "Açýklama", year_tab: "Yýl", week_agenda_tab: "Ajanda", grid_tab: "Izgara", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Günlük", repeat_radio_week: "Haftalık", repeat_radio_month: "Aylık", repeat_radio_year: "Yıllık", repeat_radio_day_type: "Her", repeat_text_day_count: "gün", repeat_radio_day_type2: "Her iş günü", repeat_week: " Tekrar her", repeat_text_week_count: "hafta şu günlerde:", repeat_radio_month_type: "Tekrar et", repeat_radio_month_start: "Tarihinde", repeat_text_month_day: "gün her", repeat_text_month_count: "ay", repeat_text_month_count2_before: "her", repeat_text_month_count2_after: "ay", repeat_year_label: "Tarihinde", select_year_day2: "ayın", repeat_text_year_day: "günü", select_year_month: "ay", repeat_radio_end: "Bitiş tarihi yok", repeat_text_occurrences_count: "olay", repeat_radio_end2: "Sonra", repeat_radio_end3: "Tarihinde bitir", repeat_never: "Asla", repeat_daily: "Her gün", repeat_workdays: "Her iş günü", repeat_weekly: "Her hafta", repeat_monthly: "Her ay", repeat_yearly: "Her yıl", repeat_custom: "Özel", repeat_freq_day: "Gün", repeat_freq_week: "Hafta", repeat_freq_month: "Ay", repeat_freq_year: "Yıl", repeat_on_date: "Tarihinde", repeat_ends: "Biter", month_for_recurring: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"], day_for_recurring: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"] } }, ua: { date: { month_full: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"], month_short: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"], day_full: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"], day_short: ["Нед", "Пон", "Вів", "Сер", "Чет", "Птн", "Суб"] }, labels: { dhx_cal_today_button: "Сьогодні", day_tab: "День", week_tab: "Тиждень", month_tab: "Місяць", new_event: "Нова подія", icon_save: "Зберегти", icon_cancel: "Відміна", icon_details: "Деталі", icon_edit: "Редагувати", icon_delete: "Вилучити", confirm_closing: "", confirm_deleting: "Подія вилучиться назавжди. Ви впевнені?", section_description: "Опис", section_time: "Часовий проміжок", full_day: "Весь день", confirm_recurring: "Хочете редагувати весь перелік повторюваних подій?", section_recurring: "Повторювана подія", button_recurring: "Відключено", button_recurring_open: "Включено", button_edit_series: "Редагувати серію", button_edit_occurrence: "Редагувати примірник", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Перелік", date: "Дата", description: "Опис", year_tab: "Рік", week_agenda_tab: "Перелік", grid_tab: "Таблиця", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Тиждень", repeat_radio_month: "Місяць", repeat_radio_year: "Рік", repeat_radio_day_type: "Кожний", repeat_text_day_count: "день", repeat_radio_day_type2: "Кожний робочий день", repeat_week: " Повторювати кожен", repeat_text_week_count: "тиждень , по:", repeat_radio_month_type: "Повторювати", repeat_radio_month_start: "", repeat_text_month_day: " числа кожний ", repeat_text_month_count: "місяць", repeat_text_month_count2_before: "кожен ", repeat_text_month_count2_after: "місяць", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без дати закінчення", repeat_text_occurrences_count: "повторень", repeat_radio_end3: "До ", repeat_radio_end2: "", repeat_never: "Ніколи", repeat_daily: "Щодня", repeat_workdays: "Щодня в робочі дні", repeat_weekly: "Щотижня", repeat_monthly: "Щомісяця", repeat_yearly: "Щороку", repeat_custom: "Налаштоване", repeat_freq_day: "День", repeat_freq_week: "Тиждень", repeat_freq_month: "Місяць", repeat_freq_year: "Рік", repeat_on_date: "На дату", repeat_ends: "Закінчується", month_for_recurring: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"], day_for_recurring: ["Неділям", "Понеділкам", "Вівторкам", "Середам", "Четвергам", "П'ятницям", "Суботам"] } } }, Symbol.toStringTag, { value: "Module" }));
function bt() {
  if (typeof window > "u")
    return !0;
  const e = typeof location < "u" ? location.hostname : window.location.hostname, i = ["ZGh0bWx4LmNvbQ==", "ZGh0bWx4Y29kZS5jb20=", "d2ViaXhjb2RlLmNvbQ==", "d2ViaXguaW8=", "cmVwbC5jbw==", "Y3NiLmFwcA==", "cmVwbGl0LmRldg=="];
  for (let t = 0; t < i.length; t++) {
    const a = window.atob(i[t]);
    if (a === e || e.endsWith("." + a))
      return !0;
  }
  return !1;
}
const Ia = (e) => {
  bt() || setTimeout(() => {
    const i = ["Your evaluation period for dhtmlxScheduler has expired.", "Please contact us at <a href='mailto:contact@dhtmlx.com?subject=dhtmlxScheduler licensing' target='_blank'>contact@dhtmlx.com</a> or visit", "<a href='https://dhtmlx.com/docs/products/dhtmlxScheduler' target='_blank'>dhtmlx.com</a> in order to obtain a license."].join("<br>");
    if (typeof BUILD_TIMESTAMP > "u")
      return;
    const t = `$_${Date.now()}_validate`, a = setInterval(() => {
      Date.now() - BUILD_TIMESTAMP > 27648e5 && e.message({ type: "error", text: i, expire: -1, id: t });
    }, (s = 6e4, n = 18e4, Math.floor(Math.random() * (n - s + 1)) + s));
    var s, n;
    e.attachEvent("onDestroy", function() {
      clearInterval(a);
    });
  }, 1);
}, Va = (e) => {
  bt() || setTimeout(function() {
    const i = ["Your evaluation period for dhtmlxScheduler has expired.", "Please contact us at <a href='mailto:contact@dhtmlx.com?subject=dhtmlxScheduler licensing' target='_blank'>contact@dhtmlx.com</a> or visit", "<a href='https://dhtmlx.com/docs/products/dhtmlxScheduler' target='_blank'>dhtmlx.com</a> in order to obtain a license."].join("<br>");
    if (typeof BUILD_TIMESTAMP > "u")
      return;
    const t = `$_${Date.now()}_validate`, a = setInterval(function() {
      Date.now() - BUILD_TIMESTAMP > 5184e6 && e.message({ type: "error", text: i, expire: -1, id: t });
    }, (s = 9e4, n = 18e4, Math.floor(Math.random() * (n - s + 1)) + s));
    var s, n;
    e.attachEvent("onDestroy", function() {
      clearInterval(a);
    });
  }, 1);
}, Ya = (e) => {
  bt() || setTimeout(function() {
    const i = ["Your evaluation period for dhtmlxScheduler has expired.", "Please contact us at contact@dhtmlx.com or visit", "https://dhtmlx.com/docs/products/dhtmlxScheduler in order to obtain a license."].join(`
`);
    if (typeof BUILD_TIMESTAMP > "u")
      return;
    const t = function() {
      var a, s;
      setTimeout(function() {
        Date.now() - BUILD_TIMESTAMP > 7776e6 && I.alert(i), t();
      }, (a = 12e4, s = 24e4, Math.floor(Math.random() * (s - a + 1)) + a));
    };
    t();
  }, 1);
};
class Fa {
  constructor(i, t, a = {}) {
    this.state = { date: /* @__PURE__ */ new Date(), modes: ["days", "months", "years"], currentRange: [], eventDates: [], filterDays: null, currentModeIndex: 0, ...a }, this.container = null, this.element = null, this.onStateChangeHandlers = [], this.scheduler = i, this._domEvents = i._createDomEventScope(), this.state = this.getState(), nt(this), t && (this.container = t, this.render(this.container)), this.onStateChange((s, n) => {
      this.callEvent("onStateChange", [n, s]);
    });
  }
  getState() {
    return { ...this.state, mode: this.state.modes[this.state.currentModeIndex] };
  }
  setState(i) {
    const t = { ...this.state };
    i.mode && (i.currentModeIndex = this.state.modes.indexOf(i.mode)), this.state = { ...this.state, ...i }, this._notifyStateChange(t, this.state), this.container && this.render(this.container);
  }
  onStateChange(i) {
    return this.onStateChangeHandlers.push(i), () => {
      const t = this.onStateChangeHandlers.indexOf(i);
      t !== -1 && this.onStateChangeHandlers.splice(t, 1);
    };
  }
  _notifyStateChange(i, t) {
    this.onStateChangeHandlers.forEach((a) => a(i, t));
  }
  _adjustDate(i) {
    const { mode: t, date: a } = this.getState(), s = new Date(a);
    t === "days" ? s.setMonth(a.getMonth() + i) : t === "months" ? s.setFullYear(a.getFullYear() + i) : s.setFullYear(a.getFullYear() + 10 * i), this.setState({ date: s });
  }
  _toggleMode() {
    const i = (this.state.currentModeIndex + 1) % this.state.modes.length;
    this.setState({ currentModeIndex: i });
  }
  _renderCalendarHeader(i) {
    const { mode: t, date: a } = this.getState(), s = document.createElement("div");
    s.classList.add("dhx_cal_datepicker_header");
    const n = document.createElement("button");
    n.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_left"), s.appendChild(n);
    const _ = document.createElement("div");
    if (_.classList.add("dhx_cal_datepicker_title"), t === "days")
      _.innerText = a.toLocaleString("default", { month: "long" }) + " " + a.getFullYear();
    else if (t === "months")
      _.innerText = a.getFullYear();
    else {
      const r = 10 * Math.floor(a.getFullYear() / 10);
      _.innerText = `${r} - ${r + 9}`;
    }
    this._domEvents.attach(_, "click", this._toggleMode.bind(this)), s.appendChild(_);
    const d = document.createElement("button");
    d.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_right"), s.appendChild(d), i.appendChild(s), this._domEvents.attach(n, "click", this._adjustDate.bind(this, -1)), this._domEvents.attach(d, "click", this._adjustDate.bind(this, 1));
  }
  render(i) {
    this._domEvents.detachAll(), this.container = i || this.container, this.container.innerHTML = "", this.element || (this.element = document.createElement("div"), this.element.classList.add("dhx_cal_datepicker")), this.element.innerHTML = "", this.container.appendChild(this.element), this._renderCalendarHeader(this.element);
    const t = document.createElement("div");
    t.classList.add("dhx_cal_datepicker_data"), this.element.appendChild(t);
    const { mode: a } = this.getState();
    a === "days" ? this._renderDayGrid(t) : a === "months" ? this._renderMonthGrid(t) : this._renderYearGrid(t);
  }
  _renderDayGridHeader(i) {
    const { date: t, filterDays: a } = this.getState(), s = this.scheduler;
    let n = s.date.week_start(new Date(t));
    const _ = s.date.add(s.date.week_start(new Date(t)), 1, "week");
    i.classList.add("dhx_cal_datepicker_days");
    const d = s.date.date_to_str("%D");
    for (; n.valueOf() < _.valueOf(); ) {
      if (!a || !a(n)) {
        const r = d(n), o = document.createElement("div");
        o.setAttribute("data-day", n.getDay()), o.classList.add("dhx_cal_datepicker_dayname"), o.innerText = r, i.appendChild(o);
      }
      n = s.date.add(n, 1, "day");
    }
  }
  _weeksBetween(i, t) {
    const a = this.scheduler;
    let s = 0, n = new Date(i);
    for (; n.valueOf() < t.valueOf(); )
      s += 1, n = a.date.week_start(a.date.add(n, 1, "week"));
    return s;
  }
  _renderDayGrid(i) {
    const { date: t, currentRange: a, eventDates: s, minWeeks: n, filterDays: _ } = this.getState();
    let d = a[0], r = a[1];
    const o = s.reduce((w, E) => (w[this.scheduler.date.day_start(new Date(E)).valueOf()] = !0, w), {}), c = document.createElement("div");
    this._renderDayGridHeader(c);
    const h = c.children.length;
    i.appendChild(c), h !== 7 && i.style.setProperty("--dhx-scheduler-week-length", h);
    const y = this.scheduler, b = y.date.week_start(y.date.month_start(new Date(t))), p = y.date.month_start(new Date(t)), u = y.date.add(y.date.month_start(new Date(t)), 1, "month");
    let m = y.date.add(y.date.month_start(new Date(t)), 1, "month");
    const l = y.date.date_part(y._currentDate());
    m.getDay() !== 0 && (m = y.date.add(y.date.week_start(m), 1, "week"));
    let f = this._weeksBetween(b, m);
    n && f < n && (m = y.date.add(m, n - f, "week"));
    let g = b;
    const x = document.createElement("div");
    for (x.classList.add("dhx_cal_datepicker_days"), this._domEvents.attach(x, "click", (w) => {
      const E = w.target.closest("[data-cell-date]"), k = new Date(E.getAttribute("data-cell-date"));
      this.callEvent("onDateClick", [k, w]);
    }); g.valueOf() < m.valueOf(); ) {
      if (!_ || !_(g)) {
        const w = document.createElement("div");
        w.setAttribute("data-cell-date", y.templates.format_date(g)), w.setAttribute("data-day", g.getDay()), w.innerHTML = y.templates.month_day(g), g.valueOf() < p.valueOf() ? w.classList.add("dhx_before") : g.valueOf() >= u.valueOf() && w.classList.add("dhx_after"), g.getDay() !== 0 && g.getDay() !== 6 || w.classList.add("dhx_cal_datepicker_weekend"), g.valueOf() == l.valueOf() && w.classList.add("dhx_now"), d && r && g.valueOf() >= d.valueOf() && g.valueOf() < r.valueOf() && w.classList.add("dhx_cal_datepicker_current"), o[g.valueOf()] && w.classList.add("dhx_cal_datepicker_event"), w.classList.add("dhx_cal_datepicker_date"), x.appendChild(w);
      }
      g = y.date.add(g, 1, "day");
    }
    i.appendChild(x);
  }
  _renderMonthGrid(i) {
    const { date: t } = this.getState(), a = document.createElement("div");
    a.classList.add("dhx_cal_datepicker_months");
    const s = [];
    for (let r = 0; r < 12; r++)
      s.push(new Date(t.getFullYear(), r, 1));
    const n = this.scheduler.date.date_to_str("%M");
    s.forEach((r) => {
      const o = document.createElement("div");
      o.classList.add("dhx_cal_datepicker_month"), t.getMonth() === r.getMonth() && o.classList.add("dhx_cal_datepicker_current"), o.setAttribute("data-month", r.getMonth()), o.innerHTML = n(r), this._domEvents.attach(o, "click", () => {
        const c = new Date(r);
        this.setState({ date: c, mode: "days" });
      }), a.appendChild(o);
    }), i.appendChild(a);
    const _ = document.createElement("div");
    _.classList.add("dhx_cal_datepicker_done");
    const d = document.createElement("button");
    d.innerText = "Done", d.classList.add("dhx_cal_datepicker_done_btn"), this._domEvents.attach(d, "click", () => {
      this.setState({ mode: "days" });
    }), _.appendChild(d), i.appendChild(_);
  }
  _renderYearGrid(i) {
    const { date: t } = this.getState(), a = 10 * Math.floor(t.getFullYear() / 10), s = document.createElement("div");
    s.classList.add("dhx_cal_datepicker_years");
    for (let d = a - 1; d <= a + 10; d++) {
      const r = document.createElement("div");
      r.innerText = d, r.classList.add("dhx_cal_datepicker_year"), r.setAttribute("data-year", d), t.getFullYear() === d && r.classList.add("dhx_cal_datepicker_current"), this._domEvents.attach(r, "click", () => {
        this.setState({ date: new Date(d, t.getMonth(), 1), mode: "months" });
      }), s.appendChild(r);
    }
    i.appendChild(s);
    const n = document.createElement("div");
    n.classList.add("dhx_cal_datepicker_done");
    const _ = document.createElement("button");
    _.innerText = "Done", _.classList.add("dhx_cal_datepicker_done_btn"), this._domEvents.attach(_, "click", () => {
      this.setState({ mode: "months" });
    }), n.appendChild(_), i.appendChild(n);
  }
  destructor() {
    this.onStateChangeHandlers = [], this.element && (this.element.innerHTML = "", this.element.remove()), this._domEvents.detachAll(), this.callEvent("onDestroy", []), this.detachAllEvents(), this.scheduler = null;
  }
}
function Ua(e) {
  const i = { version: "7.2.8" };
  i.$stateProvider = function() {
    const r = {};
    return { getState: function(o) {
      if (r[o])
        return r[o].method();
      {
        const c = {};
        for (const h in r)
          r[h].internal || ve.mixin(c, r[h].method(), !0);
        return c;
      }
    }, registerProvider: function(o, c, h) {
      r[o] = { method: c, internal: h };
    }, unregisterProvider: function(o) {
      delete r[o];
    } };
  }(), i.getState = i.$stateProvider.getState, function(r) {
    var o = { agenda: "https://docs.dhtmlx.com/scheduler/agenda_view.html", grid: "https://docs.dhtmlx.com/scheduler/grid_view.html", map: "https://docs.dhtmlx.com/scheduler/map_view.html", unit: "https://docs.dhtmlx.com/scheduler/units_view.html", timeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html", week_agenda: "https://docs.dhtmlx.com/scheduler/weekagenda_view.html", year: "https://docs.dhtmlx.com/scheduler/year_view.html", anythingElse: "https://docs.dhtmlx.com/scheduler/views.html" }, c = { agenda: "scheduler.plugins({ agenda_view: true })", grid: "scheduler.plugins({ grid_view: true })", map: "scheduler.plugins({ map_view: true })", unit: "scheduler.plugins({ units: true })", timeline: "scheduler.plugins({ timeline: true, treetimeline: true, daytimeline: true})", week_agenda: "scheduler.plugins({ week_agenda: true })", year: "scheduler.plugins({ year_view: true })", limit: "scheduler.plugins({ limit: true })" };
    r._commonErrorMessages = { unknownView: function(h) {
      var y = c[h] ? "You're probably missing " + c[h] + "." : "";
      return "`" + h + "` view is not defined. \nPlease check parameters you pass to `scheduler.init` or `scheduler.setCurrentView` in your code and ensure you've imported appropriate extensions. \nRelated docs: " + (o[h] || o.anythingElse) + `
` + (y ? y + `
` : "");
    }, collapsedContainer: function(h) {
      return `Scheduler container height is set to *100%* but the rendered height is zero and the scheduler is not visible. 
Make sure that the container has some initial height or use different units. For example:
<div id='scheduler_here' class='dhx_cal_container' style='width:100%; height:600px;'> 
`;
    } }, r.createTimelineView = function() {
      throw new Error("scheduler.createTimelineView is not implemented. Be sure to add the required extension: " + c.timeline + `
Related docs: ` + o.timeline);
    }, r.createUnitsView = function() {
      throw new Error("scheduler.createUnitsView is not implemented. Be sure to add the required extension: " + c.unit + `
Related docs: ` + o.unit);
    }, r.createGridView = function() {
      throw new Error("scheduler.createGridView is not implemented. Be sure to add the required extension: " + c.grid + `
Related docs: ` + o.grid);
    }, r.addMarkedTimespan = function() {
      throw new Error(`scheduler.addMarkedTimespan is not implemented. Be sure to add the required extension: scheduler.plugins({ limit: true })
Related docs: https://docs.dhtmlx.com/scheduler/limits.html`);
    }, r.renderCalendar = function() {
      throw new Error(`scheduler.renderCalendar is not implemented. Be sure to add the required extension: scheduler.plugins({ minical: true })
https://docs.dhtmlx.com/scheduler/minicalendar.html`);
    }, r.exportToPNG = function() {
      throw new Error(["scheduler.exportToPNG is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/png.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join(`
`));
    }, r.exportToPDF = function() {
      throw new Error(["scheduler.exportToPDF is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/pdf.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join(`
`));
    };
  }(i), Da(i), function(r) {
    nt(r), wa(r), r._detachDomEvent = function(u, m, l) {
      u.removeEventListener ? u.removeEventListener(m, l, !1) : u.detachEvent && u.detachEvent("on" + m, l);
    }, r._init_once = function() {
      ka(r), r._init_once = function() {
      };
    };
    const o = { render: function(u) {
      return r._init_nav_bar(u);
    } }, c = { render: function(u) {
      const m = document.createElement("div");
      return m.className = "dhx_cal_header", m;
    } }, h = { render: function(u) {
      const m = document.createElement("div");
      return m.className = "dhx_cal_data", m;
    } };
    function y(u) {
      return !!(u.querySelector(".dhx_cal_header") && u.querySelector(".dhx_cal_data") && u.querySelector(".dhx_cal_navline"));
    }
    r.init = function(u, m, l) {
      if (!this.$destroyed) {
        if (m = m || r._currentDate(), l = l || "week", this._obj && this.unset_actions(), this._obj = typeof u == "string" ? document.getElementById(u) : u, this.$container = this._obj, this.$root = this._obj, !this.$container.offsetHeight && this.$container.offsetWidth && this.$container.style.height === "100%" && window.console.error(r._commonErrorMessages.collapsedContainer(), this.$container), this.config.wai_aria_attributes && this.config.wai_aria_application_role && this.$container.setAttribute("role", "application"), this.config.header || y(this.$container) || (this.config.header = function(f) {
          const g = ["day", "week", "month"];
          if (f.matrix)
            for (const x in f.matrix)
              g.push(x);
          if (f._props)
            for (const x in f._props)
              g.push(x);
          if (f._grid && f._grid.names)
            for (const x in f._grid.names)
              g.push(x);
          return ["map", "agenda", "week_agenda", "year"].forEach(function(x) {
            f[x + "_view"] && g.push(x);
          }), g.concat(["date"]).concat(["prev", "today", "next"]);
        }(this), window.console.log(["Required DOM elements are missing from the scheduler container and **scheduler.config.header** is not specified.", "Using a default header configuration: ", "scheduler.config.header = " + JSON.stringify(this.config.header, null, 2), "Check this article for the details: https://docs.dhtmlx.com/scheduler/initialization.html"].join(`
`))), this.config.header)
          this.$container.innerHTML = "", this.$container.classList.add("dhx_cal_container"), this.config.header.height && (this.xy.nav_height = this.config.header.height), this.$container.appendChild(o.render(this.config.header)), this.$container.appendChild(c.render()), this.$container.appendChild(h.render());
        else if (!y(this.$container))
          throw new Error(["Required DOM elements are missing from the scheduler container.", "Be sure to either specify them manually in the markup: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviamarkup", "Or to use **scheduler.config.header** setting so they could be created automatically: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviaheaderconfig"].join(`
`));
        this.config.rtl && (this.$container.className += " dhx_cal_container_rtl"), this._skin_init && r._skin_init(), r.date.init(), this._scroll = !0, this._els = [], this.get_elements(), this.init_templates(), this.set_actions(), this._init_once(), this._init_touch_events(), this.set_sizes(), r.callEvent("onSchedulerReady", []), r.$initialized = !0, this.setCurrentView(m, l);
      }
    }, r.xy = { min_event_height: 20, bar_height: 24, scale_width: 50, scroll_width: 18, scale_height: 20, month_scale_height: 20, menu_width: 25, margin_top: 0, margin_left: 0, editor_width: 140, month_head_height: 22, event_header_height: 14 }, r.keys = { edit_save: 13, edit_cancel: 27 }, r.bind = function(u, m) {
      return u.bind ? u.bind(m) : function() {
        return u.apply(m, arguments);
      };
    }, r.set_sizes = function() {
      var u = this._x = this._obj.clientWidth - this.xy.margin_left, m = this._table_view ? 0 : this.xy.scale_width + this.xy.scroll_width, l = this.$container.querySelector(".dhx_cal_scale_placeholder");
      r._is_material_skin() ? (l || ((l = document.createElement("div")).className = "dhx_cal_scale_placeholder", this.$container.insertBefore(l, this._els.dhx_cal_header[0])), l.style.display = "block", this.set_xy(l, u, this.xy.scale_height + 1, 0, this._els.dhx_cal_header[0].offsetTop)) : l && l.parentNode.removeChild(l), this._lightbox && (r.$container.offsetWidth < 1200 || this._setLbPosition(document.querySelector(".dhx_cal_light"))), this._data_width = u - m, this._els.dhx_cal_navline[0].style.width = u + "px";
      const f = this._els.dhx_cal_header[0];
      this.set_xy(f, this._data_width, this.xy.scale_height), f.style.left = "", f.style.right = "", this._table_view ? this.config.rtl ? f.style.right = "-1px" : f.style.left = "-1px" : this.config.rtl ? f.style.right = `${this.xy.scale_width}px` : f.style.left = `${this.xy.scale_width}px`;
    }, r.set_xy = function(u, m, l, f, g) {
      function x(E) {
        let k = E;
        return isNaN(Number(k)) || (k = Math.max(0, k) + "px"), k;
      }
      var w = "left";
      m !== void 0 && (u.style.width = x(m)), l !== void 0 && (u.style.height = x(l)), arguments.length > 3 && (f !== void 0 && (this.config.rtl && (w = "right"), u.style[w] = f + "px"), g !== void 0 && (u.style.top = g + "px"));
    }, r.get_elements = function() {
      const u = this._obj.getElementsByTagName("DIV");
      for (let m = 0; m < u.length; m++) {
        let l = r._getClassName(u[m]);
        const f = u[m].getAttribute("data-tab") || u[m].getAttribute("name") || "";
        l && (l = l.split(" ")[0]), this._els[l] || (this._els[l] = []), this._els[l].push(u[m]);
        let g = r.locale.labels[f + "_tab"] || r.locale.labels[f || l];
        typeof g != "string" && f && !u[m].innerHTML && (g = f.split("_")[0]), g && (this._waiAria.labelAttr(u[m], g), u[m].innerHTML = g);
      }
    };
    const b = r._createDomEventScope();
    function p(u, m) {
      const l = new Date(u), f = (new Date(m).getTime() - l.getTime()) / 864e5;
      return Math.abs(f);
    }
    r.unset_actions = function() {
      b.detachAll();
    }, r.set_actions = function() {
      for (const u in this._els)
        if (this._click[u])
          for (let m = 0; m < this._els[u].length; m++) {
            const l = this._els[u][m], f = this._click[u].bind(l);
            b.attach(l, "click", f);
          }
      b.attach(this._obj, "selectstart", function(u) {
        return u.preventDefault(), !1;
      }), b.attach(this._obj, "mousemove", function(u) {
        r._temp_touch_block || r._on_mouse_move(u);
      }), b.attach(this._obj, "mousedown", function(u) {
        r._ignore_next_click || r._on_mouse_down(u);
      }), b.attach(this._obj, "mouseup", function(u) {
        r._ignore_next_click || r._on_mouse_up(u);
      }), b.attach(this._obj, "dblclick", function(u) {
        r._on_dbl_click(u);
      }), b.attach(this._obj, "contextmenu", function(u) {
        return r.checkEvent("onContextMenu") && u.preventDefault(), r.callEvent("onContextMenu", [r._locate_event(u.target), u]);
      });
    }, r.select = function(u) {
      this._select_id != u && (r._close_not_saved(), this.editStop(!1), this._select_id && this.unselect(), this._select_id = u, this.updateEvent(u), this.callEvent("onEventSelected", [u]));
    }, r.unselect = function(u) {
      if (u && u != this._select_id)
        return;
      const m = this._select_id;
      this._select_id = null, m && this.getEvent(m) && this.updateEvent(m), this.callEvent("onEventUnselected", [m]);
    }, r.$stateProvider.registerProvider("global", (function() {
      return { mode: this._mode, date: new Date(this._date), min_date: new Date(this._min_date), max_date: new Date(this._max_date), editor_id: this._edit_id, lightbox_id: this._lightbox_id, new_event: this._new_event, select_id: this._select_id, expanded: this.expanded, drag_id: this._drag_id, drag_mode: this._drag_mode };
    }).bind(r)), r._click = { dhx_cal_data: function(u) {
      if (r._ignore_next_click)
        return u.preventDefault && u.preventDefault(), u.cancelBubble = !0, r._ignore_next_click = !1, !1;
      const m = r._locate_event(u.target);
      if (m) {
        if (!r.callEvent("onClick", [m, u]) || r.config.readonly)
          return;
      } else
        r.callEvent("onEmptyClick", [r.getActionData(u).date, u]);
      if (m && r.config.select) {
        r.select(m);
        const l = u.target.closest(".dhx_menu_icon"), f = r._getClassName(l);
        f.indexOf("_icon") != -1 && r._click.buttons[f.split(" ")[1].replace("icon_", "")](m);
      } else
        r._close_not_saved(), r.getState().select_id && (/* @__PURE__ */ new Date()).valueOf() - (r._new_event || 0) > 500 && r.unselect();
    }, dhx_cal_prev_button: function() {
      r._click.dhx_cal_next_button(0, -1);
    }, dhx_cal_next_button: function(u, m) {
      let l = 1;
      r.config.rtl && (m = -m, l = -l), r.setCurrentView(r.date.add(r.date[r._mode + "_start"](new Date(r._date)), m || l, r._mode));
    }, dhx_cal_today_button: function() {
      r.callEvent("onBeforeTodayDisplayed", []) && r.setCurrentView(r._currentDate());
    }, dhx_cal_tab: function() {
      const u = this.getAttribute("data-tab"), m = this.getAttribute("name"), l = u || m.substring(0, m.search("_tab"));
      r.setCurrentView(r._date, l);
    }, buttons: { delete: function(u) {
      const m = r.locale.labels.confirm_deleting;
      r._delete_event_confirm({ event: r.getEvent(u), message: m, title: r.locale.labels.title_confirm_deleting, callback: function() {
        r.deleteEvent(u);
      }, config: { ok: r.locale.labels.icon_delete } });
    }, edit: function(u) {
      r.edit(u);
    }, save: function(u) {
      r.editStop(!0);
    }, details: function(u) {
      r.showLightbox(u);
    }, form: function(u) {
      r.showLightbox(u);
    }, cancel: function(u) {
      r.editStop(!1);
    } } }, r._dhtmlx_confirm = function({ message: u, title: m, callback: l, config: f }) {
      if (!u)
        return l();
      f = f || {};
      const g = { ...f, text: u };
      m && (g.title = m), l && (g.callback = function(x) {
        x && l();
      }), r.confirm(g);
    }, r.addEventNow = function(u, m, l) {
      let f = {};
      r._isObject(u) && !r._isDate(u) && (f = u, u = null);
      const g = 6e4 * (this.config.event_duration || this.config.time_step);
      u || (u = f.start_date || Math.round(r._currentDate().valueOf() / g) * g);
      let x = new Date(u);
      if (!m) {
        let k = this.config.first_hour;
        k > x.getHours() && (x.setHours(k), u = x.valueOf()), m = u.valueOf() + g;
      }
      let w = new Date(m);
      x.valueOf() == w.valueOf() && w.setTime(w.valueOf() + g), f.start_date = f.start_date || x, f.end_date = f.end_date || w, f.text = f.text || this.locale.labels.new_event, f.id = this._drag_id = f.id || this.uid(), this._drag_mode = "new-size", this._loading = !0;
      const E = this.addEvent(f);
      return this.callEvent("onEventCreated", [this._drag_id, l]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(l), E;
    }, r._on_dbl_click = function(u, m) {
      if (m = m || u.target, this.config.readonly)
        return;
      const l = r._getClassName(m).split(" ")[0];
      switch (l) {
        case "dhx_scale_holder":
        case "dhx_scale_holder_now":
        case "dhx_month_body":
        case "dhx_wa_day_data":
          if (!r.config.dblclick_create)
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
          const f = this._locate_event(m);
          if (!this.callEvent("onDblClick", [f, u]))
            return;
          this.config.details_on_dblclick || this._table_view || !this.getEvent(f)._timed || !this.config.select ? this.showLightbox(f) : this.edit(f);
          break;
        }
        case "dhx_time_block":
        case "dhx_cal_container":
          return;
        default: {
          const f = this["dblclick_" + l];
          if (f)
            f.call(this, u);
          else if (m.parentNode && m != this)
            return r._on_dbl_click(u, m.parentNode);
          break;
        }
      }
    }, r._get_column_index = function(u) {
      let m = 0;
      if (this._cols) {
        let l = 0, f = 0;
        for (; l + this._cols[f] < u && f < this._cols.length; )
          l += this._cols[f], f++;
        if (m = f + (this._cols[f] ? (u - l) / this._cols[f] : 0), this._ignores && m >= this._cols.length)
          for (; m >= 1 && this._ignores[Math.floor(m)]; )
            m--;
      }
      return m;
    }, r._week_indexes_from_pos = function(u) {
      if (this._cols) {
        const m = this._get_column_index(u.x);
        return u.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(m) - 1)), u.y = Math.max(0, Math.ceil(60 * u.y / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step), u;
      }
      return u;
    }, r._mouse_coords = function(u) {
      let m;
      const l = document.body, f = document.documentElement;
      m = this.$env.isIE || !u.pageX && !u.pageY ? { x: u.clientX + (l.scrollLeft || f.scrollLeft || 0) - l.clientLeft, y: u.clientY + (l.scrollTop || f.scrollTop || 0) - l.clientTop } : { x: u.pageX, y: u.pageY }, this.config.rtl && this._colsS ? (m.x = this.$container.querySelector(".dhx_cal_data").offsetWidth - m.x, m.x += this.$domHelpers.getAbsoluteLeft(this._obj), this._mode !== "month" && (m.x -= this.xy.scale_width)) : m.x -= this.$domHelpers.getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width);
      const g = this.$container.querySelector(".dhx_cal_data");
      m.y -= this.$domHelpers.getAbsoluteTop(g) - this._els.dhx_cal_data[0].scrollTop, m.ev = u;
      const x = this["mouse_" + this._mode];
      if (x)
        m = x.call(this, m);
      else if (this._table_view) {
        const w = this._get_column_index(m.x);
        if (!this._cols || !this._colsS)
          return m;
        let E = 0;
        for (E = 1; E < this._colsS.heights.length && !(this._colsS.heights[E] > m.y); E++)
          ;
        m.y = Math.ceil(24 * (Math.max(0, w) + 7 * Math.max(0, E - 1)) * 60 / this.config.time_step), (r._drag_mode || this._mode == "month") && (m.y = 24 * (Math.max(0, Math.ceil(w) - 1) + 7 * Math.max(0, E - 1)) * 60 / this.config.time_step), this._drag_mode == "move" && r._ignores_detected && r.config.preserve_length && (m._ignores = !0, this._drag_event._event_length || (this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, { x_step: 1, x_unit: "day" }))), m.x = 0;
      } else
        m = this._week_indexes_from_pos(m);
      return m.timestamp = +/* @__PURE__ */ new Date(), m;
    }, r._close_not_saved = function() {
      if ((/* @__PURE__ */ new Date()).valueOf() - (r._new_event || 0) > 500 && r._edit_id) {
        const u = r.locale.labels.confirm_closing;
        r._dhtmlx_confirm({ message: u, title: r.locale.labels.title_confirm_closing, callback: function() {
          r.editStop(r.config.positive_closing);
        } }), u && (this._drag_id = this._drag_pos = this._drag_mode = null);
      }
    }, r._correct_shift = function(u, m) {
      return u - 6e4 * (new Date(r._min_date).getTimezoneOffset() - new Date(u).getTimezoneOffset()) * (m ? -1 : 1);
    }, r._is_pos_changed = function(u, m) {
      function l(f, g, x) {
        return Math.abs(f - g) > x;
      }
      return !u || !this._drag_pos || !!(this._drag_pos.has_moved || !this._drag_pos.timestamp || m.timestamp - this._drag_pos.timestamp > 100 || l(u.ev.clientX, m.ev.clientX, 5) || l(u.ev.clientY, m.ev.clientY, 5));
    }, r._correct_drag_start_date = function(u) {
      let m;
      r.matrix && (m = r.matrix[r._mode]), m = m || { x_step: 1, x_unit: "day" }, u = new Date(u);
      let l = 1;
      return (m._start_correction || m._end_correction) && (l = 60 * (m.last_hour || 0) - (60 * u.getHours() + u.getMinutes()) || 1), 1 * u + (r._get_fictional_event_length(u, l, m) - l);
    }, r._correct_drag_end_date = function(u, m) {
      let l;
      r.matrix && (l = r.matrix[r._mode]), l = l || { x_step: 1, x_unit: "day" };
      const f = 1 * u + r._get_fictional_event_length(u, m, l);
      return new Date(1 * f - (r._get_fictional_event_length(f, -1, l, -1) + 1));
    }, r._on_mouse_move = function(u) {
      if (this._drag_mode) {
        var m = this._mouse_coords(u);
        if (this._is_pos_changed(this._drag_pos, m)) {
          var l, f;
          if (this._edit_id != this._drag_id && this._close_not_saved(), !this._drag_mode)
            return;
          var g = null;
          if (this._drag_pos && !this._drag_pos.has_moved && ((g = this._drag_pos).has_moved = !0), this._drag_pos = m, this._drag_pos.has_moved = !0, this._drag_mode == "create") {
            if (g && (m = g), this._close_not_saved(), this.unselect(this._select_id), this._loading = !0, l = this._get_date_from_pos(m).valueOf(), !this._drag_start)
              return this.callEvent("onBeforeEventCreated", [u, this._drag_id]) ? (this._loading = !1, void (this._drag_start = l)) : void (this._loading = !1);
            f = l, this._drag_start;
            var x = new Date(this._drag_start), w = new Date(f);
            this._mode != "day" && this._mode != "week" || x.getHours() != w.getHours() || x.getMinutes() != w.getMinutes() || (w = new Date(this._drag_start + 1e3)), this._drag_id = this.uid(), this.addEvent(x, w, this.locale.labels.new_event, this._drag_id, m.fields), this.callEvent("onEventCreated", [this._drag_id, u]), this._loading = !1, this._drag_mode = "new-size";
          }
          var E, k = this.config.time_step, S = this.getEvent(this._drag_id);
          if (r.matrix && (E = r.matrix[r._mode]), E = E || { x_step: 1, x_unit: "day" }, this._drag_mode == "move")
            l = this._min_date.valueOf() + 6e4 * (m.y * this.config.time_step + 24 * m.x * 60), !m.custom && this._table_view && (l += 1e3 * this.date.time_part(S.start_date)), !this._table_view && this._dragEventBody && this._drag_event._move_event_shift === void 0 && (this._drag_event._move_event_shift = l - S.start_date), this._drag_event._move_event_shift && (l -= this._drag_event._move_event_shift), l = this._correct_shift(l), m._ignores && this.config.preserve_length && this._table_view && E ? (l = r._correct_drag_start_date(l), f = r._correct_drag_end_date(l, this._drag_event._event_length)) : f = S.end_date.valueOf() - (S.start_date.valueOf() - l);
          else {
            if (l = S.start_date.valueOf(), f = S.end_date.valueOf(), this._table_view) {
              var v = this._min_date.valueOf() + m.y * this.config.time_step * 6e4 + (m.custom ? 0 : 864e5);
              if (this._mode == "month")
                if (v = this._correct_shift(v, !1), this._drag_from_start) {
                  var D = 864e5;
                  v <= r.date.date_part(new Date(f + D - 1)).valueOf() && (l = v - D);
                } else
                  f = v;
              else if (this.config.preserve_length) {
                if (m.resize_from_start)
                  l = r._correct_drag_start_date(v), E.round_position && E.first_hour && E.last_hour && E.x_unit == "day" && (l = new Date(1 * l + E._start_correction));
                else if (f = r._correct_drag_end_date(v, 0), E.round_position && E.first_hour && E.last_hour && E.x_unit == "day" && (f = r.date.date_part(new Date(f)), f = new Date(1 * f - E._end_correction)), E.round_position && r["ignore_" + r._mode] && E.x_unit == "day") {
                  const V = this["ignore_" + this._mode];
                  let W = r.date.add(new Date(f), -E.x_step, E.x_unit);
                  V(W) && (f = W);
                }
              } else
                m.resize_from_start ? l = v : f = v;
            } else {
              var M = this.date.date_part(new Date(S.end_date.valueOf() - 1)).valueOf(), N = new Date(M), T = this.config.first_hour, A = 60 / k * (this.config.last_hour - T);
              this.config.time_step = 1;
              var C = this._mouse_coords(u);
              this.config.time_step = k;
              var O = m.y * k * 6e4, H = Math.min(m.y + 1, A) * k * 6e4, z = 6e4 * C.y;
              f = Math.abs(O - z) > Math.abs(H - z) ? M + H : M + O, f += 6e4 * (new Date(f).getTimezoneOffset() - N.getTimezoneOffset()), this._els.dhx_cal_data[0].style.cursor = "s-resize", this._mode != "week" && this._mode != "day" || (f = this._correct_shift(f));
            }
            if (this._drag_mode == "new-size")
              if (f <= this._drag_start) {
                var $ = m.shift || (this._table_view && !m.custom ? 864e5 : 0);
                l = f - (m.shift ? 0 : $), f = this._drag_start + ($ || 6e4 * k);
              } else
                l = this._drag_start;
            else
              f <= l && (f = E && E.round_position ? E.x_unit == "hour" || E.x_unit == "minute" ? r.date.add(l, E.x_step, E.x_unit) : r.date.add(r.date.date_part(new Date(l)), 1, E.x_unit) : l + 6e4 * k);
          }
          var q = new Date(f - 1), R = new Date(l);
          if (this._drag_mode == "move" && r.config.limit_drag_out && (+R < +r._min_date || +f > +r._max_date)) {
            if (+S.start_date < +r._min_date || +S.end_date > +r._max_date)
              R = new Date(S.start_date), f = new Date(S.end_date);
            else {
              var U = f - R;
              +R < +r._min_date ? (R = new Date(r._min_date), m._ignores && this.config.preserve_length && this._table_view ? (R = new Date(r._correct_drag_start_date(R)), E._start_correction && (R = new Date(R.valueOf() + E._start_correction)), f = new Date(1 * R + this._get_fictional_event_length(R, this._drag_event._event_length, E))) : f = new Date(+R + U)) : (f = new Date(r._max_date), m._ignores && this.config.preserve_length && this._table_view ? (E._end_correction && (f = new Date(f.valueOf() - E._end_correction)), f = new Date(1 * f - this._get_fictional_event_length(f, 0, E, !0)), R = new Date(1 * f - this._get_fictional_event_length(f, this._drag_event._event_length, E, !0)), this._ignores_detected && (R = r.date.add(R, E.x_step, E.x_unit), f = new Date(1 * f - this._get_fictional_event_length(f, 0, E, !0)), f = r.date.add(f, E.x_step, E.x_unit))) : R = new Date(+f - U));
            }
            q = new Date(f - 1);
          }
          if (!this._table_view && this._dragEventBody && !r.config.all_timed && (!r._get_section_view() && m.x != this._get_event_sday({ start_date: new Date(l), end_date: new Date(l) }) || new Date(l).getHours() < this.config.first_hour) && (U = f - R, this._drag_mode == "move" && (D = this._min_date.valueOf() + 24 * m.x * 60 * 6e4, (R = new Date(D)).setHours(this.config.first_hour), +R <= +S.start_date ? f = new Date(+R + U) : R = new Date(+f - U))), this._table_view || r.config.all_timed || !(!r.getView() && m.x != this._get_event_sday({ start_date: new Date(f), end_date: new Date(f) }) || new Date(f).getHours() >= this.config.last_hour) || (U = f - R, D = this._min_date.valueOf() + 24 * m.x * 60 * 6e4, (f = r.date.date_part(new Date(D))).setHours(this.config.last_hour), q = new Date(f - 1), this._drag_mode == "move" && (+R <= +S.start_date ? f = new Date(+R + U) : R = new Date(+f - U))), !this._table_view && r.config.all_timed) {
            let V = this._min_date.valueOf() + 24 * m.x * 60 * 6e4;
            new Date(r._drag_start).getDay() != new Date(V) && (V = new Date(r._drag_start));
            let W = new Date(V).setHours(this.config.last_hour);
            r._drag_start && this._drag_mode == "new-size" && W < new Date(f) && ((f = r.date.date_part(new Date(V))).setHours(this.config.last_hour), q = new Date(f - 1));
          }
          if (this._table_view && r["ignore_" + this._mode] && (this._drag_mode == "resize" || this._drag_mode == "new-size") && +f > +r._max_date) {
            f = new Date(r._max_date);
            const V = this["ignore_" + this._mode];
            for (; V(f); )
              f = r.date.add(f, -E.x_step, E.x_unit);
            f = r.date.add(f, E.x_step, E.x_unit);
          }
          if (this._table_view || q.getDate() == R.getDate() && q.getHours() < this.config.last_hour || r._allow_dnd)
            if (S.start_date = R, S.end_date = new Date(f), this.config.update_render) {
              var Y = r._els.dhx_cal_data[0].scrollTop;
              this.update_view(), r._els.dhx_cal_data[0].scrollTop = Y;
            } else
              this.updateEvent(this._drag_id);
          this._table_view && this.for_rendered(this._drag_id, function(V) {
            V.className += " dhx_in_move dhx_cal_event_drag";
          }), this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, u]);
        }
      } else if (r.checkEvent("onMouseMove")) {
        var B = this._locate_event(u.target || u.srcElement);
        this.callEvent("onMouseMove", [B, u]);
      }
    }, r._on_mouse_down = function(u, m) {
      if (u.button != 2 && !this.config.readonly && !this._drag_mode) {
        m = m || u.target || u.srcElement;
        var l = r._getClassName(m).split(" ")[0];
        switch (this.config.drag_event_body && l == "dhx_body" && m.parentNode && m.parentNode.className.indexOf("dhx_cal_select_menu") === -1 && (l = "dhx_event_move", this._dragEventBody = !0), l) {
          case "dhx_cal_event_line":
          case "dhx_cal_event_clear":
            this._table_view && (this._drag_mode = "move");
            break;
          case "dhx_event_move":
          case "dhx_wa_ev_body":
            this._drag_mode = "move";
            break;
          case "dhx_event_resize":
            this._drag_mode = "resize", r._getClassName(m).indexOf("dhx_event_resize_end") < 0 ? r._drag_from_start = !0 : r._drag_from_start = !1;
            break;
          case "dhx_scale_holder":
          case "dhx_scale_holder_now":
          case "dhx_month_body":
          case "dhx_matrix_cell":
          case "dhx_marked_timespan":
            this._drag_mode = "create";
            break;
          case "":
            if (m.parentNode)
              return r._on_mouse_down(u, m.parentNode);
            break;
          default:
            if ((!r.checkEvent("onMouseDown") || r.callEvent("onMouseDown", [l, u])) && m.parentNode && m != this && l != "dhx_body")
              return r._on_mouse_down(u, m.parentNode);
            this._drag_mode = null, this._drag_id = null;
        }
        if (this._drag_mode) {
          var f = this._locate_event(m);
          if (this.config["drag_" + this._drag_mode] && this.callEvent("onBeforeDrag", [f, this._drag_mode, u])) {
            if (this._drag_id = f, (this._edit_id != this._drag_id || this._edit_id && this._drag_mode == "create") && this._close_not_saved(), !this._drag_mode)
              return;
            this._drag_event = r._lame_clone(this.getEvent(this._drag_id) || {}), this._drag_pos = this._mouse_coords(u);
          } else
            this._drag_mode = this._drag_id = 0;
        }
        this._drag_start = null;
      }
    }, r._get_private_properties = function(u) {
      var m = {};
      for (var l in u)
        l.indexOf("_") === 0 && (m[l] = !0);
      return m;
    }, r._clear_temporary_properties = function(u, m) {
      var l = this._get_private_properties(u), f = this._get_private_properties(m);
      for (var g in f)
        l[g] || delete m[g];
    }, r._on_mouse_up = function(u) {
      if (!u || u.button != 2 || !this._mobile) {
        if (this._drag_mode && this._drag_id) {
          this._els.dhx_cal_data[0].style.cursor = "default";
          var m = this._drag_id, l = this._drag_mode, f = !this._drag_pos || this._drag_pos.has_moved;
          delete this._drag_event._move_event_shift;
          var g = this.getEvent(this._drag_id);
          if (f && (this._drag_event._dhx_changed || !this._drag_event.start_date || g.start_date.valueOf() != this._drag_event.start_date.valueOf() || g.end_date.valueOf() != this._drag_event.end_date.valueOf())) {
            var x = this._drag_mode == "new-size";
            if (this.callEvent("onBeforeEventChanged", [g, u, x, this._drag_event]))
              if (this._drag_id = this._drag_mode = null, x && this.config.edit_on_create) {
                if (this.unselect(), this._new_event = /* @__PURE__ */ new Date(), g.$new = !0, this._table_view || this.config.details_on_create || !this.config.select || !this.isOneDayEvent(this.getEvent(m)))
                  return r.callEvent("onDragEnd", [m, l, u]), this.showLightbox(m);
                this._drag_pos = !0, this._select_id = this._edit_id = m;
              } else
                this._new_event || this.callEvent(x ? "onEventAdded" : "onEventChanged", [m, this.getEvent(m)]);
            else
              x ? this.deleteEvent(g.id, !0) : (this._drag_event._dhx_changed = !1, this._clear_temporary_properties(g, this._drag_event), r._lame_copy(g, this._drag_event), this.updateEvent(g.id));
          }
          this._drag_pos && (this._drag_pos.has_moved || this._drag_pos === !0) && (this._drag_id = this._drag_mode = null, this.render_view_data()), r.callEvent("onDragEnd", [m, l, u]);
        }
        this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this._drag_event = null, this._drag_from_start = null;
      }
    }, r._trigger_dyn_loading = function() {
      return !(!this._load_mode || !this._load() || (this._render_wait = !0, 0));
    }, r.update_view = function() {
      this._reset_ignores(), this._update_nav_bar(this.config.header, this.$container.querySelector(".dhx_cal_navline"));
      var u = this[this._mode + "_view"];
      if (u ? u.call(this, !0) : this._reset_scale(), this._trigger_dyn_loading())
        return !0;
      this.render_view_data();
    }, r.isViewExists = function(u) {
      return !!(r[u + "_view"] || r.date[u + "_start"] && r.templates[u + "_date"] && r.templates[u + "_scale_date"]);
    }, r._set_aria_buttons_attrs = function() {
      for (var u = ["dhx_cal_next_button", "dhx_cal_prev_button", "dhx_cal_tab", "dhx_cal_today_button"], m = 0; m < u.length; m++)
        for (var l = this._els[u[m]], f = 0; l && f < l.length; f++) {
          var g = l[f].getAttribute("data-tab") || l[f].getAttribute("name"), x = this.locale.labels[u[m]];
          g && (x = this.locale.labels[g + "_tab"] || this.locale.labels[g] || x), u[m] == "dhx_cal_next_button" ? x = this.locale.labels.next : u[m] == "dhx_cal_prev_button" && (x = this.locale.labels.prev), this._waiAria.headerButtonsAttributes(l[f], x || "");
        }
    }, r.updateView = function(u, m) {
      if (!this.$container)
        throw new Error(`The scheduler is not initialized. 
 **scheduler.updateView** or **scheduler.setCurrentView** can be called only after **scheduler.init**`);
      u = u || this._date, m = m || this._mode;
      var l = "dhx_cal_data";
      this.locale.labels.icon_form || (this.locale.labels.icon_form = this.locale.labels.icon_edit);
      var f = this._obj, g = "dhx_scheduler_" + this._mode, x = "dhx_scheduler_" + m;
      this._mode && f.className.indexOf(g) != -1 ? f.className = f.className.replace(g, x) : f.className += " " + x;
      var w, E = "dhx_multi_day", k = !(this._mode != m || !this.config.preserve_scroll) && this._els[l][0].scrollTop;
      this._els[E] && this._els[E][0] && (w = this._els[E][0].scrollTop), this[this._mode + "_view"] && m && this._mode != m && this[this._mode + "_view"](!1), this._close_not_saved(), this._els[E] && (this._els[E][0].parentNode.removeChild(this._els[E][0]), this._els[E] = null), this._mode = m, this._date = u, this._table_view = this._mode == "month", this._dy_shift = 0, this.update_view(), this._set_aria_buttons_attrs();
      var S = this._els.dhx_cal_tab;
      if (S)
        for (var v = 0; v < S.length; v++) {
          var D = S[v];
          D.getAttribute("data-tab") == this._mode || D.getAttribute("name") == this._mode + "_tab" ? (D.classList.add("active"), this._waiAria.headerToggleState(D, !0)) : (D.classList.remove("active"), this._waiAria.headerToggleState(D, !1));
        }
      typeof k == "number" && (this._els[l][0].scrollTop = k), typeof w == "number" && this._els[E] && this._els[E][0] && (this._els[E][0].scrollTop = w);
    }, r.setCurrentView = function(u, m) {
      this.callEvent("onBeforeViewChange", [this._mode, this._date, m || this._mode, u || this._date]) && (this.updateView(u, m), this.callEvent("onViewChange", [this._mode, this._date]));
    }, r.render = function(u, m) {
      r.setCurrentView(u, m);
    }, r._render_x_header = function(u, m, l, f, g) {
      g = g || 0;
      var x = document.createElement("div");
      x.className = "dhx_scale_bar", this.templates[this._mode + "_scalex_class"] && (x.className += " " + this.templates[this._mode + "_scalex_class"](l));
      var w = this._cols[u];
      this._mode == "month" && u === 0 && this.config.left_border && (x.className += " dhx_scale_bar_border", m += 1), this.set_xy(x, w, this.xy.scale_height - 1, m, g);
      var E = this.templates[this._mode + "_scale_date"](l, this._mode);
      x.innerHTML = E, this._waiAria.dayHeaderAttr(x, E), f.appendChild(x);
    }, r._get_columns_num = function(u, m) {
      var l = 7;
      if (!r._table_view) {
        var f = r.date["get_" + r._mode + "_end"];
        f && (m = f(u)), l = Math.round((m.valueOf() - u.valueOf()) / 864e5);
      }
      return l;
    }, r._get_timeunit_start = function() {
      return this.date[this._mode + "_start"](new Date(this._date.valueOf()));
    }, r._get_view_end = function() {
      var u = this._get_timeunit_start(), m = r.date.add(u, 1, this._mode);
      if (!r._table_view) {
        var l = r.date["get_" + r._mode + "_end"];
        l && (m = l(u));
      }
      return m;
    }, r._calc_scale_sizes = function(u, m, l) {
      var f = this.config.rtl, g = u, x = this._get_columns_num(m, l);
      this._process_ignores(m, x, "day", 1);
      for (var w = x - this._ignores_detected, E = 0; E < x; E++)
        this._ignores[E] ? (this._cols[E] = 0, w++) : this._cols[E] = Math.floor(g / (w - E)), g -= this._cols[E], this._colsS[E] = (this._cols[E - 1] || 0) + (this._colsS[E - 1] || (this._table_view ? 0 : f ? this.xy.scroll_width : this.xy.scale_width));
      this._colsS.col_length = x, this._colsS[x] = this._cols[x - 1] + this._colsS[x - 1] || 0;
    }, r._set_scale_col_size = function(u, m, l) {
      var f = this.config;
      this.set_xy(u, m, f.hour_size_px * (f.last_hour - f.first_hour), l + this.xy.scale_width + 1, 0);
    }, r._render_scales = function(u, m) {
      var l = new Date(r._min_date), f = new Date(r._max_date), g = this.date.date_part(r._currentDate()), x = parseInt(u.style.width, 10) - 1, w = new Date(this._min_date), E = this._get_columns_num(l, f);
      this._calc_scale_sizes(x, l, f);
      var k = 0;
      u.innerHTML = "";
      for (var S = 0; S < E; S++) {
        if (this._ignores[S] || this._render_x_header(S, k, w, u), !this._table_view) {
          var v = document.createElement("div"), D = "dhx_scale_holder";
          w.valueOf() == g.valueOf() && (D += " dhx_scale_holder_now"), v.setAttribute("data-column-index", S), this._ignores_detected && this._ignores[S] && (D += " dhx_scale_ignore");
          for (let M = 1 * this.config.first_hour; M < this.config.last_hour; M++) {
            const N = document.createElement("div");
            N.className = "dhx_scale_time_slot dhx_scale_time_slot_hour_start", N.style.height = this.config.hour_size_px / 2 + "px";
            let T = new Date(w.getFullYear(), w.getMonth(), w.getDate(), M, 0);
            N.setAttribute("data-slot-date", this.templates.format_date(T));
            let A = this.templates.time_slot_text(T);
            A && (N.innerHTML = A);
            let C = this.templates.time_slot_class(T);
            C && N.classList.add(C), v.appendChild(N);
            const O = document.createElement("div");
            O.className = "dhx_scale_time_slot", T = new Date(w.getFullYear(), w.getMonth(), w.getDate(), M, 30), O.setAttribute("data-slot-date", this.templates.format_date(T)), O.style.height = this.config.hour_size_px / 2 + "px", A = this.templates.time_slot_text(T), A && (O.innerHTML = A), C = this.templates.time_slot_class(T), C && O.classList.add(C), v.appendChild(O);
          }
          v.className = D + " " + this.templates.week_date_class(w, g), this._waiAria.dayColumnAttr(v, w), this._set_scale_col_size(v, this._cols[S], k), m.appendChild(v), this.callEvent("onScaleAdd", [v, w]);
        }
        k += this._cols[S], w = this.date.add(w, 1, "day"), w = this.date.day_start(w);
      }
    }, r._getNavDateElement = function() {
      return this.$container.querySelector(".dhx_cal_date");
    }, r._reset_scale = function() {
      if (this.templates[this._mode + "_date"]) {
        var u = this._els.dhx_cal_header[0], m = this._els.dhx_cal_data[0], l = this.config;
        u.innerHTML = "", m.innerHTML = "";
        var f, g, x = (l.readonly || !l.drag_resize ? " dhx_resize_denied" : "") + (l.readonly || !l.drag_move ? " dhx_move_denied" : "");
        m.className = "dhx_cal_data" + x, this._scales = {}, this._cols = [], this._colsS = { height: 0 }, this._dy_shift = 0, this.set_sizes();
        var w = this._get_timeunit_start(), E = r._get_view_end();
        f = g = this._table_view ? r.date.week_start(w) : w, this._min_date = f;
        var k = this.templates[this._mode + "_date"](w, E, this._mode), S = this._getNavDateElement();
        if (S && (S.innerHTML = k, this._waiAria.navBarDateAttr(S, k)), this._max_date = E, r._render_scales(u, m), this._table_view)
          this._reset_month_scale(m, w, g);
        else if (this._reset_hours_scale(m, w, g), l.multi_day) {
          var v = "dhx_multi_day";
          this._els[v] && (this._els[v][0].parentNode.removeChild(this._els[v][0]), this._els[v] = null);
          var D = document.createElement("div");
          D.className = v, D.style.visibility = "hidden", D.style.display = "none";
          var M = this._colsS[this._colsS.col_length], N = l.rtl ? this.xy.scale_width : this.xy.scroll_width, T = Math.max(M + N, 0);
          this.set_xy(D, T, 0, 0), m.parentNode.insertBefore(D, m);
          var A = D.cloneNode(!0);
          A.className = v + "_icon", A.style.visibility = "hidden", A.style.display = "none", this.set_xy(A, this.xy.scale_width + 1, 0, 0), D.appendChild(A), this._els[v] = [D, A], r.event(this._els[v][0], "click", this._click.dhx_cal_data);
        }
      }
    }, r._reset_hours_scale = function(u, m, l) {
      var f = document.createElement("div");
      f.className = "dhx_scale_holder";
      for (var g = new Date(1980, 1, 1, this.config.first_hour, 0, 0), x = 1 * this.config.first_hour; x < this.config.last_hour; x++) {
        var w = document.createElement("div");
        w.className = "dhx_scale_hour", w.style.height = this.config.hour_size_px + "px";
        var E = this.xy.scale_width;
        this.config.left_border && (w.className += " dhx_scale_hour_border"), w.style.width = E + "px";
        var k = r.templates.hour_scale(g);
        w.innerHTML = k, this._waiAria.hourScaleAttr(w, k), f.appendChild(w), g = this.date.add(g, 1, "hour");
      }
      u.appendChild(f), this.config.scroll_hour && (u.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour));
    }, r._currentDate = function() {
      return r.config.now_date ? new Date(r.config.now_date) : /* @__PURE__ */ new Date();
    }, r._reset_ignores = function() {
      this._ignores = {}, this._ignores_detected = 0;
    }, r._process_ignores = function(u, m, l, f, g) {
      this._reset_ignores();
      var x = r["ignore_" + this._mode];
      if (x)
        for (var w = new Date(u), E = 0; E < m; E++)
          x(w) && (this._ignores_detected += 1, this._ignores[E] = !0, g && m++), w = r.date.add(w, f, l), r.date[l + "_start"] && (w = r.date[l + "_start"](w));
    }, r._render_month_scale = function(u, m, l, f) {
      var g = r.date.add(m, 1, "month"), x = new Date(l), w = r._currentDate();
      w = this.date.date_part(w), l = this.date.date_part(l), f = f || Math.ceil(Math.round((g.valueOf() - l.valueOf()) / 864e5) / 7);
      for (var E = [], k = 0; k <= 7; k++) {
        var S = this._cols[k] || 0;
        isNaN(Number(S)) || (S += "px"), E[k] = S;
      }
      function v(R) {
        var U = r._colsS.height;
        return r._colsS.heights[R + 1] !== void 0 && (U = r._colsS.heights[R + 1] - (r._colsS.heights[R] || 0)), U;
      }
      var D = 0;
      const M = document.createElement("div");
      for (M.classList.add("dhx_cal_month_table"), k = 0; k < f; k++) {
        var N = document.createElement("div");
        N.classList.add("dhx_cal_month_row"), N.style.height = v(k) + "px", M.appendChild(N);
        for (var T = 0; T < 7; T++) {
          var A = document.createElement("div");
          N.appendChild(A);
          var C = "dhx_cal_month_cell";
          l < m ? C += " dhx_before" : l >= g ? C += " dhx_after" : l.valueOf() == w.valueOf() && (C += " dhx_now"), this._ignores_detected && this._ignores[T] && (C += " dhx_scale_ignore"), A.className = C + " " + this.templates.month_date_class(l, w), A.setAttribute("data-cell-date", r.templates.format_date(l));
          var O = "dhx_month_body", H = "dhx_month_head";
          if (T === 0 && this.config.left_border && (O += " dhx_month_body_border", H += " dhx_month_head_border"), this._ignores_detected && this._ignores[T])
            A.appendChild(document.createElement("div")), A.appendChild(document.createElement("div"));
          else {
            A.style.width = E[T], this._waiAria.monthCellAttr(A, l);
            var z = document.createElement("div");
            z.style.height = r.xy.month_head_height + "px", z.className = H, z.innerHTML = this.templates.month_day(l), A.appendChild(z);
            var $ = document.createElement("div");
            $.className = O, A.appendChild($);
          }
          var q = l.getDate();
          (l = this.date.add(l, 1, "day")).getDate() - q > 1 && (l = new Date(l.getFullYear(), l.getMonth(), q + 1, 12, 0));
        }
        r._colsS.heights[k] = D, D += v(k);
      }
      return this._min_date = x, this._max_date = l, u.innerHTML = "", u.appendChild(M), this._scales = {}, u.querySelectorAll("[data-cell-date]").forEach((R) => {
        const U = r.templates.parse_date(R.getAttribute("data-cell-date")), Y = R.querySelector(".dhx_month_body");
        this._scales[+U] = Y, this.callEvent("onScaleAdd", [this._scales[+U], U]);
      }), this._max_date;
    }, r._reset_month_scale = function(u, m, l, f) {
      var g = r.date.add(m, 1, "month");
      l = this.date.date_part(l), f = f || Math.ceil(Math.round((g.valueOf() - l.valueOf()) / 864e5) / 7);
      var x = Math.floor(u.clientHeight / f) - this.xy.month_head_height;
      return this._colsS.height = x + this.xy.month_head_height, this._colsS.heights = [], r._render_month_scale(u, m, l, f);
    }, r.getView = function(u) {
      return u || (u = r.getState().mode), r.matrix && r.matrix[u] ? r.matrix[u] : r._props && r._props[u] ? r._props[u] : null;
    }, r.getLabel = function(u, m) {
      for (var l = this.config.lightbox.sections, f = 0; f < l.length; f++)
        if (l[f].map_to == u) {
          for (var g = l[f].options, x = 0; x < g.length; x++)
            if (g[x].key == m)
              return g[x].label;
        }
      return "";
    }, r.updateCollection = function(u, m) {
      var l = r.serverList(u);
      return !!l && (l.splice(0, l.length), l.push.apply(l, m || []), r.callEvent("onOptionsLoad", []), r.resetLightbox(), r.hideCover(), !0);
    }, r._lame_clone = function(u, m) {
      var l, f, g;
      for (m = m || [], l = 0; l < m.length; l += 2)
        if (u === m[l])
          return m[l + 1];
      if (u && typeof u == "object") {
        for (g = Object.create(u), f = [Array, Date, Number, String, Boolean], l = 0; l < f.length; l++)
          u instanceof f[l] && (g = l ? new f[l](u) : new f[l]());
        for (l in m.push(u, g), u)
          Object.prototype.hasOwnProperty.apply(u, [l]) && (g[l] = r._lame_clone(u[l], m));
      }
      return g || u;
    }, r._lame_copy = function(u, m) {
      for (var l in m)
        m.hasOwnProperty(l) && (u[l] = m[l]);
      return u;
    }, r._get_date_from_pos = function(u) {
      var m = this._min_date.valueOf() + 6e4 * (u.y * this.config.time_step + 24 * (this._table_view ? 0 : u.x) * 60);
      return new Date(this._correct_shift(m));
    }, r.getActionData = function(u) {
      var m = this._mouse_coords(u);
      return { date: this._get_date_from_pos(m), section: m.section };
    }, r._focus = function(u, m) {
      if (u && u.focus)
        if (this._mobile)
          window.setTimeout(function() {
            u.focus();
          }, 10);
        else
          try {
            m && u.select && u.offsetWidth && u.select(), u.focus();
          } catch {
          }
    }, r._get_real_event_length = function(u, m, l) {
      var f, g = m - u, x = this["ignore_" + this._mode], w = 0;
      l.render ? (w = this._get_date_index(l, u), f = this._get_date_index(l, m), u.valueOf() < r.getState().min_date.valueOf() && (w = -p(u, r.getState().min_date)), m.valueOf() > r.getState().max_date.valueOf() && (f += p(m, r.getState().max_date))) : f = Math.round(g / 60 / 60 / 1e3 / 24);
      for (var E = !0; w < f; ) {
        var k = r.date.add(m, -l.x_step, l.x_unit);
        if (x && x(m) && (!E || E && x(k)))
          g -= m - k;
        else {
          let S = 0;
          const v = new Date(Math.max(k.valueOf(), u.valueOf())), D = m, M = new Date(v.getFullYear(), v.getMonth(), v.getDate(), l.first_hour || 0), N = new Date(v.getFullYear(), v.getMonth(), v.getDate(), l.last_hour || 24), T = new Date(m.getFullYear(), m.getMonth(), m.getDate(), l.first_hour || 0), A = new Date(m.getFullYear(), m.getMonth(), m.getDate(), l.last_hour || 24);
          D.valueOf() > A.valueOf() && (S += D - A), D.valueOf() > T.valueOf() ? S += l._start_correction : S += 60 * D.getHours() * 60 * 1e3 + 60 * D.getMinutes() * 1e3, v.valueOf() <= N.valueOf() && (S += l._end_correction), v.valueOf() < M.valueOf() && (S += M.valueOf() - v.valueOf()), g -= S, E = !1;
        }
        m = k, f--;
      }
      return g;
    }, r._get_fictional_event_length = function(u, m, l, f) {
      var g = new Date(u), x = f ? -1 : 1;
      if (l._start_correction || l._end_correction) {
        var w;
        w = f ? 60 * g.getHours() + g.getMinutes() - 60 * (l.first_hour || 0) : 60 * (l.last_hour || 0) - (60 * g.getHours() + g.getMinutes());
        var E = 60 * (l.last_hour - l.first_hour), k = Math.ceil((m / 6e4 - w) / E);
        k < 0 && (k = 0), m += k * (1440 - E) * 60 * 1e3;
      }
      var S, v = new Date(1 * u + m * x), D = this["ignore_" + this._mode], M = 0;
      for (l.render ? (M = this._get_date_index(l, g), S = this._get_date_index(l, v)) : S = Math.round(m / 60 / 60 / 1e3 / 24); l.x_unit === "day" ? M * x < S * x : M * x <= S * x; ) {
        var N = r.date.add(g, l.x_step * x, l.x_unit);
        D && D(g) && (m += (N - g) * x, S += x), g = N, M += x;
      }
      return m;
    }, r._get_section_view = function() {
      return this.getView();
    }, r._get_section_property = function() {
      return this.matrix && this.matrix[this._mode] ? this.matrix[this._mode].y_property : this._props && this._props[this._mode] ? this._props[this._mode].map_to : null;
    }, r._is_initialized = function() {
      var u = this.getState();
      return this._obj && u.date && u.mode;
    }, r._is_lightbox_open = function() {
      var u = this.getState();
      return u.lightbox_id !== null && u.lightbox_id !== void 0;
    };
  }(i), function(r) {
    (function() {
      var o = new RegExp(`<(?:.|
)*?>`, "gm"), c = new RegExp(" +", "gm");
      function h(u) {
        return (u + "").replace(o, " ").replace(c, " ");
      }
      var y = new RegExp("'", "gm");
      function b(u) {
        return (u + "").replace(y, "&#39;");
      }
      for (var p in r._waiAria = { getAttributeString: function(u) {
        var m = [" "];
        for (var l in u)
          if (typeof u[l] != "function" && typeof u[l] != "object") {
            var f = b(h(u[l]));
            m.push(l + "='" + f + "'");
          }
        return m.push(" "), m.join(" ");
      }, setAttributes: function(u, m) {
        for (var l in m)
          u.setAttribute(l, h(m[l]));
        return u;
      }, labelAttr: function(u, m) {
        return this.setAttributes(u, { "aria-label": m });
      }, label: function(u) {
        return r._waiAria.getAttributeString({ "aria-label": u });
      }, hourScaleAttr: function(u, m) {
        this.labelAttr(u, m);
      }, monthCellAttr: function(u, m) {
        this.labelAttr(u, r.templates.day_date(m));
      }, navBarDateAttr: function(u, m) {
        this.labelAttr(u, m);
      }, dayHeaderAttr: function(u, m) {
        this.labelAttr(u, m);
      }, dayColumnAttr: function(u, m) {
        this.dayHeaderAttr(u, r.templates.day_date(m));
      }, headerButtonsAttributes: function(u, m) {
        return this.setAttributes(u, { role: "button", "aria-label": m });
      }, headerToggleState: function(u, m) {
        return this.setAttributes(u, { "aria-pressed": m ? "true" : "false" });
      }, getHeaderCellAttr: function(u) {
        return r._waiAria.getAttributeString({ "aria-label": u });
      }, eventAttr: function(u, m) {
        this._eventCommonAttr(u, m);
      }, _eventCommonAttr: function(u, m) {
        m.setAttribute("aria-label", h(r.templates.event_text(u.start_date, u.end_date, u))), r.config.readonly && m.setAttribute("aria-readonly", !0), u.$dataprocessor_class && m.setAttribute("aria-busy", !0), m.setAttribute("aria-selected", r.getState().select_id == u.id ? "true" : "false");
      }, setEventBarAttr: function(u, m) {
        this._eventCommonAttr(u, m);
      }, _getAttributes: function(u, m) {
        var l = { setAttribute: function(f, g) {
          this[f] = g;
        } };
        return u.apply(this, [m, l]), l;
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
        var m = this._getAttributes(this._eventCommonAttr, u);
        return m.role = "row", this.getAttributeString(m);
      }, agendaDetailsBtnString: function() {
        return this.getAttributeString({ role: "button", "aria-label": r.locale.labels.icon_details });
      }, gridAttrString: function() {
        return this.getAttributeString({ role: "grid" });
      }, gridRowAttrString: function(u) {
        return this.agendaEventAttrString(u);
      }, gridCellAttrString: function(u, m, l) {
        return this.getAttributeString({ role: "gridcell", "aria-label": [m.label === void 0 ? m.id : m.label, ": ", l] });
      }, mapAttrString: function() {
        return this.gridAttrString();
      }, mapRowAttrString: function(u) {
        return this.gridRowAttrString(u);
      }, mapDetailsBtnString: function() {
        return this.agendaDetailsBtnString();
      }, minicalHeader: function(u, m) {
        this.setAttributes(u, { id: m + "", "aria-live": "assertice", "aria-atomic": "true" });
      }, minicalGrid: function(u, m) {
        this.setAttributes(u, { "aria-labelledby": m + "", role: "grid" });
      }, minicalRow: function(u) {
        this.setAttributes(u, { role: "row" });
      }, minicalDayCell: function(u, m) {
        var l = m.valueOf() < r._max_date.valueOf() && m.valueOf() >= r._min_date.valueOf();
        this.setAttributes(u, { role: "gridcell", "aria-label": r.templates.day_date(m), "aria-selected": l ? "true" : "false" });
      }, minicalHeadCell: function(u) {
        this.setAttributes(u, { role: "columnheader" });
      }, weekAgendaDayCell: function(u, m) {
        var l = u.querySelector(".dhx_wa_scale_bar"), f = u.querySelector(".dhx_wa_day_data"), g = r.uid() + "";
        this.setAttributes(l, { id: g }), this.setAttributes(f, { "aria-labelledby": g });
      }, weekAgendaEvent: function(u, m) {
        this.eventAttr(m, u);
      }, lightboxHiddenAttr: function(u) {
        u.setAttribute("aria-hidden", "true");
      }, lightboxVisibleAttr: function(u) {
        u.setAttribute("aria-hidden", "false");
      }, lightboxSectionButtonAttrString: function(u) {
        return this.getAttributeString({ role: "button", "aria-label": u, tabindex: "0" });
      }, yearHeader: function(u, m) {
        this.setAttributes(u, { id: m + "" });
      }, yearGrid: function(u, m) {
        this.minicalGrid(u, m);
      }, yearHeadCell: function(u) {
        return this.minicalHeadCell(u);
      }, yearRow: function(u) {
        return this.minicalRow(u);
      }, yearDayCell: function(u) {
        this.setAttributes(u, { role: "gridcell" });
      }, lightboxAttr: function(u) {
        u.setAttribute("role", "dialog"), u.setAttribute("aria-hidden", "true"), u.firstChild.setAttribute("role", "heading");
      }, lightboxButtonAttrString: function(u) {
        return this.getAttributeString({ role: "button", "aria-label": r.locale.labels[u], tabindex: "0" });
      }, eventMenuAttrString: function(u) {
        return this.getAttributeString({ role: "button", "aria-label": r.locale.labels[u] });
      }, lightboxHeader: function(u, m) {
        u.setAttribute("aria-label", m);
      }, lightboxSelectAttrString: function(u) {
        var m = "";
        switch (u) {
          case "%Y":
            m = r.locale.labels.year;
            break;
          case "%m":
            m = r.locale.labels.month;
            break;
          case "%d":
            m = r.locale.labels.day;
            break;
          case "%H:%i":
            m = r.locale.labels.hour + " " + r.locale.labels.minute;
        }
        return r._waiAria.getAttributeString({ "aria-label": m });
      }, messageButtonAttrString: function(u) {
        return "tabindex='0' role='button' aria-label='" + u + "'";
      }, messageInfoAttr: function(u) {
        u.setAttribute("role", "alert");
      }, messageModalAttr: function(u, m) {
        u.setAttribute("role", "dialog"), m && u.setAttribute("aria-labelledby", m);
      }, quickInfoAttr: function(u) {
        u.setAttribute("role", "dialog");
      }, quickInfoHeaderAttrString: function() {
        return " role='heading' ";
      }, quickInfoHeader: function(u, m) {
        u.setAttribute("aria-label", m);
      }, quickInfoButtonAttrString: function(u) {
        return r._waiAria.getAttributeString({ role: "button", "aria-label": u, tabindex: "0" });
      }, tooltipAttr: function(u) {
        u.setAttribute("role", "tooltip");
      }, tooltipVisibleAttr: function(u) {
        u.setAttribute("aria-hidden", "false");
      }, tooltipHiddenAttr: function(u) {
        u.setAttribute("aria-hidden", "true");
      } }, r._waiAria)
        r._waiAria[p] = function(u) {
          return function() {
            return r.config.wai_aria_attributes ? u.apply(this, arguments) : " ";
          };
        }(r._waiAria[p]);
    })();
  }(i), i.utils = ve, i.$domHelpers = Ce, i.utils.dom = Ce, i.uid = ve.uid, i.mixin = ve.mixin, i.defined = ve.defined, i.assert = function(r) {
    return function(o, c) {
      o || r.config.show_errors && r.callEvent("onError", [c]) !== !1 && (r.message ? r.message({ type: "error", text: c, expire: -1 }) : console.log(c));
    };
  }(i), i.copy = ve.copy, i._createDatePicker = function(r, o) {
    return new Fa(i, r, o);
  }, i._getFocusableNodes = Ce.getFocusableNodes, i._getClassName = Ce.getClassName, i._locate_css = Ce.locateCss;
  const t = Pa(i);
  var a, s, n;
  i.utils.mixin(i, t), i.env = i.$env = Ca, i.Promise = Promise, function(r) {
    r.destructor = function() {
      for (var o in r.callEvent("onDestroy", []), this.clearAll(), this.$container && (this.$container.innerHTML = ""), this._eventRemoveAll && this._eventRemoveAll(), this.resetLightbox && this.resetLightbox(), this._dp && this._dp.destructor && this._dp.destructor(), this.detachAllEvents(), this)
        o.indexOf("$") === 0 && delete this[o];
      r.$destroyed = !0;
    };
  }(i), function(r) {
    function o(c, h) {
      var y = { method: c };
      if (h.length === 0)
        throw new Error("Arguments list of query is wrong.");
      if (h.length === 1)
        return typeof h[0] == "string" ? (y.url = h[0], y.async = !0) : (y.url = h[0].url, y.async = h[0].async || !0, y.callback = h[0].callback, y.headers = h[0].headers), h[0].data ? typeof h[0].data != "string" ? y.data = ot(h[0].data) : y.data = h[0].data : y.data = "", y;
      switch (y.url = h[0], c) {
        case "GET":
        case "DELETE":
          y.callback = h[1], y.headers = h[2];
          break;
        case "POST":
        case "PUT":
          h[1] ? typeof h[1] != "string" ? y.data = ot(h[1]) : y.data = h[1] : y.data = "", y.callback = h[2], y.headers = h[3];
      }
      return y;
    }
    r.Promise = window.Promise, r.ajax = { cache: !0, method: "get", serializeRequestParams: ot, parse: function(c) {
      return typeof c != "string" ? c : (c = c.replace(/^[\s]+/, ""), typeof DOMParser > "u" || r.$env.isIE ? window.ActiveXObject !== void 0 && ((h = new window.ActiveXObject("Microsoft.XMLDOM")).async = "false", h.loadXML(c)) : h = new DOMParser().parseFromString(c, "text/xml"), h);
      var h;
    }, xmltop: function(c, h, y) {
      if (h.status === void 0 || h.status < 400) {
        var b = h.responseXML ? h.responseXML || h : this.parse(h.responseText || h);
        if (b && b.documentElement !== null && !b.getElementsByTagName("parsererror").length)
          return b.getElementsByTagName(c)[0];
      }
      return y !== -1 && r.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], y]), document.createElement("DIV");
    }, xpath: function(c, h) {
      if (h.nodeName || (h = h.responseXML || h), r.$env.isIE)
        return h.selectNodes(c) || [];
      for (var y, b = [], p = (h.ownerDocument || h).evaluate(c, h, null, XPathResult.ANY_TYPE, null); y = p.iterateNext(); )
        b.push(y);
      return b;
    }, query: function(c) {
      return this._call(c.method || "GET", c.url, c.data || "", c.async || !0, c.callback, c.headers);
    }, get: function(c, h, y) {
      var b = o("GET", arguments);
      return this.query(b);
    }, getSync: function(c, h) {
      var y = o("GET", arguments);
      return y.async = !1, this.query(y);
    }, put: function(c, h, y, b) {
      var p = o("PUT", arguments);
      return this.query(p);
    }, del: function(c, h, y) {
      var b = o("DELETE", arguments);
      return this.query(b);
    }, post: function(c, h, y, b) {
      arguments.length == 1 ? h = "" : arguments.length == 2 && typeof h == "function" && (y = h, h = "");
      var p = o("POST", arguments);
      return this.query(p);
    }, postSync: function(c, h, y) {
      h = h === null ? "" : String(h);
      var b = o("POST", arguments);
      return b.async = !1, this.query(b);
    }, _call: function(c, h, y, b, p, u) {
      return new r.Promise((function(m, l) {
        var f = typeof XMLHttpRequest === void 0 || r.$env.isIE ? new window.ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest(), g = navigator.userAgent.match(/AppleWebKit/) !== null && navigator.userAgent.match(/Qt/) !== null && navigator.userAgent.match(/Safari/) !== null;
        if (b && f.addEventListener("readystatechange", function() {
          if (f.readyState == 4 || g && f.readyState == 3) {
            if ((f.status != 200 || f.responseText === "") && !r.callEvent("onAjaxError", [f]))
              return;
            setTimeout(function() {
              typeof p == "function" && p.apply(window, [{ xmlDoc: f, filePath: h }]), m(f), typeof p == "function" && (p = null, f = null);
            }, 0);
          }
        }), c != "GET" || this.cache || (h += (h.indexOf("?") >= 0 ? "&" : "?") + "dhxr" + (/* @__PURE__ */ new Date()).getTime() + "=1"), f.open(c, h, b), u)
          for (var x in u)
            f.setRequestHeader(x, u[x]);
        else
          c.toUpperCase() == "POST" || c == "PUT" || c == "DELETE" ? f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") : c == "GET" && (y = null);
        if (f.setRequestHeader("X-Requested-With", "XMLHttpRequest"), f.send(y), !b)
          return { xmlDoc: f, filePath: h };
      }).bind(this));
    }, urlSeparator: function(c) {
      return c.indexOf("?") != -1 ? "&" : "?";
    } }, r.$ajax = r.ajax;
  }(i), Ia(i), Oa(i), function(r) {
    r.config = { default_date: "%j %M %Y", month_date: "%F %Y", load_date: "%Y-%m-%d", week_date: "%l", day_date: "%D %j", hour_date: "%H:%i", month_day: "%d", date_format: "%Y-%m-%d %H:%i", api_date: "%d-%m-%Y %H:%i", parse_exact_format: !1, preserve_length: !0, time_step: 5, displayed_event_color: "#ff4a4a", displayed_event_text_color: "#ffef80", wide_form: 0, day_column_padding: 8, use_select_menu_space: !0, fix_tab_position: !0, start_on_monday: !0, first_hour: 0, last_hour: 24, readonly: !1, drag_resize: !0, drag_move: !0, drag_create: !0, drag_event_body: !0, dblclick_create: !0, details_on_dblclick: !0, edit_on_create: !0, details_on_create: !0, header: null, hour_size_px: 44, resize_month_events: !1, resize_month_timed: !1, responsive_lightbox: !1, separate_short_events: !0, rtl: !1, cascade_event_display: !1, cascade_event_count: 4, cascade_event_margin: 30, multi_day: !0, multi_day_height_limit: 200, drag_lightbox: !0, preserve_scroll: !0, select: !0, undo_deleted: !0, server_utc: !1, touch: !0, touch_tip: !0, touch_drag: 500, touch_swipe_dates: !1, quick_info_detached: !0, positive_closing: !1, drag_highlight: !0, limit_drag_out: !1, icons_edit: ["icon_save", "icon_cancel"], icons_select: ["icon_details", "icon_edit", "icon_delete"], buttons_right: ["dhx_save_btn", "dhx_cancel_btn"], buttons_left: ["dhx_delete_btn"], lightbox: { sections: [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "time", height: 72, type: "time", map_to: "auto" }] }, highlight_displayed_event: !0, left_border: !1, ajax_error: "alert", delay_render: 0, timeline_swap_resize: !0, wai_aria_attributes: !0, wai_aria_application_role: !0, csp: "auto", event_attribute: "data-event-id", show_errors: !0 }, r.config.buttons_left.$initial = r.config.buttons_left.join(), r.config.buttons_right.$initial = r.config.buttons_right.join(), r._helpers = { parseDate: function(o) {
      return (r.templates.xml_date || r.templates.parse_date)(o);
    }, formatDate: function(o) {
      return (r.templates.xml_format || r.templates.format_date)(o);
    } }, r.templates = {}, r.init_templates = function() {
      var o = r.date.date_to_str, c = r.config;
      (function(h, y) {
        for (var b in y)
          h[b] || (h[b] = y[b]);
      })(r.templates, { day_date: o(c.default_date), month_date: o(c.month_date), week_date: function(h, y) {
        return c.rtl ? r.templates.day_date(r.date.add(y, -1, "day")) + " &ndash; " + r.templates.day_date(h) : r.templates.day_date(h) + " &ndash; " + r.templates.day_date(r.date.add(y, -1, "day"));
      }, day_scale_date: o(c.default_date), time_slot_text: function(h) {
        return "";
      }, time_slot_class: function(h) {
        return "";
      }, month_scale_date: o(c.week_date), week_scale_date: o(c.day_date), hour_scale: o(c.hour_date), time_picker: o(c.hour_date), event_date: o(c.hour_date), month_day: o(c.month_day), load_format: o(c.load_date), format_date: o(c.date_format, c.server_utc), parse_date: r.date.str_to_date(c.date_format, c.server_utc), api_date: r.date.str_to_date(c.api_date, !1, !1), event_header: function(h, y, b) {
        return b._mode === "small" || b._mode === "smallest" ? r.templates.event_date(h) : r.templates.event_date(h) + " - " + r.templates.event_date(y);
      }, event_text: function(h, y, b) {
        return b.text;
      }, event_class: function(h, y, b) {
        return "";
      }, month_date_class: function(h) {
        return "";
      }, week_date_class: function(h) {
        return "";
      }, event_bar_date: function(h, y, b) {
        return r.templates.event_date(h);
      }, event_bar_text: function(h, y, b) {
        return b.text;
      }, month_events_link: function(h, y) {
        return "<a>View more(" + y + " events)</a>";
      }, drag_marker_class: function(h, y, b) {
        return "";
      }, drag_marker_content: function(h, y, b) {
        return "";
      }, tooltip_date_format: r.date.date_to_str("%Y-%m-%d %H:%i"), tooltip_text: function(h, y, b) {
        return "<b>Event:</b> " + b.text + "<br/><b>Start date:</b> " + r.templates.tooltip_date_format(h) + "<br/><b>End date:</b> " + r.templates.tooltip_date_format(y);
      }, calendar_month: o("%F %Y"), calendar_scale_date: o("%D"), calendar_date: o("%d"), calendar_time: o("%d-%m-%Y") }), this.callEvent("onTemplatesReady", []);
    };
  }(i), function(r) {
    r._events = {}, r.clearAll = function() {
      this._events = {}, this._loaded = {}, this._edit_id = null, this._select_id = null, this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this._new_event = null, this.clear_view(), this.callEvent("onClearAll", []);
    }, r.addEvent = function(o, c, h, y, b) {
      if (!arguments.length)
        return this.addEventNow();
      var p = o;
      arguments.length != 1 && ((p = b || {}).start_date = o, p.end_date = c, p.text = h, p.id = y), p.id = p.id || r.uid(), p.text = p.text || "", typeof p.start_date == "string" && (p.start_date = this.templates.api_date(p.start_date)), typeof p.end_date == "string" && (p.end_date = this.templates.api_date(p.end_date));
      var u = 6e4 * (this.config.event_duration || this.config.time_step);
      new Date(p.end_date).valueOf() - new Date(p.start_date).valueOf() <= u && p.end_date.setTime(p.start_date.valueOf() + u), p.start_date.setMilliseconds(0), p.end_date.setMilliseconds(0), p._timed = this.isOneDayEvent(p);
      var m = !this._events[p.id];
      return this._events[p.id] = p, this.event_updated(p), this._loading || this.callEvent(m ? "onEventAdded" : "onEventChanged", [p.id, p]), p.id;
    }, r.deleteEvent = function(o, c) {
      var h = this._events[o];
      (c || this.callEvent("onBeforeEventDelete", [o, h]) && this.callEvent("onConfirmedBeforeEventDelete", [o, h])) && (h && (r.getState().select_id == o && r.unselect(), delete this._events[o], this.event_updated(h), this._drag_id == h.id && (this._drag_id = null, this._drag_mode = null, this._drag_pos = null)), this.callEvent("onEventDeleted", [o, h]));
    }, r.getEvent = function(o) {
      return this._events[o];
    }, r.setEvent = function(o, c) {
      c.id || (c.id = o), this._events[o] = c;
    }, r.for_rendered = function(o, c) {
      for (var h = this._rendered.length - 1; h >= 0; h--)
        this._rendered[h].getAttribute(this.config.event_attribute) == o && c(this._rendered[h], h);
    }, r.changeEventId = function(o, c) {
      if (o != c) {
        var h = this._events[o];
        h && (h.id = c, this._events[c] = h, delete this._events[o]), this.for_rendered(o, function(y) {
          y.setAttribute("event_id", c), y.setAttribute(r.config.event_attribute, c);
        }), this._select_id == o && (this._select_id = c), this._edit_id == o && (this._edit_id = c), this.callEvent("onEventIdChange", [o, c]);
      }
    }, function() {
      for (var o = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"], c = function(b) {
        return function(p) {
          return r.getEvent(p)[b];
        };
      }, h = function(b) {
        return function(p, u) {
          var m = r.getEvent(p);
          m[b] = u, m._changed = !0, m._timed = this.isOneDayEvent(m), r.event_updated(m, !0);
        };
      }, y = 0; y < o.length; y += 2)
        r["getEvent" + o[y + 1]] = c(o[y]), r["setEvent" + o[y + 1]] = h(o[y]);
    }(), r.event_updated = function(o, c) {
      this.is_visible_events(o) ? this.render_view_data() : this.clear_event(o.id);
    }, r.is_visible_events = function(o) {
      if (!this._min_date || !this._max_date)
        return !1;
      if (o.start_date.valueOf() < this._max_date.valueOf() && this._min_date.valueOf() < o.end_date.valueOf()) {
        var c = o.start_date.getHours(), h = o.end_date.getHours() + o.end_date.getMinutes() / 60, y = this.config.last_hour, b = this.config.first_hour;
        return !(!this._table_view && (h > y || h <= b) && (c >= y || c < b) && !((o.end_date.valueOf() - o.start_date.valueOf()) / 36e5 > 24 - (this.config.last_hour - this.config.first_hour) || c < y && h > b));
      }
      return !1;
    }, r.isOneDayEvent = function(o) {
      var c = new Date(o.end_date.valueOf() - 1);
      return o.start_date.getFullYear() === c.getFullYear() && o.start_date.getMonth() === c.getMonth() && o.start_date.getDate() === c.getDate() && o.end_date.valueOf() - o.start_date.valueOf() < 864e5;
    }, r.get_visible_events = function(o) {
      var c = [];
      for (var h in this._events)
        this.is_visible_events(this._events[h]) && (o && !this._events[h]._timed || this.filter_event(h, this._events[h]) && c.push(this._events[h]));
      return c;
    }, r.filter_event = function(o, c) {
      var h = this["filter_" + this._mode];
      return !h || h(o, c);
    }, r._is_main_area_event = function(o) {
      return !!o._timed;
    }, r.render_view_data = function(o, c) {
      var h = !1;
      if (!o) {
        if (h = !0, this._not_render)
          return void (this._render_wait = !0);
        this._render_wait = !1, this.clear_view(), o = this.get_visible_events(!(this._table_view || this.config.multi_day));
      }
      for (var y = 0, b = o.length; y < b; y++)
        this._recalculate_timed(o[y]);
      if (this.config.multi_day && !this._table_view) {
        var p = [], u = [];
        for (y = 0; y < o.length; y++)
          this._is_main_area_event(o[y]) ? p.push(o[y]) : u.push(o[y]);
        if (!this._els.dhx_multi_day) {
          var m = r._commonErrorMessages.unknownView(this._mode);
          throw new Error(m);
        }
        this._rendered_location = this._els.dhx_multi_day[0], this._table_view = !0, this.render_data(u, c), this._table_view = !1, this._rendered_location = this._els.dhx_cal_data[0], this._table_view = !1, this.render_data(p, c);
      } else {
        var l = document.createDocumentFragment(), f = this._els.dhx_cal_data[0];
        this._rendered_location = l, this.render_data(o, c), f.appendChild(l), this._rendered_location = f;
      }
      h && this.callEvent("onDataRender", []);
    }, r._view_month_day = function(o) {
      var c = r.getActionData(o).date;
      r.callEvent("onViewMoreClick", [c]) && r.setCurrentView(c, "day");
    }, r._render_month_link = function(o) {
      for (var c = this._rendered_location, h = this._lame_clone(o), y = o._sday; y < o._eday; y++) {
        h._sday = y, h._eday = y + 1;
        var b = r.date, p = r._min_date;
        p = b.add(p, h._sweek, "week"), p = b.add(p, h._sday, "day");
        var u = r.getEvents(p, b.add(p, 1, "day")).length, m = this._get_event_bar_pos(h), l = m.x2 - m.x, f = document.createElement("div");
        r.event(f, "click", function(g) {
          r._view_month_day(g);
        }), f.className = "dhx_month_link", f.style.top = m.y + "px", f.style.left = m.x + "px", f.style.width = l + "px", f.innerHTML = r.templates.month_events_link(p, u), this._rendered.push(f), c.appendChild(f);
      }
    }, r._recalculate_timed = function(o) {
      var c;
      o && (c = typeof o != "object" ? this._events[o] : o) && (c._timed = r.isOneDayEvent(c));
    }, r.attachEvent("onEventChanged", r._recalculate_timed), r.attachEvent("onEventAdded", r._recalculate_timed), r.render_data = function(o, c) {
      o = this._pre_render_events(o, c);
      for (var h = {}, y = 0; y < o.length; y++)
        if (this._table_view)
          if (r._mode != "month")
            this.render_event_bar(o[y]);
          else {
            var b = r.config.max_month_events;
            b !== 1 * b || o[y]._sorder < b ? this.render_event_bar(o[y]) : b !== void 0 && o[y]._sorder == b && r._render_month_link(o[y]);
          }
        else {
          var p = o[y], u = r.locate_holder(p._sday);
          if (!u)
            continue;
          h[p._sday] || (h[p._sday] = { real: u, buffer: document.createDocumentFragment(), width: u.clientWidth });
          var m = h[p._sday];
          this.render_event(p, m.buffer, m.width);
        }
      for (var y in h)
        (m = h[y]).real && m.buffer && m.real.appendChild(m.buffer);
    }, r._get_first_visible_cell = function(o) {
      for (var c = 0; c < o.length; c++)
        if ((o[c].className || "").indexOf("dhx_scale_ignore") == -1)
          return o[c];
      return o[0];
    }, r._pre_render_events = function(o, c) {
      var h = this.xy.bar_height, y = this._colsS.heights, b = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], p = this._els.dhx_cal_data[0];
      if (o = this._table_view ? this._pre_render_events_table(o, c) : this._pre_render_events_line(o, c), this._table_view)
        if (c)
          this._colsS.heights = y;
        else {
          var u = p.querySelectorAll(".dhx_cal_month_row");
          if (u.length) {
            for (var m = 0; m < u.length; m++) {
              b[m]++;
              var l = u[m].querySelectorAll(".dhx_cal_month_cell"), f = this._colsS.height - this.xy.month_head_height;
              if (b[m] * h > f) {
                var g = f;
                1 * this.config.max_month_events !== this.config.max_month_events || b[m] <= this.config.max_month_events ? g = b[m] * h : (this.config.max_month_events + 1) * h > f && (g = (this.config.max_month_events + 1) * h), u[m].style.height = g + this.xy.month_head_height + "px";
              }
              b[m] = (b[m - 1] || 0) + r._get_first_visible_cell(l).offsetHeight;
            }
            b.unshift(0);
            const N = this.$container.querySelector(".dhx_cal_data");
            if (N.offsetHeight < N.scrollHeight && !r._colsS.scroll_fix && r.xy.scroll_width) {
              var x = r._colsS, w = x[x.col_length], E = x.heights.slice();
              w -= r.xy.scroll_width || 0, this._calc_scale_sizes(w, this._min_date, this._max_date), r._colsS.heights = E, this.set_xy(this._els.dhx_cal_header[0], w), r._render_scales(this._els.dhx_cal_header[0]), r._render_month_scale(this._els.dhx_cal_data[0], this._get_timeunit_start(), this._min_date), x.scroll_fix = !0;
            }
          } else if (o.length || this._els.dhx_multi_day[0].style.visibility != "visible" || (b[0] = -1), o.length || b[0] == -1) {
            var k = (b[0] + 1) * h + 4, S = k, v = k + "px";
            this.config.multi_day_height_limit && (v = (S = Math.min(k, this.config.multi_day_height_limit)) + "px");
            var D = this._els.dhx_multi_day[0];
            D.style.height = v, D.style.visibility = b[0] == -1 ? "hidden" : "visible", D.style.display = b[0] == -1 ? "none" : "";
            var M = this._els.dhx_multi_day[1];
            M.style.height = v, M.style.visibility = b[0] == -1 ? "hidden" : "visible", M.style.display = b[0] == -1 ? "none" : "", M.className = b[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (b[0] + 1) * h, this.config.multi_day_height_limit && (this._dy_shift = Math.min(this.config.multi_day_height_limit, this._dy_shift)), b[0] = 0, S != k && (D.style.overflowY = "auto", M.style.position = "fixed", M.style.top = "", M.style.left = "");
          }
        }
      return o;
    }, r._get_event_sday = function(o) {
      var c = this.date.day_start(new Date(o.start_date));
      return Math.round((c.valueOf() - this._min_date.valueOf()) / 864e5);
    }, r._get_event_mapped_end_date = function(o) {
      var c = o.end_date;
      if (this.config.separate_short_events) {
        var h = (o.end_date - o.start_date) / 6e4;
        h < this._min_mapped_duration && (c = this.date.add(c, this._min_mapped_duration - h, "minute"));
      }
      return c;
    }, r._pre_render_events_line = function(o, c) {
      o.sort(function(M, N) {
        return M.start_date.valueOf() == N.start_date.valueOf() ? M.id > N.id ? 1 : -1 : M.start_date > N.start_date ? 1 : -1;
      });
      var h = [], y = [];
      this._min_mapped_duration = Math.floor(60 * this.xy.min_event_height / this.config.hour_size_px);
      for (var b = 0; b < o.length; b++) {
        var p = o[b], u = p.start_date, m = p.end_date, l = u.getHours(), f = m.getHours();
        if (p._sday = this._get_event_sday(p), this._ignores[p._sday])
          o.splice(b, 1), b--;
        else {
          if (h[p._sday] || (h[p._sday] = []), !c) {
            p._inner = !1;
            for (var g = h[p._sday]; g.length; ) {
              var x = g[g.length - 1];
              if (!(this._get_event_mapped_end_date(x).valueOf() <= p.start_date.valueOf()))
                break;
              g.splice(g.length - 1, 1);
            }
            for (var w = g.length, E = !1, k = 0; k < g.length; k++)
              if (x = g[k], this._get_event_mapped_end_date(x).valueOf() <= p.start_date.valueOf()) {
                E = !0, p._sorder = x._sorder, w = k, p._inner = !0;
                break;
              }
            if (g.length && (g[g.length - 1]._inner = !0), !E)
              if (g.length)
                if (g.length <= g[g.length - 1]._sorder) {
                  if (g[g.length - 1]._sorder)
                    for (k = 0; k < g.length; k++) {
                      for (var S = !1, v = 0; v < g.length; v++)
                        if (g[v]._sorder == k) {
                          S = !0;
                          break;
                        }
                      if (!S) {
                        p._sorder = k;
                        break;
                      }
                    }
                  else
                    p._sorder = 0;
                  p._inner = !0;
                } else {
                  var D = g[0]._sorder;
                  for (k = 1; k < g.length; k++)
                    g[k]._sorder > D && (D = g[k]._sorder);
                  p._sorder = D + 1, p._inner = !1;
                }
              else
                p._sorder = 0;
            g.splice(w, w == g.length ? 0 : 1, p), g.length > (g.max_count || 0) ? (g.max_count = g.length, p._count = g.length) : p._count = p._count ? p._count : 1;
          }
          (l < this.config.first_hour || f >= this.config.last_hour) && (y.push(p), o[b] = p = this._copy_event(p), l < this.config.first_hour && (p.start_date.setHours(this.config.first_hour), p.start_date.setMinutes(0)), f >= this.config.last_hour && (p.end_date.setMinutes(0), p.end_date.setHours(this.config.last_hour)), p.start_date > p.end_date || l == this.config.last_hour) && (o.splice(b, 1), b--);
        }
      }
      if (!c) {
        for (b = 0; b < o.length; b++)
          o[b]._count = h[o[b]._sday].max_count;
        for (b = 0; b < y.length; b++)
          y[b]._count = h[y[b]._sday].max_count;
      }
      return o;
    }, r._time_order = function(o) {
      o.sort(function(c, h) {
        return c.start_date.valueOf() == h.start_date.valueOf() ? c._timed && !h._timed ? 1 : !c._timed && h._timed ? -1 : c.id > h.id ? 1 : -1 : c.start_date > h.start_date ? 1 : -1;
      });
    }, r._is_any_multiday_cell_visible = function(o, c, h) {
      var y = this._cols.length, b = !1, p = o, u = !0, m = new Date(c);
      for (r.date.day_start(new Date(c)).valueOf() != c.valueOf() && (m = r.date.day_start(m), m = r.date.add(m, 1, "day")); p < m; ) {
        u = !1;
        var l = this.locate_holder_day(p, !1, h) % y;
        if (!this._ignores[l]) {
          b = !0;
          break;
        }
        p = r.date.add(p, 1, "day");
      }
      return u || b;
    }, r._pre_render_events_table = function(o, c) {
      this._time_order(o);
      for (var h, y = [], b = [[], [], [], [], [], [], []], p = this._colsS.heights, u = this._cols.length, m = {}, l = 0; l < o.length; l++) {
        var f = o[l], g = f.id;
        m[g] || (m[g] = { first_chunk: !0, last_chunk: !0 });
        var x = m[g], w = h || f.start_date, E = f.end_date;
        w < this._min_date && (x.first_chunk = !1, w = this._min_date), E > this._max_date && (x.last_chunk = !1, E = this._max_date);
        var k = this.locate_holder_day(w, !1, f);
        if (f._sday = k % u, !this._ignores[f._sday] || !f._timed) {
          var S = this.locate_holder_day(E, !0, f) || u;
          if (f._eday = S % u || u, f._length = S - k, f._sweek = Math.floor((this._correct_shift(w.valueOf(), 1) - this._min_date.valueOf()) / (864e5 * u)), r._is_any_multiday_cell_visible(w, E, f)) {
            var v, D = b[f._sweek];
            for (v = 0; v < D.length && !(D[v]._eday <= f._sday); v++)
              ;
            if (f._sorder && c || (f._sorder = v), f._sday + f._length <= u)
              h = null, y.push(f), D[v] = f, p[f._sweek] = D.length - 1, f._first_chunk = x.first_chunk, f._last_chunk = x.last_chunk;
            else {
              var M = this._copy_event(f);
              M.id = f.id, M._length = u - f._sday, M._eday = u, M._sday = f._sday, M._sweek = f._sweek, M._sorder = f._sorder, M.end_date = this.date.add(w, M._length, "day"), M._first_chunk = x.first_chunk, x.first_chunk && (x.first_chunk = !1), y.push(M), D[v] = M, h = M.end_date, p[f._sweek] = D.length - 1, l--;
            }
          } else
            h = null;
        }
      }
      return y;
    }, r._copy_dummy = function() {
      var o = new Date(this.start_date), c = new Date(this.end_date);
      this.start_date = o, this.end_date = c;
    }, r._copy_event = function(o) {
      return this._copy_dummy.prototype = o, new this._copy_dummy();
    }, r._rendered = [], r.clear_view = function() {
      for (var o = 0; o < this._rendered.length; o++) {
        var c = this._rendered[o];
        c.parentNode && c.parentNode.removeChild(c);
      }
      this._rendered = [];
    }, r.updateEvent = function(o) {
      var c = this.getEvent(o);
      this.clear_event(o), c && this.is_visible_events(c) && this.filter_event(o, c) && (this._table_view || this.config.multi_day || c._timed) && (this.config.update_render ? this.render_view_data() : this.getState().mode != "month" || this.getState().drag_id || this.isOneDayEvent(c) ? this.render_view_data([c], !0) : this.render_view_data());
    }, r.clear_event = function(o) {
      this.for_rendered(o, function(c, h) {
        c.parentNode && c.parentNode.removeChild(c), r._rendered.splice(h, 1);
      });
    }, r._y_from_date = function(o) {
      var c = 60 * o.getHours() + o.getMinutes();
      return Math.round((60 * c * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px);
    }, r._calc_event_y = function(o, c) {
      c = c || 0;
      var h = 60 * o.start_date.getHours() + o.start_date.getMinutes(), y = 60 * o.end_date.getHours() + o.end_date.getMinutes() || 60 * r.config.last_hour;
      return { top: this._y_from_date(o.start_date), height: Math.max(c, (y - h) * this.config.hour_size_px / 60) };
    }, r.render_event = function(o, c, h) {
      var y = r.xy.menu_width, b = this.config.use_select_menu_space ? 0 : y;
      if (!(o._sday < 0)) {
        var p = r.locate_holder(o._sday);
        if (p) {
          c = c || p;
          var u = this._calc_event_y(o, r.xy.min_event_height), m = u.top, l = u.height, f = o._count || 1, g = o._sorder || 0;
          h = h || p.clientWidth, this.config.day_column_padding && (h -= this.config.day_column_padding);
          var x = Math.floor((h - b) / f), w = g * x + 1;
          if (o._inner || (x *= f - g), this.config.cascade_event_display) {
            const A = this.config.cascade_event_count, C = this.config.cascade_event_margin;
            let O, H = (f - g - 1) % A * C, z = g % A * C;
            f * C < h - this.config.day_column_padding ? O = o._inner ? H / 2 : 0 : (O = o._inner ? H / 3 : 0, w = z / 3, f * C / 2 > h - this.config.day_column_padding && (O = o._inner ? H / A : 0, w = z / A)), x = Math.floor(h - b - w - O);
          }
          o._mode = l < 30 ? "smallest" : l < 42 ? "small" : null;
          var E = this._render_v_bar(o, b + w, m, x, l, o._text_style, r.templates.event_header(o.start_date, o.end_date, o), r.templates.event_text(o.start_date, o.end_date, o));
          if (o._mode === "smallest" ? E.classList.add("dhx_cal_event--xsmall") : o._mode === "small" && E.classList.add("dhx_cal_event--small"), this._waiAria.eventAttr(o, E), this._rendered.push(E), c.appendChild(E), w = w + parseInt(this.config.rtl ? p.style.right : p.style.left, 10) + b, this._edit_id == o.id) {
            E.style.zIndex = 1, x = Math.max(x, r.xy.editor_width), (E = document.createElement("div")).setAttribute("event_id", o.id), E.setAttribute(this.config.event_attribute, o.id), this._waiAria.eventAttr(o, E), E.className = "dhx_cal_event dhx_cal_editor", this.config.rtl && w++, this.set_xy(E, x, l, w, m), o.color && E.style.setProperty("--dhx-scheduler-event-background", o.color);
            var k = r.templates.event_class(o.start_date, o.end_date, o);
            k && (E.className += " " + k);
            var S = document.createElement("div");
            S.style.cssText += "overflow:hidden;height:100%", E.appendChild(S), this._els.dhx_cal_data[0].appendChild(E), this._rendered.push(E), S.innerHTML = "<textarea class='dhx_cal_editor'>" + o.text + "</textarea>", this._editor = S.querySelector("textarea"), r.event(this._editor, "keydown", function(A) {
              if (A.shiftKey)
                return !0;
              var C = A.keyCode;
              C == r.keys.edit_save && r.editStop(!0), C == r.keys.edit_cancel && r.editStop(!1), C != r.keys.edit_save && C != r.keys.edit_cancel || A.preventDefault && A.preventDefault();
            }), r.event(this._editor, "selectstart", function(A) {
              return A.cancelBubble = !0, !0;
            }), r._focus(this._editor, !0), this._els.dhx_cal_data[0].scrollLeft = 0;
          }
          if (this.xy.menu_width !== 0 && this._select_id == o.id) {
            this.config.cascade_event_display && this._drag_mode && (E.style.zIndex = 1);
            for (var v, D = this.config["icons_" + (this._edit_id == o.id ? "edit" : "select")], M = "", N = 0; N < D.length; N++) {
              const A = D[N];
              v = this._waiAria.eventMenuAttrString(A), M += `<div class='dhx_menu_icon ${A}' title='${this.locale.labels[A]}' ${v}></div>`;
            }
            var T = this._render_v_bar(o, w - y - 1, m, y, null, "", "<div class='dhx_menu_head'></div>", M, !0);
            o.color && T.style.setProperty("--dhx-scheduler-event-background", o.color), o.textColor && T.style.setProperty("--dhx-scheduler-event-color", o.textColor), this._els.dhx_cal_data[0].appendChild(T), this._rendered.push(T);
          }
          this.config.drag_highlight && this._drag_id == o.id && this.highlightEventPosition(o);
        }
      }
    }, r._render_v_bar = function(o, c, h, y, b, p, u, m, l) {
      var f = document.createElement("div"), g = o.id, x = l ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event", w = r.getState();
      w.drag_id == o.id && (x += " dhx_cal_event_drag"), w.select_id == o.id && (x += " dhx_cal_event_selected");
      var E = r.templates.event_class(o.start_date, o.end_date, o);
      E && (x = x + " " + E), this.config.cascade_event_display && (x += " dhx_cal_event_cascade");
      var k = y - 1, S = `<div event_id="${g}" ${this.config.event_attribute}="${g}" class="${x}"
				style="position:absolute; top:${h}px; ${this.config.rtl ? "right:" : "left:"}${c}px; width:${k}px; height:${b}px; ${p || ""}" 
				data-bar-start="${o.start_date.valueOf()}" data-bar-end="${o.end_date.valueOf()}">
				</div>`;
      f.innerHTML = S;
      var v = f.cloneNode(!0).firstChild;
      if (!l && r.renderEvent(v, o, y, b, u, m))
        return o.color && v.style.setProperty("--dhx-scheduler-event-background", o.color), o.textColor && v.style.setProperty("--dhx-scheduler-event-color", o.textColor), v;
      v = f.firstChild, o.color && v.style.setProperty("--dhx-scheduler-event-background", o.color), o.textColor && v.style.setProperty("--dhx-scheduler-event-color", o.textColor);
      var D = '<div class="dhx_event_move dhx_header" >&nbsp;</div>';
      D += '<div class="dhx_event_move dhx_title">' + u + "</div>", D += '<div class="dhx_body">' + m + "</div>";
      var M = "dhx_event_resize dhx_footer";
      return (l || o._drag_resize === !1) && (M = "dhx_resize_denied " + M), D += '<div class="' + M + '" style=" width:' + (l ? " margin-top:-1px;" : "") + '" ></div>', v.innerHTML = D, v;
    }, r.renderEvent = function() {
      return !1;
    }, r.locate_holder = function(o) {
      return this._mode == "day" ? this._els.dhx_cal_data[0].firstChild : this._els.dhx_cal_data[0].childNodes[o];
    }, r.locate_holder_day = function(o, c) {
      var h = Math.floor((this._correct_shift(o, 1) - this._min_date) / 864e5);
      return c && this.date.time_part(o) && h++, h;
    }, r._get_dnd_order = function(o, c, h) {
      if (!this._drag_event)
        return o;
      this._drag_event._orig_sorder ? o = this._drag_event._orig_sorder : this._drag_event._orig_sorder = o;
      for (var y = c * o; y + c > h; )
        o--, y -= c;
      return Math.max(o, 0);
    }, r._get_event_bar_pos = function(o) {
      var c = this.config.rtl, h = this._colsS, y = h[o._sday], b = h[o._eday];
      c && (y = h[h.col_length] - h[o._eday] + h[0], b = h[h.col_length] - h[o._sday] + h[0]), b == y && (b = h[o._eday + 1]);
      var p = this.xy.bar_height, u = o._sorder;
      if (o.id == this._drag_id) {
        var m = h.heights[o._sweek + 1] - h.heights[o._sweek] - this.xy.month_head_height;
        u = r._get_dnd_order(u, p, m);
      }
      var l = u * p;
      return { x: y, x2: b, y: h.heights[o._sweek] + (h.height ? this.xy.month_scale_height + 2 : 2) + l };
    }, r.render_event_bar = function(o) {
      var c = this._rendered_location, h = this._get_event_bar_pos(o), y = h.y, b = h.x, p = h.x2, u = "";
      if (p) {
        var m = r.config.resize_month_events && this._mode == "month" && (!o._timed || r.config.resize_month_timed), l = document.createElement("div"), f = o.hasOwnProperty("_first_chunk") && o._first_chunk, g = o.hasOwnProperty("_last_chunk") && o._last_chunk, x = m && (o._timed || f), w = m && (o._timed || g), E = !0, k = "dhx_cal_event_clear";
        o._timed && !m || (E = !1, k = "dhx_cal_event_line"), f && (k += " dhx_cal_event_line_start"), g && (k += " dhx_cal_event_line_end"), x && (u += "<div class='dhx_event_resize dhx_event_resize_start'></div>"), w && (u += "<div class='dhx_event_resize dhx_event_resize_end'></div>");
        var S = r.templates.event_class(o.start_date, o.end_date, o);
        S && (k += " " + S);
        var v = o.color ? "--dhx-scheduler-event-background:" + o.color + ";" : "", D = o.textColor ? "--dhx-scheduler-event-color:" + o.textColor + ";" : "", M = ["position:absolute", "top:" + y + "px", "left:" + b + "px", "width:" + (p - b - (E ? 1 : 0)) + "px", "height:" + (this.xy.bar_height - 2) + "px", D, v, o._text_style || ""].join(";"), N = "<div event_id='" + o.id + "' " + this.config.event_attribute + "='" + o.id + "' class='" + k + "' style='" + M + "'" + this._waiAria.eventBarAttrString(o) + ">";
        m && (N += u), r.getState().mode != "month" || o._beforeEventChangedFlag || (o = r.getEvent(o.id)), o._timed && (N += `<span class='dhx_cal_event_clear_date'>${r.templates.event_bar_date(o.start_date, o.end_date, o)}</span>`), N += "<div class='dhx_cal_event_line_content'>", N += r.templates.event_bar_text(o.start_date, o.end_date, o) + "</div>", N += "</div>", N += "</div>", l.innerHTML = N, this._rendered.push(l.firstChild), c.appendChild(l.firstChild);
      }
    }, r._locate_event = function(o) {
      for (var c = null; o && !c && o.getAttribute; )
        c = o.getAttribute(this.config.event_attribute), o = o.parentNode;
      return c;
    }, r.edit = function(o) {
      this._edit_id != o && (this.editStop(!1, o), this._edit_id = o, this.updateEvent(o));
    }, r.editStop = function(o, c) {
      if (!c || this._edit_id != c) {
        var h = this.getEvent(this._edit_id);
        h && (o && (h.text = this._editor.value), this._edit_id = null, this._editor = null, this.updateEvent(h.id), this._edit_stop_event(h, o));
      }
    }, r._edit_stop_event = function(o, c) {
      this._new_event ? (c ? this.callEvent("onEventAdded", [o.id, o]) : o && this.deleteEvent(o.id, !0), delete o.$new, this._new_event = null) : c && this.callEvent("onEventChanged", [o.id, o]);
    }, r.getEvents = function(o, c) {
      var h = [];
      for (var y in this._events) {
        var b = this._events[y];
        b && (!o && !c || b.start_date < c && b.end_date > o) && h.push(b);
      }
      return h;
    }, r.getRenderedEvent = function(o) {
      if (o) {
        for (var c = r._rendered, h = 0; h < c.length; h++) {
          var y = c[h];
          if (y.getAttribute(r.config.event_attribute) == o)
            return y;
        }
        return null;
      }
    }, r.showEvent = function(o, c) {
      o && typeof o == "object" && (c = o.mode, g = o.section, o = o.section);
      var h = typeof o == "number" || typeof o == "string" ? r.getEvent(o) : o;
      if (c = c || r._mode, h && (!this.checkEvent("onBeforeEventDisplay") || this.callEvent("onBeforeEventDisplay", [h, c]))) {
        var y = r.config.scroll_hour;
        r.config.scroll_hour = h.start_date.getHours();
        var b = r.config.preserve_scroll;
        r.config.preserve_scroll = !1;
        var p = h.color, u = h.textColor;
        if (r.config.highlight_displayed_event && (h.color = r.config.displayed_event_color, h.textColor = r.config.displayed_event_text_color), r.setCurrentView(new Date(h.start_date), c), r.config.scroll_hour = y, r.config.preserve_scroll = b, r.matrix && r.matrix[c]) {
          var m = r.getView(), l = m.y_property, f = r.getEvent(h.id);
          if (f) {
            if (!g) {
              var g = f[l];
              Array.isArray(g) ? g = g[0] : typeof g == "string" && r.config.section_delimiter && g.indexOf(r.config.section_delimiter) > -1 && (g = g.split(r.config.section_delimiter)[0]);
            }
            var x = m.getSectionTop(g), w = m.posFromDate(f.start_date), E = r.$container.querySelector(".dhx_timeline_data_wrapper");
            if (w -= (E.offsetWidth - m.dx) / 2, x = x - E.offsetHeight / 2 + m.dy / 2, m._smartRenderingEnabled())
              var k = m.attachEvent("onScroll", function() {
                S(), m.detachEvent(k);
              });
            m.scrollTo({ left: w, top: x }), m._smartRenderingEnabled() || S();
          }
        } else
          S();
        r.callEvent("onAfterEventDisplay", [h, c]);
      }
      function S() {
        h.color = p, h.textColor = u;
      }
    };
  }(i), function(r) {
    r._append_drag_marker = function(o) {
      if (!o.parentNode) {
        var c = r._els.dhx_cal_data[0].lastChild, h = r._getClassName(c);
        h.indexOf("dhx_scale_holder") < 0 && c.previousSibling && (c = c.previousSibling), h = r._getClassName(c), c && h.indexOf("dhx_scale_holder") === 0 && c.appendChild(o);
      }
    }, r._update_marker_position = function(o, c) {
      var h = r._calc_event_y(c, 0);
      o.style.top = h.top + "px", o.style.height = h.height + "px";
    }, r.highlightEventPosition = function(o) {
      var c = document.createElement("div");
      c.setAttribute("event_id", o.id), c.setAttribute(this.config.event_attribute, o.id), this._rendered.push(c), this._update_marker_position(c, o);
      var h = this.templates.drag_marker_class(o.start_date, o.end_date, o), y = this.templates.drag_marker_content(o.start_date, o.end_date, o);
      c.className = "dhx_drag_marker", h && (c.className += " " + h), y && (c.innerHTML = y), this._append_drag_marker(c);
    };
  }(i), La(i), $a(i), Ha(i), function(r) {
    r.getRootView = function() {
      return { view: { render: function() {
        return { tag: "div", type: 1, attrs: { style: "width:100%;height:100%;" }, hooks: { didInsert: function() {
          r.setCurrentView();
        } }, body: [{ el: this.el, type: 1 }] };
      }, init: function() {
        var o = document.createElement("DIV");
        o.id = "scheduler_" + r.uid(), o.style.width = "100%", o.style.height = "100%", o.classList.add("dhx_cal_container"), o.cmp = "grid", o.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" data-tab="day"></div><div class="dhx_cal_tab" data-tab="week"></div><div class="dhx_cal_tab" data-tab="month"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', r.init(o), this.el = o;
      } }, type: 4 };
    };
  }(i), Va(i), za(i), typeof window < "u" && window.jQuery && (a = window.jQuery, s = 0, n = [], a.fn.dhx_scheduler = function(r) {
    if (typeof r != "string") {
      var o = [];
      return this.each(function() {
        if (this && this.getAttribute)
          if (this.getAttribute("dhxscheduler"))
            o.push(window[this.getAttribute("dhxscheduler")]);
          else {
            var c = "scheduler";
            s && (c = "scheduler" + (s + 1), window[c] = Scheduler.getSchedulerInstance());
            var h = window[c];
            for (var y in this.setAttribute("dhxscheduler", c), r)
              y != "data" && (h.config[y] = r[y]);
            this.getElementsByTagName("div").length || (this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', this.className += " dhx_cal_container"), h.init(this, h.config.date, h.config.mode), r.data && h.parse(r.data), o.push(h), s++;
          }
      }), o.length === 1 ? o[0] : o;
    }
    if (n[r])
      return n[r].apply(this, []);
    a.error("Method " + r + " does not exist on jQuery.dhx_scheduler");
  }), function(r) {
    (function() {
      var o = r.setCurrentView, c = r.updateView, h = null, y = null, b = function(m, l) {
        var f = this;
        I.clearTimeout(y), I.clearTimeout(h);
        var g = f._date, x = f._mode;
        u(this, m, l), y = setTimeout(function() {
          r.$destroyed || (f.callEvent("onBeforeViewChange", [x, g, l || f._mode, m || f._date]) ? (c.call(f, m, l), f.callEvent("onViewChange", [f._mode, f._date]), I.clearTimeout(h), y = 0) : u(f, g, x));
        }, r.config.delay_render);
      }, p = function(m, l) {
        var f = this, g = arguments;
        u(this, m, l), I.clearTimeout(h), h = setTimeout(function() {
          r.$destroyed || y || c.apply(f, g);
        }, r.config.delay_render);
      };
      function u(m, l, f) {
        l && (m._date = l), f && (m._mode = f);
      }
      r.attachEvent("onSchedulerReady", function() {
        r.config.delay_render ? (r.setCurrentView = b, r.updateView = p) : (r.setCurrentView = o, r.updateView = c);
      });
    })();
  }(i), function(r) {
    r.createDataProcessor = function(o) {
      var c, h;
      o instanceof Function ? c = o : o.hasOwnProperty("router") ? c = o.router : o.hasOwnProperty("event") && (c = o), h = c ? "CUSTOM" : o.mode || "REST-JSON";
      var y = new ct(o.url);
      return y.init(r), y.setTransactionMode({ mode: h, router: c }, o.batchUpdate), y;
    }, r.DataProcessor = ct;
  }(i), Ya(), function(r) {
    r.attachEvent("onSchedulerReady", function() {
      typeof dhtmlxError < "u" && window.dhtmlxError.catchError("LoadXML", function(o, c, h) {
        var y = h[0].responseText;
        switch (r.config.ajax_error) {
          case "alert":
            I.alert(y);
            break;
          case "console":
            I.console.log(y);
        }
      });
    });
  }(i);
  const _ = new Ra(ja);
  i.i18n = { addLocale: _.addLocale, setLocale: function(r) {
    if (typeof r == "string") {
      var o = _.getLocale(r);
      o || (o = _.getLocale("en")), i.locale = o;
    } else if (r)
      if (i.locale)
        for (var c in r)
          r[c] && typeof r[c] == "object" ? (i.locale[c] || (i.locale[c] = {}), i.mixin(i.locale[c], r[c], !0)) : i.locale[c] = r[c];
      else
        i.locale = r;
    var h = i.locale.labels;
    h.dhx_save_btn = h.icon_save, h.dhx_cancel_btn = h.icon_cancel, h.dhx_delete_btn = h.icon_delete, i.$container && i.get_elements();
  }, getLocale: _.getLocale }, i.i18n.setLocale("en"), i.ext = {}, ba(i);
  const d = {};
  return i.plugins = function(r) {
    return function(c, h, y) {
      const b = [];
      for (const p in c)
        if (c[p]) {
          const u = p.toLowerCase();
          h[u] && h[u].forEach(function(m) {
            const l = m.toLowerCase();
            c[l] || b.push(l);
          }), b.push(u);
        }
      return b.sort(function(p, u) {
        const m = y[p] || 0, l = y[u] || 0;
        return m > l ? 1 : m < l ? -1 : 0;
      }), b;
    }(r, { treetimeline: ["timeline"], daytimeline: ["timeline"], outerdrag: ["legacy"] }, { legacy: 1, limit: 1, timeline: 2, daytimeline: 3, treetimeline: 3, outerdrag: 6 }).forEach(function(c) {
      if (!d[c]) {
        const h = e.getExtension(c);
        if (!h)
          throw new Error("unknown plugin " + c);
        h(i), d[c] = !0;
      }
    }), d;
  }, i.plugins({ all_timed: "short" }), i;
}
class Ba {
  constructor(i) {
    this._extensions = {};
    for (const t in i)
      this._extensions[t] = i[t];
  }
  addExtension(i, t) {
    this._extensions[i] = t;
  }
  getExtension(i) {
    return this._extensions[i];
  }
}
typeof dhtmlx < "u" && dhtmlx.attaches && (dhtmlx.attaches.attachScheduler = function(e, i, t, a) {
  t = t || '<div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div>';
  var s = document.createElement("DIV");
  return s.id = "dhxSchedObj_" + this._genStr(12), s.innerHTML = '<div id="' + s.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + t + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>', document.body.appendChild(s.firstChild), this.attachObject(s.id, !1, !0), this.vs[this.av].sched = a, this.vs[this.av].schedId = s.id, a.setSizes = a.updateView, a.destructor = function() {
  }, a.init(s.id, e, i), this.vs[this._viewRestore()].sched;
});
function Ot(e) {
  e._inited_multisection_copies || (e.attachEvent("onEventIdChange", function(i, t) {
    var a = this._multisection_copies;
    if (a && a[i] && !a[t]) {
      var s = a[i];
      delete a[i], a[t] = s;
    }
  }), e._inited_multisection_copies = !0), e._register_copies_array = function(i) {
    for (var t = 0; t < i.length; t++)
      this._register_copy(i[t]);
  }, e._register_copy = function(i) {
    if (this._multisection_copies) {
      this._multisection_copies[i.id] || (this._multisection_copies[i.id] = {});
      var t = i[this._get_section_property()];
      this._multisection_copies[i.id][t] = i;
    }
  }, e._get_copied_event = function(i, t) {
    if (!this._multisection_copies[i])
      return null;
    if (this._multisection_copies[i][t])
      return this._multisection_copies[i][t];
    var a = this._multisection_copies[i];
    if (e._drag_event && e._drag_event._orig_section && a[e._drag_event._orig_section])
      return a[e._drag_event._orig_section];
    var s = 1 / 0, n = null;
    for (var _ in a)
      a[_]._sorder < s && (n = a[_], s = a[_]._sorder);
    return n;
  }, e._clear_copied_events = function() {
    this._multisection_copies = {};
  }, e._restore_render_flags = function(i) {
    for (var t = this._get_section_property(), a = 0; a < i.length; a++) {
      var s = i[a], n = e._get_copied_event(s.id, s[t]);
      if (n)
        for (var _ in n)
          _.indexOf("_") === 0 && (s[_] = n[_]);
    }
  };
}
const Ze = { from_scheduler: null, to_scheduler: null, drag_data: null, drag_placeholder: null, delete_dnd_holder: function() {
  var e = this.drag_placeholder;
  e && (e.parentNode && e.parentNode.removeChild(e), document.body.className = document.body.className.replace(" dhx_no_select", ""), this.drag_placeholder = null);
}, copy_event_node: function(e, i) {
  for (var t = null, a = 0; a < i._rendered.length; a++) {
    var s = i._rendered[a];
    if (s.getAttribute(i.config.event_attribute) == e.id || s.getAttribute(i.config.event_attribute) == i._drag_id) {
      (t = s.cloneNode(!0)).style.position = t.style.top = t.style.left = "";
      break;
    }
  }
  return t || document.createElement("div");
}, create_dnd_holder: function(e, i) {
  if (this.drag_placeholder)
    return this.drag_placeholder;
  var t = document.createElement("div"), a = i.templates.event_outside(e.start_date, e.end_date, e);
  return a ? t.innerHTML = a : t.appendChild(this.copy_event_node(e, i)), t.className = "dhx_drag_placeholder", t.style.position = "absolute", this.drag_placeholder = t, document.body.appendChild(t), document.body.className += " dhx_no_select", t;
}, move_dnd_holder: function(e) {
  var i = { x: e.clientX, y: e.clientY };
  if (this.create_dnd_holder(this.drag_data.ev, this.from_scheduler), this.drag_placeholder) {
    var t = i.x, a = i.y, s = document.documentElement, n = document.body, _ = this.drag_placeholder;
    _.style.left = 10 + t + (s && s.scrollLeft || n && n.scrollLeft || 0) - (s.clientLeft || 0) + "px", _.style.top = 10 + a + (s && s.scrollTop || n && n.scrollTop || 0) - (s.clientTop || 0) + "px";
  }
}, clear_scheduler_dnd: function(e) {
  e._drag_id = e._drag_pos = e._drag_mode = e._drag_event = e._new_event = null;
}, stop_drag: function(e) {
  e && this.clear_scheduler_dnd(e), this.delete_dnd_holder(), this.drag_data = null;
}, inject_into_scheduler: function(e, i, t) {
  e._count = 1, e._sorder = 0, e.event_pid && e.event_pid != "0" && (e.event_pid = null, e.rec_type = e.rec_pattern = "", e.event_length = 0), i._drag_event = e, i._events[e.id] = e, i._drag_id = e.id, i._drag_mode = "move", t && i._on_mouse_move(t);
}, start_dnd: function(e) {
  if (e.config.drag_out) {
    this.from_scheduler = e, this.to_scheduler = e;
    var i = this.drag_data = {};
    i.ev = e._drag_event, i.orig_id = e._drag_event.id;
  }
}, land_into_scheduler: function(e, i) {
  if (!e.config.drag_in)
    return this.move_dnd_holder(i), !1;
  var t = this.drag_data, a = e._lame_clone(t.ev);
  if (e != this.from_scheduler) {
    a.id = e.uid();
    var s = a.end_date - a.start_date;
    a.start_date = new Date(e.getState().min_date), a.end_date = new Date(a.start_date.valueOf() + s);
  } else
    a.id = this.drag_data.orig_id, a._dhx_changed = !0;
  return this.drag_data.target_id = a.id, !!e.callEvent("onBeforeEventDragIn", [a.id, a, i]) && (this.to_scheduler = e, this.inject_into_scheduler(a, e, i), this.delete_dnd_holder(), e.updateView(), e.callEvent("onEventDragIn", [a.id, a, i]), !0);
}, drag_from_scheduler: function(e, i) {
  if (this.drag_data && e._drag_id && e.config.drag_out) {
    if (!e.callEvent("onBeforeEventDragOut", [e._drag_id, e._drag_event, i]))
      return !1;
    this.to_scheduler == e && (this.to_scheduler = null), this.create_dnd_holder(this.drag_data.ev, e);
    var t = e._drag_id;
    return this.drag_data.target_id = null, delete e._events[t], this.clear_scheduler_dnd(e), e.updateEvent(t), e.callEvent("onEventDragOut", [t, this.drag_data.ev, i]), !0;
  }
  return !1;
}, reset_event: function(e, i) {
  this.inject_into_scheduler(e, i), this.stop_drag(i), i.updateView();
}, move_permanently: function(e, i, t, a) {
  a.callEvent("onEventAdded", [i.id, i]), this.inject_into_scheduler(e, t), this.stop_drag(t), e.event_pid && e.event_pid != "0" ? (t.callEvent("onConfirmedBeforeEventDelete", [e.id]), t.updateEvent(i.event_pid)) : t.deleteEvent(e.id), t.updateView(), a.updateView();
} };
let ht = !1;
const ta = [];
function aa(e) {
  e.attachEvent("onSchedulerReady", function() {
    (function(i) {
      i.event(document.body, "mousemove", function(t) {
        var a = Ze, s = a.target_scheduler;
        if (s)
          if (a.from_scheduler) {
            if (!s._drag_id) {
              var n = a.to_scheduler;
              n && !a.drag_from_scheduler(n, t) || a.land_into_scheduler(s, t);
            }
          } else
            s.getState().drag_mode == "move" && s.config.drag_out && a.start_dnd(s);
        else
          a.from_scheduler && (a.to_scheduler ? a.drag_from_scheduler(a.to_scheduler, t) : a.move_dnd_holder(t));
        a.target_scheduler = null;
      }), i.event(document.body, "mouseup", function(t) {
        var a = Ze, s = a.from_scheduler, n = a.to_scheduler;
        if (s)
          if (n && s == n)
            s.updateEvent(a.drag_data.target_id);
          else if (n && s !== n) {
            var _ = a.drag_data.ev, d = n.getEvent(a.drag_data.target_id);
            s.callEvent("onEventDropOut", [_.id, _, n, t]) ? a.move_permanently(_, d, s, n) : a.reset_event(_, s);
          } else
            _ = a.drag_data.ev, s.callEvent("onEventDropOut", [_.id, _, null, t]) && a.reset_event(_, s);
        a.stop_drag(), a.current_scheduler = a.from_scheduler = a.to_scheduler = null;
      });
    })(e), ht = !0;
  }, { once: !0 }), e.attachEvent("onDestroy", function() {
    ht = !1;
    const i = ta.pop();
    i && aa(i);
  }, { once: !0 });
}
function Wa(e) {
  (function() {
    var i = [];
    function t() {
      return !!i.length;
    }
    function a(d) {
      setTimeout(function() {
        if (e.$destroyed)
          return !0;
        t() || function(r, o) {
          for (; r && r != o; )
            r = r.parentNode;
          return r == o;
        }(document.activeElement, e.$container) || e.focus();
      }, 1);
    }
    function s(d) {
      var r = (d = d || window.event).currentTarget;
      r == i[i.length - 1] && e.$keyboardNavigation.trapFocus(r, d);
    }
    if (e.attachEvent("onLightbox", function() {
      var d;
      d = e.getLightbox(), e.eventRemove(d, "keydown", s), e.event(d, "keydown", s), i.push(d);
    }), e.attachEvent("onAfterLightbox", function() {
      var d = i.pop();
      d && e.eventRemove(d, "keydown", s), a();
    }), e.attachEvent("onAfterQuickInfo", function() {
      a();
    }), !e._keyNavMessagePopup) {
      e._keyNavMessagePopup = !0;
      var n = null, _ = null;
      const d = [];
      e.attachEvent("onMessagePopup", function(r) {
        for (n = document.activeElement, _ = n; _ && e._getClassName(_).indexOf("dhx_cal_data") < 0; )
          _ = _.parentNode;
        _ && (_ = _.parentNode), e.eventRemove(r, "keydown", s), e.event(r, "keydown", s), d.push(r);
      }), e.attachEvent("onAfterMessagePopup", function() {
        var r = d.pop();
        r && e.eventRemove(r, "keydown", s), setTimeout(function() {
          if (e.$destroyed)
            return !0;
          for (var o = document.activeElement; o && e._getClassName(o).indexOf("dhx_cal_light") < 0; )
            o = o.parentNode;
          o || (n && n.parentNode ? n.focus() : _ && _.parentNode && _.focus(), n = null, _ = null);
        }, 1);
      });
    }
    e.$keyboardNavigation.isModal = t;
  })();
}
function Ja(e) {
  e._temp_key_scope = function() {
    e.config.key_nav = !0, e.$keyboardNavigation._pasteDate = null, e.$keyboardNavigation._pasteSection = null;
    var i = null, t = {};
    function a(_) {
      _ = _ || window.event, t.x = _.clientX, t.y = _.clientY;
    }
    function s() {
      for (var _, d, r = document.elementFromPoint(t.x, t.y); r && r != e._obj; )
        r = r.parentNode;
      return _ = r == e._obj, d = e.$keyboardNavigation.dispatcher.isEnabled(), _ || d;
    }
    function n(_) {
      return e._lame_copy({}, _);
    }
    document.body ? e.event(document.body, "mousemove", a) : e.event(window, "load", function() {
      e.event(document.body, "mousemove", a);
    }), e.attachEvent("onMouseMove", function(_, d) {
      var r = e.getState();
      if (r.mode && r.min_date) {
        var o = e.getActionData(d);
        e.$keyboardNavigation._pasteDate = o.date, e.$keyboardNavigation._pasteSection = o.section;
      }
    }), e._make_pasted_event = function(_) {
      var d = e.$keyboardNavigation._pasteDate, r = e.$keyboardNavigation._pasteSection, o = _.end_date - _.start_date, c = n(_);
      if (function(y) {
        delete y.rec_type, delete y.rec_pattern, delete y.event_pid, delete y.event_length;
      }(c), c.start_date = new Date(d), c.end_date = new Date(c.start_date.valueOf() + o), r) {
        var h = e._get_section_property();
        e.config.multisection && _[h] && e.isMultisectionEvent && e.isMultisectionEvent(_) ? c[h] = _[h] : c[h] = r;
      }
      return c;
    }, e._do_paste = function(_, d, r) {
      e.callEvent("onBeforeEventPasted", [_, d, r]) !== !1 && (e.addEvent(d), e.callEvent("onEventPasted", [_, d, r]));
    }, e._is_key_nav_active = function() {
      return !(!this._is_initialized() || this._is_lightbox_open() || !this.config.key_nav);
    }, e.event(document, "keydown", function(_) {
      (_.ctrlKey || _.metaKey) && _.keyCode == 86 && e._buffer_event && !e.$keyboardNavigation.dispatcher.isEnabled() && (e.$keyboardNavigation.dispatcher.isActive = s());
    }), e._key_nav_copy_paste = function(_) {
      if (!e._is_key_nav_active())
        return !0;
      if (_.keyCode == 37 || _.keyCode == 39) {
        _.cancelBubble = !0;
        var d = e.date.add(e._date, _.keyCode == 37 ? -1 : 1, e._mode);
        return e.setCurrentView(d), !0;
      }
      var r, o = (r = e.$keyboardNavigation.dispatcher.getActiveNode()) && r.eventId ? r.eventId : e._select_id;
      if ((_.ctrlKey || _.metaKey) && _.keyCode == 67)
        return o && (e._buffer_event = n(e.getEvent(o)), i = !0, e.callEvent("onEventCopied", [e.getEvent(o)])), !0;
      if ((_.ctrlKey || _.metaKey) && _.keyCode == 88 && o) {
        i = !1;
        var c = e._buffer_event = n(e.getEvent(o));
        e.updateEvent(c.id), e.callEvent("onEventCut", [c]);
      }
      if ((_.ctrlKey || _.metaKey) && _.keyCode == 86 && s()) {
        if (c = (c = e._buffer_event ? e.getEvent(e._buffer_event.id) : e._buffer_event) || e._buffer_event) {
          var h = e._make_pasted_event(c);
          i ? (h.id = e.uid(), e._do_paste(i, h, c)) : e.callEvent("onBeforeEventChanged", [h, _, !1, c]) && (e._do_paste(i, h, c), i = !0);
        }
        return !0;
      }
    };
  }, e._temp_key_scope();
}
function Xa(e) {
  e.$keyboardNavigation.attachSchedulerHandlers = function() {
    var i, t = e.$keyboardNavigation.dispatcher, a = function(r) {
      if (e.config.key_nav)
        return t.keyDownHandler(r);
    }, s = function() {
      t.keepScrollPosition(function() {
        t.focusGlobalNode();
      });
    };
    e.attachEvent("onDataRender", function() {
      e.config.key_nav && t.isEnabled() && !e.getState().editor_id && (clearTimeout(i), i = setTimeout(function() {
        if (e.$destroyed)
          return !0;
        t.isEnabled() || t.enable(), n();
      }));
    });
    var n = function() {
      if (t.isEnabled()) {
        var r = t.getActiveNode();
        r && (r.isValid() || (r = r.fallback()), !r || r instanceof e.$keyboardNavigation.MinicalButton || r instanceof e.$keyboardNavigation.MinicalCell || t.keepScrollPosition(function() {
          r.focus(!0);
        }));
      }
    };
    function _(r) {
      if (!e.config.key_nav)
        return !0;
      const o = e.getView();
      let c = !1;
      if (e.getState().mode === "month")
        c = e.$keyboardNavigation.isChildOf(r.target || r.srcElement, e.$container.querySelector(".dhx_cal_month_table"));
      else if (o && o.layout === "timeline")
        c = e.$keyboardNavigation.isChildOf(r.target || r.srcElement, e.$container.querySelector(".dhx_timeline_data_col"));
      else {
        const b = e.$container.querySelectorAll(".dhx_scale_holder");
        c = Array.from(b).some((p) => p === r.target.parentNode);
      }
      var h, y = e.getActionData(r);
      e._locate_event(r.target || r.srcElement) ? h = new e.$keyboardNavigation.Event(e._locate_event(r.target || r.srcElement)) : c && (h = new e.$keyboardNavigation.TimeSlot(), y.date && c && (h = h.nextSlot(new e.$keyboardNavigation.TimeSlot(y.date, null, y.section)))), h && (t.isEnabled() ? y.date && c && t.delay(function() {
        t.setActiveNode(h);
      }) : t.activeNode = h);
    }
    e.attachEvent("onSchedulerReady", function() {
      var r = e.$container;
      e.eventRemove(document, "keydown", a), e.eventRemove(r, "mousedown", _), e.eventRemove(r, "focus", s), e.config.key_nav ? (e.event(document, "keydown", a), e.event(r, "mousedown", _), e.event(r, "focus", s), r.setAttribute("tabindex", "0")) : r.removeAttribute("tabindex");
    });
    var d = e.updateEvent;
    e.updateEvent = function(r) {
      var o = d.apply(this, arguments);
      if (e.config.key_nav && t.isEnabled() && e.getState().select_id == r) {
        var c = new e.$keyboardNavigation.Event(r);
        e.getState().lightbox_id || function(h) {
          if (e.config.key_nav && t.isEnabled()) {
            var y = h, b = new e.$keyboardNavigation.Event(y.eventId);
            if (!b.isValid()) {
              var p = b.start || y.start, u = b.end || y.end, m = b.section || y.section;
              (b = new e.$keyboardNavigation.TimeSlot(p, u, m)).isValid() || (b = new e.$keyboardNavigation.TimeSlot());
            }
            t.setActiveNode(b);
            var l = t.getActiveNode();
            l && l.getNode && document.activeElement != l.getNode() && t.focusNode(t.getActiveNode());
          }
        }(c);
      }
      return o;
    }, e.attachEvent("onEventDeleted", function(r) {
      return e.config.key_nav && t.isEnabled() && t.getActiveNode().eventId == r && t.setActiveNode(new e.$keyboardNavigation.TimeSlot()), !0;
    }), e.attachEvent("onClearAll", function() {
      if (!e.config.key_nav)
        return !0;
      t.isEnabled() && t.getActiveNode() instanceof e.$keyboardNavigation.Event && t.setActiveNode(new e.$keyboardNavigation.TimeSlot());
    });
  };
}
function ut(e, i, t) {
  return this.catches || (this.catches = []), this;
}
ut.prototype.catchError = function(e, i) {
  this.catches[e] = i;
}, ut.prototype.throwError = function(e, i, t) {
  return this.catches[e] ? this.catches[e](e, i, t) : this.catches.ALL ? this.catches.ALL(e, i, t) : (global.alert("Error type: " + arguments[0] + `
Description: ` + arguments[1]), null);
};
class Ka {
  constructor(i) {
    this.map = null, this._markers = [], this.scheduler = i;
  }
  onEventClick(i) {
    if (this._markers && this._markers.length > 0) {
      for (let t = 0; t < this._markers.length; t++)
        if (i.id == this._markers[t].event.id) {
          let a = this.settings.zoom_after_resolve || this.settings.initial_zoom;
          i.lat && i.lng ? (this.map.setCenter({ lat: i.lat, lng: i.lng }), this.map.setZoom(a)) : (this.map.setCenter({ lat: this.settings.error_position.lat, lng: this.settings.error_position.lng }), this.map.setZoom(a)), google.maps.event.trigger(this._markers[t].marker, "click");
        }
    }
  }
  initialize(i, t) {
    this.settings = t;
    let a = this.scheduler, s = { center: { lat: t.initial_position.lat, lng: t.initial_position.lng }, zoom: t.initial_zoom, mapId: i.id, scrollwheel: !0, mapTypeId: t.type };
    if (this.map === null)
      this.map = new google.maps.Map(i, s);
    else {
      let n = this.map;
      i.appendChild(this.map.__gm.messageOverlay), i.appendChild(this.map.__gm.outerContainer), setTimeout(function() {
        n.setOptions({ container: i.id });
      }, 500);
    }
    google.maps.event.addListener(this.map, "dblclick", function(n) {
      const _ = new google.maps.Geocoder();
      if (!a.config.readonly && a.config.dblclick_create) {
        let d = n.latLng;
        _.geocode({ latLng: d }, function(r, o) {
          o == google.maps.GeocoderStatus.OK ? (d = r[0].geometry.location, a.addEventNow({ lat: d.lat(), lng: d.lng(), event_location: r[0].formatted_address, start_date: a.getState().date, end_date: a.date.add(a.getState().date, a.config.time_step, "minute") })) : console.error("Geocode was not successful for the following reason: " + o);
        });
      }
    });
  }
  destroy(i) {
    for (google.maps.event.clearInstanceListeners(window), google.maps.event.clearInstanceListeners(document), google.maps.event.clearInstanceListeners(i); i.firstChild; )
      i.firstChild.remove();
    i.innerHTML = "";
  }
  async addEventMarker(i) {
    let t = { title: i.text, position: {}, map: {} };
    i.lat && i.lng ? t.position = { lat: i.lat, lng: i.lng } : t.position = { lat: this.settings.error_position.lat, lng: this.settings.error_position.lng };
    const { AdvancedMarkerElement: a } = await google.maps.importLibrary("marker");
    let s;
    this.scheduler.ext.mapView.createMarker ? (t.map = this.map, s = this.scheduler.ext.mapView.createMarker(t)) : (s = new a(t), s.map = this.map), s.setMap(this.map), i["!nativeeditor_status"] == "true_deleted" && s.setMap(null), google.maps.event.addListener(s, "click", () => {
      this.infoWindow && this.infoWindow.close(), this.infoWindow = new google.maps.InfoWindow({ maxWidth: this.settings.info_window_max_width }), this.infoWindow.setContent(this.scheduler.templates.map_info_content(i)), this.infoWindow.open({ anchor: s, map: this.map });
    });
    let n = { event: i, ...t, marker: s };
    this._markers.push(n);
  }
  removeEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      i == this._markers[t].event.id && (this._markers[t].marker.setVisible(!1), this._markers[t].marker.setMap(null), this._markers[t].marker.setPosition(null), this._markers[t].marker = null, this._markers.splice(t, 1), t--);
  }
  updateEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      if (this._markers[t].event.id == i.id) {
        this._markers[t].event = i, this._markers[t].position.lat = i.lat, this._markers[t].position.lng = i.lng, this._markers[t].text = i.text;
        let a = new google.maps.LatLng(i.lat, i.lng);
        this._markers[t].marker.setPosition(a);
      }
  }
  clearEventMarkers() {
    if (this._markers.length > 0) {
      for (let i = 0; i < this._markers.length; i++)
        this._markers[i].marker.setMap(null);
      this._markers = [];
    }
  }
  setView(i, t, a) {
    this.map.setCenter({ lat: i, lng: t }), this.map.setZoom(a);
  }
  async resolveAddress(i) {
    const t = new google.maps.Geocoder();
    return await new Promise((a) => {
      t.geocode({ address: i }, function(s, n) {
        n == google.maps.GeocoderStatus.OK ? a({ lat: s[0].geometry.location.lat(), lng: s[0].geometry.location.lng() }) : (console.error("Geocode was not successful for the following reason: " + n), a({}));
      });
    });
  }
}
class Ga {
  constructor(i) {
    this.map = null, this._markers = [], this.scheduler = i;
  }
  onEventClick(i) {
    if (this._markers && this._markers.length > 0)
      for (let t = 0; t < this._markers.length; t++)
        i.id == this._markers[t].event.id && (this._markers[t].marker.openPopup(), this._markers[t].marker.closeTooltip(), i.lat && i.lng ? this.setView(i.lat, i.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom) : this.setView(this.settings.error_position.lat, this.settings.error_position.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom));
  }
  initialize(i, t) {
    let a = this.scheduler, s = document.createElement("div");
    s.className = "mapWrapper", s.id = "mapWrapper", s.style.width = i.style.width, s.style.height = i.style.height, i.appendChild(s);
    let n = L.map(s, { center: L.latLng(t.initial_position.lat, t.initial_position.lng), zoom: t.initial_zoom, keyboard: !1 });
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(n), n.on("dblclick", async function(_) {
      let d = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${_.latlng.lat}&lon=${_.latlng.lng}&format=json`, { method: "GET", headers: { "Accept-Language": "en" } }).then((r) => r.json());
      if (d.address) {
        let r = d.address.country;
        a.addEventNow({ lat: _.latlng.lat, lng: _.latlng.lng, event_location: r, start_date: a.getState().date, end_date: a.date.add(a.getState().date, a.config.time_step, "minute") });
      } else
        console.error("unable recieve a position of the event", d.error);
    }), this.map = n, this.settings = t;
  }
  destroy(i) {
    for (this.map.remove(); i.firstChild; )
      i.firstChild.remove();
    i.innerHTML = "";
  }
  addEventMarker(i) {
    const t = L.icon({ iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png", iconSize: [25, 41], shadowSize: [30, 65], iconAnchor: [12, 41], shadowAnchor: [7, 65] });
    let a = { minWidth: 180, maxWidth: this.settings.info_window_max_width };
    const s = L.popup(a).setContent(this.scheduler.templates.map_info_content(i)), n = L.tooltip().setContent(i.text);
    let _ = [i.lat, i.lng];
    i.lat && i.lng || (_ = [this.settings.error_position.lat, this.settings.error_position.lng]);
    const d = { event: i, marker: L.marker(_, { icon: t }).bindPopup(s).bindTooltip(n).addTo(this.map) };
    this._markers.push(d);
  }
  removeEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      i == this._markers[t].event.id && (this.map.removeLayer(this._markers[t].marker), this._markers.splice(t, 1), t--);
  }
  updateEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      this._markers[t].event.id == i.id && (this._markers[t].event = i, i.lat && i.lng ? this._markers[t].marker.setLatLng([i.lat, i.lng]) : this._markers[t].marker.setLatLng([this.settings.error_position.lat, this.settings.error_position.lng]));
  }
  clearEventMarkers() {
    if (this._markers) {
      for (let i = 0; i < this._markers.length; i++)
        this.map.removeLayer(this._markers[i].marker);
      this._markers = [];
    }
  }
  setView(i, t, a) {
    this.map.setView([i, t], a);
  }
  async resolveAddress(i) {
    let t = {}, a = await fetch(`https://nominatim.openstreetmap.org/search?q=${i}&format=json`, { method: "GET", headers: { "Accept-Language": "en" } }).then((s) => s.json());
    return a && a.length ? (t.lat = +a[0].lat, t.lng = +a[0].lon) : console.error(`Unable recieve a position of the event's location: ${i}`), t;
  }
}
class Za {
  constructor(i) {
    this.map = null, this._markers = [], this.scheduler = i;
  }
  onEventClick(i) {
    if (this._markers && this._markers.length > 0)
      for (let t = 0; t < this._markers.length; t++) {
        const a = this._markers[t].marker.getPopup();
        a.isOpen() && a.remove(), i.id == this._markers[t].event.id && (this._markers[t].marker.togglePopup(), i.lat && i.lng ? this.setView(i.lat, i.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom) : this.setView(this.settings.error_position.lat, this.settings.error_position.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom));
      }
  }
  initialize(i, t) {
    let a = this.scheduler;
    mapboxgl.accessToken = t.accessToken;
    const s = new mapboxgl.Map({ container: i, center: [t.initial_position.lng, t.initial_position.lat], zoom: t.initial_zoom + 1 });
    s.on("dblclick", async function(n) {
      let _ = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${n.lngLat.lng},${n.lngLat.lat}.json?access_token=${t.accessToken}`).then((d) => d.json());
      if (_.features) {
        let d = _.features[0].place_name;
        a.addEventNow({ lat: n.lngLat.lat, lng: n.lngLat.lng, event_location: d, start_date: a.getState().date, end_date: a.date.add(a.getState().date, a.config.time_step, "minute") });
      } else
        console.error("unable recieve a position of the event");
    }), this.map = s, this.settings = t;
  }
  destroy(i) {
    for (this.map.remove(); i.firstChild; )
      i.firstChild.remove();
    i.innerHTML = "";
  }
  addEventMarker(i) {
    let t = [i.lng, i.lat];
    i.lat && i.lng || (t = [this.settings.error_position.lng, this.settings.error_position.lat]);
    const a = new mapboxgl.Popup({ offset: 25, focusAfterOpen: !1 }).setMaxWidth(`${this.settings.info_window_max_width}px`).setHTML(this.scheduler.templates.map_info_content(i)), s = { event: i, marker: new mapboxgl.Marker().setLngLat(t).setPopup(a).addTo(this.map) };
    this._markers.push(s);
  }
  removeEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      i == this._markers[t].event.id && (this._markers[t].marker.remove(), this._markers.splice(t, 1), t--);
  }
  updateEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      this._markers[t].event.id == i.id && (this._markers[t].event = i, i.lat && i.lng ? this._markers[t].marker.setLngLat([i.lng, i.lat]) : this._markers[t].marker.setLngLat([this.settings.error_position.lng, this.settings.error_position.lat]));
  }
  clearEventMarkers() {
    for (let i = 0; i < this._markers.length; i++)
      this._markers[i].marker.remove();
    this._markers = [];
  }
  setView(i, t, a) {
    this.map.setCenter([t, i]), this.map.setZoom(a);
  }
  async resolveAddress(i) {
    let t = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${i}.json?access_token=${this.settings.accessToken}`).then((s) => s.json()), a = {};
    return t && t.features.length ? (a.lng = t.features[0].center[0], a.lat = t.features[0].center[1]) : console.error(`Unable recieve a position of the event's location: ${i}`), a;
  }
}
var ft = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"], oe = function() {
  function e(i, t) {
    if (t === 0)
      throw new Error("Can't create weekday with n == 0");
    this.weekday = i, this.n = t;
  }
  return e.fromStr = function(i) {
    return new e(ft.indexOf(i));
  }, e.prototype.nth = function(i) {
    return this.n === i ? this : new e(this.weekday, i);
  }, e.prototype.equals = function(i) {
    return this.weekday === i.weekday && this.n === i.n;
  }, e.prototype.toString = function() {
    var i = ft[this.weekday];
    return this.n && (i = (this.n > 0 ? "+" : "") + String(this.n) + i), i;
  }, e.prototype.getJsWeekday = function() {
    return this.weekday === 6 ? 0 : this.weekday + 1;
  }, e;
}(), ee = function(e) {
  return e != null;
}, xe = function(e) {
  return typeof e == "number";
}, Lt = function(e) {
  return typeof e == "string" && ft.includes(e);
}, ce = Array.isArray, ke = function(e, i) {
  i === void 0 && (i = e), arguments.length === 1 && (i = e, e = 0);
  for (var t = [], a = e; a < i; a++)
    t.push(a);
  return t;
}, J = function(e, i) {
  var t = 0, a = [];
  if (ce(e))
    for (; t < i; t++)
      a[t] = [].concat(e);
  else
    for (; t < i; t++)
      a[t] = e;
  return a;
};
function Re(e, i, t) {
  t === void 0 && (t = " ");
  var a = String(e);
  return i |= 0, a.length > i ? String(a) : ((i -= a.length) > t.length && (t += J(t, i / t.length)), t.slice(0, i) + String(a));
}
var pe = function(e, i) {
  var t = e % i;
  return t * i < 0 ? t + i : t;
}, st = function(e, i) {
  return { div: Math.floor(e / i), mod: pe(e, i) };
}, we = function(e) {
  return !ee(e) || e.length === 0;
}, ne = function(e) {
  return !we(e);
}, K = function(e, i) {
  return ne(e) && e.indexOf(i) !== -1;
}, Pe = function(e, i, t, a, s, n) {
  return a === void 0 && (a = 0), s === void 0 && (s = 0), n === void 0 && (n = 0), new Date(Date.UTC(e, i - 1, t, a, s, n));
}, Qa = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], na = 864e5, ra = Pe(1970, 1, 1), en = [6, 0, 1, 2, 3, 4, 5], Je = function(e) {
  return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
}, ia = function(e) {
  return e instanceof Date;
}, Xe = function(e) {
  return ia(e) && !isNaN(e.getTime());
}, pt = function(e) {
  return i = ra, t = e.getTime() - i.getTime(), Math.round(t / na);
  var i, t;
}, oa = function(e) {
  return new Date(ra.getTime() + e * na);
}, tn = function(e) {
  var i = e.getUTCMonth();
  return i === 1 && Je(e.getUTCFullYear()) ? 29 : Qa[i];
}, Ye = function(e) {
  return en[e.getUTCDay()];
}, $t = function(e, i) {
  var t = Pe(e, i + 1, 1);
  return [Ye(t), tn(t)];
}, sa = function(e, i) {
  return i = i || e, new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), i.getHours(), i.getMinutes(), i.getSeconds(), i.getMilliseconds()));
}, gt = function(e) {
  return new Date(e.getTime());
}, Ht = function(e) {
  for (var i = [], t = 0; t < e.length; t++)
    i.push(gt(e[t]));
  return i;
}, Ke = function(e) {
  e.sort(function(i, t) {
    return i.getTime() - t.getTime();
  });
}, xt = function(e, i) {
  i === void 0 && (i = !0);
  var t = new Date(e);
  return [Re(t.getUTCFullYear().toString(), 4, "0"), Re(t.getUTCMonth() + 1, 2, "0"), Re(t.getUTCDate(), 2, "0"), "T", Re(t.getUTCHours(), 2, "0"), Re(t.getUTCMinutes(), 2, "0"), Re(t.getUTCSeconds(), 2, "0"), i ? "Z" : ""].join("");
}, wt = function(e) {
  var i = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/.exec(e);
  if (!i)
    throw new Error("Invalid UNTIL value: ".concat(e));
  return new Date(Date.UTC(parseInt(i[1], 10), parseInt(i[2], 10) - 1, parseInt(i[3], 10), parseInt(i[5], 10) || 0, parseInt(i[6], 10) || 0, parseInt(i[7], 10) || 0));
}, zt = function(e, i) {
  return e.toLocaleString("sv-SE", { timeZone: i }).replace(" ", "T") + "Z";
}, Ie = function() {
  function e(i, t) {
    this.minDate = null, this.maxDate = null, this._result = [], this.total = 0, this.method = i, this.args = t, i === "between" ? (this.maxDate = t.inc ? t.before : new Date(t.before.getTime() - 1), this.minDate = t.inc ? t.after : new Date(t.after.getTime() + 1)) : i === "before" ? this.maxDate = t.inc ? t.dt : new Date(t.dt.getTime() - 1) : i === "after" && (this.minDate = t.inc ? t.dt : new Date(t.dt.getTime() + 1));
  }
  return e.prototype.accept = function(i) {
    ++this.total;
    var t = this.minDate && i < this.minDate, a = this.maxDate && i > this.maxDate;
    if (this.method === "between") {
      if (t)
        return !0;
      if (a)
        return !1;
    } else if (this.method === "before") {
      if (a)
        return !1;
    } else if (this.method === "after")
      return !!t || (this.add(i), !1);
    return this.add(i);
  }, e.prototype.add = function(i) {
    return this._result.push(i), !0;
  }, e.prototype.getValue = function() {
    var i = this._result;
    switch (this.method) {
      case "all":
      case "between":
        return i;
      default:
        return i.length ? i[i.length - 1] : null;
    }
  }, e.prototype.clone = function() {
    return new e(this.method, this.args);
  }, e;
}(), mt = function(e, i) {
  return mt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, a) {
    t.__proto__ = a;
  } || function(t, a) {
    for (var s in a)
      Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
  }, mt(e, i);
};
function kt(e, i) {
  if (typeof i != "function" && i !== null)
    throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
  function t() {
    this.constructor = e;
  }
  mt(e, i), e.prototype = i === null ? Object.create(i) : (t.prototype = i.prototype, new t());
}
var he = function() {
  return he = Object.assign || function(e) {
    for (var i, t = 1, a = arguments.length; t < a; t++)
      for (var s in i = arguments[t])
        Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s]);
    return e;
  }, he.apply(this, arguments);
};
function j(e, i, t) {
  if (t || arguments.length === 2)
    for (var a, s = 0, n = i.length; s < n; s++)
      !a && s in i || (a || (a = Array.prototype.slice.call(i, 0, s)), a[s] = i[s]);
  return e.concat(a || Array.prototype.slice.call(i));
}
var X, qt = function(e) {
  function i(t, a, s) {
    var n = e.call(this, t, a) || this;
    return n.iterator = s, n;
  }
  return kt(i, e), i.prototype.add = function(t) {
    return !!this.iterator(t, this._result.length) && (this._result.push(t), !0);
  }, i;
}(Ie), Qe = { dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], tokens: { SKIP: /^[ \r\n\t]+|^\.$/, number: /^[1-9][0-9]*/, numberAsText: /^(one|two|three)/i, every: /^every/i, "day(s)": /^days?/i, "weekday(s)": /^weekdays?/i, "week(s)": /^weeks?/i, "hour(s)": /^hours?/i, "minute(s)": /^minutes?/i, "month(s)": /^months?/i, "year(s)": /^years?/i, on: /^(on|in)/i, at: /^(at)/i, the: /^the/i, first: /^first/i, second: /^second/i, third: /^third/i, nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i, last: /^last/i, for: /^for/i, "time(s)": /^times?/i, until: /^(un)?til/i, monday: /^mo(n(day)?)?/i, tuesday: /^tu(e(s(day)?)?)?/i, wednesday: /^we(d(n(esday)?)?)?/i, thursday: /^th(u(r(sday)?)?)?/i, friday: /^fr(i(day)?)?/i, saturday: /^sa(t(urday)?)?/i, sunday: /^su(n(day)?)?/i, january: /^jan(uary)?/i, february: /^feb(ruary)?/i, march: /^mar(ch)?/i, april: /^apr(il)?/i, may: /^may/i, june: /^june?/i, july: /^july?/i, august: /^aug(ust)?/i, september: /^sep(t(ember)?)?/i, october: /^oct(ober)?/i, november: /^nov(ember)?/i, december: /^dec(ember)?/i, comma: /^(,\s*|(and|or)\s*)+/i } }, Pt = function(e, i) {
  return e.indexOf(i) !== -1;
}, an = function(e) {
  return e.toString();
}, nn = function(e, i, t) {
  return "".concat(i, " ").concat(t, ", ").concat(e);
}, Ne = function() {
  function e(i, t, a, s) {
    if (t === void 0 && (t = an), a === void 0 && (a = Qe), s === void 0 && (s = nn), this.text = [], this.language = a || Qe, this.gettext = t, this.dateFormatter = s, this.rrule = i, this.options = i.options, this.origOptions = i.origOptions, this.origOptions.bymonthday) {
      var n = [].concat(this.options.bymonthday), _ = [].concat(this.options.bynmonthday);
      n.sort(function(c, h) {
        return c - h;
      }), _.sort(function(c, h) {
        return h - c;
      }), this.bymonthday = n.concat(_), this.bymonthday.length || (this.bymonthday = null);
    }
    if (ee(this.origOptions.byweekday)) {
      var d = ce(this.origOptions.byweekday) ? this.origOptions.byweekday : [this.origOptions.byweekday], r = String(d);
      this.byweekday = { allWeeks: d.filter(function(c) {
        return !c.n;
      }), someWeeks: d.filter(function(c) {
        return !!c.n;
      }), isWeekdays: r.indexOf("MO") !== -1 && r.indexOf("TU") !== -1 && r.indexOf("WE") !== -1 && r.indexOf("TH") !== -1 && r.indexOf("FR") !== -1 && r.indexOf("SA") === -1 && r.indexOf("SU") === -1, isEveryDay: r.indexOf("MO") !== -1 && r.indexOf("TU") !== -1 && r.indexOf("WE") !== -1 && r.indexOf("TH") !== -1 && r.indexOf("FR") !== -1 && r.indexOf("SA") !== -1 && r.indexOf("SU") !== -1 };
      var o = function(c, h) {
        return c.weekday - h.weekday;
      };
      this.byweekday.allWeeks.sort(o), this.byweekday.someWeeks.sort(o), this.byweekday.allWeeks.length || (this.byweekday.allWeeks = null), this.byweekday.someWeeks.length || (this.byweekday.someWeeks = null);
    } else
      this.byweekday = null;
  }
  return e.isFullyConvertible = function(i) {
    if (!(i.options.freq in e.IMPLEMENTED) || i.origOptions.until && i.origOptions.count)
      return !1;
    for (var t in i.origOptions) {
      if (Pt(["dtstart", "tzid", "wkst", "freq"], t))
        return !0;
      if (!Pt(e.IMPLEMENTED[i.options.freq], t))
        return !1;
    }
    return !0;
  }, e.prototype.isFullyConvertible = function() {
    return e.isFullyConvertible(this.rrule);
  }, e.prototype.toString = function() {
    var i = this.gettext;
    if (!(this.options.freq in e.IMPLEMENTED))
      return i("RRule error: Unable to fully convert this rrule to text");
    if (this.text = [i("every")], this[P.FREQUENCIES[this.options.freq]](), this.options.until) {
      this.add(i("until"));
      var t = this.options.until;
      this.add(this.dateFormatter(t.getUTCFullYear(), this.language.monthNames[t.getUTCMonth()], t.getUTCDate()));
    } else
      this.options.count && this.add(i("for")).add(this.options.count.toString()).add(this.plural(this.options.count) ? i("times") : i("time"));
    return this.isFullyConvertible() || this.add(i("(~ approximate)")), this.text.join("");
  }, e.prototype.HOURLY = function() {
    var i = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? i("hours") : i("hour"));
  }, e.prototype.MINUTELY = function() {
    var i = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? i("minutes") : i("minute"));
  }, e.prototype.DAILY = function() {
    var i = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()), this.byweekday && this.byweekday.isWeekdays ? this.add(this.plural(this.options.interval) ? i("weekdays") : i("weekday")) : this.add(this.plural(this.options.interval) ? i("days") : i("day")), this.origOptions.bymonth && (this.add(i("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday ? this._byweekday() : this.origOptions.byhour && this._byhour();
  }, e.prototype.WEEKLY = function() {
    var i = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? i("weeks") : i("week")), this.byweekday && this.byweekday.isWeekdays ? this.options.interval === 1 ? this.add(this.plural(this.options.interval) ? i("weekdays") : i("weekday")) : this.add(i("on")).add(i("weekdays")) : this.byweekday && this.byweekday.isEveryDay ? this.add(this.plural(this.options.interval) ? i("days") : i("day")) : (this.options.interval === 1 && this.add(i("week")), this.origOptions.bymonth && (this.add(i("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.origOptions.byhour && this._byhour());
  }, e.prototype.MONTHLY = function() {
    var i = this.gettext;
    this.origOptions.bymonth ? (this.options.interval !== 1 && (this.add(this.options.interval.toString()).add(i("months")), this.plural(this.options.interval) && this.add(i("in"))), this._bymonth()) : (this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? i("months") : i("month"))), this.bymonthday ? this._bymonthday() : this.byweekday && this.byweekday.isWeekdays ? this.add(i("on")).add(i("weekdays")) : this.byweekday && this._byweekday();
  }, e.prototype.YEARLY = function() {
    var i = this.gettext;
    this.origOptions.bymonth ? (this.options.interval !== 1 && (this.add(this.options.interval.toString()), this.add(i("years"))), this._bymonth()) : (this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? i("years") : i("year"))), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.options.byyearday && this.add(i("on the")).add(this.list(this.options.byyearday, this.nth, i("and"))).add(i("day")), this.options.byweekno && this.add(i("in")).add(this.plural(this.options.byweekno.length) ? i("weeks") : i("week")).add(this.list(this.options.byweekno, void 0, i("and")));
  }, e.prototype._bymonthday = function() {
    var i = this.gettext;
    this.byweekday && this.byweekday.allWeeks ? this.add(i("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext, i("or"))).add(i("the")).add(this.list(this.bymonthday, this.nth, i("or"))) : this.add(i("on the")).add(this.list(this.bymonthday, this.nth, i("and")));
  }, e.prototype._byweekday = function() {
    var i = this.gettext;
    this.byweekday.allWeeks && !this.byweekday.isWeekdays && this.add(i("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext)), this.byweekday.someWeeks && (this.byweekday.allWeeks && this.add(i("and")), this.add(i("on the")).add(this.list(this.byweekday.someWeeks, this.weekdaytext, i("and"))));
  }, e.prototype._byhour = function() {
    var i = this.gettext;
    this.add(i("at")).add(this.list(this.origOptions.byhour, void 0, i("and")));
  }, e.prototype._bymonth = function() {
    this.add(this.list(this.options.bymonth, this.monthtext, this.gettext("and")));
  }, e.prototype.nth = function(i) {
    var t;
    i = parseInt(i.toString(), 10);
    var a = this.gettext;
    if (i === -1)
      return a("last");
    var s = Math.abs(i);
    switch (s) {
      case 1:
      case 21:
      case 31:
        t = s + a("st");
        break;
      case 2:
      case 22:
        t = s + a("nd");
        break;
      case 3:
      case 23:
        t = s + a("rd");
        break;
      default:
        t = s + a("th");
    }
    return i < 0 ? t + " " + a("last") : t;
  }, e.prototype.monthtext = function(i) {
    return this.language.monthNames[i - 1];
  }, e.prototype.weekdaytext = function(i) {
    var t = xe(i) ? (i + 1) % 7 : i.getJsWeekday();
    return (i.n ? this.nth(i.n) + " " : "") + this.language.dayNames[t];
  }, e.prototype.plural = function(i) {
    return i % 100 != 1;
  }, e.prototype.add = function(i) {
    return this.text.push(" "), this.text.push(i), this;
  }, e.prototype.list = function(i, t, a, s) {
    var n = this;
    s === void 0 && (s = ","), ce(i) || (i = [i]), t = t || function(d) {
      return d.toString();
    };
    var _ = function(d) {
      return t && t.call(n, d);
    };
    return a ? function(d, r, o) {
      for (var c = "", h = 0; h < d.length; h++)
        h !== 0 && (h === d.length - 1 ? c += " " + o + " " : c += r + " "), c += d[h];
      return c;
    }(i.map(_), s, a) : i.map(_).join(s + " ");
  }, e;
}(), rn = function() {
  function e(i) {
    this.done = !0, this.rules = i;
  }
  return e.prototype.start = function(i) {
    return this.text = i, this.done = !1, this.nextSymbol();
  }, e.prototype.isDone = function() {
    return this.done && this.symbol === null;
  }, e.prototype.nextSymbol = function() {
    var i, t;
    this.symbol = null, this.value = null;
    do {
      if (this.done)
        return !1;
      for (var a in i = null, this.rules) {
        var s = this.rules[a].exec(this.text);
        s && (i === null || s[0].length > i[0].length) && (i = s, t = a);
      }
      if (i != null && (this.text = this.text.substr(i[0].length), this.text === "" && (this.done = !0)), i == null)
        return this.done = !0, this.symbol = null, void (this.value = null);
    } while (t === "SKIP");
    return this.symbol = t, this.value = i, !0;
  }, e.prototype.accept = function(i) {
    if (this.symbol === i) {
      if (this.value) {
        var t = this.value;
        return this.nextSymbol(), t;
      }
      return this.nextSymbol(), !0;
    }
    return !1;
  }, e.prototype.acceptNumber = function() {
    return this.accept("number");
  }, e.prototype.expect = function(i) {
    if (this.accept(i))
      return !0;
    throw new Error("expected " + i + " but found " + this.symbol);
  }, e;
}();
function _a(e, i) {
  i === void 0 && (i = Qe);
  var t = {}, a = new rn(i.tokens);
  return a.start(e) ? (function() {
    a.expect("every");
    var c = a.acceptNumber();
    if (c && (t.interval = parseInt(c[0], 10)), a.isDone())
      throw new Error("Unexpected end");
    switch (a.symbol) {
      case "day(s)":
        t.freq = P.DAILY, a.nextSymbol() && (n(), o());
        break;
      case "weekday(s)":
        t.freq = P.WEEKLY, t.byweekday = [P.MO, P.TU, P.WE, P.TH, P.FR], a.nextSymbol(), n(), o();
        break;
      case "week(s)":
        t.freq = P.WEEKLY, a.nextSymbol() && (s(), n(), o());
        break;
      case "hour(s)":
        t.freq = P.HOURLY, a.nextSymbol() && (s(), o());
        break;
      case "minute(s)":
        t.freq = P.MINUTELY, a.nextSymbol() && (s(), o());
        break;
      case "month(s)":
        t.freq = P.MONTHLY, a.nextSymbol() && (s(), o());
        break;
      case "year(s)":
        t.freq = P.YEARLY, a.nextSymbol() && (s(), o());
        break;
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        t.freq = P.WEEKLY;
        var h = a.symbol.substr(0, 2).toUpperCase();
        if (t.byweekday = [P[h]], !a.nextSymbol())
          return;
        for (; a.accept("comma"); ) {
          if (a.isDone())
            throw new Error("Unexpected end");
          var y = d();
          if (!y)
            throw new Error("Unexpected symbol " + a.symbol + ", expected weekday");
          t.byweekday.push(P[y]), a.nextSymbol();
        }
        n(), function() {
          a.accept("on"), a.accept("the");
          var p = r();
          if (p)
            for (t.bymonthday = [p], a.nextSymbol(); a.accept("comma"); ) {
              if (!(p = r()))
                throw new Error("Unexpected symbol " + a.symbol + "; expected monthday");
              t.bymonthday.push(p), a.nextSymbol();
            }
        }(), o();
        break;
      case "january":
      case "february":
      case "march":
      case "april":
      case "may":
      case "june":
      case "july":
      case "august":
      case "september":
      case "october":
      case "november":
      case "december":
        if (t.freq = P.YEARLY, t.bymonth = [_()], !a.nextSymbol())
          return;
        for (; a.accept("comma"); ) {
          if (a.isDone())
            throw new Error("Unexpected end");
          var b = _();
          if (!b)
            throw new Error("Unexpected symbol " + a.symbol + ", expected month");
          t.bymonth.push(b), a.nextSymbol();
        }
        s(), o();
        break;
      default:
        throw new Error("Unknown symbol");
    }
  }(), t) : null;
  function s() {
    var c = a.accept("on"), h = a.accept("the");
    if (c || h)
      do {
        var y = r(), b = d(), p = _();
        if (y)
          b ? (a.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(P[b].nth(y))) : (t.bymonthday || (t.bymonthday = []), t.bymonthday.push(y), a.accept("day(s)"));
        else if (b)
          a.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(P[b]);
        else if (a.symbol === "weekday(s)")
          a.nextSymbol(), t.byweekday || (t.byweekday = [P.MO, P.TU, P.WE, P.TH, P.FR]);
        else if (a.symbol === "week(s)") {
          a.nextSymbol();
          var u = a.acceptNumber();
          if (!u)
            throw new Error("Unexpected symbol " + a.symbol + ", expected week number");
          for (t.byweekno = [parseInt(u[0], 10)]; a.accept("comma"); ) {
            if (!(u = a.acceptNumber()))
              throw new Error("Unexpected symbol " + a.symbol + "; expected monthday");
            t.byweekno.push(parseInt(u[0], 10));
          }
        } else {
          if (!p)
            return;
          a.nextSymbol(), t.bymonth || (t.bymonth = []), t.bymonth.push(p);
        }
      } while (a.accept("comma") || a.accept("the") || a.accept("on"));
  }
  function n() {
    if (a.accept("at"))
      do {
        var c = a.acceptNumber();
        if (!c)
          throw new Error("Unexpected symbol " + a.symbol + ", expected hour");
        for (t.byhour = [parseInt(c[0], 10)]; a.accept("comma"); ) {
          if (!(c = a.acceptNumber()))
            throw new Error("Unexpected symbol " + a.symbol + "; expected hour");
          t.byhour.push(parseInt(c[0], 10));
        }
      } while (a.accept("comma") || a.accept("at"));
  }
  function _() {
    switch (a.symbol) {
      case "january":
        return 1;
      case "february":
        return 2;
      case "march":
        return 3;
      case "april":
        return 4;
      case "may":
        return 5;
      case "june":
        return 6;
      case "july":
        return 7;
      case "august":
        return 8;
      case "september":
        return 9;
      case "october":
        return 10;
      case "november":
        return 11;
      case "december":
        return 12;
      default:
        return !1;
    }
  }
  function d() {
    switch (a.symbol) {
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        return a.symbol.substr(0, 2).toUpperCase();
      default:
        return !1;
    }
  }
  function r() {
    switch (a.symbol) {
      case "last":
        return a.nextSymbol(), -1;
      case "first":
        return a.nextSymbol(), 1;
      case "second":
        return a.nextSymbol(), a.accept("last") ? -2 : 2;
      case "third":
        return a.nextSymbol(), a.accept("last") ? -3 : 3;
      case "nth":
        var c = parseInt(a.value[1], 10);
        if (c < -366 || c > 366)
          throw new Error("Nth out of range: " + c);
        return a.nextSymbol(), a.accept("last") ? -c : c;
      default:
        return !1;
    }
  }
  function o() {
    if (a.symbol === "until") {
      var c = Date.parse(a.text);
      if (!c)
        throw new Error("Cannot parse until date:" + a.text);
      t.until = new Date(c);
    } else
      a.accept("for") && (t.count = parseInt(a.value[0], 10), a.expect("number"));
  }
}
function _t(e) {
  return e < X.HOURLY;
}
(function(e) {
  e[e.YEARLY = 0] = "YEARLY", e[e.MONTHLY = 1] = "MONTHLY", e[e.WEEKLY = 2] = "WEEKLY", e[e.DAILY = 3] = "DAILY", e[e.HOURLY = 4] = "HOURLY", e[e.MINUTELY = 5] = "MINUTELY", e[e.SECONDLY = 6] = "SECONDLY";
})(X || (X = {}));
var on = function(e, i) {
  return i === void 0 && (i = Qe), new P(_a(e, i) || void 0);
}, je = ["count", "until", "interval", "byweekday", "bymonthday", "bymonth"];
Ne.IMPLEMENTED = [], Ne.IMPLEMENTED[X.HOURLY] = je, Ne.IMPLEMENTED[X.MINUTELY] = je, Ne.IMPLEMENTED[X.DAILY] = ["byhour"].concat(je), Ne.IMPLEMENTED[X.WEEKLY] = je, Ne.IMPLEMENTED[X.MONTHLY] = je, Ne.IMPLEMENTED[X.YEARLY] = ["byweekno", "byyearday"].concat(je);
var sn = Ne.isFullyConvertible, et = function() {
  function e(i, t, a, s) {
    this.hour = i, this.minute = t, this.second = a, this.millisecond = s || 0;
  }
  return e.prototype.getHours = function() {
    return this.hour;
  }, e.prototype.getMinutes = function() {
    return this.minute;
  }, e.prototype.getSeconds = function() {
    return this.second;
  }, e.prototype.getMilliseconds = function() {
    return this.millisecond;
  }, e.prototype.getTime = function() {
    return 1e3 * (60 * this.hour * 60 + 60 * this.minute + this.second) + this.millisecond;
  }, e;
}(), _n = function(e) {
  function i(t, a, s, n, _, d, r) {
    var o = e.call(this, n, _, d, r) || this;
    return o.year = t, o.month = a, o.day = s, o;
  }
  return kt(i, e), i.fromDate = function(t) {
    return new this(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.valueOf() % 1e3);
  }, i.prototype.getWeekday = function() {
    return Ye(new Date(this.getTime()));
  }, i.prototype.getTime = function() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
  }, i.prototype.getDay = function() {
    return this.day;
  }, i.prototype.getMonth = function() {
    return this.month;
  }, i.prototype.getYear = function() {
    return this.year;
  }, i.prototype.addYears = function(t) {
    this.year += t;
  }, i.prototype.addMonths = function(t) {
    if (this.month += t, this.month > 12) {
      var a = Math.floor(this.month / 12), s = pe(this.month, 12);
      this.month = s, this.year += a, this.month === 0 && (this.month = 12, --this.year);
    }
  }, i.prototype.addWeekly = function(t, a) {
    a > this.getWeekday() ? this.day += -(this.getWeekday() + 1 + (6 - a)) + 7 * t : this.day += -(this.getWeekday() - a) + 7 * t, this.fixDay();
  }, i.prototype.addDaily = function(t) {
    this.day += t, this.fixDay();
  }, i.prototype.addHours = function(t, a, s) {
    for (a && (this.hour += Math.floor((23 - this.hour) / t) * t); ; ) {
      this.hour += t;
      var n = st(this.hour, 24), _ = n.div, d = n.mod;
      if (_ && (this.hour = d, this.addDaily(_)), we(s) || K(s, this.hour))
        break;
    }
  }, i.prototype.addMinutes = function(t, a, s, n) {
    for (a && (this.minute += Math.floor((1439 - (60 * this.hour + this.minute)) / t) * t); ; ) {
      this.minute += t;
      var _ = st(this.minute, 60), d = _.div, r = _.mod;
      if (d && (this.minute = r, this.addHours(d, !1, s)), (we(s) || K(s, this.hour)) && (we(n) || K(n, this.minute)))
        break;
    }
  }, i.prototype.addSeconds = function(t, a, s, n, _) {
    for (a && (this.second += Math.floor((86399 - (3600 * this.hour + 60 * this.minute + this.second)) / t) * t); ; ) {
      this.second += t;
      var d = st(this.second, 60), r = d.div, o = d.mod;
      if (r && (this.second = o, this.addMinutes(r, !1, s, n)), (we(s) || K(s, this.hour)) && (we(n) || K(n, this.minute)) && (we(_) || K(_, this.second)))
        break;
    }
  }, i.prototype.fixDay = function() {
    if (!(this.day <= 28)) {
      var t = $t(this.year, this.month - 1)[1];
      if (!(this.day <= t))
        for (; this.day > t; ) {
          if (this.day -= t, ++this.month, this.month === 13 && (this.month = 1, ++this.year, this.year > 9999))
            return;
          t = $t(this.year, this.month - 1)[1];
        }
    }
  }, i.prototype.add = function(t, a) {
    var s = t.freq, n = t.interval, _ = t.wkst, d = t.byhour, r = t.byminute, o = t.bysecond;
    switch (s) {
      case X.YEARLY:
        return this.addYears(n);
      case X.MONTHLY:
        return this.addMonths(n);
      case X.WEEKLY:
        return this.addWeekly(n, _);
      case X.DAILY:
        return this.addDaily(n);
      case X.HOURLY:
        return this.addHours(n, a, d);
      case X.MINUTELY:
        return this.addMinutes(n, a, d, r);
      case X.SECONDLY:
        return this.addSeconds(n, a, d, r, o);
    }
  }, i;
}(et);
function da(e) {
  for (var i = [], t = 0, a = Object.keys(e); t < a.length; t++) {
    var s = a[t];
    K(Cn, s) || i.push(s), ia(e[s]) && !Xe(e[s]) && i.push(s);
  }
  if (i.length)
    throw new Error("Invalid options: " + i.join(", "));
  return he({}, e);
}
function dn(e) {
  var i = he(he({}, Et), da(e));
  if (ee(i.byeaster) && (i.freq = P.YEARLY), !ee(i.freq) || !P.FREQUENCIES[i.freq])
    throw new Error("Invalid frequency: ".concat(i.freq, " ").concat(e.freq));
  if (i.dtstart || (i.dtstart = new Date((/* @__PURE__ */ new Date()).setMilliseconds(0))), ee(i.wkst) ? xe(i.wkst) || (i.wkst = i.wkst.weekday) : i.wkst = P.MO.weekday, ee(i.bysetpos)) {
    xe(i.bysetpos) && (i.bysetpos = [i.bysetpos]);
    for (var t = 0; t < i.bysetpos.length; t++)
      if ((n = i.bysetpos[t]) === 0 || !(n >= -366 && n <= 366))
        throw new Error("bysetpos must be between 1 and 366, or between -366 and -1");
  }
  if (!(i.byweekno || ne(i.byweekno) || ne(i.byyearday) || i.bymonthday || ne(i.bymonthday) || ee(i.byweekday) || ee(i.byeaster)))
    switch (i.freq) {
      case P.YEARLY:
        i.bymonth || (i.bymonth = i.dtstart.getUTCMonth() + 1), i.bymonthday = i.dtstart.getUTCDate();
        break;
      case P.MONTHLY:
        i.bymonthday = i.dtstart.getUTCDate();
        break;
      case P.WEEKLY:
        i.byweekday = [Ye(i.dtstart)];
    }
  if (ee(i.bymonth) && !ce(i.bymonth) && (i.bymonth = [i.bymonth]), ee(i.byyearday) && !ce(i.byyearday) && xe(i.byyearday) && (i.byyearday = [i.byyearday]), ee(i.bymonthday))
    if (ce(i.bymonthday)) {
      var a = [], s = [];
      for (t = 0; t < i.bymonthday.length; t++) {
        var n;
        (n = i.bymonthday[t]) > 0 ? a.push(n) : n < 0 && s.push(n);
      }
      i.bymonthday = a, i.bynmonthday = s;
    } else
      i.bymonthday < 0 ? (i.bynmonthday = [i.bymonthday], i.bymonthday = []) : (i.bynmonthday = [], i.bymonthday = [i.bymonthday]);
  else
    i.bymonthday = [], i.bynmonthday = [];
  if (ee(i.byweekno) && !ce(i.byweekno) && (i.byweekno = [i.byweekno]), ee(i.byweekday))
    if (xe(i.byweekday))
      i.byweekday = [i.byweekday], i.bynweekday = null;
    else if (Lt(i.byweekday))
      i.byweekday = [oe.fromStr(i.byweekday).weekday], i.bynweekday = null;
    else if (i.byweekday instanceof oe)
      !i.byweekday.n || i.freq > P.MONTHLY ? (i.byweekday = [i.byweekday.weekday], i.bynweekday = null) : (i.bynweekday = [[i.byweekday.weekday, i.byweekday.n]], i.byweekday = null);
    else {
      var _ = [], d = [];
      for (t = 0; t < i.byweekday.length; t++) {
        var r = i.byweekday[t];
        xe(r) ? _.push(r) : Lt(r) ? _.push(oe.fromStr(r).weekday) : !r.n || i.freq > P.MONTHLY ? _.push(r.weekday) : d.push([r.weekday, r.n]);
      }
      i.byweekday = ne(_) ? _ : null, i.bynweekday = ne(d) ? d : null;
    }
  else
    i.bynweekday = null;
  return ee(i.byhour) ? xe(i.byhour) && (i.byhour = [i.byhour]) : i.byhour = i.freq < P.HOURLY ? [i.dtstart.getUTCHours()] : null, ee(i.byminute) ? xe(i.byminute) && (i.byminute = [i.byminute]) : i.byminute = i.freq < P.MINUTELY ? [i.dtstart.getUTCMinutes()] : null, ee(i.bysecond) ? xe(i.bysecond) && (i.bysecond = [i.bysecond]) : i.bysecond = i.freq < P.SECONDLY ? [i.dtstart.getUTCSeconds()] : null, { parsedOptions: i };
}
function vt(e) {
  var i = e.split(`
`).map(ln).filter(function(t) {
    return t !== null;
  });
  return he(he({}, i[0]), i[1]);
}
function tt(e) {
  var i = {}, t = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(e);
  if (!t)
    return i;
  var a = t[1], s = t[2];
  return a && (i.tzid = a), i.dtstart = wt(s), i;
}
function ln(e) {
  if (!(e = e.replace(/^\s+|\s+$/, "")).length)
    return null;
  var i = /^([A-Z]+?)[:;]/.exec(e.toUpperCase());
  if (!i)
    return Rt(e);
  var t = i[1];
  switch (t.toUpperCase()) {
    case "RRULE":
    case "EXRULE":
      return Rt(e);
    case "DTSTART":
      return tt(e);
    default:
      throw new Error("Unsupported RFC prop ".concat(t, " in ").concat(e));
  }
}
function Rt(e) {
  var i = tt(e.replace(/^RRULE:/i, ""));
  return e.replace(/^(?:RRULE|EXRULE):/i, "").split(";").forEach(function(t) {
    var a = t.split("="), s = a[0], n = a[1];
    switch (s.toUpperCase()) {
      case "FREQ":
        i.freq = X[n.toUpperCase()];
        break;
      case "WKST":
        i.wkst = me[n.toUpperCase()];
        break;
      case "COUNT":
      case "INTERVAL":
      case "BYSETPOS":
      case "BYMONTH":
      case "BYMONTHDAY":
      case "BYYEARDAY":
      case "BYWEEKNO":
      case "BYHOUR":
      case "BYMINUTE":
      case "BYSECOND":
        var _ = function(o) {
          return o.indexOf(",") !== -1 ? o.split(",").map(jt) : jt(o);
        }(n), d = s.toLowerCase();
        i[d] = _;
        break;
      case "BYWEEKDAY":
      case "BYDAY":
        i.byweekday = function(o) {
          var c = o.split(",");
          return c.map(function(h) {
            if (h.length === 2)
              return me[h];
            var y = h.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
            if (!y || y.length < 3)
              throw new SyntaxError("Invalid weekday string: ".concat(h));
            var b = Number(y[1]), p = y[2], u = me[p].weekday;
            return new oe(u, b);
          });
        }(n);
        break;
      case "DTSTART":
      case "TZID":
        var r = tt(e);
        i.tzid = r.tzid, i.dtstart = r.dtstart;
        break;
      case "UNTIL":
        i.until = wt(n);
        break;
      case "BYEASTER":
        i.byeaster = Number(n);
        break;
      default:
        throw new Error("Unknown RRULE property '" + s + "'");
    }
  }), i;
}
function jt(e) {
  return /^[+-]?\d+$/.test(e) ? Number(e) : e;
}
var at = function() {
  function e(i, t) {
    if (isNaN(i.getTime()))
      throw new RangeError("Invalid date passed to DateWithZone");
    this.date = i, this.tzid = t;
  }
  return Object.defineProperty(e.prototype, "isUTC", { get: function() {
    return !this.tzid || this.tzid.toUpperCase() === "UTC";
  }, enumerable: !1, configurable: !0 }), e.prototype.toString = function() {
    var i = xt(this.date.getTime(), this.isUTC);
    return this.isUTC ? ":".concat(i) : ";TZID=".concat(this.tzid, ":").concat(i);
  }, e.prototype.getTime = function() {
    return this.date.getTime();
  }, e.prototype.rezonedDate = function() {
    return this.isUTC ? this.date : (i = this.date, t = this.tzid, a = Intl.DateTimeFormat().resolvedOptions().timeZone, s = new Date(zt(i, a)), n = new Date(zt(i, t ?? "UTC")).getTime() - s.getTime(), new Date(i.getTime() - n));
    var i, t, a, s, n;
  }, e;
}();
function yt(e) {
  for (var i, t = [], a = "", s = Object.keys(e), n = Object.keys(Et), _ = 0; _ < s.length; _++)
    if (s[_] !== "tzid" && K(n, s[_])) {
      var d = s[_].toUpperCase(), r = e[s[_]], o = "";
      if (ee(r) && (!ce(r) || r.length)) {
        switch (d) {
          case "FREQ":
            o = P.FREQUENCIES[e.freq];
            break;
          case "WKST":
            o = xe(r) ? new oe(r).toString() : r.toString();
            break;
          case "BYWEEKDAY":
            d = "BYDAY", o = (i = r, ce(i) ? i : [i]).map(function(p) {
              return p instanceof oe ? p : ce(p) ? new oe(p[0], p[1]) : new oe(p);
            }).toString();
            break;
          case "DTSTART":
            a = cn(r, e.tzid);
            break;
          case "UNTIL":
            o = xt(r, !e.tzid);
            break;
          default:
            if (ce(r)) {
              for (var c = [], h = 0; h < r.length; h++)
                c[h] = String(r[h]);
              o = c.toString();
            } else
              o = String(r);
        }
        o && t.push([d, o]);
      }
    }
  var y = t.map(function(p) {
    var u = p[0], m = p[1];
    return "".concat(u, "=").concat(m.toString());
  }).join(";"), b = "";
  return y !== "" && (b = "RRULE:".concat(y)), [a, b].filter(function(p) {
    return !!p;
  }).join(`
`);
}
function cn(e, i) {
  return e ? "DTSTART" + new at(new Date(e), i).toString() : "";
}
function hn(e, i) {
  return Array.isArray(e) ? !!Array.isArray(i) && e.length === i.length && e.every(function(t, a) {
    return t.getTime() === i[a].getTime();
  }) : e instanceof Date ? i instanceof Date && e.getTime() === i.getTime() : e === i;
}
var un = function() {
  function e() {
    this.all = !1, this.before = [], this.after = [], this.between = [];
  }
  return e.prototype._cacheAdd = function(i, t, a) {
    t && (t = t instanceof Date ? gt(t) : Ht(t)), i === "all" ? this.all = t : (a._value = t, this[i].push(a));
  }, e.prototype._cacheGet = function(i, t) {
    var a = !1, s = t ? Object.keys(t) : [], n = function(c) {
      for (var h = 0; h < s.length; h++) {
        var y = s[h];
        if (!hn(t[y], c[y]))
          return !0;
      }
      return !1;
    }, _ = this[i];
    if (i === "all")
      a = this.all;
    else if (ce(_))
      for (var d = 0; d < _.length; d++) {
        var r = _[d];
        if (!s.length || !n(r)) {
          a = r._value;
          break;
        }
      }
    if (!a && this.all) {
      var o = new Ie(i, t);
      for (d = 0; d < this.all.length && o.accept(this.all[d]); d++)
        ;
      a = o.getValue(), this._cacheAdd(i, a, t);
    }
    return ce(a) ? Ht(a) : a instanceof Date ? gt(a) : a;
  }, e;
}(), fn = j(j(j(j(j(j(j(j(j(j(j(j(j([], J(1, 31), !0), J(2, 28), !0), J(3, 31), !0), J(4, 30), !0), J(5, 31), !0), J(6, 30), !0), J(7, 31), !0), J(8, 31), !0), J(9, 30), !0), J(10, 31), !0), J(11, 30), !0), J(12, 31), !0), J(1, 7), !0), pn = j(j(j(j(j(j(j(j(j(j(j(j(j([], J(1, 31), !0), J(2, 29), !0), J(3, 31), !0), J(4, 30), !0), J(5, 31), !0), J(6, 30), !0), J(7, 31), !0), J(8, 31), !0), J(9, 30), !0), J(10, 31), !0), J(11, 30), !0), J(12, 31), !0), J(1, 7), !0), gn = ke(1, 29), mn = ke(1, 30), Oe = ke(1, 31), re = ke(1, 32), vn = j(j(j(j(j(j(j(j(j(j(j(j(j([], re, !0), mn, !0), re, !0), Oe, !0), re, !0), Oe, !0), re, !0), re, !0), Oe, !0), re, !0), Oe, !0), re, !0), re.slice(0, 7), !0), yn = j(j(j(j(j(j(j(j(j(j(j(j(j([], re, !0), gn, !0), re, !0), Oe, !0), re, !0), Oe, !0), re, !0), re, !0), Oe, !0), re, !0), Oe, !0), re, !0), re.slice(0, 7), !0), bn = ke(-28, 0), xn = ke(-29, 0), Le = ke(-30, 0), ie = ke(-31, 0), wn = j(j(j(j(j(j(j(j(j(j(j(j(j([], ie, !0), xn, !0), ie, !0), Le, !0), ie, !0), Le, !0), ie, !0), ie, !0), Le, !0), ie, !0), Le, !0), ie, !0), ie.slice(0, 7), !0), kn = j(j(j(j(j(j(j(j(j(j(j(j(j([], ie, !0), bn, !0), ie, !0), Le, !0), ie, !0), Le, !0), ie, !0), ie, !0), Le, !0), ie, !0), Le, !0), ie, !0), ie.slice(0, 7), !0), En = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366], Dn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], It = function() {
  for (var e = [], i = 0; i < 55; i++)
    e = e.concat(ke(7));
  return e;
}();
function Sn(e, i) {
  var t, a, s = Pe(e, 1, 1), n = Je(e) ? 366 : 365, _ = Je(e + 1) ? 366 : 365, d = pt(s), r = Ye(s), o = he(he({ yearlen: n, nextyearlen: _, yearordinal: d, yearweekday: r }, function(k) {
    var S = Je(k) ? 366 : 365, v = Pe(k, 1, 1), D = Ye(v);
    return S === 365 ? { mmask: fn, mdaymask: yn, nmdaymask: kn, wdaymask: It.slice(D), mrange: Dn } : { mmask: pn, mdaymask: vn, nmdaymask: wn, wdaymask: It.slice(D), mrange: En };
  }(e)), { wnomask: null });
  if (we(i.byweekno))
    return o;
  o.wnomask = J(0, n + 7);
  var c = t = pe(7 - r + i.wkst, 7);
  c >= 4 ? (c = 0, a = o.yearlen + pe(r - i.wkst, 7)) : a = n - c;
  for (var h = Math.floor(a / 7), y = pe(a, 7), b = Math.floor(h + y / 4), p = 0; p < i.byweekno.length; p++) {
    var u = i.byweekno[p];
    if (u < 0 && (u += b + 1), u > 0 && u <= b) {
      var m = void 0;
      u > 1 ? (m = c + 7 * (u - 1), c !== t && (m -= 7 - t)) : m = c;
      for (var l = 0; l < 7 && (o.wnomask[m] = 1, m++, o.wdaymask[m] !== i.wkst); l++)
        ;
    }
  }
  if (K(i.byweekno, 1) && (m = c + 7 * b, c !== t && (m -= 7 - t), m < n))
    for (p = 0; p < 7 && (o.wnomask[m] = 1, m += 1, o.wdaymask[m] !== i.wkst); p++)
      ;
  if (c) {
    var f = void 0;
    if (K(i.byweekno, -1))
      f = -1;
    else {
      var g = Ye(Pe(e - 1, 1, 1)), x = pe(7 - g.valueOf() + i.wkst, 7), w = Je(e - 1) ? 366 : 365, E = void 0;
      x >= 4 ? (x = 0, E = w + pe(g - i.wkst, 7)) : E = n - c, f = Math.floor(52 + pe(E, 7) / 4);
    }
    if (K(i.byweekno, f))
      for (m = 0; m < c; m++)
        o.wnomask[m] = 1;
  }
  return o;
}
var Mn = function() {
  function e(i) {
    this.options = i;
  }
  return e.prototype.rebuild = function(i, t) {
    var a = this.options;
    if (i !== this.lastyear && (this.yearinfo = Sn(i, a)), ne(a.bynweekday) && (t !== this.lastmonth || i !== this.lastyear)) {
      var s = this.yearinfo, n = s.yearlen, _ = s.mrange, d = s.wdaymask;
      this.monthinfo = function(r, o, c, h, y, b) {
        var p = { lastyear: r, lastmonth: o, nwdaymask: [] }, u = [];
        if (b.freq === P.YEARLY)
          if (we(b.bymonth))
            u = [[0, c]];
          else
            for (var m = 0; m < b.bymonth.length; m++)
              o = b.bymonth[m], u.push(h.slice(o - 1, o + 1));
        else
          b.freq === P.MONTHLY && (u = [h.slice(o - 1, o + 1)]);
        if (we(u))
          return p;
        for (p.nwdaymask = J(0, c), m = 0; m < u.length; m++)
          for (var l = u[m], f = l[0], g = l[1] - 1, x = 0; x < b.bynweekday.length; x++) {
            var w = void 0, E = b.bynweekday[x], k = E[0], S = E[1];
            S < 0 ? (w = g + 7 * (S + 1), w -= pe(y[w] - k, 7)) : (w = f + 7 * (S - 1), w += pe(7 - y[w] + k, 7)), f <= w && w <= g && (p.nwdaymask[w] = 1);
          }
        return p;
      }(i, t, n, _, d, a);
    }
    ee(a.byeaster) && (this.eastermask = function(r, o) {
      o === void 0 && (o = 0);
      var c = r % 19, h = Math.floor(r / 100), y = r % 100, b = Math.floor(h / 4), p = h % 4, u = Math.floor((h + 8) / 25), m = Math.floor((h - u + 1) / 3), l = Math.floor(19 * c + h - b - m + 15) % 30, f = Math.floor(y / 4), g = y % 4, x = Math.floor(32 + 2 * p + 2 * f - l - g) % 7, w = Math.floor((c + 11 * l + 22 * x) / 451), E = Math.floor((l + x - 7 * w + 114) / 31), k = (l + x - 7 * w + 114) % 31 + 1, S = Date.UTC(r, E - 1, k + o), v = Date.UTC(r, 0, 1);
      return [Math.ceil((S - v) / 864e5)];
    }(i, a.byeaster));
  }, Object.defineProperty(e.prototype, "lastyear", { get: function() {
    return this.monthinfo ? this.monthinfo.lastyear : null;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "lastmonth", { get: function() {
    return this.monthinfo ? this.monthinfo.lastmonth : null;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "yearlen", { get: function() {
    return this.yearinfo.yearlen;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "yearordinal", { get: function() {
    return this.yearinfo.yearordinal;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "mrange", { get: function() {
    return this.yearinfo.mrange;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "wdaymask", { get: function() {
    return this.yearinfo.wdaymask;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "mmask", { get: function() {
    return this.yearinfo.mmask;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "wnomask", { get: function() {
    return this.yearinfo.wnomask;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "nwdaymask", { get: function() {
    return this.monthinfo ? this.monthinfo.nwdaymask : [];
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "nextyearlen", { get: function() {
    return this.yearinfo.nextyearlen;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "mdaymask", { get: function() {
    return this.yearinfo.mdaymask;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "nmdaymask", { get: function() {
    return this.yearinfo.nmdaymask;
  }, enumerable: !1, configurable: !0 }), e.prototype.ydayset = function() {
    return [ke(this.yearlen), 0, this.yearlen];
  }, e.prototype.mdayset = function(i, t) {
    for (var a = this.mrange[t - 1], s = this.mrange[t], n = J(null, this.yearlen), _ = a; _ < s; _++)
      n[_] = _;
    return [n, a, s];
  }, e.prototype.wdayset = function(i, t, a) {
    for (var s = J(null, this.yearlen + 7), n = pt(Pe(i, t, a)) - this.yearordinal, _ = n, d = 0; d < 7 && (s[n] = n, ++n, this.wdaymask[n] !== this.options.wkst); d++)
      ;
    return [s, _, n];
  }, e.prototype.ddayset = function(i, t, a) {
    var s = J(null, this.yearlen), n = pt(Pe(i, t, a)) - this.yearordinal;
    return s[n] = n, [s, n, n + 1];
  }, e.prototype.htimeset = function(i, t, a, s) {
    var n = this, _ = [];
    return this.options.byminute.forEach(function(d) {
      _ = _.concat(n.mtimeset(i, d, a, s));
    }), Ke(_), _;
  }, e.prototype.mtimeset = function(i, t, a, s) {
    var n = this.options.bysecond.map(function(_) {
      return new et(i, t, _, s);
    });
    return Ke(n), n;
  }, e.prototype.stimeset = function(i, t, a, s) {
    return [new et(i, t, a, s)];
  }, e.prototype.getdayset = function(i) {
    switch (i) {
      case X.YEARLY:
        return this.ydayset.bind(this);
      case X.MONTHLY:
        return this.mdayset.bind(this);
      case X.WEEKLY:
        return this.wdayset.bind(this);
      case X.DAILY:
      default:
        return this.ddayset.bind(this);
    }
  }, e.prototype.gettimeset = function(i) {
    switch (i) {
      case X.HOURLY:
        return this.htimeset.bind(this);
      case X.MINUTELY:
        return this.mtimeset.bind(this);
      case X.SECONDLY:
        return this.stimeset.bind(this);
    }
  }, e;
}();
function Nn(e, i, t, a, s, n) {
  for (var _ = [], d = 0; d < e.length; d++) {
    var r = void 0, o = void 0, c = e[d];
    c < 0 ? (r = Math.floor(c / i.length), o = pe(c, i.length)) : (r = Math.floor((c - 1) / i.length), o = pe(c - 1, i.length));
    for (var h = [], y = t; y < a; y++) {
      var b = n[y];
      ee(b) && h.push(b);
    }
    var p = void 0;
    p = r < 0 ? h.slice(r)[0] : h[r];
    var u = i[o], m = oa(s.yearordinal + p), l = sa(m, u);
    K(_, l) || _.push(l);
  }
  return Ke(_), _;
}
function la(e, i) {
  var t = i.dtstart, a = i.freq, s = i.interval, n = i.until, _ = i.bysetpos, d = i.count;
  if (d === 0 || s === 0)
    return Me(e);
  var r = _n.fromDate(t), o = new Mn(i);
  o.rebuild(r.year, r.month);
  for (var c = function(S, v, D) {
    var M = D.freq, N = D.byhour, T = D.byminute, A = D.bysecond;
    return _t(M) ? function(C) {
      var O = C.dtstart.getTime() % 1e3;
      if (!_t(C.freq))
        return [];
      var H = [];
      return C.byhour.forEach(function(z) {
        C.byminute.forEach(function($) {
          C.bysecond.forEach(function(q) {
            H.push(new et(z, $, q, O));
          });
        });
      }), H;
    }(D) : M >= P.HOURLY && ne(N) && !K(N, v.hour) || M >= P.MINUTELY && ne(T) && !K(T, v.minute) || M >= P.SECONDLY && ne(A) && !K(A, v.second) ? [] : S.gettimeset(M)(v.hour, v.minute, v.second, v.millisecond);
  }(o, r, i); ; ) {
    var h = o.getdayset(a)(r.year, r.month, r.day), y = h[0], b = h[1], p = h[2], u = An(y, b, p, o, i);
    if (ne(_))
      for (var m = Nn(_, c, b, p, o, y), l = 0; l < m.length; l++) {
        var f = m[l];
        if (n && f > n)
          return Me(e);
        if (f >= t) {
          var g = Vt(f, i);
          if (!e.accept(g) || d && !--d)
            return Me(e);
        }
      }
    else
      for (l = b; l < p; l++) {
        var x = y[l];
        if (ee(x))
          for (var w = oa(o.yearordinal + x), E = 0; E < c.length; E++) {
            var k = c[E];
            if (f = sa(w, k), n && f > n || f >= t && (g = Vt(f, i), !e.accept(g) || d && !--d))
              return Me(e);
          }
      }
    if (i.interval === 0 || (r.add(i, u), r.year > 9999))
      return Me(e);
    _t(a) || (c = o.gettimeset(a)(r.hour, r.minute, r.second, 0)), o.rebuild(r.year, r.month);
  }
}
function Tn(e, i, t) {
  var a = t.bymonth, s = t.byweekno, n = t.byweekday, _ = t.byeaster, d = t.bymonthday, r = t.bynmonthday, o = t.byyearday;
  return ne(a) && !K(a, e.mmask[i]) || ne(s) && !e.wnomask[i] || ne(n) && !K(n, e.wdaymask[i]) || ne(e.nwdaymask) && !e.nwdaymask[i] || _ !== null && !K(e.eastermask, i) || (ne(d) || ne(r)) && !K(d, e.mdaymask[i]) && !K(r, e.nmdaymask[i]) || ne(o) && (i < e.yearlen && !K(o, i + 1) && !K(o, -e.yearlen + i) || i >= e.yearlen && !K(o, i + 1 - e.yearlen) && !K(o, -e.nextyearlen + i - e.yearlen));
}
function Vt(e, i) {
  return new at(e, i.tzid).rezonedDate();
}
function Me(e) {
  return e.getValue();
}
function An(e, i, t, a, s) {
  for (var n = !1, _ = i; _ < t; _++) {
    var d = e[_];
    (n = Tn(a, d, s)) && (e[d] = null);
  }
  return n;
}
var me = { MO: new oe(0), TU: new oe(1), WE: new oe(2), TH: new oe(3), FR: new oe(4), SA: new oe(5), SU: new oe(6) }, Et = { freq: X.YEARLY, dtstart: null, interval: 1, wkst: me.MO, count: null, until: null, tzid: null, bysetpos: null, bymonth: null, bymonthday: null, bynmonthday: null, byyearday: null, byweekno: null, byweekday: null, bynweekday: null, byhour: null, byminute: null, bysecond: null, byeaster: null }, Cn = Object.keys(Et), P = function() {
  function e(i, t) {
    i === void 0 && (i = {}), t === void 0 && (t = !1), this._cache = t ? null : new un(), this.origOptions = da(i);
    var a = dn(i).parsedOptions;
    this.options = a;
  }
  return e.parseText = function(i, t) {
    return _a(i, t);
  }, e.fromText = function(i, t) {
    return on(i, t);
  }, e.fromString = function(i) {
    return new e(e.parseString(i) || void 0);
  }, e.prototype._iter = function(i) {
    return la(i, this.options);
  }, e.prototype._cacheGet = function(i, t) {
    return !!this._cache && this._cache._cacheGet(i, t);
  }, e.prototype._cacheAdd = function(i, t, a) {
    if (this._cache)
      return this._cache._cacheAdd(i, t, a);
  }, e.prototype.all = function(i) {
    if (i)
      return this._iter(new qt("all", {}, i));
    var t = this._cacheGet("all");
    return t === !1 && (t = this._iter(new Ie("all", {})), this._cacheAdd("all", t)), t;
  }, e.prototype.between = function(i, t, a, s) {
    if (a === void 0 && (a = !1), !Xe(i) || !Xe(t))
      throw new Error("Invalid date passed in to RRule.between");
    var n = { before: t, after: i, inc: a };
    if (s)
      return this._iter(new qt("between", n, s));
    var _ = this._cacheGet("between", n);
    return _ === !1 && (_ = this._iter(new Ie("between", n)), this._cacheAdd("between", _, n)), _;
  }, e.prototype.before = function(i, t) {
    if (t === void 0 && (t = !1), !Xe(i))
      throw new Error("Invalid date passed in to RRule.before");
    var a = { dt: i, inc: t }, s = this._cacheGet("before", a);
    return s === !1 && (s = this._iter(new Ie("before", a)), this._cacheAdd("before", s, a)), s;
  }, e.prototype.after = function(i, t) {
    if (t === void 0 && (t = !1), !Xe(i))
      throw new Error("Invalid date passed in to RRule.after");
    var a = { dt: i, inc: t }, s = this._cacheGet("after", a);
    return s === !1 && (s = this._iter(new Ie("after", a)), this._cacheAdd("after", s, a)), s;
  }, e.prototype.count = function() {
    return this.all().length;
  }, e.prototype.toString = function() {
    return yt(this.origOptions);
  }, e.prototype.toText = function(i, t, a) {
    return function(s, n, _, d) {
      return new Ne(s, n, _, d).toString();
    }(this, i, t, a);
  }, e.prototype.isFullyConvertibleToText = function() {
    return sn(this);
  }, e.prototype.clone = function() {
    return new e(this.origOptions);
  }, e.FREQUENCIES = ["YEARLY", "MONTHLY", "WEEKLY", "DAILY", "HOURLY", "MINUTELY", "SECONDLY"], e.YEARLY = X.YEARLY, e.MONTHLY = X.MONTHLY, e.WEEKLY = X.WEEKLY, e.DAILY = X.DAILY, e.HOURLY = X.HOURLY, e.MINUTELY = X.MINUTELY, e.SECONDLY = X.SECONDLY, e.MO = me.MO, e.TU = me.TU, e.WE = me.WE, e.TH = me.TH, e.FR = me.FR, e.SA = me.SA, e.SU = me.SU, e.parseString = vt, e.optionsToString = yt, e;
}(), Yt = { dtstart: null, cache: !1, unfold: !1, forceset: !1, compatible: !1, tzid: null };
function On(e, i) {
  var t = [], a = [], s = [], n = [], _ = tt(e), d = _.dtstart, r = _.tzid, o = function(c, h) {
    if (h === void 0 && (h = !1), c = c && c.trim(), !c)
      throw new Error("Invalid empty string");
    if (!h)
      return c.split(/\s/);
    for (var y = c.split(`
`), b = 0; b < y.length; ) {
      var p = y[b] = y[b].replace(/\s+$/g, "");
      p ? b > 0 && p[0] === " " ? (y[b - 1] += p.slice(1), y.splice(b, 1)) : b += 1 : y.splice(b, 1);
    }
    return y;
  }(e, i.unfold);
  return o.forEach(function(c) {
    var h;
    if (c) {
      var y = function(l) {
        var f = function(E) {
          if (E.indexOf(":") === -1)
            return { name: "RRULE", value: E };
          var k = (D = E, M = ":", N = 1, T = D.split(M), N ? T.slice(0, N).concat([T.slice(N).join(M)]) : T), S = k[0], v = k[1], D, M, N, T;
          return { name: S, value: v };
        }(l), g = f.name, x = f.value, w = g.split(";");
        if (!w)
          throw new Error("empty property name");
        return { name: w[0].toUpperCase(), parms: w.slice(1), value: x };
      }(c), b = y.name, p = y.parms, u = y.value;
      switch (b.toUpperCase()) {
        case "RRULE":
          if (p.length)
            throw new Error("unsupported RRULE parm: ".concat(p.join(",")));
          t.push(vt(c));
          break;
        case "RDATE":
          var m = ((h = /RDATE(?:;TZID=([^:=]+))?/i.exec(c)) !== null && h !== void 0 ? h : [])[1];
          m && !r && (r = m), a = a.concat(Ft(u, p));
          break;
        case "EXRULE":
          if (p.length)
            throw new Error("unsupported EXRULE parm: ".concat(p.join(",")));
          s.push(vt(u));
          break;
        case "EXDATE":
          n = n.concat(Ft(u, p));
          break;
        case "DTSTART":
          break;
        default:
          throw new Error("unsupported property: " + b);
      }
    }
  }), { dtstart: d, tzid: r, rrulevals: t, rdatevals: a, exrulevals: s, exdatevals: n };
}
function Ve(e, i) {
  return i === void 0 && (i = {}), function(t, a) {
    var s = On(t, a), n = s.rrulevals, _ = s.rdatevals, d = s.exrulevals, r = s.exdatevals, o = s.dtstart, c = s.tzid, h = a.cache === !1;
    if (a.compatible && (a.forceset = !0, a.unfold = !0), a.forceset || n.length > 1 || _.length || d.length || r.length) {
      var y = new Ln(h);
      return y.dtstart(o), y.tzid(c || void 0), n.forEach(function(p) {
        y.rrule(new P(dt(p, o, c), h));
      }), _.forEach(function(p) {
        y.rdate(p);
      }), d.forEach(function(p) {
        y.exrule(new P(dt(p, o, c), h));
      }), r.forEach(function(p) {
        y.exdate(p);
      }), a.compatible && a.dtstart && y.rdate(o), y;
    }
    var b = n[0] || {};
    return new P(dt(b, b.dtstart || a.dtstart || o, b.tzid || a.tzid || c), h);
  }(e, function(t) {
    var a = [], s = Object.keys(t), n = Object.keys(Yt);
    if (s.forEach(function(_) {
      K(n, _) || a.push(_);
    }), a.length)
      throw new Error("Invalid options: " + a.join(", "));
    return he(he({}, Yt), t);
  }(i));
}
function dt(e, i, t) {
  return he(he({}, e), { dtstart: i, tzid: t });
}
function Ft(e, i) {
  return function(t) {
    t.forEach(function(a) {
      if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(a))
        throw new Error("unsupported RDATE/EXDATE parm: " + a);
    });
  }(i), e.split(",").map(function(t) {
    return wt(t);
  });
}
function Ut(e) {
  var i = this;
  return function(t) {
    if (t !== void 0 && (i["_".concat(e)] = t), i["_".concat(e)] !== void 0)
      return i["_".concat(e)];
    for (var a = 0; a < i._rrule.length; a++) {
      var s = i._rrule[a].origOptions[e];
      if (s)
        return s;
    }
  };
}
var Ln = function(e) {
  function i(t) {
    t === void 0 && (t = !1);
    var a = e.call(this, {}, t) || this;
    return a.dtstart = Ut.apply(a, ["dtstart"]), a.tzid = Ut.apply(a, ["tzid"]), a._rrule = [], a._rdate = [], a._exrule = [], a._exdate = [], a;
  }
  return kt(i, e), i.prototype._iter = function(t) {
    return function(a, s, n, _, d, r) {
      var o = {}, c = a.accept;
      function h(u, m) {
        n.forEach(function(l) {
          l.between(u, m, !0).forEach(function(f) {
            o[Number(f)] = !0;
          });
        });
      }
      d.forEach(function(u) {
        var m = new at(u, r).rezonedDate();
        o[Number(m)] = !0;
      }), a.accept = function(u) {
        var m = Number(u);
        return isNaN(m) ? c.call(this, u) : !(!o[m] && (h(new Date(m - 1), new Date(m + 1)), !o[m])) || (o[m] = !0, c.call(this, u));
      }, a.method === "between" && (h(a.args.after, a.args.before), a.accept = function(u) {
        var m = Number(u);
        return !!o[m] || (o[m] = !0, c.call(this, u));
      });
      for (var y = 0; y < _.length; y++) {
        var b = new at(_[y], r).rezonedDate();
        if (!a.accept(new Date(b.getTime())))
          break;
      }
      s.forEach(function(u) {
        la(a, u.options);
      });
      var p = a._result;
      switch (Ke(p), a.method) {
        case "all":
        case "between":
          return p;
        case "before":
          return p.length && p[p.length - 1] || null;
        default:
          return p.length && p[0] || null;
      }
    }(t, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
  }, i.prototype.rrule = function(t) {
    Bt(t, this._rrule);
  }, i.prototype.exrule = function(t) {
    Bt(t, this._exrule);
  }, i.prototype.rdate = function(t) {
    Wt(t, this._rdate);
  }, i.prototype.exdate = function(t) {
    Wt(t, this._exdate);
  }, i.prototype.rrules = function() {
    return this._rrule.map(function(t) {
      return Ve(t.toString());
    });
  }, i.prototype.exrules = function() {
    return this._exrule.map(function(t) {
      return Ve(t.toString());
    });
  }, i.prototype.rdates = function() {
    return this._rdate.map(function(t) {
      return new Date(t.getTime());
    });
  }, i.prototype.exdates = function() {
    return this._exdate.map(function(t) {
      return new Date(t.getTime());
    });
  }, i.prototype.valueOf = function() {
    var t = [];
    return !this._rrule.length && this._dtstart && (t = t.concat(yt({ dtstart: this._dtstart }))), this._rrule.forEach(function(a) {
      t = t.concat(a.toString().split(`
`));
    }), this._exrule.forEach(function(a) {
      t = t.concat(a.toString().split(`
`).map(function(s) {
        return s.replace(/^RRULE:/, "EXRULE:");
      }).filter(function(s) {
        return !/^DTSTART/.test(s);
      }));
    }), this._rdate.length && t.push(Jt("RDATE", this._rdate, this.tzid())), this._exdate.length && t.push(Jt("EXDATE", this._exdate, this.tzid())), t;
  }, i.prototype.toString = function() {
    return this.valueOf().join(`
`);
  }, i.prototype.clone = function() {
    var t = new i(!!this._cache);
    return this._rrule.forEach(function(a) {
      return t.rrule(a.clone());
    }), this._exrule.forEach(function(a) {
      return t.exrule(a.clone());
    }), this._rdate.forEach(function(a) {
      return t.rdate(new Date(a.getTime()));
    }), this._exdate.forEach(function(a) {
      return t.exdate(new Date(a.getTime()));
    }), t;
  }, i;
}(P);
function Bt(e, i) {
  if (!(e instanceof P))
    throw new TypeError(String(e) + " is not RRule instance");
  K(i.map(String), String(e)) || i.push(e);
}
function Wt(e, i) {
  if (!(e instanceof Date))
    throw new TypeError(String(e) + " is not Date instance");
  K(i.map(Number), Number(e)) || (i.push(e), Ke(i));
}
function Jt(e, i, t) {
  var a = !t || t.toUpperCase() === "UTC", s = a ? "".concat(e, ":") : "".concat(e, ";TZID=").concat(t, ":"), n = i.map(function(_) {
    return xt(_.valueOf(), a);
  }).join(",");
  return "".concat(s).concat(n);
}
function $n(e) {
  let i = null, t = null;
  function a(_) {
    i && clearInterval(i);
    const d = e.matrix[e._mode];
    if (!d)
      return;
    e._schedulerOuter = e.$container.querySelector(".dhx_timeline_data_wrapper"), d.scrollable || (e._schedulerOuter = e.$container.querySelector(".dhx_cal_data"));
    const r = { pageX: _.touches ? _.touches[0].pageX : _.pageX, pageY: _.touches ? _.touches[0].pageY : _.pageY };
    i = setInterval(function() {
      (function(o) {
        if (!e.getState().drag_id)
          return clearInterval(i), void (t = null);
        const c = e.matrix[e._mode];
        if (!c)
          return;
        const h = e._schedulerOuter, y = function(x, w) {
          const E = e.matrix[e._mode], k = {}, S = {};
          let v = w;
          for (k.x = x.touches ? x.touches[0].pageX : x.pageX, k.y = x.touches ? x.touches[0].pageY : x.pageY, S.left = v.offsetLeft + E.dx, S.top = v.offsetTop; v; )
            S.left += v.offsetLeft, S.top += v.offsetTop, v = v.offsetParent;
          return { x: k.x - S.left, y: k.y - S.top };
        }(o, h), b = h.offsetWidth - c.dx, p = h.offsetHeight, u = y.x, m = y.y;
        let l = c.autoscroll || {};
        l === !0 && (l = {}), e._merge(l, { range_x: 200, range_y: 100, speed_x: 20, speed_y: 10 });
        let f = s(u, b, t ? t.x : 0, l.range_x);
        c.scrollable || (f = 0);
        let g = s(m, p, t ? t.y : 0, l.range_y);
        !g && !f || t || (t = { x: u, y: m }, f = 0, g = 0), f *= l.speed_x, g *= l.speed_y, f && g && (Math.abs(f / 5) > Math.abs(g) ? g = 0 : Math.abs(g / 5) > Math.abs(f) && (f = 0)), f || g ? (t.started = !0, function(x, w) {
          const E = e._schedulerOuter;
          w && (E.scrollTop += w), x && (E.scrollLeft += x);
        }(f, g)) : clearInterval(i);
      })(r);
    }, 10);
  }
  function s(_, d, r, o) {
    return _ < o && (!t || t.started || _ < r) ? -1 : d - _ < o && (!t || t.started || _ > r) ? 1 : 0;
  }
  e.attachEvent("onDestroy", function() {
    clearInterval(i);
  });
  var n = e.attachEvent("onSchedulerReady", function() {
    e.matrix && (e.event(document.body, "mousemove", a), e.detachEvent(n));
  });
}
const Hn = function() {
  var e, i = { minMax: "[0;max]", maxMin: "[max;0]", nMaxMin: "[-max;0]" };
  function t() {
    var n = i.minMax, _ = function() {
      var d = document.createElement("div");
      d.style.cssText = "direction: rtl;overflow: auto;width:100px;height: 100px;position:absolute;top: -100500px;left: -100500px;";
      var r = document.createElement("div");
      return r.style.cssText = "width: 100500px;height: 1px;", d.appendChild(r), d;
    }();
    return document.body.appendChild(_), _.scrollLeft > 0 ? n = i.minMax : (_.scrollLeft = -50, n = _.scrollLeft === -50 ? i.nMaxMin : i.maxMin), document.body.removeChild(_), n;
  }
  function a(n, _) {
    var d = s();
    return d === i.nMaxMin ? n ? -n : 0 : d === i.minMax ? _ - n : n;
  }
  function s() {
    return e || (e = t()), e;
  }
  return { modes: i, getMode: s, normalizeValue: a, getScrollValue: function(n) {
    var _ = getComputedStyle(n).direction;
    if (_ && _ !== "ltr") {
      var d = n.scrollWidth - n.offsetWidth;
      return a(n.scrollLeft, d);
    }
    return n.scrollLeft;
  }, setScrollValue: function(n, _) {
    var d = getComputedStyle(n).direction;
    if (d && d !== "ltr") {
      var r = a(_, n.scrollWidth - n.offsetWidth);
      n.scrollLeft = r;
    } else
      n.scrollLeft = _;
  } };
};
class zn {
  constructor(i) {
    this._scheduler = i;
  }
  getNode() {
    const i = this._scheduler;
    return this._tooltipNode || (this._tooltipNode = document.createElement("div"), this._tooltipNode.className = "dhtmlXTooltip scheduler_tooltip tooltip", i._waiAria.tooltipAttr(this._tooltipNode)), i.config.rtl ? this._tooltipNode.classList.add("dhtmlXTooltip_rtl") : this._tooltipNode.classList.remove("dhtmlXTooltip_rtl"), this._tooltipNode;
  }
  setViewport(i) {
    return this._root = i, this;
  }
  show(i, t) {
    const a = this._scheduler, s = a.$domHelpers, n = document.body, _ = this.getNode();
    if (s.isChildOf(_, n) || (this.hide(), n.appendChild(_)), this._isLikeMouseEvent(i)) {
      const d = this._calculateTooltipPosition(i);
      t = d.top, i = d.left;
    }
    return _.style.top = t + "px", _.style.left = i + "px", a._waiAria.tooltipVisibleAttr(_), this;
  }
  hide() {
    const i = this._scheduler, t = this.getNode();
    return t && t.parentNode && t.parentNode.removeChild(t), i._waiAria.tooltipHiddenAttr(t), this;
  }
  setContent(i) {
    return this.getNode().innerHTML = i, this;
  }
  _isLikeMouseEvent(i) {
    return !(!i || typeof i != "object") && "clientX" in i && "clientY" in i;
  }
  _getViewPort() {
    return this._root || document.body;
  }
  _calculateTooltipPosition(i) {
    const t = this._scheduler, a = t.$domHelpers, s = this._getViewPortSize(), n = this.getNode(), _ = { top: 0, left: 0, width: n.offsetWidth, height: n.offsetHeight, bottom: 0, right: 0 }, d = t.config.tooltip_offset_x, r = t.config.tooltip_offset_y, o = document.body, c = a.getRelativeEventPosition(i, o), h = a.getNodePosition(o);
    c.y += h.y, _.top = c.y, _.left = c.x, _.top += r, _.left += d, _.bottom = _.top + _.height, _.right = _.left + _.width;
    const y = window.scrollY + o.scrollTop;
    return _.top < s.top - y ? (_.top = s.top, _.bottom = _.top + _.height) : _.bottom > s.bottom && (_.bottom = s.bottom, _.top = _.bottom - _.height), _.left < s.left ? (_.left = s.left, _.right = s.left + _.width) : _.right > s.right && (_.right = s.right, _.left = _.right - _.width), c.x >= _.left && c.x <= _.right && (_.left = c.x - _.width - d, _.right = _.left + _.width), c.y >= _.top && c.y <= _.bottom && (_.top = c.y - _.height - r, _.bottom = _.top + _.height), _.left < 0 && (_.left = 0), _.right < 0 && (_.right = 0), _;
  }
  _getViewPortSize() {
    const i = this._scheduler, t = i.$domHelpers, a = this._getViewPort();
    let s, n = a, _ = window.scrollY + document.body.scrollTop, d = window.scrollX + document.body.scrollLeft;
    return a === i.$event_data ? (n = i.$event, _ = 0, d = 0, s = t.getNodePosition(i.$event)) : s = t.getNodePosition(n), { left: s.x + d, top: s.y + _, width: s.width, height: s.height, bottom: s.y + s.height + _, right: s.x + s.width + d };
  }
}
class qn {
  constructor(i) {
    this._listeners = {}, this.tooltip = new zn(i), this._scheduler = i, this._domEvents = i._createDomEventScope(), this._initDelayedFunctions();
  }
  destructor() {
    this.tooltip.hide(), this._domEvents.detachAll();
  }
  hideTooltip() {
    this.delayHide();
  }
  attach(i) {
    let t = document.body;
    const a = this._scheduler, s = a.$domHelpers;
    i.global || (t = a.$root);
    let n = null;
    const _ = (d) => {
      const r = s.getTargetNode(d), o = s.closest(r, i.selector);
      if (s.isChildOf(r, this.tooltip.getNode()))
        return;
      const c = () => {
        n = o, i.onmouseenter(d, o);
      };
      a._mobile && a.config.touch_tooltip && (o ? c() : i.onmouseleave(d, o)), n ? o && o === n ? i.onmousemove(d, o) : (i.onmouseleave(d, n), n = null, o && o !== n && c()) : o && c();
    };
    this.detach(i.selector), this._domEvents.attach(t, "mousemove", _), this._listeners[i.selector] = { node: t, handler: _ };
  }
  detach(i) {
    const t = this._listeners[i];
    t && this._domEvents.detach(t.node, "mousemove", t.handler);
  }
  tooltipFor(i) {
    const t = (a) => {
      let s = a;
      return document.createEventObject && !document.createEvent && (s = document.createEventObject(a)), s;
    };
    this._initDelayedFunctions(), this.attach({ selector: i.selector, global: i.global, onmouseenter: (a, s) => {
      const n = i.html(a, s);
      n && this.delayShow(t(a), n);
    }, onmousemove: (a, s) => {
      const n = i.html(a, s);
      n ? this.delayShow(t(a), n) : (this.delayShow.$cancelTimeout(), this.delayHide());
    }, onmouseleave: () => {
      this.delayShow.$cancelTimeout(), this.delayHide();
    } });
  }
  _initDelayedFunctions() {
    const i = this._scheduler;
    this.delayShow && this.delayShow.$cancelTimeout(), this.delayHide && this.delayHide.$cancelTimeout(), this.tooltip.hide(), this.delayShow = ve.delay((t, a) => {
      i.callEvent("onBeforeTooltip", [t]) === !1 ? this.tooltip.hide() : (this.tooltip.setContent(a), this.tooltip.show(t));
    }, i.config.tooltip_timeout || 1), this.delayHide = ve.delay(() => {
      this.delayShow.$cancelTimeout(), this.tooltip.hide();
    }, i.config.tooltip_hide_timeout || 1);
  }
}
const Pn = { active_links: function(e) {
  e.config.active_link_view = "day", e._active_link_click = function(i) {
    var t = i.target.getAttribute("data-link-date"), a = e.date.str_to_date(e.config.api_date, !1, !0);
    if (t)
      return e.setCurrentView(a(t), e.config.active_link_view), i && i.preventDefault && i.preventDefault(), !1;
  }, e.attachEvent("onTemplatesReady", function() {
    var i = function(a, s) {
      s = s || a + "_scale_date", e.templates["_active_links_old_" + s] || (e.templates["_active_links_old_" + s] = e.templates[s]);
      var n = e.templates["_active_links_old_" + s], _ = e.date.date_to_str(e.config.api_date);
      e.templates[s] = function(d) {
        return "<a data-link-date='" + _(d) + "' href='#'>" + n(d) + "</a>";
      };
    };
    if (i("week"), i("", "month_day"), this.matrix)
      for (var t in this.matrix)
        i(t);
    this._detachDomEvent(this._obj, "click", e._active_link_click), e.event(this._obj, "click", e._active_link_click);
  });
}, agenda_legacy: function(e) {
  e.date.add_agenda_legacy = function(i) {
    return e.date.add(i, 1, "year");
  }, e.templates.agenda_legacy_time = function(i, t, a) {
    return a._timed ? this.day_date(a.start_date, a.end_date, a) + " " + this.event_date(i) : e.templates.day_date(i) + " &ndash; " + e.templates.day_date(t);
  }, e.templates.agenda_legacy_text = function(i, t, a) {
    return a.text;
  }, e.templates.agenda_legacy_date = function() {
    return "";
  }, e.date.agenda_legacy_start = function() {
    return e.date.date_part(e._currentDate());
  }, e.attachEvent("onTemplatesReady", function() {
    var i = e.dblclick_dhx_cal_data;
    e.dblclick_dhx_cal_data = function() {
      if (this._mode == "agenda_legacy")
        !this.config.readonly && this.config.dblclick_create && this.addEventNow();
      else if (i)
        return i.apply(this, arguments);
    };
    var t = e.render_data;
    e.render_data = function(n) {
      if (this._mode != "agenda_legacy")
        return t.apply(this, arguments);
      s();
    };
    var a = e.render_view_data;
    function s() {
      var n = e.get_visible_events();
      n.sort(function(l, f) {
        return l.start_date > f.start_date ? 1 : -1;
      });
      for (var _, d = "<div class='dhx_agenda_area' " + e._waiAria.agendaDataAttrString() + ">", r = 0; r < n.length; r++) {
        var o = n[r], c = o.color ? "--dhx-scheduler-event-background:" + o.color + ";" : "", h = o.textColor ? "--dhx-scheduler-event-color:" + o.textColor + ";" : "", y = e.templates.event_class(o.start_date, o.end_date, o);
        _ = e._waiAria.agendaEventAttrString(o);
        var b = e._waiAria.agendaDetailsBtnString();
        d += "<div " + _ + " class='dhx_agenda_line" + (y ? " " + y : "") + "' event_id='" + o.id + "' " + e.config.event_attribute + "='" + o.id + "' style='" + h + c + (o._text_style || "") + "'><div class='dhx_agenda_event_time'>" + (e.config.rtl ? e.templates.agenda_time(o.end_date, o.start_date, o) : e.templates.agenda_time(o.start_date, o.end_date, o)) + "</div>", d += `<div ${b} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`, d += "<span>" + e.templates.agenda_text(o.start_date, o.end_date, o) + "</span></div>";
      }
      d += "<div class='dhx_v_border'></div></div>", e._els.dhx_cal_data[0].innerHTML = d, e._els.dhx_cal_data[0].childNodes[0].scrollTop = e._agendaScrollTop || 0;
      var p = e._els.dhx_cal_data[0].childNodes[0];
      p.childNodes[p.childNodes.length - 1].style.height = p.offsetHeight < e._els.dhx_cal_data[0].offsetHeight ? "100%" : p.offsetHeight + "px";
      var u = e._els.dhx_cal_data[0].firstChild.childNodes, m = e._getNavDateElement();
      for (m && (m.innerHTML = e.templates.agenda_date(e._min_date, e._max_date, e._mode)), e._rendered = [], r = 0; r < u.length - 1; r++)
        e._rendered[r] = u[r];
    }
    e.render_view_data = function() {
      return this._mode == "agenda_legacy" && (e._agendaScrollTop = e._els.dhx_cal_data[0].childNodes[0].scrollTop, e._els.dhx_cal_data[0].childNodes[0].scrollTop = 0), a.apply(this, arguments);
    }, e.agenda_legacy_view = function(n) {
      e._min_date = e.config.agenda_start || e.date.agenda_legacy_start(e._date), e._max_date = e.config.agenda_end || e.date.add_agenda_legacy(e._min_date, 1), function(_) {
        if (_) {
          var d = e.locale.labels, r = e._waiAria.agendaHeadAttrString(), o = e._waiAria.agendaHeadDateString(d.date), c = e._waiAria.agendaHeadDescriptionString(d.description);
          e._els.dhx_cal_header[0].innerHTML = "<div " + r + " class='dhx_agenda_line dhx_agenda_line_header'><div " + o + ">" + d.date + "</div><span class = 'description_header' style='padding-left:25px' " + c + ">" + d.description + "</span></div>", e._table_view = !0, e.set_sizes();
        }
      }(n), n ? (e._cols = null, e._colsS = null, e._table_view = !0, s()) : e._table_view = !1;
    };
  });
}, agenda_view: function(e) {
  e.date.add_agenda = function(s, n) {
    return e.date.add(s, 1 * n, "month");
  }, e.templates.agenda_time = function(s, n, _) {
    return _._timed ? `${this.event_date(s)} - ${this.event_date(n)}` : e.locale.labels.full_day;
  }, e.templates.agenda_text = function(s, n, _) {
    return _.text;
  };
  const i = e.date.date_to_str("%F %j"), t = e.date.date_to_str("%l");
  e.templates.agenda_day = function(s) {
    return `<div class="dhx_agenda_day_date">${i(s)}</div>
		<div class="dhx_agenda_day_dow">${t(s)}</div>`;
  }, e.templates.agenda_date = function(s, n) {
    return e.templates.month_date(e.getState().date);
  }, e.date.agenda_start = function(s) {
    return e.date.month_start(new Date(s));
  };
  let a = 0;
  e.attachEvent("onTemplatesReady", function() {
    var s = e.dblclick_dhx_cal_data;
    e.dblclick_dhx_cal_data = function() {
      if (this._mode == "agenda")
        !this.config.readonly && this.config.dblclick_create && this.addEventNow();
      else if (s)
        return s.apply(this, arguments);
    };
    var n = e.render_data;
    e.render_data = function(o) {
      if (this._mode != "agenda")
        return n.apply(this, arguments);
      d();
    };
    var _ = e.render_view_data;
    function d() {
      const o = e.get_visible_events();
      o.sort(function(m, l) {
        return m.start_date > l.start_date ? 1 : -1;
      });
      const c = {};
      let h = e.getState().min_date;
      const y = e.getState().max_date;
      for (; h.valueOf() < y.valueOf(); )
        c[h.valueOf()] = [], h = e.date.add(h, 1, "day");
      let b = !1;
      if (o.forEach((m) => {
        let l = e.date.day_start(new Date(m.start_date));
        for (; l.valueOf() < m.end_date.valueOf(); )
          c[l.valueOf()] && (c[l.valueOf()].push(m), b = !0), l = e.date.day_start(e.date.add(l, 1, "day"));
      }), b) {
        let m = "";
        for (let l in c)
          e.ignore_agenda && e.ignore_agenda(new Date(1 * l)) || (m += r(new Date(1 * l), c[l]));
        e._els.dhx_cal_data[0].innerHTML = m;
      } else
        e._els.dhx_cal_data[0].innerHTML = `<div class="dhx_cal_agenda_no_events">${e.locale.labels.agenda_tab}</div>`;
      e._els.dhx_cal_data[0].scrollTop = a;
      let p = e._els.dhx_cal_data[0].querySelectorAll(".dhx_cal_agenda_event_line");
      e._rendered = [];
      for (var u = 0; u < p.length - 1; u++)
        e._rendered[u] = p[u];
    }
    function r(o, c) {
      if (!c.length)
        return "";
      let h = `
<div class="dhx_cal_agenda_day" data-date="${e.templates.format_date(o)}" data-day="${o.getDay()}">
	<div class="dhx_cal_agenda_day_header">${e.templates.agenda_day(o)}</div>
	<div class="dhx_cal_agenda_day_events">
`;
      return c.forEach((y) => {
        h += function(b, p) {
          const u = e.templates.agenda_time(p.start_date, p.end_date, p), m = e.getState().select_id, l = e.templates.event_class(p.start_date, p.end_date, p), f = e.templates.agenda_text(p.start_date, p.end_date, p);
          let g = "";
          return (p.color || p.textColor) && (g = ` style="${p.color ? "--dhx-scheduler-event-background:" + p.color + ";" : ""}${p.textColor ? "--dhx-scheduler-event-color:" + p.textColor + ";" : ""}" `), `<div class="dhx_cal_agenda_event_line ${l || ""} ${p.id == m ? "dhx_cal_agenda_event_line_selected" : ""}" ${g} ${e.config.event_attribute}="${p.id}">
	<div class="dhx_cal_agenda_event_line_marker"></div>
	<div class="dhx_cal_agenda_event_line_time">${u}</div>
	<div class="dhx_cal_agenda_event_line_text">${f}</div>
</div>`;
        }(0, y);
      }), h += "</div></div>", h;
    }
    e.render_view_data = function() {
      return this._mode == "agenda" && (a = e._els.dhx_cal_data[0].scrollTop, e._els.dhx_cal_data[0].scrollTop = 0), _.apply(this, arguments);
    }, e.agenda_view = function(o) {
      o ? (e._min_date = e.config.agenda_start || e.date.agenda_start(e._date), e._max_date = e.config.agenda_end || e.date.add_agenda(e._min_date, 1), e._cols = null, e._colsS = null, e._table_view = !0, e._getNavDateElement().innerHTML = e.templates.agenda_date(e._date), d()) : e._table_view = !1;
    };
  });
}, all_timed: function(e) {
  e.config.all_timed = "short", e.config.all_timed_month = !1, e.ext.allTimed = { isMainAreaEvent: function(d) {
    return !!(d._timed || e.config.all_timed === !0 || e.config.all_timed == "short" && i(d));
  } };
  var i = function(d) {
    return !((d.end_date - d.start_date) / 36e5 >= 24) || e._drag_mode == "resize" && e._drag_id == d.id;
  };
  e._safe_copy = function(d) {
    var r = null, o = e._copy_event(d);
    return d.event_pid && (r = e.getEvent(d.event_pid)), r && r.isPrototypeOf(d) && (delete o.event_length, delete o.event_pid, delete o.rec_pattern, delete o.rec_type), o;
  };
  var t = e._pre_render_events_line, a = e._pre_render_events_table, s = function(d, r) {
    return this._table_view ? a.call(this, d, r) : t.call(this, d, r);
  };
  e._pre_render_events_line = e._pre_render_events_table = function(d, r) {
    if (!this.config.all_timed || this._table_view && this._mode != "month" || this._mode == "month" && !this.config.all_timed_month)
      return s.call(this, d, r);
    for (var o = 0; o < d.length; o++) {
      var c = d[o];
      if (!c._timed)
        if (this.config.all_timed != "short" || i(c)) {
          var h = this._safe_copy(c);
          c._virtual ? h._first_chunk = !1 : h._first_chunk = !0, h._drag_resize = !1, h._virtual = !0, h.start_date = new Date(h.start_date), u(c) ? (h.end_date = m(h.start_date), this.config.last_hour != 24 && (h.end_date = l(h.start_date, this.config.last_hour))) : h.end_date = new Date(c.end_date);
          var y = !1;
          h.start_date < this._max_date && h.end_date > this._min_date && h.start_date < h.end_date && (d[o] = h, y = !0);
          var b = this._safe_copy(c);
          if (b._virtual = !0, b.end_date = new Date(b.end_date), b.start_date < this._min_date ? b.start_date = l(this._min_date, this.config.first_hour) : b.start_date = l(m(c.start_date), this.config.first_hour), b.start_date < this._max_date && b.start_date < b.end_date) {
            if (!y) {
              d[o--] = b;
              continue;
            }
            d.splice(o + 1, 0, b), b._last_chunk = !1;
          } else
            h._last_chunk = !0, h._drag_resize = !0;
        } else
          this._mode != "month" && d.splice(o--, 1);
    }
    var p = this._drag_mode != "move" && r;
    return s.call(this, d, p);
    function u(f) {
      var g = m(f.start_date);
      return +f.end_date > +g;
    }
    function m(f) {
      var g = e.date.add(f, 1, "day");
      return g = e.date.date_part(g);
    }
    function l(f, g) {
      var x = e.date.date_part(new Date(f));
      return x.setHours(g), x;
    }
  };
  var n = e.get_visible_events;
  e.get_visible_events = function(d) {
    return this.config.all_timed && this.config.multi_day ? n.call(this, !1) : n.call(this, d);
  }, e.attachEvent("onBeforeViewChange", function(d, r, o, c) {
    return e._allow_dnd = o == "day" || o == "week" || e.getView(o), !0;
  }), e._is_main_area_event = function(d) {
    return e.ext.allTimed.isMainAreaEvent(d);
  };
  var _ = e.updateEvent;
  e.updateEvent = function(d) {
    var r, o, c = e.getEvent(d);
    c && (r = e.config.all_timed && !(e.isOneDayEvent(e._events[d]) || e.getState().drag_id)) && (o = e.config.update_render, e.config.update_render = !0), _.apply(e, arguments), c && r && (e.config.update_render = o);
  };
}, collision: function(e) {
  let i, t;
  function a(s) {
    e._get_section_view() && s && (i = e.getEvent(s)[e._get_section_property()]);
  }
  e.config.collision_limit = 1, e.attachEvent("onBeforeDrag", function(s) {
    return a(s), !0;
  }), e.attachEvent("onBeforeLightbox", function(s) {
    const n = e.getEvent(s);
    return t = [n.start_date, n.end_date], a(s), !0;
  }), e.attachEvent("onEventChanged", function(s) {
    if (!s || !e.getEvent(s))
      return !0;
    const n = e.getEvent(s);
    if (!e.checkCollision(n)) {
      if (!t)
        return !1;
      n.start_date = t[0], n.end_date = t[1], n._timed = this.isOneDayEvent(n);
    }
    return !0;
  }), e.attachEvent("onBeforeEventChanged", function(s, n, _) {
    return e.checkCollision(s);
  }), e.attachEvent("onEventAdded", function(s, n) {
    e.checkCollision(n) || e.deleteEvent(s);
  }), e.attachEvent("onEventSave", function(s, n, _) {
    if ((n = e._lame_clone(n)).id = s, !n.start_date || !n.end_date) {
      const d = e.getEvent(s);
      n.start_date = new Date(d.start_date), n.end_date = new Date(d.end_date);
    }
    return (n.rrule && !n.recurring_event_id || n.rec_type) && e._roll_back_dates(n), e.checkCollision(n);
  }), e._check_sections_collision = function(s, n) {
    const _ = e._get_section_property();
    return s[_] == n[_] && s.id != n.id;
  }, e.checkCollision = function(s) {
    let n = [];
    const _ = e.config.collision_limit;
    if (s.rec_type) {
      let c = e.getRecDates(s);
      for (let h = 0; h < c.length; h++) {
        let y = e.getEvents(c[h].start_date, c[h].end_date);
        for (let b = 0; b < y.length; b++)
          (y[b].event_pid || y[b].id) != s.id && n.push(y[b]);
      }
    } else if (s.rrule) {
      let c = e.getRecDates(s);
      for (let h = 0; h < c.length; h++) {
        let y = e.getEvents(c[h].start_date, c[h].end_date);
        for (let b = 0; b < y.length; b++)
          (String(y[b].id).split("#")[0] || y[b].id) != s.id && n.push(y[b]);
      }
    } else {
      n = e.getEvents(s.start_date, s.end_date);
      for (let c = 0; c < n.length; c++) {
        let h = n[c];
        if (h.id == s.id || h.event_length && [h.event_pid, h.event_length].join("#") == s.id) {
          n.splice(c, 1);
          break;
        }
        if (h.recurring_event_id && [h.recurring_event_id, h._pid_time].join("#") == s.id) {
          n.splice(c, 1);
          break;
        }
      }
    }
    const d = e._get_section_view(), r = e._get_section_property();
    let o = !0;
    if (d) {
      let c = 0;
      for (let h = 0; h < n.length; h++)
        n[h].id != s.id && this._check_sections_collision(n[h], s) && c++;
      c >= _ && (o = !1);
    } else
      n.length >= _ && (o = !1);
    if (!o) {
      let c = !e.callEvent("onEventCollision", [s, n]);
      return c || (s[r] = i || s[r]), c;
    }
    return o;
  };
}, container_autoresize: function(e) {
  e.config.container_autoresize = !0, e.config.month_day_min_height = 90, e.config.min_grid_size = 25, e.config.min_map_size = 400;
  var i = e._pre_render_events, t = !0, a = 0, s = 0;
  e._pre_render_events = function(c, h) {
    if (!e.config.container_autoresize || !t)
      return i.apply(this, arguments);
    var y = this.xy.bar_height, b = this._colsS.heights, p = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], u = this._els.dhx_cal_data[0];
    if (c = this._table_view ? this._pre_render_events_table(c, h) : this._pre_render_events_line(c, h), this._table_view)
      if (h)
        this._colsS.heights = b;
      else {
        var m = u.firstChild;
        const k = m.querySelectorAll(".dhx_cal_month_row");
        if (k && k.length) {
          for (var l = 0; l < k.length; l++) {
            if (p[l]++, p[l] * y > this._colsS.height - this.xy.month_head_height) {
              var f = k[l].querySelectorAll(".dhx_cal_month_cell"), g = this._colsS.height - this.xy.month_head_height;
              1 * this.config.max_month_events !== this.config.max_month_events || p[l] <= this.config.max_month_events ? g = p[l] * y : (this.config.max_month_events + 1) * y > this._colsS.height - this.xy.month_head_height && (g = (this.config.max_month_events + 1) * y), k[l].style.height = g + this.xy.month_head_height + "px";
              for (var x = 0; x < f.length; x++)
                f[x].childNodes[1].style.height = g + "px";
              p[l] = (p[l - 1] || 0) + f[0].offsetHeight;
            }
            p[l] = (p[l - 1] || 0) + k[l].querySelectorAll(".dhx_cal_month_cell")[0].offsetHeight;
          }
          p.unshift(0), m.parentNode.offsetHeight < m.parentNode.scrollHeight && m._h_fix;
        } else if (c.length || this._els.dhx_multi_day[0].style.visibility != "visible" || (p[0] = -1), c.length || p[0] == -1) {
          var w = (p[0] + 1) * y + 1;
          s != w + 1 && (this._obj.style.height = a - s + w - 1 + "px"), w += "px";
          const S = this._els.dhx_cal_navline[0].offsetHeight, v = this._els.dhx_cal_header[0].offsetHeight;
          u.style.height = this._obj.offsetHeight - S - v - (this.xy.margin_top || 0) + "px";
          var E = this._els.dhx_multi_day[0];
          E.style.height = w, E.style.visibility = p[0] == -1 ? "hidden" : "visible", E.style.display = p[0] == -1 ? "none" : "", (E = this._els.dhx_multi_day[1]).style.height = w, E.style.visibility = p[0] == -1 ? "hidden" : "visible", E.style.display = p[0] == -1 ? "none" : "", E.className = p[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (p[0] + 1) * y, p[0] = 0;
        }
      }
    return c;
  };
  var n = ["dhx_cal_navline", "dhx_cal_header", "dhx_multi_day", "dhx_cal_data"], _ = function(c) {
    a = 0;
    for (var h = 0; h < n.length; h++) {
      var y = n[h], b = e._els[y] ? e._els[y][0] : null, p = 0;
      switch (y) {
        case "dhx_cal_navline":
        case "dhx_cal_header":
          p = b.offsetHeight;
          break;
        case "dhx_multi_day":
          p = b ? b.offsetHeight - 1 : 0, s = p;
          break;
        case "dhx_cal_data":
          var u = e.getState().mode;
          if (b.childNodes[1] && u != "month") {
            let N = 0;
            for (let T = 0; T < b.childNodes.length; T++)
              b.childNodes[T].offsetHeight > N && (N = b.childNodes[T].offsetHeight);
            p = N;
          } else
            p = Math.max(b.offsetHeight - 1, b.scrollHeight);
          if (u == "month")
            e.config.month_day_min_height && !c && (p = b.querySelectorAll(".dhx_cal_month_row").length * e.config.month_day_min_height), c && (b.style.height = p + "px");
          else if (u == "year")
            p = 190 * e.config.year_y;
          else if (u == "agenda") {
            if (p = 0, b.children && b.children.length)
              if (b.children.length === 1 && b.children[0].classList.contains("dhx_cal_agenda_no_events"))
                p = 300;
              else
                for (var m = 0; m < b.children.length; m++)
                  p += b.children[m].offsetHeight;
            p + 2 < e.config.min_grid_size ? p = e.config.min_grid_size : p += 2;
          } else if (u == "week_agenda") {
            for (var l, f, g = e.xy.week_agenda_scale_height + e.config.min_grid_size, x = 0; x < b.childNodes.length; x++)
              for (f = b.childNodes[x], m = 0; m < f.childNodes.length; m++) {
                for (var w = 0, E = f.childNodes[m].childNodes[1], k = 0; k < E.childNodes.length; k++)
                  w += E.childNodes[k].offsetHeight;
                l = w + e.xy.week_agenda_scale_height, (l = x != 1 || m != 2 && m != 3 ? l : 2 * l) > g && (g = l);
              }
            p = 3 * g;
          } else if (u == "map") {
            p = 0;
            var S = b.querySelectorAll(".dhx_map_line");
            for (m = 0; m < S.length; m++)
              p += S[m].offsetHeight;
            p + 2 < e.config.min_map_size ? p = e.config.min_map_size : p += 2;
          } else if (e._gridView)
            if (p = 0, b.childNodes[1].childNodes[0].childNodes && b.childNodes[1].childNodes[0].childNodes.length) {
              for (S = b.childNodes[1].childNodes[0].childNodes[0].childNodes, m = 0; m < S.length; m++)
                p += S[m].offsetHeight;
              (p += 2) < e.config.min_grid_size && (p = e.config.min_grid_size);
            } else
              p = e.config.min_grid_size;
          if (e.matrix && e.matrix[u]) {
            if (c)
              p += 0, b.style.height = p + "px";
            else {
              p = 0;
              for (var v = e.matrix[u], D = v.y_unit, M = 0; M < D.length; M++)
                p += v.getSectionHeight(D[M].key);
              e.$container.clientWidth != e.$container.scrollWidth && (p += o());
            }
            p -= 1;
          }
          (u == "day" || u == "week" || e._props && e._props[u]) && (p += 2);
      }
      a += p += 1;
    }
    e._obj.style.height = a + "px", c || e.updateView();
  };
  function d() {
    t = !1, e.callEvent("onAfterSchedulerResize", []), t = !0;
  }
  var r = function() {
    if (!e.config.container_autoresize || !t)
      return !0;
    var c = e.getState().mode;
    if (!c)
      return !0;
    var h = window.requestAnimationFrame || window.setTimeout, y = document.documentElement.scrollTop;
    h(function() {
      !e.$destroyed && e.$initialized && _();
    }), e.matrix && e.matrix[c] || c == "month" ? h(function() {
      !e.$destroyed && e.$initialized && (_(!0), document.documentElement.scrollTop = y, d());
    }, 1) : d();
  };
  function o() {
    var c = document.createElement("div");
    c.style.cssText = "visibility:hidden;position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;height:110px;min-height:100px;overflow-y:scroll;", document.body.appendChild(c);
    var h = c.offsetWidth - c.clientWidth;
    return document.body.removeChild(c), h;
  }
  e.attachEvent("onBeforeViewChange", function() {
    var c = e.config.container_autoresize;
    if (e.xy.$original_scroll_width || (e.xy.$original_scroll_width = e.xy.scroll_width), e.xy.scroll_width = c ? 0 : e.xy.$original_scroll_width, e.matrix)
      for (var h in e.matrix) {
        var y = e.matrix[h];
        y.$original_section_autoheight || (y.$original_section_autoheight = y.section_autoheight), y.section_autoheight = !c && y.$original_section_autoheight;
      }
    return !0;
  }), e.attachEvent("onViewChange", r), e.attachEvent("onXLE", r), e.attachEvent("onEventChanged", r), e.attachEvent("onEventCreated", r), e.attachEvent("onEventAdded", r), e.attachEvent("onEventDeleted", r), e.attachEvent("onAfterSchedulerResize", r), e.attachEvent("onClearAll", r), e.attachEvent("onBeforeExpand", function() {
    return t = !1, !0;
  }), e.attachEvent("onBeforeCollapse", function() {
    return t = !0, !0;
  });
}, cookie: function(e) {
  function i(s) {
    return (s._obj.id || "scheduler") + "_settings";
  }
  var t = !0;
  e.attachEvent("onBeforeViewChange", function(s, n, _, d) {
    if (t && e._get_url_nav) {
      var r = e._get_url_nav();
      (r.date || r.mode || r.event) && (t = !1);
    }
    var o = i(e);
    if (t) {
      t = !1;
      var c = function(y) {
        var b = y + "=";
        if (document.cookie.length > 0) {
          var p = document.cookie.indexOf(b);
          if (p != -1) {
            p += b.length;
            var u = document.cookie.indexOf(";", p);
            return u == -1 && (u = document.cookie.length), document.cookie.substring(p, u);
          }
        }
        return "";
      }(o);
      if (c) {
        e._min_date || (e._min_date = d), (c = unescape(c).split("@"))[0] = this._helpers.parseDate(c[0]);
        var h = this.isViewExists(c[1]) ? c[1] : _;
        return d = isNaN(+c[0]) ? d : c[0], window.setTimeout(function() {
          e.$destroyed || e.setCurrentView(d, h);
        }, 1), !1;
      }
    }
    return !0;
  }), e.attachEvent("onViewChange", function(s, n) {
    (function(_, d, r) {
      const o = `${_}=${r}${d ? `; ${d}` : ""}`;
      document.cookie = `${o}; Secure`;
    })(i(e), "expires=Sun, 31 Jan 9999 22:00:00 GMT", escape(this._helpers.formatDate(n) + "@" + s));
  });
  var a = e._load;
  e._load = function() {
    var s = arguments;
    if (e._date)
      a.apply(this, s);
    else {
      var n = this;
      window.setTimeout(function() {
        a.apply(n, s);
      }, 1);
    }
  };
}, daytimeline: function(e) {
  Ot(e);
  var i = e.createTimelineView;
  e.createTimelineView = function(t) {
    if (t.render == "days") {
      var a = t.name, s = t.y_property = "timeline-week" + a;
      t.y_unit = [], t.render = "bar", t.days = t.days || 7, i.call(this, t), e.templates[a + "_scalex_class"] = function() {
      }, e.templates[a + "_scaley_class"] = function() {
      }, e.templates[a + "_scale_label"] = function(x, w, E) {
        return e.templates.day_date(w);
      }, e.date[a + "_start"] = function(x) {
        return x = e.date.week_start(x), x = e.date.add(x, t.x_step * t.x_start, t.x_unit);
      }, e.date["add_" + a] = function(x, w) {
        return e.date.add(x, w * t.days, "day");
      };
      var n = e._renderMatrix;
      e._renderMatrix = function(x, w) {
        x && function() {
          var E = new Date(e.getState().date), k = e.date[a + "_start"](E);
          k = e.date.date_part(k);
          var S = [], v = e.matrix[a];
          v.y_unit = S, v.order = {};
          for (var D = 0; D < t.days; D++)
            S.push({ key: +k, label: k }), v.order[v.y_unit[D].key] = D, k = e.date.add(k, 1, "day");
        }(), n.apply(this, arguments);
      };
      var _ = e.checkCollision;
      e.checkCollision = function(x) {
        return x[s] && delete (x = function(w) {
          var E = {};
          for (var k in w)
            E[k] = w[k];
          return E;
        }(x))[s], _.apply(e, [x]);
      }, e.attachEvent("onBeforeDrag", function(x, w, E) {
        var k = E.target || E.srcElement, S = e._getClassName(k);
        if (w == "resize")
          S.indexOf("dhx_event_resize_end") < 0 ? e._w_line_drag_from_start = !0 : e._w_line_drag_from_start = !1;
        else if (w == "move" && S.indexOf("no_drag_move") >= 0)
          return !1;
        return !0;
      });
      var d = e["mouse_" + a];
      e["mouse_" + a] = function(x) {
        var w;
        this._drag_event && (w = this._drag_event._move_delta);
        var E = e.matrix[this._mode];
        if (E.scrollable && !x.converted && (x.converted = 1, x.x -= -E._x_scroll, x.y += E._y_scroll), w === void 0 && e._drag_mode == "move") {
          var k = { y: x.y };
          e._resolve_timeline_section(E, k);
          var S = x.x - E.dx, v = new Date(k.section);
          f(e._timeline_drag_date(E, S), v);
          var D = e._drag_event, M = this.getEvent(this._drag_id);
          M && (D._move_delta = (M.start_date - v) / 6e4, this.config.preserve_length && x._ignores && (D._move_delta = this._get_real_event_length(M.start_date, v, E), D._event_length = this._get_real_event_length(M.start_date, M.end_date, E)));
        }
        if (x = d.apply(e, arguments), e._drag_mode && e._drag_mode != "move") {
          var N = null;
          N = e._drag_event && e._drag_event["timeline-week" + a] ? new Date(e._drag_event["timeline-week" + a]) : new Date(x.section), x.y += Math.round((N - e.date.date_part(new Date(e._min_date))) / (6e4 * this.config.time_step)), e._drag_mode == "resize" && (x.resize_from_start = e._w_line_drag_from_start);
        } else if (e._drag_event) {
          var T = Math.floor(Math.abs(x.y / (1440 / e.config.time_step)));
          T *= x.y > 0 ? 1 : -1, x.y = x.y % (1440 / e.config.time_step);
          var A = e.date.date_part(new Date(e._min_date));
          A.valueOf() != new Date(x.section).valueOf() && (x.x = Math.floor((x.section - A) / 864e5), x.x += T);
        }
        return x;
      }, e.attachEvent("onEventCreated", function(x, w) {
        return e._events[x] && delete e._events[x][s], !0;
      }), e.attachEvent("onBeforeEventChanged", function(x, w, E, k) {
        return e._events[x.id] && delete e._events[x.id][s], !0;
      });
      var r = e._update_timeline_section;
      e._update_timeline_section = function(x) {
        var w, E;
        this._mode == a && (w = x.event) && (E = e._get_copied_event(w.id, e.date.day_start(new Date(w.start_date.valueOf())))) && (x.event._sorder = E._sorder, x.event._count = E._count), r.apply(this, arguments), w && E && (E._count = w._count, E._sorder = w._sorder);
      };
      var o = e.render_view_data;
      e.render_view_data = function(x, w) {
        return this._mode == a && x && (x = p(x), e._restore_render_flags(x)), o.apply(e, [x, w]);
      };
      var c = e.get_visible_events;
      e.get_visible_events = function() {
        if (this._mode == a) {
          this._clear_copied_events(), e._max_date = e.date.date_part(e.date.add(e._min_date, t.days, "day"));
          var x = c.apply(e, arguments);
          return x = p(x), e._register_copies_array(x), x;
        }
        return c.apply(e, arguments);
      };
      var h = e.addEventNow;
      e.addEventNow = function(x) {
        if (e.getState().mode == a)
          if (x[s]) {
            var w = new Date(x[s]);
            b(w, x.start_date), b(w, x.end_date);
          } else {
            var E = new Date(x.start_date);
            x[s] = +e.date.date_part(E);
          }
        return h.apply(e, arguments);
      };
      var y = e._render_marked_timespan;
      e._render_marked_timespan = function() {
        if (e._mode != a)
          return y.apply(this, arguments);
      };
    } else
      i.apply(this, arguments);
    function b(x, w) {
      w.setDate(1), w.setFullYear(x.getFullYear()), w.setMonth(x.getMonth()), w.setDate(x.getDate());
    }
    function p(x) {
      for (var w = [], E = 0; E < x.length; E++) {
        var k = m(x[E]);
        if (e.isOneDayEvent(k))
          l(k), w.push(k);
        else {
          for (var S = new Date(Math.min(+k.end_date, +e._max_date)), v = new Date(Math.max(+k.start_date, +e._min_date)), D = []; +v < +S; ) {
            var M = m(k);
            M.start_date = v, M.end_date = new Date(Math.min(+g(M.start_date), +S)), v = g(v), l(M), w.push(M), D.push(M);
          }
          u(D, k);
        }
      }
      return w;
    }
    function u(x, w) {
      for (var E = !1, k = !1, S = 0, v = x.length; S < v; S++) {
        var D = x[S];
        E = +D._w_start_date == +w.start_date, k = +D._w_end_date == +w.end_date, D._no_resize_start = D._no_resize_end = !0, E && (D._no_resize_start = !1), k && (D._no_resize_end = !1);
      }
    }
    function m(x) {
      var w = e.getEvent(x.event_pid);
      return w && w.isPrototypeOf(x) ? (delete (x = e._copy_event(x)).event_length, delete x.event_pid, delete x.rec_pattern, delete x.rec_type) : x = e._lame_clone(x), x;
    }
    function l(x) {
      if (!x._w_start_date || !x._w_end_date) {
        var w = e.date, E = x._w_start_date = new Date(x.start_date), k = x._w_end_date = new Date(x.end_date);
        x[s] = +w.date_part(x.start_date), x._count || (x._count = 1), x._sorder || (x._sorder = 0);
        var S = k - E;
        x.start_date = new Date(e._min_date), f(E, x.start_date), x.end_date = new Date(+x.start_date + S), E.getTimezoneOffset() != k.getTimezoneOffset() && (x.end_date = new Date(x.end_date.valueOf() + 6e4 * (E.getTimezoneOffset() - k.getTimezoneOffset())));
      }
    }
    function f(x, w) {
      w.setMinutes(x.getMinutes()), w.setHours(x.getHours());
    }
    function g(x) {
      var w = e.date.add(x, 1, "day");
      return w = e.date.date_part(w);
    }
  };
}, drag_between: function(e) {
  window.Scheduler && window.Scheduler.plugin && (window.Scheduler._outer_drag = Ze), ta.push(e), ht || aa(e), e.config.drag_in = !0, e.config.drag_out = !0, e.templates.event_outside = function(t, a, s) {
  };
  var i = Ze;
  e.attachEvent("onTemplatesReady", function() {
    e.event(e._obj, "mousemove", function(t) {
      i.target_scheduler = e;
    }), e.event(e._obj, "mouseup", function(t) {
      i.target_scheduler = e;
    });
  });
}, editors: function(e) {
  e.form_blocks.combo = { render: function(i) {
    i.cached_options || (i.cached_options = {});
    const t = i.height ? `style='height:${i.height}px;'` : "";
    var a = "";
    return a += `<div class='${i.type}' ${t}></div>`;
  }, set_value: function(i, t, a, s) {
    (function() {
      b();
      var y = e.attachEvent("onAfterLightbox", function() {
        b(), e.detachEvent(y);
      });
      function b() {
        if (i._combo && i._combo.DOMParent) {
          var p = i._combo;
          p.unload ? p.unload() : p.destructor && p.destructor(), p.DOMParent = p.DOMelem = null;
        }
      }
    })(), window.dhx_globalImgPath = s.image_path || "/", i._combo = new dhtmlXCombo(i, s.name, i.offsetWidth - 8), s.onchange && i._combo.attachEvent("onChange", s.onchange), s.options_height && i._combo.setOptionHeight(s.options_height);
    var n = i._combo;
    if (n.enableFilteringMode(s.filtering, s.script_path || null, !!s.cache), s.script_path) {
      var _ = a[s.map_to];
      _ ? s.cached_options[_] ? (n.addOption(_, s.cached_options[_]), n.disable(1), n.selectOption(0), n.disable(0)) : e.ajax.get(s.script_path + "?id=" + _ + "&uid=" + e.uid(), function(y) {
        var b, p = y.xmlDoc.responseText;
        try {
          b = JSON.parse(p).options[0].text;
        } catch {
          b = e.ajax.xpath("//option", y.xmlDoc)[0].childNodes[0].nodeValue;
        }
        s.cached_options[_] = b, n.addOption(_, b), n.disable(1), n.selectOption(0), n.disable(0);
      }) : n.setComboValue("");
    } else {
      for (var d = [], r = 0; r < s.options.length; r++) {
        var o = s.options[r], c = [o.key, o.label, o.css];
        d.push(c);
      }
      if (n.addOption(d), a[s.map_to]) {
        var h = n.getIndexByValue(a[s.map_to]);
        n.selectOption(h);
      }
    }
  }, get_value: function(i, t, a) {
    var s = i._combo.getSelectedValue();
    return a.script_path && (a.cached_options[s] = i._combo.getSelectedText()), s;
  }, focus: function(i) {
  } }, e.form_blocks.radio = { render: function(i) {
    var t = "";
    t += `<div class='dhx_cal_ltext dhx_cal_radio ${i.vertical ? "dhx_cal_radio_vertical" : ""}' style='height:${i.height}px;'>`;
    for (var a = 0; a < i.options.length; a++) {
      var s = e.uid();
      t += "<label class='dhx_cal_radio_item' for='" + s + "'><input id='" + s + "' type='radio' name='" + i.name + "' value='" + i.options[a].key + "'><span> " + i.options[a].label + "</span></label>";
    }
    return t += "</div>";
  }, set_value: function(i, t, a, s) {
    for (var n = i.getElementsByTagName("input"), _ = 0; _ < n.length; _++) {
      n[_].checked = !1;
      var d = a[s.map_to] || t;
      n[_].value == d && (n[_].checked = !0);
    }
  }, get_value: function(i, t, a) {
    for (var s = i.getElementsByTagName("input"), n = 0; n < s.length; n++)
      if (s[n].checked)
        return s[n].value;
  }, focus: function(i) {
  } }, e.form_blocks.checkbox = { render: function(i) {
    return e.config.wide_form ? '<div class="dhx_cal_wide_checkbox"></div>' : "";
  }, set_value: function(i, t, a, s) {
    i = e._lightbox.querySelector(`#${s.id}`), s.height && (i.style.height = `${s.height}px`);
    var n = e.uid(), _ = s.checked_value !== void 0 ? t == s.checked_value : !!t;
    i.className += " dhx_cal_checkbox";
    var d = "<input id='" + n + "' type='checkbox' value='true' name='" + s.name + "'" + (_ ? "checked='true'" : "") + "'>", r = "<label for='" + n + "'>" + (e.locale.labels["section_" + s.name] || s.name) + "</label>";
    if (e.config.wide_form ? (i.innerHTML = r, i.nextSibling.innerHTML = d) : i.innerHTML = d + r, s.handler) {
      var o = i.getElementsByTagName("input")[0];
      if (o.$_eventAttached)
        return;
      o.$_eventAttached = !0, e.event(o, "click", s.handler);
    }
  }, get_value: function(i, t, a) {
    var s = (i = e._lightbox.querySelector(`#${a.id}`)).getElementsByTagName("input")[0];
    return s || (s = i.nextSibling.getElementsByTagName("input")[0]), s.checked ? a.checked_value || !0 : a.unchecked_value || !1;
  }, focus: function(i) {
  } };
}, expand: function(e) {
  e.ext.fullscreen = { toggleIcon: null }, e.expand = function() {
    if (e.callEvent("onBeforeExpand", [])) {
      var i = e._obj;
      do
        i._position = i.style.position || "", i.style.position = "static";
      while ((i = i.parentNode) && i.style);
      (i = e._obj).style.position = "absolute", i._width = i.style.width, i._height = i.style.height, i.style.width = i.style.height = "100%", i.style.top = i.style.left = "0px";
      var t = document.body;
      t.scrollTop = 0, (t = t.parentNode) && (t.scrollTop = 0), document.body._overflow = document.body.style.overflow || "", document.body.style.overflow = "hidden", e._maximize(), e.callEvent("onExpand", []);
    }
  }, e.collapse = function() {
    if (e.callEvent("onBeforeCollapse", [])) {
      var i = e._obj;
      do
        i.style.position = i._position;
      while ((i = i.parentNode) && i.style);
      (i = e._obj).style.width = i._width, i.style.height = i._height, document.body.style.overflow = document.body._overflow, e._maximize(), e.callEvent("onCollapse", []);
    }
  }, e.attachEvent("onTemplatesReady", function() {
    var i = document.createElement("div");
    i.className = "dhx_expand_icon", e.ext.fullscreen.toggleIcon = i, i.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
	`, e._obj.appendChild(i), e.event(i, "click", function() {
      e.expanded ? e.collapse() : e.expand();
    });
  }), e._maximize = function() {
    this.expanded = !this.expanded, this.expanded ? this.ext.fullscreen.toggleIcon.classList.add("dhx_expand_icon--expanded") : this.ext.fullscreen.toggleIcon.classList.remove("dhx_expand_icon--expanded");
    for (var i = ["left", "top"], t = 0; t < i.length; t++) {
      var a = e["_prev_margin_" + i[t]];
      e.xy["margin_" + i[t]] ? (e["_prev_margin_" + i[t]] = e.xy["margin_" + i[t]], e.xy["margin_" + i[t]] = 0) : a && (e.xy["margin_" + i[t]] = e["_prev_margin_" + i[t]], delete e["_prev_margin_" + i[t]]);
    }
    e.setCurrentView();
  };
}, export_api: function(e) {
  (function() {
    function i(a, s) {
      for (var n in s)
        a[n] || (a[n] = s[n]);
      return a;
    }
    function t(a, s) {
      var n = {};
      return (a = s._els[a]) && a[0] ? (n.x = a[0].scrollWidth, n.y = a[0].scrollHeight) : (n.x = 0, n.y = 0), n;
    }
    window.dhtmlxAjax || (window.dhtmlxAjax = { post: function(a, s, n) {
      return window.dhx4.ajax.post(a, s, n);
    }, get: function(a, s) {
      return window.ajax.get(a, s);
    } }), function(a) {
      function s() {
        var n = a.getState().mode;
        return a.matrix && a.matrix[n] ? a.matrix[n] : null;
      }
      a.exportToPDF = function(n) {
        (n = i(n || {}, { name: "calendar.pdf", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: a.config.rtl })).html = this._export_html(n), n.mode = this.getState().mode, this._send_to_export(n, "pdf");
      }, a.exportToPNG = function(n) {
        (n = i(n || {}, { name: "calendar.png", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: a.config.rtl })).html = this._export_html(n), n.mode = this.getState().mode, this._send_to_export(n, "png");
      }, a.exportToICal = function(n) {
        n = i(n || {}, { name: "calendar.ical", data: this._serialize_plain(null, n) }), this._send_to_export(n, "ical");
      }, a.exportToExcel = function(n) {
        n = i(n || {}, { name: "calendar.xlsx", title: "Events", data: this._serialize_plain(this.templates.xml_format, n), columns: this._serialize_columns() }), this._send_to_export(n, "excel");
      }, a._ajax_to_export = function(n, _, d) {
        delete n.callback;
        var r = n.server || "https://export.dhtmlx.com/scheduler";
        window.dhtmlxAjax.post(r, "type=" + _ + "&store=1&data=" + encodeURIComponent(JSON.stringify(n)), function(o) {
          var c = null;
          if (!(o.xmlDoc.status > 400))
            try {
              c = JSON.parse(o.xmlDoc.responseText);
            } catch {
            }
          d(c);
        });
      }, a._plain_export_copy = function(n, _) {
        var d = {};
        for (var r in n)
          d[r] = n[r];
        return d.start_date = _(d.start_date), d.end_date = _(d.end_date), d.$text = this.templates.event_text(n.start_date, n.end_date, n), d;
      }, a._serialize_plain = function(n, _) {
        var d;
        n = n || a.date.date_to_str("%Y%m%dT%H%i%s", !0), d = _ && _.start && _.end ? a.getEvents(_.start, _.end) : a.getEvents();
        for (var r = [], o = 0; o < d.length; o++)
          r[o] = this._plain_export_copy(d[o], n);
        return r;
      }, a._serialize_columns = function() {
        return [{ id: "start_date", header: "Start Date", width: 30 }, { id: "end_date", header: "End Date", width: 30 }, { id: "$text", header: "Text", width: 100 }];
      }, a._send_to_export = function(n, _) {
        if (n.version || (n.version = a.version), n.skin || (n.skin = a.skin), n.callback)
          return a._ajax_to_export(n, _, n.callback);
        var d = this._create_hidden_form();
        d.firstChild.action = n.server || "https://export.dhtmlx.com/scheduler", d.firstChild.childNodes[0].value = JSON.stringify(n), d.firstChild.childNodes[1].value = _, d.firstChild.submit();
      }, a._create_hidden_form = function() {
        if (!this._hidden_export_form) {
          var n = this._hidden_export_form = document.createElement("div");
          n.style.display = "none", n.innerHTML = "<form method='POST' target='_blank'><input type='text' name='data'><input type='hidden' name='type' value=''></form>", document.body.appendChild(n);
        }
        return this._hidden_export_form;
      }, a._get_export_size = function(n, _, d, r, o, c, h) {
        r = parseInt(r) / 25.4 || 4;
        var y = { A5: { x: 148, y: 210 }, A4: { x: 210, y: 297 }, A3: { x: 297, y: 420 }, A2: { x: 420, y: 594 }, A1: { x: 594, y: 841 }, A0: { x: 841, y: 1189 } }, b = t("dhx_cal_data", this).x, p = { y: t("dhx_cal_data", this).y + t("dhx_cal_header", this).y + t("dhx_multi_day", this).y };
        return p.x = n === "full" ? b : Math.floor((_ === "landscape" ? y[n].y : y[n].x) * r), h && (p.x *= parseFloat(h.x) || 1, p.y *= parseFloat(h.y) || 1), p;
      }, a._export_html = function(n) {
        var _ = function() {
          var o = void 0, c = void 0, h = s();
          return h && (c = h.scrollable, o = h.smart_rendering), { nav_height: a.xy.nav_height, scroll_width: a.xy.scroll_width, style_width: a._obj.style.width, style_height: a._obj.style.height, timeline_scrollable: c, timeline_smart_rendering: o };
        }(), d = a._get_export_size(n.format, n.orientation, n.zoom, n.dpi, n.header, n.footer, n.scales), r = "";
        try {
          (function(o, c) {
            a._obj.style.width = o.x + "px", a._obj.style.height = o.y + "px", a.xy.nav_height = 0, a.xy.scroll_width = 0;
            var h = s();
            (c.timeline_scrollable || c.timeline_smart_rendering) && (h.scrollable = !1, h.smart_rendering = !1);
          })(d, _), a.setCurrentView(), r = a._obj.innerHTML;
        } catch (o) {
          console.error(o);
        } finally {
          (function(o) {
            a.xy.scroll_width = o.scroll_width, a.xy.nav_height = o.nav_height, a._obj.style.width = o.style_width, a._obj.style.height = o.style_height;
            var c = s();
            (o.timeline_scrollable || o.timeline_smart_rendering) && (c.scrollable = o.timeline_scrollable, c.smart_rendering = o.timeline_smart_rendering);
          })(_), a.setCurrentView();
        }
        return r;
      };
    }(e);
  })();
}, grid_view: function(e) {
  e._grid = { names: {}, sort_rules: { int: function(i, t, a) {
    return 1 * a(i) < 1 * a(t) ? 1 : -1;
  }, str: function(i, t, a) {
    return a(i) < a(t) ? 1 : -1;
  }, date: function(i, t, a) {
    return new Date(a(i)) < new Date(a(t)) ? 1 : -1;
  } }, _getObjName: function(i) {
    return "grid_" + i;
  }, _getViewName: function(i) {
    return i.replace(/^grid_/, "");
  } }, e.createGridView = function(i) {
    var t = i.name || "grid", a = e._grid._getObjName(t);
    function s(d) {
      return !(d !== void 0 && (1 * d != d || d < 0));
    }
    e._grid.names[t] = t, e.config[t + "_start"] = i.from || /* @__PURE__ */ new Date(0), e.config[t + "_end"] = i.to || new Date(9999, 1, 1), e[a] = i, e[a].defPadding = 8, e[a].columns = e[a].fields, e[a].unit = i.unit || "month", e[a].step = i.step || 1, delete e[a].fields;
    for (var n = e[a].columns, _ = 0; _ < n.length; _++)
      s(n[_].width) && (n[_].initialWidth = n[_].width), s(n[_].paddingLeft) || delete n[_].paddingLeft, s(n[_].paddingRight) || delete n[_].paddingRight;
    e[a].select = i.select === void 0 || i.select, e.locale.labels[t + "_tab"] === void 0 && (e.locale.labels[t + "_tab"] = e[a].label || e.locale.labels.grid_tab), e[a]._selected_divs = [], e.date[t + "_start"] = function(d) {
      return e.date[i.unit + "_start"] ? e.date[i.unit + "_start"](d) : d;
    }, e.date["add_" + t] = function(d, r) {
      return e.date.add(d, r * e[a].step, e[a].unit);
    }, e.templates[t + "_date"] = function(d, r) {
      return e.config.rtl ? e.templates.day_date(r) + " - " + e.templates.day_date(d) : e.templates.day_date(d) + " - " + e.templates.day_date(r);
    }, e.templates[t + "_full_date"] = function(d, r, o) {
      return e.isOneDayEvent(o) ? this[t + "_single_date"](d) : e.config.rtl ? e.templates.day_date(r) + " &ndash; " + e.templates.day_date(d) : e.templates.day_date(d) + " &ndash; " + e.templates.day_date(r);
    }, e.templates[t + "_single_date"] = function(d) {
      return e.templates.day_date(d) + " " + this.event_date(d);
    }, e.templates[t + "_field"] = function(d, r) {
      return r[d];
    }, e.attachEvent("onTemplatesReady", function() {
      e.attachEvent("onEventSelected", function(o) {
        if (this._mode == t && e[a].select)
          return e._grid.selectEvent(o, t), !1;
      }), e.attachEvent("onEventUnselected", function(o) {
        this._mode == t && e[a].select && e._grid.unselectEvent("", t);
      });
      var d = e.render_data;
      e.render_data = function(o) {
        if (this._mode != t)
          return d.apply(this, arguments);
        e._grid._fill_grid_tab(a);
      };
      var r = e.render_view_data;
      e.render_view_data = function() {
        var o = e._els.dhx_cal_data[0].lastChild;
        return this._mode == t && o && (e._grid._gridScrollTop = o.scrollTop), r.apply(this, arguments);
      };
    }), e[t + "_view"] = function(d) {
      if (e._grid._sort_marker = null, delete e._gridView, e._grid._gridScrollTop = 0, e._rendered = [], e[a]._selected_divs = [], d) {
        var r = null, o = null;
        e[a].paging ? (r = e.date[t + "_start"](new Date(e._date)), o = e.date["add_" + t](r, 1)) : (r = e.config[t + "_start"], o = e.config[t + "_end"]), e._min_date = r, e._max_date = o, e._grid.set_full_view(a);
        var c = "";
        +r > +/* @__PURE__ */ new Date(0) && +o < +new Date(9999, 1, 1) && (c = e.templates[t + "_date"](r, o));
        var h = e._getNavDateElement();
        h && (h.innerHTML = c), e._gridView = a;
      }
    };
  }, e.dblclick_dhx_grid_area = function() {
    !this.config.readonly && this.config.dblclick_create && this.addEventNow();
  }, e._click.dhx_cal_header && (e._old_header_click = e._click.dhx_cal_header), e._click.dhx_cal_header = function(i) {
    if (e._gridView) {
      var t = i || window.event, a = e._grid._get_target_column(t, e._gridView);
      e._grid._toggle_sort_state(e._gridView, a.id), e.clear_view(), e._grid._fill_grid_tab(e._gridView);
    } else if (e._old_header_click)
      return e._old_header_click.apply(this, arguments);
  }, e._grid.selectEvent = function(i, t) {
    if (e.callEvent("onBeforeRowSelect", [i])) {
      var a = e._grid._getObjName(t);
      e.for_rendered(i, function(s) {
        s.classList.add("dhx_grid_event_selected"), e[a]._selected_divs.push(s);
      });
    }
  }, e._grid._unselectDiv = function(i) {
    i.className = i.classList.remove("dhx_grid_event_selected");
  }, e._grid.unselectEvent = function(i, t) {
    var a = e._grid._getObjName(t);
    if (a && e[a]._selected_divs)
      if (i) {
        for (s = 0; s < e[a]._selected_divs.length; s++)
          if (e[a]._selected_divs[s].getAttribute(e.config.event_attribute) == i) {
            e._grid._unselectDiv(e[a]._selected_divs[s]), e[a]._selected_divs.slice(s, 1);
            break;
          }
      } else {
        for (var s = 0; s < e[a]._selected_divs.length; s++)
          e._grid._unselectDiv(e[a]._selected_divs[s]);
        e[a]._selected_divs = [];
      }
  }, e._grid._get_target_column = function(i, t) {
    var a = i.originalTarget || i.srcElement;
    e._getClassName(a) == "dhx_grid_view_sort" && (a = a.parentNode);
    for (var s = 0, n = 0; n < a.parentNode.childNodes.length; n++)
      if (a.parentNode.childNodes[n] == a) {
        s = n;
        break;
      }
    return e[t].columns[s];
  }, e._grid._get_sort_state = function(i) {
    return e[i].sort;
  }, e._grid._toggle_sort_state = function(i, t) {
    var a = this._get_sort_state(i), s = e[i];
    a && a.column == t ? a.direction = a.direction == "asc" ? "desc" : "asc" : s.sort = { column: t, direction: "desc" };
  }, e._grid._get_sort_value_for_column = function(i) {
    var t = null;
    if (i.template) {
      var a = i.template;
      t = function(n) {
        return a(n.start_date, n.end_date, n);
      };
    } else {
      var s = i.id;
      s == "date" && (s = "start_date"), t = function(n) {
        return n[s];
      };
    }
    return t;
  }, e._grid.draw_sort_marker = function(i, t) {
    if (e._grid._sort_marker && (e._grid._sort_marker.className = e._grid._sort_marker.className.replace(/( )?dhx_grid_sort_(asc|desc)/, ""), e._grid._sort_marker.removeChild(e._grid._sort_marker.lastChild)), t) {
      var a = e._grid._get_column_node(i, t.column);
      a.className += " dhx_grid_sort_" + t.direction, e._grid._sort_marker = a;
      var s = "<div class='dhx_grid_view_sort' style='left:" + (+a.style.width.replace("px", "") - 15 + a.offsetLeft) + "px'>&nbsp;</div>";
      a.innerHTML += s;
    }
  }, e._grid.sort_grid = function(i) {
    i = i || { direction: "desc", value: function(a) {
      return a.start_date;
    }, rule: e._grid.sort_rules.date };
    var t = e.get_visible_events();
    return t.sort(function(a, s) {
      return i.rule(a, s, i.value);
    }), i.direction == "asc" && (t = t.reverse()), t;
  }, e._grid.set_full_view = function(i) {
    if (i) {
      var t = e._grid._print_grid_header(i);
      e._els.dhx_cal_header[0].innerHTML = t, e._table_view = !0, e.set_sizes();
    }
  }, e._grid._calcPadding = function(i, t) {
    return (i.paddingLeft !== void 0 ? 1 * i.paddingLeft : e[t].defPadding) + (i.paddingRight !== void 0 ? 1 * i.paddingRight : e[t].defPadding);
  }, e._grid._getStyles = function(i, t) {
    for (var a = [], s = "", n = 0; t[n]; n++)
      switch (s = t[n] + ":", t[n]) {
        case "text-align":
          i.align && a.push(s + i.align);
          break;
        case "vertical-align":
          i.valign && a.push(s + i.valign);
          break;
        case "padding-left":
          i.paddingLeft !== void 0 && a.push(s + (i.paddingLeft || "0") + "px");
          break;
        case "padding-right":
          i.paddingRight !== void 0 && a.push(s + (i.paddingRight || "0") + "px");
      }
    return a;
  }, e._grid._get_column_node = function(i, t) {
    for (var a = -1, s = 0; s < i.length; s++)
      if (i[s].id == t) {
        a = s;
        break;
      }
    return a < 0 ? null : e._obj.querySelectorAll(".dhx_grid_line > div")[a];
  }, e._grid._get_sort_rule = function(i) {
    var t, a = e[i], s = this._get_sort_state(i);
    if (s) {
      for (var n, _ = 0; _ < a.columns.length; _++)
        if (a.columns[_].id == s.column) {
          n = a.columns[_];
          break;
        }
      if (n) {
        var d = e._grid._get_sort_value_for_column(n), r = n.sort;
        typeof r != "function" && (r = e._grid.sort_rules[r] || e._grid.sort_rules.str), t = { direction: s.direction, rule: r, value: d };
      }
    }
    return t;
  }, e._grid._fill_grid_tab = function(i) {
    var t = e[i], a = this._get_sort_state(i), s = this._get_sort_rule(i);
    s && e._grid.draw_sort_marker(t.columns, a);
    for (var n = e._grid.sort_grid(s), _ = e[i].columns, d = "<div>", r = -1, o = 0; o < _.length; o++)
      r += _[o].width, o < _.length - 1 && (d += "<div class='dhx_grid_v_border' style='" + (e.config.rtl ? "right" : "left") + ":" + r + "px'></div>");
    for (d += "</div>", d += "<div class='dhx_grid_area'><table " + e._waiAria.gridAttrString() + ">", o = 0; o < n.length; o++)
      d += e._grid._print_event_row(n[o], i);
    d += "</table></div>", e._els.dhx_cal_data[0].innerHTML = d, e._els.dhx_cal_data[0].lastChild.scrollTop = e._grid._gridScrollTop || 0;
    var c = e._els.dhx_cal_data[0].getElementsByTagName("tr");
    for (e._rendered = [], o = 0; o < c.length; o++)
      e._rendered[o] = c[o];
  }, e._grid._getCellContent = function(i, t) {
    var a = e.getState().mode;
    return t.template ? t.template(i.start_date, i.end_date, i) : t.id == "date" ? e.templates[a + "_full_date"](i.start_date, i.end_date, i) : t.id == "start_date" || t.id == "end_date" ? e.templates[a + "_single_date"](i[t.id]) : e.templates[a + "_field"](t.id, i);
  }, e._grid._print_event_row = function(i, t) {
    var a = [];
    i.color && a.push("--dhx-scheduler-event-background:" + i.color), i.textColor && a.push("--dhx-scheduler-event-color:" + i.textColor), i._text_style && a.push(i._text_style), e[t].rowHeight && a.push("height:" + e[t].rowHeight + "px");
    var s = "";
    a.length && (s = "style='" + a.join(";") + "'");
    var n = e[t].columns, _ = e.templates.event_class(i.start_date, i.end_date, i);
    e.getState().select_id == i.id && (_ += " dhx_grid_event_selected");
    for (var d = "<tr " + e._waiAria.gridRowAttrString(i) + " class='dhx_grid_event" + (_ ? " " + _ : "") + "' event_id='" + i.id + "' " + e.config.event_attribute + "='" + i.id + "' " + s + ">", r = ["text-align", "vertical-align", "padding-left", "padding-right"], o = 0; o < n.length; o++) {
      var c = e._grid._getCellContent(i, n[o]), h = e._waiAria.gridCellAttrString(i, n[o], c), y = e._grid._getStyles(n[o], r), b = n[o].css ? ' class="' + n[o].css + '"' : "";
      d += "<td " + h + " style='width:" + n[o].width + "px;" + y.join(";") + "' " + b + ">" + c + "</td>";
    }
    return d += "<td class='dhx_grid_dummy'></td></tr>";
  }, e._grid._print_grid_header = function(i) {
    for (var t = "<div class='dhx_grid_line'>", a = e[i].columns, s = [], n = a.length, _ = e._obj.clientWidth - 2 * a.length - 20, d = 0; d < a.length; d++) {
      var r = 1 * a[d].initialWidth;
      isNaN(r) || a[d].initialWidth === "" || a[d].initialWidth === null || typeof a[d].initialWidth == "boolean" ? s[d] = null : (n--, _ -= r, s[d] = r);
    }
    for (var o = Math.floor(_ / n), c = ["text-align", "padding-left", "padding-right"], h = 0; h < a.length; h++) {
      var y = s[h] ? s[h] : o;
      a[h].width = y;
      var b = e._grid._getStyles(a[h], c);
      t += "<div class='dhx_grid_column_label' style='line-height: " + e.xy.scale_height + "px;width:" + a[h].width + "px;" + b.join(";") + "'>" + (a[h].label === void 0 ? a[h].id : a[h].label) + "</div>";
    }
    return t += "</div>";
  };
}, html_templates: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    for (var i = document.body.getElementsByTagName("DIV"), t = 0; t < i.length; t++) {
      var a = i[t].className || "";
      if ((a = a.split(":")).length == 2 && a[0] == "template") {
        var s = 'return "' + (i[t].innerHTML || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\n\r]+/g, "") + '";';
        s = unescape(s).replace(/\{event\.([a-z]+)\}/g, function(n, _) {
          return '"+ev.' + _ + '+"';
        }), e.templates[a[1]] = Function("start", "end", "ev", s), i[t].style.display = "none";
      }
    }
  });
}, key_nav: function(e) {
  function i(t) {
    var a = { minicalButton: e.$keyboardNavigation.MinicalButton, minicalDate: e.$keyboardNavigation.MinicalCell, scheduler: e.$keyboardNavigation.SchedulerNode, dataArea: e.$keyboardNavigation.DataArea, timeSlot: e.$keyboardNavigation.TimeSlot, event: e.$keyboardNavigation.Event }, s = {};
    for (var n in a)
      s[n.toLowerCase()] = a[n];
    return s[t = (t + "").toLowerCase()] || a.scheduler;
  }
  e.config.key_nav = !0, e.config.key_nav_step = 30, e.addShortcut = function(t, a, s) {
    var n = i(s);
    n && n.prototype.bind(t, a);
  }, e.getShortcutHandler = function(t, a) {
    var s = i(a);
    if (s) {
      var n = e.$keyboardNavigation.shortcuts.parse(t);
      if (n.length)
        return s.prototype.findHandler(n[0]);
    }
  }, e.removeShortcut = function(t, a) {
    var s = i(a);
    s && s.prototype.unbind(t);
  }, e.focus = function() {
    if (e.config.key_nav) {
      var t = e.$keyboardNavigation.dispatcher;
      t.enable();
      var a = t.getActiveNode();
      !a || a instanceof e.$keyboardNavigation.MinicalButton || a instanceof e.$keyboardNavigation.MinicalCell ? t.setDefaultNode() : t.focusNode(t.getActiveNode());
    }
  }, e.$keyboardNavigation = {}, e._compose = function() {
    for (var t = Array.prototype.slice.call(arguments, 0), a = {}, s = 0; s < t.length; s++) {
      var n = t[s];
      for (var _ in typeof n == "function" && (n = new n()), n)
        a[_] = n[_];
    }
    return a;
  }, function(t) {
    t.$keyboardNavigation.shortcuts = { createCommand: function() {
      return { modifiers: { shift: !1, alt: !1, ctrl: !1, meta: !1 }, keyCode: null };
    }, parse: function(a) {
      for (var s = [], n = this.getExpressions(this.trim(a)), _ = 0; _ < n.length; _++) {
        for (var d = this.getWords(n[_]), r = this.createCommand(), o = 0; o < d.length; o++)
          this.commandKeys[d[o]] ? r.modifiers[d[o]] = !0 : this.specialKeys[d[o]] ? r.keyCode = this.specialKeys[d[o]] : r.keyCode = d[o].charCodeAt(0);
        s.push(r);
      }
      return s;
    }, getCommandFromEvent: function(a) {
      var s = this.createCommand();
      s.modifiers.shift = !!a.shiftKey, s.modifiers.alt = !!a.altKey, s.modifiers.ctrl = !!a.ctrlKey, s.modifiers.meta = !!a.metaKey, s.keyCode = a.which || a.keyCode, s.keyCode >= 96 && s.keyCode <= 105 && (s.keyCode -= 48);
      var n = String.fromCharCode(s.keyCode);
      return n && (s.keyCode = n.toLowerCase().charCodeAt(0)), s;
    }, getHashFromEvent: function(a) {
      return this.getHash(this.getCommandFromEvent(a));
    }, getHash: function(a) {
      var s = [];
      for (var n in a.modifiers)
        a.modifiers[n] && s.push(n);
      return s.push(a.keyCode), s.join(this.junctionChar);
    }, getExpressions: function(a) {
      return a.split(this.junctionChar);
    }, getWords: function(a) {
      return a.split(this.combinationChar);
    }, trim: function(a) {
      return a.replace(/\s/g, "");
    }, junctionChar: ",", combinationChar: "+", commandKeys: { shift: 16, alt: 18, ctrl: 17, meta: !0 }, specialKeys: { backspace: 8, tab: 9, enter: 13, esc: 27, space: 32, up: 38, down: 40, left: 37, right: 39, home: 36, end: 35, pageup: 33, pagedown: 34, delete: 46, insert: 45, plus: 107, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123 } };
  }(e), function(t) {
    t.$keyboardNavigation.EventHandler = { _handlers: null, findHandler: function(a) {
      this._handlers || (this._handlers = {});
      var s = t.$keyboardNavigation.shortcuts.getHash(a);
      return this._handlers[s];
    }, doAction: function(a, s) {
      var n = this.findHandler(a);
      n && (n.call(this, s), s.preventDefault ? s.preventDefault() : s.returnValue = !1);
    }, bind: function(a, s) {
      this._handlers || (this._handlers = {});
      for (var n = t.$keyboardNavigation.shortcuts, _ = n.parse(a), d = 0; d < _.length; d++)
        this._handlers[n.getHash(_[d])] = s;
    }, unbind: function(a) {
      for (var s = t.$keyboardNavigation.shortcuts, n = s.parse(a), _ = 0; _ < n.length; _++)
        this._handlers[s.getHash(n[_])] && delete this._handlers[s.getHash(n[_])];
    }, bindAll: function(a) {
      for (var s in a)
        this.bind(s, a[s]);
    }, initKeys: function() {
      this._handlers || (this._handlers = {}), this.keys && this.bindAll(this.keys);
    } };
  }(e), function(t) {
    t.$keyboardNavigation.getFocusableNodes = t._getFocusableNodes, t.$keyboardNavigation.trapFocus = function(a, s) {
      if (s.keyCode != 9)
        return !1;
      for (var n, _ = t.$keyboardNavigation.getFocusableNodes(a), d = document.activeElement, r = -1, o = 0; o < _.length; o++)
        if (_[o] == d) {
          r = o;
          break;
        }
      if (s.shiftKey) {
        if (n = _[r <= 0 ? _.length - 1 : r - 1])
          return n.focus(), s.preventDefault(), !0;
      } else if (n = _[r >= _.length - 1 ? 0 : r + 1])
        return n.focus(), s.preventDefault(), !0;
      return !1;
    };
  }(e), function(t) {
    t.$keyboardNavigation.marker = { clear: function() {
      for (var a = t.$container.querySelectorAll(".dhx_focus_slot"), s = 0; s < a.length; s++)
        a[s].parentNode.removeChild(a[s]);
    }, createElement: function() {
      var a = document.createElement("div");
      return a.setAttribute("tabindex", -1), a.className = "dhx_focus_slot", a;
    }, renderMultiple: function(a, s, n) {
      for (var _ = [], d = new Date(a), r = new Date(Math.min(s.valueOf(), t.date.add(t.date.day_start(new Date(a)), 1, "day").valueOf())); d.valueOf() < s.valueOf(); )
        _ = _.concat(n.call(this, d, new Date(Math.min(r.valueOf(), s.valueOf())))), d = t.date.day_start(t.date.add(d, 1, "day")), r = t.date.day_start(t.date.add(d, 1, "day")), r = new Date(Math.min(r.valueOf(), s.valueOf()));
      return _;
    }, render: function(a, s, n) {
      this.clear();
      var _ = [], d = t.$keyboardNavigation.TimeSlot.prototype._modes;
      switch (t.$keyboardNavigation.TimeSlot.prototype._getMode()) {
        case d.units:
          _ = this.renderVerticalMarker(a, s, n);
          break;
        case d.timeline:
          _ = this.renderTimelineMarker(a, s, n);
          break;
        case d.year:
          _ = _.concat(this.renderMultiple(a, s, this.renderYearMarker));
          break;
        case d.month:
          _ = this.renderMonthMarker(a, s);
          break;
        case d.weekAgenda:
          _ = _.concat(this.renderMultiple(a, s, this.renderWeekAgendaMarker));
          break;
        case d.list:
          _ = this.renderAgendaMarker(a, s);
          break;
        case d.dayColumns:
          _ = _.concat(this.renderMultiple(a, s, this.renderVerticalMarker));
      }
      this.addWaiAriaLabel(_, a, s, n), this.addDataAttributes(_, a, s, n);
      for (var r = _.length - 1; r >= 0; r--)
        if (_[r].offsetWidth)
          return _[r];
      return null;
    }, addDataAttributes: function(a, s, n, _) {
      for (var d = t.date.date_to_str(t.config.api_date), r = d(s), o = d(n), c = 0; c < a.length; c++)
        a[c].setAttribute("data-start-date", r), a[c].setAttribute("data-end-date", o), _ && a[c].setAttribute("data-section", _);
    }, addWaiAriaLabel: function(a, s, n, _) {
      var d = "", r = t.getState().mode, o = !1;
      if (d += t.templates.day_date(s), t.date.day_start(new Date(s)).valueOf() != s.valueOf() && (d += " " + t.templates.hour_scale(s), o = !0), t.date.day_start(new Date(s)).valueOf() != t.date.day_start(new Date(n)).valueOf() && (d += " - " + t.templates.day_date(n), (o || t.date.day_start(new Date(n)).valueOf() != n.valueOf()) && (d += " " + t.templates.hour_scale(n))), _) {
        if (t.matrix && t.matrix[r]) {
          const h = t.matrix[r], y = h.y_unit[h.order[_]];
          d += ", " + t.templates[r + "_scale_label"](y.key, y.label, y);
        } else if (t._props && t._props[r]) {
          const h = t._props[r], y = h.options[h.order[_]];
          d += ", " + t.templates[r + "_scale_text"](y.key, y.label, y);
        }
      }
      for (var c = 0; c < a.length; c++)
        t._waiAria.setAttributes(a[c], { "aria-label": d, "aria-live": "polite" });
    }, renderWeekAgendaMarker: function(a, s) {
      for (var n = t.$container.querySelectorAll(".dhx_wa_day_cont .dhx_wa_scale_bar"), _ = t.date.week_start(new Date(t.getState().min_date)), d = -1, r = t.date.day_start(new Date(a)), o = 0; o < n.length && (d++, t.date.day_start(new Date(_)).valueOf() != r.valueOf()); o++)
        _ = t.date.add(_, 1, "day");
      return d != -1 ? this._wrapDiv(n[d]) : [];
    }, _wrapDiv: function(a) {
      var s = this.createElement();
      return s.style.top = a.offsetTop + "px", s.style.left = a.offsetLeft + "px", s.style.width = a.offsetWidth + "px", s.style.height = a.offsetHeight + "px", a.appendChild(s), [s];
    }, renderYearMarker: function(a, s) {
      var n = t._get_year_cell(a);
      n.style.position = "relative";
      var _ = this.createElement();
      return _.style.top = "0px", _.style.left = "0px", _.style.width = "100%", _.style.height = "100%", n.appendChild(_), [_];
    }, renderAgendaMarker: function(a, s) {
      var n = this.createElement();
      return n.style.height = "1px", n.style.width = "100%", n.style.opacity = 1, n.style.top = "0px", n.style.left = "0px", t.$container.querySelector(".dhx_cal_data").appendChild(n), [n];
    }, renderTimelineMarker: function(a, s, n) {
      var _ = t._lame_copy({}, t.matrix[t._mode]), d = _._scales;
      _.round_position = !1;
      var r = [], o = a ? new Date(a) : t._min_date, c = s ? new Date(s) : t._max_date;
      if (o.valueOf() < t._min_date.valueOf() && (o = new Date(t._min_date)), c.valueOf() > t._max_date.valueOf() && (c = new Date(t._max_date)), !_._trace_x)
        return r;
      for (var h = 0; h < _._trace_x.length && !t._is_column_visible(_._trace_x[h]); h++)
        ;
      if (h == _._trace_x.length)
        return r;
      var y = d[n];
      if (!(o < s && c > a))
        return r;
      var b = this.createElement();
      let p, u;
      function m(w, E) {
        E.setDate(1), E.setFullYear(w.getFullYear()), E.setMonth(w.getMonth()), E.setDate(w.getDate());
      }
      if (t.getView().days) {
        const w = new Date(a);
        m(t._min_date, w);
        const E = new Date(s);
        m(t._min_date, E), p = t._timeline_getX({ start_date: w }, !1, _), u = t._timeline_getX({ start_date: E }, !1, _);
      } else
        p = t._timeline_getX({ start_date: a }, !1, _), u = t._timeline_getX({ start_date: s }, !1, _);
      var l = _._section_height[n] - 1 || _.dy - 1, f = 0;
      t._isRender("cell") && (f = y.offsetTop, p += _.dx, u += _.dx, y = t.$container.querySelector(".dhx_cal_data"));
      var g = Math.max(1, u - p - 1);
      let x = "left";
      return t.config.rtl && (x = "right"), b.style.cssText = `height:${l}px; ${x}:${p}px; width:${g}px; top:${f}px;`, y && (y.appendChild(b), r.push(b)), r;
    }, renderMonthCell: function(a) {
      for (var s = t.$container.querySelectorAll(".dhx_month_head"), n = [], _ = 0; _ < s.length; _++)
        n.push(s[_].parentNode);
      var d = -1, r = 0, o = -1, c = t.date.week_start(new Date(t.getState().min_date)), h = t.date.day_start(new Date(a));
      for (_ = 0; _ < n.length && (d++, o == 6 ? (r++, o = 0) : o++, t.date.day_start(new Date(c)).valueOf() != h.valueOf()); _++)
        c = t.date.add(c, 1, "day");
      if (d == -1)
        return [];
      var y = t._colsS[o], b = t._colsS.heights[r], p = this.createElement();
      p.style.top = b + "px", p.style.left = y + "px", p.style.width = t._cols[o] + "px", p.style.height = (t._colsS.heights[r + 1] - b || t._colsS.height) + "px";
      var u = t.$container.querySelector(".dhx_cal_data"), m = u.querySelector(".dhx_cal_month_table");
      return m.nextSibling ? u.insertBefore(p, m.nextSibling) : u.appendChild(p), p;
    }, renderMonthMarker: function(a, s) {
      for (var n = [], _ = a; _.valueOf() < s.valueOf(); )
        n.push(this.renderMonthCell(_)), _ = t.date.add(_, 1, "day");
      return n;
    }, renderVerticalMarker: function(a, s, n) {
      var _ = t.locate_holder_day(a), d = [], r = null, o = t.config;
      if (t._ignores[_])
        return d;
      if (t._props && t._props[t._mode] && n) {
        var c = t._props[t._mode];
        _ = c.order[n];
        var h = c.order[n];
        c.days > 1 ? _ = t.locate_holder_day(a) + h : (_ = h, c.size && _ > c.position + c.size && (_ = 0));
      }
      if (!(r = t.locate_holder(_)) || r.querySelector(".dhx_scale_hour"))
        return document.createElement("div");
      var y = Math.max(60 * a.getHours() + a.getMinutes(), 60 * o.first_hour), b = Math.min(60 * s.getHours() + s.getMinutes(), 60 * o.last_hour);
      if (!b && t.date.day_start(new Date(s)).valueOf() > t.date.day_start(new Date(a)).valueOf() && (b = 60 * o.last_hour), b <= y)
        return [];
      var p = this.createElement(), u = t.config.hour_size_px * o.last_hour + 1, m = 36e5;
      return p.style.top = Math.round((60 * y * 1e3 - t.config.first_hour * m) * t.config.hour_size_px / m) % u + "px", p.style.lineHeight = p.style.height = Math.max(Math.round(60 * (b - y) * 1e3 * t.config.hour_size_px / m) % u, 1) + "px", p.style.width = "100%", r.appendChild(p), d.push(p), d[0];
    } };
  }(e), function(t) {
    t.$keyboardNavigation.SchedulerNode = function() {
    }, t.$keyboardNavigation.SchedulerNode.prototype = t._compose(t.$keyboardNavigation.EventHandler, { getDefaultNode: function() {
      var a = new t.$keyboardNavigation.TimeSlot();
      return a.isValid() || (a = a.fallback()), a;
    }, _modes: { month: "month", year: "year", dayColumns: "dayColumns", timeline: "timeline", units: "units", weekAgenda: "weekAgenda", list: "list" }, getMode: function() {
      var a = t.getState().mode;
      return t.matrix && t.matrix[a] ? this._modes.timeline : t._props && t._props[a] ? this._modes.units : a == "month" ? this._modes.month : a == "year" ? this._modes.year : a == "week_agenda" ? this._modes.weekAgenda : a == "map" || a == "agenda" || t._grid && t["grid_" + a] ? this._modes.list : this._modes.dayColumns;
    }, focus: function() {
      t.focus();
    }, blur: function() {
    }, disable: function() {
      t.$container.setAttribute("tabindex", "0");
    }, enable: function() {
      t.$container && t.$container.removeAttribute("tabindex");
    }, isEnabled: function() {
      return t.$container.hasAttribute("tabindex");
    }, _compareEvents: function(a, s) {
      return a.start_date.valueOf() == s.start_date.valueOf() ? a.id > s.id ? 1 : -1 : a.start_date.valueOf() > s.start_date.valueOf() ? 1 : -1;
    }, _pickEvent: function(a, s, n, _) {
      var d = t.getState();
      a = new Date(Math.max(d.min_date.valueOf(), a.valueOf())), s = new Date(Math.min(d.max_date.valueOf(), s.valueOf()));
      var r = t.getEvents(a, s);
      r.sort(this._compareEvents), _ && (r = r.reverse());
      for (var o = !!n, c = 0; c < r.length && o; c++)
        r[c].id == n && (o = !1), r.splice(c, 1), c--;
      for (c = 0; c < r.length; c++)
        if (new t.$keyboardNavigation.Event(r[c].id).getNode())
          return r[c];
      return null;
    }, nextEventHandler: function(a) {
      var s = t.$keyboardNavigation.dispatcher.activeNode, n = a || s && s.eventId, _ = null;
      if (n && t.getEvent(n)) {
        var d = t.getEvent(n);
        _ = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(d.start_date, t.date.add(d.start_date, 1, "year"), d.id, !1);
      }
      if (!_ && !a) {
        var r = t.getState();
        _ = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(r.min_date, t.date.add(r.min_date, 1, "year"), null, !1);
      }
      if (_) {
        var o = new t.$keyboardNavigation.Event(_.id);
        o.isValid() ? (s && s.blur(), t.$keyboardNavigation.dispatcher.setActiveNode(o)) : this.nextEventHandler(_.id);
      }
    }, prevEventHandler: function(a) {
      var s = t.$keyboardNavigation.dispatcher.activeNode, n = a || s && s.eventId, _ = null;
      if (n && t.getEvent(n)) {
        var d = t.getEvent(n);
        _ = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(t.date.add(d.end_date, -1, "year"), d.end_date, d.id, !0);
      }
      if (!_ && !a) {
        var r = t.getState();
        _ = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(t.date.add(r.max_date, -1, "year"), r.max_date, null, !0);
      }
      if (_) {
        var o = new t.$keyboardNavigation.Event(_.id);
        o.isValid() ? (s && s.blur(), t.$keyboardNavigation.dispatcher.setActiveNode(o)) : this.prevEventHandler(_.id);
      }
    }, keys: { "alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9": function(a) {
      var s = t.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab"), n = a.key;
      n === void 0 && (n = a.keyCode - 48), s[1 * n - 1] && s[1 * n - 1].click();
    }, "ctrl+left,meta+left": function(a) {
      t._click.dhx_cal_prev_button();
    }, "ctrl+right,meta+right": function(a) {
      t._click.dhx_cal_next_button();
    }, "ctrl+up,meta+up": function(a) {
      t.$container.querySelector(".dhx_cal_data").scrollTop -= 20;
    }, "ctrl+down,meta+down": function(a) {
      t.$container.querySelector(".dhx_cal_data").scrollTop += 20;
    }, e: function() {
      this.nextEventHandler();
    }, home: function() {
      t.setCurrentView(/* @__PURE__ */ new Date());
    }, "shift+e": function() {
      this.prevEventHandler();
    }, "ctrl+enter,meta+enter": function() {
      t.addEventNow({ start_date: new Date(t.getState().date) });
    }, "ctrl+c,meta+c": function(a) {
      t._key_nav_copy_paste(a);
    }, "ctrl+v,meta+v": function(a) {
      t._key_nav_copy_paste(a);
    }, "ctrl+x,meta+x": function(a) {
      t._key_nav_copy_paste(a);
    } } }), t.$keyboardNavigation.SchedulerNode.prototype.bindAll(t.$keyboardNavigation.SchedulerNode.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.KeyNavNode = function() {
    }, t.$keyboardNavigation.KeyNavNode.prototype = t._compose(t.$keyboardNavigation.EventHandler, { isValid: function() {
      return !0;
    }, fallback: function() {
      return null;
    }, moveTo: function(a) {
      t.$keyboardNavigation.dispatcher.setActiveNode(a);
    }, compareTo: function(a) {
      if (!a)
        return !1;
      for (var s in this) {
        if (!!this[s] != !!a[s])
          return !1;
        var n = !(!this[s] || !this[s].toString), _ = !(!a[s] || !a[s].toString);
        if (_ != n)
          return !1;
        if (_ && n) {
          if (a[s].toString() != this[s].toString())
            return !1;
        } else if (a[s] != this[s])
          return !1;
      }
      return !0;
    }, getNode: function() {
    }, focus: function() {
      var a = this.getNode();
      a && (a.setAttribute("tabindex", "-1"), a.focus && a.focus());
    }, blur: function() {
      var a = this.getNode();
      a && a.setAttribute("tabindex", "-1");
    } });
  }(e), function(t) {
    t.$keyboardNavigation.HeaderCell = function(a) {
      this.index = a || 0;
    }, t.$keyboardNavigation.HeaderCell.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { getNode: function(a) {
      a = a || this.index || 0;
      var s = this.getNodes();
      if (s[a])
        return s[a];
    }, getNodes: function(a) {
      a = a || [".dhx_cal_navline .dhx_cal_prev_button", ".dhx_cal_navline .dhx_cal_next_button", ".dhx_cal_navline .dhx_cal_today_button", ".dhx_cal_navline .dhx_cal_tab"].join(", ");
      var s = Array.prototype.slice.call(t.$container.querySelectorAll(a));
      return s.sort(function(n, _) {
        return n.offsetLeft - _.offsetLeft;
      }), s;
    }, _handlers: null, isValid: function() {
      return !!this.getNode(this.index);
    }, fallback: function() {
      var a = this.getNode(0);
      return a || (a = new t.$keyboardNavigation.TimeSlot()), a;
    }, keys: { left: function() {
      var a = this.index - 1;
      a < 0 && (a = this.getNodes().length - 1), this.moveTo(new t.$keyboardNavigation.HeaderCell(a));
    }, right: function() {
      var a = this.index + 1;
      a >= this.getNodes().length && (a = 0), this.moveTo(new t.$keyboardNavigation.HeaderCell(a));
    }, down: function() {
      this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, enter: function() {
      var a = this.getNode();
      a && a.click();
    } } }), t.$keyboardNavigation.HeaderCell.prototype.bindAll(t.$keyboardNavigation.HeaderCell.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.Event = function(a) {
      if (this.eventId = null, t.getEvent(a)) {
        var s = t.getEvent(a);
        this.start = new Date(s.start_date), this.end = new Date(s.end_date), this.section = this._getSection(s), this.eventId = a;
      }
    }, t.$keyboardNavigation.Event.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { _getNodes: function() {
      return Array.prototype.slice.call(t.$container.querySelectorAll("[" + t.config.event_attribute + "]"));
    }, _modes: t.$keyboardNavigation.SchedulerNode.prototype._modes, getMode: t.$keyboardNavigation.SchedulerNode.prototype.getMode, _handlers: null, isValid: function() {
      return !(!t.getEvent(this.eventId) || !this.getNode());
    }, fallback: function() {
      var a = this._getNodes()[0], s = null;
      if (a && t._locate_event(a)) {
        var n = t._locate_event(a);
        s = new t.$keyboardNavigation.Event(n);
      } else
        s = new t.$keyboardNavigation.TimeSlot();
      return s;
    }, isScrolledIntoView: function(a) {
      var s = a.getBoundingClientRect(), n = t.$container.querySelector(".dhx_cal_data").getBoundingClientRect();
      return !(s.bottom < n.top || s.top > n.bottom);
    }, getNode: function() {
      var a = "[" + t.config.event_attribute + "='" + this.eventId + "']", s = t.$keyboardNavigation.dispatcher.getInlineEditor(this.eventId);
      if (s)
        return s;
      if (t.isMultisectionEvent && t.isMultisectionEvent(t.getEvent(this.eventId))) {
        for (var n = t.$container.querySelectorAll(a), _ = 0; _ < n.length; _++)
          if (this.isScrolledIntoView(n[_]))
            return n[_];
        return n[0];
      }
      return t.$container.querySelector(a);
    }, focus: function() {
      var a = t.getEvent(this.eventId), s = t.getState();
      (a.start_date.valueOf() > s.max_date.valueOf() || a.end_date.valueOf() <= s.min_date.valueOf()) && t.setCurrentView(a.start_date);
      var n = this.getNode();
      this.isScrolledIntoView(n) ? t.$keyboardNavigation.dispatcher.keepScrollPosition((function() {
        t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
      }).bind(this)) : t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getSection: function(a) {
      var s = null, n = t.getState().mode;
      return t.matrix && t.matrix[n] ? s = a[t.matrix[t.getState().mode].y_property] : t._props && t._props[n] && (s = a[t._props[n].map_to]), s;
    }, _moveToSlot: function(a) {
      var s = t.getEvent(this.eventId);
      if (s) {
        var n = this._getSection(s), _ = new t.$keyboardNavigation.TimeSlot(s.start_date, null, n);
        this.moveTo(_.nextSlot(_, a));
      } else
        this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, keys: { left: function() {
      this._moveToSlot("left");
    }, right: function() {
      this._moveToSlot("right");
    }, down: function() {
      this.getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler() : this._moveToSlot("down");
    }, space: function() {
      var a = this.getNode();
      a && a.click ? a.click() : this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, up: function() {
      this.getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler() : this._moveToSlot("up");
    }, delete: function() {
      t.getEvent(this.eventId) ? t._click.buttons.delete(this.eventId) : this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, enter: function() {
      t.getEvent(this.eventId) ? t.showLightbox(this.eventId) : this.moveTo(new t.$keyboardNavigation.TimeSlot());
    } } }), t.$keyboardNavigation.Event.prototype.bindAll(t.$keyboardNavigation.Event.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.TimeSlot = function(a, s, n, _) {
      var d = t.getState(), r = t.matrix && t.matrix[d.mode];
      a || (a = this.getDefaultDate()), s || (s = r ? t.date.add(a, r.x_step, r.x_unit) : t.date.add(a, t.config.key_nav_step, "minute")), this.section = n || this._getDefaultSection(), this.start_date = new Date(a), this.end_date = new Date(s), this.movingDate = _ || null;
    }, t.$keyboardNavigation.TimeSlot.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { _handlers: null, getDefaultDate: function() {
      var a, s = t.getState(), n = new Date(s.date);
      n.setSeconds(0), n.setMilliseconds(0);
      var _ = /* @__PURE__ */ new Date();
      _.setSeconds(0), _.setMilliseconds(0);
      var d = t.matrix && t.matrix[s.mode], r = !1;
      if (n.valueOf() === _.valueOf() && (r = !0), d)
        r ? (d.x_unit === "day" ? (_.setHours(0), _.setMinutes(0)) : d.x_unit === "hour" && _.setMinutes(0), a = _) : a = t.date[d.name + "_start"](new Date(s.date)), a = this.findVisibleColumn(a);
      else if (a = new Date(t.getState().min_date), r && (a = _), a = this.findVisibleColumn(a), r || a.setHours(t.config.first_hour), !t._table_view) {
        var o = t.$container.querySelector(".dhx_cal_data");
        o.scrollTop && a.setHours(t.config.first_hour + Math.ceil(o.scrollTop / t.config.hour_size_px));
      }
      return a;
    }, clone: function(a) {
      return new t.$keyboardNavigation.TimeSlot(a.start_date, a.end_date, a.section, a.movingDate);
    }, _getMultisectionView: function() {
      var a, s = t.getState();
      return t._props && t._props[s.mode] ? a = t._props[s.mode] : t.matrix && t.matrix[s.mode] && (a = t.matrix[s.mode]), a;
    }, _getDefaultSection: function() {
      var a = null;
      return this._getMultisectionView() && !a && (a = this._getNextSection()), a;
    }, _getNextSection: function(a, s) {
      var n = this._getMultisectionView(), _ = n.order[a], d = _;
      (d = _ !== void 0 ? _ + s : n.size && n.position ? n.position : 0) < 0 && (d = 0);
      var r = n.options || n.y_unit;
      return d >= r.length && (d = r.length - 1), r[d] ? r[d].key : null;
    }, isValid: function() {
      var a = t.getState();
      if (this.start_date.valueOf() < a.min_date.valueOf() || this.start_date.valueOf() >= a.max_date.valueOf() || !this.isVisible(this.start_date, this.end_date))
        return !1;
      var s = this._getMultisectionView();
      return !s || s.order[this.section] !== void 0;
    }, fallback: function() {
      var a = new t.$keyboardNavigation.TimeSlot();
      return a.isValid() ? a : new t.$keyboardNavigation.DataArea();
    }, getNodes: function() {
      return Array.prototype.slice.call(t.$container.querySelectorAll(".dhx_focus_slot"));
    }, getNode: function() {
      return this.getNodes()[0];
    }, focus: function() {
      this.section && t.getView() && t.getView().smart_rendering && t.getView().scrollTo && !t.$container.querySelector(`[data-section-id="${this.section}"]`) && t.getView().scrollTo({ section: this.section }), t.$keyboardNavigation.marker.render(this.start_date, this.end_date, this.section), t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this), t.$keyboardNavigation._pasteDate = this.start_date, t.$keyboardNavigation._pasteSection = this.section;
    }, blur: function() {
      t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this), t.$keyboardNavigation.marker.clear();
    }, _modes: t.$keyboardNavigation.SchedulerNode.prototype._modes, _getMode: t.$keyboardNavigation.SchedulerNode.prototype.getMode, addMonthDate: function(a, s, n) {
      var _;
      switch (s) {
        case "up":
          _ = t.date.add(a, -1, "week");
          break;
        case "down":
          _ = t.date.add(a, 1, "week");
          break;
        case "left":
          _ = t.date.day_start(t.date.add(a, -1, "day")), _ = this.findVisibleColumn(_, -1);
          break;
        case "right":
          _ = t.date.day_start(t.date.add(a, 1, "day")), _ = this.findVisibleColumn(_, 1);
          break;
        default:
          _ = t.date.day_start(new Date(a));
      }
      var d = t.getState();
      return (a.valueOf() < d.min_date.valueOf() || !n && a.valueOf() >= d.max_date.valueOf()) && (_ = new Date(d.min_date)), _;
    }, nextMonthSlot: function(a, s, n) {
      var _, d;
      return (_ = this.addMonthDate(a.start_date, s, n)).setHours(t.config.first_hour), (d = new Date(_)).setHours(t.config.last_hour), { start_date: _, end_date: d };
    }, _alignTimeSlot: function(a, s, n, _) {
      for (var d = new Date(s); d.valueOf() < a.valueOf(); )
        d = t.date.add(d, _, n);
      return d.valueOf() > a.valueOf() && (d = t.date.add(d, -_, n)), d;
    }, nextTimelineSlot: function(a, s, n) {
      var _ = t.getState(), d = t.matrix[_.mode], r = this._alignTimeSlot(a.start_date, t.date[d.name + "_start"](new Date(a.start_date)), d.x_unit, d.x_step), o = this._alignTimeSlot(a.end_date, t.date[d.name + "_start"](new Date(a.end_date)), d.x_unit, d.x_step);
      o.valueOf() <= r.valueOf() && (o = t.date.add(r, d.x_step, d.x_unit));
      var c = this.clone(a);
      switch (c.start_date = r, c.end_date = o, c.section = a.section || this._getNextSection(), s) {
        case "up":
          c.section = this._getNextSection(a.section, -1);
          break;
        case "down":
          c.section = this._getNextSection(a.section, 1);
          break;
        case "left":
          c.start_date = this.findVisibleColumn(t.date.add(c.start_date, -d.x_step, d.x_unit), -1), c.end_date = t.date.add(c.start_date, d.x_step, d.x_unit);
          break;
        case "right":
          c.start_date = this.findVisibleColumn(t.date.add(c.start_date, d.x_step, d.x_unit), 1), c.end_date = t.date.add(c.start_date, d.x_step, d.x_unit);
      }
      return (c.start_date.valueOf() < _.min_date.valueOf() || c.start_date.valueOf() >= _.max_date.valueOf()) && (n && c.start_date.valueOf() >= _.max_date.valueOf() ? c.start_date = new Date(_.max_date) : (c.start_date = t.date[_.mode + "_start"](t.date.add(_.date, s == "left" ? -1 : 1, _.mode)), c.end_date = t.date.add(c.start_date, d.x_step, d.x_unit))), c;
    }, nextUnitsSlot: function(a, s, n) {
      var _ = this.clone(a);
      _.section = a.section || this._getNextSection();
      var d = a.section || this._getNextSection(), r = t.getState(), o = t._props[r.mode];
      switch (s) {
        case "left":
          d = this._getNextSection(a.section, -1);
          var c = o.size ? o.size - 1 : o.options.length;
          o.days > 1 && o.order[d] == c - 1 && t.date.add(a.start_date, -1, "day").valueOf() >= r.min_date.valueOf() && (_ = this.nextDaySlot(a, s, n));
          break;
        case "right":
          d = this._getNextSection(a.section, 1), o.days > 1 && !o.order[d] && t.date.add(a.start_date, 1, "day").valueOf() < r.max_date.valueOf() && (_ = this.nextDaySlot(a, s, n));
          break;
        default:
          _ = this.nextDaySlot(a, s, n), d = a.section;
      }
      return _.section = d, _;
    }, _moveDate: function(a, s) {
      var n = this.findVisibleColumn(t.date.add(a, s, "day"), s);
      return n.setHours(a.getHours()), n.setMinutes(a.getMinutes()), n;
    }, isBeforeLastHour: function(a, s) {
      var n = a.getMinutes(), _ = a.getHours(), d = t.config.last_hour;
      return _ < d || !s && (d == 24 || _ == d) && !n;
    }, isAfterFirstHour: function(a, s) {
      var n = a.getMinutes(), _ = a.getHours(), d = t.config.first_hour, r = t.config.last_hour;
      return _ >= d || !s && !n && (!_ && r == 24 || _ == r);
    }, isInVisibleDayTime: function(a, s) {
      return this.isBeforeLastHour(a, s) && this.isAfterFirstHour(a, s);
    }, nextDaySlot: function(a, s, n) {
      var _, d, r = t.config.key_nav_step, o = this._alignTimeSlot(a.start_date, t.date.day_start(new Date(a.start_date)), "minute", r), c = a.start_date;
      switch (s) {
        case "up":
          if (_ = t.date.add(o, -r, "minute"), !this.isInVisibleDayTime(_, !0) && (!n || this.isInVisibleDayTime(c, !0))) {
            var h = !0;
            n && t.date.date_part(new Date(_)).valueOf() != t.date.date_part(new Date(c)).valueOf() && (h = !1), h && (_ = this.findVisibleColumn(t.date.add(a.start_date, -1, "day"), -1)), _.setHours(t.config.last_hour), _.setMinutes(0), _ = t.date.add(_, -r, "minute");
          }
          d = t.date.add(_, r, "minute");
          break;
        case "down":
          _ = t.date.add(o, r, "minute");
          var y = n ? _ : t.date.add(_, r, "minute");
          this.isInVisibleDayTime(y, !1) || n && !this.isInVisibleDayTime(c, !1) || (n ? (h = !0, t.date.date_part(new Date(c)).valueOf() == c.valueOf() && (h = !1), h && (_ = this.findVisibleColumn(t.date.add(a.start_date, 1, "day"), 1)), _.setHours(t.config.first_hour), _.setMinutes(0), _ = t.date.add(_, r, "minute")) : ((_ = this.findVisibleColumn(t.date.add(a.start_date, 1, "day"), 1)).setHours(t.config.first_hour), _.setMinutes(0))), d = t.date.add(_, r, "minute");
          break;
        case "left":
          _ = this._moveDate(a.start_date, -1), d = this._moveDate(a.end_date, -1);
          break;
        case "right":
          _ = this._moveDate(a.start_date, 1), d = this._moveDate(a.end_date, 1);
          break;
        default:
          _ = o, d = t.date.add(_, r, "minute");
      }
      return { start_date: _, end_date: d };
    }, nextWeekAgendaSlot: function(a, s) {
      var n, _, d = t.getState();
      switch (s) {
        case "down":
        case "left":
          n = t.date.day_start(t.date.add(a.start_date, -1, "day")), n = this.findVisibleColumn(n, -1);
          break;
        case "up":
        case "right":
          n = t.date.day_start(t.date.add(a.start_date, 1, "day")), n = this.findVisibleColumn(n, 1);
          break;
        default:
          n = t.date.day_start(a.start_date);
      }
      return (a.start_date.valueOf() < d.min_date.valueOf() || a.start_date.valueOf() >= d.max_date.valueOf()) && (n = new Date(d.min_date)), (_ = new Date(n)).setHours(t.config.last_hour), { start_date: n, end_date: _ };
    }, nextAgendaSlot: function(a, s) {
      return { start_date: a.start_date, end_date: a.end_date };
    }, isDateVisible: function(a) {
      if (!t._ignores_detected)
        return !0;
      var s, n = t.matrix && t.matrix[t.getState().mode];
      return s = n ? t._get_date_index(n, a) : t.locate_holder_day(a), !t._ignores[s];
    }, findVisibleColumn: function(a, s) {
      var n = a;
      s = s || 1;
      for (var _ = t.getState(); !this.isDateVisible(n) && (s > 0 && n.valueOf() <= _.max_date.valueOf() || s < 0 && n.valueOf() >= _.min_date.valueOf()); )
        n = this.nextDateColumn(n, s);
      return n;
    }, nextDateColumn: function(a, s) {
      s = s || 1;
      var n = t.matrix && t.matrix[t.getState().mode];
      return n ? t.date.add(a, s * n.x_step, n.x_unit) : t.date.day_start(t.date.add(a, s, "day"));
    }, isVisible: function(a, s) {
      if (!t._ignores_detected)
        return !0;
      for (var n = new Date(a); n.valueOf() < s.valueOf(); ) {
        if (this.isDateVisible(n))
          return !0;
        n = this.nextDateColumn(n);
      }
      return !1;
    }, nextSlot: function(a, s, n, _) {
      var d;
      n = n || this._getMode();
      var r = t.$keyboardNavigation.TimeSlot.prototype.clone(a);
      switch (n) {
        case this._modes.units:
          d = this.nextUnitsSlot(r, s, _);
          break;
        case this._modes.timeline:
          d = this.nextTimelineSlot(r, s, _);
          break;
        case this._modes.year:
        case this._modes.month:
          d = this.nextMonthSlot(r, s, _);
          break;
        case this._modes.weekAgenda:
          d = this.nextWeekAgendaSlot(r, s, _);
          break;
        case this._modes.list:
          d = this.nextAgendaSlot(r, s, _);
          break;
        case this._modes.dayColumns:
          d = this.nextDaySlot(r, s, _);
      }
      return d.start_date.valueOf() >= d.end_date.valueOf() && (d = this.nextSlot(d, s, n)), t.$keyboardNavigation.TimeSlot.prototype.clone(d);
    }, extendSlot: function(a, s) {
      var n;
      switch (this._getMode()) {
        case this._modes.units:
          n = s == "left" || s == "right" ? this.nextUnitsSlot(a, s) : this.extendUnitsSlot(a, s);
          break;
        case this._modes.timeline:
          n = s == "down" || s == "up" ? this.nextTimelineSlot(a, s) : this.extendTimelineSlot(a, s);
          break;
        case this._modes.year:
        case this._modes.month:
          n = this.extendMonthSlot(a, s);
          break;
        case this._modes.dayColumns:
          n = this.extendDaySlot(a, s);
          break;
        case this._modes.weekAgenda:
          n = this.extendWeekAgendaSlot(a, s);
          break;
        default:
          n = a;
      }
      var _ = t.getState();
      return n.start_date.valueOf() < _.min_date.valueOf() && (n.start_date = this.findVisibleColumn(_.min_date), n.start_date.setHours(t.config.first_hour)), n.end_date.valueOf() > _.max_date.valueOf() && (n.end_date = this.findVisibleColumn(_.max_date, -1)), t.$keyboardNavigation.TimeSlot.prototype.clone(n);
    }, extendTimelineSlot: function(a, s) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, a, s, "timeline");
    }, extendWeekAgendaSlot: function(a, s) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, a, s, "weekAgenda");
    }, extendGenericSlot: function(a, s, n, _) {
      var d, r = s.movingDate;
      if (r || (r = a[n]), !r || !a[n])
        return s;
      if (!n)
        return t.$keyboardNavigation.TimeSlot.prototype.clone(s);
      (d = this.nextSlot({ start_date: s[r], section: s.section }, n, _, !0)).start_date.valueOf() == s.start_date.valueOf() && (d = this.nextSlot({ start_date: d.start_date, section: d.section }, n, _, !0)), d.movingDate = r;
      var o = this.extendSlotDates(s, d, d.movingDate);
      return o.end_date.valueOf() <= o.start_date.valueOf() && (d.movingDate = d.movingDate == "end_date" ? "start_date" : "end_date"), o = this.extendSlotDates(s, d, d.movingDate), d.start_date = o.start_date, d.end_date = o.end_date, d;
    }, extendSlotDates: function(a, s, n) {
      var _ = { start_date: null, end_date: null };
      return n == "start_date" ? (_.start_date = s.start_date, _.end_date = a.end_date) : (_.start_date = a.start_date, _.end_date = s.start_date), _;
    }, extendMonthSlot: function(a, s) {
      return (a = this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, a, s, "month")).start_date.setHours(t.config.first_hour), a.end_date = t.date.add(a.end_date, -1, "day"), a.end_date.setHours(t.config.last_hour), a;
    }, extendUnitsSlot: function(a, s) {
      var n;
      switch (s) {
        case "down":
        case "up":
          n = this.extendDaySlot(a, s);
          break;
        default:
          n = a;
      }
      return n.section = a.section, n;
    }, extendDaySlot: function(a, s) {
      return this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, a, s, "dayColumns");
    }, scrollSlot: function(a) {
      var s = t.getState(), n = this.nextSlot(this, a);
      (n.start_date.valueOf() < s.min_date.valueOf() || n.start_date.valueOf() >= s.max_date.valueOf()) && t.setCurrentView(new Date(n.start_date)), this.moveTo(n);
    }, keys: { left: function() {
      this.scrollSlot("left");
    }, right: function() {
      this.scrollSlot("right");
    }, down: function() {
      this._getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler() : this.scrollSlot("down");
    }, up: function() {
      this._getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler() : this.scrollSlot("up");
    }, "shift+down": function() {
      this.moveTo(this.extendSlot(this, "down"));
    }, "shift+up": function() {
      this.moveTo(this.extendSlot(this, "up"));
    }, "shift+right": function() {
      this.moveTo(this.extendSlot(this, "right"));
    }, "shift+left": function() {
      this.moveTo(this.extendSlot(this, "left"));
    }, enter: function() {
      var a = { start_date: new Date(this.start_date), end_date: new Date(this.end_date) }, s = t.getState().mode;
      t.matrix && t.matrix[s] ? a[t.matrix[t.getState().mode].y_property] = this.section : t._props && t._props[s] && (a[t._props[s].map_to] = this.section), t.addEventNow(a);
    } } }), t.$keyboardNavigation.TimeSlot.prototype.bindAll(t.$keyboardNavigation.TimeSlot.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.MinicalButton = function(a, s) {
      this.container = a, this.index = s || 0;
    }, t.$keyboardNavigation.MinicalButton.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { isValid: function() {
      return !!this.container.offsetWidth;
    }, fallback: function() {
      var a = new t.$keyboardNavigation.TimeSlot();
      return a.isValid() ? a : new t.$keyboardNavigation.DataArea();
    }, focus: function() {
      t.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0"), t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, getNode: function() {
      return this.index ? this.container.querySelector(".dhx_cal_next_button") : this.container.querySelector(".dhx_cal_prev_button");
    }, keys: { right: function(a) {
      this.moveTo(new t.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, left: function(a) {
      this.moveTo(new t.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, down: function() {
      var a = new t.$keyboardNavigation.MinicalCell(this.container, 0, 0);
      a && !a.isValid() && (a = a.fallback()), this.moveTo(a);
    }, enter: function(a) {
      this.getNode().click();
    } } }), t.$keyboardNavigation.MinicalButton.prototype.bindAll(t.$keyboardNavigation.MinicalButton.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.MinicalCell = function(a, s, n) {
      this.container = a, this.row = s || 0, this.col = n || 0;
    }, t.$keyboardNavigation.MinicalCell.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { isValid: function() {
      var a = this._getGrid();
      return !(!a[this.row] || !a[this.row][this.col]);
    }, fallback: function() {
      var a = this.row, s = this.col, n = this._getGrid();
      n[a] || (a = 0);
      var _ = !0;
      if (a > n.length / 2 && (_ = !1), !n[a]) {
        var d = new t.$keyboardNavigation.TimeSlot();
        return d.isValid() ? d : new t.$keyboardNavigation.DataArea();
      }
      if (_) {
        for (var r = s; n[a] && r < n[a].length; r++)
          if (n[a][r] || r != n[a].length - 1 || (a++, s = 0), n[a][r])
            return new t.$keyboardNavigation.MinicalCell(this.container, a, r);
      } else
        for (r = s; n[a] && r < n[a].length; r--)
          if (n[a][r] || r || (s = n[--a].length - 1), n[a][r])
            return new t.$keyboardNavigation.MinicalCell(this.container, a, r);
      return new t.$keyboardNavigation.MinicalButton(this.container, 0);
    }, focus: function() {
      t.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0"), t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getNode: function(a, s) {
      return this.container.querySelector(".dhx_year_body tr:nth-child(" + (a + 1) + ") td:nth-child(" + (s + 1) + ")");
    }, getNode: function() {
      return this._getNode(this.row, this.col);
    }, _getGrid: function() {
      for (var a = this.container.querySelectorAll(".dhx_year_body tr"), s = [], n = 0; n < a.length; n++) {
        s[n] = [];
        for (var _ = a[n].querySelectorAll("td"), d = 0; d < _.length; d++) {
          var r = _[d], o = !0, c = t._getClassName(r);
          (c.indexOf("dhx_after") > -1 || c.indexOf("dhx_before") > -1 || c.indexOf("dhx_scale_ignore") > -1) && (o = !1), s[n][d] = o;
        }
      }
      return s;
    }, keys: { right: function(a) {
      var s = this._getGrid(), n = this.row, _ = this.col + 1;
      s[n] && s[n][_] || (s[n + 1] ? (n += 1, _ = 0) : _ = this.col);
      var d = new t.$keyboardNavigation.MinicalCell(this.container, n, _);
      d.isValid() || (d = d.fallback()), this.moveTo(d);
    }, left: function(a) {
      var s = this._getGrid(), n = this.row, _ = this.col - 1;
      s[n] && s[n][_] || (_ = s[n - 1] ? s[n -= 1].length - 1 : this.col);
      var d = new t.$keyboardNavigation.MinicalCell(this.container, n, _);
      d.isValid() || (d = d.fallback()), this.moveTo(d);
    }, down: function() {
      var a = this._getGrid(), s = this.row + 1, n = this.col;
      a[s] && a[s][n] || (s = this.row);
      var _ = new t.$keyboardNavigation.MinicalCell(this.container, s, n);
      _.isValid() || (_ = _.fallback()), this.moveTo(_);
    }, up: function() {
      var a = this._getGrid(), s = this.row - 1, n = this.col;
      if (a[s] && a[s][n]) {
        var _ = new t.$keyboardNavigation.MinicalCell(this.container, s, n);
        _.isValid() || (_ = _.fallback()), this.moveTo(_);
      } else {
        var d = 0;
        this.col > a[this.row].length / 2 && (d = 1), this.moveTo(new t.$keyboardNavigation.MinicalButton(this.container, d));
      }
    }, enter: function(a) {
      this.getNode().querySelector(".dhx_month_head").click();
    } } }), t.$keyboardNavigation.MinicalCell.prototype.bindAll(t.$keyboardNavigation.MinicalCell.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.DataArea = function(a) {
      this.index = a || 0;
    }, t.$keyboardNavigation.DataArea.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { getNode: function(a) {
      return t.$container.querySelector(".dhx_cal_data");
    }, _handlers: null, isValid: function() {
      return !0;
    }, fallback: function() {
      return this;
    }, keys: { "up,down,right,left": function() {
      this.moveTo(new t.$keyboardNavigation.TimeSlot());
    } } }), t.$keyboardNavigation.DataArea.prototype.bindAll(t.$keyboardNavigation.DataArea.prototype.keys);
  }(e), Wa(e), function(t) {
    t.$keyboardNavigation.dispatcher = { isActive: !1, activeNode: null, globalNode: new t.$keyboardNavigation.SchedulerNode(), keepScrollPosition: function(a) {
      var s, n, _ = t.$container.querySelector(".dhx_timeline_scrollable_data");
      _ || (_ = t.$container.querySelector(".dhx_cal_data")), _ && (s = _.scrollTop, n = _.scrollLeft), a(), _ && (_.scrollTop = s, _.scrollLeft = n);
    }, enable: function() {
      if (t.$container) {
        this.isActive = !0;
        var a = this;
        this.keepScrollPosition(function() {
          a.globalNode.enable(), a.setActiveNode(a.getActiveNode());
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
      var a = this.activeNode;
      return a && !a.isValid() && (a = a.fallback()), a;
    }, focusGlobalNode: function() {
      this.blurNode(this.globalNode), this.focusNode(this.globalNode);
    }, setActiveNode: function(a) {
      a && a.isValid() && (this.activeNode && this.activeNode.compareTo(a) || this.isEnabled() && (this.blurNode(this.activeNode), this.activeNode = a, this.focusNode(this.activeNode)));
    }, focusNode: function(a) {
      a && a.focus && (a.focus(), a.getNode && document.activeElement != a.getNode() && this.setActiveNode(new t.$keyboardNavigation.DataArea()));
    }, blurNode: function(a) {
      a && a.blur && a.blur();
    }, getInlineEditor: function(a) {
      var s = t.$container.querySelector(".dhx_cal_editor[" + t.config.event_attribute + "='" + a + "'] textarea");
      return s && s.offsetWidth ? s : null;
    }, keyDownHandler: function(a) {
      if (!a.defaultPrevented) {
        var s = this.getActiveNode();
        if ((!t.$keyboardNavigation.isModal() || s && s.container && t.utils.dom.locateCss({ target: s.container }, "dhx_minical_popup", !1)) && (!t.getState().editor_id || !this.getInlineEditor(t.getState().editor_id)) && this.isEnabled()) {
          a = a || window.event;
          var n = this.globalNode, _ = t.$keyboardNavigation.shortcuts.getCommandFromEvent(a);
          s ? s.findHandler(_) ? s.doAction(_, a) : n.findHandler(_) && n.doAction(_, a) : this.setDefaultNode();
        }
      }
    }, _timeout: null, delay: function(a, s) {
      clearTimeout(this._timeout), this._timeout = setTimeout(a, s || 1);
    } };
  }(e), Ja(e), function() {
    Xa(e), function(d) {
      d.$keyboardNavigation._minicalendars = [], d.$keyboardNavigation.isMinical = function(r) {
        for (var o = d.$keyboardNavigation._minicalendars, c = 0; c < o.length; c++)
          if (this.isChildOf(r, o[c]))
            return !0;
        return !1;
      }, d.$keyboardNavigation.isChildOf = function(r, o) {
        for (; r && r !== o; )
          r = r.parentNode;
        return r === o;
      }, d.$keyboardNavigation.patchMinicalendar = function() {
        var r = d.$keyboardNavigation.dispatcher;
        function o(b) {
          var p = b.target;
          r.enable(), r.setActiveNode(new d.$keyboardNavigation.MinicalButton(p, 0));
        }
        function c(b) {
          var p = b.target || b.srcElement, u = d.utils.dom.locateCss(b, "dhx_cal_prev_button", !1), m = d.utils.dom.locateCss(b, "dhx_cal_next_button", !1), l = d.utils.dom.locateCss(b, "dhx_year_body", !1), f = 0, g = 0;
          if (l) {
            for (var x, w, E = p; E && E.tagName.toLowerCase() != "td"; )
              E = E.parentNode;
            if (E && (x = (w = E).parentNode), x && w) {
              for (var k = x.parentNode.querySelectorAll("tr"), S = 0; S < k.length; S++)
                if (k[S] == x) {
                  f = S;
                  break;
                }
              var v = x.querySelectorAll("td");
              for (S = 0; S < v.length; S++)
                if (v[S] == w) {
                  g = S;
                  break;
                }
            }
          }
          var D = b.currentTarget;
          r.delay(function() {
            var M;
            (u || m || l) && (u ? (M = new d.$keyboardNavigation.MinicalButton(D, 0), r.setActiveNode(new d.$keyboardNavigation.MinicalButton(D, 0))) : m ? M = new d.$keyboardNavigation.MinicalButton(D, 1) : l && (M = new d.$keyboardNavigation.MinicalCell(D, f, g)), M && (r.enable(), M.isValid() && (r.activeNode = null, r.setActiveNode(M))));
          });
        }
        if (d.renderCalendar) {
          var h = d.renderCalendar;
          d.renderCalendar = function() {
            var b = h.apply(this, arguments), p = d.$keyboardNavigation._minicalendars;
            d.eventRemove(b, "click", c), d.event(b, "click", c), d.eventRemove(b, "focus", o), d.event(b, "focus", o);
            for (var u = !1, m = 0; m < p.length; m++)
              if (p[m] == b) {
                u = !0;
                break;
              }
            if (u || p.push(b), r.isEnabled()) {
              var l = r.getActiveNode();
              l && l.container == b ? r.focusNode(l) : b.setAttribute("tabindex", "0");
            } else
              b.setAttribute("tabindex", "0");
            return b;
          };
        }
        if (d.destroyCalendar) {
          var y = d.destroyCalendar;
          d.destroyCalendar = function(b, p) {
            b = b || (d._def_count ? d._def_count.firstChild : null);
            var u = y.apply(this, arguments);
            if (!b || !b.parentNode)
              for (var m = d.$keyboardNavigation._minicalendars, l = 0; l < m.length; l++)
                m[l] == b && (d.eventRemove(m[l], "focus", o), m.splice(l, 1), l--);
            return u;
          };
        }
      };
    }(e);
    var t = e.$keyboardNavigation.dispatcher;
    if (e.$keyboardNavigation.attachSchedulerHandlers(), e.renderCalendar)
      e.$keyboardNavigation.patchMinicalendar();
    else
      var a = e.attachEvent("onSchedulerReady", function() {
        e.detachEvent(a), e.$keyboardNavigation.patchMinicalendar();
      });
    function s() {
      if (e.config.key_nav) {
        var d = document.activeElement;
        return !(!d || e.utils.dom.locateCss(d, "dhx_cal_quick_info", !1)) && (e.$keyboardNavigation.isChildOf(d, e.$container) || e.$keyboardNavigation.isMinical(d));
      }
    }
    function n(d) {
      d && !t.isEnabled() ? t.enable() : !d && t.isEnabled() && t.disable();
    }
    const _ = setInterval(function() {
      if (e.$container && e.$keyboardNavigation.isChildOf(e.$container, document.body)) {
        var d = s();
        d ? n(d) : !d && t.isEnabled() && setTimeout(function() {
          e.$destroyed || (e.config.key_nav ? n(s()) : e.$container.removeAttribute("tabindex"));
        }, 100);
      }
    }, 500);
    e.attachEvent("onDestroy", function() {
      clearInterval(_);
    });
  }();
}, layer: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    this.layers.sort(function(t, a) {
      return t.zIndex - a.zIndex;
    }), e._dp_init = function(t) {
      t._methods = ["_set_event_text_style", "", "changeEventId", "deleteEvent"], this.attachEvent("onEventAdded", function(a) {
        !this._loading && this.validId(a) && this.getEvent(a) && this.getEvent(a).layer == t.layer && t.setUpdated(a, !0, "inserted");
      }), this.attachEvent("onBeforeEventDelete", function(a) {
        if (this.getEvent(a) && this.getEvent(a).layer == t.layer) {
          if (!this.validId(a))
            return;
          var s = t.getState(a);
          return s == "inserted" || this._new_event ? (t.setUpdated(a, !1), !0) : s != "deleted" && (s == "true_deleted" || (t.setUpdated(a, !0, "deleted"), !1));
        }
        return !0;
      }), this.attachEvent("onEventChanged", function(a) {
        !this._loading && this.validId(a) && this.getEvent(a) && this.getEvent(a).layer == t.layer && t.setUpdated(a, !0, "updated");
      }), t._getRowData = function(a, s) {
        var n = this.obj.getEvent(a), _ = {};
        for (var d in n)
          d.indexOf("_") !== 0 && (n[d] && n[d].getUTCFullYear ? _[d] = this.obj._helpers.formatDate(n[d]) : _[d] = n[d]);
        return _;
      }, t._clearUpdateFlag = function() {
      }, t.attachEvent("insertCallback", e._update_callback), t.attachEvent("updateCallback", e._update_callback), t.attachEvent("deleteCallback", function(a, s) {
        this.obj.setUserData(s, this.action_param, "true_deleted"), this.obj.deleteEvent(s);
      });
    }, function() {
      var t = function(n) {
        if (n === null || typeof n != "object")
          return n;
        var _ = new n.constructor();
        for (var d in n)
          _[d] = t(n[d]);
        return _;
      };
      e._dataprocessors = [], e._layers_zindex = {};
      for (var a = 0; a < e.layers.length; a++) {
        if (e.config["lightbox_" + e.layers[a].name] = {}, e.config["lightbox_" + e.layers[a].name].sections = t(e.config.lightbox.sections), e._layers_zindex[e.layers[a].name] = e.config.initial_layer_zindex || 5 + 3 * a, e.layers[a].url) {
          var s = e.createDataProcessor({ url: e.layers[a].url });
          s.layer = e.layers[a].name, e._dataprocessors.push(s), e._dataprocessors[a].init(e);
        }
        e.layers[a].isDefault && (e.defaultLayer = e.layers[a].name);
      }
    }(), e.showLayer = function(t) {
      this.toggleLayer(t, !0);
    }, e.hideLayer = function(t) {
      this.toggleLayer(t, !1);
    }, e.toggleLayer = function(t, a) {
      var s = this.getLayer(t);
      s.visible = a !== void 0 ? !!a : !s.visible, this.setCurrentView(this._date, this._mode);
    }, e.getLayer = function(t) {
      var a, s;
      typeof t == "string" && (s = t), typeof t == "object" && (s = t.layer);
      for (var n = 0; n < e.layers.length; n++)
        e.layers[n].name == s && (a = e.layers[n]);
      return a;
    }, e.attachEvent("onBeforeLightbox", function(t) {
      var a = this.getEvent(t);
      return this.config.lightbox.sections = this.config["lightbox_" + a.layer].sections, e.resetLightbox(), !0;
    }), e.attachEvent("onClick", function(t, a) {
      var s = e.getEvent(t);
      return !e.getLayer(s.layer).noMenu;
    }), e.attachEvent("onEventCollision", function(t, a) {
      var s = this.getLayer(t);
      if (!s.checkCollision)
        return !1;
      for (var n = 0, _ = 0; _ < a.length; _++)
        a[_].layer == s.name && a[_].id != t.id && n++;
      return n >= e.config.collision_limit;
    }), e.addEvent = function(t, a, s, n, _) {
      var d = t;
      arguments.length != 1 && ((d = _ || {}).start_date = t, d.end_date = a, d.text = s, d.id = n, d.layer = this.defaultLayer), d.id = d.id || e.uid(), d.text = d.text || "", typeof d.start_date == "string" && (d.start_date = this.templates.api_date(d.start_date)), typeof d.end_date == "string" && (d.end_date = this.templates.api_date(d.end_date)), d._timed = this.isOneDayEvent(d);
      var r = !this._events[d.id];
      this._events[d.id] = d, this.event_updated(d), this._loading || this.callEvent(r ? "onEventAdded" : "onEventChanged", [d.id, d]);
    }, this._evs_layer = {};
    for (var i = 0; i < this.layers.length; i++)
      this._evs_layer[this.layers[i].name] = [];
    e.addEventNow = function(t, a, s) {
      var n = {};
      typeof t == "object" && (n = t, t = null);
      var _ = 6e4 * (this.config.event_duration || this.config.time_step);
      t || (t = Math.round(e._currentDate().valueOf() / _) * _);
      var d = new Date(t);
      if (!a) {
        var r = this.config.first_hour;
        r > d.getHours() && (d.setHours(r), t = d.valueOf()), a = t + _;
      }
      n.start_date = n.start_date || d, n.end_date = n.end_date || new Date(a), n.text = n.text || this.locale.labels.new_event, n.id = this._drag_id = this.uid(), n.layer = this.defaultLayer, this._drag_mode = "new-size", this._loading = !0, this.addEvent(n), this.callEvent("onEventCreated", [this._drag_id, s]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(s);
    }, e._t_render_view_data = function(t) {
      if (this.config.multi_day && !this._table_view) {
        for (var a = [], s = [], n = 0; n < t.length; n++)
          t[n]._timed ? a.push(t[n]) : s.push(t[n]);
        this._table_view = !0, this.render_data(s), this._table_view = !1, this.render_data(a);
      } else
        this.render_data(t);
    }, e.render_view_data = function() {
      if (this._not_render)
        this._render_wait = !0;
      else {
        this._render_wait = !1, this.clear_view(), this._evs_layer = {};
        for (var t = 0; t < this.layers.length; t++)
          this._evs_layer[this.layers[t].name] = [];
        var a = this.get_visible_events();
        for (t = 0; t < a.length; t++)
          this._evs_layer[a[t].layer] && this._evs_layer[a[t].layer].push(a[t]);
        if (this._mode == "month") {
          var s = [];
          for (t = 0; t < this.layers.length; t++)
            this.layers[t].visible && (s = s.concat(this._evs_layer[this.layers[t].name]));
          this._t_render_view_data(s);
        } else
          for (t = 0; t < this.layers.length; t++)
            if (this.layers[t].visible) {
              var n = this._evs_layer[this.layers[t].name];
              this._t_render_view_data(n);
            }
      }
    }, e._render_v_bar = function(t, a, s, n, _, d, r, o, c) {
      var h = t.id;
      r.indexOf("<div class=") == -1 && (r = e.templates["event_header_" + t.layer] ? e.templates["event_header_" + t.layer](t.start_date, t.end_date, t) : r), o.indexOf("<div class=") == -1 && (o = e.templates["event_text_" + t.layer] ? e.templates["event_text_" + t.layer](t.start_date, t.end_date, t) : o);
      var y = document.createElement("div"), b = "dhx_cal_event", p = e.templates["event_class_" + t.layer] ? e.templates["event_class_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_class(t.start_date, t.end_date, t);
      p && (b = b + " " + p);
      var u = e._border_box_events(), m = n - 2, l = u ? m : n - 4, f = u ? m : n - 6, g = u ? m : n - 14, x = u ? m - 2 : n - 8, w = u ? _ - this.xy.event_header_height : _ - 30 + 1, E = '<div event_id="' + h + '" ' + e.config.event_attribute + '="' + h + '" class="' + b + '" style="position:absolute; top:' + s + "px; left:" + a + "px; width:" + l + "px; height:" + _ + "px;" + (d || "") + '">';
      return E += '<div class="dhx_header" style=" width:' + f + 'px;" >&nbsp;</div>', E += '<div class="dhx_title">' + r + "</div>", E += '<div class="dhx_body" style=" width:' + g + "px; height:" + w + 'px;">' + o + "</div>", E += '<div class="dhx_footer" style=" width:' + x + "px;" + (c ? " margin-top:-1px;" : "") + '" ></div></div>', y.innerHTML = E, y.style.zIndex = 100, y.firstChild;
    }, e.render_event_bar = function(t) {
      var a = this._els.dhx_cal_data[0], s = this._colsS[t._sday], n = this._colsS[t._eday];
      n == s && (n = this._colsS[t._eday + 1]);
      var _ = this.xy.bar_height, d = this._colsS.heights[t._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + t._sorder * _, r = document.createElement("div"), o = t._timed ? "dhx_cal_event_clear" : "dhx_cal_event_line", c = e.templates["event_class_" + t.layer] ? e.templates["event_class_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_class(t.start_date, t.end_date, t);
      c && (o = o + " " + c);
      var h = '<div event_id="' + t.id + '" ' + this.config.event_attribute + '="' + t.id + '" class="' + o + '" style="position:absolute; top:' + d + "px; left:" + s + "px; width:" + (n - s - 15) + "px;" + (t._text_style || "") + '">';
      t._timed && (h += e.templates["event_bar_date_" + t.layer] ? e.templates["event_bar_date_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_bar_date(t.start_date, t.end_date, t)), h += e.templates["event_bar_text_" + t.layer] ? e.templates["event_bar_text_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_bar_text(t.start_date, t.end_date, t) + "</div>)", h += "</div>", r.innerHTML = h, this._rendered.push(r.firstChild), a.appendChild(r.firstChild);
    }, e.render_event = function(t) {
      var a = e.xy.menu_width;
      if (e.getLayer(t.layer).noMenu && (a = 0), !(t._sday < 0)) {
        var s = e.locate_holder(t._sday);
        if (s) {
          var n = 60 * t.start_date.getHours() + t.start_date.getMinutes(), _ = 60 * t.end_date.getHours() + t.end_date.getMinutes() || 60 * e.config.last_hour, d = Math.round((60 * n * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px) + 1, r = Math.max(e.xy.min_event_height, (_ - n) * this.config.hour_size_px / 60) + 1, o = Math.floor((s.clientWidth - a) / t._count), c = t._sorder * o + 1;
          t._inner || (o *= t._count - t._sorder);
          var h = this._render_v_bar(t.id, a + c, d, o, r, t._text_style, e.templates.event_header(t.start_date, t.end_date, t), e.templates.event_text(t.start_date, t.end_date, t));
          if (this._rendered.push(h), s.appendChild(h), c = c + parseInt(s.style.left, 10) + a, d += this._dy_shift, h.style.zIndex = this._layers_zindex[t.layer], this._edit_id == t.id) {
            h.style.zIndex = parseInt(h.style.zIndex) + 1;
            var y = h.style.zIndex;
            o = Math.max(o - 4, e.xy.editor_width), (h = document.createElement("div")).setAttribute("event_id", t.id), h.setAttribute(this.config.event_attribute, t.id), this.set_xy(h, o, r - 20, c, d + 14), h.className = "dhx_cal_editor", h.style.zIndex = y;
            var b = document.createElement("div");
            this.set_xy(b, o - 6, r - 26), b.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;", b.style.zIndex = y, h.appendChild(b), this._els.dhx_cal_data[0].appendChild(h), this._rendered.push(h), b.innerHTML = "<textarea class='dhx_cal_editor'>" + t.text + "</textarea>", this._editor = b.firstChild, this._editor.addEventListener("keypress", function(f) {
              if (f.shiftKey)
                return !0;
              var g = f.keyCode;
              g == e.keys.edit_save && e.editStop(!0), g == e.keys.edit_cancel && e.editStop(!1);
            }), this._editor.addEventListener("selectstart", function(f) {
              return f.cancelBubble = !0, !0;
            }), b.firstChild.focus(), this._els.dhx_cal_data[0].scrollLeft = 0, b.firstChild.select();
          }
          if (this._select_id == t.id) {
            h.style.zIndex = parseInt(h.style.zIndex) + 1;
            for (var p = this.config["icons_" + (this._edit_id == t.id ? "edit" : "select")], u = "", m = 0; m < p.length; m++)
              u += "<div class='dhx_menu_icon " + p[m] + "' title='" + this.locale.labels[p[m]] + "'></div>";
            var l = this._render_v_bar(t.id, c - a + 1, d, a, 20 * p.length + 26, "", "<div class='dhx_menu_head'></div>", u, !0);
            l.style.left = c - a + 1, l.style.zIndex = h.style.zIndex, this._els.dhx_cal_data[0].appendChild(l), this._rendered.push(l);
          }
        }
      }
    }, e.filter_agenda = function(t, a) {
      var s = e.getLayer(a.layer);
      return s && s.visible;
    };
  });
}, legacy: function(e) {
  (function() {
    I.dhtmlx || (I.dhtmlx = function(r) {
      for (var o in r)
        i[o] = r[o];
      return i;
    });
    let i = I.dhtmlx;
    function t(r, o, c, h) {
      return this.xmlDoc = "", this.async = c === void 0 || c, this.onloadAction = r || null, this.mainObject = o || null, this.waitCall = null, this.rSeed = h || !1, this;
    }
    function a() {
      return I.dhtmlDragAndDrop ? I.dhtmlDragAndDrop : (this.lastLanding = 0, this.dragNode = 0, this.dragStartNode = 0, this.dragStartObject = 0, this.tempDOMU = null, this.tempDOMM = null, this.waitDrag = 0, I.dhtmlDragAndDrop = this, this);
    }
    i.extend_api = function(r, o, c) {
      var h = I[r];
      h && (I[r] = function(y) {
        var b;
        if (y && typeof y == "object" && !y.tagName) {
          for (var p in b = h.apply(this, o._init ? o._init(y) : arguments), i)
            o[p] && this[o[p]](i[p]);
          for (var p in y)
            o[p] ? this[o[p]](y[p]) : p.indexOf("on") === 0 && this.attachEvent(p, y[p]);
        } else
          b = h.apply(this, arguments);
        return o._patch && o._patch(this), b || this;
      }, I[r].prototype = h.prototype, c && function(y, b) {
        for (var p in b)
          typeof b[p] == "function" && (y[p] = b[p]);
      }(I[r].prototype, c));
    }, I.dhtmlxAjax = { get: function(r, o) {
      var c = new t(!0);
      return c.async = arguments.length < 3, c.waitCall = o, c.loadXML(r), c;
    }, post: function(r, o, c) {
      var h = new t(!0);
      return h.async = arguments.length < 4, h.waitCall = c, h.loadXML(r, !0, o), h;
    }, getSync: function(r) {
      return this.get(r, null, !0);
    }, postSync: function(r, o) {
      return this.post(r, o, null, !0);
    } }, I.dtmlXMLLoaderObject = t, t.count = 0, t.prototype.waitLoadFunction = function(r) {
      var o = !0;
      return this.check = function() {
        if (r && r.onloadAction && (!r.xmlDoc.readyState || r.xmlDoc.readyState == 4)) {
          if (!o)
            return;
          o = !1, t.count++, typeof r.onloadAction == "function" && r.onloadAction(r.mainObject, null, null, null, r), r.waitCall && (r.waitCall.call(this, r), r.waitCall = null);
        }
      }, this.check;
    }, t.prototype.getXMLTopNode = function(r, o) {
      var c;
      if (this.xmlDoc.responseXML) {
        if ((h = this.xmlDoc.responseXML.getElementsByTagName(r)).length === 0 && r.indexOf(":") != -1)
          var h = this.xmlDoc.responseXML.getElementsByTagName(r.split(":")[1]);
        c = h[0];
      } else
        c = this.xmlDoc.documentElement;
      return c ? (this._retry = !1, c) : !this._retry && n ? (this._retry = !0, o = this.xmlDoc, this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/, ""), !0), this.getXMLTopNode(r, o)) : (dhtmlxError.throwError("LoadXML", "Incorrect XML", [o || this.xmlDoc, this.mainObject]), document.createElement("div"));
    }, t.prototype.loadXMLString = function(r, o) {
      if (n)
        this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), this.xmlDoc.async = this.async, this.xmlDoc.onreadystatechange = function() {
        }, this.xmlDoc.loadXML(r);
      else {
        var c = new DOMParser();
        this.xmlDoc = c.parseFromString(r, "text/xml");
      }
      o || (this.onloadAction && this.onloadAction(this.mainObject, null, null, null, this), this.waitCall && (this.waitCall(), this.waitCall = null));
    }, t.prototype.loadXML = function(r, o, c, h) {
      this.rSeed && (r += (r.indexOf("?") != -1 ? "&" : "?") + "a_dhx_rSeed=" + (/* @__PURE__ */ new Date()).valueOf()), this.filePath = r, !n && I.XMLHttpRequest ? this.xmlDoc = new XMLHttpRequest() : this.xmlDoc = new ActiveXObject("Microsoft.XMLHTTP"), this.async && (this.xmlDoc.onreadystatechange = new this.waitLoadFunction(this)), typeof o == "string" ? this.xmlDoc.open(o, r, this.async) : this.xmlDoc.open(o ? "POST" : "GET", r, this.async), h ? (this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 (" + navigator.userAgent + ")"), this.xmlDoc.setRequestHeader("Content-type", "text/xml")) : o && this.xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), this.xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xmlDoc.send(c), this.async || new this.waitLoadFunction(this)();
    }, t.prototype.destructor = function() {
      return this._filterXPath = null, this._getAllNamedChilds = null, this._retry = null, this.async = null, this.rSeed = null, this.filePath = null, this.onloadAction = null, this.mainObject = null, this.xmlDoc = null, this.doXPath = null, this.doXPathOpera = null, this.doXSLTransToObject = null, this.doXSLTransToString = null, this.loadXML = null, this.loadXMLString = null, this.doSerialization = null, this.xmlNodeToJSON = null, this.getXMLTopNode = null, this.setXSLParamValue = null, null;
    }, t.prototype.xmlNodeToJSON = function(r) {
      for (var o = {}, c = 0; c < r.attributes.length; c++)
        o[r.attributes[c].name] = r.attributes[c].value;
      for (o._tagvalue = r.firstChild ? r.firstChild.nodeValue : "", c = 0; c < r.childNodes.length; c++) {
        var h = r.childNodes[c].tagName;
        h && (o[h] || (o[h] = []), o[h].push(this.xmlNodeToJSON(r.childNodes[c])));
      }
      return o;
    }, I.dhtmlDragAndDropObject = a, a.prototype.removeDraggableItem = function(r) {
      r.onmousedown = null, r.dragStarter = null, r.dragLanding = null;
    }, a.prototype.addDraggableItem = function(r, o) {
      r.onmousedown = this.preCreateDragCopy, r.dragStarter = o, this.addDragLanding(r, o);
    }, a.prototype.addDragLanding = function(r, o) {
      r.dragLanding = o;
    }, a.prototype.preCreateDragCopy = function(r) {
      if (!r && !I.event || (r || event).button != 2)
        return I.dhtmlDragAndDrop.waitDrag ? (I.dhtmlDragAndDrop.waitDrag = 0, document.body.onmouseup = I.dhtmlDragAndDrop.tempDOMU, document.body.onmousemove = I.dhtmlDragAndDrop.tempDOMM, !1) : (I.dhtmlDragAndDrop.dragNode && I.dhtmlDragAndDrop.stopDrag(r), I.dhtmlDragAndDrop.waitDrag = 1, I.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup, I.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove, I.dhtmlDragAndDrop.dragStartNode = this, I.dhtmlDragAndDrop.dragStartObject = this.dragStarter, document.body.onmouseup = I.dhtmlDragAndDrop.preCreateDragCopy, document.body.onmousemove = I.dhtmlDragAndDrop.callDrag, I.dhtmlDragAndDrop.downtime = (/* @__PURE__ */ new Date()).valueOf(), !(!r || !r.preventDefault || (r.preventDefault(), 1)));
    }, a.prototype.callDrag = function(r) {
      r || (r = I.event);
      var o = I.dhtmlDragAndDrop;
      if (!((/* @__PURE__ */ new Date()).valueOf() - o.downtime < 100)) {
        if (!o.dragNode) {
          if (!o.waitDrag)
            return o.stopDrag(r, !0);
          if (o.dragNode = o.dragStartObject._createDragNode(o.dragStartNode, r), !o.dragNode)
            return o.stopDrag();
          o.dragNode.onselectstart = function() {
            return !1;
          }, o.gldragNode = o.dragNode, document.body.appendChild(o.dragNode), document.body.onmouseup = o.stopDrag, o.waitDrag = 0, o.dragNode.pWindow = I, o.initFrameRoute();
        }
        if (o.dragNode.parentNode != I.document.body && o.gldragNode) {
          var c = o.gldragNode;
          o.gldragNode.old && (c = o.gldragNode.old), c.parentNode.removeChild(c);
          var h = o.dragNode.pWindow;
          if (c.pWindow && c.pWindow.dhtmlDragAndDrop.lastLanding && c.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(c.pWindow.dhtmlDragAndDrop.lastLanding), n) {
            var y = document.createElement("div");
            y.innerHTML = o.dragNode.outerHTML, o.dragNode = y.childNodes[0];
          } else
            o.dragNode = o.dragNode.cloneNode(!0);
          o.dragNode.pWindow = I, o.gldragNode.old = o.dragNode, document.body.appendChild(o.dragNode), h.dhtmlDragAndDrop.dragNode = o.dragNode;
        }
        var b;
        o.dragNode.style.left = r.clientX + 15 + (o.fx ? -1 * o.fx : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px", o.dragNode.style.top = r.clientY + 3 + (o.fy ? -1 * o.fy : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px", b = r.srcElement ? r.srcElement : r.target, o.checkLanding(b, r);
      }
    }, a.prototype.calculateFramePosition = function(r) {
      if (I.name) {
        for (var o = parent.frames[I.name].frameElement.offsetParent, c = 0, h = 0; o; )
          c += o.offsetLeft, h += o.offsetTop, o = o.offsetParent;
        if (parent.dhtmlDragAndDrop) {
          var y = parent.dhtmlDragAndDrop.calculateFramePosition(1);
          c += 1 * y.split("_")[0], h += 1 * y.split("_")[1];
        }
        if (r)
          return c + "_" + h;
        this.fx = c, this.fy = h;
      }
      return "0_0";
    }, a.prototype.checkLanding = function(r, o) {
      r && r.dragLanding ? (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding), this.lastLanding = r, this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, o.clientX, o.clientY, o), this.lastLanding_scr = n ? o.srcElement : o.target) : r && r.tagName != "BODY" ? this.checkLanding(r.parentNode, o) : (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding, o.clientX, o.clientY, o), this.lastLanding = 0, this._onNotFound && this._onNotFound());
    }, a.prototype.stopDrag = function(r, o) {
      var c = I.dhtmlDragAndDrop;
      if (!o) {
        c.stopFrameRoute();
        var h = c.lastLanding;
        c.lastLanding = null, h && h.dragLanding._drag(c.dragStartNode, c.dragStartObject, h, n ? event.srcElement : r.target);
      }
      c.lastLanding = null, c.dragNode && c.dragNode.parentNode == document.body && c.dragNode.parentNode.removeChild(c.dragNode), c.dragNode = 0, c.gldragNode = 0, c.fx = 0, c.fy = 0, c.dragStartNode = 0, c.dragStartObject = 0, document.body.onmouseup = c.tempDOMU, document.body.onmousemove = c.tempDOMM, c.tempDOMU = null, c.tempDOMM = null, c.waitDrag = 0;
    }, a.prototype.stopFrameRoute = function(r) {
      r && I.dhtmlDragAndDrop.stopDrag(1, 1);
      for (var o = 0; o < I.frames.length; o++)
        try {
          I.frames[o] != r && I.frames[o].dhtmlDragAndDrop && I.frames[o].dhtmlDragAndDrop.stopFrameRoute(I);
        } catch {
        }
      try {
        parent.dhtmlDragAndDrop && parent != I && parent != r && parent.dhtmlDragAndDrop.stopFrameRoute(I);
      } catch {
      }
    }, a.prototype.initFrameRoute = function(r, o) {
      r && (I.dhtmlDragAndDrop.preCreateDragCopy(), I.dhtmlDragAndDrop.dragStartNode = r.dhtmlDragAndDrop.dragStartNode, I.dhtmlDragAndDrop.dragStartObject = r.dhtmlDragAndDrop.dragStartObject, I.dhtmlDragAndDrop.dragNode = r.dhtmlDragAndDrop.dragNode, I.dhtmlDragAndDrop.gldragNode = r.dhtmlDragAndDrop.dragNode, I.document.body.onmouseup = I.dhtmlDragAndDrop.stopDrag, I.waitDrag = 0, !n && o && (!s || d < 1.8) && I.dhtmlDragAndDrop.calculateFramePosition());
      try {
        parent.dhtmlDragAndDrop && parent != I && parent != r && parent.dhtmlDragAndDrop.initFrameRoute(I);
      } catch {
      }
      for (var c = 0; c < I.frames.length; c++)
        try {
          I.frames[c] != r && I.frames[c].dhtmlDragAndDrop && I.frames[c].dhtmlDragAndDrop.initFrameRoute(I, !r || o ? 1 : 0);
        } catch {
        }
    };
    var s = !1, n = !1, _ = !1, d = !1;
    navigator.userAgent.indexOf("Macintosh"), navigator.userAgent.toLowerCase().indexOf("chrome"), navigator.userAgent.indexOf("Safari") != -1 || navigator.userAgent.indexOf("Konqueror") != -1 ? parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5)) > 525 ? (s = !0, d = 1.9) : _ = !0 : navigator.userAgent.indexOf("Opera") != -1 ? parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3)) : navigator.appName.indexOf("Microsoft") != -1 ? (n = !0, navigator.appVersion.indexOf("MSIE 8.0") == -1 && navigator.appVersion.indexOf("MSIE 9.0") == -1 && navigator.appVersion.indexOf("MSIE 10.0") == -1 || document.compatMode == "BackCompat" || (n = 8)) : navigator.appName == "Netscape" && navigator.userAgent.indexOf("Trident") != -1 ? n = 8 : (s = !0, d = parseFloat(navigator.userAgent.split("rv:")[1])), t.prototype.doXPath = function(r, o, c, h) {
      if (_ || !n && !I.XPathResult)
        return this.doXPathOpera(r, o);
      if (n)
        return o || (o = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), o || dhtmlxError.throwError("LoadXML", "Incorrect XML", [o || this.xmlDoc, this.mainObject]), c && o.setProperty("SelectionNamespaces", "xmlns:xsl='" + c + "'"), h == "single" ? o.selectSingleNode(r) : o.selectNodes(r) || new Array(0);
      var y = o;
      o || (o = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), o || dhtmlxError.throwError("LoadXML", "Incorrect XML", [o || this.xmlDoc, this.mainObject]), o.nodeName.indexOf("document") != -1 ? y = o : (y = o, o = o.ownerDocument);
      var b = XPathResult.ANY_TYPE;
      h == "single" && (b = XPathResult.FIRST_ORDERED_NODE_TYPE);
      var p = [], u = o.evaluate(r, y, function(l) {
        return c;
      }, b, null);
      if (b == XPathResult.FIRST_ORDERED_NODE_TYPE)
        return u.singleNodeValue;
      for (var m = u.iterateNext(); m; )
        p[p.length] = m, m = u.iterateNext();
      return p;
    }, I.dhtmlxError = new ut(), t.prototype.doXPathOpera = function(r, o) {
      var c = r.replace(/[\/]+/gi, "/").split("/"), h = null, y = 1;
      if (!c.length)
        return [];
      if (c[0] == ".")
        h = [o];
      else {
        if (c[0] !== "")
          return [];
        h = (this.xmlDoc.responseXML || this.xmlDoc).getElementsByTagName(c[y].replace(/\[[^\]]*\]/g, "")), y++;
      }
      for (; y < c.length; y++)
        h = this._getAllNamedChilds(h, c[y]);
      return c[y - 1].indexOf("[") != -1 && (h = this._filterXPath(h, c[y - 1])), h;
    }, t.prototype._filterXPath = function(r, o) {
      for (var c = [], h = (o = o.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, ""), 0); h < r.length; h++)
        r[h].getAttribute(o) && (c[c.length] = r[h]);
      return c;
    }, t.prototype._getAllNamedChilds = function(r, o) {
      var c = [];
      _ && (o = o.toUpperCase());
      for (var h = 0; h < r.length; h++)
        for (var y = 0; y < r[h].childNodes.length; y++)
          _ ? r[h].childNodes[y].tagName && r[h].childNodes[y].tagName.toUpperCase() == o && (c[c.length] = r[h].childNodes[y]) : r[h].childNodes[y].tagName == o && (c[c.length] = r[h].childNodes[y]);
      return c;
    }, I.dhtmlxEvent === void 0 && (I.dhtmlxEvent = function(r, o, c) {
      r.addEventListener ? r.addEventListener(o, c, !1) : r.attachEvent && r.attachEvent("on" + o, c);
    }), t.prototype.xslDoc = null, t.prototype.setXSLParamValue = function(r, o, c) {
      c || (c = this.xslDoc), c.responseXML && (c = c.responseXML);
      var h = this.doXPath("/xsl:stylesheet/xsl:variable[@name='" + r + "']", c, "http://www.w3.org/1999/XSL/Transform", "single");
      h && (h.firstChild.nodeValue = o);
    }, t.prototype.doXSLTransToObject = function(r, o) {
      var c;
      if (r || (r = this.xslDoc), r.responseXML && (r = r.responseXML), o || (o = this.xmlDoc), o.responseXML && (o = o.responseXML), n) {
        c = new ActiveXObject("Msxml2.DOMDocument.3.0");
        try {
          o.transformNodeToObject(r, c);
        } catch {
          c = o.transformNode(r);
        }
      } else
        this.XSLProcessor || (this.XSLProcessor = new XSLTProcessor(), this.XSLProcessor.importStylesheet(r)), c = this.XSLProcessor.transformToDocument(o);
      return c;
    }, t.prototype.doXSLTransToString = function(r, o) {
      var c = this.doXSLTransToObject(r, o);
      return typeof c == "string" ? c : this.doSerialization(c);
    }, t.prototype.doSerialization = function(r) {
      return r || (r = this.xmlDoc), r.responseXML && (r = r.responseXML), n ? r.xml : new XMLSerializer().serializeToString(r);
    }, I.dhtmlxEventable = function(r) {
      r.attachEvent = function(o, c, h) {
        return this[o = "ev_" + o.toLowerCase()] || (this[o] = new this.eventCatcher(h || this)), o + ":" + this[o].addEvent(c);
      }, r.callEvent = function(o, c) {
        return !this[o = "ev_" + o.toLowerCase()] || this[o].apply(this, c);
      }, r.checkEvent = function(o) {
        return !!this["ev_" + o.toLowerCase()];
      }, r.eventCatcher = function(o) {
        var c = [], h = function() {
          for (var y = !0, b = 0; b < c.length; b++)
            if (c[b]) {
              var p = c[b].apply(o, arguments);
              y = y && p;
            }
          return y;
        };
        return h.addEvent = function(y) {
          if (typeof y != "function")
            throw new Error(`Invalid argument addEvent(${y})`);
          return !!y && c.push(y) - 1;
        }, h.removeEvent = function(y) {
          c[y] = null;
        }, h;
      }, r.detachEvent = function(o) {
        if (o) {
          var c = o.split(":");
          this[c[0]].removeEvent(c[1]);
        }
      }, r.detachAllEvents = function() {
        for (var o in this)
          o.indexOf("ev_") === 0 && (this.detachEvent(o), this[o] = null);
      }, r = null;
    };
  })();
}, limit: function(e) {
  e.config.limit_start = null, e.config.limit_end = null, e.config.limit_view = !1, e.config.check_limits = !0, e._temp_limit_scope = function() {
    var i = null;
    e.attachEvent("onBeforeViewChange", function(t, a, s, n) {
      function _(d, r) {
        var o = e.config.limit_start, c = e.config.limit_end, h = e.date.add(d, 1, r);
        return d.valueOf() > c.valueOf() || h <= o.valueOf();
      }
      return !e.config.limit_view || !_(n = n || a, s = s || t) || a.valueOf() == n.valueOf() || (setTimeout(function() {
        if (e.$destroyed)
          return !0;
        var d = _(a, s) ? e.config.limit_start : a;
        e.setCurrentView(_(d, s) ? null : d, s);
      }, 1), !1);
    }), e.attachEvent("onMouseDown", function(t) {
      return t != "dhx_time_block";
    }), e.attachEvent("onBeforeDrag", function(t) {
      return !t || e.checkLimitViolation(e.getEvent(t));
    }), e.attachEvent("onClick", function(t, a) {
      return e.checkLimitViolation(e.getEvent(t));
    }), e.attachEvent("onBeforeLightbox", function(t) {
      var a = e.getEvent(t);
      return i = [a.start_date, a.end_date], e.checkLimitViolation(a);
    }), e.attachEvent("onEventSave", function(t, a, s) {
      if (!a.start_date || !a.end_date) {
        var n = e.getEvent(t);
        a.start_date = new Date(n.start_date), a.end_date = new Date(n.end_date);
      }
      if (a.rec_type) {
        var _ = e._lame_clone(a);
        return e._roll_back_dates(_), e.checkLimitViolation(_);
      }
      return e.checkLimitViolation(a);
    }), e.attachEvent("onEventAdded", function(t) {
      if (!t)
        return !0;
      var a = e.getEvent(t);
      return !e.checkLimitViolation(a) && e.config.limit_start && e.config.limit_end && (a.start_date < e.config.limit_start && (a.start_date = new Date(e.config.limit_start)), a.start_date.valueOf() >= e.config.limit_end.valueOf() && (a.start_date = this.date.add(e.config.limit_end, -1, "day")), a.end_date < e.config.limit_start && (a.end_date = new Date(e.config.limit_start)), a.end_date.valueOf() >= e.config.limit_end.valueOf() && (a.end_date = this.date.add(e.config.limit_end, -1, "day")), a.start_date.valueOf() >= a.end_date.valueOf() && (a.end_date = this.date.add(a.start_date, this.config.event_duration || this.config.time_step, "minute")), a._timed = this.isOneDayEvent(a)), !0;
    }), e.attachEvent("onEventChanged", function(t) {
      if (!t)
        return !0;
      var a = e.getEvent(t);
      if (!e.checkLimitViolation(a)) {
        if (!i)
          return !1;
        a.start_date = i[0], a.end_date = i[1], a._timed = this.isOneDayEvent(a);
      }
      return !0;
    }), e.attachEvent("onBeforeEventChanged", function(t, a, s) {
      return e.checkLimitViolation(t);
    }), e.attachEvent("onBeforeEventCreated", function(t) {
      var a = e.getActionData(t).date, s = { _timed: !0, start_date: a, end_date: e.date.add(a, e.config.time_step, "minute") };
      return e.checkLimitViolation(s);
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
    });
  }, e._temp_limit_scope();
}, map_view: function(e) {
  let i = null, t = [];
  const a = { googleMap: new Ka(e), openStreetMaps: new Ga(e), mapbox: new Za(e) };
  function s(_) {
    i = _.ext.mapView.createAdapter(), t.push(e.attachEvent("onEventSave", function(d, r, o) {
      let c = e.getEvent(d);
      return c && c.event_location != r.event_location && (e._eventLocationChanged = !0), !0;
    }), e.attachEvent("onEventChanged", (d, r) => {
      const { start_date: o, end_date: c } = r, { min_date: h, max_date: y } = e.getState();
      return o.valueOf() < y.valueOf() && c.valueOf() > h.valueOf() && i && (e.config.map_settings.resolve_event_location && r.event_location && !e._latLngUpdate ? n(r, i) : i.updateEventMarker(r)), e._latLngUpdate = !1, !0;
    }), e.attachEvent("onEventIdChange", function(d, r) {
      let o = e.getEvent(r);
      i == null || i.removeEventMarker(d), i == null || i.addEventMarker(o);
    }), e.attachEvent("onEventAdded", (d, r) => {
      const { start_date: o, end_date: c } = r, { min_date: h, max_date: y } = e.getState();
      o.valueOf() < y.valueOf() && c.valueOf() > h.valueOf() && i && (e.config.map_settings.resolve_event_location && r.event_location && e._eventLocationChanged ? (n(r, i), e._eventLocationChanged = !1) : (i.addEventMarker(r), i.onEventClick(r)));
    }), e.attachEvent("onClick", function(d, r) {
      const o = e.getEvent(d);
      return i && o && i.onEventClick(o), !1;
    }), e.attachEvent("onBeforeEventDelete", (d, r) => (i && i.removeEventMarker(d), !0)));
  }
  async function n(_, d) {
    let r = await d.resolveAddress(_.event_location);
    return _.lat = r.lat, _.lng = r.lng, d.removeEventMarker(String(_.id)), d.addEventMarker(_), _;
  }
  e.ext || (e.ext = {}), e.ext.mapView = { createAdapter: function() {
    return a[e.config.map_view_provider];
  }, createMarker: function(_) {
    return new google.maps.Marker(_);
  }, currentAdapter: null, adapters: a }, e._latLngUpdate = !1, e._eventLocationChanged = !1, e.config.map_view_provider = "googleMap", e.config.map_settings = { initial_position: { lat: 48.724, lng: 8.215 }, error_position: { lat: 15, lng: 15 }, initial_zoom: 1, zoom_after_resolve: 15, info_window_max_width: 300, resolve_user_location: !0, resolve_event_location: !0, view_provider: "googleMap" }, e.config.map_initial_position && (e.config.map_settings.initial_position = { lat: e.config.map_initial_position.lat(), lng: e.config.map_initial_position.lng() }), e.config.map_error_position && (e.config.map_settings.error_position = { lat: e.config.map_error_position.lat(), lng: e.config.map_error_position.lng() }), e.xy.map_date_width = 188, e.xy.map_icon_width = 25, e.xy.map_description_width = 400, e.date.add_map = function(_, d, r) {
    return new Date(_.valueOf());
  }, e.templates.map_date = function(_, d, r) {
    return "";
  }, e.templates.map_time = function(_, d, r) {
    return e.config.rtl && !r._timed ? e.templates.day_date(d) + " &ndash; " + e.templates.day_date(_) : r._timed ? this.day_date(r.start_date, r.end_date, r) + " " + this.event_date(_) : e.templates.day_date(_) + " &ndash; " + e.templates.day_date(d);
  }, e.templates.map_text = function(_, d, r) {
    return r.text;
  }, e.templates.map_info_content = function(_) {
    return `<div><b>Event's text:</b> ${_.text}
				<div><b>Location:</b> ${_.event_location}</div>
				<div><b>Starts:</b> ${e.templates.tooltip_date_format(_.start_date)}</div>
				<div><b>Ends:</b> ${e.templates.tooltip_date_format(_.end_date)}</div>
			</div>`;
  }, e.date.map_start = function(_) {
    return _;
  }, e.dblclick_dhx_map_area = function(_) {
    let d = _.target.closest(`[${e.config.event_attribute}]`);
    if (d) {
      let r = d.getAttribute(`${e.config.event_attribute}`);
      e.showLightbox(r);
    }
    this.config.readonly || !this.config.dblclick_create || d || this.addEventNow({ start_date: e.config.map_start, end_date: e.date.add(e.config.map_start, e.config.time_step, "minute") });
  }, e.attachEvent("onSchedulerReady", function() {
    e.config.map_initial_zoom !== void 0 && (e.config.map_settings.initial_zoom = e.config.map_initial_zoom), e.config.map_zoom_after_resolve !== void 0 && (e.config.map_settings.zoom_after_resolve = e.config.map_zoom_after_resolve), e.config.map_infowindow_max_width !== void 0 && (e.config.map_settings.info_window_max_width = e.config.map_infowindow_max_width), e.config.map_resolve_user_location !== void 0 && (e.config.map_settings.resolve_user_location = e.config.map_resolve_user_location), e.config.map_view_provider !== void 0 && (e.config.map_settings.view_provider = e.config.map_view_provider), e.config.map_type !== void 0 && (e.config.map_settings.type = e.config.map_type), e.config.map_resolve_event_location !== void 0 && (e.config.map_settings.resolve_event_location = e.config.map_resolve_event_location), e.ext.mapView.currentAdapter = e.config.map_view_provider;
    let _ = document.createElement("div");
    _.className = "mapContainer", _.id = "mapContainer", _.style.display = "none", _.style.zIndex = "1", e._obj.appendChild(_);
    const d = e.render_data;
    function r() {
      let c = e.get_visible_events();
      c.sort(function(p, u) {
        return p.start_date.valueOf() == u.start_date.valueOf() ? p.id > u.id ? 1 : -1 : p.start_date > u.start_date ? 1 : -1;
      });
      let h = "<div " + e._waiAria.mapAttrString() + " class='dhx_map_area'>";
      for (let p = 0; p < c.length; p++) {
        let u = c[p], m = u.id == e._selected_event_id ? "dhx_map_line highlight" : "dhx_map_line", l = u.color ? "--dhx-scheduler-event-background:" + u.color + ";" : "", f = u.textColor ? "--dhx-scheduler-event-color:" + u.textColor + ";" : "", g = e._waiAria.mapRowAttrString(u), x = e._waiAria.mapDetailsBtnString();
        h += "<div " + g + " class='" + m + "' event_id='" + u.id + "' " + e.config.event_attribute + "='" + u.id + "' style='" + l + f + (u._text_style || "") + " width: " + (e.xy.map_date_width + e.xy.map_description_width + 2) + "px;'><div class='dhx_map_event_time' style='width: " + e.xy.map_date_width + "px;' >" + e.templates.map_time(u.start_date, u.end_date, u) + "</div>", h += `<div ${x} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`, h += "<div class='line_description' style='width:" + (e.xy.map_description_width - e.xy.map_icon_width) + "px;'>" + e.templates.map_text(u.start_date, u.end_date, u) + "</div></div>";
      }
      h += "<div class='dhx_v_border' style=" + (e.config.rtl ? "'right: " : "'left: ") + (e.xy.map_date_width - 1) + "px;'></div><div class='dhx_v_border_description'></div></div>", e._els.dhx_cal_data[0].scrollTop = 0, e._els.dhx_cal_data[0].innerHTML = h;
      let y = e._els.dhx_cal_data[0].firstChild.childNodes, b = e._getNavDateElement();
      b && (b.innerHTML = e.templates[e._mode + "_date"](e._min_date, e._max_date, e._mode)), e._rendered = [];
      for (let p = 0; p < y.length - 2; p++)
        e._rendered[p] = y[p];
    }
    e.render_data = function(c, h) {
      if (this._mode != "map")
        return d.apply(this, arguments);
      {
        r();
        let y = e.get_visible_events();
        i && (i.clearEventMarkers(), y.forEach((b) => i == null ? void 0 : i.addEventMarker(b)));
      }
    }, e.map_view = function(c) {
      e._els.dhx_cal_data[0].style.width = e.xy.map_date_width + e.xy.map_description_width + 1 + "px", e._min_date = e.config.map_start || e._currentDate(), e._max_date = e.config.map_end || e.date.add(e._currentDate(), 1, "year"), e._table_view = !0, function(p) {
        if (p) {
          const u = e.locale.labels;
          e._els.dhx_cal_header[0].innerHTML = "<div class='dhx_map_head' style='width: " + (e.xy.map_date_width + e.xy.map_description_width + 2) + "px;' ><div class='headline_date' style='width: " + e.xy.map_date_width + "px;'>" + u.date + "</div><div class='headline_description' style='width: " + e.xy.map_description_width + "px;'>" + u.description + "</div></div>", e._table_view = !0, e.set_sizes();
        }
      }(c);
      let h = document.getElementById("mapContainer");
      var y, b;
      (function(p) {
        let u = document.getElementById(p);
        if (u) {
          const m = e.$container.querySelector(".dhx_cal_navline").offsetHeight;
          let l = e.$container.querySelector(".dhx_cal_data").offsetHeight + e.$container.querySelector(".dhx_cal_header").offsetHeight;
          l < 0 && (l = 0);
          let f = e._x - e.xy.map_date_width - e.xy.map_description_width - 1;
          f < 0 && (f = 0), u.style.height = l + "px", u.style.width = f + "px", u.style.position = "absolute", u.style.top = m + "px", e.config.rtl ? u.style.marginRight = e.xy.map_date_width + e.xy.map_description_width + 1 + "px" : u.style.marginLeft = e.xy.map_date_width + e.xy.map_description_width + 1 + "px", u.style.marginTop = e.xy.nav_height + 2 + "px";
        }
      })("mapContainer"), c && h ? (_.style.display = "block", r(), e.config.map_view_provider == e.ext.mapView.currentAdapter ? (i == null || i.destroy(h), s(e), i == null || i.initialize(h, e.config.map_settings)) : (i == null || i.destroy(h), s(e), i == null || i.initialize(h, e.config.map_settings), e.ext.mapView.currentAdapter = e.config.map_view_provider), i && (y = e.config.map_settings, b = i, y.resolve_user_location ? navigator.geolocation && navigator.geolocation.getCurrentPosition(function(p) {
        b.setView(p.coords.latitude, p.coords.longitude, y.zoom_after_resolve || y.initial_zoom);
      }) : b.setView(y.initial_position.lat, y.initial_position.lng, y.initial_zoom))) : (_.style.display = "none", e._els.dhx_cal_data[0].style.width = "100%", i && h && (i.destroy(h), i = null, e.ext.mapView.currentAdapter = e.config.map_view_provider), t.forEach((p) => e.detachEvent(p)), t = []);
    }, e.attachEvent("onLocationError", function(c) {
      return alert("Location can't be found"), google.maps.LatLng(51.47784, -1492e-6);
    });
    let o = async function(c) {
      if (i) {
        const h = await i.resolveAddress(c.event_location);
        h.lat && h.lng ? (c.lat = +h.lat, c.lng = +h.lng) : (e.callEvent("onLocationError", [c.id]), c.lng = e.config.map_settings.error_position.lng, c.lat = e.config.map_settings.error_position.lat), e._latLngUpdate = !0, e.callEvent("onEventChanged", [c.id, c]);
      }
    };
    e._event_resolve_delay = 1500, e.attachEvent("onEventLoading", function(c) {
      return c.lat && c.lng && (c.lat = +c.lat, c.lng = +c.lng), e.config.map_settings.resolve_event_location && c.event_location && !c.lat && !c.lng && (e._event_resolve_delay += 1500, function(h, y, b, p) {
        setTimeout(function() {
          if (e.$destroyed)
            return !0;
          let u = h.apply(y, b);
          return h = y = b = null, u;
        }, p || 1);
      }(o, this, [c], e._event_resolve_delay)), !0;
    });
  });
}, minical: function(e) {
  const i = e._createDomEventScope();
  e.config.minicalendar = { mark_events: !0 }, e._synced_minicalendars = [], e.renderCalendar = function(t, a, s) {
    var n = null, _ = t.date || e._currentDate();
    if (typeof _ == "string" && (_ = this.templates.api_date(_)), a)
      n = this._render_calendar(a.parentNode, _, t, a), e.unmarkCalendar(n);
    else {
      var d = t.container, r = t.position;
      if (typeof d == "string" && (d = document.getElementById(d)), typeof r == "string" && (r = document.getElementById(r)), r && r.left === void 0 && r.right === void 0) {
        var o = e.$domHelpers.getOffset(r);
        r = { top: o.top + r.offsetHeight, left: o.left };
      }
      d || (d = e._get_def_cont(r)), (n = this._render_calendar(d, _, t)).$_eventAttached || (n.$_eventAttached = !0, i.attach(n, "click", (function(f) {
        var g = f.target || f.srcElement, x = e.$domHelpers;
        if (x.closest(g, ".dhx_month_head") && !x.closest(g, ".dhx_after") && !x.closest(g, ".dhx_before")) {
          var w = x.closest(g, "[data-cell-date]").getAttribute("data-cell-date"), E = e.templates.parse_date(w);
          e.unmarkCalendar(this), e.markCalendar(this, E, "dhx_calendar_click"), this._last_date = E, this.conf.events && this.conf.events.onDateClick && this.conf.events.onDateClick.call(this, E, f), this.conf.handler && this.conf.handler.call(e, E, this);
        }
      }).bind(n)), i.attach(n, "mouseover", (function(f) {
        const g = f.target;
        if (g.classList.contains("dhx_cal_month_cell")) {
          var x = g.getAttribute("data-cell-date"), w = e.templates.parse_date(x);
          this.conf.events && this.conf.events.onDateMouseOver && this.conf.events.onDateMouseOver.call(this, w, f);
        }
      }).bind(n)));
    }
    if (e.config.minicalendar.mark_events)
      for (var c = e.date.month_start(_), h = e.date.add(c, 1, "month"), y = this.getEvents(c, h), b = this["filter_" + this._mode], p = {}, u = 0; u < y.length; u++) {
        var m = y[u];
        if (!b || b(m.id, m)) {
          var l = m.start_date;
          for (l.valueOf() < c.valueOf() && (l = c), l = e.date.date_part(new Date(l.valueOf())); l < m.end_date && (p[+l] || (p[+l] = !0, this.markCalendar(n, l, "dhx_year_event")), !((l = this.date.add(l, 1, "day")).valueOf() >= h.valueOf())); )
            ;
        }
      }
    return this._markCalendarCurrentDate(n), n.conf = t, t.sync && !s && this._synced_minicalendars.push(n), n.conf._on_xle_handler || (n.conf._on_xle_handler = e.attachEvent("onXLE", function() {
      e.updateCalendar(n, n.conf.date);
    })), this.config.wai_aria_attributes && this.config.wai_aria_application_role && n.setAttribute("role", "application"), n;
  }, e._get_def_cont = function(t) {
    return this._def_count || (this._def_count = document.createElement("div"), this._def_count.className = "dhx_minical_popup", e.event(this._def_count, "click", function(a) {
      a.cancelBubble = !0;
    }), document.body.appendChild(this._def_count)), t.left && (this._def_count.style.left = t.left + "px"), t.right && (this._def_count.style.right = t.right + "px"), t.top && (this._def_count.style.top = t.top + "px"), t.bottom && (this._def_count.style.bottom = t.bottom + "px"), this._def_count._created = /* @__PURE__ */ new Date(), this._def_count;
  }, e._locateCalendar = function(t, a) {
    if (typeof a == "string" && (a = e.templates.api_date(a)), +a > +t._max_date || +a < +t._min_date)
      return null;
    for (var s = t.querySelector(".dhx_year_body").childNodes[0], n = 0, _ = new Date(t._min_date); +this.date.add(_, 1, "week") <= +a; )
      _ = this.date.add(_, 1, "week"), n++;
    var d = e.config.start_on_monday, r = (a.getDay() || (d ? 7 : 0)) - (d ? 1 : 0);
    const o = s.querySelector(`.dhx_cal_month_row:nth-child(${n + 1}) .dhx_cal_month_cell:nth-child(${r + 1})`);
    return o ? o.firstChild : null;
  }, e.markCalendar = function(t, a, s) {
    var n = this._locateCalendar(t, a);
    n && (n.className += " " + s);
  }, e.unmarkCalendar = function(t, a, s) {
    if (s = s || "dhx_calendar_click", a = a || t._last_date) {
      var n = this._locateCalendar(t, a);
      n && (n.className = (n.className || "").replace(RegExp(s, "g")));
    }
  }, e._week_template = function(t) {
    for (var a = t || 250, s = 0, n = document.createElement("div"), _ = this.date.week_start(e._currentDate()), d = 0; d < 7; d++)
      this._cols[d] = Math.floor(a / (7 - d)), this._render_x_header(d, s, _, n), _ = this.date.add(_, 1, "day"), a -= this._cols[d], s += this._cols[d];
    return n.lastChild.className += " dhx_scale_bar_last", n;
  }, e.updateCalendar = function(t, a) {
    if (t.conf.date && t.conf.events && t.conf.events.onBeforeMonthChange && t.conf.events.onBeforeMonthChange.call(t, t.conf.date, a, t) === !1)
      return;
    const s = t.conf.date;
    t.conf.date = a, this.renderCalendar(t.conf, t, !0), t.conf.events && t.conf.events.onMonthChange && t.conf.events.onMonthChange.call(t, s, a);
  }, e._mini_cal_arrows = ["&nbsp;", "&nbsp;"], e._render_calendar = function(t, a, s, n) {
    var _ = e.templates, d = this._cols;
    this._cols = [];
    var r = this._mode;
    this._mode = "calendar";
    var o = this._colsS;
    this._colsS = { height: 0 };
    var c = new Date(this._min_date), h = new Date(this._max_date), y = new Date(e._date), b = _.month_day, p = this._ignores_detected;
    this._ignores_detected = 0, _.month_day = _.calendar_date, a = this.date.month_start(a);
    var u, m = this._week_template(t.offsetWidth - 1 - this.config.minicalendar.padding);
    n ? u = n : ((u = document.createElement("div")).className = "dhx_cal_container dhx_mini_calendar", this.config.rtl && (u.className += " dhx_cal_container_rtl")), u.setAttribute("date", this._helpers.formatDate(a)), u.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid" + (e.config.rtl ? " dhx_grid_rtl'>" : "'>") + "<div class='dhx_year_week'>" + (m ? m.innerHTML : "") + "</div><div class='dhx_year_body'></div></div>";
    var l = u.querySelector(".dhx_year_month"), f = u.querySelector(".dhx_year_week"), g = u.querySelector(".dhx_year_body");
    if (l.innerHTML = this.templates.calendar_month(a), s.navigation)
      for (var x = function(z, $) {
        var q = e.date.add(z._date, $, "month");
        e.updateCalendar(z, q), e._date.getMonth() == z._date.getMonth() && e._date.getFullYear() == z._date.getFullYear() && e._markCalendarCurrentDate(z);
      }, w = ["dhx_cal_prev_button", "dhx_cal_next_button"], E = ["left:1px;top:4px;position:absolute;", "left:auto; right:1px;top:4px;position:absolute;"], k = [-1, 1], S = function(z) {
        return function() {
          if (s.sync)
            for (var $ = e._synced_minicalendars, q = 0; q < $.length; q++)
              x($[q], z);
          else
            e.config.rtl && (z = -z), x(u, z);
        };
      }, v = [e.locale.labels.prev, e.locale.labels.next], D = 0; D < 2; D++) {
        var M = document.createElement("div");
        M.className = w[D], e._waiAria.headerButtonsAttributes(M, v[D]), M.style.cssText = E[D], M.innerHTML = this._mini_cal_arrows[D], l.appendChild(M), i.attach(M, "click", S(k[D]));
      }
    u._date = new Date(a), u.week_start = (a.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;
    var N = u._min_date = this.date.week_start(a);
    u._max_date = this.date.add(u._min_date, 6, "week"), this._reset_month_scale(g, a, N, 6), n || t.appendChild(u), f.style.height = f.childNodes[0].offsetHeight - 1 + "px";
    var T = e.uid();
    e._waiAria.minicalHeader(l, T), e._waiAria.minicalGrid(u.querySelector(".dhx_year_grid"), T), e._waiAria.minicalRow(f);
    for (var A = f.querySelectorAll(".dhx_scale_bar"), C = 0; C < A.length; C++)
      e._waiAria.minicalHeadCell(A[C]);
    var O = g.querySelectorAll(".dhx_cal_month_cell"), H = new Date(N);
    for (C = 0; C < O.length; C++)
      e._waiAria.minicalDayCell(O[C], new Date(H)), H = e.date.add(H, 1, "day");
    return e._waiAria.minicalHeader(l, T), this._cols = d, this._mode = r, this._colsS = o, this._min_date = c, this._max_date = h, e._date = y, _.month_day = b, this._ignores_detected = p, u;
  }, e.destroyCalendar = function(t, a) {
    !t && this._def_count && this._def_count.firstChild && (a || (/* @__PURE__ */ new Date()).valueOf() - this._def_count._created.valueOf() > 500) && (t = this._def_count.firstChild), t && (i.detachAll(), t.innerHTML = "", t.parentNode && t.parentNode.removeChild(t), this._def_count && (this._def_count.style.top = "-1000px"), t.conf && t.conf._on_xle_handler && e.detachEvent(t.conf._on_xle_handler));
  }, e.isCalendarVisible = function() {
    return !!(this._def_count && parseInt(this._def_count.style.top, 10) > 0) && this._def_count;
  }, e.attachEvent("onTemplatesReady", function() {
    e.event(document.body, "click", function() {
      e.destroyCalendar();
    });
  }, { once: !0 }), e.form_blocks.calendar_time = { render: function(t) {
    var a = "<span class='dhx_minical_input_wrapper'><input class='dhx_readonly dhx_minical_input' type='text' readonly='true'></span>", s = e.config, n = this.date.date_part(e._currentDate()), _ = 1440, d = 0;
    s.limit_time_select && (d = 60 * s.first_hour, _ = 60 * s.last_hour + 1), n.setHours(d / 60), t._time_values = [], a += " <select class='dhx_lightbox_time_select'>";
    for (var r = d; r < _; r += 1 * this.config.time_step)
      a += "<option value='" + r + "'>" + this.templates.time_picker(n) + "</option>", t._time_values.push(r), n = this.date.add(n, this.config.time_step, "minute");
    return "<div class='dhx_section_time dhx_lightbox_minical'>" + (a += "</select>") + "<span class='dhx_lightbox_minical_spacer'> &nbsp;&ndash;&nbsp; </span>" + a + "</div>";
  }, set_value: function(t, a, s, n) {
    var _, d, r = t.getElementsByTagName("input"), o = t.getElementsByTagName("select"), c = function(l, f, g) {
      e.event(l, "click", function() {
        e.destroyCalendar(null, !0), e.renderCalendar({ position: l, date: new Date(this._date), navigation: !0, handler: function(x) {
          l.value = e.templates.calendar_time(x), l._date = new Date(x), e.destroyCalendar(), e.config.event_duration && e.config.auto_end_date && g === 0 && p();
        } });
      });
    };
    if (e.config.full_day) {
      if (!t._full_day) {
        var h = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + e.locale.labels.full_day + "&nbsp;</label></input>";
        e.config.wide_form || (h = t.previousSibling.innerHTML + h), t.previousSibling.innerHTML = h, t._full_day = !0;
      }
      var y = t.previousSibling.getElementsByTagName("input")[0], b = e.date.time_part(s.start_date) === 0 && e.date.time_part(s.end_date) === 0;
      y.checked = b, o[0].disabled = y.checked, o[1].disabled = y.checked, y.$_eventAttached || (y.$_eventAttached = !0, e.event(y, "click", function() {
        if (y.checked === !0) {
          var l = {};
          e.form_blocks.calendar_time.get_value(t, l), _ = e.date.date_part(l.start_date), (+(d = e.date.date_part(l.end_date)) == +_ || +d >= +_ && (s.end_date.getHours() !== 0 || s.end_date.getMinutes() !== 0)) && (d = e.date.add(d, 1, "day"));
        } else
          _ = null, d = null;
        var f = _ || s.start_date, g = d || s.end_date;
        u(r[0], f), u(r[1], g), o[0].value = 60 * f.getHours() + f.getMinutes(), o[1].value = 60 * g.getHours() + g.getMinutes(), o[0].disabled = y.checked, o[1].disabled = y.checked;
      }));
    }
    if (e.config.event_duration && e.config.auto_end_date) {
      var p = function() {
        e.config.auto_end_date && e.config.event_duration && (_ = e.date.add(r[0]._date, o[0].value, "minute"), d = new Date(_.getTime() + 60 * e.config.event_duration * 1e3), r[1].value = e.templates.calendar_time(d), r[1]._date = e.date.date_part(new Date(d)), o[1].value = 60 * d.getHours() + d.getMinutes());
      };
      o[0].$_eventAttached || o[0].addEventListener("change", p);
    }
    function u(l, f, g) {
      c(l, f, g), l.value = e.templates.calendar_time(f), l._date = e.date.date_part(new Date(f));
    }
    function m(l) {
      for (var f = n._time_values, g = 60 * l.getHours() + l.getMinutes(), x = g, w = !1, E = 0; E < f.length; E++) {
        var k = f[E];
        if (k === g) {
          w = !0;
          break;
        }
        k < g && (x = k);
      }
      return w || x ? w ? g : x : -1;
    }
    u(r[0], s.start_date, 0), u(r[1], s.end_date, 1), c = function() {
    }, o[0].value = m(s.start_date), o[1].value = m(s.end_date);
  }, get_value: function(t, a) {
    var s = t.getElementsByTagName("input"), n = t.getElementsByTagName("select");
    return a.start_date = e.date.add(s[0]._date, n[0].value, "minute"), a.end_date = e.date.add(s[1]._date, n[1].value, "minute"), a.end_date <= a.start_date && (a.end_date = e.date.add(a.start_date, e.config.time_step, "minute")), { start_date: new Date(a.start_date), end_date: new Date(a.end_date) };
  }, focus: function(t) {
  } }, e.linkCalendar = function(t, a) {
    var s = function() {
      var n = e._date, _ = new Date(n.valueOf());
      return a && (_ = a(_)), _.setDate(1), e.updateCalendar(t, _), !0;
    };
    e.attachEvent("onViewChange", s), e.attachEvent("onXLE", s), e.attachEvent("onEventAdded", s), e.attachEvent("onEventChanged", s), e.attachEvent("onEventDeleted", s), s();
  }, e._markCalendarCurrentDate = function(t) {
    var a = e.getState(), s = a.min_date, n = a.max_date, _ = a.mode, d = e.date.month_start(new Date(t._date)), r = e.date.add(d, 1, "month");
    if (!({ month: !0, year: !0, agenda: !0, grid: !0 }[_] || s.valueOf() <= d.valueOf() && n.valueOf() >= r.valueOf()))
      for (var o = s; o.valueOf() < n.valueOf(); )
        d.valueOf() <= o.valueOf() && r > o && e.markCalendar(t, o, "dhx_calendar_click"), o = e.date.add(o, 1, "day");
  }, e.attachEvent("onEventCancel", function() {
    e.destroyCalendar(null, !0);
  }), e.attachEvent("onDestroy", function() {
    e.destroyCalendar();
  });
}, monthheight: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    e.xy.scroll_width = 0;
    var i = e.render_view_data;
    e.render_view_data = function() {
      var a = this._els.dhx_cal_data[0];
      a.firstChild._h_fix = !0, i.apply(e, arguments);
      var s = parseInt(a.style.height);
      a.style.height = "1px", a.style.height = a.scrollHeight + "px", this._obj.style.height = this._obj.clientHeight + a.scrollHeight - s + "px";
    };
    var t = e._reset_month_scale;
    e._reset_month_scale = function(a, s, n, _) {
      var d = { clientHeight: 100 };
      t.apply(e, [d, s, n, _]), a.innerHTML = d.innerHTML;
    };
  });
}, multisection: function(e) {
  e.config.multisection = !0, e.config.multisection_shift_all = !0, e.config.section_delimiter = ",", e.attachEvent("onSchedulerReady", function() {
    Ot(e);
    var i = e._update_unit_section;
    e._update_unit_section = function(d) {
      return e._update_sections(d, i);
    };
    var t = e._update_timeline_section;
    e._update_timeline_section = function(d) {
      return e._update_sections(d, t);
    }, e.isMultisectionEvent = function(d) {
      return !(!d || !this._get_multisection_view()) && this._get_event_sections(d).length > 1;
    }, e._get_event_sections = function(d) {
      var r = d[this._get_section_property()] || "";
      return this._parse_event_sections(r);
    }, e._parse_event_sections = function(d) {
      return d instanceof Array ? d : d.toString().split(e.config.section_delimiter);
    }, e._clear_copied_events(), e._split_events = function(d) {
      var r = [], o = this._get_multisection_view();
      if (o)
        for (var c = 0; c < d.length; c++)
          e._split_one_event(d[c], o, r);
      else
        r = d;
      return r;
    }, e._split_one_event = function(d, r, o) {
      const c = this._get_event_sections(d), h = this._get_section_property();
      if (c.length > 1)
        for (var y = 0; y < c.length; y++) {
          if (r.order[c[y]] === void 0)
            continue;
          const b = e._copy_event(d);
          b[h] = c[y], o.push(b);
        }
      else
        o.push(d);
    }, e._get_multisection_view = function() {
      return !!this.config.multisection && e._get_section_view();
    };
    var a = e.get_visible_events;
    e.get_visible_events = function(d) {
      this._clear_copied_events();
      var r = a.apply(this, arguments);
      if (this._get_multisection_view()) {
        r = this._split_events(r);
        for (var o = 0; o < r.length; o++)
          this.is_visible_events(r[o]) || (r.splice(o, 1), o--);
        this._register_copies_array(r);
      }
      return r;
    }, e._rendered_events = {};
    var s = e.render_view_data;
    e.render_view_data = function(d, r) {
      return this._get_multisection_view() && d && (d = this._split_events(d), this._restore_render_flags(d)), s.apply(this, [d, r]);
    }, e._update_sections = function(d, r) {
      var o = d.view, c = d.event, h = d.pos;
      if (e.isMultisectionEvent(c)) {
        if (e._drag_event._orig_section || (e._drag_event._orig_section = h.section), e._drag_event._orig_section != h.section) {
          var y = o.order[h.section] - o.order[e._drag_event._orig_section];
          if (y) {
            var b = this._get_event_sections(c), p = [], u = !0;
            if (e.config.multisection_shift_all)
              for (var m = 0; m < b.length; m++) {
                if ((l = e._shift_sections(o, b[m], y)) === null) {
                  p = b, u = !1;
                  break;
                }
                p[m] = l;
              }
            else
              for (m = 0; m < b.length; m++) {
                if (b[m] == h.section) {
                  p = b, u = !1;
                  break;
                }
                if (b[m] == e._drag_event._orig_section) {
                  var l;
                  if ((l = e._shift_sections(o, b[m], y)) === null) {
                    p = b, u = !1;
                    break;
                  }
                  p[m] = l;
                } else
                  p[m] = b[m];
              }
            u && (e._drag_event._orig_section = h.section), c[e._get_section_property()] = p.join(e.config.section_delimiter);
          }
        }
      } else
        r.apply(e, [d]);
    }, e._shift_sections = function(d, r, o) {
      for (var c = null, h = d.y_unit || d.options, y = 0; y < h.length; y++)
        if (h[y].key == r) {
          c = y;
          break;
        }
      var b = h[c + o];
      return b ? b.key : null;
    };
    var n = e._get_blocked_zones;
    e._get_blocked_zones = function(d, r, o, c, h) {
      if (r && this.config.multisection) {
        r = this._parse_event_sections(r);
        for (var y = [], b = 0; b < r.length; b++)
          y = y.concat(n.apply(this, [d, r[b], o, c, h]));
        return y;
      }
      return n.apply(this, arguments);
    };
    var _ = e._check_sections_collision;
    e._check_sections_collision = function(d, r) {
      if (this.config.multisection && this._get_section_view()) {
        d = this._split_events([d]), r = this._split_events([r]);
        for (var o = !1, c = 0, h = d.length; c < h && !o; c++)
          for (var y = 0, b = r.length; y < b; y++)
            if (_.apply(this, [d[c], r[y]])) {
              o = !0;
              break;
            }
        return o;
      }
      return _.apply(this, arguments);
    };
  });
}, multiselect: function(e) {
  e.form_blocks.multiselect = { render: function(i) {
    var t = "dhx_multi_select_control dhx_multi_select_" + i.name;
    i.vertical && (t += " dhx_multi_select_control_vertical");
    for (var a = "<div class='" + t + "' style='overflow: auto; height: " + i.height + "px; position: relative;' >", s = 0; s < i.options.length; s++)
      a += "<label><input type='checkbox' value='" + i.options[s].key + "'/>" + i.options[s].label + "</label>";
    return a += "</div>";
  }, set_value: function(i, t, a, s) {
    for (var n = i.getElementsByTagName("input"), _ = 0; _ < n.length; _++)
      n[_].checked = !1;
    function d(y) {
      for (var b = i.getElementsByTagName("input"), p = 0; p < b.length; p++)
        b[p].checked = !!y[b[p].value];
    }
    var r = {};
    if (a[s.map_to]) {
      var o = (a[s.map_to] + "").split(s.delimiter || e.config.section_delimiter || ",");
      for (_ = 0; _ < o.length; _++)
        r[o[_]] = !0;
      d(r);
    } else {
      if (e._new_event || !s.script_url)
        return;
      var c = document.createElement("div");
      c.className = "dhx_loading", c.style.cssText = "position: absolute; top: 40%; left: 40%;", i.appendChild(c);
      var h = [s.script_url, s.script_url.indexOf("?") == -1 ? "?" : "&", "dhx_crosslink_" + s.map_to + "=" + a.id + "&uid=" + e.uid()].join("");
      e.ajax.get(h, function(y) {
        var b = function(p) {
          try {
            for (var u = JSON.parse(p.xmlDoc.responseText), m = {}, l = 0; l < u.length; l++) {
              var f = u[l];
              m[f.value || f.key || f.id] = !0;
            }
            return m;
          } catch {
            return null;
          }
        }(y);
        b || (b = function(p, u) {
          for (var m = e.ajax.xpath("//data/item", p.xmlDoc), l = {}, f = 0; f < m.length; f++)
            l[m[f].getAttribute(u.map_to)] = !0;
          return l;
        }(y, s)), d(b), i.removeChild(c);
      });
    }
  }, get_value: function(i, t, a) {
    for (var s = [], n = i.getElementsByTagName("input"), _ = 0; _ < n.length; _++)
      n[_].checked && s.push(n[_].value);
    return s.join(a.delimiter || e.config.section_delimiter || ",");
  }, focus: function(i) {
  } };
}, multisource: function(e) {
  var i = e._load;
  e._load = function(t, a) {
    if (typeof (t = t || this._load_url) == "object")
      for (var s = function(_) {
        var d = function() {
        };
        return d.prototype = _, d;
      }(this._loaded), n = 0; n < t.length; n++)
        this._loaded = new s(), i.call(this, t[n], a);
    else
      i.apply(this, arguments);
  };
}, mvc: function(e) {
  var i, t = { use_id: !1 };
  function a(_) {
    var d = {};
    for (var r in _)
      r.indexOf("_") !== 0 && (d[r] = _[r]);
    return t.use_id || delete d.id, d;
  }
  function s(_) {
    _._not_render = !1, _._render_wait && _.render_view_data(), _._loading = !1, _.callEvent("onXLE", []);
  }
  function n(_) {
    return t.use_id ? _.id : _.cid;
  }
  e.backbone = function(_, d) {
    d && (t = d), _.bind("change", function(c, h) {
      var y = n(c), b = e._events[y] = c.toJSON();
      b.id = y, e._init_event(b), clearTimeout(i), i = setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.updateView();
      }, 1);
    }), _.bind("remove", function(c, h) {
      var y = n(c);
      e._events[y] && e.deleteEvent(y);
    });
    var r = [];
    function o() {
      if (e.$destroyed)
        return !0;
      r.length && (e.parse(r, "json"), r = []);
    }
    _.bind("add", function(c, h) {
      var y = n(c);
      if (!e._events[y]) {
        var b = c.toJSON();
        b.id = y, e._init_event(b), r.push(b), r.length == 1 && setTimeout(o, 1);
      }
    }), _.bind("request", function(c) {
      var h;
      c instanceof Backbone.Collection && ((h = e)._loading = !0, h._not_render = !0, h.callEvent("onXLS", []));
    }), _.bind("sync", function(c) {
      c instanceof Backbone.Collection && s(e);
    }), _.bind("error", function(c) {
      c instanceof Backbone.Collection && s(e);
    }), e.attachEvent("onEventCreated", function(c) {
      var h = new _.model(e.getEvent(c));
      return e._events[c] = h.toJSON(), e._events[c].id = c, !0;
    }), e.attachEvent("onEventAdded", function(c) {
      if (!_.get(c)) {
        var h = a(e.getEvent(c)), y = new _.model(h), b = n(y);
        b != c && this.changeEventId(c, b), _.add(y), _.trigger("scheduler:add", y);
      }
      return !0;
    }), e.attachEvent("onEventChanged", function(c) {
      var h = _.get(c), y = a(e.getEvent(c));
      return h.set(y), _.trigger("scheduler:change", h), !0;
    }), e.attachEvent("onEventDeleted", function(c) {
      var h = _.get(c);
      return h && (_.trigger("scheduler:remove", h), _.remove(c)), !0;
    });
  };
}, outerdrag: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    var i, t = new dhtmlDragAndDropObject(), a = t.stopDrag;
    function s(n, _, d, r) {
      if (!e.checkEvent("onBeforeExternalDragIn") || e.callEvent("onBeforeExternalDragIn", [n, _, d, r, i])) {
        var o = e.attachEvent("onEventCreated", function(p) {
          e.callEvent("onExternalDragIn", [p, n, i]) || (this._drag_mode = this._drag_id = null, this.deleteEvent(p));
        }), c = e.getActionData(i), h = { start_date: new Date(c.date) };
        if (e.matrix && e.matrix[e._mode]) {
          var y = e.matrix[e._mode];
          h[y.y_property] = c.section;
          var b = e._locate_cell_timeline(i);
          h.start_date = y._trace_x[b.x], h.end_date = e.date.add(h.start_date, y.x_step, y.x_unit);
        }
        e._props && e._props[e._mode] && (h[e._props[e._mode].map_to] = c.section), e.addEventNow(h), e.detachEvent(o);
      }
    }
    t.stopDrag = function(n) {
      return i = n, a.apply(this, arguments);
    }, t.addDragLanding(e._els.dhx_cal_data[0], { _drag: function(n, _, d, r) {
      s(n, _, d, r);
    }, _dragIn: function(n, _) {
      return n;
    }, _dragOut: function(n) {
      return this;
    } }), dhtmlx.DragControl && dhtmlx.DragControl.addDrop(e._els.dhx_cal_data[0], { onDrop: function(n, _, d, r) {
      var o = dhtmlx.DragControl.getMaster(n);
      i = r, s(n, o, _, r.target || r.srcElement);
    }, onDragIn: function(n, _, d) {
      return _;
    } }, !0);
  });
}, pdf: function(e) {
  var i, t, a = new RegExp("<[^>]*>", "g"), s = new RegExp("<br[^>]*>", "g");
  function n(w) {
    return w.replace(s, `
`).replace(a, "");
  }
  function _(w, E) {
    w = parseFloat(w), E = parseFloat(E), isNaN(E) || (w -= E);
    var k = r(w);
    return w = w - k.width + k.cols * i, isNaN(w) ? "auto" : 100 * w / i;
  }
  function d(w, E, k) {
    w = parseFloat(w), E = parseFloat(E), !isNaN(E) && k && (w -= E);
    var S = r(w);
    return w = w - S.width + S.cols * i, isNaN(w) ? "auto" : 100 * w / (i - (isNaN(E) ? 0 : E));
  }
  function r(w) {
    for (var E = 0, k = e._els.dhx_cal_header[0].childNodes, S = k[1] ? k[1].childNodes : k[0].childNodes, v = 0; v < S.length; v++) {
      var D = S[v].style ? S[v] : S[v].parentNode, M = parseFloat(D.style.width);
      if (!(w > M))
        break;
      w -= M + 1, E += M + 1;
    }
    return { width: E, cols: v };
  }
  function o(w) {
    return w = parseFloat(w), isNaN(w) ? "auto" : 100 * w / t;
  }
  function c(w, E) {
    return (window.getComputedStyle ? window.getComputedStyle(w, null)[E] : w.currentStyle ? w.currentStyle[E] : null) || "";
  }
  function h(w, E) {
    for (var k = parseInt(w.style.left, 10), S = 0; S < e._cols.length; S++)
      if ((k -= e._cols[S]) < 0)
        return S;
    return E;
  }
  function y(w, E) {
    for (var k = parseInt(w.style.top, 10), S = 0; S < e._colsS.heights.length; S++)
      if (e._colsS.heights[S] > k)
        return S;
    return E;
  }
  function b(w) {
    return w ? "</" + w + ">" : "";
  }
  function p(w, E, k, S) {
    var v = "<" + w + " profile='" + E + "'";
    return k && (v += " header='" + k + "'"), S && (v += " footer='" + S + "'"), v += ">";
  }
  function u() {
    var w = "", E = e._mode;
    if (e.matrix && e.matrix[e._mode] && (E = e.matrix[e._mode].render == "cell" ? "matrix" : "timeline"), w += "<scale mode='" + E + "' today='" + e._els.dhx_cal_date[0].innerHTML + "'>", e._mode == "week_agenda")
      for (var k = e._els.dhx_cal_data[0].getElementsByTagName("DIV"), S = 0; S < k.length; S++)
        k[S].className == "dhx_wa_scale_bar" && (w += "<column>" + n(k[S].innerHTML) + "</column>");
    else if (e._mode == "agenda" || e._mode == "map")
      w += "<column>" + n((k = e._els.dhx_cal_header[0].childNodes[0].childNodes)[0].innerHTML) + "</column><column>" + n(k[1].innerHTML) + "</column>";
    else if (e._mode == "year")
      for (k = e._els.dhx_cal_data[0].childNodes, S = 0; S < k.length; S++)
        w += "<month label='" + n(k[S].querySelector(".dhx_year_month").innerHTML) + "'>", w += l(k[S].querySelector(".dhx_year_week").childNodes), w += m(k[S].querySelector(".dhx_year_body")), w += "</month>";
    else {
      w += "<x>", w += l(k = e._els.dhx_cal_header[0].childNodes), w += "</x>";
      var v = e._els.dhx_cal_data[0];
      if (e.matrix && e.matrix[e._mode]) {
        for (w += "<y>", S = 0; S < v.firstChild.rows.length; S++)
          w += "<row><![CDATA[" + n(v.firstChild.rows[S].cells[0].innerHTML) + "]]></row>";
        w += "</y>", t = v.firstChild.rows[0].cells[0].offsetHeight;
      } else if (v.firstChild.tagName == "TABLE")
        w += m(v);
      else {
        for (v = v.childNodes[v.childNodes.length - 1]; v.className.indexOf("dhx_scale_holder") == -1; )
          v = v.previousSibling;
        for (v = v.childNodes, w += "<y>", S = 0; S < v.length; S++)
          w += `
<row><![CDATA[` + n(v[S].innerHTML) + "]]></row>";
        w += "</y>", t = v[0].offsetHeight;
      }
    }
    return w += "</scale>";
  }
  function m(w) {
    for (var E = "", k = w.querySelectorAll("tr"), S = 0; S < k.length; S++) {
      for (var v = [], D = k[S].querySelectorAll("td"), M = 0; M < D.length; M++)
        v.push(D[M].querySelector(".dhx_month_head").innerHTML);
      E += `
<row height='` + D[0].offsetHeight + "'><![CDATA[" + n(v.join("|")) + "]]></row>", t = D[0].offsetHeight;
    }
    return E;
  }
  function l(w) {
    var E, k = "";
    e.matrix && e.matrix[e._mode] && (e.matrix[e._mode].second_scale && (E = w[1].childNodes), w = w[0].childNodes);
    for (var S = 0; S < w.length; S++)
      k += `
<column><![CDATA[` + n(w[S].innerHTML) + "]]></column>";
    if (i = w[0].offsetWidth, E) {
      var v = 0, D = w[0].offsetWidth, M = 1;
      for (S = 0; S < E.length; S++)
        k += `
<column second_scale='` + M + "'><![CDATA[" + n(E[S].innerHTML) + "]]></column>", (v += E[S].offsetWidth) >= D && (D += w[M] ? w[M].offsetWidth : 0, M++), i = E[0].offsetWidth;
    }
    return k;
  }
  function f(w) {
    var E = "", k = e._rendered, S = e.matrix && e.matrix[e._mode];
    if (e._mode == "agenda" || e._mode == "map")
      for (var v = 0; v < k.length; v++)
        E += "<event><head><![CDATA[" + n(k[v].childNodes[0].innerHTML) + "]]></head><body><![CDATA[" + n(k[v].childNodes[2].innerHTML) + "]]></body></event>";
    else if (e._mode == "week_agenda")
      for (v = 0; v < k.length; v++)
        E += "<event day='" + k[v].parentNode.getAttribute("day") + "'><body>" + n(k[v].innerHTML) + "</body></event>";
    else if (e._mode == "year")
      for (k = e.get_visible_events(), v = 0; v < k.length; v++) {
        var D = k[v].start_date;
        for (D.valueOf() < e._min_date.valueOf() && (D = e._min_date); D < k[v].end_date; ) {
          var M = D.getMonth() + 12 * (D.getFullYear() - e._min_date.getFullYear()) - e.week_starts._month, N = e.week_starts[M] + D.getDate() - 1, T = w ? c(e._get_year_cell(D), "color") : "", A = w ? c(e._get_year_cell(D), "backgroundColor") : "";
          if (E += "<event day='" + N % 7 + "' week='" + Math.floor(N / 7) + "' month='" + M + "' backgroundColor='" + A + "' color='" + T + "'></event>", (D = e.date.add(D, 1, "day")).valueOf() >= e._max_date.valueOf())
            break;
        }
      }
    else if (S && S.render == "cell")
      for (k = e._els.dhx_cal_data[0].getElementsByTagName("TD"), v = 0; v < k.length; v++)
        T = w ? c(k[v], "color") : "", E += `
<event><body backgroundColor='` + (A = w ? c(k[v], "backgroundColor") : "") + "' color='" + T + "'><![CDATA[" + n(k[v].innerHTML) + "]]></body></event>";
    else
      for (v = 0; v < k.length; v++) {
        var C, O;
        if (e.matrix && e.matrix[e._mode])
          C = _(k[v].style.left), O = _(k[v].offsetWidth) - 1;
        else {
          var H = e.config.use_select_menu_space ? 0 : 26;
          C = d(k[v].style.left, H, !0), O = d(k[v].style.width, H) - 1;
        }
        if (!isNaN(1 * O)) {
          var z = o(k[v].style.top), $ = o(k[v].style.height), q = k[v].className.split(" ")[0].replace("dhx_cal_", "");
          if (q !== "dhx_tooltip_line") {
            var R = e.getEvent(k[v].getAttribute(e.config.event_attribute));
            if (R) {
              N = R._sday;
              var U = R._sweek, Y = R._length || 0;
              if (e._mode == "month")
                $ = parseInt(k[v].offsetHeight, 10), z = parseInt(k[v].style.top, 10) - e.xy.month_head_height, N = h(k[v], N), U = y(k[v], U);
              else if (e.matrix && e.matrix[e._mode]) {
                N = 0, U = k[v].parentNode.parentNode.parentNode.rowIndex;
                var B = t;
                t = k[v].parentNode.offsetHeight, z = o(k[v].style.top), z -= 0.2 * z, t = B;
              } else {
                if (k[v].parentNode == e._els.dhx_cal_data[0])
                  continue;
                var V = e._els.dhx_cal_data[0].childNodes[0], W = parseFloat(V.className.indexOf("dhx_scale_holder") != -1 ? V.style.left : 0);
                C += _(k[v].parentNode.style.left, W);
              }
              E += `
<event week='` + U + "' day='" + N + "' type='" + q + "' x='" + C + "' y='" + z + "' width='" + O + "' height='" + $ + "' len='" + Y + "'>", q == "event" ? (E += "<header><![CDATA[" + n(k[v].childNodes[1].innerHTML) + "]]></header>", T = w ? c(k[v].childNodes[2], "color") : "", E += "<body backgroundColor='" + (A = w ? c(k[v].childNodes[2], "backgroundColor") : "") + "' color='" + T + "'><![CDATA[" + n(k[v].childNodes[2].innerHTML) + "]]></body>") : (T = w ? c(k[v], "color") : "", E += "<body backgroundColor='" + (A = w ? c(k[v], "backgroundColor") : "") + "' color='" + T + "'><![CDATA[" + n(k[v].innerHTML) + "]]></body>"), E += "</event>";
            }
          }
        }
      }
    return E;
  }
  function g(w, E, k, S, v, D) {
    var M = !1;
    S == "fullcolor" && (M = !0, S = "color"), S = S || "color";
    var N, T = "";
    if (w) {
      var A = e._date, C = e._mode;
      E = e.date[k + "_start"](E), E = e.date["get_" + k + "_end"] ? e.date["get_" + k + "_end"](E) : e.date.add(E, 1, k), T = p("pages", S, v, D);
      for (var O = new Date(w); +O < +E; O = this.date.add(O, 1, k))
        this.setCurrentView(O, k), T += ((N = "page") ? "<" + N + ">" : "") + u().replace("–", "-") + f(M) + b("page");
      T += b("pages"), this.setCurrentView(A, C);
    } else
      T = p("data", S, v, D) + u().replace("–", "-") + f(M) + b("data");
    return T;
  }
  function x(w, E, k, S, v, D, M) {
    (function(N, T) {
      var A = e.uid(), C = document.createElement("div");
      C.style.display = "none", document.body.appendChild(C), C.innerHTML = '<form id="' + A + '" method="post" target="_blank" action="' + T + '" accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><input type="hidden" name="mycoolxmlbody"/> </form>', document.getElementById(A).firstChild.value = encodeURIComponent(N), document.getElementById(A).submit(), C.parentNode.removeChild(C);
    })(typeof v == "object" ? function(N) {
      for (var T = "<data>", A = 0; A < N.length; A++)
        T += N[A].source.getPDFData(N[A].start, N[A].end, N[A].view, N[A].mode, N[A].header, N[A].footer);
      return T += "</data>", T;
    }(v) : g.apply(this, [w, E, k, v, D, M]), S);
  }
  e.getPDFData = g, e.toPDF = function(w, E, k, S) {
    return x.apply(this, [null, null, null, w, E, k, S]);
  }, e.toPDFRange = function(w, E, k, S, v, D, M) {
    return typeof w == "string" && (w = e.templates.api_date(w), E = e.templates.api_date(E)), x.apply(this, arguments);
  };
}, quick_info: function(e) {
  e.config.icons_select = ["icon_form", "icon_delete"], e.config.details_on_create = !0, e.config.show_quick_info = !0, e.xy.menu_width = 0;
  let i = null;
  function t(s) {
    const n = s.getBoundingClientRect(), _ = e.$container.getBoundingClientRect().bottom - n.bottom;
    _ < 0 && (s.style.top = `${parseFloat(s.style.top) + _}px`);
  }
  function a(s) {
    let n = 0, _ = 0, d = s;
    for (; d && d != e._obj; )
      n += d.offsetLeft, _ += d.offsetTop - d.scrollTop, d = d.offsetParent;
    return d ? { left: n, top: _, dx: n + s.offsetWidth / 2 > e._x / 2 ? 1 : 0, dy: _ + s.offsetHeight / 2 > e._y / 2 ? 1 : 0, width: s.offsetWidth, height: s.offsetHeight } : 0;
  }
  e.attachEvent("onSchedulerReady", function() {
    const s = e.$container;
    s._$quickInfoHandler || (s._$quickInfoHandler = !0, e.event(s, "mousedown", function(n) {
      const _ = n.target.closest(`[${e.config.event_attribute}]`);
      _ && (i = { id: _.getAttribute(e.config.event_attribute), position: a(_) });
    }), e.attachEvent("onDestroy", () => {
      delete s._$quickInfoHandler;
    }));
  }), e.attachEvent("onClick", function(s) {
    if (e.config.show_quick_info)
      return e.showQuickInfo(s), !0;
  }), function() {
    for (var s = ["onEmptyClick", "onViewChange", "onLightbox", "onBeforeEventDelete", "onBeforeDrag"], n = function() {
      return e.hideQuickInfo(!0), !0;
    }, _ = 0; _ < s.length; _++)
      e.attachEvent(s[_], n);
  }(), e.templates.quick_info_title = function(s, n, _) {
    return _.text.substr(0, 50);
  }, e.templates.quick_info_content = function(s, n, _) {
    return _.details || "";
  }, e.templates.quick_info_date = function(s, n, _) {
    return e.isOneDayEvent(_) && e.config.rtl ? e.templates.day_date(s, n, _) + " " + e.templates.event_header(n, s, _) : e.isOneDayEvent(_) ? e.templates.day_date(s, n, _) + " " + e.templates.event_header(s, n, _) : e.config.rtl ? e.templates.week_date(n, s, _) : e.templates.week_date(s, n, _);
  }, e.showQuickInfo = function(s) {
    if (s == this._quick_info_box_id || (this.hideQuickInfo(!0), this.callEvent("onBeforeQuickInfo", [s]) === !1))
      return;
    let n;
    n = i && i.id == s ? i.position : this._get_event_counter_part(s), n && (this._quick_info_box = this._init_quick_info(n), this._fill_quick_data(s), this._show_quick_info(n), this.callEvent("onQuickInfo", [s]));
  }, function() {
    function s(n) {
      n = n || "";
      var _, d = parseFloat(n), r = n.match(/m?s/);
      switch (r && (r = r[0]), r) {
        case "s":
          _ = 1e3 * d;
          break;
        case "ms":
          _ = d;
          break;
        default:
          _ = 0;
      }
      return _;
    }
    e.hideQuickInfo = function(n) {
      var _ = this._quick_info_box, d = this._quick_info_box_id;
      if (this._quick_info_box_id = 0, _ && _.parentNode) {
        var r = _.offsetWidth;
        if (e.config.quick_info_detached)
          return this.callEvent("onAfterQuickInfo", [d]), _.parentNode.removeChild(_);
        if (_.style.right == "auto" ? _.style.left = -r + "px" : _.style.right = -r + "px", n)
          _.parentNode.removeChild(_);
        else {
          var o;
          window.getComputedStyle ? o = window.getComputedStyle(_, null) : _.currentStyle && (o = _.currentStyle);
          var c = s(o["transition-delay"]) + s(o["transition-duration"]);
          setTimeout(function() {
            _.parentNode && _.parentNode.removeChild(_);
          }, c);
        }
        this.callEvent("onAfterQuickInfo", [d]);
      }
    };
  }(), e.event(window, "keydown", function(s) {
    s.keyCode == 27 && e.hideQuickInfo();
  }), e._show_quick_info = function(s) {
    var n = e._quick_info_box;
    e._obj.appendChild(n);
    var _ = n.offsetWidth, d = n.offsetHeight;
    if (e.config.quick_info_detached) {
      var r = s.left - s.dx * (_ - s.width);
      e.getView() && e.getView()._x_scroll && (e.config.rtl ? r += e.getView()._x_scroll : r -= e.getView()._x_scroll), r + _ > window.innerWidth && (r = window.innerWidth - _), r = Math.max(0, r), n.style.left = r + "px", n.style.top = s.top - (s.dy ? d : -s.height) + "px";
    } else {
      const o = e.$container.querySelector(".dhx_cal_data").offsetTop;
      n.style.top = o + 20 + "px", s.dx == 1 ? (n.style.right = "auto", n.style.left = -_ + "px", setTimeout(function() {
        n.style.left = "-10px";
      }, 1)) : (n.style.left = "auto", n.style.right = -_ + "px", setTimeout(function() {
        n.style.right = "-10px";
      }, 1)), n.className = n.className.replace(" dhx_qi_left", "").replace(" dhx_qi_right", "") + " dhx_qi_" + (s.dx == 1 ? "left" : "right");
    }
    n.ontransitionend = () => {
      t(n), n.ontransitionend = null;
    }, setTimeout(() => {
      t(n);
    }, 1);
  }, e.attachEvent("onTemplatesReady", function() {
    if (e.hideQuickInfo(), this._quick_info_box) {
      var s = this._quick_info_box;
      s.parentNode && s.parentNode.removeChild(s), this._quick_info_box = null;
    }
  }), e._quick_info_onscroll_handler = function(s) {
    e.hideQuickInfo();
  }, e._init_quick_info = function() {
    if (!this._quick_info_box) {
      var s = this._quick_info_box = document.createElement("div");
      this._waiAria.quickInfoAttr(s), s.className = "dhx_cal_quick_info", e.$testmode && (s.className += " dhx_no_animate"), e.config.rtl && (s.className += " dhx_quick_info_rtl");
      var n = `
		<div class="dhx_cal_qi_tcontrols">
			<a class="dhx_cal_qi_close_btn scheduler_icon close"></a>
		</div>
		<div class="dhx_cal_qi_title" ${this._waiAria.quickInfoHeaderAttrString()}>
				
				<div class="dhx_cal_qi_tcontent"></div>
				<div class="dhx_cal_qi_tdate"></div>
			</div>
			<div class="dhx_cal_qi_content"></div>`;
      n += '<div class="dhx_cal_qi_controls">';
      for (var _ = e.config.icons_select, d = 0; d < _.length; d++)
        n += `<div ${this._waiAria.quickInfoButtonAttrString(this.locale.labels[_[d]])} class="dhx_qi_big_icon ${_[d]}" title="${e.locale.labels[_[d]]}">
				<div class='dhx_menu_icon ${_[d]}'></div><div>${e.locale.labels[_[d]]}</div></div>`;
      n += "</div>", s.innerHTML = n, e.event(s, "click", function(r) {
        e._qi_button_click(r.target || r.srcElement);
      }), e.config.quick_info_detached && (e._detachDomEvent(e._els.dhx_cal_data[0], "scroll", e._quick_info_onscroll_handler), e.event(e._els.dhx_cal_data[0], "scroll", e._quick_info_onscroll_handler));
    }
    return this._quick_info_box;
  }, e._qi_button_click = function(s) {
    var n = e._quick_info_box;
    if (s && s != n)
      if (s.closest(".dhx_cal_qi_close_btn"))
        e.hideQuickInfo();
      else {
        var _ = e._getClassName(s);
        if (_.indexOf("_icon") != -1) {
          var d = e._quick_info_box_id;
          e._click.buttons[_.split(" ")[1].replace("icon_", "")](d);
        } else
          e._qi_button_click(s.parentNode);
      }
  }, e._get_event_counter_part = function(s) {
    return a(e.getRenderedEvent(s));
  }, e._fill_quick_data = function(s) {
    var n = e.getEvent(s), _ = e._quick_info_box;
    e._quick_info_box_id = s;
    var d = { content: e.templates.quick_info_title(n.start_date, n.end_date, n), date: e.templates.quick_info_date(n.start_date, n.end_date, n) };
    _.querySelector(".dhx_cal_qi_tcontent").innerHTML = `<span>${d.content}</span>`, _.querySelector(".dhx_cal_qi_tdate").innerHTML = d.date, e._waiAria.quickInfoHeader(_, [d.content, d.date].join(" "));
    var r = _.querySelector(".dhx_cal_qi_content");
    const o = e.templates.quick_info_content(n.start_date, n.end_date, n);
    o ? (r.classList.remove("dhx_hidden"), r.innerHTML = o) : r.classList.add("dhx_hidden");
  };
}, readonly: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    var i;
    e.form_blocks.recurring && (i = e.form_blocks.recurring.set_value);
    var t = e.config.buttons_left.slice(), a = e.config.buttons_right.slice();
    function s(d, r, o, c) {
      for (var h = r.getElementsByTagName(d), y = o.getElementsByTagName(d), b = y.length - 1; b >= 0; b--)
        if (o = y[b], c) {
          var p = document.createElement("span");
          p.className = "dhx_text_disabled", p.innerHTML = c(h[b]), o.parentNode.insertBefore(p, o), o.parentNode.removeChild(o);
        } else
          o.disabled = !0, r.checked && (o.checked = !0);
    }
    e.attachEvent("onBeforeLightbox", function(d) {
      if (this.config.readonly_form || this.getEvent(d).readonly ? this.config.readonly_active = !0 : (this.config.readonly_active = !1, e.config.buttons_left = t.slice(), e.config.buttons_right = a.slice(), e.form_blocks.recurring && (e.form_blocks.recurring.set_value = i)), this.config.readonly_active)
        for (var r = ["dhx_delete_btn", "dhx_save_btn"], o = [e.config.buttons_left, e.config.buttons_right], c = 0; c < r.length; c++)
          for (var h = r[c], y = 0; y < o.length; y++) {
            for (var b = o[y], p = -1, u = 0; u < b.length; u++)
              if (b[u] == h) {
                p = u;
                break;
              }
            p != -1 && b.splice(p, 1);
          }
      return this.resetLightbox(), !0;
    });
    var n = e._fill_lightbox;
    e._fill_lightbox = function() {
      var d = this.getLightbox();
      this.config.readonly_active && (d.style.visibility = "hidden", d.style.display = "block");
      var r = n.apply(this, arguments);
      if (this.config.readonly_active && (d.style.visibility = "", d.style.display = "none"), this.config.readonly_active) {
        var o = this.getLightbox(), c = this._lightbox_r = o.cloneNode(!0);
        c.id = e.uid(), c.className += " dhx_cal_light_readonly", s("textarea", o, c, function(h) {
          return h.value;
        }), s("input", o, c, !1), s("select", o, c, function(h) {
          return h.options.length ? h.options[Math.max(h.selectedIndex || 0, 0)].text : "";
        }), o.parentNode.insertBefore(c, o), this.showCover(c), e._lightbox && e._lightbox.parentNode.removeChild(e._lightbox), this._lightbox = c, e.config.drag_lightbox && e.event(c.firstChild, "mousedown", e._ready_to_dnd), e._init_lightbox_events(), this.setLightboxSize();
      }
      return r;
    };
    var _ = e.hide_lightbox;
    e.hide_lightbox = function() {
      return this._lightbox_r && (this._lightbox_r.parentNode.removeChild(this._lightbox_r), this._lightbox_r = this._lightbox = null), _.apply(this, arguments);
    };
  });
}, recurring: function(e) {
  function i(v) {
    return new Date(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds(), 0);
  }
  function t(v) {
    return !!v.rrule && !v.recurring_event_id;
  }
  function a(v) {
    return new Date(Date.UTC(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds()));
  }
  function s(v) {
    return new Date(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate(), v.getUTCHours(), v.getUTCMinutes(), v.getUTCSeconds());
  }
  function n(v) {
    v.rrule.includes(";UNTIL=") && (v.rrule = v.rrule.split(";UNTIL=")[0]);
    let D = Ve(`RRULE:${v.rrule};UNTIL=${m(s(v._end_date || v.end_date))}`, { dtstart: v.start_date }), M = new P(D.origOptions).toString().replace("RRULE:", "");
    M = M.split(`
`)[1], v.rrule = M;
  }
  function _(v, D) {
    D || (D = e.getEvent(v));
    let M = D.rrule.split(";"), N = [];
    for (let T = 0; T < M.length; T++) {
      let A = M[T].split("="), C = A[0], O = A[1];
      (C !== "BYDAY" || D.rrule.includes("WEEKLY") && O.length > 3) && (C === "UNTIL" && Ve(D.rrule).options.until.valueOf() < D.start_date.valueOf() && (D._end_date = D.end_date), N.push(C), N.push("="), N.push(O), N.push(";"));
    }
    N.pop(), D.rrule = N.join("");
  }
  var d;
  function r(v, D) {
    v._end_date = v.end_date, e._isExceptionFirstOccurrence(D) ? (v.start_date = D.start_date, v.end_date = new Date(D.start_date.valueOf() + 1e3 * v.duration), v._start_date = D.original_start, v._modified = !0) : (v.end_date = new Date(D.start_date.valueOf() + 1e3 * v.duration), v.start_date = D.start_date, v._firstOccurrence = !0), v._thisAndFollowing = D.id;
  }
  function o(v, D, M, N) {
    const T = M._modified ? N.id : v;
    e._events[T] = { ...N, text: D.text, duration: D.duration, start_date: D.start_date, rrule: D.rrule, end_date: N._end_date, _start_date: N.start_date, _thisAndFollowing: null, _end_date: null }, M._modified && delete e._events[v], e.callEvent("onEventChanged", [e._events[T].id, e._events[T]]);
  }
  function c(v) {
    for (const D in e._events)
      e._events[D].id == v.id && delete e._events[D];
  }
  function h(v, D) {
    for (let M in e._events) {
      let N = e._events[M];
      (N.recurring_event_id == v || e._is_virtual_event(N.id) && N.id.split("#")[0] == v) && (N.text = D.text, e.updateEvent(N.id));
    }
  }
  function y(v, D) {
    let M = v, N = new Date(D.original_start).valueOf();
    v = String(M).split("#") || D._pid_time || N;
    let T = e.uid(), A = v[1] ? v[1] : D._pid_time || N, C = e._copy_event(D);
    C.id = T, C.recurring_event_id = D.recurring_event_id || v[0], C.original_start = new Date(Number(A)), C.deleted = !0, e.addEvent(C);
  }
  function b() {
    for (const v in e._events)
      v === "$dnd_recurring_placeholder" && delete e._events[v];
    e.render();
  }
  function p(v, D) {
    const M = e.locale;
    v.find((T) => T.checked) || (v[0].checked = !0);
    const N = v.reduce((T, A) => (T[A.value] = A.callback, T), {});
    e.modalbox({ text: `<div class="dhx_edit_recurrence_options">
				${v.map((T) => `<label class="dhx_styled_radio">
					<input type="radio" value="${T.value}" name="option" ${T.checked ? "checked" : ""}>
					${T.label}
				</label>`).join("")}
			</div>`, type: "recurring_mode", title: M.labels.confirm_recurring, width: "auto", position: "middle", buttons: [{ label: M.labels.message_ok, value: "ok", css: "rec_ok" }, { label: M.labels.message_cancel, value: "cancel" }], callback: function(T, A) {
      if (D && D(T, A), T === "cancel")
        return;
      const C = A.target.closest(".scheduler_modal_box").querySelector("input[type='radio']:checked");
      let O;
      C && (O = C.value), O && N[O]();
    } });
  }
  function u() {
    const v = {};
    for (const D in e._events) {
      const M = e._events[D];
      M.recurring_event_id && M.original_start && (v[M.recurring_event_id] || (v[M.recurring_event_id] = {}), v[M.recurring_event_id][M.original_start.valueOf()] = M);
    }
    return v;
  }
  e._isFollowing = function(v) {
    let D = e.getEvent(v);
    return !(!D || !D._thisAndFollowing);
  }, e._isFirstOccurrence = function(v) {
    if (e._is_virtual_event(v.id)) {
      let D = v.id.split("#")[0];
      return e.getEvent(D).start_date.valueOf() === v.start_date.valueOf();
    }
  }, e._isExceptionFirstOccurrence = function(v) {
    if (e._is_modified_occurrence(v)) {
      let D = v.recurring_event_id, M = e.getEvent(D);
      return !(!v.original_start || !v.original_start.valueOf() || v.original_start.valueOf() !== M.start_date.valueOf());
    }
  }, e._rec_temp = [], e._rec_markers_pull = {}, e._rec_markers = {}, e._add_rec_marker = function(v, D) {
    v._pid_time = D, this._rec_markers[v.id] = v, this._rec_markers_pull[v.event_pid] || (this._rec_markers_pull[v.event_pid] = {}), this._rec_markers_pull[v.event_pid][D] = v;
  }, e._get_rec_marker = function(v, D) {
    let M = this._rec_markers_pull[D];
    return M ? M[v] : null;
  }, e._get_rec_markers = function(v) {
    return this._rec_markers_pull[v] || [];
  }, d = e.addEvent, e.addEvent = function(v, D, M, N, T) {
    var A = d.apply(this, arguments);
    if (A && e.getEvent(A)) {
      var C = e.getEvent(A);
      C.start_date && (C.start_date = i(C.start_date)), C.end_date && (C.end_date = i(C.end_date));
    }
    return A;
  }, e.attachEvent("onEventLoading", function(v) {
    return v.original_start && !v.original_start.getFullYear && (v.original_start = e.templates.parse_date(v.original_start)), !0;
  }), e.attachEvent("onEventIdChange", function(v, D) {
    if (!this._ignore_call) {
      this._ignore_call = !0, e._rec_markers[v] && (e._rec_markers[D] = e._rec_markers[v], delete e._rec_markers[v]), e._rec_markers_pull[v] && (e._rec_markers_pull[D] = e._rec_markers_pull[v], delete e._rec_markers_pull[v]);
      for (var M = 0; M < this._rec_temp.length; M++) {
        var N = this._rec_temp[M];
        this._is_virtual_event(N.id) && N.id.split("#")[0] == v && (N.recurring_event_id = D, this.changeEventId(N.id, D + "#" + N.id.split("#")[1]));
      }
      for (var M in this._rec_markers)
        (N = this._rec_markers[M]).recurring_event_id == v && (N.recurring_event_id = D, N._pid_changed = !0);
      var T = e._rec_markers[D];
      T && T._pid_changed && (delete T._pid_changed, setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.callEvent("onEventChanged", [D, e.getEvent(D)]);
      }, 1)), delete this._ignore_call;
    }
  }), e.attachEvent("onConfirmedBeforeEventDelete", function(v) {
    var D = this.getEvent(v);
    if (this._is_virtual_event(v) || this._is_modified_occurrence(D) && !function(T) {
      return !!T.deleted;
    }(D))
      y(v, D);
    else {
      t(D) && this._lightbox_id && this._roll_back_dates(D);
      var M = this._get_rec_markers(v);
      for (var N in M)
        M.hasOwnProperty(N) && (v = M[N].id, this.getEvent(v) && this.deleteEvent(v, !0));
    }
    return !0;
  }), e.attachEvent("onEventDeleted", function(v, D) {
    !this._is_virtual_event(v) && this._is_modified_occurrence(D) && (e._events[v] || (D.deleted = !0, this.setEvent(v, D), e.render()));
  }), e.attachEvent("onBeforeEventChanged", function(v, D, M, N) {
    return !(!M && v && (e._is_virtual_event(v.id) || e._is_modified_occurrence(v)) && (N.start_date.getDate() !== v.start_date.getDate() ? v._beforeEventChangedFlag = "edit" : v._beforeEventChangedFlag = "ask", !e.config.collision_limit || e.checkCollision(v))) || (e._events.$dnd_recurring_placeholder = e._lame_clone(v), e._showRequiredModalBox(v.id, v._beforeEventChangedFlag), !1);
  }), e.attachEvent("onEventChanged", function(v, D) {
    if (this._loading)
      return !0;
    let M = this.getEvent(v);
    if (this._is_virtual_event(v))
      (function(O) {
        let H = O.id.split("#"), z = e.uid();
        e._not_render = !0;
        let $ = e._copy_event(O);
        $.id = z, $.recurring_event_id = H[0];
        let q = H[1];
        $.original_start = new Date(Number(q)), e._add_rec_marker($, q), e.addEvent($), e._not_render = !1;
      })(M);
    else {
      M.start_date && (M.start_date = i(M.start_date)), M.end_date && (M.end_date = i(M.end_date)), t(M) && this._lightbox_id && (M._removeFollowing || this._isFollowing(v) ? M._removeFollowing = null : this._roll_back_dates(M));
      var N = this._get_rec_markers(v);
      for (var T in N)
        N.hasOwnProperty(T) && (delete this._rec_markers[N[T].id], this.deleteEvent(N[T].id, !0));
      delete this._rec_markers_pull[v];
      for (var A = !1, C = 0; C < this._rendered.length; C++)
        this._rendered[C].getAttribute(this.config.event_attribute) == v && (A = !0);
      A || (this._select_id = null);
    }
    return b(), !0;
  }), e.attachEvent("onEventAdded", function(v) {
    if (!this._loading) {
      var D = this.getEvent(v);
      t(D) && this._roll_back_dates(D);
    }
    return !0;
  }), e.attachEvent("onEventSave", function(v, D, M) {
    let N = this.getEvent(v), T = e._lame_clone(N), A = D.rrule;
    if (N && t(N) && !M && this._isFollowing(v)) {
      if (N._removeFollowing) {
        if (e.getEvent(N._thisAndFollowing) && (N._firstOccurrence || N._modified))
          return e.hideLightbox(), e.deleteEvent(N.id), !1;
        if (N.end_date = new Date(N.start_date.valueOf() - 1e3), N._end_date = N._shorten_end_date, N.start_date = N._start_date, N._shorten = !0, n(N), e.callEvent("onEventChanged", [N.id, N]), e.getEvent(N._thisAndFollowing))
          for (const C in e._events) {
            let O = e._events[C];
            O.recurring_event_id === v && O.start_date.valueOf() > T.start_date.valueOf() && y(O.id, O);
          }
        return e.hideLightbox(), !1;
      }
      {
        let C = e.getEvent(N._thisAndFollowing);
        if (C && N._firstOccurrence)
          for (const O in e._events)
            e._events[O].id == N.id && o(O, D, N, T);
        else if (C && N._modified)
          for (const O in e._events) {
            let H = e._events[O];
            H.recurring_event_id == v && H.id == T._thisAndFollowing && o(O, D, N, T);
          }
        else {
          e._is_modified_occurrence(C) && c(C), N.end_date = N._shorten_end_date, N._end_date = N._shorten_end_date, N.start_date = N._start_date, N._shorten = !0, n(N), e.callEvent("onEventChanged", [N.id, N]);
          let O = { ...T };
          O.text = D.text, O.duration = D.duration, O.rrule = A, O._start_date = null, O.id = e.uid(), e.addEvent(O.start_date, O.end_date, O.text, O.id, O);
        }
        return M || h(v, D), e.hideLightbox(), !1;
      }
    }
    return M || h(v, D), T._ocr && T._beforeEventChangedFlag ? (N.start_date = T.start_date, N.end_date = T.end_date, N._start_date = T._start_date, N._end_date = T._end_date, e.updateEvent(N.id), !0) : (this._select_id = null, b(), !0);
  }), e.attachEvent("onEventCreated", function(v) {
    var D = this.getEvent(v);
    return t(D) || function(M) {
      M.rrule = "", M.original_start = null, M.recurring_event_id = null, M.duration = null, M.deleted = null;
    }(D), !0;
  }), e.attachEvent("onEventCancel", function(v) {
    var D = this.getEvent(v);
    t(D) && (this._roll_back_dates(D), this.render_view_data()), b();
  }), e.attachEvent("onLightbox", function(v) {
    const D = e.getEvent(v);
    if (e._is_virtual_event(D.id)) {
      const M = e.formSection("recurring");
      if (M && M.node) {
        const N = M.node.querySelector("select");
        N && (N.disabled = !0);
      }
    }
  }), e._roll_back_dates = function(v) {
    v.start_date && (v.start_date = i(v.start_date)), v.end_date && (v.end_date = i(v.end_date)), v._end_date && (v._shorten || (v.duration = Math.round((v.end_date.valueOf() - v.start_date.valueOf()) / 1e3)), v.end_date = v._end_date), v._start_date && (v.start_date.setMonth(0), v.start_date.setDate(v._start_date.getDate()), v.start_date.setMonth(v._start_date.getMonth()), v.start_date.setFullYear(v._start_date.getFullYear()), this._isFollowing(v.id) && (v.start_date.setHours(v._start_date.getHours()), v.start_date.setMinutes(v._start_date.getMinutes()), v.start_date.setSeconds(v._start_date.getSeconds()))), v._thisAndFollowing = null, v._shorten_end_date && (v._shorten_end_date = null), v._removeFollowing && (v._removeFollowing = null), v._firstOccurrence && (v._firstOccurrence = null), v._modified && (v._modified = null);
  }, e._is_virtual_event = function(v) {
    return v.toString().indexOf("#") != -1;
  }, e._is_modified_occurrence = function(v) {
    return v.recurring_event_id && v.recurring_event_id != "0";
  }, e.showLightbox_rec = e.showLightbox, e.showLightbox = function(v) {
    const D = this.locale;
    let M = e.config.lightbox_recurring, N = this.getEvent(v), T = N.recurring_event_id, A = this._is_virtual_event(v);
    A && (T = v.split("#")[0]);
    const C = function(O, H) {
      const z = e.getEvent(O), $ = e.getEvent(T), q = e.getView();
      if (q && z[q.y_property] && ($[q.y_property] = z[q.y_property]), q && z[q.property] && ($[q.property] = z[q.property]), H === "Occurrence")
        return e.showLightbox_rec(O);
      if (H === "Following") {
        if (e._isExceptionFirstOccurrence(z) || e._isFirstOccurrence(z))
          return r($, z), e.showLightbox_rec(T);
        {
          $._end_date = $.end_date;
          const R = z.original_start || z.start_date;
          return $._shorten_end_date = new Date(R.valueOf() - 1e3), $.end_date = new Date(z.start_date.valueOf() + 1e3 * $.duration), $._start_date = $.start_date, $.start_date = z.start_date, $._thisAndFollowing = z.id, N._beforeEventChangedFlag && ($._beforeEventChangedFlag = N._beforeEventChangedFlag, $._shorten_end_date = new Date(R.valueOf() - 1e3)), e.showLightbox_rec(T);
        }
      }
      if (H === "AllEvents") {
        if (e._isExceptionFirstOccurrence(z) || e._isFirstOccurrence(z))
          return r($, z), e.showLightbox_rec(T);
        const R = new Date($.start_date);
        return $._end_date = $.end_date, $._start_date = R, $.start_date.setHours(z.start_date.getHours()), $.start_date.setMinutes(z.start_date.getMinutes()), $.start_date.setSeconds(z.start_date.getSeconds()), $.end_date = new Date($.start_date.valueOf() + 1e3 * $.duration), $._thisAndFollowing = null, e.showLightbox_rec(T);
      }
    };
    if ((T || 1 * T == 0) && t(N))
      return C(v, "AllEvents");
    if (!T || T === "0" || !D.labels.confirm_recurring || M == "instance" || M == "series" && !A)
      return this.showLightbox_rec(v);
    if (M === "ask") {
      const O = e.locale;
      p([{ value: "Occurrence", label: O.labels.button_edit_occurrence, checked: !0, callback: () => C(v, "Occurrence") }, { value: "Following", label: O.labels.button_edit_occurrence_and_following, callback: () => C(v, "Following") }, { value: "AllEvents", label: O.labels.button_edit_series, callback: () => C(v, "AllEvents") }]);
    }
  }, e._showRequiredModalBox = function(v, D) {
    let M;
    const N = e.locale;
    let T = e.getEvent(v), A = T.recurring_event_id;
    e._is_virtual_event(T.id) && (A = T.id.split("#")[0]);
    let C = e.getEvent(A);
    const O = e.getView();
    let H, z, $ = e._lame_clone(C);
    O && T[O.y_property] && ($[O.y_property] = T[O.y_property]), O && T[O.property] && ($[O.property] = T[O.property]), T && T._beforeEventChangedFlag && (H = T.start_date, z = T.end_date);
    const q = { value: "AllEvents", label: N.labels.button_edit_series, callback: () => function(Y) {
      let B = e._lame_clone(Y);
      if (e._isExceptionFirstOccurrence(B) && c(B), z && H && ($.start_date.setHours(H.getHours()), $.start_date.setMinutes(H.getMinutes()), $.start_date.setSeconds(H.getSeconds()), $.duration = (+z - +H) / 1e3), $._beforeEventChangedFlag = Y._beforeEventChangedFlag, $._thisAndFollowing = null, !e.config.collision_limit || e.checkCollision($))
        for (const V in e._events)
          e._events[V].id == $.id && (e._events[V] = { ...$ }, e.callEvent("onEventChanged", [e._events[V].id, e._events[V]]));
    }(T) }, R = { value: "Following", label: N.labels.button_edit_occurrence_and_following, callback: () => function(Y) {
      let B = e._lame_clone(Y);
      if (z && H && (Y._start_date = Y.start_date, Y.start_date = H, Y.end_date = z), e._isFirstOccurrence(B) || e._isExceptionFirstOccurrence(B)) {
        if (e._isExceptionFirstOccurrence(B) && c(B), $._start_date = C.start_date, $.start_date = Y.start_date, $.duration = (+Y.end_date - +Y.start_date) / 1e3, $._beforeEventChangedFlag = Y._beforeEventChangedFlag, $.rrule && _($.id, $), !e.config.collision_limit || e.checkCollision($))
          for (const V in e._events)
            e._events[V].id == $.id && (e._events[V] = { ...$ }, e.callEvent("onEventChanged", [e._events[V].id, e._events[V]]));
      } else {
        $._end_date = C.end_date;
        const V = Y.original_start || e.date.date_part(new Date(Y._start_date));
        $._shorten_end_date = new Date(V.valueOf() - 1e3), $.end_date = Y.end_date, $._start_date = C.start_date, $.start_date = Y.start_date, $._thisAndFollowing = Y.id, $.rrule && _($.id, $);
        let W = $.end_date;
        if ($.end_date = $._end_date, !e.config.collision_limit || e.checkCollision($)) {
          $.end_date = W;
          for (const G in e._events)
            e._events[G].id == $.id && (e._events[G] = { ...$ }, e.callEvent("onEventSave", [e._events[G].id, e._events[G], e._new_event]), e.callEvent("onEventChanged", [e._events[G].id, e._events[G]]));
        }
      }
    }(T) }, U = { value: "Occurrence", label: N.labels.button_edit_occurrence, callback: () => function(Y) {
      let B = { ...C, ...e.getEvent("$dnd_recurring_placeholder") };
      if (z && H && (B.start_date = H, B.end_date = z, B._beforeEventChangedFlag = Y._beforeEventChangedFlag, B._ocr = !0), !e.config.collision_limit || e.checkCollision(B))
        for (const V in e._events) {
          let W = e._events[V];
          V !== "$dnd_recurring_placeholder" && W.id == B.id && (e._events[V] = { ...B }, e.callEvent("onEventChanged", [e._events[V].id, e._events[V]]));
        }
    }(T), checked: !0 };
    M = D === "ask" ? [U, R, q] : [U, R], p(M, (Y) => {
      Y === "cancel" && b();
    });
  }, e.get_visible_events_rec = e.get_visible_events, e.get_visible_events = function(v) {
    for (var D = 0; D < this._rec_temp.length; D++)
      delete this._events[this._rec_temp[D].id];
    this._rec_temp = [];
    const M = u();
    var N = this.get_visible_events_rec(v), T = [];
    for (D = 0; D < N.length; D++)
      N[D].deleted || N[D].recurring_event_id || (t(N[D]) ? this.repeat_date(N[D], T, void 0, void 0, void 0, void 0, M) : T.push(N[D]));
    return function(A) {
      const C = {};
      return A.forEach((O) => {
        const H = C[O.id];
        (!H || H._beforeEventChangedFlag || O._beforeEventChangedFlag) && (C[O.id] = O);
      }), Object.values(C);
    }(T);
  }, function() {
    var v = e.isOneDayEvent;
    e.isOneDayEvent = function(M) {
      return !!t(M) || v.call(this, M);
    };
    var D = e.updateEvent;
    e.updateEvent = function(M) {
      var N = e.getEvent(M);
      N && t(N) && !this._is_virtual_event(M) ? e.update_view() : D.call(this, M);
    };
  }();
  const m = e.date.date_to_str("%Y%m%dT%H%i%s");
  function l(v) {
    const D = v.getDay(), M = v.getDate();
    return { dayOfWeek: D, dayNumber: Math.ceil(M / 7) };
  }
  e.repeat_date = function(v, D, M, N, T, A, C) {
    if (!v.rrule)
      return;
    let O = C ? C[v.id] : u()[v.id];
    O || (O = {}), N = a(N || new Date(e._min_date.valueOf() - 6048e5)), T = a(T || new Date(e._max_date.valueOf() - 1e3));
    const H = a(v.start_date);
    let z;
    z = Ve(A ? `RRULE:${v.rrule};UNTIL=${m(v.end_date)};COUNT=${A}` : `RRULE:${v.rrule};UNTIL=${m(v.end_date)}`, { dtstart: H });
    const $ = z.between(N, T, !0).map((U) => {
      const Y = s(U);
      return Y.setHours(v.start_date.getHours()), Y.setMinutes(v.start_date.getMinutes()), Y.setSeconds(v.start_date.getSeconds()), Y;
    });
    let q = 0;
    const R = v.duration;
    for (let U = 0; U < $.length && !(A && q >= A); U++) {
      const Y = $[U];
      let B = O[Y.valueOf()];
      if (B) {
        if (B.deleted || B.end_date.valueOf() < e._min_date.valueOf() || !e.filter_event(B.id, B))
          continue;
        q++, D.push(B);
      } else {
        const V = e._copy_event(v);
        if (V.text = v.text, V.start_date = Y, V.id = v.id + "#" + Math.ceil(Y.valueOf()), V.end_date = new Date(Y.valueOf() + 1e3 * R), V.end_date.valueOf() < e._min_date.valueOf() || (V.end_date = e._fix_daylight_saving_date(V.start_date, V.end_date, v, Y, V.end_date), V._timed = e.isOneDayEvent(V), !V._timed && !e._table_view && !e.config.multi_day))
          continue;
        D.push(V), M || (e._events[V.id] = V, e._rec_temp.push(V)), q++;
      }
    }
    if (O && $.length == 0)
      for (let U in O) {
        let Y = O[U];
        if (Y) {
          if (Y.deleted || Y.end_date.valueOf() < e._min_date.valueOf() || !e.filter_event(Y.id, Y))
            continue;
          N && T && Y.start_date < T && Y.end_date > N && D.push(Y);
        }
      }
  }, e._fix_daylight_saving_date = function(v, D, M, N, T) {
    var A = v.getTimezoneOffset() - D.getTimezoneOffset();
    return A ? A > 0 ? new Date(N.valueOf() + 1e3 * M.duration - 60 * A * 1e3) : new Date(D.valueOf() - 60 * A * 1e3) : new Date(T.valueOf());
  }, e.getRecDates = function(v, D) {
    var M = typeof v == "object" ? v : e.getEvent(v), N = [];
    if (D = D || 100, !t(M))
      return [{ start_date: M.start_date, end_date: M.end_date }];
    if (M.deleted)
      return [];
    e.repeat_date(M, N, !0, M.start_date, M.end_date, D);
    for (var T = [], A = 0; A < N.length; A++)
      N[A].deleted || T.push({ start_date: N[A].start_date, end_date: N[A].end_date });
    return T;
  }, e.getEvents = function(v, D) {
    var M = [];
    const N = u();
    for (var T in this._events) {
      var A = this._events[T];
      if (!A.recurring_event_id)
        if (v && D && A.start_date < D && A.end_date > v)
          if (t(A)) {
            var C = [];
            this.repeat_date(A, C, !0, v, D, void 0, N), C.forEach(function(O) {
              O.start_date < D && O.end_date > v && M.push(O);
            });
          } else
            this._is_virtual_event(A.id) || M.push(A);
        else
          v || D || this._is_virtual_event(A.id) || M.push(A);
    }
    return M;
  }, e._copy_dummy = function(v) {
    var D = new Date(this.start_date), M = new Date(this.end_date);
    this.start_date = D, this.end_date = M, this.duration = this.rrule = null;
  }, e.config.include_end_by = !1, e.config.lightbox_recurring = "ask", e.config.recurring_workdays = [P.MO.weekday, P.TU.weekday, P.WE.weekday, P.TH.weekday, P.FR.weekday], e.config.repeat_date = "%m.%d.%Y", e.config.lightbox.sections = [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "recurring", type: "recurring", map_to: "rrule" }, { name: "time", height: 72, type: "time", map_to: "auto" }], e.attachEvent("onClearAll", function() {
    e._rec_markers = {}, e._rec_markers_pull = {}, e._rec_temp = [];
  });
  const f = { 0: "SU", 1: "MO", 2: "TU", 3: "WE", 4: "TH", 5: "FR", 6: "SA" }, g = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 0 };
  function x(v, D) {
    const M = v.querySelector("[name='repeat_interval_value']");
    M && (M.value = (D ? D.interval : 1) || 1);
  }
  function w(v) {
    switch (v) {
      case 1:
      case 31:
        return `${v}st`;
      case 2:
        return `${v}nd`;
      case 3:
        return `${v}rd`;
      default:
        return `${v}th`;
    }
  }
  e.templates.repeat_monthly_date = function(v, D) {
    return `Every ${w(v.getDate())}`;
  }, e.templates.repeat_monthly_weekday = function(v, D) {
    const M = l(v);
    return `Every ${w(M.dayNumber)} ${e.locale.date.day_full[M.dayOfWeek]}`;
  }, e.templates.repeat_yearly_month_date = function(v, D) {
    const M = v.getDate(), N = e.locale.date.month_full[v.getMonth()];
    return `Every ${w(M)} day of ${N}`;
  }, e.templates.repeat_yearly_month_weekday = function(v, D) {
    const M = l(v), N = e.locale.date.month_full[v.getMonth()];
    return `Every ${w(M.dayNumber)} ${e.locale.date.day_full[M.dayOfWeek]} of ${N}`;
  };
  const E = { MONTHLY: function(v) {
    return { rrule: { freq: P.MONTHLY, interval: 1, bymonthday: v.start.getDate() }, until: new Date(9999, 1, 1) };
  }, WEEKLY: function(v) {
    let D = v.start.getDay() - 1;
    return D == -1 && (D = 6), { rrule: { freq: P.WEEKLY, interval: 1, byweekday: [D] }, until: new Date(9999, 1, 1) };
  }, DAILY: function(v) {
    return { rrule: { freq: P.DAILY, interval: 1 }, until: new Date(9999, 1, 1) };
  }, YEARLY: function(v) {
    return { rrule: { freq: P.YEARLY, bymonth: v.start.getMonth() + 1, interval: 1, bymonthday: v.start.getDate() }, until: new Date(9999, 1, 1) };
  }, WORKDAYS: function(v) {
    return { rrule: { freq: P.WEEKLY, interval: 1, byweekday: e.config.recurring_workdays }, until: new Date(9999, 1, 1) };
  }, CUSTOM: function(v, D) {
    const M = {}, N = D.querySelector('[name="repeat_interval_unit"]').value, T = Math.max(1, D.querySelector('[name="repeat_interval_value"]').value), A = D.querySelector('[name="dhx_custom_month_option"]') ? D.querySelector('[name="dhx_custom_month_option"]').value : null, C = D.querySelector('[name="dhx_custom_year_option"]') ? D.querySelector('[name="dhx_custom_year_option"]').value : null;
    let O, H;
    switch (M.interval = T, N) {
      case "DAILY":
        M.freq = P.DAILY;
        break;
      case "WEEKLY":
        M.freq = P.WEEKLY, O = [], D.querySelectorAll('.dhx_form_repeat_custom_week [name="week_day"]').forEach((R) => {
          R.checked && O.push(R.value);
        }), M.byweekday = O.map((R) => {
          switch (R) {
            case "MO":
              return P.MO.weekday;
            case "TU":
              return P.TU.weekday;
            case "WE":
              return P.WE.weekday;
            case "TH":
              return P.TH.weekday;
            case "FR":
              return P.FR.weekday;
            case "SA":
              return P.SA.weekday;
            case "SU":
              return P.SU.weekday;
          }
        });
        break;
      case "MONTHLY":
        M.freq = P.MONTHLY, A === "month_date" ? M.bymonthday = v.start.getDate() : (H = v.start.getDay() - 1, H == -1 && (H = 6), M.byweekday = [H], M.bysetpos = l(v.start).dayNumber);
        break;
      case "YEARLY":
        M.freq = P.YEARLY, M.bymonth = v.start.getMonth() + 1, C == "month_date" ? M.bymonthday = v.start.getDate() : (H = v.start.getDay() - 1, H == -1 && (H = 6), M.byweekday = [H], M.bysetpos = l(v.start).dayNumber);
    }
    const z = e.date.str_to_date("%Y-%m-%d");
    let $ = new Date(9999, 1, 1);
    const q = D.querySelector('[name="dhx_custom_repeat_ends"]');
    return q && q.value === "ON" ? ($ = z(D.querySelector('[name="dhx_form_repeat_ends_ondate"]').value), M.until = new Date($)) : q && q.value === "AFTER" && (M.count = Math.max(1, D.querySelector('[name="dhx_form_repeat_ends_after"]').value)), { rrule: M, until: $ };
  }, NEVER: function() {
  } };
  function k(v, D, M) {
    (function(N, T) {
      x(N, T);
    })(v, D), function(N, T, A) {
      if (x(N, T), N.querySelectorAll(".dhx_form_repeat_custom_week input").forEach((C) => C.checked = !1), T && T.byweekday)
        T.byweekday.forEach((C) => {
          const O = g[C.weekday], H = f[O], z = N.querySelector(`.dhx_form_repeat_custom_week input[value="${H}"]`);
          z && (z.checked = !0);
        });
      else {
        const C = f[A.start_date.getDay()], O = N.querySelector(`.dhx_form_repeat_custom_week input[value="${C}"]`);
        O && (O.checked = !0);
      }
    }(v, D, M), function(N, T, A) {
      x(N, T);
      const C = N.querySelector('.dhx_form_repeat_custom_month [value="month_date"]'), O = N.querySelector('.dhx_form_repeat_custom_month [value="month_nth_weekday"]');
      if (C && O) {
        C.innerText = e.templates.repeat_monthly_date(A.start_date, A), O.innerText = e.templates.repeat_monthly_weekday(A.start_date, A);
        const H = N.querySelector('[name="dhx_custom_month_option"]');
        H && (H.value = !T || !T.bysetpos || T.byweekday && T.byweekday.length ? "month_nth_weekday" : "month_date");
      }
    }(v, D, M), function(N, T, A) {
      const C = N.querySelector('.dhx_form_repeat_custom_year [value="month_date"]'), O = N.querySelector('.dhx_form_repeat_custom_year [value="month_nth_weekday"]');
      C && O && (C.innerText = e.templates.repeat_yearly_month_date(A.start_date, A), O.innerText = e.templates.repeat_yearly_month_weekday(A.start_date, A), T && (!T.bysetpos || T.byweekday && T.byweekday.length) ? N.querySelector('[name="dhx_custom_year_option"]').value = "month_nth_weekday" : N.querySelector('[name="dhx_custom_year_option"]').value = "month_date");
    }(v, D, M), function(N, T, A) {
      const C = N.querySelector('.dhx_form_repeat_ends_extra [name="dhx_form_repeat_ends_after"]'), O = N.querySelector('.dhx_form_repeat_ends_extra [name="dhx_form_repeat_ends_ondate"]'), H = N.querySelector("[name='dhx_custom_repeat_ends']");
      if (C && O && H) {
        C.value = 1;
        let z = e.date.date_to_str("%Y-%m-%d");
        e.config.repeat_date_of_end || (e.config.repeat_date_of_end = z(e.date.add(e._currentDate(), 30, "day"))), O.value = e.config.repeat_date_of_end, T && T.count ? (H.value = "AFTER", C.value = T.count) : A._end_date && A._end_date.getFullYear() !== 9999 ? (H.value = "ON", O.value = z(A._end_date)) : H.value = "NEVER", H.dispatchEvent(new Event("change"));
      }
    }(v, D, M);
  }
  function S(v) {
    for (let D = 0; D < e.config.lightbox.sections.length; D++) {
      let M = e.config.lightbox.sections[D];
      if (M.type === v)
        return e.formSection(M.name);
    }
    return null;
  }
  e.form_blocks.recurring = { _get_node: function(v) {
    if (typeof v == "string") {
      let D = e._lightbox.querySelector(`#${v}`);
      D || (D = document.getElementById(v)), v = D;
    }
    return v.style.display == "none" && (v.style.display = ""), v;
  }, _outer_html: function(v) {
    return v.outerHTML || (D = v, (N = document.createElement("div")).appendChild(D.cloneNode(!0)), M = N.innerHTML, N = null, M);
    var D, M, N;
  }, render: function(v) {
    if (v.form) {
      let M = e.form_blocks.recurring, N = M._get_node(v.form), T = M._outer_html(N);
      return N.style.display = "none", T;
    }
    let D = e.locale.labels;
    return `<div class="dhx_form_rrule">
		<div class="dhx_form_repeat_pattern">
			<select>
				<option value="NEVER">${D.repeat_never}</option>
				<option value="DAILY">${D.repeat_daily}</option>
				<option value="WEEKLY">${D.repeat_weekly}</option>
				<option value="MONTHLY">${D.repeat_monthly}</option>
				<option value="YEARLY">${D.repeat_yearly}</option>
				<option value="WORKDAYS">${D.repeat_workdays}</option>
				<option value="CUSTOM">${D.repeat_custom}</option>
			</select>
		</div>
		<div class="dhx_form_repeat_custom dhx_hidden">
			<div class="dhx_form_repeat_custom_interval">
				<input name="repeat_interval_value" type="number" min="1">
				<select name="repeat_interval_unit">
					<option value="DAILY">${D.repeat_freq_day}</option>
					<option value="WEEKLY">${D.repeat_freq_week}</option>
					<option value="MONTHLY">${D.repeat_freq_month}</option>
					<option value="YEARLY">${D.repeat_freq_year}</option>
				</select>
			</div>

			<div class="dhx_form_repeat_custom_additional">
				<div class="dhx_form_repeat_custom_week dhx_hidden">
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="MO" />${D.day_for_recurring[1]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="TU" />${D.day_for_recurring[2]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="WE" />${D.day_for_recurring[3]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="TH" />${D.day_for_recurring[4]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="FR" />${D.day_for_recurring[5]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="SA" />${D.day_for_recurring[6]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="SU" />${D.day_for_recurring[0]}</label>
				</div>

				<div class="dhx_form_repeat_custom_month dhx_hidden">
					<select name="dhx_custom_month_option">
						<option value="month_date"></option>
						<option value="month_nth_weekday"></option>
					</select>
				</div>

				<div class="dhx_form_repeat_custom_year dhx_hidden">
					<select name="dhx_custom_year_option">
						<option value="month_date"></option>
						<option value="month_nth_weekday"></option>
					</select>
				</div>
			</div>

			<div class="dhx_form_repeat_ends">
				<div>${D.repeat_ends}</div>
				<div class="dhx_form_repeat_ends_options">
					<select name="dhx_custom_repeat_ends">
						<option value="NEVER">${D.repeat_never}</option>
						<option value="AFTER">${D.repeat_radio_end2}</option>
						<option value="ON">${D.repeat_on_date}</option>
					</select>
					<div class="dhx_form_repeat_ends_extra">
						<div class="dhx_form_repeat_ends_after dhx_hidden">
							<label><input type="number" min="1" name="dhx_form_repeat_ends_after">${D.repeat_text_occurrences_count}</label>
						</div>
						<div class="dhx_form_repeat_ends_on dhx_hidden">
							<input type="date" name="dhx_form_repeat_ends_ondate">
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>`;
  }, _init_set_value: function(v, D, M) {
    function N(H) {
      H && H.classList.add("dhx_hidden");
    }
    function T(H) {
      H && H.classList.remove("dhx_hidden");
    }
    e.form_blocks.recurring._ds = { start: M.start_date, end: M.end_date };
    const A = v.querySelector(".dhx_form_repeat_pattern select");
    A && A.addEventListener("change", function() {
      (function(H) {
        const z = v.querySelector(".dhx_form_repeat_custom");
        H === "CUSTOM" ? T(z) : N(z);
      })(this.value);
    });
    const C = v.querySelector(".dhx_form_repeat_custom_interval [name='repeat_interval_unit']");
    C && C.addEventListener("change", function() {
      (function(H) {
        const z = { weekly: v.querySelector(".dhx_form_repeat_custom_week"), monthly: v.querySelector(".dhx_form_repeat_custom_month"), yearly: v.querySelector(".dhx_form_repeat_custom_year") };
        switch (H) {
          case "DAILY":
            N(z.weekly), N(z.monthly), N(z.yearly);
            break;
          case "WEEKLY":
            T(z.weekly), N(z.monthly), N(z.yearly);
            break;
          case "MONTHLY":
            N(z.weekly), T(z.monthly), N(z.yearly);
            break;
          case "YEARLY":
            N(z.weekly), N(z.monthly), T(z.yearly);
        }
      })(this.value);
    });
    const O = v.querySelector(".dhx_form_repeat_ends [name='dhx_custom_repeat_ends']");
    O && O.addEventListener("change", function() {
      (function(H) {
        const z = { after: v.querySelector(".dhx_form_repeat_ends_extra .dhx_form_repeat_ends_after"), on: v.querySelector(".dhx_form_repeat_ends_extra .dhx_form_repeat_ends_on") };
        switch (H) {
          case "NEVER":
            N(z.after), N(z.on);
            break;
          case "AFTER":
            T(z.after), N(z.on);
            break;
          case "ON":
            N(z.after), T(z.on);
        }
      })(this.value);
    }), e._lightbox._rec_init_done = !0;
  }, button_click: function() {
  }, set_value: function(v, D, M) {
    let N = e.form_blocks.recurring;
    e._lightbox._rec_init_done || N._init_set_value(v, D, M), v.open = !M.rrule, v.blocked = this._is_modified_occurrence(M);
    let T = N._ds;
    if (T.start = M.start_date, T.end = M._end_date, M.rrule) {
      const C = Ve(M.rrule);
      k(v, C.origOptions, M);
      const O = function(H, z) {
        const $ = H.options, q = $.until || z;
        return $.count || q && q.getFullYear() !== 9999 ? "CUSTOM" : $.freq !== P.DAILY || $.interval !== 1 || $.byweekday ? $.freq !== P.WEEKLY || $.interval !== 1 || $.byweekday ? $.freq !== P.MONTHLY || $.interval !== 1 || $.bysetpos ? $.freq !== P.YEARLY || $.interval !== 1 || $.bysetpos ? $.freq === P.DAILY && $.byweekday && $.byweekday.length === e.config.recurring_workdays.length && $.byweekday.includes(P.MO) && $.byweekday.includes(P.TU) && $.byweekday.includes(P.WE) && $.byweekday.includes(P.TH) && $.byweekday.includes(P.FR) ? "WORKDAYS" : "CUSTOM" : "YEARLY" : "MONTHLY" : "WEEKLY" : "DAILY";
      }(C, M._end_date);
      if (v.querySelector(".dhx_form_repeat_pattern select").value = O, O === "CUSTOM") {
        let H;
        switch (C.origOptions.freq) {
          case P.DAILY:
            H = "DAILY";
            break;
          case P.WEEKLY:
            H = "WEEKLY";
            break;
          case P.MONTHLY:
            H = "MONTHLY";
            break;
          case P.YEARLY:
            H = "YEARLY";
        }
        H && (v.querySelector('[name="repeat_interval_unit"]').value = H, v.querySelector('[name="repeat_interval_unit"]').dispatchEvent(new Event("change")));
      }
    } else {
      k(v, null, M);
      const C = v.querySelector(".dhx_form_repeat_pattern select");
      C && (C.value = "NEVER");
    }
    const A = v.querySelector(".dhx_form_repeat_pattern select");
    A && A.dispatchEvent(new Event("change"));
  }, get_value: function(v, D) {
    const M = v.querySelector(".dhx_form_repeat_pattern select");
    if (v.blocked || M && M.value === "NEVER")
      D.rrule = D.rrule = "", D._end_date = D.end_date;
    else {
      let N = e.form_blocks.recurring._ds, T = {};
      (function() {
        let O = e.formSection("time");
        if (O || (O = S("time")), O || (O = S("calendar_time")), !O)
          throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", 'In the latter case, make sure the control is named "time":', "", "scheduler.config.lightbox.sections = [", '{name:"time", height:72, type:"YOU CONTROL", map_to:"auto" }];'].join(`
`));
        return O;
      })().getValue(T), N.start = T.start_date;
      const A = M ? M.value : "CUSTOM", C = E[A](N, v);
      D.rrule = new P(C.rrule).toString().replace("RRULE:", ""), N.end = C.until, D.duration = Math.floor((T.end_date - T.start_date) / 1e3), N._start ? (D.start_date = new Date(N.start), D._start_date = new Date(N.start), N._start = !1) : D._start_date = null, D._end_date = N.end;
    }
    return D.rrule;
  }, focus: function(v) {
  } };
}, recurring_legacy: function(e) {
  function i() {
    var n = e.formSection("recurring");
    if (n || (n = t("recurring")), !n)
      throw new Error(["Can't locate the Recurring form section.", "Make sure that you have the recurring control on the lightbox configuration https://docs.dhtmlx.com/scheduler/recurring_events.html#recurringlightbox ", 'and that the recurring control has name "recurring":', "", "scheduler.config.lightbox.sections = [", '	{name:"recurring", ... }', "];"].join(`
`));
    return n;
  }
  function t(n) {
    for (var _ = 0; _ < e.config.lightbox.sections.length; _++) {
      var d = e.config.lightbox.sections[_];
      if (d.type === n)
        return e.formSection(d.name);
    }
    return null;
  }
  function a(n) {
    return new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), 0);
  }
  var s;
  e.config.occurrence_timestamp_in_utc = !1, e.config.recurring_workdays = [1, 2, 3, 4, 5], e.form_blocks.recurring = { _get_node: function(n) {
    if (typeof n == "string") {
      let _ = e._lightbox.querySelector(`#${n}`);
      _ || (_ = document.getElementById(n)), n = _;
    }
    return n.style.display == "none" && (n.style.display = ""), n;
  }, _outer_html: function(n) {
    return n.outerHTML || (_ = n, (r = document.createElement("div")).appendChild(_.cloneNode(!0)), d = r.innerHTML, r = null, d);
    var _, d, r;
  }, render: function(n) {
    if (n.form) {
      var _ = e.form_blocks.recurring, d = _._get_node(n.form), r = _._outer_html(d);
      return d.style.display = "none", r;
    }
    var o = e.locale.labels;
    return '<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />' + o.repeat_radio_day + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>' + o.repeat_radio_week + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />' + o.repeat_radio_month + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />' + o.repeat_radio_year + '</label></div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>' + o.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />' + o.repeat_text_day_count + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>' + o.repeat_radio_day_type2 + '</label></div> </div> <div style="display:none;" id="dhx_repeat_week"><div><label>' + o.repeat_week + '<input class="dhx_repeat_text" type="text" name="week_count" value="1" /></label><span>' + o.repeat_text_week_count + '</span></div>  <table class="dhx_repeat_days"> <tr> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />' + o.day_for_recurring[1] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />' + o.day_for_recurring[4] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />' + o.day_for_recurring[2] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />' + o.day_for_recurring[5] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />' + o.day_for_recurring[3] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />' + o.day_for_recurring[6] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />' + o.day_for_recurring[0] + '</label></div> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>' + o.repeat_radio_month_type + '</label><label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />' + o.repeat_text_month_day + '</label><label><input class="dhx_repeat_text" type="text" name="month_count" value="1" />' + o.repeat_text_month_count + '</label></div> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>' + o.repeat_radio_month_start + '</label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><label><select name="month_day2">	<option value="1" selected >' + e.locale.date.day_full[1] + '<option value="2">' + e.locale.date.day_full[2] + '<option value="3">' + e.locale.date.day_full[3] + '<option value="4">' + e.locale.date.day_full[4] + '<option value="5">' + e.locale.date.day_full[5] + '<option value="6">' + e.locale.date.day_full[6] + '<option value="0">' + e.locale.date.day_full[0] + "</select>" + o.repeat_text_month_count2_before + '</label><label><input class="dhx_repeat_text" type="text" name="month_count2" value="1" />' + o.repeat_text_month_count2_after + '</label></div> </div> <div style="display:none;" id="dhx_repeat_year"> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>' + o.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />' + o.repeat_text_year_day + '</label><label><select name="year_month"><option value="0" selected >' + o.month_for_recurring[0] + '<option value="1">' + o.month_for_recurring[1] + '<option value="2">' + o.month_for_recurring[2] + '<option value="3">' + o.month_for_recurring[3] + '<option value="4">' + o.month_for_recurring[4] + '<option value="5">' + o.month_for_recurring[5] + '<option value="6">' + o.month_for_recurring[6] + '<option value="7">' + o.month_for_recurring[7] + '<option value="8">' + o.month_for_recurring[8] + '<option value="9">' + o.month_for_recurring[9] + '<option value="10">' + o.month_for_recurring[10] + '<option value="11">' + o.month_for_recurring[11] + "</select>" + o.select_year_month + '</label></div> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>' + o.repeat_year_label + '</label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >' + e.locale.date.day_full[1] + '<option value="2">' + e.locale.date.day_full[2] + '<option value="3">' + e.locale.date.day_full[3] + '<option value="4">' + e.locale.date.day_full[4] + '<option value="5">' + e.locale.date.day_full[5] + '<option value="6">' + e.locale.date.day_full[6] + '<option value="7">' + e.locale.date.day_full[0] + "</select>" + o.select_year_day2 + '<select name="year_month2"><option value="0" selected >' + o.month_for_recurring[0] + '<option value="1">' + o.month_for_recurring[1] + '<option value="2">' + o.month_for_recurring[2] + '<option value="3">' + o.month_for_recurring[3] + '<option value="4">' + o.month_for_recurring[4] + '<option value="5">' + o.month_for_recurring[5] + '<option value="6">' + o.month_for_recurring[6] + '<option value="7">' + o.month_for_recurring[7] + '<option value="8">' + o.month_for_recurring[8] + '<option value="9">' + o.month_for_recurring[9] + '<option value="10">' + o.month_for_recurring[10] + '<option value="11">' + o.month_for_recurring[11] + '</select></div> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <div><label><input class="dhx_repeat_radio" type="radio" name="end" checked/>' + o.repeat_radio_end + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + o.repeat_radio_end2 + '</label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />' + o.repeat_text_occurrences_count + '</div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + o.repeat_radio_end3 + '</label><input class="dhx_repeat_date" type="text" name="date_of_end" value="' + e.config.repeat_date_of_end + '" /></div> </div> </form> </div> </div>';
  }, _ds: {}, _get_form_node: function(n, _, d) {
    var r = n[_];
    if (!r)
      return null;
    if (r.nodeName)
      return r;
    if (r.length) {
      for (var o = 0; o < r.length; o++)
        if (r[o].value == d)
          return r[o];
    }
  }, _get_node_value: function(n, _, d) {
    var r = n[_];
    if (!r)
      return "";
    if (r.length) {
      if (d) {
        for (var o = [], c = 0; c < r.length; c++)
          r[c].checked && o.push(r[c].value);
        return o;
      }
      for (c = 0; c < r.length; c++)
        if (r[c].checked)
          return r[c].value;
    }
    return r.value ? d ? [r.value] : r.value : void 0;
  }, _get_node_numeric_value: function(n, _) {
    return 1 * e.form_blocks.recurring._get_node_value(n, _) || 0;
  }, _set_node_value: function(n, _, d) {
    var r = n[_];
    if (r) {
      if (r.name == _)
        r.value = d;
      else if (r.length)
        for (var o = typeof d == "object", c = 0; c < r.length; c++)
          (o || r[c].value == d) && (r[c].checked = o ? !!d[r[c].value] : !!d);
    }
  }, _init_set_value: function(n, _, d) {
    var r = e.form_blocks.recurring, o = r._get_node_value, c = r._set_node_value;
    e.form_blocks.recurring._ds = { start: d.start_date, end: d._end_date };
    var h = e.date.str_to_date(e.config.repeat_date, !1, !0), y = e.date.date_to_str(e.config.repeat_date), b = n.getElementsByTagName("FORM")[0], p = {};
    function u(S) {
      for (var v = 0; v < S.length; v++) {
        var D = S[v];
        if (D.name)
          if (p[D.name])
            if (p[D.name].nodeType) {
              var M = p[D.name];
              p[D.name] = [M, D];
            } else
              p[D.name].push(D);
          else
            p[D.name] = D;
      }
    }
    if (u(b.getElementsByTagName("INPUT")), u(b.getElementsByTagName("SELECT")), !e.config.repeat_date_of_end) {
      var m = e.date.date_to_str(e.config.repeat_date);
      e.config.repeat_date_of_end = m(e.date.add(e._currentDate(), 30, "day"));
    }
    c(p, "date_of_end", e.config.repeat_date_of_end);
    var l = function(S) {
      return e._lightbox.querySelector(`#${S}`) || { style: {} };
    };
    function f() {
      l("dhx_repeat_day").style.display = "none", l("dhx_repeat_week").style.display = "none", l("dhx_repeat_month").style.display = "none", l("dhx_repeat_year").style.display = "none", l("dhx_repeat_" + this.value).style.display = "", e.setLightboxSize();
    }
    function g(S, v) {
      var D = S.end;
      if (D.length)
        if (D[0].value && D[0].value != "on")
          for (var M = 0; M < D.length; M++)
            D[M].value == v && (D[M].checked = !0);
        else {
          var N = 0;
          switch (v) {
            case "no":
              N = 0;
              break;
            case "date_of_end":
              N = 2;
              break;
            default:
              N = 1;
          }
          D[N].checked = !0;
        }
      else
        D.value = v;
    }
    e.form_blocks.recurring._get_repeat_code = function(S) {
      var v = [o(p, "repeat")];
      for (x[v[0]](v, S); v.length < 5; )
        v.push("");
      var D = "", M = function(N) {
        var T = N.end;
        if (T.length) {
          for (var A = 0; A < T.length; A++)
            if (T[A].checked)
              return T[A].value && T[A].value != "on" ? T[A].value : A ? A == 2 ? "date_of_end" : "occurences_count" : "no";
        } else if (T.value)
          return T.value;
        return "no";
      }(p);
      return M == "no" ? (S.end = new Date(9999, 1, 1), D = "no") : M == "date_of_end" ? S.end = function(N) {
        var T = h(N);
        return e.config.include_end_by && (T = e.date.add(T, 1, "day")), T;
      }(o(p, "date_of_end")) : (e.transpose_type(v.join("_")), D = Math.max(1, o(p, "occurences_count")), S.end = e.date["add_" + v.join("_")](new Date(S.start), D + 0, { start_date: S.start }) || S.start), v.join("_") + "#" + D;
    };
    var x = { month: function(S, v) {
      var D = e.form_blocks.recurring._get_node_value, M = e.form_blocks.recurring._get_node_numeric_value;
      D(p, "month_type") == "d" ? (S.push(Math.max(1, M(p, "month_count"))), v.start.setDate(D(p, "month_day"))) : (S.push(Math.max(1, M(p, "month_count2"))), S.push(D(p, "month_day2")), S.push(Math.max(1, M(p, "month_week2"))), e.config.repeat_precise || v.start.setDate(1)), v._start = !0;
    }, week: function(S, v) {
      var D = e.form_blocks.recurring._get_node_value, M = e.form_blocks.recurring._get_node_numeric_value;
      S.push(Math.max(1, M(p, "week_count"))), S.push(""), S.push("");
      for (var N = [], T = D(p, "week_day", !0), A = v.start.getDay(), C = !1, O = 0; O < T.length; O++)
        N.push(T[O]), C = C || T[O] == A;
      N.length || (N.push(A), C = !0), N.sort(), e.config.repeat_precise ? C || (e.transpose_day_week(v.start, N, 1, 7), v._start = !0) : (v.start = e.date.week_start(v.start), v._start = !0), S.push(N.join(","));
    }, day: function(S) {
      var v = e.form_blocks.recurring._get_node_value, D = e.form_blocks.recurring._get_node_numeric_value;
      v(p, "day_type") == "d" ? S.push(Math.max(1, D(p, "day_count"))) : (S.push("week"), S.push(1), S.push(""), S.push(""), S.push(e.config.recurring_workdays.join(",")), S.splice(0, 1));
    }, year: function(S, v) {
      var D = e.form_blocks.recurring._get_node_value;
      D(p, "year_type") == "d" ? (S.push("1"), v.start.setMonth(0), v.start.setDate(D(p, "year_day")), v.start.setMonth(D(p, "year_month"))) : (S.push("1"), S.push(D(p, "year_day2")), S.push(D(p, "year_week2")), v.start.setDate(1), v.start.setMonth(D(p, "year_month2"))), v._start = !0;
    } }, w = { week: function(S, v) {
      var D = e.form_blocks.recurring._set_node_value;
      D(p, "week_count", S[1]);
      for (var M = S[4].split(","), N = {}, T = 0; T < M.length; T++)
        N[M[T]] = !0;
      D(p, "week_day", N);
    }, month: function(S, v) {
      var D = e.form_blocks.recurring._set_node_value;
      S[2] === "" ? (D(p, "month_type", "d"), D(p, "month_count", S[1]), D(p, "month_day", v.start.getDate())) : (D(p, "month_type", "w"), D(p, "month_count2", S[1]), D(p, "month_week2", S[3]), D(p, "month_day2", S[2]));
    }, day: function(S, v) {
      var D = e.form_blocks.recurring._set_node_value;
      D(p, "day_type", "d"), D(p, "day_count", S[1]);
    }, year: function(S, v) {
      var D = e.form_blocks.recurring._set_node_value;
      S[2] === "" ? (D(p, "year_type", "d"), D(p, "year_day", v.start.getDate()), D(p, "year_month", v.start.getMonth())) : (D(p, "year_type", "w"), D(p, "year_week2", S[3]), D(p, "year_day2", S[2]), D(p, "year_month2", v.start.getMonth()));
    } };
    e.form_blocks.recurring._set_repeat_code = function(S, v) {
      var D = e.form_blocks.recurring._set_node_value, M = S.split("#");
      switch (S = M[0].split("_"), w[S[0]](S, v), M[1]) {
        case "no":
          g(p, "no");
          break;
        case "":
          g(p, "date_of_end");
          var N = v.end;
          e.config.include_end_by && (N = e.date.add(N, -1, "day")), D(p, "date_of_end", y(N));
          break;
        default:
          g(p, "occurences_count"), D(p, "occurences_count", M[1]);
      }
      D(p, "repeat", S[0]);
      var T = e.form_blocks.recurring._get_form_node(p, "repeat", S[0]);
      T.nodeName == "SELECT" ? (T.dispatchEvent(new Event("change")), T.dispatchEvent(new MouseEvent("click"))) : T.dispatchEvent(new MouseEvent("click"));
    };
    for (var E = 0; E < b.elements.length; E++) {
      var k = b.elements[E];
      k.name === "repeat" && (k.nodeName != "SELECT" || k.$_eventAttached ? k.$_eventAttached || (k.$_eventAttached = !0, k.addEventListener("click", f)) : (k.$_eventAttached = !0, k.addEventListener("change", f)));
    }
    e._lightbox._rec_init_done = !0;
  }, set_value: function(n, _, d) {
    var r = e.form_blocks.recurring;
    e._lightbox._rec_init_done || r._init_set_value(n, _, d), n.open = !d.rec_type, n.blocked = this._is_modified_occurence(d);
    var o = r._ds;
    o.start = d.start_date, o.end = d._end_date, r._toggle_block(), _ && r._set_repeat_code(_, o);
  }, get_value: function(n, _) {
    if (n.open) {
      var d = e.form_blocks.recurring._ds, r = {};
      (function() {
        var o = e.formSection("time");
        if (o || (o = t("time")), o || (o = t("calendar_time")), !o)
          throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", 'In the latter case, make sure the control is named "time":', "", "scheduler.config.lightbox.sections = [", '{name:"time", height:72, type:"YOU CONTROL", map_to:"auto" }];'].join(`
`));
        return o;
      })().getValue(r), d.start = r.start_date, _.rec_type = e.form_blocks.recurring._get_repeat_code(d), d._start ? (_.start_date = new Date(d.start), _._start_date = new Date(d.start), d._start = !1) : _._start_date = null, _._end_date = d.end, _.rec_pattern = _.rec_type.split("#")[0];
    } else
      _.rec_type = _.rec_pattern = "", _._end_date = _.end_date;
    return _.rec_type;
  }, _get_button: function() {
    return i().header.firstChild.firstChild;
  }, _get_form: function() {
    return i().node;
  }, open: function() {
    var n = e.form_blocks.recurring;
    n._get_form().open || n._toggle_block();
  }, close: function() {
    var n = e.form_blocks.recurring;
    n._get_form().open && n._toggle_block();
  }, _toggle_block: function() {
    var n = e.form_blocks.recurring, _ = n._get_form(), d = n._get_button();
    _.open || _.blocked ? (_.style.height = "0px", d && (d.style.backgroundPosition = "-5px 20px", d.nextSibling.innerHTML = e.locale.labels.button_recurring)) : (_.style.height = "auto", d && (d.style.backgroundPosition = "-5px 0px", d.nextSibling.innerHTML = e.locale.labels.button_recurring_open)), _.open = !_.open, e.setLightboxSize();
  }, focus: function(n) {
  }, button_click: function(n, _, d) {
    e.form_blocks.recurring._get_form().blocked || e.form_blocks.recurring._toggle_block();
  } }, e._rec_markers = {}, e._rec_markers_pull = {}, e._add_rec_marker = function(n, _) {
    n._pid_time = _, this._rec_markers[n.id] = n, this._rec_markers_pull[n.event_pid] || (this._rec_markers_pull[n.event_pid] = {}), this._rec_markers_pull[n.event_pid][_] = n;
  }, e._get_rec_marker = function(n, _) {
    var d = this._rec_markers_pull[_];
    return d ? d[n] : null;
  }, e._get_rec_markers = function(n) {
    return this._rec_markers_pull[n] || [];
  }, e._rec_temp = [], s = e.addEvent, e.addEvent = function(n, _, d, r, o) {
    var c = s.apply(this, arguments);
    if (c && e.getEvent(c)) {
      var h = e.getEvent(c);
      h.start_date && (h.start_date = a(h.start_date)), h.end_date && (h.end_date = a(h.end_date)), this._is_modified_occurence(h) && e._add_rec_marker(h, 1e3 * h.event_length), h.rec_type && (h.rec_pattern = h.rec_type.split("#")[0]);
    }
    return c;
  }, e.attachEvent("onEventIdChange", function(n, _) {
    if (!this._ignore_call) {
      this._ignore_call = !0, e._rec_markers[n] && (e._rec_markers[_] = e._rec_markers[n], delete e._rec_markers[n]), e._rec_markers_pull[n] && (e._rec_markers_pull[_] = e._rec_markers_pull[n], delete e._rec_markers_pull[n]);
      for (var d = 0; d < this._rec_temp.length; d++)
        (r = this._rec_temp[d]).event_pid == n && (r.event_pid = _, this.changeEventId(r.id, _ + "#" + r.id.split("#")[1]));
      for (var d in this._rec_markers) {
        var r;
        (r = this._rec_markers[d]).event_pid == n && (r.event_pid = _, r._pid_changed = !0);
      }
      var o = e._rec_markers[_];
      o && o._pid_changed && (delete o._pid_changed, setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.callEvent("onEventChanged", [_, e.getEvent(_)]);
      }, 1)), delete this._ignore_call;
    }
  }), e.attachEvent("onConfirmedBeforeEventDelete", function(n) {
    var _ = this.getEvent(n);
    if (this._is_virtual_event(n) || this._is_modified_occurence(_) && _.rec_type && _.rec_type != "none") {
      n = n.split("#");
      var d = this.uid(), r = n[1] ? n[1] : Math.round(_._pid_time / 1e3), o = this._copy_event(_);
      o.id = d, o.event_pid = _.event_pid || n[0];
      var c = r;
      o.event_length = c, o.rec_type = o.rec_pattern = "none", this.addEvent(o), this._add_rec_marker(o, 1e3 * c);
    } else {
      _.rec_type && this._lightbox_id && this._roll_back_dates(_);
      var h = this._get_rec_markers(n);
      for (var y in h)
        h.hasOwnProperty(y) && (n = h[y].id, this.getEvent(n) && this.deleteEvent(n, !0));
    }
    return !0;
  }), e.attachEvent("onEventDeleted", function(n, _) {
    !this._is_virtual_event(n) && this._is_modified_occurence(_) && (e._events[n] || (_.rec_type = _.rec_pattern = "none", this.setEvent(n, _)));
  }), e.attachEvent("onEventChanged", function(n, _) {
    if (this._loading)
      return !0;
    var d = this.getEvent(n);
    if (this._is_virtual_event(n)) {
      n = n.split("#");
      var r = this.uid();
      this._not_render = !0;
      var o = this._copy_event(_);
      o.id = r, o.event_pid = n[0];
      var c = n[1];
      o.event_length = c, o.rec_type = o.rec_pattern = "", this._add_rec_marker(o, 1e3 * c), this.addEvent(o), this._not_render = !1;
    } else {
      d.start_date && (d.start_date = a(d.start_date)), d.end_date && (d.end_date = a(d.end_date)), d.rec_type && this._lightbox_id && this._roll_back_dates(d);
      var h = this._get_rec_markers(n);
      for (var y in h)
        h.hasOwnProperty(y) && (delete this._rec_markers[h[y].id], this.deleteEvent(h[y].id, !0));
      delete this._rec_markers_pull[n];
      for (var b = !1, p = 0; p < this._rendered.length; p++)
        this._rendered[p].getAttribute(this.config.event_attribute) == n && (b = !0);
      b || (this._select_id = null);
    }
    return !0;
  }), e.attachEvent("onEventAdded", function(n) {
    if (!this._loading) {
      var _ = this.getEvent(n);
      _.rec_type && !_.event_length && this._roll_back_dates(_);
    }
    return !0;
  }), e.attachEvent("onEventSave", function(n, _, d) {
    return this.getEvent(n).rec_type || !_.rec_type || this._is_virtual_event(n) || (this._select_id = null), !0;
  }), e.attachEvent("onEventCreated", function(n) {
    var _ = this.getEvent(n);
    return _.rec_type || (_.rec_type = _.rec_pattern = _.event_length = _.event_pid = ""), !0;
  }), e.attachEvent("onEventCancel", function(n) {
    var _ = this.getEvent(n);
    _.rec_type && (this._roll_back_dates(_), this.render_view_data());
  }), e._roll_back_dates = function(n) {
    n.start_date && (n.start_date = a(n.start_date)), n.end_date && (n.end_date = a(n.end_date)), n.event_length = Math.round((n.end_date.valueOf() - n.start_date.valueOf()) / 1e3), n.end_date = n._end_date, n._start_date && (n.start_date.setMonth(0), n.start_date.setDate(n._start_date.getDate()), n.start_date.setMonth(n._start_date.getMonth()), n.start_date.setFullYear(n._start_date.getFullYear()));
  }, e._is_virtual_event = function(n) {
    return n.toString().indexOf("#") != -1;
  }, e._is_modified_occurence = function(n) {
    return n.event_pid && n.event_pid != "0";
  }, e.showLightbox_rec = e.showLightbox, e.showLightbox = function(n) {
    var _ = this.locale, d = e.config.lightbox_recurring, r = this.getEvent(n), o = r.event_pid, c = this._is_virtual_event(n);
    c && (o = n.split("#")[0]);
    var h = function(b) {
      var p = e.getEvent(b);
      return p._end_date = p.end_date, p.end_date = new Date(p.start_date.valueOf() + 1e3 * p.event_length), e.showLightbox_rec(b);
    };
    if ((o || 1 * o == 0) && r.rec_type)
      return h(n);
    if (!o || o === "0" || !_.labels.confirm_recurring || d == "instance" || d == "series" && !c)
      return this.showLightbox_rec(n);
    if (d == "ask") {
      var y = this;
      e.modalbox({ text: _.labels.confirm_recurring, title: _.labels.title_confirm_recurring, width: "500px", position: "middle", buttons: [_.labels.button_edit_series, _.labels.button_edit_occurrence, _.labels.icon_cancel], callback: function(b) {
        switch (+b) {
          case 0:
            return h(o);
          case 1:
            return y.showLightbox_rec(n);
          case 2:
            return;
        }
      } });
    } else
      h(o);
  }, e.get_visible_events_rec = e.get_visible_events, e.get_visible_events = function(n) {
    for (var _ = 0; _ < this._rec_temp.length; _++)
      delete this._events[this._rec_temp[_].id];
    this._rec_temp = [];
    var d = this.get_visible_events_rec(n), r = [];
    for (_ = 0; _ < d.length; _++)
      d[_].rec_type ? d[_].rec_pattern != "none" && this.repeat_date(d[_], r) : r.push(d[_]);
    return r;
  }, function() {
    var n = e.isOneDayEvent;
    e.isOneDayEvent = function(d) {
      return !!d.rec_type || n.call(this, d);
    };
    var _ = e.updateEvent;
    e.updateEvent = function(d) {
      var r = e.getEvent(d);
      r && r.rec_type && (r.rec_pattern = (r.rec_type || "").split("#")[0]), r && r.rec_type && !this._is_virtual_event(d) ? e.update_view() : _.call(this, d);
    };
  }(), e.transponse_size = { day: 1, week: 7, month: 1, year: 12 }, e.date.day_week = function(n, _, d) {
    n.setDate(1);
    var r = e.date.month_start(new Date(n)), o = 1 * _ + (d = 7 * (d - 1)) - n.getDay() + 1;
    n.setDate(o <= d ? o + 7 : o);
    var c = e.date.month_start(new Date(n));
    return r.valueOf() === c.valueOf();
  }, e.transpose_day_week = function(n, _, d, r, o) {
    for (var c = (n.getDay() || (e.config.start_on_monday ? 7 : 0)) - d, h = 0; h < _.length; h++)
      if (_[h] > c)
        return n.setDate(n.getDate() + 1 * _[h] - c - (r ? d : o));
    this.transpose_day_week(n, _, d + r, null, d);
  }, e.transpose_type = function(n) {
    var _ = "transpose_" + n;
    if (!this.date[_]) {
      var d = n.split("_"), r = "add_" + n, o = this.transponse_size[d[0]] * d[1];
      if (d[0] == "day" || d[0] == "week") {
        var c = null;
        if (d[4] && (c = d[4].split(","), e.config.start_on_monday)) {
          for (var h = 0; h < c.length; h++)
            c[h] = 1 * c[h] || 7;
          c.sort();
        }
        this.date[_] = function(y, b) {
          var p = Math.floor((b.valueOf() - y.valueOf()) / (864e5 * o));
          return p > 0 && y.setDate(y.getDate() + p * o), c && e.transpose_day_week(y, c, 1, o), y;
        }, this.date[r] = function(y, b) {
          var p = new Date(y.valueOf());
          if (c)
            for (var u = 0; u < b; u++)
              e.transpose_day_week(p, c, 0, o);
          else
            p.setDate(p.getDate() + b * o);
          return p;
        };
      } else
        d[0] != "month" && d[0] != "year" || (this.date[_] = function(y, b, p) {
          var u = Math.ceil((12 * b.getFullYear() + 1 * b.getMonth() + 1 - (12 * y.getFullYear() + 1 * y.getMonth() + 1)) / o - 1);
          return u >= 0 && (y.setDate(1), y.setMonth(y.getMonth() + u * o)), e.date[r](y, 0, p);
        }, this.date[r] = function(y, b, p, u) {
          if (u ? u++ : u = 1, u > 12)
            return null;
          var m = new Date(y.valueOf());
          m.setDate(1), m.setMonth(m.getMonth() + b * o);
          var l = m.getMonth(), f = m.getFullYear();
          m.setDate(p.start_date.getDate()), d[3] && e.date.day_week(m, d[2], d[3]);
          var g = e.config.recurring_overflow_instances;
          return m.getMonth() != l && g != "none" && (m = g === "lastDay" ? new Date(f, l + 1, 0, m.getHours(), m.getMinutes(), m.getSeconds(), m.getMilliseconds()) : e.date[r](new Date(f, l + 1, 0), b || 1, p, u)), m;
        });
    }
  }, e.repeat_date = function(n, _, d, r, o, c) {
    r = r || this._min_date, o = o || this._max_date;
    var h = c || -1, y = new Date(n.start_date.valueOf()), b = y.getHours(), p = 0;
    for (!n.rec_pattern && n.rec_type && (n.rec_pattern = n.rec_type.split("#")[0]), this.transpose_type(n.rec_pattern), y = e.date["transpose_" + n.rec_pattern](y, r, n); y && (y < n.start_date || e._fix_daylight_saving_date(y, r, n, y, new Date(y.valueOf() + 1e3 * n.event_length)).valueOf() <= r.valueOf() || y.valueOf() + 1e3 * n.event_length <= r.valueOf()); )
      y = this.date["add_" + n.rec_pattern](y, 1, n);
    for (; y && y < o && y < n.end_date && (h < 0 || p < h); ) {
      y.setHours(b);
      var u = e.config.occurrence_timestamp_in_utc ? Date.UTC(y.getFullYear(), y.getMonth(), y.getDate(), y.getHours(), y.getMinutes(), y.getSeconds()) : y.valueOf(), m = this._get_rec_marker(u, n.id);
      if (m)
        d && (m.rec_type != "none" && p++, _.push(m));
      else {
        var l = new Date(y.valueOf() + 1e3 * n.event_length), f = this._copy_event(n);
        if (f.text = n.text, f.start_date = y, f.event_pid = n.id, f.id = n.id + "#" + Math.round(u / 1e3), f.end_date = l, f.end_date = e._fix_daylight_saving_date(f.start_date, f.end_date, n, y, f.end_date), f._timed = this.isOneDayEvent(f), !f._timed && !this._table_view && !this.config.multi_day)
          return;
        _.push(f), d || (this._events[f.id] = f, this._rec_temp.push(f)), p++;
      }
      y = this.date["add_" + n.rec_pattern](y, 1, n);
    }
  }, e._fix_daylight_saving_date = function(n, _, d, r, o) {
    var c = n.getTimezoneOffset() - _.getTimezoneOffset();
    return c ? c > 0 ? new Date(r.valueOf() + 1e3 * d.event_length - 60 * c * 1e3) : new Date(_.valueOf() - 60 * c * 1e3) : new Date(o.valueOf());
  }, e.getRecDates = function(n, _) {
    var d = typeof n == "object" ? n : e.getEvent(n), r = [];
    if (_ = _ || 100, !d.rec_type)
      return [{ start_date: d.start_date, end_date: d.end_date }];
    if (d.rec_type == "none")
      return [];
    e.repeat_date(d, r, !0, d.start_date, d.end_date, _);
    for (var o = [], c = 0; c < r.length; c++)
      r[c].rec_type != "none" && o.push({ start_date: r[c].start_date, end_date: r[c].end_date });
    return o;
  }, e.getEvents = function(n, _) {
    var d = [];
    for (var r in this._events) {
      var o = this._events[r];
      if (o && o.start_date < _ && o.end_date > n)
        if (o.rec_pattern) {
          if (o.rec_pattern == "none")
            continue;
          var c = [];
          this.repeat_date(o, c, !0, n, _);
          for (var h = 0; h < c.length; h++)
            !c[h].rec_pattern && c[h].start_date < _ && c[h].end_date > n && !this._rec_markers[c[h].id] && d.push(c[h]);
        } else
          this._is_virtual_event(o.id) || d.push(o);
    }
    return d;
  }, e.config.repeat_date = "%m.%d.%Y", e.config.lightbox.sections = [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "recurring", type: "recurring", map_to: "rec_type", button: "recurring" }, { name: "time", height: 72, type: "time", map_to: "auto" }], e._copy_dummy = function(n) {
    var _ = new Date(this.start_date), d = new Date(this.end_date);
    this.start_date = _, this.end_date = d, this.event_length = this.event_pid = this.rec_pattern = this.rec_type = null;
  }, e.config.include_end_by = !1, e.config.lightbox_recurring = "ask", e.attachEvent("onClearAll", function() {
    e._rec_markers = {}, e._rec_markers_pull = {}, e._rec_temp = [];
  });
}, serialize: function(e) {
  const i = ea(e);
  e.data_attributes = function() {
    var t = [], a = e._helpers.formatDate, s = i();
    for (var n in s) {
      var _ = s[n];
      for (var d in _)
        d.substr(0, 1) != "_" && t.push([d, d == "start_date" || d == "end_date" ? a : null]);
      break;
    }
    return t;
  }, e.toXML = function(t) {
    var a = [], s = this.data_attributes(), n = i();
    for (var _ in n) {
      var d = n[_];
      a.push("<event>");
      for (var r = 0; r < s.length; r++)
        a.push("<" + s[r][0] + "><![CDATA[" + (s[r][1] ? s[r][1](d[s[r][0]]) : d[s[r][0]]) + "]]></" + s[r][0] + ">");
      a.push("</event>");
    }
    return (t || "") + "<data>" + a.join(`
`) + "</data>";
  }, e._serialize_json_value = function(t) {
    return t === null || typeof t == "boolean" ? t = "" + t : (t || t === 0 || (t = ""), t = '"' + t.toString().replace(/\n/g, "").replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'), t;
  }, e.toJSON = function() {
    return JSON.stringify(this.serialize());
  }, e.toICal = function(t) {
    var a = e.date.date_to_str("%Y%m%dT%H%i%s"), s = e.date.date_to_str("%Y%m%d"), n = [], _ = i();
    for (var d in _) {
      var r = _[d];
      n.push("BEGIN:VEVENT"), r._timed && (r.start_date.getHours() || r.start_date.getMinutes()) ? n.push("DTSTART:" + a(r.start_date)) : n.push("DTSTART:" + s(r.start_date)), r._timed && (r.end_date.getHours() || r.end_date.getMinutes()) ? n.push("DTEND:" + a(r.end_date)) : n.push("DTEND:" + s(r.end_date)), n.push("SUMMARY:" + r.text), n.push("END:VEVENT");
    }
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
DESCRIPTION:` + (t || "") + `
` + n.join(`
`) + `
END:VCALENDAR`;
  };
}, timeline: function(e) {
  function i() {
    var t = document.createElement("p");
    t.style.width = "100%", t.style.height = "200px";
    var a = document.createElement("div");
    a.style.position = "absolute", a.style.top = "0px", a.style.left = "0px", a.style.visibility = "hidden", a.style.width = "200px", a.style.height = "150px", a.style.overflow = "hidden", a.appendChild(t), document.body.appendChild(a);
    var s = t.offsetWidth;
    a.style.overflow = "scroll";
    var n = t.offsetWidth;
    return s == n && (n = a.clientWidth), document.body.removeChild(a), s - n;
  }
  e.ext.timeline = { renderCells: function(t, a, s) {
    if (!t || !t.length)
      return;
    const n = [];
    for (let _ = 0; _ < t.length; _++) {
      const d = t[_];
      let r = "";
      d.$width && (r = "width:" + d.$width + "px;");
      let o = s;
      d.css && (o += " " + d.css), _ === 0 && (o += " " + s + "_first"), _ === t.length - 1 && (o += " " + s + "_last");
      const c = a(d) || "";
      n.push(`<div class='${o}' style='${r}'><div class='dhx_timeline_label_content_wrapper'>${c}</div></div>`);
    }
    return n.join("");
  }, renderHeading: function() {
    return this.renderCells(this.columns, function(t) {
      return t.label;
    }, "dhx_timeline_label_column dhx_timeline_label_column_header");
  }, renderColumns: function(t) {
    return this.renderCells(this.columns, function(a) {
      return a.template && a.template.call(self, t) || "";
    }, "dhx_timeline_label_column");
  }, scrollTo: function(t) {
    if (t) {
      var a;
      a = t.date ? t.date : t.left ? t.left : t;
      var s, n = -1;
      if (t.section ? n = this.getSectionTop(t.section) : t.top && (n = t.top), s = typeof a == "number" ? a : this.posFromDate(a), e.config.rtl) {
        var _ = +e.$container.querySelector(".dhx_timeline_label_wrapper").style.height.replace("px", ""), d = this._section_height[this.y_unit.length] + this._label_rows[this._label_rows.length - 1].top;
        this.scrollHelper.getMode() == this.scrollHelper.modes.minMax && (d > _ || this.render == "tree") && (s -= i());
      }
      var r = e.$container.querySelector(".dhx_timeline_data_wrapper");
      this.scrollable || (r = e.$container.querySelector(".dhx_cal_data")), this.scrollable && this.scrollHelper.setScrollValue(r, s), n >= 0 && (r.scrollTop = n);
    }
  }, getScrollPosition: function() {
    return { left: this._x_scroll || 0, top: this._y_scroll || 0 };
  }, posFromDate: function(t) {
    return e._timeline_getX({ start_date: t }, !1, this) - 1;
  }, dateFromPos: function(t) {
    return e._timeline_drag_date(this, t);
  }, sectionFromPos: function(t) {
    var a = { y: t };
    return e._resolve_timeline_section(this, a), a.section;
  }, resolvePosition: function(t) {
    var a = { date: null, section: null };
    return t.left && (a.date = this.dateFromPos(t.left)), t.top && (a.section = this.sectionFromPos(t.top)), a;
  }, getSectionHeight: function(t) {
    return this._section_height[t];
  }, getSectionTop: function(t) {
    return this._rowStats[t].top;
  }, getEventTop: function(t) {
    var a = this.getEventHeight(t), s = t._sorder || 0, n = 1 + s * (a - 3) + (s ? 2 * s : 0);
    return e.config.cascade_event_display && (n = 1 + s * e.config.cascade_event_margin + (s ? 2 * s : 0)), n;
  }, getEventHeight: function(t) {
    var a = this, s = t[a.y_property], n = a.event_dy;
    const _ = a.order[s];
    return a.event_dy == "full" && (a.section_autoheight ? (e._timeline_get_cur_row_stats(this, _), n = a.getSectionHeight(s) - 6) : n = a.dy - 3), a.resize_events && (n = Math.max(Math.floor(n / (t._count || 1)), a.event_min_dy)), n;
  } }, e._temp_matrix_scope = function() {
    function t(l, f) {
      if (f = f || [], l.children)
        for (var g = 0; g < l.children.length; g++)
          f.push(l.children[g].key), t(l.children[g], f);
      return f;
    }
    function a(l, f) {
      var g = f.order[l];
      return g === void 0 && (g = "$_" + l), g;
    }
    function s(l, f) {
      if (f[l.key] = l, l.children)
        for (var g = 0; g < l.children.length; g++)
          s(l.children[g], f);
    }
    function n(l, f) {
      for (var g, x = [], w = 0; w < f.y_unit.length; w++)
        x[w] = [];
      x[g] || (x[g] = []);
      var E = function(H) {
        for (var z = {}, $ = H.y_unit_original || H.y_unit, q = 0; q < $.length; q++)
          s($[q], z);
        return z;
      }(f), k = f.render == "tree";
      function S(H, z, $, q) {
        H[z] || (H[z] = []);
        for (var R = $; R <= q; R++)
          H[z][R] || (H[z][R] = []), H[z][R].push(D);
      }
      k && (x.$tree = {});
      var v = f.y_property;
      for (w = 0; w < l.length; w++) {
        var D = l[w], M = D[v];
        g = a(M, f);
        var N = e._get_date_index(f, D.start_date), T = e._get_date_index(f, D.end_date);
        D.end_date.valueOf() == f._trace_x[T].valueOf() && (T -= 1), x[g] || (x[g] = []), S(x, g, N, T);
        var A = E[M];
        if (k && A && A.$parent)
          for (var C = {}; A.$parent; ) {
            if (C[A.key])
              throw new Error("Invalid sections tree. Section `{key:'" + A.key + "', label:'" + A.label + "'}` has the same key as one of its parents. Make sure all sections have unique keys");
            C[A.key] = !0;
            var O = E[A.$parent];
            S(x.$tree, O.key, N, T), A = O;
          }
      }
      return x;
    }
    e.matrix = {}, e._merge = function(l, f) {
      for (var g in f)
        l[g] === void 0 && (l[g] = f[g]);
    }, e.createTimelineView = function(l) {
      e._merge(l, { scrollHelper: Hn(), column_width: 100, autoscroll: { range_x: 200, range_y: 100, speed_x: 20, speed_y: 10 }, _is_new_view: !0, _section_autowidth: !0, _x_scroll: 0, _y_scroll: 0, _h_cols: {}, _label_rows: [], section_autoheight: !0, layout: "timeline", name: "matrix", x: "time", y: "time", x_step: 1, x_unit: "hour", y_unit: "day", y_step: 1, x_start: 0, x_size: 24, y_start: 0, y_size: 7, x_date: e.config.hour_date, render: "cell", dx: 200, dy: 50, event_dy: e.xy.bar_height, event_min_dy: e.xy.bar_height, resize_events: !0, fit_events: !0, fit_events_offset: 0, show_unassigned: !1, second_scale: !1, round_position: !1, _logic: function(k, S, v) {
        var D = {};
        return e.checkEvent("onBeforeSectionRender") && (D = e.callEvent("onBeforeSectionRender", [k, S, v])), D;
      } }), l._original_x_start = l.x_start, l.x_unit != "day" && (l.first_hour = l.last_hour = 0), l._start_correction = l.first_hour ? 60 * l.first_hour * 60 * 1e3 : 0, l._end_correction = l.last_hour ? 60 * (24 - l.last_hour) * 60 * 1e3 : 0, e.checkEvent("onTimelineCreated") && e.callEvent("onTimelineCreated", [l]), nt(l), e.attachEvent("onDestroy", function() {
        l.detachAllEvents();
      });
      var f = e.render_data;
      e.render_data = function(k, S) {
        if (this._mode != l.name)
          return f.apply(this, arguments);
        if (!S || l.show_unassigned && !e.getState().drag_id || l.render == "cell")
          e._renderMatrix.call(l, !0, !0);
        else
          for (var v = 0; v < k.length; v++)
            this.clear_event(k[v]), this.render_timeline_event.call(this.matrix[this._mode], k[v], !0);
      }, e.matrix[l.name] = l, e.templates[l.name + "_cell_value"] = function(k) {
        return k ? k.length : "";
      }, e.templates[l.name + "_cell_class"] = function(k) {
        return "";
      }, e.templates[l.name + "_second_scalex_class"] = function(k) {
        return "";
      }, e.templates[l.name + "_row_class"] = function(k, S) {
        return S.folder_events_available && k.children ? "folder" : "";
      }, e.templates[l.name + "_scaley_class"] = function(k, S, v) {
        return "";
      }, l.attachEvent("onBeforeRender", function() {
        return l.columns && l.columns.length && function(k, S) {
          var v = S.dx, D = 0, M = [];
          k.forEach(function(C) {
            C.width ? (D += C.width, C.$width = C.width) : M.push(C);
          });
          var N = !1, T = v - D;
          (T < 0 || M.length === 0) && (N = !0);
          var A = M.length;
          M.forEach(function(C) {
            C.$width = Math.max(Math.floor(T / A), 20), T -= C.$width, D += C.$width, A--;
          }), N && (S.dx = D);
        }(l.columns, l), !0;
      }), l.renderColumns = l.renderColumns || e.ext.timeline.renderColumns.bind(l), l.renderHeading = l.renderHeading || e.ext.timeline.renderHeading.bind(l), l.renderCells = l.renderCells || e.ext.timeline.renderCells.bind(l), e.templates[l.name + "_scale_label"] = function(k, S, v) {
        return l.columns && l.columns.length ? l.renderColumns(v) : S;
      }, e.templates[l.name + "_scale_header"] = function(k) {
        return l.columns ? k.renderHeading(k) : e.locale.labels[l.name + "_scale_header"] || "";
      }, e.templates[l.name + "_tooltip"] = function(k, S, v) {
        return v.text;
      }, e.templates[l.name + "_date"] = function(k, S) {
        return k.getDay() == S.getDay() && S - k < 864e5 || +k == +e.date.date_part(new Date(S)) || +e.date.add(k, 1, "day") == +S && S.getHours() === 0 && S.getMinutes() === 0 ? e.templates.day_date(k) : k.getDay() != S.getDay() && S - k < 864e5 ? e.templates.day_date(k) + " &ndash; " + e.templates.day_date(S) : e.templates.week_date(k, S);
      };
      let g = l.x_date || e.config.hour_date, x = null;
      e.templates[l.name + "_scale_date"] = function(k) {
        return g === (l.x_date || e.config.hour_date) && x || (g = l.x_date || e.config.hour_date, x = e.date.date_to_str(g)), x(k);
      };
      let w = l.second_scale && l.second_scale.x_date ? l.second_scale.x_date : e.config.hour_date, E = null;
      e.templates[l.name + "_second_scale_date"] = function(k) {
        return w === (l.second_scale.x_date || e.config.hour_date) && E || (w = l.second_scale && l.second_scale.x_date ? l.second_scale.x_date : e.config.hour_date, E = e.date.date_to_str(w)), E(k);
      }, e.date["add_" + l.name + "_private"] = function(k, S) {
        var v = S, D = l.x_unit;
        if (l.x_unit == "minute" || l.x_unit == "hour") {
          var M = v;
          l.x_unit == "hour" && (M *= 60), M % 1440 || (v = M / 1440, D = "day");
        }
        return e.date.add(k, v, D);
      }, e.date["add_" + l.name] = function(k, S, v) {
        var D = e.date["add_" + l.name + "_private"](k, (l.x_length || l.x_size) * l.x_step * S);
        if (l.x_unit == "minute" || l.x_unit == "hour") {
          var M = l.x_length || l.x_size, N = l.x_unit == "hour" ? 60 * l.x_step : l.x_step;
          if (N * M % 1440)
            if (+e.date.date_part(new Date(k)) == +e.date.date_part(new Date(D)))
              l.x_start += S * M;
            else {
              var T = 1440 / (M * N) - 1, A = Math.round(T * M);
              l.x_start = S > 0 ? l.x_start - A : A + l.x_start;
            }
        }
        return D;
      }, e.date[l.name + "_start"] = function(k) {
        var S = (e.date[l.x_unit + "_start"] || e.date.day_start).call(e.date, k), v = S.getTimezoneOffset(), D = (S = e.date.add(S, l.x_step * l.x_start, l.x_unit)).getTimezoneOffset();
        return v != D && S.setTime(S.getTime() + 6e4 * (D - v)), S;
      }, l._smartRenderingEnabled = function() {
        var k = null;
        (this.scrollable || this.smart_rendering) && (k = e._timeline_smart_render.getViewPort(this.scrollHelper, this._sch_height));
        var S = !!k;
        return !!(this.scrollable ? this.smart_rendering !== !1 && S : this.smart_rendering && S);
      }, l.scrollTo = l.scrollTo || e.ext.timeline.scrollTo.bind(l), l.getScrollPosition = l.getScrollPosition || e.ext.timeline.getScrollPosition.bind(l), l.posFromDate = l.posFromDate || e.ext.timeline.posFromDate.bind(l), l.dateFromPos = l.dateFromPos || e.ext.timeline.dateFromPos.bind(l), l.sectionFromPos = l.sectionFromPos || e.ext.timeline.sectionFromPos.bind(l), l.resolvePosition = l.resolvePosition || e.ext.timeline.resolvePosition.bind(l), l.getSectionHeight = l.getSectionHeight || e.ext.timeline.getSectionHeight.bind(l), l.getSectionTop = l.getSectionTop || e.ext.timeline.getSectionTop.bind(l), l.getEventTop = l.getEventTop || e.ext.timeline.getEventTop.bind(l), l.getEventHeight = l.getEventHeight || e.ext.timeline.getEventHeight.bind(l), l.selectEvents = e.bind(function(k) {
        var S = k.section, v = k.date, D = k.selectNested;
        return v ? function(M, N, T, A) {
          var C = e._timeline_smart_render.getPreparedEvents(A), O = [], H = [], z = A.order[M], $ = A.y_unit[z];
          if (!$)
            return [];
          var q = e._get_date_index(A, N);
          return C.$matrix ? (O = C.$matrix[z][q] || [], T && C.$matrix.$tree && C.$matrix.$tree[$.key] && (H = C.$matrix.$tree[$.key][q] || []), O.concat(H)) : C[z] || [];
        }(S, v, D, this) : S ? function(M, N, T) {
          var A = e._timeline_smart_render.getPreparedEvents(T), C = T.order[M], O = T.y_unit[C];
          if (!O)
            return [];
          var H = [M];
          N && t(O, H);
          for (var z = [], $ = 0; $ < H.length; $++)
            if ((C = T.order[H[$]]) !== void 0 && A[C])
              z = z.concat(A[C]);
            else if (A.undefined)
              for (var q = 0; q < A.undefined.length; q++) {
                var R = A.undefined[q];
                R[T.y_property] == H[$] && z.push(R);
              }
          return z;
        }(S, D, this) : void 0;
      }, l), l.setRange = e.bind(function(k, S) {
        var v = e.date[this.name + "_start"](new Date(k)), D = function(M, N, T) {
          for (var A = 0, C = e.date[T.name + "_start"](new Date(M)), O = T.x_step, H = T.x_unit; C < N; )
            A++, C = e.date.add(C, O, H);
          return A;
        }(k, S, this);
        this.x_size = D, e.setCurrentView(v, this.name);
      }, l), e.callEvent("onOptionsLoad", [l]), e[l.name + "_view"] = function(k) {
        k ? e._set_timeline_dates(l) : e._renderMatrix.apply(l, arguments);
      }, e["mouse_" + l.name] = function(k) {
        var S = this._drag_event;
        if (this._drag_id && (S = this.getEvent(this._drag_id)), l.scrollable && !k.converted) {
          if (k.converted = 1, k.x += -l.dx + l._x_scroll, e.config.rtl) {
            var v = +e.$container.querySelector(".dhx_timeline_label_wrapper").style.height.replace("px", ""), D = l._section_height[l.y_unit.length] + l._label_rows[l._label_rows.length - 1].top;
            k.x += e.xy.scale_width, l.scrollHelper.getMode() == l.scrollHelper.modes.minMax && (D > v || l.render == "tree") && (k.x += i());
          }
          k.y += l._y_scroll;
        } else
          e.config.rtl ? k.x -= l.dx - e.xy.scale_width : k.x -= l.dx;
        var M = e._timeline_drag_date(l, k.x);
        if (k.x = 0, k.force_redraw = !0, k.custom = !0, this._drag_mode == "move" && this._drag_id && this._drag_event) {
          S = this.getEvent(this._drag_id);
          var N = this._drag_event;
          if (k._ignores = this._ignores_detected || l._start_correction || l._end_correction, N._move_delta === void 0 && (N._move_delta = (S.start_date - M) / 6e4, this.config.preserve_length && k._ignores && (N._move_delta = this._get_real_event_length(S.start_date, M, l), N._event_length = this._get_real_event_length(S.start_date, S.end_date, l))), this.config.preserve_length && k._ignores) {
            var T = this._get_fictional_event_length(M, N._move_delta, l, !0);
            M = new Date(M - T);
          } else
            M = e.date.add(M, N._move_delta, "minute");
        }
        if (this._drag_mode == "resize" && S && (this.config.timeline_swap_resize && this._drag_id && (this._drag_from_start && +M > +S.end_date ? this._drag_from_start = !1 : !this._drag_from_start && +M < +S.start_date && (this._drag_from_start = !0)), k.resize_from_start = this._drag_from_start, !this.config.timeline_swap_resize && this._drag_id && this._drag_from_start && +M >= +e.date.add(S.end_date, -e.config.time_step, "minute") && (M = e.date.add(S.end_date, -e.config.time_step, "minute"))), l.round_position)
          switch (this._drag_mode) {
            case "move":
              this.config.preserve_length || (M = e._timeline_get_rounded_date.call(l, M, !1), l.x_unit == "day" && (k.custom = !1));
              break;
            case "resize":
              this._drag_event && (this._drag_event._resize_from_start !== null && this._drag_event._resize_from_start !== void 0 || (this._drag_event._resize_from_start = k.resize_from_start), k.resize_from_start = this._drag_event._resize_from_start, M = e._timeline_get_rounded_date.call(l, M, !this._drag_event._resize_from_start));
          }
        this._resolve_timeline_section(l, k), k.section && this._update_timeline_section({ pos: k, event: this.getEvent(this._drag_id), view: l }), k.y = Math.round((this._correct_shift(M, 1) - this._min_date) / (6e4 * this.config.time_step)), k.shift = this.config.time_step, l.round_position && this._drag_mode == "new-size" && M <= this._drag_start && (k.shift = e.date.add(this._drag_start, l.x_step, l.x_unit) - this._drag_start);
        var A = this._is_pos_changed(this._drag_pos, k);
        return this._drag_pos && A && (this._drag_event._dhx_changed = !0), A || this._drag_pos.has_moved || (k.force_redraw = !1), k;
      };
    }, e._prepare_timeline_events = function(l) {
      var f = [];
      if (l.render == "cell")
        f = e._timeline_trace_events.call(l);
      else {
        for (var g = e.get_visible_events(), x = l.order, w = 0; w < g.length; w++) {
          var E = g[w], k = E[l.y_property], S = l.order[k];
          if (l.show_unassigned && !k) {
            for (var v in x)
              if (x.hasOwnProperty(v)) {
                f[S = x[v]] || (f[S] = []);
                var D = e._lame_copy({}, E);
                D[l.y_property] = v, f[S].push(D);
                break;
              }
          } else
            f[S] || (f[S] = []), f[S].push(E);
        }
        f.$matrix = e._timeline_trace_events.call(l);
      }
      return f;
    }, e._populate_timeline_rendered = function(l) {
      e._rendered = [];
      const f = l.querySelector(".dhx_timeline_data_col"), g = Array.prototype.slice.call(f.children);
      e._timeline_smart_render && e._timeline_smart_render._rendered_events_cache && (e._timeline_smart_render._rendered_events_cache = []), g.forEach(function(x) {
        const w = Number(x.getAttribute("data-section-index"));
        Array.prototype.slice.call(x.children).forEach(function(E) {
          const k = E.getAttribute(e.config.event_attribute);
          if (k && (e._rendered.push(E), e._timeline_smart_render && e._timeline_smart_render._rendered_events_cache)) {
            const S = e._timeline_smart_render._rendered_events_cache;
            S[w] || (S[w] = []), S[w].push(k);
          }
        });
      });
    }, e.render_timeline_event = function(l, f) {
      var g = l[this.y_property];
      if (!g)
        return "";
      var x = l._sorder, w = e._timeline_getX(l, !1, this), E = e._timeline_getX(l, !0, this), k = e._get_timeline_event_height ? e._get_timeline_event_height(l, this) : this.getEventHeight(l), S = k - 2;
      if (!l._inner && this.event_dy == "full") {
        var v = l._count - x;
        v == 0 && (v = 1), S = (S + 1) * v - 2;
      }
      var D = e._get_timeline_event_y ? e._get_timeline_event_y(l._sorder, k) : this.getEventTop(l), M = k + D + 2;
      (!this._events_height[g] || this._events_height[g] < M) && (this._events_height[g] = M);
      var N = e.templates.event_class(l.start_date, l.end_date, l);
      N = "dhx_cal_event_line " + (N || ""), e.getState().select_id == l.id && (N += " dhx_cal_event_selected"), l._no_drag_move && (N += " no_drag_move");
      var T = l.color ? "--dhx-scheduler-event-background:" + l.color + ";" : "", A = l.textColor ? "--dhx-scheduler-event-color:" + l.textColor + ";" : "", C = e.templates.event_bar_text(l.start_date, l.end_date, l);
      const O = Math.max(0, E - w);
      O < 70 && (N += " dhx_cal_event--small"), O < 40 && (N += " dhx_cal_event--xsmall");
      var H = "<div " + e._waiAria.eventBarAttrString(l) + " event_id='" + l.id + "' " + e.config.event_attribute + "='" + l.id + "' class='" + N + "' style='" + T + A + "position:absolute; top:" + D + "px; height: " + S + "px; " + (e.config.rtl ? "right:" : "left:") + w + "px; width:" + O + "px;" + (l._text_style || "") + "'>";
      if (e.config.drag_resize && !e.config.readonly) {
        var z = "dhx_event_resize", $ = S + 1, q = "<div class='" + z + " " + z + "_start' style='height: " + $ + "px;'></div>", R = "<div class='" + z + " " + z + "_end' style='height: " + $ + "px;'></div>";
        H += (l._no_resize_start ? "" : q) + (l._no_resize_end ? "" : R);
      }
      if (H += C + "</div>", !f)
        return H;
      var U = document.createElement("div");
      U.innerHTML = H;
      var Y = this._scales[g];
      Y && (e._rendered.push(U.firstChild), Y.appendChild(U.firstChild));
    };
    var _ = function(l) {
      return String(l).replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    };
    function d(l) {
      return l.height && !isNaN(Number(l.height));
    }
    function r(l) {
      return e._helpers.formatDate(l);
    }
    function o(l, f) {
      var g = l.querySelector(".dhx_timeline_data_wrapper");
      return f.scrollable || (g = e.$container.querySelector(".dhx_cal_data")), g;
    }
    function c() {
      return e.$container.querySelector(".dhx_cal_data .dhx_timeline_label_col");
    }
    e._timeline_trace_events = function() {
      return n(e.get_visible_events(), this);
    }, e._timeline_getX = function(l, f, g) {
      var x = 0, w = g._step, E = g.round_position, k = 0, S = f ? l.end_date : l.start_date;
      g.x_unit == "month" && (w = 24 * new Date(new Date(S).getFullYear(), new Date(S).getMonth() + 1, 0).getDate() * 60 * 60 * 1e3 / e._cols[0]), S.valueOf() > e._max_date.valueOf() && (S = e._max_date);
      var v = S - e._min_date_timeline;
      if (v > 0) {
        var D = e._get_date_index(g, S);
        e._ignores[D] && (E = !0);
        for (var M = 0; M < D; M++)
          x += e._cols[M];
        var N = e._timeline_get_rounded_date.apply(g, [S, !1]);
        E ? +S > +N && f && (k = e._cols[D]) : (v = S - N, g.first_hour || g.last_hour ? ((v -= g._start_correction) < 0 && (v = 0), (k = Math.round(v / w)) > e._cols[D] && (k = e._cols[D])) : k = Math.round(v / w));
      }
      return x += f && (v === 0 || E) ? k - 1 : k;
    }, e._timeline_get_rounded_date = function(l, f) {
      var g = e._get_date_index(this, l), x = this._trace_x[g];
      return f && +l != +this._trace_x[g] && (x = this._trace_x[g + 1] ? this._trace_x[g + 1] : e.date.add(this._trace_x[g], this.x_step, this.x_unit)), new Date(x);
    }, e._timeline_skip_ignored = function(l) {
      if (e._ignores_detected)
        for (var f, g, x, w, E = 0; E < l.length; E++) {
          for (w = l[E], x = !1, f = e._get_date_index(this, w.start_date), g = e._get_date_index(this, w.end_date); f < g; ) {
            if (!e._ignores[f]) {
              x = !0;
              break;
            }
            f++;
          }
          x || f != g || e._ignores[g] || +w.end_date > +this._trace_x[g] && (x = !0), x || (l.splice(E, 1), E--);
        }
    }, e._timeline_calculate_event_positions = function(l) {
      if (l && this.render != "cell") {
        e._timeline_skip_ignored.call(this, l), l.sort(this.sort || function(z, $) {
          return z.start_date.valueOf() == $.start_date.valueOf() ? z.end_date.valueOf() > $.end_date.valueOf() ? -1 : 1 : z.start_date > $.start_date ? 1 : -1;
        });
        for (var f = [], g = l.length, x = -1, w = null, E = 0; E < g; E++) {
          var k = l[E];
          k._inner = !1;
          for (var S = this.round_position ? e._timeline_get_rounded_date.apply(this, [k.start_date, !1]) : k.start_date; f.length && f[f.length - 1].end_date.valueOf() <= S.valueOf(); )
            f.splice(f.length - 1, 1);
          for (var v = !1, D = 0; D < f.length; D++) {
            var M = f[D];
            if (M.end_date.valueOf() <= S.valueOf()) {
              v = !0, k._sorder = M._sorder, f.splice(D, 1), k._inner = !0;
              break;
            }
          }
          if (f.length && (f[f.length - 1]._inner = !0), !v)
            if (f.length)
              if (f.length <= f[f.length - 1]._sorder) {
                if (f[f.length - 1]._sorder)
                  for (var N = 0; N < f.length; N++) {
                    for (var T = !1, A = 0; A < f.length; A++)
                      if (f[A]._sorder == N) {
                        T = !0;
                        break;
                      }
                    if (!T) {
                      k._sorder = N;
                      break;
                    }
                  }
                else
                  k._sorder = 0;
                k._inner = !0;
              } else {
                for (var C = f[0]._sorder, O = 1; O < f.length; O++)
                  f[O]._sorder > C && (C = f[O]._sorder);
                k._sorder = C + 1, x < k._sorder && (x = k._sorder, w = k), k._inner = !1;
              }
            else
              k._sorder = 0;
          f.push(k), f.length > (f.max_count || 0) ? (f.max_count = f.length, k._count = f.length) : k._count = k._count ? k._count : 1;
        }
        for (var H = 0; H < l.length; H++)
          l[H]._count = f.max_count, e._register_copy && e._register_copy(l[H]);
        (w || l[0]) && e.render_timeline_event.call(this, w || l[0], !1);
      }
    }, e._timeline_get_events_html = function(l) {
      var f = "";
      if (l && this.render != "cell")
        for (var g = 0; g < l.length; g++)
          f += e.render_timeline_event.call(this, l[g], !1);
      return f;
    }, e._timeline_update_events_html = function(l) {
      var f = "";
      if (l && this.render != "cell") {
        var g = e.getView(), x = {};
        l.forEach(function(E) {
          var k, S;
          x[k = E.id, S = E[g.y_property], k + "_" + S] = !0;
        });
        for (var w = 0; w < l.length; w++)
          f += e.render_timeline_event.call(this, l[w], !1);
      }
      return f;
    }, e._timeline_get_block_stats = function(l, f) {
      var g = {};
      return f._sch_height = l.offsetHeight, g.style_data_wrapper = (e.config.rtl ? "padding-right:" : "padding-left:") + f.dx + "px;", g.style_label_wrapper = "width: " + f.dx + "px;", f.scrollable ? (g.style_data_wrapper += "height:" + (f._sch_height - 1) + "px;", f.html_scroll_width === void 0 && (f.html_scroll_width = i()), f._section_autowidth ? f.custom_scroll_width = 0 : f.custom_scroll_width = f.html_scroll_width, g.style_label_wrapper += "height:" + (f._sch_height - 1 - f.custom_scroll_width) + "px;") : (g.style_data_wrapper += "height:" + (f._sch_height - 1) + "px;", g.style_label_wrapper += "height:" + (f._sch_height - 1) + "px;overflow:visible;"), g;
    }, e._timeline_get_cur_row_stats = function(l, f) {
      var g = l.y_unit[f], x = l._logic(l.render, g, l);
      if (e._merge(x, { height: l.dy }), l.section_autoheight && !d(g)) {
        var w = function(S, v) {
          var D = 0, M = S.y_unit.length, N = 0;
          return S.y_unit.forEach(function(T) {
            d(T) && (D += Number(T.height), N += Number(T.height), M--);
          }), { totalHeight: D += M * v, rowsWithDefaultHeight: M, totalCustomHeight: N };
        }(l, x.height), E = l.scrollable ? l._sch_height - e.xy.scroll_width : l._sch_height;
        w.totalHeight < E && w.rowsWithDefaultHeight > 0 && (x.height = Math.max(x.height, Math.floor((E - 1 - w.totalCustomHeight) / w.rowsWithDefaultHeight)));
      }
      if (d(g) && (x.height = Number(g.height)), l._section_height[g.key] = x.height, !x.td_className) {
        x.td_className = "dhx_matrix_scell";
        var k = e.templates[l.name + "_scaley_class"](l.y_unit[f].key, l.y_unit[f].label, l.y_unit[f]);
        k && (x.td_className += " " + k), l.columns && (x.td_className += " dhx_matrix_scell_columns");
      }
      return x.td_content || (x.td_content = e.templates[l.name + "_scale_label"](l.y_unit[f].key, l.y_unit[f].label, l.y_unit[f])), e._merge(x, { tr_className: "", style_height: "height:" + x.height + "px;", style_width: "width:" + l.dx + "px;", summ_width: "width:" + l._summ + "px;", table_className: "" }), x;
    }, e._timeline_get_fit_events_stats = function(l, f, g) {
      if (l.fit_events) {
        var x = l._events_height[l.y_unit[f].key] || 0;
        l.fit_events_offset && (x += l.fit_events_offset), g.height = x > g.height ? x : g.height, g.style_height = "height:" + g.height + "px;", g.style_line_height = "line-height:" + (g.height - 1) + "px;", l._section_height[l.y_unit[f].key] = g.height;
      }
      return g.style_height = "height:" + g.height + "px;", g.style_line_height = "line-height:" + (g.height - 1) + "px;", l._section_height[l.y_unit[f].key] = g.height, g;
    }, e._timeline_set_scroll_pos = function(l, f) {
      var g = l.querySelector(".dhx_timeline_data_wrapper");
      g.scrollTop = f._y_scroll || 0, f.scrollHelper.setScrollValue(g, f._x_scroll || 0), f.scrollHelper.getMode() != f.scrollHelper.modes.maxMin && g.scrollLeft == f._summ - g.offsetWidth + f.dx && (g.scrollLeft += i());
    }, e._timeline_save_scroll_pos = function(l, f, g, x) {
      l._y_scroll = f || 0, l._x_scroll = g || 0;
    }, e._timeline_get_html_for_cell_data_row = function(l, f, g, x, w) {
      var E = "";
      return w.template && (E += " " + (w.template(w.section, w.view) || "")), "<div class='dhx_timeline_data_row" + E + "' data-section-id='" + _(x) + "' data-section-index='" + l + "' style='" + f.summ_width + f.style_height + " position:absolute; top:" + g + "px;'>";
    }, e._timeline_get_html_for_cell_ignores = function(l) {
      return '<div class="dhx_matrix_cell dhx_timeline_data_cell" style="' + l.style_height + l.style_line_height + ';display:none"></div>';
    }, e._timeline_get_html_for_cell = function(l, f, g, x, w, E) {
      var k = g._trace_x[l], S = g.y_unit[f], v = e._cols[l], D = r(k), M = e.templates[g.name + "_cell_value"](x, k, S);
      return "<div data-col-id='" + l + "' data-col-date='" + D + "' class='dhx_matrix_cell dhx_timeline_data_cell " + e.templates[g.name + "_cell_class"](x, k, S) + "' style='width:" + v + "px;" + w.style_height + w.style_line_height + (e.config.rtl ? " right:" : "  left:") + E + "px;'><div style='width:auto'>" + M + "</div></div>";
    }, e._timeline_get_html_for_bar_matrix_line = function(l, f, g, x) {
      return "<div style='" + f.summ_width + " " + f.style_height + " position:absolute; top:" + g + "px;' data-section-id='" + _(x) + "' data-section-index='" + l + "' class='dhx_matrix_line'>";
    }, e._timeline_get_html_for_bar_data_row = function(l, f) {
      var g = l.table_className;
      return f.template && (g += " " + (f.template(f.section, f.view) || "")), "<div class='dhx_timeline_data_row " + g + "' style='" + l.summ_width + " " + l.style_height + "' >";
    }, e._timeline_get_html_for_bar_ignores = function() {
      return "";
    }, e._timeline_get_html_for_bar = function(l, f, g, x, w, E) {
      var k = r(g._trace_x[l]), S = g.y_unit[f], v = "";
      g.cell_template && (v = e.templates[g.name + "_cell_value"](x, g._trace_x[l], S, E));
      var D = "line-height:" + g._section_height[S.key] + "px;";
      let M = "";
      return v && (M = "<div style='width:auto; height:100%;position:relative;" + D + "'>" + v + "</div>"), "<div class='dhx_matrix_cell dhx_timeline_data_cell " + e.templates[g.name + "_cell_class"](x, g._trace_x[l], S, E) + "' style='width:" + e._cols[l] + "px; " + (e.config.rtl ? "right:" : "left:") + w + "px;'  data-col-id='" + l + "' data-col-date='" + k + "' >" + M + "</div>";
    }, e._timeline_render_scale_header = function(l, f) {
      var g = e.$container.querySelector(".dhx_timeline_scale_header");
      if (g && g.remove(), !f)
        return;
      g = document.createElement("div");
      var x = "dhx_timeline_scale_header";
      l.second_scale && (x += " dhx_timeline_second_scale");
      var w = e.xy.scale_height;
      g.className = x, g.style.cssText = ["width:" + l.dx + "px", "height:" + w + "px", "line-height:" + w + "px", "top:0px", e.config.rtl ? "right:0px" : "left:0px"].join(";"), g.innerHTML = e.templates[l.name + "_scale_header"](l);
      const E = e.$container.querySelector(".dhx_cal_header");
      g.style.top = `${E.offsetTop}px`, g.style.height = `${E.offsetHeight}px`, e.$container.appendChild(g);
    }, e._timeline_y_scale = function(l) {
      var f = e._timeline_get_block_stats(l, this), g = this.scrollable ? " dhx_timeline_scrollable_data" : "", x = "<div class='dhx_timeline_table_wrapper'>", w = "<div class='dhx_timeline_label_wrapper' style='" + f.style_label_wrapper + "'><div class='dhx_timeline_label_col'>", E = "<div class='dhx_timeline_data_wrapper" + g + "' style='" + f.style_data_wrapper + "'><div class='dhx_timeline_data_col'>";
      e._load_mode && e._load(), e._timeline_smart_render.clearPreparedEventsCache(k);
      var k = e._timeline_smart_render.getPreparedEvents(this);
      e._timeline_smart_render.cachePreparedEvents(k);
      for (var S = 0, v = 0; v < e._cols.length; v++)
        S += e._cols[v];
      var D = /* @__PURE__ */ new Date(), M = e._cols.length - e._ignores_detected;
      D = (e.date.add(D, this.x_step * M, this.x_unit) - D - (this._start_correction + this._end_correction) * M) / S, this._step = D, this._summ = S;
      var N = e._colsS.heights = [], T = [];
      this._render_stats = T, this._events_height = {}, this._section_height = {}, this._label_rows = [];
      var A = !1, C = null;
      this._smartRenderingEnabled() && (C = e._timeline_smart_render.getViewPort(this.scrollHelper, this._sch_height)), e._timeline_smart_render._rendered_labels_cache = [], e._timeline_smart_render._rendered_events_cache = [];
      var O = !!C, H = this._smartRenderingEnabled(), z = function(se, F) {
        for (var Ee = [], Z = {}, be = 0, _e = 0; _e < se.y_unit.length; _e++) {
          e._timeline_calculate_event_positions.call(se, F[_e]);
          var De = e._timeline_get_cur_row_stats(se, _e);
          (De = e._timeline_get_fit_events_stats(se, _e, De)).top = be, Ee.push(De), Z[se.y_unit[_e].key] = De, be += De.height;
        }
        return { totalHeight: be, rowStats: Ee, rowStatsByKey: Z };
      }(this, k);
      C && z.totalHeight < C.scrollTop && (C.scrollTop = Math.max(0, z.totalHeight - C.height)), this._rowStats = z.rowStatsByKey;
      for (var $ = 0; $ < this.y_unit.length; $++) {
        var q = z.rowStats[$], R = this.y_unit[$], U = q.top, Y = "<div class='dhx_timeline_label_row " + q.tr_className + "' style='top:" + U + "px;" + q.style_height + q.style_line_height + "'data-row-index='" + $ + "' data-row-id='" + _(R.key) + "'><div class='" + q.td_className + "' style='" + q.style_width + " height:" + q.height + "px;' " + e._waiAria.label(q.td_content) + ">" + q.td_content + "</div></div>";
        if (H && this._label_rows.push({ div: Y, top: U, section: R }), H && (e._timeline_smart_render.isInYViewPort({ top: U, bottom: U + q.height }, C) || (A = !0)), A)
          A = !1;
        else {
          w += Y, H && e._timeline_smart_render._rendered_labels_cache.push($);
          var B = { view: this, section: R, template: e.templates[this.name + "_row_class"] }, V = 0;
          if (this.render == "cell") {
            E += e._timeline_get_html_for_cell_data_row($, q, q.top, R.key, B);
            for (var W = 0; W < e._cols.length; W++)
              e._ignores[W] && !H ? E += e._timeline_get_html_for_cell_ignores(q) : H && O ? e._timeline_smart_render.isInXViewPort({ left: V, right: V + e._cols[W] }, C) && (E += e._timeline_get_html_for_cell(W, $, this, k[$][W], q, V)) : E += e._timeline_get_html_for_cell(W, $, this, k[$][W], q, V), V += e._cols[W];
            E += "</div>";
          } else {
            E += e._timeline_get_html_for_bar_matrix_line($, q, q.top, R.key);
            var G = k[$];
            for (H && O && (G = e._timeline_smart_render.getVisibleEventsForRow(this, C, k, $)), E += e._timeline_get_events_html.call(this, G), E += e._timeline_get_html_for_bar_data_row(q, B), W = 0; W < e._cols.length; W++)
              e._ignores[W] ? E += e._timeline_get_html_for_bar_ignores() : H && O ? e._timeline_smart_render.isInXViewPort({ left: V, right: V + e._cols[W] }, C) && (E += e._timeline_get_html_for_bar(W, $, this, k[$], V)) : E += e._timeline_get_html_for_bar(W, $, this, k[$], V), V += e._cols[W];
            E += "</div></div>";
          }
        }
        q.sectionKey = R.key, T.push(q);
      }
      x += w + "</div></div>", x += E + "</div></div>", x += "</div>", this._matrix = k, l.innerHTML = x, H && e._timeline_smart_render && (e._timeline_smart_render._rendered_events_cache = []), e._populate_timeline_rendered(l);
      const Fe = l.querySelectorAll("[data-section-id]"), $e = {};
      Fe.forEach(function(se) {
        $e[se.getAttribute("data-section-id")] = se;
      }), this._divBySectionId = $e, H && (e.$container.querySelector(".dhx_timeline_data_col").style.height = z.totalHeight + "px"), this._scales = {}, v = 0;
      for (var He = T.length; v < He; v++) {
        N.push(T[v].height);
        var ye = T[v].sectionKey;
        e._timeline_finalize_section_add(this, ye, this._divBySectionId[ye]);
      }
      (H || this.scrollable) && function(se, F, Ee) {
        e.attachEvent("onOptionsLoad", function() {
          e.getState().mode === F.name && (Ee = e._colsS.heights);
        }), e.attachEvent("onViewChange", function() {
          e.getState().mode === F.name && (Ee = e._colsS.heights);
        }), F._is_ev_creating = !1;
        var Z = o(se, F), be = e._els.dhx_cal_header[0], _e = se.querySelector(".dhx_timeline_label_wrapper");
        if (_e && !_e.$eventsAttached) {
          _e.$eventsAttached = !0;
          var De = { pageX: 0, pageY: 0 };
          e.event(_e, "touchstart", function(de) {
            var ge = de;
            de.touches && (ge = de.touches[0]), De = { pageX: ge.pageX, pageY: ge.pageY };
          }, { passive: !1 }), e.event(_e, "touchmove", function(de) {
            var ge = de;
            de.touches && (ge = de.touches[0]);
            var Ue = De.pageY - ge.pageY;
            De = { pageX: ge.pageX, pageY: ge.pageY }, Ue && (Z.scrollTop += Ue), de && de.preventDefault && de.preventDefault();
          }, { passive: !1 });
        }
        if (!Z.$eventsAttached || !Z.$eventsAttached[F.name]) {
          let Ue = function(Q) {
            let ae = !0;
            var le = e.env.isFF, te = le ? Q.deltaX : Q.wheelDeltaX, ue = le ? Q.deltaY : Q.wheelDelta, fe = -20;
            le && (fe = Q.deltaMode !== 0 ? -40 : -10);
            var ze = 1, qe = 1, Be = le ? te * fe * ze : 2 * te * ze, We = le ? ue * fe * qe : ue * qe;
            if (Be && Math.abs(Be) > Math.abs(We)) {
              var Se = Be / -40;
              Z.scrollLeft += 30 * Se, Z.scrollLeft === de && (ae = !1);
            } else
              Se = We / -40, We === void 0 && (Se = Q.detail), Z.scrollTop += 30 * Se, Z.scrollTop === ge && (ae = !1);
            if (ae)
              return Q.preventDefault(), Q.cancelBubble = !0, !1;
          }, de, ge;
          Z.$eventsAttached = Z.$eventsAttached || {}, Z.$eventsAttached[F.name] = !0, e.event(Z, "mousewheel", Ue, { passive: !1 }), e.event(_e, "mousewheel", Ue, { passive: !1 });
          const ha = function(Q) {
            if (e.getState().mode === F.name) {
              Ee = e._colsS.heights;
              var ae = o(se, F);
              Q.preventDefault();
              var le = ae.scrollTop, te = F.scrollHelper.getScrollValue(ae);
              de = te, ge = le;
              var ue = F._summ - e.$container.querySelector(".dhx_cal_data").offsetWidth + F.dx + F.custom_scroll_width, fe = e._timeline_smart_render.getViewPort(F.scrollHelper, 0, te, le), ze = c();
              if (F.scrollable)
                if (ze.style.top = -le + "px", e.config.rtl) {
                  var qe = +e.$container.querySelector(".dhx_timeline_label_wrapper").style.height.replace("px", ""), Be = F._section_height[F.y_unit.length] + F._label_rows[F._label_rows.length - 1].top;
                  F.scrollHelper.getMode() == F.scrollHelper.modes.minMax && (Be > qe || F.render == "tree") ? be.style.right = -1 - te - i() + "px" : be.style.right = -1 - te + "px", be.style.left = "unset";
                } else
                  be.style.left = -1 - te + "px";
              if (F._smartRenderingEnabled()) {
                (te !== F._x_scroll || F._is_ev_creating) && (F.second_scale ? e._timeline_smart_render.updateHeader(F, fe, be.children[1]) : e._timeline_smart_render.updateHeader(F, fe, be.children[0])), (F._options_changed || le !== F._y_scroll || F._is_ev_creating) && e._timeline_smart_render.updateLabels(F, fe, ze), F._is_ev_creating = !1, e._timeline_smart_render.updateGridCols(F, fe), e._timeline_smart_render.updateGridRows(F, fe);
                var We = !1;
                if (F.render != "cell") {
                  if (cancelAnimationFrame(void 0), F.name !== e.getState().mode)
                    return;
                  e._timeline_smart_render.updateEvents(F, fe);
                }
                var Se, Dt = 0;
                F._scales = {}, Se = F.render === "cell" ? ae.querySelectorAll(".dhx_timeline_data_col .dhx_timeline_data_row") : ae.querySelectorAll(".dhx_timeline_data_col .dhx_matrix_line");
                for (var ua = F._render_stats, Te = 0, rt = Se.length; Te < rt; Te++) {
                  var St = Se[Te].getAttribute("data-section-id"), Mt = F.order[St];
                  Ee[Mt] = ua[Mt].height, F._scales[St] = Se[Te];
                }
                for (Te = 0, rt = Ee.length; Te < rt; Te++)
                  Dt += Ee[Te];
                e.$container.querySelector(".dhx_timeline_data_col").style.height = Dt + "px";
              }
              var Nt = le, Tt = te;
              e._timeline_save_scroll_pos(F, Nt, Tt, ue), We || F.callEvent("onScroll", [Tt, Nt]), F._is_new_view = !1;
            }
          };
          e.event(Z, "scroll", ha, { passive: !1 });
          var Ge = { pageX: 0, pageY: 0 };
          e.event(Z, "touchstart", function(Q) {
            var ae = Q;
            Q.touches && (ae = Q.touches[0]), Ge = { pageX: ae.pageX, pageY: ae.pageY };
          }, { passive: !1 }), e.event(Z, "touchmove", function(Q) {
            var ae = Q;
            Q.touches && (ae = Q.touches[0]);
            var le = c(), te = Ge.pageX - ae.pageX, ue = Ge.pageY - ae.pageY;
            if (Ge = { pageX: ae.pageX, pageY: ae.pageY }, (te || ue) && !e.getState().drag_id) {
              var fe = Math.abs(te), ze = Math.abs(ue), qe = Math.sqrt(te * te + ue * ue);
              fe / qe < 0.42 ? te = 0 : ze / qe < 0.42 && (ue = 0), e.config.rtl && (te = -te), F.scrollHelper.setScrollValue(Z, F.scrollHelper.getScrollValue(Z) + te), Z.scrollTop += ue, F.scrollable && ue && (le.style.top = -Z.scrollTop + "px");
            }
            return Q && Q.preventDefault && Q.preventDefault(), !1;
          }, { passive: !1 });
        }
        F.scroll_position && F._is_new_view ? F.scrollTo(F.scroll_position) : e._timeline_set_scroll_pos(se, F), F._is_ev_creating = !0;
      }(l, this, N);
    }, e._timeline_finalize_section_add = function(l, f, g) {
      g && (l._scales[f] = g, e.callEvent("onScaleAdd", [g, f]));
    }, e.attachEvent("onBeforeViewChange", function(l, f, g, x) {
      if (e.matrix[g]) {
        var w = e.matrix[g];
        if (w.scrollable || w.smart_rendering) {
          if (w.render == "tree" && l === g && f === x)
            return !0;
          l === g && +f == +x || !e.$container.querySelector(".dhx_timeline_scrollable_data") || (w._x_scroll = w._y_scroll = 0, e.$container.querySelector(".dhx_timeline_scrollable_data") && e._timeline_set_scroll_pos(e._els.dhx_cal_data[0], w));
        }
      }
      return !0;
    }), e._timeline_x_dates = function(l) {
      var f = e._min_date, g = e._max_date;
      e._process_ignores(f, this.x_size, this.x_unit, this.x_step, l), e.date[this.x_unit + "_start"] && (f = e.date[this.x_unit + "_start"](f));
      for (var x = 0, w = 0; +f < +g; )
        if (this._trace_x[w] = new Date(f), this.x_unit == "month" && e.date[this.x_unit + "_start"] && (f = e.date[this.x_unit + "_start"](new Date(f))), f = e.date.add(f, this.x_step, this.x_unit), e.date[this.x_unit + "_start"] && (f = e.date[this.x_unit + "_start"](f)), e._ignores[w] || x++, w++, l) {
          if (x < this.x_size && !(+f < +g))
            g = e.date["add_" + this.name + "_private"](g, (this.x_length || this.x_size) * this.x_step);
          else if (x >= this.x_size) {
            e._max_date = f;
            break;
          }
        }
      return { total: w, displayed: x };
    }, e._timeline_x_scale = function(l) {
      var f = e._x - this.dx - e.xy.scroll_width, g = e._min_date, x = e.xy.scale_height, w = this._header_resized || e.xy.scale_height;
      e._cols = [], e._colsS = { height: 0 }, this._trace_x = [];
      var E = e.config.preserve_scale_length, k = e._timeline_x_dates.call(this, E);
      if (this.scrollable && this.column_width > 0) {
        var S = this.column_width * k.displayed;
        S > f && (f = S, this._section_autowidth = !1);
      }
      var v = [this.dx];
      e._els.dhx_cal_header[0].style.width = v[0] + f + 1 + "px", g = e._min_date_timeline = e._min_date;
      for (var D = k.displayed, M = k.total, N = 0; N < M; N++)
        e._ignores[N] ? (e._cols[N] = 0, D++) : e._cols[N] = Math.floor(f / (D - N)), f -= e._cols[N], v[N + 1] = v[N] + e._cols[N];
      if (l.innerHTML = "<div></div>", this.second_scale) {
        for (var T = this.second_scale.x_unit, A = [this._trace_x[0]], C = [], O = [this.dx, this.dx], H = 0, z = 0; z < this._trace_x.length; z++) {
          var $ = this._trace_x[z];
          e._timeline_is_new_interval(T, $, A[H]) && (A[++H] = $, O[H + 1] = O[H]);
          var q = H + 1;
          C[H] = e._cols[z] + (C[H] || 0), O[q] += e._cols[z];
        }
        l.innerHTML = "<div></div><div></div>";
        var R = l.firstChild;
        R.style.height = w + "px";
        var U = l.lastChild;
        U.style.position = "relative", U.className = "dhx_bottom_scale_container";
        for (var Y = 0; Y < A.length; Y++) {
          var B = A[Y], V = e.templates[this.name + "_second_scalex_class"](B), W = document.createElement("div");
          W.className = "dhx_scale_bar dhx_second_scale_bar" + (V ? " " + V : ""), e.set_xy(W, C[Y], w, O[Y], 0), W.innerHTML = e.templates[this.name + "_second_scale_date"](B), R.appendChild(W);
        }
      }
      e.xy.scale_height = w, l = l.lastChild, this._h_cols = {};
      for (var G = 0; G < this._trace_x.length; G++)
        if (!e._ignores[G]) {
          g = this._trace_x[G], e._render_x_header(G, v[G], g, l), l.lastChild.setAttribute("data-col-id", G), l.lastChild.setAttribute("data-col-date", r(g));
          var Fe = l.lastChild.cloneNode(!0);
          this._h_cols[G] = { div: Fe, left: v[G] };
        }
      e.xy.scale_height = x;
      var $e = this._trace_x;
      l.$_clickEventsAttached || (l.$_clickEventsAttached = !0, e.event(l, "click", function(He) {
        var ye = e._timeline_locate_hcell(He);
        ye && e.callEvent("onXScaleClick", [ye.x, $e[ye.x], He]);
      }), e.event(l, "dblclick", function(He) {
        var ye = e._timeline_locate_hcell(He);
        ye && e.callEvent("onXScaleDblClick", [ye.x, $e[ye.x], He]);
      }));
    }, e._timeline_is_new_interval = function(l, f, g) {
      switch (l) {
        case "hour":
          return f.getHours() != g.getHours() || e._timeline_is_new_interval("day", f, g);
        case "day":
          return !(f.getDate() == g.getDate() && f.getMonth() == g.getMonth() && f.getFullYear() == g.getFullYear());
        case "week":
          return e.date.week_start(new Date(f)).valueOf() != e.date.week_start(new Date(g)).valueOf();
        case "month":
          return !(f.getMonth() == g.getMonth() && f.getFullYear() == g.getFullYear());
        case "year":
          return f.getFullYear() != g.getFullYear();
        default:
          return !1;
      }
    }, e._timeline_reset_scale_height = function(l) {
      if (this._header_resized && (!l || this.second_scale)) {
        e.xy.scale_height /= 2, this._header_resized = !1;
        var f = e._els.dhx_cal_header[0];
        f.className = f.className.replace(/ dhx_second_cal_header/gi, "");
      }
    }, e._timeline_set_full_view = function(l) {
      if (e._timeline_reset_scale_height.call(this, l), l) {
        this.second_scale && !this._header_resized && (this._header_resized = e.xy.scale_height, e.xy.scale_height *= 2, e._els.dhx_cal_header[0].className += " dhx_second_cal_header"), e.set_sizes(), e._init_matrix_tooltip();
        var f = e._min_date;
        if (e._timeline_x_scale.call(this, e._els.dhx_cal_header[0]), e.$container.querySelector(".dhx_timeline_scrollable_data") && this._smartRenderingEnabled()) {
          var g = e._timeline_smart_render.getViewPort(this.scrollHelper), x = e._timeline_smart_render.getVisibleHeader(this, g);
          x && (this.second_scale ? e._els.dhx_cal_header[0].children[1].innerHTML = x : e._els.dhx_cal_header[0].children[0].innerHTML = x);
        }
        e._timeline_y_scale.call(this, e._els.dhx_cal_data[0]), e._min_date = f;
        var w = e._getNavDateElement();
        w && (w.innerHTML = e.templates[this.name + "_date"](e._min_date, e._max_date)), e._mark_now && e._mark_now(), e._timeline_reset_scale_height.call(this, l);
      }
      e._timeline_render_scale_header(this, l), e._timeline_hideToolTip();
    }, e._timeline_hideToolTip = function() {
      e._tooltip && (e._tooltip.style.display = "none", e._tooltip.date = "");
    }, e._timeline_showToolTip = function(l, f, g) {
      if (l.render == "cell") {
        var x = f.x + "_" + f.y, w = l._matrix[f.y][f.x];
        if (!w)
          return e._timeline_hideToolTip();
        if (w.sort(function(M, N) {
          return M.start_date > N.start_date ? 1 : -1;
        }), e._tooltip) {
          if (e._tooltip.date == x)
            return;
          e._tooltip.innerHTML = "";
        } else {
          var E = e._tooltip = document.createElement("div");
          E.className = "dhx_year_tooltip", e.config.rtl && (E.className += " dhx_tooltip_rtl"), document.body.appendChild(E), e.event(E, "click", e._click.dhx_cal_data);
        }
        for (var k = "", S = 0; S < w.length; S++) {
          var v = w[S].color ? "--dhx-scheduler-event-color:" + w[S].color + ";" : "", D = w[S].textColor ? "--dhx-scheduler-event-background:" + w[S].textColor + ";" : "";
          k += "<div class='dhx_tooltip_line' event_id='" + w[S].id + "' " + e.config.event_attribute + "='" + w[S].id + "' style='" + v + D + "'>", k += "<div class='dhx_tooltip_date'>" + (w[S]._timed ? e.templates.event_date(w[S].start_date) : "") + "</div>", k += "<div class='dhx_event_icon icon_details'>&nbsp;</div>", k += e.templates[l.name + "_tooltip"](w[S].start_date, w[S].end_date, w[S]) + "</div>";
        }
        e._tooltip.style.display = "", e._tooltip.style.top = "0px", e.config.rtl && g.left - e._tooltip.offsetWidth >= 0 || document.body.offsetWidth - f.src.offsetWidth - g.left - e._tooltip.offsetWidth < 0 ? e._tooltip.style.left = g.left - e._tooltip.offsetWidth + "px" : e._tooltip.style.left = g.left + f.src.offsetWidth + "px", e._tooltip.date = x, e._tooltip.innerHTML = k, document.body.offsetHeight - g.top - e._tooltip.offsetHeight < 0 ? e._tooltip.style.top = g.top - e._tooltip.offsetHeight + f.src.offsetHeight + "px" : e._tooltip.style.top = g.top + "px";
      }
    }, e._matrix_tooltip_handler = function(l) {
      var f = e.matrix[e._mode];
      if (f && f.render == "cell") {
        if (f) {
          var g = e._locate_cell_timeline(l);
          if (g)
            return e._timeline_showToolTip(f, g, e.$domHelpers.getOffset(g.src));
        }
        e._timeline_hideToolTip();
      }
    }, e._init_matrix_tooltip = function() {
      e._detachDomEvent(e._els.dhx_cal_data[0], "mouseover", e._matrix_tooltip_handler), e.event(e._els.dhx_cal_data[0], "mouseover", e._matrix_tooltip_handler);
    }, e._set_timeline_dates = function(l) {
      e._min_date = e.date[l.name + "_start"](new Date(e._date)), e._max_date = e.date["add_" + l.name + "_private"](e._min_date, l.x_size * l.x_step), e.date[l.x_unit + "_start"] && (e._max_date = e.date[l.x_unit + "_start"](e._max_date)), e._table_view = !0;
    }, e._renderMatrix = function(l, f) {
      this.callEvent("onBeforeRender", []), f || (e._els.dhx_cal_data[0].scrollTop = 0), e._set_timeline_dates(this), e._timeline_set_full_view.call(this, l);
    }, e._timeline_html_index = function(l) {
      for (var f = l.parentNode.childNodes, g = -1, x = 0; x < f.length; x++)
        if (f[x] == l) {
          g = x;
          break;
        }
      var w = g;
      if (e._ignores_detected)
        for (var E in e._ignores)
          e._ignores[E] && 1 * E <= w && w++;
      return w;
    }, e._timeline_locate_hcell = function(l) {
      for (var f = l.target ? l.target : l.srcElement; f && f.tagName != "DIV"; )
        f = f.parentNode;
      if (f && f.tagName == "DIV" && e._getClassName(f).split(" ")[0] == "dhx_scale_bar")
        return { x: e._timeline_html_index(f), y: -1, src: f, scale: !0 };
    }, e._locate_cell_timeline = function(l) {
      for (var f = l.target ? l.target : l.srcElement, g = {}, x = e.matrix[e._mode], w = e.getActionData(l), E = e._ignores, k = 0, S = 0; S < x._trace_x.length - 1 && !(+w.date < x._trace_x[S + 1]); S++)
        E[S] || k++;
      g.x = k === 0 ? 0 : S, g.y = x.order[w.section];
      var v = 0;
      if (x.scrollable && x.render === "cell") {
        if (!x._scales[w.section] || !x._scales[w.section].querySelector(".dhx_matrix_cell"))
          return;
        var D = x._scales[w.section].querySelector(".dhx_matrix_cell");
        if (!D)
          return;
        var M = D.offsetLeft;
        if (M > 0) {
          for (var N = e._timeline_drag_date(x, M), T = 0; T < x._trace_x.length - 1 && !(+N < x._trace_x[T + 1]); T++)
            ;
          v = T;
        }
      }
      g.src = x._scales[w.section] ? x._scales[w.section].querySelectorAll(".dhx_matrix_cell")[S - v] : null;
      var A, C, O = !1, H = (A = f, C = ".dhx_matrix_scell", e.$domHelpers.closest(A, C));
      return H && (f = H, O = !0), O ? (g.x = -1, g.src = f, g.scale = !0) : g.x = S, g;
    };
    var h = e._click.dhx_cal_data;
    e._click.dhx_marked_timespan = e._click.dhx_cal_data = function(l) {
      var f = h.apply(this, arguments), g = e.matrix[e._mode];
      if (g) {
        var x = e._locate_cell_timeline(l);
        x && (x.scale ? e.callEvent("onYScaleClick", [x.y, g.y_unit[x.y], l]) : (e.callEvent("onCellClick", [x.x, x.y, g._trace_x[x.x], (g._matrix[x.y] || {})[x.x] || [], l]), e._timeline_set_scroll_pos(e._els.dhx_cal_data[0], g)));
      }
      return f;
    }, e.dblclick_dhx_matrix_cell = function(l) {
      var f = e.matrix[e._mode];
      if (f) {
        var g = e._locate_cell_timeline(l);
        g && (g.scale ? e.callEvent("onYScaleDblClick", [g.y, f.y_unit[g.y], l]) : e.callEvent("onCellDblClick", [g.x, g.y, f._trace_x[g.x], (f._matrix[g.y] || {})[g.x] || [], l]));
      }
    };
    var y = e.dblclick_dhx_marked_timespan || function() {
    };
    e.dblclick_dhx_marked_timespan = function(l) {
      return e.matrix[e._mode] ? e.dblclick_dhx_matrix_cell(l) : y.apply(this, arguments);
    }, e.dblclick_dhx_matrix_scell = function(l) {
      return e.dblclick_dhx_matrix_cell(l);
    }, e._isRender = function(l) {
      return e.matrix[e._mode] && e.matrix[e._mode].render == l;
    }, e.attachEvent("onCellDblClick", function(l, f, g, x, w) {
      if (!this.config.readonly && (w.type != "dblclick" || this.config.dblclick_create)) {
        var E = e.matrix[e._mode], k = {};
        k.start_date = E._trace_x[l], k.end_date = E._trace_x[l + 1] ? E._trace_x[l + 1] : e.date.add(E._trace_x[l], E.x_step, E.x_unit), E._start_correction && (k.start_date = new Date(1 * k.start_date + E._start_correction)), E._end_correction && (k.end_date = new Date(k.end_date - E._end_correction)), k[E.y_property] = E.y_unit[f].key, e.addEventNow(k, null, w);
      }
    }), e.attachEvent("onBeforeDrag", function(l, f, g) {
      return !e._isRender("cell");
    }), e.attachEvent("onEventChanged", function(l, f) {
      f._timed = this.isOneDayEvent(f);
    }), e.attachEvent("onBeforeEventChanged", function(l, f, g, x) {
      return l && (l._move_delta = void 0), x && (x._move_delta = void 0), !0;
    }), e._is_column_visible = function(l) {
      var f = e.matrix[e._mode], g = e._get_date_index(f, l);
      return !e._ignores[g];
    };
    var b = e._render_marked_timespan;
    e._render_marked_timespan = function(l, f, g, x, w) {
      if (!e.config.display_marked_timespans)
        return [];
      if (e.matrix && e.matrix[e._mode]) {
        if (e._isRender("cell"))
          return;
        var E = e._lame_copy({}, e.matrix[e._mode]);
        E.round_position = !1;
        var k = [], S = [], v = [], D = l.sections ? l.sections.units || l.sections.timeline : null;
        if (g)
          v = [f], S = [g];
        else {
          var M = E.order;
          if (D)
            M.hasOwnProperty(D) && (S.push(D), v.push(E._scales[D]));
          else if (E._scales)
            for (var N in M)
              M.hasOwnProperty(N) && E._scales[N] && (S.push(N), v.push(E._scales[N]));
        }
        if (x = x ? new Date(x) : e._min_date, w = w ? new Date(w) : e._max_date, x.valueOf() < e._min_date.valueOf() && (x = new Date(e._min_date)), w.valueOf() > e._max_date.valueOf() && (w = new Date(e._max_date)), !E._trace_x)
          return;
        for (var T = 0; T < E._trace_x.length && !e._is_column_visible(E._trace_x[T]); T++)
          ;
        if (T == E._trace_x.length)
          return;
        var A = [];
        if (l.days > 6) {
          var C = new Date(l.days);
          e.date.date_part(new Date(x)) <= +C && +w >= +C && A.push(C);
        } else
          A.push.apply(A, e._get_dates_by_index(l.days));
        for (var O = l.zones, H = e._get_css_classes_by_config(l), z = 0; z < S.length; z++)
          for (f = v[z], g = S[z], T = 0; T < A.length; T++)
            for (var $ = A[T], q = 0; q < O.length; q += 2) {
              var R = O[q], U = O[q + 1], Y = new Date(+$ + 60 * R * 1e3), B = new Date(+$ + 60 * U * 1e3);
              if (Y = new Date(Y.valueOf() + 1e3 * (Y.getTimezoneOffset() - $.getTimezoneOffset()) * 60), x < (B = new Date(B.valueOf() + 1e3 * (B.getTimezoneOffset() - $.getTimezoneOffset()) * 60)) && w > Y) {
                var V = e._get_block_by_config(l);
                V.className = H;
                var W = e._timeline_getX({ start_date: Y }, !1, E) - 1, G = e._timeline_getX({ start_date: B }, !1, E) - 1, Fe = Math.max(1, G - W - 1), $e = E._section_height[g] - 1 || E.dy - 1;
                V.style.cssText = "height: " + $e + "px; " + (e.config.rtl ? "right: " : "left: ") + W + "px; width: " + Fe + "px; top: 0;", f.insertBefore(V, f.firstChild), k.push(V);
              }
            }
        return k;
      }
      return b.apply(e, [l, f, g]);
    };
    var p = e._append_mark_now;
    e._append_mark_now = function(l, f) {
      if (e.matrix && e.matrix[e._mode]) {
        var g = e._currentDate(), x = e._get_zone_minutes(g), w = { days: +e.date.date_part(g), zones: [x, x + 1], css: "dhx_matrix_now_time", type: "dhx_now_time" };
        return e._render_marked_timespan(w);
      }
      return p.apply(e, [l, f]);
    };
    var u = e._mark_timespans;
    e._mark_timespans = function() {
      if (e.matrix && e.matrix[e.getState().mode]) {
        for (var l = [], f = e.matrix[e.getState().mode], g = f.y_unit, x = 0; x < g.length; x++) {
          var w = g[x].key, E = f._scales[w], k = e._on_scale_add_marker(E, w);
          l.push.apply(l, k);
        }
        return l;
      }
      return u.apply(this, arguments);
    };
    var m = e._on_scale_add_marker;
    e._on_scale_add_marker = function(l, f) {
      if (e.matrix && e.matrix[e._mode]) {
        var g = [], x = e._marked_timespans;
        if (x && e.matrix && e.matrix[e._mode])
          for (var w = e._mode, E = e._min_date, k = e._max_date, S = x.global, v = e.date.date_part(new Date(E)); v < k; v = e.date.add(v, 1, "day")) {
            var D = +v, M = v.getDay(), N = [];
            if (e.config.overwrite_marked_timespans) {
              var T = S[D] || S[M];
              N.push.apply(N, e._get_configs_to_render(T));
            } else
              S[D] && N.push.apply(N, e._get_configs_to_render(S[D])), S[M] && N.push.apply(N, e._get_configs_to_render(S[M]));
            if (x[w] && x[w][f]) {
              var A = [], C = e._get_types_to_render(x[w][f][M], x[w][f][D]);
              A.push.apply(A, e._get_configs_to_render(C)), e.config.overwrite_marked_timespans ? A.length && (N = A) : N = N.concat(A);
            }
            for (var O = 0; O < N.length; O++) {
              var H = N[O], z = H.days;
              z < 7 ? (z = D, g.push.apply(g, e._render_marked_timespan(H, l, f, v, e.date.add(v, 1, "day"))), z = M) : g.push.apply(g, e._render_marked_timespan(H, l, f, v, e.date.add(v, 1, "day")));
            }
          }
        return g;
      }
      return m.apply(this, arguments);
    }, e._resolve_timeline_section = function(l, f) {
      for (var g = 0, x = 0; g < this._colsS.heights.length && !((x += this._colsS.heights[g]) > f.y); g++)
        ;
      l.y_unit[g] || (g = l.y_unit.length - 1), this._drag_event && !this._drag_event._orig_section && (this._drag_event._orig_section = l.y_unit[g].key), f.fields = {}, g >= 0 && l.y_unit[g] && (f.section = f.fields[l.y_property] = l.y_unit[g].key);
    }, e._update_timeline_section = function(l) {
      var f = l.view, g = l.event, x = l.pos;
      if (g) {
        if (g[f.y_property] != x.section) {
          var w = this._get_timeline_event_height ? this._get_timeline_event_height(g, f) : f.getEventHeight(g);
          g._sorder = this._get_dnd_order(g._sorder, w, f.getSectionHeight(x.section));
        }
        g[f.y_property] = x.section;
      }
    }, e._get_date_index = function(l, f) {
      for (var g = l._trace_x, x = 0, w = g.length - 1, E = f.valueOf(); w - x > 3; ) {
        var k = x + Math.floor((w - x) / 2);
        g[k].valueOf() > E ? w = k : x = k;
      }
      for (var S = x; S <= w && +f >= +g[S + 1]; )
        S++;
      return S;
    }, e._timeline_drag_date = function(l, f) {
      var g = l, x = f;
      if (!g._trace_x.length)
        return new Date(e.getState().date);
      for (var w, E, k, S = 0, v = 0; v <= this._cols.length - 1; v++)
        if ((S += E = this._cols[v]) > x) {
          w = (w = (x - (S - E)) / E) < 0 ? 0 : w;
          break;
        }
      if (g.round_position) {
        var D = 1, M = e.getState().drag_mode;
        M && M != "move" && M != "create" && (D = 0.5), w >= D && v++, w = 0;
      }
      if (v === 0 && this._ignores[0])
        for (v = 1, w = 0; this._ignores[v]; )
          v++;
      else if (v == this._cols.length && this._ignores[v - 1]) {
        for (v = this._cols.length - 1, w = 0; this._ignores[v]; )
          v--;
        v++;
      }
      if (v >= g._trace_x.length)
        k = e.date.add(g._trace_x[g._trace_x.length - 1], g.x_step, g.x_unit), g._end_correction && (k = new Date(k - g._end_correction));
      else {
        let N;
        g.x_unit == "month" ? N = w * E * (24 * new Date((/* @__PURE__ */ new Date(+g._trace_x[v])).getFullYear(), (/* @__PURE__ */ new Date(+g._trace_x[v])).getMonth() + 1, 0).getDate() * 60 * 60 * 1e3 / e._cols[0]) + g._start_correction : N = w * E * g._step + g._start_correction, k = new Date(+g._trace_x[v] + N);
      }
      return k;
    }, e.attachEvent("onBeforeTodayDisplayed", function() {
      for (var l in e.matrix) {
        var f = e.matrix[l];
        f.x_start = f._original_x_start;
      }
      return !0;
    }), e.attachEvent("onOptionsLoad", function() {
      for (var l in e.matrix) {
        var f = e.matrix[l];
        for (f.order = {}, e.callEvent("onOptionsLoadStart", []), l = 0; l < f.y_unit.length; l++)
          f.order[f.y_unit[l].key] = l;
        e.callEvent("onOptionsLoadFinal", []), e._date && f.name == e._mode && (f._options_changed = !0, e.setCurrentView(e._date, e._mode), setTimeout(function() {
          f._options_changed = !1;
        }));
      }
    }), e.attachEvent("onEventIdChange", function() {
      var l = e.getView();
      l && e.matrix[l.name] && e._timeline_smart_render && (e._timeline_smart_render.clearPreparedEventsCache(), e._timeline_smart_render.getPreparedEvents(l));
    }), e.attachEvent("onBeforeDrag", function(l, f, g) {
      if (f == "resize") {
        var x = g.target || g.srcElement;
        e._getClassName(x).indexOf("dhx_event_resize_end") < 0 ? e._drag_from_start = !0 : e._drag_from_start = !1;
      }
      return !0;
    }), $n(e), function(l) {
      function f(g, x) {
        for (let w = 0; w < g.length; w++)
          if (g[w].id == x)
            return !0;
        return !1;
      }
      l._timeline_smart_render = { _prepared_events_cache: null, _rendered_events_cache: [], _rendered_header_cache: [], _rendered_labels_cache: [], _rows_to_delete: [], _rows_to_add: [], _cols_to_delete: [], _cols_to_add: [], getViewPort: function(g, x, w, E) {
        var k = l.$container.querySelector(".dhx_cal_data"), S = k.getBoundingClientRect(), v = l.$container.querySelector(".dhx_timeline_scrollable_data");
        v && w === void 0 && (w = g.getScrollValue(v)), E === void 0 && (E = v ? v.scrollTop : k.scrollTop);
        var D = {};
        for (var M in S)
          D[M] = S[M];
        return D.scrollLeft = w || 0, D.scrollTop = E || 0, x && (S.height = x), D;
      }, isInXViewPort: function(g, x) {
        var w = x.scrollLeft, E = x.width + x.scrollLeft;
        return g.left < E + 100 && g.right > w - 100;
      }, isInYViewPort: function(g, x) {
        var w = x.scrollTop, E = x.height + x.scrollTop;
        return g.top < E + 80 && g.bottom > w - 80;
      }, getVisibleHeader: function(g, x) {
        var w = "";
        for (var E in this._rendered_header_cache = [], g._h_cols) {
          var k = g._h_cols[E];
          this.isInXViewPort({ left: k.left, right: k.left + l._cols[E] }, x) && (w += k.div.outerHTML, this._rendered_header_cache.push(k.div.getAttribute("data-col-id")));
        }
        return w;
      }, updateHeader: function(g, x, w) {
        this._cols_to_delete = [], this._cols_to_add = [];
        for (var E = l.$container.querySelectorAll(".dhx_cal_header > div"), k = E[E.length - 1].querySelectorAll(".dhx_scale_bar"), S = [], v = 0; v < k.length; v++)
          S.push(k[v].getAttribute("data-col-id"));
        if (this.getVisibleHeader(g, x)) {
          for (var D = this._rendered_header_cache.slice(), M = [], N = (v = 0, S.length); v < N; v++) {
            var T = D.indexOf(S[v]);
            T > -1 ? D.splice(T, 1) : M.push(S[v]);
          }
          M.length && (this._cols_to_delete = M.slice(), this._deleteHeaderCells(M, g, w)), D.length && (this._cols_to_add = D.slice(), this._addHeaderCells(D, g, w));
        }
      }, _deleteHeaderCells: function(g, x, w) {
        for (var E = 0; E < g.length; E++) {
          var k = w.querySelector('[data-col-id="' + g[E] + '"]');
          k && w.removeChild(k);
        }
      }, _addHeaderCells: function(g, x, w) {
        for (var E = "", k = 0; k < g.length; k++)
          E += x._h_cols[g[k]].div.outerHTML;
        const S = document.createElement("template");
        S.innerHTML = E, w.appendChild(S.content);
      }, getVisibleLabels: function(g, x) {
        if (g._label_rows.length) {
          var w = "";
          this._rendered_labels_cache = [];
          for (var E = 0; E < g._label_rows.length; E++)
            this.isInYViewPort({ top: g._label_rows[E].top, bottom: g._label_rows[E].top + g._section_height[g.y_unit[E].key] }, x) && (w += g._label_rows[E].div, this._rendered_labels_cache.push(E));
          return w;
        }
      }, updateLabels: function(g, x, w) {
        this._rows_to_delete = [], this._rows_to_add = [];
        let E = [];
        if (l.$container.querySelectorAll(".dhx_timeline_label_row").forEach((N) => {
          E.push(Number(N.getAttribute("data-row-index")));
        }), E.length || (this.getVisibleLabels(g, x), E = this._rendered_labels_cache.slice()), this.getVisibleLabels(g, x)) {
          for (var k = this._rendered_labels_cache.slice(), S = [], v = 0, D = E.length; v < D; v++) {
            var M = k.indexOf(E[v]);
            M > -1 ? k.splice(M, 1) : S.push(E[v]);
          }
          S.length && (this._rows_to_delete = S.slice(), this._deleteLabelCells(S, g, w)), k.length && (this._rows_to_add = k.slice(), this._addLabelCells(k, g, w));
        }
      }, _deleteLabelCells: function(g, x, w) {
        for (var E = 0; E < g.length; E++) {
          var k = w.querySelector('[data-row-index="' + g[E] + '"]');
          k && w.removeChild(k);
        }
      }, _addLabelCells: function(g, x, w) {
        for (var E = "", k = 0; k < g.length; k++)
          E += x._label_rows[g[k]].div;
        const S = document.createElement("template");
        S.innerHTML = E, w.appendChild(S.content);
      }, clearPreparedEventsCache: function() {
        this.cachePreparedEvents(null);
      }, cachePreparedEvents: function(g) {
        this._prepared_events_cache = g, this._prepared_events_coordinate_cache = g;
      }, getPreparedEvents: function(g) {
        var x;
        if (this._prepared_events_cache) {
          if (x = this._prepared_events_cache, l.getState().drag_id) {
            const w = l.getState().drag_id;
            let E = !1, k = !1;
            x.forEach((S, v) => {
              if (E)
                return;
              const D = g.y_unit[v];
              for (let M = 0; M < S.length; M++) {
                const N = S[M];
                if (N.id == w && N[g.y_property] !== D) {
                  k = !0, S.splice(M, 1), M--;
                  const T = g.order[N[g.y_property]];
                  x[T] != S && x[T] && !f(x[T], N.id) && x[T].push(N);
                }
              }
              k && (E = !0);
            });
          }
        } else
          (x = l._prepare_timeline_events(g)).$coordinates = {}, this.cachePreparedEvents(x);
        return x;
      }, updateEvents: function(g, x) {
        var w = this.getPreparedEvents(g), E = this._rendered_events_cache.slice();
        if (this._rendered_events_cache = [], !l.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col"))
          return;
        const k = [];
        for (var S = 0; S < this._rendered_labels_cache.length; S++) {
          var v = this._rendered_labels_cache[S], D = [];
          const H = g.y_unit[v].key;
          var M = E[v] ? E[v].slice() : [];
          l._timeline_calculate_event_positions.call(g, w[v]);
          for (var N = l._timeline_smart_render.getVisibleEventsForRow(g, x, w, v), T = 0, A = N.length; T < A; T++) {
            var C = M.indexOf(String(N[T].id));
            if (C > -1)
              if (l.getState().drag_id == N[T].id)
                for (let $ = 0; $ < M.length; $++)
                  M[$] == N[T].id && N[T][g.y_property] != H && (M.splice($, 1), $--);
              else
                M.splice(C, 1);
            else
              D.push(N[T]);
          }
          if (l.getState().drag_id) {
            const $ = l.getState().drag_id, q = l.getEvent($);
            if (l._split_one_event && q) {
              const R = [];
              q[g.y_property] == H && D.push(q), l._split_one_event(q, g, R), R.forEach((U) => {
                U[g.y_property] == H && D.push(U);
              });
            } else
              q && q[g.y_property] == H && D.push(q);
          }
          var O = g._divBySectionId[H];
          if (!O)
            continue;
          M.length && this._deleteEvents(M, g, O);
          const z = { DOMParent: O, buffer: document.createElement("template") };
          k.push(z), D.length && this._addEvents(D, g, z.buffer, v);
        }
        k.forEach(function(H) {
          H.DOMParent.appendChild(H.buffer.content);
        }), l._populate_timeline_rendered(l.$container), g._matrix = w;
      }, _deleteEvents: function(g, x, w) {
        for (var E = 0; E < g.length; E++) {
          const S = "[" + l.config.event_attribute + '="' + g[E] + '"]';
          var k = w.querySelector(S);
          if (k)
            if (k.classList.contains("dhx_in_move")) {
              const v = w.querySelectorAll(S);
              for (let D = 0; D < v.length; D++)
                v[D].classList.contains("dhx_in_move") || v[D].remove();
            } else
              k.remove();
        }
      }, _addEvents: function(g, x, w, E) {
        var k = l._timeline_update_events_html.call(x, g);
        w.innerHTML = k;
      }, getVisibleEventsForRow: function(g, x, w, E) {
        var k = [];
        if (g.render == "cell")
          k = w;
        else {
          var S = w[E];
          if (S)
            for (var v = 0, D = S.length; v < D; v++) {
              var M, N, T = S[v], A = E + "_" + T.id;
              w.$coordinates && w.$coordinates[A] ? (M = w.$coordinates[A].xStart, N = w.$coordinates[A].xEnd) : (M = l._timeline_getX(T, !1, g), N = l._timeline_getX(T, !0, g), w.$coordinates && (w.$coordinates[A] = { xStart: M, xEnd: N })), l._timeline_smart_render.isInXViewPort({ left: M, right: N }, x) && (k.push(T), this._rendered_events_cache[E] || (this._rendered_events_cache[E] = []), this._rendered_events_cache[E].push(String(T.id)));
            }
        }
        return k;
      }, getVisibleRowCellsHTML: function(g, x, w, E, k) {
        for (var S, v = "", D = this._rendered_header_cache, M = 0; M < D.length; M++) {
          var N = D[M];
          S = g._h_cols[N].left - g.dx, l._ignores[N] ? g.render == "cell" ? v += l._timeline_get_html_for_cell_ignores(w) : v += l._timeline_get_html_for_bar_ignores() : g.render == "cell" ? v += l._timeline_get_html_for_cell(N, k, g, E[k][N], w, S) : v += l._timeline_get_html_for_bar(N, k, g, E[k], S);
        }
        return v;
      }, getVisibleTimelineRowsHTML: function(g, x, w, E) {
        var k = "", S = l._timeline_get_cur_row_stats(g, E);
        S = l._timeline_get_fit_events_stats(g, E, S);
        var v = g._label_rows[E], D = l.templates[g.name + "_row_class"], M = { view: g, section: v.section, template: D };
        return g.render == "cell" ? (k += l._timeline_get_html_for_cell_data_row(E, S, v.top, v.section.key, M), k += this.getVisibleRowCellsHTML(g, x, S, w, E), k += "</div>") : (k += l._timeline_get_html_for_bar_matrix_line(E, S, v.top, v.section.key, M), k += l._timeline_get_html_for_bar_data_row(S, M), k += this.getVisibleRowCellsHTML(g, x, S, w, E), k += "</div></div>"), k;
      }, updateGridRows: function(g, x) {
        this._rows_to_delete.length && this._deleteGridRows(this._rows_to_delete, g), this._rows_to_add.length && this._addGridRows(this._rows_to_add, g, x);
      }, _deleteGridRows: function(g, x) {
        if (l.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col")) {
          for (var w = 0; w < g.length; w++) {
            const E = x.y_unit[g[w]] ? x.y_unit[g[w]].key : null;
            x._divBySectionId[E] && (x._divBySectionId[E].remove(), delete x._divBySectionId[E]);
          }
          this._rows_to_delete = [];
        }
      }, _addGridRows: function(g, x, w) {
        if (!(D = l.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col")))
          return;
        for (var E = this.getPreparedEvents(x), k = "", S = 0; S < g.length; S++)
          k += this.getVisibleTimelineRowsHTML(x, w, E, g[S]);
        const v = document.createElement("template");
        v.innerHTML = k, D.appendChild(v.content);
        var D = l.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col");
        x._divBySectionId = {};
        for (let N = 0, T = D.children.length; N < T; N++) {
          var M = D.children[N];
          M.hasAttribute("data-section-id") && (x._divBySectionId[M.getAttribute("data-section-id")] = M);
        }
        for (S = 0; S < g.length; S++) {
          const N = x.y_unit[g[S]] ? x.y_unit[g[S]].key : null;
          l._timeline_finalize_section_add(x, x.y_unit[g[S]].key, x._divBySectionId[N]);
        }
        l._mark_now && l._mark_now(), this._rows_to_add = [];
      }, updateGridCols: function(g, x) {
        for (var w = this._rendered_header_cache, E = {}, k = 0; k < w.length; k++)
          E[w[k]] = !0;
        l.$container.querySelectorAll(".dhx_timeline_data_row").forEach((function(S) {
          const v = S.querySelectorAll("[data-col-id]"), D = Array.prototype.reduce.call(v, function(A, C) {
            return A[C.dataset.colId] = C, A;
          }, {});
          var M = [], N = [];
          for (var T in D)
            E[T] || M.push(D[T]);
          for (var T in E)
            D[T] || N.push(T);
          M.forEach(function(A) {
            A.remove();
          }), N.length && this._addGridCols(S, N, g, x);
        }).bind(this));
      }, _addGridCols: function(g, x, w, E) {
        if (!l.$container.querySelector(".dhx_cal_data .dhx_timeline_data_col"))
          return;
        var k = this.getPreparedEvents(w);
        const S = g.closest("[data-section-id]").getAttribute("data-section-id"), v = w.order[S];
        var D = "", M = l._timeline_get_cur_row_stats(w, v);
        M = l._timeline_get_fit_events_stats(w, v, M);
        var N = g;
        if (N) {
          for (var T = 0; T < x.length; T++)
            if (!N.querySelector('[data-col-id="' + x[T] + '"]')) {
              var A = this.getVisibleGridCell(w, E, M, k, v, x[T]);
              A && (D += A);
            }
          const C = document.createElement("template");
          C.innerHTML = D, N.appendChild(C.content);
        }
      }, getVisibleGridCell: function(g, x, w, E, k, S) {
        if (g._h_cols[S]) {
          var v = "", D = g._h_cols[S].left - g.dx;
          return g.render == "cell" ? l._ignores[S] || (v += l._timeline_get_html_for_cell(S, k, g, E[k][S], w, D)) : l._ignores[S] || (v += l._timeline_get_html_for_bar(S, k, g, E[k], D)), v;
        }
      } }, l.attachEvent("onClearAll", function() {
        l._timeline_smart_render._prepared_events_cache = null, l._timeline_smart_render._rendered_events_cache = [];
      }), l.attachEvent("onBeforeLightbox", function() {
        return l._timeline_smart_render.clearPreparedEventsCache(), !0;
      });
    }(e);
  }, e._temp_matrix_scope();
}, tooltip: function(e) {
  e.config.tooltip_timeout = 30, e.config.tooltip_offset_y = 20, e.config.tooltip_offset_x = 10, e.config.tooltip_hide_timeout = 30;
  const i = new qn(e);
  e.ext.tooltips = i, e.attachEvent("onSchedulerReady", function() {
    i.tooltipFor({ selector: "[" + e.config.event_attribute + "]", html: (t) => {
      if (e._mobile && !e.config.touch_tooltip)
        return;
      const a = e._locate_event(t.target);
      if (e.getEvent(a)) {
        const s = e.getEvent(a);
        return e.templates.tooltip_text(s.start_date, s.end_date, s);
      }
      return null;
    }, global: !1 });
  }), e.attachEvent("onDestroy", function() {
    i.destructor();
  }), e.attachEvent("onLightbox", function() {
    i.hideTooltip();
  }), e.attachEvent("onBeforeDrag", function() {
    return e._mobile && e.config.touch_tooltip || i.hideTooltip(), !0;
  }), e.attachEvent("onEventDeleted", function() {
    return i.hideTooltip(), !0;
  });
}, treetimeline: function(e) {
  var i;
  e.attachEvent("onTimelineCreated", function(t) {
    t.render == "tree" && (t.y_unit_original = t.y_unit, t.y_unit = e._getArrayToDisplay(t.y_unit_original), e.attachEvent("onOptionsLoadStart", function() {
      t.y_unit = e._getArrayToDisplay(t.y_unit_original);
    }), e.form_blocks[t.name] = { render: function(a) {
      return "<div class='dhx_section_timeline' style='overflow: hidden;'></div>";
    }, set_value: function(a, s, n, _) {
      var d = e._getArrayForSelect(e.matrix[_.type].y_unit_original, _.type);
      a.innerHTML = "";
      var r = document.createElement("select");
      a.appendChild(r);
      var o = a.getElementsByTagName("select")[0];
      !o._dhx_onchange && _.onchange && (o.addEventListener("change", _.onchange), o._dhx_onchange = !0);
      for (var c = 0; c < d.length; c++) {
        var h = document.createElement("option");
        h.value = d[c].key, h.value == n[e.matrix[_.type].y_property] && (h.selected = !0), h.innerHTML = d[c].label, o.appendChild(h);
      }
    }, get_value: function(a, s, n) {
      return a.firstChild.value;
    }, focus: function(a) {
    } });
  }), e.attachEvent("onBeforeSectionRender", function(t, a, s) {
    let n = {};
    if (t == "tree") {
      let _, d, r, o, c, h, y, b;
      o = "dhx_matrix_scell dhx_treetimeline", a.children ? (_ = s.folder_dy || s.dy, s.folder_dy && !s.section_autoheight && (r = "height:" + s.folder_dy + "px;"), d = "dhx_row_folder", o += " folder", a.open ? o += " opened" : o += " closed", c = "<div class='dhx_scell_expand'></div>", h = s.folder_events_available ? "dhx_data_table folder_events" : "dhx_data_table folder") : (_ = s.dy, d = "dhx_row_item", o += " item", c = "", h = "dhx_data_table"), s.columns && (o += " dhx_matrix_scell_columns"), o += e.templates[s.name + "_scaley_class"](a.key, a.label, a) ? " " + e.templates[s.name + "_scaley_class"](a.key, a.label, a) : "";
      const p = `var(--dhx-scheduler-treetimeline-level-padding) * ${a.level}`;
      b = a.level < 2 ? `calc(${p} + 4px)` : `calc(${p})`;
      const u = `style='--dhx-scheduler-treetimeline-level-padding-value: ${b}'`;
      y = s.columns && s.columns.length ? `<div class='dhx_scell_name'><div class='dhx_scell_level' ${u}>${c}</div>${e.templates[s.name + "_scale_label"](a.key, a.label, a) || a.label}</div>` : `<div class='dhx_scell_level' ${u}>${c}<div class='dhx_scell_name'>${e.templates[s.name + "_scale_label"](a.key, a.label, a) || a.label}</div></div>`, n = { height: _, style_height: r, tr_className: d, td_className: o, td_content: y, table_className: h };
    }
    return n;
  }), e.attachEvent("onBeforeEventChanged", function(t, a, s) {
    if (e._isRender("tree"))
      for (var n = e._get_event_sections ? e._get_event_sections(t) : [t[e.matrix[e._mode].y_property]], _ = 0; _ < n.length; _++) {
        var d = e.getSection(n[_]);
        if (d && d.children && !e.matrix[e._mode].folder_events_available)
          return s || (t[e.matrix[e._mode].y_property] = i), !1;
      }
    return !0;
  }), e.attachEvent("onBeforeDrag", function(t, a, s) {
    if (e._isRender("tree")) {
      var n, _ = e._locate_cell_timeline(s);
      if (_ && (n = e.matrix[e._mode].y_unit[_.y].key, e.matrix[e._mode].y_unit[_.y].children && !e.matrix[e._mode].folder_events_available))
        return !1;
      var d = e.getEvent(t), r = e.matrix[e._mode].y_property;
      i = d && d[r] ? d[r] : n;
    }
    return !0;
  }), e._getArrayToDisplay = function(t) {
    var a = [], s = function(n, _, d, r) {
      for (var o = _ || 0, c = 0; c < n.length; c++) {
        var h = n[c];
        h.level = o, h.$parent = d || null, h.children && h.key === void 0 && (h.key = e.uid()), r || a.push(h), h.children && s(h.children, o + 1, h.key, r || !h.open);
      }
    };
    return s(t), a;
  }, e._getArrayForSelect = function(t, a) {
    var s = [], n = function(_) {
      for (var d = 0; d < _.length; d++)
        e.matrix[a].folder_events_available ? s.push(_[d]) : _[d].children || s.push(_[d]), _[d].children && n(_[d].children);
    };
    return n(t), s;
  }, e._toggleFolderDisplay = function(t, a, s) {
    var n = function(d, r, o, c) {
      for (var h = 0; h < r.length && (r[h].key != d && !c || !r[h].children || (r[h].open = o !== void 0 ? o : !r[h].open, c)); h++)
        r[h].children && n(d, r[h].children, o, c);
    }, _ = e.getSection(t);
    a !== void 0 || s || (a = !_.open), e.callEvent("onBeforeFolderToggle", [_, a, s]) && (n(t, e.matrix[e._mode].y_unit_original, a, s), e.matrix[e._mode].y_unit = e._getArrayToDisplay(e.matrix[e._mode].y_unit_original), e.callEvent("onOptionsLoad", []), e.callEvent("onAfterFolderToggle", [_, a, s]));
  }, e.attachEvent("onCellClick", function(t, a, s, n, _) {
    e._isRender("tree") && (e.matrix[e._mode].folder_events_available || e.matrix[e._mode].y_unit[a] !== void 0 && e.matrix[e._mode].y_unit[a].children && e._toggleFolderDisplay(e.matrix[e._mode].y_unit[a].key));
  }), e.attachEvent("onYScaleClick", function(t, a, s) {
    e._isRender("tree") && a.children && e._toggleFolderDisplay(a.key);
  }), e.getSection = function(t) {
    if (e._isRender("tree")) {
      var a, s = function(n, _) {
        for (var d = 0; d < _.length; d++)
          _[d].key == n && (a = _[d]), _[d].children && s(n, _[d].children);
      };
      return s(t, e.matrix[e._mode].y_unit_original), a || null;
    }
  }, e.deleteSection = function(t) {
    if (e._isRender("tree")) {
      var a = !1, s = function(n, _) {
        for (var d = 0; d < _.length && (_[d].key == n && (_.splice(d, 1), a = !0), !a); d++)
          _[d].children && s(n, _[d].children);
      };
      return s(t, e.matrix[e._mode].y_unit_original), e.matrix[e._mode].y_unit = e._getArrayToDisplay(e.matrix[e._mode].y_unit_original), e.callEvent("onOptionsLoad", []), a;
    }
  }, e.deleteAllSections = function() {
    e._isRender("tree") && (e.matrix[e._mode].y_unit_original = [], e.matrix[e._mode].y_unit = e._getArrayToDisplay(e.matrix[e._mode].y_unit_original), e.callEvent("onOptionsLoad", []));
  }, e.addSection = function(t, a) {
    if (e._isRender("tree")) {
      var s = !1, n = function(_, d, r) {
        if (a)
          for (var o = 0; o < r.length && (r[o].key == d && r[o].children && (r[o].children.push(_), s = !0), !s); o++)
            r[o].children && n(_, d, r[o].children);
        else
          r.push(_), s = !0;
      };
      return n(t, a, e.matrix[e._mode].y_unit_original), e.matrix[e._mode].y_unit = e._getArrayToDisplay(e.matrix[e._mode].y_unit_original), e.callEvent("onOptionsLoad", []), s;
    }
  }, e.openAllSections = function() {
    e._isRender("tree") && e._toggleFolderDisplay(1, !0, !0);
  }, e.closeAllSections = function() {
    e._isRender("tree") && e._toggleFolderDisplay(1, !1, !0);
  }, e.openSection = function(t) {
    e._isRender("tree") && e._toggleFolderDisplay(t, !0);
  }, e.closeSection = function(t) {
    e._isRender("tree") && e._toggleFolderDisplay(t, !1);
  };
}, units: function(e) {
  e._props = {}, e.createUnitsView = function(i, t, a, s, n, _, d) {
    function r(h) {
      return Math.round((e._correct_shift(+h, 1) - +e._min_date) / 864e5);
    }
    typeof i == "object" && (a = i.list, t = i.property, s = i.size || 0, n = i.step || 1, _ = i.skip_incorrect, d = i.days || 1, i = i.name), e._props[i] = { map_to: t, options: a, step: n, position: 0, days: d, layout: "units" }, s > e._props[i].options.length && (e._props[i]._original_size = s, s = 0), e._props[i].size = s, e._props[i].skip_incorrect = _ || !1, e.date[i + "_start"] = e.date.day_start, e.templates[i + "_date"] = function(h, y) {
      return e._props[i].days > 1 ? e.templates.week_date(h, y) : e.templates.day_date(h);
    }, e._get_unit_index = function(h, y) {
      var b = h.position || 0, p = r(y), u = h.size || h.options.length;
      return p >= u && (p %= u), b + p;
    }, e.templates[i + "_scale_text"] = function(h, y, b) {
      return b.css ? "<span class='" + b.css + "'>" + y + "</span>" : y;
    }, e.templates[i + "_scale_date"] = function(h) {
      var y = e._props[i], b = y.options;
      if (!b.length)
        return "";
      var p = b[e._get_unit_index(y, h)], u = r(h), m = y.size || y.options.length, l = e.date.add(e.getState().min_date, Math.floor(u / m), "day");
      return e.templates[i + "_scale_text"](p.key, p.label, p, l);
    }, e.templates[i + "_second_scale_date"] = function(h) {
      return e.templates.week_scale_date(h);
    }, e.date["add_" + i] = function(h, y) {
      return e.date.add(h, y * e._props[i].days, "day");
    }, e.date["get_" + i + "_end"] = function(h) {
      const y = e._props[i], b = y.size || y.options.length, p = Math.min(b, y.options.length);
      return e.date.add(h, p * e._props[i].days, "day");
    }, e.attachEvent("onOptionsLoad", function() {
      for (var h = e._props[i], y = h.order = {}, b = h.options, p = 0; p < b.length; p++)
        y[b[p].key] = p;
      h._original_size && h.size === 0 && (h.size = h._original_size, delete h._original_size), h.size > b.length ? (h._original_size = h.size, h.position = 0, h.size = 0) : h.size = h._original_size || h.size, e._date && e._mode == i && e.setCurrentView(e._date, e._mode);
    }), e["mouse_" + i] = function(h) {
      var y = e._props[this._mode];
      if (y) {
        if (h = this._week_indexes_from_pos(h), this._drag_event || (this._drag_event = {}), this._drag_id && this._drag_mode && (this._drag_event._dhx_changed = !0), this._drag_mode && this._drag_mode == "new-size") {
          var b = e._get_event_sday(e._events[e._drag_id]);
          Math.floor(h.x / y.options.length) != Math.floor(b / y.options.length) && (h.x = b);
        }
        var p = y.size || y.options.length, u = h.x % p, m = Math.min(u + y.position, y.options.length - 1);
        h.section = (y.options[m] || {}).key, h.x = Math.floor(h.x / p);
        var l = this.getEvent(this._drag_id);
        this._update_unit_section({ view: y, event: l, pos: h });
      }
      return h.force_redraw = !0, h;
    };
    var o = !1;
    function c() {
      o && (e.xy.scale_height /= 2, o = !1);
    }
    e[i + "_view"] = function(h) {
      var y = e._props[e._mode];
      h ? (y && y.days > 1 ? o || (o = e.xy.scale_height, e.xy.scale_height = 2 * e.xy.scale_height) : c(), e._reset_scale()) : c();
    }, e.callEvent("onOptionsLoad", []);
  }, e._update_unit_section = function(i) {
    var t = i.view, a = i.event, s = i.pos;
    a && (a[t.map_to] = s.section);
  }, e.scrollUnit = function(i) {
    var t = e._props[this._mode];
    t && (t.position = Math.min(Math.max(0, t.position + i), t.options.length - t.size), this.setCurrentView());
  }, function() {
    var i = function(p) {
      var u = e._props[e._mode];
      if (u && u.order && u.skip_incorrect) {
        for (var m = [], l = 0; l < p.length; l++)
          u.order[p[l][u.map_to]] !== void 0 && m.push(p[l]);
        p.splice(0, p.length), p.push.apply(p, m);
      }
      return p;
    }, t = e._pre_render_events_table;
    e._pre_render_events_table = function(p, u) {
      return p = i(p), t.apply(this, [p, u]);
    };
    var a = e._pre_render_events_line;
    e._pre_render_events_line = function(p, u) {
      return p = i(p), a.apply(this, [p, u]);
    };
    var s = function(p, u) {
      if (p && p.order[u[p.map_to]] === void 0)
        return p.options.length && (u[p.map_to] = p.options[0].key), !0;
    }, n = e.is_visible_events;
    e.is_visible_events = function(p) {
      var u = n.apply(this, arguments);
      if (u) {
        var m = e._props[this._mode];
        if (m && m.size) {
          var l = m.order[p[m.map_to]];
          if (l < m.position || l >= m.size + m.position)
            return !1;
        }
      }
      return u;
    };
    var _ = e._process_ignores;
    e._process_ignores = function(p, u, m, l, f) {
      if (e._props[this._mode]) {
        this._ignores = {}, this._ignores_detected = 0;
        var g = e["ignore_" + this._mode];
        if (g) {
          var x = e._props && e._props[this._mode] ? e._props[this._mode].size || e._props[this._mode].options.length : 1;
          u /= x;
          for (var w = new Date(p), E = 0; E < u; E++) {
            if (g(w))
              for (var k = (E + 1) * x, S = E * x; S < k; S++)
                this._ignores_detected += 1, this._ignores[S] = !0, f && u++;
            w = e.date.add(w, l, m), e.date[m + "_start"] && (w = e.date[m + "_start"](w));
          }
        }
      } else
        _.call(this, p, u, m, l, f);
    };
    var d = e._reset_scale;
    e._reset_scale = function() {
      var p = e._props[this._mode];
      p && (p.size && p.position && p.size + p.position > p.options.length ? p.position = Math.max(0, p.options.length - p.size) : p.size || (p.position = 0), p.size && p.size > p.options.length && (p.size = p.options.length));
      var u = d.apply(this, arguments);
      if (p) {
        this._max_date = this.date.add(this._min_date, p.days, "day");
        for (var m = this._els.dhx_cal_data[0].childNodes, l = 0; l < m.length; l++)
          m[l].classList.remove("dhx_scale_holder_now");
        var f = this._currentDate();
        if (f.valueOf() >= this._min_date && f.valueOf() < this._max_date) {
          var g = Math.floor((f - e._min_date) / 864e5), x = p.size || p.options.length, w = g * x, E = w + x;
          for (l = w; l < E; l++)
            m[l] && m[l].classList.add("dhx_scale_holder_now");
        }
        if (p.size && p.size < p.options.length) {
          var k = this._els.dhx_cal_header[0], S = document.createElement("div");
          p.position && (this._waiAria.headerButtonsAttributes(S, ""), e.config.rtl ? (S.className = "dhx_cal_next_button", S.style.cssText = "left:auto;margin-top:-8px;right:0px;position:absolute;") : (S.className = "dhx_cal_prev_button", S.style.cssText = "left:1px;margin-top:-8px;position:absolute;"), k.firstChild.appendChild(S), S.addEventListener("click", function(v) {
            e.scrollUnit(-1 * p.step), v.preventDefault();
          })), p.position + p.size < p.options.length && (this._waiAria.headerButtonsAttributes(S, ""), S = document.createElement("div"), e.config.rtl ? (S.className = "dhx_cal_prev_button", S.style.cssText = "left:1px;margin-top:-8px;position:absolute;") : (S.className = "dhx_cal_next_button", S.style.cssText = "left:auto;margin-top:-8px;right:0px;position:absolute;"), k.lastChild.appendChild(S), S.addEventListener("click", function() {
            e.scrollUnit(p.step);
          }));
        }
      }
      return u;
    };
    var r = e._get_view_end;
    e._get_view_end = function() {
      var p = e._props[this._mode];
      if (p && p.days > 1) {
        var u = this._get_timeunit_start();
        return e.date.add(u, p.days, "day");
      }
      return r.apply(this, arguments);
    };
    var o = e._render_x_header;
    e._render_x_header = function(p, u, m, l) {
      var f = e._props[this._mode];
      if (!f || f.days <= 1)
        return o.apply(this, arguments);
      if (f.days > 1) {
        var g = l.querySelector(".dhx_second_cal_header");
        g || ((g = document.createElement("div")).className = "dhx_second_cal_header", l.appendChild(g));
        var x = e.xy.scale_height;
        e.xy.scale_height = Math.ceil(x / 2), o.call(this, p, u, m, g, Math.ceil(e.xy.scale_height));
        var w = f.size || f.options.length;
        if ((p + 1) % w == 0) {
          var E = document.createElement("div");
          E.className = "dhx_scale_bar dhx_second_scale_bar";
          var k = this.date.add(this._min_date, Math.floor(p / w), "day");
          this.templates[this._mode + "_second_scalex_class"] && (E.className += " " + this.templates[this._mode + "_second_scalex_class"](new Date(k)));
          var S, v = this._cols[p] * w;
          S = w > 1 && this.config.rtl ? this._colsS[p - (w - 1)] - this.xy.scroll_width : w > 1 ? this._colsS[p - (w - 1)] - this.xy.scale_width : u, this.set_xy(E, v, this.xy.scale_height, S, 0), E.innerHTML = this.templates[this._mode + "_second_scale_date"](new Date(k), this._mode), g.appendChild(E);
        }
        e.xy.scale_height = x;
      }
    };
    var c = e._get_event_sday;
    e._get_event_sday = function(p) {
      var u = e._props[this._mode];
      return u ? u.days <= 1 ? (s(u, p), this._get_section_sday(p[u.map_to])) : Math.floor((p.end_date.valueOf() - 1 - 60 * p.end_date.getTimezoneOffset() * 1e3 - (e._min_date.valueOf() - 60 * e._min_date.getTimezoneOffset() * 1e3)) / 864e5) * (u.size || u.options.length) + u.order[p[u.map_to]] - u.position : c.call(this, p);
    }, e._get_section_sday = function(p) {
      var u = e._props[this._mode];
      return u.order[p] - u.position;
    };
    var h = e.locate_holder_day;
    e.locate_holder_day = function(p, u, m) {
      var l, f = e._props[this._mode];
      return f ? (m ? s(f, m) : (m = { start_date: p, end_date: p }, l = 0), f.days <= 1 ? 1 * (l === void 0 ? f.order[m[f.map_to]] : l) + (u ? 1 : 0) - f.position : Math.floor((m.start_date.valueOf() - e._min_date.valueOf()) / 864e5) * (f.size || f.options.length) + 1 * (l === void 0 ? f.order[m[f.map_to]] : l) + (u ? 1 : 0) - f.position) : h.apply(this, arguments);
    };
    var y = e._time_order;
    e._time_order = function(p) {
      var u = e._props[this._mode];
      u ? p.sort(function(m, l) {
        return u.order[m[u.map_to]] > u.order[l[u.map_to]] ? 1 : -1;
      }) : y.apply(this, arguments);
    };
    var b = e._pre_render_events_table;
    e._pre_render_events_table = function(p, u) {
      var m = e._props[this._mode];
      if (m && m.days > 1) {
        for (var l, f = {}, g = 0; g < p.length; g++) {
          var x = p[g];
          if (e.isOneDayEvent(p[g]))
            f[k = +e.date.date_part(new Date(x.start_date))] || (f[k] = []), f[k].push(x);
          else {
            var w = new Date(Math.min(+x.end_date, +this._max_date)), E = new Date(Math.max(+x.start_date, +this._min_date));
            for (E = e.date.day_start(E), p.splice(g, 1), g--; +E < +w; ) {
              var k, S = this._copy_event(x);
              S.start_date = E, S.end_date = T(S.start_date), E = e.date.add(E, 1, "day"), f[k = +e.date.date_part(new Date(E))] || (f[k] = []), f[k].push(S);
            }
          }
        }
        p = [];
        for (var g in f) {
          var v = b.apply(this, [f[g], u]), D = this._colsS.heights;
          (!l || D[0] > l[0]) && (l = D.slice()), p.push.apply(p, v);
        }
        var M = this._colsS.heights;
        for (M.splice(0, M.length), M.push.apply(M, l), g = 0; g < p.length; g++)
          if (this._ignores[p[g]._sday])
            p.splice(g, 1), g--;
          else {
            var N = p[g];
            N._first_chunk = N._last_chunk = !1, this.getEvent(N.id)._sorder = N._sorder;
          }
        p.sort(function(A, C) {
          return A.start_date.valueOf() == C.start_date.valueOf() ? A.id > C.id ? 1 : -1 : A.start_date > C.start_date ? 1 : -1;
        });
      } else
        p = b.apply(this, [p, u]);
      function T(A) {
        var C = e.date.add(A, 1, "day");
        return C = e.date.date_part(C);
      }
      return p;
    }, e.attachEvent("onEventAdded", function(p, u) {
      if (this._loading)
        return !0;
      for (var m in e._props) {
        var l = e._props[m];
        u[l.map_to] === void 0 && l.options[0] && (u[l.map_to] = l.options[0].key);
      }
      return !0;
    }), e.attachEvent("onEventCreated", function(p, u) {
      var m = e._props[this._mode];
      if (m && u) {
        var l = this.getEvent(p);
        s(m, l);
        var f = this._mouse_coords(u);
        this._update_unit_section({ view: m, event: l, pos: f }), this.event_updated(l);
      }
      return !0;
    });
  }();
}, url: function(e) {
  e._get_url_nav = function() {
    for (var i = {}, t = (document.location.hash || "").replace("#", "").split(","), a = 0; a < t.length; a++) {
      var s = t[a].split("=");
      s.length == 2 && (i[s[0]] = s[1]);
    }
    return i;
  }, e.attachEvent("onTemplatesReady", function() {
    var i = !0, t = e.date.str_to_date("%Y-%m-%d"), a = e.date.date_to_str("%Y-%m-%d"), s = e._get_url_nav().event || null;
    function n(_) {
      if (e.$destroyed)
        return !0;
      s = _, e.getEvent(_) && e.showEvent(_);
    }
    e.attachEvent("onAfterEventDisplay", function(_) {
      return s = null, !0;
    }), e.attachEvent("onBeforeViewChange", function(_, d, r, o) {
      if (i) {
        i = !1;
        var c = e._get_url_nav();
        if (c.event)
          try {
            if (e.getEvent(c.event))
              return setTimeout(function() {
                n(c.event);
              }), !1;
            var h = e.attachEvent("onXLE", function() {
              setTimeout(function() {
                n(c.event);
              }), e.detachEvent(h);
            });
          } catch {
          }
        if (c.date || c.mode) {
          try {
            this.setCurrentView(c.date ? t(c.date) : null, c.mode || null);
          } catch {
            this.setCurrentView(c.date ? t(c.date) : null, r);
          }
          return !1;
        }
      }
      var y = ["date=" + a(o || d), "mode=" + (r || _)];
      s && y.push("event=" + s);
      var b = "#" + y.join(",");
      return document.location.hash = b, !0;
    });
  });
}, week_agenda: function(e) {
  var i;
  e._wa = {}, e.xy.week_agenda_scale_height = 20, e.templates.week_agenda_event_text = function(t, a, s, n) {
    return e.templates.event_date(t) + " " + s.text;
  }, e.date.week_agenda_start = e.date.week_start, e.date.week_agenda_end = function(t) {
    return e.date.add(t, 7, "day");
  }, e.date.add_week_agenda = function(t, a) {
    return e.date.add(t, 7 * a, "day");
  }, e.attachEvent("onSchedulerReady", function() {
    var t = e.templates;
    t.week_agenda_date || (t.week_agenda_date = t.week_date);
  }), i = e.date.date_to_str("%l, %F %d"), e.templates.week_agenda_scale_date = function(t) {
    return i(t);
  }, e.attachEvent("onTemplatesReady", function() {
    var t = e.render_data;
    function a(s) {
      return `<div class='dhx_wa_day_cont'>
	<div class='dhx_wa_scale_bar'></div>
	<div class='dhx_wa_day_data' data-day='${s}'></div>
</div>`;
    }
    e.render_data = function(s) {
      if (this._mode != "week_agenda")
        return t.apply(this, arguments);
      e.week_agenda_view(!0);
    }, e.week_agenda_view = function(s) {
      e._min_date = e.date.week_start(e._date), e._max_date = e.date.add(e._min_date, 1, "week"), e.set_sizes(), s ? (e._table_view = e._allow_dnd = !0, e.$container.querySelector(".dhx_cal_header").style.display = "none", e._els.dhx_cal_date[0].innerHTML = "", function() {
        e._els.dhx_cal_data[0].innerHTML = "", e._rendered = [];
        var n = `<div class="dhx_week_agenda_wrapper">
<div class='dhx_wa_column'>
	${a(0)}
	${a(1)}
	${a(2)}
</div>
<div class='dhx_wa_column'>
	${a(3)}
	${a(4)}
	${a(5)}
	${a(6)}
</div>
</div>`, _ = e._getNavDateElement();
        _ && (_.innerHTML = e.templates[e._mode + "_date"](e._min_date, e._max_date, e._mode)), e._els.dhx_cal_data[0].innerHTML = n;
        const d = e.$container.querySelectorAll(".dhx_wa_day_cont");
        e._wa._selected_divs = [];
        for (var r = e.get_visible_events(), o = e.date.week_start(e._date), c = e.date.add(o, 1, "day"), h = 0; h < 7; h++) {
          d[h]._date = o, d[h].setAttribute("data-date", e.templates.format_date(o)), e._waiAria.weekAgendaDayCell(d[h], o);
          var y = d[h].querySelector(".dhx_wa_scale_bar"), b = d[h].querySelector(".dhx_wa_day_data");
          y.innerHTML = e.templates.week_agenda_scale_date(o);
          for (var p = [], u = 0; u < r.length; u++) {
            var m = r[u];
            m.start_date < c && m.end_date > o && p.push(m);
          }
          p.sort(function(E, k) {
            return E.start_date.valueOf() == k.start_date.valueOf() ? E.id > k.id ? 1 : -1 : E.start_date > k.start_date ? 1 : -1;
          });
          for (var l = 0; l < p.length; l++) {
            var f = p[l], g = document.createElement("div");
            e._rendered.push(g);
            var x = e.templates.event_class(f.start_date, f.end_date, f);
            g.classList.add("dhx_wa_ev_body"), x && g.classList.add(x), e.config.rtl && g.classList.add("dhx_wa_ev_body_rtl"), f._text_style && (g.style.cssText = f._text_style), f.color && g.style.setProperty("--dhx-scheduler-event-background", f.color), f.textColor && g.style.setProperty("--dhx-scheduler-event-color", f.textColor), e._select_id && f.id == e._select_id && (e.config.week_agenda_select || e.config.week_agenda_select === void 0) && (g.classList.add("dhx_cal_event_selected"), e._wa._selected_divs.push(g));
            var w = "";
            f._timed || (w = "middle", f.start_date.valueOf() >= o.valueOf() && f.start_date.valueOf() <= c.valueOf() && (w = "start"), f.end_date.valueOf() >= o.valueOf() && f.end_date.valueOf() <= c.valueOf() && (w = "end")), g.innerHTML = e.templates.week_agenda_event_text(f.start_date, f.end_date, f, o, w), g.setAttribute("event_id", f.id), g.setAttribute(e.config.event_attribute, f.id), e._waiAria.weekAgendaEvent(g, f), b.appendChild(g);
          }
          o = e.date.add(o, 1, "day"), c = e.date.add(c, 1, "day");
        }
      }()) : (e._table_view = e._allow_dnd = !1, e.$container.querySelector(".dhx_cal_header").style.display = "");
    }, e.mouse_week_agenda = function(s) {
      var n = s.ev;
      const _ = s.ev.target.closest(".dhx_wa_day_cont");
      let d;
      if (_ && (d = _._date), !d)
        return s;
      s.x = 0;
      var r = d.valueOf() - e._min_date.valueOf();
      if (s.y = Math.ceil(r / 6e4 / this.config.time_step), this._drag_mode == "move" && this._drag_pos && this._is_pos_changed(this._drag_pos, s)) {
        var o;
        this._drag_event._dhx_changed = !0, this._select_id = this._drag_id;
        for (var c = 0; c < e._rendered.length; c++)
          e._drag_id == this._rendered[c].getAttribute(this.config.event_attribute) && (o = this._rendered[c]);
        if (!e._wa._dnd) {
          var h = o.cloneNode(!0);
          this._wa._dnd = h, h.className = o.className, h.id = "dhx_wa_dnd", h.className += " dhx_wa_dnd", document.body.appendChild(h);
        }
        var y = document.getElementById("dhx_wa_dnd");
        y.style.top = (n.pageY || n.clientY) + 20 + "px", y.style.left = (n.pageX || n.clientX) + 20 + "px";
      }
      return s;
    }, e.attachEvent("onBeforeEventChanged", function(s, n, _) {
      if (this._mode == "week_agenda" && this._drag_mode == "move") {
        var d = document.getElementById("dhx_wa_dnd");
        d.parentNode.removeChild(d), e._wa._dnd = !1;
      }
      return !0;
    }), e.attachEvent("onEventSave", function(s, n, _) {
      return _ && this._mode == "week_agenda" && (this._select_id = s), !0;
    }), e._wa._selected_divs = [], e.attachEvent("onClick", function(s, n) {
      if (this._mode == "week_agenda" && (e.config.week_agenda_select || e.config.week_agenda_select === void 0)) {
        if (e._wa._selected_divs)
          for (var _ = 0; _ < this._wa._selected_divs.length; _++) {
            var d = this._wa._selected_divs[_];
            d.className = d.className.replace(/ dhx_cal_event_selected/, "");
          }
        return this.for_rendered(s, function(r) {
          r.className += " dhx_cal_event_selected", e._wa._selected_divs.push(r);
        }), e._select_id = s, !1;
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
  }), e.form_blocks.select.set_value = function(i, t, a) {
    t !== void 0 && t !== "" || (t = (i.firstChild.options[0] || {}).value), i.firstChild.value = t || "";
  };
}, year_view: function(e) {
  e.templates.year_date = function(d) {
    return e.date.date_to_str(e.locale.labels.year_tab + " %Y")(d);
  }, e.templates.year_month = e.date.date_to_str("%F"), e.templates.year_scale_date = e.date.date_to_str("%D"), e.templates.year_tooltip = function(d, r, o) {
    return o.text;
  };
  const i = function() {
    return e._mode == "year";
  }, t = function(d) {
    var r = e.$domHelpers.closest(d, "[data-cell-date]");
    return r && r.hasAttribute("data-cell-date") ? e.templates.parse_date(r.getAttribute("data-cell-date")) : null;
  };
  e.dblclick_dhx_year_grid = function(d) {
    if (i()) {
      const r = d.target;
      if (e.$domHelpers.closest(r, ".dhx_before") || e.$domHelpers.closest(r, ".dhx_after"))
        return !1;
      const o = t(r);
      if (o) {
        const c = o, h = this.date.add(c, 1, "day");
        !this.config.readonly && this.config.dblclick_create && this.addEventNow(c.valueOf(), h.valueOf(), d);
      }
    }
  }, e.attachEvent("onEventIdChange", function() {
    i() && this.year_view(!0);
  });
  var a = e.render_data;
  e.render_data = function(d) {
    if (!i())
      return a.apply(this, arguments);
    for (var r = 0; r < d.length; r++)
      this._year_render_event(d[r]);
  };
  var s = e.clear_view;
  e.clear_view = function() {
    if (!i())
      return s.apply(this, arguments);
    var d = e._year_marked_cells;
    for (var r in d)
      d.hasOwnProperty(r) && d[r].classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
    e._year_marked_cells = {};
  }, e._hideToolTip = function() {
    this._tooltip && (this._tooltip.style.display = "none", this._tooltip.date = new Date(9999, 1, 1));
  }, e._showToolTip = function(d, r, o, c) {
    if (this._tooltip) {
      if (this._tooltip.date.valueOf() == d.valueOf())
        return;
      this._tooltip.innerHTML = "";
    } else {
      var h = this._tooltip = document.createElement("div");
      h.className = "dhx_year_tooltip", this.config.rtl && (h.className += " dhx_tooltip_rtl"), document.body.appendChild(h), h.addEventListener("click", e._click.dhx_cal_data), h.addEventListener("click", function(f) {
        if (f.target.closest(`[${e.config.event_attribute}]`)) {
          const g = f.target.closest(`[${e.config.event_attribute}]`).getAttribute(e.config.event_attribute);
          e.showLightbox(g);
        }
      });
    }
    for (var y = this.getEvents(d, this.date.add(d, 1, "day")), b = "", p = 0; p < y.length; p++) {
      var u = y[p];
      if (this.filter_event(u.id, u)) {
        var m = u.color ? "--dhx-scheduler-event-background:" + u.color + ";" : "", l = u.textColor ? "--dhx-scheduler-event-color:" + u.textColor + ";" : "";
        b += "<div class='dhx_tooltip_line' style='" + m + l + "' event_id='" + y[p].id + "' " + this.config.event_attribute + "='" + y[p].id + "'>", b += "<div class='dhx_tooltip_date' style='" + m + l + "'>" + (y[p]._timed ? this.templates.event_date(y[p].start_date) : "") + "</div>", b += "<div class='dhx_event_icon icon_details'>&nbsp;</div>", b += this.templates.year_tooltip(y[p].start_date, y[p].end_date, y[p]) + "</div>";
      }
    }
    this._tooltip.style.display = "", this._tooltip.style.top = "0px", document.body.offsetWidth - r.left - this._tooltip.offsetWidth < 0 ? this._tooltip.style.left = r.left - this._tooltip.offsetWidth + "px" : this._tooltip.style.left = r.left + c.offsetWidth + "px", this._tooltip.date = d, this._tooltip.innerHTML = b, document.body.offsetHeight - r.top - this._tooltip.offsetHeight < 0 ? this._tooltip.style.top = r.top - this._tooltip.offsetHeight + c.offsetHeight + "px" : this._tooltip.style.top = r.top + "px";
  }, e._year_view_tooltip_handler = function(d) {
    if (i()) {
      var r = d.target || d.srcElement;
      r.tagName.toLowerCase() == "a" && (r = r.parentNode), e._getClassName(r).indexOf("dhx_year_event") != -1 ? e._showToolTip(e.templates.parse_date(r.getAttribute("data-year-date")), e.$domHelpers.getOffset(r), d, r) : e._hideToolTip();
    }
  }, e._init_year_tooltip = function() {
    e._detachDomEvent(e._els.dhx_cal_data[0], "mouseover", e._year_view_tooltip_handler), e.event(e._els.dhx_cal_data[0], "mouseover", e._year_view_tooltip_handler);
  }, e._get_year_cell = function(d) {
    for (var r = e.templates.format_date(d), o = this.$root.querySelectorAll(`.dhx_cal_data .dhx_cal_datepicker_date[data-cell-date="${r}"]`), c = 0; c < o.length; c++)
      if (!e.$domHelpers.closest(o[c], ".dhx_after, .dhx_before"))
        return o[c];
    return null;
  }, e._year_marked_cells = {}, e._mark_year_date = function(d, r) {
    var o = e.templates.format_date(d), c = this._get_year_cell(d);
    if (c) {
      var h = this.templates.event_class(r.start_date, r.end_date, r);
      e._year_marked_cells[o] || (c.classList.add("dhx_year_event", "dhx_cal_datepicker_event"), c.setAttribute("data-year-date", o), c.setAttribute("date", o), e._year_marked_cells[o] = c), h && c.classList.add(h);
    }
  }, e._unmark_year_date = function(d) {
    var r = this._get_year_cell(d);
    r && r.classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
  }, e._year_render_event = function(d) {
    var r = d.start_date;
    for (r = r.valueOf() < this._min_date.valueOf() ? this._min_date : this.date.date_part(new Date(r)); r < d.end_date; )
      if (this._mark_year_date(r, d), (r = this.date.add(r, 1, "day")).valueOf() >= this._max_date.valueOf())
        return;
  }, e.year_view = function(d) {
    if (e.set_sizes(), e._table_view = d, !this._load_mode || !this._load())
      if (d) {
        if (e._init_year_tooltip(), e._reset_year_scale(), e._load_mode && e._load())
          return void (e._render_wait = !0);
        e.render_view_data();
      } else
        e._hideToolTip();
  }, e._reset_year_scale = function() {
    var d = this._els.dhx_cal_data[0];
    d.scrollTop = 0, d.innerHTML = "";
    let r = this.date.year_start(new Date(this._date));
    this._min_date = this.date.week_start(new Date(r));
    const o = document.createElement("div");
    o.classList.add("dhx_year_wrapper");
    let c = r;
    for (let b = 0; b < 12; b++) {
      let p = document.createElement("div");
      p.className = "dhx_year_box", p.setAttribute("date", this._helpers.formatDate(c)), p.setAttribute("data-month-date", this._helpers.formatDate(c)), p.innerHTML = `<div class='dhx_year_month'>${this.templates.year_month(c)}</div>
			<div class='dhx_year_grid'></div>`;
      const u = p.querySelector(".dhx_year_grid"), m = e._createDatePicker(null, { date: c, filterDays: e.ignore_year, minWeeks: 6 });
      m._renderDayGrid(u), m.destructor(), o.appendChild(p), c = this.date.add(c, 1, "month");
    }
    d.appendChild(o);
    let h = this.date.add(r, 1, "year");
    h.valueOf() != this.date.week_start(new Date(h)).valueOf() && (h = this.date.week_start(new Date(h)), h = this.date.add(h, 1, "week")), this._max_date = h;
    var y = this._getNavDateElement();
    y && (y.innerHTML = this.templates[this._mode + "_date"](r, h, this._mode));
  };
  var n = e.getActionData;
  e.getActionData = function(d) {
    return i() ? { date: t(d.target), section: null } : n.apply(e, arguments);
  };
  var _ = e._locate_event;
  e._locate_event = function(d) {
    var r = _.apply(e, arguments);
    if (!r) {
      var o = t(d);
      if (!o)
        return null;
      var c = e.getEvents(o, e.date.add(o, 1, "day"));
      if (!c.length)
        return null;
      r = c[0].id;
    }
    return r;
  }, e.attachEvent("onDestroy", function() {
    e._hideToolTip();
  });
} }, ca = new class {
  constructor(e) {
    this._seed = 0, this._schedulerPlugins = [], this._bundledExtensions = e, this._extensionsManager = new Ba(e);
  }
  plugin(e) {
    this._schedulerPlugins.push(e), I.scheduler && e(I.scheduler);
  }
  getSchedulerInstance(e) {
    for (var i = Ua(this._extensionsManager), t = 0; t < this._schedulerPlugins.length; t++)
      this._schedulerPlugins[t](i);
    return i._internal_id = this._seed++, this.$syncFactory && this.$syncFactory(i), e && this._initFromConfig(i, e), i;
  }
  _initFromConfig(e, i) {
    if (i.plugins && e.plugins(i.plugins), i.config && e.mixin(e.config, i.config, !0), i.templates && e.attachEvent("onTemplatesReady", function() {
      e.mixin(e.templates, i.templates, !0);
    }, { once: !0 }), i.events)
      for (const t in i.events)
        e.attachEvent(t, i.events[t]);
    i.locale && e.i18n.setLocale(i.locale), Array.isArray(i.calendars) && i.calendars.forEach(function(t) {
      e.addCalendar(t);
    }), i.container ? e.init(i.container) : e.init(), i.data && (typeof i.data == "string" ? e.load(i.data) : e.parse(i.data));
  }
}(Pn), Xt = ca.getSchedulerInstance(), Kt = ca;
typeof window < "u" && (window.scheduler = Xt, window.Scheduler = Kt, window.$dhx || (window.$dhx = {}), window.$dhx.scheduler = Xt, window.$dhx.Scheduler = Kt);
export {
  Kt as Scheduler,
  Xt as scheduler
};
