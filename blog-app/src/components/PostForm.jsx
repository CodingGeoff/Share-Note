// import { useForm } from 'react-hook-form'
// import { supabase } from '../supabaseClient'

// export default function PostForm({ onPost }) {
//   const { register, handleSubmit, reset } = useForm()

//   const onSubmit = async ({ title, link }) => {
//     const { data, error } = await supabase
//       .from('posts')
//       .insert([{ title, link }])
//       .select()
    
//     if (!error) {
//       onPost(data[0])
//       reset()
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <div>
//         <label className="block text-gray-700 mb-2">标题</label>
//         <input
//           {...register('title', { required: true })}
//           className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 mb-2">链接</label>
//         <input
//           {...register('link', { required: true, pattern: /https?:\/\/.+/ })}
//           className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
//       >
//         提交文章
//       </button>
//     </form>
//   )
// }

// components/PostForm.jsx
import { motion } from 'framer-motion';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function PostForm({ onSubmit }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-8 mx-4 lg:mx-auto lg:max-w-2xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <ArrowUpTrayIcon className="w-8 h-8 text-white" />
        <h2 className="text-2xl font-bold text-white">分享你的发现</h2>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <input
            name="title"
            placeholder="文章标题"
            required
            className="w-full bg-white/10 rounded-lg p-4 text-white placeholder-white/60
                     focus:ring-2 focus:ring-white/50 focus:outline-none transition-all"
          />
        </div>
        <div>
          <input
            name="link"
            type="url"
            placeholder="https://example.com"
            required
            className="w-full bg-white/10 rounded-lg p-4 text-white placeholder-white/60
                     focus:ring-2 focus:ring-white/50 focus:outline-none transition-all"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-4 rounded-lg
                    backdrop-blur-sm transition-all duration-200"
        >
          立即分享
        </motion.button>
      </form>
    </motion.div>
  )
}
