import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/http-helper";

import { ImpedimentRepository } from "../../infra/repositories/impediment.repository";

export class UpdateProjectController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    console.log("lógica para atualizar um projeto acessando o repositório");
    try {
      const { uid } = req.params;

      const repository = new ImpedimentRepository();

      const project = await repository.editImpediment({ uid, ...req.body });

      if (!project) return notFound(res);

      const cache = new CacheRepository();
      await cache.delete("projects");
      await cache.delete(`project:${uid}`);

      return ok(res, project);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
