package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.Customer;
import ecommerce.Perfume.service.CustomerService;
import ecommerce.Perfume.dto.request.CustomerCreation;
import ecommerce.Perfume.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Customer> createCustomer(@RequestBody CustomerCreation customerCreation) {
        Customer newCustomer = customerService.createCustomer(customerCreation.getName()
                                                            , customerCreation.getEmail()
                                                            , customerCreation.getPhone()
                                                            , customerCreation.getAddress()
                                                            , customerCreation.getPassword());
        cartService.cartCreation(newCustomer.getId());

        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Customer>> searchCustomersByName(@RequestParam String name) {
        List<Customer> customers = customerService.findByNameContainingIgnoreCase(name);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        Customer customer = customerService.getCustomerById(id);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/email")
    public ResponseEntity<Customer> getCustomerByEmail(@RequestParam String email) {
        Customer customer = customerService.getCustomerByEmail(email);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/phone")
    public ResponseEntity<Customer> getCustomerByPhone(@RequestParam String phone) {
        Customer customer = customerService.getCustomerByPhone(phone);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    // Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<Customer> login(@RequestParam String email, @RequestParam String password) {
        try {
            Customer customer = customerService.login(email, password);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Đổi mật khẩu
    @PutMapping("/{id}/change-password")
    public ResponseEntity<Void> changePassword(@PathVariable Integer id,
                                               @RequestParam String oldPassword,
                                               @RequestParam String newPassword) {
        try {
            customerService.changePassword(id, oldPassword, newPassword);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
