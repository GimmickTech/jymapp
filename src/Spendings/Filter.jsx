import "../Spendings/Filter.css";

const filter = (props) => {
  const filterYear = (event) => {
    props.onFilter(event.target.value);
  };
  return (
    <div>
      <label htmlFor=""> Expenses Filter : </label>
      <select name="" id="" onChange={filterYear}>
        <option value="">--Year--</option>
        <option value="2019">2019</option>
        <option value="2022">2022</option>
        <option value="2020">2020</option>
        <option value="2024">2024</option>
      </select>
    </div>
  );
};
export default filter;
