import React,{ useState }from 'react';
import PieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";
import BubbleChart from "../charts/BubbleChart";
import TreeMap from "../charts/TreeMap";
import StackBarChart from "../charts/StackBarChart";
import MovingPlot from "../charts/MovgingPlot";
import MovingFlow from "../charts/MovingFlow";

import RotationPlot from "../charts/RotationPlot";
import RotationWindMill from "../charts/RotationWindMill";
import VibrationPlot from "../charts/Vibratoinplot";
import MovingFlow_Pure from "../charts/MovingFlow_Pure";



const VisBlock = ({chartWidth,chartHeight,question,expText,classes,showExpText}) => {
    //const [showText, setShowText] = useState(false);
    let chartSwitcher = (q) => {
        const { vis, style,color,data, selectedIndices } = q;
        console.log(q)
        switch (vis) {
            case 'piechart':
                return <PieChart
                    className={classes.visChart}
                    data={data}
                    selectedIndices={selectedIndices}
                    width={chartWidth}
                    height={chartHeight}
                    color = {color}
                ></PieChart>;
            case 'barchart':
                return <BarChart
                    className={classes.visChart}
                    data={data}
                    selectedIndices={selectedIndices}
                    width={chartWidth}
                    height={chartHeight}
                    color = {color}
                    style = {style}
                ></BarChart>;
            case 'bubblechart':
                return <BubbleChart
                    className={classes.visChart}
                    data={data}
                    selectedIndices={selectedIndices}
                    width={chartWidth}
                    height={chartHeight}
                    color = {color}
                ></BubbleChart>;
            case 'treemap':
                return <TreeMap
                    className={classes.visChart}
                    data={data}
                    selectedIndices={selectedIndices}
                    width={chartWidth}
                    height={chartHeight}
                ></TreeMap>;
            case 'stackbarchart':
                return <StackBarChart
                    className={classes.visChart}
                    data={data}
                    selectedIndices={selectedIndices}
                    width={chartWidth}
                    height={chartHeight}
                    style = {style}
                    //type = "normal"
                    //type = "chicklet"
                    //color = "white"
                    color = {color}
                ></StackBarChart>;
            case 'moving':
                return<MovingFlow
                    className={classes.visChart}
                    data={data}
                    selectedIndices={selectedIndices}
                    width={chartWidth}
                    height={chartHeight}
                    color = {color}
                ></MovingFlow>
            case 'rotation':
                return<RotationWindMill
                    className={classes.visChart}
                    data={data}
                    selectedIndices={selectedIndices}
                    width={chartWidth}
                    height={chartHeight}
                    color = {color}
                ></RotationWindMill>
            case 'vibration':
                return<VibrationPlot
                    className={classes.visChart}
                    data={data}
                    selectedIndices={selectedIndices}
                    width={chartWidth}
                    height={chartHeight}
                    color = {color}
                ></VibrationPlot>
            case 'movingJND':
                return<MovingFlow_Pure
                    className={classes.visChart}
                    data={data}
                    width={chartWidth}
                    height={chartHeight}
                    color = {color}
                ></MovingFlow_Pure>
        }
    }

    const chart = chartSwitcher(question);
    return(
        <div style = {{'display':'inline-block', 'flexFlow':'row nowrap', 'justifyContent':'center','marginLeft':10,'border': '0.5px solid grey'}}>
            {chart}
        </div>
    );

};

export default VisBlock