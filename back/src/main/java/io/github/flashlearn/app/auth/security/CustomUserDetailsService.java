package io.github.flashlearn.app.auth.security;

import io.github.flashlearn.app.user.exception.UserNotFoundException;
import io.github.flashlearn.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { // used by authentication manager to allow token generation
        return new CustomUserDetails(userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username)));
    }
    public UserDetails loadUserById(Long id) throws UsernameNotFoundException { // used within filter chain to manage access based on token info
        return new CustomUserDetails(userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id)));
    }
}
