import PropTypes from "prop-types";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../schema/queries";
import { PublicQueryList } from "../components/form";
export default function PublicQuery() {
  const { loading, data } = useQuery(GET_RESTAURANTS);
  const [useData, setUseData] = useState();
  const [useHelp, setUseHelp] = useState();

  const searchQuery = (event) => {
    event.preventDefault();
    console.log(data.BusinessAll);
    setUseData(data.BusinessAll);
    setUseHelp("helllo");
  };
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
        <PublicQueryList business={useData} note={useHelp} />
      </form>
    </main>
  );
}
PublicQuery.propTypes = {
  business: PropTypes.arrayOf(PropTypes.string),
};
