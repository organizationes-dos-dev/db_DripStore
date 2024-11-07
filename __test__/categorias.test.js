import * as categoriasController from "../Controllers/categoriasController";
import * as categoriasRepository from "../Repository/categoriasRepository";

jest.mock("../Repository/categoriasRepository");

describe("Testando a funcionalidade de categorias", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Deve criar uma categoria", async () => {
    let body = { nome: "headPhone", imagemPath: "HeadPhone.png" };

    const req = body;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    categoriasRepository.store.mockResolvedValue(body);
    await categoriasController.store(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Categoria cadastrada com sucesso");
  });

  test("Deve retornar todos as categorias", async () => {
    let categorias = [
      {
        nome: "Camisetas",
        imagemPath: "tshirt-_1_.png",
      },
    ];

    categoriasRepository.getAll.mockResolvedValue(categorias);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await categoriasController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(categorias);
  });

  test("Deve atualizar uma categoria", async () => {
    let body = { nome: "Camisetas", imagemPath: "tshirt-_1_.png" };

    categoriasRepository.update.mockResolvedValue(body);

    const req = { params: { id: 1 }, body };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await categoriasController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Categoria atualizada com sucesso");
  });

  test("Deve deletar uma categoria", async () => {
    let categorias = { id: 1, nome: "Camisetas" };

    categoriasRepository.deletar.mockResolvedValue(categorias);

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await categoriasController.deletar(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Categoria deletada com sucesso");
  });
});
