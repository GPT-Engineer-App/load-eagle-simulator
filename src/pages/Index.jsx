import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, Facebook, Twitter, Instagram, Paw, Camera } from "lucide-react";
import confetti from 'canvas-confetti';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  const catBreeds = [
    { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive color points and blue eyes." },
    { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Characterized by their long, fluffy coat and flat face." },
    { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domestic cat breeds with tufted ears." },
    { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", description: "Known for their wild appearance with spotted or marbled coat patterns." },
    { name: "British Shorthair", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg", description: "Recognized for their round face and dense, plush coat." },
  ];

  const catFacts = [
    "Cats sleep for about 70% of their lives.",
    "A group of cats is called a 'clowder'.",
    "Cats have over 20 vocalizations, including the meow.",
    "A cat's hearing is much more sensitive than a human's or dog's.",
    "Cats have a third eyelid called the 'haw' to protect their eyes.",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowFact(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
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
          <motion.h1 
            className="text-3xl font-bold text-purple-600 flex items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Cat className="mr-2" /> Feline Frenzy
          </motion.h1>
          <motion.div 
            className="space-x-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
          </motion.div>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto p-8">
        <motion.div
          style={{ y }}
          className="relative h-[70vh] mb-16 overflow-hidden rounded-xl shadow-xl"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" 
            alt="Cute cat" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <motion.div 
            className="absolute bottom-10 left-10 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-5xl font-bold mb-4">Welcome to Feline Frenzy</h2>
            <p className="text-2xl">Discover the fascinating world of cats</p>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentFactIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg mb-8"
          >
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Paw className="mr-2 text-purple-600" />
              Did you know?
            </h3>
            <p>{catFacts[currentFactIndex]}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mb-12">
          <h3 className="text-3xl font-bold mb-6">Popular Cat Breeds</h3>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {catBreeds.map((breed, index) => (
                <CarouselItem key={breed.name} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover" />
                      <CardHeader>
                        <CardTitle>{breed.name}</CardTitle>
                        <CardDescription>{breed.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="mr-2 text-purple-600" /> Cat Photo Contest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Share your best cat photos and win amazing prizes!</p>
              <Button>Enter Contest</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 text-purple-600" /> Cat Care Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide fresh water daily</li>
                <li>Schedule regular vet check-ups</li>
                <li>Offer a balanced diet</li>
                <li>Ensure plenty of playtime</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleLike}
              className="group"
            >
              <Heart className="mr-2 h-5 w-5 group-hover:text-red-500 transition-colors" />
              Like this page ({likeCount})
            </Button>
          </motion.div>
        </div>
      </main>

      <footer className="bg-purple-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">About Us</h4>
              <p>Feline Frenzy is dedicated to celebrating the joy and wonder of cats. Join our community of cat lovers!</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-300 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-purple-300 transition-colors"><Facebook size={24} /></a>
                <a href="#" className="hover:text-purple-300 transition-colors"><Twitter size={24} /></a>
                <a href="#" className="hover:text-purple-300 transition-colors"><Instagram size={24} /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-700 text-center">
            <p>&copy; 2023 Feline Frenzy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
