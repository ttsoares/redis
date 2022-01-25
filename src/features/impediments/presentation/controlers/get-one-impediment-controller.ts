import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/http-helper";

import { Impediment } from "../../domain/models/impediment";
import { ImpedimentRepository } from "../../infra/repositories/impediment.repository";

export class GetOneImpedimentController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    console.log(
      "lógica para buscar um impedimento por um identificador (uid) acessando o repositório"
    );
    try {
      const { uid } = req.params;

      // cria uma instância do repositorio que cuida do cache
      const cache = new CacheRepository();

      // recupera o registro no cache
      const impedimentCache: Impediment = await cache.get(`impediment:${uid}`);

      // verifica se encontrou e retorna caso verdadeiro
      if (impedimentCache) {
        return ok(res, Object.assign({}, impedimentCache, { _cache: true }));
      }

      // se não encontrou no cache é buscado na base dados
      const repository = new ImpedimentRepository();
      const impediment = await repository.getByUid(uid);

      if (!impediment) return notFound(res);

      // salva no redis para o dado ficar cacheado
      await cache.set(`impediment:${impediment.uid}`, impediment);

      return ok(res, impediment);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
