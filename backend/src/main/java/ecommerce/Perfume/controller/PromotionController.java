package ecommerce.Perfume.controller;

import ecommerce.Perfume.model.Promotion;
import ecommerce.Perfume.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    // Tạo mới Promotion
    @PostMapping
    public ResponseEntity<Promotion> createPromotion(@RequestBody Promotion promotion) {
        Promotion createdPromotion = promotionService.createPromotion(promotion);
        return new ResponseEntity<>(createdPromotion, HttpStatus.CREATED);
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

    // Tìm Promotion theo mã promoCode
    @GetMapping("/promoCode/{promoCode}")
    public ResponseEntity<Promotion> getPromotionByPromoCode(@PathVariable String promoCode) {
        Optional<Promotion> promotion = promotionService.getPromotionByPromoCode(promoCode);
        return promotion.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
