package ecommerce.Perfume.service;

import ecommerce.Perfume.model.Promotion;
import ecommerce.Perfume.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PromotionService {

        @Autowired
        private PromotionRepository promotionRepository;

        public Promotion createPromotion(String promoCode, String description, BigDecimal discountPercentage, java.time.LocalDate startDate, java.time.LocalDate endDate) {
            Promotion promotion = new Promotion();
            promotion.setPromoCode(promoCode);
            promotion.setDescription(description);
            promotion.setDiscountPercentage(discountPercentage);
            promotion.setStartDate(startDate);
            promotion.setEndDate(endDate);
            return promotionRepository.save(promotion);
        }

        public Promotion findByPromoCode(String promoCode) {
            return promotionRepository.findByPromoCode(promoCode)
                    .orElse(null);
        }

}
