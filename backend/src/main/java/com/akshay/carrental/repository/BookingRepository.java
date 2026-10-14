package com.akshay.carrental.repository;

import com.akshay.carrental.model.Booking;
// import com.akshay.carrental.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // List<Booking> findByUser(User user);
    List<Booking> findByUserId(Long userId);

}