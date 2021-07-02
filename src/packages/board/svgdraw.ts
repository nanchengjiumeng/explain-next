import SVG from 'svg.js'
window.SVG = SVG
import 'svg.draw.js'
import smooth from 'smooth-polyline'

SVG.Element.prototype.draw.extend('line polyline polygon', {
	init: function (e: MouseEvent) {
		// When we draw a polygon, we immediately need 2 points.
		// One start-point and one point at the mouse-Pointtion
		this.set = new SVG.Set();
		var p: SVGPoint = this.startPoint
		this.el.plot([[p.x, p.y], [p.x, p.y]]);
	},

	// The calc-function sets the Pointtion of the last point to the mouse-Pointtion (with offset ofc)
	calc: function (e: MouseEvent) {
		var arr = this.el.array().valueOf();
		arr.pop();
		if (e) {
			var p = this.transformPoint(e.clientX, e.clientY);
			arr.push(this.snapToGrid([p.x, p.y]));
		}

		this.el.plot(arr);

	},

	point: function (e: MouseEvent) {
		if (this.el.type.indexOf('poly') > -1) {
			// Add the new Point to the point-array
			var p: SVGPoint = this.transformPoint(e.clientX, e.clientY),
				arr: PointArr[] = this.el.array().valueOf();
			arr.push(this.snapToGrid([p.x, p.y]));
			this.el.plot(arr);
			// Fire the `drawpoint`-event, which holds the coords of the new Point
			this.el.fire('drawpoint', { event: e, p: { x: p.x, y: p.y }, m: this.m });
			return;
		}
		// We are done, if the element is no polyline or polygon
		this.stop(e);

	},
	clean: function () {
		// Remove all circles
		this.set.each((index: number, members: SVG.Element[]) => {
			members[index].remove();
		});
		this.set.clear();
		delete this.set;

	},
	stop: function (e: MouseEvent) {
		if (this.el.type.indexOf('poly') > -1) {
			// smooth polyline when stop draw
			var arr = this.el.array().valueOf();
			arr = smooth(arr)
			this.el.plot(arr);
		}

		if (e) {
			this.update(e);
		}

		// Plugin may want to clean something
		if (this.clean) { this.clean(); }

		// Unbind from all events
		window.SVG.off(window, 'mousemove.draw');
		this.parent.off('click.draw');

		// remove Refernce to PaintHandler
		this.el.forget('_paintHandler');

		// overwrite draw-function since we never need it again for this element
		this.el.draw = function () {
		};

		// Fire the `drawstop`-event
		this.el.fire('drawstop');

	}
})