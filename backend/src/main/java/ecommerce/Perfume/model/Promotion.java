package ecommerce.Perfume.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Promotions")
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50, unique = true)
    private String promoCode;

    @Column
    private String description;

    @Column(nullable = false)
    private BigDecimal discountPercentage;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    // Getters, Setters, Constructors, toString...
}
