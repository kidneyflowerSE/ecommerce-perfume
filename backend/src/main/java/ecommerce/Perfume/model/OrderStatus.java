package ecommerce.Perfume.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Order_Status")
public class OrderStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "status_name", nullable = false, length = 255)
    private String statusName;

    @Column
    private String description;

    // Getters, Setters, Constructors, toString...
}
