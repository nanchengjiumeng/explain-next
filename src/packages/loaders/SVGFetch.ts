import axios from 'axios'
export const SVGFetch = function (uri: string, random: boolean = true): Promise<string> {
	let url = uri
	if (random) {
		const timestamp = Math.random().toString().slice(2)
		let uriSplited = uri.split('?')
		uriSplited.splice(1, 0, "timestamp=" + timestamp)
		url = uriSplited[0] + '?' + uriSplited.slice(1).join('&')
	}
	return axios.get(url).then(res => res.data)
}