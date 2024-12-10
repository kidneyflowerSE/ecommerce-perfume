package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.Shipping;
import ecommerce.Perfume.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/shippings")
public class ShippingController {

    @Autowired
    private ShippingService shippingService;

    // Tạo thông tin giao hàng cho đơn hàng
    @PostMapping("/create")
    public ResponseEntity<Shipping> createShipping(
            @RequestParam Integer orderId,
            @RequestParam String shippingMethod,
            @RequestParam String shippingAddress) {
        Shipping shipping =  shippingService.createShippingForOrder(orderId, shippingMethod, shippingAddress);
        return new ResponseEntity<>(shipping, HttpStatus.CREATED);
    }

    // Cập nhật thông tin giao hàng
    @PutMapping("/update/{shippingId}")
    public ResponseEntity<Shipping> updateShipping(
            @PathVariable Integer shippingId,
            @RequestParam String shippingMethod,
            @RequestParam String shippingAddress,
            @RequestParam String trackingNumber) {
        Shipping shipping = shippingService.updateShipping(shippingId, shippingMethod, shippingAddress, trackingNumber);
        return new ResponseEntity<>(shipping, HttpStatus.OK);
    }

    // Lấy thông tin giao hàng của một đơn hàng
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Shipping> getShippingInfoByOrderId(@PathVariable Integer orderId) {
        Shipping shipping = shippingService.getShippingInfoByOrderId(orderId);
        return new ResponseEntity<>(shipping, HttpStatus.OK);
    }

    // Tính phí vận chuyển cho một đơn hàng/
    @GetMapping("/calculate-fee/{shippingId}")
    public BigDecimal calculateShippingFee(@PathVariable Integer shippingId) {
        Shipping shipping = shippingService.getShippingInfoByOrderId(shippingId);
        return shippingService.calculateShippingFee(shipping);
    }
}
