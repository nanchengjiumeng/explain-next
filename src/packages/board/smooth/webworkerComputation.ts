import smooth from 'smooth-polyline'

self.addEventListener('message', function ({ data }) {
	const pointArrList: PointArr[] = smooth(data.pointArrList)
	const postMessageOnWorker = postMessage as (message: any) => void
	postMessageOnWorker({
		pointArrList,
		chanel: data.channel
	})
})


