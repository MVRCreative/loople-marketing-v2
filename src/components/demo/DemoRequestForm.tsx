'use client';

/**
 * Demo request form — captures lead details, posts to Attio via the API,
 * then reveals a prefilled Calendly embed. CRM failure still unlocks booking.
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { CalendlyEmbed } from '@/components/demo/CalendlyEmbed';
import { DemoRequestValidation } from '@/validations/DemoRequestValidation';
import type { DemoRequestInput } from '@/validations/DemoRequestValidation';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const fieldClassName =
  'mt-1.5 w-full rounded-ds-md border border-ds-border bg-ds-background px-3 py-2.5 text-sm text-ds-foreground outline-none transition-colors placeholder:text-ds-muted-foreground focus-visible:border-ds-brand focus-visible:ring-2 focus-visible:ring-ds-brand/30';

const labelClassName = 'block text-sm font-medium text-ds-foreground';

/**
 * Demo lead capture form with Calendly handoff.
 * @returns Form UI, or the scheduling embed after a successful submit.
 */
export const DemoRequestForm = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookedLead, setBookedLead] = useState<{ name: string; email: string } | null>(null);

  const form = useForm<DemoRequestInput>({
    resolver: zodResolver(DemoRequestValidation),
    defaultValues: {
      fullName: '',
      workEmail: '',
      organizationName: '',
      communityType: '',
      communitySize: '',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      // Always unlock Calendly after a valid client-side submit. CRM/network
      // failures are logged server-side; the prospect should still book.
      if (!response.ok) {
        let message = 'We could not save your details, but you can still pick a time below.';
        try {
          const payload: unknown = await response.json();
          if (typeof payload === 'object' && payload !== null && 'error' in payload) {
            const { error } = payload;
            if (typeof error === 'string') {
              message = error;
            }
          }
        } catch {
          // keep default message
        }
        setErrorMessage(message);
      }

      setBookedLead({ name: values.fullName, email: values.workEmail });
      setStatus('success');
    } catch {
      setErrorMessage('We could not save your details, but you can still pick a time below.');
      setBookedLead({ name: values.fullName, email: values.workEmail });
      setStatus('success');
    }
  });

  if (status === 'success' && bookedLead) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-ds-foreground">
            Pick a time that works
          </h2>
          <p className="mt-2 text-sm text-ds-muted-foreground">
            Thanks, {bookedLead.name.trim().split(/\s+/u)[0] ?? bookedLead.name}. Your details are
            ready — choose a slot below.
          </p>
          {errorMessage ? (
            <output className="mt-3 block text-sm text-ds-muted-foreground">{errorMessage}</output>
          ) : null}
        </div>
        <CalendlyEmbed name={bookedLead.name} email={bookedLead.email} />
      </div>
    );
  }

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="fullName" className={labelClassName}>
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          className={fieldClassName}
          {...register('fullName')}
        />
        {errors.fullName ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.fullName.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="workEmail" className={labelClassName}>
          Work email
        </label>
        <input
          id="workEmail"
          type="email"
          autoComplete="email"
          className={fieldClassName}
          {...register('workEmail')}
        />
        {errors.workEmail ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.workEmail.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="organizationName" className={labelClassName}>
          Organization
        </label>
        <input
          id="organizationName"
          type="text"
          autoComplete="organization"
          className={fieldClassName}
          {...register('organizationName')}
        />
        {errors.organizationName ? (
          <p className="mt-1.5 text-sm text-red-600">{errors.organizationName.message}</p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="communityType" className={labelClassName}>
            Community type <span className="font-normal text-ds-muted-foreground">(optional)</span>
          </label>
          <input
            id="communityType"
            type="text"
            placeholder="Club, league, school…"
            className={fieldClassName}
            {...register('communityType')}
          />
        </div>
        <div>
          <label htmlFor="communitySize" className={labelClassName}>
            Approximate size{' '}
            <span className="font-normal text-ds-muted-foreground">(optional)</span>
          </label>
          <input
            id="communitySize"
            type="text"
            placeholder="e.g. 200 members"
            className={fieldClassName}
            {...register('communitySize')}
          />
        </div>
      </div>

      {status === 'error' && errorMessage ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        size="md"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' ? 'Submitting…' : 'Continue to scheduling'}
      </Button>
    </form>
  );
};
