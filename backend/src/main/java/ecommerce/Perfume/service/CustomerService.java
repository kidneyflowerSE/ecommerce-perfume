package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Customer;
import ecommerce.Perfume.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public boolean isCreatable(String name, String email, String phone, String address, String password) {
        // check if user already exists
        if (Objects.nonNull(getCustomerByEmail(email))
                || Objects.nonNull(getCustomerByPhone(phone))) {
            return false;
        }

        return true;
    }

    public Customer createCustomer(String name, String email, String phone, String address, String password) {
        if (!isCreatable(name, email, phone, address, password)) {
            throw new IllegalArgumentException("Customer already exists");
        }

        Customer customer = new Customer();

        customer.setName(name);
        customer.setEmail(email);
        customer.setPhone(phone);
        customer.setAddress(address);
        customer.setPassword(password);
        customer.setCreatedAt(java.time.LocalDateTime.now());

        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerByEmail(String email) {
        return customerRepository.getCustomerByEmail(email);
    }

    public Customer getCustomerByPhone(String phone) {
        return customerRepository.getCustomerByPhone(phone);
    }

    public List<Customer> findByNameContainingIgnoreCase(String name) {
        return customerRepository.findByNameContainingIgnoreCase(name);
    }

    public Customer getCustomerById(Integer id) {
        return customerRepository.findById(id)
                .orElse(null);
    }

    // Đăng nhập Customer
    public Customer login(String email, String password) {
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            if (customer.getPassword().equals(password)) {
                return customer;
            }
        }
        throw new IllegalArgumentException("Invalid email or password.");
    }

    // Đổi mật khẩu
    public void changePassword(Integer id, String oldPassword, String newPassword) {
        Optional<Customer> customerOpt = customerRepository.findById(id);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            if (customer.getPassword().equals(oldPassword)) {
                customer.setPassword(newPassword);
                customerRepository.save(customer);
            } else {
                throw new IllegalArgumentException("Old password is incorrect.");
            }
        } else {
            throw new IllegalArgumentException("Customer with ID " + id + " not found.");
        }
    }
}