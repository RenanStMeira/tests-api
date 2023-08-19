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

    it('Deve salvar no BD usanto async/await', async () => {
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
});