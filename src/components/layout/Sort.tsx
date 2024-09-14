import { useSearchParams } from "react-router-dom";
import { SelectProps } from "src/types/types";

const Sort = ({ options }:SelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  const sortValue = searchParams.get('sort') || options[0]
  console.log(sortValue)


  return (
    <select
      className="py-1 px-2 rounded-md bg-neutral-50 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      onChange={(e) => handleChange(e)}
      value={sortValue}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          Sort by {option}
        </option>
      ))}
    </select>
  );
};

export default Sort;
