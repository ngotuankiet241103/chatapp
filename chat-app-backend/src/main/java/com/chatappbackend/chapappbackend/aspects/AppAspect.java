package com.chatappbackend.chapappbackend.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Aspect
@Component
public class AppAspect {
    @Pointcut("within(com.chatappbackend.chapappbackend.rest.*)")
    public void inPackage() {}
    @Around("inPackage()")
    public Object beforeLogging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long begin = System.currentTimeMillis();
        System.out.println("start method "+ proceedingJoinPoint.getSignature());
        Object response =  proceedingJoinPoint.proceed();
        long end = System.currentTimeMillis();
        long finish = end - begin;
        System.out.println("finish method " + proceedingJoinPoint.getSignature() + "- time method execute: " + finish + "ms");
        return response;
    }
}
