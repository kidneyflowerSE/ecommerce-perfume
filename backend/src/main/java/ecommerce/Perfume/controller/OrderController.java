package ecommerce.Perfume.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import ecommerce.Perfume.model.Order;
import ecommerce.Perfume.model.OrderDetail;
import ecommerce.Perfume.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;
import vn.payos.type.PaymentLinkData;

import java.util.ArrayList;
import java.util.List;

import java.security.SecureRandom;
import java.util.Map;

class RandomStringGenerator {
    public static void main(String[] args) {
        final String description = generateRandomString(16);
        System.out.println("Generated Description: " + description);
    }

    public static String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }

        return sb.toString();
    }
}

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final PayOS payOS;

    public OrderController(PayOS payOS) {
        super();
        this.payOS = payOS;
    }

    @Autowired
    private OrderService orderService;

    // Tạo đơn hàng mới từ giỏ hàng
    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(
            @RequestParam(required = false) Integer customerId,
            @RequestParam Integer cartId,
            @RequestParam Integer paymentMethodId,
            @RequestParam Integer shippingId,
            @RequestParam(required = false) String promoCode,
            @RequestParam Integer orderStatusId) {
        try {
            Order createdOrder = orderService.createOrderFromCart(customerId, cartId, paymentMethodId, shippingId, promoCode, orderStatusId);
            return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(path = "/payment/create/{orderId}")
    public ObjectNode createPaymentLink(@PathVariable Integer orderId, @RequestParam String returnUrl, @RequestParam String cancelUrl) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            Order order = orderService.getOrderById(orderId);

            final long orderCode = Long.parseLong(order.getId().toString());
            final int amount = order.getTotalAmount().intValue();
            final String description = RandomStringGenerator.generateRandomString(16);

            List<ItemData> items = new ArrayList<>();

            for (OrderDetail orderDetail : order.getOrderDetails()) {
                if (orderDetail != null && orderDetail.getProduct() != null) {
                    // Lấy thông tin từ OrderDetail
                    final String name = orderDetail.getProduct().getName();
                    System.out.println("Product name: " + name);
                    final int quantity = orderDetail.getQuantity();
                    System.out.println("Product quantity: " + quantity);
                    final int price = (orderDetail.getPrice() != null) ? orderDetail.getPrice().intValue() : 0;
                    System.out.println("Product price: " + price);

                    // Tạo đối tượng ItemData và thêm vào danh sách
                    ItemData item = ItemData.builder().name(name).price(price).quantity(quantity).build();
                    items.add(item);
                } else {
                    System.out.println("Invalid order detail or product");
                }
            }

            PaymentData paymentData = PaymentData.builder().orderCode(orderCode).description(description).amount(amount)
                    .items(items).returnUrl(returnUrl).cancelUrl(cancelUrl).build();

            CheckoutResponseData data = payOS.createPaymentLink(paymentData);

            response.put("error", 0);
            response.put("message", "success");
            response.set("data", objectMapper.valueToTree(data));
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", "fail");
            response.set("data", null);
            return response;

        }
    }

    @GetMapping(path = "/payment/{orderId}")
    public ObjectNode getOrderById(@PathVariable("orderId") Integer orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();

        try {
            Long orderCode = Long.parseLong(orderId.toString());
            PaymentLinkData order = payOS.getPaymentLinkInformation(orderCode);

            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }
    }

    @PutMapping(path = "/payment/{orderId}")
    public ObjectNode cancelOrder(@PathVariable("orderId") Integer orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            PaymentLinkData order = payOS.cancelPaymentLink(orderId, null);

            response.set("data", objectMapper.valueToTree(order));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }
    }

    @PostMapping(path = "/payment/confirm-webhook")
    public ObjectNode confirmWebhook(@RequestBody Map<String, String> requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            String str = payOS.confirmWebhook(requestBody.get("webhookUrl"));
            response.set("data", objectMapper.valueToTree(str));
            response.put("error", 0);
            response.put("message", "ok");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
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
            Order order = orderService.getOrderById(orderId);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
