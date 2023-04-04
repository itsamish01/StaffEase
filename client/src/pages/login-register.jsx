import { useState } from "react";
import { Login, EmployeeSignup, BusinessSignup } from "../components/form";
import { useMutation } from "@apollo/client";
import {
  ADD_BUSINESS,
  ADD_EMPLOYEE,
  LOGIN_BUSINESS,
  LOGIN_EMPLOYEE,
} from "../schema/mutations";

export default function LoginRegister() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [signupBusiness, { client: registerClient }] = useMutation(
    ADD_BUSINESS,
    {
      onCompleted(data) {
        console.log(data);
        localStorage.setItem("token", data.addBusiness.token);
        registerClient.resetStore();
      },
    }
  );
  const [signupEmployee, { client: registerClient2 }] = useMutation(
    ADD_EMPLOYEE,
    {
      onCompleted(data) {
        console.log(data);
        localStorage.setItem("token", data.addEmployee.token);
        registerClient2.resetStore();
      },
    }
  );
  const [loginBusiness, { client: loginClient }] = useMutation(LOGIN_BUSINESS, {
    onCompleted(data) {
      console.log(data);
      localStorage.setItem("token", data.loginBusiness.token);
      loginClient.resetStore();
    },
  });
  const [loginEmployee, { client: loginClient2 }] = useMutation(
    LOGIN_EMPLOYEE,
    {
      onCompleted(data) {
        console.log(data);
        localStorage.setItem("token", data.loginEmployee.token);
        loginClient2.resetStore();
      },
    }
  );
  const submitForm = async (event) => {
    event.preventDefault();
    if (!isRegistering && !isBusiness) {
      const employeeFormData = {
        email: event.target.email.value,
        password: event.target.password.value,
      };

      try {
        const { data } = await loginEmployee({
          variables: { ...employeeFormData },
        });
        console.log(employeeFormData);
        location.replace("/employeepage");
      } catch (err) {
        console.error(err);
      }
    } else if (!isRegistering && isBusiness) {
      const businessFormData = {
        email: event.target.email.value,
        password: event.target.password.value,
      };

      try {
        const { data } = await loginBusiness({
          variables: { ...businessFormData },
        });
        console.log(businessFormData);
        location.replace("/businesspage");
      } catch (err) {
        console.error(err);
      }
    } else if (isRegistering && !isBusiness) {
      const employeeFormData = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.password.value,
      };

      try {
        const { data } = await signupEmployee({
          variables: { ...employeeFormData },
        });
        console.log(employeeFormData);
        location.replace("/employeepage");
      } catch (err) {
        console.error(err);
      }
    } else if (isRegistering && isBusiness) {
      const businessFormData = {
        businessName: event.target.businessName.value,
        email: event.target.email.value,
        password: event.target.password.value,
        description: event.target.description.value,
        location: event.target.location.value,
        contact: event.target.contact.value,
        maxCapacity: event.target.maxCapacity.valueAsNumber,
      };

      try {
        const { data } = await signupBusiness({
          variables: { ...businessFormData },
        });
        console.log(businessFormData);
        location.replace("/businesspage");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <main>
      <h2 className="text-center">
        {isBusiness ? "For a Business" : "For an Employee"}
      </h2>
      <h2 className="text-center">
        {isRegistering ? "Register a New Account" : "Login to Account"}
      </h2>
      <form
        onSubmit={submitForm}
        className="flex flex-col items-center gap-y-2 px-4"
      >
        {isRegistering ? (
          isBusiness ? (
            <BusinessSignup />
          ) : (
            <EmployeeSignup />
          )
        ) : (
          <Login />
        )}
        <button
          type="submit"
          className="button mt-4 bg-green-500 hover:bg-green-300"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRegistering((prev) => !prev);
          }}
          className="text-center text-sm text-gray-500 hover:text-gray-300"
        >
          {isRegistering ? "Already have an account?" : "Need to register?"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsBusiness((prev) => !prev);
          }}
          className="text-center text-sm text-gray-500 hover:text-gray-300"
        >
          {isBusiness ? "But I'm an Employee" : "But I'm a Business"}
        </button>
      </form>
    </main>
  );
}
