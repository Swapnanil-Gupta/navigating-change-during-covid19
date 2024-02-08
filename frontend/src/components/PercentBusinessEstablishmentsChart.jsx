import useBusinessData from "@/hooks/useBusinessData";
import Loader from "@/components/ui/loader";
import { Chart } from "react-google-charts";

export default function PercentBusinessEstablishmentsChart({
  stateCode,
  includedIndustries,
  startYear,
  endYear,
  viewWindowMin,
  viewWindowMax,
}) {
  const { isLoading, isError, data, error } = useBusinessData({
    stateCode,
    includedIndustries,
    startYear,
    endYear,
  });

  const colCount = data ? data[0].length : 0;
  const seriesOption = {
    0: { targetAxisIndex: 1, lineWidth: 4, lineDashStyle: [5, 1, 5] },
  };
  for (let i = 1; i < colCount; i++) seriesOption[i] = { targetAxisIndex: 0 };
  const ticksOption = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const chartOptions = {
    pointSize: 6,
    series: seriesOption,
    vAxes: {
      0: {
        title: "Percentage of Total Business Establishments (%)",
        viewWindow: {
          min: viewWindowMin,
          max: viewWindowMax,
        },
      },
      1: { title: "Number of confirmed COVID-19 Cases" },
    },
    hAxis: {
      title: "Year",
      titleTextStyle: { italic: false },
      ticks: ticksOption,
    },
    vAxis: {
      titleTextStyle: { italic: false },
    },
    explorer: {
      actions: ["dragToZoom", "rightClickToReset"],
      axis: "horizontal",
      keepInBounds: true,
      maxZoomIn: 25,
    },
    legend: {
      position: "top",
    },
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold">
        Yearly Distribution of Business Establishments by Industry in the State
      </h3>
      {isLoading && <Loader className="mx-auto my-8 h-8 w-8" />}
      {!isLoading && !isError && (
        <Chart
          chartType="LineChart"
          width="100%"
          height="800px"
          data={data}
          options={chartOptions}
        />
      )}
      {!isLoading && isError && (
        <p className="mt-4 text-base text-red-600">{error.message}</p>
      )}
    </div>
  );
}
