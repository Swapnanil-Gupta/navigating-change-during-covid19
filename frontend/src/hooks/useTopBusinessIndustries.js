import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useTopBusinessIndustries({
  stateCode,
  startYear,
  endYear,
}) {
  const query = useQuery(
    ["/business-data/top-industries", stateCode, startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/business-data/top-industries", {
          params: {
            stateCode,
            startYear,
            endYear,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch top business industries");
      }
    }
  );
  return query;
}
