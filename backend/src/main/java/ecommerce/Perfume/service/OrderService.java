package ecommerce.Perfume.service;

import ecommerce.Perfume.model.*;
import ecommerce.Perfume.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ShippingRepository shippingRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    private ShippingService shippingService;

    public Order createOrder(Integer customerId, Integer paymentMethodId) {
        // Tìm khách hàng
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Tìm phương thức thanh toán
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new RuntimeException("Payment method not found"));

        // Tạo đối tượng đơn hàng mới
        Order newOrder = new Order();
        newOrder.setCustomer(customer);
        newOrder.setPaymentMethod(paymentMethod);
        newOrder.setStatus(orderStatusRepository.findById(1).orElseThrow(() -> new RuntimeException("Order status not found")));
        newOrder.setOrderDate(java.time.LocalDateTime.now());
        newOrder.setTotalAmount(BigDecimal.ZERO);

        // Lưu đơn hàng
        return orderRepository.save(newOrder);
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order createOrderFromCart(Integer customerId, Integer cartId, Integer paymentMethodId, Integer shippingId, String promoCode, Integer orderStatusId) {
        // Tìm giỏ hàng của khách hàng
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Lấy danh sách các sản phẩm trong giỏ hàng
        List<CartItem> cartItems = cartItemRepository.findByCartId(cartId);

        // Tìm khách hàng nếu được cung cấp, nếu không để null hoặc gán giá trị mặc định
        Customer customer = null;
        if (customerId != null) {
            customer = customerRepository.findById(customerId)
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
        }

        // Tìm phương thức thanh toán
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new RuntimeException("Payment method not found"));

        // Tìm thông tin giao hàng
        Shipping shipping = shippingRepository.findById(shippingId)
                .orElseThrow(() -> new RuntimeException("Shipping information not found"));

        // Tìm trạng thái đơn hàng
        OrderStatus orderStatus = orderStatusRepository.findById(orderStatusId)
                .orElseThrow(() -> new RuntimeException("Order status not found"));

        // Tạo đối tượng đơn hàng mới
        Order newOrder = new Order();
        newOrder.setCustomer(customer); // Có thể null nếu không cung cấp
        newOrder.setPaymentMethod(paymentMethod);
        newOrder.setShipping(shipping);
        newOrder.setStatus(orderStatus);

        // Tính toán tổng giá trị đơn hàng từ giỏ hàng
        BigDecimal totalAmount = cartItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Áp dụng mã khuyến mãi nếu được cung cấp
        if (promoCode != null && !promoCode.isEmpty()) {
            Optional<Promotion> promotion = promotionRepository.findByPromoCode(promoCode);
            if (promotion.isPresent()) {
                BigDecimal discount = promotion.get().getDiscountPercentage().divide(BigDecimal.valueOf(100));
                totalAmount = totalAmount.subtract(totalAmount.multiply(discount));
            }
        }

        // Tính phí vận chuyển
        BigDecimal shippingFee = shippingService.calculateShippingFee(shipping);

        // Cộng phí vận chuyển vào tổng tiền
        totalAmount = totalAmount.add(shippingFee);

        // Gán tổng tiền cho đơn hàng
        newOrder.setTotalAmount(totalAmount);

        // Lưu đơn hàng
        return orderRepository.save(newOrder);
    }

    public Order updateOrderStatus(Integer orderId, Integer statusId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            OrderStatus orderStatus = orderStatusRepository.findById(statusId)
                    .orElseThrow(() -> new RuntimeException("Order status not found"));

            order.setStatus(orderStatus);
            return orderRepository.save(order);
        }
        throw new RuntimeException("Order not found");
    }

    public List<Order> getOrdersByCustomer(Integer customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Order getOrderById(Integer orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
}
