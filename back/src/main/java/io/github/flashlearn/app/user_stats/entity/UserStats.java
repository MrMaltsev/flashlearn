package io.github.flashlearn.app.user_stats.entity;

import io.github.flashlearn.app.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "user_stats")
public class UserStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate lastLoginDate;
    private int streak;
    private int dailyGoal;
    private boolean dailyGoalCompleted;

    public UserStats() {
        this.lastLoginDate = LocalDate.now();
        this.streak = 1;
        this.dailyGoal = 0;
        this.dailyGoalCompleted = false;
    }
}
