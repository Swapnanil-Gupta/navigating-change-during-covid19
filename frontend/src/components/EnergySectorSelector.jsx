import { useState } from "react";
import useEnergySectors from "@/hooks/useEnergySectors";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { RotateCcw } from "lucide-react";

export default function EnergySectorSelector({
  includedSectors,
  onCheckedChange,
  onReset,
}) {
  const { isLoading, isError, data, error } = useEnergySectors();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data
    ? data.filter(({ sectorName }) =>
        sectorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-4">
        <p className="font-semibold">Energy Sectors</p>
        <Button variant="outline" size="icon" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Reset energy sectors</span>
        </Button>
      </div>
      {isLoading && <Loader className="h-6 w-6" />}
      {!isLoading && !isError && (
        <>
          <Input
            type="search"
            placeholder="Search energy sectors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ScrollArea className="h-48">
            <div className="flex flex-col gap-y-2 border rounded-md p-2">
              {filteredData.map(({ sectorCode, sectorName }) => (
                <div key={sectorCode} className="flex items-center gap-x-2">
                  <Checkbox
                    checked={includedSectors.includes(sectorCode)}
                    onCheckedChange={(checked) =>
                      onCheckedChange(checked, sectorCode)
                    }
                  />
                  <p>{sectorName}</p>
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
