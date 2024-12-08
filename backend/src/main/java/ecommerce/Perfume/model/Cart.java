package ecommerce.Perfume.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Getters, Setters, Constructors, toString...
}
