class VerifyResetCodeDTO {
    constructor({email, code}) {
        this.email = email;
        this.code = code;
    }
}

module.exports = VerifyResetCodeDTO;