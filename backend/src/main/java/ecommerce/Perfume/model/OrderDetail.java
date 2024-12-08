package ecommerce.Perfume.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "Order_Details")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "promo_code_id")
    private Promotion promoCode;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private BigDecimal price;

    // Getters, Setters, Constructors, toString...
}
