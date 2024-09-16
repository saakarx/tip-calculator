import { describe, it, expect } from 'vitest';
import { calculateTip } from './calculate-tip';

const calculateTipResult = (tip: number, total: number) => ({
  tipPerPerson: tip,
  totalPerPerson: total,
});

describe('calculate tip', () => {
  it('per person', () => {
    expect(calculateTip(142.55, 15, 5)).toEqual(
      calculateTipResult(4.28, 32.79)
    );
  });

  it('no tip', () => {
    expect(calculateTip(142.55, 0, 0)).toEqual(calculateTipResult(0, 0));
  });

  it('no person', () => {
    expect(calculateTip(142.55, 15, 0)).toEqual({
      tipPerPerson: 0,
      totalPerPerson: 0,
    });
  });
});
