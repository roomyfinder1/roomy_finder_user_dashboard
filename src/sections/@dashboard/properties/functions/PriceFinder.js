export const priceFinder = (unit) => {
  let price = 0;
  if (unit.rentType === 'Daily') price = unit.dailyPrice;
  if (unit.rentType === 'Weekly') price = unit.weeklyPrice;
  else price = unit.monthlyPrice;

  return price;
};
