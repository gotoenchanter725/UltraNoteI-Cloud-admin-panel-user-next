const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/adminuser");
const User = require("../../models/user");
const JWT_SERECT = "some super secret ...";
const nodemailer = require("nodemailer");
const uuid = require("uuid");
const uniqid = require("uniqid");
const fs = require("fs");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const mailjet = require("node-mailjet").connect(
  "6938f56f5fc30428c70f53aab4330f5c",
  "b3a11bd9434c5b665ecd158c9d3a5522"
);
const sendMail = require("../../helpers/sendMail");

exports.gets_users_all_details = (req, res, next) => {
  Admin.find({ _id: req.userData.userId })
    .select("firstname lastname phoneno _id username email userImage faactive ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map((doc) => {
          return {
            firstname: doc.firstname,
            lastname: doc.lastname,
            username: doc.username,
            phonenumber: doc.phoneno,
            email: doc.email,
            userImage: doc.userImage, //"https://portal.ultranote.org/"
            _id: doc._id,
            twofastatus: doc.faactive,
            request: {
              type: "GET",
              url: "https://portal.ultranote.org/" + doc._id,
            },
          };
        }),
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.post_adminregister = (req, res, next) => {
  // console.log(req.file);
  const id = uuid.v4();
  try {
    const path = `/user/${id}`;
    // Create temporary secret until it it verified
    const temp_secret = speakeasy.generateSecret();
    // Create user in the database
    Admin.find({ email: req.body.email })
      .exec()
      .then((admin) => {
        if (admin.length >= 1) {
          return res.status(200).json({
            message: "Mail exists",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(200).json({
                error: err,
              });
            } else {
              const nuwuser = new Admin({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                userImage: req.file.path,
                password: hash,
                phoneno: req.body.phoneno,
                gauthidt: id,
                gsecrettoken: temp_secret.base32,
                gsecretqrcode: temp_secret.otpauth_url,
              });
              nuwuser
                .save()
                .then((result) => {
                  res.status(200).json({
                    message: "User created",
                    user: result,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(200).json({
                    error: err,
                  });
                });
            }
          });
        }
      });

    // Send user id and base32 key to user
    // res.json({ id, secret: temp_secret })
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: "Error generating secret key" });
  }
};

exports.post_admin_user_login = (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then((admin) => {
      if (admin.length < 1) {
        return res.status(200).json({
          message: "Email is Not Exist",
        });
      }
      bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
        if (err) {
          return res.status(200).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: admin[0].email,
              userId: admin[0]._id,
            },
            process.env.JWT_KEY || "serectserect",
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user: admin[0],
          });
        }
        res.status(200).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        error: err,
      });
    });
};

exports.post_admin_forgot_password = async (req, res, next) => {
  try {
    const { email } = req.body;

    const admin = await Admin.find({ email: email }).exec();
    if (admin.length < 1) {
      return res.status(200).json({
        message: "Email is not exist",
      });
    }
    const serect = JWT_SERECT + admin[0].password;
    const payload = {
      email: admin[0].email,
      id: admin[0]._id,
    };

    const token = await jwt.sign(payload, serect, { expiresIn: "15m" });
    const link = `https://portal.ultranote.org/reset-password/${admin[0]._id}/${token}`;

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "support@ultranote.org",
            Name: "UltraNote Cloud",
          },
          To: [
            {
              Email: `${email}`,
              Name: admin[0].firstname + " " + admin[0].lastname,
            },
          ],
          Subject: "Reset Password",
          TextPart: "Reset Your password",
          HTMLPart: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
            <head> 
             <meta charset="UTF-8"> 
             <meta content="width=device-width, initial-scale=1" name="viewport"> 
             <meta name="x-apple-disable-message-reformatting"> 
             <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
             <meta content="telephone=no" name="format-detection"> 
             <title>activer compte</title> 
             <!--[if (mso 16)]>
               <style type="text/css">
               a {text-decoration: none;}
               </style>
               <![endif]--> 
             <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
             <!--[if gte mso 9]>
            <xml>
               <o:OfficeDocumentSettings>
               <o:AllowPNG></o:AllowPNG>
               <o:PixelsPerInch>96</o:PixelsPerInch>
               </o:OfficeDocumentSettings>
            </xml>
            <![endif]--> 
             <style type="text/css">
            #outlook a {
               padding:0;
            }
            .ExternalClass {
               width:100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
               line-height:100%;
            }
            .es-button {
               mso-style-priority:100!important;
               text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
               color:inherit!important;
               text-decoration:none!important;
               font-size:inherit!important;
               font-family:inherit!important;
               font-weight:inherit!important;
               line-height:inherit!important;
            }
            .es-desk-hidden {
               display:none;
               float:left;
               overflow:hidden;
               width:0;
               max-height:0;
               line-height:0;
               mso-hide:all;
            }
            .es-button-border:hover {
               background:#ffffff!important;
               border-style:solid solid solid solid!important;
               border-color:#3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
            }
            td .es-button-border:hover a.es-button-1 {
               color:#002147!important;
            }
            td .es-button-border-2:hover {
               border-color:#002147 #002147 #002147 #002147!important;
               background:#ffffff!important;
            }
            @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:20px!important; text-align:center; line-height:120%!important } h2 { font-size:16px!important; text-align:left; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:20px!important } h2 a { font-size:16px!important; text-align:left } h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:10px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:14px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } }
            </style> 
            </head> 
            <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
             <div class="es-wrapper-color" style="background-color:#FAFAFA"> 
              <!--[if gte mso 9]>
                       <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                           <v:fill type="tile" color="#fafafa"></v:fill>
                       </v:background>
                   <![endif]--> 
              <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
                <tr style="border-collapse:collapse"> 
                 <td valign="top" style="padding:0;Margin:0"> 
                  <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                    <tr style="border-collapse:collapse"> 
                     <td class="es-adaptive" align="center" style="padding:0;Margin:0"> 
                      <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3D5CA3;width:600px" cellspacing="0" cellpadding="0" bgcolor="#3d5ca3" align="center"> 
                        <tr style="border-collapse:collapse"> 
                         <td style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#002147" bgcolor="#002147" align="left"> 
                          <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                             <td align="left" style="padding:0;Margin:0;width:560px"> 
                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://irsiye.stripocdn.email/content/guids/CABINET_8a063812954f64006cf00ff5a3ba22c6/images/16231607211822703.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                </tr> 
                              </table></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table></td> 
                    </tr> 
                  </table> 
                  <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                    <tr style="border-collapse:collapse"> 
                     <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center"> 
                      <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
                        <tr style="border-collapse:collapse"> 
                         <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top" bgcolor="transparent" align="left"> 
                          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                             <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                              <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top" width="100%" cellspacing="0" cellpadding="0" role="presentation"> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0"><img src="https://irsiye.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="175"></td> 
                                </tr> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333"><b>Lost your password !!&nbsp;</b></h1></td> 
                                </tr> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666"><br>Hello ${admin[0].firstname}  ${admin[0].lastname}</p></td> 
                                </tr> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666">We hope that you liked the experience</p></td> 
                                </tr> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666">In order to reset your password<br>the confirm button&nbsp;</p></td> 
                                </tr> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px"><span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#002147;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto"><a href="${link}" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#002147;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center">reset my password</a></span></td>
                                </tr> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:32px;color:#CC0000">The Activation process is valid for 7 days.<span data-cke-bookmark="1" style="display:none"></span></p></td> 
                                </tr> 
                              </table></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                        <tr style="border-collapse:collapse"> 
                         <td style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;background-position:center center" align="left"> 
                          <!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:199px" valign="top"><![endif]--> 
                          <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                            <tr style="border-collapse:collapse"> 
                             <td align="left" style="padding:0;Margin:0;width:199px"> 
                              <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center" width="100%" cellspacing="0" cellpadding="0" role="presentation"> 
                                <tr style="border-collapse:collapse"> 
                                 <td class="es-m-txt-c" align="right" style="padding:0;Margin:0;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666"><strong>Follow us:</strong></p></td> 
                                </tr> 
                              </table></td> 
                            </tr> 
                          </table> 
                          <!--[if mso]></td><td style="width:20px"></td><td style="width:361px" valign="top"><![endif]--> 
                          <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                            <tr style="border-collapse:collapse"> 
                             <td align="left" style="padding:0;Margin:0;width:361px"> 
                              <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center" width="100%" cellspacing="0" cellpadding="0" role="presentation"> 
                                <tr style="border-collapse:collapse"> 
                                 <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px;font-size:0"> 
                                  <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                    <tr style="border-collapse:collapse"> 
                                     <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img src="https://irsiye.stripocdn.email/content/assets/img/social-icons/logo-colored/facebook-logo-colored.png" alt="Fb" title="Facebook" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                     <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img src="https://irsiye.stripocdn.email/content/assets/img/social-icons/logo-colored/twitter-logo-colored.png" alt="Tw" title="Twitter" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                     <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img src="https://irsiye.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Ig" title="Instagram" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                     <td valign="top" align="center" style="padding:0;Margin:0"><img src="https://irsiye.stripocdn.email/content/assets/img/social-icons/logo-colored/linkedin-logo-colored.png" alt="In" title="Linkedin" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                    </tr> 
                                  </table></td> 
                                </tr> 
                              </table></td> 
                            </tr> 
                          </table> 
                          <!--[if mso]></td></tr></table><![endif]--></td> 
                        </tr> 
                        <tr style="border-collapse:collapse"> 
                         <td style="Margin:0;padding-top:5px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:left top" align="left"> 
                          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                             <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666">Contact us:&nbsp;<a target="_blank" href="mailto:support@ultranote.org" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#666666">support@ultranote.org</a></p></td> 
                                </tr> 
                              </table></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table></td> 
                    </tr> 
                  </table> 
                  <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                    <tr style="border-collapse:collapse"> 
                     <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center"> 
                      <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                        <tr style="border-collapse:collapse"> 
                         <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;background-color:#F06939" bgcolor="#f06939" align="left"> 
                          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                             <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><h2 style="Margin:0;line-height:19px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;font-style:normal;font-weight:normal;color:#FFFFFF"><strong>You have Questions</strong></h2></td> 
                                </tr> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="left" style="padding:0;Margin:0;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF">We are always here to guide for better experience<a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#FFFFFF" href=""></a></p></td> 
                                </tr> 
                              </table></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table></td> 
                    </tr> 
                  </table> 
                  <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                    <tr style="border-collapse:collapse"> 
                     <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center"> 
                      <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center"> 
                        <tr style="border-collapse:collapse"> 
                         <td align="left" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px"> 
                          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                             <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                              <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                <tr style="border-collapse:collapse"> 
                                 <td align="center" style="padding:0;Margin:0;display:none"></td> 
                                </tr> 
                              </table></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table> 
             </div>  
            </body>
            </html>`,
        },
      ],
    });
    request
      .then((result) =>
        res.status(200).json({
          response: result.body,
          message: "Email Has Been Send",
        })
      )
      .catch((error) =>
        res.status(200).json({
          response: error.message,
          message: "Email Has Been Send Error",
        })
      );
  } catch (error) {
    res.status(200).json({
      response: error,
      message: "Email Has Been Send Error",
    });
  }
};

exports.get_admin_reset_password = (req, res, next) => {
  const { id, token } = req.params;
  Admin.find({ _id: id })
    .exec()
    .then((admin) => {
      if (admin.length < 1) {
        return res.status(200).json({
          message: "User Not Exist",
        });
      }
      const serect = JWT_SERECT + admin[0].password;
      try {
        const payload = jwt.verify(token, serect);
        res.status(200).json({
          message: "user verified",
          email: payload.email,
        });
      } catch (error) {
        console.log(error);
        res.status(200).json({
          message: "user in not verified",
          error: error,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        error: err,
      });
    });
};

exports.post_admin_reset_password = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    let admin = await Admin.findById(id);
    if (!admin) {
      return res.status(200).json({
        message: "User Not Exist",
      });
    }
    admin.password = await bcrypt.hash(password, 10);
    await admin.save();
    return res.status(200).json({
      message: "User Password changed",
      data: admin,
    });
  } catch (ex) {
    return res.status(200).json({
      error: ex.message,
      message: ex.message,
    });
  }
};

exports.post_google_authenticator = async (req, res, next) => {
  try {
    const { email } = req.body;
    const admin = await Admin.find({ email: email }).exec();
    if (admin.length < 1) {
      return res.status(200).json({
        message: "Email is not exist",
      });
    } else if (!admin[0].faactive) {
      return res.status(200).json({
        message: "Your 2FA Authentication Failed",
      });
    } else {
      const data_url = await QRCode.toDataURL(admin[0].gsecretqrcode);
      const datanow = new Date();
      const filename = admin[0].email.slice(0, -4) + datanow;

      const finalname = filename;
      const finalstring = filename.slice(0, -37);
      const check = finalstring.replace(/ /g, "");
      // console.log('kkl=>',typeof check)
      const filesname = check + ".png";
      const filelocation = "./qrbucket/";
      const newString = filelocation.concat(filesname);
      const base64Data = data_url.replace(/^data:image\/png;base64,/, "");
      require("fs").writeFileSync(newString, base64Data, "base64");
      const html = "https://portal.ultranote.org/qrbucket/";
      const newfinalhtml = html.concat(filesname);
      // console.log(newfinalhtml);

      const request = mailjet
        .post("send", { version: "v3.1" })
        .request({
          Messages: [
            {
              From: {
                Email: "support@ultranote.org",
                Name: "UltraNote Cloud",
              },
              To: [
                {
                  Email: `${email}`,
                  Name: admin[0].firstname + " " + admin[0].lastname,
                },
              ],
              Subject: "2FA Auth Google Authenticator",
              TextPart: " Google Authenticator",
              HTMLPart: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
         <head> 
          <meta charset="UTF-8"> 
          <meta content="width=device-width, initial-scale=1" name="viewport"> 
          <meta name="x-apple-disable-message-reformatting"> 
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
          <meta content="telephone=no" name="format-detection"> 
          <title>activer compte</title> 
          <!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--> 
          <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
          <!--[if gte mso 9]>
         <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
         <![endif]--> 
          <style type="text/css">
         #outlook a {
            padding:0;
         }
         .ExternalClass {
            width:100%;
         }
         .ExternalClass,
         .ExternalClass p,
         .ExternalClass span,
         .ExternalClass font,
         .ExternalClass td,
         .ExternalClass div {
            line-height:100%;
         }
         .es-button {
            mso-style-priority:100!important;
            text-decoration:none!important;
         }
         a[x-apple-data-detectors] {
            color:inherit!important;
            text-decoration:none!important;
            font-size:inherit!important;
            font-family:inherit!important;
            font-weight:inherit!important;
            line-height:inherit!important;
         }
         .es-desk-hidden {
            display:none;
            float:left;
            overflow:hidden;
            width:0;
            max-height:0;
            line-height:0;
            mso-hide:all;
         }
         .es-button-border:hover {
            background:#ffffff!important;
            border-style:solid solid solid solid!important;
            border-color:#3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
         }
         td .es-button-border:hover a.es-button-1 {
            color:#002147!important;
         }
         td .es-button-border-2:hover {
            border-color:#002147 #002147 #002147 #002147!important;
            background:#ffffff!important;
         }
         @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:20px!important; text-align:center; line-height:120%!important } h2 { font-size:16px!important; text-align:left; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:20px!important } h2 a { font-size:16px!important; text-align:left } h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:10px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:14px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } }
         </style> 
         </head> 
         <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
          <div class="es-wrapper-color" style="background-color:#FAFAFA"> 
           <!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                        <v:fill type="tile" color="#fafafa"></v:fill>
                    </v:background>
                <![endif]--> 
           <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
             <tr style="border-collapse:collapse"> 
              <td valign="top" style="padding:0;Margin:0"> 
               <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                 <tr style="border-collapse:collapse"> 
                  <td class="es-adaptive" align="center" style="padding:0;Margin:0"> 
                   <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3D5CA3;width:600px" cellspacing="0" cellpadding="0" bgcolor="#3d5ca3" align="center"> 
                     <tr style="border-collapse:collapse"> 
                      <td style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#002147" bgcolor="#002147" align="left"> 
                       <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="left" style="padding:0;Margin:0;width:560px"> 
                           <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://irsiye.stripocdn.email/content/guids/CABINET_8a063812954f64006cf00ff5a3ba22c6/images/16231607211822703.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                 <tr style="border-collapse:collapse"> 
                  <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center"> 
                   <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
                     <tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top" bgcolor="transparent" align="left"> 
                       <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                           <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top" width="100%" cellspacing="0" cellpadding="0" role="presentation"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0"><img src="https://irsiye.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="175"></td> 
                             </tr> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333"><b>Lost your password !!&nbsp;</b></h1></td> 
                             </tr> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666"><br>Hello ${admin[0].firstname}  ${admin[0].lastname}</p></td> 
                             </tr> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666">We hope that you liked the experience</p></td> 
                             </tr> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666">In order to reset your password<br>the confirm button&nbsp;</p></td> 
                             </tr> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px"><span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#002147;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto">
                              
                              <img src="${newfinalhtml}"  width="350" height="200">
                              <h2>Token</h2>:${admin[0].gsecrettoken}</span></td>
                             </tr> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:32px;color:#CC0000">The Activation process is valid for 7 days.<span data-cke-bookmark="1" style="display:none"></span></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;background-position:center center" align="left"> 
                       <!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:199px" valign="top"><![endif]--> 
                       <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="left" style="padding:0;Margin:0;width:199px"> 
                           <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center" width="100%" cellspacing="0" cellpadding="0" role="presentation"> 
                             <tr style="border-collapse:collapse"> 
                              <td class="es-m-txt-c" align="right" style="padding:0;Margin:0;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666"><strong>Follow us:</strong></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <!--[if mso]></td><td style="width:20px"></td><td style="width:361px" valign="top"><![endif]--> 
                       <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="left" style="padding:0;Margin:0;width:361px"> 
                           <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center" width="100%" cellspacing="0" cellpadding="0" role="presentation"> 
                             <tr style="border-collapse:collapse"> 
                              <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px;font-size:0"> 
                               <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img src="https://irsiye.stripocdn.email/content/assets/img/social-icons/logo-colored/facebook-logo-colored.png" alt="Fb" title="Facebook" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                  <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img src="https://irsiye.stripocdn.email/content/assets/img/social-icons/logo-colored/twitter-logo-colored.png" alt="Tw" title="Twitter" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                  <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img src="https://irsiye.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Ig" title="Instagram" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                  <td valign="top" align="center" style="padding:0;Margin:0"><img src="https://irsiye.stripocdn.email/content/assets/img/social-icons/logo-colored/linkedin-logo-colored.png" alt="In" title="Linkedin" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                                 </tr> 
                               </table></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <!--[if mso]></td></tr></table><![endif]--></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td style="Margin:0;padding-top:5px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:left top" align="left"> 
                       <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                           <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666">Contact us:&nbsp;<a target="_blank" href="mailto:support@ultranote.org" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#666666">support@ultranote.org</a></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
           
               <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                 <tr style="border-collapse:collapse"> 
                  <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center"> 
                   <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                     <tr style="border-collapse:collapse"> 
                      <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;background-color:#F06939" bgcolor="#f06939" align="left"> 
                       <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                           <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><h2 style="Margin:0;line-height:19px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;font-style:normal;font-weight:normal;color:#FFFFFF"><strong>You have Questions</strong></h2></td> 
                             </tr> 
                             <tr style="border-collapse:collapse"> 
                              <td align="left" style="padding:0;Margin:0;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF">We are always here to guide for better experience<a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#FFFFFF" href=""></a></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                 <tr style="border-collapse:collapse"> 
                  <td style="padding:0;Margin:0;background-color:#FAFAFA" bgcolor="#fafafa" align="center"> 
                   <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                           <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;display:none"></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
          </div>  
         </body>
         </html>
         
         `,
            },
          ],
        })
        .then((result) =>
          res.status(200).json({
            response: result.body,
            message: "Email Has Been Send",
          })
        )
        .catch((error) =>
          res.status(200).json({
            response: error.message,
            message: "Email Has Been Send Error",
          })
        );
    } // else
  } catch (error) {
    console.log(error);
  }
};

exports.post_google_auth_code_verify = async (req, res, next) => {
  const { serect_code, email } = req.body;

  const admin = await Admin.find({ email: email }).exec();
  var base32secret = admin[0].gsecrettoken;
  const verified = await speakeasy.totp.verify({
    secret: base32secret,
    encoding: "base32",
    token: serect_code,
    window: 1,
  });
  if (verified) {
    const token = jwt.sign(
      {
        email: admin[0].email,
        userId: admin[0]._id,
      },
      process.env.JWT_KEY || "serectserect",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Auth successful",
      token: token,
    });
  } else {
    res.status(200).json({
      message: "Your Serect Code Is Incorrect",
    });
  }
};

exports.post_update_profile_details = async (req, res, next) => {
  // if (req.body.userImage !== undefined && req.body.userImage.length > 0) {
  //   let filename = uniqid();
  //   fs.writeFile(
  //     "/home/Backend/src/images/" + filename + ".png",
  //     req.body.userImage
  //   );
  //   image = filename;
  // }

  Admin.updateOne(
    { _id: req.body._id },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        // phoneno: req.body.phonenumber,
        userImage: req.file.path,
        // currency: req.body.currency,
        // mail: req.body.mail,
        // isActive: req.body.isActive,
        // ...(image ? { image: image } : {}),
        // two_fact_auth: req.body.two_factor_auth,
      },
    }
  )
    .then((r) => {
      console.log(r);
      res.status(200).json({
        message: "Profile Updated Successfully",
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Profile Updated Successfully",
        error: error,
      });
    });
};

exports.post_update_password_set = async (req, res, next) => {
  const resetPasswordReq = await Admin.findOne({ _id: req.body._id }).exec();
  if (resetPasswordReq.email === req.body.email) {
    resetPasswordReq.password;
    const compare = await bcrypt.compare(
      req.body.currentpassword,
      resetPasswordReq.password
    );
    if (compare) {
      const hashpass = await bcrypt.hash(req.body.password, 10);
      resetPasswordReq.password = hashpass;
      await resetPasswordReq
        .save()
        .then((result) => {
          res.status(200).json({
            message: "Password Changed",
          });
        })
        .catch((error) => {
          res.status(200).json({
            message: "Password Not Changed System Error",
          });
        });
    } else {
      res.status(200).json({
        message: "Your Current Password Not Matched",
      });
    }
  } else {
    res.status(200).json({
      message: "Email id Is Not Matched",
    });
  }
};

exports.twofachagestatus = async (req, res, next) => {
  const id = req.userData.userId;
  try {
    const change_status = await Admin.findOne({ _id: id }).exec();
    // console.log(change_status);
    if (change_status.faactive) {
      // console.log('true');
      change_status.faactive = false;
    } else {
      // console.log('false');
      change_status.faactive = true;
    }
    change_status.save();
    res.status(200).json({
      message: "2FA Status Changed",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.post_mass_email = async (req, res, next) => {
  try {
    let { subject, message, users } = req.body;

    const delay = async () =>
      await new Promise((resolve) => setTimeout(resolve, 1000));

    for (let i = 0; i < users?.length; i++) {
      const mailOptions = {
        from: process?.env?.EMAIL_FROM,
        to: users[i]?.email,
        subject: subject,
        templateVars: {
          title: users[i]?.name,
          message: message,
        },
      };
      await sendMail(mailOptions).catch((ex) => {
        console.log(ex);
      });
      await delay();
    }
    return res.status(200).json({
      message: "Email Sent",
    });
  } catch (error) {
    console.log(error);
  }
};
