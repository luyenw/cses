const Class = require("../schemas/Class");
const Enrollment = require("../schemas/Enrollment");
const axios = require("axios");
var controller = {
  new_ps: async (req, res) => {
    console.log('new ps')
    const user_id = res.locals.user.id;
    const course_id = req.params.id;
    const enrollment = await Enrollment.findOne({
      where: { user_id: user_id, class_id: course_id, role: 0 },
    });
    if (enrollment) {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${req.body.username}`
        );
        const user_id = response.data.id;
        await Enrollment.create({
          user_id: user_id,
          class_id: course_id,
          enrollment_date: Date.now(),
          role: 1,
        });
      } catch (err) {
        console.log(err);
      }
      return res.sendStatus(200);
    }
    console.log('404')
    return res.sendStatus(404);
  },
  get_ps: async (req, res) => {
    const id = req.params.id;
    var ps_id = await Enrollment.findAll({ where: { class_id: id } });
    if (ps_id) {
      var ps = await Promise.all(
        ps_id.map(async (x) => {
          const response = await axios.get(
            `http://localhost:3001/user/${x.dataValues.user_id}`
          );
          return { ...response.data, role: x.dataValues.role };
        })
      );
      return res.status(200).json( ps );
    } else {
      return res.sendStatus(301);
    }
  },
  get_by_id: async (req, res) => {
    const id = req.params.id;
    const user_id = res.locals.user.id;
    const enrollment = await Enrollment.findOne({
      where: { class_id: id, user_id: user_id },
    });
    if (enrollment) {
      var course = await Class.findByPk(id);
      course.dataValues.role = enrollment.role;
      if (!course.role) delete course.class_code;
      return res.status(200).json(course);
    } else {
      return res.sendStatus(403);
    }
  },
  get_root: async (req, res) => {
    const classes = await Enrollment.findAll({
      where: { user_id: res.locals.user.id },
    });
    const ids = await Promise.all(
      classes.map(async (x) => await Class.findByPk(x.class_id))
    );
    return res.status(200).json(ids);
  },
  new_class: async (req, res) => {
    try {
      const new_class = await Class.create({
        title: req.body.title,
        description: req.body.description,
        class_code: (Math.random() + 1).toString(36).substring(5),
      });
      const class_id = new_class.id;
      const enroll = await Enrollment.create({
        user_id: res.locals.user.id,
        class_id: class_id,
        enrollment_date: Date.now(),
        role: 0,
      });
      res.status(200).json({ new_class: new_class, new_enrollment: enroll });
    } catch (e) {
      res.status(300).send(e);
    }
  },
};
module.exports = controller;
