import * as squint_core from './../vendor/squint-cljs/core.js';
import * as view from './views.js?v=2026-10-10-breviary2';
import * as content from './content.js';
import * as data from './data.js';
import * as routes from '../shared/routes.js?v=2026-10-10-breviary2';
var state = squint_core.atom(({"days": [], "refs": [], "edition": null, "selected": "", "office": "Matins", "install": null, "offline": "checking"}));
var $ = function (s) {
return document.querySelector(s);

};
var main_BANG_ = function (html) {
return $("#main").innerHTML = html;

};
var local_date = function () {
return routes.civil_date(Date.now());

};
var navigate_BANG_ = function (date) {
return location.hash = `${"day/"}${date??''}${"/"}${squint_core.get(squint_core.deref(state), "office")??''}`;

};
var render_day_BANG_ = function (parts) {
const map___1_3 = squint_core.deref(state);
const map___1_4 = ((squint_core.truth_(squint_core.sequential_QMARK_(map___1_3))) ? (((squint_core.truth_(squint_core.vector_QMARK_(map___1_3))) ? (map___1_3) : (squint_core.seq_to_map_for_destructuring(map___1_3)))) : (map___1_3));
const days_5 = squint_core.get(map___1_4, "days");
const refs_6 = squint_core.get(map___1_4, "refs");
const edition_7 = squint_core.get(map___1_4, "edition");
const selected_8 = squint_core.get(map___1_4, "selected");
const office_9 = squint_core.get(map___1_4, "office");
const date_10 = (() => {
const or__23663__auto___11 = squint_core.not_empty(squint_core.nth(parts, 1, null));
if (squint_core.truth_(or__23663__auto___11)) {
return or__23663__auto___11} else {
const or__23663__auto___12 = squint_core.not_empty(selected_8);
if (squint_core.truth_(or__23663__auto___12)) {
return or__23663__auto___12} else {
return local_date()};
};

})();
const office_13 = ((squint_core.truth_(view.offices.includes(squint_core.nth(parts, 2, null)))) ? (squint_core.nth(parts, 2)) : (office_9));
const idx_14 = days_5.findIndex((function (_PERCENT_1) {
return squint_core._EQ_(squint_core.get(_PERCENT_1, "date"), date_10);

}));
squint_core.swap_BANG_(state, squint_core.assoc, "selected", date_10, "office", office_13);
if ((idx_14 < 0)) {
return main_BANG_(`${"<h1>No entry for this date</h1><p>This edition covers "}${squint_core.get(edition_7, "range-label")??''}${".</p><a class=\"button\" href=\"#day/"}${squint_core.get(edition_7, "start")??''}${"\">Open "}${squint_core.get(edition_7, "year")??''}${"</a>"}`)} else {
main_BANG_(view.day_view(days_5, refs_6, edition_7, idx_14, office_13));
$("#date").onchange = (function (e) {
if (!squint_core._EQ_(e.target.value, "")) {
return navigate_BANG_(e.target.value);
};

});
$("#previous").onclick = (function () {
return navigate_BANG_(squint_core.get(squint_core.nth(days_5, (idx_14 - 1)), "date"));

});
$("#next").onclick = (function () {
return navigate_BANG_(squint_core.get(squint_core.nth(days_5, (idx_14 + 1)), "date"));

});
return $("#today").onclick = (function () {
return navigate_BANG_(local_date());

});
};

};
var calendar_BANG_ = function (parts) {
const map___1_3 = squint_core.deref(state);
const map___1_4 = ((squint_core.truth_(squint_core.sequential_QMARK_(map___1_3))) ? (((squint_core.truth_(squint_core.vector_QMARK_(map___1_3))) ? (map___1_3) : (squint_core.seq_to_map_for_destructuring(map___1_3)))) : (map___1_3));
const days_5 = squint_core.get(map___1_4, "days");
const edition_6 = squint_core.get(map___1_4, "edition");
const selected_7 = squint_core.get(map___1_4, "selected");
const office_8 = squint_core.get(map___1_4, "office");
const requested_9 = Number(squint_core.nth(parts, 1, null));
const month_10 = Math.min(12, Math.max(1, ((squint_core.truth_((() => {
const and__23694__auto___11 = Number.isFinite(requested_9);
if (squint_core.truth_(and__23694__auto___11)) {
return !(requested_9 === 0)} else {
return and__23694__auto___11};

})())) ? (requested_9) : (Number((() => {
const or__23663__auto___12 = squint_core.not_empty(selected_7);
if (squint_core.truth_(or__23663__auto___12)) {
return or__23663__auto___12} else {
return local_date()};

})().slice(5, 7))))));
const draw_13 = (function () {
return $("#list").innerHTML = view.calendar_list(days_5, edition_6, month_10, $("#find").value.trim().toLowerCase(), office_8, local_date());

});
main_BANG_(view.calendar_shell(month_10, edition_6));
draw_13();
$("#month").onchange = (function (e) {
return location.hash = `${"calendar/"}${e.target.value??''}`;

});
return $("#find").oninput = draw_13;

};
var save_page_BANG_ = function (cache, i) {
const url_1 = `${"pages/p"}${`${i??''}`.padStart(3, "0")??''}${".jpg"}`;
return cache.match(url_1).then((function (cached) {
if (squint_core.truth_(cached)) {
return null} else {
return fetch(url_1).then((function (r) {
if (squint_core.truth_(r.ok)) {
return cache.put(url_1, r)} else {
throw (new Error("A page could not be downloaded."))};

}));
};

}));

};
var save_all_pages_BANG_ = function () {
const button_1 = $("#download-pages");
const total_2 = squint_core.get(squint_core.get(squint_core.deref(state), "edition"), "page-count");
button_1.disabled = true;
return Promise.resolve().then((function () {
if (squint_core.truth_((() => {
const and__23694__auto___3 = navigator.serviceWorker;
if (squint_core.truth_(and__23694__auto___3)) {
return (squint_core.get(squint_core.deref(state), "offline") === "ready")} else {
return and__23694__auto___3};

})())) {
} else {
throw (new Error("Offline storage is unavailable here."))};
return caches.open("ordo-2026-pages-v1");

})).then((function (cache) {
return squint_core.reduce((function (promise, i) {
return promise.then((function () {
return save_page_BANG_(cache, i);

})).then((function () {
const temp__23298__auto___4 = $("#download-status");
if (squint_core.truth_(temp__23298__auto___4)) {
const status_5 = temp__23298__auto___4;
return status_5.textContent = `${"Saved "}${i??''}${" of "}${total_2??''}${" pages."}`;
};

}));

}), Promise.resolve(), squint_core.range(1, (total_2 + 1)));

})).then((function () {
const temp__23298__auto___6 = $("#download-status");
if (squint_core.truth_(temp__23298__auto___6)) {
const status_7 = temp__23298__auto___6;
return status_7.textContent = "All original pages are available offline on this device.";
};

})).catch((function (e) {
const temp__23298__auto___8 = $("#download-status");
if (squint_core.truth_(temp__23298__auto___8)) {
const status_9 = temp__23298__auto___8;
return status_9.textContent = `${e.message??''}${" Reconnect and try again; saved pages are retained."}`;
};

})).finally((function () {
return button_1.disabled = false;

}));

};
var about_BANG_ = function () {
const map___1_3 = squint_core.deref(state);
const map___1_4 = ((squint_core.truth_(squint_core.sequential_QMARK_(map___1_3))) ? (((squint_core.truth_(squint_core.vector_QMARK_(map___1_3))) ? (map___1_3) : (squint_core.seq_to_map_for_destructuring(map___1_3)))) : (map___1_3));
const install_5 = squint_core.get(map___1_4, "install");
const offline_6 = squint_core.get(map___1_4, "offline");
main_BANG_(`${content.about_intro??''}${"<p><button id=\"install\" hidden>Install Ordo</button> <button id=\"download-pages\" "}${((!(offline_6 === "ready")) ? ("disabled") : (""))??''}${">Save all original pages offline</button></p><p id=\"download-status\" role=\"status\">"}${(() => {
const G__1_7 = offline_6;
switch (G__1_7) {case "ready":
return "Daily instructions and text references are ready offline.";

break;
case "unavailable":
return "Offline storage is unavailable here. On Neocities, the site security policy blocks the service worker needed for offline reading. Please use this edition with an internet connection.";

break;
default:
return "Checking offline availability…"};

})()??''}${"</p><p><a href=\"#reference\">Open reference pages</a></p></div>"}`);
if (squint_core.truth_(install_5)) {
$("#install").hidden = false;
$("#install").onclick = (function () {
return install_5.prompt().then((function () {
squint_core.swap_BANG_(state, squint_core.assoc, "install", null);
const temp__23298__auto___9 = $("#install");
if (squint_core.truth_(temp__23298__auto___9)) {
const button_10 = temp__23298__auto___9;
return button_10.hidden = true;
};

}));

})};
return $("#download-pages").onclick = save_all_pages_BANG_;

};
var render_BANG_ = function () {
const parts_3 = location.hash.slice(1).split("/");
const route_4 = (() => {
const or__23663__auto___5 = squint_core.not_empty(squint_core.first(parts_3));
if (squint_core.truth_(or__23663__auto___5)) {
return or__23663__auto___5} else {
return "day"};

})();
const map___1_6 = squint_core.deref(state);
const map___1_7 = ((squint_core.truth_(squint_core.sequential_QMARK_(map___1_6))) ? (((squint_core.truth_(squint_core.vector_QMARK_(map___1_6))) ? (map___1_6) : (squint_core.seq_to_map_for_destructuring(map___1_6)))) : (map___1_6));
const refs_8 = squint_core.get(map___1_7, "refs");
const edition_9 = squint_core.get(map___1_7, "edition");
document.querySelectorAll("[data-nav]").forEach((function (a) {
if (squint_core._EQ_(a.dataset.nav, ((squint_core.truth_(["ref", "page"].includes(route_4))) ? ("reference") : (route_4)))) {
return a.setAttribute("aria-current", "page")} else {
return a.removeAttribute("aria-current")};

}));
const G__2_10 = route_4;
switch (G__2_10) {case "day":
render_day_BANG_(parts_3);

break;
case "calendar":
calendar_BANG_(parts_3);

break;
case "reference":
main_BANG_(view.reference_view(refs_8, edition_9));

break;
case "ref":
main_BANG_(view.chapter_view(squint_core.nth(parts_3, 1, null), refs_8, edition_9));

break;
case "page":
main_BANG_(view.single_page(Number(squint_core.nth(parts_3, 1, null)), refs_8, edition_9));

break;
default:
about_BANG_()};
document.title = `${(((route_4 === "day")) ? (`${squint_core.get(squint_core.deref(state), "office")??''}${" · "}${view.readable(squint_core.get(squint_core.deref(state), "selected"))??''}`) : ("Reference"))??''}${" · Ordo "}${squint_core.get(edition_9, "year")??''}`;
return window.scrollTo(0, 0);

};
var offline_status_BANG_ = function (ready) {
squint_core.swap_BANG_(state, squint_core.assoc, "offline", ((squint_core.truth_(ready)) ? ("ready") : ("unavailable")));
$("#offline").textContent = ((squint_core.truth_(ready)) ? ("Daily Ordo ready offline") : ("Online edition · internet connection required"));
if ((location.hash === "#about")) {
return about_BANG_();
};

};
window.addEventListener("beforeinstallprompt", (function (e) {
e.preventDefault();
return squint_core.swap_BANG_(state, squint_core.assoc, "install", e);

}));
data.load_edition().then((function (loaded) {
squint_core.swap_BANG_(state, squint_core.merge, loaded);
render_BANG_();
return window.addEventListener("hashchange", render_BANG_);

})).catch((function (error) {
console.error(error);
return main_BANG_("<h1>The Ordo could not load</h1><p>Reconnect to the internet and reload this page.</p>");

}));
if (squint_core.truth_(navigator.serviceWorker)) {
navigator.serviceWorker.register("sw.js", ({"scope": "./"})).then((function () {
return Promise.race([navigator.serviceWorker.ready, (new Promise((function (_, reject) {
return setTimeout((function () {
return reject((new Error("Offline installation timed out")));

}), 20000);

})))]);

})).then((function () {
return offline_status_BANG_(true);

})).catch((function () {
return offline_status_BANG_(false);

}))} else {
offline_status_BANG_(false)};

export { render_day_BANG_, about_BANG_, main_BANG_, save_all_pages_BANG_, local_date, calendar_BANG_, save_page_BANG_, render_BANG_, state, navigate_BANG_, $, offline_status_BANG_ }
