import { lazy, Suspense } from 'react';
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioLayout from "./components/PortfolioLayout";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import AcademicPage from "./pages/AcademicPage";
import ProjectsPage from "./pages/ProjectsPage";
import CertificatesPage from "./pages/CertificatesPage";

const Diary           = lazy(() => import('./pages/Diary'));
const DiaryEntry      = lazy(() => import('./pages/DiaryEntry'));
const DiaryNew        = lazy(() => import('./pages/DiaryNew'));
const DiaryEdit       = lazy(() => import('./pages/DiaryEdit'));
const ResumeUpload    = lazy(() => import('./pages/ResumeUpload'));

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<PortfolioLayout />}>
              <Route index element={<AboutPage />} />
              <Route path="about"        element={<AboutPage />} />
              <Route path="academic"     element={<AcademicPage />} />
              <Route path="projects"     element={<ProjectsPage />} />
              <Route path="certificates" element={<CertificatesPage />} />
              <Route path="diary"        element={<Diary />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/diary/new"        element={<DiaryNew />} />
            <Route path="/diary/edit"       element={<DiaryEdit />} />
            <Route path="/diary/:date/edit" element={<DiaryEdit />} />
            <Route path="/admin/resume"     element={<ResumeUpload />} />
            <Route path="/diary/:date"      element={<DiaryEntry />} />
            <Route path="*"                 element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
