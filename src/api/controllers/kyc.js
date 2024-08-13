const constants = require("../../helper/constants");
const KYC = require("../../models/kyc");


exports.addKYC = async (req, res) => {
  try {

    const kyc= await KYC.create(req.body);

    return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
  }
};



exports.getAllKYC = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const records = await KYC.find({ IsDeleted: false })
      .sort({ CreatedDate: -1 })
      .skip(skip)
      .limit(limit);

    
    const totalCount = await KYC.countDocuments({ IsDeleted: false });

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


exports.getKYCById = async (req, res) => {
  try {
    const kyc = await KYC.findById(req.params.id);
    if (!kyc) {
      return res
        .status(404)
        .json({ error: "KYC not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: KYC, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateKYC = async (req, res) => {
  try {
    const kyc = await KYC.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!kyc) {
      return res
        .status(404)
        .json({ error: "KYC not found", success: false });
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

exports.deleteKYC = async (req, res) => {
  try {
    const kyc = await KYC.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!kyc) {
      return res
        .status(404)
        .json({ error: "KYC not found", success: false });
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

 
