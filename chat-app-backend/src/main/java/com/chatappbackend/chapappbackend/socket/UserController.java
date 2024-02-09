package com.chatappbackend.chapappbackend.socket;

import com.chatappbackend.chapappbackend.request.UserInfo;
import com.chatappbackend.chapappbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller("socket")
@RequiredArgsConstructor
public class UserController {
    private  final UserService userService;
    @MessageMapping("/user.addUser")
    @SendTo("/topic/public")
    public UserInfo addUser(
            @Payload UserInfo user
    ) {
        System.out.println(user.getEmails());
        userService.updateStatus(user.getEmails());
        return user;
    }
    @MessageMapping("/user.disconnectUser")
    @SendTo("/topic/public")
    public UserInfo disconnectUser(
            @Payload UserInfo user
    ) {
        System.out.println(user.getEmails());
        userService.updateStatusOffline(user.getEmails());
        return user;
    }
}
