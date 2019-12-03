import {schemeCategory10} from 'd3-scale-chromatic'
import {scaleOrdinal } from 'd3-scale'

class ColorFactory{
    static colorScale = scaleOrdinal(schemeCategory10)


    static applyColor(index,color){
        if(color === "colorful"){
            return this.colorScale(index);
        }else {
            return color;
        }
    }
}
export default ColorFactory