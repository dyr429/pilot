import {exp}  from '../config/exp';

if (exp === experiments.CM_EXPEREMENT) {
    module.exports = require("./cm_experiment/keys");
} else {
    module.exports = require("./jnd_experiment/keys");
}