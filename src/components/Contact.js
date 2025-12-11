import React, { useState } from 'react';
import { contactUs } from "../services/contactService";
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await contactUs(formData);
      toast.success('Message sent successfully!', {
        style: { backgroundColor: '#22c55e', color: 'white' }
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message.', {
        style: { backgroundColor: '#ef4444', color: 'white' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <div className='font-tertiary uppercase text-[15px] tracking-[6px] text-accent mb-4'>
            Escape, Explore + Experience the Desert With Us
          </div>
          <h2 className='font-primary text-[45px] mb-4'>Contact Us</h2>
          <p className='text-gray-600'>We will meet you, where you are! We'd love to hear from you.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6'
        >
          <div>
            <label className='block mb-2 text-sm font-medium'>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Your name'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent'
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='you@example.com'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent'
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium'>Subject</label>
            <input
              type='text'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              placeholder='Subject'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent'
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium'>Message</label>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              rows='5'
              placeholder='Write your message...'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent'
              required
            ></textarea>
          </div>
          <button
            type='submit'
            className='btn btn-primary w-full flex justify-center items-center gap-2'
            disabled={isLoading}
          >
            {isLoading && (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
            )}
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
