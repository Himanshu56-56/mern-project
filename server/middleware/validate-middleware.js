const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {

    const status = 422;

    // ✅ ALL ZOD ERRORS collect karo
    const extraDetails = err.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    const error = {
      status,
      message: "Fill the input properly",
      extraDetails,
    };

    next(error);
  }
};

module.exports = validate;
