import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Section } from "../section/section.entity";
import { Question } from "../question/question.entity";

@Entity("topics")
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "nvarchar", length: 500, nullable: false })
  name: string;

  @Column({ default: "draft" })
  status: "draft" | "public";

  @ManyToOne(() => Section, (section) => section.topics)
  section: Section;

  @OneToMany(() => Question, (question) => question.topic)
  questions: Question[];
}
