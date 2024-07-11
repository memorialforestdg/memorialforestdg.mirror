module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-html",
    "stylelint-config-rational-order",
  ],
  plugins: [
    "stylelint-high-performance-animation",
    "stylelint-no-unsupported-browser-features",
    "stylelint-selector-bem-pattern"
  ],
  rules: {
    // browserslist supported
    "media-feature-range-notation": null, // prevent @media (width <= 1280px)  as upported
    "plugin/no-unsupported-browser-features": [true, {
      ignore: ["rem", "css-nesting", "css-blank-pseudo", "css-prefers-color-scheme", "css-mediaqueries"],
      ignorePartialSupport: true,
    }],
    // animations
    "plugin/no-low-performance-animation-properties": [
      true,
      {
        ignoreProperties: ["color", "background-color", "box-shadow"]
      }
    ],
    // Rational order
    "order/properties-order": [],
    "plugin/rational-order": [
      true,
      {
        "border-in-box-model": false,
        "empty-line-between-groups": false,
      },
    ],
    // BEM
    "selector-class-pattern": null,
    "plugin/selector-bem-pattern": {
      "componentName": "[A-Z]+",
      "componentSelectors": {
        "initial": "^\\.{componentName}(?:-[a-z]+)?$",
        "combined": "^\\.combined-{componentName}-[a-z]+$"
      },
      "utilitySelectors": "^\\.util-[a-z]+$"
    },
  }
}
