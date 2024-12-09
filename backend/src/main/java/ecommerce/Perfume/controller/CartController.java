package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.Cart;
import ecommerce.Perfume.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    // Tạo giỏ hàng mới
    @PostMapping("/create/{customerId}")
    public ResponseEntity<Cart> createCart(@PathVariable Integer customerId) {
        try {
            Cart cart = cartService.cartCreation(customerId);
            return new ResponseEntity<>(cart, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Lấy thông tin giỏ hàng của khách hàng
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Cart> getCartByCustomerId(@PathVariable Integer customerId) {
        try {
            Cart cart = cartService.getCartByCustomerId(customerId);
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Xóa giỏ hàng
    @DeleteMapping("/delete/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable Integer cartId) {
        try {
            cartService.deleteCart(cartId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
