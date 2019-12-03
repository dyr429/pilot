/*
Sample Usage:
   <BarChart 
    data={[5,4,1,3]} 
    selectedIndices={[4, 0]}
    width={500}
    height={500}
    style = "chicklet"
    color = "red"
   ></BarChart>
*/

import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis';
import BarElementsFactory from "./factories/BarElementsFactory";

class BarChart extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate() {
        this.createChart()
    }
    createChart = ()=> {
        const {
            width,
            height,
            data,
            selectedIndices,
            color,
            style,
        } = this.props;
        const margin = {
            left: 40,
            top: 20,
            right: 20,
            bottom: 20,
        };
        //////////////////////////////Prepare/////////////////////////////////////////////////////
        // basic Consts
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const barWidth = innerWidth / data.length;
        const svg = select(this.node);
        const xAxisrange = [0,innerWidth]
        const yAxisrange = [innerHeight,0]
        const xAxisDomain = [];
        const yAxisDomian = [0,100];
        const xAxisTick = [];
        const yAxisTick = [0,100]
        //scales
        const xScale = BarElementsFactory.makeScale(xAxisrange,xAxisDomain)
        const yScale = BarElementsFactory.makeScale(yAxisrange,yAxisDomian)
        //axis
        const xAxis = BarElementsFactory.makeAxis("bottom",xScale,xAxisTick)
        const yAxis = BarElementsFactory.makeAxis("left",yScale,yAxisTick)
        const xAxisTransform = `translate(${margin.left},${height - margin.bottom})`
        const yAxisTransform = `translate(${margin.left},${margin.top})`
        // bars
        const barX = (d, i) => {return margin.left + 10 + i * barWidth};
        const barY = d => {return margin.top + yScale(d)}
        const barH = d => {return innerHeight - yScale(d)}
        const barW = barWidth- 10
        const outlineWidth = 4
        // marks
        const markX = (d)=>{return margin.left + d * barWidth + barWidth / 2}
        const markY = ()=>{return height - margin.bottom + 10}
        const markRadius = 3;
        ////////////////////////////////add to chart/////////////////////////////////////////
        // add Bars to chart
        switch(style) {
            case "normal":
                BarElementsFactory.addBarstoChart(svg,data,color,barX,barY,barH,barW)
                break;
            case "chicklet":
                BarElementsFactory.addChickletBarstoChart(svg,data,color,barX,barY,barH,barW)
                break;
            case "chicklet-outline":
                BarElementsFactory.addChickletOutlineBarstoChart(svg,data,color,barX,barY,barH,barW,outlineWidth)
                break;
            default:
                BarElementsFactory.addBarstoChart(svg,data,color,barX,barY,barH,barW)
        }

        // add Axis to chart
        BarElementsFactory.addAxistoChart(svg,'.x.axis',xAxis,'x axis', xAxisTransform)
        BarElementsFactory.addAxistoChart(svg,'.y.axis',yAxis,'y axis', yAxisTransform)
        //add Marks to chart
        BarElementsFactory.addDotMarkstoChart(svg,'mark',selectedIndices,markX,markY,markRadius)
        //ElementsFactory.addLetterMarkstoChart(svg,'mark',selectedIndices,markX,markY)


    }
    render() {
        const { width, height, className } = this.props;
        return <svg ref={node => this.node = node}
            className={className}
            width={width}
            height={height}>
        </svg>
    }
}
export default BarChart;