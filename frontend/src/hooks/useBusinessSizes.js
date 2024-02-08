import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useBusinessSizes() {
  const query = useQuery(["/business-size"], async () => {
    try {
      const response = await axios.get("/business-size");
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch business sizes");
    }
  });
  return query;
}
