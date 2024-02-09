package com.chatappbackend.chapappbackend.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class formatDate {
    public static String formatDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        // Format the date using the SimpleDateFormat
        return sdf.format(date);
    }
    public static Date convertString(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date parsedDate = sdf.parse(date);
        return parsedDate;
    }
}
