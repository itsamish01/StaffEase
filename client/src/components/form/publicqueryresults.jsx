import PropTypes from "prop-types";

export default function PublicQueryList(prop) {
  return (
    <div className="container">
      <h1>Business:</h1>
      <ul className="list-group flex flex-col items-center space-y-2 rounded-md">
        {/* Here we use the map method to iterate through each user and return a new array of list items for each user */}
        {prop.business?.map((business) => (
          <li
            className="list-group-item flex w-72 flex-col items-center space-y-2 rounded-md bg-slate-100 p-2 text-center text-black"
            key={business._id}
          >
            <li className="list-group-item w-64 items-center rounded-md bg-slate-500 p-2 text-center text-white">{`${business.businessName}`}</li>
            <li className="list-group-item w-64 items-center rounded-md bg-slate-400 p-2 text-center text-white">
              Description:{` ${business.description}`}{" "}
            </li>
            <li className="list-group-item w-64 items-center rounded-md bg-slate-400 p-2 text-center text-white">
              Location: {`${business.location}`}{" "}
            </li>
            <li className="list-group-item w-64 items-center rounded-md bg-slate-400 p-2 text-center text-white">
              Contact: {`${business.contact}`}
            </li>
            <h3>Reviews:</h3>
            {business.customers?.map((value) => (
              <li
                className={`list-group-item w-64 items-center rounded-md ${
                  value.rating > 7
                    ? "bg-green-300"
                    : value.rating > 3
                    ? "bg-orange-200"
                    : "bg-red-200"
                } bg p-2 text-center text-white`}
                key={business._id}
              >
                {`${value.rating} ${value.comment}`}
              </li>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
PublicQueryList.propTypes = {
  business: PropTypes.arrayOf({
    businessName: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
    location: PropTypes.string,
    contact: PropTypes.string,
    customer: PropTypes.arrayOf(PropTypes.string),
  }),
};
