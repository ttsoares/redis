import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/http-helper";

import { ImpedimentRepository } from "../../infra/repositories/impediment.repository";

export class UpdateImpedimentController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    console.log("lógica para atualizar um impedimento acessando o repositório");
    try {
      const { uid } = req.params;

      const repository = new ImpedimentRepository();

      const impediment = await repository.editImpediment({ uid, ...req.body });

      console.log(impediment)
      console.log("-------------------------")

      if (!impediment) return notFound(res);

      // const cache = new CacheRepository();
      // await cache.delete("impediments");
      // await cache.delete(`impediment:${uid}`);

      return ok(res, impediment);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
