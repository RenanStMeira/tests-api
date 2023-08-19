import { jest } from '@jest/globals'
import Editora from "../../models/editora";

describe('Testando o modelo editora', () => {
    const objetoEditora = {
        nome: 'CDC',
        cidade: 'Sao Paulo',
        email: 'email@test.com'
    }

    it('Deve instanciar uma nova editora', () => {
        const editora = new Editora(objetoEditora);

        //Comparar objetos
        expect(editora).toEqual(
            expect.objectContaining(objetoEditora),
        );
    });

    // SKIPE pular test
    it.skipe('Deve salvar editora no banco de BD', () => {
        const editora = new Editora(objetoEditora);

        editora.salvar().then((dados) => {
            expect(dados.nome).toBe('CDC');
        });
    });

    it.skipe('Deve salvar no BD usanto async/await', async () => {
        const editora = new Editora(objetoEditora);

        const dados = await editora.salvar();

        const retornado = await Editora.pegarPeloId(dados.id);

        expect(retornado).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            }),
        );
    });

// Ultilizando Mock para realizar test sem usar o BD
    it('Deve fazer uma chamada simulada ao BD', () => {
        const editora = new Editora(objetoEditora);

        //Criando um mock
        editora.salvar = jest.fn().mockReturnValue({
            id: 10,
            nome: 'CDC',
            cidade: 'Sao Paulo',
            email: 'email@test.com',
            created_at: '2022-10-10',
            updated_at: '2022-10-10',
        });

        const retorno = editora.salvar();

        expect(retorno).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            }),
        );
    });
});