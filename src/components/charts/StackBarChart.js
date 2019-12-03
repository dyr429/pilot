
import React, { Component } from 'react'
import { scaleLinear, scaleOrdinal} from 'd3-scale'
import { select } from 'd3-selection'
import { stack, stackOffsetDiverging} from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis';
import {schemeCategory10} from 'd3-scale-chromatic'
import StackBarElementsFactory from "./factories/StackBarElementFactory";
import BarElementsFactory from "./factories/BarElementsFactory";

// An Implementation of stack bar chart
// same as other charts but with two more extra attributes
// type: normal: normal rectangle stack bar
//       chicklet: filled round corner stack with gap
//       chicklet-outline: chicklet with outline style
// color: use "colorful" for random color or use color you want.
// example:
//     <StackBarChart
//         className={classes.visChart}
//         data={data}
//         selectedIndices={selectedIndices}
//         width={chartWidth}
//         height={chartHeight}
//         type = "chicklet-outline"
//         color = "colorful"
//     ></StackBarChart>;
class StackBarChart extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate() {
        this.createChart()
    }
    createChart = () => {
        console.log("create Stack Bar")

        const {
            width,
            height,
            data,
            selectedIndices,
            style,
            color,
        } = this.props;
        const margin = {
            left: 40,
            top: 20,
            right: 20,
            bottom: 20,
        };


        ///////////////////CONSTS//////////////////////////
        //data preparation for one columns stack bar with normalization
        const sumOfData = data.reduce((curSum,val) => {return Number(curSum) +Number(val)})
        const dividen = sumOfData/100
        let obj1 = {col: "A"};
        for(let i=0;i<data.length;i++){
            obj1[String.fromCharCode(i+65)] = data[i]/dividen;
        }
        const dataset = [obj1]
        const series = stack()
            .keys(["A", "B", "C","D","E"])
            (dataset);
        //data preparation for two columns stack bar
        // const obj1  = {col: "A",A: +data[0], B: +data[1],C: +data[2]}
        // const obj2  = {col:"B",A: +data[3], B: +data[4]}
        // const dataset = [obj1,obj2]
        // const series = stack()
        //     .keys(["A", "B", "C"])
        //     (dataset);

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const xAxisrange = [0,innerWidth]
        const yAxisrange = [innerHeight,0]
        const xAxisDomain = [];
        const yAxisDomian = [0,100];
        const xAxisTick = [];
        const yAxisTick = [0,100]
        let barWidth = Math.min(width, height) / 2 - 20;
        const gap = 5
        const barHorizontalOffset = 90;
        const svg = select(this.node);
        ///scales
        const xScale = BarElementsFactory.makeScale(xAxisrange,xAxisDomain)
        const yScale = BarElementsFactory.makeScale(yAxisrange,yAxisDomian)

        //for two column stack bar chart
        //let barWidth = innerWidth / dataset.length;
        // width use pie chart radius
        ///axis
        const xAxis = BarElementsFactory.makeAxis("bottom",xScale,xAxisTick)
        const yAxis = BarElementsFactory.makeAxis("left",yScale,yAxisTick)
        const xAxisTransform = `translate(${margin.left},${height - margin.bottom})`
        const yAxisTransform = `translate(${margin.left},${margin.top})`

        ////bars
        const barX = (d, i) => {return margin.left + barHorizontalOffset + i * barWidth}
        const barY = d => {return margin.top+yScale(d[1])}
        const barH = d =>  {return yScale(d[0]) - yScale(d[1])}
        const barW = barWidth

        ///marks
        const markX = (d, i) => {return (margin.left -11 + i * barWidth+0.5*barWidth + barHorizontalOffset)}
        const markY = d => {return margin.top+yScale(d[1])+ 0.5*(yScale(d[0]) - yScale(d[1]))+4}
        const markRadius = 3;

        //clean previous
        svg.selectAll("g").remove()

        /////////////////////FUNCTIONS///////////////////////

        //////////// StackBars/////////////////////////////
        //remove previous bars
        svg.selectAll("g.bargroup")
            .data(series)
            .exit().remove()
        switch(style) {
            case "normal":
                StackBarElementsFactory.addStackBarstoChart(svg, series, color, barX, barY, barH, barW)
                break;
            case "chicklet":
                StackBarElementsFactory.addChickletStackBarstoChart(svg, series, color, barX, barY, barH, barW,gap)
            case "chicklet-outline":
                StackBarElementsFactory.addChickletoutlineStackBarstoCHart(svg,series,color,barX, barY, barH, barW,gap)
        }

        ///////////////////////dot marks///////////////////////
        //data display sequence from left bottom to up right
        //data iteration sequence is by category
        StackBarElementsFactory.addDotMarksToChart(svg,series,'mark',selectedIndices,markX,markY,markRadius)

        ////////////////////////// Axes////////////////////
        BarElementsFactory.addAxistoChart(svg,'.x.axis',xAxis,'x axis', xAxisTransform)
        BarElementsFactory.addAxistoChart(svg,'.y.axis',yAxis,'y axis', yAxisTransform)

    }
    //////////////////////////////////////////////////////////////////////////////
    render() {
        const { width, height, className } = this.props;
        return <svg ref={node => this.node = node}
                    className={className}
                    width={width}
                    height={height}>
        </svg>
    }
}
export default StackBarChart;