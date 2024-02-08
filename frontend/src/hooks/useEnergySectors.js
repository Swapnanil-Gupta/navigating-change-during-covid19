import { useQuery } from "react-query";
import axios from "@/lib/axios";

export default function useEnergySectors() {
  const query = useQuery(["/energy-sector"], async () => {
    try {
      const response = await axios.get("/energy-sector");
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch energy sectors");
    }
  });
  return query;
}
