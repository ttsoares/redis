import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/http-helper";
import { Project } from "../../domain/models/project";
import { ProjectRepository } from "../../infra/repositories/project.repository";

export class DelOneProjectController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    console.log(
      "lógica para buscar um projeto por um identificador (uid) acessando o repositório"
    );
    try {
      const { uid } = req.params;

      // cria uma instância do repositorio que cuida do cache
      const cache = new CacheRepository();

      // se não encontrou no cache é buscado na base dados
      const repository = new ProjectRepository();

      const project = await repository.delByUid(uid);

      if (!project) return notFound(res);

      // apaga no redis para o dado ficar cacheado
      await cache.delete(`project:${project.uid}`);

      await cache.delete("projets")

      return ok(res, project);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
