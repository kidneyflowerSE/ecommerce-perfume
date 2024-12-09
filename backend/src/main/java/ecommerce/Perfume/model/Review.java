package ecommerce.Perfume.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.Check;

import java.time.LocalDateTime;

@Entity
@Table(name = "Reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Check(constraints = "rating >= 1 AND rating <= 5")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private Product product;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private Customer customer;

    @Column(name = "content")
    private String content;

    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Column(name = "review_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", updatable = false)
    private LocalDateTime reviewDate;
}
