package com.akshay.carrental.service;

import com.akshay.carrental.model.Booking;
import com.akshay.carrental.model.Car;
import com.akshay.carrental.repository.BookingRepository;
import com.akshay.carrental.repository.CarRepository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;

    public BookingService(BookingRepository bookingRepository,
                          CarRepository carRepository) {
        this.bookingRepository = bookingRepository;
        this.carRepository = carRepository;
    }

    @Transactional
    public Booking createBooking(Booking booking) {

        Long carId = booking.getCar().getId();

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        // 🔴 Check availability
        if (Boolean.FALSE.equals(car.getAvailable())) {
            throw new RuntimeException("Car is not available");
        }

        // 🔒 Make unavailable
        car.setAvailable(false);
        carRepository.save(car);

        booking.setCar(car);

        return bookingRepository.save(booking);
    }
}