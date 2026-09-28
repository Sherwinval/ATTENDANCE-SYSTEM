import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerParticipant } from '../api/index.js';
import ActionPanel from '../components/ActionPanel.jsx';
import EventShell from '../components/EventShell.jsx';

const STUDENT_ID_REGEX = /^\d{4}-\d{5}$/;

function formatStudentIdInput(value, previousValue = '') {
  const cleaned = value.replace(/[^\d-]/g, '');
  const digits = cleaned.replace(/-/g, '');

  if (digits.length <= 4) {
    if (
      digits.length === 4 &&
      (value.length > previousValue.length || (cleaned.length > 4 && cleaned[4] === '-'))
    ) {
      return `${digits}-`;
    }

    return digits;
  }

  return `${digits.slice(0, 4)}-${digits.slice(4, 9)}`;
}

export default function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    studentId: location.state?.studentId || '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (!STUDENT_ID_REGEX.test(form.studentId.trim())) {
      return 'Student ID must match YYYY-NNNNN format (e.g. 2024-00123).';
    }
    return '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate();
    setError(validationError);

    if (validationError) return;
    setIsSubmitting(true);

    try {
      await registerParticipant({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        studentId: form.studentId.trim(),
      });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Participant may already exist.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <EventShell
      badge="Computer Programming Society"
      intro="Register your identity to the repository tree before checking in."
      panelClassName="mx-auto w-full max-w-4xl"
      title="imPRINT 4.0: The Next Commit"
    >
      <ActionPanel
        footer="git config --global user.name && git commit"
        title="Author Registration"
        subtitle="Provide your credentials to initialize your participant profile."
      >
        <div className="w-full max-w-2xl mx-auto space-y-5">
          
          {/* Error Banner */}
          {error && (
            <div className="feedback-box feedback-box-error p-3.5 sm:p-4 border-l-4 border-l-rose-500 rounded-xl">
              <svg className="w-5 h-5 flex-shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <p className="font-mono text-xs uppercase text-rose-400 font-bold">Validation Error</p>
                <p className="text-sm font-medium text-slate-200 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label text-xs sm:text-sm" htmlFor="firstName">
                  FIRST NAME
                </label>
                <input
                  autoFocus
                  className="field !h-12 !text-left !px-4 text-base font-sans font-medium"
                  id="firstName"
                  onChange={(event) => updateField('firstName', event.target.value)}
                  placeholder="Juan"
                  value={form.firstName}
                />
              </div>

              <div>
                <label className="field-label text-xs sm:text-sm" htmlFor="lastName">
                  LAST NAME
                </label>
                <input
                  className="field !h-12 !text-left !px-4 text-base font-sans font-medium"
                  id="lastName"
                  onChange={(event) => updateField('lastName', event.target.value)}
                  placeholder="Dela Cruz"
                  value={form.lastName}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="field-label mb-0 text-xs sm:text-sm" htmlFor="studentId">
                  STUDENT ID NUMBER
                </label>
                <span className="font-mono text-xs text-slate-400">
                  Format: YYYY-NNNNN
                </span>
              </div>
              <input
                className="field !h-14 sm:!h-15 text-2xl sm:text-3xl tracking-[0.22em] font-mono placeholder:text-slate-600 placeholder:tracking-normal"
                id="studentId"
                inputMode="numeric"
                maxLength={10}
                onChange={(event) =>
                  updateField('studentId', formatStudentIdInput(event.target.value, form.studentId))
                }
                placeholder="2024-00001"
                value={form.studentId}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <button 
                className="button-primary !h-13 sm:!h-14 text-base sm:text-lg font-bold" 
                disabled={isSubmitting || !form.firstName.trim() || !form.lastName.trim() || !form.studentId.trim()} 
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <span>Save Profile</span>
                  </>
                )}
              </button>

              <Link className="button-secondary !h-13 sm:!h-14 text-base sm:text-lg font-bold" to="/login">
                Cancel
              </Link>
            </div>
          </form>

          <div className="pt-3 border-t border-white/[0.08] text-center">
            <p className="text-sm text-slate-400">
              Already registered?{' '}
              <Link 
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-400 transition ml-1" 
                to="/login"
              >
                Return to Check-In
              </Link>
            </p>
          </div>
        </div>
      </ActionPanel>
    </EventShell>
  );
}