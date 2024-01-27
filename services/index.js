'user strict'

const axios = require('axios')

async function getRepositoriesByUser(username){
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=stars&per_page=10`;
    const response = await axios.get(apiUrl);
    return response.data;
}

module.exports = {
    getRepositoriesByUser
}