package io.github.flashlearn.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class FlashCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    private String answer;

    private LocalDateTime creationTime;

    @PrePersist
    public void onCreate() {
        this.creationTime = LocalDateTime.now();
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    public FlashCard(){}

    public FlashCard(String question, String answer, Type type) {
        this.question = question;
        this.answer = answer;
        this.type = type;
    }

    public FlashCard(String question, String answer) {
        this.question = question;
        this.answer = answer;
        this.type = null;
    }
}
