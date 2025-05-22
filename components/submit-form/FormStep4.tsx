import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ProjectSubmissionSchema } from "@/validations/submit_project";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { SocialTypeEnum } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const FormStep4 = () => {
  const { control, watch, setValue } = useFormContext<ProjectSubmissionSchema>();
  
  // Watch country code and phone number to combine them
  const countryCode = watch("projectDetails.country_code");
  const phoneNumber = watch("projectDetails.phone_number");
  
  // Use useFieldArray for handling the socialLinks array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  // Add a new empty social link
  const addSocialLink = () => {
    append({ link_name: SocialTypeEnum.LINKEDIN, url: "" });
  };

  // Update the combined phone field whenever country code or phone number changes
  const updateCombinedPhone = (newCountryCode?: string, newPhoneNumber?: string) => {
    const currentCountryCode = newCountryCode || countryCode || "";
    const currentPhoneNumber = newPhoneNumber || phoneNumber || "";
    
    if (currentCountryCode && currentPhoneNumber) {
      setValue("projectDetails.team_phone", `${currentCountryCode}${currentPhoneNumber}`);
    } else {
      setValue("projectDetails.team_phone", "");
    }
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
            <FormLabel>Team Email<span className="text-red-500">*</span></FormLabel>
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

      {/* Team Phone with Country Code */}
      <div className="space-y-4">
        <FormLabel className="text-base">Team Phone (or primary Contact)<span className="text-red-500">*</span></FormLabel>
        <FormDescription>
          Enter your country code and phone number. They will be combined automatically.
        </FormDescription>
        
        <div className="grid grid-cols-[120px_1fr] gap-4">
          {/* Country Code */}
          <FormField
            control={control}
            name="projectDetails.country_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Country Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="+94"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Ensure it starts with + if user enters numbers
                      const formattedValue = value.startsWith('+') ? value : value ? `+${value.replace(/^\+/, '')}` : '';
                      field.onChange(formattedValue);
                      updateCombinedPhone(formattedValue, phoneNumber);
                    }}
                    onBlur={(e) => {
                      // Validate country code format on blur
                      const value = e.target.value;
                      if (value && !value.match(/^\+\d{1,4}$/)) {
                        // If invalid format, clear the field
                        field.onChange('');
                        updateCombinedPhone('', phoneNumber);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={control}
            name="projectDetails.phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="771234567"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                      if (value.length <= 10) { // Limit to 10 digits
                        field.onChange(value);
                        updateCombinedPhone(countryCode, value);
                      }
                    }}
                    maxLength={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Display Combined Phone Number */}
        {countryCode && phoneNumber && (
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">Combined Phone Number:</p>
            <p className="font-medium">{countryCode}{phoneNumber}</p>
          </div>
        )}

        {/* Hidden field for the combined phone number */}
        <FormField
          control={control}
          name="projectDetails.team_phone"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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