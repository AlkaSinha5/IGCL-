const constants = require("../../helper/constants");
const Policy = require("../../models/policy");
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

// Directory where PDFs will be stored
const uploadDir = path.join(__dirname, '../../uploads/pdfs');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

exports.addPolicy = async (req, res) => {
  try {
    const {
      PolicyName,
      JudgmentTitle,
      JudgmentDescription,
      NotificationTitle,
      NotificationDescription,
    } = req.body;

    if (!req.files || !req.files.pdf) {
      return res
        .status(constants.status_code.header.server_error)
        .send({ error: "PDF file is required", success: false });
    }

    const file = req.files.pdf;
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Save the PDF to the local filesystem
    await file.mv(filePath);

    // Create the policy record in the database
    const policy = await Policy.create({
      PolicyName,
      PDF: fileName, // Store the file name in the database
      JudgmentTitle,
      JudgmentDescription,
      NotificationTitle,
      NotificationDescription,
    });

    return res
      .status(constants.status_code.header.ok)
      .send({
        message: constants.curd.add,
        success: true,
        // data: {
        //   policy,
        //   downloadLink: `/download/${policy._id}`, // Provide the download link
        // },
      });
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
    return res
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
    const { id } = req.params;
    const {
      PolicyName,
      JudgmentTitle,
      JudgmentDescription,
      NotificationTitle,
      NotificationDescription,
    } = req.body;

    let updatedData = {
      PolicyName,
      JudgmentTitle,
      JudgmentDescription,
      NotificationTitle,
      NotificationDescription,
    };

    if (req.files && req.files.pdf) {
      const file = req.files.pdf;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "raw",
      });
      updatedData.PDF = result.secure_url;
    }

    const policy = await Policy.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!policy) {
      return res
        .status(constants.status_code.header.not_found)
        .send({ error: "Policy not found", success: false });
    }

    return res.status(constants.status_code.header.ok).send({
      message: "Policy updated successfully",
      success: true,
      data: policy,
    });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
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
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      message: constants.curd.delete,
      success: true,
    });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};
