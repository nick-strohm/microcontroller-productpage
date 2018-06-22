class InterpretedFile {
    private included: InterpretedFile[];
    
    constructor(name: String, content: String) {
        this.included = [];

        this.interpret();
    }

    private interpret() {
        
    }

    private interpretCompilerDirectives() {
        
    }
}

class Interpreter {
    private files: InterpretedFile[];

    constructor() {
        this.files = [];
    }

    /**
     * interpretFile
     */
    public interpretFile(name: String, content: String) {
        this.files.push(new InterpretedFile(name, content));
    }
}