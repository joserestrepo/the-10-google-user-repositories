'user strict'

const { getRepositoriesByUser } = require("./../services");

async function getRepositoriesByUserController(req, res) {
  try {
    const username = "google";
    const repositories = await getRepositoriesByUser(username);
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Top 10 Repositorios de ${username} en GitHub</title>
      </head>
      <body>
        <h1>Top 10 Repositorios de ${username} en GitHub</h1>
        <ul>
          ${repositories
            .map(
              (repositori) =>
                `<li>${repositori.name} - ${repositori.stargazers_count} estrellas</li>`
            )
            .join("")}
        </ul>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('error when making the request:', error.message);
    res.status(500).send('Internal error');
  }
}

module.exports = {
    getRepositoriesByUserController
}