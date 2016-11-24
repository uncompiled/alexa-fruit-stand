import test from 'ava'
import instructions from '../src/instructions'

test('all custom slot types should have instructions', t => {
  for (var key in instructions) {
    if (key) {
      t.not(instructions[key], undefined, 'instructions are not undefined')
      t.not(instructions[key], null, 'instructions are not null')

      t.true(key.length >= 1, 'item name should be at least one character')
      t.is(key.length, key.trim().length, 'item name should not have leading or trailing whitespace')

      t.true(instructions[key].length > key.length, 'instructions should be long enough to be useful')
    } else {
      t.fail('item name should be at least one character')
    }
  }
})
