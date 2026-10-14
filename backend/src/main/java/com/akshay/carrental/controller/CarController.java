// 
package com.akshay.carrental.controller;

import com.akshay.carrental.model.Car;
import com.akshay.carrental.repository.CarRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:5173")
public class CarController {

    private final CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    // ✅ Get All Cars
    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // ✅ Get Car By ID
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
    }

    // ✅ Add New Car
    @PostMapping
    public Car addCar(@RequestBody Car car) {
        if (car.getAvailable() == null) {
            car.setAvailable(true);  // default availability
        }
        return carRepository.save(car);
    }

    // ✅ Delete Car
    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        carRepository.deleteById(id);
    }

    // ✅ Update Car Availability (Admin Feature)
    @PutMapping("/{id}/availability")
    public Car updateAvailability(@PathVariable Long id,
                                  @RequestParam Boolean status) {

        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        car.setAvailable(status);

        return carRepository.save(car);
    }

    // ✅ Optional: Update Full Car Details
    @PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id,
                         @RequestBody Car updatedCar) {

        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        car.setName(updatedCar.getName());
        car.setPricePerDay(updatedCar.getPricePerDay());
        car.setImageUrl(updatedCar.getImageUrl());
        car.setAvailable(updatedCar.getAvailable());

        return carRepository.save(car);
    }
}