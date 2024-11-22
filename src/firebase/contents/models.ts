import { WhereFilterOp } from "firebase/firestore"
import { CollectionsType } from "../models"

type SearchColumnsType = {
    [key: string]: any
    condition: WhereFilterOp
}

type OrderByColumnsType = {
    field: string
    direction: 'asc' | 'desc'
}

export type ArrayQueryDocumentType = Array<{ id: string; [key: string]: any}> | { id: string; [key: string]: any}

export type GetType = {
    collection: CollectionsType
    filter: SearchColumnsType[]
    orderBy?: OrderByColumnsType[]
    oneResult?: boolean
}

export type InsertType = {
    collection: CollectionsType
    fields: any
}

export type InsertArrayType = {
    collection: CollectionsType
    field: string
    value: any
    reference: string
}

export type UpdateType = {
    collection: CollectionsType
    fields: any
    reference: string
}