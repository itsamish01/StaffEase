import PropTypes from "prop-types";
import Input from "./input";

export default function Login() {
  return (
    <>
      <Input
        type="text"
        label="username"
        id="username"
        placeholder="Enter your username"
        required
      />
      <Input
        type="password"
        label="Password"
        id="password"
        placeholder="Enter your password"
        required
      />
    </>
  );
}
