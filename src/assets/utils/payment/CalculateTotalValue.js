export const CalculateTotalValue = (total, shipFee, feeDiscount) => {
  console.log("total:", total);
  console.log("shipFee:", shipFee);
  console.log("feeDiscount:", feeDiscount);
  let flag = feeDiscount - shipFee;
  if (flag < 0) {
    return total - feeDiscount;
  } else {
    return total - shipFee;
  }
};
