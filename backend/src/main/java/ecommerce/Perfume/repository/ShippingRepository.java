package ecommerce.Perfume.repository;

import ecommerce.Perfume.model.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Integer> {
    Optional<Shipping> findByOrderId(Integer orderId);
}