import useTotalTuples from "@/hooks/useTotalTuples";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

export default function TotalTuples() {
  const { isFetching, isError, data, error, refetch } = useTotalTuples();

  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={refetch}>Fetch Total Tuples</Button>
      {isFetching ? (
        <Loader />
      ) : isError ? (
        <p className="text-base text-red-600">{error.message}</p>
      ) : data ? (
        <p>Total Tuples: {data}</p>
      ) : (
        ""
      )}
    </div>
  );
}
