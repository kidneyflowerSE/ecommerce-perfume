package ecommerce.Perfume.repository;

import ecommerce.Perfume.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    List<Brand> findByNameContainingIgnoreCase(String name);
}
