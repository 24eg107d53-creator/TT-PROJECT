package com.akshay.carrental.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingRequest {

    private Long userId;
    private Long carId;
    private LocalDate startDate;
    private LocalDate endDate;
}