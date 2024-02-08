import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useBusinessGeoData({ startYear, endYear }) {
  const query = useQuery(
    ["/emission-data/geo", startYear, endYear],
    async () => {
      try {
        const response = await axios.get("/emission-data/geo", {
          params: {
            startYear,
            endYear,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch business geo data");
      }
    }
  );
  return query;
}
