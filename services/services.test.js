"use strict";

const axios = require("axios");
const { getRepositoriesByUser } = require("./index");

jest.mock("axios");

describe("getRepositoriesByUser", () => {
  it("should return repositories for a given user", async () => {
    const mockData = [
      { name: "repo1", stargazers_count: 100 },
      { name: "repo2", stargazers_count: 200 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getRepositoriesByUser("exampleUser");

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.github.com/users/exampleUser/repos?sort=stars&per_page=10"
    );

    expect(result).toEqual(mockData);
  });

  it("should handle errors and throw an exception", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    try {
      await getRepositoriesByUser("exampleUser");
    } catch (error) {
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.github.com/users/exampleUser/repos?sort=stars&per_page=10"
      );

      expect(error.message).toBe(errorMessage);
    }
  });
});
