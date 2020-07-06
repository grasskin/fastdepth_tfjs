import "regenerator-runtime/runtime.js";

import * as tfnode from '@tensorflow/tfjs-node';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = 'fastdepth_opset11_tfjs/model.json';

async function loadModel(){
    const handler = tfnode.io.fileSystem(MODEL_URL); 
    const model = await tf.loadGraphModel(handler);
    console.log("Model loaded");
}

loadModel();
