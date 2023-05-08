
import Input from "./input";

export default function saveEmployee() {
  return (
    <>
      <Input
        type="text"
        label="id"
        id="id"
        placeholder="Enter the Employee ID"
        required
      />
    </>
  );
}
