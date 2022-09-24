class HttpError extends Error {
    code: number;
    constructor(message: string, errorCode: any) {
        super(message);
        this.code = errorCode;
    }
}

module.exports = HttpError;