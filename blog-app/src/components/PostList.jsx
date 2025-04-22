// import { useEffect, useState } from 'react'
// import { supabase } from '../supabaseClient'
// import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

// export default function PostList() {
//   const [posts, setPosts] = useState([])

//   useEffect(() => {
//     fetchPosts()
//     const subscription = supabase
//       .channel('posts')
//       .on('postgres_changes', { event: 'INSERT', schema: 'public' }, () => {
//         fetchPosts()
//       })
//       .subscribe()

//     return () => subscription.unsubscribe()
//   }, [])

//   const fetchPosts = async () => {
//     const { data } = await supabase
//       .from('posts')
//       .select('*')
//       .order('created_at', { ascending: false })
//     setPosts(data || [])
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {posts.map(post => (
//           <div key={post.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
//             <a
//               href={post.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block group"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
//                 {post.title}
//                 <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1 inline-block opacity-70" />
//               </h3>
//               <p className="text-sm text-gray-500 mt-2">
//                 {new Date(post.created_at).toLocaleDateString('zh-CN')}
//               </p>
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// components/PostList.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { LinkIcon } from '@heroicons/react/24/outline';

const PostCard = ({ post }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -5 }}
    className="glass-effect rounded-xl p-6 cursor-pointer transition-all"
  >
    <a
      href={post.link}
      target="_blank"
      rel="noopener"
      className="block space-y-4"
    >
      <div className="flex items-center gap-2">
        <LinkIcon className="w-5 h-5 text-white/80" />
        <h3 className="text-xl font-semibold text-white truncate">
          {post.title}
        </h3>
      </div>
      <div className="flex justify-between items-center text-white/60 text-sm">
        <span>📅 {new Date(post.created_at).toLocaleDateString('zh-CN')}</span>
        <span className="hover:text-white transition-colors">立即访问 →</span>
      </div>
    </a>
  </motion.div>
);

export default function PostList({ posts }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h3 className="text-2xl font-bold text-white mb-8 px-4">最新分享</h3>
      
      <AnimatePresence>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}