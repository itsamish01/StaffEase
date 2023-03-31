import PropTypes from "prop-types";

export default function PublicQueryList(prop) {
  return (
    <div className="container">
      <h1>Business:</h1>
      <ul className="list-group">
        {/* Here we use the map method to iterate through each user and return a new array of list items for each user */}
        {prop.business?.map((business) => (
          <li className="list-group-item" key={business._id}>
            {`${business.businessName} ${business.description} ${business.location} ${business.contact}`}
          </li>
        ))}
        {prop.note}
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
// {business.customer.map((value) => (
//               <li className="list-group-item" key={business._id}>
//                 {`${value.rating} ${value.comment}`}
//               </li>
//             ))}
