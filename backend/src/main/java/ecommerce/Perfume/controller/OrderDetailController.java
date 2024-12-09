package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.OrderDetail;
import ecommerce.Perfume.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-details")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    // Tạo chi tiết đơn hàng mới
    @PostMapping
    public ResponseEntity<OrderDetail> createOrderDetail(
            @RequestParam Integer orderId,
            @RequestParam Integer productId,
            @RequestParam(required = false) Integer promoCodeId,
            @RequestParam Integer quantity) {
        try {
            OrderDetail orderDetail = orderDetailService.createOrderDetail(orderId, productId, promoCodeId, quantity);
            return new ResponseEntity<>(orderDetail, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Lấy tất cả chi tiết đơn hàng theo orderId
    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailsByOrderId(@PathVariable Integer orderId) {
        try {
            List<OrderDetail> orderDetails = orderDetailService.getOrderDetailsByOrderId(orderId);
            return new ResponseEntity<>(orderDetails, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Lấy chi tiết đơn hàng theo ID
    @GetMapping("/{orderDetailId}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Integer orderDetailId) {
        try {
            OrderDetail orderDetail = orderDetailService.getOrderDetailById(orderDetailId);
            return new ResponseEntity<>(orderDetail, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Cập nhật chi tiết đơn hàng
    @PutMapping("/{orderDetailId}")
    public ResponseEntity<OrderDetail> updateOrderDetail(
            @PathVariable Integer orderDetailId,
            @RequestParam Integer quantity) {
        try {
            OrderDetail orderDetail = orderDetailService.updateOrderDetail(orderDetailId, quantity);
            return new ResponseEntity<>(orderDetail, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Xóa chi tiết đơn hàng
    @DeleteMapping("/{orderDetailId}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable Integer orderDetailId) {
        try {
            orderDetailService.deleteOrderDetail(orderDetailId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
