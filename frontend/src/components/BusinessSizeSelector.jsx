import { useState } from "react";
import useBusinessSizes from "@/hooks/useBusinessSizes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { RotateCcw } from "lucide-react";

export default function BusinessSizeSelector({
  selectedSizes,
  onCheckedChange,
  onReset,
}) {
  const { isLoading, isError, data, error } = useBusinessSizes();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data
    ? data.filter(({ sizeName }) =>
        sizeName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-4">
        <p className="font-semibold">Business Sizes</p>
        <Button variant="outline" size="icon" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Reset business sizes</span>
        </Button>
      </div>
      {isLoading && <Loader className="h-6 w-6" />}
      {!isLoading && !isError && (
        <>
          <Input
            type="search"
            placeholder="Search business sizes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ScrollArea className="h-48">
            <div className="flex flex-col gap-y-2 border rounded-md p-2">
              {filteredData.map(({ sizeCode, sizeName }) => (
                <div key={sizeCode} className="flex items-center gap-x-2">
                  <Checkbox
                    checked={selectedSizes.includes(sizeCode)}
                    onCheckedChange={(checked) =>
                      onCheckedChange(checked, sizeCode)
                    }
                  />
                  <p>{sizeName}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
      {!isLoading && isError && (
        <p className="text-base text-red-600">{error.message}</p>
      )}
    </div>
  );
}
