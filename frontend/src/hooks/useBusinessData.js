import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useBusinessData({
  stateCode,
  includedIndustries = [],
  startYear,
  endYear,
}) {
  const query = useQuery(
    ["/business-data", stateCode, includedIndustries, startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/business-data", {
          params: {
            stateCode,
            startYear,
            endYear,
            includedIndustries,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch business data");
      }
    }
  );
  return query;
}
