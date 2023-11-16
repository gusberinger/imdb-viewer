export type SeriesDB = {
    tconst: string
    titleType: string
    primaryTitle: string
    originalTitle: string
    isAdult: '0' | '1'
    startYear: number
    endYear: number | null
    runtimeMinutes: number
    genres: string[]
    episodes: {
        tconst: string
        parentTconst: string
        seasonNumber: number
        episodeNumber: number
        averageRating: number
        numVotes: number
        titleType: string
        primaryTitle: string
        originalTitle: string
        isAdult: '0' | '1'
        startYear: number
        endYear: number | null
        runtimeMinutes: number
        genres: string[]
    }[]
}
