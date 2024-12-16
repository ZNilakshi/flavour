'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const BlogPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content, photos, video };
    setBlogPosts([...blogPosts, newPost]);
    setTitle('');
    setContent('');
    setPhotos([]);
    setVideo(null);
    toggleForm();
  };

  const onDropPhotos = (acceptedFiles) => {
    if (acceptedFiles.length <= 3) {
      setPhotos(acceptedFiles);
    } else {
      alert('You can only upload up to 3 photos.');
    }
  };

  const onDropVideo = (acceptedFiles) => {
    if (acceptedFiles.length === 1 && acceptedFiles[0].type.startsWith('video/')) {
      setVideo(acceptedFiles[0]);
    } else {
      alert('You can only upload one video.');
    }
  };

  const { getRootProps: getRootPropsPhotos, getInputProps: getInputPropsPhotos } = useDropzone({ onDrop: onDropPhotos, accept: 'image/*' });
  const { getRootProps: getRootPropsVideo, getInputProps: getInputPropsVideo } = useDropzone({ onDrop: onDropVideo, accept: 'video/*' });

  const handleSeeMore = (post) => {
    setActivePost(post);
  };

  const handleClosePost = () => {
    setActivePost(null);
  };

  const toggleExpand = (post) => {
    setActivePost(post);
  };

  return (
    <div style={styles.blogContainer}>
      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.formContainer}>
            <button style={styles.closeButton} onClick={toggleForm}>Close</button>
            <h3>Create Your Blog</h3>
            <form style={styles.form} onSubmit={handleFormSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  style={styles.input} 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="content">Content</label>
                <ReactQuill 
                  value={content}
                  onChange={setContent}
                  style={styles.textarea}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="photos">Upload Photos (up to 3)</label>
                <div {...getRootPropsPhotos()} style={styles.dropzone}>
                  <input {...getInputPropsPhotos()} />
                  <p>Drag 'n' drop some photos here, or click to select photos</p>
                </div>
                <div style={styles.filesPreview}>
                  {photos.map((file) => (
                    <div key={file.path} style={styles.fileItem}>
                      <p>{file.path}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="video">Upload Video (1 only)</label>
                <div {...getRootPropsVideo()} style={styles.dropzone}>
                  <input {...getInputPropsVideo()} />
                  <p>Drag 'n' drop a video here, or click to select a video</p>
                </div>
                {video && (
                  <div style={styles.fileItem}>
                    <p>{video.path}</p>
                  </div>
                )}
              </div>
              <button type="submit" style={styles.submitButton}>Submit</button>
            </form>
          </div>
        </div>
      )}

      {activePost && (
        <div style={styles.overlay}>
          <div style={styles.fullPostContainer}>
            <button style={styles.closeButton} onClick={handleClosePost}>Close</button>
            <h3>{activePost.title}</h3>
            <div style={styles.filesPreview}>
              {activePost.photos.map((file, idx) => (
                <div key={idx} style={styles.fileItem}>
                  {file.type.startsWith('image/') && (
                    <img src={URL.createObjectURL(file)} alt={file.name} style={styles.uploadedImage} />
                  )}
                </div>
              ))}
              {activePost.video && (
                <div style={styles.fileItem}>
                  <video controls style={styles.uploadedVideo}>
                    <source src={URL.createObjectURL(activePost.video)} type={activePost.video.type} />
                  </video>
                </div>
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: activePost.content }}></div>
          </div>
        </div>
      )}

      <div style={showForm || activePost ? styles.blurredContent : null}></div>
      <div style={styles.topSection}>
        <img
          src="/images/blog.jpeg"
          alt="Blog Cover"
          style={styles.coverImage}
        />
        <button style={styles.recipeButton} onClick={toggleForm}>CREATE A BLOG</button>
      </div>
      <div style={{ textAlign: 'center', margin: '20px 0 20px' }}>
        <h3 style={{ fontSize: '23px', margin: '20px 0 20px', fontFamily: "Oldenburg" }}>Unlimited space for your recipes</h3>
        <p style={{ fontSize: '20px', fontFamily: "Oldenburg" }}>To become a successful food blogger you need space and ease of use. For your FLAVOUR FUSION blog you will have available, with unlimited space.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', border: '3px  gray', maxWidth: '900px', margin: '0 auto', borderRadius: '35px' }}>
        <div style={{ flex: 0.8, marginRight: '20px' }}>
          <img src="/images/sec4.jpg" alt="Left Photo" style={{ width: '100%', height: '550px' }} />
        </div>
        <div style={{ flex: 0.8 }}>
          <h3 style={{ fontSize: '25px', textAlign: 'center', margin: '20px', fontFamily: "Oldenburg" }}> How to become a creator and food influencer</h3>
          <p style={{ fontSize: '20px', margin: '20px', fontFamily: "Oldenburg" }}>The food influencer market is growing rapidly, and having a FLAVOUR FUSION food blog is an excellent launch pad!</p>
          <p style={{ fontSize: '20px', margin: '20px', fontFamily: "Oldenburg" }}>To earn as a food influencer, you don't need millions of followers, but authenticity and contact with your audience. You can get in touch with important companies and become a Food Creator for FLAVOUR FUSION.</p>
          <p style={{ fontSize: '20px', margin: '20px', fontFamily: "Oldenburg" }}>A food blogger grows thanks to the traffic that Google brings and the communities that they manage to create on social networks.</p>
          <button style={{ padding: '8px 18px', background: '#FF6347', color: 'white', border: 'none', borderRadius: '35px', cursor: 'pointer', alignSelf: 'center', fontFamily: "Oldenburg", fontSize: '18px' }} onClick={toggleForm}> CREATE A BLOG</button>
        </div>
      </div>

      <div style={styles.blogPostsContainer}>
        {blogPosts.map((post, index) => (
          <BlogPost key={index} post={post} onSeeMore={handleSeeMore} />
        ))}
      </div>
    </div>
  );
};

const BlogPost = ({ post, onSeeMore }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    onSeeMore(post);
  };

  return (
    <div style={styles.blogPost}>
      <h3>{post.title}</h3>
      <div style={styles.collapsedContent}>
        <div style={isExpanded ? styles.largeFilesPreview : styles.filesPreview}>
          {post.photos.map((file, idx) => (
            <div key={idx} style={styles.fileItem}>
              {file.type.startsWith('image/') && (
                <img src={URL.createObjectURL(file)} alt={file.name} style={styles.uploadedImage} />
              )}
            </div>
          ))}
          {post.video && (
            <div style={styles.fileItem}>
              <video controls style={styles.uploadedVideo}>
                <source src={URL.createObjectURL(post.video)} type={post.video.type} />
              </video>
            </div>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
      <button onClick={toggleExpand} style={styles.seeMoreButton}>
        See more
      </button>
    </div>
  );
};



const styles = {
    
  blogContainer: {
    borderRadius: '35px',
    padding: '20px',
  },
  topSection: {
    position: 'relative',
  },
  coverImage: {
    objectFit: 'cover',
    width: '100%',
    filter: 'blur(2px)',
  },
  recipeButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px 20px',
    background: '#FF6347',
    color: 'white',
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    fontFamily: "Oldenburg",
    fontSize: '18px'
  },
  formContainer: {
    position: 'relative',
    margin: '20px auto',
    padding: '40px',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    zIndex: 10000,
    fontFamily: "Oldenburg",
  },
  fullPostContainer: {
    position: 'relative',
    margin: '20px auto',
    padding: '40px',
    maxWidth: '800px',
    maxHeight: '80vh',
    minWidth: '800px',
    minHeight: '80vh',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    zIndex: 10000,
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '10px 15px',
    background: '#FF6347',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 10001,
    fontFamily: "Oldenburg",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
    marginTop:'20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    height: '200px',
  },
  dropzone: {
    padding: '20px',
    border: '2px dashed #ccc',
    borderRadius: '4px',
    textAlign: 'center',
  },
  filesPreview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '10px',
   
  },
  largeFilesPreview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '10px',
    justifyContent: 'center',
    width: '260px', // Adjust width
    height: '250px', // Adjust height
  },
  
  fileItem: {
    position: 'relative',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    borderRadius: '4px',
    marginRight: '10px',
    marginBottom: '10px',
    width: '250px', // Adjust width
    height: '250px',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    width: '260px', // Adjust width
    height: '250px',
  },
  uploadedVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  submitButton: {
    padding: '10px 20px',
    background: '#FF6347',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  blurredContent: {
    filter: 'blur(2px)',
    pointerEvents: 'none',
  },
  blogPostsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px', // Reduced the gap between blog posts
  },
  blogPost: {
    padding: '20px ,5px',
    margin:'10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ccc',
    position: 'relative',
    width:'330px',
    height:'400px',
  },
  collapsedContent: {
    maxHeight: '333px',
    minHeight: '333px',
    overflow: 'hidden',
  },
  seeMoreButton: {
    padding: '10px 20px',
    background: '#FF6347',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default BlogPage;
