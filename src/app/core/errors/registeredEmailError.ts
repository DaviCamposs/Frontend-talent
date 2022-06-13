export class RegisteredEmailError extends Error {
    constructor() {
        super('E-mail is already registered')
        this.name = 'RegisteredEmailError'
    }
}