import React, { Component } from 'react'
import { select,selectAll } from 'd3-selection'
import MotionElementsFactory from "./factories/MotionElementFactory";
import * as d3 from "d3";

class MovingFlow_Pure extends Component {
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
            color,
        } = this.props;

        /////////////////////////////Settings///////////////////////////////
        const rectWidth = 80
        const rectHeight= 1
        const initialX = () => {return -100}
        let initialY = () => {return (Math.random()*100 + 100)}
        let speed = s => (1/s)*100000


        ////////////////////////////////Prepare//////////////////////////
        const svg = select(this.node)



        //////////////////////////////Draw/////////////////////////////////


        for (let i = 0; i < 50; i++) {
            let rect = MotionElementsFactory
                .makeRect(svg, color, rectWidth, rectHeight, initialX(), initialY())
            MotionElementsFactory.addMovingTransitionToRect(
                rect,
                d3.easeLinear,
                speed(data),
                i,
                initialX(),
                initialY())

        }
    }
    render() {
        const { width, height, className } = this.props;
        return <svg ref={node => this.node = node}
                    className={className}
                    width={width}
                    height={height}
                    >
        </svg>
    }
}
export default MovingFlow_Pure;