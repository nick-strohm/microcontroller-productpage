class InterpretedFile {
    constructor(name, content) {
        this.included = [];
        this.interpret();
    }
    interpret() {
    }
    interpretCompilerDirectives() {
    }
}
class Interpreter {
    constructor() {
        this.files = [];
    }
    interpretFile(name, content) {
        this.files.push(new InterpretedFile(name, content));
    }
}
//# sourceMappingURL=Interpreter.js.map