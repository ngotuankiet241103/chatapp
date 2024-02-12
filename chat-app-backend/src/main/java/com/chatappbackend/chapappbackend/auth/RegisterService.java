package com.chatappbackend.chapappbackend.auth;

import com.chatappbackend.chapappbackend.document.ConfirmationToken;
import com.chatappbackend.chapappbackend.document.Role;
import com.chatappbackend.chapappbackend.document.User;
import com.chatappbackend.chapappbackend.email.EmailService;
import com.chatappbackend.chapappbackend.request.RegisterRequest;
import com.chatappbackend.chapappbackend.service.ConfirmationTokenService;
import com.chatappbackend.chapappbackend.service.RoleService;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import com.chatappbackend.chapappbackend.service.UserService;
import com.chatappbackend.chapappbackend.utils.formatDate;
import com.chatappbackend.chapappbackend.utils.generateRandomToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RegisterService {

    private final UserService userService;

    private final EmailService emailSender;
    private final ConfirmationTokenService confirmationTokenService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final CustomUserDetailsService userDetailsService;

    private final RoleService roleService;
    private CountDownLatch latch;
    private final SequenceGeneratorService generatorService;
    public AuthenticationResponse register(RegisterRequest request) throws ParseException {

//        boolean isValidEmail = emailValidator.
//                test(request.getEmail());
//
//        if (!isValidEmail) {
//            throw new IllegalStateException("email not valid");
//        }
        boolean userExist = userService.existsByEmail(request.getEmails());
        if (userExist) {
            new RuntimeException("email is exits");
        }
        String token = generateRandomToken.getRandomNumber(6);
        sendEmail(token, request);
        // find role
        Role role_user = roleService.findByName(request.getRole());
        if(role_user == null) {
            role_user = Role.builder()
                    .id(generatorService.generateSequence(Role.SEQUENCE_NAME))
                    .active(true)
                    .roleName(request.getRole())
                    .build();

            role_user = roleService.save(role_user);
        }
        User user = User.builder()
                .id(generatorService.generateSequence(User.SEQUENCE_NAME))
                .emails(request.getEmails())
                .password(request.getPassword())
                .fullName(request.getFullName())
                .date(formatDate.convertString(request.getDate()))
                .avatar(request.getAvatar())
                .address(request.getAddress())
                .isEnabled(false)
                .isTeached(false)
                .roleId(role_user.getId())
                    .build();
        // Sign up user
        user.setCreatedDate(new Date());
        user.setCreatedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        userService.signUpUser(user, token);
        // Create a CountDownLatch with a count of 1
        latch = new CountDownLatch(1);

        // Start a new thread to wait for the user to verify their email address
        AuthenticationResponse response = new AuthenticationResponse();

        try {

            latch.await(15, TimeUnit.MINUTES);
            boolean userIsnable = confirmationTokenService.findByToken(token).orElseThrow(() -> new RuntimeException("token is not found")).getConfirmedAt() == null ? true : false;
            if(userIsnable) {
                // The user did not verify their email address
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vui lòng xác thực email của bạn trước khi đăng nhập", null);
            }
            else {
                authenticationManager
                        .authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmails(), request.getPassword()));
                CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(request.getEmails());
                String jwtToken = jwtService.generateToken(userDetails);
                String refreshToken = jwtService.generateRefreshToken(userDetails);

                System.out.println("jwtToken");
                response.setAccess_token(jwtToken);
                response.setRefresh_token(refreshToken);
            }

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Return the success message to the user

        return response;

    }

    @Async
    public void sendEmail(String token, RegisterRequest request) {
        emailSender.sendEmail(request.getEmails(), buildEmail(request.getFullName(), token));
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" + "\n"
                + "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" + "\n"
                + "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                + "    <tbody><tr>\n" + "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" + "        \n"
                + "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                + "          <tbody><tr>\n" + "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n"
                + "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                + "                  <tbody><tr>\n" + "                    <td style=\"padding-left:10px\">\n"
                + "                  \n" + "                    </td>\n"
                + "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                + "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n"
                + "                    </td>\n" + "                  </tr>\n" + "                </tbody></table>\n"
                + "              </a>\n" + "            </td>\n" + "          </tr>\n" + "        </tbody></table>\n"
                + "        \n" + "      </td>\n" + "    </tr>\n" + "  </tbody></table>\n"
                + "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                + "    <tbody><tr>\n" + "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n"
                + "      <td>\n" + "        \n"
                + "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                + "                  <tbody><tr>\n"
                + "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n"
                + "                  </tr>\n" + "                </tbody></table>\n" + "        \n" + "      </td>\n"
                + "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" + "    </tr>\n"
                + "  </tbody></table>\n" + "\n" + "\n" + "\n"
                + "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                + "    <tbody><tr>\n" + "      <td height=\"30\"><br></td>\n" + "    </tr>\n" + "    <tr>\n"
                + "      <td width=\"10\" valign=\"middle\"><br></td>\n"
                + "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                + "        \n"
                + "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
                + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> "
                +link
                + " </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>"
                + "        \n" + "      </td>\n" + "      <td width=\"10\" valign=\"middle\"><br></td>\n"
                + "    </tr>\n" + "    <tr>\n" + "      <td height=\"30\"><br></td>\n" + "    </tr>\n"
                + "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" + "\n" + "</div></div>";
    }

    public void confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.findByToken(token)
                .orElseThrow(() -> new IllegalStateException("token not found"));
        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }
        String email = userService.findById(confirmationToken.getUserId()).getEmails();
        confirmationTokenService.setConfirmedAt(token);
        userService.enableAppUser(email);
        latch.countDown();
    }
}
