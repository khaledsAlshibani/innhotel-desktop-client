<h1>InnHotel Desktop App</h1>

A desktop application built with Electron.js.

- [Quick Start](#quick-start)
  - [Getting Started (Development Server)](#getting-started-development-server)
  - [Building the Application](#building-the-application)
- [Tech Stack](#tech-stack)
- [Development Guidelines](#development-guidelines)
  - [Adding new pages/routes](#adding-new-pagesroutes)
    - [Public Pages (MainLayout)](#public-pages-mainlayout)
    - [Regular Pages (List/View Pages)](#regular-pages-listview-pages)
    - [Form Pages](#form-pages)
    - [Page Layout Guidelines](#page-layout-guidelines)
    - [Navigation](#navigation)
- [Screenshots](#screenshots)

## Quick Start

### Getting Started (Development Server)

1. Install the required dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

This will launch both the Vite server for the browser and the Electron server, with live-reloading enabled for changes.

### Building the Application

1. To create the Windows executable:

> It's recommended to run the terminal as an administrator to avoid potential errors.

```bash
npm run dist:win
```

The executable will be generated in the `dist` folder:

* `dist/win-unpacked/innhotel-desktop-client.exe` (Portable version)
* `dist/innhotel-desktop-client Setup 0.0.0.exe` (Windows installer)

For other operating systems, use the following commands:

```bash
# For macOS
npm run dist:mac

# For Linux
npm run dist:linux
```

---

## Tech Stack

* **Electron.js** - Framework for building cross-platform desktop applications
* **React** - JavaScript library for building user interfaces
* **Vite** - Build tool and development server
* **TypeScript** - Type-safe JavaScript
* **Tailwind CSS** - Utility-first CSS framework
* **Shadcn** - Design system and component library

---

## Development Guidelines

### Adding new pages/routes

The application uses React Router DOM for routing. In [App.tsx](src/App.tsx), the application specifically uses `HashRouter` instead of `BrowserRouter` to support electron.js desktop functionality.

#### Public Pages (MainLayout)

For public pages like login, registration, or landing pages that don't require the full application chrome:

1. Create the page component in `src/pages/`:
```tsx
const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Enter your credentials to continue</p>
        </div>
        
        {/* Form or content */}
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;
```

2. Add the route constant in `src/constants/routes.ts`:
```ts
export const ROUTES = {
  // ... existing routes
  LOGIN: '/login',
} as const;
```

3. Add the route in `src/routes/index.tsx` under the `MainLayout` section:
```tsx
<Route path={ROUTES.HOME} element={<MainLayout><Outlet /></MainLayout>}>
  <Route path={ROUTES.LOGIN} element={<LoginPage />} />
</Route>
```

The `MainLayout`:
- Used for authentication and public pages
- Provides a clean, minimal layout without navigation elements
- Centered content with responsive padding
- No sidebar, header, or other app chrome
- Suitable for login, registration, and error pages

#### Regular Pages (List/View Pages)

To add a new regular page that uses the standard `AppLayout`:

1. Create the page component in `src/pages/`:
```tsx
const MyPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Page Title</h2>
        <Button onClick={() => navigate(ROUTES.ADD_ITEM)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Page content */}
    </div>
  );
};

export default MyPage;
```

2. Add the route constant in `src/constants/routes.ts`:
```ts
export const ROUTES = {
  // ... existing routes
  MY_PAGE: '/my-page',
} as const;
```

3. Add the route in `src/routes/index.tsx` under the `AppLayout` section:
```tsx
<Route path={ROUTES.HOME} element={<AppLayout><Outlet /></AppLayout>}>
  // ... existing routes
  <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
</Route>
```

#### Form Pages

For pages that use forms (add/edit), use the `FormLayout` which provides consistent styling and structure:

1. Create the form component in `src/components/my-feature/MyForm.tsx`:
```tsx
interface MyFormData {
  // form fields
}

interface MyFormProps {
  onSubmit: (data: MyFormData) => void;
}

export const MyForm = ({ onSubmit }: MyFormProps) => {
  const form = useForm<MyFormData>();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        {/* Form fields */}
      </form>
    </Form>
  );
};
```

2. Create the page component in `src/pages/` (Here use the `FormLayout`):
```tsx
const AddMyItem = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: MyFormData) => {
    console.log(data);
    navigate(ROUTES.MY_PAGE);
  };

  return (
    <FormLayout
      title="Add New Item"
      description="Add a new item to the system."
    >
      <MyForm onSubmit={handleSubmit} />
    </FormLayout>
  );
};

export default AddMyItem;
```

3. Add the route constant in `src/constants/routes.ts`:
```ts
export const ROUTES = {
  // ... existing routes
  MY_PAGE: '/my-page',
  ADD_MY_ITEM: '/my-page/add',
} as const;
```

4. Add the route in `src/routes/index.tsx`:
```tsx
<Route path={ROUTES.HOME} element={<AppLayout><Outlet /></AppLayout>}>
  // ... existing routes
  <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
  <Route path={ROUTES.ADD_MY_ITEM} element={<AddMyItem />} />
</Route>
```

#### Page Layout Guidelines

- **Regular Pages (AppLayout)**
  - Use for list views, dashboards, and detail pages
  - Include a header with title and action buttons
  - Follow the space-y-6 pattern for consistent spacing
  - Use Shadcn UI components for consistent styling

- **Form Pages (FormLayout)**
  - Use for add/edit forms
  - Provides consistent form styling and structure
  - Include a descriptive title and helpful description
  - Forms should be wrapped in max-w-2xl for optimal readability
  - Use grid layouts for form fields (grid-cols-2 for side-by-side fields)

#### Navigation

To add navigation to new pages:

1. For main navigation, add to `SidebarNav.tsx`:
```tsx
const mainItems = [
  // ... existing items
  { to: ROUTES.MY_PAGE, label: "My Items", icon: MyIcon },
];
```

2. For quick actions, add to `QuickActions.tsx`:
```tsx
<DropdownMenuItem onClick={() => navigate(ROUTES.ADD_MY_ITEM)}>
  <Plus className="mr-2 h-4 w-4" />
  Add New Item
</DropdownMenuItem>
```

---

## Screenshots

### Login Page

![Login Page](https://github.com/user-attachments/assets/42b3153a-535d-4e82-9b3d-776f0fcd12e1)

### Room Listing Page

![Room Listing Page](https://github.com/user-attachments/assets/10e8282f-3e27-4c19-8926-56805fdfa156)

### Add Room Page

![Add Room Page](https://github.com/user-attachments/assets/189f93f3-9243-456b-962d-6723e52b4888)

### Room Details Page

![Room Details Page](https://github.com/user-attachments/assets/08a9ea75-9c15-48fb-a0ab-9942df585e16)

### Guests Page

![Guests Page](https://github.com/user-attachments/assets/eff80cdb-a0cb-4d7b-ae0e-27a9dcf9203f)

### Add Reservation Page

![Add Reservation Page](https://github.com/user-attachments/assets/d3e2a45e-d0cf-4a47-8892-8987fb5f433f)

### Expanded Sidebar View

![Expanded Sidebar View](https://github.com/user-attachments/assets/21a93fcc-9036-4b22-9591-cf6d9634bc91)

### Quick Actions View

![Quick Actions View](https://github.com/user-attachments/assets/7ddc87de-f803-4d77-83b8-7a0005ba58da)
