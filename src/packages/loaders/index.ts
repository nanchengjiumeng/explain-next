import { SVGStringParser } from './SVGStringParser';
import { SVGFetch } from './SVGFetch';
export const load = async function (uri: string): Promise<SVGStringParser> {
	const svgString = await SVGFetch(uri)
	return new SVGStringParser(svgString)
}