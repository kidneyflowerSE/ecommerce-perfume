package ecommerce.Perfume.repository;

import ecommerce.Perfume.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    List<Customer> findByNameContainingIgnoreCase(String name);
    Customer getCustomerByEmail(String email);
    Customer getCustomerByPhone(String phone);
    Customer getCustomerById(Integer id);
    Optional<Customer> findByEmail(String email);
}
