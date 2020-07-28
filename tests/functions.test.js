//
// DONT FORGET TO UNCOMMENT THE EXPORTS IN THE ORIGIN FILE !!

const test = require('tape');
require('../src/js/imports/jquery-3.1.1.min.js');
core = require('../src/js/fpCore.js');
fn = require('../src/js/functions.js');

test('function isEmpty : Should return true if is is an empty string.', function (t) {

    t.comment("#");

    t.plan(6);

    t.true(fn.isEmpty(""));

    t.false(fn.isEmpty("wert"));
    t.false(fn.isEmpty("--"));
    t.false(fn.isEmpty("1"));
    t.false(fn.isEmpty(87898));
    t.false(fn.isEmpty([2,3,4]));

    t.comment("#");
    t.comment("#");

    t.end();
});
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
test('function moreOpeningThanClosingParentheses : Should return true if there are more opening- than closing parentheses.', function (t) {

    t.comment("#");

    t.plan(8);

    t.true(fn.moreOpeningThanClosingParentheses("( bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 * "));
    t.true(fn.moreOpeningThanClosingParentheses("bdeProd_1-verbrauchSchuss / ( ( bdeProd_1-nester * ePrd_2 " ));
    t.true(fn.moreOpeningThanClosingParentheses("mst_37 * mst_26 + ("));
    t.true(fn.moreOpeningThanClosingParentheses("mst_1 - ( mst_1 / 33 + ( ("));

    t.false(fn.moreOpeningThanClosingParentheses("mst_109 - mst_120 / mst_116"));
    t.false(fn.moreOpeningThanClosingParentheses("( mst_109 - mst_120 ) / mst_116"));
    t.false(fn.moreOpeningThanClosingParentheses("( bdeProd_1-verbrauchSchuss / ( bdeProd_1-nester * ePrd_2 ) ) "));
    t.false(fn.moreOpeningThanClosingParentheses("bdeProd_1-verbrauchAuftrag * 77 "));

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

    t.plan(14);

    t.deepEqual(fn.getLastElement("mst_37 * mst_26 + mst_103"), "mst_103");
    t.deepEqual(fn.getLastElement("mst_37 * mst_26 + "), "+");
    t.deepEqual(fn.getLastElement("mst_37 * mst_26 + ("), "(");
    t.deepEqual(fn.getLastElement("mst_37 * mst_26 "), "mst_26");
    t.deepEqual(fn.getLastElement("( mst_37 * mst_26 )"), ")");
    t.deepEqual(fn.getLastElement("mst_37 *"), "*");
    t.deepEqual(fn.getLastElement(""), "");

    t.notDeepEqual(fn.getLastElement("mst_109 - mst_120 / mst_116"), "/");
    t.notDeepEqual(fn.getLastElement("mst_109 - mst_120 / "), "mst_120");
    t.notDeepEqual(fn.getLastElement("mst_109 - mst_120 "), "-");
    t.notDeepEqual(fn.getLastElement("mst_109 - mst_120 * ( ("), "mst_109");
    t.notDeepEqual(fn.getLastElement("mst_109 "), " ");
    t.notDeepEqual(fn.getLastElement(""), "+");
    t.notDeepEqual(fn.getLastElement("+"), "");


    t.comment("#");
    t.comment("#");

    t.end();
});
test('function allParenthesesClosed : Should return true if all opening parentheses are closed.', function (t) {

    t.comment("#");

    t.plan(8);

    t.true(fn.allParenthesesClosed("mst_37 * mst_26 + mst_103"));
    t.true(fn.allParenthesesClosed("( mst_109 - mst_120 ) / mst_116"));
    t.true(fn.allParenthesesClosed("( ( bdeProd_1-cycletime * bdeProd_1-istMenge ) / bdeProd_1-nester ) / bdeProd_1-Factor3600"));
    t.true(fn.allParenthesesClosed("( bdeProd_1-cycletime * bdeProd_1-istMenge / ( bdeProd_1-nester / bdeProd_1-Factor3600 ) ) "));

    t.false(fn.allParenthesesClosed("( mst_37 * mst_26 + mst_103"));
    t.false(fn.allParenthesesClosed("( ( mst_109 - mst_120 ) / mst_116"));
    t.false(fn.allParenthesesClosed("( ( bdeProd_1-cycletime * ( bdeProd_1-istMenge ) / bdeProd_1-nester ) / bdeProd_1-Factor3600"));
    t.false(fn.allParenthesesClosed("( bdeProd_1-cycletime * ( ( bdeProd_1-istMenge / ( bdeProd_1-nester ) / bdeProd_1-Factor3600 ) ) "));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validDropMessstelle : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(15);

    t.deepEqual(fn.validDropMessstelle("")("mst_37")("mst_109 - mst_120 /"), "REFERENCE");
    t.deepEqual(fn.validDropMessstelle("mst_37")("mst_37")("mst_109 - mst_120 / "), "SELF");
    t.deepEqual(fn.validDropMessstelle("mst_35")("mst_37")("mst_109 - mst_120 "), "ORDER");
    t.deepEqual(fn.validDropMessstelle("mst_35")("mst_37")("( mst_109 - mst_120 )"), "ORDER");
    t.deepEqual(fn.validDropMessstelle("mst_35")("mst_37")("mst_109 - mst_120 /"), "VALID");

    t.deepEqual(fn.validDropMessstelle("")("mst_93")("mst_178 + mst_175 -"), "REFERENCE");
    t.deepEqual(fn.validDropMessstelle("mst_67")("mst_67")("mst_178 + mst_175 - mst_208 "), "SELF");
    t.deepEqual(fn.validDropMessstelle("mst_67")("mst_777")("mst_178 + mst_175 - mst_208 "), "ORDER");
    t.deepEqual(fn.validDropMessstelle("mst_67")("mst_777")("mst_178 + mst_175 - mst_208 + ("), "VALID");
    t.deepEqual(fn.validDropMessstelle("mst_38")("mst_93")("mst_178 + mst_175 -"), "VALID");

    t.notDeepEqual(fn.validDropMessstelle("mst_38")("mst_93")("mst_118 * mst_124"), "REFERENCE");
    t.notDeepEqual(fn.validDropMessstelle("mst_67")("mst_17")("mst_118 * mst_123 + mst_124 "), "SELF");
    t.notDeepEqual(fn.validDropMessstelle("mst_777")("mst_777")("mst_118 * mst_123 + mst_124 / "), "ORDER");
    t.notDeepEqual(fn.validDropMessstelle("mst_777")("mst_777")("mst_118 * mst_123 + mst_124 ) "), "ORDER");
    t.notDeepEqual(fn.validDropMessstelle("mst_38")("mst_93")("mst_118 * mst_123 + mst_124"), "VALID");

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validDropUnit : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(10);

    t.true(fn.validDropUnit("bdeProd_1-cycletime * bdeProd_1-istMenge / bdeProd_1-nester / bdeProd_1-Factor3600 -"));
    t.true(fn.validDropUnit("bdeProd_1-verbrauchSchuss / bdeProd_1-nester +"));
    t.true(fn.validDropUnit("bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 * "));
    t.true(fn.validDropUnit("bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 * ("));
    t.true(fn.validDropUnit("bdeProd_1-verbrauchAuftrag * 77 /"));
    t.true(fn.validDropUnit("bdeProd_1-verbrauchAuftrag * 77 + ( ("));

    t.false(fn.validDropUnit("bdeProd_1-cycletime * bdeProd_1-istMenge "));
    t.false(fn.validDropUnit("( bdeProd_1-verbrauchSchuss ) "));
    t.false(fn.validDropUnit("bdeProd_1-verbrauchSchuss / bdeProd_1-nester"));
    t.false(fn.validDropUnit("bdeProd_1-verbrauchAuftrag"));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validInputNumber : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(10);

    t.true(fn.validInputNumber("bdeProd_1-cycletime * bdeProd_1-istMenge / bdeProd_1-nester / bdeProd_1-Factor3600 -"));
    t.true(fn.validInputNumber("bdeProd_1-verbrauchSchuss / bdeProd_1-nester + 9"));
    t.true(fn.validInputNumber("bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 * "));
    t.true(fn.validInputNumber("bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 * ("));
    t.true(fn.validInputNumber("bdeProd_1-verbrauchAuftrag * 77 "));
    t.true(fn.validInputNumber("bdeProd_1-verbrauchAuftrag * 77 + ( ("));

    t.false(fn.validInputNumber("bdeProd_1-cycletime * bdeProd_1-istMenge "));
    t.false(fn.validInputNumber("( bdeProd_1-verbrauchSchuss ) "));
    t.false(fn.validInputNumber("bdeProd_1-verbrauchSchuss / bdeProd_1-nester"));
    t.false(fn.validInputNumber("bdeProd_1-verbrauchAuftrag"));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validInputOperator : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(10);

    t.true(fn.validInputOperator("bdeProd_1-cycletime * bdeProd_1-istMenge / bdeProd_1-nester / bdeProd_1-Factor3600 "));
    t.true(fn.validInputOperator("bdeProd_1-verbrauchSchuss / bdeProd_1-nester"));
    t.true(fn.validInputOperator("bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 "));
    t.true(fn.validInputOperator("bdeProd_1-verbrauchSchuss / ( bdeProd_1-nester * ePrd_2 ) "));
    t.true(fn.validInputOperator("bdeProd_1-verbrauchAuftrag * 77 "));

    t.false(fn.validInputOperator("bdeProd_1-cycletime * bdeProd_1-istMenge +"));
    t.false(fn.validInputOperator("bdeProd_1-cycletime * bdeProd_1-istMenge + ("));
    t.false(fn.validInputOperator("bdeProd_1-verbrauchSchuss *"));
    t.false(fn.validInputOperator("bdeProd_1-verbrauchSchuss / bdeProd_1-nester / "));
    t.false(fn.validInputOperator("bdeProd_1-verbrauchAuftrag - "));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validInputOpeningParentheses : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(11);

    t.true(fn.validInputOpeningParentheses("bdeProd_1-cycletime * bdeProd_1-istMenge / bdeProd_1-nester / bdeProd_1-Factor3600 +"));
    t.true(fn.validInputOpeningParentheses("bdeProd_1-verbrauchSchuss / bdeProd_1-nester / ("));
    t.true(fn.validInputOpeningParentheses("bdeProd_1-verbrauchSchuss / ( bdeProd_1-nester * ePrd_2 - "));
    t.true(fn.validInputOpeningParentheses("bdeProd_1-verbrauchSchuss / "));
    t.true(fn.validInputOpeningParentheses("bdeProd_1-verbrauchAuftrag * 77 * ( ( ( "));
    t.true(fn.validInputOpeningParentheses(""));

    t.false(fn.validInputOpeningParentheses("bdeProd_1-cycletime * bdeProd_1-istMenge "));
    t.false(fn.validInputOpeningParentheses("( bdeProd_1-cycletime * bdeProd_1-istMenge )"));
    t.false(fn.validInputOpeningParentheses("bdeProd_1-verbrauchSchuss"));
    t.false(fn.validInputOpeningParentheses("bdeProd_1-verbrauchSchuss / bdeProd_1-nester "));
    t.false(fn.validInputOpeningParentheses("( bdeProd_1-verbrauchAuftrag )"));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function validInputClosingParentheses : Should return true if the order of elements is valid.', function (t) {

    t.comment("#");

    t.plan(10);

    t.true(fn.validInputClosingParentheses("bdeProd_1-cycletime * ( bdeProd_1-istMenge / bdeProd_1-nester / bdeProd_1-Factor3600 "));
    t.true(fn.validInputClosingParentheses("( ( bdeProd_1-verbrauchSchuss / bdeProd_1-nester )"));
    t.true(fn.validInputClosingParentheses("bdeProd_1-verbrauchSchuss / ( bdeProd_1-nester * ePrd_2 - 66"));
    t.true(fn.validInputClosingParentheses(" ( ( ( bdeProd_1-verbrauchSchuss / 3 "));
    t.true(fn.validInputClosingParentheses("bdeProd_1-verbrauchAuftrag * 77 * ( ( (  + mst_33"));

    t.false(fn.validInputClosingParentheses(" ( bdeProd_1-cycletime * bdeProd_1-istMenge )"));
    t.false(fn.validInputClosingParentheses("( ( bdeProd_1-cycletime * bdeProd_1-istMenge ) )"));
    t.false(fn.validInputClosingParentheses("( ( ( bdeProd_1-verbrauchSchuss ) ) )"));
    t.false(fn.validInputClosingParentheses("bdeProd_1-verbrauchSchuss / ( bdeProd_1-nester )"));
    t.false(fn.validInputClosingParentheses("bdeProd_1-verbrauchAuftrag "));

    t.comment("#");
    t.comment("#");

    t.end();
});
test('function readyToSave : Should return true if the formula is valid.', function (t) {

    t.comment("#");

    t.plan(10);

    t.true(fn.readyToSave("bdeProd_1-cycletime * bdeProd_1-istMenge / bdeProd_1-nester / bdeProd_1-Factor3600 "));
    t.true(fn.readyToSave("( bdeProd_1-verbrauchSchuss / bdeProd_1-nester ) * 456"));
    t.true(fn.readyToSave("bdeProd_1-verbrauchSchuss / bdeProd_1-nester * ePrd_2 - 66"));
    t.true(fn.readyToSave(" ( ( ( bdeProd_1-verbrauchSchuss / 3 ) ) ) "));
    t.true(fn.readyToSave("( ( ( bdeProd_1-verbrauchAuftrag * 77 ) * mst_33 ) )"));

    t.false(fn.readyToSave(" ( bdeProd_1-cycletime * bdeProd_1-istMenge "));
    t.false(fn.readyToSave("bdeProd_1-cycletime * bdeProd_1-istMenge + "));
    t.false(fn.readyToSave("( ( ( bdeProd_1-verbrauchSchuss ) )"));
    t.false(fn.readyToSave("( bdeProd_1-verbrauchSchuss / ( bdeProd_1-nester )"));
    t.false(fn.readyToSave("bdeProd_1-verbrauchAuftrag - "));

    t.comment("#");
    t.comment("#");

    t.end();
});
