type PenColor = {
	name: string,
	val: string
}
type PenShape = {
	name: string,
	val: string
}
type StrokeWidth = {
	name: string,
	val: number
}


interface MouseEventListener {
	(evt: MouseEvent): void;
}

type PointArr = [number, number]

declare interface Window {
	SVG: any,
}

declare namespace svgjs {
	interface Element {
		draw: (a: string | MouseEvent, b?: MouseEvent) => any,
		plot: (arr: PointArr[]) => void;
	}
	interface Doc {
		destroy: () => any;
	}
}

declare interface PaintHandle {
	new(): any;
	set: svgjs.Set;
	el: svgjs.Element;
}

declare interface WriteCallback {
	(ele: svgjs.Element): any;
}

declare module 'smooth-polyline' {
	export default function (pointArr: PointArr[]): PointArr[];
}
