import { query } from "@onflow/fcl";

export const executeCadenceScript = async (script: string): Promise<any> => {
    return await query({
        cadence: script
    });
}
