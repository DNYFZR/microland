// Form Select Element 
import "./Select.css"
import React from "react"

interface selectProps {
  displayName?: string;
  keyName:string | undefined;
  value?: string | number | readonly string[];
  className?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  selectOptions: string[] | number[] | boolean[];
  labelClassName?:string;
};

const Select:React.FC<selectProps> = ({keyName, value, className, onChange, selectOptions, labelClassName}) => {
  return(
    <div className="select-container">
      {keyName && <label className={labelClassName? labelClassName : "select-label"}>{keyName.toUpperCase()}</label>}
      <select 
        name={keyName} 
        value={value? value : undefined}
        className={className? className : "select-component"} 
        onChange={onChange} 
      >
        <option value="" disabled selected>Select...</option> 
        {selectOptions.map((option) => (<option key={String(option)} value={String(option)}>{option}</option>))}
      </select>

    </div>
  );
};

export default Select;