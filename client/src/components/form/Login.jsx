import PropTypes from "prop-types";
import Input from "./input";

export default function Login() {
  return (
    <>
      <Input
        type="text"
        label="email"
        id="email"
        placeholder="Enter your email"
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
