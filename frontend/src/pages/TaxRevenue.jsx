import { useState } from "react";
import StateDropdown from "@/components/StateDropdown";
import TimeRangeSlider from "@/components/TimeRangeSlider";
import PercentChangeTaxRevenueChart from "@/components/PercentChangeTaxRevenueChart";
import TopTaxCategoriesChart from "@/components/TopTaxCategoriesChart";
import ViewWindowSlider from "@/components/ViewWindowSlider";
import TaxCategorySelector from "@/components/TaxCategorySelector";
import TaxRevenueGeoChart from "@/components/TaxRevenueGeoChart";

const defaults = {
  selectedState: 1,
  includedCategories: ["T20"],
  startYear: 2009,
  endYear: 2022,
  minYear: 2009,
  maxYear: 2022,
  viewWindowMin: null,
  viewWindowMax: null,
};

export default function TaxRevenue() {
  const [selectedState, setSelectedState] = useState(defaults.selectedState);
  const [includedCategories, setIncludedCategories] = useState(
    defaults.includedCategories
  );
  const [startYear, setStartYear] = useState(defaults.startYear);
  const [endYear, setEndYear] = useState(defaults.endYear);
  const [viewWindowMin, setViewWindowMin] = useState(defaults.viewWindowMin);
  const [viewWindowMax, setViewWindowMax] = useState(defaults.viewWindowMax);

  return (
    <main className="flex flex-col gap-y-6">
      <h1 className="font-extrabold tracking-tight text-4xl">Tax Revenue</h1>
      <div className="flex flex-col gap-y-2">
        <p>
          On this page, you can find information regarding the tax revenue in
          the U.S. during the time period 2009 to 2022 for each state. Each tax
          revenue is categorized into a specific Tax Category. With the use of
          the time period slider bar, state selection, and tax category filter,
          one can view two different graphs that relay tax revenue patterns
          given the criteria noted.
        </p>

        <p>
          The line graph represents the percentage of total tax revenue in the
          U.S that category makes up and overlays this information with the
          number of Covid-19 cases in that given year per state. This allows one
          to see any changes that may appear in the total tax revenue per
          category as the increase in Covid-19 cases surges in the U.S.
        </p>

        <p>
          The bar graph below, similarly, highlights the top 5 tax categories
          with the highest amount of tax revenue during the selected time
          period. This makes it easy to visualize what category make up most of
          the revenue during any given time period in terms of total tax revenue
          rather than percentage make-up.
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
          <TaxCategorySelector
            selectedCategories={includedCategories}
            onCheckedChange={(checked, categoryCode) => {
              setIncludedCategories((i) =>
                checked
                  ? i.concat(categoryCode)
                  : i.filter((v) => v !== categoryCode)
              );
            }}
            onReset={() => setIncludedCategories(defaults.includedCategories)}
          />
        </div>
      </div>
      <PercentChangeTaxRevenueChart
        stateCode={selectedState}
        includedCategories={includedCategories}
        startYear={startYear}
        endYear={endYear}
        viewWindowMin={viewWindowMin}
        viewWindowMax={viewWindowMax}
      />
      <TopTaxCategoriesChart
        stateCode={selectedState}
        startYear={startYear}
        endYear={endYear}
      />
      <TaxRevenueGeoChart startYear={startYear} endYear={endYear} />

      <div className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-2xl">Trend Analysis</h3>
        <div className="flex flex-col gap-y-2">
          <p>
            <strong>
              How does the number of confirmed COVID-19 cases in a state affect
              the total tax revenue per tax category of that state over the
              course of 2019-2022? Which tax category saw dramatic changes?
            </strong>
          </p>
          <p>
            Several different trends were observed in the generation of this
            query and the most significant was Tobacco Products Sales this has
            significant variability over the years in the percentage change of
            total revenue from the tobacco products sales tax. The fluctuations
            are quite pronounced, with a notable peaks between 2010 and 2018 in
            almost every state and a sharp drop in 2019 and 2020 in most of the
            states. This drop in 2019 and 2020 could be related to the COVID-19
            pandemic's impact on consumer behavior or the economy as a whole.
            The revenue from alcoholic beverages sales tax, shows significant
            annual variability in most states. There is a notable peaks until
            2017, followed by a decline between 2018 and 2020 in atleast three
            fourth of the states, there is a considerable drop in the percentage
            change of revenue, suggesting a negative impact, potentially due to
            the economic consequences of the COVID-19 pandemic. The percentage
            change of revenue from insurance premiums sales tax during the onset
            of the COVID-19 pandemic, depicted by a sharp upward trajectory in
            the number of confirmed cases starting in 2019. This downward trend
            in revenue could be influenced by a combination of the economic
            slowdown, with individuals and businesses cutting costs, including
            on insurance; a change in risk behaviors leading to potentially
            reduced insurance policy purchases; insurers possibly offering
            premiums adjustments or rebates; government interventions such as
            moratoriums on policy cancellations; and an increase in claims like
            business interruptions. The alignment of the decline in sales tax
            revenue with the rise in COVID-19 cases suggests a correlation where
            the pandemic's broader economic effects impacted the insurance
            sector's financial outcomes.
          </p>
          <p>
            The next major trend that saw a shift during covid 19 is Corporation
            net income taxes this reflects varied impacts of the pandemic across
            different states in the U.S. Likely due to diverse economic
            structures, state-specific policy responses, sector-based corporate
            profitability, changes in tax payment timelines, and the unequal
            distribution of federal aid. States with robust tech or healthcare
            sectors may have seen tax revenue growth, while those reliant on
            more affected industries such as tourism faced declines.
            Additionally, government interventions, both at state and federal
            levels, including tax relief and stimulus measures, would have
            influenced these trends, contributing to the observed increases in
            some states and decreases in others during the pandemic. Motor Fuels
            Sales Tax this trend has seen various fluctuations over the years
            but during Covid it has decreased in some states and increased in
            some other the reasons could be due to Mobility Restrictions, State
            Tax Policies, Differing Pandemic Impact, Reduced Travel, Supply
            Chain Disruptions etc.
          </p>
          <p>
            Lastly we can observer that Property Taxes either decreased or
            remained the same in most of the states because of Economic
            Downturn, Tax Relief Measures, Property Sales Slowdown, Assessment
            Delays, Payment Extensions and Penalties Waiving etc. It observable
            that public utilities licenses tax has decreased or remained
            constant in three fourth of the states becaues of Reduction in
            Business Operations, Delayed Payments, Decreased Consumption etc
            during pandemic. There are several other tax categories that needed
            to be accessed from the above tax categories shown on the plots to
            get conclusons about the trends. During pamdemic we can observe that
            most of the tax categories decreased or remained constant in most of
            the states.
          </p>
        </div>
      </div>
    </main>
  );
}
