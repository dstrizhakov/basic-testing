// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

enum Case {
  Add = 'should add two numbers',
  Subtract = 'should subtract two numbers',
  Divide = 'should divide two numbers',
  Multiply = 'should multiply two numbers',
  Exponentiate = 'should exponentiate two numbers',
  InvalidAction = 'should return null for invalid action',
  InvalidArgs = 'should return null for invalid arguments',
}

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3, case: Case.Add },
  { a: 7, b: 3, action: Action.Subtract, expected: 4, case: Case.Subtract },
  { a: 3, b: 2, action: Action.Multiply, expected: 6, case: Case.Subtract },
  { a: 14, b: 2, action: Action.Divide, expected: 7, case: Case.Divide },
  {
    a: 2,
    b: 3,
    action: Action.Exponentiate,
    expected: 8,
    case: Case.Exponentiate,
  },
  { a: 3, b: 2, action: 'invalid', expected: null, case: Case.InvalidAction },
  {
    a: '3',
    b: '2',
    action: Action.Add,
    expected: null,
    case: Case.InvalidArgs,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$case', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expected ? expect(result).toBe(expected) : expect(result).toBeNull();
  });
});
