package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.Promotion;
import ecommerce.Perfume.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    // Tạo mới Promotion
    @PostMapping("/create")
    public ResponseEntity<Promotion> createPromotion(@RequestParam String promoCode,
                                                     @RequestParam String description,
                                                     @RequestParam BigDecimal discountPercentage,
                                                     @RequestParam String startDate,
                                                     @RequestParam String endDate) {
        try {
            // Parse the dates from String to LocalDate
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);

            // Create the promotion
            Promotion promotion = promotionService.createPromotion(promoCode, description, discountPercentage, start, end);
            return ResponseEntity.ok(promotion);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Lấy Promotion theo code
    @GetMapping("/{promoCode}")
    public ResponseEntity<Promotion> findPromotionByCode(@PathVariable String promoCode) {
        Promotion promotion = promotionService.findByPromoCode(promoCode);
        if (promotion != null) {
            return ResponseEntity.ok(promotion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Lấy Promotion theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Promotion> getPromotionById(@PathVariable Integer id) {
        Optional<Promotion> promotion = promotionService.getPromotionById(id);
        return promotion.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Lấy tất cả Promotions
    @GetMapping
    public ResponseEntity<List<Promotion>> getAllPromotions() {
        List<Promotion> promotions = promotionService.getAllPromotions();
        return new ResponseEntity<>(promotions, HttpStatus.OK);
    }

    // Cập nhật Promotion
    @PutMapping("/{id}")
    public ResponseEntity<Promotion> updatePromotion(@PathVariable Integer id, @RequestBody Promotion updatedPromotion) {
        try {
            Promotion updated = promotionService.updatePromotion(id, updatedPromotion);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Xoá Promotion
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Integer id) {
        try {
            promotionService.deletePromotion(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
