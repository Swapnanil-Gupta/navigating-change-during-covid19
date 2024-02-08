import useBusinessIndustries from "@/hooks/useBusinessIndustries";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function BusinessIndustryDropdown({ value, onValueChange }) {
  const { data, isLoading, isError, error } = useBusinessIndustries();

  return (
    <div className="flex items-center gap-x-4">
      <Label className="text-base font-semibold" htmlFor="business-industry">
        Business Industry
      </Label>
      {isLoading && <Loader className="h-6 w-6" />}
      {!isLoading && !isError && (
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger id="business-industry" className="h-12 w-80">
            <SelectValue placeholder="Select a business industry" />
          </SelectTrigger>
          <SelectContent className="max-h-96">
            {data.map((s) => (
              <SelectItem key={s.industryCode} value={s.industryCode}>
                {s.industryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {!isLoading && isError && (
        <p className="text-base text-red-600">{error.message}</p>
      )}
    </div>
  );
}
