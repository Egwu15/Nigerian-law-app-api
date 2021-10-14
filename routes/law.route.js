const router = require("express").Router();
const Law = require("../model/Law.model");
const { lawValidation, lawSectionValidation } = require('../validation');


// add law
router.post("/", async (req, res) => {
    const { error } = lawValidation(req.body,);
    if (error) {
        return res.send(error['details'][0]['message']);
    }
    const lawExist = await Law.findOne({ law_name: req.body.law_name });
    console.log(lawExist);
    if (lawExist) return res.status(400).send({ "error": "Law already exist" });

    const law = new Law({
        law_name: req.body.law_name,
        description: req.body.description
    });
    try {
        savedLaw = await law.save();
        res.send({
            law_name: req.body.law_name,
            description: req.body.description
        })
    } catch (error) {
        res.status(400).send(error);
    }
});

//ADD SECTION

router.post("/:law", (req, res) => {
    const { error } = lawSectionValidation(req.body,);
    if (error) {
        return res.send(error['details'][0]['message']);
    }

    Law.findOne({ law_name: req.params.law }, function (error, response) {
        if (!response) {

            return res.json({ "error": "no such law exists" });

        }
        else {
            Law.findOne({ "law_content.section": req.body.section }).then((lawExists) => {

                if (lawExists) return res.status(400).send({ "error": "Section already exist" })
                else {
                    try {
                        response.law_content.push({
                            section: req.body.section,
                            content: req.body.content
                        });
                        response.save();
                        return res.json(response);
                    } catch (error) {
                        res.send(error)
                    }


                }
            });

        }

    });

    // res.send(law.law_name);
    // console.log(law);
});

// VIEW ALL LAWS

router.get('/', async (req, res) => {
    const laws = await Law.find({}, { law_name: 1, description: 1 });
    res.send(laws);
});

module.exports = router;