import React from "react";
import { projectTypeOptions } from "../types/project/mapping";
import { IconType } from "react-icons";

interface Props {
  projectTypes?: typeof projectTypeOptions;
  onSelect?: (value: string) => void;
}

const ProjectTypeCard = ({ projectTypes = projectTypeOptions, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {projectTypes.map((type) => {
        const Icon = type.icon as IconType;

        return (
          <button
            key={type.value}
            onClick={() => onSelect?.(type.value)}
            className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
          >
            {Icon && <Icon className="text-[0.75rem]" />}
            {type.label}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectTypeCard;
