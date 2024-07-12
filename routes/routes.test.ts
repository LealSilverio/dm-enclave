import app from "../app";
import supertest from "supertest";
import { Server } from "node:http";
import connect from "../db/connect";
import mongoose from "mongoose";

const request = supertest(app);

test("test get root", (done) => {
  request.get("/").then((res) => {
    expect(res.status).toBe(200);
  });
  done();
});

//the below code is to perform setup and teardown for the testing process. If we need to have multiple test files, we should modularize this code so that it can be reused in other test files.
let server: Server;
beforeAll((done) => {
  connect().catch((e) => console.log(e));
  server = app.listen(0, () => {
    console.log(`test server listening on ${JSON.stringify(server.address())}`);
  });
  done();
});
afterAll((done) => {
  mongoose.connection.close();
  server.close();
  done();
});
