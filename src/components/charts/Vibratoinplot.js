import React, { Component } from 'react'
import { select,selectAll } from 'd3-selection'
import MotionElementsFactory from "./factories/MotionElementFactory";
import * as d3 from "d3";

class VibrationPlot extends Component {
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

        const circleR = 20
        const offset = 50
        const initialX = 160
        let initialY = i => i*200+100
        let freq = s => s*5

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
            if(selectedIndices.includes(index)){
                let circle = MotionElementsFactory.makeCircle(svg,circleR,color)
                MotionElementsFactory.addVibrationTransition(circle,d3.easeLinear,initialX,initialY(index),offset,freq(d))
                 let mark = MotionElementsFactory.makeMarkDot(svg)
                MotionElementsFactory.addVibrationTransition(mark,d3.easeLinear,initialX,initialY(selectedIndices.indexOf(index)),offset,freq(d))
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
export default VibrationPlot;