import { GET_COLLECTION_IDS } from "../scripts/get-collection-ids.script";
import { GET_COLLECTION_MOMENTS } from '../scripts/get-collection-moments.script';
import { query } from "@onflow/fcl";

export const getCollectionIDs = async (address: string): Promise<any> => {
    return await query({
        cadence: GET_COLLECTION_IDS,
        args: (arg, t) => [arg(address, t.Address)]
    }).catch(() => console.error("Error occured getting collection IDs"));
    
}

export const getCollectionMoments = async (address: string, momentIDs: string[]): Promise<any> => {
    return await query({
        cadence: GET_COLLECTION_MOMENTS,
        args: (arg, t) => [arg(address, t.Address), arg(momentIDs, t.Array(t.UInt64))]
    }).catch(() => console.error("Error occured getting collection moments"));

}