'use server';

import { connectToDB } from "@/app/_lib/db";
import { ListItem, ListItemModel } from "@/app/_lib/models/ListItem";

export async function getAllListingsByUserId(userId: string): Promise<ListItem[]> {
    try {
        // connect to db
        await connectToDB();

        // get all listings by userId
        const allListings = await ListItemModel.find({ userId }).exec();

        return allListings;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
