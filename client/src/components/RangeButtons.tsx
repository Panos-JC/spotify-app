import { StyledRangeButtons } from "../styles";

interface RangeButtonsProps {
  range: "short" | "medium" | "long";
  setRange: React.Dispatch<React.SetStateAction<"short" | "medium" | "long">>;
}

const RangeButtons: React.FC<RangeButtonsProps> = ({ range, setRange }) => {
  return (
    <StyledRangeButtons>
      <li>
        <button
          className={range === "short" ? "active" : ""}
          onClick={() => setRange("short")}
        >
          This month
        </button>
      </li>
      <li>
        <button
          className={range === "medium" ? "active" : ""}
          onClick={() => setRange("medium")}
        >
          Last 6 months
        </button>
      </li>
      <li>
        <button
          className={range === "long" ? "active" : ""}
          onClick={() => setRange("long")}
        >
          All time
        </button>
      </li>
    </StyledRangeButtons>
  );
};

export default RangeButtons;
