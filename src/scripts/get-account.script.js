export const GET_ACCOUNT = `
    import NonFungibleToken from 0xNFT
    import AllDay from 0xAllDay

    pub fun main(): Int {
        let account = getAccount(0xAccount)
    
        let collectionRef = account.getCapability(AllDay.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not borrow capability from public collection")
        
        return collectionRef.getIDs().length

`;
