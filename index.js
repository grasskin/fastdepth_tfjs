import "regenerator-runtime/runtime.js";

import * as fs from 'fs';
import * as tfnode from '@tensorflow/tfjs-node';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = 'fastdepth_opset9_v2_tfjs/model.json';

const readImage = (path) => {
  const imageBuffer = fs.readFileSync(path);
  const tfimage = tfnode.node.decodeImage(imageBuffer);
  return tfimage;
}

const getTestImage = async () => {
    const image = readImage("224x224-sample.jpg");
    console.log(image.shape);
    const reshaped_image = tf.transpose(image, [2, 0, 1]);

    const big_image = reshaped_image.reshape([1,3,224,224]);
    const float_img = big_image.asType('float32');
    return float_img.div(255);
}

const loadRunModel = async () => {
    const handler = tfnode.io.fileSystem(MODEL_URL); 
    const model = await tf.loadGraphModel(handler); 
    console.log("Model loaded");
    const input = await getTestImage();
    //const input = tf.ones([1,3,480,640], 'float32');
    const output = await model.predict(input);
    console.log(output);
    output.print();
    console.log("Model run");
    let raw = await output.array()
    fs.writeFileSync('raw-depth.txt', raw);
    
    let outReshape = (tf.transpose(output, [2,3,1,0])).reshape([224,224,1])
    console.log(tf.max(outReshape));
    let outResize = tf.mul(tf.div(outReshape, tf.max(outReshape)), 255).asType('int32')
    outResize.print();
    let fileOut = await tfnode.node.encodeJpeg(outResize, 'grayscale');
    console.log(fileOut);
    let fileOutPath = `output${Date.now()}.jpg`;
    fs.writeFileSync(fileOutPath, fileOut)
    console.log(`Output saved to ${fileOutPath}`);
}

loadRunModel();
