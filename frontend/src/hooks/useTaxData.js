import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useTaxData({
  stateCode,
  includedCategories = [],
  startYear,
  endYear,
}) {
  const query = useQuery(
    ["/tax-data", stateCode, includedCategories, startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/tax-data", {
          params: {
            stateCode,
            startYear,
            endYear,
            includedCategories,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch tax data");
      }
    }
  );
  return query;
}
