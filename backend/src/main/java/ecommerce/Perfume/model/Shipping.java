package ecommerce.Perfume.model;

import ecommerce.Perfume.model.Order;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Shipping")
public class Shipping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @Column
    private String shippingMethod;

    @Column
    private String shippingAddress;

    @Column(nullable = false)
    private LocalDateTime shippingDate;

    @Column
    private String trackingNumber;

    // Getters, Setters, Constructors, toString...
}
