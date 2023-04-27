import PropTypes from "prop-types";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../schema/queries";
import { PublicQueryList } from "../components/form";
export default function PublicQuery() {
  const { data } = useQuery(GET_RESTAURANTS);
  const [useData, setUseData] = useState();

  const searchQuery = (event) => {
    event.preventDefault();
    console.log(data.BusinessAll);
    setUseData(data.BusinessAll);
  };
  return (
    <main className="text-center">
      <h2 className="text-center">Search for Intelligent Restaurants</h2>
      <form className="flex flex-col items-center gap-y-2 px-4">
        <button
          onClick={searchQuery}
          type="submit"
          className="button mt-4 bg-green-500 hover:bg-green-300"
        >
          Search
        </button>
        <PublicQueryList business={useData} />
      </form>
    </main>
  );
}
PublicQuery.propTypes = {
  business: PropTypes.arrayOf(PropTypes.string),
};
