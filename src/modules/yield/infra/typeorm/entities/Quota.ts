import { Customer } from "@modules/customer/infra/typeorm/entities/Customer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuidV4 } from "uuid";

@Entity("quota")
class Quota {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @Column({
    name: "customer_id",
  })
  customerId: string;

  @OneToOne(() => Customer)
  @JoinColumn({
    name: "manager_id",
  })
  manager: Customer;

  @Column({ name: "manager_id"})
  managerId: string;

  @Column()
  value: number;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Quota };
