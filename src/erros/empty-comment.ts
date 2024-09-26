export class EmptyComment extends Error {
    public readonly name = 'Empty comment'

    constructor() {
        super('The content of the comment is empty so it cannot be registered.')
    }
}