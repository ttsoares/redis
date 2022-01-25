import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/http-helper";

import { Impediment } from "../../domain/models/impediment";
import { ImpedimentRepository } from "../../infra/repositories/impediment.repository";

export class DelOneImpedimentController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    console.log(
      "lógica para buscar um impedimento por um identificador (uid) acessando o repositório"
    );
    try {
      const { uid } = req.params;

      // cria uma instância do repositorio que cuida do cache
      const cache = new CacheRepository();

      // se não encontrou no cache é buscado na base dados
      const repository = new ImpedimentRepository();
      const impediment = await repository.delByUid(uid);

      if (!impediment) return notFound(res);

      // salva no redis para o dado ficar cacheado
      await cache.delete(`impediment:${impediment.uid}`);

      await cache.delete("impediments")

      return ok(res, impediment);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
