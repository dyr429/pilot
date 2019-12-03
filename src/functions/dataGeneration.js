import seedrandom from 'seedrandom';
import math from 'mathjs';
const mu = 0;
const sigma = 1;
const rng = seedrandom('thisisjndexperimentseed');
const two_pi = 2.0*3.14159265358979323846;
const dataSize = 100;
export function generateDataSet(r){
    let xAry = getSTDNormalDistriArray();
    let yAry = getSTDNormalDistriArray();
    let rz = getCorrelation(xAry, yAry);
    let lam = getLambda(r, rz);
    yAry = yTransform(xAry, yAry, lam);
    return xAry.map((d,i)=>{
        return [d, yAry[i]];
    });

}

function getSTDNormalDistriArray(){
    let res=[];
    while(res.length<dataSize){
        let rnumber = getSTDNormalDistriNumber();
        if(rnumber>=-2*sigma && rnumber <= sigma*2){
            res.push(rnumber);
        }
    }
    return res;
}

function getSTDNormalDistriNumber(){
    let u1 = rng();
    let u2 = rng();
    // Box-Muller
    let z0 = math.sqrt(-2*math.log(u1))*math.cos(two_pi*u2);
    return z0*sigma+mu;
};

function getCorrelation(xAry, yAry){
    if(xAry.length===yAry.length){
        let xMean = math.mean(xAry);
        let yMean = math.mean(yAry);
        let xSTD = math.std(xAry);
        let ySTD = math.std(yAry);
        let sumOfDiff=0;
        for(let i=0;i<xAry.length;i++){
            sumOfDiff += (xAry[i] - xMean) + (yAry[i] - yMean);
        }
        let covariance = sumOfDiff/(xAry.length-1);
        return covariance/(xSTD*ySTD);
    }
    else{
        console.log("Invalid Correlation Calculation");
        return NaN;
    }
}

function getLambda(r, rz){
    let rSquare = Math.pow(r,2);
    let rZSquare = Math.pow(rz, 2);
    return ((rz - 1) * (rSquare + rz) + Math.sqrt(rSquare * (rZSquare-1) * (rSquare-1)))/((rz-1) * (2*rSquare + rz - 1))
}

function yTransform(xAry, yAry, lam){
    let lamSquare = Math.pow(lam, 2);
    return yAry.map((d,i)=>{
        return (lam*xAry[i] + (1-lam)*d)/Math.sqrt(lamSquare+Math.pow(1-lam,2));
    });
}