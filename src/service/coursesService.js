const Course = require('../models/Course');

class CoursesService {

    async getAllCourses() {
        try {
            let courses = await Course.find();
            console.log('courses obtenidos .. ', courses);
            return courses;
        } catch (error) {
            console.error('error in getAllCourses', error);
            return [];
        }

    }

}

module.exports = CoursesService;