package io.github.flashlearn.app.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    // For the future improvements
    @Column(unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(){}

    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        //this.email = email;
        this.role = role;
    }
}
