import React, { Component } from 'react'
import { select,selectAll } from 'd3-selection'
import MotionElementsFactory from "./factories/MotionElementFactory";
import * as d3 from "d3";

class RotationPlot extends Component {
    constructor(props) {
        super()
    }
    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate() {
        // this.createChart()
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
        const initialX = i => 100+i*50
        let initialY = i => 150+i*40

        ////////////////////////////////Prepare//////////////////////////
        const svg = select(this.node);
        selectAll("svg > *").remove();
        //////////////////////////////Draw/////////////////////////////////
        data.forEach((d,index) =>{
            let rect = MotionElementsFactory.makeRect(svg,color,rectWidth,rectHeight,-rectWidth/2,-rectHeight/2)

            MotionElementsFactory.addRotationTransition(rect,d3.easeLinear,d,index,rectWidth,rectHeight,initialX(index),initialY(index))
            if(selectedIndices.includes(index)){
                let mark = MotionElementsFactory.makeMarkDot(svg)
                mark.attr("cx", 0)
                    .attr("cy",0)
                MotionElementsFactory.addRotationTransition(mark,d3.easeLinear,d,index,rectWidth,rectHeight,initialX(index),initialY(index))

            }

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
export default RotationPlot;