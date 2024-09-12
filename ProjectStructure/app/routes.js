const router = require("express").Router();

router.get("/health", (_req, res) => {
  const error = new Error("Hey this is error");

  error.status = 500;
  next(error);
  res.status(200).json({ message: "Success" });
});

module.exports = router;
