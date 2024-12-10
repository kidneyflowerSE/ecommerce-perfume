package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Shipping;
import ecommerce.Perfume.repository.ShippingRepository;
import ecommerce.Perfume.model.Order;
import ecommerce.Perfume.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class ShippingService {

    @Autowired
    private ShippingRepository shippingRepository;

    @Autowired
    private OrderRepository orderRepository;

    // Tạo thông tin giao hàng cho đơn hàng
    public Shipping createShippingForOrder(Integer orderId, String shippingMethod, String shippingAddress) {
        // Kiểm tra xem đơn hàng có tồn tại không
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isEmpty()) {
            throw new RuntimeException("Order not found");
        }

        Order order = orderOptional.get();

        // Tạo thông tin giao hàng mới
        Shipping shipping = new Shipping();
        shipping.setOrder(order);
        shipping.setShippingMethod(shippingMethod);
        shipping.setShippingAddress(shippingAddress);
        shipping.setShippingDate(java.time.LocalDateTime.now());

        // Lưu thông tin giao hàng vào cơ sở dữ liệu
        return shippingRepository.save(shipping);
    }

    // Cập nhật thông tin giao hàng
    public Shipping updateShipping(Integer shippingId, String shippingMethod, String shippingAddress, String trackingNumber) {
        Optional<Shipping> shippingOptional = shippingRepository.findById(shippingId);
        if (shippingOptional.isEmpty()) {
            throw new RuntimeException("Shipping info not found");
        }

        Shipping shipping = shippingOptional.get();
        shipping.setShippingMethod(shippingMethod);
        shipping.setShippingAddress(shippingAddress);
        shipping.setTrackingNumber(trackingNumber);

        // Cập nhật lại thông tin giao hàng trong cơ sở dữ liệu
        return shippingRepository.save(shipping);
    }

    // Lấy thông tin giao hàng của một đơn hàng
    public Shipping getShippingInfoByOrderId(Integer orderId) {
        return shippingRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Shipping info not found for order id: " + orderId));
    }

    // Tính phí vận chuyển
    public BigDecimal calculateShippingFee(Shipping shipping) {
        // Phát triển thêm
        return BigDecimal.ZERO; // Mặc định không tính phí vận chuyển
    }
}
