import React, { Component } from 'react'
import { scaleSqrt } from 'd3-scale';
import * as d3 from 'd3';
import { select } from 'd3-selection'
import BubbleElementsFactory from "./factories/BubbleElementsFactory";
class BubbleChart extends Component {
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
        const {
            width,
            height,
            data,
            selectedIndices,
            color
        } = this.props;

        //////////////////Preparation/////////////////////////////////////
        const dataDomain = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
        //transfer data into json object {"value": value}
        const jsonData = { children: data.map(d => ({ value: d })) }
        const svg = select(this.node);
        const bubble = d3.pack(jsonData)
            .size([width - 10, height - 10])
            .padding(1.5);
        const bubbleNodes = d3.hierarchy(jsonData)
            .sum(d => d.value);

        const bubbleData = bubble(bubbleNodes).descendants();
        ///////////////////////////////add Bubbles////////////////
       BubbleElementsFactory.addBubblestoChart(svg,bubbleData,color)
        ////////////////////////////// marks//////////////////////////////////
        BubbleElementsFactory.addDotMarkstoChart(svg,bubbleData,selectedIndices)
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
export default BubbleChart;