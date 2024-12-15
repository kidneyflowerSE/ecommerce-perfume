export const formatPrice = (price) => {
  const formattedPrice = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return formattedPrice; // Trả về $160.00
};
