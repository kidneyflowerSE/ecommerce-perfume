package ecommerce.Perfume.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Payment_Methods")
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "method_name", nullable = false, length = 255)
    private String methodName;

    @Column
    private String details;

    // Getters, Setters, Constructors, toString...
}
