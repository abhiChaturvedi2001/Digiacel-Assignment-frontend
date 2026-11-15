# To-Do List: Frontend

React 18 + Vite + Tailwind CSS 3 + Redux Toolkit + axios + lucide-react + React Router.

## Run

```bash
npm install
cp .env.example .env     # first time only
npm run dev              # http://localhost:5173
```

Start your backend first. In dev, Vite proxies `/api/*` to `VITE_PROXY_TARGET`
(default `http://localhost:8081`, the backend's default PORT; change it in `.env` if yours differs).

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
| GET    | `/api/tasks`            |                  | `Task[]` (max 1000) |
| GET    | `/api/tasks?from=&to=`  |                  | `Task[]` in that date range |
| GET    | `/api/tasks?search=kw`  |                  | `Task[]` (max 50) |
| POST   | `/api/tasks`            | task fields      | `Task` (201) |
| PUT    | `/api/tasks/:id`        | all task fields  | `Task` |
| PATCH  | `/api/tasks/:id/status` | `{ status }`     | `Task` |
| DELETE | `/api/tasks/:id`        |                  | 204 |

Task fields: `title` (required, max 80), `date` and `startTime` (required), `endTime` (`''` or after `startTime`),
`description` (max 1000), `priority` (`low|medium|high|''`), `status` (`in_progress|completed`).

Errors: non-2xx with `{ "success": false, "message": "...", "details"?: [...] }`. The UI shows `message`.

## Production

Dev uses the proxy. For a deployed build, either serve the API on the same domain under `/api`,
or set `VITE_API_URL=https://your-api.example.com/api` at build time (and allow the frontend origin in CORS).
