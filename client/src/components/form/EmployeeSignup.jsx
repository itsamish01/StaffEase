import Input from "./input";

export default function EmployeeSignup() {
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
