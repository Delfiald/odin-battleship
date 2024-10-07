import index from './index'

it("initial test", () => {
  expect(1 + 2).toBe(3)
})

it("test import", () => {
  expect(index()).toBe(true)
})
