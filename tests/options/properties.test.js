import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadSchema, createValidator } from "../helpers/validator.js";

const schema = loadSchema("options.json");
const validate = createValidator(schema);

describe("options.json named properties", () => {
  describe("valid properties", () => {
    it("accepts empty object", () => {
      assert.equal(validate({}), true);
    });

    it("accepts seed as string", () => {
      assert.equal(validate({ seed: "myAvatar" }), true);
    });

    it("accepts size as integer", () => {
      assert.equal(validate({ size: 128 }), true);
    });

    it("accepts idRandomization as boolean", () => {
      assert.equal(validate({ idRandomization: true }), true);
    });

    it("accepts flipDirection as string", () => {
      assert.equal(validate({ flipDirection: "horizontal" }), true);
    });

    it("accepts flipDirection as array", () => {
      assert.equal(
        validate({ flipDirection: ["horizontal", "vertical"] }),
        true,
      );
    });

    it("accepts scaleFactor as single value", () => {
      assert.equal(validate({ scaleFactor: 100 }), true);
    });

    it("accepts scaleFactor as [min, max] array", () => {
      assert.equal(validate({ scaleFactor: [80, 120] }), true);
    });

    it("accepts cornerRadius as single value", () => {
      assert.equal(validate({ cornerRadius: 10 }), true);
    });

    it("accepts cornerRadius as [min, max] array", () => {
      assert.equal(validate({ cornerRadius: [0, 50] }), true);
    });

    it("accepts boundary: size: 1", () => {
      assert.equal(validate({ size: 1 }), true);
    });

    it("accepts boundary: cornerRadius: 0", () => {
      assert.equal(validate({ cornerRadius: 0 }), true);
    });

    it("accepts boundary: cornerRadius: 50", () => {
      assert.equal(validate({ cornerRadius: 50 }), true);
    });
  });

  describe("invalid properties", () => {
    it("rejects size: 0", () => {
      assert.equal(validate({ size: 0 }), false);
    });

    it("rejects size: 1.5 (not integer)", () => {
      assert.equal(validate({ size: 1.5 }), false);
    });

    it("rejects seed as number", () => {
      assert.equal(validate({ seed: 123 }), false);
    });

    it("rejects invalid flipDirection enum", () => {
      assert.equal(validate({ flipDirection: "diagonal" }), false);
    });

    it("rejects cornerRadius > 50", () => {
      assert.equal(validate({ cornerRadius: 51 }), false);
    });

    it("rejects scaleFactor array with 3+ items", () => {
      assert.equal(validate({ scaleFactor: [80, 100, 120] }), false);
    });

    it("rejects scaleFactor array with 1 item", () => {
      assert.equal(validate({ scaleFactor: [80] }), false);
    });
  });
});
