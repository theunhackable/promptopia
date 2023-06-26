"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Profile from '@app/components/Profile';

const MyProfile = () => {
  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response  = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });
        const fileterdPosts = posts.filter(p => p._id !== post._id);
        setPosts(fileterdPosts);
      } catch (error) {
        console.log(error.message)        
      }
    }
  }

  
  return (
    <div>
      < Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data = {posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default MyProfile
