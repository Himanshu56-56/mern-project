const { z } = require("zod");


const loginSchema = z.object({

     email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid email format" }), // ✅ MAIN FIX

     password: z
    .string({ required_error: "Password is Required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),

});
const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),

 
  phone: z
    .string({ required_error: "Phone is Required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),

 
});

module.exports = { signupSchema, loginSchema };

