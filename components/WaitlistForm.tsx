/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Button from './Button';

interface FormData {
  fullName: string;
  email: string;
  role: string;
  skills: string;
}

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    role: '',
    skills: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          isArtisan: formData.role === 'artisan' || formData.role === 'both',
          skills: formData.skills
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Show success message
      toast.success('🎉 Successfully joined the waitlist!', {
        duration: 5000,
        position: 'top-center',
        icon: '✨',
        style: {
          background: '#10B981',
          color: '#fff',
          fontSize: '16px',
        },
      });

      // Clear form
      setFormData({ fullName: '', email: '', role: '', skills: '' });

      // Show additional success message
      setTimeout(() => {
        toast('📧 Check your email or spam folder for confirmation!', {
          duration: 4000,
          icon: '📨',
        });
      }, 1000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to join waitlist';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Toaster />
      <Form onSubmit={handleSubmit}>
        <FormTitle>Register for Early Access</FormTitle>

        <InputGroup>
          <Label>Full Name</Label>
          <Input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name" 
            required 
          />
        </InputGroup>

        <InputGroup>
          <Label>Email Address</Label>
          <Input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email" 
            required 
          />
        </InputGroup>

        <InputGroup>
          <Label>I am a</Label>
          <Select 
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select your role</option>
            <option value="artisan">Skilled Artisan</option>
            <option value="client">Client looking for Services</option>
            <option value="both">Both</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>Skills/Services Interested In</Label>
          <Input 
            type="text" 
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., Plumbing, Carpentry, etc." 
          />
        </InputGroup>

        <SubmitButton 
          as={motion.button} 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </SubmitButton>

        <Privacy>
          By joining, you agree to our <a href="/terms">Terms of Service</a> and{' '}
          <a href="/privacy">Privacy Policy</a>
        </Privacy>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const FormTitle = styled.h3`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  color: rgb(var(--text));
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: rgb(var(--text));
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(var(--text), 0.2);
  background: rgba(var(--background), 0.9);
  color: rgb(var(--text));
  font-size: 1.6rem;

  &:focus {
    border-color: rgb(var(--primary));
    outline: none;
  }
`;

const Select = styled.select`
  padding: 1.2rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(var(--text), 0.2);
  background: rgba(var(--cardBackground), 0.5);
  color: rgb(var(--text));
  font-size: 1.6rem;

  &:focus {
    border-color: rgb(var(--primary));
    outline: none;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(90deg, rgb(var(--primary)), #ffc107);
  color: rgb(var(--textSecondary));
  border: none;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Privacy = styled.p`
  font-size: 1.2rem;
  color: rgb(var(--text), 0.6);
  text-align: center;

  a {
    color: rgb(var(--primary));
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
