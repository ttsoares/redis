import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/http-helper";
import { Impediment } from "../../domain/models/impediment";
import { ImpedimentRepository } from "../../infra/repositories/impediment.repository";

export class GetAllImpedimentsController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    console.log("lógica para buscar todos os impedimentos acessando o repositório");
    try {
      // cria uma instância do repositório do cache
      const cache = new CacheRepository();

      // busca os registro no cache
      const impedimentsCache = await cache.get("impediments");

      // verifica se tem registro, caso verdadeiro, retorna do cache
      if (impedimentsCache) {
        return ok(
          res,
          (impedimentsCache as Impediment[]).map((imped) =>
            Object.assign({}, imped, { _cache: true })
          )
        );
      }

      const repository = new ImpedimentRepository();

      const impediments = await repository.getAll();

      if (impediments.length === 0) return notFound(res);

      // salva no redis para servir de cache
      await cache.set("impediments", impediments);

      return ok(res, impediments);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
