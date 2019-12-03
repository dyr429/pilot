import React, { Component } from 'react'
import { select,selectAll } from 'd3-selection'
import MotionElementsFactory from "./factories/MotionElementFactory";
import * as d3 from "d3";

class RotationWindMill extends Component {


    constructor(props) {
        super()
    }
    componentDidMount() {

        this.createChart()
    }
    componentDidUpdate(prevProps) {
        if(this.props.data !== prevProps.data){
            this.createChart()
        }
    }

    createChart = () => {
        const {
            width,
            height,
            data,
            selectedIndices,
            color
        } = this.props;

        /////////////////////////////Settings///////////////////////////////

        const rectWidth = 10
        const rectHeight = 100
        const initialX = 200
        let initialY = i => 70+i*190

        ////////////////////////////////Prepare//////////////////////////
        const svg = select(this.node);
        selectAll("svg > *").remove();
        svg.append("line")
            .style("stroke","black")
            .attr("x1",0)
            .attr("y1",200)
            .attr("x2",400)
            .attr("y2",200)
        //////////////////////////////Draw/////////////////////////////////
        data.forEach((d,index) =>{
            if(selectedIndices.includes(index)) {
                const p0X = initialX
                const p0Y = initialY(selectedIndices.indexOf(index))
                const p1X = initialX-10
                const p1Y = p0Y + 80
                const p2X = initialX+10
                const p2Y = p0Y + 80
                svg.append("path")
                    .attr("d", " M " + p0X + " "+ p0Y +
                        " L " +  p1X + " " + p1Y +
                        " L " +  p2X + " " + p2Y +
                        " L " + p0X + " "+ p0Y)
                    .attr("stroke","black")
                    .attr("stroke-width",2)
                    .attr("fill", 'none')
                let rect1 = MotionElementsFactory.makeRect(svg, color, rectWidth, rectHeight, -rectWidth / 2, -rectHeight / 2)
                MotionElementsFactory.addRotationTransition(rect1, d3.easeLinear, d, index, rectWidth, rectHeight, initialX, initialY(selectedIndices.indexOf(index)),0)

                let rect2 = MotionElementsFactory.makeRect(svg, color, rectWidth, rectHeight, -rectWidth / 2, -rectHeight / 2)
                MotionElementsFactory.addRotationTransition(rect2, d3.easeLinear, d, index, rectWidth, rectHeight, initialX, initialY(selectedIndices.indexOf(index)),90)


            }
                // if(selectedIndices.includes(index)){
            //     let mark = MotionElementsFactory.makeMarkDot(svg)
            //     mark.attr("cx", 0)
            //         .attr("cy",0)
            //     MotionElementsFactory.addRotationTransition(mark,d3.easeLinear,d,index,rectWidth,rectHeight,initialX(index),initialY(index))
            //
            // }

        })

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
export default RotationWindMill;