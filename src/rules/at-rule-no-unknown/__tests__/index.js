import testRule from "stylelint-test-rule-tape"
import rule, { ruleName } from ".."

// Not testing for a correct message because it's not convenient to import
// stylelint's rules messages
testRule(rule, {
  ruleName,
  config: [true],
  syntax: "scss",

  accept: [ {
    code: "@function foo () {}",
  }, {
    code: "@Function foo () { @return 1; }",
  }, {
    code: "@extend %p",
  }, {
    code: "@While ($i == 1) {}",
  }, {
    code: "@if ($i) {}",
  }, {
    code: "@if ($i) {} @else {}",
  } ],
  
  reject: [{
    code: `
      @funciton floo ($n) {}
    `,
    line: 2,
    description: "",
  }],
})

testRule(rule, {
  ruleName,
  config: [ true, { ignoreAtRules: [ "unknown", "/^my-/" ] } ],
  skipBasicChecks: true,

  accept: [ {
    code: "@unknown { }",
  }, {
    code: "@Unknown { }",
  }, {
    code: "@uNkNoWn { }",
  }, {
    code: "@UNKNOWN { }",
  }, {
    code: "@my-at-rule { }",
  }, {
    code: "@MY-other-at-rule { }",
  } ],

  reject: [ {
    code: "@unknown-at-rule { }",
    line: 1,
    column: 1,
  }, {
    code: "@unknown { @unknown-at-rule { font-size: 14px; } }",
    line: 1,
    column: 12,
  }, {
    code: "@not-my-at-rule {}",
    line: 1,
    column: 1,
  } ],
})