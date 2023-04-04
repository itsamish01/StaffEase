
import Input from "./input";

export default function saveEmployee() {
  return (
    <>
      <Input
        type="text"
        label="firstName"
        id="firstName"
        placeholder="Enter the First Name"
        required
      />
      <Input
        type="text"
        label="lastName"
        id="lastName"
        placeholder="Enter the Last Name"
        required
      />
    </>
  );
}
