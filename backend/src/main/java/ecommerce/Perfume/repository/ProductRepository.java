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
import java.util.Objects;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByBrandName(String name);

    List<Product> findByCategoryName(String name);

    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    @Query("SELECT p FROM Product p JOIN p.brand b WHERE b.country = :country")
    List<Product> findProductsByBrandCountry(@Param("country") String country);

    @Query("SELECT p.id, p.name, p.price, p.description, p.imageUrl, b.name " +
            "FROM OrderDetail od " +
            "JOIN od.product p " +
            "JOIN p.brand b " +
            "GROUP BY p.id, p.name, p.price, p.description, p.imageUrl, b.name " +
            "ORDER BY SUM(od.quantity) DESC")
    List<Object[]> findTop10BestSellingProducts();
}
