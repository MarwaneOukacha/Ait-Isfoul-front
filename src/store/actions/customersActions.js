import * as TYPE from '../types/userTypes'; // Adjust path if needed

export function getCustomersPage(infos) {
    return {
        types: [TYPE.USER_SEARCH, TYPE.USER_SEARCH_SUCCESS, TYPE.USER_SEARCH_FAIL],
        promise: (client) => client.get("customers/search", {
            params: {
                page: infos.page,
                size: infos.size,
                sort: infos.sort,
                ...(infos.keyword ? { prenom: infos.keyword } : {}),
                ...(infos.roleName ? { nom: infos.roleName } : {}),
                ...(infos.type ? { numTele: infos.type } : {}),
                ...(infos.status ? { statut: infos.status } : {}),
            }
        })
    };
}

export function getCustomerDetails(id) {
    return {
        types: [TYPE.USER_DETAILS, TYPE.USER_DETAILS_SUCCESS, TYPE.USER_DETAILS_FAIL],
        promise: (client) => client.get(`customers/details/${id}`)
    };
}


export function addCustomer(userInfos) {
    return {
        types: [TYPE.ADD_USER, TYPE.ADD_USER_SUCCESS, TYPE.ADD_USER_FAIL],
        promise: (client) => client.post("customers/add", {
            firstName: userInfos.firstName,
            lastName: userInfos.lastName,
            password: userInfos.password,
            phoneNumber: userInfos.phoneNumber,
            email: userInfos.email,
            type: userInfos.type,
            iden: userInfos.iden
        })
    };
}

export function editCustomer(userInfos) {
    return {
        types: [TYPE.EDIT_USER, TYPE.EDIT_USER_SUCCESS, TYPE.EDIT_USER_FAIL],
        promise: (client) => client.put("customers/update", {
            id: userInfos.id,
            phoneNumber: userInfos.phoneNumber,
            firstName: userInfos.firstName,
            lastName: userInfos.lastName,
            email: userInfos.email,
            status: userInfos.status,
            iden: userInfos.iden,
            isActive: userInfos.isActive
        })
    };
}


