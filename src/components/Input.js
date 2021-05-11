const Input = ({ title, placeholder, type, value, setValue }) => {
  return (
    <div style={{ display: "flex" }}>
      <h4>{title}</h4>
      <input
        className="offer-input"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export default Input;
