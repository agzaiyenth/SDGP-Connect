/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import React from "react";
import { projectTypeOptions } from "../lib/types/mapping";
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
