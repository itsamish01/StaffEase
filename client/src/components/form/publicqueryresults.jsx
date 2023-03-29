import PropTypes from "prop-types";


export default function PublicQueryList({ business }) {
    return (
      <div className="container">
        <h1>Random Users:</h1>
        <ul className="list-group">
          {/* Here we use the map method to iterate through each user and return a new array of list items for each user */}
          {users.map((user) => (
            <li className="list-group-item" key={user.login.uuid}>
              {`${user.name.first} ${user.name.last} (${user.login.username})`}
            </li>
          ))}
        </ul>
      </div>
    );
  }