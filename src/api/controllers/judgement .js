const constants = require("../../helper/constants");
const Judgement = require("../../models/judgement ");


exports.addJudgement = async (req, res) => {
    try {
     const judgement= await Judgement.create(req.body);
    
        return res
          .status(constants.status_code.header.ok)
          .send({ message: constants.curd.add, success: true });
      } catch (error) {
        return res
          .status(constants.status_code.header.server_error)
          .send({ error: error.message, success: false });
      }
};



exports.getAllJudgement = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      // Filter by PolicyId if provided
      const filter = { IsDeleted: false };
      if (req.query.PolicyId) {
        filter.PolicyId = req.query.PolicyId;
      }
  
      const records = await Judgement.find(filter)
        .sort({ CreatedDate: -1 })
        .skip(skip)
        .limit(limit)
        .populate('PolicyId'); // Populate PolicyId field
  
      const totalCount = await Judgement.countDocuments(filter);
  
      const totalPages = Math.ceil(totalCount / limit);
  
      return res.status(constants.status_code.header.ok).send({
        statusCode: 200,
        data: records,
        page,
        totalPages,
        totalCount,
        success: true,
      });
    } catch (error) {
      res
        .status(constants.status_code.header.server_error)
        .send({ statusCode: 500, error: error.message, success: false });
    }
  };
  


exports.getJudgementById = async (req, res) => {
  try {
    const judgement = await Judgement.findById(req.params.id).populate('PolicyId');;
    if (!judgement) {
      return res
        .status(404)
        .json({ error: "Judgement not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: judgement, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateJudgement = async (req, res) => {
  try {
    const judgement = await Judgement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!judgement) {
      return res
        .status(404)
        .json({ error: "Judgement not found", success: false });
    }
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.update, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.deleteJudgement = async (req, res) => {
  try {
    const judgement = await Judgement.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!judgement) {
      return res
        .status(404)
        .json({ error: "Judgement not found", success: false });
    }
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.delete, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

 
