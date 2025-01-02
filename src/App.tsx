import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "./pages/Home";
import Pair from "./pages/Pair";
import Waiting from "./pages/Waiting";
import Loading from "./pages/Loading";
import Main from "./pages/Main";
import History from "./pages/History";
import Search from "./pages/search";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pair" element={<Pair />} />
          <Route path="/search" element={<Search />} />
          <Route path="/waiting" element={<Waiting />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/main" element={<Main />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;