import { body, validationResult } from "express-validator";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validaton of validations) {
      const result = await validaton.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() });
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters"),
];

export const signUpValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];
