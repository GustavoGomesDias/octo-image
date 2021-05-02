const app = require('../src/app');
const supertest = require("supertest");
const request = supertest(app);

describe("Cadastro de usuário", () => {
    test("Deve cadastrar um usuáriio com sucesso", () => {
        const time = Date.now();
        const email = `${time}@teste.com`;
        const user = {name: "Victor", email, password: "123"};

        return request
            .post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email);
            }).catch(err => {
                fail(err);
            });
    });
});