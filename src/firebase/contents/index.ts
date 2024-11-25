import {
    query,
    collection as Collection,
    QuerySnapshot,
    getDocs,
    QueryDocumentSnapshot,
    DocumentData,
    Query,
    limit,
    updateDoc,
    doc,
    addDoc,
    where,
    orderBy as order,
} from "firebase/firestore"

import { generateFields, getCollection } from "../constants"
import { db } from ".."

import { ArrayQueryDocumentType, GetType, InsertType, UpdateType } from "./models"

const get = async ({ collection, filter, orderBy, oneResult }: GetType) => {
    return new Promise(async (resolve, reject) => {
        let q: Query = query(Collection(db, collection))

        if (filter) {
            filter.forEach((f) => {
                q = query(q, where(Object.keys(f)[0], f.condition, Object.values(f)[0]));
            })
        }
        
        if (orderBy) {
            orderBy.forEach((f) => {
                q = query(q, order(f.field, f.direction))
            })
        }

        if (oneResult)
            q = query(q, limit(1))

        try {
            const data: QuerySnapshot = await getDocs(q)
            let array: ArrayQueryDocumentType  = data.docs.map((item: QueryDocumentSnapshot<DocumentData, DocumentData>) => ({ id: item.id, ...item.data() }))

            if (oneResult)
                array = array[0]

            resolve(array)
        } catch(e) {
            reject(e)
        }
    })
}

const insert = async ({ collection, fields }: InsertType) => {
    return new Promise(async (resolve, reject) => {
        const collectionDoc = getCollection(collection)

        try {
            const data = await addDoc(collectionDoc, generateFields(fields))
            resolve(data.id)
        } catch (e) {
            reject(e)
        }
    })
}

const update = async ({ collection, fields, reference }: UpdateType) => {
    return new Promise(async (resolve, reject) => {
        try {
            const docDb = doc(db, collection, reference)
            await updateDoc(docDb, generateFields(fields))

            resolve(true)
        } catch(e) {
            reject(e)
        }
    })
}

const dataBase = {
    get,
    insert,
    update,
}

export default dataBase