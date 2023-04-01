import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../schema/queries";
import { SaveEmployee } from "../components/form";
import { SAVE_EMPLOYEE } from "../schema/mutations";
export default function BusinessPage() {
  const { loading, data } = useQuery(GET_ME);
  const [saveEmployee, { error }] = useMutation(SAVE_EMPLOYEE, {
    refetchQueries: [
      { query: GET_ME }, // DocumentNode object parsed with gql
      "GetBusiness", // Query name
    ],
  });
  const submitEmployee = async (event) => {
    event.preventDefault();
    const employeeFormData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
    };

    try {
      const { data } = await saveEmployee({
        variables: { ...employeeFormData },
      });
      console.log(employeeFormData);
    } catch (err) {
      console.error(err);
    }
    console.log(event.target.firstName.value);
    console.log(event.target.lastName.value);
  };
  return (
    <main className=" flex flex-col items-center gap-y-2 px-4 text-center">
      <h2>Business</h2>
      <ul className="list-group">
        {/* Here we use the map method to iterate through each user and return a new array of list items for each user */}
        <h3>{data?.Business.businessName}</h3>
        Customer Ratings:
        {data?.Business.customers.map((value) => (
          <li className="list-group-item" key={data.Business._id}>
            {`${value.rating} ${value.comment}`}
          </li>
        ))}
        Employees:
        {data?.Business.employees.map((value) => (
          <li className="list-group-item" key={data.Business._id}>
            {`${value.firstName} ${value.lastName} ${value.clockedin}`}
          </li>
        ))}
      </ul>
      <section className="flex flex-col items-center">
        <button
          type="submit"
          className="button mt-4 w-48 bg-green-500 hover:bg-green-300"
        >
          New/Add Customer
        </button>
        <button
          type="submit"
          className="button mt-4 w-48 bg-green-500 hover:bg-green-300"
        >
          Complete/Subtract Customer
        </button>
      </section>
      <form
        onSubmit={submitEmployee}
        className="flex flex-col items-center gap-y-2 px-4"
      >
        <SaveEmployee />
        <button
          type="submit"
          className="button mt-4 bg-green-500 hover:bg-green-300"
        >
          Save Employee
        </button>
      </form>
    </main>
  );
}
