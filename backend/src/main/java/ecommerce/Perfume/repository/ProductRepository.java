package ecommerce.Perfume.repository;

import ecommerce.Perfume.model.Brand;
import ecommerce.Perfume.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByBrandName(String name);
    List<Product> findByCategoryName(String name);
}
