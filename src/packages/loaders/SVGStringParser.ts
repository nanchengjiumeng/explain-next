type SVGString = string // fetch得到的svg文件的字符串
type AnimeItem = {
	id: string, // dom的id
	tagName: string, // 元素标签名
	startTime: number,
	duration: number,
	strokeLength: number, // 笔记长度
}

const ANIME_STROKE_LENGTH: string = 'anime-stroke-length' // svg文件字符串中<path>的属性key
const ANIME_START_TIME: string = 'anime-start-time' // svg文件字符串中<path>的属性key
const ANIME_DURATION: string = 'anime-duration' // svg文件字符串中<path>的属性key

export class SVGStringParser {
	public originalSvgString: string
	public animeList: AnimeItem[] = []
	public svgString: SVGString = ""
	public width: number = 0 // svg的宽高
	public height: number = 0 // svg的宽高
	public parsed: boolean = false
	public loaded: boolean = false
	constructor(
		originalSvgString: string
	) {
		this.originalSvgString = originalSvgString
		this.parse()
	}

	/**
		* 解析svg文件，并转换成需要的结构
		* @param svgString svg文件字符串
		*/
	parse() {
		if (!/<svg/.test(this.originalSvgString)) {
			throw new EvalError('cant parse non svg file.')
		}
		if (this.parsed || this.loaded) {
			throw new EvalError('parse repeatly or not load svg source.')
		}

		const floatString = `[\\d|.]+`
		const sdReg = new RegExp(`stroke-dashoffset="(${floatString})"`)
		const pathReg = new RegExp(`<[^>]+/>`, 'g')

		// 移除svgString中的width属性和height属性
		this.svgString = this.originalSvgString.replace(new RegExp(`width="(${floatString}) "`), "")
		this.svgString = this.originalSvgString.replace(new RegExp(`height="(${floatString}) "`), "")

		// 接卸svg的宽高参数
		const ele1: HTMLDivElement = document.createElement('div')
		ele1.innerHTML = this.originalSvgString
		const ele1SvgEle = ele1.querySelector('svg')
		if (!ele1SvgEle) {
			throw new EvalError('cannot find <svg> in current svg string.')
		}
		const viewBox: SVGRect = ele1SvgEle.viewBox.baseVal
		this.width = viewBox.width
		this.height = viewBox.height

		// 将svg字符串解析出动画播放所需的结构
		this.svgString = this.svgString.replace(pathReg, (pathString) => {
			const id = pathString.match(/id="([^"]+)"/)
			const tagName = pathString.match(/^<([^ ]+) /)
			const animeStartTime = pathString.match(new RegExp(`${ANIME_START_TIME}="(${floatString})"[^>]*`));
			const animeDuration = pathString.match(new RegExp(`${ANIME_DURATION}="(${floatString})"[^>]*`));
			const animeStrokeLength = pathString.match(new RegExp(`${ANIME_STROKE_LENGTH}="(${floatString})"[^>]*`));
			const item: AnimeItem = {
				id: id ? id[1] : "",
				tagName: tagName ? tagName[1] : "",
				startTime: animeStartTime ? Number(animeStartTime[1]) : 0,
				duration: animeDuration ? Number(animeDuration[1]) : 0,
				strokeLength: animeStrokeLength ? Number(animeStrokeLength[1]) : 0
			}
			this.animeList.push(item)
			// 当没有stroke字段时,补充stroke字段
			if (!pathString.match(sdReg)) {
				pathString = pathString.replace(' ', ` stroke-dasharray="${item.strokeLength}" stroke-dashoffset="${item.strokeLength}" `)
			}
			return pathString.replace(sdReg, () => `stroke-dashoffset="${item.strokeLength}"`)
		})
		this.parsed = true
	}
}


