const constants = require("../../helper/constants");
const sendEmail = require("../../helper/sendMail");
const Contact = require("../../models/contact");

exports.addContact = async (req, res) => {
  try {
    const { Name, Email, Message, ...contactData } = req.body;
    const AdminEmail = "sinhaalka802211@gmail.com";
    const UserMessage = `Dear ${Name},\n\nThanks for your query. We have received it and will get back to you shortly.\n\nBest regards,\nIGCL Team`;
    const AdminMessage = `New contact message from IGCL:\n\nName: ${Name}\nEmail: ${Email}\nMessage: ${Message}`;

    // Create contact in the database
    const contact = await Contact.create({ Name, Email, Message, ...contactData });

    // Send emails in parallel
    const emailPromises = [
      sendEmail(Email, "Your Query Raised", UserMessage),
      sendEmail(AdminEmail, "Contact Mail From IGCL", AdminMessage)
    ];

    // Wait for email sending promises to resolve
    await Promise.all(emailPromises);

    // Return success response
    return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });

  } catch (error) {
    console.error('Error in addContact:', error);

    // Return error response
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
  }
};


exports.getAllContact= async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;
    const search = req.query.search || '';
       
    const searchQuery = {
      IsDeleted: false,
      
    };

    const totalCount = await Contact.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / size);

    const records = await Contact.find(searchQuery)
      .sort({ CreatedDate: -1 })
      .skip((pageNumber - 1) * size)
      .limit(size)
      ;
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: records,
      success: true,
      totalCount: totalCount,
      count: records.length,
      pageNumber: pageNumber,
      totalPages: totalPages,
    });
  } catch (error) {
    res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.getUPIContactById = async (req, res) => {
  try {
    const Contact = await Contact.findById(req.params.id);
    if (!Contact) {
      return res
        .status(404)
        .json({ error: "Contact not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: Contact, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const Contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Contact) {
      return res
        .status(404)
        .json({ error: "Contact not found", success: false });
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

exports.deleteContact = async (req, res) => {
  try {
    const Contact = await Contact.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!Contact) {
      return res
        .status(404)
        .json({ error: "Contact not found", success: false });
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

