import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useTotalTuples() {
  const query = useQuery(
    "/tuples",
    async () => {
      try {
        const response = await axios.get("/tuples");
        return response.data;
      } catch (err) {
        if (err.response) {
          throw new Error(err.response.data.error);
        }
        throw new Error("Failed to fetch total tuples");
      }
    },
    {
      enabled: false,
    }
  );

  return query;
}
