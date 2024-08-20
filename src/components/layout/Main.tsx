import FilterTab from "../common/FilterTab";
import { filterTabs, tableHeaders } from "../../utils/constants";
import { useState } from "react";
import TableContainer from "./Table/TableContainer";
import TableHeader from "./Table/TableHeader";
import TableRow from "./Table/TableRow";
import TableButton from "./Table/TableButton";
const Main = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <main className="bg-neutral-100 border border-black pl-24">
      <div className="flex justify-between py-8 border border-black">
        <h1 className="text-3xl font-medium">All rooms</h1>
        <div className="flex items-center gap-2 text-sm">
          {filterTabs.map((tab, index) => (
            <FilterTab
              color={activeIndex === index ? "blue" : "neutral"}
              buttonHandler={() => setActiveIndex(index)}
            >
              {tab}
            </FilterTab>
          ))}
          <select className="px-2 py-1 rounded-md">
            <option value="">Sort by name (A-Z)</option>
            <option value="">Sort by name (A-Z)</option>
          </select>
        </div>
      </div>
      <TableContainer>
        <ul className="flex">
        {tableHeaders.map((header, index) => (
          <TableHeader key={index} width={header.width}>
            <TableButton>{header.title}</TableButton>
          </TableHeader>
        ))}
        </ul>
        
        <TableRow/>
        <TableRow/>
        <TableRow/>
        <TableRow/>
      </TableContainer>
    </main>
  );
};

export default Main;
