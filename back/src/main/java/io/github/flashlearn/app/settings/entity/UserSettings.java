package io.github.flashlearn.app.settings.entity;

import io.github.flashlearn.app.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "user_settings")
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private Theme theme;
    private Language language;
    private boolean notificationsEnabled;

    public UserSettings() {
        this.theme = Theme.LIGHT;
        this.language = Language.EN;
        this.notificationsEnabled = false;
    }
}
