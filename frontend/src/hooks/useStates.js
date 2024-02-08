import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useStates() {
  const query = useQuery("/state", async () => {
    try {
      const response = await axios.get("/state");
      return response.data;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.error);
      }
      throw new Error("Failed to fetch states");
    }
  });

  return query;
}
