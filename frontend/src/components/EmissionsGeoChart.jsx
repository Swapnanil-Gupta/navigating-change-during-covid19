import useEmissionsGeoData from "@/hooks/useEmissionsGeoData";
import Loader from "@/components/ui/loader";
import { Chart } from "react-google-charts";

const chartOptions = {
  region: "US",
  resolution: "provinces",
};

export default function EmissionsGeoChart({ startYear, endYear }) {
  const { isLoading, isError, data, error } = useEmissionsGeoData({
    startYear,
    endYear,
  });

  return (
    <div>
      <h3 className="text-2xl font-semibold">
        Geographical Distribution of Total Fossil Fuel Emissions from{" "}
        {startYear}-{endYear}
      </h3>
      {isLoading && <Loader className="mx-auto my-8 h-8 w-8" />}
      {!isLoading && !isError && (
        <Chart
          chartType="GeoChart"
          width="100%"
          height="800px"
          options={chartOptions}
          data={data}
        />
      )}
      {!isLoading && isError && (
        <p className="mt-4 text-base text-red-600">{error.message}</p>
      )}
    </div>
  );
}
