export const GET_COLLECTION_MOMENTS = `
    import NonFungibleToken from 0xNFT
    import AllDay from 0xAllDay

    pub fun main(address: Address, momentIDs: [UInt64]): [AnyStruct] {
        let account = getAccount(address)
    
        let collectionRef = account.getCapability(AllDay.CollectionPublicPath)
            .borrow<&{AllDay.MomentNFTCollectionPublic}>()
            ?? panic("Could not borrow capability from public collection")

        var moments: [AnyStruct] = []
        
        for id in momentIDs {
            moments.append(collectionRef.borrowMomentNFT(id: id))
        }
        return moments
    
    }
`;
