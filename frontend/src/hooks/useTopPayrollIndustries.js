import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useTopPayrollIndustries({
  stateCode,
  startYear,
  endYear,
}) {
  const query = useQuery(
    ["/payroll-data/top-industries", stateCode, startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/payroll-data/top-industries", {
          params: {
            stateCode,
            startYear,
            endYear,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch top payroll industries");
      }
    }
  );
  return query;
}
