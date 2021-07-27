export enum PenColors {
	Pink = "#ff0099",
	Yellow = '#f3f313'
}

export enum PenShapes {
	MousePaint = "polyline",
	Rectangle = 'rect',
	Circle = 'ellipse'
}

export enum StrokeWidths {
	Thin = 1,
	Normal = 2,
	Bold = 3
}

export const penColorList: PenColor[] = [
	{
		val: PenColors.Pink,
		name: "Pink",
	},
	{
		val: PenColors.Yellow,
		name: "Yellow",
	},
];

export const penShapeList: PenShape[] = [
	{ val: PenShapes.MousePaint, name: "Mouse paint" },
	{ val: PenShapes.Rectangle, name: "Rectangle" },
	{ val: PenShapes.Circle, name: "Circle" },
];

export const StrokeWidthList: StrokeWidth[] = [
	{
		val: StrokeWidths.Thin,
		name: '细'
	},
	{
		val: StrokeWidths.Normal,
		name: '普通'
	},
	{
		val: StrokeWidths.Bold,
		name: '粗'
	},
]

export const ScaleTimesList: ScaleItem[] = [
	{
		name: '25%',
		value: 0.25
	},
	{
		name: '50%',
		value: 0.5
	},
	{
		name: '100%',
		value: 1
	},
	{
		name: '200%',
		value: 2
	}
]