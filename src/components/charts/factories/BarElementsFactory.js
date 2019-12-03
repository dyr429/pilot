import ElementsFactory from "./ElementsFactory";
import ColorFactory from "./ColorFactory";

class BarElementsFactory extends ElementsFactory{
    static addBarstoChart(svg,data,color,x,y,height,width){

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
            .style('fill', function(d,i){return ColorFactory.applyColor(i,color)})
            .attr('stroke', 'black')
            .attr('x', x)
            .attr('y', y)
            .attr('height', height)
            .attr('width', width);
    }

    static addChickletBarstoChart(svg,data,color,x,y,height,width){
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
            .style('fill', function(d,i){return ColorFactory.applyColor(i,color)})
            .attr('x', x)
            .attr('y', y)
            .attr('height', height)
            .attr('width', width)
            .attr("rx",5)
            .attr("ry",5);
    }

    static addChickletOutlineBarstoChart(svg,data,color,x,y,height,width,outlineWidth){
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
            .style('fill', "white")
            .style('stroke',function(d,i){return ColorFactory.applyColor(i,color)})
            .style('stroke-width', outlineWidth)
            .attr('x', x)
            .attr('y', y)
            .attr('height', height)
            .attr('width', width)
            .attr("rx",5)
            .attr("ry",5);
    }

    static addDotMarkstoChart(svg, className, indices, x, y, radius) {
        svg.selectAll('.mark')
            .data(indices).enter()
            .append('circle').attr('class', className);
        svg.selectAll('.mark')
            .data(indices).exit()
            .remove();
        svg.selectAll('.mark')
            .data(indices)
            .attr('class', 'mark')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', radius)
    }

    static addLetterMarkstoChart(svg, className, indices, x, y) {

        svg.selectAll('.mark')
            .data(indices).enter()
            .append('text').attr('class', 'mark');
        svg.selectAll('.mark')
            .data(indices).exit()
            .remove();
        svg.selectAll('.mark')
            .data(indices)
            .attr('class', 'mark')
            .attr('x', x)
            .attr('y', y)
            .text((d, i) => i === 0 ? 'A' : 'B');
    }
}

export default BarElementsFactory