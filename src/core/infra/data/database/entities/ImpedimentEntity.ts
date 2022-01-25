import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, ManyToOne, JoinColumn
} from "typeorm";

import { v4 as uuid } from "uuid";
import {ProjectEntity} from "./ProjectEntity"

@Entity({ name: "impediments" })
export class ImpedimentEntity extends BaseEntity {
  @PrimaryColumn()
  uid!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  resolve!: boolean;

  @Column()
  uid_project!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne( () => ProjectEntity, (project) => project.impediments)

  @JoinColumn({ name: "uid_project", referencedColumnName: "uid" })
  project!: ProjectEntity;

  constructor(title: string, description: string, resolve: boolean, uid_project: string, createdAt: Date, updatedAt: Date)
  {
    super();
    this.title = title;
    this.description = description;
    this.resolve = resolve;
    this.uid_project = uid_project;
    this.createdAt =  createdAt;
    this.updatedAt = updatedAt;
  }

  @BeforeInsert()
  private beforeInsert() {
    this.uid = uuid();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = new Date();
  }
}
