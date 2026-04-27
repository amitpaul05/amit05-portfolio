import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioLayout from "./components/PortfolioLayout";
import AboutPage from "./pages/AboutPage";
import AcademicPage from "./pages/AcademicPage";
import ProjectsPage from "./pages/ProjectsPage";
import CertificatesPage from "./pages/CertificatesPage";
import Diary from "./pages/Diary";
import DiaryEntry from "./pages/DiaryEntry";
import DiaryNew from "./pages/DiaryNew";
import DiaryEdit from "./pages/DiaryEdit";
import ResumeUpload from "./pages/ResumeUpload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioLayout />}>
            <Route index element={null} />
            <Route path="about" element={<AboutPage />} />
            <Route path="academic" element={<AcademicPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
          <Route path="diary" element={<Diary />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/diary/new" element={<DiaryNew />} />
          <Route path="/diary/edit" element={<DiaryEdit />} />
          <Route path="/diary/:date/edit" element={<DiaryEdit />} />
          <Route path="/admin/resume" element={<ResumeUpload />} />
          <Route path="/diary/:date" element={<DiaryEntry />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
