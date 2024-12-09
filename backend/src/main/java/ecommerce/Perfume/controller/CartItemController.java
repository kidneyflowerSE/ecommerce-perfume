package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.CartItem;
import ecommerce.Perfume.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    // Thêm sản phẩm vào giỏ hàng
    @PostMapping("/add/{cartId}/{productId}")
    public ResponseEntity<CartItem> addProductToCart(@PathVariable Integer cartId,
                                                     @PathVariable Integer productId,
                                                     @RequestParam Integer quantity) {
        try {
            CartItem cartItem = cartItemService.addProductToCart(cartId, productId, quantity);
            return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<CartItem> updateQuantity(@PathVariable Integer cartItemId,
                                                   @RequestParam Integer quantity) {
        try {
            CartItem updatedCartItem = cartItemService.updateQuantity(cartItemId, quantity);
            return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Void> removeProductFromCart(@PathVariable Integer cartItemId) {
        try {
            cartItemService.removeProductFromCart(cartItemId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Tính tổng giá trị giỏ hàng
    @GetMapping("/total/{cartId}")
    public ResponseEntity<BigDecimal> calculateCartTotal(@PathVariable Integer cartId) {
        try {
            BigDecimal total = cartItemService.calculateCartTotal(cartId);
            return new ResponseEntity<>(total, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
