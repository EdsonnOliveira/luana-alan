import { collection } from "firebase/firestore";
import { logEvent } from "firebase/analytics";

import { db, firebaseAnalytics } from ".";

import { CollectionsType, EventProps } from "./models";
import { SearchColumnsType } from "./types";

export const getCollection = (name: CollectionsType) => ( collection(db, name) )

export function generateFields(fields: Omit<SearchColumnsType, 'condition'>[]): Omit<SearchColumnsType, 'condition'> {
    const newData: Omit<SearchColumnsType, 'condition'> = {}
    
    fields
    .filter(item => !item.hideArray)
    .forEach((item) => {
        newData[item.name] = item.value
    })

    const result: any = {};

    Object.keys(newData).forEach(key => {
        const keys = key.split('.');
        keys.reduce((acc, part, index) => {
            if (index === keys.length - 1) {
                acc[part] = newData[key];
            } else {
                acc[part] = acc[part] || {};
            }
            return acc[part];
        }, result);
    });

    return result;
}

export function newEvent({ name, keys }: EventProps) {
    logEvent(firebaseAnalytics, name, keys);
}