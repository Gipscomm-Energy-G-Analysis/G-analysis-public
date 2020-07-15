//
// DONT FORGET TO UNCOMMENT THE EXPORTS IN THE ORIGIN FILE !!

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
test("function isNumeric : Should return true if it's a number.", function (t) {

    t.comment("#");

    t.plan(8);

    t.true(fn.isNumeric("9"));
    t.true(fn.isNumeric("-123"));
    t.true(fn.isNumeric(7));
    t.true(fn.isNumeric(10e5));

    t.false(fn.isNumeric("wert"));
    t.false(fn.isNumeric("--"));
    t.false(fn.isNumeric("1asd4"));
    t.false(fn.isNumeric("mst_87898"));

    t.comment("#");
    t.comment("#");

    t.end();
});
test("function isUnit : Should return true if it's a unit.", function (t) {

    t.comment("#");

    t.plan(9);

    t.true(fn.isUnit("mst_123"));
    t.true(fn.isUnit("prd_34"));
    t.true(fn.isUnit("prd_456"));
    t.true(fn.isUnit("bPar_7"));

    t.false(fn.isUnit("wert"));
    t.false(fn.isUnit("--"));
    t.false(fn.isUnit("+"));
    t.false(fn.isUnit("("));
    t.false(fn.isUnit(122));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function isMessstelle : Should return true if the first part is the Messstellen identifier(mst).', function (t) {

    t.comment("#");

    t.plan(8);

    t.true(fn.isMessstelle("mst_123"));
    t.true(fn.isMessstelle("mst_1"));
    t.true(fn.isMessstelle("mst_33"));
    t.true(fn.isMessstelle("mst_65"));

    t.false(fn.isMessstelle("prd_34"));
    t.false(fn.isMessstelle("453"));
    t.false(fn.isMessstelle(""));
    t.false(fn.isMessstelle("bPar_7"));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function isOpeningParentheses : Should return true if it is an opening parentheses.', function (t) {

    t.comment("#");

    t.plan(8);

    t.true(fn.isOpeningParentheses("("));

    t.false(fn.isOpeningParentheses(")"));
    t.false(fn.isOpeningParentheses(453));
    t.false(fn.isOpeningParentheses("+"));
    t.false(fn.isOpeningParentheses("*"));
    t.false(fn.isOpeningParentheses("-"));
    t.false(fn.isOpeningParentheses("/"));
    t.false(fn.isOpeningParentheses("bPar_7"));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function isClosingParentheses : Should return true if it is a closing parentheses.', function (t) {

    t.comment("#");

    t.plan(8);

    t.true(fn.isClosingParentheses(")"));

    t.false(fn.isClosingParentheses("("));
    t.false(fn.isClosingParentheses(453));
    t.false(fn.isClosingParentheses("+"));
    t.false(fn.isClosingParentheses("-"));
    t.false(fn.isClosingParentheses("*"));
    t.false(fn.isClosingParentheses("/"));
    t.false(fn.isClosingParentheses("bPar_7"));

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
test('function validDropMessstelle : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(12);

    t.deepEqual(fn.validDropMessstelle("")("mst_37")("mst_109 - mst_120 /"), "REFERENCE");
    t.deepEqual(fn.validDropMessstelle("mst_37")("mst_37")("mst_109 - mst_120 / "), "SELF");
    t.deepEqual(fn.validDropMessstelle("mst_35")("mst_37")("mst_109 - mst_120 "), "ORDER");
    t.deepEqual(fn.validDropMessstelle("mst_35")("mst_37")("mst_109 - mst_120 /"), "VALID");

    t.deepEqual(fn.validDropMessstelle("")("mst_93")("mst_178 + mst_175 -"), "REFERENCE");
    t.deepEqual(fn.validDropMessstelle("mst_67")("mst_67")("mst_178 + mst_175 - mst_208 "), "SELF");
    t.deepEqual(fn.validDropMessstelle("mst_67")("mst_777")("mst_178 + mst_175 - mst_208 "), "ORDER");
    t.deepEqual(fn.validDropMessstelle("mst_38")("mst_93")("mst_178 + mst_175 -"), "VALID");

    t.notDeepEqual(fn.validDropMessstelle("mst_38")("mst_93")("mst_118 * mst_124"), "REFERENCE");
    t.notDeepEqual(fn.validDropMessstelle("mst_67")("mst_17")("mst_118 * mst_123 + mst_124 "), "SELF");
    t.notDeepEqual(fn.validDropMessstelle("mst_777")("mst_777")("mst_118 * mst_123 + mst_124 / "), "ORDER");
    t.notDeepEqual(fn.validDropMessstelle("mst_38")("mst_93")("mst_118 * mst_123 + mst_124"), "VALID");

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function afterElement : Should return VALID if the order of elements is valid otherwise ORDER.', function (t) {

    t.comment("#");

    t.plan(12);

    t.deepEqual(fn.afterElement("operator")("bdeProd_1-cycletime * bdeProd_1-istMenge / bdeProd_1-nester / bdeProd_1-Factor3600"), "ORDER");
    t.deepEqual(fn.afterElement("operator")("bdeProd_1-verbrauchSchuss / bdeProd_1-nester "), "ORDER");
    t.deepEqual(fn.afterElement("unit")("bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 - "), "ORDER");
    t.deepEqual(fn.afterElement("unit")("bdeProd_1-verbrauchAuftrag *"), "ORDER");

    t.deepEqual(fn.afterElement("unit")("bdeProd_1-cycletime * bdeProd_1-istMenge / 9"), "VALID");
    t.deepEqual(fn.afterElement("unit")("bdeProd_1-verbrauchSchuss "), "VALID");
    t.deepEqual(fn.afterElement("operator")("bdeProd_1-verbrauchSchuss / bdeProd_1-nester *"), "VALID");
    t.deepEqual(fn.afterElement("operator")("bdeProd_1-verbrauchAuftrag + "), "VALID");

    t.notDeepEqual(fn.afterElement("unit")("bdeProd_1-Factor60 * (bdeProd_1-Factor3600 + bdeProd_1-Factor3600) *"), "VALID");
    t.notDeepEqual(fn.afterElement("unit")("mst_118 * mst_123 + mst_124 /"), "VALID");
    t.notDeepEqual(fn.afterElement("operator")("mst_118 * mst_123 + mst_124 / "), "ORDER");
    t.notDeepEqual(fn.afterElement("operator")("mst_118 * mst_123 +"), "ORDER");

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validInputNumber : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(8);

    t.true(fn.validInputNumber("bdeProd_1-cycletime * bdeProd_1-istMenge / bdeProd_1-nester / bdeProd_1-Factor3600 -"));
    t.true(fn.validInputNumber("bdeProd_1-verbrauchSchuss / bdeProd_1-nester + 9"));
    t.true(fn.validInputNumber("bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 * "));
    t.true(fn.validInputNumber("bdeProd_1-verbrauchAuftrag * 77 "));

    t.false(fn.validInputNumber("bdeProd_1-cycletime * bdeProd_1-istMenge "));
    t.false(fn.validInputNumber("bdeProd_1-verbrauchSchuss "));
    t.false(fn.validInputNumber("bdeProd_1-verbrauchSchuss / bdeProd_1-nester"));
    t.false(fn.validInputNumber("bdeProd_1-verbrauchAuftrag"));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validInputOperator : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(8);

    t.true(fn.validInputOperator("bdeProd_1-cycletime * bdeProd_1-istMenge / bdeProd_1-nester / bdeProd_1-Factor3600 "));
    t.true(fn.validInputOperator("bdeProd_1-verbrauchSchuss / bdeProd_1-nester"));
    t.true(fn.validInputOperator("bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 "));
    t.true(fn.validInputOperator("bdeProd_1-verbrauchAuftrag * 77 "));

    t.false(fn.validInputOperator("bdeProd_1-cycletime * bdeProd_1-istMenge +"));
    t.false(fn.validInputOperator("bdeProd_1-verbrauchSchuss *"));
    t.false(fn.validInputOperator("bdeProd_1-verbrauchSchuss / bdeProd_1-nester / "));
    t.false(fn.validInputOperator("bdeProd_1-verbrauchAuftrag - "));

    t.comment("#");
    t.comment("#");

    t.end();
});
