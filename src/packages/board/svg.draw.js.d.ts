type PenColor = {
	name: string,
	val: string
}
type PenShape = {
	name: string,
	val: string
}
type SrokeWidth = {
	name: string,
	val: number
}


interface MouseEventListner {
	(evt: MouseEvent): void;
}

type PointArr = [number, number]

declare interface Window {
	SVG: any
}

declare namespace svgjs {
	interface Element {
		draw: (a: string | MouseEvent, b?: MouseEvent) => any,
	}
}

declare module 'smooth-polyline' {
	export default function (pointArr: PointArr[]): PointArr[];
}
