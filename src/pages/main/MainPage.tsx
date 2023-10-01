import axios from 'axios';
import { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:5174';

interface IPost {
  id: string;
  title: string;
  content: string;
}

const MainPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get(`${apiUrl}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
      }
    }

    fetchItems();
  }, []);

  if (!posts) return;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id} className='mb-20'>
          <p className='mb-4'>{post.title}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
