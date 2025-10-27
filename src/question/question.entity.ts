import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Topic } from "../topic/topic.entity";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "nvarchar",
    length: 500,
    nullable: false,
  })
  question: string;

  @Column({ type: "nvarchar", length: 500, nullable: false })
  answer: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @Column({ default: "draft" })
  status: "draft" | "public";

  @ManyToOne(() => Topic, (topic) => topic.questions)
  @JoinColumn({ name: "topicId" })
  topic: Topic;
}
