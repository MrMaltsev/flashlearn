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

    private Language language;
    private boolean theme;
    private boolean autoPlay;
    private boolean notificationsEnabled;

    public UserSettings() {
        this.language = Language.EN;
        this.theme = false;
        this.notificationsEnabled = true;
        this.autoPlay = false;
    }

    public UserSettings(String language, boolean theme, boolean notificationsEnabled, boolean autoPlay) {
        this.language = Language.valueOf(language.toUpperCase());
        this.theme = theme;
        this.notificationsEnabled = notificationsEnabled;
        this.autoPlay = autoPlay;
    }
}
