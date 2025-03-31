import React, { useState, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

type OptionType = {
  value: string;
  label: string;
  icon?: IconType;
  type?: string;
};

type OptionGroup = {
  [key: string]: OptionType[];
};

interface IconDropdownProps {
  options: OptionType[] | OptionGroup;
  selectedValues: string[];
  placeholder: string;
  onChange: (values: string[]) => void;
  isGrouped?: boolean;
  className?: string;
}

export const IconDropdown: React.FC<IconDropdownProps> = ({
  options,
  selectedValues,
  placeholder,
  onChange,
  isGrouped = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownBlur = (e: React.FocusEvent) => {
    // Only close if the focus is moving outside the dropdown container
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      // Use a timeout to prevent race conditions with click events
      setTimeout(() => setIsOpen(false), 150);
    }
  };

  const handleOptionClick = (e: React.MouseEvent, value: string) => {
    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Create a new array to avoid direct state mutation
    const currentValues = [...(selectedValues || [])];
    
    // Toggle the value
    if (currentValues.includes(value)) {
      onChange(currentValues.filter((v) => v !== value));
    } else {
      onChange([...currentValues, value]);
    }
  };

  const renderOptions = (optionsList: OptionType[]) => {
    return optionsList.map(option => (
      <div
        key={option.value}
        className="flex items-center space-x-2 my-2 pl-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded"
        onClick={(e) => handleOptionClick(e, option.value)}
      >
        <div 
          className="flex items-center space-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={selectedValues?.includes(option.value)}
            // Using an empty function here to make it a controlled component
            // without triggering additional state updates
            onCheckedChange={() => {}}
            className="pointer-events-none" // Prevents checkbox from capturing clicks
          />
        </div>
        {option.icon && <option.icon size={20} className="mr-2" />}
        <label className="text-sm text-gray-700 dark:text-white cursor-pointer flex-1">
          {option.label}
        </label>
      </div>
    ));
  };

  return (
    <div 
      ref={dropdownRef}
      className={cn("relative mt-2", className)} 
      onBlur={handleDropdownBlur}
      tabIndex={-1} // Makes the div focusable
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full border border-gray-700 rounded-lg p-2 text-left bg-white dark:bg-background"
      >
        {selectedValues?.length > 0
          ? selectedValues.length === 1 
            ? selectedValues[0]
            : `${selectedValues.length} selected` 
          : placeholder}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-700 rounded-lg shadow-lg dark:bg-background max-h-64 overflow-y-auto">
          {isGrouped ? (
            Object.entries(options as OptionGroup).map(([groupKey, groupOptions]) => (
              <div key={groupKey} className="border-b border-gray-700 p-2">
                <div className="font-semibold text-gray-700 dark:text-white mb-1">{groupKey.toUpperCase()}</div>
                {renderOptions(groupOptions)}
              </div>
            ))
          ) : (
            renderOptions(options as OptionType[])
          )}
        </div>
      )}
    </div>
  );
};