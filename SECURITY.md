**Security & Secret Management**

- If any API keys or credentials were accidentally committed (e.g., Google Maps `AIza...`), rotate them immediately in the provider console and revoke the old keys.
- After rotating, remove the secret from git history (example using `git filter-repo` or BFG):

  ```bash
  # Example: remove a Google Maps key from history (replace OLD_KEY)
  git filter-repo --invert-paths --path-glob "**" --replace-refs delete-no-add --anonymize-commits
  # NOTE: Use a tested workflow for history-rewriting tools; read docs before running.
  ```

- Add new keys to your hosting platform (Vercel/Netlify) as environment variables:

  - Vercel: Project → Settings → Environment Variables → Add `VITE_GOOGLE_MAPS_API_KEY` (for client) and `GEMINI_API_KEY`, `NOTIFY_EMAIL`, `EMAIL_USER`, `EMAIL_PASS`, etc. (for server).
  - Use the `VITE_` prefix for variables accessed in client code.

- Locally, store secrets in an untracked `.env` file (see `.env.example`) and add `.env` to `.gitignore`.

- After rotating keys, re-run your CI/CD build to ensure no remaining secrets are embedded in built artifacts.

- If you want me to remove a specific leaked key from git history safely, tell me which key and I can prepare the commands (but you'll need to run them locally or allow me to modify the repo history with your approval).
