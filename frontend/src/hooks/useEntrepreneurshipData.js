import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useEntrepreneurshipData({
  stateCode,
  industryCode,
  includedSizes = [],
  startYear,
  endYear,
}) {
  const query = useQuery(
    [
      "/entrepreneurship-data",
      stateCode,
      industryCode,
      includedSizes,
      startYear,
      endYear,
    ],
    async () => {
      try {
        const response = await axios.get("/entrepreneurship-data", {
          params: {
            stateCode,
            industryCode,
            includedSizes,
            startYear,
            endYear,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch entrepreneurship data");
      }
    }
  );
  return query;
}
