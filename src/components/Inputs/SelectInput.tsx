import useColors from "../../hooks/useColors";

interface SelectInputProps {
  placeholder: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

const SelectInput = ({ placeholder, options, onChange }: SelectInputProps) => {
  const { color } = useColors();
  
  const styles = {
    select: {
      width: "100%",
      padding: "10px",
      backgroundColor: color.background,
      border: `2px solid ${color.primary_light}`,
      borderRadius: "4px",
      color: color.copy,
      fontSize: "var(--font-size-small)",
      cursor: "pointer",
      outline: "none",
    },
  };

  return (
    <select 
      className="select-input"
      style={styles.select}
      onChange={(e) => onChange?.(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="select-input__option">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput; 