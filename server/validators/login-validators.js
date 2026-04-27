const { z } = require("zod");

const loginSchema = z.object({
  email: z.string({ required_error: "Email is Required" })
    .trim()
    .min(3, { message: "Email is Required" }),

  password: z.string({ required_error: "Password is Required" })
    .trim()
    .min(6, { message: "Password is Required" }),
});

module.exports = loginSchema;
