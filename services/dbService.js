const { database } = require('../utilities')

function postTicket(userName, repositoryName) {
    return `${userName}/${repositoryName}`
}

module.exports = {
    postTicket
}
