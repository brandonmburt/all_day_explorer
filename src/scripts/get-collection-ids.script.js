export const GET_COLLECTION_IDS = `
    import NonFungibleToken from 0xNFT
    import AllDay from 0xAllDay

    pub fun main(address: Address): [UInt64] {
        let account = getAccount(address)

        let collectionRef = account.getCapability(AllDay.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not borrow capability from public collection")
        
        return collectionRef.getIDs()
    }
`;
