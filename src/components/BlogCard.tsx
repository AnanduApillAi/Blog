import Link from 'next/link'
import {Blog} from '../types/types'

interface BlogCardProps{
    blog:Blog
}

const BlogCard :React.FC<BlogCardProps>=({blog})=>{
return(
    <div>
      <h2>
        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
      </h2>
      <p>{blog.content.slice(0, 100)}...</p>  {/* Displaying the first 100 characters */}
    </div>
)
}

export default BlogCard