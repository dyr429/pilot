import { scaleLinear,scaleOrdinal } from 'd3-scale'
import { axisBottom, axisLeft, axisRight,axisTop } from 'd3-axis';
import ColorFactory from "./ColorFactory";

class ElementsFactory {
    static makeScale(range, domain) {
        return scaleLinear().range(range).domain(domain);
    }

    /**
     * return Axis
     * @param {postion} top,left,right,bottom
     * @range {range} [start,end]
     * @domian {domain} [start,end]
     * @tick {tick} [start,end]
     */
    static makeAxis(position, scale, tick) {
        switch (position) {
            case "top":
                return axisTop().scale(scale).tickValues(tick);
            case "bottom":
                return axisBottom().scale(scale).tickValues(tick);
            case "left":
                return axisLeft().scale(scale).tickValues(tick);
            case "right":
                return axisRight().scale(scale).tickValues(tick);
            default:
                console.log("wrong type")
        }
    }

    static addAxistoChart(svg, selector, axis, customClass, transform) {
        svg.selectAll(selector)
            .data([0]).enter()
            .append('g')
            .attr('class', customClass);
        svg.selectAll(selector)
            .data([0]).exit()
            .remove();
        svg.selectAll(selector)
            .attr("transform", transform)
            .call(axis);
    }



}
export default ElementsFactory;