import { url } from "./Url";

export type Person = {
    birth_year: string
    eye_color: string
    films: url[]
    gender: string
    hair_color: string
    height: string
    homeworld: url
    mass: string
    name: string
    skin_color: string
    created: Date
    edited: Date
    species: url[]
    starships: url[]
    url: url
    vehicles: url[]
}