/**
 * Éssa é uma model que representa o dominio dessa feature,
 * como basicamente vai ser um tipo, podemos definir como uma interface.
 */

export interface Impediment {
  uid: string;
  title: string;
  description: string;
  resolve: Boolean;
  uid_project: string;
  createdAt?: Date;
  updatedAt?: Date;
}
