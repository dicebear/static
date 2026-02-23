import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadSchema, createValidator } from "../helpers/validator.js";

const schema = loadSchema("definition.json");
const validate = createValidator(schema);

function withBody(extra) {
  return { body: { content: [], width: 100, height: 100 }, ...extra };
}

describe("definition.json meta", () => {
  describe("valid meta", () => {
    it("accepts empty meta", () => {
      assert.equal(validate(withBody({ meta: {} })), true);
    });

    it("accepts full meta with all sub-objects", () => {
      const data = withBody({
        meta: {
          license: {
            name: "MIT",
            url: "https://opensource.org/license/mit",
            text: "...",
          },
          creator: { name: "DiceBear", url: "https://dicebear.com" },
          source: { name: "MyProject", url: "https://example.com" },
        },
      });
      assert.equal(validate(data), true);
    });

    it("accepts partial meta", () => {
      const data = withBody({
        meta: { creator: { name: "Jane" } },
      });
      assert.equal(validate(data), true);
    });
  });

  describe("invalid meta", () => {
    it("rejects name as number", () => {
      const data = withBody({
        meta: { creator: { name: 123 } },
      });
      assert.equal(validate(data), false);
    });

    it("rejects meta as string", () => {
      const data = withBody({ meta: "invalid" });
      assert.equal(validate(data), false);
    });
  });

  describe("additionalProperties", () => {
    it("rejects additional property in meta", () => {
      const data = withBody({
        meta: { extra: "data" },
      });
      assert.equal(validate(data), false);
    });

    it("rejects additional property in license", () => {
      const data = withBody({
        meta: { license: { name: "MIT", extra: "data" } },
      });
      assert.equal(validate(data), false);
    });

    it("rejects additional property in creator", () => {
      const data = withBody({
        meta: { creator: { name: "John", extra: "data" } },
      });
      assert.equal(validate(data), false);
    });

    it("rejects additional property in source", () => {
      const data = withBody({
        meta: { source: { name: "Proj", extra: "data" } },
      });
      assert.equal(validate(data), false);
    });
  });

  describe("URL security", () => {
    it("accepts https URL", () => {
      const data = withBody({
        meta: { creator: { url: "https://example.com" } },
      });
      assert.equal(validate(data), true);
    });

    it("accepts http URL", () => {
      const data = withBody({
        meta: { creator: { url: "http://example.com" } },
      });
      assert.equal(validate(data), true);
    });

    it("rejects javascript URI in creator url", () => {
      const data = withBody({
        meta: { creator: { url: "javascript:alert(1)" } },
      });
      assert.equal(validate(data), false);
    });

    it("rejects javascript URI in license url", () => {
      const data = withBody({
        meta: { license: { url: "javascript:alert(1)" } },
      });
      assert.equal(validate(data), false);
    });

    it("rejects data URI in source url", () => {
      const data = withBody({
        meta: {
          source: { url: "data:text/html,<script>alert(1)</script>" },
        },
      });
      assert.equal(validate(data), false);
    });

    it("rejects file:// URI", () => {
      const data = withBody({
        meta: { creator: { url: "file:///etc/passwd" } },
      });
      assert.equal(validate(data), false);
    });

    it("rejects protocol-relative URL", () => {
      const data = withBody({
        meta: { creator: { url: "//evil.com/steal" } },
      });
      assert.equal(validate(data), false);
    });
  });
});
