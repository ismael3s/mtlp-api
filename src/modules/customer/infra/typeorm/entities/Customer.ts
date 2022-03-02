import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("customer")
class Customer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    enum: ["user", "manager", "admin"],
    default: "user",
  })
  role: string;

  @ManyToMany(() => Customer, (customer) => customer.associated)
  @JoinTable({
    name: "customer_association",
    joinColumn: {
      name: "customer_owner_id",
    },
    inverseJoinColumn: {
      name: "customer_id",
    },
  })
  owner: Customer[];

  @ManyToMany(() => Customer, (customer) => customer.owner)
  associated: Customer[];

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

export { Customer };
