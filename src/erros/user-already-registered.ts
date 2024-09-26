export class UserAlreadyRegistered extends Error {
    public readonly name = 'User Already Registered'

    constructor() {
        super('User with same email has already been registered.')
    }
}