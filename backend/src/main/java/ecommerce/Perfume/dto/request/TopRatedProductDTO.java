package ecommerce.Perfume.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopRatedProductDTO {
    private Integer id;
    private String name;
    private BigDecimal price;
    private String description;
    private String imageUrl;
    private double averageRating;
}