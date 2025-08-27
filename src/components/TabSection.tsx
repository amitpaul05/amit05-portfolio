import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Academic from "./Academic";
import Certifications from "./Certifications";

const TabSection = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto my-4">
              <TabsTrigger value="about" className="text-sm md:text-base">About</TabsTrigger>
              <TabsTrigger value="projects" className="text-sm md:text-base">Projects</TabsTrigger>
              <TabsTrigger value="certificates" className="text-sm md:text-base">Certificates</TabsTrigger>
              <TabsTrigger value="academic" className="text-sm md:text-base">Academic</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="about" className="mt-0">
          <About />
          <Experience />
          <Skills />
        </TabsContent>

        <TabsContent value="projects" className="mt-0">
          <Projects />
        </TabsContent>

        <TabsContent value="certificates" className="mt-0">
          <Certifications />
        </TabsContent>

        <TabsContent value="academic" className="mt-0">
          <Academic />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabSection;