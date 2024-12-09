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

    @Column(name = "shipping_method")
    private String shippingMethod;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "shipping_date", nullable = false)
    private LocalDateTime shippingDate;

    @Column(name = "tracking_number")
    private String trackingNumber;

    // Getters, Setters, Constructors, toString...
}
