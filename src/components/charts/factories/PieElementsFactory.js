import ElementsFactory from "./ElementsFactory";
import { arc, pie } from 'd3-shape';
import ColorFactory from "./ColorFactory";

class PieElementsFactory extends ElementsFactory{

    static addPiesToChart(svg,pieData,radius,className,transform,color){

        const pieArc = arc()
            .outerRadius(radius)
            .innerRadius(0);

        svg.selectAll('.arc')
            .data(pieData)
            .enter().append('g')
            .attr('class', className);
        svg.selectAll('.arc')
            .data(pieData)
            .exit().remove();
        const g = svg.selectAll('.arc')
            .data(pieData)
            .attr('transform', transform)

        g.selectAll('path').data(pieData).enter().append('path');
        g.selectAll('path').data(pieData).exit().remove();
        g.selectAll('path').data(pieData)
            .attr('d', pieArc)
            .attr('stroke', 'black')
            .attr("fill", function(d,i){return ColorFactory.applyColor(i,color)});
    }


    static addDotMarkstoChart(svg,data, className, selectedIndices, y, radius, transfrom){
        svg.selectAll('.mark').data(data).enter().append('circle').attr('class', className);
        svg.selectAll('.mark').data(data).exit().remove();
        svg.selectAll('.mark').data(data)
            .attr("transform", transfrom)
            .attr("dy", ".85em")
            .attr('r', radius);
    }
    // Marks
    // Option 1: text A, B
    // g.selectAll('text').data(pieLayout(data)).enter().append('text');
    // g.selectAll('text').data(pieLayout(data)).exit().remove();
    // g.selectAll('text').data(pieLayout(data))
    //     .attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + ")"; })
    //     .attr("dy", ".35em")
    //     .text((d, i) => {
    //         if (i === selectedIndices[0]) return 'A';
    //         if (i === selectedIndices[1]) return 'B';
    //     });


}
export default PieElementsFactory