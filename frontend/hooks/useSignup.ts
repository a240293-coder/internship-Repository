import { useEffect } from 'react';

type Role = 'student' | 'mentor' | 'admin';

function getRoleFromUrl(): Role {
  try {
    if (typeof window === 'undefined') return 'student';
    const params = new URLSearchParams(window.location.search);
    const r = params.get('role')?.toLowerCase();
    if (r === 'mentor') return 'mentor';
    if (r === 'admin') return 'admin';
  } catch (e) {}
  return 'student';
}

function guessNameFromEmail(email: string) {
  if (!email) return `User${Date.now()}`;
  const parts = email.split('@');
  const namePart = parts[0] || `user${Date.now()}`;
  return namePart
    .replace(/[._\-\d]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(s => s[0]?.toUpperCase() + s.slice(1))
    .join(' ') || `User${Date.now()}`;
}

export default function useSignup() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const role = getRoleFromUrl();

    // Select inputs by placeholder text to avoid changing JSX
    const emailInput = document.querySelector<HTMLInputElement>('input[placeholder="Email Address"]');
    const passwordInput = document.querySelector<HTMLInputElement>('input[placeholder="Password"]');
    const confirmInput = document.querySelector<HTMLInputElement>('input[placeholder="Confirm Password"]');
    const signUpButton = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Sign Up');

    if (!emailInput || !passwordInput || !signUpButton) {
      return;
    }

    let loading = false;

    const onClick = async (e: Event) => {
      if (loading) return;
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirm = confirmInput ? confirmInput.value : null;

      if (!email || !password) {
        window.alert('Please provide email and password');
        return;
      }

      if (confirm !== null && password !== confirm) {
        window.alert('Passwords do not match');
        return;
      }

      loading = true;
      try {
        const name = guessNameFromEmail(email);

        let endpoint = '/api/student/auth/register';
        if (role === 'mentor') endpoint = '/api/mentor/auth/register';
        if (role === 'admin') endpoint = '/api/admin/auth/register';

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const msg = body?.message || `Registration failed (${res.status})`;
          window.alert(msg);
          return;
        }

        const data = await res.json().catch(() => ({}));

        // Save token and role -> follow Internhoodlive conventions
        if (data?.token) localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', role);

        const idMap = data?.student?.id || data?.mentor?.id || data?.admin?.id || data?.id;
        if (idMap) localStorage.setItem('userId', String(idMap));

        if (role === 'admin') {
          // notify any listeners (Internhoodlive does this on admin login)
          window.dispatchEvent(new Event('authChanged'));
        }

        // Redirect to role dashboard
        if (role === 'mentor') window.location.href = '/mentor/dashboard';
        else if (role === 'admin') window.location.href = '/admin/dashboard';
        else window.location.href = '/student/dashboard';
      } catch (err) {
        window.alert('Registration failed');
      } finally {
        loading = false;
      }
    };

    signUpButton.addEventListener('click', onClick);

    return () => {
      signUpButton.removeEventListener('click', onClick);
    };
  }, []);
}
