import { ImpedimentEntity } from "../../../../core/infra/data/database/entities/ImpedimentEntity";
import { Impediment } from "../../domain/models/impediment";

interface ImpedimentParams {
  uid: string;
  title: string;
  description: string;
  resolve: boolean;
  uid_project: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ImpedimentRepository {

  async create(data: ImpedimentParams): Promise<Impediment> {

    const impedimentEntity = ImpedimentEntity.create ({
      title: data.title,
      description: data.description,
      uid_project: data.uid_project,
      resolve: data.resolve,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    });

    await impedimentEntity.save();

    return this.mapperFromEntityToModel(impedimentEntity);
  }

  async getByUid(uid: string): Promise<Impediment | undefined> {
    console.log("vai consultar o banco para recuperar o registro pelo uid");

    const impedimentEntity = await ImpedimentEntity.findOne(uid);

    if (!impedimentEntity) return undefined;

    return this.mapperFromEntityToModel(impedimentEntity);
  }

  async delByUid(uid: string): Promise<Impediment | undefined> {
    console.log("vai consultar o banco para recuperar o registro pelo uid");

    const impedimentEntity = await ImpedimentEntity.findOne(uid);

    if (!impedimentEntity) return undefined;

    impedimentEntity.remove();

    return this.mapperFromEntityToModel(impedimentEntity);
  }

  async getAll(): Promise<Impediment[]> {
    console.log("consultar o banco e recuperar todos os registros");
    const impedimentEntities = await ImpedimentEntity.find();

    return impedimentEntities.map((impedimentEntity) =>
      this.mapperFromEntityToModel(impedimentEntity)
    );
  }

  async editImpediment(data: ImpedimentParams): Promise<Impediment | undefined> {
    const impedimentEntity = await ImpedimentEntity.findOne(data.uid);

    if (!impedimentEntity) return undefined;

    const impedimentUpdated = ImpedimentEntity.create({
      title: data.title,
      description: data.description,
      uid_project: data.uid_project,
      resolve: data.resolve,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    });

    await impedimentUpdated.save();

    return this.mapperFromEntityToModel(impedimentUpdated);
  }

  private mapperFromEntityToModel(entity: ImpedimentEntity): Impediment {
    return {
      uid: entity.uid,
      title: entity.title,
      description: entity.description,
      resolve: entity.resolve,
      uid_project: entity.uid_project,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

}
