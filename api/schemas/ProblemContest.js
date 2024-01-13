const { DataTypes, Sequelize } = require("sequelize");
const User = require("./User");
const Contest = require("./Contest");
const Problem = require("./Problem");
const sequelize = new Sequelize("cses", "root", "Luyendkdk1", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});
const ProblemContest = sequelize.define("problem_contest", {
  problem_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  contest_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});
ProblemContest.sync();

ProblemContest.hasOne(Problem, {foreignKey: 'id'});
Problem.belongsTo(ProblemContest, {foreignKey: 'id', targetKey: 'problem_id'});

module.exports = ProblemContest;
