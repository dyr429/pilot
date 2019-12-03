import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import * as d3 from 'd3';
import { hierarchy, treemap } from 'd3-hierarchy';

class TreeMap extends Component {
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
        function sumBySize(d) {
            return d.size; 
          }
        let jsonData = {"children": []};
        data.forEach((element, index) => {
            let name="";
            if(index==selectedIndices[0]) name="A";
            if(index==selectedIndices[1]) name="B";
            jsonData.children.push({"name" : name, "size" : element})
        });

        select(this.node).selectAll("*").remove();
        const svg = select(this.node)
                        .attr("width", width)
                        .attr("height", height);


        var treemap=d3.treemap()
                    .size([width, height])

        var root=d3.hierarchy(jsonData)
                .sum(sumBySize)
                .sort((a,b)=>{return b.height-a.height || b.size-a.size;});
        treemap(root);

        var cell = svg.selectAll("g")
                        .data(root.leaves())
                        .enter()
                        .append("g")
                            .attr("transform", d=>`translate(${d.x0},${d.y0})`);

        cell.append("rect")
            .attr("width", d=>d.x1-d.x0)
            .attr("height", d=>d.y1-d.y0)
            .attr("fill","none")
            .attr("stroke","black");

        cell.selectAll("circle").exit().remove();
        cell.append("circle")
                .attr("cx",+5)
                .attr("cy",+5)
                .attr("r",(d,i)=>{
                        if(i==selectedIndices[0] || i==selectedIndices[1]) {
                            return 3;
                        }
                        else return 0;
                });



        
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
export default TreeMap;