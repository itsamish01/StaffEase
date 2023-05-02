import Input from "./input";

export default function BusinessSignup() {
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
      <Input
        type="text"
        label="description"
        id="description"
        placeholder="Enter the description"
        required
      />
      <Input
        type="text"
        label="location"
        id="location"
        placeholder="Enter the Location"
        required
      />
      <Input
        type="text"
        label="contact"
        id="contact"
        placeholder="Enter the Contact infomation"
        required
      />
      <Input
        type="number"
        label="maxCapacity"
        id="maxCapacity"
        placeholder="Enter the Maximum Capacity"
        required
      />
    </>
  );
}
