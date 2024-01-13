const Class = require("../schemas/Class");
const Enrollment = require("../schemas/Enrollment");
const axios = require("axios");
const Module = require("../schemas/Module");
const Page = require("../schemas/Page");
const PagesByModule = require("../schemas/PagesByModule");
var controller = {
  new_ps: async (req, res) => {
    const user_id = res.locals.user.id;
    const course_id = req.params.id;
    const enrollment = await Enrollment.findOne({
      where: { user_id: user_id, class_id: course_id, role: 0 },
    });
    if (enrollment) {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${req.body.username}`
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
    return res.sendStatus(404);
  },
  get_ps: async (req, res) => {
    const id = req.params.id;
    var ps_id = await Enrollment.findAll({ where: { class_id: id } });
    if (ps_id) {
      var ps = await Promise.all(
        ps_id.map(async (x) => {
          const response = await axios.get(
            `http://localhost:3001/users/${x.dataValues.user_id}`
          );
          return { ...response.data, role: x.dataValues.role };
        })
      );
      return res.status(200).json(ps);
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
      const modules = await Module.findAll({ where: { course_id: id } });
      course.dataValues.modules = modules;
      return res.status(200).json(course);
    } else {
      return res.sendStatus(403);
    }
  },
  get_root: async (req, res) => {
    console.log(res.locals.user.id);
    try {
      const classes = await Enrollment.findAll({
        where: { user_id: res.locals.user.id },
      });
      const ids = await Promise.all(
        classes.map(async (x) => await Class.findByPk(x.class_id))
      );
      return res.status(200).json(ids);
    } catch (err) {
      return res.status(404);
    }
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
  new_module: async (req, res) => {
    try {
      const { course_id, name } = req.body;
      const n = await Module.findAll({ where: { course_id: course_id } });
      const module = await Module.create({
        course_id: course_id,
        name: name,
        position: n.length + 1,
        pusblished: 0,
      });
      const modules = await Module.findAll({ where: { course_id: course_id } });
      return res.status(200).json(modules);
    } catch (err) {}
  },
  new_page: async (req, res) => {
    const { title, body } = req.body;
    const page = await Page.create({
      user_id: res.locals.user.id,
      title: title,
      body: body,
    });
    console.log(page.dataValues);
    return res.sendStatus(200);
  },
  add_item: async (req, res) => {
    const module_id = req.params.module_id;
    const { item_id } = req.body;
    const relation = await PagesByModule.create({
      page_id: item_id,
      module_id: module_id,
    });
    return res.sendStatus(200);
  },
  get_items: async (req, res) => {
    try {
      const module_id = req.params.module_id;
      console.log(module_id);
      const items_idx = await PagesByModule.findAll({
        where: { module_id: module_id },
      });
      const items = await Promise.all(
        items_idx.map(async (x) => {
          const p = await Page.findByPk(x.dataValues.page_id);
          return p.dataValues;
        })
      );
      return res.status(200).json(items);
    } catch (err) {
      return res.sendStatus(301);
    }
  },
  get_pages: async (req, res) => {
    try {
      const course_id = req.params.id;
      console.log(course_id)
      var pages = await Page.findAll({where: {course_id: course_id}})
      pages.map(x=>x.dataValues)
      return res.status(200).json(pages);
    } catch (err) {
      console.log(err)
    }
  },
  get_page: async (req, res) => {
    try {
      const { id, page_id } = req.params;
      const page = await Page.findByPk(page_id);
      return res.status(200).json(page.dataValues);
    } catch (err) {
      return res.sendStatus(404);
    }
  },
};
module.exports = controller;
