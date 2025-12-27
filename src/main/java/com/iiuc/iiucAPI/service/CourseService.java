package com.iiuc.iiucAPI.service;
import com.iiuc.iiucAPI.model.Course;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
@Service
public class CourseService {
    private List<Course> courses;
    private Long nextId;
    public CourseService() {
        courses = new ArrayList<>();
        nextId = 100L;
    }
    public Course addCourse(Course course) {
        course.setCourseId(nextId);
        nextId = nextId + 1;
        courses.add(course);
        return course;
    }
    public List<Course> getAllCourses() {
        return courses;
    }
    public Course getCourseById(Long id) {
        for (int i = 0; i < courses.size(); i++) {
            Course course = courses.get(i);
            if (course.getCourseId().equals(id)) {
                return course;
            }
        }
        return new Course();
    }
    public Course updateCourse(Long id, Course updatedCourse) {
        for (int i = 0; i < courses.size(); i++) {
            Course course = courses.get(i);
            if (course.getCourseId().equals(id)) {
                course.setCourseCode(updatedCourse.getCourseCode());
                course.setCourseTitle(updatedCourse.getCourseTitle());
                course.setCourseCredit(updatedCourse.getCourseCredit());
                course.setCourseType(updatedCourse.getCourseType());
                course.setSemesterOffered(updatedCourse.getSemesterOffered());
                course.setDeptName(updatedCourse.getDeptName());
                course.setInstructor(updatedCourse.getInstructor());
                return course;
            }
        }
        return new Course();
    }
    public boolean deleteCourse(Long id) {
        return courses.removeIf(course -> course.getCourseId().equals(id));
    }
}

