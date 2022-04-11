const express = require('express');
const router = new express.Router();
const {Law} = require('../model/Law.model');
const verify = require('../utility/verifyToken');
const {
  lawValidation,
  lawSectionValidation,
  lawSectionOnlyValidation,
} = require('../utility/validations/validation');
const logger = require('../logger/logger');

// add law
router.post('/laws/', verify, async (req, res) => {
  const {error} = lawValidation(req.body);
  if (error) {
    return res.status(400).send(error['details'][0]['message']);
  }
  const lawExist = await Law.findOne({law_name: req.body.law_name});
  console.log(lawExist);
  if (lawExist) return res.status(400).send({error: 'Law already exist'});

  const law = new Law({
    law_name: req.body.law_name,
    description: req.body.description,
  });
  try {
    await law.save();
    res.send({
      law_name: req.body.law_name,
      description: req.body.description,
    });
  } catch (error) {
    res.status(400).json({error: error});
  }
});

// SEARCH ALL SECTIONS
router.get('/laws/search/:search', async (req, res) => {
  const law = await Law.find(
      {
        'law_content.content': {$regex: req.params.search, $options: 'i'},
      },
      {
        law_content: {
          $elemMatch: {content: {$regex: req.params.search, $options: 'i'}},
        },
        law_name: 1,
      }
  );

  res.send(law);
});

// ADD SECTION

router.post('/laws/:law', verify, (req, res) => {
  const {error} = lawSectionValidation(req.body);
  if (error) {
    return res.status(400).send(error['details'][0]['message']);
  }

  Law.findOne({law_name: req.params.law}, function(error, response) {
    if (!response) {
      return res.json({error: 'no such law exists'});
    } else {
      Law.findOne({
        'law_name': req.params.law,
        'law_content.section': req.body.section,
      }).then((lawExists) => {
        if (lawExists) {
          return res.status(400).send({error: 'Section already exist'});
        } else {
          try {
            response.law_content.push({
              section: req.body.section,
              content: req.body.content,
            });
            response.save();
            return res.json(response);
          } catch (error) {
            res.json({error: error});
          }
        }
      });
    }
  });

  // res.send(law.law_name);
  // console.log(law);
});

// VIEW ALL LAWS

router.get('/laws/', async (req, res) => {
  console.log('viewing  laws');
  try {
    const laws = await Law.find({}, {law_name: 1, description: 1});
    res.json(laws);
  } catch (e) {
    logger.error(e.toString());
  }
});

// VIEW ALL SECTIONS OF A LAW
router.get('/laws/:law', async (req, res) => {
  const laws = await Law.find({law_name: req.params.law}, {law_content: 1});

  if (!laws) {
    console.log(laws);
    return res.status(404).json({
      'error': 'no laws were found under that name',
    });
  }
  res.json({lawContent: laws});
});

// UPDATE SECTION
router.patch('/laws/:law', verify, async (req, res) => {
  const {error} = lawSectionValidation(req.body);
  if (error) {
    return res.status(400).send(error['details'][0]['message']);
  }
  try {
    const law = await Law.findOneAndUpdate(
        {'law_name': req.params.law, 'law_content.section': req.body.section},
        {'law_content.$.content': req.body.content},
        {fields: {law_content: 1}, new: true}
    );
    if (!law) return res.json({error: 'no law was found'});

    law.save();
    res.json({Law_content: law});
  } catch (error) {
    console.log(error);
  }
});

// DELETE A SECTION
router.delete('/laws/:law', verify, async (req, res) => {
  const {error} = lawSectionOnlyValidation(req.body);
  if (error) {
    return res.send(error['details'][0]['message']);
  }
  try {
    await Law.findOne({
      'law_name': 'civil litigation',
      'law_content.section': req.body.section,
    }).then(async (lawExist) => {
      //   console.log(lawExist);
      if (lawExist) {
        const law = await Law.findOneAndUpdate(
            {
              law_name: 'civil litigation',
            },
            {
              $pull: {law_content: {section: req.body.section}},
            },
            {fields: {law_content: 1}, new: true}
        );
        res.json({staus: 'deleted', data: law});
      } else return res.json({error: 'the law dosen\'t exist'});
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
