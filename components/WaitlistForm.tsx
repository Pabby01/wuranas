import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';
import { media } from 'utils/media';

interface FormData {
  name: string;
  email: string;
  isBetaTester: boolean;
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    isBetaTester: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', isBetaTester: false });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>Join the Waitlist</Title>
      <Description>
        Be the first to experience Wurana's revolutionary artisan marketplace on Solana.
      </Description>
      
      <InputGroup>
        <StyledInput
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <StyledInput
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </InputGroup>

      <CheckboxGroup>
        <Checkbox
          type="checkbox"
          id="betaTester"
          checked={formData.isBetaTester}
          onChange={(e) => setFormData({ ...formData, isBetaTester: e.target.checked })}
        />
        <CheckboxLabel htmlFor="betaTester">
          I would like to be a beta tester
        </CheckboxLabel>
      </CheckboxGroup>

      <SubmitButton disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Join Now'}
      </SubmitButton>

      {submitStatus === 'success' && (
        <StatusMessage success>
          Thank you for joining! Check your email for confirmation.
        </StatusMessage>
      )}
      {submitStatus === 'error' && (
        <StatusMessage>
          Something went wrong. Please try again.
        </StatusMessage>
      )}
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background: rgb(var(--cardBackground));
  border-radius: 0.6rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: rgb(var(--text));
`;

const Description = styled.p`
  font-size: 1.6rem;
  text-align: center;
  color: rgb(var(--text), 0.8);
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 2rem;

  ${media('>=tablet')} {
    flex-direction: row;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

const Checkbox = styled.input`
  margin-right: 1rem;
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  max-width: 20rem;
  height: 4.5rem;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.5rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div<{ success?: boolean }>`
  text-align: center;
  padding: 1rem;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  color: ${(p) => p.success ? 'rgb(var(--primary))' : 'rgb(255, 0, 0)'};
  background: ${(p) => p.success ? 'rgba(var(--primary), 0.1)' : 'rgba(255, 0, 0, 0.1)'};
  width: 100%;
`;