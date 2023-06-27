import { describe, expect, it } from "vitest";

const NODE_NAME = "a-rive";

describe(NODE_NAME, () => {
  it("import element", async () => {
    const { AtriumRive } = await import("../dist/a-rive.mjs");
    expect(AtriumRive).toBeDefined();

    // is defined in custom element registry
    expect(customElements.get(NODE_NAME)).toBeDefined();

    // is constructable
    expect(new AtriumRive()).toBeInstanceOf(AtriumRive);

    const html = `<${NODE_NAME} />`;
    const ele = document.createElement("div");
    ele.innerHTML = html;

    expect(ele.children[0]).toBeInstanceOf(AtriumRive);
  });
});
