// import { useState } from 'react'
// import PostForm from './components/PostForm'
// import PostList from './components/PostList'

// export default function App() {
//   const [newPost, setNewPost] = useState(null)

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto py-4 px-4">
//           <h1 className="text-3xl font-bold text-gray-900">共享知识库</h1>
//         </div>
//       </header>

//       <main className="py-8">
//         <PostForm onPost={setNewPost} />
//         <PostList key={newPost?.id} />
//       </main>
//     </div>
//   )
// }


// App.jsx
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();

    const subscription = supabase
      .channel('posts')
      .on('postgres_changes', { event: 'INSERT' }, () => fetchPosts())
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    await supabase
      .from('posts')
      .insert([{
        title: formData.get('title'),
        link: formData.get('link')
      }]);
    
    e.target.reset();
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="glass-effect shadow-lg mb-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">知识星河 ✨</h1>
        </div>
      </header>

      <PostForm onSubmit={handleSubmit} />
      {!loading ? (
        <PostList posts={posts} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-effect rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-white/20 rounded w-3/4 mb-4" />
                <div className="h-4 bg-white/20 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}