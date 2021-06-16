export const getUrlParam = (param) => {
    const pathName = window.location.pathname
    const pathArray = pathName.split('/')
    let paramIndex = pathArray.indexOf(param)
    return pathArray[paramIndex + 1]
}
