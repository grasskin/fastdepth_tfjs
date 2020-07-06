const tf = require('@tensorflow/tfjs');
import {loadGraphModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = './fastdepth_opset11_tfjs/model.json";

const model = await loadGraphModel(MODEL_URL);
console.log(model);
