package ecommerce.Perfume.repository;

import ecommerce.Perfume.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.net.ContentHandler;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    Page<Review> findByProductId(Integer productId, Pageable pageable);

    Page<Review> findByCustomerId(Integer customerId, Pageable pageable);
}