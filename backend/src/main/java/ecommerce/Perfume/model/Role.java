package ecommerce.Perfume.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 255)
    private String roleName;

    @Column
    private String permissions;

    // Getters, Setters, Constructors, toString...
}
