package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.ConfirmationToken;

import java.util.Optional;

public interface ConfirmationTokenService {
    Optional<ConfirmationToken> findByToken(String token);

    void setConfirmedAt(String token);

    void save(ConfirmationToken confirmationToken);
}
