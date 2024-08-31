import FilterTab from "./FilterTab";
import SortOption from "./SortOption";
import { SearchFilterTabProps } from "../../types/types";
const SearchFilterTab = ({ tabOptions, sortOptions, activeIndex }: SearchFilterTabProps) => {

  return (
    <div className="flex items-center gap-2 text-sm">
      {tabOptions?.map((tab, index) => (
        <FilterTab
          key={index}
          color={activeIndex === index ? "blue" : "neutral"}
          // buttonHandler={() => setActiveIndex(index)}
          buttonHandler={tab.clickHandler}
          text={tab.text}
        />
      ))}
      <select className="px-2 py-1 rounded-md">
        {sortOptions?.map((option, index) => (
          <SortOption key={index} {...option} />
        ))}
      </select>
    </div>
  );
};

export default SearchFilterTab;
