import * as squint_core from './../vendor/squint-cljs/core.js';
import * as solar from './core.js';
import * as routes from '../shared/routes.js?v=2026-10-10-breviary2';
var hours = [({"id": "lauds", "name": "Lauds", "latin": "Laudes", "icon": "🌄", "desc": "Dawn prayer at first light — the seasonal day begins"}), ({"id": "prime", "name": "Prime", "latin": "Prima", "icon": "🌅", "desc": "First hour — the moment of sunrise"}), ({"id": "terce", "name": "Terce", "latin": "Tertia", "icon": "🌤️", "desc": "Third hour — midway between sunrise and noon"}), ({"id": "sext", "name": "Sext", "latin": "Sexta", "icon": "☀️", "desc": "Sixth hour — solar noon, the sun at its height"}), ({"id": "none", "name": "None", "latin": "Nona", "icon": "🌇", "desc": "Ninth hour — midway between noon and sunset"}), ({"id": "vespers", "name": "Vespers", "latin": "Vesperae", "icon": "🌆", "desc": "Evening prayer — the lighting of lamps at sunset"}), ({"id": "compline", "name": "Compline", "latin": "Completorium", "icon": "🌙", "desc": "Night prayer — completion of the day's office"}), ({"id": "matins", "name": "Matins", "latin": "Matutinum", "icon": "🕯️", "desc": "The night watch — prayer in darkness before dawn"})];
var state = squint_core.atom(({"location": null, "offset": 0, "last-render": "", "install": null}));
var $ = function (id) {
return document.getElementById(id);

};
var text_BANG_ = function (id, value) {
return $(id).textContent = value;

};
var html_BANG_ = function (id, value) {
return $(id).innerHTML = value;

};
var display_BANG_ = function (id, value) {
return $(id).style.display = value;

};
var civil_format = (new Intl.DateTimeFormat(undefined, ({"hour": "numeric", "minute": "2-digit", "timeZoneName": "short"})));
var date_format = (new Intl.DateTimeFormat(undefined, ({"weekday": "long", "year": "numeric", "month": "long", "day": "numeric", "timeZone": "UTC"})));
var civil = function (t) {
return civil_format.format((new Date(t)));

};
var solar_time = function (t, cycle, seconds) {
return solar.formatSeasonal(solar.seasonalMinutes(t, cycle), seconds);

};
var pair = function (t, cycle) {
return `${solar_time(t, cycle, false)??''}${"<span class=\"solar-label\">"}${civil(t)??''}${" local</span>"}`;

};
var date_label = function (t) {
return (new Date(t)).toLocaleDateString(undefined, ({"month": "short", "day": "numeric"}));

};
var breviary_link = function (t, h) {
const temp__23219__auto___1 = routes.office_breviary_href(t, squint_core.get(h, "id"));
if (squint_core.truth_(temp__23219__auto___1)) {
const href_2 = temp__23219__auto___1;
return `${"<a class=\"breviary-office-link\" href=\""}${href_2??''}${"\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Pray "}${squint_core.get(h, "name")??''}${" in the Breviary for "}${routes.civil_date(t)??''}${" (opens in a new tab)\">Pray "}${squint_core.get(h, "name")??''}${" · "}${date_label(t)??''}${"</a>"}`;
} else {
return "<span class=\"breviary-unavailable\">Matins is not yet in the Breviary; use the Ordo below.</span>"};

};
var hour_row = function (h, i, current, s) {
const t_1 = squint_core.nth(squint_core.get(s, "times"), i);
const compline_QMARK__2 = (squint_core.get(h, "id") === "compline");
return `${"<li class=\"hour-item"}${((squint_core._EQ_(i, current)) ? (" active") : ((((i < current)) ? (" past") : ((("else") ? ("") : (null))))))??''}${"\""}${((squint_core._EQ_(i, current)) ? (" aria-current=\"true\"") : (""))??''}${"><div class=\"hour-icon\" aria-hidden=\"true\">"}${squint_core.get(h, "icon")??''}${"</div><div class=\"hour-info\"><div class=\"hour-name\">"}${squint_core.get(h, "name")??''}${"<span class=\"hour-latin\">"}${squint_core.get(h, "latin")??''}${"</span></div><div class=\"hour-desc\">"}${squint_core.get(h, "desc")??''}${"</div>"}${breviary_link(t_1, h)??''}${"<a class=\"ordo-office-link\" href=\""}${routes.ordo_href(t_1, squint_core.get(h, "id"))??''}${"\" aria-label=\""}${((compline_QMARK__2) ? ("Daily Ordo") : (`${squint_core.get(h, "name")??''}${" Ordo"}`))??''}${" for "}${routes.civil_date(t_1)??''}${"\">"}${((compline_QMARK__2) ? ("Day’s Ordo") : ("Ordo"))??''}${" · "}${date_label(t_1)??''}${" ›</a></div><div class=\"hour-time\">"}${pair(t_1, s)??''}${((squint_core.truth_((() => {
const or__23663__auto___3 = squint_core.not(squint_core.get(s, "available"));
if (or__23663__auto___3) {
return or__23663__auto___3} else {
const or__23663__auto___4 = ((i === 6) && (squint_core.get(s, "dusk") == null));
if (squint_core.truth_(or__23663__auto___4)) {
return or__23663__auto___4} else {
return ((i === 0) && (squint_core.get(s, "dawnToday") == null))};
};

})())) ? ("<span class=\"solar-label\">conventional schedule</span>") : (""))??''}${"</div></li>"}`;

};
var draw_arc_BANG_ = function (s, t, offset) {
if (squint_core.not(squint_core.get(s, "available"))) {
return html_BANG_("arc-svg", "<text x=\"300\" y=\"45\" text-anchor=\"middle\" font-size=\"16\" fill=\"#5c4f3a\">Day arc unavailable at this latitude today</text>")} else {
const f_1 = Math.max(0, Math.min(1, ((t - squint_core.get(s, "rise")) / (squint_core.get(s, "set") - squint_core.get(s, "rise")))));
const x_2 = (30 + (540 * f_1));
const show_3 = ((offset === 0) && ((t >= squint_core.get(s, "rise")) && (t <= squint_core.get(s, "set"))));
$("arc-svg").setAttribute("role", "img");
$("arc-svg").setAttribute("aria-label", (((offset === 1)) ? ("Tomorrow’s sunrise to sunset arc") : ("Sun’s progress from sunrise to sunset")));
return html_BANG_("arc-svg", `${"<path d=\"M30 62 Q300 -34 570 62\" fill=\"none\" stroke=\"#c8b89a\" stroke-width=\"2\"/><text x=\"30\" y=\"78\" text-anchor=\"middle\" font-size=\"11\" fill=\"#5c4f3a\">Sunrise</text><text x=\"300\" y=\"10\" text-anchor=\"middle\" font-size=\"11\" fill=\"#5c4f3a\">Noon</text><text x=\"570\" y=\"78\" text-anchor=\"middle\" font-size=\"11\" fill=\"#5c4f3a\">Sunset</text>"}${((squint_core.truth_(show_3)) ? (`${"<circle cx=\""}${x_2}${"\" cy=\""}${(62 - (192 * f_1 * (1 - f_1)))}${"\" r=\"6\" fill=\"#b8860b\"/>"}`) : (""))??''}`);
};

};
var render_current_BANG_ = function (s, now, t, current) {
const h_1 = squint_core.nth(hours, current);
const times_2 = squint_core.get(s, "times");
const section_3 = squint_core.get(routes.sections, squint_core.get(h_1, "id"));
const remaining_4 = Math.max(1, Math.ceil(((squint_core.nth(times_2, (current + 1)) - t) / 60000)));
text_BANG_("cur-time", solar_time(t, s, true));
text_BANG_("civil-time", `${now.toLocaleTimeString(undefined, ({"hour": "numeric", "minute": "2-digit", "second": "2-digit", "timeZoneName": "short"}))??''}${" · local time"}`);
text_BANG_("cur-date", `${date_format.format((new Date(squint_core.get(s, "day"))))??''}${" · day beginning at first light"}`);
$("current-ordo").href = routes.ordo_href(squint_core.nth(times_2, current), squint_core.get(h_1, "id"));
text_BANG_("current-ordo", (((squint_core.get(h_1, "id") === "compline")) ? ("Open this day’s Ordo") : (`${"Open "}${(() => {
const or__23663__auto___5 = section_3;
if (squint_core.truth_(or__23663__auto___5)) {
return or__23663__auto___5} else {
return "daily"};

})()??''}${" in the Ordo"}`)));
const href_6 = routes.office_breviary_href(squint_core.nth(times_2, current), squint_core.get(h_1, "id"));
$("current-breviary").hidden = (href_6 == null);
$("current-breviary-note").hidden = !(href_6 == null);
if (squint_core.truth_(href_6)) {
$("current-breviary").href = href_6;
text_BANG_("current-breviary", `${"Pray "}${squint_core.get(h_1, "name")??''}${" · "}${date_label(squint_core.nth(times_2, current))??''}`)} else {
$("current-breviary").removeAttribute("href")};
text_BANG_("cur-name", ((squint_core.truth_(squint_core.get(s, "available"))) ? (squint_core.get(h_1, "name")) : ("Seasonal time unavailable")));
text_BANG_("cur-latin", ((squint_core.truth_(squint_core.get(s, "available"))) ? (squint_core.get(h_1, "latin")) : ("No complete day-and-night cycle")));
text_BANG_("seasonal-detail", ((squint_core.truth_(squint_core.get(s, "available"))) ? (`${"One daylight hour: "}${(squint_core.get(s, "dayHour") / 60000).toFixed(1)??''}${" ordinary minutes · one night hour: "}${(squint_core.get(s, "nightHour") / 60000).toFixed(1)??''}${" ordinary minutes"}`) : ("Seasonal hours require sunrise and sunset.")));
$("hour-progress").style.width = `${Math.max(0, Math.min(100, (((t - squint_core.nth(times_2, current)) / (squint_core.nth(times_2, (current + 1)) - squint_core.nth(times_2, current))) * 100)))??''}${"%"}`;
$("countdown-text").hidden = squint_core.not(squint_core.get(s, "available"));
$("hour-progress").parentElement.hidden = squint_core.not(squint_core.get(s, "available"));
return text_BANG_("countdown-text", `${(((remaining_4 >= 60)) ? (`${Math.floor((remaining_4 / 60))??''}${"h "}`) : (""))??''}${squint_core.rem(remaining_4, 60)??''}${"m until "}${squint_core.get(squint_core.nth(hours, squint_core.mod((current + 1), 8)), "name")??''}${" · ordinary time"}`);

};
var tick_BANG_ = function () {
const map___1_3 = squint_core.deref(state);
const map___1_4 = ((squint_core.truth_(squint_core.sequential_QMARK_(map___1_3))) ? (((squint_core.truth_(squint_core.vector_QMARK_(map___1_3))) ? (map___1_3) : (squint_core.seq_to_map_for_destructuring(map___1_3)))) : (map___1_3));
const location_5 = squint_core.get(map___1_4, "location");
const offset_6 = squint_core.get(map___1_4, "offset");
const last_render_7 = squint_core.get(map___1_4, "last-render");
if (squint_core.truth_(location_5)) {
const now_8 = (new Date());
const t_9 = now_8.getTime();
const s_10 = solar.seasonalSchedule(now_8, squint_core.get(location_5, "lat"), squint_core.get(location_5, "lon"), offset_6);
const current_11 = (((offset_6 === 0)) ? (Math.max(0, squint_core.get(s_10, "times").findIndex((function (v, i) {
return ((i < 8) && ((t_9 >= v) && (t_9 < squint_core.nth(squint_core.get(s_10, "times"), (i + 1)))));

})))) : (-1));
const key_12 = [squint_core.get(s_10, "day"), current_11, squint_core.get(location_5, "lat"), squint_core.get(location_5, "lon"), now_8.getTimezoneOffset()].join(":");
for (let G__13 of squint_core.iterable([["btn-today", 0], ["btn-tomorrow", 1]])) {
const vec___14_17 = G__13;
const id_18 = squint_core.nth(vec___14_17, 0, null);
const n_19 = squint_core.nth(vec___14_17, 1, null);
$(id_18).classList.toggle("active", squint_core._EQ_(offset_6, n_19));
$(id_18).setAttribute("aria-pressed", squint_core._EQ_(offset_6, n_19))
};
display_BANG_("current-card-wrap", (((offset_6 === 0)) ? ("") : ("none")));
display_BANG_("tomorrow-header", (((offset_6 === 1)) ? ("") : ("none")));
text_BANG_("tomorrow-header", date_format.format((new Date(squint_core.get(s_10, "day")))));
if ((offset_6 === 0)) {
render_current_BANG_(s_10, now_8, t_9, current_11)};
$("ordo-nav").href = routes.ordo_href(squint_core.get(s_10, "rise"), "matins");
if (!squint_core._EQ_(key_12, last_render_7)) {
squint_core.swap_BANG_(state, squint_core.assoc, "last-render", key_12);
$("polar-note").hidden = squint_core.not(squint_core.get(s_10, "polar"));
text_BANG_("polar-note", "Some sunrise, sunset, or twilight events are absent at this latitude. Seasonal time is unavailable without a complete sunrise–sunset–sunrise cycle; affected Office boundaries use a conventional fallback.");
html_BANG_("si-firstlight", (((squint_core.get(s_10, "dawnToday") == null)) ? ("No civil dawn") : (pair(squint_core.get(s_10, "dawnToday"), s_10))));
html_BANG_("si-noon", pair(squint_core.get(s_10, "noon"), s_10));
html_BANG_("si-lastlight", (((squint_core.get(s_10, "dusk") == null)) ? ("No civil dusk") : (pair(squint_core.get(s_10, "dusk"), s_10))));
html_BANG_("hours-list", squint_core.vec(squint_core.map_indexed((function (_PERCENT_1, _PERCENT_2) {
return hour_row(_PERCENT_2, _PERCENT_1, current_11, s_10);

}), hours)).join(""))};
return draw_arc_BANG_(s_10, t_9, offset_6);
};

};
var set_location_BANG_ = function (lat, lon, source) {
if (squint_core.truth_((() => {
const and__23694__auto___1 = Number.isFinite(lat);
if (squint_core.truth_(and__23694__auto___1)) {
const and__23694__auto___2 = Number.isFinite(lon);
if (squint_core.truth_(and__23694__auto___2)) {
return ((Math.abs(lat) <= 90) && (Math.abs(lon) <= 180))} else {
return and__23694__auto___2};
} else {
return and__23694__auto___1};

})())) {
const loc_3 = ({"lat": lat, "lon": lon, "source": source});
squint_core.swap_BANG_(state, squint_core.assoc, "location", loc_3, "last-render", "");
try{
localStorage.setItem("solar-office-location", JSON.stringify(loc_3))}
catch(__4){
}
;
$("latitude").value = lat;
$("longitude").value = lon;
text_BANG_("location-text", `${Math.abs(lat).toFixed(4)??''}${"° "}${(((lat >= 0)) ? ("N") : ("S"))??''}${", "}${Math.abs(lon).toFixed(4)??''}${"° "}${(((lon >= 0)) ? ("E") : ("W"))??''}${" · "}${source??''}`);
text_BANG_("location-status", "Location saved on this device. Update it when you travel.");
display_BANG_("permission-card", "none");
display_BANG_("main-content", "");
$("settings").open = false;
return tick_BANG_();
};

};
var request_location_BANG_ = function () {
if (squint_core.not(navigator.geolocation)) {
return text_BANG_("location-status", "Device location is unavailable. Enter coordinates instead.")} else {
text_BANG_("location-status", "Finding your location…");
return navigator.geolocation.getCurrentPosition((function (p) {
return set_location_BANG_(p.coords.latitude, p.coords.longitude, "device location");

}), (function (e) {
text_BANG_("location-status", `${(((e.code === 1)) ? ("Location permission was denied.") : ("Could not obtain your location."))??''}${" Enter coordinates or try again."}`);
return $("settings").open = true;

}), ({"enableHighAccuracy": false, "timeout": 15000, "maximumAge": 300000}));
};

};
for (let G__1 of squint_core.iterable(["locate", "allow-location"])) {
let id5 = G__1;
$(id5).addEventListener("click", request_location_BANG_)
};
$("location-form").addEventListener("submit", (function (e) {
e.preventDefault();
return set_location_BANG_(Number($("latitude").value), Number($("longitude").value), "manual location");

}));
for (let G__1 of squint_core.iterable([["btn-today", 0], ["btn-tomorrow", 1]])) {
let vec___26 = G__1;
let id7 = squint_core.nth(vec___26, 0, null);
let offset8 = squint_core.nth(vec___26, 1, null);
$(id7).addEventListener("click", (function () {
squint_core.swap_BANG_(state, squint_core.assoc, "offset", offset8, "last-render", "");
return tick_BANG_();

}))
};
try{
let saved9 = JSON.parse(localStorage.getItem("solar-office-location"));
if (squint_core.truth_(saved9)) {
set_location_BANG_(squint_core.get(saved9, "lat"), squint_core.get(saved9, "lon"), "saved location")}}
catch(__1){
}
;
if (squint_core.truth_(squint_core.get(squint_core.deref(state), "location"))) {
} else {
display_BANG_("permission-card", "")};
setInterval(tick_BANG_, 1000);
document.addEventListener("visibilitychange", (function () {
if (squint_core.truth_(document.hidden)) {
return null} else {
squint_core.swap_BANG_(state, squint_core.assoc, "last-render", "");
return tick_BANG_();
};

}));
window.addEventListener("beforeinstallprompt", (function (e) {
e.preventDefault();
squint_core.swap_BANG_(state, squint_core.assoc, "install", e);
return $("install").hidden = false;

}));
$("install").addEventListener("click", (function () {
const temp__23298__auto___1 = squint_core.get(squint_core.deref(state), "install");
if (squint_core.truth_(temp__23298__auto___1)) {
const prompt_2 = temp__23298__auto___1;
return prompt_2.prompt().then((function () {
return prompt_2.userChoice;

})).then((function () {
squint_core.swap_BANG_(state, squint_core.assoc, "install", null);
return $("install").hidden = true;

}));
};

}));
window.addEventListener("appinstalled", (function () {
$("install").hidden = true;
return text_BANG_("pwa-status", "Solar Office is installed.");

}));
if (squint_core.truth_((() => {
let and__23694__auto__10 = navigator.serviceWorker;
if (squint_core.truth_(and__23694__auto__10)) {
return !(location.protocol === "file:")} else {
return and__23694__auto__10};

})())) {
navigator.serviceWorker.register("./sw.js").then((function () {
return navigator.serviceWorker.ready;

})).then((function () {
return text_BANG_("pwa-status", "Ready for offline use. Install from your browser’s menu when available.");

})).catch((function () {
return text_BANG_("pwa-status", "Offline storage is unavailable on this host or browser. On Neocities, use this edition with an internet connection.");

}))} else {
text_BANG_("pwa-status", "For installation and offline support, open this app on HTTPS or localhost.")};

export { display_BANG_, date_label, date_format, civil, text_BANG_, hours, request_location_BANG_, solar_time, draw_arc_BANG_, hour_row, tick_BANG_, breviary_link, pair, html_BANG_, state, render_current_BANG_, set_location_BANG_, $, civil_format }
