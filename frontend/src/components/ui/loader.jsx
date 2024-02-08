import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Loader = forwardRef(({ className, ...props }, ref) => {
  return (
    <Loader2 ref={ref} className={cn("animate-spin", className)} {...props} />
  );
});
Loader.displayName = "Loader";

export default Loader;
