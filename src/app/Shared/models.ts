export interface IMoviesSearchResponse {
    Search: IMoviesList,
    totalResults: string,
    Response: string
}

export interface IMoviesList {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

export interface IMovieType {
    value: string,
    viewValue: string
}
