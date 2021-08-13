import p5 from './p5'
// import RecordRtc from 'recordrtc'

type Point = {
	x: number,
	y: number,
	timestamp?: number
}


class BoardSketch extends p5 {
	lineList: Point[][] = []
	currentLine: Point[] = []
	// audioRecorder!: RecordRtc
	mic!: p5.AudioIn
	recorder!: p5.SoundRecorder
	soundFile!: p5.SoundFile

	constructor(
		node: HTMLElement,
		public audio: HTMLAudioElement,
		public size = { width: 400, height: 600 }
	) {
		// Unfortunately you still need to pass the function here,
		// otherwise P5 will think that you want the global style
		super(() => { }, node)
	}

	setup() {
		this.mic = new p5.AudioIn()
		this.soundFile = new p5.SoundFile()
		this.recorder = new p5.SoundRecorder()
		this.recorder.setInput(this.mic)
		this.createCanvas(this.size.width, this.size.height)
		this.background('gray')
		console.log('p5: steuped');
	}
	draw() {
		const { mouseIsPressed, mouseX, mouseY, pmouseX, pmouseY } = this
		if (mouseIsPressed) {
			this.stroke(255);
			this.line(mouseX, mouseY, pmouseX, pmouseY);
			if (this.currentLine.length === 0) {
				this.currentLine.push({ x: mouseX, y: mouseY, timestamp: this.audio.currentTime })
			}
			this.currentLine.push({ x: pmouseX, y: pmouseY, timestamp: this.audio.currentTime })
		}
	}
	mousePressed() {

	}
	mouseReleased() {
		this.lineList.push(this.currentLine)
		this.currentLine = []
		console.log(this.lineList);
		// console.log('released');
	}
	keyPressed() {
		switch (this.key) {
			case "1":
				console.log("start recording.");
				this.mic.start(() => {
					if (this.mic.mediaStream) {
						this.recorder.record(this.soundFile)
						this.audio.srcObject = this.mic.mediaStream?.mediaStream
					}
					// if (this.mic.mediaStream) {
					// 	this.audio.srcObject = this.mic.mediaStream.mediaStream
					// 	this.audioRecorder = new RecordRtc(this.mic.mediaStream.mediaStream, {
					// 		type: 'audio'
					// 	})
					// 	this.audioRecorder.startRecording()
					// }
				})
				break;
			case "2":
				console.log("stop recording");
				this.mic.stop()
				this.recorder.stop()
				setTimeout(() => {
					alert(
						`audo:${this.audio.currentTime}--------duration:${(this.soundFile.buffer as AudioBuffer).duration}`
					);
				}, 300)
				// this.audioRecorder.stopRecording(() => {
				// 	this.mic.stop()
				// 	const audioSrc = URL.createObjectURL(this.audioRecorder.getBlob())
				// 	console.log(audioSrc, this.audioRecorder.getBlob());
				// })
				break
		}
	}
}


export function setup(node: HTMLElement | undefined, audio: HTMLAudioElement | undefined): BoardSketch | undefined {
	return !node ? undefined : new BoardSketch(node, audio as HTMLAudioElement)
}