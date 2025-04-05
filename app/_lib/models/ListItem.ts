import mongoose, { Schema, model } from "mongoose";


// create a mongodb model based on the interface using mongoose
export interface ListItem {
    name: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    type: string;
    images: string[];
    tags: string[];
    _id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const ListItemSchema = new Schema<ListItem>({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const ListItemModel = mongoose.models.ListItem || model<ListItem>("ListItem", ListItemSchema);
