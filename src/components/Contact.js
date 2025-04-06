import React from 'react';

const Contact = () => {
  return (
    <section  className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='font-primary text-[45px] mb-4'>Contact Us</h2>
          <p className='text-gray-600'>We’d love to hear from you. Please fill out the form below.</p>
        </div>

        <form className='max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6'>
          <div>
            <label className='block mb-2 text-sm font-medium'>Name</label>
            <input
              type='text'
              placeholder='Your name'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent'
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium'>Email</label>
            <input
              type='email'
              placeholder='you@example.com'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent'
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium'>Message</label>
            <textarea
              rows='5'
              placeholder='Write your message...'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent'
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary w-full'>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
