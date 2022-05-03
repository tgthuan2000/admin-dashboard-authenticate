export const LOGIN = `
    *[_type == "user" && username == $username && password == $password && role._id != '${process.env.CUSTOMER_ROLE}'] 
    { 
        _id,
        fullName,
        email,
        phone,
        address,
        username,
        role-> {
            _id,
            name
        }
    }
`

export const RE_LOGIN = `
    *[_type == "user" && _id == $_id && role._id != '${process.env.CUSTOMER_ROLE}'] 
    { 
        _id, 
        fullName, 
        email, 
        phone, 
        address, 
        username,
        role-> {
            _id,
            name
        } 
    }
`
