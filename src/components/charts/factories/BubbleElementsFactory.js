import ElementsFactory from "./ElementsFactory";
import ColorFactory from "./ColorFactory";

class BubbleElementsFactory extends ElementsFactory{
    static addBubblestoChart(svg, bubbleData,color){
        svg.selectAll('.bubble')
            .data(bubbleData)
            .enter()
            .append('circle')
            .attr('class', 'bubble');
        svg.selectAll('.bubble')
            .data(bubbleData)
            .exit().remove();
        svg.selectAll('.bubble')
            .data(bubbleData)
            .filter(d => !d.children)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.r)
            .style('fill', function(d,i){return ColorFactory.applyColor(i,color)})
            .attr('stroke', 'black');
    }

    static addDotMarkstoChart(svg,bubbleData,indices){
        svg.selectAll('.mark')
            .data(bubbleData)
            .enter()
            .append('circle')
            .attr('class', 'mark');
        svg.selectAll('.mark')
            .data(bubbleData)
            .exit().remove();
        svg.selectAll('.mark')
            .data(bubbleData)
            .filter(d => !d.children)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', (d, i) => {
                if (i === indices[0] || i === indices[1]) {
                    return 3;
                } else {
                    return 0;
                }
            });
    }
}
export default BubbleElementsFactory