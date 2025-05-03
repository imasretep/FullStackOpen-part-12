import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { LightBulbIcon as LightBulbOutlined } from "@heroicons/react/24/outline";

const App = () => {
  const [lights, setLights] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [counter, setCounter] = useState(0);
  const [dateTime, setDateTime] = useState(null);

  const handleClick = async () => {
  setAnimating(true);
  setTimeout(async () => {
    const newLights = !lights;
    setLights(newLights);

    if (newLights) {
      try {
        const res = await fetch("/api/toggle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ on: true }),
        });

        const data = await res.json();
        setCounter(data.counter);
        setDateTime(new Date(data.lastTime).toLocaleTimeString());
      } catch (err) {
        console.error("Error toggling light:", err);
      }
    }

    setAnimating(false);
  }, 500);
};

useEffect(() => {
  fetch("/api/status")
    .then((res) => res.json())
    .then((data) => {
      if (data.lastTime) {
        setDateTime(new Date(data.lastTime).toLocaleTimeString());
      }
      setCounter(data.counter);
    });
}, []);

  return (
    <div
      data-theme={!lights ? "black" : "night"}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      <AnimatePresence>
        {lights && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="absolute w-96 h-96 rounded-full bg-yellow-500 blur-3xl"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!animating && (
          <motion.div
            key={!lights ? "black" : "night"}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: lights ? 0.7 : 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center prose lg:prose-xl p-6 rounded-lg z-5"
          >
            <button
              className="btn btn-circle bg-transparent shadow-none border-none transition-transform transform hover:scale-110 hover:rotate-12 duration-300"
              onClick={handleClick}
            >
              {!lights ? (
                <LightBulbOutlined className="h-10 w-10 text-white-500" />
              ) : (
                <LightBulbIcon className="h-10 w-10 text-yellow-500" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <h1 className="absolute bottom-20 font-mono text-center">
        Light has been switched on {counter} times.
      </h1>
      {dateTime !== null && (
        <h1 className="absolute bottom-10 font-mono text-center">
          Last switch was at {dateTime}
        </h1>
      )}
    </div>
  );
};

export default App;
