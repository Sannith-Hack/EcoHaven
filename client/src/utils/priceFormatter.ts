// Utility function to format prices in Indian Rupees
export const formatPrice = (price: number): string => {
  // Convert USD to INR (approximate conversion rate)
  const inrPrice = price * 83;
  
  // Format in Indian number system with commas
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(inrPrice);
};

// Convert USD price to INR for calculations
export const convertToINR = (usdPrice: number): number => {
  return usdPrice * 83;
};