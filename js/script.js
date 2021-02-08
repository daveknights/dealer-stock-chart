
const margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 900 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom,
    innerRadius = 80,
    outerRadius = Math.min(width, height)/2.5;

const svg = d3.select("#dealer-data")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + 480 + "," + ( 350 )+ ")");

const data = {
    'Toms Motors': 2,
    'Maltings Motors': 1,
    'Herts and Essex Motor Co Ltd': 90,
    'Northpoint': 9,
    'Precision Motor Group Limited': 138,
    'Gates of Hertford': 31,
    'Used Cars-UK': 44,
    'Bristol Street Motors Peugeot Harlow': 62,
    'Wintry Cars': 23,
    'Gates of Harlow': 181,
    'Gates of Harlow Transit Centre': 32,
    'Exclusive Motor Company Ltd': 27,
    'Herts and Essex Van Sales': 31,
    'Xclusive Xports Ltd': 60,
    'The Car Lot Ltd': 33,
    'Albury Repair Works Ltd': 4,
    'Oakleigh Cars Ltd': 65,
    'G&J Autos Ltd': 12,
    'Good Win Motors': 23,
    'Bristol Street Motors Vauxhall Waltham Cross': 104,
    'Herts Autos Ltd': 25,
    'Glyn Hopkin Nissan (Waltham Abbey)': 110,
    'Cuffley Motor Company': 36,
    'Herts Prestige.com': 46,
    'Holmwood Cars': 12,
};

const arrData = [];
for (let [key, value] of Object.entries(data)) {
    arrData.push([key, value]);
};

const values = arrData.map(v => v[1]);

const colours = ["#da0076", "#e757a5", "#f3abd2", "#add5d9", "#5cacb3", "#07818c"];

const quantile = d3.scaleQuantile()
  .domain(values)
  .range(colours);

const x = d3.scaleBand()
  .range([0, 2 * Math.PI])
  .align(0)
  .domain(arrData.map(d => d[0]));

const y = d3.scaleRadial()
  .range([innerRadius, outerRadius])
  .domain([0, 350]);

window.addEventListener('load', () => {
    // Add bars
    svg.append("g")
    .selectAll("path")
    .data(arrData)
    .enter()
    .append("path")
      .attr("d", d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(d => y(d[1]))
          .startAngle(d => x(d[0]))
          .endAngle(d => x(d[0]) + x.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius))
          .style("fill", d => quantile(d[1]));

    // Add the labels
    svg.append("g")
      .selectAll("g")
      .data(arrData)
      .enter()
      .append("g")
        .attr("text-anchor", d => (x(d[0]) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start")
        .attr("transform", d => "rotate(" + ((x(d[0]) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d[1])+10) + ",0)")
        .append("text")
        .text(d => (d[0]))
        .attr("transform", d => (x(d[0]) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)")
        .style("font-size", "11px")
        .style("font-family", "Arial")
        .attr("alignment-baseline", "middle");

    // Legend
    svg.append("circle").attr("cx",240).attr("cy",280).attr("r", 6).style("fill", "#da0076");
    svg.append("circle").attr("cx",240).attr("cy",300).attr("r", 6).style("fill", "#e757a5");
    svg.append("circle").attr("cx",240).attr("cy",320).attr("r", 6).style("fill", "#f3abd2");
    svg.append("circle").attr("cx",240).attr("cy",340).attr("r", 6).style("fill", "#add5d9");
    svg.append("circle").attr("cx",240).attr("cy",360).attr("r", 6).style("fill", "#5cacb3");
    svg.append("circle").attr("cx",240).attr("cy",380).attr("r", 6).style("fill", "#07818c");
    svg.append("text").attr("x", 260).attr("y", 280).text("0 - 30 Cars").style("font-size", "15px").attr("alignment-baseline","middle");
    svg.append("text").attr("x", 260).attr("y", 300).text("31 - 60 Cars").style("font-size", "15px").attr("alignment-baseline","middle");
    svg.append("text").attr("x", 260).attr("y", 320).text("61 -90 Cars").style("font-size", "15px").attr("alignment-baseline","middle");
    svg.append("text").attr("x", 260).attr("y", 340).text("91 - 120 Cars").style("font-size", "15px").attr("alignment-baseline","middle");
    svg.append("text").attr("x", 260).attr("y", 360).text("121 - 150 Cars").style("font-size", "15px").attr("alignment-baseline","middle");
    svg.append("text").attr("x", 260).attr("y", 380).text("151 - 180 Cars").style("font-size", "15px").attr("alignment-baseline","middle");
});
