import React, { Component } from 'react'
import { select,selectAll } from 'd3-selection'
import MotionElementsFactory from "./factories/MotionElementFactory";
import * as d3 from "d3";

class MovingFlow extends Component {
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
            color,
        } = this.props;

        /////////////////////////////Settings///////////////////////////////
        const rectWidth = 80
        const rectHeight= 1
        const initialX = () => {return -80}
        let initialY = i => {return (Math.random()*60 + i*200 +50)}
        let speed = s => (1/s)*100000


        ////////////////////////////////Prepare//////////////////////////
        const svg = select(this.node)
        d3.selectAll("svg > *").remove();

        svg.append("line")
            .style("stroke","black")
            .attr("x1",0)
            .attr("y1",200)
            .attr("x2",400)
            .attr("y2",200)

        //////////////////////////////Draw/////////////////////////////////
        data.forEach((d,index) =>{
            if(selectedIndices.includes(index)) {
                for (let i = 0; i < 50; i++) {
                    let rect = MotionElementsFactory
                        .makeRect(svg, color, rectWidth, rectHeight, initialX(), initialY(selectedIndices.indexOf(index)))
                    MotionElementsFactory.addMovingTransitionToRect(
                        rect,
                        d3.easeLinear,
                        speed(d),
                        i,
                        initialX(),
                        initialY(selectedIndices.indexOf(index)))

                }

            }

            // if(selectedIndices.includes(index)){
            //     let mark = MotionElementsFactory.makeMarkDot(svg)
            //     MotionElementsFactory.addMovingTransitionToRect(
            //         mark,
            //         d3.easeLinear,
            //         speed(d),
            //         index,
            //         initialX,
            //         initialY(index))
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
export default MovingFlow;