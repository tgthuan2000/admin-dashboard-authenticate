export const LOGIN = `
    *[_type == "user" && username == $username && password == $password && role._ref != '${process.env.CUSTOMER_ROLE}'] 
    { 
        _id,
        _createdAt,
        _updatedAt,
        username,
        fullName,
        email,
        phone,
        address,
        image,
        role-> {
            _id,
            name
        }
    }
`

export const RE_LOGIN = `
    *[_type == "user" && _id == $_id && role._ref != '${process.env.CUSTOMER_ROLE}'] 
    { 
        _id,
        _createdAt,
        _updatedAt,
        username,
        fullName,
        email,
        phone,
        address,
        image,
        role-> {
            _id,
            name
        }
    }
`
