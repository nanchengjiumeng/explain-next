import { PenShapes, PenColors, StrokeWidths } from './vars';
import SVG from 'svg.js'
import { Ref } from 'vue';
import * as svgDraw from './svgDraw'
import * as smooth from './smooth'

export function createSvgDraw(
	node: HTMLElement,
	shape: Ref<PenShapes>,
	color: Ref<PenColors>,
	strokeWidth: Ref<StrokeWidths>,
	Locked: Ref<Boolean>,
	width: number,
	height: number,
	startWrite?: WriteCallback,
	endWrite?: WriteCallback
): SVG.Doc {
	const draw: SVG.Doc = SVG(node)
	const shapes: SVG.Element[] = [];

	// 处理平滑的线程
	const smoothWorker: Worker = smooth.createSmoothWorker()
	svgDraw.init(smoothWorker, startWrite, endWrite)
	draw.destroy = () => smoothWorker.terminate()

	let index = 0;
	let mouseRate = 4 // 捕捉的mousemove的频率，每mouseRate增加一个point


	const lockifyMouseEventListener = (mouseEventListener: MouseEventListener): MouseEventListener => {
		return function (event: MouseEvent) {
			if (!Locked.value) {
				mouseEventListener(event)
			}
		}
	}

	const startDraw: MouseEventListener = (event: MouseEvent): void => {
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

	const drawing: MouseEventListener = (event: MouseEvent): void => {
		mouseRate++
		if (mouseRate % 4 === 0 && shape.value === PenShapes.MousePaint && shapes[index]) {
			shapes[index].draw('point', event)
		}
	}

	const stopDraw: MouseEventListener = (event: MouseEvent): void => {
		if (!shapes[index]) return
		if (shape.value === PenShapes.MousePaint) {
			shapes[index].draw('stop', event);
		} else {
			shapes[index].draw(event);
		}
		index++;
	}

	draw.viewbox(0, 0, width, height) // 设置viewbox宽高

	draw.on('mousedown', lockifyMouseEventListener(startDraw));
	draw.on('mousemove', lockifyMouseEventListener(drawing))
	draw.on('mouseleave', lockifyMouseEventListener(stopDraw))
	draw.on('mouseup', lockifyMouseEventListener(stopDraw))

	return draw
}




