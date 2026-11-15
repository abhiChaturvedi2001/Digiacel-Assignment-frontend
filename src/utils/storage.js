const SEEN_KEY = 'todo.onboarding.seen';

export function hasSeenOnboarding() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export function markOnboardingSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable, ignore */
  }
}
