import * as squint_core from './../vendor/squint-cljs/core.js';
import * as routes from '../shared/routes.js?v=2026-10-10-breviary2';
var offices = ["Matins", "Lauds", "Mass", "Hours", "Vespers"];
var esc = function (s) {
return `${(((s == null)) ? ("") : (s))??''}`.replace((new RegExp(/[&<>\"']/, "g")), (function (c) {
return ({"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"})[c];

}));

};
var join = function (xs) {
return squint_core.vec(xs).join("");

};
var readable = function (d) {
return (new Date(`${d??''}${"T12:00:00"}`)).toLocaleDateString("en-US", ({"weekday": "long", "month": "long", "day": "numeric", "year": "numeric"}));

};
var day_link = function (date, label, office) {
return `${"<a href=\"#day/"}${date??''}${"/"}${office??''}${"\">"}${esc(label)??''}${"</a>"}`;

};
var page_link = function (p, refs) {
return `${"<a href=\"#page/"}${p??''}${"\">Ordo page "}${esc(squint_core.get(squint_core.nth(refs, (p - 1)), "printed"))??''}${"</a>"}`;

};
var page_view = function (p, refs) {
const r_1 = squint_core.nth(refs, (p - 1));
const prose_2 = (() => {
const or__23663__auto___3 = (p === 2);
if (or__23663__auto___3) {
return or__23663__auto___3} else {
const or__23663__auto___4 = (p === 7);
if (or__23663__auto___4) {
return or__23663__auto___4} else {
const or__23663__auto___5 = ((9 <= p) && (p <= 24));
if (squint_core.truth_(or__23663__auto___5)) {
return or__23663__auto___5} else {
return ((130 <= p) && (p <= 133))};
};
};

})();
const file_6 = `${"pages/p"}${`${p??''}`.padStart(3, "0")??''}${".jpg"}`;
const picture_7 = `${"<a class=\"page-image-link\" href=\""}${file_6}${"\" target=\"_blank\" rel=\"noopener\" aria-label=\"Enlarge Ordo page "}${esc(squint_core.get(r_1, "printed"))??''}${"\"><img class=\"page-image\" src=\""}${file_6}${"\" alt=\"Original Ordo page "}${esc(squint_core.get(r_1, "printed"))??''}${"\" loading=\"lazy\" width=\"864\" height=\"1296\"></a>"}`;
return `${"<section class=\"reference-page\"><h3>Ordo page "}${esc(squint_core.get(r_1, "printed"))??''}${"</h3>"}${((squint_core.truth_(prose_2)) ? (`${"<div class=\"reference-text\">"}${esc(squint_core.get(r_1, "text").replace((new RegExp(/-\n\s*(?=[a-z])/, "g")), "").replace((new RegExp(/([^\n])\n(?=[^\n])/, "g")), "$1 ").replace((new RegExp(/„/, "g")), "\n\n• "))??''}${"</div><details><summary>View original page</summary>"}${picture_7}${"</details>"}`) : (picture_7))??''}${"<details><summary>Extracted page text</summary><pre>"}${esc(squint_core.get(r_1, "text"))??''}${"</pre></details></section>"}`;

};
var commemoration_panel = function (d, office) {
const names_1 = (() => {
const or__23663__auto___2 = squint_core.get(squint_core.get(d, "commemorationNames"), office);
if (squint_core.truth_(or__23663__auto___2)) {
return or__23663__auto___2} else {
return []};

})();
if (squint_core.truth_(squint_core.seq(names_1))) {
return `${"<section class=\"note\" aria-label=\"Commemoration names\"><h3>Commemoration names</h3><ul>"}${join(squint_core.map((function (_PERCENT_1) {
return `${"<li><strong>"}${esc(_PERCENT_1)??''}${"</strong></li>"}`;

}), names_1))??''}${"</ul><p>Use the appropriate name where the antiphon or collect calls for it, following the wording of your service book.</p></section>"}`} else {
return ""};

};
var all_office = function (d, office) {
const raw_1 = squint_core.get((() => {
const or__23663__auto___2 = squint_core.get(d, "expandedOffices");
if (squint_core.truth_(or__23663__auto___2)) {
return or__23663__auto___2} else {
return squint_core.get(d, "offices")};

})(), office);
if (squint_core.truth_((() => {
const or__23663__auto___3 = (raw_1 == null);
if (or__23663__auto___3) {
return or__23663__auto___3} else {
return squint_core._EQ_(raw_1, "")};

})())) {
return "<p class=\"note\">This section is not separately labelled in the printed entry. Consult the original page below.</p>"} else {
return `${commemoration_panel(d, office)??''}${"<ul class=\"rubrics\">"}${join(squint_core.map((function (_PERCENT_1) {
return `${"<li>"}${esc(_PERCENT_1)??''}${"</li>"}`;

}), raw_1.replace((new RegExp(/\s+\/\/\s+/, "g")), " / Alternative: ").split(/\s+\/\s*/)))??''}${"</ul>"}`};

};
var season_refs = function (date, edition) {
const or__23663__auto___1 = squint_core.second(squint_core.first(squint_core.filter((function (_PERCENT_1) {
return (date < squint_core.first(_PERCENT_1));

}), squint_core.get(edition, "seasons"))));
if (squint_core.truth_(or__23663__auto___1)) {
return or__23663__auto___1} else {
return squint_core.get(edition, "default-season")};

};
var office_nav = function (d, office) {
return `${"<aside class=\"side\"><nav class=\"officenav\" aria-label=\"Office\">"}${join(squint_core.map((function (o) {
return `${"<a class=\""}${((squint_core._EQ_(o, office)) ? ("active") : (""))??''}${"\" "}${((squint_core._EQ_(o, office)) ? ("aria-current=\"page\"") : (""))??''}${" href=\"#day/"}${squint_core.get(d, "date")??''}${"/"}${o??''}${"\">"}${o??''}${"</a>"}`;

}), offices))??''}${"</nav><div class=\"smalllinks\"><a href=\"#ref/abbreviations\">Abbreviations & signs</a><a href=\"#ref/praying\">Order of Lauds & Vespers</a><a href=\"#ref/seasons\">Seasonal rubrics</a></div></aside>"}`;

};
var day_title = function (d) {
const headings_1 = (() => {
const or__23663__auto___2 = squint_core.get(d, "expandedHeading");
if (squint_core.truth_(or__23663__auto___2)) {
return or__23663__auto___2} else {
return squint_core.get(d, "heading")};

})();
const title_3 = squint_core.first(headings_1).split(" | ");
const filtered_4 = squint_core.filter((function (_PERCENT_1) {
return squint_core.not(["†", "‡"].includes(_PERCENT_1));

}), title_3);
const label_5 = squint_core.vec(filtered_4).slice(0, -1).join(" · ");
const label_6 = ((squint_core._EQ_(label_5, "")) ? (squint_core.first(title_3)) : (label_5));
const original_7 = squint_core.first(squint_core.get(d, "heading"));
return `${"<div class=\"day-title\"><div class=\"eyebrow\">"}${esc(readable(squint_core.get(d, "date")))??''}${"</div><h1>"}${esc(label_6.replace(/^[†‡]\s*/, "").replace(/^(?:L§?|§)\s+/, ""))??''}${"</h1><div>"}${(((squint_core.count(title_3) > 1)) ? (`${"<span class=\"badge\">"}${esc(squint_core.last(title_3))??''}${"</span>"}`) : (""))??''}${((squint_core.truth_(original_7.includes("†"))) ? ("<span class=\"badge\">Holy day of obligation</span>") : (""))??''}${((squint_core.truth_(original_7.includes("‡"))) ? ("<span class=\"badge\">Holy day of devotion</span>") : (""))??''}${((squint_core.truth_(/§/.test(original_7))) ? ("<span class=\"badge\">Fasting</span>") : (""))??''}${((squint_core.truth_(/(?:^|\s)L(?:§|\s)/.test(original_7))) ? ("<span class=\"badge\">Abstinence</span>") : (""))??''}${"</div>"}${join(squint_core.map_indexed((function (i, h) {
return `${"<div class=\"observance\">"}${((squint_core.truth_(squint_core.get(d, "struckHeadings").includes(squint_core.nth(squint_core.get(d, "heading"), (i + 1))))) ? (`${"<s>"}${esc(h)??''}${"</s> <small>(crossed out in the Ordo)</small>"}`) : (esc(h)))??''}${"</div>"}`;

}), squint_core.rest(headings_1)))??''}${((squint_core.truth_(squint_core.not_empty(squint_core.get(d, "sourceNote")))) ? (`${"<p class=\"note\">"}${esc(squint_core.get(d, "sourceNote"))??''}${"</p>"}`) : (""))??''}${"</div>"}`;

};
var preceding_sunday = function (days, idx) {
let s_1 = idx;
while(true){
if (squint_core.truth_(((s_1 > 0) && !((new Date(`${squint_core.get(squint_core.nth(days, s_1), "date")??''}${"T12:00:00"}`)).getDay() === 0)))) {
let G__2 = (s_1 - 1);
s_1 = G__2;
continue;
} else {
return s_1};
;break;
}
;

};
var breviary_panel = function (date, office) {
return `${"<section class=\"breviary-panel\" aria-label=\"Pray from the Breviary\"><h2>Pray from the Breviary</h2>"}${"<p>Full prayers at Orthodox West Breviary for "}${esc(readable(date))??''}${". Opens online in a new tab.</p><nav class=\"breviary-links\" aria-label=\"Breviary Offices\">"}${join(squint_core.map((function (id) {
const label_1 = `${id.slice(0, 1).toUpperCase()??''}${id.slice(1)??''}`;
const relevant_QMARK__2 = squint_core._EQ_(office, squint_core.get(routes.sections, id));
return `${"<a class=\""}${((relevant_QMARK__2) ? ("relevant") : (""))??''}${"\" href=\""}${routes.breviary_href(date, id)??''}${"\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Pray "}${label_1}${" for "}${date??''}${" (opens in a new tab)\">"}${label_1}${"</a>"}`;

}), routes.breviary_offices))??''}${"</nav><p class=\"muted\">Keep using the Diurnal and the Ordo instructions below to check any discrepancies. Vespers uses this civil evening’s date; the Breviary handles feast precedence. Matins and Mass are not included on that site.</p></section>"}`;

};
var day_view = function (days, refs, edition, idx, office) {
const d_1 = squint_core.nth(days, idx);
const prev_sunday_2 = preceding_sunday(days, idx);
return `${"<div class=\"toolbar\"><button id=\"previous\" "}${(((idx === 0)) ? ("disabled") : (""))??''}${" aria-label=\"Previous day\">‹</button><label><span class=\"muted\">Date </span><input id=\"date\" type=\"date\" min=\""}${squint_core.get(edition, "start")??''}${"\" max=\""}${squint_core.get(edition, "end")??''}${"\" value=\""}${squint_core.get(d_1, "date")??''}${"\"></label><button id=\"next\" "}${(((idx === (squint_core.count(days) - 1))) ? ("disabled") : (""))??''}${" aria-label=\"Next day\">›</button><button id=\"today\">Today</button></div>"}${day_title(d_1)??''}${breviary_panel(squint_core.get(d_1, "date"), office)??''}${"<div class=\"day-grid\">"}${office_nav(d_1, office)??''}${"<div><article class=\"office\"><div class=\"office-head\"><h2>"}${office??''}${"</h2><small>"}${(((office === "Matins")) ? ("References: Monastic Breviary Matins") : (((squint_core.truth_(["Lauds", "Hours", "Vespers"].includes(office))) ? ("References: Monastic Diurnal") : ((("else") ? ("Rites of Saint Gregory and Saint Tikhon") : (null))))))??''}${"</small></div>"}${(((office === "Vespers")) ? ("<p class=\"muted\">Vespers appointed for this civil evening; this may be First Vespers of tomorrow’s feast.</p>") : (""))??''}${(((office === "Hours")) ? ("<p class=\"muted\">The Ordo groups the little Hours in this entry.</p>") : (""))??''}${((squint_core.truth_((() => {
const and__23694__auto___3 = squint_core.not_empty(squint_core.get(d_1, "officeNote"));
if (squint_core.truth_(and__23694__auto___3)) {
return ["Matins", "Lauds"].includes(office)} else {
return and__23694__auto___3};

})())) ? (`${"<p class=\"note\">"}${esc(squint_core.get(d_1, "officeNote"))??''}${"</p>"}`) : (""))??''}${all_office(d_1, office)??''}${"<details><summary>Printed wording</summary><p class=\"raw\">"}${esc((() => {
const or__23663__auto___4 = squint_core.not_empty(squint_core.get(squint_core.get(d_1, "offices"), office));
if (squint_core.truth_(or__23663__auto___4)) {
return or__23663__auto___4} else {
return "See source page."};

})())??''}${"</p></details></article><div class=\"season-links\"><a href=\"#ref/abbreviations\">Original abbreviation key</a>"}${squint_core.mapv((function (_PERCENT_1) {
return page_link(_PERCENT_1, refs);

}), season_refs(squint_core.get(d_1, "date"), edition)).join(" · ")??''}${"</div><details><summary>All five sections for this day</summary>"}${join(squint_core.map((function (_PERCENT_1) {
return `${"<article class=\"office\"><h3>"}${_PERCENT_1??''}${"</h3>"}${all_office(d_1, _PERCENT_1)??''}${"</article>"}`;

}), offices))??''}${"</details>"}${((squint_core.truth_(squint_core.seq(squint_core.get(d_1, "additional")))) ? (`${"<details><summary>Additional rites & notes</summary>"}${join(squint_core.map((function (_PERCENT_1) {
return `${"<article class=\"office\"><h3>"}${esc(squint_core.get(_PERCENT_1, "title"))??''}${"</h3><p>"}${esc(squint_core.get(_PERCENT_1, "text"))??''}${"</p></article>"}`;

}), (() => {
const or__23663__auto___5 = squint_core.get(d_1, "expandedAdditional");
if (squint_core.truth_(or__23663__auto___5)) {
return or__23663__auto___5} else {
return squint_core.get(d_1, "additional")};

})()))??''}${"</details>"}`) : (""))??''}${"<div class=\"source\"><p><strong>Related days</strong> · "}${(((idx > 0)) ? (day_link(squint_core.get(squint_core.nth(days, (idx - 1)), "date"), "Previous day", office)) : (""))??''}${" · "}${(((idx < (squint_core.count(days) - 1))) ? (day_link(squint_core.get(squint_core.nth(days, (idx + 1)), "date"), "Following day", office)) : (""))??''}${((!squint_core._EQ_(prev_sunday_2, idx)) ? (`${" · "}${day_link(squint_core.get(squint_core.nth(days, prev_sunday_2), "date"), "Preceding Sunday", office)??''}`) : (""))??''}${"</p><p><small>Numbers in the instructions refer to the service books, not this Ordo. Asterisks and supplement references are preserved. Full prayer texts will be added when the service books are available.</small></p><details><summary>Original entry & weekly notes · "}${squint_core.mapv((function (_PERCENT_1) {
return `${"p. "}${squint_core.get(squint_core.nth(refs, (_PERCENT_1 - 1)), "printed")??''}`;

}), squint_core.get(d_1, "pages")).join(", ")??''}${"</summary>"}${join(squint_core.map((function (_PERCENT_1) {
return page_view(_PERCENT_1, refs);

}), squint_core.get(d_1, "pages")))??''}${"</details></div></div></div>"}`;

};
var calendar_shell = function (month, edition) {
return `${"<div class=\"eyebrow\">Browse the year</div><h1>Calendar · "}${squint_core.get(edition, "year")??''}${"</h1><div class=\"toolbar\"><label>Month <select id=\"month\">"}${join(squint_core.map((function (i) {
return `${"<option value=\""}${(i + 1)}${"\" "}${((((i + 1) === month)) ? ("selected") : (""))??''}${">"}${(new Date(squint_core.get(edition, "year"), i, 1)).toLocaleDateString("en-US", ({"month": "long"}))??''}${"</option>"}`;

}), squint_core.range(12)))??''}${"</select></label><label>Find <input id=\"find\" type=\"search\" placeholder=\"Feast or saint\" aria-label=\"Find feast or saint\"></label></div><ul class=\"month-list\" id=\"list\"></ul>"}`;

};
var calendar_list = function (days, edition, month, query, office, today) {
const matches_1 = squint_core.filter((function (d) {
const and__23694__auto___2 = squint_core.get(d, "date").startsWith(`${squint_core.get(edition, "year")??''}-`);
if (squint_core.truth_(and__23694__auto___2)) {
if (!squint_core._EQ_(query, "")) {
return (() => {
const or__23663__auto___3 = squint_core.get(d, "expandedHeading");
if (squint_core.truth_(or__23663__auto___3)) {
return or__23663__auto___3} else {
return squint_core.get(d, "heading")};

})().join(" ").toLowerCase().includes(query)} else {
return squint_core._EQ_(Number(squint_core.get(d, "date").slice(5, 7)), month)}} else {
return and__23694__auto___2};

}), days);
if (squint_core.truth_(squint_core.empty_QMARK_(matches_1))) {
return "<li>No matching observances.</li>"} else {
return join(squint_core.map((function (d) {
return `${"<li class=\""}${((squint_core._EQ_(squint_core.get(d, "date"), today)) ? ("today") : (""))??''}${"\"><a href=\"#day/"}${squint_core.get(d, "date")??''}${"/"}${office??''}${"\"><span><strong>"}${squint_core.get(d, "date").slice(8)??''}${"</strong><small>"}${(new Date(`${squint_core.get(d, "date")??''}${"T12:00:00"}`)).toLocaleDateString("en-US", ({"month": "long", "weekday": "long"}))??''}${"</small></span><span>"}${esc(squint_core.first((() => {
const or__23663__auto___4 = squint_core.get(d, "expandedHeading");
if (squint_core.truth_(or__23663__auto___4)) {
return or__23663__auto___4} else {
return squint_core.get(d, "heading")};

})()))??''}${(((squint_core.count(squint_core.get(d, "heading")) > 1)) ? (`${"<small>"}${esc(squint_core.vec(squint_core.rest((() => {
const or__23663__auto___5 = squint_core.get(d, "expandedHeading");
if (squint_core.truth_(or__23663__auto___5)) {
return or__23663__auto___5} else {
return squint_core.get(d, "heading")};

})())).join(" · "))??''}${"</small>"}`) : (""))??''}${"</span></a></li>"}`;

}), matches_1))};

};
var reference_view = function (refs, edition) {
return `${"<div class=\"eyebrow\">Companion to the daily Ordo</div><h1>Reference</h1>"}${join(squint_core.map((function (g) {
return `${"<section><h2>"}${squint_core.nth(g, 1)??''}${"</h2><p class=\"muted\">"}${squint_core.nth(g, 2)??''}${"</p><div class=\"cards\">"}${join(squint_core.map((function (p__4) {
const vec___1_4 = p__4;
const id_5 = squint_core.nth(vec___1_4, 0, null);
const title_6 = squint_core.nth(vec___1_4, 1, null);
const start_7 = squint_core.nth(vec___1_4, 2, null);
const end_8 = squint_core.nth(vec___1_4, 3, null);
return `${"<a class=\"card\" href=\"#ref/"}${id_5??''}${"\"><h3>"}${title_6??''}${"</h3><small>Ordo pages "}${squint_core.get(squint_core.nth(refs, (start_7 - 1)), "printed")??''}${((!squint_core._EQ_(start_7, end_8)) ? (`${"–"}${squint_core.get(squint_core.nth(refs, (end_8 - 1)), "printed")??''}`) : (""))??''}${"</small></a>"}`;

}), squint_core.nth(g, 3)))??''}${"</div></section><br>"}`;

}), squint_core.get(edition, "groups")))??''}`;

};
var chapter_view = function (id, refs, edition) {
const temp__23219__auto___1 = squint_core.first(squint_core.filter((function (_PERCENT_1) {
return squint_core._EQ_(squint_core.first(_PERCENT_1), id);

}), squint_core.mapcat((function (_PERCENT_1) {
return squint_core.nth(_PERCENT_1, 3);

}), squint_core.get(edition, "groups"))));
if (squint_core.truth_(temp__23219__auto___1)) {
const c_2 = temp__23219__auto___1;
const pages_3 = squint_core.range(squint_core.nth(c_2, 2), (squint_core.nth(c_2, 3) + 1));
return `${"<a class=\"toplink\" href=\"#reference\">‹ Reference</a><h1>"}${squint_core.nth(c_2, 1)??''}${"</h1>"}${(((id === "lectionary1945")) ? ("<p class=\"note\">The opening note of this edition identifies the 1945 table as provided for private devotion or lectio divina. Its printed table heading also says “For Parochial Use”; the source is preserved here without reconciling that inconsistency.</p>") : (""))??''}${(((id === "holyweek")) ? ("<p class=\"note\">This is the separately labelled post-schism 1955 Roman appendix. It is not substituted for the daily calendar’s Holy Week instructions.</p>") : (""))??''}${"<p class=\"muted\">Original pages preserve the tables and typography. Tap a page to enlarge it, or expand its text.</p><div class=\"toolbar\">"}${join(squint_core.map((function (_PERCENT_1) {
return `${"<a class=\"button\" href=\"#page/"}${_PERCENT_1??''}${"\">p. "}${squint_core.get(squint_core.nth(refs, (_PERCENT_1 - 1)), "printed")??''}${"</a>"}`;

}), pages_3))??''}${"</div>"}${join(squint_core.map((function (_PERCENT_1) {
return page_view(_PERCENT_1, refs);

}), pages_3))??''}`;
} else {
return reference_view(refs, edition)};

};
var single_page = function (p, refs, edition) {
if (squint_core.truth_((() => {
const and__23694__auto___1 = Number.isInteger(p);
if (squint_core.truth_(and__23694__auto___1)) {
return ((1 <= p) && (p <= squint_core.get(edition, "page-count")))} else {
return and__23694__auto___1};

})())) {
return `${"<a href=\"#reference\">‹ Reference</a><div class=\"toolbar\">"}${(((p > 1)) ? (`${"<a class=\"button\" href=\"#page/"}${(p - 1)}${"\">Previous page</a>"}`) : (""))??''}${(((p < squint_core.get(edition, "page-count"))) ? (`${"<a class=\"button\" href=\"#page/"}${(p + 1)}${"\">Next page</a>"}`) : (""))??''}${"</div>"}${page_view(p, refs)??''}`} else {
return "<h1>Page not found</h1>"};

};

export { commemoration_panel, day_title, page_link, reference_view, readable, all_office, breviary_panel, single_page, calendar_shell, day_link, preceding_sunday, page_view, chapter_view, join, day_view, calendar_list, office_nav, season_refs, esc, offices }
