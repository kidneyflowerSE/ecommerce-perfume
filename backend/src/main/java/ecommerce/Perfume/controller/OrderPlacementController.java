package ecommerce.Perfume.controller;

import ecommerce.Perfume.dto.request.TempCartCreation;
import ecommerce.Perfume.model.Customer;
import ecommerce.Perfume.model.Order;
import ecommerce.Perfume.model.OrderDetail;
import ecommerce.Perfume.model.Product;
import ecommerce.Perfume.model.Shipping;
import ecommerce.Perfume.service.CustomerService;
import ecommerce.Perfume.service.OrderService;
import ecommerce.Perfume.service.OrderDetailService;
import ecommerce.Perfume.service.ProductService;
import ecommerce.Perfume.service.PromotionService;
import ecommerce.Perfume.service.ShippingService;
import ecommerce.Perfume.dto.request.OrderPlacementCreation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/order-placement")
public class OrderPlacementController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private ProductService productService;

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private ShippingService shippingService;

    @PostMapping("/process")
    public ResponseEntity<?> processOrder(@RequestBody OrderPlacementCreation orderPlacementCreation) {

        // Create customer if not exist
        Customer customer = customerService.getCustomerByPhone(orderPlacementCreation.getPhone());
        if (customer == null) {
            customer = customerService.createCustomer(orderPlacementCreation.getName()
                                                    , orderPlacementCreation.getEmail()
                                                    , orderPlacementCreation.getPhone()
                                                    , orderPlacementCreation.getAddress()
                                                    , null);
        }

        // Create order
        Order order = orderService.createOrder(customer.getId()
                                            , orderPlacementCreation.getPaymentMethodId());

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (TempCartCreation tempCart : orderPlacementCreation.getTempCart()) {
            Product product = productService.getProductById(tempCart.getProductId());

            Integer promoCodeId;
            if (orderPlacementCreation.getPromoCode() != null) {
                promoCodeId = promotionService.findByPromoCode(orderPlacementCreation.getPromoCode()).getId();
            } else {
                promoCodeId = null;
            }
            OrderDetail orderDetail = orderDetailService.createOrderDetail(order.getId()
                                                                        , tempCart.getProductId()
                                                                        , promoCodeId
                                                                        , tempCart.getQuantity());

            BigDecimal productPricing = product.getPrice().multiply(BigDecimal.valueOf(tempCart.getQuantity()));
            if (orderDetail.getPromoCode() != null) {
                productPricing = productPricing.subtract(productPricing.multiply(orderDetail.getPromoCode().getDiscountPercentage()));
            }

            totalAmount = totalAmount.add(productPricing);
            orderDetail.setPrice(productPricing);

            orderDetailService.saveOrderDetail(orderDetail);

        }

        Shipping shipping = shippingService.createShippingForOrder(order.getId()
                                                                , "Standard"
                                                                , orderPlacementCreation.getAddress());
        totalAmount = totalAmount.add(shippingService.calculateShippingFee(shipping));

        order.setTotalAmount(totalAmount);
        order = orderService.saveOrder(order);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
}