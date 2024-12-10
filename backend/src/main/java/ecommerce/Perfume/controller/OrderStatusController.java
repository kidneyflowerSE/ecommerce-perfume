package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.OrderStatus;
import ecommerce.Perfume.service.OrderStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order-statuses")
public class OrderStatusController {

    @Autowired
    private OrderStatusService orderStatusService;

    // Tạo mới OrderStatus
    @PostMapping
    public ResponseEntity<OrderStatus> createOrderStatus(@RequestBody OrderStatus orderStatus) {
        OrderStatus createdOrderStatus = orderStatusService.createOrderStatus(orderStatus);
        return new ResponseEntity<>(createdOrderStatus, HttpStatus.CREATED);
    }

    // Lấy OrderStatus theo ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderStatus> getOrderStatusById(@PathVariable Integer id) {
        Optional<OrderStatus> orderStatus = orderStatusService.getOrderStatusById(id);
        return orderStatus.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Lấy tất cả OrderStatuses
    @GetMapping
    public ResponseEntity<List<OrderStatus>> getAllOrderStatuses() {
        List<OrderStatus> orderStatuses = orderStatusService.getAllOrderStatuses();
        return new ResponseEntity<>(orderStatuses, HttpStatus.OK);
    }

    // Cập nhật OrderStatus
    @PutMapping("/{id}")
    public ResponseEntity<OrderStatus> updateOrderStatus(@PathVariable Integer id, @RequestBody OrderStatus updatedOrderStatus) {
        try {
            OrderStatus updated = orderStatusService.updateOrderStatus(id, updatedOrderStatus);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Xoá OrderStatus
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderStatus(@PathVariable Integer id) {
        try {
            orderStatusService.deleteOrderStatus(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
