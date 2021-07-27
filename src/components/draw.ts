import SVG from 'svg.js'
import { ref, Ref } from "vue";
import { createSvgDraw } from "../packages/board/index";


import {
	penColorList,
	PenColors,
	penShapeList,
	PenShapes,
	StrokeWidthList,
	StrokeWidths,
	ScaleTimesList
} from "../packages/board/vars";

export interface Result {
	dom: HTMLDivElement,
	doc: SVG.Doc,
	locked: Ref<Boolean>,
	shape: Ref<PenShapes>,
	color: Ref<PenColors>,
	stokeWidth: Ref<StrokeWidths>,
	ScaleTimes: Ref<number>
	penShapeList: PenShape[],
	penColorList: PenColor[],
	ScaleTimesList: ScaleItem[],
	StrokeWidthList: StrokeWidth[],
	inputSvgString: (svgString: string) => void,
}

export const init = (): Result => {
	const dom: HTMLDivElement = document.createElement('div')
	const shape: Ref<PenShapes> = ref(penShapeList[0].val) as Ref<PenShapes>;
	const color: Ref<PenColors> = ref(penColorList[0].val) as Ref<PenColors>;
	const stokeWidth: Ref<StrokeWidths> = ref(StrokeWidthList[0].val);
	const ScaleTimes: Ref<number> = ref(1)
	const locked: Ref<Boolean> = ref(false);
	let doc: SVG.Doc | undefined;

	doc = createSvgDraw(
		dom,
		shape,
		color,
		stokeWidth,
		locked,
		ScaleTimes,
		200,
		300,
		(svgEle: SVG.Element) => {
			// console.log('write starting');
		},
		(svgEle: SVG.Element) => {
			// console.log('write ending');
		}
	);



	function inputSvgString(svgString: string): void {
		try {
			const outer = document.createElement('div')
			outer.innerHTML = svgString
			const outerSvg = outer.querySelector('svg')
			if (outerSvg && doc && doc.node) {
				doc.node.innerHTML = outerSvg.innerHTML
				doc.viewbox(outerSvg.viewBox.baseVal)
			}
		} catch (e) {
			console.error(e);
			throw new TypeError('load svg file error.')
		}
	}


	return {
		dom,
		doc,
		locked,
		shape,
		color,
		stokeWidth,
		penShapeList,
		penColorList,
		StrokeWidthList,
		ScaleTimesList,
		inputSvgString,
		ScaleTimes
	}
}