// DONT FORGET TO UNCOMMENT THE EXPORTS IN THE ORIGIN FILE

const test = require('tape');
require('../src/js/imports/jquery-3.1.1.min.js');
core = require('../src/js/fpCore.js');
fn = require('../src/js/functions.js');

test('function isOperator : Should return true if is one of(+-*/).', function (t) {

    t.comment("#");

    t.plan(10);

    t.true(fn.isOperator("+"));
    t.true(fn.isOperator("-"));
    t.true(fn.isOperator("*"));
    t.true(fn.isOperator("/"));
    t.true(fn.isOperator(""));

    t.false(fn.isOperator("wert"));
    t.false(fn.isOperator("--"));
    t.false(fn.isOperator("1"));
    t.false(fn.isOperator(87898));
    t.false(fn.isOperator([2,3,4]));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function typeElement : Should return the type(operator || unit) of an element.', function (t) {

    t.comment("#");

    t.plan(10);

    t.deepEqual(fn.typeElement("mst_37"), "unit");
    t.deepEqual(fn.typeElement("prd_456"), "unit");
    t.deepEqual(fn.typeElement("+"), "operator");
    t.deepEqual(fn.typeElement("-"), "operator");
    t.deepEqual(fn.typeElement("*"), "operator");
    t.deepEqual(fn.typeElement("/"), "operator");

    t.notDeepEqual(fn.typeElement("mst_109 "), "operator");
    t.notDeepEqual(fn.typeElement("prd_10 "), "operator");
    t.notDeepEqual(fn.typeElement("+"), "unit");
    t.notDeepEqual(fn.typeElement("-"), "unit");

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function isSelfReference : Should return true if args are equal.', function (t) {

    t.comment("#");

    t.plan(8);

    t.true(fn.isSelfReference("mst_26")("mst_26"));
    t.true(fn.isSelfReference("mst_130")("mst_130"));
    t.true(fn.isSelfReference("mst_600")("mst_600"));
    t.true(fn.isSelfReference("mst_1")("mst_1"));

    t.false(fn.isSelfReference("mst_16")("prd_67"));
    t.false(fn.isSelfReference("mst_111")("mst_11"));
    t.false(fn.isSelfReference("mst_345")("prd_345"));
    t.false(fn.isSelfReference("K")(87898));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function getLastElement : Should return the last element of a splitted(" ") string.', function (t) {

    t.comment("#");

    t.plan(11);

    t.deepEqual(fn.getLastElement("mst_37 * mst_26 + mst_103"), "mst_103");
    t.deepEqual(fn.getLastElement("mst_37 * mst_26 + "), "+");
    t.deepEqual(fn.getLastElement("mst_37 * mst_26 "), "mst_26");
    t.deepEqual(fn.getLastElement("mst_37 *"), "*");
    t.deepEqual(fn.getLastElement(""), "");

    t.notDeepEqual(fn.getLastElement("mst_109 - mst_120 / mst_116"), "/");
    t.notDeepEqual(fn.getLastElement("mst_109 - mst_120 / "), "mst_120");
    t.notDeepEqual(fn.getLastElement("mst_109 - mst_120 "), "-");
    t.notDeepEqual(fn.getLastElement("mst_109 "), " ");
    t.notDeepEqual(fn.getLastElement(""), "+");
    t.notDeepEqual(fn.getLastElement("+"), "");


    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validOrder : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(4);

    t.true(fn.validOrder("operator")("unit"));
    t.true(fn.validOrder("unit")("operator"));

    t.false(fn.validOrder("operator")("operator"));
    t.false(fn.validOrder("unit")("unit"));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validDrop : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(12);

    t.deepEqual(fn.validDrop("")("mst_37")("mst_109 - mst_120 /"), "REFERENCE");
    t.deepEqual(fn.validDrop("mst_37")("mst_37")("mst_109 - mst_120 / "), "SELF");
    t.deepEqual(fn.validDrop("mst_35")("mst_37")("mst_109 - mst_120 "), "ORDER");
    t.deepEqual(fn.validDrop("mst_35")("mst_37")("mst_109 - mst_120 /"), "VALID");

    t.deepEqual(fn.validDrop("")("mst_93")("mst_178 + mst_175 -"), "REFERENCE");
    t.deepEqual(fn.validDrop("mst_67")("mst_67")("mst_178 + mst_175 - mst_208 "), "SELF");
    t.deepEqual(fn.validDrop("mst_67")("mst_777")("mst_178 + mst_175 - mst_208 "), "ORDER");
    t.deepEqual(fn.validDrop("mst_38")("mst_93")("mst_178 + mst_175 -"), "VALID");

    t.notDeepEqual(fn.validDrop("mst_38")("mst_93")("mst_118 * mst_124"), "REFERENCE");
    t.notDeepEqual(fn.validDrop("mst_67")("mst_17")("mst_118 * mst_123 + mst_124 "), "SELF");
    t.notDeepEqual(fn.validDrop("mst_777")("mst_777")("mst_118 * mst_123 + mst_124 / "), "ORDER");
    t.notDeepEqual(fn.validDrop("mst_38")("mst_93")("mst_118 * mst_123 + mst_124"), "VALID");

    t.comment("#");
    t.comment("#");

    t.end();
});
