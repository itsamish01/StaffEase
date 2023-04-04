import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-gray-700">
      <ul className="flex justify-center gap-x-8 p-4 text-lg">
        <li>
          <Link to="/"> Home</Link>
        </li>
        <li>
          <Link to="/login"> Login/Signup</Link>
        </li>
        <li>
          <Link to="/review">Submit Review</Link>
        </li>
      </ul>
    </nav>
  );
}
