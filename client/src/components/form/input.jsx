import camelCase from "lodash/camelCase";
import PropTypes from "prop-types";

export default function Input({ label, id, type, placeholder, required }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder || label}
        required={required}
        name={camelCase(id)}
        className="text-black"
      />
    </div>
  );
}

Input.defaultProps = {
  type: "text",
  placeholder: null,
  required: true,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
