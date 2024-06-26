export const CalculateTotalValue = (total, shipFee, feeDiscount) => {
  let flag = feeDiscount - shipFee;
  if (flag < 0) {
    return total - feeDiscount;
  } else {
    return total - shipFee;
  }
};
