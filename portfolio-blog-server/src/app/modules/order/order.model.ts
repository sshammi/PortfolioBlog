import { model, Schema } from "mongoose";
import { TProject } from "./order.interface";

const ProjectSchema = new Schema<TProject>(
  {
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true, 
  },
  }
);

const Project  = model<TProject>("Project", ProjectSchema);

export default Project;
