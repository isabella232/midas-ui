export const getAPIURL = () => {
    return window.REACT_APP_API_URL ?? 'http://localhost:8000'
}

export * from './requests'
