import { useState } from "react";
import StateDropdown from "@/components/StateDropdown";
import TimeRangeSlider from "@/components/TimeRangeSlider";
import PayrollPerEmployeeChart from "@/components/PayrollPerEmployeeChart";
import TopPayrollIndustriesChart from "@/components/TopPayrollIndustriesChart";
import ViewWindowSlider from "@/components/ViewWindowSlider";
import BusinessIndustrySelector from "@/components/BusinessIndustrySelector";
import PayrollGeoChart from "@/components/PayrollGeoChart";

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

export default function Payroll() {
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
        Employment Payroll
      </h1>
      <div className="flex flex-col gap-y-2">
        <p>
          On this page, you can find information regarding the total annual
          payroll per business sector for the different states of the US during
          COVID-19 and the top business sectors with the highest average annual
          payroll during that time. Each business establishment is categorized
          into a specific industry sector in which there are 20 different types.
          With the use of the time period slider bar, state selection, and
          business sector filter, one can view two different graphs that relay
          business establishment patterns given the criteria noted.
        </p>
        <p>
          The line graph represents the average payroll per employee in the U.S
          per business sector and overlays this information with the number of
          Covid-19 cases in that given year per state. This allows one to see
          any changes that may appear in the average salary per sector as the
          increase in Covid-19 cases surges in the U.S.
        </p>
        <p>
          The bar graph below, similarly, highlights all the business sector’s
          average payroll per employee during the selected time period. This
          makes it easy to visualize what sectors make up most of salary
          contributions during any given time period.
        </p>
        These graphs provide insight into how Covid-19 has played a role in the
        evolving U.S economy and personal income and allows users to explore
        changes that occurred over time in each state. Some of the most
        significant findings are highlighted below.
        <p></p>
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
      <PayrollPerEmployeeChart
        stateCode={selectedState}
        includedIndustries={includedIndustries}
        startYear={startYear}
        endYear={endYear}
        viewWindowMin={viewWindowMin}
        viewWindowMax={viewWindowMax}
      />
      <TopPayrollIndustriesChart
        stateCode={selectedState}
        startYear={startYear}
        endYear={endYear}
      />
      <PayrollGeoChart startYear={startYear} endYear={endYear} />

      <div className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-2xl">Trend Analysis</h3>
        <div className="flex flex-col gap-y-2">
          <p>
            <strong>
              How did the employment payroll of different business categories
              per state change over the course of COVID-19? What can this tell
              us about which industries were particularly important during
              COVID-19 and which became obsolete?
            </strong>
          </p>
          <p>
            The first notable trend observed in this query is during the
            COVID-19 pandemic, the Information business sector witnessed a
            notable increase in average payroll per employee. This could be for
            several interconnected reasons. First, the sector's pivotal role in
            facilitating the rapid shift to remote work and digital
            transformation led to heightened demand for digital services, cloud
            technologies, and collaboration tools. The necessity for specialized
            skills in areas like software development and cybersecurity, coupled
            with a scarcity of qualified professionals, prompted companies to
            offer higher salaries to attract and retain talent. Certain segments
            within the Information sector, including e-commerce and online
            communication platforms, experienced growth or maintained
            resilience, allowing companies to sustain or expand operations and
            justify increased payroll expenses. The recognition of the strategic
            importance of information technology during the pandemic further
            motivated businesses to invest in their IT workforce, contributing
            to the overall uptick in average payroll per employee.
          </p>
          <p>
            The next interesting trend that was observed was a general increase
            throughout most states within their Arts, Entertainment, and
            Recreation sector. It's not typical for this sector to experience an
            increase in average payroll per employee, in fact, this sector was
            one of the hardest-hit due to lockdowns, restrictions on gatherings,
            and the overall decline in consumer spending on entertainment and
            leisure activities. Businesses such as theaters, concert venues, and
            event organizers faced closures and cancellations, leading to
            revenue losses and financial strain. If there were instances of
            increased average payroll per employee in this sector during the
            pandemic, they would likely be specific to certain companies or
            situations. Possible reasons could include unique business models,
            adaptations to the circumstances such as enhanced digital offerings,
            or specific measures taken by individual companies to support their
            employees during challenging times.
          </p>
          <p>
            The Professional, Scientific, and Technical Services sector was
            another observable trend in which they experienced an increase in
            average payroll per employee during the COVID-19 pandemic due to
            heightened demand for specialized services. With businesses rapidly
            adopting remote work, there was a surge in the need for technology
            consulting services, leading to increased demand for professionals
            in information technology and related fields. Legal and compliance
            challenges introduced by the pandemic prompted a greater demand for
            legal services, while the scientific research and healthcare
            consulting segments of the sector experienced heightened activity as
            organizations sought expertise in epidemiology, public health, and
            medical research. Additionally, the sector's adaptability and
            ability to provide essential expertise during a time of crisis,
            coupled with government stimulus packages supporting businesses,
            contributed to its resilience and the associated increase in
            compensation for its workforce.
          </p>
        </div>
      </div>
    </main>
  );
}
