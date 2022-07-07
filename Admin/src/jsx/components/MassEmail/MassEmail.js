import { Fragment, Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import PageTitle from "../../layouts/PageTitle";
import { ToastContainer, toast } from "react-toastify";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

class MassEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      users: [],
      selectedUsers: [],
      allUsers: [],
      subject: "",
      message: "",
      errors: [],
    };
  }

  getUsers = () => {
    axios
      .get(this.props.portalURL + "api/users/user_list", {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((res) => {
        let mailList = [];
        let allUsers = [];
        res.data.users.forEach((user) => {
          mailList.push(user.mail ?? "N/A");
          allUsers.push({
            name: user.firstName,
            email: user.mail,
          });
        });
        this.setState({ users: mailList, allUsers });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getUsers();
  }

  getNames = (email) => {
    let allUsers = this.state.allUsers;
    let users = [];
    email.forEach((mail) => {
      let user = allUsers.find((user) => user.email === mail);
      users.push(user);
    });
    console.log(users);
    return users;
  };

  validateForm = () => {
    let errors = [];
    if (this.state.selectedUsers.length === 0)
      errors.push("Please select at least one user");
    if (this.state.subject === "") errors.push("Please enter a subject");
    if (this.state.message === "") errors.push("Please enter a message");
    if (errors.length > 0) {
      this.setState({ errors });
    }
    return true;
  };

  submitForm = (e) => {
    e.preventDefault();

    if (!this.validateForm()) return;

    let formData = {
      subject: this.state.subject,
      message: this.state.message,
      users: this.state.selectedUsers,
    };
    axios
      .post(this.props.portalURL + "api/admin/mass_email", formData, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((res) => {
        toast.success("Email sent successfully");
      })
      .catch((err) => {
        toast.error("Error sending email");
      });
  };

  handleEditorChange = (content, editor) => {
    this.setState({
      message: content,
    });
  };

  render() {
    const { users, selectedUsers, errors } = this.state;
    return (
      <Fragment>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <PageTitle activeMenu="Mass Email" motherMenu="App" />
        <div className="row">
          <div className="col-sm-4">
            <div
              className="card"
              style={{
                maxHeight: "200px",
              }}
            >
              <div className="card-header">
                <h5>Select users to send email to</h5>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <div id="multiselect">
                    {users.length > 0 ? (
                      <DropdownMultiselect
                        options={users}
                        buttonClass="btn btn-primary btn-block"
                        name="users"
                        placeholderMultipleChecked={
                          "Selected users: " + selectedUsers.length
                        }
                        handleOnChange={(selected) => {
                          this.setState({
                            selectedUsers: this.getNames(selected),
                          });
                        }}
                      />
                    ) : (
                      <button
                        className="btn btn-primary btn-block dropdown-toggle justify-content-between d-flex disabled"
                        disabled
                      >
                        <span>Loading users</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-8 col-md-8">
            <div className="card">
              <div className="card-header">
                <h4>Compose message</h4>
              </div>

              <div className="card-body">
                <div>
                  {errors.length > 0 && (
                    <div
                      role="alert"
                      className="fade alert-dismissible left-icon-big alert alert-danger show"
                    >
                      <button
                        ata-dismiss="alert"
                        aria-label="Close"
                        type="button"
                        className="close  btn"
                        onClick={() => {
                          this.setState({ errors: [] });
                        }}
                      >
                        <span>
                          <i className="mdi mdi-close"></i>
                        </span>
                      </button>
                      <div className="media">
                        <div className="alert-left-icon-big">
                          <span>
                            <i className="mdi mdi-alert"></i>
                          </span>
                        </div>
                        <div className="media-body">
                          <h6 className="mt-1 mb-2">Oops!</h6>

                          {errors.map((error, index) => (
                            <p className="mb-0" key={index}>
                              {error}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    onChange={(e) => {
                      this.setState({ subject: e.target.value });
                    }}
                  />
                </div>
                <Editor
                  initialValue="<p>Hello</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image code charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | code |link | image | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help ",
                    content_style: "body { color: #fff }",
                  }}
                  onEditorChange={this.handleEditorChange}
                />
              </div>
              <div className="card-footer text-right">
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={this.submitForm}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MassEmail;
