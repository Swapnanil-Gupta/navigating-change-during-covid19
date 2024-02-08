import { useState } from "react";
import StateDropdown from "@/components/StateDropdown";
import TimeRangeSlider from "@/components/TimeRangeSlider";
import NewEstablishmentsChart from "@/components/NewEstablishmentsChart";
// import TopPayrollIndustriesChart from "@/components/TopPayrollIndustriesChart";
import ViewWindowSlider from "@/components/ViewWindowSlider";
import BusinessSizeSelector from "@/components/BusinessSizeSelector";
import BusinessIndustryDropdown from "@/components/BusinessIndustryDropdown";
// import PayrollGeoChart from "@/components/PayrollGeoChart";

const defaults = {
  selectedState: 1,
  selectedIndustry: 11,
  includedSizes: ["<5"],
  startYear: 2010,
  endYear: 2021,
  minYear: 2010,
  maxYear: 2021,
  viewWindowMin: null,
  viewWindowMax: null,
};

export default function Entrepreneurship() {
  const [selectedState, setSelectedState] = useState(defaults.selectedState);
  const [selectedIndustry, setSelectedIndustry] = useState(
    defaults.selectedIndustry
  );
  const [includedSizes, setIncludedSizes] = useState(defaults.includedSizes);
  const [startYear, setStartYear] = useState(defaults.startYear);
  const [endYear, setEndYear] = useState(defaults.endYear);
  const [viewWindowMin, setViewWindowMin] = useState(defaults.viewWindowMin);
  const [viewWindowMax, setViewWindowMax] = useState(defaults.viewWindowMax);

  return (
    <main className="flex flex-col gap-y-6">
      <h1 className="font-extrabold tracking-tight text-4xl">
        Entrepreneurship
      </h1>
      <div className="flex flex-col gap-y-2">
        <p>
          On this page, you can find information regarding the growth/decline in
          the number of business establishments for different business sizes
          (business size is estimated based on the number of employees in a
          business) for the different states of the US during COVID-19 and
          prior. Each state has different business sizes ranging from only a few
          employees to thousands of employees. With the use of the time period
          slider bar, state selection, business industry filter, and business
          size filter, one can view different graphs that relay the
          growth/decline in the number of business establishments given the
          criteria noted.
        </p>
        <p>
          The line graph represents the change in the number of business
          establishments in the U.S of a chosen business size and overlays this
          information with the number of Covid-19 cases in that given year per
          state. This allows one to see any changes that may appear in the
          number of business establishments for each business size as the
          increase in Covid-19 cases surges in the U.S.
        </p>
        <p>
          These graphs provide insights into the effect of Covid-19 on the U.S.
          economy and allows users to explore changes that occurred over time in
          each state. Some of the most significant findings are highlighted
          below.
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
            <BusinessIndustryDropdown
              value={selectedIndustry}
              onValueChange={(val) => setSelectedIndustry(val)}
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
          <BusinessSizeSelector
            selectedSizes={includedSizes}
            onCheckedChange={(checked, sizeCode) => {
              setIncludedSizes((i) =>
                checked ? i.concat(sizeCode) : i.filter((v) => v !== sizeCode)
              );
            }}
            onReset={() => setIncludedSizes(defaults.includedSizes)}
          />
        </div>
      </div>
      <NewEstablishmentsChart
        stateCode={selectedState}
        industryCode={selectedIndustry}
        includedSizes={includedSizes}
        startYear={startYear}
        endYear={endYear}
        viewWindowMin={viewWindowMin}
        viewWindowMax={viewWindowMax}
      />
      {/* <TopPayrollIndustriesChart
        stateCode={selectedState}
        startYear={startYear}
        endYear={endYear}
      /> */}
      {/* <PayrollGeoChart startYear={startYear} endYear={endYear} /> */}

      <div className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-2xl">Trend Analysis</h3>
        <div className="flex flex-col gap-y-2">
          <p>
            Several different trends were observed in the production of this
            query and the most significant was the sharp decline in the growth
            rate of startups (businesses with less than 100 employees) in the
            Health Care and Social Assistance industry. This trend was observed
            in several states after an initial surge in the growth rate during
            the onset of the pandemic. In the beginning of the pandemic,
            lockdowns were in place almost everywhere. People resorted to
            virtual health care to avoid crowded hospitals. This became the
            primary reason for an initial surge. However, the surge in growth
            rate did not last long. On the contrary, there was a sharp decline
            in the growth rate. This decline in growth rate might be attributed
            to the overall economic slowdown as the pandemic unfolded. In
            addition, digital health funding from venture capitalists dropped
            significantly since 2021 (1).
          </p>
          <p>
            Although there was a surge in the number of business establishments
            in the Real Estate, Rental, and Leasing industry (These business
            establishments relate to the housing market both for rental and
            ownership properties) since the onset of Covid-19 pandemic, there
            was a major decline in the growth rate of the number of startups in
            this category after an initial surge. This observed trend might be
            attributed to the overall economic slowdown. Usually, the profit
            margins in this industry are very less which means the startups in
            this category have a hard time finding their footing in the market.
            It got worse as the pandemic unfolded because of the economic
            instability.
          </p>
          <p>
            Almost in every state, there was a study increase in the growth rate
            of large-scale tech companies (with employees more than 1000) since
            the onset of the pandemic. However, the same cannot be said for the
            tech startups (with employees less than 100). In most of the states,
            there has been an initial surge, followed by a rapid decline, which
            was then followed by a similar cycle. The rapid digitalization that
            took place during the pandemic is the primary reason for the surge.
            While the large companies were able to sustain the rapid growth
            rate, the tech startups which are largely dependent on the funding
            from Venture Capitalists were affected because of the economic
            slowdown. Overall, the tech startups have seen highs and lows during
            the pandemic. The war in Ukraine might be another major reason for
            the observed trends.
          </p>
          <p>
            Another major trend that is observable from the data provided above
            is the rapid increase in the growth rate of the startups in the
            Transportation and Warehousing industry. This trend closely follows
            the trend observed in the number of business establishments in this
            industry. Transportation and Warehousing industry follow an indirect
            relationship to the retail trade market in that E-commerce has
            significantly increased the need for transportation and warehousing
            support. As a drop in in-person shopping occurred due to the onset
            of Covid-19 in each state, the increase in warehouse businesses as
            well as freight companies shows the shift in consumer demand to
            online purchases. As the demand to online purchases surged since the
            onset of the pandemic, there is a rapid increase in the number of
            startups in the transportation and warehousing industry. Platforms
            like Amazon are a good example of how the rise in E-commerce
            businesses will skyrocket the need for more warehouses and
            transportation solutions throughout the country.
          </p>
          <p>
            In most of the states, there was a rapid decline in the growth rate
            of the startups in the manufacturing sector. This observed trend
            might be attributed to lockdowns and the resulting economic
            slowdown. According to the U.S. Bureau of Labor Statistics (2),
            after the Covid-19 pandemic began, manufacturing output fell at
            43-percent annual rate, the largest decline since World War II.
            Motor vehicle production virtually ceased and major manufacturing
            industries hit hard include primary metals, fabricated metal
            products, machinery, food and beverage and tobacco products, and
            chemicals. In such a scenario, the rapid decline in the growth rate
            of manufacturing startups is natural.
          </p>
          <ol className="list-decimal ml-4">
            <li>
              <a
                className="underline"
                href="https://www.politico.com/newsletters/future-pulse/2022/11/21/its-survival-of-the-fittest-for-health-tech-00069669 "
              >
                https://www.politico.com/newsletters/future-pulse/2022/11/21/its-survival-of-the-fittest-for-health-tech-00069669
              </a>
            </li>
            <li>
              <a
                className="underline"
                href="https://www.bls.gov/opub/ted/2022/u-s-manufacturing-output-hours-worked-and-productivity-recover-from-covid-19.htm - :~:text=After the COVID-19 pandemic,declines since World War II"
              >
                https://www.bls.gov/opub/ted/2022/u-s-manufacturing-output-hours-worked-and-productivity-recover-from-covid-19.htm
                - :~:text=After the COVID-19 pandemic,declines since World War
                II
              </a>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
