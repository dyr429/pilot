import React, { Component } from 'react'
import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import ReactTooltip from 'react-tooltip';
import {findDOMNode} from 'react-dom';
import { Tooltip } from '@material-ui/core';

class ScatterPlot extends Component{
    constructor(props){
        super(props);
        this.createChart = this.createChart.bind(this);
    }
    state = {
        pSize:3,
    };
    componentDidMount(){
        this.createChart();
    }
    componentDidUpdate(){

    }
    createChart(){
        const {
            width,
            height,
            data,
            handleSelection
        } = this.props;
        // data in format [x1,y1], [x2,y2]
        const margin = {
            left: 40,
            top: 20,
            right: 20,
            bottom: 20,
        };
        const inner_height = height-margin.bottom;
        const inner_width=width-margin.left-margin.right;
        const xAry = data.map(d=>d[0]);
        const yAry = data.map(d=>d[1]);
        console.log(data)
        var xScale = scaleLinear().range([0,inner_width]);
        var yScale = scaleLinear().range([inner_height,0]);
        const xAxis = axisBottom()
                            .scale(xScale)
                            .tickSize(0)
                            .tickFormat(function(d){ return ''; });

        const yAxis = axisLeft()
                            .scale(yScale)
                            .tickSize(0);
        const svg = select(this.node)
                    .attr("width", width)
                    .attr("height", height);

        svg.append("g")
                .attr('transform', `translate(0, ${height-margin.bottom})`)
                .attr('class', 'main axis date').call(xAxis);
                
        svg.append("g")
                .attr('class', 'main axis date').call(yAxis);
        xScale.domain([d3.min(xAry), d3.max(xAry)]).range([0+10,inner_width-10]);
        yScale.domain([d3.min(yAry), d3.max(yAry)]).range([inner_height-10,0+10]);
        
        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
                .attr("class","dot")
                .attr("r", this.state.pSize)
                .attr("cx", d=>{
                    return xScale(d[0])})
                .attr("cy", d=>{
                    return yScale(d[1])})
                .style("fill", 'black')

    }
    onMouseOverHandler = ()=>{
        ReactTooltip.show(findDOMNode(this.refs.tooltip));

    }
    render(){
        const {width, height, className} = this.props;
        return <svg ref={node=>this.node=node}
            className = {className}
            width = {width}
            height = {height}
            onClick = {this.props.handleSelection}
            onMouseOver = {this.onMouseOverHandler}
            style = {{cursor: 'pointer'}}
            data-tip
            data-for = 'tooltipSelect'
            >
        </svg>
        
    }

}
export default ScatterPlot;
// ScatterPlot requires dataset in the structure [[x1,y1],[x2,y2]]. 
// vismethods.getScatterPlot = function (params) {
//     var data          = []
//       , extentOverall = -1
//       , margins       = 20
// 	    , pSize         = 3
// 	    , target        = ''
// 	    , extent        = -1
// 	    , factor        = 1
// 	    , showBox       = false
//       , boxData       = []
//       , showline      = 'false'; 
    
//     if(params){
// 	    if(params.data)
// 	      data = params.data;
// 	    if(params.extent)
// 	      extent = params.extent;	     	
// 	    if(params.target)  
// 	      target = '#' + params.target;
// 	    if(params.showBox)
// 	    	showBox = params.showBox
// 	    if(params.pSize)
// 	    	pSize = params.pSize
// 	    if(params.margins)
// 	    	margins = params.margins
// 	    if(params.factor)
// 	    	factor = params.factor
//       if(params.showline)
//         showline = params.showline

//     }
    
//     extentOverall = extent + margins * 2;
    
//     var width  = extent
//       , height = extent
//       , margin = {
// 	        top:     margins,
// 	        right:   margins,
// 	        bottom:  margins,
// 	        left:    margins
//       };
        
//     if(factor != 1)
//     	data = gen.setBox({d: data, w: 90, h: 400, factor: factor})
    
//     var x = d3.scale.linear().domain([0,width]).range([0,width]);
//     var y = d3.scale.linear().domain([0,height]).range([height,0]);

//     var chart = d3.select(target).append('svg:svg')
// 	    .attr('width', extentOverall).attr('height', extentOverall)
// 	    .attr('class', 'chart')

//     var main = chart.append('g')
// 	    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
// 	    .attr('width', width).attr('height', height).attr('class', 'main')

//     // draw the x axis
//     var xAxis = d3.svg.axis()
//       .scale(x)
//       .tickFormat(function(d){ return ''; })
//       .tickSize(0)
//       .orient('top');

//     main.append('g')
// 	    .attr('transform', 'translate(' + 0 + ',' + height + ')')
// 	    .attr('class', 'main axis date').call(xAxis);

//     // draw the y axis
//     var yAxis = d3.svg.axis()
//       .scale(y)
//       .tickFormat(function(d){ return ''; })
//       .tickSize(0)
//       .orient('right');

//     main.append('g')
// 	    .attr('class', 'main axis date').call(yAxis);

//     var g = main.append("svg:g");

//     g.selectAll('div').data(data).enter().append("svg:circle")
// 	    .attr("cx", function(d) { return x(d[0]); })
//       .attr("cy", function(d) { return y(d[1]); })
//       .attr("r", pSize);
    
//     if(showline === 'true'){
//     	 data.sort(function(a,b){ return a[0] - b[0]});

//     var line = d3.svg.line()
//         .x(function(d) {return x(d[0]);})
//         .y(function(d) {return y(d[1]);});
    
//      var gs = g.append("path")
//      .datum(data)
//        .attr('d', line)
//        .attr('stroke', 'black')
//        .attr('stroke-size', 1)
//        .attr('fill', 'none')	   	
//     }
    
//     var box = getBox(gen.rot(data, 45 ,'counterclockwise'))

//     return box;
//  }