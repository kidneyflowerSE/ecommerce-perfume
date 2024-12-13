package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Promotion;
import ecommerce.Perfume.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionService {

        @Autowired
        private PromotionRepository promotionRepository;

        // Tạo promotion
        public Promotion createPromotion(String promoCode, String description, BigDecimal discountPercentage, java.time.LocalDate startDate, java.time.LocalDate endDate) {
            Promotion promotion = new Promotion();
            promotion.setPromoCode(promoCode);
            promotion.setDescription(description);
            promotion.setDiscountPercentage(discountPercentage);
            promotion.setStartDate(startDate);
            promotion.setEndDate(endDate);
            return promotionRepository.save(promotion);
        }

        // Lấy promotion theo code
        public Promotion findByPromoCode(String promoCode) {
            return promotionRepository.findByPromoCode(promoCode)
                    .orElse(null);
        }

        // Lấy promotion theo id
        public Optional<Promotion> getPromotionById(Integer id) {
            return promotionRepository.findById(id);
        }

        // Lấy tất cả promotion
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
}
