import { useState } from "react";
import StateDropdown from "@/components/StateDropdown";
import TimeRangeSlider from "@/components/TimeRangeSlider";
import PercentEmissionsChart from "@/components/PercentEmissionsChart";
import TopEnergySectorsChart from "@/components/TopEnergySectorsChart";
import ViewWindowSlider from "@/components/ViewWindowSlider";
import EnergySectorSelector from "@/components/EnergySectorSelector";
import EmissionsGeoChart from "@/components/EmissionsGeoChart";

const defaults = {
  selectedState: 1,
  includedSectors: [11, 22, 33, 44, 55],
  startYear: 1970,
  endYear: 2021,
  minYear: 1970,
  maxYear: 2021,
  viewWindowMin: null,
  viewWindowMax: null,
};

export default function Emissions() {
  const [selectedState, setSelectedState] = useState(defaults.selectedState);
  const [includedSectors, setIncludedSectors] = useState(
    defaults.includedSectors
  );
  const [startYear, setStartYear] = useState(defaults.startYear);
  const [endYear, setEndYear] = useState(defaults.endYear);
  const [viewWindowMin, setViewWindowMin] = useState(defaults.viewWindowMin);
  const [viewWindowMax, setViewWindowMax] = useState(defaults.viewWindowMax);

  return (
    <main className="flex flex-col gap-y-6">
      <h1 className="font-extrabold tracking-tight text-4xl">
        Fossil Fuel Emissions
      </h1>
      <div className="flex flex-col gap-y-2">
        <p>
          On this page, you can find information regarding the average fossil
          fuel emissions per energy sector for the different states of the US
          during COVID-19 and prior. Each state has five different energy
          sectors that make up the total emissions per year which include
          commercial, electric power, industrial, residential, and
          transportation. With the use of the time period slider bar, state
          selection, and energy sector filter, one can view three different
          graphs that relay fossil fuel emission patterns given the criteria
          noted.
        </p>
        <p>
          The line graph represents the percentage of total fossil fuel
          emissions in the U.S that that sector makes up and overlays this
          information with the number of Covid-19 cases in that given year per
          state. This allows one to see any changes that may appear in the
          number of emission patterns per sector as the increase in Covid-19
          cases surges in the U.S.
        </p>
        <p>
          The bar graph below, similarly, highlights the 5 energy sectors and
          their total emissions in parts per million CO2 during the selected
          time period. This makes it easy to visualize which sectors make up
          most of the state's emission values during any given time period in
          terms of amount of CO2 rather than percentage make-up.
        </p>
        <p>
          These graphs provide insight into how Covid-19 has played a role in
          the U.S energy emission patterns and allows users to explore changes
          that occurred over time in each state. Some of the most significant
          findings are highlighted below.
        </p>
      </div>

      <div className="flex flex-col gap-y-2">
        <h3 className="text-2xl font-semibold">Controls</h3>
        <div className="grid grid-cols-2 gap-x-8 border-2 p-4 rounded-lg">
          <div className="flex flex-grow flex-col gap-y-4">
            <StateDropdown
              value={selectedState}
              onValueChange={(val) => setSelectedState(val)}
            />
            <TimeRangeSlider
              minYear={defaults.minYear}
              maxYear={defaults.maxYear}
              startYear={startYear}
              endYear={endYear}
              onValueCommit={([start, end]) => {
                setStartYear(start);
                setEndYear(end);
              }}
            />
            <ViewWindowSlider
              min={0.1}
              max={100}
              onValueCommit={([min, max]) => {
                setViewWindowMin(min);
                setViewWindowMax(max);
              }}
            />
          </div>
          <EnergySectorSelector
            includedSectors={includedSectors}
            onCheckedChange={(checked, sectorCode) => {
              setIncludedSectors((i) =>
                checked
                  ? i.concat(sectorCode)
                  : i.filter((v) => v !== sectorCode)
              );
            }}
            onReset={() => setIncludedSectors([])}
          />
        </div>
      </div>
      <PercentEmissionsChart
        stateCode={selectedState}
        includedSectors={includedSectors}
        startYear={startYear}
        endYear={endYear}
        viewWindowMin={viewWindowMin}
        viewWindowMax={viewWindowMax}
      />
      <TopEnergySectorsChart
        stateCode={selectedState}
        startYear={startYear}
        endYear={endYear}
      />
      <EmissionsGeoChart startYear={startYear} endYear={endYear} />

      <div className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-2xl">Trend Analysis</h3>
        <div className="flex flex-col gap-y-2">
          <p>
            <strong>
              How did the number of COVID-19 cases in the different states of
              the US affect the amount of CO2 emissions produced per energy
              sector per year of that state over time? Did a certain energy
              sector see an increase or decrease in fuel emissions based on
              increasing COVID-19 cases?
            </strong>
          </p>
          <p>
            Several different trends were observed in the generation of this
            query and the most significant was the increase in fossil fuel
            emissions from the transportation energy sector. Almost every state
            had the transportation energy sector as its highest contributor to
            overall emissions, but during the time period 2017-2021, there was a
            significant increase. As we saw in the business establishments
            analysis, the transportation and warehousing sector saw a spike in
            number of business establishments. This now carriers over into the
            emission pattern for this energy sector as transportation continues
            to increase in contribution to CO2 emissions during COVID-19. Since
            this industry follows an indirect relationship to the retail trade
            market in that E-commerce has significantly increased the need for
            transportation and warehousing support. As a drop in in-person
            shopping occurred due to the onset of Covid-19 in each state, the
            increase in warehouse businesses as well as freight companies shows
            the shift in consumer demand to online purchases. Platforms like
            Amazon are a good example of how the rise in E-commerce businesses
            will skyrocket the need for more warehouses and transportation
            solutions throughout the country, thus fossil fuel emissions will
            continue to rise for this sector.
          </p>
          <p>
            In addition to the change in transportation energy consumption, the
            electric power sector saw a decline in fossil fuel emissions. The
            decrease in fossil fuel emissions in the U.S. electric power energy
            sector during the COVID-19 pandemic was primarily driven by a drop
            in economic activity due to lockdowns and restrictions. Lower demand
            for electricity resulted in reduced operation of fossil fuel-based
            power plants. Additionally, the shift in energy consumption
            patterns, with more people working from home and changes in
            industrial production, contributed to altered energy mixes, favoring
            cleaner sources. Some regions and utilities prioritized clean energy
            initiatives, and economic factors may have made renewable energy
            investments more attractive. While the pandemic-induced emissions
            reduction was temporary, it underscored the potential for flexible
            and sustainable energy systems, prompting ongoing discussions about
            integrating these lessons into future energy policies.
          </p>
          <p>
            Lastly, the general trend in residential and commercial energy
            sectors in the USA saw relatively stable emission patterns during
            the COVID-19 pandemic for several reasons. The shift to remote work
            and lockdowns led to a decline in commercial and industrial energy
            consumption, but this was balanced by an increase in residential
            energy use as more people stayed at home. Unlike the power sector,
            the residential and commercial sectors had limited control over the
            energy mix, and emissions were more closely tied to direct energy
            use for heating, cooling, and appliances. Additionally, the
            inelastic nature of demand for residential energy meant that,
            despite changes in behavior, overall consumption remained relatively
            constant. Consequently, the emission patterns in these sectors were
            not as responsive to short-term disruptions during the pandemic.
          </p>
        </div>
      </div>
    </main>
  );
}
