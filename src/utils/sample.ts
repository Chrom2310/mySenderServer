import { ISample } from '../model/endPoint';

export function checkSample(sample: ISample, values: Partial<ISample>) {
  switch (true) {      
      case Object.keys(sample).sort().join(',') !== Object.keys(values).sort().join(','):
      case Object.keys(sample).length !== Object.keys(values).length:
          return false;
      default:
          return true;
          break;
  }
}

export function setSample(sample: ISample, values: Partial<ISample>) {
    let val:ISample = {};
    Object.keys(sample).forEach((key) => {
        val[key] = values[key] || null;
    })
}