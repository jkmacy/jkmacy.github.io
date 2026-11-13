import * as squint_core from './../vendor/squint-cljs/core.js';
var fetch_json = function (url) {
return fetch(url).then((function (r) {
if (squint_core.truth_(r.ok)) {
return r.json()} else {
throw (new Error(`${"Could not load "}${url??''}`))};

}));

};
var load_edition = function () {
return fetch_json("edition.json").then((function (edition) {
return Promise.all([fetch_json(squint_core.get(edition, "days-file")), fetch_json(squint_core.get(edition, "references-file"))]).then((function (p__3) {
const vec___1_4 = p__3;
const daily_5 = squint_core.nth(vec___1_4, 0, null);
const refs_6 = squint_core.nth(vec___1_4, 1, null);
return ({"edition": edition, "days": squint_core.get(daily_5, "days"), "refs": refs_6});

}));

}));

};

export { fetch_json, load_edition }
