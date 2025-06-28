"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Check, ChevronDown, X as ClearIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { cn } from "@/lib/utils";


import {
  projectStatusOptions,
  projectTypeOptions,
  projectDomainsOptions,
  sdgGoals,
  techStackOptions,
  yearOptions
} from "@/lib/types/mapping";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

// Define the shape of a filter option
type Option = {
  value: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type?: string;
};

// Define the structure for the entire filter state
export interface FilterState {
  status: string[];
  years: string[];
  projectTypes: string[];
  domains: string[];
  sdgGoals: string[];
  techStack: string[];
}

// --- GenericFilterSection Component ---

type GenericSectionProps = {
  title: string;
  options: ReadonlyArray<Option>;
  selection: ReadonlyArray<string>;
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
  showIcons?: boolean;
};

function GenericFilterSection({
  title,
  options,
  selection,
  setSelection,
  showIcons = false
}: GenericSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const initialOptionsCount = 5;
  const displayedOptions = useMemo(() =>
    showAll ? options : options.slice(0, initialOptionsCount),
    [options, showAll, initialOptionsCount]
  );
  const hasMore = useMemo(() => options.length > initialOptionsCount, [options, initialOptionsCount]);

  const toggleOption = useCallback((value: string) => {
    setSelection((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }, [setSelection]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full justify-between p-2 font-medium hover:bg-muted/50"
        >
          {title}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
        <div className="pt-1 pb-2 space-y-1">
          {displayedOptions.map((option) => {
            const isSelected = selection.includes(option.value);
            return (
              <div key={option.value} className="flex items-center gap-2 px-1 py-1">
                <Checkbox
                  id={option.value}
                  checked={isSelected}
                  onCheckedChange={() => toggleOption(option.value)}
                  className="flex-shrink-0"
                />
                <Label htmlFor={option.value} className="flex-grow truncate text-sm cursor-pointer">
                  {option.label}
                </Label>
              </div>
            );
          })}


          {hasMore && (
            <Button
              variant="link"
              size="sm"
              className="w-full text-xs text-muted-foreground h-auto p-1 mt-1 justify-start"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show less" : `Show ${options.length - initialOptionsCount} more`}
            </Button>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// --- TechStackSection Component ---
// Props type for TechStackSection
type TechStackSectionProps = {
  selection: ReadonlyArray<string>; // Use ReadonlyArray
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
};

function TechStackSection({
  selection,
  setSelection
}: TechStackSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleOption = useCallback((value: string) => {
    setSelection((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }, [setSelection]);

  // Group tech stack options by type, memoize the result
  const grouped = useMemo(() => {
    // Ensure techStackOptions is an array before reducing
    if (!Array.isArray(techStackOptions)) {
      console.error("techStackOptions is not an array:", techStackOptions);
      return {}; // Return empty object if data is invalid
    }
    return techStackOptions.reduce((acc, tech) => {
      // Ensure tech object and tech.type are valid
      if (typeof tech !== 'object' || tech === null) return acc;
      const typeKey = typeof tech.type === 'string' && tech.type ? tech.type : 'Other';
      if (!acc[typeKey]) {
        acc[typeKey] = [];
      }
      // Ensure tech.value is valid before pushing
      if (typeof tech.value === 'string') {
        acc[typeKey].push(tech);
      }
      return acc;
    }, {} as Record<string, Option[]>); // Type the accumulator
  }, []); // Dependency array is empty as techStackOptions is imported


  const initialOptionsCount = 5;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full justify-between p-2 font-medium hover:bg-muted/50"
        >
          Tech Stack
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
        <div className="pt-1 pb-2 space-y-3">
          {Object.entries(grouped).map(([category, options]) => {
            const isExpanded = expandedCategories[category] ?? false; // Use nullish coalescing
            const displayed = isExpanded ? options : options.slice(0, initialOptionsCount);
            const hasMore = options.length > initialOptionsCount;

            return (
              <div key={category} className="space-y-1">
                <h4 className="text-xs font-semibold text-muted-foreground px-1 uppercase tracking-wider">{category}</h4>
                {displayed.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selection.includes(option.value);
                  return (
                    <div key={option.value} className="flex items-center gap-2 px-1 py-1">
                    <Checkbox
                      id={option.value}
                      checked={isSelected}
                      onCheckedChange={() => toggleOption(option.value)}
                      className="h-4 w-4"
                    />
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <Label htmlFor={option.value} className="flex-grow truncate text-sm cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                  
                  );
                })}
                {hasMore && (
                  <Button
                    variant="link"
                    size="sm"
                    className="w-full text-xs text-muted-foreground h-auto p-1 mt-1 justify-start"
                    onClick={() =>
                      setExpandedCategories((prev) => ({
                        ...prev,
                        [category]: !isExpanded
                      }))
                    }
                  >
                    {isExpanded ? "Show less" : `Show ${options.length - initialOptionsCount} more`}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// --- FilterSidebar Props Interface ---
interface FilterSidebarProps {
  // Callback function when filters change
  onFilterChange: (filters: FilterState) => void;
  // Initial filter state, derived from URL params in the parent
  initialFilters: FilterState;
}

// --- FilterSidebar Component ---
export default function FilterSidebar({
  onFilterChange,
  initialFilters
}: FilterSidebarProps) {
  // Internal state for each filter category, initialized from props
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(() => initialFilters.status || []);
  const [selectedYears, setSelectedYears] = useState<string[]>(() => initialFilters.years || []);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>(() => initialFilters.projectTypes || []);
  const [selectedDomains, setSelectedDomains] = useState<string[]>(() => initialFilters.domains || []);
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>(() => initialFilters.sdgGoals || []);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>(() => initialFilters.techStack || []);

  // Memoized callback to notify the parent component of filter changes
  const notifyFilterChange = useCallback(() => {
    onFilterChange({
      status: selectedStatuses,
      years: selectedYears,
      projectTypes: selectedProjectTypes,
      domains: selectedDomains,
      sdgGoals: selectedSDGs, // Pass the raw value (e.g., 'GOAL_1')
      techStack: selectedTechStack
    });
  }, [
    selectedStatuses,
    selectedYears,
    selectedProjectTypes,
    selectedDomains,
    selectedSDGs,
    selectedTechStack,
    onFilterChange // Include onFilterChange in dependencies
  ]);

  // Effect to call the notification callback when any internal filter state changes
  useEffect(() => {
    notifyFilterChange();
  }, [notifyFilterChange]); // Dependency is the memoized callback

  // Effect to update internal state if the initialFilters prop changes (e.g., from URL)
  useEffect(() => {
    // Helper to compare arrays, prevents unnecessary state updates
    const arraysAreEqual = (a: string[] | undefined, b: string[] | undefined): boolean =>
      JSON.stringify(a?.sort() || []) === JSON.stringify(b?.sort() || []);

    if (!arraysAreEqual(initialFilters.status, selectedStatuses)) {
      setSelectedStatuses(initialFilters.status || []);
    }
    if (!arraysAreEqual(initialFilters.years, selectedYears)) {
      setSelectedYears(initialFilters.years || []);
    }
    if (!arraysAreEqual(initialFilters.projectTypes, selectedProjectTypes)) {
      setSelectedProjectTypes(initialFilters.projectTypes || []);
    }
    if (!arraysAreEqual(initialFilters.domains, selectedDomains)) {
      setSelectedDomains(initialFilters.domains || []);
    }
    if (!arraysAreEqual(initialFilters.sdgGoals, selectedSDGs)) {
      setSelectedSDGs(initialFilters.sdgGoals || []);
    }
    if (!arraysAreEqual(initialFilters.techStack, selectedTechStack)) {
      setSelectedTechStack(initialFilters.techStack || []);
    }
  }, [initialFilters]); // Depend on the entire initialFilters object

  // --- Data Transformations for Display ---

  // Map SDG goals for the filter section, memoized
  const sdgOptions: ReadonlyArray<Option> = useMemo(() => {
    // Ensure sdgGoals is an array of objects with a 'name' property
    if (!Array.isArray(sdgGoals) || !sdgGoals.every(g => typeof g === 'object' && g !== null && typeof g.name === 'string')) {
      console.error("Invalid sdgGoals data structure:", sdgGoals);
      return [];
    }
    return sdgGoals.map((goal) => ({
      value: goal.name, // Use the name (e.g., 'GOAL_1') as the value
      label: goal.name.replace(/_/g, " ").replace(/^GOAL /i, '') // Make label readable (e.g., '1')
    }));
  }, []); // Depends on imported sdgGoals

  // Helper map for faster label lookups for active filter badges
  const labelMap = useMemo(() => {
    const map = new Map<string, string>();
    [
      ...projectStatusOptions,
      ...yearOptions, // Already {value, label}
      ...projectTypeOptions,
      ...projectDomainsOptions,
      ...sdgOptions, // Use the mapped sdgOptions
      ...techStackOptions
    ].forEach(opt => {
      if (opt && typeof opt.value === 'string' && typeof opt.label === 'string') {
        map.set(opt.value, opt.label);
      }
    });
    return map;
  }, [yearOptions, sdgOptions]); // Recalculate if dynamic options change

  // Create a list of active filters with their labels for display, memoized
  const activeFiltersList = useMemo(() => [
    ...selectedStatuses.map(value => ({ type: 'status' as keyof FilterState, value, label: labelMap.get(value) ?? value })),
    ...selectedYears.map(value => ({ type: 'years' as keyof FilterState, value, label: value })), // Year value is the label
    ...selectedProjectTypes.map(value => ({ type: 'projectTypes' as keyof FilterState, value, label: labelMap.get(value) ?? value })),
    ...selectedDomains.map(value => ({ type: 'domains' as keyof FilterState, value, label: labelMap.get(value) ?? value })),
    ...selectedSDGs.map(value => ({ type: 'sdgGoals' as keyof FilterState, value, label: labelMap.get(value) ?? value })), // Use sdgOptions label
    ...selectedTechStack.map(value => ({ type: 'techStack' as keyof FilterState, value, label: labelMap.get(value) ?? value })),
  ], [selectedStatuses, selectedYears, selectedProjectTypes, selectedDomains, selectedSDGs, selectedTechStack, labelMap]);

  const hasActiveFilters = activeFiltersList.length > 0;

  // --- Event Handlers ---

  // Callback to clear all filters internally
  const clearFilters = useCallback(() => {
    setSelectedStatuses([]);
    setSelectedYears([]);
    setSelectedProjectTypes([]);
    setSelectedDomains([]);
    setSelectedSDGs([]);
    setSelectedTechStack([]);
    // Parent notification happens via useEffect watching state
  }, []);

  // Callback to remove a single specific filter internally
  const removeFilter = useCallback((filterType: keyof FilterState, filterValue: string) => {
    const setterMap = {
      status: setSelectedStatuses,
      years: setSelectedYears,
      projectTypes: setSelectedProjectTypes,
      domains: setSelectedDomains,
      sdgGoals: setSelectedSDGs,
      techStack: setSelectedTechStack,
    };
    const setter = setterMap[filterType];
    if (setter) {
      setter(prev => prev.filter(f => f !== filterValue));
    }
    // Parent notification happens via useEffect watching state
  }, []);

  // --- JSX Rendering ---
  return (
    <div className="bg-card p-3 rounded-lg border shadow-sm h-full flex flex-col">
      {/* Header with Title and Clear Button */}
      <div className="flex justify-between items-center mb-3 pb-2 border-b">
        <h3 className="font-semibold text-base">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7 text-muted-foreground hover:text-foreground">
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1 mb-3 flex-shrink-0">
          {activeFiltersList.map((filter) => (
            <Badge key={`${filter.type}-${filter.value}`} variant="secondary" className="flex items-center gap-1 pr-0.5">
              <span className="text-xs">{filter.label}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-0.5 rounded-full hover:bg-muted-foreground/20"
                onClick={() => removeFilter(filter.type, filter.value)}
                aria-label={`Remove filter ${filter.label}`}
              >
                <ClearIcon className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Scrollable Filter Sections */}
      <div className="space-y-1 divide-y divide-border/50 overflow-y-auto flex-grow">
        <GenericFilterSection
          title="Project Status"
          options={projectStatusOptions}
          selection={selectedStatuses}
          setSelection={setSelectedStatuses}
        />
        <GenericFilterSection
          title="Year"
          options={yearOptions}
          selection={selectedYears}
          setSelection={setSelectedYears}
        />
        <GenericFilterSection
          title="Project Type"
          options={projectTypeOptions}
          selection={selectedProjectTypes}
          setSelection={setSelectedProjectTypes}
          showIcons
        />
        <GenericFilterSection
          title="Project Domain"
          options={projectDomainsOptions}
          selection={selectedDomains}
          setSelection={setSelectedDomains}
          showIcons
        />
        <GenericFilterSection
          title="SDG Goals"
          options={sdgOptions} // Use the mapped options
          selection={selectedSDGs}
          setSelection={setSelectedSDGs}
        />
        <TechStackSection
          selection={selectedTechStack}
          setSelection={setSelectedTechStack}
        />
      </div>
    </div>
  );
}