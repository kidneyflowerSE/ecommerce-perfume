package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.Shipping;
import ecommerce.Perfume.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/shippings")
public class ShippingController {

    @Autowired
    private ShippingService shippingService;

    // Tạo thông tin giao hàng cho đơn hàng
    @PostMapping("/create")
    public Shipping createShipping(
            @RequestParam Integer orderId,
            @RequestParam String shippingMethod,
            @RequestParam String shippingAddress) {
        return shippingService.createShippingForOrder(orderId, shippingMethod, shippingAddress);
    }

    // Cập nhật thông tin giao hàng
    @PutMapping("/update/{shippingId}")
    public Shipping updateShipping(
            @PathVariable Integer shippingId,
            @RequestParam String shippingMethod,
            @RequestParam String shippingAddress,
            @RequestParam String trackingNumber) {
        return shippingService.updateShipping(shippingId, shippingMethod, shippingAddress, trackingNumber);
    }

    // Lấy thông tin giao hàng của một đơn hàng
    @GetMapping("/order/{orderId}")
    public Shipping getShippingInfoByOrderId(@PathVariable Integer orderId) {
        return shippingService.getShippingInfoByOrderId(orderId);
    }

    // Tính phí vận chuyển cho một đơn hàng/
    @GetMapping("/calculate-fee/{shippingId}")
    public BigDecimal calculateShippingFee(@PathVariable Integer shippingId) {
        Shipping shipping = shippingService.getShippingInfoByOrderId(shippingId);
        return shippingService.calculateShippingFee(shipping);
    }
}
