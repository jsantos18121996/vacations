const Router = require('express');
const router = Router();

const CoursesService = require('../service/coursesService');
//configurar las rutas para cursos
//usarás los verbos http-> get, post, put, delete
router.get('/allCourses', (req, res) => {
    /*res.send({
        id: 1,
        name: 'Matematicas',
        duration: '27'
    });*/
    const coursesService = new CoursesService();
    try {
        const courses = coursesService.getAllCourses();
        res.status(200).json({
            ok: true,
            courses: courses
        });
    } catch (error) {
        res.status(200).json({
            ok: false,
            courses: []
        })
    }
})

router.post('/')


module.exports = router;