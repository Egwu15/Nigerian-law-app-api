const router = require("express").Router();
const Obj = require("../model/Obj.model");
const { objValidation } = require("../validation");
const mongoose = require("mongoose");
const verify = require("../routes/verifyToken");

// ADD NEW QUESTION
router.post("/", verify, async (req, res) => {
  const { error } = objValidation(req.body);
  if (error) {
    return res.status(400).send(error["details"][0]["message"]);
  }

  //CHECKING IF THE QUESTION EXISTS
  const question = await Obj.findOne({ question: req.body.question });
  if (question)
    return res.status(400).send({ error: "Question already exists" });
  const obj = new Obj({
    question: req.body.question,
    option_a: req.body.option_a,
    option_b: req.body.option_b,
    option_c: req.body.option_c,
    option_d: req.body.option_d,
    course: req.body.course,
  });
  try {
    const result = await obj.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

// GET ALL QUESTIONS
router.get("/", async (req, res) => {
  try {
    const obj = await Obj.find();
    res.json({ data: obj });
  } catch (error) {
    res.send(error);
  }
});

// GET COURSES
router.get("/courses", (req, res) => {
  Obj.find().distinct("course", function (error, obj) {
    return res.json({ data: obj });
  });
});

// FIND QUESTION FROM PARTICULAR COURSE
router.get("/course/:co", async (req, res) => {
  const obj = await Obj.find({ course: req.params.co });
  res.json({ data: obj });
});

// UPDATE QUESTION
router.patch("/", verify, async (req, res) => {
  const { error } = objValidation(req.body);
  if (error) {
    return res.status(400).send(error["details"][0]["message"]);
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.id))
    return res.status(400).json({ error: "id not valid" });
  let obj = await Obj.findById(req.body.id);

  if (!obj) {
    return res.json({ error: "id not found" });
  }
  obj = await Obj.findByIdAndUpdate(
    req.body.id,
    {
      question: req.body.question,
      option_a: req.body.option_a,
      option_b: req.body.option_b,
      option_c: req.body.option_c,
      option_d: req.body.option_d,
      course: req.body.course,
    },
    { new: true }
    // function (err, res) {
    //   if (err) return res.status(400).send({ "error": err });
    //   res.json({ data: obj });
    // }
  );

  res.json({ data: obj });
});

//DELETE QUESTIONS
router.delete("/:id", verify, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "id not valid" });
  // let obj = await Obj.findById(req.body.id);
  const obj = await Obj.findByIdAndDelete(req.params.id);
  if (!obj) return res.status(404).json({ data: "question not found" });
  res.json({ deleted: true, data: obj });
});

module.exports = router;
