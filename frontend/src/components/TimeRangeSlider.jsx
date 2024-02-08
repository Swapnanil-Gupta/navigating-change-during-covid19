import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RangeSlider } from "@/components/ui/slider";
import { RotateCcw } from "lucide-react";

export default function TimeRangeSlider({
  minYear,
  maxYear,
  step = 1,
  startYear,
  endYear,
  onValueCommit,
}) {
  const [start, setStart] = useState(startYear);
  const [end, setEnd] = useState(endYear);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <p>
          <span className="font-semibold">Time Range</span>: {start} - {end}
        </p>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setStart(minYear);
            setEnd(maxYear);
            onValueCommit([minYear, maxYear]);
          }}
        >
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Reset time range</span>
        </Button>
      </div>
      <RangeSlider
        value={[start, end]}
        min={minYear}
        max={maxYear}
        step={step}
        onValueChange={([s, e]) => {
          setStart(s);
          setEnd(e);
        }}
        onValueCommit={onValueCommit}
      />
    </div>
  );
}
