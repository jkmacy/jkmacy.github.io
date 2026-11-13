import * as squint_core from './../vendor/squint-cljs/core.js';
var DAY = 86400000;
var MINUTE = 60000;
var wrap = function (x, n) {
return squint_core.mod((squint_core.rem(x, n) + n), n);

};
var to_rad = function (d) {
return ((d * Math.PI) / 180);

};
var to_deg = function (r) {
return ((r * 180) / Math.PI);

};
var position = function (date) {
const jd_1 = ((date.getTime() / DAY) + 2440587.5);
const t_2 = ((jd_1 - 2451545) / 36525);
const l0_3 = squint_core.rem((280.46646 + (t_2 * (36000.76983 + (t_2 * 0.0003032)))), 360);
const m_4 = to_rad(squint_core.rem((357.52911 + (t_2 * (35999.05029 - (t_2 * 0.0001537)))), 360));
const c_5 = ((Math.sin(m_4) * (1.914602 - (t_2 * (0.004817 + (0.000014 * t_2))))) + (Math.sin((2 * m_4)) * (0.019993 - (0.000101 * t_2))) + (Math.sin((3 * m_4)) * 0.000289));
const sun_lon_6 = (l0_3 + c_5);
const app_lon_7 = to_rad((sun_lon_6 - 0.00569 - (0.00478 * Math.sin(to_rad((125.04 - (1934.136 * t_2)))))));
const epsilon_8 = to_rad(((23.439291 - (t_2 * (0.013004 + (t_2 * (1.64e-7 - (t_2 * 5.03e-7)))))) + (0.00256 * Math.cos(to_rad((125.04 - (1934.136 * t_2)))))));
const dec_9 = Math.asin((Math.sin(epsilon_8) * Math.sin(app_lon_7)));
const e_10 = (0.016708634 - (t_2 * (0.000042037 + (1.267e-7 * t_2))));
const y_11 = Math.pow(Math.tan((epsilon_8 / 2)), 2);
const l0r_12 = to_rad(l0_3);
const eqt_13 = (4 * to_deg(((((y_11 * Math.sin((2 * l0r_12))) - (2 * e_10 * Math.sin(m_4))) + (4 * e_10 * y_11 * Math.sin(m_4) * Math.cos((2 * l0r_12)))) - (0.5 * y_11 * y_11 * Math.sin((4 * l0r_12))) - (1.25 * e_10 * e_10 * Math.sin((2 * m_4))))));
return ({"eqt": eqt_13, "dec": dec_9});

};
var solarStamp = function (date, lon) {
return (date.getTime() + (((4 * lon) + squint_core.get(position(date), "eqt")) * MINUTE));

};
var instant = function (stamp, lon) {
let i_1 = 0;
let time_2 = (stamp - (4 * lon * MINUTE));
while(true){
if ((i_1 < 5)) {
let G__3 = (i_1 + 1);
let G__4 = (stamp - (((4 * lon) + squint_core.get(position((new Date(time_2))), "eqt")) * MINUTE));
i_1 = G__3;
time_2 = G__4;
continue;
} else {
return time_2};
;break;
}
;

};
var pad = function (n) {
return `${n??''}`.padStart(2, "0");

};
var formatMinutes = function (minutes, seconds) {
const total_1 = wrap(((squint_core.truth_(seconds)) ? (Math.floor((minutes * 60))) : ((Math.round(minutes) * 60))), 86400);
const h_2 = Math.floor((total_1 / 3600));
const m_3 = Math.floor((squint_core.rem(total_1, 3600) / 60));
const s_4 = squint_core.rem(total_1, 60);
return `${(((squint_core.rem(h_2, 12) === 0)) ? (12) : (squint_core.rem(h_2, 12)))??''}${":"}${pad(m_3)??''}${((squint_core.truth_(seconds)) ? (`${":"}${pad(s_4)??''}`) : (""))??''}${(((h_2 < 12)) ? (" am") : (" pm"))??''}`;

};
var schedule = function (date, lat, lon, offset) {
const offset_1 = (() => {
const or__23663__auto___2 = offset;
if (squint_core.truth_(or__23663__auto___2)) {
return or__23663__auto___2} else {
return 0};

})();
const stamp_3 = solarStamp(date, lon);
const day_4 = ((Math.floor((stamp_3 / DAY)) * DAY) + (offset_1 * DAY));
const noon_5 = instant((day_4 + (720 * MINUTE)), lon);
const dec_6 = squint_core.get(position((new Date(noon_5))), "dec");
const angle_7 = (function (zenith) {
const v_8 = ((Math.cos(to_rad(zenith)) - (Math.sin(to_rad(lat)) * Math.sin(dec_6))) / (Math.cos(to_rad(lat)) * Math.cos(dec_6)));
if (squint_core.truth_(((v_8 >= -1) && (v_8 <= 1)))) {
return (to_deg(Math.acos(v_8)) * 4)} else {
return null};

});
const sun_9 = angle_7(90.833);
const civil_10 = angle_7(96);
const daylight_11 = (((sun_9 == null)) ? (360) : (sun_9));
const twilight_12 = (((civil_10 == null)) ? (Math.min(719, (daylight_11 + 30))) : (civil_10));
const mins_13 = [0, (720 - twilight_12), (720 - daylight_11), (720 - (daylight_11 / 2)), 720, (720 + (daylight_11 / 2)), (720 + daylight_11), (720 + twilight_12), 1440];
return ({"day": day_4, "noon": noon_5, "mins": mins_13, "times": squint_core.mapv((function (_PERCENT_1) {
return instant((day_4 + (_PERCENT_1 * MINUTE)), lon);

}), mins_13), "polar": (() => {
const or__23663__auto___14 = (sun_9 == null);
if (or__23663__auto___14) {
return or__23663__auto___14} else {
return (civil_10 == null)};

})(), "sun": sun_9, "civil": civil_10});

};
var seasonalSchedule = function (date, lat, lon, offset) {
const offset_1 = (() => {
const or__23663__auto___2 = offset;
if (squint_core.truth_(or__23663__auto___2)) {
return or__23663__auto___2} else {
return 0};

})();
const initial_3 = schedule(date, lat, lon, 0);
const base_4 = (((date.getTime() < squint_core.nth(squint_core.get(initial_3, "times"), 1))) ? (schedule(date, lat, lon, -1)) : (initial_3));
const anchor_5 = (new Date(squint_core.get(base_4, "noon")));
const today_6 = schedule(anchor_5, lat, lon, offset_1);
const next_7 = schedule(anchor_5, lat, lon, (offset_1 + 1));
const rise_8 = squint_core.nth(squint_core.get(today_6, "times"), 2);
const set_9 = squint_core.nth(squint_core.get(today_6, "times"), 6);
const next_rise_10 = squint_core.nth(squint_core.get(next_7, "times"), 2);
const start_11 = squint_core.nth(squint_core.get(today_6, "times"), 1);
const end_12 = squint_core.nth(squint_core.get(today_6, "times"), 7);
const next_start_13 = squint_core.nth(squint_core.get(next_7, "times"), 1);
const day_hour_14 = ((end_12 - start_11) / 12);
const night_hour_15 = ((next_start_13 - end_12) / 12);
const midnight_16 = (end_12 + (6 * night_hour_15));
const available_17 = (!(squint_core.get(today_6, "sun") == null) && !(squint_core.get(next_7, "sun") == null));
return ({"dawn": ((!(squint_core.get(next_7, "civil") == null)) ? (squint_core.nth(squint_core.get(next_7, "times"), 1)) : (null)), "polar": (() => {
const or__23663__auto___18 = squint_core.not(available_17);
if (or__23663__auto___18) {
return or__23663__auto___18} else {
const or__23663__auto___19 = (squint_core.get(today_6, "civil") == null);
if (or__23663__auto___19) {
return or__23663__auto___19} else {
return (squint_core.get(next_7, "civil") == null)};
};

})(), "day": squint_core.get(today_6, "day"), "nextStart": next_start_13, "dawnToday": ((!(squint_core.get(today_6, "civil") == null)) ? (start_11) : (null)), "times": [start_11, rise_8, (start_11 + (3 * day_hour_14)), (start_11 + (6 * day_hour_14)), (start_11 + (9 * day_hour_14)), set_9, end_12, midnight_16, next_start_13], "start": start_11, "dusk": ((!(squint_core.get(today_6, "civil") == null)) ? (squint_core.nth(squint_core.get(today_6, "times"), 7)) : (null)), "nightHour": night_hour_15, "rise": rise_8, "noon": squint_core.get(today_6, "noon"), "available": available_17, "nextRise": next_rise_10, "set": set_9, "end": end_12, "dayHour": day_hour_14});

};
var seasonalMinutes = function (time, cycle) {
if (squint_core.not(squint_core.get(cycle, "available"))) {
return NaN} else {
if ((time < squint_core.get(cycle, "end"))) {
return (((time - squint_core.get(cycle, "start")) / squint_core.get(cycle, "dayHour")) * 60)} else {
return (720 + (((time - squint_core.get(cycle, "end")) / squint_core.get(cycle, "nightHour")) * 60))}};

};
var formatSeasonal = function (minutes, seconds) {
if (squint_core.not(Number.isFinite(minutes))) {
return "—"} else {
const total_1 = wrap(((squint_core.truth_(seconds)) ? (Math.floor(((minutes * 60) + 1e-7))) : ((Math.round(minutes) * 60))), 86400);
const parts_2 = [Math.floor((total_1 / 3600)), Math.floor((squint_core.rem(total_1, 3600) / 60))];
return squint_core.mapv(pad, ((squint_core.truth_(seconds)) ? (squint_core.conj(parts_2, squint_core.rem(total_1, 60))) : (parts_2))).join(":");
};

};

export { to_rad, pad, solarStamp, formatMinutes, to_deg, wrap, position, schedule, seasonalMinutes, DAY, MINUTE, seasonalSchedule, instant, formatSeasonal }
