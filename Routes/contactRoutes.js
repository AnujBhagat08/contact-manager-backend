import express from "express";
import {
  deleteContactById,
  getAllContact,
  getContactById,
  getContactByUserId,
  newContact,
  updateContactById,
} from "../Controllers/contactController.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

//  CREATE CONTACT
// @api name    : Create contact
// @api method  : POST
// @api endpoint: /api/contact/new
router.post("/new", isAuthenticated, newContact);

//  GET ALL CONTACTS
// @api name    : Get all contacts
// @api method  : GET
// @api endpoint: /api/contact
router.get("/", getAllContact);

//  GET CONTACT BY SPECIFIC USER ID
// @api name    : Get contact by specific user ID
// @api method  : GET
// @api endpoint: /api/contact/userid/:id
router.get("/userid", isAuthenticated, getContactByUserId);

//  GET CONTACT BY ID
// @api name    : Get contact by ID
// @api method  : GET
// @api endpoint: /api/contact/:id
router.get("/:id", getContactById);

//  UPDATE CONTACT
// @api name    : Update contact by ID
// @api method  : PUT
// @api endpoint: /api/contact/:id
router.put("/:id", isAuthenticated, updateContactById);

//  DELETE CONTACT
// @api name    : Delete contact by ID
// @api method  : DELETE
// @api endpoint: /api/contact/:id
router.delete("/:id", isAuthenticated, deleteContactById);

export default router;
