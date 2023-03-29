import { Input } from "../components/form";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../schema/queries";
export default function PublicQuery() {
  const { loading, data } = useQuery(GET_RESTAURANTS);
  const searchQuery = () => {};
  return (
    <main>
      <h2 className="text-center">Search for Intelligent Restaurants</h2>
      <form className="flex flex-col items-center gap-y-2 px-4">
        <button
          onClick={searchQuery}
          type="submit"
          className="button mt-4 bg-green-500 hover:bg-green-300"
        >
          Search
        </button>
      </form>
    </main>
  );
}
