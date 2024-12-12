package ecommerce.Perfume.repository;

import ecommerce.Perfume.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByBrandName(String name);

    List<Product> findByCategoryName(String name);

    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    @Query("SELECT p FROM Product p JOIN p.brand b WHERE b.country = :country ORDER BY p.id")
    List<Product> findByBrandCountry(@Param("country") String country);

    @Query("SELECT p.id, p.name, SUM(od.quantity) AS totalQuantity " +
            "FROM OrderDetail od " +
            "JOIN od.product p " +
            "GROUP BY p.id, p.name " +
            "ORDER BY totalQuantity DESC")
    Page<Product> findTop10BestSellingProducts(Pageable pageable);
}
