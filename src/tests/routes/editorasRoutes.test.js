import { describe } from "@jest/globals";
import app from "../../app";
import request from 'supertest';

// Configuraçoes dos Hooks
let server;
beforeEach(() => {
    const port = 3030;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('Get em /editoras', () => {
    it('Deve retornar uma lista de editoras', async () =>{
       const resposta = await request(app)
        .get('/editoras')
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);

        expect(resposta.body[0].email).toEqual('e@e.com')
    });
});

// Criando variavel para guardar o id
let idResposta;
describe('POST em /editoras', () => {
    it('Deve adicionar uma nova editora', async () => {
        const resposta = await request(app)
        .post('/editoras')
        .send({
            nome: "CDC",
            cidade: "Sao Paulo",
            email: "s@s.com"
        })
        .expect(201);

        idResposta = resposta.body.content.id; //salvando o id do teste de post
    });

    it('Deve nao adicionar nada ao passar o body vazio', async () => {
        await request(app)
        .post('/editoras')
        .send({})
        .expect(400);
    });
});

describe('GET em /editoras', () => {
    it('Deve retornar o recurso selecionado por id', async () =>{
        await request(app)
        .get(`/editoras/ ${idResposta}`)
        .expect(200);
    });
});

describe('PUT em /editoras/id', () => {
    it('Deve alterar o campo nome', async () =>{
        await request(app)
        .put(`/editoras/ ${idResposta}`)
        .send({nome: 'Casa do Codigo'})
        .expect(204);
    });
});

describe('DELETE em /editoras/id', () => {
    it('Deletar o recurso aicionado', async () =>{
        await request(app)
        .delete(`/editoras/ ${idResposta}`)
        .expect(200);
    });
});

