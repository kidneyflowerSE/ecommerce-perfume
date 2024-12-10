package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Customer;
import ecommerce.Perfume.model.Order;
import ecommerce.Perfume.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Tạo Customer
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    // Lấy Customer theo ID
    public Optional<Customer> getCustomerById(Integer id) {
        return customerRepository.findById(id);
    }

    // Lấy tất cả Customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Cập nhật Customer
    public Customer updateCustomer(Integer id, Customer updatedCustomer) {
        Optional<Customer> existingCustomer = customerRepository.findById(id);
        if (existingCustomer.isPresent()) {
            Customer customer = existingCustomer.get();
            customer.setName(updatedCustomer.getName());
            customer.setEmail(updatedCustomer.getEmail());
            customer.setPhone(updatedCustomer.getPhone());
            customer.setAddress(updatedCustomer.getAddress());
            if (updatedCustomer.getPassword() != null) {
                customer.setPassword(updatedCustomer.getPassword());
            }
            return customerRepository.save(customer);
        }
        throw new IllegalArgumentException("Customer with ID " + id + " not found.");
    }

    // Xoá Customer
    public void deleteCustomer(Integer id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Customer with ID " + id + " not found.");
        }
    }

    // Lấy danh sách đơn hàng của Customer
    public List<Order> getOrdersByCustomerId(Integer customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        if (customer.isPresent()) {
            return customer.get().getOrders();
        }
        throw new IllegalArgumentException("Customer with ID " + customerId + " not found.");
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
