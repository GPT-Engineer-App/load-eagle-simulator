import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, Facebook, Twitter, Instagram } from "lucide-react";
import confetti from 'canvas-confetti';

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  const catBreeds = [
    { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
    { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
    { name: "British Shorthair", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowFact(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = () => {
    setLikeCount(prev => prev + 1);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-600 flex items-center">
            <Cat className="mr-2" /> Feline Frenzy
          </h1>
          <div className="space-x-4">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto p-8">
        <motion.div
          style={{ y }}
          className="relative h-[60vh] mb-16 overflow-hidden rounded-xl shadow-xl"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
            alt="Cute cat" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-4xl font-bold mb-2">Welcome to Feline Frenzy</h2>
            <p className="text-xl">Discover the fascinating world of cats</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showFact ? 1 : 0, y: showFact ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
        >
          <h3 className="text-xl font-bold mb-2">Did you know?</h3>
          <p>Cats sleep for about 70% of their lives, which is about 13-16 hours a day!</p>
        </motion.div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Popular Cat Breeds</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {catBreeds.map((breed, index) => (
              <motion.div
                key={breed.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-64"
              >
                <Card>
                  <img src={breed.image} alt={breed.name} className="w-full h-40 object-cover rounded-t-lg" />
                  <CardHeader>
                    <CardTitle>{breed.name}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <Tabs defaultValue="characteristics" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2" /> Characteristics of Cats
                </CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Independent nature</li>
                  <li>Excellent hunters with sharp claws and teeth</li>
                  <li>Flexible bodies and quick reflexes</li>
                  <li>Keen senses, especially hearing and night vision</li>
                  <li>Communicate through vocalizations, body language, and scent</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cat className="mr-2" /> Popular Cat Breeds
                </CardTitle>
                <CardDescription>Some well-known cat breeds around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Siamese</li>
                  <li>Persian</li>
                  <li>Maine Coon</li>
                  <li>Bengal</li>
                  <li>British Shorthair</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLike}
            className="group"
          >
            <Heart className="mr-2 h-4 w-4 group-hover:text-red-500 transition-colors" />
            Like this page ({likeCount})
          </Button>
        </div>
      </main>

      <footer className="bg-purple-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <p>&copy; 2023 Feline Frenzy. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-300 transition-colors"><Facebook /></a>
              <a href="#" className="hover:text-purple-300 transition-colors"><Twitter /></a>
              <a href="#" className="hover:text-purple-300 transition-colors"><Instagram /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
