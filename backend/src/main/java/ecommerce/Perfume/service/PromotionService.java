package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Promotion;
import ecommerce.Perfume.repository.PromotionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    // Tạo mới Promotion
    public Promotion createPromotion(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    // Lấy Promotion theo ID
    public Optional<Promotion> getPromotionById(Integer id) {
        return promotionRepository.findById(id);
    }

    // Lấy tất cả Promotions
    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    // Cập nhật Promotion
    public Promotion updatePromotion(Integer id, Promotion updatedPromotion) {
        Optional<Promotion> existingPromotion = promotionRepository.findById(id);
        if (existingPromotion.isPresent()) {
            Promotion promotion = existingPromotion.get();
            promotion.setPromoCode(updatedPromotion.getPromoCode());
            promotion.setDescription(updatedPromotion.getDescription());
            promotion.setDiscountPercentage(updatedPromotion.getDiscountPercentage());
            promotion.setStartDate(updatedPromotion.getStartDate());
            promotion.setEndDate(updatedPromotion.getEndDate());
            return promotionRepository.save(promotion);
        }
        throw new IllegalArgumentException("Promotion with ID " + id + " not found.");
    }

    // Xoá Promotion
    public void deletePromotion(Integer id) {
        if (promotionRepository.existsById(id)) {
            promotionRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Promotion with ID " + id + " not found.");
        }
    }

    // Tìm Promotion theo mã promoCode
    public Optional<Promotion> getPromotionByPromoCode(String promoCode) {
        return promotionRepository.findByPromoCode(promoCode);
    }
}
