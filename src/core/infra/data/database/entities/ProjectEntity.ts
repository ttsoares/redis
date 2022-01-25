import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, OneToMany
} from "typeorm";

import { v4 as uuid } from "uuid";

import {ImpedimentEntity} from "./ImpedimentEntity"

@Entity({ name: "projects" })
export class ProjectEntity extends BaseEntity {
  @PrimaryColumn()
  uid!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ name: "start_date" })
  startDate?: Date;

  @Column({ name: "end_date" })
  endDate?: Date;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => ImpedimentEntity, implement => implement.project)
  impediments!: ImpedimentEntity[]

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
