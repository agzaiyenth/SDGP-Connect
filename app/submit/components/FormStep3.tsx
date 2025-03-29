
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { techStackOptions,projectDomainOptions, projectStatusOptions, projectTypeOptions, sdgGoals, techCategories  } from "@/data/Project";
import { ProjectSubmissionSchema} from "@/data/schemas/Project";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

const FormStep3 = () => {
  const { control, watch } = useFormContext<ProjectSubmissionSchema>();



  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Project Classification
      </h2>
      <p className="text-slate-600 dark:text-slate-400">
        Help us categorize your project to increase its visibility.
      </p>

      <FormField
        control={control}
        name="techStack"
        render={() => (
          <FormItem>
            <FormLabel>Tech Stack</FormLabel>
            <div className="mt-2">
              <Tabs defaultValue="frontend" className="w-full">
                <TabsList className="w-full justify-start mb-4 flex-wrap h-auto p-1">
                  <TabsTrigger value="frontend">Frontend</TabsTrigger>
                  <TabsTrigger value="backend">Backend</TabsTrigger>
                  <TabsTrigger value="mobile">Mobile</TabsTrigger>
                  <TabsTrigger value="cloud">Cloud</TabsTrigger>
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="ai">AI / ML</TabsTrigger>
                  <TabsTrigger value="hardware">Hardware</TabsTrigger>
                </TabsList>
                
                {Object.entries(techCategories).map(([category, keys]) => (
                  <TabsContent value={category} key={category} className="mt-0">
                    <Card>
                      <CardContent className="p-4 pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {techStackOptions
                            .filter(option => keys.includes(option.value))
                            .map((option) => (
                              <FormField
                                key={option.value}
                                control={control}
                                name="techStack"
                                render={({ field }) => {
                                  const isSelected = field.value?.includes(option.value);
                                  return (
                                    <div
                                      className={cn(
                                        "flex items-center p-3 rounded-lg border cursor-pointer transition-colors space-x-2",
                                        isSelected
                                          ? "border-primary bg-primary/10"
                                          : "border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50"
                                      )}
                                      onClick={() => {
                                        const updatedValue = isSelected
                                          ? field.value?.filter((val) => val !== option.value) || []
                                          : [...(field.value || []), option.value];
                                        field.onChange(updatedValue);
                                      }}
                                    >
                                      <Checkbox
                                        checked={isSelected}
                                        className="pointer-events-none"
                                      />
                                      <span className="text-sm">{option.label}</span>
                                    </div>
                                  )
                                }}
                              />
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            <FormDescription>
              Select all technologies used in your project
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="projectType"
        render={() => (
          <FormItem>
            <FormLabel>Project Type</FormLabel>
            <div className="mt-2">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {projectTypeOptions.map((option) => (
                  <FormField
                    key={option.value}
                    control={control}
                    name="projectType"
                    render={({ field }) => {
                      const isSelected = field.value?.includes(option.value);
                      return (
                        <div
                          className={cn(
                            "flex items-center p-3 rounded-lg border cursor-pointer transition-colors space-x-2",
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50"
                          )}
                          onClick={() => {
                            const updatedValue = isSelected
                              ? field.value?.filter((val) => val !== option.value) || []
                              : [...(field.value || []), option.value];
                            field.onChange(updatedValue);
                          }}
                        >
                          <Checkbox
                            checked={isSelected}
                            className="pointer-events-none"
                          />
                          <span className="text-sm">{option.label}</span>
                        </div>
                      )
                    }}
                  />
                ))}
              </div>
            </div>
            <FormDescription>
              Select all that apply to your project
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="projectStatus"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Project Status</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-wrap gap-6"
              >
                {projectStatusOptions.map((status) => (
                  <div className="flex items-center space-x-2" key={status.value}>
                    <RadioGroupItem value={status.value} id={status.value} />
                    <Label htmlFor={status.value}>{status.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Current development stage of your project
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sdgGoals"
        render={() => (
          <FormItem>
            <FormLabel>UN Sustainable Development Goals</FormLabel>
            <FormDescription className="mb-2">
              Which SDGs does your project address? (Optional)
            </FormDescription>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {sdgGoals.map((goal) => (
                <FormField
                  key={goal.id}
                  control={control}
                  name="sdgGoals"
                  render={({ field }) => {
                    const isSelected = field.value?.includes(goal.id);
                    return (
                      <div
                        className={cn(
                          "flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-colors",
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50"
                        )}
                        onClick={() => {
                          const updatedValue = isSelected
                            ? field.value?.filter((id) => id !== goal.id) || []
                            : [...(field.value || []), goal.id];
                          field.onChange(updatedValue);
                        }}
                      >
                        <div className="text-2xl mb-2">{goal.icon}</div>
                        <div className="text-xs text-center font-medium">{goal.title}</div>
                      </div>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="projectDomains"
        render={() => (
          <FormItem>
            <FormLabel>Project Domains</FormLabel>
            <div className="mt-2">
              <Card>
                <CardContent className="p-4 pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {projectDomainOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={control}
                        name="projectDomains"
                        render={({ field }) => {
                          const isSelected = field.value?.includes(option.value);
                          return (
                            <div
                              className={cn(
                                "flex items-center p-3 rounded-lg border cursor-pointer transition-colors space-x-2",
                                isSelected
                                  ? "border-primary bg-primary/10"
                                  : "border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50"
                              )}
                              onClick={() => {
                                const updatedValue = isSelected
                                  ? field.value?.filter((val) => val !== option.value) || []
                                  : [...(field.value || []), option.value];
                                field.onChange(updatedValue);
                              }}
                            >
                              <Checkbox
                                checked={isSelected}
                                className="pointer-events-none"
                              />
                              <span className="text-sm">{option.label}</span>
                            </div>
                          )
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <FormDescription>
              Select all domains that apply to your project
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormStep3;