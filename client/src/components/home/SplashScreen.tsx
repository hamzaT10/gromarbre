import { motion } from "framer-motion";
import AnimatedLogo from "../shared/AnimatedLogo";

const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center">
        <AnimatedLogo className="w-32 h-32 mb-6" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h1 className="text-4xl font-serif font-bold text-gold">GROMARBRE</h1>
          <p className="text-sm text-center text-blue-dark mt-1">S.A.R.L</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
