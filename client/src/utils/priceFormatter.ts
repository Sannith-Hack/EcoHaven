// Utility function to format prices in Indian Rupees
export const formatPrice = (price: number): string => {
  // Format in Indian number system with commas
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(price);
};