import * as workerWrapper from './webworkerComputation?worker'
export function createSmoothWorker(): Worker {
	return new workerWrapper.default()
}