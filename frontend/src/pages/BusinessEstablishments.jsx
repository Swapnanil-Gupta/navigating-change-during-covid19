import { useState } from "react";
import StateDropdown from "@/components/StateDropdown";
import TimeRangeSlider from "@/components/TimeRangeSlider";
import PercentBusinessEstablishmentsChart from "@/components/PercentBusinessEstablishmentsChart";
import TopBusinessIndustriesChart from "@/components/TopBusinessIndustriesChart";
import ViewWindowSlider from "@/components/ViewWindowSlider";
import BusinessIndustrySelector from "@/components/BusinessIndustrySelector";
import BusinessEstablishmentsGeoChart from "@/components/BusinessEstablishmentsGeoChart";

const defaults = {
  selectedState: 1,
  includedIndustries: [72],
  startYear: 2010,
  endYear: 2021,
  minYear: 2010,
  maxYear: 2021,
  viewWindowMin: null,
  viewWindowMax: null,
};

export default function BusinessEstablishments() {
  const [selectedState, setSelectedState] = useState(defaults.selectedState);
  const [includedIndustries, setIncludedIndustries] = useState(
    defaults.includedIndustries
  );
  const [startYear, setStartYear] = useState(defaults.startYear);
  const [endYear, setEndYear] = useState(defaults.endYear);
  const [viewWindowMin, setViewWindowMin] = useState(defaults.viewWindowMin);
  const [viewWindowMax, setViewWindowMax] = useState(defaults.viewWindowMax);

  return (
    <main className="flex flex-col gap-y-6">
      <h1 className="font-extrabold tracking-tight text-4xl">
        Business Establishments
      </h1>
      <div className="flex flex-col gap-y-2">
        <p>
          On this page, you can find information regarding the number of
          business establishments in the U.S. during the time period 2010 to
          2021 for each state. Each business establishment is categorized into a
          specific industry sector in which there are 20 different types. With
          the use of the time period slider bar, state selection, and business
          sector filter, one can view two different graphs that relay business
          establishment patterns given the criteria noted.
        </p>
        <p>
          The line graph represents the percentage of total business
          establishments in the U.S that that sector makes up and overlays this
          information with the number of Covid-19 cases in that given year per
          state. This allows one to see any changes that may appear in the
          number of business establishments per sector as the increase in
          Covid-19 cases surges in the U.S.
        </p>
        <p>
          The bar graph below, similarly, highlights the top 5 business sectors
          with the highest number of business establishments during the selected
          time period. This makes it easy to visualize what sectors make up most
          of the economy during any given time period in terms of number of
          establishments rather than percentage make-up.
        </p>
        <p>
          These graphs provide insight into how Covid-19 has played a role in
          the evolving U.S economy and allows users to explore changes that
          occurred over time in each state. Some of the most significant
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
          <BusinessIndustrySelector
            selectedIndustries={includedIndustries}
            onCheckedChange={(checked, industryCode) => {
              setIncludedIndustries((i) =>
                checked
                  ? i.concat(industryCode)
                  : i.filter((v) => v !== industryCode)
              );
            }}
            onReset={() => setIncludedIndustries(defaults.includedIndustries)}
          />
        </div>
      </div>
      <PercentBusinessEstablishmentsChart
        stateCode={selectedState}
        includedIndustries={includedIndustries}
        startYear={startYear}
        endYear={endYear}
        viewWindowMin={viewWindowMin}
        viewWindowMax={viewWindowMax}
      />
      <TopBusinessIndustriesChart
        stateCode={selectedState}
        startYear={startYear}
        endYear={endYear}
      />
      <BusinessEstablishmentsGeoChart startYear={startYear} endYear={endYear} />

      <div className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-2xl">Trend Analysis</h3>
        <div className="flex flex-col gap-y-2">
          <p>
            <strong>
              How does the number of confirmed COVID-19 cases in a state affect
              the number of establishments per business sector of that state
              over the course of 2019-2022? Which business sectors saw dramatic
              changes in open or closed businesses?
            </strong>
          </p>
          <p>
            Several different trends were observed in the production of this
            query and the most significant was the decrease in Retail Trade.
            Retail Trade has seen a steady decline in business establishments
            since the rise of the Internet and E-commerce retail platforms, but
            Covid-19 further accelerated this decrease. As more people began to
            work from home, the clothing industry which holds 38.6% of the total
            retail sector employment loss, saw a significant decrease in
            customer activity (1). Generally, as lockdowns and shifts in
            consumer behavior accelerated by Covid-19, the Retail Sector in
            every state continued its forward decline in business establishment
            and unemployment rates.
          </p>
          <p>
            The next major trend that saw a shift due to the onset of Covid-19
            cases in each state was the Real Estate, Rental, and Leasing
            industry. This sector had been relatively constant until the surge
            in Covid cases in the US began. These business establishments relate
            to the housing market both for rental and ownership properties. As
            Covid-19 started to encourage many people to move out of densely
            populated areas in search of safer places to work remotely, the rise
            in demand for home sales skyrocketed (2). Almost every state in the
            US saw an increase in this market which appears clearly in the line
            graphs per state in this particular business sector.
          </p>
          <p>
            In addition to Housing and Retail, another more obscure industry
            sector that saw a change during the pandemic was Construction
            market. In theory, this industry should have slowed due to its
            in-person nature of work and inability to introduce remote work
            capabilities as well as supply chain shortages. On the contrary, the
            Construction industry saw a sharp increase in business
            establishments in 2019 and 2020. One reason for this could be the
            contractors ability to divide up work in outdoor spaces to smaller
            teams of people, thus limiting the spread of contact. Additionally,
            many homeowners, while working from home during the pandemic, turned
            to home renovations as a source of distraction which could explain
            the increase in construction related business establishments.
          </p>
          <p>
            The last major trend that is observable from the data provided above
            is the major increase in the Transportation and Warehousing
            industry. This industry follows an indirect relationship to the
            retail trade market in that E-commerce has significantly increased
            the need for transportation and warehousing support. As a drop in
            in-person shopping occurred due to the onset of Covid-19 in each
            state, the increase in warehouse businesses as well as freight
            companies shows the shift in consumer demand to online purchases.
            Platforms like Amazon are a good example of how the rise in
            E-commerce businesses will skyrocket the need for more warehouses
            and transportation solutions throughout the country.
          </p>
          <p>
            It was generally surprising to not see a change in Health Care and
            Social Assistance business patterns or Accommodation and Food
            Services given the nature of their work and the pandemic unfolding
            around the globe. However, this could be explained that these are
            not profitable businesses and are typically funded by the government
            which will be the main determinant of growth in those industries.
            That would have been a trend one would expect to see major changes
            in.
          </p>
          <ol className="list-decimal ml-4">
            <li>
              <a
                className="underline"
                href="https://www.bls.gov/opub/btn/volume-11/retail-trade-employment-before-during-and-after-the-pandemic.htm#:~:text=The%20clothing%20stores%20industry%20accounted,began%20to%20work%20from%20home"
              >
                https://www.bls.gov/opub/btn/volume-11/retail-trade-employment-before-during-and-after-the-pandemic.htm#:~:text=The%20clothing%20stores%20industry%20accounted,began%20to%20work%20from%20home
              </a>
            </li>
            <li>
              <a
                className="underline"
                href="https://www.forbes.com/sites/forbesbusinesscouncil/2022/05/18/how-has-the-pandemic-influenced-the-real-estate-industry/?sh=543a82a74243"
              >
                https://www.forbes.com/sites/forbesbusinesscouncil/2022/05/18/how-has-the-pandemic-influenced-the-real-estate-industry/?sh=543a82a74243
              </a>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
