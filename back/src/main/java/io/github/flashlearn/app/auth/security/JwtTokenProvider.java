package io.github.flashlearn.app.auth.security;

import io.github.flashlearn.app.user.entity.User;
import io.github.flashlearn.app.user.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    private final UserRepository userRepository;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    /**
     * Генерирует JWT токен для пользователя с указанным именем
     *
     * @param username имя пользователя
     * @return JWT токен
     */
    public String generateToken(String username) {
        Date now = new Date();
        // Вычисляем дату истечения токена: текущее время + время жизни токена
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username)); // fetching user to get id, roles and to check if he is actually in db
        return Jwts.builder()
                .subject(String.valueOf(user.getId())) // replaced username with id
                .claims().add("roles", user.getRole())
                .issuedAt(now) // Время создания токена
                .expiration(expiryDate) // Время истечения токена
                .and()
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();
    }

    public String getIdFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getExpiration().after(new Date()); // token is successfully parsed and not expired
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
        /*
        it is also possible to check if token subject is actually valid,
        but it is a semi-stateless approach, which is heavier for a system,
        than a stateless one
         */
    }
}
