package com.iiuc.iiucAPI.model;

public class Course {
    private Long courseId;
    private String courseCode;
    private String courseTitle;
    private double courseCredit;
    private String courseType;
    private String semesterOffered;
    private String deptName;
    private String instructor;
    private String prerequisite;

    public Course() {}

    public Course(Long courseId, String courseCode, String courseTitle, double courseCredit,
                  String courseType, String semesterOffered, String deptName, String instructor) {
        this(courseId, courseCode, courseTitle, courseCredit, courseType, semesterOffered, deptName, instructor, "");
    }

    public Course(Long courseId, String courseCode, String courseTitle, double courseCredit,
                  String courseType, String semesterOffered, String deptName, String instructor, String prerequisite) {
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.courseCredit = courseCredit;
        this.courseType = courseType;
        this.semesterOffered = semesterOffered;
        this.deptName = deptName;
        this.instructor = instructor;
        this.prerequisite = prerequisite != null ? prerequisite : "";
    }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public double getCourseCredit() { return courseCredit; }
    public void setCourseCredit(double courseCredit) { this.courseCredit = courseCredit; }

    public String getCourseType() { return courseType; }
    public void setCourseType(String courseType) { this.courseType = courseType; }

    public String getSemesterOffered() { return semesterOffered; }
    public void setSemesterOffered(String semesterOffered) { this.semesterOffered = semesterOffered; }

    public String getDeptName() { return deptName; }
    public void setDeptName(String deptName) { this.deptName = deptName; }

    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }

    public String getPrerequisite() { return prerequisite; }
    public void setPrerequisite(String prerequisite) { this.prerequisite = prerequisite; }

    @Override
    public String toString() {
        return String.format(
                "Course[id=%d, code='%s', title='%s', credit=%.1f, type='%s', semester='%s', deptName=%s, instructor='%s', prerequisite='%s']",
                courseId, courseCode, courseTitle, courseCredit, courseType, semesterOffered, deptName, instructor, prerequisite
        );
    }
}
