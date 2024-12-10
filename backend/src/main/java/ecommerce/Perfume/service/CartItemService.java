package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Cart;
import ecommerce.Perfume.model.CartItem;
import ecommerce.Perfume.model.Product;
import ecommerce.Perfume.repository.CartItemRepository;
import ecommerce.Perfume.repository.CartRepository;
import ecommerce.Perfume.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@Transactional
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    // Thêm sản phẩm vào giỏ hàng
    public CartItem addProductToCart(Integer cartId, Integer productId, Integer quantity) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isEmpty()) {
            throw new RuntimeException("Cart not found with ID: " + cartId);
        }

        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()) {
            throw new RuntimeException("Product not found with ID: " + productId);
        }

        Optional<CartItem> existingCartItem = cartItemRepository.findByCartIdAndProductId(cartId, productId);
        CartItem cartItem;
        if (existingCartItem.isPresent()) {
            cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setCart(cart.get());
            cartItem.setProduct(product.get());
            cartItem.setQuantity(quantity);
        }

        cartItem.setPrice(product.get().getPrice());
        cartItem.setSubtotal(cartItem.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

        return cartItemRepository.save(cartItem);
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public CartItem updateQuantity(Integer cartItemId, Integer quantity) {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if (cartItem.isEmpty()) {
            throw new RuntimeException("CartItem not found with ID: " + cartItemId);
        }

        CartItem existingCartItem = cartItem.get();
        existingCartItem.setQuantity(quantity);
        existingCartItem.setSubtotal(existingCartItem.getPrice().multiply(BigDecimal.valueOf(quantity)));

        return cartItemRepository.save(existingCartItem);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public void removeProductFromCart(Integer cartItemId) {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if (cartItem.isEmpty()) {
            throw new RuntimeException("CartItem not found with ID: " + cartItemId);
        }

        cartItemRepository.deleteById(cartItemId);
    }

    // Tính tổng giá trị của giỏ hàng
    public BigDecimal calculateCartTotal(Integer cartId) {
        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cartItemRepository.findByCartId(cartId)) {
            total = total.add(cartItem.getSubtotal());
        }

        return total;
    }
}
