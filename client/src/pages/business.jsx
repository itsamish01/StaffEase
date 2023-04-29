import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../schema/queries";
import { SaveEmployee, RemoveEmployee } from "../components/form";
import {
  SAVE_EMPLOYEE,
  REMOVE_EMPLOYEE,
  MOD_CAPACITY,
} from "../schema/mutations";

export default function BusinessPage() {
  const { loading, data } = useQuery(GET_ME);
  const [saveEmployee, { error }] = useMutation(SAVE_EMPLOYEE, {
    refetchQueries: [
      { query: GET_ME }, // DocumentNode object parsed with gql
      "GetBusiness", // Query name
    ],
  });
  const [removeEmployee, { error1 }] = useMutation(REMOVE_EMPLOYEE, {
    refetchQueries: [
      { query: GET_ME }, // DocumentNode object parsed with gql
      "GetBusiness", // Query name
    ],
  });
  const [modCapacity, { error2 }] = useMutation(MOD_CAPACITY, {
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
  };
  const submitRemoveEmployee = async (event) => {
    event.preventDefault();
    const employeeFormData = {
      employeeId: event.target.id.value,
    };

    try {
      const { data } = await removeEmployee({
        variables: { ...employeeFormData },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const addCustomer = async (event) => {
    event.preventDefault();
    const addCapacityData = {
      currentCapacity: data?.Business.currentCapacity + 1,
    };
    try {
      const { data } = await modCapacity({ variables: { ...addCapacityData } });
    } catch (err) {
      console.error(err);
    }
  };
  const subtractCustomer = async (event) => {
    event.preventDefault();
    const addCapacityData = {
      currentCapacity: data?.Business.currentCapacity - 1,
    };
    try {
      const { data } = await modCapacity({ variables: { ...addCapacityData } });
    } catch (err) {
      console.error(err);
    }
  };
  if (data?.Business.paid) {
    return (
      <main className=" flex flex-col items-center space-y-2 text-center">
        <h2>Business:</h2>
        <ul className="list-group flex w-72 flex-col items-center space-y-2 rounded-md bg-slate-100 p-2">
          {/* Here we use the map method to iterate through each user and return a new array of list items for each user */}
          <h3 className="w-64 rounded-md bg-slate-500">
            {data?.Business.businessName}
          </h3>
          <h4 className="w-64 items-center rounded-md bg-slate-500">
            Customer Ratings:
          </h4>
          {data?.Business.customers.map((value) => (
            <li
              className={`list-group-item w-64 items-center rounded-md ${
                value.rating > 7
                  ? "bg-green-300"
                  : value.rating > 3
                  ? "bg-orange-200"
                  : "bg-red-200"
              }`}
              key={data.Business._id}
            >
              {`${value.rating} ${value.comment}`}
            </li>
          ))}
          <h4 className="w-64 items-center rounded-md bg-slate-500">
            Employees:
          </h4>
          {data?.Business.employees.map((value) => (
            <li
              className="list-group-item flex w-64 flex-col items-center space-y-2 rounded-md bg-slate-500 p-2"
              key={data.Business._id}
            >
              <h4 className="list-group-item w-60 rounded-md bg-slate-400">{`${value?.firstName} ${value?.lastName}`}</h4>
              <h5 className="list-group-item w-60 rounded-md bg-slate-300">{`Clockedin: ${value?.clockedin}`}</h5>
              <h5 className="list-group-item w-60 rounded-md bg-slate-300">{`ID: ${value?._id}`}</h5>
            </li>
          ))}
          <li className="w-64 items-center rounded-md bg-slate-500">
            Employees On: {data?.Business.employeeOnCount}
          </li>
          <h4 className="w-64 items-center rounded-md bg-slate-500">
            Capacity Data:
          </h4>
          <li className="w-64 items-center rounded-md bg-slate-500">
            MaxCap: {data?.Business.maxCapacity}
          </li>
          <li className="w-64 items-center rounded-md bg-slate-500">
            CurrentCap: {data?.Business.currentCapacity}
          </li>
        </ul>
        <section className="flex flex-col items-center">
          <button
            onClick={addCustomer}
            type="submit"
            className="button mt-4 w-48 bg-green-500 hover:bg-green-300"
          >
            New/Add Customer
          </button>
          <button
            onClick={subtractCustomer}
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
        <form
          onSubmit={submitRemoveEmployee}
          className="flex flex-col items-center gap-y-2 px-4"
        >
          <RemoveEmployee />
          <button
            type="submit"
            className="button mt-4 bg-green-500 hover:bg-green-300"
          >
            Remove Employee
          </button>
        </form>
      </main>
    );
  } else {
    return <h1>Must Pay</h1>;
  }
}
