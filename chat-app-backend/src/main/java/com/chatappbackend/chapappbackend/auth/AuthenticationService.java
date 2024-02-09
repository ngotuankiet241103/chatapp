package com.chatappbackend.chapappbackend.auth;

import com.chatappbackend.chapappbackend.document.RefreshToken;
import com.chatappbackend.chapappbackend.repository.RefreshTokenRepository;
import com.chatappbackend.chapappbackend.request.UserRequest;
import com.chatappbackend.chapappbackend.response.ResponseApi;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenRepository tokenRepository;
    private final SequenceGeneratorService generatorService;
    private final UserDetailsService userDetailsService;
    @Value("${spring.refreshExpiration}")
    private  long refreshExpiration;

    public AuthenticationResponse login(UserRequest userRequest){
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(userRequest.getEmails(),userRequest.getPassword());
        CustomUserDetails user = (CustomUserDetails) authenticationManager.authenticate(usernamePasswordAuthenticationToken).getPrincipal();
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        AuthenticationResponse response = new AuthenticationResponse();
        tokenRepository.save(createRefreshToken(refreshToken));
        response.setAccess_token(jwtToken);
        response.setRefresh_token(refreshToken);

        return response;
    }
    private RefreshToken createRefreshToken(String token){
        return RefreshToken.builder()
                .id(generatorService.generateSequence(RefreshToken.SEQUENCE_NAME))
                .token(token)
                .isExpired(false)
                .createDated(new Date(System.currentTimeMillis()))
                .expired(new Date(System.currentTimeMillis() + refreshExpiration))
                .build();
    }

    public AuthenticationResponse refreshToken(AuthenticationResponse authenticationResponse) {
        RefreshToken refreshToken = tokenRepository.findByToken(authenticationResponse.getRefresh_token()).orElse(null);
        if(refreshToken == null) return null;
        AuthenticationResponse responseToken = null;
        String jwt  = authenticationResponse.getRefresh_token();
        String userEmail = jwtService.extractUsername(jwt);
        if (userEmail != null) {
            CustomUserDetails user = (CustomUserDetails) userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, user)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null,
                        user.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource());
                SecurityContextHolder.getContext().setAuthentication(authToken);
                String jwtToken = jwtService.generateToken(user);
                responseToken = new AuthenticationResponse();
                responseToken.setAccess_token(jwtToken);
                responseToken.setRefresh_token(jwt);

            }
            else{
                refreshToken.setExpired(true);
                tokenRepository.save(refreshToken);
            }

        }

		return responseToken;

    }

    public ResponseApi logout(AuthenticationResponse authenticationResponse) {
        RefreshToken refreshToken = tokenRepository.findByToken(authenticationResponse.getRefresh_token()).orElse(null);
        if(refreshToken == null){
            return null;
        }
        refreshToken.setExpired(true);
        tokenRepository.save(refreshToken);
        ResponseApi responseApi = ResponseApi.builder()
                .status(HttpStatus.OK.toString())
                .data(new HashMap<>())
                .message("logout success")
                .build();
        return responseApi;
    }
}
