
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '@/components/sections/Navbar';
import Footer from "@/components/sections/Footer";


const BlogItem = ({ imageUrl, title, description, date }) => (
  <div className="flex items-center m-2 pl-12">
    <div className="w-1/4">
      <Image src={imageUrl} alt={title} width={70} height={100} layout="responsive" />
    </div>
    <div className="w-3/4 pl-4">
      <p className='text-sm font-medium leading-4'>{description}</p>
      <p className="text-[12px] text-gray-600">{date}</p>
    </div>
  </div>
);


export default function BlogPage() {

  const blogTitle = 'params.slug';
  
  const [comments, setComments] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (postData) => {

    try {
        const response = await axios.post('/api/comments/blog-comments', postData);

        // if (formData.id) {
        //     setComments(comment => {
        //         const updatedData = [...comment];
        //         const index = updatedData.findIndex(meta => meta.id === formData.id);
        //         updatedData[index] = response.data.data;
        //         return updatedData;
        //     });
        // } else {
        //     setComments(comment => [...comment, response.data.data]);
        // }

        setFormData({
            name: '',
            email: '',
            comment: ''
        });

    } catch (error) {
        console.error('Failed to update data', error);
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    let postData = {};

    postData = {
        page: blogTitle,
        user: formData.name,
        comment: formData.comment
    };

    handleSubmit(postData);
  };


  useEffect(() => {
    const fetchSingleBlog = async () => {
        try {
            const response = await axios.get(`/api/blog/get-blog/${blogTitle}`);
            setBlogData(response.data[0]);
            // // console.log('BlogData', response.data[0]);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    fetchSingleBlog();


    const fetchBlogs = async () => {
      try {
          const response = await axios.get('/api/blog/blogs');
          setBlogs(response.data);
      } catch (error) {
          console.error('Error fetching data: ', error);
      }
    };

    fetchBlogs();


    const fetchComments = async () => {
      const response = await axios.get('/api/comments/blog-comments');
      setComments(response.data);
    };

    fetchComments();
    

    const fetchReply = async () => {
      const response = await axios.get('/api/comments/reply-comments');
      setReplyComments(response.data);
    };

    fetchReply();

  }, []);



  // Consolidate your blog and image data here
  const blogItems = [
    { title: "Blog Post 1", date: "April 2, 2024", imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHww", description: "A brief summary of Blog Post 1." },
    // More blog items...
  ];


  const [replyTo, setReplyTo] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [reply, setReply] = useState('');
  const [replyComments, setReplyComments] = useState([]);
  const [showReplyComments, setshowReplyComments] = useState(false);

  
  const handleReply = (commentId) => {
    setReplyTo(commentId);
    setShowReplyForm(!showReplyForm);
  };

  const handleReplyChange = (e) => {
    const {name, value} = e.target;

    setReply((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const submitReply = async (e, commentId) => {
    e.preventDefault();

    const postData = {
      name: reply.name,
      email: reply.email,
      comment: reply.comment,
      comment_id: commentId, // assuming your backend expects a 'parentId' to link the reply with the comment
    };
  
    const response = await axios.post('/api/comments/reply-comments', postData);

    if (response.status === 200) {
      setComments(currentComments => currentComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), response.data]
          };
        }
        return comment;
      }));
      setReply({ name: '', email: '', comment: '' }); // Reset reply form state
    }

    setReply({
      name: '',
      email: '',
      comment: ''
    });
  };

  const handleChangeReply = (e) => {
    const { name, value } = e.target;
    setReply(prev => ({ ...prev, [name]: value }));
  };


  return (
    <div>
      <Nav />
      <div className="relative h-screen">
        <Image src='https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg p-4">
          <p className="text-white text-3xl font-semibold mb-4">{blogData.title}</p>
        </div>
      </div>

      <div className="container mt-4 mx-auto">
        <div className="flex flex-wrap px-10 xl:px-24 mt-8">
          <div className="w-full md:w-2/3 py-3">
            <p className='mb-4' dangerouslySetInnerHTML={{ __html: blogData.content }}></p>
            <h3 className='font-bold text-2xl mt-10 mb-10' dangerouslySetInnerHTML={{ __html: blogData.excerpt }}></h3>
            <p className='mb-8'>The pet product industry shows good growth opportunities; however, there are also several challenges. One of the biggest challenges faced by businesses that are into pet products is competition from brick-and-mortar stores that sell pet products and provide various pet services.<br/><br/>Another challenge that cannot be ignored in the pet industry is the change in consumer behavior. Pet owners are digitally savvy and love to shop online. This has led to an increase in e-commerce stores that sell pet products. So, it is important to have a good presence to stay ahead of the competitors in your industry.</p>
          </div>

          <div className="w-full md:w-1/3 rounded-md flex flex-col">
            <div className=''>
              <h3 className='text-lg font-bold text-gray-700 text-center mb-2'>Recent Posts</h3>
              {blogItems.map((item, index) => (
                <BlogItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* comments section */}
      {comments.length > 0 && 
      <section className='px-10 xl:px-32 mb-10'>
          <h2 className="text-3xl font-bold mb-6">Comments</h2>
          <div className='bg-gray-100 rounded-md py-5'>
              {comments.map((data) => (
                  <div key={data.id}>
                      <div className='bg-gray-100 px-10 py-3 rounded-xl'>
                        <p className='text-[12px]'>{data.user}</p>
                        <p className='text-lg font-medium'>{data.comment}</p>
                        <button className='text-[12px]' onClick={() => handleReply(data.id)}>Reply</button> <br/>
                        <button onClick={() => {setshowReplyComments(!showReplyComments)}} className='text-[14px] mt-2 text-gray-500'>{`${replyComments.length} reply to this comment`}</button>

                        {
                        replyTo === data.id && showReplyForm && (
                          <form onSubmit={() => submitReply(replyTo)}>
                            <input type='text' id='name' name='name' value={reply.name} onChange={handleReplyChange} placeholder='Name' required/>
                            <input type='email' id='email' name='email' value={reply.email} onChange={handleReplyChange} placeholder='Email' required/>
                            <textarea id='comment' name='comment' value={reply.comment} onChange={handleReplyChange} placeholder="Write a reply..." className="w-full mt-2"/>
                            <button type='submit' className="bg-blue-500 text-white rounded px-2 py-1 mt-1">Submit</button>
                          </form>
                        )}

                        {
                        showReplyComments && 
                        <div className='mt-3'>
                            {replyComments?.map((item, index) => (
                              data.id === item.comment_id &&
                              <div key={index} className='bg-gray-100 px-14 py-3 rounded-xl'>
                                <p className='text-[12px]'>{item.user}</p>
                                <p className='text-lg font-medium'>{item.comment}</p>
                              </div>
                            ))}
                        </div>
                        }
                        
                      </div>
                  </div>
              ))}
          </div>
      </section>}


      {/* leave a comment */}
      <section className='px-10 xl:px-32 mb-10'>
        <h2 className="text-3xl font-bold mb-6">Leave a Comment</h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
          
          <div className='flex gap-8 justify-between'>
            <div className='w-full'>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder='Name'
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <div className='w-full'>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='Email'
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block mb-1">Comment</label>
            <textarea
              rows={7}
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              placeholder='Leave a comment'
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
          </div>
          <button type="submit" className="bg-[#00203f] text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Submit</button>
        </form>
      </section>

      <Footer />

    </div>
  );
};