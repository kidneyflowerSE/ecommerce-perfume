package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Shipping;
import ecommerce.Perfume.repository.ShippingRepository;
import ecommerce.Perfume.model.Order;
import ecommerce.Perfume.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@Transactional
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

        // Tạo thông tin giao hàng mới
        Shipping shipping = new Shipping();
        shipping.setOrder(orderOptional.get());
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

        // Cập nhật thông tin nếu có thay đổi
        shipping.setShippingMethod(shippingMethod);
        shipping.setShippingAddress(shippingAddress);

        // Chỉ cập nhật trackingNumber nếu không null
        if (trackingNumber != null) {
            shipping.setTrackingNumber(trackingNumber);
        }

        // Lưu thông tin giao hàng cập nhật
        return shippingRepository.save(shipping);
    }

    // Lấy thông tin giao hàng của một đơn hàng
    public Shipping getShippingInfoByOrderId(Integer orderId) {
        return shippingRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Shipping info not found for order id: " + orderId));
    }

    public Shipping getShippingInfoById(Integer shippingId) {
        return shippingRepository.findById(shippingId)
                .orElseThrow(() -> new RuntimeException("Shipping info not found"));
    }

    // Tính phí vận chuyển
    public BigDecimal calculateShippingFee(Shipping shipping) {
        if (shipping.getShippingMethod().equals("Standard")) {
            if (shipping.getShippingAddress().contains("Hồ Chí Minh"))
                return new BigDecimal(25000);
            else
                return new BigDecimal(30000);
        } else if (shipping.getShippingMethod().equals("COD"))
            return BigDecimal.ZERO;

        throw new IllegalArgumentException("Unsupported shipping method: " + shipping.getShippingMethod());
    }

}
