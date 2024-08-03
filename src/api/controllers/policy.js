const constants = require("../../helper/constants");
const Policy = require("../../models/policy");


exports.addPolicy = async (req, res) => {
  try {

    const policy= await Policy.create(req.body);

    return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
  }
};



exports.getAllPolicy = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const records = await Policy.find({ IsDeleted: false })
      .sort({ CreatedDate: -1 })
      .skip(skip)
      .limit(limit);

    
    const totalCount = await Policy.countDocuments({ IsDeleted: false });

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


exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res
        .status(404)
        .json({ error: "Policy not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: policy, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!policy) {
      return res
        .status(404)
        .json({ error: "Policy not found", success: false });
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

exports.deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!policy) {
      return res
        .status(404)
        .json({ error: "Policy not found", success: false });
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

 
