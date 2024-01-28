"user strict";

const { getRepositoriesByUser } = require("./../services");

async function getRepositoriesByUserController(req, res) {
  try {
    const username = "google";
    const repositories = await getRepositoriesByUser(username);
    res.send(
      repositories.map((repository) => ({
        name: repository.name,
        stargazersCount: repository.stargazers_count,
      }))
    );
  } catch (error) {
    console.error("error when making the request:", error.message);
    res.status(500).send("Internal error");
  }
}

module.exports = {
  getRepositoriesByUserController,
};
