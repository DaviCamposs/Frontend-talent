export class WrongCredentialsError extends Error {
    constructor() {
        super('Verify your Credentials')
        this.name = 'WrongCredentialsError'
    }
}