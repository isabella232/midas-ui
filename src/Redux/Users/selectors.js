import { convertRolesLongToRolesMap } from '../../Utilities/bitwise'

export const selectUserById = (state, id) => {
    const user = state.users[id]
    if (!user) return {}

    const assignedRoles = convertRolesLongToRolesMap(user.roles)

    return { ...user, roles: assignedRoles }
}