import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useEmissionsData({
  stateCode,
  includedSectors = [],
  startYear,
  endYear,
}) {
  const query = useQuery(
    ["/emission-data", stateCode, includedSectors, startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/emission-data", {
          params: {
            stateCode,
            startYear,
            endYear,
            includedSectors,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch emission data");
      }
    }
  );
  return query;
}
