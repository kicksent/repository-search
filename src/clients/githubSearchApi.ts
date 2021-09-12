import axios from 'axios'

export const githubApiClient = {
    async getSearchResults(input: string, starSort: boolean, language: string) {
        if(!input) return //You must always include at least one search term when searching source code
        var url = "https://api.github.com/search/repositories"
            url  += `?q=${input}`
            if (starSort) {
                url += `&sort=stars&order=desc`
        }
        if (language) {
            url += `+language:${language}`
        }
        try {
            const response = await axios.get(url)
            return response.data 
        } catch (error : any) {
            console.error(error)
            let errorMessage = "Error getting results from github API"
            if (error?.response?.status) {
                errorMessage = `HTTP status (${error.response.status}) - ${errorMessage}`
            }
            throw new Error(errorMessage)
            }
        }
            
}