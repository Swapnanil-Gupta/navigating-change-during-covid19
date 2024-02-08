import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useTaxGeoData({ startYear, endYear }) {
  const query = useQuery(["/tax-data/geo", startYear, endYear], async () => {
    try {
      const response = await axios.get("/tax-data/geo", {
        params: {
          startYear,
          endYear,
        },
      });
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch tax geo data");
    }
  });
  return query;
}
