import { useState } from "react";
import { Login } from "../components/form";
import { EmployeeSignup } from "../components/form";
import { BusinessSignup } from "../components/form";

export default function LoginRegister() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  return (
    <main>
      <h2 className="text-center">
        {isBusiness ? "For a Business" : "For an Employee"}
      </h2>
      <h2 className="text-center">
        {isRegistering ? "Register a New Account" : "Login to Account"}
      </h2>
      <form className="flex flex-col items-center gap-y-2 px-4">
        <Login />
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
