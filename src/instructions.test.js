const instructions = require("./instructions");

test("all custom slot types should have instructions", () => {
  for (const key in instructions.items) {
    if (key) {
      const instruction = instructions.find(key)
      expect(instruction).not.toBe(undefined);
      expect(instruction).not.toBe(null);
      expect(key.length >= 1).toBe(true);
      expect(key.length).toEqual(key.trim().length);
    }
  }
});

test("singular and plural variants should be defined", () => {
  expect(instructions.find("banana")).not.toBe(undefined)
  expect(instructions.find("bananas")).not.toBe(undefined)
});
