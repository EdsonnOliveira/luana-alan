import { WhereFilterOp } from "firebase/firestore"

export type SearchColumnsType = {
    [key: string]: string
    condition: WhereFilterOp
}