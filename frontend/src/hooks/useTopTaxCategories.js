import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useTopTaxCategories({ stateCode, startYear, endYear }) {
  const query = useQuery(
    ["/tax-data/top-categories", stateCode, startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/tax-data/top-categories", {
          params: {
            stateCode,
            startYear,
            endYear,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch top tax categories");
      }
    }
  );
  return query;
}
