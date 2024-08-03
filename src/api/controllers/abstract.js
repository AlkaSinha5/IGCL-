const constants = require("../../helper/constants");
const Abstract = require("../../models/abstract");

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Ensure you have set up your Cloudinary configuration
cloudinary.config({
  cloud_name: "dhzk0ztrn",
  api_key: "571339484391153",
  api_secret: "WWmOJpVF5y02r7Blu2oAr0RxbU0",
});

exports.addAbstract = async (req, res) => {
  try {
    const { PolicyId } = req.body;
    if (!req.files || !req.files.pdf) {
      return res
        .status(constants.status_code.header.server_error)
        .send({ error: "PDF file is required", success: false });
    }

    const file = req.files.pdf;
    const result = await cloudinary.uploader.upload(file.tempFilePath);

    const abstract = await Abstract.create({
      PolicyId,
      PDF: result.secure_url,
    });

    return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
  }
};



exports.getAllAbstract = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      // Filter by PolicyId if provided
      const filter = { IsDeleted: false };
      if (req.query.PolicyId) {
        filter.PolicyId = req.query.PolicyId;
      }
  
      const records = await Abstract.find(filter)
        .sort({ CreatedDate: -1 })
        .skip(skip)
        .limit(limit)
        .populate('PolicyId'); // Populate PolicyId field
  
      const totalCount = await Abstract.countDocuments(filter);
  
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
  


exports.getAbstractById = async (req, res) => {
  try {
    const abstract = await Abstract.findById(req.params.id).populate('PolicyId');;
    if (!abstract) {
      return res
        .status(404)
        .json({ error: "Abstract not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: abstract, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateAbstract = async (req, res) => {
  try {
    const abstract = await Abstract.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!abstract) {
      return res
        .status(404)
        .json({ error: "Abstract not found", success: false });
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

exports.deleteAbstract = async (req, res) => {
  try {
    const abstract = await Abstract.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!abstract) {
      return res
        .status(404)
        .json({ error: "Abstract not found", success: false });
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

 
