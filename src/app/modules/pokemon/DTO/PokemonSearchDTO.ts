export interface PokemonSearchDTO {
    species: {
        name: string
    }
    sprites: {
        front_default: string
    }
    stats: StatItem[]
}

export interface StatItem {
    base_stat: number
    stat : {
        name: string
    }
}