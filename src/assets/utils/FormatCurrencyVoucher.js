export const formatCurrencyVoucher = (amount) => {
  if (amount < 1000) {
    return `${amount}`;
  } else if (amount < 1000000) {
    const thousands = Math.floor(amount / 1000);
    return `₫${thousands}K`;
  } else {
    const millions = Math.floor(amount / 1000000);
    return `₫${millions}M`;
  }
};
