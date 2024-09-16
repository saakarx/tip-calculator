export const calculateTip = (
  totalBill: number,
  tipPrct: number,
  numberOfPeople: number
): {
  tipPerPerson: number;
  totalPerPerson: number;
} => {
  const result = {
    tipPerPerson: 0,
    totalPerPerson: 0,
  };

  const anyError = [
    isNaN(totalBill),
    isNaN(tipPrct),
    isNaN(numberOfPeople),
    totalBill === 0,
    tipPrct === 0,
    numberOfPeople === 0,
  ].some(Boolean);

  if (anyError) return result;

  const tipPerPerson = ((totalBill / numberOfPeople) * tipPrct) / 100;
  const totalPerPerson = totalBill / numberOfPeople + tipPerPerson;

  result.tipPerPerson = Number(tipPerPerson.toFixed(2) || 0);
  result.totalPerPerson = Number(totalPerPerson.toFixed(2) || 0);

  return result;
};
