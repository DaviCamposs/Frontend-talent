export class PokemonNotFoundError extends Error {
    constructor() {
        super('Pokemon was not found')
        this.name = 'PokemonNotFoundError'
    }
}