export const maskToPrice = (number, currencySymbol) => {
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "KZT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const maskedPrice = formatter
    .format(number)
    .replace("KZT", currencySymbol || "₸");

  return maskedPrice;
};
