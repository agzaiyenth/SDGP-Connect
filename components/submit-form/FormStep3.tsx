'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { ProjectSubmissionSchema } from "@/validations/submit_project";
import { ProjectDomainEnum, ProjectStatusEnum, ProjectTypeEnum, SDGGoalEnum, TechStackEnum } from "@prisma/client";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const FormStep3 = () => {
  const { control, watch, setValue } = useFormContext<ProjectSubmissionSchema>();

  // Convert enums to arrays for rendering select options
  const techStackOptions = Object.values(TechStackEnum);
  const projectTypeOptions = Object.values(ProjectTypeEnum);
  const projectDomainOptions = Object.values(ProjectDomainEnum);
  const sdgGoalsOptions = Object.values(SDGGoalEnum);

  // Watch arrays for badge rendering
  const selectedTechStack = watch("techStack") || [];
  const selectedProjectTypes = watch("projectTypes") || [];
  const selectedDomains = watch("domains") || [];
  const selectedSDGGoals = watch("sdgGoals") || [];

  // Helper function to toggle item in array
  const toggleArrayItem = <T,>(array: T[], item: T, key: keyof ProjectSubmissionSchema) => {
    if (array.includes(item)) {
      setValue(key, array.filter((i) => i !== item) as any, {
        shouldValidate: true,
      });
    } else {
      setValue(key, [...array, item] as any, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Project Classification
      </h2>

      {/* Tech Stack */}
      <FormField
        control={control}
        name="techStack"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tech Stack</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} selected`
                        : "Select technologies"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command className="w-full">
                    <CommandInput placeholder="Search technologies..." />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {techStackOptions.map((tech) => (
                        <CommandItem
                          key={tech}
                          value={tech}
                          onSelect={() => {
                            toggleArrayItem(selectedTechStack, tech, "techStack");
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedTechStack.includes(tech) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {tech}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedTechStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleArrayItem(selectedTechStack, tech, "techStack")}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Project Type */}
      <FormField
        control={control}
        name="projectTypes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Type</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} selected`
                        : "Select project types"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command className="w-full">
                    <CommandInput placeholder="Search project types..." />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {projectTypeOptions.map((type) => (
                        <CommandItem
                          key={type}
                          value={type}
                          onSelect={() => {
                            toggleArrayItem(selectedProjectTypes, type, "projectTypes");
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedProjectTypes.includes(type) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {type}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedProjectTypes.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleArrayItem(selectedProjectTypes, type, "projectTypes")}
                >
                  {type}
                </Badge>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Project Status */}
      <FormField
        control={control}
        name="status.status"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Project Status</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value as ProjectStatusEnum)}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={ProjectStatusEnum.IDEA} />
                  </FormControl>
                  <FormLabel className="font-normal">Idea</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={ProjectStatusEnum.MVP} />
                  </FormControl>
                  <FormLabel className="font-normal">MVP</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={ProjectStatusEnum.DEPLOYED} />
                  </FormControl>
                  <FormLabel className="font-normal">Deployed</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={ProjectStatusEnum.STARTUP} />
                  </FormControl>
                  <FormLabel className="font-normal">Startup</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* SDG Goals */}
      <FormField
        control={control}
        name="sdgGoals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sustainable Development Goals</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} selected`
                        : "Select SDG goals"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command className="w-full">
                    <CommandInput placeholder="Search SDG goals..." />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {sdgGoalsOptions.map((goal) => (
                        <CommandItem
                          key={goal}
                          value={goal}
                          onSelect={() => {
                            toggleArrayItem(selectedSDGGoals, goal, "sdgGoals");
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedSDGGoals.includes(goal) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {goal}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSDGGoals.map((goal) => (
                <Badge
                  key={goal}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleArrayItem(selectedSDGGoals, goal, "sdgGoals")}
                >
                  {goal}
                </Badge>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Project Domain */}
      <FormField
        control={control}
        name="domains"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Domains</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value?.length && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} selected`
                        : "Select domains"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command className="w-full">
                    <CommandInput placeholder="Search domains..." />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {projectDomainOptions.map((domain) => (
                        <CommandItem
                          key={domain}
                          value={domain}
                          onSelect={() => {
                            toggleArrayItem(selectedDomains, domain, "domains");
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedDomains.includes(domain) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {domain}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedDomains.map((domain) => (
                <Badge
                  key={domain}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleArrayItem(selectedDomains, domain, "domains")}
                >
                  {domain}
                </Badge>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormStep3;