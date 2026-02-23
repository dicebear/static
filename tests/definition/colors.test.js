import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadSchema, createValidator } from "../helpers/validator.js";

const schema = loadSchema("definition.json");
const validate = createValidator(schema);

function withBody(extra) {
  return { body: { content: [], width: 100, height: 100 }, ...extra };
}

describe("definition.json colors", () => {
  describe("valid colors", () => {
    it("accepts empty colors object", () => {
      assert.equal(validate(withBody({ colors: {} })), true);
    });

    it("accepts color group with values", () => {
      const data = withBody({
        colors: { skin: { values: ["#ff0000", "#00ff00"] } },
      });
      assert.equal(validate(data), true);
    });

    it("rejects hex without #", () => {
      const data = withBody({
        colors: { skin: { values: ["ff0000"] } },
      });
      assert.equal(validate(data), false);
    });

    it("accepts hex with #", () => {
      const data = withBody({
        colors: { skin: { values: ["#ff0000"] } },
      });
      assert.equal(validate(data), true);
    });

    it("accepts notEqualTo with valid name pattern", () => {
      const data = withBody({
        colors: {
          skin: { values: ["#ff0000"], notEqualTo: ["hair"] },
        },
      });
      assert.equal(validate(data), true);
    });

    it("accepts contrastTo with valid name pattern", () => {
      const data = withBody({
        colors: {
          skin: { values: ["#ff0000"], contrastTo: "background" },
        },
      });
      assert.equal(validate(data), true);
    });
  });

  describe("invalid colors", () => {
    it("rejects missing values", () => {
      const data = withBody({
        colors: { skin: {} },
      });
      assert.equal(validate(data), false);
    });

    it("rejects invalid hex in values", () => {
      const data = withBody({
        colors: { skin: { values: ["#xyz123"] } },
      });
      assert.equal(validate(data), false);
    });

    it("rejects invalid name in notEqualTo (starts with uppercase)", () => {
      const data = withBody({
        colors: {
          skin: { values: ["#ff0000"], notEqualTo: ["Uppercase"] },
        },
      });
      assert.equal(validate(data), false);
    });
  });

  describe("additionalProperties", () => {
    it("rejects additional property in color group", () => {
      const data = withBody({
        colors: { skin: { values: ["#ff0000"], extra: "data" } },
      });
      assert.equal(validate(data), false);
    });
  });
});
