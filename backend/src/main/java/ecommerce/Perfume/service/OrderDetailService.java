package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Order;
import ecommerce.Perfume.model.OrderDetail;
import ecommerce.Perfume.model.Product;
import ecommerce.Perfume.model.Promotion;
import ecommerce.Perfume.repository.OrderDetailRepository;
import ecommerce.Perfume.repository.OrderRepository;
import ecommerce.Perfume.repository.ProductRepository;
import ecommerce.Perfume.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    // Tạo chi tiết đơn hàng mới
    public OrderDetail createOrderDetail(Integer orderId, Integer productId, Integer promoCodeId, Integer quantity) {
        // Kiểm tra sự tồn tại của đơn hàng
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isEmpty()) {
            throw new RuntimeException("Order not found");
        }
        Order order = orderOptional.get();

        // Kiểm tra sự tồn tại của sản phẩm
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()) {
            throw new RuntimeException("Product not found");
        }
        Product product = productOptional.get();

        // Kiểm tra sự tồn tại của mã khuyến mãi
        Optional<Promotion> promotionOptional = Optional.empty();
        if (promoCodeId != null) {
            promotionOptional = promotionRepository.findById(promoCodeId);
            if (promotionOptional.isEmpty()) {
                throw new RuntimeException("Promotion not found");
            }
        }

        // Tạo chi tiết đơn hàng
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder(order);
        orderDetail.setProduct(product);
        orderDetail.setPromoCode(promotionOptional.orElse(null));
        orderDetail.setQuantity(quantity);
        orderDetail.setPrice(product.getPrice()); // Giả sử giá của sản phẩm lấy từ Product

        // Lưu chi tiết đơn hàng
        return orderDetailRepository.save(orderDetail);
    }

    // Lấy tất cả chi tiết đơn hàng theo orderId
    public List<OrderDetail> getOrderDetailsByOrderId(Integer orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }

    // Lấy chi tiết đơn hàng theo ID
    public OrderDetail getOrderDetailById(Integer orderDetailId) {
        return orderDetailRepository.findById(orderDetailId)
                .orElseThrow(() -> new RuntimeException("Order detail not found"));
    }

    // Cập nhật chi tiết đơn hàng
    public OrderDetail updateOrderDetail(Integer orderDetailId, Integer quantity) {
        Optional<OrderDetail> orderDetailOptional = orderDetailRepository.findById(orderDetailId);
        if (orderDetailOptional.isEmpty()) {
            throw new RuntimeException("Order detail not found");
        }

        OrderDetail orderDetail = orderDetailOptional.get();
        orderDetail.setQuantity(quantity);

        // Lấy giá gốc của sản phẩm
        BigDecimal productPrice = orderDetail.getProduct().getPrice();

        // Tính lại giá sau khi thay đổi số lượng
        BigDecimal updatedPrice = productPrice.multiply(BigDecimal.valueOf(quantity));

        // Áp dụng giảm giá
        if (orderDetail.getPromoCode() != null) {
            BigDecimal discountRate = orderDetail.getPromoCode().getDiscountPercentage();
            BigDecimal discountAmount = updatedPrice.multiply(discountRate);
            updatedPrice = updatedPrice.subtract(discountAmount);
        }

        // Cập nhật lại giá
        orderDetail.setPrice(updatedPrice);

        // Lưu lại chi tiết đơn hàng đã cập nhật
        return orderDetailRepository.save(orderDetail);
    }

    // Xóa chi tiết đơn hàng
    public void deleteOrderDetail(Integer orderDetailId) {
        if (!orderDetailRepository.existsById(orderDetailId)) {
            throw new RuntimeException("Order detail not found");
        }
        orderDetailRepository.deleteById(orderDetailId);
    }
}
