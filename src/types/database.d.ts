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

// {"adult":false,"backdrop_path":"/tNi2aJPdCKfielGYzIi3IKxStz9.jpg","id":502,"name":"Sesame Street","original_language":"en","original_name":"Sesame Street","overview":"On a special inner city street, the inhabitants—human and muppet—teach preschoolers basic educational and social concepts using comedy, cartoons, games, and songs.","poster_path":"/14k9BfZ2p4rQBMeJ5crKTfUZVwD.jpg","media_type":"tv","genre_ids":[10762,35],"popularity":184.65,"first_air_date":"1969-11-10","vote_average":7.044,"vote_count":216,"origin_country":["US"]}
export type TMDBSeries = {
    adult: boolean
    backdrop_path: string
    id: number
    name: string
    original_language: string
    original_name: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    first_air_date: string
    vote_average: number
    vote_count: number
    origin_country: string[]

}