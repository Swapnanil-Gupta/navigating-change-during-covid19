import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useTaxCategories() {
  const query = useQuery(["/tax-category"], async () => {
    try {
      const response = await axios.get("/tax-category");
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch tax categories");
    }
  });
  return query;
}
