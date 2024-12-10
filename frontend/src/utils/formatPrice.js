export const formatPrice = (price) => {
    const formattedPrice = price.toLocaleString('vi-VN');
    return `${formattedPrice}.000 VNĐ`; 
  };
  