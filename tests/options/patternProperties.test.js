import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadSchema, createValidator } from "../helpers/validator.js";

const schema = loadSchema("options.json");
const validate = createValidator(schema);

describe("options.json patternProperties", () => {
  describe("probability", () => {
    it("accepts valid probability value", () => {
      assert.equal(validate({ headProbability: 50 }), true);
    });

    it("accepts probability: 0", () => {
      assert.equal(validate({ headProbability: 0 }), true);
    });

    it("accepts probability: 100", () => {
      assert.equal(validate({ headProbability: 100 }), true);
    });

    it("rejects probability < 0", () => {
      assert.equal(validate({ headProbability: -1 }), false);
    });

    it("rejects probability > 100", () => {
      assert.equal(validate({ headProbability: 101 }), false);
    });
  });

  describe("variant", () => {
    it("accepts variant as string", () => {
      assert.equal(validate({ eyesVariant: "open" }), true);
    });

    it("accepts variant as array of strings", () => {
      assert.equal(validate({ eyesVariant: ["open", "closed"] }), true);
    });
  });

  describe("color", () => {
    it("accepts single hex color", () => {
      assert.equal(validate({ skinColor: "#ff0000" }), true);
    });

    it("accepts array of hex colors", () => {
      assert.equal(validate({ skinColor: ["#ff0000", "#00ff00"] }), true);
    });
  });

  describe("rotation", () => {
    it("accepts bare rotation", () => {
      assert.equal(validate({ rotation: 45 }), true);
    });

    it("accepts prefixed rotation (headRotation)", () => {
      assert.equal(validate({ headRotation: 90 }), true);
    });

    it("accepts rotation as array", () => {
      assert.equal(validate({ rotation: [-30, 30] }), true);
    });

    it("accepts boundary: -360", () => {
      assert.equal(validate({ rotation: -360 }), true);
    });

    it("accepts boundary: 360", () => {
      assert.equal(validate({ rotation: 360 }), true);
    });

    it("rejects rotation > 360", () => {
      assert.equal(validate({ rotation: 361 }), false);
    });

    it("rejects rotation < -360", () => {
      assert.equal(validate({ rotation: -361 }), false);
    });

    it("rejects rotation array with 3 items", () => {
      assert.equal(validate({ rotation: [-30, 0, 30] }), false);
    });

    it("accepts rotation array with 1 item", () => {
      assert.equal(validate({ rotation: [30] }), true);
    });

    it("rejects rotation array with out-of-range value", () => {
      assert.equal(validate({ rotation: [-361, 30] }), false);
    });
  });

  describe("verticalOffset", () => {
    it("accepts single value", () => {
      assert.equal(validate({ verticalOffset: 10 }), true);
    });

    it("accepts prefixed (headVerticalOffset)", () => {
      assert.equal(validate({ headVerticalOffset: -5 }), true);
    });

    it("accepts array form", () => {
      assert.equal(validate({ verticalOffset: [-10, 10] }), true);
    });

    it("rejects array with 3 items", () => {
      assert.equal(validate({ verticalOffset: [-10, 0, 10] }), false);
    });

    it("accepts array with 1 item", () => {
      assert.equal(validate({ verticalOffset: [10] }), true);
    });

    it("accepts boundary: -100", () => {
      assert.equal(validate({ verticalOffset: -100 }), true);
    });

    it("accepts boundary: 100", () => {
      assert.equal(validate({ verticalOffset: 100 }), true);
    });

    it("rejects value > 100", () => {
      assert.equal(validate({ verticalOffset: 101 }), false);
    });

    it("rejects value < -100", () => {
      assert.equal(validate({ verticalOffset: -101 }), false);
    });

    it("rejects array with out-of-range value", () => {
      assert.equal(validate({ verticalOffset: [-101, 10] }), false);
    });
  });

  describe("horizontalOffset", () => {
    it("accepts single value", () => {
      assert.equal(validate({ horizontalOffset: 10 }), true);
    });

    it("accepts prefixed (headHorizontalOffset)", () => {
      assert.equal(validate({ headHorizontalOffset: -5 }), true);
    });

    it("accepts array form", () => {
      assert.equal(validate({ horizontalOffset: [-10, 10] }), true);
    });

    it("rejects array with 3 items", () => {
      assert.equal(validate({ horizontalOffset: [-10, 0, 10] }), false);
    });

    it("accepts array with 1 item", () => {
      assert.equal(validate({ horizontalOffset: [10] }), true);
    });

    it("accepts boundary: -100", () => {
      assert.equal(validate({ horizontalOffset: -100 }), true);
    });

    it("accepts boundary: 100", () => {
      assert.equal(validate({ horizontalOffset: 100 }), true);
    });

    it("rejects value > 100", () => {
      assert.equal(validate({ horizontalOffset: 101 }), false);
    });

    it("rejects value < -100", () => {
      assert.equal(validate({ horizontalOffset: -101 }), false);
    });

    it("rejects array with out-of-range value", () => {
      assert.equal(validate({ horizontalOffset: [-101, 10] }), false);
    });
  });
});
