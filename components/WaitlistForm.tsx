import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Button from './Button';
import Input from './Input';
import { media } from 'utils/media';

interface FormData {
  name: string;
  email: string;
  skills: string[];
  businessType: string;
  experience: string;
  isBetaTester: boolean;
}

const skillOptions = ['Digital Art', 'Traditional Art', 'Handicrafts', 'Fashion', 'Jewelry', 'Other'];
const experienceOptions = ['Beginner', 'Intermediate', 'Professional'];

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    skills: [],
    businessType: '',
    experience: '',
    isBetaTester: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      toast.success('Successfully joined the waitlist! Check your email.');
      setFormData({ name: '', email: '', skills: [], businessType: '', experience: '', isBetaTester: false });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper
      as={motion.form}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <Title as={motion.h2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        Join the Waitlist
      </Title>
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

      <SelectGroup>
        <StyledSelect
          value={formData.businessType}
          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
          required
        >
          <option value="">Select Business Type</option>
          <option value="individual">Individual Artist/Artisan</option>
          <option value="small">Small Business</option>
          <option value="collective">Artist Collective</option>
        </StyledSelect>

        <StyledSelect
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          required
        >
          <option value="">Your Experience Level</option>
          {experienceOptions.map(option => (
            <option key={option} value={option.toLowerCase()}>{option}</option>
          ))}
        </StyledSelect>
      </SelectGroup>

      <SkillsGroup>
        <SkillsLabel>Your Skills (Select all that apply)</SkillsLabel>
        <SkillsGrid>
          {skillOptions.map(skill => (
            <SkillCheckbox key={skill}>
              <input
                type="checkbox"
                checked={formData.skills.includes(skill)}
                onChange={(e) => {
                  const updatedSkills = e.target.checked
                    ? [...formData.skills, skill]
                    : formData.skills.filter(s => s !== skill);
                  setFormData({ ...formData, skills: updatedSkills });
                }}
              />
              <span>{skill}</span>
            </SkillCheckbox>
          ))}
        </SkillsGrid>
      </SkillsGroup>

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

      <SubmitButton
        as={motion.button}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Join Now'}
      </SubmitButton>
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

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 2rem;

  ${media('>=tablet')} {
    flex-direction: row;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  border: 2px solid rgb(var(--inputBackground));
  border-radius: 0.4rem;
  background: rgb(var(--inputBackground));
  color: rgb(var(--text));
  
  &:focus {
    border-color: rgb(var(--primary));
  }
`;

const SkillsGroup = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const SkillsLabel = styled.div`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  margin-bottom: 1rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const SkillCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  cursor: pointer;

  input {
    width: 1.6rem;
    height: 1.6rem;
  }
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