package com.chatappbackend.chapappbackend.auth;

import com.chatappbackend.chapappbackend.document.User;
import com.chatappbackend.chapappbackend.document.Role;
import com.chatappbackend.chapappbackend.repository.UserRepository;
import com.chatappbackend.chapappbackend.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Primary
public class CustomUserDetailsService implements UserDetailsService {
   private final UserRepository userRepository;
   private final RoleService roleService;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmails(email).orElseThrow(() -> new RuntimeException("emails is not exists"));
        Role role = roleService.findById(user.getRoleId());
        Set<SimpleGrantedAuthority> authorities = com.chatappbackend.chapappbackend.auth.Role.forName(role.getRoleName()).getAuthorities();

        return new CustomUserDetails(user.getId(),user.getEmails(),user.getPassword(),
                authorities,true,true,true,
                user.isEnabled());
    }
}
