import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkParticipant, logAttendanceLogin } from '../api/index.js';
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

export default function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccessData(null);

    const trimmedId = studentId.trim();

    if (!STUDENT_ID_REGEX.test(trimmedId)) {
      setError('Invalid format! Please enter YYYY-NNNNN (e.g. 2024-00123).');
      inputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await checkParticipant(trimmedId);

      if (!result.exists) {
        setError(`Participant with ID "${trimmedId}" is not registered in the database.`);
        return;
      }

      const logResult = await logAttendanceLogin(trimmedId);
      
      setSuccessData({
        name: result.participant.fullName || `${result.participant.firstName} ${result.participant.lastName}`,
        studentId: trimmedId,
        time: new Date(logResult.recordedAt || Date.now()).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      });

      setStudentId('');
    } catch (err) {
      setError(err.message || 'Failed to record check-in. Please try again.');
    } finally {
      setIsSubmitting(false);
      inputRef.current?.focus();
    }
  }

  return (
    <EventShell
      badge="Computer Programming Society"
      intro="Log your attendance commit for imPRINT 4.0: The Next Commit."
      panelClassName="mx-auto w-full max-w-4xl"
      title="imPRINT 4.0: The Next Commit"
    >
      <ActionPanel
        footer="git commit -m 'attendance: check-in --verified'"
        title="Participant Check-In"
        subtitle="Enter or scan your Student ID to commit your event entry."
      >
        <div className="w-full max-w-2xl mx-auto space-y-5">
          
          {/* Success Banner */}
          {successData && (
            <div className="feedback-box feedback-box-success flex-col items-start gap-1.5 p-4 sm:p-5 border-l-4 border-l-emerald-500 rounded-xl animate-fade-in">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm tracking-wide font-mono">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>COMMIT RECORDED • CHECK-IN OK</span>
                </div>
                <span className="font-mono text-xs text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {successData.time}
                </span>
              </div>
              <div className="mt-1">
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Welcome, {successData.name}!
                </p>
                <p className="font-mono text-xs sm:text-sm text-emerald-300/80 mt-0.5">
                  ID: <span className="font-bold text-white">{successData.studentId}</span> • Session Staged
                </p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="feedback-box feedback-box-error p-3.5 sm:p-4 border-l-4 border-l-rose-500 rounded-xl">
              <svg className="w-5 h-5 flex-shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <p className="font-mono text-xs uppercase text-rose-400 font-bold">Staging Error</p>
                <p className="text-sm font-medium text-slate-200 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="field-label mb-0 text-xs sm:text-sm" htmlFor="studentId">
                  STUDENT ID NUMBER
                </label>
                <span className="font-mono text-xs text-slate-400">
                  Format: YYYY-NNNNN
                </span>
              </div>

              <div className="relative">
                <input
                  ref={inputRef}
                  autoComplete="off"
                  className="field !h-14 sm:!h-16 text-2xl sm:text-3xl tracking-[0.22em] font-mono placeholder:text-slate-600 placeholder:tracking-normal"
                  id="studentId"
                  inputMode="numeric"
                  maxLength={10}
                  onChange={(event) =>
                    setStudentId((currentValue) => formatStudentIdInput(event.target.value, currentValue))
                  }
                  placeholder="2024-00001"
                  value={studentId}
                />

                {studentId && (
                  <button
                    type="button"
                    onClick={() => {
                      setStudentId('');
                      inputRef.current?.focus();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md transition"
                    title="Clear"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">
                Press <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-slate-300">Enter ↵</kbd> or click button to commit
              </p>
            </div>

            <button 
              className="button-primary !h-13 sm:!h-14 text-base sm:text-lg font-bold" 
              disabled={isSubmitting || !studentId.trim()} 
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying Commit...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Commit Check-In</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Registration Link */}
          <div className="pt-3 border-t border-white/[0.08] text-center">
            <p className="text-sm text-slate-400">
              Not registered in the database?{' '}
              <Link 
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-400 transition ml-1" 
                to="/register"
              >
                Register Identity (git config)
              </Link>
            </p>
          </div>
        </div>
      </ActionPanel>
    </EventShell>
  );
}
