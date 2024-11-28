// EditBlogPage.tsx
"use client"
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import { useState, useEffect } from 'react'
import { IBlog } from '@/models/blog'
import topic, { ITopic } from '@/models/topic'
import { useParams, useRouter } from 'next/navigation'

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="menu-bar p-2 border-b mb-4 flex gap-2 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-2 py-1 rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
      >
        Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
      >
        Quote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="px-2 py-1 rounded"
      >
        Horizontal Rule
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Enter the URL')
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        className={`px-2 py-1 rounded ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
      >
        Link
      </button>
    </div>
  )
}

const EditBlogPage = () => {
  const router = useRouter()
  const { blogId } = useParams()
  const [blog, setBlog] = useState<IBlog | null>(null)
  const [availableTopics, setAvailableTopics] = useState<ITopic[]>([])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: true,
      }),
    ],
    content: blog?.content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none w-full max-w-full',
      },
    },
    onUpdate: ({ editor }) => {
      if (blog) {
        const updatedBlog = {
          ...blog,
          content: editor.getJSON(),
        } 
        setBlog(updatedBlog)
      }
    },
  })

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogId}`)
        if (!response.ok) throw new Error('Failed to fetch blog')
        const data = await response.json()
        setBlog(data)
        editor?.commands.setContent(data.content)
      } catch (error) {
        console.error('Error fetching blog:', error)
      }
    }

    if (typeof blogId === 'string') {
      fetchBlog()
    }
  }, [blogId, editor])

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics')
        if (!response.ok) throw new Error('Failed to fetch topics')
        const data = await response.json()
        console.log(data,'dataTopics')
        const flattenedTopics = data.flatMap((category: { topics: ITopic[] }) => category.topics)
        setAvailableTopics(flattenedTopics)
      } catch (error) {
        console.error('Error fetching topics:', error)
      }
    }
    fetchTopics()
  }, [])

  const handleUpdateBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...blog, 
          content: editor?.getJSON()
        }),
      })
      if (!response.ok) throw new Error('Failed to update blog')
      router.push('/admin/blogs')
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  if (!blog) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <div className="mb-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={blog?.title || ''}
            onChange={(e) => setBlog({ ...blog, title: e.target.value } as IBlog)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            value={blog?.slug || ''}
            onChange={(e) => setBlog({ ...blog, slug: e.target.value } as IBlog)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Topics</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {blog?.topics?.map((topic, index) => (
              <span 
                key={`${topic}-${index}`} 
                className="bg-blue-100 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {topic}
                <button
                  onClick={() => setBlog({ 
                    ...blog, 
                    topics: blog.topics.filter(t => t !== topic) 
                  } as IBlog)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => {
              if (e.target.value && !blog?.topics?.includes(e.target.value)) {
                setBlog({ 
                  ...blog, 
                  topics: [...(blog?.topics || []), e.target.value] 
                } as IBlog)
              }
              e.target.value = '' // Reset select after adding
            }}
            value=""
          >
            <option value="">Add a topic...</option>
            {availableTopics
              .filter(topic => !blog?.topics?.includes(topic.name))
              .map((topic, index) => (
                <option key={`${topic.name}-${index}`} value={topic.name}>{topic.name}</option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author Name</label>
          <input
            type="text"
            value={blog?.author || ''}
            onChange={(e) => setBlog({ ...blog, author: e.target.value } as IBlog)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="border rounded-lg">
        <MenuBar editor={editor} />
        <div className="p-4 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-p:my-2 prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4">
          <EditorContent editor={editor} />
        </div>
      </div>
      <button 
        onClick={handleUpdateBlog}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  )
}

export default EditBlogPage