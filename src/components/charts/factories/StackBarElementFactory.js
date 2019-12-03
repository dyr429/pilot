import ElementsFactory from "./ElementsFactory";
import ColorFactory from "./ColorFactory";
import BarElementsFactory from "./BarElementsFactory";


class StackBarElementsFactory extends BarElementsFactory{
    static addStackBarstoChart(svg,data,color,x,y,height,width){
        svg.selectAll("rect")
            .data(data)
            .enter().append("g")
            .style('fill', function(d,i){return ColorFactory.applyColor(i,color)})
            .attr('class',"bargroup")
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("width", width-30)
            .attr("x", x)
            .attr("y", y)
            .attr("height", height)
            .attr("style", "outline: thin solid black;")
    }


    static addChickletStackBarstoChart(svg,data,color,x,y,height,width,gap){
        svg.selectAll("rect")
            .data(data)
            .enter().append("g")
            .style('fill', function(d,i){return ColorFactory.applyColor(i,color)})
            .attr('class',"bargroup")
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("width", width-30)
            .attr("x", x)
            .attr("y", d => {return y(d) + gap})
            .attr("height",d => {return height(d)-gap})
            .attr("rx",5)
            .attr("ry",5)
    }

    static addChickletoutlineStackBarstoCHart(svg,data,color,x,y,height,width,gap){
        svg.selectAll("rect")
            .data(data)
            .enter().append("g")
            .style('fill',"white")
            .style('stroke',function(d,i){return ColorFactory.applyColor(i,color)})
            .style('stroke-width', 2)
            .attr('class',"bargroup")
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("width", width-30)
            .attr("x", x)
            .attr("y", d => {return y(d) + gap})
            .attr("height",d => {return height(d)-gap})
            .attr("rx",5)
            .attr("ry",5)

    }

    static addDotMarksToChart(svg, data,className, indices, x, y, radius){
        //data display sequence from left bottom to up right
        //data iteration sequence is by category
        let current = 0
        // const selectedMap=[1,3,5,2,4]
        const selectedMap=[1,2,3,4,5]

        svg.selectAll(".mark")
            .data(data)
            .enter().append('g')
            .attr('class', className)
            .selectAll('.mark')
            .data(d => d)
            .enter().append("circle")
            .attr('cx',  x)
            .attr('cy', y)
            .attr('r', () => {
                current++;
                if(current == selectedMap[indices[0]] ||
                    current == selectedMap[indices[1]])
                    return radius
                else
                    return 0
            });
    }
}

export default StackBarElementsFactory;