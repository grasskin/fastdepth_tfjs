import "regenerator-runtime/runtime.js";

import * as tfnode from '@tensorflow/tfjs-node';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = 'fastdepth_opset9_tfjs/model.json';

async function loadRunModel(){
    const handler = tfnode.io.fileSystem(MODEL_URL); 
    const model = await tf.loadGraphModel(handler); 
    console.log("Model loaded");

    const input = tf.ones([1,3,480,640], 'float32');
    const output = await model.execute(input);
    console.log(output);
    output.print();
    console.log("Model run");
}

loadRunModel();
//let output = runModel(model);

