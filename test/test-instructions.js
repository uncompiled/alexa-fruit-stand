import test from 'ava'
import instructions from '../src/instructions'

test('all custom slot types should have instructions', t => {
  for (const key in instructions.items) {
    if (key) {
      t.not(instructions.find(key), undefined, 'instructions are not undefined')
      t.not(instructions.find(key), null, 'instructions are not null')

      t.true(key.length >= 1, 'item name should be at least one character')
      t.is(key.length, key.trim().length, 'item name should not have leading or trailing whitespace')

      t.true(instructions.find(key).length > key.length, 'instructions should be long enough to be useful')
    } else {
      t.fail('item name should be at least one character')
    }
  }
})

test('singular and plural variants should be defined', t => {
  t.not(instructions.find('banana'), undefined, 'banana was not found in the instructions')
  t.not(instructions.find('bananas'), undefined, 'bananas were not found in the instructions')
})

test('blank requests should not throw an error', t => {
  t.is(instructions.find(null), false, 'null request does not throw an error')
  t.is(instructions.find(undefined), false, 'undefined request does not throw an error')
})
