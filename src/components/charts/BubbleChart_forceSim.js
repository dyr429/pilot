/*
Sample Usage:
   <BarChart 
    data={[5,4,1,3]} 
    selectedIndices={[4, 0]}
    width={500}
    height={500}
   ></BarChart>
*/

import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis';

class BarChart extends Component {
    constructor(props) {
        super(props)
        this.createChart = this.createChart.bind(this);
    }
    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate() {
        this.createChart()
    }
    createChart() {
        const {
            width,
            height,
            data,
            selectedIndices,
        } = this.props;
        const margin = {
            left: 40,
            top: 20,
            right: 20,
            bottom: 20,
        };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const xScale = scaleLinear()
            .range([0, innerWidth]);
        const yScale = scaleLinear()
            .domain([0, 100])
            .range([innerHeight,0]);
        const barWidth = innerWidth / data.length;
        const svg = select(this.node);
        const xAxis = axisBottom()
            .scale(xScale)
            .tickValues([]);
        const yAxis = axisLeft()
            .scale(yScale)
            .tickValues([0, 100]);

        // Bars
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')

        svg.selectAll('rect')
            .data(data)
            .exit()
            .remove()

        svg.selectAll('rect')
            .data(data)
            .style('fill', 'white')
            .attr('stroke', 'black')
            .attr('x', (d, i) => margin.left + 10 + i * barWidth)
            .attr('y', d =>  margin.top + yScale(d))
            .attr('height', d => innerHeight - yScale(d))
            .attr('width', barWidth - 10);

        // Axes
        svg.selectAll('.x.axis')
            .data([0]).enter()
            .append('g')
            .attr('class', 'x axis');
        svg.selectAll('.x.axis')
            .data([0]).exit()
            .remove();
        svg.selectAll('.x.axis')
            .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
            .call(xAxis);
        svg.selectAll('.y.axis')
            .data([0]).enter()
            .append('g')
            .attr('class', 'y axis');
        svg.selectAll('.y.axis')
            .data([0]).exit()
            .remove();
        svg.selectAll('.y.axis')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .call(yAxis);

        // Marks
        // Option 1: text A, B
        // svg.selectAll('.mark')
        //     .data(selectedIndices).enter()
        //     .append('text').attr('class', 'mark');
        // svg.selectAll('.mark')
        //     .data(selectedIndices).exit()
        //     .remove();
        // svg.selectAll('.mark')
        //     .data(selectedIndices)
        //     .attr('class', 'mark')
        //     .attr('x', d => margin.left + d * barWidth + barWidth / 2)
        //     .attr('y', height - margin.bottom)
        //     .text((d, i) => i === 0 ? 'A' : 'B');

        // Option 2: dots.
        svg.selectAll('.mark')
            .data(selectedIndices).enter()
            .append('circle').attr('class', 'mark');
        svg.selectAll('.mark')
            .data(selectedIndices).exit()
            .remove();
        svg.selectAll('.mark')
            .data(selectedIndices)
            .attr('class', 'mark')
            .attr('cx', d => margin.left + d * barWidth + barWidth / 2)
            .attr('cy', height - margin.bottom + 10)
            .attr('r', 3)

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
