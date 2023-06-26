import Prompt from "@app/models/prompt";
import { connectToDB } from "@utils/database";


export const POST = async (req, res) => {
    const {userId, prompt, tag } = await req.json();

    try{
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {status: 201});
        
    } catch(err) {
        console.log(err.message);
        return new Response("Failed to create a new Prompt", {status: 500})
    }
}