package io.github.flashlearn.app.settings.entity;

public enum Theme {
    LIGHT("light"),
    DARK("dark"),
    SYSTEM("system");

    private final String value;

    Theme(String value) {
        this.value = value;
    }

    public String getvalue() {
        return value;
    }
}
