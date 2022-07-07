const express = require("express");
const router = express.Router();
const multer = require("multer");
const routeverivication = require("../middlewares/routeverivication");
const AdminauthController = require("../controllers/adminauth/adminauthcontroller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const sss = cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/updatepassword",
  routeverivication,
  AdminauthController.post_update_password_set
);
router.post(
  "/updateprofile",
  routeverivication,
  upload.single("userImage"),
  AdminauthController.post_update_profile_details
);
router.get(
  "/profiledetails",
  routeverivication,
  AdminauthController.gets_users_all_details
);
router.post(
  "/signup",
  upload.single("userImage"),
  AdminauthController.post_adminregister
);
router.post("/login", AdminauthController.post_admin_user_login);
router.post("/forgotpassword", AdminauthController.post_admin_forgot_password);
router.get(
  "/reset-password/:id/:token",
  AdminauthController.get_admin_reset_password
);
router.post(
  "/reset-password/:id/:token",
  AdminauthController.post_admin_reset_password
);
router.post("/googleauthapp", AdminauthController.post_google_authenticator);
router.post(
  "/googleauthtokenverify",
  AdminauthController.post_google_auth_code_verify
);
router.post(
  "/2faactive-inactive",
  routeverivication,
  AdminauthController.twofachagestatus
);
router.post(
  "/mass_email",
  routeverivication,
  AdminauthController.post_mass_email
);

module.exports = router;
