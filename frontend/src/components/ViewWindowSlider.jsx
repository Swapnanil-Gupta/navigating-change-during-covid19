import { useState } from "react";
import { RangeSlider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function ViewWindowSlider({
  min,
  max,
  step = 0.1,
  onValueCommit,
}) {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <p>
          <span className="font-semibold">View Window</span>:{" "}
          {start ?? "Default"} - {end ?? "Default"}
        </p>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setStart(null);
            setEnd(null);
            onValueCommit([null, null]);
          }}
        >
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Reset View Window</span>
        </Button>
      </div>
      <RangeSlider
        value={[start, end]}
        min={min}
        max={max}
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
