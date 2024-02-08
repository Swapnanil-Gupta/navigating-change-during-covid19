import useStates from "@/hooks/useStates";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function StateDropdown({ value, onValueChange }) {
  const { data, isLoading, isError, error } = useStates();

  return (
    <div className="flex items-center gap-x-4">
      <Label className="text-base font-semibold" htmlFor="state">
        State
      </Label>
      {isLoading && <Loader className="h-6 w-6" />}
      {!isLoading && !isError && (
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger id="state" className="w-52">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent className="max-h-96">
            {data.map((s) => (
              <SelectItem key={s.stateCode} value={s.stateCode}>
                {s.stateName}
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
