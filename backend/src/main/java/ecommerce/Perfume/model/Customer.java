package ecommerce.Perfume.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 255, unique = true)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column
    private String address;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Getters, Setters, Constructors, toString...
}
