export class EmptyPost extends Error {
    public readonly name = 'Empty post'

    constructor() {
        super('The content of the post is empty so it cannot be posted.')
    }
}