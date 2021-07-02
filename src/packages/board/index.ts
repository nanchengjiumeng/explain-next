import { PenShapes, PenColors, StrokeWidths } from './vars';
import SVG from 'svg.js'
import { Ref } from 'vue';
import './svgdraw'

export function createSvgDraw(
	node: HTMLElement,
	shape: Ref<PenShapes>,
	color: Ref<PenColors>,
	strokeWidth: Ref<StrokeWidths>,
	Locked: Ref<Boolean>,
	width: number,
	height: number

): SVG.Element {
	const draw: SVG.Doc = SVG(node)
	const shapes: SVG.Element[] = [];
	let index = 0;
	let mouseRate = 4 // 捕捉的mousemove的频率，每mouseRate增加一个point

	const lockifyMouseEventListner = (mouseEventListner: MouseEventListner): MouseEventListner => {
		return function (event: MouseEvent) {
			if (Locked) {
				mouseEventListner(event)
			}
		}
	}

	const startDraw: MouseEventListner = (event: MouseEvent): void => {
		const option = {
			stroke: color.value,
			'stroke-width': strokeWidth.value,
			'fill-opacity': 0,
		};
		shapes[index] =
			shape.value === PenShapes.MousePaint
				? draw[shape.value]([]).attr(option)
				: draw[shape.value]().attr(option)
		shapes[index].draw(event);
	}

	const drawing: MouseEventListner = (event: MouseEvent): void => {
		mouseRate++
		if (mouseRate % 4 === 0 && shape.value === PenShapes.MousePaint && shapes[index]) {
			shapes[index].draw('point', event)
		}
	}

	const stopDraw: MouseEventListner = (event: MouseEvent): void => {
		if (!shapes[index]) return
		if (shape.value === PenShapes.MousePaint) {
			shapes[index].draw('stop', event);
		} else {
			shapes[index].draw(event);
		}
		index++;
	}

	draw.viewbox(0, 0, width, height) // 设置viewbox宽高

	draw.on('mousedown', (event: MouseEvent) => { lockifyMouseEventListner(startDraw)(event) });
	draw.on('mousemove', (event: MouseEvent) => { lockifyMouseEventListner(drawing)(event) })
	draw.on('mouseleave', (event: MouseEvent) => { lockifyMouseEventListner(stopDraw)(event) })
	draw.on('mouseup', (event: MouseEvent) => { lockifyMouseEventListner(stopDraw)(event) })

	return draw
}




