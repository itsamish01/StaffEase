import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { CLOCKIN } from "../schema/mutations";
import { ClockinEmployee } from "../components/form";
export default function EmployeePage() {
  const [clockinEmployee, { error }] = useMutation(CLOCKIN);
  const submitForm = async (event) => {
    event.preventDefault();
    const employeeFormData = {
      businessName: event.target.businessName.value,
    };

    try {
      const { data } = await clockinEmployee({
        variables: { ...employeeFormData },
      });
      console.log(employeeFormData);
      location.replace("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main className="px-4 text-center">
      <h2>Employee</h2>
      <form
        onSubmit={submitForm}
        className="flex flex-col items-center gap-y-2 px-4"
      >
        <ClockinEmployee />
        <button
          type="submit"
          className="button mt-4 bg-green-500 hover:bg-green-300"
        >
          ClockIn
        </button>
      </form>
    </main>
  );
}
