package com.iiuc.iiucAPI.controller;
import com.iiuc.iiucAPI.model.Course;
import com.iiuc.iiucAPI.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;
    @GetMapping
    public List getAllCourses() {
        return courseService.getAllCourses();
    }
    @GetMapping("/{id}")
    public Object getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        if (course != null) {
            return course;
        } else {
            return "Course not found";
        }
    }
    @PostMapping
    public String addCourse(@RequestBody Course course) {
        courseService.addCourse(course);
        return "Course added successfully";
    }
    @PutMapping("/{id}")
    public String updateCourse(
            @PathVariable("id") Long id,
            @RequestBody Course course) {
        Course updatedCourse = courseService.updateCourse(id, course);
        if (updatedCourse != null) {
            return "Course updated successfully";
        } else {
            return "Course not found";
        }
    }
    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable Long id) {
        boolean deleted = courseService.deleteCourse(id);
        if (deleted) {
            return "Course deleted successfully";
        } else {
            return "Course not found";
        }
    }
}
