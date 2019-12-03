import ElementsFactory from "./ElementsFactory";
import ColorFactory from "./ColorFactory";
import * as d3 from "d3";

class MotionElementFactory extends ElementsFactory{
    static makeCircle(svg, radius,color){
        let circle = svg.append("circle")
            .attr("fill", "white")
            .attr("stroke",function(d,i){return ColorFactory.applyColor(i,color)})
            .attr("stroke-width",3)
            .attr("r", radius)
        return circle
    }

    static makeRect(svg,color,width,height,X,Y){
        let rect = svg.append("rect")
            .attr("fill", function(d,i){return ColorFactory.applyColor(i,color)})
            .attr("stroke",function(d,i){return ColorFactory.applyColor(i,color)})
            .attr("stroke-width",3)
            .attr("width", width)
            .attr("height", height)
            .attr("x",X)
            .attr("y",Y)
        return rect
    }

    static makeMarkDot(svg){
        let dot = svg.append("circle")
            .attr("fill", "black")
            .attr("stroke","black")
            .attr("stroke-width",1)
            .attr("r", 3)
        return dot
    }

    static addTriangleOutline(svg){
        let tri = svg.append("path")
            .attr("d", " M 10 25 " +
                "L 10 75" +
                "L 50 75" +
                "L 10 25")
            .attr("stroke","black")
            .attr("stroke-width",2)
            .attr("fill", 'none')
        return tri
    }

    static addMovingTransitionToCircle(element,easement,speed,dataIndex,initialX,initialY){
        repeat(element);
        function repeat(e) {
            e
            .attr('cx', initialX)          // position the circle at 40 on the x axis
            .attr('cy', initialY)
            .transition()             // apply a transition
            .ease(easement)           // control the speed of the transition
            .duration(speed)           // apply it over 2000 milliseconds
            .attr('cx', 720)
            .on("end", () => repeat(e));       // when the transition finishes start again
        };
    }

    static addMovingTransitionToRect(element,easement,speed,lineIndex,initialX,initialY){
        repeat(element);
        function repeat(e) {
            e
                .attr('x', initialX)          // position the circle at 40 on the x axis
                .attr('y', initialY)
                .transition()
                .delay(speed/10*lineIndex )
                .ease(easement)           // control the speed of the transition
                .duration(speed)
                .attr('x', 900)

                .on("end", () => repeat(e));       // when the transition finishes start again
        };
    }

    static addRotationTransition(element, easement, rpm,dataIndex,objWidth,objHeight,X,Y,initialAngle){
        element.attr("transform", "translate(" + X+objWidth/2 + ", " + Y+objHeight/2 + ")rotate(" + initialAngle+")");
        let initialRun = true;
        repeat(element)
            function repeat(e){

                let newAngle = element._groups[0][0].transform.animVal[1].angle + 120;
                if(initialRun){
                    initialRun = false
                    e.transition().duration(10).ease(easement)
                        .attr("transform", "translate(" + X + ", " + Y+ ")rotate(" + newAngle + ")")
                        .on("end", ()=> repeat(e))
                }else{
                    e.transition().duration(20000/rpm).ease(easement)
                        .attr("transform", "translate(" + X + ", " + Y+ ")rotate(" + newAngle + ")")
                        .on("end", ()=> repeat(e))
                }

            }
    }

    static addVibrationTransition(element,easement,initialX,initialY,offsetX,frequency){
        repeat(element);
        function repeat(e) {
            e
            .attr('cx', initialX)          // position the circle at 40 on the x axis
            .attr('cy', initialY)
            .transition()             // apply a transition
            .ease(easement)           // control the speed of the transition
            .duration(frequency)           // apply it over 2000 milliseconds
            .attr('cx', initialX+offsetX)
            .transition()             // apply a transition
            .ease(easement)           // control the speed of the transition
            .duration(frequency)           // apply it over 2000 milliseconds
            .attr('cx', initialX)
            .on("end", ()=>repeat(e));       // when the transition finishes start again
        };
    }


}
export default MotionElementFactory

