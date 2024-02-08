import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function usePayrollGeoData({ startYear, endYear }) {
  const query = useQuery(
    ["/payroll-data/geo", startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/payroll-data/geo", {
          params: {
            startYear,
            endYear,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch payroll geo data");
      }
    }
  );
  return query;
}
