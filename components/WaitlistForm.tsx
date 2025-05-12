/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormTitle>Register for Early Access</FormTitle>

      <InputGroup>
        <Label>Full Name</Label>
        <Input type="text" placeholder="Enter your full name" required />
      </InputGroup>

      <InputGroup>
        <Label>Email Address</Label>
        <Input type="email" placeholder="Enter your email" required />
      </InputGroup>

      <InputGroup>
        <Label>I am a</Label>
        <Select required>
          <option value="">Select your role</option>
          <option value="artisan">Skilled Artisan</option>
          <option value="client">Client looking for Services</option>
          <option value="both">Both</option>
        </Select>
      </InputGroup>

      <InputGroup>
        <Label>Skills/Services Interested In</Label>
        <Input type="text" placeholder="e.g., Plumbing, Carpentry, etc." />
      </InputGroup>

      <SubmitButton as={motion.button} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isSubmitting}>
        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </SubmitButton>

      <Privacy>By joining, you agree to our Terms of Service and Privacy Policy</Privacy>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: rgb(var(--text));
`;

const Input = styled.input`
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
`;
