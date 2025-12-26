import { Contact } from "../Models/Contact.js";

// CREATE CONTACT
export const newContact = async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Name, email and phone are required",
        success: false,
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      type,
      user: req.user._id, // store only user ID
    });

    res.status(201).json({
      message: "Contact created successfully",
      success: true,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create contact",
      success: false,
    });
  }
};

// GET ALL CONTACTS
export const getAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0) {
      return res.status(404).json({
        message: "No contacts found",
        success: false,
      });
    }

    res.status(200).json({
      message: "All contacts fetched",
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contacts",
      success: false,
    });
  }
};

// GET CONTACT BY ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Contact fetched successfully",
      success: true,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contact",
      success: false,
    });
  }
};

// UPDATE CONTACT BY ID
export const updateContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return res.status(404).json({
        message: "Contact not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Contact updated successfully",
      success: true,
      contact: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update contact",
      success: false,
    });
  }
};

// DELETE CONTACT BY ID
export const deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Contact deleted successfully",
      success: true,
      contact: deletedContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete contact",
      success: false,
    });
  }
};

// GET CONTACTS OF LOGGED-IN USER
export const getContactByUserId = async (req, res) => {
  try {
    const userId = req.user._id; // from JWT

    const contacts = await Contact.find({ user: userId });

    if (contacts.length === 0) {
      return res.status(404).json({
        message: "No contacts found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Your contacts fetched successfully",
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contacts",
      success: false,
    });
  }
};
