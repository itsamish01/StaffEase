import PropTypes from "prop-types";
import Input from "./input";

export default function saveEmployee() {
  return (
    <>
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
    </>
  );
}
