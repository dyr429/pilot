import React, { Component } from 'react'
import { select,selectAll } from 'd3-selection'
import MotionElementsFactory from "./factories/MotionElementFactory";
import * as d3 from "d3";

class MovingPlot extends Component {
    constructor(props) {
        super()
    }
    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate() {
        // const svg = select(this.node)
        // svg.empty()
        this.createChart()
        console.log("emptyed")
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
        const initialX = 50
        let initialY = i => 50+i*70
        let speed = s => s*100
        ////////////////////////////////Prepare//////////////////////////
        const svg = select(this.node)
        selectAll("svg > *").remove();
        //////////////////////////////Draw/////////////////////////////////
        data.forEach((d,index) =>{
            let circle = MotionElementsFactory.makeCircle(svg,circleR,color)
            MotionElementsFactory.addMovingTransitionToCircle(
                circle,
                d3.easeLinear,
                speed(d),
                index,
                initialX,
                initialY(index))
            if(selectedIndices.includes(index)){
                let mark = MotionElementsFactory.makeMarkDot(svg)
                MotionElementsFactory.addMovingTransitionToCircle(
                    mark,
                    d3.easeLinear,
                    speed(d),
                    index,
                    initialX,
                    initialY(index))
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
export default MovingPlot;