import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis';
import { arc, pie } from 'd3-shape';
import PieElementsFactory from "./factories/PieElementsFactory";

class PieChart extends Component {
    constructor(props) {
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

        ////////////////////////////////Prepare//////////////////////////
        const pieRadius = Math.min(width, height) / 2 - 20;

        const labelArc = arc()
            .outerRadius(pieRadius + 10)
            .innerRadius(pieRadius + 10);
        const svg = select(this.node);
        const pieTransform = `translate(${width / 2},${height / 2})`
        const pieLayout = pie()
            .sort(null)
            .value(d => d);

        const pieData = pieLayout(data);
        //for marks
        const g = svg.selectAll('.arc')
            .data(pieLayout(data))

        const markRadius = (d, i) => {
            if (i === selectedIndices[0] || i === selectedIndices[1]) {
                return 3;
            } else {
                return 0;
            }
        }
        const markTransform = function (d) { return "translate(" + labelArc.centroid(d) + ")"; };
        let r = (d, i) => {
            if(i === selectedIndices[0]|| i === selectedIndices[1]) {
                return 3;
            } else {
                return 0;
            }
        }
        ///////////////////////////Add Pie////////////////////////////////////
        PieElementsFactory.addPiesToChart(svg,pieData,pieRadius,'arc',pieTransform,color)
        //Add marks to chart
        PieElementsFactory.addDotMarkstoChart(g,pieData, 'mark', selectedIndices,".85em", markRadius,markTransform);


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
export default PieChart;