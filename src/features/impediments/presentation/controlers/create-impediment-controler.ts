import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError} from "../../../../core/presentation/helpers/http-helper";

import { ImpedimentRepository} from "../../infra/repositories/impediment.repository"

export class CreateImpedimentController implements Controller {

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new ImpedimentRepository();
      const cache = new CacheRepository();

      // salvar o impediment na base dados
      const impediment = await repository.create(req.body);

      // salvar o impediment no cache (redis)
      const result = await cache.set(`impediment:${impediment.uid}`, impediment);

      if (!result) console.log("NÃO SALVOU NO CACHE");

      // limpa a lista de registros do redis, pois o cache está desatualizado neste momento
      await cache.delete("impediments");

      return ok(res, impediment);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
