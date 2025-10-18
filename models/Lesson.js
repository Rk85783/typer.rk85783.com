import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Lesson = model("Lesson", lessonSchema);
export default Lesson;