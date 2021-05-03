const app = require('../src/app');
const supertest = require("supertest");
const request = supertest(app);

const mainUser = {
    name: "Gustavo",
    email: "email@email.com",
    password: '123'
}

beforeAll(() => {
    return request
        .post('/user')
        .send(mainUser)
        .then(res => {})
        .catch(err => console.log(err));
});

afterAll(() => {
    return request
        .delete(`/user/${mainUser.email}`)
        .then(res => {})
        .catch(err => console.log(err));
});

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

    test("Deve impedir um usuário se cadastre com os dados vazios", () => {
        const user = { name: "", email: "", password: "" };

        return request
            .post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
            }).catch(err => {
                fail(err);
            });
    });

    test("Deve impedir que um usuário se cadastre com um e-mail repetido", () => {
        const time = Date.now();
        const email = `${time}@teste.com`;
        const user = { name: "Victor", email, password: "123" };

        return request
            .post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email);

                return request
                    .post('/user')
                    .send(user)
                    .then(res => {

                        expect(res.statusCode).toEqual(400);
                        expect(res.body.error).toEqual("E-mail já cadastrado.");

                    })
                    .catch(err => fail(err));

            }).catch(err => {
                fail(err);
            });
    });
});

describe("Autenticação", () => {
    test("Deve me retornar um token quando efetuar login", () => {
        return request
            .post('/auth')
            .send({ email: mainUser.email, password: mainUser.password })
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.token).toBeDefined();
            })
            .catch(err => {
                fail(err)
            });
    });
});