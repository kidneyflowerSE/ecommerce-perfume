package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Cart;
import ecommerce.Perfume.model.Customer;
import ecommerce.Perfume.repository.CartRepository;
import ecommerce.Perfume.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // Tạo giỏ hàng mới
    public Cart cartCreation(Integer customerId){
        Optional<Customer> customer = customerRepository.findById(customerId);
        if(customer.isEmpty()){
            throw new RuntimeException("Customer not found with ID: " + customerId);
        }
        Cart cart = new Cart();

        cart.setCustomer(customer.get());
        cart.setCreatedAt(LocalDateTime.now());

        return cartRepository.save(cart);
    }

    // Lấy thông tin giỏ hàng của khách hàng
    public Cart getCartByCustomerId(Integer customerId) {
        Optional<Cart> cart = cartRepository.findByCustomerId(customerId);
        if (cart.isEmpty()) {
            throw new RuntimeException("Cart not found for customer with ID: " + customerId);
        }
        return cart.get();
    }

    // Xóa giỏ hàng
    public void deleteCart(Integer cartId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isEmpty()) {
            throw new RuntimeException("Cart not found with ID: " + cartId);
        }

        cartRepository.deleteById(cartId);
    }
    
}
