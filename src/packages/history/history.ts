class Command {
	constructor() { }

	execute() {
		throw new Error('未重写execute方法！');     // 继承时如果没有覆盖此方法，会报错。通过这种方式，保证继承的子命令类重写此方法。
	}

	undo() {
		console.error('未重写undo方法！');        // 同上
	}
}