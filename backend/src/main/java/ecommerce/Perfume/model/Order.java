package ecommerce.Perfume.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(nullable = false)
    private double totalAmount;

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime orderDate;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private OrderStatus status;
}
