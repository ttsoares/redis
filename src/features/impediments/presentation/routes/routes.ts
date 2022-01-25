import { Router } from "express";
import { CreateImpedimentController } from "../controllers/create-impediment-controler";
import { GetAllImpedimentsController } from "../controllers/get-all-impediments-controller";
import { GetOneImpedimentController } from "../controllers/get-one-impediment-controller";
import { UpdateImpedimentController } from "../controllers/update-impediment-controller";
import { DelOneImpedimentController} from "../controllers/del-one-impediment-controller"

/**
 * Este arquivo tem a obrigação de definir as rotas dessa feature
 * No arquivo definimos a rota e chamamos os controllers responsaveis por cada ação.
 */
export default class ImpedimentRoutes {
  public init(): Router {
    const routes = Router();

    routes.post("/impediments", new CreateImpedimentController().handle);
    routes.put("/impediments/:uid", new UpdateImpedimentController().handle);
    routes.get("/impediments/:uid", new GetOneImpedimentController().handle);
    routes.get("/impediments", new GetAllImpedimentsController().handle);
    routes.delete("/impediments/:uid", new DelOneImpedimentController().handle);

    return routes;
  }
}
