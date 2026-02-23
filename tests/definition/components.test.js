import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadSchema, createValidator } from "../helpers/validator.js";

const schema = loadSchema("definition.json");
const validate = createValidator(schema);

function withBody(extra) {
  return { body: { content: [], width: 100, height: 100 }, ...extra };
}

describe("definition.json components", () => {
  describe("valid components", () => {
    it("accepts empty components object", () => {
      assert.equal(validate(withBody({ components: {} })), true);
    });

    it("accepts minimal component with width/height/variants", () => {
      const data = withBody({
        components: {
          head: {
            width: 100,
            height: 100,
            variants: { round: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), true);
    });

    it("accepts component with optional probability/rotation/offset", () => {
      const data = withBody({
        components: {
          eyes: {
            width: 50,
            height: 30,
            probability: 80,
            rotation: [-10, 10],
            offset: { x: [-5, 5], y: [0, 10] },
            variants: { open: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), true);
    });

    it("accepts probability: 0 (boundary)", () => {
      const data = withBody({
        components: {
          nose: {
            width: 10,
            height: 10,
            probability: 0,
            variants: { small: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), true);
    });

    it("accepts probability: 100 (boundary)", () => {
      const data = withBody({
        components: {
          nose: {
            width: 10,
            height: 10,
            probability: 100,
            variants: { small: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), true);
    });
  });

  describe("invalid components", () => {
    it("rejects name starting with uppercase letter", () => {
      const data = withBody({
        components: {
          Head: {
            width: 100,
            height: 100,
            variants: { round: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), false);
    });

    it("rejects name starting with digit", () => {
      const data = withBody({
        components: {
          "1head": {
            width: 100,
            height: 100,
            variants: { round: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), false);
    });

    it("rejects empty-string name", () => {
      const data = withBody({
        components: {
          "": {
            width: 100,
            height: 100,
            variants: { round: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), false);
    });

    it("rejects missing required fields (width/height/variants)", () => {
      const data = withBody({
        components: { head: {} },
      });
      assert.equal(validate(data), false);
    });

    it("rejects probability > 100", () => {
      const data = withBody({
        components: {
          head: {
            width: 100,
            height: 100,
            probability: 101,
            variants: { round: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), false);
    });

    it("rejects probability < 0", () => {
      const data = withBody({
        components: {
          head: {
            width: 100,
            height: 100,
            probability: -1,
            variants: { round: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), false);
    });
  });

  describe("additionalProperties", () => {
    it("rejects additional property in component", () => {
      const data = withBody({
        components: {
          head: {
            width: 100,
            height: 100,
            variants: { round: { content: [] } },
            extra: "data",
          },
        },
      });
      assert.equal(validate(data), false);
    });

    it("rejects additional property in variant", () => {
      const data = withBody({
        components: {
          head: {
            width: 100,
            height: 100,
            variants: { round: { content: [], extra: "data" } },
          },
        },
      });
      assert.equal(validate(data), false);
    });

    it("rejects additional property in offset", () => {
      const data = withBody({
        components: {
          head: {
            width: 100,
            height: 100,
            offset: { x: [0], y: [0], z: [0] },
            variants: { round: { content: [] } },
          },
        },
      });
      assert.equal(validate(data), false);
    });
  });
});
