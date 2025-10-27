import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Topic } from "../topic/topic.entity";

@Entity("sections")
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "nvarchar", length: 500, nullable: false })
  name: string;

  @Column({ default: "draft" })
  status: "draft" | "public";

  @OneToMany(() => Topic, (topic) => topic.section)
  topics: Topic[];
}
