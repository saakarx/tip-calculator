export const formatPrice = (
  locale: Intl.LocalesArgument = 'en-US',
  currency: string = 'USD'
) => {
  const formatPrice = Intl.NumberFormat(locale, {
    currency: currency,
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: 'symbol',
  });

  return (price: number) => formatPrice.format(price);
};
