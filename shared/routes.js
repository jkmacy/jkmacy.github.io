import * as squint_core from './../vendor/squint-cljs/core.js';
var sections = ({"matins": "Matins", "lauds": "Lauds", "prime": "Hours", "terce": "Hours", "sext": "Hours", "none": "Hours", "vespers": "Vespers"});
var civil_date = function (t) {
const d_1 = (new Date(t));
const pad_2 = (function (_PERCENT_1) {
return `${_PERCENT_1??''}`.padStart(2, "0");

});
return `${d_1.getFullYear()??''}-${pad_2((d_1.getMonth() + 1))??''}-${pad_2(d_1.getDate())??''}`;

};
var ordo_href = function (t, id) {
const section_1 = squint_core.get(sections, id);
return `${"/ordo/daily.html#day/"}${civil_date(t)??''}${((squint_core.truth_(section_1)) ? (`${"/"}${section_1??''}`) : (""))??''}`;

};
var breviary_offices = ["lauds", "prime", "terce", "sext", "none", "vespers", "compline"];
var breviary_href = function (date, id) {
if (squint_core.truth_((() => {
const and__23694__auto___1 = breviary_offices.includes(id);
if (squint_core.truth_(and__23694__auto___1)) {
return (("string" === typeof date) && /^\d{4}-\d{2}-\d{2}$/.test(date))} else {
return and__23694__auto___1};

})())) {
const d_2 = (new Date(`${date??''}${"T12:00:00Z"}`));
if (squint_core.truth_((() => {
const and__23694__auto___3 = Number.isFinite(d_2.getTime());
if (squint_core.truth_(and__23694__auto___3)) {
return squint_core._EQ_(date, d_2.toISOString().slice(0, 10))} else {
return and__23694__auto___3};

})())) {
return `${"https://orthodoxwestbreviary.com/"}${id??''}${"/"}${date??''}`;
};
};

};
var office_breviary_href = function (t, id) {
return breviary_href(civil_date(t), id);

};

export { sections, civil_date, ordo_href, breviary_offices, breviary_href, office_breviary_href }
