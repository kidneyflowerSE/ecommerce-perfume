package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.Order;
import ecommerce.Perfume.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Tạo đơn hàng mới từ giỏ hàng
    @PostMapping("/create")
    public Order createOrder(
            @RequestParam Integer customerId,
            @RequestParam Integer cartId,
            @RequestParam Integer paymentMethodId,
            @RequestParam Integer shippingId,
            @RequestParam String promoCode,
            @RequestParam Integer orderStatusId) {
        return orderService.createOrderFromCart(customerId, cartId, paymentMethodId, shippingId, promoCode, orderStatusId);
    }

    // Cập nhật trạng thái đơn hàng
    @PutMapping("/update-status/{orderId}")
    public Order updateOrderStatus(@PathVariable Integer orderId, @RequestParam Integer statusId) {
        return orderService.updateOrderStatus(orderId, statusId);
    }

    // Lấy danh sách các đơn hàng của khách hàng
    @GetMapping("/customer/{customerId}")
    public List<Order> getOrdersByCustomer(@PathVariable Integer customerId) {
        return orderService.getOrdersByCustomer(customerId);
    }

    // Lấy chi tiết đơn hàng
    @GetMapping("/{orderId}")
    public Order getOrderDetails(@PathVariable Integer orderId) {
        return orderService.getOrderDetails(orderId);
    }
}
