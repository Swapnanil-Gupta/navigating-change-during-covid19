import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function usePayrollData({
  stateCode,
  includedIndustries = [],
  startYear,
  endYear,
}) {
  const query = useQuery(
    ["/payroll-data", stateCode, includedIndustries, startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/payroll-data", {
          params: {
            stateCode,
            startYear,
            endYear,
            includedIndustries,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch payroll data");
      }
    }
  );
  return query;
}
