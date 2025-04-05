import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ProjectSubmissionSchema } from "@/validations/submit_project";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { SocialTypeEnum } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const FormStep4 = () => {
  const { control } = useFormContext<ProjectSubmissionSchema>();
  
  // Use useFieldArray for handling the socialLinks array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  // Add a new empty social link
  const addSocialLink = () => {
    append({ link_name: SocialTypeEnum.LINKEDIN, url: "" });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Contact Information
      </h2>

      {/* Team Email */}
      <FormField
        control={control}
        name="projectDetails.team_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="info@lexi.lk"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Team Phone */}
      <FormField
        control={control}
        name="projectDetails.team_phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Phone (or primary Contact)</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="+94XXXXXXXXX"
                {...field}
                value={field.value || ""} // Ensure value is a string
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Social Links */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel className="text-base">Social Links</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSocialLink}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Link
          </Button>
        </div>

        {fields.length === 0 ? (
          <p className="text-sm text-muted-foreground">No social links added yet.</p>
        ) : (
          fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_2fr_auto] gap-4">
              <FormField
                control={control}
                name={`socialLinks.${index}.link_name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={SocialTypeEnum.LINKEDIN}>LinkedIn</SelectItem>
                          <SelectItem value={SocialTypeEnum.TWITTER}>Twitter</SelectItem>
                          <SelectItem value={SocialTypeEnum.INSTAGRAM}>Instagram</SelectItem>
                          <SelectItem value={SocialTypeEnum.FACEBOOK}>Facebook</SelectItem>
                          <SelectItem value={SocialTypeEnum.YOUTUBE}>YouTube</SelectItem>
                          <SelectItem value={SocialTypeEnum.TIKTOK}>TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`socialLinks.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="URL (e.g., https://linkedin.com/...)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="self-center"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FormStep4;
