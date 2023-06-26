import Prompt from "@app/models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200})

    } catch (error) {
        console.log(error.message);
        return new Response("Failed to fetch aall prompts", {status: 500})
    }
}