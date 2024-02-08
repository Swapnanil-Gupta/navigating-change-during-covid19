import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useTopEnergySectors({ stateCode, startYear, endYear }) {
  const query = useQuery(
    ["/emission-data/top-sectors", stateCode, startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/emission-data/top-sectors", {
          params: {
            stateCode,
            startYear,
            endYear,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch top energy sectors");
      }
    }
  );
  return query;
}
