package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Customer;
import ecommerce.Perfume.model.Product;
import ecommerce.Perfume.model.Review;
import ecommerce.Perfume.repository.CustomerRepository;
import ecommerce.Perfume.repository.ProductRepository;
import ecommerce.Perfume.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // Thêm review
    public Review addReview(Integer productId, Integer customerId, String content, Integer rating) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Khách hàng không tồn tại"));

        // Kiểm tra tính hợp lệ của rating
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating phải nằm trong khoảng từ 1 đến 5");
        }

        Review review = new Review();
        review.setProduct(product);
        review.setCustomer(customer);
        review.setContent(content);
        review.setRating(rating);
        review.setReviewDate(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    // Cập nhật review
    public Review updateReview(Integer reviewId, String content, Integer rating) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review không tồn tại"));

        review.setContent(content);
        review.setRating(rating);

        return reviewRepository.save(review);
    }

    // Xoá review
    public void deleteReview(Integer reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review không tồn tại"));
        reviewRepository.delete(review);
    }

    // Lọc review theo sản phẩm
    public List<Review> getReviewsByProduct(Integer productId, int page, int size, String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return reviewRepository.findByProductId(productId, pageable).getContent();
    }

    // Lọc review theo khách hàng
    public List<Review> getReviewsByCustomer(Integer customerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewRepository.findByCustomerId(customerId, pageable).getContent();
    }

    // Lấy review theo id
    public Optional<Review> getReviewById(Integer reviewId) {
        return reviewRepository.findById(reviewId);
    }

    // Tính đánh giá trung bình
    public Double calculateAverageRating(Integer productId, int page, int size) {
        // Sử dụng Pageable để phân trang các review của sản phẩm
        Pageable pageable = PageRequest.of(page, size);

        // Lấy các review cho sản phẩm với phân trang
        List<Review> reviews = reviewRepository.findByProductId(productId, pageable).getContent();

        // Kiểm tra nếu không có review nào
        if (reviews.isEmpty()) {
            return 0.0; // Trả về 0 nếu không có review
        }

        // Tính tổng điểm trung bình
        double sum = 0;
        for (Review review : reviews) {
            sum += review.getRating();
        }

        return sum / reviews.size();
    }


}
