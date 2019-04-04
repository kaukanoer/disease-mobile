const dirMap = {
    //greater-than
    gt: {asc: 1, desc: -1},
    //lest-than
    lt: { asc: -1, desc: 1}
}

const doShort = (A, B, property, direction='ASC') => {
    const A = A [property]
    const B = B [property]

    if (a < b){
        return dirMap.lt[direction.toLowerCase]
    }
    if (a > b){
        return dirMap.gt[direction.toLowerCase]
    }
    return 0
}

const creatorSorter = ( ...args) => {
    if (typeof args[0] === 'string'){
        args = [
            {
                direction: args[1],
                property:args[0]
            }
        ]
    }
    return(A, B) => {
        let ret = 0

        args.some(sorter => {
            const { property, direction = 'ASC'} = sorter
            const value = doShort(A, B, property, direction)

            if (value === 0){
                // they are equal, continue to next sorter if any
                return false
            } else {
                 // they are different, stop at current sorter
                ret = value;
                return true;
            }
        })
        return ret
    }
}

export { createSorter }
