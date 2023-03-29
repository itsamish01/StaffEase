import { Input } from "../components/form";
export default function PublicQuery() {
  return (
    <main>
      <h2 className="text-center"></h2>
      <form className="flex flex-col items-center gap-y-2 px-4">
        <Input
          type="text"
          label="Username"
          id="username"
          placeholder="Search for Smart Restaurants"
          required
        />

        <button
          type="submit"
          className="button mt-4 bg-green-500 hover:bg-green-300"
        >
          Search
        </button>
      </form>
    </main>
  );
}
