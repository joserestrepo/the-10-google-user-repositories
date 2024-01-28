"use strict";

const supertest = require("supertest");
const express = require("express");
const userRoutes = require("./index");

jest.mock("../controllers", () => ({
  getRepositoriesByUserController: jest.fn((req, res) =>
    res.send("Mocked response")
  ),
}));

describe("userRoutes", () => {
  const app = express();
  app.use("/", userRoutes);

  it("should call getRepositoriesByUserController on GET /", async () => {
    const response = await supertest(app).get("/");

    expect(
      require("../controllers").getRepositoriesByUserController
    ).toHaveBeenCalled();

    expect(response.text).toBe("Mocked response");
  });
});
