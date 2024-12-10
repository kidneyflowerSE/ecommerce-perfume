package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.Order;
import ecommerce.Perfume.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Tạo đơn hàng mới từ giỏ hàng
    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(
            @RequestParam Integer customerId,
            @RequestParam Integer cartId,
            @RequestParam Integer paymentMethodId,
            @RequestParam Integer shippingId,
            @RequestParam String promoCode,
            @RequestParam Integer orderStatusId) {
        try {
            Order createdOrder = orderService.createOrderFromCart(customerId, cartId, paymentMethodId, shippingId, promoCode, orderStatusId);
            return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Cập nhật trạng thái đơn hàng
    @PutMapping("/update-status/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Integer orderId, @RequestParam Integer statusId) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(orderId, statusId);
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Lấy danh sách các đơn hàng của khách hàng
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Order>> getOrdersByCustomer(@PathVariable Integer customerId) {
        try {
            List<Order> orders = orderService.getOrdersByCustomer(customerId);
            if (orders.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Lấy chi tiết đơn hàng
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable Integer orderId) {
        try {
            Order order = orderService.getOrderDetails(orderId);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
