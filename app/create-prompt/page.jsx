"use client"
import Form from "@app/components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"



const CreatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })
  const createPrompt = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try{

      const response = await fetch('/api/prompt/new', {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      });

      if(response.ok) {
        router.push('/');
      }

    } catch(err)  {
      console.log(err.message);
    }
    finally{
      setSubmitting(false)
    }
  }
  return (
    <Form
      type="Create"
      post = {post}
      setpost = {setPost}
      submitting={submitting}
      handleSubmit={createPrompt}

    />
  )
}

export default CreatePrompt
