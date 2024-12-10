package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.Review;
import ecommerce.Perfume.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Thêm review mới
    @PostMapping
    public ResponseEntity<Review> addReview(
            @RequestParam Integer productId,
            @RequestParam Integer customerId,
            @RequestParam String content,
            @RequestParam Integer rating) {
        try {
            Review review = reviewService.addReview(productId, customerId, content, rating);
            return new ResponseEntity<>(review, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Cập nhật review
    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @PathVariable Integer reviewId,
            @RequestParam String content,
            @RequestParam Integer rating) {
        try {
            Review updatedReview = reviewService.updateReview(reviewId, content, rating);
            return new ResponseEntity<>(updatedReview, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Xóa review
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Integer reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Lấy danh sách review theo sản phẩm
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProduct(
            @PathVariable Integer productId,
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String sort) {
        try {
            List<Review> reviews = reviewService.getReviewsByProduct(productId, page, size, sort);
            if (reviews.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Lấy danh sách review theo khách hàng
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Review>> getReviewsByCustomer(
            @PathVariable Integer customerId,
            @RequestParam int page,
            @RequestParam int size) {
        try {
            List<Review> reviews = reviewService.getReviewsByCustomer(customerId, page, size);
            if (reviews.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Lấy review chi tiết theo ID
    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable Integer reviewId) {
        Optional<Review> review = reviewService.getReviewById(reviewId);
        return review.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Tính trung bình rating của sản phẩm
    @GetMapping("/product/{productId}/average-rating")
    public ResponseEntity<Double> calculateAverageRating(@PathVariable Integer productId,
                                                         @PathVariable int page,
                                                         @PathVariable int size) {
        try {
            Double averageRating = reviewService.calculateAverageRating(productId, page, size);
            return new ResponseEntity<>(Objects.requireNonNullElse(averageRating, 0.0), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}