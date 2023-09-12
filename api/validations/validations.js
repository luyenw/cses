const Joi = require('joi')
const PasswordComplexity = require("joi-password-complexity");
const complexityOptions = {
  min: 5,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};
class Validation{
  constructor(){

  }
  static submissionSchema = Joi.object({
    task_id: Joi.number().integer().min(0).required(),
    user_id: Joi.number().integer().min(0).required(),
    lang: Joi.string().valid('C', 'C++').required(),
    source_code: Joi.string().required()
  });
  static taskSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
      time_limit: Joi.number().min(0).required(),
      memory_limit: Joi.number().min(0).required(),
      testcases: Joi.array().items({
        input: Joi.string().min(0),
        output: Joi.string().min(0)
      })
  });
  static registerSchema = Joi.object({
      username: Joi.string().min(5).required(),
      password: PasswordComplexity(complexityOptions),
      name: Joi.string().required(),
  });
  static validate(body, schema){
    const { error, value } = schema.validate(body);
      if (error) {
        throw new Error(error.details[0].message);
      }
      return value;
  }
  static validateRegister(inp){
    return Validation.validate(inp, Validation.registerSchema)
  }
  static validateTask(inp){
    return Validation.validate(inp, Validation.taskSchema)
  }
  static validateSubmission(inp){
    return Validation.validate(inp, Validation.submissionSchema)
  }
}
module.exports.Validation = Validation