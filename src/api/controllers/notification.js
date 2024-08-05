const constants = require("../../helper/constants");
const Notification = require("../../models/notification");


exports.addNotification = async (req, res) => {
    try {
     const notification= await Notification.create(req.body);
    
        return res
          .status(constants.status_code.header.ok)
          .send({ message: constants.curd.add, success: true });
      } catch (error) {
        return res
          .status(constants.status_code.header.server_error)
          .send({ error: error.message, success: false });
      }
};



exports.getAllNotification = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      // Filter by PolicyId if provided
      const filter = { IsDeleted: false };
      if (req.query.PolicyId) {
        filter.PolicyId = req.query.PolicyId;
      }
  
      const records = await Notification.find(filter)
        .sort({ CreatedDate: -1 })
        .skip(skip)
        .limit(limit)
        .populate('PolicyId'); // Populate PolicyId field
  
      const totalCount = await Notification.countDocuments(filter);
  
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
  


exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate('PolicyId');;
    if (!notification) {
      return res
        .status(404)
        .json({ error: "Notification not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: notification, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!notification) {
      return res
        .status(404)
        .json({ error: "Notification not found", success: false });
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

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!notification) {
      return res
        .status(404)
        .json({ error: "Notification not found", success: false });
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

 
