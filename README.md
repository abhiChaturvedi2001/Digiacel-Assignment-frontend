# To-Do List: Frontend

React 18 + Vite + Tailwind CSS 3 + Redux Toolkit + axios + lucide-react + React Router.

## Run

```bash
npm install
cp .env.example .env     # first time only
npm run dev              # http://localhost:5173
```

Start your backend first. In dev, Vite proxies `/api/*` to `VITE_PROXY_TARGET`
(default `http://localhost:5000`, set it to your backend's PORT in `.env`).

## Structure

```
src/
  services/
    axiosInstance.js   base URL (/api), timeout, error -> Error(message)
    taskService.js     every API call: getAll, search, create, update, updateStatus, remove
  store/
    index.js           configureStore
    tasksSlice.js      tasks state + thunks (fetch, create, update, delete, restore, toggleStatus)
    uiSlice.js         open sheet + toast (notify thunk)
  hooks/
    useTasks           task list, loading, error, reload
    useTaskActions     save / remove / toggle with toasts
    useSheets          open or close the add, edit and detail sheets
    useToast           show / dismiss
    useTaskSearch      debounced server search
    useWeekPlanner     all derived data for the Home screen
    useDebounce
  components/ui | tasks | home | layout
  pages/               Onboarding, Home, Search
  utils/               date + task helpers
  index.css            COLOR ROOT (:root variables, light + dark)
```

Data flow: component -> custom hook -> thunk -> taskService -> axios -> API.

## Backend contract

Dates are `YYYY-MM-DD` strings, times are `HH:mm` strings (the backend converts them for storage).

| Method | Path                    | Body             | Returns |
| ------ | ----------------------- | ---------------- | ------- |
| GET    | `/api/tasks`            |                  | `Task[]` |
| GET    | `/api/tasks?search=kw`  |                  | `Task[]` |
| POST   | `/api/tasks`            | task fields      | `Task` (201) |
| PUT    | `/api/tasks/:id`        | fields to change | `Task` |
| PATCH  | `/api/tasks/:id/status` | `{ status }`     | `Task` |
| DELETE | `/api/tasks/:id`        |                  | 204 |

Errors: non-2xx with `{ "message": "..." }`. The UI shows that message.

## Production

Dev uses the proxy. For a deployed build, either serve the API on the same domain under `/api`,
or set `VITE_API_URL=https://your-api.example.com/api` at build time (and allow the frontend origin in CORS).
