import PropTypes from "prop-types";
import Input from "./input";

export default function EmployeeSignup() {
  return (
    <>
      <Input
        type="text"
        label="businessName"
        id="businessName"
        placeholder="Enter the Business Name"
        required
      />
      <Input
        type="text"
        label="firstName"
        id="firstName"
        placeholder="Enter your First Name"
        required
      />
      <Input
        type="text"
        label="lastName"
        id="lastName"
        placeholder="Enter your Last Name"
        required
      />
      <Input
        type="number"
        label="rating"
        id="email"
        placeholder="Enter your rating"
        required
      />
      <Input
        type="text"
        label="comment"
        id="comment"
        placeholder="Enter your comment"
        required
      />
    </>
  );
}
