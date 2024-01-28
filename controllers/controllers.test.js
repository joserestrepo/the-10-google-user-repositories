"use strict";

const { getRepositoriesByUserController } = require("./index");
const { getRepositoriesByUser } = require("../services");

jest.mock("../services", () => ({
  getRepositoriesByUser: jest.fn(),
}));

let mockResponse;

beforeEach(() => {
  console.error = jest.fn();

  mockResponse = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };
});

describe("getRepositoriesByUserController", () => {
  it("should return repositories with name and stargazersCount", async () => {
    const mockRepositories = [
      { name: "repo1", stargazers_count: 100 },
      { name: "repo2", stargazers_count: 200 },
    ];
    getRepositoriesByUser.mockResolvedValueOnce(mockRepositories);

    await getRepositoriesByUserController(null, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith([
      { name: "repo1", stargazersCount: 100 },
      { name: "repo2", stargazersCount: 200 },
    ]);

    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it("should handle errors and respond with 500 status", async () => {
    getRepositoriesByUser.mockRejectedValueOnce(new Error("Test error"));

    await getRepositoriesByUserController(null, mockResponse).catch((error) => {
      console.error("error when making the request:", error.message);

      expect(mockResponse.status).toHaveBeenCalledWith(500);

      expect(mockResponse.send).not.toHaveBeenCalled();
    });
  });
});
